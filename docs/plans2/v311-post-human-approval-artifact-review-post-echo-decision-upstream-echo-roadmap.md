# Node v311 衍生计划：human approval artifact review post-echo decision upstream echo 之后

来源版本：Node v311 `human approval artifact review post-echo decision upstream echo verification`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v309-post-human-approval-artifact-review-upstream-echo-roadmap.md` 已完成 Node v310、推荐并行 Java v144 + mini-kv v137、Node v311；本计划不回填旧版本，不写重复版本。

## 当前对齐状态

```text
Node v308：human approval artifact review packet 已完成；定义人工 approval artifact review packet contract。
Java v143：human approval artifact review packet echo 已完成；只读回显 Node v308。
mini-kv v136：human approval artifact review non-participation receipt 已完成；只读回显 Node v308。
Node v309：human approval artifact review upstream echo verification 已完成；三方对 review packet contract 已对齐。
Node v310：human approval artifact review post-echo decision gate 已完成；明确仍缺 6 个 post-echo prerequisite。
Java v144：human approval artifact review post-echo decision gate echo 已完成；只读回显 Node v310。
mini-kv v137：human approval artifact review post-echo decision gate non-participation receipt 已完成；只读回显 Node v310。
Node v311：human approval artifact review post-echo decision upstream echo verification 已完成；三方对 v310 decision gate 已对齐。
Node v312：human approval artifact review governance stop/prerequisite closure decision 已完成；只关闭 java-mini-kv-decision-echo，剩余 5 个 prerequisite 仍缺，governance 链暂停。
Node v313：human approval post-echo prerequisite catalog cleanup 已完成；只做 Node 质量优化，把 v310/v312 prerequisite 定义收进同一 catalog。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v312：human approval artifact review governance stop/prerequisite closure decision。
   - 状态：已完成。
   - 目标是停止空转 echo，明确下一步到底是暂停，还是进入某个具体缺失 prerequisite 的最小闭环。
   - 必须消费 Node v311 的 verification result。
   - 必须逐项检查 6 个 documented-missing prerequisite：
     signed-human-approval-artifact、credential-handle-approval、endpoint-handle-allowlist-approval、no-network-safety-fixture、abort-rollback-semantics、java-mini-kv-decision-echo。
   - 已完成的只能是 java-mini-kv-decision-echo；其余 5 个不能假装完成。
   - 默认仍不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP。
   - 实际结论：java-mini-kv-decision-echo 已由 Node v311 关闭；其余 5 个 prerequisite 继续缺失；当前不请求新 Java/mini-kv echo。

2. 可选 Node 质量优化：human approval echo catalog cleanup。
   - 状态：已完成，落地为 Node v313。
   - 若 v312 发现 v308-v311 的 echo/decision 段重复明显，可先做一版 Node 质量优化。
   - 优化范围限于 catalog/helper/template 抽取，不改变 JSON contract。
   - 若单个新 service 接近 700+ 行，必须先拆再继续功能版本。

3. 推荐并行仅在存在跨项目独立任务时写明。
   - 当前没有新的 Java + mini-kv 并行 echo 请求。
   - 如果 Node v312 产出新的明确 prerequisite contract，才能请求 Java / mini-kv 新版本并行。
   - 同一项目内部版本仍按原子串行推进。
```

## 显式质量优化项

```text
Node：
- v312 先做 stop/prerequisite closure decision，避免 governance 链无限增长。
- v312 已完成 stop/prerequisite closure decision；功能链暂停，后续如推进 Node，优先做 human approval echo catalog cleanup，避免 v308-v312 继续复制 echo/decision 样板。
- 后续如做质量优化，优先 catalog 化 v308-v311 human approval artifact review echo/decision 段，减少 service/test/renderer 重复。
- v313 已完成 prerequisite catalog cleanup：v310 documented-missing prerequisites 与 v312 completed/remaining closure split 使用同一 catalog，未改变 JSON contract。
- 新增 echo/decision 版本必须写必要性证明：解决哪个 blocker、谁消费、为什么已有报告不能复用、何时停止继续延伸。
- 单版/单提交目标小于 3000 changed lines；超过时拆版本或拆提交。
- 运行截图、解释写入 d/<版本>/；代码讲解写入 代码讲解记录_生产雏形阶段2/。

Java：
- 当前没有 Node 请求的新 Java echo。
- 后续质量优化仍可独立串行推进：OpsEvidenceService.java service/catalog 化、ResponseRecords.java 继续拆、FailedEventMessageService.java 拆分、Java CI 加 jacoco gate。
- Java 内部不能把同一仓库的功能版本和质量拆分当作并行任务。

mini-kv：
- 当前没有 Node 请求的新 mini-kv receipt。
- 继续保持 read-only evidence provider 定位；不执行 LOAD、COMPACT、RESTORE、SETNXEX，不承载 audit/order authority。
- 若 Node v312 后续明确请求新 receipt，mini-kv 只做 non-participation 或只读 evidence，不进入权威存储链路。
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
- Node v312 如果不能说明继续推进解决哪个具体 prerequisite，就必须暂停该 governance 链，不再新增 echo。

## v312 收口结论

```text
Node v312 已完成：它消费 Node v311 verification result，确认 6 个 prerequisite 中只有 java-mini-kv-decision-echo 被关闭，signed-human-approval-artifact、credential-handle-approval、endpoint-handle-allowlist-approval、no-network-safety-fixture、abort-rollback-semantics 仍缺失。因此 governance 链暂停，不请求新的 Java/mini-kv echo，也不进入 runtime shell、credential value、raw endpoint URL、provider/client 或 HTTP/TCP 实现。
```

## 一句话结论

```text
v311 已经完成三方 post-echo decision gate 对齐；v312 已完成 stop/prerequisite closure decision；v313 已完成 prerequisite catalog cleanup。当前只有出现新的具体 prerequisite contract 才请求 Java/mini-kv 新并行版本。
```
