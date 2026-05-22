package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalRuntimeShellPostDecisionContinuationOption;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalRuntimeShellPostDecisionPlanIntake;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalRuntimeShellPostDecisionPlanIntakeChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalRuntimeShellPostDecisionPlanIntakeNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalRuntimeShellPostDecisionPlanIntakeSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalRuntimeShellPostDecisionPlanIntakeSourceDecisionRecordEcho;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceiptWarnings";

    private ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt sourceReceipt
    ) {
        RehearsalRuntimeShellPostDecisionPlanIntakeSourceDecisionRecordEcho sourceEcho =
                sourceEcho(sourceReceipt);
        RehearsalRuntimeShellPostDecisionPlanIntake planIntake = planIntake();
        RehearsalRuntimeShellPostDecisionPlanIntakeNecessityProof necessityProof =
                necessityProof();
        RehearsalRuntimeShellPostDecisionPlanIntakeSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        RehearsalRuntimeShellPostDecisionPlanIntakeChecks checks =
                checks(sourceEcho, planIntake, necessityProof, sideEffectBoundary);
        EchoWorkflowReadiness readiness =
                readiness(sourceEcho, planIntake, necessityProof, checks, sideEffectBoundary);
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(sourceReceipt, sourceEcho, planIntake, necessityProof,
                checks, sideEffectBoundary, readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_PLAN_INTAKE_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_DECISION_RECORD_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_VERSION,
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_PROFILE,
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_ENDPOINT,
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_MARKDOWN_ENDPOINT,
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_STATE,
                "Node v302",
                "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification.v1",
                "java-v136-credential-resolver-runtime-shell-post-decision-plan-intake-echo-only",
                "Node v301",
                sourceEcho,
                planIntake,
                necessityProof,
                checks,
                sideEffectBoundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceDecisionRecordEchoed"),
                readiness.ready("nodeV301PlanIntakeEchoed"),
                readiness.ready("continuationDecisionEchoed"),
                readiness.ready("continuationOptionsEchoed"),
                readiness.ready("necessityProofEchoed"),
                readiness.ready("runtimeImplementationRejectedEchoed"),
                readiness.ready("noRuntimeImplementationEchoed"),
                readiness.ready("noRuntimeInvocationEchoed"),
                readiness.ready("noCredentialReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noProviderClientInstantiationEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noWriteOrMigrationEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification(),
                false,
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                        .postDecisionPlanIntakeContinuationOptionCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                        .postDecisionPlanIntakeNodeWarningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                        .postDecisionPlanIntakeNodeRecommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                        .postDecisionPlanIntakeNextRequiredEchoVersions(),
                receiptWarnings,
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                        .postDecisionPlanIntakeNodeVerificationActions()
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoBoundaryCatalog
                .postDecisionPlanIntakeWarningDigestBoundaryInputNames();
    }

    static List<String> proofClaims() {
        return ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                .postDecisionPlanIntakeProofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                .postDecisionPlanIntakeNodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt receipt
    ) {
        return ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoBoundaryCatalog
                .postDecisionPlanIntakeWarningDigestBoundaryLines(receipt);
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt receipt
    ) {
        return ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoBoundaryCatalog
                .postDecisionPlanIntakeNoCredentialConnectionWriteOrAutoStartProved(receipt);
    }

    private static RehearsalRuntimeShellPostDecisionPlanIntakeSourceDecisionRecordEcho sourceEcho(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt source
    ) {
        return new RehearsalRuntimeShellPostDecisionPlanIntakeSourceDecisionRecordEcho(
                source.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_DECISION_RECORD_ECHO_RECEIPT_SCHEMA_VERSION,
                source.receiptDigest(),
                source.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification(),
                source.sourceCandidateGateEchoed(),
                source.nodeV299DecisionRecordEchoed(),
                source.blockedDecisionEchoed(),
                source.requiredEvidenceEchoed(),
                source.noGoConditionsEchoed(),
                source.readyForDisabledRuntimeShellImplementation(),
                source.readyForDisabledRuntimeShellInvocation(),
                source.readyForManagedAuditResolverImplementation(),
                source.sideEffectBoundary().disabledRuntimeShellImplemented(),
                source.sideEffectBoundary().disabledRuntimeShellInvocationAllowed(),
                source.sideEffectBoundary().credentialValueRead(),
                source.sideEffectBoundary().rawEndpointUrlParsed(),
                source.sideEffectBoundary().externalRequestSent(),
                source.sideEffectBoundary().secretProviderInstantiated(),
                source.sideEffectBoundary().resolverClientInstantiated(),
                source.sideEffectBoundary().approvalLedgerWritten(),
                source.sideEffectBoundary().sqlExecuted(),
                source.sideEffectBoundary().schemaMigrationExecuted(),
                source.sideEffectBoundary().automaticUpstreamStart()
        );
    }

    private static RehearsalRuntimeShellPostDecisionPlanIntake planIntake() {
        List<RehearsalRuntimeShellPostDecisionContinuationOption> options =
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                        .postDecisionPlanIntakeContinuationOptions();
        return new RehearsalRuntimeShellPostDecisionPlanIntake(
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_VERSION,
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_PROFILE,
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_ENDPOINT,
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_MARKDOWN_ENDPOINT,
                OpsEvidenceService
                        .NODE_V301_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_CONTINUATION_PLAN_INTAKE_STATE,
                "runtime-shell-post-decision-continuation-plan-intake-only",
                "Node v300",
                "continue-blocked-planning",
                options.size(),
                1,
                1,
                "Java v136",
                "mini-kv v133",
                "Node v302",
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                options
        );
    }

    private static RehearsalRuntimeShellPostDecisionPlanIntakeNecessityProof necessityProof() {
        return new RehearsalRuntimeShellPostDecisionPlanIntakeNecessityProof(
                "v300 verified Java v135 and mini-kv v132 agreement with the blocked decision record, but it did not decide the post-decision continuation path.",
                "Java v136 and mini-kv v133 consume v301 as read-only echoes; Node v302 consumes both echoes to verify post-decision plan alignment.",
                "v300 is an upstream echo verification for Node v299; it lacks a selected continuation option, v136/v133 handoff target, and explicit stop condition for the post-decision chain.",
                "Reuse v300 only as source evidence; v301 is the minimal intake layer that records continuation, pause, and approval-prerequisite alternatives.",
                "Stop immediately if the next step requires credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, runtime shell implementation or invocation, ledger/schema writes, or automatic upstream start.",
                "After Node v302 verifies Java v136 and mini-kv v133, do not add another echo stage unless a new blocker and downstream consumer are named in the active plan.",
                true
        );
    }

    private static RehearsalRuntimeShellPostDecisionPlanIntakeSideEffectBoundary sideEffectBoundary() {
        return ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoBoundaryCatalog
                .postDecisionPlanIntakeSideEffectBoundary();
    }

    private static RehearsalRuntimeShellPostDecisionPlanIntakeChecks checks(
            RehearsalRuntimeShellPostDecisionPlanIntakeSourceDecisionRecordEcho sourceEcho,
            RehearsalRuntimeShellPostDecisionPlanIntake planIntake,
            RehearsalRuntimeShellPostDecisionPlanIntakeNecessityProof proof,
            RehearsalRuntimeShellPostDecisionPlanIntakeSideEffectBoundary boundary
    ) {
        boolean sourceLoaded = sourceEcho.sourceReceiptSchemaVersion()
                .equals(OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_DECISION_RECORD_ECHO_RECEIPT_SCHEMA_VERSION);
        boolean sourceReady = sourceEcho.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification()
                && sourceEcho.nodeV299DecisionRecordEchoed()
                && sourceEcho.blockedDecisionEchoed()
                && sourceEcho.requiredEvidenceEchoed()
                && sourceEcho.noGoConditionsEchoed();
        boolean sourceRuntimeBlocked = !sourceEcho.readyForDisabledRuntimeShellImplementation()
                && !sourceEcho.readyForDisabledRuntimeShellInvocation()
                && !sourceEcho.readyForManagedAuditResolverImplementation()
                && !sourceEcho.disabledRuntimeShellImplemented()
                && !sourceEcho.disabledRuntimeShellInvocationAllowed();
        boolean sourceSideEffectsClosed = !sourceEcho.credentialValueRead()
                && !sourceEcho.rawEndpointUrlParsed()
                && !sourceEcho.externalRequestSent()
                && !sourceEcho.secretProviderInstantiated()
                && !sourceEcho.resolverClientInstantiated()
                && !sourceEcho.approvalLedgerWritten()
                && !sourceEcho.sqlExecuted()
                && !sourceEcho.schemaMigrationExecuted()
                && !sourceEcho.automaticUpstreamStart();
        boolean continuationSelected = "continue-blocked-planning"
                .equals(planIntake.selectedContinuationDecision())
                && planIntake.selectedDecisionOptionCount() == 1;
        List<String> continuationOptionCodes =
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellEchoMetadataCatalog
                        .postDecisionPlanIntakeContinuationOptionCodes();
        boolean optionsDocumented = planIntake.decisionOptionCount() == continuationOptionCodes.size()
                && planIntake.continuationOptions().stream()
                .map(option -> option.code())
                .toList().equals(continuationOptionCodes);
        boolean implementationRejected = planIntake.rejectedRuntimeImplementationOptionCount() == 1
                && planIntake.continuationOptions().stream()
                .anyMatch(option -> "IMPLEMENT_RUNTIME_SHELL_NOW".equals(option.code())
                        && "rejected".equals(option.status()));
        boolean proofHasBlocker = proof.blockerResolved().contains("v300");
        boolean proofHasConsumer = proof.consumer().contains("Java v136")
                && proof.consumer().contains("mini-kv v133")
                && proof.consumer().contains("Node v302");
        boolean proofExplainsReuse = proof.whyV300CannotBeReused().contains("v300");
        boolean proofDefinesStop = proof.stopCondition().contains("credential values")
                && proof.stopCondition().contains("HTTP/TCP");
        boolean noWritesOrMigrations = !boundary.approvalLedgerWritten()
                && !boundary.managedAuditStoreWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted();
        boolean ready = sourceLoaded
                && sourceReady
                && sourceRuntimeBlocked
                && sourceSideEffectsClosed
                && continuationSelected
                && optionsDocumented
                && implementationRejected
                && proofHasBlocker
                && proofHasConsumer
                && proofExplainsReuse
                && proofDefinesStop
                && proof.proofComplete()
                && !planIntake.runtimeShellImplementationAllowed()
                && !planIntake.runtimeShellInvocationAllowed()
                && !planIntake.providerClientInstantiationAllowed()
                && !planIntake.externalRequestAllowed()
                && !planIntake.credentialValueReadAllowed()
                && !planIntake.rawEndpointUrlParseAllowed()
                && !planIntake.approvalLedgerWriteAllowed()
                && !planIntake.automaticUpstreamStartAllowed()
                && !boundary.credentialValueRead()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.externalRequestSent()
                && noWritesOrMigrations
                && !boundary.automaticUpstreamStart();
        return new RehearsalRuntimeShellPostDecisionPlanIntakeChecks(
                sourceLoaded,
                sourceReady,
                sourceRuntimeBlocked,
                sourceSideEffectsClosed,
                continuationSelected,
                optionsDocumented,
                implementationRejected,
                proofHasBlocker,
                proofHasConsumer,
                proofExplainsReuse,
                proofDefinesStop,
                proof.proofComplete(),
                !planIntake.runtimeShellImplementationAllowed(),
                !planIntake.runtimeShellInvocationAllowed(),
                !planIntake.providerClientInstantiationAllowed(),
                !planIntake.externalRequestAllowed(),
                !boundary.credentialValueRead() && !boundary.credentialValueProvided(),
                !boundary.rawEndpointUrlParsed() && !boundary.rawEndpointUrlRendered(),
                noWritesOrMigrations,
                !boundary.automaticUpstreamStart(),
                !boundary.productionAuditAllowed(),
                !boundary.productionWindowAllowed(),
                ready
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalRuntimeShellPostDecisionPlanIntakeSourceDecisionRecordEcho sourceEcho,
            RehearsalRuntimeShellPostDecisionPlanIntake planIntake,
            RehearsalRuntimeShellPostDecisionPlanIntakeNecessityProof proof,
            RehearsalRuntimeShellPostDecisionPlanIntakeChecks checks,
            RehearsalRuntimeShellPostDecisionPlanIntakeSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceDecisionRecordEchoed", checks.sourceDecisionRecordEchoReady()
                        && sourceEcho.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification()),
                workflowStep("nodeV301PlanIntakeEchoed", checks.continuationDecisionSelected()),
                workflowStep("continuationDecisionEchoed", checks.continuationDecisionSelected()),
                workflowStep("continuationOptionsEchoed", checks.decisionOptionsDocumented()),
                workflowStep("necessityProofEchoed", checks.necessityProofComplete()
                        && proof.consumer().contains("Java v136")),
                workflowStep("runtimeImplementationRejectedEchoed",
                        checks.runtimeImplementationOptionRejected()),
                workflowStep("noRuntimeImplementationEchoed",
                        checks.runtimeShellImplementationStillForbidden()
                                && !planIntake.runtimeShellImplementationAllowed()),
                workflowStep("noRuntimeInvocationEchoed",
                        checks.runtimeShellInvocationStillForbidden()
                                && !planIntake.runtimeShellInvocationAllowed()),
                workflowStep("noCredentialReadEchoed", checks.credentialBoundaryClosed()),
                workflowStep("noRawEndpointParseEchoed", checks.rawEndpointBoundaryClosed()),
                workflowStep("noProviderClientInstantiationEchoed",
                        checks.providerClientInstantiationStillForbidden()),
                workflowStep("noExternalRequestEchoed", checks.externalRequestStillForbidden()
                        && !boundary.externalRequestSent()),
                workflowStep("noWriteOrMigrationEchoed", checks.writeBoundaryClosed()),
                workflowStep("noAutoStartBoundaryEchoed", checks.autoStartBoundaryClosed()
                        && !boundary.javaStartedNodeMiniKvOrHarness())
        );
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt sourceReceipt,
            RehearsalRuntimeShellPostDecisionPlanIntakeSourceDecisionRecordEcho sourceEcho,
            RehearsalRuntimeShellPostDecisionPlanIntake planIntake,
            RehearsalRuntimeShellPostDecisionPlanIntakeNecessityProof necessityProof,
            RehearsalRuntimeShellPostDecisionPlanIntakeChecks checks,
            RehearsalRuntimeShellPostDecisionPlanIntakeSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_PLAN_INTAKE_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceDecisionRecordEchoReceiptVersion",
                        sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceDecisionRecordEchoReceiptDigest",
                        sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceEcho", sourceEcho),
                ReleaseApprovalDigestSupport.line("planIntake", planIntake),
                ReleaseApprovalDigestSupport.line("necessityProof", necessityProof),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", boundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceDecisionRecordEchoed",
                        "SOURCE_DECISION_RECORD_ECHO_NOT_READY"),
                readiness.warningIfMissing("nodeV301PlanIntakeEchoed",
                        "NODE_V301_PLAN_INTAKE_NOT_READY"),
                readiness.warningIfMissing("continuationOptionsEchoed",
                        "POST_DECISION_CONTINUATION_OPTIONS_UNSTABLE"),
                readiness.warningIfMissing("necessityProofEchoed",
                        "POST_DECISION_NECESSITY_PROOF_INCOMPLETE"),
                readiness.warningIfMissing("runtimeImplementationRejectedEchoed",
                        "RUNTIME_IMPLEMENTATION_OPTION_NOT_REJECTED"),
                readiness.warningIfMissing("noWriteOrMigrationEchoed",
                        "POST_DECISION_PLAN_WRITE_BOUNDARY_OPEN")
        );
    }
}
