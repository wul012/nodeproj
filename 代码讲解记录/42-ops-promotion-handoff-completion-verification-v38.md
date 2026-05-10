# v38 Promotion Handoff Completion Verification 代码讲解

## 1. 这一版解决什么问题

v37 已经生成最终完成记录：

```ts
const completion = createOpsPromotionHandoffCompletion({
  closure,
  closureVerification,
});
```

v38 给它补上复验层：重新生成 expected completion，复算 completion digest，并逐项检查 5 个 completion step。这样最终完成记录不仅能生成，还能被独立验证。

## 2. Completion Verification Step

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionHandoffCompletionVerificationStep {
  name: OpsPromotionHandoffCompletionStepName;
  valid: boolean;
  validMatches: boolean;
  readyMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  completionDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
  detail: string;
}
```

这里比 v37 多了几个 `Matches` 字段：

- `validMatches`：当前 step 的 valid 是否和重新生成的一致。
- `readyMatches`：当前 step 的 ready 判断是否一致。
- `sourceMatches`：step 来源 API 是否一致。
- `detailMatches`：说明文本是否一致。
- `digestMatches`：step digest 是否一致。

## 3. 核心复验函数

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionHandoffCompletionVerification(input: {
  closure: OpsPromotionHandoffClosure;
  closureVerification: OpsPromotionHandoffClosureVerification;
  completion: OpsPromotionHandoffCompletion;
}): OpsPromotionHandoffCompletionVerification {
  const expectedCompletion = createOpsPromotionHandoffCompletion({
    closure: input.closure,
    closureVerification: input.closureVerification,
  });
```

关键是重新调用 `createOpsPromotionHandoffCompletion`。这样 verification 不只是相信传入的 completion，而是用 closure 链路重新算出“应该是什么”。

## 4. Completion Digest 复算

```ts
const recomputedCompletionDigest = digestStable(archiveHandoffCompletionDigestPayload({
  completionName: input.completion.completionName,
  closureName: input.completion.closureName,
  receiptName: input.completion.receiptName,
  certificateName: input.completion.certificateName,
  packageName: input.completion.packageName,
  archiveName: input.completion.archiveName,
  valid: input.completion.valid,
  state: input.completion.state,
  handoffReady: input.completion.handoffReady,
  closureDigest: input.completion.closureDigest.value,
  verifiedClosureDigest: input.completion.verifiedClosureDigest.value,
  decision: input.completion.decision,
  verification: input.completion.verification,
  completionSteps: input.completion.completionSteps,
  nextActions: input.completion.nextActions,
}));
```

这段检查 completion 自己的 digest 是否覆盖了当前字段。随后再和 expected completion 比较，判断它是不是来自最新 closure + closure verification。

## 5. 逐个 Step 比对

```ts
const completionStepChecks = input.completion.completionSteps.map((step) => {
  const expected = expectedCompletion.completionSteps.find((candidate) => candidate.name === step.name);
  const validMatches = expected?.valid === step.valid;
  const readyMatches = expected?.ready === step.ready;
  const sourceMatches = expected?.source === step.source;
  const detailMatches = expected?.detail === step.detail;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: step.name }) };
  const digestMatches = step.digest.value === expectedDigest.value;
```

completion step 不只比 digest，也比 ready 状态。这个很重要，因为 v37 引入了 `valid=true` 但 `ready=false` 的情况，v38 要能确认这种状态不是误写。

最终每个 step 会变成：

```ts
return {
  name: step.name,
  valid: expected !== undefined && validMatches && readyMatches && sourceMatches && detailMatches && digestMatches,
  validMatches,
  readyMatches,
  sourceMatches,
  detailMatches,
  digestMatches,
  completionDigest: { ...step.digest },
  recomputedDigest: expectedDigest,
  source: step.source,
  detail: step.detail,
};
```

## 6. 整体 Checks

```ts
const checks = {
  completionDigestValid: input.completion.completionDigest.value === recomputedCompletionDigest,
  coveredFieldsMatch: stableJson(input.completion.completionDigest.coveredFields)
    === stableJson(expectedCompletion.completionDigest.coveredFields),
  completionStepsValid: completionStepChecks.length === expectedCompletion.completionSteps.length
    && completionStepChecks.every((step) => step.valid),
  completionNameMatches: input.completion.completionName === expectedCompletion.completionName,
  closureNameMatches: input.completion.closureName === expectedCompletion.closureName,
  validMatches: input.completion.valid === expectedCompletion.valid,
  stateMatches: input.completion.state === expectedCompletion.state,
  handoffReadyMatches: input.completion.handoffReady === expectedCompletion.handoffReady,
  closureDigestMatches: input.completion.closureDigest.value === expectedCompletion.closureDigest.value,
  verifiedClosureDigestMatches: input.completion.verifiedClosureDigest.value === expectedCompletion.verifiedClosureDigest.value,
};
```

这里继续分两层：

- digest 层：completion 当前字段和 completion digest 是否自洽。
- 业务层：completion 是否等于用当前 closure 链路重新生成的 expected completion。

## 7. 新 API

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-completion/verification", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["json", "markdown"] },
      },
      additionalProperties: false,
    },
  },
}, async (request, reply) => {
```

路由仍然完整生成前置链路：

```ts
const completion = createOpsPromotionHandoffCompletion({
  closure,
  closureVerification,
});
const completionVerification = createOpsPromotionHandoffCompletionVerification({
  closure,
  closureVerification,
  completion,
});
```

Markdown 输出：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionHandoffCompletionVerificationMarkdown(completionVerification);
}
```

## 8. Dashboard

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionHandoffCompletionVerification">Completion Verification</button>
<button data-action="opsPromotionHandoffCompletionVerificationReport">Completion Verification Report</button>
```

对应请求：

```js
if (action === "opsPromotionHandoffCompletionVerification") {
  write(await api("/api/v1/ops/promotion-archive/handoff-completion/verification"));
}
if (action === "opsPromotionHandoffCompletionVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/handoff-completion/verification?format=markdown");
```

## 9. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

独立测试覆盖空账本：

```ts
expect(emptyVerification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  checks: {
    completionDigestValid: true,
    coveredFieldsMatch: true,
    completionStepsValid: true,
  },
});
```

blocked 决策后确认 digest 和 step 都匹配：

```ts
expect(verification.json().completionDigest.value).toBe(verification.json().recomputedCompletionDigest.value);
expect(verification.json().completionSteps.every((step: { valid: boolean }) => step.valid)).toBe(true);
expect(verification.json().completionSteps.every((step: { digestMatches: boolean }) => step.digestMatches)).toBe(true);
```

approved 全链路确认最终动作：

```ts
expect(handoffCompletionVerification.json().nextActions).toEqual([
  "Handoff completion verification is complete; archive the verified completion digest with the final release evidence.",
]);
```

## 10. 小结

v38 把 v37 的 completion record 变成可复验对象：

- 新增 completion verification API 和 Markdown。
- completion digest 会被重新计算。
- 5 个 completion step 会逐项比对。
- Dashboard 增加 Completion Verification 两个按钮。
- 测试从 77 条增加到 78 条。
