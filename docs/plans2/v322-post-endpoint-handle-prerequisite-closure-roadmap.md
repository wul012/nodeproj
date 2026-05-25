# Node v322 衍生计划：endpoint-handle prerequisite closure 之后

来源版本：Node v322 `endpoint handle allowlist approval prerequisite closure review`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md` 已完成 Node v320、Java v147、mini-kv v140、Node v321、Node v322 的 endpoint-handle-allowlist-approval 闭环；本计划另起续写，不回填旧版本，不写重复版本。

## 当前对齐状态

```text
Node v312：只关闭 java-mini-kv-decision-echo。
Node v316：关闭 signed-human-approval-artifact。
Node v319：关闭 credential-handle-approval。
Node v320：endpoint-handle allowlist approval contract intake 已完成。
Java v147 + mini-kv v140：已推荐并行完成，只读 echo / non-participation。
Node v321：endpoint-handle allowlist contract upstream echo verification 已完成。
Node v322：endpoint-handle-allowlist-approval prerequisite closure review 已完成；当前完成 4/6 prerequisite，剩余 2/6。
Node v323：no-network safety fixture contract intake 已完成；只定义不可联网安全 fixture contract，不执行 HTTP/TCP，不启动上游。
Java v149 + mini-kv v141：已推荐并行完成；Java 只读 echo no-network safety fixture contract，mini-kv 提供 non-participation receipt。
Node v324：no-network safety fixture upstream echo verification 已完成；已消费 Node v323 + Java v149 + mini-kv v141，验证三方合同、digest、只读边界和 side-effect 关闭状态一致。

剩余 prerequisite：
- no-network-safety-fixture
- abort-rollback-semantics

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v323：no-network safety fixture contract intake。已完成。
   - 只定义“未来 runtime path 在未审批时拒绝 HTTP/TCP”的 fixture contract。
   - contract 应包含 fixture id、expected denied transport classes、required denial evidence、forbidden network action、operator confirmation、cleanup marker。
   - 禁止实例化真实 provider/client，禁止发 HTTP/TCP，禁止启动 Java/mini-kv，禁止读取 credential value 或 raw endpoint URL。

2. 推荐并行：Java v149 + mini-kv v141。当前下一步。
   - Node v323 完成后执行。
   - Java v149：只读 echo no-network safety fixture contract，确认 Java 不执行 SQL/deployment/rollback、不写 ledger、不触发外部请求。
   - mini-kv v141：non-participation receipt，确认 mini-kv 不执行 LOAD/COMPACT/RESTORE/SETNXEX、不承担 network safety authority。
   - 两边互不依赖，可以并行推进。

3. Node v324：no-network safety fixture upstream echo verification。已完成。
   - 消费 Node v323 + Java v149 + mini-kv v141。
   - 只验证三方对 no-network fixture contract 的理解一致。
   - 如果 Java v149 或 mini-kv v141 未完成，Node v324 必须停止。

4. Node v325：no-network-safety-fixture prerequisite closure review。当前下一步。
   - 只有 Node v324 完成后再做。
   - 判断 no-network-safety-fixture 是否可以推进到 `contract-intake-and-upstream-echo-complete`。
   - 即使 v325 完成，也仍不解锁 provider/client、HTTP/TCP、ledger/schema 或 runtime shell；最后剩余 prerequisite 仍是 abort-rollback-semantics。
```

## 显式质量优化项

```text
Node：
- v323 起继续拆成 types / service / renderer / test，不允许生成难维护的巨型 service。
- no-network safety fixture 应复用 prerequisite catalog 和 closure review 模式；不要重新复制整条治理链。
- 新增治理链必须写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用现有 report、何时停止继续延伸。
- 单个 Node commit 目标低于 3000 changed lines；如果超出，拆成质量优化、功能、归档/截图多个提交。

Java：
- Java v149 只能在 Node v323 完成后并行执行，只读 echo no-network fixture，不写 ledger、不执行 SQL/deployment/rollback。
- Java 如同步做质量优化，必须与业务 echo 串行；不能在一个 Java 原子版本同时混入大拆分与新 echo。

mini-kv：
- mini-kv v141 只能在 Node v323 完成后并行执行，只做 non-participation receipt。
- 不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 network safety authority，不承载 audit/order 权威状态。
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
- 如果 Node v323 无法把 no-network safety fixture contract 与 prerequisite catalog 对齐，必须暂停，不得请求 Java v149 / mini-kv v141。

## 一句话结论

```text
endpoint-handle-allowlist-approval 已完成 contract + upstream echo + closure review 闭环；no-network safety fixture 已完成 Node v323 contract intake、Java v149 + mini-kv v141 并行 echo/non-participation，以及 Node v324 upstream echo verification。当前下一步是 Node v325 closure review，用来决定 no-network-safety-fixture 是否可以进入 contract-intake-and-upstream-echo-complete。
```
