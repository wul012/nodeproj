# 第一百六十五版代码讲解：cross-project release bundle gate

本版目标是把 Java v56 与 mini-kv v65 的 release bundle 证据汇聚到 Node 控制面。

它解决的问题是：

```text
Java v56 已经把 jar、contracts、rollback evidence、focused/non-Docker/package/http-smoke 收成 release bundle manifest；
mini-kv v65 已经把 binary version、fixtures、WAL/Snapshot compatibility、CTest/smoke 收成 runtime artifact bundle manifest；
Node 需要一个统一 gate 判断两边 bundle 是否可以进入发布前人工复核；
但 Node 不能执行 Maven、CMake、Java 写操作、mini-kv 写操作、真实发布或真实回滚。
```

所以 v165 做的是只读 release bundle gate，不是 release executor。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v163-post-rollback-readiness-roadmap.md
```

推进前只读核对到：

```text
Java HEAD/tag：v56订单平台release-bundle-manifest
mini-kv HEAD/tag：第六十五版运行时产物包清单
```

对应证据文件：

```text
Java: src/main/resources/static/contracts/release-bundle-manifest.sample.json
mini-kv: fixtures/release/runtime-artifact-bundle-manifest.json
```

因此 Node v165 可以按计划推进。

本版完成后，计划进入：

```text
推荐并行 Java v57 + mini-kv v66
Node v166 等待 Java v57 + mini-kv v66 完成后再做 rollback window readiness checklist
```

## 新增服务文件

新增文件：

```text
src/services/crossProjectReleaseBundleGate.ts
```

它导出的主入口是：

```ts
export function loadCrossProjectReleaseBundleGate(config: AppConfig): CrossProjectReleaseBundleGateProfile {
  const previousRunbook = loadReleaseRollbackReadinessRunbook(config);
  const bundleSteps = createBundleSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousRunbook, bundleSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForCrossProjectReleaseBundleGate");
```

这里有三个关键信号。

第一，v165 依赖 v163：

```ts
const previousRunbook = loadReleaseRollbackReadinessRunbook(config);
```

也就是说 release bundle gate 不是孤立 summary，而是接在上一阶段 rollback readiness runbook 之后。

第二，ready 状态走 v164 抽出的公共 helper：

```ts
completeAggregateReadyCheck(checks, "readyForCrossProjectReleaseBundleGate");
```

这避免了继续复制 `Object.entries(...).every(...)`，也是 v164 重构的直接收益。

第三，gate state 只可能是 review ready 或 blocked：

```ts
const gateState = checks.readyForCrossProjectReleaseBundleGate
  ? "ready-for-release-bundle-review"
  : "blocked";
```

它没有 `ready-for-production-release` 这种状态，避免误解为生产放行。

## profile 结构

核心类型是：

```ts
export interface CrossProjectReleaseBundleGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "cross-project-release-bundle-gate.v1";
  gateState: "ready-for-release-bundle-review" | "blocked";
  readyForCrossProjectReleaseBundleGate: boolean;
  readyForProductionRelease: false;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
```

这里最重要的是四个 false：

```ts
readyForProductionRelease: false;
readyForProductionRollback: false;
readyForProductionOperations: false;
executionAllowed: false;
```

这说明本版只是证据 gate，不是执行入口。

## Java v56 bundle 引用

Java 侧引用被固化为：

```ts
const JAVA_V56_RELEASE_BUNDLE: JavaReleaseBundleManifestReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v56",
  evidenceTag: "v56订单平台release-bundle-manifest",
  manifestVersion: "java-release-bundle-manifest.v1",
  scenario: "JAVA_RELEASE_BUNDLE_MANIFEST_SAMPLE",
  manifestEndpoint: "/contracts/release-bundle-manifest.sample.json",
  manifestSource: "src/main/resources/static/contracts/release-bundle-manifest.sample.json",
  archivePath: "c/56",
```

这对应 Java v56 的静态 contract 文件和运行归档。

Java bundle 的验证项是：

```ts
verificationEvidence: [
  "focused-maven-tests",
  "non-docker-regression-tests",
  "maven-package",
  "http-smoke",
  "static-contract-json-validation",
],
```

Node 消费这些证据，但不执行这些动作。

这个边界在同一个对象里写死：

```ts
nodeMayExecuteMaven: false,
nodeMayTriggerJavaWrites: false,
nodeMayTriggerRollback: false,
requiresUpstreamActionsEnabled: false,
requiresProductionDatabase: false,
requiresProductionSecrets: false,
connectsMiniKv: false,
```

这些字段让 v165 的意义更像生产发布前的 release desk，而不是远程运维脚本。

## mini-kv v65 bundle 引用

mini-kv 侧引用是：

```ts
const MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE: MiniKvRuntimeArtifactBundleManifestReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v65",
  evidenceTag: "第六十五版运行时产物包清单",
  manifestVersion: "mini-kv-runtime-artifact-bundle.v1",
  manifestPath: "fixtures/release/runtime-artifact-bundle-manifest.json",
  archivePath: "c/65",
  projectVersion: "0.65.0",
```

它覆盖的 artifact 是：

```ts
artifactIds: [
  "binary-version",
  "release-verification-manifest",
  "runtime-artifact-rollback-evidence",
  "wal-snapshot-compatibility",
  "fixture-inventory",
],
```

这比单纯“mini-kv 能跑”更接近生产交付，因为它把 binary、fixture、WAL/Snapshot 和回滚边界放在一个 bundle 里看。

高风险命令只允许解释，不允许执行：

```ts
readOnlySmokeCommands: [
  "INFOJSON",
  "COMMANDSJSON",
  "CHECKJSON LOAD data/bundle.snap",
  "CHECKJSON COMPACT",
  "CHECKJSON SETNXEX bundle:token 30 value",
  "STORAGEJSON",
  "HEALTH",
  "GET bundle:token",
  "QUIT",
],
writeCommandsExecuted: false,
adminCommandsExecuted: false,
```

这里的关键是 `CHECKJSON LOAD/COMPACT/SETNXEX`。Node 只把它们当作解释型证据，不把 mini-kv 拉进真实恢复或写入链路。

## gate 摘要

最终返回的 gate 段包含：

```ts
gate: {
  gateDigest,
  previousRunbookDigest: previousRunbook.runbook.runbookDigest,
  previousRunbookVersion: previousRunbook.profileVersion,
  javaVersion: JAVA_V56_RELEASE_BUNDLE.plannedVersion,
  javaManifestVersion: JAVA_V56_RELEASE_BUNDLE.manifestVersion,
  miniKvVersion: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.plannedVersion,
  miniKvManifestVersion: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.manifestVersion,
  nodeBaselineTag: "v164",
  bundleMode: "archived-release-bundle-only",
```

`previousRunbookDigest` 把 v165 和 v163 的 runbook 串起来。

`nodeBaselineTag: "v164"` 则说明 v165 是在报告 helper 重构之后继续推进，不是另起一条重复 summary 分支。

安全边界继续写在 gate 里：

```ts
nodeMayExecuteJavaMaven: false,
nodeMayExecuteMiniKvCmake: false,
nodeMayTriggerJavaWrites: false,
nodeMayTriggerJavaRollback: false,
nodeMayExecuteMiniKvWrites: false,
nodeMayExecuteMiniKvAdminCommands: false,
automaticUpstreamStart: false,
mutatesUpstreamState: false,
runtimeFileRead: false,
productionReleaseAuthorized: false,
productionRollbackAuthorized: false,
```

这些字段让 API 调用方不需要读文档也能知道：这个接口不能被当作执行入口。

## check 逻辑

Java bundle 的核心 check：

```ts
javaVerificationEvidenceComplete: JAVA_V56_RELEASE_BUNDLE.verificationEvidence.length === 5
  && JAVA_V56_RELEASE_BUNDLE.verificationEvidence.includes("maven-package")
  && JAVA_V56_RELEASE_BUNDLE.verificationEvidence.includes("http-smoke"),
```

它确认 Java v56 至少包含 package 和 HTTP smoke 这两个发布前关键证据。

Java 边界 check：

```ts
javaNodeConsumptionBoundariesClosed: JAVA_V56_RELEASE_BUNDLE.nodeMayConsume
  && !JAVA_V56_RELEASE_BUNDLE.nodeMayExecuteMaven
  && !JAVA_V56_RELEASE_BUNDLE.nodeMayTriggerJavaWrites
  && !JAVA_V56_RELEASE_BUNDLE.nodeMayTriggerRollback
  && !JAVA_V56_RELEASE_BUNDLE.requiresUpstreamActionsEnabled,
```

这段是 v165 的核心安全价值：Node 可以消费，不能执行。

mini-kv 危险命令 check：

```ts
miniKvReadOnlySmokeExplainsDangerousCommands:
  MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.readOnlySmokeCommands.includes("CHECKJSON LOAD data/bundle.snap")
  && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.readOnlySmokeCommands.includes("CHECKJSON COMPACT")
  && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.readOnlySmokeCommands.includes("CHECKJSON SETNXEX bundle:token 30 value"),
```

这说明 v65 对 LOAD、COMPACT、SETNXEX 有覆盖，但覆盖方式是 `CHECKJSON` 解释，不是真执行。

Node 自身边界 check：

```ts
nodeConsumesArchivedBundlesOnly: bundleSteps.length === 5
  && bundleSteps.every((step) => (
    step.readOnly
    && !step.executesExternalBuild
    && !step.executesRelease
    && !step.executesRollback
    && !step.mutatesState
  )),
```

这把“只读”从口头要求变成了 profile 自校验。

## bundle steps

v165 有 5 个步骤：

```ts
function createBundleSteps(): CrossProjectReleaseBundleStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      source: "java",
      action: "Collect Java v56 release bundle manifest, static contract endpoint, and c/56 archive evidence.",
```

第 1 步收 Java v56 bundle。

第 2 步收 mini-kv v65 bundle：

```ts
{
  order: 2,
  phase: "collect",
  source: "mini-kv",
  action: "Collect mini-kv v65 runtime artifact bundle manifest and c/65 archive evidence.",
```

第 3 步由 Node 验证只读消费：

```ts
{
  order: 3,
  phase: "verify",
  source: "node",
  action: "Verify both bundles are consumed as archived evidence only.",
```

第 4 步保持生产 release/rollback 关闭。

第 5 步把下一步明确交给 Java v57 + mini-kv v66：

```ts
expectedEvidence: "Node v166 remains blocked until Java v57 and mini-kv v66 are both complete.",
```

这避免 Node 抢跑。

## forbidden operations

本版明确禁止：

```ts
{
  operation: "Run Maven from Node v165",
  reason: "Java v56 bundle is consumed as archived evidence; Java owns Maven execution.",
  blockedBy: "Java v56 release bundle manifest",
},
```

以及：

```ts
{
  operation: "Run CMake or CTest from Node v165",
  reason: "mini-kv v65 bundle is consumed as archived evidence; mini-kv owns CMake and CTest execution.",
  blockedBy: "mini-kv v65 runtime artifact bundle manifest",
},
```

还禁止把 gate 当成生产审批：

```ts
{
  operation: "Treat this gate as production release approval",
  reason: "v165 is release bundle review evidence only and does not authorize production release or rollback.",
  blockedBy: "Node v165 release bundle gate",
},
```

这和前面几版的生产级方向一致：证据链变强，但权限不自动打开。

## Markdown 渲染

v165 没有复制旧的长 Markdown 拼装，而是复用 v164 的 helper：

```ts
return renderReleaseReportMarkdown({
  title: "Cross-project release bundle gate",
  header: {
    Service: profile.service,
    "Generated at": profile.generatedAt,
    "Profile version": profile.profileVersion,
    "Gate state": profile.gateState,
```

章节用配置描述：

```ts
sections: [
  { heading: "Gate", entries: profile.gate },
  { heading: "Checks", entries: profile.checks },
  { heading: "Previous Rollback Runbook", entries: profile.artifacts.previousRollbackRunbook },
  { heading: "Java Release Bundle Manifest", entries: profile.artifacts.javaReleaseBundleManifest },
  {
    heading: "mini-kv Runtime Artifact Bundle Manifest",
    entries: profile.artifacts.miniKvRuntimeArtifactBundleManifest,
  },
  { heading: "Node Bundle Envelope", entries: profile.artifacts.nodeBundleEnvelope },
  { heading: "Summary", entries: profile.summary },
],
```

这说明 v164 的重构已经开始在新版本里降低重复。

## 路由接入

`src/routes/statusRoutes.ts` 新增 import：

```ts
import {
  loadCrossProjectReleaseBundleGate,
  renderCrossProjectReleaseBundleGateMarkdown,
} from "../services/crossProjectReleaseBundleGate.js";
```

新增路由：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/cross-project-release-bundle-gate",
  () => Promise.resolve(loadCrossProjectReleaseBundleGate(deps.config)),
  renderCrossProjectReleaseBundleGateMarkdown,
);
```

它沿用已有 JSON/Markdown 双格式报告路由模式。

## 测试覆盖

新增测试：

```text
test/crossProjectReleaseBundleGate.test.ts
```

第一组测试校验 ready profile：

```ts
expect(profile).toMatchObject({
  profileVersion: "cross-project-release-bundle-gate.v1",
  gateState: "ready-for-release-bundle-review",
  readyForCrossProjectReleaseBundleGate: true,
  readyForProductionRelease: false,
  readyForProductionRollback: false,
  readyForProductionOperations: false,
  readOnly: true,
  executionAllowed: false,
```

这保证 v165 不会因为 bundle ready 就打开生产 release 或 rollback。

测试还校验 27 个 check 全部通过：

```ts
summary: {
  gateCheckCount: 27,
  passedGateCheckCount: 27,
  bundleManifestCount: 2,
  bundleStepCount: 5,
  forbiddenOperationCount: 7,
  productionBlockerCount: 0,
},
```

第二组测试故意打开：

```ts
{ UPSTREAM_ACTIONS_ENABLED: "true" }
```

然后断言：

```ts
expect(profile.gateState).toBe("blocked");
expect(profile.readyForCrossProjectReleaseBundleGate).toBe(false);
expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
```

这说明运行时安全开关仍然能阻断 gate。

第三组测试覆盖真实路由：

```ts
url: "/api/v1/production/cross-project-release-bundle-gate"
```

以及 Markdown：

```ts
url: "/api/v1/production/cross-project-release-bundle-gate?format=markdown"
```

它确认 API 和报告渲染都能工作。

## 运行与归档

本版验证：

```text
npm run typecheck
npm test -- --run test/crossProjectReleaseBundleGate.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

归档：

```text
c/165/图片/cross-project-release-bundle-gate.png
c/165/解释/运行调试说明.md
```

截图使用本机 Chrome：

```text
npx playwright screenshot --channel chrome
```

HTTP smoke 只启动 Node 本地服务，且保持：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

截图完成后 Node 进程已停止。

## 成熟度变化

v165 让 Node 更接近生产发布前控制面的形态。

成熟度提升点：

```text
Java release bundle 与 mini-kv runtime bundle 有统一入口
bundle 证据、前置 runbook digest、forbidden operations 被合成到一个 profile
Node 明确不能执行 Maven/CMake/写操作/发布/回滚
Markdown/JSON 双格式可用于人工 review 和 CI 证据读取
```

仍未解决的点：

```text
没有真实 CI 工作流强制三项目联动检查
没有真实生产 IdP / secret / database 接入
没有 release approval workflow
没有执行真实 rollback window checklist
Node v166 还要等待 Java v57 + mini-kv v66
```

## 一句话总结

v165 把 Java v56 与 mini-kv v65 的 release bundle manifest 合成了一个只读跨项目 gate：它能证明发布证据已汇齐，但仍坚决不执行上游构建、写操作、发布或回滚。
