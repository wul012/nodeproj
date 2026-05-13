# 第一百一十四版代码讲解：verified identity audit binding

本版目标是把 v111 的 signed auth token contract 往真实生产认证再推进半步。

它仍然不接真实 IdP，也不让 token 直接决定请求是否放行。本版只做一件事：

```text
把本地 HMAC rehearsal token 的 verification result 写入 audit evidence。
```

这样后续接 OIDC/JWT 时，审计事件里已经有稳定位置可以记录：

```text
subject / roles / issuer / accepted-or-rejected / failure reason
```

## 本版所处项目进度

v111 已经能生成并验证本地 HMAC rehearsal token。

v113 已经有 deployment environment readiness gate，会检查 token secret、managed audit URL、retention/backup 等部署门槛。

v114 开始把 token verification 和 request audit 串起来：不是只在 profile 里证明 token 能验，而是把结果落到每一次请求的 `operatorIdentity.verifiedToken` 上。

## 审计结构扩展

文件：

```text
src/services/auditLog.ts
```

`AuditOperatorIdentityContext` 新增了可选字段：

```ts
verifiedToken?: AuditVerifiedTokenContext;
```

新增的 token audit context 是：

```ts
export interface AuditVerifiedTokenContext {
  verifiedTokenVersion: "signed-auth-token-audit-binding.v1";
  tokenFormat: "orderops-hmac-jws-rehearsal";
  issuer: string;
  requiredRole: string;
  verification: "accepted" | "rejected";
  subject?: string;
  roles: string[];
  expiresAt?: string;
  failureReason?: string;
  identityProvider: "local-hmac-rehearsal";
  productionIdentityProviderConnected: false;
}
```

这里最重要的是 `productionIdentityProviderConnected: false`。它避免把本地 token 演练误表达成生产登录已经完成。

同时 `parseAuditEvent()` 读取 JSONL 文件时会走校验：

```ts
&& isAuditVerifiedTokenContext(identity.verifiedToken);
```

这保证 file-backed audit store 重启恢复时，不会把带 verified token 的历史事件丢掉。

## 绑定服务

新增文件：

```text
src/services/verifiedIdentityAuditBinding.ts
```

核心函数是：

```ts
export function createVerifiedTokenAuditContext(input: {
  config: Pick<AppConfig, "authTokenIssuer" | "authTokenSecret">;
  authorization?: string | string[];
  requiredRole: AccessPolicyRole;
  now?: Date;
}): AuditVerifiedTokenContext {
  const result = verifyRehearsalToken({
    token: extractBearerToken(input.authorization),
    issuer: input.config.authTokenIssuer,
    secret: input.config.authTokenSecret,
    requiredRole: input.requiredRole,
    now: input.now,
  });
  return toAuditContext(input.config.authTokenIssuer, input.requiredRole, result);
}
```

它没有重新实现签名逻辑，而是复用 v111 的：

```text
verifyRehearsalToken()
```

也就是说，v114 是“把已存在的 token contract 接入 audit”，不是另造一套认证系统。

accepted token 会被转换成：

```ts
return {
  ...base,
  verification: "accepted",
  subject: result.subject,
  roles: result.roles,
  expiresAt: result.expiresAt,
};
```

rejected token 会被转换成：

```ts
return {
  ...base,
  verification: "rejected",
  roles: [],
  failureReason: result.reason,
};
```

这让成功和失败都能进入审计证据。失败原因例如：

```text
bad_signature
missing_token
expired
missing_required_role
```

## 请求链路接入

文件：

```text
src/app.ts
```

请求进入时，原来只写 access guard 和 header identity：

```ts
requestAccessGuards.set(request, toAuditAccessGuardContext(evaluation));
```

现在 operator identity 额外接收 `Authorization` header 和 config：

```ts
requestOperatorIdentities.set(request, toAuditOperatorIdentityContext(evaluation, request.headers.authorization, config));
```

真正挂到审计上下文的位置是：

```ts
if (authorization !== undefined) {
  context.verifiedToken = createVerifiedTokenAuditContext({
    config,
    authorization,
    requiredRole: evaluation.requiredRole ?? "viewer",
  });
}
```

注意这里的边界：

```text
access guard 仍然使用 header identity
token verification 只写 audit evidence
```

所以本版不会改变请求是否放行，也不会打开真实 upstream action。

同时 CORS allow headers 补了：

```ts
"authorization,content-type,idempotency-key,x-orderops-operator-id,x-orderops-roles"
```

这让未来浏览器控制台也能发送 rehearsal token。

## Profile 入口

新增 HTTP 入口：

```text
GET /api/v1/security/verified-identity-audit-binding
GET /api/v1/security/verified-identity-audit-binding?format=markdown
```

路由位置：

```text
src/routes/statusRoutes.ts
```

代码形状保持和 signed token contract 一致：

```ts
const profile = createVerifiedIdentityAuditBindingProfile(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderVerifiedIdentityAuditBindingMarkdown(profile);
}

return profile;
```

Profile 中专门区分三类 identity source：

```text
header-identity
rehearsal-token-identity
future-production-idp
```

这能讲清楚当前项目不是“已经有登录”，而是：

```text
header 仍是本地 dry-run 身份
token 是本地 HMAC verification rehearsal
真实 IdP 仍未接入
```

## 关键检查项

服务里检查：

```ts
acceptedTokenBindsSubject: accepted?.verification === "accepted" && accepted.subject === "operator-1",
acceptedTokenBindsRoles: accepted?.verification === "accepted" && accepted.roles.includes("operator"),
acceptedTokenCapturesIssuer: accepted?.issuer === config.authTokenIssuer,
rejectedTokenCapturesReason: rejected?.verification === "rejected" && rejected.failureReason === "bad_signature",
tokenSecretNotExposed: true,
futureProductionIdpStillMissing: true,
tokenDoesNotAuthorizeRequests: true,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

其中 `futureProductionIdpStillMissing` 和 `tokenDoesNotAuthorizeRequests` 是有意保守的生产边界。

生产 blocker 保留：

```text
REAL_IDP_NOT_CONNECTED
```

如果 `UPSTREAM_ACTIONS_ENABLED` 被误打开，还会出现：

```text
UPSTREAM_ACTIONS_ENABLED
```

## 测试覆盖

新增测试文件：

```text
test/verifiedIdentityAuditBinding.test.ts
```

第一组测试 profile：

```ts
expect(profile).toMatchObject({
  profileVersion: "verified-identity-audit-binding.v1",
  readyForProductionAuth: false,
  readyForProductionAudit: false,
  readOnly: true,
  executionAllowed: false,
});
```

并确认 token secret 没泄露：

```ts
expect(JSON.stringify(profile)).not.toContain("test-secret");
```

第二组测试 file-backed audit store：

```ts
const restored = new AuditLog({ capacity: 3, store: new FileBackedAuditStore(filePath, 3) });

expect(restored.list()[0]).toMatchObject({
  operatorIdentity: {
    verifiedToken: {
      verification: "accepted",
      subject: "auditor-1",
      roles: ["auditor"],
      issuer: "orderops-test",
    },
  },
});
```

这证明 `operatorIdentity.verifiedToken` 不是只存在内存里，也能从 JSONL 审计文件恢复。

第三组测试 HTTP 路由和请求审计：

```ts
const request = await app.inject({
  method: "GET",
  url: "/api/v1/security/access-policy",
  headers: {
    authorization: `Bearer ${token}`,
    "x-orderops-operator-id": "viewer-1",
    "x-orderops-roles": "viewer",
  },
});
```

随后读取 `/api/v1/audit/events?limit=5`，断言最近请求里已经出现：

```ts
operatorIdentity: {
  operatorId: "viewer-1",
  verifiedToken: {
    verification: "accepted",
    subject: "operator-1",
    roles: ["viewer"],
    issuer: "orderops-test",
  },
}
```

这就是本版最关键的闭环：token verification result 进入了真实请求审计事件。

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
63 个测试文件通过
232 条测试通过
```

运行归档：

```text
b/114/图片/verified-identity-audit-binding.png
b/114/解释/运行调试说明.md
```

## 一句话总结

v114 把 signed token 的验证结果绑定到 request audit context：成功 token 记录 subject/roles/issuer，失败 token 记录 failureReason；但它仍然只是本地 HMAC rehearsal，真实 IdP 和真实生产认证仍是后续硬门槛。
