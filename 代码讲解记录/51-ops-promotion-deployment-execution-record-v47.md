# v47 Promotion Deployment Execution Record 代码讲解

## 1. 这一版解决什么问题

v45 生成 `deployment change record`，v46 验证它。v47 只做下一步：基于已验证的 change record 生成一个 `deployment execution record`，给后续执行日志一个稳定的 `executionDigest`。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionDeploymentExecutionRecord(input: {
  changeRecord: OpsPromotionDeploymentChangeRecord;
  changeRecordVerification: OpsPromotionDeploymentChangeRecordVerification;
}): OpsPromotionDeploymentExecutionRecord {
```

注意这版没有执行部署，也没有调用 Java 或 mini-kv。它只是把“已经验证的变更记录”整理成一个本地执行凭证。

## 2. Execution Record 数据结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentExecutionRecord {
  service: "orderops-node";
  generatedAt: string;
  executionName: string;
  changeRecordName: string;
  approvalName: string;
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  changeReady: boolean;
  executionReady: boolean;
```

这里比 v45 多了 `executionName` 和 `executionReady`。前者是执行记录身份，后者表示这份执行记录是否真的可以进入后续发布执行阶段。

## 3. Execution Item 类型

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionDeploymentExecutionRecordItemName =
  | "deployment-change-record"
  | "verified-deployment-change-record"
  | "deployment-approval"
  | "deployment-execution-state";
```

四个 item 对应四类证据：

- `deployment-change-record`：v45 变更记录本体
- `verified-deployment-change-record`：v46 验证结果
- `deployment-approval`：仍然引用已验证的 approval digest
- `deployment-execution-state`：执行前状态和剩余动作

这和 mini-kv 的代码讲解类似：不是只说“可以执行”，而是把执行前依赖拆成几条可校验证据。

## 4. Execution Name 来自验证后的 Change Digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const executionName = `promotion-deployment-execution-${input.changeRecordVerification.recomputedChangeDigest.value.slice(0, 12)}`;
const executionItems = archiveDeploymentExecutionRecordItems(input.changeRecord, input.changeRecordVerification);
const changeReferenceValid = input.changeRecord.changeDigest.value === input.changeRecordVerification.recomputedChangeDigest.value;
```

`executionName` 使用 `recomputedChangeDigest` 的前 12 位。这样同一份 change record verification 会得到稳定名称，不会因为生成时间变化而换名字。

`changeReferenceValid` 是 v47 的核心门禁：只有 v45 record 的 `changeDigest` 等于 v46 verification 复算出来的 digest，execution record 才能继续成立。

## 5. Verification 摘要

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const verification = {
  changeRecordVerified: input.changeRecordVerification.valid,
  changeDigestValid: input.changeRecordVerification.checks.changeDigestValid,
  changeItemsValid: input.changeRecordVerification.checks.changeItemsValid,
  changeReferenceValid,
  closeoutReady: input.changeRecordVerification.summary.closeoutReady,
  changeItemCount: input.changeRecordVerification.summary.changeItemCount,
  executionItemCount: executionItems.length,
};
```

execution record 不重复 v46 的所有 checks，而是抽取执行前最关键的摘要：

- change record 是否已验证
- change digest 是否有效
- change items 是否有效
- 当前 record 是否引用了 verification 的复算 digest
- closeout 是否 ready

## 6. Ready 状态逐层收紧

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const valid = input.changeRecord.valid
  && input.changeRecordVerification.valid
  && changeReferenceValid
  && executionItems.every((item) => item.valid);
const handoffReady = valid && input.changeRecord.handoffReady && input.changeRecordVerification.handoffReady;
const approvalReady = handoffReady && input.changeRecord.approvalReady && input.changeRecordVerification.approvalReady;
const changeReady = approvalReady && input.changeRecord.changeReady && input.changeRecordVerification.changeReady;
const executionReady = changeReady && input.changeRecordVerification.summary.closeoutReady;
```

这一段是 v47 的执行前门禁：

- `valid`：record、verification、引用关系和 execution items 都有效
- `handoffReady`：必须在 valid 后继承 handoff 条件
- `approvalReady`：必须在 handoffReady 后继承 approval 条件
- `changeReady`：必须在 approvalReady 后继承 change 条件
- `executionReady`：必须在 changeReady 后 closeout 也 ready

所以当前状态即使对象 `valid=true`，也可能 `executionReady=false`，这正是执行前记录应该表达的含义。

## 7. Execution Digest 覆盖字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
executionDigest: {
  algorithm: "sha256",
  value: digestStable(digestPayload),
  coveredFields: [
    "executionName",
    "changeRecordName",
    "approvalName",
    "releaseArchiveName",
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
    "approvalReady",
    "changeReady",
    "executionReady",
    "changeDigest",
    "verifiedChangeDigest",
    "approvalDigest",
    "releaseArchiveDigest",
    "decision",
    "verification",
    "executionItems",
    "nextActions",
  ],
},
```

这个 digest 覆盖身份、上游 digest、ready 状态、decision、verification 摘要、executionItems 和 nextActions。后续执行日志只要带上 `executionDigest`，就能对应到这份执行前记录。

## 8. Digest Payload

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentExecutionRecordDigestPayload(input: {
  executionName: string;
  changeRecordName: string;
  approvalName: string;
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  changeReady: boolean;
  executionReady: boolean;
  changeDigest: string;
  verifiedChangeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionDeploymentExecutionRecord["decision"];
  verification: OpsPromotionDeploymentExecutionRecord["verification"];
  executionItems: OpsPromotionDeploymentExecutionRecordItem[];
  nextActions: string[];
}) {
```

payload 内部把 item 压成稳定结构：

```ts
executionItems: input.executionItems.map((item) => ({
  name: item.name,
  valid: item.valid,
  source: item.source,
  digest: item.digest.value,
  detail: item.detail,
})),
```

这样 digest 不受对象包装影响，只绑定业务字段。

## 9. Execution Items 如何产生

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentExecutionRecordItems(
  changeRecord: OpsPromotionDeploymentChangeRecord,
  changeRecordVerification: OpsPromotionDeploymentChangeRecordVerification,
): OpsPromotionDeploymentExecutionRecordItem[] {
```

第一个 item 绑定 v45 record：

```ts
{
  name: "deployment-change-record",
  valid: changeRecord.valid && changeRecordVerification.checks.changeDigestValid,
  source: "/api/v1/ops/promotion-archive/deployment-change-record",
  digest: {
    algorithm: "sha256",
    value: changeRecord.changeDigest.value,
  },
  detail: "Deployment change record exists and its digest is covered by verification.",
},
```

第二个 item 绑定 v46 verification：

```ts
{
  name: "verified-deployment-change-record",
  valid: changeRecordVerification.valid,
  source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
  digest: {
    algorithm: "sha256",
    value: changeRecordVerification.recomputedChangeDigest.value,
  },
  detail: "Deployment change record has been recomputed from the verified approval chain.",
},
```

第三个 item 确保 approval 链没断：

```ts
{
  name: "deployment-approval",
  valid: changeRecordVerification.checks.approvalDigestMatches
    && changeRecordVerification.checks.verifiedApprovalDigestMatches,
  source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
  digest: {
    algorithm: "sha256",
    value: changeRecord.verifiedApprovalDigest.value,
  },
```

第四个 item 固化执行前状态：

```ts
{
  name: "deployment-execution-state",
  valid: changeRecordVerification.valid
    && changeRecordVerification.checks.changeReadyMatches
    && changeRecord.verification.closeoutReady === changeRecordVerification.summary.closeoutReady,
```

## 10. Next Actions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentExecutionRecordNextActions(
  changeRecordVerification: OpsPromotionDeploymentChangeRecordVerification,
  valid: boolean,
  executionReady: boolean,
): string[] {
  if (!changeRecordVerification.valid) {
    return ["Resolve deployment change record verification failures before writing the deployment execution record."];
  }

  if (!valid) {
    return ["Regenerate the deployment execution record after change record and verification agree."];
  }

  if (executionReady) {
    return ["Deployment execution record is ready; use the execution digest as the release execution correlation id."];
  }

  return changeRecordVerification.nextActions;
}
```

如果 v46 verification 失败，先修 verification。如果 v47 自己不一致，重新生成 execution record。只有都通过时，才沿用业务 nextActions。

## 11. Markdown 输出

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionDeploymentExecutionRecordMarkdown(record: OpsPromotionDeploymentExecutionRecord): string {
```

Markdown 输出：

- `Execution name`
- `Execution ready`
- `Execution digest`
- `Change digest`
- `Verified change digest`
- verification 摘要
- execution items
- nextActions

这让 Dashboard 里能直接复制一份可读执行前记录。

## 12. API 路由

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/deployment-execution-record", {
```

路由从 helper 直接拿 `deploymentExecutionRecord`：

```ts
const { deploymentExecutionRecord } = createPromotionReleaseEvidenceArtifacts(deps);
```

Markdown 仍然是同一 endpoint：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionDeploymentExecutionRecordMarkdown(deploymentExecutionRecord);
}
```

## 13. Helper 生成链

文件：`src/routes/opsSummaryRoutes.ts`

```ts
const deploymentChangeRecordVerification = createOpsPromotionDeploymentChangeRecordVerification({
  approval: deploymentApproval,
  approvalVerification: deploymentApprovalVerification,
  changeRecord: deploymentChangeRecord,
});
const deploymentExecutionRecord = createOpsPromotionDeploymentExecutionRecord({
  changeRecord: deploymentChangeRecord,
  changeRecordVerification: deploymentChangeRecordVerification,
});
```

这条链路很明确：

```text
approval -> approvalVerification -> changeRecord -> changeRecordVerification -> executionRecord
```

v47 只接最后一步。

## 14. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionDeploymentExecutionRecord">Deployment Execution Record</button>
<button data-action="opsPromotionDeploymentExecutionRecordReport">Deployment Execution Record Report</button>
```

JSON 按钮：

```ts
if (action === "opsPromotionDeploymentExecutionRecord") {
  write(await api("/api/v1/ops/promotion-archive/deployment-execution-record"));
}
```

Markdown 按钮：

```ts
if (action === "opsPromotionDeploymentExecutionRecordReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/deployment-execution-record?format=markdown");
```

## 15. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("builds promotion deployment execution record as JSON or Markdown", async () => {
```

空账本场景验证基本结构：

```ts
expect(emptyExecutionRecord.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  approvalReady: false,
  changeReady: false,
  executionReady: false,
```

blocked 决策后验证和上游 change record 对齐：

```ts
expect(executionRecord.json().changeRecordName).toBe(changeRecord.json().changeRecordName);
expect(executionRecord.json().changeDigest.value).toBe(changeRecord.json().changeDigest.value);
expect(executionRecord.json().changeDigest.value).toBe(changeRecordVerification.json().recomputedChangeDigest.value);
```

同时验证 item 来源：

```ts
expect(executionRecord.json().executionItems[1]).toMatchObject({
  name: "verified-deployment-change-record",
  valid: true,
  source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
});
```

Markdown 输出也覆盖：

```ts
expect(markdown.body).toContain("# Promotion deployment execution record");
expect(markdown.body).toContain("- Execution ready: false");
expect(markdown.body).toContain(`- Execution digest: sha256:${executionRecord.json().executionDigest.value}`);
expect(markdown.body).toContain("- Change record verified: true");
expect(markdown.body).toContain("## Execution Items");
expect(markdown.body).toContain("### verified-deployment-change-record");
```

## 16. v47 的定位

v47 是一个合适的小闭环：

```text
verified deployment change record -> deployment execution record
```

它不是只加文档或按钮，也没有跨到“执行记录验证”或真实部署动作。下一版自然可以做 `deployment execution record verification`。
