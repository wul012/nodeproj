# 300 - Node v295 credential resolver disabled runtime shell design review

## 版本定位

Node v295 接在 v294 后面。v294 已经把 disabled runtime shell 的十条边界写成 pre-plan intake；v295 不写 runtime，而是做设计审查：判断这些边界是否足以进入下一步跨项目 echo。

入口是 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts:31) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview`。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReviewTypes.ts:5) 继续把关键安全字段写成字面量：

```ts
readyForNodeV296RuntimeShellImplementation: false;
readyForDisabledRuntimeShellImplementation: false;
readyForDisabledRuntimeShellInvocation: false;
runtimeShellImplemented: false;
runtimeShellEnabled: false;
runtimeShellInvocationAllowed: false;
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

这表示 v295 的 `ready` 只属于 design review 和 parallel echo request，不属于 runtime 实现。

## Source Node v294

`createSourceNodeV294` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts:127) 调用 v294 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellPrePlanIntake({ config });
```

它提取 v294 的核心证据：

```ts
prePlanIntakeState: "disabled-runtime-shell-pre-plan-intake-ready";
readyForDisabledRuntimeShellPrePlanIntake: true;
readyForDisabledRuntimeShellDesignReview: true;
boundaryCount: 10;
definedBoundaryCount: 10;
missingBoundaryCount: 0;
nextJavaEchoVersion: "Java v132";
nextMiniKvReceiptVersion: "mini-kv v130";
runtimeShellImplementationAllowed: false;
externalRequestAllowed: false;
```

v295 不重新定义十条边界，而是消费 v294 已归档边界，避免继续复制大块治理代码。

## Design Review

`createDesignReview` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts:199) 生成审查对象：

```ts
reviewVersion: "node-v295-disabled-runtime-shell-design-review.v1";
reviewMode: "design-review-only";
sourceSpan: "Node v294";
decision: "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation";
runtimeShellImplementationAllowed: false;
runtimeShellInvocationAllowed: false;
credentialValueReadAllowed: false;
rawEndpointUrlParseAllowed: false;
providerClientInstantiationAllowed: false;
externalRequestAllowed: false;
schemaMigrationAllowed: false;
approvalLedgerWriteAllowed: false;
automaticUpstreamStartAllowed: false;
```

关键是 `decision`：不是让 Node v296 直接实现 runtime，而是先让 Java v132 和 mini-kv v130 并行给只读 echo。

## 必要性证明

v295 没有只做“又一个 summary”。`necessity` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts:193) 写清楚四件事：

```ts
blocker: "runtime-shell-implementation-has-no-upstream-design-echo";
consumer: "Node v296 disabled runtime shell implementation decision";
cannotReuseExistingReportReason: "... v294 only defined shell boundaries ...";
stopCondition: "Once Java v132 and mini-kv v130 are archived and Node v296 consumes them ...";
```

这符合最近的版本规则：新增 echo/governance 链必须说明 blocker、consumer、不能复用原因和停止条件。

## Review Questions

`createReviewQuestions` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts:246) 固化 11 个问题：

```text
SOURCE_PRE_PLAN_READY
SOURCE_BOUNDARIES_COMPLETE
IMPLEMENTATION_STILL_FORBIDDEN
INVOCATION_STILL_FORBIDDEN
CREDENTIAL_VALUE_STILL_FORBIDDEN
RAW_ENDPOINT_STILL_FORBIDDEN
PROVIDER_CLIENT_STILL_FORBIDDEN
NETWORK_STILL_FORBIDDEN
WRITE_STILL_FORBIDDEN
AUTO_START_STILL_FORBIDDEN
UPSTREAM_ECHO_NEEDED_BEFORE_IMPLEMENTATION
```

这些问题把“是否能继续”拆成可审计的 yes/no，而不是只靠一句文字判断。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.ts:356) 汇总 27 个检查。重点包括：

```ts
sourceNodeV294Ready
sourceBoundariesComplete
sourceRuntimeImplementationStillForbidden
sourceCredentialBoundaryClosed
sourceProviderClientBoundaryClosed
sourceNetworkBoundaryClosed
necessityDocumented
parallelUpstreamEchoRecommended
noRuntimeImplementationCreated
noExternalRequestSent
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

只有这些都为真，`designReviewState` 才会是 `disabled-runtime-shell-design-review-ready`。

## 路由和测试

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:234) 引入，并在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:706) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review
```

测试在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.test.ts:12)，覆盖：

- v294 pre-plan intake 被消费，v295 design review ready。
- runtime shell 仍未实现、未启用、不可调用。
- forced historical fixture fallback 能穿透 v294 -> v293 -> Java/mini-kv evidence chain。
- upstream probes/actions 开启时 blocked。
- JSON 和 Markdown route 都可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.test.ts
npm test
npm run build
```

全量结果：228 个测试文件、781 个用例通过。`npm run build` 通过。

证据生成时先执行了一次 `npm run build`，随后通过 `node --input-type=module` 读取 `dist` 生成 `d/295/evidence`。最终提交前已按规则清理 `dist`。
