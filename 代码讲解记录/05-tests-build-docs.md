# 第五次讲解：测试、构建和文档

第五次重点讲解这些文件：

```text
package.json
tsconfig.json
.env.example
README.md
test/config.test.ts
test/miniKvCommandValidation.test.ts
```

这组文件不直接处理业务请求，但决定项目能不能稳定运行、测试和交付。

核心目标是：

```text
能安装
能启动
能类型检查
能测试
能说明项目边界
```

---

# 1. `package.json` 的项目身份

实际代码：

```json
{
  "name": "orderops-node",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "Node.js control plane for the Java order platform and C++ mini-kv service."
}
```

几个字段的含义：

```text
name
 -> 项目名 orderops-node

version
 -> 当前 V1 雏形版本 0.1.0

private
 -> 不准备发布到 npm

type
 -> 使用 ESM 模块
```

因为 `type` 是 `module`，所以源码里导入本地文件时使用：

```ts
import { buildApp } from "./app.js";
```

注意这里是 `.js` 后缀。

这是 TypeScript + NodeNext ESM 的常见写法。

---

# 2. Node 版本要求

实际代码：

```json
"engines": {
  "node": ">=22"
}
```

V1 使用 Node 22，原因是：

```text
内置 fetch
现代 ESM 支持
当前本机环境就是 Node v22.20.0
```

---

# 3. 脚本命令

实际代码：

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "start": "node dist/server.js",
  "build": "tsc -p tsconfig.json",
  "typecheck": "tsc -p tsconfig.json --noEmit",
  "test": "vitest run"
}
```

脚本分工是：

```text
npm run dev
 -> 开发模式，用 tsx 直接跑 TypeScript

npm run build
 -> 编译到 dist/

npm start
 -> 运行编译后的 dist/server.js

npm run typecheck
 -> 只检查类型，不生成 dist

npm test
 -> 运行 Vitest 测试
```

V1 开发时最常用：

```powershell
npm run dev
```

交付前至少跑：

```powershell
npm run typecheck
npm test
```

---

# 4. 依赖说明

实际代码：

```json
"dependencies": {
  "fastify": "^5.8.5"
},
"devDependencies": {
  "@types/node": "^25.6.2",
  "tsx": "^4.21.0",
  "typescript": "^6.0.3",
  "vitest": "^4.1.5"
}
```

生产依赖只有一个：

```text
fastify
```

开发依赖是：

```text
typescript
 -> 类型检查和编译

tsx
 -> 开发时直接运行 .ts

vitest
 -> 单元测试

@types/node
 -> Node API 类型
```

V1 没有引入数据库、ORM、前端框架，是为了保持控制台雏形清晰。

---

# 5. `tsconfig.json` 的模块配置

实际代码：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  }
}
```

几个关键点：

```text
target ES2022
 -> 输出现代 JavaScript

module NodeNext
 -> 按 Node ESM 规则编译

moduleResolution NodeNext
 -> 按 Node ESM 规则解析模块

rootDir src
 -> 源码目录

outDir dist
 -> 编译输出目录

strict true
 -> 开启严格类型检查
```

因为使用 `NodeNext`，源码里本地导入需要写：

```ts
import { loadConfig } from "./config.js";
```

虽然源文件是 `config.ts`，但运行后的文件会是 `config.js`。

---

# 6. `tsconfig.json` 的 lib 和 types

实际代码：

```json
"lib": ["ES2022", "DOM"],
"types": ["node"]
```

`ES2022` 提供现代 JS 类型。

`DOM` 这里主要是为了让 TypeScript 认识：

```text
fetch
AbortController
```

`types: ["node"]` 让 TypeScript 认识：

```text
process
NodeJS.ProcessEnv
node:net
node:perf_hooks
```

---

# 7. `.env.example`

实际代码：

```text
HOST=127.0.0.1
PORT=4100
LOG_LEVEL=info

ORDER_PLATFORM_URL=http://localhost:8080
ORDER_PLATFORM_TIMEOUT_MS=1200

MINIKV_HOST=127.0.0.1
MINIKV_PORT=6379
MINIKV_TIMEOUT_MS=800

OPS_SAMPLE_INTERVAL_MS=2000
```

这是环境变量样例。

它不会自动加载。

README 里也说明了：

```powershell
$env:ORDER_PLATFORM_URL = "http://localhost:8080"
$env:MINIKV_PORT = "6379"
npm run dev
```

这符合当前 V1 的轻量思路：

```text
不用 dotenv
直接读 process.env
```

以后如果需要，可以再加 dotenv 或配置管理。

---

# 8. README 的项目边界

README 里实际写了：

```md
Node.js control plane for two local practice systems:

- Java order platform: `D:\javaproj\advanced-order-platform`
- C++ mini-kv: `D:\C\mini-kv`
```

这句话很重要。

它说明 `orderops-node` 不是孤立练习，而是连接已有两个项目。

README 还写了：

```md
This V1 is intentionally small. Node owns the gateway, live operations view, and integration shell. The Java service keeps order consistency logic, and mini-kv keeps storage/network internals.
```

这明确了三个项目的分工：

```text
Java
 -> 订单一致性

C++
 -> KV 存储和 TCP 协议

Node
 -> 网关、控制台、实时状态
```

---

# 9. README 的 API 列表

实际代码：

```text
GET    /health
GET    /api/v1/sources/status
GET    /api/v1/events/ops

GET    /api/v1/order-platform/products
GET    /api/v1/order-platform/outbox/events
GET    /api/v1/order-platform/orders/:orderId
POST   /api/v1/order-platform/orders
POST   /api/v1/order-platform/orders/:orderId/pay
POST   /api/v1/order-platform/orders/:orderId/cancel

GET    /api/v1/mini-kv/status
GET    /api/v1/mini-kv/:key
PUT    /api/v1/mini-kv/:key
DELETE /api/v1/mini-kv/:key
POST   /api/v1/mini-kv/commands
```

这个 API 列表和 `src/routes` 里的路由是对应的。

以后新增功能时，应该同步更新 README。

---

# 10. `config.test.ts`：默认配置测试

实际代码：

```ts
import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  it("uses stable local defaults", () => {
    const config = loadConfig({});

    expect(config.port).toBe(4100);
    expect(config.host).toBe("127.0.0.1");
    expect(config.orderPlatformUrl).toBe("http://localhost:8080");
    expect(config.miniKvPort).toBe(6379);
  });
```

这个测试验证默认值。

也就是说，如果没有环境变量，项目应该默认连接：

```text
Node: 127.0.0.1:4100
Java: http://localhost:8080
mini-kv: 127.0.0.1:6379
```

这和 `.env.example` 及 README 保持一致。

---

# 11. `config.test.ts`：环境变量覆盖测试

实际代码：

```ts
it("normalizes numeric values and strips the order URL slash", () => {
  const config = loadConfig({
    PORT: "4200",
    ORDER_PLATFORM_URL: "http://localhost:8080/",
    MINIKV_PORT: "6380",
    OPS_SAMPLE_INTERVAL_MS: "1500",
  });

  expect(config.port).toBe(4200);
  expect(config.orderPlatformUrl).toBe("http://localhost:8080");
  expect(config.miniKvPort).toBe(6380);
  expect(config.opsSampleIntervalMs).toBe(1500);
});
```

这个测试证明两件事。

第一，字符串数字会被转成 number：

```text
"4200" -> 4200
```

第二，Java URL 末尾斜杠会被删除：

```text
http://localhost:8080/
 -> http://localhost:8080
```

这对应 `config.ts` 里的：

```ts
stripTrailingSlash(...)
```

---

# 12. `miniKvCommandValidation.test.ts`：允许安全命令

实际代码：

```ts
describe("validateRawGatewayCommand", () => {
  it("allows safe mini-kv gateway commands", () => {
    expect(() => validateRawGatewayCommand("PING orderops")).not.toThrow();
    expect(() => validateRawGatewayCommand("SET orderops:demo value")).not.toThrow();
    expect(() => validateRawGatewayCommand("EXPIRE orderops:demo 30")).not.toThrow();
  });
```

这个测试对应白名单：

```ts
const allowed = new Set(["PING", "SIZE", "GET", "TTL", "SET", "DEL", "EXPIRE"]);
```

测试目标是：

```text
常用控制台命令不能被误杀
```

---

# 13. `miniKvCommandValidation.test.ts`：拒绝危险命令和多行输入

实际代码：

```ts
it("rejects filesystem-style commands and multiline input", () => {
  expect(() => validateRawGatewayCommand("SAVE data/snapshot")).toThrow(/not allowed/);
  expect(() => validateRawGatewayCommand("PING ok\nSIZE")).toThrow(/single non-empty line/);
});
```

这里验证两个边界。

第一，`SAVE` 被拒绝：

```text
SAVE data/snapshot
 -> not allowed
```

因为它涉及服务端文件路径。

第二，多行命令被拒绝：

```text
PING ok
SIZE
 -> single non-empty line
```

因为 inline 协议一行一条命令，网关不允许一次请求塞多条命令。

---

# 14. 当前验证结果

当前 V1 已验证：

```text
npm run typecheck
 -> 通过

npm test
 -> 2 个测试文件，4 个用例通过

npm run build
 -> 通过

GET /health
 -> 返回 ok

GET /
 -> 返回 Dashboard HTML
```

这说明：

```text
类型没破
基础测试没破
Fastify 应用能注册路由
页面能返回
```

---

# 15. 后续 V2 可以补哪些测试

V1 的测试还比较基础。

后续可以补：

```text
Fastify inject 测试
 -> 验证 /health、schema 校验、错误响应格式

OrderPlatformClient mock fetch 测试
 -> 验证 timeout、非 2xx、JSON 解析

MiniKvClient fake TCP server 测试
 -> 验证 PING、超时、连接关闭、响应解析

OpsSnapshotService mock client 测试
 -> 验证 online / degraded / offline 状态转换
```

这些测试可以继续保持项目边界清晰：

```text
不启动真实 Java
不启动真实 mini-kv
用 mock / fake server 验证 Node 逻辑
```

---

# 总结

第五组文件让项目从“能写代码”变成“能交付雏形”：

```text
package.json
 -> 管理依赖和脚本

tsconfig.json
 -> 保证 TypeScript 严格编译

.env.example
 -> 记录配置入口

README.md
 -> 说明项目定位和使用方式

test/
 -> 保护配置和 mini-kv 命令安全边界
```

一句话总结：测试、构建和文档不是附属品，它们让 `orderops-node` 这个 Node 控制面项目可以被稳定运行、理解和继续扩展。
