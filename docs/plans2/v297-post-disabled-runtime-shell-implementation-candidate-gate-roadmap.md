# Node v297 衍生计划：disabled runtime shell implementation candidate gate 之后

来源版本：Node v297 `credential resolver disabled runtime shell implementation candidate gate`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v296-post-disabled-runtime-shell-upstream-echo-roadmap.md` 已完成 Node v297；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v296：disabled runtime shell upstream echo verification 已完成；已消费 Node v295 + Java v133 + mini-kv v130。
Node v297：disabled runtime shell implementation candidate gate 已完成；只做候选门禁评审，仍默认 blocked。

v297 的五个候选门槛已经固化：
- DEDICATED_DISABLED_BY_DEFAULT_FLAG
- OPERATOR_APPROVAL
- ABORT_SEMANTICS
- NO_NETWORK_TESTS
- HISTORICAL_FALLBACK_EVIDENCE

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. 推荐并行：Java v134 + mini-kv v131。
   - Java v134：runtime shell candidate gate echo。
     只回显 Node v297 的五个候选门槛和 blocked decision；不写 ledger、不执行 SQL、不调用上游。
   - mini-kv v131：runtime shell candidate gate non-participation receipt。
     只确认 mini-kv 不参与 runtime shell candidate；不执行 LOAD/COMPACT/RESTORE/SETNXEX，不承载 audit/order 权威状态。

2. Node v298：runtime shell candidate gate upstream echo verification。
   - 必须等待 Java v134 + mini-kv v131 完成后再推进。
   - 消费两边 echo，验证三方对 v297 五个候选门槛和 blocked decision 一致。
   - 仍不做 runtime implementation，不实例化 provider/client，不读取 credential，不解析 raw endpoint，不发 HTTP/TCP。

3. Node v299：runtime shell candidate gate decision record。
   - 只能在 Node v298 完成后考虑。
   - 记录是否仍 blocked，还是进入更严格的 implementation pre-design；默认仍应 blocked，除非出现新的明确审批证据。
```

## 显式质量优化项

```text
Node：
- v298 继续使用 types / renderer / service / test 四件套。
- v298 只消费 Java v134 + mini-kv v131 的冻结 evidence，不重新复制 v297 的全部 gate 长文本。
- 新增 echo/governance 链继续写必要性证明：blocker、consumer、为什么不能复用 v297、停止条件。
- 单版/单提交目标小于 3000 changed lines；若历史 fixture 让行数膨胀，优先冻结最小必要证据。
- 证据生成继续使用 stdin 管道或已有脚本，不使用长 `node -e` / `tsx --eval`。

Java：
- Java v134 与 mini-kv v131 可并行。
- Java v134 只做 read-only echo，不做 runtime shell、不写 ledger、不执行 SQL、不调用外部 managed audit。

mini-kv：
- mini-kv v131 与 Java v134 可并行。
- mini-kv v131 只做 non-participation receipt，不新增写命令、不做恢复/compact、不成为 audit/order 权威存储。

并行规则：
- 同一项目内部版本必须串行。
- Java v134 与 mini-kv v131 互不依赖，推荐并行。
- Node v298 必须等待 Java v134 + mini-kv v131 完成，不能与二者并行抢跑。
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
- Java v134 或 mini-kv v131 未完成时，Node v298 必须停止。

## 一句话结论

```text
v297 已完成 runtime shell implementation candidate gate review：下一步推荐并行 Java v134 + mini-kv v131；两边完成后 Node v298 再做 upstream echo verification，仍不实现 runtime。
```
