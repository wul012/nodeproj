# V24：promotion archive bundle 代码讲解

V19 到 V23 已经形成了这条链路：

```text
promotion decision
 -> decision verification
 -> evidence report
 -> ledger integrity
 -> integrity Markdown report
```

V24 做的是把这些成果汇总成一个 promotion archive bundle。它既可以输出 JSON，给程序继续处理；也可以输出 Markdown，给人做发布前 review 或归档。

这一版仍然只读取 `orderops-node` 本地内存 ledger，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. archive bundle 单独成服务

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
import type { OpsPromotionDecisionLedgerIntegrity } from "./opsPromotionDecision.js";
import type { OpsPromotionEvidenceReport } from "./opsPromotionEvidenceReport.js";
import type { OpsPromotionDecision } from "./opsPromotionReview.js";
```

V24 没有把归档逻辑塞进 decision ledger，也没有塞进 evidence report。它单独成一个服务文件，负责“汇总”和“渲染”。

## 2. archive state

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export type OpsPromotionArchiveState = "empty" | "ready" | "attention-required";
```

这三个状态的含义：

- `empty`：还没有 promotion decision。
- `ready`：有最新 evidence，ledger integrity 有效，并且最新 decision 是 approved。
- `attention-required`：有 evidence，但不是 approved，或者完整性检查不通过。

## 3. archive bundle 结构

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionArchiveBundle {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  state: OpsPromotionArchiveState;
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestSequence?: number;
    latestOutcome?: OpsPromotionDecision;
    latestReadyForPromotion?: boolean;
    latestDigestValid?: boolean;
    integrityValid: boolean;
    integrityRootDigest: string;
    sequenceOrder: OpsPromotionDecisionLedgerIntegrity["checks"]["sequenceOrder"];
  };
```

后半部分保留了完整对象：

```ts
latestEvidence?: OpsPromotionEvidenceReport;
integrity: OpsPromotionDecisionLedgerIntegrity;
nextActions: string[];
```

所以调用方既能快速看 `summary`，也能深入看完整的 `latestEvidence` 和 `integrity`。

## 4. 创建 bundle

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionArchiveBundle(input: {
  integrity: OpsPromotionDecisionLedgerIntegrity;
  latestEvidence?: OpsPromotionEvidenceReport;
}): OpsPromotionArchiveBundle {
  const state = archiveState(input.integrity, input.latestEvidence);
  const archiveName = `promotion-archive-${input.integrity.rootDigest.value.slice(0, 12)}`;
```

这里的 `archiveName` 直接来自 ledger root digest 的前 12 位。这样同一份 ledger integrity 会生成稳定且可识别的归档名。

继续看返回值：

```ts
return {
  service: "orderops-node",
  generatedAt: new Date().toISOString(),
  archiveName,
  state,
  summary: {
    totalDecisions: input.integrity.totalRecords,
    latestDecisionId: input.latestEvidence?.decisionId,
    latestSequence: input.latestEvidence?.sequence,
    latestOutcome: input.latestEvidence?.summary.outcome,
    latestReadyForPromotion: input.latestEvidence?.summary.readyForPromotion,
    latestDigestValid: input.latestEvidence?.summary.digestValid,
    integrityValid: input.integrity.valid,
    integrityRootDigest: input.integrity.rootDigest.value,
    sequenceOrder: input.integrity.checks.sequenceOrder,
  },
```

这就是 V24 的核心：把最新 decision 的 evidence 和整本 ledger 的 integrity 放到一个对象里。

## 5. state 判断

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveState(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): OpsPromotionArchiveState {
  if (integrity.totalRecords === 0 || latestEvidence === undefined) {
    return "empty";
  }
```

如果 ledger 没有记录，bundle 是空的。

```ts
if (!integrity.valid || !latestEvidence.summary.digestValid) {
  return "attention-required";
}

return latestEvidence.summary.outcome === "approved" ? "ready" : "attention-required";
```

只有完整性有效、最新 evidence digest 有效、并且最新 decision 是 approved，才会是 `ready`。

## 6. nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function archiveNextActions(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): string[] {
  if (integrity.totalRecords === 0 || latestEvidence === undefined) {
    return ["Record a promotion decision before building an archive bundle."];
  }
```

完整性不通过时：

```ts
if (!integrity.valid) {
  return ["Inspect promotion decision ledger integrity before trusting this archive bundle."];
}
```

最新 decision digest 不通过时：

```ts
if (!latestEvidence.summary.digestValid) {
  return ["Inspect the latest promotion decision digest before trusting this archive bundle."];
}
```

approved 时：

```ts
if (latestEvidence.summary.outcome === "approved") {
  return ["Archive bundle is internally consistent; keep it with the promotion handoff record."];
}
```

否则沿用 evidence report 的 next actions：

```ts
return latestEvidence.nextActions;
```

## 7. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function renderOpsPromotionArchiveMarkdown(bundle: OpsPromotionArchiveBundle): string {
  const lines = [
    "# Promotion archive bundle",
    "",
    `- Service: ${bundle.service}`,
    `- Generated at: ${bundle.generatedAt}`,
    `- Archive name: ${bundle.archiveName}`,
    `- State: ${bundle.state}`,
    `- Total decisions: ${bundle.summary.totalDecisions}`,
    `- Integrity valid: ${bundle.summary.integrityValid}`,
    `- Integrity root digest: sha256:${bundle.summary.integrityRootDigest}`,
    `- Sequence order: ${bundle.summary.sequenceOrder}`,
```

Markdown 里先给总览，再给 evidence：

```ts
"## Latest Decision Evidence",
"",
...renderLatestEvidence(bundle.latestEvidence),
```

再给 ledger integrity：

```ts
"## Ledger Integrity",
"",
`- Root digest: ${bundle.integrity.rootDigest.algorithm}:${bundle.integrity.rootDigest.value}`,
`- Decision digests valid: ${bundle.integrity.checks.digestsValid}`,
`- Sequences contiguous: ${bundle.integrity.checks.sequencesContiguous}`,
`- Sequence order: ${bundle.integrity.checks.sequenceOrder}`,
```

最后给下一步：

```ts
"## Next Actions",
"",
...bundle.nextActions.map((action) => `- ${action}`),
```

## 8. 最新 evidence 如何渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
function renderLatestEvidence(evidence: OpsPromotionEvidenceReport | undefined): string[] {
  if (evidence === undefined) {
    return ["- No promotion decision evidence is available yet."];
  }
```

有 evidence 时：

```ts
return [
  `- Decision id: ${evidence.decisionId}`,
  `- Sequence: ${evidence.sequence}`,
  `- Verdict: ${evidence.verdict}`,
  `- Outcome: ${evidence.summary.outcome}`,
  `- Ready for promotion: ${evidence.summary.readyForPromotion}`,
  `- Digest valid: ${evidence.summary.digestValid}`,
  `- Digest: ${evidence.summary.digestAlgorithm}:${evidence.summary.digest}`,
  `- Readiness: ${evidence.summary.readinessState}`,
  `- Runbook: ${evidence.summary.runbookState}`,
  `- Baseline: ${evidence.summary.baselineState}`,
];
```

这部分把 V21 evidence report 的关键字段摘出来，放进 archive report。

## 9. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
interface OpsPromotionArchiveQuery {
  format?: "json" | "markdown";
}
```

路由：

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive", {
```

处理逻辑：

```ts
const bundle = createPromotionArchiveBundle(deps);

if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionArchiveMarkdown(bundle);
}

return bundle;
```

所以两个接口是：

```text
GET /api/v1/ops/promotion-archive
GET /api/v1/ops/promotion-archive?format=markdown
```

## 10. route helper 如何复用现有服务

文件：`src/routes/opsSummaryRoutes.ts`

```ts
function createPromotionArchiveBundle(deps: OpsSummaryRouteDeps) {
  const integrity = deps.opsPromotionDecisions.integrity();
  const latestDecision = deps.opsPromotionDecisions.list(1)[0];
```

如果有最新 decision，就复用 V21 的 evidence report：

```ts
const latestEvidence = latestDecision === undefined
  ? undefined
  : createOpsPromotionEvidenceReport({
    decision: deps.opsPromotionDecisions.get(latestDecision.id),
    verification: deps.opsPromotionDecisions.verify(latestDecision.id),
  });
```

最后创建 bundle：

```ts
return createOpsPromotionArchiveBundle({
  integrity,
  latestEvidence,
});
```

## 11. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionArchive">Archive Bundle</button>
<button data-action="opsPromotionArchiveReport">Archive Report</button>
```

JSON：

```js
if (action === "opsPromotionArchive") {
  write(await api("/api/v1/ops/promotion-archive"));
}
```

Markdown：

```js
if (action === "opsPromotionArchiveReport") {
  const response = await fetch("/api/v1/ops/promotion-archive?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

## 12. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

先测空 bundle：

```ts
expect(empty.json()).toMatchObject({
  service: "orderops-node",
  state: "empty",
  summary: {
    totalDecisions: 0,
    integrityValid: true,
    sequenceOrder: "empty",
  },
  nextActions: ["Record a promotion decision before building an archive bundle."],
});
```

创建 decision 后测 JSON：

```ts
expect(jsonBundle.json()).toMatchObject({
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
```

再测 Markdown：

```ts
expect(markdownBundle.body).toContain("# Promotion archive bundle");
expect(markdownBundle.body).toContain("- State: attention-required");
expect(markdownBundle.body).toContain(`- Archive name: ${jsonBundle.json().archiveName}`);
expect(markdownBundle.body).toContain(`- Integrity root digest: sha256:${jsonBundle.json().summary.integrityRootDigest}`);
expect(markdownBundle.body).toContain("## Latest Decision Evidence");
expect(markdownBundle.body).toContain(`- Decision id: ${decision.json().id}`);
expect(markdownBundle.body).toContain("## Ledger Integrity");
```

## 一句话总结

V24 把最新 promotion evidence 和整本 ledger integrity 汇总成一个归档包：JSON 给程序读，Markdown 给人审，发布前证据链更完整。
