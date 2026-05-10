# 23 - V19 ops promotion decision ledger

V19 在 V18 promotion review 之后，新增本地 promotion decision ledger：

```text
POST /api/v1/ops/promotion-decisions
GET  /api/v1/ops/promotion-decisions
GET  /api/v1/ops/promotion-decisions/:decisionId
```

它的作用是把某次 promotion review 固化成本地决策记录，保留 reviewer、note、review snapshot 和 SHA-256 摘要。它不执行真实上游动作，也不访问 Java / mini-kv。

## 1. 创建输入

文件：`src/services/opsPromotionDecision.ts`

```ts
export interface CreateOpsPromotionDecisionInput {
  reviewer?: string;
  note?: string;
  review: OpsPromotionReview;
}
```

`review` 来自 V18 的 `createOpsPromotionReview`。

`reviewer` 和 `note` 是本地留证信息：

- `reviewer`：谁记录了这次决策。
- `note`：这次决策的说明。

## 2. 决策记录结构

文件：`src/services/opsPromotionDecision.ts`

```ts
export interface OpsPromotionDecisionRecord {
  service: "orderops-node";
  id: string;
  sequence: number;
  createdAt: string;
  reviewer: string;
  note: string;
  outcome: OpsPromotionDecision;
  readyForPromotion: boolean;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  review: OpsPromotionReview;
}
```

这里的 `outcome` 直接来自 promotion review：

```ts
outcome: input.review.decision,
readyForPromotion: input.review.readyForPromotion,
```

所以 V19 不允许人工把 blocked review 改成 approved，它只是固化当前评审结果。

## 3. 内存 ledger

文件：`src/services/opsPromotionDecision.ts`

```ts
export class OpsPromotionDecisionLedger {
  private readonly records = new Map<string, OpsPromotionDecisionRecord>();
  private nextSequence = 1;
```

默认容量是 100：

```ts
constructor(private readonly capacity = 100) {
```

容量不合法会直接抛错：

```ts
if (!Number.isInteger(capacity) || capacity <= 0) {
  throw new Error("OpsPromotionDecisionLedger capacity must be a positive integer");
}
```

## 4. 创建记录

文件：`src/services/opsPromotionDecision.ts`

创建时分配 UUID 和 sequence：

```ts
const record: OpsPromotionDecisionRecord = {
  service: "orderops-node",
  id: randomUUID(),
  sequence: this.nextSequence,
  createdAt: new Date().toISOString(),
```

保存 reviewer/note：

```ts
reviewer: normalizeReviewer(input.reviewer),
note: normalizeNote(input.note),
```

保存 review snapshot：

```ts
review: structuredClone(input.review),
```

这里使用 `structuredClone`，避免之后内存状态变化影响已经记录的决策。

## 5. SHA-256 digest

文件：`src/services/opsPromotionDecision.ts`

创建时先放空摘要：

```ts
digest: {
  algorithm: "sha256",
  value: "",
},
```

然后计算：

```ts
record.digest.value = digestRecord(record);
```

摘要输入：

```ts
function digestRecord(record: OpsPromotionDecisionRecord): string {
  return createHash("sha256")
    .update(stableJson({
      sequence: record.sequence,
      createdAt: record.createdAt,
      reviewer: record.reviewer,
      note: record.note,
      outcome: record.outcome,
      readyForPromotion: record.readyForPromotion,
      review: record.review,
    }))
    .digest("hex");
}
```

摘要不包含 `id`，因为 `id` 是存取标识；摘要更关注这条决策记录的内容。

## 6. stableJson

文件：`src/services/opsPromotionDecision.ts`

数组按顺序序列化：

```ts
if (Array.isArray(value)) {
  return `[${value.map(stableJson).join(",")}]`;
}
```

对象按 key 排序：

```ts
return `{${Object.keys(record)
  .sort()
  .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
  .join(",")}}`;
```

普通值走 `JSON.stringify`：

```ts
return JSON.stringify(value);
```

这个思路和 V15 checkpoint digest 保持一致。

## 7. list / get

文件：`src/services/opsPromotionDecision.ts`

列表最新在前：

```ts
return [...this.records.values()]
  .sort((left, right) => right.sequence - left.sequence)
  .slice(0, safeLimit)
  .map(cloneRecord);
```

单条读取不存在时：

```ts
throw new AppHttpError(404, "OPS_PROMOTION_DECISION_NOT_FOUND", "Ops promotion decision was not found", { id });
```

这会被 `app.ts` 的统一错误处理转成 JSON 404。

## 8. app 注入

文件：`src/app.ts`

V19 在应用启动时创建 ledger：

```ts
const opsPromotionDecisions = new OpsPromotionDecisionLedger();
```

然后注入 ops routes：

```ts
await registerOpsSummaryRoutes(app, {
  config,
  auditLog,
  operationIntents,
  operationDispatches,
  opsCheckpoints,
  opsBaseline,
  opsPromotionDecisions,
  snapshots,
});
```

## 9. route 类型

文件：`src/routes/opsSummaryRoutes.ts`

创建 body：

```ts
interface CreatePromotionDecisionBody {
  reviewer?: string;
  note?: string;
}
```

列表 query：

```ts
interface ListPromotionDecisionQuery {
  limit?: number;
}
```

读取 params：

```ts
interface PromotionDecisionParams {
  decisionId: string;
}
```

## 10. route 实现

文件：`src/routes/opsSummaryRoutes.ts`

列表：

```ts
app.get<{ Querystring: ListPromotionDecisionQuery }>("/api/v1/ops/promotion-decisions", {
```

```ts
}, async (request) => ({
  decisions: deps.opsPromotionDecisions.list(request.query.limit ?? 20),
}));
```

读取：

```ts
app.get<{ Params: PromotionDecisionParams }>("/api/v1/ops/promotion-decisions/:decisionId", async (request) =>
  deps.opsPromotionDecisions.get(request.params.decisionId));
```

创建：

```ts
app.post<{ Body: CreatePromotionDecisionBody }>("/api/v1/ops/promotion-decisions", {
```

创建时捕获当前 promotion review：

```ts
const decision = deps.opsPromotionDecisions.create({
  reviewer: request.body?.reviewer,
  note: request.body?.note,
  review: createPromotionReview(deps),
});
```

成功后返回 201：

```ts
reply.code(201);
return decision;
```

## 11. promotion review helper

文件：`src/routes/opsSummaryRoutes.ts`

V19 复用 V18 的生成逻辑，抽成 helper：

```ts
function createPromotionReview(deps: OpsSummaryRouteDeps) {
  const summary = createOpsSummary(deps);
  const readiness = createOpsReadiness(summary);
  return createOpsPromotionReview({
    summary,
    readiness,
    runbook: createOpsRunbook(summary, readiness),
    baseline: createBaselineStatus(deps),
  });
}
```

这样 `GET /api/v1/ops/promotion-review` 和 `POST /api/v1/ops/promotion-decisions` 使用同一套评审逻辑。

## 12. Dashboard

文件：`src/ui/dashboard.ts`

V19 新增两个按钮：

```html
<button data-action="opsRecordPromotionDecision">Record Decision</button>
<button data-action="opsPromotionDecisions">Decisions</button>
```

记录决策：

```js
if (action === "opsRecordPromotionDecision") {
  write(await api("/api/v1/ops/promotion-decisions", {
    method: "POST",
    body: JSON.stringify({
      reviewer: $("operatorId").value || "dashboard",
      note: $("intentReason").value || "dashboard promotion decision",
    }),
  }));
}
```

列表：

```js
if (action === "opsPromotionDecisions") {
  write(await api("/api/v1/ops/promotion-decisions?limit=10"));
}
```

## 13. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

默认 blocked review 可以被记录：

```ts
expect(response.json()).toMatchObject({
  service: "orderops-node",
  sequence: 1,
  reviewer: "decision-admin",
  note: "capture blocked review",
  outcome: "blocked",
  readyForPromotion: false,
```

摘要必须是 64 位 hex：

```ts
expect(response.json().digest.value).toMatch(/^[a-f0-9]{64}$/);
```

完整本地证据链下可以记录 approved：

```ts
expect(decision.json()).toMatchObject({
  outcome: "approved",
  readyForPromotion: true,
  review: {
    decision: "approved",
    readyForPromotion: true,
```

列表最新在前：

```ts
expect(listed.json().decisions.map((decision: { sequence: number }) => decision.sequence)).toEqual([2, 1]);
```

404：

```ts
expect(missing.json()).toMatchObject({
  error: "OPS_PROMOTION_DECISION_NOT_FOUND",
});
```

## 一句话总结

V19 把 promotion review 从“当前判断”变成了“可追踪记录”：谁在什么时候记录了什么结果、依据是什么、摘要是什么，都能保留下来。
