# Node v211 衍生计划：managed audit packet 后续硬化

来源版本：Node v211 `managed audit identity approval provenance dry-run packet`。

计划状态：已完成并收口。v211 已经把 Node v210、Java v75、mini-kv v84 汇成一条本地 dry-run audit packet，并完成 append/query/digest/cleanup。Node v212 已完成 packet verification report，并同步收掉 v205 runtime smoke 两个轻量质量优化。Java v76 + mini-kv v85 已作为同轮推荐并行证据完成，Node v213 已消费两边只读回执并生成 managed audit packet restore drill plan。后续如果继续推进，应另起新计划，不能在本文件继续追加重合版本。

## 阶段原则

```text
先验证 v211 packet archive / replay / restore 边界
再评估 managed audit adapter 的最小真实实现
最后才考虑生产审计存储或真实 approval execution
```

继续保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
不执行 Java 写操作
不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE
不连接真实外部审计系统
```

## 推荐执行顺序

```text
1. 同轮推荐并行：
   - Node v212：已完成 managed audit packet verification report。消费 Node v211 packet，验证 packet shape、digest linkage、identity/approval/provenance 字段和 cleanup evidence。只读报告，不再次扩展真实写入范围。本版同时完成一组小型 Node 质量优化：修正 v205 `threeProjectRealReadRuntimeSmokeExecutionPacket` 中 mini-kv `readCommands` 与实际 `SMOKEJSON/INFOJSON/STORAGEJSON/HEALTH` 执行列表不一致的问题，并把 `records.filter(...)` 重复统计收敛为一次性 counts helper，供 `smokeSession`、`summary`、`createChecks`/相关判断复用。
   - Java v76：待完成 approval handoff verification marker。只读说明 v75 handoff 如何被 Node v211 消费，不写业务状态。
   - mini-kv v85：待完成 retention provenance replay marker。只读说明 v84 evidence 如何被 Node v211 消费，不执行 managed audit 写入。

2. Node v213：已完成 managed audit packet restore drill plan。
   消费 Node v212 和 Java v76 / mini-kv v85，生成本地 dry-run restore drill plan，只说明如何重建 packet evidence，不执行真实 restore、不连真实 managed audit。本版已在 v213 输出范围内完成 evidence hint 归一化，使用项目相对路径，不大范围重写历史 endpoint。
```

## 已确认的质量优化插队项

```text
Node v212 必做：
- 修正 v205 mini-kv readCommands 声明与 runTarget 实际执行命令不同源的问题。
- 为 v205 runtime smoke records 提取一次性 counts helper，减少多处重复 filter。

Node v213 或 v214 视工作量推进：
- evidence endpoint 文档性路径去硬编码，优先处理 v205 与 managed-audit 相关报告。
- collectProductionBlockers 可改为声明式 rules，但只有在不降低可读性时执行。
- classifyError 可增加 ECONNREFUSED / TIMEOUT / unknown network error 区分，但必须基于现有 client 错误形状，避免臆造分类。
```

## 可并行说明

```text
Node v212 已完成，因为它只依赖 Node v211。
Java v76 + mini-kv v85 已与 Node v212 同轮并行完成，并已作为 Node v213 的上游消费回执。
Node v213 已完成。下一阶段应另起计划，优先做 v213 archive verification 或第一版 dry-run managed audit adapter candidate。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Java 创建真实 approval decision、写 ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载订单权威状态。
- 需要连接真实外部审计系统、生产数据库、生产 IdP 或读取生产密钥。
- Node 需要写 `.tmp` 和归档目录以外的路径。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v211-v213 已证明 managed audit packet 的本地 dry-run 形状、复核报告和恢复演练计划。下一阶段要先验证 v213 归档，再考虑 dry-run adapter candidate，而不是立刻上生产存储。
```
