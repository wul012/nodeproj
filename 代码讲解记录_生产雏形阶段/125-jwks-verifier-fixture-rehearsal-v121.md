# 第一百二十一版代码讲解：JWKS verifier fixture rehearsal

本版目标是给 v118 的 `IdP verifier boundary` 增加一个本地 JWKS / JWT 验签演练。

它不访问真实 IdP、不拉取远程 JWKS、不让 token 放行请求。本版做的是：

```text
用本地 RS256 key pair 生成 JWT fixture
按 issuer / audience / expiry / roles / kid / signature 做验证
输出 accepted 与 rejected 样本
继续保留 real IdP verifier missing 的生产阻塞
```

## 本版所处项目进度

v118 已经定义了未来生产 IdP verifier 的边界：

```text
src/services/idpVerifierBoundary.ts
```

其中明确：

```ts
productionVerifier: "oidc-jwt-jwks",
productionVerifierConnected: false,
doesNotFetchJwks: true,
doesNotCallExternalIdp: true,
```

v121 在这个边界之上补一个本地 fixture rehearsal：先证明 verifier 应该拒绝什么、接受什么，但仍不连接真实 IdP。

## 新增服务

新增文件：

```text
src/services/jwksVerifierFixtureRehearsal.ts
```

入口函数：

```ts
export function createJwksVerifierFixtureRehearsalProfile(
  config: Pick<AppConfig, "idpIssuer" | "idpAudience" | "idpJwksUrl" | "upstreamActionsEnabled">,
): JwksVerifierFixtureRehearsalProfile {
  const fixture = createLocalJwksFixture();
  const issuer = config.idpIssuer;
  const audience = config.idpAudience;
  const now = Math.floor(Date.now() / 1000);
  const samples = createSamples({
    fixture,
    issuer,
    audience,
    now,
  });
```

这段是本版主流程：

```text
生成本地 JWKS fixture
读取 IdP issuer / audience 配置
构造一组 JWT 样本
对样本逐个验签和验声明
汇总 checks / blockers / recommendations
```

## 本地 JWKS fixture

本版使用 Node `crypto` 生成本地 RSA key pair：

```ts
function createLocalJwksFixture(): LocalJwksFixture {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  const publicJwk = publicKey.export({ format: "jwk" }) as Record<string, unknown>;
  publicJwk.kid = "orderops-fixture-key-1";
  publicJwk.alg = "RS256";
  publicJwk.use = "sig";
```

注意返回给 profile 的不是私钥，而是安全描述：

```ts
publicKeyExposed: true,
privateKeyExposed: false,
localOnly: true,
noJwksNetworkFetch: true,
noExternalIdpCall: true,
tokenDoesNotAuthorizeRequests: true,
realIdpVerifierConnected: false,
```

这里的边界很关键：它是本地演练，不是生产 IdP 连接。

## JWT 签名样本

签名函数：

```ts
function signFixtureToken(
  fixture: LocalJwksFixture,
  input: {
    issuer: string;
    audience: string;
    subject: string;
    roles: string[];
    issuedAt: number;
    expiresAt: number;
  },
  kid: string = fixture.kid,
): SignedFixtureToken {
  const header = base64UrlJson({ alg: "RS256", typ: "JWT", kid });
```

payload 使用标准 JWT claim：

```ts
const claims: FixtureClaims = {
  iss: input.issuer,
  aud: input.audience,
  sub: input.subject,
  roles: input.roles,
  iat: input.issuedAt,
  exp: input.expiresAt,
};
```

签名算法：

```ts
const signature = createSign("RSA-SHA256")
  .update(signingInput)
  .end()
  .sign(fixture.privateKey);
```

这让本版从 v116 的 HMAC rehearsal 往生产形态靠近了一步：JWT 结构和 RS256 签名已经像真实 OIDC/JWKS 场景。

## 六个验证样本

本版生成六个样本：

```ts
id:
  | "accepted-operator"
  | "issuer-mismatch"
  | "audience-mismatch"
  | "expired-token"
  | "missing-required-role"
  | "unknown-kid";
```

正常样本：

```text
accepted-operator -> accepted / verified
```

拒绝样本：

```text
issuer-mismatch -> rejected / issuer_mismatch
audience-mismatch -> rejected / audience_mismatch
expired-token -> rejected / expired
missing-required-role -> rejected / missing_required_role
unknown-kid -> rejected / unknown_kid
```

这组样本是后面接真实 IdP verifier 前的最小验收矩阵。

## 验证流程

核心验证函数：

```ts
function verifyFixtureToken(input: {
  fixture: LocalJwksFixture;
  token: string;
  issuer: string;
  audience: string;
  now: number;
}): VerificationResult {
  const parts = input.token.split(".");
  if (parts.length !== 3) {
    return rejected("malformed_token");
  }
```

先检查 header：

```ts
if (header.alg !== "RS256") {
  return rejected("invalid_algorithm");
}
if (header.kid !== input.fixture.kid) {
  return rejected("unknown_kid");
}
```

再检查 claim：

```ts
if (claims.iss !== input.issuer) {
  return rejected("issuer_mismatch");
}
if (claims.aud !== input.audience) {
  return rejected("audience_mismatch");
}
if (typeof claims.exp !== "number" || claims.exp <= input.now) {
  return rejected("expired");
}
if (!Array.isArray(claims.roles) || !claims.roles.includes(REQUIRED_ROLE)) {
  return rejected("missing_required_role");
}
```

最后验签：

```ts
const signatureValid = createVerify("RSA-SHA256")
  .update(`${parts[0]}.${parts[1]}`)
  .end()
  .verify(input.fixture.publicKey, fromBase64Url(parts[2]));
```

这个顺序接近真实网关：先排除明显不匹配的 token，再做签名确认。

## 核心检查项

本版输出的 checks：

```ts
idpConfigComplete: issuer.length > 0 && audience.length > 0 && config.idpJwksUrl.startsWith("https://"),
localJwksFixtureCreated: fixture.publicJwk.kid === fixture.kid
  && fixture.publicJwk.alg === "RS256"
  && fixture.publicJwk.use === "sig",
acceptedTokenVerified: samplePassed(samples, "accepted-operator", "accepted"),
issuerMismatchRejected: samplePassed(samples, "issuer-mismatch", "rejected"),
audienceMismatchRejected: samplePassed(samples, "audience-mismatch", "rejected"),
expiredTokenRejected: samplePassed(samples, "expired-token", "rejected"),
missingRequiredRoleRejected: samplePassed(samples, "missing-required-role", "rejected"),
unknownKidRejected: samplePassed(samples, "unknown-kid", "rejected"),
```

安全边界检查继续保留：

```ts
noJwksNetworkFetch: true,
noExternalIdpCall: true,
tokenDoesNotAuthorizeRequests: true,
realIdpVerifierConnected: false,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

## 生产阻塞项

正常配置下，本版只剩一个生产 blocker：

```text
REAL_IDP_VERIFIER_NOT_CONNECTED
```

对应代码：

```ts
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "A real JWKS/OIDC verifier is still required before production auth.");
```

如果误开真实上游动作：

```ts
addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while production auth is not connected.");
```

所以 v121 的结论不是“可以生产登录”，而是：

```text
本地 verifier fixture 行为已可验收，但真实 IdP verifier 仍未连接。
```

## HTTP 入口

新增路由：

```text
GET /api/v1/security/jwks-verifier-fixture-rehearsal
GET /api/v1/security/jwks-verifier-fixture-rehearsal?format=markdown
```

文件位置：

```text
src/routes/statusRoutes.ts
```

路由代码：

```ts
const profile = createJwksVerifierFixtureRehearsalProfile(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderJwksVerifierFixtureRehearsalMarkdown(profile);
}
```

它仍然是只读 evidence endpoint。

## 测试覆盖

新增测试：

```text
test/jwksVerifierFixtureRehearsal.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "jwks-verifier-fixture-rehearsal.v1",
  readyForProductionAuth: false,
  readOnly: true,
  executionAllowed: false,
});
```

样本矩阵断言：

```ts
expect(profile.samples.map((sample) => [sample.id, sample.actual, sample.reason])).toEqual([
  ["accepted-operator", "accepted", "verified"],
  ["issuer-mismatch", "rejected", "issuer_mismatch"],
  ["audience-mismatch", "rejected", "audience_mismatch"],
  ["expired-token", "rejected", "expired"],
  ["missing-required-role", "rejected", "missing_required_role"],
  ["unknown-kid", "rejected", "unknown_kid"],
]);
```

生产阻塞断言：

```ts
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
  "REAL_IDP_VERIFIER_NOT_CONNECTED",
]);
```

路由测试覆盖 JSON 和 Markdown。

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
70 个测试文件通过
253 条测试通过
```

运行归档：

```text
b/121/图片/jwks-verifier-fixture-rehearsal.png
b/121/解释/运行调试说明.md
```

## 一句话总结

v121 把 IdP verifier 从“配置边界”推进到“本地 RS256 JWT/JWKS 行为演练”：issuer、audience、expiry、roles、kid 和 signature 的验收矩阵已经形成，但真实 IdP verifier 仍未连接，所以生产认证继续保持阻塞。
