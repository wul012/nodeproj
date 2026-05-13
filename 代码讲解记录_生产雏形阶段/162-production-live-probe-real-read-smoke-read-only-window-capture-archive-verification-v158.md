# 第一百五十八版代码讲解：production live probe real-read smoke read-only window capture archive verification

本版目标是复核 v157 capture archive。

它解决的问题是：

```text
v157 已经生成 captureArchiveDigest；
v158 要重新计算 digest，确认 archive 没漂移；
同时再次确认 skipped/mixed capture 不能进入 production pass。
```

## 本版所处项目进度

当前阶段：

```text
Node v156：read-only window live capture
Node v157：read-only window capture archive
Node v158：read-only window capture archive verification
Java v51 + mini-kv v60：下一步补只读证据解释
```

v158 是 Node 侧证据链收口版。它完成后，才比较适合让 Java / mini-kv 补后续解释型 evidence。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationProfile> {
```

它先消费 v157 archive：

```ts
const archive = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive(input);
```

所以 v158 不直接重做 capture，也不直接读取 Java / mini-kv。它验证的是 v157 archive 产物。

## digest 复算

v158 使用与 v157 相同的 digest 输入结构复算：

```ts
const expectedCaptureArchiveDigest = digestArchive({
  profileVersion: archive.profileVersion,
  liveCaptureDigest: archive.archive.liveCaptureDigest,
  readinessPacketDigest: archive.archive.readinessPacketDigest,
  liveCaptureProfileVersion: archive.archive.liveCaptureProfileVersion,
  readinessPacketProfileVersion: archive.archive.readinessPacketProfileVersion,
  captureState: archive.archive.captureState,
  upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
  archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
  javaVersionTag: archive.archive.javaVersionTag,
  miniKvVersionTag: archive.archive.miniKvVersionTag,
  readyForProductionOperations: false,
  checks: archive.checks,
});
```

然后比较：

```ts
captureArchiveDigestMatches: archive.archive.captureArchiveDigest === expectedCaptureArchiveDigest,
```

这就是 v158 的核心价值：v157 archive 不是“只生成一次”，而是能被重新计算。

## verification digest

验证本身也生成独立 digest：

```ts
const verificationDigest = digestVerification({
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.v1",
  captureArchiveDigest: archive.archive.captureArchiveDigest,
  expectedCaptureArchiveDigest,
  archiveState: archive.archiveState,
  verificationState,
  captureState: archive.archive.captureState,
  archivedAsProductionPassEvidence: archive.archive.archivedAsProductionPassEvidence,
  javaVersionTag: archive.archive.javaVersionTag,
  miniKvVersionTag: archive.archive.miniKvVersionTag,
  readyForProductionOperations: false,
  checks,
});
```

这让下一版 Node v159 可以引用 v158 verification digest。

## checks 设计

核心 archive checks：

```ts
captureArchiveDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.captureArchiveDigest),
captureArchiveDigestMatches: archive.archive.captureArchiveDigest === expectedCaptureArchiveDigest,
archiveProfileVersionValid: archive.profileVersion === "production-live-probe-real-read-smoke-read-only-window-capture-archive.v1",
archiveReadyForVerification: archive.readyForReadOnlyCaptureArchive,
archiveChecksAllPassed: archive.summary.archiveCheckCount === archive.summary.passedArchiveCheckCount,
archiveProductionBlockersClear: archive.summary.productionBlockerCount === 0,
```

上游版本引用 checks：

```ts
javaV50ReferenceReady: archive.artifacts.javaReference.tag === "v50订单平台ops-read-only-window-self-description"
  && archive.artifacts.javaReference.readOnly
  && !archive.artifacts.javaReference.executionAllowed,
miniKvV59ReferenceReady: archive.artifacts.miniKvReference.tag === "第五十九版运行时只读自描述"
  && archive.artifacts.miniKvReference.readOnly
  && !archive.artifacts.miniKvReference.executionAllowed,
```

安全边界 checks：

```ts
skippedOrMixedNotProductionPass: archive.archive.captureState === "captured-pass"
  || archive.archive.archivedAsProductionPassEvidence === false,
upstreamActionsStillDisabled: archive.archive.upstreamActionsEnabled === false
  && archive.checks.upstreamActionsStillDisabled,
noAutomaticUpstreamStart: archive.archive.automaticUpstreamStart === false
  && archive.checks.noAutomaticUpstreamStart,
readyForProductionOperationsStillFalse: archive.readyForProductionOperations === false,
```

## verificationState

状态计算：

```ts
if (!readyForVerification || archive.archiveState === "blocked") {
  return "blocked";
}
if (archive.archiveState === "read-only-pass-candidate-archived") {
  return "verified-read-only-pass-candidate-archive";
}
if (archive.archiveState === "read-only-skipped-capture-archived") {
  return "verified-read-only-skipped-capture-archive";
}
return "verified-read-only-mixed-capture-archive";
```

默认本地结果是：

```text
verified-read-only-skipped-capture-archive
```

这和当前没有启动 Java / mini-kv 的事实一致。

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增 endpoint：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification
```

Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification?format=markdown
```

路由代码：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification",
  () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts
```

覆盖三类场景：

```text
默认 skipped archive digest 能复算并验证
source archive blocked 时 verification blocked
JSON / Markdown route 可访问
```

默认断言：

```ts
expect(profile).toMatchObject({
  verificationState: "verified-read-only-skipped-capture-archive",
  readyForReadOnlyCaptureArchiveVerification: true,
  verification: {
    archiveState: "read-only-skipped-capture-archived",
    captureState: "captured-skipped",
    archivedAsProductionPassEvidence: false,
  },
  checks: {
    captureArchiveDigestMatches: true,
    skippedOrMixedNotProductionPass: true,
  },
});
```

并明确：

```ts
expect(profile.verification.captureArchiveDigest).toBe(profile.verification.expectedCaptureArchiveDigest);
```

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

HTTP smoke 关键结果：

```text
verificationState=verified-read-only-skipped-capture-archive
readyForReadOnlyCaptureArchiveVerification=true
readyForProductionOperations=false
captureArchiveDigestMatches=true
skippedOrMixedNotProductionPass=true
verificationDigestLength=64
```

归档截图：

```text
b/158/图片/production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.png
```

## 成熟度变化

v157 是 archive，v158 是 verification。

这一步后，Node 侧的只读窗口证据链已经有了：

```text
live capture -> capture archive -> archive verification
```

因此下一步不必继续堆 Node archive 小版本，而应该让 Java v51 和 mini-kv v60 补只读证据解释，给 Node v159 release evidence review 提供更清楚的上游说明。

## 一句话总结

v158 复算并验证 v157 capture archive digest，确认 skipped/mixed capture 仍然不能成为 production pass，并把 Node 侧只读窗口证据链收口到可引用状态。
