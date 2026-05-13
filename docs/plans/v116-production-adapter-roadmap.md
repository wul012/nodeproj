# Node v116 衍生计划：生产 adapter 边界落地

来源版本：Node v116 `production readiness summary v6`。

v114-v116 已经把 verified identity audit binding、managed audit readiness summary、deployment environment gate 串成 production readiness summary v6。下一阶段的重点不再继续堆总览，而是开始拆两个真正阻塞生产级的 adapter 边界：

```text
真实 IdP verifier 边界
真实 managed audit adapter 边界
```

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
1. Node v117：managed audit adapter boundary
2. Node v118：real IdP verifier boundary
3. Node v119：production readiness summary v7
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v117：managed audit adapter boundary

目标：

```text
先做真实 managed audit adapter 的接口边界和 runtime 选择，不接真实数据库。
```

本版要落地：

- 新增 managed audit adapter interface。
- 明确 `file`、`memory`、`managed-unimplemented` 三类 runtime 状态。
- 新增只读 adapter boundary profile。
- 不迁移、不删除、不轮转现有 audit JSONL。
- `readyForProductionAudit=false` 继续保持，直到真实 adapter 和 backup/restore drill 完成。

## Node v118：real IdP verifier boundary

目标：

```text
先做真实 IdP verifier 的接口边界和配置检查，不访问外部 IdP。
```

本版要落地：

- 新增 IdP verifier boundary profile。
- 明确 local HMAC rehearsal verifier 与 future OIDC/JWT verifier 的边界。
- 检查 issuer、audience、JWKS URL、clock skew 等配置形状。
- 不发起网络请求，不拉 JWKS，不把 token identity 变成真实放行依据。

## Node v119：production readiness summary v7

目标：

```text
把 v117 adapter boundary 和 v118 IdP verifier boundary 接入新的 production readiness summary。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v7`。
- 汇总 managed audit adapter boundary、IdP verifier boundary、v116 summary v6。
- 更明确地区分 `adapter boundary exists` 和 `production adapter connected`。
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
v117-v119 的主线是从 evidence 总览推进到生产 adapter 边界，但仍不接真实外部依赖、不打开真实执行。
```
