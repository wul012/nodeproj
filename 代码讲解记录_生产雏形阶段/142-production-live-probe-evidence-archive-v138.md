# 第一百三十八版代码讲解：production live probe evidence archive

本版目标是把 live probe readiness 阶段的证据做成一个可归档记录。

它不是新的 summary。

本版遵守的新粒度规则是：

```text
小增量做 archive / verification / evidence record
阶段收口才做 summary
```

所以 v138 只新增：

```text
production-live-probe-evidence-archive.v1
```

不新增 `production-readiness-summary.v14`。

## 本版所处项目进度

v135 定义了 live probe readiness contract。

v136 做了 read-only live probe smoke harness。

v137 做了 production readiness summary v13。

v138 做的是：

```text
把 v135 + v136 + v137 的证据封装成 archive record
计算 archiveDigest
明确 skipped evidence 不是 production pass
```

## 新增服务

新增文件：

```text
src/services/productionLiveProbeEvidenceArchive.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeEvidenceArchive(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeEvidenceArchiveProfile> {
```

虽然传入了 `orderPlatform` 和 `miniKv`，但默认：

```text
UPSTREAM_PROBES_ENABLED=false
```

所以不会访问 Java / mini-kv。

## 读取三份证据

v138 读取三份上游 Node 证据：

```ts
const contract = createProductionLiveProbeReadinessContract(input.config);
const smokeHarness = await loadProductionLiveProbeSmokeHarness({
  config: input.config,
  orderPlatform: input.orderPlatform,
  miniKv: input.miniKv,
});
const summaryV13 = await loadProductionReadinessSummaryV13(input);
```

对应关系：

```text
contract -> v135
smokeHarness -> v136
summaryV13 -> v137
```

这让 archive record 不是孤立文件，而是有明确来源链。

## planned probe 数量

本版从 contract 中计算 planned probe 数量：

```ts
const plannedProbeCount = contract.targets.javaOrderPlatform.plannedProbes.length
  + contract.targets.miniKv.plannedProbes.length;
```

正常情况下：

```text
Java 2 个
mini-kv 3 个
合计 5 个
```

这也是 smoke 里 `plannedProbeCount=5` 的来源。

## evidence mode

本版新增 evidence mode：

```ts
function classifyLiveProbeEvidenceMode(
  probeCount: number,
  passedProbeCount: number,
  skippedProbeCount: number,
): ProductionLiveProbeEvidenceArchiveProfile["archive"]["liveProbeEvidenceMode"] {
```

判断规则：

```ts
if (probeCount > 0 && passedProbeCount === probeCount) {
  return "pass";
}

if (probeCount > 0 && skippedProbeCount === probeCount) {
  return "skipped";
}

return "mixed";
```

当前默认环境下：

```text
passedProbeCount=0
skippedProbeCount=5
liveProbeEvidenceMode=skipped
```

这比单纯写 `ready=true` 更清楚。

## skipped 不能冒充 production pass

v138 的核心安全检查：

```ts
skippedEvidenceNotProductionPass: smokeHarness.summary.skippedProbeCount === 0
  || summaryV13.readyForProductionOperations === false,
```

意思是：

```text
如果存在 skipped probe，
那 production operations 必须仍然是 false。
```

这正好防止把本地 skipped evidence 误读成真实生产连接成功。

## archive digest

本版生成 archive digest：

```ts
const archiveDigest = digestArchive({
  profileVersion: "production-live-probe-evidence-archive.v1",
  contractProfileVersion: contract.profileVersion,
  smokeHarnessProfileVersion: smokeHarness.profileVersion,
  summaryVersion: summaryV13.summaryVersion,
  liveProbeEvidenceMode,
  plannedProbeCount,
  passedProbeCount: smokeHarness.summary.passedProbeCount,
  skippedProbeCount: smokeHarness.summary.skippedProbeCount,
  blockedProbeCount: smokeHarness.summary.blockedProbeCount,
  writeProbeAttempted: false,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  readyForLiveProbeEvidence: smokeHarness.readyForLiveProbeEvidence,
  readyForProductionOperations: false,
  checks: {
    ...checks,
    archiveDigestValid: undefined,
    readyForArchiveRecord: checks.readyForArchiveRecord,
  },
});
```

底层使用稳定 JSON：

```ts
function digestArchive(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}
```

本次 smoke 得到：

```text
78ce87b08f2357951e811e4a9d1cacd1b7df63dc1c40c29b5818e89310d6d157
```

## checks

本版 checks：

```ts
contractVersionValid: contract.profileVersion === "production-live-probe-readiness-contract.v1",
smokeHarnessVersionValid: smokeHarness.profileVersion === "production-live-probe-smoke-harness.v1",
summaryV13VersionValid: summaryV13.summaryVersion === "production-readiness-summary.v13",
summaryV13EvidenceReady: summaryV13.checks.summaryV12EvidenceReady
  && summaryV13.checks.liveProbeContractReady
  && summaryV13.checks.liveProbeSmokeEvidenceReady
  && summaryV13.checks.liveProbeWritesAttempted === false,
smokeProbeCountMatchesContract: smokeHarness.summary.probeCount === plannedProbeCount,
smokePassOrSkippedOnly: smokeHarness.summary.blockedProbeCount === 0
  && smokeHarness.results.every((result) => result.status === "pass" || result.status === "skipped"),
```

这些检查保证 archive record 不是随便拼接字符串，而是真的复核版本、probe 数和 no-write 边界。

## artifacts

归档 artifacts 分三段：

```ts
artifacts: {
  liveProbeReadinessContract: { ... },
  liveProbeSmokeHarness: { ... },
  productionReadinessSummaryV13: { ... },
}
```

其中 smoke harness 部分记录：

```ts
probeCount: smokeHarness.summary.probeCount,
passedProbeCount: smokeHarness.summary.passedProbeCount,
skippedProbeCount: smokeHarness.summary.skippedProbeCount,
blockedProbeCount: smokeHarness.summary.blockedProbeCount,
writeProbeAttempted: false as const,
```

这就是后续 v139 archive verification 要复核的主体。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-evidence-archive
GET /api/v1/production/live-probe-evidence-archive?format=markdown
```

路由代码：

```ts
const profile = await loadProductionLiveProbeEvidenceArchive({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

仍然由 Node 汇总证据，不执行 Java replay，不执行 mini-kv 写命令。

## 测试覆盖

新增测试：

```text
test/productionLiveProbeEvidenceArchive.test.ts
```

核心断言：

```ts
expect(archive).toMatchObject({
  profileVersion: "production-live-probe-evidence-archive.v1",
  readyForArchiveRecord: true,
  readyForProductionOperations: false,
  archive: {
    liveProbeEvidenceMode: "skipped",
    plannedProbeCount: 5,
    passedProbeCount: 0,
    skippedProbeCount: 5,
    blockedProbeCount: 0,
    writeProbeAttempted: false,
  },
});
```

还覆盖：

```text
缺少 v13 前置审批证据时 archive readiness blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe evidence archive
GET /api/v1/production/live-probe-evidence-archive
GET /api/v1/production/live-probe-evidence-archive?format=markdown
```

计划修正：

```text
docs/plans/v137-production-live-probe-evidence-roadmap.md
```

本次特别把原计划里的 `summary v14` 改成了 `live probe evidence archive bundle`，避免 summary 版本过密。

归档：

```text
b/138/图片/production-live-probe-evidence-archive.png
b/138/解释/运行调试说明.md
```

## 一句话总结

v138 把 live probe 的 contract、smoke harness、summary v13 证据封成 archive record，并用 digest 固化；它不新增 summary，不触碰 Java / mini-kv，不把 skipped evidence 当作 production pass。
