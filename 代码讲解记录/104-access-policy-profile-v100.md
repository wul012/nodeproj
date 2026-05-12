# Node v100：access policy profile 代码讲解

## 1. 本版目标与系统定位

v100 承接 v99 的结论：

```text
access-control: ready=false
```

本版不直接做登录系统，而是先定义访问控制契约：

```text
route policy map
request identity contract
minimum role
mutation / upstream touch 边界
```

这让后续 v101 可以基于同一份 policy map 做 dry-run guard。

## 2. 入口路由或入口函数

入口在 `src/routes/statusRoutes.ts`：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/access-policy", {
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
  const profile = createAccessPolicyProfile(deps.config);

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderAccessPolicyProfileMarkdown(profile);
  }

  return profile;
});
```

这个路由只有 `GET`，只允许 `format=json|markdown`。它没有 body，不接收 secret，也不会拦截任何业务请求。

## 3. 响应模型与核心字段

核心模型在 `src/services/accessPolicyProfile.ts`：

```ts
export interface AccessPolicyProfile {
  profileVersion: "access-policy-profile.v1";
  readyForEnforcement: false;
  readOnly: true;
  executionAllowed: false;
  enforcement: {
    mode: "contract-only";
    rejectsRequests: false;
    requiresLogin: false;
    readsSecrets: false;
    upstreamActionsEnabled: boolean;
  };
}
```

这些字段的含义：

```text
readyForEnforcement=false
 -> policy 已定义，但还没有真正拦截请求。

mode=contract-only
 -> 当前只是契约版本，供后续 dry-run guard 使用。

rejectsRequests=false
 -> 本版不改变现有接口行为，避免一次性引入登录破坏测试。

executionAllowed=false
 -> 访问策略 profile 本身不授权上游执行。
```

请求身份契约定义为：

```ts
fields: [
  { name: "authenticated", type: "boolean", requiredForMutation: true },
  { name: "operatorId", type: "string", requiredForMutation: true },
  { name: "roles", type: "string[]", requiredForMutation: true },
  { name: "authSource", type: "string", requiredForMutation: true },
]
```

这说明未来只要是 mutation，都不能再只靠 body 里的 `operatorId`，而要由认证中间件附加可信身份。

## 4. 服务层核心逻辑

`createAccessPolicyProfile()` 先生成 route policy map：

```ts
const routePolicies = createRoutePolicies();
```

其中 `audit-read` 规定审计读取需要 auditor：

```ts
{
  id: "audit-read",
  routeGroup: "audit",
  methods: ["GET"],
  pathPatterns: ["/api/v1/audit/events", "/api/v1/audit/summary", "/api/v1/audit/store-*"],
  minimumRole: "auditor",
  mutatesLocalState: false,
  touchesUpstream: false,
}
```

`operation-intent-mutations` 规定本地操作意图写入需要 operator：

```ts
{
  id: "operation-intent-mutations",
  routeGroup: "intent",
  methods: ["POST", "PUT", "DELETE"],
  pathPatterns: ["/api/v1/operation-intents", "/api/v1/operation-intents/:intentId/confirm"],
  minimumRole: "operator",
  mutatesLocalState: true,
  touchesUpstream: false,
}
```

`upstream-proxy-actions` 是最高风险组：

```ts
{
  id: "upstream-proxy-actions",
  routeGroup: "upstream-proxy",
  methods: ["POST", "PUT", "DELETE"],
  pathPatterns: ["/api/v1/order-platform/*", "/api/v1/mini-kv/*"],
  minimumRole: "admin",
  mutatesLocalState: false,
  touchesUpstream: true,
}
```

这里把 `touchesUpstream=true` 明确标出来，是为了后续 guard 和 production readiness 能区分“本地 ledger 写入”和“真实上游动作”。

## 5. 阻断、预警与安全边界

本版仍然保留生产阻断：

```ts
addMessage(blockers, checks.enforcementStillDisabled === false, "ACCESS_GUARD_NOT_ENFORCED", ...);
```

因为 v100 只定义 policy，不执行 policy，所以 `ACCESS_GUARD_NOT_ENFORCED` 是预期阻断。

同时如果有人把上游动作打开，也会被标为 blocker：

```ts
addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", ...);
```

本版不做：

```text
不读取 JWT secret
不验证 session
不拒绝请求
不写审计 operator identity
不启用真实上游动作
```

## 6. 测试覆盖

测试在 `test/accessPolicyProfile.test.ts`。

第一个测试确认契约完整：

```ts
expect(profile).toMatchObject({
  profileVersion: "access-policy-profile.v1",
  readyForEnforcement: false,
  readOnly: true,
  executionAllowed: false,
  checks: {
    identityContractDefined: true,
    routePolicyMapDefined: true,
    auditRoutesRequireAuditor: true,
    mutationRoutesRequireOperatorOrApprover: true,
  },
});
```

第二个测试确认上游动作不能误开：

```ts
expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
  "ACCESS_GUARD_NOT_ENFORCED",
  "UPSTREAM_ACTIONS_ENABLED",
]));
```

第三个测试确认 JSON / Markdown 路由可归档：

```ts
GET /api/v1/security/access-policy
GET /api/v1/security/access-policy?format=markdown
```

## 7. 一句话总结

v100 没有急着做登录，而是先把访问控制的 route policy 和 request identity contract 固化成可测试证据，为 v101 的 dry-run guard 提供稳定输入。
