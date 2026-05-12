# Node v71 衍生计划：execution-contract 接入后路线

## 来源版本

```text
本计划由 Node v71 衍生。
Node v71 已接入 Java v42 replay-execution-contract 与 mini-kv v51 CHECKJSON 只读执行契约证据。
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
- approval evidence 已收集 Java execution-contract 与 mini-kv CHECKJSON
- execution-contract archive bundle 已可生成
- mismatch diagnostics 已能定位 archive / gate / Java contract / mini-kv CHECKJSON 不一致
- 仍不执行 Java replay POST
- 仍不执行 mini-kv 写命令
```

## 下一组版本

### Node v72：Execution contract evidence archive bundle

目标：

```text
把 v71 execution-contract 证据单独整理成 archive bundle，
突出 Java contractDigest、mini-kv CHECKJSON contract、gate digest、archive verification digest 的引用关系。
```

实施收口：

```text
已完成。Node v72 新增 execution-contract archive bundle endpoint，
从 execution gate archive record 与 archive verification 生成独立 bundle，
串联 archiveDigest、gateDigest、handoffBundleDigest、archiveVerificationDigest、
Java contractDigest 与 mini-kv CHECKJSON contract snapshot。
本版仍不新增真实 execution endpoint，不调用 Java replay POST，不执行 mini-kv 写命令。
```

本版不做：

- 不新增真实 execution endpoint
- 不调用 Java replay POST
- 不执行 mini-kv 写命令
- 不修改 Java / mini-kv

### Node v73：Execution contract mismatch diagnostics

目标：

```text
当 Java contractDigest、mini-kv CHECKJSON contract、gate preview、archive verification 任意一环不一致时，
输出更清晰的 mismatch diagnostics，方便定位是哪一类证据不匹配。
```

实施收口：

```text
已完成。Node v73 新增 execution-contract diagnostics endpoint，
可输出 archiveDigest、gateDigest、handoff bundle、archive verification、
Java execution-contract 与 mini-kv CHECKJSON contract 的 mismatch code、字段、expected/actual 和说明。
本版仍不自动修复 mismatch，不绕过 reviewer decision，不把 warning 降级成通过。
```

本版不做：

- 不自动修复 mismatch
- 不绕过 reviewer decision
- 不把 warning 降级成通过

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
1. Node v72：execution contract evidence archive bundle，已完成
2. Node v73：execution contract mismatch diagnostics，已完成
3. Java v43 + mini-kv v52：可以一起推进，产出稳定 fixture/sample
4. Node v74：接入 fixture-driven smoke
5. Node v75：增加 fixture drift diagnostics
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST
- 需要 Node 执行 mini-kv SET / DEL / EXPIRE
- 需要单个版本同时大改 Java、Node、mini-kv 三个项目
- Java / mini-kv fixture 字段语义和 Node verification 无法对齐
- 对推进版本有疑惑

## 一句话结论

```text
v72-v75 的主线是把 v71 的 execution-contract 证据变成可归档、可诊断、可用稳定 fixture 复现的执行前证据链，仍然不进入真实执行。
```
