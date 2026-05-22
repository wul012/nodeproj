# 第三百零九版代码讲解：human approval artifact review upstream echo verification

本版目标是消费 Node v308、Java v143、mini-kv v136 三方证据，确认 `human approval artifact review packet` 已被上游只读回显，并继续保持 runtime shell、credential、endpoint、网络和写入边界关闭。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v307-post-approval-prerequisite-artifact-upstream-echo-roadmap.md
```

计划要求：

```text
Node v309：human approval artifact review upstream echo verification
必须等待 Java v143 + mini-kv v136 都完成
消费两边只读 echo，确认三方对 review packet contract 一致
不实现 runtime shell
```

Java v143 和 mini-kv v136 已经完成，Node v309 的职责是读取和验证，不启动上游服务，不修改 sibling 仓库。

## 文件拆分

本版继续按四件套拆分：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.test.ts
```

service 负责读 Node v308 和上游证据；types 固定 JSON shape；renderer 只负责 Markdown；test 覆盖 ready、fallback、blocked config 和 route。

## 核心入口

主入口是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification({ config })
```

它先读取 Node v308：

```ts
const sourceNodeV308 = createSourceNodeV308(input.config);
```

`createSourceNodeV308` 复用 v308 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket({
  config,
});
```

这里重点取三类字段：

```ts
reviewPacketDigest: source.reviewPacket.packetDigest,
requiredFieldIds: source.reviewPacket.requiredFields.map((field) => field.id),
prohibitedFieldIds: source.reviewPacket.prohibitedFields.map((field) => field.id),
rejectionReasonCodes: source.reviewPacket.rejectionReasons.map((reason) => reason.code),
missingFieldCheckCodes: source.reviewPacket.missingFieldChecks.map((check) => check.rejectionCode),
noGoBoundaryIds: source.reviewPacket.noGoBoundaries.map((boundary) => boundary.id),
upstreamEchoRequestVersions: source.reviewPacket.upstreamEchoRequests.map((request) => request.version),
```

这说明 v309 不重新定义 review packet，只验证 v308 的 contract 被 Java 和 mini-kv 回显。

## Java v143 证据

Java 侧入口是：

```ts
const javaV143 = createJavaV143Reference(sourceNodeV308);
```

它读取这些证据文件：

```text
D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoSupport.java
D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceHumanApprovalArtifactReviewPacketEchoTests.java
D:/javaproj/advanced-order-platform/d/143/解释/说明.md
D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/145-version-143-human-approval-artifact-review-packet-echo.md
```

核心判断是：

```ts
echoesNodeV308Packet:
  snippetMatched(expectedSnippets, "java-v143-node-v308")
  && snippetMatched(expectedSnippets, "java-v143-source-profile")
  && snippetMatched(expectedSnippets, "java-v143-source-route")
  && snippetMatched(expectedSnippets, "java-v143-source-state"),
```

也就是说，Java v143 必须明确消费 Node v308 的 profile、route、state。

Java 还必须标记自己可供 Node v309 消费：

```ts
readyForNodeV309:
  snippetMatched(expectedSnippets, "java-v143-node-v309")
  && snippetMatched(expectedSnippets, "java-v143-upstream-profile")
  && snippetMatched(expectedSnippets, "java-v143-ready"),
```

## mini-kv v136 证据

mini-kv 侧入口是：

```ts
const miniKvV136 = createMiniKvV136Reference(sourceNodeV308);
```

它读取 standalone receipt：

```text
D:/C/mini-kv/fixtures/release/credential-resolver-human-approval-artifact-review-non-participation-receipt.json
```

核心解析从 `source_node_v308_reference.review_packet` 取 contract 计数：

```ts
requiredFieldCount: numberField(reviewPacket, "required_field_count"),
prohibitedFieldCount: numberField(reviewPacket, "prohibited_field_count"),
rejectionReasonCount: numberField(reviewPacket, "rejection_reason_count"),
missingFieldCheckCount: numberField(reviewPacket, "missing_field_check_count"),
noGoBoundaryCount: numberField(reviewPacket, "no_go_boundary_count"),
upstreamEchoRequestCount: numberField(reviewPacket, "upstream_echo_request_count"),
```

这次实现中专门修正过一个容易踩的点：mini-kv 的 review packet 字段不是挂在 receipt 顶层，而是在 `source_node_v308_reference.review_packet` 里。v309 解析必须跟真实 fixture 对齐。

## Checks

v309 的 checks 先确认 Node v308 自身完整：

```ts
sourceNodeV308ReviewPacketContractComplete:
  sourceNodeV308.reviewPacket.requiredFieldCount === 9
  && sourceNodeV308.reviewPacket.prohibitedFieldCount === 9
  && sourceNodeV308.reviewPacket.rejectionReasonCount === 13
  && sourceNodeV308.reviewPacket.noGoBoundaryCount === 12
```

再确认 Java 和 mini-kv 都对齐：

```ts
upstreamEchoesAligned:
  javaV143.echoesNodeV308Packet
  && javaV143.readyForNodeV309
  && miniKvV136.echoesNodeV308Packet
  && miniKvV136.readyForNodeV309,
```

最后确认安全边界没有打开：

```ts
sideEffectBoundariesAligned:
  sourceNodeV308.executionAllowed === false
  && javaV143.sideEffectBoundariesClosed
  && miniKvV136.sideEffectBoundariesClosed,
```

## 路由接入

路由只新增一条：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationMarkdown),
```

它继续复用现有 `auditJsonMarkdownRoute`，因此 JSON / Markdown 输出和 access guard 行为一致。

## 测试覆盖

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.test.ts
```

它覆盖四类场景：

```text
1. ready profile：v309 verification ready，三方 contract 和边界正确。
2. historical fallback：通过冻结的 sibling workspace fixture 验证 Java v143 / mini-kv v136。
3. blocked config：UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 开启时 blocked。
4. route：JSON 和 Markdown 路由都返回 200。
```

本版还冻结了最小历史证据：

```text
fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/...
fixtures/historical/sibling-workspaces/mini-kv/...
```

这样 GitHub runner 即使没有本机 Java / mini-kv sibling repo，也能跑 v309 测试。

## 验证结果

本版验证结果：

```text
npm run typecheck：通过
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.test.ts：4 passed
npm test：242 files / 835 tests passed
npm run build：通过
HTTP smoke：JSON 200 / Markdown 200
截图：Playwright MCP 尝试后回退本机 Chrome headless 成功
```

## 项目成熟度变化

v309 完成的是“三方 echo verification”闭环：

```text
Node v308 定义 human approval artifact review packet
Java v143 只读回显
mini-kv v136 非参与回执
Node v309 验证三方对齐
```

它让后续可以另起新计划，但仍然不能直接实现 runtime shell 或真实 managed audit 连接。下一阶段如果继续推进，应先规划 Node-only preflight 或真实只读联调前置，并继续保持 credential/raw endpoint/provider/network/write 边界关闭。
