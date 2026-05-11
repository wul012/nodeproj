# Node v54 衍生后三项目推进计划

来源版本：

```text
Node v54：接入 mini-kv v45 INFOJSON，让 Node 能识别 mini-kv version / protocol / uptime / WAL / metrics 元信息。
```

这份计划接在 `v52-cross-project-roadmap.md` 后面。上一轮已经完成：

```text
Java v36：订单平台只读运行概览
mini-kv v44：INFO
mini-kv v45：INFOJSON
Node v53：接入 Java ops overview
Node v54：接入 mini-kv INFOJSON
```

下一阶段目标不是扩大写权限，而是把三项目的“可观察、可解释、可分级”继续补完整。

## 运行调试截图规则

后续版本尽量补截图，统一放在：

```text
a/<版本>/图片/
```

建议命名：

```text
01-typecheck-or-build.png
02-test-result.png
03-smoke-result.png
04-browser-overview.png
```

截图优先级：

1. 有浏览器页面或 HTTP JSON 页面时，用浏览器截图，例如 Node dashboard、`/api/v1/upstreams/overview`、Java read-only endpoint。
2. CLI / TCP 项目没有浏览器页面时，尽量保留终端运行截图，或把关键命令输出归档成图片。
3. 如果某版确实不适合截图，必须在 `a/<版本>/解释/说明.md` 写清楚原因。

后续归档里至少保留：

```text
typecheck / build 结果
test 结果
安全 smoke 结果
真实联调 smoke 结果
截图或无截图原因
清理结果
commit / tag / push 结果
```

## 近期版本安排

### 第一批：Java v37 + mini-kv v46 可以一起推进

这两个版本互不依赖，可以并行或前后连续做。它们都只是补“只读能力描述”，不会让 Java 依赖 mini-kv，也不会让 Node 开启真实写动作。

#### Java v37：失败事件治理摘要

目标：

```text
新增 GET /api/v1/failed-events/summary
```

建议字段：

```text
sampledAt
totalFailedEvents
pendingReplayApprovals
approvedReplayApprovals
rejectedReplayApprovals
latestFailedAt
latestApprovalAt
replayBacklog
```

建议修改：

- 新增 `FailedEventSummaryController`
- 新增 `FailedEventSummaryService`
- 新增 summary response record
- 复用现有 failed-event / approval 存储或服务，不引入新持久化模型

本版不做：

- 不执行 replay
- 不审批 replay
- 不让 Node 发起 Java 写操作
- 不接 mini-kv

验证：

- Java compile/test
- 启动 Java 后访问 `/api/v1/failed-events/summary`
- 截图保存 endpoint JSON 或终端 curl 结果

完成标准：

```text
Java 可以只读告诉 Node：失败事件治理当前有多少积压、多少待审批、最近失败发生在什么时候。
```

#### mini-kv v46：COMMANDS / COMMANDSJSON 命令分级

目标：

```text
新增 COMMANDS 和 COMMANDSJSON，让外部控制面知道 mini-kv 支持哪些命令，以及命令风险类别。
```

建议 `COMMANDSJSON` 字段：

```text
commands[]
  name
  category: read | write | admin | meta
  mutates_store
  touches_wal
  stable
  description
```

建议命令分级：

```text
meta: PING, HELP, HEALTH, INFO, INFOJSON, STATS, STATSJSON
read: GET, TTL, SIZE, KEYS, WALINFO
write: SET, DEL, EXPIRE
admin: COMPACT, RESETSTATS
```

本版不做：

- 不做 ACL
- 不做用户权限
- 不改变现有命令语义
- 不改 Node

验证：

- CMake configure/build
- CTest
- 真实 TCP smoke：`COMMANDSJSON`
- 截图保存终端或 client 输出

完成标准：

```text
mini-kv 能结构化说明自己的命令能力和风险分类，供 Node 后续消费。
```

### 第二批：Node v55 等 Java v37 + mini-kv v46 后推进

Node v55 不建议提前做，因为它要消费 Java v37 和 mini-kv v46 的最终字段。

#### Node v55：统一失败事件摘要 + mini-kv 命令分级

目标：

```text
/api/v1/upstreams/overview 同时展示 Java failed-event summary 和 mini-kv command catalog。
```

建议修改：

- `OrderPlatformClient` 新增 `failedEventsSummary()`
- `MiniKvClient` 新增 `commandsJson()`
- `OpsSnapshotService` 增加两个 fallback probe
- `upstreamOverview` 增加风险摘要：
  - Java failed-event backlog
  - Java pending approval count
  - mini-kv write command count
  - mini-kv admin command count
  - mini-kv command catalog available

本版不做：

- 不执行 Java replay
- 不开放 mini-kv 写操作
- 不做 Dashboard 大改版
- 不把 Java 与 mini-kv 直接绑定

验证：

- Node typecheck/test/build
- 安全 smoke：`UPSTREAM_PROBES_ENABLED=false`
- 三项目真实只读联调 smoke：
  - Java v37
  - mini-kv v46
  - Node v55
- 浏览器截图保存 `/api/v1/upstreams/overview` JSON 或 Dashboard 的 Upstream Overview 输出

完成标准：

```text
Node 能只读看见 Java 失败事件治理压力，也能只读看见 mini-kv 命令能力分级。
```

### 第三批：Node v56 视 v55 展示效果推进

#### Node v56：Dashboard 上游观察详情面板

目标：

```text
把 v53-v55 的只读上游信号从纯 JSON 输出，整理成 Dashboard 上可扫描的详情面板。
```

建议展示：

- Java health
- Java ops overview
- Java failed-event summary
- mini-kv version / protocol
- mini-kv live keys / WAL / metrics
- mini-kv command risk counts
- 当前 probe/action safety flags

本版不做：

- 不新增上游写操作
- 不做复杂图表
- 不做三项目部署编排

验证：

- Node typecheck/test/build
- Playwright 或浏览器截图 Dashboard
- 安全 smoke
- 可选真实只读联调 smoke

完成标准：

```text
用户不用只看原始 JSON，也能在 Dashboard 一眼看到三项目只读集成状态。
```

## 推荐执行顺序

```text
1. Java v37 + mini-kv v46
2. Node v55
3. Node v56
```

如果只想先做一个：

```text
优先 Java v37
```

原因是 Node 后续的上游风险摘要需要 Java failed-event summary，mini-kv 的 command catalog 可以并行补，但 Node v55 最终要等两边字段稳定。

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 默认开启真实上游写动作
- 需要 Node 绕过 Java 直接改订单业务数据
- 需要让 mini-kv 承担订单、库存、支付的权威存储
- 需要单个版本同时改 Java、Node、mini-kv 三个核心业务层
- 对 failed-event 字段、mini-kv 命令分级或 Node 风险摘要语义有疑惑

## 一句话结论

```text
下一阶段做“只读治理摘要 + 命令能力分级 + Node 统一风险观察”，继续保持松耦合。
```
