package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryLines;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalRuntimeShellDecisionNoGoCondition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalRuntimeShellDecisionRecord;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalRuntimeShellDecisionRecordChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalRuntimeShellDecisionRecordSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalRuntimeShellDecisionRecordSourceGateEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoRecords
        .RehearsalRuntimeShellDecisionRequirement;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceiptWarnings";

    private static final List<String> REQUIRED_EVIDENCE_IDS = List.of(
            "node-v298-upstream-echo-ready",
            "java-v134-echo-ready",
            "mini-kv-v131-receipt-ready",
            "runtime-shell-still-blocked"
    );

    private static final List<String> NO_GO_CONDITION_CODES = List.of(
            "RUNTIME_SHELL_IMPLEMENTATION_REQUIRED",
            "CREDENTIAL_VALUE_REQUIRED",
            "RAW_ENDPOINT_URL_REQUIRED",
            "MANAGED_AUDIT_CONNECTION_REQUIRED",
            "LEDGER_SCHEMA_WRITE_REQUIRED",
            "AUTOSTART_REQUIRED"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = ReleaseApprovalEchoMarkerSupport
            .boundaryInputNames(
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordState",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordDecision",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordRequiredEvidenceCount",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordNoGoConditionCount",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordReadyForNodeV300",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordRuntimeImplemented",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordCredentialValueRead",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordExternalRequestSent",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordSecretProviderInstantiated",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordResolverClientInstantiated",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordSqlExecuted",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverRuntimeShellDecisionRecordAutomaticUpstreamStart"
            );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordState=runtime-shell-candidate-gate-decision-record-ready",
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.decision=blocked",
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.requiredEvidenceCount=4",
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.noGoConditionCount=6",
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsDisabledRuntimeShellImplementation=false",
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsCredentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.sideEffectBoundary.externalRequestSent=false",
            "managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification=true"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordProfile with Node v299",
            "Require managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.decision=blocked before Node v300",
            "Require managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.requiredEvidenceCount=4 before Node v300",
            "Require managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.noGoConditionCount=6 before Node v300",
            "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsDisabledRuntimeShellImplementation=false",
            "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsDisabledRuntimeShellInvocation=false",
            "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsCredentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsRawEndpointUrlParse=false",
            "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsExternalRequest=false",
            "Keep managedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt.decisionRecord.allowsApprovalLedgerWrite=false"
    );

    private static final List<String> NODE_WARNING_CODES = List.of(
            "DECISION_RECORD_ONLY_DOES_NOT_AUTHORIZE_RUNTIME",
            "NODE_V300_REQUIRES_JAVA_V135_AND_MINI_KV_V132"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "RUN_PARALLEL_JAVA_V135_MINI_KV_V132",
            "KEEP_NODE_V300_BEHIND_PARALLEL_EVIDENCE"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "mini-kv v132 runtime shell decision record non-participation receipt",
            "Node v300 runtime shell decision record upstream echo verification"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt
                    sourceReceipt
    ) {
        RehearsalRuntimeShellDecisionRecordSourceGateEcho sourceEcho = sourceEcho(sourceReceipt);
        RehearsalRuntimeShellDecisionRecord decisionRecord = decisionRecord(sourceEcho);
        RehearsalRuntimeShellDecisionRecordSideEffectBoundary sideEffectBoundary = sideEffectBoundary();
        RehearsalRuntimeShellDecisionRecordChecks checks =
                checks(sourceEcho, decisionRecord, sideEffectBoundary);
        EchoWorkflowReadiness readiness = readiness(sourceEcho, decisionRecord, checks, sideEffectBoundary);
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(sourceReceipt, sourceEcho, decisionRecord, checks, sideEffectBoundary,
                readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_DECISION_RECORD_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_CANDIDATE_GATE_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_VERSION,
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_PROFILE,
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_ENDPOINT,
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_MARKDOWN_ENDPOINT,
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_STATE,
                "Node v300",
                "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification.v1",
                "java-v135-credential-resolver-runtime-shell-decision-record-echo-only",
                "Node v299",
                sourceEcho,
                decisionRecord,
                checks,
                sideEffectBoundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceCandidateGateEchoed"),
                readiness.ready("nodeV299DecisionRecordEchoed"),
                readiness.ready("blockedDecisionEchoed"),
                readiness.ready("requiredEvidenceEchoed"),
                readiness.ready("noGoConditionsEchoed"),
                readiness.ready("noRuntimeImplementationEchoed"),
                readiness.ready("noRuntimeInvocationEchoed"),
                readiness.ready("noCredentialReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noProviderClientInstantiationEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noWriteOrMigrationEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification(),
                false,
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                REQUIRED_EVIDENCE_IDS,
                NO_GO_CONDITION_CODES,
                NODE_WARNING_CODES,
                NODE_RECOMMENDATION_CODES,
                NEXT_REQUIRED_ECHO_VERSIONS,
                receiptWarnings,
                NODE_VERIFICATION_ACTIONS
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    static List<String> proofClaims() {
        return PROOF_CLAIMS;
    }

    static List<String> nodeVerificationActions() {
        return NODE_VERIFICATION_ACTIONS;
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt receipt
    ) {
        return boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordState",
                        receipt.consumedByNodeRuntimeShellCandidateGateDecisionRecordState()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordDecision",
                        receipt.decisionRecord().decision()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordRequiredEvidenceCount",
                        receipt.decisionRecord().requiredEvidenceCount()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordNoGoConditionCount",
                        receipt.decisionRecord().noGoConditionCount()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordReadyForNodeV300",
                        receipt.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordRuntimeImplemented",
                        receipt.sideEffectBoundary().disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordRuntimeInvocationAllowed",
                        receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordExternalRequestSent",
                        receipt.sideEffectBoundary().externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordSecretProviderInstantiated",
                        receipt.sideEffectBoundary().secretProviderInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordResolverClientInstantiated",
                        receipt.sideEffectBoundary().resolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverRuntimeShellDecisionRecordAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoReceipt receipt
    ) {
        return receipt.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification()
                && !receipt.readyForDisabledRuntimeShellImplementation()
                && !receipt.readyForDisabledRuntimeShellInvocation()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !receipt.sideEffectBoundary().disabledRuntimeShellImplemented()
                && !receipt.sideEffectBoundary().disabledRuntimeShellEnabled()
                && !receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed()
                && !receipt.sideEffectBoundary().credentialValueRead()
                && !receipt.sideEffectBoundary().credentialValueProvided()
                && !receipt.sideEffectBoundary().rawEndpointUrlParsed()
                && !receipt.sideEffectBoundary().rawEndpointUrlRendered()
                && !receipt.sideEffectBoundary().externalRequestSent()
                && !receipt.sideEffectBoundary().secretProviderInstantiated()
                && !receipt.sideEffectBoundary().resolverClientInstantiated()
                && !receipt.sideEffectBoundary().approvalLedgerWritten()
                && !receipt.sideEffectBoundary().managedAuditStoreWritten()
                && !receipt.sideEffectBoundary().sqlExecuted()
                && !receipt.sideEffectBoundary().schemaMigrationExecuted()
                && !receipt.sideEffectBoundary().automaticUpstreamStart();
    }

    private static RehearsalRuntimeShellDecisionRecordSourceGateEcho sourceEcho(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt source
    ) {
        return new RehearsalRuntimeShellDecisionRecordSourceGateEcho(
                source.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_CANDIDATE_GATE_ECHO_RECEIPT_SCHEMA_VERSION,
                source.receiptDigest(),
                source.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification(),
                source.sourceHandoffEchoed(),
                source.nodeV297CandidateGateEchoed(),
                source.fiveGateSetEchoed(),
                source.blockedDecisionEchoed(),
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

    private static RehearsalRuntimeShellDecisionRecord decisionRecord(
            RehearsalRuntimeShellDecisionRecordSourceGateEcho sourceEcho
    ) {
        List<RehearsalRuntimeShellDecisionRequirement> requiredEvidence = requiredEvidence(sourceEcho);
        List<RehearsalRuntimeShellDecisionNoGoCondition> noGoConditions = noGoConditions();
        return new RehearsalRuntimeShellDecisionRecord(
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_VERSION,
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_PROFILE,
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_ENDPOINT,
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_MARKDOWN_ENDPOINT,
                OpsEvidenceService
                        .NODE_V299_CREDENTIAL_RESOLVER_RUNTIME_SHELL_CANDIDATE_GATE_DECISION_RECORD_STATE,
                "runtime-shell-candidate-gate-decision-record-only",
                "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell",
                "Node v297-v298 + Java v134 + mini-kv v131",
                "blocked",
                "Node v298 verified the runtime shell candidate gate echoes, but runtime shell implementation remains blocked until a separate successor plan with explicit approval is produced.",
                sourceEcho.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification(),
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
                requiredEvidence.size(),
                noGoConditions.size(),
                requiredEvidence,
                noGoConditions
        );
    }

    private static List<RehearsalRuntimeShellDecisionRequirement> requiredEvidence(
            RehearsalRuntimeShellDecisionRecordSourceGateEcho sourceEcho
    ) {
        return List.of(
                requirement("node-v298-upstream-echo-ready", "Node v298 upstream echo verification",
                        sourceEcho.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification()),
                requirement("java-v134-echo-ready", "Java v134 runtime shell candidate gate echo",
                        sourceEcho.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification()),
                requirement("mini-kv-v131-receipt-ready",
                        "mini-kv v131 runtime shell candidate gate non-participation receipt",
                        sourceEcho.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification()),
                requirement("runtime-shell-still-blocked", "Runtime shell remains blocked",
                        !sourceEcho.disabledRuntimeShellImplemented()
                                && !sourceEcho.disabledRuntimeShellInvocationAllowed())
        );
    }

    private static RehearsalRuntimeShellDecisionRequirement requirement(
            String id,
            String label,
            boolean present
    ) {
        return new RehearsalRuntimeShellDecisionRequirement(
                id,
                label,
                present ? "present" : "missing",
                present ? "present" : "missing",
                true
        );
    }

    private static List<RehearsalRuntimeShellDecisionNoGoCondition> noGoConditions() {
        return List.of(
                noGo("RUNTIME_SHELL_IMPLEMENTATION_REQUIRED",
                        "The next step would have to implement or invoke a runtime shell."),
                noGo("CREDENTIAL_VALUE_REQUIRED",
                        "The next step would have to read, store, render, or test credential values."),
                noGo("RAW_ENDPOINT_URL_REQUIRED",
                        "The next step would have to parse or render a raw endpoint URL."),
                noGo("MANAGED_AUDIT_CONNECTION_REQUIRED",
                        "The next step would have to open managed audit connectivity."),
                noGo("LEDGER_SCHEMA_WRITE_REQUIRED",
                        "The next step would have to write ledger state or execute schema migration SQL."),
                noGo("AUTOSTART_REQUIRED",
                        "The next step would have to auto-start Java, mini-kv, or managed audit services.")
        );
    }

    private static RehearsalRuntimeShellDecisionNoGoCondition noGo(String code, String condition) {
        return new RehearsalRuntimeShellDecisionNoGoCondition(
                code,
                condition,
                "pause-and-do-not-implement-runtime-shell"
        );
    }

    private static RehearsalRuntimeShellDecisionRecordSideEffectBoundary sideEffectBoundary() {
        return new RehearsalRuntimeShellDecisionRecordSideEffectBoundary(
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
                false
        );
    }

    private static RehearsalRuntimeShellDecisionRecordChecks checks(
            RehearsalRuntimeShellDecisionRecordSourceGateEcho sourceEcho,
            RehearsalRuntimeShellDecisionRecord decisionRecord,
            RehearsalRuntimeShellDecisionRecordSideEffectBoundary boundary
    ) {
        boolean sourceLoaded = sourceEcho.sourceReceiptSchemaVersion()
                .equals(OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_CANDIDATE_GATE_ECHO_RECEIPT_SCHEMA_VERSION);
        boolean sourceReady = sourceEcho.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification()
                && sourceEcho.sourceHandoffEchoed()
                && sourceEcho.nodeV297CandidateGateEchoed()
                && sourceEcho.fiveGateSetEchoed()
                && sourceEcho.blockedDecisionEchoed();
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
        boolean decisionBlocked = "blocked".equals(decisionRecord.decision())
                && !decisionRecord.allowsDisabledRuntimeShellImplementation();
        boolean decisionBlocksRuntime = !decisionRecord.allowsDisabledRuntimeShellImplementation()
                && !decisionRecord.allowsDisabledRuntimeShellInvocation()
                && !decisionRecord.allowsRealResolverImplementation()
                && !decisionRecord.allowsFakeHarnessRuntimeImplementation();
        boolean decisionReadOnly = !decisionRecord.allowsSecretProviderInstantiation()
                && !decisionRecord.allowsResolverClientInstantiation()
                && !decisionRecord.allowsCredentialValueRead()
                && !decisionRecord.allowsRawEndpointUrlParse()
                && !decisionRecord.allowsExternalRequest()
                && !decisionRecord.allowsManagedAuditConnection()
                && !decisionRecord.allowsSchemaMigration()
                && !decisionRecord.allowsApprovalLedgerWrite()
                && !decisionRecord.allowsAutomaticUpstreamStart();
        boolean requiredEvidenceStable = decisionRecord.requiredEvidenceCount() == REQUIRED_EVIDENCE_IDS.size()
                && decisionRecord.requiredEvidence().stream()
                .map(RehearsalRuntimeShellDecisionRequirement::id)
                .toList().equals(REQUIRED_EVIDENCE_IDS)
                && decisionRecord.requiredEvidence().stream()
                .allMatch(item -> "present".equals(item.status())
                        && item.requiredBeforeRuntimeShell());
        boolean noGoConditionsStable = decisionRecord.noGoConditionCount() == NO_GO_CONDITION_CODES.size()
                && decisionRecord.explicitNoGoConditions().stream()
                .map(RehearsalRuntimeShellDecisionNoGoCondition::code)
                .toList().equals(NO_GO_CONDITION_CODES)
                && decisionRecord.explicitNoGoConditions().stream()
                .allMatch(item -> "pause-and-do-not-implement-runtime-shell".equals(item.action()));
        boolean noRuntime = !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed()
                && !boundary.executionAllowed();
        boolean noProviderClient = !boundary.secretProviderInstantiated()
                && !boundary.resolverClientInstantiated()
                && !boundary.fakeSecretProviderInstantiated()
                && !boundary.fakeResolverClientInstantiated();
        boolean noWritesOrMigrations = !boundary.approvalLedgerWritten()
                && !boundary.managedAuditStoreWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted();
        boolean ready = sourceLoaded
                && sourceReady
                && sourceRuntimeBlocked
                && sourceSideEffectsClosed
                && decisionBlocked
                && decisionBlocksRuntime
                && decisionReadOnly
                && requiredEvidenceStable
                && noGoConditionsStable
                && decisionRecord.allowsParallelJavaV135MiniKvV132EchoRequest()
                && noRuntime
                && noProviderClient
                && noWritesOrMigrations
                && !boundary.credentialValueRead()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.externalRequestSent()
                && !boundary.automaticUpstreamStart();
        return new RehearsalRuntimeShellDecisionRecordChecks(
                sourceLoaded,
                sourceReady,
                sourceRuntimeBlocked,
                sourceSideEffectsClosed,
                decisionBlocked,
                decisionBlocksRuntime,
                decisionReadOnly,
                requiredEvidenceStable,
                noGoConditionsStable,
                decisionRecord.allowsParallelJavaV135MiniKvV132EchoRequest(),
                noRuntime,
                !boundary.disabledRuntimeShellInvocationAllowed(),
                !boundary.credentialValueRead() && !boundary.credentialValueProvided(),
                !boundary.rawEndpointUrlParsed() && !boundary.rawEndpointUrlRendered(),
                noProviderClient,
                !boundary.connectsManagedAudit() && !boundary.externalRequestSent(),
                noWritesOrMigrations,
                !boundary.automaticUpstreamStart(),
                !boundary.productionAuditAllowed(),
                !boundary.productionWindowAllowed(),
                ready
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalRuntimeShellDecisionRecordSourceGateEcho sourceEcho,
            RehearsalRuntimeShellDecisionRecord decisionRecord,
            RehearsalRuntimeShellDecisionRecordChecks checks,
            RehearsalRuntimeShellDecisionRecordSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceCandidateGateEchoed", checks.sourceCandidateGateEchoReady()
                        && sourceEcho.readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification()),
                workflowStep("nodeV299DecisionRecordEchoed", checks.decisionRecordBlocked()),
                workflowStep("blockedDecisionEchoed", checks.decisionRecordBlocksRuntimeShell()),
                workflowStep("requiredEvidenceEchoed", checks.requiredEvidenceStable()),
                workflowStep("noGoConditionsEchoed", checks.noGoConditionsStable()),
                workflowStep("noRuntimeImplementationEchoed", checks.noRuntimeImplementationCreated()
                        && !decisionRecord.allowsDisabledRuntimeShellImplementation()),
                workflowStep("noRuntimeInvocationEchoed", checks.noRuntimeInvocationAllowed()
                        && !decisionRecord.allowsDisabledRuntimeShellInvocation()),
                workflowStep("noCredentialReadEchoed", checks.credentialBoundaryClosed()),
                workflowStep("noRawEndpointParseEchoed", checks.rawEndpointBoundaryClosed()),
                workflowStep("noProviderClientInstantiationEchoed", checks.providerClientBoundaryClosed()),
                workflowStep("noExternalRequestEchoed", checks.connectionBoundaryClosed()),
                workflowStep("noWriteOrMigrationEchoed", checks.writeBoundaryClosed()),
                workflowStep("noAutoStartBoundaryEchoed", checks.autoStartBoundaryClosed()
                        && !boundary.javaStartedNodeMiniKvOrHarness())
        );
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellCandidateGateEchoReceipt
                    sourceReceipt,
            RehearsalRuntimeShellDecisionRecordSourceGateEcho sourceEcho,
            RehearsalRuntimeShellDecisionRecord decisionRecord,
            RehearsalRuntimeShellDecisionRecordChecks checks,
            RehearsalRuntimeShellDecisionRecordSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_DECISION_RECORD_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceCandidateGateEchoReceiptVersion",
                        sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceCandidateGateEchoReceiptDigest",
                        sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceEcho", sourceEcho),
                ReleaseApprovalDigestSupport.line("decisionRecord", decisionRecord),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", boundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceCandidateGateEchoed", "SOURCE_CANDIDATE_GATE_ECHO_NOT_READY"),
                readiness.warningIfMissing("nodeV299DecisionRecordEchoed",
                        "NODE_V299_DECISION_RECORD_NOT_READY"),
                readiness.warningIfMissing("blockedDecisionEchoed",
                        "RUNTIME_SHELL_DECISION_RECORD_NOT_BLOCKED"),
                readiness.warningIfMissing("requiredEvidenceEchoed",
                        "RUNTIME_SHELL_DECISION_REQUIRED_EVIDENCE_UNSTABLE"),
                readiness.warningIfMissing("noGoConditionsEchoed",
                        "RUNTIME_SHELL_DECISION_NO_GO_CONDITIONS_UNSTABLE"),
                readiness.warningIfMissing("noWriteOrMigrationEchoed",
                        "RUNTIME_SHELL_DECISION_WRITE_BOUNDARY_OPEN")
        );
    }
}
