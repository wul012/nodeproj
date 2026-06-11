import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";

export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification.v1";
export const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification";
export const NODE_V273_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review";
export const ACTIVE_PLAN = "docs/plans/v272-post-plan-intake-echo-roadmap.md";

export const JAVA_V113_RUNBOOK = "D:/javaproj/advanced-order-platform/c/113/解释/说明.md";
export const JAVA_V113_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/116-version-113-sandbox-endpoint-credential-resolver-disabled-implementation-candidate-echo-receipt.md";
export const JAVA_V113_BUILDER =
  "D:/javaproj/advanced-order-platform/v113-snapshot/EchoReceiptBuilder.java";
export const JAVA_V113_SUPPORT =
  "D:/javaproj/advanced-order-platform/v113-snapshot/EchoSupport.java";
export const JAVA_V113_RECORDS =
  "D:/javaproj/advanced-order-platform/v113-snapshot/EchoRecords.java";
export const JAVA_V113_ECHO_MARKER_SUPPORT =
  "D:/javaproj/advanced-order-platform/v113-snapshot/EchoMarkerSupport.java";
export const JAVA_V113_EVIDENCE_SERVICE =
  "D:/javaproj/advanced-order-platform/v113-snapshot/OpsEvidenceService.java";

export const MINI_KV_V120_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-disabled-implementation-candidate-non-participation-receipt.json";
export const MINI_KV_V120_RUNBOOK = "D:/C/mini-kv/c/120/解释/说明.md";
export const MINI_KV_V120_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/176-version-120-credential-resolver-disabled-implementation-candidate-non-participation-receipt.md";
export const MINI_KV_V120_RUNTIME_RECEIPT =
  "D:/C/mini-kv/src/runtime_credential_resolver_disabled_candidate_receipts.cpp";

export const BOUNDARY_CODES = [
  "PLAN_DOCUMENT",
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "DISABLED_SECRET_PROVIDER_STUB",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "REDACTION_POLICY",
  "EXTERNAL_REQUEST_SIMULATION",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];

export const REQUIREMENT_CODES = [
  "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
  "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
  "ENDPOINT_HANDLE_BOUNDARY_MISSING",
  "SECRET_PROVIDER_STUB_MISSING",
  "OPERATOR_APPROVAL_BOUNDARY_MISSING",
  "ROLLBACK_BOUNDARY_MISSING",
  "REDACTION_POLICY_MISSING",
  "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
  "SCHEMA_MIGRATION_POLICY_MISSING",
  "AUDIT_LEDGER_WRITE_POLICY_MISSING",
] as const satisfies readonly CredentialResolverPreImplementationRequirementCode[];

export const CANDIDATE_READY_BOUNDARY_CODES = [
  "PLAN_DOCUMENT",
  "DISABLED_SECRET_PROVIDER_STUB",
  "REDACTION_POLICY",
  "EXTERNAL_REQUEST_SIMULATION",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];

export const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];
