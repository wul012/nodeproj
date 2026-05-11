# v46 Promotion Deployment Change Record Verification 代码讲解

## 1. 这一版解决什么问题

v45 已经生成 `deployment change record`，v46 只补它的 verification：重新基于 `approval + approvalVerification` 生成 expected change record，复算 `changeDigest`，逐项比对 `changeItems`。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionDeploymentChangeRecordVerification(input: {
  approval: OpsPromotionDeploymentApproval;
  approvalVerification: OpsPromotionDeploymentApprovalVerification;
  changeRecord: OpsPromotionDeploymentChangeRecord;
}): OpsPromotionDeploymentChangeRecordVerification {
```

这个版本的边界很清楚：只验证 v45 产物，不新增部署执行日志、不做执行回执。

## 2. Verification Item

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentChangeRecordVerificationItem {
  name: OpsPromotionDeploymentChangeRecordItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  changeItemDigest: {
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

它不是只返回一个 `valid`，而是把每个 item 的 4 个匹配维度展开：

- `validMatches`
- `sourceMatches`
- `detailMatches`
- `digestMatches`

这样如果 deployment change record 被改坏，可以知道是来源、说明、digest 还是 valid 状态漂移。

## 3. Verification 总对象

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentChangeRecordVerification {
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

这里保留和 change record 相同的身份字段，让 verification 本身也能单独阅读和归档。

## 4. Checks 字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
checks: {
  changeDigestValid: boolean;
  coveredFieldsMatch: boolean;
  changeItemsValid: boolean;
  changeRecordNameMatches: boolean;
  approvalNameMatches: boolean;
  releaseArchiveNameMatches: boolean;
  evidenceNameMatches: boolean;
  completionNameMatches: boolean;
  closureNameMatches: boolean;
  receiptNameMatches: boolean;
  certificateNameMatches: boolean;
  packageNameMatches: boolean;
  archiveNameMatches: boolean;
  validMatches: boolean;
  stateMatches: boolean;
  handoffReadyMatches: boolean;
  approvalReadyMatches: boolean;
  changeReadyMatches: boolean;
  approvalDigestMatches: boolean;
  verifiedApprovalDigestMatches: boolean;
  releaseArchiveDigestMatches: boolean;
  decisionMatches: boolean;
  verificationMatches: boolean;
  nextActionsMatch: boolean;
};
```

这组 checks 对应 v45 change record 的主要字段。它验证三类东西：

- 摘要自洽：`changeDigestValid`、`coveredFieldsMatch`
- 上游引用自洽：approval、verified approval、release archive digest
- 状态和动作自洽：state、ready 状态、decision、verification、nextActions

## 5. 重新生成 Expected Change Record

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const expectedChangeRecord = createOpsPromotionDeploymentChangeRecord({
  approval: input.approval,
  approvalVerification: input.approvalVerification,
});
```

这延续 v44 的思路：不直接相信传入对象，而是用同样的上游输入重新生成一份 expected record。

如果传入的 `changeRecord` 被手动改过，只要字段不符合 expected record，checks 就会失败。

## 6. 复算 Change Digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const recomputedChangeDigest = digestStable(archiveDeploymentChangeRecordDigestPayload({
  changeRecordName: input.changeRecord.changeRecordName,
  approvalName: input.changeRecord.approvalName,
  releaseArchiveName: input.changeRecord.releaseArchiveName,
  evidenceName: input.changeRecord.evidenceName,
  completionName: input.changeRecord.completionName,
  closureName: input.changeRecord.closureName,
  receiptName: input.changeRecord.receiptName,
  certificateName: input.changeRecord.certificateName,
  packageName: input.changeRecord.packageName,
  archiveName: input.changeRecord.archiveName,
  valid: input.changeRecord.valid,
  state: input.changeRecord.state,
  handoffReady: input.changeRecord.handoffReady,
  approvalReady: input.changeRecord.approvalReady,
  changeReady: input.changeRecord.changeReady,
  approvalDigest: input.changeRecord.approvalDigest.value,
  verifiedApprovalDigest: input.changeRecord.verifiedApprovalDigest.value,
  releaseArchiveDigest: input.changeRecord.releaseArchiveDigest.value,
  decision: input.changeRecord.decision,
  verification: input.changeRecord.verification,
  changeItems: input.changeRecord.changeItems,
  nextActions: input.changeRecord.nextActions,
}));
```

这里复用 v45 的 digest payload 函数，保证“生成 digest”和“验证 digest”使用同一套字段边界。

## 7. Change Items 逐项检查

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const changeItemChecks = input.changeRecord.changeItems.map((item) => {
  const expected = expectedChangeRecord.changeItems.find((candidate) => candidate.name === item.name);
  const validMatches = expected?.valid === item.valid;
  const sourceMatches = expected?.source === item.source;
  const detailMatches = expected?.detail === item.detail;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
  const digestMatches = item.digest.value === expectedDigest.value;
```

每个 item 都与 expected record 的同名 item 比较：

- `deployment-approval`
- `verified-deployment-approval`
- `verified-release-archive`
- `deployment-change-state`

返回时保留原 digest 和复算 digest：

```ts
changeItemDigest: { ...item.digest },
recomputedDigest: expectedDigest,
```

这和 mini-kv 里讲 SSTable index 或 manifest 校验类似：不是只说文件存在，而是逐条证明每个引用还对得上。

## 8. 总体验证结果

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const checks = {
  changeDigestValid: input.changeRecord.changeDigest.value === recomputedChangeDigest,
  coveredFieldsMatch: stableJson(input.changeRecord.changeDigest.coveredFields)
    === stableJson(expectedChangeRecord.changeDigest.coveredFields),
  changeItemsValid: changeItemChecks.length === expectedChangeRecord.changeItems.length
    && changeItemChecks.every((item) => item.valid),
```

后面继续比较名称、状态、digest、decision 和 nextActions。

最后总结果是：

```ts
const valid = Object.values(checks).every(Boolean);
```

也就是说任何一项漂移，verification 都会变成 `valid=false`。

## 9. Next Actions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentChangeRecordVerificationNextActions(
  checks: OpsPromotionDeploymentChangeRecordVerification["checks"],
  changeRecord: OpsPromotionDeploymentChangeRecord,
): string[] {
  if (!checks.changeDigestValid) {
    return ["Regenerate the deployment change record before attaching it to release execution logs."];
  }

  if (!checks.changeItemsValid) {
    return ["Review deployment change record items before trusting the change digest."];
  }

  if (!checks.coveredFieldsMatch || !checks.verificationMatches || !checks.nextActionsMatch) {
    return ["Regenerate the deployment change record from the verified approval chain."];
  }

  if (changeRecord.changeReady) {
    return ["Deployment change record is verified; attach the change digest to release execution logs."];
  }

  return changeRecord.nextActions;
}
```

它优先处理 verification 自己发现的问题。只有 verification 全部通过后，才继承 change record 的业务 nextActions。

## 10. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionDeploymentChangeRecordVerificationMarkdown(
  verification: OpsPromotionDeploymentChangeRecordVerification,
): string {
```

Markdown 会输出：

- 基础身份字段
- `Change digest`
- `Recomputed change digest`
- 全部 checks
- 逐项 `Change Items`
- summary
- nextActions

这保证 JSON 和 Markdown 两条观察路径都有同样的信息密度。

## 11. API 路由

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/deployment-change-record/verification", {
```

路由从同一个 helper 取上游产物：

```ts
const { deploymentApproval, deploymentApprovalVerification, deploymentChangeRecord } = createPromotionReleaseEvidenceArtifacts(deps);
const deploymentChangeRecordVerification = createOpsPromotionDeploymentChangeRecordVerification({
  approval: deploymentApproval,
  approvalVerification: deploymentApprovalVerification,
  changeRecord: deploymentChangeRecord,
});
```

Markdown 仍然使用 `format=markdown`：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionDeploymentChangeRecordVerificationMarkdown(deploymentChangeRecordVerification);
}
```

## 12. Helper 聚合

文件：`src/routes/opsSummaryRoutes.ts`

```ts
const deploymentChangeRecord = createOpsPromotionDeploymentChangeRecord({
  approval: deploymentApproval,
  approvalVerification: deploymentApprovalVerification,
});
```

`createPromotionReleaseEvidenceArtifacts` 现在会一并返回：

```ts
deploymentApproval,
deploymentApprovalVerification,
deploymentChangeRecord,
```

这样 change record 和 change record verification 路由使用同一条生成链，避免两个路由各自生成不同的中间对象。

## 13. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionDeploymentChangeRecordVerification">Deployment Change Verification</button>
<button data-action="opsPromotionDeploymentChangeRecordVerificationReport">Deployment Change Verification Report</button>
```

JSON 按钮：

```ts
if (action === "opsPromotionDeploymentChangeRecordVerification") {
  write(await api("/api/v1/ops/promotion-archive/deployment-change-record/verification"));
}
```

Markdown 按钮：

```ts
if (action === "opsPromotionDeploymentChangeRecordVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/deployment-change-record/verification?format=markdown");
```

## 14. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("verifies promotion deployment change record as JSON or Markdown", async () => {
```

空账本场景验证 digest 自洽：

```ts
expect(emptyVerification.json().changeDigest.value).toBe(emptyVerification.json().recomputedChangeDigest.value);
expect(emptyVerification.json().changeItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
```

blocked 决策后验证和 v45 record 对齐：

```ts
expect(verification.json().changeRecordName).toBe(changeRecord.json().changeRecordName);
expect(verification.json().changeDigest.value).toBe(changeRecord.json().changeDigest.value);
expect(verification.json().changeDigest.value).toBe(verification.json().recomputedChangeDigest.value);
```

同时检查 item 来源：

```ts
expect(verification.json().changeItems[1]).toMatchObject({
  name: "verified-deployment-approval",
  valid: true,
  source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
});
```

Markdown 输出也覆盖：

```ts
expect(markdown.body).toContain("# Promotion deployment change record verification");
expect(markdown.body).toContain("- Change digest valid: true");
expect(markdown.body).toContain(`- Recomputed change digest: sha256:${verification.json().recomputedChangeDigest.value}`);
expect(markdown.body).toContain("## Change Items");
expect(markdown.body).toContain("### verified-deployment-approval");
expect(markdown.body).toContain("## Summary");
```

## 15. v46 的定位

v46 是一个合适粒度的小闭环：

```text
deployment change record -> deployment change record verification
```

它不是文档小修，也没有跨到部署执行日志。下一版如果继续推进，可以考虑 `deployment execution record`，但应该仍然保持单点闭环。
