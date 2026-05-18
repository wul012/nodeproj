# 第二百五十一版代码讲解：manual sandbox connection decision record

本版目标是在 v250 rehearsal guard 之后，生成一份人工连接决策记录。它不是打开 managed audit sandbox connection，也不是添加真实 adapter client，而是把“如果未来要连接，人工必须审查什么、哪些情况必须暂停”固化为机器可读 profile。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

v250 已完成：

```text
manual sandbox connection rehearsal guard / three-project alignment
```

v251 接在它后面做：

```text
manual sandbox connection decision record
```

这说明当前主线已经从“证据是否齐备”推进到“连接前人工决策记录是否齐备”。但边界不变：仍不读取 credential value，不打开 connection，不执行 schema migration，不启动 Java / mini-kv。

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionDecisionRecord.ts
```

核心 profile 类型继续锁住安全边界：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-decision-record.v1";
decisionState: "manual-sandbox-connection-decision-record-ready" | "blocked";
readyForManagedAuditSandboxAdapterConnection: false;
executionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

这里最重要的是区分：

```text
decision record ready != sandbox adapter connection ready
```

v251 只说明人工决策记录格式齐备，不说明真实连接已经可执行。

## 消费 v250 guard

v251 通过：

```ts
loadManagedAuditManualSandboxConnectionRehearsalGuard({
  config: input.config,
})
```

消费 v250 的 guard profile，然后压缩为：

```ts
readyForRehearsalGuard: source.readyForManagedAuditManualSandboxConnectionRehearsalGuard
nodeSecurityMaintenanceReady: source.sourceNodeV249.readyForRehearsalGuard
javaSecurityMaintenanceReady: source.upstreamSecurityMaintenance.javaV101.readyForRehearsalGuard
miniKvSecurityMaintenanceReady: source.upstreamSecurityMaintenance.miniKvV110.readyForRehearsalGuard
connectionStillBlocked: true
credentialValueStillBlocked: true
schemaMigrationStillBlocked: true
autoStartStillBlocked: true
miniKvStillNonAuthoritative: true
```

这样 v251 不重复解析 Java v101 / mini-kv v110 证据文件，而是承接 v250 已经验证过的三项目对齐结果。

## decisionRecord 字段

核心 record 是：

```ts
recordMode: "manual-sandbox-connection-decision-record-only"
decisionScope: "managed-audit-manual-sandbox-connection"
decisionStatus: "human-review-required-before-connection"
```

它包含七个必需字段：

```ts
ownerApprovalArtifactId: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"
credentialHandleReviewStatus: "required-handle-only-no-value-read"
schemaRehearsalApprovalId: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"
manualWindowMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_WINDOW_OPEN"
rollbackPathId: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"
abortMarker: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"
timeoutPolicy: "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS"
```

credential 相关字段特意写成 `handle/review status`，不是 credential value。这是本版最关键的生产边界。

## RequiredDecisionFields

`createRequiredDecisionFields()` 把七个字段进一步拆成数组：

```ts
{
  id: "credential-handle-review",
  label: "Credential handle review status",
  expectedSource: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  required: true,
  nodeMayReadValue: false,
  acceptedEvidence: "Credential handle/review status only; credential value must not enter Node.",
}
```

这让后续 UI 或 operator checklist 可以直接消费字段列表，而不是从大段说明里解析文字。

## explicitNoGoConditions

`createNoGoConditions()` 生成八个必须暂停的条件：

```ts
CREDENTIAL_VALUE_REQUIRED
SCHEMA_MIGRATION_REQUIRED
UPSTREAM_AUTO_START_REQUIRED
APPROVAL_LEDGER_WRITE_REQUIRED
MINI_KV_STORAGE_BACKEND_REQUIRED
OWNER_ARTIFACT_MISSING
ROLLBACK_OR_ABORT_MISSING
TIMEOUT_POLICY_MISSING
```

每个条件的 action 都是：

```ts
"pause-and-do-not-connect"
```

这使 v251 不只是“记录字段”，还明确告诉后续版本：什么时候必须停止，不能继续推进真实连接。

## checks

`createChecks()` 把 v250 来源和 v251 记录自身串起来：

```ts
sourceNodeV250Ready
requiredSecurityMaintenanceComplete
ownerApprovalArtifactRecorded
credentialHandleReviewRecorded
schemaRehearsalApprovalRecorded
manualWindowMarkerRecorded
rollbackPathRecorded
abortMarkerRecorded
timeoutPolicyRecorded
explicitNoGoConditionsRecorded
decisionRecordStillReadOnly
upstreamActionsStillDisabled
```

最后：

```ts
readyForManagedAuditManualSandboxConnectionDecisionRecord
```

只有所有检查为 true 才会变成 true。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route table 注册：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-decision-record",
  (deps) => loadManagedAuditManualSandboxConnectionDecisionRecord({ config: deps.config }),
  renderManagedAuditManualSandboxConnectionDecisionRecordMarkdown,
)
```

仍然使用 v240 后的 route table 模式，没有恢复旧的重复 route 写法。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionDecisionRecord.test.ts
```

覆盖：

```text
1. v250 ready 时，v251 decision record ready，但真实 connection 仍 false
2. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
3. JSON / Markdown route 均可访问
```

聚焦验证：

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionDecisionRecord.test.ts test\managedAuditManualSandboxConnectionRehearsalGuard.test.ts
```

## 成熟度变化

v251 让项目从“连接前守卫齐备”推进到“连接前人工决策记录齐备”。这比单纯多一个 checklist 更接近真实流程，因为真实生产里打开外部连接前必须留下明确 decision envelope 和 no-go 条件。

但本版仍然不是生产连接：

```text
connection=false
credential value=false
schema migration=false
auto-start=false
approval ledger write=false
mini-kv storage backend=false
```

## 一句话总结

v251 把 v250 rehearsal guard 固化成 manual sandbox connection decision record：人工字段和暂停条件齐备，但真实连接、credential value 和 schema migration 仍全部关闭。

## 最终验证补充

收口验证：

```text
npm run typecheck -> passed
npx vitest run test\managedAuditManualSandboxConnectionDecisionRecord.test.ts test\managedAuditManualSandboxConnectionRehearsalGuard.test.ts -> 7 tests passed
npm test -> 191 files / 641 tests passed
npm run build -> passed
safe HTTP smoke -> health ok, decisionState=manual-sandbox-connection-decision-record-ready, connectsManagedAudit=false, readsManagedAuditCredential=false, noGoConditionCount=8
Chrome screenshot -> c/251/图片/manual-sandbox-connection-decision-record-v251.png
```

本版 HTTP smoke 只启动 Node，本轮进程已停止；没有启动 Java 或 mini-kv。
