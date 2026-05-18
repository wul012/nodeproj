# Node v252 衍生计划：disabled adapter client precheck 后续阶段

来源版本：Node v252 `disabled adapter client precheck`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans/v245-post-sandbox-precheck-roadmap.md` 已完成 Node v246-v252，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v250：
- manual sandbox connection rehearsal guard 已完成
- 消费 Node v247-v249、Java v101、mini-kv v110，形成连接前人工守卫
- 不读取 credential value，不打开 managed audit connection，不执行 schema migration，不启动 Java / mini-kv

Node v251：
- manual sandbox connection decision record 已完成
- 已固化 owner approval artifact、credential handle review、schema rehearsal approval、manual window marker、rollback path、abort marker、timeout policy
- 已列出八个 no-go 条件，任一触发都必须 pause-and-do-not-connect

Node v252：
- disabled adapter client precheck 已完成
- 已定义 required env handles、opt-in gate、failure taxonomy、dry-run response shape 和复用 no-go 条件
- adapter client 仍是 not-implemented
- clientMayBeInstantiated=false，externalRequestMayBeSent=false，credentialValueMayBeLoaded=false
- 仍不读取 credential value，不发真实外部请求，不打开 managed audit connection，不执行 schema migration，不启动 Java / mini-kv

Node v253：
- test-only adapter shell contract 已完成
- 只定义 fake in-memory transport、request/response shape、failure mapping、guard conditions 和 fake transport probe
- fakeTransportOnly=true，realClientImplemented=false，realTransportAllowed=false
- externalRequestSent=false，credentialValueRead=false，productionRecordWritten=false
- 仍不读取 credential value，不请求真实 external endpoint，不打开 managed audit connection，不执行 schema migration，不启动 Java / mini-kv
```

## 推荐执行顺序

```text
1. Node v253：test-only adapter shell contract。已完成。
   - 消费 Node v252 disabled adapter client precheck。
   - 只定义 fake transport / test-only adapter shell 的接口、输入输出 shape、失败分类映射和 guard 条件。
   - 允许在单元测试里用 fake transport 验证 shape，但不读取 credential value、不请求真实 external endpoint、不连接 managed audit。
   - 如果需要真实 endpoint、生产 IdP、真实 credential value、schema migration 或上游 auto-start，必须暂停。

2. 推荐并行：Java v102 + mini-kv v111。
   - Java v102：disabled adapter client precheck echo receipt，只读回显 Node v252 的 env handle、opt-in gate、failure taxonomy 和 no-go 条件；不写 approval ledger、不执行 SQL、不打开 managed audit connection。
   - mini-kv v111：disabled adapter client non-participation receipt，只读证明 Node v252 / v253 不会让 mini-kv 自动启动、写 storage、读取 credential、执行 restore/load/compact/SETNXEX，也不会成为 managed audit storage backend。
   - 两者可以并行推进，因为它们只读消费 Node v252 / v253 的边界，不互相依赖，也不做真实连接。

3. Node v254：disabled adapter client upstream echo verification。
   - 只读消费 Java v102 + mini-kv v111。
   - 验证 env handle count、failure taxonomy count、credential/connection/schema/auto-start 边界一致。
   - 如果两边未完成或字段不一致，Node v254 必须停止，不得降级为部分 ready。

4. Node v255：fake transport adapter dry-run verification packet。
   - 仅在 Node v253 和 Node v254 都 ready 后推进。
   - 只能验证 fake transport adapter 的 dry-run request/response、timeout budget、failure mapping 和 cleanup。
   - 不打开真实 managed audit connection，不读取 credential value，不执行 schema migration，不启动 Java / mini-kv。
```

## 显式质量优化项

```text
Node：
- v253 不得把 fake transport shell 膨胀成真实 client；真实 transport 必须等 owner approval、credential value 读取授权、schema rehearsal 和 manual window 都有明确版本证据后再单独计划。
- v253 已完成 test-only adapter shell contract，真实连接能力仍未打开；下一步应优先让 Java v102 + mini-kv v111 回显/非参与，而不是 Node 抢跑 v254。
- v253 / v255 如果新增 service，优先保持小闭环；若文件接近 700 行，应拆 profile types、builder、renderer 或 route registration helper。
- 新增 audit route 必须继续使用 `auditJsonMarkdownRoutes` + `registerAuditJsonMarkdownRoute` 体系，不回到手写 JSON/Markdown 双路由。
- 若继续出现 managed-audit sandbox profile 大字段集合，应复用已有 guard/type 聚合，不重复粘贴 70+ 字段 interface。

Java：
- v102 只做 echo receipt，不把新字段堆回 `OpsEvidenceService`。
- 若需要新增 builder，优先沿用 Java v94-v101 的拆分模式，避免长构造参数继续膨胀。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- v111 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
- 若需要补命令说明，优先复用既有 formatter/helper，避免扩大 command dispatch if-chain。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v102 / mini-kv v111 未完成时，Node v254 必须停止。
- Node v253 / v255 如果从 fake transport 变成真实 external endpoint request，必须暂停。

## 一句话结论

```text
v252 已把真实 adapter client 前的 disabled precheck 写清楚；Node v253 已完成 test-only adapter shell contract。下一步推荐并行 Java v102 + mini-kv v111 回显/非参与，之后由 Node v254 做三方 echo verification。仍然不打开真实 managed audit connection。
```
