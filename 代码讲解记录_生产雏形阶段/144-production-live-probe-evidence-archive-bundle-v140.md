# 第一百四十版代码讲解：production live probe evidence archive bundle

本版目标是把 live probe evidence archive 阶段收成一个可交付证据包。

它不是 summary。

本版继续遵守规则：

```text
小增量做 archive / verification / evidence record / bundle
阶段总收口才做 summary
```

所以 v140 新增的是：

```text
production-live-probe-evidence-archive-bundle.v1
```

而不是 `production-readiness-summary.v14`。

## 本版所处项目进度

v138 做了 archive record。

v139 做了 archive verification。

v140 做的是：

```text
把 archive record + verification + 截图/说明引用打包
输出 bundle digest
明确 skipped evidence 不是 production pass
```

## 新增服务

新增文件：

```text
src/services/productionLiveProbeEvidenceArchiveBundle.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeEvidenceArchiveBundle(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeEvidenceArchiveBundleProfile> {
```

它读取两个前置 artifact：

```ts
const archive = await loadProductionLiveProbeEvidenceArchive(input);
const verification = await loadProductionLiveProbeEvidenceArchiveVerification(input);
```

对应：

```text
archive -> v138
verification -> v139
```

## referenced files

v140 还把运行归档文件作为 evidence refs：

```ts
const refs: Array<Omit<ProductionLiveProbeArchiveBundleFileRef, "exists">> = [
  {
    id: "v138-screenshot",
    role: "source-evidence",
    path: "b/138/图片/production-live-probe-evidence-archive.png",
    requiredNow: true,
  },
  {
    id: "v138-runbook",
    role: "source-evidence",
    path: "b/138/解释/运行调试说明.md",
    requiredNow: true,
  },
```

v139 也一样：

```text
b/139/图片/production-live-probe-evidence-archive-verification.png
b/139/解释/运行调试说明.md
```

v140 自己的截图和说明是 bundle output：

```text
b/140/图片/production-live-probe-evidence-archive-bundle.png
b/140/解释/运行调试说明.md
```

## source 文件检查

本版只要求 v138/v139 的 source evidence 已经存在：

```ts
const requiredFiles = referencedFiles.filter((file) => file.requiredNow);
```

检查：

```ts
sourceArtifactFilesExist: requiredFiles.every((file) => file.exists),
```

这样 v140 生成自己的截图之前，不会因为自己的输出文件尚未存在而失败。

## bundle checks

核心检查：

```ts
archiveRecordReady: archive.readyForArchiveRecord,
archiveVerificationReady: verification.readyForArchiveVerification,
archiveDigestValid: archive.checks.archiveDigestValid,
verificationDigestValid: verification.checks.verificationDigestValid,
archiveDigestMatchesVerification: archive.archive.archiveDigest === verification.verification.archiveDigest,
sourceArtifactRefsPresent: requiredFiles.length === 4,
sourceArtifactFilesExist: requiredFiles.every((file) => file.exists),
noWriteProbeAttempted: archive.archive.writeProbeAttempted === false
  && verification.verification.writeProbeAttempted === false
  && verification.checks.noWriteProbeAttempted,
upstreamActionsStillDisabled: archive.archive.upstreamActionsEnabled === false
  && verification.checks.upstreamActionsStillDisabled,
skippedEvidenceNotProductionPass: archive.checks.skippedEvidenceNotProductionPass
  && verification.checks.skippedEvidenceNotProductionPass
  && archive.readyForProductionOperations === false
  && verification.readyForProductionOperations === false,
```

它把 v138/v139 的关键安全边界再核一次。

## bundle digest

本版输出 bundle digest：

```ts
const bundleDigest = digestBundle({
  profileVersion: "production-live-probe-evidence-archive-bundle.v1",
  archiveDigest: archive.archive.archiveDigest,
  verificationDigest: verification.verification.verificationDigest,
  liveProbeEvidenceMode: archive.archive.liveProbeEvidenceMode,
  plannedProbeCount: archive.archive.plannedProbeCount,
  skippedProbeCount: archive.archive.skippedProbeCount,
  sourceArtifacts: [
    archive.profileVersion,
    verification.profileVersion,
  ],
  referencedFiles: referencedFiles.map((file) => ({
    id: file.id,
    path: file.path,
    requiredNow: file.requiredNow,
    exists: file.exists,
  })),
  skippedEvidenceNotProductionPass: checks.skippedEvidenceNotProductionPass,
  readyForProductionOperations: false,
  checks: {
    ...checks,
    bundleDigestValid: undefined,
    readyForArchiveBundle: checks.readyForArchiveBundle,
  },
});
```

本次 smoke 得到：

```text
89842e482d60080e0c776e4c3640187f7701700158d4aa7bdddb60d0958642c1
```

## skipped 不是 production pass

bundle 里继续保留：

```ts
skippedEvidenceNotProductionPass: checks.skippedEvidenceNotProductionPass,
readyForProductionOperations: false,
```

warning 也明确：

```ts
code: "LIVE_PROBE_BUNDLE_SKIPPED_NOT_PRODUCTION_PASS",
message: "Bundle contains skipped live probe evidence for local archive closeout, not production pass evidence.",
```

这保证 bundle 可以作为本地归档闭环，但不能被误用成生产放行证明。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-evidence-archive/bundle
GET /api/v1/production/live-probe-evidence-archive/bundle?format=markdown
```

路由代码：

```ts
const profile = await loadProductionLiveProbeEvidenceArchiveBundle({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

默认 `UPSTREAM_PROBES_ENABLED=false`，所以仍然不访问 Java / mini-kv。

## 测试覆盖

新增测试：

```text
test/productionLiveProbeEvidenceArchiveBundle.test.ts
```

核心断言：

```ts
expect(bundle).toMatchObject({
  profileVersion: "production-live-probe-evidence-archive-bundle.v1",
  readyForArchiveBundle: true,
  readyForProductionOperations: false,
  bundle: {
    liveProbeEvidenceMode: "skipped",
    plannedProbeCount: 5,
    skippedProbeCount: 5,
    sourceArtifactCount: 2,
    referencedPathCount: 6,
    skippedEvidenceNotProductionPass: true,
  },
});
```

还覆盖：

```text
archive verification 不完整时 bundle blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe evidence archive bundle
GET /api/v1/production/live-probe-evidence-archive/bundle
GET /api/v1/production/live-probe-evidence-archive/bundle?format=markdown
```

当前计划收口：

```text
docs/plans/v137-production-live-probe-evidence-roadmap.md
```

新计划：

```text
docs/plans/v140-live-probe-handoff-roadmap.md
```

归档：

```text
b/140/图片/production-live-probe-evidence-archive-bundle.png
b/140/解释/运行调试说明.md
```

## 一句话总结

v140 把 v138 archive record 和 v139 verification 打成一个 live probe evidence archive bundle：有 bundle digest，有截图/说明引用，有 skipped-not-production-pass 保护；它不新增 summary，不触碰 Java / mini-kv，不放开生产执行。
