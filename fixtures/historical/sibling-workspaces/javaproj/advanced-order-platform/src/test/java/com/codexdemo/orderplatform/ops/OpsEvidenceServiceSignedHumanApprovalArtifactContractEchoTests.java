package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactUpstreamEchoRequest;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceSignedHumanApprovalArtifactContractEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsSignedHumanApprovalArtifactContractEchoReceiptForNodeV315() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt receipt =
                rehearsal.managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo("java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-signed-human-approval-artifact-contract-echo-receipt.v1");
        assertThat(receipt.sourceHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceiptVersion())
                .isEqualTo(
                        rehearsal.managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt()
                                .receiptVersion()
                );
        assertThat(receipt.sourceHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v45");
        assertThat(receipt.sourceHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceiptDigest())
                .isEqualTo(
                        rehearsal.managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt()
                                .receiptDigest()
                );
        assertThat(receipt.consumedByNodeSignedHumanApprovalArtifactContractVersion()).isEqualTo("Node v314");
        assertThat(receipt.consumedByNodeSignedHumanApprovalArtifactContractProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake.v1"
                );
        assertThat(receipt.consumedByNodeSignedHumanApprovalArtifactContractEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake"
                );
        assertThat(receipt.consumedByNodeSignedHumanApprovalArtifactContractMarkdownEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake?format=markdown"
                );
        assertThat(receipt.consumedByNodeSignedHumanApprovalArtifactContractState())
                .isEqualTo("signed-human-approval-artifact-contract-intake-ready");
        assertThat(receipt.nextNodeSignedHumanApprovalArtifactContractUpstreamEchoVerificationVersion())
                .isEqualTo("Node v315");
        assertThat(receipt.nextNodeSignedHumanApprovalArtifactContractUpstreamEchoVerificationProfile())
                .isEqualTo("managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1");
        assertThat(receipt.signedHumanApprovalArtifactContractEchoMode())
                .isEqualTo("java-v145-signed-human-approval-artifact-contract-echo-only");
        assertThat(receipt.sourceNodeV312().sourceVersion()).isEqualTo("Node v312");
        assertThat(receipt.sourceNodeV312().decisionDigest())
                .isEqualTo("152d7517c07119df360446a29c508f5d3d9a78a28adfc6137ea0b0254508b0c6");
        assertThat(receipt.sourceNodeV312().sourceVerificationDigest())
                .isEqualTo("8292327cdb44e1d37ead67ff5a0444c08625860c62a3648846801a84f5a6f194");
        assertThat(receipt.sourceNodeV312().completedPrerequisiteCount()).isEqualTo(1);
        assertThat(receipt.sourceNodeV312().remainingPrerequisiteCount()).isEqualTo(5);
        assertThat(receipt.sourceNodeV312().originalPrerequisiteCount()).isEqualTo(6);
        assertThat(receipt.sourceNodeV312().noGoConditionCount()).isEqualTo(9);
        assertThat(receipt.sourceNodeV312().completedPrerequisiteIds())
                .containsExactly("java-mini-kv-decision-echo");
        assertThat(receipt.sourceNodeV312().remainingPrerequisiteIds())
                .containsExactly(
                        "signed-human-approval-artifact",
                        "credential-handle-approval",
                        "endpoint-handle-allowlist-approval",
                        "no-network-safety-fixture",
                        "abort-rollback-semantics"
                );
        assertThat(receipt.signedArtifactContract().contractDigest())
                .isEqualTo("72498e59c086eadd4d44e80789120de195af1a0b70dd49346b837e2bc8ed4666");
        assertThat(receipt.signedArtifactContract().artifactName())
                .isEqualTo("managed-audit-signed-human-approval-artifact");
        assertThat(receipt.signedArtifactContract().artifactVersion())
                .isEqualTo("signed-human-approval-artifact.v1");
        assertThat(receipt.signedArtifactContract().requiredFields())
                .map(RehearsalSignedHumanApprovalArtifactRequiredField::id)
                .containsExactly(
                        "artifact_id",
                        "approval_correlation_id",
                        "operator_identity_handle",
                        "signer_identity_handle",
                        "policy_version",
                        "artifact_digest",
                        "issued_at",
                        "expires_at",
                        "review_status",
                        "no_network_assertion",
                        "rollback_abort_reference"
                );
        assertThat(receipt.signedArtifactContract().prohibitedFields())
                .map(RehearsalSignedHumanApprovalArtifactProhibitedField::id)
                .containsExactly(
                        "credential_value",
                        "raw_endpoint_url",
                        "signing_private_key",
                        "secret_provider_config",
                        "resolver_client_config",
                        "external_request_payload",
                        "approval_ledger_mutation",
                        "schema_migration_sql"
                );
        assertThat(receipt.signedArtifactContract().rejectionReasons())
                .map(reason -> reason.code())
                .containsExactly(
                        "SIGNED_ARTIFACT_MISSING",
                        "CREDENTIAL_VALUE_PRESENT",
                        "RAW_ENDPOINT_URL_PRESENT",
                        "RUNTIME_IMPLEMENTATION_PRESENT",
                        "WRITE_OR_MIGRATION_PRESENT"
                );
        assertThat(receipt.signedArtifactContract().noGoBoundaries())
                .map(RehearsalSignedHumanApprovalArtifactNoGoBoundary::id)
                .containsExactly(
                        "runtime_shell_implementation",
                        "runtime_shell_invocation",
                        "credential_value_read",
                        "raw_endpoint_url_parse",
                        "provider_client_instantiation",
                        "external_request",
                        "ledger_or_schema_write",
                        "automatic_upstream_start"
                );
        assertThat(receipt.signedArtifactContract().upstreamEchoRequests())
                .map(RehearsalSignedHumanApprovalArtifactUpstreamEchoRequest::version)
                .containsExactly("Java v145", "mini-kv v138");
        assertThat(receipt.prerequisiteTransition().afterV314()).isEqualTo("contract-intake-defined");
        assertThat(receipt.necessityProof().consumer()).isEqualTo("Java v145 + mini-kv v138, then Node v315");
        assertThat(receipt.checks().sourceNodeV312Ready()).isTrue();
        assertThat(receipt.checks().sourceJavaV144PostEchoDecisionGateReady()).isTrue();
        assertThat(receipt.checks().nodeV314ContractEchoed()).isTrue();
        assertThat(receipt.checks().contractRequiredFieldsDocumented()).isTrue();
        assertThat(receipt.checks().contractProhibitedFieldsDocumented()).isTrue();
        assertThat(receipt.checks().javaMiniKvEchoRequestExplicitlyParallel()).isTrue();
        assertThat(receipt.checks().readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractEcho())
                .isTrue();
        assertThat(receipt.sideEffectBoundary().signedHumanApprovalArtifactContractEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyArtifactContract()).isTrue();
        assertThat(receipt.sideEffectBoundary().executionAllowed()).isFalse();
        assertThat(receipt.sideEffectBoundary().approvalLedgerWritten()).isFalse();
        assertThat(receipt.readyForNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");
        assertThat(receipt.summary().requiredFieldCount()).isEqualTo(11);
        assertThat(receipt.summary().prohibitedFieldCount()).isEqualTo(8);
        assertThat(receipt.summary().rejectionReasonCount()).isEqualTo(5);
        assertThat(receipt.summary().noGoBoundaryCount()).isEqualTo(8);
        assertThat(receipt.summary().upstreamEchoRequestCount()).isEqualTo(2);
        assertThat(receipt.summary().warningCount()).isEqualTo(1);
        assertThat(receipt.summary().recommendationCount()).isEqualTo(2);

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v46");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractState",
                        "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRequiredFieldCount",
                        "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractReadyForNodeV315"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt.signedArtifactContract.requiredFieldCount=11",
                        "managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt.signedArtifactContract.prohibitedFieldCount=8",
                        "managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt.readyForNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt.consumedByNodeSignedHumanApprovalArtifactContractProfile with Node v314",
                        "Require managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt.signedArtifactContract.requiredFieldCount=11 before Node v315",
                        "Keep managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false"
                );
        assertThat(rehearsal.verificationHint().noLedgerWriteProved()).isTrue();

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }
}
