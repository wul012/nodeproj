# Node v107 衍生计划：生产执行门槛继续收敛

来源版本：Node v107 `production readiness summary v4`。

v107 已经把 Java v48、mini-kv v57、Node v104-v106 的证据合成到 `/api/v1/production/readiness-summary-v4`。当前结论是：只读证据链已经比较完整，但离生产级仍卡在三个硬门槛：

```text
真实 auth middleware
access guard enforcement
managed audit store / retention / backup policy
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
1. Node v108：auth enforcement rehearsal middleware
2. Node v109：audit retention policy + file audit integrity evidence
3. Node v110：production readiness summary v5，复查 v108-v109 后仍缺的生产门槛
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v108：auth enforcement rehearsal middleware

目标：

```text
把 v105 的 operator identity contract 和 v104 的 access guard dry-run 接到一个可切换的 auth/enforcement middleware 上。
```

本版要落地：

- 新增 auth/enforcement 配置解析，例如 `ORDEROPS_AUTH_MODE`、`ACCESS_GUARD_ENFORCEMENT_ENABLED`。
- 默认仍为 rehearsal/dry-run，不拒绝请求。
- 测试环境允许显式打开 enforcement，验证缺少身份返回 401、角色不足返回 403、角色满足返回 200。
- 审计事件继续写入 operator identity 与 access guard 结果。
- 真实生产默认仍不启用，`UPSTREAM_ACTIONS_ENABLED=false` 保持。

不做：

- 不接真实 JWT / OAuth / IdP。
- 不新增 Java replay 执行。
- 不修改 Java 或 mini-kv。

完成状态：

```text
已由 Node v108 落地为 /api/v1/security/auth-enforcement-rehearsal。
默认 ACCESS_GUARD_ENFORCEMENT_ENABLED=false，仍然 observe-only。
测试环境显式打开后已覆盖 missing identity=401、insufficient role=403、allowed role=200。
```

## Node v109：audit retention policy + file audit integrity evidence

目标：

```text
把 v106 的 file audit restart evidence 往生产审计方向推进一步：补 retention policy 配置校验和文件审计完整性证据。
```

本版要落地：

- 新增 audit retention policy profile，明确保留天数、最大文件大小、轮转/备份是否配置。
- 对 file audit event 生成可复查的 digest / integrity evidence。
- 在缺少 retention / backup / managed store 时继续阻塞生产。
- 测试覆盖 policy 缺失、policy 有效、file evidence digest 稳定三类场景。

不做：

- 不真正删除或轮转历史审计文件。
- 不接数据库、对象存储或云审计服务。
- 不把 file audit 宣称为生产最终方案。

完成状态：

```text
已由 Node v109 落地为 /api/v1/audit/retention-integrity-evidence。
默认缺失 retention / rotation / backup 会继续阻塞。
file runtime + retention knobs 配齐时，digest evidence 稳定，阻塞项收敛到 MANAGED_AUDIT_STORE_MISSING。
```

## Node v110：production readiness summary v5

目标：

```text
复查 v108 auth enforcement rehearsal 与 v109 audit retention evidence 后，给出新的生产级差距判断。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v5`。
- 汇总 v108 auth enforcement 状态、v109 audit retention / integrity 状态、v107 上游边界证据。
- 明确哪些 blocker 已减少，哪些仍必须由真实 auth、managed audit store、部署/密钥治理解决。
- 继续保持 `readyForProductionOperations=false`，除非真实 auth/RBAC/managed audit store 都已经完成。

## 暂停条件

- 需要真实登录密钥、JWT secret、数据库凭据或生产服务器。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要把 mini-kv 作为订单权威存储。
- 需要一次性跨三个仓库做强耦合改造。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v108-v110 的主线是从“生产证据汇总”推进到“生产门槛可切换演练”：
先补 auth/enforcement rehearsal，再补 audit retention/integrity，最后用 readiness v5 重新评估。
```
