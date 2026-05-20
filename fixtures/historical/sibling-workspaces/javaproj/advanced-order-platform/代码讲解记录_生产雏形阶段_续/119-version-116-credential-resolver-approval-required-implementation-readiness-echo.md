# Java v116 代码讲解：credential resolver approval-required implementation readiness echo

本版目标来自当前有效计划：

```text
D:\nodeproj\orderops-node\docs\plans2\v280-post-status-routes-quality-roadmap.md
```

计划要求 Java v116 消费 Node v281 的 approval-required implementation readiness review。重点不是写真实 credential resolver，而是把 6 个 approval-required boundary 的 readiness、required artifacts、禁止动作和后续 Node v282 验证点回显到 Java release approval rehearsal 证据里。

## 本版接在哪条链上

v115 的输出是：

```text
managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt
```

v116 新增它的后继 receipt：

```text
managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt
```

构建顺序在：

```text
ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder
```

也就是：

```text
disabled implementation candidate echo
-> approval-required implementation readiness echo
```

这样 v116 不是孤立字段，而是沿着已有 managed-audit sandbox endpoint credential resolver 证据链往后推进一格。

## 三个新增类的职责

新增 records 容器：

```text
ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
```

它只放数据结构，包括：

```text
Receipt
Node v281 source echo
Node v275 upstream source
Readiness review
Boundary readiness
Checks
Summary
SideEffectBoundary
```

新增 support：

```text
ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport
```

它集中放静态事实和纯函数：

```text
6 个 boundary code
6 个 requirement code
18 个 required artifact
每个 boundary 的 Java / mini-kv / Node hint
每个 boundary 的 prohibitedRuntimeActions
sourceNodeV281Ready(...)
boundaryReadinessComplete(...)
sideEffectBoundaryBlocked(...)
```

新增 builder：

```text
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptBuilder
```

它负责把 v115 receipt、Node v281 readiness 信息和 side effect boundary 组装成最终 receipt，并贡献：

```text
warningDigestWarningInputNames
warningDigestBoundaryInputNames
proofClaims
nodeVerificationActions
noCredentialConnectionWriteOrAutoStartProved
```

## 为什么继续保持 read-only

Node v281 给出的状态是：

```text
readyForJavaV116MiniKvV122Echo=true
readyForManagedAuditResolverImplementation=false
```

所以 Java v116 只能证明“可进入下一轮 echo verification”，不能证明“可以实现真实 resolver”。代码里对应两个关键布尔值：

```text
readyForNodeV282CredentialResolverApprovalRequiredImplementationReadinessVerification=true
readyForManagedAuditResolverImplementation=false
```

sideEffectBoundary 也把所有真实动作锁死：

```text
credentialValueRead=false
rawEndpointUrlParsed=false
externalRequestSent=false
secretProviderInstantiated=false
resolverClientInstantiated=false
connectsManagedAudit=false
approvalLedgerWritten=false
sqlExecuted=false
schemaMigrationExecuted=false
automaticUpstreamStart=false
javaStartedNodeOrMiniKv=false
```

这让 v116 的边界很清楚：它是 evidence echo，不是 resolver implementation。

## 六个 boundary 如何表达

v116 回显的 boundary：

```text
CREDENTIAL_HANDLE
ENDPOINT_HANDLE
OPERATOR_APPROVAL
ROLLBACK_BOUNDARY
SCHEMA_MIGRATION_POLICY
AUDIT_LEDGER_WRITE_POLICY
```

每个 boundary 统一输出：

```text
readinessState=echo-ready-implementation-blocked
implementationDisposition=requires-explicit-follow-up-artifacts
readyForJavaV116Echo=true
readyForMiniKvV122Receipt=true
readyForNodeV282Verification=false
readyForRuntimeImplementation=false
```

这里的含义是：Java 和 mini-kv 可以继续做只读证据，但 Node v282 还没验证三方一致性，真实 runtime implementation 仍然关闭。

## 18 个 artifact 的意义

Node v281 要求每个 boundary 有 3 个 artifact，总计 18 个。Java v116 只是命名和回显这些 artifact，不读取 secret，不解析 endpoint，不执行 SQL。

例如：

```text
CREDENTIAL_HANDLE:
credential-handle-review-id
credential-value-redaction-contract
operator-visible-secret-value-prohibition

SCHEMA_MIGRATION_POLICY:
schema-migration-rehearsal-id
migration-review-status
sql-execution-prohibition-marker

AUDIT_LEDGER_WRITE_POLICY:
approval-ledger-write-policy-id
audit-store-write-prohibition-marker
write-path-owner-review
```

这些字段给后续实现计划准备“需要谁审批 / 需要什么策略 / 需要什么演练编号”，但本版不生成这些真实外部产物。

## verification hint 为什么要接入

只把 receipt 放进 response 不够，Node 后续消费通常会看：

```text
schemaFields
warningDigestInputs
proofClaims
nodeVerificationActions
noLedgerWriteProved
```

所以 v116 同步改了：

```text
ReleaseApprovalVerificationHintCatalog
ReleaseApprovalVerificationHintBuilder
ReleaseApprovalVerificationWarningDigestBuilder
```

新增 proof claim 代表这几个核心承诺：

```text
boundaryReadiness.size=6
requiredArtifactIds.size=18
allApprovalRequiredBoundariesEchoReady=true
allApprovalRequiredBoundariesImplementationBlocked=true
approvalLedgerWritten=false
sqlExecuted=false
readyForManagedAuditResolverImplementation=false
```

`noLedgerWriteProved(...)` 也把新 receipt 纳入证明链：

```text
sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptBuilder
    .noCredentialConnectionWriteOrAutoStartProved(receipt)
```

这保证新字段不会绕开原有 no-ledger-write 安全证明。

## schema 与测试

本版 schema：

```text
RELEASE_APPROVAL_REHEARSAL_RESPONSE_SCHEMA_VERSION=v35
```

v115 source receipt schema 仍保持：

```text
sourceDisabledImplementationCandidateEchoReceiptSchemaVersion=v34
```

测试新增两层覆盖：

```text
OpsEvidenceServiceTests:
直接检查 Java record、digest、boundary、artifact、proof claim、warning digest input。

OpsOverviewIntegrationTests:
通过 /api/v1/ops/release-approval-rehearsal 检查 JSON 字段暴露和 verificationHint 收录。
```

已运行：

```text
mvn -q -DskipTests compile
mvn -q "-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests" test
mvn -q test
```

## 这一版没有做什么

本版没有做：

```text
真实 credential resolver
真实 secret provider
credential value 读取
raw endpoint URL 解析
managed audit HTTP/TCP 连接
approval ledger 写入
SQL / schema migration 执行
rollback / restore 执行
Node 或 mini-kv 自动启动
```

## 一句话总结

Java v116 把 Node v281 的 implementation readiness review 变成 Java 可回显、可测试、可被 Node v282 消费的只读 receipt；它把 6 个 approval-required boundary 和 18 个 required artifact 接入 verification hint，但仍然牢牢停在真实 resolver 实现之前。
