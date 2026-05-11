# v51 Promotion Release Audit Trail Record 代码讲解

## 1. 这一版解决什么问题

v49 生成 `deployment execution receipt`，v50 验证它。v51 只做下一步：把已验证 receipt 整理成 `release audit trail record`，生成 `auditDigest`，给后续最终发布报告一个稳定引用。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionReleaseAuditTrailRecord(input: {
  receipt: OpsPromotionDeploymentExecutionReceipt;
  receiptVerification: OpsPromotionDeploymentExecutionReceiptVerification;
}): OpsPromotionReleaseAuditTrailRecord {
```

这版不执行部署，不写外部审计系统，只生成本地审计轨迹记录。

## 2. Audit Trail Record 数据结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionReleaseAuditTrailRecord {
  service: "orderops-node";
  generatedAt: string;
  auditTrailName: string;
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
  auditReady: boolean;
```

`auditTrailName` 是 v51 新对象身份，`receiptName` 和 `receiptRecordName` 分别指向 deployment execution receipt 与上游 handoff receipt，避免同名概念混淆。

## 3. Audit Item 类型

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionReleaseAuditTrailRecordItemName =
  | "deployment-execution-receipt"
  | "verified-deployment-execution-receipt"
  | "deployment-execution-record"
  | "release-audit-state";
```

四个 item 对应四类证据：

- `deployment-execution-receipt`：v49 回执本体
- `verified-deployment-execution-receipt`：v50 验证结果
- `deployment-execution-record`：仍然引用已验证的 execution digest
- `release-audit-state`：审计轨迹层记录 ready 状态和剩余动作

这和 mini-kv 讲解里拆 WAL、SSTable、Manifest 的方式类似：把“能不能信”拆成可复核的条目。

## 4. Audit Trail Name 来自验证后的 Receipt Digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const auditTrailName = `promotion-release-audit-${input.receiptVerification.recomputedReceiptDigest.value.slice(0, 12)}`;
const auditItems = archiveReleaseAuditTrailItems(input.receipt, input.receiptVerification);
const receiptReferenceValid = input.receipt.receiptDigest.value === input.receiptVerification.recomputedReceiptDigest.value;
```

`auditTrailName` 用 `recomputedReceiptDigest` 的前 12 位，这让同一份 receipt verification 生成稳定名称。

`receiptReferenceValid` 是 v51 的关键门禁：只有 v49 receipt 的 `receiptDigest` 等于 v50 verification 复算出的 digest，audit trail record 才成立。

## 5. Verification 摘要

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const verification = {
  receiptVerified: input.receiptVerification.valid,
  receiptDigestValid: input.receiptVerification.checks.receiptDigestValid,
  receiptItemsValid: input.receiptVerification.checks.receiptItemsValid,
  receiptReferenceValid,
  closeoutReady: input.receiptVerification.summary.closeoutReady,
  receiptItemCount: input.receiptVerification.summary.receiptItemCount,
  auditItemCount: auditItems.length,
};
```

audit trail record 不重复 v50 的所有 checks，而是抽取最终审计记录最关心的摘要：

- receipt 是否已验证
- receipt digest 是否有效
- receipt items 是否有效
- receipt 是否引用 verification 的复算 digest
- closeout 是否 ready

## 6. Audit Ready 逐层收紧

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const valid = input.receipt.valid
  && input.receiptVerification.valid
  && receiptReferenceValid
  && auditItems.every((item) => item.valid);
const handoffReady = valid && input.receipt.handoffReady && input.receiptVerification.handoffReady;
const approvalReady = handoffReady && input.receipt.approvalReady && input.receiptVerification.approvalReady;
const changeReady = approvalReady && input.receipt.changeReady && input.receiptVerification.changeReady;
const executionReady = changeReady && input.receipt.executionReady && input.receiptVerification.executionReady;
const receiptReady = executionReady && input.receipt.receiptReady && input.receiptVerification.receiptReady;
const auditReady = receiptReady && input.receiptVerification.summary.closeoutReady;
```

这里沿用前面版本的门禁形状：对象可以 `valid=true`，但只有所有 ready 条件满足后，才会 `auditReady=true`。

## 7. Audit Digest 覆盖字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
auditDigest: {
  algorithm: "sha256",
  value: digestStable(digestPayload),
  coveredFields: [
    "auditTrailName",
    "receiptName",
    "executionName",
    "changeRecordName",
    "approvalName",
    "releaseArchiveName",
    "evidenceName",
    "completionName",
    "closureName",
    "receiptRecordName",
    "certificateName",
    "packageName",
    "archiveName",
    "valid",
    "state",
    "handoffReady",
    "approvalReady",
    "changeReady",
    "executionReady",
    "receiptReady",
    "auditReady",
    "receiptDigest",
    "verifiedReceiptDigest",
    "executionDigest",
    "changeDigest",
    "approvalDigest",
    "releaseArchiveDigest",
    "decision",
    "verification",
    "auditItems",
    "nextActions",
  ],
},
```

`auditDigest` 覆盖身份、ready 状态、上游 digest、decision、verification 摘要、auditItems 和 nextActions。后续最终发布报告引用它，就能回到完整证据链。

## 8. Digest Payload

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveReleaseAuditTrailDigestPayload(input: {
  auditTrailName: string;
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
  auditReady: boolean;
  receiptDigest: string;
  verifiedReceiptDigest: string;
  executionDigest: string;
  changeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionReleaseAuditTrailRecord["decision"];
  verification: OpsPromotionReleaseAuditTrailRecord["verification"];
  auditItems: OpsPromotionReleaseAuditTrailRecordItem[];
  nextActions: string[];
}) {
```

payload 内部对 item 做稳定化：

```ts
auditItems: input.auditItems.map((item) => ({
  name: item.name,
  valid: item.valid,
  source: item.source,
  digest: item.digest.value,
  detail: item.detail,
})),
```

这样 digest 只绑定业务字段。

## 9. Audit Items 如何产生

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveReleaseAuditTrailItems(
  receipt: OpsPromotionDeploymentExecutionReceipt,
  receiptVerification: OpsPromotionDeploymentExecutionReceiptVerification,
): OpsPromotionReleaseAuditTrailRecordItem[] {
```

第一个 item 绑定 v49 receipt：

```ts
{
  name: "deployment-execution-receipt",
  valid: receipt.valid && receiptVerification.checks.receiptDigestValid,
  source: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
  digest: {
    algorithm: "sha256",
    value: receipt.receiptDigest.value,
  },
  detail: "Deployment execution receipt exists and its digest is covered by verification.",
},
```

第二个 item 绑定 v50 verification：

```ts
{
  name: "verified-deployment-execution-receipt",
  valid: receiptVerification.valid,
  source: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
  digest: {
    algorithm: "sha256",
    value: receiptVerification.recomputedReceiptDigest.value,
  },
```

第三个 item 保持 execution record 链路：

```ts
{
  name: "deployment-execution-record",
  valid: receiptVerification.checks.executionDigestMatches
    && receiptVerification.checks.verifiedExecutionDigestMatches,
  source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
  digest: {
    algorithm: "sha256",
    value: receipt.verifiedExecutionDigest.value,
  },
```

第四个 item 固化审计状态：

```ts
{
  name: "release-audit-state",
  valid: receiptVerification.valid
    && receiptVerification.checks.receiptReadyMatches
    && receipt.verification.closeoutReady === receiptVerification.summary.closeoutReady,
```

## 10. Next Actions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveReleaseAuditTrailNextActions(
  receiptVerification: OpsPromotionDeploymentExecutionReceiptVerification,
  valid: boolean,
  auditReady: boolean,
): string[] {
  if (!receiptVerification.valid) {
    return ["Resolve deployment execution receipt verification failures before writing the release audit trail record."];
  }

  if (!valid) {
    return ["Regenerate the release audit trail record after receipt and verification agree."];
  }

  if (auditReady) {
    return ["Release audit trail record is ready; attach the audit digest to final release reporting."];
  }

  return receiptVerification.nextActions;
}
```

如果 receipt verification 失败，先修 verification。如果 audit trail record 自己不一致，重新生成。只有全部 ready 时，才提示把 `auditDigest` 挂到最终发布报告。

## 11. Markdown 输出

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionReleaseAuditTrailRecordMarkdown(record: OpsPromotionReleaseAuditTrailRecord): string {
```

Markdown 输出：

- audit trail identity
- `Audit ready`
- `Audit digest`
- `Receipt digest`
- `Verified receipt digest`
- verification 摘要
- audit items
- nextActions

## 12. API 路由

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/release-audit-trail-record", {
```

路由直接从 helper 取本版对象：

```ts
const { releaseAuditTrailRecord } = createPromotionReleaseEvidenceArtifacts(deps);
```

Markdown 输出仍然用 `format=markdown`：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionReleaseAuditTrailRecordMarkdown(releaseAuditTrailRecord);
}
```

## 13. Helper 生成链

文件：`src/routes/opsSummaryRoutes.ts`

```ts
const deploymentExecutionReceiptVerification = createOpsPromotionDeploymentExecutionReceiptVerification({
  executionRecord: deploymentExecutionRecord,
  executionRecordVerification: deploymentExecutionRecordVerification,
  receipt: deploymentExecutionReceipt,
});
const releaseAuditTrailRecord = createOpsPromotionReleaseAuditTrailRecord({
  receipt: deploymentExecutionReceipt,
  receiptVerification: deploymentExecutionReceiptVerification,
});
```

链路是：

```text
executionReceipt -> executionReceiptVerification -> releaseAuditTrailRecord
```

v51 只接最后一步。

## 14. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionReleaseAuditTrailRecord">Release Audit Trail Record</button>
<button data-action="opsPromotionReleaseAuditTrailRecordReport">Release Audit Trail Report</button>
```

JSON 按钮：

```ts
if (action === "opsPromotionReleaseAuditTrailRecord") {
  write(await api("/api/v1/ops/promotion-archive/release-audit-trail-record"));
}
```

Markdown 按钮：

```ts
if (action === "opsPromotionReleaseAuditTrailRecordReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/release-audit-trail-record?format=markdown");
```

## 15. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("builds promotion release audit trail record as JSON or Markdown", async () => {
```

空账本场景验证基本结构：

```ts
expect(emptyAuditTrail.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  approvalReady: false,
  changeReady: false,
  executionReady: false,
  receiptReady: false,
  auditReady: false,
```

blocked 决策后验证和上游 receipt 对齐：

```ts
expect(auditTrail.json().receiptName).toBe(receipt.json().receiptName);
expect(auditTrail.json().receiptDigest.value).toBe(receipt.json().receiptDigest.value);
expect(auditTrail.json().receiptDigest.value).toBe(receiptVerification.json().recomputedReceiptDigest.value);
```

同时验证 item 来源：

```ts
expect(auditTrail.json().auditItems[1]).toMatchObject({
  name: "verified-deployment-execution-receipt",
  valid: true,
  source: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
});
```

Markdown 输出也覆盖：

```ts
expect(markdown.body).toContain("# Promotion release audit trail record");
expect(markdown.body).toContain("- Audit ready: false");
expect(markdown.body).toContain(`- Audit digest: sha256:${auditTrail.json().auditDigest.value}`);
expect(markdown.body).toContain("- Receipt verified: true");
expect(markdown.body).toContain("## Audit Items");
expect(markdown.body).toContain("### verified-deployment-execution-receipt");
```

## 16. v51 的定位

v51 是一个合适的小闭环：

```text
verified deployment execution receipt -> release audit trail record
```

它不是只加文档或按钮，也没有跨到 audit trail verification 或真实部署。下一版自然可以做 `release audit trail record verification`。
