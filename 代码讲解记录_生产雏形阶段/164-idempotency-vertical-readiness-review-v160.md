# 第一百六十版代码讲解：idempotency vertical readiness review

本版目标是把 Java v52 和 mini-kv v61 合成一次只读纵向 readiness review。

它解决的问题是：

```text
Java v52 已经补订单创建幂等边界；
mini-kv v61 已经补短 TTL token primitive；
Node v160 要判断这两者能否作为同一个“订单幂等 / TTL token”纵向切片继续往下推进。
```

本版不执行写操作，不启动 Java 或 mini-kv，也不把 mini-kv 接进 Java 交易主链路。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v159-post-release-evidence-review-roadmap.md
```

计划要求：

```text
Node v160：idempotency vertical readiness review
必须等待 Java v52 和 mini-kv v61 都完成后再做
读取两边版本证据
生成纵向切片 readiness review
默认不执行写操作
```

推进前只读核对到：

```text
Java HEAD/tag = v52订单平台order-idempotency-boundary
mini-kv HEAD/tag = 第六十一版TTL令牌原语
```

所以 v160 可以继续。

## 新增服务

新增文件：

```text
src/services/idempotencyVerticalReadinessReview.ts
```

入口函数很克制，只接收 Node config：

```ts
export function loadIdempotencyVerticalReadinessReview(
  config: AppConfig,
): IdempotencyVerticalReadinessReviewProfile {
```

它没有接收：

```text
OrderPlatformClient
MiniKvClient
AuditLog
ApprovalLedger
```

这说明 v160 不发起 Java HTTP 调用，不连接 mini-kv TCP，也不创建审批记录。它只是把已经完成的上游版本证据做成一个可测试的 readiness profile。

## Java v52 证据引用

Java 侧引用写成常量：

```ts
const JAVA_V52_IDEMPOTENCY_BOUNDARY: JavaIdempotencyBoundaryReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v52",
  tag: "v52订单平台order-idempotency-boundary",
  evidenceKind: "order-idempotency-boundary",
  evidencePath: "/contracts/order-idempotency-boundary.sample.json",
  walkthroughPath: "代码讲解记录_生产雏形阶段/56-version-52-order-idempotency-boundary.md",
  boundaryVersion: "java-order-idempotency-boundary.v1",
  requestFingerprintVersion: "order-create-request-sha256.v1",
```

这里引用的不是“Java 项目存在”这种泛泛状态，而是 v52 的核心边界：

```text
boundaryVersion=java-order-idempotency-boundary.v1
requestFingerprintVersion=order-create-request-sha256.v1
```

同 key 同请求的语义：

```ts
sameKeySameRequestOutcome: "REPLAY_EXISTING_ORDER",
```

同 key 不同请求的语义：

```ts
sameKeyDifferentRequestOutcome: "REJECT_BEFORE_ORDER_MUTATION",
sameKeyDifferentRequestErrorCode: "IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_REQUEST",
sameKeyDifferentRequestStatus: 409,
```

这对应 Java v52 的生产价值：不是只靠 `Idempotency-Key` 查旧订单，而是用请求指纹判断重放是否真的是同一个订单创建请求。

## Java 与 mini-kv 的边界

Java 引用里有三项边界字段：

```ts
authoritativeStore: "orders table",
miniKvConnected: false,
externalTokenStoreConnected: false,
changesPaymentOrInventoryTransaction: false,
```

它们告诉 Node：

```text
订单真相源仍是 Java orders table
Java v52 没接 mini-kv
Java v52 没接外部 token store
Java v52 没改变支付 / 库存事务
```

这正好符合当前计划要求：先把 Java 内部幂等边界立住，不急着让 mini-kv 承担订单一致性。

## mini-kv v61 证据引用

mini-kv 侧引用：

```ts
const MINI_KV_V61_TTL_TOKEN_PRIMITIVE: MiniKvTtlTokenPrimitiveReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v61",
  tag: "第六十一版TTL令牌原语",
  evidenceKind: "ttl-token-primitive",
  evidencePath: "fixtures/ttl-token/index.json",
  walkthroughPath: "代码讲解记录_生产雏形阶段/117-version-61-ttl-token-primitive.md",
  capability: "ttl_token_primitive",
  command: "SETNXEX key seconds value",
```

v61 的核心行为也固定在 Node profile 中：

```ts
successResponse: "1",
duplicateResponse: "0",
expiredTokenCanBeClaimedAgain: true,
atomicAbsentClaim: true,
```

这说明 mini-kv v61 的能力是短 TTL token：

```text
第一次 claim -> 1
重复 live token -> 0
过期后再次 claim -> 1
```

WAL 边界也进入 readiness review：

```ts
walRecord: "SETEXAT key epoch_millis value",
walReplayDropsExpiredToken: true,
```

这给后续 v62 做 TTL recovery evidence 留了明确延伸点。

## mini-kv 不做订单权威存储

mini-kv 常量最后几项很关键：

```ts
orderAuthoritative: false,
connectedToJavaTransactionChain: false,
changesPaymentOrInventorySemantics: false,
readOnlyEvidence: true,
executionAllowed: false,
```

这里的语义是：

```text
mini-kv v61 可以作为 token primitive candidate
但不能被 Node 判断为订单权威存储
也不能被 Java 直接放进支付、库存、订单一致性链路
```

这让 Node v160 的结论更像生产 readiness review，而不是简单功能列表。

## readiness review digest

v160 生成 `reviewDigest`：

```ts
const reviewDigest = digestReview({
  profileVersion: "idempotency-vertical-readiness-review.v1",
  javaVersionTag: JAVA_V52_IDEMPOTENCY_BOUNDARY.tag,
  javaBoundaryVersion: JAVA_V52_IDEMPOTENCY_BOUNDARY.boundaryVersion,
  javaRequestFingerprintVersion: JAVA_V52_IDEMPOTENCY_BOUNDARY.requestFingerprintVersion,
  miniKvVersionTag: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.tag,
  miniKvCapability: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.capability,
  miniKvCommand: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.command,
  orderTruthSource: "java-database",
  tokenStoreRole: "ttl-token-candidate-only",
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  productionWriteAuthorized: false,
  checks,
});
```

这个 digest 绑定了三类信息：

```text
Java 幂等边界
mini-kv token primitive
Node 当前安全开关
```

所以只要有人打开 `UPSTREAM_ACTIONS_ENABLED=true`，digest 和 checks 都会变化。

## checks 如何判断 ready

所有检查先由 `createChecks(config)` 生成：

```ts
const checks = createChecks(config);
checks.readyForIdempotencyVerticalReadinessReview = Object.entries(checks)
  .filter(([key]) => key !== "readyForIdempotencyVerticalReadinessReview")
  .every(([, value]) => value);
```

这延续前几版 report 的模式：

```text
先算每个原子 check
最后用所有原子 check 推导 ready 总开关
```

Java 部分检查：

```ts
javaConflictBeforeMutationReady: JAVA_V52_IDEMPOTENCY_BOUNDARY.sameKeyDifferentRequestOutcome === "REJECT_BEFORE_ORDER_MUTATION"
  && JAVA_V52_IDEMPOTENCY_BOUNDARY.sameKeyDifferentRequestStatus === 409,
javaKeepsDatabaseAuthoritative: JAVA_V52_IDEMPOTENCY_BOUNDARY.authoritativeStore === "orders table",
javaMiniKvDisconnected: !JAVA_V52_IDEMPOTENCY_BOUNDARY.miniKvConnected
  && !JAVA_V52_IDEMPOTENCY_BOUNDARY.externalTokenStoreConnected,
```

mini-kv 部分检查：

```ts
miniKvSetnxexReady: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.command === "SETNXEX key seconds value"
  && MINI_KV_V61_TTL_TOKEN_PRIMITIVE.successResponse === "1"
  && MINI_KV_V61_TTL_TOKEN_PRIMITIVE.duplicateResponse === "0",
miniKvWalBoundaryReady: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.walRecord === "SETEXAT key epoch_millis value"
  && MINI_KV_V61_TTL_TOKEN_PRIMITIVE.walReplayDropsExpiredToken,
```

Node 自身安全检查：

```ts
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
noAutomaticUpstreamStart: true,
nodeDoesNotAuthorizeWrites: true,
readyForProductionOperationsStillFalse: true,
```

因此 v160 的 ready 不是“功能存在就通过”，而是必须同时满足：

```text
Java 边界正确
mini-kv 能力正确
Node 不授权写操作
```

## blocker 收集

如果任何核心检查失败，会进入 `productionBlockers`：

```ts
addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "idempotency-vertical-readiness-review", "Review must not start Java or mini-kv.");
addMessage(blockers, checks.nodeDoesNotAuthorizeWrites, "NODE_REVIEW_AUTHORIZES_WRITES", "idempotency-vertical-readiness-review", "Node v160 review must not authorize writes.");
```

这三条对应本项目一直坚持的安全边界：

```text
不开上游写开关
不自动启动上游
不把 review 变成 execution
```

## Markdown 输出

v160 的 Markdown renderer：

```ts
export function renderIdempotencyVerticalReadinessReviewMarkdown(
  profile: IdempotencyVerticalReadinessReviewProfile,
): string {
```

输出结构包括：

```text
Review
Checks
Artifacts / Java Boundary
Artifacts / mini-kv Token Primitive
Node Safety Envelope
Summary
Production Blockers
Warnings
Recommendations
Evidence Endpoints
Next Actions
```

这让浏览器截图和人工 review 都能直接看到：Java 是订单真相源，mini-kv 只是 TTL token candidate，Node 没有授权写操作。

## 路由注册

改动文件：

```text
src/routes/statusRoutes.ts
```

新增 import：

```ts
import {
  loadIdempotencyVerticalReadinessReview,
  renderIdempotencyVerticalReadinessReviewMarkdown,
} from "../services/idempotencyVerticalReadinessReview.js";
```

新增 route：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/idempotency-vertical-readiness-review",
  () => Promise.resolve(loadIdempotencyVerticalReadinessReview(deps.config)),
  renderIdempotencyVerticalReadinessReviewMarkdown,
);
```

这里复用统一的 JSON / Markdown route helper，所以 URL 规则和前几版一致：

```text
默认 JSON
?format=markdown 输出 Markdown
```

## 测试

新增文件：

```text
test/idempotencyVerticalReadinessReview.test.ts
```

第一个测试锁定正常 ready：

```ts
expect(profile).toMatchObject({
  profileVersion: "idempotency-vertical-readiness-review.v1",
  reviewState: "ready-read-only-vertical-slice",
  readyForIdempotencyVerticalReadinessReview: true,
  readyForControlledIdempotencyDrill: false,
  readyForProductionOperations: false,
  readOnly: true,
  executionAllowed: false,
```

它还锁定 Java / mini-kv 版本引用：

```ts
javaVersionTag: "v52订单平台order-idempotency-boundary",
miniKvVersionTag: "第六十一版TTL令牌原语",
orderTruthSource: "java-database",
tokenStoreRole: "ttl-token-candidate-only",
```

第二个测试锁定危险开关：

```ts
const profile = loadIdempotencyVerticalReadinessReview(loadTestConfig("memory://idempotency-review-blocked", {
  UPSTREAM_ACTIONS_ENABLED: "true",
}));

expect(profile.reviewState).toBe("blocked");
expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
```

这保证只要上游写开关打开，readiness review 不能通过。

第三个测试覆盖 route：

```ts
const json = await app.inject({
  method: "GET",
  url: "/api/v1/production/idempotency-vertical-readiness-review",
  headers,
});
```

Markdown 也要包含下一步建议：

```ts
expect(markdown.body).toContain("PROCEED_TO_PARALLEL_ABSTRACTION_AND_RECOVERY_STAGE");
```

## 测试稳定化

本版完整回归第一次发现 8 个旧 live-probe pass-window 用例在全量并发下 20s 超时。它们单测可以通过，但全量并发时会被层层 evidence 组合拖到 20s 边缘。

因此把这一组测试的 20s timeout 统一调整为 60s：

```text
test/productionLiveProbeRealReadSmoke*.test.ts
```

这是测试基础设施稳定化，不改变业务行为断言。调整后完整回归通过：

```text
108 files passed
375 tests passed
```

## 运行调试

本版执行：

```text
npm run typecheck
npm test -- --run test/idempotencyVerticalReadinessReview.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

HTTP smoke 关键返回：

```text
reviewState=ready-read-only-vertical-slice
ready=true
blockers=0
javaTag=v52订单平台order-idempotency-boundary
miniKvTag=第六十一版TTL令牌原语
markdownStatus=200
```

截图归档：

```text
b/160/图片/idempotency-vertical-readiness-review.png
b/160/解释/运行调试说明.md
```

## 成熟度变化

v160 让三项目从“只读 evidence 收口”进入“纵向生产硬化切片”：

```text
Java：订单创建幂等边界已经可解释
mini-kv：短 TTL token primitive 已经可验证
Node：能把两者作为同一条生产硬化链路做 readiness review
```

但它仍然没有到生产级执行：

```text
没有真实 IdempotencyStore 抽象
没有 mini-kv recovery evidence
没有 controlled idempotency drill runbook
没有打开上游写操作
```

下一步应按计划推进：

```text
推荐并行：Java v53 + mini-kv v62
```

等两者完成后，Node v161 再做 controlled idempotency drill runbook。

## 一句话总结

v160 把 Java v52 的订单幂等边界和 mini-kv v61 的 TTL token primitive 汇总为一个只读纵向 readiness review，证明这条生产硬化切片可以继续推进，但仍不授权任何真实上游写操作。
