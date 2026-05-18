# 第二百三十九版代码讲解：managed audit manual sandbox connection operator window evidence verification

本版目标是把 Node v238 operator window checklist、Java v93 checklist echo receipt、mini-kv v102 no-start/no-write receipt 合成一份只读验证报告。v239 不打开 managed audit sandbox connection，也不读取 credential value；它只确认三方对字段、digest、counts 和安全边界的理解一致。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

计划要求 Node v239 做：

```text
operator window evidence verification
消费 Node v238 + Java v93 + mini-kv v102
验证三方对 operator checklist 的字段、digest、no-write/no-start 边界一致
只做 verification，不做真实 sandbox connection
```

这说明当前主线已经从“人工窗口 checklist 生成”进入“跨项目窗口证据一致性验证”。用户特别说明 Java v94 / mini-kv v103 是优化 follow-up，所以 v239 仍然以 Java v93 + mini-kv v102 作为业务证据基线，不把后续优化版误判成新前置条件。

## 新增服务

新增文件：

```text
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts
```

profile 版本是：

```text
managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1
```

服务入口是：

```ts
loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification()
```

入口函数在 `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts:252`。它先构造安全视图：

```ts
const sourceChecklistConfig: AppConfig = {
  ...input.config,
  upstreamActionsEnabled: false,
};
```

然后读取 Node v238 checklist：

```ts
const sourceChecklist = loadManagedAuditManualSandboxConnectionOperatorWindowChecklist({
  config: sourceChecklistConfig,
});
```

这里的目的和 v238 一样：读取上一版 source material 时不要被当前运行开关污染。当前 `UPSTREAM_ACTIONS_ENABLED=true` 仍会阻断 v239 自己，但不会导致 v238 已归档材料变成“不可读”。

## profile 边界

返回对象在 `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts:287` 附近锁定这些字段：

```ts
readyForManagedAuditSandboxAdapterConnection: false,
readyForProductionAudit: false,
readyForProductionWindow: false,
readyForProductionOperations: false,
readOnlyVerification: true,
executionAllowed: false,
restoreExecutionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这组字段说明 v239 不是“连接版本”，而是“连接前证据验证版本”。它可以读文件、读 fixture、读已归档证据，但不能开连接、不能读 secret、不能写 audit state。

## Node v238 来源证据

`createSourceNodeV238()` 会把 v238 的 checklist 关键信息压成 source block：

```ts
sourceVersion: "Node v238"
profileVersion: source.profileVersion
checklistState: source.checklistState
checklistDigest: source.operatorWindowChecklist.checklistDigest
readyForOperatorWindowChecklist: source.readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist
readyForJavaV93EchoReceipt: source.operatorWindowChecklist.readyForJavaV93EchoReceipt
approvalItemCount: source.summary.approvalItemCount
checklistStepCount: source.summary.checklistStepCount
pauseConditionCount: source.summary.pauseConditionCount
forbiddenOperationCount: source.summary.forbiddenOperationCount
```

它还继续保留这些安全边界：

```ts
connectsManagedAudit: source.connectsManagedAudit
readsManagedAuditCredential: source.readsManagedAuditCredential
schemaMigrationExecuted: source.schemaMigrationExecuted
credentialValueRead: source.operatorWindowChecklist.credentialValueRead
actualConnectionAttempted: source.operatorWindowChecklist.actualConnectionAttempted
schemaMigrationRequested: source.operatorWindowChecklist.schemaMigrationRequested
upstreamServiceAutoStartRequested: source.operatorWindowChecklist.upstreamServiceAutoStartRequested
```

也就是说，v239 并不是重新生成 checklist，而是验证 v238 已经固化的 checklist 是否被上下游正确回显。

## Java v93 回显证据

Java v93 的读取和校验集中在：

```text
createJavaV93Reference()  @ managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts:427
```

它会检查四类文件：

```text
D:\javaproj\advanced-order-platform\c\93\解释\说明.md
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\96-version-93-release-approval-sandbox-connection-operator-window-checklist-echo-receipt.md
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ReleaseApprovalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceiptBuilder.java
D:\javaproj\advanced-order-platform\src\test\java\com\codexdemo\orderplatform\OpsOverviewIntegrationTests.java
```

然后用 snippet 判断 Java 是否真的回显了 Node v238 和 Node v239 需要的字段：

```ts
receiptVersionDocumented
sourceNodeV238ProfileDocumented
nextNodeV239ProfileDocumented
readyForNodeV239EvidenceVerification
checklistCountsDocumented
checklistFieldNamesEchoed
approvalItemsEchoed
pauseCodesEchoed
```

同时安全边界必须保持：

```ts
credentialHandleOnly: true
credentialValueReadByJava: false
schemaMigrationSqlExecutedByJava: false
approvalLedgerWrittenByJava: false
actualConnectionAttemptedByJava: false
javaAutoStartForbidden: true
```

这里很关键：Java v93 只回显 checklist，不写 ledger、不执行 SQL、不打开连接。

## mini-kv v102 回显证据

mini-kv v102 的读取和校验集中在：

```text
createMiniKvV102Reference()  @ managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts:474
```

主要读取：

```text
D:\C\mini-kv\fixtures\release\operator-window-no-start-no-write-receipt.json
D:\C\mini-kv\fixtures\release\runtime-smoke-evidence.json
D:\C\mini-kv\代码讲解记录_生产雏形阶段\158-version-102-operator-window-no-start-no-write-receipt.md
D:\C\mini-kv\tests\operator_window_no_start_no_write_receipt_tests.cpp
```

v239 明确要求 mini-kv receipt 是 v102 业务证据：

```ts
reference.projectVersion === "0.102.0"
reference.releaseVersion === "v102"
reference.consumerHint === "Node v239 manual sandbox connection operator window evidence verification"
reference.sourceChecklist === "Node v238 manual sandbox connection operator window checklist"
reference.currentArtifactPathHint === "c/102/"
reference.currentLiveReadSessionEcho === "mini-kv-live-read-v102"
```

边界检查由 `miniKvBoundaryAccepted()` 统一判断：

```ts
reference.readOnly
&& !reference.executionAllowed
&& !reference.restoreExecutionAllowed
&& !reference.orderAuthoritative
&& !reference.nodeAutoStartAllowed
&& !reference.javaAutoStartAllowed
&& !reference.miniKvAutoStartAllowed
&& !reference.connectionExecutionAllowed
&& !reference.writeCommandsExecuted
&& !reference.adminCommandsExecuted
&& !reference.runtimeWriteObserved
&& !reference.managedAuditStore
&& !reference.storageWriteAllowed
&& !reference.managedAuditWriteExecuted
&& !reference.sandboxManagedAuditStateWriteAllowed
&& !reference.credentialValueRequired
&& !reference.credentialValueReadAllowed
&& !reference.schemaRehearsalExecutionAllowed
&& !reference.schemaMigrationExecutionAllowed
&& !reference.loadRestoreCompactExecuted
&& !reference.setnxexExecutionAllowed
&& !reference.operatorWindowWriteAllowed
```

这说明 mini-kv 仍然只是 runtime evidence provider，不是 managed audit storage backend，也不是 Java 订单权威存储。

## 一致性验证

核心汇总函数是：

```text
createOperatorWindowEvidenceVerification()  @ managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts:566
```

它比较三类证据：

```ts
const checklistCountsAligned = source.approvalItemCount === 3
  && source.checklistStepCount === 8
  && source.pauseConditionCount === 8
  && source.forbiddenOperationCount === 6
  && javaV93.checklistCountsDocumented
  && miniKvV102.approvalItemCount === source.approvalItemCount
  && miniKvV102.checklistStepCount === source.checklistStepCount
  && miniKvV102.pauseConditionCount === source.pauseConditionCount
  && miniKvV102.forbiddenOperationCount === source.forbiddenOperationCount;
```

然后再检查边界：

```ts
const boundaryFlagsAligned = !source.readyForSandboxAdapterConnectionFromSource
  && !source.connectsManagedAudit
  && !source.readsManagedAuditCredential
  && !source.schemaMigrationExecuted
  && !source.credentialValueRead
  && !source.actualConnectionAttempted
  && !source.schemaMigrationRequested
  && !source.upstreamServiceAutoStartRequested
  && !javaV93.credentialValueReadByJava
  && !javaV93.schemaMigrationSqlExecutedByJava
  && !javaV93.approvalLedgerWrittenByJava
  && !javaV93.actualConnectionAttemptedByJava
  && miniKvBoundaryAccepted(miniKvV102);
```

最终输出：

```ts
markerSpan: "Node v238 + Java v93 + mini-kv v102"
verificationMode: "manual-sandbox-connection-operator-window-evidence-verification-only"
javaEchoAccepted: true
miniKvReceiptAccepted: true
checklistCountsAligned: true
boundaryFlagsAligned: true
connectionExecutionAllowed: false
credentialValueReadAllowed: false
schemaMigrationExecutionAllowed: false
managedAuditWriteAllowed: false
automaticServiceStartAllowed: false
miniKvExecutionAllowed: false
nodeV239BlocksRealConnection: true
```

## checks 与阻塞项

`createChecks()` 在 `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts:634` 合成 readiness：

```ts
sourceNodeV238ChecklistReady
sourceNodeV238StillConnectionBlocked
sourceNodeV238ChecklistDigestPresent
javaV93EvidencePresent
javaV93EchoAccepted
javaV93NoWriteNoSqlNoCredentialBoundaryAccepted
miniKvV102EvidencePresent
miniKvV102NoStartNoWriteReceiptAccepted
miniKvV102BoundaryAccepted
checklistCountsAlignedAcrossSources
operatorChecklistSourceAligned
credentialValueStillForbidden
schemaMigrationStillBlocked
externalConnectionStillBlocked
managedAuditWritesStillBlocked
automaticServiceStartStillBlocked
miniKvExecutionStillBlocked
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

其中：

```ts
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false
```

这让 v239 在 `UPSTREAM_ACTIONS_ENABLED=true` 时进入 blocked。测试也专门覆盖了这个场景，确保 source evidence 仍可读，但当前运行状态不会误放行。

## 路由

路由文件：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
```

新增导入在 `auditRoutes.ts:164`：

```ts
loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification
renderManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerificationMarkdown
```

新增接口在 `auditRoutes.ts:411`：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification?format=markdown
```

注册继续使用：

```ts
registerAuditJsonMarkdownRoute(...)
```

这延续了前面几版的路由收敛，不再增加手写 JSON/Markdown 分支。

## 测试覆盖

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts
```

第一组测试在 `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts:10`：

```text
verifies Node v238 against Java v93 and mini-kv v102 without opening a connection
```

它确认：

```text
verificationState=ready
javaEchoAccepted=true
miniKvReceiptAccepted=true
checklistCountsAligned=true
boundaryFlagsAligned=true
connectionExecutionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
```

第二组测试在 `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts:165`：

```text
blocks verification when upstream actions are enabled while keeping source evidence readable
```

它确认 `UPSTREAM_ACTIONS_ENABLED=true` 会让 v239 blocked，但不会让 Java v93 / mini-kv v102 source evidence 消失。

第三组测试在 `managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts:183`：

```text
exposes JSON and Markdown routes for v239 operator window evidence verification
```

这覆盖 JSON 和 Markdown 两个出口。

## 兼容修补

本版还修正了一个真实开发里容易出现的问题：mini-kv 的 current runtime fixture 已经滚动到 v102，但 Node v223-v238 历史链路里有些 profile 仍按旧 current release 判断，导致新版本会 false block。v239 把这些历史链路的 accepted current evidence 扩展到 v102，同时保留各自历史 digest / receipt 语义。

这不是把 v102 强行变成所有旧版本的业务新依赖，而是让“当前 rolling evidence fixture”不会把旧链路误判为缺失。计划文件也明确写入：Java v94 / mini-kv v103 属于优化 follow-up，不改变 v239 的业务证据边界。

## 验证、归档和成熟度变化

运行调试归档写入：

```text
D:\nodeproj\orderops-node\c\239\解释\managed-audit-manual-sandbox-connection-operator-window-evidence-verification-v239.md
D:\nodeproj\orderops-node\c\239\图片\managed-audit-manual-sandbox-connection-operator-window-evidence-verification-v239.png
D:\nodeproj\orderops-node\c\239\managed-audit-manual-sandbox-connection-operator-window-evidence-verification-v239.html
```

本版验证覆盖：

```text
npm run typecheck
结果：通过

聚焦 vitest 链路
test/managedAuditManualSandboxConnectionReadinessGate.test.ts
test/managedAuditManualSandboxConnectionOperatorWindowChecklist.test.ts
test/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts
结果：3 个测试文件通过，9 个用例通过

npm run build
结果：通过

HTTP smoke
结果：
- /health：status=ok
- /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification：200
- /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification?format=markdown：200
- verificationState=manual-sandbox-connection-operator-window-evidence-verification-ready
- javaEchoAccepted=true
- miniKvReceiptAccepted=true

npm test
结果：180 个测试文件通过，607 个用例通过

git diff --check
结果：通过，仅提示既有 LF/CRLF 工作区换行转换警告
```

成熟度变化是：v238 只是准备人工窗口 checklist；v239 则确认 Node、Java、mini-kv 三方对 checklist 的字段、数量、digest 和禁用动作一致。它让后续 Node v240 可以生成 disabled dry-run command package，但仍然没有授权真实 sandbox connection。

## 一句话总结

v239 把 operator window checklist 的三项目证据做成了只读一致性验证，明确 Java v94 / mini-kv v103 只是优化 follow-up，并继续阻断真实连接、credential value、schema migration、managed audit 写入和上游自动启动。
