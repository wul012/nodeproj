package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt;

import org.junit.jupiter.api.Test;

class OpsEvidenceServiceCredentialResolverDisabledRuntimeShellCandidateGateEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsRuntimeShellCandidateGateEchoReceiptForNodeV298() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt receipt =
                rehearsal.managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-runtime-shell-candidate-gate-echo-receipt.v1"
                );
        assertThat(receipt.sourceDisabledRuntimeShellHandoffEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-runtime-shell-handoff-echo-receipt.v1"
                );
        assertThat(receipt.sourceDisabledRuntimeShellHandoffEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v38");
        assertThat(receipt.sourceDisabledRuntimeShellHandoffEchoReceiptDigest())
                .isEqualTo(rehearsal.managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt()
                        .receiptDigest());

        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellImplementationCandidateGateVersion())
                .isEqualTo("Node v297");
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate.v1"
                );
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellImplementationCandidateGateEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate"
                );
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellImplementationCandidateGateMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellImplementationCandidateGateState())
                .isEqualTo("disabled-runtime-shell-implementation-candidate-gate-reviewed");
        assertThat(receipt.nextNodeCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationVersion())
                .isEqualTo("Node v298");
        assertThat(receipt.nextNodeCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification.v1"
                );
        assertThat(receipt.candidateGateEchoMode())
                .isEqualTo("java-v134-credential-resolver-disabled-runtime-shell-candidate-gate-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v297");

        assertThat(receipt.sourceHandoffEcho().sourceReadyForNodeV296()).isTrue();
        assertThat(receipt.sourceHandoffEcho().sourceReadyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.sourceHandoffEcho().runtimeShellImplemented()).isFalse();
        assertThat(receipt.sourceHandoffEcho().credentialValueRead()).isFalse();
        assertThat(receipt.sourceHandoffEcho().rawEndpointUrlParsed()).isFalse();
        assertThat(receipt.sourceHandoffEcho().approvalLedgerWritten()).isFalse();

        assertThat(receipt.candidateGate().candidateGateState())
                .isEqualTo("disabled-runtime-shell-implementation-candidate-gate-reviewed");
        assertThat(receipt.candidateGate().gateVersion())
                .isEqualTo("node-v297-disabled-runtime-shell-implementation-candidate-gate.v1");
        assertThat(receipt.candidateGate().gateMode()).isEqualTo("candidate-gate-only-default-blocked");
        assertThat(receipt.candidateGate().gateDecision())
                .isEqualTo("blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation");
        assertThat(receipt.candidateGate().necessity().blocker())
                .isEqualTo("candidate-gate-lacks-upstream-echo-and-runtime-prerequisite-proof");
        assertThat(receipt.candidateGate().necessity().consumer())
                .isEqualTo("Java v134 and mini-kv v131, then Node v298");
        assertThat(receipt.candidateGate().requiredGateCount()).isEqualTo(5);
        assertThat(receipt.candidateGate().documentedGateCount()).isEqualTo(5);
        assertThat(receipt.candidateGate().reviewEvidenceSatisfiedCount()).isEqualTo(5);
        assertThat(receipt.candidateGate().runtimePrerequisiteSatisfiedCount()).isZero();
        assertThat(receipt.candidateGate().implementationAllowedGateCount()).isZero();
        assertThat(receipt.candidateGate().requiredGates())
                .extracting(gate -> gate.code())
                .containsExactly(
                        "DEDICATED_DISABLED_BY_DEFAULT_FLAG",
                        "OPERATOR_APPROVAL",
                        "ABORT_SEMANTICS",
                        "NO_NETWORK_TESTS",
                        "HISTORICAL_FALLBACK_EVIDENCE"
                );
        assertThat(receipt.candidateGate().requiredGates())
                .allMatch(gate -> gate.documentedForGateReview()
                        && gate.reviewEvidenceSatisfied()
                        && !gate.runtimePrerequisiteSatisfied()
                        && !gate.implementationAllowed());
        assertThat(receipt.candidateGate().stopConditions()).hasSize(6);

        assertThat(receipt.checks().sourceHandoffEchoReady()).isTrue();
        assertThat(receipt.checks().candidateGateCountStable()).isTrue();
        assertThat(receipt.checks().allCandidateGatesReviewEvidenceSatisfied()).isTrue();
        assertThat(receipt.checks().candidateGateKeepsRuntimeBlocked()).isTrue();
        assertThat(receipt.checks().dedicatedDisabledByDefaultFlagRequired()).isTrue();
        assertThat(receipt.checks().operatorApprovalRequired()).isTrue();
        assertThat(receipt.checks().abortSemanticsRequired()).isTrue();
        assertThat(receipt.checks().noNetworkTestsRequired()).isTrue();
        assertThat(receipt.checks().historicalFallbackEvidenceRequired()).isTrue();
        assertThat(receipt.checks().parallelUpstreamEchoRecommended()).isTrue();
        assertThat(receipt.checks().noRuntimeImplementationCreated()).isTrue();
        assertThat(receipt.checks().credentialBoundaryClosed()).isTrue();
        assertThat(receipt.checks().writeBoundaryClosed()).isTrue();
        assertThat(receipt.checks().readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification())
                .isTrue();

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
                        "sourceHandoffEchoed",
                        "nodeV297CandidateGateEchoed",
                        "candidateGateDecisionEchoed",
                        "fiveGateSetEchoed",
                        "necessityEchoed",
                        "blockedDecisionEchoed",
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
        assertThat(receipt.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.nodeMayTreatAsProductionAuditRecord()).isFalse();
        assertThat(receipt.nodeWarningCodes())
                .containsExactly("CANDIDATE_GATE_ONLY_DEFAULT_BLOCKED", "UPSTREAM_ECHO_REQUIRED_BEFORE_NODE_V298");
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly("RUN_PARALLEL_JAVA_V134_MINI_KV_V131",
                        "VERIFY_WITH_NODE_V298_AFTER_UPSTREAM_ECHO");
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v131 runtime shell candidate gate non-participation receipt",
                        "Node v298 runtime shell candidate gate upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v39");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceiptDigest",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateState",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateDecision",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateImplementationAllowedCount",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateApprovalLedgerWritten"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt.candidateGate.requiredGateCount=5",
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt.candidateGate.implementationAllowedGateCount=0",
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt.sideEffectBoundary.disabledRuntimeShellImplemented=false",
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt.consumedByNodeCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile with Node v297",
                        "Require managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt.candidateGate.requiredGateCount=5 before Node v298",
                        "Keep managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt.sideEffectBoundary.externalRequestSent=false"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated.managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
