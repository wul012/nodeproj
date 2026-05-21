# 136. Java v134 runtime shell candidate gate echo

## 背景

Node v297 已完成 disabled runtime shell implementation candidate gate review。
Java v134 的任务不是实现 runtime shell，而是把 v133 的 handoff echo 继续收窄，回显 v297 的五个候选门槛和 blocked decision，供后续 Node v298 消费。

## 本版做了什么

- 新增 `managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt`。
- 以上一版 v133 handoff echo 为来源，继续证明 runtime shell implementation / invocation 仍然 blocked。
- 回显 Node v297 的五个候选门槛：
  - dedicated disabled-by-default flag
  - operator approval
  - abort semantics
  - no-network tests
  - historical fallback evidence
- 回显 Node v298 之前仍需等待 Java v134 + mini-kv v131 的 blocked echo。
- 保持 credential read、raw endpoint parse、provider/client、HTTP/TCP、ledger、SQL、schema migration、auto-start 全部为 false。
- response schema 从 `v38` 升到 `v39`。

## 主要文件

- `advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoRecords.java`
- `advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoSupport.java`
- `advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceiptBuilder.java`
- `advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceCredentialResolverDisabledRuntimeShellCandidateGateEchoTests.java`

## 验证

- `mvn -q -DskipTests test-compile`
- `mvn -q "-Dtest=OpsEvidenceServiceCredentialResolverDisabledRuntimeShellCandidateGateEchoTests" test`
- `mvn -q "-Dtest=OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests" test`
- `mvn -q test`

## 结论

v134 已完成。它只是候选门禁回显，不引入 runtime 实现，也不打开任何副作用边界。
