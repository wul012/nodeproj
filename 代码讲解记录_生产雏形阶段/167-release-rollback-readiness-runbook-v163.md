# 第一百六十三版代码讲解：release rollback readiness runbook

本版目标是把 Java v55 和 mini-kv v64 的回滚证据合成一个跨项目 release rollback readiness runbook。

它解决的问题是：

```text
Java v55 已经提供 deployment rollback evidence sample；
mini-kv v64 已经提供 runtime artifact rollback evidence sample；
Node v163 要把两边放进同一个人工 dry-run 回滚窗口准备清单里；
同时明确 Node 不能触发 Java rollback，不能执行 mini-kv LOAD/COMPACT/SETNXEX，也不能把 runbook 当成生产回滚批准。
```

本版不是执行回滚，不是启动上游，不是发起 Java 写入，也不是执行 mini-kv 管理命令。它是一个可审查、可归档、可被后续 release bundle / rollback window 计划引用的人工 dry-run runbook。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v161-post-controlled-idempotency-drill-roadmap.md
```

计划要求：

```text
Node v163：release rollback readiness runbook
必须等待 Java v55 和 mini-kv v64 都完成后再做
引用 Java v55 rollback evidence
引用 mini-kv v64 rollback evidence
默认只读或 dry-run
不自动启动 Java / mini-kv
```

推进前只读核对到：

```text
Java HEAD/tag = v55 deployment rollback evidence sample
mini-kv HEAD/tag = v64 runtime artifact rollback evidence
```

所以 v163 可以继续。完成后，本计划收口，并新建：

```text
docs/plans/v163-post-rollback-readiness-roadmap.md
```

## 新增服务

新增文件：

```text
src/services/releaseRollbackReadinessRunbook.ts
```

入口函数：

```ts
export function loadReleaseRollbackReadinessRunbook(config: AppConfig): ReleaseRollbackReadinessRunbookProfile {
```

它只接收 `AppConfig`，没有接收 Java client、mini-kv client 或 approval ledger。这说明 v163 不调用 Java HTTP，不连接 mini-kv TCP，也不创建真实审批记录。它只是消费版本证据语义，生成 rollback readiness runbook。

## 依赖 v162 intake gate

v163 不是脱离上下文的新 summary，而是继续消费 v162：

```ts
const previousIntakeGate = loadCrossProjectReleaseVerificationIntakeGate(config);
```

后续检查会确认：

```ts
previousIntakeGateReady: previousIntakeGate.readyForCrossProjectReleaseVerificationIntakeGate
  && previousIntakeGate.gateState === "ready-for-release-verification-intake",
previousGateDoesNotAuthorizeRelease: previousIntakeGate.readyForProductionRelease === false
  && !previousIntakeGate.executionAllowed,
```

这保证 v163 的前置不是“文档说完成了”，而是 Node v162 的 release verification intake gate 本身仍然 ready，且没有授权生产发布。

## Java v55 回滚证据引用

Java 侧引用：

```ts
const JAVA_V55_DEPLOYMENT_ROLLBACK: JavaDeploymentRollbackEvidenceReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v55",
  evidenceTag: "java-v55-deployment-rollback-evidence-sample",
  evidenceVersion: "java-deployment-rollback-evidence.v1",
  scenario: "DEPLOYMENT_ROLLBACK_EVIDENCE_SAMPLE",
  evidenceEndpoint: "/contracts/deployment-rollback-evidence.sample.json",
  sourceEvidenceEndpoint: "/api/v1/ops/evidence",
  archivePath: "c/55",
```

这里锁定了 Java v55 的核心变化：

```text
evidenceVersion=java-deployment-rollback-evidence.v1
evidenceEndpoint=/contracts/deployment-rollback-evidence.sample.json
archivePath=c/55
```

也就是说 Java 已经能提供部署回滚边界证据，但 Node 不执行回滚。

## Java 回滚边界字段

Java 引用里最重要的是这几项：

```ts
rollbackSubjects: [
  "java-package",
  "runtime-configuration",
  "database-migrations",
  "static-contracts",
] as JavaDeploymentRollbackEvidenceReference["rollbackSubjects"],
databaseMigrationRollbackAutomatic: false,
databaseMigrationRequiresOperatorConfirmation: true,
requiredOperatorConfirmations: [
  "artifact-version-target",
  "configuration-secret-source",
  "database-migration-direction",
],
nodeMayTriggerRollback: false,
nodeMayExecuteMaven: false,
nodeMayTriggerJavaWrites: false,
```

控制面读到后应该理解为：

```text
Java 回滚边界覆盖包、运行配置、数据库迁移、静态契约；
数据库迁移回滚不能自动执行；
必须由操作员确认 artifact version、secret source、migration direction；
Node 可以读证据，但不能触发 Java rollback，也不能跑 Maven。
```

这和 v55 的真实样本一致：它是 read-only boundary sample，不是 rollback executor。

## mini-kv v64 回滚证据引用

mini-kv 侧引用：

```ts
const MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK: MiniKvRuntimeArtifactRollbackEvidenceReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v64",
  evidenceTag: "mini-kv-v64-runtime-artifact-rollback-evidence",
  evidenceVersion: "mini-kv-runtime-artifact-rollback.v1",
  evidencePath: "fixtures/release/runtime-artifact-rollback-evidence.json",
  releaseManifestPath: "fixtures/release/verification-manifest.json",
  archivePath: "c/64",
```

这里明确 mini-kv v64 的证据入口：runtime artifact rollback evidence fixture 和 release manifest。

## mini-kv 回滚边界字段

mini-kv v64 的关键字段进入 Node：

```ts
artifactIds: [
  "binary-version",
  "wal",
  "snapshot",
  "fixtures",
] as MiniKvRuntimeArtifactRollbackEvidenceReference["artifactIds"],
readOnlySmokeCommands: [
  "INFOJSON",
  "CHECKJSON LOAD data/rollback.snap",
  "CHECKJSON COMPACT",
  "CHECKJSON SETNXEX rollback:token 30 value",
  "STORAGEJSON",
  "HEALTH",
  "GET rollback:token",
  "QUIT",
],
writeCommandsExecuted: false,
adminCommandsExecuted: false,
orderAuthoritative: false,
connectedToJavaTransactionChain: false,
cannotForgeJavaOrderState: true,
```

控制面读到后应该理解为：

```text
mini-kv v64 覆盖 binary/version、WAL、Snapshot、fixtures；
LOAD / COMPACT / SETNXEX 只能通过 CHECKJSON 解释风险，不执行；
真实 smoke 验证 rollback:token 仍然不存在；
mini-kv 不是订单权威，也不能伪造 Java order authority。
```

这让 Node 能把 C++ 侧的回滚风险放进同一个 runbook，但不会把 mini-kv 误当作 Java 交易系统的一部分。

## runbook digest

v163 生成 `runbookDigest`：

```ts
const runbookDigest = digestRunbook({
  profileVersion: "release-rollback-readiness-runbook.v1",
  previousIntakeGateDigest: previousIntakeGate.gate.gateDigest,
  javaVersion: JAVA_V55_DEPLOYMENT_ROLLBACK.plannedVersion,
  javaEvidenceVersion: JAVA_V55_DEPLOYMENT_ROLLBACK.evidenceVersion,
  miniKvVersion: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.plannedVersion,
  miniKvEvidenceVersion: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.evidenceVersion,
  rollbackMode: "manual-dry-run-only",
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  operatorSteps: operatorSteps.map((step) => ({
    order: step.order,
    phase: step.phase,
    evidenceTarget: step.evidenceTarget,
  })),
  forbiddenOperations: forbiddenOperations.map((operation) => operation.operation),
  checks,
});
```

这个 digest 绑定：

```text
v162 intake gate digest
Java v55 rollback evidence version
mini-kv v64 rollback evidence version
operator steps
forbidden operations
runtime safety 开关
```

所以它不是单纯文档 hash，而是 rollback readiness runbook 的核心证据摘要。

## runbook 状态

v163 返回：

```ts
runbookState,
readyForReleaseRollbackReadinessRunbook: checks.readyForReleaseRollbackReadinessRunbook,
readyForProductionRollback: false,
readyForProductionOperations: false,
readOnly: true,
dryRunOnly: true,
executionAllowed: false,
```

这几个字段表达本版的核心边界：

```text
runbook 可以 ready；
production rollback 仍然 false；
production operations 仍然 false；
整个 profile 只读，且 dry-run only。
```

也就是说，v163 是“回滚窗口准备清单”，不是“回滚按钮”。

## checks 设计

v163 有 26 个检查项：

```ts
summary: {
  runbookCheckCount: countReportChecks(checks),
  passedRunbookCheckCount: countPassedReportChecks(checks),
  rollbackEvidenceCount: 2,
  operatorStepCount: operatorSteps.length,
  forbiddenOperationCount: forbiddenOperations.length,
```

其中最关键的检查包括：

```ts
javaNodeRollbackForbidden: !JAVA_V55_DEPLOYMENT_ROLLBACK.nodeMayTriggerRollback,
javaMavenExecutionForbidden: !JAVA_V55_DEPLOYMENT_ROLLBACK.nodeMayExecuteMaven,
javaDatabaseRollbackNotAutomatic: !JAVA_V55_DEPLOYMENT_ROLLBACK.databaseMigrationRollbackAutomatic,
miniKvWriteCommandsNotExecuted: !MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.writeCommandsExecuted,
miniKvAdminCommandsNotExecuted: !MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.adminCommandsExecuted,
miniKvOrderAuthoritativeFalse: !MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.orderAuthoritative
  && MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.cannotForgeJavaOrderState,
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

这些检查把三项目回滚边界压住：

```text
Node 不触发 Java rollback；
Node 不执行 Java Maven；
Java 数据库迁移回滚不是自动动作；
mini-kv 不执行写命令或管理命令；
mini-kv 不是 Java order authority；
UPSTREAM_ACTIONS_ENABLED 必须保持 false。
```

## operator steps

v163 定义了 6 个人工步骤：

```ts
function createOperatorSteps(): ReleaseRollbackReadinessStep[] {
```

每一步都有相同的安全约束：

```ts
dryRunOnly: true,
readOnly: true,
mutatesState: false,
executesRollback: false,
```

六步大致是：

```text
1. 操作员确认 rollback target 和 UPSTREAM_ACTIONS_ENABLED=false
2. 复核 Java v55 deployment rollback evidence
3. 复核 mini-kv v64 runtime artifact rollback evidence
4. Node 比较 Java rollback subjects 与 mini-kv runtime boundaries
5. 有生产密钥、生产数据库、版本兼容疑问时暂停
6. 归档 runbook，并另起 post-v163 计划
```

## forbidden operations

v163 显式列出 7 个禁止动作：

```ts
function createForbiddenOperations(): ReleaseRollbackForbiddenOperation[] {
```

其中最重要的是：

```ts
{
  operation: "Trigger Java deployment rollback from Node",
  reason: "Java v55 evidence is a boundary sample and sets nodeMayTriggerRollback=false.",
  blockedBy: "Java v55 rollback evidence",
},
{
  operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX during rollback readiness",
  reason: "mini-kv v64 uses CHECKJSON to inspect rollback-sensitive commands without executing them.",
  blockedBy: "mini-kv v64 rollback evidence",
},
{
  operation: "Treat this runbook as production rollback approval",
  reason: "v163 is readiness evidence only and does not authorize production rollback.",
  blockedBy: "Node v163 runbook",
},
```

这几个 forbidden operations 是本版的安全核心：能解释回滚，但不能执行回滚。

## 路由注册

路由在 `src/routes/statusRoutes.ts` 注册：

```ts
import {
  loadReleaseRollbackReadinessRunbook,
  renderReleaseRollbackReadinessRunbookMarkdown,
} from "../services/releaseRollbackReadinessRunbook.js";
```

实际 endpoint：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/release-rollback-readiness-runbook",
  () => Promise.resolve(loadReleaseRollbackReadinessRunbook(deps.config)),
  renderReleaseRollbackReadinessRunbookMarkdown,
);
```

它沿用现有 JSON/Markdown 双格式报告路由模式，所以既能被 API 客户端消费，也能被 Chrome 截图归档。

## 测试覆盖

新增测试：

```text
test/releaseRollbackReadinessRunbook.test.ts
```

第一组测试验证正常 ready：

```ts
expect(profile).toMatchObject({
  profileVersion: "release-rollback-readiness-runbook.v1",
  runbookState: "ready-for-manual-dry-run",
  readyForReleaseRollbackReadinessRunbook: true,
  readyForProductionRollback: false,
  readyForProductionOperations: false,
  readOnly: true,
  dryRunOnly: true,
  executionAllowed: false,
```

第二组测试验证安全开关：

```ts
const profile = loadReleaseRollbackReadinessRunbook(loadTestConfig(
  "memory://release-rollback-readiness-runbook-blocked",
  { UPSTREAM_ACTIONS_ENABLED: "true" },
));

expect(profile.runbookState).toBe("blocked");
expect(profile.readyForReleaseRollbackReadinessRunbook).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
```

第三组测试验证路由：

```ts
const json = await app.inject({
  method: "GET",
  url: "/api/v1/production/release-rollback-readiness-runbook",
  headers,
});
const markdown = await app.inject({
  method: "GET",
  url: "/api/v1/production/release-rollback-readiness-runbook?format=markdown",
  headers,
});
```

这保证 v163 既有 JSON 消费面，也有 Markdown 截图面。

## 计划文件更新

本版更新旧计划：

```text
docs/plans/v161-post-controlled-idempotency-drill-roadmap.md
```

把 Java v55、mini-kv v64、Node v163 标为已完成，并说明本计划收口。

同时新增：

```text
docs/plans/v163-post-rollback-readiness-roadmap.md
```

新计划明确下一步：

```text
推荐并行：Java v56 + mini-kv v65
Node v164 必须等待 Java v56 和 mini-kv v65 都完成后再做
```

这符合“版本做完后另起计划，不在同一份计划里无限追加”的规则。

## 运行与归档

本版验证：

```text
npm run typecheck
npm test -- --run test/releaseRollbackReadinessRunbook.test.ts test/crossProjectReleaseVerificationIntakeGate.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

归档：

```text
c/163/图片/release-rollback-readiness-runbook.png
c/163/解释/运行调试说明.md
```

HTTP smoke 只启动 Node 本地服务，且保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

截图完成后 Node 进程已停止。

## 成熟度变化

v163 让项目从“跨项目 release verification intake”推进到“跨项目 rollback readiness dry-run”。

成熟度提升点：

```text
Java deployment rollback evidence 能被 Node 消费；
mini-kv runtime artifact rollback evidence 能被 Node 消费；
Node 明确不能执行真实 rollback；
operator confirmation、pause conditions、forbidden operations 进入同一个 runbook；
后续可以自然进入 release bundle / approval handoff / rollback window readiness。
```

但还没有完成：

```text
真实生产回滚执行权限
真实生产数据库/密钥/IdP 接入
统一 CI release bundle gate
rollback approval handoff
真实 rollback window checklist
```

## 一句话总结

v163 把 Java v55 与 mini-kv v64 的回滚证据合成只读 dry-run runbook，让三项目具备更像生产流程的回滚准备能力，但仍明确不授权、不执行任何真实生产回滚。
