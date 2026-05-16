# Node v206 衍生计划：真实只读联调归档验证后的生产硬化

来源版本：Node v206 `three-project real-read runtime smoke archive verification`。

计划状态：已完成并收口。v207 已完成 post-real-read production hardening triage，并由 `v207-post-hardening-triage-roadmap.md` 接续。

## 阶段原则

v205 已证明三项目能真实读通，v206 验证了归档证据。下一阶段重点不再是“更多证据包”，而是把最关键的生产缺口拆成可验证的小闭环：

```text
managed audit persistence
operator identity / auth boundary
manual approval record boundary
CI artifact store dry-run boundary
rollback / restore control boundary
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
1. Node v207：post-real-read production hardening triage。已完成。
   消费 v206 archive verification，输出下一阶段硬门槛优先级矩阵。要求不是 summary 膨胀，而是明确选出 2-3 个真正阻塞生产雏形的能力，例如 managed audit、real identity、approval record、CI artifact store。

2. 推荐并行：Java v74 + mini-kv v83。下一步。
   Java v74 可以补 release approval rehearsal 的 audit-persistence handoff hint，说明哪些只读字段未来可进入 Node managed audit；mini-kv v83 可以补 runtime artifact path / binary provenance hint，说明真实运行二进制和 fixture 版本如何对应。两边都只做只读证据，不做业务写入。

3. Node v208：managed audit persistence boundary candidate。
   根据 Node v207 和 Java v74 / mini-kv v83，选择 managed audit 作为第一个真实硬门槛候选：定义 adapter contract、file/sqlite candidate、retention/rotation 约束和失败模式；默认不切换生产。

4. Node v209：managed audit persistence dry-run verification。
   消费 v208 candidate，验证 dry-run audit persistence 的写入边界、清理策略和故障降级。若需要真实文件写入，只写 Node 本地测试临时目录，不写 Java 或 mini-kv。
```

## 可并行说明

```text
Java v74 + mini-kv v83 推荐并行推进。
Node v207 可以先做，因为它是 triage，不依赖两边新增字段。
Node v208 应等 Java v74 + mini-kv v83 完成后再消费；如果两边未完成，则 Node v208 只允许记录缺口，不允许假装已接入。
```

## 暂停条件

- 需要打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 需要创建真实 Java approval decision、写 Java ledger、执行 deployment / rollback / SQL。
- 需要 mini-kv 执行 LOAD/COMPACT/SETNXEX/RESTORE。
- 需要连接生产数据库、生产 IdP、生产审计系统或读取生产密钥。
- 需要真实 GitHub artifact upload 或修改 CI 权限。
- 对推进版本有疑惑时暂停。

## 一句话结论

```text
v207-v209 不再证明“三项目能读通”，而是开始收敛“为什么还不能生产化”的硬门槛，并优先推进 managed audit persistence 这一条真实生产雏形能力。
```
