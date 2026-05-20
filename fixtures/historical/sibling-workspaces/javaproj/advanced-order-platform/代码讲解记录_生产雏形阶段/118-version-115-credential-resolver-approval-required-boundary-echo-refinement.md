# Java v115 代码讲解：credential resolver approval-required boundary echo refinement

本版目标来自当前有效计划：

```text
D:\nodeproj\orderops-node\docs\plans\v274-post-disabled-candidate-echo-roadmap.md
```

计划要求 Java v115 只读强化 6 个 approval-required boundary 的解释，供后续 Node v275 做三方验证。重点不是打开真实 resolver，而是把“为什么还需要审批、允许看到什么证据、哪些动作仍被禁止”说清楚。

## 本版处理的位置

核心 receipt 仍然是 disabled implementation candidate echo：

```text
ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceiptBuilder
```

v115 在这个 receipt 里新增 `approvalRequiredBoundaryExplanations`，每个元素对应一个 approval-required boundary：

```text
CREDENTIAL_HANDLE
ENDPOINT_HANDLE
OPERATOR_APPROVAL
ROLLBACK_BOUNDARY
SCHEMA_MIGRATION_POLICY
AUDIT_LEDGER_WRITE_POLICY
```

每个 explanation 都声明只允许 read-only evidence，并把 runtime action 全部锁死为 false：

```text
credentialValueReadAllowed=false
rawEndpointUrlParseAllowed=false
managedAuditConnectionAllowed=false
approvalLedgerWriteAllowed=false
sqlExecutionAllowed=false
rollbackExecutionAllowed=false
automaticUpstreamStartAllowed=false
```

## 为什么不是重写 support

v274 plan 明确要求复用 v113 echo workflow template，避免再新增 600-800 行重 support。这里选择在现有 disabled candidate support 上补一组小型静态解释和完整性判断：

```text
approvalRequiredBoundaryExplanations()
approvalRequiredBoundaryExplanationsComplete(...)
approvalRequiredEvidenceAllowedFor(...)
approvalReasonFor(...)
```

builder 只负责取出解释、加入 readiness step、digest input、proof claim 和 Node verification action。这样业务含义可见，但没有把 echo workflow 再造一遍。

## 顺手拆出的 records

本版还把 sandbox endpoint credential resolver decision echo 的 nested records 从 `ReleaseApprovalRehearsalResponseRecords` 迁出到：

```text
ReleaseApprovalSandboxEndpointCredentialResolverDecisionEchoRecords.java
```

迁出的内容是一组稳定 record / marker 类型，适合独立放置。调用方通过新的容器类引用，外部 JSON contract 不变。

## 行数变化

```text
ReleaseApprovalRehearsalResponseRecords.java: 1833 -> 1680 行
ReleaseApprovalSandboxEndpointCredentialResolverDecisionEchoRecords.java: 162 行
ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords.java: 303 行
```

这是一刀合理拆分：主 records 文件少了 153 行，新增文件承接的是同一业务域的 decision echo 数据载体；v115 的新业务字段集中在 disabled candidate receipt 里，没有扩散到真实 resolver、credential provider 或 managed-audit 连接路径。

## schema 与测试

本版把 rehearsal response schema 升到 v34，并把 disabled candidate receipt 版本升到 v2：

```text
RELEASE_APPROVAL_REHEARSAL_RESPONSE_SCHEMA_VERSION=v34
managed-audit sandbox endpoint credential resolver disabled implementation candidate echo receipt version=v2
```

测试新增了这些约束：

```text
approvalRequiredBoundaryExplanations 精确包含 6 个 boundary
evidenceAllowed=approval-required-read-only-evidence
runtime action booleans 全部为 false
proof claim 包含 approvalRequiredBoundaryExplanations.size=6
nodeVerificationActions 包含 size=6 校验
warning digest input 包含 explanation count
```

已运行：

```text
mvn -q -DskipTests compile
mvn -q "-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests" test
mvn -q test
```

全量测试通过。期间 Testcontainers 打印 Docker 环境不可用日志，但测试退出码为 0；本版没有启动 Docker Desktop。

## 边界保持

本版仍然不做：

```text
不读取 credential value
不解析 raw endpoint
不实例化真实 resolver
不打开 managed audit connection
不写 approval ledger
不执行 SQL
不执行 rollback
不自动启动 Node 或 mini-kv
```

## 一句话总结

Java v115 把 approval-required boundary 从“只有分类”推进到“有可验证解释”，同时继续压缩 `ReleaseApprovalRehearsalResponseRecords` 的体积，为 Node v275 的三方验证提供更清晰的只读证据。
