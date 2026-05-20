# 第二百六十九版代码讲解：credential resolver blocked-decision upstream echo verification

本版目标不是做质量重构，也不是实现真实 resolver，而是把 Java v111 和 mini-kv v118 对 Node v268 blocked decision 的回显证据收进 Node 侧统一验证入口。它确认三项目都理解同一个结论：production readiness 仍然 blocked。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v268-post-production-readiness-decision-roadmap.md
```

当前链路是：

```text
Node v268 production readiness decision gate
 -> Java v111 blocked-decision echo receipt
 -> mini-kv v118 blocked-decision non-participation receipt
 -> Node v269 blocked-decision upstream echo verification
```

v269 是 v268 衍生计划里的三方对齐版本。它完成后，下一步才能进入 Node v270 的 pre-implementation plan intake。

## 新增文件

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification.test.ts
```

路由接入：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

历史回退证据接入：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/111/解释/说明.md
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsEvidenceService.java
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceiptBuilder.java
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.java
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-production-readiness-blocked-decision-non-participation-receipt.json
fixtures/historical/sibling-workspaces/mini-kv/c/118/解释/说明.md
```

## 一个 profile

profile version 和 route：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification";
```

返回体开头继续把本版性质写死：

```ts
readOnlyUpstreamEchoVerification: true,
blockedDecisionVerificationOnly: true,
readyForCredentialResolverPreImplementationPlan: false,
readyForManagedAuditSandboxAdapterConnection: false,
realResolverImplementationAllowed: false,
executionAllowed: false,
connectsManagedAudit: false,
```

这说明 v269 是已完成的 verification，但不是 production unblock。

## 消费 Node v268

`createSourceNodeV268()` 直接复用 v268 service：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate({ config });
```

随后只摘取 v269 需要的字段：

```ts
decisionGateState: source.decisionGateState,
readinessDecision: source.readinessDecision,
decisionDigest: source.productionReadinessDecision.decisionDigest,
decisionMode: source.productionReadinessDecision.decisionMode,
productionBlockerCodes: source.productionBlockers.map((blocker) => blocker.code),
```

这避免 v269 重新判断生产就绪，只验证上游是否正确回显 v268 的 blocked decision。

## Java v111 reference

Java 侧用 `createJavaV111Reference()` 读取 runbook、讲解和源码锚点：

```ts
const evidenceFiles = [
  evidenceFile("java-v111-runbook", JAVA_V111_RUNBOOK),
  evidenceFile("java-v111-walkthrough", JAVA_V111_WALKTHROUGH),
  evidenceFile("java-v111-builder", JAVA_V111_BUILDER),
  evidenceFile("java-v111-support", JAVA_V111_SUPPORT),
];
```

关键锚点包括：

```ts
snippet("java-v111-node-v268", JAVA_V111_SUPPORT, "Node v268 credential resolver production readiness blocked decision gate"),
snippet("java-v111-node-v269", JAVA_V111_BUILDER, "readyForNodeV269CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification"),
snippet("java-v111-profile", JAVA_V111_BUILDER, "OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_PROFILE"),
snippet("java-v111-decision", JAVA_V111_BUILDER, "sourceNodeV268.readinessDecision=blocked"),
```

这里有一个重要修正：receipt version 的锚点实际在 Java 的 `OpsEvidenceService.java`，不是 runbook。所以 v269 用 `JAVA_V111_EVIDENCE_SERVICE` 校验：

```ts
snippet("java-v111-receipt-version", JAVA_V111_EVIDENCE_SERVICE, "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-production-readiness-blocked-decision-echo-receipt.v1"),
```

这让本机和 GitHub runner 的 forced fallback 行为一致。

## mini-kv v118 reference

mini-kv 侧以 JSON receipt 为主：

```ts
const root = readJsonObject(MINI_KV_V118_RECEIPT);
const receipt = objectField(root, "credential_resolver_production_readiness_blocked_decision_non_participation_receipt");
const sourceNodeV267 = objectField(receipt, "source_node_v267");
const summary = objectField(receipt, "summary");
```

它验证 mini-kv 没有变成 resolver 或 audit storage backend：

```ts
credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented"),
resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed"),
rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
externalRequestSent: booleanField(receipt, "external_request_sent"),
storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend"),
```

这部分的价值是把 mini-kv 的定位继续锁在 non-participation evidence provider，而不是订单或审计权威存储。

## Checks

`createChecks()` 把三方对齐拆成清晰的布尔项：

```ts
javaV111EchoReady: javaV111.readyForNodeV269Alignment,
miniKvV118NonParticipationReady: miniKvV118.readyForNodeV269Alignment,
blockedDecisionAligned:
  javaV111.readinessDecision === "blocked"
  && miniKvV118.sourceReadinessDecision === "blocked",
decisionModeAligned:
  javaV111.decisionEchoMode === "java-v111-credential-resolver-production-readiness-blocked-decision-echo-receipt-only"
  && miniKvV118.sourceDecisionMode === sourceNodeV268.decisionMode,
```

危险动作边界也被逐项复核：

```ts
credentialBoundaryAligned
rawEndpointBoundaryAligned
resolverBoundaryAligned
connectionBoundaryAligned
writeBoundaryAligned
autoStartBoundaryAligned
```

最终 ready 条件不是“blocked 变成放行”，而是“blocked decision 的三方理解一致”：

```ts
checks.readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification =
  Object.entries(checks)
    .filter(([key]) =>
      key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification")
    .every(([, value]) => value);
```

## Production Blockers

v269 的 `productionBlockers` 是验证失败时才出现。正常完成时：

```text
productionBlockerCount=0
```

但这不代表生产 resolver 放行。返回体仍保留：

```ts
readyForCredentialResolverPreImplementationPlan: false,
readyForProductionAudit: false,
readyForProductionWindow: false,
realResolverImplementationAllowed: false,
```

这里区分了两个概念：v269 verification ready，但 production resolver still blocked。

## 路由接入

路由继续走统一 route table：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMarkdown),
```

没有新增手写 JSON / Markdown 分支。

## 测试覆盖

测试覆盖四件事：

```text
1. 默认情况下三方 blocked decision echo verification ready
2. ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true 时仍能读 committed sibling evidence
3. UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED=true 时继续 blocked
4. JSON / Markdown route 都可访问
```

重点断言：

```ts
expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
expect(profile.summary.evidenceFileCount).toBe(7);
expect(profile.summary.matchedSnippetCount).toBe(36);
```

`matchedSnippetCount=36` 来自 Java v111 和 mini-kv v118 当前真实锚点数量，不再沿用旧的 40。

## 本版边界

v269 没有做：

```text
真实 resolver client
真实 secret provider
credential value reader
raw endpoint URL parser
external request sender
managed audit connection
approval ledger write
schema migration
Java / mini-kv auto-start
statusRoutes 拆分质量重构
```

质量优化保留给后续 v271，不混进本版。

## 验证和归档

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification.test.ts -> 1 file, 4 tests passed
npm test -> 209 files, 706 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/269/图片/credential-resolver-blocked-decision-upstream-echo-verification-v269.png
```

## 一句话总结

Node v269 把 Node v268、Java v111、mini-kv v118 的 blocked production-readiness decision 做成三方上游回显验证：verification ready，但真实 credential resolver、credential value、raw endpoint、managed audit connection 和写操作仍全部阻断。
