# 第一百五十七版代码讲解：production live probe real-read smoke read-only window capture archive

本版目标是把 v156 的 live capture 从“运行时报告”固化成“可复核 archive”。

它解决的问题是：

```text
v156 已经能记录 captured-skipped / captured-pass；
v157 要给这份 capture 一个稳定 archive digest；
同时把 Java v50 / mini-kv v59 的上游版本证据一起固定下来。
```

## 本版所处项目进度

当前阶段：

```text
Java v50：ops read-only window self description
mini-kv v59：runtime read self description
Node v155：read-only window readiness packet
Node v156：read-only window live capture
Node v157：read-only window capture archive
```

v157 仍不是生产执行。它只是把只读 capture 固化成可验证的证据链。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveProfile> {
```

它首先复用 v156 live capture：

```ts
const liveCapture = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture(input);
```

这说明 v157 不重新探测上游，也不新增 Java / mini-kv 调用；它只消费 v156 已定义好的 capture 语义。

## archive digest

本版核心是 `captureArchiveDigest`：

```ts
const captureArchiveDigest = digestArchive({
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive.v1",
  liveCaptureDigest: liveCapture.capture.liveCaptureDigest,
  readinessPacketDigest: liveCapture.capture.readinessPacketDigest,
  liveCaptureProfileVersion: liveCapture.profileVersion,
  readinessPacketProfileVersion: liveCapture.artifacts.readinessPacket.profileVersion,
  captureState: liveCapture.captureState,
  upstreamActionsEnabled: liveCapture.capture.upstreamActionsEnabled,
  archivedAsProductionPassEvidence,
  javaVersionTag: JAVA_V50_REFERENCE.tag,
  miniKvVersionTag: MINI_KV_V59_REFERENCE.tag,
  readyForProductionOperations: false,
  checks,
});
```

归档的不是大段原始文本，而是关键证据链：

```text
v156 liveCaptureDigest
v155 readinessPacketDigest
Java v50 tag
mini-kv v59 tag
checks
```

这样 v158 可以复算 digest，判断 archive 是否漂移。

## Java / mini-kv 版本引用

v157 只读核对了两个上游当前 tag，然后在 Node 中写入静态版本引用：

```ts
const JAVA_V50_REFERENCE: UpstreamVersionReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v50",
  tag: "v50订单平台ops-read-only-window-self-description",
  commitRole: "ops read-only window self description",
  evidenceKind: "ops-read-only-window-self-description",
  readOnly: true,
  executionAllowed: false,
  productionPassEvidence: false,
  runtimeFileRead: false,
});
```

mini-kv 引用：

```ts
const MINI_KV_V59_REFERENCE: UpstreamVersionReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v59",
  tag: "第五十九版运行时只读自描述",
  commitRole: "runtime read self description",
  evidenceKind: "runtime-read-self-description",
  readOnly: true,
  executionAllowed: false,
  productionPassEvidence: false,
  runtimeFileRead: false,
});
```

这里故意使用 `runtimeFileRead: false`，表示 Node 本版不去读取两个上游运行时文件，也不启动它们。

## skipped 不等于 pass

生产边界由这段逻辑控制：

```ts
const archivedAsProductionPassEvidence = liveCapture.captureState === "captured-pass"
  && liveCapture.readyForProductionPassEvidenceCandidate;
```

默认没有打开 `UPSTREAM_PROBES_ENABLED` 时，v156 是：

```text
captured-skipped
```

所以 v157 会归档为：

```text
read-only-skipped-capture-archived
readyForProductionPassEvidenceArchive=false
```

这避免 skipped capture 被误当成 production pass。

## checks 设计

核心 checks：

```ts
return {
  liveCaptureDigestValid: /^[a-f0-9]{64}$/.test(liveCapture.capture.liveCaptureDigest),
  readinessPacketDigestValid: /^[a-f0-9]{64}$/.test(liveCapture.capture.readinessPacketDigest),
  liveCaptureProfileVersionValid: liveCapture.profileVersion === "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
  readinessPacketProfileVersionValid: liveCapture.artifacts.readinessPacket.profileVersion === "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
  liveCaptureReady: liveCapture.readyForReadOnlyLiveCapture,
  capturedRecordSetComplete: liveCapture.summary.capturedRecordCount === 5,
```

安全 checks：

```ts
skippedOrMixedArchivedAsNonPass: liveCapture.captureState === "captured-pass" || !archivedAsProductionPassEvidence,
upstreamActionsStillDisabled: liveCapture.capture.upstreamActionsEnabled === false
  && liveCapture.checks.upstreamActionsStillDisabled,
noAutomaticUpstreamStart: liveCapture.capture.automaticUpstreamStart === false
  && liveCapture.checks.noAutomaticUpstreamStart,
```

以及两个上游引用：

```ts
javaV50ReferenceReady: isUpstreamVersionReferenceReady(JAVA_V50_REFERENCE),
miniKvV59ReferenceReady: isUpstreamVersionReferenceReady(MINI_KV_V59_REFERENCE),
```

## archiveState

状态计算：

```ts
if (!readyForReadOnlyCaptureArchive || captureState === "blocked") {
  return "blocked";
}
if (captureState === "captured-pass") {
  return "read-only-pass-candidate-archived";
}
if (captureState === "captured-skipped") {
  return "read-only-skipped-capture-archived";
}
return "read-only-mixed-capture-archived";
```

默认本地验证结果是：

```text
read-only-skipped-capture-archived
```

这符合当前未启动 Java / mini-kv 的安全状态。

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增 endpoint：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive
```

Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive?format=markdown
```

路由实现：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive",
  () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts
```

覆盖三类场景：

```text
默认 skipped capture 被归档为 non-pass
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown route 可访问
```

默认断言：

```ts
expect(profile).toMatchObject({
  archiveState: "read-only-skipped-capture-archived",
  readyForReadOnlyCaptureArchive: true,
  readyForProductionPassEvidenceArchive: false,
  archive: {
    captureState: "captured-skipped",
    archivedAsProductionPassEvidence: false,
    javaVersionTag: "v50订单平台ops-read-only-window-self-description",
    miniKvVersionTag: "第五十九版运行时只读自描述",
  },
});
```

blocked 场景：

```ts
UPSTREAM_ACTIONS_ENABLED: "true"
```

并断言：

```ts
expect(profile.archiveState).toBe("blocked");
expect(profile.readyForReadOnlyCaptureArchive).toBe(false);
expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
```

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

HTTP smoke 关键结果：

```text
archiveState=read-only-skipped-capture-archived
readyForReadOnlyCaptureArchive=true
readyForProductionPassEvidenceArchive=false
readyForProductionOperations=false
capturedRecordCount=5
skippedRecordCount=5
captureArchiveDigestLength=64
```

归档截图：

```text
b/157/图片/production-live-probe-real-read-smoke-read-only-window-capture-archive.png
```

## 成熟度变化

v156 是 capture，v157 是 archive。

这一步把“运行时现象”变成“可复算证据”：

```text
capture -> archive digest -> v158 verification
```

## 一句话总结

v157 把 v156 live capture、v155 readiness packet、Java v50 / mini-kv v59 版本引用固化成 capture archive，并明确 skipped/mixed capture 不能成为 production pass。
