# 第一百二十五版代码讲解：production readiness summary v9

本版目标是把 v123 和 v124 的候选层证据接入新的生产就绪汇总。

它不连接真实数据库、不访问真实 IdP、不打开真实上游执行。本版做的是：

```text
读取 managed audit adapter runner
读取 JWKS cache contract
读取 production readiness summary v8
区分候选层通过与真实生产连接仍缺失
继续保持 readyForProductionOperations=false
```

## 本版所处项目进度

v123 已经落地：

```text
src/services/managedAuditAdapterRunner.ts
```

它证明：

```text
memory target pass
file-candidate target pass
同一套 ManagedAuditAdapter runner 可复用
```

v124 已经落地：

```text
src/services/jwksCacheContract.ts
```

它证明：

```text
cache hit pass
unknown kid rejected
expired cache rejected
rotation marker changed
```

v125 的任务是把这两个“候选层”纳入生产就绪判断。

## 新增服务

新增文件：

```text
src/services/productionReadinessSummaryV9.ts
```

入口函数：

```ts
export async function loadProductionReadinessSummaryV9(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionReadinessSummaryV9> {
  const adapterRunner = await createManagedAuditAdapterRunnerProfile(input.config);
  const jwksCacheContract = createJwksCacheContractProfile(input.config);
  const summaryV8 = await loadProductionReadinessSummaryV8(input);
```

这里复用三条证据源：

```text
v123 adapterRunner
v124 jwksCacheContract
v122 summaryV8
```

v9 不重复 runner 和 cache 的内部逻辑，只负责生产级聚合判断。

## 核心 checks

adapter runner 判断：

```ts
adapterRunnerPasses: adapterRunner.checks.memoryRunnerPasses
  && adapterRunner.checks.fileCandidateRunnerPasses
  && adapterRunner.checks.allRunnerTargetsPass
  && adapterRunner.checks.noDatabaseConnectionAttempted
  && adapterRunner.checks.noAuditFileMigrationPerformed,
```

真实 managed audit adapter 状态：

```ts
realManagedAuditAdapterConnected: adapterRunner.checks.realManagedAdapterConnected,
```

JWKS cache contract 判断：

```ts
jwksCacheContractPasses: jwksCacheContract.checks.idpConfigComplete
  && jwksCacheContract.checks.cacheHitCovered
  && jwksCacheContract.checks.unknownKidRejected
  && jwksCacheContract.checks.expiredCacheRejected
  && jwksCacheContract.checks.rotationMarkerCovered
  && jwksCacheContract.checks.noJwksNetworkFetch
  && jwksCacheContract.checks.noExternalIdpCall,
```

真实 IdP verifier 状态：

```ts
realIdpVerifierConnected: jwksCacheContract.checks.realIdpVerifierConnected,
```

这和 v122 的思路一致，但语义更靠近生产连接：

```text
候选层 pass
真实连接 still missing
```

## Candidate Status

v9 新增 `candidateStatus`：

```ts
const candidateStatus = {
  adapterRunnerPasses: checks.adapterRunnerPasses,
  realManagedAuditAdapterStillMissing: checks.realManagedAuditAdapterConnected === false,
  jwksCacheContractPasses: checks.jwksCacheContractPasses,
  realIdpVerifierStillMissing: checks.realIdpVerifierConnected === false,
  productionReadinessV8StillBlocked: summaryV8.summary.blockedCategoryCount > 0,
};
```

正常配置下它表达：

```text
adapter runner 已通过
JWKS cache contract 已通过
真实 managed audit adapter 仍缺失
真实 IdP verifier 仍缺失
v8 仍处于生产阻塞
```

这就是 v125 的核心项目进度状态。

## Categories

v9 的分类：

```ts
id:
  | "managed-audit-adapter-runner"
  | "jwks-cache-contract"
  | "production-connections"
  | "summary-v8-evidence"
  | "execution-safety";
```

前两类是候选层能力：

```text
managed-audit-adapter-runner -> pass
jwks-cache-contract -> pass
```

真实生产连接仍 blocked：

```ts
{
  id: "production-connections",
  candidatePasses: checks.adapterRunnerPasses && checks.jwksCacheContractPasses,
  productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
  status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
}
```

这段表达的是：

```text
candidatePasses=true
productionConnected=false
status=blocked
```

这比“全部未完成”更精确：候选层已经可验证，缺的是生产真实连接。

## 生产阻塞项

正常配置下，本版保留两个 blocker：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
REAL_IDP_VERIFIER_NOT_CONNECTED
```

对应代码：

```ts
addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "managed-audit-adapter-runner", "A real managed audit adapter target is still required before production operations.");
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "jwks-cache-contract", "A real JWKS/OIDC verifier is still required before production operations.");
```

候选层失败时，会出现：

```text
MANAGED_AUDIT_ADAPTER_RUNNER_FAILED
JWKS_CACHE_CONTRACT_FAILED
PRODUCTION_READINESS_V8_EVIDENCE_INCOMPLETE
UPSTREAM_ACTIONS_ENABLED
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/readiness-summary-v9
GET /api/v1/production/readiness-summary-v9?format=markdown
```

文件位置：

```text
src/routes/statusRoutes.ts
```

路由代码：

```ts
const summary = await loadProductionReadinessSummaryV9({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
});

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderProductionReadinessSummaryV9Markdown(summary);
}
```

它是只读 production readiness evidence endpoint。

## 测试覆盖

新增测试：

```text
test/productionReadinessSummaryV9.test.ts
```

核心断言：

```ts
expect(summary).toMatchObject({
  summaryVersion: "production-readiness-summary.v9",
  readyForProductionOperations: false,
  candidateStatus: {
    adapterRunnerPasses: true,
    realManagedAuditAdapterStillMissing: true,
    jwksCacheContractPasses: true,
    realIdpVerifierStillMissing: true,
    productionReadinessV8StillBlocked: true,
  },
});
```

分类断言：

```ts
expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
  ["managed-audit-adapter-runner", "pass"],
  ["jwks-cache-contract", "pass"],
  ["production-connections", "blocked"],
  ["summary-v8-evidence", "pass"],
  ["execution-safety", "pass"],
]);
```

生产 blocker 断言：

```ts
expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
  "REAL_IDP_VERIFIER_NOT_CONNECTED",
]);
```

路由测试覆盖 JSON 和 Markdown。

## README 与计划

README 新增：

```text
Production readiness summary v9
GET /api/v1/production/readiness-summary-v9
```

当前计划完成后另起：

```text
docs/plans/v125-production-connection-readiness-roadmap.md
```

后续版本建议：

```text
Node v126：production connection config contract
Node v127：production connection failure-mode rehearsal
Node v128：production readiness summary v10
```

## 运行调试与归档

本版运行了：

```text
npm run typecheck
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

结果：

```text
74 个测试文件通过
265 条测试通过
```

运行归档：

```text
b/125/图片/production-readiness-summary-v9.png
b/125/解释/运行调试说明.md
```

## 一句话总结

v125 把系统推进到“生产连接候选层已通过”的状态：audit runner 和 JWKS cache contract 都能被 v9 汇总验证，但真实 managed audit adapter 和真实 JWKS/OIDC verifier 仍未连接，所以生产操作继续保持阻塞。
