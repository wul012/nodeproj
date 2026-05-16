# Node v223 衍生计划：sandbox managed audit adapter dry-run 前置计划

来源版本：Node v223 `managed audit external adapter connection readiness review`。

计划状态：当前唯一有效全局计划。v223 已消费 Node v222、Java v81、mini-kv v90，确认真实外部 managed audit adapter 连接前的 owner approval、schema migration review、credential review、mini-kv 非参与边界和生产阻断状态。Node v224 已完成 sandbox-only adapter dry-run plan，并把质量优化写成 profile 中的硬性 `qualityGates`。下一步推荐并行 Java v82 + mini-kv v91，只读补 sandbox 前 guard。

## 阶段原则

```text
先定义 sandbox adapter dry-run 的 credential / schema / owner approval 边界
再让 Java / mini-kv 推荐并行补 sandbox 前只读 guard
最后 Node 做 sandbox adapter dry-run package，而不是连接生产 audit
```

继续保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
restoreExecutionAllowed=false
默认不读取生产 credential
默认不连接真实生产 managed audit
不执行 Java approval / ledger / SQL / deployment / rollback
不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE
```

## 推荐执行顺序

```text
1. Node v224：managed audit sandbox adapter dry-run plan。（已完成）
   消费 Node v223，定义 sandbox-only adapter dry-run 所需的 owner approval artifact、test credential handle、schema migration rehearsal checklist、failure rollback path 和 no-production-secret 规则。只做计划和 profile，不连接任何外部审计；同时输出 `qualityGates`，把本阶段优化要求变成机器可读验收门槛。

2. 推荐并行：Java v82 + mini-kv v91。
   - Java v82：sandbox adapter approval/schema rehearsal guard receipt。只读说明 Java 侧 sandbox adapter dry-run 前仍需要 owner approval artifact、schema migration rehearsal 和 no production credential；不写 ledger、不执行 SQL。
   - mini-kv v91：sandbox adapter runtime evidence non-participation receipt。只读说明 sandbox adapter dry-run 仍不以 mini-kv 为 storage backend，不读 credential，不写 managed audit state。

3. Node v225：managed audit sandbox adapter dry-run package。
   消费 Node v224、Java v82、mini-kv v91，生成 sandbox-only dry-run package；默认不启动外部服务、不读取真实 credential value、不打开生产审计窗口。
```

## 本阶段可合并/并行规则

```text
Node v224 是 plan/profile，已完成；不能和 Node v225 dry-run package 合并。
Java v82 + mini-kv v91 推荐并行，因为二者都是 sandbox 前只读 guard，不互相依赖。
Node v225 必须等 Java v82 + mini-kv v91 完成后再消费；若两边未完成，应记录缺口并停止。
```

## 显式硬性质量验收门槛

以下不是“建议项”，而是对应版本的收口门槛。若实现时无法满足，必须暂停、拆分或在归档中说明阻塞原因，不能把版本按完成处理。

```text
Node v224：（已完成并在 profile 中输出 qualityGates）
- 必须在 profile 中输出 qualityGates 字段，把本节门槛作为机器可读证据。
- managedAudit* 新增服务文件必须控制体积；若接近 800 行，必须先拆 evidence reader / checks helper。
- auditRoutes 必须继续使用 registerAuditJsonMarkdownRoute，不允许新增重复 querystring schema。
- v224 必须形成完整 sandbox dry-run plan 闭环，不允许只做 summary/check 小项。

Java v82：
- 必须沿用 v81 builder / helper 拆分方式，不允许把新 receipt 继续堆进 OpsEvidenceService。
- 不允许新增长布尔参数构造链；若字段增加，必须按 owner approval / schema rehearsal / credential boundary 分组。
- 若做不到上述两点，Java v82 不应收口，应暂停并拆分。

mini-kv v91：
- 不允许继续膨胀 command.cpp 主 if-chain；sandbox 只读 evidence 必须优先复用 runtime evidence helper。
- 不允许触碰 WAL/snapshot/restore 核心，不允许把 mini-kv 接成 sandbox audit storage backend。
- 若不得不扩大 command.cpp，必须在 v91 归档中说明原因并补测试证据。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node 读取 credential value 而不是 credential handle / review status。
- 需要 Java 创建真实 approval decision、写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Node v225 发现 Java v82 / mini-kv v91 未完成或证据不足。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v224 已把 sandbox dry-run plan 和显式质量门槛收口；下一步推荐并行 Java v82 + mini-kv v91，仍不能直接连生产 managed audit。
```
