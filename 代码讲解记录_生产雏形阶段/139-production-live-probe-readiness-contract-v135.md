# 第一百三十五版代码讲解：production live probe readiness contract

本版目标是定义 Java / mini-kv 只读 live probe 的前置契约。

它不启动 Java，不启动 mini-kv，也不探测上游。本版只说明：

```text
哪些目标可以 probe
哪些命令必须只读
skipped / pass / blocked 分别是什么意思
哪些动作明确禁止
```

## 本版所处项目进度

v134 已经把 dry-run approval ledger 和 archive verification 汇总到 production readiness summary v12。

v135 开始进入下一阶段：

```text
只读 live probe 准备阶段
```

但第一步不是马上连上游，而是先把允许探测的边界写清楚。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeReadinessContract.ts
```

入口函数：

```ts
export function createProductionLiveProbeReadinessContract(
  config: Pick<AppConfig,
    | "orderPlatformUrl"
    | "orderPlatformTimeoutMs"
    | "miniKvHost"
    | "miniKvPort"
    | "miniKvTimeoutMs"
    | "upstreamActionsEnabled"
  >,
): ProductionLiveProbeReadinessContract {
```

这里只读取配置，不读取 Java / mini-kv，不创建 socket，不发 HTTP。

## Java 只读目标

Java target：

```ts
return {
  id: "java-order-platform",
  role: "order-transaction-core",
  endpoint: config.orderPlatformUrl,
  startupRequiredByThisContract: false,
  readOnly: true,
  writesAllowed: false,
```

允许的 planned probes：

```ts
{
  id: "java-actuator-health",
  protocol: "http-get",
  target: `${config.orderPlatformUrl}/actuator/health`,
  readOnly: true,
  mutatesState: false,
}
```

以及：

```ts
{
  id: "java-ops-overview",
  protocol: "http-get",
  target: `${config.orderPlatformUrl}/api/v1/ops/overview`,
  readOnly: true,
  mutatesState: false,
}
```

明确禁止：

```text
POST /api/v1/failed-events/:id/replay
POST /api/v1/orders
POST /api/v1/orders/:id/pay
POST /api/v1/orders/:id/cancel
```

## mini-kv 只读目标

mini-kv target：

```ts
return {
  id: "mini-kv",
  role: "redis-like-infrastructure-lab",
  endpoint,
  startupRequiredByThisContract: false,
  readOnly: true,
  writesAllowed: false,
```

允许的 planned probes：

```ts
id:
  | "mini-kv-health"
  | "mini-kv-infojson"
  | "mini-kv-statsjson";
```

对应命令：

```text
HEALTH
INFOJSON
STATSJSON
```

明确禁止：

```text
SET
DEL
EXPIRE
FLUSH
unknown write/admin commands
```

## 状态定义

本版新增状态定义：

```ts
return [
  {
    status: "pass",
    meaning: "The live read-only probe returned expected evidence during an explicit probe window.",
  },
  {
    status: "skipped",
    meaning: "The upstream was not probed or was unavailable; local development may continue with skipped evidence.",
  },
  {
    status: "blocked",
    meaning: "The probe would require writes, unsafe actions, or an enabled upstream action path.",
  },
];
```

这给 v136 的 harness 定了边界：上游没开时不是失败，而是 `skipped evidence`。

## 核心 checks

核心检查：

```ts
const checks = {
  javaReadTargetsDefined: targets.javaOrderPlatform.plannedProbes.length === 2
    && targets.javaOrderPlatform.plannedProbes.every((probe) => probe.readOnly && !probe.mutatesState),
  miniKvReadTargetsDefined: targets.miniKv.plannedProbes.length === 3
    && targets.miniKv.plannedProbes.every((probe) => probe.readOnly && !probe.mutatesState),
  statusDefinitionsDefined: statusDefinitions.length === 3,
  noProbeAttempted: true,
  writeActionsForbidden: allProbes.every((probe) => probe.readOnly && !probe.mutatesState),
  upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
};
```

正常情况下：

```text
readyForLiveProbePlanning=true
probeAttempted=false
writeProbeCount=0
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-readiness-contract
GET /api/v1/production/live-probe-readiness-contract?format=markdown
```

路由代码：

```ts
const contract = createProductionLiveProbeReadinessContract(deps.config);
```

注意这里只有 `deps.config`，没有调用 `orderPlatform` 或 `miniKv` client。

## 测试覆盖

新增测试：

```text
test/productionLiveProbeReadinessContract.test.ts
```

核心断言：

```ts
expect(contract).toMatchObject({
  profileVersion: "production-live-probe-readiness-contract.v1",
  readyForLiveProbePlanning: true,
  readOnly: true,
  executionAllowed: false,
  probeAttempted: false,
  checks: {
    javaReadTargetsDefined: true,
    miniKvReadTargetsDefined: true,
    noProbeAttempted: true,
    writeActionsForbidden: true,
  },
});
```

路由测试覆盖 JSON 和 Markdown。

## README、运行调试和归档

README 新增：

```text
Production live probe readiness contract
GET /api/v1/production/live-probe-readiness-contract
```

本版运行：

```text
npm run typecheck
npx vitest run test/productionLiveProbeReadinessContract.test.ts
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

归档：

```text
b/135/图片/production-live-probe-readiness-contract.png
b/135/解释/运行调试说明.md
```

## 一句话总结

v135 把只读 live probe 的边界先写成 contract：Java 和 mini-kv 后续可以被只读探测，但本版本不启动、不探测、不写入任何上游。
