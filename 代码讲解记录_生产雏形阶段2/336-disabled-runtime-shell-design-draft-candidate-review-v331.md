# 336：Node v331 disabled runtime shell design draft candidate review 代码讲解

## 一、版本目标

Node v330 已经把 Node v329、Java v151/v152、mini-kv v143 的 input-hardening 证据对齐。v331 继续往前，但只前进一步：

```text
判断是否值得把 disabled runtime shell design draft candidate 归档验证。
```

它不是 design draft，也不是 runtime shell 实现。

## 二、类型层的边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReviewTypes.ts
```

主 Profile 里继续固定危险能力：

```ts
readyForDisabledRuntimeShellDesignDraft: false;
readyForDisabledRuntimeShellDesignDraftOutline: false;
readyForRuntimeShellImplementation: false;
readyForRuntimeShellInvocation: false;
executionAllowed: false;
connectsManagedAudit: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
javaSqlExecutionAllowed: false;
miniKvWriteCommandAllowed: false;
automaticUpstreamStart: false;
```

本版唯一正向输出是：

```ts
readyForNodeV332ArchiveVerification: boolean;
```

这表示下一版可以验证归档，而不是现在可以写设计稿。

## 三、服务入口如何消费 v330

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview(...)
```

它通过：

```ts
createSourceNodeV330(...)
```

复用：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview(...)
```

也就是说，v331 不重算 Java/mini-kv 证据，只消费 v330 的 hardening review 结果。

## 四、必要性证明

`createNecessityProof()` 明确说明为什么不能复用 v330：

```ts
Node v330 proves upstream input-hardening alignment,
but it intentionally does not define review questions,
stop conditions, or archive gates...
```

也说明为什么不能复用旧的 Node v295 design review：v295 发生在 final prerequisite closure 和 Java v151/v152、mini-kv v143 之前，证据链已经不同。

## 五、review questions

`createReviewQuestions()` 固定 5 个问题：

```ts
why-design-draft-candidate-now
input-hardening-aligned
candidate-scope-bounded
archive-before-outline
no-runtime-side-effects
```

这些问题把 v331 的范围压住：只回答“是否值得候选评审”，不写 outline，不实现 shell。

## 六、stop conditions

`createStopConditions()` 固定 8 个暂停条件：

- credential value
- raw endpoint URL
- provider/client
- HTTP/TCP
- Java SQL / deployment / rollback / ledger / schema
- mini-kv LOAD / COMPACT / RESTORE / SETNXEX / write
- automatic upstream start
- 试图跳过 v332 直接写 design draft

最后一条是 v331 新增的关键边界：

```ts
DIRECT_DESIGN_DRAFT_REQUESTED
```

它保证下一步先做 archive verification。

## 七、candidate review record

`createCandidateReview(...)` 生成：

```ts
recordMode: "disabled-runtime-shell-design-draft-candidate-review-only"
decision: "archive-before-disabled-design-draft-outline"
requiresArchiveVerificationBeforeDesignDraft: true
requestsJavaMiniKvEcho: false
readyForNodeV332ArchiveVerification: true
```

其中 `requestsJavaMiniKvEcho=false` 很重要：v331 没有定义新的跨项目 contract 字段，所以不要求 Java / mini-kv 同步版本。

## 八、检查项

`createChecks(...)` 覆盖 22 个检查，包括：

```ts
sourceNodeV330Ready
sourceNodeV330AllowsCandidateReviewOnly
sourceNodeV330KeepsDesignDraftClosed
sourceNodeV330KeepsRuntimeAndSideEffectsClosed
necessityProofComplete
candidateReviewOnly
reviewQuestionsAnswered
archiveVerificationRequiredBeforeDesignDraft
noUpstreamEchoRequested
noRuntimeDesignDraftCreated
noRuntimeImplementationCreated
noCredentialValueRead
noProviderClientInstantiated
noExternalRequestSent
noJavaOrMiniKvWrites
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

如果 v330 blocked，或者配置打开了 upstream probes/actions，v331 会 fail closed。

## 九、路由和测试

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-review
```

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview.test.ts
```

覆盖：

1. v330 ready 时，只打开 Node v332 archive verification；
2. v330 source blocked 时 fail closed；
3. upstream probes/actions 开启时 blocked；
4. JSON / Markdown route 输出正常。

## 十、验证结论

本版验证：

```text
npm.cmd run typecheck：通过
focused vitest：2 files / 8 tests 通过
npm.cmd run build：通过
npm.cmd test 默认并发：22 个旧 route 测试超时，无断言失败
npm.cmd exec -- vitest run --testTimeout=180000 --maxWorkers=2：264 files / 920 tests 通过
HTTP smoke：JSON 200，Markdown 200，22/22 checks，0 blockers
```

v331 的价值是把“可以考虑设计稿”再压成一个可验证候选评审，并且要求 v332 先归档验证，避免从 input-hardening 对齐直接跳到实现。
