# 143-version-141-runtime-shell-stop-prerequisite-decision-echo

## 本版目标

Java v141 按 Node `docs/plans2/v303-post-decision-plan-intake-upstream-echo-roadmap.md` 推进，只读回显 Node v304 的 runtime shell chain stop-or-prerequisite decision record。

本版不实现 runtime shell，不读取 credential value，不解析 raw endpoint URL，不实例化 provider/client，不调用外部 managed audit，不写 approval ledger，不执行 SQL/schema migration，也不启动 Java/Node/mini-kv 后台服务。

## 改动内容

- 新增 `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords`
  - 独立承载 v141 receipt、source echo、decision record、prerequisite、no-go、boundary、verification check 等 record。
- 新增 `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog`
  - 集中维护 v141 warning digest、verification hint、proof claim、Node action、mini-kv follow-up 文案。
- 新增 `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoSupport`
  - 构造 Node v304 的只读 echo receipt。
  - 固定 6 个 missing prerequisite 和 8 个 no-go condition。
  - 明确 selected path 为 `continue-only-as-blocked-prerequisite-review`。
- 新增 `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceiptBuilder`
  - 从 v136 post-decision plan intake receipt 串接 v141 receipt。
- 接入 response/hint/digest 链路
  - `ReleaseApprovalRehearsalResponse`
  - `ReleaseApprovalRehearsalResponseBuilder`
  - `ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder`
  - `ReleaseApprovalVerificationHintBuilder`
  - `ReleaseApprovalVerificationHintCatalog`
  - `ReleaseApprovalVerificationHintContributionCatalog`
  - `ReleaseApprovalVerificationWarningDigestBuilder`
  - `ReleaseApprovalVerificationWarningDigestLineCatalog`
- 新增聚焦测试 `OpsEvidenceServiceCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoTests`
  - 验证 Node v304 profile/route/state、source schema v41、Java v141 schema v42、missing prerequisites、no-go boundary、side-effect false、hint/digest 稳定性。

## 关键字段

- Node version: `Node v304`
- Node profile: `managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record.v1`
- Node route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record`
- Markdown route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record?format=markdown`
- Node state: `runtime-shell-chain-stop-or-prerequisite-decision-record-ready`
- Decision: `require-explicit-approval-prerequisites-before-runtime-shell`
- Selected path: `continue-only-as-blocked-prerequisite-review`
- Java response schema: `java-release-approval-rehearsal-response-schema.v42`
- Java v141 receipt schema: `java-release-approval-rehearsal-response-schema.v42`
- Source v136 receipt schema: `java-release-approval-rehearsal-response-schema.v41`

## 拆分与行数

- `OpsEvidenceService`: 911 行。
- `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoSupport`: 522 行。
- `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords`: 199 行。
- `ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog`: 140 行。
- `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceiptBuilder`: 48 行。

本版没有继续把 v141 堆进 `OpsEvidenceService` 或单个测试总览类，而是按 records/catalog/support/builder 拆开；新增 support 仍超过 500 行，但其职责单一，且常量文案已经拆入 catalog，暂时不需要在同版继续切到更碎，避免把只读 echo 变成不可审计的大重构。

## 验证

```powershell
mvn -q -DskipTests test-compile
mvn -q "-Dtest=OpsEvidenceServiceCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoTests,ReleaseApprovalVerificationHintContributionCatalogTests,ReleaseApprovalVerificationWarningDigestLineCatalogTests" test
mvn -q "-Dtest=OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests,OpsReleaseApprovalCredentialResolverEndpointArchiveIntegrationTests,OpsReleaseApprovalCredentialResolverEndpointCandidateIntegrationTests,OpsReleaseApprovalCredentialResolverReadinessIntegrationTests,OpsReleaseApprovalRehearsalHeaderedLiveAggregationIntegrationTests,OpsReleaseApprovalRehearsalLiveAggregationIntegrationTests,OpsReleaseApprovalRehearsalLiveAggregationVerificationHintIntegrationTests" test
mvn -q test
```

全量测试通过。测试过程中没有启动 Docker Desktop；Testcontainers 在 Docker 不可用时只输出探测 warning，未导致失败。

## 后续建议

Java v141 已完成 Node v304 要求的只读上游确认。后续如继续质量优化，应单独开版本处理更高层拆分，例如继续缩小 `ReleaseApprovalRehearsalResponse`/overview tests，或把相邻 echo support 的 source profile、check id、boundary code 模板继续 catalog 化；不要在 v141 里追加新的 runtime shell 行为。
