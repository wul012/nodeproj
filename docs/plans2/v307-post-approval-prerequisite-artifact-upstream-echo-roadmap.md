# Node v307 衍生计划：approval prerequisite artifact upstream echo verification 之后

来源版本：Node v307 `approval prerequisite artifact upstream echo verification`。

计划状态：已完成并收口。上一份 `docs/plans2/v305-post-stop-prerequisite-upstream-echo-roadmap.md` 已完成 Node v306、推荐并行 Java v142 + mini-kv v135、Node v307；本计划已完成 Node v308、推荐并行 Java v143 + mini-kv v136、Node v309。后续从 `docs/plans2/v309-post-human-approval-artifact-review-upstream-echo-roadmap.md` 继续，不再向本文件追加重合版本。

## 当前对齐状态

```text
Node v305：stop/prerequisite upstream echo verification 已完成；三方对 blocked prerequisite decision 对齐。
Node v306：approval prerequisite artifact intake plan 已完成；定义 12 个 required fields、8 个 prohibited fields、9 个 rejection reasons、12 个 no-go boundaries。
Java v142：approval prerequisite artifact intake echo 已完成；只读回显 Node v306，不写 ledger、不执行 SQL、不调用外部 managed audit。
mini-kv v135：approval prerequisite artifact intake non-participation receipt 已完成；只读回显 Node v306，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 authority。
Node v307：approval prerequisite artifact upstream echo verification 已完成；三方对 Node v306 artifact contract 对齐。
Node v308：human approval artifact review packet 已完成；定义 9 required、9 prohibited、13 rejection、9 missing checks、12 no-go，并请求 Java v143 + mini-kv v136 并行只读 echo。
Java v143：human approval artifact review packet echo 已完成；只读回显 Node v308，不写 ledger、不执行 SQL、不调用外部 managed audit。
mini-kv v136：human approval artifact review non-participation receipt 已完成；只读回显 Node v308，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 authority。
Node v309：human approval artifact review upstream echo verification 已完成；已消费 Node v308 + Java v143 + mini-kv v136，确认三方对 review packet contract 对齐。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v307：approval prerequisite artifact upstream echo verification。已完成。
   - 已消费 Node v306 + Java v142 + mini-kv v135。
   - 已补 historical sibling fixture fallback。
   - 仍不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP。

2. Node v308：human approval artifact review packet。已完成。
   - 直接消费 Node v307 的三方对齐结果。
   - 定义人工提交 approval artifact 的 review packet：artifact id、operator approval reference、credential handle review status、endpoint handle allowlist review status、no-network safety test、abort/rollback semantics、operator identity、audit correlation id。
   - 只验证 artifact shape / missing fields / prohibited fields / rejection reasons。
   - 不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不发 HTTP/TCP，不写 ledger，不执行 schema migration，不启动上游。
   - 已补 necessity proof，并固化 9 个 required fields、9 个 prohibited fields、13 个 rejection reasons、9 个 missing field checks、12 个 no-go boundaries。
   - 已显式请求 `Java v143 + mini-kv v136` 并行只读 echo，Node v309 必须等待两边完成。

3. 推荐并行：Java v143 + mini-kv v136。已完成。
   - Java v143：只读 echo Node v308 review packet contract；不写 ledger、不执行 SQL、不调用外部 managed audit。
   - mini-kv v136：只读 non-participation receipt；不执行 LOAD、COMPACT、RESTORE、SETNXEX，不承载 audit/order 权威状态。
   - 两者互不依赖，可以并行。

4. Node v309：human approval artifact review upstream echo verification。已完成。
   - 已等待 Java v143 + mini-kv v136 都完成。
   - 已消费两边只读 echo，确认三方对 review packet contract 一致。
   - 不实现 runtime shell。
   - 本计划到 v309 收口，后续版本另起计划，不在本文件继续追加重合版本。
```

## 显式质量优化项

```text
Node：
- 新增 review packet 仍拆成 types / renderer / service / test，不制造巨型 service。
- v308 必须写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用 v307、何时停止。
- v308 不新增真实 adapter、resolver client、fake client 或 shell，只做 artifact review packet contract。
- v308 已完成；v309 已完成 upstream echo verification，后续不再向本计划追加 Node-only 小版本，避免 contract 链空转。
- 单版/单提交目标小于 3000 changed lines；超过时拆版本或拆提交。
- 历史上游证据继续冻结最小必要文件，保证 GitHub runner fallback。

Java：
- Java v143 已完成，只做只读 echo，可继续 catalog/template 化，但不要把大型质量重构和 echo 混成不可审计版本。

mini-kv：
- mini-kv v136 已完成，只做只读 non-participation receipt；不新增写命令，不做恢复/compact，不承载权威状态。

并行规则：
- 同一项目内部版本必须串行。
- Java v143 与 mini-kv v136 已按 Node v308 请求并行完成。
- Node v309 已等待 Java v143 + mini-kv v136 完成并收口；后续从 v309 衍生计划继续。
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
- 本计划已完成；后续从 v309 衍生计划继续。

## 一句话结论

```text
v308、Java v143、mini-kv v136、Node v309 已完成；三方已经对 human approval artifact review packet contract 对齐，后续从 v309 衍生计划继续。
```
