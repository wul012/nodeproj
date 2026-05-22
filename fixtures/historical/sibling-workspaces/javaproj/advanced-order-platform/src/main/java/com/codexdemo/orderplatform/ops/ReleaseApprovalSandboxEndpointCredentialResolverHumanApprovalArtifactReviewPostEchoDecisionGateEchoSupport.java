package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoDecisionGate;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoNoGoCondition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoPrerequisite;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES =
            ReleaseApprovalEchoMarkerSupport.boundaryInputNames(
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateState",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoPrerequisiteCount",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoMissingPrerequisiteCount",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoNoGoConditionCount",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoReadyForNodeV311",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoRuntimeImplemented",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoCredentialValueRead",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoExternalRequestSent",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoProviderClientInstantiated",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoSqlExecuted",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoMiniKvWriteOrAuthorityCommandExecuted",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoAutomaticUpstreamStart"
            );

    private ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt source
    ) {
        RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo sourceNodeV309 = sourceNodeV309(source);
        RehearsalHumanApprovalArtifactReviewPostEchoDecisionGate decisionGate = decisionGate(sourceNodeV309);
        RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary boundary = sideEffectBoundary();
        RehearsalHumanApprovalArtifactReviewPostEchoChecks checks = checks(sourceNodeV309, decisionGate, boundary);
        EchoWorkflowReadiness readiness = readiness(sourceNodeV309, decisionGate, checks, boundary);
        List<String> warnings = receiptWarnings(readiness);
        String digest = receiptDigest(source, sourceNodeV309, decisionGate, checks, boundary, readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_ECHO_RECEIPT_VERSION,
                source.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_ECHO_RECEIPT_SCHEMA_VERSION,
                source.receiptDigest(),
                OpsEvidenceService.NODE_V310_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_VERSION,
                OpsEvidenceService.NODE_V310_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_PROFILE,
                OpsEvidenceService.NODE_V310_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_ENDPOINT,
                OpsEvidenceService.NODE_V310_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V310_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_STATE,
                "Node v309",
                "Node v311",
                "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1",
                "java-v144-human-approval-artifact-review-post-echo-decision-gate-echo-only",
                "Node v310",
                sourceNodeV309,
                decisionGate,
                checks,
                boundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV309Echoed"),
                readiness.ready("decisionGateEchoed"),
                readiness.ready("postEchoPrerequisitesEchoed"),
                readiness.ready("noGoConditionsEchoed"),
                readiness.ready("necessityProofEchoed"),
                readiness.ready("parallelEchoRequestEchoed"),
                readiness.ready("noRuntimeImplementationEchoed"),
                readiness.ready("noRuntimeInvocationEchoed"),
                readiness.ready("noCredentialReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noProviderClientInstantiationEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noWriteOrMigrationEchoed"),
                readiness.ready("noMiniKvWriteOrAuthorityEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate(),
                false,
                false,
                false,
                false,
                false,
                false,
                digest,
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                        .prerequisiteIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                        .noGoConditionCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                        .warningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                        .recommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                        .nextRequiredEchoVersions(),
                warnings,
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                        .nodeVerificationActions()
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    static List<String> proofClaims() {
        return ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                .proofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                .nodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt receipt
    ) {
        RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return ReleaseApprovalEchoMarkerSupport.boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateState",
                        receipt.consumedByNodePostEchoDecisionGateState()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoPrerequisiteCount",
                        receipt.decisionGate().prerequisiteCount()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoMissingPrerequisiteCount",
                        receipt.decisionGate().missingPrerequisiteCount()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoNoGoConditionCount",
                        receipt.decisionGate().noGoConditionCount()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoReadyForNodeV311",
                        receipt.readyForNodeV311PostEchoDecisionUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoRuntimeImplemented",
                        boundary.disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoRuntimeInvocationAllowed",
                        boundary.disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoCredentialValueRead",
                        boundary.credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoRawEndpointUrlParsed",
                        boundary.rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoExternalRequestSent",
                        boundary.externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoProviderClientInstantiated",
                        boundary.secretProviderInstantiated() || boundary.resolverClientInstantiated()
                                || boundary.fakeSecretProviderInstantiated() || boundary.fakeResolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoApprovalLedgerWritten",
                        boundary.approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoSqlExecuted",
                        boundary.sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoSchemaMigrationExecuted",
                        boundary.schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoMiniKvWriteOrAuthorityCommandExecuted",
                        boundary.miniKvWriteOrAuthorityCommandExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactPostEchoAutomaticUpstreamStart",
                        boundary.automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt receipt
    ) {
        RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return receipt.readyForNodeV311PostEchoDecisionUpstreamEchoVerification()
                && !receipt.readyForDisabledRuntimeShellImplementation()
                && !receipt.readyForDisabledRuntimeShellInvocation()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed()
                && !boundary.credentialValueRead()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.externalRequestSent()
                && !boundary.secretProviderInstantiated()
                && !boundary.resolverClientInstantiated()
                && !boundary.fakeSecretProviderInstantiated()
                && !boundary.fakeResolverClientInstantiated()
                && !boundary.approvalLedgerWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted()
                && !boundary.deploymentExecuted()
                && !boundary.rollbackExecuted()
                && !boundary.miniKvWriteOrAuthorityCommandExecuted()
                && !boundary.automaticUpstreamStart();
    }

    private static RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo sourceNodeV309(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt source
    ) {
        return new RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo(
                "Node v309",
                "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1",
                "human-approval-artifact-review-upstream-echo-verification-ready",
                source.readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification(),
                verificationDigest(source),
                "human-approval-artifact-review-upstream-echo-verification-only",
                "Node v308 + Java v143 + mini-kv v136",
                source.reviewPacketContractEchoed(),
                source.readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification(),
                true,
                source.readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification(),
                source.reviewPacketContractEchoed()
                        && source.requiredFieldsEchoed()
                        && source.prohibitedFieldsEchoed()
                        && source.rejectionReasonsEchoed()
                        && source.missingFieldChecksEchoed()
                        && source.noGoBoundariesEchoed(),
                source.noRuntimeImplementationEchoed()
                        && source.noRuntimeInvocationEchoed()
                        && source.noCredentialReadEchoed()
                        && source.noRawEndpointParseEchoed()
                        && source.noExternalRequestEchoed()
                        && source.noWriteOrMigrationEchoed()
                        && source.noMiniKvWriteOrAuthorityEchoed()
                        && source.noAutoStartBoundaryEchoed(),
                true,
                source.reviewPacket().packetDigest(),
                source.reviewPacket().requiredFieldCount(),
                source.reviewPacket().prohibitedFieldCount(),
                source.reviewPacket().rejectionReasonCount(),
                source.reviewPacket().missingFieldCheckCount(),
                source.reviewPacket().noGoBoundaryCount(),
                source.reviewPacket().upstreamEchoRequestCount(),
                source.sideEffectBoundary().disabledRuntimeShellImplemented(),
                source.sideEffectBoundary().disabledRuntimeShellInvocationAllowed(),
                source.sideEffectBoundary().executionAllowed(),
                source.sideEffectBoundary().connectsManagedAudit(),
                source.sideEffectBoundary().credentialValueRead(),
                source.sideEffectBoundary().rawEndpointUrlParsed(),
                source.sideEffectBoundary().externalRequestSent(),
                source.sideEffectBoundary().schemaMigrationExecuted(),
                source.sideEffectBoundary().approvalLedgerWritten(),
                source.sideEffectBoundary().automaticUpstreamStart()
        );
    }

    private static RehearsalHumanApprovalArtifactReviewPostEchoDecisionGate decisionGate(
            RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo sourceNodeV309
    ) {
        List<RehearsalHumanApprovalArtifactReviewPostEchoPrerequisite> prerequisites =
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                        .requiredPrerequisites();
        List<RehearsalHumanApprovalArtifactReviewPostEchoNoGoCondition> noGoConditions =
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateCatalog
                        .noGoConditions();
        RehearsalHumanApprovalArtifactReviewPostEchoNecessityProof proof = necessityProof();
        String digest = decisionDigest(sourceNodeV309, prerequisites, noGoConditions, proof);

        return new RehearsalHumanApprovalArtifactReviewPostEchoDecisionGate(
                digest,
                "human-approval-artifact-review-post-echo-decision-gate-only",
                "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review",
                "Node v308 + Java v143 + mini-kv v136 + Node v309",
                "continue-only-as-blocked-post-echo-prerequisite-review",
                "Node v309 aligned Java v143 and mini-kv v136 with the Node v308 review packet, but it did not provide a signed artifact instance, credential-handle approval, endpoint allowlist approval, no-network safety evidence, abort semantics, or upstream echo of this decision gate.",
                "request-read-only-upstream-decision-echo-before-any-runtime-shell",
                sourceNodeV309.readyForHumanApprovalArtifactReviewUpstreamEchoVerification(),
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                prerequisites.size(),
                prerequisites.size(),
                noGoConditions.size(),
                prerequisites,
                noGoConditions,
                proof
        );
    }

    private static RehearsalHumanApprovalArtifactReviewPostEchoNecessityProof necessityProof() {
        return new RehearsalHumanApprovalArtifactReviewPostEchoNecessityProof(
                "v309 aligned the Java v143 and mini-kv v136 echoes, but it did not decide whether post-echo work may continue or which approval prerequisites remain missing.",
                "Java v144 and mini-kv v137, then Node v311",
                "v309 is an upstream echo verification only; it proves alignment but does not publish a decision gate that upstreams can echo before any later runtime-shell discussion.",
                "Reuse v309 as source evidence, but create v310 as the minimal decision layer that names the still-missing post-echo prerequisites.",
                "Stop immediately if the next step requires credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, runtime shell implementation or invocation, ledger/schema writes, mini-kv write/admin commands, authority state, or automatic upstream start.",
                true
        );
    }

    private static RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary sideEffectBoundary() {
        return new RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary(
                true, true, true,
                false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false,
                false, false, false, false, false, false
        );
    }

    private static RehearsalHumanApprovalArtifactReviewPostEchoChecks checks(
            RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo sourceNodeV309,
            RehearsalHumanApprovalArtifactReviewPostEchoDecisionGate decisionGate,
            RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary boundary
    ) {
        boolean sourceLoaded = sourceNodeV309.profileVersion().endsWith("human-approval-artifact-review-upstream-echo-verification.v1");
        boolean sourceAligned = sourceNodeV309.upstreamEchoAligned()
                && sourceNodeV309.reviewPacketContractAligned()
                && sourceNodeV309.sideEffectBoundariesAligned()
                && sourceNodeV309.sourceNodeV308Ready()
                && sourceNodeV309.javaV143EchoReady()
                && sourceNodeV309.miniKvV136ReceiptReady();
        boolean sourceRuntimeBlocked = !sourceNodeV309.runtimeShellImplemented()
                && !sourceNodeV309.runtimeShellInvocationAllowed()
                && sourceNodeV309.implementationStillBlocked();
        boolean sourceSideEffectsClosed = !sourceNodeV309.executionAllowed()
                && !sourceNodeV309.connectsManagedAudit()
                && !sourceNodeV309.credentialValueRead()
                && !sourceNodeV309.rawEndpointUrlParsed()
                && !sourceNodeV309.externalRequestSent()
                && !sourceNodeV309.schemaMigrationExecuted()
                && !sourceNodeV309.approvalLedgerWritten()
                && !sourceNodeV309.automaticUpstreamStart();
        boolean selectsGate = decisionGate.decision().equals("continue-only-as-blocked-post-echo-prerequisite-review")
                && decisionGate.selectedPath().equals("request-read-only-upstream-decision-echo-before-any-runtime-shell");
        boolean blocksRuntime = !decisionGate.allowsDisabledRuntimeShellImplementation()
                && !decisionGate.allowsDisabledRuntimeShellInvocation()
                && !decisionGate.allowsCredentialValueRead()
                && !decisionGate.allowsRawEndpointUrlParse()
                && !decisionGate.allowsExternalRequest()
                && !decisionGate.allowsManagedAuditConnection();
        boolean readOnly = !decisionGate.allowsSchemaMigration()
                && !decisionGate.allowsApprovalLedgerWrite()
                && !decisionGate.allowsAutomaticUpstreamStart();
        boolean prerequisitesDocumented = decisionGate.prerequisiteCount() == 6
                && decisionGate.requiredPrerequisites().stream()
                .allMatch(RehearsalHumanApprovalArtifactReviewPostEchoPrerequisite::requiredBeforeRuntimeShell);
        boolean missingBlocks = decisionGate.missingPrerequisiteCount() == decisionGate.prerequisiteCount();
        boolean proofComplete = decisionGate.necessityProof().proofComplete();
        boolean parallelEcho = decisionGate.allowsParallelJavaV144MiniKvV137EchoRequest()
                && !decisionGate.allowsNodeV311BeforeUpstreamEcho();
        boolean upstreamProbesDisabled = true;
        boolean upstreamActionsDisabled = true;
        boolean productionAuditBlocked = !boundary.productionAuditAllowed();
        boolean productionWindowBlocked = !boundary.productionWindowAllowed();
        boolean ready = sourceLoaded
                && sourceNodeV309.readyForHumanApprovalArtifactReviewUpstreamEchoVerification()
                && sourceAligned
                && sourceRuntimeBlocked
                && sourceSideEffectsClosed
                && selectsGate
                && blocksRuntime
                && readOnly
                && prerequisitesDocumented
                && missingBlocks
                && proofComplete
                && parallelEcho
                && upstreamProbesDisabled
                && upstreamActionsDisabled
                && productionAuditBlocked
                && productionWindowBlocked;

        return new RehearsalHumanApprovalArtifactReviewPostEchoChecks(
                sourceLoaded,
                sourceNodeV309.readyForHumanApprovalArtifactReviewUpstreamEchoVerification(),
                sourceAligned,
                sourceRuntimeBlocked,
                sourceSideEffectsClosed,
                selectsGate,
                blocksRuntime,
                readOnly,
                prerequisitesDocumented,
                missingBlocks,
                proofComplete,
                parallelEcho,
                upstreamProbesDisabled,
                upstreamActionsDisabled,
                productionAuditBlocked,
                productionWindowBlocked,
                ready
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo sourceNodeV309,
            RehearsalHumanApprovalArtifactReviewPostEchoDecisionGate decisionGate,
            RehearsalHumanApprovalArtifactReviewPostEchoChecks checks,
            RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV309Echoed", checks.sourceNodeV309Ready()
                        && checks.sourceNodeV309UpstreamEchoAligned()),
                workflowStep("decisionGateEchoed", decisionGate.decisionDigest().startsWith("sha256:")
                        && checks.decisionSelectsPostEchoPrerequisiteGate()),
                workflowStep("postEchoPrerequisitesEchoed", checks.postEchoPrerequisitesDocumented()),
                workflowStep("noGoConditionsEchoed", decisionGate.noGoConditionCount() == 9
                        && decisionGate.explicitNoGoConditions().stream()
                        .allMatch(condition -> condition.action().equals("pause-and-do-not-implement-runtime-shell"))),
                workflowStep("necessityProofEchoed", checks.necessityProofComplete()),
                workflowStep("parallelEchoRequestEchoed", checks.parallelJavaV144MiniKvV137EchoRecommended()),
                workflowStep("noRuntimeImplementationEchoed",
                        !sourceNodeV309.runtimeShellImplemented() && !boundary.disabledRuntimeShellImplemented()),
                workflowStep("noRuntimeInvocationEchoed",
                        !sourceNodeV309.runtimeShellInvocationAllowed()
                                && !boundary.disabledRuntimeShellInvocationAllowed()),
                workflowStep("noCredentialReadEchoed",
                        !sourceNodeV309.credentialValueRead() && !boundary.credentialValueRead()),
                workflowStep("noRawEndpointParseEchoed",
                        !sourceNodeV309.rawEndpointUrlParsed() && !boundary.rawEndpointUrlParsed()),
                workflowStep("noProviderClientInstantiationEchoed",
                        !boundary.secretProviderInstantiated()
                                && !boundary.resolverClientInstantiated()
                                && !boundary.fakeSecretProviderInstantiated()
                                && !boundary.fakeResolverClientInstantiated()),
                workflowStep("noExternalRequestEchoed",
                        !sourceNodeV309.externalRequestSent() && !boundary.externalRequestSent()),
                workflowStep("noWriteOrMigrationEchoed",
                        !sourceNodeV309.approvalLedgerWritten()
                                && !sourceNodeV309.schemaMigrationExecuted()
                                && !boundary.approvalLedgerWritten()
                                && !boundary.sqlExecuted()
                                && !boundary.schemaMigrationExecuted()),
                workflowStep("noMiniKvWriteOrAuthorityEchoed",
                        !boundary.miniKvWriteOrAuthorityCommandExecuted()),
                workflowStep("noAutoStartBoundaryEchoed",
                        !sourceNodeV309.automaticUpstreamStart()
                                && !boundary.automaticUpstreamStart()
                                && !boundary.javaStartedNodeMiniKvOrHarness())
        );
    }

    private static String verificationDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt source
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("nodeVersion", "Node v309"),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", source.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", source.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceReviewPacketDigest", source.reviewPacket().packetDigest()),
                ReleaseApprovalDigestSupport.line("upstreamEchoAligned",
                        source.readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification())
        ));
    }

    private static String decisionDigest(
            RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo sourceNodeV309,
            List<RehearsalHumanApprovalArtifactReviewPostEchoPrerequisite> prerequisites,
            List<RehearsalHumanApprovalArtifactReviewPostEchoNoGoCondition> noGoConditions,
            RehearsalHumanApprovalArtifactReviewPostEchoNecessityProof proof
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("profileVersion", OpsEvidenceService
                        .NODE_V310_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_PROFILE),
                ReleaseApprovalDigestSupport.line("nodeV309Digest", sourceNodeV309.verificationDigest()),
                ReleaseApprovalDigestSupport.line("prerequisites", prerequisites),
                ReleaseApprovalDigestSupport.line("noGoConditions", noGoConditions),
                ReleaseApprovalDigestSupport.line("necessityProof", proof)
        ));
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt source,
            RehearsalHumanApprovalArtifactReviewPostEchoSourceNodeV309Echo sourceNodeV309,
            RehearsalHumanApprovalArtifactReviewPostEchoDecisionGate decisionGate,
            RehearsalHumanApprovalArtifactReviewPostEchoChecks checks,
            RehearsalHumanApprovalArtifactReviewPostEchoSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", source.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", source.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV309", sourceNodeV309),
                ReleaseApprovalDigestSupport.line("decisionGate", decisionGate),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", boundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceNodeV309Echoed", "NODE_V309_SOURCE_NOT_READY"),
                readiness.warningIfMissing("decisionGateEchoed", "POST_ECHO_DECISION_GATE_NOT_ECHOED"),
                readiness.warningIfMissing("postEchoPrerequisitesEchoed", "POST_ECHO_PREREQUISITES_NOT_ECHOED"),
                readiness.warningIfMissing("noGoConditionsEchoed", "POST_ECHO_NO_GO_CONDITIONS_NOT_ECHOED"),
                readiness.warningIfMissing("parallelEchoRequestEchoed", "PARALLEL_ECHO_REQUEST_NOT_EXPLICIT"),
                readiness.warningIfMissing("noMiniKvWriteOrAuthorityEchoed",
                        "MINIKV_WRITE_OR_AUTHORITY_BOUNDARY_OPEN")
        );
    }
}
