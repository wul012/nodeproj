# 第一百三十四版代码讲解：production readiness summary v12

本版目标是把 v132 approval ledger 和 v133 archive verification 接入新的生产就绪汇总。

它回答三个问题：

```text
dry-run approval ledger 是否 ready？
archive verification 是否 ready？
真实 production connections 是否仍缺失？
```

## 本版所处项目进度

v132 完成：

```text
production connection dry-run approval ledger
```

v133 完成：

```text
production connection archive verification
```

v134 做阶段汇总，把 dry-run review 从“有记录、有验证”提升为“生产 readiness summary 可读、可归档、可解释”的状态。

## 新增服务

新增文件：

```text
src/services/productionReadinessSummaryV12.ts
```

入口函数：

```ts
export async function loadProductionReadinessSummaryV12(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
}): Promise<ProductionReadinessSummaryV12> {
  const summaryV11 = await loadProductionReadinessSummaryV11(input);
  const approvalLedger = input.productionConnectionDryRunApprovals.snapshot(input.config);
  const archiveVerification = await loadProductionConnectionArchiveVerification(input);
```

v12 的三条输入是：

```text
summaryV11
approvalLedger
archiveVerification
```

## 核心 checks

summary v11 证据：

```ts
summaryV11EvidenceReady: summaryV11.checks.summaryV10EvidenceReady
  && summaryV11.checks.implementationPrecheckReady
  && summaryV11.checks.dryRunChangeRequestReady
  && summaryV11.checks.noDatabaseConnectionAttempted
  && summaryV11.checks.noJwksNetworkFetch
  && summaryV11.checks.noExternalIdpCall,
```

approval ledger 证据：

```ts
approvalLedgerReady: approvalLedger.readyForApprovalArchive
  && approvalLedger.checks.latestApprovalDigestValid
  && approvalLedger.checks.latestChangeRequestDigestMatches
  && approvalLedger.checks.latestRealConnectionAttempted === false,
```

archive verification 证据：

```ts
archiveVerificationReady: archiveVerification.readyForArchiveVerification
  && archiveVerification.checks.approvalDigestValid
  && archiveVerification.checks.approvalDigestMatchesChangeRequest
  && archiveVerification.checks.noRealConnectionAttempted,
```

这三组证据都通过后，v12 才认为 dry-run review closeout ready。

## 真实连接仍然阻塞

v12 明确固定：

```ts
realManagedAuditAdapterConnected: false,
realIdpVerifierConnected: false,
readyForProductionOperations: false as const,
```

正常 smoke 里：

```text
approvalLedgerReady=true
archiveVerificationReady=true
realManagedAuditAdapterStillMissing=true
realIdpVerifierStillMissing=true
```

也就是说，dry-run review 已经成熟，但真实 managed audit adapter 和真实 IdP verifier 仍然没接入。

## Categories

v12 分类：

```ts
id:
  | "summary-v11-evidence"
  | "approval-ledger"
  | "archive-verification"
  | "real-production-connections"
  | "execution-safety";
```

正常配置下：

```text
summary-v11-evidence -> pass
approval-ledger -> pass
archive-verification -> pass
real-production-connections -> blocked
execution-safety -> pass
```

真实连接分类：

```ts
{
  id: "real-production-connections",
  readinessPasses: checks.summaryV11EvidenceReady
    && checks.approvalLedgerReady
    && checks.archiveVerificationReady,
  productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
  status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
}
```

这保留了项目的一条核心边界：

```text
review evidence ready 不等于 production connected
```

## 生产阻塞项

正常 smoke 下 blocker 是：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
REAL_IDP_VERIFIER_NOT_CONNECTED
```

对应代码：

```ts
addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "production-readiness-summary-v12", "A real managed audit adapter is still required before production operations.");
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "production-readiness-summary-v12", "A real JWKS/OIDC verifier is still required before production operations.");
```

如果没有 v132 approval 或 v133 verification，则会出现：

```text
APPROVAL_LEDGER_NOT_READY
ARCHIVE_VERIFICATION_NOT_READY
```

这保证 v12 不会跳过 dry-run review 证据链。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/readiness-summary-v12
GET /api/v1/production/readiness-summary-v12?format=markdown
```

路由代码：

```ts
const summary = await loadProductionReadinessSummaryV12({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
});
```

因为 v12 依赖 in-memory approval ledger，所以 HTTP smoke 和截图都先创建 approval，再读取 summary。

## 下一阶段计划

本版完成后另起计划：

```text
docs/plans/v134-production-live-probe-roadmap.md
```

后续建议：

```text
Node v135：live probe readiness contract
Node v136：read-only live probe smoke harness
Node v137：production readiness summary v13
```

这也是开始考虑 Java / mini-kv 只读 live probe 的阶段，但不会强制启动它们。

## 测试覆盖

新增测试：

```text
test/productionReadinessSummaryV12.test.ts
```

核心断言：

```ts
expect(summary).toMatchObject({
  summaryVersion: "production-readiness-summary.v12",
  readyForProductionOperations: false,
  readinessStatus: {
    approvalLedgerReady: true,
    archiveVerificationReady: true,
    realManagedAuditAdapterStillMissing: true,
    realIdpVerifierStillMissing: true,
  },
});
```

分类断言：

```ts
expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
  ["summary-v11-evidence", "pass"],
  ["approval-ledger", "pass"],
  ["archive-verification", "pass"],
  ["real-production-connections", "blocked"],
  ["execution-safety", "pass"],
]);
```

## README、运行调试和归档

README 新增：

```text
Production readiness summary v12
GET /api/v1/production/readiness-summary-v12
```

本版运行：

```text
npm run typecheck
npx vitest run test/productionReadinessSummaryV12.test.ts
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

归档：

```text
b/134/图片/production-readiness-summary-v12.png
b/134/解释/运行调试说明.md
```

## 一句话总结

v134 把 dry-run approval ledger 和 archive verification 汇总成 production readiness summary v12：审查证据链已经 closeout，但真实 managed audit adapter 和真实 IdP verifier 仍未连接，生产操作继续保持 blocked。
