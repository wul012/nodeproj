# 305 - Node v300 credential resolver runtime shell decision record upstream echo verification

## 版本定位

Node v300 接在 v299 后面。v299 把 v298 的三方 candidate gate 结论收口成 blocked decision record；v300 再消费 Java v135 和 mini-kv v132 的回显，确认两边都认可这份 blocked decision。

入口是 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts:56) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification`。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationTypes.ts:9) 把 v300 写成只读 verification：

```ts
readOnlyUpstreamEchoVerification: true;
runtimeShellDecisionRecordUpstreamEchoVerificationOnly: true;
consumesNodeV299RuntimeShellCandidateGateDecisionRecord: true;
consumesJavaV135RuntimeShellDecisionRecordEcho: true;
consumesMiniKvV132RuntimeShellDecisionRecordNonParticipationReceipt: true;
readyForDisabledRuntimeShellImplementation: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
schemaMigrationExecuted: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

也就是说，v300 只核对上游证据，不创建 runtime shell。

## Source Node v299

`createSourceNodeV299` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts:163) 读取 v299 profile：

```ts
decisionRecordState: "runtime-shell-candidate-gate-decision-record-ready";
runtimeShellDecision: "blocked";
readyForParallelJavaV135MiniKvV132EchoRequest: true;
readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: false;
requiredEvidenceCount: 4;
noGoConditionCount: 6;
```

这里保留 `readyForNodeV300... = false` 的意义是：v299 本身不允许 Node 抢跑，必须等 Java v135 + mini-kv v132 完成后，由 v300 单独验证。

## Java v135 证据

`createJavaV135Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts:232) 用三类证据判断 Java 是否可消费：

```ts
JAVA_V135_SUPPORT
JAVA_V135_TEST
JAVA_V135_WALKTHROUGH
```

它不是调用 Java 服务，而是检查 Java v135 的 support/test/walkthrough 是否包含：

```ts
Node v300
java-v135-credential-resolver-runtime-shell-decision-record-echo-only
decision()).isEqualTo("blocked")
requiredEvidenceCount()).isEqualTo(4)
noGoConditionCount()).isEqualTo(6)
readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification()).isTrue()
```

这些 snippet 让 Node 能在 GitHub runner 上用 frozen historical fixture 验证 Java evidence，而不依赖本机 Java 仓库。

## mini-kv v132 证据

`createMiniKvV132Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts:318) 读取 JSON receipt：

```ts
credential-resolver-runtime-shell-decision-record-non-participation-receipt.json
```

关键字段是：

```ts
ready_for_node_v300_runtime_shell_decision_record_upstream_echo_verification = true
runtime_shell_decision_record_non_participation_receipt_only = true
runtime_shell_implemented = false
runtime_shell_invocation_allowed = false
credential_value_read = false
raw_endpoint_url_parsed = false
external_request_sent = false
load_restore_compact_executed = false
setnxex_execution_allowed = false
```

mini-kv 只证明自己不参与 runtime shell，不把 KV 拉进 managed audit 权威链路。

## Echo Verification

`createEchoVerification` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts:404) 汇总三方对齐结果：

```ts
sourceSpan: "Node v299 + Java v135 + mini-kv v132";
upstreamEchoAligned: true;
blockedDecisionAligned: true;
requiredEvidenceAligned: true;
noGoConditionsAligned: true;
sideEffectBoundariesAligned: true;
implementationStillBlocked: true;
```

这一步的结论是“blocked decision 被三方回显确认”，不是“可以实现 runtime shell”。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.ts:452) 汇总 19 个检查：

```ts
sourceNodeV299Ready
sourceNodeV299DecisionBlocked
sourceNodeV299KeepsRuntimeBlocked
javaV135EvidencePresent
javaV135ReadyForNodeV300
javaV135KeepsRuntimeBlocked
miniKvV132EvidencePresent
miniKvV132ReadyForNodeV300
miniKvV132KeepsRuntimeBlocked
upstreamEchoesAligned
upstreamProbesStillDisabled
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

全部通过时，`verificationState` 才会变成 `runtime-shell-decision-record-upstream-echo-verification-ready`。

## 路由和渲染

路由在 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:748) 注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification
```

Markdown 渲染在 [managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationRenderer.ts:12)，输出 Node v299、Java v135、mini-kv v132、echo verification、checks、summary、blockers、warnings、recommendations。

## 测试

[managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.test.ts:13) 覆盖：

- Java v135 + mini-kv v132 的正向对齐。
- forced historical fixture fallback。
- upstream probes/actions 开启时阻断。
- JSON / Markdown 路由。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification.test.ts
HTTP smoke JSON/Markdown route = 200
Chrome screenshot -> d/300/图片/credential-resolver-runtime-shell-decision-record-upstream-echo-verification-v300.png
```

截图阶段已验证 Playwright MCP 可调用；由于 MCP 禁止 `file://` 页面且当前未提供自定义 header 注入，本版截图用本机 Chrome headless 打开归档 HTML 生成。鉴权开启的 HTTP smoke 已独立覆盖 JSON/Markdown 路由。

后续收口会继续运行 full test 和 build。

## 下一步

v300 后应该另起 post-decision plan。当前只能说三方都确认 blocked decision；如果要继续靠近真实 runtime，需要一个新的显式计划来说明 blocker、consumer、停止条件和审批前置，不允许把 upstream echo ready 误解成 runtime implementation approval。
