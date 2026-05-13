# 第一百三十九版代码讲解：production live probe evidence archive verification

本版目标是给 v138 的 live probe evidence archive record 增加 verification。

它不是 summary。

本版继续遵守规则：

```text
小增量做 archive / verification / evidence record
阶段收口才做 summary
```

所以 v139 新增的是：

```text
production-live-probe-evidence-archive-verification.v1
```

## 本版所处项目进度

v138 已经把 v135 contract、v136 smoke harness、v137 summary v13 封装成 archive record。

v139 做的是：

```text
复核 archive digest
复核版本引用
复核 probe 数量
复核 no-write 边界
复核 skipped evidence 不能当 production pass
```

## 新增服务

新增文件：

```text
src/services/productionLiveProbeEvidenceArchiveVerification.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeEvidenceArchiveVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeEvidenceArchiveVerificationProfile> {
```

它的第一步是加载 v138：

```ts
const archive = await loadProductionLiveProbeEvidenceArchive(input);
```

这说明 v139 不重新拼一份 archive，而是验证上一版的 archive 输出。

## digest 校验

archive digest 校验：

```ts
archiveDigestValid: /^[a-f0-9]{64}$/.test(archive.archive.archiveDigest),
```

本版还生成自己的 verification digest：

```ts
const verificationDigest = digestVerification({
  profileVersion: "production-live-probe-evidence-archive-verification.v1",
  archiveDigest: archive.archive.archiveDigest,
  liveProbeEvidenceMode: archive.archive.liveProbeEvidenceMode,
  plannedProbeCount: archive.archive.plannedProbeCount,
  passedProbeCount: archive.archive.passedProbeCount,
  skippedProbeCount: archive.archive.skippedProbeCount,
  blockedProbeCount: archive.archive.blockedProbeCount,
  writeProbeAttempted: archive.archive.writeProbeAttempted,
  upstreamActionsEnabled: archive.archive.upstreamActionsEnabled,
  skippedEvidenceNotProductionPass: checks.skippedEvidenceNotProductionPass,
  checks: {
    ...checks,
    verificationDigestValid: undefined,
    readyForArchiveVerification: checks.readyForArchiveVerification,
  },
});
```

本次 smoke 得到：

```text
35bb74f8d4230a7521473fe7d4463e9ebd7fcc7813227df84a676a609364c453
```

## 版本引用校验

v139 明确检查 archive 内部版本和 artifact 版本一致：

```ts
contractVersionMatchesArchive: archive.archive.contractProfileVersion === archive.artifacts.liveProbeReadinessContract.profileVersion
  && archive.archive.contractProfileVersion === "production-live-probe-readiness-contract.v1",
smokeHarnessVersionMatchesArchive: archive.archive.smokeHarnessProfileVersion === archive.artifacts.liveProbeSmokeHarness.profileVersion
  && archive.archive.smokeHarnessProfileVersion === "production-live-probe-smoke-harness.v1",
summaryV13VersionMatchesArchive: archive.archive.summaryVersion === archive.artifacts.productionReadinessSummaryV13.summaryVersion
  && archive.archive.summaryVersion === "production-readiness-summary.v13",
```

这防止 archive record 挂错来源版本。

## probe 数校验

probe 数校验：

```ts
probeCountMatchesArtifacts: archive.archive.plannedProbeCount === archive.artifacts.liveProbeReadinessContract.plannedProbeCount
  && archive.archive.plannedProbeCount === archive.artifacts.liveProbeSmokeHarness.probeCount,
```

正常值：

```text
plannedProbeCount=5
smokeProbeCount=5
```

## no-write 校验

本版最关键的安全检查之一：

```ts
noWriteProbeAttempted: archive.archive.writeProbeAttempted === false
  && archive.artifacts.liveProbeReadinessContract.writeProbeCount === 0
  && archive.artifacts.liveProbeSmokeHarness.writeProbeAttempted === false
  && archive.checks.liveProbeWritesAttempted === false,
```

它同时看四个位置：

```text
archive 顶层
contract artifact
smoke harness artifact
archive checks
```

只有这些都证明没有写探测，verification 才通过。

## skipped 不是 production pass

v139 继续复核 v138 的语义：

```ts
skippedEvidenceNotProductionPass: archive.checks.skippedEvidenceNotProductionPass
  && (archive.archive.skippedProbeCount === 0 || archive.readyForProductionOperations === false)
  && (archive.archive.skippedProbeCount === 0 || archive.artifacts.productionReadinessSummaryV13.readyForProductionOperations === false),
```

当前默认模式：

```text
skippedProbeCount=5
readyForProductionOperations=false
```

所以 verification 通过，但 production 仍然没有放开。

## readiness

最终 readiness：

```ts
checks.readyForArchiveVerification = checks.archiveRecordReady
  && checks.archiveDigestValid
  && checks.contractVersionMatchesArchive
  && checks.smokeHarnessVersionMatchesArchive
  && checks.summaryV13VersionMatchesArchive
  && checks.probeCountMatchesArtifacts
  && checks.passOrSkippedOnly
  && checks.noWriteProbeAttempted
  && checks.upstreamActionsStillDisabled
  && checks.skippedEvidenceNotProductionPass;
```

注意这里叫：

```text
readyForArchiveVerification
```

不是：

```text
readyForProductionOperations
```

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-evidence-archive/verification
GET /api/v1/production/live-probe-evidence-archive/verification?format=markdown
```

路由代码：

```ts
const profile = await loadProductionLiveProbeEvidenceArchiveVerification({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

默认 `UPSTREAM_PROBES_ENABLED=false`，所以不会碰 Java / mini-kv。

## 测试覆盖

新增测试：

```text
test/productionLiveProbeEvidenceArchiveVerification.test.ts
```

核心断言：

```ts
expect(verification).toMatchObject({
  profileVersion: "production-live-probe-evidence-archive-verification.v1",
  readyForArchiveVerification: true,
  readyForProductionOperations: false,
  verification: {
    liveProbeEvidenceMode: "skipped",
    plannedProbeCount: 5,
    skippedProbeCount: 5,
    writeProbeAttempted: false,
  },
  checks: {
    archiveDigestValid: true,
    noWriteProbeAttempted: true,
    skippedEvidenceNotProductionPass: true,
    readyForArchiveVerification: true,
  },
});
```

还覆盖：

```text
archive record 不 ready 时 verification blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe evidence archive verification
GET /api/v1/production/live-probe-evidence-archive/verification
GET /api/v1/production/live-probe-evidence-archive/verification?format=markdown
```

计划更新：

```text
docs/plans/v137-production-live-probe-evidence-roadmap.md
```

归档：

```text
b/139/图片/production-live-probe-evidence-archive-verification.png
b/139/解释/运行调试说明.md
```

## 一句话总结

v139 给 v138 archive record 加了一层 verification：确认 digest、版本、probe 数、no-write 和 skipped-not-production-pass 都成立，同时继续不新增 summary、不触碰 Java / mini-kv、不放开生产执行。
