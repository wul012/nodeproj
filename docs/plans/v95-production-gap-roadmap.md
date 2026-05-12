# Node v95 衍生计划：生产阻塞项收敛

## 来源版本

```text
本计划由 Node v95 衍生。
v95 已新增 /api/v1/production/readiness-summary，
结论是：Node 控制面已经 production-leaning，但还不是 production-ready。
当前主要阻塞点：审计持久化、访问控制、上游只读生产证据。
```

## 执行规则

- 目标继续靠近生产级，不再满足于展示级闭环。
- Node 版本推进时必须先读取最新 plan，并按最新 plan 执行。
- 我负责 Node；Java / mini-kv 只在用户要求或计划轮到对应项目时由用户推进。
- 如果下一步不是 Node，我只做只读检查并停止。
- 推进 Node 前要只读检查 Java / mini-kv 是否已完成计划前置项。
- 每版仍保持一个合理小闭环：不能只改文案，也不要把多个生产层改造塞进同一版。

## 推荐执行顺序

```text
1. Java v45 + mini-kv v54：可以一起推进
2. Node v96：接入 Java v45 / mini-kv v54 的只读生产证据
3. Node v97：audit store env config profile，不真正切换生产存储
4. Node v98：access-control readiness profile，列出认证、授权、审计访问阻塞项
5. Java v46 + mini-kv v55：可以一起推进
6. Node v99：production readiness summary v2，汇总 v96-v98 与新上游证据
```

## 具体版本说明

### Java v45：只读 ops evidence endpoint

目标：

```text
给 Node 后续读取更稳定的 Java 生产证据。
```

本版建议做：

- 新增只读 ops evidence endpoint。
- 输出 failed-event replay 状态、outbox 状态、审批/执行阻塞状态。
- 输出 service version、profile、readOnly、executionAllowed=false。
- 不做真实 replay，不改订单状态。

### mini-kv v54：只读 storage evidence endpoint / command

目标：

```text
给 Node 后续读取更稳定的 mini-kv 存储证据。
```

本版建议做：

- 新增只读 storage evidence 输出。
- 覆盖 version、WAL/snapshot 状态、key count、read-only diagnostics。
- 保持 `CHECKJSON GET` 语义不变。
- 不新增写命令，不让 mini-kv 承担订单权威数据。

### Node v96：upstream production evidence intake

前置：

```text
Java v45 和 mini-kv v54 完成后推进。
```

本版要落地：

- 只读检查 Java / mini-kv evidence 样本或 endpoint。
- 新增 upstream production evidence intake service。
- 把 Java / mini-kv 的 readOnly、executionAllowed、version、diagnostics 汇总进 Node。
- 补 endpoint、测试、safe smoke、截图、归档、代码讲解。

实施收口：

```text
已完成。
endpoint: /api/v1/upstreams/production-evidence-intake
archive: a/96/
code notes: 代码讲解记录/100-upstream-production-evidence-intake-v96.md
tag: v96
```

### Node v97：audit store env config profile

目标：

```text
先把 audit store 的环境配置边界设计出来，不直接切换生产存储。
```

本版要落地：

- 新增 audit store config profile。
- 定义 `AUDIT_STORE_KIND`、`AUDIT_STORE_PATH` / `AUDIT_STORE_URL` 的安全解释。
- 检查当前仍是 in-memory，并输出迁移阻塞项。
- 不真正连接数据库，不迁移数据。

实施收口：

```text
已完成。
endpoint: /api/v1/audit/store-config-profile
archive: a/97/
code notes: 代码讲解记录/101-audit-store-env-config-profile-v97.md
tag: v97
```

### Node v98：access-control readiness profile

目标：

```text
把认证、授权、审计访问控制列为生产阻塞项。
```

本版要落地：

- 新增 access-control readiness profile。
- 输出当前无登录、无 RBAC、无操作人身份、审计查询未鉴权等风险。
- 给出最小生产化权限模型建议。
- 不引入完整登录系统，先做 readiness evidence。

### Java v46：replay audit evidence sample

目标：

```text
补 Java replay 审计样本，让 Node 后续能判断真实执行是否可追溯。
```

本版建议做：

- 新增 blocked / approved replay audit sample。
- 明确 operator、requestId、decisionId、dryRun、executionAllowed 字段。
- 不开启真实 replay。

### mini-kv v55：restart recovery evidence sample

目标：

```text
补 mini-kv 崩溃恢复/重启证据，为生产化说明增加基础设施可信度。
```

本版建议做：

- 新增 WAL/snapshot restart recovery sample。
- 输出前后 key count、digest、recovered=true/false。
- 不改核心协议，不扩大写命令范围。

### Node v99：production readiness summary v2

前置：

```text
Node v96-v98 完成，并尽量完成 Java v46 + mini-kv v55。
```

本版要落地：

- 汇总 v96-v98 的新证据。
- 把生产阻塞项按 audit / access-control / upstream-observability 分类。
- 更新 `/api/v1/production/readiness-summary` 或新增 v2 endpoint。
- 补测试、safe smoke、截图、归档、代码讲解。

## 并行判断

```text
Java v45 + mini-kv v54 可以一起推进。
Java v46 + mini-kv v55 可以一起推进。
Node v96 需要等 Java v45 + mini-kv v54 完成后再做。
Node v99 需要等 Node v96-v98 完成后再做，最好也等 Java v46 + mini-kv v55 完成。
```

## 暂停条件

- 需要真实 secret、真实部署凭据或真实服务器环境。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要把 mini-kv 作为订单权威存储。
- 需要一次性跨三个仓库做强耦合改造。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v95 之后不要继续只做 Node 报告堆叠。
先补 Java v45 + mini-kv v54 的只读生产证据，再让 Node v96 接入；
同时 Node 后续要开始收敛 audit store 和 access-control 这两个生产级硬缺口。
```
