# 第二百四十七版代码讲解：manual sandbox precheck upstream receipt verification

本版目标是把 Node v245 precheck packet、Java v99 precheck echo receipt、mini-kv v108 non-participation receipt 合成一个 Node 侧只读 verification profile。它不是连接版本，只判断三方证据是否能支撑下一版 rehearsal guard。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

计划原本是：

```text
Node v245 -> Java v99 + mini-kv v108 -> Node v247 -> Node v248
```

中间插入了 Node v246 GitHub CI fallback repair，所以 Java v99 / mini-kv v108 仍写“给 Node v246 消费”。v247 在代码里明确接受这个版本偏移，因为它们实际仍对应同一个 precheck upstream receipt verification slot。

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.ts
```

入口函数是：

```ts
export function loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile
```

它先加载 Node 自己的 v245 packet：

```ts
const sourceV245 = loadManagedAuditManualSandboxConnectionPrecheckPacket({ config: input.config });
```

然后只读构造两边证据：

```ts
const javaV99 = createJavaV99PrecheckEchoReference();
const miniKvV108 = createMiniKvV108PrecheckNonParticipationReference();
```

这两个函数都只读取文件，不启动、不构建、不测试、不修改 Java / mini-kv。

## Node v245 摘要

`createSourceNodeV245()` 从现有 v245 profile 中提取关键字段：

```ts
precheckItemCount: source.summary.precheckItemCount,
requiredOperatorFieldCount: source.summary.requiredOperatorFieldCount,
timeoutBudgetMs: source.precheckPacket.timeoutPolicy.timeoutBudgetMs,
readOnlyPrecheckPacket: source.readOnlyPrecheckPacket,
executionAllowed: source.executionAllowed,
connectsManagedAudit: source.connectsManagedAudit,
readsManagedAuditCredential: source.readsManagedAuditCredential,
```

这些字段保证 v247 消费的是 v245 真实生成的 precheck packet，而不是重新手写一份期望值。

## Java v99 核对

Java v99 证据来自：

```text
D:\javaproj\advanced-order-platform\c\99\解释\说明.md
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\102-version-99-release-approval-sandbox-precheck-packet-echo-receipt.md
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ReleaseApprovalManagedAuditSandboxConnectionPrecheckPacketEchoReceiptBuilder.java
```

v247 检查这些实际文本：

```ts
snippet("java-v99-receipt-field", JAVA_V99_WALKTHROUGH, "managedAuditSandboxConnectionPrecheckPacketEchoReceipt")
snippet("java-v99-ready-for-node-v246", JAVA_V99_WALKTHROUGH, "readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification=true")
snippet("java-v99-schema", JAVA_V99_WALKTHROUGH, "java-release-approval-rehearsal-response-schema.v23")
snippet("java-v99-item-count", JAVA_V99_WALKTHROUGH, "precheckItemCount=7")
snippet("java-v99-timeout", JAVA_V99_WALKTHROUGH, "timeoutBudgetMs=15000")
```

Java v99 的安全边界也作为硬条件进入 `readyForNodeV247Alignment`：

```ts
!reference.credentialValueReadByJava
&& !reference.actualConnectionAttemptedByJava
&& !reference.schemaMigrationSqlExecutedByJava
&& !reference.approvalLedgerWrittenByJava
&& !reference.miniKvWritePermissionRequestedByJava
```

注意：Java v99 使用 `ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE_REVIEW`、`ORDEROPS_MANAGED_AUDIT_SCHEMA_MIGRATION_REHEARSAL_ID` 这类 review/rehearsal 字段名。v247 把它当作 Java 侧 echo 语义证据；真正逐字比对 Node v245 operator fields 的任务由 mini-kv v108 receipt 承担。

## mini-kv v108 核对

mini-kv v108 的主证据是：

```text
D:\C\mini-kv\fixtures\release\manual-sandbox-connection-precheck-non-participation-receipt.json
```

v247 从 JSON 中读取实际字段：

```ts
sourcePrecheckItemCount
sourceRequiredOperatorFieldCount
sourceTimeoutBudgetMs
sourceReadyForPrecheckPacket
sourceReadOnlyPrecheckPacket
operatorReviewFields
precheckItems
```

并要求 operator fields 与 Node v245 完全一致：

```ts
const NODE_V245_OPERATOR_FIELDS = Object.freeze([
  "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID",
  "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID",
  "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS",
  "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT",
]);
```

边界字段仍是硬门槛：

```ts
!reference.nodeAutoStartAllowed
&& !reference.javaAutoStartAllowed
&& !reference.miniKvAutoStartAllowed
&& !reference.storageWriteAllowed
&& !reference.credentialValueReadAllowed
&& !reference.restoreExecutionAllowed
&& !reference.managedAuditStorageBackend
```

## checks 聚合

核心检查集中在 `createChecks()`：

```ts
precheckItemCountAligned
operatorFieldCountAligned
operatorFieldNamesAligned
timeoutPolicyAligned
credentialBoundaryAligned
connectionBoundaryAligned
writeBoundaryAligned
autoStartBoundaryAligned
```

最终 ready 字段不会手写为 true，而是排除自身后统计所有 check：

```ts
checks.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification")
  .every(([, value]) => value);
```

这样后续增加新的硬门槛时，不会忘记接入最终 ready 结果。

## GitHub fallback

v247 复用 v246 的路径解析：

```ts
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
```

本版额外把 v247 实际读取的 Java v99 / mini-kv v108 证据复制到：

```text
fixtures/historical/sibling-workspaces/
```

测试里使用：

```ts
process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
```

验证 GitHub runner 没有 sibling workspace 时也可以跑通。

## 路由接入

`src/routes/auditJsonMarkdownRoutes.ts` 新增 route table entry：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
  (deps) => loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationMarkdown,
)
```

没有回到旧的手写 JSON/Markdown route 模式。

## 测试覆盖

新增测试：

```text
test/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.test.ts
```

覆盖四类场景：

```text
1. 正常 profile ready，且不打开 connection
2. 强制 historical fixture fallback，模拟 GitHub runner
3. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
4. JSON / Markdown route table 接入
```

本版验证结果：

```text
npm run typecheck -> passed
vitest run managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.test.ts -> 4 tests passed
npm test -> 187 files / 628 tests passed
npm run build -> passed
safe HTTP smoke -> /health ok，v247 JSON ready，Markdown 200
```

HTTP smoke 使用安全环境变量：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true
```

## 本版边界

- 不启动 Java。
- 不启动 mini-kv。
- 不构建、不测试、不修改 Java / mini-kv。
- 不读取 credential value。
- 不打开 managed audit connection。
- 不执行 schema migration。
- 不写 approval ledger。

## 下一步

```text
Node v248：manual sandbox connection rehearsal guard
```

v248 可以消费 v247 的 verification profile，但仍只能生成 rehearsal guard，不能打开真实 managed audit connection。
