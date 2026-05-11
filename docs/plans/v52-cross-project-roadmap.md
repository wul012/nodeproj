# 三项目综合开发路线图

本文档由 Node v52 `upstream overview` 版本衍生而来。v52 首次完成 Java order platform、mini-kv、OrderOps Node 的真实只读联调，并验证了“Node 做统一观察台，Java 做交易核心，mini-kv 做基础设施实验位”的融合方向，因此后续跨项目版本计划以 v52 的联调结果作为起点。

## 总体定位

三个项目最合适的融合方式是松耦合、可开关、可观测、可替换：

```text
Java = 订单交易核心系统
Node = 运维控制面 / 统一观察台 / 受控操作入口
mini-kv = 自研 Redis-like 基础设施实验位
```

不要把三个项目硬绑成一个大系统。Java 保持订单、库存、支付、Outbox、失败事件治理的业务真相；mini-kv 保持存储、协议、WAL、TTL、metrics 的基础设施实验定位；Node 负责统一观察、受控操作、审计、交接和发布证据链。

## 当前阶段

Node v52 已完成统一只读观察台第一步：

```text
/api/v1/upstreams/overview
 -> Java /actuator/health
 -> mini-kv PING / HEALTH / STATSJSON
 -> 汇总为统一 upstream overview
```

当前最重要的原则：

- 默认不触碰上游：`UPSTREAM_PROBES_ENABLED=false`
- 默认不允许真实写动作：`UPSTREAM_ACTIONS_ENABLED=false`
- 真实联调时可以临时启动 Java、mini-kv、Node，但结束后必须停止进程并清理构建产物
- Java 和 mini-kv 的增强应优先提升自身可观测性和接入契约，而不是为了 Node 硬改业务核心

## Java 后续版本建议

### Java v36：订单平台只读运行概览

目标：给 Node 提供稳定的 Java 业务健康入口。

建议新增：

```text
GET /api/v1/ops/overview
```

建议返回：

- application name
- active profiles
- uptime 或启动时间
- order count
- inventory item count
- outbox pending count
- failed event count
- replay approval pending count
- last failed event time

边界：

- 只读
- 不触发重放
- 不修改订单、库存、Outbox 或失败事件状态

Node 对应版本：

```text
Node v53/v54 接入 Java ops overview
```

### Java v37：失败事件治理摘要

目标：让 Node 不拉全量失败事件列表，也能判断失败事件风险。

建议新增：

```text
GET /api/v1/failed-events/summary
```

建议返回：

- by status
- by managementStatus
- by replayApprovalStatus
- pending approval count
- replayable count
- recently failed count
- latest failure timestamp
- latest replay request timestamp

边界：

- 只读聚合
- 不导出 CSV
- 不执行 replay

Node 对应版本：

```text
Node v56 聚合 Java failed-event summary
```

### Java v38：操作员上下文契约整理

目标：为 Node 未来的受控操作入口提供明确 operator 契约。

建议整理：

- 保留当前 `X-Operator-*` header 方案
- 抽象 `OperatorContextResolver`
- 统一 operator id、role、source、request id
- 明确哪些接口需要 operator 上下文
- 为未来登录态/RBAC 接入预留替换点

边界：

- 不强行接入真实登录系统
- 不把 Node 的角色模型复制进 Java
- Java 保持自己的最终权限判断

Node 对应版本：

```text
Node v57 开始包装 Java 失败事件审批/重放的受控操作
```

### Java v39：幂等/缓存抽象预留

目标：为未来 mini-kv 替身实验铺路。

建议新增接口：

```text
IdempotencyStore
CacheClient
RateLimitStore
```

默认实现：

- 数据库
- 内存
- 或当前已有实现

边界：

- 不直接依赖 mini-kv
- 不让 mini-kv 承担订单主数据
- 不改变订单强一致链路

Node / mini-kv 对应方向：

```text
mini-kv 后续作为可选 Redis-like 实验实现
Node 负责观察和开关，不直接决定 Java 使用哪个存储实现
```

## mini-kv 后续版本建议

### mini-kv v44：INFO 命令

目标：让 Node 识别 mini-kv 基础元信息。

建议新增：

```text
INFO
```

建议输出 text 格式：

```text
version=0.44.0 protocol=inline,resp uptime_seconds=12 live_keys=0 wal_enabled=no metrics_enabled=no
```

建议字段：

- version
- protocol
- uptime_seconds
- live_keys
- wal_enabled
- metrics_enabled
- max_request_bytes

Node 对应版本：

```text
Node v55 接入 mini-kv INFO/INFOJSON
```

### mini-kv v45：INFOJSON 命令

目标：给 Node 和脚本提供稳定结构化元信息。

建议新增：

```text
INFOJSON
```

建议返回：

```json
{
  "version": "0.45.0",
  "server": {
    "protocol": ["inline", "resp"],
    "uptime_seconds": 12
  },
  "store": {
    "live_keys": 0
  },
  "wal": {
    "enabled": false
  },
  "commands": {
    "total_commands": 0
  },
  "connection_stats": {
    "active_connections": 0
  }
}
```

边界：

- 不替代 `STATSJSON`
- `INFOJSON` 偏元信息和能力描述
- `STATSJSON` 偏运行指标和计数器

### mini-kv v46：只读命令分级

目标：让 Node 自动判断哪些命令可以安全放开。

建议新增：

```text
COMMANDS
COMMANDSJSON
```

建议分类：

```text
read: PING, GET, TTL, SIZE, KEYS, HEALTH, STATS, STATSJSON, INFO, INFOJSON
write: SET, DEL, EXPIRE
maintenance: SAVE, LOAD, COMPACT, WALINFO, RESETSTATS
dangerous: 后续如果出现破坏性命令，统一放这里
```

边界：

- 分类先做文档化/命令输出
- 不急着做服务端权限系统
- Node 根据分类决定 Dashboard 是否显示或禁用命令

### mini-kv v47：运行时 build/version 注入

目标：让 release evidence 能记录 mini-kv 真实版本。

建议：

- CMake 把 `project(mini_kv VERSION x.y.z)` 注入编译宏
- `HEALTH` 返回版本
- `INFO` 返回版本
- `INFOJSON` 返回版本

Node 对应方向：

```text
Node promotion evidence 记录 mini-kv version / protocol / wal mode
```

### mini-kv v48：只读 smoke 友好化

目标：让综合联调不依赖数据状态。

建议增强：

- 空库时 `HEALTH` 稳定返回 `OK`
- 无 WAL 时 `INFOJSON.wal.enabled=false`
- 未启用 metrics 文件时 metrics 字段明确为 disabled，而不是缺失
- `KEYS prefix` 空结果稳定返回 `key_count=0 prefix=xxx keys=`

边界：

- 不引入复杂配置
- 不改变已有命令语义
- 优先保证 Node 联调和 CI smoke 稳定

## Node 后续版本建议

### Node v53：Java ops overview 草案适配

目标：先在 Node 侧定义 Java ops overview 的客户端和 disabled/fallback 行为。

范围：

- 新增 `OrderPlatformClient.opsOverview()`
- 新增 overview 中的 Java business signals 占位
- Java 未实现时返回 unavailable 或 disabled，不阻断 Node
- 不修改 Java 项目

### Node v54：接入 Java v36 真实 overview

目标：Java v36 完成后，Node 接入真实 `/api/v1/ops/overview`。

范围：

- 读取 order count、outbox pending、failed event count
- Dashboard 展示 Java 业务摘要
- readiness 增加 Java 业务风险信号

### Node v55：接入 mini-kv INFOJSON

目标：mini-kv v45 完成后，Node 接入结构化元信息。

范围：

- `MiniKvClient.infoJson()`
- upstream overview 显示 mini-kv version、protocol、uptime、wal mode
- promotion archive 记录 mini-kv 版本和能力摘要

### Node v56：统一风险摘要

目标：把 Java failed-event summary 和 mini-kv health/info 聚合到一个风险面板。

范围：

- Java failed-event summary
- mini-kv INFOJSON + STATSJSON
- Node readiness / promotion review 引入 upstream risk summary

### Node v57：Java 失败事件受控操作入口

目标：中期开始从只读观察进入受控操作。

范围：

- Java replay approval request
- Java replay review
- Java replay execute
- 全部走 Node operation intent
- 默认 dry-run
- 真实执行必须显式确认、限流、审计

边界：

- 不直接绕过 Java 权限判断
- 不默认开启 `UPSTREAM_ACTIONS_ENABLED`
- 不做批量危险操作

## 推荐交叉开发顺序

```text
Node v53：Java ops overview 草案适配，保持 fallback
Java v36：实现 /api/v1/ops/overview
Node v54：接入 Java v36 真实 overview
mini-kv v44：实现 INFO
mini-kv v45：实现 INFOJSON
Node v55：接入 mini-kv INFOJSON
Java v37：实现 failed-events summary
Node v56：聚合 Java failed-event summary + mini-kv info/stats
Java v38：整理 operator context 契约
Node v57：包装 Java 失败事件受控操作
mini-kv v46-v48：命令分级、版本注入、只读 smoke 友好化
Java v39：预留 idempotency/cache/rate-limit 抽象
```

## 暂停条件

遇到以下情况应暂停推进，并要求用户确认：

- 需要让 mini-kv 承担订单权威存储
- 需要 Node 绕过 Java 权限直接改业务数据
- 需要默认开启真实写动作
- 需要长时间占用 Java 或 mini-kv 调试端口
- 需要修改三个项目中的两个以上核心业务层
- 对版本边界、命令语义、权限模型有疑惑

## 一句话结论

未来的主线不是把三个项目揉成一个单体，而是做成一个高级组合系统：

```text
Java 负责交易正确性
mini-kv 负责基础设施实验
Node 负责观察、控制、审计、证据链和安全开关
```
