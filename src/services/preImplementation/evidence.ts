import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "../managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";

export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification.v1";

export const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification";

export const NODE_V270_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake";

export const ACTIVE_PLAN = "docs/plans/v269-post-blocked-decision-upstream-echo-roadmap.md";

export const JAVA_V112_RUNBOOK = "D:/javaproj/advanced-order-platform/c/112/解释/说明.md";

export const JAVA_V112_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/115-version-112-sandbox-endpoint-credential-resolver-pre-implementation-plan-intake-echo-receipt.md";

export const JAVA_V112_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceiptBuilder.java";

export const JAVA_V112_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.java";

export const JAVA_V112_RECORDS =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords.java";

export const JAVA_V112_EVIDENCE_SERVICE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsEvidenceService.java";

export const MINI_KV_V119_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-pre-implementation-plan-intake-non-participation-receipt.json";

export const MINI_KV_V119_RUNBOOK = "D:/C/mini-kv/c/119/解释/说明.md";

export const MINI_KV_V119_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/175-version-119-credential-resolver-pre-implementation-plan-intake-non-participation-receipt.md";

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

export function arrayEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function codeToSnippetId(code: CredentialResolverPreImplementationBoundaryCode): string {
  switch (code) {
    case "PLAN_DOCUMENT":
      return "plan-document";
    case "CREDENTIAL_HANDLE":
      return "credential-handle";
    case "ENDPOINT_HANDLE":
      return "endpoint-handle";
    case "DISABLED_SECRET_PROVIDER_STUB":
      return "secret-provider";
    case "OPERATOR_APPROVAL":
      return "operator-approval";
    case "ROLLBACK_BOUNDARY":
      return "rollback";
    case "REDACTION_POLICY":
      return "redaction";
    case "EXTERNAL_REQUEST_SIMULATION":
      return "external-request";
    case "SCHEMA_MIGRATION_POLICY":
      return "schema-migration";
    case "AUDIT_LEDGER_WRITE_POLICY":
      return "audit-ledger-policy";
  }
}

export function requirementToSnippetId(code: CredentialResolverPreImplementationRequirementCode): string {
  switch (code) {
    case "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING":
      return "java-v112-req-plan";
    case "CREDENTIAL_HANDLE_BOUNDARY_MISSING":
      return "java-v112-req-credential";
    case "ENDPOINT_HANDLE_BOUNDARY_MISSING":
      return "java-v112-req-endpoint";
    case "SECRET_PROVIDER_STUB_MISSING":
      return "java-v112-req-secret";
    case "OPERATOR_APPROVAL_BOUNDARY_MISSING":
      return "java-v112-req-operator";
    case "ROLLBACK_BOUNDARY_MISSING":
      return "java-v112-req-rollback";
    case "REDACTION_POLICY_MISSING":
      return "java-v112-req-redaction";
    case "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING":
      return "java-v112-req-external";
    case "SCHEMA_MIGRATION_POLICY_MISSING":
      return "java-v112-req-schema";
    case "AUDIT_LEDGER_WRITE_POLICY_MISSING":
      return "java-v112-req-ledger";
  }
}
