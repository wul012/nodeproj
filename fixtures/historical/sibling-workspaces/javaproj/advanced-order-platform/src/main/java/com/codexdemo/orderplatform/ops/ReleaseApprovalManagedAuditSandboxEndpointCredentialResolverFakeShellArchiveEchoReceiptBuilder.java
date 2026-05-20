package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.ARCHIVE_ECHO_MODE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.SOURCE_SPAN;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.archiveChecks;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.archiveChecksReadOnly;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.archiveEvidence;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.archiveEvidenceReady;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.archiveRoots;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.archiveVerification;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.archiveVerificationReady;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.evidenceFileIds;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.requiredSnippetIds;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.sideEffectBoundary;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.sideEffectBoundaryBlocked;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.sourceNodeV266;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.sourceReady;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.sourceVersions;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker;

import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceiptBuilder {

    private static final List<String> NODE_WARNING_CODES = List.of(
            "ARCHIVE_VERIFICATION_ONLY"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "WRITE_POST_V266_PLAN",
            "KEEP_REAL_RESOLVER_OUT_OF_SCOPE"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "Java v110 credential resolver fake-shell archive echo receipt",
            "mini-kv v117 credential resolver fake-shell archive non-participation receipt"
    );

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxEndpointCredentialResolverFakeShellArchiveEchoReceiptDigest",
            "sandboxEndpointCredentialResolverFakeShellArchiveCheckCount",
            "sandboxEndpointCredentialResolverFakeShellArchivePassedCheckCount",
            "sandboxEndpointCredentialResolverFakeShellArchiveFileCount",
            "sandboxEndpointCredentialResolverFakeShellArchiveRequiredSnippetCount",
            "sandboxEndpointCredentialResolverFakeShellArchiveMatchedSnippetCount",
            "sandboxEndpointCredentialResolverFakeShellArchiveRerunsFakeShellBehavior",
            "sandboxEndpointCredentialResolverFakeShellArchiveReadsFilesOnly",
            "sandboxEndpointCredentialResolverFakeShellArchiveRouteResponsesVerified",
            "sandboxEndpointCredentialResolverFakeShellArchiveCredentialValueRead",
            "sandboxEndpointCredentialResolverFakeShellArchiveRawEndpointUrlParsed",
            "sandboxEndpointCredentialResolverFakeShellArchiveExternalRequestSent",
            "sandboxEndpointCredentialResolverFakeShellArchiveSecretProviderInstantiated",
            "sandboxEndpointCredentialResolverFakeShellArchiveResolverClientInstantiated",
            "sandboxEndpointCredentialResolverFakeShellArchiveConnectsManagedAudit",
            "sandboxEndpointCredentialResolverFakeShellArchiveApprovalLedgerWritten",
            "sandboxEndpointCredentialResolverFakeShellArchiveSqlExecuted",
            "sandboxEndpointCredentialResolverFakeShellArchiveSchemaMigrationExecuted",
            "sandboxEndpointCredentialResolverFakeShellArchiveAutomaticUpstreamStart"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sourceNodeV266.checkCount=28",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveEvidence.archiveFileCount=9",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveEvidence.requiredSnippetCount=24",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveEvidence.matchedSnippetCount=24",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveVerification.archiveVerificationReadsFilesOnly=true",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveVerification.archiveVerificationRerunsFakeShellBehavior=false",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveChecks.sourceNodeV265ConsumesUpstreamEchoes=true",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.externalRequestSent=false",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.consumedByNodeSandboxEndpointCredentialResolverFakeShellArchiveVerificationProfile with Node v266",
            "Require managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.readyForNodeV267SandboxEndpointCredentialResolverFakeShellArchiveUpstreamEchoVerification=true before Node v267",
            "Verify managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveEvidence.archiveFileCount=9",
            "Verify managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveEvidence.requiredSnippetCount=24",
            "Verify managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveEvidence.matchedSnippetCount=24",
            "Keep managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.archiveVerification.archiveVerificationRerunsFakeShellBehavior=false",
            "Keep managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.externalRequestSent=false",
            "Keep managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.secretProviderInstantiated=false",
            "Keep managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.resolverClientInstantiated=false",
            "Keep managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
            "Keep managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false"
    );

    RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker testOnlyShellMarker
    ) {
        SourceGate sourceGate = SourceGate.from(testOnlyShellMarker);
        RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho sourceNodeV266 =
                sourceNodeV266(sourceGate.sourceAccepted());
        RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence archiveEvidence =
                archiveEvidence();
        RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification archiveVerification =
                archiveVerification();
        RehearsalSandboxEndpointCredentialResolverFakeShellArchiveChecks archiveChecks =
                archiveChecks(sourceNodeV266, archiveEvidence, archiveVerification);
        RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        EchoReadiness readiness = EchoReadiness.from(
                sourceNodeV266,
                archiveEvidence,
                archiveVerification,
                archiveChecks,
                sideEffectBoundary
        );
        List<String> receiptWarnings = receiptWarnings(readiness);

        String receiptDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_ECHO_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceTestOnlyShellEchoMarkerVersion",
                        testOnlyShellMarker.markerVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceTestOnlyShellEchoMarkerSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_ECHO_MARKER_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeSandboxEndpointCredentialResolverFakeShellArchiveVerificationProfile",
                        OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("archiveEchoMode", ARCHIVE_ECHO_MODE),
                ReleaseApprovalDigestSupport.line("sourceSpan", SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("sourceNodeV266", sourceNodeV266),
                ReleaseApprovalDigestSupport.line("archiveEvidence", archiveEvidence),
                ReleaseApprovalDigestSupport.line("archiveVerification", archiveVerification),
                ReleaseApprovalDigestSupport.line("archiveChecks", archiveChecks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV267SandboxEndpointCredentialResolverFakeShellArchiveUpstreamEchoVerification",
                        readiness.readyForNodeV267()
                )
        ));

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_ECHO_RECEIPT_VERSION,
                testOnlyShellMarker.markerVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_ECHO_MARKER_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_ENDPOINT,
                OpsEvidenceService
                        .NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_STATE,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_VERSION,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_PROFILE,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_STATE,
                OpsEvidenceService
                        .NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService
                        .NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_STATE,
                OpsEvidenceService
                        .NODE_V267_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V267_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                ARCHIVE_ECHO_MODE,
                SOURCE_SPAN,
                sourceNodeV266,
                archiveEvidence,
                archiveVerification,
                archiveChecks,
                sideEffectBoundary,
                readiness.sourceNodeV266Echoed(),
                readiness.sourceNodeV264ContractEchoed(),
                readiness.sourceNodeV265UpstreamEchoed(),
                readiness.archiveEvidenceEchoed(),
                readiness.archiveSnippetsEchoed(),
                readiness.routeResponsesEchoed(),
                readiness.readOnlyArchiveBoundaryEchoed(),
                readiness.noFakeShellRerunEchoed(),
                readiness.sideEffectBoundaryEchoed(),
                readiness.upstreamActionsStillDisabledEchoed(),
                readiness.readyForNodeV267(),
                false,
                false,
                false,
                false,
                receiptDigest,
                archiveRoots(),
                sourceVersions(),
                evidenceFileIds(),
                requiredSnippetIds(),
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(
                WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings()
        );
    }

    List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveCheckCount",
                        receipt.sourceNodeV266().checkCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchivePassedCheckCount",
                        receipt.sourceNodeV266().passedCheckCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveFileCount",
                        receipt.archiveEvidence().archiveFileCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveRequiredSnippetCount",
                        receipt.archiveEvidence().requiredSnippetCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveMatchedSnippetCount",
                        receipt.archiveEvidence().matchedSnippetCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveRerunsFakeShellBehavior",
                        receipt.archiveVerification().archiveVerificationRerunsFakeShellBehavior()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveReadsFilesOnly",
                        receipt.archiveVerification().archiveVerificationReadsFilesOnly()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveRouteResponsesVerified",
                        receipt.archiveChecks().routeResponsesVerified()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveExternalRequestSent",
                        receipt.sideEffectBoundary().externalRequestSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveSecretProviderInstantiated",
                        receipt.sideEffectBoundary().secretProviderInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveResolverClientInstantiated",
                        receipt.sideEffectBoundary().resolverClientInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveConnectsManagedAudit",
                        receipt.sideEffectBoundary().connectsManagedAudit()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverFakeShellArchiveAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt receipt
    ) {
        return archiveEvidenceReady(receipt.archiveEvidence())
                && archiveVerificationReady(receipt.archiveVerification())
                && archiveChecksReadOnly(receipt.archiveChecks())
                && sideEffectBoundaryBlocked(receipt.sideEffectBoundary())
                && !receipt.readyForManagedAuditSandboxAdapterConnection()
                && !receipt.readyForProductionAudit()
                && !receipt.readyForProductionWindow()
                && !receipt.nodeMayTreatAsProductionAuditRecord();
    }

    private static List<String> receiptWarnings(EchoReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.sourceNodeV266Echoed(),
                        "NODE_V266_FAKE_SHELL_ARCHIVE_VERIFICATION_NOT_READY"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.archiveEvidenceEchoed() || !readiness.archiveSnippetsEchoed(),
                        "NODE_V266_FAKE_SHELL_ARCHIVE_EVIDENCE_MISMATCH"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.sideEffectBoundaryEchoed(),
                        "NODE_V266_FAKE_SHELL_ARCHIVE_SIDE_EFFECT_BOUNDARY_OPEN"
                )
        );
    }

    private record SourceGate(boolean sourceAccepted) {

        static SourceGate from(
                RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker marker
        ) {
            return new SourceGate(
                    marker.readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification()
                            && marker.markerWarnings().isEmpty()
                            && marker.sourceNodeV263Echoed()
                            && marker.requestShapeEchoed()
                            && marker.responseShapeEchoed()
                            && marker.failureMappingEchoed()
                            && marker.guardConditionsEchoed()
                            && marker.fakeResolverProbeEchoed()
                            && marker.fakeResolverOnlyEchoed()
                            && marker.handleOnlyRequestEchoed()
                            && marker.sideEffectBoundaryEchoed()
                            && marker.upstreamActionsStillDisabledEchoed()
                            && !marker.readyForManagedAuditSandboxAdapterConnection()
                            && !marker.readyForProductionAudit()
                            && !marker.readyForProductionWindow()
                            && !marker.nodeMayTreatAsProductionAuditRecord()
            );
        }
    }

    private record EchoReadiness(
            boolean sourceNodeV266Echoed,
            boolean sourceNodeV264ContractEchoed,
            boolean sourceNodeV265UpstreamEchoed,
            boolean archiveEvidenceEchoed,
            boolean archiveSnippetsEchoed,
            boolean routeResponsesEchoed,
            boolean readOnlyArchiveBoundaryEchoed,
            boolean noFakeShellRerunEchoed,
            boolean sideEffectBoundaryEchoed,
            boolean upstreamActionsStillDisabledEchoed
    ) {

        boolean readyForNodeV267() {
            return sourceNodeV266Echoed
                    && sourceNodeV264ContractEchoed
                    && sourceNodeV265UpstreamEchoed
                    && archiveEvidenceEchoed
                    && archiveSnippetsEchoed
                    && routeResponsesEchoed
                    && readOnlyArchiveBoundaryEchoed
                    && noFakeShellRerunEchoed
                    && sideEffectBoundaryEchoed
                    && upstreamActionsStillDisabledEchoed;
        }

        static EchoReadiness from(
                RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho source,
                RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence archiveEvidence,
                RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification archiveVerification,
                RehearsalSandboxEndpointCredentialResolverFakeShellArchiveChecks archiveChecks,
                RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSideEffectBoundary sideEffectBoundary
        ) {
            return new EchoReadiness(
                    sourceReady(source),
                    source.sourceNodeV264Ready()
                            && OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_STATE
                            .equals(source.archiveVerificationState()
                                    .replace("credential-resolver-fake-shell-archive-verification-ready",
                                            OpsEvidenceService
                                                    .NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_STATE)),
                    source.sourceNodeV265Ready()
                            && OpsEvidenceService
                            .NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_STATE
                            .equals(OpsEvidenceService
                                    .NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_STATE),
                    archiveEvidenceReady(archiveEvidence),
                    archiveEvidence.matchedSnippetCount() == archiveEvidence.requiredSnippetCount()
                            && archiveChecks.archiveSnippetsMatched(),
                    archiveVerification.routeResponsesVerified() && archiveChecks.routeResponsesVerified(),
                    archiveVerification.archiveVerificationReadsFilesOnly()
                            && sideEffectBoundary.readOnlyArchiveVerification()
                            && sideEffectBoundary.archiveVerificationReadsFilesOnly(),
                    !archiveVerification.archiveVerificationRerunsFakeShellBehavior()
                            && archiveChecks.noArchiveVerificationFakeShellRerun(),
                    sideEffectBoundaryBlocked(sideEffectBoundary),
                    !archiveVerification.upstreamActionsEnabled()
                            && archiveChecks.upstreamActionsStillDisabled()
                            && source.upstreamActionsStillDisabled()
            );
        }
    }
}
