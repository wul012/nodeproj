# 76. Node v72：Execution contract archive bundle

## 模块角色

v72 新增 `operationApprovalExecutionContractArchiveBundle.ts`，专门把 v71 已接入的 execution-contract 证据从大 archive record 中抽出来，整理成一份更适合归档和审阅的 bundle。

它服务的是这条链路：

```text
execution gate archive record
 -> archive verification
 -> execution contract archive bundle
```

## Bundle 入口

核心入口是：

```ts
export function createOperationApprovalExecutionContractArchiveBundle(
  archive: OperationApprovalExecutionGateArchiveRecord,
  archiveVerification: OperationApprovalExecutionGateArchiveVerification,
): OperationApprovalExecutionContractArchiveBundle {
```

这里不重新请求 Java 或 mini-kv，只读取已经归档的 `archive` 和重新计算出的 `archiveVerification`。这点很重要：v72 是归档整理，不是再次探测上游。

## 引用链

bundle 会先计算 archive verification digest：

```ts
const archiveVerificationDigest = digestOperationApprovalExecutionGateArchiveVerification(archiveVerification);
const references = createReferences(archive, archiveVerification, archiveVerificationDigest);
```

然后在 summary 中集中展示：

```ts
archiveDigest: digestRef(archive.archiveDigest),
gateDigest: digestRef(archive.gateDigest),
handoffBundleDigest: digestRef(archive.bundleDigest),
archiveVerificationDigest: digestRef(archiveVerificationDigest),
```

这就是 v72 的核心价值：让 archive、gate、handoff、verification 的 digest 关系可以直接被引用。

## Java execution-contract 引用

Java 场景只在 failed-event replay simulation 上适用：

```ts
const javaApplicable = archive.summary.target === "order-platform"
  && archive.summary.action === "failed-event-replay-simulation";
```

Java contract 引用要求：

```ts
present: javaApplicable && javaDigest !== undefined && archive.summary.javaExecutionContractStatus === "available",
valid: !javaApplicable || (
  javaDigest !== undefined
  && archive.gateChecks.javaExecutionContractEvidenceValid
  && archive.gateChecks.javaReplayPreconditionsSatisfiedOk
),
```

也就是说：Java contractDigest 必须存在，且 gate check 证明 execution contract 与 replay precondition 都通过。

## mini-kv CHECKJSON 引用

mini-kv 场景只在 `target === "mini-kv"` 时适用：

```ts
const miniKvApplicable = archive.summary.target === "mini-kv";
```

CHECKJSON 没有 Java 那样的 `sha256:...` contractDigest，所以 Node 对关键字段做一份快照 digest：

```ts
const miniKvContractDigest = digestReferenceSnapshot({
  commandDigest: archive.summary.miniKvCommandDigest ?? null,
  readOnly: archive.summary.miniKvCheckReadOnly ?? null,
  executionAllowed: archive.summary.miniKvCheckExecutionAllowed ?? null,
  durability: archive.summary.miniKvCheckDurability ?? null,
});
```

valid 条件仍然来自 v71 的 gate checks：

```ts
archive.gateChecks.miniKvExecutionContractEvidenceValid
&& archive.gateChecks.miniKvCheckReadOnlyOk
&& archive.gateChecks.miniKvCheckExecutionAllowedOk
```

这保证 bundle 里保存的是“只读、不可执行”的 CHECKJSON 合同快照。

## 路由层

路由新增：

```ts
app.get("/api/v1/operation-approval-execution-gate-archives/:archiveId/execution-contract-bundle", ...)
```

它读取 archive，创建 verification，再生成 bundle：

```ts
const record = deps.operationApprovalExecutionGateArchives.get(request.params.archiveId);
const verification = createOperationApprovalExecutionGateArchiveVerification(...);
const bundle = createOperationApprovalExecutionContractArchiveBundle(record, verification);
```

Markdown 输出也一起支持，方便归档到 `a/<版本>/解释`。

## 一句话总结

v72 没有让 Node 更接近真实执行，而是让“为什么现在还不能/可以进入执行前审阅”的 execution-contract 证据链更容易归档、引用和复核。
