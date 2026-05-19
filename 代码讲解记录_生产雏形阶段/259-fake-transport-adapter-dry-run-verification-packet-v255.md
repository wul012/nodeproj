# 第二百五十五版代码讲解：fake transport adapter dry-run verification packet

本版目标是在 Node v254 三方 echo verification 之后，生成一个 fake transport adapter dry-run verification packet。它验证 request / response / timeout / failure mapping / cleanup，但不升级为真实 managed audit client。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v252-post-disabled-adapter-client-precheck-roadmap.md
```

v252-v254 已经完成：

```text
v252 disabled adapter client precheck
v253 test-only adapter shell contract
Java v102 + mini-kv v111 只读 echo / non-participation
v254 disabled adapter client upstream echo verification
```

v255 是这份计划的最后一个执行版本：fake transport adapter dry-run verification packet。完成后当前计划应收口，后续真实 endpoint / credential resolver / schema migration rehearsal 必须另起新计划。

## 模块拆分

新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.ts
src/services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketTypes.ts
src/services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketRenderer.ts
```

这次从一开始就拆 types 和 renderer，避免继续制造 700+ 行单 service。

## 主 profile

核心类型定义：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1";
packetState: "fake-transport-adapter-dry-run-verification-packet-ready" | "blocked";
readyForManagedAuditSandboxAdapterConnection: false;
fakeTransportOnly: true;
dryRunOnly: true;
executionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

这里 ready 的对象是 fake transport dry-run packet，不是 sandbox adapter connection。

## 消费 Node v253 / v254

主服务读取两个来源：

```ts
const sourceNodeV253 = createSourceNodeV253(
  loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({ config: input.config }),
);
const sourceNodeV254 = createSourceNodeV254(
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({ config: input.config }),
);
```

`createSourceNodeV253()` 把 shell shape 固定下来：

```ts
requestShapeFieldCount: source.testOnlyAdapterShellContract.requestShapeFieldCount,
responseShapeFieldCount: source.testOnlyAdapterShellContract.responseShapeFieldCount,
failureMappingCount: source.testOnlyAdapterShellContract.failureMappingCount,
guardConditionCount: source.testOnlyAdapterShellContract.guardConditionCount,
fakeTransportOnly: true,
realClientImplemented: false,
realTransportAllowed: false,
```

`createSourceNodeV254()` 把三方 echo 的边界结果接进来：

```ts
javaV102EchoReady: source.checks.javaV102EchoReady,
miniKvV111NonParticipationReady: source.checks.miniKvV111NonParticipationReady,
credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
```

这保证 v255 是 v253/v254 的后续，不绕过前序 gate。

## dry-run request

`createDryRunRequest()` 生成 handle-only 请求：

```ts
requestId: "managed-audit-v255-fake-transport-dry-run",
operation: "managed-audit-sandbox-connection-dry-run",
transportKind: "fake-in-memory",
credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
timeoutBudgetMs: 15000,
dryRun: true,
fakeTransportOnly: true,
credentialValueIncluded: false,
rawEndpointUrlIncluded: false,
payloadMayContainSecrets: false,
```

这里明确没有 credential value，也没有 raw endpoint URL。

## dry-run response

`createDryRunResponse()` 固化 fake-only 响应：

```ts
status: "fake-transport-dry-run-accepted",
code: "TEST_ONLY_FAKE_TRANSPORT_DRY_RUN",
fakeTransportOnly: true,
connectionAttempted: false,
externalRequestSent: false,
credentialValueRead: false,
schemaMigrationExecuted: false,
productionRecordWritten: false,
```

它不会暗示真实连接成功，只证明 fake transport packet shape 可被接受。

## timeout budget

timeout budget 写成：

```ts
timeoutBudgetMs: 15000,
finiteBudget: true,
budgetSource: "operator-review-field",
budgetSpent: false,
timerStarted: false,
timeoutClassifiable: true,
```

这表示 v255 只记录 timeout 策略，不启动真实计时器，也不发网络请求。

## failureMappingVerification

失败映射验证：

```ts
sourceFailureMappingCount: sourceNodeV253.failureMappingCount,
mappedFailureCount: sourceNodeV254.failureClassCountAligned ? 6 : 0,
allFailuresNonRetryable: true,
credentialValueRequestStillBlocked: sourceNodeV254.credentialBoundaryAligned,
manualWindowClosedStillBlocked: true,
failureMappingCovered: sourceNodeV253.failureMappingCount === 6 && sourceNodeV254.failureClassCountAligned,
```

重点是 `credentialValueRequestStillBlocked=true`，fake transport dry-run 不能绕过 credential boundary。

## cleanup

cleanup 是 in-memory only：

```ts
inMemoryOnly: true,
temporaryDirectoryCreated: false,
temporaryFileCreated: false,
cleanupRequired: false,
cleanupArtifactCount: 0,
cleanupVerified: true,
nodeServiceStartedByPacket: false,
```

这和以前写 `.tmp` 的 dry-run adapter 不同：v255 本身不需要写临时目录，所以 cleanup 的证明是“没有创建需要清理的东西”。

## checks

`createChecks()` 聚合：

```ts
sourceNodeV253Ready
sourceNodeV254Ready
sourceBoundariesStillClosed
fakeTransportOnly
requestShapeMatchesShell
responseShapeMatchesShell
timeoutBudgetVerified
failureMappingVerified
cleanupVerified
credentialBoundaryClosed
connectionBoundaryClosed
writeBoundaryClosed
autoStartBoundaryClosed
upstreamActionsStillDisabled
```

最终 ready 仍然排除自引用字段后计算：

```ts
checks.readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket")
  .every(([, value]) => value);
```

只要 `UPSTREAM_ACTIONS_ENABLED=true`，或者 v253/v254 任一来源不是 ready，v255 都会 blocked。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route table 注册：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
  (deps) => loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketMarkdown,
)
```

仍然沿用共享 `auditJsonMarkdownRoute`，没有新增手写 JSON / Markdown 双路由。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.test.ts
```

覆盖：

```text
1. v253/v254 ready 时，v255 packet ready，且无连接/credential/write/auto-start side effect
2. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
3. JSON / Markdown route 均可访问
```

聚焦验证：

```text
npm run typecheck
npm test -- managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.test.ts managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.test.ts managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.test.ts
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 195 files passed, 654 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/255/图片/fake-transport-adapter-dry-run-verification-packet-v255.png
```

## 成熟度变化

v255 把 disabled adapter client 主线收口到了 fake transport dry-run packet：

```text
v252 precheck
 -> v253 shell contract
 -> v254 upstream echo verification
 -> v255 fake transport dry-run packet
```

当前系统比 v252 更接近真实开发流程，因为已经具备 precheck、shell、上游回显和 dry-run packet 四层证据。但它仍然没有真实外部连接能力。

## 一句话总结

v255 固化了 fake transport adapter dry-run packet：request 只带 handle，response 只表达 fake result，timeout 不实际花费，cleanup 证明无临时产物，所有真实 managed audit side effect 继续关闭。
