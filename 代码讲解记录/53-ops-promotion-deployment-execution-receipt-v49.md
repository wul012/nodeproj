# v49 Promotion Deployment Execution Receipt 代码讲解

## 1. 这一版解决什么问题

v47 生成 `deployment execution record`，v48 验证它。v49 只做下一步：把已验证的 execution record 整理成一个 `deployment execution receipt`，给后续 release audit trail 一个稳定的 `receiptDigest`。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionDeploymentExecutionReceipt(input: {
  executionRecord: OpsPromotionDeploymentExecutionRecord;
  executionRecordVerification: OpsPromotionDeploymentExecutionRecordVerification;
}): OpsPromotionDeploymentExecutionReceipt {
```

这版不执行真实部署，也不调用 Java 或 mini-kv。它只是生成一个本地回执对象。

## 2. Receipt 数据结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentExecutionReceipt {
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

这里的 `receiptName` 是 v49 新生成的执行回执名称，`receiptRecordName` 是上游 handoff receipt 名称。这样既能标识当前回执，也保留完整发布证据链。

## 3. Receipt Item 类型

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionDeploymentExecutionReceiptItemName =
  | "deployment-execution-record"
  | "verified-deployment-execution-record"
  | "deployment-change-record"
  | "deployment-receipt-state";
```

四个 item 对应四类证据：

- `deployment-execution-record`：v47 执行前记录
- `verified-deployment-execution-record`：v48 验证结果
- `deployment-change-record`：仍然引用已验证的 change digest
- `deployment-receipt-state`：回执层记录当前 ready 状态和剩余动作

这和 mini-kv 的讲解方式类似：不是只说“回执生成了”，而是拆成几条可以复核的组成证据。

## 4. Receipt Name 来自验证后的 Execution Digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const receiptName = `promotion-deployment-receipt-${input.executionRecordVerification.recomputedExecutionDigest.value.slice(0, 12)}`;
const receiptItems = archiveDeploymentExecutionReceiptItems(input.executionRecord, input.executionRecordVerification);
const executionReferenceValid = input.executionRecord.executionDigest.value
  === input.executionRecordVerification.recomputedExecutionDigest.value;
```

`receiptName` 使用 `recomputedExecutionDigest` 的前 12 位。这样同一份 execution verification 生成稳定回执名称。

`executionReferenceValid` 是 v49 的关键门禁：只有 v47 的 `executionDigest` 等于 v48 复算出的 digest，回执才继续成立。

## 5. Verification 摘要

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const verification = {
  executionRecordVerified: input.executionRecordVerification.valid,
  executionDigestValid: input.executionRecordVerification.checks.executionDigestValid,
  executionItemsValid: input.executionRecordVerification.checks.executionItemsValid,
  executionReferenceValid,
  closeoutReady: input.executionRecordVerification.summary.closeoutReady,
  executionItemCount: input.executionRecordVerification.summary.executionItemCount,
  receiptItemCount: receiptItems.length,
};
```

receipt 不重复 v48 的全部 checks，只抽取回执生成必须关心的字段：

- execution record 是否已验证
- execution digest 是否有效
- execution items 是否有效
- execution record 是否引用了 verification 的复算 digest
- closeout 是否 ready

## 6. Receipt Ready 逐层收紧

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const valid = input.executionRecord.valid
  && input.executionRecordVerification.valid
  && executionReferenceValid
  && receiptItems.every((item) => item.valid);
const handoffReady = valid && input.executionRecord.handoffReady && input.executionRecordVerification.handoffReady;
const approvalReady = handoffReady && input.executionRecord.approvalReady && input.executionRecordVerification.approvalReady;
const changeReady = approvalReady && input.executionRecord.changeReady && input.executionRecordVerification.changeReady;
const executionReady = changeReady
  && input.executionRecord.executionReady
  && input.executionRecordVerification.executionReady;
const receiptReady = executionReady && input.executionRecordVerification.summary.closeoutReady;
```

这一段和前面版本保持一致：从 `valid` 开始逐层收紧，直到 `receiptReady`。当前若 readiness 还未完成，receipt 可以 `valid=true`，但 `receiptReady=false`。

## 7. Receipt Digest 覆盖字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
receiptDigest: {
  algorithm: "sha256",
  value: digestStable(digestPayload),
  coveredFields: [
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
    "executionDigest",
    "verifiedExecutionDigest",
    "changeDigest",
    "approvalDigest",
    "releaseArchiveDigest",
    "decision",
    "verification",
    "receiptItems",
    "nextActions",
  ],
},
```

`receiptDigest` 覆盖身份、上游 digest、ready 状态、decision、verification 摘要、receiptItems 和 nextActions。后续 release audit trail 引用这个 digest，就能回到这份回执。

## 8. Digest Payload

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentExecutionReceiptDigestPayload(input: {
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
  executionDigest: string;
  verifiedExecutionDigest: string;
  changeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionDeploymentExecutionReceipt["decision"];
  verification: OpsPromotionDeploymentExecutionReceipt["verification"];
  receiptItems: OpsPromotionDeploymentExecutionReceiptItem[];
  nextActions: string[];
}) {
```

payload 内部对 item 做稳定化：

```ts
receiptItems: input.receiptItems.map((item) => ({
  name: item.name,
  valid: item.valid,
  source: item.source,
  digest: item.digest.value,
  detail: item.detail,
})),
```

这样 digest 只绑定业务字段，不受对象包装影响。

## 9. Receipt Items 如何产生

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentExecutionReceiptItems(
  executionRecord: OpsPromotionDeploymentExecutionRecord,
  executionRecordVerification: OpsPromotionDeploymentExecutionRecordVerification,
): OpsPromotionDeploymentExecutionReceiptItem[] {
```

第一个 item 绑定 v47 execution record：

```ts
{
  name: "deployment-execution-record",
  valid: executionRecord.valid && executionRecordVerification.checks.executionDigestValid,
  source: "/api/v1/ops/promotion-archive/deployment-execution-record",
  digest: {
    algorithm: "sha256",
    value: executionRecord.executionDigest.value,
  },
  detail: "Deployment execution record exists and its digest is covered by verification.",
},
```

第二个 item 绑定 v48 verification：

```ts
{
  name: "verified-deployment-execution-record",
  valid: executionRecordVerification.valid,
  source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
  digest: {
    algorithm: "sha256",
    value: executionRecordVerification.recomputedExecutionDigest.value,
  },
```

第三个 item 绑定 change record 链：

```ts
{
  name: "deployment-change-record",
  valid: executionRecordVerification.checks.changeDigestMatches
    && executionRecordVerification.checks.verifiedChangeDigestMatches,
  source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
  digest: {
    algorithm: "sha256",
    value: executionRecord.verifiedChangeDigest.value,
  },
```

第四个 item 固化回执状态：

```ts
{
  name: "deployment-receipt-state",
  valid: executionRecordVerification.valid
    && executionRecordVerification.checks.executionReadyMatches
    && executionRecord.verification.closeoutReady === executionRecordVerification.summary.closeoutReady,
```

## 10. Next Actions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentExecutionReceiptNextActions(
  executionRecordVerification: OpsPromotionDeploymentExecutionRecordVerification,
  valid: boolean,
  receiptReady: boolean,
): string[] {
  if (!executionRecordVerification.valid) {
    return ["Resolve deployment execution record verification failures before writing the deployment execution receipt."];
  }

  if (!valid) {
    return ["Regenerate the deployment execution receipt after execution record and verification agree."];
  }

  if (receiptReady) {
    return ["Deployment execution receipt is ready; attach the receipt digest to the release audit trail."];
  }

  return executionRecordVerification.nextActions;
}
```

如果 v48 verification 失败，先修 verification。如果 receipt 自己不一致，重新生成。只有都通过且 receipt ready 时，才提示把 receipt digest 挂到 audit trail。

## 11. Markdown 输出

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionDeploymentExecutionReceiptMarkdown(receipt: OpsPromotionDeploymentExecutionReceipt): string {
```

Markdown 输出：

- receipt identity
- `Receipt ready`
- `Receipt digest`
- `Execution digest`
- `Verified execution digest`
- verification 摘要
- receipt items
- nextActions

这让本地调试和归档都能直接查看回执内容。

## 12. API 路由

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/deployment-execution-receipt", {
```

路由从 helper 直接拿 receipt：

```ts
const { deploymentExecutionReceipt } = createPromotionReleaseEvidenceArtifacts(deps);
```

Markdown 仍然是同一 endpoint：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionDeploymentExecutionReceiptMarkdown(deploymentExecutionReceipt);
}
```

## 13. Helper 生成链

文件：`src/routes/opsSummaryRoutes.ts`

```ts
const deploymentExecutionRecordVerification = createOpsPromotionDeploymentExecutionRecordVerification({
  changeRecord: deploymentChangeRecord,
  changeRecordVerification: deploymentChangeRecordVerification,
  executionRecord: deploymentExecutionRecord,
});
const deploymentExecutionReceipt = createOpsPromotionDeploymentExecutionReceipt({
  executionRecord: deploymentExecutionRecord,
  executionRecordVerification: deploymentExecutionRecordVerification,
});
```

链路是：

```text
changeRecord -> changeRecordVerification -> executionRecord -> executionRecordVerification -> executionReceipt
```

v49 只接最后一步。

## 14. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionDeploymentExecutionReceipt">Deployment Execution Receipt</button>
<button data-action="opsPromotionDeploymentExecutionReceiptReport">Deployment Execution Receipt Report</button>
```

JSON 按钮：

```ts
if (action === "opsPromotionDeploymentExecutionReceipt") {
  write(await api("/api/v1/ops/promotion-archive/deployment-execution-receipt"));
}
```

Markdown 按钮：

```ts
if (action === "opsPromotionDeploymentExecutionReceiptReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/deployment-execution-receipt?format=markdown");
```

## 15. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("builds promotion deployment execution receipt as JSON or Markdown", async () => {
```

空账本场景验证基本结构：

```ts
expect(emptyReceipt.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  approvalReady: false,
  changeReady: false,
  executionReady: false,
  receiptReady: false,
```

blocked 决策后验证和上游 execution record 对齐：

```ts
expect(executionReceipt.json().executionName).toBe(executionRecord.json().executionName);
expect(executionReceipt.json().executionDigest.value).toBe(executionRecord.json().executionDigest.value);
expect(executionReceipt.json().executionDigest.value).toBe(
  executionRecordVerification.json().recomputedExecutionDigest.value,
);
```

同时验证 item 来源：

```ts
expect(executionReceipt.json().receiptItems[1]).toMatchObject({
  name: "verified-deployment-execution-record",
  valid: true,
  source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
});
```

Markdown 输出也覆盖：

```ts
expect(markdown.body).toContain("# Promotion deployment execution receipt");
expect(markdown.body).toContain("- Receipt ready: false");
expect(markdown.body).toContain(`- Receipt digest: sha256:${executionReceipt.json().receiptDigest.value}`);
expect(markdown.body).toContain("- Execution record verified: true");
expect(markdown.body).toContain("## Receipt Items");
expect(markdown.body).toContain("### verified-deployment-execution-record");
```

## 16. v49 的定位

v49 是一个合适的小闭环：

```text
verified deployment execution record -> deployment execution receipt
```

它不是只加文档或按钮，也没有跨到 receipt verification 或真实部署动作。下一版自然可以做 `deployment execution receipt verification`。
