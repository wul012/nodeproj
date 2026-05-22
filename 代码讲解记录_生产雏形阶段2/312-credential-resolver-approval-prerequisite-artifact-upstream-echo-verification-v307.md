# 第三百零七版代码讲解：approval prerequisite artifact upstream echo verification

本版目标是消费 Node v306、Java v142、mini-kv v135 三方证据，确认 approval prerequisite artifact intake contract 已经被上游只读回显，并继续保持 runtime shell、credential、endpoint、网络和写入边界关闭。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v305-post-stop-prerequisite-upstream-echo-roadmap.md
```

计划要求：

```text
Node v307：approval prerequisite artifact upstream echo verification
只有 Java v142 + mini-kv v135 都完成后才推进
消费两边只读 echo，确认三方对 approval prerequisite artifact intake 一致
不实现 runtime shell
```

Java v142 和 mini-kv v135 已经完成，Node v307 的职责是“读取并验证”，不是新开执行能力。

## 文件拆分

本版继续按四件套拆分：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.test.ts
```

service 负责读 Node v306 和上游证据；types 固定 JSON shape；renderer 只负责 Markdown；test 覆盖 ready、fallback、blocked config 和 route。

## 核心入口

主入口是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification({ config })
```

它先读取 Node v306：

```ts
const sourceNodeV306 = createSourceNodeV306(input.config);
```

`createSourceNodeV306` 复用 v306 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan({
  config,
});
```

这里重点取三类字段：

```ts
artifactDigest: source.artifactIntakePlan.artifactDigest,
requiredFieldIds: source.artifactIntakePlan.requiredFields.map((field) => field.id),
prohibitedFieldIds: source.artifactIntakePlan.prohibitedFields.map((field) => field.id),
rejectionReasonCodes: source.artifactIntakePlan.rejectionReasons.map((reason) => reason.code),
noGoBoundaryIds: source.artifactIntakePlan.noGoBoundaries.map((boundary) => boundary.id),
```

这说明 v307 不重新定义 contract，只验证 v306 的 contract 被 Java 和 mini-kv 回显。

## Java v142 证据

Java 侧入口是：

```ts
const javaV142 = createJavaV142Reference(sourceNodeV306);
```

它读取这些证据文件：

```text
D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoSupport.java
D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceApprovalPrerequisiteArtifactIntakeEchoTests.java
D:/javaproj/advanced-order-platform/d/142/解释/说明.md
D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/144-version-142-approval-prerequisite-artifact-intake-echo.md
```

核心判断是：

```ts
echoesNodeV306Plan:
  snippetMatched(expectedSnippets, "java-v142-node-v306")
  && snippetMatched(expectedSnippets, "java-v142-plan-profile")
  && snippetMatched(expectedSnippets, "java-v142-plan-route")
  && snippetMatched(expectedSnippets, "java-v142-plan-state"),
```

也就是说，Java v142 必须明确消费 Node v306 的 profile、route、state。

Java 还必须标记自己可供 Node v307 消费：

```ts
readyForNodeV307:
  snippetMatched(expectedSnippets, "java-v142-node-v307")
  && snippetMatched(expectedSnippets, "java-v142-upstream-profile")
  && snippetMatched(expectedSnippets, "java-v142-ready"),
```

## mini-kv v135 证据

mini-kv 侧入口是：

```ts
const miniKvV135 = createMiniKvV135Reference(sourceNodeV306);
```

它读取 standalone receipt：

```text
D:/C/mini-kv/fixtures/release/credential-resolver-approval-prerequisite-artifact-intake-non-participation-receipt.json
```

核心判断是：

```ts
echoesNodeV306Plan:
  stringField(sourceNodeV306Reference, "source_version") === "Node v306"
  && stringField(sourceNodeV306Reference, "profile_version") === sourceNodeV306.profileVersion
  && stringField(sourceNodeV306Reference, "plan_state") === sourceNodeV306.planState
  && stringField(sourceArtifactIntakePlan, "artifact_digest") === sourceNodeV306.artifactDigest,
```

这比只检查文件存在更严格：mini-kv v135 固化的 artifact digest 必须等于 Node v306 现算出的 digest。

## Checks

`createChecks` 把三方证据收束为 23 个布尔门：

```ts
sourceNodeV306ArtifactContractComplete:
  sourceNodeV306.artifactIntakePlan.requiredFieldCount === 12
  && sourceNodeV306.artifactIntakePlan.prohibitedFieldCount === 8
  && sourceNodeV306.artifactIntakePlan.rejectionReasonCount === 9
  && sourceNodeV306.artifactIntakePlan.noGoBoundaryCount === 12
```

Java 侧必须回显完整 contract：

```ts
javaV142ArtifactContractEchoed:
  javaV142.artifactContractEchoed
  && javaV142.requiredFieldCountEchoed
  && javaV142.prohibitedFieldCountEchoed
  && javaV142.rejectionReasonCountEchoed
  && javaV142.noGoBoundaryCountEchoed
  && javaV142.upstreamEchoRequestsEchoed
  && javaV142.necessityProofEchoed,
```

mini-kv 侧必须保持只读非参与：

```ts
miniKvV135KeepsRuntimeBlocked:
  miniKvV135.nonParticipationReceiptOnly
  && miniKvV135.readyForNodeV307BeforeUpstreamEcho === false
  && miniKvV135.sideEffectBoundariesClosed,
```

最终 ready 条件是所有 checks 除自身聚合字段外全 true：

```ts
checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification =
  Object.entries(checks)
    .filter(([key]) =>
      key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification")
    .every(([, value]) => value);
```

## 路由挂载

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification
```

挂载在统一 audit route table：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationMarkdown),
```

JSON 和 Markdown 走同一个 loader，避免两套逻辑漂移。

## Historical Fallback

本版补了 Java v142 和 mini-kv v135 的 frozen evidence：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...
fixtures/historical/sibling-workspaces/mini-kv/...
```

测试里强制设置：

```ts
process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
```

并断言 resolved path 指向：

```ts
fixtures/historical/sibling-workspaces
```

这保证 GitHub runner 没有本地兄弟仓库时也能验证同一份 v142/v135 证据。

## 验证结果

- focused tests: passed。
- forced historical fixture fallback: passed。
- typecheck: passed。
- full test: `240` files / `827` tests passed。
- build: passed。
- HTTP smoke: JSON 200 / Markdown 200。
- Playwright MCP screenshot: passed。
- archive profile: `verificationState=approval-prerequisite-artifact-upstream-echo-verification-ready`。
- checks: `23/23`。

## 项目成熟度影响

v307 是三项目对齐版。它证明 Node v306 定义的 artifact contract 已经被 Java v142 和 mini-kv v135 理解并只读回显。

但它仍然不等于真实联调：下一步更合理的是定义“人工提交 approval artifact review packet”，继续验证 artifact 内容是否满足 contract，而不是马上读取 credential、解析 endpoint 或实现 runtime shell。
