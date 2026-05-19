# 第二百六十二版代码讲解：sandbox endpoint credential resolver disabled precheck

本版目标是消费 Node v261 的 `credential resolver upstream echo verification`，生成一个更窄的 disabled credential resolver precheck。它不是 resolver 实现，也不是 secret provider 适配器；它只把后续可能需要的 env handle、opt-in gate、failure taxonomy、dry-run response shape 先固化成可审查合约。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v260-post-credential-resolver-decision-roadmap.md
```

当前链路是：

```text
Node v260 sandbox endpoint credential resolver decision record
 -> Java v105 credential resolver decision echo marker
 -> mini-kv v114 credential resolver non-participation receipt
 -> Node v261 credential resolver upstream echo verification
 -> Node v262 disabled credential resolver precheck
```

v262 完成后，下一步不是 Node 继续抢跑，而是推荐并行 Java v106 + mini-kv v115，只读回显/非参与本版 precheck。

## 模块拆分

本版新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckTypes.ts
src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckRenderer.ts
```

这延续 v260/v261 的拆分方式：主服务负责计算 profile，types 固化 profile shape，renderer 只负责 Markdown 输出，避免把一个新 service 做成大杂烩文件。

## 主 profile

v262 的版本和路由在主服务顶部定义：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck";
```

返回对象继续把危险动作全部写死为 false：

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

这里的 `readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck=true` 只表示“禁用态 precheck 合约可被审查”，不是允许执行 resolver。

## 消费 Node v261

主服务先读取 v261：

```ts
const sourceNodeV261 = createSourceNodeV261(
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification({ config: input.config }),
);
```

`createSourceNodeV261()` 把 v261 的三方验证结果压成 source reference：

```ts
verificationState: source.verificationState,
verificationDigest: source.echoVerification.verificationDigest,
verificationMode: source.echoVerification.verificationMode,
sourceNodeV260Ready: source.checks.sourceNodeV260Ready,
javaV105EchoReady: source.checks.javaV105EchoReady,
miniKvV114NonParticipationReady: source.checks.miniKvV114NonParticipationReady,
credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
```

随后要求 v261 仍然保持无副作用：

```ts
!reference.credentialResolverExecutionAllowed
&& !reference.credentialValueRead
&& !reference.credentialValueLoaded
&& !reference.rawEndpointUrlParsed
&& !reference.externalRequestSent
&& !reference.connectsManagedAudit
&& !reference.schemaMigrationExecuted
&& !reference.automaticUpstreamStart
```

所以 v262 不是“只要 v261 存在就通过”，而是 v261 必须继续证明 credential、raw endpoint、connection、write、auto-start 边界全部关闭。

## Disabled precheck 合约

`createDisabledCredentialResolverPrecheck()` 生成本版核心合约：

```ts
precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only",
resolverImplementationStatus: "not-implemented",
secretProviderImplementationStatus: "not-implemented",
resolverClientMayBeInstantiated: false,
secretProviderMayBeInstantiated: false,
credentialValueMayBeLoaded: false,
rawEndpointUrlMayBeParsed: false,
externalRequestMayBeSent: false,
```

env handles 只声明名字，不读取值：

```ts
const REQUIRED_ENV_HANDLE_NAMES = [
  "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
] as const;
```

每个 handle 都固定为：

```ts
valueRequiredForPrecheck: false,
credentialValue: false,
rawEndpointValue: false,
```

这点很关键：v262 可以定义未来需要哪些 handle，但不能把 handle 解释成 secret value 或 raw endpoint URL。

## Opt-in gate

本版新增两个默认关闭的 opt-in gate：

```ts
"ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED"
"ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED"
```

`optInGate()` 统一固定语义：

```ts
requiredValueForFutureResolver: "true",
currentDefault: "false",
precheckTreatsEnabledAsBlocked: true,
operatorApprovalRequired: true,
```

也就是说，即使未来环境变量出现，本版 precheck 仍然把开启视为阻断信号，不会顺手执行 resolver。

## Failure taxonomy

失败分类明确了哪些情况必须暂停：

```ts
failureClass("RESOLVER_DISABLED", "configuration", false, "pause-and-review"),
failureClass("APPROVAL_MARKER_MISSING", "operator-boundary", false, "pause-and-review"),
failureClass("CREDENTIAL_HANDLE_MISSING", "credential-boundary", false, "pause-and-review"),
failureClass("CREDENTIAL_VALUE_REQUESTED", "credential-boundary", false, "pause-and-do-not-resolve"),
failureClass("RAW_ENDPOINT_URL_REQUESTED", "endpoint-boundary", false, "pause-and-do-not-resolve"),
failureClass("EXTERNAL_REQUEST_REQUESTED", "network-boundary", false, "pause-and-do-not-resolve"),
failureClass("SCHEMA_MIGRATION_REQUESTED", "schema-boundary", false, "pause-and-do-not-resolve"),
```

这里把“缺 handle”和“请求 value”分开：缺 handle 可以人工补材料，请求 credential value / raw endpoint / external request 则必须停止，不允许继续推进。

## Dry-run response shape

`createDryRunResponseShape()` 固化 12 个字段：

```ts
const DRY_RUN_RESPONSE_FIELDS = [
  "readyState",
  "resolverMode",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
  "credentialValueRead",
  "credentialValueLoaded",
  "rawEndpointUrlParsed",
  "externalRequestSent",
  "connectsManagedAudit",
  "schemaMigrationExecuted",
  "failureClassCount",
  "nextAction",
] as const;
```

实际 shape 仍然全部关闭：

```ts
resolverClientInstantiated: false,
secretProviderInstantiated: false,
credentialValueRead: false,
credentialValueLoaded: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
connectsManagedAudit: false,
schemaMigrationExecuted: false,
```

## Checks

`createChecks()` 先验证 v261 来源：

```ts
sourceNodeV261Ready: sourceNodeV261.readyForNodeV262CredentialResolverDisabledPrecheck,
sourceVerificationStillBlocksCredentialResolution
sourceVerificationStillBlocksCredentialValue
sourceVerificationStillBlocksRawEndpoint
sourceVerificationStillBlocksConnection
sourceVerificationStillBlocksWrites
sourceVerificationStillBlocksAutoStart
```

再验证 v262 自身合约：

```ts
requiredEnvHandlesDeclared
envHandlesRemainHandleOnly
optInGatesDeclared
optInGatesDefaultDisabled
failureTaxonomyDeclared
dryRunResponseShapeDeclared
resolverImplementationStillAbsent
secretProviderImplementationStillAbsent
resolverClientInstantiationBlocked
secretProviderInstantiationBlocked
credentialValueLoadBlocked
rawEndpointParseBlocked
externalRequestBlocked
upstreamActionsStillDisabled
```

只要任何一项失败，`precheckState` 就会变成：

```ts
"blocked"
```

## 路由接入

v262 继续走 `auditJsonMarkdownRoutes`：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck",
  (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown,
),
```

这符合当前质量规则：不再新增手写 JSON/Markdown route 样板。

## 测试

新增测试文件：

```text
test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.test.ts
```

覆盖三件事：

```text
1. 正常配置下 precheck ready，且 resolver / secret provider / external request 全部 false
2. UPSTREAM_ACTIONS_ENABLED=true 时进入 blocked
3. JSON 与 Markdown route 都能通过 audit route table 暴露
```

## 本版总结

Node v262 的价值不是“更接近真实连接”，而是把真实连接前最敏感的 credential resolver 步骤继续拆小：先有禁用态合约，再让 Java v106 / mini-kv v115 只读回显。这样下一次 Node v263 可以验证三方一致性，而不是直接写 secret provider 或真实 adapter。
