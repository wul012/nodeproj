# 301 - Node v296 credential resolver disabled runtime shell upstream echo verification

## 版本定位

Node v296 接在 v295 后面。v295 只做 design review，并要求先拿到上游 echo；v296 的职责就是把 Node v295、Java v133、mini-kv v130 三份证据合并验证。

入口是 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts:58) 的 `loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification`。

## 类型边界

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationTypes.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationTypes.ts:9) 把 v296 的安全边界写成类型：

```ts
readOnlyUpstreamEchoVerification: true;
disabledRuntimeShellUpstreamEchoVerificationOnly: true;
readyForNodeV297RuntimeShellImplementation: false;
readyForDisabledRuntimeShellImplementation: false;
readyForDisabledRuntimeShellInvocation: false;
runtimeShellImplemented: false;
runtimeShellInvocationAllowed: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
resolverClientInstantiated: false;
approvalLedgerWritten: false;
automaticUpstreamStart: false;
```

这说明 v296 即使 ready，也只是 upstream echo verification ready，不是 runtime implementation ready。

## Source Node v295

`createSourceNodeV295` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts:145) 复用 v295 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview({ config });
```

它读取 v295 的设计审查结果：

```ts
designReviewState: "disabled-runtime-shell-design-review-ready";
readyForParallelUpstreamEchoRequest: true;
readyForNodeV296RuntimeShellImplementation: false;
decision: "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation";
runtimeShellImplemented: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
externalRequestSent: false;
```

v296 不重算 v295 的十条边界，而是消费 v295 的 digest、state、summary 和安全字段。

## Java v133 Evidence

`createJavaV133Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts:189) 读取三份 Java 历史证据：

```ts
JAVA_V133_SUPPORT
JAVA_V133_TEST
JAVA_V133_WALKTHROUGH
```

这里特意保留计划修正：

```ts
plannedVersionCorrection: "Java v132 was quality optimization; Java v133 contains the handoff echo"
```

原因是 v295 计划写 Java v132，但实际 Java v132 是质量优化，真正的 disabled runtime shell handoff echo 是 Java v133。v296 把这个事实固化在 profile 中，避免后续版本继续按错误版本号对齐。

## mini-kv v130 Evidence

`createMiniKvV130Reference` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts:246) 读取 mini-kv v130 的 receipt、运行说明和讲解：

```ts
MINI_KV_V130_RECEIPT
MINI_KV_V130_RUNBOOK
MINI_KV_V130_WALKTHROUGH
```

它同时检查 JSON 字段和文档片段。关键字段包括：

```ts
ready_for_node_v296_disabled_runtime_shell_upstream_echo_verification
runtime_shell_implemented
runtime_shell_invocation_allowed
disabled_runtime_shell_participates
credential_value_read
raw_endpoint_url_parsed
external_request_sent
load_restore_compact_executed
setnxex_execution_allowed
audit_authoritative
order_authoritative
```

这一段的价值是把 mini-kv 明确锁在 non-participation receipt：它只提供证据，不实现 shell，不执行写命令，不成为 audit/order 权威存储。

## Checks

`createChecks` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts:319) 汇总 24 个检查：

```ts
sourceNodeV295Ready
sourceNodeV295KeepsImplementationBlocked
javaV133EvidencePresent
javaV133HandoffEchoReady
miniKvV130EvidencePresent
miniKvV130NonParticipationReceiptReady
planVersionCorrectionDocumented
upstreamEchoConsumerAligned
nodeJavaMiniKvDecisionAligned
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
productionAuditStillBlocked
productionWindowStillBlocked
```

只有这些都为真，`verificationState` 才会变成 `disabled-runtime-shell-upstream-echo-verification-ready`。

## Echo Verification

`createEchoVerification` 在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.ts:412) 输出 v296 的核心结论：

```ts
verificationMode: "node-v295-plus-java-v133-plus-mini-kv-v130-disabled-runtime-shell-upstream-echo-verification-only";
sourceSpan: "Node v295 + Java v133 + mini-kv v130";
upstreamEchoAligned: true;
sideEffectBoundariesAligned: true;
implementationStillBlocked: true;
readyForNodeV297RuntimeShellImplementationCandidateGate: true;
readyForRuntimeShellImplementation: false;
```

`readyForNodeV297RuntimeShellImplementationCandidateGate=true` 是下一版候选门禁的入口，不是实际 runtime 的放行。

## 路由和渲染

路由通过 [auditJsonMarkdownRoutes.ts](D:/nodeproj/orderops-node/src/routes/auditJsonMarkdownRoutes.ts:1) 的 audit JSON/Markdown 表注册：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification
```

Markdown 渲染在 [managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationRenderer.ts](D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationRenderer.ts:7)，会输出 Source Node v295、Java v133、mini-kv v130、checks、summary、blockers、warnings、recommendations 和 evidence endpoints。

## 测试

[managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.test.ts](D:/nodeproj/orderops-node/test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.test.ts:13) 覆盖：

- Node v295 + Java v133 + mini-kv v130 可以形成 v296 ready。
- historical fixture fallback 能命中 Java v133 和 mini-kv v130 的本地冻结证据。
- 开启 upstream probes/actions 时必须 blocked。
- JSON 和 Markdown 路由都能访问。

## 验证结果

已通过：

```text
npm run typecheck
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification.test.ts
npm test
npm run build
```

全量结果：229 个测试文件、785 个用例通过。`npm run build` 通过。

本版证据生成使用 `node --input-type=module` 的 stdin 管道，避免 PowerShell 长 `node -e` 字符串引号问题。最终提交前按规则清理 `dist`。
