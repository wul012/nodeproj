# 第一百四十四版代码讲解：production live probe real-read smoke execution request

本版目标是把 v143 的 archive adapter 继续推进成真实只读 smoke 的执行请求。

它解决的问题是：

```text
真实 live smoke 不能只靠口头说明；
Node 应该输出一份可审阅的执行请求，
明确需要哪些环境变量、允许哪些读探测、禁止哪些写动作、哪些步骤需要操作员手动完成。
```

## 本版所处项目进度

v141 做 operator handoff checklist。

v142 做 real-read smoke readiness switch。

v143 做 real-read smoke archive adapter。

v144 做：

```text
real-read smoke execution request + operator command profile
```

它不是执行真实探测，而是把执行前请求固化。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeExecutionRequest.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeExecutionRequest(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeExecutionRequestProfile> {
```

第一步读取 v143 adapter：

```ts
const sourceAdapter = await loadProductionLiveProbeRealReadSmokeArchiveAdapter({
  ...input,
  config: {
    ...input.config,
    upstreamProbesEnabled: false,
  },
});
```

这里刻意把 source adapter 的 baseline 固定为 skipped 规划证据。

原因是：

```text
v144 只做执行请求，不在创建请求时真正访问 Java / mini-kv。
```

## requestState

本版状态：

```ts
requestState: "blocked" | "draft-review" | "window-open-read-only";
```

生成逻辑：

```ts
const requestState = productionBlockers.length > 0
  ? "blocked"
  : checks.readyForExecutionWindow
    ? "window-open-read-only"
    : "draft-review";
```

当前默认：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

所以：

```text
requestState=draft-review
```

这表示可以给操作员审阅，但真实只读窗口还没有打开。

## requiredEnvironment

本版明确真实只读 smoke 所需环境：

```ts
requiredEnvironment: {
  UPSTREAM_PROBES_ENABLED: "true",
  UPSTREAM_ACTIONS_ENABLED: "false",
  ORDER_PLATFORM_URL: input.config.orderPlatformUrl,
  MINIKV_HOST: input.config.miniKvHost,
  MINIKV_PORT: String(input.config.miniKvPort),
},
```

核心点是：

```text
UPSTREAM_PROBES_ENABLED=true
UPSTREAM_ACTIONS_ENABLED=false
```

前者允许读探测，后者继续禁止写动作。

## allowedReadOnlyProbes

允许的读探测来自计划：

```ts
return [
  {
    id: "java-actuator-health",
    target: `${config.orderPlatformUrl}/actuator/health`,
    protocol: "http-get",
    readOnly: true,
    mutatesState: false,
  },
  {
    id: "java-ops-overview",
    target: `${config.orderPlatformUrl}/api/v1/ops/overview`,
    protocol: "http-get",
    readOnly: true,
    mutatesState: false,
  },
  {
    id: "mini-kv-health",
    target: "HEALTH",
    protocol: "tcp-inline-command",
    readOnly: true,
    mutatesState: false,
  },
```

完整 5 个：

```text
java-actuator-health
java-ops-overview
mini-kv-health
mini-kv-infojson
mini-kv-statsjson
```

## forbiddenActions

禁止动作列表：

```ts
return [
  {
    id: "java-replay-post",
    reason: "Real-read smoke may not execute Java replay or compensation endpoints.",
  },
  {
    id: "java-order-mutation-post",
    reason: "Real-read smoke may not create, update, cancel, or repair orders.",
  },
  {
    id: "mini-kv-set",
    reason: "Real-read smoke may not write keys to mini-kv.",
  },
```

完整 6 个：

```text
java-replay-post
java-order-mutation-post
mini-kv-set
mini-kv-delete
mini-kv-flush
upstream-actions-enabled
```

这把真实只读 smoke 和危险动作明确隔离。

## operatorCommandProfile

本版输出 6 个步骤：

```ts
id:
  | "review-source-adapter"
  | "start-java-manually"
  | "start-mini-kv-manually"
  | "set-read-only-probe-env"
  | "run-node-smoke-harness"
  | "capture-archive-adapter";
```

默认状态：

```text
review-source-adapter: ready
start-java-manually: manual-required
start-mini-kv-manually: manual-required
set-read-only-probe-env: manual-required
run-node-smoke-harness: manual-required
capture-archive-adapter: manual-required
```

Java 步骤：

```ts
{
  id: "start-java-manually",
  owner: "operator",
  commandKind: "manual-start",
  status: "manual-required",
  command: "Start the Java order platform in its own workspace.",
  evidence: config.orderPlatformUrl,
  note: "Node does not start Java automatically.",
}
```

mini-kv 步骤：

```ts
{
  id: "start-mini-kv-manually",
  owner: "operator",
  commandKind: "manual-start",
  status: "manual-required",
  command: "Start mini-kv in its own workspace.",
  evidence: `${config.miniKvHost}:${config.miniKvPort}`,
  note: "Node does not start mini-kv automatically.",
}
```

这就是本版仍不启动另外两个项目的原因。

## checks

核心 checks：

```ts
const checks = {
  sourceArchiveAdapterReady: sourceAdapter.readyForArchiveAdapter,
  sourceArchiveAdapterDigestValid: /^[a-f0-9]{64}$/.test(sourceAdapter.adapter.adapterDigest),
  upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
  probeWindowExplicitlyOpen: input.config.upstreamProbesEnabled === true,
  manualJavaStartRequired: true,
  manualMiniKvStartRequired: true,
  startsNoUpstreamsAutomatically: true,
  forbidsWriteActions: forbiddenActions.length === 6,
  readyForOperatorReview: false,
  readyForExecutionWindow: false,
};
```

review readiness：

```ts
checks.readyForOperatorReview = checks.sourceArchiveAdapterReady
  && checks.sourceArchiveAdapterDigestValid
  && checks.upstreamActionsStillDisabled
  && checks.startsNoUpstreamsAutomatically
  && checks.forbidsWriteActions;
```

execution window readiness：

```ts
checks.readyForExecutionWindow = checks.readyForOperatorReview
  && checks.probeWindowExplicitlyOpen
  && input.config.upstreamActionsEnabled === false;
```

当前结果：

```text
readyForOperatorReview=true
readyForExecutionWindow=false
```

## digest

本版新增 request digest：

```ts
const requestDigest = digestRequest({
  profileVersion: "production-live-probe-real-read-smoke-execution-request.v1",
  sourceArchiveAdapterDigest: sourceAdapter.adapter.adapterDigest,
  sourceArchiveAdapterMode: sourceAdapter.adapter.adapterMode,
  sourceReadinessSwitchDigest: sourceAdapter.adapter.readinessSwitchDigest,
  currentUpstreamProbesEnabled: input.config.upstreamProbesEnabled,
  currentUpstreamActionsEnabled: input.config.upstreamActionsEnabled,
  requiredUpstreamProbesEnabled: true,
  requiredUpstreamActionsEnabled: false,
  allowedProbeIds: allowedReadOnlyProbes.map((probe) => probe.id),
  forbiddenActionIds: forbiddenActions.map((action) => action.id),
  commandStepStatuses: operatorCommandProfile.map((step) => [step.id, step.status]),
});
```

它把执行请求本身变成可引用证据。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-real-read-smoke-execution-request
GET /api/v1/production/live-probe-real-read-smoke-execution-request?format=markdown
```

路由仍然只读：

```ts
const profile = await loadProductionLiveProbeRealReadSmokeExecutionRequest({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeExecutionRequest.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-live-probe-real-read-smoke-execution-request.v1",
  requestState: "draft-review",
  readyForOperatorReview: true,
  readyForExecutionWindow: false,
  requiredEnvironment: {
    UPSTREAM_PROBES_ENABLED: "true",
    UPSTREAM_ACTIONS_ENABLED: "false",
  },
});
```

还覆盖：

```text
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe real-read smoke execution request
GET /api/v1/production/live-probe-real-read-smoke-execution-request
GET /api/v1/production/live-probe-real-read-smoke-execution-request?format=markdown
```

归档：

```text
b/144/图片/production-live-probe-real-read-smoke-execution-request.png
b/144/解释/运行调试说明.md
```

## 一句话总结

v144 把真实只读 smoke 的执行前请求固化出来：Node 生成可审阅的命令 profile 和安全边界，但不启动 Java / mini-kv、不执行真实 smoke、不允许任何写动作。
