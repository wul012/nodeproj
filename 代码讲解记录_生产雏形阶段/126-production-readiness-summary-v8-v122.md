# 第一百二十二版代码讲解：production readiness summary v8

本版目标是把 v120 和 v121 的两个连接前演练接入新的生产就绪汇总。

它不接真实数据库、不接真实 IdP、不打开真实上游执行。本版做的是：

```text
读取 managed audit adapter compliance harness
读取 JWKS verifier fixture rehearsal
读取 production readiness summary v7
区分本地 rehearsal 已通过与真实 production connection 仍缺失
继续保持 readyForProductionOperations=false
```

## 本版所处项目进度

v120 已经落地：

```text
src/services/managedAuditAdapterCompliance.ts
```

它证明本地 adapter 能通过：

```text
appendOnlyWrite
queryByRequestId
digest
backupRestoreMarker
```

v121 已经落地：

```text
src/services/jwksVerifierFixtureRehearsal.ts
```

它证明本地 RS256 JWT fixture 能覆盖：

```text
issuer
audience
expiry
roles
kid
signature
```

v122 的任务不是再做一个底层能力，而是把这两条证据汇总到一个更接近生产判断的 summary。

## 新增服务

新增文件：

```text
src/services/productionReadinessSummaryV8.ts
```

入口函数：

```ts
export async function loadProductionReadinessSummaryV8(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionReadinessSummaryV8> {
  const managedAuditCompliance = await createManagedAuditAdapterComplianceProfile(input.config);
  const jwksFixture = createJwksVerifierFixtureRehearsalProfile(input.config);
  const summaryV7 = loadProductionReadinessSummaryV7(input);
```

这里直接复用三个已有证据源：

```text
v120 managedAuditCompliance
v121 jwksFixture
v119 summaryV7
```

这让 v8 不重复实现验签或 adapter 逻辑，只负责生产判断聚合。

## 核心 checks

managed audit compliance harness 判断：

```ts
managedAuditComplianceHarnessPasses: managedAuditCompliance.checks.adapterInterfaceExercised
  && managedAuditCompliance.checks.appendOnlyWriteCovered
  && managedAuditCompliance.checks.queryByRequestIdCovered
  && managedAuditCompliance.checks.digestStableAfterRepeatRead
  && managedAuditCompliance.checks.backupRestoreMarkerCovered
  && managedAuditCompliance.checks.noDatabaseConnectionAttempted
  && managedAuditCompliance.checks.noAuditFileMigrationPerformed,
```

这段只说明本地合规演练通过，不代表真实 managed audit adapter 已连接。

真实连接状态仍然取：

```ts
realManagedAuditAdapterConnected: managedAuditCompliance.checks.realManagedAdapterConnected,
```

JWKS fixture 判断：

```ts
jwksFixtureVerifierPasses: jwksFixture.checks.idpConfigComplete
  && jwksFixture.checks.localJwksFixtureCreated
  && jwksFixture.checks.acceptedTokenVerified
  && jwksFixture.checks.issuerMismatchRejected
  && jwksFixture.checks.audienceMismatchRejected
  && jwksFixture.checks.expiredTokenRejected
  && jwksFixture.checks.missingRequiredRoleRejected
  && jwksFixture.checks.unknownKidRejected
  && jwksFixture.checks.noJwksNetworkFetch
  && jwksFixture.checks.noExternalIdpCall,
```

真实 IdP verifier 仍然取：

```ts
realIdpVerifierConnected: jwksFixture.checks.realIdpVerifierConnected,
```

这就是 v122 的关键：**本地演练 pass 和生产连接 connected 是两个不同维度**。

## Rehearsal Status

v8 新增 `rehearsalStatus`：

```ts
const rehearsalStatus = {
  managedAuditComplianceHarnessPasses: checks.managedAuditComplianceHarnessPasses,
  managedAuditProductionConnectionStillMissing: checks.realManagedAuditAdapterConnected === false,
  jwksFixtureVerifierPasses: checks.jwksFixtureVerifierPasses,
  idpProductionConnectionStillMissing: checks.realIdpVerifierConnected === false,
  productionReadinessV7StillBlocked: summaryV7.summary.blockedCategoryCount > 0,
};
```

正常配置下它会表达：

```text
本地 audit harness 通过
本地 JWKS fixture 通过
真实 managed audit adapter 仍缺失
真实 IdP verifier 仍缺失
v7 仍处于生产阻塞
```

这比 v7 更进一步，因为 v7 主要讲 boundary，v8 开始讲 rehearsal。

## Categories

v8 的分类：

```ts
id:
  | "managed-audit-compliance-harness"
  | "jwks-verifier-fixture"
  | "production-connections"
  | "summary-v7-evidence"
  | "execution-safety";
```

前两类在本地配置完整时应该是 pass：

```text
managed-audit-compliance-harness -> pass
jwks-verifier-fixture -> pass
```

生产连接类仍然 blocked：

```ts
{
  id: "production-connections",
  rehearsalPasses: checks.managedAuditComplianceHarnessPasses && checks.jwksFixtureVerifierPasses,
  productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
  status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
}
```

这里说明：

```text
rehearsalPasses=true
productionConnected=false
status=blocked
```

这是本版最重要的生产判断形态。

## 生产阻塞项

正常配置下，本版保留两个 blocker：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
REAL_IDP_VERIFIER_NOT_CONNECTED
```

对应代码：

```ts
addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "managed-audit-adapter-compliance", "A real managed audit adapter is still required before production operations.");
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "jwks-verifier-fixture-rehearsal", "A real JWKS/OIDC verifier is still required before production operations.");
```

如果本地 rehearsal 本身失败，也会新增：

```text
MANAGED_AUDIT_COMPLIANCE_HARNESS_FAILED
JWKS_FIXTURE_VERIFIER_FAILED
PRODUCTION_READINESS_V7_EVIDENCE_INCOMPLETE
UPSTREAM_ACTIONS_ENABLED
```

所以 v8 的表达更细：

```text
本地演练失败是 blocker
真实生产连接缺失也是 blocker
两者不会混为一谈
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/readiness-summary-v8
GET /api/v1/production/readiness-summary-v8?format=markdown
```

文件位置：

```text
src/routes/statusRoutes.ts
```

路由代码：

```ts
const summary = await loadProductionReadinessSummaryV8({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
});

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderProductionReadinessSummaryV8Markdown(summary);
}
```

它是只读 production readiness evidence endpoint。

## 测试覆盖

新增测试：

```text
test/productionReadinessSummaryV8.test.ts
```

核心断言：

```ts
expect(summary).toMatchObject({
  summaryVersion: "production-readiness-summary.v8",
  readyForProductionOperations: false,
  rehearsalStatus: {
    managedAuditComplianceHarnessPasses: true,
    managedAuditProductionConnectionStillMissing: true,
    jwksFixtureVerifierPasses: true,
    idpProductionConnectionStillMissing: true,
    productionReadinessV7StillBlocked: true,
  },
});
```

分类断言：

```ts
expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
  ["managed-audit-compliance-harness", "pass"],
  ["jwks-verifier-fixture", "pass"],
  ["production-connections", "blocked"],
  ["summary-v7-evidence", "pass"],
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

README 新增了：

```text
Production readiness summary v8
GET /api/v1/production/readiness-summary-v8
```

当前计划完成后另起：

```text
docs/plans/v122-production-connection-candidate-roadmap.md
```

后续版本建议：

```text
Node v123：managed audit adapter harness runner
Node v124：JWKS cache contract rehearsal
Node v125：production readiness summary v9
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
71 个测试文件通过
256 条测试通过
```

运行归档：

```text
b/122/图片/production-readiness-summary-v8.png
b/122/解释/运行调试说明.md
```

## 一句话总结

v122 把生产就绪判断推进到“本地 rehearsal pass，但真实 production connection 仍 blocked”的阶段：audit 和 auth 的连接前演练都能被统一汇总，但真正生产级还需要接入 real managed audit adapter 和 real JWKS/OIDC verifier。
