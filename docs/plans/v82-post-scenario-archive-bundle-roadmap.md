# Node v82 衍生计划：archive bundle 展示与复核

## 来源版本

```text
本计划由 Node v82 衍生。
Node v82 已新增 scenario verification archive bundle，
把 scenario matrix、scenario verification、source paths、digests 和 evidence endpoints 固化成只读 release evidence bundle。
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
Node v82：
- archive bundle JSON / Markdown endpoint 已完成
- bundle 已包含 matrixDigest、verificationDigest、archiveBundleDigest
- bundle 已包含四个 scenario id 和四个 source path
- bundle 明确 readOnly=true、executionAllowed=false
- 仍不真实执行 Java replay POST
- 仍不执行 mini-kv 写命令
```

## 下一组版本

### Node v83：Dashboard scenario archive bundle panel

目标：

```text
在 Dashboard 中新增只读 scenario archive bundle 面板，
展示 bundleValid、archiveBundleDigest、verificationDigest、sourcePathCount、readOnly/executionAllowed。
```

本版要落地：

- Dashboard 展示 archive bundle summary。
- Dashboard 提供 archive bundle JSON / Markdown 链接或按钮。
- 页面加载时自动刷新 archive bundle。
- 归档 Dashboard 截图和 smoke 证据。

本版不做：

- 不新增真实 execution endpoint
- 不调用 Java replay POST
- 不执行 mini-kv 写命令
- 不修改 Java / mini-kv

### Node v84：Scenario archive bundle verification report

目标：

```text
新增 scenario archive bundle verification report，
复算 archiveBundleDigest，检查 bundle 中的 matrixDigest、verificationDigest、source path 数量、readOnly 和 executionAllowed。
```

本版要落地：

- 新增 archive bundle verification service。
- 新增 JSON / Markdown endpoint。
- verification 至少检查 archiveBundleDigest 可重算、bundle readOnly=true、executionAllowed=false、四个 source path 齐全。
- 归档 verification smoke 和截图。

本版不做：

- 不做数据库持久化
- 不自动修复 fixture
- 不修改 Java / mini-kv
- 不把 bundle verification 当成真实执行许可

## 推荐执行顺序

```text
1. Node v83：Dashboard scenario archive bundle panel
2. Node v84：Scenario archive bundle verification report
```

## 暂停条件

遇到以下情况暂停并让用户确认：

- 需要 Node 调用 Java replay POST
- 需要 Node 执行 mini-kv `SET` / `DEL` / `EXPIRE`
- 需要修改 Java / mini-kv 才能完成 Node 版本
- archive bundle 与 scenario matrix / verification 的 digest 链路不一致
- 对推进版本有疑惑

## 一句话结论

```text
Node v83-v84 的主线是把 v82 archive bundle 从接口能力推进到 Dashboard 可见，并补上 archive bundle 自身复核。
这个阶段仍然是只读证据链建设，不是真实执行。
```
