# Node v217 衍生计划：真实 managed audit adapter 前的质量收口与硬门槛

来源版本：Node v217 `managed audit adapter production-hardening readiness gate`。

计划状态：当前唯一有效全局计划。v217 已消费 Node v216、Java v78、mini-kv v87，确认真实 managed audit adapter 前的硬门槛已经能被 Node 只读汇总；但它仍然没有连接真实 managed audit，也没有打开生产窗口。下一阶段先做质量收口和上游只读回执，再进入真实 adapter wiring 的小步准备。

## 阶段原则

```text
先收口 Node audit route / managedAudit* 重复结构
再让 Java / mini-kv 推荐并行补只读优化回执
最后由 Node 做真实 adapter wiring 前的最小 implementation precheck
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
1. Node v218：已完成 audit route + managed audit helper quality pass。
   合并处理两个优化点：抽取 auditRoutes 的 JSON/Markdown 注册辅助函数，并把 managed audit readiness gate 相关 digest / message / endpoint helpers 收敛到小 helper，避免后续真实 adapter 版本继续膨胀。只做 Node 内部结构优化，不改变 API 路径、不连接真实 managed audit、不新增 Java/mini-kv 调用。

2. 推荐并行：Java v79 + mini-kv v88。
   - Java v79：OpsEvidenceService quality split receipt。只读说明 release approval evidence 的 receipt / digest / hint / render / record 职责拆分计划或首轮安全拆分结果，继续不创建 approval decision、不写 ledger、不执行 SQL。
   - mini-kv v88：command dispatch quality receipt。只读说明 command.cpp 可按命令族或 handler table 拆分，若实际拆分则必须保持 INFOJSON/SMOKEJSON/HEALTH/readonly fixture 行为不变，不执行 restore/write/admin 命令。

3. Node v219：managed audit adapter implementation precheck packet。
   消费 Node v218、Java v79、mini-kv v88，输出真实 adapter wiring 前的最小 precheck：配置开关、owner approval、schema migration、retention/recovery、failure taxonomy、rollback disable path。仍不连接真实 managed audit，只给后续 v220+ 的小步 implementation 做闸门。
```

## 本阶段可合并/并行规则

```text
Node v218 已把 auditRoutes helper 和 managedAudit* helper 收口放在同一版，因为它们同属 Node 路由/报告重复结构治理，且不依赖上游。
Java v79 + mini-kv v88 推荐并行推进，因为二者都只是质量/只读回执，不互相依赖，也不会阻塞对方。
Node v219 必须等 Java v79 + mini-kv v88 完成后再消费；若两边未完成，应记录缺口并停止。
```

## 质量优化插队项

```text
Node v218 已完成：
- auditRoutes.ts 抽公共 JSON/Markdown route registrar，减少重复 schema + format 分支。
- managed audit production-hardening readiness gate 抽 endpoint / digest / message helper。
- 新增 route helper quality pass profile，证明 API path/response shape 不变，且未新增 Java/mini-kv client。

Java v79 推荐：
- OpsEvidenceService.java 按 receipt / digest / hint / render / record 拆分或给出可执行拆分回执。
- 保持 release approval rehearsal 只读，不借重构新增写能力。

mini-kv v88 推荐：
- command.cpp 按命令族或 handler table 拆分 dispatch，优先不碰 WAL/snapshot/restore 核心。
- 保持 INFOJSON / SMOKEJSON / HEALTH / readonly fixture 输出兼容。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要连接真实外部 managed audit、生产数据库、生产 IdP 或读取生产密钥。
- 需要 Java 创建真实 approval decision、写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载订单权威状态。
- Node v218 的重构需要同时改多个不相关业务域，导致版本范围失控。
- Node v219 发现 Java v79 / mini-kv v88 未完成或证据不足。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v217 已经把真实 managed audit adapter 前的硬门槛汇总成只读 gate；下一阶段不要急着接真 adapter，先把 Node 重复结构收口，再让 Java/mini-kv 并行补质量回执，最后 Node 做 implementation precheck。
```
