# V30：promotion handoff package verification 代码讲解

V29 已经把 V24-V28 的归档链路汇总成 `handoff package`。V30 做的是最终复核：重新计算 `packageDigest`，逐个复核五个 attachment 的 digest、source、valid 状态。

完整链路现在是：

```text
archive bundle
 -> archive manifest
 -> archive verification
 -> archive attestation
 -> attestation verification
 -> handoff package
 -> handoff package verification
```

这一版仍然只读取 `orderops-node` 本地内存状态，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. attachment verification

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionHandoffPackageVerificationAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
```

每个 package attachment 都拆成三项：

- `validMatches`：package 里记录的 valid 是否和当前重新生成的 attachment 一致。
- `sourceMatches`：source API 是否一致。
- `digestMatches`：package 里的 digest 是否等于重新计算结果。

## 2. attachment digest 对比字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
packageDigest: {
  algorithm: "sha256";
  value: string;
};
recomputedDigest: {
  algorithm: "sha256";
  value: string;
};
source: string;
```

这里的 `packageDigest` 是 V29 package 里携带的附件 digest，`recomputedDigest` 是 V30 根据当前归档链路重新生成的 expected attachment digest。

## 3. package verification 总结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionHandoffPackageVerification {
  service: "orderops-node";
  generatedAt: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
```

它对应 V29 的 `OpsPromotionHandoffPackage`，但多了复核字段。

## 4. package digest 复核

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
packageDigest: {
  algorithm: "sha256";
  value: string;
};
recomputedPackageDigest: {
  algorithm: "sha256";
  value: string;
};
```

V30 会确认：

```text
packageDigest.value == recomputedPackageDigest.value
```

这代表 handoff package 自己的索引内容没有被改过。

## 5. checks

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
checks: {
  packageDigestValid: boolean;
  attachmentsValid: boolean;
  packageNameMatches: boolean;
  archiveNameMatches: boolean;
  validMatches: boolean;
  stateMatches: boolean;
  handoffReadyMatches: boolean;
  sealDigestMatches: boolean;
  manifestDigestMatches: boolean;
  verificationDigestMatches: boolean;
  summaryMatches: boolean;
  nextActionsMatch: boolean;
};
```

这些 checks 分成三类：

- package 自身 digest 是否自洽。
- 五个附件是否都匹配。
- package 的关键字段是否和当前重新生成的 expected package 一致。

## 6. 创建 verification 的入口

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionHandoffPackageVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
  handoffPackage: OpsPromotionHandoffPackage;
}): OpsPromotionHandoffPackageVerification {
```

输入是 V24 到 V29 的所有对象。函数本身不访问 HTTP，不访问上游，只对对象做复核。

## 7. expected package

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const expectedPackage = createOpsPromotionHandoffPackage({
  bundle: input.bundle,
  manifest: input.manifest,
  verification: input.verification,
  attestation: input.attestation,
  attestationVerification: input.attestationVerification,
});
```

V30 先重新生成一份 expected package，作为后续字段对比的标准答案。

## 8. 复算 package digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const recomputedPackageDigest = digestStable(archiveHandoffPackageDigestPayload({
  packageName: input.handoffPackage.packageName,
  archiveName: input.handoffPackage.archiveName,
  valid: input.handoffPackage.valid,
  state: input.handoffPackage.state,
  handoffReady: input.handoffPackage.handoffReady,
  sealDigest: input.handoffPackage.sealDigest.value,
  manifestDigest: input.handoffPackage.manifestDigest.value,
  verificationDigest: input.handoffPackage.verificationDigest.value,
  summary: input.handoffPackage.summary,
  attachments: input.handoffPackage.attachments,
  nextActions: input.handoffPackage.nextActions,
}));
```

注意这里复算的是 `input.handoffPackage` 自身携带的字段。如果 package 内容被改了，但 packageDigest 没变，这里会失败。

## 9. 逐个复核 attachments

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const attachmentChecks = input.handoffPackage.attachments.map((attachment) => {
  const expected = expectedPackage.attachments.find((candidate) => candidate.name === attachment.name);
  const validMatches = expected?.valid === attachment.valid;
  const sourceMatches = expected?.source === attachment.source;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: attachment.name }) };
  const digestMatches = attachment.digest.value === expectedDigest.value;
```

这里用 attachment `name` 去 expected package 里找对应项，然后分别比较 valid、source、digest。

返回单项结果：

```ts
return {
  name: attachment.name,
  valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
  validMatches,
  sourceMatches,
  digestMatches,
  packageDigest: { ...attachment.digest },
  recomputedDigest: expectedDigest,
  source: attachment.source,
};
```

## 10. 总 checks

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const checks = {
  packageDigestValid: input.handoffPackage.packageDigest.value === recomputedPackageDigest,
  attachmentsValid: attachmentChecks.length === expectedPackage.attachments.length
    && attachmentChecks.every((attachment) => attachment.valid),
  packageNameMatches: input.handoffPackage.packageName === expectedPackage.packageName,
  archiveNameMatches: input.handoffPackage.archiveName === expectedPackage.archiveName,
  validMatches: input.handoffPackage.valid === expectedPackage.valid,
```

digest 字段：

```ts
sealDigestMatches: input.handoffPackage.sealDigest.value === expectedPackage.sealDigest.value,
manifestDigestMatches: input.handoffPackage.manifestDigest.value === expectedPackage.manifestDigest.value,
verificationDigestMatches: input.handoffPackage.verificationDigest.value === expectedPackage.verificationDigest.value,
```

对象字段：

```ts
summaryMatches: stableJson(input.handoffPackage.summary) === stableJson(expectedPackage.summary),
nextActionsMatch: stableJson(input.handoffPackage.nextActions) === stableJson(expectedPackage.nextActions),
```

## 11. 总 valid

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const valid = Object.values(checks).every(Boolean);
```

V30 的 `valid=true` 代表：

- package digest 能复算。
- 五个 attachment 都能复核。
- package 的状态、digest、summary、nextActions 都和当前 archive chain 重新生成结果一致。

## 12. nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveHandoffPackageVerificationNextActions(
  checks: OpsPromotionHandoffPackageVerification["checks"],
  handoffPackage: OpsPromotionHandoffPackage,
): string[] {
  if (!checks.packageDigestValid) {
    return ["Regenerate the handoff package before trusting this package digest."];
  }
```

附件失败：

```ts
if (!checks.attachmentsValid) {
  return ["Review handoff package attachments before sharing the promotion handoff package."];
}
```

ready 状态：

```ts
if (handoffPackage.handoffReady) {
  return ["Handoff package verification is complete; share the verified package digest with the promotion handoff record."];
}
```

否则沿用 package 自己的 next actions：

```ts
return handoffPackage.nextActions;
```

## 13. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionHandoffPackageVerificationMarkdown(
  verification: OpsPromotionHandoffPackageVerification,
): string {
  const lines = [
    "# Promotion handoff package verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
```

digest 区：

```ts
`- Package digest: ${verification.packageDigest.algorithm}:${verification.packageDigest.value}`,
`- Recomputed package digest: ${verification.recomputedPackageDigest.algorithm}:${verification.recomputedPackageDigest.value}`,
```

attachments 区：

```ts
"## Attachments",
"",
...renderHandoffPackageVerificationAttachments(verification.attachments),
```

## 14. attachment Markdown

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function renderHandoffPackageVerificationAttachments(attachments: OpsPromotionHandoffPackageVerificationAttachment[]): string[] {
  return attachments.flatMap((attachment) => [
    `### ${attachment.name}`,
    "",
    `- Valid: ${attachment.valid}`,
    `- Valid matches: ${attachment.validMatches}`,
    `- Source matches: ${attachment.sourceMatches}`,
    `- Digest matches: ${attachment.digestMatches}`,
    `- Package digest: ${attachment.packageDigest.algorithm}:${attachment.packageDigest.value}`,
    `- Recomputed digest: ${attachment.recomputedDigest.algorithm}:${attachment.recomputedDigest.value}`,
    `- Source: ${attachment.source}`,
    "",
  ]);
}
```

这让你能直接看到是哪个 attachment 的 valid、source 或 digest 不匹配。

## 15. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-package/verification", {
```

核心链路：

```ts
const handoffPackageVerification = createOpsPromotionHandoffPackageVerification({
  bundle,
  manifest,
  verification: archiveVerification,
  attestation,
  attestationVerification,
  handoffPackage,
});
```

新增接口：

```text
GET /api/v1/ops/promotion-archive/handoff-package/verification
GET /api/v1/ops/promotion-archive/handoff-package/verification?format=markdown
```

## 16. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionHandoffPackageVerification">Package Verification</button>
<button data-action="opsPromotionHandoffPackageVerificationReport">Package Verification Report</button>
```

JSON：

```js
if (action === "opsPromotionHandoffPackageVerification") {
  write(await api("/api/v1/ops/promotion-archive/handoff-package/verification"));
}
```

Markdown：

```js
if (action === "opsPromotionHandoffPackageVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/handoff-package/verification?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

## 17. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

空态 verification：

```ts
expect(emptyVerification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  checks: {
    packageDigestValid: true,
    attachmentsValid: true,
    packageNameMatches: true,
```

digest 复核：

```ts
expect(emptyVerification.json().packageDigest.value).toBe(emptyVerification.json().recomputedPackageDigest.value);
```

blocked decision 后：

```ts
expect(verification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "blocked",
  handoffReady: false,
  summary: {
    totalDecisions: 1,
    latestDecisionId: decision.json().id,
    attachmentCount: 5,
    handoffReady: false,
  },
});
```

attachment 复核：

```ts
expect(verification.json().attachments.every((attachment: { valid: boolean }) => attachment.valid)).toBe(true);
expect(verification.json().attachments.every((attachment: { digestMatches: boolean }) => attachment.digestMatches)).toBe(true);
```

ready 状态：

```ts
expect(handoffPackageVerification.json()).toMatchObject({
  valid: true,
  state: "ready",
  handoffReady: true,
});
```

## 一句话总结

V30 让 V29 的 handoff package 从“能生成”升级成“能复核”：`packageDigest`、五个 attachment digest、summary 和 nextActions 都能重新检查。
