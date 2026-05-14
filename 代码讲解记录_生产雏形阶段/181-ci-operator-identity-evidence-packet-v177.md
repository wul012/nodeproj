# 181-ci-operator-identity-evidence-packet-v177

## 版本定位

Node v177 是 `CI operator identity evidence packet`。它接在 Node v176 后面，回答生产发布前证据链里一个更靠近真实工程的问题：

```text
谁触发了验证？
这个身份从哪里来？
它有没有越权变成生产认证或发布授权？
```

本版仍然是只读证据包，不是生产认证：

- 不接真实 IdP。
- 不读取 production secret。
- 不启动 Java 或 mini-kv。
- 不打开 `UPSTREAM_ACTIONS_ENABLED=true`。
- 不创建 approval decision。
- 不执行 release / deployment / rollback / restore。

## 核心入口

实现文件：

```text
src/services/ciOperatorIdentityEvidencePacket.ts
```

核心函数：

```ts
export function loadCiOperatorIdentityEvidencePacket(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): CiOperatorIdentityEvidencePacketProfile {
  const sourcePacket = loadCiEvidenceHardeningPacket(config);
  const localSmokeIdentity = createLocalSmokeIdentityEvidence(headers);
  const githubActionsIdentityExpectations = createGitHubActionsIdentityExpectations();
  const identityBindingRules = createIdentityBindingRules();
  const identityEvidenceSteps = createIdentityEvidenceSteps();
  const pauseConditions = createPauseConditions();
}
```

这段代码说明 v177 的依赖边界很清楚：

```text
Node v176 CI evidence hardening packet
        +
local smoke request headers
        +
GitHub Actions metadata field expectations
        ->
Node v177 operator identity evidence packet
```

它没有去读 Java，也没有去连 mini-kv，更没有启动真实上游进程。

## local smoke 身份证据

本版复用既有 access guard 的身份解析：

```ts
import {
  extractRequestIdentityFromHeaders,
  type RequestIdentity,
} from "./accessGuard.js";
```

真正构造 local smoke 身份的是：

```ts
function createLocalSmokeIdentityEvidence(headers: IncomingHttpHeaders): LocalSmokeIdentityEvidence {
  const identity = extractRequestIdentityFromHeaders(headers);

  return {
    id: "local-smoke-header-identity",
    source: "request-headers",
    operatorId: identity.operatorId ?? null,
    roles: identity.roles,
    authSource: identity.authSource,
    authenticated: identity.authenticated,
    rawRoles: identity.rawRoles,
    rejectedRoles: identity.rejectedRoles,
    requiredForLocalSmoke: true,
    productionReady: false,
    readsSecrets: false,
  };
}
```

这里有两个关键点：

1. `operatorId`、`roles`、`authSource` 都来自请求头，不来自 secret。
2. `productionReady: false` 明确说明它只是 rehearsal identity，不是生产登录。

对应 route 测试使用的 header 是：

```ts
const headers = {
  "x-orderops-operator-id": "smoke-operator-1",
  "x-orderops-roles": "viewer,operator",
};
```

所以 v177 的 smoke 证据能明确记录：

```text
operatorId=smoke-operator-1
roles=["viewer","operator"]
authSource=headers
authenticated=true
```

## GitHub Actions 身份字段

CI 侧不能读生产 secret，所以 v177 只记录 GitHub Actions 自带 metadata 字段的预期：

```ts
function createGitHubActionsIdentityExpectations(): GitHubActionsIdentityExpectation[] {
  return [
    { id: "github-actor", field: "GITHUB_ACTOR", ... },
    { id: "github-triggering-actor", field: "GITHUB_TRIGGERING_ACTOR", ... },
    { id: "github-workflow", field: "GITHUB_WORKFLOW", ... },
    { id: "github-run-id", field: "GITHUB_RUN_ID", ... },
    { id: "github-run-attempt", field: "GITHUB_RUN_ATTEMPT", ... },
    { id: "github-sha", field: "GITHUB_SHA", ... },
  ];
}
```

每个字段都带着：

```ts
readFromSecretStore: false
```

这让 CI 身份证据的边界很明确：可以记录 actor、workflow、run id、sha，但不能把 secret 当作身份来源，也不能通过 CI 自动获得发布权限。

## Packet Digest

v177 也生成自己的 digest：

```ts
const packetDigest = digestPacket({
  profileVersion: "ci-operator-identity-evidence-packet.v1",
  sourceCiEvidenceHardeningDigest: sourcePacket.packet.packetDigest,
  localSmokeIdentity: {
    operatorId: localSmokeIdentity.operatorId,
    roles: localSmokeIdentity.roles,
    authSource: localSmokeIdentity.authSource,
    authenticated: localSmokeIdentity.authenticated,
    rejectedRoles: localSmokeIdentity.rejectedRoles,
  },
  githubActionsIdentityFields: githubActionsIdentityExpectations.map((item) => item.field),
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  checks: {
    ...checks,
    packetDigestValid: undefined,
    readyForCiOperatorIdentityEvidencePacket: undefined,
  },
});
```

digest 覆盖三类核心证据：

```text
v176 source digest
local smoke identity
GitHub Actions identity fields
```

同时它把 `packetDigestValid` 和 `readyForCiOperatorIdentityEvidencePacket` 排除在 digest 输入外，避免自引用。

## 关键检查

`createChecks()` 是本版安全边界的中心：

```ts
sourceCiEvidenceHardeningReady
sourceCiEvidenceHardeningDigestValid
sourceCiEvidenceHardeningStillBlocksProduction
localSmokeIdentityAuthenticated
localSmokeIdentityAuthSourceHeaders
localSmokeOperatorIdPresent
localSmokeRolesPresent
githubActionsIdentityExpectationsComplete
githubActionsIdentityFieldsNonSecret
identityBindingRulesComplete
identityEvidenceStepsReadOnly
upstreamActionsStillDisabled
noProductionIdpConnection
noProductionReleaseAuthorization
noDeploymentAuthorization
noRollbackAuthorization
noJavaOrMiniKvStart
```

这组检查把“有身份”和“有执行权”分开了：

```ts
noProductionReleaseAuthorization: true,
noDeploymentAuthorization: true,
noRollbackAuthorization: true,
noJavaOrMiniKvStart: true,
```

也就是说，即使 local smoke 身份有效，仍然不能触发任何真实生产动作。

## 路由接入

路由在：

```text
src/routes/statusRoutes.ts
```

新增入口：

```ts
app.get<{ Querystring: FixtureReportQuery }>("/api/v1/ci/operator-identity-evidence-packet", {
  schema: {
    querystring: fixtureReportQuerySchema,
  },
}, async (request, reply) => {
  const profile = loadCiOperatorIdentityEvidencePacket(deps.config, request.headers);

  if (request.query.format === "markdown") {
    reply.type("text/markdown; charset=utf-8");
    return renderCiOperatorIdentityEvidencePacketMarkdown(profile);
  }

  return profile;
});
```

这里没有使用通用 `registerJsonMarkdownReportRoute`，因为 v177 需要读取当前请求头里的 operator identity。这样可以让 HTTP smoke 的 header 直接进入 packet。

## 测试覆盖

测试文件：

```text
test/ciOperatorIdentityEvidencePacket.test.ts
```

覆盖四类场景：

1. 带 `x-orderops-operator-id` 和 `x-orderops-roles` 时，packet ready。
2. 缺少 local smoke identity headers 时，packet blocked。
3. `UPSTREAM_ACTIONS_ENABLED=true` 时，packet blocked。
4. JSON / Markdown route 都能返回，并包含 v176 digest、identity 和 recommendation。

例如缺少 header 的测试会断言：

```ts
expect(profile.packetState).toBe("blocked");
expect(profile.readyForCiOperatorIdentityEvidencePacket).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
  "LOCAL_SMOKE_IDENTITY_MISSING",
  "LOCAL_SMOKE_AUTH_SOURCE_NOT_HEADERS",
  "LOCAL_SMOKE_OPERATOR_ID_MISSING",
  "LOCAL_SMOKE_ROLES_MISSING",
]));
```

这能防止“没有操作人也算证据 ready”的问题。

## 本版价值

v176 解决的是：

```text
CI 应该跑哪些验证、保留哪些证据、不要做哪些危险动作
```

v177 往前推进一步，解决的是：

```text
这些验证是谁触发的，身份从哪里来，是否仍然不能越权执行生产动作
```

这让后面的 Node v178 可以在消费 Java v63 / mini-kv v72 的 retention evidence 前，先拥有 Node 自己的 identity evidence 输入。

按计划，下一步不是继续抢跑 Node v178，而是推荐并行：

```text
Java v63 + mini-kv v72
```
