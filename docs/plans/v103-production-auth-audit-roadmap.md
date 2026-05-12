# Node v103 衍生计划：生产级 auth / audit 收敛阶段

## 来源版本

```text
本计划由 Node v103 衍生。
v103 已新增 /api/v1/production/readiness-summary-v3，
把 Java v47 replay evidence index、mini-kv v56 recovery fixture index、
Node v100 access policy、Node v101 dry-run guard、Node v102 audit runtime kind
汇总到同一个生产就绪度复查报告。
```

v103 判断：

```text
upstream-observability: ready=true
execution-safety: ready=true
access-control: ready=false
audit: ready=false
readyForProductionOperations=false
```

## 执行规则

- 目标继续靠近生产级，不满足于只读报告堆叠。
- Node 版本推进前必须先读取最新计划，并按最新计划指导执行。
- 我负责 Node；Java / mini-kv 只做只读完成度核对和方向提示，除非用户明确授权交叉开发。
- 每次推进 Node 前要只读检查 Java / mini-kv 当前是否干净、是否已有计划依赖的样本或 tag。
- 每个版本保持一个合理小闭环：要有工程行为、测试、运行调试、截图、归档和代码讲解。
- 运行调试截图默认使用本机 Chrome / Chromium；不默认触发 Playwright 浏览器下载。

## 推荐执行顺序

```text
1. Node v104：access guard audit context，把 dry-run 评估写入审计事件上下文
2. Node v105：operator identity contract rehearsal，把 header 身份稳定纳入审计与 readiness
3. Node v106：file audit restart evidence report，验证 file runtime 的重启恢复证据
4. Java v48 + mini-kv v57：可以一起推进，只做上游只读证据增强
5. Node v107：production readiness summary v4，复查 auth/audit 新进展
```

这里继续不写“或”。如果只推进 Node，则按 v104 -> v105 -> v106 顺序做；Java / mini-kv 是可并行批次，不阻塞前三个 Node 版本。

## 具体版本说明

### Node v104：access guard audit context

目标：

```text
把 v101 的 dry-run guard 从 response header 推进到审计上下文，但仍不拒绝请求。
```

本版要落地：

- 在请求审计事件中记录 routeGroup、requiredRole、matchedRoles、wouldDeny、accessReason。
- `/api/v1/audit/events` 能看到 access guard 上下文。
- 新增 audit context readiness 或测试，证明受保护路由会产生 guard evidence。
- 不启用真实登录，不把 guard 改为 enforcement。

实施收口：

```text
已完成。
audit event field: accessGuard
coverage: routeGroup / requiredRole / matchedRoles / wouldDeny / reason
archive: a/104/
code notes: 代码讲解记录_生产雏形阶段/108-access-guard-audit-context-v104.md
tag: v104
```

### Node v105：operator identity contract rehearsal

目标：

```text
把 header-derived operator identity 固定成可测试契约，为真实 auth 中间件预留边界。
```

本版要落地：

- 明确 `x-orderops-operator-id` 与 `x-orderops-roles` 的解析、非法角色过滤、匿名状态。
- 将 operator identity 写入审计事件或单独 readiness profile。
- 测试 viewer/operator/approver/auditor/admin 的最小角色契约。
- 不读取 secret，不实现 JWT，不接外部身份系统。

实施收口：

```text
已完成。
endpoint: /api/v1/security/operator-identity-contract
audit event field: operatorIdentity
coverage: operatorId / roles / rawRoles / rejectedRoles / authSource
archive: a/105/
code notes: 代码讲解记录_生产雏形阶段/109-operator-identity-contract-v105.md
tag: v105
```

### Node v106：file audit restart evidence report

目标：

```text
把 v102 file-backed audit 从“可选运行态”推进到“可归档的重启恢复证据”。
```

本版要落地：

- 新增 file audit restart evidence report，输出写入、关闭、重启读取后的事件数量和 digest。
- 支持 JSON / Markdown。
- 测试 file runtime 下事件可恢复，memory runtime 下明确不可作为生产审计。
- 不接数据库，不做轮转/备份/加密。

### Java v48 + mini-kv v57：上游只读证据增强

目标：

```text
给 Node v107 提供更稳定的上游生产级佐证。
```

可以一起推进：

- Java v48：增强 replay evidence index，补 operator/auth boundary 说明字段。
- mini-kv v57：增强 recovery fixture index，补 restart/replay cost 或 retention boundary 说明字段。

本批次不要求 Node 直接修改 Java 或 mini-kv；如果用户只推进 Node，可先跳过。

### Node v107：production readiness summary v4

目标：

```text
复查 v104-v106 之后 access-control 与 audit 两类阻塞是否减少。
```

本版要落地：

- 汇总 access guard audit context、operator identity contract、file audit restart evidence。
- 输出 access evidence durable coverage、operator identity coverage、file audit restart evidence status。
- 继续保持 `UPSTREAM_ACTIONS_ENABLED=false`。
- 若真实 auth、RBAC enforcement、managed audit store 仍未完成，保持 `readyForProductionOperations=false`。

## 暂停条件

- 需要真实登录密钥、JWT secret、数据库凭据或生产服务器。
- 需要 Node 执行 Java replay POST。
- 需要 Node 执行 mini-kv 写命令。
- 需要把 mini-kv 作为订单权威存储。
- 需要一次性跨三个仓库做强耦合改造。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v103 之后重点不是再堆报告，而是把 access guard 证据写入审计、
把 operator identity 契约稳定下来、再验证 file audit 的重启恢复证据；
这些完成后，再用 v107 复查离生产级还差哪些硬门槛。
```
