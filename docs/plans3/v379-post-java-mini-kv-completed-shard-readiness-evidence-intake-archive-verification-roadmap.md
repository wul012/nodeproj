# Node v379 衍生计划：completed shard-readiness evidence intake archive verification 后续

## 当前状态

Node v379 已完成 v378 archive verification：

```text
Source Node: v378 completed evidence intake
Archive root verified: e/378
Archive files: 11/11
Checks: 31/31
Replay from frozen evidence: 38/38
Production blockers: 0
Starts/stops Java or mini-kv: false
Writes Java or mini-kv: false
Execution allowed: false
Live read rerun: false
```

v379 的意义是确认 v378 的 Java v156/v155 + mini-kv v146 完成证据已经归档、可回放、可在没有 sibling workspace 的场景下依赖 Node historical fixture。

## 推荐执行顺序

1. 推荐并行：Java / mini-kv 继续各自后续版本。
   - Java / mini-kv 不需要等待 Node。
   - Node 不作为上游审批中心，只消费完成证据或承担明确 gate。
   - 上游必须继续输出冻结证据，避免 Node 读取滚动 current。

2. Node v380：二选一。
   - 如果 Java / mini-kv 有新的已完成冻结证据，Node v380 消费完成证据。
   - 如果没有新证据，但要进入真实只读联调，Node v380 必须先写 live-read gate 的服务启动计划。
   - 如果两者都没有，Node 暂停，不继续堆 archive verification / governance 链。

3. 后续真实联调门槛。
   - 必须写清 Java / mini-kv 服务由谁启动、端口、关闭责任。
   - 必须保持 read-only、executionAllowed=false、fail closed。
   - 不得把 shard-readiness evidence 当成 active shard routing。

## 并行 / 等待 / 串行判断

```text
Node v379：已完成。
Java / mini-kv：推荐并行继续，不需要等待 Node。
Node v380：必须等待新的完成证据，或显式 live-read gate 计划；否则暂停。
```

## 服务启动要求

- v379 不启动 Java / mini-kv。
- v380 若要做 live read，计划中必须列出：
  - Java 端口和启动/关闭责任；
  - mini-kv 端口和启动/关闭责任；
  - Node 是否允许停止本轮启动的服务；
  - smoke 目标和失败策略。

## 质量规则

- 分批验证，避免一次性跑大量测试。
- 新增服务继续拆 `types` / `renderer` / helper。
- 历史证据继续使用冻结文件，不读滚动 current。
- 进入真实联调前，先证明最小只读链路，而不是继续扩展治理文本。

## 暂停条件

- Java / mini-kv 没有新的完成冻结证据，且 v380 也没有明确 live-read gate 计划。
- 需要启动/停止 Java 或 mini-kv，但计划没有列明服务责任。
- 需要读取 credential value、raw endpoint value 或打开真实 managed audit 连接。
- 需要 mini-kv active shard router、写路由或多进程分片，但没有单独 mini-kv 原型计划。
