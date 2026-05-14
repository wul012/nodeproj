# 第一百六十一版代码讲解：controlled idempotency drill runbook

本版目标是把 Java v53 和 mini-kv v62 合成一次受控幂等演练 runbook。

它解决的问题是：

```text
Java v53 已经把订单幂等存储抽象成 IdempotencyStore；
mini-kv v62 已经证明 TTL token 在 WAL / Snapshot / restart 下的恢复边界；
Node v161 要把两者放进同一个人工 dry-run 演练包里，并明确哪些动作仍然禁止。
```

本版不是执行演练，不是启动上游，不是发起订单写入，也不是执行 mini-kv `SETNXEX`。它是一个可审查、可归档、可被后续 release plan 引用的手工 dry-run runbook。

## 本版所处项目进度

最新计划来自：

```text
docs/plans/v159-post-release-evidence-review-roadmap.md
```

计划要求：

```text
Node v161：controlled idempotency drill runbook
必须等待 Java v53 和 mini-kv v62 都完成后再做
引用 Java v53 tag 和 evidence
引用 mini-kv v62 tag 和 evidence
默认只读或 dry-run
不自动启动 Java / mini-kv
```

推进前只读核对到：

```text
Java HEAD/tag = v53订单平台idempotency-store-abstraction
mini-kv HEAD/tag = 第六十二版TTL恢复证据
```

所以 v161 可以继续。

## 新增服务

新增文件：

```text
src/services/controlledIdempotencyDrillRunbook.ts
```

入口函数：

```ts
export function loadControlledIdempotencyDrillRunbook(config: AppConfig): ControlledIdempotencyDrillRunbookProfile {
```

它只接收 `AppConfig`，没有接收 Java client、mini-kv client 或 approval ledger。这说明 v161 不调用 Java HTTP，不连接 mini-kv TCP，也不创建审批记录。它只是消费版本证据语义，生成 runbook。

## 依赖 v160 readiness review

v161 不是脱离上下文的新 summary，而是继续消费 v160：

```ts
const previousReadinessReview = loadIdempotencyVerticalReadinessReview(config);
```

后续检查会确认：

```ts
previousReadinessReviewReady: previousReadinessReview.readyForIdempotencyVerticalReadinessReview
  && previousReadinessReview.reviewState === "ready-read-only-vertical-slice",
previousReviewDoesNotAuthorizeWrites: !previousReadinessReview.executionAllowed
  && !previousReadinessReview.review.productionWriteAuthorized,
```

这保证 v161 的前置不是“文档说完成了”，而是 Node v160 的 readiness profile 本身仍然 ready，且没有授权写操作。

## Java v53 存储抽象引用

Java 侧引用：

```ts
const JAVA_V53_IDEMPOTENCY_STORE: JavaIdempotencyStoreAbstractionReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v53",
  tag: "v53订单平台idempotency-store-abstraction",
  evidenceKind: "order-idempotency-store-abstraction",
  evidencePath: "/contracts/order-idempotency-store-abstraction.sample.json",
  storeAbstractionVersion: "java-idempotency-store.v1",
  activeStore: "jpa-order-idempotency-store",
  activeImplementation: "JpaIdempotencyStore",
  activeStoreMode: "JPA_DATABASE",
```

这里锁定了 Java v53 的核心变化：

```text
storeAbstractionVersion=java-idempotency-store.v1
activeStore=jpa-order-idempotency-store
activeStoreMode=JPA_DATABASE
```

也就是说 Java 已经有抽象接口，但活动实现仍然是数据库。

## Java 边界字段

Java 引用里最重要的是这几项：

```ts
miniKvAdapterCandidate: "mini-kv-ttl-token-adapter",
miniKvAdapterCandidateDeclared: true,
miniKvAdapterEnabled: false,
miniKvConnected: false,
nodeMayTriggerWrites: false,
changesPaymentOrInventoryTransaction: false,
```

控制面读到后应该理解为：

```text
mini-kv adapter 已经作为候选方向被声明；
但它没有启用，没有连接，也不能被 Node 用来触发真实写操作；
Java v53 没改变支付、库存或订单权威存储语义。
```

这就是“可替换边界”和“生产安全边界”同时存在。

## mini-kv v62 恢复证据引用

mini-kv 侧引用：

```ts
const MINI_KV_V62_TTL_RECOVERY: MiniKvTtlRecoveryEvidenceReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v62",
  tag: "第六十二版TTL恢复证据",
  evidenceKind: "ttl-token-recovery-evidence",
  evidencePath: "fixtures/ttl-token/recovery-evidence.json",
  indexPath: "fixtures/ttl-token/index.json",
  capability: "ttl_token_recovery",
  sourcePrimitive: "SETNXEX key seconds value",
  claimRecord: "SETEXAT key epoch_millis value",
```

这里明确 `SETNXEX` 是来源 primitive，但 v161 不执行它。v161 只消费 v62 已归档的恢复证据。

## mini-kv 恢复边界

v62 的关键恢复结论进入 Node：

```ts
replayRestoresUnexpiredToken: true,
replayDropsExpiredToken: true,
snapshotLoadDropsExpiredToken: true,
restartMergesSnapshotAndWalTokens: true,
compactedSetExpireatRestoresTtl: true,
```

控制面读到后应该理解为：

```text
未过期 token 可以恢复；
过期 token 不应通过 WAL 或 Snapshot 复活；
Snapshot + WAL restart 有恢复证据；
compact 后 SET + EXPIREAT 仍能保持 TTL 边界。
```

但这仍不代表 mini-kv 是订单权威：

```ts
orderAuthoritative: false,
connectedToJavaTransactionChain: false,
executionAllowed: false,
```

## runbook digest

v161 生成 `runbookDigest`：

```ts
const runbookDigest = digestRunbook({
  profileVersion: "controlled-idempotency-drill-runbook.v1",
  previousReadinessReviewDigest: previousReadinessReview.review.reviewDigest,
  javaVersionTag: JAVA_V53_IDEMPOTENCY_STORE.tag,
  javaStoreAbstractionVersion: JAVA_V53_IDEMPOTENCY_STORE.storeAbstractionVersion,
  miniKvVersionTag: MINI_KV_V62_TTL_RECOVERY.tag,
  miniKvRecoveryCapability: MINI_KV_V62_TTL_RECOVERY.capability,
  drillMode: "manual-dry-run-only",
  upstreamActionsEnabled: config.upstreamActionsEnabled,
  operatorSteps: operatorSteps.map((step) => ({
    order: step.order,
    phase: step.phase,
    evidenceTarget: step.evidenceTarget,
  })),
  forbiddenOperations: forbiddenOperations.map((operation) => operation.operation),
  checks,
});
```

这个 digest 绑定：

```text
v160 readiness review
Java v53 store abstraction
mini-kv v62 recovery evidence
operator steps
forbidden operations
runtime safety 开关
```

所以它不是单纯文档 hash，而是 runbook 的核心证据摘要。

## operator steps

v161 定义了 6 个人工步骤：

```ts
function createOperatorSteps(): ControlledIdempotencyDrillStep[] {
```

第一步是确认版本 tag：

```ts
action: "Confirm Java v53 and mini-kv v62 tags are present before starting the dry-run review.",
evidenceTarget: "git tag evidence only",
```

第二步只读检查 Java：

```ts
evidenceTarget: "GET /api/v1/ops/evidence and /contracts/order-idempotency-store-abstraction.sample.json",
expectedEvidence: "activeStore=jpa-order-idempotency-store, activeStoreMode=JPA_DATABASE, miniKvAdapterEnabled=false.",
```

第三步只读检查 mini-kv：

```ts
evidenceTarget: "fixtures/ttl-token/recovery-evidence.json and fixtures/ttl-token/index.json",
expectedEvidence: "replayDropsExpiredToken=true, snapshotLoadDropsExpiredToken=true, orderAuthoritative=false.",
```

第四步由 Node 对比：

```ts
expectedEvidence: "orderTruthSource=java-database and tokenStoreRole=disabled-ttl-token-candidate.",
```

第五步记录不授权写演练：

```ts
expectedEvidence: "POST /api/v1/orders and SETNXEX against live mini-kv remain forbidden.",
```

第六步收口归档：

```ts
evidenceTarget: "c/161 and docs/plans/v161-post-controlled-idempotency-drill-roadmap.md",
```

这里已经按新规则使用 `c/161`。

## forbidden operations

v161 明确列出 6 个禁止动作：

```ts
operation: "POST /api/v1/orders",
operation: "SETNXEX against a live mini-kv instance",
operation: "Enable mini-kv adapter in Java order creation",
operation: "UPSTREAM_ACTIONS_ENABLED=true",
operation: "Node automatically starts Java or mini-kv",
operation: "Treat mini-kv as order-authoritative storage",
```

这些不是装饰字段，而是把“当前不能做什么”固化到 runbook 里。尤其是：

```text
POST /api/v1/orders
SETNXEX against a live mini-kv instance
```

这两项防止演练文档被误解成真实写操作授权。

## checks 如何判断 ready

核心检查在：

```ts
function createChecks(
  config: AppConfig,
  previousReadinessReview: IdempotencyVerticalReadinessReviewProfile,
  operatorSteps: ControlledIdempotencyDrillStep[],
  forbiddenOperations: ControlledIdempotencyForbiddenOperation[],
): ControlledIdempotencyDrillRunbookProfile["checks"] {
```

Java 检查：

```ts
javaStoreAbstractionReady: JAVA_V53_IDEMPOTENCY_STORE.storeAbstractionVersion === "java-idempotency-store.v1"
  && JAVA_V53_IDEMPOTENCY_STORE.activeImplementation === "JpaIdempotencyStore",
javaActiveStoreDatabaseBacked: JAVA_V53_IDEMPOTENCY_STORE.activeStoreMode === "JPA_DATABASE"
  && JAVA_V53_IDEMPOTENCY_STORE.authoritativeStore === "orders table",
javaMiniKvCandidateDeclaredButDisabled: JAVA_V53_IDEMPOTENCY_STORE.miniKvAdapterCandidateDeclared
  && !JAVA_V53_IDEMPOTENCY_STORE.miniKvAdapterEnabled
  && !JAVA_V53_IDEMPOTENCY_STORE.miniKvConnected,
```

mini-kv 检查：

```ts
miniKvExpiredTokensDoNotRevive: MINI_KV_V62_TTL_RECOVERY.replayDropsExpiredToken
  && MINI_KV_V62_TTL_RECOVERY.snapshotLoadDropsExpiredToken,
miniKvRestartEvidenceReady: MINI_KV_V62_TTL_RECOVERY.replayRestoresUnexpiredToken
  && MINI_KV_V62_TTL_RECOVERY.restartMergesSnapshotAndWalTokens
  && MINI_KV_V62_TTL_RECOVERY.compactedSetExpireatRestoresTtl,
```

Node 演练检查：

```ts
drillStepsAreDryRunOnly: operatorSteps.length === 6
  && operatorSteps.every((step) => step.dryRunOnly && step.readOnly && !step.mutatesState),
forbiddenOperationsCovered: forbiddenOperations.length >= 6
  && forbiddenOperations.some((operation) => operation.operation === "POST /api/v1/orders")
  && forbiddenOperations.some((operation) => operation.operation === "SETNXEX against a live mini-kv instance"),
upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
```

因此 v161 ready 的含义是：

```text
前置 v160 ready
Java v53 抽象安全
mini-kv v62 恢复证据安全
演练步骤只读 dry-run
禁止动作清单完整
上游写开关关闭
```

## 路由注册

改动文件：

```text
src/routes/statusRoutes.ts
```

新增 import：

```ts
import {
  loadControlledIdempotencyDrillRunbook,
  renderControlledIdempotencyDrillRunbookMarkdown,
} from "../services/controlledIdempotencyDrillRunbook.js";
```

新增 route：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/controlled-idempotency-drill-runbook",
  () => Promise.resolve(loadControlledIdempotencyDrillRunbook(deps.config)),
  renderControlledIdempotencyDrillRunbookMarkdown,
);
```

仍然延续统一格式：

```text
默认 JSON
?format=markdown 输出 Markdown
```

## 测试

新增文件：

```text
test/controlledIdempotencyDrillRunbook.test.ts
```

第一个测试锁定正常 ready：

```ts
expect(profile).toMatchObject({
  profileVersion: "controlled-idempotency-drill-runbook.v1",
  runbookState: "ready-for-manual-dry-run",
  readyForControlledIdempotencyDrillRunbook: true,
  readyForProductionOperations: false,
  readOnly: true,
  dryRunOnly: true,
  executionAllowed: false,
```

并锁定 Java / mini-kv 引用：

```ts
javaVersionTag: "v53订单平台idempotency-store-abstraction",
miniKvVersionTag: "第六十二版TTL恢复证据",
orderTruthSource: "java-database",
tokenStoreRole: "disabled-ttl-token-candidate",
```

第二个测试锁定危险开关：

```ts
const profile = loadControlledIdempotencyDrillRunbook(loadTestConfig("memory://controlled-idempotency-drill-blocked", {
  UPSTREAM_ACTIONS_ENABLED: "true",
}));

expect(profile.runbookState).toBe("blocked");
expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
```

第三个测试覆盖 route：

```ts
url: "/api/v1/production/controlled-idempotency-drill-runbook"
```

Markdown 必须包含：

```ts
expect(markdown.body).toContain("v53订单平台idempotency-store-abstraction");
expect(markdown.body).toContain("第六十二版TTL恢复证据");
expect(markdown.body).toContain("START_POST_V161_PLAN");
```

## 运行调试

本版执行：

```text
npm run typecheck
npm test -- --run test/controlledIdempotencyDrillRunbook.test.ts test/idempotencyVerticalReadinessReview.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

验证结果：

```text
typecheck passed
target/related tests: 2 files, 6 tests passed
full test: 109 files, 378 tests passed
build passed
HTTP smoke passed
Chrome screenshot passed
```

HTTP smoke 关键返回：

```text
runbookState=ready-for-manual-dry-run
ready=true
blockers=0
javaTag=v53订单平台idempotency-store-abstraction
miniKvTag=第六十二版TTL恢复证据
operatorSteps=6
forbiddenOperations=6
```

归档位置：

```text
c/161/图片/controlled-idempotency-drill-runbook.png
c/161/解释/运行调试说明.md
```

本版也新增：

```text
c/README.md
```

用于记录 v161 起运行截图和解释写入 `c/` 的规则。

## 成熟度变化

v161 让当前幂等纵向切片收口：

```text
Java v52/v53
 -> 从请求指纹边界推进到 IdempotencyStore 抽象

mini-kv v61/v62
 -> 从 SETNXEX token primitive 推进到 TTL recovery evidence

Node v160/v161
 -> 从 readiness review 推进到 controlled dry-run runbook
```

这比早期只读观察台更接近生产级，因为它已经能表达：

```text
谁是订单真相源
谁只是候选 token store
哪些演练步骤可以做
哪些真实写操作不能做
下一阶段 release verification 应该如何接力
```

但它仍然不是生产上线：

```text
没有真实启用 mini-kv adapter
没有真实生产 IdP / RBAC
没有打开 UPSTREAM_ACTIONS_ENABLED
没有自动化跨项目 CI release gate
没有真实部署/回滚演练
```

所以本版之后另起新计划：

```text
docs/plans/v161-post-controlled-idempotency-drill-roadmap.md
```

下一阶段转入 release verification 和 rollback readiness。

## 一句话总结

v161 把 Java v53 的 IdempotencyStore 抽象和 mini-kv v62 的 TTL recovery evidence 合成一个只读 dry-run runbook，完成当前幂等纵向切片收口，并把后续方向切到更接近生产级的发布验证硬化。
