# Node v279 运行调试说明：statusRoutes rollback split quality pass

## 本版目标

v279 继续 v276-v278 的质量主线，只做 `statusRoutes.ts` 拆分，不新增业务能力，不接入 Java / mini-kv，不打开真实 resolver。

本版新增：

```text
src/routes/statusRollbackRoutes.ts
```

迁移 4 条稳定只读 rollback readiness route。

## 迁移路由

```text
/api/v1/production/release-rollback-readiness-runbook
/api/v1/production/rollback-window-readiness-checklist
/api/v1/production/rollback-execution-preflight-contract
/api/v1/deployment/rollback-runbook
```

这些接口仍然只是 runbook / checklist / preflight contract，不执行 rollback，不写 Java，不启动 mini-kv。

## 质量输出

```text
sourceVersion=Node v279
qualityPassState=status-routes-split-quality-pass-ready
migratedRouteCount=44
latestMigratedRouteCount=4
preservedApiPathCount=44
checkCount=14
passedCheckCount=14
```

`statusRoutes.ts` 当前约 1245 行，已经接近 1200 行目标。

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
GET /api/v1/production/rollback-window-readiness-checklist
GET /api/v1/production/rollback-window-readiness-checklist?format=markdown
```

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route + rollback focused tests -> 5 files, 14 tests passed
npm test -> first full run: 212 files passed, 3 live-probe route tests timed out at 60s under full parallel load; targeted rerun for those 3 files -> 3 files, 9 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=44, latestMigratedRouteCount=4, preservedApiPathCount=44, rollbackProfileVersion=rollback-window-readiness-checklist.v1, deploymentRollbackRunbookVersion=rollback-evidence-runbook.v1, markdown routes=200
Chrome screenshot -> d/279/图片/status-routes-rollback-split-quality-pass-v279.png
```
