# Node v131 衍生计划：生产连接审查与归档闭环

来源版本：Node v131 `production readiness summary v11`。

v129-v131 已经把真实连接实现前的 precheck、dry-run change request、summary v11 做成闭环。下一阶段仍然只推进 Node，不启动 Java / mini-kv，目标是把 dry-run 变更单进入“可审批、可验证、可归档”的生产流程雏形。

## 执行规则

- Codex 只负责推进 Node 项目 `D:\nodeproj\orderops-node`。
- 每次推进 Node 前先读取最新 plan，并判断是否轮到 Node。
- Java / mini-kv 未明确授权时，只做只读检查，不构建、不启动、不测试、不修改。
- 每版仍需 `npm run typecheck`、`npm test`、`npm run build`、安全 HTTP smoke、本机 Chrome / Chromium 截图。
- 运行调试截图和解释继续写入 `b/<版本>/图片` 与 `b/<版本>/解释`。
- 代码讲解继续写入 `代码讲解记录_生产雏形阶段/`，讲解模式不变。
- `UPSTREAM_ACTIONS_ENABLED=false` 继续作为默认保护。

## 什么时候启动 Java / mini-kv

当前阶段不需要启动另外两个项目。

启动条件是计划里明确出现以下目标之一：

```text
Node live probes smoke
Java actuator / ops overview live read
mini-kv INFOJSON / STATSJSON live read
三项目 E2E 只读联调
```

在这些目标出现前，Node 继续用 fixture、contract、summary、dry-run evidence 推进。这样不会把 Java 和 mini-kv 的运行调试节奏打乱。

## 推荐执行顺序

```text
1. Node v132：production connection dry-run approval ledger
2. Node v133：production connection change request archive verification
3. Node v134：production readiness summary v12
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v132：production connection dry-run approval ledger

状态：已由 Node v132 完成。

目标：

```text
给 v130 dry-run change request 增加本地审批记录能力，但仍不执行真实连接。
```

本版要落地：

- 新增 dry-run approval ledger。
- 记录 reviewer、decision、reason、changeRequestDigest。
- 只允许 approve/reject dry-run 变更单，不触发真实连接。
- 输出 approval digest 和 markdown。

## Node v133：production connection change request archive verification

状态：已由 Node v133 完成。

目标：

```text
把 v129 precheck、v130 change request、v132 approval ledger 打包成可复核 archive verification。
```

本版要落地：

- 新增 archive verification profile。
- 校验 precheck profileVersion、changeRequestDigest、approval digest。
- 校验所有真实连接仍未执行。
- 输出可归档 verification report。

## Node v134：production readiness summary v12

目标：

```text
把 approval ledger 和 archive verification 接入新的生产就绪汇总。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v12`。
- 区分 approval ledger ready、archive verification ready、real production connections still missing。
- 继续保持 `readyForProductionOperations=false`。

## 后续方向

v132-v134 完成后，才适合进入下一段：

```text
Node v135-v137：只读 live probes 联调准备
```

那一段才可能需要启动 Java 和 mini-kv，并且也只会先做只读 smoke。

## 暂停条件

- 需要真实数据库账号、连接串、生产 audit service 凭据。
- 需要真实 IdP、JWKS URL、client secret 或生产登录配置。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v132-v134 继续补 Node 生产连接审查闭环；等这三版完成后，再考虑启动 Java / mini-kv 做只读 live 联调。
```
