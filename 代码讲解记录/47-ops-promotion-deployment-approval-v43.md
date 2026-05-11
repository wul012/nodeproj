# v43 Promotion Deployment Approval 代码讲解

## 1. 这一版解决什么问题

v41 生成最终 release archive，v42 校验 release archive。v43 把这个“已验证的最终归档”封装成部署审批记录，也就是把可验证的 `releaseArchiveDigest` 接到更接近真实发布流程的 deployment change record。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionDeploymentApproval(input: {
  releaseArchive: OpsPromotionReleaseArchive;
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification;
}): OpsPromotionDeploymentApproval {
```

这里的输入只接受 release archive 和它的 verification，说明部署审批不会绕过最终归档校验。

## 2. Approval 数据结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionDeploymentApprovalItemName =
  | "release-archive"
  | "verified-release-archive"
  | "verified-release-evidence"
  | "deployment-approval-state";
```

v43 的审批记录必须覆盖 4 个点：

- `release-archive`：v41 生成的最终发布归档。
- `verified-release-archive`：v42 复验后的归档 digest。
- `verified-release-evidence`：归档背后的 release evidence 校验来源。
- `deployment-approval-state`：当前能否真正进入部署审批。

完整对象里新增 `approvalReady` 和 `approvalDigest`：

```ts
export interface OpsPromotionDeploymentApproval {
  approvalName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  approvalDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  approvalItems: OpsPromotionDeploymentApprovalItem[];
  nextActions: string[];
}
```

`valid` 表示审批记录本身可信；`approvalReady` 表示它是否真的可以附加到部署变更记录。

## 3. 核心构造逻辑

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const approvalName = `promotion-deployment-approval-${input.releaseArchiveVerification.recomputedReleaseArchiveDigest.value.slice(0, 12)}`;
const approvalItems = archiveDeploymentApprovalItems(input.releaseArchive, input.releaseArchiveVerification);
const releaseArchiveReferenceValid = input.releaseArchive.releaseArchiveDigest.value
  === input.releaseArchiveVerification.recomputedReleaseArchiveDigest.value;
```

这三步的意思是：

- 用复验后的 archive digest 派生审批记录名。
- 把审批证据拆成 4 个 item。
- 确认 release archive 自己声明的 digest 和 verification 复算值一致。

然后才计算状态：

```ts
const valid = input.releaseArchive.valid
  && input.releaseArchiveVerification.valid
  && releaseArchiveReferenceValid
  && approvalItems.every((item) => item.valid);
const handoffReady = valid && input.releaseArchive.handoffReady && input.releaseArchiveVerification.handoffReady;
const approvalReady = handoffReady && input.releaseArchiveVerification.summary.closeoutReady;
```

这让 blocked 场景仍然可以 `valid=true`，但 `approvalReady=false`。也就是说，记录可信，但还不允许发布。

## 4. Approval Digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const digestPayload = archiveDeploymentApprovalDigestPayload({
  approvalName,
  releaseArchiveName: input.releaseArchive.releaseArchiveName,
  evidenceName: input.releaseArchive.evidenceName,
  completionName: input.releaseArchive.completionName,
  closureName: input.releaseArchive.closureName,
  receiptName: input.releaseArchive.receiptName,
  certificateName: input.releaseArchive.certificateName,
  packageName: input.releaseArchive.packageName,
  archiveName: input.releaseArchive.archiveName,
  valid,
  state: input.releaseArchive.state,
  handoffReady,
  approvalReady,
  releaseArchiveDigest: input.releaseArchive.releaseArchiveDigest.value,
  verifiedReleaseArchiveDigest: input.releaseArchiveVerification.recomputedReleaseArchiveDigest.value,
  evidenceDigest: input.releaseArchive.evidenceDigest.value,
  decision: input.releaseArchive.decision,
  verification,
  approvalItems,
  nextActions,
});
```

这个 digest 不只盖住归档 digest，也盖住了审批状态、决策摘要、校验摘要和 next actions。后续如果审批对象被改动，`approvalDigest` 就会变化。

## 5. Approval Items

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
{
  name: "verified-release-archive",
  valid: releaseArchiveVerification.valid,
  source: "/api/v1/ops/promotion-archive/release-archive/verification",
  digest: {
    algorithm: "sha256",
    value: releaseArchiveVerification.recomputedReleaseArchiveDigest.value,
  },
  detail: "Final release archive has been recomputed from the verified release evidence chain.",
}
```

这说明 deployment approval 引用的是 v42 的复算 digest，而不是未经验证的归档输出。

状态 item 则绑定最终发布状态：

```ts
{
  name: "deployment-approval-state",
  valid: releaseArchiveVerification.valid
    && releaseArchiveVerification.checks.stateMatches
    && releaseArchiveVerification.checks.handoffReadyMatches
    && releaseArchive.verification.closeoutReady === releaseArchiveVerification.summary.closeoutReady,
}
```

这防止审批记录和最终 archive verification 的状态发生漂移。

## 6. Next Actions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentApprovalNextActions(
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification,
  valid: boolean,
  approvalReady: boolean,
): string[] {
  if (!releaseArchiveVerification.valid) {
    return ["Resolve final release archive verification failures before issuing deployment approval."];
  }
```

分支顺序是：

- release archive verification 不通过，先修归档校验。
- approval 本身不通过，重新生成审批。
- `approvalReady=true`，就可以附加到 deployment change record。
- 否则沿用上游 next actions。

## 7. API 和 Dashboard

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/deployment-approval", {
```

路由复用同一套 release archive 构建链路：

```ts
const { releaseArchive, releaseArchiveVerification } = createPromotionReleaseEvidenceArtifacts(deps);
const deploymentApproval = createOpsPromotionDeploymentApproval({
  releaseArchive,
  releaseArchiveVerification,
});
```

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionDeploymentApproval">Deployment Approval</button>
<button data-action="opsPromotionDeploymentApprovalReport">Deployment Approval Report</button>
```

## 8. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("builds promotion deployment approval as JSON or Markdown", async () => {
```

空账本场景验证结构：

```ts
expect(emptyApproval.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  approvalReady: false,
  verification: {
    releaseArchiveVerified: true,
    releaseArchiveDigestValid: true,
    archiveItemsValid: true,
    releaseArchiveReferenceValid: true,
  },
});
```

blocked 决策后验证 digest 和 item：

```ts
expect(approval.json().releaseArchiveDigest.value).toBe(releaseArchive.json().releaseArchiveDigest.value);
expect(approval.json().releaseArchiveDigest.value).toBe(approval.json().verifiedReleaseArchiveDigest.value);
expect(approval.json().approvalItems[1]).toMatchObject({
  name: "verified-release-archive",
  valid: true,
  source: "/api/v1/ops/promotion-archive/release-archive/verification",
});
```

Markdown 也覆盖：

```ts
expect(markdown.body).toContain("# Promotion deployment approval");
expect(markdown.body).toContain("- Approval ready: false");
expect(markdown.body).toContain("### verified-release-archive");
```

## 9. v43 的定位

到 v43，链路变成：

```text
release evidence -> release evidence verification
-> release archive -> release archive verification
-> deployment approval
```

下一版自然方向是给 `deployment approval` 补 verification，让部署审批记录也能独立复算。
