# 第一百四十一版代码讲解：production live probe handoff checklist

本版目标是把 v140 的 live probe evidence archive bundle 转成操作员可读的交接清单。

它不是 summary。

它解决的问题是：

```text
Node 已经有 skipped archive bundle，
下一步如果要做真实只读 smoke，
操作员应该先确认什么、启动什么、保持哪些开关关闭。
```

## 本版所处项目进度

v138 做了 archive record。

v139 做了 archive verification。

v140 做了 archive bundle。

v141 做的是：

```text
operator handoff checklist
```

也就是把证据包转成操作流程。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeHandoffChecklist.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeHandoffChecklist(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeHandoffChecklistProfile> {
```

第一步读取 v140 bundle：

```ts
const bundle = await loadProductionLiveProbeEvidenceArchiveBundle(input);
```

所以 v141 不是重新生成证据，而是消费上一阶段证据包。

## handoff 字段

handoff 记录核心状态：

```ts
handoff: {
  bundleDigest: bundle.bundle.bundleDigest,
  bundleProfileVersion: bundle.profileVersion,
  liveProbeEvidenceMode: bundle.bundle.liveProbeEvidenceMode,
  plannedProbeCount: bundle.bundle.plannedProbeCount,
  skippedProbeCount: bundle.bundle.skippedProbeCount,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  requiresJavaManualStart: bundle.bundle.liveProbeEvidenceMode !== "pass",
  requiresMiniKvManualStart: bundle.bundle.liveProbeEvidenceMode !== "pass",
  skippedEvidenceNotProductionPass: bundle.bundle.skippedEvidenceNotProductionPass,
},
```

当前默认状态：

```text
liveProbeEvidenceMode=skipped
requiresJavaManualStart=true
requiresMiniKvManualStart=true
```

这说明 Node 不会自己启动 Java / mini-kv。

## readiness checks

核心 checks：

```ts
archiveBundleReady: bundle.readyForArchiveBundle,
sourceEvidenceFilesReady: bundle.checks.sourceArtifactFilesExist,
noWriteProbeAttempted: bundle.checks.noWriteProbeAttempted,
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
  && bundle.checks.upstreamActionsStillDisabled,
skippedEvidenceNotProductionPass: bundle.checks.skippedEvidenceNotProductionPass,
realReadSmokeRequiresManualWindow: input.config.upstreamProbesEnabled === false,
```

operator handoff readiness：

```ts
checks.readyForOperatorHandoff = checks.archiveBundleReady
  && checks.sourceEvidenceFilesReady
  && checks.noWriteProbeAttempted
  && checks.upstreamActionsStillDisabled
  && checks.skippedEvidenceNotProductionPass;
```

real read smoke readiness：

```ts
checks.readyForRealReadSmoke = checks.readyForOperatorHandoff
  && input.config.upstreamProbesEnabled === true
  && input.config.upstreamActionsEnabled === false;
```

因为当前默认：

```text
UPSTREAM_PROBES_ENABLED=false
```

所以：

```text
readyForOperatorHandoff=true
readyForRealReadSmoke=false
```

## checklist 步骤

本版输出 7 个步骤：

```ts
id:
  | "archive-bundle-ready"
  | "confirm-read-only-scope"
  | "manual-start-java"
  | "manual-start-mini-kv"
  | "enable-probe-window"
  | "run-real-read-smoke"
  | "archive-real-read-result";
```

前两个步骤由 Node 完成：

```text
archive-bundle-ready: done
confirm-read-only-scope: done
```

后五个步骤需要操作员或显式 probe window：

```text
manual-start-java: manual-required
manual-start-mini-kv: manual-required
enable-probe-window: manual-required
run-real-read-smoke: manual-required
archive-real-read-result: manual-required
```

## Java 和 mini-kv 启动边界

Java 步骤：

```ts
{
  id: "manual-start-java",
  owner: "operator",
  status: bundle.bundle.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
  title: "Start Java order platform for real read-only smoke",
  evidence: config.orderPlatformUrl,
  note: "Node does not start Java automatically; operator should start it only for an explicit read-only probe window.",
}
```

mini-kv 步骤：

```ts
{
  id: "manual-start-mini-kv",
  owner: "operator",
  status: bundle.bundle.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
  title: "Start mini-kv for real read-only smoke",
  evidence: `${config.miniKvHost}:${config.miniKvPort}`,
  note: "Node does not start mini-kv automatically; only read commands are allowed during the probe window.",
}
```

这就是本版为什么没有启动另外两个项目：当前版本只定义交接流程。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-handoff-checklist
GET /api/v1/production/live-probe-handoff-checklist?format=markdown
```

路由仍然只读：

```ts
const profile = await loadProductionLiveProbeHandoffChecklist({
  config: deps.config,
  auditLog: deps.auditLog,
  auditStoreRuntime: deps.auditStoreRuntime,
  productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
  orderPlatform: deps.orderPlatform,
  miniKv: deps.miniKv,
});
```

默认 `UPSTREAM_PROBES_ENABLED=false`，不会访问上游。

## 测试覆盖

新增测试：

```text
test/productionLiveProbeHandoffChecklist.test.ts
```

核心断言：

```ts
expect(checklist).toMatchObject({
  profileVersion: "production-live-probe-handoff-checklist.v1",
  readyForOperatorHandoff: true,
  readyForRealReadSmoke: false,
  handoff: {
    liveProbeEvidenceMode: "skipped",
    requiresJavaManualStart: true,
    requiresMiniKvManualStart: true,
  },
  summary: {
    stepCount: 7,
    doneStepCount: 2,
    manualRequiredStepCount: 5,
    blockedStepCount: 0,
  },
});
```

还覆盖：

```text
bundle 不 ready 时 handoff blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe operator handoff checklist
GET /api/v1/production/live-probe-handoff-checklist
GET /api/v1/production/live-probe-handoff-checklist?format=markdown
```

计划更新：

```text
docs/plans/v140-live-probe-handoff-roadmap.md
```

归档：

```text
b/141/图片/production-live-probe-handoff-checklist.png
b/141/解释/运行调试说明.md
```

## 一句话总结

v141 把 v140 bundle 转成 operator handoff checklist：Node 侧证据已可交接，但真实只读 smoke 仍需要手动启动 Java / mini-kv 和显式 probe window；本版不启动上游、不新增 summary、不放开写操作。
