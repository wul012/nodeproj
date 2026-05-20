# Java v112 代码讲解：sandbox endpoint credential resolver pre-implementation plan intake echo receipt

本版目标是把 Node v270 的 credential resolver pre-implementation plan intake 接成 Java 侧只读 echo receipt。它表达的是“Java 已看见 10 个 pre-implementation boundary”，不是打开真实 resolver、连接或生产审计的许可。

## 本版所处项目进度

当前有效计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v269-post-blocked-decision-upstream-echo-roadmap.md
```

计划要求 Java v112：

```text
read-only echo for Node v270 plan intake
证明 Java 仍不读 credential value
不执行 SQL
不写 ledger
不打开 managed audit connection
给 Node v272 跨项目验证使用
```

Node v270 已经把 Node v268 的 10 个 missing requirement 转为 10 个 `defined-for-review` boundary。Java v112 做的是稳定回显和 no-side-effect proof，不实现 real resolver。

## response 新字段

`ReleaseApprovalRehearsalResponse` 新增：

```java
RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt
        managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt
```

字段名长，但含义清楚：

```text
这是 managed-audit sandbox endpoint credential resolver 相关证据
这是 pre-implementation plan intake echo
这是给 Node v272 校验的只读 receipt
```

## records / support / builder 拆分

新增 records 容器：

```text
ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
```

它只负责响应结构：

```text
receipt
sourceNodeV270
sourceNodeV269
preImplementationPlan
boundary
planIntake
checks
summary
sideEffectBoundary
```

新增 support：

```text
ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport
```

它负责固定事实和闭合判断：

```text
Node v270 profile/state/counts
Node v269 source reference
10 boundary code
10 requirement code
sourceNodeV270Ready
planComplete
planIntakeComplete
checksClosed
sideEffectBoundaryBlocked
```

新增 builder：

```text
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceiptBuilder
```

它负责：

```text
从 v111 blocked-decision echo receipt 判断来源是否可接受
组装 v112 receipt
生成 planDigest / intakeDigest / receiptDigest
贡献 warningDigest input / line
贡献 proofClaims
贡献 nodeVerificationActions
证明 noCredentialConnectionWriteOrAutoStart
```

这个拆分继续执行当前优化项：新增证据不再推高 `OpsEvidenceService`，也不把大段结构塞进顶层 response 类型。

## Node v270 被回显的事实

receipt 固定回显：

```text
profileVersion=managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1
planIntakeState=credential-resolver-pre-implementation-plan-intake-ready
planIntakeOnly=true
readOnlyPlanIntake=true
readyForCredentialResolverPreImplementationPlan=true
boundaryCount=10
definedBoundaryCount=10
missingBoundaryCount=0
```

10 个 boundary code：

```text
PLAN_DOCUMENT
CREDENTIAL_HANDLE
ENDPOINT_HANDLE
DISABLED_SECRET_PROVIDER_STUB
OPERATOR_APPROVAL
ROLLBACK_BOUNDARY
REDACTION_POLICY
EXTERNAL_REQUEST_SIMULATION
SCHEMA_MIGRATION_POLICY
AUDIT_LEDGER_WRITE_POLICY
```

对应 Node v268 的 10 个 requirement code：

```text
REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING
CREDENTIAL_HANDLE_BOUNDARY_MISSING
ENDPOINT_HANDLE_BOUNDARY_MISSING
SECRET_PROVIDER_STUB_MISSING
OPERATOR_APPROVAL_BOUNDARY_MISSING
ROLLBACK_BOUNDARY_MISSING
REDACTION_POLICY_MISSING
EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING
SCHEMA_MIGRATION_POLICY_MISSING
AUDIT_LEDGER_WRITE_POLICY_MISSING
```

## verification hint 接入

`ReleaseApprovalVerificationHintBuilder` 把 v112 builder 纳入：

```text
verificationContributions
warningDigestInputs
proofClaims
nodeVerificationActions
noLedgerWriteProved
schemaFields
```

`ReleaseApprovalVerificationWarningDigestBuilder` 同步加入 v112 的 warning lines 和 boundary lines。这样 Node v272 可以从统一 verification hint 看到 plan intake 的状态、10 个边界、digest 输入，以及所有副作用禁止证明。

## no-write 证明

v112 的 no-write proof 继续不依赖“上游是否 ready”来证明 Java 是否安全。它直接检查：

```text
credentialValueRead=false
rawEndpointUrlParsed=false
secretProviderInstantiated=false
resolverClientInstantiated=false
externalRequestSent=false
connectsManagedAudit=false
approvalLedgerWritten=false
managedAuditStoreWritten=false
sqlExecuted=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
javaStartedNodeOrMiniKv=false
```

上游 ready 由 `readyForNodeV272CredentialResolverPreImplementationPlanVerification` 和 `receiptWarnings` 表达；危险副作用则由 side-effect boundary 和 checks 证明。

## 验证

本版补了：

```text
OpsEvidenceServiceTests
OpsOverviewIntegrationTests
```

覆盖：

```text
receipt version / schema v32
Node v270 profile / endpoint / ready state
Node v269 source verification reference
10 boundary code / 10 requirement code
planIntake missingBoundaryCount=0
checks 全部闭合
sideEffectBoundary 全部危险动作=false
verification hint schemaFields / warningDigestInputs / proofClaims / nodeVerificationActions
HTTP JSON 字段可见
重复请求 digest 稳定
```

## 一句话总结

Java v112 用拆分后的只读 echo receipt 承接 Node v270 的 pre-implementation plan intake，让 Node v272 可以继续校验 10 个边界，同时 Java 仍然没有触碰 credential value、raw endpoint、真实 resolver、managed audit connection、SQL、ledger、schema migration 或 auto-start。
