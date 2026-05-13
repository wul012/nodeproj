# 第一百五十九版代码讲解：production live probe real-read smoke read-only window capture release evidence review

本版目标是把 Node v158、Java v51、mini-kv v60 合成一次 release evidence review。

它解决的问题是：

```text
v158 已经验证 capture archive；
Java v51 已经解释 ops evidence 字段；
mini-kv v60 已经解释 INFOJSON / STATSJSON 字段；
v159 要把三者合在一起，并明确 skipped/mixed 仍不是 production pass。
```

## 本版所处项目进度

当前阶段：

```text
Node v157：read-only window capture archive
Node v158：read-only window capture archive verification
Java v51：ops evidence field guide
mini-kv v60：runtime read field guide
Node v159：read-only capture release evidence review
```

v159 是“只读 evidence 阶段”的收口版。它完成后，下一阶段才适合选择一个真正纵向深推进的生产硬化切片。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewProfile> {
```

它首先消费 v158：

```ts
const archiveVerification = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification(input);
```

所以 v159 不重新 capture，也不直接启动 Java / mini-kv。

## Java v51 字段说明引用

Java v51 的引用：

```ts
const JAVA_V51_FIELD_GUIDE: FieldGuideReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v51",
  tag: "v51订单平台ops-evidence-field-guide",
  guideVersion: "java-ops-evidence-field-guide.v1",
  guidePath: "/contracts/ops-evidence-field-guide.sample.json",
  intendedConsumer: "Node read-only capture release evidence review",
  mayBeUsedForProductionPass: false,
  readOnly: true,
  executionAllowed: false,
  runtimeFileRead: false,
});
```

关键点是：

```text
mayBeUsedForProductionPass=false
executionAllowed=false
```

Java v51 field guide 只解释字段语义，不授权生产通过。

## mini-kv v60 字段说明引用

mini-kv v60 的引用：

```ts
const MINI_KV_V60_FIELD_GUIDE: FieldGuideReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v60",
  tag: "第六十版运行时只读字段说明",
  guideVersion: "mini-kv-runtime-read-field-guide.v1",
  guidePath: "fixtures/readonly/runtime-read-field-guide.json",
  intendedConsumer: "Node v159 read-only capture release evidence review",
  mayBeUsedForProductionPass: false,
  readOnly: true,
  executionAllowed: false,
  runtimeFileRead: false,
});
```

同样，mini-kv v60 是解释证据，不是订单权威存储，也不是写操作入口。

## release review digest

v159 生成 `releaseReviewDigest`：

```ts
const releaseReviewDigest = digestReview({
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-release-evidence-review.v1",
  archiveVerificationDigest: archiveVerification.verification.verificationDigest,
  captureArchiveDigest: archiveVerification.verification.captureArchiveDigest,
  archiveVerificationState: archiveVerification.verificationState,
  captureState: archiveVerification.verification.captureState,
  archivedAsProductionPassEvidence: archiveVerification.verification.archivedAsProductionPassEvidence,
  releaseSemantics,
  javaFieldGuideTag: JAVA_V51_FIELD_GUIDE.tag,
  javaFieldGuideVersion: JAVA_V51_FIELD_GUIDE.guideVersion,
  miniKvFieldGuideTag: MINI_KV_V60_FIELD_GUIDE.tag,
  miniKvFieldGuideVersion: MINI_KV_V60_FIELD_GUIDE.guideVersion,
  upstreamActionsEnabled: archiveVerification.verification.upstreamActionsEnabled,
  readyForProductionOperations: false,
  checks,
});
```

这个 digest 把三项目证据合成一个 Node 侧 release review 结果。

## releaseSemantics

release semantics 的判断：

```ts
const releaseSemantics = archiveVerification.verification.archivedAsProductionPassEvidence
  ? "pass-candidate-gated"
  : "non-pass-local-evidence";
```

当前默认没有启动 Java / mini-kv，所以 v156 是 skipped capture，v159 结果是：

```text
non-pass-local-evidence
readyForProductionPassEvidence=false
```

## checks 设计

核心 checks：

```ts
archiveVerificationReady: archiveVerification.readyForReadOnlyCaptureArchiveVerification,
archiveVerificationDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.verification.verificationDigest),
captureArchiveDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.verification.captureArchiveDigest),
archiveVerificationProfileVersionValid: archiveVerification.profileVersion === "production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.v1",
archiveVerificationChecksAllPassed: archiveVerification.summary.verificationCheckCount === archiveVerification.summary.passedVerificationCheckCount,
```

上游字段说明 checks：

```ts
javaV51FieldGuideReady: isFieldGuideReferenceReady(JAVA_V51_FIELD_GUIDE),
miniKvV60FieldGuideReady: isFieldGuideReferenceReady(MINI_KV_V60_FIELD_GUIDE),
javaFieldGuideExplainsNonPassOnly: !JAVA_V51_FIELD_GUIDE.mayBeUsedForProductionPass
  && JAVA_V51_FIELD_GUIDE.executionAllowed === false,
miniKvFieldGuideExplainsNonPassOnly: !MINI_KV_V60_FIELD_GUIDE.mayBeUsedForProductionPass
  && MINI_KV_V60_FIELD_GUIDE.executionAllowed === false,
```

安全边界 checks：

```ts
skippedOrMixedNotProductionPass: archiveVerification.verification.captureState === "captured-pass"
  || archiveVerification.verification.archivedAsProductionPassEvidence === false,
upstreamActionsStillDisabled: archiveVerification.verification.upstreamActionsEnabled === false
  && archiveVerification.checks.upstreamActionsStillDisabled,
noAutomaticUpstreamStart: archiveVerification.verification.automaticUpstreamStart === false
  && archiveVerification.checks.noAutomaticUpstreamStart,
readyForProductionOperationsStillFalse: archiveVerification.readyForProductionOperations === false,
releaseReviewDoesNotAuthorizeExecution: true,
```

## reviewState

状态计算：

```ts
if (!readyForReview || archiveVerification.verificationState === "blocked") {
  return "blocked";
}
if (archiveVerification.verificationState === "verified-read-only-pass-candidate-archive") {
  return "reviewed-read-only-pass-candidate";
}
if (archiveVerification.verificationState === "verified-read-only-skipped-capture-archive") {
  return "reviewed-read-only-skipped-capture";
}
return "reviewed-read-only-mixed-capture";
```

当前默认结果：

```text
reviewed-read-only-skipped-capture
```

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增 endpoint：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review
```

Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review?format=markdown
```

路由代码：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review",
  () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.test.ts
```

覆盖三类场景：

```text
默认 skipped capture review 成功
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown route 可访问
```

默认断言：

```ts
expect(profile).toMatchObject({
  reviewState: "reviewed-read-only-skipped-capture",
  readyForReadOnlyCaptureReleaseEvidenceReview: true,
  readyForProductionPassEvidence: false,
  readyForProductionOperations: false,
  review: {
    releaseSemantics: "non-pass-local-evidence",
    javaFieldGuideTag: "v51订单平台ops-evidence-field-guide",
    miniKvFieldGuideTag: "第六十版运行时只读字段说明",
  },
});
```

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

HTTP smoke 关键结果：

```text
reviewState=reviewed-read-only-skipped-capture
readyForReadOnlyCaptureReleaseEvidenceReview=true
readyForProductionPassEvidence=false
readyForProductionOperations=false
releaseReviewDigestLength=64
```

归档截图：

```text
b/159/图片/production-live-probe-real-read-smoke-read-only-window-capture-release-evidence-review.png
```

## 成熟度变化

v159 完成后，Node 侧只读 evidence 阶段已经形成闭环：

```text
capture -> archive -> verification -> release review
```

下一阶段不应该继续堆浅层 evidence，而应该进入一个小的纵向生产硬化切片，例如：

```text
Java 订单幂等边界
mini-kv TTL token primitive
Node 纵向 readiness review
```

## 一句话总结

v159 把 v158 archive verification、Java v51 field guide、mini-kv v60 field guide 合成 release evidence review，并明确当前 skipped capture 只是 local evidence，不是 production pass。
