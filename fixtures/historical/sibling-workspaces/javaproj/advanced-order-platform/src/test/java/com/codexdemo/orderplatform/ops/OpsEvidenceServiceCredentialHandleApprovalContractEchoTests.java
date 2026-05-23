package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalRejectionReason;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalUpstreamEchoRequest;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceCredentialHandleApprovalContractEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsCredentialHandleApprovalContractEchoReceiptForNodeV318() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt receipt =
                rehearsal.managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo("java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-credential-handle-approval-contract-echo-receipt.v1");
        assertThat(receipt.sourceSignedHumanApprovalArtifactContractEchoReceiptVersion())
                .isEqualTo(
                        rehearsal.managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt()
                                .receiptVersion()
                );
        assertThat(receipt.sourceSignedHumanApprovalArtifactContractEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v46");
        assertThat(receipt.sourceSignedHumanApprovalArtifactContractEchoReceiptDigest())
                .isEqualTo(
                        rehearsal.managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt()
                                .receiptDigest()
                );
        assertThat(receipt.consumedByNodeCredentialHandleApprovalContractVersion()).isEqualTo("Node v317");
        assertThat(receipt.consumedByNodeCredentialHandleApprovalContractProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake.v1"
                );
        assertThat(receipt.consumedByNodeCredentialHandleApprovalContractEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake"
                );
        assertThat(receipt.consumedByNodeCredentialHandleApprovalContractMarkdownEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake?format=markdown"
                );
        assertThat(receipt.consumedByNodeCredentialHandleApprovalContractState())
                .isEqualTo("credential-handle-approval-contract-intake-ready");
        assertThat(receipt.nextNodeCredentialHandleApprovalContractUpstreamEchoVerificationVersion())
                .isEqualTo("Node v318");
        assertThat(receipt.credentialHandleApprovalContractEchoMode())
                .isEqualTo("java-v146-credential-handle-approval-contract-echo-only");

        assertThat(receipt.sourceNodeV316().sourceVersion()).isEqualTo("Node v316");
        assertThat(receipt.sourceNodeV316().reviewDigest())
                .isEqualTo("63de25a3ff87d5d9ea8243d0195f3f646bc3bb08ab2aae76533f9a871674444d");
        assertThat(receipt.sourceNodeV316().completedPrerequisiteCount()).isEqualTo(2);
        assertThat(receipt.sourceNodeV316().remainingPrerequisiteCount()).isEqualTo(4);
        assertThat(receipt.sourceNodeV316().completedPrerequisiteIds())
                .containsExactly("java-mini-kv-decision-echo", "signed-human-approval-artifact");
        assertThat(receipt.sourceNodeV316().remainingPrerequisiteIds())
                .containsExactly(
                        "credential-handle-approval",
                        "endpoint-handle-allowlist-approval",
                        "no-network-safety-fixture",
                        "abort-rollback-semantics"
                );
        assertThat(receipt.sourceNodeV316().runtimeShellImplemented()).isFalse();
        assertThat(receipt.sourceNodeV316().automaticUpstreamStart()).isFalse();

        assertThat(receipt.credentialHandleApprovalContract().contractDigest())
                .isEqualTo("298ffb48a00aab4f4630b42fc7b48805185d50a5465938768bd78943e05ae817");
        assertThat(receipt.credentialHandleApprovalContract().contractName())
                .isEqualTo("managed-audit-credential-handle-approval");
        assertThat(receipt.credentialHandleApprovalContract().contractVersion())
                .isEqualTo("credential-handle-approval.v1");
        assertThat(receipt.credentialHandleApprovalContract().requiredFields())
                .map(RehearsalCredentialHandleApprovalRequiredField::id)
                .containsExactly(
                        "credential_handle",
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
        assertThat(receipt.credentialHandleApprovalContract().prohibitedFields())
                .map(RehearsalCredentialHandleApprovalProhibitedField::id)
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
        assertThat(receipt.credentialHandleApprovalContract().rejectionReasons())
                .map(RehearsalCredentialHandleApprovalRejectionReason::code)
                .containsExactly(
                        "CREDENTIAL_HANDLE_MISSING",
                        "CREDENTIAL_VALUE_PRESENT",
                        "RAW_ENDPOINT_URL_PRESENT",
                        "PROVIDER_CLIENT_CONFIG_PRESENT",
                        "WRITE_OR_MIGRATION_PRESENT"
                );
        assertThat(receipt.credentialHandleApprovalContract().noGoBoundaries())
                .map(RehearsalCredentialHandleApprovalNoGoBoundary::id)
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
        assertThat(receipt.credentialHandleApprovalContract().upstreamEchoRequests())
                .map(RehearsalCredentialHandleApprovalUpstreamEchoRequest::version)
                .containsExactly("Java v146", "mini-kv v139");
        assertThat(receipt.prerequisiteTransition().afterV317()).isEqualTo("contract-intake-defined");
        assertThat(receipt.necessityProof().consumer()).isEqualTo("Java v146 + mini-kv v139, then Node v318");

        assertThat(receipt.checks().sourceNodeV316Ready()).isTrue();
        assertThat(receipt.checks().sourceJavaV145SignedArtifactContractReady()).isTrue();
        assertThat(receipt.checks().nodeV317ContractEchoed()).isTrue();
        assertThat(receipt.checks().contractRequiredFieldsDocumented()).isTrue();
        assertThat(receipt.checks().contractProhibitedFieldsDocumented()).isTrue();
        assertThat(receipt.checks().javaMiniKvEchoRequestExplicitlyParallel()).isTrue();
        assertThat(receipt.checks()
                .readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractEcho())
                .isTrue();
        assertThat(receipt.sideEffectBoundary().credentialHandleApprovalContractEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyCredentialHandleApprovalContract()).isTrue();
        assertThat(receipt.sideEffectBoundary().credentialValueRead()).isFalse();
        assertThat(receipt.sideEffectBoundary().credentialAuthorityClaimedByJava()).isFalse();
        assertThat(receipt.sideEffectBoundary().secretProviderInstantiated()).isFalse();
        assertThat(receipt.sideEffectBoundary().resolverClientInstantiated()).isFalse();
        assertThat(receipt.sideEffectBoundary().approvalLedgerWritten()).isFalse();
        assertThat(receipt.readyForNodeV318CredentialHandleApprovalContractUpstreamEchoVerification()).isTrue();
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
                .isEqualTo("java-release-approval-rehearsal-response-schema.v47");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverCredentialHandleApprovalContractState",
                        "sandboxEndpointCredentialResolverCredentialHandleApprovalContractRequiredFieldCount",
                        "sandboxEndpointCredentialResolverCredentialHandleApprovalContractReadyForNodeV318",
                        "sandboxEndpointCredentialResolverCredentialHandleApprovalContractCredentialAuthorityClaimed"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.credentialHandleApprovalContract.requiredFieldCount=10",
                        "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.credentialHandleApprovalContract.prohibitedFieldCount=8",
                        "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.readyForNodeV318CredentialHandleApprovalContractUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.consumedByNodeCredentialHandleApprovalContractProfile with Node v317",
                        "Require managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.credentialHandleApprovalContract.requiredFieldCount=10 before Node v318",
                        "Keep managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt.sideEffectBoundary.credentialAuthorityClaimedByJava=false"
                );
        assertThat(rehearsal.verificationHint().noLedgerWriteProved()).isTrue();

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }
}
