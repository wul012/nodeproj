# 304 - Node v299 credential resolver runtime shell candidate gate decision record

## 版本定位

Node v299 接在 v298 后面。v298 已经完成 upstream echo verification，确认 Java v134 + mini-kv v131 的 blocked decision 仍然闭合；v299 把这份结论收口成单独的 blocked decision record。

入口是 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts:30) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord`。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordTypes.ts:8) 把本版性质写死：

```ts
decisionRecordState: "runtime-shell-candidate-gate-decision-record-ready" | "blocked";
runtimeShellDecision: "blocked";
readOnlyDecisionRecord: true;
runtimeShellCandidateGateDecisionRecordOnly: true;
consumesNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: true;
readyForParallelJavaV135MiniKvV132EchoRequest: boolean;
readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: false;
runtimeShellImplemented: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这意味着 v299 只记录 blocked decision，不给 runtime shell 放行。

## Source Node v298

`createSourceNodeV298` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts:126) 读取 v298 profile：

```ts
verificationState: "runtime-shell-candidate-gate-upstream-echo-verification-ready";
readyForNodeV299RuntimeShellCandidateGateDecisionRecord: true;
readyForNodeV299RuntimeShellImplementation: false;
requiredGateCount: 5;
documentedGateCount: 5;
reviewEvidenceSatisfiedCount: 5;
implementationAllowedGateCount: 0;
```

这里 v298 是源 verification，v299 不能重新解释它，只能把它收口成单独的 decision record。

## Decision Record

`createDecisionRecord` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts:188) 生成 blocked decision：

```ts
decision: "blocked";
upstreamEchoVerified: true;
allowsParallelJavaV135MiniKvV132EchoRequest: true;
allowsNodeV300BeforeUpstreamEcho: false;
allowsDisabledRuntimeShellImplementation: false;
allowsDisabledRuntimeShellInvocation: false;
allowsCredentialValueRead: false;
allowsRawEndpointUrlParse: false;
allowsManagedAuditConnection: false;
allowsSchemaMigration: false;
allowsApprovalLedgerWrite: false;
allowsAutomaticUpstreamStart: false;
```

`requiredEvidence` 只要求四项：v298 upstream echo ready、Java v134 echo ready、mini-kv v131 receipt ready、runtime shell still blocked。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.ts:293) 汇总本版门禁：

```ts
sourceNodeV298Loaded
sourceNodeV298Ready
sourceNodeV298VerifiedUpstreamEchoes
sourceNodeV298KeepsRuntimeBlocked
sourceNodeV298KeepsSideEffectsClosed
candidateGateDecisionBlocked
decisionRecordBlocksRuntimeShell
decisionRecordStillReadOnly
parallelJavaV135MiniKvV132EchoRecommended
upstreamProbesStillDisabled
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

这版仍然不允许 credential value、raw endpoint URL、managed audit connection、schema migration、ledger write 或 auto-start。

## 路由和渲染

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:742) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record
```

Markdown 渲染在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordRenderer.ts:1)，输出 source Node v298、decision record、checks、summary、warnings、recommendations 和 evidence endpoints。

## 测试

[test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.test.ts:13) 覆盖：

- blocked decision 的默认正向路径。
- forced historical fixture fallback。
- upstream probes/actions 打开时仍 blocked。
- JSON / Markdown route 可访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.test.ts
npm test
npm run build
```

本轮还补了本机 Chrome 的页面截图，归档在 `d/299/图片/`。

## 下一步

v299 之后应先做 Java v135 + mini-kv v132 的并行 echo，再让 Node 进入 v300。
