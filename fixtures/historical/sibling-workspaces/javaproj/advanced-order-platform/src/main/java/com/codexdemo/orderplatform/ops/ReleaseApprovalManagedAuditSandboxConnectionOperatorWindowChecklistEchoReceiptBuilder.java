package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceiptBuilder {

    private static final String OWNER_APPROVAL_ARTIFACT_ID_FIELD =
            "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
    private static final String CREDENTIAL_HANDLE_NAME_FIELD =
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
    private static final String SCHEMA_REHEARSAL_ID_FIELD =
            "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
    private static final String ROLLBACK_PATH_ID_FIELD =
            "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
    private static final String TIMEOUT_BUDGET_FIELD = "timeoutBudgetMs";
    private static final String MANUAL_ABORT_MARKER_FIELD =
            "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
    private static final int TIMEOUT_BUDGET_MS = 15000;
    private static final int WINDOW_DURATION_MINUTES = 30;
    private static final int REQUIRED_APPROVAL_COUNT = 3;
    private static final int CHECKLIST_STEP_COUNT = 8;
    private static final int PAUSE_CONDITION_COUNT = 8;
    private static final int FORBIDDEN_OPERATION_COUNT = 6;

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceiptWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxConnectionOperatorWindowChecklistEchoReceiptDigest",
            "sandboxConnectionOperatorWindowChecklistCredentialValueIncluded",
            "sandboxConnectionOperatorWindowChecklistCredentialValueReadByJava",
            "sandboxConnectionOperatorWindowChecklistActualConnectionAttemptedByJava",
            "sandboxConnectionOperatorWindowChecklistSchemaMigrationSqlExecutedByJava",
            "sandboxConnectionOperatorWindowChecklistApprovalLedgerWrittenByJava",
            "sandboxConnectionOperatorWindowChecklistManagedAuditStateWriteRequestedByJava",
            "sandboxConnectionOperatorWindowChecklistNodeAutoStartAllowed",
            "sandboxConnectionOperatorWindowChecklistProductionWindowOpenedByJava"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.checklistFieldBoundary.operatorChecklistReadOnly=true",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.checklistFieldBoundary.checklistCreatesConnectionCommand=false",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.approvalBoundary.approvalLedgerWrittenByJava=false",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.credentialBoundary.credentialHandleOnly=true",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.credentialBoundary.credentialValueIncludedInChecklist=false",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.credentialBoundary.credentialValueReadByJava=false",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.javaExecutionBoundary.schemaMigrationSqlExecutedByJava=false",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false",
            "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.consumedByNodeOperatorWindowChecklistProfile with Node v238",
            "Require managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.readyForNodeV239ManualSandboxConnectionEvidenceVerification=true before Node v239",
            "Verify managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.echoedChecklistFieldNames contains the Node v238 checklist fields",
            "Keep managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.credentialBoundary.credentialValueIncludedInChecklist=false",
            "Keep managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.credentialBoundary.credentialValueReadByJava=false",
            "Keep managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "Keep managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.javaExecutionBoundary.schemaMigrationSqlExecutedByJava=false",
            "Keep managedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false"
    );

    ReleaseApprovalRehearsalResponse
            .RehearsalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt build(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceipt
                    dryRunEnvelopeEchoReceipt
    ) {
        boolean sourceReceiptAccepted = sourceReceiptAccepted(dryRunEnvelopeEchoReceipt);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowChecklistFieldBoundary
                checklistFieldBoundary = ChecklistFieldBoundaryFields.nodeV238OperatorWindow().toBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowApprovalBoundary
                approvalBoundary = ApprovalBoundaryFlags.requiredOperatorWindowApprovals().toBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowCredentialBoundary
                credentialBoundary = CredentialBoundaryFlags.handleOnly().toBoundary(CREDENTIAL_HANDLE_NAME_FIELD);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowExecutionBoundary
                javaExecutionBoundary = ExecutionBoundaryFlags.noExecutionEffects().toBoundary();

        List<String> receiptWarnings = new ArrayList<>();
        if (!sourceReceiptAccepted) {
            receiptWarnings.add("NODE_V239_SOURCE_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_NOT_READY");
        }

        boolean allChecklistFieldsEchoed = allChecklistFieldsEchoed(checklistFieldBoundary);
        boolean approvalChecklistEchoComplete = approvalChecklistEchoComplete(approvalBoundary);
        boolean credentialValueExcluded = credentialValueExcluded(credentialBoundary);
        boolean noExecutionEffects = noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                approvalBoundary,
                credentialBoundary,
                javaExecutionBoundary
        );
        boolean readyForNodeV239ManualSandboxConnectionEvidenceVerification =
                sourceReceiptAccepted
                        && allChecklistFieldsEchoed
                        && approvalChecklistEchoComplete
                        && credentialValueExcluded
                        && noExecutionEffects;

        String receiptDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ECHO_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceSandboxConnectionDryRunEnvelopeEchoReceiptVersion",
                        dryRunEnvelopeEchoReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceSandboxConnectionDryRunEnvelopeEchoReceiptSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeOperatorWindowChecklistProfile",
                        OpsEvidenceService.NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("requiredApprovalCount", REQUIRED_APPROVAL_COUNT),
                ReleaseApprovalDigestSupport.line("checklistStepCount", CHECKLIST_STEP_COUNT),
                ReleaseApprovalDigestSupport.line("pauseConditionCount", PAUSE_CONDITION_COUNT),
                ReleaseApprovalDigestSupport.line("forbiddenOperationCount", FORBIDDEN_OPERATION_COUNT),
                ReleaseApprovalDigestSupport.line("timeoutBudgetMs", TIMEOUT_BUDGET_MS),
                ReleaseApprovalDigestSupport.line("windowDurationMinutes", WINDOW_DURATION_MINUTES),
                ReleaseApprovalDigestSupport.line(
                        "credentialValueIncludedInChecklist",
                        credentialBoundary.credentialValueIncludedInChecklist()
                ),
                ReleaseApprovalDigestSupport.line(
                        "credentialValueReadByJava",
                        credentialBoundary.credentialValueReadByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "actualConnectionAttemptedByJava",
                        javaExecutionBoundary.actualConnectionAttemptedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "schemaMigrationSqlExecutedByJava",
                        javaExecutionBoundary.schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "approvalLedgerWrittenByJava",
                        javaExecutionBoundary.approvalLedgerWrittenByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV239ManualSandboxConnectionEvidenceVerification",
                        readyForNodeV239ManualSandboxConnectionEvidenceVerification
                )
        ));

        return new ReleaseApprovalRehearsalResponse
                .RehearsalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ECHO_RECEIPT_VERSION,
                dryRunEnvelopeEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_VERSION,
                OpsEvidenceService.NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_PROFILE,
                OpsEvidenceService.NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ENDPOINT,
                OpsEvidenceService.NODE_V238_MANUAL_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_STATE,
                OpsEvidenceService.NODE_V239_MANUAL_SANDBOX_CONNECTION_EVIDENCE_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V239_MANUAL_SANDBOX_CONNECTION_EVIDENCE_VERIFICATION_PROFILE,
                true,
                checklistFieldBoundary,
                approvalBoundary,
                credentialBoundary,
                javaExecutionBoundary,
                allChecklistFieldsEchoed,
                approvalChecklistEchoComplete,
                credentialValueExcluded,
                readyForNodeV239ManualSandboxConnectionEvidenceVerification,
                false,
                false,
                false,
                false,
                receiptDigest,
                echoedChecklistFieldNames(),
                echoedApprovalItemIds(),
                echoedChecklistStepPhases(),
                echoedPauseConditionCodes(),
                forbiddenChecklistOperations(),
                nodeV239Prerequisites(),
                List.copyOf(receiptWarnings),
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
                    .RehearsalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxConnectionOperatorWindowChecklistEchoReceiptWarnings",
                        receipt.receiptWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistCredentialValueIncluded",
                        receipt.credentialBoundary().credentialValueIncludedInChecklist()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistCredentialValueReadByJava",
                        receipt.credentialBoundary().credentialValueReadByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistActualConnectionAttemptedByJava",
                        receipt.javaExecutionBoundary().actualConnectionAttemptedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistSchemaMigrationSqlExecutedByJava",
                        receipt.javaExecutionBoundary().schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistApprovalLedgerWrittenByJava",
                        receipt.javaExecutionBoundary().approvalLedgerWrittenByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistManagedAuditStateWriteRequestedByJava",
                        receipt.javaExecutionBoundary().managedAuditStateWriteRequestedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistNodeAutoStartAllowed",
                        receipt.javaExecutionBoundary().nodeAutoStartAllowed()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionOperatorWindowChecklistProductionWindowOpenedByJava",
                        receipt.javaExecutionBoundary().productionWindowOpenedByJava()
                )
        );
    }

    boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt receipt
    ) {
        return noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                receipt.approvalBoundary(),
                receipt.credentialBoundary(),
                receipt.javaExecutionBoundary()
        );
    }

    private boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowApprovalBoundary
                    approvalBoundary,
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowCredentialBoundary
                    credentialBoundary,
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowExecutionBoundary
                    javaExecutionBoundary
    ) {
        return !approvalBoundary.javaCreatesApprovalDecision()
                && !approvalBoundary.approvalLedgerWrittenByJava()
                && !credentialBoundary.credentialValueIncludedInChecklist()
                && !credentialBoundary.credentialValueReadByJava()
                && !credentialBoundary.credentialValueStoredByJava()
                && !credentialBoundary.productionCredentialAllowed()
                && !javaExecutionBoundary.actualConnectionAttemptedByJava()
                && !javaExecutionBoundary.externalManagedAuditConnectionOpenedByJava()
                && !javaExecutionBoundary.schemaMigrationRequestedByJava()
                && !javaExecutionBoundary.schemaMigrationSqlExecutedByJava()
                && !javaExecutionBoundary.managedAuditStateWriteRequestedByJava()
                && !javaExecutionBoundary.approvalLedgerWrittenByJava()
                && !javaExecutionBoundary.managedAuditStoreWrittenByJava()
                && !javaExecutionBoundary.sqlExecutedByJava()
                && !javaExecutionBoundary.deploymentTriggeredByJava()
                && !javaExecutionBoundary.rollbackTriggeredByJava()
                && !javaExecutionBoundary.restoreExecutedByJava()
                && !javaExecutionBoundary.javaStartsManagedAuditService()
                && !javaExecutionBoundary.nodeAutoStartAllowed()
                && !javaExecutionBoundary.miniKvPermissionRequestedByJava()
                && !javaExecutionBoundary.productionWindowOpenedByJava();
    }

    private boolean sourceReceiptAccepted(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceipt
                    dryRunEnvelopeEchoReceipt
    ) {
        return OpsEvidenceService
                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_VERSION
                .equals(dryRunEnvelopeEchoReceipt.receiptVersion())
                && dryRunEnvelopeEchoReceipt.readyForNodeV237ManualSandboxConnectionReadinessGate()
                && !dryRunEnvelopeEchoReceipt.readyForManagedAuditSandboxAdapterConnection()
                && !dryRunEnvelopeEchoReceipt.readyForProductionAudit()
                && !dryRunEnvelopeEchoReceipt.readyForProductionWindow()
                && !dryRunEnvelopeEchoReceipt.nodeMayTreatAsProductionAuditRecord()
                && dryRunEnvelopeEchoReceipt.allEnvelopeFieldsEchoed()
                && dryRunEnvelopeEchoReceipt.credentialValueExcluded()
                && dryRunEnvelopeEchoReceipt.envelopeFieldBoundary().operatorReviewFieldsComplete()
                && dryRunEnvelopeEchoReceipt.envelopeFieldBoundary().dryRunEnvelopeReadOnly()
                && !dryRunEnvelopeEchoReceipt.envelopeFieldBoundary().envelopeCreatesConnectionCommand()
                && dryRunEnvelopeEchoReceipt.credentialBoundary().credentialHandleOnly()
                && !dryRunEnvelopeEchoReceipt.credentialBoundary().credentialValueIncludedInEnvelope()
                && !dryRunEnvelopeEchoReceipt.credentialBoundary().credentialValueReadByJava()
                && !dryRunEnvelopeEchoReceipt.credentialBoundary().credentialValueStoredByJava()
                && !dryRunEnvelopeEchoReceipt.credentialBoundary().productionCredentialAllowed()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().actualConnectionAttemptedByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().externalManagedAuditConnectionOpenedByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().schemaMigrationRequestedByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().schemaMigrationSqlExecutedByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().approvalLedgerWrittenByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().managedAuditStoreWrittenByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().sqlExecutedByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().deploymentTriggeredByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().rollbackTriggeredByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().restoreExecutedByJava()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().javaStartsManagedAuditService()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().nodeAutoStartAllowed()
                && !dryRunEnvelopeEchoReceipt.javaExecutionBoundary().miniKvPermissionRequestedByJava();
    }

    private boolean allChecklistFieldsEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowChecklistFieldBoundary
                    checklistFieldBoundary
    ) {
        return checklistFieldBoundary.requiredApprovalCount() == REQUIRED_APPROVAL_COUNT
                && checklistFieldBoundary.checklistStepCount() == CHECKLIST_STEP_COUNT
                && checklistFieldBoundary.pauseConditionCount() == PAUSE_CONDITION_COUNT
                && checklistFieldBoundary.forbiddenOperationCount() == FORBIDDEN_OPERATION_COUNT
                && checklistFieldBoundary.timeoutBudgetMs() == TIMEOUT_BUDGET_MS
                && checklistFieldBoundary.windowDurationMinutes() == WINDOW_DURATION_MINUTES
                && checklistFieldBoundary.ownerApprovalArtifactIdFieldEchoed()
                && checklistFieldBoundary.credentialHandleNameFieldEchoed()
                && checklistFieldBoundary.schemaRehearsalIdFieldEchoed()
                && checklistFieldBoundary.rollbackPathIdFieldEchoed()
                && checklistFieldBoundary.timeoutBudgetFieldEchoed()
                && checklistFieldBoundary.manualAbortMarkerFieldEchoed()
                && checklistFieldBoundary.windowDurationEchoed()
                && checklistFieldBoundary.manualReviewRequired()
                && checklistFieldBoundary.operatorChecklistReadOnly()
                && !checklistFieldBoundary.checklistCreatesConnectionCommand()
                && !checklistFieldBoundary.windowOpenByDefault();
    }

    private boolean approvalChecklistEchoComplete(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowApprovalBoundary
                    approvalBoundary
    ) {
        return approvalBoundary.approvalItemCount() == REQUIRED_APPROVAL_COUNT
                && approvalBoundary.releaseOwnerApprovalItemEchoed()
                && approvalBoundary.securityReviewerApprovalItemEchoed()
                && approvalBoundary.operationsOwnerApprovalItemEchoed()
                && approvalBoundary.allApprovalItemsRequired()
                && approvalBoundary.blocksConnectionIfMissing()
                && approvalBoundary.artifactIdOnly()
                && approvalBoundary.attestationOnly()
                && approvalBoundary.windowRecordOnly()
                && !approvalBoundary.javaCreatesApprovalDecision()
                && !approvalBoundary.approvalLedgerWrittenByJava();
    }

    private boolean credentialValueExcluded(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowCredentialBoundary
                    credentialBoundary
    ) {
        return credentialBoundary.credentialHandleOnly()
                && !credentialBoundary.credentialValueIncludedInChecklist()
                && !credentialBoundary.credentialValueReadByJava()
                && !credentialBoundary.credentialValueStoredByJava()
                && !credentialBoundary.productionCredentialAllowed();
    }

    private static List<String> echoedChecklistFieldNames() {
        return List.of(
                OWNER_APPROVAL_ARTIFACT_ID_FIELD,
                CREDENTIAL_HANDLE_NAME_FIELD,
                SCHEMA_REHEARSAL_ID_FIELD,
                ROLLBACK_PATH_ID_FIELD,
                TIMEOUT_BUDGET_FIELD,
                MANUAL_ABORT_MARKER_FIELD,
                "windowDurationMinutes",
                "approvalItems",
                "checklistSteps",
                "pauseConditions",
                "forbiddenOperations"
        );
    }

    private static List<String> echoedApprovalItemIds() {
        return List.of("release-owner", "security-reviewer", "operations-owner");
    }

    private static List<String> echoedChecklistStepPhases() {
        return List.of(
                "source-readiness-gate",
                "owner-approval",
                "credential-handle",
                "schema-rehearsal",
                "rollback-path",
                "timeout-budget",
                "manual-abort",
                "final-stop-gate"
        );
    }

    private static List<String> echoedPauseConditionCodes() {
        return List.of(
                "SOURCE_GATE_NOT_READY",
                "OWNER_APPROVAL_MISSING",
                "CREDENTIAL_VALUE_REQUESTED",
                "SCHEMA_SQL_REQUESTED",
                "ROLLBACK_PATH_MISSING",
                "TIMEOUT_BUDGET_CHANGED",
                "UPSTREAM_ACTIONS_ENABLED",
                "MANUAL_ABORT_MARKED"
        );
    }

    private static List<String> forbiddenChecklistOperations() {
        return List.of(
                "Open a managed audit sandbox connection during Java v93 operator checklist echo",
                "Read or archive a managed audit credential value during Java v93 operator checklist echo",
                "Execute schema rehearsal SQL during Java v93 operator checklist echo",
                "Write approval ledger or managed audit state during Java v93 operator checklist echo",
                "Auto-start Java, mini-kv, or external audit services during Java v93 operator checklist echo",
                "Treat this echo receipt as production audit or production window authorization"
        );
    }

    private static List<String> nodeV239Prerequisites() {
        return List.of(
                "Node v238 manual sandbox connection operator window checklist must be archived",
                "Java v93 sandbox connection operator window checklist echo receipt must be present",
                "mini-kv v102 operator window no-start / no-write receipt must be present",
                "Node v239 must compare checklist fields, approval item ids, step phases, and pause condition codes",
                "Credential values, SQL, ledger writes, connection attempts, and service auto-start must remain absent"
        );
    }

    private record ChecklistFieldBoundaryFields(
            String ownerApprovalArtifactIdField,
            String credentialHandleNameField,
            String schemaRehearsalIdField,
            String rollbackPathIdField,
            String timeoutBudgetField,
            String manualAbortMarkerField,
            int timeoutBudgetMs,
            int windowDurationMinutes,
            int requiredApprovalCount,
            int checklistStepCount,
            int pauseConditionCount,
            int forbiddenOperationCount,
            boolean ownerApprovalArtifactIdFieldEchoed,
            boolean credentialHandleNameFieldEchoed,
            boolean schemaRehearsalIdFieldEchoed,
            boolean rollbackPathIdFieldEchoed,
            boolean timeoutBudgetFieldEchoed,
            boolean manualAbortMarkerFieldEchoed,
            boolean windowDurationEchoed,
            boolean manualReviewRequired,
            boolean operatorChecklistReadOnly,
            boolean checklistCreatesConnectionCommand,
            boolean windowOpenByDefault
    ) {

        static ChecklistFieldBoundaryFields nodeV238OperatorWindow() {
            return new ChecklistFieldBoundaryFields(
                    OWNER_APPROVAL_ARTIFACT_ID_FIELD,
                    CREDENTIAL_HANDLE_NAME_FIELD,
                    SCHEMA_REHEARSAL_ID_FIELD,
                    ROLLBACK_PATH_ID_FIELD,
                    TIMEOUT_BUDGET_FIELD,
                    MANUAL_ABORT_MARKER_FIELD,
                    TIMEOUT_BUDGET_MS,
                    WINDOW_DURATION_MINUTES,
                    REQUIRED_APPROVAL_COUNT,
                    CHECKLIST_STEP_COUNT,
                    PAUSE_CONDITION_COUNT,
                    FORBIDDEN_OPERATION_COUNT,
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
                    false
            );
        }

        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowChecklistFieldBoundary
                toBoundary() {
            return new ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionOperatorWindowChecklistFieldBoundary(
                    ownerApprovalArtifactIdField,
                    credentialHandleNameField,
                    schemaRehearsalIdField,
                    rollbackPathIdField,
                    timeoutBudgetField,
                    manualAbortMarkerField,
                    timeoutBudgetMs,
                    windowDurationMinutes,
                    requiredApprovalCount,
                    checklistStepCount,
                    pauseConditionCount,
                    forbiddenOperationCount,
                    ownerApprovalArtifactIdFieldEchoed,
                    credentialHandleNameFieldEchoed,
                    schemaRehearsalIdFieldEchoed,
                    rollbackPathIdFieldEchoed,
                    timeoutBudgetFieldEchoed,
                    manualAbortMarkerFieldEchoed,
                    windowDurationEchoed,
                    manualReviewRequired,
                    operatorChecklistReadOnly,
                    checklistCreatesConnectionCommand,
                    windowOpenByDefault
            );
        }
    }

    private record ApprovalBoundaryFlags(
            int approvalItemCount,
            boolean releaseOwnerApprovalItemEchoed,
            boolean securityReviewerApprovalItemEchoed,
            boolean operationsOwnerApprovalItemEchoed,
            boolean allApprovalItemsRequired,
            boolean blocksConnectionIfMissing,
            boolean artifactIdOnly,
            boolean attestationOnly,
            boolean windowRecordOnly,
            boolean javaCreatesApprovalDecision,
            boolean approvalLedgerWrittenByJava
    ) {

        static ApprovalBoundaryFlags requiredOperatorWindowApprovals() {
            return new ApprovalBoundaryFlags(
                    REQUIRED_APPROVAL_COUNT,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    false,
                    false
            );
        }

        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowApprovalBoundary
                toBoundary() {
            return new ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionOperatorWindowApprovalBoundary(
                    approvalItemCount,
                    releaseOwnerApprovalItemEchoed,
                    securityReviewerApprovalItemEchoed,
                    operationsOwnerApprovalItemEchoed,
                    allApprovalItemsRequired,
                    blocksConnectionIfMissing,
                    artifactIdOnly,
                    attestationOnly,
                    windowRecordOnly,
                    javaCreatesApprovalDecision,
                    approvalLedgerWrittenByJava
            );
        }
    }

    private record CredentialBoundaryFlags(
            boolean credentialHandleOnly,
            boolean credentialValueIncludedInChecklist,
            boolean credentialValueReadByJava,
            boolean credentialValueStoredByJava,
            boolean productionCredentialAllowed
    ) {

        static CredentialBoundaryFlags handleOnly() {
            return new CredentialBoundaryFlags(true, false, false, false, false);
        }

        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowCredentialBoundary
                toBoundary(String credentialHandleNameField) {
            return new ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionOperatorWindowCredentialBoundary(
                    credentialHandleNameField,
                    credentialHandleOnly,
                    credentialValueIncludedInChecklist,
                    credentialValueReadByJava,
                    credentialValueStoredByJava,
                    productionCredentialAllowed
            );
        }
    }

    private record ExecutionBoundaryFlags(
            boolean actualConnectionAttemptedByJava,
            boolean externalManagedAuditConnectionOpenedByJava,
            boolean schemaMigrationRequestedByJava,
            boolean schemaMigrationSqlExecutedByJava,
            boolean managedAuditStateWriteRequestedByJava,
            boolean approvalLedgerWrittenByJava,
            boolean managedAuditStoreWrittenByJava,
            boolean sqlExecutedByJava,
            boolean deploymentTriggeredByJava,
            boolean rollbackTriggeredByJava,
            boolean restoreExecutedByJava,
            boolean javaStartsManagedAuditService,
            boolean nodeAutoStartAllowed,
            boolean miniKvPermissionRequestedByJava,
            boolean productionWindowOpenedByJava
    ) {

        static ExecutionBoundaryFlags noExecutionEffects() {
            return new ExecutionBoundaryFlags(
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

        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionOperatorWindowExecutionBoundary
                toBoundary() {
            return new ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionOperatorWindowExecutionBoundary(
                    actualConnectionAttemptedByJava,
                    externalManagedAuditConnectionOpenedByJava,
                    schemaMigrationRequestedByJava,
                    schemaMigrationSqlExecutedByJava,
                    managedAuditStateWriteRequestedByJava,
                    approvalLedgerWrittenByJava,
                    managedAuditStoreWrittenByJava,
                    sqlExecutedByJava,
                    deploymentTriggeredByJava,
                    rollbackTriggeredByJava,
                    restoreExecutedByJava,
                    javaStartsManagedAuditService,
                    nodeAutoStartAllowed,
                    miniKvPermissionRequestedByJava,
                    productionWindowOpenedByJava
            );
        }
    }
}
