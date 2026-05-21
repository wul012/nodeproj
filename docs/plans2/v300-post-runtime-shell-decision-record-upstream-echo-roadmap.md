# Node v300 衍生计划：runtime shell decision record upstream echo verification 之后

来源版本：Node v300 `runtime shell decision record upstream echo verification`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v299-post-runtime-shell-candidate-gate-decision-roadmap.md` 已完成 Node v299、Java v135、mini-kv v132、Node v300；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v299：runtime shell candidate gate decision record 已完成；blocked decision record 已固化。
Java v135：runtime shell decision record echo 已完成；只读回显 Node v299 blocked decision record。
mini-kv v132：runtime shell decision record non-participation receipt 已完成；只确认 mini-kv 不参与 runtime shell implementation/invocation。
Node v300：runtime shell decision record upstream echo verification 已完成；三方对 Node v299 blocked decision record 已对齐。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v300：runtime shell decision record upstream echo verification。已完成。
   - 消费 Node v299 + Java v135 + mini-kv v132。
   - 只验证三方对 blocked decision record 一致。
   - 仍不做 runtime implementation，不实例化 provider/client，不读取 credential，不解析 raw endpoint，不发 HTTP/TCP。

2. Node v301：post-decision continuation plan intake。
   - 不新增 runtime shell implementation。
   - 对 v300 之后的链条做必要性证明：继续 blocked planning、暂停 runtime shell 链、还是提出新的显式审批前置。
   - 必须列清楚 blocker、consumer、停止条件、可复用报告。

3. 推荐并行：Java v136 + mini-kv v133。
   - Java v136：post-decision plan intake echo。
     只回显 Node v301 的计划入口，不写 ledger、不执行 SQL、不调用上游。
   - mini-kv v133：post-decision plan intake non-participation receipt。
     只确认 mini-kv 仍不参与 runtime implementation；不执行 LOAD、COMPACT、RESTORE、SETNXEX，不承载 audit/order 权威状态。

4. Node v302：post-decision plan intake upstream echo verification。
   - 必须等待 Java v136 + mini-kv v133 完成后再推进。
   - 消费两边 echo，确认三方对 v301 的 post-decision plan intake 一致。
   - 仍不实现 runtime shell。
```

## 显式质量优化项

```text
Node：
- v301 只能做 plan intake，不允许变成 runtime shell implementation。
- v301 必须写必要性证明：解决哪个 blocker、谁消费、为什么不能复用 v300、何时停止继续延伸。
- v301 继续使用 types / renderer / service / test 四件套；若 service 明显超过 700 行，先拆 helper。
- v301 继续补 evidence、解释、可渲染截图、代码讲解；不能写时必须说明原因。
- 单版/单提交目标小于 3000 changed lines；若需要新上游 evidence，优先冻结最小必要证据。
- 证据生成继续使用 stdin 管道或已有脚本，不使用长 node -e / tsx --eval。

Java：
- Java v136 与 mini-kv v133 可并行，但必须等待 Node v301。
- Java v136 只做 read-only echo，不做 runtime shell、不写 ledger、不执行 SQL、不调用外部 managed audit。

mini-kv：
- mini-kv v133 与 Java v136 可并行，但必须等待 Node v301。
- mini-kv v133 只做 non-participation receipt，不新增写命令、不做恢复/compact、不成为 audit/order 权威存储。

并行规则：
- 同一项目内部版本必须串行。
- Java v136 与 mini-kv v133 互不依赖，推荐并行。
- Node v302 必须等待 Java v136 + mini-kv v133 完成，不能与二者并行抢跑。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 实现、启用或调用 disabled runtime shell。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Node v301 未完成时，Java v136 / mini-kv v133 必须停止。
- Java v136 或 mini-kv v133 未完成时，Node v302 必须停止。

## 一句话结论

```text
v300 已经确认三方都认可 Node v299 blocked decision record；下一步不能直接实现 runtime shell，只能先做 Node v301 post-decision continuation plan intake，把是否继续这条链的必要性和停止条件写清楚。
```
