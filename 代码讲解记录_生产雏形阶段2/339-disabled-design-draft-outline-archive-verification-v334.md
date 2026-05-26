# 339：Node v334 disabled design draft outline archive verification 代码讲解

## 一、版本目标

Node v333 已经完成 outline section catalog，但 v333 只是“入口记录”。v334 的目标是把 v333 的归档证据验稳：

```text
route / Markdown / JSON digest / smoke summary / HTML / screenshot / explanation / code walkthrough / plan index
```

它仍然不是 design draft body，也不是 runtime shell implementation。

## 二、类型层的边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationTypes.ts
```

主 Profile 固定危险能力为 `false`：

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
readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake: boolean;
```

它只表示“可以进入下一版 body intake / readiness step”，不代表可以实现 runtime。

## 三、服务入口如何消费 v333

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification(...)
```

它先通过：

```ts
createSourceNodeV333(...)
```

调用：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake(...)
```

因此 v334 消费的是 Node v333 的只读 profile，不启动 Java，不启动 mini-kv，也不访问真实 managed audit。

## 四、归档文件清单

`createArchiveReferences(...)` 固定检查 v333 的 11 个归档引用：

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

路径集中指向：

```text
d/333
代码讲解记录_生产雏形阶段2/338-disabled-design-draft-outline-intake-v333.md
docs/plans2/v332-post-disabled-design-draft-candidate-archive-verification-roadmap.md
docs/plans2/README.md
```

读取 JSON 时使用：

```ts
readFileSync(..., "utf8").replace(/^\uFEFF/, "")
```

这样可以兼容 Windows 上偶发的 UTF-8 BOM。

另外，v334 对 v333 JSON digest 做了历史归档友好的处理：优先比较 live source digest；如果 v334 续写计划后导致 live source 因计划索引变化而重算漂移，则用归档 JSON 内的 `profileVersion / sourceArchiveVerificationDigest / necessityProof / outlineSections / stopConditions / ready` 重新计算 `outlineIntake.intakeDigest`，确认归档自身仍然自洽。这样不会因为后续计划维护误伤历史归档验收。

## 五、archive verification record

`createArchiveVerification(...)` 生成：

```ts
verificationMode: "read-only-v333-outline-intake-archive-verification"
sourceSpan: "Node v333 disabled runtime shell design draft outline intake archive"
decision: "proceed-to-disabled-design-draft-body-intake"
rerunsSourceEndpoint: false
opensDisabledDesignDraftBodyNow: false
implementsRuntimeShell: false
invokesRuntimeShell: false
requestsJavaMiniKvEcho: false
readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake: true
```

这里最重要的是 `rerunsSourceEndpoint=false` 和 `opensDisabledDesignDraftBodyNow=false`：v334 不重跑 v333 的外部流程，也不直接写 body。

## 六、检查项

`createChecks(...)` 覆盖 29 个检查，包括：

```ts
sourceNodeV333Ready
sourceNodeV333RequiresArchiveVerification
sourceNodeV333KeepsDesignDraftClosed
sourceNodeV333KeepsRuntimeAndSideEffectsClosed
archiveFilesPresent
jsonEvidenceMatchesSourceDigest
jsonEvidenceKeepsOutlineIntakeReady
markdownEvidenceRecordsOutlineBoundary
smokeSummaryRecordsFallbackAndRouteSuccess
screenshotAndHtmlPresent
explanationRecordsValidationAndScreenshotFallback
codeWalkthroughPresent
planIndexReferencesV333AndV334
noOutlineBodyCreated
noRuntimeImplementationCreated
noCredentialValueRead
noRawEndpointUrlParsed
noProviderClientInstantiated
noExternalRequestSent
noJavaOrMiniKvWrites
noUpstreamEchoRequested
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

如果 v333 归档缺失、digest 漂移、或者 upstream probes/actions 被打开，v334 会 fail closed。

## 七、路由和测试

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-archive-verification
```

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification.test.ts
```

覆盖：

1. v333 archive 完整时，只打开 Node v335 body intake；
2. v333 archive 缺失时 fail closed；
3. upstream probes/actions 开启时 blocked；
4. JSON / Markdown route 输出正常。

## 八、验证结论

本版验证：

```text
npm.cmd run typecheck：通过
focused vitest：2 files / 8 tests 通过
npm.cmd run build：通过
full vitest stable mode：267 files / 932 tests 通过（--maxWorkers=2）
HTTP smoke：JSON 200，Markdown 200，29/29 checks，11/11 archive files，0 blockers
```

v334 的价值是把“v333 可以进入 v334 验收”真正固化成可归档证据。它只给 v335 body intake 开门，不给 runtime shell、provider/client、credential value、raw endpoint、HTTP/TCP 或 Java/mini-kv 写操作开门。
