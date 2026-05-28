# 366 - Node v361 sandbox handle review packet/gate decision record archive verification 代码讲解

## 版本定位

v361 接在 v360 后面。v360 已记录 `advance-to-sandbox-handle-review-prerequisite-closure-review` 这个非执行决策；v361 的职责是验证这份 decision record 的归档是否完整。

这版只读 `d/360` 归档，不重新生成 v360 决策，不请求 Java / mini-kv 新 echo，不启动上游，也不打开 managed audit 连接。

## 路由入口

路由注册在 `src/routes/auditJsonMarkdownRoutes.ts`：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMarkdown,
)
```

它继续复用统一 JSON / Markdown route helper，所以 route 层只负责挂载，不承载验证逻辑。

## Archive references

主服务在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification.ts
```

`createArchiveReferences()` 固定枚举 v360 归档必须存在的 11 个文件：

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

这里的根目录是：

```ts
const ARCHIVE_ROOT = "d/360" as const;
const V360_BASENAME = "sandbox-handle-review-packet-gate-decision-record-v360";
```

也就是说，v361 的输入不是运行时状态，而是 v360 已经落盘的证据包。

## Source Node v360

`createSourceNodeV360()` 从 v360 JSON 和 summary 中提取摘要：

```ts
decisionState
decision
readyForDecisionRecord
readyForNodeV361ArchiveVerification
decisionDigest
sourceArchiveVerificationDigest
sourceIntakeDigest
inputCount
checkCount
passedCheckCount
```

它同时保留安全边界字段：

```ts
startsJavaService: false
startsMiniKvService: false
connectsManagedAudit: false
sendsManagedAuditHttpTcp: false
credentialValueRequested: false
rawEndpointUrlParsed: false
runtimeShellImplemented: false
executionAllowed: false
```

这样 v361 可以证明：v360 是可归档 decision record，不是可执行连接实现。

## Archive verification record

`createArchiveVerification()` 生成 v361 自己的稳定 digest：

```ts
verificationMode: "sandbox-handle-review-packet-gate-decision-record-archive-verification"
sourceSpan: "Node v360 sandbox handle review packet/gate decision record"
archiveRoot: "d/360"
archiveVerificationDecision: "archive-sandbox-handle-review-packet-gate-decision-record"
sourceDecisionDigest: source.decisionDigest
verifiesJsonMarkdownAndSummary: true
verifiesScreenshotExplanationAndWalkthrough: true
verifiesPlanAndArchiveIndexes: true
verifiesDecisionInputsAndBoundaryControls: true
rerunsLiveProbe: false
startsUpstreamServices: false
opensManagedAuditConnection: false
nextNodeVersionSuggested: "Node v362"
```

`archiveFileDigests` 会记录 11 个归档文件的 sha256 和 byteLength，保证后续可以复核本次判断依据。

## Checks

`createChecks()` 把归档验证拆成 33 个布尔门：

```ts
archiveFilesPresent
jsonEvidenceReadable
jsonProfileVersionValid
jsonReadyForV361Verification
jsonDecisionValid
decisionInputsRecorded
decisionRecordRecorded
allChecksPassedInSourceDecisionRecord
sourceNodeV359ArchiveEvidenceRecorded
summaryMatchesJson
markdownRecordsDecisionRecord
markdownRecordsDecisionInputsAndBoundaries
browserSnapshotPresent
screenshotAndHtmlPresent
explanationRecordsDecisionAndBoundary
codeWalkthroughPresent
sourcePlanPointsToV361
planIndexReferencesV360AndV361
archiveIndexReferencesV360
routeRecordedInArchive
verificationDoesNotRerunProbe
noUpstreamServiceStartedByNode
noUpstreamMutation
noManagedAuditConnection
noCredentialValueRequestedOrRead
noRawEndpointUrlRequestedOrParsed
noProviderClientInstantiated
noRuntimeShellImplementedOrInvoked
noJavaMiniKvEchoRequired
archiveVerificationDigestStable
productionAuditStillBlocked
productionWindowStillBlocked
readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification
```

这些检查覆盖三类风险：

- 归档文件缺失或内容不一致。
- v360 decision record 被篡改成执行授权。
- v361 自己越界启动上游、读密钥、解析 endpoint 或打开连接。

## fail closed

测试里有空 archive root 场景。如果 `d/360` 缺失，v361 会变成：

```text
archiveVerificationState=blocked
archiveVerificationDecision=blocked
readyForNodeV362SandboxHandleReviewPrerequisiteClosureReview=false
```

并产生：

```text
ARCHIVE_FILES_MISSING
ARCHIVE_JSON_UNREADABLE
ARCHIVE_JSON_NOT_READY
```

这说明 v361 不会在证据缺失时继续推进后续 prerequisite closure review。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification.test.ts
```

覆盖三种场景：

- 正常读取 v360 归档，33/33 checks passed。
- 空归档目录 fail closed。
- audit route 同时输出 JSON 和 Markdown。

## 运行结果

```text
typecheck: passed
focused test: 3 passed
related group: 3 files / 9 tests passed
build: passed
HTTP smoke: 200 JSON + 200 Markdown
Playwright MCP screenshot: captured
```

## 结论

v361 的重点不是推进新权限，而是把 v360 decision record 固化成可复核证据。它把下一步限定为 Node v362 prerequisite closure review，并继续关闭 credential value、raw endpoint URL、provider/client、runtime shell、managed audit HTTP/TCP 和上游写入。
