# 第一次讲解：项目入口、配置和 Fastify 应用组装

第一次重点讲解 5 个文件：

```text
src/server.ts
src/app.ts
src/config.ts
src/errors.ts
src/types.ts
```

它们负责项目最外层的骨架：

```text
config.ts
 -> 读取环境变量

app.ts
 -> 创建 Fastify 应用、注册路由、注入 client

server.ts
 -> 真正监听端口并处理退出信号

errors.ts
 -> 定义统一业务错误

types.ts
 -> 定义状态采样和上游响应的数据结构
```

核心启动流程是：

```text
node src/server.ts
 -> loadConfig()
 -> buildApp(config)
 -> app.listen({ host, port })
 -> 浏览器访问 http://127.0.0.1:4100
```

---

# 1. `server.ts`：项目启动入口

实际代码：

```ts
import { buildApp } from "./app.js";
import { loadConfig } from "./config.js";

const config = loadConfig();
const app = await buildApp(config);
```

这个文件只做两件大事：

```text
第一，加载配置
第二，创建并启动 Fastify 应用
```

这里的设计是把“应用构建”和“应用启动”分开：

```text
buildApp(config)
 -> 只创建 app，方便测试

server.ts
 -> 负责 listen，是真正运行入口
```

这样以后写测试时可以直接调用 `buildApp`，不需要真的占用端口。

---

# 2. `server.ts` 的优雅退出

实际代码：

```ts
const close = async (signal: string) => {
  app.log.info({ signal }, "shutting down");
  await app.close();
};
```

`close` 的作用是：

```text
收到退出信号
 -> 打日志
 -> 关闭 Fastify 应用
```

下面这段是真正注册信号：

```ts
process.on("SIGINT", () => {
  void close("SIGINT").finally(() => process.exit(0));
});

process.on("SIGTERM", () => {
  void close("SIGTERM").finally(() => process.exit(0));
});
```

含义是：

```text
Ctrl+C
 -> SIGINT
 -> close("SIGINT")

系统终止进程
 -> SIGTERM
 -> close("SIGTERM")
```

这和 `mini-kv` 里 TCP server 的生命周期思想类似：服务不是直接粗暴退出，而是先走关闭流程。

---

# 3. `server.ts` 的监听端口

实际代码：

```ts
await app.listen({ host: config.host, port: config.port });
app.log.info(
  {
    url: `http://${config.host}:${config.port}`,
    orderPlatformUrl: config.orderPlatformUrl,
    miniKv: `${config.miniKvHost}:${config.miniKvPort}`,
  },
  "orderops-node started",
);
```

这里的 `host` 和 `port` 都来自配置。

默认情况下：

```text
host = 127.0.0.1
port = 4100
```

启动成功后，日志里会带上三个关键地址：

```text
Node 控制台地址
Java 订单平台地址
mini-kv TCP 地址
```

这对调试很重要，因为这个项目本质上是一个“连接其他服务的控制台”。

---

# 4. `config.ts`：配置结构

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
}
```

这就是项目的配置清单。

可以分成三组：

```text
Node 自己：
  host
  port
  logLevel

Java 订单平台：
  orderPlatformUrl
  orderPlatformTimeoutMs

C++ mini-kv：
  miniKvHost
  miniKvPort
  miniKvTimeoutMs

状态采样：
  opsSampleIntervalMs
```

---

# 5. `config.ts` 的字符串读取

实际代码：

```ts
function readString(env: NodeJS.ProcessEnv, key: string, fallback: string): string {
  const value = env[key]?.trim();
  return value && value.length > 0 ? value : fallback;
}
```

这段逻辑负责读取字符串环境变量。

流程是：

```text
读取 env[key]
 -> trim 去掉空白
 -> 有有效值就用环境变量
 -> 没有就用 fallback
```

比如：

```text
ORDER_PLATFORM_URL 没配置
 -> 使用 http://localhost:8080
```

---

# 6. `config.ts` 的数字读取

实际代码：

```ts
function readNumber(env: NodeJS.ProcessEnv, key: string, fallback: number): number {
  const raw = env[key]?.trim();
  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}
```

这里比直接 `Number(process.env.PORT)` 更稳。

它处理了几种异常情况：

```text
没配置
 -> fallback

配置成 abc
 -> fallback

配置成 -1
 -> fallback

配置成 4100.8
 -> Math.floor 后得到 4100
```

这个项目的端口和超时时间都必须是正数，所以这里统一兜底。

---

# 7. `config.ts` 去掉 URL 末尾斜杠

实际代码：

```ts
function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}
```

为什么要去掉末尾 `/`？

因为 client 后面会这样拼路径：

```ts
fetch(`${this.baseUrl}${path}`, ...)
```

如果 `baseUrl` 是：

```text
http://localhost:8080/
```

而 `path` 是：

```text
/api/v1/products
```

拼出来就会变成：

```text
http://localhost:8080//api/v1/products
```

虽然很多服务能兼容双斜杠，但控制台项目最好保持地址干净。

---

# 8. `loadConfig`：最终配置入口

实际代码：

```ts
export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    host: readString(env, "HOST", "127.0.0.1"),
    port: readNumber(env, "PORT", 4100),
    logLevel: readString(env, "LOG_LEVEL", "info"),
    orderPlatformUrl: stripTrailingSlash(readString(env, "ORDER_PLATFORM_URL", "http://localhost:8080")),
    orderPlatformTimeoutMs: readNumber(env, "ORDER_PLATFORM_TIMEOUT_MS", 1200),
    miniKvHost: readString(env, "MINIKV_HOST", "127.0.0.1"),
    miniKvPort: readNumber(env, "MINIKV_PORT", 6379),
    miniKvTimeoutMs: readNumber(env, "MINIKV_TIMEOUT_MS", 800),
    opsSampleIntervalMs: readNumber(env, "OPS_SAMPLE_INTERVAL_MS", 2000),
  };
}
```

这里有一个测试友好的设计：

```ts
env: NodeJS.ProcessEnv = process.env
```

平时运行时，默认读真实环境变量。

测试时，可以传一个假的对象：

```ts
loadConfig({ PORT: "4200" })
```

这样不用真的污染当前 PowerShell 环境。

---

# 9. `app.ts`：创建 Fastify 应用

实际代码：

```ts
export async function buildApp(config: AppConfig): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: config.logLevel,
    },
  });
```

`buildApp` 是应用工厂函数。

它接收 `AppConfig`，返回一个配置完成的 `FastifyInstance`。

这里没有直接 `listen`，原因是：

```text
app.ts 负责组装
server.ts 负责运行
```

这也是 Node 后端项目里很常见的可测试结构。

---

# 10. `errors.ts`：统一业务错误

实际代码：

```ts
export class AppHttpError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppHttpError";
  }
}
```

`AppHttpError` 比普通 `Error` 多三个字段：

```text
statusCode
 -> HTTP 状态码，比如 400 / 502 / 504

code
 -> 稳定错误码，比如 MINIKV_TIMEOUT

details
 -> 可选的额外信息
```

这个类让 client 层和 route 层可以统一抛错。

比如 mini-kv 超时会抛：

```ts
new AppHttpError(504, "MINIKV_TIMEOUT", `mini-kv timed out after ${this.timeoutMs}ms`)
```

---

# 11. `errors.ts` 的类型守卫

实际代码：

```ts
export function isAppHttpError(error: unknown): error is AppHttpError {
  return error instanceof AppHttpError;
}
```

这个函数是 TypeScript 类型守卫。

在 `app.ts` 里使用时：

```ts
if (isAppHttpError(error)) {
  reply.code(error.statusCode).send({
    error: error.code,
    message: error.message,
    details: error.details,
  });
  return;
}
```

进入 `if` 后，TypeScript 就知道：

```text
error 是 AppHttpError
可以安全访问 statusCode / code / details
```

---

# 12. `app.ts` 的统一错误处理

实际代码：

```ts
app.setErrorHandler((error, _request, reply) => {
  if (isAppHttpError(error)) {
    reply.code(error.statusCode).send({
      error: error.code,
      message: error.message,
      details: error.details,
    });
    return;
  }
```

这段先处理项目自定义错误。

比如：

```text
MINIKV_UNAVAILABLE
ORDER_PLATFORM_TIMEOUT
INVALID_MINIKV_COMMAND
```

都会走这里，返回稳定 JSON：

```json
{
  "error": "MINIKV_TIMEOUT",
  "message": "mini-kv timed out after 800ms"
}
```

然后处理普通错误：

```ts
const errorWithStatus = error as { statusCode?: unknown; message?: unknown };
const statusCode =
  typeof errorWithStatus.statusCode === "number" && errorWithStatus.statusCode >= 400
    ? errorWithStatus.statusCode
    : 500;
reply.code(statusCode).send({
  error: statusCode === 500 ? "INTERNAL_ERROR" : "REQUEST_ERROR",
  message: typeof errorWithStatus.message === "string" ? errorWithStatus.message : "Request failed",
});
```

普通错误可能来自 Fastify schema 校验，也可能来自意外异常。

这里做了两层保护：

```text
有合法 statusCode
 -> 按它返回

没有 statusCode
 -> 统一当 500
```

---

# 13. `app.ts` 的请求头 Hook

实际代码：

```ts
app.addHook("onRequest", async (_request, reply) => {
  reply.header("x-orderops-service", "orderops-node");
  reply.header("access-control-allow-origin", "*");
});
```

这个 hook 每个请求都会走。

它加了两个响应头：

```text
x-orderops-service: orderops-node
access-control-allow-origin: *
```

前者方便识别响应来自这个 Node 控制台。

后者让浏览器跨域调试更方便。

---

# 14. `app.ts` 的 OPTIONS 预检

实际代码：

```ts
app.options("/*", async (_request, reply) => {
  reply
    .header("access-control-allow-origin", "*")
    .header("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS")
    .header("access-control-allow-headers", "content-type,idempotency-key")
    .code(204)
    .send();
});
```

浏览器发送跨域 `POST` 或自定义 header 时，可能先发 `OPTIONS`。

这里明确允许：

```text
方法：
  GET, POST, PUT, DELETE, OPTIONS

请求头：
  content-type
  idempotency-key
```

其中 `idempotency-key` 是 Java 订单平台创建订单需要的 header。

---

# 15. `app.ts` 注入两个上游 client

实际代码：

```ts
const orderPlatform = new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs);
const miniKv = new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs);
const snapshots = new OpsSnapshotService(orderPlatform, miniKv);
```

这里是依赖装配：

```text
OrderPlatformClient
 -> 负责 Java HTTP 请求

MiniKvClient
 -> 负责 C++ TCP 请求

OpsSnapshotService
 -> 同时依赖两个 client，做状态采样
```

这种写法的好处是路由层不需要知道怎么创建 client，只使用已经注入好的对象。

---

# 16. `app.ts` 注册路由

实际代码：

```ts
await registerDashboardRoutes(app);
await registerStatusRoutes(app, { config, snapshots });
await registerOrderPlatformRoutes(app, { orderPlatform });
await registerMiniKvRoutes(app, { miniKv });
```

路由分成四组：

```text
DashboardRoutes
 -> 首页 HTML

StatusRoutes
 -> /health、状态采样、SSE

OrderPlatformRoutes
 -> Java 订单平台代理

MiniKvRoutes
 -> mini-kv 网关
```

这就是 V1 的模块边界。

---

# 17. `types.ts`：状态类型

实际代码：

```ts
export type SourceState = "online" | "offline" | "degraded";
```

上游服务状态不是简单 true / false，而是三态：

```text
online
 -> 正常

offline
 -> 连不上或请求失败

degraded
 -> 能响应，但状态不是完全健康
```

实际采样结果结构：

```ts
export interface ProbeResult {
  name: string;
  state: SourceState;
  sampledAt: string;
  latencyMs?: number;
  message?: string;
  details?: unknown;
}
```

这里既有机器可读字段：

```text
state
latencyMs
details
```

也有人可读字段：

```text
message
```

---

# 18. `types.ts`：OpsSnapshot

实际代码：

```ts
export interface OpsSnapshot {
  sampledAt: string;
  node: {
    state: SourceState;
    uptimeSeconds: number;
    pid: number;
    version: string;
  };
  javaOrderPlatform: ProbeResult;
  miniKv: ProbeResult;
}
```

这就是 Dashboard 和 SSE 推送的核心数据结构。

一次状态快照包含三块：

```text
Node 自己
Java 订单平台
C++ mini-kv
```

页面上三个状态卡片就是根据这个结构渲染的。

---

# 19. `types.ts`：上游 JSON 响应

实际代码：

```ts
export interface UpstreamJsonResponse<T = unknown> {
  statusCode: number;
  latencyMs: number;
  data: T;
}
```

Java HTTP client 不只返回 body，还返回：

```text
statusCode
latencyMs
data
```

这样路由层可以保留上游状态码，也可以把延迟用于状态面板。

---

# 总结

第一组文件把项目的“外壳”搭好了：

```text
config.ts 读配置
app.ts 组装 Fastify 和依赖
server.ts 启动和退出
errors.ts 统一错误
types.ts 定义状态数据结构
```

一句话总结：`orderops-node` 的入口层重点不是业务逻辑，而是把控制台服务以清晰、可测试、可配置的方式启动起来。
