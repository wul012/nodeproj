# 第六十六版代码讲解：Approval evidence handoff bundle

## 模块角色

Node v66 在 v65 的 approval evidence report 之上再加一层交接包：

```text
request
decision
evidence report
verification
upstream evidence
artifact digest summary
```

它的目标不是执行操作，而是把现有证据整理成一个方便归档、复核和后续 execution gate preview 使用的 handoff bundle。

## 新服务文件

核心实现放在 `src/services/operationApprovalHandoffBundle.ts`。

bundle 的顶层结构是：

```ts
export interface OperationApprovalHandoffBundle {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalEvidenceReport["state"];
  handoffReady: boolean;
  bundleDigest: OperationApprovalHandoffDigest;
  summary: { ... };
  artifacts: OperationApprovalHandoffArtifact[];
  report: OperationApprovalEvidenceReport;
  verification: OperationApprovalEvidenceVerification;
  nextActions: string[];
}
```

这说明 v66 不是替代 v65，而是把 v65 的 `report` 和 `verification` 包进去。

## 创建 bundle

入口函数是 `createOperationApprovalHandoffBundle`：

```ts
export function createOperationApprovalHandoffBundle(
  report: OperationApprovalEvidenceReport,
  verification: OperationApprovalEvidenceVerification,
): OperationApprovalHandoffBundle {
  const artifacts = createArtifacts(report, verification);
  const handoffReady = verification.valid;
  const summary = summarizeHandoff(report, verification, artifacts);
  const nextActions = collectNextActions(handoffReady, artifacts, report, verification);
```

这里有三个判断点：

```text
artifacts：有哪些交接附件
handoffReady：verification 是否通过
nextActions：是否可以归档，或需要补证据
```

也就是说，bundle 自己不重新发明审批规则，而是尊重 v65 verification 的结果。

## artifact 摘要

v66 把交接附件固定为五类：

```ts
export type OperationApprovalHandoffArtifactName =
  | "approval-request"
  | "approval-decision"
  | "approval-evidence-report"
  | "approval-evidence-verification"
  | "upstream-evidence";
```

每个 artifact 都有 `present`、`valid`、`source` 和 digest：

```ts
export interface OperationApprovalHandoffArtifact {
  name: OperationApprovalHandoffArtifactName;
  present: boolean;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}
```

例如 approval decision 的有效性来自 v65 verification：

```ts
valid: verification.checks.decisionPresent
  && verification.checks.decisionMatchesRequest
  && verification.checks.decisionDigestValid,
```

upstream evidence 的有效性也直接来自 v65 的新增检查：

```ts
valid: verification.checks.upstreamEvidenceMatchesSummary,
```

所以 v66 的交接包不会绕过 v65 的证据一致性检查。

## bundle digest

bundle 自己也有一个 `bundleDigest`：

```ts
const HANDOFF_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "requestId",
  "decisionId",
  "intentId",
  "state",
  "handoffReady",
  "summary",
  "artifacts",
  "reportDigest",
  "verificationChecks",
  "nextActions",
]);
```

生成 digest 时只覆盖稳定交接字段：

```ts
value: digestStable({
  service: bundle.service,
  requestId: bundle.requestId,
  decisionId: bundle.decisionId ?? null,
  intentId: bundle.intentId,
  state: bundle.state,
  handoffReady: bundle.handoffReady,
  summary: bundle.summary,
  artifacts: bundle.artifacts,
  reportDigest: bundle.report.evidenceDigest,
  verificationChecks: bundle.verification.checks,
  nextActions: bundle.nextActions,
}),
```

`generatedAt` 不参与 digest，避免每次请求时间不同导致交接摘要天然变化。

## 路由接入

`src/routes/operationApprovalEvidenceRoutes.ts` 新增 endpoint：

```ts
app.get<{ Params: ApprovalRequestParams; Querystring: ApprovalEvidenceQuery }>(
  "/api/v1/operation-approval-requests/:requestId/evidence-bundle",
```

路由内部先生成 v65 report：

```ts
const report = await evidenceService.createReport(
  deps.operationApprovalRequests.get(request.params.requestId),
  deps.operationApprovalDecisions.getByRequest(request.params.requestId),
);
```

再用同一份 report 生成 verification 和 bundle：

```ts
const verification = createOperationApprovalEvidenceVerification(report);
const bundle = createOperationApprovalHandoffBundle(report, verification);
```

这点很重要：同一次 bundle 请求里，report 和 verification 使用的是同一份上游证据快照。

## Markdown 输出

Markdown 渲染函数是 `renderOperationApprovalHandoffBundleMarkdown`：

```ts
`- Handoff ready: ${bundle.handoffReady}`,
`- Bundle digest: ${bundle.bundleDigest.algorithm}:${bundle.bundleDigest.value}`,
```

它会把上游摘要、artifact、verification checks 都渲染出来：

```ts
"## Artifacts",
"",
...renderArtifacts(bundle.artifacts),
```

artifact 的渲染会明确展示来源和 digest：

```ts
`- Present: ${artifact.present}`,
`- Valid: ${artifact.valid}`,
`- Source: ${artifact.source}`,
`- Digest: ${artifact.digest.algorithm}:${artifact.digest.value}`,
```

这让截图和归档文件能直接证明交接包里包含哪些证据。

## 测试覆盖

`test/operationApprovalEvidence.test.ts` 在 approved mini-kv 场景里调用：

```ts
GET /api/v1/operation-approval-requests/:requestId/evidence-bundle
GET /api/v1/operation-approval-requests/:requestId/evidence-bundle?format=markdown
```

核心断言：

```ts
expect(bundle.json()).toMatchObject({
  service: "orderops-node",
  state: "approved",
  handoffReady: true,
  summary: {
    verificationValid: true,
    upstreamTouched: false,
    miniKvExplainCoverage: "available",
    miniKvSideEffects: ["store_write", "wal_append_when_enabled"],
    artifactCount: 5,
    missingArtifactCount: 0,
    invalidArtifactCount: 0,
  },
});
```

同时检查五个 artifact 都存在且有效：

```ts
expect.objectContaining({ name: "approval-request", present: true, valid: true })
expect.objectContaining({ name: "approval-decision", present: true, valid: true })
expect.objectContaining({ name: "approval-evidence-report", present: true, valid: true })
expect.objectContaining({ name: "approval-evidence-verification", present: true, valid: true })
expect.objectContaining({ name: "upstream-evidence", present: true, valid: true })
```

## 一句话总结

Node v66 把 v65 的审批证据链打包成一个可交付 handoff bundle：它有自己的 bundle digest、artifact 摘要和 Markdown 输出，但仍然只做归档交接，不进入真实执行。
