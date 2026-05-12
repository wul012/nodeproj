# 74. Node v70：Execution gate archive verification

## 模块角色

v70 在 v69 archive record 之上增加复核能力，核心仍在：

```text
src/services/operationApprovalExecutionGateArchive.ts
```

新增函数是：

```ts
export function createOperationApprovalExecutionGateArchiveVerification(
  record: OperationApprovalExecutionGateArchiveRecord,
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
): OperationApprovalExecutionGateArchiveVerification {
```

它不重新执行上游探测，而是复核归档记录内部 digest 与当前 Node 内存账本中的 request/decision 是否一致。

## 为什么不重新打上游

v70 的目标是 archive verification，不是重新生成 evidence。archive record 已保存了当时的 gate preview 快照：

```ts
preview: OperationApprovalExecutionGatePreview;
```

复核时比较归档字段和这个快照即可：

```ts
gateDigestMatchesPreview: record.gateDigest.value === record.preview.gateDigest.value,
bundleDigestMatchesPreview: record.bundleDigest.value === record.preview.bundleDigest.value,
requestIdMatchesPreview: record.requestId === record.preview.requestId,
decisionIdMatchesPreview: (record.decisionId ?? "missing") === (record.preview.decisionId ?? "missing"),
```

这样不会因为上游响应里的采样时间或 latency 变化导致 digest 抖动。

## archive digest 复算

v70 会重新计算 archive record 自己的 digest：

```ts
const recomputedArchiveDigest = digestOperationApprovalExecutionGateArchive(stripArchiveDigest(record));
```

然后检查：

```ts
archiveDigestValid: record.archiveDigest.value === recomputedArchiveDigest.value,
```

如果 archive record 被改过，复算结果就会不一致。

## request/decision 对齐

除了内部 digest，v70 还会对齐当前 Node ledger：

```ts
requestLedgerMatches: request.requestId === record.requestId
  && request.intentId === record.intentId
  && request.status === record.summary.requestStatus,
```

decision 也会复核：

```ts
decisionLedgerMatches: decision === undefined
  ? record.decisionId === undefined && record.summary.decision === "missing"
  : decision.decisionId === record.decisionId
    && decision.requestId === record.requestId
    && decision.intentId === record.intentId
    && decision.decision === record.summary.decision,
```

这说明 archive record 没有脱离当前 approval request / reviewer decision 链路。

## 安全边界

v70 继续要求 archive 和 preview 都没有执行权限：

```ts
executionAllowedStillFalse: record.executionAllowed === false && record.preview.executionAllowed === false,
previewOnlyStillTrue: record.previewOnly === true && record.preview.previewOnly === true,
```

这两个检查是 v68-v70 主线的底线：可以预览、归档、复核，但仍不执行。

## 路由入口

新增 endpoint：

```text
GET /api/v1/operation-approval-execution-gate-archives/:archiveId/verification
GET /api/v1/operation-approval-execution-gate-archives/:archiveId/verification?format=markdown
```

路由从 archive ledger 读取记录，再从 request/decision ledger 读取当前审批链路：

```ts
const verification = createOperationApprovalExecutionGateArchiveVerification(
  record,
  deps.operationApprovalRequests.get(record.requestId),
  deps.operationApprovalDecisions.getByRequest(record.requestId),
);
```

## 一句话总结

v70 把 v69 的本地归档记录升级成可复核证据：archive digest、gate digest、bundle digest、request/decision 链路都能被重新检查，但仍不进入真实执行。
