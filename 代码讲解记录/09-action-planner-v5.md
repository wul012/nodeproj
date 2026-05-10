# 09 - V5 本地动作计划 dry-run

V5 加的是“动作计划”能力：在真正点击会访问 Java / mini-kv 的按钮之前，先让 Node 只在本地算一遍这个动作会走哪条路由、会访问哪个上游、当前安全开关是否允许。

关键点是：`/api/v1/action-plans` 不会调用 `OrderPlatformClient` 或 `MiniKvClient`，所以它不会打断另外两个项目的运行调试。

## 1. 动作清单集中在 actionPlanner

文件：`src/services/actionPlanner.ts`

先用固定枚举列出 Node 目前认识的动作：

```ts
export const actionKeys = [
  "order-products",
  "order-outbox",
  "order-load",
  "order-create",
  "order-pay",
  "order-cancel",
  "kv-status",
  "kv-get",
  "kv-set",
  "kv-delete",
  "kv-command",
] as const;
```

这段的意义是：动作计划不是随便传一个字符串就能执行，而是必须落在 Node 已登记的操作表里。后面路由 schema 也复用了这个 `actionKeys`。

每个动作都写成一个 `ActionDefinition`，里面记录目标系统、风险级别、Node 路由和“如果真的执行会访问什么上游”：

```ts
"kv-set": {
  action: "kv-set",
  target: "mini-kv",
  label: "Set key",
  risk: "write",
  requires: ["key", "value", "ttlSeconds?"],
  nodeRoute: { method: "PUT", path: "/api/v1/mini-kv/:key" },
  upstream: (config) => ({
    type: "tcp",
    endpoint: `${config.miniKvHost}:${config.miniKvPort}`,
    command: "SET <key> <value>; optional EXPIRE <key> <ttlSeconds>",
  }),
},
```

这和 `mini-kv` 里常见的命令解释方式一致：先说动作是什么，再说明它最终会落到哪条命令上。区别是这里没有真的 `SET`，只是把“将会 SET”描述出来。

Java 订单平台也是同样思路：

```ts
"order-create": {
  action: "order-create",
  target: "order-platform",
  label: "Create order",
  risk: "write",
  requires: ["idempotencyKey", "orderBody"],
  nodeRoute: { method: "POST", path: "/api/v1/order-platform/orders" },
  upstream: (config) => ({
    type: "http",
    endpoint: config.orderPlatformUrl,
    method: "POST",
    path: "/api/v1/orders",
  }),
},
```

这里能看出 Node 项目的边界：Node 只知道 Java 上游的 HTTP API，不重新实现 Java 订单一致性。

## 2. createActionPlan 只做本地判断

文件：`src/services/actionPlanner.ts`

核心函数是：

```ts
export function createActionPlan(config: AppConfig, input: ActionPlanInput): ActionPlan {
  const definition = definitions[input.action];
```

它根据动作 key 取到定义，然后检查用户传入的 target 是否匹配：

```ts
if (input.target !== undefined && input.target !== definition.target) {
  throw new AppHttpError(400, "ACTION_TARGET_MISMATCH", "Action does not belong to the requested target", {
    action: definition.action,
    requestedTarget: input.target,
    actualTarget: definition.target,
  });
}
```

这能避免“我以为自己在预检 mini-kv，其实选到了订单动作”的误操作。

真正决定是否允许的地方只有一行：

```ts
const allowed = config.upstreamActionsEnabled;
```

然后返回一个 dry-run 结构：

```ts
return {
  dryRun: true,
  generatedAt: new Date().toISOString(),
  action: definition.action,
  target: definition.target,
  label: definition.label,
  risk: definition.risk,
  requires: [...definition.requires],
  allowed,
  ...(allowed ? {} : { blockedBy: "UPSTREAM_ACTIONS_ENABLED=false" }),
```

注意这里没有 `fetch`、没有 `net.createConnection`，也没有调用真实 client。它只是读 `config` 和本地定义表。

最后把安全开关也放进响应里：

```ts
safety: {
  upstreamProbesEnabled: config.upstreamProbesEnabled,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
},
```

这样你看到一个计划结果时，不用猜当前 Node 是不是安全模式。

## 3. 路由层只暴露 catalog 和 plan

文件：`src/routes/actionPlanRoutes.ts`

V5 新增两个 API：

```ts
app.get("/api/v1/action-plans/catalog", async () => ({
  targets: targetKeys.map((target) => ({
    target,
    actions: listActionCatalog().filter((action) => action.target === target),
  })),
}));
```

`catalog` 给 dashboard 或后续前端用，按 `order-platform` / `mini-kv` 分组展示可预检动作。

真正创建计划的 API 是：

```ts
app.post<{ Body: ActionPlanBody }>("/api/v1/action-plans", {
  schema: {
    body: {
      type: "object",
      required: ["action"],
      properties: {
        action: { type: "string", enum: actionKeys },
        target: { type: "string", enum: targetKeys },
      },
      additionalProperties: false,
    },
  },
}, async (request) => createActionPlan(deps.config, request.body));
```

这里的设计很重要：路由只依赖 `config`，没有依赖任何 upstream client。

## 4. app.ts 注册新路由

文件：`src/app.ts`

V5 在应用装配处加了：

```ts
import { registerActionPlanRoutes } from "./routes/actionPlanRoutes.js";
```

然后注册：

```ts
await registerDashboardRoutes(app);
await registerAuditRoutes(app, { auditLog });
await registerActionPlanRoutes(app, { config });
await registerStatusRoutes(app, { config, snapshots });
```

放在代理路由之前，表达的是：动作计划是 Node 自己的控制面能力，和 Java / mini-kv 代理调用分开。

## 5. Dashboard 增加预检入口

文件：`src/ui/dashboard.ts`

页面上加了一个动作选择器：

```html
<select id="planAction" aria-label="Action plan">
  <option value="order-products">Order: list products</option>
  <option value="order-create">Order: create order</option>
  <option value="kv-status">mini-kv: ping and size</option>
  <option value="kv-set">mini-kv: set key</option>
</select>
```

点击按钮时调用本地 plan API：

```js
if (action === "planAction") {
  write(await api("/api/v1/action-plans", {
    method: "POST",
    body: JSON.stringify({ action: $("planAction").value }),
  }));
}
```

这和真实 `kvSet` / `createOrder` 按钮不同。真实按钮会走代理路由，然后被 V4 的动作闸门挡住；V5 的 `planAction` 连代理路由都不进，只返回计划。

## 6. 测试验证默认不会触上游

文件：`test/actionPlanner.test.ts`

默认关闭动作开关时，mini-kv 写操作会被标成 blocked：

```ts
const plan = createActionPlan(config, { action: "kv-set" });

expect(plan).toMatchObject({
  dryRun: true,
  action: "kv-set",
  target: "mini-kv",
  risk: "write",
  allowed: false,
  blockedBy: "UPSTREAM_ACTIONS_ENABLED=false",
});
```

打开开关时，Java 读操作会显示允许：

```ts
const plan = createActionPlan(config, { target: "order-platform", action: "order-products" });

expect(plan).toMatchObject({
  action: "order-products",
  target: "order-platform",
  risk: "read",
  allowed: true,
});
```

路由测试也只打 `/api/v1/action-plans`：

```ts
const response = await app.inject({
  method: "POST",
  url: "/api/v1/action-plans",
  payload: { action: "order-create" },
});
```

`app.inject` 是 Fastify 内部注入请求，不会启动外部服务，也不会请求 Java / mini-kv。

## 一句话总结

V5 的价值是把“我准备点哪个危险按钮”变成一个可见、可测试、不会触碰上游的计划结果；它给后续 RBAC、审批流、操作确认、审计持久化都留了入口。
