# Node v277 运行调试说明：statusRoutes deployment split quality pass

## 本版目标

v277 继续 v276 的质量主线，仍然只做 `statusRoutes.ts` 拆分，不新增业务能力，不接入 Java / mini-kv，不打开真实 resolver。

本版新增：

```text
src/routes/statusDeploymentRoutes.ts
```

迁移 7 条稳定只读 deployment / connection readiness route。

## 迁移路由

```text
/api/v1/deployment/safety-profile
/api/v1/deployment/environment-readiness
/api/v1/production/connection-config-contract
/api/v1/production/connection-failure-mode-rehearsal
/api/v1/production/connection-implementation-precheck
/api/v1/production/connection-dry-run-change-request
/api/v1/production/connection-archive-verification
```

`connection-dry-run-approvals` 暂时没有迁移，因为它包含 ledger snapshot、latest/id 查询和 POST 写入接口，适合后续单独处理。

## 质量输出

```text
sourceVersion=Node v277
qualityPassState=status-routes-split-quality-pass-ready
migratedRouteCount=27
latestMigratedRouteCount=7
preservedApiPathCount=27
checkCount=12
passedCheckCount=12
```

`statusRoutes.ts` 当前约 1619 行，仍高于 1200 行目标，但已经从 v275 前的约 2002 行连续降下来。

## 是否还需要继续拆

需要，但不建议在本版继续贪多。

合理下一步是继续拆一组边界清楚的 route，例如：

```text
rollback runbook
production readiness summary
live-probe real-read smoke
```

其中 `production readiness summary` 仍是最大收益候选。

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
```

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route + deployment/connection focused tests -> 9 files, 26 tests passed
npm test -> 215 files, 728 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=27, latestMigratedRouteCount=7, preservedApiPathCount=27, deploymentProfileVersion=deployment-safety-profile.v1, connectionProfileVersion=production-connection-config-contract.v1, markdown routes=200
Chrome screenshot -> d/277/图片/status-routes-deployment-split-quality-pass-v277.png
```
