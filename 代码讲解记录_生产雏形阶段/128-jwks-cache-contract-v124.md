# 第一百二十四版代码讲解：JWKS cache contract rehearsal

本版目标是在 v121 的本地 JWKS verifier fixture 之上，增加 JWKS cache contract 演练。

它不访问真实 IdP、不发起 JWKS 网络请求、不让 token 放行真实请求。本版做的是：

```text
用本地 JWKS cache 模拟 key 命中
模拟 unknown kid 拒绝
模拟 expired cache 拒绝
模拟 rotation marker 变化
继续保留 real IdP verifier missing 的生产阻塞
```

## 本版所处项目进度

v121 已经证明本地 RS256 JWT/JWKS fixture 可以覆盖：

```text
issuer
audience
expiry
roles
kid
signature
```

v124 往生产形态再靠近一步：

```text
不是只验证单个 key
而是开始描述 JWKS cache 的命中、过期和轮换语义
```

这为后面真实 JWKS fetch/cache/rotation 做准备。

## 新增服务

新增文件：

```text
src/services/jwksCacheContract.ts
```

入口函数：

```ts
export function createJwksCacheContractProfile(
  config: Pick<AppConfig, "idpIssuer" | "idpAudience" | "idpJwksUrl" | "upstreamActionsEnabled">,
): JwksCacheContractProfile {
  const now = Math.floor(Date.now() / 1000);
  const cache = new LocalJwksFixtureCache(now);
  const initialKeyCount = cache.size();
  const samples = createSamples(cache, now);
```

这段说明本版仍是本地演练：

```text
LocalJwksFixtureCache
initialKeyCount
samples
```

没有网络调用，也没有真实 IdP 凭据。

## 本地 JWKS Cache

本版新增本地 cache：

```ts
class LocalJwksFixtureCache {
  private readonly keys = new Map<string, CachedJwk>();

  constructor(now: number) {
    this.put(createFixtureKey("orderops-fixture-key-1", now + TTL_SECONDS));
    this.put(createFixtureKey("orderops-expired-key", now - 60));
  }
```

它初始化两个 key：

```text
orderops-fixture-key-1：未过期，用于 cache hit
orderops-expired-key：已过期，用于 expired cache
```

查找逻辑：

```ts
lookup(kid: string, now: number): CacheLookup {
  const key = this.keys.get(kid);
  if (key === undefined) {
    return { status: "rejected", reason: "unknown_kid" };
  }
  if (key.expiresAt <= now) {
    return { status: "rejected", reason: "cache_expired" };
  }
  return { status: "hit", key };
}
```

这里已经形成了 JWKS cache 最核心的三个分支：

```text
hit
unknown_kid
cache_expired
```

## Rotation Marker

轮换动作：

```ts
rotate(kid: string, now: number): void {
  this.put(createFixtureKey(kid, now + TTL_SECONDS));
}
```

marker 计算：

```ts
marker(): string {
  const stableKeys = [...this.keys.values()]
    .map((key) => `${key.kid}:${key.expiresAt}:${key.n}`)
    .sort()
    .join("|");
  return `jwks-rotation-marker:${createHash("sha256").update(stableKeys).digest("hex").slice(0, 16)}`;
}
```

这样只要新增或变化 key，marker 就会改变。

本版不是做真实 key rotation，而是先把“轮换后可观测”的证据形态定下来。

## 四个样本

样本生成：

```ts
const hit = cache.lookup("orderops-fixture-key-1", now);
const unknown = cache.lookup("unknown-fixture-key", now);
const expired = cache.lookup("orderops-expired-key", now);
const markerBefore = cache.marker();
const keyCountBeforeRotation = cache.size();
cache.rotate("orderops-rotated-key-2", now);
const markerAfter = cache.marker();
```

最终样本：

```text
cache-hit -> hit / cache_hit
unknown-kid -> rejected / unknown_kid
expired-cache -> rejected / cache_expired
rotation-marker -> changed / rotation_marker_changed
```

这就是 v124 的最小 JWKS cache contract。

## 核心检查项

checks：

```ts
cacheHitCovered: samplePassed(samples, "cache-hit", "hit"),
unknownKidRejected: samplePassed(samples, "unknown-kid", "rejected"),
expiredCacheRejected: samplePassed(samples, "expired-cache", "rejected"),
rotationMarkerCovered: samplePassed(samples, "rotation-marker", "changed"),
noJwksNetworkFetch: true,
noExternalIdpCall: true,
tokenDoesNotAuthorizeRequests: true,
realIdpVerifierConnected: false,
upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
```

这里保持了和 v121 一致的边界：

```text
不 fetch JWKS
不 call external IdP
不授权真实请求
realIdpVerifierConnected=false
```

## 生产阻塞项

正常配置下，本版只剩：

```text
REAL_IDP_VERIFIER_NOT_CONNECTED
```

对应代码：

```ts
addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "A real JWKS/OIDC verifier is still required before production auth.");
```

如果配置不完整，会出现：

```text
IDP_CONFIG_INCOMPLETE
```

如果误打开上游动作：

```text
UPSTREAM_ACTIONS_ENABLED
```

## HTTP 入口

新增路由：

```text
GET /api/v1/security/jwks-cache-contract
GET /api/v1/security/jwks-cache-contract?format=markdown
```

文件位置：

```text
src/routes/statusRoutes.ts
```

路由代码：

```ts
const profile = createJwksCacheContractProfile(deps.config);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderJwksCacheContractMarkdown(profile);
}
```

它是只读 security evidence endpoint。

## 测试覆盖

新增测试：

```text
test/jwksCacheContract.test.ts
```

核心断言：

```ts
expect(profile.samples.map((sample) => [sample.id, sample.actual, sample.reason])).toEqual([
  ["cache-hit", "hit", "cache_hit"],
  ["unknown-kid", "rejected", "unknown_kid"],
  ["expired-cache", "rejected", "cache_expired"],
  ["rotation-marker", "changed", "rotation_marker_changed"],
]);
```

轮换断言：

```ts
const rotation = profile.samples.find((sample) => sample.id === "rotation-marker");
expect(rotation?.evidence.keyCountAfter).toBe((rotation?.evidence.keyCountBefore ?? 0) + 1);
expect(rotation?.evidence.markerAfter).not.toBe(rotation?.evidence.markerBefore);
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
73 个测试文件通过
262 条测试通过
```

运行归档：

```text
b/124/图片/jwks-cache-contract.png
b/124/解释/运行调试说明.md
```

## 一句话总结

v124 把 IdP/JWKS 方向从“本地 JWT 验签 fixture”推进到“JWKS cache contract”：cache hit、unknown kid、expired cache、rotation marker 都有结构化证据，但真实 IdP verifier 仍未连接，所以生产认证继续保持阻塞。
