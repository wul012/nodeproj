# Node v84 衍生计划：archive verification 可视化与发布证据索引

## 来源版本

```text
本计划由 Node v84 衍生。
Node v84 已新增 scenario archive bundle verification report，
可复算 archiveBundleDigest、verificationDigest，并复核 readOnly、executionAllowed、source path 和 scenario evidence 数量。
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
Node v84：
- archive bundle verification JSON / Markdown endpoint 已完成
- 已复算 archiveBundleDigest 与 verificationDigest
- 已检查 readOnly=true、executionAllowed=false
- 已检查 sourcePathCount=4 与 scenarioEvidenceCount=4
- 仍不真实执行 Java replay POST
- 仍不执行 mini-kv 写命令
```

## 下一组版本

### Node v85：Dashboard scenario archive verification panel

目标：

```text
在 Dashboard 中新增只读 scenario archive verification 面板，
展示 verificationValid、archiveBundleDigestValid、verificationDigestValid、
sourcePathCountValid、readOnlyStillTrue、executionAllowedStillFalse。
```

本版要落地：

- Dashboard 展示 archive bundle verification summary。
- Dashboard 提供 archive bundle verification JSON / Markdown 链接或按钮。
- 页面加载时自动刷新 archive bundle verification。
- 归档 Dashboard 截图和 smoke 证据。

本版不做：

- 不新增真实 execution endpoint
- 不调用 Java replay POST
- 不执行 mini-kv 写命令
- 不修改 Java / mini-kv

### Node v86：Scenario release evidence index

目标：

```text
新增只读 release evidence index，
把 scenario matrix、verification、archive bundle、archive bundle verification 四类 evidence endpoint 和 digest 汇总到一个索引。
```

本版要落地：

- 新增 release evidence index service。
- 新增 JSON / Markdown endpoint。
- index 至少包含四类 evidence 的 endpoint、digest、valid 状态、readOnly/executionAllowed 边界摘要。
- 归档 index smoke 和截图。

本版不做：

- 不做数据库持久化
- 不自动修复 fixture
- 不修改 Java / mini-kv
- 不把 evidence index 当成真实执行许可

## 推荐执行顺序

```text
1. Node v85：Dashboard scenario archive verification panel
2. Node v86：Scenario release evidence index
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST
- 需要 Node 执行 mini-kv `SET` / `DEL` / `EXPIRE`
- 需要修改 Java / mini-kv 才能完成 Node 版本
- archive verification 与 archive bundle 的 digest 链路不一致
- 对推进版本有疑惑

## 一句话结论

```text
Node v85-v86 的主线是把 v84 archive verification 从接口能力推进到 Dashboard 可见，并形成统一 release evidence index。
这个阶段仍然是只读证据链建设，不是真实执行。
```
