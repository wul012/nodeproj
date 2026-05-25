package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureRejectionReason;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureUpstreamEchoRequest;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog {

    static final String TARGET_PREREQUISITE_ID = "no-network-safety-fixture";
    static final String NODE_V323_CONTRACT_DIGEST =
            "73dcd413298048da6283f81bd0c3b759b9c1c2d360eb1382983d7db7349b2b88";
    static final String SOURCE_NODE_V322_REVIEW_DIGEST =
            "3b774f17053360aa1f3f747db9179298190d5c8daa03aaaf15ff591483eb863e";

    private static final List<RequiredFieldTemplate> REQUIRED_FIELDS = List.of(
            requiredField("fixture_id", "Fixture id", "stable non-secret fixture identifier",
                    "Identify the no-network safety fixture without running it."),
            requiredField("operator_confirmation_handle", "Operator confirmation handle",
                    "operator confirmation handle, no credential value",
                    "Bind fixture review to a human operator confirmation."),
            requiredField("approval_correlation_id", "Approval correlation id",
                    "stable non-secret correlation id",
                    "Bind the fixture contract to the approval chain."),
            requiredField("transport_denial_policy_id", "Transport denial policy id",
                    "policy id or semantic version",
                    "Declare which no-network denial policy is expected."),
            requiredField("expected_denied_transport_classes", "Expected denied transport classes",
                    "HTTP, HTTPS, TCP, TLS, DNS, or equivalent class names",
                    "List transport classes the future path must refuse before approval."),
            requiredField("required_denial_evidence", "Required denial evidence",
                    "machine-readable denial evidence handle or digest",
                    "Declare the evidence a later verification must observe."),
            requiredField("forbidden_network_actions", "Forbidden network actions",
                    "non-empty action id list",
                    "List network actions that must not occur in contract intake."),
            requiredField("cleanup_marker", "Cleanup marker", "stable cleanup marker or digest",
                    "Prove any future fixture run has a cleanup requirement."),
            requiredField("timeout_budget_ms", "Timeout budget ms", "positive integer budget",
                    "Bound any future denial verification without running it in v323."),
            requiredField("audit_digest", "Audit digest", "sha256 digest or equivalent stable digest",
                    "Prove contract immutability without embedding secret or endpoint material.")
    );

    private static final List<ProhibitedFieldTemplate> PROHIBITED_FIELDS = List.of(
            prohibitedField("credential_value",
                    "Credential values must not enter the no-network safety fixture contract.",
                    "CREDENTIAL_VALUE_PRESENT"),
            prohibitedField("raw_endpoint_url",
                    "Raw endpoint URLs must not enter this contract; only handles and denial policy ids are allowed.",
                    "RAW_ENDPOINT_URL_PRESENT"),
            prohibitedField("secret_provider_config",
                    "Provider configuration would turn this contract into implementation.",
                    "SECRET_PROVIDER_CONFIG_PRESENT"),
            prohibitedField("resolver_client_config",
                    "Resolver client configuration is not allowed in a contract-only intake.",
                    "RESOLVER_CLIENT_CONFIG_PRESENT"),
            prohibitedField("external_request_payload",
                    "No HTTP/TCP payload may be prepared or sent by v323.",
                    "EXTERNAL_REQUEST_PAYLOAD_PRESENT"),
            prohibitedField("network_socket_open",
                    "Opening sockets is prohibited during contract intake.",
                    "NETWORK_SOCKET_OPEN_PRESENT"),
            prohibitedField("http_request_execution",
                    "HTTP request execution is prohibited during contract intake.",
                    "HTTP_REQUEST_EXECUTION_PRESENT"),
            prohibitedField("tcp_connection_attempt",
                    "TCP connection attempts are prohibited during contract intake.",
                    "TCP_CONNECTION_ATTEMPT_PRESENT"),
            prohibitedField("approval_ledger_mutation",
                    "Approval ledger writes remain outside this Node contract.",
                    "APPROVAL_LEDGER_MUTATION_PRESENT"),
            prohibitedField("schema_migration_sql",
                    "Schema migration SQL is prohibited in this intake.",
                    "SCHEMA_MIGRATION_SQL_PRESENT"),
            prohibitedField("upstream_process_start",
                    "Starting Java, mini-kv, or external audit services is prohibited.",
                    "UPSTREAM_PROCESS_START_PRESENT"),
            prohibitedField("runtime_shell_invocation",
                    "Runtime shell invocation remains prohibited.",
                    "RUNTIME_SHELL_INVOCATION_PRESENT")
    );

    private static final List<RejectionTemplate> REJECTION_REASONS = List.of(
            rejection("FIXTURE_ID_MISSING", "no-network-fixture-contract",
                    "The no-network safety fixture id is missing."),
            rejection("DENIAL_POLICY_MISSING", "no-network-fixture-contract",
                    "The transport denial policy id or expected denied transport classes are missing."),
            rejection("NETWORK_ACTION_PRESENT", "network-boundary",
                    "Network execution, socket opening, HTTP requests, or TCP connection attempts are prohibited."),
            rejection("CREDENTIAL_OR_RAW_ENDPOINT_PRESENT", "credential-boundary",
                    "Credential values and raw endpoint URLs are not allowed in the fixture contract."),
            rejection("PROVIDER_CLIENT_CONFIG_PRESENT", "provider-client-boundary",
                    "Secret provider and resolver client config are prohibited in this intake."),
            rejection("WRITE_OR_RUNTIME_ACTION_PRESENT", "write-boundary",
                    "Ledger writes, schema migration, deployment, rollback, upstream start, and runtime shell invocation are prohibited.")
    );

    private static final List<NoGoTemplate> NO_GO_BOUNDARIES = List.of(
            noGo("credential_value_read", "v323 must not read managed audit credential values."),
            noGo("raw_endpoint_url_parse", "v323 must not parse or render raw endpoint URLs."),
            noGo("secret_provider_instantiation", "v323 must not instantiate secret providers."),
            noGo("resolver_client_instantiation", "v323 must not instantiate resolver clients."),
            noGo("http_request_send", "v323 must not send HTTP/HTTPS requests."),
            noGo("tcp_socket_connect", "v323 must not open TCP/TLS sockets."),
            noGo("network_fixture_execution",
                    "v323 must not execute a no-network fixture; it only defines the contract."),
            noGo("ledger_or_schema_write", "v323 must not write approval ledger or schema state."),
            noGo("automatic_upstream_start",
                    "v323 must not automatically start Java, mini-kv, or external audit services."),
            noGo("runtime_shell_invocation", "v323 must not invoke a runtime shell.")
    );

    private static final List<EchoRequestTemplate> UPSTREAM_ECHO_REQUESTS = List.of(
            echoRequest("java", "Java v149",
                    "Read-only echo of the Node v323 no-network safety fixture contract, confirming Java will not execute SQL, deployment, rollback, ledger writes, or external network calls."),
            echoRequest("mini-kv", "mini-kv v141",
                    "Non-participation receipt proving mini-kv does not execute LOAD/COMPACT/RESTORE/SETNXEX, open network sockets, or become network safety authority.")
    );

    private static final List<String> SOURCE_COMPLETED_PREREQUISITE_IDS = List.of(
            "java-mini-kv-decision-echo",
            "signed-human-approval-artifact",
            "credential-handle-approval",
            "endpoint-handle-allowlist-approval"
    );

    private static final List<String> SOURCE_REMAINING_PREREQUISITE_IDS = List.of(
            "no-network-safety-fixture",
            "abort-rollback-semantics"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.consumedByNodeNoNetworkSafetyFixtureContractState=no-network-safety-fixture-contract-intake-ready",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.noNetworkSafetyFixtureContract.requiredFieldCount=10",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.noNetworkSafetyFixtureContract.prohibitedFieldCount=12",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.noNetworkSafetyFixtureContract.noGoBoundaryCount=10",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.prerequisiteTransition.afterV323=contract-intake-defined",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.networkSafetyFixtureExecuted=false",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.httpRequestSent=false",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.tcpConnectionAttempted=false",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.externalRequestSent=false",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.readyForNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification=true"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.consumedByNodeNoNetworkSafetyFixtureContractProfile with Node v323",
            "Require managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.noNetworkSafetyFixtureContract.requiredFieldCount=10 before Node v324",
            "Require managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.noNetworkSafetyFixtureContract.prohibitedFieldCount=12 before Node v324",
            "Require managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.readyForNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification=true before Node v324",
            "Keep managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.networkSafetyFixtureExecuted=false",
            "Keep managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.httpRequestSent=false",
            "Keep managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.tcpConnectionAttempted=false",
            "Keep managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false"
    );

    private static final List<String> WARNING_CODES = List.of(
            "NO_NETWORK_SAFETY_FIXTURE_CONTRACT_DOES_NOT_EXECUTE_FIXTURE",
            "NO_NETWORK_SAFETY_FIXTURE_DOES_NOT_CLOSE_ABORT_ROLLBACK"
    );

    private static final List<String> RECOMMENDATION_CODES = List.of(
            "RUN_JAVA_V149_AND_MINI_KV_V141_AFTER_V323_ARCHIVE",
            "KEEP_NO_NETWORK_FIXTURE_CONTRACT_NON_EXECUTING"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "mini-kv v141 no-network safety fixture non-participation receipt",
            "Node v324 no-network safety fixture upstream echo verification"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog() {
    }

    static List<RehearsalNoNetworkSafetyFixtureRequiredField> requiredFields() {
        return REQUIRED_FIELDS.stream()
                .map(template -> new RehearsalNoNetworkSafetyFixtureRequiredField(
                        template.id(), template.label(), true, template.acceptedShape(), template.purpose()
                ))
                .toList();
    }

    static List<RehearsalNoNetworkSafetyFixtureProhibitedField> prohibitedFields() {
        return PROHIBITED_FIELDS.stream()
                .map(template -> new RehearsalNoNetworkSafetyFixtureProhibitedField(
                        template.id(), template.reason(), template.rejectionCode()
                ))
                .toList();
    }

    static List<RehearsalNoNetworkSafetyFixtureRejectionReason> rejectionReasons() {
        return REJECTION_REASONS.stream()
                .map(template -> new RehearsalNoNetworkSafetyFixtureRejectionReason(
                        template.code(), template.source(), template.message()
                ))
                .toList();
    }

    static List<RehearsalNoNetworkSafetyFixtureNoGoBoundary> noGoBoundaries() {
        return NO_GO_BOUNDARIES.stream()
                .map(template -> new RehearsalNoNetworkSafetyFixtureNoGoBoundary(
                        template.id(), false, template.message()
                ))
                .toList();
    }

    static List<RehearsalNoNetworkSafetyFixtureUpstreamEchoRequest> upstreamEchoRequests() {
        return UPSTREAM_ECHO_REQUESTS.stream()
                .map(template -> new RehearsalNoNetworkSafetyFixtureUpstreamEchoRequest(
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
