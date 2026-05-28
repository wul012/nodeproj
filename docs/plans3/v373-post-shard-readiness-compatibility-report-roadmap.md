# Node v373 衍生计划：shard readiness compatibility report 后续

## 当前状态

Node v373 已完成 shard readiness compatibility report：

```text
Node v370 static contract gate: ready
Node v372 archive verification: ready
Project reports: 2/2 compatible
Field checks: 18/18 matched
v373 checks: 23/23
Reruns live read: false
Starts/stops Java or mini-kv: false
```

v373 证明静态证据和已归档真实只读输出一致，可以进入常规门禁收束。它仍不是分片上线，也不是把 mini-kv 放入 Java 交易一致性链路。

## 推荐执行顺序

1. Node v374：minimal shard readiness regular gate。
   - 消费 v370 静态证据、v371 live-read 归档、v372 archive verification、v373 compatibility report。
   - 输出一个常规门禁，用于后续 CI/operator 判断。
   - 不启动、不停止、不写入 Java / mini-kv。

2. 推荐并行：Java shard readiness hardening + mini-kv SHARDJSON hardening。
   - Java 可以继续做 live echo 字段解释、错误语义、测试覆盖。
   - mini-kv 可以继续做 SHARDJSON command catalog、fixture parity、只读边界字段。
   - Node 不抢跑它们的实现，只在 v374 后继续消费新证据。

3. Node v375：regular gate archive verification。
   - 仅在 v374 完成后推进。
   - 验证 regular gate 的 JSON/Markdown/summary/screenshot/讲解/计划索引完整。

## 暂停条件

- 需要 Node 自动启动或停止 Java / mini-kv。
- 需要 Node 写 Java、写 mini-kv、写订单、写 audit。
- 需要 mini-kv 承担订单或 audit 权威状态。
- 需要读取 credential value、raw endpoint value 或打开 managed audit 真实连接。
- v370-v373 任一证据链缺失时，v374 必须先停下来修证据。

## 质量规则

- v374 是常规门禁收束，不要再新增一条平行 prerequisite 链。
- 如果引入新的 shard readiness 字段，必须同时说明 Java、mini-kv、Node 哪一方生产/消费。
- 继续小批量验证，禁止默认一次性跑超大测试。
- 新代码不得制造难维护巨型文件；若 service/renderer/test 明显膨胀，先拆分职责再继续。
