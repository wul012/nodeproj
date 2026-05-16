# Node v207 衍生计划：生产硬化分诊后的 managed audit 主线

来源版本：Node v207 `post-real-read production hardening triage`。

计划状态：当前下一阶段计划。v207 已经把 v204-v206 的真实只读联调/归档阶段转成生产硬化分诊；后续不再继续叠 archive-only summary，而是推进 managed audit 这条真实生产雏形能力。

## 阶段原则

下一阶段只做小闭环，不做大重构：

```text
先让审计记录可持久、可查询、可降级
再绑定真实身份和审批记录
最后再考虑 CI artifact store 和 rollback control
```

仍然保持：

```text
UPSTREAM_ACTIONS_ENABLED=false
readyForProductionWindow=false
不执行 Java 写操作
不执行 mini-kv LOAD/COMPACT/SETNXEX/RESTORE
不读取生产密钥
```

## 推荐执行顺序

```text
1. 推荐并行：Java v74 + mini-kv v83。
   Java v74：补 release approval rehearsal 的 audit-persistence handoff hint，只说明哪些只读字段未来可进入 Node managed audit，不写 ledger。
   mini-kv v83：补 runtime artifact path / binary provenance hint，只说明真实运行二进制、fixture、release evidence 如何对应，不做 LOAD/RESTORE/COMPACT。

2. Node v208：managed audit persistence boundary candidate。
   消费 Node v207 + Java v74 + mini-kv v83，只定义 managed audit adapter contract、file/sqlite candidate、retention/rotation、failure mode 和降级策略；默认不切换生产，不连接真实外部审计系统。

3. Node v209：managed audit persistence dry-run verification。
   消费 v208 candidate，验证 dry-run 写入边界、临时目录清理、故障降级和 digest 记录。只写 Node 本地测试临时目录，不写 Java 或 mini-kv。

4. Node v210：operator identity + approval record binding plan。
   在 managed audit dry-run 稳定后，把 operator identity 和 manual approval record 接入审计记录模型；仍不执行真实生产写操作。
```

## 可并行说明

```text
Java v74 + mini-kv v83 推荐并行推进。
Node v208 必须等 Java v74 + mini-kv v83 的只读证据完成后再消费；如果两边未完成，Node v208 只允许记录缺口，不允许假装已接入。
Node v209 只依赖 Node v208，可以在 v208 完成后连续推进。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要创建真实 Java approval decision、写 Java ledger、执行 deployment / rollback / SQL。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE。
- 需要连接生产数据库、生产 IdP、生产审计系统或读取生产密钥。
- 需要真实 GitHub artifact upload 或修改 CI 权限。
- Java v74 或 mini-kv v83 未完成却要推进 Node v208 时暂停。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v208-v210 应优先把 managed audit 从“概念和 contract”推进到“可 dry-run 验证的持久化边界”，再把身份和审批记录绑定上去。
```
