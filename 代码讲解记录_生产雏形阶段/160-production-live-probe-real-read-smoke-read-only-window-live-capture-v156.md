# 第一百五十六版代码讲解：production live probe real-read smoke read-only window live capture

本版目标是把 v155 readiness packet 之后的真实只读窗口 capture 做成 Node 侧能力。

它解决的问题是：

```text
v155 已经有人工窗口前审阅包；
Java v50 / mini-kv v59 已完成只读自描述增强；
v156 要在不自动启动上游、不允许写操作的前提下，记录一次 pass/skipped 只读 capture。
```

## 本版所处项目进度

当前阶段是生产雏形里的真实只读 capture：

```text
Node v155：read-only window readiness packet
Java v50：ops read-only window self description
mini-kv v59：runtime read self description
Node v156：read-only window live capture
```

v156 仍不代表生产执行打开。它只表示 Node 可以在安全开关下记录只读 probe 证据：

```text
UPSTREAM_PROBES_ENABLED=false -> captured-skipped
UPSTREAM_PROBES_ENABLED=true + 上游手动可用 -> captured-pass
UPSTREAM_ACTIONS_ENABLED=true -> blocked
```

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile> {
```

它先消费 v155 readiness packet：

```ts
const readinessPacket = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket(input);
```

然后复用已有 smoke harness：

```ts
const smokeHarness = await loadProductionLiveProbeSmokeHarness({
  config: input.config,
  orderPlatform: input.orderPlatform,
  miniKv: input.miniKv,
});
```

这样 v156 不重写探测逻辑，而是继承已有的只读 probe 目标和 skipped/pass 语义。

## capture 记录

v156 把 smoke harness 结果转成 captured records：

```ts
const capturedRecords = smokeHarness.results.map(createCapturedRecord);
```

转换规则：

```ts
captureStatus: result.status === "pass"
  ? "captured-pass"
  : result.status === "skipped"
    ? "captured-skipped"
    : "captured-blocked",
```

每条记录都固定为：

```ts
readOnly: true,
mutatesState: false,
```

所以 captured record 不能夹带写操作。

## checks 设计

核心 checks 在 `createChecks`：

```ts
return {
  readinessPacketReady: readinessPacket.readyForReadOnlyWindowReview,
  readinessPacketDigestValid: /^[a-f0-9]{64}$/.test(readinessPacket.packet.readinessPacketDigest),
  smokeHarnessReady: smokeHarness.readyForLiveProbeEvidence,
  smokeProbeSetComplete: records.length === 5,
  allProbeResultsReadOnly: records.every((record) => record.readOnly && !record.mutatesState),
```

安全边界 checks：

```text
noWriteProbeAttempted
upstreamActionsStillDisabled
noAutomaticUpstreamStart
skippedAllowedWhenWindowClosed
passRequiresProbeWindowOpen
skippedOrMixedNotProductionPass
readyForProductionOperationsStillFalse
```

其中 `passRequiresProbeWindowOpen` 很关键：

```ts
passRequiresProbeWindowOpen: records.every((record) => record.captureStatus !== "captured-pass")
  || config.upstreamProbesEnabled,
```

也就是说，如果 `UPSTREAM_PROBES_ENABLED=false`，就不能出现 pass capture。

## captureState

状态计算：

```ts
function determineCaptureState(
  records: ProductionLiveProbeCapturedWindowRecord[],
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["checks"],
): ProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureProfile["captureState"] {
  if (!checks.readyForReadOnlyLiveCapture
    || records.some((record) => record.captureStatus === "captured-blocked")) {
    return "blocked";
  }
  if (records.length > 0 && records.every((record) => record.captureStatus === "captured-pass")) {
    return "captured-pass";
  }
  if (records.length > 0 && records.every((record) => record.captureStatus === "captured-skipped")) {
    return "captured-skipped";
  }
  return "captured-mixed";
}
```

默认没有开启 probe window 时，正常结果是：

```text
captured-skipped
```

这符合规则：没有手动启动上游，就只记录 skipped evidence。

## production pass 边界

v156 有一个候选字段：

```ts
checks.readyForProductionPassEvidenceCandidate = checks.readyForReadOnlyLiveCapture
  && input.config.upstreamProbesEnabled
  && capturedRecords.length > 0
  && capturedRecords.every((record) => record.captureStatus === "captured-pass");
```

注意这只是 evidence candidate，不是生产执行：

```ts
readyForProductionOperations: false,
```

也就是说即使全 pass，也不能打开生产操作。

## 路由接入

修改文件：

```text
src/routes/statusRoutes.ts
```

新增路由：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture
```

Markdown：

```text
/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture?format=markdown
```

路由代码：

```ts
registerJsonMarkdownReportRoute(
  app,
  "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture",
  () => loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture({
    config: deps.config,
    auditLog: deps.auditLog,
    auditStoreRuntime: deps.auditStoreRuntime,
    productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }),
  renderProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdown,
);
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.test.ts
```

覆盖四类场景：

```text
默认 probe window closed -> captured-skipped
模拟手动可用上游 + probes enabled -> captured-pass
UPSTREAM_ACTIONS_ENABLED=true -> blocked
JSON / Markdown route -> 200
```

默认场景断言：

```ts
expect(profile).toMatchObject({
  captureState: "captured-skipped",
  readyForReadOnlyLiveCapture: true,
  readyForProductionPassEvidenceCandidate: false,
  readyForProductionOperations: false,
  capture: {
    probeWindowOpen: false,
    passRecordCount: 0,
    skippedRecordCount: 5,
    blockedRecordCount: 0,
  },
});
```

pass 场景用 fake clients 模拟上游已经由 operator 手动启动：

```ts
orderPlatform: new PassingOrderPlatformClient(),
miniKv: new PassingMiniKvClient(),
```

并断言：

```ts
captureState: "captured-pass",
readyForProductionPassEvidenceCandidate: true,
readyForProductionOperations: false,
```

## 运行调试

本版执行并通过：

```text
npm run typecheck
npm test -- --run test/productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.test.ts test/productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.test.ts
npm test
npm run build
Node HTTP smoke
Chrome screenshot
```

HTTP smoke 关键结果：

```text
captureState=captured-skipped
readyForReadOnlyLiveCapture=true
readyForProductionPassEvidenceCandidate=false
readyForProductionOperations=false
passRecordCount=0
skippedRecordCount=5
blockedRecordCount=0
```

归档截图：

```text
b/156/图片/production-live-probe-real-read-smoke-read-only-window-live-capture.png
```

## 成熟度变化

v156 把真实只读窗口从“准备好了”推进到“可以记录 capture”：

```text
v155：窗口前 readiness packet
v156：窗口 capture evidence
v157：下一步把 capture 固化成 archive
```

它也把一个重要边界落地了：

```text
不启动上游 = skipped
手动启动且只读成功 = pass candidate
任何写动作或 actions=true = blocked
```

## 一句话总结

v156 消费 v155 readiness packet 并复用 smoke harness，记录真实只读窗口的 pass/skipped capture，同时保持 no write、no auto start、production operations closed 的边界。
