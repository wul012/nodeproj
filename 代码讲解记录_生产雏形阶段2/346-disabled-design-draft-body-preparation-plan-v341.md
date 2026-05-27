# 346：Node v341 disabled design draft body preparation plan 代码讲解

## 一、版本目标

Node v340 已经验证了 v339 pre-draft decision 的归档证据。v341 继续推进，但只做一件事：

```text
准备未来 body draft 的章节计划和证据映射，但不写正文。
```

它不是 body draft，也不是 runtime shell implementation。

## 二、类型层边界

类型文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanTypes.ts
```

核心字段把 v341 的权限边界写死：

```ts
activeNodeVersion: "Node v341";
sourceNodeVersion: "Node v340";
readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: boolean;
readyForDisabledRuntimeShellDesignDraft: false;
readyForRuntimeShellImplementation: false;
executionAllowed: false;
credentialValueRead: false;
rawEndpointUrlParsed: false;
httpRequestSent: false;
tcpConnectionAttempted: false;
```

这意味着 v341 只能把状态推进到 v342 archive verification，不能直接写 body，也不能实现或调用 runtime shell。

## 三、服务入口

服务文件：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan.ts
```

入口函数：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan(...)
```

这个函数做七步：

1. 读取 Node v340 archive verification。
2. 创建 necessity proof。
3. 创建 8 个 section plans。
4. 创建 6 个 evidence mappings。
5. 创建 8 个 draft guards。
6. 创建 8 个 stop conditions。
7. 生成 checks、blockers、summary 和下一步建议。

核心决策：

```ts
preparationPlanState: ready ? "disabled-runtime-shell-design-draft-body-preparation-plan-ready" : "blocked",
preparationPlanDecision: ready ? bodyPreparationPlan.planDecision : "blocked",
readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: ready,
```

## 四、读取 v340 源证据

`createSourceNodeV340(...)` 调用 v340 服务：

```ts
loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification(...)
```

它只投影 v341 需要的字段：

```ts
archiveVerificationState
archiveVerificationDecision
readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan
archiveVerificationDigest
sourceDecisionDigest
sourceArchiveVerificationDigest
sourceCheckCount
sourceArchiveFileCount
```

这样 v341 不重新解释 v339 或 v338，只消费 v340 的稳定结论。

## 五、necessity proof

`createNecessityProof()` 明确回答为什么 v341 有必要：

```ts
blockerResolved: "pre-draft-decision-archive-verified-but-body-preparation-plan-not-recorded",
consumer: "Node v342 body preparation plan archive verification",
```

它说明 v340 只验证归档，不负责定义未来 body draft 的章节计划和证据映射，所以 v341 需要单独记录 preparation plan。

## 六、section plans

`createSectionPlans()` 定义 8 个未来正文规划项：

```ts
scope-and-non-goals
source-evidence-chain
body-section-catalog
evidence-mapping
runtime-boundary
cross-project-boundary
archive-verification
stop-conditions
```

每个 section 都有：

```ts
bodyContentWritten: false
planned: true
```

也就是说，v341 只排版未来要写什么，不在本版写内容。

## 七、evidence mappings

`createEvidenceMappings()` 串起 Node v335-v340：

```ts
node-v335-body-section-catalog
node-v336-body-intake-archive
node-v337-body-candidate-review
node-v338-body-candidate-archive
node-v339-pre-draft-decision
node-v340-pre-draft-decision-archive
```

这些映射让未来 body draft 能引用稳定证据，而不是重新打开 Java/mini-kv 或真实 runtime。

## 八、draft guards

`createDraftGuards()` 保持危险边界关闭：

```ts
no-body-content
no-provider-client
no-credential-value
no-raw-endpoint
no-http-tcp
no-java-write
no-mini-kv-write-admin
no-auto-start
```

这些 guard 是 v341 的核心：它允许“准备计划”，但不允许“写正文”或“做执行”。

## 九、检查逻辑

`createChecks(...)` 继续把边界写成布尔门禁：

```ts
sourceNodeV340Ready
sourceNodeV340AllowsPreparationPlanOnly
sectionPlansComplete
evidenceMappingsComplete
draftGuardsEnforced
noBodyDraftWritten
noRuntimeImplementationCreated
noCredentialValueRead
noRawEndpointUrlParsed
noProviderClientInstantiated
noExternalRequestSent
noJavaOrMiniKvWrites
```

其中 `noBodyDraftWritten` 要求：

```ts
!plan.writesBodyDraftNow
&& !plan.allowsDisabledRuntimeShellDesignDraftNow
&& !plan.allowsDisabledRuntimeShellDesignDraftOutlineNow
```

所以 v341 不能偷偷把 preparation plan 变成 body draft。

## 十、路由接入

路由文件：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 endpoint：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan
```

它继续使用 `auditJsonMarkdownRoute(...)`，支持 JSON 和 `?format=markdown`。

## 十一、测试覆盖

测试文件：

```text
test/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan.test.ts
```

覆盖四个场景：

1. v340 ready 时，v341 ready，并只打开 v342 archive verification。
2. v340 source blocked 时，v341 fail closed。
3. upstream probes/actions 打开时 blocked。
4. route 同时输出 JSON 和 Markdown。

## 十二、版本结论

v341 把未来 body draft 的准备计划固化下来，但没有写正文，也没有打开 runtime。

下一步只能是 Node v342 archive verification。
