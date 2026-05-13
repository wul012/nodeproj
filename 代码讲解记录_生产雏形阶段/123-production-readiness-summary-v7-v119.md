# 第一百一十九版代码讲解：production readiness summary v7

本版目标是把 v117、v118、v116 三块证据合成新的生产就绪总门禁。

v119 重点不是继续堆字段，而是把一个很容易混淆的问题讲清楚：

```text
边界已经存在
不等于
真实生产连接已经完成
```

所以 v119 明确区分：

```text
managed audit adapter boundary exists
managed audit adapter connected
IdP verifier boundary exists
IdP verifier connected
```

## 本版所处项目进度

v117 已经有：

```text
managed-audit-adapter-boundary.v1
```

它定义了 `ManagedAuditAdapter` 接口和 memory/file/managed-unimplemented runtime 状态。

v118 已经有：

```text
idp-verifier-boundary.v1
```

它定义了未来 OIDC/JWT verifier 的 issuer、audience、JWKS URL、clock skew、required claims。

v116 已经有：

```text
production-readiness-summary.v6
```

它把身份审计绑定、managed audit readiness、deployment gate 合成了上一层总门禁。

v119 把这些合成：

```text
production-readiness-summary.v7
```

## 新增服务

新增文件：

```text
src/services/productionReadinessSummaryV7.ts
```

入口函数：

```ts
export function loadProductionReadinessSummaryV7(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): ProductionReadinessSummaryV7 {
  const managedAuditAdapterBoundary = createManagedAuditAdapterBoundaryProfile({
    config: input.config,
    runtime: input.auditStoreRuntime,
  });
  const idpVerifierBoundary = createIdpVerifierBoundaryProfile(input.config);
  const summaryV6 = loadProductionReadinessSummaryV6(input);
```

这里接入三块已有 evidence：

```text
v117 managed audit adapter boundary
v118 IdP verifier boundary
v116 production readiness summary v6
```

所以 v119 是 integration summary，不重新实现 adapter 或 verifier。

## Boundary Status

本版新增核心字段：

```ts
boundaryStatus: {
  managedAuditAdapterBoundaryExists: checks.managedAuditAdapterBoundaryReady,
  managedAuditAdapterConnected: false,
  idpVerifierBoundaryExists: checks.idpVerifierBoundaryReady,
  idpVerifierConnected: false,
  productionReadinessV6StillBlocked: summaryV6.summary.blockedCategoryCount > 0,
},
```

这段是 v119 的核心表达。

在 smoke 配置完整时：

```text
managedAuditAdapterBoundaryExists=true
idpVerifierBoundaryExists=true
```

但仍然：

```text
managedAuditAdapterConnected=false
idpVerifierConnected=false
```

也就是说项目已经把“生产连接的入口形状”准备好了，但真正的连接仍未完成。

## 核心检查项

检查项：

```ts
managedAuditAdapterBoundaryReady: managedAuditAdapterBoundary.checks.adapterInterfaceDefined
  && managedAuditAdapterBoundary.checks.runtimeSelectionDocumented
  && managedAuditAdapterBoundary.checks.managedUnimplementedStateDocumented
  && managedAuditAdapterBoundary.checks.noDatabaseConnectionAttempted
  && managedAuditAdapterBoundary.checks.noAuditMigrationPerformed,
realManagedAuditAdapterConnected: managedAuditAdapterBoundary.checks.realManagedAdapterConnected,
idpVerifierBoundaryReady: idpVerifierBoundary.checks.oidcVerifierBoundaryDefined
  && idpVerifierBoundary.checks.issuerConfigured
  && idpVerifierBoundary.checks.audienceConfigured
  && idpVerifierBoundary.checks.jwksUrlConfigured
  && idpVerifierBoundary.checks.jwksUrlUsesHttps
  && idpVerifierBoundary.checks.clockSkewConfigured
  && idpVerifierBoundary.checks.noJwksNetworkFetch
  && idpVerifierBoundary.checks.noExternalIdpCall,
realIdpVerifierConnected: idpVerifierBoundary.checks.realIdpVerifierConnected,
productionReadinessV6EvidenceConnected: summaryV6.checks.verifiedIdentityAuditBindingReady
  && summaryV6.checks.managedAuditLocalEvidenceReady
  && summaryV6.checks.deploymentEnvironmentGateConfigured,
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
```

注意它明确把两类事情分开：

```text
BoundaryReady
Connected
```

这比 v116 更接近生产级工程语言。

## 分类视图

v119 的分类：

```ts
id: "managed-audit-adapter" | "idp-verifier" | "summary-v6-evidence" | "execution-safety";
```

在完整 rehearsal 配置下，结果是：

```text
managed-audit-adapter：blocked
idp-verifier：blocked
summary-v6-evidence：pass
execution-safety：pass
```

前两项 blocked，不是因为边界没有写，而是因为真实生产连接缺失。

代码中 managed audit category 是：

```ts
status: checks.managedAuditAdapterBoundaryReady && checks.realManagedAuditAdapterConnected ? "pass" : "blocked"
```

IdP category 同理：

```ts
status: checks.idpVerifierBoundaryReady && checks.realIdpVerifierConnected ? "pass" : "blocked"
```

这就是“边界存在 != 生产连接完成”的代码化表达。

## 生产阻塞项

生产 blocker：

```ts
addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", ...);
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", ...);
```

在 smoke 的完整配置下最终只剩：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
REAL_IDP_VERIFIER_NOT_CONNECTED
```

这说明 v119 已经把下一阶段真正要做的两件事压得很明确：

```text
接真实 managed audit adapter
接真实 IdP verifier
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/readiness-summary-v7
GET /api/v1/production/readiness-summary-v7?format=markdown
```

路由位置：

```text
src/routes/statusRoutes.ts
```

代码：

```ts
const summary = loadProductionReadinessSummaryV7({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
});

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderProductionReadinessSummaryV7Markdown(summary);
}
```

它仍然是只读 production readiness endpoint，适合 dashboard、release gate、部署前 checklist 调用。

## 测试覆盖

新增测试：

```text
test/productionReadinessSummaryV7.test.ts
```

核心断言：

```ts
expect(summary).toMatchObject({
  summaryVersion: "production-readiness-summary.v7",
  boundaryStatus: {
    managedAuditAdapterBoundaryExists: true,
    managedAuditAdapterConnected: false,
    idpVerifierBoundaryExists: true,
    idpVerifierConnected: false,
    productionReadinessV6StillBlocked: true,
  },
});
```

分类断言：

```ts
expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
  ["managed-audit-adapter", "blocked"],
  ["idp-verifier", "blocked"],
  ["summary-v6-evidence", "pass"],
  ["execution-safety", "pass"],
]);
```

blocker 断言：

```ts
expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
  "REAL_IDP_VERIFIER_NOT_CONNECTED",
]);
```

缺配置测试会暴露：

```text
IDP_VERIFIER_BOUNDARY_INCOMPLETE
PRODUCTION_READINESS_V6_EVIDENCE_INCOMPLETE
```

路由测试覆盖 JSON 和 Markdown：

```ts
expect(markdown.body).toContain("# Production readiness summary v7");
expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
expect(markdown.body).toContain("REAL_IDP_VERIFIER_NOT_CONNECTED");
```

## 后续计划

本版收口旧计划：

```text
docs/plans/v116-production-adapter-roadmap.md
```

并新建：

```text
docs/plans/v119-production-connection-roadmap.md
```

下一阶段建议：

```text
Node v120：managed audit adapter compliance harness
Node v121：JWKS verifier fixture rehearsal
Node v122：production readiness summary v8
```

也就是先做连接前合规演练，再考虑真实外部依赖。

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
68 个测试文件通过
247 条测试通过
```

运行归档：

```text
b/119/图片/production-readiness-summary-v7.png
b/119/解释/运行调试说明.md
```

## 一句话总结

v119 把生产门槛推进到更清晰的阶段：adapter 和 IdP verifier 的边界都已经存在，但真实连接仍缺失；因此项目更接近生产级，但仍必须保持 `UPSTREAM_ACTIONS_ENABLED=false` 和 `readyForProductionOperations=false`。
