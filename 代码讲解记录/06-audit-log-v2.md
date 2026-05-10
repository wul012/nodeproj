# 第六次讲解：第二版审计日志和请求观测

第二版重点新增 4 个部分：

```text
src/services/auditLog.ts
src/routes/auditRoutes.ts
src/app.ts 的请求 hook
src/ui/dashboard.ts 的审计面板
```

这版的目标不是改订单业务，也不是改 mini-kv 内核。

它只给 Node 控制台增加一层自己的观测能力：

```text
每个经过 Node 的 HTTP 请求
 -> 记录 request id、方法、路径、状态码、耗时
 -> 按路由分组
 -> 提供 events 和 summary API
 -> Dashboard 可查看摘要和最近事件
```

---

# 1. `AuditEvent`：一条审计事件

实际代码：

```ts
export interface AuditEvent {
  id: string;
  requestId: string;
  method: string;
  path: string;
  routeGroup: string;
  statusCode: number;
  outcome: AuditOutcome;
  durationMs: number;
  occurredAt: string;
}
```

这就是一条请求记录。

字段含义是：

```text
id
 -> 审计事件自己的 UUID

requestId
 -> Fastify 请求 id

method / path
 -> HTTP 方法和路径

routeGroup
 -> dashboard / health / mini-kv / order-platform 等分组

statusCode / outcome
 -> 响应状态和成功/错误分类

durationMs
 -> 请求耗时

occurredAt
 -> 发生时间
```

---

# 2. `AuditLog` 使用内存环形容量

实际代码：

```ts
const defaultCapacity = 200;

export class AuditLog {
  private readonly events: AuditEvent[] = [];

  constructor(private readonly capacity = defaultCapacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("AuditLog capacity must be a positive integer");
    }
  }
```

V2 暂时不引入数据库。

审计日志保存在内存里，默认最多 200 条。

这是为了保持第二版轻量：

```text
先把请求观测链路跑通
以后再把事件落到 PostgreSQL
```

---

# 3. `record`：写入一条事件

实际代码：

```ts
record(input: AuditRecordInput): AuditEvent {
  const event: AuditEvent = {
    id: randomUUID(),
    requestId: input.requestId,
    method: input.method.toUpperCase(),
    path: normalizePath(input.path),
    routeGroup: routeGroupForPath(input.path),
    statusCode: input.statusCode,
    outcome: outcomeForStatus(input.statusCode),
    durationMs: Math.max(0, Math.round(input.durationMs)),
    occurredAt: new Date().toISOString(),
  };
```

这里把原始请求信息加工成稳定事件：

```text
method 转大写
path 去掉 query string
routeGroup 自动分类
statusCode 转 outcome
durationMs 四舍五入且不小于 0
occurredAt 使用 ISO 时间
```

写入方式：

```ts
this.events.unshift(event);
if (this.events.length > this.capacity) {
  this.events.length = this.capacity;
}
```

新事件放在数组最前面。

超过容量后截断旧事件。

---

# 4. `summary`：生成摘要

实际代码：

```ts
summary(): AuditSummary {
  const total = this.events.length;
  const success = this.events.filter((event) => event.outcome === "success").length;
  const clientError = this.events.filter((event) => event.outcome === "client_error").length;
  const serverError = this.events.filter((event) => event.outcome === "server_error").length;
  const durationTotal = this.events.reduce((sum, event) => sum + event.durationMs, 0);
  const byRouteGroup = this.events.reduce<Record<string, number>>((groups, event) => {
    groups[event.routeGroup] = (groups[event.routeGroup] ?? 0) + 1;
    return groups;
  }, {});
```

摘要包括：

```text
总请求数
成功数
4xx 数
5xx 数
平均耗时
按 routeGroup 聚合
最新事件
```

这给 Dashboard 的审计卡片提供数据。

---

# 5. 路由分组

实际代码：

```ts
export function routeGroupForPath(path: string): string {
  const normalized = normalizePath(path);

  if (normalized === "/" || normalized.startsWith("/ui")) {
    return "dashboard";
  }

  if (normalized === "/health") {
    return "health";
  }

  if (normalized.startsWith("/api/v1/order-platform")) {
    return "order-platform";
  }
```

这个函数把 URL 分成稳定组：

```text
/
 -> dashboard

/health
 -> health

/api/v1/order-platform/...
 -> order-platform

/api/v1/mini-kv/...
 -> mini-kv

/api/v1/sources 或 /api/v1/events
 -> status

/api/v1/audit
 -> audit
```

这样摘要里不会只是一堆分散路径，而能看出哪类功能被调用最多。

---

# 6. 状态码转结果

实际代码：

```ts
export function outcomeForStatus(statusCode: number): AuditOutcome {
  if (statusCode >= 500) {
    return "server_error";
  }

  if (statusCode >= 400) {
    return "client_error";
  }

  return "success";
}
```

分类规则是：

```text
2xx / 3xx
 -> success

4xx
 -> client_error

5xx
 -> server_error
```

---

# 7. app.ts 生成请求 ID

实际代码：

```ts
const app = Fastify({
  logger: {
    level: config.logLevel,
  },
  genReqId: () => crypto.randomUUID(),
});
```

第二版给 Fastify 指定了 `genReqId`。

每个请求都会有 UUID 形式的 request id。

审计事件里保存：

```ts
requestId: request.id
```

这样日志和审计记录以后可以串起来。

---

# 8. app.ts 记录请求开始时间

实际代码：

```ts
const auditLog = new AuditLog();
const requestStartTimes = new WeakMap<object, number>();

app.addHook("onRequest", async (request) => {
  requestStartTimes.set(request, performance.now());
});
```

这里使用 `WeakMap` 保存请求开始时间。

key 是 request 对象。

value 是：

```ts
performance.now()
```

不用直接往 `request` 上挂自定义字段，是为了避免类型扩展和污染对象。

---

# 9. app.ts 在响应结束后记录审计事件

实际代码：

```ts
app.addHook("onResponse", async (request, reply) => {
  const startedAt = requestStartTimes.get(request);
  auditLog.record({
    requestId: request.id,
    method: request.method,
    path: request.url,
    statusCode: reply.statusCode,
    durationMs: startedAt === undefined ? 0 : performance.now() - startedAt,
  });
});
```

`onResponse` 会在响应完成时触发。

此时可以拿到：

```text
request.id
request.method
request.url
reply.statusCode
```

再用当前时间减去开始时间，得到耗时。

---

# 10. 注册审计路由

实际代码：

```ts
await registerDashboardRoutes(app);
await registerAuditRoutes(app, { auditLog });
await registerStatusRoutes(app, { config, snapshots });
await registerOrderPlatformRoutes(app, { orderPlatform });
await registerMiniKvRoutes(app, { miniKv });
```

第二版新增：

```ts
registerAuditRoutes(app, { auditLog })
```

审计路由和其他路由共享同一个 `auditLog` 实例。

---

# 11. `GET /api/v1/audit/events`

实际代码：

```ts
app.get<{ Querystring: EventsQuery }>("/api/v1/audit/events", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        limit: { type: "integer", minimum: 1, maximum: 200 },
      },
      additionalProperties: false,
    },
  },
}, async (request) => ({
  events: deps.auditLog.list(request.query.limit ?? 50),
}));
```

这个接口返回最近事件。

`limit` 可选：

```text
默认 50
最小 1
最大 200
```

schema 由 Fastify 校验。

---

# 12. `GET /api/v1/audit/summary`

实际代码：

```ts
app.get("/api/v1/audit/summary", async () => deps.auditLog.summary());
```

这个接口返回摘要。

Dashboard 的审计卡片就调用它。

---

# 13. Dashboard 审计卡片

实际代码：

```html
<section class="grid audit-grid">
  <article class="card">
    <div class="metric-name">Audit total</div>
    <div class="metric-value" id="auditTotal">0</div>
    <div class="muted">Recent in-memory requests</div>
  </article>
```

第二版新增了 4 个审计指标：

```text
Audit total
Success
Errors
Average
```

对应摘要字段：

```text
total
success
clientError + serverError
averageDurationMs
latest
```

---

# 14. Dashboard 刷新审计摘要

实际代码：

```js
async function refreshAudit() {
  const summary = await api("/api/v1/audit/summary");
  $("auditTotal").textContent = summary.total;
  $("auditSuccess").textContent = summary.success;
  $("auditErrors").textContent = summary.clientError + summary.serverError;
  $("auditAverage").textContent = summary.averageDurationMs + "ms";
  $("auditLatest").textContent = summary.latest ? summary.latest.method + " " + summary.latest.path : "No requests yet";
  return summary;
}
```

这个函数把后端摘要渲染到页面。

如果还没有事件，显示：

```text
No requests yet
```

---

# 15. Dashboard 审计按钮

实际代码：

```html
<section class="card" style="margin-top:16px">
  <h2>Audit</h2>
  <div class="row">
    <button class="primary" data-action="auditSummary">Summary</button>
    <button data-action="auditEvents">Recent Events</button>
  </div>
</section>
```

对应点击分支：

```js
if (action === "auditSummary") {
  write(await refreshAudit());
}
if (action === "auditEvents") {
  write(await api("/api/v1/audit/events?limit=20"));
  void refreshAudit().catch(() => {});
}
```

点击 `Summary` 显示摘要。

点击 `Recent Events` 显示最近 20 条请求。

---

# 16. 测试覆盖

第二版新增：

```text
test/auditLog.test.ts
```

测试写入三条事件：

```ts
log.record({
  requestId: "req-1",
  method: "get",
  path: "/health",
  statusCode: 200,
  durationMs: 4.4,
});
```

然后验证：

```ts
expect(summary.total).toBe(3);
expect(summary.success).toBe(1);
expect(summary.clientError).toBe(1);
expect(summary.serverError).toBe(1);
expect(summary.averageDurationMs).toBe(10);
```

还验证容量截断：

```ts
const log = new AuditLog(2);
...
expect(log.list().map((event) => event.requestId)).toEqual(["req-3", "req-2"]);
```

说明最新事件保留，旧事件被淘汰。

---

# 总结

第二版给 `orderops-node` 增加了自己的观测面：

```text
AuditLog
 -> 内存记录最近请求

onRequest / onResponse
 -> 自动采集耗时、状态码和路径

auditRoutes
 -> 提供 events 和 summary API

Dashboard
 -> 展示审计摘要和最近事件
```

一句话总结：V2 让 Node 控制台开始具备“看见自己怎么被使用”的能力，这是后续 RBAC、审计日志落库、操作追踪和可观测性扩展的基础。
