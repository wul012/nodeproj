# 第一百二十九版代码讲解：production connection implementation precheck

本版目标是把真实生产连接实现前的门槛结构化。

它不连接数据库、不 fetch JWKS、不调用真实 IdP，也不允许真实 upstream execution。本版只做一件事：

```text
把 v126 config contract
把 v127 failure-mode rehearsal
把 v128 production readiness summary v10
汇总成一个 implementation precheck
并明确还缺哪些人工确认
```

## 本版所处项目进度

v128 之后，Node 已经知道：

```text
配置合约可以检查
失败模式可以本地演练
summary v10 可以说明 readiness evidence 已连接
真实 managed audit adapter 和真实 IdP verifier 仍缺失
```

v129 往生产级靠近一步：不是马上写真实连接，而是先让“能不能开始写真实连接”有一个可审查的预检输出。

## 新增服务

新增文件：

```text
src/services/productionConnectionImplementationPrecheck.ts
```

入口函数：

```ts
export async function loadProductionConnectionImplementationPrecheck(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionConnectionImplementationPrecheckProfile> {
  const configContract = createProductionConnectionConfigContractProfile(input.config);
  const failureModeRehearsal = createProductionConnectionFailureModeRehearsalProfile(input.config);
  const summaryV10 = await loadProductionReadinessSummaryV10(input);
```

这里直接复用已有三条证据，不重复造轮子：

```text
productionConnectionConfigContract
productionConnectionFailureModeRehearsal
productionReadinessSummaryV10
```

## 核心 checks

config contract 通过条件：

```ts
configContractReady: configContract.checks.auditRequiredEnvConfigured
  && configContract.checks.idpRequiredEnvConfigured
  && configContract.checks.noDatabaseConnectionAttempted
  && configContract.checks.noJwksNetworkFetch
  && configContract.checks.noExternalIdpCall,
```

failure-mode rehearsal 通过条件：

```ts
failureModeRehearsalReady: failureModeRehearsal.checks.configContractReady
  && failureModeRehearsal.checks.auditConnectionMissingCovered
  && failureModeRehearsal.checks.idpJwksTimeoutSimulated
  && failureModeRehearsal.checks.credentialsMissingCovered
  && failureModeRehearsal.checks.safeFallbackCovered
  && failureModeRehearsal.checks.noDatabaseConnectionAttempted
  && failureModeRehearsal.checks.noAuditWritePerformed
  && failureModeRehearsal.checks.noJwksNetworkFetch
  && failureModeRehearsal.checks.noExternalIdpCall,
```

summary v10 通过条件：

```ts
readinessSummaryV10Ready: summaryV10.checks.configContractReady
  && summaryV10.checks.failureModeRehearsalReady
  && summaryV10.checks.productionReadinessV9EvidenceConnected
  && summaryV10.checks.upstreamActionsStillDisabled,
```

最关键的是本版仍然固定：

```ts
realConnectionAttemptAllowed: false as const,
readyForImplementation: false as const,
```

也就是说，v129 只是“实现前预检”，不是“开始真实连接”。

## 人工确认项

本版新增：

```ts
function createHumanConfirmations(): ProductionConnectionHumanConfirmation[] {
  return [
    {
      id: "audit-owner-approval",
      present: false,
      required: true,
      owner: "audit-owner",
```

三个确认项分别是：

```text
audit-owner-approval
idp-owner-approval
rollback-owner-approval
```

正常情况下它们都还是 `present=false`，所以 summary 会输出：

```text
missingHumanConfirmationCount=3
```

## Precheck Items

本版把预检拆成 8 项：

```ts
return [
  item("config-contract-ready", checks.configContractReady, "production-connection-config-contract", "..."),
  item("failure-mode-rehearsal-ready", checks.failureModeRehearsalReady, "production-connection-failure-mode-rehearsal", "..."),
  item("summary-v10-evidence-ready", checks.readinessSummaryV10Ready, "production-readiness-summary-v10", "..."),
  item("upstream-actions-disabled", checks.upstreamActionsStillDisabled, "runtime-config", "..."),
  item("no-external-connection-attempts", checks.noDatabaseConnectionAttempted && checks.noJwksNetworkFetch && checks.noExternalIdpCall, "implementation-precheck", "..."),
```

前 5 项在正常测试配置下通过，后 3 项人工确认仍 missing。

## 生产阻塞项

正常配置下，本版 blocker 是：

```text
HUMAN_AUDIT_OWNER_APPROVAL_MISSING
HUMAN_IDP_OWNER_APPROVAL_MISSING
ROLLBACK_OWNER_APPROVAL_MISSING
REAL_CONNECTION_ATTEMPT_NOT_ALLOWED
```

对应代码：

```ts
addMessage(blockers, checks.humanAuditOwnerApprovalPresent, "HUMAN_AUDIT_OWNER_APPROVAL_MISSING", "implementation-precheck", "Audit owner approval is required before real managed audit adapter work.");
addMessage(blockers, checks.humanIdpOwnerApprovalPresent, "HUMAN_IDP_OWNER_APPROVAL_MISSING", "implementation-precheck", "IdP owner approval is required before real JWKS/OIDC verifier work.");
addMessage(blockers, checks.rollbackOwnerApprovalPresent, "ROLLBACK_OWNER_APPROVAL_MISSING", "implementation-precheck", "Rollback owner approval is required before real production connection work.");
addMessage(blockers, checks.realConnectionAttemptAllowed, "REAL_CONNECTION_ATTEMPT_NOT_ALLOWED", "implementation-precheck", "This precheck is intentionally read-only and cannot attempt database or JWKS connections.");
```

这几个 blocker 是本版的核心价值：它告诉操作者“证据已经可读，但真实连接还不能做”。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/connection-implementation-precheck
GET /api/v1/production/connection-implementation-precheck?format=markdown
```

路由位置：

```text
src/routes/statusRoutes.ts
```

核心代码：

```ts
const profile = await loadProductionConnectionImplementationPrecheck({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
});
```

Markdown 输出用于人工审查和版本归档。

## 测试覆盖

新增测试：

```text
test/productionConnectionImplementationPrecheck.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-connection-implementation-precheck.v1",
  readyForImplementation: false,
  checks: {
    configContractReady: true,
    failureModeRehearsalReady: true,
    readinessSummaryV10Ready: true,
    realConnectionAttemptAllowed: false,
  },
});
```

precheck item 断言：

```ts
expect(profile.precheckItems.map((item) => [item.id, item.status])).toEqual([
  ["config-contract-ready", "pass"],
  ["failure-mode-rehearsal-ready", "pass"],
  ["summary-v10-evidence-ready", "pass"],
  ["upstream-actions-disabled", "pass"],
  ["no-external-connection-attempts", "pass"],
  ["audit-owner-approval", "missing"],
  ["idp-owner-approval", "missing"],
  ["rollback-owner-approval", "missing"],
]);
```

## README、运行调试和归档

README 新增：

```text
Production connection implementation precheck
GET /api/v1/production/connection-implementation-precheck
```

本版运行：

```text
npm run typecheck
npx vitest run test/productionConnectionImplementationPrecheck.test.ts
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

归档：

```text
b/129/图片/production-connection-implementation-precheck.png
b/129/解释/运行调试说明.md
```

## 一句话总结

v129 把 Node 推进到“真实生产连接实现前预检”阶段：配置、失败模式和 summary v10 证据已经能汇总，但人工批准与真实连接尝试仍被明确阻塞。
