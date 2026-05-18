# version 88 release approval sandbox connection preflight echo marker

## 1. 这一版做什么

v88 给 release approval rehearsal 增加 `managedAuditSandboxConnectionPreflightEchoMarker`。

它不是连接实现，也不是生产审计授权。它只是把 Node v230 preflight gate 的 7 个字段，用 Java 侧只读 echo marker 固定下来，方便 Node v231 后续做 preflight verification。

## 2. 入口位置

响应主 record 新增字段：

```java
RehearsalManagedAuditSandboxConnectionPreflightEchoMarker
        managedAuditSandboxConnectionPreflightEchoMarker
```

构造链位置在 v87 operator handoff marker 之后：

```text
managedAuditSandboxConnectionOperatorHandoffMarker
 -> managedAuditSandboxConnectionPreflightEchoMarker
 -> verificationHint
```

## 3. Builder 拆分

新增：

```text
ReleaseApprovalManagedAuditSandboxConnectionPreflightEchoMarkerBuilder
```

这个 builder 负责：

- 判断 v87 source operator handoff marker 是否 ready
- 生成 Node v230 / v231 profile 引用
- 生成 marker digest
- 输出 warning digest inputs
- 输出 no-write proof claims
- 输出 Node verification actions

`OpsEvidenceService` 只保留常量和入口编排，不直接拼 marker。

## 4. 字段分组

marker 分为：

```text
RehearsalSandboxConnectionPreflightWindowBoundary
RehearsalSandboxConnectionPreflightFieldBoundary
RehearsalSandboxConnectionPreflightCredentialBoundary
RehearsalSandboxConnectionPreflightSchemaBoundary
RehearsalSandboxConnectionPreflightRollbackBoundary
RehearsalSandboxConnectionPreflightJavaExecutionBoundary
```

builder 内部使用 `WindowFlags`、`PreflightFieldFlags`、`CredentialFlags`、`SchemaFlags`、`RollbackFlags`、`JavaExecutionFlags` 这些命名 record，再转成响应 boundary。这样 v88 没有继续把一长串 `true/false` 散落到构造链里。

## 5. ready 字段怎么来

默认无完整 Node v210 approval binding header 时，v87 operator handoff marker 还没 ready，所以：

```text
readyForNodeV231ManualSandboxConnectionPreflightVerification=false
markerWarnings=[NODE_V231_SOURCE_SANDBOX_CONNECTION_OPERATOR_HANDOFF_MARKER_NOT_READY]
```

带完整 header 后，上游链路 ready，且 marker 自身所有禁写条件都满足：

```text
readyForNodeV231ManualSandboxConnectionPreflightVerification=true
markerWarnings=[]
```

这仍只允许 Node v231 做 preflight verification。

## 6. no-write proof

`ReleaseApprovalVerificationHintBuilder` 把 v88 marker 加入：

- `schemaFields`
- `warningDigestInputs`
- `proofClaims`
- `nodeVerificationActions`
- `noLedgerWriteProved`

关键 proof：

```text
manualWindowOpenByDefault=false
manualWindowOpenedByJava=false
preflightGateReadOnly=true
gateCreatesConnectionCommand=false
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
- Node v230 7 个预检字段

`OpsOverviewIntegrationTests` 覆盖 HTTP JSON 字段可见性和 header-backed ready 行为。

## 8. 一句话总结

v88 把 Java 从 “能只读标注 Node v228 operator packet” 推进到 “能只读 echo Node v230 preflight gate 的必要字段”，但仍不连接、不读 credential、不执行 SQL、不写任何审计或审批状态，也不启动任何上游服务。
