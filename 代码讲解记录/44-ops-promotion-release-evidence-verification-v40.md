# v40 Promotion Release Evidence Verification 代码讲解

## 1. 这一版解决什么问题

v39 生成了最终发布证据：

```ts
const releaseEvidence = createOpsPromotionReleaseEvidence({
  completion,
  completionVerification,
});
```

v40 给它补上复验层：重新生成 expected release evidence，复算 evidence digest，并逐项检查 5 个 evidence item。这样最终发布证据不仅能被生成，还能被独立验证。

## 2. Release Evidence Verification Item

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionReleaseEvidenceVerificationItem {
  name: OpsPromotionReleaseEvidenceItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  evidenceDigest: {
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

这里对每个 evidence item 做 4 个维度的匹配：

- `validMatches`：是否和 expected item 的 valid 一致。
- `sourceMatches`：来源 API 是否一致。
- `detailMatches`：说明文本是否一致。
- `digestMatches`：digest 是否一致。

## 3. 核心复验函数

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionReleaseEvidenceVerification(input: {
  completion: OpsPromotionHandoffCompletion;
  completionVerification: OpsPromotionHandoffCompletionVerification;
  evidence: OpsPromotionReleaseEvidence;
}): OpsPromotionReleaseEvidenceVerification {
  const expectedEvidence = createOpsPromotionReleaseEvidence({
    completion: input.completion,
    completionVerification: input.completionVerification,
  });
```

核心思路和前面的 verification 一样：不直接相信传入的 evidence，而是用 completion + completionVerification 重新算出 expected evidence。

## 4. Evidence Digest 复算

```ts
const recomputedEvidenceDigest = digestStable(archiveReleaseEvidenceDigestPayload({
  evidenceName: input.evidence.evidenceName,
  completionName: input.evidence.completionName,
  closureName: input.evidence.closureName,
  receiptName: input.evidence.receiptName,
  certificateName: input.evidence.certificateName,
  packageName: input.evidence.packageName,
  archiveName: input.evidence.archiveName,
  valid: input.evidence.valid,
  state: input.evidence.state,
  handoffReady: input.evidence.handoffReady,
  completionDigest: input.evidence.completionDigest.value,
  verifiedCompletionDigest: input.evidence.verifiedCompletionDigest.value,
  closureDigest: input.evidence.closureDigest.value,
  verifiedClosureDigest: input.evidence.verifiedClosureDigest.value,
  decision: input.evidence.decision,
  verification: input.evidence.verification,
  evidenceItems: input.evidence.evidenceItems,
  nextActions: input.evidence.nextActions,
}));
```

这一步回答的是：当前 evidence 自己声明的 digest，是否真的覆盖了当前这些字段。

## 5. Evidence Item 逐项比对

```ts
const evidenceItemChecks = input.evidence.evidenceItems.map((item) => {
  const expected = expectedEvidence.evidenceItems.find((candidate) => candidate.name === item.name);
  const validMatches = expected?.valid === item.valid;
  const sourceMatches = expected?.source === item.source;
  const detailMatches = expected?.detail === item.detail;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
  const digestMatches = item.digest.value === expectedDigest.value;
```

如果某个 item 被改名、改 source、改 detail、改 digest，都会导致 `valid=false`：

```ts
return {
  name: item.name,
  valid: expected !== undefined && validMatches && sourceMatches && detailMatches && digestMatches,
  validMatches,
  sourceMatches,
  detailMatches,
  digestMatches,
  evidenceDigest: { ...item.digest },
  recomputedDigest: expectedDigest,
  source: item.source,
  detail: item.detail,
};
```

## 6. 整体 Checks

```ts
const checks = {
  evidenceDigestValid: input.evidence.evidenceDigest.value === recomputedEvidenceDigest,
  coveredFieldsMatch: stableJson(input.evidence.evidenceDigest.coveredFields)
    === stableJson(expectedEvidence.evidenceDigest.coveredFields),
  evidenceItemsValid: evidenceItemChecks.length === expectedEvidence.evidenceItems.length
    && evidenceItemChecks.every((item) => item.valid),
  evidenceNameMatches: input.evidence.evidenceName === expectedEvidence.evidenceName,
  completionDigestMatches: input.evidence.completionDigest.value === expectedEvidence.completionDigest.value,
  verifiedCompletionDigestMatches: input.evidence.verifiedCompletionDigest.value === expectedEvidence.verifiedCompletionDigest.value,
  closureDigestMatches: input.evidence.closureDigest.value === expectedEvidence.closureDigest.value,
  verifiedClosureDigestMatches: input.evidence.verifiedClosureDigest.value === expectedEvidence.verifiedClosureDigest.value,
};
```

这里同样分两层：

- digest 自洽：`evidenceDigestValid`
- 与 expected evidence 一致：各种 `Matches`

## 7. 新 API

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/release-evidence/verification", {
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

路由完整生成前置链路：

```ts
const releaseEvidence = createOpsPromotionReleaseEvidence({
  completion,
  completionVerification,
});
const releaseEvidenceVerification = createOpsPromotionReleaseEvidenceVerification({
  completion,
  completionVerification,
  evidence: releaseEvidence,
});
```

Markdown 输出：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionReleaseEvidenceVerificationMarkdown(releaseEvidenceVerification);
}
```

## 8. Dashboard

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionReleaseEvidenceVerification">Release Evidence Verification</button>
<button data-action="opsPromotionReleaseEvidenceVerificationReport">Release Evidence Verification Report</button>
```

对应点击逻辑：

```js
if (action === "opsPromotionReleaseEvidenceVerification") {
  write(await api("/api/v1/ops/promotion-archive/release-evidence/verification"));
}
if (action === "opsPromotionReleaseEvidenceVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/release-evidence/verification?format=markdown");
```

## 9. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

空账本复验：

```ts
expect(emptyVerification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  checks: {
    evidenceDigestValid: true,
    coveredFieldsMatch: true,
    evidenceItemsValid: true,
  },
});
```

blocked 决策后验证 digest 和 item：

```ts
expect(verification.json().evidenceDigest.value).toBe(verification.json().recomputedEvidenceDigest.value);
expect(verification.json().evidenceItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
expect(verification.json().evidenceItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
```

approved 全链路最终动作：

```ts
expect(releaseEvidenceVerification.json().nextActions).toEqual([
  "Release evidence verification is complete; store the verified evidence digest with the final release archive.",
]);
```

## 10. 小结

v40 把 v39 的 release evidence 变成可复验对象：

- 新增 `/api/v1/ops/promotion-archive/release-evidence/verification`。
- 支持 JSON 和 Markdown。
- Dashboard 增加 Release Evidence Verification 两个按钮。
- evidence digest 会被重新计算。
- 5 个 evidence item 会逐项比对。
- 测试从 79 条增加到 80 条。
