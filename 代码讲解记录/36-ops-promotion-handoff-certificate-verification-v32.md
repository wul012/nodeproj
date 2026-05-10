# 36. V32 promotion handoff certificate verification 代码讲解

V31 已经能生成 `promotion handoff certificate`，里面有 `certificateDigest`。

V32 做的是下一步：不要只相信 certificate 自己给出的 digest，而是重新计算、重新对比，形成一份 `certificate verification`。

整体链路变成：

```text
handoff package
 -> handoff package verification
 -> handoff certificate
 -> handoff certificate verification
```

## 1. 证书复核附件类型

文件：`src/services/opsPromotionArchiveBundle.ts`

V32 新增 `OpsPromotionHandoffCertificateVerificationAttachment`，结构和 V30 package verification 的附件复核风格一致。

```ts
export interface OpsPromotionHandoffCertificateVerificationAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  certificateDigest: {
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

这里有三个 `*Matches` 字段：

```text
validMatches  -> certificate 里附件 valid 是否和重新生成的 expected certificate 一致
sourceMatches -> 附件来源路径是否一致
digestMatches -> 附件 digest 是否一致
```

## 2. certificate verification 主体

文件：`src/services/opsPromotionArchiveBundle.ts`

主结构里最重要的是原 digest 和复算 digest。

```ts
export interface OpsPromotionHandoffCertificateVerification {
  service: "orderops-node";
  generatedAt: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
```

含义是：

```text
certificateDigest
 -> V31 certificate 自己携带的摘要

recomputedCertificateDigest
 -> V32 按 certificate 当前字段重新算出来的摘要
```

如果两者相等，说明证书字段没有和 digest 脱钩。

## 3. checks 字段

文件：`src/services/opsPromotionArchiveBundle.ts`

V32 的 checks 不只检查 digest，还检查 certificate 是否仍然来自当前 verified package。

```ts
  checks: {
    certificateDigestValid: boolean;
    coveredFieldsMatch: boolean;
    attachmentsValid: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    packageDigestMatches: boolean;
    verifiedPackageDigestMatches: boolean;
    sealDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
```

这里可以理解成三层复核：

```text
第一层: certificateDigestValid / coveredFieldsMatch
第二层: packageDigestMatches / verifiedPackageDigestMatches / sealDigestMatches
第三层: decisionMatches / verificationMatches / attachmentsValid / nextActionsMatch
```

## 4. 重新生成 expected certificate

文件：`src/services/opsPromotionArchiveBundle.ts`

验证函数入口接收 package、package verification 和 certificate。

```ts
export function createOpsPromotionHandoffCertificateVerification(input: {
  handoffPackage: OpsPromotionHandoffPackage;
  handoffPackageVerification: OpsPromotionHandoffPackageVerification;
  certificate: OpsPromotionHandoffCertificate;
}): OpsPromotionHandoffCertificateVerification {
  const expectedCertificate = createOpsPromotionHandoffCertificate({
    handoffPackage: input.handoffPackage,
    handoffPackageVerification: input.handoffPackageVerification,
  });
```

这里的 `expectedCertificate` 是用当前 package 链路重新生成的“标准答案”。后面所有 matches 都拿传入的 `certificate` 和这个标准答案比。

## 5. 复算 certificateDigest

文件：`src/services/opsPromotionArchiveBundle.ts`

V32 沿用 V31 的 `archiveHandoffCertificateDigestPayload`，用 certificate 当前字段重新算 digest。

```ts
  const recomputedCertificateDigest = digestStable(archiveHandoffCertificateDigestPayload({
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid: input.certificate.valid,
    state: input.certificate.state,
    handoffReady: input.certificate.handoffReady,
    packageDigest: input.certificate.packageDigest.value,
    verifiedPackageDigest: input.certificate.verifiedPackageDigest.value,
    sealDigest: input.certificate.sealDigest.value,
    decision: input.certificate.decision,
    verification: input.certificate.verification,
    attachments: input.certificate.attachments,
    nextActions: input.certificate.nextActions,
  }));
```

这一步检查的是“证书内部有没有被改过”。

## 6. 逐附件复核

文件：`src/services/opsPromotionArchiveBundle.ts`

V32 对每个 certificate attachment 都找 expected certificate 中的同名附件。

```ts
  const attachmentChecks = input.certificate.attachments.map((attachment) => {
    const expected = expectedCertificate.attachments.find((candidate) => candidate.name === attachment.name);
    const validMatches = expected?.valid === attachment.valid;
    const sourceMatches = expected?.source === attachment.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: attachment.name }) };
    const digestMatches = attachment.digest.value === expectedDigest.value;

    return {
      name: attachment.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      certificateDigest: { ...attachment.digest },
      recomputedDigest: expectedDigest,
      source: attachment.source,
    };
  });
```

这段有一个小细节：如果同名附件找不到，`expectedDigest` 会用 `{ missing: attachment.name }` 生成一个占位 digest。这样返回结构仍然完整，调试时也能看到是哪一个附件不匹配。

## 7. 生成 checks

文件：`src/services/opsPromotionArchiveBundle.ts`

V32 的 checks 同时覆盖字段一致性和 digest 一致性。

```ts
  const checks = {
    certificateDigestValid: input.certificate.certificateDigest.value === recomputedCertificateDigest,
    coveredFieldsMatch: stableJson(input.certificate.certificateDigest.coveredFields)
      === stableJson(expectedCertificate.certificateDigest.coveredFields),
    attachmentsValid: attachmentChecks.length === expectedCertificate.attachments.length
      && attachmentChecks.every((attachment) => attachment.valid),
    certificateNameMatches: input.certificate.certificateName === expectedCertificate.certificateName,
    packageNameMatches: input.certificate.packageName === expectedCertificate.packageName,
    archiveNameMatches: input.certificate.archiveName === expectedCertificate.archiveName,
    validMatches: input.certificate.valid === expectedCertificate.valid,
    stateMatches: input.certificate.state === expectedCertificate.state,
    handoffReadyMatches: input.certificate.handoffReady === expectedCertificate.handoffReady,
    packageDigestMatches: input.certificate.packageDigest.value === expectedCertificate.packageDigest.value,
    verifiedPackageDigestMatches: input.certificate.verifiedPackageDigest.value === expectedCertificate.verifiedPackageDigest.value,
    sealDigestMatches: input.certificate.sealDigest.value === expectedCertificate.sealDigest.value,
    decisionMatches: stableJson(input.certificate.decision) === stableJson(expectedCertificate.decision),
    verificationMatches: stableJson(input.certificate.verification) === stableJson(expectedCertificate.verification),
    nextActionsMatch: stableJson(input.certificate.nextActions) === stableJson(expectedCertificate.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);
```

`stableJson` 的作用是让对象字段顺序不影响比较结果。

## 8. nextActions 的失败优先级

文件：`src/services/opsPromotionArchiveBundle.ts`

V32 的下一步动作按照“越底层越先处理”的顺序写。

```ts
function archiveHandoffCertificateVerificationNextActions(
  checks: OpsPromotionHandoffCertificateVerification["checks"],
  certificate: OpsPromotionHandoffCertificate,
): string[] {
  if (!checks.certificateDigestValid) {
    return ["Regenerate the handoff certificate before trusting this certificate digest."];
  }

  if (!checks.attachmentsValid) {
    return ["Review handoff certificate attachments before sharing the promotion handoff certificate."];
  }

  if (!checks.packageDigestMatches || !checks.verifiedPackageDigestMatches || !checks.sealDigestMatches) {
    return ["Recreate the handoff certificate from the latest verified handoff package."];
  }
```

如果证书是 ready 状态，复核完成后给出最终交接动作：

```ts
  if (certificate.handoffReady) {
    return ["Handoff certificate verification is complete; share the verified certificate digest with the handoff record."];
  }

  return certificate.nextActions;
}
```

## 9. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

V32 也提供 Markdown，方便归档、截图和人工审查。

```ts
export function renderOpsPromotionHandoffCertificateVerificationMarkdown(
  verification: OpsPromotionHandoffCertificateVerification,
): string {
  const lines = [
    "# Promotion handoff certificate verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Certificate digest: ${verification.certificateDigest.algorithm}:${verification.certificateDigest.value}`,
    `- Recomputed certificate digest: ${verification.recomputedCertificateDigest.algorithm}:${verification.recomputedCertificateDigest.value}`,
```

checks 会逐项渲染：

```ts
    "## Checks",
    "",
    `- Certificate digest valid: ${verification.checks.certificateDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Attachments valid: ${verification.checks.attachmentsValid}`,
```

附件复核也有独立渲染函数：

```ts
function renderHandoffCertificateVerificationAttachments(attachments: OpsPromotionHandoffCertificateVerificationAttachment[]): string[] {
  return attachments.flatMap((attachment) => [
    `### ${attachment.name}`,
    "",
    `- Valid: ${attachment.valid}`,
    `- Valid matches: ${attachment.validMatches}`,
    `- Source matches: ${attachment.sourceMatches}`,
    `- Digest matches: ${attachment.digestMatches}`,
    `- Certificate digest: ${attachment.certificateDigest.algorithm}:${attachment.certificateDigest.value}`,
    `- Recomputed digest: ${attachment.recomputedDigest.algorithm}:${attachment.recomputedDigest.value}`,
    `- Source: ${attachment.source}`,
    "",
  ]);
}
```

## 10. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

新增接口：

```text
GET /api/v1/ops/promotion-archive/handoff-certificate/verification
GET /api/v1/ops/promotion-archive/handoff-certificate/verification?format=markdown
```

路由内部先重建整条归档链。

```ts
    const handoffPackageVerification = createOpsPromotionHandoffPackageVerification({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
      attestationVerification,
      handoffPackage,
    });
    const certificate = createOpsPromotionHandoffCertificate({
      handoffPackage,
      handoffPackageVerification,
    });
    const certificateVerification = createOpsPromotionHandoffCertificateVerification({
      handoffPackage,
      handoffPackageVerification,
      certificate,
    });
```

再根据 `format` 返回 JSON 或 Markdown。

```ts
    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionHandoffCertificateVerificationMarkdown(certificateVerification);
    }

    return certificateVerification;
```

这条接口只读取 Node 本地内存里的 promotion/ops 状态，不会去调用 Java 或 mini-kv 的真实动作。

## 11. Dashboard 入口

文件：`src/ui/dashboard.ts`

按钮：

```html
        <button data-action="opsPromotionHandoffCertificateVerification">Certificate Verification</button>
        <button data-action="opsPromotionHandoffCertificateVerificationReport">Certificate Verification Report</button>
```

事件：

```js
        if (action === "opsPromotionHandoffCertificateVerification") {
          write(await api("/api/v1/ops/promotion-archive/handoff-certificate/verification"));
        }
        if (action === "opsPromotionHandoffCertificateVerificationReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-certificate/verification?format=markdown");
```

## 12. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

V32 新增一个专门测试：

```ts
  it("verifies a promotion handoff certificate as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));
```

空 ledger 时也要保证证书复核成立：

```ts
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        checks: {
          certificateDigestValid: true,
          coveredFieldsMatch: true,
          attachmentsValid: true,
```

blocked decision 后，检查复算 digest 一致：

```ts
      expect(verification.json().certificateDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().certificateDigest.value).toBe(verification.json().recomputedCertificateDigest.value);
      expect(verification.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
      expect(verification.json().attachments.every((attachment: { digestMatches: boolean }) => attachment.digestMatches)).toBe(true);
```

approved 全链路里也补了 ready 证书复核：

```ts
      expect(handoffCertificateVerification.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        checks: {
          certificateDigestValid: true,
          coveredFieldsMatch: true,
          attachmentsValid: true,
```

ready 场景最终 next action：

```ts
      expect(handoffCertificateVerification.json().nextActions).toEqual([
        "Handoff certificate verification is complete; share the verified certificate digest with the handoff record.",
      ]);
```

## 13. 一句话总结

V32 给 V31 的 `certificateDigest` 加上了可复核闭环：证书自己说的 digest 要能复算一致，证书引用的 package/seal/attachments 也要和当前 verified package 链路一致。
