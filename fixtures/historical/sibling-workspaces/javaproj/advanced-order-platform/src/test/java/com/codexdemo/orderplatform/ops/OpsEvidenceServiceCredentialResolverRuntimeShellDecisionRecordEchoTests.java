package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceCredentialResolverRuntimeShellDecisionRecordEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsRuntimeShellDecisionRecordEchoReceiptForNodeV300() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt receipt =
                rehearsal.managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-decision-record-echo-receipt.v1"
                );
        assertThat(receipt.sourceRuntimeShellCandidateGateEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-runtime-shell-candidate-gate-echo-receipt.v1"
                );
        assertThat(receipt.sourceRuntimeShellCandidateGateEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v39");
        assertThat(receipt.sourceRuntimeShellCandidateGateEchoReceiptDigest())
                .isEqualTo(rehearsal
                        .managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt()
                        .receiptDigest());

        assertThat(receipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordVersion())
                .isEqualTo("Node v299");
        assertThat(receipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record.v1"
                );
        assertThat(receipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record"
                );
        assertThat(receipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordState())
                .isEqualTo("runtime-shell-candidate-gate-decision-record-ready");
        assertThat(receipt.nextNodeRuntimeShellDecisionRecordUpstreamEchoVerificationVersion())
                .isEqualTo("Node v300");
        assertThat(receipt.nextNodeRuntimeShellDecisionRecordUpstreamEchoVerificationProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification.v1"
                );
        assertThat(receipt.decisionRecordEchoMode())
                .isEqualTo("java-v135-credential-resolver-runtime-shell-decision-record-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v299");

        assertThat(receipt.sourceCandidateGateEcho().readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification())
                .isTrue();
        assertThat(receipt.sourceCandidateGateEcho().sourceHandoffEchoed()).isTrue();
        assertThat(receipt.sourceCandidateGateEcho().nodeV297CandidateGateEchoed()).isTrue();
        assertThat(receipt.sourceCandidateGateEcho().fiveGateSetEchoed()).isTrue();
        assertThat(receipt.sourceCandidateGateEcho().blockedDecisionEchoed()).isTrue();
        assertThat(receipt.sourceCandidateGateEcho().disabledRuntimeShellImplemented()).isFalse();
        assertThat(receipt.sourceCandidateGateEcho().credentialValueRead()).isFalse();
        assertThat(receipt.sourceCandidateGateEcho().rawEndpointUrlParsed()).isFalse();
        assertThat(receipt.sourceCandidateGateEcho().approvalLedgerWritten()).isFalse();

        assertThat(receipt.decisionRecord().decisionRecordState())
                .isEqualTo("runtime-shell-candidate-gate-decision-record-ready");
        assertThat(receipt.decisionRecord().recordMode())
                .isEqualTo("runtime-shell-candidate-gate-decision-record-only");
        assertThat(receipt.decisionRecord().decisionScope())
                .isEqualTo("managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell");
        assertThat(receipt.decisionRecord().sourceSpan())
                .isEqualTo("Node v297-v298 + Java v134 + mini-kv v131");
        assertThat(receipt.decisionRecord().decision()).isEqualTo("blocked");
        assertThat(receipt.decisionRecord().upstreamEchoVerified()).isTrue();
        assertThat(receipt.decisionRecord().allowsParallelJavaV135MiniKvV132EchoRequest()).isTrue();
        assertThat(receipt.decisionRecord().allowsNodeV300BeforeUpstreamEcho()).isFalse();
        assertThat(receipt.decisionRecord().allowsDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.decisionRecord().allowsDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.decisionRecord().allowsCredentialValueRead()).isFalse();
        assertThat(receipt.decisionRecord().allowsRawEndpointUrlParse()).isFalse();
        assertThat(receipt.decisionRecord().allowsExternalRequest()).isFalse();
        assertThat(receipt.decisionRecord().allowsManagedAuditConnection()).isFalse();
        assertThat(receipt.decisionRecord().allowsSchemaMigration()).isFalse();
        assertThat(receipt.decisionRecord().allowsApprovalLedgerWrite()).isFalse();

        assertThat(receipt.decisionRecord().requiredEvidenceCount()).isEqualTo(4);
        assertThat(receipt.decisionRecord().requiredEvidence())
                .extracting(evidence -> evidence.id())
                .containsExactly(
                        "node-v298-upstream-echo-ready",
                        "java-v134-echo-ready",
                        "mini-kv-v131-receipt-ready",
                        "runtime-shell-still-blocked"
                );
        assertThat(receipt.decisionRecord().requiredEvidence())
                .allMatch(evidence -> "present".equals(evidence.status())
                        && evidence.requiredBeforeRuntimeShell());
        assertThat(receipt.decisionRecord().noGoConditionCount()).isEqualTo(6);
        assertThat(receipt.decisionRecord().explicitNoGoConditions())
                .extracting(condition -> condition.code())
                .containsExactly(
                        "RUNTIME_SHELL_IMPLEMENTATION_REQUIRED",
                        "CREDENTIAL_VALUE_REQUIRED",
                        "RAW_ENDPOINT_URL_REQUIRED",
                        "MANAGED_AUDIT_CONNECTION_REQUIRED",
                        "LEDGER_SCHEMA_WRITE_REQUIRED",
                        "AUTOSTART_REQUIRED"
                );
        assertThat(receipt.decisionRecord().explicitNoGoConditions())
                .allMatch(condition -> "pause-and-do-not-implement-runtime-shell".equals(condition.action()));

        assertThat(receipt.checks().sourceCandidateGateEchoReady()).isTrue();
        assertThat(receipt.checks().sourceCandidateGateKeepsRuntimeBlocked()).isTrue();
        assertThat(receipt.checks().sourceCandidateGateKeepsSideEffectsClosed()).isTrue();
        assertThat(receipt.checks().decisionRecordBlocked()).isTrue();
        assertThat(receipt.checks().decisionRecordBlocksRuntimeShell()).isTrue();
        assertThat(receipt.checks().decisionRecordStillReadOnly()).isTrue();
        assertThat(receipt.checks().requiredEvidenceStable()).isTrue();
        assertThat(receipt.checks().noGoConditionsStable()).isTrue();
        assertThat(receipt.checks().parallelJavaV135MiniKvV132EchoRecommended()).isTrue();
        assertThat(receipt.checks().readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification())
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
                        "sourceCandidateGateEchoed",
                        "nodeV299DecisionRecordEchoed",
                        "blockedDecisionEchoed",
                        "requiredEvidenceEchoed",
                        "noGoConditionsEchoed",
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
        assertThat(receipt.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.nodeMayTreatAsProductionAuditRecord()).isFalse();
        assertThat(receipt.nodeWarningCodes())
                .containsExactly(
                        "DECISION_RECORD_ONLY_DOES_NOT_AUTHORIZE_RUNTIME",
                        "NODE_V300_REQUIRES_JAVA_V135_AND_MINI_KV_V132"
                );
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly(
                        "RUN_PARALLEL_JAVA_V135_MINI_KV_V132",
                        "KEEP_NODE_V300_BEHIND_PARALLEL_EVIDENCE"
                );
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v132 runtime shell decision record non-participation receipt",
                        "Node v300 runtime shell decision record upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v40");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceiptDigest",
                        "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordDecision",
                        "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordNoGoConditionCount",
                        "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordApprovalLedgerWritten"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.decision=blocked",
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.noGoConditionCount=6",
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsDisabledRuntimeShellImplementation=false",
                        "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordProfile with Node v299",
                        "Require managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.decision=blocked before Node v300",
                        "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsExternalRequest=false"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated.managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
