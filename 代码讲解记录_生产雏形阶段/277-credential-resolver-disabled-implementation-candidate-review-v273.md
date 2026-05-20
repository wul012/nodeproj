# 277. Node v273 credential resolver disabled implementation candidate review

## 版本定位

v273 消费 v272 的三方 plan-intake echo verification，进入更接近实现前的评审层：

```text
disabled resolver interface candidate + fake wiring review
```

注意它仍然不是 runtime 实现。真实 credential resolver、secret provider、raw endpoint parser、external request、schema migration、approval ledger write 都没有打开。

## 新增服务入口

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview.ts
```

主入口：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile {
  const sourceNodeV272 = createSourceNodeV272(input.config);
  const disabledImplementationCandidate = createDisabledImplementationCandidate(sourceNodeV272);
  const checks = createChecks(input.config, sourceNodeV272, disabledImplementationCandidate);
```

这里和 v272 的区别是：v272 验证三方是否理解 plan，v273 开始判断哪些边界可以进入 disabled candidate，哪些必须继续人工审批。

## 读取 v272 作为来源

v273 不重新读取 Java / mini-kv 文件，而是复用 v272 的最终结论：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification({
  config,
});
```

然后抽取三类事实：

```ts
verificationState: source.verificationState,
readyForPlanIntakeUpstreamEchoVerification:
  source.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification,
sourceNodeV270Ready: source.echoVerification.sourceNodeV270Ready,
javaV112EchoReady: source.echoVerification.javaV112EchoReady,
miniKvV119NonParticipationReady: source.echoVerification.miniKvV119NonParticipationReady,
boundaryCodesAligned: source.echoVerification.boundaryCodesAligned,
requirementCodesAligned: source.echoVerification.requirementCodesAligned,
credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
resolverBoundaryAligned: source.echoVerification.resolverBoundaryAligned,
connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
```

这样 v273 的前置条件依赖的是 v272 已经验证过的三方一致性，而不是再做一次重复扫描。

## 候选边界分类

v273 用一个明确集合限制“可以进入 disabled candidate”的范围：

```ts
const CANDIDATE_READY_BOUNDARIES = new Set<CredentialResolverPreImplementationBoundaryCode>([
  "PLAN_DOCUMENT",
  "DISABLED_SECRET_PROVIDER_STUB",
  "EXTERNAL_REQUEST_SIMULATION",
  "REDACTION_POLICY",
]);
```

然后按 v272 的 boundary 顺序生成决策：

```ts
return sourceNodeV272.boundaryCodes.map((code, index) => {
  const disposition = CANDIDATE_READY_BOUNDARIES.has(code)
    ? "disabled-candidate-ready"
    : "approval-required";
```

这会得到 4 个 `disabled-candidate-ready` 和 6 个 `approval-required`：

```text
disabled-candidate-ready:
PLAN_DOCUMENT
DISABLED_SECRET_PROVIDER_STUB
REDACTION_POLICY
EXTERNAL_REQUEST_SIMULATION

approval-required:
CREDENTIAL_HANDLE
ENDPOINT_HANDLE
OPERATOR_APPROVAL
ROLLBACK_BOUNDARY
SCHEMA_MIGRATION_POLICY
AUDIT_LEDGER_WRITE_POLICY
```

这个分类是 v273 的核心价值：它不把所有边界一口气推进到实现层，而是只允许安全的接口/假接线评审先走。

## disabled interface shape

接口候选在 `createInterfaceShape()` 中定义：

```ts
return {
  interfaceVersion: "disabled-credential-resolver-interface-candidate.v1",
  requestFields: REQUEST_FIELDS,
  responseFields: RESPONSE_FIELDS,
  failureClasses: FAILURE_CLASSES,
  handleOnlyRequest: true,
  includesCredentialValue: false,
  includesRawEndpointUrl: false,
  sendsExternalRequest: false,
  instantiatesSecretProvider: false,
  instantiatesResolverClient: false,
};
```

请求字段只允许 handle / operator / approval marker：

```ts
const REQUEST_FIELDS = [
  "credentialHandle",
  "endpointHandle",
  "resolverPolicyHandle",
  "operatorIdentity",
  "approvalCorrelationId",
  "manualWindowMarker",
] as const;
```

响应字段虽然命名包含 `resolvedCredentialValue` 和 `rawEndpointUrl`，但接口候选同时声明：

```ts
includesCredentialValue: false,
includesRawEndpointUrl: false,
```

也就是说这两个字段只能作为 disabled/redacted 语义占位，不能输出真实值。

## fake wiring review

v273 不启动 fake runtime，只记录 fake wiring 是否可以被后续版本评审：

```ts
function createFakeWiringReview(): CredentialResolverDisabledFakeWiringReview {
  return {
    reviewVersion: "disabled-credential-resolver-fake-wiring-review.v1",
    fakeWiringReviewOnly: true,
    fakeRuntimeInstantiated: false,
    realSecretProviderAllowed: false,
    realManagedAuditTransportAllowed: false,
    externalRequestAllowed: false,
    cleanupArtifactCount: 0,
  };
}
```

这一步比 v272 更靠近实现，但仍停在 review-only。

## 核心检查

v273 的检查分三层。

第一层确认 v272 已完成且保持只读：

```ts
sourceNodeV272Ready:
  sourceNodeV272.verificationState === "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready"
  && sourceNodeV272.readyForPlanIntakeUpstreamEchoVerification
  && sourceNodeV272.sourceNodeV270Ready
  && sourceNodeV272.javaV112EchoReady
  && sourceNodeV272.miniKvV119NonParticipationReady,
```

第二层确认候选范围没有扩大：

```ts
candidateReadyBoundariesLimited:
  candidate.candidateReadyDecisionCount === CANDIDATE_READY_BOUNDARIES.size
  && candidateReadyCodes.every((code) => CANDIDATE_READY_BOUNDARIES.has(code)),
approvalRequiredBoundariesPreserved:
  candidate.approvalRequiredDecisionCount === REQUIRED_BOUNDARY_CODES.length - CANDIDATE_READY_BOUNDARIES.size
  && approvalRequiredCodes.every((code) => !CANDIDATE_READY_BOUNDARIES.has(code)),
```

第三层确认所有危险动作仍关闭：

```ts
credentialValueStillForbidden:
  !candidate.credentialValueReadAllowed
  && !sourceNodeV272.credentialValueRead
  && !sourceNodeV272.readsManagedAuditCredential
  && !sourceNodeV272.storesManagedAuditCredential,
externalRequestStillBlocked:
  !candidate.externalRequestAllowed
  && !sourceNodeV272.externalRequestSent
  && !sourceNodeV272.connectsManagedAudit,
```

## 路由接入

文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewMarkdown),
```

仍然走 `auditJsonMarkdownRoute`，没有新增手写 JSON / Markdown 样板。

## 测试覆盖

文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview.test.ts
```

测试覆盖四类：

```text
1. 10 个 boundary 被正确分成 4 个 candidate-ready 和 6 个 approval-required。
2. forced historical fallback 下能经由 v272 source chain 通过。
3. UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时必须 blocked。
4. JSON / Markdown route 都能通过 audit route table 暴露。
```

关键断言：

```ts
expect(profile.disabledImplementationCandidate.decisions
  .filter((decision) => decision.disposition === "disabled-candidate-ready")
  .map((decision) => decision.code)).toEqual([
  "PLAN_DOCUMENT",
  "DISABLED_SECRET_PROVIDER_STUB",
  "REDACTION_POLICY",
  "EXTERNAL_REQUEST_SIMULATION",
]);
```

以及：

```ts
expect(profile.disabledImplementationCandidate.decisions
  .filter((decision) => decision.disposition === "approval-required")
  .map((decision) => decision.code)).toEqual([
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
]);
```

## 本版结论

v273 的价值不是“做了 resolver”，而是把 resolver 实现前的边界推进了一格：

```text
从三方 plan-intake 已对齐
推进到 disabled interface / fake wiring candidate 可评审
```

但它仍然坚持：

```text
realResolverImplementationAllowed=false
connectsManagedAudit=false
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
```

下一步应让 Java v113 + mini-kv v120 并行只读回显本版 candidate review，再由 Node v274 做三方 echo verification。
