# 341：Node v336 disabled design draft body intake archive verification 代码讲解

## 一、版本目标

Node v335 已经把 body intake / readiness 结构建好。v336 继续推进，但只做一件事：

```text
验证 v335 的归档证据是否完整、自洽、可追溯。
```

它不是 body draft，更不是 runtime shell implementation。

## 二、类型层的边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationTypes.ts
```

这里把 v336 的边界写死：

```ts
archiveVerificationState: "disabled-design-draft-body-intake-archive-verified" | "blocked";
archiveVerificationDecision: "proceed-to-disabled-design-draft-body-candidate-review" | "blocked";
readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview: boolean;
readyForDisabledRuntimeShellDesignDraft: false;
readyForRuntimeShellImplementation: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
```

这意味着 v336 只能把状态推进到 v337 candidate review，不能越过 candidate review 去写正文或实现 runtime。

## 三、服务入口

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification.ts
```

入口在第 48 行：

```ts
export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification(...)
```

这个函数做四步：

1. 读取 Node v335 source profile。
2. 收集 `d/335` 归档文件引用。
3. 解析归档 JSON / Markdown / smoke / explanation / code walkthrough / plan。
4. 生成 checks、blockers、summary 和下一步建议。

核心决策在返回对象里：

```ts
archiveVerificationState: ready ? "disabled-design-draft-body-intake-archive-verified" : "blocked",
archiveVerificationDecision: ready ? "proceed-to-disabled-design-draft-body-candidate-review" : "blocked",
readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview: ready,
```

## 四、读取 v335 源证据

第 158 行的 `createSourceNodeV335(...)` 调用了 v335 服务：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake(...)
```

它不是只看文件名，而是读取 v335 的真实 profile 字段：

```ts
bodyIntakeState
bodyIntakeDecision
readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification
bodyIntakeDigest
sourceCheckCount
sourcePassedCheckCount
bodySectionCount
evidenceItemCount
stopConditionCount
```

因此如果 v335 的 readiness、digest、section/evidence/stop-condition 数量漂移，v336 会 fail closed。

## 五、归档文件清单

第 220 行的 `createArchiveReferences(...)` 固定检查 `d/335`：

```ts
d/335/evidence/disabled-design-draft-body-intake-v335-http.json
d/335/evidence/disabled-design-draft-body-intake-v335-http.md
d/335/evidence/disabled-design-draft-body-intake-v335-smoke-summary.json
d/335/evidence/disabled-design-draft-body-intake-v335-snapshot.md
d/335/evidence/disabled-design-draft-body-intake-v335-browser-snapshot.md
d/335/disabled-design-draft-body-intake-v335.html
d/335/图片/disabled-design-draft-body-intake-v335.png
d/335/解释/disabled-design-draft-body-intake-v335.md
代码讲解记录_生产雏形阶段2/340-disabled-design-draft-body-intake-v335.md
docs/plans2/v334-post-disabled-design-draft-outline-archive-verification-roadmap.md
docs/plans2/README.md
```

这里检查的是已经提交过的 v335 证据，不重新执行 v335 route。

## 六、digest 自洽

第 564 行的 `archiveJsonBodyIntakeDigestMatchesPayload(...)` 处理历史归档可能和 live source digest 不完全同步的问题：

```ts
const payload = {
  profileVersion,
  sourceArchiveVerificationDigest,
  necessityProof,
  sections,
  evidenceCatalog,
  stopConditions,
  ready,
};
return sha256StableJson(payload) === digest;
```

所以 v336 不只做“文件存在”，还会重算 archived payload digest，证明历史归档本身可验证。

## 七、核心检查

第 330 行的 `createChecks(...)` 是本版质量门：

```ts
sourceNodeV335Ready
sourceNodeV335RequiresArchiveVerification
sourceNodeV335KeepsDesignDraftClosed
sourceNodeV335KeepsRuntimeAndSideEffectsClosed
archiveFilesPresent
jsonEvidenceMatchesSourceDigest
smokeSummaryRecordsFallbackAndRouteSuccess
planIndexReferencesV335AndV336
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

其中最关键的是：

```ts
noBodyDraftCreated: !verification.opensDisabledDesignDraftBodyNow
noRuntimeImplementationCreated: !verification.implementsRuntimeShell
noRuntimeInvocationAllowed: !verification.invokesRuntimeShell
```

这三条确保 v336 不会借“验证归档”的名义偷偷推进 runtime。

## 八、Markdown renderer

渲染器文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationRenderer.ts
```

第 7 行的 renderer 输出这些核心段落：

```text
Source Node v335
Archive Verification
Archive References
Checks
Summary
Production Blockers
Warnings
Recommendations
Next Actions
```

这和 JSON profile 对齐，方便人工读 Markdown，也方便 smoke 归档。

## 九、路由挂载

路由文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

第 1030 行新增 route：

```ts
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake-archive-verification
```

这个 route 同时支持：

```text
JSON
?format=markdown
```

## 十、测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification.test.ts
```

本版覆盖四个场景：

1. v335 archive 完整时，v336 verified，并只打开 Node v337 candidate review。
2. `archiveRoot` 缺失时 fail closed。
3. `UPSTREAM_PROBES_ENABLED=true` 或 `UPSTREAM_ACTIONS_ENABLED=true` 时 fail closed。
4. audit route 同时输出 JSON 和 Markdown。

关键断言：

```ts
readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview: true
readyForDisabledRuntimeShellDesignDraft: false
executionAllowed: false
requestsJavaMiniKvEcho: false
```

## 十一、验证结果

本版验证：

- `npm.cmd run typecheck`：通过
- focused vitest：2 files / 8 tests 通过
- `npm.cmd run build`：通过
- HTTP smoke：JSON 200，Markdown 200
- v336 smoke checks：29/29 通过
- full vitest stable mode：269 files / 940 tests 通过（按分组完整覆盖全部测试文件，`--maxWorkers=2`）

单个 full vitest 命令会超过外层工具预算；本轮改用分组方式覆盖全部 269 个测试文件，没有断言失败。

## 十二、收口判断

v336 合格的原因是：

```text
它验证了 v335 归档，但没有新增可执行能力。
```

下一步 Node v337 只能做 `body candidate review`。如果 v337 仍然不新增非 secret handoff 字段，就不需要 Java / mini-kv 跟进。
