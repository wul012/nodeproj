# Node v209 衍生计划：managed audit identity / approval binding

来源版本：Node v209 `managed audit persistence dry-run verification`。

计划状态：当前唯一有效全局计划。v209 已证明 Node 可以在本地 `.tmp` 受控临时目录完成一条 dry-run audit record 的 append/query/digest/cleanup，并在响应前清理临时目录。下一步进入 operator identity 与 manual approval record 的字段绑定，不连接真实 managed audit，不写 Java 或 mini-kv。

## 阶段原则

```text
先把 audit record 的 identity / approval / provenance 字段稳定下来
再消费 Java / mini-kv 的只读 handoff evidence
最后才生成带 identity/approval/provenance 的 dry-run audit packet
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
1. Node v210：operator identity + approval record binding contract。
   消费 Node v209 dry-run verification，定义 audit record 里 operator identity、approval request、approval decision、correlation id 的字段绑定和缺失字段阻断规则。只做 schema/contract 与测试，不创建真实 approval decision，不写真实 ledger。

2. 推荐并行：Java v75 + mini-kv v84。
   Java v75 补 approval record handoff hint，只读描述哪些 approval 字段未来可进入 Node audit record。mini-kv v84 补 runtime evidence retention / provenance check 的只读增强。两边都不写业务状态，不让 mini-kv 进入订单权威存储。

3. Node v211：managed audit + identity + approval dry-run packet。
   消费 Node v210 和 Java v75 / mini-kv v84，只在 Node 本地临时目录生成一条带 identity/approval/provenance 的 dry-run audit packet，继续验证 append/query/digest/cleanup。
```

## 可并行说明

```text
Node v210 可直接推进，因为它只依赖 Node v209。
Java v75 + mini-kv v84 推荐与 Node v210 并行推进，用于给 Node v211 提供更完整的上游只读 evidence。
Node v211 应等待 Java v75 + mini-kv v84 完成后再消费；如果两边未完成，Node v211 只能记录缺口并停止，不应抢跑。
```

## 质量优化要求

```text
后续 Node 版本继续避免 summary 小碎片化。
每版至少形成一个可解释、可验证的小闭环。
如果 managed audit 相关文件接近过大，应优先抽 shared helper / formatter / validator，而不是继续堆单文件。
计划文件不得和旧计划出现重合版本；当前计划做完后另起新计划。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Java 创建真实 approval decision、写 ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载订单权威状态。
- 需要连接真实外部审计系统、生产数据库、生产 IdP 或读取生产密钥。
- Node dry-run 需要写出 `.tmp` 临时目录以外的路径。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v209 之后的重点不是继续证明“能写临时文件”，而是把生产审计真正需要的 operator identity、approval record 和 provenance 字段绑定清楚。
```
