# Node v372 衍生计划：minimal shard readiness live-read archive verification 后续

## 当前状态

Node v372 已完成 v371 真实只读联调归档验证：

```text
Node v371 archive: e/371
Archive files: 11/11
Source checks: 27/27
v372 checks: 29/29
Reruns live read: false
Starts/stops Java or mini-kv: false
```

v372 只证明 v371 的归档证据完整可复查，不代表分片上线，也不代表 mini-kv 成为 Java 订单或 audit 权威存储。

## 推荐执行顺序

1. Node v373：shard readiness compatibility report。
   - 消费 Node v370 静态 contract consumer gate 和 Node v371/v372 live-read archive。
   - 对比 Java shard-readiness、mini-kv SHARDJSON、Node contract 字段是否一致。
   - 输出是否可以进入“分片雏形纵深”的判断。
   - 不启动、不停止、不写入 Java / mini-kv。

2. 推荐并行：Java shard readiness live echo hardening + mini-kv SHARDJSON hardening。
   - Java 可继续强化 `/api/v1/ops/shard-readiness` 的字段解释、错误语义、测试覆盖。
   - mini-kv 可继续强化 `SHARDJSON` 的 command catalog、fixture parity、边界字段。
   - 这两项不需要等待 Node v373 先完成；Node 只作为契约消费者和联调门禁。

3. Node v374：minimal shard readiness regular gate。
   - 仅在 v373 通过后推进。
   - 把 v370-v373 的静态证据、真实只读证据、归档验证和 compatibility 判断收束为常规门禁。

## 暂停条件

- 需要 Node 自动启动或停止 Java / mini-kv。
- 需要 Node 写 Java、写 mini-kv、写订单、写 audit。
- 需要 mini-kv 承担订单或 audit 权威状态。
- 需要读取 credential value、raw endpoint value 或打开 managed audit 真实连接。
- v370/v371/v372 任一证据缺失时，v373 必须先停下来修证据。

## 质量规则

- v373 不再新增前置归档链，只做 compatibility report。
- 若需要新增 echo/receipt，必须先说明被哪个后续版本消费，以及为什么现有 v370-v372 证据不够。
- 继续小批量验证，禁止默认一次性跑超大测试。
- 新代码不得制造难维护巨型文件；若 service/renderer/test 明显膨胀，先拆分职责再继续。
