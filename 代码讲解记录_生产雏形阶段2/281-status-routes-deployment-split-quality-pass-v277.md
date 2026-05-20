# 281. Node v277 statusRoutes deployment split quality pass

## 本版所处项目进度

v277 继续 v276 的 `statusRoutes.ts` 拆分主线。上一版已经迁出 security readiness 路由，这一版迁出 deployment / connection readiness 路由。

当前拆分进度：

```text
v271：statusUpstreamFixtureRoutes.ts，10 条 upstream fixture / production evidence intake route
v276：statusSecurityRoutes.ts，10 条 security readiness route
v277：statusDeploymentRoutes.ts，7 条 deployment / connection readiness route
```

`statusRoutes.ts` 从约 2002 行下降到约 1619 行，但仍高于 1200 行目标。

## 新增路由模块

文件：

```text
src/routes/statusDeploymentRoutes.ts
```

入口：

```ts
export function registerStatusDeploymentRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
```

它继续复用：

```ts
registerStatusJsonMarkdownRoutes
statusJsonMarkdownRoute
```

所以这一版没有再复制 querystring schema 和 `format=markdown` 分支。

## 迁移的 7 条路由

```ts
statusJsonMarkdownRoute(
  "/api/v1/deployment/safety-profile",
  () => createDeploymentSafetyProfile(deps.config),
  renderDeploymentSafetyProfileMarkdown,
),
statusJsonMarkdownRoute(
  "/api/v1/deployment/environment-readiness",
  () => createDeploymentEnvironmentReadinessGate(deps.config),
  renderDeploymentEnvironmentReadinessMarkdown,
),
statusJsonMarkdownRoute(
  "/api/v1/production/connection-config-contract",
  () => createProductionConnectionConfigContractProfile(deps.config),
  renderProductionConnectionConfigContractMarkdown,
),
```

同组还包括：

```text
/api/v1/production/connection-failure-mode-rehearsal
/api/v1/production/connection-implementation-precheck
/api/v1/production/connection-dry-run-change-request
/api/v1/production/connection-archive-verification
```

没有迁移：

```text
/api/v1/production/connection-dry-run-approvals
/api/v1/production/connection-dry-run-approvals/latest
/api/v1/production/connection-dry-run-approvals/:approvalId
POST /api/v1/production/connection-dry-run-approvals
```

原因是 approval ledger 这一组包含本地 ledger 查询和 POST 写入，职责边界比只读 readiness report 更复杂，适合后续单独拆。

## statusRoutes.ts 的变化

文件：

```text
src/routes/statusRoutes.ts
```

现在只保留：

```ts
registerStatusDeploymentRoutes(app, deps);
```

对应 import：

```ts
import { registerStatusDeploymentRoutes } from "./statusDeploymentRoutes.js";
```

这把 7 条 deployment / connection readiness report 的手写重复块移出主路由文件。

## 质量 profile 更新

文件：

```text
src/services/statusRoutesSplitQualityPass.ts
```

v277 的核心字段：

```ts
sourceVersion: "Node v277",
deploymentExtractedRouteModule: "src/routes/statusDeploymentRoutes.ts",
migratedRouteCount: 27,
latestMigratedRouteCount: 7,
migratedRouteGroup: "upstream fixture, production evidence intake, security readiness, deployment readiness, and connection readiness",
nextSplitCandidate: "rollback runbook and production readiness summary routes",
```

检查项新增：

```ts
deploymentRoutesExtracted: true,
```

## 测试覆盖

文件：

```text
test/statusRoutesSplitQualityPass.test.ts
```

新增断言：

```ts
deploymentExtractedRouteModule: "src/routes/statusDeploymentRoutes.ts",
migratedRouteCount: 27,
latestMigratedRouteCount: 7,
deploymentRoutesExtracted: true,
```

并用真实 app route 验证：

```ts
const deploymentJson = await app.inject({
  method: "GET",
  url: "/api/v1/deployment/safety-profile",
});
const connectionJson = await app.inject({
  method: "GET",
  url: "/api/v1/production/connection-config-contract",
});
```

这保证迁移后 API path 和 response shape 没变。

## 是否还值得继续拆

值得，但继续拆应该放到后续版本。

当前判断：

```text
statusRoutes.ts = 1619 行，仍偏大
目标 = 1200 行以内
下一候选 = rollback runbook / production readiness summary / live-probe route group
```

如果继续做 v278，建议拆 `production readiness summary`，因为这组 route 数量较多、仍是纯只读报告，收益更明显。

## 一句话总结

Node v277 把 deployment safety、environment readiness 和 production connection readiness 7 条只读 route 从 `statusRoutes.ts` 迁到 `statusDeploymentRoutes.ts`，让主路由文件进一步下降到约 1619 行；这仍不是最终状态，但已经是第三个可验证的 Strangler 小闭环。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route + deployment/connection focused tests -> 9 files, 26 tests passed
npm test -> 215 files, 728 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=27, latestMigratedRouteCount=7, preservedApiPathCount=27, deploymentProfileVersion=deployment-safety-profile.v1, connectionProfileVersion=production-connection-config-contract.v1, markdown routes=200
Chrome screenshot -> d/277/图片/status-routes-deployment-split-quality-pass-v277.png
```

## 清理记录

HTTP smoke 启动的 Node 进程已停止。本版验证产生的 `.tmp` 和 `dist` 会在提交前删除。
