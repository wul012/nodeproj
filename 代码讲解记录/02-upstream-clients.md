# 第二次讲解：两个上游客户端

第二次重点讲解 2 个文件：

```text
src/clients/orderPlatformClient.ts
src/clients/miniKvClient.ts
```

它们是 Node 控制台连接外部系统的关键层。

整体关系是：

```text
OrderPlatformClient
 -> 使用 fetch 调 Java Spring Boot HTTP API

MiniKvClient
 -> 使用 node:net 创建 TCP 连接，给 C++ mini-kv 发 inline 命令
```

核心流程是：

```text
Fastify route
 -> 调 client 方法
 -> client 访问上游服务
 -> 统一包装响应或抛 AppHttpError
```

---

# 1. `OrderPlatformClient` 的角色

实际代码：

```ts
export class OrderPlatformClient {
  constructor(
    private readonly baseUrl: string,
    private readonly timeoutMs: number,
  ) {}
```

这个类持有两个配置：

```text
baseUrl
 -> Java 订单平台地址，比如 http://localhost:8080

timeoutMs
 -> HTTP 请求超时时间，比如 1200ms
```

它不保存订单数据，也不做订单业务判断。

它只负责：

```text
把 Node 控制台请求转成 Java 平台 HTTP 请求
```

---

# 2. Java 平台健康检查

实际代码：

```ts
health(): Promise<UpstreamJsonResponse> {
  return this.request("/actuator/health");
}
```

这个方法访问的是 Spring Boot Actuator：

```text
GET /actuator/health
```

返回结果会被 `OpsSnapshotService` 用来判断 Java 服务是否在线。

如果返回：

```json
{ "status": "UP" }
```

那么状态会显示为：

```text
online
```

---

# 3. Java 平台业务 API 方法

实际代码：

```ts
listProducts(): Promise<UpstreamJsonResponse> {
  return this.request("/api/v1/products");
}

listOutboxEvents(): Promise<UpstreamJsonResponse> {
  return this.request("/api/v1/outbox/events");
}

getOrder(orderId: string): Promise<UpstreamJsonResponse> {
  return this.request(`/api/v1/orders/${encodeURIComponent(orderId)}`);
}
```

这三个方法分别对应 Java 项目已有接口：

```text
GET /api/v1/products
GET /api/v1/outbox/events
GET /api/v1/orders/:orderId
```

注意这里用了：

```ts
encodeURIComponent(orderId)
```

原因是 `orderId` 来自 URL 参数，理论上可能包含特殊字符。

即使正常订单 ID 是数字，也应该在拼 URL 前做编码。

---

# 4. 创建订单时传递幂等 Key

实际代码：

```ts
createOrder(idempotencyKey: string, body: unknown): Promise<UpstreamJsonResponse> {
  return this.request("/api/v1/orders", {
    method: "POST",
    headers: {
      "Idempotency-Key": idempotencyKey,
    },
    body,
  });
}
```

Java 订单平台创建订单需要：

```text
Idempotency-Key header
```

Node 控制台不能吞掉这个 header。

所以这里显式转发：

```ts
headers: {
  "Idempotency-Key": idempotencyKey,
}
```

这保持了 Java 项目的核心训练点：

```text
幂等下单仍由 Java 订单平台负责
Node 只做网关转发
```

---

# 5. 支付和取消订单

实际代码：

```ts
payOrder(orderId: string): Promise<UpstreamJsonResponse> {
  return this.request(`/api/v1/orders/${encodeURIComponent(orderId)}/pay`, {
    method: "POST",
  });
}

cancelOrder(orderId: string): Promise<UpstreamJsonResponse> {
  return this.request(`/api/v1/orders/${encodeURIComponent(orderId)}/cancel`, {
    method: "POST",
  });
}
```

这两个方法只负责调用 Java：

```text
POST /api/v1/orders/:orderId/pay
POST /api/v1/orders/:orderId/cancel
```

订单状态机、库存释放、Outbox 事件仍然在 Java 里完成。

这就是 Node 项目避免和 Java 项目冲突的关键：

```text
Node 不复制业务核心
Node 只提供控制入口
```

---

# 6. `request`：Java HTTP 请求核心

实际代码：

```ts
private async request<T = unknown>(path: string, options: JsonRequestOptions = {}): Promise<UpstreamJsonResponse<T>> {
  const started = performance.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
```

这里做了三件事：

```text
started
 -> 记录请求开始时间，用于计算 latencyMs

AbortController
 -> 控制 fetch 超时

setTimeout
 -> 超过 timeoutMs 后 abort
```

Node 的原生 `fetch` 不会自动按业务超时退出，所以这里手动加 `AbortController`。

---

# 7. `fetch` 请求构造

实际代码：

```ts
const response = await fetch(`${this.baseUrl}${path}`, {
  method: options.method ?? "GET",
  headers: {
    accept: "application/json",
    ...(options.body === undefined ? {} : { "content-type": "application/json" }),
    ...options.headers,
  },
  body: options.body === undefined ? undefined : JSON.stringify(options.body),
  signal: controller.signal,
});
```

这里的请求规则是：

```text
method 没传
 -> 默认 GET

body 有值
 -> 自动加 content-type: application/json
 -> JSON.stringify(body)

body 没值
 -> 不发送 body
```

`signal: controller.signal` 是超时控制的关键。

当定时器调用：

```ts
controller.abort()
```

这个 fetch 会抛 `AbortError`。

---

# 8. 解析 Java 响应

实际代码：

```ts
const text = await response.text();
const data = parseBody(text) as T;
const latencyMs = Math.round(performance.now() - started);
```

这里先读文本，再自己解析 JSON。

为什么不直接：

```ts
await response.json()
```

因为有些响应可能是空 body 或非 JSON。

`parseBody` 的实际代码：

```ts
function parseBody(text: string): unknown {
  if (text.trim().length === 0) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
```

这让响应体有三种结果：

```text
空响应
 -> null

JSON 响应
 -> object / array

非 JSON 文本
 -> string
```

---

# 9. Java 返回非 2xx 时抛错

实际代码：

```ts
if (!response.ok) {
  throw new AppHttpError(response.status, "ORDER_PLATFORM_HTTP_ERROR", "Order platform returned an error", {
    upstreamStatusCode: response.status,
    body: data,
  });
}
```

如果 Java 平台返回 400 / 404 / 409 / 500，Node 不假装成功。

它会抛出 `AppHttpError`，并把上游响应体放到 `details.body`。

这样浏览器看到的是统一错误结构，但仍能知道 Java 原因。

---

# 10. Java 请求成功时的返回结构

实际代码：

```ts
return {
  statusCode: response.status,
  latencyMs,
  data,
};
```

这个结构对应 `types.ts`：

```ts
export interface UpstreamJsonResponse<T = unknown> {
  statusCode: number;
  latencyMs: number;
  data: T;
}
```

路由层可以使用：

```text
response.statusCode
 -> 保留 Java 的 HTTP 状态码

response.data
 -> 返回给浏览器

response.latencyMs
 -> 状态采样时显示延迟
```

---

# 11. Java 超时和不可用处理

实际代码：

```ts
if (error instanceof Error && error.name === "AbortError") {
  throw new AppHttpError(504, "ORDER_PLATFORM_TIMEOUT", `Order platform timed out after ${this.timeoutMs}ms`);
}

throw new AppHttpError(502, "ORDER_PLATFORM_UNAVAILABLE", `Order platform is unavailable: ${message}`);
```

这里区分两类故障：

```text
超时
 -> 504 ORDER_PLATFORM_TIMEOUT

连接失败 / DNS 失败 / 其他 fetch 错误
 -> 502 ORDER_PLATFORM_UNAVAILABLE
```

这比统一返回 500 更利于排查。

---

# 12. `finally` 清理定时器

实际代码：

```ts
} finally {
  clearTimeout(timeout);
}
```

无论请求成功、失败、超时，都要清掉定时器。

否则定时器可能继续留在事件循环里。

---

# 13. `MiniKvClient` 的角色

实际代码：

```ts
export class MiniKvClient {
  constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly timeoutMs: number,
  ) {}
```

这个类封装的是 TCP 访问，不是 HTTP。

它连接的是 C++ 项目的 `minikv_server.exe`：

```text
127.0.0.1:6379
```

协议使用 mini-kv 已经支持的 inline 文本协议：

```text
PING orderops\n
SIZE\n
GET key\n
SET key value\n
```

---

# 14. mini-kv 的简单命令方法

实际代码：

```ts
ping(message = "orderops"): Promise<MiniKvCommandResult> {
  return this.execute(`PING ${message}`);
}

size(): Promise<MiniKvCommandResult> {
  return this.execute("SIZE");
}
```

这两个方法用于状态探活。

`ping()` 默认发：

```text
PING orderops
```

mini-kv 的行为是：

```text
PING message
 -> 返回 message
```

所以正常情况下会返回：

```text
orderops
```

---

# 15. `getKey`：读取 value 和 TTL

实际代码：

```ts
async getKey(key: string): Promise<MiniKvKeyResult> {
  validateKey(key);
  const value = await this.execute(`GET ${key}`);
  const ttl = await this.execute(`TTL ${key}`);

  return {
    key,
    value: value.response === "(nil)" ? null : value.response,
    ttlSeconds: Number.isFinite(Number(ttl.response)) ? Number(ttl.response) : null,
  };
}
```

这个方法会连续发两个命令：

```text
GET key
TTL key
```

返回时做了两次转换：

```text
GET 返回 (nil)
 -> value = null

TTL 返回数字文本
 -> ttlSeconds = number
```

这让 HTTP API 返回更像 JSON，而不是直接暴露 mini-kv 文本协议细节。

---

# 16. `setKey`：写入并可选设置 TTL

实际代码：

```ts
async setKey(key: string, value: string, ttlSeconds?: number): Promise<{ set: MiniKvCommandResult; expire?: MiniKvCommandResult }> {
  validateKey(key);
  validateValue(value);

  const set = await this.execute(`SET ${key} ${value}`);
  if (ttlSeconds === undefined) {
    return { set };
  }

  validateTtl(ttlSeconds);
  const expire = await this.execute(`EXPIRE ${key} ${ttlSeconds}`);
  return { set, expire };
}
```

这个方法对应两条 mini-kv 命令：

```text
SET key value
EXPIRE key seconds
```

如果用户没传 TTL，只执行 `SET`。

如果用户传了 TTL，先 `SET`，再 `EXPIRE`。

这里有一个重要边界：

```text
Node 不直接访问 mini-kv 内部 Store
Node 只通过公开 TCP 命令操作 mini-kv
```

这保持了 C++ 项目的独立性。

---

# 17. `execute`：mini-kv TCP 调用核心

实际代码：

```ts
execute(command: string): Promise<MiniKvCommandResult> {
  validateCommandLine(command);
  const started = performance.now();
  const trimmed = command.trim();

  return new Promise((resolve, reject) => {
    let settled = false;
    let buffer = "";
    const socket = net.createConnection({ host: this.host, port: this.port });
```

这段是 `MiniKvClient` 的核心。

流程是：

```text
校验命令
 -> 记录开始时间
 -> 创建 TCP socket
 -> 等响应
 -> resolve 或 reject
```

`settled` 用于防止多次 resolve / reject。

因为 socket 可能连续触发：

```text
error
close
timeout
data
```

没有 `settled`，同一个 Promise 可能被重复处理。

---

# 18. mini-kv 连接成功后发送命令

实际代码：

```ts
socket.on("connect", () => {
  socket.write(`${trimmed}\n`);
});
```

mini-kv inline 协议是一行一命令。

所以这里发送：

```text
命令内容 + \n
```

比如：

```text
SIZE\n
GET orderops:demo\n
```

---

# 19. mini-kv 读取响应

实际代码：

```ts
socket.on("data", (chunk: string) => {
  buffer += chunk;
  const newline = buffer.indexOf("\n");
  if (newline >= 0) {
    finishResolve(buffer.slice(0, newline).replace(/\r$/, ""));
  }
});
```

mini-kv inline 响应也是一行文本。

所以读取逻辑是：

```text
收到 chunk
 -> 追加到 buffer
 -> 找第一个 \n
 -> 截出第一行作为响应
```

这里还做了：

```ts
.replace(/\r$/, "")
```

这样即使收到 `\r\n`，最终也会去掉行尾 `\r`。

---

# 20. mini-kv 成功返回

实际代码：

```ts
const finishResolve = (response: string) => {
  if (settled) {
    return;
  }
  settled = true;
  socket.end();
  resolve({
    command: trimmed,
    response,
    latencyMs: Math.round(performance.now() - started),
  });
};
```

成功后返回三个字段：

```text
command
 -> 实际执行的命令

response
 -> mini-kv 返回的一行文本

latencyMs
 -> 本次 TCP 往返耗时
```

成功后调用：

```ts
socket.end()
```

表示这次短连接请求结束。

---

# 21. mini-kv 错误和超时处理

实际代码：

```ts
socket.setTimeout(this.timeoutMs);

socket.on("timeout", () => {
  finishReject(new AppHttpError(504, "MINIKV_TIMEOUT", `mini-kv timed out after ${this.timeoutMs}ms`));
});

socket.on("error", (error) => {
  finishReject(new AppHttpError(502, "MINIKV_UNAVAILABLE", `mini-kv is unavailable: ${error.message}`));
});
```

这里和 Java HTTP client 一样区分：

```text
超时
 -> 504 MINIKV_TIMEOUT

连接失败
 -> 502 MINIKV_UNAVAILABLE
```

这对 Dashboard 很有用。

页面可以显示：

```text
mini-kv is unavailable: connect ECONNREFUSED 127.0.0.1:6379
```

---

# 22. mini-kv 连接提前关闭

实际代码：

```ts
socket.on("close", () => {
  if (!settled) {
    finishReject(new AppHttpError(502, "MINIKV_CONNECTION_CLOSED", "mini-kv closed the connection before replying"));
  }
});
```

如果还没收到完整响应，连接就关闭了，就认为上游失败。

这种错误和 `ECONNREFUSED` 不一样。

它表示：

```text
连接建立过
但服务端没正常回一行响应
```

---

# 23. mini-kv 网关命令白名单

实际代码：

```ts
export function validateRawGatewayCommand(command: string): void {
  validateCommandLine(command);
  const verb = command.trim().split(/\s+/, 1)[0]?.toUpperCase();
  const allowed = new Set(["PING", "SIZE", "GET", "TTL", "SET", "DEL", "EXPIRE"]);
  if (!allowed.has(verb)) {
    throw new AppHttpError(400, "MINIKV_COMMAND_NOT_ALLOWED", "Command is not allowed through the gateway");
  }
}
```

Dashboard 有一个 raw command 输入框。

但不能把 mini-kv 所有命令都暴露给浏览器。

比如 `SAVE` / `LOAD` 会访问服务器文件路径，V1 不让浏览器随便触发。

所以白名单只开放：

```text
PING
SIZE
GET
TTL
SET
DEL
EXPIRE
```

这是控制台项目必须注意的安全边界。

---

# 24. key 校验

实际代码：

```ts
const safeKeyPattern = /^[A-Za-z0-9:_-]{1,160}$/;

function validateKey(key: string): void {
  if (!safeKeyPattern.test(key)) {
    throw new AppHttpError(400, "INVALID_MINIKV_KEY", "Key must use 1-160 letters, digits, colon, underscore, or dash characters");
  }
}
```

这个正则限制 key 只能包含：

```text
大小写字母
数字
:
_
-
```

并且长度是：

```text
1 到 160
```

这样可以避免把换行、空格、路径符号等复杂内容拼进 inline 命令。

---

# 25. value 和 TTL 校验

实际代码：

```ts
function validateValue(value: string): void {
  if (value.length === 0 || value.length > 16 * 1024 || /[\r\n]/.test(value)) {
    throw new AppHttpError(400, "INVALID_MINIKV_VALUE", "Value must be 1-16384 characters and must not contain newlines");
  }
}
```

value 允许普通字符串，但不允许换行。

原因是 mini-kv inline 协议用换行分隔命令。

如果 value 里有换行，就可能变成多条命令。

TTL 校验：

```ts
function validateTtl(ttlSeconds: number): void {
  if (!Number.isInteger(ttlSeconds) || ttlSeconds <= 0 || ttlSeconds > 604800) {
    throw new AppHttpError(400, "INVALID_MINIKV_TTL", "TTL must be an integer between 1 and 604800 seconds");
  }
}
```

TTL 必须是：

```text
整数
大于 0
不超过 604800 秒，也就是 7 天
```

---

# 26. 命令行校验

实际代码：

```ts
function validateCommandLine(command: string): void {
  const trimmed = command.trim();
  if (trimmed.length === 0 || trimmed.length > 16 * 1024 || /[\r\n]/.test(command)) {
    throw new AppHttpError(400, "INVALID_MINIKV_COMMAND", "Command must be a single non-empty line up to 16384 characters");
  }
}
```

这里保护的是 raw command。

规则是：

```text
不能为空
不能超过 16KB
不能包含 \r 或 \n
```

也就是：控制台一次只能发一条 inline 命令。

---

# 总结

第二组文件完成了 Node 控制台最关键的上游访问能力：

```text
OrderPlatformClient
 -> HTTP + JSON + 超时 + 上游错误包装

MiniKvClient
 -> TCP + inline 文本协议 + 超时 + 命令安全校验
```

一句话总结：client 层让 Node 项目成为控制面，而不是侵入 Java 订单系统或 C++ mini-kv 的内部实现。
