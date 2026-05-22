# Node v309 衍生计划：human approval artifact review upstream echo verification 之后

来源版本：Node v309 `human approval artifact review upstream echo verification`。

计划状态：已完成。上一份 `docs/plans2/v307-post-approval-prerequisite-artifact-upstream-echo-roadmap.md` 已完成 Node v308、推荐并行 Java v143 + mini-kv v136、Node v309；本计划已完成 Node v310、推荐并行 Java v144 + mini-kv v137、Node v311。后续切换到 `docs/plans2/v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md`，不再向本计划追加重合版本。

## 当前对齐状态

```text
Node v307：approval prerequisite artifact upstream echo verification 已完成；三方对 Node v306 artifact contract 对齐。
Node v308：human approval artifact review packet 已完成；定义人工提交 approval artifact 的 review packet contract。
Java v143：human approval artifact review packet echo 已完成；只读回显 Node v308，不写 ledger、不执行 SQL、不调用外部 managed audit。
mini-kv v136：human approval artifact review non-participation receipt 已完成；只读回显 Node v308，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 authority。
Node v309：human approval artifact review upstream echo verification 已完成；三方对 review packet contract 已对齐。
Node v310：human approval artifact review post-echo decision gate 已完成；消费 v309，明确仍缺 6 个 post-echo prerequisite，并请求 Java v144 + mini-kv v137 并行只读 echo。
Java v144：human approval artifact review post-echo decision gate echo 已完成；只读回显 Node v310，不写 ledger、不执行 SQL、不调用外部 managed audit。
mini-kv v137：human approval artifact review post-echo decision gate non-participation receipt 已完成；只读回显 Node v310，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 authority。
Node v311：human approval artifact review post-echo decision upstream echo verification 已完成；已消费 Java v144 + mini-kv v137，确认三方对 v310 decision gate 一致，仍不实现 runtime shell。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v309：human approval artifact review upstream echo verification。已完成。
   - 已消费 Node v308 + Java v143 + mini-kv v136。
   - 已补 historical sibling fixture fallback。
   - 仍不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP。

2. Node v310：human approval artifact review post-echo decision gate。已完成。
   - 目标不是继续堆 echo，而是把 v308/v309 的结果收束成“仍 blocked / 可进入下一类前置”的 decision gate。
   - 必须写明：继续推进解决哪个 blocker、谁消费、为什么不能复用 v309、何时停止。
   - 默认仍不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP。

3. 推荐并行：Java v144 + mini-kv v137。已完成。
   - Node v310 已明确请求上游只读确认。
   - Java v144：只读 echo Node v310 decision gate；不写 ledger、不执行 SQL、不调用外部 managed audit。
   - mini-kv v137：只读 non-participation receipt；不执行 LOAD、COMPACT、RESTORE、SETNXEX，不承载 audit/order 权威状态。
   - 两者互不依赖，可以并行；Node v311 必须等待两边完成。

4. Node v311：human approval artifact review post-echo decision upstream echo verification。已完成。
   - 已等待 Java v144 + mini-kv v137 都完成。
   - 已消费两边只读 echo，确认三方对 v310 decision gate 一致。
   - 不实现 runtime shell。

5. 下一计划：`docs/plans2/v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md`。
   - 不继续在本计划追加版本。
   - 下一步必须先判断 governance 链是否该暂停，或是否存在新的具体 prerequisite，不能继续空转 echo。
```

## 显式质量优化项

```text
Node：
- v310 已完成 decision gate，把链条从 artifact review 收束到下一类明确 blocker。
- 新 service 继续拆成 types / renderer / service / test；若单文件明显膨胀，先拆分再新增功能。
- 单版/单提交目标小于 3000 changed lines；超过时拆版本或拆提交。
- 继续冻结最小必要 historical sibling evidence，保证 GitHub runner fallback。
- 运行截图、解释写入 d/<版本>/；代码讲解写入 代码讲解记录_生产雏形阶段2/。
- 后续 Node echo/catalog 质量优化要写成显式目标，不要只写“可优化”：
  - Node echo catalog 化全面落地：继续把第 9、10 段以后 echo/decision 的重复块收进 catalog/template。
  - 新增 echo/decision 版本必须先复用现有 catalog；只有差异字段进入 service。
  - 若发现某个新 service 接近 700+ 行，先拆 catalog/helper，再继续功能版本。

Java：
- Java v144 已完成；只做只读 echo，可顺手延续 catalog/template 化，但不要把大型质量重构和 echo 混成不可审计版本。
- Java 后续质量优化参考项必须明确列出，不能只写泛化描述：
  - OpsEvidenceService.java 继续 service/catalog 化，防止反向膨胀。
  - ResponseRecords.java 继续拆分，避免长期停留在 1200+ 行级别。
  - FailedEventMessageService.java 可按职责拆分，目标是降低单文件维护压力。
  - Java CI 补 jacoco gate 是中优先级工程化项，可在专门 Java 质量版本推进。
  - 以上优化属于 Java 项目内部串行事项，不能和同一个 Java 原子版本并行；若 Java v144 正在做 echo，则质量优化放到 Java 后续版本。

mini-kv：
- mini-kv v137 已完成；只做只读 non-participation receipt，不新增写命令，不做恢复/compact，不承载权威状态。
- 当前截图建议未点名 mini-kv 新质量短板；mini-kv 后续仍维持低风险小步优化，若新增质量项必须写清楚文件、风险和是否影响 Node 消费证据。

并行规则：
- 同一项目内部版本必须串行。
- Node v310 已完成。
- Java v144 与 mini-kv v137 已完成推荐并行 lane。
- Node v311 已等待 Java v144 + mini-kv v137 完成。
- 质量优化并行只允许跨项目并行，例如 Java 质量版本可以与 mini-kv 独立版本并行；同一个 Java 仓库内部不能把 v144 echo 和质量拆分当作并行任务。
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
- 后续如果要继续，必须先写清楚新的具体 prerequisite 或暂停理由，不能把 echo/governance 链条无条件延伸。

## 一句话结论

```text
v311 已完成 human approval artifact review post-echo decision upstream echo verification；下一步切换到新计划，先判断 governance 链是否暂停或是否存在新的具体 prerequisite，而不是继续空转 echo。
```
