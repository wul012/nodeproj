# 第六十四版代码讲解：Approval evidence report + verification

本版目标来自：

```text
docs/plans/v59-post-preflight-control-roadmap.md
Node v64：Approval evidence report + verification
```

v64 只使用 Node v62/v63 的本地证据，把 approval request 和 approval decision 合并成可归档报告，并提供 digest verification。它不等待 Java v40 与 mini-kv v49，也不新增真实执行入口。

## 1. Decision ledger 支持按 request 查询

文件：

```text
src/services/operationApprovalDecision.ts
```

v63 已经保存了 request 到 decision 的索引：

```ts
private readonly requestDecisionIndex = new Map<string, string>();
```

v64 新增：

```ts
getByRequest(requestId: string): OperationApprovalDecision | undefined {
  const decisionId = this.requestDecisionIndex.get(requestId);
  if (decisionId === undefined) {
    return undefined;
  }

  const decision = this.decisions.get(decisionId);
  return decision === undefined ? undefined : cloneDecision(decision);
}
```

这样 evidence route 可以从 `requestId` 直接找到对应 reviewer decision。

## 2. Evidence report 结构

文件：

```text
src/services/operationApprovalEvidence.ts
```

状态：

```ts
export type OperationApprovalEvidenceState = "missing-decision" | "approved" | "rejected";
```

核心报告：

```ts
export interface OperationApprovalEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalEvidenceState;
  evidenceDigest: OperationApprovalEvidenceDigest;
  summary: {
    action: string;
    target: string;
    requestStatus: OperationApprovalRequest["status"];
    decision: OperationApprovalDecision["decision"] | "missing";
    reviewer: string;
    upstreamTouched: boolean;
    readyForApprovalRequest: boolean;
    preflightDigest: OperationApprovalDigest;
    previewDigest: OperationApprovalDigest;
    decisionDigest?: OperationApprovalDecisionDigest;
    expectedSideEffectCount: number;
    hardBlockerCount: number;
    warningCount: number;
  };
  request: OperationApprovalRequest;
  decision?: OperationApprovalDecision;
  nextActions: string[];
}
```

报告里保留完整 `request` 和 `decision`，也保留 digest 摘要链：

```text
preflightDigest
previewDigest
decisionDigest
evidenceDigest
```

## 3. 生成 evidence report

文件：

```text
src/services/operationApprovalEvidence.ts
```

入口：

```ts
export function createOperationApprovalEvidenceReport(
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
): OperationApprovalEvidenceReport {
```

核心流程：

```ts
const state = resolveEvidenceState(decision);
const summary = summarizeEvidence(request, decision);
const nextActions = collectNextActions(state, request, decision);
```

再生成带 digest 的报告：

```ts
return {
  ...reportWithoutDigest,
  evidenceDigest: digestOperationApprovalEvidence(reportWithoutDigest),
};
```

如果还没有 reviewer decision，报告不是报错，而是标记：

```text
state=missing-decision
```

这样默认安全场景也能归档“证据不完整”的原因。

## 4. Evidence digest 覆盖字段

文件：

```text
src/services/operationApprovalEvidence.ts
```

覆盖字段：

```ts
const EVIDENCE_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "requestId",
  "decisionId",
  "intentId",
  "state",
  "summary",
  "request",
  "decision",
  "nextActions",
]);
```

计算：

```ts
function digestOperationApprovalEvidence(
  report: Omit<OperationApprovalEvidenceReport, "evidenceDigest">,
): OperationApprovalEvidenceDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: report.service,
        requestId: report.requestId,
        decisionId: report.decisionId ?? null,
        intentId: report.intentId,
        state: report.state,
        summary: report.summary,
        request: report.request,
        decision: report.decision ?? null,
        nextActions: report.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...EVIDENCE_DIGEST_COVERED_FIELDS],
  };
}
```

`generatedAt` 不进入 digest，避免每次生成报告都因为时间变化导致摘要不同。

## 5. Verification 检查项

文件：

```text
src/services/operationApprovalEvidence.ts
```

验证结构：

```ts
checks: {
  digestValid: boolean;
  requestMatches: boolean;
  decisionPresent: boolean;
  decisionMatchesRequest: boolean;
  requestPreviewDigestValid: boolean;
  decisionDigestValid: boolean;
  summaryMatches: boolean;
  nextActionsMatch: boolean;
  upstreamUntouched: boolean;
};
```

核心复核：

```ts
const recomputed = createOperationApprovalEvidenceReport(report.request, report.decision);
const recomputedPreviewDigest = digestOperationExecutionPreview(report.request.preview);
const recomputedDecisionDigest = report.decision === undefined
  ? undefined
  : digestOperationApprovalDecision(stripDecisionDigest(report.decision));
```

其中最关键的三项：

```ts
requestPreviewDigestValid: storedPreviewDigest.value === recomputedPreviewDigest.value,
decisionDigestValid: report.decision !== undefined
  && recomputedDecisionDigest !== undefined
  && report.decision.decisionDigest.value === recomputedDecisionDigest.value,
upstreamUntouched: report.decision?.upstreamTouched === false,
```

这证明 request 的 preview digest 仍能复算，decision digest 仍能复算，并且 reviewer decision 没有触发上游执行。

## 6. Evidence Markdown

文件：

```text
src/services/operationApprovalEvidence.ts
```

渲染入口：

```ts
export function renderOperationApprovalEvidenceMarkdown(report: OperationApprovalEvidenceReport): string {
```

核心内容：

```ts
"# Operation approval evidence report",
`- State: ${report.state}`,
`- Request id: ${report.requestId}`,
`- Decision id: ${report.decisionId ?? "missing"}`,
`- Evidence digest: ${report.evidenceDigest.algorithm}:${report.evidenceDigest.value}`,
```

审批请求段：

```ts
`- Request status: ${report.summary.requestStatus}`,
`- Preflight digest: ${report.summary.preflightDigest.algorithm}:${report.summary.preflightDigest.value}`,
`- Preview digest: ${report.summary.previewDigest.algorithm}:${report.summary.previewDigest.value}`,
```

决策段：

```ts
`- Decision: ${report.summary.decision}`,
`- Reviewer: ${report.summary.reviewer}`,
`- Upstream touched: ${report.summary.upstreamTouched}`,
`- Decision digest: ${report.summary.decisionDigest === undefined ? "missing" : `${report.summary.decisionDigest.algorithm}:${report.summary.decisionDigest.value}`}`,
```

## 7. Evidence routes

文件：

```text
src/routes/operationApprovalEvidenceRoutes.ts
```

报告：

```ts
GET /api/v1/operation-approval-requests/:requestId/evidence
GET /api/v1/operation-approval-requests/:requestId/evidence?format=markdown
```

验证：

```ts
GET /api/v1/operation-approval-requests/:requestId/verification
GET /api/v1/operation-approval-requests/:requestId/verification?format=markdown
```

路由先读取 request，再按 requestId 找 decision：

```ts
const report = createOperationApprovalEvidenceReport(
  deps.operationApprovalRequests.get(request.params.requestId),
  deps.operationApprovalDecisions.getByRequest(request.params.requestId),
);
```

## 8. app.ts 组装

文件：

```text
src/app.ts
```

新增路由注册：

```ts
await registerOperationApprovalEvidenceRoutes(app, {
  operationApprovalRequests,
  operationApprovalDecisions,
});
```

这个路由只读，不需要 mutation rate limit。

## 9. Dashboard 入口

文件：

```text
src/ui/dashboard.ts
```

新增按钮：

```html
<button class="secondary" data-action="approvalEvidenceReport">Evidence Report</button>
<button data-action="approvalEvidenceVerification">Verify Evidence</button>
```

Markdown 报告：

```js
const response = await fetch("/api/v1/operation-approval-requests/" + encodeURIComponent($("approvalRequestId").value) + "/evidence?format=markdown");
```

JSON 验证：

```js
write(await api("/api/v1/operation-approval-requests/" + encodeURIComponent($("approvalRequestId").value) + "/verification"));
```

## 10. 测试覆盖

文件：

```text
test/operationApprovalEvidence.test.ts
```

缺少 decision 的报告：

```ts
expect(evidence.json()).toMatchObject({
  state: "missing-decision",
  summary: {
    requestStatus: "rejected",
    decision: "missing",
    upstreamTouched: false,
  },
});
```

完整 approved 报告：

```ts
expect(evidence.json()).toMatchObject({
  state: "approved",
  summary: {
    requestStatus: "approved",
    decision: "approved",
    reviewer: "ops-reviewer",
    upstreamTouched: false,
    readyForApprovalRequest: true,
  },
});
```

验证通过：

```ts
expect(verification.json()).toMatchObject({
  valid: true,
  checks: {
    digestValid: true,
    requestMatches: true,
    decisionPresent: true,
    decisionMatchesRequest: true,
    requestPreviewDigestValid: true,
    decisionDigestValid: true,
    summaryMatches: true,
    nextActionsMatch: true,
    upstreamUntouched: true,
  },
});
```

## 11. 本版不做

```text
不新增真实执行入口
不调用 Java replay / approval POST
不执行 mini-kv 写命令
不接 Java v40 / mini-kv v49 新字段
不合并 promotion archive 主线
不修改 Java 项目
不修改 mini-kv 项目
```

一句话总结：v64 把 approval request 和 approval decision 固化成可归档 evidence report，并能复核 preflight/preview/decision/evidence digest 链路，但仍然停在真实执行之前。
