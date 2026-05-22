package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsRuntimeShellPostDecisionPlanIntakeEchoReceiptForNodeV302() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt
                receipt =
                rehearsal
                        .managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-post-decision-plan-intake-echo-receipt.v1"
                );
        assertThat(receipt.sourceRuntimeShellDecisionRecordEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-decision-record-echo-receipt.v1"
                );
        assertThat(receipt.sourceRuntimeShellDecisionRecordEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v40");
        assertThat(receipt.sourceRuntimeShellDecisionRecordEchoReceiptDigest())
                .isEqualTo(rehearsal
                        .managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt()
                        .receiptDigest());

        assertThat(receipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeVersion())
                .isEqualTo("Node v301");
        assertThat(receipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake.v1"
                );
        assertThat(receipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake"
                );
        assertThat(receipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeState())
                .isEqualTo("runtime-shell-post-decision-continuation-plan-intake-ready");
        assertThat(receipt.nextNodePostDecisionPlanIntakeUpstreamEchoVerificationVersion())
                .isEqualTo("Node v302");
        assertThat(receipt.nextNodePostDecisionPlanIntakeUpstreamEchoVerificationProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification.v1"
                );
        assertThat(receipt.planIntakeEchoMode())
                .isEqualTo("java-v136-credential-resolver-runtime-shell-post-decision-plan-intake-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v301");

        assertThat(receipt.sourceDecisionRecordEcho()
                .readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification()).isTrue();
        assertThat(receipt.sourceDecisionRecordEcho().sourceCandidateGateEchoed()).isTrue();
        assertThat(receipt.sourceDecisionRecordEcho().nodeV299DecisionRecordEchoed()).isTrue();
        assertThat(receipt.sourceDecisionRecordEcho().blockedDecisionEchoed()).isTrue();
        assertThat(receipt.sourceDecisionRecordEcho().requiredEvidenceEchoed()).isTrue();
        assertThat(receipt.sourceDecisionRecordEcho().noGoConditionsEchoed()).isTrue();
        assertThat(receipt.sourceDecisionRecordEcho().readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.sourceDecisionRecordEcho().readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.sourceDecisionRecordEcho().readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.sourceDecisionRecordEcho().credentialValueRead()).isFalse();
        assertThat(receipt.sourceDecisionRecordEcho().rawEndpointUrlParsed()).isFalse();
        assertThat(receipt.sourceDecisionRecordEcho().externalRequestSent()).isFalse();
        assertThat(receipt.sourceDecisionRecordEcho().approvalLedgerWritten()).isFalse();

        assertThat(receipt.planIntake().nodeVersion()).isEqualTo("Node v301");
        assertThat(receipt.planIntake().profileVersion())
                .isEqualTo(receipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeProfile());
        assertThat(receipt.planIntake().endpoint())
                .isEqualTo(receipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeEndpoint());
        assertThat(receipt.planIntake().markdownEndpoint())
                .isEqualTo(receipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeMarkdownEndpoint());
        assertThat(receipt.planIntake().planIntakeState())
                .isEqualTo("runtime-shell-post-decision-continuation-plan-intake-ready");
        assertThat(receipt.planIntake().intakeMode())
                .isEqualTo("runtime-shell-post-decision-continuation-plan-intake-only");
        assertThat(receipt.planIntake().sourceSpan()).isEqualTo("Node v300");
        assertThat(receipt.planIntake().selectedContinuationDecision())
                .isEqualTo("continue-blocked-planning");
        assertThat(receipt.planIntake().decisionOptionCount()).isEqualTo(4);
        assertThat(receipt.planIntake().selectedDecisionOptionCount()).isEqualTo(1);
        assertThat(receipt.planIntake().rejectedRuntimeImplementationOptionCount()).isEqualTo(1);
        assertThat(receipt.planIntake().nextJavaEchoVersion()).isEqualTo("Java v136");
        assertThat(receipt.planIntake().nextMiniKvReceiptVersion()).isEqualTo("mini-kv v133");
        assertThat(receipt.planIntake().nextNodeVerificationVersion()).isEqualTo("Node v302");
        assertRuntimeBlocked(
                receipt.planIntake().runtimeShellImplementationAllowed(),
                receipt.planIntake().runtimeShellInvocationAllowed(),
                receipt.planIntake().credentialValueReadAllowed(),
                receipt.planIntake().rawEndpointUrlParseAllowed(),
                receipt.planIntake().providerClientInstantiationAllowed(),
                receipt.planIntake().externalRequestAllowed(),
                receipt.planIntake().schemaMigrationAllowed(),
                receipt.planIntake().approvalLedgerWriteAllowed(),
                receipt.planIntake().automaticUpstreamStartAllowed()
        );

        assertThat(receipt.continuationOptionCodes())
                .containsExactly(
                        "CONTINUE_BLOCKED_PLANNING",
                        "PAUSE_RUNTIME_SHELL_CHAIN",
                        "REQUIRE_EXPLICIT_APPROVAL_PREREQUISITES",
                        "IMPLEMENT_RUNTIME_SHELL_NOW"
                );
        assertThat(receipt.planIntake().continuationOptions())
                .extracting(option -> option.code())
                .containsExactlyElementsOf(receipt.continuationOptionCodes());
        assertThat(receipt.planIntake().continuationOptions())
                .filteredOn(option -> "CONTINUE_BLOCKED_PLANNING".equals(option.code()))
                .singleElement()
                .satisfies(option -> assertThat(option.status()).isEqualTo("selected"));
        assertThat(receipt.planIntake().continuationOptions())
                .filteredOn(option -> "IMPLEMENT_RUNTIME_SHELL_NOW".equals(option.code()))
                .singleElement()
                .satisfies(option -> assertThat(option.status()).isEqualTo("rejected"));

        assertThat(receipt.necessityProof().blockerResolved()).contains("v300");
        assertThat(receipt.necessityProof().consumer())
                .contains("Java v136", "mini-kv v133", "Node v302");
        assertThat(receipt.necessityProof().whyV300CannotBeReused()).contains("v300");
        assertThat(receipt.necessityProof().stopCondition())
                .contains("credential values", "HTTP/TCP");
        assertThat(receipt.necessityProof().growthControl())
                .contains("After Node v302");
        assertThat(receipt.necessityProof().proofComplete()).isTrue();

        assertThat(receipt.checks().sourceDecisionRecordEchoLoaded()).isTrue();
        assertThat(receipt.checks().sourceDecisionRecordEchoReady()).isTrue();
        assertThat(receipt.checks().sourceDecisionRecordKeepsRuntimeBlocked()).isTrue();
        assertThat(receipt.checks().sourceDecisionRecordKeepsSideEffectsClosed()).isTrue();
        assertThat(receipt.checks().continuationDecisionSelected()).isTrue();
        assertThat(receipt.checks().decisionOptionsDocumented()).isTrue();
        assertThat(receipt.checks().runtimeImplementationOptionRejected()).isTrue();
        assertThat(receipt.checks().necessityProofHasBlocker()).isTrue();
        assertThat(receipt.checks().necessityProofHasConsumer()).isTrue();
        assertThat(receipt.checks().necessityProofExplainsV300ReuseBoundary()).isTrue();
        assertThat(receipt.checks().necessityProofDefinesStopCondition()).isTrue();
        assertThat(receipt.checks().necessityProofComplete()).isTrue();
        assertThat(receipt.checks().runtimeShellImplementationStillForbidden()).isTrue();
        assertThat(receipt.checks().runtimeShellInvocationStillForbidden()).isTrue();
        assertThat(receipt.checks().providerClientInstantiationStillForbidden()).isTrue();
        assertThat(receipt.checks().externalRequestStillForbidden()).isTrue();
        assertThat(receipt.checks().credentialBoundaryClosed()).isTrue();
        assertThat(receipt.checks().rawEndpointBoundaryClosed()).isTrue();
        assertThat(receipt.checks().writeBoundaryClosed()).isTrue();
        assertThat(receipt.checks().autoStartBoundaryClosed()).isTrue();
        assertThat(receipt.checks().productionAuditStillBlocked()).isTrue();
        assertThat(receipt.checks().productionWindowStillBlocked()).isTrue();
        assertThat(receipt.checks().readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification())
                .isTrue();

        assertThat(receipt.sideEffectBoundary().planIntakeEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyPlanIntakeEcho()).isTrue();
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
                receipt.sideEffectBoundary().fakeSecretProviderInstantiated(),
                receipt.sideEffectBoundary().fakeResolverClientInstantiated(),
                receipt.sideEffectBoundary().approvalLedgerWritten(),
                receipt.sideEffectBoundary().managedAuditStoreWritten(),
                receipt.sideEffectBoundary().sqlExecuted(),
                receipt.sideEffectBoundary().schemaMigrationExecuted(),
                receipt.sideEffectBoundary().rollbackExecuted(),
                receipt.sideEffectBoundary().automaticUpstreamStart(),
                receipt.sideEffectBoundary().javaStartedNodeMiniKvOrHarness()
        );

        assertThat(receipt.echoWorkflowReadySteps())
                .containsExactly(
                        "sourceDecisionRecordEchoed",
                        "nodeV301PlanIntakeEchoed",
                        "continuationDecisionEchoed",
                        "continuationOptionsEchoed",
                        "necessityProofEchoed",
                        "runtimeImplementationRejectedEchoed",
                        "noRuntimeImplementationEchoed",
                        "noRuntimeInvocationEchoed",
                        "noCredentialReadEchoed",
                        "noRawEndpointParseEchoed",
                        "noProviderClientInstantiationEchoed",
                        "noExternalRequestEchoed",
                        "noWriteOrMigrationEchoed",
                        "noAutoStartBoundaryEchoed"
                );
        assertThat(receipt.echoWorkflowMissingSteps()).isEmpty();
        assertThat(receipt.sourceDecisionRecordEchoed()).isTrue();
        assertThat(receipt.nodeV301PlanIntakeEchoed()).isTrue();
        assertThat(receipt.continuationDecisionEchoed()).isTrue();
        assertThat(receipt.continuationOptionsEchoed()).isTrue();
        assertThat(receipt.necessityProofEchoed()).isTrue();
        assertThat(receipt.runtimeImplementationRejectedEchoed()).isTrue();
        assertThat(receipt.noRuntimeImplementationEchoed()).isTrue();
        assertThat(receipt.noRuntimeInvocationEchoed()).isTrue();
        assertThat(receipt.noCredentialReadEchoed()).isTrue();
        assertThat(receipt.noRawEndpointParseEchoed()).isTrue();
        assertThat(receipt.noProviderClientInstantiationEchoed()).isTrue();
        assertThat(receipt.noExternalRequestEchoed()).isTrue();
        assertThat(receipt.noWriteOrMigrationEchoed()).isTrue();
        assertThat(receipt.noAutoStartBoundaryEchoed()).isTrue();
        assertThat(receipt.readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.readyForProductionAudit()).isFalse();
        assertThat(receipt.readyForProductionWindow()).isFalse();
        assertThat(receipt.nodeMayTreatAsProductionAuditRecord()).isFalse();

        assertThat(receipt.nodeWarningCodes())
                .containsExactly(
                        "CONTINUATION_PLAN_DOES_NOT_AUTHORIZE_RUNTIME",
                        "NODE_V302_REQUIRES_JAVA_V136_AND_MINI_KV_V133"
                );
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly(
                        "REQUEST_PARALLEL_JAVA_MINI_KV_ECHO",
                        "STOP_CHAIN_AFTER_V302_WITHOUT_NEW_BLOCKER"
                );
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v133 runtime shell post-decision plan intake non-participation receipt",
                        "Node v302 post-decision plan intake upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v41");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceiptDigest",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeState",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionSelectedContinuationDecision",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionDecisionOptionCount",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionSelectedDecisionOptionCount",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionRejectedRuntimeImplementationOptionCount",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionReadyForNodeV302",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionApprovalLedgerWritten",
                        "sandboxEndpointCredentialResolverRuntimeShellPostDecisionAutomaticUpstreamStart"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeState=runtime-shell-post-decision-continuation-plan-intake-ready",
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.planIntake.selectedContinuationDecision=continue-blocked-planning",
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.planIntake.decisionOptionCount=4",
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.necessityProof.proofComplete=true",
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.consumedByNodeRuntimeShellPostDecisionPlanIntakeProfile with Node v301",
                        "Require managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.planIntake.selectedContinuationDecision=continue-blocked-planning before Node v302",
                        "Require managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.necessityProof.proofComplete=true before Node v302",
                        "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt.planIntake.externalRequestAllowed=false"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
