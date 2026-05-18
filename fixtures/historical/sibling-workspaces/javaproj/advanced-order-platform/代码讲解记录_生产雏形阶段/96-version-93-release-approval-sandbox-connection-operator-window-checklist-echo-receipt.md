# 第九十三版代码讲解：release approval sandbox connection operator window checklist echo receipt

本版目标是承接 Node v238 `managed-audit-manual-sandbox-connection-operator-window-checklist.v1`，在 Java release approval rehearsal 中新增一份只读 echo receipt。它只回显 checklist 的字段、数量、approval item id、step phase 和 pause code，供 Node v239 做三方 evidence verification；它不是连接许可，也不会打开 managed audit sandbox connection。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v237-post-readiness-gate-roadmap.md
```

计划要求 Java v93 做：

```text
operator window checklist echo receipt
只读回显 Node v238 checklist 字段
不写 approval ledger
不执行 SQL
不打开 managed audit sandbox connection
```

同时延续前一轮质量要求：新逻辑不堆回 `OpsEvidenceService`，字段继续按 checklist field / approval boundary / credential boundary / execution boundary 分组。

## 新增 receipt

新增 builder：

```text
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceiptBuilder.java
```

新增响应字段：

```text
managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt
```

receipt 版本：

```text
java-release-approval-rehearsal-managed-audit-sandbox-connection-operator-window-checklist-echo-receipt.v1
```

它消费的 Node 侧材料：

```text
Node v238
managed-audit-manual-sandbox-connection-operator-window-checklist.v1
/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist
manual-sandbox-connection-operator-window-checklist-ready
```

给下一步 Node 使用的目标：

```text
Node v239
managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1
```

## checklist field boundary

Java v93 回显 Node v238 的 checklist 字段和计数：

```text
requiredApprovalCount=3
checklistStepCount=8
pauseConditionCount=8
forbiddenOperationCount=6
timeoutBudgetMs=15000
windowDurationMinutes=30
```

关键字段仍是 handle / marker / id：

```text
ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID
ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID
timeoutBudgetMs
ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT
```

边界值保持：

```text
operatorChecklistReadOnly=true
checklistCreatesConnectionCommand=false
windowOpenByDefault=false
manualReviewRequired=true
```

## approval boundary

approval item 只做回显，不创建 Java 审批决定：

```text
release-owner
security-reviewer
operations-owner
```

对应边界：

```text
approvalItemCount=3
allApprovalItemsRequired=true
blocksConnectionIfMissing=true
javaCreatesApprovalDecision=false
approvalLedgerWrittenByJava=false
```

## credential 和 execution boundary

credential 仍然只允许 handle：

```text
credentialHandleOnly=true
credentialValueIncludedInChecklist=false
credentialValueReadByJava=false
credentialValueStoredByJava=false
productionCredentialAllowed=false
```

Java 执行边界全部保持关闭：

```text
actualConnectionAttemptedByJava=false
externalManagedAuditConnectionOpenedByJava=false
schemaMigrationSqlExecutedByJava=false
approvalLedgerWrittenByJava=false
managedAuditStoreWrittenByJava=false
nodeAutoStartAllowed=false
miniKvPermissionRequestedByJava=false
productionWindowOpenedByJava=false
```

这意味着 v93 仍只是 evidence echo，不会触发连接、SQL、ledger、rollback、restore、deployment 或服务自启动。

## Builder 布尔参数优化

本版没有把长布尔构造链继续扩散。新增 v93 builder 内部使用这些命名 record/factory：

```text
ChecklistFieldBoundaryFields.nodeV238OperatorWindow()
ApprovalBoundaryFlags.requiredOperatorWindowApprovals()
CredentialBoundaryFlags.handleOnly()
ExecutionBoundaryFlags.noExecutionEffects()
```

同时把 v92 `ReleaseApprovalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceiptBuilder` 里已有的三段位置布尔构造改成命名 flags record：

```text
EnvelopeFieldBoundaryFields.nodeV236EnvelopeFields()
CredentialBoundaryFlags.handleOnly()
ExecutionBoundaryFlags.noExecutionEffects()
```

这样外层 builder 方法读的是业务语义，不再靠连续 `true/false` 的位置来猜字段含义。

## verification hint

`verificationHint.responseSchemaVersion` 升级为：

```text
java-release-approval-rehearsal-response-schema.v21
```

新增 schema field：

```text
managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt
```

warning digest 纳入：

```text
managedAuditSandboxConnectionOperatorWindowChecklistEchoReceiptWarnings
sandboxConnectionOperatorWindowChecklistEchoReceiptDigest
sandboxConnectionOperatorWindowChecklistCredentialValueIncluded
sandboxConnectionOperatorWindowChecklistCredentialValueReadByJava
sandboxConnectionOperatorWindowChecklistActualConnectionAttemptedByJava
sandboxConnectionOperatorWindowChecklistSchemaMigrationSqlExecutedByJava
sandboxConnectionOperatorWindowChecklistApprovalLedgerWrittenByJava
```

proof claims 继续证明 no-write / no-connection：

```text
managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.credentialBoundary.credentialValueIncludedInChecklist=false
managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.credentialBoundary.credentialValueReadByJava=false
managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false
managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false
```

## 测试覆盖

本版补充：

```text
OpsEvidenceServiceTests
OpsOverviewIntegrationTests
```

覆盖默认缺少上游 header 时：

```text
readyForNodeV239ManualSandboxConnectionEvidenceVerification=false
receiptWarnings contains NODE_V239_SOURCE_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_NOT_READY
```

覆盖完整 header 时：

```text
readyForNodeV239ManualSandboxConnectionEvidenceVerification=true
receiptWarnings is empty
readyForManagedAuditSandboxAdapterConnection=false
```

## 边界

本版明确不做：

```text
不打开 managed audit sandbox connection
不读取 credential value
不执行 schema migration SQL
不写 approval ledger
不写 managed audit store
不启动 Java / mini-kv / external audit service
不把 receipt 当生产审计或生产窗口授权
```

## 一句话总结

v93 把 Node v238 operator window checklist 变成 Java 侧只读 echo receipt，并把新增边界继续拆在独立 builder 里；下一步 Node v239 可以消费它和 mini-kv v102 做 evidence verification，但仍不能真实连接。
