# V21：promotion evidence report 代码讲解

V19 做了 promotion decision 记录，V20 做了 digest verification。V21 继续往“可交接、可归档”方向走：把一条 decision 和它的 verification 合并成 evidence report，并支持 JSON / Markdown 两种输出。

这一版仍然只使用 `orderops-node` 本地内存状态，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. report 服务单独成文件

文件：`src/services/opsPromotionEvidenceReport.ts`

```ts
import type { OpsPromotionDecisionRecord, OpsPromotionDecisionVerification } from "./opsPromotionDecision.js";
import type { OpsPromotionDecision, OpsPromotionReason } from "./opsPromotionReview.js";
```

这里没有把 report 逻辑继续塞进 `OpsPromotionDecisionLedger`。ledger 负责保存、查询、复核；report 服务负责把 evidence 整理成可读输出。这让职责更清楚。

## 2. evidence verdict

文件：`src/services/opsPromotionEvidenceReport.ts`

```ts
export type OpsPromotionEvidenceVerdict =
  | "digest-mismatch"
  | "verified-approved"
  | "verified-blocked"
  | "verified-review-required";
```

V21 的 verdict 不是重新发明一套 promotion 判断，而是在 V20 verification 的基础上做一个“证据包结论”：

- digest 不一致：`digest-mismatch`
- digest 一致且 decision 是 approved：`verified-approved`
- digest 一致且 decision 是 blocked：`verified-blocked`
- digest 一致且 decision 是 review-required：`verified-review-required`

## 3. evidence report 结构

文件：`src/services/opsPromotionEvidenceReport.ts`

```ts
export interface OpsPromotionEvidenceReport {
  service: "orderops-node";
  generatedAt: string;
  decisionId: string;
  sequence: number;
  title: string;
  verdict: OpsPromotionEvidenceVerdict;
  summary: {
    reviewer: string;
    note: string;
    outcome: OpsPromotionDecision;
    readyForPromotion: boolean;
    digestValid: boolean;
    digestAlgorithm: "sha256";
    digest: string;
```

继续看 summary 的后半部分：

```ts
readinessState: string;
runbookState: string;
baselineState: string;
blockerReasons: number;
reviewReasons: number;
passReasons: number;
```

这几个字段是给人工 review 用的。打开 report 时，不需要先读完整 decision，就能看到 readiness、runbook、baseline 的当前判断，以及 blocker/review/pass 原因数量。

## 4. 创建 evidence report

文件：`src/services/opsPromotionEvidenceReport.ts`

```ts
export function createOpsPromotionEvidenceReport(input: {
  decision: OpsPromotionDecisionRecord;
  verification: OpsPromotionDecisionVerification;
}): OpsPromotionEvidenceReport {
  const reasonCounts = countReasons(input.decision.review.reasons);
  const verdict = evidenceVerdict(input.decision, input.verification);
```

这里输入很克制：只要 `decision` 和 `verification`。V21 不重新读取 upstream，也不重新生成 promotion review，所以不会碰 Java / mini-kv。

返回值里把 decision、verification 和摘要放在一起：

```ts
return {
  service: "orderops-node",
  generatedAt: new Date().toISOString(),
  decisionId: input.decision.id,
  sequence: input.decision.sequence,
  title: `Promotion decision #${input.decision.sequence} evidence`,
  verdict,
```

summary 部分引用真实记录：

```ts
summary: {
  reviewer: input.decision.reviewer,
  note: input.decision.note,
  outcome: input.decision.outcome,
  readyForPromotion: input.decision.readyForPromotion,
  digestValid: input.verification.valid,
  digestAlgorithm: input.decision.digest.algorithm,
  digest: input.decision.digest.value,
  readinessState: input.decision.review.summary.readinessState,
  runbookState: input.decision.review.summary.runbookState,
  baselineState: input.decision.review.summary.baselineState,
```

## 5. verdict 如何计算

文件：`src/services/opsPromotionEvidenceReport.ts`

```ts
function evidenceVerdict(
  decision: OpsPromotionDecisionRecord,
  verification: OpsPromotionDecisionVerification,
): OpsPromotionEvidenceVerdict {
  if (!verification.valid) {
    return "digest-mismatch";
  }

  if (decision.outcome === "approved") {
    return "verified-approved";
  }
```

后面两种情况：

```ts
if (decision.outcome === "review-required") {
  return "verified-review-required";
}

return "verified-blocked";
```

优先判断 digest，是因为证据包本身的可信度要先成立。digest 不一致时，不再讨论 approved/blocked。

## 6. nextActions 从 reasons 提取

文件：`src/services/opsPromotionEvidenceReport.ts`

```ts
const nextActions = decision.review.reasons
  .map((reason) => reason.nextAction)
  .filter((action): action is string => action !== undefined && action.length > 0);
```

如果 promotion review 里已经给了下一步动作，就直接沿用。这样 evidence report 不是另起炉灶，而是把 V18/V19 以来积累的判断链条整理出来。

digest 不一致时，优先返回停止动作：

```ts
if (!verification.valid) {
  return ["Stop promotion review and inspect the stored decision record before trusting this evidence."];
}
```

## 7. Markdown 渲染

文件：`src/services/opsPromotionEvidenceReport.ts`

```ts
export function renderOpsPromotionEvidenceMarkdown(report: OpsPromotionEvidenceReport): string {
  const lines = [
    `# ${report.title}`,
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- Decision id: ${report.decisionId}`,
    `- Sequence: ${report.sequence}`,
    `- Verdict: ${report.verdict}`,
```

Markdown 里也包含 digest 信息：

```ts
`- Digest valid: ${report.summary.digestValid}`,
`- Digest: ${report.summary.digestAlgorithm}:${report.summary.digest}`,
```

还有 verification 区域：

```ts
"## Verification",
"",
`- Stored digest: ${report.verification.storedDigest.value}`,
`- Recomputed digest: ${report.verification.recomputedDigest.value}`,
`- Covered fields: ${report.verification.coveredFields.join(", ")}`,
```

这样用户可以拿 Markdown 直接放进版本归档、issue、交接记录或发布前 review 文档里。

## 8. 路由层支持 JSON / Markdown

文件：`src/routes/opsSummaryRoutes.ts`

```ts
interface PromotionDecisionEvidenceQuery {
  format?: "json" | "markdown";
}
```

路由入口：

```ts
app.get<{ Params: PromotionDecisionParams; Querystring: PromotionDecisionEvidenceQuery }>(
  "/api/v1/ops/promotion-decisions/:decisionId/evidence",
```

核心处理：

```ts
const report = createOpsPromotionEvidenceReport({
  decision: deps.opsPromotionDecisions.get(request.params.decisionId),
  verification: deps.opsPromotionDecisions.verify(request.params.decisionId),
});
```

如果请求 Markdown：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionEvidenceMarkdown(report);
}

return report;
```

## 9. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionEvidence">Evidence Report</button>
```

按钮逻辑会先取最新 decision：

```js
const listed = await api("/api/v1/ops/promotion-decisions?limit=1");
if (listed.decisions.length < 1) {
  write({ error: "NEED_PROMOTION_DECISION", message: "Record a promotion decision before building evidence." });
}
```

有 decision 时，直接拉 Markdown：

```js
const response = await fetch("/api/v1/ops/promotion-decisions/" + encodeURIComponent(listed.decisions[0].id) + "/evidence?format=markdown");
if (!response.ok) {
  throw await response.json();
}
output.textContent = await response.text();
```

这里刻意选择 Markdown 输出，因为 Dashboard 的 output 区本来就是文本区域，Markdown 更适合人直接复制和归档。

## 10. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

```ts
const jsonReport = await app.inject({
  method: "GET",
  url: `/api/v1/ops/promotion-decisions/${decision.json().id}/evidence`,
});
```

JSON 断言：

```ts
expect(jsonReport.json()).toMatchObject({
  service: "orderops-node",
  decisionId: decision.json().id,
  sequence: 1,
  title: "Promotion decision #1 evidence",
  verdict: "verified-blocked",
  summary: {
    reviewer: "evidence-reviewer",
    note: "build evidence report",
    outcome: "blocked",
    readyForPromotion: false,
    digestValid: true,
```

Markdown 断言：

```ts
expect(markdownReport.headers["content-type"]).toContain("text/markdown");
expect(markdownReport.body).toContain("# Promotion decision #1 evidence");
expect(markdownReport.body).toContain("- Verdict: verified-blocked");
expect(markdownReport.body).toContain("- Digest valid: true");
expect(markdownReport.body).toContain("## Verification");
```

缺失记录也测：

```ts
expect(missing.statusCode).toBe(404);
expect(missing.json()).toMatchObject({
  error: "OPS_PROMOTION_DECISION_NOT_FOUND",
});
```

## 一句话总结

V21 把 promotion decision 的记录和复核整理成证据包：机器可以读 JSON，人可以读 Markdown，后续版本归档和发布前 review 都更顺手。
