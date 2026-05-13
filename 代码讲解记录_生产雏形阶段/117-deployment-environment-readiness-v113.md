# 第一百一十三版代码讲解：deployment environment readiness gate

本版目标是把 v111 和 v112 的生产前置要求合成一个部署环境门禁。

它不部署、不改配置、不打开 upstream action，也不连接真实 IdP 或真实 managed audit store。它的角色是回答：

```text
部署前环境变量是否齐
signed token contract 是否能跑通
managed audit contract 是否有 URL 和能力证据
upstream actions 是否仍关闭
还剩哪些生产硬阻塞
```

## 本版所处项目进度

v111 已经有 signed auth token contract rehearsal。

v112 已经有 managed audit store adapter contract。

v113 把这两块和 Node 配置合成 deployment environment readiness gate。它说明项目已经进入“生产前置条件可检查”的阶段，但还没有真实生产依赖。

## 服务入口

新增服务文件：

```text
src/services/deploymentEnvironmentReadiness.ts
```

核心函数是：

```ts
export function createDeploymentEnvironmentReadinessGate(config: AppConfig): DeploymentEnvironmentReadinessGate {
  const signedAuthTokenContract = createSignedAuthTokenContractProfile(config);
  const managedAuditStoreContract = createManagedAuditStoreContractProfile(config);
  const checks = createChecks(config, signedAuthTokenContract, managedAuditStoreContract);
```

这说明 v113 不是重新发明判断，而是复用：

```text
v111 signed auth token contract
v112 managed audit store contract
当前 Node config
```

## 环境字段

gate 输出当前环境摘要：

```ts
environment: {
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  authTokenIssuerConfigured: config.authTokenIssuer.length > 0,
  authTokenSecretConfigured: config.authTokenSecret.length > 0,
  accessGuardEnforcementEnabled: config.accessGuardEnforcementEnabled,
  auditStoreKind: config.auditStoreKind,
  auditStoreUrlConfigured: config.auditStoreUrl.length > 0,
  auditRetentionDays: config.auditRetentionDays,
  auditMaxFileBytes: config.auditMaxFileBytes,
  auditRotationEnabled: config.auditRotationEnabled,
  auditBackupEnabled: config.auditBackupEnabled,
},
```

注意它只返回 `authTokenSecretConfigured`，不返回 secret 本身。

## 核心检查项

检查项集中在：

```ts
return {
  upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  authIssuerConfigured: config.authTokenIssuer.length > 0,
  authSecretConfigured: config.authTokenSecret.length > 0,
  signedTokenContractPasses: signedAuthTokenContract.checks.allowedRoleAccepted
    && signedAuthTokenContract.checks.badSignatureRejected
    && signedAuthTokenContract.checks.expiredTokenRejected
    && signedAuthTokenContract.checks.insufficientRoleRejected,
  realIdentityProviderConnected: false,
  accessGuardEnforcementEnabled: config.accessGuardEnforcementEnabled,
  retentionDaysConfigured: config.auditRetentionDays > 0,
  auditMaxFileBytesConfigured: config.auditMaxFileBytes > 0,
  auditRotationEnabled: config.auditRotationEnabled,
  auditBackupEnabled: config.auditBackupEnabled,
  managedAuditStoreUrlConfigured: config.auditStoreUrl.length > 0,
  managedAuditStoreAdapterConnected: managedAuditStoreContract.checks.realManagedAdapterConnected,
};
```

这里有两个故意为 false 的生产硬门槛：

```text
realIdentityProviderConnected=false
managedAuditStoreAdapterConnected=false
```

这让 gate 的结论不会因为 rehearsal 配置齐全就误判部署可用。

## 生产阻塞项

如果 rehearsal 配置齐全，最终 blocker 会收敛到：

```text
REAL_IDP_NOT_CONNECTED
MANAGED_AUDIT_ADAPTER_MISSING
```

对应代码：

```ts
addMessage(blockers, checks.realIdentityProviderConnected, "REAL_IDP_NOT_CONNECTED", "signed-auth-token-contract", "A real identity provider is required before production deployment.");
addMessage(blockers, checks.managedAuditStoreAdapterConnected, "MANAGED_AUDIT_ADAPTER_MISSING", "managed-audit-store-contract", "A real managed audit store adapter is not connected.");
```

这就是 v113 的价值：把很多零散配置项变成明确的部署前 blocker。

## HTTP 入口

新增路由：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/deployment/environment-readiness", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["json", "markdown"] },
      },
      additionalProperties: false,
    },
  },
}, async (request, reply) => {
  const gate = createDeploymentEnvironmentReadinessGate(deps.config);
```

文件位置：

```text
src/routes/statusRoutes.ts
```

因为本版会在 enforcement rehearsal 下访问 `/api/v1/deployment/*`，所以 access policy 也补了部署路径：

```ts
pathPatterns: ["/health", "/api/v1/runtime/config", "/api/v1/production/*", "/api/v1/security/*", "/api/v1/deployment/*"],
```

文件位置：

```text
src/services/accessPolicyProfile.ts
```

这保证 deployment readiness gate 是 viewer 可读的生产前证据，而不是一个被 access guard 误拦的孤立接口。

## 测试覆盖

新增测试：

```text
test/deploymentEnvironmentReadiness.test.ts
```

默认缺配置测试：

```ts
expect(gate.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
  "AUTH_TOKEN_SECRET_MISSING",
  "SIGNED_TOKEN_CONTRACT_FAILING",
  "REAL_IDP_NOT_CONNECTED",
  "ACCESS_GUARD_ENFORCEMENT_DISABLED",
  "AUDIT_RETENTION_DAYS_MISSING",
  "AUDIT_STORE_URL_MISSING",
  "MANAGED_AUDIT_ADAPTER_MISSING",
]));
```

rehearsal 配置齐全测试：

```ts
expect(gate.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "REAL_IDP_NOT_CONNECTED",
  "MANAGED_AUDIT_ADAPTER_MISSING",
]);
```

路由测试：

```ts
expect(markdown.body).toContain("# Deployment environment readiness");
expect(markdown.body).toContain("REAL_IDP_NOT_CONNECTED");
expect(markdown.body).toContain("MANAGED_AUDIT_ADAPTER_MISSING");
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
62 个测试文件通过
229 条测试通过
```

运行归档：

```text
b/113/图片/deployment-environment-readiness.png
b/113/解释/运行调试说明.md
```

## 一句话总结

v113 把 signed token、managed audit、retention/backup、upstream action safety 合成部署环境门禁；rehearsal 配置能被验证，但真实 IdP 和真实 managed audit adapter 仍是部署与生产放行前的硬阻塞。
