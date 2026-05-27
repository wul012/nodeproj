# 344：Node v339 disabled design draft body pre-draft decision 代码讲解

## 一、版本目标

Node v338 已经验证了 v337 body candidate review 的归档证据。v339 继续推进，但只做一件事：

```text
判断未来是否可以准备受限 body draft，但本版不写正文。
```

它不是 body draft，也不是 runtime shell implementation。

## 二、类型层边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionTypes.ts
```

核心字段把 v339 的权限边界写死：

```ts
activeNodeVersion: "Node v339";
sourceNodeVersion: "Node v338";
readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: boolean;
readyForDisabledRuntimeShellDesignDraft: false;
readyForRuntimeShellImplementation: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
```

这意味着 v339 只能把状态推进到 v340 archive verification，不能直接写 body，也不能实现或调用 runtime shell。

## 三、服务入口

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision(...)
```

这个函数做六步：

1. 读取 Node v338 archive verification。
2. 创建 necessity proof。
3. 创建 5 个 decision questions。
4. 创建 6 个 preparation controls。
5. 创建 8 个 stop conditions。
6. 生成 checks、blockers、summary 和下一步建议。

核心决策：

```ts
preDraftDecisionState: ready ? "disabled-runtime-shell-design-draft-body-pre-draft-decision-ready" : "blocked",
preDraftDecision: ready ? preDraftDecisionRecord.decision : "blocked",
readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: ready,
```

## 四、读取 v338 源证据

`createSourceNodeV338(...)` 调用 v338 服务：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification(...)
```

它只投影 v339 需要的字段：

```ts
archiveVerificationState
archiveVerificationDecision
archiveVerificationDigest
sourceReviewDigest
sourceCheckCount
sourcePassedCheckCount
sourceArchiveFileCount
sourcePresentArchiveFileCount
```

这样 v339 不重新解释 v337 或 v336，只消费 v338 的稳定结论。

## 五、necessity proof

`createNecessityProof()` 明确回答为什么 v339 有必要：

```ts
blockerResolved: "body-candidate-archive-verified-but-pre-draft-decision-not-recorded",
consumer: "Node v340 pre-draft decision archive verification",
```

它说明 v338 只验证归档，不负责判断是否可以进入 body draft 准备，所以 v339 需要单独记录 pre-draft decision。

## 六、decision questions

v339 有 5 个问题：

```ts
why-pre-draft-decision-now
candidate-archive-stable
pre-draft-scope-bounded
archive-before-body-draft
no-runtime-side-effects
```

这些问题的作用是把“为什么现在可以进入下一步准备”讲清楚，同时避免把准备误写成正文。

## 七、preparation controls

v339 新增 6 个控制项：

```ts
use-existing-body-section-catalog
write-no-body-content-yet
no-new-cross-project-contract
keep-runtime-shell-disabled
archive-pre-draft-decision-first
stop-on-secret-network-or-write
```

这些控制项比单纯的 stop condition 更细：它们约束后续草稿准备只能复用既有 catalog，不能顺手打开 provider/client、网络、Java 写入或 mini-kv 写入。

## 八、检查逻辑

`createChecks(...)` 保持所有危险边界关闭：

```ts
noBodyDraftWritten
noRuntimeImplementationCreated
noRuntimeInvocationAllowed
noCredentialValueRead
noRawEndpointUrlParsed
noProviderClientInstantiated
noExternalRequestSent
noJavaOrMiniKvWrites
noUpstreamEchoRequested
```

这里允许的是 `allowsBodyDraftPreparation: true`，但同时要求：

```ts
writesBodyDraftNow: false
allowsDisabledRuntimeShellDesignDraftNow: false
```

也就是说，可以准备下一步，但不能在 v339 写正文。

## 九、路由接入

路由文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 endpoint：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision
```

它继续使用 `auditJsonMarkdownRoute(...)`，支持 JSON 和 `?format=markdown`。

## 十、测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision.test.ts
```

覆盖四个场景：

1. v338 ready 时，v339 ready，并只打开 v340 archive verification。
2. v338 source blocked 时，v339 fail closed。
3. upstream probes/actions 打开时 blocked。
4. route 同时输出 JSON 和 Markdown。

## 十一、版本结论

v339 把“可进入 body draft 准备”的判断单独固化下来，但没有写正文，也没有打开 runtime。

下一步只能是 Node v340 archive verification。
