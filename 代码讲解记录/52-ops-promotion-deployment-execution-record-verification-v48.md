# v48 Promotion Deployment Execution Record Verification 代码讲解

## 1. 这一版解决什么问题

v47 生成了 `deployment execution record`，v48 只补它的 verification：重新基于 `changeRecord + changeRecordVerification` 生成 expected execution record，复算 `executionDigest`，逐项比对 `executionItems`。

核心入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionDeploymentExecutionRecordVerification(input: {
  changeRecord: OpsPromotionDeploymentChangeRecord;
  changeRecordVerification: OpsPromotionDeploymentChangeRecordVerification;
  executionRecord: OpsPromotionDeploymentExecutionRecord;
}): OpsPromotionDeploymentExecutionRecordVerification {
```

这个版本不执行部署，不调用 Java 或 mini-kv。它只验证 v47 的本地执行前记录。

## 2. Verification Item

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentExecutionRecordVerificationItem {
  name: OpsPromotionDeploymentExecutionRecordItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  executionItemDigest: {
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

它展开了每个 execution item 的匹配结果：

- `validMatches`
- `sourceMatches`
- `detailMatches`
- `digestMatches`

这样 execution record 如果被改坏，可以定位是来源、说明、digest 还是 valid 状态不一致。

## 3. Verification 总对象

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionDeploymentExecutionRecordVerification {
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

verification 自己保留完整身份字段，方便归档时单独阅读，不需要反查 execution record。

## 4. Checks 字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
checks: {
  executionDigestValid: boolean;
  coveredFieldsMatch: boolean;
  executionItemsValid: boolean;
  executionNameMatches: boolean;
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
  executionReadyMatches: boolean;
  changeDigestMatches: boolean;
  verifiedChangeDigestMatches: boolean;
  approvalDigestMatches: boolean;
  releaseArchiveDigestMatches: boolean;
  decisionMatches: boolean;
  verificationMatches: boolean;
  nextActionsMatch: boolean;
};
```

这组 checks 覆盖三类问题：

- 摘要是否自洽：`executionDigestValid`、`coveredFieldsMatch`
- 执行条目是否自洽：`executionItemsValid`
- 上游引用、状态、decision、verification、nextActions 是否还和 expected record 对齐

## 5. 重新生成 Expected Execution Record

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const expectedExecutionRecord = createOpsPromotionDeploymentExecutionRecord({
  changeRecord: input.changeRecord,
  changeRecordVerification: input.changeRecordVerification,
});
```

v48 不盲信传入的 execution record，而是从 v45/v46 的对象重新生成 expected record。

这和 mini-kv 里讲 manifest 校验时的思路类似：不信“我说我是谁”，而是从上游事实重新计算。

## 6. 复算 Execution Digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const recomputedExecutionDigest = digestStable(archiveDeploymentExecutionRecordDigestPayload({
  executionName: input.executionRecord.executionName,
  changeRecordName: input.executionRecord.changeRecordName,
  approvalName: input.executionRecord.approvalName,
  releaseArchiveName: input.executionRecord.releaseArchiveName,
  evidenceName: input.executionRecord.evidenceName,
  completionName: input.executionRecord.completionName,
  closureName: input.executionRecord.closureName,
  receiptName: input.executionRecord.receiptName,
  certificateName: input.executionRecord.certificateName,
  packageName: input.executionRecord.packageName,
  archiveName: input.executionRecord.archiveName,
  valid: input.executionRecord.valid,
  state: input.executionRecord.state,
  handoffReady: input.executionRecord.handoffReady,
  approvalReady: input.executionRecord.approvalReady,
  changeReady: input.executionRecord.changeReady,
  executionReady: input.executionRecord.executionReady,
  changeDigest: input.executionRecord.changeDigest.value,
  verifiedChangeDigest: input.executionRecord.verifiedChangeDigest.value,
  approvalDigest: input.executionRecord.approvalDigest.value,
  releaseArchiveDigest: input.executionRecord.releaseArchiveDigest.value,
  decision: input.executionRecord.decision,
  verification: input.executionRecord.verification,
  executionItems: input.executionRecord.executionItems,
  nextActions: input.executionRecord.nextActions,
}));
```

生成和验证都复用 `archiveDeploymentExecutionRecordDigestPayload`，所以 digest 的字段边界一致。

## 7. Execution Items 逐项检查

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const executionItemChecks = input.executionRecord.executionItems.map((item) => {
  const expected = expectedExecutionRecord.executionItems.find((candidate) => candidate.name === item.name);
  const validMatches = expected?.valid === item.valid;
  const sourceMatches = expected?.source === item.source;
  const detailMatches = expected?.detail === item.detail;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
  const digestMatches = item.digest.value === expectedDigest.value;
```

每个 item 都与 expected record 的同名 item 比较：

- `deployment-change-record`
- `verified-deployment-change-record`
- `deployment-approval`
- `deployment-execution-state`

返回值保留两份 digest：

```ts
executionItemDigest: { ...item.digest },
recomputedDigest: expectedDigest,
```

这让 Markdown 和 JSON 都能看出“原始 item digest”和“复算 digest”是否一致。

## 8. Checks 汇总

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const checks = {
  executionDigestValid: input.executionRecord.executionDigest.value === recomputedExecutionDigest,
  coveredFieldsMatch: stableJson(input.executionRecord.executionDigest.coveredFields)
    === stableJson(expectedExecutionRecord.executionDigest.coveredFields),
  executionItemsValid: executionItemChecks.length === expectedExecutionRecord.executionItems.length
    && executionItemChecks.every((item) => item.valid),
```

后面继续比较 identity、ready 状态、digest、decision、verification 和 nextActions。

总结果仍然是：

```ts
const valid = Object.values(checks).every(Boolean);
```

任意字段漂移都会让 verification 失败。

## 9. Next Actions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveDeploymentExecutionRecordVerificationNextActions(
  checks: OpsPromotionDeploymentExecutionRecordVerification["checks"],
  executionRecord: OpsPromotionDeploymentExecutionRecord,
): string[] {
  if (!checks.executionDigestValid) {
    return ["Regenerate the deployment execution record before using it as a release execution correlation id."];
  }

  if (!checks.executionItemsValid) {
    return ["Review deployment execution record items before trusting the execution digest."];
  }

  if (!checks.coveredFieldsMatch || !checks.verificationMatches || !checks.nextActionsMatch) {
    return ["Regenerate the deployment execution record from the verified change record chain."];
  }

  if (executionRecord.executionReady) {
    return ["Deployment execution record is verified; use the execution digest as the release execution correlation id."];
  }

  return executionRecord.nextActions;
}
```

这里先处理 verification 自己发现的问题；只有验证全部通过后，才继承 execution record 的业务 nextActions。

## 10. Markdown 输出

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown(
  verification: OpsPromotionDeploymentExecutionRecordVerification,
): string {
```

Markdown 输出：

- execution identity
- `Execution digest`
- `Recomputed execution digest`
- checks
- execution items
- summary
- nextActions

这让调试面板和归档文档都能直接复核执行前记录。

## 11. API 路由

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/deployment-execution-record/verification", {
```

路由先取上游产物：

```ts
const { deploymentChangeRecord, deploymentChangeRecordVerification, deploymentExecutionRecord } = createPromotionReleaseEvidenceArtifacts(deps);
const deploymentExecutionRecordVerification = createOpsPromotionDeploymentExecutionRecordVerification({
  changeRecord: deploymentChangeRecord,
  changeRecordVerification: deploymentChangeRecordVerification,
  executionRecord: deploymentExecutionRecord,
});
```

Markdown 仍然使用 `format=markdown`：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown(deploymentExecutionRecordVerification);
}
```

## 12. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionDeploymentExecutionRecordVerification">Deployment Execution Verification</button>
<button data-action="opsPromotionDeploymentExecutionRecordVerificationReport">Deployment Execution Verification Report</button>
```

JSON 按钮：

```ts
if (action === "opsPromotionDeploymentExecutionRecordVerification") {
  write(await api("/api/v1/ops/promotion-archive/deployment-execution-record/verification"));
}
```

Markdown 按钮：

```ts
if (action === "opsPromotionDeploymentExecutionRecordVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/deployment-execution-record/verification?format=markdown");
```

## 13. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("verifies promotion deployment execution record as JSON or Markdown", async () => {
```

空账本场景验证 digest 自洽：

```ts
expect(emptyVerification.json().executionDigest.value).toBe(emptyVerification.json().recomputedExecutionDigest.value);
expect(emptyVerification.json().executionItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
```

blocked 决策后验证和 v47 record 对齐：

```ts
expect(verification.json().executionName).toBe(executionRecord.json().executionName);
expect(verification.json().executionDigest.value).toBe(executionRecord.json().executionDigest.value);
expect(verification.json().executionDigest.value).toBe(verification.json().recomputedExecutionDigest.value);
```

同时检查 item 来源：

```ts
expect(verification.json().executionItems[1]).toMatchObject({
  name: "verified-deployment-change-record",
  valid: true,
  source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
});
```

Markdown 输出也覆盖：

```ts
expect(markdown.body).toContain("# Promotion deployment execution record verification");
expect(markdown.body).toContain("- Execution digest valid: true");
expect(markdown.body).toContain(`- Recomputed execution digest: sha256:${verification.json().recomputedExecutionDigest.value}`);
expect(markdown.body).toContain("## Execution Items");
expect(markdown.body).toContain("### verified-deployment-change-record");
expect(markdown.body).toContain("## Summary");
```

## 14. v48 的定位

v48 是一个合适粒度的小闭环：

```text
deployment execution record -> deployment execution record verification
```

它不是文档小修，也没有跨到真实部署或发布执行日志。下一版如果继续推进，可以进入 `deployment execution receipt`，但仍应保持单点闭环。
