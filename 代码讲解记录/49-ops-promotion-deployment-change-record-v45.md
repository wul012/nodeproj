# v45 Promotion Deployment Change Record 代码讲解

## 1. 这一版解决什么问题

v43 已经能生成 `deployment approval`，v44 已经能复验 approval。v45 只做一件事：把“已验证的 approval”整理成一个 `deployment change record`，后续发布执行日志可以直接引用它的 `changeDigest`。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionDeploymentChangeRecord(input: {
  approval: OpsPromotionDeploymentApproval;
  approvalVerification: OpsPromotionDeploymentApprovalVerification;
}): OpsPromotionDeploymentChangeRecord {
```

这个版本没有继续做 change record verification，因为那会变成另一个独立闭环。v45 的粒度是合适的：有新业务对象、有 API、有 Dashboard 入口、有测试、有文档，但只跨一层业务概念。

## 2. Change Record 的数据结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentChangeRecord {
  service: "orderops-node";
  generatedAt: string;
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
```

这里没有只保存一个 digest，而是把前面 release archive、evidence、completion、closure、receipt、certificate、package、archive 的名称都带上。原因是 deployment change record 要承担“交付边界”的角色，读它的人不用再反查一长串上游对象才能知道它覆盖了什么。

## 3. Change Item 的设计

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionDeploymentChangeRecordItemName =
  | "deployment-approval"
  | "verified-deployment-approval"
  | "verified-release-archive"
  | "deployment-change-state";
```

v45 的 change record 只检查四类东西：

- `deployment-approval`：approval 本身存在且 digest 有效
- `verified-deployment-approval`：approval 已经经过 v44 verification
- `verified-release-archive`：approval 仍然引用已验证的 release archive
- `deployment-change-state`：把当前 state、ready 状态和 nextActions 固化下来

对应 item 结构：

```ts
export interface OpsPromotionDeploymentChangeRecordItem {
  name: OpsPromotionDeploymentChangeRecordItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}
```

这和 mini-kv 里讲 WAL、SSTable、Manifest 时类似：不是只说“现在可以用了”，而是把每个关键组成部分拆开，分别解释来源、摘要和有效性。

## 4. 变更记录名称来自已验证 Approval Digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const changeRecordName = `promotion-deployment-change-${input.approvalVerification.recomputedApprovalDigest.value.slice(0, 12)}`;
const changeItems = archiveDeploymentChangeRecordItems(input.approval, input.approvalVerification);
const approvalReferenceValid = input.approval.approvalDigest.value === input.approvalVerification.recomputedApprovalDigest.value;
```

`changeRecordName` 使用 `recomputedApprovalDigest` 的前 12 位，不直接使用时间戳。这样同一份 approval verification 会生成稳定的变更记录名称，适合放到发布记录里。

`approvalReferenceValid` 是 v45 的关键边界：change record 不盲信 approval 自己的 digest，而是要求 approval digest 等于 verification 复算出的 digest。

## 5. Readiness 是逐层收紧的

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const valid = input.approval.valid
  && input.approvalVerification.valid
  && approvalReferenceValid
  && changeItems.every((item) => item.valid);
const handoffReady = valid && input.approval.handoffReady && input.approvalVerification.handoffReady;
const approvalReady = handoffReady && input.approval.approvalReady && input.approvalVerification.approvalReady;
const changeReady = approvalReady && input.approvalVerification.summary.closeoutReady;
```

这里是一个从底向上的门禁：

- `valid`：approval、verification、reference、items 都自洽
- `handoffReady`：只有 valid 后才看 handoff 条件
- `approvalReady`：只有 handoffReady 后才看 approval 条件
- `changeReady`：只有 approvalReady 后才允许变更记录进入可执行状态

所以 v45 不会出现“上游校验失败但变更记录显示 ready”的情况。

## 6. Change Digest 覆盖的字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
changeDigest: {
  algorithm: "sha256",
  value: digestStable(digestPayload),
  coveredFields: [
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
    "approvalDigest",
    "verifiedApprovalDigest",
    "releaseArchiveDigest",
    "decision",
    "verification",
    "changeItems",
    "nextActions",
  ],
},
```

这个 digest 覆盖身份、上游引用、ready 状态、approval digest、verification 汇总、change items 和 nextActions。后续如果有人改了某个 item 的 source、detail 或 nextActions，`changeDigest` 都会变化。

## 7. Digest Payload 保持稳定结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentChangeRecordDigestPayload(input: {
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
  approvalDigest: string;
  verifiedApprovalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionDeploymentChangeRecord["decision"];
  verification: OpsPromotionDeploymentChangeRecord["verification"];
  changeItems: OpsPromotionDeploymentChangeRecordItem[];
  nextActions: string[];
}) {
```

内部对 `changeItems` 做了精简：

```ts
changeItems: input.changeItems.map((item) => ({
  name: item.name,
  valid: item.valid,
  source: item.source,
  digest: item.digest.value,
  detail: item.detail,
})),
```

这样 digest 只绑定业务字段，不被 TypeScript 对象里的额外包装影响。

## 8. 四个 Change Item 如何产生

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentChangeRecordItems(
  approval: OpsPromotionDeploymentApproval,
  approvalVerification: OpsPromotionDeploymentApprovalVerification,
): OpsPromotionDeploymentChangeRecordItem[] {
  return [
```

第一个 item 绑定 v43 的 approval：

```ts
{
  name: "deployment-approval",
  valid: approval.valid && approvalVerification.checks.approvalDigestValid,
  source: "/api/v1/ops/promotion-archive/deployment-approval",
  digest: {
    algorithm: "sha256",
    value: approval.approvalDigest.value,
  },
  detail: "Deployment approval exists and its digest is covered by verification.",
},
```

第二个 item 绑定 v44 的 verification：

```ts
{
  name: "verified-deployment-approval",
  valid: approvalVerification.valid,
  source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
  digest: {
    algorithm: "sha256",
    value: approvalVerification.recomputedApprovalDigest.value,
  },
  detail: "Deployment approval has been recomputed from the verified release archive chain.",
},
```

第三个 item 保证 release archive 没断链：

```ts
{
  name: "verified-release-archive",
  valid: approvalVerification.checks.releaseArchiveDigestMatches
    && approvalVerification.checks.verifiedReleaseArchiveDigestMatches,
  source: "/api/v1/ops/promotion-archive/release-archive/verification",
  digest: {
    algorithm: "sha256",
    value: approval.verifiedReleaseArchiveDigest.value,
  },
```

第四个 item 记录部署变更状态：

```ts
{
  name: "deployment-change-state",
  valid: approvalVerification.valid
    && approvalVerification.checks.approvalReadyMatches
    && approval.verification.closeoutReady === approvalVerification.summary.closeoutReady,
```

这一组 item 让 v45 能清楚回答：“这份变更记录基于哪个 approval、哪个 verification、哪个 release archive，以及当前状态为什么还不能执行。”

## 9. Next Actions 直接复用验证结论

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentChangeRecordNextActions(
  approvalVerification: OpsPromotionDeploymentApprovalVerification,
  valid: boolean,
  changeReady: boolean,
): string[] {
  if (!approvalVerification.valid) {
    return ["Resolve deployment approval verification failures before writing the deployment change record."];
  }

  if (!valid) {
    return ["Regenerate the deployment change record after deployment approval and verification agree."];
  }

  if (changeReady) {
    return ["Deployment change record is ready; attach the change digest to release execution logs."];
  }

  return approvalVerification.nextActions;
}
```

如果 verification 失败，优先提示修复 verification。如果 change record 自己不一致，提示重新生成。只有前面都通过但还未 ready 时，才复用 approval verification 的 nextActions。

## 10. API 路由

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/deployment-change-record", {
```

路由里直接复用 `createPromotionReleaseEvidenceArtifacts`：

```ts
const { deploymentApproval, deploymentApprovalVerification } = createPromotionReleaseEvidenceArtifacts(deps);
const deploymentChangeRecord = createOpsPromotionDeploymentChangeRecord({
  approval: deploymentApproval,
  approvalVerification: deploymentApprovalVerification,
});
```

Markdown 输出也同一个 endpoint：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionDeploymentChangeRecordMarkdown(deploymentChangeRecord);
}
```

这延续了前面 archive、verification、approval 的接口风格。

## 11. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionDeploymentChangeRecord">Deployment Change Record</button>
<button data-action="opsPromotionDeploymentChangeRecordReport">Deployment Change Record Report</button>
```

点击 JSON 按钮时：

```ts
if (action === "opsPromotionDeploymentChangeRecord") {
  write(await api("/api/v1/ops/promotion-archive/deployment-change-record"));
}
```

点击 Markdown 按钮时：

```ts
if (action === "opsPromotionDeploymentChangeRecordReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/deployment-change-record?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

这让本版不是只有后端对象，也能在现有调试面板里直接查看。

## 12. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("builds promotion deployment change record as JSON or Markdown", async () => {
```

空账本场景验证 change record 可以生成，但还没有 ready：

```ts
expect(emptyChangeRecord.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  approvalReady: false,
  changeReady: false,
```

blocked 决策后验证 digest 和 item：

```ts
expect(changeRecord.json().approvalDigest.value).toBe(approval.json().approvalDigest.value);
expect(changeRecord.json().approvalDigest.value).toBe(changeRecord.json().verifiedApprovalDigest.value);
expect(changeRecord.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
expect(changeRecord.json().changeItems[1]).toMatchObject({
  name: "verified-deployment-approval",
  valid: true,
  source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
});
```

Markdown 也覆盖：

```ts
expect(markdown.body).toContain("# Promotion deployment change record");
expect(markdown.body).toContain("- Change ready: false");
expect(markdown.body).toContain(`- Change digest: sha256:${changeRecord.json().changeDigest.value}`);
expect(markdown.body).toContain("- Approval reference valid: true");
expect(markdown.body).toContain("## Change Items");
expect(markdown.body).toContain("### verified-deployment-approval");
```

## 13. v45 的定位

v45 的边界是：

```text
已验证 approval -> 可引用的 deployment change record
```

它不是一个文档小修，也不是把多个版本的事情塞到一起。下一版如果继续推进，比较自然的方向是 `deployment change record verification`，单独验证本版生成的 change digest 和 change items。
