# 342：Node v337 disabled design draft body candidate review 代码讲解

## 一、版本目标

Node v336 已经把 v335 body intake 的归档证据验稳。v337 继续推进，但只做一件事：

```text
判断 disabled design draft body candidate 是否值得进入归档验证。
```

它不是 body draft，更不是 runtime shell implementation。

## 二、类型层的边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewTypes.ts
```

这里把 v337 的边界写死：

```ts
bodyCandidateReviewState: "disabled-runtime-shell-design-draft-body-candidate-review-ready" | "blocked";
bodyCandidateReviewDecision: "archive-before-disabled-design-draft-body" | "blocked";
readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: boolean;
readyForDisabledRuntimeShellDesignDraft: false;
readyForRuntimeShellImplementation: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
```

这意味着 v337 只能把状态推进到 v338 archive verification，不能越过归档验证去写正文或实现 runtime。

## 三、服务入口

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview.ts
```

入口在第 31 行：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview(...)
```

这个函数做五步：

1. 读取 Node v336 archive verification source profile。
2. 创建 necessity proof。
3. 创建 5 个 review questions。
4. 创建 8 个 stop conditions。
5. 生成 checks、blockers、summary 和下一步建议。

核心决策在返回对象里：

```ts
bodyCandidateReviewState: ready ? "disabled-runtime-shell-design-draft-body-candidate-review-ready" : "blocked",
bodyCandidateReviewDecision: ready ? bodyCandidateReview.decision : "blocked",
readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: ready,
```

## 四、读取 v336 源证据

第 146 行的 `createSourceNodeV336(...)` 调用了 v336 服务：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification(...)
```

它把 v336 的关键证据投影成本版 source reference：

```ts
archiveVerificationState
archiveVerificationDecision
readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview
archiveVerificationDigest
sourceBodyIntakeDigest
sourceCheckCount
sourcePassedCheckCount
archiveFileCount
presentArchiveFileCount
sourceBodySectionCount
sourceEvidenceItemCount
sourceStopConditionCount
```

因此 v337 不是凭计划文字推进，而是消费 v336 的实际 profile。

## 五、必要性证明

第 210 行的 `createNecessityProof()` 写明为什么不能复用 v336：

```ts
blockerResolved: "body-intake-archive-verified-but-body-candidate-not-reviewed",
consumer: "Node v338 body candidate archive verification",
whyV336CannotBeReused: "...",
whyThisIsNotDesignDraftBody: "...",
stopCondition: "...",
proofComplete: true,
```

这遵守了当前规则：新增 governance/design 链必须说明 blocker、消费者、为什么不能复用上版、何时停止。

## 六、review questions

第 224 行的 `createReviewQuestions()` 固定 5 个问题：

```text
why-body-candidate-review-now
body-intake-archive-stable
body-candidate-scope-bounded
archive-before-body-draft
no-runtime-side-effects
```

每个问题都要求 `answered: true`。这让 v337 的“审查”不是泛泛文档，而是结构化 gate。

## 七、candidate review record

第 282 行的 `createBodyCandidateReview(...)` 生成本版主记录：

```ts
recordMode: "disabled-runtime-shell-design-draft-body-candidate-review-only",
decision: "archive-before-disabled-design-draft-body",
candidateScope: "review-whether-disabled-design-draft-body-is-ready-for-archive-before-any-body-draft",
requiresArchiveVerificationBeforeBodyDraft: true,
requestsJavaMiniKvEcho: false,
readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: readyForNodeV338ArchiveVerification,
```

注意这里仍然没有打开 body draft：

```ts
allowsDisabledRuntimeShellDesignDraftNow: false,
allowsDisabledRuntimeShellDesignDraftOutlineNow: false,
allowsRuntimeShellImplementation: false,
allowsRuntimeShellInvocation: false,
allowsCredentialValueRead: false,
allowsRawEndpointUrlParse: false,
allowsExternalRequest: false,
```

## 八、核心检查

第 337 行的 `createChecks(...)` 是本版质量门：

```ts
sourceNodeV336Ready
sourceNodeV336AllowsBodyCandidateReviewOnly
sourceNodeV336KeepsDesignDraftClosed
sourceNodeV336KeepsRuntimeAndSideEffectsClosed
necessityProofComplete
bodyCandidateReviewOnly
reviewQuestionsAnswered
archiveVerificationRequiredBeforeBodyDraft
noUpstreamEchoRequested
noBodyDraftCreated
noRuntimeImplementationCreated
noRuntimeInvocationAllowed
```

其中最关键的是：

```ts
noBodyDraftCreated:
  !candidateReview.allowsDisabledRuntimeShellDesignDraftNow
  && !candidateReview.allowsDisabledRuntimeShellDesignDraftOutlineNow,
noRuntimeImplementationCreated: !candidateReview.allowsRuntimeShellImplementation,
noRuntimeInvocationAllowed: !candidateReview.allowsRuntimeShellInvocation,
```

这三条保证 v337 不会借“candidate review”提前写正文或实现 runtime。

## 九、blocker 收口

第 411 行的 `collectProductionBlockers(...)` 把失败原因收成明确 code：

```text
NODE_V336_NOT_READY
NODE_V336_DID_NOT_ALLOW_BODY_CANDIDATE_REVIEW
SOURCE_DESIGN_DRAFT_ALREADY_OPEN
SOURCE_SIDE_EFFECT_BOUNDARY_OPEN
NECESSITY_PROOF_INCOMPLETE
REVIEW_QUESTIONS_INCOMPLETE
ARCHIVE_VERIFICATION_NOT_REQUIRED
UNNEEDED_UPSTREAM_ECHO_REQUESTED
BODY_DRAFT_CREATED_TOO_EARLY
RUNTIME_IMPLEMENTATION_CREATED
PROVIDER_CLIENT_INSTANTIATED
UPSTREAM_PROBES_ENABLED
UPSTREAM_ACTIONS_ENABLED
```

这些 code 是本版 fail-closed 的审计面。

## 十、Markdown renderer

渲染器文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReviewRenderer.ts
```

第 6 行的 renderer 输出：

```text
Source Node v336
Necessity Proof
Body Candidate Review
Review Questions
Stop Conditions
Checks
Summary
Production Blockers
Warnings
Recommendations
Next Actions
```

这和 JSON profile 对齐，便于 HTTP smoke 归档和人工审查。

## 十一、路由挂载

路由文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

第 1038 行新增 route：

```ts
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-review
```

这个 route 同时支持：

```text
JSON
?format=markdown
```

## 十二、测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview.test.ts
```

本版覆盖四个场景：

1. v336 ready 时，v337 ready，并只打开 Node v338 archive verification。
2. `archiveRoot` 缺失时 fail closed。
3. `UPSTREAM_PROBES_ENABLED=true` 或 `UPSTREAM_ACTIONS_ENABLED=true` 时 fail closed。
4. audit route 同时输出 JSON 和 Markdown。

关键断言：

```ts
readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification: true
readyForDisabledRuntimeShellDesignDraft: false
executionAllowed: false
requestsJavaMiniKvEcho: false
```

## 十三、验证结果

本版验证：

- `npm.cmd run typecheck`：通过
- focused vitest：2 files / 8 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：JSON 200，Markdown 200
- v337 smoke checks：22/22 通过
- full vitest stable mode：270 files / 944 tests 通过（按分组完整覆盖全部测试文件，`--maxWorkers=2`）

单个 full vitest 命令会超过外层工具预算；本轮改用分组方式覆盖全部 270 个测试文件，没有断言失败。

## 十四、收口判断

v337 合格的原因是：

```text
它判断 body candidate 可以归档，但没有写 body draft。
```

下一步 Node v338 只能做 `body candidate review archive verification`。如果 v338 仍然不新增非 secret handoff 字段，就不需要 Java / mini-kv 跟进。
