package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.PLAN_INTAKE_ECHO_MODE;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.SOURCE_SPAN;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.boundaryCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.checks;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.checksClosed;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.checksWithReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.planComplete;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.planIntake;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.planIntakeComplete;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.preImplementationBoundaries;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.preImplementationPlan;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.requirementCodes;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.sideEffectBoundary;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.sideEffectBoundaryBlocked;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.sourceNodeV269;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.sourceNodeV270;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.sourceNodeV270Ready;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport.summary;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverBlockedDecisionUpstreamEchoVerificationSource;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPlanIntake;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlan;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSummary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt;

import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceiptBuilder {

    private static final List<String> NODE_WARNING_CODES = List.of(
            "PLAN_INTAKE_ONLY",
            "UPSTREAM_ECHO_REQUIRED_BEFORE_V272"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "RUN_V271_STATUS_ROUTES_QUALITY_BRANCH",
            "RUN_PARALLEL_JAVA_V112_MINI_KV_V119"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "Java v112 credential resolver pre-implementation plan intake echo receipt",
            "mini-kv v119 credential resolver pre-implementation plan intake non-participation receipt"
    );

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceiptDigest",
            "sandboxEndpointCredentialResolverPreImplementationPlanIntakeState",
            "sandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceReady",
            "sandboxEndpointCredentialResolverPreImplementationPlanBoundaryCount",
            "sandboxEndpointCredentialResolverPreImplementationPlanDefinedBoundaryCount",
            "sandboxEndpointCredentialResolverPreImplementationPlanMissingBoundaryCount",
            "sandboxEndpointCredentialResolverPreImplementationPlanCredentialValueRead",
            "sandboxEndpointCredentialResolverPreImplementationPlanRawEndpointUrlParsed",
            "sandboxEndpointCredentialResolverPreImplementationPlanExternalRequestSent",
            "sandboxEndpointCredentialResolverPreImplementationPlanSecretProviderInstantiated",
            "sandboxEndpointCredentialResolverPreImplementationPlanResolverClientInstantiated",
            "sandboxEndpointCredentialResolverPreImplementationPlanConnectsManagedAudit",
            "sandboxEndpointCredentialResolverPreImplementationPlanApprovalLedgerWritten",
            "sandboxEndpointCredentialResolverPreImplementationPlanSqlExecuted",
            "sandboxEndpointCredentialResolverPreImplementationPlanSchemaMigrationExecuted",
            "sandboxEndpointCredentialResolverPreImplementationPlanAutomaticUpstreamStart"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.sourceNodeV270.planIntakeOnly=true",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.sourceNodeV270.readyForCredentialResolverPreImplementationPlan=true",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.preImplementationPlan.boundaryCount=10",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.preImplementationPlan.definedBoundaryCount=10",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.planIntake.missingBoundaryCount=0",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.checks.credentialValueStillForbidden=true",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.checks.rawEndpointStillForbidden=true",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.checks.externalRequestStillSimulationOnly=true",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.consumedByNodeCredentialResolverPreImplementationPlanIntakeProfile with Node v270",
            "Require managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.readyForNodeV272CredentialResolverPreImplementationPlanVerification=true before Node v272",
            "Verify managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.preImplementationPlan.boundaryCount=10",
            "Verify managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.planIntake.missingBoundaryCount=0",
            "Keep managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.preImplementationPlan.credentialValueReadAllowed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.preImplementationPlan.rawEndpointUrlParseAllowed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.preImplementationPlan.externalRequestAllowed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.preImplementationPlan.approvalLedgerWriteAllowed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.sideEffectBoundary.secretProviderInstantiated=false",
            "Keep managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.sideEffectBoundary.resolverClientInstantiated=false",
            "Keep managedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt.sideEffectBoundary.automaticUpstreamStart=false"
    );

    RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt
                    blockedDecisionEchoReceipt
    ) {
        SourceGate sourceGate = SourceGate.from(blockedDecisionEchoReceipt);
        RehearsalSandboxEndpointCredentialResolverBlockedDecisionUpstreamEchoVerificationSource sourceNodeV269 =
                sourceNodeV269(sourceGate.sourceAccepted(), nodeV269VerificationDigest(blockedDecisionEchoReceipt));
        List<RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary> boundaries =
                preImplementationBoundaries();
        RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan =
                preImplementationPlan(boundaries, planDigest(boundaries));
        RehearsalSandboxEndpointCredentialResolverPlanIntake planIntake =
                planIntake(plan, planIntakeDigest(plan));
        RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks checks =
                checksWithReadiness(checks(sourceNodeV269, plan, planIntake));
        RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSummary summary =
                summary(plan, checks);
        RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceEcho sourceNodeV270 =
                sourceNodeV270(checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake(),
                        sourceNodeV269, summary);
        RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        EchoReadiness readiness = EchoReadiness.from(sourceNodeV270, plan, planIntake, checks, sideEffectBoundary);
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(
                blockedDecisionEchoReceipt,
                sourceNodeV270,
                plan,
                planIntake,
                checks,
                sideEffectBoundary,
                readiness
        );

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_ECHO_RECEIPT_VERSION,
                blockedDecisionEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_ECHO_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_VERSION,
                OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_PROFILE,
                OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_ENDPOINT,
                OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_STATE,
                OpsEvidenceService
                        .NODE_V269_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V269_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                PLAN_INTAKE_ECHO_MODE,
                SOURCE_SPAN,
                sourceNodeV270,
                plan,
                planIntake,
                checks,
                sideEffectBoundary,
                readiness.sourceNodeV270Echoed(),
                readiness.sourceNodeV269UpstreamEchoed(),
                readiness.preImplementationPlanEchoed(),
                readiness.planIntakeEchoed(),
                readiness.allRequiredBoundariesEchoed(),
                readiness.noCredentialBoundaryEchoed(),
                readiness.noRawEndpointBoundaryEchoed(),
                readiness.noResolverRuntimeBoundaryEchoed(),
                readiness.noConnectionBoundaryEchoed(),
                readiness.noWriteBoundaryEchoed(),
                readiness.noAutoStartBoundaryEchoed(),
                readiness.readyForNodeV272(),
                planComplete(plan) && planIntakeComplete(planIntake),
                false,
                false,
                false,
                false,
                receiptDigest,
                boundaryCodes(),
                requirementCodes(),
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(
                WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings()
        );
    }

    List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanIntakeState",
                        receipt.sourceNodeV270().planIntakeState()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceReady",
                        receipt.sourceNodeV270()
                                .readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanBoundaryCount",
                        receipt.preImplementationPlan().boundaryCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanDefinedBoundaryCount",
                        receipt.preImplementationPlan().definedBoundaryCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanMissingBoundaryCount",
                        receipt.planIntake().missingBoundaryCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanExternalRequestSent",
                        receipt.sideEffectBoundary().externalRequestSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanSecretProviderInstantiated",
                        receipt.sideEffectBoundary().secretProviderInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanResolverClientInstantiated",
                        receipt.sideEffectBoundary().resolverClientInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanConnectsManagedAudit",
                        receipt.sideEffectBoundary().connectsManagedAudit()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverPreImplementationPlanAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoReceipt receipt
    ) {
        return planComplete(receipt.preImplementationPlan())
                && planIntakeComplete(receipt.planIntake())
                && sideEffectBoundaryBlocked(receipt.sideEffectBoundary())
                && receipt.checks().sourceNodeV269KeepsBlockedDecision()
                && receipt.checks().sourceNodeV269KeepsRealResolverBlocked()
                && receipt.checks().allTenBoundariesDefined()
                && receipt.checks().credentialValueStillForbidden()
                && receipt.checks().rawEndpointStillForbidden()
                && receipt.checks().secretProviderRuntimeStillDisabled()
                && receipt.checks().realResolverClientStillDisabled()
                && receipt.checks().externalRequestStillSimulationOnly()
                && receipt.checks().schemaMigrationStillReviewOnly()
                && receipt.checks().auditLedgerWriteStillReviewOnly()
                && receipt.checks().upstreamProbesStillDisabled()
                && receipt.checks().upstreamActionsStillDisabled()
                && receipt.checks().productionAuditStillBlocked()
                && receipt.checks().productionWindowStillBlocked()
                && !receipt.sourceNodeV270().realResolverImplementationAllowed()
                && !receipt.sourceNodeV270().executionAllowed()
                && !receipt.sourceNodeV270().connectsManagedAudit()
                && !receipt.sourceNodeV270().readsManagedAuditCredential()
                && !receipt.sourceNodeV270().storesManagedAuditCredential()
                && !receipt.sourceNodeV270().credentialValueRead()
                && !receipt.sourceNodeV270().rawEndpointUrlParsed()
                && !receipt.sourceNodeV270().externalRequestSent()
                && !receipt.sourceNodeV270().secretProviderInstantiated()
                && !receipt.sourceNodeV270().resolverClientInstantiated()
                && !receipt.sourceNodeV270().schemaMigrationExecuted()
                && !receipt.sourceNodeV270().approvalLedgerWritten()
                && !receipt.sourceNodeV270().automaticUpstreamStart()
                && !receipt.sourceNodeV270().sourceNodeV269().realResolverImplementationAllowed()
                && !receipt.sourceNodeV270().sourceNodeV269().executionAllowed()
                && !receipt.sourceNodeV270().sourceNodeV269().connectsManagedAudit()
                && !receipt.sourceNodeV270().sourceNodeV269().readsManagedAuditCredential()
                && !receipt.sourceNodeV270().sourceNodeV269().storesManagedAuditCredential()
                && !receipt.sourceNodeV270().sourceNodeV269().credentialValueRead()
                && !receipt.sourceNodeV270().sourceNodeV269().rawEndpointUrlParsed()
                && !receipt.sourceNodeV270().sourceNodeV269().externalRequestSent()
                && !receipt.sourceNodeV270().sourceNodeV269().secretProviderInstantiated()
                && !receipt.sourceNodeV270().sourceNodeV269().resolverClientInstantiated()
                && !receipt.sourceNodeV270().sourceNodeV269().schemaMigrationExecuted()
                && !receipt.sourceNodeV270().sourceNodeV269().automaticUpstreamStart()
                && !receipt.readyForManagedAuditSandboxAdapterConnection()
                && !receipt.readyForProductionAudit()
                && !receipt.readyForProductionWindow()
                && !receipt.nodeMayTreatAsProductionAuditRecord();
    }

    private static String nodeV269VerificationDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt
                    blockedDecisionEchoReceipt
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "sourceVersion",
                        OpsEvidenceService
                                .NODE_V269_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceProductionReadinessBlockedDecisionEchoReceiptVersion",
                        blockedDecisionEchoReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line("javaV111ReceiptDigest", blockedDecisionEchoReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line(
                        "missingRequirementCodes",
                        blockedDecisionEchoReceipt.missingRequirementCodes()
                ),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV269",
                        blockedDecisionEchoReceipt
                                .readyForNodeV269CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification()
                )
        ));
    }

    private static String planDigest(
            List<RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary> boundaries
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("planVersion",
                        ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport
                                .NODE_V270_PLAN_VERSION),
                ReleaseApprovalDigestSupport.line("planMode",
                        ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport
                                .NODE_V270_PLAN_MODE),
                ReleaseApprovalDigestSupport.line("sourceSpan",
                        ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport
                                .NODE_V270_SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("boundaries", boundaries),
                ReleaseApprovalDigestSupport.line("realResolverImplementationAllowed", false),
                ReleaseApprovalDigestSupport.line("secretProviderRuntimeAllowed", false),
                ReleaseApprovalDigestSupport.line("credentialValueReadAllowed", false),
                ReleaseApprovalDigestSupport.line("rawEndpointUrlParseAllowed", false),
                ReleaseApprovalDigestSupport.line("externalRequestAllowed", false),
                ReleaseApprovalDigestSupport.line("schemaMigrationAllowed", false),
                ReleaseApprovalDigestSupport.line("approvalLedgerWriteAllowed", false),
                ReleaseApprovalDigestSupport.line("automaticUpstreamStartAllowed", false)
        ));
    }

    private static String planIntakeDigest(
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("intakeMode",
                        ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport
                                .NODE_V270_INTAKE_MODE),
                ReleaseApprovalDigestSupport.line("consumedNodeVersion", "Node v269"),
                ReleaseApprovalDigestSupport.line("requiredBoundaryCount",
                        ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport
                                .REQUIRED_BOUNDARY_COUNT),
                ReleaseApprovalDigestSupport.line("definedBoundaryCount", plan.definedBoundaryCount()),
                ReleaseApprovalDigestSupport.line("missingBoundaryCount",
                        ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport
                                .REQUIRED_BOUNDARY_COUNT - plan.definedBoundaryCount()),
                ReleaseApprovalDigestSupport.line("boundaryCodes", boundaryCodes()),
                ReleaseApprovalDigestSupport.line("nextJavaEchoVersion", "Java v112"),
                ReleaseApprovalDigestSupport.line("nextMiniKvReceiptVersion", "mini-kv v119"),
                ReleaseApprovalDigestSupport.line("nextNodeVerificationVersion", "Node v272")
        ));
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt
                    blockedDecisionEchoReceipt,
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceEcho sourceNodeV270,
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan,
            RehearsalSandboxEndpointCredentialResolverPlanIntake planIntake,
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks checks,
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSideEffectBoundary sideEffectBoundary,
            EchoReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_ECHO_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceProductionReadinessBlockedDecisionEchoReceiptVersion",
                        blockedDecisionEchoReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeCredentialResolverPreImplementationPlanIntakeProfile",
                        OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("planIntakeEchoMode", PLAN_INTAKE_ECHO_MODE),
                ReleaseApprovalDigestSupport.line("sourceSpan", SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("sourceNodeV270", sourceNodeV270),
                ReleaseApprovalDigestSupport.line("preImplementationPlan", plan),
                ReleaseApprovalDigestSupport.line("planIntake", planIntake),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV272CredentialResolverPreImplementationPlanVerification",
                        readiness.readyForNodeV272()
                )
        ));
    }

    private static List<String> receiptWarnings(EchoReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.sourceNodeV270Echoed(),
                        "NODE_V270_PRE_IMPLEMENTATION_PLAN_INTAKE_NOT_READY"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.sourceNodeV269UpstreamEchoed(),
                        "NODE_V269_BLOCKED_DECISION_UPSTREAM_ECHO_NOT_READY"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.allRequiredBoundariesEchoed(),
                        "NODE_V270_PRE_IMPLEMENTATION_BOUNDARIES_INCOMPLETE"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.noCredentialBoundaryEchoed()
                                || !readiness.noResolverRuntimeBoundaryEchoed()
                                || !readiness.noConnectionBoundaryEchoed(),
                        "NODE_V270_PRE_IMPLEMENTATION_SIDE_EFFECT_BOUNDARY_OPEN"
                )
        );
    }

    private record SourceGate(boolean sourceAccepted) {

        static SourceGate from(
                RehearsalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceipt
                        receipt
        ) {
            return new SourceGate(
                    receipt.readyForNodeV269CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification()
                            && receipt.receiptWarnings().isEmpty()
                            && receipt.sourceNodeV268Echoed()
                            && receipt.sourceNodeV267UpstreamEchoed()
                            && receipt.blockedDecisionEchoed()
                            && receipt.preImplementationRequirementsEchoed()
                            && receipt.missingRequirementBlockersEchoed()
                            && receipt.noCredentialBoundaryEchoed()
                            && receipt.noRawEndpointBoundaryEchoed()
                            && receipt.noResolverBoundaryEchoed()
                            && receipt.noConnectionBoundaryEchoed()
                            && receipt.noWriteBoundaryEchoed()
                            && receipt.noAutoStartBoundaryEchoed()
                            && !receipt.readyForCredentialResolverPreImplementationPlan()
                            && !receipt.readyForManagedAuditSandboxAdapterConnection()
                            && !receipt.readyForProductionAudit()
                            && !receipt.readyForProductionWindow()
                            && !receipt.nodeMayTreatAsProductionAuditRecord()
            );
        }
    }

    private record EchoReadiness(
            boolean sourceNodeV270Echoed,
            boolean sourceNodeV269UpstreamEchoed,
            boolean preImplementationPlanEchoed,
            boolean planIntakeEchoed,
            boolean allRequiredBoundariesEchoed,
            boolean noCredentialBoundaryEchoed,
            boolean noRawEndpointBoundaryEchoed,
            boolean noResolverRuntimeBoundaryEchoed,
            boolean noConnectionBoundaryEchoed,
            boolean noWriteBoundaryEchoed,
            boolean noAutoStartBoundaryEchoed
    ) {

        boolean readyForNodeV272() {
            return sourceNodeV270Echoed
                    && sourceNodeV269UpstreamEchoed
                    && preImplementationPlanEchoed
                    && planIntakeEchoed
                    && allRequiredBoundariesEchoed
                    && noCredentialBoundaryEchoed
                    && noRawEndpointBoundaryEchoed
                    && noResolverRuntimeBoundaryEchoed
                    && noConnectionBoundaryEchoed
                    && noWriteBoundaryEchoed
                    && noAutoStartBoundaryEchoed;
        }

        static EchoReadiness from(
                RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceEcho source,
                RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan,
                RehearsalSandboxEndpointCredentialResolverPlanIntake planIntake,
                RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks checks,
                RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSideEffectBoundary sideEffectBoundary
        ) {
            return new EchoReadiness(
                    sourceNodeV270Ready(source),
                    checks.sourceNodeV269Ready(),
                    planComplete(plan),
                    planIntakeComplete(planIntake),
                    checks.allTenBoundariesDefined()
                            && plan.boundaries().stream().allMatch(boundary ->
                            "defined-for-review".equals(boundary.status())),
                    checks.credentialValueStillForbidden()
                            && !sideEffectBoundary.credentialValueRead()
                            && !sideEffectBoundary.readsManagedAuditCredential()
                            && !sideEffectBoundary.storesManagedAuditCredential(),
                    checks.rawEndpointStillForbidden()
                            && !sideEffectBoundary.rawEndpointUrlParsed()
                            && !sideEffectBoundary.rawEndpointUrlIncluded(),
                    checks.secretProviderRuntimeStillDisabled()
                            && checks.realResolverClientStillDisabled()
                            && !sideEffectBoundary.secretProviderInstantiated()
                            && !sideEffectBoundary.resolverClientInstantiated()
                            && !sideEffectBoundary.realResolverImplementationAllowed(),
                    checks.externalRequestStillSimulationOnly()
                            && !sideEffectBoundary.connectsManagedAudit()
                            && !sideEffectBoundary.externalRequestSent()
                            && !sideEffectBoundary.readyForManagedAuditSandboxAdapterConnection(),
                    checks.schemaMigrationStillReviewOnly()
                            && checks.auditLedgerWriteStillReviewOnly()
                            && !sideEffectBoundary.approvalLedgerWritten()
                            && !sideEffectBoundary.managedAuditStoreWritten()
                            && !sideEffectBoundary.sqlExecuted()
                            && !sideEffectBoundary.schemaMigrationExecuted(),
                    !sideEffectBoundary.automaticUpstreamStart()
                            && !sideEffectBoundary.javaStartedNodeOrMiniKv()
                            && checksClosed(checks)
                            && sideEffectBoundaryBlocked(sideEffectBoundary)
            );
        }
    }
}
