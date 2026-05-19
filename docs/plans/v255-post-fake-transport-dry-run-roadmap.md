# Node v255 衍生计划：fake transport dry-run packet 后续阶段

来源版本：Node v255 `fake transport adapter dry-run verification packet`。

计划状态：当前唯一有效全局计划。上一份 `docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md` 已完成 Node v253、推荐并行 Java v102 + mini-kv v111、Node v254、Node v255，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v252：
- disabled adapter client precheck 已完成
- requiredEnvHandleCount=5，failureClassCount=6，dryRunResponseFieldCount=10
- clientMayBeInstantiated=false，externalRequestMayBeSent=false，credentialValueMayBeLoaded=false

Node v253：
- test-only adapter shell contract 已完成
- fakeTransportOnly=true，realClientImplemented=false，realTransportAllowed=false
- requestShapeFieldCount=8，responseShapeFieldCount=9，failureMappingCount=6，guardConditionCount=7

推荐并行 Java v102 + mini-kv v111：
- 已完成只读 echo / non-participation
- Java 不写 ledger、不执行 SQL、不打开 managed audit connection
- mini-kv 不写 storage、不读 credential、不执行 restore/load/compact/SETNXEX、不成为 managed audit storage backend

Node v254：
- disabled adapter client upstream echo verification 已完成
- env handle、failure taxonomy、fake transport shape、credential/connection/write/auto-start 边界均已三方对齐
- 已补 GitHub historical fixture fallback

Node v255：
- fake transport adapter dry-run verification packet 已完成
- request 只携带 credentialHandle / endpointHandle，不含 credential value 或 raw endpoint URL
- response 只表达 fake transport result，不声明真实 connection side effect
- timeoutBudgetMs=15000，budgetSpent=false，timerStarted=false
- cleanup 证明 inMemoryOnly=true、temporaryDirectoryCreated=false、temporaryFileCreated=false、cleanupArtifactCount=0

Node v256：
- fake transport packet archive verification 已完成
- 已验证 v255 HTML、截图、解释、代码讲解、route response、packet/request/response digest 与 cleanup evidence
- archiveVerificationRerunsFakeTransportBehavior=false，不重新执行 fake transport 行为，不创建 `.tmp` dry-run 目录
- 下一步按本计划推荐并行 Java v103 + mini-kv v112，Node v257 必须等待两边完成
```

## 推荐执行顺序

```text
1. Node v256：fake transport packet archive verification。
   - 消费 Node v255 的 HTML、截图、解释、代码讲解、route response 和 cleanup 证据。
   - 只做归档完整性与 packet digest 验证，不重新推进 fake transport 行为。
   - 如果 v255 归档缺截图、解释、代码讲解、route 或 cleanup evidence，v256 必须 blocked。
   - 状态：已完成。

2. 推荐并行：Java v103 + mini-kv v112。
   - Java v103：fake transport dry-run packet echo marker，只读回显 Node v255 packet 的 request/response/timeout/cleanup 边界；不写 ledger、不执行 SQL、不打开 managed audit connection。
   - mini-kv v112：fake transport dry-run packet non-participation receipt，只读证明 Node v255 不触发 mini-kv auto-start、storage write、credential read、restore/load/compact/SETNXEX，也不让 mini-kv 成为 managed audit storage backend。
   - 两者可以并行推进，因为只读消费 Node v255 的 packet，不互相依赖，也不做真实连接。

3. Node v257：fake transport packet upstream echo verification。
   - 仅在 Java v103 + mini-kv v112 完成后推进。
   - 消费两边只读 echo / non-participation，验证 request/response/timeout/cleanup/side-effect boundary 一致。
   - 若两边任一未完成或字段不一致，Node v257 必须停止。
```

## 显式质量优化项

```text
Node：
- v256 不要新建 700+ 行 service；如果 archive verification 字段多，继续拆 types / renderer / archive reference helper。
- 新增 audit route 必须继续使用 `auditJsonMarkdownRoutes` + `registerAuditJsonMarkdownRoute` 体系。
- v256 只做归档验证，不新增 fake transport 行为，不创建 `.tmp` dry-run 目录。
- v257 若需要读取 Java/mini-kv 证据，必须补 committed historical fixture fallback，确保 GitHub runner 不依赖本机 sibling workspace。

Java：
- v103 只做 echo marker，不把新字段堆回 `OpsEvidenceService`。
- 若新增 builder，沿用 v94-v102 的 builder/helper 拆分方式。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- v112 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
- 若新增 receipt，优先复用 formatter/helper，不扩大 command dispatch if-chain。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- v256 如果变成重新执行 fake transport 行为而不是验证归档，必须暂停。
- Java v103 / mini-kv v112 未完成时，Node v257 必须停止。
- 任一版本从 fake transport 变成真实 external endpoint request，必须暂停。

## 一句话结论

```text
v255 已把 fake transport dry-run packet 收口为可验证证据；下一步先由 Node v256 做归档验证，再推荐并行 Java v103 + mini-kv v112 只读回显/非参与，最后由 Node v257 做三方 upstream echo verification。仍然不打开真实 managed audit connection。
```
