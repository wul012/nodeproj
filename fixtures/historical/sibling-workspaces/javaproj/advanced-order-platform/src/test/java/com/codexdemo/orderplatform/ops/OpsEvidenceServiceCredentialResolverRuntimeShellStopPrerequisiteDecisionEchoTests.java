package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsRuntimeShellStopPrerequisiteDecisionEchoReceiptForNodeV305() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt
                receipt =
                rehearsal
                        .managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-receipt.v1"
                );
        assertThat(receipt.sourceRuntimeShellPostDecisionPlanIntakeEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-post-decision-plan-intake-echo-receipt.v1"
                );
        assertThat(receipt.sourceRuntimeShellPostDecisionPlanIntakeEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v41");
        assertThat(receipt.sourceRuntimeShellPostDecisionPlanIntakeEchoReceiptDigest())
                .isEqualTo(rehearsal
                        .managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt()
                        .receiptDigest());

        assertThat(receipt.consumedByNodeRuntimeShellChainStopPrerequisiteDecisionRecordVersion())
                .isEqualTo("Node v304");
        assertThat(receipt.consumedByNodeRuntimeShellChainStopPrerequisiteDecisionRecordProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record.v1"
                );
        assertThat(receipt.consumedByNodeRuntimeShellChainStopPrerequisiteDecisionRecordEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record"
                );
        assertThat(receipt.consumedByNodeRuntimeShellChainStopPrerequisiteDecisionRecordMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeRuntimeShellChainStopPrerequisiteDecisionRecordState())
                .isEqualTo("runtime-shell-chain-stop-or-prerequisite-decision-record-ready");
        assertThat(receipt.nextNodeStopPrerequisiteUpstreamEchoVerificationVersion())
                .isEqualTo("Node v305");
        assertThat(receipt.stopPrerequisiteDecisionEchoMode())
                .isEqualTo("java-v141-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v304");

        assertThat(receipt.sourcePostDecisionPlanIntakeEcho()
                .readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification()).isTrue();
        assertThat(receipt.sourcePostDecisionPlanIntakeEcho().nodeV301PlanIntakeEchoed()).isTrue();
        assertThat(receipt.sourcePostDecisionPlanIntakeEcho().continuationDecisionEchoed()).isTrue();
        assertThat(receipt.sourcePostDecisionPlanIntakeEcho().continuationOptionsEchoed()).isTrue();
        assertThat(receipt.sourcePostDecisionPlanIntakeEcho().necessityProofEchoed()).isTrue();
        assertThat(receipt.sourcePostDecisionPlanIntakeEcho().selectedContinuationDecision())
                .isEqualTo("continue-blocked-planning");
        assertThat(receipt.sourcePostDecisionPlanIntakeEcho().decisionOptionCount()).isEqualTo(4);
        assertThat(receipt.sourcePostDecisionPlanIntakeEcho().rejectedRuntimeImplementationOptionCount())
                .isEqualTo(1);
        assertRuntimeBlocked(
                receipt.sourcePostDecisionPlanIntakeEcho().runtimeShellImplemented(),
                receipt.sourcePostDecisionPlanIntakeEcho().runtimeShellInvocationAllowed(),
                receipt.sourcePostDecisionPlanIntakeEcho().credentialValueRead(),
                receipt.sourcePostDecisionPlanIntakeEcho().rawEndpointUrlParsed(),
                receipt.sourcePostDecisionPlanIntakeEcho().externalRequestSent(),
                receipt.sourcePostDecisionPlanIntakeEcho().approvalLedgerWritten(),
                receipt.sourcePostDecisionPlanIntakeEcho().sqlExecuted(),
                receipt.sourcePostDecisionPlanIntakeEcho().schemaMigrationExecuted(),
                receipt.sourcePostDecisionPlanIntakeEcho().automaticUpstreamStart()
        );

        assertThat(receipt.decisionRecord().recordMode())
                .isEqualTo("runtime-shell-chain-stop-or-prerequisite-decision-record-only");
        assertThat(receipt.decisionRecord().decision())
                .isEqualTo("require-explicit-approval-prerequisites-before-runtime-shell");
        assertThat(receipt.decisionRecord().selectedPath())
                .isEqualTo("continue-only-as-blocked-prerequisite-review");
        assertThat(receipt.decisionRecord().sourceSpan())
                .isEqualTo("Node v303 + Java v136 + mini-kv v133");
        assertThat(receipt.decisionRecord().stopRuntimeShellChainWithoutPrerequisites()).isTrue();
        assertThat(receipt.decisionRecord().allowsParallelJavaV141MiniKvV134EchoRequest()).isTrue();
        assertThat(receipt.decisionRecord().allowsNodeV305BeforeUpstreamEcho()).isFalse();
        assertRuntimeBlocked(
                receipt.decisionRecord().allowsDisabledRuntimeShellImplementation(),
                receipt.decisionRecord().allowsDisabledRuntimeShellInvocation(),
                receipt.decisionRecord().allowsRealResolverImplementation(),
                receipt.decisionRecord().allowsSecretProviderInstantiation(),
                receipt.decisionRecord().allowsResolverClientInstantiation(),
                receipt.decisionRecord().allowsCredentialValueRead(),
                receipt.decisionRecord().allowsRawEndpointUrlParse(),
                receipt.decisionRecord().allowsExternalRequest(),
                receipt.decisionRecord().allowsManagedAuditConnection(),
                receipt.decisionRecord().allowsSchemaMigration(),
                receipt.decisionRecord().allowsApprovalLedgerWrite(),
                receipt.decisionRecord().allowsMiniKvWriteOrAuthority(),
                receipt.decisionRecord().allowsAutomaticUpstreamStart()
        );
        assertThat(receipt.decisionRecord().prerequisiteCount()).isEqualTo(6);
        assertThat(receipt.decisionRecord().missingRuntimePrerequisiteCount()).isEqualTo(6);
        assertThat(receipt.decisionRecord().noGoConditionCount()).isEqualTo(8);
        assertThat(receipt.requiredPrerequisiteIds())
                .containsExactly(
                        "operator-approval-artifact",
                        "credential-handle-readiness",
                        "raw-endpoint-allowlist-review",
                        "no-network-test-fixture",
                        "manual-abort-and-rollback-semantics",
                        "java-mini-kv-prerequisite-echo"
                );
        assertThat(receipt.noGoConditionCodes())
                .contains(
                        "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED",
                        "CREDENTIAL_VALUE_READ_REQUESTED",
                        "MINIKV_WRITE_OR_AUTHORITY_REQUESTED"
                );
        assertThat(receipt.decisionRecord().necessityProof().consumer())
                .contains("Java v141", "mini-kv v134", "Node v305");
        assertThat(receipt.decisionRecord().necessityProof().stopCondition())
                .contains("credential values", "HTTP/TCP", "mini-kv write/admin commands");
        assertThat(receipt.decisionRecord().necessityProof().proofComplete()).isTrue();

        assertThat(receipt.checks().sourcePostDecisionPlanIntakeEchoLoaded()).isTrue();
        assertThat(receipt.checks().sourcePostDecisionPlanIntakeEchoReady()).isTrue();
        assertThat(receipt.checks().sourcePostDecisionPlanKeepsRuntimeBlocked()).isTrue();
        assertThat(receipt.checks().sourcePostDecisionPlanKeepsSideEffectsClosed()).isTrue();
        assertThat(receipt.checks().decisionSelectsPrerequisiteGate()).isTrue();
        assertThat(receipt.checks().decisionRecordBlocksRuntimeShell()).isTrue();
        assertThat(receipt.checks().decisionRecordStillReadOnly()).isTrue();
        assertThat(receipt.checks().requiredPrerequisitesDocumented()).isTrue();
        assertThat(receipt.checks().missingRuntimePrerequisitesBlockImplementation()).isTrue();
        assertThat(receipt.checks().necessityProofComplete()).isTrue();
        assertThat(receipt.checks().parallelJavaV141MiniKvV134EchoRecommended()).isTrue();
        assertThat(receipt.checks().miniKvWriteOrAuthorityStillForbidden()).isTrue();
        assertThat(receipt.checks().readyForNodeV305StopPrerequisiteUpstreamEchoVerification()).isTrue();

        assertThat(receipt.sideEffectBoundary().stopPrerequisiteDecisionEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyDecisionRecord()).isTrue();
        assertRuntimeBlocked(
                receipt.sideEffectBoundary().disabledRuntimeShellImplemented(),
                receipt.sideEffectBoundary().disabledRuntimeShellEnabled(),
                receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed(),
                receipt.sideEffectBoundary().managedAuditResolverImplementationAllowed(),
                receipt.sideEffectBoundary().productionAuditAllowed(),
                receipt.sideEffectBoundary().productionWindowAllowed(),
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
                receipt.sideEffectBoundary().approvalLedgerWritten(),
                receipt.sideEffectBoundary().managedAuditStoreWritten(),
                receipt.sideEffectBoundary().sqlExecuted(),
                receipt.sideEffectBoundary().schemaMigrationExecuted(),
                receipt.sideEffectBoundary().miniKvWriteOrAuthorityCommandExecuted(),
                receipt.sideEffectBoundary().rollbackExecuted(),
                receipt.sideEffectBoundary().automaticUpstreamStart(),
                receipt.sideEffectBoundary().javaStartedNodeMiniKvOrHarness()
        );

        assertThat(receipt.echoWorkflowMissingSteps()).isEmpty();
        assertThat(receipt.echoWorkflowReadySteps())
                .containsExactly(
                        "sourcePostDecisionPlanIntakeEchoed",
                        "nodeV304DecisionRecordEchoed",
                        "prerequisiteGateEchoed",
                        "requiredPrerequisitesEchoed",
                        "noGoConditionsEchoed",
                        "necessityProofEchoed",
                        "parallelJavaMiniKvEchoRequestEchoed",
                        "runtimeImplementationRejectedEchoed",
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
        assertThat(receipt.readyForNodeV305StopPrerequisiteUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.readyForProductionAudit()).isFalse();
        assertThat(receipt.readyForProductionWindow()).isFalse();
        assertThat(receipt.nodeMayTreatAsProductionAuditRecord()).isFalse();
        assertThat(receipt.nodeWarningCodes())
                .containsExactly("PREREQUISITE_DECISION_DOES_NOT_AUTHORIZE_RUNTIME");
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly(
                        "RUN_JAVA_V141_AND_MINIKV_V134_IN_PARALLEL",
                        "KEEP_RUNTIME_SHELL_BLOCKED"
                );
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v134 runtime shell chain stop/prerequisite non-participation receipt",
                        "Node v305 stop/prerequisite upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v42");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionRecordState",
                        "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteReadyForNodeV305",
                        "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteMiniKvWriteOrAuthorityCommandExecuted"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt.decisionRecord.prerequisiteCount=6",
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt.readyForNodeV305StopPrerequisiteUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt.consumedByNodeRuntimeShellChainStopPrerequisiteDecisionRecordProfile with Node v304",
                        "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt.decisionRecord.allowsMiniKvWriteOrAuthority=false"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
