# Node v221 衍生计划：真实 managed audit 连接前的 review / migration / credential 闸门

来源版本：Node v221 `managed audit local adapter candidate dry-run`。

计划状态：当前唯一有效全局计划。v221 已消费 Node v220、Java v80、mini-kv v89，并完成本地 JSONL adapter candidate dry-run；Node v222 已完成 local adapter candidate verification report，只读验证 v221 archive / record shape / digest linkage / cleanup evidence，不重跑 v221 dry-run，也不新增写能力。下一步应推荐并行推进 Java v81 + mini-kv v90，再讨论 Node v223 的真实外部 adapter connection readiness review。

## 阶段原则

```text
先验证 v221 local candidate 的 record / digest / cleanup
再让 Java / mini-kv 推荐并行补真实 adapter 前的只读 migration / credential guard
最后 Node 做 real adapter connection readiness review，而不是直接连生产审计
```

继续保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionAudit=false
readyForProductionWindow=false
restoreExecutionAllowed=false
默认不连接真实外部 managed audit
不执行 Java approval / ledger / SQL / deployment / rollback
不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE
```

## 推荐执行顺序

```text
1. Node v222：已完成 managed audit local adapter candidate verification report。
   消费 Node v221，验证 local candidate 的 record shape、digest linkage、cleanup evidence、Java v80 / mini-kv v89 guard linkage。仍不连接真实外部 managed audit，不新增写能力。

2. 下一步推荐并行：Java v81 + mini-kv v90。
   - Java v81：managed audit external adapter migration guard receipt。只读说明真实外部 adapter 前仍需要 owner approval、schema migration review、credential review；Java 不写 ledger、不执行 SQL。
   - mini-kv v90：managed audit external adapter non-participation receipt。只读说明真实外部 managed audit adapter 不以 mini-kv 为存储后端，mini-kv 只保留 runtime evidence provider 角色。

3. Node v223：managed audit external adapter connection readiness review。
   消费 Node v222、Java v81、mini-kv v90，形成真实外部 adapter 连接前的 readiness review；不读取生产密钥、不连接真实数据库、不打开生产审计窗口。
```

## 本阶段可合并/并行规则

```text
Node v222 已完成 verification report，不应和真实外部连接 readiness 合并。
Java v81 + mini-kv v90 推荐并行，因为二者都是只读 guard receipt，不互相依赖。
Node v223 必须等 Java v81 + mini-kv v90 完成后再消费；若两边未完成，应记录缺口并停止。
```

## 质量优化插队项

```text
Node v222：
- 已把 v221 的 local adapter record / digest / cleanup verification 固化成 report，不新增第二套 dry-run 写入。
- 继续控制 managedAudit* 服务文件体积，若单文件超过 800 行，优先拆 helper。
- 当前 Node 质量趋势仍在上升，但还剩少量旧 audit 路由未迁移；后续 Node 版本若碰到 auditRoutes 中重复 querystring schema / format 分支，应优先迁移到 registerAuditJsonMarkdownRoute，不再复制 12 个近似路由模式。

Java v81：
- 继续控制 OpsEvidenceService 膨胀，若只是新增 guard receipt，优先放入已拆分的 receipt/digest/helper 结构。
- OpsEvidenceService.java 已成为 Java 侧最大单文件之一；Java v81 若继续补 guard receipt，应优先考虑 builder / 子 service / receipt helper，避免继续追加布尔参数链和长构造器。

mini-kv v90：
- 继续避免 command.cpp 膨胀；只读回执优先复用 runtime evidence helper，不碰 WAL/snapshot/restore 核心。
- command.cpp 仍保持结构清晰但体积偏大；mini-kv v90 若新增只读 receipt，应避免扩大主 if-chain，优先考虑按命令类别拆 helper 或向 dispatch table 过渡。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要真实外部 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Java 创建真实 approval decision、写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载订单权威状态。
- Node v222 想再次做新的 dry-run 写入，应暂停并确认是否超出 verification report 范围。
- Node v223 发现 Java v81 / mini-kv v90 未完成或证据不足。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v221 已经证明本地 adapter candidate 可以 append/query/digest/cleanup，v222 已经只读验证这份证据；下一步推荐并行补 Java v81 + mini-kv v90 的真实外部连接前 guard，不能直接跳到生产审计连接。
```
