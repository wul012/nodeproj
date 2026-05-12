# 72. Node v68：Approval execution gate preview

## 模块角色

v68 新增的是执行前最后一道本地门禁：

```text
src/services/operationApprovalExecutionGatePreview.ts
```

它不重新收集底层证据，而是吃掉 v66/v67 已经形成的 handoff bundle：

```ts
export function createOperationApprovalExecutionGatePreview(
  bundle: OperationApprovalHandoffBundle,
): OperationApprovalExecutionGatePreview {
```

这意味着 v68 的职责很窄：判断“当前 request + decision + evidence bundle 是否看起来能进入执行前复核”，但不执行任何 Java replay 或 mini-kv 写命令。

## 核心安全边界

最关键的字段是这两个：

```ts
previewOnly: true;
executionAllowed: false;
```

在生成预览时也被固定写死：

```ts
previewOnly: true as const,
executionAllowed: false as const,
```

所以即使 gate state 是 `ready`，本版也只是“可以给人看”，不是“可以自动执行”。

## 门禁检查

v68 把执行前必须满足的条件集中在 `gateChecks`：

```ts
return {
  requestApproved: bundle.summary.requestStatus === "approved",
  decisionApproved: bundle.summary.decision === "approved",
  handoffReady: bundle.handoffReady,
  evidenceVerificationValid: bundle.verification.valid,
  upstreamUntouched: !bundle.summary.upstreamTouched,
  noRequestHardBlockers: bundle.report.request.hardBlockers.length === 0,
  requiredUpstreamEvidenceAvailable: requiredUpstreamEvidenceAvailable(bundle),
  javaApprovedForReplayOk: javaApprovedForReplayOk(bundle),
  javaApprovalDigestEvidenceValid: bundle.verification.checks.javaApprovalDigestEvidenceValid,
  miniKvCommandDigestEvidenceValid: bundle.verification.checks.miniKvCommandDigestEvidenceValid,
  miniKvSideEffectCountMatches: bundle.verification.checks.miniKvSideEffectCountMatches,
};
```

这里可以看到 v68 复用了 v67 的 digest/schema 结果，而不是再写一套重复校验。

## 上游证据要求

Java replay simulation 这条线要求 approval-status 可用：

```ts
function requiresJavaApprovalStatus(bundle: OperationApprovalHandoffBundle): boolean {
  return bundle.summary.target === "order-platform" && bundle.summary.action === "failed-event-replay-simulation";
}
```

mini-kv 操作则要求 EXPLAINJSON 证据可用：

```ts
if (bundle.summary.target === "mini-kv") {
  return bundle.summary.miniKvExplainCoverage === "available";
}
```

这保证 gate preview 不会在缺少上游解释证据时误报“可以执行”。

## 状态判断

门禁状态仍然是三段式：

```ts
function resolveState(hardBlockers: string[], warnings: string[]): OperationApprovalExecutionGateState {
  if (hardBlockers.length > 0) {
    return "blocked";
  }
  if (warnings.length > 0) {
    return "review-required";
  }
  return "ready";
}
```

`blocked` 表示不能推进，`review-required` 表示没有硬阻断但仍需人工复核，`ready` 表示证据链本地自洽。

## 路由入口

路由层新增：

```ts
GET /api/v1/operation-approval-requests/:requestId/execution-gate-preview
GET /api/v1/operation-approval-requests/:requestId/execution-gate-preview?format=markdown
```

实现上仍然先创建 evidence report、verification、handoff bundle，再生成 gate preview：

```ts
const report = await evidenceService.createReport(...);
const verification = createOperationApprovalEvidenceVerification(report);
const bundle = createOperationApprovalHandoffBundle(report, verification);
const preview = createOperationApprovalExecutionGatePreview(bundle);
```

这条链路和前几个版本一致，避免新增旁路。

## 一句话总结

v68 把“证据归档”推进到“执行门禁预览”，但仍然明确停在 Node 本地：只判断、只展示、只归档，不真实执行。
