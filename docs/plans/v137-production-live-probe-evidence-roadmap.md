# Node v137 衍生计划：live probe evidence 归档阶段

来源版本：Node v137 `production readiness summary v13`。

v135-v137 已经完成 live probe readiness contract、read-only live probe smoke harness、production readiness summary v13。下一阶段继续只推进 Node，把 live probe 的 contract、smoke result、summary v13 固化成可归档、可复核、可汇总的生产证据。

## 执行规则

- Codex 只负责推进 Node 项目 `D:\nodeproj\orderops-node`。
- 每次推进 Node 前先读取最新 plan，并判断是否轮到 Node。
- Java / mini-kv 未明确授权时，只做只读状态核对，不构建、不启动、不测试、不修改。
- 每版仍需 `npm run typecheck`、`npm test`、`npm run build`、安全 HTTP smoke、本机 Chrome / Chromium 截图。
- 运行调试截图和解释继续写入 `b/<版本>/图片` 与 `b/<版本>/解释`。
- 代码讲解继续写入 `代码讲解记录_生产雏形阶段/`，讲解模式不变。
- `UPSTREAM_PROBES_ENABLED=false` 时必须输出 skipped evidence，不能失败。
- `UPSTREAM_ACTIONS_ENABLED=false` 继续作为默认保护。

## 什么时候启动 Java / mini-kv

本计划默认不启动 Java / mini-kv。

只有用户明确要求做真实 live read smoke 时，才可以请用户启动另外两个项目，并且仍然只允许：

```text
Java GET /actuator/health
Java GET /api/v1/ops/overview
mini-kv HEALTH
mini-kv INFOJSON
mini-kv STATSJSON
```

继续禁止：

```text
Java replay POST
Java order mutation POST
mini-kv SET / DEL / EXPIRE / FLUSH
UPSTREAM_ACTIONS_ENABLED=true
```

## 推荐执行顺序

```text
1. Node v138：live probe evidence archive record
2. Node v139：live probe evidence archive verification
3. Node v140：live probe evidence archive bundle
```

这三版都属于 Node。未启动 Java / mini-kv 时，v138-v140 都必须基于 skipped live probe evidence 继续推进。

说明：

```text
本阶段不新增 production readiness summary v14。
summary 后续只承担阶段总汇总，不再为一两个新增 check 单独出新版本。
```

## Node v138：live probe evidence archive record

状态：已由 Node v138 完成。

目标：

```text
把 v135 contract、v136 smoke harness、v137 summary v13 固化成 live probe evidence archive record。
```

本版要落地：

- 新增 `/api/v1/production/live-probe-evidence-archive`。
- 记录 contract profileVersion、smoke profileVersion、summaryVersion。
- 记录 smoke skipped/pass 状态、planned probe 数、write attempt 状态。
- 输出 archive digest 和 markdown。
- 保持 `readyForProductionOperations=false`。

## Node v139：live probe evidence archive verification

目标：

```text
复核 v138 archive record 的 digest、版本引用、只读边界和 skipped/pass 证据。
```

本版要落地：

- 新增 `/api/v1/production/live-probe-evidence-archive/verification`。
- 校验 archive digest 格式。
- 校验 contract / smoke / summary v13 版本引用一致。
- 校验没有 write probe、没有 upstream action。
- 输出 verification blockers / warnings / recommendations。

## Node v140：live probe evidence archive bundle

目标：

```text
把 live probe archive record 和 archive verification 打包成可交付的 archive bundle。
```

本版要落地：

- 新增 `/api/v1/production/live-probe-evidence-archive/bundle`。
- 汇总 archive record、archive verification、截图/运行说明引用。
- 输出 bundle digest 和 evidence endpoint 列表。
- 明确 skipped evidence 只是本地归档证据，不是 production pass。
- 不新增 production readiness summary 版本。

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
v138-v140 把 live probe readiness 变成可归档、可验证、可交付的生产证据包；summary 版本延后到更完整阶段收口时再做。
```
