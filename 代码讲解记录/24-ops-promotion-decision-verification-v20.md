# V20：promotion decision verification 代码讲解

V19 已经能把一次 promotion review 固化成 decision record。V20 继续往“可审计”方向推进：新增一个 verification 视图，服务端重新计算记录的 SHA-256 digest，并和当时存下来的 digest 比对。

这版仍然只围绕 `orderops-node` 本地内存状态工作，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. verification 结果长什么样

文件：`src/services/opsPromotionDecision.ts`

```ts
export interface OpsPromotionDecisionVerification {
  service: "orderops-node";
  decisionId: string;
  sequence: number;
  verifiedAt: string;
  valid: boolean;
  storedDigest: OpsPromotionDecisionRecord["digest"];
  recomputedDigest: OpsPromotionDecisionRecord["digest"];
  coveredFields: string[];
  record: {
    createdAt: string;
    reviewer: string;
    note: string;
    outcome: OpsPromotionDecision;
    readyForPromotion: boolean;
    reviewDecision: OpsPromotionDecision;
    reviewReadyForPromotion: boolean;
    readinessState: OpsPromotionReview["summary"]["readinessState"];
    runbookState: OpsPromotionReview["summary"]["runbookState"];
    baselineState: OpsPromotionReview["summary"]["baselineState"];
  };
}
```

这里没有把整个 `review` 再完整塞一遍，而是给出复核时最常看的摘要字段：

- `valid`：存储 digest 和重新计算 digest 是否一致。
- `storedDigest`：V19 创建 decision 时写入的摘要。
- `recomputedDigest`：V20 复核时现场重新算出的摘要。
- `coveredFields`：明确告诉调用方 digest 覆盖了哪些字段。
- `record`：把 reviewer、note、decision、readiness/runbook/baseline 状态摘出来，方便人工扫一眼。

## 2. verify 方法的核心流程

文件：`src/services/opsPromotionDecision.ts`

```ts
verify(id: string): OpsPromotionDecisionVerification {
  const record = this.find(id);
  const recomputedValue = digestRecord(record);

  return {
    service: "orderops-node",
    decisionId: record.id,
    sequence: record.sequence,
    verifiedAt: new Date().toISOString(),
    valid: record.digest.value === recomputedValue,
```

这一段是 V20 的核心：

1. 先通过 `this.find(id)` 找到原始内存记录。
2. 用和 V19 创建记录时相同的 `digestRecord(record)` 重新计算摘要。
3. 比较 `record.digest.value` 和 `recomputedValue`。

继续看返回值：

```ts
storedDigest: { ...record.digest },
recomputedDigest: {
  algorithm: "sha256",
  value: recomputedValue,
},
coveredFields: [...DIGEST_COVERED_FIELDS],
record: {
  createdAt: record.createdAt,
  reviewer: record.reviewer,
  note: record.note,
  outcome: record.outcome,
  readyForPromotion: record.readyForPromotion,
  reviewDecision: record.review.decision,
  reviewReadyForPromotion: record.review.readyForPromotion,
  readinessState: record.review.summary.readinessState,
  runbookState: record.review.summary.runbookState,
  baselineState: record.review.summary.baselineState,
},
```

这里有两个细节：

- `storedDigest` 用浅拷贝返回，避免把内部对象直接暴露出去。
- `coveredFields` 用展开返回，调用方拿到的是普通数组，不会影响服务里的常量。

## 3. find 方法统一 404 行为

文件：`src/services/opsPromotionDecision.ts`

```ts
get(id: string): OpsPromotionDecisionRecord {
  return cloneRecord(this.find(id));
}
```

V19 的 `get` 原本自己查 map。V20 抽出了 `find`：

```ts
private find(id: string): OpsPromotionDecisionRecord {
  const record = this.records.get(id);
  if (record === undefined) {
    throw new AppHttpError(404, "OPS_PROMOTION_DECISION_NOT_FOUND", "Ops promotion decision was not found", { id });
  }

  return record;
}
```

这样 `get` 和 `verify` 共享同一种缺失记录处理。接口层不用重复判断，Fastify 的统一错误处理会把它变成：

```json
{
  "error": "OPS_PROMOTION_DECISION_NOT_FOUND"
}
```

## 4. digest 覆盖字段被显式列出来

文件：`src/services/opsPromotionDecision.ts`

```ts
const DIGEST_COVERED_FIELDS = Object.freeze([
  "sequence",
  "createdAt",
  "reviewer",
  "note",
  "outcome",
  "readyForPromotion",
  "review",
]);
```

这和 V19 的 `digestRecord` 保持一致：

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

注意：V20 没有偷偷改 digest 规则。`id` 和 `service` 仍然不参与摘要，摘要继续覆盖 promotion decision 的实际证据字段。这样 V19 已有逻辑和 V20 复核逻辑是同一套口径。

## 5. 路由层只暴露一个复核接口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Params: PromotionDecisionParams }>("/api/v1/ops/promotion-decisions/:decisionId/verification", async (request) =>
  deps.opsPromotionDecisions.verify(request.params.decisionId));
```

这个接口是纯本地读取和计算：

```text
GET /api/v1/ops/promotion-decisions/:decisionId/verification
 -> OpsPromotionDecisionLedger.verify(id)
 -> digestRecord(record)
 -> 返回 valid / storedDigest / recomputedDigest / coveredFields
```

它不会触发 proxy route，也不会访问 Java 或 mini-kv。

## 6. Dashboard 的入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsVerifyPromotionDecision">Verify Latest Decision</button>
```

按钮逻辑：

```js
if (action === "opsVerifyPromotionDecision") {
  const listed = await api("/api/v1/ops/promotion-decisions?limit=1");
  if (listed.decisions.length < 1) {
    write({ error: "NEED_PROMOTION_DECISION", message: "Record a promotion decision before verification." });
  } else {
    write(await api("/api/v1/ops/promotion-decisions/" + encodeURIComponent(listed.decisions[0].id) + "/verification"));
  }
}
```

这里选择“验证最新 decision”，是为了不新增复杂表格或输入框。V20 目标是雏形成熟度往前推进，不是把 UI 做重。

## 7. 测试覆盖了成功和缺失两条线

文件：`test/opsPromotionDecision.test.ts`

```ts
const verification = await app.inject({
  method: "GET",
  url: `/api/v1/ops/promotion-decisions/${decision.json().id}/verification`,
});
```

核心断言：

```ts
expect(verification.json()).toMatchObject({
  service: "orderops-node",
  decisionId: decision.json().id,
  sequence: 1,
  valid: true,
  storedDigest: decision.json().digest,
  recomputedDigest: decision.json().digest,
  record: {
    reviewer: "decision-auditor",
    note: "verify digest",
    outcome: "blocked",
    readyForPromotion: false,
    reviewDecision: "blocked",
    reviewReadyForPromotion: false,
    readinessState: "blocked",
    runbookState: "blocked",
    baselineState: "unset",
  },
});
```

再断言 digest 字段清单：

```ts
expect(verification.json().coveredFields).toEqual([
  "sequence",
  "createdAt",
  "reviewer",
  "note",
  "outcome",
  "readyForPromotion",
  "review",
]);
```

缺失 id 也测了：

```ts
expect(missing.statusCode).toBe(404);
expect(missing.json()).toMatchObject({
  error: "OPS_PROMOTION_DECISION_NOT_FOUND",
});
```

## 一句话总结

V20 让 promotion decision 从“能记录”变成“能复核”：记录创建后，调用方可以重新计算摘要，确认这条本地证据记录仍然和保存时一致。
