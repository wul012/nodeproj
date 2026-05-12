# 第六十五版代码讲解：上游审批证据接入

## 模块角色

Node v65 把 v64 的本地 approval evidence report 继续向外接一层只读证据：

```text
Java v40 failed-event approval-status
mini-kv v49 EXPLAINJSON side_effects
```

它仍然不执行真实 replay，不执行 mini-kv 写命令，只把上游只读响应纳入 evidence report 和 verification。

## 入口装配

`src/app.ts` 把 `config`、`orderPlatform`、`miniKv` 注入 evidence routes：

```ts
await registerOperationApprovalEvidenceRoutes(app, {
  config,
  operationApprovalRequests,
  operationApprovalDecisions,
  orderPlatform,
  miniKv,
});
```

这说明 evidence report 不再只是读内存 ledger，还可以按安全开关读取上游只读证据。

## Java approval-status client

`src/clients/orderPlatformClient.ts` 新增 Java v40 响应结构：

```ts
export interface OrderPlatformFailedEventApprovalStatus {
  sampledAt?: string;
  failedEventId?: number;
  exists?: boolean;
  failedEventStatus?: string | null;
  managementStatus?: string | null;
  approvalStatus?: string | null;
  requiredApprovalStatus?: string | null;
  approvalRequested?: boolean;
  approvalPending?: boolean;
  approvedForReplay?: boolean;
  rejected?: boolean;
  approvalBlockedBy?: string[];
  nextAllowedActions?: string[];
}
```

真正调用仍然是一个只读 GET：

```ts
failedEventApprovalStatus(failedEventId: string): Promise<UpstreamJsonResponse<OrderPlatformFailedEventApprovalStatus>> {
  return this.request(`/api/v1/failed-events/${encodeURIComponent(failedEventId)}/approval-status`);
}
```

对应 Node 代理路由在 `src/routes/orderPlatformRoutes.ts` 里仍受 probe gate 保护：

```ts
assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "advanced-order-platform");
const response = await deps.orderPlatform.failedEventApprovalStatus(request.params.failedEventId);
return response.data;
```

所以默认环境不会碰 Java；只有 `UPSTREAM_PROBES_ENABLED=true` 时才会发起只读请求。

## mini-kv side_effects parser

`src/clients/miniKvClient.ts` 的 `MiniKvExplainJson` 接收 mini-kv v49 的新字段：

```ts
export interface MiniKvExplainJson {
  command?: string;
  category?: "read" | "write" | "admin" | "meta" | string;
  mutates_store?: boolean;
  touches_wal?: boolean;
  side_effects?: string[];
}
```

parser 会校验它必须是字符串数组：

```ts
if ("side_effects" in explanation && (!Array.isArray(explanation.side_effects) || !explanation.side_effects.every((sideEffect) => typeof sideEffect === "string"))) {
  throw new AppHttpError(502, "MINIKV_EXPLAINJSON_INVALID", "mini-kv EXPLAINJSON side_effects field must be a string array");
}
```

这一步很关键：Node 不盲信上游 JSON，字段形状不对就把它当作上游协议错误。

## evidence service

`src/services/operationApprovalEvidence.ts` 新增 `OperationApprovalEvidenceService`，它负责把 request/decision 和上游证据组装成 report：

```ts
async createReport(
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
): Promise<OperationApprovalEvidenceReport> {
  const upstreamEvidence = {
    javaApprovalStatus: await this.collectJavaApprovalStatus(request),
    miniKvExplainCoverage: await this.collectMiniKvExplainCoverage(request),
  };
  return createOperationApprovalEvidenceReport(request, decision, upstreamEvidence);
}
```

Java 证据只对 failed-event replay simulation request 生效：

```ts
if (request.target !== "order-platform" || request.action !== "failed-event-replay-simulation") {
  return {
    status: "not_applicable",
    message: "Approval request does not target Java failed-event approval status.",
  };
}
```

mini-kv 证据只对 mini-kv request 生效：

```ts
if (request.target !== "mini-kv") {
  return {
    status: "not_applicable",
    message: "Approval request does not target mini-kv EXPLAINJSON coverage.",
  };
}
```

两个 collector 都先检查 `UPSTREAM_PROBES_ENABLED`：

```ts
if (!this.config.upstreamProbesEnabled) {
  return {
    status: "skipped",
    message: "UPSTREAM_PROBES_ENABLED=false; Java approval-status evidence was not requested.",
  };
}
```

这就是 v65 的安全边界：只读证据也必须显式开 probe gate。

## report 摘要

`OperationApprovalEvidenceReport.summary` 新增四个上游摘要字段：

```ts
javaApprovalStatus: EvidenceRecord["status"];
javaApprovedForReplay?: boolean;
miniKvExplainCoverage: EvidenceRecord["status"];
miniKvSideEffects: string[];
```

生成 summary 时从上游 evidence 里提取：

```ts
javaApprovalStatus: upstreamEvidence.javaApprovalStatus.status,
...(javaApprovedForReplay === undefined ? {} : { javaApprovedForReplay }),
miniKvExplainCoverage: upstreamEvidence.miniKvExplainCoverage.status,
miniKvSideEffects: readMiniKvSideEffects(upstreamEvidence.miniKvExplainCoverage.details),
```

这让人工看 Markdown 时不用翻完整 JSON，也能直接看到 Java 审批状态是否可读、mini-kv side effects 是否齐全。

## digest 与 verification

v65 把 `upstreamEvidence` 纳入 evidence digest：

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
  "upstreamEvidence",
  "nextActions",
]);
```

计算 digest 时也包含它：

```ts
upstreamEvidence: report.upstreamEvidence,
nextActions: report.nextActions,
```

verification 新增 summary 与 upstream evidence 的一致性检查：

```ts
upstreamEvidenceMatchesSummary: summaryMatchesUpstreamEvidence(report.summary, report.upstreamEvidence),
```

如果有人改了 `miniKvSideEffects` 或 Java `approvedForReplay` 摘要，而没有同步改原始上游证据，verification 会失败。

## Markdown 输出

v65 的 evidence Markdown 增加了 `Upstream Evidence` 段：

```ts
"## Upstream Evidence",
"",
`- Java approval-status: ${report.summary.javaApprovalStatus} - ${report.upstreamEvidence.javaApprovalStatus.message}`,
`- Java approved for replay: ${report.summary.javaApprovedForReplay === undefined ? "unknown" : report.summary.javaApprovedForReplay}`,
`- mini-kv EXPLAINJSON coverage: ${report.summary.miniKvExplainCoverage} - ${report.upstreamEvidence.miniKvExplainCoverage.message}`,
```

mini-kv v49 的细粒度副作用单独列出：

```ts
"### mini-kv side_effects",
"",
...renderList(report.summary.miniKvSideEffects, "No mini-kv side_effects reported."),
```

这样归档截图能直接证明 Node 看到了 `store_write`、`wal_append_when_enabled` 这类字段，而不是只看到旧版 `mutates_store=true`。

## 测试覆盖

`test/operationApprovalEvidence.test.ts` 覆盖 mini-kv v49 字段：

```ts
expect(evidence.json()).toMatchObject({
  summary: {
    javaApprovalStatus: "not_applicable",
    miniKvExplainCoverage: "available",
    miniKvSideEffects: ["store_write", "wal_append_when_enabled"],
  },
});
```

也覆盖 Java v40 approval-status：

```ts
expect(evidence.json()).toMatchObject({
  summary: {
    action: "failed-event-replay-simulation",
    target: "order-platform",
    javaApprovalStatus: "available",
    javaApprovedForReplay: true,
    miniKvExplainCoverage: "not_applicable",
  },
});
```

最后还确认 verification 能识别上游证据和 summary 一致：

```ts
expect(verification.json()).toMatchObject({
  valid: true,
  checks: {
    upstreamEvidenceMatchesSummary: true,
    upstreamUntouched: true,
  },
});
```

## 一句话总结

Node v65 的重点不是增加执行能力，而是把 Java v40 和 mini-kv v49 的只读证据纳入 Node 本地审批证据链，让后续 handoff bundle 和 execution gate preview 有更可信的上游依据。
