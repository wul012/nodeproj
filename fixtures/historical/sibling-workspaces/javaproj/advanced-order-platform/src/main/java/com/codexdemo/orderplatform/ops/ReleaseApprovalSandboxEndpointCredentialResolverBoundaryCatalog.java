package com.codexdemo.orderplatform.ops;

import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverBoundaryCatalog {

    record ApprovalRequiredImplementationTemplate(
            String owner,
            List<String> requiredArtifacts,
            String javaV116EchoHint,
            String miniKvV122ReceiptHint,
            String nodeV282VerificationHint,
            List<String> prohibitedRuntimeActions
    ) {
    }

    private static final List<String> BOUNDARY_CODES = List.of(
            "PLAN_DOCUMENT",
            "CREDENTIAL_HANDLE",
            "ENDPOINT_HANDLE",
            "DISABLED_SECRET_PROVIDER_STUB",
            "OPERATOR_APPROVAL",
            "ROLLBACK_BOUNDARY",
            "REDACTION_POLICY",
            "EXTERNAL_REQUEST_SIMULATION",
            "SCHEMA_MIGRATION_POLICY",
            "AUDIT_LEDGER_WRITE_POLICY"
    );

    private static final List<String> REQUIREMENT_CODES = List.of(
            "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
            "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
            "ENDPOINT_HANDLE_BOUNDARY_MISSING",
            "SECRET_PROVIDER_STUB_MISSING",
            "OPERATOR_APPROVAL_BOUNDARY_MISSING",
            "ROLLBACK_BOUNDARY_MISSING",
            "REDACTION_POLICY_MISSING",
            "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
            "SCHEMA_MIGRATION_POLICY_MISSING",
            "AUDIT_LEDGER_WRITE_POLICY_MISSING"
    );

    private static final List<String> CANDIDATE_READY_BOUNDARY_CODES = List.of(
            "PLAN_DOCUMENT",
            "DISABLED_SECRET_PROVIDER_STUB",
            "REDACTION_POLICY",
            "EXTERNAL_REQUEST_SIMULATION"
    );

    private static final List<String> APPROVAL_REQUIRED_BOUNDARY_CODES = List.of(
            "CREDENTIAL_HANDLE",
            "ENDPOINT_HANDLE",
            "OPERATOR_APPROVAL",
            "ROLLBACK_BOUNDARY",
            "SCHEMA_MIGRATION_POLICY",
            "AUDIT_LEDGER_WRITE_POLICY"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverBoundaryCatalog() {
    }

    static List<String> boundaryCodes() {
        return BOUNDARY_CODES;
    }

    static List<String> requirementCodes() {
        return REQUIREMENT_CODES;
    }

    static String requirementCodeFor(String code) {
        int index = BOUNDARY_CODES.indexOf(code);
        if (index < 0) {
            throw new IllegalArgumentException("Unknown boundary code: " + code);
        }
        return REQUIREMENT_CODES.get(index);
    }

    static List<String> candidateReadyBoundaryCodes() {
        return CANDIDATE_READY_BOUNDARY_CODES;
    }

    static List<String> approvalRequiredBoundaryCodes() {
        return APPROVAL_REQUIRED_BOUNDARY_CODES;
    }

    static List<String> approvalRequiredRequirementCodes() {
        return APPROVAL_REQUIRED_BOUNDARY_CODES.stream()
                .map(ReleaseApprovalSandboxEndpointCredentialResolverBoundaryCatalog::requirementCodeFor)
                .toList();
    }

    static String candidateRuleFor(String code) {
        if (CANDIDATE_READY_BOUNDARY_CODES.contains(code)) {
            return code + " may be represented in the disabled interface or fake wiring review only.";
        }
        return code + " remains approval-required and cannot move into runtime behavior in v273.";
    }

    static String ownerFor(String code) {
        return switch (code) {
            case "PLAN_DOCUMENT", "ROLLBACK_BOUNDARY", "SCHEMA_MIGRATION_POLICY", "AUDIT_LEDGER_WRITE_POLICY" ->
                    "release-manager";
            case "CREDENTIAL_HANDLE", "ENDPOINT_HANDLE", "REDACTION_POLICY" -> "security";
            case "OPERATOR_APPROVAL" -> "operator";
            case "DISABLED_SECRET_PROVIDER_STUB", "EXTERNAL_REQUEST_SIMULATION" -> "node";
            default -> throw new IllegalArgumentException("Unknown boundary code: " + code);
        };
    }

    static List<String> prohibitedRuntimeActionsFor(String code) {
        return switch (code) {
            case "PLAN_DOCUMENT" -> List.of("implement-real-resolver", "open-managed-audit-connection");
            case "CREDENTIAL_HANDLE" -> List.of("read-credential-value", "store-credential-value");
            case "ENDPOINT_HANDLE" -> List.of("parse-raw-endpoint-url", "render-raw-endpoint-url");
            case "DISABLED_SECRET_PROVIDER_STUB" -> List.of("instantiate-secret-provider-runtime", "load-secret-value");
            case "OPERATOR_APPROVAL" -> List.of("execute-without-operator-marker", "auto-approve-operation");
            case "ROLLBACK_BOUNDARY" -> List.of("execute-rollback", "deploy-resolver-without-abort-marker");
            case "REDACTION_POLICY" -> List.of("log-secret-material", "log-raw-endpoint");
            case "EXTERNAL_REQUEST_SIMULATION" -> List.of("send-external-request", "connect-managed-audit");
            case "SCHEMA_MIGRATION_POLICY" -> List.of("execute-schema-migration", "execute-sql");
            case "AUDIT_LEDGER_WRITE_POLICY" -> List.of("write-approval-ledger", "write-managed-audit-state");
            default -> throw new IllegalArgumentException("Unknown boundary code: " + code);
        };
    }

    static String approvalRequiredEvidenceAllowedFor(String code) {
        return switch (code) {
            case "CREDENTIAL_HANDLE", "ENDPOINT_HANDLE", "OPERATOR_APPROVAL", "ROLLBACK_BOUNDARY",
                    "SCHEMA_MIGRATION_POLICY", "AUDIT_LEDGER_WRITE_POLICY" ->
                    "approval-required-read-only-evidence";
            default -> throw new IllegalArgumentException("Unknown approval-required boundary code: " + code);
        };
    }

    static String approvalReasonFor(String code) {
        return switch (code) {
            case "CREDENTIAL_HANDLE" ->
                    "Credential handle may be echoed only as an identifier; the credential value remains unread.";
            case "ENDPOINT_HANDLE" ->
                    "Endpoint handle may be echoed only as an identifier; the raw endpoint URL remains unparsed.";
            case "OPERATOR_APPROVAL" ->
                    "Operator approval must be supplied by a human-reviewed marker before resolver execution.";
            case "ROLLBACK_BOUNDARY" ->
                    "Rollback handling stays outside the disabled candidate and cannot execute from this receipt.";
            case "SCHEMA_MIGRATION_POLICY" ->
                    "Schema migration policy requires approval and cannot execute SQL from this receipt.";
            case "AUDIT_LEDGER_WRITE_POLICY" ->
                    "Audit ledger writes require approval and cannot be produced by this read-only evidence.";
            default -> throw new IllegalArgumentException("Unknown approval-required boundary code: " + code);
        };
    }

    static ApprovalRequiredImplementationTemplate approvalRequiredImplementationTemplateFor(String code) {
        return switch (code) {
            case "CREDENTIAL_HANDLE" -> new ApprovalRequiredImplementationTemplate(
                    "security",
                    List.of(
                            "credential-handle-review-id",
                            "credential-value-redaction-contract",
                            "operator-visible-secret-value-prohibition"
                    ),
                    "Echo credential handle review id without credential value fields.",
                    "Confirm no credential value load/store/include behavior.",
                    "Verify handle-only evidence and value-redaction invariants.",
                    List.of(
                            "read-credential-value",
                            "store-credential-value",
                            "render-credential-value"
                    )
            );
            case "ENDPOINT_HANDLE" -> new ApprovalRequiredImplementationTemplate(
                    "security",
                    List.of(
                            "endpoint-handle-review-id",
                            "allowlist-review-status",
                            "raw-endpoint-redaction-contract"
                    ),
                    "Echo endpoint handle and allowlist review status without raw URL.",
                    "Confirm no raw endpoint parse/include/connect behavior.",
                    "Verify handle-only endpoint evidence and no raw URL shape drift.",
                    List.of(
                            "parse-raw-endpoint-url",
                            "render-raw-endpoint-url",
                            "connect-managed-audit"
                    )
            );
            case "OPERATOR_APPROVAL" -> new ApprovalRequiredImplementationTemplate(
                    "operator",
                    List.of(
                            "operator-identity-binding",
                            "approval-correlation-marker",
                            "manual-window-open-marker"
                    ),
                    "Echo operator approval marker and manual-window evidence without executing ledger writes.",
                    "Confirm no auto-start and no approval side effects.",
                    "Verify operator marker completeness before any later dry-run shell.",
                    List.of(
                            "execute-without-operator-marker",
                            "auto-approve-operation",
                            "auto-start-upstream"
                    )
            );
            case "ROLLBACK_BOUNDARY" -> new ApprovalRequiredImplementationTemplate(
                    "release-manager",
                    List.of(
                            "rollback-abort-marker",
                            "restore-point-review-id",
                            "manual-rollback-runbook-reference"
                    ),
                    "Echo rollback abort marker and restore review id without executing rollback.",
                    "Confirm no LOAD/RESTORE/COMPACT and no authority over rollback state.",
                    "Verify rollback guard evidence stays separate from execution.",
                    List.of(
                            "execute-rollback",
                            "deploy-resolver-without-abort-marker",
                            "write-production-record"
                    )
            );
            case "SCHEMA_MIGRATION_POLICY" -> new ApprovalRequiredImplementationTemplate(
                    "release-manager",
                    List.of(
                            "schema-migration-rehearsal-id",
                            "migration-review-status",
                            "sql-execution-prohibition-marker"
                    ),
                    "Echo schema migration rehearsal id without executing SQL.",
                    "Confirm no admin command or schema/storage mutation participates.",
                    "Verify schema migration remains review-only.",
                    List.of(
                            "execute-schema-migration",
                            "execute-sql",
                            "mutate-managed-audit-schema"
                    )
            );
            case "AUDIT_LEDGER_WRITE_POLICY" -> new ApprovalRequiredImplementationTemplate(
                    "node",
                    List.of(
                            "approval-ledger-write-policy-id",
                            "audit-store-write-prohibition-marker",
                            "write-path-owner-review"
                    ),
                    "Echo ledger write policy id without writing approval ledger.",
                    "Confirm no storage/backend/write participation.",
                    "Verify all write paths stay blocked until an explicit later plan.",
                    List.of(
                            "write-approval-ledger",
                            "write-managed-audit-state",
                            "write-storage"
                    )
            );
            default -> throw new IllegalArgumentException("Unknown approval-required boundary code: " + code);
        };
    }
}
