# 第一百四十九版代码讲解：production pass evidence verification

本版本目标是给 v148 的 capture evidence 增加最后一层生产 pass 证据验证。

v148 已经能把真实只读 smoke 的结果固定成：

```text
captured-pass
captured-mixed
captured-skipped
blocked
```

v149 要解决的问题是：

```text
capture 存在，不代表它就能成为 production pass evidence。
只有 all-pass、只读窗口打开、release gate 接受、写动作关闭，才允许进入 production pass evidence ready。
```

## 本版本所处项目进度

v144-v148 已完成：

```text
execution request
result importer
release evidence gate
dry-run command package
evidence capture
```

v149 做的是：

```text
production pass evidence verification
```

它是这一阶段 `v147-v149 production pass evidence` 链条的收口版本。默认没有启动 Java / mini-kv 时，结果应该是：

```text
not-production-pass-evidence
```

而不是 pass。

## 新增服务

新增文件：

```text
src/services/productionLiveProbeRealReadSmokeProductionPassEvidenceVerification.ts
```

入口函数：

```ts
export async function loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationProfile> {
```

它读取两个来源：

```ts
const capture = await loadProductionLiveProbeRealReadSmokeEvidenceCapture(input);
const releaseGate = await loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate(input);
```

也就是说，v149 不重新发明证据，而是验证 v148 capture 和 v146 release gate 是否一致。

## verification 字段

核心输出：

```ts
verification: {
  verificationDigest,
  captureDigest: capture.capture.captureDigest,
  releaseEvidenceGateDigest: releaseGate.gate.gateDigest,
  captureProfileVersion: capture.profileVersion,
  releaseEvidenceGateProfileVersion: releaseGate.profileVersion,
  captureState: capture.captureState,
  captureMode: capture.capture.captureMode,
  releaseGateDecision: releaseGate.gateDecision,
  upstreamProbesEnabled: input.config.upstreamProbesEnabled,
  upstreamActionsEnabled: input.config.upstreamActionsEnabled,
  readOnlyWindowOpen: capture.capture.readOnlyWindowOpen,
  automaticUpstreamStart: false,
  mutatesUpstreamState: false,
  allCapturedRecordsPass: checks.captureAllCapturedRecordsPass,
  skippedOrMixedRemainsBlocked: checks.skippedOrMixedRemainsBlocked,
},
```

这里最关键的字段是：

```text
automaticUpstreamStart=false
mutatesUpstreamState=false
readyForProductionOperations=false
executionAllowed=false
```

它们说明 v149 只是证据验证层，不会变成真正执行入口。

## checks

v149 的核心 checks：

```ts
captureReadyForEvidenceCapture: capture.readyForEvidenceCapture,
captureDigestValid: /^[a-f0-9]{64}$/.test(capture.capture.captureDigest),
captureRecordCountMatches: capture.summary.capturedRecordCount === 5
  && capture.capture.importedRecordCount === 5,
captureAllCapturedRecordsAccepted: capture.capturedRecords.every((record) => record.captureStatus !== "captured-rejected"),
captureAllCapturedRecordsPass: capture.capture.captureMode === "pass"
  && capture.capture.passRecordCount === capture.capture.importedRecordCount
  && capture.capture.importedRecordCount === 5,
captureNoSkippedRecords: capture.capture.skippedRecordCount === 0,
captureNoRejectedRecords: capture.capture.rejectedRecordCount === 0,
captureNoWriteEvidenceCaptured: capture.checks.noWriteEvidenceCaptured,
captureReadOnlyWindowOpen: capture.capture.readOnlyWindowOpen,
releaseGateReadyForReleaseEvidenceGate: releaseGate.readyForReleaseEvidenceGate,
releaseGateDigestValid: /^[a-f0-9]{64}$/.test(releaseGate.gate.gateDigest),
releaseGateReadyForProductionPassEvidence: releaseGate.readyForProductionPassEvidence
  && releaseGate.gateDecision === "production-pass-evidence-ready",
releaseGateDecisionMatchesCapture: capture.capture.releaseGateDecision === releaseGate.gateDecision,
upstreamActionsStillDisabled: capture.capture.upstreamActionsEnabled === false
  && releaseGate.gate.upstreamActionsEnabled === false
  && capture.checks.upstreamActionsStillDisabled
  && releaseGate.checks.upstreamActionsStillDisabled,
noAutomaticUpstreamStart: capture.capture.automaticUpstreamStart === false
  && capture.checks.noAutomaticUpstreamStart,
skippedOrMixedRemainsBlocked: capture.capture.captureMode !== "pass",
```

这些检查把“证据存在”和“证据可作为生产 pass”分开。

默认 skipped capture 会满足很多结构检查，比如 digest、record count、no-write，但不会满足：

```text
captureAllCapturedRecordsPass
captureNoSkippedRecords
captureReadOnlyWindowOpen
releaseGateReadyForProductionPassEvidence
```

所以最终不是 pass。

## readyForProductionPassEvidenceVerification

最终 readiness：

```ts
checks.readyForProductionPassEvidenceVerification = checks.captureReadyForEvidenceCapture
  && checks.captureDigestValid
  && checks.captureRecordCountMatches
  && checks.captureAllCapturedRecordsAccepted
  && checks.captureAllCapturedRecordsPass
  && checks.captureNoSkippedRecords
  && checks.captureNoRejectedRecords
  && checks.captureNoWriteEvidenceCaptured
  && checks.captureReadOnlyWindowOpen
  && checks.releaseGateReadyForReleaseEvidenceGate
  && checks.releaseGateDigestValid
  && checks.releaseGateReadyForProductionPassEvidence
  && checks.releaseGateDecisionMatchesCapture
  && checks.upstreamActionsStillDisabled
  && checks.noAutomaticUpstreamStart
  && !checks.skippedOrMixedRemainsBlocked;
```

这段逻辑表达的是：

```text
all-pass + no skipped + no rejected + no write + read-only window open + gate accepts
```

才是真正的 production pass evidence verification。

## verificationState

状态判断：

```ts
const verificationState = productionBlockers.length > 0
  ? "blocked"
  : checks.readyForProductionPassEvidenceVerification
    ? "production-pass-evidence-ready"
    : "not-production-pass-evidence";
```

这里区分了三类情况：

```text
blocked：证据链结构不完整，比如审批缺失、gate 不可用、写动作打开
not-production-pass-evidence：证据链结构可读，但当前不是生产 pass，比如默认 skipped
production-pass-evidence-ready：all-pass 且所有生产 pass 条件满足
```

这比简单返回 true/false 更适合控制面展示。

## productionBlockers

v149 的 blockers 只表示结构性问题：

```ts
addMessage(blockers, checks.captureReadyForEvidenceCapture, "CAPTURE_NOT_READY_FOR_EVIDENCE_CAPTURE", "evidence-capture", "v148 capture must be ready before verification can pass.");
addMessage(blockers, checks.captureDigestValid, "CAPTURE_DIGEST_INVALID", "evidence-capture", "Capture digest must be a valid sha256 hex digest.");
addMessage(blockers, checks.captureRecordCountMatches, "CAPTURE_RECORD_COUNT_MISMATCH", "evidence-capture", "Capture must include exactly five read-only smoke records.");
addMessage(blockers, checks.captureAllCapturedRecordsAccepted, "CAPTURED_RECORD_REJECTED", "evidence-capture", "Rejected capture records cannot be promoted.");
addMessage(blockers, checks.captureNoRejectedRecords, "CAPTURE_REJECTED_RECORD_PRESENT", "evidence-capture", "Rejected capture records block production pass evidence.");
addMessage(blockers, checks.captureNoWriteEvidenceCaptured, "WRITE_EVIDENCE_CAPTURED", "evidence-capture", "Capture must remain read-only.");
addMessage(blockers, checks.releaseGateReadyForReleaseEvidenceGate, "RELEASE_GATE_NOT_READY", "release-evidence-gate", "Release evidence gate must be ready before pass verification can succeed.");
addMessage(blockers, checks.releaseGateDigestValid, "RELEASE_GATE_DIGEST_INVALID", "release-evidence-gate", "Release gate digest must be a valid sha256 hex digest.");
addMessage(blockers, checks.releaseGateDecisionMatchesCapture, "RELEASE_GATE_DECISION_MISMATCH", "release-evidence-gate", "Capture and release gate decisions must match.");
addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "evidence-capture", "Verification must not start Java or mini-kv automatically.");
```

注意：默认 skipped 不再被当作 blocker。

它会进入：

```text
verificationState=not-production-pass-evidence
warning=SKIPPED_OR_MIXED_CAPTURE_REMAINS_BLOCKED
```

这样更符合生产流程：默认状态是“还不是生产 pass”，不是“系统坏了”。

## HTTP 入口

新增路由：

```text
GET /api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification
GET /api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification?format=markdown
```

路由注册在：

```text
src/routes/statusRoutes.ts
```

核心调用：

```ts
const profile = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification({
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
  return renderProductionLiveProbeRealReadSmokeProductionPassEvidenceVerificationMarkdown(profile);
}
```

## 测试覆盖

新增测试：

```text
test/productionLiveProbeRealReadSmokeProductionPassEvidenceVerification.test.ts
```

默认 skipped 场景：

```ts
expect(profile).toMatchObject({
  verificationState: "not-production-pass-evidence",
  readyForProductionPassEvidenceVerification: false,
  verification: {
    captureState: "captured-skipped",
    captureMode: "skipped",
    releaseGateDecision: "not-production-pass-evidence",
    readOnlyWindowOpen: false,
    allCapturedRecordsPass: false,
    skippedOrMixedRemainsBlocked: true,
  },
  summary: {
    productionBlockerCount: 0,
  },
});
```

all-pass 场景使用 fake upstream client，不启动真实 Java / mini-kv：

```ts
expect(profile).toMatchObject({
  verificationState: "production-pass-evidence-ready",
  readyForProductionPassEvidenceVerification: true,
  readyForProductionOperations: false,
  verification: {
    captureState: "captured-pass",
    captureMode: "pass",
    releaseGateDecision: "production-pass-evidence-ready",
    readOnlyWindowOpen: true,
    allCapturedRecordsPass: true,
    skippedOrMixedRemainsBlocked: false,
  },
});
```

还覆盖：

```text
UPSTREAM_ACTIONS_ENABLED=true 时 blocked
JSON / Markdown route 可访问
```

## README 和归档

README 新增：

```text
Production live probe real-read smoke production pass evidence verification
GET /api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification
GET /api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification?format=markdown
```

运行归档：

```text
b/149/图片/production-live-probe-real-read-smoke-production-pass-evidence-verification.png
b/149/解释/运行调试说明.md
```

## 一句话总结

v149 把 v148 capture 和 v146 release gate 汇总成一层最终验证：默认 skipped 只会得到 `not-production-pass-evidence`，不会冒充 pass；all-pass 也只代表生产 pass 证据验证通过，不代表生产操作可以执行。
