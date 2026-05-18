# 第二百三十七版代码讲解：managed audit manual sandbox connection readiness gate

本版目标是把 Node v236 的 dry-run request envelope、Java v92 的 envelope echo receipt、mini-kv v101 的 no-start/no-write follow-up 合成一个 readiness gate。v237 只判断材料是否可以进入下一步人工 operator window checklist，不打开 managed audit sandbox connection，不读取 credential value，不执行 schema migration，也不写 managed audit state。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v236-post-dry-run-envelope-roadmap.md
```

计划要求 Node v237 做：

```text
manual sandbox connection readiness gate
消费 Node v236 + Java v92 + mini-kv v101
判断是否具备申请一次真实沙箱连接窗口的材料
默认仍关闭，不执行真实连接
```

这说明当前主线从“生成 dry-run request envelope”推进到了“连接窗口前的材料 gate”。本版完成后，下一步仍不是连接，而是：

```text
Node v238：manual sandbox connection operator window checklist
```

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionReadinessGate.ts
```

profile 版本是：

```text
managed-audit-manual-sandbox-connection-readiness-gate.v1
```

服务入口是：

```ts
loadManagedAuditManualSandboxConnectionReadinessGate()
```

入口先读取上一版 Node 证据：

```ts
const sourceNodeV236Profile = loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope({
  config: sourceEnvelopeConfig,
});
```

这里使用 `sourceEnvelopeConfig` 是本版的一个关键细节：读取 source material 时固定 `upstreamActionsEnabled=false`，让 v236 材料判断保持稳定；当前 v237 仍用真实 `input.config` 检查运行时 blocker。

## source material 与 runtime blocker 分离

v237 明确拆开两层语义：

```ts
const sourceEnvelopeConfig: AppConfig = {
  ...input.config,
  upstreamActionsEnabled: false,
};
```

这样当测试或部署环境把 `UPSTREAM_ACTIONS_ENABLED=true` 打开时，v237 会正确阻断 readiness gate：

```ts
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false
```

但它不会把 Node v236 / Java v92 / mini-kv v101 的历史材料误判成缺失。这个模式后续版本也要沿用：材料就绪不等于运行开关打开。

## Node v236 来源检查

v237 通过：

```ts
createSourceNodeV236()
```

保留 v236 envelope 的关键字段：

```ts
envelopeState: source.envelopeState
envelopeDigest: source.dryRunRequestEnvelope.envelopeDigest
readyForDryRunRequestEnvelope: source.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope
readyForOperatorReview: source.dryRunRequestEnvelope.readyForOperatorReview
operatorReviewFieldCount: source.dryRunRequestEnvelope.operatorReviewFieldCount
credentialHandleOnly: source.dryRunRequestEnvelope.credentialHandleOnly
credentialValueIncluded: source.dryRunRequestEnvelope.credentialValueIncluded
actualConnectionAttempted: source.dryRunRequestEnvelope.actualConnectionAttempted
```

v237 要求 v236 仍然是 handle-only、non-executing：

```ts
sourceEnvelopeAccepted: sourceNodeV236.readyForDryRunRequestEnvelope
  && sourceNodeV236.readyForOperatorReview
  && sourceNodeV236.operatorReviewFieldCount === 6
```

## Java v92 echo receipt

Java 侧引用由：

```ts
createJavaV92Reference()
```

读取以下文件：

```text
D:\javaproj\advanced-order-platform\c\92\解释\说明.md
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\95-version-92-release-approval-sandbox-connection-dry-run-envelope-echo-receipt.md
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ReleaseApprovalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceiptBuilder.java
```

关键检查包括：

```ts
consumedNodeV236DryRunRequestEnvelope
consumedProfileMatched
nextNodeReadinessGateVersionMatched
echoedEnvelopeFieldCount === 6
credentialHandleOnly
!credentialValueIncludedInEnvelope
!credentialValueReadByJava
!actualConnectionAttemptedByJava
!schemaMigrationSqlExecutedByJava
!approvalLedgerWrittenByJava
!managedAuditStoreWrittenByJava
```

这保证 Java v92 只回显 envelope 字段名，不打开连接、不读 credential、不执行 SQL、不写 ledger。

## mini-kv v101 no-start/no-write follow-up

mini-kv 侧引用由：

```ts
createMiniKvV101Reference()
```

读取：

```text
D:\C\mini-kv\fixtures\release\runtime-no-start-no-write-follow-up.json
```

核心字段包括：

```ts
followUpVersion === "mini-kv-runtime-no-start-no-write-follow-up.v1"
projectVersion === "0.101.0"
releaseVersion === "v101"
consumerHint === "Node v237 manual sandbox connection readiness gate"
sourceEnvelopeProducer === "Node v236 manual sandbox connection dry-run request envelope"
operatorReviewFieldCount === 6
credentialHandleOnly
!credentialValueIncluded
!actualConnectionAttempted
!schemaMigrationRequested
!managedAuditStateWriteRequested
!upstreamServiceAutoStartRequested
!miniKvPermissionRequested
```

运行边界继续保持：

```ts
readOnly: true
executionAllowed: false
nodeAutoStartAllowed: false
javaAutoStartAllowed: false
miniKvAutoStartAllowed: false
connectionExecutionAllowed: false
writeCommandsExecuted: false
managedAuditStore: false
credentialValueReadAllowed: false
restoreExecutionAllowed: false
orderAuthoritative: false
```

这让 Node 可以确认 mini-kv 仍然只是 runtime evidence provider，不是 audit storage backend，也不是 Java order authority。

## readinessGate

v237 的核心汇总函数是：

```ts
function createReadinessGate(...)
```

它合成三方结论：

```ts
sourceEnvelopeAccepted: ...
javaEchoReceiptAccepted: javaV92.readyForNodeV237Gate
miniKvNoStartNoWriteAccepted: miniKvV101.readyForNodeV237Gate
readyForOperatorWindowChecklist: sourceNodeV236.readyForDryRunRequestEnvelope
  && javaV92.readyForNodeV237Gate
  && miniKvV101.readyForNodeV237Gate
```

并继续锁死真实动作：

```ts
readyForManagedAuditSandboxAdapterConnection: false
actualConnectionAttempted: false
credentialValueRead: false
schemaMigrationRequested: false
managedAuditStateWriteRequested: false
upstreamServiceAutoStartRequested: false
miniKvExecutionPermissionInferred: false
productionWindowOpened: false
```

`readyForOperatorWindowChecklist=true` 的含义只是“可以写下一版人工 checklist”，不是“可以连接”。

## checks

`createChecks()` 把来源材料、上游 evidence 和运行时配置合成 gate 结论：

```ts
sourceNodeV236DryRunEnvelopeReady
sourceEnvelopeDigestPresent
sourceStillHandleOnlyAndNonExecuting
javaV92EvidencePresent
javaV92EchoReceiptAccepted
javaV92BoundaryAccepted
miniKvV101EvidencePresent
miniKvV101FollowUpAccepted
miniKvV101BoundaryAccepted
readinessGateDigestPresent
readyForOperatorWindowChecklist
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

最后 readiness 来自所有检查：

```ts
checks.readyForManagedAuditManualSandboxConnectionReadinessGate = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionReadinessGate")
  .every(([, value]) => value);
```

## 旧链路 rolling evidence 修正

由于 mini-kv 已滚到 v101，本版还同步修正了 v223-v237 旧沙箱链路对 current runtime fixture 的识别。相关文件包括：

```text
src/services/managedAuditExternalAdapterConnectionReadinessReview.ts
src/services/managedAuditSandboxAdapterDryRunPackage.ts
src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts
src/services/managedAuditManualSandboxConnectionPacketVerification.ts
src/services/managedAuditManualSandboxConnectionPreflightVerification.ts
src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.ts
src/services/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.ts
src/services/managedAuditManualSandboxConnectionPreconditionIntake.ts
```

这不是放宽安全边界，而是承认“当前 release / digest / consumer hint 会滚动”，同时继续保留历史 consumed digest / receipt 锚点。

## 路由

路由文件：

```text
src/routes/auditRoutes.ts
```

新增接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate
GET /api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate?format=markdown
```

注册方式继续使用：

```ts
registerAuditJsonMarkdownRoute(...)
```

这继承 v225 之后的路由规范，没有新增重复的 querystring schema + format 分支。

## 测试

新增测试文件：

```text
test/managedAuditManualSandboxConnectionReadinessGate.test.ts
```

覆盖三类场景：

```text
1. 正常配置下，v237 消费 Node v236 + Java v92 + mini-kv v101 并生成 ready gate。
2. UPSTREAM_ACTIONS_ENABLED=true 时，gate readiness 被阻断，但 source material 仍可进入 operator checklist，且不连接、不读 credential。
3. JSON / Markdown route 均可访问，并返回 v237 profile。
```

聚焦验证已完成：

```text
npm run typecheck
结果：通过

npx vitest run ... v223-v237 managed audit sandbox 链路测试
结果：13 个测试文件通过，39 个用例通过
```

最终验证：

```text
npm run build
结果：通过

npm test
结果：178 个测试文件通过，601 个用例通过

git diff --check
结果：通过，仅提示 Git CRLF/LF 换行提示，无空白错误
```

HTTP smoke 使用安全环境变量，只启动 Node 本服务，不启动 Java / mini-kv：

```text
PORT=4328
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
AUDIT_STORE_URL=managed-audit://contract-only
```

结果：

```text
GET /health -> status=ok
GET /api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate -> 200
GET /api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate?format=markdown -> 200 text/markdown
profileVersion=managed-audit-manual-sandbox-connection-readiness-gate.v1
gateState=manual-sandbox-connection-readiness-gate-ready
readyForOperatorWindowChecklist=true
readyForManagedAuditSandboxAdapterConnection=false
connectsManagedAudit=false
readsManagedAuditCredential=false
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

v237 把“请求信封 -> 上游回显 -> runtime no-start/no-write follow-up”合成了一个可验证 gate。项目已经更接近真实生产流程，但仍处在“连接前人工窗口准备”阶段。下一步 Node v238 应写 operator window checklist，而不是直接实现真实 adapter connection。

一句话总结：v237 证明三方材料可以进入人工窗口 checklist，但真实 managed audit sandbox connection 仍然关闭。
