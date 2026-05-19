# 第二百五十六版代码讲解：fake transport packet archive verification

本版目标是验证 Node v255 归档，而不是继续推进 fake transport 行为。v255 已经生成 fake transport adapter dry-run verification packet；v256 只确认这份 packet 的 HTML、截图、解释、代码讲解、route response 和 cleanup 证据是否完整可复核。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v255-post-fake-transport-dry-run-roadmap.md
```

当前主线是：

```text
v252 disabled adapter client precheck
 -> v253 test-only adapter shell contract
 -> Java v102 + mini-kv v111 只读 echo / non-participation
 -> v254 disabled adapter client upstream echo verification
 -> v255 fake transport adapter dry-run verification packet
 -> v256 fake transport packet archive verification
```

v256 完成后，下一步不是继续 Node 抢跑，而是推荐并行 Java v103 + mini-kv v112。

## 模块拆分

新增三份文件：

```text
src/services/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.ts
src/services/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationTypes.ts
src/services/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationRenderer.ts
```

这次继续遵守计划里的质量要求：service 约 434 行，types 约 157 行，renderer 约 74 行，没有新增 700+ 行 service。

## 主 profile

核心类型定义：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1";
archiveVerificationState: "fake-transport-packet-archive-verification-ready" | "blocked";
readOnlyArchiveVerification: true;
archiveVerificationRerunsFakeTransportBehavior: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

这里 ready 的对象是 archive verification，不是 managed audit connection。

## 消费 v255 route response

主服务先读取 v255 profile：

```ts
const sourceNodeV255 = createSourceNodeV255(
  loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({ config: input.config }),
);
```

`createSourceNodeV255()` 抽取关键证据：

```ts
packetDigest: packet.packetDigest,
requestDigest: packet.request.requestDigest,
responseDigest: packet.response.responseDigest,
requestShapeFieldCount: packet.request.requestShapeFieldCount,
responseShapeFieldCount: packet.response.responseShapeFieldCount,
failureMappingCount: packet.failureMappingVerification.mappedFailureCount,
timeoutBudgetMs: packet.timeoutBudget.timeoutBudgetMs,
cleanupArtifactCount: packet.cleanup.cleanupArtifactCount,
cleanupVerified: packet.cleanup.cleanupVerified,
temporaryDirectoryCreated: packet.cleanup.temporaryDirectoryCreated,
temporaryFileCreated: packet.cleanup.temporaryFileCreated,
```

这让 v256 能够验证 route response 的 shape 和 digest，而不是只看文件是否存在。

## 归档文件证据

v256 验证五个文件：

```ts
fileEvidence("html-archive", ARCHIVE_PATHS.html),
fileEvidence("screenshot", ARCHIVE_PATHS.screenshot),
fileEvidence("explanation", ARCHIVE_PATHS.explanation),
fileEvidence("code-walkthrough", ARCHIVE_PATHS.walkthrough),
fileEvidence("active-plan", ARCHIVE_PATHS.activePlan),
```

`fileEvidence()` 会读取文件并计算 sha256：

```ts
const content = readHistoricalEvidenceFile(historicalPath);
digest: createHash("sha256").update(content).digest("hex"),
```

这里使用 `historicalEvidenceResolver`，所以 GitHub runner 强制 fallback 时也不会依赖开发机绝对路径。

## 片段验证

`createSnippetEvidence()` 检查 19 个关键片段，包括：

```ts
snippet("html-test-only-code", ARCHIVE_PATHS.html, "TEST_ONLY_FAKE_TRANSPORT_DRY_RUN"),
snippet("explanation-cleanup", ARCHIVE_PATHS.explanation, "cleanupVerified=true"),
snippet("explanation-no-temp-dir", ARCHIVE_PATHS.explanation, "temporaryDirectoryCreated=false"),
snippet("walkthrough-request", ARCHIVE_PATHS.walkthrough, "createDryRunRequest()"),
snippet("plan-v256", ARCHIVE_PATHS.activePlan, "Node v256：fake transport packet archive verification"),
snippet("plan-parallel-java-mini-kv", ARCHIVE_PATHS.activePlan, "推荐并行：Java v103 + mini-kv v112"),
```

这些片段覆盖 HTML、解释、代码讲解和 plan，避免 v256 只做“文件存在”的弱验证。

## checks

`createChecks()` 聚合：

```ts
sourceNodeV255Ready
sourcePacketDigestValid
sourceRequestDigestValid
sourceResponseDigestValid
sourceCleanupEvidenceVerified
archiveFilesPresent
archiveFilesNonEmpty
archiveSnippetsMatched
routeResponseVerified
noArchiveVerificationFakeTransportRerun
noTempDryRunDirectoryCreated
upstreamActionsStillDisabled
```

最终 ready 仍然排除自引用字段后计算：

```ts
checks.readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification")
  .every(([, value]) => value);
```

如果 `UPSTREAM_ACTIONS_ENABLED=true`，v256 会 blocked；如果 v255 缺截图、解释、代码讲解、cleanup 或 plan 片段，也会 blocked。

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification",
  (deps) => loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationMarkdown,
)
```

仍然使用共享 route table，没有回到手写 JSON / Markdown 双路由。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.test.ts
```

覆盖：

```text
1. v255 归档完整时，v256 archive verification ready
2. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
3. JSON / Markdown route 均可访问
```

聚焦验证：

```text
npm run typecheck -> passed
npm test -- managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.test.ts managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.test.ts -> 2 files, 6 tests passed
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 196 files passed, 657 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/256/图片/fake-transport-packet-archive-verification-v256.png
```

safe HTTP smoke 结果：

```text
healthStatus=ok
archiveVerificationState=fake-transport-packet-archive-verification-ready
ready=true
archiveFilesPresent=true
archiveSnippetsMatched=true
sourceCleanupEvidenceVerified=true
rerunsFakeTransport=false
connectsManagedAudit=false
readsManagedAuditCredential=false
checkCount=24
passedCheckCount=24
```

## 成熟度变化

v256 把 v255 的 fake transport dry-run packet 变成可复核归档：

```text
packet 证据
 -> archive file digest
 -> snippet evidence
 -> route response verification
 -> cleanup verification
```

这比单纯保存截图更接近生产验收，因为每个关键边界都能在 JSON profile 里复核。

## 一句话总结

v256 只读验证 v255 归档：文件存在、digest 有效、19 个关键片段齐全、route response shape 可复核、cleanup 证明无临时产物；真实 managed audit connection 仍未打开。
