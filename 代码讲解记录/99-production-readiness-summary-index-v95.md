# v95 代码讲解：Production readiness summary index

## 1. v95 聚合哪些证据

`src/services/productionReadinessSummaryIndex.ts` 的加载入口是：

```ts
export async function loadProductionReadinessSummaryIndex(
  config: AppConfig,
): Promise<ProductionReadinessSummaryIndex> {
```

它把已经做完的生产化证据统一取出来：

```ts
releaseEvidenceGate: await loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(config),
ciEvidenceCommandProfile: createCiEvidenceCommandProfile(config),
workflowEvidenceVerification: await loadWorkflowEvidenceVerification(),
deploymentSafetyProfile: createDeploymentSafetyProfile(config),
rollbackEvidenceRunbook: await loadRollbackEvidenceRunbook(config),
auditStoreRuntimeProfile: createAuditStoreRuntimeProfile(),
```

这说明 v95 不是新增一个孤立报告，而是把 v87-v94 的能力连成一个 production readiness index。

## 2. ready 不等于 production-ready

summary 的核心判断是：

```ts
readyForProductionOperations: false,
readOnly: true,
executionAllowed: false,
```

这里有意保持 `readyForProductionOperations=false`。因为前面的证据大多已经 archive-ready，但 v94 发现 audit store 仍是 in-memory runtime，缺 durable store 和 retention policy。

## 3. sections 保留每个证据源的独立状态

`createSections()` 里每个 section 都有自己的 ready、endpoint、blockerCount：

```ts
{
  id: "audit-store-runtime-profile",
  endpoint: ENDPOINTS.auditStoreRuntimeProfileJson,
  ready: input.auditStoreRuntimeProfile.readyForProductionAudit,
  blockerCount: input.auditStoreRuntimeProfile.summary.productionBlockerCount,
  note: "Audit capture is safe for local runtime but blocked for production until durable storage exists.",
}
```

所以 v95 可以清楚表达：release evidence、CI、workflow、deployment、rollback 都接近可归档，但 audit store 仍阻塞生产化。

## 4. blockers 只收生产阻塞项

本版没有把所有 warning 都升级成 blocker，而是把真正影响生产化的项集中收口：

```ts
return input.auditStoreRuntimeProfile.productionBlockers.map((message) => ({
  code: message.code,
  severity: "blocker",
  source: "audit-store-runtime-profile",
  message: message.message,
}));
```

当前三个 blocker 是：

```text
AUDIT_RUNTIME_NOT_DURABLE
DATABASE_AUDIT_STORE_MISSING
AUDIT_RETENTION_POLICY_MISSING
```

这符合靠近生产级的新规则：展示能力可以继续推进，但生产阻塞必须明确可见。

## 5. 路由保持 JSON / Markdown 双格式

`src/routes/statusRoutes.ts` 新增：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/production/readiness-summary", {
```

Markdown 输出用于归档和截图：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderProductionReadinessSummaryIndexMarkdown(summary);
}
```

JSON 输出则给后续 Dashboard、CI 或脚本消费。

## 6. 测试锁住当前成熟度

`test/productionReadinessSummaryIndex.test.ts` 验证当前成熟度不是“全绿假象”：

```ts
expect(index).toMatchObject({
  readyForProductionOperations: false,
  checks: {
    rollbackRunbookReady: true,
    auditStoreProductionReady: false,
    executionStillBlocked: true,
  },
  summary: {
    sectionCount: 6,
    readySectionCount: 5,
    notReadySectionCount: 1,
    productionBlockerCount: 3,
  },
});
```

这让后续版本可以围绕具体 blocker 做生产化推进，而不是继续只堆报告。

## 7. 清理过期 CI 提示

v95 汇总时发现 `ciEvidenceCommandProfile` 仍保留早期的：

```text
WORKFLOW_NOT_CREATED
```

但 v90 已经创建 `.github/workflows/node-evidence.yml`，v93 又新增了 workflow verification endpoint。为了避免 readiness summary 误导，本版同步把该 warning 删除，并把 deployment recommendation 调整为：

```text
VERIFY_NODE_EVIDENCE_WORKFLOW
```

含义从“去创建 workflow”变成“验证已存在的 workflow”，和当前项目状态一致。
