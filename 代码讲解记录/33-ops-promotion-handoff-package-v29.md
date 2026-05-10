# V29：promotion handoff package 代码讲解

V28 已经能复核 V27 的 handoff seal。V29 再向前走一步：把 V24 到 V28 的结果汇总成一个最终交接包索引。

完整链路变成：

```text
archive bundle
 -> archive manifest
 -> archive verification
 -> archive attestation
 -> attestation verification
 -> handoff package
```

V29 的目标不是复制所有大对象，而是给 handoff 场景提供一个轻量索引：

- 交接包叫什么。
- package digest 是多少。
- verified seal digest 是多少。
- 里面有哪些附件。
- 每个附件的 digest、source、valid 是什么。
- 当前是否 handoffReady。

这一版仍然只读取 `orderops-node` 本地内存状态，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. package attachment 名字

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionHandoffPackageAttachmentName =
  | "archive-bundle"
  | "archive-manifest"
  | "archive-verification"
  | "archive-attestation"
  | "attestation-verification";
```

这里把归档链路的五个阶段都变成 handoff package 的附件。

## 2. attachment 结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionHandoffPackageAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}
```

每个附件都保留三类关键交接信息：

- `valid`：这个附件当前是否可用。
- `source`：可以通过哪个 API 重新取到。
- `digest`：这个附件自己的 SHA-256 指纹。

## 3. handoff package 总结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionHandoffPackage {
  service: "orderops-node";
  generatedAt: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
```

这里的 `valid` 和 `handoffReady` 不完全一样：

- `valid=true` 表示 package 本身和附件 digest 都是自洽的。
- `handoffReady=true` 表示它可以作为 promotion handoff 附件交出去。

blocked 状态下，package 可以 `valid=true`，但 `handoffReady=false`。

## 4. package digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
packageDigest: {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
};
```

V29 新增的 `packageDigest` 是交接包自己的指纹。它不是替代 V27 的 `sealDigest`，而是给整份 package index 再盖一层摘要。

## 5. seal、manifest、verification digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
sealDigest: {
  algorithm: "sha256";
  value: string;
};
manifestDigest: {
  algorithm: "sha256";
  value: string;
};
verificationDigest: {
  algorithm: "sha256";
  value: string;
};
```

这三个 digest 是 package 最重要的索引字段：

- `sealDigest`：V27 attestation 的 seal。
- `manifestDigest`：V25 manifest 的 fingerprint。
- `verificationDigest`：V26 verification 的 digest。

## 6. 创建 handoff package 的入口

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionHandoffPackage(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
}): OpsPromotionHandoffPackage {
```

输入是 V24-V28 的五个对象。这样 handoff package 不需要知道这些对象如何生成，也不会访问外部服务。

## 7. 先生成 attachments

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const attachments = archiveHandoffPackageAttachments(input);
const valid = input.attestationVerification.valid && attachments.every((attachment) => attachment.valid);
const nextActions = archiveHandoffPackageNextActions(input.attestation, input.attestationVerification);
const packageName = `promotion-handoff-${input.attestation.sealDigest.value.slice(0, 12)}`;
```

`packageName` 用 seal digest 的前 12 位生成。这样只要 seal 变化，package 名称也会跟着变化。

## 8. package digest payload

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const digestPayload = archiveHandoffPackageDigestPayload({
  packageName,
  archiveName: input.bundle.archiveName,
  valid,
  state: input.attestation.state,
  handoffReady: input.attestation.handoffReady,
  sealDigest: input.attestation.sealDigest.value,
  manifestDigest: input.manifest.manifestDigest.value,
  verificationDigest: input.attestation.verificationDigest.value,
```

摘要和附件也进入 digest：

```ts
summary: {
  totalDecisions: input.bundle.summary.totalDecisions,
  latestDecisionId: input.bundle.summary.latestDecisionId,
  latestOutcome: input.bundle.summary.latestOutcome,
  evidenceSourceCount: input.attestation.evidenceSources.length,
  attachmentCount: attachments.length,
},
attachments,
nextActions,
```

这保证 package digest 覆盖的不只是 seal，还包括 package 的索引结构。

## 9. covered fields

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
packageDigest: {
  algorithm: "sha256",
  value: digestStable(digestPayload),
  coveredFields: [
    "packageName",
    "archiveName",
    "valid",
    "state",
    "handoffReady",
    "sealDigest",
    "manifestDigest",
    "verificationDigest",
    "summary",
    "attachments",
    "nextActions",
  ],
},
```

和前面的 manifest / attestation 一样，V29 明确写出 package digest 覆盖字段，方便后面审查。

## 10. archive bundle attachment

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
{
  name: "archive-bundle",
  valid: input.bundle.summary.integrityValid,
  source: "/api/v1/ops/promotion-archive",
  digest: {
    algorithm: "sha256",
    value: digestStable(archiveBundleDigestPayload(input.bundle)),
  },
},
```

bundle 本身没有现成 digest，所以 V29 新增 `archiveBundleDigestPayload` 计算。

## 11. archive manifest attachment

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
{
  name: "archive-manifest",
  valid: input.verification.checks.manifestDigestValid,
  source: "/api/v1/ops/promotion-archive/manifest",
  digest: { ...input.manifest.manifestDigest },
},
```

manifest 的 digest 直接复用 V25 的 `manifestDigest`。

## 12. archive verification attachment

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
{
  name: "archive-verification",
  valid: input.verification.valid,
  source: "/api/v1/ops/promotion-archive/verification",
  digest: {
    algorithm: "sha256",
    value: input.attestation.verificationDigest.value,
  },
},
```

verification 的 digest 复用 V27 attestation 里记录的 `verificationDigest`。

## 13. archive attestation attachment

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
{
  name: "archive-attestation",
  valid: input.attestationVerification.checks.sealDigestValid,
  source: "/api/v1/ops/promotion-archive/attestation",
  digest: {
    algorithm: "sha256",
    value: input.attestation.sealDigest.value,
  },
},
```

attestation 的附件 digest 就是 V27 的 `sealDigest`。

## 14. attestation verification attachment

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
{
  name: "attestation-verification",
  valid: input.attestationVerification.valid,
  source: "/api/v1/ops/promotion-archive/attestation/verification",
  digest: {
    algorithm: "sha256",
    value: digestStable(archiveAttestationVerificationDigestPayload(input.attestationVerification)),
  },
},
```

V28 verification 自己也作为一个附件进入 package。这样交接包能证明 seal 已经过本地复核。

## 15. handoff package nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveHandoffPackageNextActions(
  attestation: OpsPromotionArchiveAttestation,
  attestationVerification: OpsPromotionArchiveAttestationVerification,
): string[] {
  if (!attestationVerification.valid) {
    return ["Resolve attestation verification failures before sharing the promotion handoff package."];
  }
```

ready 状态：

```ts
if (attestation.handoffReady) {
  return ["Handoff package is ready; share the package digest and verified seal digest with the promotion handoff record."];
}
```

否则沿用 attestation verification 的 next actions：

```ts
return attestationVerification.nextActions;
```

## 16. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionHandoffPackageMarkdown(pkg: OpsPromotionHandoffPackage): string {
  const lines = [
    "# Promotion handoff package",
    "",
    `- Service: ${pkg.service}`,
    `- Generated at: ${pkg.generatedAt}`,
    `- Package name: ${pkg.packageName}`,
    `- Archive name: ${pkg.archiveName}`,
    `- State: ${pkg.state}`,
    `- Valid: ${pkg.valid}`,
    `- Handoff ready: ${pkg.handoffReady}`,
```

Digest 区：

```ts
`- Package digest: ${pkg.packageDigest.algorithm}:${pkg.packageDigest.value}`,
`- Seal digest: ${pkg.sealDigest.algorithm}:${pkg.sealDigest.value}`,
`- Manifest digest: ${pkg.manifestDigest.algorithm}:${pkg.manifestDigest.value}`,
`- Verification digest: ${pkg.verificationDigest.algorithm}:${pkg.verificationDigest.value}`,
```

附件区：

```ts
"## Attachments",
"",
...renderHandoffPackageAttachments(pkg.attachments),
```

## 17. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-package", {
```

核心链路：

```ts
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
const handoffPackage = createOpsPromotionHandoffPackage({
  bundle,
  manifest,
  verification: archiveVerification,
  attestation,
  attestationVerification,
});
```

新增接口：

```text
GET /api/v1/ops/promotion-archive/handoff-package
GET /api/v1/ops/promotion-archive/handoff-package?format=markdown
```

## 18. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionHandoffPackage">Handoff Package</button>
<button data-action="opsPromotionHandoffPackageReport">Handoff Package Report</button>
```

JSON：

```js
if (action === "opsPromotionHandoffPackage") {
  write(await api("/api/v1/ops/promotion-archive/handoff-package"));
}
```

Markdown：

```js
if (action === "opsPromotionHandoffPackageReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/handoff-package?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

## 19. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

空 package：

```ts
expect(emptyPackage.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  summary: {
    totalDecisions: 0,
    evidenceSourceCount: 3,
    attachmentCount: 5,
  },
});
```

blocked decision 后：

```ts
expect(handoffPackage.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "blocked",
  handoffReady: false,
  summary: {
    totalDecisions: 1,
    latestDecisionId: decision.json().id,
    latestOutcome: "blocked",
    evidenceSourceCount: 3,
    attachmentCount: 5,
  },
});
```

附件名称：

```ts
expect(emptyPackage.json().attachments.map((attachment: { name: string }) => attachment.name)).toEqual([
  "archive-bundle",
  "archive-manifest",
  "archive-verification",
  "archive-attestation",
  "attestation-verification",
]);
```

ready 状态：

```ts
expect(handoffPackage.json()).toMatchObject({
  valid: true,
  state: "ready",
  handoffReady: true,
});
```

Markdown：

```ts
expect(markdown.body).toContain("# Promotion handoff package");
expect(markdown.body).toContain("- Handoff ready: false");
expect(markdown.body).toContain("## Attachments");
expect(markdown.body).toContain("### attestation-verification");
```

## 一句话总结

V29 把 V24-V28 的归档和复核结果汇总成一个 promotion handoff package：交接时既能看 package digest，也能看到每个附件的 digest、source 和 valid 状态。
