# 338：Node v333 disabled design draft outline intake 代码讲解

## 一、版本目标

Node v332 已经把 v331 candidate review 的归档证据验稳。v333 继续推进，但只做一件事：

```text
定义未来 disabled runtime shell design draft outline 可以有哪些章节，以及每章的允许/禁止边界。
```

它不是 outline 正文，更不是 runtime shell implementation。

## 二、类型层的边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntakeTypes.ts
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
readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification: boolean;
```

这表示下一版可以验证 v333 归档，而不是现在可以写 outline 正文。

## 三、服务入口如何消费 v332

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake(...)
```

它先通过：

```ts
createSourceNodeV332(...)
```

消费：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification(...)
```

因此 v333 不重新访问 Java / mini-kv，也不重新打开真实上游，只消费 v332 的 archive verification 结果。

## 四、outline section catalog

v333 没有把 outline 内容散写在业务逻辑里，而是集中到：

```ts
const OUTLINE_SECTIONS
```

里面共有 8 个 section：

```text
purpose-and-non-goals
input-contract-boundaries
credential-handle-boundaries
endpoint-handle-boundaries
no-network-safety-boundaries
abort-rollback-boundaries
operator-approval-boundaries
verification-and-stop-conditions
```

每个 section 都有：

```ts
intakeQuestion
allowedContent
forbiddenContent
requiresFutureArchiveVerification: true
```

这就是本版的核心质量点：先建 section catalog，避免后续 outline 字段复制膨胀。

## 五、必要性证明

`createNecessityProof()` 明确说明：

```ts
blockerResolved: "candidate-archive-verified-but-outline-boundaries-not-yet-declared"
consumer: "Node v334 outline intake archive verification"
```

它还说明为什么不能复用 v332：v332 只验证 v331 归档，没有声明未来 outline 的 section catalog 和 forbidden content 规则。

## 六、outline intake record

`createOutlineIntake(...)` 生成：

```ts
recordMode: "disabled-runtime-shell-design-draft-outline-intake-only"
decision: "archive-disabled-outline-intake-before-drafting-outline"
outlineScope: "declare-non-executable-outline-sections-and-boundaries-only"
sectionCatalogVersion: "disabled-runtime-shell-design-draft-outline-section-catalog.v1"
requiresArchiveVerificationBeforeOutlineDraft: true
requestsJavaMiniKvEcho: false
readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification: true
```

这里的 `requestsJavaMiniKvEcho=false` 很关键：v333 没有新增需要 Java / mini-kv 回显的跨项目 contract 字段。

## 七、检查项

`createChecks(...)` 覆盖 23 个检查，包括：

```ts
sourceNodeV332Ready
sourceNodeV332AllowsOutlineIntakeOnly
sourceNodeV332KeepsDesignDraftClosed
sourceNodeV332KeepsRuntimeAndSideEffectsClosed
necessityProofComplete
outlineIntakeOnly
sectionCatalogComplete
sectionCatalogIsNonExecutable
archiveVerificationRequiredBeforeOutlineDraft
noUpstreamEchoRequested
noRuntimeDesignDraftCreated
noRuntimeImplementationCreated
noCredentialValueRead
noRawEndpointUrlParsed
noProviderClientInstantiated
noExternalRequestSent
noJavaOrMiniKvWrites
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

如果 v332 blocked，或者配置打开 upstream probes/actions，v333 会 fail closed。

## 八、路由和测试

路由注册在：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-intake
```

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake.test.ts
```

覆盖：

1. v332 ready 时，只打开 Node v334 archive verification；
2. v332 source archive blocked 时 fail closed；
3. upstream probes/actions 开启时 blocked；
4. JSON / Markdown route 输出正常。

## 九、验证结论

本版验证：

```text
npm.cmd run typecheck：通过
focused vitest：2 files / 8 tests 通过
full vitest stable mode：266 files / 928 tests 通过（--maxWorkers=2）
npm.cmd run build：通过
HTTP smoke：JSON 200，Markdown 200，23/23 checks，8 sections，8 stop conditions，0 blockers
```

v333 的价值是把“可以开始碰设计稿”进一步压成“先声明 outline 章节目录和禁止内容”，并要求 v334 先归档验证，避免直接进入设计稿正文或实现。
