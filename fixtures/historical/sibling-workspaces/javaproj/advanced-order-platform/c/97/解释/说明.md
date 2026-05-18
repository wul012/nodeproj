# Java v97 说明：release approval rehearsal builder chain refactor

## 计划依据

本轮依据 Java 后续优化建议：

```text
建议 3: rehearsal dispatch table / builder chain 整理
风险 中
收益 高
```

v96 已经把 rehearsal 输入收进 `ReleaseApprovalRehearsalRequest`，本版继续整理 `ReleaseApprovalRehearsalResponseBuilder` 内部的长构建链。

## 合理性判断

合理，但需要克制。rehearsal builder 里最脆弱的地方不是字段值本身，而是：

```text
输入 normalize 铺满 build 方法
基础 hint 构建和 managed-audit receipt 链混在一起
verification hint 需要同时传 receipt 和对应 builder
后续新增 receipt 容易把主 builder 再次撑大
```

本版没有引入 sealed interface，也没有改 response record；只把内部链路拆成命名上下文，降低回归风险。

## 本版目标

新增：

```text
ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder
```

主 builder 内新增内部 record：

```text
NormalizedRequest
RehearsalSections
```

最终主流程变成：

```text
request -> NormalizedRequest
NormalizedRequest + evidence -> RehearsalSections
approvalRecordHandoffHint -> ReceiptChain
sections + receiptChain + failureTaxonomy -> response
```

## 代码改动

新增文件：

```text
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder.java
```

调整：

```text
ReleaseApprovalRehearsalResponseBuilder.build(...)
ReleaseApprovalRehearsalResponseBuilder.releaseApprovalVerificationHint(...)
```

主 builder 不再直接铺开以下 receipt 链：

```text
approvalHandoffVerificationMarker
managedAuditAdapterBoundaryReceipt
managedAuditProductionAdapterPrerequisiteReceipt
opsEvidenceServiceQualitySplitReceipt
managedAuditAdapterImplementationGuardReceipt
managedAuditExternalAdapterMigrationGuardReceipt
managedAuditSandboxAdapterApprovalSchemaGuardReceipt
managedAuditSandboxConnectionOperatorHandoffMarker
managedAuditSandboxConnectionPreflightEchoMarker
managedAuditSandboxConnectionPreconditionReceipt
managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt
managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt
```

## 行数结果

```text
ReleaseApprovalRehearsalResponseBuilder.java: 460 -> 408
ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder.java: 138
OpsEvidenceService.java: 606
```

## 契约保持

保持不变：

```text
/api/v1/ops/release-approval-rehearsal response 字段顺序和字段值
warning digest 输入顺序
managed audit receipt digest
read-only/no-ledger/no-SQL/no-connection 边界
HTTP header 名称和 normalize 行为
```

## 验证记录

本版执行：

```text
mvn -q -DskipTests compile
mvn -q "-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests" test
mvn -q -DskipTests package
git diff --check
```

## 清理记录

验证产生的 `target/` 会在最终收口前删除；不保留临时产物。

## 一句话总结

v97 把 rehearsal builder 的输入规范化、基础 sections 和 managed-audit receipt 链分开，外部契约和 digest 不变。
