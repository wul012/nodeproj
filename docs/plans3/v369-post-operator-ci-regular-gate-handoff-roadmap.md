# Node v369 衍生计划：read-only / shard-readiness 契约冻结后的并行推进

## 当前状态

Node v369 已把 v367 最小只读联调 gate 和 v368 archive verification 收口为 operator/CI regular gate handoff：

```text
read-only-integration.v1 已冻结
shard-readiness.v1 已冻结
Node 只做 contract consumer + integration gate
Java / mini-kv 可以按契约并行产出 shard readiness 证据
```

本计划不是继续扩展 Node 前置归档链，而是把 Node 从“所有进度的前置审批中心”降级为“契约消费者 + 联调门禁”。

## 推荐执行顺序

1. 推荐并行：mini-kv shard-readiness prototype + Java shard-readiness echo。
   - mini-kv 只做 shard map / slot table / key routing / 多目录或多进程 smoke 的只读证据。
   - Java 只做 fixture-first shard readiness echo，字段对齐 `shard-readiness.v1`。
   - 两边都不得承载订单或 audit 权威状态，不得要求 Node 先新增归档审批链。

2. Node v370：shard readiness contract consumer gate。
   - 只在 Java 和 mini-kv 都发布 `shard-readiness.v1` 只读证据后推进。
   - 消费两边证据，验证字段、digest、readOnly、executionAllowed、routingMode。
   - 不启动 Java / mini-kv，不写上游，不连接 managed audit。

3. Node v371：minimal shard readiness live-read gate。
   - 仅当用户明确确认 Java / mini-kv 服务已按各自计划启动后执行。
   - Node 只做 GET/INFO/HEALTH 级别只读读取，不自动启动或停止另外两个项目。

## 启动要求

Node v370 不需要启动 Java / mini-kv。

Node v371 若进入真实只读联调，需要用户或对应项目 agent 提前完成：

```text
Java: 启动 advanced-order-platform 的只读 ops/shard-readiness endpoint
mini-kv: 启动只读 shard readiness / INFO / HEALTH 能力
Node: 只读取，不启动、不停止、不写入两边服务
```

如果服务未启动，Node v371 必须 fail closed，并记录为环境未满足，而不是修改业务逻辑绕过。

## 质量优化规则

- 后续每个 Node 版本继续遵守“不要制造巨型文件”的规则。
- 若新增 echo / governance / readiness 链条，先写必要性证明。
- 单版目标控制在一个小闭环，不把契约、服务、路由、截图、计划以外的大重构塞进同一版。
- 如果需要大拆分，先做质量优化版，再推进功能版。

## 暂停条件

- Java 或 mini-kv 尚未发布 shard readiness 只读证据时，Node v370 必须暂停。
- 需要 Node 自动启动 Java / mini-kv 时必须暂停并让用户确认。
- 需要 credential value、raw endpoint value、managed audit 真实连接、上游写操作、订单或 audit 权威状态迁移时必须暂停。
- 如果发现 `read-only-integration.v1` 或 `shard-readiness.v1` 字段不够用，先修订计划和契约，不直接写功能。
