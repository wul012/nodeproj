# Node v381 衍生计划：active shard plan evidence intake archive verification 后续

## 当前状态

Node v381 已验证 v380 active shard plan evidence intake 归档：

```text
Source Node: v380 active shard plan evidence intake
Archive root verified: e/380
Archive files: 11/11
Checks: 33/33
Replay from frozen evidence: 33/33
Production blockers: 0
Starts/stops Java or mini-kv: false
Writes Java or mini-kv: false
Execution allowed: false
Active shard prototype enabled: false
Live read rerun: false
```

v381 的意义是确认 Java v157 handoff 与 mini-kv v147 activePrototypePlan frozen baseline 已经由 Node 归档并可回放。它仍不是 live read，也不是 active shard router。

## 必要性证明

- 解决的 blocker：v380 已消费新的完成冻结证据，但需要归档验证来证明 `e/380` 完整、可复查、可强制 historical fixture fallback。
- 后续消费者：后续 Node live-read gate 计划，或下一轮 Java / mini-kv 完成冻结证据消费。
- 为什么不能复用 v380：v380 是消费器，不能证明自身归档完整，也不能单独证明 forced historical fixture fallback。
- 何时停止扩展：如果没有新的完成冻结证据，且没有明确 live-read gate 服务启停计划，Node 暂停。

## 推荐执行顺序

1. 暂停 Node 自动推进。
   - 当前没有新的 Java / mini-kv 完成冻结证据。
   - 当前也没有明确 live-read gate 服务启停计划。

2. Java / mini-kv：推荐并行继续。
   - Java 可继续只读 echo / handoff。
   - mini-kv 可继续 active prototype 前置计划或冻结证据，但不能启用 router/write path。

3. Node 下一步二选一。
   - 如果 Java / mini-kv 有新的完成冻结证据，Node 消费冻结证据。
   - 如果要进入 live read，先写服务启动、端口、关闭责任、smoke 目标和 fail-closed 策略。

## 并行 / 等待 / 串行判断

```text
Node v381：已完成 archive verification。
Java / mini-kv：推荐并行继续，不需要等待 Node。
Node 下一步：等待新的完成冻结证据，或等待明确 live-read gate 计划。
```

## 暂停条件

- 没有新的完成冻结证据，且没有明确 live-read gate 计划。
- 需要启动/停止 Java 或 mini-kv，但计划没有列明服务责任。
- 需要读取 credential value、raw endpoint value 或打开真实 managed audit 连接。
- 需要 mini-kv active shard router、写路由、多进程分片或写命令，但没有单独 mini-kv active prototype 计划。
