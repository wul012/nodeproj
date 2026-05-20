# 275. Node v271 statusRoutes split quality pass

## 版本定位

v271 是计划中的质量优化分支。它不新增真实 credential resolver 能力，也不要求 Java v112 / mini-kv v119 已完成。

本版目标是把 `src/routes/statusRoutes.ts` 中最稳定、最独立的一组只读路由拆出：

```text
upstream fixture / production evidence intake route group
```

这组路由只读、无 mutation、无 credential value、无真实 managed audit connection，适合作为 `statusRoutes.ts` 拆分的第一刀。

## 拆分前的问题

`statusRoutes.ts` 同时包含：

```ts
interface StatusRouteDeps { ... }
interface FixtureReportQuery { ... }
const fixtureReportQuerySchema = { ... }
function registerJsonMarkdownReportRoute<TProfile>(...) { ... }
export async function registerStatusRoutes(...) { ... }
```

也就是说，类型、JSON/Markdown 注册 helper、上游 fixture 路由、production 路由、SSE 路由都挤在一个文件里。

v271 没有尝试一次性拆完，而是先把可独立验证的一组迁出。

## 新增共享类型

文件：

```text
src/routes/statusRouteTypes.ts
```

这里承接原来在 `statusRoutes.ts` 里的类型：

```ts
export interface StatusRouteDeps {
  config: AppConfig;
  snapshots: OpsSnapshotService;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
}
```

这样后续继续拆 route group 时，不需要每个模块反复定义同一套依赖。

## 新增 JSON / Markdown route helper

文件：

```text
src/routes/statusJsonMarkdownRoute.ts
```

核心函数：

```ts
export function registerJsonMarkdownReportRoute<TProfile>(
  app: FastifyInstance,
  path: string,
  loadProfile: () => Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void {
  app.get<{ Querystring: FixtureReportQuery }>(path, {
    schema: {
      querystring: fixtureReportQuerySchema,
    },
  }, async (request, reply) => {
    const profile = await loadProfile();

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderMarkdown(profile);
    }

    return profile;
  });
}
```

这段逻辑原本在 `statusRoutes.ts` 内部，现在独立成可复用 helper。后续拆 production readiness summary routes 时也能继续复用。

## 新增 upstream fixture route module

文件：

```text
src/routes/statusUpstreamFixtureRoutes.ts
```

入口：

```ts
export function registerStatusUpstreamFixtureRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/upstreams/production-evidence-intake",
      () => loadUpstreamProductionEvidenceIntake(deps.config),
      renderUpstreamProductionEvidenceIntakeMarkdown,
    ),
```

这里迁移了 10 条路径。重要的是路径没有换，response shape 没有换，只是注册位置从主文件迁到了独立模块。

## statusRoutes.ts 的变化

原来的 10 个 `app.get<{ Querystring: FixtureReportQuery }>(...)` 块被替换为：

```ts
registerStatusUpstreamFixtureRoutes(app, deps);
```

同时 `statusRoutes.ts` 引入共享类型和 helper：

```ts
import type {
  CreateProductionConnectionApprovalBody,
  FixtureReportQuery,
  ProductionConnectionApprovalParams,
  ProductionConnectionApprovalQuery,
  StatusRouteDeps,
} from "./statusRouteTypes.js";
import {
  fixtureReportQuerySchema,
  registerJsonMarkdownReportRoute,
} from "./statusJsonMarkdownRoute.js";
import { registerStatusUpstreamFixtureRoutes } from "./statusUpstreamFixtureRoutes.js";
```

这一版后主文件从约 2480 行降到 2223 行，减少约 260 行。

## 质量 Profile

文件：

```text
src/services/statusRoutesSplitQualityPass.ts
```

它记录本次拆分范围：

```ts
splitScope: {
  sourceFile: "src/routes/statusRoutes.ts",
  extractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts",
  extractedHelperModule: "src/routes/statusJsonMarkdownRoute.ts",
  extractedTypesModule: "src/routes/statusRouteTypes.ts",
  migratedRouteCount: 10,
  migratedRouteGroup: "upstream fixture and production evidence intake",
  nextSplitCandidate: "production readiness summary routes",
}
```

并明确质量分支不改变行为：

```ts
featureBehaviorChanged: false,
realResolverImplementationAllowed: false,
connectsManagedAudit: false,
executionAllowed: false,
```

## 路由验证

新增路由：

```text
GET /api/v1/status-routes/split-quality-pass
GET /api/v1/status-routes/split-quality-pass?format=markdown
```

测试文件：

```text
test/statusRoutesSplitQualityPass.test.ts
```

关键断言：

```ts
expect(profile).toMatchObject({
  qualityPassState: "status-routes-split-quality-pass-ready",
  readOnlyQualityPass: true,
  featureBehaviorChanged: false,
  splitScope: {
    migratedRouteCount: 10,
  },
});
```

同时测试还会请求迁移后的老路径：

```ts
GET /api/v1/upstream-contract-fixtures
GET /api/v1/upstream-contract-fixtures?format=markdown
```

这证明拆分后旧 API 仍然可用。

## 本版结论

v271 是一次低风险、可验证的质量拆分：它没有做大重构，没有碰真实 resolver，也没有改变 Java / mini-kv 的计划关系。

下一步仍然按计划执行：

```text
Java v112 + mini-kv v119 可以继续并行回显 Node v270。
Node v272 必须等 Java v112 + mini-kv v119 完成后再推进。
```

## 验证结果

```text
npm run typecheck -> passed
npx vitest run test/statusRoutesSplitQualityPass.test.ts + upstream fixture route tests -> 11 files, 29 tests passed
npm test -> 211 files, 712 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=10, fixtureValid=true
Chrome screenshot -> c/271/图片/status-routes-split-quality-pass-v271.png
```
