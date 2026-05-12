# 73. Node v69：Execution gate archive record

## 模块角色

v69 新增的是本地执行门禁归档账本：

```text
src/services/operationApprovalExecutionGateArchive.ts
```

它接收 v68 生成的 `OperationApprovalExecutionGatePreview`，把这次执行前门禁预览固化成一条 archive record。

## 归档记录结构

核心字段集中在 `OperationApprovalExecutionGateArchiveRecord`：

```ts
export interface OperationApprovalExecutionGateArchiveRecord {
  service: "orderops-node";
  archiveId: string;
  sequence: number;
  createdAt: string;
  reviewer: string;
  reviewerNote: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalExecutionGatePreview["state"];
  previewOnly: true;
  executionAllowed: false;
  gateDigest: OperationApprovalExecutionGatePreview["gateDigest"];
  bundleDigest: OperationApprovalExecutionGatePreview["bundleDigest"];
```

这里最重要的是：归档只记录门禁预览，不把它升级成执行命令。

## 安全边界

v69 继续把真实执行关死：

```ts
previewOnly: true as const,
executionAllowed: false as const,
```

这和 v68 的 preview 保持一致。archive record 只是证明“当时看过并归档了这份 gate preview”。

## 摘要生成

`create` 会复制当前 preview 的 digest 和关键结论：

```ts
gateDigest: structuredClone(input.preview.gateDigest),
bundleDigest: structuredClone(input.preview.bundleDigest),
summary: structuredClone(input.preview.summary),
gateChecks: structuredClone(input.preview.gateChecks),
hardBlockers: [...input.preview.hardBlockers],
warnings: [...input.preview.warnings],
nextActions: [...input.preview.nextActions],
preview: structuredClone(input.preview),
```

因此后续 v70 可以复核：归档时记录的 `gateDigest`、`bundleDigest` 是否还能和当前 request/decision/evidence 链路对齐。

## 归档 digest

archive record 自己也有 SHA-256 摘要：

```ts
archiveDigest: digestOperationApprovalExecutionGateArchive(recordWithoutDigest),
```

摘要覆盖字段包含 reviewer、note、requestId、decisionId、gateDigest、bundleDigest、summary、gateChecks 和 preview 快照。

## 路由入口

v69 新增三个入口：

```text
POST /api/v1/operation-approval-requests/:requestId/execution-gate-archive
GET  /api/v1/operation-approval-execution-gate-archives
GET  /api/v1/operation-approval-execution-gate-archives/:archiveId?format=markdown
```

创建归档时路由会重新走同一条证据链：

```ts
const report = await evidenceService.createReport(...);
const verification = createOperationApprovalEvidenceVerification(report);
const bundle = createOperationApprovalHandoffBundle(report, verification);
return createOperationApprovalExecutionGatePreview(bundle);
```

这样 archive record 不会绕过 v66-v68 已经建立的 request、decision、evidence、bundle、gate preview 链路。

## 一句话总结

v69 把“执行门禁预览”固化成可查询、可截图、可归档的本地记录，但仍不做真实执行。
