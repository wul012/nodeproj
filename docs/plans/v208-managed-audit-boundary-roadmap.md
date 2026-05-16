# Node v208 衍生计划：managed audit dry-run 验证与身份审批绑定

来源版本：Node v208 `managed audit persistence boundary candidate`。

计划状态：已完成并收口。v208 已把 managed audit persistence 从方向选择推进到边界候选；Node v209 已完成最小 dry-run 验证，不连接真实外部审计系统。后续由 `v209-managed-audit-dry-run-roadmap.md` 接续。

## 阶段原则

```text
先验证 Node 本地 dry-run audit record 可以 append/query/digest/cleanup
再把 operator identity 和 manual approval record 绑定到 audit record shape
最后才考虑真实 managed adapter、CI artifact store 或 rollback control
```

仍然保持：

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
1. Node v209：managed audit persistence dry-run verification。已完成。
   消费 Node v208 candidate，在 Node 本地测试临时目录写一条 dry-run audit record，完成 append/query/digest/cleanup 验证。未写 Java 或 mini-kv，未连接真实 managed audit。

2. Node v210：operator identity + approval record binding plan。下一步。
   消费 v209 dry-run 结果，把 operator identity 和 manual approval record 字段绑定到 audit record shape；只做 schema/contract，不做真实审批执行。

3. 推荐并行：Java v75 + mini-kv v84。
   Java v75 可补 approval record handoff hint，只读描述哪些 approval 字段未来可进入 Node audit record；mini-kv v84 可补 runtime evidence retention / provenance check 的只读增强。两边都不写业务状态。

4. Node v211：managed audit + identity + approval dry-run packet。
   消费 Node v210 和 Java v75 / mini-kv v84，只在 Node 临时目录生成一条带 identity/approval/provenance 的 dry-run audit packet。
```

## 可并行说明

```text
Node v209 可直接推进，因为它只依赖 Node v208。
Java v75 + mini-kv v84 推荐在 Node v210 前后并行推进，用于补充身份/审批绑定的上游只读证据。
Node v211 应等 Java v75 + mini-kv v84 完成后再消费；若两边未完成，Node v211 只能记录缺口。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要 Java 创建真实 approval decision、写 ledger、执行 deployment / rollback / SQL。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE。
- 需要连接真实外部审计系统、生产数据库、生产 IdP 或读取生产密钥。
- v209 dry-run 需要写出 Node 本地临时目录以外的路径。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v209 的目标不是生产化审计，而是证明 Node 可以在受控临时目录里完成一条 managed audit dry-run record 的 append/query/digest/cleanup 小闭环。该目标已完成，下一步进入 identity + approval record binding。
```
