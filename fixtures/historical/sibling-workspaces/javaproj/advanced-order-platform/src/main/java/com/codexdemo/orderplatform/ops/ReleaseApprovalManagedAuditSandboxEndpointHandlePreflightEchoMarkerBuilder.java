package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointHandlePreflightEchoMarkerBuilder {

    private static final String REVIEW_MODE = "sandbox-endpoint-handle-preflight-review-only";
    private static final String SOURCE_SPAN = "Node v257";
    private static final String ENDPOINT_HANDLE = "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE";
    private static final String CREDENTIAL_HANDLE = "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
    private static final String OWNER_APPROVAL_ARTIFACT_ID = "owner-approval-artifact-review-only";
    private static final String SCHEMA_REHEARSAL_ID = "schema-migration-rehearsal-review-only";
    private static final String OPERATOR_WINDOW_MARKER = "manual-sandbox-endpoint-window-review-only";
    private static final String NETWORK_ALLOWLIST_HANDLE =
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_NETWORK_ALLOWLIST_HANDLE";
    private static final String TLS_POLICY_HANDLE = "ORDEROPS_MANAGED_AUDIT_SANDBOX_TLS_POLICY_HANDLE";
    private static final String REDACTION_POLICY_HANDLE =
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_REDACTION_POLICY_HANDLE";
    private static final int REQUIRED_REVIEW_ITEM_COUNT = 7;
    private static final int COMPLETED_REVIEW_ITEM_COUNT = 7;
    private static final int FORBIDDEN_OPERATION_COUNT = 7;
    private static final int SOURCE_EVIDENCE_FILE_COUNT = 6;
    private static final int SOURCE_MATCHED_SNIPPET_COUNT = 33;

    private static final List<String> REQUIRED_REVIEW_ITEMS = List.of(
            "endpoint handle review",
            "credential handle review",
            "owner approval artifact review",
            "network allowlist review",
            "TLS policy review",
            "redaction policy review",
            "operator window review"
    );

    private static final List<String> FORBIDDEN_OPERATIONS = List.of(
            "read credential value",
            "parse raw endpoint URL",
            "send real managed audit request",
            "execute schema migration",
            "write approval ledger",
            "start Java or mini-kv",
            "promote mini-kv to managed audit storage backend"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "Java v104 sandbox endpoint handle preflight echo marker",
            "mini-kv v113 sandbox endpoint handle non-participation receipt"
    );

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxEndpointHandlePreflightEchoMarkerWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxEndpointHandlePreflightEchoMarkerDigest",
            "sandboxEndpointHandlePreflightRequiredReviewItemCount",
            "sandboxEndpointHandlePreflightCompletedReviewItemCount",
            "sandboxEndpointHandlePreflightForbiddenOperationCount",
            "sandboxEndpointHandlePreflightEndpointHandleOnly",
            "sandboxEndpointHandlePreflightCredentialHandleOnly",
            "sandboxEndpointHandlePreflightRawEndpointUrlParsed",
            "sandboxEndpointHandlePreflightRawEndpointUrlIncluded",
            "sandboxEndpointHandlePreflightCredentialValueRead",
            "sandboxEndpointHandlePreflightExternalRequestSent",
            "sandboxEndpointHandlePreflightSchemaMigrationExecuted",
            "sandboxEndpointHandlePreflightAutomaticUpstreamStart",
            "sandboxEndpointHandlePreflightConnectsManagedAudit",
            "sandboxEndpointHandlePreflightJavaStarted",
            "sandboxEndpointHandlePreflightMiniKvStarted"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.preflightReview.requiredReviewItemCount=7",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.preflightReview.completedReviewItemCount=7",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.preflightReview.endpointHandleOnly=true",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.preflightReview.credentialHandleOnly=true",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.networkAllowlistReview.rawHostIncluded=false",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.tlsPolicyReview.certificateMaterialIncluded=false",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.redactionPolicy.rawEndpointUrlRedacted=true",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.operatorWindow.windowOpen=false",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.sideEffectBoundary.rawEndpointUrlParsed=false",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.sideEffectBoundary.externalRequestSent=false",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.sideEffectBoundary.schemaMigrationExecuted=false",
            "managedAuditSandboxEndpointHandlePreflightEchoMarker.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointHandlePreflightEchoMarker.consumedByNodeSandboxEndpointHandlePreflightReviewProfile with Node v258",
            "Require managedAuditSandboxEndpointHandlePreflightEchoMarker.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification=true before Node v259",
            "Verify managedAuditSandboxEndpointHandlePreflightEchoMarker.preflightReview.endpointHandleOnly=true",
            "Verify managedAuditSandboxEndpointHandlePreflightEchoMarker.preflightReview.credentialHandleOnly=true",
            "Verify managedAuditSandboxEndpointHandlePreflightEchoMarker.networkAllowlistReview.rawHostIncluded=false",
            "Verify managedAuditSandboxEndpointHandlePreflightEchoMarker.tlsPolicyReview.certificateMaterialIncluded=false",
            "Verify managedAuditSandboxEndpointHandlePreflightEchoMarker.redactionPolicy.rawEndpointUrlRedacted=true",
            "Keep managedAuditSandboxEndpointHandlePreflightEchoMarker.sideEffectBoundary.rawEndpointUrlParsed=false",
            "Keep managedAuditSandboxEndpointHandlePreflightEchoMarker.sideEffectBoundary.credentialValueRead=false",
            "Keep managedAuditSandboxEndpointHandlePreflightEchoMarker.sideEffectBoundary.externalRequestSent=false"
    );

    ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxEndpointHandlePreflightEchoMarker
    build(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker
                    fakeTransportDryRunPacketEchoMarker
    ) {
        boolean sourceAccepted = sourceMarkerAccepted(fakeTransportDryRunPacketEchoMarker);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightSourceEcho sourceNodeV257 =
                sourceNodeV257(sourceAccepted);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightReviewShape
                preflightReview = preflightReview();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleNetworkAllowlistReview
                networkAllowlistReview = networkAllowlistReview();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleTlsPolicyReview
                tlsPolicyReview = tlsPolicyReview();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleRedactionPolicyReview
                redactionPolicy = redactionPolicy();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleOperatorWindowReview
                operatorWindow = operatorWindow();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightSideEffectBoundary
                sideEffectBoundary = sideEffectBoundary();

        List<String> markerWarnings = new ArrayList<>();
        if (!sourceAccepted) {
            markerWarnings.add("NODE_V259_SOURCE_FAKE_TRANSPORT_DRY_RUN_PACKET_ECHO_MARKER_NOT_READY");
        }

        boolean sourceNodeV257Echoed = sourceAccepted && sourceNodeV257Ready(sourceNodeV257);
        boolean endpointHandleReviewEchoed = endpointHandleReviewEchoed(preflightReview);
        boolean credentialHandleReviewEchoed = credentialHandleReviewEchoed(preflightReview);
        boolean ownerApprovalArtifactReviewEchoed = ownerApprovalArtifactReviewEchoed(preflightReview);
        boolean networkAllowlistReviewEchoed = networkAllowlistReviewEchoed(networkAllowlistReview);
        boolean tlsPolicyReviewEchoed = tlsPolicyReviewEchoed(tlsPolicyReview);
        boolean redactionPolicyEchoed = redactionPolicyEchoed(redactionPolicy);
        boolean operatorWindowReviewEchoed = operatorWindowReviewEchoed(operatorWindow);
        boolean sideEffectBoundaryEchoed = noCredentialConnectionWriteOrAutoStart(sideEffectBoundary);
        boolean readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification =
                sourceNodeV257Echoed
                        && endpointHandleReviewEchoed
                        && credentialHandleReviewEchoed
                        && ownerApprovalArtifactReviewEchoed
                        && networkAllowlistReviewEchoed
                        && tlsPolicyReviewEchoed
                        && redactionPolicyEchoed
                        && operatorWindowReviewEchoed
                        && sideEffectBoundaryEchoed;

        String markerDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "markerVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_ECHO_MARKER_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceFakeTransportDryRunPacketEchoMarkerVersion",
                        fakeTransportDryRunPacketEchoMarker.markerVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceFakeTransportDryRunPacketEchoMarkerSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_FAKE_TRANSPORT_DRY_RUN_PACKET_ECHO_MARKER_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeSandboxEndpointHandlePreflightReviewProfile",
                        OpsEvidenceService.NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("reviewMode", REVIEW_MODE),
                ReleaseApprovalDigestSupport.line("sourceSpan", SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("sourceNodeV257", sourceNodeV257),
                ReleaseApprovalDigestSupport.line("preflightReview", preflightReview),
                ReleaseApprovalDigestSupport.line("networkAllowlistReview", networkAllowlistReview),
                ReleaseApprovalDigestSupport.line("tlsPolicyReview", tlsPolicyReview),
                ReleaseApprovalDigestSupport.line("redactionPolicy", redactionPolicy),
                ReleaseApprovalDigestSupport.line("operatorWindow", operatorWindow),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification",
                        readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification
                )
        ));

        return new ReleaseApprovalRehearsalResponse
                .RehearsalManagedAuditSandboxEndpointHandlePreflightEchoMarker(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_ECHO_MARKER_VERSION,
                fakeTransportDryRunPacketEchoMarker.markerVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_FAKE_TRANSPORT_DRY_RUN_PACKET_ECHO_MARKER_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_VERSION,
                OpsEvidenceService.NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_PROFILE,
                OpsEvidenceService.NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_ENDPOINT,
                OpsEvidenceService.NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V258_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_REVIEW_STATE,
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_ENDPOINT,
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_STATE,
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                REVIEW_MODE,
                SOURCE_SPAN,
                sourceNodeV257,
                preflightReview,
                networkAllowlistReview,
                tlsPolicyReview,
                redactionPolicy,
                operatorWindow,
                sideEffectBoundary,
                sourceNodeV257Echoed,
                endpointHandleReviewEchoed,
                credentialHandleReviewEchoed,
                ownerApprovalArtifactReviewEchoed,
                networkAllowlistReviewEchoed,
                tlsPolicyReviewEchoed,
                redactionPolicyEchoed,
                operatorWindowReviewEchoed,
                sideEffectBoundaryEchoed,
                readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification,
                false,
                false,
                false,
                false,
                markerDigest,
                REQUIRED_REVIEW_ITEMS,
                FORBIDDEN_OPERATIONS,
                NEXT_REQUIRED_ECHO_VERSIONS,
                List.copyOf(markerWarnings),
                NODE_VERIFICATION_ACTIONS
        );
    }

    List<String> warningDigestWarningInputNames() {
        return WARNING_DIGEST_WARNING_INPUT_NAMES;
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
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointHandlePreflightEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxEndpointHandlePreflightEchoMarkerWarnings",
                        marker.markerWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointHandlePreflightEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightEchoMarkerDigest",
                        marker.markerDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightRequiredReviewItemCount",
                        marker.preflightReview().requiredReviewItemCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightCompletedReviewItemCount",
                        marker.preflightReview().completedReviewItemCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightForbiddenOperationCount",
                        marker.preflightReview().forbiddenOperationCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightEndpointHandleOnly",
                        marker.preflightReview().endpointHandleOnly()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightCredentialHandleOnly",
                        marker.preflightReview().credentialHandleOnly()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightRawEndpointUrlParsed",
                        marker.sideEffectBoundary().rawEndpointUrlParsed()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightRawEndpointUrlIncluded",
                        marker.sideEffectBoundary().rawEndpointUrlIncluded()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightCredentialValueRead",
                        marker.sideEffectBoundary().credentialValueRead()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightExternalRequestSent",
                        marker.sideEffectBoundary().externalRequestSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightSchemaMigrationExecuted",
                        marker.sideEffectBoundary().schemaMigrationExecuted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightAutomaticUpstreamStart",
                        marker.sideEffectBoundary().automaticUpstreamStart()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightConnectsManagedAudit",
                        marker.sideEffectBoundary().connectsManagedAudit()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightJavaStarted",
                        marker.sideEffectBoundary().javaStarted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointHandlePreflightMiniKvStarted",
                        marker.sideEffectBoundary().miniKvStarted()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointHandlePreflightEchoMarker marker
    ) {
        return endpointHandleReviewEchoed(marker.preflightReview())
                && credentialHandleReviewEchoed(marker.preflightReview())
                && ownerApprovalArtifactReviewEchoed(marker.preflightReview())
                && networkAllowlistReviewEchoed(marker.networkAllowlistReview())
                && tlsPolicyReviewEchoed(marker.tlsPolicyReview())
                && redactionPolicyEchoed(marker.redactionPolicy())
                && operatorWindowReviewEchoed(marker.operatorWindow())
                && noCredentialConnectionWriteOrAutoStart(marker.sideEffectBoundary())
                && !marker.readyForManagedAuditSandboxAdapterConnection()
                && !marker.readyForProductionAudit()
                && !marker.readyForProductionWindow()
                && !marker.nodeMayTreatAsProductionAuditRecord();
    }

    private static boolean sourceMarkerAccepted(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker marker
    ) {
        return marker.readyForNodeV257FakeTransportPacketUpstreamEchoVerification()
                && marker.markerWarnings().isEmpty()
                && marker.requestShapeEchoed()
                && marker.responseShapeEchoed()
                && marker.timeoutBoundaryEchoed()
                && marker.failureMappingEchoed()
                && marker.cleanupBoundaryEchoed()
                && marker.sideEffectBoundaryEchoed()
                && !marker.readyForManagedAuditSandboxAdapterConnection();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightSourceEcho
    sourceNodeV257(boolean readyForNodeV258PreflightReview) {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightSourceEcho(
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_STATE,
                true,
                true,
                true,
                true,
                true,
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
                SOURCE_EVIDENCE_FILE_COUNT,
                SOURCE_MATCHED_SNIPPET_COUNT,
                readyForNodeV258PreflightReview
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightReviewShape
    preflightReview() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightReviewShape(
                REVIEW_MODE,
                SOURCE_SPAN,
                ENDPOINT_HANDLE,
                CREDENTIAL_HANDLE,
                OWNER_APPROVAL_ARTIFACT_ID,
                SCHEMA_REHEARSAL_ID,
                OPERATOR_WINDOW_MARKER,
                true,
                true,
                true,
                REQUIRED_REVIEW_ITEM_COUNT,
                COMPLETED_REVIEW_ITEM_COUNT,
                FORBIDDEN_OPERATION_COUNT,
                true,
                true,
                true
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleNetworkAllowlistReview
    networkAllowlistReview() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleNetworkAllowlistReview(
                true,
                NETWORK_ALLOWLIST_HANDLE,
                false,
                false,
                true
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleTlsPolicyReview
    tlsPolicyReview() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleTlsPolicyReview(
                true,
                TLS_POLICY_HANDLE,
                false,
                false,
                true
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleRedactionPolicyReview
    redactionPolicy() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleRedactionPolicyReview(
                true,
                REDACTION_POLICY_HANDLE,
                true,
                true,
                true,
                true
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleOperatorWindowReview
    operatorWindow() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleOperatorWindowReview(
                true,
                false,
                true,
                true,
                true,
                true
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightSideEffectBoundary
    sideEffectBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightSideEffectBoundary(
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
                false
        );
    }

    private static boolean sourceNodeV257Ready(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightSourceEcho source
    ) {
        return OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_VERSION
                .equals(source.sourceVersion())
                && OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_PROFILE
                .equals(source.profileVersion())
                && OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_STATE
                .equals(source.verificationState())
                && source.readyForUpstreamEchoVerification()
                && source.requestShapeAligned()
                && source.responseShapeAligned()
                && source.timeoutBoundaryAligned()
                && source.failureMappingAligned()
                && source.cleanupBoundaryAligned()
                && source.archiveNoRerunAligned()
                && source.credentialBoundaryAligned()
                && source.connectionBoundaryAligned()
                && source.writeBoundaryAligned()
                && source.autoStartBoundaryAligned()
                && source.upstreamActionsStillDisabled()
                && !source.readyForManagedAuditSandboxAdapterConnection()
                && !source.connectsManagedAudit()
                && !source.readsManagedAuditCredential()
                && !source.storesManagedAuditCredential()
                && !source.schemaMigrationExecuted()
                && !source.automaticUpstreamStart()
                && source.evidenceFileCount() == SOURCE_EVIDENCE_FILE_COUNT
                && source.matchedSnippetCount() == SOURCE_MATCHED_SNIPPET_COUNT
                && source.readyForNodeV258PreflightReview();
    }

    private static boolean endpointHandleReviewEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightReviewShape review
    ) {
        return ENDPOINT_HANDLE.equals(review.endpointHandle())
                && review.endpointHandleReviewed()
                && review.endpointHandleOnly()
                && review.readOnlyPreflightReview();
    }

    private static boolean credentialHandleReviewEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightReviewShape review
    ) {
        return CREDENTIAL_HANDLE.equals(review.credentialHandle())
                && review.credentialHandleReviewed()
                && review.credentialHandleOnly()
                && review.readOnlyPreflightReview();
    }

    private static boolean ownerApprovalArtifactReviewEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightReviewShape review
    ) {
        return REVIEW_MODE.equals(review.reviewMode())
                && SOURCE_SPAN.equals(review.sourceSpan())
                && OWNER_APPROVAL_ARTIFACT_ID.equals(review.ownerApprovalArtifactId())
                && SCHEMA_REHEARSAL_ID.equals(review.schemaRehearsalId())
                && OPERATOR_WINDOW_MARKER.equals(review.operatorWindowMarker())
                && review.ownerApprovalArtifactReviewed()
                && review.requiredReviewItemCount() == REQUIRED_REVIEW_ITEM_COUNT
                && review.completedReviewItemCount() == COMPLETED_REVIEW_ITEM_COUNT
                && review.forbiddenOperationCount() == FORBIDDEN_OPERATION_COUNT;
    }

    private static boolean networkAllowlistReviewEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleNetworkAllowlistReview review
    ) {
        return review.reviewRequired()
                && NETWORK_ALLOWLIST_HANDLE.equals(review.allowlistHandle())
                && !review.rawHostIncluded()
                && !review.cidrIncluded()
                && review.reviewed();
    }

    private static boolean tlsPolicyReviewEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleTlsPolicyReview review
    ) {
        return review.reviewRequired()
                && TLS_POLICY_HANDLE.equals(review.policyHandle())
                && !review.certificateMaterialIncluded()
                && !review.privateKeyIncluded()
                && review.reviewed();
    }

    private static boolean redactionPolicyEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleRedactionPolicyReview review
    ) {
        return review.reviewRequired()
                && REDACTION_POLICY_HANDLE.equals(review.policyHandle())
                && review.credentialValueRedacted()
                && review.rawEndpointUrlRedacted()
                && review.payloadSecretRedacted()
                && review.reviewed();
    }

    private static boolean operatorWindowReviewEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandleOperatorWindowReview review
    ) {
        return review.manualWindowRequired()
                && !review.windowOpen()
                && review.executionBlockedUntilWindowOpen()
                && review.operatorIdentityRequired()
                && review.approvalCorrelationRequired()
                && review.reviewed();
    }

    private static boolean noCredentialConnectionWriteOrAutoStart(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointHandlePreflightSideEffectBoundary boundary
    ) {
        return !boundary.rawEndpointUrlParsed()
                && !boundary.rawEndpointUrlIncluded()
                && !boundary.credentialValueRead()
                && !boundary.externalRequestSent()
                && !boundary.schemaMigrationExecuted()
                && !boundary.automaticUpstreamStart()
                && !boundary.connectsManagedAudit()
                && !boundary.readsManagedAuditCredential()
                && !boundary.storesManagedAuditCredential()
                && !boundary.executionAllowed()
                && !boundary.approvalLedgerWritten()
                && !boundary.javaStarted()
                && !boundary.miniKvStarted()
                && !boundary.externalAuditServiceStarted()
                && !boundary.productionAuditAllowed()
                && !boundary.productionWindowAllowed();
    }
}
