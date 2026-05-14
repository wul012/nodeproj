# 第一百六十八版代码讲解：production environment preflight checklist

本版目标是把 Java v59、mini-kv v68 和 Node v167 的证据合成 Node production environment preflight checklist。

它解决的问题是：

```text
Java v59 已经把 secret source、rotation owner、review cadence 和 secret value access boundary 固化成只读 contract；
mini-kv v68 已经把 binary/WAL/Snapshot/fixture digest compatibility 固化成只读 matrix；
Node v167 已经把 rollback execution preflight contract 做完；
Node 现在需要把这些生产环境前置条件合成一个 checklist；
但 Node 仍然不能读取 secret、不能连接生产数据库、不能执行 mini-kv restore、不能授权真实生产操作。
```

所以 v168 是 environment preflight checklist，不是生产环境切换器。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v166-post-rollback-window-roadmap.md
```

推进前只读核对到：

```text
Java tag：v59订单平台production-secret-source-contract
mini-kv tag：第六十八版产物摘要兼容矩阵
```

对应证据文件：

```text
Java: src/main/resources/static/contracts/production-secret-source-contract.sample.json
mini-kv: fixtures/release/artifact-digest-compatibility-matrix.json
```

因此 Node v168 可以按计划推进。

本版完成后，计划进入：

```text
Node v169：post-v166 readiness summary
```

## 新增服务文件

新增文件：

```text
src/services/productionEnvironmentPreflightChecklist.ts
```

主入口是：

```ts
export function loadProductionEnvironmentPreflightChecklist(
  config: AppConfig,
): ProductionEnvironmentPreflightChecklistProfile {
  const previousPreflight = loadRollbackExecutionPreflightContract(config);
  const preflightSteps = createPreflightSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousPreflight, preflightSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForProductionEnvironmentPreflightChecklist");
```

这里继续接在 Node v167 后面：

```ts
const previousPreflight = loadRollbackExecutionPreflightContract(config);
```

也就是说，v168 不绕过 rollback execution preflight contract，而是在它之后做生产环境 checklist。

## profile 结构

核心类型是：

```ts
export interface ProductionEnvironmentPreflightChecklistProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-environment-preflight-checklist.v1";
  checklistState: EnvironmentPreflightState;
  readyForProductionEnvironmentPreflightChecklist: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
```

这几个字段明确表达：

```text
可以进入人工环境前置检查
不能生产回滚
不能生产操作
不能执行
```

## Java v59 secret source contract 引用

Java 侧引用被固化为：

```ts
const JAVA_V59_SECRET_SOURCE_CONTRACT: JavaSecretSourceContractReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v59",
  evidenceTag: "v59订单平台production-secret-source-contract",
  contractVersion: "java-production-secret-source-contract.v1",
  scenario: "PRODUCTION_SECRET_SOURCE_CONTRACT_SAMPLE",
  contractEndpoint: "/contracts/production-secret-source-contract.sample.json",
  contractSource: "src/main/resources/static/contracts/production-secret-source-contract.sample.json",
  archivePath: "c/59",
```

v59 的关键字段是：

```ts
selectedSourceType: "external-secret-manager",
secretManagerOwner: "platform-security-owner",
rotationOwner: "security-operations-owner",
reviewCadence: "quarterly-or-before-production-cutover",
```

这里表达的是“secret 从哪里来、谁负责、多久复核”，不是 secret value。

Java 侧边界也直接写进常量：

```ts
nodeMayReadSecretValues: false,
nodeMayModifyRuntimeConfig: false,
requiresUpstreamActionsEnabled: false,
requiresProductionSecrets: false,
requiresProductionDatabase: false,
sourceValueRecorded: false,
secretNamesRecorded: false,
```

这说明 Node 只能消费 secret source contract，不能读 secret 值、不能写配置、不能连生产库。

## mini-kv v68 digest matrix 引用

mini-kv 侧引用是：

```ts
const MINI_KV_V68_DIGEST_MATRIX: MiniKvDigestCompatibilityMatrixReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v68",
  evidenceTag: "第六十八版产物摘要兼容矩阵",
  matrixVersion: "mini-kv-artifact-digest-compatibility-matrix.v1",
  matrixPath: "fixtures/release/artifact-digest-compatibility-matrix.json",
  archivePath: "c/68",
  projectVersion: "0.68.0",
```

digest matrix 的关键字段：

```ts
digestIds: [
  "binary-digest",
  "wal-checksum-evidence",
  "snapshot-digest-evidence",
  "fixture-digest",
],
```

只读 smoke 命令：

```ts
readOnlySmokeCommands: [
  "INFOJSON",
  "CHECKJSON LOAD data/digest-matrix.snap",
  "CHECKJSON COMPACT",
  "CHECKJSON SETNXEX digest:token 30 value",
  "STORAGEJSON",
  "HEALTH",
  "GET digest:token",
  "QUIT",
],
```

危险命令仍然只通过 `CHECKJSON` 解释，不真实执行。

## checklist 摘要

返回的 checklist 段包含：

```ts
checklist: {
  checklistDigest,
  previousPreflightDigest: previousPreflight.contract.contractDigest,
  previousPreflightVersion: previousPreflight.profileVersion,
  javaVersion: JAVA_V59_SECRET_SOURCE_CONTRACT.plannedVersion,
  javaContractVersion: JAVA_V59_SECRET_SOURCE_CONTRACT.contractVersion,
  miniKvVersion: MINI_KV_V68_DIGEST_MATRIX.plannedVersion,
  miniKvMatrixVersion: MINI_KV_V68_DIGEST_MATRIX.matrixVersion,
  nodeBaselineTag: "v167",
  environmentMode: "manual-environment-preflight-only",
```

`previousPreflightDigest` 把 v168 和 v167 串起来，避免环境 checklist 脱离 rollback execution preflight。

执行边界也在 checklist 内声明：

```ts
nodeMayReadSecretValues: false,
nodeMayModifyRuntimeConfig: false,
nodeMayExecuteMiniKvRestore: false,
nodeMayExecuteMiniKvAdminCommands: false,
nodeMayConnectProductionDatabase: false,
productionEnvironmentAuthorized: false,
productionRollbackAuthorized: false,
```

调用方看到 JSON 就知道这个接口不是生产执行入口。

## check 逻辑

Java secret source 完整性：

```ts
javaSecretSourceMetadataComplete: JAVA_V59_SECRET_SOURCE_CONTRACT.selectedSourceType === "external-secret-manager"
  && JAVA_V59_SECRET_SOURCE_CONTRACT.allowedSourceTypes.length === 3
  && JAVA_V59_SECRET_SOURCE_CONTRACT.secretManagerOwner === "platform-security-owner",
```

Java secret value 边界：

```ts
javaSecretValuesClosed: !JAVA_V59_SECRET_SOURCE_CONTRACT.sourceValueRecorded
  && !JAVA_V59_SECRET_SOURCE_CONTRACT.secretNamesRecorded
  && !JAVA_V59_SECRET_SOURCE_CONTRACT.nodeMayReadSecretValues,
```

mini-kv digest matrix 完整性：

```ts
miniKvDigestMatrixComplete: MINI_KV_V68_DIGEST_MATRIX.digestIds.length === 4
  && MINI_KV_V68_DIGEST_MATRIX.digestIds.includes("binary-digest")
  && MINI_KV_V68_DIGEST_MATRIX.digestIds.includes("wal-checksum-evidence")
  && MINI_KV_V68_DIGEST_MATRIX.digestIds.includes("snapshot-digest-evidence")
  && MINI_KV_V68_DIGEST_MATRIX.digestIds.includes("fixture-digest"),
```

mini-kv 执行边界：

```ts
miniKvExecutionBoundariesClosed: !MINI_KV_V68_DIGEST_MATRIX.writeCommandsExecuted
  && !MINI_KV_V68_DIGEST_MATRIX.adminCommandsExecuted
  && !MINI_KV_V68_DIGEST_MATRIX.restoreExecutionAllowed
  && MINI_KV_V68_DIGEST_MATRIX.noRuntimeCommandAdded,
```

总体 ready 由公共 helper 汇总：

```ts
completeAggregateReadyCheck(checks, "readyForProductionEnvironmentPreflightChecklist");
```

这表示任何一个前置 check 失败，整体就不能进入 ready 状态。

## preflight steps

v168 有 6 个步骤。

第 1 步收 Java v59 secret source contract：

```ts
{
  order: 1,
  phase: "collect",
  source: "java",
  action: "Collect Java v59 production secret source contract and c/59 evidence.",
```

第 2 步收 mini-kv v68 artifact digest matrix：

```ts
{
  order: 2,
  phase: "collect",
  source: "mini-kv",
  action: "Collect mini-kv v68 artifact digest compatibility matrix and c/68 evidence.",
```

第 3 步复查 Node v167 preflight。

第 4 步由 operator 比对 secret source 记录和 artifact digest 记录。

第 5 步有疑问暂停。

第 6 步归档并准备 Node v169：

```ts
expectedEvidence: "v168 closes the environment preflight checklist without opening production rollback or restore authority.",
```

## forbidden operations

本版明确禁止读 secret：

```ts
{
  operation: "Read production secret values from Node v168",
  reason: "Java v59 records only secret source metadata and explicitly keeps secret values outside the contract.",
  blockedBy: "Java v59 production secret source contract",
},
```

禁止连接生产库：

```ts
{
  operation: "Connect to a production database",
  reason: "Production database access remains outside this environment preflight checklist.",
  blockedBy: "Node v168 production environment preflight checklist",
},
```

禁止执行 mini-kv 危险命令：

```ts
{
  operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX",
  reason: "mini-kv v68 uses CHECKJSON/read-only smoke commands and does not execute restore-sensitive commands.",
  blockedBy: "mini-kv v68 artifact digest compatibility matrix",
},
```

禁止绕过 v167：

```ts
{
  operation: "Bypass Node v167 rollback execution preflight contract",
  reason: "v168 depends on v167 remaining clean before production environment checklist review.",
  blockedBy: "Node v167 rollback execution preflight contract",
},
```

## 路由接入

`src/routes/statusRoutes.ts` 新增：

```ts
import {
  loadProductionEnvironmentPreflightChecklist,
  renderProductionEnvironmentPreflightChecklistMarkdown,
} from "../services/productionEnvironmentPreflightChecklist.js";
```

新增路由：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/environment-preflight-checklist",
  () => Promise.resolve(loadProductionEnvironmentPreflightChecklist(deps.config)),
  renderProductionEnvironmentPreflightChecklistMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/productionEnvironmentPreflightChecklist.test.ts
```

第一组测试校验 ready profile：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-environment-preflight-checklist.v1",
  checklistState: "ready-for-manual-environment-review",
  readyForProductionEnvironmentPreflightChecklist: true,
  readyForProductionRollback: false,
  readyForProductionOperations: false,
  readOnly: true,
  dryRunOnly: true,
  executionAllowed: false,
```

还校验 32 个 check 全部通过：

```ts
summary: {
  checklistCheckCount: 32,
  passedChecklistCheckCount: 32,
  preflightArtifactCount: 3,
  preflightStepCount: 6,
  forbiddenOperationCount: 9,
  productionBlockerCount: 0,
},
```

第二组测试打开：

```ts
{ UPSTREAM_ACTIONS_ENABLED: "true" }
```

然后断言 checklist 被阻断。

第三组测试覆盖 JSON/Markdown 路由。

## 运行与归档

本版验证：

```text
npm run typecheck
npm test -- --run test/productionEnvironmentPreflightChecklist.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

归档：

```text
c/168/图片/production-environment-preflight-checklist.png
c/168/解释/运行调试说明.md
```

HTTP smoke 只启动 Node 本地服务，且保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

截图完成后 Node 进程已停止。

## 成熟度变化

v168 让生产化缺口从“回滚执行前 preflight”推进到“生产环境前置 checklist”。

成熟度提升点：

```text
Java secret source contract 被纳入 Node checklist
mini-kv artifact digest compatibility matrix 被纳入 Node checklist
Node v167 preflight contract 被作为前置依赖
secret value、production database、mini-kv restore 都继续被明确阻断
```

仍未解决的点：

```text
没有真实 secret manager 连接
没有真实 production database 连接
没有真实 production IdP
没有真实回滚执行审批
没有 mini-kv restore 执行授权
```

这些进入 Node v169 阶段总结和后续新计划。

## 一句话总结

v168 把 Java v59 的 secret source contract、mini-kv v68 的 artifact digest matrix、Node v167 的 preflight contract 合成了 production environment preflight checklist，让生产前置条件更像真实工程审查，但仍然不打开任何真实 secret、数据库、restore 或生产操作权限。
