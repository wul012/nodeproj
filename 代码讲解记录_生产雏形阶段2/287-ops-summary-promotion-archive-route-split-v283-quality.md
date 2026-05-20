# 287 - opsSummaryRoutes promotion archive 路由拆分（Node v283 前置质量收口）

## 版本定位

本轮是 Node v283 功能开发前的质量拆分收口，不新增 managed audit resolver 能力，也不修改 Java / mini-kv。目标是处理 `opsSummaryRoutes.ts` 的大文件问题，把 promotion archive 全链路路由从主入口中拆出去，避免 v283 后续功能继续叠在一个 1400+ 行路由文件上。

## 核心变化

`src/routes/opsSummaryRoutes.ts` 由 1464 行降到约 315 行。它现在只负责汇总类入口：summary / readiness、promotion decision、runbook、checkpoint、baseline、handoff report。

关键代码：

```ts
export async function registerOpsSummaryRoutes(app: FastifyInstance, deps: OpsSummaryRouteDeps): Promise<void> {
  app.get("/api/v1/ops/summary", async () => createOpsSummary(deps));
  app.get("/api/v1/ops/readiness", async () => createOpsReadiness(createOpsSummary(deps)));
  registerOpsPromotionArchiveRoutes(app, deps);
  app.get("/api/v1/ops/promotion-review", async () => {
    return createPromotionReview(deps);
  });
```

这里的重点是 `registerOpsPromotionArchiveRoutes(app, deps)`：主入口不再内联 archive 的 20 多个 JSON/Markdown 路由，而是把同一职责交给子模块。

## 新增子模块

`src/routes/opsPromotionArchiveRoutes.ts` 承载 promotion archive 路由注册、统一 query schema、artifact 构造和 Markdown 渲染分发。

关键代码：

```ts
function registerPromotionArchiveRoute<T>(
  app: FastifyInstance,
  deps: OpsSummaryRouteDeps,
  path: string,
  select: (artifacts: OpsPromotionArchiveRouteArtifacts) => T,
  renderMarkdown: (artifact: T) => string,
): void {
  app.get<{ Querystring: OpsPromotionArchiveQuery }>(path, promotionArchiveQueryRouteOptions, async (request, reply) => {
    const artifact = select(createPromotionArchiveRouteArtifacts(deps));

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderMarkdown(artifact);
    }

    return artifact;
  });
}
```

这段把旧代码里重复出现的 schema、format 判断、content-type 设置抽成一个路由注册器。每个 archive endpoint 只需要给出路径、artifact selector、Markdown renderer。

## 为什么现在停止继续拆

拆分后：

```text
opsSummaryRoutes.ts: 315 行左右
opsPromotionArchiveRoutes.ts: 455 行左右
```

这两个文件都已经回到可维护范围。继续把 315/455 行文件硬拆，会带来模块碎片化，收益小于维护成本。更合适的下一步是回到 Node v283 主流程：managed audit resolver implementation plan draft。

## 验证

执行过：

```bash
npm run typecheck
npx vitest run test/opsSummary.test.ts test/opsPromotionArchiveBundleBoundary.test.ts
npm run build
```

聚焦测试覆盖了拆分后的挂载边界：

```ts
const json = await app.inject({
  method: "GET",
  url: "/api/v1/ops/promotion-archive/manifest",
});
const markdown = await app.inject({
  method: "GET",
  url: "/api/v1/ops/promotion-archive/manifest?format=markdown",
});
```

这保证 archive 路由虽然迁出主文件，但仍通过 `buildApp()` 正常挂载，JSON 和 Markdown 两种格式都可访问。
