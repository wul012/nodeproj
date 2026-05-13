# Node v134 衍生计划：只读 live probe 准备阶段

来源版本：Node v134 `production readiness summary v12`。

v132-v134 已经把 production connection dry-run approval ledger、archive verification、readiness summary v12 做成闭环。下一阶段开始为只读 live probe 做准备，但仍然默认不启动 Java / mini-kv；只有计划明确要求 live read smoke 时才启动或请用户启动。

## 执行规则

- Codex 只负责推进 Node 项目 `D:\nodeproj\orderops-node`。
- 每次推进 Node 前先读取最新 plan，并判断是否轮到 Node。
- Java / mini-kv 未明确授权时，只做只读检查，不构建、不启动、不测试、不修改。
- 每版仍需 `npm run typecheck`、`npm test`、`npm run build`、安全 HTTP smoke、本机 Chrome / Chromium 截图。
- 运行调试截图和解释继续写入 `b/<版本>/图片` 与 `b/<版本>/解释`。
- 代码讲解继续写入 `代码讲解记录_生产雏形阶段/`，讲解模式不变。
- `UPSTREAM_ACTIONS_ENABLED=false` 继续作为默认保护。

## 什么时候启动 Java / mini-kv

v135 不需要启动另外两个项目。

v136 或 v137 如果要做真实只读 live smoke，可以启动 Java / mini-kv；启动前应明确：

```text
只读探测
不执行 Java replay POST
不执行 mini-kv 写命令
不打开 UPSTREAM_ACTIONS_ENABLED=true
```

如果用户没有启动另外两个项目，Node 应该 graceful skipped，而不是失败或强制启动它们。

## 推荐执行顺序

```text
1. Node v135：live probe readiness contract
2. Node v136：read-only live probe smoke harness
3. Node v137：production readiness summary v13
```

这三版都属于 Node。v136-v137 可能需要用户配合启动 Java / mini-kv 做只读 smoke；未启动时必须输出 skipped evidence。

## Node v135：live probe readiness contract

目标：

```text
定义 Java / mini-kv live read-only probe 的前置契约，但不实际启动或探测上游。
```

本版要落地：

- 新增 live probe readiness contract。
- 明确 Java 只读目标：health / ops overview。
- 明确 mini-kv 只读目标：HEALTH / INFOJSON / STATSJSON。
- 输出 skipped / ready / blocked 状态定义。

## Node v136：read-only live probe smoke harness

目标：

```text
新增只读 live probe smoke harness，能在上游未启动时 graceful skipped。
```

本版要落地：

- 新增 harness profile。
- 若 Java / mini-kv 未启动，输出 skipped evidence。
- 若用户已启动，执行只读 GET / TCP read-only probe。
- 不执行任何写操作。

## Node v137：production readiness summary v13

目标：

```text
把 live probe readiness contract 和 smoke harness 接入新的生产就绪汇总。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v13`。
- 区分 live probe contract ready、live probe smoke skipped/pass、real production connections still missing。
- 继续保持 `readyForProductionOperations=false`。

## 暂停条件

- 需要真实数据库账号、连接串、生产 audit service 凭据。
- 需要真实 IdP、JWKS URL、client secret 或生产登录配置。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要强制启动或停止 Java / mini-kv，且用户未明确同意。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v135-v137 从 dry-run 证据链转向只读 live probe 准备；真正启动 Java / mini-kv 只在 v136-v137 的只读 smoke 需要时进行，并且先征求或确认用户配合。
```
