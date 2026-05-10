# 38. V34 promotion handoff receipt verification 代码讲解

V33 已经生成 `promotion handoff receipt`，把 verified certificate 收口成最终交接收据。

V34 做的是再复核一次 receipt：重新计算 `receiptDigest`，并逐个检查 receipt 里的 milestones 是否仍然和当前 verified certificate 链路一致。

整体链路：

```text
handoff package
 -> handoff package verification
 -> handoff certificate
 -> handoff certificate verification
 -> handoff receipt
 -> handoff receipt verification
```

## 1. receipt verification milestone

文件：`src/services/opsPromotionArchiveBundle.ts`

V34 为 receipt 的 milestone 增加复核结构。

```ts
export interface OpsPromotionHandoffReceiptVerificationMilestone {
  name: OpsPromotionHandoffReceiptMilestoneName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}
```

这和前面的 package/certificate verification 一样：既看 `valid`，也看 `source` 和 `digest` 是否匹配。

## 2. receipt verification 主体

文件：`src/services/opsPromotionArchiveBundle.ts`

主结构里有原始 `receiptDigest` 和重新计算出的 `recomputedReceiptDigest`。

```ts
export interface OpsPromotionHandoffReceiptVerification {
  service: "orderops-node";
  generatedAt: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedReceiptDigest: {
    algorithm: "sha256";
    value: string;
  };
```

如果两者相等，说明 receipt 当前字段和它声明的 digest 没有脱节。

## 3. checks 范围

文件：`src/services/opsPromotionArchiveBundle.ts`

V34 的 checks 覆盖 receipt 自身字段、各类 digest 引用和 milestones。

```ts
  checks: {
    receiptDigestValid: boolean;
    coveredFieldsMatch: boolean;
    milestonesValid: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    certificateDigestMatches: boolean;
    verifiedCertificateDigestMatches: boolean;
    packageDigestMatches: boolean;
    verifiedPackageDigestMatches: boolean;
    sealDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
```

可以理解为三层：

```text
receipt 自身: receiptDigestValid / coveredFieldsMatch / receiptNameMatches
引用链路: certificateDigestMatches / packageDigestMatches / sealDigestMatches
人工交接: milestonesValid / decisionMatches / verificationMatches / nextActionsMatch
```

## 4. 重新生成 expected receipt

文件：`src/services/opsPromotionArchiveBundle.ts`

V34 的入口接收 certificate、certificateVerification 和 receipt。

```ts
export function createOpsPromotionHandoffReceiptVerification(input: {
  certificate: OpsPromotionHandoffCertificate;
  certificateVerification: OpsPromotionHandoffCertificateVerification;
  receipt: OpsPromotionHandoffReceipt;
}): OpsPromotionHandoffReceiptVerification {
  const expectedReceipt = createOpsPromotionHandoffReceipt({
    certificate: input.certificate,
    certificateVerification: input.certificateVerification,
  });
```

`expectedReceipt` 是用当前 verified certificate 链路重新生成的标准答案。

## 5. 复算 receiptDigest

文件：`src/services/opsPromotionArchiveBundle.ts`

复算使用 V33 的同一个 `archiveHandoffReceiptDigestPayload`。

```ts
  const recomputedReceiptDigest = digestStable(archiveHandoffReceiptDigestPayload({
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid: input.receipt.valid,
    state: input.receipt.state,
    handoffReady: input.receipt.handoffReady,
    certificateDigest: input.receipt.certificateDigest.value,
    verifiedCertificateDigest: input.receipt.verifiedCertificateDigest.value,
    packageDigest: input.receipt.packageDigest.value,
    verifiedPackageDigest: input.receipt.verifiedPackageDigest.value,
    sealDigest: input.receipt.sealDigest.value,
    decision: input.receipt.decision,
    verification: input.receipt.verification,
    milestones: input.receipt.milestones,
    nextActions: input.receipt.nextActions,
  }));
```

这一步检查 receipt 内部有没有被改动。

## 6. 逐 milestone 复核

文件：`src/services/opsPromotionArchiveBundle.ts`

V34 对 receipt 的每个 milestone 找 expected receipt 中的同名项。

```ts
  const milestoneChecks = input.receipt.milestones.map((milestone) => {
    const expected = expectedReceipt.milestones.find((candidate) => candidate.name === milestone.name);
    const validMatches = expected?.valid === milestone.valid;
    const sourceMatches = expected?.source === milestone.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: milestone.name }) };
    const digestMatches = milestone.digest.value === expectedDigest.value;

    return {
      name: milestone.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      receiptDigest: { ...milestone.digest },
      recomputedDigest: expectedDigest,
      source: milestone.source,
    };
  });
```

如果 milestone 缺失，仍然生成一个 `{ missing: milestone.name }` 的占位 digest，方便定位问题。

## 7. 生成 checks

文件：`src/services/opsPromotionArchiveBundle.ts`

V34 的 checks 同时比较 digest、字段和对象摘要。

```ts
  const checks = {
    receiptDigestValid: input.receipt.receiptDigest.value === recomputedReceiptDigest,
    coveredFieldsMatch: stableJson(input.receipt.receiptDigest.coveredFields)
      === stableJson(expectedReceipt.receiptDigest.coveredFields),
    milestonesValid: milestoneChecks.length === expectedReceipt.milestones.length
      && milestoneChecks.every((milestone) => milestone.valid),
    receiptNameMatches: input.receipt.receiptName === expectedReceipt.receiptName,
    certificateNameMatches: input.receipt.certificateName === expectedReceipt.certificateName,
    packageNameMatches: input.receipt.packageName === expectedReceipt.packageName,
    archiveNameMatches: input.receipt.archiveName === expectedReceipt.archiveName,
    validMatches: input.receipt.valid === expectedReceipt.valid,
    stateMatches: input.receipt.state === expectedReceipt.state,
    handoffReadyMatches: input.receipt.handoffReady === expectedReceipt.handoffReady,
    certificateDigestMatches: input.receipt.certificateDigest.value === expectedReceipt.certificateDigest.value,
    verifiedCertificateDigestMatches: input.receipt.verifiedCertificateDigest.value === expectedReceipt.verifiedCertificateDigest.value,
    packageDigestMatches: input.receipt.packageDigest.value === expectedReceipt.packageDigest.value,
    verifiedPackageDigestMatches: input.receipt.verifiedPackageDigest.value === expectedReceipt.verifiedPackageDigest.value,
    sealDigestMatches: input.receipt.sealDigest.value === expectedReceipt.sealDigest.value,
    decisionMatches: stableJson(input.receipt.decision) === stableJson(expectedReceipt.decision),
    verificationMatches: stableJson(input.receipt.verification) === stableJson(expectedReceipt.verification),
    nextActionsMatch: stableJson(input.receipt.nextActions) === stableJson(expectedReceipt.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);
```

`stableJson` 用来避免对象属性顺序影响比较。

## 8. nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

receipt verification 的 nextActions 按故障层级返回。

```ts
function archiveHandoffReceiptVerificationNextActions(
  checks: OpsPromotionHandoffReceiptVerification["checks"],
  receipt: OpsPromotionHandoffReceipt,
): string[] {
  if (!checks.receiptDigestValid) {
    return ["Regenerate the handoff receipt before trusting this receipt digest."];
  }

  if (!checks.milestonesValid) {
    return ["Review handoff receipt milestones before storing the final handoff receipt."];
  }
```

如果 digest 引用链不一致，则要求从最新 verified certificate chain 重建。

```ts
  if (
    !checks.certificateDigestMatches
    || !checks.verifiedCertificateDigestMatches
    || !checks.packageDigestMatches
    || !checks.verifiedPackageDigestMatches
    || !checks.sealDigestMatches
  ) {
    return ["Recreate the handoff receipt from the latest verified certificate chain."];
  }
```

ready 时输出最终动作。

```ts
  if (receipt.handoffReady) {
    return ["Handoff receipt verification is complete; store the verified receipt digest with the final handoff record."];
  }

  return receipt.nextActions;
}
```

## 9. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

V34 同样提供 Markdown。

```ts
export function renderOpsPromotionHandoffReceiptVerificationMarkdown(
  verification: OpsPromotionHandoffReceiptVerification,
): string {
  const lines = [
    "# Promotion handoff receipt verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Receipt digest: ${verification.receiptDigest.algorithm}:${verification.receiptDigest.value}`,
    `- Recomputed receipt digest: ${verification.recomputedReceiptDigest.algorithm}:${verification.recomputedReceiptDigest.value}`,
```

milestone 渲染函数：

```ts
function renderHandoffReceiptVerificationMilestones(milestones: OpsPromotionHandoffReceiptVerificationMilestone[]): string[] {
  return milestones.flatMap((milestone) => [
    `### ${milestone.name}`,
    "",
    `- Valid: ${milestone.valid}`,
    `- Valid matches: ${milestone.validMatches}`,
    `- Source matches: ${milestone.sourceMatches}`,
    `- Digest matches: ${milestone.digestMatches}`,
    `- Receipt digest: ${milestone.receiptDigest.algorithm}:${milestone.receiptDigest.value}`,
    `- Recomputed digest: ${milestone.recomputedDigest.algorithm}:${milestone.recomputedDigest.value}`,
    `- Source: ${milestone.source}`,
    "",
  ]);
}
```

## 10. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

新增接口：

```text
GET /api/v1/ops/promotion-archive/handoff-receipt/verification
GET /api/v1/ops/promotion-archive/handoff-receipt/verification?format=markdown
```

路由先组装 receipt，再创建 receipt verification。

```ts
    const receipt = createOpsPromotionHandoffReceipt({
      certificate,
      certificateVerification,
    });
    const receiptVerification = createOpsPromotionHandoffReceiptVerification({
      certificate,
      certificateVerification,
      receipt,
    });
```

Markdown 分支：

```ts
    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionHandoffReceiptVerificationMarkdown(receiptVerification);
    }

    return receiptVerification;
```

这条路由只读 Node 本地内存状态，不会调用 Java 或 mini-kv 的真实动作。

## 11. Dashboard 入口

文件：`src/ui/dashboard.ts`

按钮：

```html
        <button data-action="opsPromotionHandoffReceiptVerification">Receipt Verification</button>
        <button data-action="opsPromotionHandoffReceiptVerificationReport">Receipt Verification Report</button>
```

事件：

```js
        if (action === "opsPromotionHandoffReceiptVerification") {
          write(await api("/api/v1/ops/promotion-archive/handoff-receipt/verification"));
        }
        if (action === "opsPromotionHandoffReceiptVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-receipt/verification?format=markdown");
```

## 12. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

V34 新增 receipt verification 的 JSON/Markdown 测试。

```ts
  it("verifies a promotion handoff receipt as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));
```

空 ledger 时也要求复核成立。

```ts
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        checks: {
          receiptDigestValid: true,
          coveredFieldsMatch: true,
          milestonesValid: true,
```

blocked decision 后，检查 receipt digest 能复算一致。

```ts
      expect(verification.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().receiptDigest.value).toBe(verification.json().recomputedReceiptDigest.value);
      expect(verification.json().milestones.every((milestone: { valid: boolean }) => milestone.valid)).toBe(true);
      expect(verification.json().milestones.every((milestone: { digestMatches: boolean }) => milestone.digestMatches)).toBe(true);
```

approved 大链路也补了 ready receipt verification。

```ts
      expect(handoffReceiptVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          receiptDigestValid: true,
          coveredFieldsMatch: true,
          milestonesValid: true,
```

最终 next action：

```ts
      expect(handoffReceiptVerification.json().nextActions).toEqual([
        "Handoff receipt verification is complete; store the verified receipt digest with the final handoff record.",
      ]);
```

## 13. 一句话总结

V34 给 V33 的 `receiptDigest` 加上了可复核闭环：receipt 自己的 digest 能重新算一致，receipt 中的五个 milestone 也能逐项对上当前 verified certificate 链路。
