# V23：promotion integrity report 代码讲解

V22 已经能返回 promotion decision ledger integrity 的 JSON。V23 在这个基础上新增 Markdown report：同一份 integrity 结果，既可以机器读 JSON，也可以人读 Markdown，方便发布前 review、版本归档和交接记录。

这一版仍然只读取 `orderops-node` 本地内存 ledger，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. Markdown 渲染函数入口

文件：`src/services/opsPromotionDecision.ts`

```ts
export function renderOpsPromotionDecisionLedgerIntegrityMarkdown(
  integrity: OpsPromotionDecisionLedgerIntegrity,
): string {
```

这个函数不重新计算 integrity。它只接收 V22 已经生成好的 `OpsPromotionDecisionLedgerIntegrity`，然后把它渲染成 Markdown。

这样职责很清楚：

```text
OpsPromotionDecisionLedger.integrity()
 -> 负责账本级完整性计算

renderOpsPromotionDecisionLedgerIntegrityMarkdown()
 -> 负责把结果转成人可读文本
```

## 2. 报告开头汇总关键信息

文件：`src/services/opsPromotionDecision.ts`

```ts
const lines = [
  "# Promotion decision ledger integrity",
  "",
  `- Service: ${integrity.service}`,
  `- Generated at: ${integrity.generatedAt}`,
  `- Valid: ${integrity.valid}`,
  `- Total records: ${integrity.totalRecords}`,
  `- Sequence range: ${sequenceRange(integrity)}`,
  `- Root digest: ${integrity.rootDigest.algorithm}:${integrity.rootDigest.value}`,
```

这一段是给人第一眼扫结论用的：

- `Valid`：整本 ledger 是否通过完整性检查。
- `Total records`：当前保留了几条 decision。
- `Sequence range`：sequence 覆盖范围。
- `Root digest`：整本 ledger 的滚动根摘要。

## 3. Checks 区域

文件：`src/services/opsPromotionDecision.ts`

```ts
"## Checks",
"",
`- Decision digests valid: ${integrity.checks.digestsValid}`,
`- Sequences contiguous: ${integrity.checks.sequencesContiguous}`,
`- Sequence order: ${integrity.checks.sequenceOrder}`,
```

V22 的 integrity 有两个核心检查：

- 每条 decision 的 digest 是否仍然有效。
- 当前保留记录的 sequence 是否连续。

V23 的 Markdown 把这两个检查直接列出来，避免读 report 的人只看到一个笼统的 `valid=true`。

## 4. Records 区域

文件：`src/services/opsPromotionDecision.ts`

```ts
"## Records",
"",
...renderIntegrityRecords(integrity.records),
```

每条记录的 Markdown 由 `renderIntegrityRecords` 负责。

## 5. 空账本如何渲染

文件：`src/services/opsPromotionDecision.ts`

```ts
function renderIntegrityRecords(records: OpsPromotionDecisionLedgerIntegrityRecord[]): string[] {
  if (records.length === 0) {
    return ["- No promotion decisions recorded."];
  }
```

空账本不是错误。V22 已经给空账本一个稳定 root digest，V23 则给 Markdown 一个明确说明：目前没有 promotion decision。

## 6. 每条记录的 Markdown

文件：`src/services/opsPromotionDecision.ts`

```ts
return records.flatMap((record) => [
  `### Decision ${record.sequence}`,
  "",
  `- Id: ${record.id}`,
  `- Outcome: ${record.outcome}`,
  `- Ready for promotion: ${record.readyForPromotion}`,
  `- Digest valid: ${record.digestValid}`,
  `- Stored digest: ${record.storedDigest.value}`,
  `- Recomputed digest: ${record.recomputedDigest.value}`,
  `- Previous chain digest: ${record.previousChainDigest ?? "genesis"}`,
  `- Chain digest: ${record.chainDigest}`,
  "",
]);
```

这里把 V22 的链式校验细节直接展示出来：

- `Stored digest`：记录创建时保存的 digest。
- `Recomputed digest`：当前重新计算的 digest。
- `Previous chain digest`：上一条记录的链摘要。
- `Chain digest`：当前记录滚动后的链摘要。

这让人可以沿着 Markdown 从 `genesis` 一直看到最后的 root digest。

## 7. sequence range 的处理

文件：`src/services/opsPromotionDecision.ts`

```ts
function sequenceRange(integrity: OpsPromotionDecisionLedgerIntegrity): string {
  if (integrity.oldestSequence === undefined || integrity.newestSequence === undefined) {
    return "empty";
  }

  return `${integrity.oldestSequence}..${integrity.newestSequence}`;
}
```

空账本显示 `empty`。有记录时显示类似：

```text
1..2
```

这比在 Markdown 里直接输出 `undefined` 更适合归档。

## 8. 路由层支持 format

文件：`src/routes/opsSummaryRoutes.ts`

```ts
interface PromotionDecisionIntegrityQuery {
  format?: "json" | "markdown";
}
```

路由现在有 query schema：

```ts
app.get<{ Querystring: PromotionDecisionIntegrityQuery }>("/api/v1/ops/promotion-decisions/integrity", {
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
```

先生成同一份 integrity：

```ts
const integrity = deps.opsPromotionDecisions.integrity();
```

再根据 `format` 决定输出：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionDecisionLedgerIntegrityMarkdown(integrity);
}

return integrity;
```

所以：

```text
GET /api/v1/ops/promotion-decisions/integrity
 -> JSON

GET /api/v1/ops/promotion-decisions/integrity?format=markdown
 -> Markdown
```

## 9. Dashboard 新增入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionIntegrityReport">Integrity Report</button>
```

点击后直接请求 Markdown：

```js
if (action === "opsPromotionIntegrityReport") {
  const response = await fetch("/api/v1/ops/promotion-decisions/integrity?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

V22 的 `Ledger Integrity` 按钮仍然保留，用于看 JSON。V23 的 `Integrity Report` 用于看 Markdown。

## 10. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

测试在已有两条 decision 后请求 Markdown：

```ts
const markdown = await app.inject({
  method: "GET",
  url: "/api/v1/ops/promotion-decisions/integrity?format=markdown",
});
```

断言 content-type：

```ts
expect(markdown.headers["content-type"]).toContain("text/markdown");
```

断言关键内容：

```ts
expect(markdown.body).toContain("# Promotion decision ledger integrity");
expect(markdown.body).toContain("- Valid: true");
expect(markdown.body).toContain(`- Root digest: sha256:${integrity.json().rootDigest.value}`);
expect(markdown.body).toContain("## Checks");
expect(markdown.body).toContain("### Decision 1");
expect(markdown.body).toContain("### Decision 2");
```

最后确认第二条记录引用了第一条记录的 chain digest：

```ts
expect(markdown.body).toContain(`- Previous chain digest: ${integrity.json().records[0].chainDigest}`);
```

## 一句话总结

V23 把 V22 的 ledger integrity 从“机器可检查 JSON”扩展成“人可审阅 Markdown”：root digest、检查结果和每条 chain digest 都能直接进入归档文档。
