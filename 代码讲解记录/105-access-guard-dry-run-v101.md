# Node v101：access guard dry-run 代码讲解

## 1. 本版目标与系统定位

v100 已定义访问控制契约，但没有进入请求链路。v101 的目标是把这份契约接入 Fastify 全局 hook：

```text
每个请求都评估 policy
每个响应都带 dry-run evidence header
仍然不拒绝请求
```

这一步让 access-control 从“静态报告”推进到“运行时可观察证据”。

## 2. 入口路由或入口函数

核心入口在 `src/app.ts`：

```ts
app.addHook("onRequest", async (request, reply) => {
  const evaluation = evaluateAccessGuard({
    method: request.method,
    path: request.url,
    headers: request.headers,
  });

  reply
    .header("x-orderops-access-guard-mode", evaluation.mode)
    .header("x-orderops-access-policy-id", evaluation.policyId ?? "unmatched")
    .header("x-orderops-access-route-group", evaluation.routeGroup)
    .header("x-orderops-access-required-role", evaluation.requiredRole ?? "none")
    .header("x-orderops-access-matched-roles", evaluation.matchedRoles.join(","))
    .header("x-orderops-access-would-deny", String(evaluation.wouldDeny))
    .header("x-orderops-access-reason", evaluation.reason);
});
```

这段代码只写响应头，不调用 `reply.code(403)`，所以不会改变现有接口行为。

v101 还新增只读 readiness endpoint：

```text
GET /api/v1/security/access-guard-readiness
GET /api/v1/security/access-guard-readiness?format=markdown
```

## 3. 响应模型与核心字段

评估结果模型在 `src/services/accessGuard.ts`：

```ts
export interface AccessGuardEvaluation {
  guardVersion: "access-guard-dry-run.v1";
  mode: "dry-run";
  rejectsRequests: false;
  policyMatched: boolean;
  policyId?: string;
  routeGroup: string;
  requiredRole?: AccessPolicyRole;
  matchedRoles: AccessPolicyRole[];
  wouldDeny: boolean;
  reason: "missing_policy" | "missing_identity" | "missing_required_role" | "allowed_by_role";
}
```

关键字段含义：

```text
mode=dry-run
 -> 只评估，不拦截。

rejectsRequests=false
 -> 明确保证本版不拒绝请求。

wouldDeny=true
 -> 如果未来开启 enforcement，这个请求会被拒绝。

reason
 -> 说明是缺 policy、缺身份、缺角色，还是角色满足。
```

## 4. 服务层核心逻辑

`evaluateAccessGuard()` 复用 v100 的 policy map：

```ts
const policies = input.policies ?? createAccessRoutePolicies();
const policy = policies.find((candidate) =>
  candidate.methods.includes(normalizedMethod) && candidate.pathPatterns.some((pattern) => pathMatches(pattern, normalizedPath)));
```

这样 v100 和 v101 不会出现两套规则。

请求身份来自 dry-run header：

```ts
const operatorId = readHeader(headers, "x-orderops-operator-id");
const roles = parseRoles(readHeader(headers, "x-orderops-roles"));
```

这里要特别注意：这些 header 不是可信认证，只是为了本地 dry-run 验证未来的身份模型。真正生产化必须换成认证中间件。

角色判断逻辑：

```ts
function hasRequiredRole(roles: AccessPolicyRole[], requiredRole: AccessPolicyRole): boolean {
  return roles.some((role) => ROLE_GRANTS[role].includes(requiredRole));
}
```

`ROLE_GRANTS` 是显式授权矩阵：`auditor` 只能覆盖 viewer/auditor，不会误获得 operator 权限；`approver` 可以覆盖 operator；`admin` 覆盖全部。

## 5. 阻断、预警与安全边界

readiness profile 仍然保留 blocker：

```ts
addMessage(blockers, false, "ACCESS_GUARD_DRY_RUN_ONLY", "Access guard evaluates requests but does not enforce denial yet.");
```

这不是 bug，而是本版的边界：access guard 已经运行，但还不是生产 enforcement。

本版不做：

```text
不真正 reject
不写登录逻辑
不读取 secret
不把 x-orderops-* header 当作可信身份
不改变 operation intent / approval / audit 现有行为
```

## 6. 测试覆盖

测试文件是 `test/accessGuard.test.ts`。

第一组测试验证纯函数评估：

```ts
expect(anonymous).toMatchObject({
  policyId: "readiness-and-status",
  routeGroup: "readiness",
  requiredRole: "viewer",
  matchedRoles: [],
  wouldDeny: true,
  reason: "missing_identity",
});
```

第二组测试验证 protected route 覆盖：

```ts
expect(profile).toMatchObject({
  checks: {
    dryRunGuardEnabled: true,
    noRequestRejection: true,
    auditRoutesCovered: true,
    intentMutationRoutesCovered: true,
    approvalRoutesCovered: true,
    archiveRoutesCovered: true,
    upstreamProxyActionsCovered: true,
  },
});
```

第三组测试验证真实 Fastify response header：

```ts
expect(anonymousAudit.headers["x-orderops-access-route-group"]).toBe("audit");
expect(anonymousAudit.headers["x-orderops-access-required-role"]).toBe("auditor");
expect(anonymousAudit.headers["x-orderops-access-would-deny"]).toBe("true");
```

这个测试保证 v101 的 guard 真的进入请求链路，而不是只停留在 service 单测。

## 7. 一句话总结

v101 把访问控制推进到运行时 dry-run：每个请求都能留下 wouldDeny 证据，但系统仍不拒绝请求，为后续把 guard context 写进 audit store 做准备。
