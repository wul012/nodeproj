# 35. V31 promotion handoff certificate 代码讲解

这一版继续沿着 V30 的 `handoff package verification` 往后走：前面已经能证明 package digest、附件 digest、seal digest 都一致；V31 再生成一个更短、更适合交接记录引用的 `handoff certificate`。

它不是重新打包所有详情，而是从 verified package 中提炼出：

```text
handoff package
 -> handoff package verification
 -> handoff certificate
 -> certificateDigest
```

这样交接时可以只带上 `certificateDigest`，再按需回查 package、attestation、manifest 等更细的对象。

## 1. 证书附件类型

文件：`src/services/opsPromotionArchiveBundle.ts`

V31 先复用 V29/V30 的附件名字类型，但把 certificate 里的附件压缩成四个字段：名称、有效性、来源、digest。

```ts
export interface OpsPromotionHandoffCertificateAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}
```

这里的 `name` 仍然来自：

```ts
export type OpsPromotionHandoffPackageAttachmentName =
  | "archive-bundle"
  | "archive-manifest"
  | "archive-verification"
  | "archive-attestation"
  | "attestation-verification";
```

所以 certificate 没有发明新的附件体系，而是继续承认同一条归档链路。

## 2. 证书主体结构

文件：`src/services/opsPromotionArchiveBundle.ts`

证书主体重点是 `certificateDigest`、`packageDigest`、`verifiedPackageDigest` 和 `sealDigest`。

```ts
export interface OpsPromotionHandoffCertificate {
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
    coveredFields: string[];
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
  decision: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestOutcome?: OpsPromotionDecision;
  };
  verification: {
    packageVerified: boolean;
    packageDigestValid: boolean;
    attachmentsValid: boolean;
    attachmentCount: number;
  };
  attachments: OpsPromotionHandoffCertificateAttachment[];
  nextActions: string[];
}
```

这一层的含义很明确：

```text
packageDigest
 -> handoff package 自己声明的 digest

verifiedPackageDigest
 -> V30 verification 重新计算出来的 digest

certificateDigest
 -> V31 对证书摘要字段重新做的 digest
```

如果 `packageDigest` 和 `verifiedPackageDigest` 相等，说明 certificate 引用的是一个已经被复核过的交接包。

## 3. 从 package 生成 certificate

文件：`src/services/opsPromotionArchiveBundle.ts`

入口函数只吃两个对象：一个是交接包，一个是交接包复核结果。

```ts
export function createOpsPromotionHandoffCertificate(input: {
  handoffPackage: OpsPromotionHandoffPackage;
  handoffPackageVerification: OpsPromotionHandoffPackageVerification;
}): OpsPromotionHandoffCertificate {
  const certificateName = `promotion-certificate-${input.handoffPackage.packageDigest.value.slice(0, 12)}`;
```

`certificateName` 用 package digest 前 12 位命名，和前几版的命名方式一致：人能扫一眼区分，机器还能用完整 digest 复核。

## 4. 附件有效性来自双重判断

文件：`src/services/opsPromotionArchiveBundle.ts`

V31 没有只相信 package 自己的 `attachment.valid`，而是同时查 verification 中同名附件是否也有效。

```ts
  const attachments = input.handoffPackage.attachments.map((attachment) => {
    const verificationAttachment = input.handoffPackageVerification.attachments.find((candidate) => candidate.name === attachment.name);

    return {
      name: attachment.name,
      valid: attachment.valid && verificationAttachment?.valid === true,
      source: attachment.source,
      digest: { ...attachment.digest },
    };
  });
```

这一句是 V31 的关键保护：

```ts
valid: attachment.valid && verificationAttachment?.valid === true,
```

意思是：package 附件说自己有效不够，verification 复核同名附件也必须有效。

## 5. verification 摘要只保留交接需要的信息

文件：`src/services/opsPromotionArchiveBundle.ts`

certificate 不再展开 V30 verification 的所有细项，只保留最适合交接记录阅读的四个字段。

```ts
  const verification = {
    packageVerified: input.handoffPackageVerification.valid,
    packageDigestValid: input.handoffPackageVerification.checks.packageDigestValid,
    attachmentsValid: input.handoffPackageVerification.checks.attachmentsValid,
    attachmentCount: attachments.length,
  };
```

这体现了 certificate 和 package 的边界：package 适合追细节，certificate 适合拿来做交接摘要。

## 6. valid 和 handoffReady 的收口

文件：`src/services/opsPromotionArchiveBundle.ts`

V31 的证书有效性要求三件事同时成立：

```ts
  const valid = input.handoffPackage.valid && input.handoffPackageVerification.valid && attachments.every((attachment) => attachment.valid);
  const handoffReady = valid && input.handoffPackage.handoffReady;
```

这意味着：

```text
handoffPackage.valid
 -> 包自身链路成立

handoffPackageVerification.valid
 -> V30 复核链路成立

attachments.every(valid)
 -> certificate 看到的所有附件也成立
```

只有这些都成立，`handoffReady` 才会继承 package 的 ready 状态。

## 7. certificateDigest 覆盖字段

文件：`src/services/opsPromotionArchiveBundle.ts`

V31 先构造稳定 payload，再用已有的 `digestStable` 生成 SHA-256。

```ts
  const digestPayload = archiveHandoffCertificateDigestPayload({
    certificateName,
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid,
    state: input.handoffPackage.state,
    handoffReady,
    packageDigest: input.handoffPackage.packageDigest.value,
    verifiedPackageDigest: input.handoffPackageVerification.recomputedPackageDigest.value,
    sealDigest: input.handoffPackage.sealDigest.value,
    decision,
    verification,
    attachments,
    nextActions,
  });
```

返回对象里公开 `coveredFields`，方便人直接知道这个 digest 到底覆盖了什么。

```ts
    certificateDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "attachments",
        "nextActions",
      ],
    },
```

这个字段列表很重要：之后如果交接记录里只保存 `certificateDigest`，仍然能知道 digest 是围绕哪些信息生成的。

## 8. digest payload 再压一层

文件：`src/services/opsPromotionArchiveBundle.ts`

`archiveHandoffCertificateDigestPayload` 没有把完整对象原样塞进 digest，而是把附件 digest 压成稳定的纯值。

```ts
function archiveHandoffCertificateDigestPayload(input: {
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffCertificate["decision"];
  verification: OpsPromotionHandoffCertificate["verification"];
  attachments: OpsPromotionHandoffCertificateAttachment[];
  nextActions: string[];
}) {
  return {
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    packageDigest: input.packageDigest,
    verifiedPackageDigest: input.verifiedPackageDigest,
    sealDigest: input.sealDigest,
    decision: input.decision,
    verification: input.verification,
    attachments: input.attachments.map((attachment) => ({
      name: attachment.name,
      valid: attachment.valid,
      source: attachment.source,
      digest: attachment.digest.value,
    })),
    nextActions: input.nextActions,
  };
}
```

这里选择 `digest: attachment.digest.value`，是为了让 certificate digest 关注附件摘要值本身，而不是重复嵌套 `{ algorithm, value }` 的展示结构。

## 9. nextActions 继承上游状态

文件：`src/services/opsPromotionArchiveBundle.ts`

证书的下一步动作分三种：

```ts
function archiveHandoffCertificateNextActions(
  handoffPackage: OpsPromotionHandoffPackage,
  handoffPackageVerification: OpsPromotionHandoffPackageVerification,
  valid: boolean,
): string[] {
  if (!handoffPackageVerification.valid) {
    return ["Resolve handoff package verification failures before issuing a promotion handoff certificate."];
  }

  if (!valid) {
    return ["Regenerate the handoff package before issuing a promotion handoff certificate."];
  }

  if (handoffPackage.handoffReady) {
    return ["Promotion handoff certificate is ready; share the certificate digest with the handoff record."];
  }

  return handoffPackageVerification.nextActions;
}
```

如果 package verification 已经失败，certificate 不会装作自己可以签发；如果 package 还没 ready，就继续透传 verification 的下一步。

## 10. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

V31 提供 JSON 和 Markdown 两种输出。Markdown 重点是给人工归档、截图、代码讲解使用。

```ts
export function renderOpsPromotionHandoffCertificateMarkdown(certificate: OpsPromotionHandoffCertificate): string {
  const lines = [
    "# Promotion handoff certificate",
    "",
    `- Service: ${certificate.service}`,
    `- Generated at: ${certificate.generatedAt}`,
    `- Certificate name: ${certificate.certificateName}`,
    `- Package name: ${certificate.packageName}`,
    `- Archive name: ${certificate.archiveName}`,
    `- State: ${certificate.state}`,
    `- Valid: ${certificate.valid}`,
    `- Handoff ready: ${certificate.handoffReady}`,
    `- Certificate digest: ${certificate.certificateDigest.algorithm}:${certificate.certificateDigest.value}`,
    `- Package digest: ${certificate.packageDigest.algorithm}:${certificate.packageDigest.value}`,
    `- Verified package digest: ${certificate.verifiedPackageDigest.algorithm}:${certificate.verifiedPackageDigest.value}`,
    `- Seal digest: ${certificate.sealDigest.algorithm}:${certificate.sealDigest.value}`,
    `- Covered fields: ${certificate.certificateDigest.coveredFields.join(", ")}`,
```

附件渲染复用独立 helper：

```ts
function renderHandoffCertificateAttachments(attachments: OpsPromotionHandoffCertificateAttachment[]): string[] {
  return attachments.flatMap((attachment) => [
    `### ${attachment.name}`,
    "",
    `- Valid: ${attachment.valid}`,
    `- Digest: ${attachment.digest.algorithm}:${attachment.digest.value}`,
    `- Source: ${attachment.source}`,
    "",
  ]);
}
```

所以 Markdown 里也能直接看到 `attestation-verification` 这类真实附件。

## 11. 路由层重新组装归档链路

文件：`src/routes/opsSummaryRoutes.ts`

新接口是：

```text
GET /api/v1/ops/promotion-archive/handoff-certificate
GET /api/v1/ops/promotion-archive/handoff-certificate?format=markdown
```

路由层先按顺序重建前几版对象。

```ts
  app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-certificate", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          format: { type: "string", enum: ["json", "markdown"] },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    const bundle = createPromotionArchiveBundle(deps);
    const manifest = createOpsPromotionArchiveManifest(bundle);
    const archiveVerification = createOpsPromotionArchiveVerification({ bundle, manifest });
    const attestation = createOpsPromotionArchiveAttestation({ bundle, manifest, verification: archiveVerification });
    const attestationVerification = createOpsPromotionArchiveAttestationVerification({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
    });
```

然后生成 package、verification、certificate。

```ts
    const handoffPackage = createOpsPromotionHandoffPackage({
      bundle,
      manifest,
      verification: archiveVerification,
      attestation,
      attestationVerification,
    });
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
```

最后根据 `format` 切 JSON 或 Markdown。

```ts
    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionHandoffCertificateMarkdown(certificate);
    }

    return certificate;
  });
```

这条路由只读本地内存状态，不会触碰 Java 或 mini-kv 的真实操作流程。

## 12. Dashboard 入口

文件：`src/ui/dashboard.ts`

按钮加在已有 promotion archive 工具区。

```html
        <button data-action="opsPromotionHandoffPackageVerification">Package Verification</button>
        <button data-action="opsPromotionHandoffPackageVerificationReport">Package Verification Report</button>
        <button data-action="opsPromotionHandoffCertificate">Handoff Certificate</button>
        <button data-action="opsPromotionHandoffCertificateReport">Handoff Certificate Report</button>
```

事件处理分别请求 JSON 和 Markdown。

```js
        if (action === "opsPromotionHandoffCertificate") {
          write(await api("/api/v1/ops/promotion-archive/handoff-certificate"));
        }
        if (action === "opsPromotionHandoffCertificateReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-certificate?format=markdown");
          if (!response.ok) {
            throw await response.json();
          }
          output.textContent = await response.text();
        }
```

这里也只是请求 Node 本地接口，不会绕去启动或打断另外两个项目。

## 13. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

V31 新增了 blocked 场景下的 certificate 测试。

```ts
  it("builds a promotion handoff certificate as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyCertificate = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/handoff-certificate",
      });
```

空 ledger 时也要求证书结构成立：

```ts
      expect(emptyCertificate.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          packageVerified: true,
          packageDigestValid: true,
          attachmentsValid: true,
          attachmentCount: 5,
        },
      });
```

写入一个 blocked decision 后，测试证书 digest、package digest、seal digest 和附件有效性。

```ts
      expect(certificate.json().certificateName).toMatch(/^promotion-certificate-[a-f0-9]{12}$/);
      expect(certificate.json().certificateDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(certificate.json().packageDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(certificate.json().verifiedPackageDigest.value).toBe(certificate.json().packageDigest.value);
      expect(certificate.json().sealDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(certificate.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
```

approved 大链路里也补了 ready 状态断言：

```ts
      expect(handoffCertificate.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
        },
        verification: {
          packageVerified: true,
          packageDigestValid: true,
          attachmentsValid: true,
          attachmentCount: 5,
        },
      });
```

最后确认 ready 场景的下一步动作已经收束成分享 certificate digest。

```ts
      expect(handoffCertificate.json().nextActions).toEqual([
        "Promotion handoff certificate is ready; share the certificate digest with the handoff record.",
      ]);
```

## 14. 一句话总结

V31 把 V30 的 verified handoff package 再压缩成 `handoff certificate`：既保留 package digest、verified package digest、seal digest 的可追溯性，又给交接记录提供了一个短而稳定的 `certificateDigest`。
