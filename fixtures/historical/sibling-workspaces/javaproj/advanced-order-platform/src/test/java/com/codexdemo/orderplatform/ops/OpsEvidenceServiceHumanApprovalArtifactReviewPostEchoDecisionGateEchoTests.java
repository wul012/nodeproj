package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoNoGoCondition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoPrerequisite;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceHumanApprovalArtifactReviewPostEchoDecisionGateEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsPostEchoDecisionGateEchoReceiptForNodeV311() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt
                receipt = rehearsal
                .managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo("java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-human-approval-artifact-review-post-echo-decision-gate-echo-receipt.v1");
        assertThat(receipt.sourceHumanApprovalArtifactReviewPacketEchoReceiptVersion())
                .isEqualTo(rehearsal
                        .managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt()
                        .receiptVersion());
        assertThat(receipt.sourceHumanApprovalArtifactReviewPacketEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v44");
        assertThat(receipt.sourceHumanApprovalArtifactReviewPacketEchoReceiptDigest())
                .isEqualTo(rehearsal
                        .managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt()
                        .receiptDigest());

        assertThat(receipt.consumedByNodePostEchoDecisionGateVersion()).isEqualTo("Node v310");
        assertThat(receipt.consumedByNodePostEchoDecisionGateProfile())
                .isEqualTo("managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate.v1");
        assertThat(receipt.consumedByNodePostEchoDecisionGateEndpoint())
                .isEqualTo("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate");
        assertThat(receipt.consumedByNodePostEchoDecisionGateMarkdownEndpoint())
                .isEqualTo("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate?format=markdown");
        assertThat(receipt.consumedByNodePostEchoDecisionGateState())
                .isEqualTo("human-approval-artifact-review-post-echo-decision-gate-ready");
        assertThat(receipt.nextNodePostEchoDecisionUpstreamEchoVerificationVersion()).isEqualTo("Node v311");
        assertThat(receipt.nextNodePostEchoDecisionUpstreamEchoVerificationProfile())
                .isEqualTo("managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1");
        assertThat(receipt.humanApprovalArtifactReviewPostEchoDecisionGateEchoMode())
                .isEqualTo("java-v144-human-approval-artifact-review-post-echo-decision-gate-echo-only");

        assertThat(receipt.sourceNodeV309().sourceVersion()).isEqualTo("Node v309");
        assertThat(receipt.sourceNodeV309().profileVersion())
                .isEqualTo("managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1");
        assertThat(receipt.sourceNodeV309().verificationState())
                .isEqualTo("human-approval-artifact-review-upstream-echo-verification-ready");
        assertThat(receipt.sourceNodeV309().sourceSpan())
                .isEqualTo("Node v308 + Java v143 + mini-kv v136");
        assertThat(receipt.sourceNodeV309().readyForHumanApprovalArtifactReviewUpstreamEchoVerification()).isTrue();
        assertThat(receipt.sourceNodeV309().sourceNodeV308RequiredFieldCount()).isEqualTo(9);
        assertThat(receipt.sourceNodeV309().sourceNodeV308ProhibitedFieldCount()).isEqualTo(9);
        assertThat(receipt.sourceNodeV309().sourceNodeV308RejectionReasonCount()).isEqualTo(13);
        assertThat(receipt.sourceNodeV309().sourceNodeV308MissingFieldCheckCount()).isEqualTo(9);
        assertThat(receipt.sourceNodeV309().sourceNodeV308NoGoBoundaryCount()).isEqualTo(12);
        assertThat(receipt.sourceNodeV309().sourceNodeV308UpstreamEchoRequestCount()).isEqualTo(2);
        assertThat(receipt.sourceNodeV309().reviewPacketContractAligned()).isTrue();
        assertThat(receipt.sourceNodeV309().sideEffectBoundariesAligned()).isTrue();

        assertThat(receipt.decisionGate().gateMode())
                .isEqualTo("human-approval-artifact-review-post-echo-decision-gate-only");
        assertThat(receipt.decisionGate().decision())
                .isEqualTo("continue-only-as-blocked-post-echo-prerequisite-review");
        assertThat(receipt.decisionGate().selectedPath())
                .isEqualTo("request-read-only-upstream-decision-echo-before-any-runtime-shell");
        assertThat(receipt.decisionGate().allowsParallelJavaV144MiniKvV137EchoRequest()).isTrue();
        assertThat(receipt.decisionGate().allowsNodeV311BeforeUpstreamEcho()).isFalse();
        assertThat(receipt.decisionGate().prerequisiteCount()).isEqualTo(6);
        assertThat(receipt.decisionGate().missingPrerequisiteCount()).isEqualTo(6);
        assertThat(receipt.decisionGate().noGoConditionCount()).isEqualTo(9);
        assertRuntimeBlocked(
                receipt.decisionGate().allowsDisabledRuntimeShellImplementation(),
                receipt.decisionGate().allowsDisabledRuntimeShellInvocation(),
                receipt.decisionGate().allowsCredentialValueRead(),
                receipt.decisionGate().allowsRawEndpointUrlParse(),
                receipt.decisionGate().allowsExternalRequest(),
                receipt.decisionGate().allowsManagedAuditConnection(),
                receipt.decisionGate().allowsApprovalLedgerWrite(),
                receipt.decisionGate().allowsAutomaticUpstreamStart()
        );

        assertThat(receipt.decisionGate().requiredPrerequisites())
                .map(RehearsalHumanApprovalArtifactReviewPostEchoPrerequisite::id)
                .containsExactly(
                        "signed-human-approval-artifact",
                        "credential-handle-approval",
                        "endpoint-handle-allowlist-approval",
                        "no-network-safety-fixture",
                        "abort-rollback-semantics",
                        "java-mini-kv-decision-echo"
                );
        assertThat(receipt.decisionGate().explicitNoGoConditions())
                .map(RehearsalHumanApprovalArtifactReviewPostEchoNoGoCondition::code)
                .containsExactly(
                        "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED",
                        "RUNTIME_SHELL_INVOCATION_REQUESTED",
                        "CREDENTIAL_VALUE_READ_REQUESTED",
                        "RAW_ENDPOINT_URL_PARSE_REQUESTED",
                        "PROVIDER_CLIENT_INSTANTIATION_REQUESTED",
                        "EXTERNAL_REQUEST_REQUESTED",
                        "LEDGER_OR_SCHEMA_WRITE_REQUESTED",
                        "MINIKV_WRITE_OR_AUTHORITY_REQUESTED",
                        "AUTOMATIC_UPSTREAM_START_REQUESTED"
                );
        assertThat(receipt.decisionGate().necessityProof().consumer())
                .isEqualTo("Java v144 and mini-kv v137, then Node v311");
        assertThat(receipt.decisionGate().necessityProof().stopCondition())
                .contains("credential values", "runtime shell implementation or invocation", "mini-kv write");

        assertThat(receipt.checks().sourceNodeV309Ready()).isTrue();
        assertThat(receipt.checks().sourceNodeV309UpstreamEchoAligned()).isTrue();
        assertThat(receipt.checks().decisionSelectsPostEchoPrerequisiteGate()).isTrue();
        assertThat(receipt.checks().postEchoPrerequisitesDocumented()).isTrue();
        assertThat(receipt.checks().missingPrerequisitesBlockImplementation()).isTrue();
        assertThat(receipt.checks()
                .readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate())
                .isTrue();

        assertThat(receipt.sideEffectBoundary().humanApprovalArtifactReviewPostEchoDecisionGateEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyDecisionGate()).isTrue();
        assertThat(receipt.sideEffectBoundary().consumesNodeV309HumanApprovalArtifactReviewUpstreamEchoVerification())
                .isTrue();
        assertRuntimeBlocked(
                receipt.sideEffectBoundary().disabledRuntimeShellImplemented(),
                receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed(),
                receipt.sideEffectBoundary().executionAllowed(),
                receipt.sideEffectBoundary().connectsManagedAudit(),
                receipt.sideEffectBoundary().credentialValueRead(),
                receipt.sideEffectBoundary().rawEndpointUrlParsed(),
                receipt.sideEffectBoundary().externalRequestSent(),
                receipt.sideEffectBoundary().approvalLedgerWritten(),
                receipt.sideEffectBoundary().sqlExecuted(),
                receipt.sideEffectBoundary().schemaMigrationExecuted(),
                receipt.sideEffectBoundary().miniKvWriteOrAuthorityCommandExecuted(),
                receipt.sideEffectBoundary().automaticUpstreamStart()
        );
        assertThat(receipt.echoWorkflowMissingSteps()).isEmpty();
        assertThat(receipt.readyForNodeV311PostEchoDecisionUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.nodeWarningCodes())
                .containsExactly("POST_ECHO_DECISION_DOES_NOT_AUTHORIZE_RUNTIME");
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly("RUN_JAVA_V144_AND_MINIKV_V137_IN_PARALLEL", "KEEP_RUNTIME_SHELL_BLOCKED");
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v137 human approval artifact review post-echo decision gate non-participation receipt",
                        "Node v311 human approval artifact review post-echo decision upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v45");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateState",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoPrerequisiteCount",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoReadyForNodeV311",
                        "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoMiniKvWriteOrAuthorityCommandExecuted"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt.decisionGate.prerequisiteCount=6",
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt.decisionGate.noGoConditionCount=9",
                        "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt.readyForNodeV311PostEchoDecisionUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt.consumedByNodePostEchoDecisionGateProfile with Node v310",
                        "Require managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt.decisionGate.prerequisiteCount=6 before Node v311",
                        "Keep managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt.sideEffectBoundary.runtimeShellInvocationAllowed=false"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
