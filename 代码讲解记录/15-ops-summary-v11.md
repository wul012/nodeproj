# 15 - V11 ops summary

V11 给控制台加了一个本地运营指标汇总接口：`GET /api/v1/ops/summary`。

它不访问 Java / mini-kv，只聚合 Node 内存里的 audit、intent、dispatch、timeline event 和 rate limit 信号。

## 1. Summary service

文件：`src/services/opsSummary.ts`

V11 新增：

```ts
export interface OpsSummary {
  service: "orderops-node";
  generatedAt: string;
  safety: {
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
  };
  mutationRateLimit: {
    windowMs: number;
    maxRequests: number;
  };
```

这个接口把控制台最关心的状态放在一个响应里。

## 2. Intent 指标

文件：`src/services/opsSummary.ts`

summary 会读取 intent store：

```ts
const intents = deps.operationIntents.list(1000);
```

然后统计状态、目标和风险：

```ts
intents: {
  total: intents.length,
  byStatus: intentStatus,
  byTarget: countBy(intents.map((intent) => intent.plan.target)),
  byRisk: countBy(intents.map((intent) => intent.plan.risk)),
```

最新 intent 只保留摘要：

```ts
latest: intents[0] === undefined
  ? undefined
  : {
    id: intents[0].id,
    action: intents[0].plan.action,
    status: intents[0].status,
    operatorId: intents[0].operator.id,
    createdAt: intents[0].createdAt,
  },
```

## 3. Dispatch 指标

文件：`src/services/opsSummary.ts`

dispatch ledger 也被汇总：

```ts
const dispatches = deps.operationDispatches.list(1000);
```

核心指标：

```ts
dispatches: {
  total: dispatches.length,
  byStatus: dispatchStatus,
  upstreamTouched: dispatches.filter((dispatch) => dispatch.upstreamTouched).length,
```

当前项目里 `upstreamTouched` 理论上应该一直是 0。这个指标是后面接真实执行器时的安全观察点。

## 4. Timeline event 指标

文件：`src/services/opsSummary.ts`

V11 也汇总 timeline event：

```ts
const events = deps.operationIntents.listEvents({ limit: 1000 });
```

```ts
events: {
  total: events.length,
  byType: countBy<OperationIntentEventType>(events.map((event) => event.type)),
```

所以你能看到 `intent.blocked`、`intent.dispatch.rejected`、`intent.idempotency_replayed` 这些事件数量。

## 5. Signals 聚合

文件：`src/services/opsSummary.ts`

`signals` 是给 dashboard 快速展示的摘要：

```ts
signals: {
  blockedIntents: intentStatus.blocked ?? 0,
  pendingConfirmations: intentStatus["pending-confirmation"] ?? 0,
  confirmedIntents: intentStatus.confirmed ?? 0,
  rejectedDispatches: dispatchStatus.rejected ?? 0,
  dryRunDispatches: dispatchStatus["dry-run-completed"] ?? 0,
  rateLimitedRequests: auditEvents.filter((event) => event.statusCode === 429).length,
  upstreamTouchedDispatches: dispatches.filter((dispatch) => dispatch.upstreamTouched).length,
},
```

这里的 `rateLimitedRequests` 来自 audit log 的 429 记录。

## 6. Summary route

文件：`src/routes/opsSummaryRoutes.ts`

路由非常薄：

```ts
export async function registerOpsSummaryRoutes(app: FastifyInstance, deps: OpsSummaryRouteDeps): Promise<void> {
  app.get("/api/v1/ops/summary", async () => createOpsSummary(deps));
}
```

这符合当前项目的分层：路由只负责 HTTP，聚合逻辑留在 service。

## 7. app.ts 装配

文件：`src/app.ts`

V11 注册：

```ts
await registerOpsSummaryRoutes(app, { config, auditLog, operationIntents, operationDispatches });
```

它复用已有的内存对象，不新建额外状态。

## 8. Audit route group

文件：`src/services/auditLog.ts`

V11 给 audit 分组补了：

```ts
if (normalized.startsWith("/api/v1/operation-")) {
  return "operations";
}

if (normalized.startsWith("/api/v1/ops")) {
  return "ops";
}
```

这样 ops summary 自己的请求也能被 audit 归类。

## 9. Dashboard 指标卡

文件：`src/ui/dashboard.ts`

V11 新增四个指标：

```html
<div class="metric-name">Ops intents</div>
<div class="metric-value" id="opsIntentTotal">0</div>
```

```html
<div class="metric-name">Dispatches</div>
<div class="metric-value" id="opsDispatchTotal">0</div>
```

```html
<div class="metric-name">Timeline events</div>
<div class="metric-value" id="opsEventTotal">0</div>
```

```html
<div class="metric-name">Rate limited</div>
<div class="metric-value" id="opsRateLimited">0</div>
```

刷新逻辑：

```js
async function refreshOpsSummary() {
  const summary = await api("/api/v1/ops/summary");
  $("opsIntentTotal").textContent = summary.intents.total;
  $("opsIntentSignal").textContent = "blocked " + summary.signals.blockedIntents + " / pending " + summary.signals.pendingConfirmations;
```

按钮：

```html
<button data-action="opsSummary">Ops Summary</button>
```

## 10. 测试覆盖

文件：`test/opsSummary.test.ts`

创建 blocked intent，再 dispatch：

```ts
const created = await app.inject({
  method: "POST",
  url: "/api/v1/operation-intents",
  payload: {
    action: "kv-set",
    operatorId: "summary-admin",
    role: "admin",
  },
});
```

summary 里应该看到：

```ts
expect(response.json()).toMatchObject({
  intents: {
    total: 1,
    byStatus: {
      blocked: 1,
    },
  },
  dispatches: {
    total: 1,
    byStatus: {
      rejected: 1,
    },
    upstreamTouched: 0,
  },
});
```

限流信号也被覆盖：

```ts
expect(response.json().signals.rateLimitedRequests).toBe(1);
```

## 一句话总结

V11 把控制台的本地状态从“分散在多个接口里”整理成一个 ops summary，方便 dashboard 展示，也方便后续做持久化和告警。
