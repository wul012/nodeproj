# 第二百三十五版代码讲解：managed audit manual sandbox connection precondition intake

本版目标是把 managed audit sandbox connection 前必须具备的六类条件收成一份可读、可测、可归档的只读 intake。v234 已经完成 blocked execution rehearsal，证明危险动作会被阻断；v235 不打开连接，而是确认 owner approval artifact、credential handle review、schema rehearsal evidence、rollback path、timeout budget、manual abort marker 已经有上游证据来源。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v234-post-blocked-execution-rehearsal-roadmap.md
```

计划要求 Node v235 做：

```text
manual sandbox connection precondition intake
消费 Node v234 + Java v91 + mini-kv v100
只读确认六类连接前置条件
不打开 managed audit 连接
不读取 credential value
不执行 schema migration
不写 Java / mini-kv / audit 状态
```

这说明当前主线已经从“阻断危险动作”推进到“连接窗口申请材料整理”。本版完成后，后续计划另起为：

```text
D:\nodeproj\orderops-node\docs\plans\v235-post-precondition-intake-roadmap.md
```

下一步是 Node v236：生成 dry-run request envelope，但仍不真实连接。

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionPreconditionIntake.ts
```

profile 版本是：

```text
managed-audit-manual-sandbox-connection-precondition-intake.v1
```

服务入口是：

```ts
loadManagedAuditManualSandboxConnectionPreconditionIntake()
```

入口先读取上一版 Node 证据：

```ts
const sourceNodeV234Profile = loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal({
  config: input.config,
});
```

再构建三组核心材料：

```ts
const javaV91 = createJavaV91Reference(evidenceFiles, snippetMatches);
const miniKvV100 = createMiniKvV100Reference(evidenceFiles, snippetMatches, miniKvGuard);
const preconditionIntake = createPreconditionIntake(sourceNodeV234Profile, javaV91, miniKvV100);
```

这里的设计点是：v235 不自己凭空声明“可以推进”，而是把 Node v234 的阻断演练、Java v91 的前置条件 receipt、mini-kv v100 的 rolling guard 一起读进来，形成一个明确的 intake 结论。

## Node v234 来源检查

v235 读取：

```text
src/services/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.ts
```

并保留这些字段：

```ts
readyForBlockedExecutionRehearsal: source.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal
simulatedAttemptCount: source.blockedExecutionRehearsal.simulatedAttemptCount
blockedAttemptCount: source.blockedExecutionRehearsal.blockedAttemptCount
actualExecutionAttemptCount: source.blockedExecutionRehearsal.actualExecutionAttemptCount
readyForSandboxAdapterConnectionFromSource: false
connectsManagedAudit: false
readsManagedAuditCredential: false
schemaMigrationExecuted: false
```

这表示 v234 的结论仍然有效：所有危险动作只是 simulated-only，实际执行次数为 0。v235 不能绕过这个结论去打开连接。

## Java v91 证据

v235 读取 Java v91 的三个实际文件：

```text
D:\javaproj\advanced-order-platform\c\91\解释\说明.md
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\94-version-91-release-approval-sandbox-connection-precondition-receipt.md
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ReleaseApprovalManagedAuditSandboxConnectionPreconditionReceiptBuilder.java
```

对应代码是：

```ts
function createJavaV91Reference(...)
```

它检查 Java v91 是否明确提供这些前置条件字段：

```ts
ownerApprovalArtifactRequired
credentialHandleReviewRequired
schemaRehearsalEvidenceRequired
rollbackPathRequired
timeoutBudgetRequired
manualAbortMarkerRequired
```

同时也检查 Java 的边界：

```ts
ownerApprovalArtifactProvidedByJava: false
credentialValueReadByJava: false
schemaMigrationSqlExecutedByJava: false
externalManagedAuditConnectionOpenedByJava: false
actualConnectionAttemptedByJava: false
approvalLedgerWrittenByJava: false
```

也就是说，Java v91 只是把“需要哪些材料”讲清楚，不提供 secret、不跑 SQL、不写 ledger、不打开外部连接。

## mini-kv v100 证据

v235 读取 mini-kv v100 的五个实际文件：

```text
D:\C\mini-kv\c\100\解释\说明.md
D:\C\mini-kv\代码讲解记录_生产雏形阶段\156-version-100-current-runtime-fixture-rolling-guard.md
D:\C\mini-kv\fixtures\release\current-runtime-fixture-rolling-guard.json
D:\C\mini-kv\fixtures\release\runtime-smoke-evidence.json
D:\C\mini-kv\fixtures\release\verification-manifest.json
```

对应代码是：

```ts
function createMiniKvV100Reference(...)
```

关键字段是：

```ts
guardVersion: "mini-kv-current-runtime-fixture-rolling-guard.v1"
projectVersion: "0.100.0"
releaseVersion: "v100"
consumerHint: "Node v235 manual sandbox connection precondition intake"
currentArtifactPathHint: "c/100/"
currentLiveReadSessionEcho: "mini-kv-live-read-v100"
readOnly: true
executionAllowed: false
restoreExecutionAllowed: false
orderAuthoritative: false
historicalReceiptAnchorCount: 9
```

这里最关键的是 rolling guard：current runtime fixture 可以随 mini-kv 版本滚动，但 historical consumed receipt digest 必须稳定。v235 因此同步修正了旧沙箱链路，不再把 current fixture 写死在 v99。

## preconditionIntake

v235 的核心汇总函数是：

```ts
function createPreconditionIntake(...)
```

它输出：

```ts
markerSpan: "Node v234 + Java v91 + mini-kv v100"
intakeMode: "manual-sandbox-connection-precondition-intake-only"
requiredPreconditionCount: 6
documentedPreconditionCount: 6
handlesOnly: true
ownerApprovalArtifactIdField: "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"
credentialHandleNameField: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
schemaRehearsalIdField: "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"
rollbackPathIdField: "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"
manualAbortMarkerField: "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"
timeoutBudgetMs: 15000
```

并且强制保留执行边界：

```ts
actualConnectionAttempted: false
credentialValueRead: false
schemaMigrationExecuted: false
managedAuditStateWritten: false
upstreamServiceAutoStarted: false
miniKvExecutionPermissionInferred: false
```

`readyForDryRunRequestEnvelope=true` 只代表下一版可以生成 dry-run envelope，不代表连接已批准。

## checks

`createChecks()` 把来源证据和本版 intake 合成 readiness：

```ts
sourceNodeV234BlockedExecutionRehearsalReady
sourceNodeV234DigestPresent
sourceNodeV234StillBlocksAllDangerousOperations
javaV91EvidencePresent
javaV91PreconditionsAccepted
javaV91BoundaryAccepted
miniKvV100EvidencePresent
miniKvV100RollingGuardAccepted
miniKvV100RuntimeBoundaryAccepted
requiredPreconditionsDocumented
handlesOnlyIntake
noConnectionAttempted
noCredentialValueRead
noSchemaMigrationExecuted
noManagedAuditStateWritten
noUpstreamServiceAutoStarted
noMiniKvExecutionPermissionInferred
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

最后：

```ts
checks.readyForManagedAuditManualSandboxConnectionPreconditionIntake = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPreconditionIntake")
  .every(([, value]) => value);
```

这让 v235 的 ready 结论来自子检查，而不是手写常量。

## 路由

路由文件：

```text
src/routes/auditRoutes.ts
```

新增 import：

```ts
loadManagedAuditManualSandboxConnectionPreconditionIntake
renderManagedAuditManualSandboxConnectionPreconditionIntakeMarkdown
```

新增接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake
GET /api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake?format=markdown
```

注册方式仍然是：

```ts
registerAuditJsonMarkdownRoute(...)
```

这继承了 v225 之后的路由规范，没有退回手写 JSON/Markdown 分支。

## 旧链路 rolling fixture 兼容

v235 还修正了 v223-v234 旧沙箱链路对 mini-kv current runtime fixture 的读取方式。

涉及服务：

```text
src/services/managedAuditExternalAdapterConnectionReadinessReview.ts
src/services/managedAuditSandboxAdapterDryRunPackage.ts
src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts
src/services/managedAuditManualSandboxConnectionPacketVerification.ts
src/services/managedAuditManualSandboxConnectionPreflightVerification.ts
src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.ts
src/services/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.ts
```

调整原则是：

```text
current fixture 可以滚到 v100
historical consumed digest / receipt / marker 仍要稳定
旧版本测试不能把 current fixture 永久钉死在 v99
```

这是 v235 的一个隐性质量点：如果不修正，mini-kv v100 完成后 Node 的旧沙箱链路会被过期版本断言卡住。

## 测试

新增测试文件：

```text
test/managedAuditManualSandboxConnectionPreconditionIntake.test.ts
```

覆盖三类场景：

```text
1. 正常配置下生成 ready profile，六类前置条件全部 documented，且不打开连接。
2. UPSTREAM_ACTIONS_ENABLED=true 时 readiness 阻断，且仍不读取 credential、不尝试连接。
3. JSON / Markdown 路由均可访问，并返回 v235 profile。
```

已完成验证：

```text
npm run typecheck
结果：通过

npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts test/managedAuditManualSandboxConnectionRehearsalPacketReview.test.ts test/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts test/managedAuditManualSandboxConnectionPreconditionIntake.test.ts
结果：8 个测试文件通过，24 个用例通过

npm run build
结果：通过

npm test
结果：176 个测试文件通过，595 个用例通过

git diff --check
结果：通过，无空白错误
```

HTTP smoke 使用安全环境变量，只启动 Node 本服务，不启动 Java / mini-kv：

```text
PORT=4325
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
AUDIT_STORE_URL=managed-audit://contract-only
```

HTTP smoke 结果：

```text
GET /health -> status=ok
GET /api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake -> 200
GET /api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake?format=markdown -> 200 text/markdown
profileVersion=managed-audit-manual-sandbox-connection-precondition-intake.v1
intakeState=manual-sandbox-connection-precondition-intake-ready
requiredPreconditionCount=6
documentedPreconditionCount=6
readyForDryRunRequestEnvelope=true
actualConnectionAttempted=false
connectsManagedAudit=false
readsManagedAuditCredential=false
```

截图归档：

```text
D:\nodeproj\orderops-node\c\235\图片\managed-audit-manual-sandbox-connection-precondition-intake-v235.png
```

## 边界

本版没有做：

```text
没有打开 managed audit sandbox connection
没有读取 credential value
没有执行 schema migration
没有写 managed audit 状态
没有写 Java ledger 或执行 Java SQL
没有执行 mini-kv 写命令、LOAD、COMPACT、RESTORE
没有自动启动 Java / mini-kv
没有打开 production window
```

## 成熟度变化

v235 把“真实 sandbox connection 之前需要哪些材料”从口头计划推进成了 Node 可读、可测、可归档的 intake profile。项目还没有进入真实连接，但已经把连接前材料、只读边界、rolling fixture 兼容和下一版 dry-run envelope 的入口都整理好了。

一句话总结：

```text
v235 让 managed audit sandbox connection 从阻断演练推进到前置条件 intake，但仍然没有任何真实连接或写操作。
```
