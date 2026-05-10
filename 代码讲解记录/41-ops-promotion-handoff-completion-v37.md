# v37 Promotion Handoff Completion 代码讲解

## 1. 这一版解决什么问题

v36 已经能复验最终 closure：

```ts
const closureVerification = createOpsPromotionHandoffClosureVerification({
  receipt,
  receiptVerification,
  closure,
});
```

v37 在它后面新增 `handoff completion record`。它不是再做一次外部调用，而是把“closure 已生成、closure 已复验、closeout item 已复验、receipt 链路已复验、最终 ready 状态已记录”打包成最终完成记录。

## 2. Completion Step：完成记录的最小检查单元

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionHandoffCompletionStepName =
  | "closure-created"
  | "closure-verified"
  | "closure-items-verified"
  | "receipt-chain-verified"
  | "handoff-readiness-recorded";

export interface OpsPromotionHandoffCompletionStep {
  name: OpsPromotionHandoffCompletionStepName;
  valid: boolean;
  ready: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}
```

这里有两个状态：

- `valid` 表示证据是否自洽，例如 digest、source、引用链是否匹配。
- `ready` 表示该步骤是否已经达到最终交接条件。

所以空账本或 blocked 状态下，completion 仍然可以 `valid=true`，但 `handoffReady=false`。

## 3. 核心生成函数

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionHandoffCompletion(input: {
  closure: OpsPromotionHandoffClosure;
  closureVerification: OpsPromotionHandoffClosureVerification;
}): OpsPromotionHandoffCompletion {
  const completionName = `promotion-completion-${input.closureVerification.recomputedClosureDigest.value.slice(0, 12)}`;
  const completionSteps = archiveHandoffCompletionSteps(input.closure, input.closureVerification);
```

completion 的名字来自 `recomputedClosureDigest` 前 12 位。这样它不是随便生成的字符串，而是和复验后的 closure 指纹绑定。

核心 valid 条件：

```ts
const valid = input.closure.valid
  && input.closureVerification.valid
  && input.closure.closureDigest.value === input.closureVerification.recomputedClosureDigest.value
  && completionSteps.every((step) => step.valid);
const handoffReady = valid && input.closure.handoffReady && input.closureVerification.handoffReady;
```

这里区分得很清楚：

- `valid` 是 completion record 是否可信。
- `handoffReady` 是能不能真的进入最终归档收口。

## 4. Completion Digest 覆盖字段

```ts
completionDigest: {
  algorithm: "sha256",
  value: digestStable(digestPayload),
  coveredFields: [
    "completionName",
    "closureName",
    "receiptName",
    "certificateName",
    "packageName",
    "archiveName",
    "valid",
    "state",
    "handoffReady",
    "closureDigest",
    "verifiedClosureDigest",
    "decision",
    "verification",
    "completionSteps",
    "nextActions",
  ],
},
```

也就是说，如果 completion 的名称、状态、closure digest、decision 摘要、完成步骤、下一步动作任意一个发生变化，`completionDigest` 都会变。

## 5. Completion Steps 如何生成

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveHandoffCompletionSteps(
  closure: OpsPromotionHandoffClosure,
  closureVerification: OpsPromotionHandoffClosureVerification,
): OpsPromotionHandoffCompletionStep[] {
  const referenceChecksValid = archiveHandoffCompletionReferenceChecksValid(closureVerification);
```

五个步骤分别覆盖不同层次：

```ts
{
  name: "closure-created",
  valid: closure.valid && closure.closureDigest.value === closureVerification.closureDigest.value,
  ready: closure.valid,
  source: "/api/v1/ops/promotion-archive/handoff-closure",
}
```

`closure-created` 证明 closure 存在，并且 closure 上报的 digest 与 verification 看到的一致。

```ts
{
  name: "handoff-readiness-recorded",
  valid: closure.handoffReady === closureVerification.handoffReady
    && closure.state === closureVerification.state,
  ready: closure.handoffReady && closureVerification.handoffReady,
  source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
}
```

`handoff-readiness-recorded` 的 `valid` 可以为 true，但 `ready` 可能为 false。这就是 v37 的关键：它能诚实记录“当前未 ready”，同时保持证据链有效。

## 6. 新 API

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-completion", {
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

路由会完整生成前置链路，然后创建 completion：

```ts
const closureVerification = createOpsPromotionHandoffClosureVerification({
  receipt,
  receiptVerification,
  closure,
});
const completion = createOpsPromotionHandoffCompletion({
  closure,
  closureVerification,
});
```

Markdown 输出：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionHandoffCompletionMarkdown(completion);
}
```

## 7. Dashboard

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionHandoffCompletion">Handoff Completion</button>
<button data-action="opsPromotionHandoffCompletionReport">Completion Report</button>
```

点击后分别请求 JSON 和 Markdown：

```js
if (action === "opsPromotionHandoffCompletion") {
  write(await api("/api/v1/ops/promotion-archive/handoff-completion"));
}
if (action === "opsPromotionHandoffCompletionReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/handoff-completion?format=markdown");
```

## 8. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

独立测试验证空账本 completion：

```ts
expect(emptyCompletion.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  verification: {
    closureVerified: true,
    closureDigestValid: true,
    closureItemsValid: true,
    referenceChecksValid: true,
    closeoutReady: false,
  },
});
```

blocked 后仍然 valid，但未 ready：

```ts
expect(completion.json().completionSteps[4]).toMatchObject({
  name: "handoff-readiness-recorded",
  valid: true,
  ready: false,
});
```

approved 全链路中 completion 最终 ready：

```ts
expect(handoffCompletion.json().nextActions).toEqual([
  "Promotion handoff completion is ready; archive the completion digest with the final release evidence.",
]);
```

## 9. 小结

v37 让 promotion archive 链路多了一个最终完成记录：

- closure/verification 被包装成 completion record。
- completion digest 覆盖最终收口字段。
- completion step 同时表达 `valid` 和 `ready`。
- Dashboard 和 API 都能直接查看完成记录。
- 测试从 76 条增加到 77 条。
