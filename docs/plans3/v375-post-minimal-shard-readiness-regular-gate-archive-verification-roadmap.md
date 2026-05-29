# Node v375 衍生计划：regular gate archive verification 后续

## 当前状态

Node v375 已完成 minimal shard readiness regular gate archive verification：

```text
Source archive: e/374
Archive files: 11/11 present
Source regular gate checks: 18/18
Archive verification checks: 27/27
Production blockers: 0
Reruns live read: false
Starts/stops Java or mini-kv: false
Execution allowed: false
```

v375 的含义是：Node v374 的 regular gate 归档已经完整，可以进入下一步消费 Java v154 / mini-kv v145 的新证据。

## v376 执行结果

Node v376 已完成 Java v154 + mini-kv v145 shard-readiness evidence consumption：

```text
Source Node: v375 archive verification
Java evidence: v154 hardening + v153 source core
mini-kv evidence: v145 hardening
Required fields: project/version/readOnly/executionAllowed/shardEnabled/shardCount/slotCount/routingMode/status
Checks: 30/30
Production blockers: 0
Starts/stops Java or mini-kv: false
Execution allowed: false
Historical fallback: Java v154/v153 + mini-kv v145 covered
```

v376 额外修复了旧 v370 的历史证据稳定性：v370 现在读取冻结的 `shard-readiness-v144.json`，不会再被 mini-kv 的 current `shard-readiness.json` 推进到 v145 后影响。

## 推荐执行顺序

1. Node v376：consume Java v154 + mini-kv v145 shard-readiness evidence。
   - 读取 Java v154 shard readiness hardening 证据。
   - 读取 mini-kv v145 shard readiness evidence hardening 证据。
   - 与 v374 regular gate 契约字段对齐：`project`、`version`、`readOnly`、`executionAllowed`、`shardEnabled`、`shardCount`、`slotCount`、`routingMode`、`status`。
   - 不启动、不停止、不写入 Java / mini-kv。

2. 推荐并行：Java / mini-kv 可继续后续 hardening。
   - Java / mini-kv 可以继续推进自己的下一版。
   - Node v376 只消费已经完成的 Java v154 / mini-kv v145；不读取未完成版本。
   - 如果 Java / mini-kv 后续又产出新证据，Node 在 v377 或后续版本再消费。

3. Node v377：archive verification 或差异报告。
   - 如果 v376 消费成功，v377 验证 v376 归档。
   - 如果 v376 发现字段差异，v377 不继续推进，应先产出差异修复计划。
   - 续写计划见 `docs/plans3/v376-post-java-mini-kv-shard-readiness-evidence-consumption-roadmap.md`。

## 并行 / 等待 / 串行判断

```text
Node v376：等待上游已完成证据，但 Java v154 / mini-kv v145 已完成，所以 Node 可以推进。
Java / mini-kv：推荐并行继续自己的下一版；它们不需要等待 Node v376。
串行边界：Node v377 必须等 Node v376 完成。
```

## 服务启动要求

- Node v376 默认不需要启动 Java / mini-kv。
- v376 只读取已完成的本地证据和 historical fixture fallback。
- 如果 v376 发现证据缺失，不自动启动服务补数据，先报告缺失项。

## 暂停条件

- Java v154 或 mini-kv v145 证据不存在，且 historical fixture fallback 也不存在。
- 新证据字段和 v374 regular gate 契约不一致。
- 需要 Node 自动启动或停止 Java / mini-kv。
- 需要 Node 写 Java、写 mini-kv、写订单、写 audit。
- 需要读取 credential value、raw endpoint value 或打开 managed audit 真实连接。

## 质量规则

- v376 是证据消费，不新增平行 governance 链。
- 新证据消费要同时验证本地 sibling evidence 和 forced historical fallback。
- 继续小批量验证，禁止默认一次性跑超大测试。
- 新代码不得制造难维护巨型文件；如果 service / renderer / test 明显膨胀，先拆分职责再继续。
