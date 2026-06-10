export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification.v1";
export const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification";
export const NODE_V283_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft";
export const ACTIVE_PLAN = "docs/plans2/v282-post-upstream-echo-verification-roadmap.md";

export const JAVA_V121_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceiptBuilder.java";
export const JAVA_V121_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords.java";
export const JAVA_V121_TESTS =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceApprovalRequiredImplementationReadinessEchoTests.java";

export const MINI_KV_V126_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-implementation-plan-non-participation-receipt.json";
export const MINI_KV_V126_RUNBOOK = "D:/C/mini-kv/d/126/解释/说明.md";
export const MINI_KV_V126_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/182-version-126-credential-resolver-implementation-plan-non-participation-receipt.md";

export const INTERFACE_BOUNDARY_CODES = [
  "CONFIG_HANDLE_CONTRACT",
  "CREDENTIAL_HANDLE_CONTRACT",
  "ENDPOINT_HANDLE_CONTRACT",
  "APPROVAL_ARTIFACT_CONTRACT",
  "FAILURE_TAXONOMY_CONTRACT",
  "ROLLBACK_GUARD_CONTRACT",
  "TEST_ONLY_FAKE_HARNESS_CONTRACT",
];
export const REQUIRED_ARTIFACT_IDS = [
  "config-handle-review-id",
  "resolver-policy-handle-review-id",
  "config-redaction-contract",
  "credential-handle-review-id",
  "credential-value-redaction-contract",
  "operator-visible-secret-value-prohibition",
  "endpoint-handle-review-id",
  "allowlist-review-status",
  "raw-endpoint-redaction-contract",
  "operator-identity-binding",
  "approval-correlation-marker",
  "manual-window-open-marker",
  "failure-taxonomy-id",
  "operator-visible-failure-map",
  "retry-policy-review-id",
  "rollback-abort-marker",
  "restore-point-review-id",
  "manual-rollback-runbook-reference",
  "test-only-fake-harness-plan-id",
  "fake-harness-disabled-toggle",
  "fake-harness-side-effect-contract",
];
export const PROHIBITED_ACTIONS = [
  "read-secret-env-value",
  "render-secret-env-value",
  "instantiate-runtime-client",
  "read-credential-value",
  "store-credential-value",
  "render-credential-value",
  "parse-raw-endpoint-url",
  "render-raw-endpoint-url",
  "dial-managed-audit-endpoint",
  "auto-approve-operation",
  "execute-without-operator-marker",
  "write-approval-ledger",
  "send-external-request",
  "connect-managed-audit",
  "mask-unclassified-error",
  "execute-rollback",
  "deploy-resolver-without-abort-marker",
  "auto-start-upstream",
  "instantiate-real-secret-provider",
  "resolve-real-credential",
  "send-real-http-request",
];
export const JAVA_REQUIREMENT_IDS = [
  "java-v121-consumes-node-v283-plan",
  "java-v121-approval-artifact-boundary",
  "java-v121-schema-migration-boundary",
  "java-v121-failure-taxonomy-echo",
];
export const MINI_KV_REQUIREMENT_IDS = [
  "mini-kv-v126-consumes-node-v283-plan",
  "mini-kv-v126-no-storage-backend",
  "mini-kv-v126-no-secret-or-endpoint",
  "mini-kv-v126-no-write-command",
];
