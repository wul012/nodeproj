# 第二百六十八版代码讲解：credential resolver production readiness decision gate

本版目标不是继续做 echo，也不是实现真实 resolver，而是把 Node v267 的 archive upstream echo verification 转成一个生产就绪决策门禁。结论明确保持 blocked。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v266-post-fake-shell-archive-roadmap.md
```

当前链路是：

```text
Node v266 archive verification
 -> Java v110 archive echo receipt
 -> mini-kv v117 archive non-participation receipt
 -> Node v267 archive upstream echo verification
 -> Node v268 production readiness decision gate
```

v268 完成本计划最后一步，后续需要另起新计划。

## 新增文件

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate.test.ts
```

路由接入：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

## 主 profile

profile version 和 route：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate";
```

返回对象开头就把门禁语义写死：

```ts
decisionGateState: "blocked",
readinessDecision: "blocked",
decisionGateEvaluated: true,
productionReadinessGateOnly: true,
readOnlyDecisionGate: true,
readyForCredentialResolverPreImplementationPlan: false,
realResolverImplementationAllowed: false,
```

这比只写 `ready=false` 更清楚：v268 是一次完成的决策，但决策结果是不放行。

## 危险动作继续关闭

service 返回体继续保留所有关键安全字段：

```ts
executionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
credentialValueRead: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
secretProviderInstantiated: false,
resolverClientInstantiated: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这些字段对后续 Java / mini-kv echo 很重要：它们不是文案，而是可被测试断言和三方回显的契约字段。

## 消费 Node v267

`createSourceNodeV267()` 直接复用上一版 service：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification({
  config,
});
```

随后只摘取门禁需要的摘要：

```ts
verificationState
readyForUpstreamEchoVerification
verificationDigest
sourceNodeV266Ready
javaV110EchoReady
miniKvV117NonParticipationReady
archiveCountsAligned
archiveSnippetsAligned
archiveNoRerunAligned
credentialBoundaryAligned
rawEndpointBoundaryAligned
connectionBoundaryAligned
writeBoundaryAligned
autoStartBoundaryAligned
nodeV267BlocksRealResolver
```

也就是说，v268 不重新读 Java / mini-kv 细节，而是消费 v267 已经收敛好的三方证据。

## Pre-Implementation Requirements

本版把下一阶段必须补齐的条件列成结构化字段：

```ts
planDocumentPresent: false,
credentialHandleBoundaryDefined: false,
endpointHandleBoundaryDefined: false,
secretProviderStubDefined: false,
operatorApprovalBoundaryDefined: false,
rollbackBoundaryDefined: false,
redactionPolicyDefined: false,
externalRequestSimulationDefined: false,
schemaMigrationPolicyDefined: false,
auditLedgerWritePolicyDefined: false,
```

这些字段全部为 `false`，所以 `missingPreImplementationRequirementCount=10`。这不是测试失败，而是 v268 的预期结果：没有这些计划材料，就不能进入真实 resolver pre-implementation。

## Decision

`productionReadinessDecision` 生成稳定 digest：

```ts
const decisionDigest = sha256StableJson({
  profileVersion: PROFILE_VERSION,
  sourceNodeV267VerificationDigest: sourceNodeV267.verificationDigest,
  preImplementationRequirements,
  checks,
  productionBlockerCodes: productionBlockers.map((blocker) => blocker.code),
});
```

并明确禁止：

```ts
allowsRealCredentialResolverImplementation: false,
allowsSecretProviderRuntime: false,
allowsCredentialValueRead: false,
allowsRawEndpointUrlParse: false,
allowsExternalRequest: false,
allowsManagedAuditConnection: false,
allowsSchemaMigration: false,
allowsApprovalLedgerWrite: false,
allowsAutomaticUpstreamStart: false,
```

这里的设计重点是“门禁可审计”：后续任何版本如果要突破某个 false，都必须先在 plan 中解释原因和边界。

## Checks

`createChecks()` 分成两类：

第一类确认 v267 来源链路健康：

```ts
sourceNodeV267Ready
sourceNodeV267BlocksRealResolver
archiveEchoChainReady
credentialBoundaryStillClosed
rawEndpointBoundaryStillClosed
resolverBoundaryStillClosed
connectionBoundaryStillClosed
writeBoundaryStillClosed
autoStartBoundaryStillClosed
```

第二类确认下一阶段材料尚未具备：

```ts
preImplementationPlanPresent
credentialHandleBoundaryDefined
endpointHandleBoundaryDefined
secretProviderStubDefined
operatorApprovalBoundaryDefined
rollbackBoundaryDefined
redactionPolicyDefined
externalRequestSimulationDefined
schemaMigrationPolicyDefined
auditLedgerWritePolicyDefined
```

最终统计：

```text
checkCount=25
passedCheckCount=15
missingPreImplementationRequirementCount=10
productionBlockerCount=10
```

## Blockers

`collectProductionBlockers()` 用规则数组生成 blocker，避免散落 `if push`：

```ts
return rules
  .filter((rule) => !rule.condition)
  .map((rule) => ({
    code: rule.code,
    severity: "blocker" as const,
    source: rule.source,
    message: rule.message,
  }));
```

核心 blocker 包括：

```text
REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING
CREDENTIAL_HANDLE_BOUNDARY_MISSING
ENDPOINT_HANDLE_BOUNDARY_MISSING
SECRET_PROVIDER_STUB_MISSING
OPERATOR_APPROVAL_BOUNDARY_MISSING
ROLLBACK_BOUNDARY_MISSING
REDACTION_POLICY_MISSING
EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING
SCHEMA_MIGRATION_POLICY_MISSING
AUDIT_LEDGER_WRITE_POLICY_MISSING
```

## 路由接入

路由继续走统一 helper：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateMarkdown,
)
```

没有新增手写 JSON / Markdown 分支。

## 测试覆盖

测试覆盖四件事：

```text
1. 默认 blocked，且 10 个 pre-implementation requirement 缺失
2. ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 时仍能消费 v267 source chain
3. UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED=true 时增加 runtime blocker
4. JSON / Markdown route 都可访问
```

其中第一条测试故意断言：

```ts
expect(profile.summary.productionBlockerCount).toBe(10);
expect(profile.readyForCredentialResolverPreImplementationPlan).toBe(false);
expect(profile.realResolverImplementationAllowed).toBe(false);
```

这保证后续不会因为“v267 ready”而误把真实 resolver 放行。

## 本版边界

v268 没有做：

```text
真实 resolver client
真实 secret provider
credential value reader
raw endpoint URL parser
external HTTP/TCP request
schema migration
approval ledger write
Java / mini-kv auto-start
```

## 下一步

本版写入 successor plan：

```text
docs/plans/v268-post-production-readiness-decision-roadmap.md
```

下一步推荐并行 Java v111 + mini-kv v118，只读回显这个 blocked decision gate；Node 后续再做 v269 三方 blocked-decision echo verification。

## 一句话总结

Node v268 把“archive echo 已 ready”与“真实 resolver 仍不能实现”拆开表达：v267 证据链可用，但缺少 10 个 pre-implementation 硬边界，所以生产就绪决策必须 blocked。
