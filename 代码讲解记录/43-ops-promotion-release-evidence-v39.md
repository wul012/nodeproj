# v39 Promotion Release Evidence 代码讲解

## 1. 这一版解决什么问题

v38 已经能复验最终 completion：

```ts
const completionVerification = createOpsPromotionHandoffCompletionVerification({
  closure,
  closureVerification,
  completion,
});
```

v39 在它后面生成 `release evidence`。它把 completion、completion verification、closure 引用和最终 closeout 状态打包成一个可归档的最终发布证据记录。

## 2. Release Evidence Item

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionReleaseEvidenceItemName =
  | "handoff-completion"
  | "verified-handoff-completion"
  | "handoff-closure"
  | "verified-handoff-closure"
  | "final-closeout-state";

export interface OpsPromotionReleaseEvidenceItem {
  name: OpsPromotionReleaseEvidenceItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}
```

这 5 个 item 把最终发布证据拆成几类：

- completion 本体。
- completion verification。
- closure 本体。
- closure verification。
- 最终 closeout 状态。

## 3. 核心生成函数

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionReleaseEvidence(input: {
  completion: OpsPromotionHandoffCompletion;
  completionVerification: OpsPromotionHandoffCompletionVerification;
}): OpsPromotionReleaseEvidence {
  const evidenceName = `promotion-release-evidence-${input.completionVerification.recomputedCompletionDigest.value.slice(0, 12)}`;
  const evidenceItems = archiveReleaseEvidenceItems(input.completion, input.completionVerification);
```

`evidenceName` 绑定到 `recomputedCompletionDigest` 前 12 位。也就是说 release evidence 的名字来自复验后的 completion 指纹。

核心 valid 条件：

```ts
const valid = input.completion.valid
  && input.completionVerification.valid
  && input.completion.completionDigest.value === input.completionVerification.recomputedCompletionDigest.value
  && evidenceItems.every((item) => item.valid);
const handoffReady = valid && input.completion.handoffReady && input.completionVerification.handoffReady;
```

这里继续区分：

- `valid` 表示证据包是否自洽。
- `handoffReady` 表示最终 release archive 是否可以收口。

## 4. Evidence Digest 覆盖字段

```ts
evidenceDigest: {
  algorithm: "sha256",
  value: digestStable(digestPayload),
  coveredFields: [
    "evidenceName",
    "completionName",
    "closureName",
    "receiptName",
    "certificateName",
    "packageName",
    "archiveName",
    "valid",
    "state",
    "handoffReady",
    "completionDigest",
    "verifiedCompletionDigest",
    "closureDigest",
    "verifiedClosureDigest",
    "decision",
    "verification",
    "evidenceItems",
    "nextActions",
  ],
},
```

release evidence 的 digest 覆盖了最终证据名、completion/closure 引用、状态、决策摘要、verification 摘要、evidence items 和 nextActions。

## 5. Evidence Items 如何生成

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveReleaseEvidenceItems(
  completion: OpsPromotionHandoffCompletion,
  completionVerification: OpsPromotionHandoffCompletionVerification,
): OpsPromotionReleaseEvidenceItem[] {
  return [
```

completion item：

```ts
{
  name: "handoff-completion",
  valid: completion.valid && completionVerification.checks.completionDigestValid,
  source: "/api/v1/ops/promotion-archive/handoff-completion",
  digest: {
    algorithm: "sha256",
    value: completion.completionDigest.value,
  },
}
```

verified completion item：

```ts
{
  name: "verified-handoff-completion",
  valid: completionVerification.valid,
  source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
  digest: {
    algorithm: "sha256",
    value: completionVerification.recomputedCompletionDigest.value,
  },
}
```

最终 closeout 状态 item：

```ts
{
  name: "final-closeout-state",
  valid: completionVerification.valid
    && completionVerification.checks.handoffReadyMatches
    && completion.verification.closeoutReady === completionVerification.summary.closeoutReady,
  source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
}
```

这让 release evidence 不只是一个 digest，还能解释自己到底由哪些证据组成。

## 6. 新 API

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/release-evidence", {
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

路由完整生成前置链路后创建 release evidence：

```ts
const completionVerification = createOpsPromotionHandoffCompletionVerification({
  closure,
  closureVerification,
  completion,
});
const releaseEvidence = createOpsPromotionReleaseEvidence({
  completion,
  completionVerification,
});
```

Markdown 输出：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionReleaseEvidenceMarkdown(releaseEvidence);
}
```

## 7. Dashboard

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionReleaseEvidence">Release Evidence</button>
<button data-action="opsPromotionReleaseEvidenceReport">Release Evidence Report</button>
```

点击逻辑：

```js
if (action === "opsPromotionReleaseEvidence") {
  write(await api("/api/v1/ops/promotion-archive/release-evidence"));
}
if (action === "opsPromotionReleaseEvidenceReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/release-evidence?format=markdown");
```

## 8. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

独立测试覆盖空账本：

```ts
expect(emptyEvidence.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  verification: {
    completionVerified: true,
    completionDigestValid: true,
    completionStepsValid: true,
    closureReferenceValid: true,
    closeoutReady: false,
  },
});
```

blocked 决策后仍然是有效证据，但没有 ready：

```ts
expect(evidence.json().evidenceItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
expect(evidence.json().nextActions).toContain(
  "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
);
```

approved 全链路进入最终收口：

```ts
expect(releaseEvidence.json().nextActions).toEqual([
  "Release evidence is ready; store the evidence digest with the final release archive.",
]);
```

## 9. 小结

v39 把最终 handoff completion 和 verification 打包成 release evidence：

- 新增 `/api/v1/ops/promotion-archive/release-evidence`。
- 支持 JSON 和 Markdown。
- Dashboard 增加 Release Evidence 两个按钮。
- evidence digest 覆盖最终发布证据字段。
- 测试从 78 条增加到 79 条。
