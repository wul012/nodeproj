# Node v380 衍生计划：active shard plan evidence intake 后续

## 当前状态

Node v380 已消费新的完成冻结证据：

```text
Source Node: v379 completed evidence intake archive verification
Java evidence: v157 shard readiness evidence handoff
mini-kv evidence: v147 frozen activePrototypePlan snapshot, produced by mini-kv v148
Checks: 33/33
Evidence sources: 2/2
Production blockers: 0
Starts/stops Java or mini-kv: false
Writes Java or mini-kv: false
Execution allowed: false
Active shard prototype enabled: false
Live read rerun: false
```

v380 的意义是把 Java v157 handoff 和 mini-kv v147 activePrototypePlan 冻结证据纳入 Node 可复现输入。它不启动 Java / mini-kv，不读取 mini-kv rolling current，不把 activePrototypePlan 解释成 active shard router。

## 必要性证明

- 解决的 blocker：v379 后 Java / mini-kv 已各自产出新完成证据，Node 需要消费冻结证据才能进入下一轮归档验证。
- 后续消费者：Node v381 archive verification；后续若进入 live read gate，仍需单独服务启停计划。
- 为什么不能复用 v379：v379 只验证 v378 归档，输入停留在 Java v156/v155 + mini-kv v146，不能证明 Java v157 handoff 或 mini-kv v147 activePrototypePlan frozen baseline。
- 何时停止扩展：v381 归档验证完成后，如果没有新的冻结证据或明确 live-read gate 计划，Node 暂停，不继续新增 archive/governance 链。

## 推荐执行顺序

1. Node v381：archive verification for v380 active shard plan evidence intake。
   - 验证 `e/380` 归档完整。
   - 强制 historical fixture fallback，确认 Java v157 与 mini-kv v147 都从 Node historical fixtures 读取。
   - 不启动 Java / mini-kv。

2. Java / mini-kv：推荐并行继续。
   - Java / mini-kv 不需要等待 Node v381。
   - 如果后续要进入 active prototype，必须先由 mini-kv 提供独立 active prototype 计划和 no-write/no-router 边界。

3. Node 后续 live-read gate：仅在有明确计划时推进。
   - 必须写清 Java / mini-kv 服务由谁启动、端口、关闭责任。
   - 必须保持 read-only、executionAllowed=false、fail closed。

## 并行 / 等待 / 串行判断

```text
Node v380：已完成。
Node v381：可以推进，只验证 v380 归档。
Java / mini-kv：推荐并行继续，不需要等待 Node。
Node live-read gate：必须等待明确服务启停计划，否则暂停。
```

## 暂停条件

- v381 找不到 v380 归档文件，或 forced historical fixture fallback 不能证明冻结读取。
- 需要启动/停止 Java 或 mini-kv，但计划没有列明服务责任。
- 需要读取 credential value、raw endpoint value 或打开真实 managed audit 连接。
- 需要 mini-kv active shard router、写路由、多进程分片或写命令，但没有单独 mini-kv active prototype 计划。
