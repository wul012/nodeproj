# 337：Node v332 disabled design draft candidate archive verification 代码讲解

## 一、版本目标

Node v331 已经回答“是否值得进入 disabled design draft candidate 的归档验证”。v332 不继续写设计稿，而是先做归档验收：

```text
验证 v331 的归档证据是否稳定到足以支撑下一版 outline intake。
```

它仍然不是 runtime shell 实现，也不是 design draft outline。

## 二、类型层继续关死危险能力

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationTypes.ts
```

主 Profile 里把危险能力继续固定为 `false`：

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
readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: boolean;
```

它表示下一版可以做 outline intake，不表示现在可以写实现。

## 三、服务入口如何消费 v331

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification(...)
```

它先调用：

```ts
createSourceNodeV331(...)
```

而 `createSourceNodeV331(...)` 复用：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview(...)
```

这说明 v332 不重算 Java / mini-kv 上游，只消费 v331 的 candidate review 结果。

## 四、归档引用

`createArchiveReferences(...)` 固定检查 v331 的 11 个归档引用：

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

这些路径都指向已提交的 v331 归档，例如：

```text
d/331/evidence/disabled-runtime-shell-design-draft-candidate-review-v331-http.json
d/331/图片/disabled-runtime-shell-design-draft-candidate-review-v331.png
代码讲解记录_生产雏形阶段2/336-disabled-runtime-shell-design-draft-candidate-review-v331.md
```

## 五、BOM 兼容

v331 的 JSON 归档由 PowerShell 写入，文件开头可能带 UTF-8 BOM。v332 的 `readTextFile(...)` 做了兼容：

```ts
return readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
```

这个处理很重要：否则 `JSON.parse(...)` 会失败，archive verification 会误判 JSON / smoke summary 缺失。

## 六、archive verification record

`createArchiveVerification(...)` 生成：

```ts
verificationMode: "read-only-v331-archive-verification"
decision: "proceed-to-disabled-design-draft-outline-intake"
archiveRoot: "d/331"
rerunsSourceEndpoint: false
opensDisabledDesignDraftOutlineNow: false
implementsRuntimeShell: false
invokesRuntimeShell: false
requestsJavaMiniKvEcho: false
readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: true
```

这里最关键的是 `rerunsSourceEndpoint=false` 和 `opensDisabledDesignDraftOutlineNow=false`：v332 只验归档，不重新制造新的运行时动作。

## 七、检查项

`createChecks(...)` 覆盖 29 个检查，包括：

```ts
sourceNodeV331Ready
sourceNodeV331RequiresArchiveVerification
archiveFilesPresent
jsonEvidenceMatchesSourceDigest
jsonEvidenceKeepsCandidateReviewReady
markdownEvidenceRecordsCandidateBoundary
smokeSummaryRecordsFallbackAndRouteSuccess
screenshotAndHtmlPresent
explanationRecordsValidationAndScreenshotFallback
codeWalkthroughPresent
planIndexReferencesV331AndV332
archiveVerificationDoesNotRerunEndpoint
noRuntimeDesignDraftCreated
noRuntimeImplementationCreated
noCredentialValueRead
noRawEndpointUrlParsed
noProviderClientInstantiated
noExternalRequestSent
noJavaOrMiniKvWrites
noUpstreamEchoRequested
```

如果 v331 归档缺失、digest 漂移、配置打开 upstream probes/actions，v332 都会 fail closed。

## 八、路由

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-archive-verification
```

它同时支持 JSON 和 Markdown 输出。

## 九、测试

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification.test.ts
```

覆盖：

1. v331 archive 可用时，只打开 Node v333 outline intake；
2. v331 archive 不可用时 fail closed；
3. upstream probes/actions 开启时 blocked；
4. JSON / Markdown route 输出正常。

## 十、验证结论

本版验证：

```text
npm.cmd run typecheck：通过
focused vitest：2 files / 8 tests 通过
full vitest stable mode：265 files / 924 tests 通过（--maxWorkers=2）
npm.cmd run build：通过
HTTP smoke：JSON 200，Markdown 200，29/29 checks，11/11 archive files，0 blockers
```

v332 的价值是防止从 v331 的“候选评审”直接跳到“设计稿/实现”。它先把 v331 归档证据验稳，再把下一步限制为 Node v333 的 outline intake。
