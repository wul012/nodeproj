# Node v113 衍生计划：生产硬门槛集成演练

来源版本：Node v113 `deployment environment readiness gate`。

v111-v113 已经把 signed token contract、managed audit store contract、deployment environment gate 做成只读 evidence。下一阶段不急着打开真实执行，而是把这些 contract 继续接入现有 audit/access/production readiness 链路。

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
1. Node v114：verified identity audit binding
2. Node v115：managed audit contract readiness summary
3. Node v116：production readiness summary v6
```

这三版都属于 Node，不需要等待 Java 或 mini-kv 新版本。

## Node v114：verified identity audit binding

状态：已由 Node v114 落地为 `/api/v1/security/verified-identity-audit-binding`。

目标：

```text
把 v111 signed token contract 的 verified subject/roles 形状接入 audit evidence，但仍不接真实 IdP。
```

本版要落地：

- 新增 verified identity audit binding profile。
- 证明 token subject、roles、issuer、verification result 可以进入 audit context。
- 区分 header identity、rehearsal token identity、future production IdP identity。
- 继续保持真实生产 auth 未完成。

## Node v115：managed audit contract readiness summary

目标：

```text
把 v112 managed audit store contract 与 v109 retention/integrity evidence 合成一个 audit readiness summary。
```

本版要落地：

- 新增 `/api/v1/audit/managed-readiness-summary`。
- 汇总 fake adapter capability coverage、file audit digest、retention/backup knobs、real adapter missing。
- 输出 managed audit 下一步实施清单。

## Node v116：production readiness summary v6

目标：

```text
复查 v114-v115 后，给出更接近生产落地前的 readiness summary v6。
```

本版要落地：

- 新增 `/api/v1/production/readiness-summary-v6`。
- 汇总 verified identity audit binding、managed audit readiness、deployment environment gate。
- 继续保持 `readyForProductionOperations=false`，除非真实 IdP 和真实 managed audit adapter 都完成。

## 暂停条件

- 需要真实登录密钥、JWT secret、数据库凭据或生产服务器。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要把 mini-kv 作为订单权威存储。
- 需要一次性跨三个仓库做强耦合改造。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v114-v116 的主线是把 signed identity、audit contract、deployment gate 三块证据接起来，形成下一版 production readiness v6。
```
