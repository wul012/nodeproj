# 第一百六十二版代码讲解：cross-project release verification intake gate

本版目标是把 Java v54 和 mini-kv v63 的发布验证证据收进 Node，生成一个跨项目 release verification intake gate。

它解决的问题是：

```text
Java v54 已经固化 release verification manifest；
mini-kv v63 已经固化 release verification manifest；
Node v162 要判断这两个 release 证据是否可以进入下一阶段回滚证据开发；
同时明确 Node 不替 Java 跑 Maven，不替 mini-kv 跑 CMake/CTest，也不授权生产发布。
```

本版不是生产发布，不是上游构建编排，也不是跨项目写操作执行器。它是一个只读 intake gate，用来把两边 release manifest 变成可测试、可截图、可归档、可被后续 Node v163 消费的控制面证据。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v161-post-controlled-idempotency-drill-roadmap.md
```

计划要求：

```text
Node v162：cross-project release verification intake gate
必须等待 Java v54 和 mini-kv v63 都完成后再做
读取两边 manifest
生成三项目 release gate
只读不执行上游构建
```

推进前只读核对到：

```text
Java HEAD/tag = v54 release verification manifest
mini-kv HEAD/tag = v63 release verification manifest
```

所以 v162 可以继续。完成后，计划下一步改为：

```text
推荐并行：Java v55 + mini-kv v64
Node v163 必须等待 Java v55 和 mini-kv v64 都完成后再做
```

## 新增服务

新增文件：

```text
src/services/crossProjectReleaseVerificationIntakeGate.ts
```

入口函数：

```ts
export function loadCrossProjectReleaseVerificationIntakeGate(
  config: AppConfig,
): CrossProjectReleaseVerificationIntakeGateProfile {
```

这个函数只接收 `AppConfig`。它没有接收 `OrderPlatformClient`，没有接收 `MiniKvClient`，也没有接收 approval ledger。这个形状很关键：v162 不访问 Java HTTP，不连接 mini-kv TCP，不执行外部构建，只把已归档证据整理成 gate profile。

## 依赖 v161 runbook

v162 没有跳过前一版，而是继续消费 v161：

```ts
const previousRunbook = loadControlledIdempotencyDrillRunbook(config);
```

随后检查前置 runbook 必须 ready，且不能授权执行：

```ts
previousRunbookReady: previousRunbook.readyForControlledIdempotencyDrillRunbook
  && previousRunbook.runbookState === "ready-for-manual-dry-run",
previousRunbookDoesNotAuthorizeExecution: !previousRunbook.executionAllowed
  && previousRunbook.readyForProductionOperations === false,
```

这让 v162 不是“又做一个孤立 summary”，而是继承 v161 的幂等演练收口结论：只读、dry-run、无生产写授权。

## Java v54 release manifest 引用

Java 侧引用被固化为：

```ts
const JAVA_V54_RELEASE_MANIFEST: JavaReleaseVerificationManifestReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v54",
  evidenceTag: "java-v54-release-verification-manifest",
  manifestVersion: "java-release-verification-manifest.v1",
  scenario: "JAVA_RELEASE_VERIFICATION_MANIFEST_SAMPLE",
  manifestEndpoint: "/contracts/release-verification-manifest.sample.json",
  manifestSource: "src/main/resources/static/contracts/release-verification-manifest.sample.json",
  archivePath: "c/54",
```

这里把 Java v54 的证据入口讲清楚：

```text
manifestVersion=java-release-verification-manifest.v1
manifestEndpoint=/contracts/release-verification-manifest.sample.json
archivePath=c/54
```

Node v162 不直接去跑 Java，而是知道 Java v54 的 release evidence 在哪里、叫什么、应该具备哪些边界。

## Java release 检查项

Java v54 要求的 release 检查项进入 Node：

```ts
requiredChecks: [
  "focused-maven-tests",
  "non-docker-regression-tests",
  "maven-package",
  "http-smoke",
  "static-contract-json-validation",
] as JavaReleaseVerificationManifestReference["requiredChecks"],
staticContractCount: 5,
focusedTestCount: 33,
nonDockerRegressionTestCount: 75,
```

这几项对应 Java v54 的 release manifest：聚焦 Maven 测试、非 Docker 回归、打包、HTTP smoke、静态 contract JSON 校验。

但 Node 对这些证据的使用方式是只读消费，不是代替执行。边界字段写得很明确：

```ts
nodeMayExecuteBuild: false,
nodeMayTriggerWrites: false,
changesBusinessSemantics: false,
connectsMiniKv: false,
requiresProductionSecrets: false,
```

控制面读到后应该理解为：

```text
Java v54 可以给 Node 提供 release 证据；
但 Node v162 不能替 Java 执行 Maven；
不能触发 Java 写接口；
Java v54 没改变订单业务语义，也没把 mini-kv 接进 Java 交易链路。
```

## mini-kv v63 release manifest 引用

mini-kv 侧引用被固化为：

```ts
const MINI_KV_V63_RELEASE_MANIFEST: MiniKvReleaseVerificationManifestReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v63",
  evidenceTag: "mini-kv-v63-release-verification-manifest",
  manifestVersion: "mini-kv-release-verification-manifest.v1",
  manifestPath: "fixtures/release/verification-manifest.json",
  archivePath: "c/63",
```

这里说明 mini-kv v63 的主要价值不是新增命令，而是把 C++ 项目的 release verification 证据变成可被 Node 消费的 manifest。

## mini-kv release 检查项

mini-kv v63 的检查项进入 Node：

```ts
requiredChecks: [
  "cmake-configure",
  "cmake-build",
  "ctest",
  "targeted-tests",
  "read-only-command-smoke",
  "fixture-inventory",
  "version-manifest",
] as MiniKvReleaseVerificationManifestReference["requiredChecks"],
targetedTestCount: 5,
fixtureCount: 11,
readOnlySmokeCommandCount: 6,
projectVersion: "0.63.0",
```

这让 Node v162 能知道 mini-kv v63 是否具备 release 证据的完整度：CMake configure/build、CTest、定向测试、只读 smoke、fixture 清单、版本 manifest。

更关键的是边界字段：

```ts
noRuntimeCommandAdded: true,
writeCommandsExecuted: false,
orderAuthoritative: false,
connectedToJavaTransactionChain: false,
doesNotRunJavaOrNode: true,
doesNotOpenUpstreamActions: true,
executionAllowed: false,
```

控制面读到后应该理解为：

```text
mini-kv v63 没新增 runtime 命令；
release smoke 不执行写命令；
mini-kv 不是订单权威存储；
mini-kv 没进入 Java 事务链路；
它只是基础设施实验位和 release evidence provider。
```

## gate digest

v162 生成 `gateDigest`：

```ts
const gateDigest = digestGate({
  profileVersion: "cross-project-release-verification-intake-gate.v1",
  previousRunbookDigest: previousRunbook.runbook.runbookDigest,
  javaVersion: JAVA_V54_RELEASE_MANIFEST.plannedVersion,
  javaManifestVersion: JAVA_V54_RELEASE_MANIFEST.manifestVersion,
  miniKvVersion: MINI_KV_V63_RELEASE_MANIFEST.plannedVersion,
  miniKvManifestVersion: MINI_KV_V63_RELEASE_MANIFEST.manifestVersion,
  nodeBaselineTag: "v161",
  intakeMode: "archived-evidence-only",
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks,
});
```

这个 digest 绑定：

```text
v161 runbook digest
Java v54 manifest version
mini-kv v63 manifest version
Node v162 intake mode
runtime safety 开关
所有 gate checks
```

所以它不是普通文档摘要，而是跨项目 release intake gate 的核心证据摘要。

## gate 返回结构

v162 返回：

```ts
gateState,
readyForCrossProjectReleaseVerificationIntakeGate: checks.readyForCrossProjectReleaseVerificationIntakeGate,
readyForProductionRelease: false,
readyForProductionOperations: false,
readOnly: true,
executionAllowed: false,
```

这几个字段表达了本版最重要的状态：

```text
release verification intake gate 可以 ready；
但 production release 仍然 false；
production operations 仍然 false；
整个 profile 只读，不允许执行。
```

换句话说，v162 是“证据可以进入下一阶段”，不是“系统可以生产发布”。

## checks 设计

checks 总数是 26 个：

```ts
summary: {
  gateCheckCount: countReportChecks(checks),
  passedGateCheckCount: countPassedReportChecks(checks),
  manifestCount: 2,
  intakeStepCount: intakeSteps.length,
  forbiddenOperationCount: forbiddenOperations.length,
  productionBlockerCount: productionBlockers.length,
```

其中比较关键的检查包括：

```ts
javaNodeCannotExecuteMaven: !JAVA_V54_RELEASE_MANIFEST.nodeMayExecuteBuild,
javaNodeCannotTriggerWrites: !JAVA_V54_RELEASE_MANIFEST.nodeMayTriggerWrites,
miniKvWriteCommandsNotExecuted: !MINI_KV_V63_RELEASE_MANIFEST.writeCommandsExecuted,
miniKvOrderAuthoritativeFalse: !MINI_KV_V63_RELEASE_MANIFEST.orderAuthoritative
  && !MINI_KV_V63_RELEASE_MANIFEST.connectedToJavaTransactionChain,
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

这些检查把三项目边界压住：

```text
Node 不跑 Java Maven；
Node 不触发 Java 写；
Node 不执行 mini-kv 写 smoke；
mini-kv 不是订单权威；
UPSTREAM_ACTIONS_ENABLED 必须保持 false。
```

## intake steps

v162 定义了 5 个 intake 步骤：

```ts
function createIntakeSteps(): CrossProjectReleaseVerificationIntakeStep[] {
```

每一步都有相同的安全约束：

```ts
readOnly: true,
executesExternalBuild: false,
mutatesState: false,
```

这说明它不是一个隐藏的执行计划，而是一份只读收集、校验、关口判断和 closeout 说明。

五步大致是：

```text
1. 收集 Java v54 manifest 和 c/54 archive
2. 收集 mini-kv v63 manifest 和 c/63 archive
3. Node 校验两边都是 archived-evidence-only
4. 保持 production release / production operations 关闭
5. 把结果作为 Java v55 + mini-kv v64 的前置
```

## forbidden operations

v162 显式列出 6 个禁止动作：

```ts
function createForbiddenOperations(): CrossProjectReleaseVerificationForbiddenOperation[] {
```

其中最重要的是：

```ts
{
  operation: "Run Maven from Node v162",
  reason: "Java v54 manifest is consumed as archived evidence; Java owns Maven execution.",
  blockedBy: "Node v162 intake gate",
},
{
  operation: "Run CMake or CTest from Node v162",
  reason: "mini-kv v63 manifest is consumed as archived evidence; mini-kv owns CMake and CTest execution.",
  blockedBy: "Node v162 intake gate",
},
{
  operation: "Treat this gate as production release approval",
  reason: "v162 is intake evidence only and does not authorize production release.",
  blockedBy: "Node v162 intake gate",
},
```

这几个 forbidden operations 直接回答了“综合开发调试会不会打断另外两个项目”：v162 不会，因为它只消费 archive，不触发外部构建和写入。

## 路由注册

路由在 `src/routes/statusRoutes.ts` 注册：

```ts
import {
  loadCrossProjectReleaseVerificationIntakeGate,
  renderCrossProjectReleaseVerificationIntakeGateMarkdown,
} from "../services/crossProjectReleaseVerificationIntakeGate.js";
```

实际 endpoint：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/cross-project-release-verification-intake-gate",
  () => Promise.resolve(loadCrossProjectReleaseVerificationIntakeGate(deps.config)),
  renderCrossProjectReleaseVerificationIntakeGateMarkdown,
);
```

它沿用现有 JSON/Markdown 双格式报告路由模式，所以既能被测试消费，也能被 Chrome 截图归档。

## 测试覆盖

新增测试：

```text
test/crossProjectReleaseVerificationIntakeGate.test.ts
```

第一组测试验证正常 ready：

```ts
expect(profile).toMatchObject({
  profileVersion: "cross-project-release-verification-intake-gate.v1",
  gateState: "ready-for-release-verification-intake",
  readyForCrossProjectReleaseVerificationIntakeGate: true,
  readyForProductionRelease: false,
  readyForProductionOperations: false,
  readOnly: true,
  executionAllowed: false,
```

第二组测试验证安全开关：

```ts
const profile = loadCrossProjectReleaseVerificationIntakeGate(loadTestConfig(
  "memory://cross-project-release-verification-intake-gate-blocked",
  { UPSTREAM_ACTIONS_ENABLED: "true" },
));

expect(profile.gateState).toBe("blocked");
expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
```

这保证只要 `UPSTREAM_ACTIONS_ENABLED=true`，v162 gate 就会阻塞，不会在 release intake 期间误放开上游动作。

第三组测试验证路由：

```ts
const json = await app.inject({
  method: "GET",
  url: "/api/v1/production/cross-project-release-verification-intake-gate",
  headers,
});
const markdown = await app.inject({
  method: "GET",
  url: "/api/v1/production/cross-project-release-verification-intake-gate?format=markdown",
  headers,
});
```

它同时覆盖 JSON 和 Markdown，保证报告能被 API 客户端和浏览器截图流程使用。

## 计划文件更新

本版更新：

```text
docs/plans/v161-post-controlled-idempotency-drill-roadmap.md
```

关键变化是把 Java v54、mini-kv v63、Node v162 标为已完成，并明确下一步：

```text
下一步推荐并行：Java v55 + mini-kv v64
Node v163 必须等待 Java v55 和 mini-kv v64 都完成后再做
```

这避免计划文件继续停在旧状态，后续推进时不会误以为 v162 还没做。

## 运行与归档

本版验证：

```text
npm run typecheck
npm test -- --run test/crossProjectReleaseVerificationIntakeGate.test.ts
npm test -- --run test/crossProjectReleaseVerificationIntakeGate.test.ts test/controlledIdempotencyDrillRunbook.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

归档：

```text
c/162/图片/cross-project-release-verification-intake-gate.png
c/162/解释/运行调试说明.md
```

HTTP smoke 只启动 Node 本地服务，且保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

截图完成后 Node 进程已停止。

## 成熟度变化

v162 让项目从“幂等纵向切片演练”继续推进到“跨项目发布验证 intake gate”。

成熟度提升点：

```text
Java release manifest 能被 Node 控制面消费；
mini-kv release manifest 能被 Node 控制面消费；
Node 明确自己不执行上游构建；
release evidence intake 和 production release authorization 被分离；
计划下一阶段能清晰进入 rollback evidence。
```

但还没有完成：

```text
Java v55 rollback evidence sample
mini-kv v64 rollback evidence sample
Node v163 release rollback readiness runbook
真实 CI 统一流水线
真实生产发布授权
```

## 一句话总结

v162 把 Java v54 与 mini-kv v63 的 release verification manifest 收进 Node 控制面，形成只读、可测试、可归档的跨项目 intake gate；它让三项目更接近生产级发布流程，但仍明确不授权生产发布和上游写操作。
