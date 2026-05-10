# V27：promotion archive attestation 代码讲解

V24 到 V26 已经形成了三层 archive 链路：

```text
archive bundle
 -> archive manifest
 -> archive verification
```

V27 在这条链路上增加 `attestation`：把 manifest digest、verification digest、latest decision、checks 和 evidence sources 合成一个最终 `sealDigest`。它的作用不是重新做业务判断，而是回答一个交接问题：

```text
这份 promotion archive 能不能作为 handoff 附件？
如果不能，下一步该补什么？
```

这一版仍然只处理 `orderops-node` 本地内存对象，不启动、不调用 Java 订单平台，也不访问 C++ mini-kv。

## 1. attestation 状态

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionArchiveAttestationState = "not-started" | "blocked" | "ready";
```

这里比 archive bundle 的状态更偏交接视角：

- `not-started`：还没有 promotion decision。
- `blocked`：已有 decision，但还不能交接。
- `ready`：archive verified，latest decision approved，可以把 seal digest 放进 handoff。

## 2. evidence source

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionArchiveAttestationEvidenceSource {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  present: boolean;
  verified: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}
```

这一段把 V25 manifest 的 artifact 信息和 V26 verification 的验证结果合并。`present` 来自 manifest，`verified` 来自 verification。

所以 attestation 不是只给一个总 seal，它还保留了每个证据来源：

```text
archive-summary
latest-evidence
ledger-integrity
```

## 3. attestation 总结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionArchiveAttestation {
  service: "orderops-node";
  generatedAt: string;
  title: string;
  archiveName: string;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
```

核心 digest 字段：

```ts
manifestDigest: {
  algorithm: "sha256";
  value: string;
};
verificationDigest: {
  algorithm: "sha256";
  value: string;
};
sealDigest: {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
};
```

这里有三个层级：

- `manifestDigest`：V25 归档清单指纹。
- `verificationDigest`：V26 复核结果指纹。
- `sealDigest`：V27 交接封印指纹。

## 4. decision 摘要

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
decision: {
  totalDecisions: number;
  latestDecisionId?: string;
  latestSequence?: number;
  latestOutcome?: OpsPromotionDecision;
  latestReadyForPromotion?: boolean;
  latestDigestValid?: boolean;
};
```

这部分只放 latest decision 的关键摘要。它不复制整份 review，而是保留交接判断最需要的字段：

- 最新 decision 是不是 `approved`。
- 最新 decision 是否 `readyForPromotion=true`。
- 最新 decision 的 digest 是否有效。

## 5. checks

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
checks: {
  manifestVerified: boolean;
  artifactsVerified: boolean;
  archiveReady: boolean;
  latestDecisionReady: boolean;
  integrityVerified: boolean;
};
```

这五项对应 handoff ready 的五个门：

- manifest 指纹能复核。
- artifact 指纹能复核。
- archive 三层状态都是 ready。
- 最新 decision 是 approved 且 digest 有效。
- ledger integrity 和 manifest / verification 里的 root digest 对得上。

## 6. 创建 attestation 的入口

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionArchiveAttestation(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
}): OpsPromotionArchiveAttestation {
  const verificationDigest = digestStable(archiveVerificationDigestPayload(input.verification));
```

输入明确来自前面三层对象。这样 V27 不需要再知道怎么生成 bundle，也不需要访问任何路由或外部服务。

## 7. verification digest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveVerificationDigestPayload(verification: OpsPromotionArchiveVerification) {
  return {
    archiveName: verification.archiveName,
    valid: verification.valid,
    state: verification.state,
    manifestDigest: verification.manifestDigest.value,
    recomputedManifestDigest: verification.recomputedManifestDigest.value,
    checks: verification.checks,
    summary: verification.summary,
```

artifact 部分也进入 verification digest：

```ts
artifacts: verification.artifacts.map((artifact) => ({
  name: artifact.name,
  type: artifact.type,
  valid: artifact.valid,
  presentMatches: artifact.presentMatches,
  sourceMatches: artifact.sourceMatches,
  digestMatches: artifact.digestMatches,
  manifestDigest: artifact.manifestDigest.value,
  recomputedDigest: artifact.recomputedDigest.value,
  source: artifact.source,
})),
```

也就是说，V27 的 `verificationDigest` 覆盖的是 V26 的验证结论，而不是只覆盖一个 `valid=true`。

## 8. evidence sources 如何生成

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const evidenceSources = input.manifest.artifacts.map((artifact) => {
  const verificationArtifact = input.verification.artifacts.find((candidate) => candidate.name === artifact.name);

  return {
    name: artifact.name,
    type: artifact.type,
    present: artifact.present,
    verified: verificationArtifact?.valid === true,
    source: artifact.source,
    digest: { ...artifact.digest },
  };
});
```

这里把 manifest 的 artifact 和 verification 的 artifact 按 `name` 合并。好处是 handoff 时既能看到 evidence 的来源 API，也能看到它是否被 V26 复核通过。

## 9. handoff ready 的五个 checks

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const checks = {
  manifestVerified: input.verification.checks.manifestDigestValid,
  artifactsVerified: input.verification.checks.artifactsValid,
  archiveReady: input.bundle.state === "ready" && input.manifest.state === "ready" && input.verification.state === "ready",
  latestDecisionReady: input.bundle.summary.latestOutcome === "approved"
    && input.bundle.summary.latestReadyForPromotion === true
    && input.bundle.summary.latestDigestValid === true,
```

`integrityVerified` 还会确认三个地方的 root digest 一致：

```ts
integrityVerified: input.bundle.summary.integrityValid
  && input.manifest.summary.integrityRootDigest === input.bundle.summary.integrityRootDigest
  && input.verification.summary.integrityRootDigest === input.bundle.summary.integrityRootDigest,
```

这能避免 manifest、verification 和 bundle 各自看起来正常，但指向的 ledger root 不是同一个。

## 10. state 和 handoffReady

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const handoffReady = input.verification.valid && Object.values(checks).every(Boolean);
const state = handoffReady ? "ready" : input.bundle.summary.totalDecisions === 0 ? "not-started" : "blocked";
```

这里的规则很直接：

- verification 必须整体有效。
- 五个 checks 必须全部为 true。
- 没有 decision 时是 `not-started`。
- 有 decision 但没满足条件时是 `blocked`。

## 11. seal digest 覆盖字段

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const sealPayload = archiveAttestationDigestPayload({
  archiveName: input.bundle.archiveName,
  state,
  handoffReady,
  manifestDigest: input.manifest.manifestDigest.value,
  verificationDigest,
  decision,
  checks,
  evidenceSources,
  nextActions,
});
```

返回时写明 covered fields：

```ts
sealDigest: {
  algorithm: "sha256",
  value: digestStable(sealPayload),
  coveredFields: [
    "archiveName",
    "state",
    "handoffReady",
    "manifestDigest",
    "verificationDigest",
    "decision",
    "checks",
    "evidenceSources",
    "nextActions",
  ],
},
```

这和前面的 manifest digest 一样，明确告诉使用者这个 seal 盖住了哪些字段。

## 12. attestation nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveAttestationNextActions(
  state: OpsPromotionArchiveAttestationState,
  checks: OpsPromotionArchiveAttestation["checks"],
  bundle: OpsPromotionArchiveBundle,
  verification: OpsPromotionArchiveVerification,
): string[] {
  if (!verification.valid) {
    return ["Resolve archive verification failures before issuing a promotion archive attestation."];
  }
```

没有 decision：

```ts
if (bundle.summary.totalDecisions === 0 || state === "not-started") {
  return ["Record an approved promotion decision before issuing a promotion archive attestation."];
}
```

latest decision 还没 ready：

```ts
if (!checks.latestDecisionReady) {
  return ["Complete readiness, runbook, and baseline requirements before recording an approved promotion decision."];
}
```

最终 ready：

```ts
return ["Archive attestation is ready; attach the seal digest to the promotion handoff record."];
```

## 13. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionArchiveAttestationMarkdown(attestation: OpsPromotionArchiveAttestation): string {
  const lines = [
    "# Promotion archive attestation",
    "",
    `- Service: ${attestation.service}`,
    `- Generated at: ${attestation.generatedAt}`,
    `- Title: ${attestation.title}`,
    `- Archive name: ${attestation.archiveName}`,
    `- State: ${attestation.state}`,
    `- Handoff ready: ${attestation.handoffReady}`,
```

Digest 区：

```ts
`- Manifest digest: ${attestation.manifestDigest.algorithm}:${attestation.manifestDigest.value}`,
`- Verification digest: ${attestation.verificationDigest.algorithm}:${attestation.verificationDigest.value}`,
`- Seal digest: ${attestation.sealDigest.algorithm}:${attestation.sealDigest.value}`,
`- Covered fields: ${attestation.sealDigest.coveredFields.join(", ")}`,
```

Evidence Sources 区：

```ts
"## Evidence Sources",
"",
...renderAttestationEvidenceSources(attestation.evidenceSources),
```

## 14. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/attestation", {
```

核心处理：

```ts
const bundle = createPromotionArchiveBundle(deps);
const manifest = createOpsPromotionArchiveManifest(bundle);
const verification = createOpsPromotionArchiveVerification({ bundle, manifest });
const attestation = createOpsPromotionArchiveAttestation({ bundle, manifest, verification });
```

Markdown 输出：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionArchiveAttestationMarkdown(attestation);
}

return attestation;
```

新增接口：

```text
GET /api/v1/ops/promotion-archive/attestation
GET /api/v1/ops/promotion-archive/attestation?format=markdown
```

## 15. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionArchiveAttestation">Archive Attestation</button>
<button data-action="opsPromotionArchiveAttestationReport">Attestation Report</button>
```

JSON：

```js
if (action === "opsPromotionArchiveAttestation") {
  write(await api("/api/v1/ops/promotion-archive/attestation"));
}
```

Markdown：

```js
if (action === "opsPromotionArchiveAttestationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/attestation?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

## 16. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

空 attestation：

```ts
expect(emptyAttestation.json()).toMatchObject({
  service: "orderops-node",
  state: "not-started",
  handoffReady: false,
  decision: {
    totalDecisions: 0,
  },
  checks: {
    manifestVerified: true,
    artifactsVerified: true,
    archiveReady: false,
    latestDecisionReady: false,
    integrityVerified: true,
  },
});
```

blocked decision：

```ts
expect(attestation.json()).toMatchObject({
  service: "orderops-node",
  state: "blocked",
  handoffReady: false,
  decision: {
    totalDecisions: 1,
    latestDecisionId: decision.json().id,
    latestSequence: 1,
    latestOutcome: "blocked",
    latestReadyForPromotion: false,
    latestDigestValid: true,
  },
});
```

ready decision：

```ts
expect(attestation.json()).toMatchObject({
  state: "ready",
  handoffReady: true,
  decision: {
    latestDecisionId: decision.json().id,
    latestOutcome: "approved",
    latestReadyForPromotion: true,
    latestDigestValid: true,
  },
});
```

Markdown：

```ts
expect(markdown.body).toContain("# Promotion archive attestation");
expect(markdown.body).toContain("- Handoff ready: false");
expect(markdown.body).toContain(`- Seal digest: sha256:${attestation.json().sealDigest.value}`);
expect(markdown.body).toContain("## Evidence Sources");
expect(markdown.body).toContain("### latest-evidence");
```

## 一句话总结

V27 把 V24-V26 的归档链路封成一个 promotion handoff seal：只有 archive verified、latest decision approved、ledger root 一致时，`handoffReady` 才会变成 `true`。
