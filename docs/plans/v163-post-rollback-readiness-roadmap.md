# Node v163 衍生全局计划：从回滚 readiness 转入生产交付硬化

来源版本：Node v163 `release rollback readiness runbook`。

计划状态：当前有效全局计划；上一份 `docs/plans/v161-post-controlled-idempotency-drill-roadmap.md` 到 Node v163 收口，不再继续追加已完成版本。

## 计划接力规则

- 每次推进前先读取最新 plan，并判断当前步骤属于哪个项目。
- Codex 默认负责 Node；当下一步是 Java / mini-kv 时，先做只读状态核对，用户明确要求推进时再交叉开发。
- 能并行的 Java / mini-kv 同阶段版本必须明确写成“推荐并行”。
- Node 汇总版必须写清依赖前置版本全部完成。
- 推荐执行顺序中不使用“或/任选”。
- 每个版本必须形成一个合理小闭环，不只做零散字段或单纯流水账 summary。
- 新版本运行截图和解释默认写入 `c/<版本>/`。
- 写入 Java / mini-kv 版本号前必须只读核对对应仓库最新 tag。
- 需要真实生产密钥、生产数据库、生产 IdP、真实回滚执行权限时暂停。

## 当前状态

已完成：

```text
Java v55：deployment rollback evidence sample
mini-kv v64：runtime artifact rollback evidence sample
Node v163：release rollback readiness runbook
Node v164：release report shared helpers refactor
```

当前仍不授权生产回滚：

```text
UPSTREAM_ACTIONS_ENABLED=false
Node 只做 readiness / dry-run / evidence aggregation
Java 回滚需要 operator confirmation
mini-kv 回滚证据不能伪造 Java order authority
```

## 下一阶段方向

下一阶段不直接做真实回滚执行，而是先补生产交付硬化：

```text
release bundle / CI gate / approval handoff / rollback window readiness
```

这个方向能同时锻炼：

```text
Java：release bundle manifest、rollback approval handoff、只读环境检查
mini-kv：artifact bundle manifest、restore compatibility evidence、只读环境检查
Node：统一 release bundle gate、CI 可复现入口、rollback window checklist
```

## 当前推荐执行顺序

```text
1. 已完成插入版：Node v164。
   Node v164 做 release report shared helpers refactor，抽出报告 Markdown、blocking message、step/forbidden operation、digest 共用 helper；不新增上游能力，不读取或修改 Java / mini-kv。
2. 下一步推荐并行：Java v56 + mini-kv v65。
   Java v56 做 release bundle manifest，把 jar、contracts、rollback evidence、focused/non-Docker/package/http-smoke 证据收成一个只读 bundle；不接生产数据库，不执行回滚。
   mini-kv v65 做 runtime artifact bundle manifest，把 binary version、fixtures、WAL/Snapshot compatibility、CTest/smoke 证据收成一个只读 bundle；不执行 LOAD/COMPACT/写命令。
3. Node v165：cross-project release bundle gate，必须等待 Java v56 和 mini-kv v65 都完成后再做；合成三项目 release bundle gate，只读，不启动上游。
4. 推荐并行：Java v57 + mini-kv v66。
   Java v57 做 rollback approval handoff sample，说明人工审批字段、数据库迁移确认、配置密钥确认；不执行 rollback SQL。
   mini-kv v66 做 restore compatibility handoff sample，说明 binary/WAL/Snapshot/fixture 兼容性确认；不执行真实 restore。
5. Node v166：rollback window readiness checklist，必须等待 Java v57 和 mini-kv v66 都完成后再做；合成跨项目人工窗口 checklist，仍然 dry-run。
```

## 并行依赖说明

```text
Java v56 与 mini-kv v65 推荐并行，因为两者都只在各自项目内部整理 release bundle evidence，不互相调用。
Node v164 是插入的 Node 内部重构版，不消费 Java v56 / mini-kv v65，也不阻塞其他窗口并行推进它们。
Node v165 不能提前做，因为它要消费 Java v56 和 mini-kv v65 的完成证据。
Java v57 与 mini-kv v66 推荐并行，因为两者都只补人工 handoff sample，不执行真实回滚。
Node v166 不能提前做，因为它要消费 Java v57 和 mini-kv v66 的完成证据。
```

## Node v164：release report shared helpers refactor

依赖关系：Node 内部重构插入版；不依赖 Java v56 / mini-kv v65。

完成状态：Node v164 已完成；其他窗口可并行推进 Java v56 和 mini-kv v65。

目标：

```text
收敛 v162/v163 release report 的重复 Markdown、blocking message、step rendering 和 digest helper。
```

本版本要落地：

- 新增 `releaseReportShared.ts`。
- 改造 v162 intake gate 和 v163 rollback runbook 使用公共 helper。
- 不改 endpoint。
- 不改 JSON 字段。
- 不读取、不修改、不启动 Java / mini-kv。

## Java v56：release bundle manifest

并行关系：推荐与 mini-kv v65 并行推进。

目标：

```text
把 Java release 交付物和验证证据收成一个只读 bundle manifest。
```

本版本要落地：

- 引用 jar artifact、contracts、release verification manifest、deployment rollback evidence。
- 记录 focused tests、non-Docker regression、package、HTTP smoke 的证据来源。
- 明确 Node 可以消费 bundle，但不能执行 Maven、不能触发 Java rollback。
- 不接生产数据库，不修改交易语义。

## mini-kv v65：runtime artifact bundle manifest

并行关系：推荐与 Java v56 并行推进。

目标：

```text
把 mini-kv runtime artifact、fixtures、WAL/Snapshot compatibility 和 smoke 证据收成一个只读 bundle manifest。
```

本版本要落地：

- 引用 binary version、release manifest、runtime artifact rollback evidence。
- 记录 CMake configure/build、CTest、read-only smoke、fixture inventory。
- 明确 LOAD/COMPACT/SETNXEX 仍只允许 CHECKJSON 解释，不执行。
- 不进入 Java 订单权威链路。

## Node v165：cross-project release bundle gate

依赖关系：必须等待 Java v56 和 mini-kv v65 都完成后推进。

目标：

```text
把 Java 与 mini-kv 的 release bundle evidence 合成跨项目 release bundle gate。
```

本版本要落地：

- 引用 Java v56 bundle manifest。
- 引用 mini-kv v65 bundle manifest。
- 引用 Node v163 rollback readiness runbook。
- 输出 JSON/Markdown gate。
- 默认只读，不自动启动 Java / mini-kv，不授权生产发布或回滚。

## Java v57：rollback approval handoff sample

并行关系：推荐与 mini-kv v66 并行推进。

目标：

```text
补 Java rollback 人工审批 handoff 样本。
```

本版本要落地：

- 固化 artifact version、runtime config、secret source、database migration direction 的人工确认字段。
- 明确 rollback SQL 不从样本执行。
- 明确 Node 只能消费 handoff，不触发 Java rollback。

## mini-kv v66：restore compatibility handoff sample

并行关系：推荐与 Java v57 并行推进。

目标：

```text
补 mini-kv restore compatibility 人工确认样本。
```

本版本要落地：

- 固化 binary/WAL/Snapshot/fixture compatibility 的人工确认字段。
- 明确 LOAD/COMPACT/SETNXEX 不由样本执行。
- 明确 restore compatibility 不能产生 Java order authority。

## Node v166：rollback window readiness checklist

依赖关系：必须等待 Java v57 和 mini-kv v66 都完成后推进。

目标：

```text
把 Java 与 mini-kv 的 handoff sample 合成跨项目 rollback window readiness checklist。
```

本版本要落地：

- 引用 Java v57 handoff。
- 引用 mini-kv v66 handoff。
- 生成 operator checklist。
- 默认只读或 dry-run。
- 不自动启动 Java / mini-kv。

## 暂停条件

- 需要真实生产密钥、生产数据库、生产 IdP 配置。
- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Node 自动启动 Java / mini-kv。
- 需要执行 Java rollback SQL、mini-kv LOAD/COMPACT、或任何真实回滚命令。
- 需要把 mini-kv 写入订单核心一致性链路。
- 需要修改已有已完成版本 tag 或重写历史归档。
- 对推进版本有疑惑时就暂停并停止自动化。

## 一句话结论

```text
v163 已收口回滚 readiness；下一阶段先做 release bundle 和 handoff 硬化，让三项目更接近生产交付流程，但仍不进入真实回滚执行。
```
