package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceHumanApprovalArtifactReviewPacketEchoTests extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsHumanApprovalArtifactReviewPacketEchoReceiptForNodeV309() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt receipt =
                rehearsal
                        .managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-human-approval-artifact-review-packet-echo-receipt.v1"
                );
        assertThat(receipt.sourceApprovalPrerequisiteArtifactIntakeEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-prerequisite-artifact-intake-echo-receipt.v1"
                );
        assertThat(receipt.sourceApprovalPrerequisiteArtifactIntakeEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v43");
        assertThat(receipt.sourceApprovalPrerequisiteArtifactIntakeEchoReceiptDigest())
                .isEqualTo(rehearsal
                        .managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt()
                        .receiptDigest());

        assertThat(receipt.consumedByNodeHumanApprovalArtifactReviewPacketVersion())
                .isEqualTo("Node v308");
        assertThat(receipt.consumedByNodeHumanApprovalArtifactReviewPacketProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet.v1"
                );
        assertThat(receipt.consumedByNodeHumanApprovalArtifactReviewPacketEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet"
                );
        assertThat(receipt.consumedByNodeHumanApprovalArtifactReviewPacketMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeHumanApprovalArtifactReviewPacketState())
                .isEqualTo("human-approval-artifact-review-packet-ready");
        assertThat(receipt.sourceNodeVerificationVersion()).isEqualTo("Node v307");
        assertThat(receipt.nextNodeHumanApprovalArtifactReviewPacketUpstreamEchoVerificationVersion())
                .isEqualTo("Node v309");
        assertThat(receipt.nextNodeHumanApprovalArtifactReviewPacketUpstreamEchoVerificationProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1"
                );
        assertThat(receipt.humanApprovalArtifactReviewPacketEchoMode())
                .isEqualTo("java-v143-human-approval-artifact-review-packet-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v308");

        assertThat(receipt.sourceNodeV307().sourceVersion()).isEqualTo("Node v307");
        assertThat(receipt.sourceNodeV307().profileVersion())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1"
                );
        assertThat(receipt.sourceNodeV307().verificationState())
                .isEqualTo("approval-prerequisite-artifact-upstream-echo-verification-ready");
        assertThat(receipt.sourceNodeV307().verificationMode())
                .isEqualTo("approval-prerequisite-artifact-upstream-echo-verification-only");
        assertThat(receipt.sourceNodeV307().sourceSpan())
                .isEqualTo("Node v306 + Java v142 + mini-kv v135");
        assertThat(receipt.sourceNodeV307().readyForUpstreamEchoVerification()).isTrue();
        assertThat(receipt.sourceNodeV307().upstreamEchoAligned()).isTrue();
        assertThat(receipt.sourceNodeV307().artifactContractAligned()).isTrue();
        assertThat(receipt.sourceNodeV307().sideEffectBoundariesAligned()).isTrue();
        assertThat(receipt.sourceNodeV307().sourceNodeV306RequiredFieldCount()).isEqualTo(12);
        assertThat(receipt.sourceNodeV307().sourceNodeV306ProhibitedFieldCount()).isEqualTo(8);
        assertThat(receipt.sourceNodeV307().sourceNodeV306RejectionReasonCount()).isEqualTo(9);
        assertThat(receipt.sourceNodeV307().sourceNodeV306NoGoBoundaryCount()).isEqualTo(12);
        assertThat(receipt.sourceNodeV307().sourceNodeV306UpstreamEchoRequestCount()).isEqualTo(2);
        assertRuntimeBlocked(
                receipt.sourceNodeV307().runtimeShellImplemented(),
                receipt.sourceNodeV307().runtimeShellInvocationAllowed(),
                receipt.sourceNodeV307().executionAllowed(),
                receipt.sourceNodeV307().connectsManagedAudit(),
                receipt.sourceNodeV307().credentialValueRead(),
                receipt.sourceNodeV307().rawEndpointUrlParsed(),
                receipt.sourceNodeV307().externalRequestSent(),
                receipt.sourceNodeV307().schemaMigrationExecuted(),
                receipt.sourceNodeV307().approvalLedgerWritten(),
                receipt.sourceNodeV307().automaticUpstreamStart()
        );

        assertThat(receipt.reviewPacket().packetDigest()).startsWith("sha256:");
        assertThat(receipt.reviewPacket().packetName())
                .isEqualTo("managed-audit-runtime-shell-human-approval-artifact-review-packet");
        assertThat(receipt.reviewPacket().packetVersion())
                .isEqualTo("human-approval-artifact-review-packet.v1");
        assertThat(receipt.reviewPacket().reviewMode())
                .isEqualTo("human-approval-artifact-review-packet-contract-only");
        assertThat(receipt.reviewPacket().sourceSpan()).isEqualTo("Node v307");
        assertThat(receipt.reviewPacket().requiredFieldCount()).isEqualTo(9);
        assertThat(receipt.reviewPacket().prohibitedFieldCount()).isEqualTo(9);
        assertThat(receipt.reviewPacket().rejectionReasonCount()).isEqualTo(13);
        assertThat(receipt.reviewPacket().missingFieldCheckCount()).isEqualTo(9);
        assertThat(receipt.reviewPacket().noGoBoundaryCount()).isEqualTo(12);
        assertThat(receipt.reviewPacket().upstreamEchoRequestCount()).isEqualTo(2);
        assertThat(receipt.reviewPacket().implementationStillBlocked()).isTrue();

        assertThat(receipt.requiredFieldIds())
                .containsExactly(
                        "artifact_id",
                        "operator_approval_reference",
                        "credential_handle_review_status",
                        "endpoint_handle_allowlist_review_status",
                        "no_network_safety_test_reference",
                        "manual_abort_semantics_reference",
                        "rollback_semantics_reference",
                        "created_by_operator_identity",
                        "audit_correlation_id"
                );
        assertThat(receipt.prohibitedFieldIds())
                .containsExactly(
                        "credential_value",
                        "raw_endpoint_url",
                        "secret_provider_config",
                        "resolver_client_config",
                        "external_request_payload",
                        "approval_ledger_mutation",
                        "schema_migration_sql",
                        "mini_kv_write_command",
                        "runtime_shell_invocation_request"
                );
        assertThat(receipt.rejectionReasonCodes())
                .containsExactly(
                        "MISSING_ARTIFACT_ID",
                        "MISSING_OPERATOR_APPROVAL_REFERENCE",
                        "MISSING_CREDENTIAL_HANDLE_REVIEW_STATUS",
                        "MISSING_ENDPOINT_HANDLE_ALLOWLIST_REVIEW_STATUS",
                        "MISSING_NO_NETWORK_SAFETY_TEST_REFERENCE",
                        "MISSING_ABORT_OR_ROLLBACK_SEMANTICS",
                        "CREDENTIAL_VALUE_PRESENT",
                        "RAW_ENDPOINT_URL_PRESENT",
                        "PROVIDER_OR_CLIENT_CONFIG_PRESENT",
                        "EXTERNAL_REQUEST_REQUESTED",
                        "WRITE_OR_SCHEMA_MUTATION_REQUESTED",
                        "MINI_KV_WRITE_OR_AUTHORITY_REQUESTED",
                        "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED"
                );
        assertThat(receipt.missingFieldCheckCodes())
                .containsExactly(
                        "MISSING_ARTIFACT_ID",
                        "MISSING_OPERATOR_APPROVAL_REFERENCE",
                        "MISSING_CREDENTIAL_HANDLE_REVIEW_STATUS",
                        "MISSING_ENDPOINT_HANDLE_ALLOWLIST_REVIEW_STATUS",
                        "MISSING_NO_NETWORK_SAFETY_TEST_REFERENCE",
                        "MISSING_MANUAL_ABORT_SEMANTICS_REFERENCE",
                        "MISSING_ROLLBACK_SEMANTICS_REFERENCE",
                        "MISSING_CREATED_BY_OPERATOR_IDENTITY",
                        "MISSING_AUDIT_CORRELATION_ID"
                );
        assertThat(receipt.noGoBoundaryIds())
                .containsExactly(
                        "credential_value_read",
                        "raw_endpoint_url_parse",
                        "secret_provider_instantiation",
                        "resolver_client_instantiation",
                        "fake_provider_or_client",
                        "external_http_or_tcp_request",
                        "runtime_shell_implementation",
                        "runtime_shell_invocation",
                        "approval_ledger_write",
                        "schema_migration",
                        "mini_kv_write_or_authority",
                        "automatic_upstream_start"
                );
        assertThat(receipt.reviewPacket().upstreamEchoRequests())
                .extracting(request -> request.project() + ":" + request.version())
                .containsExactly("java:Java v143", "mini-kv:mini-kv v136");

        assertThat(receipt.necessityProof().proofComplete()).isTrue();
        assertThat(receipt.necessityProof().nextConsumer())
                .isEqualTo("Java v143 + mini-kv v136, then Node v309");
        assertThat(receipt.necessityProof().whyV307CannotBeReused())
                .contains("missing-field checks");
        assertThat(receipt.necessityProof().stopCondition())
                .contains("credential values", "raw endpoint URLs", "runtime shell implementation");

        assertThat(receipt.checks().sourceNodeV307Ready()).isTrue();
        assertThat(receipt.checks().sourceNodeV307UpstreamEchoAligned()).isTrue();
        assertThat(receipt.checks().sourceNodeV307ArtifactContractAligned()).isTrue();
        assertThat(receipt.checks().sourceNodeV307SideEffectsClosed()).isTrue();
        assertThat(receipt.checks().requiredReviewFieldsDocumented()).isTrue();
        assertThat(receipt.checks().prohibitedReviewFieldsDocumented()).isTrue();
        assertThat(receipt.checks().rejectionReasonsDocumented()).isTrue();
        assertThat(receipt.checks().missingFieldChecksDocumented()).isTrue();
        assertThat(receipt.checks().noGoBoundariesClosed()).isTrue();
        assertThat(receipt.checks().javaMiniKvEchoRequestExplicitlyParallel()).isTrue();
        assertThat(receipt.checks().reviewPacketStaysContractOnly()).isTrue();
        assertThat(receipt.checks()
                .readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket())
                .isTrue();

        assertThat(receipt.sideEffectBoundary().humanApprovalArtifactReviewPacketEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyReviewPacketContract()).isTrue();
        assertThat(receipt.sideEffectBoundary()
                .consumesNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification()).isTrue();
        assertRuntimeBlocked(
                receipt.sideEffectBoundary().disabledRuntimeShellImplemented(),
                receipt.sideEffectBoundary().disabledRuntimeShellEnabled(),
                receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed(),
                receipt.sideEffectBoundary().managedAuditResolverImplementationAllowed(),
                receipt.sideEffectBoundary().productionAuditAllowed(),
                receipt.sideEffectBoundary().productionWindowAllowed(),
                receipt.sideEffectBoundary().productionOperationsAllowed(),
                receipt.sideEffectBoundary().executionAllowed(),
                receipt.sideEffectBoundary().connectsManagedAudit(),
                receipt.sideEffectBoundary().readsManagedAuditCredential(),
                receipt.sideEffectBoundary().storesManagedAuditCredential(),
                receipt.sideEffectBoundary().credentialValueRead(),
                receipt.sideEffectBoundary().credentialValueProvided(),
                receipt.sideEffectBoundary().rawEndpointUrlParsed(),
                receipt.sideEffectBoundary().rawEndpointUrlRendered(),
                receipt.sideEffectBoundary().externalRequestSent(),
                receipt.sideEffectBoundary().secretProviderInstantiated(),
                receipt.sideEffectBoundary().resolverClientInstantiated(),
                receipt.sideEffectBoundary().fakeSecretProviderInstantiated(),
                receipt.sideEffectBoundary().fakeResolverClientInstantiated(),
                receipt.sideEffectBoundary().approvalLedgerWritten(),
                receipt.sideEffectBoundary().managedAuditStoreWritten(),
                receipt.sideEffectBoundary().sqlExecuted(),
                receipt.sideEffectBoundary().schemaMigrationExecuted(),
                receipt.sideEffectBoundary().deploymentExecuted(),
                receipt.sideEffectBoundary().rollbackExecuted(),
                receipt.sideEffectBoundary().miniKvWriteOrAuthorityCommandExecuted(),
                receipt.sideEffectBoundary().automaticUpstreamStart(),
                receipt.sideEffectBoundary().javaStartedNodeMiniKvOrHarness()
        );

        assertThat(receipt.echoWorkflowMissingSteps()).isEmpty();
        assertThat(receipt.echoWorkflowReadySteps())
                .containsExactly(
                        "sourceNodeV307Echoed",
                        "reviewPacketContractEchoed",
                        "requiredFieldsEchoed",
                        "prohibitedFieldsEchoed",
                        "rejectionReasonsEchoed",
                        "missingFieldChecksEchoed",
                        "noGoBoundariesEchoed",
                        "upstreamEchoRequestsEchoed",
                        "necessityProofEchoed",
                        "noRuntimeImplementationEchoed",
                        "noRuntimeInvocationEchoed",
                        "noCredentialReadEchoed",
                        "noRawEndpointParseEchoed",
                        "noProviderClientInstantiationEchoed",
                        "noExternalRequestEchoed",
                        "noWriteOrMigrationEchoed",
                        "noMiniKvWriteOrAuthorityEchoed",
                        "noAutoStartBoundaryEchoed"
                );
        assertThat(receipt.readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.readyForProductionAudit()).isFalse();
        assertThat(receipt.readyForProductionWindow()).isFalse();
        assertThat(receipt.nodeMayTreatAsProductionAuditRecord()).isFalse();
        assertThat(receipt.nodeWarningCodes())
                .containsExactly("REVIEW_PACKET_DOES_NOT_AUTHORIZE_RUNTIME_SHELL");
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly(
                        "RUN_JAVA_V143_AND_MINI_KV_V136_IN_PARALLEL",
                        "VERIFY_REVIEW_PACKET_ECHO_WITH_NODE_V309"
                );
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v136 human approval artifact review non-participation receipt",
                        "Node v309 human approval artifact review upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v44");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketState",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactRequiredFieldCount",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactMissingFieldCheckCount",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactReadyForNodeV309",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactMiniKvWriteOrAuthorityCommandExecuted"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt.reviewPacket.requiredFieldCount=9",
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt.reviewPacket.missingFieldCheckCount=9",
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt.readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt.consumedByNodeHumanApprovalArtifactReviewPacketProfile with Node v308",
                        "Require managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt.reviewPacket.requiredFieldCount=9 before Node v309",
                        "Keep managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt.sideEffectBoundary.runtimeShellInvocationAllowed=false"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
