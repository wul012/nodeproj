# Node v218 运行说明

## 1. 版本目标

Node v218 按 `docs/plans/v217-post-production-hardening-gate-roadmap.md` 推进，做一次 `audit route + managed audit helper quality pass`。

本版合并处理两个质量优化点：

```text
1. auditRoutes.ts 抽公共 JSON/Markdown route registrar
2. managed audit production-hardening readiness gate 抽 endpoint / digest / message helper
```

它不是新业务能力，不连接真实 managed audit，不启动 Java / mini-kv，不执行 Java approval / ledger / SQL / deployment / rollback，也不执行 mini-kv LOAD / COMPACT / SETNXEX / RESTORE。

## 2. 路由收口

`auditRoutes.ts` 新增：

```text
registerAuditJsonMarkdownRoute(...)
```

这个 helper 统一处理：

```text
querystring schema: format=json|markdown
Markdown response type: text/markdown; charset=utf-8
JSON/Markdown 分支
异步 profile loader
```

实际效果：

```text
auditRoutes.ts: v217 约 518 行 -> v218 约 391 行
managed audit route helper 覆盖 13 个 JSON/Markdown route
API path 不变
response shape 不变
```

## 3. Gate helper 收口

新增：

```text
src/services/managedAuditAdapterProductionHardeningReadinessGateHelpers.ts
```

它从 v217 主服务中抽出：

```text
MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_ENDPOINTS
MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_PREREQUISITES
createManagedAuditAdapterProductionHardeningGateDigest(...)
collectReadinessGateProductionBlockers(...)
collectReadinessGateWarnings(...)
collectReadinessGateRecommendations(...)
```

实际效果：

```text
managedAuditAdapterProductionHardeningReadinessGate.ts: v217 约 540 行 -> v218 约 438 行
```

主服务继续负责 profile 编排，helper 负责 digest、endpoint 和 message rules。

## 4. 新增质量报告接口

```text
GET /api/v1/audit/managed-audit-route-helper-quality-pass
GET /api/v1/audit/managed-audit-route-helper-quality-pass?format=markdown
```

关键输出：

```text
qualityPassState=verified-quality-pass
readyForManagedAuditRouteHelperQualityPass=true
readyForProductionAudit=false
connectsManagedAudit=false
executionAllowed=false
automaticUpstreamStart=false
apiPathsChanged=false
responseShapeChanged=false
javaMiniKvClientsAdded=false
managedAuditRouteRegistrationsUsingHelper=13
productionBlockers=0
```

## 5. 验证

本版最终验证覆盖：

```text
npm run typecheck：已通过
npx vitest run test/managedAuditRouteHelperQualityPass.test.ts test/managedAuditAdapterProductionHardeningReadinessGate.test.ts：7 tests 已通过
npm test：160 files / 543 tests 已通过
npm run build：已通过
Chrome screenshot：c/218/图片/managed-audit-route-helper-quality-pass-v218.png 已生成
```

HTTP smoke 重点检查：

```text
127.0.0.1:4327
qualityPassState=verified-quality-pass
readyForManagedAuditRouteHelperQualityPass=true
readyForProductionAudit=false
connectsManagedAudit=false
executionAllowed=false
apiPathsChanged=false
responseShapeChanged=false
javaMiniKvClientsAdded=false
routeHelperCount=13
productionBlockers=0
Markdown 200
v217 gate endpoint 仍然 200，gateState=ready-for-production-hardening-review
```

## 6. 清理

本版最终清理 `.tmp`、`dist`、`test-output`、`playwright-report` 和 `.playwright-cli`；HTTP smoke 启动的 Node 服务会在验证结束后停止。
