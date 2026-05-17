# 第二百三十四版代码讲解：managed audit manual sandbox connection blocked execution rehearsal

本版目标是把 managed audit sandbox connection 前的危险动作全部压成一份可读、可测、可归档的阻断演练报告。v233 已经完成 rehearsal packet review；v234 不打开连接，而是证明“即便进入连接前阶段，Node 仍不会读 credential、跑 migration、写审计状态、启动上游或触碰 Java / mini-kv 写路径”。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v231-post-preflight-verification-roadmap.md
```

计划要求 Node v234 做：

```text
manual sandbox connection blocked execution rehearsal
消费 Node v233 + Java v90 + mini-kv v99
只做危险动作阻断演练
不打开 managed audit 连接
不读取 credential value
不执行 schema migration
不写 Java / mini-kv / audit 状态
```

这说明当前主线已经从“沙箱连接材料准备”进入“真实连接前安全闸门验证”。本版完成后，后续计划另起为：

```text
D:\nodeproj\orderops-node\docs\plans\v234-post-blocked-execution-rehearsal-roadmap.md
```

## 新增服务

新增文件：

```text
src/services/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.ts
```

profile 版本是：

```text
managed-audit-manual-sandbox-connection-blocked-execution-rehearsal.v1
```

服务入口是：

```ts
loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal()
```

它先读取上一版 Node 证据：

```ts
const sourceReview = loadManagedAuditManualSandboxConnectionRehearsalPacketReview({ config: input.config });
```

再构建三组核心材料：

```ts
const javaV90 = createJavaV90Reference(evidenceFiles, snippetMatches);
const miniKvV99 = createMiniKvV99Reference(evidenceFiles, snippetMatches, runtimeSmoke, manifest);
const simulatedBlockedAttempts = createBlockedExecutionAttempts();
```

这里的设计点是：v234 不自己宣称安全，而是消费 v233、Java v90、mini-kv v99 的证据，再叠加自己的阻断矩阵。

## Node v233 来源检查

v234 读取：

```text
src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.ts
```

并保留这些字段：

```ts
readyForSandboxAdapterConnectionFromSource: false
connectsManagedAudit: false
readsManagedAuditCredential: false
schemaMigrationExecuted: false
managedAuditWritesStillBlocked: true
```

这表示 v233 的 rehearsal packet review 仍然只是 review，不是连接授权。v234 的 `sourceNodeV233StillConnectionBlocked` 和 `sourceNodeV233StillWriteBlocked` 会继续检查这个边界。

## Java v90 证据

v234 读取 Java v90 的三个实际文件：

```text
D:\javaproj\advanced-order-platform\c\90\解释\说明.md
D:\javaproj\advanced-order-platform\代码讲解记录_生产雏形阶段\93-version-90-release-approval-context-normalization-helper.md
D:\javaproj\advanced-order-platform\src\main\java\com\codexdemo\orderplatform\ops\ContextHeaderField.java
```

检查项包括：

```ts
normalizeValuePresent
normalizedFactoryPresent
missingWarningCentralized
allEchoedRetained
contractPreservingRefactorDocumented
noLombokIntroduced
approvalLedgerWrittenByJava: false
schemaSqlExecutedByJava: false
credentialValueReadByJava: false
managedAuditConnectionOpenedByJava: false
```

也就是说，Java v90 是一个 context normalization 质量优化版本，不是 approval ledger 写入版本，也不是 SQL / credential / connection 执行版本。

## mini-kv v99 证据

v234 读取 mini-kv v99 的四个实际文件：

```text
D:\C\mini-kv\c\99\解释\说明.md
D:\C\mini-kv\代码讲解记录_生产雏形阶段\155-version-99-wal-helper-regression-evidence.md
D:\C\mini-kv\fixtures\release\runtime-smoke-evidence.json
D:\C\mini-kv\fixtures\release\verification-manifest.json
```

关键字段是：

```ts
projectVersion: "0.99.0"
releaseVersion: "v99"
consumerHint: "Node v234 manual sandbox connection blocked execution rehearsal"
writeWalHelper: "CommandProcessor::execute_with_wal"
readOnly: true
executionAllowed: false
restoreExecutionAllowed: false
orderAuthoritative: false
runtimeWriteObserved: false
writeCommandsExecuted: false
```

这说明 mini-kv v99 给 Node 的只是 WAL helper 回归证据和只读 runtime fixture，不是让 Node 对 mini-kv 执行写命令或 restore 的许可。

## 阻断矩阵

v234 的核心是：

```ts
createBlockedExecutionAttempts()
```

它列出 8 类危险动作：

```text
managed-audit-connect
credential-value-read
schema-migration
managed-audit-state-write
upstream-service-auto-start
mini-kv-write-or-restore
java-ledger-or-sql
production-window-open
```

每个 attempt 都固定为：

```ts
simulatedOnly: true
actualExecutionAttempted: false
blocked: true
executionAllowed: false
```

然后 `createBlockedExecutionRehearsal()` 汇总：

```ts
simulatedAttemptCount: attempts.length
blockedAttemptCount
actualExecutionAttemptCount
connectionExecutionAllowed: false
credentialValueReadAllowed: false
schemaMigrationExecutionAllowed: false
managedAuditWriteAllowed: false
upstreamServiceAutoStartAllowed: false
miniKvWriteOrRestoreAllowed: false
javaLedgerOrSqlAllowed: false
```

最关键的判断是：

```ts
nodeV234BlocksDangerousOperations: blockedAttemptCount === attempts.length && actualExecutionAttemptCount === 0
```

它把“全部危险动作都被阻断，且没有任何真实执行尝试”变成一个可测试字段。

## checks

`createChecks()` 把来源证据和本版阻断矩阵合成 readiness：

```ts
sourceNodeV233ReviewReady
sourceNodeV233StillConnectionBlocked
sourceNodeV233StillWriteBlocked
javaV90ContextNormalizationAccepted
javaV90BoundaryAccepted
miniKvV99WalRegressionAccepted
miniKvV99RuntimeBoundaryAccepted
allDangerousOperationsSimulatedOnly
allDangerousOperationsBlocked
upstreamActionsStillDisabled
productionAuditStillBlocked
productionWindowStillBlocked
```

最后：

```ts
checks.readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal = Object.entries(checks)
  .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionBlockedExecutionRehearsal")
  .every(([, value]) => value);
```

这让 readiness 不靠手写结论，而是由所有子检查自动汇总。

## 路由

路由文件：

```text
src/routes/auditRoutes.ts
```

新增 import：

```ts
loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal
renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown
```

新增接口：

```text
GET /api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal
GET /api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal?format=markdown
```

注册方式仍然是：

```ts
registerAuditJsonMarkdownRoute(...)
```

这继承了 v225 之后的路由规范，没有退回手写 JSON/Markdown 分支。

## 测试

新增测试文件：

```text
test/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts
```

第一组测试验证正常 profile：

```ts
rehearsalState: "manual-sandbox-connection-blocked-execution-rehearsal-ready"
readyForManagedAuditSandboxAdapterConnection: false
connectsManagedAudit: false
readsManagedAuditCredential: false
schemaMigrationExecuted: false
automaticUpstreamStart: false
simulatedAttemptCount: 8
blockedAttemptCount: 8
actualExecutionAttemptCount: 0
```

第二组测试把：

```text
UPSTREAM_ACTIONS_ENABLED=true
```

然后断言：

```ts
profile.rehearsalState === "blocked"
profile.checks.upstreamActionsStillDisabled === false
profile.blockedExecutionRehearsal.actualExecutionAttemptCount === 0
```

这说明即使配置错误导致 readiness blocked，v234 也不会真的去连接或写入。

第三组测试覆盖 JSON / Markdown 路由：

```text
/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal
/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal?format=markdown
```

## 旧沙箱链路滚动证据修正

本版还修正了 v223-v233 旧链路读取 mini-kv current runtime fixture 的问题。

涉及文件：

```text
src/services/managedAuditExternalAdapterConnectionReadinessReview.ts
src/services/managedAuditSandboxAdapterDryRunPackage.ts
src/services/managedAuditManualSandboxConnectionEvidenceChecklist.ts
src/services/managedAuditManualSandboxConnectionPacketVerification.ts
src/services/managedAuditManualSandboxConnectionPreflightVerification.ts
src/services/managedAuditManualSandboxConnectionRehearsalPacketReview.ts
```

修正思路不是把所有历史都改成 v99，而是分清两层：

```text
current runtime fixture 可以滚动到 v99
历史 consumed digest / receipt 仍然保留原版本语义
```

这样 Node 后续不会因为 mini-kv current fixture 升版而误判旧 evidence 失效，也不会丢掉历史版本的证据链。

## 运行验证

已执行：

```text
npm run typecheck
npx vitest run test/managedAuditExternalAdapterConnectionReadinessReview.test.ts test/managedAuditSandboxAdapterDryRunPlan.test.ts test/managedAuditSandboxAdapterDryRunPackage.test.ts test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts test/managedAuditManualSandboxConnectionEvidenceChecklist.test.ts test/managedAuditManualSandboxConnectionOperatorPacket.test.ts test/managedAuditManualSandboxConnectionPacketVerification.test.ts test/managedAuditManualSandboxConnectionPreflightGate.test.ts test/managedAuditManualSandboxConnectionPreflightVerification.test.ts test/managedAuditManualSandboxConnectionRehearsalPacketReview.test.ts test/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts
npm run build
npm test
git diff --check
```

结果：

```text
typecheck 通过
11 个聚焦测试文件通过
33 个聚焦测试用例通过
build 通过
全量 npm test 通过：175 个测试文件，592 个用例
git diff --check 通过，无空白错误
```

HTTP smoke 使用安全环境变量：

```text
PORT=4324
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
ACCESS_GUARD_ENFORCEMENT_ENABLED=true
AUDIT_STORE_URL=managed-audit://contract-only
```

结果：

```text
/health -> ok
v234 JSON -> 200
v234 Markdown -> 200 text/markdown
simulatedAttemptCount=8
blockedAttemptCount=8
actualExecutionAttemptCount=0
```

截图已归档：

```text
c/234/图片/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal-v234.png
```

## 本版边界

本版没有：

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

## 项目成熟度变化

v234 让 managed audit sandbox connection 主线从“材料 review”推进到“危险动作阻断演练”。这不是生产连接能力本身，但它是走向真实联调前必须补的一道闸门：先证明不会误执行，再谈后续的人工作业窗口和 credential handle review。

一句话总结：

```text
v234 证明了 Node 在真实沙箱连接前仍保持全阻断：8 类危险动作全部只模拟、全部 blocked、真实执行次数为 0。
```
