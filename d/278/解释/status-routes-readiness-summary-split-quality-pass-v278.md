# Node v278 运行调试说明：statusRoutes readiness summary split quality pass

## 本版目标

v278 继续 v276-v277 的质量主线，只做 `statusRoutes.ts` 拆分，不新增业务能力，不接入 Java / mini-kv，不打开真实 resolver。

本版新增：

```text
src/routes/statusReadinessSummaryRoutes.ts
```

迁移 13 条稳定只读 production readiness summary route。

## 迁移路由

```text
/api/v1/production/readiness-summary
/api/v1/production/readiness-summary-v2
/api/v1/production/readiness-summary-v3
/api/v1/production/readiness-summary-v4
/api/v1/production/readiness-summary-v5
/api/v1/production/readiness-summary-v6
/api/v1/production/readiness-summary-v7
/api/v1/production/readiness-summary-v8
/api/v1/production/readiness-summary-v9
/api/v1/production/readiness-summary-v10
/api/v1/production/readiness-summary-v11
/api/v1/production/readiness-summary-v12
/api/v1/production/readiness-summary-v13
```

`post-v166-readiness-summary` 暂时没有迁移，因为它已经在 `registerJsonMarkdownReportRoute` helper 风格里，不是本轮最大重复块。

## 质量输出

```text
sourceVersion=Node v278
qualityPassState=status-routes-split-quality-pass-ready
migratedRouteCount=40
latestMigratedRouteCount=13
preservedApiPathCount=40
checkCount=13
passedCheckCount=13
```

`statusRoutes.ts` 当前约 1295 行，已经接近 1200 行目标。

## 安全边界

```text
featureBehaviorChanged=false
realResolverImplementationAllowed=false
connectsManagedAudit=false
executionAllowed=false
```

## 运行调试入口

```text
GET /api/v1/status-routes/split-quality-pass
GET /api/v1/status-routes/split-quality-pass?format=markdown
GET /api/v1/production/readiness-summary
GET /api/v1/production/readiness-summary?format=markdown
```

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route + readiness summary focused tests -> 5 files, 14 tests passed
npm test -> 215 files, 728 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=40, latestMigratedRouteCount=13, preservedApiPathCount=40, readinessIndexVersion=production-readiness-summary-index.v1, readinessV13SummaryVersion=production-readiness-summary.v13, markdown routes=200
Chrome screenshot -> d/278/图片/status-routes-readiness-summary-split-quality-pass-v278.png
```
