# Node v371 衍生计划：minimal shard readiness live-read gate 后续

## 当前状态

Node v371 已完成最小真实只读联调：

```text
Java live read: GET /api/v1/ops/shard-readiness
mini-kv live read: SHARDJSON
Node: 只读消费，不启动、不停止、不写入两边服务
```

v371 证明三项目已经从 fixture / archive 证据推进到真实服务窗口下的最小只读联调。它仍然不是分片上线，也不是让 mini-kv 成为订单或 audit 权威存储。

## 推荐执行顺序

1. Node v372：minimal shard readiness live-read archive verification。
   - 消费 v371 的 JSON / Markdown / summary / screenshot / explanation / walkthrough。
   - 验证 live-read archive 是否齐全。
   - 不重新读取 Java / mini-kv，不要求两边服务继续运行。

2. 推荐并行：Java shard readiness live echo hardening + mini-kv shard readiness command/fixture hardening。
   - Java 可以强化 endpoint 返回字段、错误语义、测试覆盖。
   - mini-kv 可以强化 `SHARDJSON` 的 command catalog、fixture parity、边界字段。
   - Node 不作为这两边优化的前置审批中心。

3. Node v373：shard readiness compatibility report。
   - 仅在 v372 完成后推进。
   - 对比 fixture evidence、live-read evidence、contract fields，判断下一阶段是否能进入“分片雏形纵深”。

## 暂停条件

- 需要 Node 自动启动或停止 Java / mini-kv。
- 需要写上游、写订单、写 audit、执行 mini-kv 写命令。
- 需要把 mini-kv 放入 Java 交易一致性链路。
- 需要 credential value、raw endpoint value 或 managed audit 真实连接。
- v371 归档缺失关键证据时，v372 必须先修归档，不继续扩展新能力。

## 质量规则

- v372 是 archive verification，不做新的 live probe。
- 若发现 v371 证据字段不足，只修 v371 archive / explanation，不直接跳到新功能。
- 继续小批量验证，不一次性跑大测试。
