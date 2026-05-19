# Node v257 衍生计划：fake transport upstream echo 后续阶段

来源版本：Node v257 `fake transport packet upstream echo verification`。

计划状态：已完成并收口。上一份 `docs/plans/v255-post-fake-transport-dry-run-roadmap.md` 已完成 Node v256、推荐并行 Java v103 + mini-kv v112、Node v257，并已收口；本计划已完成 Node v258、推荐并行 Java v104 + mini-kv v113、Node v259、Node v260。后续由 `docs/plans/v260-post-credential-resolver-decision-roadmap.md` 接续，不再向本计划追加重合版本。

## 当前对齐状态

```text
Node v255：
- fake transport adapter dry-run verification packet 已完成
- requestShapeFieldCount=8，responseShapeFieldCount=9，failureMappingCount=6，timeoutBudgetMs=15000
- cleanupArtifactCount=0，cleanupVerified=true
- credentialValueIncluded=false，rawEndpointUrlIncluded=false，connectionAttempted=false

Node v256：
- fake transport packet archive verification 已完成
- 已验证 v255 HTML、截图、解释、代码讲解、route response、packet/request/response digest 与 cleanup evidence
- archiveVerificationRerunsFakeTransportBehavior=false

推荐并行 Java v103 + mini-kv v112：
- 已完成
- Java v103 只读回显 Node v255/v256 的 fake transport packet / archive verification 边界
- mini-kv v112 只读证明 non-participation、no auto-start、no storage write、no credential read、no restore/load/compact/SETNXEX

Node v257：
- fake transport packet upstream echo verification 已完成
- requestShapeAligned=true、responseShapeAligned=true、timeoutBoundaryAligned=true、failureMappingAligned=true、cleanupBoundaryAligned=true
- credentialBoundaryAligned=true、connectionBoundaryAligned=true、writeBoundaryAligned=true、autoStartBoundaryAligned=true
- 真实 managed audit connection 仍未打开

Node v258：
- sandbox endpoint handle preflight review 已完成
- endpointHandle=ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE
- credentialHandle=ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
- networkAllowlistReviewReady=true、tlsPolicyReviewReady=true、redactionPolicyReady=true、operatorWindowReviewReady=true
- rawEndpointUrlParsed=false、credentialValueRead=false、externalRequestSent=false、schemaMigrationExecuted=false

推荐并行 Java v104 + mini-kv v113：
- 已完成
- Java v104 只读回显 Node v258 的 endpoint/credential handle review、network/TLS/redaction/operator window 边界
- mini-kv v113 只读证明 non-participation、no auto-start、no storage write、no credential read、no raw endpoint parse、no restore/load/compact/SETNXEX

Node v259：
- sandbox endpoint handle upstream echo verification 已完成
- sourceNodeV258Ready=true、javaV104Ready=true、miniKvV113Ready=true
- endpointHandleAligned=true、credentialHandleAligned=true、reviewCountsAligned=true、policyReviewsAligned=true
- rawEndpointBoundaryAligned=true、connectionBoundaryAligned=true、writeBoundaryAligned=true、autoStartBoundaryAligned=true
- evidenceFileCount=6、matchedSnippetCount=39、checkCount=19、passedCheckCount=19
- 真实 managed audit connection 仍未打开

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
1. Node v258：sandbox endpoint handle preflight review。`已完成`
   - 消费 Node v257 三方 echo verification。
   - 只定义真实 sandbox endpoint 进入前的 handle-only review：endpoint handle、credential handle、owner approval artifact、network allowlist review、TLS policy review、redaction policy、operator window。
   - 不读取 credential value，不解析 raw endpoint URL，不发真实 HTTP 请求，不执行 schema migration。
   - 这是从 fake transport 走向真实 endpoint 的前置 review，不是连接实现。

2. 推荐并行：Java v104 + mini-kv v113。`已完成`
   - Java v104：sandbox endpoint handle preflight echo marker，只读回显 Node v258 的 endpoint/credential handle review、network/TLS/redaction/operator window 边界；不写 ledger、不执行 SQL、不打开 managed audit connection。
   - mini-kv v113：sandbox endpoint handle non-participation receipt，只读证明 Node v258 不触发 mini-kv auto-start、storage write、credential read、external request、restore/load/compact/SETNXEX，也不让 mini-kv 成为 managed audit storage backend。
   - 两者可以并行推进，因为只读消费 Node v258，不互相依赖，也不做真实连接。

3. Node v259：sandbox endpoint handle upstream echo verification。`已完成`
   - 仅在 Java v104 + mini-kv v113 完成后推进。
   - 消费两边只读 echo / non-participation，验证 endpoint handle、credential handle、network/TLS/redaction/operator-window/no-side-effect 边界一致。
   - 若两边任一未完成或字段不一致，Node v259 必须停止。

4. Node v260：sandbox endpoint credential resolver decision record。`已完成`
   - 消费 Node v259，生成人工决策记录，明确哪些条件满足后才允许进入 credential resolver rehearsal。
   - 仍然只记录 credential handle / resolver policy / approval marker，不读取 credential value。
   - 如果 v260 需要真实 credential、raw endpoint URL 或外部网络连接，必须暂停并另起新计划。

5. 后续计划。
   - 本计划到 v260 收口。
   - 后续由 `docs/plans/v260-post-credential-resolver-decision-roadmap.md` 接续。
```

## 显式质量优化项

```text
Node：
- v258 不要直接实现真实 HTTP adapter；只做 endpoint handle preflight review。
- v258/v259 新增 audit route 必须继续使用 `auditJsonMarkdownRoutes` + `registerAuditJsonMarkdownRoute` 体系。
- 若 v258/v259 需要 Java/mini-kv 证据，必须补 committed historical fixture fallback，确保 GitHub runner 不依赖本机 sibling workspace。
- v257 service 已达到 741 行；下一次同类三方 evidence reader 若继续膨胀，应优先抽共享 historical evidence helper，不再复制 `evidenceFile/snippet/readJsonObject`。
- 计划粒度保持一个小闭环：不能只加文档，也不能把真实 endpoint、credential resolver、schema migration 三件事塞进同一版。

Java：
- v104 只做 echo marker，不把新字段堆回 `OpsEvidenceService`。
- 若新增 builder，沿用 v94-v103 的 builder/helper 拆分方式。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- v113 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
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
- Java v104 / mini-kv v113 未完成时，Node v259 必须停止。`已满足`
- 任一版本从 endpoint handle review 变成真实 external endpoint request，必须暂停并另起计划。

## 一句话结论

```text
v255-v260 已把 fake transport dry-run packet 推进到 sandbox endpoint handle 三项目 upstream echo verification，并完成 credential resolver decision record。本计划收口，后续由 v260 衍生计划接续，仍不读取 credential value、不解析 raw endpoint URL、不打开真实 managed audit connection。
```
