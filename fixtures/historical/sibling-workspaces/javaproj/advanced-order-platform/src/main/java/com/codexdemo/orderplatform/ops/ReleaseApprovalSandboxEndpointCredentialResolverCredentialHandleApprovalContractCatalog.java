package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalRejectionReason;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalUpstreamEchoRequest;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog {

    static final String TARGET_PREREQUISITE_ID = "credential-handle-approval";
    static final String NODE_V317_CONTRACT_DIGEST =
            "298ffb48a00aab4f4630b42fc7b48805185d50a5465938768bd78943e05ae817";
    static final String SOURCE_NODE_V316_REVIEW_DIGEST =
            "63de25a3ff87d5d9ea8243d0195f3f646bc3bb08ab2aae76533f9a871674444d";

    private static final List<RequiredFieldTemplate> REQUIRED_FIELDS = List.of(
            requiredField("credential_handle", "Credential handle", "stable non-secret credential handle",
                    "Identify which credential handle was reviewed without exposing the resolved credential value."),
            requiredField("approval_correlation_id", "Approval correlation id",
                    "stable non-secret correlation id", "Bind the handle review to the signed approval chain."),
            requiredField("operator_identity_handle", "Operator identity handle",
                    "operator identity handle, no credential value",
                    "Identify the requesting operator without embedding secret material."),
            requiredField("reviewer_identity_handle", "Reviewer identity handle",
                    "reviewer identity handle, no private key",
                    "Identify the human reviewer without carrying credentials or signing keys."),
            requiredField("policy_version", "Policy version", "policy id or semantic version",
                    "Bind the handle approval to a known review policy contract."),
            requiredField("approval_status", "Approval status", "approved, rejected, expired, or revoked",
                    "Keep this version contract-only and status-based."),
            requiredField("issued_at", "Issued at", "ISO-8601 timestamp",
                    "Declare when the credential handle approval was issued."),
            requiredField("expires_at", "Expires at", "ISO-8601 timestamp",
                    "Prevent stale handle approvals from being treated as current."),
            requiredField("revocation_marker", "Revocation marker",
                    "boolean marker plus optional evidence handle",
                    "Make revocation explicit without reading any secret provider state."),
            requiredField("audit_digest", "Audit digest", "sha256 digest or equivalent stable digest",
                    "Prove contract immutability without embedding raw credential or endpoint material.")
    );

    private static final List<ProhibitedFieldTemplate> PROHIBITED_FIELDS = List.of(
            prohibitedField("credential_value",
                    "Credential values must not enter the handle approval contract.",
                    "CREDENTIAL_VALUE_PRESENT"),
            prohibitedField("raw_endpoint_url",
                    "Endpoint material remains handle/allowlist-only and belongs to a later prerequisite.",
                    "RAW_ENDPOINT_URL_PRESENT"),
            prohibitedField("secret_provider_config",
                    "Provider configuration would turn this contract into implementation.",
                    "SECRET_PROVIDER_CONFIG_PRESENT"),
            prohibitedField("resolver_client_config",
                    "Resolver client configuration is not allowed in a contract-only intake.",
                    "RESOLVER_CLIENT_CONFIG_PRESENT"),
            prohibitedField("provider_client_runtime_binding",
                    "Runtime bindings for providers or clients remain out of scope.",
                    "PROVIDER_CLIENT_RUNTIME_BINDING_PRESENT"),
            prohibitedField("external_request_payload",
                    "No HTTP/TCP payload may be prepared or sent by v317.",
                    "EXTERNAL_REQUEST_PAYLOAD_PRESENT"),
            prohibitedField("approval_ledger_mutation",
                    "Approval ledger writes remain outside this Node contract.",
                    "APPROVAL_LEDGER_MUTATION_PRESENT"),
            prohibitedField("schema_migration_sql",
                    "Schema migration SQL is prohibited in this intake.",
                    "SCHEMA_MIGRATION_SQL_PRESENT")
    );

    private static final List<RejectionTemplate> REJECTION_REASONS = List.of(
            rejection("CREDENTIAL_HANDLE_MISSING", "credential-handle-contract",
                    "The credential handle approval contract fields are missing."),
            rejection("CREDENTIAL_VALUE_PRESENT", "credential-boundary",
                    "Credential values are not allowed; only handles and review statuses are allowed."),
            rejection("RAW_ENDPOINT_URL_PRESENT", "endpoint-boundary",
                    "Raw endpoint URLs are not allowed; endpoint allowlist approval is a separate prerequisite."),
            rejection("PROVIDER_CLIENT_CONFIG_PRESENT", "provider-client-boundary",
                    "Secret provider and resolver client config are prohibited in this intake."),
            rejection("WRITE_OR_MIGRATION_PRESENT", "write-boundary",
                    "Ledger writes, schema migration, deployment, and rollback execution are prohibited.")
    );

    private static final List<NoGoTemplate> NO_GO_BOUNDARIES = List.of(
            noGo("credential_value_read", "v317 must not read managed audit credential values."),
            noGo("raw_endpoint_url_parse", "v317 must not parse or render raw endpoint URLs."),
            noGo("secret_provider_instantiation", "v317 must not instantiate secret providers."),
            noGo("resolver_client_instantiation", "v317 must not instantiate resolver clients."),
            noGo("external_request", "v317 must not send HTTP/TCP requests."),
            noGo("ledger_or_schema_write", "v317 must not write approval ledger or schema state."),
            noGo("automatic_upstream_start",
                    "v317 must not automatically start Java, mini-kv, or external audit services."),
            noGo("runtime_shell_implementation", "v317 must not implement a runtime shell."),
            noGo("runtime_shell_invocation", "v317 must not invoke a runtime shell.")
    );

    private static final List<EchoRequestTemplate> UPSTREAM_ECHO_REQUESTS = List.of(
            echoRequest("java", "Java v146",
                    "Read-only echo of the Node v317 credential-handle approval contract."),
            echoRequest("mini-kv", "mini-kv v139",
                    "Non-participation receipt proving mini-kv does not store, validate, resolve, or become authority for credential handles.")
    );

    private static final List<String> SOURCE_COMPLETED_PREREQUISITE_IDS = List.of(
            "java-mini-kv-decision-echo",
            "signed-human-approval-artifact"
    );

    private static final List<String> SOURCE_REMAINING_PREREQUISITE_IDS = List.of(
            TARGET_PREREQUISITE_ID,
            "endpoint-handle-allowlist-approval",
            "no-network-safety-fixture",
            "abort-rollback-semantics"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.consumedByNodeCredentialHandleApprovalContractState=credential-handle-approval-contract-intake-ready",
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.credentialHandleApprovalContract.requiredFieldCount=10",
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.credentialHandleApprovalContract.prohibitedFieldCount=8",
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.credentialHandleApprovalContract.noGoBoundaryCount=9",
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.prerequisiteTransition.afterV317=contract-intake-defined",
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.sideEffectBoundary.credentialAuthorityClaimedByJava=false",
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.readyForNodeV318CredentialHandleApprovalContractUpstreamEchoVerification=true"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.consumedByNodeCredentialHandleApprovalContractProfile with Node v317",
            "Require managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.credentialHandleApprovalContract.requiredFieldCount=10 before Node v318",
            "Require managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.credentialHandleApprovalContract.prohibitedFieldCount=8 before Node v318",
            "Require managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.readyForNodeV318CredentialHandleApprovalContractUpstreamEchoVerification=true before Node v318",
            "Keep managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.sideEffectBoundary.credentialAuthorityClaimedByJava=false"
    );

    private static final List<String> WARNING_CODES = List.of(
            "CREDENTIAL_HANDLE_CONTRACT_DOES_NOT_CLOSE_ALL_PREREQUISITES",
            "CREDENTIAL_HANDLE_APPROVAL_IS_NOT_CREDENTIAL_RESOLUTION"
    );

    private static final List<String> RECOMMENDATION_CODES = List.of(
            "RUN_JAVA_V146_AND_MINI_KV_V139_AFTER_V317_ARCHIVE",
            "KEEP_CREDENTIAL_HANDLE_APPROVAL_NON_SECRET"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "mini-kv v139 credential-handle approval non-participation receipt",
            "Node v318 credential-handle approval contract upstream echo verification"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog() {
    }

    static List<RehearsalCredentialHandleApprovalRequiredField> requiredFields() {
        return REQUIRED_FIELDS.stream()
                .map(template -> new RehearsalCredentialHandleApprovalRequiredField(
                        template.id(), template.label(), true, template.acceptedShape(), template.purpose()
                ))
                .toList();
    }

    static List<RehearsalCredentialHandleApprovalProhibitedField> prohibitedFields() {
        return PROHIBITED_FIELDS.stream()
                .map(template -> new RehearsalCredentialHandleApprovalProhibitedField(
                        template.id(), template.reason(), template.rejectionCode()
                ))
                .toList();
    }

    static List<RehearsalCredentialHandleApprovalRejectionReason> rejectionReasons() {
        return REJECTION_REASONS.stream()
                .map(template -> new RehearsalCredentialHandleApprovalRejectionReason(
                        template.code(), template.source(), template.message()
                ))
                .toList();
    }

    static List<RehearsalCredentialHandleApprovalNoGoBoundary> noGoBoundaries() {
        return NO_GO_BOUNDARIES.stream()
                .map(template -> new RehearsalCredentialHandleApprovalNoGoBoundary(
                        template.id(), false, template.message()
                ))
                .toList();
    }

    static List<RehearsalCredentialHandleApprovalUpstreamEchoRequest> upstreamEchoRequests() {
        return UPSTREAM_ECHO_REQUESTS.stream()
                .map(template -> new RehearsalCredentialHandleApprovalUpstreamEchoRequest(
                        template.project(), template.version(), template.requestedEcho(), true, true
                ))
                .toList();
    }

    static List<String> requiredFieldIds() {
        return REQUIRED_FIELDS.stream().map(RequiredFieldTemplate::id).toList();
    }

    static List<String> prohibitedFieldIds() {
        return PROHIBITED_FIELDS.stream().map(ProhibitedFieldTemplate::id).toList();
    }

    static List<String> noGoBoundaryIds() {
        return NO_GO_BOUNDARIES.stream().map(NoGoTemplate::id).toList();
    }

    static List<String> sourceCompletedPrerequisiteIds() {
        return SOURCE_COMPLETED_PREREQUISITE_IDS;
    }

    static List<String> sourceRemainingPrerequisiteIds() {
        return SOURCE_REMAINING_PREREQUISITE_IDS;
    }

    static List<String> proofClaims() {
        return PROOF_CLAIMS;
    }

    static List<String> nodeVerificationActions() {
        return NODE_VERIFICATION_ACTIONS;
    }

    static List<String> warningCodes() {
        return WARNING_CODES;
    }

    static List<String> recommendationCodes() {
        return RECOMMENDATION_CODES;
    }

    static List<String> nextRequiredEchoVersions() {
        return NEXT_REQUIRED_ECHO_VERSIONS;
    }

    private static RequiredFieldTemplate requiredField(
            String id,
            String label,
            String acceptedShape,
            String purpose
    ) {
        return new RequiredFieldTemplate(id, label, acceptedShape, purpose);
    }

    private static ProhibitedFieldTemplate prohibitedField(String id, String reason, String rejectionCode) {
        return new ProhibitedFieldTemplate(id, reason, rejectionCode);
    }

    private static RejectionTemplate rejection(String code, String source, String message) {
        return new RejectionTemplate(code, source, message);
    }

    private static NoGoTemplate noGo(String id, String message) {
        return new NoGoTemplate(id, message);
    }

    private static EchoRequestTemplate echoRequest(String project, String version, String requestedEcho) {
        return new EchoRequestTemplate(project, version, requestedEcho);
    }

    private record RequiredFieldTemplate(String id, String label, String acceptedShape, String purpose) {
    }

    private record ProhibitedFieldTemplate(String id, String reason, String rejectionCode) {
    }

    private record RejectionTemplate(String code, String source, String message) {
    }

    private record NoGoTemplate(String id, String message) {
    }

    private record EchoRequestTemplate(String project, String version, String requestedEcho) {
    }
}
