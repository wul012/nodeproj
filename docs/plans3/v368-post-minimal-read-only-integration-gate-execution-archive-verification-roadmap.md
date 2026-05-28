# Node v368 衍生计划：minimal read-only gate execution archive verification 之后

来源版本：Node v368 `minimal read-only gate execution archive verification`。

计划状态：v367 衍生计划中的 Node v368 已完成后另起续写；不回填旧计划，不写重复版本。

## 文档归档位置

```text
运行截图和解释：e/<版本>/
计划文档：docs/plans3/
代码讲解：代码讲解记录_生产雏形阶段3/
```

## 当前对齐状态

```text
Node v349：minimal read-only integration smoke rerun archive 已真实只读跑通，5/5 passed。
Node v364：minimal read-only integration regular gate 已完成，34/34 checks passed。
Node v365：regular gate archive + CI/operator friendly check 已完成，40/40 checks passed。
Node v366：explicit read-window gate execution decision 已完成，明确无窗口时等待。
Node v367：minimal read-only integration gate execution 已完成，真实读窗口下 5/5 read targets passed，20/20 checks passed。
Node v368：minimal read-only gate execution archive verification 已完成，11/11 archive files present，42/42 checks passed。

当前仍不读取 credential value、不解析 raw endpoint URL、不实例化 provider/client、不发真实 managed audit HTTP/TCP、不实现或调用 runtime shell、不写 Java ledger/schema/SQL、不执行 mini-kv write/admin、不自动启动上游。
```

## 方向修正

```text
Node 不再作为所有进度的前置审批中心。
Node 继续负责风险边界、契约消费和联调门禁。
Java / mini-kv 可以在冻结契约下并行推进，不需要每一步都等 Node 先归档。
```

这不是放松安全边界，而是把边界从“Node 串行批准所有动作”改成“冻结契约 + 各项目并行产出 + Node 最后消费验证”。

## 冻结契约草案

```text
read-only-integration.v1：
- project
- version
- readOnly=true
- executionAllowed=false
- status
- evidencePath

shard-readiness.v1：
- project
- version
- readOnly=true
- executionAllowed=false
- shardEnabled
- shardCount
- slotCount
- routingMode
- evidencePath
- status
```

这两个契约只定义最小字段，不规定 Java / mini-kv 内部实现方式。mini-kv 可以先产出 shard readiness JSON，Java 可以先 echo readiness，Node 后续只消费。

## 推荐执行顺序

```text
1. Node v369：operator/CI regular gate handoff + contract freeze。
   - 消费 v367 / v368 证据。
   - 把 5 个只读目标固化为常规 operator / CI gate。
   - 明确 focused -> grouped -> build -> smoke，不一次性跑大量测试。
   - 写入 read-only-integration.v1 与 shard-readiness.v1 最小字段。
   - 不再新增 archive-only 前置链。

2. 推荐并行：mini-kv shard readiness prototype + Java shard readiness echo。
   - mini-kv 可直接开分片雏形线：shard map / slot table / key routing / 多目录或多进程 smoke。
   - Java 可直接开 shard readiness echo：先 fixture，后 live，字段对齐 shard-readiness.v1。
   - 两者可以并行，不需要互相等待，也不需要等待 Node 逐步设计所有细节。

3. Node v370：shard readiness contract consumer gate。
   - 只在 mini-kv 与 Java 都产出 shard-readiness.v1 后执行。
   - Node 消费两边只读输出，验证字段、版本、readOnly、executionAllowed=false、status。
   - 不替 mini-kv 实现分片，不替 Java 实现业务路由。
```

## 显式质量优化项

```text
Node：
- v369 必须复用 v367/v368 evidence，不重新定义 probe 目标。
- v369 只做 handoff + contract freeze，不再拆成多个 archive / closure 小版本。
- 新代码继续拆分 types / renderer / service / test，不写巨型文件。

mini-kv：
- shard readiness 第一阶段只产出只读 JSON / CLI evidence。
- 不让 mini-kv 承担 audit/order 权威状态。
- 不把 LOAD / COMPACT / SETNXEX / RESTORE 混入 Node 的只读门禁。

Java：
- shard readiness 第一阶段只做 echo / fixture / readonly endpoint。
- 不提前改订单事务、支付、库存或 ledger 写链路。
```

## 后续启动要求

```text
如果 Node v370 或后续版本需要真实读取 Java / mini-kv：
- Java 需提供 8080 health + ops overview + shard readiness 只读输出。
- mini-kv 需提供 6379 HEALTH / INFOJSON / STATSJSON + shard readiness 只读输出。
- Node 只设置 UPSTREAM_PROBES_ENABLED=true；UPSTREAM_ACTIONS_ENABLED 必须保持 false。
- Node 不自动启动上游，除非用户在本轮明确授权。
```

## 暂停条件

- v369 试图继续新增 archive-only / closure-only 前置链，而不是收束成 operator / CI handoff。
- shard-readiness.v1 字段无法冻结，或 Java / mini-kv 对字段含义有分歧。
- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 实现、启用或调用 disabled runtime shell。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v368 已把 v367 真实最小只读 gate 归档验证完；下一步 Node v369 应收束成 operator / CI regular gate 和契约冻结，然后允许 mini-kv / Java 在 shard-readiness.v1 下并行推进。
```
