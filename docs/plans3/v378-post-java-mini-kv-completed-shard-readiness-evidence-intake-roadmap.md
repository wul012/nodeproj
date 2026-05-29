# Node v378 衍生计划：completed shard-readiness evidence intake 后续

## 当前状态

Node v378 已消费 Java v156 / v155 与 mini-kv v146 的完成证据：

```text
Source Node: v377 archive verification
Java: v156 evidence verification + v155 evidence index
mini-kv: v146 shard-readiness historical fallback snapshot
Checks: 38/38
Production blockers: 0
Starts/stops Java or mini-kv: false
Writes Java or mini-kv: false
Execution allowed: false
Live read rerun: false
```

v378 的重点是把已经完成的上游证据冻结为 Node 可复现输入。mini-kv v146 原始输出来自 `fixtures/release/shard-readiness.json`，Node 在本版将其保存为：

```text
fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v146.json
```

因此 v378 不再依赖 mini-kv 的滚动 current 文件。

## 推荐执行顺序

1. Node v379：archive verification for v378 completed evidence intake。
   - 验证 `e/378` 下的 JSON、Markdown、summary、HTML、截图、浏览器快照、解释文档和代码讲解。
   - 验证 Java v156/v155 与 mini-kv v146 都来自冻结 historical snapshot。
   - 不重新启动 Java / mini-kv，不重新执行 live read。

2. 推荐并行：Java / mini-kv 可继续自己的后续版本。
   - Java 可继续 shard echo / index / verification 的后续 hardening。
   - mini-kv 可继续 shard-readiness 或分片雏形前置证据。
   - Node 只消费完成并冻结的上游证据，不作为上游开发阻塞点。

3. 后续真实联调门槛。
   - 如果要从证据消费进入真实联调，计划必须先列明服务启动、端口、关闭责任和 smoke 目标。
   - 如果要从 readiness 进入 active shard prototype，必须由 mini-kv 单独开分片原型计划，Java 做 read-only echo，Node 做消费者和 gate。

## 并行 / 等待 / 串行判断

```text
Node v379：只依赖 Node v378 完成，当前可以推进。
Java / mini-kv：推荐并行继续，不需要等待 Node v379。
Node 后续 consumption：必须等待 Java / mini-kv 新证据完成、冻结、提交/tag。
```

## 服务启动要求

- Node v379 不需要启动 Java / mini-kv。
- 若后续版本要做 live read，计划中必须写清：
  - Java 端口、启动方、关闭责任；
  - mini-kv 端口、启动方、关闭责任；
  - Node 是否允许关闭本轮启动的服务；
  - smoke 失败是否 fail closed。

## 质量规则

- 继续分批验证，不一次性跑大量测试。
- 新增服务要拆 `types` / `renderer` / helper，不制造巨型文件。
- 任何旧版本基线都必须读冻结文件，不读滚动 current。
- 如果 mini-kv 后续真的进入分片雏形，Node 只消费 read-only readiness，不直接授权写路由。

## 暂停条件

- `e/378` 归档缺失或不能复现。
- Java / mini-kv 新证据尚未完成、未冻结、未提交或未 tag。
- Node 需要读取未完成上游 current 文件。
- 需要启动/停止 Java 或 mini-kv，但计划没有列明服务启动和清理责任。
- 需要读取 credential value、raw endpoint value 或打开真实 managed audit 连接。
