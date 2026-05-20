package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryLines;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.APPROVAL_REQUIRED_DECISION_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.CANDIDATE_ECHO_MODE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.CANDIDATE_READY_DECISION_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.CHECK_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.NODE_V272_PROFILE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.NODE_V272_SOURCE_CHECK_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.NODE_V272_SOURCE_PASSED_CHECK_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.NODE_V272_SOURCE_SPAN;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.NODE_V272_VERIFICATION_STATE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.NODE_V273_REVIEW_STATE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.PASSED_CHECK_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.RECOMMENDATION_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.REQUIRED_BOUNDARY_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.SOURCE_CHECK_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.SOURCE_PASSED_CHECK_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.SOURCE_SPAN;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.WARNING_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.approvalRequiredBoundaryCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.approvalRequiredBoundaryExplanations;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.approvalRequiredBoundaryExplanationsComplete;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.boundaryCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.candidate;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.candidateComplete;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.candidateReadyBoundaryCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.checks;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.checksClosed;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.requirementCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.sideEffectBoundary;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport.sideEffectBoundaryBlocked;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryExplanation;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidate;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateReviewSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSummary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPlanIntakeUpstreamEchoVerificationSource;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt;

import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceiptBuilder {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = ReleaseApprovalEchoMarkerSupport
            .boundaryInputNames(
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateReviewState",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateSourceReady",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateBoundaryCount",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateCandidateReadyDecisionCount",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateApprovalRequiredDecisionCount",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateApprovalRequiredExplanationCount",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateCredentialValueRead",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateExternalRequestSent",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateSecretProviderInstantiated",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateResolverClientInstantiated",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateConnectsManagedAudit",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateSqlExecuted",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverDisabledImplementationCandidateAutomaticUpstreamStart"
            );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sourceNodeV273.reviewState=credential-resolver-disabled-implementation-candidate-review-ready",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.candidateDecisionCount=10",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.candidateReadyDecisionCount=4",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.approvalRequiredDecisionCount=6",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.approvalRequiredBoundaryExplanations.size=6",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.interfaceShape.handleOnlyRequest=true",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.fakeWiringReview.fakeWiringReviewOnly=true",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.externalRequestSent=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.consumedByNodeCredentialResolverDisabledImplementationCandidateReviewProfile with Node v273",
            "Require managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.readyForNodeV274CredentialResolverDisabledCandidateVerification=true before Node v274",
            "Verify managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.candidateDecisionCount=10",
            "Verify managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.candidateReadyDecisionCount=4",
            "Verify managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.approvalRequiredBoundaryExplanations.size=6",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.interfaceShape.includesCredentialValue=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.candidate.interfaceShape.includesRawEndpointUrl=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.externalRequestSent=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.sideEffectBoundary.automaticUpstreamStart=false"
    );

    private static final List<String> NODE_WARNING_CODES = List.of(
            "DISABLED_CANDIDATE_REVIEW_ONLY",
            "APPROVAL_BOUNDARIES_REMAIN"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "RUN_PARALLEL_JAVA_V113_MINI_KV_V120",
            "VERIFY_WITH_NODE_V274_AFTER_UPSTREAM_ECHO"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "Java v113 credential resolver disabled implementation candidate echo receipt",
            "mini-kv v120 credential resolver disabled non-participation receipt"
    );

    RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt
                    planIntakeEchoReceipt
    ) {
        RehearsalSandboxEndpointCredentialResolverPlanIntakeUpstreamEchoVerificationSource sourceNodeV272 =
                sourceNodeV272(planIntakeEchoReceipt);
        RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidate candidate =
                candidate(candidateDigest(sourceNodeV272));
        RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateChecks checks =
                checks(sourceNodeV272Ready(sourceNodeV272), candidate);
        List<RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryExplanation>
                approvalRequiredBoundaryExplanations = approvalRequiredBoundaryExplanations();
        RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSummary summary =
                summary(candidate);
        RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateReviewSourceEcho sourceNodeV273 =
                sourceNodeV273(sourceNodeV272, summary);
        RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        EchoWorkflowReadiness readiness = readiness(
                sourceNodeV273,
                candidate,
                checks,
                approvalRequiredBoundaryExplanations,
                sideEffectBoundary
        );
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(
                planIntakeEchoReceipt,
                sourceNodeV273,
                candidate,
                checks,
                approvalRequiredBoundaryExplanations,
                sideEffectBoundary,
                readiness
        );

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_ECHO_RECEIPT_VERSION,
                planIntakeEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_ECHO_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V273_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_REVIEW_VERSION,
                OpsEvidenceService.NODE_V273_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_REVIEW_PROFILE,
                OpsEvidenceService.NODE_V273_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_REVIEW_ENDPOINT,
                OpsEvidenceService.NODE_V273_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_REVIEW_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V273_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_REVIEW_STATE,
                OpsEvidenceService.NODE_V272_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V272_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                CANDIDATE_ECHO_MODE,
                SOURCE_SPAN,
                sourceNodeV273,
                candidate,
                checks,
                sideEffectBoundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV273Echoed"),
                readiness.ready("sourceNodeV272UpstreamEchoed"),
                readiness.ready("disabledImplementationCandidateEchoed"),
                readiness.ready("candidateDecisionsEchoed"),
                readiness.ready("candidateReadyScopeEchoed"),
                readiness.ready("approvalRequiredScopeEchoed"),
                readiness.ready("approvalRequiredBoundaryExplanationsEchoed"),
                readiness.ready("handleOnlyInterfaceEchoed"),
                readiness.ready("fakeWiringReviewEchoed"),
                readiness.ready("noCredentialBoundaryEchoed"),
                readiness.ready("noRawEndpointBoundaryEchoed"),
                readiness.ready("noResolverRuntimeBoundaryEchoed"),
                readiness.ready("noConnectionBoundaryEchoed"),
                readiness.ready("noWriteBoundaryEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                true,
                readiness.allReady(),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview(),
                false,
                false,
                false,
                false,
                receiptDigest,
                boundaryCodes(),
                requirementCodes(),
                candidateReadyBoundaryCodes(),
                approvalRequiredBoundaryCodes(),
                approvalRequiredBoundaryExplanations,
                NODE_WARNING_CODES,
                NODE_RECOMMENDATION_CODES,
                NEXT_REQUIRED_ECHO_VERSIONS,
                receiptWarnings,
                NODE_VERIFICATION_ACTIONS
        );
    }

    List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    List<String> proofClaims() {
        return PROOF_CLAIMS;
    }

    List<String> nodeVerificationActions() {
        return NODE_VERIFICATION_ACTIONS;
    }

    List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(
                WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings()
        );
    }

    List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt receipt
    ) {
        return boundaryLines(
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateReviewState",
                        receipt.sourceNodeV273().reviewState()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateSourceReady",
                        receipt.sourceNodeV273Echoed()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateBoundaryCount",
                        receipt.candidate().candidateDecisionCount()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateCandidateReadyDecisionCount",
                        receipt.candidate().candidateReadyDecisionCount()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateApprovalRequiredDecisionCount",
                        receipt.candidate().approvalRequiredDecisionCount()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateApprovalRequiredExplanationCount",
                        receipt.approvalRequiredBoundaryExplanations().size()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateExternalRequestSent",
                        receipt.sideEffectBoundary().externalRequestSent()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateSecretProviderInstantiated",
                        receipt.sideEffectBoundary().secretProviderInstantiated()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateResolverClientInstantiated",
                        receipt.sideEffectBoundary().resolverClientInstantiated()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateConnectsManagedAudit",
                        receipt.sideEffectBoundary().connectsManagedAudit()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverDisabledImplementationCandidateAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt receipt
    ) {
        return candidateComplete(receipt.candidate())
                && sideEffectBoundaryBlocked(receipt.sideEffectBoundary())
                && receipt.disabledImplementationCandidateEchoed()
                && receipt.candidateDecisionsEchoed()
                && receipt.candidateReadyScopeEchoed()
                && receipt.approvalRequiredScopeEchoed()
                && receipt.handleOnlyInterfaceEchoed()
                && receipt.fakeWiringReviewEchoed()
                && receipt.noCredentialBoundaryEchoed()
                && receipt.noRawEndpointBoundaryEchoed()
                && receipt.noResolverRuntimeBoundaryEchoed()
                && receipt.noConnectionBoundaryEchoed()
                && receipt.noWriteBoundaryEchoed()
                && receipt.noAutoStartBoundaryEchoed()
                && receipt.echoWorkflowTemplateApplied()
                && !receipt.readyForManagedAuditSandboxAdapterConnection()
                && !receipt.readyForProductionAudit()
                && !receipt.readyForProductionWindow()
                && !receipt.nodeMayTreatAsProductionAuditRecord();
    }

    private static RehearsalSandboxEndpointCredentialResolverPlanIntakeUpstreamEchoVerificationSource sourceNodeV272(
            RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt
                    planIntakeEchoReceipt
    ) {
        return new RehearsalSandboxEndpointCredentialResolverPlanIntakeUpstreamEchoVerificationSource(
                "Node v272",
                NODE_V272_PROFILE,
                NODE_V272_VERIFICATION_STATE,
                planIntakeEchoReceipt.readyForNodeV272CredentialResolverPreImplementationPlanVerification(),
                true,
                true,
                NODE_V272_SOURCE_SPAN,
                planIntakeEchoReceipt.readyForCredentialResolverPreImplementationPlan(),
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
                false,
                planIntakeEchoReceipt.preImplementationPlan().planVersion(),
                planIntakeEchoReceipt.preImplementationPlan().planMode(),
                planIntakeEchoReceipt.preImplementationPlan().planDigest(),
                planIntakeEchoReceipt.planIntake().intakeDigest(),
                planIntakeEchoReceipt.preImplementationPlan().boundaryCount(),
                planIntakeEchoReceipt.preImplementationPlan().definedBoundaryCount(),
                planIntakeEchoReceipt.planIntake().missingBoundaryCount(),
                planIntakeEchoReceipt.boundaryCodes(),
                planIntakeEchoReceipt.requirementCodes(),
                planIntakeEchoReceipt.sourceNodeV270Echoed(),
                true,
                true,
                planIntakeEchoReceipt.planIntakeEchoed(),
                planIntakeEchoReceipt.preImplementationPlan().allRequiredBoundariesDefined(),
                planIntakeEchoReceipt.allRequiredBoundariesEchoed(),
                planIntakeEchoReceipt.allRequiredBoundariesEchoed(),
                true,
                planIntakeEchoReceipt.noCredentialBoundaryEchoed(),
                planIntakeEchoReceipt.noRawEndpointBoundaryEchoed(),
                planIntakeEchoReceipt.noResolverRuntimeBoundaryEchoed(),
                planIntakeEchoReceipt.noConnectionBoundaryEchoed(),
                planIntakeEchoReceipt.noWriteBoundaryEchoed(),
                planIntakeEchoReceipt.noAutoStartBoundaryEchoed(),
                sourceNodeV272Digest(planIntakeEchoReceipt),
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                NODE_V272_SOURCE_CHECK_COUNT,
                NODE_V272_SOURCE_PASSED_CHECK_COUNT,
                0,
                WARNING_COUNT,
                RECOMMENDATION_COUNT
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSummary summary(
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidate candidate
    ) {
        return new RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSummary(
                CHECK_COUNT,
                PASSED_CHECK_COUNT,
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                candidate.candidateDecisionCount(),
                candidate.candidateReadyDecisionCount(),
                candidate.approvalRequiredDecisionCount(),
                candidate.interfaceShape().requestFields().size(),
                candidate.interfaceShape().responseFields().size(),
                candidate.interfaceShape().failureClasses().size(),
                0,
                WARNING_COUNT,
                RECOMMENDATION_COUNT
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateReviewSourceEcho sourceNodeV273(
            RehearsalSandboxEndpointCredentialResolverPlanIntakeUpstreamEchoVerificationSource sourceNodeV272,
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSummary summary
    ) {
        return new RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateReviewSourceEcho(
                "Node v273",
                OpsEvidenceService.NODE_V273_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_REVIEW_PROFILE,
                NODE_V273_REVIEW_STATE,
                SOURCE_SPAN,
                true,
                true,
                true,
                true,
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
                false,
                false,
                false,
                false,
                sourceNodeV272,
                summary
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateReviewSourceEcho sourceNodeV273,
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidate candidate,
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateChecks checks,
            List<RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryExplanation>
                    approvalRequiredBoundaryExplanations,
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSideEffectBoundary sideEffectBoundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV273Echoed", sourceNodeV273Ready(sourceNodeV273)),
                workflowStep("sourceNodeV272UpstreamEchoed", sourceNodeV272Ready(sourceNodeV273.sourceNodeV272())),
                workflowStep("disabledImplementationCandidateEchoed", candidateComplete(candidate)),
                workflowStep("candidateDecisionsEchoed", checks.allCandidateDecisionsCovered()),
                workflowStep("candidateReadyScopeEchoed", checks.candidateReadyBoundariesLimited()),
                workflowStep("approvalRequiredScopeEchoed", checks.approvalRequiredBoundariesPreserved()),
                workflowStep("approvalRequiredBoundaryExplanationsEchoed",
                        approvalRequiredBoundaryExplanationsComplete(approvalRequiredBoundaryExplanations)),
                workflowStep("handleOnlyInterfaceEchoed", checks.interfaceShapeHandleOnly()),
                workflowStep("fakeWiringReviewEchoed", checks.fakeWiringReviewOnly()),
                workflowStep("noCredentialBoundaryEchoed", checks.credentialValueStillForbidden()
                        && !sideEffectBoundary.credentialValueRead()),
                workflowStep("noRawEndpointBoundaryEchoed", checks.rawEndpointStillForbidden()
                        && !sideEffectBoundary.rawEndpointUrlParsed()),
                workflowStep("noResolverRuntimeBoundaryEchoed", checks.resolverClientStillDisabled()
                        && !sideEffectBoundary.resolverClientInstantiated()),
                workflowStep("noConnectionBoundaryEchoed", checks.externalRequestStillBlocked()
                        && !sideEffectBoundary.connectsManagedAudit()),
                workflowStep("noWriteBoundaryEchoed", checks.ledgerWriteStillBlocked()
                        && !sideEffectBoundary.approvalLedgerWritten()
                        && !sideEffectBoundary.sqlExecuted()),
                workflowStep("noAutoStartBoundaryEchoed", !sideEffectBoundary.automaticUpstreamStart()
                        && !sideEffectBoundary.javaStartedNodeOrMiniKv())
        );
    }

    private static boolean sourceNodeV273Ready(
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateReviewSourceEcho source
    ) {
        return NODE_V273_REVIEW_STATE.equals(source.reviewState())
                && source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview()
                && source.disabledImplementationCandidateReviewOnly()
                && source.readOnlyCandidateReview()
                && source.readyForDisabledResolverInterfaceCandidate()
                && !source.readyForManagedAuditSandboxAdapterConnection()
                && !source.readyForProductionAudit()
                && !source.readyForProductionWindow()
                && !source.readyForProductionOperations()
                && !source.realResolverImplementationAllowed()
                && !source.executionAllowed()
                && !source.connectsManagedAudit()
                && !source.readsManagedAuditCredential()
                && !source.storesManagedAuditCredential()
                && !source.credentialValueRead()
                && !source.rawEndpointUrlParsed()
                && !source.externalRequestSent()
                && !source.secretProviderInstantiated()
                && !source.resolverClientInstantiated()
                && !source.schemaMigrationExecuted()
                && !source.approvalLedgerWritten()
                && !source.automaticUpstreamStart()
                && sourceNodeV272Ready(source.sourceNodeV272())
                && source.summary().checkCount() == CHECK_COUNT
                && source.summary().passedCheckCount() == PASSED_CHECK_COUNT
                && source.summary().candidateDecisionCount() == REQUIRED_BOUNDARY_COUNT
                && source.summary().candidateReadyDecisionCount() == CANDIDATE_READY_DECISION_COUNT
                && source.summary().approvalRequiredDecisionCount() == APPROVAL_REQUIRED_DECISION_COUNT
                && source.summary().productionBlockerCount() == 0;
    }

    private static boolean sourceNodeV272Ready(
            RehearsalSandboxEndpointCredentialResolverPlanIntakeUpstreamEchoVerificationSource source
    ) {
        return "Node v272".equals(source.sourceVersion())
                && NODE_V272_PROFILE.equals(source.profileVersion())
                && NODE_V272_VERIFICATION_STATE.equals(source.verificationState())
                && source.readyForPlanIntakeUpstreamEchoVerification()
                && source.readOnlyUpstreamEchoVerification()
                && source.planIntakeEchoVerificationOnly()
                && NODE_V272_SOURCE_SPAN.equals(source.sourceSpan())
                && source.readyForCredentialResolverPreImplementationPlan()
                && !source.readyForManagedAuditSandboxAdapterConnection()
                && !source.realResolverImplementationAllowed()
                && !source.executionAllowed()
                && !source.connectsManagedAudit()
                && !source.readsManagedAuditCredential()
                && !source.storesManagedAuditCredential()
                && !source.credentialValueRead()
                && !source.rawEndpointUrlParsed()
                && !source.externalRequestSent()
                && !source.secretProviderInstantiated()
                && !source.resolverClientInstantiated()
                && !source.schemaMigrationExecuted()
                && !source.approvalLedgerWritten()
                && !source.automaticUpstreamStart()
                && source.boundaryCount() == REQUIRED_BOUNDARY_COUNT
                && source.definedBoundaryCount() == REQUIRED_BOUNDARY_COUNT
                && source.missingBoundaryCount() == 0
                && source.boundaryCodes().equals(boundaryCodes())
                && source.requirementCodes().equals(requirementCodes())
                && source.sourceNodeV270Ready()
                && source.javaV112EchoReady()
                && source.miniKvV119NonParticipationReady()
                && source.planIntakeStateAligned()
                && source.planCountsAligned()
                && source.boundaryCodesAligned()
                && source.requirementCodesAligned()
                && source.planIntakeVersionsAligned()
                && source.credentialBoundaryAligned()
                && source.rawEndpointBoundaryAligned()
                && source.resolverBoundaryAligned()
                && source.connectionBoundaryAligned()
                && source.writeBoundaryAligned()
                && source.autoStartBoundaryAligned()
                && source.checkCount() == SOURCE_CHECK_COUNT
                && source.passedCheckCount() == SOURCE_PASSED_CHECK_COUNT
                && source.productionBlockerCount() == 0;
    }

    private static String candidateDigest(
            RehearsalSandboxEndpointCredentialResolverPlanIntakeUpstreamEchoVerificationSource sourceNodeV272
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("candidateVersion",
                        ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport
                                .NODE_V273_CANDIDATE_VERSION),
                ReleaseApprovalDigestSupport.line("candidateMode",
                        ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoSupport
                                .NODE_V273_CANDIDATE_MODE),
                ReleaseApprovalDigestSupport.line("sourceNodeV272Digest", sourceNodeV272.verificationDigest()),
                ReleaseApprovalDigestSupport.line("candidateReadyBoundaryCodes", candidateReadyBoundaryCodes()),
                ReleaseApprovalDigestSupport.line("approvalRequiredBoundaryCodes", approvalRequiredBoundaryCodes()),
                ReleaseApprovalDigestSupport.line("requestFields", 6),
                ReleaseApprovalDigestSupport.line("responseFields", 7),
                ReleaseApprovalDigestSupport.line("failureClasses", 6)
        ));
    }

    private static String sourceNodeV272Digest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt receipt
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("sourceVersion", "Node v272"),
                ReleaseApprovalDigestSupport.line("javaV112ReceiptVersion", receipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("javaV112ReceiptDigest", receipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("boundaryCodes", receipt.boundaryCodes()),
                ReleaseApprovalDigestSupport.line("requirementCodes", receipt.requirementCodes()),
                ReleaseApprovalDigestSupport.line("readyForNodeV272",
                        receipt.readyForNodeV272CredentialResolverPreImplementationPlanVerification())
        ));
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt
                    planIntakeEchoReceipt,
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateReviewSourceEcho sourceNodeV273,
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidate candidate,
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateChecks checks,
            List<RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryExplanation>
                    approvalRequiredBoundaryExplanations,
            RehearsalSandboxEndpointCredentialResolverDisabledImplementationCandidateSideEffectBoundary sideEffectBoundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourcePreImplementationPlanIntakeEchoReceiptVersion",
                        planIntakeEchoReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("consumedByNodeCredentialResolverDisabledImplementationCandidateReviewProfile",
                        OpsEvidenceService.NODE_V273_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_REVIEW_PROFILE),
                ReleaseApprovalDigestSupport.line("candidateEchoMode", CANDIDATE_ECHO_MODE),
                ReleaseApprovalDigestSupport.line("sourceNodeV273", sourceNodeV273),
                ReleaseApprovalDigestSupport.line("candidate", candidate),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("approvalRequiredBoundaryExplanations",
                        approvalRequiredBoundaryExplanations),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceNodeV273Echoed", "NODE_V273_DISABLED_CANDIDATE_NOT_READY"),
                readiness.warningIfMissing("sourceNodeV272UpstreamEchoed", "NODE_V272_PLAN_INTAKE_UPSTREAM_ECHO_NOT_READY"),
                readiness.warningIfMissing("disabledImplementationCandidateEchoed", "NODE_V273_DISABLED_CANDIDATE_INCOMPLETE"),
                readiness.warningIfMissing(
                        "approvalRequiredBoundaryExplanationsEchoed",
                        "JAVA_V115_APPROVAL_REQUIRED_BOUNDARY_EXPLANATIONS_INCOMPLETE"
                ),
                readiness.warningIfMissing("noCredentialBoundaryEchoed", "NODE_V273_CREDENTIAL_BOUNDARY_OPEN")
        );
    }
}
