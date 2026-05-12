# Node v80 衍生计划：verification 展示与归档收口

## 来源版本

```text
本计划由 Node v80 衍生。
Node v80 已新增 scenario matrix verification JSON / Markdown report，
可复核 matrixDigest、四个场景、source path、drift issueCount，以及 Java blocked / mini-kv read 语义。
```

## 计划边界

本计划继续只推进 Node 项目，不修改 Java / mini-kv。

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
Node v80：
- scenario matrix verification endpoint 已完成
- verification 已输出 JSON / Markdown
- 已复算 matrixDigest
- 已检查四个 scenario id 和 source path
- 已锁住 Java blocked replay 与 mini-kv read CHECKJSON 语义
- 仍不真实执行 Java replay POST
- 仍不执行 mini-kv 写命令
```

## 下一组版本

### Node v81：Dashboard scenario verification panel

目标：

```text
在 Dashboard 中新增只读 scenario verification 面板，
展示 verificationValid、matrixDigestValid、scenarioCountValid、
blockedReplaySemanticsStable、miniKvReadSemanticsStable。
```

本版要落地：

- Dashboard 展示 verification summary。
- Dashboard 提供 verification JSON / Markdown 链接或按钮。
- 页面加载时自动刷新 verification。
- 归档 Dashboard 截图和 smoke 证据。

本版不做：

- 不新增真实 execution endpoint
- 不调用 Java replay POST
- 不执行 mini-kv 写命令
- 不修改 Java / mini-kv

实施收口：

```text
Node v81 已完成：
- Dashboard 新增 Scenario Verification 只读面板
- 已展示 verificationValid、matrixDigestValid、scenarioCountValid
- 已展示 blockedReplaySemanticsStable 与 miniKvReadSemanticsStable
- 已展示 expected IDs、source paths、drift issueCount 检查
- 已提供 verification JSON / Markdown 链接和 Audit 按钮
- 已归档截图与 smoke 证据到 a/81/
- 已补充代码讲解记录 85-dashboard-scenario-verification-v81.md
```

### Node v82：Scenario verification archive bundle

目标：

```text
新增只读 archive bundle，
把 scenario matrix、scenario verification、关键 endpoints 和归档摘要固化成一个 release evidence bundle。
```

本版要落地：

- 新增 archive bundle service。
- 新增 JSON / Markdown endpoint。
- bundle 至少包含 matrix digest、verification valid、source path 列表、四个 scenario id、nextActions。
- 归档 archive bundle smoke 和截图。

本版不做：

- 不替代 v77 fixture archive snapshot
- 不做数据库持久化
- 不自动修复 fixture
- 不修改 Java / mini-kv

实施收口：

```text
Node v82 已完成：
- 已新增 scenario verification archive bundle JSON / Markdown endpoint
- 已固化 matrixDigest、verificationDigest、archiveBundleDigest
- 已固化四个 scenario id、source path、scenario evidence 与 evidence endpoints
- 已明确 readOnly=true、executionAllowed=false
- 已归档 archive bundle smoke 和截图到 a/82/
- 已补充代码讲解记录 86-scenario-verification-archive-bundle-v82.md
- 本计划 v81-v82 已收口，后续另起 v82-post-scenario-archive-bundle-roadmap.md
```

## 推荐执行顺序

```text
1. Node v81：Dashboard scenario verification panel，已完成
2. Node v82：Scenario verification archive bundle，已完成
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST
- 需要 Node 执行 mini-kv `SET` / `DEL` / `EXPIRE`
- 需要修改 Java / mini-kv 才能完成 Node 版本
- verification 与 scenario matrix 的 blocked/read 语义不一致
- 对推进版本有疑惑

## 一句话结论

```text
Node v81-v82 的主线是把 v80 verification 从接口能力推进到 Dashboard 可见、release evidence 可归档。
这个阶段仍然是只读证据链建设，不是真实执行。
```
