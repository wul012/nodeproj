package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.DECISION_ECHO_MODE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.SOURCE_SPAN;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.decisionBlocked;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.decisionChecks;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.decisionChecksClosed;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.missingRequirementCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.preImplementationRequirements;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.productionReadinessDecision;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.requirementsMissing;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.sideEffectBoundary;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.sideEffectBoundaryBlocked;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.sourceNodeV268;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.sourceReady;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationRequirements;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverProductionReadinessDecision;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverProductionReadinessDecisionChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverProductionReadinessSideEffectBoundary;

import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceiptBuilder {

    private static final List<String> NODE_WARNING_CODES = List.of(
            "DECISION_GATE_ONLY",
            "SOURCE_CHAIN_READY_BUT_NOT_PRODUCTION_READY"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "WRITE_SUCCESSOR_PLAN",
            "REQUEST_PARALLEL_UPSTREAM_ECHO"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "Java v111 credential resolver production-readiness blocked-decision echo receipt",
            "mini-kv v118 credential resolver production-readiness blocked-decision non-participation receipt"
    );

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceiptDigest",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionReadinessDecision",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionCheckCount",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionPassedCheckCount",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionMissingRequirementCount",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionProductionBlockerCount",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionCredentialValueRead",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionRawEndpointUrlParsed",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionExternalRequestSent",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSecretProviderInstantiated",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionResolverClientInstantiated",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionConnectsManagedAudit",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionApprovalLedgerWritten",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSqlExecuted",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSchemaMigrationExecuted",
            "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionAutomaticUpstreamStart"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sourceNodeV268.readinessDecision=blocked",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sourceNodeV268.checkCount=25",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sourceNodeV268.passedCheckCount=15",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sourceNodeV268.missingPreImplementationRequirementCount=10",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sourceNodeV268.productionBlockerCount=10",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.productionReadinessDecision.allowsCredentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.productionReadinessDecision.allowsManagedAuditConnection=false",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.productionReadinessDecision.allowsApprovalLedgerWrite=false",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sideEffectBoundary.schemaMigrationExecuted=false",
            "managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.consumedByNodeCredentialResolverProductionReadinessDecisionGateProfile with Node v268",
            "Require managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.readyForNodeV269CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification=true before Node v269",
            "Verify managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sourceNodeV268.readinessDecision=blocked",
            "Verify managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sourceNodeV268.missingPreImplementationRequirementCount=10",
            "Keep managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.productionReadinessDecision.allowsCredentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.productionReadinessDecision.allowsRawEndpointUrlParse=false",
            "Keep managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.productionReadinessDecision.allowsManagedAuditConnection=false",
            "Keep managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.productionReadinessDecision.allowsApprovalLedgerWrite=false",
            "Keep managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sideEffectBoundary.secretProviderInstantiated=false",
            "Keep managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sideEffectBoundary.resolverClientInstantiated=false",
            "Keep managedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt.sideEffectBoundary.automaticUpstreamStart=false"
    );

    RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt fakeShellArchiveEchoReceipt
    ) {
        SourceGate sourceGate = SourceGate.from(fakeShellArchiveEchoReceipt);
        RehearsalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSourceEcho sourceNodeV268 =
                sourceNodeV268(sourceGate.sourceAccepted());
        RehearsalSandboxEndpointCredentialResolverPreImplementationRequirements requirements =
                preImplementationRequirements();
        RehearsalSandboxEndpointCredentialResolverProductionReadinessDecisionChecks checks =
                decisionChecks(sourceNodeV268, requirements);
        String decisionDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "decisionMode",
                        ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport
                                .NODE_V268_DECISION_MODE
                ),
                ReleaseApprovalDigestSupport.line("sourceNodeV267Ready", sourceNodeV268.sourceNodeV267Ready()),
                ReleaseApprovalDigestSupport.line("requirements", requirements),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("productionBlockerCodes", missingRequirementCodes())
        ));
        RehearsalSandboxEndpointCredentialResolverProductionReadinessDecision productionReadinessDecision =
                productionReadinessDecision(decisionDigest);
        RehearsalSandboxEndpointCredentialResolverProductionReadinessSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        EchoReadiness readiness = EchoReadiness.from(
                sourceNodeV268,
                requirements,
                productionReadinessDecision,
                checks,
                sideEffectBoundary
        );
        List<String> receiptWarnings = receiptWarnings(readiness);

        String receiptDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_ECHO_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceFakeShellArchiveEchoReceiptVersion",
                        fakeShellArchiveEchoReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeCredentialResolverProductionReadinessDecisionGateProfile",
                        OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("decisionEchoMode", DECISION_ECHO_MODE),
                ReleaseApprovalDigestSupport.line("sourceSpan", SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("sourceNodeV268", sourceNodeV268),
                ReleaseApprovalDigestSupport.line("preImplementationRequirements", requirements),
                ReleaseApprovalDigestSupport.line("productionReadinessDecision", productionReadinessDecision),
                ReleaseApprovalDigestSupport.line("decisionChecks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV269CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification",
                        readiness.readyForNodeV269()
                )
        ));

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_ECHO_RECEIPT_VERSION,
                fakeShellArchiveEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_ECHO_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_VERSION,
                OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_PROFILE,
                OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_ENDPOINT,
                OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_STATE,
                OpsEvidenceService
                        .NODE_V267_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V267_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                DECISION_ECHO_MODE,
                SOURCE_SPAN,
                sourceNodeV268,
                requirements,
                productionReadinessDecision,
                checks,
                sideEffectBoundary,
                readiness.sourceNodeV268Echoed(),
                readiness.sourceNodeV267UpstreamEchoed(),
                readiness.blockedDecisionEchoed(),
                readiness.preImplementationRequirementsEchoed(),
                readiness.missingRequirementBlockersEchoed(),
                readiness.noCredentialBoundaryEchoed(),
                readiness.noRawEndpointBoundaryEchoed(),
                readiness.noResolverBoundaryEchoed(),
                readiness.noConnectionBoundaryEchoed(),
                readiness.noWriteBoundaryEchoed(),
                readiness.noAutoStartBoundaryEchoed(),
                readiness.readyForNodeV269(),
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                missingRequirementCodes(),
                missingRequirementCodes(),
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(
                WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings()
        );
    }

    List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionReadinessDecision",
                        receipt.sourceNodeV268().readinessDecision()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionCheckCount",
                        receipt.sourceNodeV268().checkCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionPassedCheckCount",
                        receipt.sourceNodeV268().passedCheckCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionMissingRequirementCount",
                        receipt.sourceNodeV268().missingPreImplementationRequirementCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionProductionBlockerCount",
                        receipt.sourceNodeV268().productionBlockerCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionExternalRequestSent",
                        receipt.sideEffectBoundary().externalRequestSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSecretProviderInstantiated",
                        receipt.sideEffectBoundary().secretProviderInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionResolverClientInstantiated",
                        receipt.sideEffectBoundary().resolverClientInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionConnectsManagedAudit",
                        receipt.sideEffectBoundary().connectsManagedAudit()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverProductionReadinessBlockedDecisionAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt receipt
    ) {
        return requirementsMissing(receipt.preImplementationRequirements())
                && decisionBlocked(receipt.productionReadinessDecision())
                && sideEffectBoundaryBlocked(receipt.sideEffectBoundary())
                && receipt.decisionChecks().credentialBoundaryStillClosed()
                && receipt.decisionChecks().rawEndpointBoundaryStillClosed()
                && receipt.decisionChecks().resolverBoundaryStillClosed()
                && receipt.decisionChecks().connectionBoundaryStillClosed()
                && receipt.decisionChecks().writeBoundaryStillClosed()
                && receipt.decisionChecks().autoStartBoundaryStillClosed()
                && receipt.decisionChecks().upstreamProbesStillDisabled()
                && receipt.decisionChecks().upstreamActionsStillDisabled()
                && receipt.decisionChecks().productionAuditStillBlocked()
                && receipt.decisionChecks().productionWindowStillBlocked()
                && receipt.decisionChecks().realResolverImplementationStillBlocked()
                && !receipt.sourceNodeV268().realResolverImplementationAllowed()
                && !receipt.sourceNodeV268().executionAllowed()
                && !receipt.sourceNodeV268().connectsManagedAudit()
                && !receipt.sourceNodeV268().readsManagedAuditCredential()
                && !receipt.sourceNodeV268().storesManagedAuditCredential()
                && !receipt.sourceNodeV268().credentialValueRead()
                && !receipt.sourceNodeV268().rawEndpointUrlParsed()
                && !receipt.sourceNodeV268().externalRequestSent()
                && !receipt.sourceNodeV268().secretProviderInstantiated()
                && !receipt.sourceNodeV268().resolverClientInstantiated()
                && !receipt.sourceNodeV268().schemaMigrationExecuted()
                && !receipt.sourceNodeV268().automaticUpstreamStart()
                && !receipt.readyForCredentialResolverPreImplementationPlan()
                && !receipt.readyForManagedAuditSandboxAdapterConnection()
                && !receipt.readyForProductionAudit()
                && !receipt.readyForProductionWindow()
                && !receipt.nodeMayTreatAsProductionAuditRecord();
    }

    private static List<String> receiptWarnings(EchoReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.sourceNodeV268Echoed(),
                        "NODE_V268_PRODUCTION_READINESS_DECISION_GATE_NOT_READY"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.blockedDecisionEchoed(),
                        "NODE_V268_PRODUCTION_READINESS_DECISION_NOT_BLOCKED"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.noCredentialBoundaryEchoed()
                                || !readiness.noResolverBoundaryEchoed()
                                || !readiness.noConnectionBoundaryEchoed(),
                        "NODE_V268_PRODUCTION_READINESS_SIDE_EFFECT_BOUNDARY_OPEN"
                )
        );
    }

    private record SourceGate(boolean sourceAccepted) {

        static SourceGate from(
                RehearsalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt receipt
        ) {
            return new SourceGate(
                    receipt.readyForNodeV267SandboxEndpointCredentialResolverFakeShellArchiveUpstreamEchoVerification()
                            && receipt.receiptWarnings().isEmpty()
                            && receipt.sourceNodeV266Echoed()
                            && receipt.archiveEvidenceEchoed()
                            && receipt.archiveSnippetsEchoed()
                            && receipt.readOnlyArchiveBoundaryEchoed()
                            && receipt.noFakeShellRerunEchoed()
                            && receipt.sideEffectBoundaryEchoed()
                            && !receipt.readyForManagedAuditSandboxAdapterConnection()
                            && !receipt.readyForProductionAudit()
                            && !receipt.readyForProductionWindow()
                            && !receipt.nodeMayTreatAsProductionAuditRecord()
            );
        }
    }

    private record EchoReadiness(
            boolean sourceNodeV268Echoed,
            boolean sourceNodeV267UpstreamEchoed,
            boolean blockedDecisionEchoed,
            boolean preImplementationRequirementsEchoed,
            boolean missingRequirementBlockersEchoed,
            boolean noCredentialBoundaryEchoed,
            boolean noRawEndpointBoundaryEchoed,
            boolean noResolverBoundaryEchoed,
            boolean noConnectionBoundaryEchoed,
            boolean noWriteBoundaryEchoed,
            boolean noAutoStartBoundaryEchoed
    ) {

        boolean readyForNodeV269() {
            return sourceNodeV268Echoed
                    && sourceNodeV267UpstreamEchoed
                    && blockedDecisionEchoed
                    && preImplementationRequirementsEchoed
                    && missingRequirementBlockersEchoed
                    && noCredentialBoundaryEchoed
                    && noRawEndpointBoundaryEchoed
                    && noResolverBoundaryEchoed
                    && noConnectionBoundaryEchoed
                    && noWriteBoundaryEchoed
                    && noAutoStartBoundaryEchoed;
        }

        static EchoReadiness from(
                RehearsalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSourceEcho source,
                RehearsalSandboxEndpointCredentialResolverPreImplementationRequirements requirements,
                RehearsalSandboxEndpointCredentialResolverProductionReadinessDecision decision,
                RehearsalSandboxEndpointCredentialResolverProductionReadinessDecisionChecks checks,
                RehearsalSandboxEndpointCredentialResolverProductionReadinessSideEffectBoundary sideEffectBoundary
        ) {
            return new EchoReadiness(
                    sourceReady(source),
                    source.sourceNodeV267Ready()
                            && OpsEvidenceService.NODE_V267_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_UPSTREAM_ECHO_VERIFICATION_VERSION
                            .equals("Node v267"),
                    decisionBlocked(decision),
                    requirementsMissing(requirements),
                    source.missingPreImplementationRequirementCount() == missingRequirementCodes().size()
                            && source.productionBlockerCount() == missingRequirementCodes().size(),
                    !source.readsManagedAuditCredential()
                            && !source.storesManagedAuditCredential()
                            && !source.credentialValueRead()
                            && !sideEffectBoundary.credentialValueRead(),
                    !source.rawEndpointUrlParsed()
                            && !sideEffectBoundary.rawEndpointUrlParsed()
                            && !sideEffectBoundary.rawEndpointUrlIncluded(),
                    !source.secretProviderInstantiated()
                            && !source.resolverClientInstantiated()
                            && !source.realResolverImplementationAllowed()
                            && !sideEffectBoundary.secretProviderInstantiated()
                            && !sideEffectBoundary.resolverClientInstantiated(),
                    !source.connectsManagedAudit()
                            && !source.externalRequestSent()
                            && !source.readyForManagedAuditSandboxAdapterConnection()
                            && !sideEffectBoundary.connectsManagedAudit()
                            && !sideEffectBoundary.externalRequestSent(),
                    !source.executionAllowed()
                            && !source.schemaMigrationExecuted()
                            && !sideEffectBoundary.approvalLedgerWritten()
                            && !sideEffectBoundary.sqlExecuted()
                            && !sideEffectBoundary.schemaMigrationExecuted(),
                    !source.automaticUpstreamStart()
                            && !sideEffectBoundary.automaticUpstreamStart()
                            && !sideEffectBoundary.javaStartedNodeOrMiniKv()
                            && decisionChecksClosed(checks)
                            && sideEffectBoundaryBlocked(sideEffectBoundary)
            );
        }
    }
}
