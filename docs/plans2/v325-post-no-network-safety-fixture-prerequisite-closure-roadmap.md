# Node v325 衍生计划：no-network safety fixture closure 之后

来源版本：Node v325 `no-network-safety-fixture prerequisite closure review`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v322-post-endpoint-handle-prerequisite-closure-roadmap.md` 已完成 Node v323、Java v149、mini-kv v141、Node v324、Node v325 的 no-network-safety-fixture 闭环；本计划另起续写，不回填旧版本，不写重复版本。

## 当前对齐状态

```text
Node v312：已关闭 java-mini-kv-decision-echo。
Node v316：已关闭 signed-human-approval-artifact。
Node v319：已关闭 credential-handle-approval。
Node v322：已关闭 endpoint-handle-allowlist-approval。
Node v323：no-network safety fixture contract intake 已完成。
Java v149 + mini-kv v141：已推荐并行完成，只读 echo / non-participation。
Node v324：no-network safety fixture upstream echo verification 已完成。
Node v325：no-network-safety-fixture prerequisite closure review 已完成；当前完成 5/6 prerequisite。
Node v326：abort/rollback semantics contract intake 已完成；只定义最后一个 prerequisite 的非执行合同，不关闭 runtime gate。

剩余 prerequisite：
- abort-rollback-semantics

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v326：abort/rollback semantics contract intake。已完成。
   - 只定义最后一个 prerequisite 的非执行合同：manual abort marker、rollback runbook reference、operator confirmation、cleanup/evidence marker、idempotent no-op failure handling。
   - 禁止实现 runtime shell，禁止 provider/client，禁止发 HTTP/TCP，禁止读 credential value，禁止解析 raw endpoint URL。
   - 禁止写 approval ledger、执行 schema migration、自动启动 Java/mini-kv。
   - v326 只请求下一步上游只读 echo，不关闭 runtime gate。

2. 推荐并行：Java v150 + mini-kv v142。当前下一步。
   - Node v326 完成后执行。
   - Java v150：只读 echo abort/rollback semantics contract，确认 Java 不执行 SQL/deployment/rollback、不写 ledger、不触发外部请求。
   - mini-kv v142：non-participation receipt，确认 mini-kv 不执行 LOAD/COMPACT/RESTORE/SETNXEX、不承担 abort/rollback authority。
   - 两边互不依赖，可以并行推进；同一项目内部仍保持原子串行。

3. Node v327：abort/rollback semantics upstream echo verification。
   - 消费 Node v326 + Java v150 + mini-kv v142。
   - 只验证三方对 abort/rollback semantics contract 的理解一致。
   - 如果 Java v150 或 mini-kv v142 未完成，Node v327 必须停止。

4. Node v328：final prerequisite closure review。
   - 判断 abort-rollback-semantics 是否可以推进到 `contract-intake-and-upstream-echo-complete`。
   - 若全部 6/6 prerequisite 完成，也只能进入新的 implementation candidate gate / decision record。
   - 不得在 v328 直接实现 runtime shell、provider/client、HTTP/TCP、ledger/schema 或真实 managed audit connection。
```

## 显式质量优化项

```text
Node：
- v326 起继续拆成 types / service / renderer / test，保持单文件职责清晰。
- abort/rollback semantics 应复用 prerequisite catalog 和 closure review 模式；不要复制整条 governance 链。
- 新增治理链必须写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用现有 report、何时停止继续延伸。
- 单个 Node commit 目标低于 3000 changed lines；如果超出，拆成质量优化、功能、归档/截图多个提交。

Java：
- Java v150 只能在 Node v326 完成后并行执行，只读 echo abort/rollback semantics，不写 ledger、不执行 SQL/deployment/rollback。
- Java 如同步做质量优化，必须与业务 echo 串行；不能在一个 Java 原子版本同时混入大拆分与新 echo。

mini-kv：
- mini-kv v142 只能在 Node v326 完成后并行执行，只做 non-participation receipt。
- 不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 abort/rollback authority，不承载 audit/order 权威状态。
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
- 如果 Node v326 无法把 abort/rollback semantics contract 与 prerequisite catalog 对齐，必须暂停，不得请求 Java v150 / mini-kv v142。

## 一句话结论

```text
no-network-safety-fixture 已完成 contract + upstream echo + closure review 闭环；Node v326 已定义 abort-rollback-semantics 的非执行合同。下一步推荐并行 Java v150 + mini-kv v142，只读 echo / non-participation 完成后，再由 Node v327/v328 完成上游 echo verification 和最终 prerequisite closure review。
```
