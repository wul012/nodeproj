# 299 - Node v294 credential resolver disabled runtime shell pre-plan intake

## 版本定位

Node v294 是 v293 之后的前置计划版。v293 已经证明 Node v292 的 blocked decision 得到 Java v131 和 mini-kv v129 支撑；v294 不继续实现 runtime，而是把“如果未来要讨论 disabled fake harness runtime shell，必须先满足哪些边界”固化成只读 pre-plan intake。

入口是 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts:31) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake`。这个函数只读 v293 profile，并生成计划对象，不实例化 runtime shell、provider 或 resolver client。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntakeTypes.ts:5) 把 v294 的安全边界写成字面量字段：

```ts
readyForDisabledRuntimeShellImplementation: false;
readyForDisabledRuntimeShellInvocation: false;
runtimeShellImplemented: false;
runtimeShellEnabled: false;
runtimeShellInvocationAllowed: false;
testOnlyFakeHarnessAllowed: false;
testOnlyFakeHarnessExecutionAllowed: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
secretProviderInstantiated: false;
resolverClientInstantiated: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这说明 v294 的“ready”只表示前置计划清单可归档，不表示 runtime 可以写。

## Source Node v293

`createSourceNodeV293` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts:142) 调用 v293 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification({ config });
```

它提取 v293 的关键结论：

```ts
verificationState: "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready";
sourceSpan: "Node v292 + Java v131 + mini-kv v129";
missingJavaEchoResolved: true;
implementationStillBlocked: true;
readyForDisabledRuntimeShellPlanning: false;
```

这让 v294 的职责很清晰：只能基于 v293 做 plan intake，不能把 v293 的证据误读成 runtime 授权。

## Disabled Runtime Shell Pre-Plan

`createDisabledRuntimeShellPrePlan` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts:328) 构造计划体：

```ts
planVersion: "node-v294-disabled-runtime-shell-pre-plan-intake.v1";
planMode: "pre-plan-intake-only";
shellName: "disabled-fake-harness-runtime-shell";
runtimeShellImplementationAllowed: false;
runtimeShellInvocationAllowed: false;
fakeHarnessRuntimeAllowed: false;
credentialValueReadAllowed: false;
rawEndpointUrlParseAllowed: false;
providerClientInstantiationAllowed: false;
externalRequestAllowed: false;
schemaMigrationAllowed: false;
approvalLedgerWriteAllowed: false;
automaticUpstreamStartAllowed: false;
```

这里的 `shellName` 是为了未来 review 有统一命名，不是创建 shell 类。

## 十个边界

`createDisabledRuntimeShellBoundaries` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts:197) 定义十个边界：

```text
SOURCE_ECHO_GATE
SHELL_NAME_AND_SCOPE
FEATURE_FLAG_POLICY
CREDENTIAL_HANDLE_ONLY
ENDPOINT_HANDLE_ONLY
PROVIDER_CLIENT_BOUNDARY
NETWORK_BOUNDARY
WRITE_BOUNDARY
OPERATOR_APPROVAL_BOUNDARY
TEST_STRATEGY_AND_ABORT
```

这些边界覆盖 runtime、credential、endpoint、provider/client、network、write、operator approval、test/abort。v294 的核心价值是把这些风险面先写清楚，避免下一版直接进入实现。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.ts:381) 汇总 28 个检查。关键检查包括：

```ts
sourceNodeV293KeepsRuntimeShellBlocked
sourceNodeV293KeepsCredentialBoundaryClosed
sourceNodeV293KeepsConnectionBoundaryClosed
allTenBoundariesDefined
runtimeShellImplementationStillForbidden
runtimeShellInvocationStillForbidden
providerClientInstantiationStillForbidden
externalRequestStillForbidden
```

因此 v294 是“能进入设计评审”，不是“能进入实现”。

## 路由和测试

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:699) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-pre-plan-intake
```

测试在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.test.ts:12)，覆盖：

- v293 ready 被消费，v294 pre-plan intake ready。
- runtime shell 未实现、未启用、不可调用。
- forced historical fixture fallback 仍可穿透 v293 的 Java/mini-kv evidence。
- upstream probes/actions 开启时会 blocked。
- JSON 和 Markdown route 都可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake.test.ts
npm test
npm run build
```

全量结果：227 个测试文件、777 个用例通过。`npm run build` 通过。

核心结果：

```text
checkCount=28
passedCheckCount=28
boundaryCount=10
definedBoundaryCount=10
productionBlockerCount=0
planDigest=29e1a772ec0f1aca8dd56b12f63dd390f499cb8da9c3ecaa658b4c84c0f97008
intakeDigest=c6aae7474f3cfbd05103dc4a57fbf06335724d44a6b7300bb9cdd2cc0c714eb8
```

## 本版结论

v294 把 disabled fake harness runtime shell 的前置审查面固定下来，但没有写 runtime。下一步如果继续，合理方向是 Node v295 做 design-review 或 upstream echo；仍不能直接实现 provider/client、credential read、raw endpoint parse、HTTP/TCP 或 ledger/schema write。
