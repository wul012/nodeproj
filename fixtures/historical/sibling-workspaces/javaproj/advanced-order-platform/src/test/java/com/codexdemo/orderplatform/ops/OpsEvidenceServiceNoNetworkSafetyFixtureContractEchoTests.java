package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureUpstreamEchoRequest;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceNoNetworkSafetyFixtureContractEchoTests extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsNoNetworkSafetyFixtureContractEchoReceiptForNodeV324() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt receipt =
                rehearsal.managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo("java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-no-network-safety-fixture-contract-echo-receipt.v1");
        assertThat(receipt.sourceEndpointHandleAllowlistApprovalContractEchoReceiptVersion())
                .isEqualTo(
                        rehearsal
                                .managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt()
                                .receiptVersion()
                );
        assertThat(receipt.sourceEndpointHandleAllowlistApprovalContractEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v48");
        assertThat(receipt.sourceEndpointHandleAllowlistApprovalContractEchoReceiptDigest())
                .isEqualTo(
                        rehearsal
                                .managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt()
                                .receiptDigest()
                );
        assertThat(receipt.consumedByNodeNoNetworkSafetyFixtureContractVersion()).isEqualTo("Node v323");
        assertThat(receipt.consumedByNodeNoNetworkSafetyFixtureContractProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake.v1"
                );
        assertThat(receipt.consumedByNodeNoNetworkSafetyFixtureContractEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake"
                );
        assertThat(receipt.consumedByNodeNoNetworkSafetyFixtureContractMarkdownEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake?format=markdown"
                );
        assertThat(receipt.consumedByNodeNoNetworkSafetyFixtureContractState())
                .isEqualTo("no-network-safety-fixture-contract-intake-ready");
        assertThat(receipt.nextNodeNoNetworkSafetyFixtureUpstreamEchoVerificationVersion())
                .isEqualTo("Node v324");
        assertThat(receipt.noNetworkSafetyFixtureContractEchoMode())
                .isEqualTo("java-v149-no-network-safety-fixture-contract-echo-only");

        assertThat(receipt.sourceNodeV322().sourceVersion()).isEqualTo("Node v322");
        assertThat(receipt.sourceNodeV322().reviewDigest())
                .isEqualTo("3b774f17053360aa1f3f747db9179298190d5c8daa03aaaf15ff591483eb863e");
        assertThat(receipt.sourceNodeV322().completedPrerequisiteCount()).isEqualTo(4);
        assertThat(receipt.sourceNodeV322().remainingPrerequisiteCount()).isEqualTo(2);
        assertThat(receipt.sourceNodeV322().remainingPrerequisiteIds())
                .containsExactly("no-network-safety-fixture", "abort-rollback-semantics");
        assertThat(receipt.sourceNodeV322().runtimeShellImplemented()).isFalse();
        assertThat(receipt.sourceNodeV322().externalRequestSent()).isFalse();

        assertThat(receipt.noNetworkSafetyFixtureContract().contractDigest())
                .isEqualTo("73dcd413298048da6283f81bd0c3b759b9c1c2d360eb1382983d7db7349b2b88");
        assertThat(receipt.noNetworkSafetyFixtureContract().contractName())
                .isEqualTo("managed-audit-no-network-safety-fixture");
        assertThat(receipt.noNetworkSafetyFixtureContract().contractVersion())
                .isEqualTo("no-network-safety-fixture.v1");
        assertThat(receipt.noNetworkSafetyFixtureContract().requiredFields())
                .map(RehearsalNoNetworkSafetyFixtureRequiredField::id)
                .containsExactly(
                        "fixture_id",
                        "operator_confirmation_handle",
                        "approval_correlation_id",
                        "transport_denial_policy_id",
                        "expected_denied_transport_classes",
                        "required_denial_evidence",
                        "forbidden_network_actions",
                        "cleanup_marker",
                        "timeout_budget_ms",
                        "audit_digest"
                );
        assertThat(receipt.noNetworkSafetyFixtureContract().prohibitedFields())
                .map(RehearsalNoNetworkSafetyFixtureProhibitedField::id)
                .containsExactly(
                        "credential_value",
                        "raw_endpoint_url",
                        "secret_provider_config",
                        "resolver_client_config",
                        "external_request_payload",
                        "network_socket_open",
                        "http_request_execution",
                        "tcp_connection_attempt",
                        "approval_ledger_mutation",
                        "schema_migration_sql",
                        "upstream_process_start",
                        "runtime_shell_invocation"
                );
        assertThat(receipt.noNetworkSafetyFixtureContract().noGoBoundaries())
                .map(RehearsalNoNetworkSafetyFixtureNoGoBoundary::id)
                .containsExactly(
                        "credential_value_read",
                        "raw_endpoint_url_parse",
                        "secret_provider_instantiation",
                        "resolver_client_instantiation",
                        "http_request_send",
                        "tcp_socket_connect",
                        "network_fixture_execution",
                        "ledger_or_schema_write",
                        "automatic_upstream_start",
                        "runtime_shell_invocation"
                );
        assertThat(receipt.noNetworkSafetyFixtureContract().upstreamEchoRequests())
                .map(RehearsalNoNetworkSafetyFixtureUpstreamEchoRequest::version)
                .containsExactly("Java v149", "mini-kv v141");
        assertThat(receipt.noNetworkSafetyFixtureContract().fixtureExecutionAllowed()).isFalse();
        assertThat(receipt.prerequisiteTransition().afterV323()).isEqualTo("contract-intake-defined");
        assertThat(receipt.necessityProof().consumer()).isEqualTo("Java v149 + mini-kv v141, then Node v324");

        assertThat(receipt.checks().sourceNodeV322Ready()).isTrue();
        assertThat(receipt.checks().sourceJavaV147EndpointHandleAllowlistApprovalContractReady()).isTrue();
        assertThat(receipt.checks().nodeV323ContractEchoed()).isTrue();
        assertThat(receipt.checks().contractRequiredFieldsDocumented()).isTrue();
        assertThat(receipt.checks().contractProhibitedFieldsDocumented()).isTrue();
        assertThat(receipt.checks().fixtureExecutionStillBlocked()).isTrue();
        assertThat(receipt.checks()
                .readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractEcho())
                .isTrue();
        assertThat(receipt.sideEffectBoundary().noNetworkSafetyFixtureContractEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyNoNetworkSafetyFixtureContract()).isTrue();
        assertThat(receipt.sideEffectBoundary().networkSafetyFixtureExecuted()).isFalse();
        assertThat(receipt.sideEffectBoundary().httpRequestSent()).isFalse();
        assertThat(receipt.sideEffectBoundary().tcpConnectionAttempted()).isFalse();
        assertThat(receipt.sideEffectBoundary().externalRequestSent()).isFalse();
        assertThat(receipt.sideEffectBoundary().approvalLedgerWritten()).isFalse();
        assertThat(receipt.sideEffectBoundary().sqlExecuted()).isFalse();
        assertThat(receipt.readyForNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");
        assertThat(receipt.summary().javaCheckCount()).isEqualTo(22);
        assertThat(receipt.summary().requiredFieldCount()).isEqualTo(10);
        assertThat(receipt.summary().prohibitedFieldCount()).isEqualTo(12);
        assertThat(receipt.summary().noGoBoundaryCount()).isEqualTo(10);
        assertThat(receipt.summary().warningCount()).isEqualTo(2);
        assertThat(receipt.summary().recommendationCount()).isEqualTo(2);

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v49");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractState",
                        "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRequiredFieldCount",
                        "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractReadyForNodeV324",
                        "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractHttpRequestSent",
                        "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractTcpConnectionAttempted"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.noNetworkSafetyFixtureContract.requiredFieldCount=10",
                        "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.noNetworkSafetyFixtureContract.prohibitedFieldCount=12",
                        "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.readyForNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.consumedByNodeNoNetworkSafetyFixtureContractProfile with Node v323",
                        "Require managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.noNetworkSafetyFixtureContract.requiredFieldCount=10 before Node v324",
                        "Keep managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt.sideEffectBoundary.httpRequestSent=false"
                );
        assertThat(rehearsal.verificationHint().noLedgerWriteProved()).isTrue();

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }
}
