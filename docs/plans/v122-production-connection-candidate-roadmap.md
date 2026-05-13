# Node v122 衍生计划：生产连接候选层

来源版本：Node v122 `production readiness summary v8`。

v120-v122 已经把 managed audit adapter compliance harness、JWKS verifier fixture rehearsal、production readiness summary v8 串成一个连接前合规演练闭环。下一阶段继续靠近生产级，但仍遵守“不需要真实数据库账号、不需要真实 IdP 凭据、不打开真实上游执行”的边界。

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
1. Node v123：managed audit adapter harness runner
2. Node v124：JWKS cache contract rehearsal
3. Node v125：production readiness summary v9
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v123：managed audit adapter harness runner

目标：

```text
把 v120 的 compliance harness 从单个本地 adapter 调整为可选择 runner，为未来真实 adapter 接入做接口层准备。
```

本版要落地：

- 新增 managed audit compliance runner profile。
- 支持至少两个本地目标：`memory` 与 `file-candidate`。
- 复用 append-only、queryByRequestId、digest、backupRestoreMarker 验收步骤。
- 不连接真实数据库，不迁移既有 audit 文件。
- 继续保持 `realManagedAdapterConnected=false`。

## Node v124：JWKS cache contract rehearsal

目标：

```text
在 v121 的本地 JWKS fixture 之上增加 cache contract，先演练 key 命中、kid miss、过期、rotation marker。
```

本版要落地：

- 新增 JWKS cache contract profile。
- 覆盖 cache hit、unknown kid、expired cache、rotation marker。
- 不访问外部 IdP，不发起 JWKS 网络请求。
- 不把 token 用作真实请求放行依据。
- 继续保持 `realIdpVerifierConnected=false`。

## Node v125：production readiness summary v9

目标：

```text
把 v123 audit runner 与 v124 JWKS cache contract 接入新的生产就绪汇总。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v9`。
- 区分 `adapter runner passes`、`JWKS cache contract passes`、`real production connections still missing`。
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
v123-v125 的主线是把 v122 的合规演练推进成“可替换候选层”：audit 侧准备 runner，auth 侧准备 JWKS cache contract，再用 v9 summary 聚合。
```
