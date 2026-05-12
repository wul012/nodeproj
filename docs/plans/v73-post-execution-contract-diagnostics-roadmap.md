# Node v73 衍生计划：diagnostics 后续路线

## 来源版本

```text
本计划由 Node v73 衍生。
Node v73 已为 execution-contract archive bundle 增加 mismatch diagnostics。
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
Node v73：
- execution-contract archive bundle 已可生成
- mismatch diagnostics 已能定位 archive / gate / Java contract / mini-kv CHECKJSON 不一致
- 仍不执行 Java replay POST
- 仍不执行 mini-kv 写命令
```

## 下一组版本

### Java v43 + mini-kv v52：可以一起推进

Java v43 目标：

```text
为 replay-execution-contract 增加稳定 fixture / sample response。
样本字段要覆盖 contractVersion、contractDigest、approvalDigest、replayEligibilityDigest、
replayPreconditionsSatisfied、digestVerificationMode、expectedSideEffects。
```

mini-kv v52 目标：

```text
为 CHECKJSON 增加稳定 fixture / sample response。
样本字段要覆盖 schema_version、command_digest、read_only、execution_allowed、
side_effects、side_effect_count、wal.durability。
```

这两个版本可以一起推进，因为它们只产出各自项目的 fixture/sample，不互相依赖，也不要求 Node 同时修改。

### Node v74：Fixture-driven smoke

目标：

```text
在 Java v43 + mini-kv v52 完成后，Node smoke 改为读取稳定 fixture/sample，
减少 mock 样本和真实上游 contract 格式漂移。
```

本版不做：

- 不真实执行 Java replay POST
- 不真实执行 mini-kv 写命令
- 不把 fixture 当成生产数据

### Node v75：Fixture drift diagnostics

目标：

```text
对比 Node fixture-driven smoke 使用的样本字段和 diagnostics 需要的字段，
输出缺字段/字段类型漂移报告，避免后续接入真实样本时静默失配。
```

本版不做：

- 不要求 Java / mini-kv 同步发版
- 不阻断已有只读观察台
- 不自动修复 fixture

## 推荐执行顺序

```text
1. Java v43 + mini-kv v52：可以一起推进，产出稳定 fixture/sample
2. Node v74：接入 fixture-driven smoke
3. Node v75：增加 fixture drift diagnostics
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST
- 需要 Node 执行 mini-kv SET / DEL / EXPIRE
- Java / mini-kv fixture 字段语义和 Node diagnostics 无法对齐
- 需要单个版本同时大改 Java、Node、mini-kv 三个项目
- 对推进版本有疑惑

## 一句话结论

```text
v74-v75 的重点不是继续堆执行链路，而是把 Java / mini-kv 的真实 contract 样本稳定下来，
让 Node 的 smoke 和 diagnostics 更接近真实三项目联调。
```
