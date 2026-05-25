# 331. Node v326 abort/rollback semantics contract intake

## 版本进度

v326 接在 v325 之后。v325 已经消费 Node v324 的三方 no-network safety fixture echo 结果，并把 `no-network-safety-fixture` 关闭；v326 处理最后一个缺口：

```text
abort-rollback-semantics
```

对应计划是：

```text
D:\nodeproj\orderops-node\docs\plans2\v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md
```

本版完成后，计划不另起新文件，因为该计划还包含 Java v150 + mini-kv v142、Node v327、Node v328。当前下一步是推荐并行 Java v150 + mini-kv v142。

## 代码结构

本版继续遵守“不要巨型文件”的规则，没有把合同、渲染、测试塞进路由：

```text
src/services/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeTypes.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.ts
src/services/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeRenderer.ts
test/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.test.ts
```

`auditJsonMarkdownRoutes.ts` 只新增一个 route registration：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake
```

这样业务判断在 service，展示在 renderer，类型独立维护，测试覆盖 route 和核心 profile。

## 核心代码讲解

入口函数是：

```typescript
loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake(...)
```

它的主流程是：

```typescript
const sourceNodeV325 = createSourceNodeV325(input.config);
const prerequisiteTransition = createPrerequisiteTransition(sourceNodeV325);
const necessityProof = createNecessityProof();
const abortRollbackSemanticsContract = createAbortRollbackSemanticsContract(...);
const checks = createChecks(...);
```

这里没有重新读取 Java 或 mini-kv，也没有读取 credential 或 endpoint。v326 的唯一源证据是 Node v325：

```typescript
loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview({ config })
```

`createSourceNodeV325(...)` 把 v325 的关键 closure 结果收进当前版本：

```typescript
completedPrerequisiteCount: source.closureReview.completedPrerequisiteCount,
remainingPrerequisiteCount: source.closureReview.remainingPrerequisiteCount,
nextConcretePrerequisiteId: source.closureReview.nextConcretePrerequisiteId,
nextNodeVersionSuggested: source.closureReview.nextNodeVersionSuggested,
runtimeShellStillBlocked: source.closureReview.runtimeShellStillBlocked,
```

这保证 v326 不是凭计划推进，而是消费已归档的 v325 证据：5/6 prerequisite 已完成，只剩 `abort-rollback-semantics`。

`createAbortRollbackSemanticsContract(...)` 定义的是非执行合同。required fields 包括：

```text
manual_abort_marker
rollback_runbook_reference
operator_confirmation_handle
approval_correlation_id
cleanup_evidence_marker
idempotent_noop_failure_policy
rollback_authority_boundary
abort_reason_code
recovery_checkpoint_reference
audit_digest
```

这些字段只描述未来人工中止和回滚语义，不包含真实命令、SQL、credential、endpoint 或网络请求。

prohibited fields 明确拦住执行化倾向：

```text
runtime_shell_command
shell_script_body
deployment_action
rollback_execution_action
mini_kv_write_command
java_sql_execution
credential_value
raw_endpoint_url
```

所以 v326 不是“做回滚”，而是先定义“未来如果要谈回滚，必须具备哪些只读、可审计、不可执行的语义证据”。

`createPrerequisiteTransition(...)` 把状态变化限制在最后一个 prerequisite：

```typescript
beforeV326: "still-missing"
afterV326: "contract-intake-defined"
closureRequiresUpstreamEcho: true
closesAbortRollbackSemantics: false
```

这很关键：v326 只是合同 intake，不关闭 prerequisite。关闭动作要等 Java v150、mini-kv v142 echo，再由 Node v327/v328 判断。

`createChecks(...)` 是安全门。它要求 v325 保持所有危险边界关闭，也要求 v326 自己不能打开执行：

```typescript
sourceNodeV325KeepsRuntimeBlocked
sourceNodeV325KeepsSideEffectsClosed
contractStaysNonSecretAndNonExecuting
abortRollbackExecutionStillBlocked
upstreamProbesStillDisabled
upstreamActionsStillDisabled
```

只要 `UPSTREAM_PROBES_ENABLED` 或 `UPSTREAM_ACTIONS_ENABLED` 被打开，profile 就会进入 `blocked`，测试也覆盖了这个分支。

## 测试覆盖

测试文件覆盖四类场景：

```typescript
defines a non-executing abort/rollback semantics contract after the v325 closure review
keeps the v325 historical fixture fallback path available
blocks when upstream probes or actions are enabled
exposes JSON and Markdown routes through the audit route table
```

重点断言包括：

```typescript
contractState: "abort-rollback-semantics-contract-intake-ready"
targetPrerequisiteId: "abort-rollback-semantics"
readyForParallelJavaV150MiniKvV142Echo: true
readyForNodeV327BeforeUpstreamEcho: false
abortRollbackExecutionAllowed: false
runtimeShellCommandRendered: false
javaSqlExecutionAllowed: false
miniKvWriteCommandAllowed: false
```

这些断言防止 v326 被误用成真实联调或真实回滚入口。

## 运行验证

本版验证按 Node 收口流程执行：

```powershell
npm.cmd run typecheck
npx.cmd vitest run test/managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake.test.ts
npm.cmd run build
npm.cmd test
node .tmp\v326-smoke.mjs
```

其中 `node .tmp\v326-smoke.mjs` 是一次性 HTTP smoke：脚本内部启动 Fastify、读取 v326 JSON/Markdown 端点、写入 `d/326/evidence/`，然后关闭服务。截图用 Playwright MCP 渲染归档 HTML 生成，保存到 `d/326/图片/abort-rollback-semantics-contract-intake-v326.png`。

## 成熟度判断

v326 把最后一个 prerequisite 从“完全缺失”推进到“合同已定义”。这让真实联调前置链更接近完成，但仍不是实际联调。

接下来必须先让 Java v150 和 mini-kv v142 并行只读确认，Node v327 再做 upstream echo verification，Node v328 才能做最终 prerequisite closure review。
