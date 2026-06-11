# 2068 - Node v2084-v2088 生产分片执行外部证据前置批次代码讲解

## 批次目标

v2084-v2088 没有打开真实生产分片执行，而是把“真实执行前必须由外部材料证明的事项”整理成可验证的 Node 侧前置链。上一批 v2078-v2083 已经把候选合同、失败矩阵、操作窗口 worksheet 和 closeout 补齐；这一批继续处理四个更接近生产前的硬条件：

- live route catalog 增长不能误伤历史归档；
- signed approval 需要稳定的 artifact schema；
- managed audit 生产存储需要先有 disconnected preflight；
- Java / mini-kv owner receipts 需要精确请求槽位；
- Node 侧应在 v2088 收口，等待真实外部 artifact，而不是继续堆内部治理层。

## 入口路由

新路由统一注册在：

```text
src/routes/auditProductionShardExecutionRoutes.ts
```

本批新增 5 个 audit JSON/Markdown 路由：

```text
/api/v1/audit/production-shard-execution-route-catalog-forward-compatibility
/api/v1/audit/production-shard-execution-signed-approval-intake-contract
/api/v1/audit/production-shard-execution-managed-audit-store-binding-preflight
/api/v1/audit/production-shard-execution-owner-receipt-request-packet
/api/v1/audit/production-shard-execution-external-evidence-closeout
```

它们仍走 `auditJsonMarkdownRoute()`，所以 JSON 和 Markdown 输出来自同一个 profile，route catalog、access policy、Fastify smoke 都能覆盖到。

## 公共模型扩展

公共类型在：

```text
src/services/productionShardExecutionReadinessTypes.ts
```

本批新增 stage id、profile version、Node version、ready state 和 decision。关键点不是扩字段数量，而是保持所有 profile 继续共享以下强约束：

```ts
readyForProductionShardExecution: false;
candidateOnly: true;
javaMiniKvRecommendedParallel: true;
nodeIsUpstreamPreApprovalBlocker: false;
safety.executionAllowed: false;
safety.connectsManagedAudit: false;
safety.credentialValueRead: false;
safety.rawEndpointUrlParsed: false;
```

也就是说，这一批可以让前置材料更成熟，但不能被误读为真实执行批准。

`src/services/productionShardExecutionReadinessBuilder.ts` 也做了一个小重构：`isNodeVersion()` 不再用不断加长的正则，而是改成 `PRODUCTION_SHARD_EXECUTION_NODE_VERSIONS` 集中列表。后续继续扩版本时，只需要改一个列表，维护成本更低。

## v2084: route catalog forward compatibility

文件：

```text
src/services/productionShardExecutionRouteCatalogForwardCompatibility.ts
```

v2084 解决的是当前 CI 暴露出来的真实问题：旧 Java/mini-kv route-catalog closeout 把 live catalog group count 写成 `=== 50`，但新 production shard execution route group 加入后，live catalog 是 51 个 group。这不是回归，而是目录增长。

因此 v2084 的语义是：

- historical archive 仍保留当时的精确数字；
- live catalog 稳定性用 lower-bound；
- v2084 之后再加 v2085-v2088 路由，不会把旧归档误判为 broken；
- archive 布局明确使用 `e/<version>/evidence` 和 `e/<version>/解释`。

同时修复了相关旧 closeout 服务里的 live catalog 判断，使它们从“必须等于历史 group count”改成“至少满足历史 floor”。

## v2085: signed approval intake contract

文件：

```text
src/services/productionShardExecutionSignedApprovalIntakeContract.ts
```

v2085 只定义签名批准 artifact 的未来形状，不接受真实批准。它列出的字段包括：

- approval id；
- approval window id；
- operator identity；
- approved scope；
- source readiness digest；
- issue / expiry time；
- signature digest。

这版的重点是把以后真实批准接入的“形状”固定下来。它故意保留 production blocker：没有真实签名批准 artifact，就不能执行。

## v2086: managed audit store binding preflight

文件：

```text
src/services/productionShardExecutionManagedAuditStoreBindingPreflight.ts
```

v2086 定义生产 managed audit store binding 之前必须满足的预检项：

- immutable execution record；
- idempotent archive write；
- retention class；
- credential redaction proof；
- cleanup proof lookup。

这版没有连接真实 managed audit store，没有读取 credential value，也没有解析 raw endpoint URL。它的价值在于把“将来怎么安全绑定存储”先讲清楚，避免签名批准一到位就直接跳到 runtime integration。

## v2087: owner receipt request packet

文件：

```text
src/services/productionShardExecutionOwnerReceiptRequestPacket.ts
```

v2087 把 Java、mini-kv、cross-project cleanup 的缺口整理成 3 个具体 receipt request：

- Java abort / rollback / cleanup owner receipt；
- mini-kv abort / rollback / cleanup owner receipt；
- cross-project cleanup reconciliation receipt。

这里特别重要的一点是：Node 没有声称这些 receipt 已经存在。它只给另外两个项目一个清晰、可照着推进的目标槽位。Java 和 mini-kv 因此可以并行工作，不需要等待 Node 再写更多内部计划。

## v2088: external evidence closeout

文件：

```text
src/services/productionShardExecutionExternalEvidenceCloseout.ts
```

v2088 消费 v2084-v2087 的 profile digest，把本批 Node 侧前置工作收口。它明确列出真实执行前仍缺的外部 artifact：

- real signed production execution approval artifact；
- managed audit production store owner binding；
- Java owner receipt；
- mini-kv owner receipt；
- cross-project cleanup reconciliation receipt。

这就是本批的停止条件：继续增加 Node-only 前置版本的收益已经下降，下一次真正质变应该来自真实外部 artifact intake。

## Route catalog 计数变化

本批新增 5 条 `java-mini-kv` domain 下的 audit route，因此：

```text
routeCount: 236 -> 241
java-mini-kv domain routeCount: 70 -> 75
groupCount: 51
```

对应更新在：

```text
src/routes/auditJsonMarkdownRouteCatalogSummary.ts
```

同时 focused 测试覆盖：

```text
test/productionShardExecutionReadiness.test.ts
test/auditJsonMarkdownRouteCatalogSummary.test.ts
test/auditJsonMarkdownRouteCatalogIntegrity.test.ts
test/auditJsonMarkdownRouteGroups.test.ts
```

## 归档布局

本批没有浏览器页面截图需求，所以没有创建 `图片` 目录。每个版本都单独归档：

```text
e/2084/evidence
e/2084/解释
e/2085/evidence
e/2085/解释
e/2086/evidence
e/2086/解释
e/2087/evidence
e/2087/解释
e/2088/evidence
e/2088/解释
```

每版各有：

- route JSON evidence；
- route Markdown evidence；
- summary JSON；
- version explanation。

## 工程意义

这一批不是“多加五个报告凑版本”。它把 v2078-v2083 之后真正会挡住生产分片执行的外部条件拆成了可验证的 Node 侧结构，并且把停止条件写进 v2088：没有真实 signed approval、managed audit owner binding 和 sibling owner receipts，就不要继续用 Node-only gate 冒充成熟度。
