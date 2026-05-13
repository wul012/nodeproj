# 第一百五十二版代码讲解：production pass evidence archive verification

本版目标是验证 v150 archive，并把 Java v49 / mini-kv v58 的只读 evidence 版本证据接入 Node 的生产前证据链。

它解决的问题是：

```text
v150 已经有 archiveDigest；
Java v49 已经提供 ops read-only evidence sample；
mini-kv v58 已经提供 readonly fixture pack；
v152 要确认 archive digest 可复算，并把两个上游版本证据纳入 verification。
```

## 本版所处项目进度

当前全局计划已经从 Node 单线推进回三项目协作：

```text
Node v150：archive
Node v151：共享工具收口
Java v49：ops read-only evidence sample
mini-kv v58：readonly evidence fixtures
Node v152：archive verification
```

v152 不代表生产可执行，只代表：

```text
Node archive 可复核
Java / mini-kv 只读证据可被引用
skipped evidence 仍不能冒充 pass
production operations 仍关闭
```

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationProfile> {
```

它先读取 v150 archive：

```ts
const archive = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchive(input);
```

这里没有启动 Java / mini-kv，也没有执行上游写操作。

## archive digest 复算

v152 用和 v150 相同的字段重新计算 archive digest：

```ts
const expectedArchiveDigest = digestArchive({
  profileVersion: archive.profileVersion,
  verificationDigest: archive.archive.verificationDigest,
  captureDigest: archive.archive.captureDigest,
  releaseEvidenceGateDigest: archive.archive.releaseEvidenceGateDigest,
  archiveState: archive.archiveState,
  archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
  verificationState: archive.archive.verificationState,
  captureMode: archive.archive.captureMode,
  releaseGateDecision: archive.archive.releaseGateDecision,
  upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
  readyForProductionOperations: archive.readyForProductionOperations,
  checks: archive.checks,
});
```

然后检查：

```ts
archiveDigestMatches: archive.archive.archiveDigest === expectedArchiveDigest,
```

这让 v152 不只是转述 v150，而是真正复核 archive fingerprint。

## 上游证据引用

Java v49 引用：

```ts
const JAVA_V49_EVIDENCE: UpstreamEvidenceReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v49",
  tag: "v49订单平台ops-read-only-evidence-sample",
  commitRole: "ops read-only evidence sample",
  evidenceKind: "ops-read-only-evidence-sample",
  samplePaths: [
    "/contracts/ops-read-only-evidence.sample.json",
    "/api/v1/ops/evidence",
    "/api/v1/failed-events/replay-evidence-index",
  ],
  readOnly: true,
  executionAllowed: false,
  productionPassEvidence: false,
  runtimeFileRead: false,
});
```

mini-kv v58 引用：

```ts
const MINI_KV_V58_EVIDENCE: UpstreamEvidenceReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v58",
  tag: "第五十八版只读证据样本包",
  commitRole: "readonly evidence fixtures",
  evidenceKind: "readonly-fixture-pack",
  samplePaths: [
    "fixtures/readonly/index.json",
    "fixtures/readonly/infojson-empty-inline.json",
    "fixtures/readonly/statsjson-empty-inline.json",
    "fixtures/checkjson/get-orderops-read-contract.json",
  ],
  readOnly: true,
  executionAllowed: false,
  productionPassEvidence: false,
  runtimeFileRead: false,
});
```

关键边界是：

```text
runtimeFileRead=false
```

这表示 Node runtime 不依赖本机 `D:\javaproj` 或 `D:\C\mini-kv` 文件路径。跨项目文件存在性由开发时只读核对完成；Node 服务只保存版本化引用。

## checks 设计

核心 checks：

```ts
const checks = {
  archiveDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.archiveDigest),
  archiveDigestMatches: archive.archive.archiveDigest === expectedArchiveDigest,
  archiveProfileVersionValid: archive.profileVersion === "production-live-probe-real-read-smoke-production-pass-evidence-archive.v1",
  archiveReadyForVerification: archive.readyForProductionPassEvidenceArchive,
  archiveChecksAllPassed: archive.summary.archiveCheckCount === archive.summary.passedArchiveCheckCount,
  archiveProductionBlockersClear: archive.summary.productionBlockerCount === 0,
  skippedOrMixedRemainsNonPass: archive.archive.captureMode === "pass"
    || archive.archive.archivedAsProductionPassEvidence === false,
  upstreamActionsStillDisabled: archive.archive.upstreamActionsEnabled === false
    && archive.checks.upstreamActionsStillDisabled,
  noAutomaticUpstreamStart: archive.archive.automaticUpstreamStart === false
    && archive.checks.noAutomaticUpstreamStart,
  readyForProductionOperationsStillFalse: archive.readyForProductionOperations === false,
  javaV49EvidenceReferenceReady: isUpstreamEvidenceReferenceReady(JAVA_V49_EVIDENCE),
  miniKvV58EvidenceReferenceReady: isUpstreamEvidenceReferenceReady(MINI_KV_V58_EVIDENCE),
  upstreamEvidenceReady: false,
  readyForArchiveVerification: false,
};
```

其中最关键的边界：

```text
skippedOrMixedRemainsNonPass
upstreamActionsStillDisabled
readyForProductionOperationsStillFalse
javaV49EvidenceReferenceReady
miniKvV58EvidenceReferenceReady
```

所以 v152 即使能验证 archive，也不会解锁生产执行。

## verificationState

状态计算：

```ts
const verificationState = !checks.readyForArchiveVerification || archive.archiveState === "blocked"
  ? "blocked"
  : archive.archive.archivedAsProductionPassEvidence
    ? "verified-production-pass-archive"
    : "verified-non-pass-archive";
```

当前默认没有真实上游 pass capture，因此正常结果是：

```text
verified-non-pass-archive
```

这表示 archive 可复核，但仍然不是 production pass。

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增路由：

```text
/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification
```

Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification?format=markdown
```

路由复用 v151 的注册辅助：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification",
  () => loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationMarkdown,
);
```

这也验证了 v151 的重构是有价值的：v152 新 endpoint 不再复制整段 JSON / Markdown route 模板。

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.test.ts
```

覆盖四类场景：

```text
默认 skipped archive -> verified-non-pass-archive
模拟 all-pass archive -> verified-production-pass-archive
UPSTREAM_ACTIONS_ENABLED=true -> blocked
JSON / Markdown route -> 200
```

默认场景断言：

```ts
expect(profile).toMatchObject({
  verificationState: "verified-non-pass-archive",
  readyForArchiveVerification: true,
  readyForProductionOperations: false,
  verification: {
    upstreamEvidenceReady: true,
    runtimeFileRead: false,
    upstreamActionsEnabled: false,
  },
});
```

并确认两个上游 tag：

```ts
expect(profile.artifacts.javaEvidence).toMatchObject({
  tag: "v49订单平台ops-read-only-evidence-sample",
});

expect(profile.artifacts.miniKvEvidence).toMatchObject({
  tag: "第五十八版只读证据样本包",
});
```

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.test.ts
npm test -- --run archive/capture/gate 相关测试
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

全量测试结果：

```text
100 files, 347 tests passed
```

HTTP smoke 关键结果：

```text
verificationState=verified-non-pass-archive
readyForArchiveVerification=true
readyForProductionOperations=false
upstreamEvidenceReady=true
archiveDigestMatches=true
verificationDigestLength=64
```

归档截图：

```text
b/152/图片/production-pass-evidence-archive-verification.png
```

## 成熟度变化

v152 让三项目证据链第一次形成清晰闭环：

```text
Java v49 -> ops read-only evidence sample
mini-kv v58 -> readonly fixture pack
Node v150 -> archive
Node v152 -> archive verification + upstream evidence references
```

这让 Node 控制面更接近生产级流程：先看版本化证据，再做 verification，再进入 operator runbook，而不是直接打开真实执行。

## 一句话总结

v152 把 v150 archive 从“可归档”推进到“可复核”，并把 Java v49 与 mini-kv v58 的只读证据作为静态版本引用纳入 Node 的生产前证据链。
