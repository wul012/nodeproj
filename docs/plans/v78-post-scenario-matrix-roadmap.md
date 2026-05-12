# Node v78 衍生计划：scenario matrix 展示与验证

## 来源版本

```text
本计划由 Node v78 衍生。
Node v78 已把 Java approved / blocked execution-contract 与 mini-kv write / read CHECKJSON 统一成 fixture scenario matrix。
```

## 计划边界

本计划接在 `v75-post-fixture-diagnostics-roadmap.md` 之后。v75 计划已经在 Node v78 收口，后续版本不再写回旧计划文件。

本计划只推进 Node 对 scenario matrix 的展示、归档验证和可读证据增强，不进入真实上游执行。

继续保持：

```text
Codex 只负责 Node 项目
Java / mini-kv 只做只读完成度核对
UPSTREAM_ACTIONS_ENABLED 默认 false
不调用 Java replay POST
不执行 mini-kv SET / DEL / EXPIRE
```

## 当前状态

```text
Node v78：
- scenario matrix 已覆盖 4 个场景
- blocked sample 已作为有效诊断样本处理
- mini-kv read sample 已保留 side_effects=["store_read"] 和 side_effect_count=1
- matrix 已输出 JSON / Markdown / matrixDigest / drift summary
- 仍不真实执行 Java replay POST
- 仍不执行 mini-kv 写命令
```

## 下一组版本

### Node v79：Dashboard scenario matrix panel

目标：

```text
在 Dashboard 中新增只读 scenario matrix 面板，
展示 totalScenarios、validScenarios、issueCount、matrixDigest，
以及四个场景的 valid / diagnosticReady / failingCheckCount。
```

本版要落地：

- Dashboard 只读展示 matrix 汇总。
- Dashboard 展示 `java-approved-replay-contract`、`java-blocked-replay-contract`、`mini-kv-write-checkjson`、`mini-kv-read-checkjson` 四个场景状态。
- 提供 scenario matrix JSON / Markdown 链接。
- 归档截图。

本版不做：

- 不新增真实 execution endpoint
- 不调用 Java replay POST
- 不执行 mini-kv 写命令
- 不修改 Java / mini-kv
- 不把 matrix valid 状态当成真实执行许可

实施收口：

```text
Node v79 已完成：
- Dashboard 新增 Scenario Matrix 只读面板
- 已展示 totalScenarios、validScenarios、diagnosticReadyScenarios、issueCount、matrixDigest
- 已展示 Java approved / blocked 与 mini-kv write / read 四个场景状态
- 已提供 scenario matrix JSON / Markdown 链接和 Audit 按钮
- 已归档截图与 smoke 证据到 a/79/
- 已补充代码讲解记录 83-dashboard-scenario-matrix-v79.md
```

### Node v80：Scenario matrix verification report

目标：

```text
新增 scenario matrix verification report，
校验 matrixDigest、场景数量、关键 source path、关键字段和 drift issueCount，
输出 JSON / Markdown verification。
```

本版要落地：

- 新增 verification service。
- 新增 JSON / Markdown endpoint。
- verification 至少检查 matrix digest 可重算、四个 scenario id 齐全、blocked/read 场景语义没有漂移。
- 归档 verification smoke 和截图。

本版不做：

- 不替代 v77 fixture archive snapshot。
- 不做数据库持久化。
- 不自动修复 fixture。
- 不修改 Java / mini-kv。

## 推荐执行顺序

```text
1. Node v79：Dashboard scenario matrix panel，已完成
2. Node v80：Scenario matrix verification report
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST
- 需要 Node 执行 mini-kv `SET` / `DEL` / `EXPIRE`
- 需要修改 Java / mini-kv 才能完成 Node 版本
- scenario matrix 中 blocked/read 样本语义和计划不一致
- 对推进版本有疑惑

## 一句话结论

```text
Node v79-v80 的主线是把 v78 的 scenario matrix 从接口能力推进到 Dashboard 可视化和可复核 verification。
这个阶段仍是只读证据链建设，不是真实执行。
```
