# V25：promotion archive manifest 代码讲解

V24 已经能生成 promotion archive bundle。V25 在它上面再加一层 manifest：给归档包列出 artifact 清单，并生成一个稳定的 manifest digest。这样最终落档时，不只保存报告内容，还能保存一个“归档指纹”。

这一版仍然只读取 `orderops-node` 本地内存状态，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. manifest 继续放在 archive bundle 服务里

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
import { createHash } from "node:crypto";

import type { OpsPromotionDecisionLedgerIntegrity } from "./opsPromotionDecision.js";
import type { OpsPromotionEvidenceReport } from "./opsPromotionEvidenceReport.js";
import type { OpsPromotionDecision } from "./opsPromotionReview.js";
```

V25 需要 SHA-256，所以这里新增了 Node 内置的 `createHash`。没有新增第三方依赖。

## 2. artifact 类型

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionArchiveArtifactType = "archive-summary" | "latest-evidence" | "ledger-integrity";
```

Manifest 目前包含三类 artifact：

- `archive-summary`：归档包摘要。
- `latest-evidence`：最新 promotion decision 的 evidence。
- `ledger-integrity`：整本 decision ledger 的 integrity root。

## 3. artifact 结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionArchiveManifestArtifact {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  present: boolean;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}
```

每个 artifact 都有：

- `present`：这个 artifact 当前是否真实存在。比如没有 decision 时，`latest-evidence` 就是 `false`。
- `digest`：这个 artifact 的摘要。
- `source`：对应的 API 来源，方便之后人工追溯。

## 4. manifest 结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionArchiveManifest {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  state: OpsPromotionArchiveState;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  summary: OpsPromotionArchiveBundle["summary"];
  artifacts: OpsPromotionArchiveManifestArtifact[];
  nextActions: string[];
}
```

这里 `generatedAt` 是生成时间，但不会进入 manifest digest。因为时间每次请求都会变化，如果把它算进 digest，同一份归档每次请求都会得到不同指纹，不适合复核。

## 5. 创建 manifest

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionArchiveManifest(bundle: OpsPromotionArchiveBundle): OpsPromotionArchiveManifest {
  const artifacts = archiveArtifacts(bundle);
  const manifestPayload = {
    archiveName: bundle.archiveName,
    state: bundle.state,
    summary: bundle.summary,
    artifacts: artifacts.map((artifact) => ({
      name: artifact.name,
      type: artifact.type,
      present: artifact.present,
      digest: artifact.digest.value,
      source: artifact.source,
    })),
    nextActions: bundle.nextActions,
  };
```

这段就是 V25 的关键：先从 bundle 生成 artifacts，再构造一个稳定的 `manifestPayload`。注意它没有放入 `generatedAt`。

返回值：

```ts
return {
  service: "orderops-node",
  generatedAt: new Date().toISOString(),
  archiveName: bundle.archiveName,
  state: bundle.state,
  manifestDigest: {
    algorithm: "sha256",
    value: digestStable(manifestPayload),
    coveredFields: ["archiveName", "state", "summary", "artifacts", "nextActions"],
  },
  summary: bundle.summary,
  artifacts,
  nextActions: bundle.nextActions,
};
```

`coveredFields` 明确告诉调用方：这个 manifest digest 覆盖了哪些字段。

## 6. artifact 清单如何生成

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveArtifacts(bundle: OpsPromotionArchiveBundle): OpsPromotionArchiveManifestArtifact[] {
  return [
```

第一项是 archive summary：

```ts
{
  name: "archive-summary",
  type: "archive-summary",
  present: true,
  digest: {
    algorithm: "sha256",
    value: digestStable({
      archiveName: bundle.archiveName,
      state: bundle.state,
      summary: bundle.summary,
      nextActions: bundle.nextActions,
    }),
  },
  source: "/api/v1/ops/promotion-archive",
},
```

第二项是 latest evidence：

```ts
{
  name: "latest-evidence",
  type: "latest-evidence",
  present: bundle.latestEvidence !== undefined,
  digest: {
    algorithm: "sha256",
    value: digestStable(bundle.latestEvidence === undefined
      ? { present: false }
      : {
        decisionId: bundle.latestEvidence.decisionId,
        sequence: bundle.latestEvidence.sequence,
        verdict: bundle.latestEvidence.verdict,
        summary: bundle.latestEvidence.summary,
        nextActions: bundle.latestEvidence.nextActions,
      }),
  },
```

没有 latest evidence 时，也会生成一个稳定 digest：

```ts
{ present: false }
```

第三项是 ledger integrity：

```ts
{
  name: "ledger-integrity",
  type: "ledger-integrity",
  present: true,
  digest: {
    algorithm: "sha256",
    value: bundle.integrity.rootDigest.value,
  },
  source: "/api/v1/ops/promotion-decisions/integrity",
},
```

这里直接复用 V22 的 root digest，因为它本来就是 ledger 级别的滚动摘要。

## 7. 稳定 JSON 和 SHA-256

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function digestStable(value: unknown): string {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}
```

`stableJson` 会给对象 key 排序：

```ts
if (value !== null && typeof value === "object") {
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
    .join(",")}}`;
}
```

这样同一个对象即使构造时 key 顺序不同，也能得到相同 digest。

## 8. Manifest Markdown

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionArchiveManifestMarkdown(manifest: OpsPromotionArchiveManifest): string {
  const lines = [
    "# Promotion archive manifest",
    "",
    `- Service: ${manifest.service}`,
    `- Generated at: ${manifest.generatedAt}`,
    `- Archive name: ${manifest.archiveName}`,
    `- State: ${manifest.state}`,
    `- Manifest digest: ${manifest.manifestDigest.algorithm}:${manifest.manifestDigest.value}`,
    `- Covered fields: ${manifest.manifestDigest.coveredFields.join(", ")}`,
```

Markdown 里会展示 summary：

```ts
"## Summary",
"",
`- Total decisions: ${manifest.summary.totalDecisions}`,
`- Latest decision id: ${manifest.summary.latestDecisionId ?? "none"}`,
`- Latest sequence: ${manifest.summary.latestSequence ?? "none"}`,
`- Latest outcome: ${manifest.summary.latestOutcome ?? "none"}`,
`- Latest digest valid: ${manifest.summary.latestDigestValid ?? "none"}`,
`- Integrity valid: ${manifest.summary.integrityValid}`,
`- Integrity root digest: sha256:${manifest.summary.integrityRootDigest}`,
`- Sequence order: ${manifest.summary.sequenceOrder}`,
```

再展示 artifacts：

```ts
"## Artifacts",
"",
...renderManifestArtifacts(manifest.artifacts),
```

## 9. 每个 artifact 的 Markdown

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function renderManifestArtifacts(artifacts: OpsPromotionArchiveManifestArtifact[]): string[] {
  return artifacts.flatMap((artifact) => [
    `### ${artifact.name}`,
    "",
    `- Type: ${artifact.type}`,
    `- Present: ${artifact.present}`,
    `- Digest: ${artifact.digest.algorithm}:${artifact.digest.value}`,
    `- Source: ${artifact.source}`,
    "",
  ]);
}
```

这个格式比较直接，适合人工复制进归档说明。

## 10. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/manifest", {
```

核心处理：

```ts
const manifest = createOpsPromotionArchiveManifest(createPromotionArchiveBundle(deps));

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionArchiveManifestMarkdown(manifest);
}

return manifest;
```

所以 V25 新增两个入口：

```text
GET /api/v1/ops/promotion-archive/manifest
GET /api/v1/ops/promotion-archive/manifest?format=markdown
```

## 11. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionArchiveManifest">Archive Manifest</button>
<button data-action="opsPromotionArchiveManifestReport">Manifest Report</button>
```

JSON：

```js
if (action === "opsPromotionArchiveManifest") {
  write(await api("/api/v1/ops/promotion-archive/manifest"));
}
```

Markdown：

```js
if (action === "opsPromotionArchiveManifestReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/manifest?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

## 12. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

空 manifest：

```ts
expect(emptyManifest.json()).toMatchObject({
  service: "orderops-node",
  state: "empty",
  summary: {
    totalDecisions: 0,
    integrityValid: true,
    sequenceOrder: "empty",
  },
});
```

manifest digest 字段：

```ts
expect(emptyManifest.json().manifestDigest).toMatchObject({
  algorithm: "sha256",
  coveredFields: ["archiveName", "state", "summary", "artifacts", "nextActions"],
});
expect(emptyManifest.json().manifestDigest.value).toMatch(/^[a-f0-9]{64}$/);
```

创建 decision 后：

```ts
expect(manifest.json()).toMatchObject({
  service: "orderops-node",
  state: "attention-required",
  summary: {
    totalDecisions: 1,
    latestDecisionId: decision.json().id,
    latestSequence: 1,
    latestOutcome: "blocked",
    latestReadyForPromotion: false,
    latestDigestValid: true,
    integrityValid: true,
    sequenceOrder: "contiguous",
  },
});
```

artifact 断言：

```ts
expect(artifacts[2]).toMatchObject({
  name: "ledger-integrity",
  present: true,
  source: "/api/v1/ops/promotion-decisions/integrity",
});
expect(artifacts[2].digest.value).toBe(manifest.json().summary.integrityRootDigest);
```

Markdown 断言：

```ts
expect(markdown.body).toContain("# Promotion archive manifest");
expect(markdown.body).toContain(`- Manifest digest: sha256:${manifest.json().manifestDigest.value}`);
expect(markdown.body).toContain("### archive-summary");
expect(markdown.body).toContain("### latest-evidence");
expect(markdown.body).toContain("### ledger-integrity");
```

## 一句话总结

V25 给 promotion archive 加上 manifest 指纹：归档摘要、最新证据、ledger root 都有 SHA-256 摘要，最终 manifest digest 可以作为发布前归档的总指纹。
