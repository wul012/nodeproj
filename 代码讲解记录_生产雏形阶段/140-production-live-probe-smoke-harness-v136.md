# 第一百三十六版代码讲解：production live probe smoke harness

本版目标是把 v135 的 live probe readiness contract 往前推进一步：

```text
真的形成一个 smoke harness，
但默认不碰 Java / mini-kv，
上游没启动时也不把版本判失败。
```

它仍然是生产雏形阶段的一部分，因为它解决的是生产接入前很关键的能力：**只读探测可以被计划、运行、归档，但写操作仍然被挡住**。

## 本版所处项目进度

v135 定义了 Java / mini-kv 能被只读探测的边界。

v136 做的是：

```text
根据 contract 生成 probe 结果
UPSTREAM_PROBES_ENABLED=false 时全部 skipped
UPSTREAM_PROBES_ENABLED=true 时只做只读请求
任何错误都转为 skipped evidence
```

所以它不是“强行联调上游”，而是先把 Node 自己的 live probe 证据模型补上。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeSmokeHarness.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeSmokeHarness(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeSmokeHarnessProfile> {
```

这里同时传入了 Java client 和 mini-kv client，但是否真的访问它们由配置控制。

## 先读取 v135 contract

本版没有重新手写探测目标，而是复用 v135 的 contract：

```ts
const contract = createProductionLiveProbeReadinessContract(input.config);
const plannedProbes = [
  ...contract.targets.javaOrderPlatform.plannedProbes,
  ...contract.targets.miniKv.plannedProbes,
];
```

这样 v136 的 probe 集合和 v135 的 contract 保持一致：

```text
Java: java-actuator-health / java-ops-overview
mini-kv: mini-kv-health / mini-kv-infojson / mini-kv-statsjson
```

## 默认 skipped，不打扰上游

核心分支：

```ts
const results = input.config.upstreamProbesEnabled
  ? await runLiveProbes(input, plannedProbes)
  : plannedProbes.map((probe) => skippedResult(probe, "UPSTREAM_PROBES_ENABLED=false; live probe smoke skipped by configuration."));
```

这段是本版最重要的安全边界。

当：

```text
UPSTREAM_PROBES_ENABLED=false
```

Node 不发 HTTP，也不连 TCP。它只把五个 planned probes 记录成 `skipped`。

这保证了本版不会打断 Java 高并发项目，也不会打断 mini-kv 的调试流程。

## 只读 live probe

如果之后用户明确启动 Java / mini-kv，并打开：

```text
UPSTREAM_PROBES_ENABLED=true
```

harness 才会进入：

```ts
async function runLiveProbes(input: {
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}, plannedProbes: ProductionLiveProbeDefinition[]): Promise<ProductionLiveProbeResult[]> {
  const results: ProductionLiveProbeResult[] = [];
  for (const probe of plannedProbes) {
    results.push(await runProbe(input, probe));
  }
  return results;
}
```

真实 probe 也只包含只读动作：

```ts
case "java-actuator-health": {
  const response = await input.orderPlatform.health();
  return passedResult(probe, response.latencyMs, response.statusCode, summarizeEvidence(response.data));
}
case "java-ops-overview": {
  const response = await input.orderPlatform.opsOverview();
  return passedResult(probe, response.latencyMs, response.statusCode, summarizeEvidence(response.data));
}
case "mini-kv-health": {
  const result = await input.miniKv.health();
  return passedResult(probe, result.latencyMs, undefined, { response: result.response });
}
```

mini-kv 的另外两个 probe 也是只读：

```text
INFOJSON
STATSJSON
```

没有 `SET`、`DEL`、`EXPIRE`、`FLUSH`。

## 上游不可用时转为 skipped

真实 probe 出错不会让本地开发失败：

```ts
} catch (error) {
  return skippedResult(probe, summarizeProbeError(error));
}
```

这意味着：

```text
Java 没启动 -> skipped
mini-kv 没启动 -> skipped
端口不可达 -> skipped
只读接口暂时不可用 -> skipped
```

但这不是“生产已就绪”。它只是说明 smoke harness 已经能给出可归档的 skipped evidence。

## 结果结构

单个结果由 `ProductionLiveProbeResult` 表示：

```ts
export interface ProductionLiveProbeResult {
  id: ProductionLiveProbeDefinition["id"];
  status: "pass" | "skipped" | "blocked";
  target: string;
  protocol: ProductionLiveProbeDefinition["protocol"];
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  latencyMs?: number;
  statusCode?: number;
  message: string;
  evidence?: unknown;
}
```

这里固定：

```text
readOnly=true
mutatesState=false
```

这两个字段就是后续 summary v13 判断“有没有越界”的基础。

## readiness checks

本版 checks：

```ts
const checks = {
  contractReady: contract.readyForLiveProbePlanning,
  probeSetMatchesContract: results.length === plannedProbes.length
    && plannedProbes.every((probe) => results.some((result) => result.id === probe.id)),
  allProbeResultsRecorded: results.length === plannedProbes.length,
  skippedAllowed: results.every((result) => result.status === "pass" || result.status === "skipped"),
  writeProbeAttempted: false as const,
  javaWritesAttempted: false as const,
  miniKvWritesAttempted: false as const,
  upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
  readyForLiveProbeEvidence: false,
};
```

然后汇总为：

```ts
checks.readyForLiveProbeEvidence = checks.contractReady
  && checks.probeSetMatchesContract
  && checks.allProbeResultsRecorded
  && checks.skippedAllowed
  && checks.upstreamActionsStillDisabled;
```

也就是说，本版的 ready 是：

```text
ready for live probe evidence
```

不是：

```text
ready for production execution
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-smoke-harness
GET /api/v1/production/live-probe-smoke-harness?format=markdown
```

路由代码：

```ts
const profile = await loadProductionLiveProbeSmokeHarness({
  config: deps.config,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

这也是为什么 `src/app.ts` 在注册 status routes 时把 `orderPlatform` 和 `miniKv` 传了进去。

## 测试覆盖

新增测试：

```text
test/productionLiveProbeSmokeHarness.test.ts
```

第一类测试覆盖默认安全模式：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-live-probe-smoke-harness.v1",
  readyForLiveProbeEvidence: true,
  readyForProductionConnections: false,
  readOnly: true,
  executionAllowed: false,
  probesEnabled: false,
  summary: {
    probeCount: 5,
    passedProbeCount: 0,
    skippedProbeCount: 5,
    blockedProbeCount: 0,
    productionBlockerCount: 0,
  },
});
```

第二类测试覆盖上游不可用：

```ts
UPSTREAM_PROBES_ENABLED: "true",
ORDER_PLATFORM_URL: "http://127.0.0.1:9",
MINIKV_PORT: "9",
```

断言仍然是：

```text
skippedProbeCount=5
blockedProbeCount=0
```

这说明 harness 可以尝试只读探测，但不会因为本地没开上游就把整个版本打失败。

第三类测试覆盖 JSON / Markdown 路由。

## README、运行调试和归档

README 新增：

```text
Production live probe smoke harness
GET /api/v1/production/live-probe-smoke-harness
GET /api/v1/production/live-probe-smoke-harness?format=markdown
```

本版运行结果：

```text
npm run typecheck
npx vitest run test/productionLiveProbeSmokeHarness.test.ts
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

HTTP smoke 关键值：

```text
profileVersion=production-live-probe-smoke-harness.v1
readyForLiveProbeEvidence=true
probesEnabled=false
skippedProbeCount=5
blockedProbeCount=0
productionBlockerCount=0
```

归档：

```text
b/136/图片/production-live-probe-smoke-harness.png
b/136/解释/运行调试说明.md
```

## 一句话总结

v136 把只读 live probe 从“计划契约”推进到“可运行 smoke harness”：默认不触碰上游，必要时只做只读探测，上游不可用时记录 skipped evidence，继续保持生产执行关闭。
