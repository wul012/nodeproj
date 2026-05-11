# 56 - v52 统一上游观察台

## 本版角色

v52 把 Node 的综合调试方向从“能连两个上游”推进到“能解释两个上游现在是什么状态”。

本版仍然保持松耦合：

```text
Node
 -> 只读观察 Java order platform
 -> 只读观察 mini-kv
 -> 汇总成 /api/v1/upstreams/overview
```

默认情况下不会触碰 Java 或 mini-kv。只有 `UPSTREAM_PROBES_ENABLED=true` 时，Node 才会真实探测上游；真实写动作仍然受 `UPSTREAM_ACTIONS_ENABLED=false` 拦截。

## mini-kv client：从 PING/SIZE 升级到 HEALTH/STATSJSON

文件：`src/clients/miniKvClient.ts`

新增的结果类型：

```ts
export interface MiniKvStatsJsonResult extends MiniKvCommandResult {
  stats: Record<string, unknown>;
}
```

这说明 `STATSJSON` 不只是普通字符串响应。Node 会保留原始响应，同时把 JSON 解析成 `stats`，给后续 overview 提取 `live_keys`、`wal_enabled`、`commands`、`connection_stats` 等字段。

新增的只读命令方法：

```ts
health(): Promise<MiniKvCommandResult> {
  return this.execute("HEALTH");
}

async statsJson(): Promise<MiniKvStatsJsonResult> {
  const result = await this.execute("STATSJSON");
  return {
    ...result,
    stats: parseMiniKvStatsJson(result.response),
  };
}
```

这里没有改变底层 TCP 协议。`MiniKvClient.execute()` 仍然是一条命令、一行响应的模型；只是把 mini-kv 已经提供的 `HEALTH` 和 `STATSJSON` 纳入 Node 只读观察面。

解析函数也显式防御异常响应：

```ts
export function parseMiniKvStatsJson(response: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(response);
  } catch {
    throw new AppHttpError(502, "MINIKV_STATSJSON_INVALID", "mini-kv returned invalid STATSJSON output");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new AppHttpError(502, "MINIKV_STATSJSON_INVALID", "mini-kv STATSJSON output must be a JSON object");
  }

  return parsed as Record<string, unknown>;
}
```

这段代码的意义是：mini-kv 如果返回坏 JSON，Node 不会假装正常，而是把它标成上游协议异常。

## OpsSnapshotService：保留安全开关，增强 mini-kv 采样

文件：`src/services/opsSnapshotService.ts`

核心安全判断没有变：

```ts
if (!this.upstreamProbesEnabled) {
  return disabledProbe("mini-kv", sampledAt);
}
```

所以默认运行 Node 时仍然不会连接 mini-kv。

探测开启后，mini-kv 采样从原来的 `PING + SIZE` 升级为：

```ts
const [ping, health, statsJson] = await Promise.all([
  this.miniKvClient.ping(),
  this.miniKvClient.health(),
  this.miniKvClient.statsJson(),
]);
```

判断状态时，Node 同时看两个信号：

```ts
const isPingHealthy = ping.response === "orderops" || ping.response === "PONG";
const isHealthHealthy = health.response.startsWith("OK");
const state = isPingHealthy && isHealthHealthy ? "online" : "degraded";
```

这比只看 `PING` 更接近真实运维判断。`PING` 只能说明 TCP 和命令处理还活着；`HEALTH` 能带出 mini-kv 自己整理的运行状态。

返回详情里保留完整原始信号：

```ts
details: {
  ping,
  health,
  statsJson,
}
```

这让 Dashboard、overview、归档证据链后面都可以继续读取更细的指标，而不需要重新访问 mini-kv。

## UpstreamOverview：把两个上游翻译成统一观察对象

文件：`src/services/upstreamOverview.ts`

入口函数：

```ts
export function createUpstreamOverview(config: AppConfig, snapshot: OpsSnapshot): UpstreamOverview {
  const javaOrderPlatform = javaObservation(config, snapshot.javaOrderPlatform);
  const miniKv = miniKvObservation(config, snapshot.miniKv);
  const states = [javaOrderPlatform.state, miniKv.state];
```

它不直接访问网络，而是消费 `OpsSnapshotService.sample()` 的结果。这一点很重要：采样入口只有一个，overview 是“解释层”，不是第二套探测逻辑。

Java 观察对象明确标注角色：

```ts
role: "order transaction core",
endpoint: config.orderPlatformUrl,
```

并且列出它在综合项目中的能力边界：

```ts
capabilities: [
  "actuator health",
  "order query and lifecycle commands",
  "outbox event visibility",
  "failed event management and approval flow",
],
```

mini-kv 观察对象也同样标注为基础设施实验位：

```ts
role: "redis-like infrastructure lab",
endpoint: `${config.miniKvHost}:${config.miniKvPort}`,
```

同时明确写策略：

```ts
writePolicy: "mini-kv writes remain experimental and must not become the Java order authority.",
```

这就是本项目的融合边界：mini-kv 可以被 Node 观察、可以后续作为 Redis-like 实验层，但不能变成订单权威存储。

## status route：新增统一只读 API

文件：`src/routes/statusRoutes.ts`

新增路由：

```ts
app.get("/api/v1/upstreams/overview", async () => {
  const snapshot = await deps.snapshots.sample();
  return createUpstreamOverview(deps.config, snapshot);
});
```

这个 API 的调用链是：

```text
GET /api/v1/upstreams/overview
 -> OpsSnapshotService.sample()
 -> Java health probe / mini-kv probe
 -> createUpstreamOverview()
 -> 返回统一观察对象
```

如果 `UPSTREAM_PROBES_ENABLED=false`，`sample()` 会返回 disabled，overview 也就是 disabled，不会绕过安全开关。

## Dashboard：增加入口，不改变操作风险

文件：`src/ui/dashboard.ts`

按钮入口：

```html
<button data-action="upstreamOverview">Upstream Overview</button>
```

点击后请求：

```js
if (action === "upstreamOverview") {
  write(await api("/api/v1/upstreams/overview"));
}
```

这个按钮只是显示 JSON，不执行任何 Java 或 mini-kv 写动作。

## 测试覆盖

文件：`test/miniKvCommandValidation.test.ts`

新增允许的只读命令：

```ts
expect(() => validateRawGatewayCommand("HEALTH")).not.toThrow();
expect(() => validateRawGatewayCommand("STATSJSON")).not.toThrow();
expect(() => validateRawGatewayCommand("KEYS orderops:")).not.toThrow();
```

文件：`test/opsSnapshotService.test.ts`

通过 fake client 验证探测开启时会读取 `HEALTH` 和 `STATSJSON`：

```ts
expect(snapshot.miniKv.state).toBe("online");
expect(snapshot.miniKv.latencyMs).toBe(7);
expect(snapshot.miniKv.message).toContain("wal_enabled=true");
```

文件：`test/upstreamOverview.test.ts`

验证默认 disabled：

```ts
expect(overview.overallState).toBe("disabled");
expect(overview.recommendedNextActions[0]).toContain("UPSTREAM_PROBES_ENABLED=true");
```

也验证真实信号提取：

```ts
expect(overview.upstreams.miniKv).toMatchObject({
  signals: {
    liveKeys: 3,
    walEnabled: true,
  },
});
```

## 一句话总结

v52 的重点不是让 Node 控制 Java 和 mini-kv，而是让 Node 先可靠地“看懂”它们：Java 是交易核心，mini-kv 是基础设施实验位，Node 用安全开关把真实探测和真实写动作分开。
