# 第一百一十八版代码讲解：IdP verifier boundary

本版目标是把真实生产登录的 IdP verifier 边界先定义出来。

它不访问外部 IdP、不拉 JWKS、不验证真实 RS256 签名，也不让 token 成为真实放行依据。本版只做：

```text
检查未来 OIDC/JWT verifier 需要哪些配置
说明当前 local HMAC rehearsal 与未来真实 IdP verifier 的边界
继续保留真实 IdP 未接入的生产阻塞
```

## 本版所处项目进度

v114 已经把 signed token verification result 写入 audit context。

v116 已经把真实 IdP 缺失标成 production readiness summary v6 的硬阻塞。

v118 开始把这个阻塞拆开：不是笼统说“缺登录”，而是明确未来真实 IdP verifier 需要：

```text
issuer
audience
JWKS URL
clock skew
required claims
key rotation
```

## 配置扩展

文件：

```text
src/config.ts
```

新增配置字段：

```ts
idpIssuer: string;
idpAudience: string;
idpJwksUrl: string;
idpClockSkewSeconds: number;
```

读取环境变量：

```ts
idpIssuer: readString(env, "ORDEROPS_IDP_ISSUER", ""),
idpAudience: readString(env, "ORDEROPS_IDP_AUDIENCE", ""),
idpJwksUrl: readString(env, "ORDEROPS_IDP_JWKS_URL", ""),
idpClockSkewSeconds: readNumber(env, "ORDEROPS_IDP_CLOCK_SKEW_SECONDS", 60),
```

`.env.example` 也同步新增：

```text
ORDEROPS_IDP_ISSUER=
ORDEROPS_IDP_AUDIENCE=
ORDEROPS_IDP_JWKS_URL=
ORDEROPS_IDP_CLOCK_SKEW_SECONDS=60
```

这些只是配置形状，v118 不会访问这些 URL。

## 新增服务

新增文件：

```text
src/services/idpVerifierBoundary.ts
```

Profile 入口：

```ts
export function createIdpVerifierBoundaryProfile(config: Pick<AppConfig, ...>): IdpVerifierBoundaryProfile {
```

当前 verifier 摘要：

```ts
currentVerifier: {
  localRehearsalVerifier: "orderops-hmac-jws-rehearsal",
  tokenCurrentlyAuthorizesRequests: false,
  productionVerifier: "oidc-jwt-jwks",
  productionVerifierConnected: false,
  doesNotFetchJwks: true,
  doesNotCallExternalIdp: true,
  upstreamActionsEnabled: config.upstreamActionsEnabled,
},
```

这里最关键的是：

```text
tokenCurrentlyAuthorizesRequests=false
doesNotFetchJwks=true
doesNotCallExternalIdp=true
```

它说明本版仍然只是边界，不改变请求权限。

## OIDC Contract

服务输出 OIDC 合同：

```ts
oidcContract: {
  issuer: config.idpIssuer,
  audience: config.idpAudience,
  jwksUrl: config.idpJwksUrl,
  clockSkewSeconds: config.idpClockSkewSeconds,
  requiredClaims: [...REQUIRED_CLAIMS],
  acceptedAlgorithms: ["RS256"],
  futureKeyRotationRequired: true,
},
```

required claims 是：

```ts
const REQUIRED_CLAIMS = Object.freeze(["iss", "sub", "aud", "exp", "iat", "roles"]);
```

这让后续真实 verifier 的实现范围更清楚：不是只看 token 有没有签名，还要验证 issuer、audience、expiry、roles 等业务需要的 claims。

## 三种 verifier 状态

本版定义：

```ts
id: "local-hmac-rehearsal" | "oidc-boundary" | "oidc-connected";
```

`local-hmac-rehearsal`：

```text
当前本地 HMAC 演练 verifier，只适合测试和 audit binding。
```

`oidc-boundary`：

```text
只检查 OIDC/JWT 配置形状，不拉远端 JWKS。
```

`oidc-connected`：

```text
未来真实 IdP verifier 完成后的状态。
```

这能避免把“配置形状齐了”误认为“真实登录完成了”。

## 核心检查项

检查项：

```ts
localHmacRehearsalVerifierStillAvailable: config.authTokenIssuer.length > 0 && config.authTokenSecret.length > 0,
oidcVerifierBoundaryDefined: REQUIRED_CLAIMS.length === 6,
issuerConfigured: config.idpIssuer.length > 0,
audienceConfigured: config.idpAudience.length > 0,
jwksUrlConfigured: config.idpJwksUrl.length > 0,
jwksUrlUsesHttps: config.idpJwksUrl.startsWith("https://"),
clockSkewConfigured: config.idpClockSkewSeconds > 0,
noJwksNetworkFetch: true,
noExternalIdpCall: true,
tokenDoesNotAuthorizeRequests: true,
realIdpVerifierConnected: false,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

配置齐全时，仍然会有：

```text
REAL_IDP_VERIFIER_NOT_CONNECTED
```

因为 v118 只定义边界，不实现真实 verifier。

## HTTP 入口

新增路由：

```text
GET /api/v1/security/idp-verifier-boundary
GET /api/v1/security/idp-verifier-boundary?format=markdown
```

路由位置：

```text
src/routes/statusRoutes.ts
```

代码：

```ts
const profile = createIdpVerifierBoundaryProfile(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderIdpVerifierBoundaryMarkdown(profile);
}
```

这放在 security 路由组下，仍由 viewer 读取，不改变真实访问控制。

## Runtime config 可见性

文件：

```text
src/routes/statusRoutes.ts
```

`/api/v1/runtime/config` 新增只读摘要：

```ts
idpIssuerConfigured: deps.config.idpIssuer.length > 0,
idpAudienceConfigured: deps.config.idpAudience.length > 0,
idpJwksUrlConfigured: deps.config.idpJwksUrl.length > 0,
idpClockSkewSeconds: deps.config.idpClockSkewSeconds,
```

注意它只暴露是否配置，不暴露任何 secret。

## 测试覆盖

新增测试：

```text
test/idpVerifierBoundary.test.ts
```

配置齐全测试：

```ts
expect(profile).toMatchObject({
  profileVersion: "idp-verifier-boundary.v1",
  readyForProductionAuth: false,
  oidcContract: {
    issuer: "https://idp.example",
    audience: "orderops-node",
    jwksUrl: "https://idp.example/.well-known/jwks.json",
    clockSkewSeconds: 90,
    acceptedAlgorithms: ["RS256"],
  },
});
```

并确认本地 secret 不泄露：

```ts
expect(JSON.stringify(profile)).not.toContain("test-secret");
```

缺配置测试会出现：

```text
IDP_ISSUER_MISSING
IDP_AUDIENCE_MISSING
IDP_JWKS_URL_MISSING
IDP_JWKS_URL_NOT_HTTPS
REAL_IDP_VERIFIER_NOT_CONNECTED
```

路由测试覆盖 JSON 和 Markdown：

```ts
expect(markdown.body).toContain("# IdP verifier boundary");
expect(markdown.body).toContain("REAL_IDP_VERIFIER_NOT_CONNECTED");
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
67 个测试文件通过
244 条测试通过
```

运行归档：

```text
b/118/图片/idp-verifier-boundary.png
b/118/解释/运行调试说明.md
```

## 一句话总结

v118 把真实 IdP verifier 的 OIDC/JWT 配置、状态和阻塞项拆清楚；当前仍不拉 JWKS、不调用外部 IdP、不授权请求，所以真实 IdP verifier 仍是生产认证硬门槛。
