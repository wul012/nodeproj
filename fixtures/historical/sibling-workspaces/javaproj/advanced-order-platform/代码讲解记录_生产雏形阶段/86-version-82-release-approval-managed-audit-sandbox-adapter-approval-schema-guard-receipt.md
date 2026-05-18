# version 82 release approval managed audit sandbox adapter approval schema guard receipt

## 1. 版本目标

Java v82 给 release approval rehearsal 增加 `managedAuditSandboxAdapterApprovalSchemaGuardReceipt`。它位于 Java v81 external adapter migration guard 之后，承接 Node v224 sandbox adapter dry-run plan，并给 Node v225 sandbox adapter dry-run package 提供只读 guard。

这一步的重点不是连接外部 audit，也不是执行 schema migration，而是把 Node v225 前需要的 owner approval artifact、schema rehearsal checklist、sandbox credential handle 和 no-write/no-connection 边界放进 Java 响应。

## 2. Response record

`ReleaseApprovalRehearsalResponse` 顶层新增：

```java
RehearsalManagedAuditSandboxAdapterApprovalSchemaGuardReceipt
        managedAuditSandboxAdapterApprovalSchemaGuardReceipt
```

receipt 内部不再铺平一长串布尔字段，而是拆成几个子 record：

```text
RehearsalManagedAuditSandboxPlanEvidence
RehearsalSandboxOwnerApprovalBoundary
RehearsalSandboxSchemaRehearsalBoundary
RehearsalSandboxCredentialBoundary
RehearsalSandboxExecutionBoundary
RehearsalSandboxQualityGateBoundary
```

这样调用方能清楚区分：哪些字段来自 Node v224 plan，哪些是 owner approval 要求，哪些是 schema rehearsal 要求，哪些是 credential handle 边界，哪些是 Java 侧禁止执行的操作。

## 3. Builder/helper 拆分

新增：

```java
ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder
```

它负责构造 v82 receipt，并同时提供 verification hint 需要的 v82 片段：

```java
warningDigestWarningInputNames()
warningDigestBoundaryInputNames()
proofClaims()
nodeVerificationActions()
warningDigestWarningLines(...)
warningDigestBoundaryLines(...)
noWriteCredentialConnectionOrSchemaEffectProved(...)
```

`OpsEvidenceService` 只做接线：

```java
sandboxAdapterApprovalSchemaGuardReceiptBuilder =
    new ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder();

managedAuditSandboxAdapterApprovalSchemaGuardReceipt =
    sandboxAdapterApprovalSchemaGuardReceiptBuilder
        .build(managedAuditExternalAdapterMigrationGuardReceipt);
```

这也是本版本的质量优化项：不把新 receipt 的所有字段判断继续堆进 `OpsEvidenceService`，并通过分组 record 避免长 boolean constructor chain。

## 4. Ready 条件

v82 ready 依赖上游 v81 receipt ready，并再次确认所有 sandbox 边界保持只读：

```text
source v81 receipt accepted
nodeV224SandboxPlan.readyForManagedAuditSandboxAdapterDryRunPlan=true
nodeV224SandboxPlan.readOnlyPlan=true
nodeV224SandboxPlan.connectsManagedAudit=false
nodeV224SandboxPlan.readsManagedAuditCredential=false
ownerApprovalBoundary.ownerApprovalArtifactRequired=true
ownerApprovalBoundary.ownerApprovalArtifactProvidedByJava=false
schemaRehearsalBoundary.schemaMigrationRehearsalRequired=true
schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava=false
credentialBoundary.sandboxCredentialHandleRequired=true
credentialBoundary.credentialValueReadByJava=false
executionBoundary.externalManagedAuditConnectionOpened=false
executionBoundary.javaManagedAuditStoreWritten=false
executionBoundary.javaSqlExecuted=false
qualityGateBoundary.builderOrHelperSplitApplied=true
qualityGateBoundary.longBooleanConstructorAvoided=true
```

默认缺少完整 header 时，v81 source 不 ready，所以 v82 warning 为：

```text
NODE_V225_SOURCE_EXTERNAL_ADAPTER_MIGRATION_GUARD_RECEIPT_NOT_READY
```

完整 header 下 ready 可为 true，但仍只代表 Node v225 可继续做 sandbox package，不代表生产授权。

## 5. Guard digest

`guardDigest` 由 v82 builder 内部生成，输入覆盖：

```text
receiptVersion
sourceExternalAdapterMigrationGuardReceiptVersion
sourceExternalAdapterMigrationGuardSchemaVersion
consumedByNodeSandboxPlanVersion
consumedByNodeSandboxPlanProfile
consumedByNodeSandboxPlanState
nodeV224ReadyForPlan
nodeV224ConnectsManagedAudit
ownerApprovalArtifactRequired
ownerApprovalArtifactProvidedByJava
schemaMigrationRehearsalRequired
schemaMigrationSqlExecutedByJava
sandboxCredentialHandleRequired
sandboxCredentialHandleName
credentialValueReadByJava
externalManagedAuditConnectionOpened
javaManagedAuditStoreWritten
javaSqlExecuted
qualityGateBuilderOrHelperSplitApplied
qualityGateLongBooleanConstructorAvoided
readyForNodeV225SandboxAdapterDryRunPackage
```

这个 digest 给 Node v225 做消费前校验，不是生产 audit record digest。

## 6. VerificationHint 更新

schema 升级为：

```text
java-release-approval-rehearsal-response-schema.v16
```

`schemaFields` 增加：

```text
managedAuditSandboxAdapterApprovalSchemaGuardReceipt
```

`warningDigestInputs` 增加 v82 warning 与边界字段：

```text
managedAuditSandboxAdapterApprovalSchemaGuardReceiptWarnings
sandboxAdapterApprovalSchemaGuardDigest
sandboxAdapterOwnerApprovalArtifactProvidedByJava
sandboxAdapterSchemaMigrationSqlExecutedByJava
sandboxAdapterCredentialValueReadByJava
sandboxAdapterExternalManagedAuditConnectionOpened
sandboxAdapterJavaManagedAuditStoreWritten
sandboxAdapterJavaSqlExecuted
sandboxAdapterQualityGateBuilderOrHelperSplitApplied
```

`noLedgerWriteProved` 也纳入 v82 helper 的 no-write/no-credential/no-connection/no-schema 判断，避免漏掉 sandbox adapter 前置步骤。

## 7. 测试覆盖

更新了：

- `OpsEvidenceServiceTests`
- `OpsOverviewIntegrationTests`

覆盖点：

- 默认缺 header 时 v82 receipt 不 ready，warning 为 `NODE_V225_SOURCE_EXTERNAL_ADAPTER_MIGRATION_GUARD_RECEIPT_NOT_READY`
- 完整 header 时 `readyForNodeV225SandboxAdapterDryRunPackage=true`
- Node v224 plan 字段保持 read-only/no-connect/no-credential/no-schema
- owner approval artifact required，但 Java 不提供 artifact、不创建 approval decision、不写 ledger
- schema rehearsal/checklist required，但 Java 不执行 SQL
- credential 使用 sandbox handle，不读取 credential value
- execution boundary 全部保持 false
- quality gate 证明 builder/helper split、生效分组和避免长 boolean constructor chain
- repeated header 下 v82 `guardDigest` 稳定

## 8. 边界

本版本没有：

- 创建 approval decision
- 写 approval ledger
- 持久化 approval record
- 写 managed audit store
- 执行 SQL 或 schema migration
- 部署、回滚或 restore
- 读取或保存 credential value
- 连接真实外部 managed audit
- 启动 Java、mini-kv 或外部审计服务
- 打开生产审计或生产操作窗口
