# 135. Java v133 disabled runtime shell handoff echo

## 背景

Node 最新计划 `v295-post-disabled-runtime-shell-design-review-roadmap.md` 要求 Java 侧提供 read-only disabled runtime shell handoff echo，供后续 Node v296 同 mini-kv non-participation receipt 一起消费。

本地 Java v132 已用于 `execution-denied echo` 质量优化，所以本次按 Java v133 落地该 handoff echo；语义对应 Node 计划中的 Java upstream echo 要求。

## 本版做了什么

- 新增 `managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt`。
- 该 receipt 消费上游 `executionDeniedEchoReceipt`，并 echo Node v295 design review 的结论。
- 明确证明以下动作仍然禁止：
  - disabled runtime shell implementation / invocation
  - credential value read / raw endpoint parse
  - provider/client instantiation
  - external request
  - approval ledger / SQL / schema migration
  - automatic upstream start
- 响应 schema 从 `v37` 顺延为 `v38`。

## 生产边界

本版没有新增 runtime shell 类，没有创建 resolver runtime，没有调用外部 managed audit，没有执行 SQL，没有写 approval ledger，也没有自动启动 Node、mini-kv 或外部服务。

## 验证

- `mvn -q -DskipTests test-compile`
- `mvn -q "-Dtest=OpsEvidenceServiceCredentialResolverDisabledRuntimeShellHandoffEchoTests,OpsEvidenceServiceCredentialResolverExecutionDeniedEchoTests,OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests" test`
- 相关 credential resolver / rehearsal / live aggregation 测试集通过。
