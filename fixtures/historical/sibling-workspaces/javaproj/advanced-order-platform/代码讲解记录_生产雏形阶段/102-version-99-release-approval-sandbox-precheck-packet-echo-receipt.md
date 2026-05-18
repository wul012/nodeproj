# 第九十九版代码讲解：release approval sandbox precheck packet echo receipt

本版目标是给 Node v245 的 sandbox connection precheck packet 增加 Java 只读回执。它不是连接版本，而是给 Node v246 做 upstream receipt verification 前的 Java 证据。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v245-post-sandbox-precheck-roadmap.md
```

计划要求 Java v99 做：

```text
manual sandbox connection precheck packet echo receipt
只读回显 Node v245 precheck packet
不写 ledger
不执行 SQL
不打开 managed audit connection
```

当前主线仍处于真实 sandbox connection 前的证据对齐阶段。Java 只回显字段和边界，不读取 credential value，不连接外部 managed audit，不执行 schema migration。

## 新增 receipt

`ReleaseApprovalRehearsalResponse` 新增字段：

```java
RehearsalManagedAuditSandboxConnectionPrecheckPacketEchoReceipt
        managedAuditSandboxConnectionPrecheckPacketEchoReceipt
```

receipt version：

```text
java-release-approval-rehearsal-managed-audit-sandbox-connection-precheck-packet-echo-receipt.v1
```

response schema 同步提升到：

```text
java-release-approval-rehearsal-response-schema.v23
```

## Node v245 precheck packet 回显

新 builder 是：

```text
ReleaseApprovalManagedAuditSandboxConnectionPrecheckPacketEchoReceiptBuilder
```

它固定回显 7 个 precheck item：

```text
owner-approval-artifact
credential-handle-review
schema-migration-rehearsal
operator-window
rollback-path
abort-marker
timeout-policy
```

`packetShape` 说明这仍然是：

```text
precheckItemCount=7
disabledByDefault=true
dryRunOnly=true
readOnlyPrecheckPacket=true
packetCreatesConnectionCommand=false
```

## 字段回显

`fieldEcho` 只回显字段名、item id 和 timeout 数值：

```text
ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE_REVIEW
ORDEROPS_MANAGED_AUDIT_SCHEMA_MIGRATION_REHEARSAL_ID
ORDEROPS_MANAGED_AUDIT_OPERATOR_WINDOW
ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID
ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT
timeoutPolicy
timeoutBudgetMs=15000
```

关键边界仍是：

```text
credentialValueEchoed=false
```

## 执行边界

`javaExecutionBoundary` 明确全部阻断：

```text
carriesCredentialValue=false
credentialValueReadByJava=false
actualConnectionAttemptedByJava=false
externalManagedAuditConnectionOpenedByJava=false
schemaMigrationSqlExecutedByJava=false
approvalLedgerWrittenByJava=false
managedAuditStateWriteRequestedByJava=false
upstreamServiceAutoStartRequestedByJava=false
miniKvWritePermissionRequestedByJava=false
productionWindowOpenedByJava=false
```

这些字段进入 receipt、warning digest inputs 和 proof claims，供 Node v246 只读核对。

## Builder 内部 flags

这版继续避免裸布尔参数串，新增内部语义 record：

```text
PrecheckPacketShapeFlags
PrecheckPacketFieldEchoFlags
PrecheckPacketExecutionBoundaryFlags
```

对应调用：

```java
PrecheckPacketShapeFlags.disabledDryRunReviewOnly()
PrecheckPacketFieldEchoFlags.fieldsOnlyNoCredentialValue()
PrecheckPacketExecutionBoundaryFlags.allBlocked()
```

## Verification hint 接入

`ReleaseApprovalVerificationHintBuilder` 新增：

```text
managedAuditSandboxConnectionPrecheckPacketEchoReceipt
```

schema field、warning digest input、proof claim、node verification action 都同步接入。

Node v246 需要重点看：

```text
Compare managedAuditSandboxConnectionPrecheckPacketEchoReceipt.consumedByNodePrecheckPacketProfile with Node v245
Require managedAuditSandboxConnectionPrecheckPacketEchoReceipt.readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification=true before Node v246
```

这个 ready 只表示 Java 只读回显完成，不表示 Java 允许真实 sandbox connection。

## 测试覆盖

新增和更新测试：

```text
OpsEvidenceServiceTests.releaseApprovalRehearsalExposesPrecheckPacketEchoReceipt
OpsOverviewIntegrationTests.releaseApprovalRehearsalExposesPrecheckPacketEchoReceipt
```

覆盖内容：

```text
receipt version
response schema v23
Node v245 / Node v246 profile
precheckItemCount=7
disabledByDefault=true
dryRunOnly=true
timeoutBudgetMs=15000
credentialValueEchoed=false
no connection / no SQL / no ledger / no auto-start
warning digest inputs
proof claims
node verification actions
digest stability
```

## 本版边界

本版没有做：

```text
真实 managed audit connection
credential value 读取
approval ledger 写入
schema migration SQL
Java / mini-kv / external audit service auto-start
mini-kv 写权限请求
production audit readiness
```

所以它适合被 Node v246 只读消费，但不能作为生产连接授权。

## 验证

执行：

```text
mvn -q -DskipTests compile
mvn -q "-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests" test
mvn -q -DskipTests package
git diff --check
```

## 一句话总结

v99 把 Node v245 的 precheck packet 转成 Java 侧可核验的只读 echo receipt，并继续锁死 credential、connection、SQL、ledger、auto-start、mini-kv write 边界。
