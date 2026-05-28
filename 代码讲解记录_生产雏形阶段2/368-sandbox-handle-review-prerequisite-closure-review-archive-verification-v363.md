# 368 - Node v363 sandbox handle review prerequisite closure review archive verification 代码讲解

## 版本定位

v363 接在 v362 后面。v362 已把 sandbox handle review 的非执行前置链条收口；v363 只验证这份收口归档是否完整。

这一版仍然不启动 Java / mini-kv，不发 managed audit HTTP/TCP，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，也不实现 runtime shell。

和前几版不同的是，v363 明确把下一步引向 `minimal read-only integration regular gate`，避免继续堆 archive verification / prerequisite closure。

## 路由入口

路由注册在 `src/routes/auditJsonMarkdownRoutes.ts`：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMarkdown,
)
```

它继续走统一 JSON / Markdown route helper，说明 v363 只是一个可读报告入口，不是执行入口。

## Archive references

主服务在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification.ts
```

`createArchiveReferences()` 固定读取 `d/362` 的 11 类归档：

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

这让 v363 检查的是已经落盘的归档证据，而不是重新生成 v362 业务逻辑。

## Source Node v362

`createSourceNodeV362()` 从 v362 JSON 中提取核心字段：

```ts
reviewState
prerequisiteClosureDecision
readyForClosureReview
readyForNodeV363ArchiveVerification
reviewDigest
sourceArchiveVerificationDigest
sourceDecisionDigest
completedClosureItemCount
remainingClosureItemCount
checkCount
passedCheckCount
```

这一步验证 v362 的 closure review 不是口头说明，而是有稳定 digest 和计数证据。

## Archive verification record

`createArchiveVerification()` 生成 v363 自己的 archive verification record：

```ts
verificationMode: "sandbox-handle-review-prerequisite-closure-review-archive-verification"
sourceSpan: "Node v362 sandbox handle review prerequisite closure review"
archiveRoot: "d/362"
archiveVerificationDecision: "archive-sandbox-handle-review-prerequisite-closure-review"
verifiesJsonMarkdownAndSummary: true
verifiesScreenshotExplanationAndWalkthrough: true
verifiesPlanAndArchiveIndexes: true
verifiesClosureItemsAndBoundaryControls: true
rerunsLiveProbe: false
startsUpstreamServices: false
writesUpstreamState: false
opensManagedAuditConnection: false
requestsJavaMiniKvEcho: false
nextNodeVersionSuggested: "Node v364"
```

注意 `nextNodeVersionSuggested` 只给版本号，真正的下一步语义放在 profile 字段和 plan 里：Node v364 应固化 v349 的最小只读联调门禁。

## Checks

`createChecks()` 把 v363 拆成 33 个检查。重点包括：

```ts
archiveFilesPresent
jsonReadyForV363Verification
closureItemsRecordedAndClosed
allChecksPassedInSourceClosureReview
summaryMatchesJson
markdownRecordsClosureItemsAndBoundaries
sourcePlanPointsToV363
planIndexReferencesV362AndV363
routeRecordedInArchive
noManagedAuditConnection
noCredentialValueRequestedOrRead
noRawEndpointUrlRequestedOrParsed
noProviderClientInstantiated
noRuntimeShellImplementedOrInvoked
noJavaMiniKvEchoRequired
```

这些检查把归档完整性和安全边界放在同一个报告里，避免“归档有了，但边界没锁住”。

## Renderer

Markdown 渲染在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationRenderer.ts
```

它输出：

```text
Source Node v362
Archive Verification
Archive References
Checks
Summary
Production Blockers
Warnings
Recommendations
Next Actions
```

其中首页直接显示：

```text
Ready for v364 minimal read-only integration regular gate: true
```

这是本版对后续方向的明确约束。

## 测试覆盖

测试在：

```text
test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification.test.ts
```

覆盖三件事：

1. 正常读取 `d/362`，33/33 checks passed，并准备 v364 regular gate。
2. 空归档目录时 fail closed，不启动上游、不连接 managed audit。
3. audit route table 能同时输出 JSON 和 Markdown。

## 本版结论

v363 是必要的归档收口版，但不应该继续扩展成新的治理链。下一步更合理的是把 v349 已跑通的最小只读联调固化成常规门禁，让真实只读 smoke 成为后续推进的稳定入口。
