# Node v119 衍生计划：生产连接前合规演练

来源版本：Node v119 `production readiness summary v7`。

v117-v119 已经把 managed audit adapter boundary、IdP verifier boundary、production readiness summary v7 串起来。下一阶段继续靠近生产级，但仍不直接要求真实数据库或真实 IdP 凭据，而是先做可测试、可替换、可验收的连接前合规演练。

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
1. Node v120：managed audit adapter compliance harness
2. Node v121：JWKS verifier fixture rehearsal
3. Node v122：production readiness summary v8
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v120：managed audit adapter compliance harness

目标：

```text
给 v117 的 ManagedAuditAdapter 接口增加合规测试 harness，先让 fake/local adapter 可以被统一验收。
```

本版要落地：

- 新增 adapter compliance profile。
- 覆盖 append-only、queryByRequestId、digest、backupRestoreMarker 的统一验收步骤。
- 不连接真实数据库，不迁移 audit 文件。
- 继续保持 `realManagedAdapterConnected=false`。

## Node v121：JWKS verifier fixture rehearsal

目标：

```text
给 v118 的 IdP verifier boundary 增加本地 JWKS fixture 验签演练，不访问外部 IdP。
```

本版要落地：

- 新增本地 JWKS / JWT fixture rehearsal。
- 验证 issuer、audience、expiry、roles、kid 匹配。
- 不发起网络请求，不把 fixture token 用作真实放行依据。
- 继续保持 `realIdpVerifierConnected=false`。

## Node v122：production readiness summary v8

目标：

```text
把 v120 adapter compliance 与 v121 JWKS fixture rehearsal 接入新的 production readiness summary。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v8`。
- 区分 `compliance harness passes`、`fixture verifier passes`、`production connection still missing`。
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
v120-v122 的主线是在不接真实外部依赖的前提下，把 adapter 和 IdP verifier 都推进到可验收的本地合规演练。
```
