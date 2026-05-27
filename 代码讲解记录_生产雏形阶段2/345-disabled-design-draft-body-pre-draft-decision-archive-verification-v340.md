# 345：Node v340 disabled design draft body pre-draft decision archive verification 代码讲解

## 一、版本目标

Node v339 已经记录了 `pre-draft decision`，但只是运行时接口和归档证据中的一个版本结果。v340 要做的是把这个结果固化成可追溯的 archive verification：

```text
验证 v339 归档完整后，才允许下一版进入 body preparation plan。
```

v340 不是 body draft，也不是 runtime shell implementation。

## 二、类型层边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationTypes.ts
```

核心字段：

```ts
activeNodeVersion: "Node v340";
sourceNodeVersion: "Node v339";
readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: boolean;
readyForDisabledRuntimeShellDesignDraft: false;
readyForRuntimeShellImplementation: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
```

这些字段说明 v340 只把下一步推进到 `Node v341 preparation plan`，不能直接写 body draft，更不能打开 runtime 或真实连接。

## 三、服务入口

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification(...)
```

执行顺序：

1. `createSourceNodeV339(...)` 读取 v339 live profile。
2. `createArchiveReferences(...)` 枚举 `d/339` 归档文件。
3. `readParsedArchiveEvidence(...)` 读取 JSON、Markdown、smoke、说明和 plan。
4. `createChecks(...)` 验证归档和边界。
5. `collectProductionBlockers(...)` 把失败项转成 blocker。
6. 返回 v340 profile。

## 四、读取 v339 源证据

`createSourceNodeV339(...)` 调用：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision(...)
```

它只投影 v340 需要的字段：

```ts
preDraftDecisionState
preDraftDecision
readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification
decisionDigest
sourceArchiveVerificationDigest
sourceReviewDigest
decisionQuestionCount
preparationControlCount
stopConditionCount
```

这样 v340 不重新推导 v338/v337 的业务结论，只验证 v339 是否已经形成稳定证据。

## 五、归档文件清单

`createArchiveReferences(...)` 锁定 `d/339`：

```ts
const ARCHIVE_ROOT = "d/339";
const V339_BASENAME = "disabled-design-draft-body-pre-draft-decision-v339";
```

被检查的文件包括：

```text
http.json
http.md
smoke-summary.json
snapshot.md
browser-snapshot.md
html
png
解释 md
代码讲解 md
active plan
plans index
```

这保持了以前 archive verification 版本的证据模式。

## 六、检查逻辑

`createChecks(...)` 的关键检查是：

```ts
sourceNodeV339Ready
sourceNodeV339RequiresArchiveVerification
archiveFilesPresent
jsonEvidenceMatchesSourceDigest
jsonEvidenceKeepsPreDraftDecisionReady
markdownEvidenceRecordsPreDraftBoundary
smokeSummaryRecordsFallbackAndRouteSuccess
planIndexReferencesV339AndV340
noBodyDraftWritten
noRuntimeImplementationCreated
noUpstreamEchoRequested
```

其中 `jsonEvidenceMatchesSourceDigest` 会比较：

```ts
preDraftDecisionRecord.decisionDigest
```

这保证归档 JSON 不是“看起来像”，而是和 live source 的核心 digest 对齐。

## 七、边界没有打开

v340 显式保持：

```ts
writesBodyDraftNow: false
opensDisabledDesignDraftBodyNow: false
implementsRuntimeShell: false
invokesRuntimeShell: false
requestsJavaMiniKvEcho: false
```

同时 profile 顶层也保持：

```ts
executionAllowed: false
credentialValueRead: false
rawEndpointUrlParsed: false
javaSqlExecutionAllowed: false
miniKvWriteCommandAllowed: false
automaticUpstreamStart: false
```

这就是本版和真正 runtime / body draft 的分界线。

## 八、路由接入

路由文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 endpoint：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification
```

继续使用 `auditJsonMarkdownRoute(...)`，所以 JSON 和 `?format=markdown` 输出保持一致。

## 九、测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification.test.ts
```

覆盖四个场景：

1. v339 archive 完整时，v340 ready，并只打开 v341 preparation plan。
2. `d/339` archive 不存在时 fail closed。
3. upstream probes/actions 打开时 blocked。
4. route 同时输出 JSON 和 Markdown。

## 十、版本结论

v340 只验证 v339 归档，不写 body，不实现 runtime。下一步只能是 Node v341 body preparation plan，并且仍要保持所有真实连接和写操作关闭。
