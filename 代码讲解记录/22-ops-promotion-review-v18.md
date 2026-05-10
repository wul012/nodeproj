# 22 - V18 ops promotion review

V18 在 V12 readiness、V14 runbook、V15 checkpoint、V17 baseline 之上，新增本地 promotion review：

```text
GET /api/v1/ops/promotion-review
```

它把多个本地安全信号合成一个推进决策：

```text
blocked / review-required / approved
```

这个接口只读取 Node 内存状态，不访问 Java / mini-kv。

## 1. 决策类型

文件：`src/services/opsPromotionReview.ts`

```ts
export type OpsPromotionDecision = "blocked" | "review-required" | "approved";
export type OpsPromotionReasonSeverity = "blocker" | "review" | "pass";
```

含义：

- `blocked`：存在硬阻断。
- `review-required`：没有硬阻断，但仍需要人工确认。
- `approved`：本地证据全部通过。

## 2. reason 结构

文件：`src/services/opsPromotionReview.ts`

```ts
export interface OpsPromotionReason {
  code: string;
  severity: OpsPromotionReasonSeverity;
  message: string;
  evidence?: number | boolean | string;
  nextAction?: string;
}
```

每个 reason 都带：

- `code`：机器可读原因。
- `severity`：阻断、需复核、通过。
- `evidence`：当时的证据值。
- `nextAction`：下一步建议。

## 3. review 输出结构

文件：`src/services/opsPromotionReview.ts`

```ts
export interface OpsPromotionReview {
  service: "orderops-node";
  generatedAt: string;
  decision: OpsPromotionDecision;
  readyForPromotion: boolean;
  reasons: OpsPromotionReason[];
  summary: {
    readinessState: OpsReadiness["state"];
    runbookState: OpsRunbook["state"];
    baselineState: OpsBaselineStatus["state"];
    safety: OpsSummary["safety"];
    signals: OpsSummary["signals"];
    latestCheckpointSequence?: number;
    baselineCheckpointSequence?: number;
  };
}
```

`readyForPromotion` 只有 `decision === "approved"` 才为 true。

## 4. 创建 promotion review

文件：`src/services/opsPromotionReview.ts`

核心函数接收四个本地对象：

```ts
export function createOpsPromotionReview(input: {
  summary: OpsSummary;
  readiness: OpsReadiness;
  runbook: OpsRunbook;
  baseline: OpsBaselineStatus;
}): OpsPromotionReview {
```

然后生成四类 reason：

```ts
const reasons = [
  readinessReason(input.readiness),
  runbookReason(input.runbook),
  checkpointReason(input.baseline),
  baselineReason(input.baseline),
];
```

最后按保守规则决定总状态：

```ts
const blockers = reasons.filter((reason) => reason.severity === "blocker").length;
const reviews = reasons.filter((reason) => reason.severity === "review").length;
const decision: OpsPromotionDecision = blockers > 0 ? "blocked" : reviews > 0 ? "review-required" : "approved";
```

只要有 blocker，就不会进入 review-required 或 approved。

## 5. readiness reason

文件：`src/services/opsPromotionReview.ts`

如果 V12 readiness 已经 ready：

```ts
if (readiness.readyForUpstreamExecution) {
  return pass("READINESS_READY", "Readiness gate is ready for upstream execution.", readiness.state);
}
```

否则直接 blocker：

```ts
return blocker(
  "READINESS_NOT_READY",
  `Readiness gate is ${readiness.state}.`,
  readiness.state,
  readiness.nextActions[0] ?? "Review readiness checks before promotion.",
);
```

这会覆盖默认 `UPSTREAM_ACTIONS_ENABLED=false` 的情况。

## 6. runbook reason

文件：`src/services/opsPromotionReview.ts`

如果 V14 runbook ready：

```ts
if (runbook.readyForExecution) {
  return pass("RUNBOOK_READY", "Runbook checklist is ready for execution.", runbook.state);
}
```

否则 blocker：

```ts
return blocker(
  "RUNBOOK_NOT_READY",
  `Runbook checklist is ${runbook.state}.`,
  runbook.state,
  firstRunbookNextAction(runbook) ?? "Complete blocked and todo runbook steps before promotion.",
);
```

`firstRunbookNextAction` 会拿第一个 blocked/todo step 的建议：

```ts
return runbook.steps.find((step) => step.status === "blocked" || step.status === "todo")?.nextAction;
```

## 7. checkpoint reason

文件：`src/services/opsPromotionReview.ts`

如果已经有最新 checkpoint：

```ts
if (baseline.latest !== undefined) {
  return pass("LATEST_CHECKPOINT_PRESENT", "A latest checkpoint is available for review.", baseline.latest.sequence);
}
```

否则进入 review-required：

```ts
return review(
  "NO_CHECKPOINT",
  "No checkpoint exists yet for promotion evidence.",
  "missing",
  "Create a checkpoint before promotion review.",
);
```

这里不是 blocker，因为是否必须留 checkpoint 可以由流程决定；但它会阻止 approved。

## 8. baseline reason

文件：`src/services/opsPromotionReview.ts`

未设置 baseline 时：

```ts
if (baseline.state === "unset") {
  return review(
    "BASELINE_UNSET",
    "No checkpoint baseline has been selected.",
    "unset",
    "Set a checkpoint baseline before promotion.",
  );
}
```

baseline 是最新 checkpoint：

```ts
if (baseline.state === "current") {
  return pass("BASELINE_CURRENT", "Baseline is the latest checkpoint.", baseline.baseline?.sequence ?? "current");
}
```

如果 baseline diff 退化，直接 blocker：

```ts
if (baseline.diff?.direction === "regressed") {
  return blocker(
    "BASELINE_REGRESSED",
    "Latest checkpoint regressed from the selected baseline.",
    baseline.diff.direction,
    "Review checkpoint diff and resolve regressions before promotion.",
  );
}
```

如果是 improved，则需要人工复核：

```ts
if (baseline.diff?.direction === "improved") {
  return review(
    "BASELINE_IMPROVED",
    "Latest checkpoint improved from the selected baseline.",
    baseline.diff.direction,
    "Review the improvement and reset baseline if this should become the new reference.",
  );
}
```

## 9. route 组装

文件：`src/routes/opsSummaryRoutes.ts`

V18 route：

```ts
app.get("/api/v1/ops/promotion-review", async () => {
  const summary = createOpsSummary(deps);
  const readiness = createOpsReadiness(summary);
  return createOpsPromotionReview({
    summary,
    readiness,
    runbook: createOpsRunbook(summary, readiness),
    baseline: createBaselineStatus(deps),
  });
});
```

这个接口没有调用 `deps.snapshots.sample()`，所以不会触发上游 probe。

## 10. baseline helper

文件：`src/routes/opsSummaryRoutes.ts`

V18 把 baseline status 的生成抽成 helper：

```ts
function createBaselineStatus(deps: OpsSummaryRouteDeps) {
  const baseline = deps.opsBaseline.get();
  const latest = deps.opsCheckpoints.list(1)[0];
  return createOpsBaselineStatus({
    baseline,
    baselineCheckpoint: baseline === undefined ? undefined : deps.opsCheckpoints.get(baseline.checkpointId),
    latest,
  });
}
```

这样 `GET /api/v1/ops/baseline` 和 `GET /api/v1/ops/promotion-review` 使用同一份 baseline 判断。

## 11. Dashboard

文件：`src/ui/dashboard.ts`

V18 新增按钮：

```html
<button data-action="opsPromotionReview">Promotion Review</button>
```

点击后读取本地 review：

```js
if (action === "opsPromotionReview") {
  write(await api("/api/v1/ops/promotion-review"));
}
```

## 12. 测试覆盖

文件：`test/opsPromotionReview.test.ts`

默认配置下必须 blocked：

```ts
expect(response.json()).toMatchObject({
  service: "orderops-node",
  decision: "blocked",
  readyForPromotion: false,
  summary: {
    readinessState: "blocked",
    runbookState: "blocked",
    baselineState: "unset",
  },
});
```

并且包含 blocker/review 原因：

```ts
expect.objectContaining({
  code: "READINESS_NOT_READY",
  severity: "blocker",
}),
```

完整本地证据下 approved：

```ts
expect(review.json()).toMatchObject({
  decision: "approved",
  readyForPromotion: true,
  summary: {
    readinessState: "ready",
    runbookState: "ready",
    baselineState: "current",
    latestCheckpointSequence: 1,
    baselineCheckpointSequence: 1,
  },
});
```

baseline regression 下 blocked：

```ts
expect(review.json().reasons).toEqual(expect.arrayContaining([
  expect.objectContaining({
    code: "BASELINE_REGRESSED",
    severity: "blocker",
  }),
]));
```

## 一句话总结

V18 把前面几版分散的本地安全证据合成了一个 promotion review：是否可推进、为什么不行、下一步做什么，一次请求就能看到。
