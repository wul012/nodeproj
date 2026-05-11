# 第五十五版代码讲解：上游风险摘要

本版目标来自 `docs/plans/v54-post-infojson-roadmap.md` 的 Node v55：在 Node 已能读取 Java ops overview 和 mini-kv INFOJSON 的基础上，继续接入两个只读治理信号：

```text
Java v37: GET /api/v1/failed-events/summary
mini-kv v46: COMMANDSJSON
```

本版只改 Node，不改 Java 和 mini-kv；只读探测，不执行 Java replay，不开放 mini-kv 写操作。

## 1. Java client 新增 failed-event summary

位置：`src/clients/orderPlatformClient.ts`

本版新增响应类型：

```ts
export interface OrderPlatformFailedEventSummary {
  sampledAt?: string;
  totalFailedEvents?: number;
  pendingReplayApprovals?: number;
  approvedReplayApprovals?: number;
  rejectedReplayApprovals?: number;
  latestFailedAt?: string | null;
  latestApprovalAt?: string | null;
  replayBacklog?: number;
}
```

这个类型对应 Java v37 的 `FailedEventSummaryResponse`，核心是把失败事件治理压力压成几个数字：总失败数、待审批数、已审批/拒绝数、最近失败时间、最近审批时间和 replay backlog。

client 方法很薄：

```ts
failedEventsSummary(): Promise<UpstreamJsonResponse<OrderPlatformFailedEventSummary>> {
  return this.request("/api/v1/failed-events/summary");
}
```

这保持了 Node 的边界：Node 只读 Java 暴露的治理摘要，不进入 Java 的业务数据库，也不直接执行 replay。

## 2. mini-kv client 新增 COMMANDSJSON

位置：`src/clients/miniKvClient.ts`

本版新增命令目录结构：

```ts
export interface MiniKvCommandCatalogEntry {
  name?: string;
  category?: "read" | "write" | "admin" | "meta" | string;
  mutates_store?: boolean;
  touches_wal?: boolean;
  stable?: boolean;
  description?: string;
}
```

mini-kv v46 的 `COMMANDSJSON` 会返回：

```json
{
  "commands": [
    {
      "name": "SET",
      "category": "write",
      "mutates_store": true,
      "touches_wal": true,
      "stable": true,
      "description": "Set or update a key value"
    }
  ]
}
```

Node 侧新增：

```ts
async commandsJson(): Promise<MiniKvCommandsJsonResult> {
  const result = await this.execute("COMMANDSJSON");
  return {
    ...result,
    catalog: parseMiniKvCommandsJson(result.response),
  };
}
```

`parseMiniKvCommandsJson()` 仍然先做 JSON object 校验，并要求 `commands` 字段如果存在就必须是数组。这样旧 mini-kv 或损坏输出会被判定为上游信号不可用，而不是污染 overview。

## 3. snapshot 层做双 fallback

位置：`src/services/opsSnapshotService.ts`

Java 侧新增 `OrderPlatformFailedEventSummaryProbe`：

```ts
type OrderPlatformFailedEventSummaryProbe =
  | {
    status: "available";
    latencyMs: number;
    data: unknown;
  }
  | {
    status: "unavailable";
    message: string;
  };
```

`probeOrderPlatform()` 现在在 health 成功后并发读取：

```ts
const [opsOverview, failedEventSummary] = await Promise.all([
  this.probeOrderPlatformOpsOverview(),
  this.probeOrderPlatformFailedEventSummary(),
]);
```

也就是说，Java 活着但 failed-event summary 不可用时，Node 会把 Java 标成 `degraded`，并在 details 中保留失败原因。

mini-kv 侧新增 `MiniKvCommandCatalogProbe`，并把探测扩展为：

```ts
const [ping, health, statsJson, infoJson, commandCatalog] = await Promise.all([
  this.miniKvClient.ping(),
  this.miniKvClient.health(),
  this.miniKvClient.statsJson(),
  this.probeMiniKvInfoJson(),
  this.probeMiniKvCommandCatalog(),
]);
```

mini-kv 要成为 `online`，现在需要基础健康、INFOJSON 和 COMMANDSJSON 都可用：

```ts
const state = isPingHealthy && isHealthHealthy && infoJson.status === "available" && commandCatalog.status === "available"
  ? "online"
  : "degraded";
```

这符合 v55 的意图：Node 现在不只要知道 mini-kv 是否活着，还要知道这个运行实例能不能描述自己的命令风险。

## 4. overview 层输出治理压力与命令风险

位置：`src/services/upstreamOverview.ts`

Java signals 新增：

```ts
failedEventSummaryAvailable: failedEventSummary !== undefined,
failedEventSummaryLatencyMs: readJavaFailedEventSummaryLatency(probe.details),
failedEventSummary,
failedEventReplayBacklog: readNumber(failedEventSummary, "replayBacklog"),
failedEventPendingReplayApprovals: readNumber(failedEventSummary, "pendingReplayApprovals"),
failedEventApprovedReplayApprovals: readNumber(failedEventSummary, "approvedReplayApprovals"),
failedEventRejectedReplayApprovals: readNumber(failedEventSummary, "rejectedReplayApprovals"),
```

这些字段让 Node overview 可以回答：

```text
Java 当前失败事件压力大不大？
有多少 replay backlog？
有多少 replay approval 卡在 pending？
```

mini-kv signals 新增：

```ts
commandCatalogAvailable: commandCatalog !== undefined,
commandCatalogLatencyMs: readMiniKvCommandCatalogLatency(probe.details),
commandCatalogCounts,
writeCommandCount: commandCatalogCounts.write,
adminCommandCount: commandCatalogCounts.admin,
mutatingCommandCount: commandCatalogCounts.mutating,
walTouchingCommandCount: commandCatalogCounts.walTouching,
```

`countMiniKvCommands()` 负责从 `commands[]` 里算风险摘要：

```ts
return {
  total: commands.length,
  read: countByStringField(commands, "category", "read"),
  write: countByStringField(commands, "category", "write"),
  admin: countByStringField(commands, "category", "admin"),
  meta: countByStringField(commands, "category", "meta"),
  mutating: countByBooleanField(commands, "mutates_store", true),
  walTouching: countByBooleanField(commands, "touches_wal", true),
  unstable: countByBooleanField(commands, "stable", false),
};
```

这比把完整命令列表全塞给人看更适合控制面：overview 先告诉你危险命令有多少，再由后续版本决定是否展开详情。

## 5. 测试覆盖

位置：

```text
test/miniKvCommandValidation.test.ts
test/opsSnapshotService.test.ts
test/upstreamOverview.test.ts
```

本版覆盖：

```text
COMMANDS / COMMANDSJSON 进入 mini-kv raw command 白名单
COMMANDSJSON 合法 JSON 能解析
COMMANDSJSON 普通文本、数组、commands 非数组会被拒绝
Java failed-event summary 可用时 Java probe online
COMMANDSJSON 可用时 mini-kv probe online
COMMANDSJSON 不可用时 mini-kv probe degraded
overview 输出 Java replay backlog / pending approvals
overview 输出 mini-kv write/admin/mutating/WAL-touching command counts
```

## 6. 真实联调结果

v55 真实只读联调启动：

```text
Java v37 -> 127.0.0.1:18082
mini-kv v46 -> 127.0.0.1:16381
Node v55 -> 127.0.0.1:4195
```

关键结果：

```json
{
  "overallState": "online",
  "javaFailedSummaryAvailable": true,
  "javaReplayBacklog": 0,
  "miniCommandCatalogAvailable": true,
  "miniWriteCommandCount": 3,
  "miniAdminCommandCount": 4,
  "upstreamActionsEnabled": false
}
```

截图归档在：

```text
a/55/图片/04-browser-overview.png
```

这张图证明浏览器访问 `/api/v1/upstreams/overview` 能看到 v55 新增的 Java failed-event summary 和 mini-kv command catalog 信号。
