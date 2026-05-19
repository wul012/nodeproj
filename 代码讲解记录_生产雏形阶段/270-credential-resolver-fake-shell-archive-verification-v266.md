# 第二百六十六版代码讲解：credential resolver fake-shell archive verification

本版目标是给 credential resolver fake-shell 阶段做 archive verification。Node v264 定义了 fake shell contract，Node v265 完成了 Java v107 / mini-kv v116 的 upstream echo verification；v266 不再推进业务能力，而是确认这两版的归档证据完整、可复核、可被后续 Java v110 / mini-kv v117 继续只读消费。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v263-post-disabled-resolver-echo-roadmap.md
```

当前链路是：

```text
Node v264 credential resolver test-only shell contract
 -> Java v107 test-only shell echo marker
 -> mini-kv v116 test-only shell non-participation receipt
 -> Node v265 test-only shell upstream echo verification
 -> Node v266 fake-shell archive verification
```

v266 完成后，这份 v263 衍生计划收口；后续由：

```text
D:\nodeproj\orderops-node\docs\plans\v266-post-fake-shell-archive-roadmap.md
```

接续。新计划下一步推荐并行 Java v110 + mini-kv v117。

## 新增文件

本版新增三份服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationRenderer.ts
```

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.test.ts
```

路由接入：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

## 主 profile

profile version 和 route：

```ts
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification";
```

返回对象继续显式关闭危险动作：

```ts
archiveVerificationRerunsFakeShellBehavior: false,
executionAllowed: false,
connectsManagedAudit: false,
readsManagedAuditCredential: false,
storesManagedAuditCredential: false,
credentialValueRead: false,
rawEndpointUrlParsed: false,
externalRequestSent: false,
secretProviderInstantiated: false,
resolverClientInstantiated: false,
schemaMigrationExecuted: false,
automaticUpstreamStart: false,
```

这说明 v266 只是读归档文件和 route summary，不执行 fake resolver shell，也不会进一步接近真实 secret provider。

## 消费 Node v264

服务先读取 v264：

```ts
const sourceNodeV264 = createSourceNodeV264(
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({ config: input.config }),
);
```

`createSourceNodeV264()` 只提取归档验证需要的摘要：

```ts
shellContractState
readyForTestOnlyShellContract
contractDigest
shellMode
resolverKind
requestShapeFieldCount
responseShapeFieldCount
failureMappingCount
guardConditionCount
```

同时继续确认 v264 没有真实副作用：

```ts
credentialResolverExecutionAllowed: source.credentialResolverExecutionAllowed,
credentialValueRead: source.credentialValueRead,
rawEndpointUrlParsed: source.rawEndpointUrlParsed,
externalRequestSent: source.externalRequestSent,
secretProviderInstantiated: source.secretProviderInstantiated,
resolverClientInstantiated: source.resolverClientInstantiated,
connectsManagedAudit: source.connectsManagedAudit,
schemaMigrationExecuted: source.schemaMigrationExecuted,
automaticUpstreamStart: source.automaticUpstreamStart,
```

## 消费 Node v265

v265 摘要通过同样方式读取：

```ts
const sourceNodeV265 = createSourceNodeV265(
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
    config: input.config,
  }),
);
```

v266 关心的是 v265 是否真的消费了三方证据：

```ts
sourceNodeV264Ready: source.checks.sourceNodeV264Ready,
javaV107EchoReady: source.checks.javaV107EchoReady,
miniKvV116NonParticipationReady: source.checks.miniKvV116NonParticipationReady,
javaV109OptimizationContextReady: source.checks.javaV109OptimizationContextReady,
```

这让归档验证不是单纯检查“文件存在”，而是确认 v265 route 仍然能计算出三方一致性。

## 归档文件证据

归档范围在 `ARCHIVE_PATHS` 里集中定义：

```ts
const ARCHIVE_PATHS = Object.freeze({
  v264Html: "c/264/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.html",
  v264Screenshot: "c/264/图片/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.png",
  v264Explanation: "c/264/解释/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md",
  v264Walkthrough:
    "代码讲解记录_生产雏形阶段/268-sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md",
  v265Html:
    "c/265/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.html",
  v265Screenshot:
    "c/265/图片/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.png",
  v265Explanation:
    "c/265/解释/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md",
  v265Walkthrough:
    "代码讲解记录_生产雏形阶段/269-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md",
  activePlan: ACTIVE_PLAN,
});
```

`fileEvidence()` 会记录 exists、sizeBytes 和 sha256 digest：

```ts
return {
  id,
  workspacePath,
  historicalPath,
  resolvedPath,
  exists: true,
  sizeBytes: statHistoricalEvidence(historicalPath).size,
  digest: createHash("sha256").update(content).digest("hex"),
};
```

这样后续 Java v110 / mini-kv v117 可以引用明确的归档证据，而不是只看一句“已完成”。

## 片段证据

`createSnippetEvidence()` 检查 24 个关键片段，包括：

```text
v264 ready state
v264 不实例化真实 resolver client
v264 safe HTTP smoke
v264 Chrome screenshot
v265 ready state
v265 javaV109OptimizationContextReady=true
v265 safe HTTP smoke
v265 Chrome screenshot
v266 计划项
不重新执行 fake resolver shell
不接入真实 secret provider / managed audit connection
```

例如：

```ts
snippet("v265-explanation-java-v109", ARCHIVE_PATHS.v265Explanation, "javaV109OptimizationContextReady=true")
snippet("plan-no-rerun", ARCHIVE_PATHS.activePlan, "不重新执行 fake resolver shell")
snippet("plan-no-real-provider", ARCHIVE_PATHS.activePlan, "不接入真实 secret provider，不打开真实 managed audit connection")
```

这比只检查文件存在更稳：文件必须包含可证明本版安全边界的文字。

## Checks

`createChecks()` 把归档分成几组：

```ts
sourceNodeV264Ready
sourceNodeV264DigestValid
sourceNodeV265Ready
sourceNodeV265DigestValid
sourceNodeV265ConsumesUpstreamEchoes
archiveFilesPresent
archiveFilesNonEmpty
archiveSnippetsMatched
routeResponsesVerified
noArchiveVerificationFakeShellRerun
upstreamActionsStillDisabled
```

其中 route response 验证会检查 v264/v265 的核心数量没有漂移：

```ts
sourceNodeV264.requestShapeFieldCount === 9
&& sourceNodeV264.responseShapeFieldCount === 13
&& sourceNodeV264.failureMappingCount === 7
&& sourceNodeV264.guardConditionCount === 10
&& sourceNodeV265.requestShapeFieldCount === 9
&& sourceNodeV265.responseShapeFieldCount === 13
&& sourceNodeV265.failureMappingCount === 7
&& sourceNodeV265.guardConditionCount === 10
&& sourceNodeV265.checkCount === sourceNodeV265.passedCheckCount
```

最终 readiness 仍然要求：

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

所以即使 archive verification 是只读，也不会在开启上游动作时给出 ready。

## 路由接入

路由继续走统一 JSON/Markdown helper：

```ts
auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification({
  config: deps.config,
}), renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationMarkdown),
```

这符合当前质量规则：audit route 不再手写重复 JSON / Markdown 分支。

## 测试覆盖

测试覆盖三件事：

```text
1. v264/v265 archive evidence ready，且不 rerun fake shell
2. UPSTREAM_ACTIONS_ENABLED=true 时阻断
3. JSON / Markdown route 都能输出
```

关键断言：

```ts
expect(profile.archivedEvidence.files.every((file) => file.exists && file.sizeBytes > 0 && file.digest?.length === 64)).toBe(true);
expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
```

## 验证结果

```text
npm run typecheck -> passed
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.test.ts -> 1 file, 3 tests passed
npm test -> 206 files, 694 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/266/图片/credential-resolver-fake-shell-archive-verification-v266.png
```

## 成熟度变化

v266 不是新业务扩展，而是阶段收口。它把 fake-shell 阶段从“功能已跑通”提升到“证据可复核、可回显、可作为下一阶段输入”。这对靠近生产级流程很重要，因为真实流程不是只看 endpoint 能否返回 200，还要看：

```text
归档是否完整
截图是否存在
讲解是否能说明边界
计划是否明确下一步
route response 是否仍与归档一致
是否没有重新执行危险动作
```

## 一句话总结

Node v266 把 credential resolver fake-shell 阶段的归档证据固化下来：v264 和 v265 的 HTML、截图、解释、讲解、route response 和计划片段都可验证；下一步推荐并行 Java v110 + mini-kv v117 只读回显这份归档，仍不进入真实 resolver 实现。
