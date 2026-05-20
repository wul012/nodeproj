# Node v283 前置质量拆分收口：opsSummaryRoutes promotion archive 子路由

## 本轮目的

本轮继续还技术债，不推进新业务功能。目标是把 `opsSummaryRoutes.ts` 中最重的 promotion archive 路由组拆成独立模块，避免后续 v283 resolver plan 继续叠加到一个 1400+ 行路由文件里。

## 拆分结果

```text
src/routes/opsSummaryRoutes.ts：1464 行 -> 约 315 行
src/routes/opsPromotionArchiveRoutes.ts：新增，约 455 行
```

`opsSummaryRoutes.ts` 现在保留主入口和非 archive 路由，archive 相关 JSON/Markdown endpoint 由 `registerOpsPromotionArchiveRoutes(app, deps)` 统一挂载。

## 关键代码

`opsSummaryRoutes.ts`：

```ts
app.get("/api/v1/ops/summary", async () => createOpsSummary(deps));
app.get("/api/v1/ops/readiness", async () => createOpsReadiness(createOpsSummary(deps)));
registerOpsPromotionArchiveRoutes(app, deps);
```

`opsPromotionArchiveRoutes.ts`：

```ts
registerPromotionArchiveRoute(
  app,
  deps,
  "/api/v1/ops/promotion-archive/manifest",
  (artifacts) => artifacts.manifest,
  renderOpsPromotionArchiveManifestMarkdown,
);
```

## 验证

已执行：

```bash
npm run typecheck
npx vitest run test/opsSummary.test.ts test/opsPromotionArchiveBundleBoundary.test.ts
npm run build
```

聚焦测试确认 `/api/v1/ops/promotion-archive/manifest` 和 `?format=markdown` 仍可通过主 app 访问。

## 后续判断

当前没有必要继续拆这一层。315/455 行文件已经进入合理维护区间，再拆会带来碎片化。下一步应停止技术债拆分，回到 Node v283 主流程。
