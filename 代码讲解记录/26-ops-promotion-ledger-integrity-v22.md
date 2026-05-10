# V22：promotion ledger integrity 代码讲解

V19 能记录 promotion decision，V20 能复核单条 decision 的 digest，V21 能生成 evidence report。V22 继续往“账本可信度”推进：对整个 promotion decision ledger 做完整性检查，并生成一个滚动 SHA-256 root digest。

这一版仍然只检查 `orderops-node` 本地内存 ledger，不访问 Java 订单平台，也不访问 C++ mini-kv。

## 1. ledger integrity 返回结构

文件：`src/services/opsPromotionDecision.ts`

```ts
export interface OpsPromotionDecisionLedgerIntegrity {
  service: "orderops-node";
  generatedAt: string;
  valid: boolean;
  totalRecords: number;
  oldestSequence?: number;
  newestSequence?: number;
  rootDigest: {
    algorithm: "sha256";
    value: string;
  };
```

这里的 `rootDigest` 是整本 ledger 的摘要，不是某一条 decision 的摘要。它由每条记录按 sequence 顺序滚动计算出来。

后半部分是检查结果：

```ts
checks: {
  digestsValid: boolean;
  sequencesContiguous: boolean;
  sequenceOrder: "empty" | "contiguous" | "gapped";
};
records: OpsPromotionDecisionLedgerIntegrityRecord[];
```

V22 先做两类账本级检查：

- `digestsValid`：每条 decision 存储的 digest 是否等于重新计算 digest。
- `sequencesContiguous`：当前保留的记录 sequence 是否连续。

## 2. 单条 integrity record

文件：`src/services/opsPromotionDecision.ts`

```ts
export interface OpsPromotionDecisionLedgerIntegrityRecord {
  id: string;
  sequence: number;
  outcome: OpsPromotionDecision;
  readyForPromotion: boolean;
  digestValid: boolean;
  storedDigest: OpsPromotionDecisionRecord["digest"];
  recomputedDigest: OpsPromotionDecisionRecord["digest"];
  previousChainDigest?: string;
  chainDigest: string;
}
```

这部分是为了让调用方不只看到最终 `valid=true/false`，还能看到每一步链式计算的中间结果。

## 3. integrity 主流程

文件：`src/services/opsPromotionDecision.ts`

```ts
integrity(): OpsPromotionDecisionLedgerIntegrity {
  const ordered = [...this.records.values()].sort((left, right) => left.sequence - right.sequence);
  let previousChainDigest: string | undefined;
  const records = ordered.map((record) => {
    const recomputedValue = digestRecord(record);
    const chainDigest = digestChainStep(previousChainDigest, record, recomputedValue);
```

这段先把内存中的 records 按 sequence 从小到大排序。V19/V20 列表默认是最新在前，但做链式完整性检查必须从旧到新。

每条记录会重新计算 digest：

```ts
const recomputedValue = digestRecord(record);
```

然后把上一条 chain digest、当前记录 id、sequence、存储 digest、重算 digest 组合起来计算新的 chain digest：

```ts
const chainDigest = digestChainStep(previousChainDigest, record, recomputedValue);
```

## 4. 每条记录如何进入链

文件：`src/services/opsPromotionDecision.ts`

```ts
const integrityRecord: OpsPromotionDecisionLedgerIntegrityRecord = {
  id: record.id,
  sequence: record.sequence,
  outcome: record.outcome,
  readyForPromotion: record.readyForPromotion,
  digestValid: record.digest.value === recomputedValue,
  storedDigest: { ...record.digest },
  recomputedDigest: {
    algorithm: "sha256",
    value: recomputedValue,
  },
  previousChainDigest,
  chainDigest,
};
```

`digestValid` 还是单条记录校验；`chainDigest` 是 ledger 级校验。二者分开返回，是为了排查问题时更直接：

- 单条 digest 错：说明某条 decision 内容和保存时摘要不一致。
- sequence 不连续：说明当前账本顺序不完整。
- root digest 变了：说明账本整体内容或顺序变了。

## 5. 账本级 valid 如何判断

文件：`src/services/opsPromotionDecision.ts`

```ts
const digestsValid = records.every((record) => record.digestValid);
const sequencesContiguous = hasContiguousSequences(ordered);
```

最终返回：

```ts
valid: digestsValid && sequencesContiguous,
```

也就是说，V22 的账本完整性需要同时满足：

```text
每条记录 digest 都有效
并且
当前保留记录的 sequence 连续
```

## 6. 空 ledger 的 root digest

文件：`src/services/opsPromotionDecision.ts`

```ts
rootDigest: {
  algorithm: "sha256",
  value: previousChainDigest ?? digestEmptyLedger(),
},
```

如果还没有任何 promotion decision，`previousChainDigest` 就不存在。V22 给空账本一个稳定 root：

```ts
function digestEmptyLedger(): string {
  return createHash("sha256").update("orderops-node:promotion-decisions:empty").digest("hex");
}
```

这样空账本也能返回完整的 integrity 响应，而不是特殊报错。

## 7. 每一步 chain digest 怎么算

文件：`src/services/opsPromotionDecision.ts`

```ts
function digestChainStep(
  previousChainDigest: string | undefined,
  record: OpsPromotionDecisionRecord,
  recomputedDigest: string,
): string {
  return createHash("sha256")
    .update(stableJson({
      previousChainDigest: previousChainDigest ?? "genesis",
      id: record.id,
      sequence: record.sequence,
      storedDigest: record.digest.value,
      recomputedDigest,
    }))
    .digest("hex");
}
```

第一条记录的上一跳是 `"genesis"`。后续每一条都会引用前一条的 `chainDigest`，所以记录顺序也会进入 root digest。

## 8. sequence 连续性检查

文件：`src/services/opsPromotionDecision.ts`

```ts
function hasContiguousSequences(records: OpsPromotionDecisionRecord[]): boolean {
  if (records.length === 0) {
    return true;
  }

  return records.every((record, index) => record.sequence === records[0].sequence + index);
}
```

注意这里不是强制从 `1` 开始，而是检查“当前保留的记录”是否连续。因为 ledger 有容量上限，旧记录可能被 trim 掉；只要保留窗口内连续，就算当前窗口完整。

## 9. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

```ts
app.get("/api/v1/ops/promotion-decisions/integrity", async () => deps.opsPromotionDecisions.integrity());
```

这个接口只读内存中的 `OpsPromotionDecisionLedger`，不会触发 proxy route，也不会访问 Java / mini-kv。

## 10. Dashboard 入口

文件：`src/ui/dashboard.ts`

```html
<button data-action="opsPromotionIntegrity">Ledger Integrity</button>
```

按钮逻辑很直接：

```js
if (action === "opsPromotionIntegrity") {
  write(await api("/api/v1/ops/promotion-decisions/integrity"));
}
```

它会把 JSON 直接写到 Dashboard output 区，适合本地调试时快速看 root digest 和每条记录链。

## 11. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

先测空账本：

```ts
expect(empty.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  totalRecords: 0,
  checks: {
    digestsValid: true,
    sequencesContiguous: true,
    sequenceOrder: "empty",
  },
});
```

再创建两条 decision 后检查账本：

```ts
expect(integrity.json()).toMatchObject({
  service: "orderops-node",
  valid: true,
  totalRecords: 2,
  oldestSequence: 1,
  newestSequence: 2,
  checks: {
    digestsValid: true,
    sequencesContiguous: true,
    sequenceOrder: "contiguous",
  },
});
```

检查 chain 连接：

```ts
expect(integrity.json().records[1]).toMatchObject({
  id: second.json().id,
  sequence: 2,
  digestValid: true,
  storedDigest: second.json().digest,
  recomputedDigest: second.json().digest,
  previousChainDigest: integrity.json().records[0].chainDigest,
});
```

最后确认 root digest 就是最后一条记录的 chain digest：

```ts
expect(integrity.json().records[1].chainDigest).toBe(integrity.json().rootDigest.value);
```

## 一句话总结

V22 把 promotion decision ledger 从“单条可复核”推进到“整本账本可复核”：每条 decision 的 digest、记录顺序和最终 root digest 都能被本地检查。
