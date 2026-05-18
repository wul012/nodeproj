# Node v237 运行调试说明：managed audit manual sandbox connection readiness gate

本版来源计划：

```text
D:\nodeproj\orderops-node\docs\plans\v236-post-dry-run-envelope-roadmap.md
```

v237 的目标不是打开 managed audit sandbox connection，而是消费 Node v236 dry-run request envelope、Java v92 echo receipt、mini-kv v101 no-start/no-write follow-up，判断材料是否足够进入下一步人工 operator window checklist。

## 本版结果

核心 profile：

```text
managed-audit-manual-sandbox-connection-readiness-gate.v1
```

运行状态：

```text
gateState=manual-sandbox-connection-readiness-gate-ready
readyForManagedAuditManualSandboxConnectionReadinessGate=true
readyForOperatorWindowChecklist=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
readOnlyReview=true
executionAllowed=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

readiness gate：

```text
markerSpan=Node v236 + Java v92 + mini-kv v101
sourceEnvelopeAccepted=true
javaEchoReceiptAccepted=true
miniKvNoStartNoWriteAccepted=true
readyForOperatorWindowChecklist=true
actualConnectionAttempted=false
credentialValueRead=false
schemaMigrationRequested=false
managedAuditStateWriteRequested=false
upstreamServiceAutoStartRequested=false
miniKvExecutionPermissionInferred=false
productionWindowOpened=false
```

这说明 v237 只是“材料进入人工 checklist 的门”，不是连接批准。

## 关键代码

新增服务：

```text
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionReadinessGate.ts
```

入口：

```text
loadManagedAuditManualSandboxConnectionReadinessGate()
```

核心流程：

```text
createSourceNodeV236()
createJavaV92Reference()
createMiniKvV101Reference()
createReadinessGate()
createChecks()
collectProductionBlockers()
```

本版还修正了旧链路 rolling evidence 消费：v223-v237 沙箱链路现在能识别 mini-kv v101 current runtime fixture，同时保留 v84-v96 历史 consumed digest / receipt 锚点。

## 路由

新增路由注册在：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
```

接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate
GET /api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate?format=markdown
```

继续使用：

```text
registerAuditJsonMarkdownRoute()
```

所以没有新增手写 JSON/Markdown 分支。

## 运行配置边界

v237 特意区分两件事：

```text
source material readiness
current runtime blocker
```

读取 Node v236 source envelope 时使用安全视图：

```text
upstreamActionsEnabled=false
```

当前 v237 gate 仍使用真实运行配置检查：

```text
UPSTREAM_ACTIONS_ENABLED=false
```

这样当 `UPSTREAM_ACTIONS_ENABLED=true` 时，v237 会被 runtime blocker 阻断，但不会把 Node v236 / Java v92 / mini-kv v101 的材料误判成缺失。

## 测试

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionReadinessGate.test.ts
```

覆盖三类场景：

```text
1. 正常配置下生成 ready profile，确认 Node v236 + Java v92 + mini-kv v101 全部 accepted。
2. UPSTREAM_ACTIONS_ENABLED=true 时 gate readiness 阻断，但材料仍可进入 operator checklist，且不连接、不读 credential。
3. JSON / Markdown 路由均可访问，并返回 v237 profile。
```

已完成验证：

```text
npm run typecheck
结果：通过

npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionOperatorPacket.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightGate.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts test/managedAuditManualSandboxConnectionRehearsalPacketReview.test.ts test/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts test/managedAuditManualSandboxConnectionPreconditionIntake.test.ts test/managedAuditManualSandboxConnectionDryRunRequestEnvelope.test.ts test/managedAuditManualSandboxConnectionReadinessGate.test.ts
结果：13 个测试文件通过，39 个用例通过
```

```text
npm run build
结果：通过

npm test
结果：178 个测试文件通过，601 个用例通过

git diff --check
结果：通过，仅提示 Git CRLF/LF 换行提示，无空白错误
```

HTTP smoke 使用安全环境变量，只启动 Node 本服务，不启动 Java / mini-kv：

```text
PORT=4328
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
AUDIT_STORE_URL=managed-audit://contract-only
```

HTTP smoke 结果：

```text
GET /health -> status=ok
GET /api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate -> 200
GET /api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate?format=markdown -> 200 text/markdown
profileVersion=managed-audit-manual-sandbox-connection-readiness-gate.v1
gateState=manual-sandbox-connection-readiness-gate-ready
readyForOperatorWindowChecklist=true
readyForManagedAuditSandboxAdapterConnection=false
connectsManagedAudit=false
readsManagedAuditCredential=false
```

截图：

```text
D:\nodeproj\orderops-node\c\237\图片\managed-audit-manual-sandbox-connection-readiness-gate-v237.png
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

v236 只是生成 request envelope；Java v92 和 mini-kv v101 分别证明 envelope 可以被只读回显、运行时仍不自启不写入。v237 把这三份材料合成 readiness gate，让下一步可以合理推进到 Node v238 operator window checklist。

下一步是：

```text
Node v238：manual sandbox connection operator window checklist
```
