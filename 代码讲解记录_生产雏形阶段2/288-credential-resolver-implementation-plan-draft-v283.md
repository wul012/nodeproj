# 288 - credential resolver implementation plan draft（Node v283）

## 版本定位

Node v283 是 managed audit credential resolver 主流程的“实现计划草案”版本。它接在 Node v282 之后，消费 v282 已经验证过的 Node v281 + Java v116 + mini-kv v122 证据，但仍不写真实 resolver / adapter。

本版的价值不是让系统开始连接 managed audit，而是把后续实现前必须满足的接口边界写成机器可检查的 JSON / Markdown artifact。

## 新增类型

核心类型位于 `src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftTypes.ts`。

最重要的顶层字段是这些硬边界：

```ts
readyForManagedAuditResolverImplementation: false;
realResolverImplementationAllowed: false;
testOnlyFakeHarnessAllowed: false;
executionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
secretProviderInstantiated: false;
resolverClientInstantiated: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这组字段保证 v283 是计划草案，不会被误读成可以真实执行。

## 核心 Service

实现位于 `src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.ts`。

入口函数先读取 v282：

```ts
const sourceNodeV282 = createSourceNodeV282(input.config);
const interfaceBoundaries = createInterfaceBoundaries();
const javaV121EchoRequirements = createJavaV121EchoRequirements();
const miniKvV126ReceiptRequirements = createMiniKvV126ReceiptRequirements();
const implementationPlan = createImplementationPlan(
  interfaceBoundaries,
  javaV121EchoRequirements,
  miniKvV126ReceiptRequirements,
);
```

这里不是从零生成计划，而是明确消费 v282 的 readiness echo verification，再生成 v283 的 implementation plan draft。

## 七个接口边界

`createInterfaceBoundaries()` 定义七个边界：

```text
CONFIG_HANDLE_CONTRACT
CREDENTIAL_HANDLE_CONTRACT
ENDPOINT_HANDLE_CONTRACT
APPROVAL_ARTIFACT_CONTRACT
FAILURE_TAXONOMY_CONTRACT
ROLLBACK_GUARD_CONTRACT
TEST_ONLY_FAKE_HARNESS_CONTRACT
```

每个边界都有 `allowedInputs`、`allowedOutputs`、`prohibitedActions`、`requiredArtifacts` 和 `verificationRule`。例如 credential handle 边界明确禁止读取、存储、渲染 credential value。

## 下游并行要求

v283 明确把下一步写成推荐并行：

```ts
nextRecommendedParallelJavaV121: "Java v121 resolver implementation plan echo",
nextRecommendedParallelMiniKvV126: "mini-kv v126 resolver implementation plan non-participation receipt",
nextNodeVerificationVersion: "Node v284",
futureFakeHarnessPrecheckVersion: "Node v285",
```

这符合三项目流程：Java 和 mini-kv 只消费 Node v283 的计划草案，不互相依赖，所以可以并行推进；Node v284 再统一验证。

## 路由接入

`src/routes/auditJsonMarkdownRoutes.ts` 新增：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraftMarkdown),
```

因此 JSON 和 Markdown 都复用现有 audit route table。

## 验证

测试位于 `test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.test.ts`。

重点覆盖：

```ts
expect(profile.planState).toBe("credential-resolver-implementation-plan-draft-ready");
expect(profile.readyForJavaV121MiniKvV126Echo).toBe(true);
expect(profile.realResolverImplementationAllowed).toBe(false);
expect(profile.testOnlyFakeHarnessAllowed).toBe(false);
expect(profile.connectsManagedAudit).toBe(false);
```

还覆盖了上游开关误开时会阻断：

```ts
UPSTREAM_PROBES_ENABLED: "true",
UPSTREAM_ACTIONS_ENABLED: "true",
```

以及 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` 下的 GitHub runner 风格回退。

## 运行证据

本版完整验证包括：

```bash
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.test.ts
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverImplementationPlanDraft.test.ts test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification.test.ts
npm run build
```

HTTP smoke 用安全环境变量启动 Node，仅访问本版 JSON / Markdown 路由，不启动 Java / mini-kv，不打开上游动作。smoke 输出确认：

```text
jsonStatus=credential-resolver-implementation-plan-draft-ready
ready=true
checkCount=28
passedCheckCount=28
markdownStatus=200
```

截图证据位于：

```text
d/283/图片/credential-resolver-implementation-plan-draft-v283.png
```
