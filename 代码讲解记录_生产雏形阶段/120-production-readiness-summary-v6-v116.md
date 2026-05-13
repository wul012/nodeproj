# 第一百一十六版代码讲解：production readiness summary v6

本版目标是把 v114、v115、v113 三块证据合成一个新的生产就绪总门禁。

它不打开真实执行，不接真实 IdP，不接真实 managed audit adapter。它回答的是：

```text
身份审计绑定是否成形
审计 adapter 前置证据是否成形
部署环境 gate 是否配置齐
upstream actions 是否仍关闭
还剩哪些生产硬阻塞
```

## 本版所处项目进度

v114 已经有：

```text
verified-identity-audit-binding.v1
```

用于证明 token verification result 可以进入 audit context。

v115 已经有：

```text
managed-audit-readiness-summary.v1
```

用于证明 fake adapter contract、file audit digest、retention/backup、managed store URL 已经能被汇总。

v113 已经有：

```text
deployment-environment-readiness.v1
```

用于检查部署环境变量和硬阻塞。

v116 把这三块合成：

```text
production-readiness-summary.v6
```

## 新增服务

新增文件：

```text
src/services/productionReadinessSummaryV6.ts
```

入口函数：

```ts
export function loadProductionReadinessSummaryV6(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): ProductionReadinessSummaryV6 {
  const verifiedIdentity = createVerifiedIdentityAuditBindingProfile(input.config);
  const managedAudit = createManagedAuditReadinessSummary({
    config: input.config,
    runtime: input.auditStoreRuntime,
    auditLog: input.auditLog,
  });
  const deploymentGate = createDeploymentEnvironmentReadinessGate(input.config);
```

这里明确复用三个已有服务：

```text
createVerifiedIdentityAuditBindingProfile()
createManagedAuditReadinessSummary()
createDeploymentEnvironmentReadinessGate()
```

这说明 v116 的职责是“总门禁整合”，不是重新实现身份、审计或部署检查。

## Stage 摘要

输出的 stage 是：

```ts
stage: {
  name: "production-hardening-integration",
  verifiedIdentityAuditBindingVersion: verifiedIdentity.profileVersion,
  managedAuditReadinessSummaryVersion: managedAudit.summaryVersion,
  deploymentEnvironmentReadinessVersion: deploymentGate.gateVersion,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
},
```

这让读者能一眼看到 v6 总结接入了哪些版本证据，以及当前是否打开了 upstream action。

## 核心检查项

检查项集中在：

```ts
const checks = {
  verifiedIdentityAuditBindingReady: verifiedIdentity.checks.acceptedTokenBindsSubject
    && verifiedIdentity.checks.acceptedTokenBindsRoles
    && verifiedIdentity.checks.acceptedTokenCapturesIssuer
    && verifiedIdentity.checks.rejectedTokenCapturesReason,
  realIdentityProviderConnected: false,
  managedAuditLocalEvidenceReady: managedAudit.checks.localEvidenceReadyForAdapterWork,
  realManagedAuditAdapterConnected: managedAudit.checks.realManagedAdapterConnected,
  deploymentEnvironmentGateConfigured: deploymentGate.summary.deployableRehearsalPassedCount === deploymentGate.summary.deployableRehearsalCheckCount,
  upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
  productionBlockersRemain: true as const,
};
```

这里的关键判断是分层的：

```text
verifiedIdentityAuditBindingReady=true
```

表示 token verification 已经能进入 audit context。

```text
realIdentityProviderConnected=false
```

表示真实 IdP 仍未接入。

```text
managedAuditLocalEvidenceReady=true
```

表示本地 managed audit 前置证据已经足够支持下一步 adapter 工作。

```text
realManagedAuditAdapterConnected=false
```

表示真实 managed audit adapter 仍未接入。

所以 v116 可以把“本地工程证据已成形”和“生产依赖未完成”分开表达。

## 分类视图

summary 会生成四类 category：

```ts
id: "identity" | "audit" | "deployment" | "execution-safety";
```

对应代码：

```ts
status: checks.verifiedIdentityAuditBindingReady && checks.realIdentityProviderConnected ? "pass" : "blocked"
```

identity category 即使 binding ready，也会因为真实 IdP 缺失保持 blocked。

audit category 同理：

```ts
status: checks.managedAuditLocalEvidenceReady && checks.realManagedAuditAdapterConnected ? "pass" : "blocked"
```

本地 evidence ready 不等于生产审计 ready。

在完整 rehearsal 配置下，v116 的分类结果是：

```text
identity：blocked
audit：blocked
deployment：pass
execution-safety：pass
```

这很适合生产级项目讲解：不是所有东西都绿，而是知道哪些已经准备好，哪些还必须停。

## 生产阻塞项

blocker 由 `collectProductionBlockers()` 生成：

```ts
addMessage(blockers, checks.realIdentityProviderConnected, "REAL_IDP_NOT_CONNECTED", ...);
addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", ...);
addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", ...);
```

在 smoke 的完整 rehearsal 配置下，最终 blocker 是：

```text
REAL_IDP_NOT_CONNECTED
REAL_MANAGED_AUDIT_ADAPTER_MISSING
```

这就是 v116 的核心价值：把“还差什么才能接近生产”压缩成两个真实硬门槛。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/readiness-summary-v6
GET /api/v1/production/readiness-summary-v6?format=markdown
```

路由位置：

```text
src/routes/statusRoutes.ts
```

代码：

```ts
const summary = loadProductionReadinessSummaryV6({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
});

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderProductionReadinessSummaryV6Markdown(summary);
}
```

它使用 status routes，是因为 production readiness 是 viewer 可读的生产状态门禁，而不是 audit events 本身。

## 测试覆盖

新增测试：

```text
test/productionReadinessSummaryV6.test.ts
```

完整 rehearsal 配置测试：

```ts
expect(summary).toMatchObject({
  summaryVersion: "production-readiness-summary.v6",
  readyForProductionOperations: false,
  checks: {
    verifiedIdentityAuditBindingReady: true,
    realIdentityProviderConnected: false,
    managedAuditLocalEvidenceReady: true,
    realManagedAuditAdapterConnected: false,
    deploymentEnvironmentGateConfigured: true,
    upstreamActionsStillDisabled: true,
    productionBlockersRemain: true,
  },
});
```

分类断言：

```ts
expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
  ["identity", "blocked"],
  ["audit", "blocked"],
  ["deployment", "pass"],
  ["execution-safety", "pass"],
]);
```

blocker 断言：

```ts
expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "REAL_IDP_NOT_CONNECTED",
  "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
]);
```

缺配置测试会看到更多 blocker：

```text
VERIFIED_IDENTITY_AUDIT_BINDING_INCOMPLETE
REAL_IDP_NOT_CONNECTED
MANAGED_AUDIT_LOCAL_EVIDENCE_INCOMPLETE
REAL_MANAGED_AUDIT_ADAPTER_MISSING
DEPLOYMENT_ENVIRONMENT_GATE_INCOMPLETE
```

HTTP 路由测试覆盖 JSON 和 Markdown：

```ts
expect(markdown.body).toContain("# Production readiness summary v6");
expect(markdown.body).toContain("REAL_IDP_NOT_CONNECTED");
expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
```

## 后续计划

本版收口了旧计划：

```text
docs/plans/v113-production-integration-roadmap.md
```

并新建下一阶段计划：

```text
docs/plans/v116-production-adapter-roadmap.md
```

下一阶段建议按：

```text
Node v117：managed audit adapter boundary
Node v118：real IdP verifier boundary
Node v119：production readiness summary v7
```

继续推进，但仍不接真实数据库、不访问真实 IdP、不打开 upstream action。

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
65 个测试文件通过
238 条测试通过
```

运行归档：

```text
b/116/图片/production-readiness-summary-v6.png
b/116/解释/运行调试说明.md
```

## 一句话总结

v116 把身份、审计、部署、执行安全合成 production readiness summary v6：本地 rehearsal evidence 已经连成生产前门禁，但真实 IdP 和真实 managed audit adapter 仍是两个必须继续推进的生产硬阻塞。
