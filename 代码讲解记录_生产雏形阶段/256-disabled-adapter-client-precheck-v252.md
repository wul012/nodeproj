# 第二百五十二版代码讲解：disabled adapter client precheck

本版目标是在 v251 decision record 之后，定义真实 managed audit adapter client 之前的禁用态预检。它不实现 client，不实例化 client，不发真实请求，只把将来要写 client 前的边界、env handle、opt-in gate、failure taxonomy 和 dry-run response shape 固化下来。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

v251 已完成：

```text
manual sandbox connection decision record
```

v252 接在它后面做：

```text
disabled adapter client precheck
```

这说明主线已经从“人工决策记录”推进到“真实 client 编写前的禁用态边界”。但当前仍不连接真实 managed audit。

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.ts
```

核心 profile 锁住边界：

```ts
profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1";
precheckState: "disabled-adapter-client-precheck-ready" | "blocked";
readyForManagedAuditSandboxAdapterConnection: false;
executionAllowed: false;
connectsManagedAudit: false;
readsManagedAuditCredential: false;
schemaMigrationExecuted: false;
automaticUpstreamStart: false;
```

这一版可以 ready 的只有 precheck，不是 adapter connection。

## 消费 v251 decision record

v252 通过：

```ts
loadManagedAuditManualSandboxConnectionDecisionRecord({
  config: input.config,
})
```

消费 v251，然后压缩为：

```ts
readyForDecisionRecord: source.readyForManagedAuditManualSandboxConnectionDecisionRecord
requiredDecisionFieldCount: source.decisionRecord.requiredDecisionFieldCount
noGoConditionCount: source.decisionRecord.noGoConditionCount
connectionStillBlocked: true
credentialValueStillBlocked: true
schemaMigrationStillBlocked: true
autoStartStillBlocked: true
```

这样 v252 复用 v251 的决策记录，不重复读取 Java / mini-kv，也不重复解析前面所有证据。

## disabledAdapterClientPrecheck

核心对象是：

```ts
adapterMode: "disabled-client-precheck-only"
clientImplementationStatus: "not-implemented"
clientMayBeInstantiated: false
externalRequestMayBeSent: false
credentialValueMayBeLoaded: false
optInGateRequired: true
```

这几行明确本版不是“写一个禁用的 client 类”，而是“写 client 之前的 precheck 契约”。没有真实 transport，也没有外部 URL。

## required env handles

`createRequiredEnvHandles()` 声明五个 handle：

```ts
ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED
ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS
```

每个 handle 都带：

```ts
valueRequiredForPrecheck: false
credentialValue: false
```

这说明 v252 只是定义名字和用途，不读取 env value，尤其不读取 credential value。

## opt-in gate

`createOptInGate()` 定义：

```ts
gateName: "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED"
requiredValueForFutureConnection: "true"
currentDefault: "false"
precheckTreatsEnabledAsBlocked: true
operatorApprovalRequired: true
```

关键点是 `precheckTreatsEnabledAsBlocked=true`：在 v252 这个版本里，如果有人试图打开 gate，反而应该 blocked，因为本版没有真实 client 能力。

## failure taxonomy

`createFailureTaxonomy()` 定义六类失败：

```ts
ADAPTER_CLIENT_DISABLED
CREDENTIAL_HANDLE_MISSING
CREDENTIAL_VALUE_REQUESTED
ENDPOINT_HANDLE_MISSING
SCHEMA_REHEARSAL_MISSING
MANUAL_WINDOW_NOT_OPEN
```

其中最敏感的是：

```ts
CREDENTIAL_VALUE_REQUESTED
```

它的 action 是：

```ts
pause-and-do-not-connect
```

这延续 v251 的 no-go 条件，避免后续版本把 credential handle 偷偷升级成 credential value。

## dryRunResponseShape

`createDryRunResponseShape()` 固化未来 dry-run 返回字段：

```ts
profileVersion
precheckState
adapterMode
optInGate
requiredEnvHandles
failureTaxonomy
connectionAttempted
credentialValueRead
externalRequestSent
schemaMigrationExecuted
```

并且所有真实动作字段保持 false：

```ts
connectionAttempted: false
credentialValueRead: false
externalRequestSent: false
schemaMigrationExecuted: false
```

## checks

`createChecks()` 验证：

```ts
sourceNodeV251Ready
sourceDecisionRecordStillBlocksConnection
sourceDecisionRecordStillBlocksCredentialValue
requiredEnvHandlesDeclared
envHandlesRemainHandleOnly
optInGateDeclared
optInGateDefaultDisabled
failureTaxonomyDeclared
dryRunResponseShapeDeclared
adapterClientNotImplemented
clientInstantiationBlocked
externalRequestBlocked
credentialValueLoadBlocked
upstreamActionsStillDisabled
```

最终只有所有检查为 true，才会得到：

```ts
readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck=true
```

## 路由接入

修改：

```text
src/routes/auditJsonMarkdownRoutes.ts
```

新增 route table 注册：

```ts
auditJsonMarkdownRoute(
  "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
  (deps) => loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({ config: deps.config }),
  renderManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckMarkdown,
)
```

仍沿用共享 route table，避免旧式重复路由。

## 测试

新增：

```text
test/managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.test.ts
```

覆盖：

```text
1. v251 ready 时，v252 precheck ready，但 client 未实现、未实例化、未请求外部、未读 credential
2. UPSTREAM_ACTIONS_ENABLED=true 时 blocked
3. JSON / Markdown route 均可访问
```

聚焦验证：

```text
npm run typecheck
npx vitest run test\managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.test.ts test\managedAuditManualSandboxConnectionDecisionRecord.test.ts
```

最终验证：

```text
npm run typecheck -> passed
npm test -> 192 files passed, 644 tests passed
npm run build -> passed
safe HTTP smoke -> passed
Chrome screenshot -> c/252/图片/disabled-adapter-client-precheck-v252.png
```

HTTP smoke 断言：

```ts
healthStatus: "ok"
precheckState: "disabled-adapter-client-precheck-ready"
ready: true
connectsManagedAudit: false
readsManagedAuditCredential: false
externalRequestMayBeSent: false
failureClassCount: 6
checkCount: 19
passedCheckCount: 19
```

这里的关键不是 `ready=true` 本身，而是 ready 的对象只限于：

```text
readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck
```

它并不表示：

```text
readyForManagedAuditSandboxAdapterConnection
```

后者仍然固定为 false。

## 计划收口

v252 是 `v245-post-sandbox-precheck-roadmap.md` 的最后执行项。本版完成后，计划应收口，并另起：

```text
docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md
```

后续版本不应继续往 v245 计划无限追加。

新的当前入口是：

```text
docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md
```

## 一句话总结

v252 把真实 adapter client 前的禁用态预检写成机器可读契约：client 未实现、不能实例化、不能发请求、不能读 credential value；下一阶段应另起计划，从 test-only adapter shell 或继续质量拆分中选择。
