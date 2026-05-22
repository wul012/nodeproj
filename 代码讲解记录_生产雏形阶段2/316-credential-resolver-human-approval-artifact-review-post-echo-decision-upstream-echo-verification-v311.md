# 第三百一十一版代码讲解：human approval artifact review post-echo decision upstream echo verification

本版目标是消费 Java v144 + mini-kv v137 对 Node v310 decision gate 的只读回显，生成 Node v311 的上游回显验证报告。它仍然不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，也不调用任何真实 managed audit endpoint。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v309-post-human-approval-artifact-review-upstream-echo-roadmap.md
```

计划要求：

```text
Node v311：human approval artifact review post-echo decision upstream echo verification
必须等待 Java v144 + mini-kv v137 都完成
消费两边只读 echo，确认三方对 v310 decision gate 一致
不实现 runtime shell
```

本版完成后，当前有效计划切换到：

```text
D:\nodeproj\orderops-node\docs\plans2\v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md
```

## 文件拆分

本版继续按四件套拆分：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.test.ts
```

行数大致为：

```text
service：616 行
types：252 行
renderer：169 行
test：288 行
```

没有把 v311 的业务逻辑继续塞进路由文件，也没有新增 1000+ 行巨型 service。

## 核心入口

主入口是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification({ config })
```

它先读取 Node v310：

```ts
const sourceNodeV310 = createSourceNodeV310(input.config);
```

`createSourceNodeV310` 复用 v310 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate({
  config,
});
```

这点很重要：v311 不重新推导 v310 的 decision gate，而是把 v310 作为已完成的上游输入来消费。

## Java v144 证据

Java 侧读取 4 个证据文件：

```ts
evidenceFile("java-v144-support", JAVA_V144_SUPPORT)
evidenceFile("java-v144-test", JAVA_V144_TEST)
evidenceFile("java-v144-explanation", JAVA_V144_EXPLANATION)
evidenceFile("java-v144-walkthrough", JAVA_V144_WALKTHROUGH)
```

核心匹配包括：

```ts
snippet("java-v144-node-v310", JAVA_V144_TEST, ".isEqualTo(\"Node v310\")")
snippet("java-v144-node-v311", JAVA_V144_TEST, ".isEqualTo(\"Node v311\")")
snippet("java-v144-upstream-profile", JAVA_V144_TEST, PROFILE_VERSION)
snippet("java-v144-ready", JAVA_V144_TEST, "readyForNodeV311PostEchoDecisionUpstreamEchoVerification()).isTrue()")
```

然后合成：

```ts
readyForNodeV311:
  snippetMatched(expectedSnippets, "java-v144-node-v311")
  && snippetMatched(expectedSnippets, "java-v144-upstream-profile")
  && snippetMatched(expectedSnippets, "java-v144-ready")
```

Java v144 只证明自己回显了 Node v310 decision gate，不给 Node 开 runtime shell 权限。

## mini-kv v137 证据

mini-kv 侧读取 standalone fixture：

```ts
const root = readJsonObject(MINI_KV_V137_RECEIPT);
const receipt = objectField(root, "credential_resolver_human_approval_artifact_review_post_echo_decision_gate_non_participation_receipt");
const sourceNodeV310Reference = objectField(receipt, "source_node_v310_reference");
const decisionGate = objectField(sourceNodeV310Reference, "decision_gate");
```

关键校验是 digest 与计数一致：

```ts
miniKvV137.sourceNodeV310DecisionDigest === sourceNodeV310.decisionDigest
&& miniKvV137.prerequisiteCount === sourceNodeV310.prerequisiteCount
&& miniKvV137.missingPrerequisiteCount === sourceNodeV310.missingPrerequisiteCount
&& miniKvV137.noGoConditionCount === sourceNodeV310.noGoConditionCount
```

这保证 mini-kv v137 不是只写了一个“ready”字段，而是真的引用了 Node v310 的同一个 decision gate。

## 边界关闭

v311 继续显式关闭所有执行能力：

```ts
runtimeShellImplemented: false
runtimeShellInvocationAllowed: false
executionAllowed: false
connectsManagedAudit: false
credentialValueRead: false
rawEndpointUrlParsed: false
externalRequestSent: false
schemaMigrationExecuted: false
approvalLedgerWritten: false
automaticUpstreamStart: false
```

mini-kv 侧还额外验证：

```ts
loadRestoreCompactExecuted: false
setnxexExecutionAllowed: false
auditAuthoritative: false
orderAuthoritative: false
```

所以本版的“ready”只表示证据对齐 ready，不表示生产执行 ready。

## Checks

v311 的最终 ready 由 23 个 check 合成：

```ts
checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification =
  Object.entries(checks)
    .filter(([key]) =>
      key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification")
    .every(([, value]) => value);
```

其中最关键的是：

```ts
upstreamEchoesAligned:
  javaV144.echoesNodeV310DecisionGate
  && javaV144.readyForNodeV311
  && miniKvV137.echoesNodeV310DecisionGate
  && miniKvV137.readyForNodeV311
```

以及：

```ts
sideEffectBoundariesAligned:
  sourceNodeV310.executionAllowed === false
  && javaV144.sideEffectBoundariesClosed
  && miniKvV137.sideEffectBoundariesClosed
```

## 路由接入

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification
```

它接入 `auditJsonMarkdownRoute`，同时支持 JSON 和 Markdown：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationMarkdown,
)
```

## 测试覆盖

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.test.ts
```

覆盖四类场景：

```text
1. ready profile：Java v144 + mini-kv v137 均 ready，v311 verification ready。
2. historical fallback：强制使用 fixtures/historical/sibling-workspaces。
3. blocked config：UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 开启时 blocked。
4. route：JSON 和 Markdown 路由都返回 200。
```

## 验证结果

```text
npm run typecheck：通过
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.test.ts：4 passed
npm test：244 files / 843 tests passed
npm run build：通过
HTTP smoke：JSON 200 / Markdown 200
截图：Playwright MCP 通过临时本地 HTTP server 截图成功
```

## 项目成熟度变化

v311 完成了这个链条的完整闭环：

```text
Node v308：定义 human approval artifact review packet
Java v143 + mini-kv v136：并行只读 echo
Node v309：验证三方对齐
Node v310：生成 post-echo decision gate
Java v144 + mini-kv v137：并行只读 echo decision gate
Node v311：验证上游 echo decision gate 对齐
```

下一步不应该继续无条件追加 echo，而应进入 Node v312 的 stop/prerequisite closure decision：如果没有新的具体 prerequisite contract，就暂停这条 governance 链。
