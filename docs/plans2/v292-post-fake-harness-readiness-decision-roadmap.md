# Node v292 衍生计划：fake harness readiness decision 之后

来源版本：Node v292 `credential resolver fake harness readiness decision record`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md` 已完成 Node v290、Java v127-v130、mini-kv v128、Node v291、Node v292，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v287：test-only fake resolver harness precheck 已完成。
Node v288：disabled fake harness contract 已完成；只定义合同，不提供 runtime。
Node v289：disabled fake harness contract upstream echo verification 已完成。
Node v290：disabled fake harness execution-denied route preflight 已完成。
Java v127-v130：质量止血队列已完成；这是结构/测试/catalog 证据，不是 direct execution-denied echo。
mini-kv v128：execution-denied non-participation receipt 已完成；只读回显 Node v290 preflight。
Node v291：execution-denied upstream echo verification 已完成；blocked，原因是 Java direct execution-denied echo 缺失。
Node v292：fake harness readiness decision record 已完成；decision record 可归档，但 readiness decision 仍 blocked。
三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. 推荐并行：Java v131 + mini-kv v129。
   - Java v131：direct execution-denied echo receipt，直接回应 Node v292 的缺口；只读证明 Java 不执行 fake harness、不读 credential、不解析 raw endpoint、不写 ledger/SQL。
   - mini-kv v129：v128 receipt verification/retention check，只做 receipt 自检与历史 fixture 友好化，不执行 LOAD/COMPACT/RESTORE/SETNXEX。
   - 并行理由：两边写入不同仓库；Java 补 direct echo，mini-kv 做 receipt 质量自检，互不依赖。

2. Node v293：fake harness readiness blocked decision upstream echo verification。
   - 消费 Java v131 + mini-kv v129。
   - 若 Java v131 direct echo 完成，则 Node 验证三方 blocked decision 一致性。
   - 若 Java v131 仍缺失，则 Node 停止，不把质量证据当 runtime echo。

3. Node v294：disabled runtime shell pre-plan intake。
   - 只有在 Node v293 三方 blocked decision 对齐后推进。
   - 仍不实现 runtime，只列 runtime shell 前置边界、命名、开关、测试策略和暂停条件。
```

## 显式质量优化项

```text
Node：
- v293 继续使用 types / renderer / service / test 四件套。
- 不新增重复 route querystring/markdown 分支，继续通过 auditJsonMarkdownRoute 注册。
- v293 不要新建大文件；若服务超过约 700 行，优先抽 requiredEvidence/noGo/check builder。

Java：
- Java v131 的 direct execution-denied echo 是功能证据，不要夹带大文件拆分。
- 如需继续质量优化，另起 Java v132，不要和 direct echo 混成一版。

mini-kv：
- mini-kv v129 只做 receipt verification/retention，不新增写命令、不做恢复/compact、不成为 audit/order 权威存储。

并行规则：
- 同一项目内部版本必须串行。
- Java v131 + mini-kv v129 可以推荐并行。
- Node v293 必须等 Java v131 / mini-kv v129 状态明确后再消费。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 实现或调用 fake harness runtime。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v292 已明确 blocked decision：Node 不能从质量证据直接进入 disabled runtime shell；下一步推荐并行 Java v131 direct execution-denied echo + mini-kv v129 receipt verification，然后由 Node v293 做三方 blocked decision upstream echo verification。
```
