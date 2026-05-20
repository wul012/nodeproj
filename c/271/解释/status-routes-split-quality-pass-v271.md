# Node v271 运行调试说明：statusRoutes split quality pass

## 本版目标

v271 是计划中的质量优化分支，不新增真实 credential resolver 能力，也不改变 Java / mini-kv 对齐关系。

本版只做一件事：

```text
把 statusRoutes.ts 中 upstream fixture / production evidence intake 这一组只读 JSON/Markdown 路由移到独立 route module。
```

## 拆分内容

```text
src/routes/statusRouteTypes.ts
src/routes/statusJsonMarkdownRoute.ts
src/routes/statusUpstreamFixtureRoutes.ts
src/services/statusRoutesSplitQualityPass.ts
test/statusRoutesSplitQualityPass.test.ts
```

迁移路由数：

```text
10
```

保留路径：

```text
/api/v1/upstreams/production-evidence-intake
/api/v1/upstream-contract-fixtures
/api/v1/upstream-contract-fixtures/drift-diagnostics
/api/v1/upstream-contract-fixtures/archive-snapshot
/api/v1/upstream-contract-fixtures/scenario-matrix
/api/v1/upstream-contract-fixtures/scenario-matrix/verification
/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle
/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification
/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index
/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate
```

## 安全边界

```text
featureBehaviorChanged=false
realResolverImplementationAllowed=false
connectsManagedAudit=false
executionAllowed=false
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

## 运行调试入口

```text
GET /api/v1/status-routes/split-quality-pass
GET /api/v1/status-routes/split-quality-pass?format=markdown
GET /api/v1/upstream-contract-fixtures
GET /api/v1/upstream-contract-fixtures?format=markdown
```

## 调试结论

v271 完成了 `statusRoutes.ts` 的第一刀拆分：主文件减少约 260 行，upstream fixture 组路由进入独立模块，并通过测试证明 JSON / Markdown 路径仍可用。

下一步仍按计划：Java v112 + mini-kv v119 可继续并行回显 Node v270；Node v272 必须等两边完成后再推进。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route split + upstream fixture route tests -> 11 files, 29 tests passed
npm test -> 211 files, 712 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=10, fixtureValid=true
Chrome screenshot -> c/271/图片/status-routes-split-quality-pass-v271.png
```
