# 306 - Node v301 credential resolver runtime shell post-decision continuation plan intake

## 版本定位

Node v301 是 v300 之后的 post-decision continuation plan intake。v300 已经验证 Java v135 和 mini-kv v132 都认可 Node v299 的 blocked decision record；v301 的任务是决定后续怎么继续，而不是实现 runtime shell。

入口是 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts:34) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake`。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeTypes.ts:5) 明确把 v301 写成 plan intake：

```ts
runtimeShellPostDecisionContinuationPlanIntakeOnly: true;
readOnlyPlanIntake: true;
consumesNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: true;
readyForParallelJavaV136MiniKvV133EchoRequest: boolean;
readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification: false;
readyForDisabledRuntimeShellImplementation: false;
runtimeShellImplemented: false;
runtimeShellInvocationAllowed: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这些字段把“可以继续请上游回显”与“可以实现 runtime shell”分开，避免 v300 ready 被误读成 implementation approval。

## Source Node v300

`createSourceNodeV300` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts:142) 读取 v300 profile：

```ts
verificationState: source.verificationState;
readyForRuntimeShellDecisionRecordUpstreamEchoVerification:
  source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification;
readyForPostRuntimeShellDecisionPlan: source.readyForPostRuntimeShellDecisionPlan;
upstreamEchoAligned: source.echoVerification.upstreamEchoAligned;
implementationStillBlocked: source.echoVerification.implementationStillBlocked;
```

也就是说，v301 的来源不是 Java/mini-kv 的新证据，而是 Node v300 已归档的三方 echo verification。

## Continuation Plan Intake

`createContinuationPlanIntake` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts:213) 生成 v301 的核心 intake：

```ts
intakeMode: "runtime-shell-post-decision-continuation-plan-intake-only";
sourceSpan: "Node v300";
selectedContinuationDecision: "continue-blocked-planning";
nextJavaEchoVersion: "Java v136";
nextMiniKvReceiptVersion: "mini-kv v133";
nextNodeVerificationVersion: "Node v302";
runtimeShellImplementationAllowed: false;
runtimeShellInvocationAllowed: false;
externalRequestAllowed: false;
approvalLedgerWriteAllowed: false;
```

这里选择继续 blocked planning，只是为了让 Java v136 和 mini-kv v133 回显这个计划入口，再由 Node v302 验证一致性。

## Continuation Options

`createContinuationOptions` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts:258) 同时记录四个选项：

```ts
CONTINUE_BLOCKED_PLANNING = selected
PAUSE_RUNTIME_SHELL_CHAIN = documented-alternative
REQUIRE_EXPLICIT_APPROVAL_PREREQUISITES = documented-alternative
IMPLEMENT_RUNTIME_SHELL_NOW = rejected
```

这让 v301 不只是“继续做下一版”，而是把为什么继续、为什么不实现 runtime shell 写成可验证结构。

## 必要性证明

`createNecessityProof` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts:304) 写明四件事：

```ts
blockerResolved: "v300 verified ... but it did not decide the post-decision continuation path.";
consumer: "Java v136 and mini-kv v133 ... Node v302 ...";
whyV300CannotBeReused: "v300 is an upstream echo verification ... it lacks a selected continuation option ...";
stopCondition: "Stop immediately if the next step requires credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP ...";
```

这是本版最重要的治理逻辑：新增版本必须有 blocker、consumer、复用边界和停止条件。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.ts:333) 汇总 25 个检查：

```ts
sourceNodeV300Ready
sourceNodeV300ReadyForPostDecisionPlan
sourceNodeV300KeepsRuntimeBlocked
sourceNodeV300KeepsCredentialBoundaryClosed
sourceNodeV300KeepsEndpointBoundaryClosed
sourceNodeV300KeepsConnectionBoundaryClosed
sourceNodeV300KeepsWriteBoundaryClosed
continuationDecisionSelected
decisionOptionsDocumented
runtimeImplementationOptionRejected
necessityProofComplete
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

全部通过时，`planIntakeState` 才会变成 `runtime-shell-post-decision-continuation-plan-intake-ready`。

## 路由和渲染

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:754) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake
```

Markdown 渲染在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeRenderer.ts:8)，输出 Source Node v300、Continuation Plan Intake、Continuation Options、Necessity Proof、Checks、Summary 和后续动作。

## 测试

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.test.ts:10) 覆盖：

- 正向 v301 plan intake，确认 25 个检查全部通过。
- `UPSTREAM_PROBES_ENABLED` / `UPSTREAM_ACTIONS_ENABLED` 打开时阻断。
- JSON / Markdown 路由。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntake.test.ts
HTTP smoke JSON/Markdown route = 200
Playwright MCP screenshot -> d/301/图片/credential-resolver-runtime-shell-post-decision-continuation-plan-intake-v301.png
npm test
npm run build
```

全量结果：

```text
234 个测试文件通过
804 个测试用例通过
```

## 下一步

v301 完成后，推荐并行 Java v136 + mini-kv v133。Node v302 必须等待两边完成后再做 post-decision plan intake upstream echo verification。
