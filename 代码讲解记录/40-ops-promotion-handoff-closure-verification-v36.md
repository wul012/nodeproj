# v36 Promotion Handoff Closure Verification 代码讲解

## 1. 这一版解决什么问题

v35 已经能生成最终交接关闭对象：

```ts
const closure = createOpsPromotionHandoffClosure({
  receipt,
  receiptVerification,
});
```

v36 在它后面补了一层“复验”：不直接相信 closure 自带的 digest，而是用同一份 `receipt` 和 `receiptVerification` 重新生成 expected closure，然后逐字段、逐 closeout item 对比。

## 2. 核心类型：把每个关闭项也纳入复验

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export interface OpsPromotionHandoffClosureVerificationItem {
  name: OpsPromotionHandoffClosureItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  closureDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}
```

这里的设计和前几版 package/certificate/receipt verification 保持一致：

- `validMatches` 检查关闭项状态有没有被改动。
- `sourceMatches` 检查关闭项引用的是不是原来的 API 来源。
- `digestMatches` 检查关闭项 digest 是否等于重新生成的 digest。
- `closureDigest` 是 closure 中记录的值，`recomputedDigest` 是本次复验重新算出的值。

## 3. 核心算法：重新生成 expected closure

文件：`src/services/opsPromotionArchiveBundle.ts`

```ts
export function createOpsPromotionHandoffClosureVerification(input: {
  receipt: OpsPromotionHandoffReceipt;
  receiptVerification: OpsPromotionHandoffReceiptVerification;
  closure: OpsPromotionHandoffClosure;
}): OpsPromotionHandoffClosureVerification {
  const expectedClosure = createOpsPromotionHandoffClosure({
    receipt: input.receipt,
    receiptVerification: input.receiptVerification,
  });
```

这段是 v36 的关键点：复验对象不会只看传入 closure 自己说什么，而是重新走一遍 v35 的 closure 生成逻辑。这样如果 closure 的 `closureName`、digest、状态、引用项、nextActions 被单独篡改，就会和 expected closure 对不上。

## 4. closure digest 的复算范围

```ts
const recomputedClosureDigest = digestStable(archiveHandoffClosureDigestPayload({
  closureName: input.closure.closureName,
  receiptName: input.closure.receiptName,
  certificateName: input.closure.certificateName,
  packageName: input.closure.packageName,
  archiveName: input.closure.archiveName,
  valid: input.closure.valid,
  state: input.closure.state,
  handoffReady: input.closure.handoffReady,
  receiptDigest: input.closure.receiptDigest.value,
  verifiedReceiptDigest: input.closure.verifiedReceiptDigest.value,
  certificateDigest: input.closure.certificateDigest.value,
  verifiedCertificateDigest: input.closure.verifiedCertificateDigest.value,
  packageDigest: input.closure.packageDigest.value,
  verifiedPackageDigest: input.closure.verifiedPackageDigest.value,
  sealDigest: input.closure.sealDigest.value,
  decision: input.closure.decision,
  verification: input.closure.verification,
  closureItems: input.closure.closureItems,
  nextActions: input.closure.nextActions,
}));
```

这里故意使用 `input.closure` 的实际字段来复算 digest。这样 `closureDigestValid` 回答的是：这个 closure 自己声明的 digest，是否真的覆盖了它当前这些字段。

然后再用 expected closure 做语义对比：

```ts
const checks = {
  closureDigestValid: input.closure.closureDigest.value === recomputedClosureDigest,
  coveredFieldsMatch: stableJson(input.closure.closureDigest.coveredFields)
    === stableJson(expectedClosure.closureDigest.coveredFields),
  closureItemsValid: closureItemChecks.length === expectedClosure.closureItems.length
    && closureItemChecks.every((item) => item.valid),
  closureNameMatches: input.closure.closureName === expectedClosure.closureName,
  receiptNameMatches: input.closure.receiptName === expectedClosure.receiptName,
  certificateNameMatches: input.closure.certificateName === expectedClosure.certificateName,
  packageNameMatches: input.closure.packageName === expectedClosure.packageName,
  archiveNameMatches: input.closure.archiveName === expectedClosure.archiveName,
  validMatches: input.closure.valid === expectedClosure.valid,
  stateMatches: input.closure.state === expectedClosure.state,
  handoffReadyMatches: input.closure.handoffReady === expectedClosure.handoffReady,
};
```

这就分成两层：

- digest 层：当前 closure 的摘要是否自洽。
- 业务层：当前 closure 是否等于按最新 receipt 链路重新生成出来的 closure。

## 5. 路由：新增 JSON 和 Markdown 两种输出

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get<{ Querystring: OpsPromotionArchiveQuery }>("/api/v1/ops/promotion-archive/handoff-closure/verification", {
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

路由内部仍然沿着完整归档链路向下生成：

```ts
const closure = createOpsPromotionHandoffClosure({
  receipt,
  receiptVerification,
});
const closureVerification = createOpsPromotionHandoffClosureVerification({
  receipt,
  receiptVerification,
  closure,
});
```

最后根据 `format=markdown` 决定返回机器可读 JSON 还是人可读报告：

```ts
if (request.query.format === "markdown") {
  reply.type("text/markdown; charset=utf-8");
  return renderOpsPromotionHandoffClosureVerificationMarkdown(closureVerification);
}

return closureVerification;
```

## 6. Dashboard：两个新按钮

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionHandoffClosureVerification">Closure Verification</button>
<button data-action="opsPromotionHandoffClosureVerificationReport">Closure Verification Report</button>
```

对应点击逻辑：

```js
if (action === "opsPromotionHandoffClosureVerification") {
  write(await api("/api/v1/ops/promotion-archive/handoff-closure/verification"));
}
if (action === "opsPromotionHandoffClosureVerificationReport") {
  const response = await fetch("/api/v1/ops/promotion-archive/handoff-closure/verification?format=markdown");
  if (!response.ok) {
    throw await response.json();
  }
  output.textContent = await response.text();
}
```

这样浏览器里可以直接看 JSON，也可以看 Markdown 报告。

## 7. 测试：空账本、blocked、approved 三种路径

文件：`test/opsPromotionDecision.test.ts`

独立测试先看空账本：

```ts
expect(emptyVerification.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  state: "not-started",
  handoffReady: false,
  checks: {
    closureDigestValid: true,
    coveredFieldsMatch: true,
    closureItemsValid: true,
  },
});
```

然后写入一个 blocked 决策，验证 digest 和复验 digest 一致：

```ts
expect(verification.json().closureDigest.value).toMatch(/^[a-f0-9]{64}$/);
expect(verification.json().closureDigest.value).toBe(verification.json().recomputedClosureDigest.value);
expect(verification.json().closureItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
expect(verification.json().closureItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
```

approved 全链路测试则验证最终交接可以收口：

```ts
expect(handoffClosureVerification.json().nextActions).toEqual([
  "Handoff closure verification is complete; store the verified closure digest with the final handoff record.",
]);
```

这说明当 readiness、runbook、baseline、promotion decision 全部满足时，v36 的最终复验会进入真正的 closed handoff 状态。

## 8. 小结

v36 把 v35 的最终 closure 从“生成结果”升级成“可复验结果”：

- API 多了 `/api/v1/ops/promotion-archive/handoff-closure/verification`。
- Markdown 多了 `# Promotion handoff closure verification` 报告。
- Dashboard 多了 Closure Verification 两个按钮。
- 测试从 75 条增加到 76 条，覆盖 empty、blocked、approved 三种主要路径。
