# 第一百四十三版代码讲解：production live probe real-read smoke archive adapter

本版目标是把 v142 的 readiness switch 再向前推进一步：把 smoke harness 的结果转成归档 record。

它回答的是：

```text
如果 smoke harness 产生 pass 或 skipped 结果，
Node 应该如何把这些结果放进 release evidence，
同时避免把 skipped evidence 误认为 production pass？
```

## 本版所处项目进度

v141 做 operator handoff checklist。

v142 做 real-read smoke readiness switch。

v143 做：

```text
real-read smoke archive adapter
```

它仍然不是 summary，而是证据适配层。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeArchiveAdapter.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeArchiveAdapter(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeArchiveAdapterProfile> {
```

它读取两个来源：

```ts
const readinessSwitch = await loadProductionLiveProbeRealReadSmokeReadinessSwitch(input);
const smokeHarness = await loadProductionLiveProbeSmokeHarness({
  config: input.config,
  orderPlatform: input.orderPlatform,
  miniKv: input.miniKv,
});
```

也就是说：

```text
v142 switch 决定是否适合 review
smoke harness 提供实际 pass/skipped 结果
v143 adapter 把结果转为归档记录
```

## adapterMode

adapter 模式：

```ts
function determineAdapterMode(
  smokeHarness: ProductionLiveProbeSmokeHarnessProfile,
): ProductionLiveProbeRealReadSmokeArchiveAdapterProfile["adapter"]["adapterMode"] {
  if (smokeHarness.summary.passedProbeCount === smokeHarness.summary.probeCount) {
    return "pass";
  }
  if (smokeHarness.summary.skippedProbeCount === smokeHarness.summary.probeCount) {
    return "skipped";
  }
  return "mixed";
}
```

当前默认：

```text
UPSTREAM_PROBES_ENABLED=false
```

所以 smoke harness 不访问 Java / mini-kv，5 个 probe 都是 skipped：

```text
adapterMode=skipped
```

## records

本版把每个 smoke result 转为 archive record：

```ts
function createArchiveRecord(result: ProductionLiveProbeResult): ProductionLiveProbeRealReadSmokeArchiveRecord {
  return {
    id: result.id,
    archiveStatus: result.status === "pass"
      ? "pass-evidence"
      : result.status === "skipped"
        ? "skipped-evidence"
        : "blocked-not-archivable",
    sourceStatus: result.status,
    target: result.target,
    protocol: result.protocol,
    readOnly: true,
    mutatesState: false,
    attempted: result.attempted,
    message: result.message,
    evidenceSummary: result.evidence,
  };
}
```

当前会得到 5 条：

```text
java-actuator-health: skipped-evidence
java-ops-overview: skipped-evidence
mini-kv-health: skipped-evidence
mini-kv-infojson: skipped-evidence
mini-kv-statsjson: skipped-evidence
```

## production pass 边界

本版关键判断：

```ts
checks.readyForProductionPassEvidence = checks.readyForArchiveAdapter
  && adapterMode === "pass"
  && input.config.upstreamProbesEnabled === true
  && smokeHarness.summary.skippedProbeCount === 0;
```

所以 skipped evidence 可以 archive：

```text
readyForArchiveAdapter=true
```

但不能当生产通过证据：

```text
readyForProductionPassEvidence=false
```

这就是本版最重要的生产级边界。

## 写动作保护

adapter 只接受只读 smoke：

```ts
noWriteProbeAttempted: smokeHarness.checks.writeProbeAttempted === false
  && smokeHarness.checks.javaWritesAttempted === false
  && smokeHarness.checks.miniKvWritesAttempted === false,
```

并继续要求：

```ts
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
  && smokeHarness.checks.upstreamActionsStillDisabled,
```

如果未来打开真实只读 smoke，也仍然不能打开 `UPSTREAM_ACTIONS_ENABLED=true`。

## digest

本版新增 adapter digest：

```ts
const adapterDigest = digestAdapter({
  profileVersion: "production-live-probe-real-read-smoke-archive-adapter.v1",
  adapterMode,
  readinessSwitchDigest: readinessSwitch.switch.switchDigest,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  records: records.map((record) => ({
    id: record.id,
    archiveStatus: record.archiveStatus,
    sourceStatus: record.sourceStatus,
    attempted: record.attempted,
  })),
  checks: {
    ...checks,
    readyForArchiveAdapter: checks.readyForArchiveAdapter,
    readyForProductionPassEvidence: checks.readyForProductionPassEvidence,
  },
});
```

它用于把当前 adapter 输出固定成可引用的 release evidence。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-real-read-smoke-archive-adapter
GET /api/v1/production/live-probe-real-read-smoke-archive-adapter?format=markdown
```

路由仍然只读：

```ts
const profile = await loadProductionLiveProbeRealReadSmokeArchiveAdapter({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeArchiveAdapter.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-live-probe-real-read-smoke-archive-adapter.v1",
  readyForArchiveAdapter: true,
  readyForProductionPassEvidence: false,
  adapter: {
    adapterMode: "skipped",
    plannedProbeCount: 5,
    passedProbeCount: 0,
    skippedProbeCount: 5,
  },
});
```

还覆盖：

```text
readiness switch 未 ready 时 adapter blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe real-read smoke archive adapter
GET /api/v1/production/live-probe-real-read-smoke-archive-adapter
GET /api/v1/production/live-probe-real-read-smoke-archive-adapter?format=markdown
```

归档：

```text
b/143/图片/production-live-probe-real-read-smoke-archive-adapter.png
b/143/解释/运行调试说明.md
```

## 一句话总结

v143 把 smoke harness 输出接入 archive adapter：默认 skipped evidence 可以归档，但不会升级为 production pass；只有真实只读 probe 全部 pass 且 `UPSTREAM_PROBES_ENABLED=true` 时，才可能形成 production pass evidence。
