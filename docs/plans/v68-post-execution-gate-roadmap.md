# Node v68 衍生计划：execution gate 后续小版本路线

## 来源版本

```text
本计划由 Node v68 衍生。
Node v68 已把 approval handoff bundle 推进为 execution gate preview，但仍不真实执行 Java 或 mini-kv 写动作。
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
Node v68：
- request / decision / evidence / verification / handoff bundle 已能进入 execution gate preview
- execution gate preview 会判断是否 blocked / review-required / ready
- executionAllowed 固定为 false
- Java 与 mini-kv 仍不会被 Node 真实写入
```

## 下一组版本

### Node v69：Execution gate preview archive record

目标：

```text
把 execution gate preview 固化成本地 archive record，记录 gateDigest、bundleDigest、reviewer note、createdAt，
用于证明“执行前门禁预览被归档过”，但仍不执行上游动作。
```

本版不做：

- 不调用 Java replay POST
- 不执行 mini-kv 写命令
- 不把 archive record 持久化到数据库

Node v69 实施收口：

```text
已按本节新增本地 execution gate archive record：
记录 gateDigest、bundleDigest、reviewer note、createdAt、archiveDigest 和 preview 快照。
本版仍只写 Node 内存 ledger，不调用 Java replay POST，不执行 mini-kv 写命令，不持久化数据库。
```

### Node v70：Execution gate archive verification

目标：

```text
复核 v69 archive record 的 gateDigest / bundleDigest / requestId / decisionId 是否仍然一致，
输出 JSON 与 Markdown verification。
```

本版不做：

- 不新增真实 execution endpoint
- 不修改 Java / mini-kv
- 不把 verification mismatch 自动修复为通过

### Java v42 + mini-kv v51：可并行独立推进

Java v42 目标：

```text
为 failed-event replay 提供只读 execution-contract 响应，明确真实 replay 前 Java 侧会检查哪些 approval/status/digest 条件。
```

mini-kv v51 目标：

```text
为写命令提供只读 execution-contract 或 CHECKJSON 响应，明确真实写入前 parser、side_effects、command_digest、WAL 相关检查。
```

这两个版本可以一起推进，互不依赖；完成后再由 Node 后续版本统一接入。

## 推荐执行顺序

```text
1. Node v69：execution gate preview archive record，已完成
2. Node v70：execution gate archive verification
3. Java v42 + mini-kv v51：可以一起推进，只做只读 execution-contract / CHECKJSON 增强
4. Node v71：根据 Java v42 + mini-kv v51 的完成情况接入 execution-contract 证据
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay / approval 的 POST 接口
- 需要 Node 执行 mini-kv 写命令
- 需要单个版本同时大改 Java、Node、mini-kv 三个项目
- Java v42 或 mini-kv v51 字段语义和 Node gate verification 无法对齐
- 对推进版本有疑惑

## 一句话结论

```text
v69-v71 的主线是把 v68 的“执行门禁预览”升级成“可归档、可复核、可接上游 execution-contract 的执行前证据链”，仍然不进入真实执行。
```
