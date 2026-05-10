# V26：promotion archive verification 代码讲解

V25 已经给 archive bundle 生成 manifest 和 SHA-256 指纹。V26 在它上面补 verification：重新复核 manifest digest、artifact digest、archive name、state、summary 和 next actions 是否仍然一致。

这一版仍然只读取 `orderops-node` 本地内存状态，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. verification artifact

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionArchiveVerificationArtifact {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  valid: boolean;
  presentMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  manifestDigest: {
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

每个 artifact 不只给一个 `valid`，还拆成三项：

- `presentMatches`：manifest 里说存在/不存在，是否和当前 bundle 一致。
- `sourceMatches`：source API 是否一致。
- `digestMatches`：manifest 里的 digest 是否等于重新计算 digest。

## 2. archive verification 总结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionArchiveVerification {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveState;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedManifestDigest: {
    algorithm: "sha256";
    value: string;
  };
```

后半部分是 checks：

```ts
checks: {
  manifestDigestValid: boolean;
  artifactsValid: boolean;
  archiveNameMatches: boolean;
  stateMatches: boolean;
  summaryMatches: boolean;
  nextActionsMatch: boolean;
};
```

这里把总体验证拆成多个维度。最终 `valid` 必须所有检查都通过。

## 3. 创建 verification 的入口

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionArchiveVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
}): OpsPromotionArchiveVerification {
  const expectedArtifacts = archiveArtifacts(input.bundle);
```

输入是当前 bundle 和当前 manifest。它不会自己访问 HTTP，也不会调用 Java / mini-kv。它只对内存对象做复核。

## 4. 每个 artifact 如何复核

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const artifactChecks = input.manifest.artifacts.map((artifact) => {
  const expected = expectedArtifacts.find((candidate) => candidate.name === artifact.name);
  const presentMatches = expected?.present === artifact.present;
  const sourceMatches = expected?.source === artifact.source;
  const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: artifact.name }) };
  const digestMatches = artifact.digest.value === expectedDigest.value;
```

这一段先从当前 bundle 重新生成一份 expected artifacts，然后和 manifest 里的 artifacts 对比。

返回单项结果：

```ts
return {
  name: artifact.name,
  type: artifact.type,
  valid: expected !== undefined && presentMatches && sourceMatches && digestMatches,
  presentMatches,
  sourceMatches,
  digestMatches,
  manifestDigest: { ...artifact.digest },
  recomputedDigest: expectedDigest,
  source: artifact.source,
};
```

如果某个 artifact 名字不存在于当前 bundle，`expected` 就是 `undefined`，这一项会失败。

## 5. manifest digest 如何复算

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const recomputedManifestDigest = digestStable(manifestDigestPayload(input.manifest));
```

V25 创建 manifest 时，也用了 `manifestDigestPayload`：

```ts
const manifestPayload = manifestDigestPayload({
  archiveName: bundle.archiveName,
  state: bundle.state,
  summary: bundle.summary,
  artifacts,
  nextActions: bundle.nextActions,
});
```

V26 复核时复用同一个 payload 规则，所以 digest 口径一致。

## 6. 总 checks

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const archiveNameMatches = input.manifest.archiveName === input.bundle.archiveName;
const stateMatches = input.manifest.state === input.bundle.state;
const summaryMatches = stableJson(input.manifest.summary) === stableJson(input.bundle.summary);
const nextActionsMatch = stableJson(input.manifest.nextActions) === stableJson(input.bundle.nextActions);
const manifestDigestValid = input.manifest.manifestDigest.value === recomputedManifestDigest;
const artifactsValid = artifactChecks.length === expectedArtifacts.length && artifactChecks.every((artifact) => artifact.valid);
```

这里有两个细节：

- `summaryMatches` 和 `nextActionsMatch` 用 `stableJson`，避免对象 key 顺序影响对比。
- `artifactsValid` 还要求数量一致，避免 manifest 少报或多报 artifact。

最终返回：

```ts
valid: manifestDigestValid && artifactsValid && archiveNameMatches && stateMatches && summaryMatches && nextActionsMatch,
```

## 7. verification nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveVerificationNextActions(
  manifestDigestValid: boolean,
  artifactsValid: boolean,
  manifest: OpsPromotionArchiveManifest,
): string[] {
  if (!manifestDigestValid) {
    return ["Regenerate the archive manifest before trusting this archive fingerprint."];
  }
```

artifact 失败：

```ts
if (!artifactsValid) {
  return ["Review archive manifest artifacts before attaching this archive to a handoff record."];
}
```

ready 状态：

```ts
if (manifest.state === "ready") {
  return ["Archive manifest is verified; keep the manifest digest with the promotion handoff record."];
}
```

否则沿用 manifest 自己的 next actions：

```ts
return manifest.nextActions;
```

## 8. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionArchiveVerificationMarkdown(verification: OpsPromotionArchiveVerification): string {
  const lines = [
    "# Promotion archive verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Valid: ${verification.valid}`,
    `- Manifest digest: ${verification.manifestDigest.algorithm}:${verification.manifestDigest.value}`,
    `- Recomputed manifest digest: ${verification.recomputedManifestDigest.algorithm}:${verification.recomputedManifestDigest.value}`,
```

Checks 区：

```ts
"## Checks",
"",
`- Manifest digest valid: ${verification.checks.manifestDigestValid}`,
`- Artifacts valid: ${verification.checks.artifactsValid}`,
`- Archive name matches: ${verification.checks.archiveNameMatches}`,
`- State matches: ${verification.checks.stateMatches}`,
`- Summary matches: ${verification.checks.summaryMatches}`,
`- Next actions match: ${verification.checks.nextActionsMatch}`,
```

Artifacts 区：

```ts
"## Artifacts",
"",
...renderVerificationArtifacts(verification.artifacts),
```

## 9. verification artifact 的 Markdown

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function renderVerificationArtifacts(artifacts: OpsPromotionArchiveVerificationArtifact[]): string[] {
  return artifacts.flatMap((artifact) => [
    `### ${artifact.name}`,
    "",
    `- Type: ${artifact.type}`,
    `- Valid: ${artifact.valid}`,
    `- Present matches: ${artifact.presentMatches}`,
    `- Source matches: ${artifact.sourceMatches}`,
    `- Digest matches: ${artifact.digestMatches}`,
    `- Manifest digest: ${artifact.manifestDigest.algorithm}:${artifact.manifestDigest.value}`,
    `- Recomputed digest: ${artifact.recomputedDigest.algorithm}:${artifact.recomputedDigest.value}`,
    `- Source: ${artifact.source}`,
    "",
  ]);
}
```

这比只显示 `valid=true` 更方便排查：如果以后 artifact digest 失败，可以直接看到是哪一项不匹配。

## 10. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/verification", {
```

核心处理：

```ts
const bundle = createPromotionArchiveBundle(deps);
const verification = createOpsPromotionArchiveVerification({
  bundle,
  manifest: createOpsPromotionArchiveManifest(bundle),
});
```

Markdown 输出：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionArchiveVerificationMarkdown(verification);
}

return verification;
```

新增接口：

```text
GET /api/v1/ops/promotion-archive/verification
GET /api/v1/ops/promotion-archive/verification?format=markdown
```

## 11. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionArchiveVerification">Archive Verification</button>
<button data-action="opsPromotionArchiveVerificationReport">Verification Report</button>
```

JSON：

```js
if (action === "opsPromotionArchiveVerification") {
  write(await api("/api/v1/ops/promotion-archive/verification"));
}
```

Markdown：

```js
if (action === "opsPromotionArchiveVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/verification?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

## 12. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

空 verification：

```ts
expect(emptyVerification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "empty",
  checks: {
    manifestDigestValid: true,
    artifactsValid: true,
    archiveNameMatches: true,
    stateMatches: true,
    summaryMatches: true,
    nextActionsMatch: true,
  },
});
```

创建 decision 后：

```ts
expect(verification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "attention-required",
  checks: {
    manifestDigestValid: true,
    artifactsValid: true,
    archiveNameMatches: true,
    stateMatches: true,
    summaryMatches: true,
    nextActionsMatch: true,
  },
});
```

检查 manifest digest：

```ts
expect(verification.json().manifestDigest.value).toBe(verification.json().recomputedManifestDigest.value);
```

检查 artifact：

```ts
expect(verification.json().artifacts.every((artifact: { valid: boolean }) => artifact.valid)).toBe(true);
expect(verification.json().artifacts.every((artifact: { digestMatches: boolean }) => artifact.digestMatches)).toBe(true);
```

检查 Markdown：

```ts
expect(markdown.body).toContain("# Promotion archive verification");
expect(markdown.body).toContain("- Valid: true");
expect(markdown.body).toContain("### archive-summary");
expect(markdown.body).toContain("### latest-evidence");
expect(markdown.body).toContain("### ledger-integrity");
```

## 一句话总结

V26 让 V25 的 archive manifest 从“能生成指纹”升级成“能复核指纹”：manifest digest、artifact digest、summary 和 next actions 都能重新检查。
