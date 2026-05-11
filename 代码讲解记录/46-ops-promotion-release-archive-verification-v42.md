# v42 Promotion Release Archive Verification 代码讲解

## 1. 这一版解决什么问题

v41 已经生成了最终发布归档：

```ts
const releaseArchive = createOpsPromotionReleaseArchive({
  evidence: releaseEvidence,
  evidenceVerification: releaseEvidenceVerification,
});
```

v42 给它补上独立复验层：重新根据 `releaseEvidence + releaseEvidenceVerification` 生成 expected release archive，复算 `releaseArchiveDigest`，再逐项检查 archive item 是否和预期一致。

这和前面 v40 的 release evidence verification 是同一个模式：生成对象不等于信任对象，关键归档都需要可复算。

## 2. Verification Item

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionReleaseArchiveVerificationItem {
  name: OpsPromotionReleaseArchiveItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  releaseArchiveDigest: {
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

它不是只给一个总的 `valid`，而是拆成 4 个匹配维度：

- `validMatches`：item 的有效性是否一致。
- `sourceMatches`：item 对应 API 来源是否一致。
- `detailMatches`：解释文字是否一致。
- `digestMatches`：item digest 是否一致。

这样以后如果谁改了 source 或 detail，也会被 verification 捕捉到。

## 3. Verification 总对象

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionReleaseArchiveVerification {
  service: "orderops-node";
  generatedAt: string;
  releaseArchiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedReleaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    releaseArchiveDigestValid: boolean;
    coveredFieldsMatch: boolean;
    archiveItemsValid: boolean;
    evidenceDigestMatches: boolean;
    verifiedEvidenceDigestMatches: boolean;
    completionDigestMatches: boolean;
    closureDigestMatches: boolean;
  };
}
```

这层 verification 主要回答三类问题：

- 当前 release archive 的 digest 是否自洽。
- 当前 release archive 是否等于从上游证据重新生成的 expected archive。
- 每个 archive item 是否仍然引用正确的来源和 digest。

## 4. 核心复验流程

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionReleaseArchiveVerification(input: {
  evidence: OpsPromotionReleaseEvidence;
  evidenceVerification: OpsPromotionReleaseEvidenceVerification;
  releaseArchive: OpsPromotionReleaseArchive;
}): OpsPromotionReleaseArchiveVerification {
  const expectedReleaseArchive = createOpsPromotionReleaseArchive({
    evidence: input.evidence,
    evidenceVerification: input.evidenceVerification,
  });
```

第一步是重新生成 expected release archive。注意这里没有直接相信传入的 `releaseArchive`，而是用上游稳定输入重新构造一份。

## 5. 复算 Release Archive Digest

```ts
const recomputedReleaseArchiveDigest = digestStable(archiveReleaseArchiveDigestPayload({
  releaseArchiveName: input.releaseArchive.releaseArchiveName,
  evidenceName: input.releaseArchive.evidenceName,
  completionName: input.releaseArchive.completionName,
  closureName: input.releaseArchive.closureName,
  receiptName: input.releaseArchive.receiptName,
  certificateName: input.releaseArchive.certificateName,
  packageName: input.releaseArchive.packageName,
  archiveName: input.releaseArchive.archiveName,
  valid: input.releaseArchive.valid,
  state: input.releaseArchive.state,
  handoffReady: input.releaseArchive.handoffReady,
  evidenceDigest: input.releaseArchive.evidenceDigest.value,
  verifiedEvidenceDigest: input.releaseArchive.verifiedEvidenceDigest.value,
  completionDigest: input.releaseArchive.completionDigest.value,
  closureDigest: input.releaseArchive.closureDigest.value,
  decision: input.releaseArchive.decision,
  verification: input.releaseArchive.verification,
  archiveItems: input.releaseArchive.archiveItems,
  nextActions: input.releaseArchive.nextActions,
}));
```

这段复用了 v41 的 `archiveReleaseArchiveDigestPayload`，所以生成和验证使用同一套字段边界。只要对象字段被改过，`recomputedReleaseArchiveDigest` 就会和原 digest 不一致。

## 6. Archive Item 逐项比对

```ts
const archiveItemChecks = input.releaseArchive.archiveItems.map((item) => {
  const expected = expectedReleaseArchive.archiveItems.find((candidate) => candidate.name === item.name);
  const validMatches = expected?.valid === item.valid;
  const sourceMatches = expected?.source === item.source;
  const detailMatches = expected?.detail === item.detail;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
  const digestMatches = item.digest.value === expectedDigest.value;
```

这里和 mini-kv 里检查 key/value 状态的思路类似：找到 expected，再逐项比较。找不到 expected 的 item 会得到一个 `missing` digest，最终 `valid=false`。

返回值保留了原 digest 和复算 digest：

```ts
return {
  name: item.name,
  valid: expected !== undefined && validMatches && sourceMatches && detailMatches && digestMatches,
  validMatches,
  sourceMatches,
  detailMatches,
  digestMatches,
  releaseArchiveDigest: { ...item.digest },
  recomputedDigest: expectedDigest,
  source: item.source,
  detail: item.detail,
};
```

## 7. Checks 汇总

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const checks = {
  releaseArchiveDigestValid: input.releaseArchive.releaseArchiveDigest.value === recomputedReleaseArchiveDigest,
  coveredFieldsMatch: stableJson(input.releaseArchive.releaseArchiveDigest.coveredFields)
    === stableJson(expectedReleaseArchive.releaseArchiveDigest.coveredFields),
  archiveItemsValid: archiveItemChecks.length === expectedReleaseArchive.archiveItems.length
    && archiveItemChecks.every((item) => item.valid),
  releaseArchiveNameMatches: input.releaseArchive.releaseArchiveName === expectedReleaseArchive.releaseArchiveName,
  evidenceDigestMatches: input.releaseArchive.evidenceDigest.value === expectedReleaseArchive.evidenceDigest.value,
  verifiedEvidenceDigestMatches: input.releaseArchive.verifiedEvidenceDigest.value === expectedReleaseArchive.verifiedEvidenceDigest.value,
  completionDigestMatches: input.releaseArchive.completionDigest.value === expectedReleaseArchive.completionDigest.value,
  closureDigestMatches: input.releaseArchive.closureDigest.value === expectedReleaseArchive.closureDigest.value,
  decisionMatches: stableJson(input.releaseArchive.decision) === stableJson(expectedReleaseArchive.decision),
  verificationMatches: stableJson(input.releaseArchive.verification) === stableJson(expectedReleaseArchive.verification),
};
```

最后用所有 checks 得出总结果：

```ts
const valid = Object.values(checks).every(Boolean);
```

## 8. Next Actions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveReleaseArchiveVerificationNextActions(
  checks: OpsPromotionReleaseArchiveVerification["checks"],
  releaseArchive: OpsPromotionReleaseArchive,
): string[] {
  if (!checks.releaseArchiveDigestValid) {
    return ["Regenerate the final release archive before trusting this archive digest."];
  }
```

这段是按失败优先级排列的：

- archive digest 自己不对，先重新生成最终归档。
- item 不对，先检查归档项。
- 上游 evidence/completion/closure digest 不对，回到最新已验证链路重建。
- decision/verification/nextActions 不对，重新签发归档。
- 如果已经 handoff ready，则提示可以附加到部署审批记录。

## 9. 路由和 Dashboard

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/release-archive/verification", {
```

路由里仍然复用 v41 抽出来的 helper：

```ts
const { releaseEvidence, releaseEvidenceVerification } = createPromotionReleaseEvidenceArtifacts(deps);
const releaseArchive = createOpsPromotionReleaseArchive({
  evidence: releaseEvidence,
  evidenceVerification: releaseEvidenceVerification,
});
const releaseArchiveVerification = createOpsPromotionReleaseArchiveVerification({
  evidence: releaseEvidence,
  evidenceVerification: releaseEvidenceVerification,
  releaseArchive,
});
```

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionReleaseArchiveVerification">Release Archive Verification</button>
<button data-action="opsPromotionReleaseArchiveVerificationReport">Release Archive Verification Report</button>
```

## 10. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("verifies promotion release archive as JSON or Markdown", async () => {
```

空账本场景验证 verification 自洽：

```ts
expect(emptyVerification.json().releaseArchiveDigest.value).toBe(
  emptyVerification.json().recomputedReleaseArchiveDigest.value,
);
```

blocked 决策后验证 item：

```ts
expect(verification.json().archiveItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
expect(verification.json().archiveItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
expect(verification.json().archiveItems[1]).toMatchObject({
  name: "verified-release-evidence",
  valid: true,
  source: "/api/v1/ops/promotion-archive/release-evidence/verification",
});
```

Markdown 输出也被覆盖：

```ts
expect(markdown.body).toContain("# Promotion release archive verification");
expect(markdown.body).toContain("- Release archive digest valid: true");
expect(markdown.body).toContain("### verified-release-evidence");
```

## 11. v42 的定位

v42 让最终发布归档也拥有“生成 + 复验”的闭环：

```text
release evidence -> release evidence verification -> release archive -> release archive verification
```

下一步可以继续推进“deployment approval record”，把 verified release archive digest 接到更像真实发布审批的记录里。
