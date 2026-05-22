package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalRuntimeShellChainDecisionNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalRuntimeShellChainNoGoCondition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalRuntimeShellChainPrerequisite;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalRuntimeShellChainStopPrerequisiteDecisionRecord;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalRuntimeShellStopPrerequisiteDecisionChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES =
            ReleaseApprovalEchoMarkerSupport.boundaryInputNames(
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionRecordState",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecision",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisitePrerequisiteCount",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteMissingPrerequisiteCount",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteNoGoConditionCount",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteReadyForNodeV305",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteRuntimeImplemented",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteCredentialValueRead",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteExternalRequestSent",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteProviderClientInstantiated",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteSqlExecuted",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteMiniKvWriteOrAuthorityCommandExecuted",
                    "sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteAutomaticUpstreamStart"
            );

    private ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt source
    ) {
        RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho sourceEcho = sourceEcho(source);
        RehearsalRuntimeShellChainStopPrerequisiteDecisionRecord decisionRecord = decisionRecord(sourceEcho);
        RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary boundary = sideEffectBoundary();
        RehearsalRuntimeShellStopPrerequisiteDecisionChecks checks =
                checks(sourceEcho, decisionRecord, boundary);
        EchoWorkflowReadiness readiness = readiness(sourceEcho, decisionRecord, checks, boundary);
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(source, sourceEcho, decisionRecord, checks, boundary, readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_STOP_PREREQUISITE_DECISION_ECHO_RECEIPT_VERSION,
                source.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_PLAN_INTAKE_ECHO_RECEIPT_SCHEMA_VERSION,
                source.receiptDigest(),
                OpsEvidenceService.NODE_V304_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CHAIN_STOP_PREREQUISITE_DECISION_RECORD_VERSION,
                OpsEvidenceService.NODE_V304_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CHAIN_STOP_PREREQUISITE_DECISION_RECORD_PROFILE,
                OpsEvidenceService.NODE_V304_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CHAIN_STOP_PREREQUISITE_DECISION_RECORD_ENDPOINT,
                OpsEvidenceService.NODE_V304_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CHAIN_STOP_PREREQUISITE_DECISION_RECORD_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V304_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CHAIN_STOP_PREREQUISITE_DECISION_RECORD_STATE,
                "Node v305",
                "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification.v1",
                "java-v141-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-only",
                "Node v304",
                sourceEcho,
                decisionRecord,
                checks,
                boundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourcePostDecisionPlanIntakeEchoed"),
                readiness.ready("nodeV304DecisionRecordEchoed"),
                readiness.ready("prerequisiteGateEchoed"),
                readiness.ready("requiredPrerequisitesEchoed"),
                readiness.ready("noGoConditionsEchoed"),
                readiness.ready("necessityProofEchoed"),
                readiness.ready("parallelJavaMiniKvEchoRequestEchoed"),
                readiness.ready("runtimeImplementationRejectedEchoed"),
                readiness.ready("noRuntimeImplementationEchoed"),
                readiness.ready("noRuntimeInvocationEchoed"),
                readiness.ready("noCredentialReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noProviderClientInstantiationEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noWriteOrMigrationEchoed"),
                readiness.ready("noMiniKvWriteOrAuthorityEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForNodeV305StopPrerequisiteUpstreamEchoVerification(),
                false,
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                        .requiredPrerequisiteIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                        .noGoConditionCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                        .nodeWarningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                        .nodeRecommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                        .nextRequiredEchoVersions(),
                receiptWarnings,
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
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
        return ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                .proofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                .nodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt receipt
    ) {
        RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return ReleaseApprovalEchoMarkerSupport.boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionRecordState",
                        receipt.consumedByNodeRuntimeShellChainStopPrerequisiteDecisionRecordState()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecision",
                        receipt.decisionRecord().decision()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisitePrerequisiteCount",
                        receipt.decisionRecord().prerequisiteCount()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteMissingPrerequisiteCount",
                        receipt.decisionRecord().missingRuntimePrerequisiteCount()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteNoGoConditionCount",
                        receipt.decisionRecord().noGoConditionCount()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteReadyForNodeV305",
                        receipt.readyForNodeV305StopPrerequisiteUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteRuntimeImplemented",
                        boundary.disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteRuntimeInvocationAllowed",
                        boundary.disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteCredentialValueRead",
                        boundary.credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteRawEndpointUrlParsed",
                        boundary.rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteExternalRequestSent",
                        boundary.externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteProviderClientInstantiated",
                        boundary.secretProviderInstantiated() || boundary.resolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteApprovalLedgerWritten",
                        boundary.approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteSqlExecuted",
                        boundary.sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteSchemaMigrationExecuted",
                        boundary.schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteMiniKvWriteOrAuthorityCommandExecuted",
                        boundary.miniKvWriteOrAuthorityCommandExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteAutomaticUpstreamStart",
                        boundary.automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt receipt
    ) {
        RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return receipt.readyForNodeV305StopPrerequisiteUpstreamEchoVerification()
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
                && !boundary.approvalLedgerWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted()
                && !boundary.miniKvWriteOrAuthorityCommandExecuted()
                && !boundary.automaticUpstreamStart();
    }

    private static RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho sourceEcho(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt source
    ) {
        return new RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho(
                source.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_PLAN_INTAKE_ECHO_RECEIPT_SCHEMA_VERSION,
                source.receiptDigest(),
                source.readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification(),
                source.nodeV301PlanIntakeEchoed(),
                source.continuationDecisionEchoed(),
                source.continuationOptionsEchoed(),
                source.necessityProofEchoed(),
                source.runtimeImplementationRejectedEchoed(),
                source.noRuntimeImplementationEchoed(),
                source.noRuntimeInvocationEchoed(),
                source.noCredentialReadEchoed(),
                source.noRawEndpointParseEchoed(),
                source.noProviderClientInstantiationEchoed(),
                source.noExternalRequestEchoed(),
                source.noWriteOrMigrationEchoed(),
                source.noAutoStartBoundaryEchoed(),
                source.planIntake().selectedContinuationDecision(),
                source.planIntake().decisionOptionCount(),
                source.planIntake().rejectedRuntimeImplementationOptionCount(),
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

    private static RehearsalRuntimeShellChainStopPrerequisiteDecisionRecord decisionRecord(
            RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho sourceEcho
    ) {
        List<RehearsalRuntimeShellChainPrerequisite> prerequisites =
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                        .requiredPrerequisites();
        List<RehearsalRuntimeShellChainNoGoCondition> noGoConditions =
                ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionCatalog
                        .noGoConditions();
        RehearsalRuntimeShellChainDecisionNecessityProof proof = necessityProof();
        String decisionDigest = decisionDigest(prerequisites, noGoConditions, proof, sourceEcho);
        return new RehearsalRuntimeShellChainStopPrerequisiteDecisionRecord(
                decisionDigest,
                "runtime-shell-chain-stop-or-prerequisite-decision-record-only",
                "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell",
                "Node v303 + Java v136 + mini-kv v133",
                "require-explicit-approval-prerequisites-before-runtime-shell",
                "Node v303 aligned post-decision intake echoes, but runtime shell still lacks explicit operator approval, credential-handle readiness, no-network safety tests, abort semantics, and upstream echo of the prerequisite decision.",
                "continue-only-as-blocked-prerequisite-review",
                true,
                sourceEcho.readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification(),
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
                prerequisites.size(),
                prerequisites.size(),
                noGoConditions.size(),
                prerequisites,
                noGoConditions,
                proof
        );
    }

    private static RehearsalRuntimeShellChainDecisionNecessityProof necessityProof() {
        return new RehearsalRuntimeShellChainDecisionNecessityProof(
                "v303 aligned the post-decision plan intake echoes, but did not decide whether the runtime shell chain should stop or require explicit approval prerequisites.",
                "Java v141 and mini-kv v134, then Node v305",
                "v303 verifies upstream echo alignment only; it does not enumerate missing prerequisites or publish a decision that Java and mini-kv can echo before any later runtime-shell discussion.",
                "Reuse v303 as source evidence, but create v304 as the minimal decision layer that records stop/prerequisite requirements.",
                "Stop immediately if the next step requires credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, runtime shell implementation or invocation, ledger/schema writes, mini-kv write/admin commands, or automatic upstream start.",
                true
        );
    }

    private static RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary sideEffectBoundary() {
        return new RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary(
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

    private static RehearsalRuntimeShellStopPrerequisiteDecisionChecks checks(
            RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho sourceEcho,
            RehearsalRuntimeShellChainStopPrerequisiteDecisionRecord decisionRecord,
            RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary boundary
    ) {
        boolean sourceLoaded = sourceEcho.sourceReceiptSchemaVersion()
                .equals(OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_POST_DECISION_PLAN_INTAKE_ECHO_RECEIPT_SCHEMA_VERSION);
        boolean sourceReady = sourceEcho.readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification()
                && sourceEcho.nodeV301PlanIntakeEchoed()
                && sourceEcho.continuationDecisionEchoed()
                && sourceEcho.continuationOptionsEchoed()
                && sourceEcho.necessityProofEchoed();
        boolean sourceRuntimeBlocked = !sourceEcho.runtimeShellImplemented()
                && !sourceEcho.runtimeShellInvocationAllowed()
                && sourceEcho.runtimeImplementationRejectedEchoed()
                && sourceEcho.noRuntimeImplementationEchoed()
                && sourceEcho.noRuntimeInvocationEchoed();
        boolean sourceSideEffectsClosed = sourceEcho.noCredentialReadEchoed()
                && sourceEcho.noRawEndpointParseEchoed()
                && sourceEcho.noProviderClientInstantiationEchoed()
                && sourceEcho.noExternalRequestEchoed()
                && sourceEcho.noWriteOrMigrationEchoed()
                && sourceEcho.noAutoStartBoundaryEchoed()
                && !sourceEcho.credentialValueRead()
                && !sourceEcho.rawEndpointUrlParsed()
                && !sourceEcho.externalRequestSent()
                && !sourceEcho.secretProviderInstantiated()
                && !sourceEcho.resolverClientInstantiated()
                && !sourceEcho.approvalLedgerWritten()
                && !sourceEcho.sqlExecuted()
                && !sourceEcho.schemaMigrationExecuted()
                && !sourceEcho.automaticUpstreamStart();
        boolean decisionSelectsGate =
                "require-explicit-approval-prerequisites-before-runtime-shell".equals(decisionRecord.decision())
                        && "continue-only-as-blocked-prerequisite-review".equals(decisionRecord.selectedPath());
        boolean decisionBlocksRuntime = decisionRecord.stopRuntimeShellChainWithoutPrerequisites()
                && !decisionRecord.allowsDisabledRuntimeShellImplementation()
                && !decisionRecord.allowsDisabledRuntimeShellInvocation()
                && !decisionRecord.allowsCredentialValueRead()
                && !decisionRecord.allowsRawEndpointUrlParse()
                && !decisionRecord.allowsExternalRequest()
                && !decisionRecord.allowsManagedAuditConnection();
        boolean decisionReadOnly = !decisionRecord.allowsSchemaMigration()
                && !decisionRecord.allowsApprovalLedgerWrite()
                && !decisionRecord.allowsAutomaticUpstreamStart();
        boolean prerequisitesDocumented = decisionRecord.prerequisiteCount() == 6
                && decisionRecord.requiredPrerequisites().stream()
                .allMatch(RehearsalRuntimeShellChainPrerequisite::requiredBeforeRuntimeShell);
        boolean missingBlocksImplementation =
                decisionRecord.missingRuntimePrerequisiteCount() == decisionRecord.prerequisiteCount();
        boolean parallelRecommended = decisionRecord.allowsParallelJavaV141MiniKvV134EchoRequest()
                && !decisionRecord.allowsNodeV305BeforeUpstreamEcho();
        boolean miniKvStillForbidden = !decisionRecord.allowsMiniKvWriteOrAuthority()
                && !boundary.miniKvWriteOrAuthorityCommandExecuted();
        boolean ready = sourceLoaded
                && sourceReady
                && sourceRuntimeBlocked
                && sourceSideEffectsClosed
                && decisionSelectsGate
                && decisionBlocksRuntime
                && decisionReadOnly
                && prerequisitesDocumented
                && missingBlocksImplementation
                && decisionRecord.necessityProof().proofComplete()
                && parallelRecommended
                && miniKvStillForbidden
                && !boundary.productionAuditAllowed()
                && !boundary.productionWindowAllowed();
        return new RehearsalRuntimeShellStopPrerequisiteDecisionChecks(
                sourceLoaded,
                sourceReady,
                sourceRuntimeBlocked,
                sourceSideEffectsClosed,
                decisionSelectsGate,
                decisionBlocksRuntime,
                decisionReadOnly,
                prerequisitesDocumented,
                missingBlocksImplementation,
                decisionRecord.necessityProof().proofComplete(),
                parallelRecommended,
                miniKvStillForbidden,
                !boundary.productionAuditAllowed(),
                !boundary.productionWindowAllowed(),
                ready
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho sourceEcho,
            RehearsalRuntimeShellChainStopPrerequisiteDecisionRecord decisionRecord,
            RehearsalRuntimeShellStopPrerequisiteDecisionChecks checks,
            RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourcePostDecisionPlanIntakeEchoed", checks.sourcePostDecisionPlanIntakeEchoReady()
                        && sourceEcho.readyForNodeV302PostDecisionPlanIntakeUpstreamEchoVerification()),
                workflowStep("nodeV304DecisionRecordEchoed", checks.decisionSelectsPrerequisiteGate()),
                workflowStep("prerequisiteGateEchoed", checks.decisionRecordBlocksRuntimeShell()),
                workflowStep("requiredPrerequisitesEchoed", checks.requiredPrerequisitesDocumented()),
                workflowStep("noGoConditionsEchoed", decisionRecord.noGoConditionCount() == 8),
                workflowStep("necessityProofEchoed", checks.necessityProofComplete()
                        && decisionRecord.necessityProof().consumer().contains("Java v141")),
                workflowStep("parallelJavaMiniKvEchoRequestEchoed",
                        checks.parallelJavaV141MiniKvV134EchoRecommended()),
                workflowStep("runtimeImplementationRejectedEchoed",
                        checks.missingRuntimePrerequisitesBlockImplementation()),
                workflowStep("noRuntimeImplementationEchoed",
                        !decisionRecord.allowsDisabledRuntimeShellImplementation()
                                && !boundary.disabledRuntimeShellImplemented()),
                workflowStep("noRuntimeInvocationEchoed",
                        !decisionRecord.allowsDisabledRuntimeShellInvocation()
                                && !boundary.disabledRuntimeShellInvocationAllowed()),
                workflowStep("noCredentialReadEchoed",
                        !decisionRecord.allowsCredentialValueRead()
                                && !boundary.credentialValueRead()),
                workflowStep("noRawEndpointParseEchoed",
                        !decisionRecord.allowsRawEndpointUrlParse()
                                && !boundary.rawEndpointUrlParsed()),
                workflowStep("noProviderClientInstantiationEchoed",
                        !decisionRecord.allowsSecretProviderInstantiation()
                                && !decisionRecord.allowsResolverClientInstantiation()
                                && !boundary.secretProviderInstantiated()
                                && !boundary.resolverClientInstantiated()),
                workflowStep("noExternalRequestEchoed",
                        !decisionRecord.allowsExternalRequest() && !boundary.externalRequestSent()),
                workflowStep("noWriteOrMigrationEchoed",
                        !decisionRecord.allowsApprovalLedgerWrite()
                                && !decisionRecord.allowsSchemaMigration()
                                && !boundary.approvalLedgerWritten()
                                && !boundary.sqlExecuted()
                                && !boundary.schemaMigrationExecuted()),
                workflowStep("noMiniKvWriteOrAuthorityEchoed", checks.miniKvWriteOrAuthorityStillForbidden()),
                workflowStep("noAutoStartBoundaryEchoed",
                        !decisionRecord.allowsAutomaticUpstreamStart()
                                && !boundary.automaticUpstreamStart()
                                && !boundary.javaStartedNodeMiniKvOrHarness())
        );
    }

    private static String decisionDigest(
            List<RehearsalRuntimeShellChainPrerequisite> prerequisites,
            List<RehearsalRuntimeShellChainNoGoCondition> noGoConditions,
            RehearsalRuntimeShellChainDecisionNecessityProof proof,
            RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho sourceEcho
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("nodeVersion", "Node v304"),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", sourceEcho.sourceReceiptDigest()),
                ReleaseApprovalDigestSupport.line("decision",
                        "require-explicit-approval-prerequisites-before-runtime-shell"),
                ReleaseApprovalDigestSupport.line("prerequisites", prerequisites),
                ReleaseApprovalDigestSupport.line("noGoConditions", noGoConditions),
                ReleaseApprovalDigestSupport.line("necessityProof", proof)
        ));
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellPostDecisionPlanIntakeEchoReceipt source,
            RehearsalRuntimeShellStopPrerequisiteSourcePostDecisionPlanIntakeEcho sourceEcho,
            RehearsalRuntimeShellChainStopPrerequisiteDecisionRecord decisionRecord,
            RehearsalRuntimeShellStopPrerequisiteDecisionChecks checks,
            RehearsalRuntimeShellStopPrerequisiteSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_STOP_PREREQUISITE_DECISION_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", source.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", source.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceEcho", sourceEcho),
                ReleaseApprovalDigestSupport.line("decisionRecord", decisionRecord),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", boundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourcePostDecisionPlanIntakeEchoed",
                        "SOURCE_POST_DECISION_PLAN_INTAKE_ECHO_NOT_READY"),
                readiness.warningIfMissing("nodeV304DecisionRecordEchoed",
                        "NODE_V304_STOP_PREREQUISITE_DECISION_NOT_ECHOED"),
                readiness.warningIfMissing("requiredPrerequisitesEchoed",
                        "RUNTIME_SHELL_PREREQUISITES_NOT_DOCUMENTED"),
                readiness.warningIfMissing("noGoConditionsEchoed",
                        "STOP_PREREQUISITE_NO_GO_CONDITIONS_UNSTABLE"),
                readiness.warningIfMissing("parallelJavaMiniKvEchoRequestEchoed",
                        "PARALLEL_JAVA_MINIKV_ECHO_NOT_RECOMMENDED"),
                readiness.warningIfMissing("noMiniKvWriteOrAuthorityEchoed",
                        "MINIKV_WRITE_OR_AUTHORITY_BOUNDARY_OPEN")
        );
    }
}
