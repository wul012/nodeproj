# 第三百零八版代码讲解：human approval artifact review packet

本版目标是承接 Node v307 的三方 echo 结果，定义人工提交 approval artifact 的 review packet。它解决的问题很具体：v307 证明 Java v142 和 mini-kv v135 已经回显 Node v306 的 artifact prerequisite contract，但还没有规定“人工提交的 approval artifact 本身应该包含什么、缺什么要拒绝、出现什么字段必须拒绝”。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v307-post-approval-prerequisite-artifact-upstream-echo-roadmap.md
```

计划要求：

```text
Node v308：human approval artifact review packet
直接消费 Node v307 的三方对齐结果
只验证 artifact shape / missing fields / prohibited fields / rejection reasons
不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP
```

所以 v308 不是 runtime shell，也不是 fake client，也不是真实 managed audit adapter。它只是给后续 Java v143 / mini-kv v136 一个明确可回显的人工 approval artifact review 契约。

## 文件拆分

本版继续按四件套拆分，避免巨型文件继续膨胀：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket.test.ts
```

`Types` 固定 JSON shape；`service` 生成 profile 和 checks；`renderer` 只负责 Markdown；`test` 锁住 ready、fallback、blocked config 和 route。

## 核心入口

主入口是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket({ config })
```

它第一步不是自己重算上游，而是消费 v307：

```ts
const sourceNodeV307 = createSourceNodeV307(input.config);
```

`createSourceNodeV307` 内部调用 v307 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification({
  config,
});
```

然后只提取 v308 需要的证据：

```ts
readyForUpstreamEchoVerification:
  source.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification,
verificationDigest: source.echoVerification.verificationDigest,
upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
artifactContractAligned: source.echoVerification.artifactContractAligned,
sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
```

这说明 v308 是 v307 的后续审查 packet，不是重开一套三方 echo 逻辑。

## Review Packet Contract

`createReviewPacket` 生成本版核心 contract：

```ts
const requiredFields = createRequiredFields();
const prohibitedFields = createProhibitedFields();
const rejectionReasons = createRejectionReasons();
const missingFieldChecks = requiredFields.map((field) => ({
  fieldId: field.id,
  rejectionCode: field.missingFieldCode,
}));
```

required fields 共 9 个：

```text
artifact_id
operator_approval_reference
credential_handle_review_status
endpoint_handle_allowlist_review_status
no_network_safety_test_reference
manual_abort_semantics_reference
rollback_semantics_reference
created_by_operator_identity
audit_correlation_id
```

这些字段的重点是“handle / status / reference”，不是 secret value 或 raw URL。比如：

```ts
requiredField("credential_handle_review_status", "Credential handle review status", "Review status for the credential handle, not credential value.")
```

以及：

```ts
requiredField("endpoint_handle_allowlist_review_status", "Endpoint handle allowlist review status", "Allowlist review status for endpoint handle, not raw URL.")
```

这两个字段把安全边界压住了：Node 可以审查 credential handle 和 endpoint handle 的状态，但不能读取 credential value，也不能解析 raw endpoint URL。

## Prohibited Fields

禁字段由 `createProhibitedFields` 生成：

```ts
prohibitedField("credential_value", "Credential values must never enter Node, Java, or mini-kv evidence.", "CREDENTIAL_VALUE_PRESENT")
prohibitedField("raw_endpoint_url", "The review packet may carry endpoint handle status, not raw endpoint URLs.", "RAW_ENDPOINT_URL_PRESENT")
prohibitedField("secret_provider_config", "Provider config would move v308 from contract review into implementation.", "PROVIDER_CONFIG_PRESENT")
prohibitedField("resolver_client_config", "Resolver client config would instantiate the runtime path too early.", "RESOLVER_CLIENT_CONFIG_PRESENT")
```

这里故意把 `secret_provider_config`、`resolver_client_config` 也列为 prohibited。因为一旦 review packet 开始携带这些配置，v308 就不再是人工审查契约，而是在向真实 adapter 实现滑动。

## No-Go Boundaries

`createNoGoBoundaries` 固化了 12 条禁止越界：

```ts
noGoBoundary("credential_value_read", "Review only credential handle status.")
noGoBoundary("raw_endpoint_url_parse", "Review only endpoint handle allowlist status.")
noGoBoundary("secret_provider_instantiation", "No secret provider can be instantiated in v308.")
noGoBoundary("resolver_client_instantiation", "No resolver client can be instantiated in v308.")
noGoBoundary("external_http_or_tcp_request", "No HTTP/TCP request is prepared or sent.")
```

这些边界是后续版本最重要的“刹车片”：即使 v308 已经定义 packet，也不能直接进入 runtime shell 或真实连接。

## 必要性证明

本版按规则写了 `necessityProof`：

```ts
blockerResolved:
  "Node v307 proves the upstream echo alignment but leaves the human-submitted approval artifact review shape undefined.",
nextConsumer: "Java v143 + mini-kv v136, then Node v309",
whyV307CannotBeReused:
  "v307 verifies that Java and mini-kv echoed the Node v306 artifact prerequisite plan; it does not define the review packet fields, missing-field checks, prohibited-field checks, or rejection reasons for a human-supplied artifact.",
```

这段说明了为什么不能拿 v307 直接顶替 v308：v307 是“上游是否回显了旧契约”，v308 是“人工 artifact 自己的审查契约”。

## Checks

本版 checks 的第一组是消费 v307：

```ts
sourceNodeV307Ready: sourceNodeV307.readyForUpstreamEchoVerification,
sourceNodeV307UpstreamEchoAligned: sourceNodeV307.upstreamEchoAligned,
sourceNodeV307ArtifactContractAligned: sourceNodeV307.artifactContractAligned,
sourceNodeV307SideEffectsClosed:
  sourceNodeV307.sideEffectBoundariesAligned
  && sourceNodeV307.runtimeShellImplemented === false
  && sourceNodeV307.runtimeShellInvocationAllowed === false
  && sourceNodeV307.executionAllowed === false
```

第二组是验证 v308 自己的 contract：

```ts
requiredReviewFieldsDocumented:
  reviewPacket.requiredFieldCount === 9
  && reviewPacket.requiredFields.some((field) => field.id === "operator_approval_reference")
  && reviewPacket.requiredFields.some((field) => field.id === "credential_handle_review_status")
  && reviewPacket.requiredFields.some((field) => field.id === "endpoint_handle_allowlist_review_status")
```

还有并行计划检查：

```ts
javaMiniKvEchoRequestExplicitlyParallel:
  reviewPacket.upstreamEchoRequestCount === 2
  && reviewPacket.upstreamEchoRequests.every((request) => request.canRunInParallel && request.requiredBeforeNodeV309)
  && reviewPacket.upstreamEchoRequests.some((request) => request.version === "Java v143")
  && reviewPacket.upstreamEchoRequests.some((request) => request.version === "mini-kv v136")
```

这和全局计划一致：Node v308 完成后，Java v143 和 mini-kv v136 可以并行做只读 echo；Node v309 必须等两边完成。

## 路由接入

路由只在 audit route table 增加一条：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketMarkdown),
```

它继续复用现有 `auditJsonMarkdownRoute`，所以 JSON / Markdown 输出、access guard、format 参数都和前面版本一致。

## 测试覆盖

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket.test.ts
```

它覆盖四类场景：

```text
1. ready profile：v308 packet state ready，字段数量和边界正确。
2. historical fallback：通过 v307 source chain 使用历史 sibling fixture。
3. blocked config：UPSTREAM_PROBES_ENABLED / UPSTREAM_ACTIONS_ENABLED 开启时 blocked。
4. route：JSON 和 Markdown 路由都返回 200。
```

其中 route 测试明确断言：

```ts
expect(json.json()).toMatchObject({
  profileVersion:
    "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet.v1",
  reviewPacketState: "human-approval-artifact-review-packet-ready",
  activeNodeReviewVersion: "Node v308",
  nextJavaVersion: "Java v143",
  nextMiniKvVersion: "mini-kv v136",
  nextNodeVerificationVersion: "Node v309",
});
```

## 验证结果

本版验证结果：

```text
npm run typecheck：通过
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket.test.ts：4 passed
npm test：241 files / 831 tests passed
npm run build：通过
HTTP smoke：JSON 200 / Markdown 200
截图：Playwright MCP 因 file:// 限制失败后，回退本机 Chrome headless 成功
```

## 项目成熟度变化

v308 的价值不是打开真实联调，而是把真实联调前的人工审批 artifact 边界又往前推进了一格。现在链路是：

```text
Node v306 定义 approval prerequisite artifact intake plan
Java v142 + mini-kv v135 只读回显
Node v307 验证三方对齐
Node v308 定义 human approval artifact review packet
```

下一步不是 Node 抢跑，而是推荐并行：

```text
Java v143 + mini-kv v136
```

两边完成后，Node v309 再做 human approval artifact review upstream echo verification。
