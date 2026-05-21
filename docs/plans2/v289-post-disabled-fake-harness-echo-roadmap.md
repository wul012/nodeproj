# Node v289 衍生计划：disabled fake harness echo 之后的下一波

来源版本：Node v289 `disabled fake harness contract upstream echo verification`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v287-post-test-only-fake-harness-precheck-roadmap.md` 已完成 Node v288、Java v122-v126、mini-kv v127、Node v289，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v289：disabled fake harness contract upstream echo verification 已完成；只读消费 Node v288 + Java v122-v126 + mini-kv v127。
Node v290：disabled fake harness execution-denied route preflight 已完成；只读消费 Node v289，不打开 fake harness runtime。
Java v127-v130：LiveAggregationIntegrationTests 二拆、ResponseRecords 二拆、OverviewTests 二拆、echo catalog 延伸均已完成，是质量证据，不是 execution-denied echo。
mini-kv v128：execution-denied non-participation receipt 已完成；只读回显 Node v290 preflight，不执行 fake harness、不读 credential、不解析 endpoint、不写存储或恢复命令。
Node v291：execution-denied upstream echo verification 已完成；已消费 Node v290 + Java v127-v130 + mini-kv v128，结论按设计保持 blocked，因为 Java 仍缺 direct execution-denied echo。
Node v288：disabled fake harness contract 已完成；只定义合同，不提供可执行 fake harness runtime。
Java v122-v125：Integration Tests 四连拆已完成。
Java v126：EvidenceService catalog 化止血已完成。
mini-kv v127：disabled fake harness non-participation receipt 已完成。
三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v290：disabled fake harness execution-denied route preflight。已完成。
   - 在 Node 内新增一个“执行被拒绝”的只读 preflight / report，不实现 fake harness runtime。
   - 只输出为什么不能执行：缺少真实 approval gate、credential value 禁止、raw endpoint 禁止、provider/client 禁止、HTTP/TCP 禁止、ledger/schema 禁止。
   - 继续消费 v289 的 echo verification，不启动或修改 Java / mini-kv。

2. 推荐并行：Java v127 + mini-kv v128。
   - Java v127：LiveAggregationIntegrationTests 二次拆分，继续 v122 未完全收口的测试大文件质量债；不执行 fake harness，不写 ledger，不执行 SQL。
   - mini-kv v128：execution-denied non-participation receipt，证明 mini-kv 不执行 fake harness、不读 credential、不解析 endpoint、不写存储或恢复命令。
   - 并行理由：两边写入不同仓库；Java 做测试结构质量优化，mini-kv 做基础设施侧非参与 receipt，互不依赖。
   - 若任一侧需要真实 credential、raw endpoint、HTTP/TCP、写命令或外部连接，则停止并拆回串行确认。

3. Java v128：ReleaseApprovalRehearsalResponseRecords 第二步拆分。
   - 目标是把仍偏大的 ResponseRecords 按 echo / boundary / marker 类型继续 Strangler Fig 拆分。
   - 只做结构优化，不改变 JSON/record contract，不新增真实运行时。

4. Java v129：OverviewTests 二次拆分。
   - 接续 Java v121 后仍偏大的 overview 测试，按只读 overview、evidence、validation 边界继续拆。
   - 只拆测试，不改生产行为。

5. Java v130：echo catalog 延伸。
   - 把 v126 stopgap 推进成更完整的 catalog/template，优先消化 `ImplementationPlanEchoReceiptBuilder` 这类新模板重复。
   - `VerificationHintBuilder` 只监控，除非继续反向膨胀才拆。
   - Java CI + jacoco gate 作为中期质量项，排在上述大文件止血之后。

6. Node v291：execution-denied upstream echo verification。已完成。
   - 消费 mini-kv v128，并消费 Java v127-v130 的质量证据；若 Java 仍缺 execution-denied echo，则先生成“Java echo missing / quality evidence present”的 blocked verification，不抢跑真实 fake harness。
   - 不打开 fake harness runtime，不实现 resolver client，不连接 managed audit。
   - 本版实际结果：mini-kv v128 receipt 已与 Node v290 preflight digest 对齐，Java v127-v130 质量证据已冻结；`javaExecutionDeniedEchoPresent=false`，因此最终 readiness 仍为 false。

7. Node v292：credential resolver fake harness readiness decision record。
   - 汇总 v287-v291，判断是否可以进入“disabled runtime shell”规划。
   - 这是决策记录，不是 runtime 实现。
   - 若仍缺 Java/mini-kv 证据，则停，不抢跑。
```

## 显式质量优化项

```text
Node：
- v290 仍要拆成 types / renderer / service / test，避免新建 700+ 行 service。
- v290 不要再让旧版本 source 被当前代码重算影响；消费历史版本时优先使用 sibling receipt 中固化的 source snapshot。
- route 注册继续使用 auditJsonMarkdownRoute，不新增重复 querystring/markdown 分支。

Java：
- Java v127-v130 优先做质量止血：LiveAggregationIntegrationTests 二拆、ResponseRecords 二拆、OverviewTests 二拆、echo catalog 延伸。
- Java 单项目版本必须串行；不要把多个大文件拆分塞进同一版。
- `VerificationHintBuilder` 当前只列为监控项；`ImplementationPlanEchoReceiptBuilder` 先评估能否复用/接入 catalog。
- Java CI + jacoco gate 合理，但排在大文件止血之后。
- 所有 Java 优化仍不做真实 fake harness，不读 credential value，不解析 raw endpoint，不写 ledger，不执行 SQL。

mini-kv：
- mini-kv v128 只做 non-participation receipt，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不承担 audit/order 权威存储。

并行规则：
- 同一项目内部版本必须串行。
- 跨项目且写入不同仓库、职责域互不依赖时，可以写“推荐并行”。
- 当前明确可并行的是 Java v127 + mini-kv v128；Java v128-v130 是 Java 内部串行；Node v291 必须等 mini-kv v128 与 Java 当前质量队列状态明确后再消费。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider、真实 resolver client、fake secret provider 或 fake resolver client。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。

## 一句话结论

```text
v289-v291 已把 disabled fake harness contract、execution-denied route preflight、Java v127-v130 质量证据、mini-kv v128 非参与 receipt 串起来；当前仍不能进入 runtime，下一步是 Node v292 做 readiness decision record，明确是否需要先让 Java 补 direct execution-denied echo。
```
