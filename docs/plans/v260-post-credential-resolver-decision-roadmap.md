# Node v260 衍生计划：credential resolver decision 后续阶段

来源版本：Node v260 `sandbox endpoint credential resolver decision record`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans/v257-post-fake-transport-upstream-echo-roadmap.md` 已完成 Node v258、推荐并行 Java v104 + mini-kv v113、Node v259、Node v260，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v258：
- sandbox endpoint handle preflight review 已完成
- 只定义 endpoint handle、credential handle、network/TLS/redaction/operator window review
- 不读取 credential value，不解析 raw endpoint URL，不发真实 HTTP 请求

推荐并行 Java v104 + mini-kv v113：
- 已完成
- Java v104 只读回显 Node v258 endpoint/credential handle review
- mini-kv v113 只读证明 non-participation、no-start、no-write、no-credential、no-raw-endpoint

Node v259：
- sandbox endpoint handle upstream echo verification 已完成
- sourceNodeV258Ready=true、javaV104Ready=true、miniKvV113Ready=true
- endpointHandleAligned=true、credentialHandleAligned=true、policyReviewsAligned=true
- rawEndpointBoundaryAligned=true、connectionBoundaryAligned=true、writeBoundaryAligned=true、autoStartBoundaryAligned=true

Node v260：
- sandbox endpoint credential resolver decision record 已完成
- resolverMode=policy-record-only-no-value-read
- resolverCandidateImplementation=not-implemented
- requiredDecisionFieldCount=8、explicitNoGoConditionCount=9
- credentialValueRead=false、credentialValueLoaded=false、rawEndpointUrlParsed=false、externalRequestSent=false
- 真实 managed audit connection 仍未打开
```

## 推荐执行顺序

```text
1. 推荐并行：Java v105 + mini-kv v114。`下一步`
   - Java v105：credential resolver decision echo marker，只读回显 Node v260 的 endpoint handle、credential handle、resolver policy handle、approval marker、operator identity、approval correlation、redaction policy、fallback / rotation plan handle。
   - mini-kv v114：credential resolver non-participation receipt，只读证明 Node v260 不会导致 credential value read/load/store、raw endpoint parse、external request、schema migration、auto-start、storage write、restore/load/compact/SETNXEX，也不让 mini-kv 成为 managed audit storage backend。
   - 两者可以并行推进，因为只读消费 Node v260，不互相依赖，也不做真实连接。

2. Node v261：credential resolver upstream echo verification。
   - 仅在 Java v105 + mini-kv v114 完成后推进。
   - 消费两边只读 echo / non-participation，验证 resolver policy handle、approval marker、operator identity、approval correlation、redaction/no-side-effect 边界一致。
   - 若两边任一未完成或字段不一致，Node v261 必须停止。

3. Node v262：disabled credential resolver precheck。
   - 消费 Node v261，定义未来 resolver client 之前的 disabled precheck：required env handles、opt-in gate、failure taxonomy、dry-run response shape。
   - 只能是 disabled / dry-run / no secret provider instantiated。
   - 不读取 credential value，不解析 raw endpoint URL，不发真实 external request，不执行 schema migration。

4. 推荐并行：Java v106 + mini-kv v115。
   - Java v106：disabled resolver precheck echo marker，只读回显 Node v262 的 env handles、failure taxonomy、dry-run shape 和 no-go 条件。
   - mini-kv v115：disabled resolver precheck non-participation receipt，继续证明 no-start、no-write、no-credential、no-raw-endpoint、no-restore/load/compact/SETNXEX。
   - 两者可以并行推进；完成前 Node 不推进 v263。

5. Node v263：disabled credential resolver upstream echo verification。
   - 消费 Java v106 + mini-kv v115，验证 disabled resolver precheck 的三方一致性。
   - 若验证通过，后续计划再决定是否进入 test-only resolver shell contract。
```

## 显式质量优化项

```text
Node：
- v261 / v263 若继续读取 Java / mini-kv evidence，必须补 committed historical fixture fallback，确保 GitHub runner 不依赖本机 sibling workspace。
- 新增 audit route 必须继续使用 `auditJsonMarkdownRoutes` + `registerAuditJsonMarkdownRoute` 体系。
- v260 已从一开始拆出 types / renderer；v261 若三方 evidence reader 继续膨胀，应优先抽共享 historical evidence helper，不复制 `evidenceFile/snippet/readJsonObject`。
- v262 只能做 disabled resolver precheck，不实现 secret provider adapter，不实例化真实 client。
- 计划粒度保持一个小闭环：不要把 resolver policy、disabled precheck、test-only shell、真实 credential provider 合到同一版。

Java：
- v105 / v106 只做 echo marker，不把新字段堆回 `OpsEvidenceService`。
- 若新增 builder，沿用 v94-v104 的 builder/helper 拆分方式。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- v114 / v115 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
- 若新增 receipt，优先复用 formatter/helper，不扩大 command dispatch if-chain。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v105 / mini-kv v114 未完成时，Node v261 必须停止。
- Java v106 / mini-kv v115 未完成时，Node v263 必须停止。
- 任一版本从 credential resolver decision / disabled precheck 变成真实 secret provider 或 external endpoint request，必须暂停并另起计划。

## 一句话结论

```text
v260 已把 sandbox endpoint 后续推进到 credential resolver 的人工决策记录；下一阶段先由 Java v105 + mini-kv v114 并行只读回显/非参与，再由 Node v261 做三方验证，仍不读取 credential value、不解析 raw endpoint URL、不打开真实 managed audit connection。
```
