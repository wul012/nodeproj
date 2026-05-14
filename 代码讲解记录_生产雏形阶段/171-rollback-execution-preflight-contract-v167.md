# 第一百六十七版代码讲解：rollback execution preflight contract

本版目标是把 Java v58 与 mini-kv v67 的执行前证据合成 Node rollback execution preflight contract。

它解决的问题是：

```text
Java v58 已经把 rollback SQL review、migration direction、operator approval placeholder 固化成只读 gate；
mini-kv v67 已经把 restore target、artifact digest、WAL/Snapshot compatibility、CHECKJSON dry-run commands 固化成 operator package；
Node 需要把这两边合成一个 rollback execution preflight contract；
但 Node 仍然不能执行 SQL、不能连接生产数据库、不能触发 Java rollback、不能执行 mini-kv restore。
```

所以 v167 是 preflight contract，不是 rollback executor。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v166-post-rollback-window-roadmap.md
```

推进前只读核对到：

```text
Java tag：v58订单平台rollback-sql-review-gate-sample
mini-kv tag：第六十七版恢复演练操作包
```

对应证据文件：

```text
Java: src/main/resources/static/contracts/rollback-sql-review-gate.sample.json
mini-kv: fixtures/release/restore-dry-run-operator-package.json
```

因此 Node v167 可以按计划推进。

本版完成后，计划进入：

```text
推荐并行 Java v59 + mini-kv v68
Node v168 等待 Java v59 + mini-kv v68 完成后再做 production environment preflight checklist
```

## 新增服务文件

新增文件：

```text
src/services/rollbackExecutionPreflightContract.ts
```

主入口是：

```ts
export function loadRollbackExecutionPreflightContract(config: AppConfig): RollbackExecutionPreflightContractProfile {
  const previousChecklist = loadRollbackWindowReadinessChecklist(config);
  const preflightSteps = createPreflightSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousChecklist, preflightSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForRollbackExecutionPreflightContract");
```

这里继续接在 Node v166 后面：

```ts
const previousChecklist = loadRollbackWindowReadinessChecklist(config);
```

也就是说，v167 不绕过回滚窗口 readiness checklist，而是在它之后做执行前 contract。

## profile 结构

核心类型是：

```ts
export interface RollbackExecutionPreflightContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "rollback-execution-preflight-contract.v1";
  contractState: PreflightState;
  readyForRollbackExecutionPreflightContract: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
```

这几个字段明确表达：

```text
可以进入人工 preflight review
不能生产回滚
不能生产操作
不能执行
```

## Java v58 SQL review gate 引用

Java 侧引用被固化为：

```ts
const JAVA_V58_SQL_REVIEW_GATE = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v58",
  evidenceTag: "v58订单平台rollback-sql-review-gate-sample",
  gateVersion: "java-rollback-sql-review-gate.v1",
  scenario: "ROLLBACK_SQL_REVIEW_GATE_SAMPLE",
  gateEndpoint: "/contracts/rollback-sql-review-gate.sample.json",
  gateSource: "src/main/resources/static/contracts/rollback-sql-review-gate.sample.json",
  archivePath: "c/58",
```

v58 的关键字段是：

```ts
requiredReviewFields: [
  "rollback-sql-review-owner",
  "migration-direction",
  "operator-approval-placeholder",
  "rollback-sql-artifact-reference",
  "production-database-access-boundary",
],
```

这里把 SQL review 拆成可人工确认的字段，而不是把 SQL 放进 Node 执行。

Java 侧边界：

```ts
nodeMayRenderPreflight: true,
nodeMayTriggerRollback: false,
nodeMayExecuteRollbackSql: false,
requiresUpstreamActionsEnabled: false,
sqlExecutionAllowed: false,
requiresProductionDatabase: false,
```

这说明 Node 只渲染 preflight，不执行 SQL、不连生产库。

## mini-kv v67 operator package 引用

mini-kv 侧引用是：

```ts
const MINI_KV_V67_OPERATOR_PACKAGE = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v67",
  evidenceTag: "第六十七版恢复演练操作包",
  packageVersion: "mini-kv-restore-dry-run-operator-package.v1",
  packagePath: "fixtures/release/restore-dry-run-operator-package.json",
  archivePath: "c/67",
  projectVersion: "0.67.0",
```

artifact digest 字段：

```ts
artifactDigestIds: [
  "binary-digest",
  "fixture-digest",
  "handoff-digest",
],
```

兼容性确认：

```ts
compatibilityConfirmationIds: [
  "wal-compatibility",
  "snapshot-compatibility",
  "token-write-risk",
],
```

dry-run 命令：

```ts
dryRunCommands: [
  "INFOJSON",
  "CHECKJSON LOAD data/dry-run-restore.snap",
  "CHECKJSON COMPACT",
  "CHECKJSON SETNXEX dryrun:token 30 value",
  "STORAGEJSON",
  "HEALTH",
  "GET dryrun:token",
  "QUIT",
],
```

危险操作仍然只允许 `CHECKJSON` 解释。

## contract 摘要

返回的 contract 段包含：

```ts
contract: {
  contractDigest,
  previousChecklistDigest: previousChecklist.checklist.checklistDigest,
  previousChecklistVersion: previousChecklist.profileVersion,
  javaVersion: JAVA_V58_SQL_REVIEW_GATE.plannedVersion,
  javaGateVersion: JAVA_V58_SQL_REVIEW_GATE.gateVersion,
  miniKvVersion: MINI_KV_V67_OPERATOR_PACKAGE.plannedVersion,
  miniKvPackageVersion: MINI_KV_V67_OPERATOR_PACKAGE.packageVersion,
  nodeBaselineTag: "v166",
  preflightMode: "manual-preflight-contract-only",
```

`previousChecklistDigest` 把 v167 和 v166 串起来。

执行边界也在 contract 内直接声明：

```ts
nodeMayRenderPreflight: true,
nodeMayTriggerJavaRollback: false,
nodeMayExecuteJavaRollbackSql: false,
nodeMayExecuteMiniKvRestore: false,
nodeMayExecuteMiniKvAdminCommands: false,
automaticUpstreamStart: false,
mutatesUpstreamState: false,
productionRollbackAuthorized: false,
```

调用方不需要读文档，也能知道这个接口不是执行入口。

## check 逻辑

Java review 字段完整性：

```ts
javaReviewFieldsComplete: JAVA_V58_SQL_REVIEW_GATE.requiredReviewFields.length === 5
  && JAVA_V58_SQL_REVIEW_GATE.requiredReviewFields.includes("rollback-sql-review-owner")
  && JAVA_V58_SQL_REVIEW_GATE.requiredReviewFields.includes("production-database-access-boundary"),
```

Java SQL / 生产库边界：

```ts
javaSqlAndProductionDbClosed: !JAVA_V58_SQL_REVIEW_GATE.sqlExecutionAllowed
  && !JAVA_V58_SQL_REVIEW_GATE.requiresProductionDatabase,
```

mini-kv digest 字段完整性：

```ts
miniKvArtifactDigestsComplete: MINI_KV_V67_OPERATOR_PACKAGE.artifactDigestIds.length === 3
  && MINI_KV_V67_OPERATOR_PACKAGE.artifactDigestIds.includes("binary-digest")
  && MINI_KV_V67_OPERATOR_PACKAGE.artifactDigestIds.includes("fixture-digest"),
```

mini-kv dangerous command 只解释：

```ts
miniKvDangerousCommandsExplainedOnly:
  MINI_KV_V67_OPERATOR_PACKAGE.dryRunCommands.includes("CHECKJSON LOAD data/dry-run-restore.snap")
  && MINI_KV_V67_OPERATOR_PACKAGE.dryRunCommands.includes("CHECKJSON COMPACT")
  && MINI_KV_V67_OPERATOR_PACKAGE.dryRunCommands.includes("CHECKJSON SETNXEX dryrun:token 30 value"),
```

mini-kv 执行边界：

```ts
miniKvExecutionBoundariesClosed: !MINI_KV_V67_OPERATOR_PACKAGE.writeCommandsExecuted
  && !MINI_KV_V67_OPERATOR_PACKAGE.adminCommandsExecuted
  && !MINI_KV_V67_OPERATOR_PACKAGE.restoreExecutionAllowed
  && MINI_KV_V67_OPERATOR_PACKAGE.noRuntimeCommandAdded,
```

## preflight steps

v167 有 6 个步骤。

第 1 步收 Java v58 SQL review gate：

```ts
{
  order: 1,
  phase: "collect",
  source: "java",
  action: "Collect Java v58 rollback SQL review gate sample and c/58 evidence.",
```

第 2 步收 mini-kv v67 operator package：

```ts
{
  order: 2,
  phase: "collect",
  source: "mini-kv",
  action: "Collect mini-kv v67 restore dry-run operator package and c/67 evidence.",
```

第 3 步由 operator 复核真实审批和 digest 记录。

第 4 步由 Node 比较两侧边界。

第 5 步有疑问暂停。

第 6 步归档并等待 Java v59 + mini-kv v68：

```ts
expectedEvidence: "v167 closes the rollback execution preflight contract without opening production rollback authority.",
```

## forbidden operations

本版明确禁止：

```ts
{
  operation: "Execute rollback SQL from Node v167",
  reason: "Java v58 is a SQL review gate sample and sets SQL execution to false.",
  blockedBy: "Java v58 rollback SQL review gate",
},
```

禁止连接生产库：

```ts
{
  operation: "Connect to a production database",
  reason: "Java v58 records the production database boundary without connecting to production.",
  blockedBy: "Java v58 rollback SQL review gate",
},
```

禁止 mini-kv restore/admin：

```ts
{
  operation: "Execute mini-kv restore or admin commands",
  reason: "mini-kv v67 marks restore_execution_allowed=false and admin_commands_executed=false.",
  blockedBy: "mini-kv v67 restore dry-run operator package",
},
```

禁止把 preflight 当生产审批：

```ts
{
  operation: "Treat this preflight contract as production rollback approval",
  reason: "v167 is preflight evidence only and does not authorize production rollback.",
  blockedBy: "Node v167 rollback execution preflight contract",
},
```

## 路由接入

`src/routes/statusRoutes.ts` 新增：

```ts
import {
  loadRollbackExecutionPreflightContract,
  renderRollbackExecutionPreflightContractMarkdown,
} from "../services/rollbackExecutionPreflightContract.js";
```

新增路由：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/rollback-execution-preflight-contract",
  () => Promise.resolve(loadRollbackExecutionPreflightContract(deps.config)),
  renderRollbackExecutionPreflightContractMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/rollbackExecutionPreflightContract.test.ts
```

第一组测试校验 ready profile：

```ts
expect(profile).toMatchObject({
  profileVersion: "rollback-execution-preflight-contract.v1",
  contractState: "ready-for-manual-preflight-review",
  readyForRollbackExecutionPreflightContract: true,
  readyForProductionRollback: false,
  readyForProductionOperations: false,
  readOnly: true,
  dryRunOnly: true,
  executionAllowed: false,
```

还校验 28 个 check 全部通过：

```ts
summary: {
  preflightCheckCount: 28,
  passedPreflightCheckCount: 28,
  preflightArtifactCount: 2,
  preflightStepCount: 6,
  forbiddenOperationCount: 8,
  productionBlockerCount: 0,
},
```

第二组测试打开：

```ts
{ UPSTREAM_ACTIONS_ENABLED: "true" }
```

然后断言 preflight 被阻断。

第三组测试覆盖 JSON/Markdown 路由。

## 全量测试稳定性补丁

第一次 `npm test` 暴露 10 个旧 live-probe 用例 30s 超时，单独复跑通过。

这说明问题是全量并发下 timeout 阈值过紧，不是业务断言失败。v167 顺手把相关旧慢测 timeout 调整为 60s：

```text
productionLiveProbeRealReadSmoke*.test.ts
productionLiveProbeHandoffChecklist.test.ts
```

调整后：

```text
npm test: 114 files, 393 tests passed
```

## 运行与归档

本版验证：

```text
npm run typecheck
npm test -- --run test/rollbackExecutionPreflightContract.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

归档：

```text
c/167/图片/rollback-execution-preflight-contract.png
c/167/解释/运行调试说明.md
```

HTTP smoke 只启动 Node 本地服务，且保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

截图完成后 Node 进程已停止。

## 成熟度变化

v167 让 rollback 执行前链路更接近真实生产流程。

成熟度提升点：

```text
SQL review gate 被纳入 Node preflight contract
mini-kv restore dry-run operator package 被纳入 Node preflight contract
artifact digest placeholder 和 operator approval placeholder 都被显式保留
Node 仍然不执行 SQL、不恢复 mini-kv、不连接生产数据库、不授权 rollback
```

仍未解决的点：

```text
没有真实 production secret source contract
没有真实 artifact digest compatibility matrix
没有生产环境 preflight checklist
没有真实 IdP / secret manager / database
```

这些进入 Java v59、mini-kv v68、Node v168。

## 一句话总结

v167 把 Java v58 的 SQL review gate 和 mini-kv v67 的 restore dry-run operator package 合成了 Node rollback execution preflight contract，让执行前证据链更像真实生产流程，但仍然不打开任何真实回滚或恢复执行权限。
