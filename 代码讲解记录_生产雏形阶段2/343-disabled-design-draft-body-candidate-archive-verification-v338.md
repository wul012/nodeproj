# 343：Node v338 disabled design draft body candidate archive verification 代码讲解

## 一、版本目标

Node v337 已经完成 body candidate review。v338 不继续写正文，而是把 v337 的证据先归档验证：

```text
先确认 v337 证据稳定，再允许 v339 做 pre-draft decision。
```

这延续了最近几版的节奏：review 和 archive verification 分开，避免把“判断是否可推进”和“实际写正文/实现 runtime”混在同一版里。

## 二、类型层的边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationTypes.ts
```

这里把 v338 的权限边界写成字面量：

```ts
activeNodeVersion: "Node v338";
sourceNodeVersion: "Node v337";
readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: boolean;
readyForDisabledRuntimeShellDesignDraft: false;
readyForRuntimeShellImplementation: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
```

也就是说，v338 只能把状态推进到 v339 pre-draft decision，不能直接写 body，也不能实现或调用 runtime shell。

## 三、服务入口

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification.ts
```

入口函数是：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification(...)
```

它的流程很明确：

1. 读取 Node v337 body candidate review。
2. 收集 `d/337` 归档文件引用。
3. 读取 v337 的 JSON / Markdown / smoke summary / explanation / code walkthrough / plan index。
4. 生成 archive verification record。
5. 计算 checks、blockers、summary 和 nextActions。

核心返回值：

```ts
archiveVerificationState: ready ? "disabled-design-draft-body-candidate-archive-verified" : "blocked",
archiveVerificationDecision: ready ? "body-candidate-archive-verified-before-design-body" : "blocked",
readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: ready,
```

## 四、读取 v337 源证据

`createSourceNodeV337(...)` 调用 v337 服务：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview(...)
```

然后只投影必要字段：

```ts
bodyCandidateReviewState
bodyCandidateReviewDecision
reviewDigest
sourceArchiveVerificationDigest
sourceBodyIntakeDigest
sourceCheckCount
sourcePassedCheckCount
reviewQuestionCount
answeredReviewQuestionCount
stopConditionCount
```

这让 v338 的判断建立在 v337 的稳定输出上，而不是重新解释 v336 或 v335 的所有细节。

## 五、归档文件检查

`createArchiveReferences(...)` 固定检查 `d/337`：

```ts
jsonEvidence
markdownEvidence
smokeSummary
routeSnapshot
browserSnapshot
htmlArchive
screenshot
explanation
codeWalkthrough
activePlan
plansIndex
```

这些文件合计 11 项，对应每版归档闭环里的核心证据：接口输出、页面、截图、说明、代码讲解、计划索引。

## 六、digest 对齐

v338 不只看文件存在，还检查 v337 的 review digest：

```ts
const jsonDigest = valueAt(archive.json, "bodyCandidateReview", "reviewDigest");
jsonEvidenceMatchesSourceDigest: jsonDigest === sourceNodeV337.reviewDigest,
```

这一步保证 `d/337/evidence/*.json` 不是随便存在，而是与当前 v337 服务输出仍然一致。

## 七、副作用边界

`createChecks(...)` 继续把所有风险动作关死：

```ts
noBodyDraftCreated
noRuntimeImplementationCreated
noRuntimeInvocationAllowed
noCredentialValueRead
noRawEndpointUrlParsed
noProviderClientInstantiated
noExternalRequestSent
noJavaOrMiniKvWrites
noUpstreamEchoRequested
```

这说明 v338 只是归档验证，不是打开真实 runtime 的入口。

## 八、路由接入

路由文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```ts
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-archive-verification
```

它沿用 `auditJsonMarkdownRoute(...)`，所以同一个 endpoint 支持 JSON 和 `?format=markdown`。

## 九、测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification.test.ts
```

覆盖四个场景：

1. v337 归档完整时 ready。
2. v337 归档缺失时 fail closed。
3. `UPSTREAM_PROBES_ENABLED` 或 `UPSTREAM_ACTIONS_ENABLED` 打开时 blocked。
4. audit route 同时输出 JSON 和 Markdown。

其中 fail closed 测试使用空临时目录模拟归档缺失，避免真实删除 `d/337`。

## 十、版本结论

v338 的价值是把 v337 的 candidate review 固化为可验证归档，避免下一步直接进入正文或 runtime。

下一步只能是 Node v339 pre-draft decision；是否需要 Java / mini-kv 并行，要看 v339 是否新增非 secret handoff 字段。
