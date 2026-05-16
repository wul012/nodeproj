# Node v211 衍生计划：managed audit packet 后续硬化

来源版本：Node v211 `managed audit identity approval provenance dry-run packet`。

计划状态：当前唯一有效全局计划。v211 已经把 Node v210、Java v75、mini-kv v84 汇成一条本地 dry-run audit packet，并完成 append/query/digest/cleanup。下一阶段不能直接连真实 managed audit，应先补 packet verification、backup/restore drill 和 adapter 边界。

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
1. Node v212：managed audit packet verification report。
   消费 Node v211 packet，验证 packet shape、digest linkage、identity/approval/provenance 字段和 cleanup evidence。只读报告，不再次扩展真实写入范围。

2. 推荐并行：Java v76 + mini-kv v85。
   Java v76 可补 approval handoff verification marker，只读说明 v75 handoff 如何被 Node v211 消费。mini-kv v85 可补 retention provenance replay marker，只读说明 v84 evidence 如何被 Node v211 消费。两边都不写业务状态。

3. Node v213：managed audit packet restore drill plan。
   消费 Node v212 和 Java v76 / mini-kv v85，生成本地 dry-run restore drill plan，只说明如何重建 packet evidence，不执行真实 restore、不连真实 managed audit。
```

## 可并行说明

```text
Node v212 可以直接推进，因为它只依赖 Node v211。
Java v76 + mini-kv v85 推荐与 Node v212 并行推进，给 Node v213 提供更稳的上游消费回执。
Node v213 应等待 Java v76 + mini-kv v85 完成后再消费；如果两边未完成，应记录缺口并停止。
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
v211 证明了 managed audit packet 的本地 dry-run 形状，下一阶段要验证它是否可复查、可恢复、可作为未来真实 managed audit adapter 的输入，而不是立刻上生产存储。
```
