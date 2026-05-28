# 364 - Node v359 sandbox handle review packet/gate non-secret intake archive verification 代码讲解

## 版本定位

v359 接在 v358 之后。v358 定义了 packet/gate non-secret intake；v359 只验证这批归档是否完整、可追溯、仍然只读。

本版不重新构造 v358 intake，也不补新 packet/gate 规则。它只读取 `d/358`、计划索引、归档索引和代码讲解文件，生成 v359 自己的 archive verification profile。

## 入口与路由

路由注册在 `src/routes/auditJsonMarkdownRoutes.ts`：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationMarkdown,
)
```

它继续走统一的 `auditJsonMarkdownRoute` 注册方式，所以 JSON/Markdown 输出不散落在 route 文件里。

## 归档引用

主服务文件是：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification.ts
```

`createArchiveReferences()` 固定读取 11 个 v358 产物：

```ts
jsonEvidence
markdownEvidence
summaryEvidence
browserSnapshot
htmlArchive
screenshot
explanation
codeWalkthrough
sourcePlan
plansIndex
archiveIndex
```

所有文件都通过 `fileReference()` 生成：

```ts
{
  path: relativePath,
  exists: true,
  byteLength: statSync(absolutePath).size,
  digest: createHash("sha256").update(content).digest("hex"),
}
```

这使 v359 不只是检查“文件在不在”，还把每个归档文件的 digest 固化进 `archiveVerification.archiveFileDigests`。

## Source Node v358

`createSourceNodeV358()` 从 v358 JSON 中提取关键字段：

```ts
intakeState
intakeDecision
readyForPacketGateIntake
readyForNodeV359ArchiveVerification
intakeDigest
sourceArchiveVerificationDigest
packetInputCount
gateOutputCount
stopConditionCount
checkCount
passedCheckCount
```

这对应本版最重要的判断：v359 必须看到 v358 是 ready，且 v358 自己的 27 个检查全部通过。

## 关键检查

`createChecks()` 把 v358 归档拆成 34 个检查。最核心的是三类：

第一类是文件完整性：

```ts
archiveFilesPresent
jsonEvidenceReadable
summaryMatchesJson
browserSnapshotPresent
screenshotAndHtmlPresent
```

第二类是 v358 语义完整性：

```ts
packetInputsRecorded
gateOutputsRecorded
stopConditionsRecorded
allChecksPassedInSourceIntake
sourceNodeV357ArchiveEvidenceRecorded
```

第三类是安全边界：

```ts
noCredentialValueRequestedOrRead
noRawEndpointUrlRequestedOrParsed
noProviderClientInstantiated
noRuntimeShellImplementedOrInvoked
noManagedAuditConnection
noJavaMiniKvEchoRequired
```

`packetInputsRecorded()`、`gateOutputsRecorded()`、`stopConditionsRecorded()` 不只看数量，还看 id 和禁止项。例如 packet input 必须满足：

```ts
containsSecretValue === false
containsRawEndpointUrl === false
allowsNetworkConnection === false
allowsRuntimeInvocation === false
```

这样可以防止后续有人只保留数量，却把真实 secret、raw endpoint 或 runtime 能力塞进 packet。

## fail closed

如果 `d/358` 缺失，测试里的空目录场景会得到：

```text
archiveVerificationState=blocked
archiveVerificationDecision=blocked
readyForNodeV360SandboxHandleReviewPacketGateDecisionRecord=false
```

同时 production blockers 会包含：

```text
ARCHIVE_FILES_MISSING
ARCHIVE_JSON_UNREADABLE
ARCHIVE_JSON_NOT_READY
```

这保持了当前链路的一贯规则：归档不完整时只修归档，不推进功能，更不请求 Java / mini-kv 变更。

## Renderer

Markdown renderer 在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationRenderer.ts
```

它输出：

- Source Node v358
- Archive Verification
- Archive References
- Checks
- Summary
- Production Blockers / Warnings / Recommendations
- Next Actions

这和前几版 archive verification 的结构保持一致，便于人工审阅。

## 测试

测试文件是：

```text
test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification.test.ts
```

覆盖三种场景：

1. 正常归档：34/34 checks passed，11/11 files present。
2. 空 archive root：fail closed，不推进 v360。
3. route JSON/Markdown：确认 route 注册正确，且安全边界仍关闭。

## 本版价值

v359 的价值是把 v358 从“刚生成的 intake”变成“已验证、可追溯、可作为下一步输入的归档证据”。它为 v360 做 decision record / prerequisite closure 铺路，但不打开任何真实执行面。

## 验证记录

```text
npm.cmd run typecheck
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification.test.ts
npx.cmd vitest run test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake.test.ts test\managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification.test.ts
npm.cmd run build
Node HTTP smoke JSON / Markdown passed
Playwright MCP route Markdown screenshot captured
```
