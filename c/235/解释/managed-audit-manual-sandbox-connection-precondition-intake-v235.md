# Node v235 运行调试说明：managed audit manual sandbox connection precondition intake

本版来源计划：

```text
D:\nodeproj\orderops-node\docs\plans\v234-post-blocked-execution-rehearsal-roadmap.md
```

下一阶段计划已经另起：

```text
D:\nodeproj\orderops-node\docs\plans\v235-post-precondition-intake-roadmap.md
```

v235 的目标不是打开 managed audit sandbox connection，而是把真实连接前必须具备的六类前置条件收成一份只读 intake：owner approval artifact、credential handle review、schema rehearsal evidence、rollback path、timeout budget、manual abort marker。它消费 Node v234、Java v91、mini-kv v100 的证据，但仍不连接 managed audit、不读取 credential value、不执行 schema migration、不写 Java / mini-kv / audit 状态。

## 本版结果

核心 profile：

```text
managed-audit-manual-sandbox-connection-precondition-intake.v1
```

运行状态：

```text
intakeState=manual-sandbox-connection-precondition-intake-ready
readyForManagedAuditManualSandboxConnectionPreconditionIntake=true
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

前置条件 intake：

```text
markerSpan=Node v234 + Java v91 + mini-kv v100
requiredPreconditionCount=6
documentedPreconditionCount=6
handlesOnly=true
timeoutBudgetMs=15000
readyForDryRunRequestEnvelope=true
actualConnectionAttempted=false
credentialValueRead=false
schemaMigrationExecuted=false
managedAuditStateWritten=false
upstreamServiceAutoStarted=false
miniKvExecutionPermissionInferred=false
```

这说明 v235 只是确认“下一版可以生成 dry-run request envelope”，不是连接批准。

## 关键代码

新增服务：

```text
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionPreconditionIntake.ts
```

关键入口：

```text
loadManagedAuditManualSandboxConnectionPreconditionIntake()
```

它先读取 Node v234：

```text
loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal()
```

再读取两侧证据：

```text
Java v91:
D:\javaproj\advanced-order-platform\c\91\解释\说明.md
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\94-version-91-release-approval-sandbox-connection-precondition-receipt.md
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ReleaseApprovalManagedAuditSandboxConnectionPreconditionReceiptBuilder.java

mini-kv v100:
D:\C\mini-kv\c\100\解释\说明.md
D:\C\mini-kv\代码讲解记录_生产雏形阶段\156-version-100-current-runtime-fixture-rolling-guard.md
D:\C\mini-kv\fixtures\release\current-runtime-fixture-rolling-guard.json
D:\C\mini-kv\fixtures\release\runtime-smoke-evidence.json
D:\C\mini-kv\fixtures\release\verification-manifest.json
```

然后生成：

```text
createJavaV91Reference()
createMiniKvV100Reference()
createPreconditionIntake()
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
GET /api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake
GET /api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake?format=markdown
```

它继续使用：

```text
registerAuditJsonMarkdownRoute()
```

所以没有新增手写 JSON/Markdown 分支。

## 旧链路 rolling fixture 修正

v235 同时修正了 v223-v234 旧沙箱链路对 mini-kv current runtime fixture 的读取方式。

涉及文件：

```text
D:\nodeproj\orderops-node\src\services\managedAuditExternalAdapterConnectionReadinessReview.ts
D:\nodeproj\orderops-node\src\services\managedAuditSandboxAdapterDryRunPackage.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionEvidenceChecklist.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionPacketVerification.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionPreflightVerification.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionRehearsalPacketReview.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionBlockedExecutionRehearsal.ts
```

调整原则：

```text
允许 mini-kv current runtime fixture 从 v99 滚到 v100
保留历史 consumed digest / receipt / marker 检查
不把 current fixture 重新写死成永久 v99
```

这点很关键，因为 mini-kv v100 已经把 current fixture 滚动规则固化；Node 应该验证“当前证据可读 + 历史锚点稳定”，而不是被旧版本号卡住。

## 测试

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionPreconditionIntake.test.ts
```

覆盖三类场景：

```text
1. 正常配置下生成 ready profile，六类前置条件全部 documented，且 handlesOnly=true。
2. UPSTREAM_ACTIONS_ENABLED=true 时 readiness 阻断，且仍不尝试连接或读取 credential。
3. JSON / Markdown 路由均可访问，并返回 v235 profile。
```

已完成验证：

```text
npm run typecheck
结果：通过

npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts test/managedAuditManualSandboxConnectionRehearsalPacketReview.test.ts test/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts test/managedAuditManualSandboxConnectionPreconditionIntake.test.ts
结果：8 个测试文件通过，24 个用例通过

npm run build
结果：通过

npm test
结果：176 个测试文件通过，595 个用例通过

git diff --check
结果：通过，无空白错误
```

HTTP smoke 使用安全环境变量，只启动 Node 本服务，不启动 Java / mini-kv：

```text
PORT=4325
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
AUDIT_STORE_URL=managed-audit://contract-only
```

HTTP smoke 结果：

```text
GET /health -> status=ok
GET /api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake -> 200
GET /api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake?format=markdown -> 200 text/markdown
profileVersion=managed-audit-manual-sandbox-connection-precondition-intake.v1
intakeState=manual-sandbox-connection-precondition-intake-ready
requiredPreconditionCount=6
documentedPreconditionCount=6
readyForDryRunRequestEnvelope=true
actualConnectionAttempted=false
connectsManagedAudit=false
readsManagedAuditCredential=false
```

截图：

```text
D:\nodeproj\orderops-node\c\235\图片\managed-audit-manual-sandbox-connection-precondition-intake-v235.png
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

v234 证明“危险动作会被阻断”；v235 进一步证明“进入下一版 dry-run request envelope 前，六类前置条件都有只读证据来源”。这让 managed audit sandbox connection 从抽象 runbook 更接近真实流程，但仍然停在安全的只读 intake 阶段。

下一步是：

```text
Node v236：manual sandbox connection dry-run request envelope
```
