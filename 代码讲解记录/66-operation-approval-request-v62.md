# 第六十二版代码讲解：Operation approval request ledger

本版目标来自：

```text
docs/plans/v59-post-preflight-control-roadmap.md
Node v62：Operation approval request ledger
```

v62 接在 v60 的 preflight report 和 v61 的 execution preview 后面。它不执行真实 Java replay，也不执行 mini-kv 写命令，只把“已经预检、已经预演”的结果固化成本地审批请求记录。

## 1. Approval request 的数据结构

文件：

```text
src/services/operationApprovalRequest.ts
```

核心状态：

```ts
export type OperationApprovalRequestStatus = "pending" | "approved" | "rejected" | "expired";
```

当前 v62 只会自动生成：

```text
pending  -> execution preview 已经具备审批条件
rejected -> execution preview 仍有 hard blocker
expired  -> pending 请求超过本地 TTL
```

`approved` 先作为后续 v63 的状态预留，本版不新增“批准后执行”能力。

核心记录：

```ts
export interface OperationApprovalRequest {
  service: "orderops-node";
  requestId: string;
  intentId: string;
  action: string;
  target: string;
  requestedBy: string;
  reviewer: string;
  status: OperationApprovalRequestStatus;
  decisionReason: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  preflightDigest: OperationExecutionPreview["preflightDigest"];
  previewDigest: OperationApprovalDigest;
  preflightState: OperationExecutionPreview["preflightState"];
  previewState: OperationExecutionPreview["state"];
  readyForApprovalRequest: boolean;
  hardBlockers: string[];
  warnings: string[];
  expectedSideEffects: string[];
  preview: OperationExecutionPreview;
}
```

这里最关键的是两类 digest：

```text
preflightDigest -> v60 的预检证据摘要
previewDigest   -> v61 execution preview 的摘要
```

也就是说，审批请求不是空壳，而是绑定了“预检证据”和“执行预演”两层依据。

## 2. previewDigest 覆盖哪些字段

文件：

```text
src/services/operationApprovalRequest.ts
```

摘要字段：

```ts
const PREVIEW_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "intentId",
  "action",
  "target",
  "state",
  "preflightDigest",
  "preflightState",
  "wouldCall",
  "evidence",
  "expectedSideEffects",
  "hardBlockers",
  "warnings",
  "nextActions",
  "readyForApprovalRequest",
]);
```

计算逻辑：

```ts
export function digestOperationExecutionPreview(preview: OperationExecutionPreview): OperationApprovalDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: preview.service,
        intentId: preview.intentId,
        action: preview.action,
        target: preview.target,
        state: preview.state,
        preflightDigest: preview.preflightDigest,
        preflightState: preview.preflightState,
        wouldCall: preview.wouldCall,
        evidence: preview.evidence,
        expectedSideEffects: preview.expectedSideEffects,
        hardBlockers: preview.hardBlockers,
        warnings: preview.warnings,
        nextActions: preview.nextActions,
        readyForApprovalRequest: preview.readyForApprovalRequest,
      }))
      .digest("hex"),
    coveredFields: [...PREVIEW_DIGEST_COVERED_FIELDS],
  };
}
```

注意这里没有把 `generatedAt` 放进摘要。原因是时间戳每次都会变，不适合作为复核 preview 语义一致性的核心字段。

## 3. 创建审批请求

文件：

```text
src/services/operationApprovalRequest.ts
```

入口方法：

```ts
create(input: CreateOperationApprovalRequestInput): OperationApprovalRequest {
  const now = new Date();
  const status: OperationApprovalRequestStatus = input.preview.readyForApprovalRequest ? "pending" : "rejected";
```

状态由 execution preview 决定：

```text
readyForApprovalRequest=true  -> pending
readyForApprovalRequest=false -> rejected
```

生成记录：

```ts
const request: OperationApprovalRequest = {
  service: "orderops-node",
  requestId: crypto.randomUUID(),
  intentId: input.preview.intentId,
  action: input.preview.action,
  target: input.preview.target,
  requestedBy: normalizeHuman(input.requestedBy ?? input.preview.preflightReport.summary.operatorId, "requestedBy"),
  reviewer: normalizeHuman(input.reviewer ?? "unassigned", "reviewer"),
  status,
  decisionReason: normalizeDecisionReason(input.decisionReason) ?? defaultDecisionReason(status, input.preview),
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
  expiresAt: new Date(now.getTime() + this.ttlMs).toISOString(),
  preflightDigest: structuredClone(input.preview.preflightDigest),
  previewDigest: digestOperationExecutionPreview(input.preview),
  preflightState: input.preview.preflightState,
  previewState: input.preview.state,
  readyForApprovalRequest: input.preview.readyForApprovalRequest,
  hardBlockers: [...input.preview.hardBlockers],
  warnings: [...input.preview.warnings],
  expectedSideEffects: [...input.preview.expectedSideEffects],
  preview: structuredClone(input.preview),
};
```

这里保存完整 `preview`，是为了后续人工审查时不用重新访问上游，也不用担心 Java / mini-kv 状态已经变化。

## 4. TTL 过期

文件：

```text
src/services/operationApprovalRequest.ts
```

审批请求默认 10 分钟过期：

```ts
this.ttlMs = options.ttlMs ?? 10 * 60 * 1000;
```

过期逻辑：

```ts
private expireIfNeeded(request: OperationApprovalRequest, now: Date): void {
  if (request.status === "pending" && Date.parse(request.expiresAt) <= now.getTime()) {
    request.status = "expired";
    request.updatedAt = now.toISOString();
    request.decisionReason = "Approval request expired before a reviewer decision was recorded.";
  }
}
```

这避免旧的 preview 长时间后还被当成可审批依据。

## 5. Approval request route

文件：

```text
src/routes/operationApprovalRequestRoutes.ts
```

POST endpoint：

```ts
app.post<{ Body: CreateApprovalRequestBody }>("/api/v1/operation-approval-requests", {
```

请求体最少只需要：

```ts
required: ["intentId"],
```

但也可以带 execution preview 所需上下文：

```ts
failedEventId
keyPrefix
command
key
value
```

所以它能覆盖 Java failed-event simulation 和 mini-kv EXPLAINJSON 两条 preview 路径。

## 6. POST 路由的核心流程

文件：

```text
src/routes/operationApprovalRequestRoutes.ts
```

第一步：本地 mutation rate limit：

```ts
applyMutationRateLimit(
  reply,
  deps.mutationRateLimiter.consume(mutationScope("operation-approval-requests:create", request.body.requestedBy ?? "dashboard")),
);
```

第二步：重新生成 preflight report：

```ts
const report = createOperationPreflightReport(await preflight.create({
  intentId: request.body.intentId,
  failedEventId: request.body.failedEventId,
  keyPrefix: request.body.keyPrefix,
}));
```

第三步：基于 report 生成 execution preview：

```ts
const preview = await executionPreview.create(report, {
  failedEventId: request.body.failedEventId,
  command: request.body.command,
  key: request.body.key,
  value: request.body.value,
});
```

第四步：写入本地审批请求台账：

```ts
const approvalRequest = deps.operationApprovalRequests.create({
  preview,
  requestedBy: request.body.requestedBy,
  reviewer: request.body.reviewer,
  decisionReason: request.body.decisionReason,
});
```

这条链路可以概括为：

```text
intentId
 -> preflight report
 -> execution preview
 -> approval request ledger
```

## 7. 查询与 Markdown

文件：

```text
src/routes/operationApprovalRequestRoutes.ts
```

列表：

```ts
GET /api/v1/operation-approval-requests
```

单条：

```ts
GET /api/v1/operation-approval-requests/:requestId
```

Markdown：

```ts
GET /api/v1/operation-approval-requests/:requestId?format=markdown
```

Markdown 渲染函数：

```ts
export function renderOperationApprovalRequestMarkdown(request: OperationApprovalRequest): string {
  return [
    "# Operation approval request",
    "",
    `- Service: ${request.service}`,
    `- Request id: ${request.requestId}`,
    `- Intent id: ${request.intentId}`,
    `- Action: ${request.action}`,
    `- Target: ${request.target}`,
    `- Status: ${request.status}`,
```

这个报告适合归档到 `a/<版本>/解释`，也方便浏览器截图。

## 8. app.ts 组装

文件：

```text
src/app.ts
```

新增本地 ledger：

```ts
const operationApprovalRequests = new OperationApprovalRequestLedger();
```

注册路由：

```ts
await registerOperationApprovalRequestRoutes(app, {
  config,
  operationIntents,
  operationDispatches,
  operationApprovalRequests,
  mutationRateLimiter,
  orderPlatform,
  miniKv,
});
```

这说明 approval request 和 intent / dispatch 共用同一组内存状态，所以一次本地流程里创建 intent、confirm、dry-run dispatch、request approval 可以连续串起来。

## 9. Dashboard 入口

文件：

```text
src/ui/dashboard.ts
```

按钮：

```html
<button class="secondary" data-action="createApprovalRequest">Request Approval</button>
<button data-action="listApprovalRequests">Approval Requests</button>
```

创建请求时会带上同一组上下文：

```js
const body = {
  intentId: $("intentId").value,
  requestedBy: $("operatorId").value || "dashboard",
  reviewer: $("operatorId").value || "unassigned",
  decisionReason: $("intentReason").value || "dashboard approval request",
};
```

随后补充：

```js
failedEventId
keyPrefix
command
key
value
```

最后 POST：

```js
const approvalRequest = await api("/api/v1/operation-approval-requests", {
  method: "POST",
  body: JSON.stringify(body),
});
```

## 10. 测试覆盖

文件：

```text
test/operationApprovalRequest.test.ts
```

默认安全场景：

```ts
expect(approval.json()).toMatchObject({
  service: "orderops-node",
  action: "kv-set",
  target: "mini-kv",
  status: "rejected",
  preflightState: "blocked",
  previewState: "blocked",
  readyForApprovalRequest: false,
});
```

这证明默认不开上游动作时，审批请求不会被错误地推进为 `pending`。

mock mini-kv 场景：

```ts
expect(approval.json()).toMatchObject({
  status: "pending",
  preflightState: "review-required",
  previewState: "review-required",
  readyForApprovalRequest: true,
});
```

同时验证 preview side effects：

```ts
expect(approval.json().expectedSideEffects).toEqual([
  "mini-kv.store-would-mutate",
  "mini-kv.wal-would-be-touched",
]);
```

## 11. 本版不做

```text
不执行真实 Java replay
不执行真实 mini-kv 写命令
不把 approved 自动连接 dispatch
不接登录系统
不接数据库持久化
不修改 Java 项目
不修改 mini-kv 项目
```

一句话总结：v62 把 v60 的 preflight digest 和 v61 的 execution preview digest 绑定成本地审批请求记录，让 Node 控制面拥有“申请审批”的闭环，但仍然停在真实执行之前。
