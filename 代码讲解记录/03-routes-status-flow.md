# 第三次讲解：路由层、状态采样和 SSE

第三次重点讲解 4 个文件：

```text
src/services/opsSnapshotService.ts
src/routes/statusRoutes.ts
src/routes/orderPlatformRoutes.ts
src/routes/miniKvRoutes.ts
```

这组文件负责把 client 能力暴露成 HTTP API。

整体链路是：

```text
浏览器请求
 -> Fastify route
 -> route 调用 service 或 client
 -> 返回 JSON / SSE
```

其中最有代表性的链路是状态采样：

```text
GET /api/v1/sources/status
 -> OpsSnapshotService.sample()
 -> 并发 probe Java 和 mini-kv
 -> 返回 OpsSnapshot
```

---

# 1. `OpsSnapshotService` 的角色

实际代码：

```ts
export class OpsSnapshotService {
  constructor(
    private readonly orderPlatformClient: OrderPlatformClient,
    private readonly miniKvClient: MiniKvClient,
  ) {}
```

这个 service 依赖两个 client：

```text
OrderPlatformClient
 -> 探测 Java 订单平台

MiniKvClient
 -> 探测 C++ mini-kv
```

它不处理 HTTP 请求细节，也不渲染页面。

它只负责生成一个状态快照：

```text
OpsSnapshot
```

---

# 2. `sample()`：生成完整快照

实际代码：

```ts
async sample(): Promise<OpsSnapshot> {
  const [javaOrderPlatform, miniKv] = await Promise.all([this.probeOrderPlatform(), this.probeMiniKv()]);

  return {
    sampledAt: new Date().toISOString(),
    node: {
      state: "online",
      uptimeSeconds: Math.round(process.uptime()),
      pid: process.pid,
      version: process.version,
    },
    javaOrderPlatform,
    miniKv,
  };
}
```

这里有两个重点。

第一，Java 和 mini-kv 是并发探测：

```ts
Promise.all([this.probeOrderPlatform(), this.probeMiniKv()])
```

不是先等 Java，再等 mini-kv。

这样状态接口的耗时接近两者中较慢的那个，而不是两者相加。

第二，Node 自己的状态直接来自进程：

```text
process.uptime()
process.pid
process.version
```

所以页面能显示当前 Node 控制台的运行信息。

---

# 3. 探测 Java 订单平台

实际代码：

```ts
private async probeOrderPlatform(): Promise<ProbeResult> {
  const sampledAt = new Date().toISOString();

  try {
    const response = await this.orderPlatformClient.health();
    const status = readStatus(response.data);
    return {
      name: "advanced-order-platform",
      state: status === "UP" ? "online" : "degraded",
      sampledAt,
      latencyMs: response.latencyMs,
      message: status ?? "health endpoint responded",
      details: response.data,
    };
  } catch (error) {
    return {
      name: "advanced-order-platform",
      state: "offline",
      sampledAt,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
```

成功时：

```text
调用 /actuator/health
 -> 读取 status
 -> status === UP 就 online
 -> 否则 degraded
```

失败时：

```text
任何错误都被转成 offline ProbeResult
```

这样状态接口不会因为 Java 挂掉而整体 500。

它会返回：

```json
{
  "name": "advanced-order-platform",
  "state": "offline",
  "message": "Order platform is unavailable: fetch failed"
}
```

这对控制台很重要：监控页面自己要活着，哪怕被监控服务挂了。

---

# 4. 读取 Java health status

实际代码：

```ts
function readStatus(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null || !("status" in data)) {
    return undefined;
  }

  const status = (data as { status?: unknown }).status;
  return typeof status === "string" ? status : undefined;
}
```

`/actuator/health` 正常返回对象：

```json
{ "status": "UP" }
```

但从 TypeScript 角度，`response.data` 是 `unknown`。

所以必须先判断：

```text
是不是 object
是不是 null
有没有 status 字段
status 是不是 string
```

这比直接写：

```ts
(response.data as any).status
```

更稳。

---

# 5. 探测 mini-kv

实际代码：

```ts
private async probeMiniKv(): Promise<ProbeResult> {
  const sampledAt = new Date().toISOString();

  try {
    const [ping, size] = await Promise.all([this.miniKvClient.ping(), this.miniKvClient.size()]);
    const isHealthy = ping.response === "orderops" || ping.response === "PONG";
```

mini-kv 探测同时发两条命令：

```text
PING orderops
SIZE
```

`PING` 证明 TCP 命令链路可用。

`SIZE` 证明 Store 命令也可执行。

然后根据 PING 结果判断是否健康：

```text
orderops
 -> 正常，因为 PING message 会返回 message

PONG
 -> 也接受，因为 PING 无 message 时会返回 PONG
```

---

# 6. mini-kv ProbeResult

实际代码：

```ts
return {
  name: "mini-kv",
  state: isHealthy ? "online" : "degraded",
  sampledAt,
  latencyMs: Math.max(ping.latencyMs, size.latencyMs),
  message: `ping=${ping.response} size=${size.response}`,
  details: {
    ping,
    size,
  },
};
```

这里的 `latencyMs` 取两条命令的最大值：

```ts
Math.max(ping.latencyMs, size.latencyMs)
```

原因是这两条命令并发执行。

一次 probe 的总耗时更接近较慢的那条命令。

`message` 会生成类似：

```text
ping=orderops size=3
```

这适合直接显示在 Dashboard 卡片上。

---

# 7. `statusRoutes.ts` 的 `/health`

实际代码：

```ts
app.get("/health", async () => ({
  service: "orderops-node",
  status: "ok",
  uptimeSeconds: Math.round(process.uptime()),
  pid: process.pid,
  version: process.version,
}));
```

这是 Node 控制台自己的健康检查。

它不依赖 Java，也不依赖 mini-kv。

所以即使两个上游都离线，`/health` 也应该返回：

```json
{
  "service": "orderops-node",
  "status": "ok"
}
```

---

# 8. `/api/v1/sources/status`

实际代码：

```ts
app.get("/api/v1/sources/status", async () => deps.snapshots.sample());
```

这是状态接口。

流程是：

```text
HTTP GET
 -> deps.snapshots.sample()
 -> 返回 OpsSnapshot
```

页面首次加载和 SSE 断线后的轮询兜底都会用这个接口。

---

# 9. `/api/v1/events/ops`：SSE 入口

实际代码：

```ts
app.get("/api/v1/events/ops", (request, reply) => {
  reply.hijack();
  reply.raw.writeHead(200, {
    "content-type": "text/event-stream; charset=utf-8",
    "cache-control": "no-cache, no-transform",
    connection: "keep-alive",
    "x-accel-buffering": "no",
  });
```

这段是 Server-Sent Events 的核心。

`reply.hijack()` 表示：

```text
我接管底层 Node response
不让 Fastify 自动结束响应
```

然后手动写响应头：

```text
content-type: text/event-stream
connection: keep-alive
cache-control: no-cache
```

这告诉浏览器：

```text
这个连接会持续打开
服务端会不断推送事件
```

---

# 10. SSE 发送 snapshot

实际代码：

```ts
const send = async () => {
  if (closed) {
    return;
  }

  try {
    const snapshot = await deps.snapshots.sample();
    reply.raw.write(`event: snapshot\ndata: ${JSON.stringify(snapshot)}\n\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    reply.raw.write(`event: error\ndata: ${JSON.stringify({ message })}\n\n`);
  }
};
```

SSE 数据格式是：

```text
event: 事件名
data: JSON 字符串

```

所以这里写的是：

```text
event: snapshot
data: {...}

```

浏览器端会监听：

```js
events.addEventListener("snapshot", ...)
```

---

# 11. SSE 定时采样

实际代码：

```ts
const interval = setInterval(() => {
  void send();
}, deps.config.opsSampleIntervalMs);
```

默认配置里：

```text
opsSampleIntervalMs = 2000
```

也就是每 2 秒推送一次状态快照。

这个间隔来自 `config.ts`，所以以后可以通过环境变量调整：

```text
OPS_SAMPLE_INTERVAL_MS
```

---

# 12. SSE 连接关闭清理

实际代码：

```ts
request.raw.on("close", () => {
  closed = true;
  clearInterval(interval);
});
```

当浏览器关闭页面或网络断开时，底层请求会触发 `close`。

这里必须清理定时器。

否则页面关掉后，服务端还会一直采样，一直往已经关闭的连接写数据。

---

# 13. `orderPlatformRoutes.ts` 的产品和 Outbox 路由

实际代码：

```ts
app.get("/api/v1/order-platform/products", async () => {
  const response = await deps.orderPlatform.listProducts();
  return response.data;
});

app.get("/api/v1/order-platform/outbox/events", async () => {
  const response = await deps.orderPlatform.listOutboxEvents();
  return response.data;
});
```

这两个路由非常薄。

它们只做：

```text
接收 HTTP 请求
 -> 调 Java client
 -> 返回 response.data
```

这种写法是刻意的。

因为业务逻辑在 Java 项目里，Node 网关不应该重新实现。

---

# 14. 查询单个订单

实际代码：

```ts
app.get<{ Params: OrderParams }>("/api/v1/order-platform/orders/:orderId", async (request) => {
  const response = await deps.orderPlatform.getOrder(request.params.orderId);
  return response.data;
});
```

这里使用了 Fastify 的 TypeScript 泛型：

```ts
{ Params: OrderParams }
```

对应的接口：

```ts
interface OrderParams {
  orderId: string;
}
```

这样 `request.params.orderId` 有明确类型。

---

# 15. 创建订单路由的 schema

实际代码：

```ts
app.post("/api/v1/order-platform/orders", {
  schema: {
    headers: {
      type: "object",
      required: ["idempotency-key"],
      properties: {
        "idempotency-key": { type: "string", minLength: 1, maxLength: 120 },
      },
    },
```

这里先校验 header：

```text
必须有 idempotency-key
长度 1 到 120
```

这对应 Java 项目的幂等键要求。

body schema：

```ts
body: {
  type: "object",
  required: ["customerId", "items"],
  properties: {
    customerId: { type: "string", minLength: 1 },
    items: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["productId", "quantity"],
        properties: {
          productId: { type: "number" },
          quantity: { type: "number", minimum: 1 },
        },
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
},
```

它保证创建订单请求至少有：

```text
customerId
items
productId
quantity
```

---

# 16. 创建订单转发

实际代码：

```ts
const idempotencyKey = request.headers["idempotency-key"];
if (typeof idempotencyKey !== "string") {
  throw new AppHttpError(400, "IDEMPOTENCY_KEY_REQUIRED", "Idempotency-Key header is required");
}

const response = await deps.orderPlatform.createOrder(idempotencyKey, request.body);
reply.code(response.statusCode);
return response.data;
```

这里有两个细节。

第一，虽然 schema 已经要求 header，但 TypeScript 类型仍然可能是：

```text
string | string[] | undefined
```

所以代码里又做了一次运行时判断。

第二，返回时保留上游状态码：

```ts
reply.code(response.statusCode);
```

如果 Java 创建新订单返回 `201`，Node 也返回 `201`。

如果 Java 幂等重放返回 `200`，Node 也返回 `200`。

---

# 17. 支付和取消路由

实际代码：

```ts
app.post<{ Params: OrderParams }>("/api/v1/order-platform/orders/:orderId/pay", async (request, reply) => {
  const response = await deps.orderPlatform.payOrder(request.params.orderId);
  reply.code(response.statusCode);
  return response.data;
});

app.post<{ Params: OrderParams }>("/api/v1/order-platform/orders/:orderId/cancel", async (request, reply) => {
  const response = await deps.orderPlatform.cancelOrder(request.params.orderId);
  reply.code(response.statusCode);
  return response.data;
});
```

这两个路由不判断订单状态。

原因是：

```text
订单能否支付
订单能否取消
库存如何释放
Outbox 如何生成
```

都是 Java 订单平台的职责。

---

# 18. `miniKvRoutes.ts` 的状态接口

实际代码：

```ts
app.get("/api/v1/mini-kv/status", async () => {
  const [ping, size] = await Promise.all([deps.miniKv.ping(), deps.miniKv.size()]);
  return {
    ping,
    size,
  };
});
```

这个接口直接返回 mini-kv 的两条命令结果。

和 `OpsSnapshotService` 不同，这里更像调试接口：

```json
{
  "ping": {
    "command": "PING orderops",
    "response": "orderops",
    "latencyMs": 2
  },
  "size": {
    "command": "SIZE",
    "response": "3",
    "latencyMs": 2
  }
}
```

---

# 19. mini-kv key 读写删除路由

实际代码：

```ts
app.get<{ Params: KeyParams }>("/api/v1/mini-kv/:key", async (request) => deps.miniKv.getKey(request.params.key));
```

读 key：

```text
GET /api/v1/mini-kv/orderops:demo
 -> MiniKvClient.getKey("orderops:demo")
```

写 key：

```ts
app.put<{ Params: KeyParams; Body: SetKeyBody }>("/api/v1/mini-kv/:key", {
  schema: {
    body: {
      type: "object",
      required: ["value"],
      properties: {
        value: { type: "string", minLength: 1, maxLength: 16384 },
        ttlSeconds: { type: "integer", minimum: 1, maximum: 604800 },
      },
      additionalProperties: false,
    },
  },
}, async (request) => deps.miniKv.setKey(request.params.key, request.body.value, request.body.ttlSeconds));
```

写入时 body 必须有：

```text
value
```

可以选填：

```text
ttlSeconds
```

删除 key：

```ts
app.delete<{ Params: KeyParams }>("/api/v1/mini-kv/:key", async (request) => deps.miniKv.deleteKey(request.params.key));
```

---

# 20. mini-kv raw command 路由

实际代码：

```ts
app.post<{ Body: RawCommandBody }>("/api/v1/mini-kv/commands", {
  schema: {
    body: {
      type: "object",
      required: ["command"],
      properties: {
        command: { type: "string", minLength: 1, maxLength: 16384 },
      },
      additionalProperties: false,
    },
  },
}, async (request) => {
  validateRawGatewayCommand(request.body.command);
  return deps.miniKv.execute(request.body.command);
});
```

这个接口给 Dashboard 的 raw command 输入框使用。

但真正执行前必须先过：

```ts
validateRawGatewayCommand(request.body.command)
```

也就是：

```text
先校验命令格式
再检查命令白名单
最后才发给 mini-kv
```

这避免用户从页面触发 `SAVE`、`LOAD` 等文件相关命令。

---

# 总结

第三组文件把项目的 HTTP 对外接口串起来了：

```text
OpsSnapshotService
 -> 聚合 Java、mini-kv、Node 自身状态

StatusRoutes
 -> /health、状态接口、SSE 实时流

OrderPlatformRoutes
 -> Java 订单平台控制入口

MiniKvRoutes
 -> C++ mini-kv 控制入口
```

一句话总结：路由层保持很薄，只做 HTTP 边界、参数校验和 client 调用，把业务核心留在已有 Java / C++ 项目里。
