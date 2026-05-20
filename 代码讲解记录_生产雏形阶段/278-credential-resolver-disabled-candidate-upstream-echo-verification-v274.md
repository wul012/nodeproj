# 278. Node v274 credential resolver disabled candidate upstream echo verification

## 本版所处项目进度

v274 是 v272 衍生计划的收口版本。当前链路已经走到：

```text
Node v270 plan intake
 -> Java v112 + mini-kv v119 只读回显
 -> Node v272 三方 plan-intake 验证
 -> Node v273 disabled implementation candidate review
 -> Java v113 + mini-kv v120 只读回显
 -> Node v274 disabled candidate upstream echo verification
```

这版的价值是确认三项目都理解同一组 disabled candidate 边界，但仍然不打开真实 resolver。

## 新增服务入口

文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.ts
```

主入口：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile {
  const sourceNodeV273 = createSourceNodeV273(input.config);
  const javaV113 = createJavaV113Reference();
  const miniKvV120 = createMiniKvV120Reference();
  const checks = createChecks(input.config, sourceNodeV273, javaV113, miniKvV120);
```

这里的三个输入正好对应三项目：

```text
sourceNodeV273：Node 自己上一版 review 结果
javaV113：Java 对 Node v273 的只读 echo receipt
miniKvV120：mini-kv 对 Node v273 的 non-participation receipt
```

## 读取 Node v273

v274 不重算 disabled candidate，而是消费 v273 的已归档结论：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview({ config });
```

随后提取关键字段：

```ts
reviewState: source.reviewState,
candidateDecisionCount: source.disabledImplementationCandidate.candidateDecisionCount,
candidateReadyDecisionCount: source.disabledImplementationCandidate.candidateReadyDecisionCount,
approvalRequiredDecisionCount: source.disabledImplementationCandidate.approvalRequiredDecisionCount,
candidateReadyBoundaryCodes,
approvalRequiredBoundaryCodes,
requestFields: source.disabledImplementationCandidate.interfaceShape.requestFields,
responseFields: source.disabledImplementationCandidate.interfaceShape.responseFields,
failureClasses: source.disabledImplementationCandidate.interfaceShape.failureClasses,
```

这些字段构成 v274 的 Node 侧基准。

## Java v113 证据

v274 把 Java v113 当成 historical evidence 读取：

```ts
const JAVA_V113_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceiptBuilder.java";
const JAVA_V113_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.java";
const JAVA_V113_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords.java";
```

关键 snippet 检查包括：

```ts
snippet("java-v113-review-state", JAVA_V113_SUPPORT, "credential-resolver-disabled-implementation-candidate-review-ready"),
snippet("java-v113-candidate-ready-count", JAVA_V113_SUPPORT, "static final int CANDIDATE_READY_DECISION_COUNT = 4"),
snippet("java-v113-approval-required-count", JAVA_V113_SUPPORT, "static final int APPROVAL_REQUIRED_DECISION_COUNT = 6"),
snippet("java-v113-ready-for-node-v274", JAVA_V113_RECORDS, "readyForNodeV274CredentialResolverDisabledCandidateVerification"),
```

v274 还把 Java v113 的质量优化纳入检查：

```ts
snippet("java-v113-workflow-readiness", JAVA_V113_BUILDER, "workflowReadiness("),
snippet("java-v113-workflow-step", JAVA_V113_BUILDER, "workflowStep(\"sourceNodeV273Echoed\""),
snippet("java-v113-workflow-support", JAVA_V113_ECHO_MARKER_SUPPORT, "static EchoWorkflowReadiness workflowReadiness"),
```

这对应计划里“不要继续复制 600-800 行 echo support”的优化要求。

## mini-kv v120 证据

v274 结构化读取 mini-kv v120 JSON：

```ts
const root = readJsonObject(MINI_KV_V120_RECEIPT);
const receipt = objectField(root, "credential_resolver_disabled_implementation_candidate_non_participation_receipt");
const sourceNodeV272 = objectField(receipt, "source_node_v272_reference");
const candidate = objectField(receipt, "disabled_implementation_candidate");
const interfaceShape = objectField(candidate, "interface_shape");
const fakeWiring = objectField(candidate, "fake_wiring_review");
const summary = objectField(receipt, "summary");
```

这比只查文本更稳，因为 counts、boundary arrays、boolean guard 都来自 JSON 字段：

```ts
candidateDecisionCount: numberField(candidate, "candidate_decision_count"),
candidateReadyBoundaryCodes: stringArrayField(candidate, "candidate_ready_boundary_codes"),
approvalRequiredBoundaryCodes: stringArrayField(candidate, "approval_required_boundary_codes"),
handleOnlyRequest: booleanField(interfaceShape, "handle_only_request"),
credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented"),
loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
```

## 核心校验

候选数量对齐：

```ts
candidateCountsAligned:
  javaV113.checkCount === sourceNodeV273.checkCount
  && miniKvV120.checkCount === sourceNodeV273.checkCount
  && javaV113.candidateDecisionCount === sourceNodeV273.candidateDecisionCount
  && miniKvV120.candidateDecisionCount === sourceNodeV273.candidateDecisionCount
  && javaV113.candidateReadyDecisionCount === sourceNodeV273.candidateReadyDecisionCount
  && miniKvV120.candidateReadyDecisionCount === sourceNodeV273.candidateReadyDecisionCount
```

边界范围对齐：

```ts
candidateReadyBoundaryCodesAligned:
  javaV113.candidateReadyBoundaryCodesEchoed
  && arrayEquals(sourceNodeV273.candidateReadyBoundaryCodes, [...CANDIDATE_READY_BOUNDARY_CODES])
  && arrayEquals(miniKvV120.candidateReadyBoundaryCodes, [...CANDIDATE_READY_BOUNDARY_CODES]),
```

接口形状对齐：

```ts
interfaceShapeAligned:
  javaV113.interfaceShapeEchoed
  && miniKvV120.requestFieldCount === sourceNodeV273.requestFields.length
  && miniKvV120.responseFieldCount === sourceNodeV273.responseFields.length
  && miniKvV120.failureClassCount === sourceNodeV273.failureClasses.length
  && miniKvV120.handleOnlyRequest === true
  && miniKvV120.includesCredentialValue === false
  && miniKvV120.includesRawEndpointUrl === false
```

危险动作继续关闭：

```ts
credentialBoundaryAligned:
  !sourceNodeV273.readsManagedAuditCredential
  && !sourceNodeV273.storesManagedAuditCredential
  && !sourceNodeV273.credentialValueRead
  && !javaV113.credentialValueRead
  && miniKvV120.credentialValueReadAllowed === false
```

## 路由接入

文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown),
```

这符合当前规则：route 继续走统一 route table，不新增手写 JSON/Markdown 样板。

## 测试覆盖

文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.test.ts
```

覆盖四类场景：

```text
1. 正常验证 Node v273 + Java v113 + mini-kv v120
2. 强制 historical fixture fallback，模拟 GitHub runner 没有 sibling workspace
3. UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 打开时必须 blocked
4. JSON / Markdown route 通过 audit route table 暴露
```

## 本版边界

v274 输出：

```text
readyForManagedAuditSandboxAdapterConnection=false
realResolverImplementationAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
schemaMigrationExecuted=false
approvalLedgerWritten=false
automaticUpstreamStart=false
```

## 一句话总结

Node v274 让三项目对 disabled credential resolver candidate 的边界达成可测试的一致理解：Java 证明能回显并复用 echo workflow template，mini-kv 证明继续不参与 resolver/credential/storage，Node 统一验证 counts、boundary scopes、interface shape、fake wiring 和 no-side-effect 边界；真实 resolver 仍未打开。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.test.ts -> 4 tests passed
npx vitest run v272/v273/v274 focused tests -> 3 files, 12 tests passed
npm test -> 214 files, 724 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, verificationState=credential-resolver-disabled-candidate-upstream-echo-verification-ready, ready=true, checkCount=25, passedCheckCount=25, javaReady=true, miniKvReady=true, blockerCount=0, markdownStatus=200
Chrome screenshot -> c/274/图片/credential-resolver-disabled-candidate-upstream-echo-verification-v274.png
```

## 清理记录

HTTP smoke 启动的 Node 服务 PID 34968 已停止。本版验证产生的 `.tmp` 和 `dist` 会在提交前删除。
