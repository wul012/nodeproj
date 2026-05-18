package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceiptBuilder {

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

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceiptWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxConnectionDryRunEnvelopeEchoReceiptDigest",
            "sandboxConnectionDryRunEnvelopeCredentialValueIncluded",
            "sandboxConnectionDryRunEnvelopeCredentialValueReadByJava",
            "sandboxConnectionDryRunEnvelopeActualConnectionAttemptedByJava",
            "sandboxConnectionDryRunEnvelopeSchemaMigrationSqlExecutedByJava",
            "sandboxConnectionDryRunEnvelopeApprovalLedgerWrittenByJava",
            "sandboxConnectionDryRunEnvelopeManagedAuditStoreWrittenByJava",
            "sandboxConnectionDryRunEnvelopeNodeAutoStartAllowed"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.envelopeFieldBoundary.operatorReviewFieldsComplete=true",
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.credentialBoundary.credentialHandleOnly=true",
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.credentialBoundary.credentialValueIncludedInEnvelope=false",
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.credentialBoundary.credentialValueReadByJava=false",
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.javaExecutionBoundary.schemaMigrationSqlExecutedByJava=false",
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false",
            "managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.consumedByNodeDryRunRequestEnvelopeProfile with Node v236",
            "Require managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.readyForNodeV237ManualSandboxConnectionReadinessGate=true before Node v237",
            "Verify managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.echoedEnvelopeFieldNames contains exactly the six Node v236 operatorReviewFields",
            "Keep managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.credentialBoundary.credentialValueIncludedInEnvelope=false",
            "Keep managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.credentialBoundary.credentialValueReadByJava=false",
            "Keep managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "Keep managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.javaExecutionBoundary.schemaMigrationSqlExecutedByJava=false",
            "Keep managedAuditSandboxConnectionDryRunEnvelopeEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false"
    );

    ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceipt build(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreconditionReceipt
                    preconditionReceipt
    ) {
        boolean sourceReceiptAccepted = sourceReceiptAccepted(preconditionReceipt);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeFieldBoundary
                envelopeFieldBoundary = envelopeFieldBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeCredentialBoundary
                credentialBoundary = credentialBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeExecutionBoundary
                javaExecutionBoundary = javaExecutionBoundary();

        List<String> receiptWarnings = new ArrayList<>();
        if (!sourceReceiptAccepted) {
            receiptWarnings.add("NODE_V237_SOURCE_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_NOT_READY");
        }

        boolean allEnvelopeFieldsEchoed = envelopeFieldBoundary.operatorReviewFieldsComplete()
                && envelopeFieldBoundary.ownerApprovalArtifactIdFieldEchoed()
                && envelopeFieldBoundary.credentialHandleNameFieldEchoed()
                && envelopeFieldBoundary.schemaRehearsalIdFieldEchoed()
                && envelopeFieldBoundary.rollbackPathIdFieldEchoed()
                && envelopeFieldBoundary.timeoutBudgetFieldEchoed()
                && envelopeFieldBoundary.manualAbortMarkerFieldEchoed();
        boolean credentialValueExcluded = credentialBoundary.credentialHandleOnly()
                && !credentialBoundary.credentialValueIncludedInEnvelope()
                && !credentialBoundary.credentialValueReadByJava()
                && !credentialBoundary.credentialValueStoredByJava()
                && !credentialBoundary.productionCredentialAllowed();
        boolean noExecutionEffects = noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                credentialBoundary,
                javaExecutionBoundary
        );
        boolean readyForNodeV237ManualSandboxConnectionReadinessGate =
                sourceReceiptAccepted && allEnvelopeFieldsEchoed && credentialValueExcluded && noExecutionEffects;

        String receiptDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceSandboxConnectionPreconditionReceiptVersion",
                        preconditionReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceSandboxConnectionPreconditionReceiptSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeDryRunRequestEnvelopeProfile",
                        OpsEvidenceService.NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("ownerApprovalArtifactIdField", OWNER_APPROVAL_ARTIFACT_ID_FIELD),
                ReleaseApprovalDigestSupport.line("credentialHandleNameField", CREDENTIAL_HANDLE_NAME_FIELD),
                ReleaseApprovalDigestSupport.line("schemaRehearsalIdField", SCHEMA_REHEARSAL_ID_FIELD),
                ReleaseApprovalDigestSupport.line("rollbackPathIdField", ROLLBACK_PATH_ID_FIELD),
                ReleaseApprovalDigestSupport.line("timeoutBudgetField", TIMEOUT_BUDGET_FIELD),
                ReleaseApprovalDigestSupport.line("timeoutBudgetMs", TIMEOUT_BUDGET_MS),
                ReleaseApprovalDigestSupport.line("manualAbortMarkerField", MANUAL_ABORT_MARKER_FIELD),
                ReleaseApprovalDigestSupport.line(
                        "credentialValueIncludedInEnvelope",
                        credentialBoundary.credentialValueIncludedInEnvelope()
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
                        "readyForNodeV237ManualSandboxConnectionReadinessGate",
                        readyForNodeV237ManualSandboxConnectionReadinessGate
                )
        ));

        return new ReleaseApprovalRehearsalResponse
                .RehearsalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_ENVELOPE_ECHO_RECEIPT_VERSION,
                preconditionReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_VERSION,
                OpsEvidenceService.NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_PROFILE,
                OpsEvidenceService.NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_ENDPOINT,
                OpsEvidenceService.NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_STATE,
                OpsEvidenceService.NODE_V237_MANUAL_SANDBOX_CONNECTION_READINESS_GATE_VERSION,
                OpsEvidenceService.NODE_V237_MANUAL_SANDBOX_CONNECTION_READINESS_GATE_PROFILE,
                true,
                envelopeFieldBoundary,
                credentialBoundary,
                javaExecutionBoundary,
                allEnvelopeFieldsEchoed,
                credentialValueExcluded,
                readyForNodeV237ManualSandboxConnectionReadinessGate,
                false,
                false,
                false,
                false,
                receiptDigest,
                echoedEnvelopeFieldNames(),
                forbiddenEnvelopeOperations(),
                nodeV237Prerequisites(),
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
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxConnectionDryRunEnvelopeEchoReceiptWarnings",
                        receipt.receiptWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunEnvelopeEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunEnvelopeCredentialValueIncluded",
                        receipt.credentialBoundary().credentialValueIncludedInEnvelope()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunEnvelopeCredentialValueReadByJava",
                        receipt.credentialBoundary().credentialValueReadByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunEnvelopeActualConnectionAttemptedByJava",
                        receipt.javaExecutionBoundary().actualConnectionAttemptedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunEnvelopeSchemaMigrationSqlExecutedByJava",
                        receipt.javaExecutionBoundary().schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunEnvelopeApprovalLedgerWrittenByJava",
                        receipt.javaExecutionBoundary().approvalLedgerWrittenByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunEnvelopeManagedAuditStoreWrittenByJava",
                        receipt.javaExecutionBoundary().managedAuditStoreWrittenByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunEnvelopeNodeAutoStartAllowed",
                        receipt.javaExecutionBoundary().nodeAutoStartAllowed()
                )
        );
    }

    boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionDryRunEnvelopeEchoReceipt receipt
    ) {
        return noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                receipt.credentialBoundary(),
                receipt.javaExecutionBoundary()
        );
    }

    private boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeCredentialBoundary
                    credentialBoundary,
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeExecutionBoundary
                    javaExecutionBoundary
    ) {
        return !credentialBoundary.credentialValueIncludedInEnvelope()
                && !credentialBoundary.credentialValueReadByJava()
                && !credentialBoundary.credentialValueStoredByJava()
                && !credentialBoundary.productionCredentialAllowed()
                && !javaExecutionBoundary.actualConnectionAttemptedByJava()
                && !javaExecutionBoundary.externalManagedAuditConnectionOpenedByJava()
                && !javaExecutionBoundary.schemaMigrationRequestedByJava()
                && !javaExecutionBoundary.schemaMigrationSqlExecutedByJava()
                && !javaExecutionBoundary.approvalLedgerWrittenByJava()
                && !javaExecutionBoundary.managedAuditStoreWrittenByJava()
                && !javaExecutionBoundary.sqlExecutedByJava()
                && !javaExecutionBoundary.deploymentTriggeredByJava()
                && !javaExecutionBoundary.rollbackTriggeredByJava()
                && !javaExecutionBoundary.restoreExecutedByJava()
                && !javaExecutionBoundary.javaStartsManagedAuditService()
                && !javaExecutionBoundary.nodeAutoStartAllowed()
                && !javaExecutionBoundary.miniKvPermissionRequestedByJava();
    }

    private boolean sourceReceiptAccepted(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreconditionReceipt
                    preconditionReceipt
    ) {
        return OpsEvidenceService
                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_VERSION
                .equals(preconditionReceipt.receiptVersion())
                && preconditionReceipt.readyForNodeV235ManualSandboxConnectionPreconditionIntake()
                && !preconditionReceipt.readyForManagedAuditSandboxAdapterConnection()
                && !preconditionReceipt.readyForProductionAudit()
                && !preconditionReceipt.readyForProductionWindow()
                && !preconditionReceipt.nodeMayTreatAsProductionAuditRecord()
                && !preconditionReceipt.ownerApprovalBoundary().ownerApprovalArtifactProvidedByJava()
                && !preconditionReceipt.ownerApprovalBoundary().ownerApprovalArtifactReviewedByJava()
                && !preconditionReceipt.ownerApprovalBoundary().javaApprovalDecisionCreated()
                && !preconditionReceipt.ownerApprovalBoundary().javaApprovalLedgerWritten()
                && preconditionReceipt.credentialBoundary().credentialHandleReviewRequired()
                && preconditionReceipt.credentialBoundary().credentialHandleNameRecognizedByJava()
                && !preconditionReceipt.credentialBoundary().credentialValueRequiredByJava()
                && !preconditionReceipt.credentialBoundary().credentialValueReadByJava()
                && !preconditionReceipt.credentialBoundary().credentialValueStoredByJava()
                && !preconditionReceipt.credentialBoundary().productionCredentialAllowed()
                && !preconditionReceipt.schemaRehearsalBoundary().schemaMigrationExecutionAllowed()
                && !preconditionReceipt.schemaRehearsalBoundary().schemaMigrationSqlExecutedByJava()
                && !preconditionReceipt.schemaRehearsalBoundary().schemaMigrationAppliedByJava()
                && !preconditionReceipt.rollbackPathBoundary().rollbackExecutionAllowedByJava()
                && !preconditionReceipt.rollbackPathBoundary().restoreExecutionAllowedByJava()
                && !preconditionReceipt.javaExecutionBoundary().approvalDecisionCreatedByJava()
                && !preconditionReceipt.javaExecutionBoundary().approvalLedgerWrittenByJava()
                && !preconditionReceipt.javaExecutionBoundary().approvalRecordPersistedByJava()
                && !preconditionReceipt.javaExecutionBoundary().managedAuditStoreWrittenByJava()
                && !preconditionReceipt.javaExecutionBoundary().externalManagedAuditConnectionOpenedByJava()
                && !preconditionReceipt.javaExecutionBoundary().sqlExecutedByJava()
                && !preconditionReceipt.javaExecutionBoundary().deploymentTriggeredByJava()
                && !preconditionReceipt.javaExecutionBoundary().rollbackTriggeredByJava()
                && !preconditionReceipt.javaExecutionBoundary().restoreExecutedByJava()
                && !preconditionReceipt.javaExecutionBoundary().javaStartsManagedAuditService()
                && !preconditionReceipt.javaExecutionBoundary().nodeAutoStartAllowed()
                && !preconditionReceipt.javaExecutionBoundary().actualConnectionAttemptedByJava();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeFieldBoundary
            envelopeFieldBoundary() {
        return EnvelopeFieldBoundaryFields.nodeV236EnvelopeFields().toBoundary();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeCredentialBoundary
            credentialBoundary() {
        return CredentialBoundaryFlags.handleOnly().toBoundary(CREDENTIAL_HANDLE_NAME_FIELD);
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeExecutionBoundary
            javaExecutionBoundary() {
        return ExecutionBoundaryFlags.noExecutionEffects().toBoundary();
    }

    private static List<String> echoedEnvelopeFieldNames() {
        return List.of(
                OWNER_APPROVAL_ARTIFACT_ID_FIELD,
                CREDENTIAL_HANDLE_NAME_FIELD,
                SCHEMA_REHEARSAL_ID_FIELD,
                ROLLBACK_PATH_ID_FIELD,
                TIMEOUT_BUDGET_FIELD,
                MANUAL_ABORT_MARKER_FIELD
        );
    }

    private static List<String> forbiddenEnvelopeOperations() {
        return List.of(
                "Include a managed audit credential value in the Java v92 dry-run envelope echo",
                "Open a managed audit sandbox connection during Java v92 dry-run envelope echo",
                "Execute schema migration SQL during Java v92 dry-run envelope echo",
                "Write approval ledger or managed audit state during Java v92 dry-run envelope echo",
                "Request mini-kv permission or start Java, mini-kv, or external audit services automatically",
                "Treat this echo receipt as production audit authorization"
        );
    }

    private static List<String> nodeV237Prerequisites() {
        return List.of(
                "Node v236 manual sandbox connection dry-run request envelope must be archived",
                "Java v92 sandbox connection dry-run envelope echo receipt must be present",
                "mini-kv v101 no-start / no-write evidence follow-up must be present",
                "Node v237 must read envelope field names and marker ids only",
                "Credential values, SQL, ledger writes, and service auto-start must remain absent"
        );
    }

    private record EnvelopeFieldBoundaryFields(
            String ownerApprovalArtifactIdField,
            String credentialHandleNameField,
            String schemaRehearsalIdField,
            String rollbackPathIdField,
            String timeoutBudgetField,
            String manualAbortMarkerField,
            boolean ownerApprovalArtifactIdFieldEchoed,
            boolean credentialHandleNameFieldEchoed,
            boolean schemaRehearsalIdFieldEchoed,
            boolean rollbackPathIdFieldEchoed,
            boolean timeoutBudgetFieldEchoed,
            boolean manualAbortMarkerFieldEchoed,
            boolean operatorReviewFieldsComplete,
            boolean dryRunEnvelopeReadOnly,
            boolean envelopeCreatesConnectionCommand
    ) {

        static EnvelopeFieldBoundaryFields nodeV236EnvelopeFields() {
            return new EnvelopeFieldBoundaryFields(
                    OWNER_APPROVAL_ARTIFACT_ID_FIELD,
                    CREDENTIAL_HANDLE_NAME_FIELD,
                    SCHEMA_REHEARSAL_ID_FIELD,
                    ROLLBACK_PATH_ID_FIELD,
                    TIMEOUT_BUDGET_FIELD,
                    MANUAL_ABORT_MARKER_FIELD,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    false
            );
        }

        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeFieldBoundary toBoundary() {
            return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeFieldBoundary(
                    ownerApprovalArtifactIdField,
                    credentialHandleNameField,
                    schemaRehearsalIdField,
                    rollbackPathIdField,
                    timeoutBudgetField,
                    manualAbortMarkerField,
                    ownerApprovalArtifactIdFieldEchoed,
                    credentialHandleNameFieldEchoed,
                    schemaRehearsalIdFieldEchoed,
                    rollbackPathIdFieldEchoed,
                    timeoutBudgetFieldEchoed,
                    manualAbortMarkerFieldEchoed,
                    operatorReviewFieldsComplete,
                    dryRunEnvelopeReadOnly,
                    envelopeCreatesConnectionCommand
            );
        }
    }

    private record CredentialBoundaryFlags(
            boolean credentialHandleOnly,
            boolean credentialValueIncludedInEnvelope,
            boolean credentialValueReadByJava,
            boolean credentialValueStoredByJava,
            boolean productionCredentialAllowed
    ) {

        static CredentialBoundaryFlags handleOnly() {
            return new CredentialBoundaryFlags(true, false, false, false, false);
        }

        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeCredentialBoundary toBoundary(
                String credentialHandleNameField
        ) {
            return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeCredentialBoundary(
                    credentialHandleNameField,
                    credentialHandleOnly,
                    credentialValueIncludedInEnvelope,
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
            boolean approvalLedgerWrittenByJava,
            boolean managedAuditStoreWrittenByJava,
            boolean sqlExecutedByJava,
            boolean deploymentTriggeredByJava,
            boolean rollbackTriggeredByJava,
            boolean restoreExecutedByJava,
            boolean javaStartsManagedAuditService,
            boolean nodeAutoStartAllowed,
            boolean miniKvPermissionRequestedByJava
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
                    false
            );
        }

        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeExecutionBoundary toBoundary() {
            return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunEnvelopeExecutionBoundary(
                    actualConnectionAttemptedByJava,
                    externalManagedAuditConnectionOpenedByJava,
                    schemaMigrationRequestedByJava,
                    schemaMigrationSqlExecutedByJava,
                    approvalLedgerWrittenByJava,
                    managedAuditStoreWrittenByJava,
                    sqlExecutedByJava,
                    deploymentTriggeredByJava,
                    rollbackTriggeredByJava,
                    restoreExecutedByJava,
                    javaStartsManagedAuditService,
                    nodeAutoStartAllowed,
                    miniKvPermissionRequestedByJava
            );
        }
    }
}
