# 第五十七版代码讲解：Java failed-event replay readiness 接入

本版目标来自 `docs/plans/v56-post-dashboard-control-roadmap.md`：

```text
Node v57：Java failed-event replay readiness 接入
```

这一版仍然不执行 Java replay，也不创建 Java approval。Node 只增加一个受 `UPSTREAM_PROBES_ENABLED` 保护的只读入口，把 Java v38 的 readiness JSON 暴露到控制面，并让 Dashboard 可以查询。

## 1. Client：封装 Java v38 readiness endpoint

文件：

```text
src/clients/orderPlatformClient.ts
```

新增类型保留 Java v38 的主要字段：

```ts
export interface OrderPlatformFailedEventReplayReadiness {
  sampledAt?: string;
  failedEventId?: number;
  exists?: boolean;
  eventType?: string | null;
  aggregateType?: string | null;
  aggregateId?: string | null;
  failedAt?: string | null;
  managementStatus?: string | null;
  replayApprovalStatus?: string | null;
  replayBacklogPosition?: number | null;
  eligibleForReplay?: boolean;
  requiresApproval?: boolean;
  blockedBy?: string[];
  warnings?: string[];
  nextAllowedActions?: string[];
  latestReplayAttempt?: unknown;
  latestApproval?: unknown;
}
```

调用入口是：

```ts
failedEventReplayReadiness(failedEventId: string): Promise<UpstreamJsonResponse<OrderPlatformFailedEventReplayReadiness>> {
  return this.request(`/api/v1/failed-events/${encodeURIComponent(failedEventId)}/replay-readiness`);
}
```

这里继续复用 `request()`，所以超时、JSON 解析、HTTP 错误包装都和已有 Java client 一致。

## 2. Probe guard：只读也要有安全开关

文件：

```text
src/services/upstreamActionGuard.ts
```

过去只有真实动作开关：

```ts
assertUpstreamActionsEnabled(enabled, target)
```

v57 新增只读 probe 开关：

```ts
export function assertUpstreamProbesEnabled(enabled: boolean, target: string): void {
  if (enabled) {
    return;
  }

  throw new AppHttpError(
    403,
    "UPSTREAM_PROBES_DISABLED",
    `${target} read-only probes are disabled by UPSTREAM_PROBES_ENABLED=false`,
    {
      target,
      enableWith: "UPSTREAM_PROBES_ENABLED=true",
    },
  );
}
```

这样默认环境下访问 readiness 不会误触碰 Java。

## 3. Route：Node 暴露只读 readiness 查询

文件：

```text
src/routes/orderPlatformRoutes.ts
```

新增路由：

```ts
app.get<{ Params: FailedEventParams }>("/api/v1/order-platform/failed-events/:failedEventId/replay-readiness", {
  schema: {
    params: {
      type: "object",
      required: ["failedEventId"],
      properties: {
        failedEventId: { type: "string", pattern: "^[0-9]+$" },
      },
      additionalProperties: false,
    },
  },
}, async (request) => {
  assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "advanced-order-platform");
  const response = await deps.orderPlatform.failedEventReplayReadiness(request.params.failedEventId);
  return response.data;
});
```

这段代码有两个关键点：

- `failedEventId` 必须是数字字符串，和 Java 的 `@PathVariable Long id` 对齐
- 调用前先检查 `UPSTREAM_PROBES_ENABLED`，不是 `UPSTREAM_ACTIONS_ENABLED`

原因是 replay readiness 是只读预演，不是 replay 执行。

## 4. Action plan：把 readiness 放进受控操作目录

文件：

```text
src/services/actionPlanner.ts
```

新增 action：

```ts
"failed-event-replay-readiness": {
  action: "failed-event-replay-readiness",
  target: "order-platform",
  label: "Check failed-event replay readiness",
  risk: "read",
  gate: "probes",
  requires: ["failedEventId"],
  nodeRoute: { method: "GET", path: "/api/v1/order-platform/failed-events/:failedEventId/replay-readiness" },
  upstream: (config) => ({
    type: "http",
    endpoint: config.orderPlatformUrl,
    method: "GET",
    path: "/api/v1/failed-events/:failedEventId/replay-readiness",
  }),
},
```

为了让不同 action 使用不同安全门，本版给 action definition 增加：

```ts
export type ActionGate = "probes" | "actions";
```

然后在 `createActionPlan()` 里根据 gate 判断允许状态：

```ts
const gate = definition.gate ?? "actions";
const allowed = gate === "probes" ? config.upstreamProbesEnabled : config.upstreamActionsEnabled;
const blockedBy = gate === "probes" ? "UPSTREAM_PROBES_ENABLED=false" : "UPSTREAM_ACTIONS_ENABLED=false";
```

这让 readiness 在 probe 开关打开时可以预演，同时不会要求开启真实上游写动作。

## 5. Intent policy：保留 probe blocker

文件：

```text
src/services/operationIntent.ts
```

`PolicyBlockReason` 增加：

```ts
export type PolicyBlockReason = "UPSTREAM_ACTIONS_ENABLED=false" | "UPSTREAM_PROBES_ENABLED=false" | "ROLE_NOT_ALLOWED";
```

当 plan 被 probe gate 阻断时，policy 不再统一写成 action gate：

```ts
const upstreamBlocker = plan.blockedBy === "UPSTREAM_PROBES_ENABLED=false"
  ? "UPSTREAM_PROBES_ENABLED=false"
  : "UPSTREAM_ACTIONS_ENABLED=false";
```

这样后续 audit、intent timeline、preflight evidence 能准确说明是哪个安全门阻断。

## 6. Dashboard：增加 readiness 查询入口

文件：

```text
src/ui/dashboard.ts
```

Order Platform 卡片新增输入和按钮：

```html
<input id="failedEventId" placeholder="Failed event ID" inputmode="numeric">
<button data-action="failedEventReadiness">Replay Readiness</button>
```

渲染函数只展示最关键的操作判断：

```js
function renderFailedEventReadiness(readiness) {
  const state = readiness.exists === false
    ? "not found"
    : (readiness.eligibleForReplay ? "eligible" : "blocked");
  setText("failedEventReadinessSignal", state + " / approval " + (readiness.requiresApproval ? "required" : "not required"));
  setText("failedEventBlockersSignal", formatList(readiness.blockedBy));
  setText("failedEventNextActionsSignal", formatList(readiness.nextAllowedActions));
}
```

按钮动作：

```js
if (action === "failedEventReadiness") {
  write(await refreshFailedEventReadiness());
}
```

所以 Dashboard 现在可以输入 failed event id，直接看 Java v38 的 replay readiness。

## 7. 测试覆盖

新增：

```text
test/orderPlatformReplayReadiness.test.ts
```

核心覆盖两类情况：

```ts
expect(response.statusCode).toBe(403);
expect(response.json()).toMatchObject({
  error: "UPSTREAM_PROBES_DISABLED",
});
```

以及 probe 开启时透传 mock Java 响应：

```ts
expect(response.json()).toMatchObject({
  failedEventId: 42,
  eligibleForReplay: false,
  requiresApproval: true,
  blockedBy: ["REPLAY_APPROVAL_PENDING"],
  nextAllowedActions: ["REVIEW_REPLAY_APPROVAL"],
});
```

本版还更新了：

```text
test/actionPlanner.test.ts
test/upstreamActionGuard.test.ts
test/dashboard.test.ts
```

## 8. 本版不做什么

v57 明确不做：

```text
不调用 Java replay POST
不创建 Java replay approval
不把 readiness 当作真实执行授权
不批量 replay
不修改 Java 或 mini-kv
```

真正把 intent、readiness、dispatch、preflight bundle 做成统一证据包，留到后续 Node v59 更合适。
