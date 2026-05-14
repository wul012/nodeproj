# 第一百六十六版代码讲解：rollback window readiness checklist

本版目标是把 Java v57 与 mini-kv v66 的人工交接证据合成 Node 回滚窗口 checklist。

它解决的问题是：

```text
Java v57 已经说明回滚前需要人工确认 artifact version、runtime config、secret source、database migration direction；
mini-kv v66 已经说明恢复前需要人工确认 binary、WAL、Snapshot、fixture compatibility；
Node 需要把这两边 handoff 合成一个跨项目人工窗口 checklist；
但 Node 仍然不能触发 Java rollback、不能执行 rollback SQL、不能执行 mini-kv restore、不能读取生产密钥。
```

所以 v166 是 readiness checklist，不是 rollback executor。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v163-post-rollback-readiness-roadmap.md
```

推进前只读核对到：

```text
Java HEAD/tag：v57订单平台rollback-approval-handoff-sample
mini-kv HEAD/tag：第六十六版恢复兼容交接样本
```

对应证据文件：

```text
Java: src/main/resources/static/contracts/rollback-approval-handoff.sample.json
mini-kv: fixtures/release/restore-compatibility-handoff.json
```

因此 Node v166 可以按计划推进。

本版完成后，v163 衍生计划正式收口，并另起：

```text
docs/plans/v166-post-rollback-window-roadmap.md
```

## 新增服务文件

新增文件：

```text
src/services/rollbackWindowReadinessChecklist.ts
```

主入口是：

```ts
export function loadRollbackWindowReadinessChecklist(config: AppConfig): RollbackWindowReadinessChecklistProfile {
  const previousGate = loadCrossProjectReleaseBundleGate(config);
  const checklistSteps = createChecklistSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousGate, checklistSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForRollbackWindowReadinessChecklist");
```

这里有三个关键点。

第一，v166 依赖 v165：

```ts
const previousGate = loadCrossProjectReleaseBundleGate(config);
```

这说明回滚窗口 checklist 是从 release bundle gate 继续往后走，而不是绕过发布证据。

第二，ready 计算继续复用 v164 的公共 helper：

```ts
completeAggregateReadyCheck(checks, "readyForRollbackWindowReadinessChecklist");
```

这保持了 v162-v166 release report 的一致结构。

第三，状态只表示人工窗口复核 ready：

```ts
const checklistState = checks.readyForRollbackWindowReadinessChecklist
  ? "ready-for-manual-window-review"
  : "blocked";
```

它不表示生产回滚获批。

## profile 结构

核心类型是：

```ts
export interface RollbackWindowReadinessChecklistProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "rollback-window-readiness-checklist.v1";
  checklistState: "ready-for-manual-window-review" | "blocked";
  readyForRollbackWindowReadinessChecklist: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
```

这些字段直接表达本版边界：

```text
可以生成 checklist
可以人工复核
不能生产回滚
不能生产操作
不能执行
```

## Java v57 handoff 引用

Java 侧引用被固化为：

```ts
const JAVA_V57_ROLLBACK_HANDOFF: JavaRollbackApprovalHandoffReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v57",
  evidenceTag: "v57订单平台rollback-approval-handoff-sample",
  handoffVersion: "java-rollback-approval-handoff.v1",
  scenario: "ROLLBACK_APPROVAL_HANDOFF_SAMPLE",
  handoffEndpoint: "/contracts/rollback-approval-handoff.sample.json",
  handoffSource: "src/main/resources/static/contracts/rollback-approval-handoff.sample.json",
  archivePath: "c/57",
```

它记录的人工确认字段是：

```ts
requiredConfirmationFields: [
  "artifact-version-target",
  "runtime-config-profile",
  "configuration-secret-source",
  "database-migration-direction",
  "release-bundle-manifest",
  "deployment-rollback-evidence",
],
```

这说明 Java 回滚窗口至少要先人工确认：

```text
回滚目标版本
运行配置 profile
密钥来源
数据库迁移方向
发布包清单
部署回滚证据
```

Node 只允许消费并渲染 checklist：

```ts
nodeMayConsume: true,
nodeMayRenderChecklist: true,
nodeMayTriggerRollback: false,
nodeMayExecuteRollbackSql: false,
nodeMayModifyRuntimeConfig: false,
nodeMayReadSecretValues: false,
requiresUpstreamActionsEnabled: false,
```

这里特别重要的是 `nodeMayReadSecretValues: false`。Node 只确认 secret source，不读取 secret value。

## mini-kv v66 handoff 引用

mini-kv 侧引用是：

```ts
const MINI_KV_V66_RESTORE_HANDOFF: MiniKvRestoreCompatibilityHandoffReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v66",
  evidenceTag: "第六十六版恢复兼容交接样本",
  handoffVersion: "mini-kv-restore-compatibility-handoff.v1",
  manifestPath: "fixtures/release/restore-compatibility-handoff.json",
  archivePath: "c/66",
  projectVersion: "0.66.0",
```

人工确认项是：

```ts
manualConfirmationIds: [
  "binary-compatibility",
  "wal-compatibility",
  "snapshot-compatibility",
  "fixture-compatibility",
],
```

这对应 mini-kv 作为基础设施实验位的四个恢复风险面：

```text
二进制兼容
WAL 兼容
Snapshot 兼容
fixture 兼容
```

危险命令仍然只通过 `CHECKJSON` 覆盖：

```ts
readOnlySmokeCommands: [
  "INFOJSON",
  "CHECKJSON LOAD data/restore.snap",
  "CHECKJSON COMPACT",
  "CHECKJSON SETNXEX restore:token 30 value",
  "STORAGEJSON",
  "HEALTH",
  "GET restore:token",
  "QUIT",
],
writeCommandsExecuted: false,
adminCommandsExecuted: false,
restoreExecutionAllowed: false,
```

这说明恢复兼容证据不是 restore 脚本。

## checklist 摘要

返回的 checklist 段包含：

```ts
checklist: {
  checklistDigest,
  previousBundleGateDigest: previousGate.gate.gateDigest,
  previousBundleGateVersion: previousGate.profileVersion,
  javaVersion: JAVA_V57_ROLLBACK_HANDOFF.plannedVersion,
  javaHandoffVersion: JAVA_V57_ROLLBACK_HANDOFF.handoffVersion,
  miniKvVersion: MINI_KV_V66_RESTORE_HANDOFF.plannedVersion,
  miniKvHandoffVersion: MINI_KV_V66_RESTORE_HANDOFF.handoffVersion,
  nodeBaselineTag: "v165",
  windowMode: "manual-readiness-checklist-only",
```

`previousBundleGateDigest` 把 v166 与 v165 的 release bundle gate 串起来。

`nodeBaselineTag: "v165"` 说明 v166 是 release bundle gate 后的自然推进。

执行边界继续写在同一个对象里：

```ts
nodeMayRenderChecklist: true,
nodeMayTriggerJavaRollback: false,
nodeMayExecuteJavaRollbackSql: false,
nodeMayModifyRuntimeConfig: false,
nodeMayExecuteMiniKvRestore: false,
nodeMayExecuteMiniKvAdminCommands: false,
automaticUpstreamStart: false,
mutatesUpstreamState: false,
runtimeFileRead: false,
productionRollbackAuthorized: false,
```

调用方读 JSON 就能知道：Node 只渲染 checklist，不执行真实动作。

## check 逻辑

Java handoff 的确认项 check：

```ts
javaRequiredConfirmationsComplete: JAVA_V57_ROLLBACK_HANDOFF.requiredConfirmationFields.length === 6
  && JAVA_V57_ROLLBACK_HANDOFF.requiredConfirmationFields.includes("artifact-version-target")
  && JAVA_V57_ROLLBACK_HANDOFF.requiredConfirmationFields.includes("database-migration-direction"),
```

它确保 artifact version 和 database migration direction 这些高风险确认项没有缺失。

Java 执行边界 check：

```ts
javaCannotExecuteRollbackSql: !JAVA_V57_ROLLBACK_HANDOFF.nodeMayExecuteRollbackSql
  && !JAVA_V57_ROLLBACK_HANDOFF.rollbackSqlExecutionAllowed,
```

这保证 checklist 不会退化成 SQL 执行入口。

secret 边界 check：

```ts
javaCannotReadSecrets: !JAVA_V57_ROLLBACK_HANDOFF.nodeMayReadSecretValues
  && !JAVA_V57_ROLLBACK_HANDOFF.nodeMayModifyRuntimeConfig,
```

它把“确认 secret source”和“读取 secret value”分开。

mini-kv 危险命令 check：

```ts
miniKvDangerousCommandsExplainedOnly:
  MINI_KV_V66_RESTORE_HANDOFF.readOnlySmokeCommands.includes("CHECKJSON LOAD data/restore.snap")
  && MINI_KV_V66_RESTORE_HANDOFF.readOnlySmokeCommands.includes("CHECKJSON COMPACT")
  && MINI_KV_V66_RESTORE_HANDOFF.readOnlySmokeCommands.includes("CHECKJSON SETNXEX restore:token 30 value"),
```

这确保 LOAD、COMPACT、SETNXEX 都被解释型覆盖。

mini-kv 执行边界 check：

```ts
miniKvWriteAdminRestoreNotExecuted: !MINI_KV_V66_RESTORE_HANDOFF.writeCommandsExecuted
  && !MINI_KV_V66_RESTORE_HANDOFF.adminCommandsExecuted
  && !MINI_KV_V66_RESTORE_HANDOFF.restoreExecutionAllowed,
```

这说明 v166 不执行 mini-kv restore 或 admin 命令。

checklist 自身也自检 dry-run：

```ts
checklistStepsDryRunOnly: checklistSteps.length === 6
  && checklistSteps.every((step) => (
    step.dryRunOnly
    && step.readOnly
    && !step.mutatesState
    && !step.executesRollback
    && !step.executesRestore
  )),
```

## checklist steps

v166 有 6 个步骤。

第 1 步由 operator 确认窗口 owner、artifact target、runtime profile 和 secret source：

```ts
{
  order: 1,
  phase: "prepare",
  source: "operator",
  action: "Confirm rollback window owner, artifact target, runtime profile, and secret source outside Node.",
```

第 2 步复核 Java handoff：

```ts
{
  order: 2,
  phase: "confirm",
  source: "java",
  action: "Review Java rollback approval handoff and database migration direction.",
```

第 3 步复核 mini-kv handoff：

```ts
{
  order: 3,
  phase: "confirm",
  source: "mini-kv",
  action: "Review mini-kv restore compatibility handoff for binary, WAL, Snapshot, and fixture compatibility.",
```

第 4 步由 Node 做边界比较：

```ts
{
  order: 4,
  phase: "compare",
  source: "node",
  action: "Compare Java rollback approval fields with mini-kv restore compatibility boundaries.",
```

第 5 步明确有疑问就暂停。

第 6 步要求另起 post-v166 计划，不在旧计划继续堆：

```ts
expectedEvidence: "v166 closes this readiness stage without opening production rollback authority.",
```

## forbidden operations

本版明确禁止：

```ts
{
  operation: "Trigger Java rollback from Node v166",
  reason: "Java v57 handoff allows Node to render checklist evidence only.",
  blockedBy: "Java v57 rollback approval handoff",
},
```

禁止 SQL 回滚：

```ts
{
  operation: "Execute database rollback SQL",
  reason: "Java v57 marks database migration direction as operator-confirmed and rollback SQL execution as false.",
  blockedBy: "Java v57 rollback approval handoff",
},
```

禁止 mini-kv restore/admin：

```ts
{
  operation: "Execute mini-kv restore or admin commands",
  reason: "mini-kv v66 marks restore_execution_allowed=false and admin_commands_executed=false.",
  blockedBy: "mini-kv v66 restore compatibility handoff",
},
```

禁止把 mini-kv 恢复当成 Java 订单权威：

```ts
{
  operation: "Treat mini-kv restore as Java order authority",
  reason: "mini-kv restore compatibility cannot create Java order authoritative state.",
  blockedBy: "mini-kv v66 restore compatibility handoff",
},
```

这些 forbidden operations 是 v166 最重要的生产安全边界。

## Markdown 渲染

v166 继续复用 v164 的公共渲染 helper：

```ts
return renderReleaseReportMarkdown({
  title: "Rollback window readiness checklist",
  header: {
    Service: profile.service,
    "Generated at": profile.generatedAt,
    "Profile version": profile.profileVersion,
    "Checklist state": profile.checklistState,
```

章节定义为：

```ts
sections: [
  { heading: "Checklist", entries: profile.checklist },
  { heading: "Checks", entries: profile.checks },
  { heading: "Previous Release Bundle Gate", entries: profile.artifacts.previousReleaseBundleGate },
  { heading: "Java Rollback Approval Handoff", entries: profile.artifacts.javaRollbackApprovalHandoff },
  {
    heading: "mini-kv Restore Compatibility Handoff",
    entries: profile.artifacts.miniKvRestoreCompatibilityHandoff,
  },
  { heading: "Node Checklist Envelope", entries: profile.artifacts.nodeChecklistEnvelope },
  { heading: "Summary", entries: profile.summary },
],
```

这让 v166 保持和 v162-v165 一样的 JSON/Markdown 双格式报告形态。

## 路由接入

`src/routes/statusRoutes.ts` 新增 import：

```ts
import {
  loadRollbackWindowReadinessChecklist,
  renderRollbackWindowReadinessChecklistMarkdown,
} from "../services/rollbackWindowReadinessChecklist.js";
```

新增路由：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/rollback-window-readiness-checklist",
  () => Promise.resolve(loadRollbackWindowReadinessChecklist(deps.config)),
  renderRollbackWindowReadinessChecklistMarkdown,
);
```

它沿用已有生产报告的 JSON/Markdown 双格式路由模式。

## 测试覆盖

新增测试：

```text
test/rollbackWindowReadinessChecklist.test.ts
```

第一组测试校验 ready profile：

```ts
expect(profile).toMatchObject({
  profileVersion: "rollback-window-readiness-checklist.v1",
  checklistState: "ready-for-manual-window-review",
  readyForRollbackWindowReadinessChecklist: true,
  readyForProductionRollback: false,
  readyForProductionOperations: false,
  readOnly: true,
  dryRunOnly: true,
  executionAllowed: false,
```

测试还校验 26 个 check 全部通过：

```ts
summary: {
  checklistCheckCount: 26,
  passedChecklistCheckCount: 26,
  handoffCount: 2,
  checklistStepCount: 6,
  forbiddenOperationCount: 8,
  productionBlockerCount: 0,
},
```

第二组测试打开：

```ts
{ UPSTREAM_ACTIONS_ENABLED: "true" }
```

然后断言：

```ts
expect(profile.checklistState).toBe("blocked");
expect(profile.readyForRollbackWindowReadinessChecklist).toBe(false);
expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
```

这证明运行时动作开关仍然能阻断 checklist。

第三组测试覆盖路由：

```ts
url: "/api/v1/production/rollback-window-readiness-checklist"
url: "/api/v1/production/rollback-window-readiness-checklist?format=markdown"
```

并确认 Markdown 包含：

```text
Rollback window readiness checklist
Java v57
mini-kv v66
START_POST_V166_PLAN
```

## 运行与归档

本版验证：

```text
npm run typecheck
npm test -- --run test/rollbackWindowReadinessChecklist.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

归档：

```text
c/166/图片/rollback-window-readiness-checklist.png
c/166/解释/运行调试说明.md
```

HTTP smoke 只启动 Node 本地服务，且保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

截图完成后 Node 进程已停止。

## 成熟度变化

v166 完成了 v163 衍生计划的最后一段。

成熟度提升点：

```text
Java rollback approval handoff 与 mini-kv restore compatibility handoff 有统一 checklist
Node 能输出跨项目 rollback window readiness 证据
secret、database、rollback SQL、mini-kv restore 的边界被显式写入 JSON
v163-v166 形成 release bundle -> handoff -> rollback window 的完整生产交付硬化链路
```

仍未解决的点：

```text
没有真实生产 IdP
没有真实生产 secret manager
没有真实生产 database/rollback rehearsal
没有 CI 强制三项目版本配套
没有真实 rollback execution workflow
```

这些应该进入 post-v166 新计划，而不是继续塞在 v163 旧计划里。

## 一句话总结

v166 把 Java v57 与 mini-kv v66 的人工 handoff 合成了 Node rollback window readiness checklist，完成了一条接近生产流程的只读回滚窗口准备链路，但仍不打开真实回滚、恢复、密钥或数据库执行权限。
