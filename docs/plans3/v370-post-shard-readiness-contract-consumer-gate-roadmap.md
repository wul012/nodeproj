# Node v370 衍生计划：shard readiness contract consumer gate 后续

## 当前状态

Node v370 已消费三份证据：

```text
Node v369: operator/CI regular gate handoff
Java v153: shard readiness echo
mini-kv v144: shard readiness read-only prototype
```

v370 的结论是：Java 和 mini-kv 都已按 `shard-readiness.v1` 提供只读证据，Node 可以进入下一步最小 live-read gate。但这一步仍然不是写操作，也不是分片正式上线。

## 推荐执行顺序

1. Node v371：minimal shard readiness live-read gate。
   - 前提：用户明确确认 Java 和 mini-kv 服务已经由各自项目启动。
   - Node 只读调用：
     - Java: `GET /api/v1/ops/shard-readiness`
     - mini-kv: `SHARDJSON` 或等价只读 HTTP/TCP smoke 输出
   - 不启动、不停止、不构建、不测试、不修改 Java / mini-kv。
   - 不写订单、不写 audit、不执行 mini-kv 写命令。

2. 推荐并行：Java shard readiness live echo hardening + mini-kv shard readiness route/sample hardening。
   - 如果用户希望继续加速，可以让 Java / mini-kv 在各自窗口继续强化 live 证据。
   - Node 不需要成为这两边优化的前置审批中心。

3. Node v372：minimal shard readiness live-read archive verification。
   - 仅消费 v371 的真实只读联调归档。
   - 验证 live-read 证据、截图、summary、fallback 是否齐全。

## 启动要求

Node v371 需要用户配合：

```text
Java 服务已启动，并能访问 GET /api/v1/ops/shard-readiness
mini-kv 服务已启动，并能返回 SHARDJSON
```

如果两边服务未启动，Node v371 必须 fail closed，记录为环境未满足，不得自动启动服务。

## 暂停条件

- 需要 Node 自动启动或停止 Java / mini-kv。
- 需要写上游、写订单、写 audit、执行 mini-kv 写命令。
- 需要 credential value、raw endpoint value 或 managed audit 真实连接。
- Java / mini-kv live 输出和 v370 消费的 fixture 证据出现字段冲突。

## 质量规则

- v371 只做 live-read gate，不顺手扩展新的治理链。
- 如果需要修 `shard-readiness.v1` 的 status / routingMode 枚举，先记录为契约兼容修正，不在 live-read 里混做大改。
- 每次验证仍按小批量执行，不一次性跑大测试。
