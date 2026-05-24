package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalRejectionReason;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalUpstreamEchoRequest;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceEndpointHandleAllowlistApprovalContractEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsEndpointHandleAllowlistApprovalContractEchoReceiptForNodeV321() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt receipt =
                rehearsal.managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo("java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-endpoint-handle-allowlist-approval-contract-echo-receipt.v1");
        assertThat(receipt.sourceCredentialHandleApprovalContractEchoReceiptVersion())
                .isEqualTo(
                        rehearsal.managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt()
                                .receiptVersion()
                );
        assertThat(receipt.sourceCredentialHandleApprovalContractEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v47");
        assertThat(receipt.sourceCredentialHandleApprovalContractEchoReceiptDigest())
                .isEqualTo(
                        rehearsal.managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt()
                                .receiptDigest()
                );
        assertThat(receipt.consumedByNodeEndpointHandleAllowlistApprovalContractVersion()).isEqualTo("Node v320");
        assertThat(receipt.consumedByNodeEndpointHandleAllowlistApprovalContractProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake.v1"
                );
        assertThat(receipt.consumedByNodeEndpointHandleAllowlistApprovalContractEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake"
                );
        assertThat(receipt.consumedByNodeEndpointHandleAllowlistApprovalContractMarkdownEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake?format=markdown"
                );
        assertThat(receipt.consumedByNodeEndpointHandleAllowlistApprovalContractState())
                .isEqualTo("endpoint-handle-allowlist-approval-contract-intake-ready");
        assertThat(receipt.nextNodeEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationVersion())
                .isEqualTo("Node v321");
        assertThat(receipt.endpointHandleAllowlistApprovalContractEchoMode())
                .isEqualTo("java-v147-endpoint-handle-allowlist-approval-contract-echo-only");

        assertThat(receipt.sourceNodeV319().sourceVersion()).isEqualTo("Node v319");
        assertThat(receipt.sourceNodeV319().reviewDigest())
                .isEqualTo("59888d94ccd996aeb2f126c25291a8f5ba6f37d6d93cdf190fc656c0121bc7e5");
        assertThat(receipt.sourceNodeV319().completedPrerequisiteCount()).isEqualTo(3);
        assertThat(receipt.sourceNodeV319().remainingPrerequisiteCount()).isEqualTo(3);
        assertThat(receipt.sourceNodeV319().completedPrerequisiteIds())
                .containsExactly(
                        "java-mini-kv-decision-echo",
                        "signed-human-approval-artifact",
                        "credential-handle-approval"
                );
        assertThat(receipt.sourceNodeV319().remainingPrerequisiteIds())
                .containsExactly(
                        "endpoint-handle-allowlist-approval",
                        "no-network-safety-fixture",
                        "abort-rollback-semantics"
                );
        assertThat(receipt.sourceNodeV319().runtimeShellImplemented()).isFalse();
        assertThat(receipt.sourceNodeV319().automaticUpstreamStart()).isFalse();

        assertThat(receipt.endpointHandleAllowlistApprovalContract().contractDigest())
                .isEqualTo("4657f89caa6866bad87db284dc98efd8d09a6538d8d735535e6a7e6d4d6c33e5");
        assertThat(receipt.endpointHandleAllowlistApprovalContract().contractName())
                .isEqualTo("managed-audit-endpoint-handle-allowlist-approval");
        assertThat(receipt.endpointHandleAllowlistApprovalContract().contractVersion())
                .isEqualTo("endpoint-handle-allowlist-approval.v1");
        assertThat(receipt.endpointHandleAllowlistApprovalContract().requiredFields())
                .map(RehearsalEndpointHandleAllowlistApprovalRequiredField::id)
                .containsExactly(
                        "endpoint_handle",
                        "approval_correlation_id",
                        "operator_identity_handle",
                        "reviewer_identity_handle",
                        "policy_version",
                        "approval_status",
                        "issued_at",
                        "expires_at",
                        "revocation_marker",
                        "audit_digest"
                );
        assertThat(receipt.endpointHandleAllowlistApprovalContract().prohibitedFields())
                .map(RehearsalEndpointHandleAllowlistApprovalProhibitedField::id)
                .containsExactly(
                        "credential_value",
                        "raw_endpoint_url",
                        "secret_provider_config",
                        "resolver_client_config",
                        "provider_client_runtime_binding",
                        "external_request_payload",
                        "approval_ledger_mutation",
                        "schema_migration_sql"
                );
        assertThat(receipt.endpointHandleAllowlistApprovalContract().rejectionReasons())
                .map(RehearsalEndpointHandleAllowlistApprovalRejectionReason::code)
                .containsExactly(
                        "ENDPOINT_HANDLE_MISSING",
                        "CREDENTIAL_VALUE_PRESENT",
                        "RAW_ENDPOINT_URL_PRESENT",
                        "PROVIDER_CLIENT_CONFIG_PRESENT",
                        "WRITE_OR_MIGRATION_PRESENT"
                );
        assertThat(receipt.endpointHandleAllowlistApprovalContract().noGoBoundaries())
                .map(RehearsalEndpointHandleAllowlistApprovalNoGoBoundary::id)
                .containsExactly(
                        "credential_value_read",
                        "raw_endpoint_url_parse",
                        "secret_provider_instantiation",
                        "resolver_client_instantiation",
                        "external_request",
                        "ledger_or_schema_write",
                        "automatic_upstream_start",
                        "runtime_shell_implementation",
                        "runtime_shell_invocation"
                );
        assertThat(receipt.endpointHandleAllowlistApprovalContract().upstreamEchoRequests())
                .map(RehearsalEndpointHandleAllowlistApprovalUpstreamEchoRequest::version)
                .containsExactly("Java v147", "mini-kv v140");
        assertThat(receipt.prerequisiteTransition().afterV320()).isEqualTo("contract-intake-defined");
        assertThat(receipt.necessityProof().consumer()).isEqualTo("Java v147 + mini-kv v140, then Node v321");

        assertThat(receipt.checks().sourceNodeV319Ready()).isTrue();
        assertThat(receipt.checks().sourceJavaV146CredentialHandleApprovalContractReady()).isTrue();
        assertThat(receipt.checks().nodeV320ContractEchoed()).isTrue();
        assertThat(receipt.checks().contractRequiredFieldsDocumented()).isTrue();
        assertThat(receipt.checks().contractProhibitedFieldsDocumented()).isTrue();
        assertThat(receipt.checks().javaMiniKvEchoRequestExplicitlyParallel()).isTrue();
        assertThat(receipt.checks()
                .readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractEcho())
                .isTrue();
        assertThat(receipt.sideEffectBoundary().endpointHandleAllowlistApprovalContractEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyEndpointHandleAllowlistApprovalContract()).isTrue();
        assertThat(receipt.sideEffectBoundary().credentialValueRead()).isFalse();
        assertThat(receipt.sideEffectBoundary().endpointHandleAuthorityClaimedByJava()).isFalse();
        assertThat(receipt.sideEffectBoundary().secretProviderInstantiated()).isFalse();
        assertThat(receipt.sideEffectBoundary().resolverClientInstantiated()).isFalse();
        assertThat(receipt.sideEffectBoundary().approvalLedgerWritten()).isFalse();
        assertThat(receipt.readyForNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");
        assertThat(receipt.summary().requiredFieldCount()).isEqualTo(10);
        assertThat(receipt.summary().prohibitedFieldCount()).isEqualTo(8);
        assertThat(receipt.summary().rejectionReasonCount()).isEqualTo(5);
        assertThat(receipt.summary().noGoBoundaryCount()).isEqualTo(9);
        assertThat(receipt.summary().upstreamEchoRequestCount()).isEqualTo(2);
        assertThat(receipt.summary().warningCount()).isEqualTo(2);
        assertThat(receipt.summary().recommendationCount()).isEqualTo(2);

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v48");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractState",
                        "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRequiredFieldCount",
                        "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractReadyForNodeV321",
                        "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEndpointHandleAuthorityClaimed"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt.endpointHandleAllowlistApprovalContract.requiredFieldCount=10",
                        "managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt.endpointHandleAllowlistApprovalContract.prohibitedFieldCount=8",
                        "managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt.readyForNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt.consumedByNodeEndpointHandleAllowlistApprovalContractProfile with Node v320",
                        "Require managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt.endpointHandleAllowlistApprovalContract.requiredFieldCount=10 before Node v321",
                        "Keep managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt.sideEffectBoundary.endpointHandleAuthorityClaimedByJava=false"
                );
        assertThat(rehearsal.verificationHint().noLedgerWriteProved()).isTrue();

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }
}
