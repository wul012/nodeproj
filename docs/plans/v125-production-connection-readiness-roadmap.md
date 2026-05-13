# Node v125 衍生计划：真实生产连接准备

来源版本：Node v125 `production readiness summary v9`。

v123-v125 已经把 audit runner、JWKS cache contract、production readiness summary v9 串成“候选层通过、真实生产连接仍缺失”的清晰状态。下一阶段继续靠近生产级，但仍不直接索要真实数据库或真实 IdP 凭据；先把真实连接需要的配置、目标选择、失败保护和回退说明补齐。

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
1. Node v126：production connection config contract
2. Node v127：production connection failure-mode rehearsal
3. Node v128：production readiness summary v10
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v126：production connection config contract

状态：已由 Node v126 落地为 `/api/v1/production/connection-config-contract`。

目标：

```text
把真实 managed audit adapter 与真实 IdP verifier 需要的配置项、target kind、禁用状态和缺失项统一成配置合约。
```

本版要落地：

- 新增 production connection config contract profile。
- 明确 audit target kind、IdP target kind、必需 env、缺失 env、默认 disabled 状态。
- 不连接真实数据库，不 fetch 真实 JWKS。
- 继续保持 `realManagedAdapterConnected=false`、`realIdpVerifierConnected=false`。

## Node v127：production connection failure-mode rehearsal

目标：

```text
在不连接真实外部系统的前提下，演练连接失败、超时、凭据缺失、回退到安全阻塞的状态表达。
```

本版要落地：

- 新增 production connection failure-mode rehearsal。
- 覆盖 audit connection missing、IdP JWKS timeout simulated、credentials missing、safe fallback。
- 不访问外部网络，不写真实 audit 存储。
- 继续保持 `UPSTREAM_ACTIONS_ENABLED=false`。

## Node v128：production readiness summary v10

目标：

```text
把 v126 config contract 与 v127 failure-mode rehearsal 接入新的生产就绪汇总。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v10`。
- 区分 `config contract ready`、`failure-mode rehearsal ready`、`real production connections still missing`。
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
v126-v128 的主线是把“候选层已通过”继续推进到“真实连接前配置与失败模式已清楚”，但仍不接真实生产外部依赖。
```
