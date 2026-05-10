# 第八次讲解：第四版上游动作闸门

第四版继续强化安全边界。

第三版解决的是：

```text
Dashboard / SSE / sources status 不自动探测 Java / mini-kv
```

第四版解决的是：

```text
用户误点 Dashboard 里的 Products、mini-kv Ping、Create 等按钮时，也不应该默认碰 Java / mini-kv
```

所以 V4 新增：

```text
UPSTREAM_ACTIONS_ENABLED=false
```

默认关闭所有真正调用上游服务的代理动作。

---

# 1. config.ts 新增 upstreamActionsEnabled

实际代码：

```ts
export interface AppConfig {
  host: string;
  port: number;
  logLevel: string;
  orderPlatformUrl: string;
  orderPlatformTimeoutMs: number;
  miniKvHost: string;
  miniKvPort: number;
  miniKvTimeoutMs: number;
  opsSampleIntervalMs: number;
  upstreamProbesEnabled: boolean;
  upstreamActionsEnabled: boolean;
}
```

这里新增：

```text
upstreamActionsEnabled
```

它和 `upstreamProbesEnabled` 的区别是：

```text
upstreamProbesEnabled
 -> 控制状态采样是否探测上游

upstreamActionsEnabled
 -> 控制代理 API 是否真正调用上游
```

---

# 2. 默认关闭动作

实际代码：

```ts
upstreamActionsEnabled: readBoolean(env, "UPSTREAM_ACTIONS_ENABLED", false),
```

默认是：

```text
false
```

也就是说，不设置环境变量时：

```text
/api/v1/order-platform/products
/api/v1/mini-kv/status
/api/v1/mini-kv/commands
```

这些会触碰上游的接口都会被 Node 自己拦住。

---

# 3. upstreamActionGuard.ts

实际代码：

```ts
export function assertUpstreamActionsEnabled(enabled: boolean, target: string): void {
  if (enabled) {
    return;
  }

  throw new AppHttpError(
    403,
    "UPSTREAM_ACTIONS_DISABLED",
    `${target} access is disabled by UPSTREAM_ACTIONS_ENABLED=false`,
    {
      target,
      enableWith: "UPSTREAM_ACTIONS_ENABLED=true",
    },
  );
}
```

这个函数是 V4 的核心闸门。

如果开关打开：

```text
直接 return
```

如果开关关闭：

```text
抛出 403 AppHttpError
```

返回给浏览器的错误结构类似：

```json
{
  "error": "UPSTREAM_ACTIONS_DISABLED",
  "message": "mini-kv access is disabled by UPSTREAM_ACTIONS_ENABLED=false",
  "details": {
    "target": "mini-kv",
    "enableWith": "UPSTREAM_ACTIONS_ENABLED=true"
  }
}
```

---

# 4. Java 订单平台代理路由加闸门

实际代码：

```ts
interface OrderRouteDeps {
  orderPlatform: OrderPlatformClient;
  upstreamActionsEnabled: boolean;
}
```

路由依赖新增：

```text
upstreamActionsEnabled
```

产品列表路由：

```ts
app.get("/api/v1/order-platform/products", async () => {
  assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "advanced-order-platform");
  const response = await deps.orderPlatform.listProducts();
  return response.data;
});
```

关键点是：

```ts
assertUpstreamActionsEnabled(...)
```

在：

```ts
deps.orderPlatform.listProducts()
```

之前。

所以默认关闭时，不会发 HTTP 请求到 Java。

---

# 5. 创建、支付、取消订单也加闸门

实际代码：

```ts
app.post<{ Params: OrderParams }>("/api/v1/order-platform/orders/:orderId/pay", async (request, reply) => {
  assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "advanced-order-platform");
  const response = await deps.orderPlatform.payOrder(request.params.orderId);
  reply.code(response.statusCode);
  return response.data;
});
```

同样的模式也用于：

```text
创建订单
查询订单
支付订单
取消订单
Outbox 查询
```

这保证误点 Dashboard 不会改变 Java 项目状态。

---

# 6. mini-kv 路由加闸门

实际代码：

```ts
interface MiniKvRouteDeps {
  miniKv: MiniKvClient;
  upstreamActionsEnabled: boolean;
}
```

状态接口：

```ts
app.get("/api/v1/mini-kv/status", async () => {
  assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "mini-kv");
  const [ping, size] = await Promise.all([deps.miniKv.ping(), deps.miniKv.size()]);
  return {
    ping,
    size,
  };
});
```

这里默认关闭时，不会建立 TCP 连接到 mini-kv。

---

# 7. raw command 也加闸门

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
  assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "mini-kv");
  validateRawGatewayCommand(request.body.command);
  return deps.miniKv.execute(request.body.command);
});
```

执行顺序是：

```text
先检查 action gate
再校验命令白名单
最后才 execute
```

默认关闭时，连命令校验都不是关键点，因为根本不会发给上游。

---

# 8. app.ts 注入动作开关

实际代码：

```ts
await registerOrderPlatformRoutes(app, { orderPlatform, upstreamActionsEnabled: config.upstreamActionsEnabled });
await registerMiniKvRoutes(app, { miniKv, upstreamActionsEnabled: config.upstreamActionsEnabled });
```

`config.ts` 读取环境变量后，由 `app.ts` 注入到对应路由。

这样路由不需要自己读 `process.env`。

---

# 9. runtime config endpoint

实际代码：

```ts
app.get("/api/v1/runtime/config", async () => ({
  service: "orderops-node",
  safety: {
    upstreamProbesEnabled: deps.config.upstreamProbesEnabled,
    upstreamActionsEnabled: deps.config.upstreamActionsEnabled,
  },
  upstreams: {
    orderPlatformUrl: deps.config.orderPlatformUrl,
    miniKv: `${deps.config.miniKvHost}:${deps.config.miniKvPort}`,
  },
  opsSampleIntervalMs: deps.config.opsSampleIntervalMs,
}));
```

这个接口不访问上游。

它只返回当前 Node 运行配置摘要。

Dashboard 用它显示：

```text
Probe mode
Action mode
Order upstream
mini-kv upstream
```

---

# 10. Dashboard 显示动作模式

实际 HTML：

```html
<article class="card">
  <div class="metric-name">Action mode</div>
  <div class="metric-value" id="actionMode">-</div>
  <div class="muted">UPSTREAM_ACTIONS_ENABLED</div>
</article>
```

实际 JavaScript：

```js
async function refreshRuntimeConfig() {
  const config = await api("/api/v1/runtime/config");
  $("probeMode").textContent = config.safety.upstreamProbesEnabled ? "on" : "off";
  $("actionMode").textContent = config.safety.upstreamActionsEnabled ? "on" : "off";
  $("orderUpstream").textContent = config.upstreams.orderPlatformUrl;
  $("kvUpstream").textContent = config.upstreams.miniKv;
  return config;
}
```

页面加载后会自动调用：

```js
void refreshRuntimeConfig().catch(() => {});
```

所以一打开页面就能看到：

```text
Probe mode = off
Action mode = off
```

---

# 11. 测试验证闸门

V4 新增：

```text
test/upstreamActionGuard.test.ts
```

直接测试 guard：

```ts
expect(() => assertUpstreamActionsEnabled(true, "mini-kv")).not.toThrow();
expect(() => assertUpstreamActionsEnabled(false, "mini-kv")).toThrow(AppHttpError);
```

还验证错误码：

```ts
expect((error as AppHttpError).statusCode).toBe(403);
expect((error as AppHttpError).code).toBe("UPSTREAM_ACTIONS_DISABLED");
```

---

# 12. Fastify inject 测试默认阻断

实际代码：

```ts
const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

const products = await app.inject({
  method: "GET",
  url: "/api/v1/order-platform/products",
});
const miniKvStatus = await app.inject({
  method: "GET",
  url: "/api/v1/mini-kv/status",
});
```

这里没有启动真实 HTTP 服务，也没有连接 Java / mini-kv。

`inject` 是 Fastify 内部测试请求。

断言：

```ts
expect(products.statusCode).toBe(403);
expect(miniKvStatus.statusCode).toBe(403);
```

这证明默认配置下代理路由会被 Node 拦住。

---

# 总结

第四版新增的是动作层安全边界：

```text
UPSTREAM_PROBES_ENABLED=false
 -> 不自动探测上游

UPSTREAM_ACTIONS_ENABLED=false
 -> 不允许代理动作触碰上游
```

一句话总结：V4 让 `orderops-node` 不仅能安静运行，还能防止误点操作影响 Java 和 mini-kv 的开发调试。
