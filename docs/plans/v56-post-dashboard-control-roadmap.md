# Node v56 衍生后三项目受控操作推进计划

来源版本：

```text
Node v56：Dashboard 上游观察详情面板，把 Java 治理信号和 mini-kv 命令风险信号整理成可扫描页面。
```

这份计划接在 `v54-post-infojson-roadmap.md` 后面。上一轮已经完成：

```text
Java v37：GET /api/v1/failed-events/summary
mini-kv v46：COMMANDS / COMMANDSJSON
Node v55：统一失败事件摘要 + mini-kv 命令分级
Node v56：Dashboard 上游观察详情面板
```

下一阶段目标不是直接开启真实写动作，而是进入“受控操作预演”阶段：

```text
Java 提供失败事件 replay 的只读 readiness / dry-run 依据
mini-kv 提供更适合控制面读取的 key inventory JSON
Node 把 intent、approval、dry-run dispatch 和上游 readiness 串成可解释闭环
```

边界仍然不变：

```text
Java = 订单交易核心 / 失败事件治理真相
Node = 运维控制面 / 受控操作入口 / 统一观察台
mini-kv = 自研 Redis-like 基础设施实验位
```

## 运行调试截图规则

继续沿用上一份计划的截图规则，并从本计划开始加强一点：

```text
a/<版本>/图片/
```

每版尽量至少保留一张能证明“本版核心能力确实跑过”的截图：

- Java endpoint 版本：保存浏览器或终端访问 JSON 的截图
- mini-kv TCP / CLI 版本：保存终端运行、client 输出或 JSON 响应截图
- Node Dashboard / HTTP 版本：优先保存 Dashboard 或 `/api/v1/upstreams/overview` 页面截图

如果某版没有截图，必须在 `a/<版本>/解释/说明.md` 写清楚原因。

## 第一批：Java v38 + mini-kv v47 可以一起推进

这两个版本互不依赖，可以一起推进。它们都只是补“被 Node 安全预演”的只读能力，不要求 Node 真实执行上游写动作。

### Java v38：失败事件 replay readiness / dry-run plan

目标：

```text
新增只读 replay readiness / dry-run plan endpoint，让 Node 能在发起真实 replay 前看见风险、前置条件和阻断原因。
```

建议 endpoint：

```text
GET /api/v1/failed-events/{id}/replay-readiness
```

建议字段：

```text
sampledAt
failedEventId
exists
eventType
aggregateType
aggregateId
failedAt
managementStatus
replayApprovalStatus
replayBacklogPosition
eligibleForReplay
requiresApproval
blockedBy[]
warnings[]
nextAllowedActions[]
latestReplayAttempt
latestApproval
```

建议修改：

- 新增 `FailedEventReplayReadinessController` 或在现有 `FailedEventMessageController` 内增加只读 GET
- 新增 response record，例如 `FailedEventReplayReadinessResponse`
- 新增 service 方法，例如 `failedEventMessageService.replayReadiness(id)`
- 复用现有 failed-event、approval、attempt、operator policy 逻辑
- 如果事件不存在，返回稳定的 404 或 `exists=false` 语义，二选一后保持一致

本版不做：

- 不执行 replay
- 不创建 approval
- 不修改 management status
- 不让 Java 依赖 Node 或 mini-kv

验证：

- Java compile/test
- 启动 Java 后访问 `/api/v1/failed-events/{id}/replay-readiness`
- 至少覆盖一个不存在 ID 的响应
- 如有测试数据，覆盖一个已失败事件的 readiness 响应
- 截图保存 endpoint JSON 或终端输出

完成标准：

```text
Java 能只读告诉 Node：某个失败事件现在能不能 replay，为什么能，为什么不能，下一步允许做什么。
```

### mini-kv v47：KEYSJSON key inventory

目标：

```text
新增 KEYSJSON，让 Node 不再解析 KEYS 文本，而是稳定读取 key inventory。
```

建议命令：

```text
KEYSJSON [prefix]
```

建议响应：

```json
{
  "prefix": null,
  "key_count": 2,
  "keys": ["order:1", "order:2"],
  "truncated": false,
  "limit": 1000
}
```

建议规则：

- 不带 prefix 时返回当前 live keys
- 带 prefix 时只返回匹配 key
- 输出前继续清理过期 key
- 默认设置合理上限，例如 1000，避免控制面误拉超大结果
- `COMMANDSJSON` 里补充 `KEYSJSON`，category 为 `read`

本版不做：

- 不做 ACL
- 不做分页游标
- 不做模糊 glob 查询
- 不改变现有 `KEYS` 文本响应
- 不让 mini-kv 进入订单权威存储链路

验证：

- CMake configure/build
- CTest
- CLI smoke：`KEYSJSON`
- TCP smoke：`KEYSJSON user:`
- 截图保存终端或 client 输出

完成标准：

```text
mini-kv 能稳定返回结构化 key inventory，供 Node 做只读展示和安全预演。
```

## 第二批：Node v57 等 Java v38 后推进

Node v57 只依赖 Java v38，不依赖 mini-kv v47。这个版本做 Java 失败事件 replay 的预演接入，但仍不执行真实 replay。

### Node v57：Java failed-event replay readiness 接入

目标：

```text
Node 新增 Java failed-event replay readiness 只读接入，把 Java v38 的 readiness 变成 intent / dispatch 前的可解释预演依据。
```

建议修改：

- `OrderPlatformClient` 新增 `failedEventReplayReadiness(id)`
- 新增 Node route，例如：

```text
GET /api/v1/order-platform/failed-events/:id/replay-readiness
```

- `ActionPlan` 增加 `failed-event-replay-readiness` 或扩展现有 Java failed-event action
- `OperationDispatch` 的 dry-run 结果里记录 readiness 摘要：
  - `eligibleForReplay`
  - `requiresApproval`
  - `blockedBy`
  - `nextAllowedActions`
- Dashboard 增加一个轻量表单或详情输出，输入 failedEventId 后查看 readiness

本版不做：

- 不调用 Java `POST /api/v1/failed-events/{id}/replay`
- 不自动创建 Java approval
- 不把 readiness 结果当作真实执行授权
- 不做批量 replay

验证：

- Node typecheck/test/build
- 安全 smoke：`UPSTREAM_PROBES_ENABLED=false`、`UPSTREAM_ACTIONS_ENABLED=false`
- Java v38 + Node v57 只读联调 smoke
- Dashboard 或 HTTP JSON 截图

完成标准：

```text
Node 能在运维入口展示某个 failed event 的 replay readiness，并把它归入 dry-run evidence。
```

## 第三批：Node v58 等 mini-kv v47 后推进

Node v58 只依赖 mini-kv v47，不依赖 Java v38。这个版本让 Dashboard 对 mini-kv 的观察从“风险计数”推进到“安全 key inventory”。

### Node v58：mini-kv KEYSJSON 接入与 key inventory 面板

目标：

```text
Node 新增 mini-kv KEYSJSON 客户端和 Dashboard key inventory 面板，继续保持只读。
```

建议修改：

- `MiniKvClient` 新增 `keysJson(prefix?)`
- `validateRawGatewayCommand` 允许 `KEYSJSON`
- `/api/v1/upstreams/overview` 增加：
  - key inventory available
  - sampled prefix
  - key count
  - truncated flag
- Dashboard 增加 mini-kv key inventory 小面板：
  - prefix input
  - refresh
  - key count
  - truncated 提示
  - keys list

本版不做：

- 不新增 SET / DEL 操作能力
- 不做 key 编辑器
- 不展示 value 明文
- 不做大规模 key scan

验证：

- Node typecheck/test/build
- 安全 smoke：`UPSTREAM_PROBES_ENABLED=false`
- mini-kv v47 + Node v58 只读联调 smoke
- Dashboard 截图

完成标准：

```text
Node 能结构化读取 mini-kv key inventory，并在 Dashboard 上安全展示 key 列表，不读取 value、不写入 key。
```

## 第四批：Node v59 等 Java v38 + mini-kv v47 后推进

Node v59 建议等 v57 和 v58 都完成后再做。它不新增上游能力，而是把前几版的 evidence 收束成一个“操作前检查包”。

### Node v59：Operation preflight evidence bundle

目标：

```text
在真实执行任何上游动作前，Node 能生成一份统一 preflight evidence bundle，说明当前 intent 为什么允许或为什么必须阻断。
```

建议内容：

```text
intent summary
action plan
role / confirmation / rate-limit status
upstream safety flags
Java replay readiness, when action targets failed event replay
mini-kv command category and key inventory evidence, when action targets mini-kv
recommended next action
hard blockers
warnings
```

建议 route：

```text
GET /api/v1/operation-intents/:intentId/preflight
```

本版不做：

- 不开启真实 replay
- 不开启默认上游写动作
- 不做多项目部署编排
- 不做持久化数据库迁移

验证：

- Node typecheck/test/build
- intent create + confirm + dry-run + preflight smoke
- 安全 smoke 确认 `UPSTREAM_ACTIONS_ENABLED=false` 时不会触碰上游写接口
- Dashboard 或 HTTP JSON 截图

完成标准：

```text
Node 可以给每个危险操作生成统一、可审计、可截图归档的 preflight 证据包。
```

## 推荐执行顺序

```text
1. Java v38 + mini-kv v47 可以一起推进
2. Node v57 等 Java v38 完成后推进
3. Node v58 等 mini-kv v47 完成后推进
4. Node v59 等 Node v57 + Node v58 完成后推进
```

如果只想先做一个：

```text
优先 Java v38
```

原因是下一阶段的“受控操作预演”最核心的风险来自 Java failed-event replay。mini-kv 的 key inventory 也重要，但它更多服务观察和只读安全展示。

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 默认开启真实上游写动作
- 需要 Node 调用 Java replay / approval 的 POST 接口
- 需要 Node 直接批量执行 mini-kv 写命令
- 需要让 mini-kv 承担订单、库存、支付的权威存储
- 需要单个版本同时改 Java、Node、mini-kv 三个项目的核心代码
- 对 failed-event readiness 字段、KEYSJSON 上限或 preflight evidence 语义有疑惑

## 一句话结论

```text
v57-v59 不急着做真实执行，而是把“看见风险、解释风险、归档证据”做扎实。
```
