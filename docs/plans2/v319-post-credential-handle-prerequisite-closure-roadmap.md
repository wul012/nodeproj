# Node v319 衍生计划：credential-handle prerequisite closure 之后

来源版本：Node v319 `credential handle approval prerequisite closure review`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md` 已完成 Node v317、Java v146、mini-kv v139、Node v318、Node v319 的 credential-handle-approval 闭环；本计划另起续写，不回填旧版本，不写重复版本。

## 当前对齐状态

```text
Node v312：只关闭 java-mini-kv-decision-echo。
Node v316：关闭 signed-human-approval-artifact。
Node v317：credential-handle approval contract intake 已完成。
Java v146 + mini-kv v139：已推荐并行完成，只读 echo / non-participation。
Node v318：credential-handle approval contract upstream echo verification 已完成。
Node v319：credential-handle-approval prerequisite closure review 已完成；当前完成 3/6 prerequisite，剩余 3/6。
Node v320：endpoint-handle allowlist approval contract intake 已完成；只定义非 raw URL contract，未请求真实连接、credential 读取或写操作。

剩余 prerequisite：
- endpoint-handle-allowlist-approval
- no-network-safety-fixture
- abort-rollback-semantics

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v320：endpoint-handle allowlist approval contract intake。已完成。
   - 只定义 endpoint handle / allowlist approval status / reviewer handle / policy version / correlation id / issued/expires timestamp / revocation marker / audit digest 等非 secret 信息。
   - 禁止字段必须包含 raw endpoint URL、credential value、secret provider config、resolver client config、external request payload、ledger mutation、schema migration SQL。
   - 不请求 Java/mini-kv，直到 Node v320 contract 和归档完成。

2. 推荐并行：Java v147 + mini-kv v140。当前下一步。
   - Node v320 完成后执行。
   - Java v147：只读 echo Node v320 endpoint-handle allowlist contract，不写 approval ledger，不执行 SQL/deployment/rollback。
   - mini-kv v140：non-participation receipt，只确认不存储 raw endpoint URL、不校验 endpoint authority、不承载 endpoint allowlist authority。
   - 两边互不依赖，可以并行推进。

3. Node v321：endpoint-handle allowlist contract upstream echo verification。
   - 消费 Node v320 + Java v147 + mini-kv v140。
   - 只验证三方对 endpoint-handle allowlist contract 的理解一致。
   - 如果 Java v147 或 mini-kv v140 未完成，Node v321 必须停止。

4. Node v322：post-endpoint-handle prerequisite closure review。
   - 只有 Node v321 完成后再做。
   - 判断 endpoint-handle-allowlist-approval 是否可以推进到 `contract-intake-and-upstream-echo-complete`。
   - 即使 v322 完成，也仍不解锁 raw endpoint URL、provider/client、HTTP/TCP、ledger/schema 或 runtime shell。
```

## 显式质量优化项

```text
Node：
- v320 起必须继续拆成 types / service / renderer / test，避免单文件膨胀。
- endpoint-handle allowlist contract 应复用 prerequisite catalog 和已形成的 closure review 模式；不要复制 v314/v317 的长字段块后再手改。
- 新增治理链必须写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用现有 report、何时停止继续延伸。
- 运行截图、解释写入 d/<版本>/；代码讲解写入 代码讲解记录_生产雏形阶段2/。

Java：
- 当前计划不要求 Java 抢跑。
- Java v147 只有在 Node v320 完成后才做，只能只读 echo，不写 ledger、不执行 SQL/deployment/rollback。
- Java 若同步做质量优化，必须和业务 echo 串行，不要在同一 Java 原子版本混入大拆分与新 echo。

mini-kv：
- 当前计划不要求 mini-kv 抢跑。
- mini-kv v140 只有在 Node v320 完成后才做，只能 non-participation receipt，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 authority。
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
- 如果 Node v320 无法把 endpoint-handle allowlist contract 与 prerequisite catalog 对齐，必须暂停，不得请求 Java v147 / mini-kv v140。

## 一句话结论

```text
credential-handle-approval 已完成 contract + upstream echo + closure review 闭环；Node v320 已定义 endpoint-handle allowlist approval 的非 raw URL contract。当前下一步是推荐并行 Java v147 + mini-kv v140。
```
