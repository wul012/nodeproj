# Node v263 衍生计划：disabled resolver echo 后续阶段

来源版本：Node v263 `sandbox endpoint credential resolver disabled precheck upstream echo verification`。

计划状态：下一阶段当前唯一有效全局计划。上一份 `docs/plans/v260-post-credential-resolver-decision-roadmap.md` 已完成推荐并行 Java v106 + mini-kv v115 与 Node v263，并已收口；后续不再向旧计划追加重合版本。

## 当前对齐状态

```text
Node v260：
- sandbox endpoint credential resolver decision record 已完成
- 只记录 resolver policy handle、approval marker、operator identity、approval correlation、redaction policy、fallback / rotation plan
- 不读取 credential value，不解析 raw endpoint URL，不打开真实 managed audit connection

Java v105 + mini-kv v114：
- 已推荐并行完成
- Java 只读回显 Node v260 decision record
- mini-kv 只读证明 credential resolver non-participation

Node v261：
- credential resolver upstream echo verification 已完成
- 验证 Node v260、Java v105、mini-kv v114 的 resolver policy、approval marker、decision fields 和 no-go conditions 一致

Node v262：
- disabled credential resolver precheck 已完成
- 定义 6 个 env handles、2 个 opt-in gates、7 个 failure classes、12 个 dry-run response fields、9 个 inherited no-go conditions
- 不实例化 resolver client / secret provider，不读取 credential value，不解析 raw endpoint URL，不发 external request

Java v106 + mini-kv v115：
- 已推荐并行完成
- Java 只读回显 Node v262 disabled precheck
- mini-kv 只读证明 disabled resolver precheck non-participation、no-start、no-write、no-credential、no-raw-endpoint、no-restore/load/compact/SETNXEX

Node v263：
- disabled credential resolver upstream echo verification 已完成
- sourceNodeV262Ready=true、javaV106EchoReady=true、miniKvV115NonParticipationReady=true
- disabledPrecheckAligned=true、requiredEnvHandlesAligned=true、optInGatesAligned=true、failureTaxonomyAligned=true、dryRunResponseShapeAligned=true、inheritedNoGoConditionsAligned=true
- credentialBoundaryAligned=true、rawEndpointBoundaryAligned=true、connectionBoundaryAligned=true、writeBoundaryAligned=true、autoStartBoundaryAligned=true
- 补齐 Java v106 / mini-kv v115 committed historical fallback，并抽出 shared historical evidence helper

Node v264：
- credential resolver test-only shell contract 已完成
- 消费 Node v263，定义 fake in-memory resolver shell 的 request / response / failure mapping / guard / fake resolver probe
- request 只接受 credential handle、endpoint handle、resolver policy handle、approval marker 和 approval correlation，不接受 credential value 或 raw endpoint URL
- response 明确 resolverClientInstantiated=false、secretProviderInstantiated=false、credentialValueRead=false、rawEndpointUrlParsed=false、externalRequestSent=false、connectsManagedAudit=false、schemaMigrationExecuted=false
- 不实例化真实 secret provider，不发真实 external request，不打开 managed audit connection
```

## 推荐执行顺序

```text
1. Node v264：credential resolver test-only shell contract。`已完成`
   - 消费 Node v263。
   - 只定义 test-only fake resolver shell 的 request / response / guard / failure mapping。
   - resolver input 只能携带 credential handle、endpoint handle、policy handle、approval marker，不允许 credential value 或 raw endpoint URL。
   - 不实例化真实 secret provider，不发真实 external request，不打开 managed audit connection。

2. 推荐并行：Java v107 + mini-kv v116。
   - Java v107：test-only resolver shell contract echo marker，只读回显 Node v264 的 fake-only request / response / failure mapping 和 no-side-effect boundary。
   - mini-kv v116：test-only resolver shell non-participation receipt，继续证明 mini-kv 不参与 resolver、secret provider、credential value、raw endpoint、external request、storage write、LOAD/COMPACT/RESTORE/SETNXEX。
   - 两者可以并行，因为只读消费 Node v264，不互相依赖，也不做真实连接。

3. Node v265：test-only resolver shell upstream echo verification。
   - 仅在 Java v107 + mini-kv v116 完成后推进。
   - 消费两边 echo / non-participation，验证 test-only resolver shell 的 request / response / failure mapping / no-side-effect 边界一致。
   - 若两边任一未完成或字段不一致，Node v265 必须停止。

4. Node v266：credential resolver fake-shell archive verification。
   - 只读验证 Node v264 / v265 的 HTML、截图、解释、代码讲解、route digest、historical fallback 和 active plan 片段。
   - 不重新执行 fake resolver shell，不接入真实 secret provider，不打开真实 managed audit connection。
```

## 显式质量优化项

```text
Node：
- v263 已新增 `historicalEvidenceReportUtils.ts`，后续跨项目 evidence reader 必须复用该 helper，不再复制 `evidenceFile/snippet/readJsonObject/objectField` 样板。
- 新增 audit JSON/Markdown route 必须继续使用 `auditJsonMarkdownRoutes` + `registerAuditJsonMarkdownRoute` 体系。
- v264 若新增 test-only shell，从一开始拆出 types / renderer；避免把一个 700+ 行 service 再扩成新债务。
- v264-v266 只能处理 test-only / fake-only shell，不实现真实 credential resolver client，不读取 credential value，不解析 raw endpoint URL。
- 每次消费 Java / mini-kv evidence 必须补 committed historical fallback，确保 GitHub runner 不依赖 `D:/javaproj` 或 `D:/C/mini-kv`。

Java：
- v107 只做 echo marker，不把新字段堆回 `OpsEvidenceService`。
- 若新增 builder，沿用 v94-v106 的 builder/helper/records 拆分方式。
- 不写 approval ledger，不执行 SQL，不读取 credential value，不打开 managed audit connection。

mini-kv：
- v116 只做 non-participation receipt，不触碰 WAL/snapshot/restore 核心语义。
- 不执行 LOAD / COMPACT / RESTORE / SETNXEX / 写命令，不成为 managed audit storage backend。
- 若新增 receipt，继续复用 credential resolver receipt 模块，不扩大 command dispatch if-chain。
```

## 暂停条件

- 需要真实生产 managed audit credential、生产数据库、生产 IdP 或生产密钥。
- 需要 Node、Java 或 mini-kv 读取 credential value，而不是 credential handle / review status。
- 需要 Node 解析或输出 raw endpoint URL，而不是 endpoint handle / allowlist review status。
- 需要 Node 实例化真实 secret provider 或真实 credential resolver client。
- 需要 Node 自动启动 Java、mini-kv 或外部审计服务。
- 需要 Node 向真实 managed audit endpoint 发 HTTP/TCP 请求。
- 需要 Java 写 approval ledger、执行 SQL、deployment 或 rollback。
- 需要 mini-kv 执行 LOAD、COMPACT、SETNXEX、RESTORE 或承载 audit/order 权威状态。
- Java v107 / mini-kv v116 未完成时，Node v265 必须停止。
- 任一版本从 test-only fake shell 变成真实 secret provider、credential value reader 或 external endpoint request，必须暂停并另起计划。

## 一句话结论

```text
v263 已把 disabled resolver precheck 的三方一致性验证收口；下一阶段可以谨慎进入 test-only resolver shell contract，但仍必须保持 fake-only、handle-only、no credential value、no raw endpoint、no external request。
```
