# Node v227 managed audit manual sandbox connection evidence checklist 代码讲解

## 模块角色

v227 是 manual sandbox connection evidence checklist，不是 sandbox connection：

```text
Node v225：sandbox adapter dry-run package
Node v226：manual sandbox connection runbook
Java v86 + mini-kv v95：只读 guard / receipt 证据
Node v227：把三边证据汇成连接前 checklist
```

本版的价值是把“是否可以进入下一步人工窗口准备”变成机器可读 profile，同时继续把真实连接、credential value、schema migration 和状态写入全部挡住。

## 1. 服务入口

文件：[managedAuditManualSandboxConnectionEvidenceChecklist.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts)

```ts
export function loadManagedAuditManualSandboxConnectionEvidenceChecklist(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionEvidenceChecklistProfile {
```

入口只接收 `AppConfig`，不接 Java client、mini-kv client 或 managed audit adapter client。因此 v227 没有能力打开外部连接，也不会启动上游服务。

## 2. 消费 Node v226

文件：[managedAuditManualSandboxConnectionEvidenceChecklist.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts)

```ts
const sourceRunbook = loadManagedAuditManualSandboxAdapterConnectionRunbook({ config: input.config });
```

v227 首先消费 v226 的 runbook，并把它压缩成 `sourceNodeV226`：

```ts
sourceNodeV226: {
  sourceVersion: "Node v226",
  profileVersion: sourceRunbook.profileVersion,
  runbookState: sourceRunbook.runbookState,
  runbookDigest: sourceRunbook.manualRunbook.runbookDigest,
  readyForRunbook: sourceRunbook.readyForManagedAuditManualSandboxAdapterConnectionRunbook,
  readyForConnectionFromSource: sourceRunbook.readyForManagedAuditSandboxAdapterConnection,
}
```

这里最关键的是 `readyForConnectionFromSource=false`。v226 runbook ready 只说明人工材料可审阅，不说明连接已允许。

## 3. Java v86 evidence reference

文件：[managedAuditManualSandboxConnectionEvidenceChecklist.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts)

```ts
function createJavaV86Reference(
  evidenceFiles: ChecklistEvidenceFile[],
  snippets: ChecklistSnippetMatch[],
): JavaV86EvidenceReference {
```

Java v86 的检查来自两个归档文件：

```ts
const JAVA_V86_RUNBOOK = "D:/javaproj/advanced-order-platform/c/86/解释/说明.md";
const JAVA_V86_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/89-version-86-release-approval-rehearsal-internal-boolean-flags.md";
```

它要求同时匹配：

```ts
contractPreservingRefactor: snippetMatched(snippets, "java-v86-contract-preserving"),
builderFlagsApplied: snippetMatched(snippets, "java-v86-builder-flags"),
responseShapeUnchanged: snippetMatched(snippets, "java-v86-response-shape"),
schemaVersionUnchanged: snippetMatched(snippets, "java-v86-schema-version"),
noLedgerWriteBoundary: snippetMatched(snippets, "java-v86-no-ledger-write"),
noSqlBoundary: snippetMatched(snippets, "java-v86-no-sql"),
noCredentialBoundary: snippetMatched(snippets, "java-v86-no-credential"),
```

`readyForNodeV227EvidenceChecklist` 是派生值：只有文件存在、response shape/schema 不变、no-ledger/no-SQL/no-credential 都成立，Java 侧才被 v227 接受。

## 4. mini-kv v95 evidence reference

文件：[managedAuditManualSandboxConnectionEvidenceChecklist.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts)

```ts
function createMiniKvV95Reference(
  evidenceFiles: ChecklistEvidenceFile[],
  snippets: ChecklistSnippetMatch[],
  evidence: MiniKvRuntimeSmokeEvidence,
): MiniKvV95EvidenceReference {
```

mini-kv v95 消费当前 runtime smoke evidence：

```ts
projectVersion: stringField(evidence, "project_version") ?? "missing",
releaseVersion: stringField(evidence, "release_version") ?? "missing",
currentArtifactPathHint: stringField(receipt, "current_artifact_path_hint") ?? "missing",
receiptDigest: stringField(receipt, "receipt_digest") ?? "missing",
```

并要求：

```ts
reference.projectVersion === "0.95.0"
reference.releaseVersion === "v95"
reference.currentArtifactPathHint === "c/95/"
reference.receiptDigest === "fnv1a64:ceaed265f7f9560c"
reference.readOnly
!reference.executionAllowed
!reference.sandboxAdapterStorageBackend
!reference.credentialValueReadAllowed
!reference.sandboxManagedAuditStateWriteAllowed
```

这说明 mini-kv 仍然只是基础设施证据源，不是 sandbox audit storage backend。

## 5. evidenceChecklist

文件：[managedAuditManualSandboxConnectionEvidenceChecklist.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts)

```ts
function createEvidenceChecklist(
  sourceRunbook: ManagedAuditManualSandboxAdapterConnectionRunbookProfile,
  javaV86: JavaV86EvidenceReference,
  miniKvV95: MiniKvV95EvidenceReference,
): ManualSandboxEvidenceChecklistItem[] {
```

v227 checklist 固定 8 项：

```ts
item("node-v226-runbook-digest", ...)
item("node-v226-connection-blocked", ...)
item("java-v86-evidence-present", ...)
item("java-v86-contract-preserving", ...)
item("mini-kv-v95-evidence-present", ...)
item("mini-kv-v95-sandbox-non-storage", ...)
item("credential-handle-only", ...)
item("manual-window-only", ...)
```

每项都有 `owner`、`sourceVersion`、`evidence`、`verified`、`blocksConnectionWhenMissing`。这让后续 v228 可以继续消费，而不是重新猜三项目状态。

## 6. checks

文件：[managedAuditManualSandboxConnectionEvidenceChecklist.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts)

```ts
evidenceChecklistComplete: evidenceChecklist.length >= 8
  && evidenceChecklist.every((entry) => entry.required && entry.verified),
credentialValueStillForbidden: true,
schemaMigrationStillBlocked: true,
externalConnectionStillBlocked: true,
managedAuditWritesStillBlocked: true,
automaticServiceStartStillBlocked: true,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

这些 checks 的方向不是“放行连接”，而是“确认连接仍然被挡住”。`readyForManagedAuditManualSandboxConnectionEvidenceChecklist=true` 只代表 evidence checklist ready。

## 7. 路由挂载

文件：[auditRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditRoutes.ts)

```ts
registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist", () => loadManagedAuditManualSandboxConnectionEvidenceChecklist({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionEvidenceChecklistMarkdown);
```

本版继续使用共享 `registerAuditJsonMarkdownRoute`，没有新增手写 JSON/Markdown 路由分支。

## 8. 测试覆盖

文件：[managedAuditManualSandboxConnectionEvidenceChecklist.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts)

```ts
expect(profile).toMatchObject({
  checklistState: "manual-sandbox-connection-evidence-checklist-ready",
  readyForManagedAuditManualSandboxConnectionEvidenceChecklist: true,
  readyForManagedAuditSandboxAdapterConnection: false,
  connectsManagedAudit: false,
  readsManagedAuditCredential: false,
});
```

测试覆盖：

```text
默认配置：v227 checklist ready，但 connection/production 仍 blocked
UPSTREAM_ACTIONS_ENABLED=true：checklist blocked
JSON / Markdown route：v227 接口可用
v223-v227 聚焦链：mini-kv v95 current evidence digest 已对齐
```

## 本版项目进度

v227 完成后，managed audit 主线进入：

```text
sandbox dry-run package
 -> manual sandbox connection runbook
 -> manual sandbox connection evidence checklist
```

下一步另起 `docs/plans/v227-post-evidence-checklist-roadmap.md`。按新计划，Node v228 只能做 `manual sandbox connection operator packet`，仍不能打开真实连接。

## 验证记录

```text
npm run typecheck：已通过
聚焦测试：v223-v227 依赖链 5 files / 15 tests 已通过
全量测试：npx vitest run --pool=threads --maxWorkers=4，169 files / 574 tests 已通过
npm run build：已通过
Chrome screenshot：c/227/图片/managed-audit-manual-sandbox-connection-evidence-checklist-v227.png 已生成
Node HTTP smoke：安全环境变量下通过，PID 21632 已停止
```
