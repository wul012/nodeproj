# Node v128 衍生计划：真实连接实现前置门槛

来源版本：Node v128 `production readiness summary v10`。

v126-v128 已经把生产连接配置合约、失败模式演练、production readiness summary v10 串成“连接前配置与失败模式已清楚，但真实生产连接仍阻塞”的状态。下一阶段继续靠近生产级，但仍不直接连接真实数据库或真实 IdP；先补实现前置门槛、操作员确认和 dry-run 变更单。

## 执行规则

- Codex 只负责推进 Node 项目 `D:\nodeproj\orderops-node`。
- 每次推进 Node 前先读取本计划，并只读检查 Java / mini-kv 是否有计划依赖。
- Java / mini-kv 未明确授权时，只做 `git status`、tag、关键文件和字段核对，不构建、不启动、不测试、不修改。
- 每版仍需 `npm run typecheck`、`npm test`、`npm run build`、安全 HTTP smoke、本机 Chrome / Chromium 截图。
- 运行调试截图和解释继续写入 `b/<版本>/图片` 与 `b/<版本>/解释`。
- 代码讲解继续写入 `代码讲解记录_生产雏形阶段/`，讲解模式不变。
- `UPSTREAM_ACTIONS_ENABLED=false` 继续作为默认生产阻塞保护。

## 推荐执行顺序

```text
1. Node v129：production connection implementation precheck
2. Node v130：production connection dry-run change request
3. Node v131：production readiness summary v11
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v129：production connection implementation precheck

目标：

```text
在真实连接实现前，增加实现前置门槛检查：配置、失败模式、回退、权限、禁止外部连接。
```

本版要落地：

- 新增 production connection implementation precheck。
- 汇总 v126 config contract、v127 failure-mode rehearsal、v128 summary v10。
- 明确真实连接仍未允许、仍不连接数据库、不 fetch JWKS。
- 输出实施前还缺的人工确认项。

## Node v130：production connection dry-run change request

目标：

```text
把未来真实连接实现拆成 dry-run 变更单，不执行真实连接，只生成可审查的 change request。
```

本版要落地：

- 新增 dry-run change request profile。
- 覆盖 audit adapter connection、IdP JWKS connection、rollback、owner approval。
- 变更单只读、不可执行、可归档。
- 继续保持 `UPSTREAM_ACTIONS_ENABLED=false`。

## Node v131：production readiness summary v11

目标：

```text
把 v129 precheck 与 v130 dry-run change request 接入新的生产就绪汇总。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v11`。
- 区分 `implementation precheck ready`、`dry-run change request ready`、`real production connections still missing`。
- 继续保持 `readyForProductionOperations=false`。

## 暂停条件

- 需要真实数据库账号、连接串、生产 audit service 凭据。
- 需要真实 IdP、JWKS URL、client secret 或生产登录配置。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v129-v131 的主线是把“真实连接前 readiness 已清楚”继续推进到“真实连接实现前置门槛与 dry-run 变更单已清楚”，仍不做真实外部连接。
```
