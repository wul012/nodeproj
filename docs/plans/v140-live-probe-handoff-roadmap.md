# Node v140 衍生计划：live probe handoff 与真实只读 smoke 准备

来源版本：Node v140 `production live probe evidence archive bundle`。

v138-v140 已完成 live probe evidence archive record、archive verification、archive bundle。本阶段下一步不急着新增 summary，也不默认启动 Java / mini-kv，而是把“如何从 skipped evidence 过渡到真实只读 live smoke”写清楚。

## 执行规则

- Codex 只负责推进 Node 项目 `D:\nodeproj\orderops-node`。
- 每次推进 Node 前先读取最新 plan，并判断是否轮到 Node。
- Java / mini-kv 未明确授权时，只做只读状态核对，不构建、不启动、不测试、不修改。
- 每版仍需 `npm run typecheck`、`npm test`、`npm run build`、安全 HTTP smoke、本机 Chrome / Chromium 截图。
- 运行调试截图和解释继续写入 `b/<版本>/图片` 与 `b/<版本>/解释`。
- 代码讲解继续写入 `代码讲解记录_生产雏形阶段/`，讲解模式不变。
- 不新增 production readiness summary，除非一个更大的阶段完成并需要真正总汇总。
- `UPSTREAM_ACTIONS_ENABLED=false` 继续作为默认保护。

## 什么时候启动 Java / mini-kv

默认不启动 Java / mini-kv。

只有用户明确说“现在可以做真实只读 live smoke”时，才进入真实只读探测窗口。

允许：

```text
Java GET /actuator/health
Java GET /api/v1/ops/overview
mini-kv HEALTH
mini-kv INFOJSON
mini-kv STATSJSON
```

禁止：

```text
Java replay POST
Java order mutation POST
mini-kv SET / DEL / EXPIRE / FLUSH
UPSTREAM_ACTIONS_ENABLED=true
```

## 推荐执行顺序

```text
1. Node v141：live probe operator handoff checklist
2. Node v142：live probe real-read smoke readiness switch
3. Node v143：live probe real-read smoke archive adapter
```

这三版仍然是 Node。v142-v143 如果没有用户启动 Java / mini-kv，必须继续输出 skipped evidence，而不是失败。

## Node v141：live probe operator handoff checklist

目标：

```text
把 v138-v140 的 archive record、verification、bundle 变成操作员可读的 handoff checklist。
```

本版要落地：

- 新增 `/api/v1/production/live-probe-handoff-checklist`。
- 汇总当前 bundle digest、skipped evidence 状态、真实只读 smoke 前置条件。
- 明确哪些步骤需要用户手动启动 Java / mini-kv。
- 不新增 summary。

## Node v142：live probe real-read smoke readiness switch

目标：

```text
增加真实只读 smoke 的显式 readiness switch，默认关闭。
```

本版要落地：

- 新增只读配置/状态报告，说明何时允许 `UPSTREAM_PROBES_ENABLED=true`。
- 要求 Java / mini-kv 均由用户明确启动。
- 若未启动，继续 skipped evidence。
- 不执行任何写动作。

## Node v143：live probe real-read smoke archive adapter

目标：

```text
为真实只读 live smoke 的 pass/skipped 结果准备 archive adapter。
```

本版要落地：

- 复用现有 smoke harness。
- 当真实只读 smoke 运行后，把 pass/skipped 结果接入 archive adapter。
- 不新增 summary。
- 若仍是 skipped evidence，必须继续声明不是 production pass。

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
v141-v143 继续做 Node 侧 handoff、开关和 archive adapter，先把真实只读 smoke 的操作边界准备好；summary 暂缓，等更大阶段收口再做。
```
