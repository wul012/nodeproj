# 第一百六十九版代码讲解：post-v166 readiness summary

本版目标是把 Node v167 和 Node v168 的证据做成一个阶段总结。

它解决的问题是：

```text
Node v167 已经生成 rollback execution preflight contract；
Node v168 已经生成 production environment preflight checklist；
现在需要一次阶段总结，说明 post-v166 生产化缺口到底收敛到了哪里；
同时旧计划不能继续无限追加，必须另起新计划。
```

所以 v169 是 post-v166 readiness summary，不是新的执行入口。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v166-post-rollback-window-roadmap.md
```

本版完成后，旧计划收口：

```text
docs/plans/v166-post-rollback-window-roadmap.md
```

并新增下一阶段计划：

```text
docs/plans/v169-post-production-environment-preflight-roadmap.md
```

下一步进入：

```text
推荐并行 Java v60 + mini-kv v69
Node v170 等待两边完成后再消费
```

## 新增服务文件

新增文件：

```text
src/services/postV166ReadinessSummary.ts
```

主入口是：

```ts
export function loadPostV166ReadinessSummary(config: AppConfig): PostV166ReadinessSummaryProfile {
  const rollbackPreflight = loadRollbackExecutionPreflightContract(config);
  const environmentPreflight = loadProductionEnvironmentPreflightChecklist(config);
  const checks = createChecks(config, rollbackPreflight, environmentPreflight);
```

这里明确消费两个前置 Node 证据：

```ts
const rollbackPreflight = loadRollbackExecutionPreflightContract(config);
const environmentPreflight = loadProductionEnvironmentPreflightChecklist(config);
```

也就是说，v169 不重新发明 Java/mini-kv 证据，而是总结 v167/v168 已经形成的 Node evidence chain。

## profile 结构

核心类型是：

```ts
export interface PostV166ReadinessSummaryProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "post-v166-readiness-summary.v1";
  summaryState: SummaryState;
  readyForPostV166ReadinessSummary: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
```

这几个字段明确表达：

```text
阶段总结可以完成
生产回滚仍不允许
生产操作仍不允许
接口仍然只读
```

## summary ready 判断

ready 判断不是只看一个字段，而是要求前置证据和安全边界都成立：

```ts
const summaryReady = checks.rollbackExecutionPreflightReady
  && checks.productionEnvironmentPreflightReady
  && checks.rollbackPreflightDigestPresent
  && checks.environmentChecklistDigestPresent
  && checks.executionStillBlocked
  && checks.secretValueAccessStillBlocked
  && checks.productionDatabaseStillBlocked
  && checks.miniKvRestoreStillBlocked
  && checks.upstreamActionsStillDisabled
  && checks.automaticUpstreamStartDisabled;
```

这说明 v169 不是流水账 summary，而是把“证据存在”和“危险动作仍被阻断”一起验证。

## stage 摘要

返回的 stage 段包含：

```ts
stage: {
  stageDigest,
  stageName: "post-v166-production-gap-closure",
  sourcePlan: "docs/plans/v166-post-rollback-window-roadmap.md",
  nextPlan: "docs/plans/v169-post-production-environment-preflight-roadmap.md",
  nodeBaselineTag: "v168",
```

`sourcePlan` 和 `nextPlan` 同时出现，是为了避免后续计划重叠。

总结版本列表：

```ts
summarizedVersions: [
  "Node v167 rollback execution preflight contract",
  "Node v168 production environment preflight checklist",
],
```

## v167 摘要

v169 对 v167 的摘要来自：

```ts
function summarizeRollbackPreflight(profile: RollbackExecutionPreflightContractProfile) {
  return {
    profileVersion: profile.profileVersion,
    contractState: profile.contractState,
    contractDigest: profile.contract.contractDigest,
    javaVersion: profile.contract.javaVersion,
    miniKvVersion: profile.contract.miniKvVersion,
```

这里保留了 `contractDigest`，让阶段总结可以追溯 v167 的 preflight contract。

同时保留关键安全字段：

```ts
readyForRollbackExecutionPreflightContract: profile.readyForRollbackExecutionPreflightContract,
readyForProductionRollback: profile.readyForProductionRollback,
executionAllowed: profile.executionAllowed,
```

也就是说，v167 是 ready for manual preflight review，不是 ready for rollback。

## v168 摘要

v169 对 v168 的摘要来自：

```ts
function summarizeEnvironmentPreflight(
  profile: ProductionEnvironmentPreflightChecklistProfile,
) {
  return {
    profileVersion: profile.profileVersion,
    checklistState: profile.checklistState,
    checklistDigest: profile.checklist.checklistDigest,
    javaVersion: profile.checklist.javaVersion,
    miniKvVersion: profile.checklist.miniKvVersion,
```

这里保留了 `checklistDigest`，让阶段总结可以追溯 v168 的 environment checklist。

关键安全字段是：

```ts
readyForProductionEnvironmentPreflightChecklist: profile.readyForProductionEnvironmentPreflightChecklist,
readyForProductionRollback: profile.readyForProductionRollback,
readyForProductionOperations: profile.readyForProductionOperations,
executionAllowed: profile.executionAllowed,
```

也就是说，v168 是 ready for manual environment review，不是 ready for production operations。

## check 逻辑

v167 ready：

```ts
rollbackExecutionPreflightReady: rollbackPreflight.readyForRollbackExecutionPreflightContract
  && rollbackPreflight.contractState === "ready-for-manual-preflight-review",
```

v168 ready：

```ts
productionEnvironmentPreflightReady: environmentPreflight.readyForProductionEnvironmentPreflightChecklist
  && environmentPreflight.checklistState === "ready-for-manual-environment-review",
```

secret source 证据已消费：

```ts
secretSourceEvidenceConsumed: environmentPreflight.checklist.javaVersion === "Java v59"
  && environmentPreflight.checks.javaSecretValuesClosed,
```

artifact digest 证据已消费：

```ts
artifactDigestEvidenceConsumed: environmentPreflight.checklist.miniKvVersion === "mini-kv v68"
  && environmentPreflight.checks.miniKvDigestMatrixComplete,
```

危险动作仍被阻断：

```ts
secretValueAccessStillBlocked: environmentPreflight.checks.javaSecretValuesClosed
  && environmentPreflight.checklist.nodeMayReadSecretValues === false,
productionDatabaseStillBlocked: environmentPreflight.checks.noProductionDatabaseConnection
  && environmentPreflight.checklist.nodeMayConnectProductionDatabase === false,
miniKvRestoreStillBlocked: environmentPreflight.checks.miniKvExecutionBoundariesClosed
  && environmentPreflight.checklist.nodeMayExecuteMiniKvRestore === false,
```

这些 check 让 v169 的总结有实质含义。

## categories

v169 有 5 个类别：

```ts
| "rollback-execution-preflight"
| "production-environment-preflight"
| "secret-and-digest-evidence"
| "execution-safety"
| "remaining-production-blockers";
```

前 4 个类别通过，最后一个类别阻塞：

```text
remaining-production-blockers
```

原因是：

```ts
note: "The stage is summarized, but real production integrations still do not exist.",
```

这符合当前阶段目标：靠近生产级，但不假装已经生产可执行。

## production blockers

本版明确剩余 4 个生产阻塞：

```ts
REAL_SECRET_MANAGER_NOT_CONNECTED
PRODUCTION_DATABASE_NOT_CONNECTED
REAL_PRODUCTION_IDP_NOT_CONNECTED
PRODUCTION_ROLLBACK_APPROVAL_NOT_CONNECTED
```

这些 blocker 是刻意保留的，不应该被 v169 消除。

例如：

```ts
addMessage(blockers, checks.realSecretManagerConnected, "REAL_SECRET_MANAGER_NOT_CONNECTED", "future-production-integration", "A real secret manager/source integration is still required before production operations.");
```

这里 `realSecretManagerConnected` 当前固定为 `false`，所以 blocker 会出现。

## 路由接入

`src/routes/statusRoutes.ts` 新增：

```ts
import {
  loadPostV166ReadinessSummary,
  renderPostV166ReadinessSummaryMarkdown,
} from "../services/postV166ReadinessSummary.js";
```

新增路由：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/post-v166-readiness-summary",
  () => Promise.resolve(loadPostV166ReadinessSummary(deps.config)),
  renderPostV166ReadinessSummaryMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/postV166ReadinessSummary.test.ts
```

第一组测试校验完整 summary：

```ts
expect(profile).toMatchObject({
  summaryVersion: "post-v166-readiness-summary.v1",
  summaryState: "completed-with-production-blockers",
  readyForPostV166ReadinessSummary: true,
  readyForProductionRollback: false,
  readyForProductionOperations: false,
```

还校验类别：

```ts
expect(profile.categories.map((category) => [category.id, category.status])).toEqual([
  ["rollback-execution-preflight", "pass"],
  ["production-environment-preflight", "pass"],
  ["secret-and-digest-evidence", "pass"],
  ["execution-safety", "pass"],
  ["remaining-production-blockers", "blocked"],
]);
```

第二组测试打开：

```ts
{ UPSTREAM_ACTIONS_ENABLED: "true" }
```

然后断言 summary 被阻断。

第三组测试覆盖 JSON/Markdown 路由。

## 计划收口

v169 修改旧计划：

```text
docs/plans/v166-post-rollback-window-roadmap.md
```

把它标记为：

```text
已完成并收口
```

同时新增：

```text
docs/plans/v169-post-production-environment-preflight-roadmap.md
```

新计划第一步写清楚：

```text
下一步推荐并行：Java v60 + mini-kv v69
```

这样后续不会继续往同一份旧计划里追加重叠版本。

## 运行与归档

本版验证：

```text
npm run typecheck
npm test -- --run test/postV166ReadinessSummary.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

归档：

```text
c/169/图片/post-v166-readiness-summary.png
c/169/解释/运行调试说明.md
```

HTTP smoke 只启动 Node 本地服务，且保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

截图完成后 Node 进程已停止。

## 成熟度变化

v169 让生产化推进从“不断补单点证据”升级为“阶段收口 + 下一阶段计划”。

成熟度提升点：

```text
v167/v168 evidence chain 被统一总结
旧计划明确收口
新计划明确推荐并行 Java v60 + mini-kv v69
真实生产阻塞项被保留，而不是假装消失
```

仍未解决的点：

```text
没有真实 secret manager
没有 production database access
没有真实 production IdP
没有真实 rollback approval workflow
没有 mini-kv restore approval workflow
```

这些进入 v169 衍生新计划。

## 一句话总结

v169 把 post-v166 的生产化证据链做了一次真正的阶段收口：v167/v168 已经可作为人工 preflight review 证据，但真实 secret manager、production database、production IdP 和 rollback approval 仍然阻塞生产执行，后续必须按新计划继续推进。
