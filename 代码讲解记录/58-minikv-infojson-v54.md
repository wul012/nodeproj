# 第五十四版代码讲解：mini-kv INFOJSON 元信息接入

本版目标来自 `docs/plans/v52-cross-project-roadmap.md` 的 Node v54：在 v52 已有 `PING` / `HEALTH` / `STATSJSON` 的基础上，让 Node 消费 mini-kv v45 的 `INFOJSON`，把 mini-kv 的版本、协议、运行时间、WAL 模式和 metrics 模式放进 `/api/v1/upstreams/overview`。

本版只做只读接入，不开放新的真实写动作，不改 Java，也不改 mini-kv 源码。

## 1. mini-kv client 增加 INFOJSON 解析入口

位置：`src/clients/miniKvClient.ts`

核心新增类型：

```ts
export interface MiniKvInfoJson {
  version?: string;
  server?: {
    protocol?: string[];
    uptime_seconds?: number;
    max_request_bytes?: number;
  };
  store?: {
    live_keys?: number;
  };
  wal?: {
    enabled?: boolean;
  };
  metrics?: {
    enabled?: boolean;
  };
}
```

这份结构对应 mini-kv v45 的 JSON 合约：

```text
version
server.protocol
server.uptime_seconds
server.max_request_bytes
store.live_keys
wal.enabled
metrics.enabled
```

`MiniKvClient.infoJson()` 只做一件事：发送 `INFOJSON`，然后用 `parseMiniKvInfoJson()` 把返回值解析成对象：

```ts
async infoJson(): Promise<MiniKvInfoJsonResult> {
  const result = await this.execute("INFOJSON");
  return {
    ...result,
    info: parseMiniKvInfoJson(result.response),
  };
}
```

这里没有直接信任上游字符串。`parseMiniKvInfoJson()` 会先 `JSON.parse`，再要求结果必须是 JSON object；如果 mini-kv 返回旧版本的 `ERR unknown command`、普通文本或数组，都会转成 `MINIKV_INFOJSON_INVALID`。这样 Node 的探测层可以把它归为 fallback，而不是让外层 API 崩掉。

同文件里还把 raw command 白名单补上了 `INFOJSON`：

```ts
const allowed = new Set(["PING", "SIZE", "GET", "TTL", "SET", "DEL", "EXPIRE", "HEALTH", "STATSJSON", "INFOJSON", "KEYS"]);
```

注意：这不等于打开真实写动作。`/api/v1/mini-kv/commands` 仍然会先经过 `UPSTREAM_ACTIONS_ENABLED` 的 route gate；默认 `false` 时不会触碰上游。

## 2. snapshot 探测层把 INFOJSON 当作可降级信号

位置：`src/services/opsSnapshotService.ts`

本版新增 `MiniKvInfoJsonProbe`：

```ts
type MiniKvInfoJsonProbe =
  | {
    status: "available";
    latencyMs: number;
    info: unknown;
  }
  | {
    status: "unavailable";
    message: string;
  };
```

它的作用是区分两类情况：

```text
available   -> mini-kv v45 INFOJSON 可用
unavailable -> mini-kv 旧可执行文件、命令未知、超时或 JSON 不合法
```

`probeMiniKv()` 现在并发读取四个信号：

```ts
const [ping, health, statsJson, infoJson] = await Promise.all([
  this.miniKvClient.ping(),
  this.miniKvClient.health(),
  this.miniKvClient.statsJson(),
  this.probeMiniKvInfoJson(),
]);
```

这里 `PING`、`HEALTH`、`STATSJSON` 仍是基础健康信号；`INFOJSON` 是元信息信号。设计上，如果基础健康正常但 `INFOJSON` 不可用，mini-kv 不会变成 `offline`，而是 `degraded`：

```ts
const state = isPingHealthy && isHealthHealthy && infoJson.status === "available" ? "online" : "degraded";
```

这样做是为了兼容真实开发过程：你可能启动了旧的 mini-kv 可执行文件，它能响应 `HEALTH`，但还不支持 v45 的 `INFOJSON`。Node 会明确提示 `infojson=unavailable`，而不是误判整个 mini-kv 挂了。

消息也从只有健康和 stats 扩展为包含版本与协议：

```ts
return `${base} infojson=available version=${version ?? "unknown"} protocol=${protocol ?? "unknown"} uptime_seconds=${formatProbeValue(uptimeSeconds)}`;
```

实际联调里，如果 mini-kv v45 可执行文件正确，message 会包含类似：

```text
infojson=available version=0.45.0 protocol=inline,resp
```

## 3. upstream overview 展示 mini-kv 身份信号

位置：`src/services/upstreamOverview.ts`

`miniKvObservation()` 现在除了读取 `STATSJSON`，还读取 `details.infoJson.info`：

```ts
const stats = readMiniKvStats(probe.details);
const info = readMiniKvInfo(probe.details);
const server = readRecord(info, "server");
const store = readRecord(info, "store");
const walInfo = readRecord(info, "wal");
const metricsInfo = readRecord(info, "metrics");
```

对外信号增加：

```ts
signals: {
  infoJsonAvailable: info !== undefined,
  infoJsonLatencyMs: readMiniKvInfoLatency(probe.details),
  version: readString(info, "version"),
  protocol: readStringArray(server, "protocol"),
  uptimeSeconds: readNumber(server, "uptime_seconds"),
  maxRequestBytes: readNumber(server, "max_request_bytes"),
  liveKeys: readNumber(stats, "live_keys") ?? readNumber(store, "live_keys"),
  walEnabled: readBoolean(stats, "wal_enabled") ?? readBoolean(walInfo, "enabled"),
  metricsEnabled: readBoolean(metricsInfo, "enabled"),
  commandTotals: readRecord(stats, "commands"),
  connectionStats: readRecord(stats, "connection_stats"),
  wal: readRecord(stats, "wal"),
}
```

这里有两个细节：

1. `liveKeys` 和 `walEnabled` 优先使用 `STATSJSON`，因为它是运行期指标；如果 stats 里没有，再 fallback 到 `INFOJSON` 的身份字段。
2. `version`、`protocol`、`uptimeSeconds`、`maxRequestBytes`、`metricsEnabled` 来自 `INFOJSON`，它们更像“运行实例身份”，适合出现在控制面观察台里。

`readSignals` 也新增 `INFOJSON`：

```ts
readSignals: ["PING", "HEALTH", "STATSJSON", "INFOJSON", "KEYS prefix"]
```

如果 mini-kv 在线但没有 `INFOJSON`，推荐动作会提醒：

```ts
actions.push("Verify mini-kv INFOJSON before relying on version and protocol metadata.");
```

这和 v54 的定位一致：Node 不强行改 mini-kv，只把“你现在运行的到底是不是 v45 能力”显示出来。

## 4. 测试覆盖

位置：

- `test/miniKvCommandValidation.test.ts`
- `test/opsSnapshotService.test.ts`
- `test/upstreamOverview.test.ts`

`miniKvCommandValidation.test.ts` 新增了 `parseMiniKvInfoJson()` 的合法和非法输入覆盖：

```ts
expect(parseMiniKvInfoJson('{"version":"0.45.0", ... }')).toMatchObject({
  version: "0.45.0",
  server: {
    protocol: ["inline", "resp"],
  },
  metrics: {
    enabled: true,
  },
});
expect(() => parseMiniKvInfoJson("OK")).toThrow(/invalid INFOJSON/);
```

`opsSnapshotService.test.ts` 覆盖了两条关键路径：

```text
INFOJSON 可用 -> mini-kv online，message 包含 version=0.45.0
INFOJSON 不可用 -> mini-kv degraded，details.infoJson.status=unavailable
```

`upstreamOverview.test.ts` 确认 `/api/v1/upstreams/overview` 的 mini-kv signals 里能看到：

```text
infoJsonAvailable=true
version=0.45.0
protocol=["inline","resp"]
uptimeSeconds=42
maxRequestBytes=4096
metricsEnabled=true
```

这组测试保证 Node 不是只会“调用 INFOJSON”，而是真的能把字段映射到观察台输出。

## 5. 本版边界

本版没有做：

```text
不改 Java
不改 mini-kv 源码
不让 Java 依赖 mini-kv
不开放 mini-kv 写操作
不做 COMMANDS / COMMANDSJSON
```

实际调试中发现 `D:\C\mini-kv\cmake-build-debug\minikv_server.exe` 仍是旧构建，`INFOJSON` 返回 `ERR unknown command`。这正好验证了 fallback 路径：Node 会把 mini-kv 标为 `degraded`，而不是 `offline`。

随后使用独立临时目录 `D:\C\mini-kv\build-node-v54-smoke` 构建 mini-kv 当前 v45 源码，真实联调通过：

```json
{
  "miniKvState": "online",
  "miniKvVersion": "0.45.0",
  "miniKvProtocol": "inline,resp",
  "miniKvWalEnabled": false,
  "miniKvMetricsEnabled": true,
  "upstreamActionsEnabled": false
}
```

这个结果说明：Node v54 能识别 mini-kv v45 的真实版本和元信息；默认真实写动作仍然关闭。
