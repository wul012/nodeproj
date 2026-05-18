# 第九十八版代码讲解：release approval sandbox dry-run command package echo receipt

本版目标是给 Node v241 的 manual sandbox dry-run command package 增加 Java 只读回执。它不是连接版本，而是给 Node v244 做三方 upstream echo verification 前的 Java 证据。

## 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v242-post-historical-evidence-fallback-roadmap.md
```

计划要求 Java v98 做：

```text
manual sandbox dry-run command echo receipt
只读回显 Node v241 command package 的 commandCount、credential handle、schema rehearsal id、rollback path、timeout / abort marker
不写 ledger
不执行 SQL
不打开 managed audit connection
```

这说明当前主线仍处在“真实 sandbox connection 前的证据对齐阶段”。Java 只给出字段和边界回显，不创建审批记录，不执行迁移，不读取 credential value。

## 新增 receipt

`ReleaseApprovalRehearsalResponse` 新增字段：

```java
RehearsalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceipt
        managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt
```

receipt version：

```text
java-release-approval-rehearsal-managed-audit-sandbox-connection-dry-run-command-package-echo-receipt.v1
```

response schema 同步提升到：

```text
java-release-approval-rehearsal-response-schema.v22
```

## Node v241 command package 回显

新 builder 是：

```text
ReleaseApprovalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceiptBuilder
```

它固定回显 6 条 disabled command：

```text
review-owner-approval-artifact
verify-credential-handle
review-schema-rehearsal
review-rollback-path
confirm-timeout-budget
confirm-manual-abort-marker
```

`packageShape` 说明这仍然是：

```text
commandCount=6
disabledByDefault=true
dryRunOnly=true
readOnlyCommandPackage=true
packageCreatesConnectionCommand=false
```

## 字段回显

`fieldEcho` 只回显字段名、命令 id 和 timeout 数值：

```text
ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID
ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE
ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID
ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID
timeoutBudgetMs=15000
ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT
```

关键边界是：

```text
credentialValueEchoed=false
```

这意味着 Java 可以告诉 Node “credential handle 字段存在”，但不读、不返回、不保存 credential value。

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

这些字段会进入 receipt、warning digest inputs 和 proof claims，供 Node v244 只读核对。

## Builder 内部 flags

这版没有把新的 `true/false` 位置参数裸放在构造器里，而是收成内部语义 record：

```text
CommandPackageShapeFlags
CommandPackageFieldEchoFlags
CommandPackageExecutionBoundaryFlags
```

所以调用处读到的是：

```java
CommandPackageShapeFlags.disabledDryRunReviewOnly()
CommandPackageFieldEchoFlags.fieldsOnlyNoCredentialValue()
CommandPackageExecutionBoundaryFlags.allBlocked()
```

这对应之前的优化要求：新增 receipt 时继续用 builder/helper 拆分，同时避免新的长布尔参数串。

## Verification hint 接入

`ReleaseApprovalVerificationHintBuilder` 新增：

```text
managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt
```

schema field、warning digest input、proof claim、node verification action 都同步接入。

Node v244 需要重点看：

```text
Compare managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.consumedByNodeDryRunCommandPackageProfile with Node v241
Require managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification=true before Node v244
```

但这个 ready 只表示 Java 只读回显完成，不表示 Java 允许真实 sandbox connection。

## 测试覆盖

新增和更新测试：

```text
OpsEvidenceServiceTests.releaseApprovalRehearsalExposesDryRunCommandPackageEchoReceipt
OpsOverviewIntegrationTests.releaseApprovalRehearsalExposesDryRunCommandPackageEchoReceipt
```

覆盖内容：

```text
receipt version
response schema v22
Node v241 / Node v244 profile
commandCount=6
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

所以它适合被 Node v244 只读消费，但不能作为生产连接授权。

## 验证

执行：

```text
mvn -q "-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests" test
mvn -q -DskipTests package
git diff --check
```

## 一句话总结

v98 把 Node v241 的 dry-run command package 转成 Java 侧可核验的只读 echo receipt，并把 credential、connection、SQL、ledger、auto-start、mini-kv write 边界继续锁死。
