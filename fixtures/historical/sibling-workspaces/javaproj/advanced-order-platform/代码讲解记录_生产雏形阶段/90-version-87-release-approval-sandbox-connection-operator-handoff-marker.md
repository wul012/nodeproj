# version 87 release approval sandbox connection operator handoff marker

## 1. 这一版做什么

v87 给 release approval rehearsal 增加 `managedAuditSandboxConnectionOperatorHandoffMarker`。

它不是连接实现，也不是生产审计授权。它只是把 Node v228 operator packet 里的字段，用 Java 侧只读 marker 固定下来，方便 Node v229 后续做 packet verification。

## 2. 入口位置

响应主 record 新增字段：

```java
RehearsalManagedAuditSandboxConnectionOperatorHandoffMarker
        managedAuditSandboxConnectionOperatorHandoffMarker
```

构造链位置在 v82 sandbox approval/schema guard 之后：

```text
managedAuditSandboxAdapterApprovalSchemaGuardReceipt
 -> managedAuditSandboxConnectionOperatorHandoffMarker
 -> verificationHint
```

## 3. Builder 拆分

新增：

```text
ReleaseApprovalManagedAuditSandboxConnectionOperatorHandoffMarkerBuilder
```

这个 builder 负责：

- 判断 v82 source sandbox guard 是否 ready
- 生成 Node v227 / v228 / v229 profile 引用
- 生成 marker digest
- 输出 warning digest inputs
- 输出 no-write proof claims
- 输出 Node verification actions

`OpsEvidenceService` 只保留常量和入口编排，不直接拼 marker。

## 4. 字段分组

marker 没有继续使用长串裸 boolean，而是分为：

```text
RehearsalSandboxConnectionWindowBoundary
RehearsalSandboxConnectionOperatorPacketBoundary
RehearsalSandboxConnectionCredentialBoundary
RehearsalSandboxConnectionSchemaRehearsalBoundary
RehearsalSandboxConnectionRollbackPathBoundary
RehearsalSandboxConnectionJavaExecutionBoundary
```

这正好对应 plan 中要求的 sandbox window、credential boundary、schema rehearsal、rollback path，以及 Java 执行边界。

## 5. ready 字段怎么来

默认无完整 Node v210 approval binding header 时，v82 sandbox guard 还没 ready，所以：

```text
readyForNodeV229ManualSandboxConnectionPacketVerification=false
markerWarnings=[NODE_V229_SOURCE_SANDBOX_ADAPTER_APPROVAL_SCHEMA_GUARD_RECEIPT_NOT_READY]
```

带完整 header 后，上游链路 ready，且 marker 自身所有禁写条件都满足：

```text
readyForNodeV229ManualSandboxConnectionPacketVerification=true
markerWarnings=[]
```

这仍只允许 Node v229 做 packet verification。

## 6. no-write proof

`ReleaseApprovalVerificationHintBuilder` 把 v87 marker 加入：

- `schemaFields`
- `warningDigestInputs`
- `proofClaims`
- `nodeVerificationActions`
- `noLedgerWriteProved`

关键 proof：

```text
manualSandboxConnectionWindowOpenedByJava=false
credentialValueReadByJava=false
schemaMigrationSqlExecutedByJava=false
rollbackExecutionAllowedByJava=false
externalManagedAuditConnectionOpenedByJava=false
approvalLedgerWrittenByJava=false
sqlExecutedByJava=false
```

## 7. 测试覆盖

`OpsEvidenceServiceTests` 覆盖：

- 默认 warning 场景
- header-backed ready 场景
- marker digest 稳定性
- verification hint schema/digest/proof/action 接入

`OpsOverviewIntegrationTests` 覆盖 HTTP JSON 字段可见性和 header-backed ready 行为。

## 8. 一句话总结

v87 把 Java 从 “v82 已有 sandbox approval/schema guard” 推进到 “能只读标注 Node v228 operator packet 如何交给 Java 侧校验”，但仍不连接、不读 credential、不执行 SQL、不写任何审计或审批状态。
