# 283. Node v279 statusRoutes rollback split quality pass

## 本版所处项目进度

v279 继续 `statusRoutes.ts` 拆分主线，把 rollback readiness 这组只读报告路由迁出。

当前拆分进度：

```text
v271：statusUpstreamFixtureRoutes.ts，10 条 upstream fixture / production evidence intake route
v276：statusSecurityRoutes.ts，10 条 security readiness route
v277：statusDeploymentRoutes.ts，7 条 deployment / connection readiness route
v278：statusReadinessSummaryRoutes.ts，13 条 production readiness summary route
v279：statusRollbackRoutes.ts，4 条 rollback readiness route
```

`statusRoutes.ts` 从约 2002 行下降到约 1245 行，已经接近 1200 行目标。

## 新增路由模块

文件：

```text
src/routes/statusRollbackRoutes.ts
```

入口：

```ts
export function registerStatusRollbackRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
```

继续复用：

```ts
registerStatusJsonMarkdownRoutes
statusJsonMarkdownRoute
```

## 迁移的 rollback 路由

```ts
statusJsonMarkdownRoute(
  "/api/v1/production/rollback-window-readiness-checklist",
  () => loadRollbackWindowReadinessChecklist(deps.config),
  renderRollbackWindowReadinessChecklistMarkdown,
),
statusJsonMarkdownRoute(
  "/api/v1/production/rollback-execution-preflight-contract",
  () => loadRollbackExecutionPreflightContract(deps.config),
  renderRollbackExecutionPreflightContractMarkdown,
),
```

同组还包括：

```text
/api/v1/production/release-rollback-readiness-runbook
/api/v1/deployment/rollback-runbook
```

这些接口仍然只输出 runbook、checklist、preflight contract，不执行 rollback。

## statusRoutes.ts 的变化

文件：

```text
src/routes/statusRoutes.ts
```

现在只保留注册调用：

```ts
registerStatusRollbackRoutes(app, deps);
```

对应 import：

```ts
import { registerStatusRollbackRoutes } from "./statusRollbackRoutes.js";
```

原来的 rollback route 块被移出主文件。

## 质量 profile 更新

文件：

```text
src/services/statusRoutesSplitQualityPass.ts
```

v279 核心字段：

```ts
sourceVersion: "Node v279",
rollbackExtractedRouteModule: "src/routes/statusRollbackRoutes.ts",
migratedRouteCount: 44,
latestMigratedRouteCount: 4,
migratedRouteGroup: "upstream fixture, production evidence intake, security readiness, deployment readiness, connection readiness, production readiness summary, and rollback readiness",
nextSplitCandidate: "live-probe route group",
```

检查项新增：

```ts
rollbackRoutesExtracted: true,
```

## 测试覆盖

文件：

```text
test/statusRoutesSplitQualityPass.test.ts
```

新增断言：

```ts
rollbackExtractedRouteModule: "src/routes/statusRollbackRoutes.ts",
migratedRouteCount: 44,
latestMigratedRouteCount: 4,
rollbackRoutesExtracted: true,
```

并用真实 app route 验证：

```ts
const rollbackJson = await app.inject({
  method: "GET",
  url: "/api/v1/production/rollback-window-readiness-checklist",
});
```

这保证迁移后 API path 和 response shape 没变。

## 是否还值得继续拆

可以继续，但已经不急。

当前判断：

```text
statusRoutes.ts = 1245 行
目标 = 1200 行以内
下一候选 = live-probe route group
```

下一次拆分应仍然只选稳定只读 route，不碰 approval ledger POST 或本地状态变更。

## 一句话总结

Node v279 把 rollback readiness runbook/checklist/preflight 路由从 `statusRoutes.ts` 迁到 `statusRollbackRoutes.ts`，让主路由文件下降到约 1245 行；这版是纯质量优化，没有新增执行能力或跨项目真实调用。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route + rollback focused tests -> 5 files, 14 tests passed
npm test -> first full run: 212 files passed, 3 live-probe route tests timed out at 60s under full parallel load; targeted rerun for those 3 files -> 3 files, 9 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=44, latestMigratedRouteCount=4, preservedApiPathCount=44, rollbackProfileVersion=rollback-window-readiness-checklist.v1, deploymentRollbackRunbookVersion=rollback-evidence-runbook.v1, markdown routes=200
Chrome screenshot -> d/279/图片/status-routes-rollback-split-quality-pass-v279.png
```

## 清理记录

HTTP smoke 启动的 Node 进程已停止。本版验证产生的 `.tmp` 和 `dist` 会在提交前删除。
