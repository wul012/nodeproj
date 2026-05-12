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
Node v71：
- approval evidence 已收集 Java execution-contract 与 mini-kv CHECKJSON
- verification 已校验 Java contractDigest/version 与 mini-kv read_only/execution_allowed/side_effect_count
- execution gate preview 已把 execution-contract 证据纳入 required upstream evidence
- 仍不执行 Java replay POST 或 mini-kv 写命令
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

本版不做：

- 不自动修复 mismatch
- 不绕过 reviewer decision
- 不把 warning 降级成通过

### Java v43 + mini-kv v52：可并行独立推进

Java v43 目标：

```text
为 replay-execution-contract 增加 contract test fixture / 示例响应导出，方便 Node smoke 使用稳定样本。
```

mini-kv v52 目标：

```text
为 CHECKJSON 增加稳定 fixture / contract sample，方便 Node smoke 使用真实格式样本。
```

这两个版本可以一起推进，互不依赖；完成后 Node 再接 fixture-driven smoke。

## 推荐执行顺序

```text
1. Node v72：execution contract evidence archive bundle，已完成
2. Node v73：execution contract mismatch diagnostics
3. Java v43 + mini-kv v52：可以一起推进，只做 fixture / sample 增强
4. Node v74：接入 fixture-driven smoke，减少 mock 样本漂移
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST
- 需要 Node 执行 mini-kv 写命令
- 需要单个版本同时大改 Java、Node、mini-kv 三个项目
- Java / mini-kv fixture 字段语义和 Node verification 无法对齐
- 对推进版本有疑惑

## 一句话结论

```text
v72-v74 的主线是把 v71 的 execution-contract 证据变成可归档、可诊断、可用稳定 fixture 复现的执行前证据链，仍然不进入真实执行。
```
