# Node v276 运行调试说明：statusRoutes security split quality pass

## 本版目标

v276 是质量优化版，不新增业务能力，不接入 Java / mini-kv，不打开真实 resolver。

本版继续拆 `src/routes/statusRoutes.ts`：

```text
新增：src/routes/statusSecurityRoutes.ts
迁移：10 条 /api/v1/security/* 只读 JSON/Markdown 路由
保留：API path、querystring format、JSON response shape、Markdown response shape
```

## 迁移路由

```text
/api/v1/security/access-control-readiness
/api/v1/security/access-policy
/api/v1/security/access-guard-readiness
/api/v1/security/auth-enforcement-rehearsal
/api/v1/security/operator-identity-contract
/api/v1/security/signed-auth-token-contract
/api/v1/security/verified-identity-audit-binding
/api/v1/security/idp-verifier-boundary
/api/v1/security/jwks-verifier-fixture-rehearsal
/api/v1/security/jwks-cache-contract
```

## 质量输出

```text
sourceVersion=Node v276
qualityPassState=status-routes-split-quality-pass-ready
migratedRouteCount=20
latestMigratedRouteCount=10
preservedApiPathCount=20
checkCount=11
passedCheckCount=11
```

其中 20 条包括 v271 已迁移的 upstream fixture / production evidence intake 10 条，以及 v276 迁移的 security readiness 10 条。

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

## 调试结论

v276 把 `statusRoutes.ts` 从约 2002 行降到约 1784 行，迁出安全/身份 readiness 路由组，继续沿用 `statusJsonMarkdownRoute` 注册模式。它是一次纯结构优化，目标是降低后续真实生产化版本继续堆进大路由文件的风险。

`statusRoutes.ts` 仍然偏大，距离 1200 行目标还有差距；但本版已经形成一个合适的小闭环。后续更适合继续按 domain 拆 `deployment` 或 `production readiness summary` 路由，而不是在 v276 里连续拆多组。

本轮 HTTP smoke 还发现 `/api/v1/status-routes/*` 没有被 access policy 覆盖，开启 access guard enforcement 后会被 403。v276 已把该路径加入 readiness policy，确保质量报告在真实 smoke 环境下可读。

## 验证记录

```text
npm run typecheck -> passed
npx vitest run status route + security focused tests -> 11 files, 32 tests passed
npx vitest run managedAuditSandboxCodeHealthPass + statusRoutesSplitQualityPass -> 2 files, 5 tests passed
npx vitest run access policy + status route focused tests -> 4 files, 11 tests passed
npm test -> 215 files, 728 tests passed
npm run build -> passed
Node HTTP smoke -> health=ok, qualityPassState=status-routes-split-quality-pass-ready, migratedRouteCount=20, latestMigratedRouteCount=10, preservedApiPathCount=20, securityProfileVersion=jwks-cache-contract.v1, qualityMarkdownStatus=200, securityMarkdownStatus=200
Chrome screenshot -> d/276/图片/status-routes-security-split-quality-pass-v276.png
```
