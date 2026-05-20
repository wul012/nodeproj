# Java v111 代码讲解：sandbox endpoint credential resolver production-readiness blocked-decision echo receipt

本版目标是把 Node v268 的 credential resolver production-readiness decision gate 接成 Java 侧只读 blocked-decision echo receipt。它表达的是“还不能实现真实 resolver”，不是打开实现、连接或生产审计的许可。

## 本版所处项目进度

当前有效计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v268-post-production-readiness-decision-roadmap.md
```

计划要求 Java v111：

```text
credential resolver production-readiness blocked-decision echo receipt
只读引用 Node v268
证明 Java 仍不写 ledger、不执行 SQL、不读取 credential value、不打开 managed audit connection
```

这说明主线仍在 production-readiness decision gate 阶段。Node v268 已经判断 fake-shell archive echo chain 可作为来源，但真实 resolver pre-implementation plan 缺少必要边界，所以 Java 只能回显 blocked 决策。

## response 新字段

`ReleaseApprovalRehearsalResponse` 新增：

```java
RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt
        managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt
```

字段名很长，但含义明确：

```text
这是 managed-audit sandbox endpoint credential resolver 相关证据
这是 production-readiness blocked decision，不是成功放行
这是 echo receipt，可进入 verification hint / warning digest / proof claim
```

## records / support / builder 拆分

新增 records 容器：

```text
ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
```

它只负责响应结构：

```text
receipt
sourceNodeV268
preImplementationRequirements
productionReadinessDecision
decisionChecks
sideEffectBoundary
```

新增 support：

```text
ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport
```

它负责固定事实和闭合判断：

```text
Node v268 counts
10 个 missing requirement code
source echo 构造
blocked decision 构造
side-effect boundary 构造
sourceReady / requirementsMissing / decisionBlocked / decisionChecksClosed / sideEffectBoundaryBlocked
```

新增 builder：

```text
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceiptBuilder
```

它负责：

```text
从 v110 fake-shell archive echo receipt 判断来源是否可接受
组装 v111 receipt
生成 decisionDigest / receiptDigest
贡献 warningDigest input / line
贡献 proofClaims
贡献 nodeVerificationActions
证明 noCredentialConnectionWriteOrAutoStart
```

这符合本轮优化项：不再让 `OpsEvidenceService` 膨胀，也不把大量字段重新塞进一个大 record 文件。

## Node v268 被回显的事实

receipt 固定回显：

```text
decisionGateState=blocked
readinessDecision=blocked
decisionMode=node-v268-production-readiness-decision-gate-only
sourceSpan=Node v267
checkCount=25
passedCheckCount=15
sourceCheckCount=18
sourcePassedCheckCount=18
archiveFileCount=9
evidenceFileCount=7
requiredSnippetCount=24
matchedSnippetCount=32
missingPreImplementationRequirementCount=10
productionBlockerCount=10
warningCount=2
recommendationCount=2
```

10 个 blocker 是：

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

`ReleaseApprovalVerificationHintBuilder` 把 v111 builder 纳入：

```text
verificationContributions
warningDigestInputs
proofClaims
nodeVerificationActions
noLedgerWriteProved
schemaFields
```

`ReleaseApprovalVerificationWarningDigestBuilder` 同步加入 v111 的 warning lines 和 boundary lines。这样 Node v269 可以从统一 verification hint 看到 blocked 决策、digest 输入和禁止副作用的证明。

## no-write 证明的细节

本版修正了一个重要点：`noLedgerWriteProved` 证明的是 Java 没有执行危险副作用，不应该依赖上游 evidence 是否完整 ready。

所以 v111 的 no-write proof 关注：

```text
credential boundary closed
raw endpoint boundary closed
resolver boundary closed
connection boundary closed
write boundary closed
auto-start boundary closed
production audit still blocked
production window still blocked
real resolver implementation still blocked
```

上游 ready 与否仍由 receipt 的 ready 字段和 warnings 表达，不混进“有没有写”的证明里。

## 验证

本版补了：

```text
OpsEvidenceServiceTests
OpsOverviewIntegrationTests
```

覆盖：

```text
receipt version / schema version
Node v268 profile / endpoint / blocked state
Node v267 source version
25 / 15 / 10 / 10 counts
10 missing requirement codes
productionReadinessDecision 全部 allows=false
sideEffectBoundary 全部危险动作=false
verification hint schemaFields / warningDigestInputs / proofClaims / nodeVerificationActions
HTTP JSON 字段可见
重复请求 digest 稳定
```

## 一句话总结

Java v111 用拆分后的只读 echo receipt 承接 Node v268 的 blocked production-readiness decision，让 Node v269 可以继续校验，同时 Java 仍然没有触碰 credential value、raw endpoint、真实 resolver、managed audit connection、SQL、ledger、schema migration 或 auto-start。
