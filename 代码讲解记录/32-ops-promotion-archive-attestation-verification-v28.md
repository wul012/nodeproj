# V28：promotion archive attestation verification 代码讲解

V27 生成了 `sealDigest`，把 manifest、verification、decision、checks 和 evidence sources 封成 promotion handoff seal。

V28 做的是下一步：复核这个 seal 本身是否可信。

```text
archive bundle
 -> archive manifest
 -> archive verification
 -> archive attestation
 -> archive attestation verification
```

这一版仍然只读取 `orderops-node` 本地内存状态，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. verification 总结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionArchiveAttestationVerification {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
```

这和 V26 的 archive verification 类似，但它复核的是 V27 的 attestation。

## 2. seal digest 和 verification digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
sealDigest: {
  algorithm: "sha256";
  value: string;
};
recomputedSealDigest: {
  algorithm: "sha256";
  value: string;
};
verificationDigest: {
  algorithm: "sha256";
  value: string;
};
recomputedVerificationDigest: {
  algorithm: "sha256";
  value: string;
};
```

这里有两组对比：

- `sealDigest` 对比 `recomputedSealDigest`：确认 attestation 自己的封印没有变。
- `verificationDigest` 对比 `recomputedVerificationDigest`：确认 attestation 引用的 V26 verification 仍然能按同一口径复算。

## 3. checks

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
checks: {
  sealDigestValid: boolean;
  verificationDigestValid: boolean;
  manifestDigestMatches: boolean;
  archiveNameMatches: boolean;
  stateMatches: boolean;
  handoffReadyMatches: boolean;
  decisionMatches: boolean;
  checksMatch: boolean;
  evidenceSourcesMatch: boolean;
  nextActionsMatch: boolean;
};
```

V28 不只检查 digest，还检查 attestation 的关键字段是否和“当前重新生成的 attestation”一致：

- archive name 是否一致。
- state 是否一致。
- handoffReady 是否一致。
- decision 摘要是否一致。
- checks 是否一致。
- evidence sources 是否一致。
- nextActions 是否一致。

## 4. 创建 verification 的入口

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionArchiveAttestationVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
}): OpsPromotionArchiveAttestationVerification {
```

输入是 V24 到 V27 的四个对象。这样 verification 本身不访问 HTTP，也不需要知道对象从哪里来。

## 5. 先重新生成 expected attestation

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const expectedAttestation = createOpsPromotionArchiveAttestation({
  bundle: input.bundle,
  manifest: input.manifest,
  verification: input.verification,
});
```

这个 expected attestation 是“按当前对象重新生成的一份标准答案”。后面所有字段对比都围绕它展开。

## 6. 复算 verification digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const recomputedVerificationDigest = digestStable(archiveVerificationDigestPayload(input.verification));
```

这里复用 V27 的 `archiveVerificationDigestPayload`。它覆盖 V26 verification 的 archive name、valid、state、checks、summary 和 artifacts。

## 7. 复算 seal digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const recomputedSealDigest = digestStable(archiveAttestationDigestPayload({
  archiveName: input.attestation.archiveName,
  state: input.attestation.state,
  handoffReady: input.attestation.handoffReady,
  manifestDigest: input.attestation.manifestDigest.value,
  verificationDigest: input.attestation.verificationDigest.value,
  decision: input.attestation.decision,
  checks: input.attestation.checks,
  evidenceSources: input.attestation.evidenceSources,
  nextActions: input.attestation.nextActions,
}));
```

注意这里复算的是 `input.attestation` 自己携带的字段。也就是说，如果 seal 里的某个字段被改了，而 `sealDigest` 没跟着改，`sealDigestValid` 会失败。

## 8. 字段对比 checks

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const checks = {
  sealDigestValid: input.attestation.sealDigest.value === recomputedSealDigest,
  verificationDigestValid: input.attestation.verificationDigest.value === recomputedVerificationDigest,
  manifestDigestMatches: input.attestation.manifestDigest.value === input.manifest.manifestDigest.value,
  archiveNameMatches: input.attestation.archiveName === expectedAttestation.archiveName,
  stateMatches: input.attestation.state === expectedAttestation.state,
  handoffReadyMatches: input.attestation.handoffReady === expectedAttestation.handoffReady,
```

对象字段使用 `stableJson` 做确定性比较：

```ts
decisionMatches: stableJson(input.attestation.decision) === stableJson(expectedAttestation.decision),
checksMatch: stableJson(input.attestation.checks) === stableJson(expectedAttestation.checks),
evidenceSourcesMatch: stableJson(input.attestation.evidenceSources) === stableJson(expectedAttestation.evidenceSources),
nextActionsMatch: stableJson(input.attestation.nextActions) === stableJson(expectedAttestation.nextActions),
```

这样避免对象 key 顺序影响对比结果。

## 9. 总 valid

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const valid = Object.values(checks).every(Boolean);
```

V28 的 `valid=true` 意味着：

- seal digest 自洽。
- verification digest 自洽。
- attestation 和当前 bundle / manifest / verification 重新生成结果一致。

## 10. 返回摘要

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
summary: {
  totalDecisions: input.attestation.decision.totalDecisions,
  latestDecisionId: input.attestation.decision.latestDecisionId,
  evidenceSourceCount: input.attestation.evidenceSources.length,
  handoffReady: input.attestation.handoffReady,
},
```

摘要里保留最方便看状态的字段：decision 数量、最新 decision id、证据源数量、handoffReady。

## 11. verification nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveAttestationVerificationNextActions(
  checks: OpsPromotionArchiveAttestationVerification["checks"],
  attestation: OpsPromotionArchiveAttestation,
): string[] {
  if (!checks.sealDigestValid) {
    return ["Regenerate the archive attestation before trusting this seal digest."];
  }
```

verification digest 不一致：

```ts
if (!checks.verificationDigestValid) {
  return ["Rebuild archive verification before trusting this attestation seal."];
}
```

字段和 expected attestation 不一致：

```ts
if (!checks.manifestDigestMatches || !checks.decisionMatches || !checks.checksMatch || !checks.evidenceSourcesMatch) {
  return ["Recreate the archive attestation from the latest bundle, manifest, and verification objects."];
}
```

ready 状态：

```ts
if (attestation.handoffReady) {
  return ["Attestation verification is complete; keep the verified seal digest with the promotion handoff record."];
}
```

否则沿用 attestation 的 next actions：

```ts
return attestation.nextActions;
```

## 12. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionArchiveAttestationVerificationMarkdown(
  verification: OpsPromotionArchiveAttestationVerification,
): string {
  const lines = [
    "# Promotion archive attestation verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
```

Digest 区：

```ts
`- Seal digest: ${verification.sealDigest.algorithm}:${verification.sealDigest.value}`,
`- Recomputed seal digest: ${verification.recomputedSealDigest.algorithm}:${verification.recomputedSealDigest.value}`,
`- Verification digest: ${verification.verificationDigest.algorithm}:${verification.verificationDigest.value}`,
`- Recomputed verification digest: ${verification.recomputedVerificationDigest.algorithm}:${verification.recomputedVerificationDigest.value}`,
```

Checks 区：

```ts
"## Checks",
"",
`- Seal digest valid: ${verification.checks.sealDigestValid}`,
`- Verification digest valid: ${verification.checks.verificationDigestValid}`,
`- Manifest digest matches: ${verification.checks.manifestDigestMatches}`,
`- Archive name matches: ${verification.checks.archiveNameMatches}`,
```

## 13. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/attestation/verification", {
```

核心创建链路：

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
```

Markdown 输出：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionArchiveAttestationVerificationMarkdown(attestationVerification);
}

return attestationVerification;
```

新增接口：

```text
GET /api/v1/ops/promotion-archive/attestation/verification
GET /api/v1/ops/promotion-archive/attestation/verification?format=markdown
```

## 14. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionArchiveAttestationVerification">Attestation Verification</button>
<button data-action="opsPromotionArchiveAttestationVerificationReport">Attestation Verification Report</button>
```

JSON：

```js
if (action === "opsPromotionArchiveAttestationVerification") {
  write(await api("/api/v1/ops/promotion-archive/attestation/verification"));
}
```

Markdown：

```js
if (action === "opsPromotionArchiveAttestationVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/attestation/verification?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

## 15. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

空态 verification：

```ts
expect(emptyVerification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  checks: {
    sealDigestValid: true,
    verificationDigestValid: true,
    manifestDigestMatches: true,
    archiveNameMatches: true,
    stateMatches: true,
    handoffReadyMatches: true,
    decisionMatches: true,
    checksMatch: true,
    evidenceSourcesMatch: true,
    nextActionsMatch: true,
  },
});
```

blocked decision 后：

```ts
expect(attestationVerification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "blocked",
  handoffReady: false,
  summary: {
    totalDecisions: 1,
    latestDecisionId: decision.json().id,
    evidenceSourceCount: 3,
    handoffReady: false,
  },
});
```

digest 复核：

```ts
expect(attestationVerification.json().sealDigest.value).toBe(attestationVerification.json().recomputedSealDigest.value);
expect(attestationVerification.json().verificationDigest.value).toBe(attestationVerification.json().recomputedVerificationDigest.value);
```

ready 状态：

```ts
expect(attestationVerification.json()).toMatchObject({
  valid: true,
  state: "ready",
  handoffReady: true,
});
```

Markdown：

```ts
expect(markdown.body).toContain("# Promotion archive attestation verification");
expect(markdown.body).toContain("- Valid: true");
expect(markdown.body).toContain("## Checks");
expect(markdown.body).toContain("## Summary");
```

## 一句话总结

V28 让 V27 的 handoff seal 从“能生成”升级成“能复核”：`sealDigest`、`verificationDigest` 和 attestation 关键字段都能重新检查。
