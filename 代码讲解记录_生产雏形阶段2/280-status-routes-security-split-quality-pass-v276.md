# 280. Node v276 statusRoutes security split quality pass

## 本版所处项目进度

v276 是 v275 后的质量优化版。当前计划明确要求：

```text
Node v276：statusRoutes split quality pass 第二步
只迁移稳定只读路由
保持 API path / response shape 不变
不与 credential resolver 业务闭环混成一版
```

因此这版不碰 Java / mini-kv，也不打开真实 resolver，只继续拆 `src/routes/statusRoutes.ts`。

## 新增路由模块

文件：

```text
src/routes/statusSecurityRoutes.ts
```

入口：

```ts
export function registerStatusSecurityRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
```

这里复用的是 v271 已经抽出的 helper：

```ts
import {
  registerStatusJsonMarkdownRoutes,
  statusJsonMarkdownRoute,
} from "./statusJsonMarkdownRoute.js";
```

所以 v276 没有再复制 `schema/querystring/format=markdown` 的手写样板。

## 迁移的 10 条 security route

新模块中每条 route 都保持原 path：

```ts
statusJsonMarkdownRoute(
  "/api/v1/security/access-control-readiness",
  () => createAccessControlReadinessProfile(deps.config),
  renderAccessControlReadinessProfileMarkdown,
),
statusJsonMarkdownRoute(
  "/api/v1/security/access-policy",
  () => createAccessPolicyProfile(deps.config),
  renderAccessPolicyProfileMarkdown,
),
statusJsonMarkdownRoute(
  "/api/v1/security/access-guard-readiness",
  () => createAccessGuardReadinessProfile(),
  renderAccessGuardReadinessProfileMarkdown,
),
```

同一组还包括：

```text
/api/v1/security/auth-enforcement-rehearsal
/api/v1/security/operator-identity-contract
/api/v1/security/signed-auth-token-contract
/api/v1/security/verified-identity-audit-binding
/api/v1/security/idp-verifier-boundary
/api/v1/security/jwks-verifier-fixture-rehearsal
/api/v1/security/jwks-cache-contract
```

## statusRoutes.ts 的变化

文件：

```text
src/routes/statusRoutes.ts
```

现在只保留一行注册：

```ts
registerStatusSecurityRoutes(app, deps);
```

对应 import：

```ts
import { registerStatusSecurityRoutes } from "./statusSecurityRoutes.js";
```

这把 10 条手写 route 的重复 schema、markdown 分支、profile 创建逻辑从 `statusRoutes.ts` 拿掉，让主路由文件从约 2002 行降到约 1784 行。

它仍然偏大，距离 `managedAuditSandboxCodeHealthPass` 里记录的 1200 行目标还有差距；但 v276 的拆分粒度已经合适。继续拆可以做，但应放到后续版本按 domain 继续推进，例如 `deployment` 或 `production readiness summary` 路由组，而不是在同一版把多个大域混在一起。

## 质量 profile 更新

文件：

```text
src/services/statusRoutesSplitQualityPass.ts
```

v276 把 `sourceVersion` 更新成：

```ts
sourceVersion: "Node v276",
```

并记录最新迁移模块：

```ts
latestExtractedRouteModule: "src/routes/statusSecurityRoutes.ts",
latestMigratedRouteCount: 10,
migratedRouteCount: 20,
migratedRouteGroup: "upstream fixture, production evidence intake, and security readiness",
```

这里的 20 条是：

```text
v271：upstream fixture / production evidence intake 10 条
v276：security readiness 10 条
```

v276 还修正了 access policy 覆盖：

```ts
pathPatterns: [
  "/health",
  "/api/v1/runtime/config",
  "/api/v1/ci/*",
  "/api/v1/production/*",
  "/api/v1/security/*",
  "/api/v1/deployment/*",
  "/api/v1/status-routes/*",
],
```

这个修复来自 HTTP smoke：开启 `ACCESS_GUARD_ENFORCEMENT_ENABLED=true` 后，`/api/v1/status-routes/split-quality-pass` 原先没有匹配 policy，会返回 `ACCESS_GUARD_FORBIDDEN`。补上 `/api/v1/status-routes/*` 后，质量报告可以在真实 enforcement smoke 下读取。

## 安全边界

quality profile 继续锁住：

```ts
readOnlyQualityPass: true,
featureBehaviorChanged: false,
realResolverImplementationAllowed: false,
connectsManagedAudit: false,
executionAllowed: false,
```

这意味着 v276 是结构优化，不改变生产行为。

## 测试覆盖

文件：

```text
test/statusRoutesSplitQualityPass.test.ts
```

第一组测试确认 v276 的 profile 内容：

```ts
sourceVersion: "Node v276",
latestExtractedRouteModule: "src/routes/statusSecurityRoutes.ts",
migratedRouteCount: 20,
latestMigratedRouteCount: 10,
securityRoutesExtracted: true,
```

第二组测试确认真实路由仍然可用：

```ts
const securityJson = await app.inject({
  method: "GET",
  url: "/api/v1/security/jwks-cache-contract",
});
const securityMarkdown = await app.inject({
  method: "GET",
  url: "/api/v1/security/jwks-cache-contract?format=markdown",
});
```

并断言：

```ts
expect(securityJson.json()).toMatchObject({
  service: "orderops-node",
  profileVersion: "jwks-cache-contract.v1",
});
expect(securityMarkdown.body).toContain("# JWKS cache contract");
```

这说明迁移后 JSON 和 Markdown 行为保持一致。

## 一句话总结

Node v276 把 `statusRoutes.ts` 里 10 条 security readiness 路由迁到 `statusSecurityRoutes.ts`，继续复用统一 JSON/Markdown route helper，保持 API path 和响应形状不变；这是一次降低路由文件膨胀风险的 Strangler 第二步，不新增真实 resolver、managed audit connection 或执行能力。

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

## 清理记录

HTTP smoke 启动的 Node 服务 PID 3256 已停止。本版验证产生的 `.tmp` 和 `dist` 会在提交前删除。
