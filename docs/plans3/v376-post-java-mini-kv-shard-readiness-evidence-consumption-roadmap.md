# Node v376 衍生计划：Java / mini-kv shard evidence consumption 后续

## 当前状态

Node v376 已完成 Java v154 + mini-kv v145 shard-readiness evidence consumption：

```text
Source Node: v375 archive verification
Java: v154 hardening evidence + v153 source core fields
mini-kv: v145 shard-readiness hardening evidence
Required contract fields: 9/9 per source
Checks: 30/30
Production blockers: 0
Historical fallback: covered
Starts/stops Java or mini-kv: false
Writes Java or mini-kv: false
Execution allowed: false
Active sharding: still disabled
```

这版的含义是：Node 已经把 Java v154 的 additive hardening 和 mini-kv v145 的 hardening evidence 收进同一份消费报告，但它仍然只是证据消费，不打开真实分片、不写上游、不启动服务。

## 推荐执行顺序

1. Node v377：archive verification for v376 evidence consumption。
   - 验证 `e/376` 下的 JSON、Markdown、summary、HTML、截图、浏览器快照、解释文档和代码讲解。
   - 验证 v376 同时覆盖本地 sibling evidence 和 forced historical fallback。
   - 不重新启动 Java / mini-kv，不重新执行 live read。
   - 如果发现 v376 归档缺失或 fallback 缺失，先修归档，不进入后续功能。

2. 推荐并行：Java / mini-kv 可继续各自下一版 hardening。
   - Java / mini-kv 不需要等待 Node v377。
   - Node v377 只验证 Node v376 已归档内容，不读取 Java / mini-kv 的未完成新版本。
   - 如果 Java / mini-kv 又完成新证据，Node 后续单独开版本消费。

3. Node v378：根据 v377 结果二选一。
   - 若 v377 archive verification 通过，进入下一轮 completed evidence intake。
   - 若 Java / mini-kv 已产出新的 shard-readiness hardening，Node v378 消费已完成版本。
   - 若没有新的上游证据，Node v378 可转为 minimal shard readiness gate 的常规化报告，不继续堆前置治理链。

## 并行 / 等待 / 串行判断

```text
Node v377：只依赖 Node v376 完成，当前可以推进。
Java / mini-kv：推荐并行推进自己的下一版；不需要等待 Node v377。
Node v378：必须等 Node v377 完成，也必须只消费已完成的 Java / mini-kv 版本。
```

## 服务启动要求

- Node v377 不需要启动 Java / mini-kv。
- 如果后续版本需要 live read，计划中必须显式写出：由谁启动服务、需要哪些端口、Node 是否可以停止本轮启动的服务。
- 只要没有显式 live-read 任务，Node 默认只读本地证据和 historical fixture。

## 质量规则

- 继续小批量验证：focused test、相邻版本 test、typecheck、build、HTTP smoke 分开跑。
- 不默认一次性跑超大测试；如果需要大批量测试，必须说明原因。
- 证据消费版本不能制造巨型 service 文件；超过可维护范围时先拆 `types` / `renderer` / helper。
- 历史证据不能读取滚动 current 文件作为旧版本基线；旧版本必须使用冻结文件名，例如 `shard-readiness-v144.json`。

## 暂停条件

- v376 归档文件缺失。
- forced historical fallback 不能复现 v376 的 Java v154/v153 或 mini-kv v145 消费结果。
- 需要 Node 自动启动、停止、写入 Java / mini-kv。
- 需要读取 credential value、raw endpoint value 或打开 managed audit 真实连接。
