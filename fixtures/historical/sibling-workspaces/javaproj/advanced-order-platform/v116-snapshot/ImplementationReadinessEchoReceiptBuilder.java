package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryLines;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.NODE_V275_PROFILE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.NODE_V275_SOURCE_SPAN;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.NODE_V275_VERIFICATION_STATE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.SOURCE_CHECK_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.SOURCE_PASSED_CHECK_COUNT;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.IMPLEMENTATION_READINESS_ECHO_MODE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.SOURCE_SPAN;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.boundaryCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.boundaryReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.boundaryReadinessComplete;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.checks;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.readinessReview;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.requirementCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.requiredArtifactIds;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.sideEffectBoundary;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.sideEffectBoundaryBlocked;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.sourceNodeV281;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.sourceNodeV281Ready;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.summary;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationSource;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationBoundaryReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReview;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReviewSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSummary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt;

import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptBuilder {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = ReleaseApprovalEchoMarkerSupport
            .boundaryInputNames(
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReviewState",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSourceReady",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessBoundaryCount",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessRequiredArtifactCount",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReadyBoundaryCount",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessBlockedBoundaryCount",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessCredentialValueRead",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessExternalRequestSent",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSecretProviderInstantiated",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessResolverClientInstantiated",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessConnectsManagedAudit",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSqlExecuted",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessAutomaticUpstreamStart"
            );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sourceNodeV281.reviewState=credential-resolver-approval-required-implementation-readiness-review-ready",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.size=6",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.requiredArtifactIds.size=18",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readinessReview.allApprovalRequiredBoundariesEchoReady=true",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readinessReview.allApprovalRequiredBoundariesImplementationBlocked=true",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.sqlExecuted=false",
            "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readyForManagedAuditResolverImplementation=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.consumedByNodeCredentialResolverApprovalRequiredImplementationReadinessReviewProfile with Node v281",
            "Require managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readyForNodeV282CredentialResolverApprovalRequiredImplementationReadinessVerification=true before Node v282",
            "Verify managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.size=6",
            "Verify managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.requiredArtifactIds.size=18",
            "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.readyForRuntimeImplementation=false",
            "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
            "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.sqlExecuted=false",
            "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.automaticUpstreamStart=false"
    );

    private static final List<String> NODE_WARNING_CODES = List.of(
            "IMPLEMENTATION_STILL_BLOCKED",
            "JAVA_V116_ECHO_ONLY"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "RUN_PARALLEL_JAVA_V116_MINI_KV_V122",
            "VERIFY_WITH_NODE_V282_BEFORE_IMPLEMENTATION_DRAFT"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "mini-kv v122 approval-required implementation non-participation readiness receipt",
            "Node v282 approval-required implementation readiness upstream echo verification"
    );

    RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt
                    disabledImplementationCandidateEchoReceipt
    ) {
        RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationSource sourceNodeV275 =
                sourceNodeV275(disabledImplementationCandidateEchoReceipt);
        List<RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationBoundaryReadiness>
                boundaryReadiness = boundaryReadiness();
        RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessChecks checks =
                checks(sourceNodeV275Ready(sourceNodeV275), boundaryReadiness);
        RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSummary summary =
                summary(boundaryReadiness);
        RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReviewSourceEcho sourceNodeV281 =
                sourceNodeV281(summary);
        RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReview readinessReview =
                readinessReview(disabledImplementationCandidateEchoReceipt, boundaryReadiness, checks);
        RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSideEffectBoundary
                sideEffectBoundary = sideEffectBoundary();
        EchoWorkflowReadiness readiness = readiness(
                sourceNodeV281,
                sourceNodeV275,
                readinessReview,
                boundaryReadiness,
                checks,
                sideEffectBoundary
        );
        List<String> receiptWarnings = receiptWarnings(readiness);
        List<String> requiredArtifactIds = requiredArtifactIds(boundaryReadiness);
        String receiptDigest = receiptDigest(
                disabledImplementationCandidateEchoReceipt,
                sourceNodeV281,
                sourceNodeV275,
                readinessReview,
                boundaryReadiness,
                checks,
                sideEffectBoundary,
                readiness
        );

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_IMPLEMENTATION_READINESS_ECHO_RECEIPT_VERSION,
                disabledImplementationCandidateEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_IMPLEMENTATION_CANDIDATE_ECHO_RECEIPT_SCHEMA_VERSION,
                disabledImplementationCandidateEchoReceipt.receiptDigest(),
                OpsEvidenceService
                        .NODE_V281_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_IMPLEMENTATION_READINESS_REVIEW_VERSION,
                OpsEvidenceService
                        .NODE_V281_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_IMPLEMENTATION_READINESS_REVIEW_PROFILE,
                OpsEvidenceService
                        .NODE_V281_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_IMPLEMENTATION_READINESS_REVIEW_ENDPOINT,
                OpsEvidenceService
                        .NODE_V281_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_IMPLEMENTATION_READINESS_REVIEW_MARKDOWN_ENDPOINT,
                OpsEvidenceService
                        .NODE_V281_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_IMPLEMENTATION_READINESS_REVIEW_STATE,
                OpsEvidenceService
                        .NODE_V275_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_BOUNDARY_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V275_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_BOUNDARY_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService
                        .NODE_V275_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_BOUNDARY_UPSTREAM_ECHO_VERIFICATION_STATE,
                true,
                IMPLEMENTATION_READINESS_ECHO_MODE,
                SOURCE_SPAN,
                sourceNodeV281,
                sourceNodeV275,
                readinessReview,
                boundaryReadiness,
                checks,
                sideEffectBoundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV281Echoed"),
                readiness.ready("sourceNodeV275Echoed"),
                readiness.ready("readinessReviewEchoed"),
                readiness.ready("boundaryReadinessEchoed"),
                readiness.ready("requiredArtifactsEchoed"),
                readiness.ready("javaV116EchoHintsEchoed"),
                readiness.ready("noCredentialBoundaryEchoed"),
                readiness.ready("noRawEndpointBoundaryEchoed"),
                readiness.ready("noResolverRuntimeBoundaryEchoed"),
                readiness.ready("noConnectionBoundaryEchoed"),
                readiness.ready("noWriteBoundaryEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                true,
                readiness.allReady(),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview(),
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                boundaryCodes(),
                requirementCodes(),
                requiredArtifactIds,
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt
                    receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt
                    receipt
    ) {
        return boundaryLines(
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReviewState",
                        receipt.sourceNodeV281().reviewState()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSourceReady",
                        receipt.sourceNodeV281Echoed()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessBoundaryCount",
                        receipt.boundaryReadiness().size()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessRequiredArtifactCount",
                        receipt.requiredArtifactIds().size()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReadyBoundaryCount",
                        receipt.sourceNodeV281().summary().echoReadyBoundaryCount()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessBlockedBoundaryCount",
                        receipt.sourceNodeV281().summary().blockedForImplementationBoundaryCount()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessExternalRequestSent",
                        receipt.sideEffectBoundary().externalRequestSent()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSecretProviderInstantiated",
                        receipt.sideEffectBoundary().secretProviderInstantiated()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessResolverClientInstantiated",
                        receipt.sideEffectBoundary().resolverClientInstantiated()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessConnectsManagedAudit",
                        receipt.sideEffectBoundary().connectsManagedAudit()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()
                ),
                boundaryInput(
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt
                    receipt
    ) {
        return sourceNodeV281Ready(receipt.sourceNodeV281())
                && sourceNodeV275Ready(receipt.sourceNodeV275())
                && boundaryReadinessComplete(receipt.boundaryReadiness())
                && sideEffectBoundaryBlocked(receipt.sideEffectBoundary())
                && receipt.sourceNodeV281Echoed()
                && receipt.sourceNodeV275Echoed()
                && receipt.readinessReviewEchoed()
                && receipt.boundaryReadinessEchoed()
                && receipt.requiredArtifactsEchoed()
                && receipt.javaV116EchoHintsEchoed()
                && receipt.noCredentialBoundaryEchoed()
                && receipt.noRawEndpointBoundaryEchoed()
                && receipt.noResolverRuntimeBoundaryEchoed()
                && receipt.noConnectionBoundaryEchoed()
                && receipt.noWriteBoundaryEchoed()
                && receipt.noAutoStartBoundaryEchoed()
                && receipt.echoWorkflowTemplateApplied()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !receipt.readyForManagedAuditSandboxAdapterConnection()
                && !receipt.readyForProductionAudit()
                && !receipt.readyForProductionWindow()
                && !receipt.nodeMayTreatAsProductionAuditRecord();
    }

    private static RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationSource
    sourceNodeV275(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt
                    sourceReceipt
    ) {
        return new RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationSource(
                "Node v275",
                NODE_V275_PROFILE,
                NODE_V275_VERIFICATION_STATE,
                true,
                sourceNodeV275Digest(sourceReceipt),
                NODE_V275_SOURCE_SPAN,
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                sourceReceipt.approvalRequiredBoundaryCodes().size(),
                sourceReceipt.approvalRequiredBoundaryCodes(),
                requirementCodes(),
                true,
                sourceReceipt.approvalRequiredBoundaryExplanationsEchoed(),
                true,
                true,
                true,
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
                false
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReviewSourceEcho
                    sourceNodeV281,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationSource
                    sourceNodeV275,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReview readinessReview,
            List<RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationBoundaryReadiness>
                    boundaryReadiness,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessChecks checks,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSideEffectBoundary
                    sideEffectBoundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV281Echoed", sourceNodeV281Ready(sourceNodeV281)),
                workflowStep("sourceNodeV275Echoed", sourceNodeV275Ready(sourceNodeV275)),
                workflowStep("readinessReviewEchoed", readinessReview.allApprovalRequiredBoundariesEchoReady()
                        && readinessReview.allApprovalRequiredBoundariesImplementationBlocked()
                        && readinessReview.allRequiredArtifactsNamed()
                        && readinessReview.nodeV282VerificationRequired()),
                workflowStep("boundaryReadinessEchoed", boundaryReadinessComplete(boundaryReadiness)),
                workflowStep("requiredArtifactsEchoed",
                        requiredArtifactIds(boundaryReadiness).size()
                                == ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.REQUIRED_ARTIFACT_COUNT),
                workflowStep("javaV116EchoHintsEchoed", checks.allBoundariesEchoReadyForJavaV116()),
                workflowStep("noCredentialBoundaryEchoed", !sideEffectBoundary.credentialValueRead()
                        && !sideEffectBoundary.readsManagedAuditCredential()
                        && !sideEffectBoundary.storesManagedAuditCredential()),
                workflowStep("noRawEndpointBoundaryEchoed", !sideEffectBoundary.rawEndpointUrlParsed()
                        && !sideEffectBoundary.rawEndpointUrlIncluded()),
                workflowStep("noResolverRuntimeBoundaryEchoed", !sideEffectBoundary.resolverClientInstantiated()
                        && !sideEffectBoundary.secretProviderInstantiated()
                        && !sideEffectBoundary.realResolverImplementationAllowed()),
                workflowStep("noConnectionBoundaryEchoed", !sideEffectBoundary.connectsManagedAudit()
                        && !sideEffectBoundary.externalRequestSent()),
                workflowStep("noWriteBoundaryEchoed", !sideEffectBoundary.approvalLedgerWritten()
                        && !sideEffectBoundary.managedAuditStoreWritten()
                        && !sideEffectBoundary.sqlExecuted()
                        && !sideEffectBoundary.schemaMigrationExecuted()
                        && !sideEffectBoundary.rollbackExecuted()),
                workflowStep("noAutoStartBoundaryEchoed", !sideEffectBoundary.automaticUpstreamStart()
                        && !sideEffectBoundary.javaStartedNodeOrMiniKv())
        );
    }

    private static boolean sourceNodeV275Ready(
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationSource source
    ) {
        return "Node v275".equals(source.sourceVersion())
                && NODE_V275_PROFILE.equals(source.profileVersion())
                && NODE_V275_VERIFICATION_STATE.equals(source.verificationState())
                && source.readyForApprovalRequiredBoundaryUpstreamEchoVerification()
                && NODE_V275_SOURCE_SPAN.equals(source.sourceSpan())
                && source.sourceCheckCount() == SOURCE_CHECK_COUNT
                && source.sourcePassedCheckCount() == SOURCE_PASSED_CHECK_COUNT
                && source.approvalRequiredBoundaryCount() == boundaryCodes().size()
                && source.approvalRequiredBoundaryCodes().equals(boundaryCodes())
                && source.approvalRequiredRequirementCodes().equals(requirementCodes())
                && source.approvalRequiredBoundaryScopeAligned()
                && source.approvalRequiredExplanationsAligned()
                && source.prohibitedRuntimeActionsAligned()
                && source.credentialBoundaryAligned()
                && source.rawEndpointBoundaryAligned()
                && source.resolverBoundaryAligned()
                && source.connectionBoundaryAligned()
                && source.writeBoundaryAligned()
                && source.autoStartBoundaryAligned()
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
                && !source.automaticUpstreamStart();
    }

    private static String sourceNodeV275Digest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt sourceReceipt
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("sourceVersion", "Node v275"),
                ReleaseApprovalDigestSupport.line("javaV115ReceiptVersion", sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("javaV115ReceiptDigest", sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("approvalRequiredBoundaryCodes",
                        sourceReceipt.approvalRequiredBoundaryCodes()),
                ReleaseApprovalDigestSupport.line("approvalRequiredBoundaryExplanations",
                        sourceReceipt.approvalRequiredBoundaryExplanations()),
                ReleaseApprovalDigestSupport.line("readyForNodeV274",
                        sourceReceipt.readyForNodeV274CredentialResolverDisabledCandidateVerification())
        ));
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt
                    sourceReceipt,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReviewSourceEcho
                    sourceNodeV281,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationSource
                    sourceNodeV275,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessReview readinessReview,
            List<RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationBoundaryReadiness>
                    boundaryReadiness,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessChecks checks,
            RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessSideEffectBoundary
                    sideEffectBoundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_IMPLEMENTATION_READINESS_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceDisabledImplementationCandidateEchoReceiptVersion",
                        sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceDisabledImplementationCandidateEchoReceiptDigest",
                        sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("implementationReadinessEchoMode",
                        IMPLEMENTATION_READINESS_ECHO_MODE),
                ReleaseApprovalDigestSupport.line("sourceNodeV281", sourceNodeV281),
                ReleaseApprovalDigestSupport.line("sourceNodeV275", sourceNodeV275),
                ReleaseApprovalDigestSupport.line("readinessReview", readinessReview),
                ReleaseApprovalDigestSupport.line("boundaryReadiness", boundaryReadiness),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceNodeV281Echoed", "NODE_V281_IMPLEMENTATION_READINESS_NOT_READY"),
                readiness.warningIfMissing("sourceNodeV275Echoed", "NODE_V275_APPROVAL_REQUIRED_ECHO_NOT_READY"),
                readiness.warningIfMissing("boundaryReadinessEchoed", "JAVA_V116_BOUNDARY_READINESS_INCOMPLETE"),
                readiness.warningIfMissing("requiredArtifactsEchoed", "JAVA_V116_REQUIRED_ARTIFACTS_INCOMPLETE"),
                readiness.warningIfMissing("noWriteBoundaryEchoed", "JAVA_V116_WRITE_BOUNDARY_OPEN")
        );
    }
}
