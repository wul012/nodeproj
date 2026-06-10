export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification.v1";
export const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification";
export const NODE_V264_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract";
export const ACTIVE_PLAN = "docs/plans/v263-post-disabled-resolver-echo-roadmap.md";

export const JAVA_V107_RUNBOOK = "D:/javaproj/advanced-order-platform/c/107/解释/说明.md";
export const JAVA_V107_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/110-version-107-sandbox-endpoint-credential-resolver-test-only-shell-echo-marker.md";
export const JAVA_V107_MARKER_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarkerBuilder.java";
export const JAVA_V107_CONTRACT_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.java";

export const JAVA_V109_RUNBOOK = "D:/javaproj/advanced-order-platform/c/109/解释/说明.md";
export const JAVA_V109_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/112-version-109-release-approval-rehearsal-response-records-split.md";
export const JAVA_V109_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalResponseRecords.java";

export const MINI_KV_V116_RECEIPT =
  "D:/C/mini-kv/fixtures/release/test-only-resolver-shell-non-participation-receipt.json";
export const MINI_KV_V116_RUNBOOK = "D:/C/mini-kv/c/116/解释/说明.md";
export const MINI_KV_V116_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/172-version-116-test-only-resolver-shell-non-participation-receipt.md";

export const REQUEST_SHAPE_FIELDS = [
  "requestId",
  "operation",
  "credentialHandle",
  "endpointHandle",
  "resolverPolicyHandle",
  "approvalMarker",
  "approvalCorrelationId",
  "dryRun",
  "fakeResolverOnly",
] as const;

export const RESPONSE_SHAPE_FIELDS = [
  "requestId",
  "status",
  "code",
  "fakeResolverOnly",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
  "credentialValueRead",
  "credentialValueLoaded",
  "rawEndpointUrlParsed",
  "externalRequestSent",
  "connectsManagedAudit",
  "schemaMigrationExecuted",
  "productionRecordWritten",
] as const;

export const FAILURE_CLASS_CODES = [
  "RESOLVER_DISABLED",
  "APPROVAL_MARKER_MISSING",
  "CREDENTIAL_HANDLE_MISSING",
  "CREDENTIAL_VALUE_REQUESTED",
  "RAW_ENDPOINT_URL_REQUESTED",
  "EXTERNAL_REQUEST_REQUESTED",
  "SCHEMA_MIGRATION_REQUESTED",
] as const;

export const GUARD_CONDITION_CODES = [
  "SOURCE_V263_READY",
  "FAKE_RESOLVER_ONLY",
  "CREDENTIAL_HANDLE_ONLY",
  "ENDPOINT_HANDLE_ONLY",
  "RESOLVER_POLICY_HANDLE_REQUIRED",
  "APPROVAL_MARKER_REQUIRED",
  "UPSTREAM_ACTIONS_DISABLED",
  "NO_SECRET_PROVIDER",
  "NO_EXTERNAL_REQUEST",
  "NO_SCHEMA_MIGRATION",
] as const;
