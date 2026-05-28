# 367 - Node v362 sandbox handle review prerequisite closure review 代码讲解

## 版本定位

v362 接在 v361 之后。v361 已证明 v360 decision record 归档完整；v362 只做 prerequisite closure review，确认 sandbox handle review 这条非执行前置链条是否可以关闭。

这版不启动 Java / mini-kv，不发 managed audit HTTP/TCP，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，也不实现 runtime shell。

## 路由入口

路由注册在 `src/routes/auditJsonMarkdownRoutes.ts`：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review",
  (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview({
    config: deps.config,
  }),
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewMarkdown,
)
```

它继续走统一 JSON / Markdown route helper，避免在 route 文件里重复渲染分支。

## Source Node v361

主服务在：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview.ts
```

入口函数消费 v361 archive verification profile：

```ts
const sourceProfile =
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerification({
    config: input.config,
    archiveRoot: input.sourceArchiveRoot,
  });
const sourceNodeV361 = createSourceNodeV361(sourceProfile);
```

`createSourceNodeV361()` 只提取 v361 的摘要：

```ts
archiveVerificationState
archiveVerificationDecision
readyForArchiveVerification
readyForPrerequisiteClosureReview
archiveVerificationDigest
sourceDecisionDigest
archiveFileCount
presentArchiveFileCount
sourceCheckCount
sourcePassedCheckCount
```

这让 v362 只依赖 v361 的归档结论，不回头重建 v360 decision record。

## Closure items

`createClosureReview()` 定义 4 个完成项：

```text
managed-audit-disabled-read-only-integration
sandbox-handle-review-prerequisite-intake
sandbox-handle-review-contract-decision
sandbox-handle-review-packet-gate-decision-record
```

前三个来自 v351-v357 的历史链路，最后一个来自 v361 对 v360 decision record 的归档验证：

```ts
completedCurrent(source)
```

每个 closure item 都明确关闭危险能力：

```ts
opensCredentialValue: false
opensRawEndpointUrl: false
opensProviderClient: false
opensRuntimeShell: false
opensManagedAuditConnection: false
mutatesUpstreamState: false
```

这比只写一句“安全”更稳，因为测试可以逐项断言。

## Closure review record

`createClosureReview()` 生成稳定 digest：

```ts
reviewMode: "sandbox-handle-review-prerequisite-closure-review-only"
sourceSpan: "Node v361"
sourceArchiveVerificationDigest: source.archiveVerificationDigest
sourceDecisionDigest: source.sourceDecisionDigest
completedClosureItemCount: 4
remainingClosureItemCount: 0
closureDecision: "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review"
nextNodeVersionSuggested: "Node v363"
nextJavaVersionRequested: null
nextMiniKvVersionRequested: null
allowsCredentialValue: false
allowsRawEndpointUrl: false
allowsProviderClient: false
allowsRuntimeShell: false
allowsManagedAuditConnection: false
allowsUpstreamMutation: false
```

注意这里的 close 只表示非执行前置链条可以关闭，不表示生产连接可打开。

## Checks

`createChecks()` 把 closure review 拆成 27 个检查：

```ts
sourceNodeV361Ready
sourceArchiveVerificationComplete
sourceDecisionAllowsClosureReview
sourceArchiveFilesComplete
sourceChecksAllPassed
sourcePacketGateShapePreserved
sourceKeepsCredentialAndEndpointClosed
sourceKeepsRuntimeAndConnectionClosed
sourceKeepsUpstreamsClosed
closureItemsComplete
noRemainingClosureItems
closureDigestStable
closureDecisionLimitedToNonExecutableReview
nextStepIsArchiveVerification
noCredentialValueRequestedOrRead
noRawEndpointRequestedOrParsed
noProviderClientInstantiated
noRuntimeShellImplementedOrInvoked
noManagedAuditHttpTcp
noUpstreamServiceStarted
noUpstreamMutation
noJavaMiniKvEchoRequired
upstreamProbesStillDisabled
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
readyForSandboxHandleReviewPrerequisiteClosureReview
```

这些检查确保 v362 只是关闭 prerequisite review 链，不会偷开真实连接或上游写入。

## fail closed

测试里有空 archive root 场景。如果 v361 evidence 不存在，v362 会变成：

```text
reviewState=blocked
prerequisiteClosureDecision=blocked
readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification=false
```

并出现：

```text
NODE_V361_NOT_READY
NODE_V361_ARCHIVE_NOT_COMPLETE
SOURCE_ARCHIVE_FILES_INCOMPLETE
```

这说明 v362 在上游归档缺失时不会继续推进。

## 测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview.test.ts
```

覆盖三种场景：

- 正常消费 v361，27/27 checks passed。
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

v362 已关闭 sandbox handle review 的非执行前置链条，并把下一步限定为 Node v363 archive verification。credential value、raw endpoint URL、provider/client、runtime shell、managed audit HTTP/TCP、Java 写入和 mini-kv write/admin 仍全部关闭。
