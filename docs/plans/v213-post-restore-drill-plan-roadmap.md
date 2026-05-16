# Node v213 衍生计划：restore drill 归档与 dry-run adapter 候选

来源版本：Node v213 `managed audit packet restore drill plan`。

计划状态：已完成并收口。v211-v215 已完成 managed audit packet 的本地 dry-run 生成、复核、恢复演练计划、v213 archive verification、Java/mini-kv 上游 no-write 回执消费，以及 Node 本地 dry-run adapter candidate。下一阶段应另起 post-v215 计划，不能在本文件继续追加重合版本。

## 阶段原则

```text
先验证 v213 restore drill plan 归档
再补 Java / mini-kv 对 dry-run adapter 的只读边界回执
最后由 Node 做 dry-run adapter candidate
```

继续保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
restoreExecutionAllowed=false
不执行 Java 写操作
不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE
不连接真实外部审计系统
```

## 推荐执行顺序

```text
1. Node v214：已完成 managed audit restore drill archive verification。
   消费 Node v213 的 HTML、截图、解释、代码讲解、测试记录、HTTP smoke 记录和计划收口状态，验证归档完整性、digest/marker 字段、forbidden operations 和 cleanup 证据。只做归档验证，不新增 adapter，也不重新触发 Java/mini-kv 联调。

2. 推荐并行：Java v77 + mini-kv v86，已完成。
   - Java v77：managed audit adapter boundary receipt。只读说明 Java approval handoff marker 不允许 Node dry-run adapter 创建真实 approval decision、approval ledger、SQL、deployment 或 rollback。
   - mini-kv v86：managed audit adapter restore boundary receipt。只读说明 mini-kv 仍不执行 LOAD/COMPACT/SETNXEX/RESTORE，不写 managed audit，不承担订单权威状态。

3. Node v215：已完成 managed audit dry-run adapter candidate。
   消费 Node v214、Java v77、mini-kv v86，只实现 Node 本地 dry-run adapter candidate。允许写 Node 本地 `.tmp` 或受控测试文件，不连接真实外部审计系统，不写 Java/mini-kv。若 adapter candidate 需要生产级配置、数据库或真实凭据，暂停并另起计划。
```

## 本阶段可合并/并行规则

```text
Node v214 已完成，因为它只依赖 Node v213。
Java v77 + mini-kv v86 已同轮并行完成，给 Node v215 提供上游 no-write 边界回执。
Node v215 已消费 Java v77 + mini-kv v86，并完成本地 dry-run adapter candidate。下一阶段必须另起新计划。
```

## 质量优化插队项

```text
Node v214 已完成：
- 验证 v213 的 evidence hints 都是项目相对路径。
- 检查 v213 archive 是否包含截图、HTML、解释、代码讲解和计划收口。

Node v215 已完成：
- managed audit dry-run adapter candidate 使用本地 `.tmp` JSONL append/query/digest/cleanup，小闭环内没有连接真实 adapter。

post-v215 后续视工作量做：
- v215 archive verification。
- collectProductionBlockers 声明式 rules 重构，只有在不降低可读性时执行。
- classifyError 增加 ECONNREFUSED / TIMEOUT / unknown network error 区分，必须基于现有 client 错误形状。
- managed audit dry-run adapter 的公共 result formatter / digest helper 抽取，避免后续真实 adapter 候选文件过大。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要连接真实外部 managed audit、生产数据库、生产 IdP 或读取生产密钥。
- 需要 Java 创建真实 approval decision、写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载订单权威状态。
- Node v215 需要写 `.tmp` 或受控测试文件以外的路径。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v215 已经完成第一版 Node 本地 dry-run adapter candidate；下一步必须另起 post-v215 计划，先验证 v215 archive，再讨论真实 adapter 的生产级硬门槛。
```
