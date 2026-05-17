# Node v234 运行调试说明：managed audit manual sandbox connection blocked execution rehearsal

本版来源计划：

```text
D:\nodeproj\orderops-node\docs\plans\v231-post-preflight-verification-roadmap.md
```

下一阶段计划已经另起：

```text
D:\nodeproj\orderops-node\docs\plans\v234-post-blocked-execution-rehearsal-roadmap.md
```

v234 的目标不是打开 managed audit sandbox connection，而是做一次“危险动作阻断演练”：消费 Node v233、Java v90、mini-kv v99 的证据，模拟连接、credential value 读取、schema migration、managed audit 写入、上游自动启动、mini-kv 写/恢复、Java ledger/SQL、production window 打开等 8 类危险动作，并证明它们仍然全部被阻断。

## 本版结果

核心 profile：

```text
managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1
```

运行状态：

```text
rehearsalState=manual-sandbox-connection-blocked-execution-rehearsal-ready
readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal=true
readyForManagedAuditSandboxAdapterConnection=false
readyForProductionAudit=false
readyForProductionWindow=false
connectsManagedAudit=false
readsManagedAuditCredential=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
```

阻断矩阵：

```text
simulatedAttemptCount=8
blockedAttemptCount=8
actualExecutionAttemptCount=0
```

这说明 v234 只是演练阻断结果，没有真实打开连接、没有读取 credential value、没有执行 schema migration、没有写 Java / mini-kv / audit 状态。

## 关键代码

新增服务：

```text
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionBlockedExecutionRehearsal.ts
```

关键入口：

```text
loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal()
```

它先读取 Node v233：

```text
loadManagedAuditManualSandboxConnectionRehearsalPacketReview()
```

再读取两侧证据：

```text
Java v90:
D:\javaproj\advanced-order-platform\c\90\解释\说明.md
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\93-version-90-release-approval-context-normalization-helper.md
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ContextHeaderField.java

mini-kv v99:
D:\C\mini-kv\c\99\解释\说明.md
D:\C\mini-kv\代码讲解记录_生产雏形阶段\155-version-99-wal-helper-regression-evidence.md
D:\C\mini-kv\fixtures\release\runtime-smoke-evidence.json
D:\C\mini-kv\fixtures\release\verification-manifest.json
```

然后生成：

```text
createBlockedExecutionAttempts()
createBlockedExecutionRehearsal()
createChecks()
collectProductionBlockers()
```

其中 `createBlockedExecutionRehearsal()` 固化了最关键的安全边界：

```text
connectionExecutionAllowed=false
credentialValueReadAllowed=false
schemaMigrationExecutionAllowed=false
managedAuditWriteAllowed=false
upstreamServiceAutoStartAllowed=false
miniKvWriteOrRestoreAllowed=false
javaLedgerOrSqlAllowed=false
nodeV234BlocksDangerousOperations=true
```

## 路由

新增路由注册在：

```text
D:\nodeproj\orderops-node\src\routes\auditRoutes.ts
```

接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal
GET /api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal?format=markdown
```

它继续使用：

```text
registerAuditJsonMarkdownRoute()
```

所以没有新增手写 JSON/Markdown 分支。

## 旧链路兼容修正

v234 同时修正了 v223-v233 旧沙箱链路对 mini-kv current runtime fixture 的读取方式。

涉及文件：

```text
D:\nodeproj\orderops-node\src\services\managedAuditExternalAdapterConnectionReadinessReview.ts
D:\nodeproj\orderops-node\src\services\managedAuditSandboxAdapterDryRunPackage.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionEvidenceChecklist.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionPacketVerification.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionPreflightVerification.ts
D:\nodeproj\orderops-node\src\services\managedAuditManualSandboxConnectionRehearsalPacketReview.ts
```

调整原则：

```text
允许 mini-kv current runtime fixture 从 v98 滚到 v99
保留历史 consumed digest / receipt 检查
不把 v98 重新写死成永久版本
```

这点很关键，因为 current fixture 本来就会随 mini-kv 版本滚动；Node 应该验证“当前版本可读 + 历史证据没丢”，而不是卡死在某一个旧版本。

## 测试

新增测试：

```text
D:\nodeproj\orderops-node\test\managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts
```

覆盖三类场景：

```text
1. 正常配置下生成 ready profile，8 类危险动作全部 simulated-only + blocked。
2. UPSTREAM_ACTIONS_ENABLED=true 时 readiness 阻断，且仍不尝试连接或写入。
3. JSON / Markdown 路由均可访问，并返回 v234 profile。
```

已完成验证：

```text
npm run typecheck
结果：通过

npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionOperatorPacket.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightGate.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts test/managedAuditManualSandboxConnectionRehearsalPacketReview.test.ts test/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts
结果：11 个测试文件通过，33 个用例通过

npm run build
结果：通过

npm test
结果：175 个测试文件通过，592 个用例通过

git diff --check
结果：通过，无空白错误
```

HTTP smoke 使用安全环境变量，只启动 Node 本服务，不启动 Java / mini-kv：

```text
PORT=4324
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
AUDIT_STORE_URL=managed-audit://contract-only
```

HTTP smoke 结果：

```text
GET /health -> status=ok
GET /api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal -> 200
GET /api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal?format=markdown -> 200 text/markdown
profileVersion=managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1
rehearsalState=manual-sandbox-connection-blocked-execution-rehearsal-ready
simulatedAttemptCount=8
blockedAttemptCount=8
actualExecutionAttemptCount=0
```

截图：

```text
D:\nodeproj\orderops-node\c\234\图片\managed-audit-manual-sandbox-connection-blocked-execution-rehearsal-v234.png
```

## 边界

本版没有做：

```text
不打开 managed audit connection
不读取 credential value
不执行 schema migration
不写 audit state
不写 Java ledger / SQL
不执行 mini-kv 写命令或 restore
不自动启动 Java / mini-kv
不打开 production window
```

## 下一步

当前唯一有效计划已经切换到：

```text
D:\nodeproj\orderops-node\docs\plans\v234-post-blocked-execution-rehearsal-roadmap.md
```

下一步不是 Node 抢跑，而是推荐并行：

```text
Java v91 + mini-kv v100
```

两边完成后，Node v235 再做：

```text
manual sandbox connection precondition intake
```

也就是：先补真实沙箱连接前置条件证据，再由 Node 做只读 intake；仍然不直接打开连接。
