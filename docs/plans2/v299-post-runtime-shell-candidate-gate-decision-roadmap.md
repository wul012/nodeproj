# Node v299 衍生计划：runtime shell candidate gate decision record 之后

来源版本：Node v299 `runtime shell candidate gate decision record`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v298-post-runtime-shell-candidate-gate-upstream-echo-roadmap.md` 已完成 Node v298；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v297：disabled runtime shell implementation candidate gate 已完成；五个 candidate gate 和 blocked decision 已固化。
Java v134：runtime shell candidate gate echo 已完成；只回显 Node v297 的五个候选门槛和 blocked decision。
mini-kv v131：runtime shell candidate gate non-participation receipt 已完成；只确认 mini-kv 不参与 runtime shell candidate implementation/invocation。
Node v298：runtime shell candidate gate upstream echo verification 已完成；三方对 v297 blocked gate 已对齐。
Node v299：runtime shell candidate gate decision record 进行中/待收口；只记录三方 verified blocked decision。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v299：runtime shell candidate gate decision record。
   - 消费 Node v298 verification。
   - 只记录三方 verified blocked decision。
   - 仍不做 runtime implementation，不实例化 provider/client，不读取 credential，不解析 raw endpoint，不发 HTTP/TCP。

2. 推荐并行：Java v135 + mini-kv v132。
   - Java v135：runtime shell decision record echo。
     只回显 Node v299 的 blocked decision record；不写 ledger、不执行 SQL、不调用上游。
   - mini-kv v132：runtime shell decision record non-participation receipt。
     只确认 mini-kv 不参与 decision record 后的 runtime implementation；不执行 LOAD、COMPACT、RESTORE、SETNXEX，不承载 audit/order 权威状态。

3. Node v300：runtime shell decision record upstream echo verification。
   - 必须等待 Java v135 + mini-kv v132 完成后再推进。
   - 消费两边 echo，验证三方对 Node v299 blocked decision record 一致。
   - 仍不实现 runtime shell。
```

## 显式质量优化项

```text
Node：
- v299 继续使用 types / renderer / service / test 四件套。
- v299 只记录 blocked decision，不引入新的 runtime gate 或新的 implementation gate。
- v299 不复制 Java v134 / mini-kv v131 的全部长文本，只消费 Node v298 profile。
- 新增 echo/governance 链继续写必要性证明：blocker、consumer、为什么不能复用 v298、停止条件。
- 单版/单提交目标小于 3000 changed lines；若需要新上游 evidence，优先冻结最小必要证据。
- 代码文件接近大文件风险阈值时必须先拆分，再继续加功能。
- 证据生成继续使用 stdin 管道或已有脚本，不使用长 node -e / tsx --eval。

Java：
- Java v135 与 mini-kv v132 可并行，但必须等待 Node v299。
- Java v135 只做 read-only echo，不做 runtime shell、不写 ledger、不执行 SQL、不调用外部 managed audit。

mini-kv：
- mini-kv v132 与 Java v135 可并行，但必须等待 Node v299。
- mini-kv v132 只做 non-participation receipt，不新增写命令、不做恢复/compact、不成为 audit/order 权威存储。

并行规则：
- 同一项目内部版本必须串行。
- Java v135 与 mini-kv v132 互不依赖，推荐并行。
- Node v300 必须等待 Java v135 + mini-kv v132 完成，不能与二者并行抢跑。
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
- Java v135 或 mini-kv v132 未完成时，Node v300 必须停止。

## 一句话结论

```text
v299 只记录 runtime shell candidate gate 的 blocked decision，不把 blocked decision 误写成 runtime implementation approval；下一步先做 Java v135 + mini-kv v132 的并行 echo。
```
