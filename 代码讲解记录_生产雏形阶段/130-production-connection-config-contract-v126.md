# 第一百二十六版代码讲解：production connection config contract

本版目标是把真实生产连接之前需要的配置合约先固定下来。

它不连接真实数据库、不 fetch 真实 JWKS、不打开真实上游执行。本版做的是：

```text
列出 managed audit adapter 需要的 env
列出 IdP verifier 需要的 env
区分 current target kind 与 production target kind
输出 missing env
继续保留真实连接 missing 的生产阻塞
```

## 本版所处项目进度

v123 已经证明：

```text
managed audit adapter runner 可以跑 memory 与 file-candidate
```

v124 已经证明：

```text
JWKS cache contract 可以覆盖 hit、unknown kid、expired cache、rotation marker
```

v125 已经汇总：

```text
候选层通过，但真实生产连接仍缺失
```

v126 的任务是再往真实生产连接靠近一步：不是马上连接，而是先把真实连接需要的配置项、缺失项和禁用状态讲清楚。

## 新增服务

新增文件：

```text
src/services/productionConnectionConfigContract.ts
```

入口函数：

```ts
export function createProductionConnectionConfigContractProfile(
  config: Pick<AppConfig,
    | "auditStoreKind"
    | "auditStorePath"
    | "auditStoreUrl"
    | "auditRetentionDays"
    | "auditMaxFileBytes"
    | "auditRotationEnabled"
    | "auditBackupEnabled"
    | "idpIssuer"
    | "idpAudience"
    | "idpJwksUrl"
    | "idpClockSkewSeconds"
    | "upstreamActionsEnabled"
  >,
): ProductionConnectionConfigContractProfile {
  const audit = createAuditTarget(config);
  const idp = createIdpTarget(config);
```

这段说明本版聚焦两个 target：

```text
managed-audit-adapter
idp-verifier
```

## Audit Target

audit target 生成函数：

```ts
function createAuditTarget(
  config: Pick<AppConfig,
    | "auditStoreKind"
    | "auditStorePath"
    | "auditStoreUrl"
    | "auditRetentionDays"
    | "auditMaxFileBytes"
    | "auditRotationEnabled"
    | "auditBackupEnabled"
  >,
): ProductionConnectionTarget {
```

它声明了生产 audit 连接前需要的 env：

```ts
const requiredEnv = [
  envRequirement("AUDIT_STORE_KIND", config.auditStoreKind, "config-contract"),
  envRequirement("AUDIT_STORE_URL", config.auditStoreUrl, "production-connection"),
  envRequirement("AUDIT_RETENTION_DAYS", config.auditRetentionDays > 0 ? String(config.auditRetentionDays) : "", "config-contract"),
  envRequirement("AUDIT_MAX_FILE_BYTES", config.auditMaxFileBytes > 0 ? String(config.auditMaxFileBytes) : "", "config-contract"),
  envRequirement("AUDIT_ROTATION_ENABLED", config.auditRotationEnabled ? "true" : "", "config-contract"),
  envRequirement("AUDIT_BACKUP_ENABLED", config.auditBackupEnabled ? "true" : "", "config-contract"),
];
```

最终 target：

```ts
return {
  id: "managed-audit-adapter",
  currentTargetKind: normalizeAuditTargetKind(config.auditStoreKind),
  productionTargetKind: "managed-audit-adapter",
  connectionEnabled: false,
  realConnectionConnected: false,
  requiredEnv,
  configuredEnv: requiredEnv.filter((item) => item.configured).map((item) => item.key),
  missingEnv: requiredEnv.filter((item) => !item.configured).map((item) => item.key),
  note: "Current runtime may be memory or file; real managed audit storage remains a future target.",
};
```

这里最重要的是：

```text
currentTargetKind 可以是 memory/file
productionTargetKind 是 managed-audit-adapter
connectionEnabled=false
realConnectionConnected=false
```

这说明配置合约已形成，但真实生产 adapter 还没有连接。

## IdP Target

IdP target 生成函数：

```ts
function createIdpTarget(
  config: Pick<AppConfig, "idpIssuer" | "idpAudience" | "idpJwksUrl" | "idpClockSkewSeconds">,
): ProductionConnectionTarget {
```

它声明了生产 IdP verifier 需要的 env：

```ts
const requiredEnv = [
  envRequirement("ORDEROPS_IDP_ISSUER", config.idpIssuer, "config-contract"),
  envRequirement("ORDEROPS_IDP_AUDIENCE", config.idpAudience, "config-contract"),
  envRequirement("ORDEROPS_IDP_JWKS_URL", config.idpJwksUrl.startsWith("https://") ? config.idpJwksUrl : "", "production-connection"),
  envRequirement("ORDEROPS_IDP_CLOCK_SKEW_SECONDS", config.idpClockSkewSeconds > 0 ? String(config.idpClockSkewSeconds) : "", "config-contract"),
];
```

最终 target：

```ts
return {
  id: "idp-verifier",
  currentTargetKind: config.idpJwksUrl.length > 0 ? "jwks-configured" : "local-fixture-only",
  productionTargetKind: "oidc-jwt-jwks",
  connectionEnabled: false,
  realConnectionConnected: false,
  requiredEnv,
  configuredEnv: requiredEnv.filter((item) => item.configured).map((item) => item.key),
  missingEnv: requiredEnv.filter((item) => !item.configured).map((item) => item.key),
  note: "Current JWKS evidence is local fixture/cache rehearsal; real IdP verification remains a future target.",
};
```

这里保持 v121-v124 的边界：

```text
当前只是 fixture/cache rehearsal
真实 OIDC/JWKS verifier 仍未连接
```

## Env Requirement

每个 env 用统一结构表示：

```ts
export interface ProductionConnectionEnvRequirement {
  key: string;
  requiredFor: "config-contract" | "production-connection";
  configured: boolean;
  safeToDisplayValue: boolean;
  valueSummary: string;
}
```

生成函数：

```ts
function envRequirement(
  key: string,
  value: string,
  requiredFor: ProductionConnectionEnvRequirement["requiredFor"],
): ProductionConnectionEnvRequirement {
  return {
    key,
    requiredFor,
    configured: value.length > 0,
    safeToDisplayValue: true,
    valueSummary: value.length > 0 ? summarizeValue(value) : "missing",
  };
}
```

本版没有输出任何真实密钥；这些 env 都是非 secret 的配置形态。

## Safety

安全区块：

```ts
safety: {
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  noDatabaseConnectionAttempted: true,
  noJwksNetworkFetch: true,
  noExternalIdpCall: true,
  realManagedAdapterConnected: false,
  realIdpVerifierConnected: false,
},
```

这段是本版边界声明：

```text
不连接数据库
不拉 JWKS
不调用外部 IdP
真实 managed adapter 未连接
真实 IdP verifier 未连接
上游动作仍关闭
```

## 核心检查项

checks：

```ts
auditTargetKindDocumented: audit.productionTargetKind === "managed-audit-adapter",
auditRequiredEnvDocumented: audit.requiredEnv.length === 6,
auditRequiredEnvConfigured: audit.missingEnv.length === 0,
idpTargetKindDocumented: idp.productionTargetKind === "oidc-jwt-jwks",
idpRequiredEnvDocumented: idp.requiredEnv.length === 4,
idpRequiredEnvConfigured: idp.missingEnv.length === 0,
noDatabaseConnectionAttempted: true,
noJwksNetworkFetch: true,
noExternalIdpCall: true,
realManagedAdapterConnected: false,
realIdpVerifierConnected: false,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

正常 smoke 下：

```text
auditRequiredEnvConfigured=true
idpRequiredEnvConfigured=true
missingEnvCount=0
```

但生产仍阻塞，因为真实连接仍然是 false。

## 生产阻塞项

正常配置下，本版保留两个 blocker：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
REAL_IDP_VERIFIER_NOT_CONNECTED
```

对应代码：

```ts
addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "audit-config", "A real managed audit adapter is still required before production connections.");
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "idp-config", "A real JWKS/OIDC verifier is still required before production connections.");
```

如果配置缺失，会出现：

```text
AUDIT_REQUIRED_ENV_MISSING
IDP_REQUIRED_ENV_MISSING
```

如果误打开真实上游动作：

```text
UPSTREAM_ACTIONS_ENABLED
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/connection-config-contract
GET /api/v1/production/connection-config-contract?format=markdown
```

文件位置：

```text
src/routes/statusRoutes.ts
```

路由代码：

```ts
const profile = createProductionConnectionConfigContractProfile(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderProductionConnectionConfigContractMarkdown(profile);
}
```

它是只读 production connection evidence endpoint。

## 测试覆盖

新增测试：

```text
test/productionConnectionConfigContract.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-connection-config-contract.v1",
  readyForProductionConnections: false,
  targets: {
    audit: {
      currentTargetKind: "file",
      productionTargetKind: "managed-audit-adapter",
      missingEnv: [],
    },
    idp: {
      currentTargetKind: "jwks-configured",
      productionTargetKind: "oidc-jwt-jwks",
      missingEnv: [],
    },
  },
});
```

required env 断言：

```ts
expect(profile.targets.audit.requiredEnv.map((item) => item.key)).toEqual([
  "AUDIT_STORE_KIND",
  "AUDIT_STORE_URL",
  "AUDIT_RETENTION_DAYS",
  "AUDIT_MAX_FILE_BYTES",
  "AUDIT_ROTATION_ENABLED",
  "AUDIT_BACKUP_ENABLED",
]);
```

IdP required env：

```ts
expect(profile.targets.idp.requiredEnv.map((item) => item.key)).toEqual([
  "ORDEROPS_IDP_ISSUER",
  "ORDEROPS_IDP_AUDIENCE",
  "ORDEROPS_IDP_JWKS_URL",
  "ORDEROPS_IDP_CLOCK_SKEW_SECONDS",
]);
```

路由测试覆盖 JSON 和 Markdown。

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
75 个测试文件通过
268 条测试通过
```

运行归档：

```text
b/126/图片/production-connection-config-contract.png
b/126/解释/运行调试说明.md
```

## 一句话总结

v126 把真实生产连接前的配置形态先固定下来：audit 与 IdP 的 target kind、required env、missing env 和安全禁用状态都有结构化证据，但真实 managed audit adapter 和真实 IdP verifier 仍未连接，所以生产连接继续保持阻塞。
