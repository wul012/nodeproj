# 第一百零五版代码讲解：operator identity contract

本版目标是把 header-derived operator identity 固化成可测试、可审计的生产雏形契约。

它不是 JWT 登录，不会读取 secret，不会信任浏览器随便传来的 header 作为生产身份，也不会拒绝请求。它的角色是把 `x-orderops-operator-id` 和 `x-orderops-roles` 的解析规则稳定下来，并把解析结果写入 audit event，承接 v104 的 access guard audit context。

## 项目进度说明

v105 处在“生产雏形阶段”的 access-control 收敛线上。

v104 完成后，项目已经做到：

```text
请求会被 access guard dry-run 评估
评估结果进入 audit event 的 accessGuard 字段
```

但 v104 还没有把“是谁发起请求”作为独立契约沉淀下来。v105 补的就是这一层：

```text
v104: accessGuard 说明这个请求会不会被未来的权限系统拒绝
v105: operatorIdentity 说明当前请求携带了什么操作员身份雏形
```

完成 v105 后，项目进度变化是：

```text
访问控制证据 = accessGuard + operatorIdentity
```

这让后续审批、审计、execution gate 都能复用同一套身份形状。不过它仍然不是生产认证，因为当前身份来自 header，缺少签名、会话、JWT、权限中心或服务端登录态。

当前仍未完成的生产级阻塞项：

```text
真实 auth middleware
RBAC enforcement
operator identity 绑定审批请求和审批决定
audit store 的生产级持久化、留存和访问控制
```

合理承接版本是：

```text
v106: file audit restart evidence report
v107: production readiness summary v4
```

## 入口路由

本版新增只读入口：

```text
src/routes/statusRoutes.ts
```

路由代码是：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/operator-identity-contract", {
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
  const profile = createOperatorIdentityContractProfile();

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderOperatorIdentityContractMarkdown(profile);
  }

  return profile;
});
```

它只接收 `format=json|markdown`，不接收请求体，不创建用户，不校验密码，不读取 token。

## 身份解析规则

身份解析在：

```text
src/services/accessGuard.ts
```

核心函数是：

```ts
export function extractRequestIdentityFromHeaders(headers: IncomingHttpHeaders): RequestIdentity {
  const operatorId = readHeader(headers, "x-orderops-operator-id");
  const parsedRoles = parseOperatorRoles(readHeader(headers, "x-orderops-roles"));

  return {
    authenticated: operatorId !== undefined && parsedRoles.roles.length > 0,
    operatorId,
    roles: parsedRoles.roles,
    authSource: operatorId === undefined && parsedRoles.rawRoles.length === 0 ? "none" : "headers",
    rawRoles: parsedRoles.rawRoles,
    rejectedRoles: parsedRoles.rejectedRoles,
  };
}
```

这里有一个刻意的边界：

```text
authenticated=true 只表示 header 契约完整
不表示生产认证可信
```

如果只有 roles 没有 operatorId，`authenticated=false`。如果 roles 里有非法值，会进入 `rejectedRoles`，而不是悄悄吞掉。

## 角色解析规则

角色解析函数是：

```ts
export function parseOperatorRoles(value: string | undefined): {
  roles: AccessPolicyRole[];
  rawRoles: string[];
  rejectedRoles: string[];
} {
  if (value === undefined) {
    return {
      roles: [],
      rawRoles: [],
      rejectedRoles: [],
    };
  }

  const unique = new Set<AccessPolicyRole>();
  const rawRoles: string[] = [];
  const rejectedRoles: string[] = [];
  for (const role of value.split(",").map((item) => item.trim().toLowerCase())) {
    if (role.length === 0) {
      continue;
    }

    rawRoles.push(role);
    if (isAccessPolicyRole(role)) {
      unique.add(role);
    } else {
      rejectedRoles.push(role);
    }
  }
  return {
    roles: [...unique],
    rawRoles,
    rejectedRoles,
  };
}
```

控制面语义是：

```text
roles: 真正参与 dry-run guard 的合法角色
rawRoles: 请求原始携带的角色
rejectedRoles: 被过滤的非法角色
```

这方便后续审计判断：请求是否试图携带 `root`、`superuser` 这类不受支持的角色。

## 审计事件写入

审计模型新增：

```ts
export interface AuditOperatorIdentityContext {
  identityVersion: "operator-identity-contract.v1";
  authenticated: boolean;
  operatorId?: string;
  roles: string[];
  authSource: "none" | "headers";
  rawRoles: string[];
  rejectedRoles: string[];
}
```

文件位置：

```text
src/services/auditLog.ts
```

`src/app.ts` 在请求完成时写入：

```ts
auditLog.record({
  requestId: request.id,
  method: request.method,
  path: request.url,
  accessGuard: requestAccessGuards.get(request),
  operatorIdentity: requestOperatorIdentities.get(request),
  statusCode: reply.statusCode,
  durationMs: startedAt === undefined ? 0 : performance.now() - startedAt,
});
```

这样一条 audit event 同时拥有：

```text
accessGuard: 权限预演判断
operatorIdentity: 操作员身份雏形
```

## profile 响应模型

新增 profile 在：

```text
src/services/operatorIdentityContract.ts
```

关键字段：

```ts
profileVersion: "operator-identity-contract.v1",
readyForProductionAuth: false,
readOnly: true,
executionAllowed: false,
currentRuntime: {
  source: "headers",
  rejectsRequests: false,
  readsSecrets: false,
  writesAuditContext: true,
  productionReplacement: "auth-middleware",
}
```

这说明当前 runtime 是“生产认证的替身契约”，不是生产认证本身。

## 阻断与安全边界

本版明确保留两个生产阻断：

```ts
{
  code: "AUTH_MIDDLEWARE_MISSING",
  severity: "blocker",
  message: "Header-derived identity is not trusted production authentication.",
},
{
  code: "IDENTITY_NOT_ENFORCED",
  severity: "blocker",
  message: "Operator identity is written to audit context but requests are not rejected by identity yet.",
}
```

这两个 blocker 防止后续误判：有 `operatorIdentity` 不等于能上线。

## 测试覆盖

测试文件：

```text
test/accessGuard.test.ts
test/operatorIdentityContract.test.ts
```

身份解析测试覆盖：

```ts
expect(extractRequestIdentityFromHeaders({
  "x-orderops-operator-id": "operator-1",
  "x-orderops-roles": "viewer,root,operator,viewer",
})).toMatchObject({
  authenticated: true,
  operatorId: "operator-1",
  roles: ["viewer", "operator"],
  authSource: "headers",
  rawRoles: ["viewer", "root", "operator", "viewer"],
  rejectedRoles: ["root"],
});
```

路由和审计测试覆盖：

```ts
expect(events.json().events[0]).toMatchObject({
  path: "/api/v1/security/access-policy",
  operatorIdentity: {
    identityVersion: "operator-identity-contract.v1",
    authenticated: true,
    operatorId: "operator-1",
    roles: ["viewer", "operator"],
    authSource: "headers",
    rawRoles: ["viewer", "root", "operator"],
    rejectedRoles: ["root"],
  },
});
```

这些断言保证 operator identity 不只是出现在 profile 里，而是真的进入 audit event。

## 一句话总结

v105 把 header-derived operator identity 固化为可测试、可审计的生产雏形契约，让 access guard 的权限预演终于能和操作员身份证据放在同一条 audit event 里。
