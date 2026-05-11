# v50 Promotion Deployment Execution Receipt Verification 代码讲解

## 1. 这一版解决什么问题

v49 生成 `deployment execution receipt`，v50 只补它的 verification：重新基于 `executionRecord + executionRecordVerification` 生成 expected receipt，复算 `receiptDigest`，逐项比对 `receiptItems`。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionDeploymentExecutionReceiptVerification(input: {
  executionRecord: OpsPromotionDeploymentExecutionRecord;
  executionRecordVerification: OpsPromotionDeploymentExecutionRecordVerification;
  receipt: OpsPromotionDeploymentExecutionReceipt;
}): OpsPromotionDeploymentExecutionReceiptVerification {
```

这版不执行部署，不调用 Java 或 mini-kv。它只验证 v49 的本地执行回执。

## 2. Verification Item

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentExecutionReceiptVerificationItem {
  name: OpsPromotionDeploymentExecutionReceiptItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  receiptItemDigest: {
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

每个 receipt item 都展开 4 个匹配结果：

- `validMatches`
- `sourceMatches`
- `detailMatches`
- `digestMatches`

如果 receipt item 被改坏，可以定位到底是来源、说明、digest 还是 valid 状态漂移。

## 3. Verification 总对象

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentExecutionReceiptVerification {
  service: "orderops-node";
  generatedAt: string;
  receiptName: string;
  executionName: string;
  changeRecordName: string;
  approvalName: string;
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptRecordName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  changeReady: boolean;
  executionReady: boolean;
  receiptReady: boolean;
```

verification 保留 receipt 的完整身份字段，便于单独归档和阅读。

## 4. Checks 字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
checks: {
  receiptDigestValid: boolean;
  coveredFieldsMatch: boolean;
  receiptItemsValid: boolean;
  receiptNameMatches: boolean;
  executionNameMatches: boolean;
  changeRecordNameMatches: boolean;
  approvalNameMatches: boolean;
  releaseArchiveNameMatches: boolean;
  evidenceNameMatches: boolean;
  completionNameMatches: boolean;
  closureNameMatches: boolean;
  receiptRecordNameMatches: boolean;
  certificateNameMatches: boolean;
  packageNameMatches: boolean;
  archiveNameMatches: boolean;
  validMatches: boolean;
  stateMatches: boolean;
  handoffReadyMatches: boolean;
  approvalReadyMatches: boolean;
  changeReadyMatches: boolean;
  executionReadyMatches: boolean;
  receiptReadyMatches: boolean;
  executionDigestMatches: boolean;
  verifiedExecutionDigestMatches: boolean;
  changeDigestMatches: boolean;
  approvalDigestMatches: boolean;
  releaseArchiveDigestMatches: boolean;
  decisionMatches: boolean;
  verificationMatches: boolean;
  nextActionsMatch: boolean;
};
```

这组 checks 覆盖摘要、身份、ready 状态、上游 digest、decision、verification 和 nextActions。

## 5. 重新生成 Expected Receipt

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const expectedReceipt = createOpsPromotionDeploymentExecutionReceipt({
  executionRecord: input.executionRecord,
  executionRecordVerification: input.executionRecordVerification,
});
```

v50 不直接信任传入 receipt，而是从上游 execution record 和 verification 重新生成 expected receipt。

这和 mini-kv 中从 manifest 或索引重新确认对象状态的讲解逻辑一致：从上游事实重新计算，而不是信任对象自报。

## 6. 复算 Receipt Digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const recomputedReceiptDigest = digestStable(archiveDeploymentExecutionReceiptDigestPayload({
  receiptName: input.receipt.receiptName,
  executionName: input.receipt.executionName,
  changeRecordName: input.receipt.changeRecordName,
  approvalName: input.receipt.approvalName,
  releaseArchiveName: input.receipt.releaseArchiveName,
  evidenceName: input.receipt.evidenceName,
  completionName: input.receipt.completionName,
  closureName: input.receipt.closureName,
  receiptRecordName: input.receipt.receiptRecordName,
  certificateName: input.receipt.certificateName,
  packageName: input.receipt.packageName,
  archiveName: input.receipt.archiveName,
  valid: input.receipt.valid,
  state: input.receipt.state,
  handoffReady: input.receipt.handoffReady,
  approvalReady: input.receipt.approvalReady,
  changeReady: input.receipt.changeReady,
  executionReady: input.receipt.executionReady,
  receiptReady: input.receipt.receiptReady,
  executionDigest: input.receipt.executionDigest.value,
  verifiedExecutionDigest: input.receipt.verifiedExecutionDigest.value,
  changeDigest: input.receipt.changeDigest.value,
  approvalDigest: input.receipt.approvalDigest.value,
  releaseArchiveDigest: input.receipt.releaseArchiveDigest.value,
  decision: input.receipt.decision,
  verification: input.receipt.verification,
  receiptItems: input.receipt.receiptItems,
  nextActions: input.receipt.nextActions,
}));
```

这里复用 v49 的 digest payload，保证生成和验证使用同一套字段边界。

## 7. Receipt Items 逐项检查

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const receiptItemChecks = input.receipt.receiptItems.map((item) => {
  const expected = expectedReceipt.receiptItems.find((candidate) => candidate.name === item.name);
  const validMatches = expected?.valid === item.valid;
  const sourceMatches = expected?.source === item.source;
  const detailMatches = expected?.detail === item.detail;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
  const digestMatches = item.digest.value === expectedDigest.value;
```

每个 item 都与 expected receipt 的同名 item 比较：

- `deployment-execution-record`
- `verified-deployment-execution-record`
- `deployment-change-record`
- `deployment-receipt-state`

返回时保留两份 digest：

```ts
receiptItemDigest: { ...item.digest },
recomputedDigest: expectedDigest,
```

这让 JSON 和 Markdown 都能看出原始 item digest 与复算 digest 是否一致。

## 8. Checks 汇总

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const checks = {
  receiptDigestValid: input.receipt.receiptDigest.value === recomputedReceiptDigest,
  coveredFieldsMatch: stableJson(input.receipt.receiptDigest.coveredFields)
    === stableJson(expectedReceipt.receiptDigest.coveredFields),
  receiptItemsValid: receiptItemChecks.length === expectedReceipt.receiptItems.length
    && receiptItemChecks.every((item) => item.valid),
```

后面继续比较 receipt name、execution name、ready 状态、digest、decision、verification 和 nextActions。

总结果仍然是：

```ts
const valid = Object.values(checks).every(Boolean);
```

任意字段漂移都会让 receipt verification 失败。

## 9. Next Actions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentExecutionReceiptVerificationNextActions(
  checks: OpsPromotionDeploymentExecutionReceiptVerification["checks"],
  receipt: OpsPromotionDeploymentExecutionReceipt,
): string[] {
  if (!checks.receiptDigestValid) {
    return ["Regenerate the deployment execution receipt before attaching it to the release audit trail."];
  }

  if (!checks.receiptItemsValid) {
    return ["Review deployment execution receipt items before trusting the receipt digest."];
  }

  if (!checks.coveredFieldsMatch || !checks.verificationMatches || !checks.nextActionsMatch) {
    return ["Regenerate the deployment execution receipt from the verified execution record chain."];
  }

  if (receipt.receiptReady) {
    return ["Deployment execution receipt is verified; attach the receipt digest to the release audit trail."];
  }

  return receipt.nextActions;
}
```

先处理 verification 自己发现的问题；只有验证通过后，才继承 receipt 的业务 nextActions。

## 10. Markdown 输出

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown(
  verification: OpsPromotionDeploymentExecutionReceiptVerification,
): string {
```

Markdown 输出：

- receipt identity
- `Receipt digest`
- `Recomputed receipt digest`
- checks
- receipt items
- summary
- nextActions

## 11. API 路由

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/deployment-execution-receipt/verification", {
```

路由取上游对象后构造 verification：

```ts
const { deploymentExecutionRecord, deploymentExecutionRecordVerification, deploymentExecutionReceipt } = createPromotionReleaseEvidenceArtifacts(deps);
const deploymentExecutionReceiptVerification = createOpsPromotionDeploymentExecutionReceiptVerification({
  executionRecord: deploymentExecutionRecord,
  executionRecordVerification: deploymentExecutionRecordVerification,
  receipt: deploymentExecutionReceipt,
});
```

Markdown 输出仍然走 `format=markdown`：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown(deploymentExecutionReceiptVerification);
}
```

## 12. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionDeploymentExecutionReceiptVerification">Deployment Receipt Verification</button>
<button data-action="opsPromotionDeploymentExecutionReceiptVerificationReport">Deployment Receipt Verification Report</button>
```

JSON 按钮：

```ts
if (action === "opsPromotionDeploymentExecutionReceiptVerification") {
  write(await api("/api/v1/ops/promotion-archive/deployment-execution-receipt/verification"));
}
```

Markdown 按钮：

```ts
if (action === "opsPromotionDeploymentExecutionReceiptVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/deployment-execution-receipt/verification?format=markdown");
```

## 13. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("verifies promotion deployment execution receipt as JSON or Markdown", async () => {
```

空账本场景验证 digest 自洽：

```ts
expect(emptyVerification.json().receiptDigest.value).toBe(emptyVerification.json().recomputedReceiptDigest.value);
expect(emptyVerification.json().receiptItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
```

blocked 决策后验证和 v49 receipt 对齐：

```ts
expect(verification.json().receiptName).toBe(receipt.json().receiptName);
expect(verification.json().receiptDigest.value).toBe(receipt.json().receiptDigest.value);
expect(verification.json().receiptDigest.value).toBe(verification.json().recomputedReceiptDigest.value);
```

同时检查 item 来源：

```ts
expect(verification.json().receiptItems[1]).toMatchObject({
  name: "verified-deployment-execution-record",
  valid: true,
  source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
});
```

Markdown 输出也覆盖：

```ts
expect(markdown.body).toContain("# Promotion deployment execution receipt verification");
expect(markdown.body).toContain("- Receipt digest valid: true");
expect(markdown.body).toContain(`- Recomputed receipt digest: sha256:${verification.json().recomputedReceiptDigest.value}`);
expect(markdown.body).toContain("## Receipt Items");
expect(markdown.body).toContain("### verified-deployment-execution-record");
expect(markdown.body).toContain("## Summary");
```

## 14. v50 的定位

v50 是一个合适粒度的小闭环：

```text
deployment execution receipt -> deployment execution receipt verification
```

它不是文档小修，也没有跨到真实部署或 release audit trail。下一版如果继续推进，可以新增 `release audit trail record`，但仍应保持单点闭环。
