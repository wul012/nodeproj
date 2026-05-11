# v41 Promotion Release Archive 代码讲解

## 1. 这一版解决什么问题

v39 生成 `release evidence`，v40 校验 `release evidence`。v41 在它们后面再收一层“最终发布归档清单”：把已经校验过的发布证据、完成记录、最终状态和剩余动作封成一个可被保存的 `releaseArchiveDigest`。

核心新增入口在 `src/services/opsPromotionArchiveBundle.ts`：

```ts
export function createOpsPromotionReleaseArchive(input: {
  evidence: OpsPromotionReleaseEvidence;
  evidenceVerification: OpsPromotionReleaseEvidenceVerification;
}): OpsPromotionReleaseArchive {
```

这和 mini-kv 里“先有数据结构，再有校验和归档输出”的思路类似：不是直接把 HTTP 输出拼字符串，而是先构造一个稳定的业务对象，再由 route 和 Markdown renderer 去展示。

## 2. Release Archive 的数据结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionReleaseArchiveItemName =
  | "release-evidence"
  | "verified-release-evidence"
  | "handoff-completion"
  | "final-archive-state";
```

这个枚举规定最终归档必须覆盖 4 类证据：

- `release-evidence`：v39 生成的发布证据。
- `verified-release-evidence`：v40 复验后的证据 digest。
- `handoff-completion`：最终 handoff completion digest。
- `final-archive-state`：最终状态、closeout 状态和 next actions。

完整归档对象里保留了 digest、源对象引用和操作结论：

```ts
export interface OpsPromotionReleaseArchive {
  service: "orderops-node";
  generatedAt: string;
  releaseArchiveName: string;
  evidenceName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  evidenceDigest: { algorithm: "sha256"; value: string };
  verifiedEvidenceDigest: { algorithm: "sha256"; value: string };
  archiveItems: OpsPromotionReleaseArchiveItem[];
  nextActions: string[];
}
```

这里的重点是 `releaseArchiveDigest.coveredFields`。它明确告诉读代码的人：这个 digest 到底覆盖了哪些字段，后续如果漏加字段，测试会直接提醒。

## 3. 核心构造逻辑

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const releaseArchiveName = `promotion-release-archive-${input.evidenceVerification.recomputedEvidenceDigest.value.slice(0, 12)}`;
const archiveItems = archiveReleaseArchiveItems(input.evidence, input.evidenceVerification);
const evidenceReferenceValid = input.evidence.evidenceDigest.value === input.evidenceVerification.recomputedEvidenceDigest.value;
```

这三行分别做三件事：

- 用复验后的 evidence digest 派生稳定归档名。
- 把最终归档拆成 4 个 item。
- 确认 evidence 自己声明的 digest 和 verification 复算 digest 一致。

然后才计算最终状态：

```ts
const valid = input.evidence.valid
  && input.evidenceVerification.valid
  && evidenceReferenceValid
  && archiveItems.every((item) => item.valid);
const handoffReady = valid && input.evidence.handoffReady && input.evidenceVerification.handoffReady;
```

这里的语义很清晰：`valid` 表示链路可信，`handoffReady` 表示可以进入发布交接。blocked 场景下可以 `valid=true`，但 `handoffReady=false`，这正好符合当前练习项目的状态模型。

## 4. Digest 覆盖范围

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
const digestPayload = archiveReleaseArchiveDigestPayload({
  releaseArchiveName,
  evidenceName: input.evidence.evidenceName,
  completionName: input.evidence.completionName,
  closureName: input.evidence.closureName,
  receiptName: input.evidence.receiptName,
  certificateName: input.evidence.certificateName,
  packageName: input.evidence.packageName,
  archiveName: input.evidence.archiveName,
  valid,
  state: input.evidence.state,
  handoffReady,
  evidenceDigest: input.evidence.evidenceDigest.value,
  verifiedEvidenceDigest: input.evidenceVerification.recomputedEvidenceDigest.value,
  completionDigest: input.evidence.completionDigest.value,
  closureDigest: input.evidence.closureDigest.value,
  decision: input.evidence.decision,
  verification,
  archiveItems,
  nextActions,
});
```

最终 digest 不只覆盖一个 evidence digest，而是覆盖整条发布交接的关键上下文：名字、状态、多个上游 digest、决策摘要、verification 摘要、item 列表和 next actions。

归一化 payload 时只取 item 的稳定字段：

```ts
archiveItems: input.archiveItems.map((item) => ({
  name: item.name,
  valid: item.valid,
  source: item.source,
  digest: item.digest.value,
  detail: item.detail,
})),
```

这样做能避免 `generatedAt` 这类时间字段污染 digest，让同一份业务状态能算出同一个归档指纹。

## 5. Archive Items 的含义

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
{
  name: "verified-release-evidence",
  valid: evidenceVerification.valid,
  source: "/api/v1/ops/promotion-archive/release-evidence/verification",
  digest: {
    algorithm: "sha256",
    value: evidenceVerification.recomputedEvidenceDigest.value,
  },
  detail: "Release evidence has been recomputed from the verified completion chain.",
}
```

这个 item 的意思是：最终归档不直接相信 v39 的 evidence，而是引用 v40 复算过的 evidence digest。也就是说，v41 是站在 v40 的校验结果上继续封装。

最终状态 item 则把状态收口：

```ts
{
  name: "final-archive-state",
  valid: evidenceVerification.valid
    && evidenceVerification.checks.stateMatches
    && evidenceVerification.checks.handoffReadyMatches
    && evidence.verification.closeoutReady === evidenceVerification.summary.closeoutReady,
  source: "/api/v1/ops/promotion-archive/release-evidence/verification",
}
```

这一段防止“evidence 说 blocked，verification 说 ready”这类状态漂移。

## 6. 路由层的改动

文件：`src/routes/opsSummaryRoutes.ts`

v41 增加了一个 helper，避免每个 release route 都复制一大段构建链路：

```ts
function createPromotionReleaseEvidenceArtifacts(deps: OpsSummaryRouteDeps) {
  const bundle = createPromotionArchiveBundle(deps);
  const manifest = createOpsPromotionArchiveManifest(bundle);
  const archiveVerification = createOpsPromotionArchiveVerification({ bundle, manifest });
  const attestation = createOpsPromotionArchiveAttestation({ bundle, manifest, verification: archiveVerification });
```

这个 helper 最后统一返回：

```ts
return {
  releaseEvidence,
  releaseEvidenceVerification,
};
```

新 API 只负责把这两个对象组装成 release archive：

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/release-archive", {
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
  const { releaseEvidence, releaseEvidenceVerification } = createPromotionReleaseEvidenceArtifacts(deps);
  const releaseArchive = createOpsPromotionReleaseArchive({
    evidence: releaseEvidence,
    evidenceVerification: releaseEvidenceVerification,
  });
```

Markdown 输出仍然沿用已有模式：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionReleaseArchiveMarkdown(releaseArchive);
}
```

## 7. Dashboard 入口

文件：`src/ui/dashboard.ts`

按钮区新增两项：

```html
<button data-action="opsPromotionReleaseArchive">Release Archive</button>
<button data-action="opsPromotionReleaseArchiveReport">Release Archive Report</button>
```

点击逻辑分别请求 JSON 和 Markdown：

```js
if (action === "opsPromotionReleaseArchive") {
  write(await api("/api/v1/ops/promotion-archive/release-archive"));
}
if (action === "opsPromotionReleaseArchiveReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/release-archive?format=markdown");
```

这保持了前面 archive、manifest、verification、receipt、completion、release evidence 的同一套使用习惯。

## 8. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

新增测试：

```ts
it("builds promotion release archive as JSON or Markdown", async () => {
```

空账本场景验证基础结构：

```ts
expect(emptyArchive.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  verification: {
    evidenceVerified: true,
    evidenceDigestValid: true,
    evidenceItemsValid: true,
    evidenceReferenceValid: true,
    closeoutReady: false,
    evidenceItemCount: 5,
    archiveItemCount: 4,
  },
});
```

blocked 决策后验证 digest、covered fields 和 item：

```ts
expect(releaseArchive.json().releaseArchiveDigest.coveredFields).toEqual([
  "releaseArchiveName",
  "evidenceName",
  "completionName",
  "closureName",
  "receiptName",
  "certificateName",
  "packageName",
  "archiveName",
  "valid",
  "state",
  "handoffReady",
  "evidenceDigest",
  "verifiedEvidenceDigest",
  "completionDigest",
  "closureDigest",
  "decision",
  "verification",
  "archiveItems",
  "nextActions",
]);
```

同时确认最终归档引用的是 evidence 与 verified evidence 的同一个 digest：

```ts
expect(releaseArchive.json().evidenceDigest.value).toBe(evidence.json().evidenceDigest.value);
expect(releaseArchive.json().evidenceDigest.value).toBe(releaseArchive.json().verifiedEvidenceDigest.value);
```

## 9. v41 的定位

到 v41 为止，发布链路已经从“决策记录”一路推进到“最终发布归档清单”：

```text
decision -> evidence -> archive bundle -> manifest -> verification
-> attestation -> handoff package -> certificate -> receipt -> closure
-> completion -> release evidence -> release evidence verification
-> release archive
```

后续自然的 v42 是给 `release archive` 再补独立 verification，形成和前面每个关键对象一样的“生成 + 复验”闭环。
