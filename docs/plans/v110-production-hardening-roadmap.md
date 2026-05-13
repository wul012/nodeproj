# Node v110 衍生计划：生产认证与审计硬化

来源版本：Node v110 `production readiness summary v5`。

v110 已经确认当前项目不是缺少“报告”，而是缺少真正生产级硬件：

```text
signed auth middleware
managed audit store
部署前环境校验和密钥治理
```

## 执行规则

- Codex 只负责推进 Node 项目 `D:\nodeproj\orderops-node`。
- 每次推进 Node 前先读取本计划，并只读检查 Java / mini-kv 计划依赖是否已完成。
- Java / mini-kv 未明确授权时，只做 `git status`、tag、关键文件和字段核对，不构建、不启动、不测试、不修改。
- 运行调试截图和解释继续写入 `b/<版本>/图片` 与 `b/<版本>/解释`。
- 代码讲解继续写入 `代码讲解记录_生产雏形阶段/`，讲解模式不变。
- 每版仍需 `npm run typecheck`、`npm test`、`npm run build`、安全 HTTP smoke、本机 Chrome / Chromium 截图。
- `UPSTREAM_ACTIONS_ENABLED=false` 继续作为默认生产阻塞保护。

## 推荐执行顺序

```text
1. Node v111：signed auth token contract rehearsal
2. Node v112：managed audit store adapter contract
3. Node v113：deployment environment readiness gate
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v111：signed auth token contract rehearsal

目标：

```text
在不接真实 IdP 的前提下，定义 signed auth token 的最小契约和验证失败证据。
```

本版要落地：

- 新增 token auth contract profile，定义 issuer、subject、roles、expiresAt、signatureRequired 等字段。
- 支持测试用 HMAC secret 进行本地 rehearsal，不把测试 secret 写入代码。
- 覆盖 token 缺失、签名错误、过期、角色不足、角色满足场景。
- 继续区分 rehearsal token 与真实 IdP / JWT 生产认证。

不做：

- 不接真实 OAuth / OIDC / IdP。
- 不暴露生产密钥。
- 不启用 Java replay。

完成状态：

```text
已由 Node v111 落地为 /api/v1/security/signed-auth-token-contract。
支持本地 HMAC rehearsal token，覆盖 missing token、bad signature、expired、insufficient role、allowed role。
接口只暴露 secretConfigured，不回显 secret；仍标记 REAL_IDP_NOT_CONNECTED。
```

## Node v112：managed audit store adapter contract

目标：

```text
把 managed audit store 抽象成 adapter contract，先定义写入、读取、digest、retention 能力，不接真实数据库。
```

本版要落地：

- 新增 managed audit store contract profile。
- 定义 required capabilities：append-only write、query by requestId、digest verification、retention metadata、backup restore marker。
- 提供 in-memory fake adapter 或 static contract sample 用于测试 contract，不宣称生产 ready。
- v109 的 file audit evidence 继续作为 rehearsal，不替代 managed store。

不做：

- 不接 PostgreSQL / Redis / S3 / 云审计。
- 不迁移历史 audit 文件。
- 不执行真实保留和删除。

完成状态：

```text
已由 Node v112 落地为 /api/v1/audit/managed-store-contract。
InMemoryManagedAuditStoreFake 覆盖 append-only write、query by requestId、digest verification、retention metadata、backup restore marker。
仍保持 REAL_MANAGED_AUDIT_ADAPTER_MISSING，不接真实数据库、不迁移文件、不执行保留删除。
```

## Node v113：deployment environment readiness gate

目标：

```text
把 v111/v112 的生产前配置要求汇总成部署环境 readiness gate。
```

本版要落地：

- 新增 `/api/v1/deployment/environment-readiness`。
- 检查 auth secret 是否配置、audit store kind 是否生产可接受、upstream actions 是否仍关闭、retention/backup 配置是否完整。
- 输出 blocker / warning / recommendation。
- 继续保持真实执行关闭。

完成状态：

```text
已由 Node v113 落地为 /api/v1/deployment/environment-readiness。
gate 汇总 signed auth token contract、managed audit store contract、retention/backup 配置、upstream action safety。
rehearsal 配置齐时仍保留 REAL_IDP_NOT_CONNECTED 和 MANAGED_AUDIT_ADAPTER_MISSING。
```

## 暂停条件

- 需要真实登录密钥、JWT secret、数据库凭据或生产服务器。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要把 mini-kv 作为订单权威存储。
- 需要一次性跨三个仓库做强耦合改造。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v111-v113 不再继续堆 readiness summary，而是补生产认证、managed audit contract、部署环境 gate 三个硬门槛的前置工程。
```

## 收口状态

```text
本计划覆盖的 Node v111-v113 已完成。
后续计划另起：docs/plans/v113-production-integration-roadmap.md
```
