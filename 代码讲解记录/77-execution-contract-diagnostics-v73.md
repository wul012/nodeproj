# 77. Node v73：Execution contract mismatch diagnostics

## 模块角色

v73 新增 `operationApprovalExecutionContractDiagnostics.ts`。它的职责不是修复证据链，而是把 mismatch 讲清楚。

输入仍然是：

```ts
archive: OperationApprovalExecutionGateArchiveRecord
archiveVerification: OperationApprovalExecutionGateArchiveVerification
```

输出是一份 diagnostics report，里面有 `code`、`category`、`field`、`expected`、`actual` 和 `message`。

## 诊断入口

核心函数：

```ts
export function createOperationApprovalExecutionContractDiagnostics(
  archive: OperationApprovalExecutionGateArchiveRecord,
  archiveVerification: OperationApprovalExecutionGateArchiveVerification,
): OperationApprovalExecutionContractDiagnostics {
```

它组合四类诊断：

```ts
const diagnostics = [
  ...diagnoseArchiveVerification(archive, archiveVerification),
  ...diagnoseArchivePreviewSnapshot(archive),
  ...diagnoseJavaExecutionContract(archive),
  ...diagnoseMiniKvCheckJsonContract(archive),
];
```

这说明 v73 不只看一个 digest，而是同时看 archive verification、archive snapshot、Java contract、mini-kv CHECKJSON contract。

## Archive verification 诊断

例如 gate digest 不一致时：

```ts
addIf(diagnostics, !verification.checks.gateDigestMatchesPreview, {
  code: "GATE_DIGEST_PREVIEW_MISMATCH",
  category: "gate-preview",
  field: "gateDigest",
  source: "archive.preview",
  expected: renderDigest(verification.archivedPreviewGateDigest),
  actual: renderDigest(verification.storedGateDigest),
  message: "Stored gate digest differs from the archived preview gate digest.",
});
```

这比单纯的 `valid=false` 更有用，因为它直接告诉你是 gate digest 和 archived preview 不一致。

## Archive snapshot 诊断

v73 会比较 archive summary 和 archived gate preview summary：

```ts
addSnapshotMismatch(diagnostics, archive, "miniKvCheckExecutionAllowed", "mini-kv-checkjson-contract");
```

如果有人改了 archive summary，但没有同步 preview snapshot，就会出现：

```text
MINI_KV_CHECK_EXECUTION_ALLOWED_ARCHIVE_PREVIEW_MISMATCH
```

这类 code 专门用来定位“归档摘要和原始快照不一致”。

## Java execution-contract 诊断

Java replay 场景只在这个条件下适用：

```ts
archive.summary.target === "order-platform"
  && archive.summary.action === "failed-event-replay-simulation"
```

Java contract 会检查：

```ts
JAVA_CONTRACT_DIGEST_INVALID
JAVA_EXECUTION_CONTRACT_GATE_CHECK_FAILED
JAVA_REPLAY_PRECONDITIONS_NOT_SATISFIED
JAVA_DIGEST_VERIFICATION_MODE_MISMATCH
```

这些 code 对应 v71/v72 已经接入的 contractDigest、gate check、precondition 和 verification mode。

## mini-kv CHECKJSON 诊断

mini-kv 场景会检查：

```ts
MINIKV_COMMAND_DIGEST_INVALID
MINIKV_CHECKJSON_GATE_CHECK_FAILED
MINIKV_CHECKJSON_NOT_READ_ONLY
MINIKV_CHECKJSON_EXECUTION_ALLOWED
```

其中最关键的是：

```ts
archive.summary.miniKvCheckReadOnly !== true
archive.summary.miniKvCheckExecutionAllowed !== false
```

也就是说，v73 明确防止 CHECKJSON 从“只读执行契约”滑成“允许执行”的信号。

## 路由层

路由新增：

```ts
GET /api/v1/operation-approval-execution-gate-archives/:archiveId/execution-contract-diagnostics
```

实现方式仍然是读取 archive、创建 verification、生成 diagnostics：

```ts
const diagnostics = createOperationApprovalExecutionContractDiagnostics(record, verification);
```

没有重新请求上游，也没有触发真实执行。

## 一句话总结

v73 把 execution-contract archive bundle 从“可归档”推进到“可定位问题”：digest 或 contract 字段不一致时，Node 能告诉你具体坏在哪一环。
