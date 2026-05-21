# 303 - Node v298 credential resolver runtime shell candidate gate upstream echo verification

## 版本定位

Node v298 接在 v297 后面。v297 已经把 runtime shell implementation candidate gate 固化成五个门槛和一个 blocked decision；Java v134 与 mini-kv v131 已分别回显这份 gate。

入口是 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts:55) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification`。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationTypes.ts:9) 把本版性质写死：

```ts
readOnlyUpstreamEchoVerification: true;
runtimeShellCandidateGateUpstreamEchoVerificationOnly: true;
consumesNodeV297DisabledRuntimeShellImplementationCandidateGate: true;
consumesJavaV134RuntimeShellCandidateGateEcho: true;
consumesMiniKvV131RuntimeShellCandidateGateNonParticipationReceipt: true;
readyForNodeV299RuntimeShellImplementation: false;
readyForDisabledRuntimeShellImplementation: false;
runtimeShellImplemented: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这意味着 v298 只验证 echo，不给 runtime shell 放行。

## Source Node v297

`createSourceNodeV297` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts:173) 读取 v297 profile：

```ts
candidateGateState: "disabled-runtime-shell-implementation-candidate-gate-reviewed";
readyForParallelJavaV134MiniKvV131EchoRequest: true;
gateVersion: "node-v297-disabled-runtime-shell-implementation-candidate-gate.v1";
gateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation";
requiredGateCount: 5;
implementationAllowedGateCount: 0;
```

这里 v297 是源 gate，v298 不能重新解释它，只能验证 Java 和 mini-kv 是否按原样回显。

## Java v134 Evidence

`createJavaV134Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts:225) 读取三份冻结证据：

```ts
JAVA_V134_SUPPORT
JAVA_V134_TEST
JAVA_V134_WALKTHROUGH
```

关键 snippet 包括：

```ts
"java-v134-credential-resolver-disabled-runtime-shell-candidate-gate-echo-only"
"Node v298"
"readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification=true"
"blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation"
"Java v134 and mini-kv v131, then Node v298"
```

这些检查保证 Java v134 只做 candidate gate echo，不写 ledger、不执行 SQL、不调用外部上游。

## mini-kv v131 Evidence

`createMiniKvV131Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts:291) 读取：

```ts
credential-resolver-disabled-runtime-shell-candidate-gate-non-participation-receipt.json
d/131/解释/说明.md
187-version-131-credential-resolver-disabled-runtime-shell-candidate-gate-non-participation-receipt.md
```

JSON 字段会被解析成结构化证据：

```ts
releaseVersion: "v131";
consumerHint: "Node v298 runtime shell candidate gate upstream echo verification";
nodeV297GateDecision: GATE_DECISION;
requiredGateCount: 5;
implementationAllowedGateCount: 0;
readyForNodeV298: true;
runtimeShellImplemented: false;
loadRestoreCompactExecuted: false;
setnxexExecutionAllowed: false;
auditAuthoritative: false;
orderAuthoritative: false;
```

这让 Node 能区分“mini-kv 已回显非参与”与“mini-kv 可承载 runtime shell”，后者仍为 false。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts:409) 汇总本版门禁：

```ts
sourceNodeV297Ready
javaV134CandidateGateEchoReady
miniKvV131NonParticipationReceiptReady
upstreamEchoConsumerAligned
nodeJavaMiniKvGateDecisionAligned
candidateGateCountAligned
candidateGateDigestAnchored
runtimeShellImplementationStillForbidden
credentialBoundaryClosed
rawEndpointBoundaryClosed
providerClientBoundaryClosed
connectionBoundaryClosed
writeBoundaryClosed
loadCompactRestoreSetnxexStillBlocked
autoStartBoundaryClosed
auditAndOrderAuthorityForbidden
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

`candidateGateDigestAnchored` 特别重要：它要求 mini-kv v131 记录的 Node v297 gate digest 和 Node 本地计算出来的 v297 digest 一致，避免只靠文案相似就通过。

## Echo Verification

`createEchoVerification` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.ts:531) 生成最终判断：

```ts
sourceSpan: "Node v297 + Java v134 + mini-kv v131";
upstreamEchoAligned: true;
fiveGateSetAligned: true;
sideEffectBoundariesAligned: true;
implementationStillBlocked: true;
readyForNodeV299RuntimeShellCandidateGateDecisionRecord: true;
readyForRuntimeShellImplementation: false;
```

所以 v298 完成后，只能进入 v299 decision record，不能跳到 implementation。

## 路由和渲染

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:727) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification
```

Markdown 渲染在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationRenderer.ts:7)，输出 source Node v297、Java v134、mini-kv v131、checks、summary、blockers、warnings、recommendations 和 evidence endpoints。

## 测试

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.test.ts:12) 覆盖：

- Java v134 + mini-kv v131 ready 时，v298 verification ready。
- forced historical fixture fallback 必须走 committed historical evidence。
- upstream probes/actions 打开时 blocked。
- JSON 和 Markdown route 可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification.test.ts
npm test
npm run build
```

全量结果：231 个测试文件、793 个用例通过。`npm run build` 通过。

最终证据生成使用 build 后的本地 stdin 脚本流程，并强制 `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`。生成结果：

```text
verificationState = runtime-shell-candidate-gate-upstream-echo-verification-ready
checkCount = 26
passedCheckCount = 26
productionBlockerCount = 0
```
