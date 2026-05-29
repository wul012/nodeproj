# Node v377 衍生计划：Java / mini-kv shard evidence archive verification 后续

## 当前状态

Node v377 已完成 v376 的 archive verification：

```text
Source Node: v376 Java / mini-kv shard readiness evidence consumption
Archive root verified: e/376
Archive files: 11/11
Checks: 30/30
Forced historical fallback replay: 30/30
Production blockers: 0
Starts/stops Java or mini-kv: false
Writes Java or mini-kv: false
Execution allowed: false
Live read rerun: false
```

这版只验证 v376 归档和 forced historical fallback，不重新启动 Java / mini-kv，也不把 shard readiness 解释成 active sharding。

## 推荐执行顺序

1. 推荐并行：Java / mini-kv 继续各自已计划的 shard hardening 或质量优化。
   - Java / mini-kv 不需要等待 Node。
   - Node 不是上游项目的前置审批中心，只消费已完成版本。
   - 上游如果继续推进，必须输出冻结版本证据，不让 Node 读取滚动 current 文件。

2. Node v378：completed evidence intake。
   - 只读取已经完成并提交/tag 的 Java / mini-kv 新证据。
   - 如果 Java / mini-kv 尚无新完成证据，Node v378 暂停，不继续堆治理链。
   - 如果需要 live read，必须先在计划里写清服务启动方、端口、关闭责任和安全边界。

3. 后续真实联调门槛。
   - 固化最小只读联调为常规 gate 后，才能进入更深的 shard-readiness 消费。
   - 真实分片原型应由 mini-kv 独立开线，Java 只做 read-only echo，Node 只做消费者和门禁。
   - 任何写路由、active shard router、credential value、真实 managed audit connection 都必须另开明确计划。

## 并行 / 等待 / 串行判断

```text
Node v377：已完成。
Java / mini-kv：推荐并行继续，不需要等待 Node。
Node v378：等待“已完成”的 Java / mini-kv 证据；不能消费正在开发中的滚动文件。
```

## 服务启动要求

- Node v378 默认不启动 Java / mini-kv。
- 若某版需要 live read，计划中必须显式写：
  - Java 由谁启动、端口是多少、Node 是否允许关闭；
  - mini-kv 由谁启动、端口是多少、Node 是否允许关闭；
  - HTTP/TCP smoke 的目标、超时、失败时是否 fail closed。

## 质量规则

- 测试继续拆分执行：focused test、相邻版本 test、typecheck、build、HTTP smoke 分开跑。
- 不一次性跑大量测试，除非计划或故障定位明确需要。
- 新 service 必须先拆 `types` / `renderer` / helper，避免巨型文件。
- 历史证据必须使用冻结版本文件，例如 `shard-readiness-v145.json`，不能用滚动 `shard-readiness.json` 作为旧版基线。

## 暂停条件

- Java / mini-kv 新证据尚未完成、未归档、未提交或未 tag。
- Node v378 需要读取未完成的上游滚动文件。
- 需要 Node 启动、停止或写入 Java / mini-kv，但计划没有列明服务启动和清理责任。
- 需要读取 credential value、raw endpoint value 或打开真实 managed audit 连接。
