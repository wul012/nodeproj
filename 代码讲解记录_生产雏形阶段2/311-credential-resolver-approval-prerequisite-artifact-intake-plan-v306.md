# 第三百零六版代码讲解：approval prerequisite artifact intake plan

本版目标是消费 Node v305 的 upstream echo verification，把 runtime shell 继续推进前必须补齐的前置项，整理成一个可测试、可回显、可拒绝的 approval prerequisite artifact intake contract。

## 本版所处项目进度

当前计划来自：

```text
D:\nodeproj\orderops-node\docs\plans2\v305-post-stop-prerequisite-upstream-echo-roadmap.md
```

计划要求：

```text
Node v306：approval prerequisite artifact intake plan
目标不是继续 echo，而是把 v304 的 6 个 documented-missing prerequisites 收束为一个 artifact 输入契约
只定义 artifact schema / required fields / rejection reasons / no-go boundary
不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP，不实现 runtime shell
```

v305 已经证明 Java v141 和 mini-kv v134 都回显了 blocked prerequisite decision；v306 的职责是把下一步要被 Java v142 / mini-kv v135 回显的 contract 先定下来。

## 文件拆分

本版继续拆成四块，避免把新治理链条写成巨型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan.test.ts
```

其中 service 负责读取 v305、构造 artifact contract 和 checks；types 负责固定输出结构；renderer 只负责 Markdown；test 覆盖 ready、fallback、blocked config、route JSON/Markdown。

## 核心入口

主入口是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan({ config })
```

它的第一步是消费 v305：

```ts
const sourceNodeV305 = createSourceNodeV305Reference(input.config);
```

`createSourceNodeV305Reference` 复用已有 loader：

```ts
const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification({
  config,
});
```

这里只取 v306 需要的字段，例如：

```ts
verificationDigest: source.echoVerification.verificationDigest,
upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
prerequisiteGateStillBlocked: source.echoVerification.prerequisiteGateStillBlocked,
sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
prerequisiteCount: source.summary.prerequisiteCount,
missingRuntimePrerequisiteCount: source.summary.missingRuntimePrerequisiteCount,
noGoConditionCount: source.summary.noGoConditionCount,
```

这说明 v306 不是重做 v305 的三方 echo，只消费 v305 的结论。

## Artifact Contract

核心 contract 由 `createArtifactIntakePlan` 构造：

```ts
const requiredFields = createRequiredFields();
const prohibitedFields = createProhibitedFields();
const rejectionReasons = createRejectionReasons();
const noGoBoundaries = createNoGoBoundaries();
const upstreamEchoRequests = createUpstreamEchoRequests();
```

输出里的 artifact 名称固定为：

```ts
artifactName: "managed-audit-runtime-shell-approval-prerequisite-artifact"
artifactVersion: "approval-prerequisite-artifact.v1"
intakeMode: "approval-prerequisite-artifact-intake-plan-only"
```

本版不是提交真实 artifact，而是定义后续真实 artifact 必须长什么样。

## Required Fields

`createRequiredFields` 定义 12 个必填项：

```ts
artifact_id
source_node_verification
operator_approval_reference
credential_handle_review_status
endpoint_handle_allowlist_review_status
no_network_safety_test_reference
manual_abort_semantics_reference
rollback_semantics_reference
java_echo_required_version
mini_kv_receipt_required_version
created_by_operator_identity
audit_correlation_id
```

注意这里用的是 handle / status / reference，而不是 value / URL / config。比如 credential 只能出现：

```ts
credential_handle_review_status
```

不能出现 credential value。

## Prohibited Fields

`createProhibitedFields` 明确拒绝 8 类字段：

```ts
credential_value
raw_endpoint_url
secret_provider_config
resolver_client_config
external_request_payload
approval_ledger_mutation
schema_migration_sql
mini_kv_write_command
```

这组字段是本版最关键的安全边界：只要 artifact 带这些内容，后续 Node v307 就应判定为 rejected，而不是继续进入 runtime shell 实现。

## Rejection Reasons

`createRejectionReasons` 把拒绝原因编码成稳定 code，例如：

```ts
CREDENTIAL_VALUE_PRESENT
RAW_ENDPOINT_URL_PRESENT
JAVA_OR_MINIKV_ECHO_MISSING
RUNTIME_SHELL_IMPLEMENTATION_REQUESTED
WRITE_OR_SCHEMA_MUTATION_REQUESTED
```

这些 code 以后可以被 Java v142、mini-kv v135、Node v307 共同引用，避免三边各自发明不同说法。

## No-Go Boundaries

`createNoGoBoundaries` 把禁止动作全部固定为 `allowed: false`：

```ts
runtime_shell_implemented
runtime_shell_invocation_allowed
execution_allowed
connects_managed_audit
credential_value_read
raw_endpoint_url_parsed
external_request_sent
provider_or_client_instantiated
schema_migration_executed
approval_ledger_written
mini_kv_write_or_authority
automatic_upstream_start
```

这让 v306 的结论非常明确：它可以让 Java/mini-kv 做只读 echo，但不能打开任何真实执行边界。

## 必要性证明

本版按规则写了 necessity proof：

```ts
blockerResolved:
  "v305 proved the blocked prerequisite decision is echoed upstream, but the six documented-missing prerequisites still lack a concrete non-secret artifact shape."
```

并说明为什么不能复用 v305：

```ts
whyV305CannotBeReused:
  "v305 verifies Java v141 and mini-kv v134 echoed Node v304; it does not define required artifact fields, prohibited fields, rejection reasons, or no-go boundaries for the next intake."
```

这避免继续做没有新消费者的 echo 版本。

## Checks

`createChecks` 负责把 contract 变成可验证条件：

```ts
requiredArtifactFieldsDocumented:
  artifactIntakePlan.requiredFields.length === 12
  && artifactIntakePlan.requiredFields.every((field) => field.required),
```

```ts
prohibitedArtifactFieldsDocumented:
  artifactIntakePlan.prohibitedFields.length === 8
  && prohibitedCodes.has("CREDENTIAL_VALUE_PRESENT")
  && prohibitedCodes.has("RAW_ENDPOINT_URL_PRESENT")
  && prohibitedCodes.has("WRITE_OR_SCHEMA_MUTATION_REQUESTED"),
```

```ts
javaMiniKvEchoRequestExplicitlyParallel:
  artifactIntakePlan.upstreamEchoRequests.length === 2
  && artifactIntakePlan.upstreamEchoRequests.every((request) =>
    request.canRunInParallel && request.mustRemainReadOnly)
```

也就是说，计划里的“推荐并行 Java v142 + mini-kv v135”不是口头说明，而是 profile 的一部分。

## 路由挂载

新增路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan
```

挂载在统一 audit route table：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanMarkdown),
```

这保证 JSON 和 Markdown 输出走同一套 route registrar。

## 测试覆盖

测试文件覆盖 4 个场景：

```text
1. v306 ready profile：校验 sourceNodeV305、artifact contract、necessity proof、checks、summary。
2. forced historical fixture fallback：保证 v305 来源链在 GitHub runner 上也能工作。
3. upstream probes/actions enabled：必须 blocked，不能误放行。
4. JSON/Markdown route：确保路由真实可访问，Markdown 包含 Required Fields / Prohibited Fields / Upstream Echo Requests。
```

核心断言包括：

```ts
expect(profile.readyForParallelJavaV142MiniKvV135Echo).toBe(true);
expect(profile.readyForNodeV307BeforeUpstreamEcho).toBe(false);
expect(profile.artifactIntakePlan.noGoBoundaries.every((boundary) => boundary.allowed === false)).toBe(true);
```

这说明 v306 可以让 Java/mini-kv 并行 echo，但 Node v307 不能在两边完成前抢跑。

## 验证结果

- focused tests: passed。
- forced historical fixture fallback: passed。
- typecheck: passed。
- full test: `239` files / `823` tests passed。
- build: passed。
- HTTP smoke: JSON 200 / Markdown 200。
- Playwright MCP screenshot: passed。
- archive profile: `planState=approval-prerequisite-artifact-intake-plan-ready`。
- checks: `16/16`。

## 项目成熟度影响

v306 没有直接靠近真实 managed audit connection，但它把“真实之前必须出现的 artifact”先定义清楚了。这个版本的价值在于减少后续歧义：Java v142 和 mini-kv v135 只需要 echo 这个 contract，Node v307 再验证三方是否一致。

这比继续堆 summary 或 echo 更稳，因为它形成了下一步真实推进前的输入契约。
