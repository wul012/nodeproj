# Node v313 衍生计划：post-echo prerequisite catalog cleanup 之后

来源版本：Node v313 `human approval post-echo prerequisite catalog cleanup`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v311-post-human-approval-artifact-review-post-echo-decision-upstream-echo-roadmap.md` 已完成 Node v312 stop/prerequisite closure decision 和 Node v313 quality cleanup；本计划另起续写，不回填旧版本，不写重复版本。

## 当前对齐状态

```text
Node v310：human approval artifact review post-echo decision gate 已完成；记录 6 个 documented-missing prerequisite。
Java v144：human approval artifact review post-echo decision gate echo 已完成；只读回显 Node v310。
mini-kv v137：human approval artifact review post-echo decision gate non-participation receipt 已完成；只读回显 Node v310。
Node v311：human approval artifact review post-echo decision upstream echo verification 已完成；三方对 v310 decision gate 已对齐。
Node v312：human approval artifact review governance stop/prerequisite closure decision 已完成；只关闭 java-mini-kv-decision-echo，剩余 5 个 prerequisite 仍缺。
Node v313：human approval post-echo prerequisite catalog cleanup 已完成；v310/v312 共用 prerequisite catalog，未改变 JSON contract。
Node v314：signed human approval artifact contract intake 已完成；已定义第一个剩余 prerequisite 的非 secret contract，仍不关闭其余 4 个 prerequisite。
Java v145：signed human approval artifact contract 只读 echo 已完成；不写 ledger、不执行 SQL/deployment/rollback。
mini-kv v138：signed human approval artifact contract non-participation receipt 已完成；不存储、不校验、不承载 authority。
Node v315：signed human approval artifact contract upstream echo verification 已完成；三方对 v314 contract 已对齐，仍不打开 runtime shell。

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v314：signed human approval artifact contract intake。已完成。
   - 目标是推进 v312 剩余 5 个 prerequisite 中的第一个具体闭环：signed-human-approval-artifact。
   - 只定义非 secret artifact contract，不接收真实 credential value，不解析 raw endpoint URL。
   - 字段只允许 artifact id、approval correlation id、operator identity handle、signer identity handle、policy version、artifact digest、issued/expired timestamp、review status、no-network assertion、rollback/abort reference。
   - 必须复用 v313 prerequisite catalog，明确本版只尝试关闭 signed-human-approval-artifact 的 contract-intake 前置，不关闭 credential-handle-approval、endpoint-handle-allowlist-approval、no-network-safety-fixture、abort-rollback-semantics。
   - 不请求 Java/mini-kv，直到 Node v314 自身 contract 和归档完成。

2. 推荐并行：Java v145 + mini-kv v138。已完成。
   - Node v314 已完成后执行。
   - Java v145：只读 echo Node v314 signed human approval artifact contract，不写 approval ledger，不执行 SQL/deployment/rollback。
   - mini-kv v138：non-participation receipt，只确认不存储、不校验、不承载 signed approval artifact authority。
   - 两边互不依赖，可以并行推进。

3. Node v315：signed human approval artifact contract upstream echo verification。已完成。
   - 消费 Node v314 + Java v145 + mini-kv v138。
   - 只验证三方对 signed-human-approval-artifact contract 的理解一致。
   - 如果 Java v145 或 mini-kv v138 未完成，Node v315 必须停止。

4. Node v316：post-signed-artifact prerequisite closure review。当前下一步。
   - 只有 Node v315 完成后再做。
   - 判断 signed-human-approval-artifact 是否可以从 `still-missing` 改为 `contract-intake-and-upstream-echo-complete`。
   - 即使 v316 完成，也仍不解锁 credential value、raw endpoint URL、provider/client、HTTP/TCP、ledger 或 schema migration。
```

## 显式质量优化项

```text
Node：
- v314 已复用 v313 prerequisite catalog，不重新手写 signed-human-approval-artifact 文案和 ID。
- 新增 contract 已拆成 types / service / renderer / test；单个 service 未膨胀到 700+ 行。
- 如果发现 v314 与 v306/v308 的 artifact intake 字段重复明显，应抽 helper，而不是复制一套长字段。
- v315 已继续拆成 types / service / renderer / test，并新增 historical fixture fallback；后续 v316 也必须保持这种拆分，不要把 prerequisite closure review 堆成巨型文件。
- 运行截图、解释写入 d/<版本>/；代码讲解写入 代码讲解记录_生产雏形阶段2/。

Java：
- Java v145 已完成。
- 当前计划不要求 Java 新版本；如后续要做，只能围绕只读 evidence / quality cleanup，不要抢跑 ledger、SQL、deployment 或 rollback。

mini-kv：
- mini-kv v138 已完成。
- 当前计划不要求 mini-kv 新版本；如后续要做，只能围绕只读 receipt / quality cleanup，不要执行 LOAD/COMPACT/RESTORE/SETNXEX，不要成为 authority。
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
- 如果 Node v314 无法把 signed-human-approval-artifact contract 与 v313 prerequisite catalog 对齐，必须暂停，不得请求 Java v145 / mini-kv v138。

## 一句话结论

```text
v313 已完成 prerequisite catalog cleanup；Node v314、Java v145、mini-kv v138、Node v315 已把 signed-human-approval-artifact contract intake 和上游只读 echo 对齐。当前下一步是 Node v316 closure review，只判断 prerequisite 状态是否可前进，不打开任何真实执行能力。
```
