# 第一百零八版代码讲解：auth enforcement rehearsal

本版目标是把前面已经存在的 operator identity contract 和 access guard dry-run，接到一个可切换的拦截演练层。

它不是正式登录系统，不接 JWT、OAuth、Session 或外部 IdP，也不会默认拒绝本地请求。它的角色是让 Node 控制面第一次具备可测试的访问拒绝路径：

```text
缺少身份 -> 401
角色不足 -> 403
角色满足 -> 200
```

## 本版所处项目进度

v104 已经能把 access guard 判断写入 audit event。

v105 已经定义了 `x-orderops-operator-id` 和 `x-orderops-roles` 的 operator identity contract。

v107 已经把这些证据汇总进 production readiness summary v4，但仍然指出真实 auth / RBAC enforcement 缺失。

v108 补的是中间一步：先做 rehearsal enforcement。也就是说，系统可以在测试或本地演练中打开拒绝请求，但默认运行仍然保持 observe-only。

## 配置入口

本版在配置里新增两个字段：

```ts
orderopsAuthMode: "disabled" | "rehearsal";
accessGuardEnforcementEnabled: boolean;
```

文件位置：

```text
src/config.ts
```

读取逻辑是：

```ts
function readAuthMode(env: NodeJS.ProcessEnv): AppConfig["orderopsAuthMode"] {
  const raw = env.ORDEROPS_AUTH_MODE?.trim().toLowerCase();
  return raw === "disabled" || raw === "rehearsal" ? raw : "rehearsal";
}
```

默认值是：

```text
ORDEROPS_AUTH_MODE=rehearsal
ACCESS_GUARD_ENFORCEMENT_ENABLED=false
```

这表示系统默认会计算 access guard 结果，但不会拒绝请求。

## Middleware 拦截点

核心拦截逻辑在 `src/app.ts`：

```ts
const evaluation = evaluateAccessGuard({
  method: request.method,
  path: request.url,
  headers: request.headers,
});
requestAccessGuards.set(request, toAuditAccessGuardContext(evaluation));
requestOperatorIdentities.set(request, toAuditOperatorIdentityContext(evaluation));
```

这段先复用已有 `evaluateAccessGuard`，并且在拒绝请求之前就把 access guard 和 operator identity 放进 WeakMap，保证后续 `onResponse` 仍能写入 audit event。

响应头也会带出当前模式：

```ts
reply
  .header("x-orderops-auth-mode", config.orderopsAuthMode)
  .header("x-orderops-access-enforcement", String(authEnforcementActive(config)));
```

真正的拒绝条件是：

```ts
if (request.method === "OPTIONS" || !authEnforcementActive(config) || !evaluation.wouldDeny) {
  return;
}

const statusCode = evaluation.reason === "missing_identity" ? 401 : 403;
return reply.code(statusCode).send({
  error: statusCode === 401 ? "ACCESS_GUARD_UNAUTHENTICATED" : "ACCESS_GUARD_FORBIDDEN",
  message: statusCode === 401
    ? "Operator identity is required by access guard rehearsal enforcement."
    : "Operator identity does not have the required role for this route.",
  details: {
    authMode: config.orderopsAuthMode,
    enforcement: "rehearsal",
    policyId: evaluation.policyId ?? "unmatched",
    routeGroup: evaluation.routeGroup,
    requiredRole: evaluation.requiredRole ?? "none",
    matchedRoles: evaluation.matchedRoles,
    reason: evaluation.reason,
  },
});
```

这段逻辑有三个边界：

```text
OPTIONS 不拦截，避免破坏 CORS preflight
默认 enforcement=false 不拦截
只有 evaluation.wouldDeny=true 才拦截
```

因此 v108 是可切换演练，不是默认强制上线。

## Rehearsal Profile

本版新增服务：

```text
src/services/authEnforcementRehearsal.ts
```

入口函数是：

```ts
export function createAuthEnforcementRehearsalProfile(
  config: Pick<AppConfig, "orderopsAuthMode" | "accessGuardEnforcementEnabled" | "upstreamActionsEnabled">,
): AuthEnforcementRehearsalProfile {
  const rejectsRequests = authEnforcementActive(config);
  const samples = createSamples(rejectsRequests);
```

它生成三个样本：

```text
missing-identity
insufficient-role
allowed-auditor
```

每个样本都会先跑 `evaluateAccessGuard`，再计算 enforcement 下的状态码：

```ts
function enforcementStatusCode(evaluation: AccessGuardEvaluation, enforcementEnabled: boolean): 200 | 401 | 403 {
  if (!enforcementEnabled || !evaluation.wouldDeny) {
    return 200;
  }
  return evaluation.reason === "missing_identity" ? 401 : 403;
}
```

这让 profile 可以同时描述两种状态：

```text
默认 observe-only：三个样本都是 200
显式 enforcement：缺身份 401，角色不足 403，角色满足 200
```

## HTTP 入口

新增路由：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/auth-enforcement-rehearsal", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["json", "markdown"] },
      },
      additionalProperties: false,
    },
  },
}, async (request, reply) => {
  const profile = createAuthEnforcementRehearsalProfile(deps.config);

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderAuthEnforcementRehearsalMarkdown(profile);
  }

  return profile;
});
```

文件位置：

```text
src/routes/statusRoutes.ts
```

这个接口仍然是只读 evidence endpoint，用来让人和自动化都能看到当前 auth/enforcement 配置是否在演练状态。

## 生产阻塞项

即使打开 enforcement，profile 也不会宣称生产认证完成：

```ts
readyForProductionAuth: false,
readOnly: true,
executionAllowed: false,
```

核心 blocker 是：

```ts
{
  code: "REAL_CREDENTIAL_AUTH_MISSING",
  severity: "blocker",
  message: "Rehearsal enforcement still trusts headers and does not validate signed credentials.",
}
```

这句话把 v108 的边界说清楚：能演练拒绝请求，不等于能暴露到生产网络。

## 测试覆盖

新增测试文件：

```text
test/authEnforcementRehearsal.test.ts
```

默认模式测试：

```ts
expect(response.statusCode).toBe(200);
expect(response.headers["x-orderops-access-would-deny"]).toBe("true");
expect(response.headers["x-orderops-access-enforcement"]).toBe("false");
```

这验证缺少身份时仍然只记录 would-deny，不拒绝请求。

显式 enforcement 测试：

```ts
expect(missingIdentity.statusCode).toBe(401);
expect(insufficientRole.statusCode).toBe(403);
expect(allowed.statusCode).toBe(200);
```

profile 样本测试：

```ts
expect(profile.samples.map((sample) => [sample.id, sample.enforcement.statusCode])).toEqual([
  ["missing-identity", 401],
  ["insufficient-role", 403],
  ["allowed-auditor", 200],
]);
```

这三组测试分别保证默认安全、显式拦截和文档化 evidence 都稳定。

## 运行调试与归档

本版运行了：

```text
npm run typecheck
npm test
npm run build
HTTP smoke
本机 Chrome 截图
```

结果：

```text
57 个测试文件通过
214 条测试通过
```

运行归档：

```text
b/108/图片/auth-enforcement-rehearsal.png
b/108/解释/运行调试说明.md
```

## 一句话总结

v108 让 Node 控制面具备了可切换的 auth enforcement rehearsal：默认仍只观察和审计，显式打开时可以验证 401、403、200，但真实 signed auth 和生产级 RBAC 仍然是后续硬门槛。
