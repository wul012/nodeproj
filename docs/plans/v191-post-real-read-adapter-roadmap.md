# Node v191 衍生全局计划：真实只读 adapter 后续生产化

来源版本：Node v191 `real HTTP/TCP read adapter rehearsal`。

计划状态：当前唯一有效全局计划。`docs/plans/v185-post-real-read-rehearsal-roadmap.md` 已覆盖并收口 Node v186-v191、Java v67、mini-kv v76；后续不再向旧计划追加重合版本。

## 阶段原则

```text
Node v191 已能在默认关闭窗口下表达真实只读 adapter rehearsal。下一阶段不继续横向增加证据页，优先把真实运行窗口、操作员确认、结果归档和失败分类做实。
```

本阶段仍只覆盖三项目：

```text
Java = 订单交易核心
Node = 运维控制面 / 证据链 / 受控操作入口
mini-kv = 自研 KV 基础设施实验位
```

不纳入 aiproj。

## 推荐执行顺序

```text
1. Node v192：real-read adapter operator window runbook。（已完成）
   基于 v191 endpoint，生成操作员手动开启窗口的 runbook：需要谁启动 Java/mini-kv、设置哪些 env、预期哪些 endpoint/command 被读取、如何停止；不自动启动上游。
2. 推荐并行：Java v68 + mini-kv v77。（已完成）
   Java v68 补 release approval rehearsal 的只读失败分类字段，例如 upstream readiness / auth-context warning / audit-correlation warning；mini-kv v77 补 SMOKEJSON / runtime-smoke evidence 的失败分类说明。两者都不新增写操作。
3. Node v193：real-read adapter failure taxonomy。（已完成）
   消费 v191/v192 和 Java v68 + mini-kv v77 的证据，给真实读取失败做分类：closed-window、connection-refused、timeout、invalid-json、unsafe-surface、unexpected-write-signal。
4. Node v194：real-read adapter evidence archive。
   把 v191/v193 的结果固化成可归档 bundle，包含 adapter digest、records、operator window、failure taxonomy；仍不授权生产操作。
```

## Node v192：real-read adapter operator window runbook

目标：

```text
把 v191 的真实只读 adapter rehearsal 变成可人工执行的运行窗口说明，而不是让 Node 自动启动上游。
```

本版本要落地：

- 已新增 `GET /api/v1/production/real-read-adapter-operator-window-runbook`。
- 已新增 Markdown 输出 `GET /api/v1/production/real-read-adapter-operator-window-runbook?format=markdown`。
- 已明确 `UPSTREAM_PROBES_ENABLED=true` 只允许在人工窗口中开启。
- 已明确 `UPSTREAM_ACTIONS_ENABLED=false` 必须保持。
- 已明确 Java / mini-kv 由操作者手动启动和停止。
- 已覆盖默认关闭、upstream actions 开启阻断、JSON/Markdown 路由测试。
- 不执行写操作。

v192 归档：

```text
c/192/图片/real-read-adapter-operator-window-runbook-v192.png
c/192/解释/real-read-adapter-operator-window-runbook-v192.md
代码讲解记录_生产雏形阶段/196-real-read-adapter-operator-window-runbook-v192.md
```

## 推荐并行：Java v68 + mini-kv v77

Java v68 目标：

```text
在 release approval rehearsal 只读入口中补失败分类和 warning 字段，让 Node 能区分服务未就绪、请求上下文不足、审计关联缺失等情况；不认证、不持久化、不写 ledger。
```

mini-kv v77 目标：

```text
在 runtime smoke evidence 中补失败分类说明或 sample，让 Node 能区分连接失败、JSON 解析失败、只读命令失败和危险命令误用；不执行 LOAD/COMPACT/SETNXEX/RESTORE。
```

## Node v193：real-read adapter failure taxonomy

依赖关系：等待 Node v192、Java v68 + mini-kv v77 完成。

目标：

```text
把真实只读 adapter 的失败结果从普通 skipped/blocked 细分为可操作分类，方便真实演练时定位问题。
```

完成内容：

- 已新增 `GET /api/v1/production/real-read-adapter-failure-taxonomy`。
- 已新增 Markdown 输出 `GET /api/v1/production/real-read-adapter-failure-taxonomy?format=markdown`。
- 已消费 v191 adapter rehearsal 与 v192 operator window runbook。
- 已把默认关闭窗口分类为 `closed-window`，且不访问上游。
- 已覆盖 `connection-refused`、`timeout`、`invalid-json`、`unsafe-surface`、`unexpected-write-signal` 分类框架。
- 已引用 Java v68 与 mini-kv v77 的只读 failure taxonomy 证据。
- 仍保持 `readyForProductionOperations=false`。

v193 归档：

```text
c/193/图片/real-read-adapter-failure-taxonomy-v193.png
c/193/解释/real-read-adapter-failure-taxonomy-v193.md
代码讲解记录_生产雏形阶段/197-real-read-adapter-failure-taxonomy-v193.md
```

## Node v194：real-read adapter evidence archive

依赖关系：等待 Node v193 完成。

目标：

```text
归档真实只读 adapter rehearsal 的运行窗口、结果、失败分类和 digest，形成后续生产 pass evidence 的基础材料。
```

## 暂停条件

- 需要生产密钥、生产数据库、生产 IdP。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java deployment、rollback SQL、mini-kv LOAD/COMPACT/SETNXEX/RESTORE。
- 需要把 rehearsal pass 当作生产操作授权。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v191 后不要继续只加 summary；先把真实只读窗口的人工流程、失败分类和归档证据做实，再考虑更深的生产化能力。
```
