# 第二百六十四版代码讲解：sandbox endpoint credential resolver test-only shell contract

本版目标是消费 Node v263 的 disabled resolver precheck upstream echo verification，定义一个更窄的 credential resolver test-only shell contract。它不是 secret provider，不是真实 resolver client，也不是 external endpoint adapter；它只描述 fake in-memory resolver 在未来测试链路里的 request、response、failure mapping 和 guard。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v263-post-disabled-resolver-echo-roadmap.md
```

当前链路是：

```text
Node v262 disabled credential resolver precheck
 -> Java v106 disabled precheck echo marker
 -> mini-kv v115 disabled precheck non-participation receipt
 -> Node v263 disabled precheck upstream echo verification
 -> Node v264 credential resolver test-only shell contract
```

v264 完成后，下一步是推荐并行 Java v107 + mini-kv v116，只读回显 / 非参与本版 fake shell contract。两边完成前 Node 不推进 v265。

## 新增文件

本版新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractRenderer.ts
```

测试文件：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.test.ts
```

路由接入：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

这延续 v263 计划中的质量要求：新增 profile 从一开始拆出 types / renderer，不把一个 service 文件继续扩成大块。

## 主 profile

v264 的 profile version 和 route 在服务顶部定义：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract";
```

返回对象继续把危险动作写死为 false：

```ts
credentialResolverExecutionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
credentialValueRead: false,
credentialValueLoaded: false,
credentialValueStored: false,
credentialValueIncluded: false,
rawEndpointUrlParsed: false,
rawEndpointUrlIncluded: false,
externalRequestSent: false,
secretProviderInstantiated: false,
resolverClientInstantiated: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这里的 `readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract=true` 只表示 fake shell contract 可以被 Java/mini-kv 回显，不表示真实 resolver 可以执行。

## 消费 Node v263

主服务先读取 v263：

```ts
const sourceNodeV263 = createSourceNodeV263(
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
    config: input.config,
  }),
);
```

`createSourceNodeV263()` 会确认 v263 已经完成三方验证：

```ts
reference.sourceNodeV262Ready
&& reference.javaV106EchoReady
&& reference.miniKvV115NonParticipationReady
&& reference.disabledPrecheckAligned
&& reference.requiredEnvHandlesAligned
&& reference.optInGatesAligned
&& reference.failureTaxonomyAligned
&& reference.dryRunResponseShapeAligned
&& reference.inheritedNoGoConditionsAligned
```

也要求 v263 的五类边界继续关闭：

```ts
reference.credentialBoundaryAligned
&& reference.rawEndpointBoundaryAligned
&& reference.connectionBoundaryAligned
&& reference.writeBoundaryAligned
&& reference.autoStartBoundaryAligned
```

所以 v264 不是直接凭空定义 fake shell，而是先确认 v263 的 disabled precheck echo 已经安全收口。

## Request shape

`createRequestShape()` 固化 9 个字段：

```ts
const REQUEST_SHAPE_FIELDS = [
  "requestId",
  "operation",
  "credentialHandle",
  "endpointHandle",
  "resolverPolicyHandle",
  "approvalMarker",
  "approvalCorrelationId",
  "dryRun",
  "fakeResolverOnly",
] as const;
```

请求只允许 handle 和 marker：

```ts
credentialHandleOnly: true,
credentialValueAccepted: false,
endpointHandleOnly: true,
rawEndpointUrlAccepted: false,
resolverPolicyHandleRequired: true,
approvalMarkerRequired: true,
payloadMayContainSecrets: false,
```

这点是 v264 的核心边界：可以定义 fake resolver shell 的输入形状，但不能接受 credential value 或 raw endpoint URL。

## Response shape

`createResponseShape()` 固化 fake-only 输出：

```ts
fakeResolverResponseOnly: true,
resolverClientInstantiated: false,
secretProviderInstantiated: false,
credentialValueRead: false,
credentialValueLoaded: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
connectsManagedAudit: false,
schemaMigrationExecuted: false,
productionRecordWritten: false,
```

因此测试 shell 的响应不会暗示真实连接已经发生，也不会把 fake probe 伪装成生产结果。

## Failure mapping

`createFailureMapping()` 直接消费 v263 的 failure taxonomy：

```ts
return sourceFailureCodes.map((code) => ({
  sourceFailureCode: code,
  shellFailureCode: `TEST_ONLY_${code}`,
  mappedAction: actionByCode.get(code) ?? "pause-and-do-not-resolve",
  retryable: false,
}));
```

其中 `RESOLVER_DISABLED` 可以返回 fake failure，其余危险诉求，例如：

```text
CREDENTIAL_VALUE_REQUESTED
RAW_ENDPOINT_URL_REQUESTED
EXTERNAL_REQUEST_REQUESTED
SCHEMA_MIGRATION_REQUESTED
```

都会映射为：

```text
pause-and-do-not-resolve
```

## Guard conditions

本版定义 10 个 guard：

```ts
SOURCE_V263_READY
FAKE_RESOLVER_ONLY
CREDENTIAL_HANDLE_ONLY
ENDPOINT_HANDLE_ONLY
RESOLVER_POLICY_HANDLE_REQUIRED
APPROVAL_MARKER_REQUIRED
UPSTREAM_ACTIONS_DISABLED
NO_SECRET_PROVIDER
NO_EXTERNAL_REQUEST
NO_SCHEMA_MIGRATION
```

这些 guard 明确告诉后续 Java v107 / mini-kv v116：v264 只是 fake shell contract，不是 permission to connect。

## Fake resolver probe

`createFakeResolverProbe()` 只生成一条内存 probe 证据：

```ts
requestId: "managed-audit-v264-test-only-resolver-shell-probe",
resolverKind: "fake-in-memory",
acceptedByFakeResolver: true,
responseStatus: "fake-resolver-accepted",
responseCode: "TEST_ONLY_FAKE_RESOLVER",
resolverClientInstantiated: false,
secretProviderInstantiated: false,
credentialValueRead: false,
credentialValueLoaded: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
connectsManagedAudit: false,
schemaMigrationExecuted: false,
productionRecordWritten: false,
```

它带有 `probeDigest`，但不做任何真实 I/O。

## Checks

`createChecks()` 先确认 v263 仍然阻断：

```ts
sourceStillBlocksCredentialResolution
sourceStillBlocksCredentialValue
sourceStillBlocksRawEndpoint
sourceStillBlocksConnection
sourceStillBlocksWrites
sourceStillBlocksAutoStart
```

然后确认 v264 自身仍然安全：

```ts
fakeResolverOnly
requestShapeHandleOnly
responseShapeNoSideEffects
failureMappingCoversSourceTaxonomy
guardConditionsDeclared
fakeResolverProbeCovered
fakeResolverProbeNoCredentialRead
fakeResolverProbeNoExternalRequest
fakeResolverProbeNoProductionWrite
upstreamActionsStillDisabled
```

只要 `UPSTREAM_ACTIONS_ENABLED=true` 或 fake shell 形状变成真实执行，`shellContractState` 就会变成 `blocked`。

## 路由接入

v264 继续走集中 route table：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract",
  (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown,
),
```

这遵守当前质量规则：不新增手写 JSON/Markdown route 样板。

## 测试

新增测试文件：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.test.ts
```

覆盖三件事：

```text
1. 正常配置下 shell ready，且 fake resolver / request / response / failure mapping / guard 全部符合预期
2. UPSTREAM_ACTIONS_ENABLED=true 时进入 blocked
3. JSON 与 Markdown route 都能通过 audit route table 暴露
```

最终验证结果：

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.test.ts test/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.test.ts --reporter=dot -> 3 files, 10 tests passed
npm test -> 204 files, 687 tests passed
npm run build -> passed
safe HTTP smoke -> passed, checkCount=20, passedCheckCount=20
```

本版全量测试暴露出两个旧 route table 测试仍使用 Vitest 默认 5 秒超时；v264 只把它们调整为 `15000`，与相邻的重路由测试保持一致，没有改断言或业务行为。

## 本版总结

Node v264 的价值是把 credential resolver 的下一步限制在 test-only fake shell 层：输入只收 handle，输出只声明 fake response，failure mapping 会阻断 credential value、raw endpoint、external request 和 schema migration。它为 Java v107 / mini-kv v116 提供明确回显对象，但仍不允许真实凭证解析或外部连接。
