# Node v239 运行调试说明：managed audit manual sandbox connection operator window evidence verification

本版来源计划：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

v239 的目标不是打开真实 managed audit sandbox connection，而是把 Node v238 的 operator window checklist，和 Java v93 / mini-kv v102 的只读回显证据做一次一致性验证。Java v94 / mini-kv v103 属于优化 follow-up，不会被升格成 v239 的新前置条件。

## 本版结果

核心 profile：

```text
managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1
```

运行状态：

```text
verificationState=manual-sandbox-connection-operator-window-evidence-verification-ready
readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
readOnlyVerification=true
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

operator window evidence verification：

```text
markerSpan=Node v238 + Java v93 + mini-kv v102
verificationMode=manual-sandbox-connection-operator-window-evidence-verification-only
javaEchoAccepted=true
miniKvReceiptAccepted=true
checklistCountsAligned=true
boundaryFlagsAligned=true
connectionExecutionAllowed=false
credentialValueReadAllowed=false
schemaMigrationExecutionAllowed=false
managedAuditWriteAllowed=false
automaticServiceStartAllowed=false
miniKvExecutionAllowed=false
nodeV239BlocksRealConnection=true
```

## 关键代码

新增服务：

```text
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts
```

入口：

```text
loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification()
```

核心流程：

```text
createSourceNodeV238()
createJavaV93Reference()
createMiniKvV102Reference()
createOperatorWindowEvidenceVerification()
createChecks()
collectProductionBlockers()
collectWarnings()
collectRecommendations()
```

其中 `loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification()` 会先把 `upstreamActionsEnabled` 固定为 false，再读取 Node v238 operator window checklist，避免把“材料可读”误当成“真实连接可开”。代码里 `readOnlyVerification=true`、`executionAllowed=false`、`connectsManagedAudit=false`、`readsManagedAuditCredential=false` 也把这个边界锁死了。

Java v93 的回显入口在：

```text
createJavaV93Reference()  @ D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts:427
```

它只验证：

```text
runbookPath / walkthroughPath / builderPath / integrationTestPath
receiptVersionDocumented
sourceNodeV238ProfileDocumented
nextNodeV239ProfileDocumented
readyForNodeV239EvidenceVerification
credentialHandleOnly
credentialValueReadByJava=false
schemaMigrationSqlExecutedByJava=false
approvalLedgerWrittenByJava=false
actualConnectionAttemptedByJava=false
javaAutoStartForbidden=true
```

mini-kv v102 的回显入口在：

```text
createMiniKvV102Reference()  @ D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.ts:474
```

它只验证：

```text
projectVersion=0.102.0
releaseVersion=v102
consumerHint=Node v239 manual sandbox connection operator window evidence verification
sourceChecklist=Node v238 manual sandbox connection operator window checklist
currentArtifactPathHint=c/102/
currentLiveReadSessionEcho=mini-kv-live-read-v102
readOnly=true
executionAllowed=false
restoreExecutionAllowed=false
nodeAutoStartAllowed=false
javaAutoStartAllowed=false
miniKvAutoStartAllowed=false
writeCommandsExecuted=false
managedAuditWriteExecuted=false
credentialValueReadAllowed=false
schemaMigrationExecutionAllowed=false
loadRestoreCompactExecuted=false
setnxexExecutionAllowed=false
operatorWindowWriteAllowed=false
```

## 路由

新增路由注册在：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
```

接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification
GET /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification?format=markdown
```

继续使用：

```text
registerAuditJsonMarkdownRoute()
```

这次没有再手写 JSON/Markdown 双路由样板。

## 测试

新增测试文件：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts
```

覆盖三类场景：

```text
1. 正常配置下验证 Node v238 / Java v93 / mini-kv v102 的字段、digest、counts 和 no-start/no-write 边界。
2. UPSTREAM_ACTIONS_ENABLED=true 时，verification 仍能读取 source evidence，但会保持 blocked。
3. JSON / Markdown route 均可访问，并返回 v239 profile。
```

已完成验证：

```text
npm run build
结果：通过

npm exec -- vitest run test/managedAuditManualSandboxConnectionReadinessGate.test.ts test/managedAuditManualSandboxConnectionOperatorWindowChecklist.test.ts test/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts
结果：3 个测试文件通过，9 个用例通过

HTTP smoke：
- /health：status=ok
- /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification：200
- /api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification?format=markdown：200
- profileVersion=managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1
- verificationState=manual-sandbox-connection-operator-window-evidence-verification-ready
- ready=true
- readyForManagedAuditSandboxAdapterConnection=false
- javaEchoAccepted=true
- miniKvReceiptAccepted=true

npm test
结果：180 个测试文件通过，607 个用例通过

git diff --check
结果：通过，仅提示既有 LF/CRLF 工作区换行转换警告
```

## 归档

运行调试归档写入：

```text
c/239/解释/managed-audit-manual-sandbox-connection-operator-window-evidence-verification-v239.md
c/239/图片/managed-audit-manual-sandbox-connection-operator-window-evidence-verification-v239.png
```

对应页面：

```text
c/239/managed-audit-manual-sandbox-connection-operator-window-evidence-verification-v239.html
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

v239 把 Node v238 的 operator window checklist 和 Java v93 / mini-kv v102 的只读回显证据合在了一起，确认三方对审批项、步骤数、暂停条件和禁用边界一致。Java v94 / mini-kv v103 只是优化 follow-up，不会改变这一版的业务依赖。

一句话总结：v239 进一步收紧了“可审计的只读一致性验证”，但真实 sandbox connection 仍然关闭。
