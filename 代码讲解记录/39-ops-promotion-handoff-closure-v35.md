# 39. V35 promotion handoff closure 代码讲解

V34 已经能复核 `handoff receipt`，证明最终收据的 `receiptDigest` 和五个 milestone 都能对上当前链路。

V35 做的是“关闭交接”：生成 `promotion handoff closure`，把 verified receipt、certificate、package、seal 的关键指纹收束成一个 `closureDigest`。它适合放在最终交接记录里，表示这条本地 promotion handoff 链路可以被关闭。

整体链路：

```text
handoff package
 -> handoff package verification
 -> handoff certificate
 -> handoff certificate verification
 -> handoff receipt
 -> handoff receipt verification
 -> handoff closure
```

## 1. closure item 类型

文件：`src/services/opsPromotionArchiveBundle.ts`

V35 先定义 closure 要记录的 item 名称。

```ts
export type OpsPromotionHandoffClosureItemName =
  | "handoff-receipt"
  | "verified-handoff-receipt"
  | "handoff-certificate"
  | "verified-handoff-certificate"
  | "handoff-package"
  | "verified-handoff-package"
  | "archive-seal";
```

每个 item 只保留交接关闭最需要的三类信息。

```ts
export interface OpsPromotionHandoffClosureItem {
  name: OpsPromotionHandoffClosureItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}
```

这比完整 receipt 更轻，适合作为最终 closeout 的摘要列表。

## 2. closure 主体结构

文件：`src/services/opsPromotionArchiveBundle.ts`

`OpsPromotionHandoffClosure` 是 V35 的核心输出。

```ts
export interface OpsPromotionHandoffClosure {
  service: "orderops-node";
  generatedAt: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  closureDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
```

它把 receipt、certificate、package、seal 的指纹都保存下来。

```ts
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedReceiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
```

这个结构的重点是：closure 不替代 receipt，而是把 verified receipt 的关键链路压成最终关闭摘要。

## 3. verification 摘要

文件：`src/services/opsPromotionArchiveBundle.ts`

closure 里的 verification 字段来自 V34 receipt verification，但只保留 closeout 需要的摘要。

```ts
  verification: {
    receiptVerified: boolean;
    receiptDigestValid: boolean;
    milestoneReferencesValid: boolean;
    certificateReferenceValid: boolean;
    packageReferenceValid: boolean;
    sealReferenceValid: boolean;
    milestoneCount: number;
    closureItemCount: number;
  };
```

这里的含义是：

```text
receiptVerified            -> V34 receipt verification 是否整体通过
receiptDigestValid         -> receiptDigest 是否能复算一致
milestoneReferencesValid   -> receipt milestones 是否都对得上
certificateReferenceValid  -> certificate/verified certificate digest 是否对得上
packageReferenceValid      -> package/verified package digest 是否对得上
sealReferenceValid         -> seal digest 是否对得上
```

## 4. createOpsPromotionHandoffClosure

文件：`src/services/opsPromotionArchiveBundle.ts`

V35 的创建入口只接收 receipt 和 receiptVerification。

```ts
export function createOpsPromotionHandoffClosure(input: {
  receipt: OpsPromotionHandoffReceipt;
  receiptVerification: OpsPromotionHandoffReceiptVerification;
}): OpsPromotionHandoffClosure {
  const closureName = `promotion-closure-${input.receiptVerification.recomputedReceiptDigest.value.slice(0, 12)}`;
```

`closureName` 用 verified receipt digest 的前 12 位命名，说明 closure 是从复核后的 receipt 收束出来的。

## 5. 生成 closure items

文件：`src/services/opsPromotionArchiveBundle.ts`

入口函数先生成 item 列表。

```ts
  const closureItems = archiveHandoffClosureItems(input.receipt, input.receiptVerification);
```

`archiveHandoffClosureItems` 生成七个 item。

```ts
function archiveHandoffClosureItems(
  receipt: OpsPromotionHandoffReceipt,
  receiptVerification: OpsPromotionHandoffReceiptVerification,
): OpsPromotionHandoffClosureItem[] {
  return [
    {
      name: "handoff-receipt",
      valid: receipt.valid && receiptVerification.checks.receiptDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt",
      digest: {
        algorithm: "sha256",
        value: receipt.receiptDigest.value,
      },
    },
```

第二个 item 是 verified receipt。

```ts
    {
      name: "verified-handoff-receipt",
      valid: receiptVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      digest: {
        algorithm: "sha256",
        value: receiptVerification.recomputedReceiptDigest.value,
      },
    },
```

后面继续记录 certificate、verified certificate、package、verified package 和 archive seal。

```ts
    {
      name: "verified-handoff-package",
      valid: receiptVerification.checks.verifiedPackageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package/verification",
      digest: {
        algorithm: "sha256",
        value: receipt.verifiedPackageDigest.value,
      },
    },
    {
      name: "archive-seal",
      valid: receiptVerification.checks.sealDigestMatches,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: receipt.sealDigest.value,
      },
    },
```

## 6. valid 和 handoffReady

文件：`src/services/opsPromotionArchiveBundle.ts`

closure 的有效性要求 receipt、receipt verification、digest 对齐和所有 closure item 都成立。

```ts
  const valid = input.receipt.valid
    && input.receiptVerification.valid
    && input.receipt.receiptDigest.value === input.receiptVerification.recomputedReceiptDigest.value
    && closureItems.every((item) => item.valid);
  const handoffReady = valid && input.receipt.handoffReady && input.receiptVerification.handoffReady;
```

这保证了 closure 不会越过 receipt verification 单独宣布 ready。

## 7. closureDigest 覆盖字段

文件：`src/services/opsPromotionArchiveBundle.ts`

V35 先构造 digest payload。

```ts
  const digestPayload = archiveHandoffClosureDigestPayload({
    closureName,
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady,
    receiptDigest: input.receipt.receiptDigest.value,
    verifiedReceiptDigest: input.receiptVerification.recomputedReceiptDigest.value,
    certificateDigest: input.receipt.certificateDigest.value,
    verifiedCertificateDigest: input.receipt.verifiedCertificateDigest.value,
    packageDigest: input.receipt.packageDigest.value,
    verifiedPackageDigest: input.receipt.verifiedPackageDigest.value,
    sealDigest: input.receipt.sealDigest.value,
    decision: input.receipt.decision,
    verification,
    closureItems,
    nextActions,
  });
```

返回对象公开 `coveredFields`。

```ts
    closureDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "receiptDigest",
        "verifiedReceiptDigest",
        "certificateDigest",
        "verifiedCertificateDigest",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "closureItems",
        "nextActions",
      ],
    },
```

`closureDigest` 就是 V35 最终交接关闭记录里的摘要。

## 8. closure digest payload

文件：`src/services/opsPromotionArchiveBundle.ts`

payload 会把 closure item 压缩成稳定值。

```ts
function archiveHandoffClosureDigestPayload(input: {
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  receiptDigest: string;
  verifiedReceiptDigest: string;
  certificateDigest: string;
  verifiedCertificateDigest: string;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffClosure["decision"];
  verification: OpsPromotionHandoffClosure["verification"];
  closureItems: OpsPromotionHandoffClosureItem[];
  nextActions: string[];
}) {
  return {
    closureName: input.closureName,
    receiptName: input.receiptName,
```

item 部分只保留 name、valid、source、digest value。

```ts
    closureItems: input.closureItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
    })),
    nextActions: input.nextActions,
  };
}
```

## 9. nextActions

文件：`src/services/opsPromotionArchiveBundle.ts`

closure 的 nextActions 是最终关闭动作。

```ts
function archiveHandoffClosureNextActions(
  receipt: OpsPromotionHandoffReceipt,
  receiptVerification: OpsPromotionHandoffReceiptVerification,
  valid: boolean,
): string[] {
  if (!receiptVerification.valid) {
    return ["Resolve handoff receipt verification failures before closing the promotion handoff."];
  }

  if (!valid) {
    return ["Regenerate the handoff closure from a verified receipt before marking the handoff closed."];
  }

  if (receipt.handoffReady) {
    return ["Promotion handoff closure is ready; record the closure digest and mark the handoff closed."];
  }

  return receiptVerification.nextActions;
}
```

如果 ready，就提示记录 closure digest 并标记 handoff closed。

## 10. Markdown 渲染

文件：`src/services/opsPromotionArchiveBundle.ts`

V35 提供 Markdown。

```ts
export function renderOpsPromotionHandoffClosureMarkdown(closure: OpsPromotionHandoffClosure): string {
  const lines = [
    "# Promotion handoff closure",
    "",
    `- Service: ${closure.service}`,
    `- Generated at: ${closure.generatedAt}`,
    `- Closure name: ${closure.closureName}`,
    `- Receipt name: ${closure.receiptName}`,
    `- Certificate name: ${closure.certificateName}`,
    `- Package name: ${closure.packageName}`,
    `- Archive name: ${closure.archiveName}`,
    `- State: ${closure.state}`,
    `- Valid: ${closure.valid}`,
    `- Handoff ready: ${closure.handoffReady}`,
    `- Closure digest: ${closure.closureDigest.algorithm}:${closure.closureDigest.value}`,
```

closure items 的渲染函数：

```ts
function renderHandoffClosureItems(items: OpsPromotionHandoffClosureItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Digest: ${item.digest.algorithm}:${item.digest.value}`,
    `- Source: ${item.source}`,
    "",
  ]);
}
```

## 11. 路由入口

文件：`src/routes/opsSummaryRoutes.ts`

新增接口：

```text
GET /api/v1/ops/promotion-archive/handoff-closure
GET /api/v1/ops/promotion-archive/handoff-closure?format=markdown
```

路由先组装 receipt 和 receipt verification，再生成 closure。

```ts
    const receiptVerification = createOpsPromotionHandoffReceiptVerification({
      certificate,
      certificateVerification,
      receipt,
    });
    const closure = createOpsPromotionHandoffClosure({
      receipt,
      receiptVerification,
    });
```

Markdown 分支：

```ts
    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderOpsPromotionHandoffClosureMarkdown(closure);
    }

    return closure;
```

这条接口只读取 Node 本地状态，不会调用 Java 或 mini-kv。

## 12. Dashboard 入口

文件：`src/ui/dashboard.ts`

按钮：

```html
        <button data-action="opsPromotionHandoffClosure">Handoff Closure</button>
        <button data-action="opsPromotionHandoffClosureReport">Handoff Closure Report</button>
```

事件：

```js
        if (action === "opsPromotionHandoffClosure") {
          write(await api("/api/v1/ops/promotion-archive/handoff-closure"));
        }
        if (action === "opsPromotionHandoffClosureReport") {
          const response = await fetch("/api/v1/ops/promotion-archive/handoff-closure?format=markdown");
```

## 13. 测试覆盖

文件：`test/opsPromotionDecision.test.ts`

V35 新增 closure 的 JSON/Markdown 测试。

```ts
  it("builds a promotion handoff closure as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));
```

空 ledger 也应该有完整 closure。

```ts
      expect(emptyClosure.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          receiptVerified: true,
          receiptDigestValid: true,
          milestoneReferencesValid: true,
```

closure item 顺序也有断言。

```ts
      expect(emptyClosure.json().closureItems.map((item: { name: string }) => item.name)).toEqual([
        "handoff-receipt",
        "verified-handoff-receipt",
        "handoff-certificate",
        "verified-handoff-certificate",
        "handoff-package",
        "verified-handoff-package",
        "archive-seal",
      ]);
```

approved 链路里补了 ready closure。

```ts
      expect(handoffClosure.json()).toMatchObject({
        valid: true,
        state: "ready",
        handoffReady: true,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "approved",
        },
        verification: {
          receiptVerified: true,
          receiptDigestValid: true,
```

最终 next action：

```ts
      expect(handoffClosure.json().nextActions).toEqual([
        "Promotion handoff closure is ready; record the closure digest and mark the handoff closed.",
      ]);
```

## 14. 一句话总结

V35 把 verified receipt 收口成 `handoff closure`：用 `closureDigest` 封住最终关闭记录，并用七个 closure item 记录 receipt、verified receipt、certificate、verified certificate、package、verified package、archive seal 的关键指纹。
