# Node v75 衍生计划：fixture 可视化、归档与多场景矩阵

## 来源版本

```text
本计划由 Node v75 衍生。
Node v75 已完成 fixture drift diagnostics，可以定位 Java / mini-kv fixture 的字段、类型、digest 和 diagnostics 映射漂移。
```

## 计划边界

本计划接在 `v71-post-execution-contract-roadmap.md` 之后。v71 计划已经在 Node v75 收口，后续版本不再写回旧计划文件。

本计划只推进 fixture 证据的展示、归档和多场景矩阵，不进入真实上游执行。

继续保持：

```text
UPSTREAM_ACTIONS_ENABLED 默认 false
不调用 Java replay POST
不执行 mini-kv SET / DEL / EXPIRE
不让 Dashboard 状态绕过 reviewer decision
```

## 当前状态

```text
Node v75：
- upstream-contract fixture report 已可读取 Java v43 replay-execution-contract sample
- upstream-contract fixture report 已可读取 mini-kv v52 CHECKJSON fixture
- fixture drift diagnostics 已可输出 issue code、field、expected、actual、digest drift
- HTTP smoke 已使用稳定 fixture 样本验证只读证据链
- 仍不真实执行 Java replay POST
- 仍不真实执行 mini-kv 写命令
```

## 下一组版本

### Node v76：Dashboard fixture diagnostics panel

目标：

```text
在 Dashboard 中新增只读 fixture / drift diagnostics 面板，
展示 Java v43 sample、mini-kv v52 fixture、fixture report valid、drift issue count、
关键 digest、read_only、execution_allowed 和 Markdown 链接。
```

本版要落地：

- 展示 fixture report 的 `valid`、`digest`、Java fixture status、mini-kv fixture status。
- 展示 Java execution-contract 的 `contractDigest`、`replayPreconditionsSatisfied`、`executionChecks` 摘要。
- 展示 mini-kv CHECKJSON 的 `commandDigest`、`read_only`、`execution_allowed`、`side_effect_count` 摘要。
- 展示 drift diagnostics 的 `issueCount`、`missingMappingCount`、`hasDrift`。
- 给出 JSON / Markdown endpoint 链接或可复制路径，方便归档引用。

本版不做：

- 不新增真实 execution endpoint
- 不调用 Java replay POST
- 不执行 mini-kv `SET` / `DEL` / `EXPIRE`
- 不修改 Java / mini-kv
- 不把 Dashboard 面板做成审批入口

实施收口：

```text
已完成。Node v76 已在 Dashboard 中新增只读 fixture diagnostics panel，
展示 fixture report valid / digest、Java contractDigest / preconditions / checks、
mini-kv commandDigest / read_only / execution_allowed / side_effect_count，
以及 drift issueCount / missingMappingCount。
本版只复用现有 fixture report 与 drift diagnostics 接口，不新增真实执行入口。
```

### Node v77：Fixture evidence archive snapshot

目标：

```text
把 fixture report 与 drift diagnostics 组合成一个只读 archive snapshot，
生成 fixtureArchiveDigest、fixtureReportDigest、driftDigest、source path 摘要和 Markdown 输出，
用于证明当前 Node smoke 使用的是哪一版上游 fixture 证据。
```

本版要落地：

- 输出 JSON snapshot。
- 输出 Markdown snapshot。
- snapshot 至少包含 `fixtureArchiveDigest`、`fixtureReportDigest`、`driftDigest`、source file paths、关键字段摘要。
- 归档时继续引用实际代码路径和 endpoint，不只写结论。

本版不做：

- 不做数据库持久化
- 不替代 execution gate archive
- 不把 fixture archive 当成真实执行许可
- 不自动修复 fixture drift
- 不修改 Java / mini-kv

实施收口：

```text
已完成。Node v77 已新增 fixture evidence archive snapshot，
输出 JSON / Markdown，包含 fixtureArchiveDigest、fixtureReportDigest、driftDigest、
source file paths、Java / mini-kv 关键字段摘要和 evidence endpoint 列表。
本版不做数据库持久化，不替代 execution gate archive，也不把 fixture archive 当成真实执行许可。
```

### Java v44 + mini-kv v53：可以一起推进

Java v44 目标：

```text
新增一个 replay-execution-contract blocked sample，
覆盖 replayPreconditionsSatisfied=false、blockedBy 非空、executionChecks failed、
expectedSideEffects 为空或明确受限。
```

mini-kv v53 目标：

```text
新增一个 CHECKJSON read-command sample，例如 GET orderops:1，
覆盖 read_only=true、execution_allowed=false、side_effects=[]、side_effect_count=0。
```

这两个版本可以一起推进，因为它们只新增各自项目内的 fixture / sample，不要求 Node 同时修改，也不互相依赖。完成后再交给 Node v78 汇总成多场景矩阵。

### Node v78：Fixture scenario matrix

目标：

```text
在 Java v44 + mini-kv v53 完成后，Node 读取多个 fixture sample，
输出 approved replay、blocked replay、mini-kv write CHECKJSON、mini-kv read CHECKJSON 的 scenario matrix，
标明每个场景是否满足 Node diagnostics 所需字段。
```

本版要落地：

- 输出 JSON scenario matrix。
- 输出 Markdown scenario matrix。
- 覆盖 Java approved contract、Java blocked contract、mini-kv write CHECKJSON、mini-kv read CHECKJSON。
- blocked / negative sample 作为诊断样本展示，不作为失败测试处理。

本版不做：

- 不真实执行 Java replay POST
- 不真实执行 mini-kv 写命令
- 不自动修复 fixture
- 不引入 Java / mini-kv 运行时强依赖
- 不开启 `UPSTREAM_ACTIONS_ENABLED` 默认值

## 推荐执行顺序

```text
1. Node v76：Dashboard fixture diagnostics panel，已完成
2. Node v77：Fixture evidence archive snapshot，已完成
3. Java v44 + mini-kv v53：可以一起推进，分别新增 blocked replay sample 和 read-command CHECKJSON sample
4. Node v78：Fixture scenario matrix
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST
- 需要 Node 执行 mini-kv `SET` / `DEL` / `EXPIRE`
- 需要单个版本同时大改 Java、Node、mini-kv 三个项目
- Java / mini-kv fixture 字段语义和 Node verification 无法对齐
- 对推进版本有疑惑

## 一句话结论

```text
Node v76-v78 的主线是把 v75 的 fixture drift diagnostics 继续推进为 Dashboard 可视化、只读归档快照和多场景 fixture 矩阵。
这个阶段仍是观察与证据链建设，不是进入真实上游执行。
```
