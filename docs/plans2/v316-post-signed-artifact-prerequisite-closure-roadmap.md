# Node v316 衍生计划：signed artifact prerequisite closure 之后

来源版本：Node v316 `signed human approval artifact prerequisite closure review`。

计划状态：当前有效全局计划。上一份 `docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md` 已完成 Node v314、Java v145、mini-kv v138、Node v315、Node v316 的 signed-human-approval-artifact 闭环；本计划另起续写，不回填旧版本，不写重复版本。

## 当前对齐状态

```text
Node v312：只关闭 java-mini-kv-decision-echo，剩余 5 个 prerequisite 仍缺。
Node v313：prerequisite catalog cleanup 已完成。
Node v314：signed-human-approval-artifact contract intake 已完成。
Java v145：只读 echo Node v314 signed artifact contract 已完成。
mini-kv v138：non-participation receipt 已完成。
Node v315：三方 signed artifact contract upstream echo verification 已完成。
Node v316：signed-human-approval-artifact prerequisite closure review 已完成；当前完成 2/6 prerequisite，剩余 4/6。
Node v317：credential-handle approval contract intake 已完成；只定义非 secret contract，未请求真实连接、credential 读取或写操作。

剩余 prerequisite：
- credential-handle-approval
- endpoint-handle-allowlist-approval
- no-network-safety-fixture
- abort-rollback-semantics

三项目当前仍不读取 credential value、不解析 raw endpoint URL、不打开 managed audit connection、不写 ledger、不执行 schema migration、不自动启动上游。
```

## 推荐执行顺序

```text
1. Node v317：credential-handle approval contract intake。已完成。
   - 只定义 credential handle approval 的非 secret contract。
   - 允许字段只能是 credential handle、approval status、reviewer/operator handle、policy version、correlation id、issued/expires timestamp、revocation marker、audit digest 等非 secret 信息。
   - 禁止字段必须包含 credential value、raw endpoint URL、secret provider config、resolver client config、external request payload、ledger mutation、schema migration SQL。
   - 不请求 Java/mini-kv，直到 Node v317 contract 和归档完成。

2. 推荐并行：Java v146 + mini-kv v139。当前下一步。
   - Node v317 已完成后执行。
   - Java v146：只读 echo Node v317 credential-handle approval contract，不写 approval ledger，不执行 SQL/deployment/rollback。
   - mini-kv v139：non-participation receipt，只确认不存储 credential value、不校验 credential、不承载 credential authority。
   - 两边互不依赖，可以并行推进。

3. Node v318：credential-handle approval contract upstream echo verification。
   - 消费 Node v317 + Java v146 + mini-kv v139。
   - 只验证三方对 credential-handle approval contract 的理解一致。
   - 如果 Java v146 或 mini-kv v139 未完成，Node v318 必须停止。

4. Node v319：post-credential-handle prerequisite closure review。
   - 只有 Node v318 完成后再做。
   - 判断 credential-handle-approval 是否可以推进到 `contract-intake-and-upstream-echo-complete`。
   - 即使 v319 完成，也仍不解锁 raw endpoint URL、provider/client、HTTP/TCP、ledger/schema 或 runtime shell。
```

## 显式质量优化项

```text
Node：
- v317 起必须继续拆成 types / service / renderer / test，避免单文件膨胀。
- 若 credential-handle approval contract 与 v314 signed artifact contract 的 required/prohibited/rejection/no-go 结构重复明显，应抽共享 helper 或 catalog，不复制长字段。
- 新增治理链必须写 necessity proof：解决哪个 blocker、谁消费、为什么不能复用现有 report、何时停止继续延伸。
- 运行截图、解释写入 d/<版本>/；代码讲解写入 代码讲解记录_生产雏形阶段2/。

Java：
- 当前计划不要求 Java 抢跑。
- Java v146 只有在 Node v317 完成后才做，只能只读 echo，不写 ledger、不执行 SQL/deployment/rollback。

mini-kv：
- 当前计划不要求 mini-kv 抢跑。
- mini-kv v139 只有在 Node v317 完成后才做，只能 non-participation receipt，不执行 LOAD/COMPACT/RESTORE/SETNXEX，不成为 authority。
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
- 如果 Node v317 无法把 credential-handle approval contract 与 prerequisite catalog 对齐，必须暂停，不得请求 Java v146 / mini-kv v139。

## 一句话结论

```text
signed-human-approval-artifact 已完成 contract + upstream echo 闭环；Node v317 也已定义 credential-handle approval 的非 secret contract。当前下一步是推荐并行 Java v146 + mini-kv v139；两边完成后，Node v318 再做 credential-handle approval upstream echo verification。
```
