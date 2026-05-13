# 第一百四十二版代码讲解：production live probe real-read smoke readiness switch

本版目标是把 v141 的 operator handoff checklist 继续推进成显式开关。

它回答的是：

```text
现在能不能打开真实只读 smoke 窗口？
如果不能，是因为 Node 侧证据未准备好，还是因为操作员还没有显式启动 Java / mini-kv？
```

## 本版所处项目进度

v138 做 archive record。

v139 做 archive verification。

v140 做 archive bundle。

v141 做 operator handoff checklist。

v142 做：

```text
real-read smoke readiness switch
```

它仍然不是 summary，而是从“证据交接”走到“操作开关”。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeReadinessSwitch.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeReadinessSwitch(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadinessSwitchProfile> {
```

第一步复用 v141：

```ts
const handoff = await loadProductionLiveProbeHandoffChecklist(input);
```

所以 v142 不重新造一套证据链，而是消费 v141 的 handoff。

## switchState

本版核心状态：

```ts
switchState: "blocked" | "closed-skipped-evidence" | "open-read-only-window";
```

生成逻辑：

```ts
const switchState = productionBlockers.length > 0
  ? "blocked"
  : checks.readyForRealReadSmoke
    ? "open-read-only-window"
    : "closed-skipped-evidence";
```

当前默认环境：

```text
UPSTREAM_PROBES_ENABLED=false
UPSTREAM_ACTIONS_ENABLED=false
```

因此结果是：

```text
switchState=closed-skipped-evidence
```

这说明 Node 证据可以交给操作员 review，但还没有进入真实上游探测窗口。

## readiness checks

核心 checks：

```ts
const checks = {
  handoffChecklistReady: handoff.readyForOperatorHandoff,
  archiveBundleReady: handoff.checks.archiveBundleReady,
  upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
    && handoff.checks.upstreamActionsStillDisabled,
  probeWindowExplicitlyOpen: input.config.upstreamProbesEnabled === true,
  noWriteProbeAllowed: handoff.checks.noWriteProbeAttempted
    && input.config.upstreamActionsEnabled === false,
  skippedEvidenceNotProductionPass: handoff.checks.skippedEvidenceNotProductionPass,
  manualJavaStartRequired: handoff.handoff.requiresJavaManualStart,
  manualMiniKvStartRequired: handoff.handoff.requiresMiniKvManualStart,
  readyForSwitchReview: false,
  readyForRealReadSmoke: false,
};
```

review readiness：

```ts
checks.readyForSwitchReview = checks.handoffChecklistReady
  && checks.archiveBundleReady
  && checks.upstreamActionsStillDisabled
  && checks.noWriteProbeAllowed
  && checks.skippedEvidenceNotProductionPass;
```

真实只读 smoke readiness：

```ts
checks.readyForRealReadSmoke = checks.readyForSwitchReview
  && checks.probeWindowExplicitlyOpen
  && input.config.upstreamActionsEnabled === false;
```

所以当前结果是：

```text
readyForSwitchReview=true
readyForRealReadSmoke=false
```

这个差异很关键：Node 侧交接材料已准备，但真实探测窗口仍未打开。

## gates

本版输出 6 个 gates：

```ts
id:
  | "handoff-checklist-ready"
  | "upstream-actions-disabled"
  | "operator-start-java"
  | "operator-start-mini-kv"
  | "open-read-only-probe-window"
  | "run-real-read-smoke";
```

当前默认状态：

```text
handoff-checklist-ready: done
upstream-actions-disabled: done
operator-start-java: manual-required
operator-start-mini-kv: manual-required
open-read-only-probe-window: manual-required
run-real-read-smoke: manual-required
```

这比 v141 更像真实操作开关：哪些由 Node 完成，哪些必须由操作员明确动作，界限更清楚。

## Java 和 mini-kv 边界

Java gate：

```ts
{
  id: "operator-start-java",
  owner: "operator",
  status: handoff.handoff.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
  title: "Start Java order platform intentionally",
  evidence: config.orderPlatformUrl,
  note: "Node will not start Java; the operator owns the probe window.",
}
```

mini-kv gate：

```ts
{
  id: "operator-start-mini-kv",
  owner: "operator",
  status: handoff.handoff.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
  title: "Start mini-kv intentionally",
  evidence: `${config.miniKvHost}:${config.miniKvPort}`,
  note: "Node will not start mini-kv; only HEALTH, INFOJSON, and STATSJSON are allowed.",
}
```

这就是本版仍然不启动另外两个项目的原因：v142 只负责显式开关，不负责真实上游生命周期。

## 写动作保护

本版最重要的生产边界：

```ts
upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
  && handoff.checks.upstreamActionsStillDisabled,
```

以及：

```ts
noWriteProbeAllowed: handoff.checks.noWriteProbeAttempted
  && input.config.upstreamActionsEnabled === false,
```

如果 `UPSTREAM_ACTIONS_ENABLED=true`，测试会确认 switch 变成：

```text
switchState=blocked
```

并出现 blocker：

```text
UPSTREAM_ACTIONS_ENABLED
WRITE_PROBE_NOT_ALLOWED
```

## digest

本版新增 switch digest：

```ts
const switchDigest = digestSwitch({
  profileVersion: "production-live-probe-real-read-smoke-readiness-switch.v1",
  bundleDigest: handoff.handoff.bundleDigest,
  liveProbeEvidenceMode: handoff.handoff.liveProbeEvidenceMode,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  checks,
  gateStatuses: gates.map((gate) => [gate.id, gate.status]),
});
```

它不是安全签名，只是稳定归档摘要，方便 v143 archive adapter 引用。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-real-read-smoke-readiness-switch
GET /api/v1/production/live-probe-real-read-smoke-readiness-switch?format=markdown
```

路由仍然只读：

```ts
const profile = await loadProductionLiveProbeRealReadSmokeReadinessSwitch({
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
test/productionLiveProbeRealReadSmokeReadinessSwitch.test.ts
```

核心断言：

```ts
expect(profile).toMatchObject({
  profileVersion: "production-live-probe-real-read-smoke-readiness-switch.v1",
  switchState: "closed-skipped-evidence",
  readyForSwitchReview: true,
  readyForRealReadSmoke: false,
  switch: {
    liveProbeEvidenceMode: "skipped",
    upstreamProbesEnabled: false,
    upstreamActionsEnabled: false,
  },
});
```

还覆盖：

```text
UPSTREAM_ACTIONS_ENABLED=true 时 switch blocked
JSON / Markdown 路由可访问
```

## README、计划和归档

README 新增：

```text
Production live probe real-read smoke readiness switch
GET /api/v1/production/live-probe-real-read-smoke-readiness-switch
GET /api/v1/production/live-probe-real-read-smoke-readiness-switch?format=markdown
```

归档：

```text
b/142/图片/production-live-probe-real-read-smoke-readiness-switch.png
b/142/解释/运行调试说明.md
```

## 一句话总结

v142 把 v141 的 handoff checklist 变成真实只读 smoke 的显式 readiness switch：当前 Node 可以交给操作员 review，但默认不启动 Java / mini-kv、不打开 probe window、不允许任何写动作。
