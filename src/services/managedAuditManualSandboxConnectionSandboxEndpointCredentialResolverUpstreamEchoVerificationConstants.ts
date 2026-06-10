export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification.v1";
export const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification";
export const NODE_V260_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record";
export const ACTIVE_PLAN = "docs/plans/v260-post-credential-resolver-decision-roadmap.md";

export const JAVA_V105_RUNBOOK = "D:/javaproj/advanced-order-platform/c/105/解释/说明.md";
export const JAVA_V105_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/108-version-105-sandbox-endpoint-credential-resolver-decision-echo-marker.md";
export const JAVA_V105_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarkerBuilder.java";

export const MINI_KV_V114_RECEIPT = "D:/C/mini-kv/fixtures/release/credential-resolver-non-participation-receipt.json";
export const MINI_KV_V114_RUNBOOK = "D:/C/mini-kv/c/114/解释/说明.md";
export const MINI_KV_V114_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/170-version-114-credential-resolver-non-participation-receipt.md";

export const REQUIRED_DECISION_FIELD_IDS = [
  "endpoint-handle",
  "credential-handle",
  "resolver-policy-handle",
  "approval-marker",
  "operator-identity",
  "approval-correlation",
  "redaction-policy",
  "fallback-rotation-plan",
] as const;

export const EXPLICIT_NO_GO_CONDITION_CODES = [
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
