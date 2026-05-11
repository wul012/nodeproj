# v44 Promotion Deployment Approval Verification 代码讲解

## 1. 这一版解决什么问题

v43 生成 `deployment approval`，v44 只做一件事：给它补独立 verification。也就是重新根据 `releaseArchive + releaseArchiveVerification` 生成 expected approval，复算 `approvalDigest`，并逐项比较 approval items。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionDeploymentApprovalVerification(input: {
  releaseArchive: OpsPromotionReleaseArchive;
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification;
  approval: OpsPromotionDeploymentApproval;
}): OpsPromotionDeploymentApprovalVerification {
```

这版没有继续扩展新业务层，工作量控制在一个完整但窄的闭环。

## 2. Verification Item

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentApprovalVerificationItem {
  name: OpsPromotionDeploymentApprovalItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  approvalDigest: {
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

每个 approval item 都保留 4 个匹配结果：

- `validMatches`
- `sourceMatches`
- `detailMatches`
- `digestMatches`

这让问题定位更细，不只是给一个总的 `valid=false`。

## 3. Verification 总对象

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentApprovalVerification {
  approvalName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  approvalDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedApprovalDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    approvalDigestValid: boolean;
    coveredFieldsMatch: boolean;
    approvalItemsValid: boolean;
    approvalReadyMatches: boolean;
    releaseArchiveDigestMatches: boolean;
    verifiedReleaseArchiveDigestMatches: boolean;
    evidenceDigestMatches: boolean;
  };
}
```

v44 的重点是确认 deployment approval 自己声明的 digest、状态和上游引用都没有漂移。

## 4. 重新生成 Expected Approval

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const expectedApproval = createOpsPromotionDeploymentApproval({
  releaseArchive: input.releaseArchive,
  releaseArchiveVerification: input.releaseArchiveVerification,
});
```

和前面的 verification 一样，v44 不直接信任传入的 approval，而是从上游对象重新生成 expected approval。

## 5. 复算 Approval Digest

```ts
const recomputedApprovalDigest = digestStable(archiveDeploymentApprovalDigestPayload({
  approvalName: input.approval.approvalName,
  releaseArchiveName: input.approval.releaseArchiveName,
  evidenceName: input.approval.evidenceName,
  completionName: input.approval.completionName,
  closureName: input.approval.closureName,
  receiptName: input.approval.receiptName,
  certificateName: input.approval.certificateName,
  packageName: input.approval.packageName,
  archiveName: input.approval.archiveName,
  valid: input.approval.valid,
  state: input.approval.state,
  handoffReady: input.approval.handoffReady,
  approvalReady: input.approval.approvalReady,
  releaseArchiveDigest: input.approval.releaseArchiveDigest.value,
  verifiedReleaseArchiveDigest: input.approval.verifiedReleaseArchiveDigest.value,
  evidenceDigest: input.approval.evidenceDigest.value,
  decision: input.approval.decision,
  verification: input.approval.verification,
  approvalItems: input.approval.approvalItems,
  nextActions: input.approval.nextActions,
}));
```

这里复用 v43 的 digest payload，保证生成和验证使用同一个字段边界。

## 6. Approval Items 逐项检查

```ts
const approvalItemChecks = input.approval.approvalItems.map((item) => {
  const expected = expectedApproval.approvalItems.find((candidate) => candidate.name === item.name);
  const validMatches = expected?.valid === item.valid;
  const sourceMatches = expected?.source === item.source;
  const detailMatches = expected?.detail === item.detail;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
  const digestMatches = item.digest.value === expectedDigest.value;
```

如果 item 名称、来源、说明或 digest 被改动，都会导致该 item 的 `valid=false`。

## 7. Checks 汇总

```ts
const checks = {
  approvalDigestValid: input.approval.approvalDigest.value === recomputedApprovalDigest,
  coveredFieldsMatch: stableJson(input.approval.approvalDigest.coveredFields)
    === stableJson(expectedApproval.approvalDigest.coveredFields),
  approvalItemsValid: approvalItemChecks.length === expectedApproval.approvalItems.length
    && approvalItemChecks.every((item) => item.valid),
  approvalNameMatches: input.approval.approvalName === expectedApproval.approvalName,
  approvalReadyMatches: input.approval.approvalReady === expectedApproval.approvalReady,
  releaseArchiveDigestMatches: input.approval.releaseArchiveDigest.value === expectedApproval.releaseArchiveDigest.value,
  verifiedReleaseArchiveDigestMatches: input.approval.verifiedReleaseArchiveDigest.value === expectedApproval.verifiedReleaseArchiveDigest.value,
  evidenceDigestMatches: input.approval.evidenceDigest.value === expectedApproval.evidenceDigest.value,
};
```

总结果仍然是所有 checks 都通过：

```ts
const valid = Object.values(checks).every(Boolean);
```

## 8. API 和 Dashboard

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/deployment-approval/verification", {
```

路由构建 approval 后再复验：

```ts
const deploymentApproval = createOpsPromotionDeploymentApproval({
  releaseArchive,
  releaseArchiveVerification,
});
const deploymentApprovalVerification = createOpsPromotionDeploymentApprovalVerification({
  releaseArchive,
  releaseArchiveVerification,
  approval: deploymentApproval,
});
```

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionDeploymentApprovalVerification">Deployment Approval Verification</button>
<button data-action="opsPromotionDeploymentApprovalVerificationReport">Deployment Approval Verification Report</button>
```

## 9. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("verifies promotion deployment approval as JSON or Markdown", async () => {
```

空账本场景验证 digest 自洽：

```ts
expect(emptyVerification.json().approvalDigest.value).toBe(
  emptyVerification.json().recomputedApprovalDigest.value,
);
```

blocked 决策后验证 approval item：

```ts
expect(verification.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
expect(verification.json().approvalItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
expect(verification.json().approvalItems[1]).toMatchObject({
  name: "verified-release-archive",
  valid: true,
  source: "/api/v1/ops/promotion-archive/release-archive/verification",
});
```

Markdown 输出也覆盖：

```ts
expect(markdown.body).toContain("# Promotion deployment approval verification");
expect(markdown.body).toContain("- Approval digest valid: true");
expect(markdown.body).toContain("### verified-release-archive");
```

## 10. v44 的定位

v44 只完成一个合理粒度的闭环：

```text
deployment approval -> deployment approval verification
```

后续如果继续推进，可以考虑更小心地进入 deployment change record，但下一版也应该保持单点闭环，不把多个发布概念塞进同一版本。
