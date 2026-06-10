export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification.v1";
export const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification";
export const NODE_V262_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck";
export const ACTIVE_PLAN = "docs/plans/v260-post-credential-resolver-decision-roadmap.md";

export const JAVA_V106_RUNBOOK = "D:/javaproj/advanced-order-platform/c/106/解释/说明.md";
export const JAVA_V106_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/109-version-106-sandbox-endpoint-credential-resolver-disabled-precheck-echo-marker.md";
export const JAVA_V106_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerBuilder.java";
export const JAVA_V106_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords.java";

export const MINI_KV_V115_RECEIPT =
  "D:/C/mini-kv/fixtures/release/disabled-credential-resolver-precheck-non-participation-receipt.json";
export const MINI_KV_V115_RUNBOOK = "D:/C/mini-kv/c/115/解释/说明.md";
export const MINI_KV_V115_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/171-version-115-disabled-credential-resolver-precheck-non-participation-receipt.md";

export const REQUIRED_ENV_HANDLE_NAMES = [
  "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
  "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
] as const;

export const OPT_IN_GATE_NAMES = [
  "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
  "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
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

export const DRY_RUN_RESPONSE_FIELDS = [
  "readyState",
  "resolverMode",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
  "credentialValueRead",
  "credentialValueLoaded",
  "rawEndpointUrlParsed",
  "externalRequestSent",
  "connectsManagedAudit",
  "schemaMigrationExecuted",
  "failureClassCount",
  "nextAction",
] as const;

export const INHERITED_NO_GO_CONDITIONS = [
  "CREDENTIAL_VALUE_REQUIRED",
  "RAW_ENDPOINT_URL_REQUIRED",
  "REAL_CONNECTION_REQUIRED",
  "EXTERNAL_REQUEST_REQUIRED",
  "SCHEMA_MIGRATION_REQUIRED",
  "UPSTREAM_WRITE_REQUIRED",
  "AUTO_START_REQUIRED",
  "MINI_KV_BACKEND_REQUIRED",
  "PRODUCTION_WINDOW_REQUIRED",
] as const;
