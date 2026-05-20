# Node v280 运行调试说明：statusRoutes live-probe split quality pass

## 本版目标

v280 继续 v276-v279 的 `statusRoutes.ts` 质量拆分主线，只做 route 组织优化，不新增业务能力，不接入 Java / mini-kv，不打开真实 resolver。

本版新增：

```text
src/routes/statusLiveProbeRoutes.ts
```

迁移 23 条稳定只读 live-probe / real-read smoke JSON/Markdown route。

## 迁移路由

```text
/api/v1/production/live-probe-readiness-contract
/api/v1/production/live-probe-smoke-harness
/api/v1/production/live-probe-evidence-archive
/api/v1/production/live-probe-evidence-archive/verification
/api/v1/production/live-probe-evidence-archive/bundle
/api/v1/production/live-probe-handoff-checklist
/api/v1/production/live-probe-real-read-smoke-readiness-switch
...
/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review
```

这些接口仍然只输出 readiness、harness、archive、runbook、capture review 等证据，不启动 Java，不启动 mini-kv，不发真实写请求。

## 质量输出

```text
sourceVersion=Node v280
qualityPassState=status-routes-split-quality-pass-ready
migratedRouteCount=67
latestMigratedRouteCount=23
preservedApiPathCount=67
checkCount=15
passedCheckCount=15
```

`statusRoutes.ts` 从约 1245 行降到约 896 行，已经明显低于原来的 1200 行目标。

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
GET /api/v1/production/live-probe-readiness-contract
GET /api/v1/production/live-probe-readiness-contract?format=markdown
GET /api/v1/production/live-probe-real-read-smoke-readiness-switch
GET /api/v1/production/live-probe-real-read-smoke-readiness-switch?format=markdown
```

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
