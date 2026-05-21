# 302 - Node v297 credential resolver disabled runtime shell implementation candidate gate

## 版本定位

Node v297 接在 v296 后面。v296 已经证明 Node v295 + Java v133 + mini-kv v130 的 upstream echo verification ready；v297 不做 runtime shell，而是把这份 ready 证据转成更窄的 implementation candidate gate。

入口是 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts:39) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate`。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateTypes.ts:9) 把本版的状态写得很硬：

```ts
candidateGateState: "disabled-runtime-shell-implementation-candidate-gate-reviewed" | "blocked";
readOnlyCandidateGate: true;
implementationCandidateGateOnly: true;
readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: false;
readyForNodeV298RuntimeShellImplementation: false;
runtimeShellImplemented: false;
runtimeShellInvocationAllowed: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这说明 v297 是门禁评审，不是实现版本。

## Source Node v296

`createSourceNodeV296` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts:116) 读取 v296 upstream echo verification：

```ts
verificationState: "disabled-runtime-shell-upstream-echo-verification-ready";
readyForUpstreamEchoVerification: true;
consumesJavaV133: true;
consumesMiniKvV130: true;
planVersionCorrectionApplied: true;
plannedJavaVersion: "Java v132";
actualJavaEchoVersion: "Java v133";
readyForNodeV297CandidateGate: true;
readyForNodeV297RuntimeShellImplementation: false;
```

这里延续了 v296 的计划修正：Java v132 是质量优化，真正的 handoff echo 是 Java v133。

## Candidate Gate

`createCandidateGate` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts:150) 定义门禁对象：

```ts
gateVersion: "node-v297-disabled-runtime-shell-implementation-candidate-gate.v1";
gateMode: "candidate-gate-only-default-blocked";
gateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation";
```

门禁必要性也明确写出：

```ts
blocker: "candidate-gate-lacks-upstream-echo-and-runtime-prerequisite-proof";
consumer: "Java v134 and mini-kv v131, then Node v298";
cannotReuseExistingReportReason: "Node v296 verified upstream echo evidence only ...";
stopCondition: "Stop extending the candidate gate once Java v134 and mini-kv v131 echo the blocked decision and Node v298 verifies both echoes.";
```

这不是再造一个 summary，而是把后续 runtime candidate 的停止条件写清楚。

## 五个门槛

`createRequiredGates` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts:205) 只保留五项：

```ts
DEDICATED_DISABLED_BY_DEFAULT_FLAG
OPERATOR_APPROVAL
ABORT_SEMANTICS
NO_NETWORK_TESTS
HISTORICAL_FALLBACK_EVIDENCE
```

它们分别对应：

- 专用 disabled-by-default flag
- 显式 operator approval
- abort / rollback / no-write semantics
- no-network tests
- historical fallback evidence

每一项都只允许给出 blocked 的评审结论，不允许给出 implementationAllowed=true。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.ts:262) 汇总检查：

```ts
sourceNodeV296Ready
sourceNodeV296KeepsImplementationBlocked
sourceNodeV296KeepsSideEffectsClosed
candidateGateCountStable
allCandidateGatesDocumented
allCandidateGatesReviewEvidenceSatisfied
candidateGateKeepsRuntimeBlocked
dedicatedDisabledByDefaultFlagRequired
operatorApprovalRequired
abortSemanticsRequired
noNetworkTestsRequired
historicalFallbackEvidenceRequired
necessityDocumented
parallelUpstreamEchoRecommended
noRuntimeImplementationCreated
noRuntimeInvocationAllowed
credentialBoundaryClosed
rawEndpointBoundaryClosed
providerClientBoundaryClosed
connectionBoundaryClosed
writeBoundaryClosed
autoStartBoundaryClosed
upstreamProbesStillDisabled
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

`readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate=true` 只意味着门禁评审完成，不意味着 runtime shell 可以被实现。

## 路由和渲染

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:726) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate
```

Markdown 渲染在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateRenderer.ts:9)，会输出 sourceNodeV296、candidateGate、checks、summary、blockers、warnings、recommendations 和 evidence endpoints。

## 测试

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.test.ts:13) 覆盖：

- v296 ready 时，v297 gate reviewed 且 blocked runtime 保持。
- forced historical fixture fallback 能穿透 v296 source chain。
- upstream probes/actions 打开时 blocked。
- JSON 和 Markdown route 可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate.test.ts
npm test
npm run build
```

全量结果：230 个测试文件、789 个用例通过。`npm run build` 通过。

最终证据生成使用标准 build 后的本地脚本流程，避免 PowerShell 长参数字符串把双引号改写。提交前按规则清理 `dist`。
