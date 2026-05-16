# Node v215 衍生计划：dry-run adapter 归档验证与真实 adapter 前硬门槛

来源版本：Node v215 `managed audit dry-run adapter candidate`。

计划状态：已完成并收口。v216 已完成 v215 dry-run adapter candidate archive verification；Java v78 + mini-kv v87 已推荐并行完成真实 adapter 前硬门槛只读回执；Node v217 已完成 managed audit adapter production-hardening readiness gate。下一阶段由 `v217-post-production-hardening-gate-roadmap.md` 接续。

## 阶段原则

```text
先验证 v215 dry-run adapter candidate 归档
再补 Java / mini-kv 对真实 adapter 前硬门槛的只读回执
最后由 Node 做 managed audit adapter production-hardening readiness gate
```

继续保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
restoreExecutionAllowed=false
不连接真实外部 managed audit
不执行 Java approval / ledger / SQL / deployment / rollback
不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE
```

## 推荐执行顺序

```text
1. Node v216：已完成 managed audit dry-run adapter archive verification。
   消费 Node v215 的 HTML、截图、解释、代码讲解、测试记录、HTTP smoke 记录和 plan 收口状态，验证 v215 本地 JSONL adapter dry-run 证据完整性、append/query/digest/cleanup 字段、Java v77 / mini-kv v86 receipt 字段和 forbidden operations。只做归档验证，不新增真实 adapter，也不重新触发 Java/mini-kv 联调。

2. 下一步推荐并行：Java v78 + mini-kv v87。
   - Java v78：managed audit production adapter prerequisite receipt。只读说明真实 adapter 前必须具备 operator identity、approval decision source、ledger handoff、retention owner、failure handling 和 rollback review，但本版不创建真实 approval decision、不写 ledger、不执行 SQL。
   - mini-kv v87：managed audit adapter non-authoritative storage receipt。只读说明 mini-kv 不作为 managed audit store、不作为订单权威状态、不执行 restore/write/admin 命令，并提供 Node v217 可消费的 receipt digest。

3. Node v217：已完成 managed audit adapter production-hardening readiness gate。
   消费 Node v216、Java v78、mini-kv v87，汇总真实 adapter 前的硬门槛：外部审计存储配置、身份/审批/ledger 绑定、retention/recovery、failure taxonomy、operator runbook、cleanup 证据。仍然不连接真实 managed audit，也不打开生产窗口。
```

## 本阶段可合并/并行规则

```text
Node v216 已完成，因为它只依赖 Node v215。
Java v78 + mini-kv v87 推荐与 Node v216 同轮并行推进，给 Node v217 提供真实 adapter 前置硬门槛回执。
Node v217 已在 Java v78 + mini-kv v87 完成后消费两边回执；下一阶段不在本文件继续追加重合版本。
```

## 质量优化插队项

```text
Node v216 已完成：
- 验证 v215 archive 包含 HTML、截图、解释、代码讲解和 plan 收口。
- 验证 v215 local JSONL dry-run 的 append/query/digest/cleanup 证据被归档记录。

Node v217 已完成：
- 消费 Node v216、Java v78、mini-kv v87，形成真实 adapter 前的 production-hardening readiness gate。
- 明确 `readyForProductionAudit=false`、`connectsManagedAudit=false`、`executionAllowed=false`、`restoreExecutionAllowed=false`。

后续质量优化已迁移到 `v217-post-production-hardening-gate-roadmap.md`，避免同一份计划继续重合扩展。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要连接真实外部 managed audit、生产数据库、生产 IdP 或读取生产密钥。
- 需要 Java 创建真实 approval decision、写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载订单权威状态。
- Node v217 需要写 `.tmp` 或受控测试文件以外的路径。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v215-v217 已完成本地 dry-run adapter candidate、归档验证、上游只读回执消费和真实 adapter 前 readiness gate；下一阶段转入质量收口与真实 adapter wiring 前的 implementation precheck。
```
