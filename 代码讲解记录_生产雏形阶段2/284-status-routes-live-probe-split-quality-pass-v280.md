# 284. Node v280 statusRoutes live-probe split quality pass

## 本版所处项目进度

v280 继续 `statusRoutes.ts` 拆分主线，把 live-probe / real-read smoke 这一大组只读报告路由迁出。

当前拆分进度：

```text
v271：statusUpstreamFixtureRoutes.ts，10 条 upstream fixture / production evidence intake route
v276：statusSecurityRoutes.ts，10 条 security readiness route
v277：statusDeploymentRoutes.ts，7 条 deployment / connection readiness route
v278：statusReadinessSummaryRoutes.ts，13 条 production readiness summary route
v279：statusRollbackRoutes.ts，4 条 rollback readiness route
v280：statusLiveProbeRoutes.ts，23 条 live-probe / real-read smoke route
```

`statusRoutes.ts` 从约 2002 行下降到约 896 行，已经低于原来的 1200 行目标。

## 新增路由模块

文件：

```text
src/routes/statusLiveProbeRoutes.ts
```

入口：

```ts
export function registerStatusLiveProbeRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
```

这里继续复用既有的 JSON/Markdown 注册工厂：

```ts
registerStatusJsonMarkdownRoutes
statusJsonMarkdownRoute
```

所以 v280 没有再复制 `format=markdown` 的手写分支。

## 迁移的 live-probe 路由

代表性路由：

```ts
statusJsonMarkdownRoute(
  "/api/v1/production/live-probe-readiness-contract",
  () => createProductionLiveProbeReadinessContract(deps.config),
  renderProductionLiveProbeReadinessContractMarkdown,
),
```

real-read smoke 侧也一起迁入同一模块：

```ts
statusJsonMarkdownRoute(
  "/api/v1/production/live-probe-real-read-smoke-readiness-switch",
  () => loadProductionLiveProbeRealReadSmokeReadinessSwitch(createRuntimeDeps(deps)),
  renderProductionLiveProbeRealReadSmokeReadinessSwitchMarkdown,
),
```

同组共 23 条路由，全部保持原路径和原响应 shape。

## 依赖组装

文件内新增两个小 helper：

```ts
function createSmokeDeps(deps: StatusRouteDeps) {
  return {
    config: deps.config,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  };
}
```

以及：

```ts
function createRuntimeDeps(deps: StatusRouteDeps) {
  return {
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  };
}
```

这样可以避免 23 条路由反复写同一组 `deps.*` 字段，也避免把 runtime 依赖散落在主路由文件里。

## statusRoutes.ts 的变化

文件：

```text
src/routes/statusRoutes.ts
```

现在只保留注册调用：

```ts
registerStatusLiveProbeRoutes(app, deps);
```

对应 import：

```ts
import { registerStatusLiveProbeRoutes } from "./statusLiveProbeRoutes.js";
```

原来的 live-probe 大块 route 注册被移出主文件。

## 质量 profile 更新

文件：

```text
src/services/statusRoutesSplitQualityPass.ts
```

v280 核心字段：

```ts
sourceVersion: "Node v280",
liveProbeExtractedRouteModule: "src/routes/statusLiveProbeRoutes.ts",
migratedRouteCount: 67,
latestMigratedRouteCount: 23,
migratedRouteGroup: "upstream fixture, production evidence intake, security readiness, deployment readiness, connection readiness, production readiness summary, rollback readiness, and live-probe readiness",
nextSplitCandidate: "remaining real-read window route group",
```

检查项新增：

```ts
liveProbeRoutesExtracted: true,
```

## 测试覆盖

文件：

```text
test/statusRoutesSplitQualityPass.test.ts
```

新增断言：

```ts
liveProbeExtractedRouteModule: "src/routes/statusLiveProbeRoutes.ts",
migratedRouteCount: 67,
latestMigratedRouteCount: 23,
liveProbeRoutesExtracted: true,
```

并用真实 app route 验证：

```ts
const liveProbeJson = await app.inject({
  method: "GET",
  url: "/api/v1/production/live-probe-readiness-contract",
});
```

以及：

```ts
const realReadSmokeJson = await app.inject({
  method: "GET",
  url: "/api/v1/production/live-probe-real-read-smoke-readiness-switch",
});
```

这保证迁移后 API path 和 response shape 没变。

## 是否还值得继续拆

可以继续，但已经不急。

当前判断：

```text
statusRoutes.ts = 896 行
目标 = 1200 行以内
下一候选 = remaining real-read window route group
```

下一次拆分前要先判断收益，不要为了版本号继续拆过小 route。

## 一句话总结

Node v280 把 23 条 live-probe / real-read smoke 只读路由从 `statusRoutes.ts` 迁到 `statusLiveProbeRoutes.ts`，让主路由文件降到约 896 行；这版是纯质量优化，没有新增执行能力或跨项目真实调用。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route + live-probe focused tests -> 7 files, 20 tests passed
npx vitest run managedAuditSandboxCodeHealthPass + statusRoutesSplitQualityPass -> 2 files, 5 tests passed
npm test -> 215 files, 728 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=67, latestMigratedRouteCount=23, preservedApiPathCount=67, liveProbeProfileVersion=production-live-probe-readiness-contract.v1, switchProfileVersion=production-live-probe-real-read-smoke-readiness-switch.v1, markdown routes=200, executionAllowed=false, connectsManagedAudit=false
Chrome screenshot -> d/280/图片/status-routes-live-probe-split-quality-pass-v280.png
```

## 清理记录

HTTP smoke 启动的 Node 进程会在本版收尾前停止。本版验证产生的 `.tmp` 和 `dist` 会在提交前删除。
