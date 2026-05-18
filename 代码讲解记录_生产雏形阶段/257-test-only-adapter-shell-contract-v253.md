# 第二百五十三版代码讲解：test-only adapter shell contract

本版目标是在 v252 disabled adapter client precheck 之后，定义一个 test-only adapter shell contract。它不是生产 client，也不是 sandbox external endpoint 调用；它只把 fake transport 下的 request / response / failure mapping / guard conditions 固化成机器可读 profile。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v252-post-disabled-adapter-client-precheck-roadmap.md
```

v252 已完成：

```text
disabled adapter client precheck
```

v253 接在它后面做：

```text
test-only adapter shell contract
```

这说明主线从“禁用态 client precheck”推进到“fake transport shell 契约”。但当前仍不连接真实 managed audit。

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.ts
```

核心 profile 锁住边界：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1";
shellContractState: "test-only-adapter-shell-contract-ready" | "blocked";
readyForManagedAuditSandboxAdapterConnection: false;
testOnlyShell: true;
readOnlyContract: true;
executionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

这里 ready 的对象是 shell contract，不是 sandbox adapter connection。

## 消费 v252 precheck

v253 通过：

```ts
loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({
  config: input.config,
})
```

消费 v252，然后压缩为：

```ts
readyForDisabledAdapterClientPrecheck
requiredEnvHandleCount
failureClassCount
dryRunResponseFieldCount
clientImplementationStatus: "not-implemented"
externalRequestStillBlocked: true
credentialValueStillBlocked: true
```

这保证 v253 是 v252 的后续契约，不重复读取 Java / mini-kv，也不绕过 v252 的禁用边界。

## testOnlyAdapterShellContract

核心对象：

```ts
shellName: "ManagedAuditManualSandboxTestOnlyAdapterShell"
shellMode: "test-only-fake-transport-contract"
transportKind: "fake-in-memory"
realClientImplemented: false
realTransportAllowed: false
fakeTransportOnly: true
clientMayBeInstantiatedForProduction: false
externalRequestMayBeSent: false
credentialValueMayBeLoaded: false
```

这几行是本版安全边界：它允许 fake transport contract 存在，但不允许真实 transport 或 production client 存在。

## requestShape

`createRequestShape()` 定义：

```ts
credentialHandleOnly: true
credentialValueAccepted: false
endpointHandleOnly: true
externalUrlAccepted: false
payloadMayContainSecrets: false
```

也就是说，v253 request 可以带 handle 名称，但不能带 credential value，也不能带真实 URL。

## responseShape

`createResponseShape()` 定义：

```ts
fakeTransportResponseOnly: true
connectionAttempted: false
externalRequestSent: false
credentialValueRead: false
schemaMigrationExecuted: false
productionRecordWritten: false
```

这让响应形状也不会暗示真实 side effect。

## failureMapping

`createFailureMapping()` 把 v252 的六类失败映射到 test-only shell code：

```ts
ADAPTER_CLIENT_DISABLED -> TEST_ONLY_SHELL_DISABLED
CREDENTIAL_HANDLE_MISSING -> TEST_ONLY_CREDENTIAL_HANDLE_MISSING
CREDENTIAL_VALUE_REQUESTED -> TEST_ONLY_CREDENTIAL_VALUE_BLOCKED
ENDPOINT_HANDLE_MISSING -> TEST_ONLY_ENDPOINT_HANDLE_MISSING
SCHEMA_REHEARSAL_MISSING -> TEST_ONLY_SCHEMA_REHEARSAL_MISSING
MANUAL_WINDOW_NOT_OPEN -> TEST_ONLY_MANUAL_WINDOW_NOT_OPEN
```

重点是 `CREDENTIAL_VALUE_REQUESTED` 仍然映射到 blocked，不会因为 test-only shell 存在就允许 credential value。

## fakeTransportProbe

`createFakeTransportProbe()` 生成一个 probe：

```ts
requestId: "managed-audit-v253-test-only-shell-probe"
transportKind: "fake-in-memory"
acceptedByFakeTransport: true
responseStatus: "fake-transport-accepted"
responseCode: "TEST_ONLY_FAKE_TRANSPORT"
connectionAttempted: false
externalRequestSent: false
credentialValueRead: false
productionRecordWritten: false
```

这个 probe 只证明 shell shape 可以被 fake transport 接受，不证明真实连接可用。

## checks

`createChecks()` 验证：

```ts
sourceNodeV252Ready
sourceStillBlocksExternalRequest
sourceStillBlocksCredentialValue
fakeTransportOnly
requestShapeHandleOnly
responseShapeDoesNotClaimRealConnection
failureMappingCoversSourceTaxonomy
guardConditionsDeclared
fakeTransportProbeNoExternalRequest
fakeTransportProbeNoCredentialRead
fakeTransportProbeNoProductionWrite
upstreamActionsStillDisabled
```

所有检查通过后，才会得到：

```ts
readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract=true
```

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route table 注册：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
  (deps) => loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({ config: deps.config }),
  renderManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractMarkdown,
)
```

仍然沿用共享 route table，不回到手写 JSON / Markdown 双路由。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.test.ts
```

覆盖：

```text
1. v252 ready 时，v253 shell contract ready，但 fake-only、无真实连接、无 credential value
2. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
3. JSON / Markdown route 均可访问
```

聚焦验证：

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.test.ts test\managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.test.ts
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 193 files passed, 647 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/253/图片/test-only-adapter-shell-contract-v253.png
```

HTTP smoke 断言：

```ts
healthStatus: "ok"
shellContractState: "test-only-adapter-shell-contract-ready"
ready: true
transportKind: "fake-in-memory"
fakeTransportOnly: true
externalRequestSent: false
credentialValueRead: false
productionRecordWritten: false
failureMappingCount: 6
checkCount: 16
passedCheckCount: 16
```

## 下一步

v253 完成后，当前计划不要求 Node 继续抢跑。下一步是推荐并行：

```text
Java v102 + mini-kv v111
```

两边只读 echo / non-participation 完成后，Node v254 再做三方 echo verification。

## 一句话总结

v253 把 test-only adapter shell 的 fake transport 契约写清楚了：request 只收 handle，response 不声明真实 side effect，失败映射继续阻断 credential value；它仍然不是可连接的 managed audit client。
