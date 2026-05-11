# 第六十三版代码讲解：Approval decision record

本版目标来自：

```text
docs/plans/v59-post-preflight-control-roadmap.md
Node v63：Approval decision record
```

v63 接在 v62 的 approval request ledger 后面。它只记录 reviewer 的本地 approve / reject 决策，不执行 Java replay，不执行 mini-kv 写命令，也不接登录系统或数据库。

## 1. Approval request 支持被决定

文件：

```text
src/services/operationApprovalRequest.ts
```

v62 已经预留了状态：

```ts
export type OperationApprovalRequestStatus = "pending" | "approved" | "rejected" | "expired";
```

v63 新增输入：

```ts
export interface RecordOperationApprovalDecisionInput {
  requestId: string;
  decision: Extract<OperationApprovalRequestStatus, "approved" | "rejected">;
  reviewer: string;
  reason: string;
}
```

核心方法：

```ts
recordDecision(input: RecordOperationApprovalDecisionInput): OperationApprovalRequest {
  this.expireStale(new Date());
  const request = this.requireRequest(input.requestId);
  if (request.status !== "pending") {
    throw new AppHttpError(409, "APPROVAL_REQUEST_NOT_DECIDABLE", "Only pending approval requests can receive a reviewer decision", {
      requestId: input.requestId,
      status: request.status,
    });
  }
```

这里的关键限制是：只有 `pending` 的 approval request 能被 reviewer 决定。默认安全环境里生成的 `rejected` request 不允许再被批准。

更新状态：

```ts
request.status = input.decision;
request.reviewer = normalizeHuman(input.reviewer, "reviewer");
request.decisionReason = normalizeDecisionReason(input.reason) ?? defaultDecisionReason(input.decision, request.preview);
request.updatedAt = now;
```

这只是更新 Node 本地内存台账，不会触发 dispatch，也不会触碰上游。

## 2. Decision ledger 的记录结构

文件：

```text
src/services/operationApprovalDecision.ts
```

允许的决策：

```ts
export const operationApprovalDecisionValues = ["approved", "rejected"] as const;
export type OperationApprovalDecisionValue = (typeof operationApprovalDecisionValues)[number];
```

决策记录：

```ts
export interface OperationApprovalDecision {
  service: "orderops-node";
  decisionId: string;
  requestId: string;
  intentId: string;
  action: string;
  target: string;
  previewDigest: OperationApprovalDigest;
  decision: OperationApprovalDecisionValue;
  reviewer: string;
  reason: string;
  createdAt: string;
  requestStatusBeforeDecision: OperationApprovalRequest["status"];
  requestStatusAfterDecision: OperationApprovalRequest["status"];
  upstreamTouched: false;
  expectedSideEffects: string[];
  hardBlockers: string[];
  warnings: string[];
  decisionDigest: OperationApprovalDecisionDigest;
}
```

`upstreamTouched: false` 是刻意写死的字段，用来证明本版仍然只是控制面记录，不是执行动作。

## 3. 防止重复决策

文件：

```text
src/services/operationApprovalDecision.ts
```

ledger 内有 request 到 decision 的索引：

```ts
private readonly requestDecisionIndex = new Map<string, string>();
```

创建时先检查：

```ts
const existingDecisionId = this.requestDecisionIndex.get(input.requestId);
if (existingDecisionId !== undefined) {
  throw new AppHttpError(409, "APPROVAL_DECISION_ALREADY_RECORDED", "Approval request already has a reviewer decision", {
    requestId: input.requestId,
    decisionId: existingDecisionId,
  });
}
```

所以一个 approval request 只能有一个最终 reviewer decision，避免本地台账出现“先批准又驳回”的歧义。

## 4. 创建 decision 的流程

文件：

```text
src/services/operationApprovalDecision.ts
```

先读取 request：

```ts
const requestBeforeDecision = this.approvalRequests.get(input.requestId);
if (requestBeforeDecision.status !== "pending") {
  throw new AppHttpError(409, "APPROVAL_REQUEST_NOT_DECIDABLE", "Only pending approval requests can receive a reviewer decision", {
    requestId: input.requestId,
    status: requestBeforeDecision.status,
  });
}
```

再更新 request 状态：

```ts
const requestAfterDecision = this.approvalRequests.recordDecision({
  requestId: input.requestId,
  decision: input.decision,
  reviewer,
  reason,
});
```

最后生成 decision 记录：

```ts
const decisionWithoutDigest = {
  service: "orderops-node" as const,
  decisionId: crypto.randomUUID(),
  requestId: requestBeforeDecision.requestId,
  intentId: requestBeforeDecision.intentId,
  action: requestBeforeDecision.action,
  target: requestBeforeDecision.target,
  previewDigest: structuredClone(requestBeforeDecision.previewDigest),
  decision: input.decision,
  reviewer,
  reason,
  createdAt: new Date().toISOString(),
  requestStatusBeforeDecision: requestBeforeDecision.status,
  requestStatusAfterDecision: requestAfterDecision.status,
  upstreamTouched: false as const,
  expectedSideEffects: [...requestBeforeDecision.expectedSideEffects],
  hardBlockers: [...requestBeforeDecision.hardBlockers],
  warnings: [...requestBeforeDecision.warnings],
};
```

它保存了 `previewDigest`，也保存了 side effects / blockers / warnings，方便 v64 继续生成 evidence report。

## 5. Decision digest

文件：

```text
src/services/operationApprovalDecision.ts
```

覆盖字段：

```ts
const DECISION_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "decisionId",
  "requestId",
  "intentId",
  "action",
  "target",
  "previewDigest",
  "decision",
  "reviewer",
  "reason",
  "createdAt",
  "requestStatusBeforeDecision",
  "requestStatusAfterDecision",
  "upstreamTouched",
  "expectedSideEffects",
  "hardBlockers",
  "warnings",
]);
```

计算：

```ts
export function digestOperationApprovalDecision(
  decision: Omit<OperationApprovalDecision, "decisionDigest">,
): OperationApprovalDecisionDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: decision.service,
        decisionId: decision.decisionId,
        requestId: decision.requestId,
        intentId: decision.intentId,
        action: decision.action,
        target: decision.target,
        previewDigest: decision.previewDigest,
        decision: decision.decision,
        reviewer: decision.reviewer,
        reason: decision.reason,
        createdAt: decision.createdAt,
        requestStatusBeforeDecision: decision.requestStatusBeforeDecision,
        requestStatusAfterDecision: decision.requestStatusAfterDecision,
        upstreamTouched: decision.upstreamTouched,
        expectedSideEffects: decision.expectedSideEffects,
        hardBlockers: decision.hardBlockers,
        warnings: decision.warnings,
      }))
      .digest("hex"),
    coveredFields: [...DECISION_DIGEST_COVERED_FIELDS],
  };
}
```

这让 decision 本身也能被后续复核。

## 6. Decision route

文件：

```text
src/routes/operationApprovalDecisionRoutes.ts
```

列表：

```ts
GET /api/v1/operation-approval-decisions
```

单条：

```ts
GET /api/v1/operation-approval-decisions/:decisionId
```

Markdown：

```ts
GET /api/v1/operation-approval-decisions/:decisionId?format=markdown
```

创建：

```ts
POST /api/v1/operation-approval-requests/:requestId/decision
```

请求体：

```ts
required: ["decision", "reviewer"],
properties: {
  decision: { type: "string", enum: operationApprovalDecisionValues },
  reviewer: { type: "string", minLength: 1, maxLength: 80 },
  reason: { type: "string", maxLength: 400 },
}
```

## 7. 创建 decision 时也走限流

文件：

```text
src/routes/operationApprovalDecisionRoutes.ts
```

```ts
applyMutationRateLimit(
  reply,
  deps.mutationRateLimiter.consume(mutationScope("operation-approval-decisions:create", request.body.reviewer)),
);
```

approval decision 虽然不触碰上游，但仍然是本地状态变更，所以和 intent / dispatch / approval request 一样走 mutation rate limit。

## 8. app.ts 组装

文件：

```text
src/app.ts
```

新增 ledger：

```ts
const operationApprovalDecisions = new OperationApprovalDecisionLedger(operationApprovalRequests);
```

注意它依赖 `operationApprovalRequests`：

```text
decision ledger
 -> 读取 approval request
 -> 校验 pending
 -> 更新 request status
 -> 保存 decision record
```

注册路由：

```ts
await registerOperationApprovalDecisionRoutes(app, {
  operationApprovalDecisions,
  mutationRateLimiter,
});
```

## 9. Dashboard 入口

文件：

```text
src/ui/dashboard.ts
```

新增 request id 和 reason 输入：

```html
<input id="approvalRequestId" placeholder="Approval Request ID">
<input id="approvalDecisionReason" placeholder="Decision reason" value="reviewed local approval evidence">
```

新增按钮：

```html
<button class="secondary" data-action="approveApprovalRequest">Approve Request</button>
<button data-action="rejectApprovalRequest">Reject Request</button>
<button data-action="listApprovalDecisions">Approval Decisions</button>
```

创建 approval request 后，页面会自动把 `requestId` 填进去：

```js
$("approvalRequestId").value = approvalRequest.requestId;
```

approve / reject 共用一个 handler：

```js
if (action === "approveApprovalRequest" || action === "rejectApprovalRequest") {
  const approvalDecision = await api("/api/v1/operation-approval-requests/" + encodeURIComponent($("approvalRequestId").value) + "/decision", {
    method: "POST",
    body: JSON.stringify({
      decision: action === "approveApprovalRequest" ? "approved" : "rejected",
      reviewer: $("operatorId").value || "dashboard-reviewer",
      reason: $("approvalDecisionReason").value || "dashboard approval decision",
    }),
  });
  write(approvalDecision);
}
```

## 10. 测试覆盖

文件：

```text
test/operationApprovalDecision.test.ts
```

默认安全场景：blocked approval request 不能被批准。

```ts
expect(decision.statusCode).toBe(409);
expect(decision.json()).toMatchObject({
  error: "APPROVAL_REQUEST_NOT_DECIDABLE",
  details: {
    status: "rejected",
  },
});
```

mock mini-kv 场景：pending request 可以被批准。

```ts
expect(decision.json()).toMatchObject({
  decision: "approved",
  reviewer: "ops-reviewer",
  requestStatusBeforeDecision: "pending",
  requestStatusAfterDecision: "approved",
  upstreamTouched: false,
});
```

同时验证 request 状态已经被更新：

```ts
expect(approvalAfterDecision.json()).toMatchObject({
  status: "approved",
  reviewer: "ops-reviewer",
  decisionReason: "reviewed v63 approval evidence",
});
```

重复决策会被拒绝：

```ts
expect(duplicate.statusCode).toBe(409);
expect(duplicate.json().error).toBe("APPROVAL_DECISION_ALREADY_RECORDED");
```

## 11. 本版不做

```text
不执行 Java replay
不执行 mini-kv 写命令
不把 approved 自动连接 dispatch
不做多人权限系统
不接数据库持久化
不修改 Java 项目
不修改 mini-kv 项目
```

一句话总结：v63 给 v62 的 approval request 补上了 reviewer 决策和 decision digest，但仍然把系统停在真实执行之前。
