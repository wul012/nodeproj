# 第一百一十一版代码讲解：signed auth token contract rehearsal

本版目标是在不接真实 IdP 的前提下，把“生产级认证应该长什么样”先固化成一个可测试的 token contract。

它不是正式 OAuth / OIDC / JWT 接入，不会暴露生产密钥，也不会启用 Java replay。它的角色是让 Node 控制面具备一组可复查的 signed token 证据：

```text
缺少 token -> 401
签名错误 -> 401
token 过期 -> 401
角色不足 -> 403
角色满足 -> 200
```

## 本版所处项目进度

v108 已经做了 auth enforcement rehearsal，但身份来源仍然是 header。

v110 已经明确生产阻塞之一是 `SIGNED_AUTH_MIDDLEWARE_MISSING`。

v111 补的是 signed token 的契约层：先用本地 HMAC rehearsal 证明签名、过期、角色判断这些路径可测试，再明确它仍不是生产 IdP。

## 配置入口

本版在 `src/config.ts` 新增：

```ts
authTokenIssuer: string;
authTokenSecret: string;
```

对应环境变量：

```text
ORDEROPS_AUTH_TOKEN_ISSUER
ORDEROPS_AUTH_TOKEN_SECRET
```

默认 `authTokenSecret` 为空，所以默认不会误判本地开发环境已经具备 signed auth。

## Contract 服务

新增服务：

```text
src/services/signedAuthTokenContract.ts
```

核心 profile 函数是：

```ts
export function createSignedAuthTokenContractProfile(
  config: Pick<AppConfig, "authTokenIssuer" | "authTokenSecret" | "upstreamActionsEnabled">,
  now = new Date(),
): SignedAuthTokenContractProfile {
  const samples = createSamples(config, now);
  const checks = {
    issuerConfigured: config.authTokenIssuer.length > 0,
    secretConfiguredForRehearsal: config.authTokenSecret.length > 0,
    missingTokenRejected: sampleReason(samples, "missing-token") === "missing_token",
    badSignatureRejected: sampleReason(samples, "bad-signature") === "bad_signature",
    expiredTokenRejected: sampleReason(samples, "expired-token") === "expired",
    insufficientRoleRejected: sampleReason(samples, "insufficient-role") === "missing_required_role",
    allowedRoleAccepted: sampleAccepted(samples, "allowed-operator"),
    secretNotExposed: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
```

这里的关键是 `secretNotExposed=true`，接口只显示是否配置 secret，不返回 secret 内容。

## Token 格式

本版使用本地 rehearsal 格式：

```ts
contract: {
  tokenFormat: "orderops-hmac-jws-rehearsal",
  issuer: config.authTokenIssuer,
  subjectRequired: true,
  rolesRequired: true,
  expiresAtRequired: true,
  signatureRequired: true,
  algorithm: "HS256",
  productionIdentityProvider: "not-connected",
},
```

这看起来接近 JWS/JWT，但名字里明确带 `rehearsal`，避免误解为已经接入真实 IdP。

## 生成与验证

生成 token 的函数是：

```ts
export function createRehearsalToken(input: {
  issuer: string;
  subject: string;
  roles: AccessPolicyRole[];
  expiresAt: Date;
  secret: string;
}): string {
  const header = { alg: "HS256", typ: "JWT", kid: "orderops-rehearsal" };
  const payload: TokenPayload = {
    iss: input.issuer,
    sub: input.subject,
    roles: input.roles,
    exp: Math.floor(input.expiresAt.getTime() / 1000),
  };
  const signingInput = `${base64UrlJson(header)}.${base64UrlJson(payload)}`;
  return `${signingInput}.${sign(signingInput, input.secret)}`;
}
```

验证逻辑是：

```ts
if (input.token === undefined || input.token.trim().length === 0) {
  return { accepted: false, statusCode: 401, reason: "missing_token" };
}
if (input.secret.length === 0) {
  return { accepted: false, statusCode: 401, reason: "secret_not_configured" };
}
```

然后检查签名、issuer、过期时间、角色：

```ts
if (!signatureMatches(signature, sign(signingInput, input.secret))) {
  return { accepted: false, statusCode: 401, reason: "bad_signature" };
}
if (payload.exp <= nowSeconds) {
  return { accepted: false, statusCode: 401, reason: "expired" };
}
if (!payload.roles.includes(input.requiredRole) && !payload.roles.includes("admin")) {
  return { accepted: false, statusCode: 403, reason: "missing_required_role" };
}
```

这就是 v111 的核心闭环：token contract 不是写在文档里，而是可执行、可测试、可输出 evidence。

## HTTP 入口

新增路由：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/security/signed-auth-token-contract", {
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
  const profile = createSignedAuthTokenContractProfile(deps.config);
```

文件位置：

```text
src/routes/statusRoutes.ts
```

它支持 JSON 和 Markdown，仍然是只读 evidence endpoint。

## 生产阻塞项

v111 永远不会宣称自己是生产认证：

```ts
readyForProductionAuth: false,
readOnly: true,
executionAllowed: false,
```

核心 blocker：

```ts
{
  code: "REAL_IDP_NOT_CONNECTED",
  severity: "blocker",
  message: "HMAC rehearsal tokens are not a real OAuth/OIDC/JWT production identity provider.",
}
```

如果没有配置 rehearsal secret，还会有：

```text
AUTH_TOKEN_SECRET_MISSING
```

这让本版边界很清楚：可以练 token 验证，不等于已经接生产认证。

## 测试覆盖

新增测试：

```text
test/signedAuthTokenContract.test.ts
```

样本断言：

```ts
expect(profile.samples.map((sample) => [sample.id, sample.result.statusCode])).toEqual([
  ["missing-token", 401],
  ["bad-signature", 401],
  ["expired-token", 401],
  ["insufficient-role", 403],
  ["allowed-operator", 200],
]);
```

secret 不泄露断言：

```ts
expect(JSON.stringify(profile)).not.toContain("test-secret");
```

路由断言：

```ts
expect(markdown.body).toContain("# Signed auth token contract");
expect(markdown.body).toContain("REAL_IDP_NOT_CONNECTED");
```

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
60 个测试文件通过
223 条测试通过
```

运行归档：

```text
b/111/图片/signed-auth-token-contract.png
b/111/解释/运行调试说明.md
```

## 一句话总结

v111 把 signed auth token 的最小契约和 401/403/200 验证路径固化成可测试 evidence，但仍明确标记真实 OAuth/OIDC/IdP 未接入，不能解除生产认证阻塞。
