# 第一百四十八版代码讲解：production live probe real-read smoke evidence capture

本版目标是把 v147 之后的真实只读 smoke 结果固化成 capture evidence。

它解决的问题是：

```text
v147 只有 dry-run command package；
v148 要真正形成 capture 记录；
但默认不启动 Java / mini-kv；
未打开真实只读窗口时只能是 skipped/mixed，不能伪装 pass。
```

## 本版所处项目进度

v144-v147 已完成：

```text
execution request
result importer
release evidence gate
dry-run command package
```

v148 做：

```text
real-read smoke evidence capture
```

它是 v149 verification 的输入。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeEvidenceCapture.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeEvidenceCapture(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile> {
```

它读取三个主要来源：

```ts
const dryRunPackage = await loadProductionLiveProbeRealReadSmokeDryRunCommandPackage(input);
const resultImporter = await loadProductionLiveProbeRealReadSmokeResultImporter(input);
const releaseGate = await loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(input);
```

这里没有启动 Java / mini-kv，只是复用现有只读证据链。

## capture 字段

核心 capture：

```ts
capture: {
  captureDigest,
  dryRunPackageDigest: dryRunPackage.package.packageDigest,
  archiveAdapterDigest: resultImporter.importEnvelope.sourceArchiveAdapterDigest,
  resultImportDigest: resultImporter.importEnvelope.importDigest,
  releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
  releaseGateDecision: releaseGate.gateDecision,
  captureMode,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  readOnlyWindowOpen: input.config.upstreamProbesEnabled,
  automaticUpstreamStart: false,
  mutatesUpstreamState: false,
  importedRecordCount: resultImporter.summary.importedRecordCount,
  passRecordCount: resultImporter.summary.acceptedPassRecordCount,
  skippedRecordCount: resultImporter.summary.acceptedSkippedRecordCount,
  rejectedRecordCount: resultImporter.summary.rejectedRecordCount,
},
```

几个关键边界：

```text
automaticUpstreamStart=false
mutatesUpstreamState=false
upstreamActionsEnabled=false
```

这说明 Node 只捕获证据，不管理上游生命周期。

## captureMode

captureMode 的判断：

```ts
function determineCaptureMode(
  resultImporter: Awaited<ReturnType<typeof loadProductionLiveProbeRealReadSmokeResultImporter>>,
): ProductionLiveProbeRealReadSmokeEvidenceCaptureProfile["capture"]["captureMode"] {
  if (resultImporter.summary.rejectedRecordCount > 0) {
    return "blocked";
  }
  if (resultImporter.summary.importedRecordCount > 0
    && resultImporter.summary.acceptedPassRecordCount === resultImporter.summary.importedRecordCount) {
    return "pass";
  }
  if (resultImporter.summary.acceptedSkippedRecordCount === resultImporter.summary.importedRecordCount) {
    return "skipped";
  }
  return "mixed";
}
```

所以本版能区分：

```text
all pass -> pass
all skipped -> skipped
pass + skipped -> mixed
rejected -> blocked
```

## capturedRecords

每条 importer record 会变成 capture record：

```ts
function createCapturedRecord(record: ProductionLiveProbeImportedResultRecord): ProductionLiveProbeCapturedRecord {
  return {
    id: record.id,
    captureStatus: record.importStatus === "accepted-pass"
      ? "captured-pass"
      : record.importStatus === "accepted-skipped"
        ? "captured-skipped"
        : "captured-rejected",
    sourceStatus: record.sourceStatus,
    importStatus: record.importStatus,
    readOnly: true,
    mutatesState: false,
    attempted: record.attempted,
    message: record.message,
    evidenceSummary: record.evidenceSummary,
  };
}
```

这让最终报告不是只有 summary，而是能看到五条实际 probe：

```text
java-actuator-health
java-ops-overview
mini-kv-health
mini-kv-infojson
mini-kv-statsjson
```

## checks

核心 checks：

```ts
dryRunPackageDigestValid: /^[a-f0-9]{64}$/.test(dryRunPackage.package.packageDigest),
archiveAdapterReady: resultImporter.checks.sourceArchiveAdapterReady,
resultImporterReady: resultImporter.readyForResultImport,
releaseEvidenceGateReady: releaseGate.readyForReleaseEvidenceGate,
allExpectedRecordsCaptured: capturedRecords.length === 5,
allCapturedRecordsAccepted: capturedRecords.every((record) => record.captureStatus !== "captured-rejected"),
noWriteEvidenceCaptured: capturedRecords.every((record) => record.readOnly && !record.mutatesState),
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
  && resultImporter.checks.upstreamActionsStillDisabled
  && releaseGate.checks.upstreamActionsStillDisabled,
noAutomaticUpstreamStart: true,
passRequiresProbeWindowOpen: resultImporter.summary.acceptedPassRecordCount !== resultImporter.summary.importedRecordCount
  || input.config.upstreamProbesEnabled === true,
skippedOrMixedNotProductionPass: releaseGate.readyForProductionPassEvidence
  || resultImporter.summary.acceptedSkippedRecordCount > 0
  || resultImporter.summary.rejectedRecordCount > 0,
```

readiness：

```ts
checks.readyForEvidenceCapture = checks.dryRunPackageDigestValid
  && checks.archiveAdapterReady
  && checks.resultImporterReady
  && checks.releaseEvidenceGateReady
  && checks.allExpectedRecordsCaptured
  && checks.allCapturedRecordsAccepted
  && checks.noWriteEvidenceCaptured
  && checks.upstreamActionsStillDisabled
  && checks.noAutomaticUpstreamStart
  && checks.passRequiresProbeWindowOpen
  && checks.skippedOrMixedNotProductionPass;
```

pass candidate：

```ts
checks.readyForProductionPassEvidenceCandidate = checks.readyForEvidenceCapture
  && releaseGate.readyForProductionPassEvidence
  && releaseGate.gateDecision === "production-pass-evidence-ready";
```

所以：

```text
skipped/mixed -> readyForProductionPassEvidenceCandidate=false
all-pass + probe window open -> true
```

## captureState

返回状态：

```ts
captureState: productionBlockers.length > 0
  ? "blocked"
  : captureMode === "pass"
    ? "captured-pass"
    : captureMode === "mixed"
      ? "captured-mixed"
      : "captured-skipped",
```

本次默认环境：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

所以结果是：

```text
captureState=captured-skipped
readyForEvidenceCapture=true
readyForProductionPassEvidenceCandidate=false
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-real-read-smoke-evidence-capture
GET /api/v1/production/live-probe-real-read-smoke-evidence-capture?format=markdown
```

路由注册在：

```text
src/routes/statusRoutes.ts
```

核心调用：

```ts
const profile = await loadProductionLiveProbeRealReadSmokeEvidenceCapture({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

Markdown 分支：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderProductionLiveProbeRealReadSmokeEvidenceCaptureMarkdown(profile);
}
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeEvidenceCapture.test.ts
```

覆盖默认 skipped：

```ts
expect(profile).toMatchObject({
  captureState: "captured-skipped",
  readyForEvidenceCapture: true,
  readyForProductionPassEvidenceCandidate: false,
  capture: {
    captureMode: "skipped",
    upstreamProbesEnabled: false,
    upstreamActionsEnabled: false,
    automaticUpstreamStart: false,
    skippedRecordCount: 5,
  },
});
```

覆盖 all-pass：

```ts
expect(profile).toMatchObject({
  captureState: "captured-pass",
  readyForEvidenceCapture: true,
  readyForProductionPassEvidenceCandidate: true,
  capture: {
    releaseGateDecision: "production-pass-evidence-ready",
    captureMode: "pass",
    upstreamProbesEnabled: true,
    readOnlyWindowOpen: true,
    passRecordCount: 5,
    skippedRecordCount: 0,
  },
});
```

这个 all-pass 测试使用 fake 上游 client，不启动真实 Java / mini-kv，但能证明 capture 机制在只读窗口打开时能形成 pass candidate。

还覆盖：

```text
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown 路由可访问
```

## 旧测试调整

本版还调整了几条重 evidence route 测试的 timeout：

```text
test/productionLiveProbeRealReadSmokeResultImporter.test.ts
test/productionLiveProbeRealReadSmokeReleaseEvidenceGate.test.ts
test/productionLiveProbeRealReadSmokeDryRunCommandPackage.test.ts
```

原因是这些测试会穿过多层 evidence 服务，在全量 Vitest 并发下 10 秒预算偏紧。

改动只放宽测试时间预算，没有放宽业务断言。

## README、计划和归档

README 新增：

```text
Production live probe real-read smoke evidence capture
GET /api/v1/production/live-probe-real-read-smoke-evidence-capture
GET /api/v1/production/live-probe-real-read-smoke-evidence-capture?format=markdown
```

计划文档更新：

```text
docs/plans/v146-production-pass-evidence-roadmap.md
Node v148 状态：已由 Node v148 完成。
```

归档：

```text
b/148/图片/production-live-probe-real-read-smoke-evidence-capture.png
b/148/解释/运行调试说明.md
```

## 一句话总结

v148 把 real-read smoke 的 skipped / mixed / pass 结果固化成 capture evidence：默认不启动 Java / mini-kv 时稳定输出 captured-skipped；真实只读窗口打开后，同一套机制可以记录 all-pass candidate，再交给 v149 做生产通过证据验证。
