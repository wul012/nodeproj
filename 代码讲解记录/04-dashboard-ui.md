# 第四次讲解：内置 Dashboard 页面

第四次重点讲解 2 个文件：

```text
src/routes/dashboardRoutes.ts
src/ui/dashboard.ts
```

这两个文件让 Node 服务自己提供一个浏览器控制台。

核心链路是：

```text
GET /
 -> registerDashboardRoutes
 -> dashboardHtml()
 -> 返回完整 HTML
 -> 浏览器执行页面里的 JavaScript
 -> 调用 Node API 和 SSE
```

---

# 1. Dashboard 路由

实际代码：

```ts
import type { FastifyInstance } from "fastify";

import { dashboardHtml } from "../ui/dashboard.js";

export async function registerDashboardRoutes(app: FastifyInstance): Promise<void> {
  app.get("/", async (_request, reply) => {
    reply.type("text/html; charset=utf-8");
    return dashboardHtml();
  });
}
```

这个路由很简单。

访问：

```text
GET /
```

返回：

```text
text/html; charset=utf-8
```

页面内容来自：

```ts
dashboardHtml()
```

V1 没有引入 React / Vite，是为了让雏形更轻：

```text
一个 Node 服务
 -> 直接提供 API
 -> 直接提供 HTML 页面
```

---

# 2. `dashboardHtml()` 的角色

实际代码：

```ts
export function dashboardHtml(): string {
  return String.raw`<!doctype html>
<html lang="en">
```

这个函数返回一整个 HTML 字符串。

这里用：

```ts
String.raw`...`
```

原因是页面里有一些反斜杠和换行内容，`String.raw` 可以减少转义带来的干扰。

---

# 3. 页面标题和 viewport

实际代码：

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>OrderOps</title>
```

这三行分别负责：

```text
charset
 -> 使用 UTF-8

viewport
 -> 移动端按设备宽度布局

title
 -> 浏览器标签页显示 OrderOps
```

---

# 4. CSS 变量

实际代码：

```css
:root {
  color-scheme: light;
  --bg: #f6f7f9;
  --panel: #ffffff;
  --panel-soft: #eef3f8;
  --text: #172033;
  --muted: #667085;
  --line: #d9e0e8;
  --ok: #18794e;
  --warn: #b54708;
  --bad: #b42318;
  --accent: #2557a7;
  --accent-2: #0f766e;
  --shadow: 0 10px 30px rgba(23, 32, 51, 0.08);
}
```

页面把主要颜色放在 CSS 变量里。

状态颜色是三种：

```text
--ok
 -> online

--warn
 -> degraded

--bad
 -> offline
```

这和后端状态类型对应：

```ts
export type SourceState = "online" | "offline" | "degraded";
```

---

# 5. 页面整体容器

实际代码：

```css
.shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px;
}
```

`.shell` 让页面内容：

```text
最大宽度 1240px
水平居中
四周留 20px
```

这适合控制台页面，不会像营销页那样大面积空白。

---

# 6. 顶部标题栏

实际代码：

```html
<header class="topbar">
  <div class="brand">
    <h1>OrderOps</h1>
    <span>Node control plane for order-platform and mini-kv</span>
  </div>
  <div class="time" id="sampledAt">Waiting for first sample</div>
</header>
```

这里有两个区域：

```text
左边
 -> 项目名和说明

右边
 -> 最新采样时间
```

`sampledAt` 后面会被 JavaScript 更新：

```js
$("sampledAt").textContent = "Sampled " + snapshot.sampledAt;
```

---

# 7. 三个状态卡片

实际代码：

```html
<section class="grid status-grid">
  <article class="card status-card">
    <div class="metric-head">
      <div class="metric-name">Node gateway</div>
      <div class="badge online" id="nodeState">online</div>
    </div>
    <div class="metric-value" id="nodeUptime">0s</div>
    <div class="muted" id="nodeMeta">pid pending</div>
  </article>
```

第一张卡片显示 Node 自己。

后面两张分别显示：

```text
Java order platform
mini-kv
```

状态卡片和 `OpsSnapshot` 的结构一一对应：

```text
snapshot.node
snapshot.javaOrderPlatform
snapshot.miniKv
```

---

# 8. 状态卡片网格

实际代码：

```css
.status-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: 16px;
}
```

桌面端三列：

```text
Node | Java | mini-kv
```

移动端通过 media query 变成单列：

```css
@media (max-width: 880px) {
  .status-grid,
  .work-grid,
  .split {
    grid-template-columns: 1fr;
  }
```

这保证手机宽度不会挤坏。

---

# 9. badge 状态样式

实际代码：

```css
.online {
  color: var(--ok);
  background: #e9f7ef;
  border-color: #b7e4c7;
}

.degraded {
  color: var(--warn);
  background: #fff4e5;
  border-color: #ffd8a8;
}

.offline {
  color: var(--bad);
  background: #fff0f0;
  border-color: #ffc9c9;
}
```

后端返回状态：

```text
online / degraded / offline
```

前端直接把状态作为 class：

```js
el.className = "badge " + state;
```

这样状态值和 CSS class 对齐，逻辑简单。

---

# 10. Order Platform 操作区

实际代码：

```html
<article class="card">
  <h2>Order Platform</h2>
  <div class="row">
    <button class="primary" data-action="products">Products</button>
    <button data-action="outbox">Outbox</button>
  </div>
  <div class="row">
    <input id="orderId" placeholder="Order ID" inputmode="numeric">
    <button data-action="order">Load Order</button>
  </div>
  <textarea id="orderBody">{"customerId":"11111111-1111-1111-1111-111111111111","items":[{"productId":1,"quantity":1}]}</textarea>
  <div class="row">
    <input id="idempotencyKey" placeholder="Idempotency-Key" value="orderops-demo-001">
    <button class="secondary" data-action="createOrder">Create</button>
  </div>
</article>
```

这个区域对应 Node 的 Java 代理接口：

```text
Products
 -> GET /api/v1/order-platform/products

Outbox
 -> GET /api/v1/order-platform/outbox/events

Load Order
 -> GET /api/v1/order-platform/orders/:orderId

Create
 -> POST /api/v1/order-platform/orders
```

创建订单时页面提供了默认 JSON，方便本地快速试。

---

# 11. mini-kv 操作区

实际代码：

```html
<article class="card">
  <h2>mini-kv</h2>
  <div class="split">
    <input id="kvKey" placeholder="Key" value="orderops:demo">
    <input id="kvTtl" placeholder="TTL seconds">
  </div>
  <input id="kvValue" placeholder="Value" value="hello-from-orderops">
  <div class="row">
    <button class="primary" data-action="kvGet">Get</button>
    <button class="secondary" data-action="kvSet">Set</button>
    <button data-action="kvDelete">Delete</button>
    <button data-action="kvPing">Ping</button>
  </div>
```

这个区域对应 mini-kv 的 HTTP 网关：

```text
Get
 -> GET /api/v1/mini-kv/:key

Set
 -> PUT /api/v1/mini-kv/:key

Delete
 -> DELETE /api/v1/mini-kv/:key

Ping
 -> GET /api/v1/mini-kv/status
```

---

# 12. Raw command 输入

实际代码：

```html
<div class="row">
  <input id="rawCommand" placeholder="Raw command" value="SIZE">
  <button data-action="rawCommand">Run</button>
</div>
```

这个输入框让用户直接发 mini-kv 命令。

但后端会用白名单保护：

```ts
validateRawGatewayCommand(request.body.command);
```

所以页面上虽然叫 raw command，但不是完全无限制。

---

# 13. Output 区域

实际代码：

```html
<section class="card" style="margin-top:16px">
  <h2>Output</h2>
  <pre class="output" id="output"></pre>
</section>
```

所有按钮的 API 返回都会写到这个 `<pre>`。

对应 JavaScript：

```js
function write(data) {
  output.textContent = JSON.stringify(data, null, 2);
}
```

`JSON.stringify(data, null, 2)` 表示格式化成缩进 2 个空格的 JSON。

---

# 14. DOM 获取工具

实际代码：

```js
const $ = (id) => document.getElementById(id);
const output = $("output");
```

这里写了一个很小的 helper：

```text
$("kvKey")
 -> document.getElementById("kvKey")
```

让后面的代码更短。

---

# 15. 更新 badge

实际代码：

```js
function setBadge(id, state) {
  const el = $(id);
  el.className = "badge " + state;
  el.textContent = state;
}
```

如果后端返回：

```json
{ "state": "offline" }
```

那么前端会设置：

```html
class="badge offline"
textContent="offline"
```

这会自动套用 CSS 里的红色离线样式。

---

# 16. API helper

实际代码：

```js
async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw data;
  }
  return data;
}
```

这个 helper 统一处理浏览器请求：

```text
加 content-type
读取 text
解析 JSON
非 2xx 时 throw data
```

按钮事件里只需要：

```js
write(await api("/api/v1/order-platform/products"));
```

---

# 17. 渲染状态快照

实际代码：

```js
function renderSnapshot(snapshot) {
  $("sampledAt").textContent = "Sampled " + snapshot.sampledAt;
  setBadge("nodeState", snapshot.node.state);
  $("nodeUptime").textContent = snapshot.node.uptimeSeconds + "s";
  $("nodeMeta").textContent = "pid " + snapshot.node.pid + " on " + snapshot.node.version;

  setBadge("javaState", snapshot.javaOrderPlatform.state);
  $("javaLatency").textContent = snapshot.javaOrderPlatform.latencyMs === undefined ? "-" : snapshot.javaOrderPlatform.latencyMs + "ms";
  $("javaMessage").textContent = snapshot.javaOrderPlatform.message || "";

  setBadge("kvState", snapshot.miniKv.state);
  $("kvLatency").textContent = snapshot.miniKv.latencyMs === undefined ? "-" : snapshot.miniKv.latencyMs + "ms";
  $("kvMessage").textContent = snapshot.miniKv.message || "";
}
```

这个函数正好对应 `OpsSnapshot`：

```text
snapshot.node
 -> nodeState / nodeUptime / nodeMeta

snapshot.javaOrderPlatform
 -> javaState / javaLatency / javaMessage

snapshot.miniKv
 -> kvState / kvLatency / kvMessage
```

这说明前后端的数据结构是对齐的。

---

# 18. 点击事件分发

实际代码：

```js
document.body.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  button.disabled = true;
  try {
```

这里没有给每个按钮单独绑事件。

而是使用事件委托：

```text
监听 document.body
 -> 找最近的 button[data-action]
 -> 根据 data-action 分发
```

这样新增按钮时，只要加：

```html
data-action="xxx"
```

再在 JS 里补一个分支即可。

---

# 19. Order Platform 按钮分支

实际代码：

```js
if (action === "products") {
  write(await api("/api/v1/order-platform/products"));
}
if (action === "outbox") {
  write(await api("/api/v1/order-platform/outbox/events"));
}
if (action === "order") {
  write(await api("/api/v1/order-platform/orders/" + encodeURIComponent($("orderId").value)));
}
if (action === "createOrder") {
  write(await api("/api/v1/order-platform/orders", {
    method: "POST",
    headers: { "idempotency-key": $("idempotencyKey").value },
    body: $("orderBody").value,
  }));
}
```

这里把页面按钮映射到 Node API。

创建订单时特别传了：

```js
headers: { "idempotency-key": $("idempotencyKey").value }
```

这会被 Node 路由转发给 Java 订单平台。

---

# 20. mini-kv 按钮分支

实际代码：

```js
if (action === "kvSet") {
  const body = { value: $("kvValue").value };
  const ttl = Number($("kvTtl").value);
  if (Number.isInteger(ttl) && ttl > 0) {
    body.ttlSeconds = ttl;
  }
  write(await api("/api/v1/mini-kv/" + encodeURIComponent($("kvKey").value), {
    method: "PUT",
    body: JSON.stringify(body),
  }));
}
```

写 mini-kv 时，页面组装 body：

```json
{
  "value": "hello-from-orderops",
  "ttlSeconds": 30
}
```

如果 TTL 输入为空或不是正整数，就不传 `ttlSeconds`。

---

# 21. Raw command 分支

实际代码：

```js
if (action === "rawCommand") {
  write(await api("/api/v1/mini-kv/commands", {
    method: "POST",
    body: JSON.stringify({ command: $("rawCommand").value }),
  }));
}
```

这里把用户输入的命令发到：

```text
POST /api/v1/mini-kv/commands
```

后端会校验：

```text
单行
长度
命令白名单
```

然后才通过 TCP 发给 mini-kv。

---

# 22. 按钮禁用和错误显示

实际代码：

```js
} catch (error) {
  write(error);
} finally {
  button.disabled = false;
}
```

请求期间：

```js
button.disabled = true;
```

请求结束后：

```js
button.disabled = false;
```

如果请求失败，错误 JSON 也会显示在 Output 区域。

这对调试很实用，因为可以直接看到：

```json
{
  "error": "MINIKV_UNAVAILABLE",
  "message": "mini-kv is unavailable: connect ECONNREFUSED 127.0.0.1:6379"
}
```

---

# 23. EventSource 实时状态流

实际代码：

```js
const events = new EventSource("/api/v1/events/ops");
events.addEventListener("snapshot", (event) => renderSnapshot(JSON.parse(event.data)));
events.addEventListener("error", () => flash("Live stream disconnected; polling fallback is active."));
```

浏览器通过 `EventSource` 连接后端 SSE：

```text
GET /api/v1/events/ops
```

后端每隔一段时间推：

```text
event: snapshot
data: {...}
```

前端收到后：

```text
JSON.parse(event.data)
 -> renderSnapshot(...)
```

---

# 24. SSE 断线后的轮询兜底

实际代码：

```js
setInterval(() => {
  if (events.readyState !== EventSource.OPEN) {
    void refreshStatus().catch(write);
  }
}, 5000);
void refreshStatus().catch(write);
```

如果 SSE 不是打开状态，每 5 秒轮询一次：

```text
GET /api/v1/sources/status
```

最后这一行：

```js
void refreshStatus().catch(write);
```

页面加载后立即拉一次状态。

这样即使 SSE 第一条消息慢一点，页面也不会一直停在初始状态。

---

# 总结

第四组文件把 Node 控制台变成了可操作页面：

```text
dashboardRoutes.ts
 -> 返回 HTML

dashboard.ts
 -> 页面结构、样式、按钮请求、SSE 实时刷新
```

一句话总结：Dashboard 是 V1 的可视化入口，它把 Java 订单平台和 mini-kv 的控制能力集中到一个浏览器页面里。
