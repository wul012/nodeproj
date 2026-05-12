# Node v65 衍生计划：Upstream evidence handoff roadmap

## 来源版本

```text
本计划由 Node v65 衍生。
Node v65 已把 Java v40 approval-status 与 mini-kv v49 side_effects 接入 approval evidence report。
```

## 通用规则

每次推进 Node 自己版本前，先读取 `docs/plans/` 最新计划，并按当前计划执行。

每个 Node 版本继续保持：

```text
typecheck
test
build
Node HTTP smoke
能截图则截图
a/<版本>/ 归档
代码讲解记录
清理 dist/tmp
commit + tag + push
```

如下一版不是 Node 负责，则忽略“推进”消息并停止，不跨项目乱改。

## 当前状态

```text
Node v65：
- approval evidence report 已包含 Java approval-status 只读证据
- approval evidence report 已包含 mini-kv EXPLAINJSON side_effects
- verification 会校验 upstreamEvidence 与 summary 一致
- 仍不做真实 replay / approval POST / mini-kv 写执行

Java v40：
- 提供 failed-event approval-status 只读接口

mini-kv v49：
- EXPLAINJSON 提供 side_effects 覆盖
```

## 下一组版本

### Node v66：Approval evidence handoff bundle

目标：

```text
把 request、decision、evidence report、verification、上游证据摘要打包成一个 handoff bundle，
便于版本归档、交付复核和后续 promotion readiness 读取。
```

建议 endpoint：

```text
GET /api/v1/operation-approval-requests/:requestId/evidence-bundle
GET /api/v1/operation-approval-requests/:requestId/evidence-bundle?format=markdown
```

本版不做：

- 不新增真实执行入口
- 不把 bundle 写入数据库
- 不修改 Java / mini-kv

### Java v41 + mini-kv v50：可并行独立推进

Java v41 目标：

```text
在 failed-event approval-status 只读响应中增加 evidenceVersion / approvalDigest / replayEligibilityDigest。
```

Java v41 不做：

- 不执行 replay
- 不接 Node 回调
- 不引入 mini-kv

mini-kv v50 目标：

```text
在 EXPLAINJSON 响应中增加 schema_version / command_digest / side_effect_count。
```

mini-kv v50 不做：

- 不新增事务
- 不新增集群
- 不承担订单权威存储

### Node v67：Digest-aware upstream evidence verification

目标：

```text
在 Java v41 + mini-kv v50 完成后，Node v67 接入上游 digest/schema 字段，
把 Java approvalDigest、mini-kv command_digest、side_effect_count 纳入 evidence verification。
```

本版不做：

- 不要求 Java 与 mini-kv 同步发布
- 不新增真实写执行
- 不把 digest mismatch 自动修复成通过

### Node v68：Approval execution gate preview

目标：

```text
设计真实执行前最后一道 gate preview：
展示当前 request/decision/evidence-bundle 是否满足执行条件，但仍只返回 preview，不执行上游写动作。
```

本版不做：

- 不调用 Java replay POST
- 不执行 mini-kv SET/DEL/EXPIRE
- 不绕过 reviewer decision

## 推荐执行顺序

```text
1. Node v66：approval evidence handoff bundle，可直接推进
2. Java v41 + mini-kv v50：可并行独立推进
   - Java v41：approval-status 增加 evidenceVersion / approvalDigest / replayEligibilityDigest
   - mini-kv v50：EXPLAINJSON 增加 schema_version / command_digest / side_effect_count
3. Node v67：等 Java v41 与 mini-kv v50 都完成后，统一接入 digest/schema 证据
4. Node v68：在 v66/v67 证据链稳定后，做 execution gate preview，仍不真实执行
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay / approval 的 POST 接口
- 需要 Node 执行 mini-kv 写命令
- 需要单个版本同时大改 Java、Node、mini-kv 三个项目
- Java v41 或 mini-kv v50 字段语义和 Node evidence verification 无法对齐
- 对推进版本有疑惑

## 一句话结论

```text
v66-v68 的主线是把 v65 的“可读证据”升级成“可交付、可校验、可作为执行前 gate 的证据链”，仍然不进入真实执行。
```
