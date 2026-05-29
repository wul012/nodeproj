# Node v374 衍生计划：minimal shard readiness regular gate 后续

## 当前状态

Node v374 已完成 minimal shard readiness regular gate：

```text
Source chain: Node v370-v373
Source project reports: 2/2 compatible
Field checks: 18/18 matched
Regular gate checks: 18/18
Production blockers: 0
Reruns live read: false
Starts/stops Java or mini-kv: false
Execution allowed: false
Active sharding enabled: false
```

v374 的含义是：Node 已经能把 shard readiness 证据链作为 operator / CI 的常规门禁使用。它不表示真实分片已经启用，也不表示 Java 已经把 mini-kv 纳入订单写链路。

## 推荐执行顺序

1. Node v375：regular gate archive verification。
   - 消费 Node v374 的 JSON、Markdown、summary、HTML、截图、解释、代码讲解和计划索引。
   - 验证 archive shape、digest linkage、截图/解释是否齐全。
   - 不启动、不停止、不写入 Java / mini-kv。

2. 推荐并行：Java shard readiness hardening + mini-kv SHARDJSON hardening。
   - Java 可以继续做 shard readiness echo 字段解释、错误语义和测试覆盖。
   - mini-kv 可以继续做 SHARDJSON command catalog、fixture parity 和只读边界字段。
   - 这两项可以和 Node v375 并行推进；Node v375 只验证自己的 v374 归档，不依赖它们的新提交。

3. Node v376：consume next Java / mini-kv shard-readiness evidence。
   - 仅在 Java / mini-kv 有新一轮只读证据后推进。
   - 如果两边还没有新证据，Node v376 应暂停，不继续堆前置治理链。

## 连续并行推进规则

Java 和 mini-kv 可以连续并行推进自己的版本，只要它们每次默认读取当前全局 plan，并且不修改 Node 正在写的归档、计划、fixture 或代码文件。

写入后续每份 plan 时必须明确：

```text
是否推荐并行：
  - 推荐并行：Java / mini-kv 可继续推进，不等待 Node。
  - 等待上游：Node 需要 Java / mini-kv 的指定版本证据，未完成则 Node 停止。
  - 串行：只有当同一项目内部版本存在直接依赖时才串行。
```

当前 v374 后的判断：

```text
Node v375 与 Java shard readiness hardening / mini-kv SHARDJSON hardening 推荐并行。
Node v375 不消费它们的新提交，只验证 v374 归档。
Node v376 才需要等待两边的新一轮已完成只读证据。
```

## 服务启动要求

- Node v375 不需要启动 Java / mini-kv。
- 如果后续版本需要真实只读联调，计划必须提前写明：
  - 需要启动哪个服务；
  - 建议端口；
  - 是否由用户启动还是由 Node 侧在授权后启动；
  - 结束后由谁关闭。

## 暂停条件

- 需要 Node 自动启动或停止 Java / mini-kv，但计划没有明确写启动/关闭要求。
- 需要 Node 写 Java、写 mini-kv、写订单、写 audit。
- 需要读取 credential value、raw endpoint value 或打开 managed audit 真实连接。
- v374 归档证据缺失时，v375 必须先修归档，不推进新功能。

## 质量规则

- v375 是归档验证，不再新增一条新的 prerequisite 链。
- 如果 Java / mini-kv 正在并行开发，Node 不抢跑消费未完成证据。
- 继续小批量验证，禁止默认一次性跑超大测试。
- 新代码不得制造难维护巨型文件；如果 service / renderer / test 明显膨胀，先拆分职责再继续。
