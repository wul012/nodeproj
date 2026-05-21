# 133. Java v131 - credential resolver direct execution-denied echo

## 本版目标

本版按 Node v292 计划补齐 Java 侧的 direct execution-denied echo receipt。它只提供只读证据，明确 Java 没有执行 fake harness、没有读取 credential、没有解析 raw endpoint、没有写 ledger/SQL/schema，也没有自动启动 Node、mini-kv 或 harness。

## 主要改动

- 新增 `ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoRecords`，承载 Java v131 的执行拒绝 receipt、source echo、decision、checks 和 side-effect boundary。
- 新增 `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceiptBuilder`，从 implementation-plan echo receipt 读取已存在的边界摘要，生成 Node v292/v293 可消费的只读证明。
- `ReleaseApprovalRehearsalResponse` 增加 `managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt` 字段。
- `ReleaseApprovalVerificationHintBuilder` 和 `ReleaseApprovalVerificationWarningDigestBuilder` 纳入新 receipt 的 warning digest inputs、proof claims 和 node verification actions。
- rehearsal response schema 从 `v36` 升到 `v37`；implementation-plan receipt 自身仍保持 `v36` 作为 v131 的 source schema。

## 关键边界

- `javaExecutionDeniedEchoPresent=true`
- `fakeHarnessRuntimeAllowed=false`
- `credentialValueRead=false`
- `rawEndpointUrlParsed=false`
- `connectsManagedAudit=false`
- `approvalLedgerWritten=false`
- `sqlExecuted=false`
- `schemaMigrationExecuted=false`
- `automaticUpstreamStart=false`
- `readyForNodeV293FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification=true`

## 验证

已通过聚焦测试：

```powershell
mvn -q "-Dtest=OpsEvidenceServiceCredentialResolverExecutionDeniedEchoTests,OpsEvidenceServiceApprovalRequiredImplementationReadinessEchoTests,OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests,OpsEvidenceServiceReleaseApprovalRehearsalOverviewTests" test
```

本版没有启动 Docker，也没有启动 Java / Node / mini-kv / fake harness 后台进程。
