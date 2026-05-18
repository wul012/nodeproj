# 第二百三十八版代码讲解：managed audit manual sandbox connection operator window checklist

本版目标是把 Node v237 readiness gate 转成一份人工 operator window checklist。v238 不打开连接，也不读取 credential value，只把审批项、窗口步骤、暂停条件和禁止动作固化成可审计材料，为 Java v93 / mini-kv v102 的并行回显做输入。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

计划要求 Node v238 做：

```text
manual sandbox connection operator window checklist
消费 Node v237 readiness gate
生成审批人、窗口开始/结束、credential handle、schema rehearsal id、rollback path、timeout、manual abort marker、暂停条件
仍不启动上游，不连接 managed audit
```

这说明当前主线从“材料 readiness gate”推进到了“人工窗口 checklist”。本版完成后，下一步不是 Node 继续抢跑，而是推荐并行：

```text
Java v93 + mini-kv v102
```

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionOperatorWindowChecklist.ts
```

profile 版本是：

```text
managed-audit-manual-sandbox-connection-operator-window-checklist.v1
```

服务入口是：

```ts
loadManagedAuditManualSandboxConnectionOperatorWindowChecklist()
```

入口先读取上一版 Node 证据：

```ts
const sourceGate = loadManagedAuditManualSandboxConnectionReadinessGate({ config: sourceGateConfig });
```

这里和 v237 一样，读取 source material 时使用安全视图：

```ts
const sourceGateConfig: AppConfig = {
  ...input.config,
  upstreamActionsEnabled: false,
};
```

这样 `UPSTREAM_ACTIONS_ENABLED=true` 会阻断当前 v238 readiness，但不会把 v237 已归档材料误判成缺失。

## Node v237 来源检查

v238 通过：

```ts
createSourceNodeV237()
```

保留这些字段：

```ts
gateState: source.gateState
gateDigest: source.readinessGate.gateDigest
readyForReadinessGate: source.readyForManagedAuditManualSandboxConnectionReadinessGate
readyForOperatorWindowChecklist: source.readyForOperatorWindowChecklist
readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection
connectsManagedAudit: source.connectsManagedAudit
readsManagedAuditCredential: source.readsManagedAuditCredential
schemaMigrationExecuted: source.schemaMigrationExecuted
```

这保证 v238 只从 v237 的 readiness gate 继续推进，而不是重新散读 Java v92 / mini-kv v101。

## approvalItems

v238 新增：

```ts
createApprovalItems()
```

它生成三类审批项：

```text
release-owner
security-reviewer
operations-owner
```

每个审批项都固定：

```ts
required: true
blocksConnectionIfMissing: true
```

并声明 `mustNotContain`，防止 credential value、SQL body、password、private key 等内容进入 Node archive。

## checklistSteps

v238 的主 checklist 来自：

```ts
createChecklistSteps()
```

它固化 8 个步骤：

```text
source-readiness-gate
owner-approval
credential-handle
schema-rehearsal
rollback-path
timeout-budget
manual-abort
final-stop-gate
```

每一步都有 owner、action、evidenceRequired 和 executionBoundary。这里的 checklist 是 review/record only，不是执行脚本。

## pauseConditions

v238 新增：

```ts
createPauseConditions()
```

它列出 8 个暂停条件：

```text
SOURCE_GATE_NOT_READY
OWNER_APPROVAL_MISSING
CREDENTIAL_VALUE_REQUESTED
SCHEMA_SQL_REQUESTED
ROLLBACK_PATH_MISSING
TIMEOUT_BUDGET_CHANGED
UPSTREAM_ACTIONS_ENABLED
MANUAL_ABORT_MARKED
```

这部分是本版最接近真实开发流程的地方：它不是只说“可以继续”，而是明确什么时候必须停。

## forbiddenOperations

v238 还固化 6 类禁止动作：

```text
Open managed audit sandbox connection
Read or archive managed audit credential value
Execute schema rehearsal SQL
Write managed audit state
Auto-start Java, mini-kv, or external audit service
Grant mini-kv execution or restore permission
```

这对应生产边界：Node 现在仍然只是控制面和证据面，不是连接执行器。

## operatorWindowChecklist

核心汇总函数是：

```ts
createOperatorWindowChecklist()
```

它输出：

```ts
checklistMode: "manual-sandbox-connection-operator-window-checklist-only"
checklistMaterialReady: true
requiredApprovalCount: 3
checklistStepCount: 8
pauseConditionCount: 8
forbiddenOperationCount: 6
timeoutBudgetMs: 15000
windowDurationMinutes: 30
windowOpenByDefault: false
readyForJavaV93EchoReceipt: true
```

并继续锁死真实动作：

```ts
readyForManagedAuditSandboxAdapterConnection: false
actualConnectionAttempted: false
credentialValueRead: false
schemaMigrationRequested: false
managedAuditStateWriteRequested: false
upstreamServiceAutoStartRequested: false
miniKvExecutionPermissionInferred: false
productionWindowOpened: false
```

`readyForJavaV93EchoReceipt=true` 的意思是：材料可以交给 Java v93 做只读回显，不是连接批准。

## checks

`createChecks()` 合成 readiness：

```ts
sourceNodeV237ReadinessGateReady
sourceNodeV237AllowsOperatorChecklist
sourceNodeV237StillBlocksConnection
sourceNodeV237DigestPresent
approvalItemsComplete
checklistStepsComplete
pauseConditionsComplete
forbiddenOperationsComplete
checklistDigestPresent
readyForJavaV93EchoReceipt
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

最后：

```ts
checks.readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist")
  .every(([, value]) => value);
```

## 路由

路由文件：

```text
src/routes/auditRoutes.ts
```

新增接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist?format=markdown
```

注册方式继续使用：

```ts
registerAuditJsonMarkdownRoute(...)
```

没有新增重复路由样板。

## 测试

新增测试文件：

```text
test/managedAuditManualSandboxConnectionOperatorWindowChecklist.test.ts
```

覆盖三类场景：

```text
1. 正常配置下生成 ready checklist，确认 3 个 approvalItems、8 个 checklistSteps、8 个 pauseConditions、6 个 forbiddenOperations。
2. UPSTREAM_ACTIONS_ENABLED=true 时 readiness 阻断，但 v237 source material 仍可读取，且不连接、不读 credential。
3. JSON / Markdown route 均可访问，并返回 v238 profile。
```

聚焦验证已完成：

```text
npm run typecheck
结果：通过

npx vitest run test/managedAuditManualSandboxConnectionReadinessGate.test.ts test/managedAuditManualSandboxConnectionOperatorWindowChecklist.test.ts
结果：2 个测试文件通过，6 个用例通过

npm run build
结果：通过

HTTP smoke：
- /health：status=ok
- /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist：200
- /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist?format=markdown：200
- profileVersion=managed-audit-manual-sandbox-connection-operator-window-checklist.v1
- checklistState=manual-sandbox-connection-operator-window-checklist-ready
- readyForJavaV93EchoReceipt=true
- readyForManagedAuditSandboxAdapterConnection=false
- connectsManagedAudit=false
- readsManagedAuditCredential=false

npm test
结果：179 个测试文件通过，604 个用例通过

git diff --check
结果：通过，仅提示既有 LF/CRLF 工作区换行转换警告

截图：
D:\nodeproj\orderops-node\c\238\图片\managed-audit-manual-sandbox-connection-operator-window-checklist-v238.png
```

## 边界

本版没有做：

```text
没有打开 managed audit sandbox connection
没有读取 credential value
没有执行 schema migration
没有写 managed audit 状态
没有写 Java ledger 或执行 Java SQL
没有执行 mini-kv 写命令、LOAD、COMPACT、RESTORE
没有自动启动 Java / mini-kv
没有打开 production window
```

## 成熟度变化

v238 让项目从“材料 readiness”进入“人工窗口 checklist”阶段。它更接近真实生产流程，因为真实流程不会在 readiness 通过后立刻连接，而是先要求审批、窗口、回滚、超时和 abort 边界全部可审计。

一句话总结：v238 把真实连接前的人工窗口材料固化了，但真实 managed audit sandbox connection 仍然关闭。
