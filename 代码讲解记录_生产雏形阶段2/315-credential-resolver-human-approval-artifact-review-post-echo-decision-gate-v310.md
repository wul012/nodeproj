# 第三百一十版代码讲解：human approval artifact review post-echo decision gate

本版目标是消费 Node v309 的三方 echo verification，把 `human approval artifact review` 链条从“已对齐”收束为一个明确的 decision gate。它不继续堆一层 echo，也不实现 runtime shell，而是说明：下一步如果继续，必须先让 Java v144 + mini-kv v137 并行只读回显本决策门。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v309-post-human-approval-artifact-review-upstream-echo-roadmap.md
```

计划要求：

```text
Node v310：human approval artifact review post-echo decision gate
目标不是继续堆 echo，而是把 v308/v309 的结果收束成“仍 blocked / 可进入下一类前置”的 decision gate
默认仍不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP
```

## 文件拆分

本版继续按四件套拆分：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.test.ts
```

其中 service 421 行，types 197 行，renderer 107 行，test 252 行，没有新增难维护的巨型文件。

## 核心入口

主入口是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate({ config })
```

它先读取 Node v309：

```ts
const sourceNodeV309 = createSourceNodeV309(input.config);
```

`createSourceNodeV309` 复用 v309 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification({
  config,
});
```

这点很重要：v310 不重新读取 Java v143 / mini-kv v136 文件，而是消费 v309 已经归档和测试过的三方验证结果。

## Decision Gate

v310 的核心记录是：

```ts
decision: "continue-only-as-blocked-post-echo-prerequisite-review"
selectedPath: "request-read-only-upstream-decision-echo-before-any-runtime-shell"
```

它允许的是上游只读 echo 请求：

```ts
allowsParallelJavaV144MiniKvV137EchoRequest:
  sourceNodeV309.readyForHumanApprovalArtifactReviewUpstreamEchoVerification
```

但明确禁止 Node v311 抢跑：

```ts
allowsNodeV311BeforeUpstreamEcho: false
```

同时继续关闭所有真实执行能力：

```ts
allowsDisabledRuntimeShellImplementation: false
allowsDisabledRuntimeShellInvocation: false
allowsCredentialValueRead: false
allowsRawEndpointUrlParse: false
allowsExternalRequest: false
allowsManagedAuditConnection: false
allowsSchemaMigration: false
allowsApprovalLedgerWrite: false
allowsAutomaticUpstreamStart: false
```

## 仍缺的前置条件

本版把缺口固定为 6 个：

```text
signed-human-approval-artifact
credential-handle-approval
endpoint-handle-allowlist-approval
no-network-safety-fixture
abort-rollback-semantics
java-mini-kv-decision-echo
```

它们都标记为：

```ts
status: "documented-missing"
requiredBeforeRuntimeShell: true
```

这说明 v310 的成熟度价值不是“打开能力”，而是把不能打开的理由具体化，避免治理链继续空转。

## Checks

v310 先确认 v309 已经 ready：

```ts
sourceNodeV309Ready: sourceNodeV309.readyForHumanApprovalArtifactReviewUpstreamEchoVerification
sourceNodeV309UpstreamEchoAligned:
  sourceNodeV309.upstreamEchoAligned
  && sourceNodeV309.reviewPacketContractAligned
  && sourceNodeV309.sideEffectBoundariesAligned
```

再确认 decision gate 自己没有越权：

```ts
decisionGateBlocksRuntimeShell:
  decisionGate.allowsDisabledRuntimeShellImplementation === false
  && decisionGate.allowsDisabledRuntimeShellInvocation === false
  && decisionGate.allowsCredentialValueRead === false
  && decisionGate.allowsRawEndpointUrlParse === false
  && decisionGate.allowsExternalRequest === false
  && decisionGate.allowsManagedAuditConnection === false
```

最后确认并行关系：

```ts
parallelJavaV144MiniKvV137EchoRecommended:
  decisionGate.allowsParallelJavaV144MiniKvV137EchoRequest
  && decisionGate.allowsNodeV311BeforeUpstreamEcho === false
```

## 路由接入

新增路由：

```ts
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate
```

路由继续复用 `auditJsonMarkdownRoute`，因此 JSON / Markdown 输出和 access guard 行为一致。

## 测试覆盖

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.test.ts
```

覆盖四类场景：

```text
1. ready profile：v310 decision gate ready，仍 blocked。
2. historical fallback：通过 v309 source chain 强制使用 historical fixture。
3. blocked config：UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 开启时 blocked。
4. route：JSON 和 Markdown 路由都返回 200。
```

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.test.ts：4 passed
npm test：243 files / 839 tests passed
npm run build：通过
HTTP smoke：JSON 200 / Markdown 200
截图：Playwright MCP 尝试后因 file:// 被阻止，回退本机 Chrome headless 成功
```

## 项目成熟度变化

v310 把 v308/v309 的人审 artifact review 链条从“证据对齐”推进到“决策门”：

```text
Node v308：定义 review packet
Java v143 + mini-kv v136：并行只读 echo
Node v309：验证三方对齐
Node v310：生成 post-echo decision gate
```

下一步最合理的是 Java v144 + mini-kv v137 并行只读 echo，而不是 Node 继续抢跑 runtime shell。
