# 第一百二十七版代码讲解：production connection failure-mode rehearsal

本版目标是在真实生产连接前，把失败模式先演练清楚。

它不连接真实数据库、不请求真实 JWKS、不写真实 audit 存储。本版做的是：

```text
模拟 audit connection missing
模拟 IdP JWKS timeout
模拟 credentials missing
模拟 safe fallback
所有场景都必须 blocked
所有场景都不能发生外部连接或真实写入
```

## 本版所处项目进度

v126 已经把生产连接配置合约固定下来：

```text
src/services/productionConnectionConfigContract.ts
```

它回答的是：

```text
需要哪些 env
哪些 env 缺失
当前 target kind 是什么
生产 target kind 是什么
真实连接是否启用
```

v127 在 v126 基础上继续推进：

```text
如果连接失败，应如何安全表达
如果超时，应如何阻塞
如果凭据缺失，应如何回退
```

## 新增服务

新增文件：

```text
src/services/productionConnectionFailureModeRehearsal.ts
```

入口函数：

```ts
export function createProductionConnectionFailureModeRehearsalProfile(
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
): ProductionConnectionFailureModeRehearsalProfile {
  const configContract = createProductionConnectionConfigContractProfile(config);
```

本版先读取 v126 的配置合约：

```text
configContract
actualMissingEnv
targetContext
```

然后生成四个失败场景。

## Target Context

上下文来自 v126：

```ts
targetContext: {
  configContractVersion: configContract.profileVersion,
  auditCurrentTargetKind: configContract.targets.audit.currentTargetKind,
  auditProductionTargetKind: configContract.targets.audit.productionTargetKind,
  idpCurrentTargetKind: configContract.targets.idp.currentTargetKind,
  idpProductionTargetKind: configContract.targets.idp.productionTargetKind,
  actualMissingEnv,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
},
```

这让 failure-mode rehearsal 不孤立，它知道当前配置合约是什么状态。

## 四个失败场景

场景类型：

```ts
id:
  | "audit-connection-missing"
  | "idp-jwks-timeout-simulated"
  | "credentials-missing"
  | "safe-fallback";
```

每个场景都遵守同一组安全字段：

```ts
expectedOutcome: "blocked",
actualOutcome: "blocked",
databaseConnectionAttempted: false,
auditWritePerformed: false,
jwksNetworkFetchAttempted: false,
externalIdpCallAttempted: false,
```

这就是本版最重要的边界：**演练失败模式，但不制造真实外部副作用**。

## Audit Connection Missing

第一个场景：

```ts
{
  id: "audit-connection-missing",
  simulatedFailure: "managed audit adapter target is not connected",
  expectedOutcome: "blocked",
  actualOutcome: "blocked",
  safeFallback: "keep-production-connections-disabled",
  databaseConnectionAttempted: false,
  auditWritePerformed: false,
}
```

它表达的是：

```text
真实 managed audit adapter 不存在时，不尝试连接，不写 audit，直接阻塞。
```

## IdP JWKS Timeout

第二个场景：

```ts
{
  id: "idp-jwks-timeout-simulated",
  simulatedFailure: "JWKS fetch timeout is simulated without network access",
  expectedOutcome: "blocked",
  actualOutcome: "blocked",
  jwksNetworkFetchAttempted: false,
  externalIdpCallAttempted: false,
}
```

注意它是 timeout simulation，不是真的网络超时。

原因是当前阶段还没有真实 IdP 凭据，也没有真实 JWKS 访问授权。

## Credentials Missing

第三个场景：

```ts
const simulatedMissingEnv = actualMissingEnv.length > 0
  ? actualMissingEnv
  : ["AUDIT_STORE_URL", "ORDEROPS_IDP_JWKS_URL"];
```

如果真实配置已经完整，就用模拟缺失项：

```text
AUDIT_STORE_URL
ORDEROPS_IDP_JWKS_URL
```

如果真实配置确实缺失，就直接展示实际 missing env。

场景输出：

```ts
{
  id: "credentials-missing",
  simulatedFailure: "required production connection credentials are missing",
  actualOutcome: "blocked",
  evidence: {
    source: "simulated-credentials",
    missingEnv: simulatedMissingEnv,
  },
}
```

这让后续真实部署前的“缺凭据”状态有固定表达。

## Safe Fallback

第四个场景：

```ts
{
  id: "safe-fallback",
  simulatedFailure: "production connection readiness is incomplete",
  expectedOutcome: "blocked",
  actualOutcome: "blocked",
  safeFallback: "keep-upstream-actions-disabled",
  evidence: {
    statusCode: 403,
    operatorMessage: "Fallback keeps UPSTREAM_ACTIONS_ENABLED=false until production connections are real.",
  },
}
```

这延续了整个项目的安全主线：

```text
生产连接未就绪时，UPSTREAM_ACTIONS_ENABLED 必须保持 false。
```

## 核心检查项

checks：

```ts
configContractReady: configContract.checks.auditRequiredEnvConfigured && configContract.checks.idpRequiredEnvConfigured,
auditConnectionMissingCovered: scenarioPassed(scenarios, "audit-connection-missing"),
idpJwksTimeoutSimulated: scenarioPassed(scenarios, "idp-jwks-timeout-simulated"),
credentialsMissingCovered: scenarioPassed(scenarios, "credentials-missing"),
safeFallbackCovered: scenarioPassed(scenarios, "safe-fallback"),
noDatabaseConnectionAttempted: scenarios.every((scenario) => scenario.databaseConnectionAttempted === false),
noAuditWritePerformed: scenarios.every((scenario) => scenario.auditWritePerformed === false),
noJwksNetworkFetch: scenarios.every((scenario) => scenario.jwksNetworkFetchAttempted === false),
noExternalIdpCall: scenarios.every((scenario) => scenario.externalIdpCallAttempted === false),
realManagedAdapterConnected: false,
realIdpVerifierConnected: false,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

正常 smoke 下：

```text
四个场景都 covered
所有外部调用都是 false
真实连接仍然 false
```

## 生产阻塞项

正常配置下，本版保留两个 blocker：

```text
REAL_MANAGED_AUDIT_ADAPTER_MISSING
REAL_IDP_VERIFIER_NOT_CONNECTED
```

对应代码：

```ts
addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "audit-failure", "A real managed audit adapter is still required before production connections.");
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "idp-failure", "A real JWKS/OIDC verifier is still required before production connections.");
```

如果配置合约本身不完整，会出现：

```text
CONFIG_CONTRACT_INCOMPLETE
```

如果误打开上游动作，会出现：

```text
UPSTREAM_ACTIONS_ENABLED
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/connection-failure-mode-rehearsal
GET /api/v1/production/connection-failure-mode-rehearsal?format=markdown
```

文件位置：

```text
src/routes/statusRoutes.ts
```

路由代码：

```ts
const profile = createProductionConnectionFailureModeRehearsalProfile(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderProductionConnectionFailureModeRehearsalMarkdown(profile);
}
```

它是只读 production connection evidence endpoint。

## 测试覆盖

新增测试：

```text
test/productionConnectionFailureModeRehearsal.test.ts
```

核心断言：

```ts
expect(profile.scenarios.map((scenario) => [scenario.id, scenario.actualOutcome, scenario.passed])).toEqual([
  ["audit-connection-missing", "blocked", true],
  ["idp-jwks-timeout-simulated", "blocked", true],
  ["credentials-missing", "blocked", true],
  ["safe-fallback", "blocked", true],
]);
```

外部副作用断言：

```ts
expect(profile.scenarios.every((scenario) => !scenario.databaseConnectionAttempted)).toBe(true);
expect(profile.scenarios.every((scenario) => !scenario.auditWritePerformed)).toBe(true);
expect(profile.scenarios.every((scenario) => !scenario.jwksNetworkFetchAttempted)).toBe(true);
expect(profile.scenarios.every((scenario) => !scenario.externalIdpCallAttempted)).toBe(true);
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
76 个测试文件通过
271 条测试通过
```

运行归档：

```text
b/127/图片/production-connection-failure-mode-rehearsal.png
b/127/解释/运行调试说明.md
```

## 一句话总结

v127 把真实生产连接前的失败模式变成可验证证据：audit 缺连接、JWKS 超时、凭据缺失、安全回退都能稳定阻塞，并且不发生数据库连接、audit 写入、JWKS 网络请求或外部 IdP 调用。
