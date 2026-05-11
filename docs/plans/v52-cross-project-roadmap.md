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

## 近期执行任务单

本轮只排 5 个具体版本，按顺序推进。做完这 5 个版本后，再重新评估下一轮，不提前把远期任务塞进当前节奏。

```text
1. Java v36
2. Node v53
3. mini-kv v44
4. mini-kv v45
5. Node v54
```

### 1. Java v36：订单平台只读运行概览

目标：Java 先补一个稳定、只读、面向控制面的业务概览接口，给 Node v53 真实接入。

新增接口：

```text
GET /api/v1/ops/overview
```

建议返回字段：

- `application.name`
- `application.profiles`
- `application.startedAt` 或 `uptimeSeconds`
- `orders.total`
- `inventory.items`
- `outbox.pending`
- `failedEvents.total`
- `failedEvents.pendingReplayApprovals`
- `failedEvents.latestFailedAt`

本版不做：

- 不触发失败事件重放
- 不修改订单、库存、Outbox 或失败事件状态
- 不接入 mini-kv
- 不引入真实登录系统

验证建议：

- Java 单测覆盖 overview 聚合
- Spring Boot 测试或 MockMvc 覆盖 `/api/v1/ops/overview`
- 本地 smoke 只访问该 GET 接口

完成标准：

```text
Java 能独立返回业务概览；Node 不参与也能验证通过。
```

### 2. Node v53：接入 Java v36 overview，保留 fallback

目标：Node 在 `upstream overview` 里读取 Java v36 的 `/api/v1/ops/overview`，但 Java 未运行或接口不可用时不能拖垮 Node。

建议修改：

- `OrderPlatformClient` 新增 `opsOverview()`
- `OpsSnapshotService` 或 `upstreamOverview` 增加 Java business overview 信号
- `/api/v1/upstreams/overview` 展示 Java 业务摘要
- Dashboard 的 `Upstream Overview` 能看到 Java 业务字段
- `UPSTREAM_PROBES_ENABLED=false` 时仍然完全 disabled，不触碰 Java

本版不做：

- 不新增 Java 写操作
- 不调用失败事件 replay/approval
- 不修改 mini-kv

验证建议：

- Node typecheck/test/build
- 安全 smoke：`UPSTREAM_PROBES_ENABLED=false`
- 真实联调 smoke：启动 Java v36 + Node，确认 overview 能读到 Java 业务字段

完成标准：

```text
Node 能读 Java v36 overview；Java 不在线时 Node 仍可用。
```

### 3. mini-kv v44：CMake 版本注入 + INFO 命令

目标：mini-kv 第一版元信息接口要从一开始就带真实版本，不先手写再补。

建议新增：

```text
INFO
```

建议输出 text 格式：

```text
version=0.44.0 protocol=inline,resp uptime_seconds=12 live_keys=0 wal_enabled=no metrics_enabled=no max_request_bytes=65536
```

建议实现点：

- CMake 从 `project(mini_kv VERSION 0.44.0)` 注入版本宏
- `INFO` 返回版本、协议、uptime、live_keys、wal_enabled、metrics_enabled、max_request_bytes
- `HEALTH` 可以暂时不加版本，若工作量合适可顺手补 `version=...`

本版不做：

- 不做 `INFOJSON`
- 不做命令权限系统
- 不接 Java
- 不改变现有 `STATSJSON` 语义

验证建议：

- CMake build
- CTest
- 本地 TCP smoke：`INFO`
- README 和代码讲解记录更新

完成标准：

```text
mini-kv 能通过 INFO 暴露真实版本和基础运行信息。
```

### 4. mini-kv v45：INFOJSON 命令

目标：给 Node 提供稳定结构化元信息，避免 Node 解析 text `INFO`。

新增接口：

```text
INFOJSON
```

建议返回结构：

```json
{
  "version": "0.45.0",
  "server": {
    "protocol": ["inline", "resp"],
    "uptime_seconds": 12,
    "max_request_bytes": 65536
  },
  "store": {
    "live_keys": 0
  },
  "wal": {
    "enabled": false
  },
  "metrics": {
    "enabled": false
  }
}
```

本版不做：

- 不替代 `STATSJSON`
- 不做 `COMMANDSJSON`
- 不做 Node 接入

验证建议：

- CTest 覆盖 `INFOJSON`
- TCP smoke 验证返回合法 JSON object
- 空库、无 WAL、未启用 metrics 时字段稳定存在

完成标准：

```text
mini-kv 能通过 INFOJSON 给外部控制面提供结构化元信息。
```

### 5. Node v54：接入 mini-kv v45 INFOJSON

目标：Node 在 v52 已有 `HEALTH/STATSJSON` 基础上，增加 mini-kv 元信息识别能力。

建议修改：

- `MiniKvClient` 新增 `infoJson()`
- `/api/v1/upstreams/overview` 展示 mini-kv version、protocol、uptime、wal mode、metrics mode
- Dashboard 的 `Upstream Overview` 能看到 mini-kv 元信息
- promotion evidence 或 release archive 可记录 mini-kv version 和 protocol 摘要

本版不做：

- 不开放 mini-kv 写操作
- 不接 Java failed-event summary
- 不做 Java 受控操作

验证建议：

- Node typecheck/test/build
- 安全 smoke：`UPSTREAM_PROBES_ENABLED=false`
- 真实联调 smoke：启动 mini-kv v45 + Node，确认 overview 能读到 `INFOJSON`

完成标准：

```text
Node 能识别 mini-kv 真实版本和元信息；真实写动作仍默认关闭。
```

## 本轮之后再评估

以下方向先记录，不作为本轮立即执行任务：

```text
Java v37：失败事件治理摘要 GET /api/v1/failed-events/summary
mini-kv v46：COMMANDS / COMMANDSJSON 命令分级
Node v55：统一 Java failed-event summary + mini-kv info/stats 风险摘要
Node 失败事件受控操作入口：以后拆成申请、审核、执行 2-3 个小版本，不做单版大包
Java 幂等/缓存抽象：等 Node 只读观察和 mini-kv 元信息稳定后再讨论
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
