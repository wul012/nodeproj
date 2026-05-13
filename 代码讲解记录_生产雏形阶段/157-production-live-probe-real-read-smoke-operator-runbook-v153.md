# 第一百五十三版代码讲解：production live probe real-read smoke operator runbook

本版目标是把 v152 archive verification 继续向真实开发流程推进：不是立刻启动 Java / mini-kv，而是先生成一份可验证的 operator runbook。

它解决的问题是：

```text
v152 已经能证明 archive verification 可复核；
Java v49 / mini-kv v58 已经有只读 evidence 引用；
v153 要回答真实只读联调前“谁启动、读什么、禁止什么、用什么环境变量”。
```

## 本版所处项目进度

当前阶段是生产雏形里的真实只读联调准备：

```text
Node v150：production pass evidence archive
Node v151：共享工具收口
Java v49：ops read-only evidence sample
mini-kv v58：readonly evidence fixtures
Node v152：archive verification
Node v153：operator runbook
```

v153 不代表真实上游已经启动，也不代表生产执行打开。它只表示：

```text
真实只读窗口的人工步骤清楚了
允许读取的 Java / mini-kv 目标清楚了
禁止执行的写操作清楚了
Node 仍不会自动启动 Java / mini-kv
```

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeOperatorRunbook.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeOperatorRunbook(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeOperatorRunbookProfile> {
```

它先消费 v152：

```ts
const archiveVerification = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification(input);
```

这里仍然沿用上游只读 probe 链路，不在 Node 里启动 Java / mini-kv。

## 必要环境变量

v153 把真实只读窗口所需环境变量固化为常量：

```ts
const REQUIRED_ENVIRONMENT: RequiredOperatorEnvironment = Object.freeze({
  UPSTREAM_PROBES_ENABLED: true,
  UPSTREAM_ACTIONS_ENABLED: false,
  ACCESS_GUARD_ENFORCEMENT_ENABLED: true,
  NODE_AUTOMATIC_UPSTREAM_START: false,
  operatorApprovalRequired: true,
});
```

最关键的是这组组合：

```text
UPSTREAM_PROBES_ENABLED=true
UPSTREAM_ACTIONS_ENABLED=false
```

它表示 Node 可以做只读 probe，但不能发起上游写操作。

## Java 只读目标

Java 目标在代码里显式列出：

```ts
const JAVA_READ_ONLY_TARGETS: readonly ReadOnlyTarget[] = Object.freeze([
  {
    project: "advanced-order-platform",
    target: "GET /actuator/health",
    kind: "http-get",
    purpose: "Confirm the Java order platform is reachable during the operator-owned read-only window.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
```

同时包含：

```text
GET /api/v1/ops/overview
GET /api/v1/ops/evidence
GET /api/v1/failed-events/replay-evidence-index
/contracts/ops-read-only-evidence.sample.json
```

所有 Java 目标都必须满足：

```ts
mutatesState: false
```

## mini-kv 只读目标

mini-kv 目标也被显式列出：

```ts
const MINI_KV_READ_ONLY_TARGETS: readonly ReadOnlyTarget[] = Object.freeze([
  {
    project: "mini-kv",
    target: "HEALTH",
    kind: "tcp-command",
    purpose: "Confirm mini-kv is reachable during the operator-owned read-only window.",
    executionOwner: "node-read-only-probe",
    mutatesState: false,
  },
```

本版允许的 mini-kv 只读命令是：

```text
HEALTH
INFOJSON
STATSJSON
CHECKJSON GET orderops:1
fixtures/readonly/index.json
```

注意这里没有 `SET`、`DEL`、`EXPIRE`。

## 禁止操作

v153 把禁止项作为一等数据输出：

```ts
const FORBIDDEN_OPERATIONS: readonly ForbiddenOperation[] = Object.freeze([
  {
    project: "advanced-order-platform",
    operation: "POST /api/v1/orders",
    reason: "Order writes are outside the read-only smoke window.",
  },
```

禁止项覆盖：

```text
POST /api/v1/orders
POST /api/v1/failed-events/{id}/replay
RabbitMQ replay publish
SET / DEL / EXPIRE
CHECKJSON SET orderops:1 value
UPSTREAM_ACTIONS_ENABLED=true
Automatically start Java or mini-kv
```

这让 runbook 不只是“建议”，而是可被测试和审查的安全边界。

## checks 设计

核心 checks 在 `createChecks` 中：

```ts
function createChecks(
  archiveVerification: ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile,
): ProductionLiveProbeRealReadSmokeOperatorRunbookProfile["checks"] {
  return {
    sourceArchiveVerificationReady: archiveVerification.readyForArchiveVerification,
    sourceVerificationDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.verification.verificationDigest),
    sourceArchiveDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.verification.archiveDigest),
    upstreamEvidenceReady: archiveVerification.verification.upstreamEvidenceReady,
```

关键检查包括：

```text
sourceUpstreamActionsStillDisabled
javaReadOnlyTargetsListed
miniKvReadOnlyCommandsListed
forbiddenJavaWritesListed
forbiddenMiniKvWritesListed
noAutomaticUpstreamStart
skippedOrMixedStillNonPass
readyForProductionOperationsStillFalse
```

最终通过条件：

```ts
checks.readyForOperatorRunbook = Object.entries(checks)
  .filter(([key]) => key !== "readyForOperatorRunbook")
  .every(([, value]) => value);
```

也就是说，只要有一个安全边界缺失，runbook 就不会 ready。

## runbook digest

v153 生成 `runbookDigest`：

```ts
const runbookDigest = digestRunbook({
  profileVersion: "production-live-probe-real-read-smoke-operator-runbook.v1",
  sourceArchiveVerificationDigest: archiveVerification.verification.verificationDigest,
  sourceArchiveDigest: archiveVerification.verification.archiveDigest,
  sourceVerificationState: archiveVerification.verificationState,
  requiredEnvironment: REQUIRED_ENVIRONMENT,
  operatorSteps: steps,
  readOnlyTargets: {
    java: JAVA_READ_ONLY_TARGETS,
    miniKv: MINI_KV_READ_ONLY_TARGETS,
  },
  forbiddenOperations: FORBIDDEN_OPERATIONS,
  checks,
});
```

digest 覆盖了来源、环境变量、步骤、允许目标、禁止操作和 checks。后续 v154 可以复算它，判断 runbook 是否漂移。

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增路由：

```text
/api/v1/production/live-probe-real-read-smoke-operator-runbook
```

Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-operator-runbook?format=markdown
```

路由代码：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-operator-runbook",
  () => loadProductionLiveProbeRealReadSmokeOperatorRunbook({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeOperatorRunbookMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeOperatorRunbook.test.ts
```

覆盖四类场景：

```text
默认 skipped archive -> ready-for-manual-read-only-window
模拟 pass archive -> 仍保持 readyForProductionOperations=false
UPSTREAM_ACTIONS_ENABLED=true -> blocked
JSON / Markdown route -> 200
```

默认场景断言：

```ts
expect(profile).toMatchObject({
  runbookState: "ready-for-manual-read-only-window",
  readyForOperatorRunbook: true,
  readyForProductionOperations: false,
  runbook: {
    automaticUpstreamStart: false,
    mutatesUpstreamState: false,
    skippedOrMixedEvidenceRemainsNonPass: true,
  },
});
```

并检查关键目标和禁止操作：

```ts
expect(profile.readOnlyTargets.java.map((target) => target.target)).toContain("GET /api/v1/ops/evidence");
expect(profile.readOnlyTargets.miniKv.map((target) => target.target)).toContain("CHECKJSON GET orderops:1");
expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("POST /api/v1/failed-events/{id}/replay");
expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("UPSTREAM_ACTIONS_ENABLED=true");
```

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeOperatorRunbook.test.ts
npm test -- --run test/productionLiveProbeRealReadSmokeOperatorRunbook.test.ts test/productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

HTTP smoke 关键结果：

```text
runbookState=ready-for-manual-read-only-window
readyForOperatorRunbook=true
readyForProductionOperations=false
automaticUpstreamStart=false
UPSTREAM_ACTIONS_ENABLED=false
runbookDigestLength=64
```

归档截图：

```text
b/153/图片/production-live-probe-real-read-smoke-operator-runbook.png
```

## 成熟度变化

v153 让 Node 从“证据可复核”推进到“真实只读窗口可执行前审阅”：

```text
v152：我能证明 archive verification 是什么
v153：我能告诉 operator 真实只读联调前应该怎么做、不能做什么
v154：下一步可以验证这份 runbook 自身是否漂移
```

这更接近生产级流程，因为真实系统不会让控制面随手启动依赖服务，也不会把写操作混进 smoke。

## 一句话总结

v153 把 v152 archive verification 转成 operator runbook，明确 Java / mini-kv 的人工启动边界、只读 probe 目标、禁止写操作和环境变量组合，为后续真实只读联调窗口打下可复核的操作基础。
