# 282. Node v278 statusRoutes readiness summary split quality pass

## 本版所处项目进度

v278 继续 `statusRoutes.ts` 拆分主线，把 production readiness summary 这组只读报告路由迁出。

当前拆分进度：

```text
v271：statusUpstreamFixtureRoutes.ts，10 条 upstream fixture / production evidence intake route
v276：statusSecurityRoutes.ts，10 条 security readiness route
v277：statusDeploymentRoutes.ts，7 条 deployment / connection readiness route
v278：statusReadinessSummaryRoutes.ts，13 条 production readiness summary route
```

`statusRoutes.ts` 从约 2002 行下降到约 1295 行，接近 1200 行目标。

## 新增路由模块

文件：

```text
src/routes/statusReadinessSummaryRoutes.ts
```

入口：

```ts
export function registerStatusReadinessSummaryRoutes(
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

因此没有重新复制 querystring schema 和 `format=markdown` 分支。

## 迁移的 readiness summary 路由

```ts
statusJsonMarkdownRoute(
  "/api/v1/production/readiness-summary",
  () => loadProductionReadinessSummaryIndex(deps.config),
  renderProductionReadinessSummaryIndexMarkdown,
),
statusJsonMarkdownRoute(
  "/api/v1/production/readiness-summary-v13",
  () => loadProductionReadinessSummaryV13({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionReadinessSummaryV13Markdown,
),
```

v5-v13 需要 `auditLog` / `auditStoreRuntime` / approvals / upstream clients 等依赖，新模块直接通过 `StatusRouteDeps` 注入，行为与原 `statusRoutes.ts` 一致。

## statusRoutes.ts 的变化

文件：

```text
src/routes/statusRoutes.ts
```

现在只保留注册调用：

```ts
registerStatusReadinessSummaryRoutes(app, deps);
```

对应 import：

```ts
import { registerStatusReadinessSummaryRoutes } from "./statusReadinessSummaryRoutes.js";
```

原来 13 条 `app.get("/api/v1/production/readiness-summary...")` 块被移出主文件。

## 质量 profile 更新

文件：

```text
src/services/statusRoutesSplitQualityPass.ts
```

v278 核心字段：

```ts
sourceVersion: "Node v278",
readinessSummaryExtractedRouteModule: "src/routes/statusReadinessSummaryRoutes.ts",
migratedRouteCount: 40,
latestMigratedRouteCount: 13,
migratedRouteGroup: "upstream fixture, production evidence intake, security readiness, deployment readiness, connection readiness, and production readiness summary",
nextSplitCandidate: "rollback runbook and live-probe route groups",
```

检查项新增：

```ts
readinessSummaryRoutesExtracted: true,
```

## 测试覆盖

文件：

```text
test/statusRoutesSplitQualityPass.test.ts
```

新增断言：

```ts
readinessSummaryExtractedRouteModule: "src/routes/statusReadinessSummaryRoutes.ts",
migratedRouteCount: 40,
latestMigratedRouteCount: 13,
readinessSummaryRoutesExtracted: true,
```

并用真实 app route 验证：

```ts
const readinessJson = await app.inject({
  method: "GET",
  url: "/api/v1/production/readiness-summary",
});
const readinessMarkdown = await app.inject({
  method: "GET",
  url: "/api/v1/production/readiness-summary?format=markdown",
});
```

这保证迁移后 API path 和 response shape 没变。

## 是否还值得继续拆

还可以继续，但已经不急。

当前判断：

```text
statusRoutes.ts = 1295 行
目标 = 1200 行以内
下一候选 = rollback runbook / live-probe route group
```

下一次拆分最好只选一组稳定只读 route，不要碰 approval ledger POST 或本地状态变更。

## 一句话总结

Node v278 把 production readiness summary v1-v13 路由从 `statusRoutes.ts` 迁到 `statusReadinessSummaryRoutes.ts`，让主路由文件下降到约 1295 行；这版是纯质量优化，没有新增执行能力或跨项目真实调用。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route + readiness summary focused tests -> 5 files, 14 tests passed
npm test -> 215 files, 728 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=40, latestMigratedRouteCount=13, preservedApiPathCount=40, readinessIndexVersion=production-readiness-summary-index.v1, readinessV13SummaryVersion=production-readiness-summary.v13, markdown routes=200
Chrome screenshot -> d/278/图片/status-routes-readiness-summary-split-quality-pass-v278.png
```

## 清理记录

HTTP smoke 启动的 Node 进程已停止。本版验证产生的 `.tmp` 和 `dist` 会在提交前删除。
