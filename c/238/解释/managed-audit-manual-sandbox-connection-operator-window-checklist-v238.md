# Node v238 运行调试说明：managed audit manual sandbox connection operator window checklist

本版来源计划：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

v238 的目标是消费 Node v237 readiness gate，生成一份人工 operator window checklist。它只整理审批项、窗口边界、credential handle、schema rehearsal id、rollback path、timeout、manual abort marker、暂停条件和禁止动作，不打开 managed audit sandbox connection。

## 本版结果

核心 profile：

```text
managed-audit-manual-sandbox-connection-operator-window-checklist.v1
```

运行状态：

```text
checklistState=manual-sandbox-connection-operator-window-checklist-ready
readyForManagedAuditManualSandboxConnectionOperatorWindowChecklist=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
readOnlyChecklist=true
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

operator checklist：

```text
checklistMode=manual-sandbox-connection-operator-window-checklist-only
checklistMaterialReady=true
requiredApprovalCount=3
checklistStepCount=8
pauseConditionCount=8
forbiddenOperationCount=6
timeoutBudgetMs=15000
windowDurationMinutes=30
windowOpenByDefault=false
readyForJavaV93EchoReceipt=true
readyForManagedAuditSandboxAdapterConnection=false
actualConnectionAttempted=false
credentialValueRead=false
schemaMigrationRequested=false
managedAuditStateWriteRequested=false
upstreamServiceAutoStartRequested=false
miniKvExecutionPermissionInferred=false
productionWindowOpened=false
```

## 关键代码

新增服务：

```text
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionOperatorWindowChecklist.ts
```

入口：

```text
loadManagedAuditManualSandboxConnectionOperatorWindowChecklist()
```

核心流程：

```text
createSourceNodeV237()
createApprovalItems()
createChecklistSteps()
createPauseConditions()
createForbiddenOperations()
createOperatorWindowChecklist()
createChecks()
collectProductionBlockers()
```

## 路由

新增路由注册在：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
```

接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist?format=markdown
```

继续使用：

```text
registerAuditJsonMarkdownRoute()
```

## 测试

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionOperatorWindowChecklist.test.ts
```

已完成验证：

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

v237 证明三方材料可以进入人工窗口 checklist；v238 把 checklist 固化成 Node 可审计材料。下一步不应 Node 抢跑，而是推荐并行 Java v93 + mini-kv v102，分别回显 checklist 字段并继续证明 no-start/no-write 边界。
