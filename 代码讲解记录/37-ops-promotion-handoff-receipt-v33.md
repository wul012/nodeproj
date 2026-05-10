# 37. V33 promotion handoff receipt 代码讲解

V32 已经能验证 `handoff certificate`，证明 `certificateDigest` 可以复算一致。

V33 做的是最后一层交接收口：生成 `promotion handoff receipt`。它像一张收据，把 certificate、verified certificate、package、verified package、seal digest 和关键里程碑汇总到一个 `receiptDigest` 下。

整体链路：

```text
handoff package
 -> handoff package verification
 -> handoff certificate
 -> handoff certificate verification
 -> handoff receipt
```

## 1. receipt milestone 类型

文件：`src/services/opsPromotionArchiveBundle.ts`

V33 先定义 receipt 里要记录的里程碑名字。

```ts
export type OpsPromotionHandoffReceiptMilestoneName =
  | "handoff-package"
  | "verified-handoff-package"
  | "archive-seal"
  | "handoff-certificate"
  | "certificate-verification";
```

每个 milestone 都保留三个核心信息：是否有效、来源 API、digest。

```ts
export interface OpsPromotionHandoffReceiptMilestone {
  name: OpsPromotionHandoffReceiptMilestoneName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}
```

这比完整 package/certificate 对象更轻，适合交接记录阅读。

## 2. receipt 主体结构

文件：`src/services/opsPromotionArchiveBundle.ts`

`OpsPromotionHandoffReceipt` 是 V33 的核心结构。

```ts
export interface OpsPromotionHandoffReceipt {
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
    coveredFields: string[];
  };
```

它同时保存 certificate、verified certificate、package、verified package 和 seal digest。

```ts
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
```

这样 receipt 自己不替代前面的对象，而是把前面对象的关键指纹汇总起来。

## 3. receipt 的 verification 摘要

文件：`src/services/opsPromotionArchiveBundle.ts`

receipt 里没有展开 V32 的全部 checks，只保留交接时最需要看的字段。

```ts
  verification: {
    certificateVerified: boolean;
    certificateDigestValid: boolean;
    packageReferenceValid: boolean;
    sealReferenceValid: boolean;
    attachmentsValid: boolean;
    milestoneCount: number;
    attachmentCount: number;
  };
```

对应含义：

```text
certificateVerified       -> V32 certificate verification 是否通过
certificateDigestValid    -> certificateDigest 是否复算一致
packageReferenceValid     -> packageDigest / verifiedPackageDigest 引用是否一致
sealReferenceValid        -> sealDigest 引用是否一致
attachmentsValid          -> certificate 附件是否全部通过
```

## 4. createOpsPromotionHandoffReceipt

文件：`src/services/opsPromotionArchiveBundle.ts`

V33 的入口只需要 certificate 和 certificateVerification。

```ts
export function createOpsPromotionHandoffReceipt(input: {
  certificate: OpsPromotionHandoffCertificate;
  certificateVerification: OpsPromotionHandoffCertificateVerification;
}): OpsPromotionHandoffReceipt {
  const receiptName = `promotion-receipt-${input.certificateVerification.recomputedCertificateDigest.value.slice(0, 12)}`;
```

`receiptName` 使用 verified certificate digest 的前 12 位。它说明 receipt 是从“已复核的 certificate”收口出来的。

## 5. 生成 receipt milestones

文件：`src/services/opsPromotionArchiveBundle.ts`

receipt 的里程碑由 `archiveHandoffReceiptMilestones` 生成。

```ts
  const milestones = archiveHandoffReceiptMilestones(input.certificate, input.certificateVerification);
```

这个函数生成五个节点。

```ts
function archiveHandoffReceiptMilestones(
  certificate: OpsPromotionHandoffCertificate,
  certificateVerification: OpsPromotionHandoffCertificateVerification,
): OpsPromotionHandoffReceiptMilestone[] {
  return [
    {
      name: "handoff-package",
      valid: certificate.valid && certificateVerification.checks.packageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package",
      digest: {
        algorithm: "sha256",
        value: certificate.packageDigest.value,
      },
    },
```

第二个节点记录 verified package。

```ts
    {
      name: "verified-handoff-package",
      valid: certificate.verification.packageVerified && certificateVerification.checks.verifiedPackageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package/verification",
      digest: {
        algorithm: "sha256",
        value: certificate.verifiedPackageDigest.value,
      },
    },
```

后面三个节点分别是 seal、certificate、certificate verification。

```ts
    {
      name: "archive-seal",
      valid: certificateVerification.checks.sealDigestMatches,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: certificate.sealDigest.value,
      },
    },
    {
      name: "handoff-certificate",
      valid: certificate.valid && certificateVerification.checks.certificateDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-certificate",
      digest: {
        algorithm: "sha256",
        value: certificate.certificateDigest.value,
      },
    },
    {
      name: "certificate-verification",
      valid: certificateVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      digest: {
        algorithm: "sha256",
        value: certificateVerification.recomputedCertificateDigest.value,
      },
    },
```

## 6. valid 和 handoffReady 的判断

文件：`src/services/opsPromotionArchiveBundle.ts`

receipt 的 valid 要求 certificate、certificate verification、digest 对齐和所有 milestones 都成立。

```ts
  const valid = input.certificate.valid
    && input.certificateVerification.valid
    && input.certificate.certificateDigest.value === input.certificateVerification.recomputedCertificateDigest.value
    && milestones.every((milestone) => milestone.valid);
  const handoffReady = valid && input.certificate.handoffReady && input.certificateVerification.handoffReady;
```

这里和前几版一样，不把 ready 当成孤立字段，而是让它依赖整条链路有效。

## 7. receiptDigest 覆盖字段

文件：`src/services/opsPromotionArchiveBundle.ts`

V33 用 `archiveHandoffReceiptDigestPayload` 生成稳定 payload。

```ts
  const digestPayload = archiveHandoffReceiptDigestPayload({
    receiptName,
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid,
    state: input.certificate.state,
    handoffReady,
    certificateDigest: input.certificate.certificateDigest.value,
    verifiedCertificateDigest: input.certificateVerification.recomputedCertificateDigest.value,
    packageDigest: input.certificate.packageDigest.value,
    verifiedPackageDigest: input.certificate.verifiedPackageDigest.value,
    sealDigest: input.certificate.sealDigest.value,
    decision: input.certificate.decision,
    verification,
    milestones,
    nextActions,
  });
```

返回对象公开 `coveredFields`。

```ts
    receiptDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "certificateDigest",
        "verifiedCertificateDigest",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "milestones",
        "nextActions",
      ],
    },
```

这让 `receiptDigest` 可以作为最终交接记录里的摘要。

## 8. receipt digest payload

文件：`src/services/opsPromotionArchiveBundle.ts`

payload 里 milestones 被压缩成稳定字段。

```ts
function archiveHandoffReceiptDigestPayload(input: {
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  certificateDigest: string;
  verifiedCertificateDigest: string;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffReceipt["decision"];
  verification: OpsPromotionHandoffReceipt["verification"];
  milestones: OpsPromotionHandoffReceiptMilestone[];
  nextActions: string[];
}) {
  return {
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
```

里程碑只保留 name、valid、source、digest value。

```ts
    milestones: input.milestones.map((milestone) => ({
      name: milestone.name,
      valid: milestone.valid,
      source: milestone.source,
      digest: milestone.digest.value,
    })),
    nextActions: input.nextActions,
  };
}
```

## 9. nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

receipt 的 nextActions 比较直接：certificate verification 没过就先修复；ready 时提示保存 receipt digest。

```ts
function archiveHandoffReceiptNextActions(
  certificate: OpsPromotionHandoffCertificate,
  certificateVerification: OpsPromotionHandoffCertificateVerification,
  valid: boolean,
): string[] {
  if (!certificateVerification.valid) {
    return ["Resolve handoff certificate verification failures before issuing a promotion handoff receipt."];
  }

  if (!valid) {
    return ["Regenerate the handoff receipt from a verified certificate before storing it."];
  }

  if (certificate.handoffReady) {
    return ["Promotion handoff receipt is ready; store the receipt digest with the final handoff record."];
  }

  return certificateVerification.nextActions;
}
```

## 10. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

V33 提供 Markdown 渲染。

```ts
export function renderOpsPromotionHandoffReceiptMarkdown(receipt: OpsPromotionHandoffReceipt): string {
  const lines = [
    "# Promotion handoff receipt",
    "",
    `- Service: ${receipt.service}`,
    `- Generated at: ${receipt.generatedAt}`,
    `- Receipt name: ${receipt.receiptName}`,
    `- Certificate name: ${receipt.certificateName}`,
    `- Package name: ${receipt.packageName}`,
    `- Archive name: ${receipt.archiveName}`,
    `- State: ${receipt.state}`,
    `- Valid: ${receipt.valid}`,
    `- Handoff ready: ${receipt.handoffReady}`,
    `- Receipt digest: ${receipt.receiptDigest.algorithm}:${receipt.receiptDigest.value}`,
```

里程碑渲染函数如下：

```ts
function renderHandoffReceiptMilestones(milestones: OpsPromotionHandoffReceiptMilestone[]): string[] {
  return milestones.flatMap((milestone) => [
    `### ${milestone.name}`,
    "",
    `- Valid: ${milestone.valid}`,
    `- Digest: ${milestone.digest.algorithm}:${milestone.digest.value}`,
    `- Source: ${milestone.source}`,
    "",
  ]);
}
```

## 11. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

新增接口：

```text
GET /api/v1/ops/promotion-archive/handoff-receipt
GET /api/v1/ops/promotion-archive/handoff-receipt?format=markdown
```

路由先重新组装 certificate 和 certificate verification，再生成 receipt。

```ts
    const certificateVerification = createOpsPromotionHandoffCertificateVerification({
      handoffPackage,
      handoffPackageVerification,
      certificate,
    });
    const receipt = createOpsPromotionHandoffReceipt({
      certificate,
      certificateVerification,
    });
```

Markdown 分支：

```ts
    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionHandoffReceiptMarkdown(receipt);
    }

    return receipt;
```

## 12. Dashboard 入口

文件：`src/ui/dashboard.ts`

按钮：

```html
        <button data-action="opsPromotionHandoffReceipt">Handoff Receipt</button>
        <button data-action="opsPromotionHandoffReceiptReport">Handoff Receipt Report</button>
```

事件：

```js
        if (action === "opsPromotionHandoffReceipt") {
          write(await api("/api/v1/ops/promotion-archive/handoff-receipt"));
        }
        if (action === "opsPromotionHandoffReceiptReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-receipt?format=markdown");
```

## 13. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

V33 新增 receipt 的 JSON/Markdown 测试。

```ts
  it("builds a promotion handoff receipt as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));
```

空 ledger 时也要有完整 receipt。

```ts
      expect(emptyReceipt.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          certificateVerified: true,
          certificateDigestValid: true,
          packageReferenceValid: true,
```

receipt 的 milestones 顺序也有断言。

```ts
      expect(emptyReceipt.json().milestones.map((milestone: { name: string }) => milestone.name)).toEqual([
        "handoff-package",
        "verified-handoff-package",
        "archive-seal",
        "handoff-certificate",
        "certificate-verification",
      ]);
```

approved 全链路里检查 ready receipt。

```ts
      expect(handoffReceipt.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
        },
        verification: {
          certificateVerified: true,
          certificateDigestValid: true,
```

最终 next action：

```ts
      expect(handoffReceipt.json().nextActions).toEqual([
        "Promotion handoff receipt is ready; store the receipt digest with the final handoff record.",
      ]);
```

## 14. 一句话总结

V33 把 verified certificate 收口成 `handoff receipt`：用 `receiptDigest` 封住最终交接摘要，并用五个 milestone 记录 package、verified package、seal、certificate、certificate verification 的关键指纹。
