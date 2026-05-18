package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxConnectionPreconditionReceiptBuilder {

    private static final String OWNER_APPROVAL_ARTIFACT_ID_FIELD =
            "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
    private static final String CREDENTIAL_HANDLE_NAME_FIELD =
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
    private static final String SCHEMA_REHEARSAL_ID_FIELD =
            "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID";
    private static final String ROLLBACK_PATH_ID_FIELD =
            "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
    private static final String MANUAL_ABORT_MARKER_FIELD =
            "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
    private static final int TIMEOUT_BUDGET_MS = 15000;

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxConnectionPreconditionReceiptWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxConnectionPreconditionReceiptDigest",
            "sandboxConnectionPreconditionOwnerApprovalArtifactProvidedByJava",
            "sandboxConnectionPreconditionCredentialValueReadByJava",
            "sandboxConnectionPreconditionSchemaMigrationSqlExecutedByJava",
            "sandboxConnectionPreconditionExternalManagedAuditConnectionOpenedByJava",
            "sandboxConnectionPreconditionActualConnectionAttemptedByJava",
            "sandboxConnectionPreconditionNodeAutoStartAllowed"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxConnectionPreconditionReceipt.ownerApprovalBoundary.ownerApprovalArtifactRequired=true",
            "managedAuditSandboxConnectionPreconditionReceipt.credentialBoundary.credentialHandleReviewRequired=true",
            "managedAuditSandboxConnectionPreconditionReceipt.credentialBoundary.credentialValueReadByJava=false",
            "managedAuditSandboxConnectionPreconditionReceipt.schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava=false",
            "managedAuditSandboxConnectionPreconditionReceipt.rollbackPathBoundary.rollbackExecutionAllowedByJava=false",
            "managedAuditSandboxConnectionPreconditionReceipt.javaExecutionBoundary.externalManagedAuditConnectionOpenedByJava=false",
            "managedAuditSandboxConnectionPreconditionReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "managedAuditSandboxConnectionPreconditionReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxConnectionPreconditionReceipt.consumedByNodeBlockedExecutionRehearsalProfile with Node v234",
            "Require managedAuditSandboxConnectionPreconditionReceipt.readyForNodeV235ManualSandboxConnectionPreconditionIntake=true before Node v235",
            "Verify managedAuditSandboxConnectionPreconditionReceipt.requiredPreconditionEvidence contains owner approval artifact, credential handle review, schema rehearsal evidence, rollback path, timeout budget, and abort marker",
            "Keep managedAuditSandboxConnectionPreconditionReceipt.readyForManagedAuditSandboxAdapterConnection=false",
            "Keep managedAuditSandboxConnectionPreconditionReceipt.credentialBoundary.credentialValueReadByJava=false",
            "Keep managedAuditSandboxConnectionPreconditionReceipt.schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava=false",
            "Keep managedAuditSandboxConnectionPreconditionReceipt.javaExecutionBoundary.externalManagedAuditConnectionOpenedByJava=false",
            "Keep managedAuditSandboxConnectionPreconditionReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false"
    );

    ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreconditionReceipt build(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreflightEchoMarker preflightEchoMarker
    ) {
        boolean sourceMarkerAccepted = sourceMarkerAccepted(preflightEchoMarker);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionOwnerApprovalBoundary
                ownerApprovalBoundary = ownerApprovalBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionCredentialBoundary
                credentialBoundary = credentialBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionSchemaBoundary
                schemaRehearsalBoundary = schemaRehearsalBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionRollbackBoundary
                rollbackPathBoundary = rollbackPathBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionExecutionBoundary
                javaExecutionBoundary = javaExecutionBoundary();

        List<String> receiptWarnings = new ArrayList<>();
        if (!sourceMarkerAccepted) {
            receiptWarnings.add("NODE_V235_SOURCE_SANDBOX_CONNECTION_PREFLIGHT_ECHO_MARKER_NOT_READY");
        }

        boolean allPreconditionsDocumented = ownerApprovalBoundary.ownerApprovalArtifactRequired()
                && credentialBoundary.credentialHandleReviewRequired()
                && credentialBoundary.credentialHandleNameRecognizedByJava()
                && schemaRehearsalBoundary.schemaRehearsalEvidenceRequired()
                && rollbackPathBoundary.rollbackPathRequired()
                && rollbackPathBoundary.timeoutBudgetRequired()
                && rollbackPathBoundary.manualAbortMarkerRequired();
        boolean noExecutionEffects = noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                ownerApprovalBoundary,
                credentialBoundary,
                schemaRehearsalBoundary,
                rollbackPathBoundary,
                javaExecutionBoundary
        );
        boolean readyForNodeV235ManualSandboxConnectionPreconditionIntake =
                sourceMarkerAccepted && allPreconditionsDocumented && noExecutionEffects;

        String receiptDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceSandboxConnectionPreflightEchoMarkerVersion",
                        preflightEchoMarker.markerVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceSandboxConnectionPreflightEchoMarkerSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PREFLIGHT_ECHO_MARKER_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeBlockedExecutionRehearsalProfile",
                        OpsEvidenceService.NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("ownerApprovalArtifactIdField", OWNER_APPROVAL_ARTIFACT_ID_FIELD),
                ReleaseApprovalDigestSupport.line("credentialHandleNameField", CREDENTIAL_HANDLE_NAME_FIELD),
                ReleaseApprovalDigestSupport.line("schemaRehearsalIdField", SCHEMA_REHEARSAL_ID_FIELD),
                ReleaseApprovalDigestSupport.line("rollbackPathIdField", ROLLBACK_PATH_ID_FIELD),
                ReleaseApprovalDigestSupport.line("manualAbortMarkerField", MANUAL_ABORT_MARKER_FIELD),
                ReleaseApprovalDigestSupport.line("timeoutBudgetMs", TIMEOUT_BUDGET_MS),
                ReleaseApprovalDigestSupport.line(
                        "credentialValueReadByJava",
                        credentialBoundary.credentialValueReadByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "schemaMigrationSqlExecutedByJava",
                        schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "externalManagedAuditConnectionOpenedByJava",
                        javaExecutionBoundary.externalManagedAuditConnectionOpenedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "actualConnectionAttemptedByJava",
                        javaExecutionBoundary.actualConnectionAttemptedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV235ManualSandboxConnectionPreconditionIntake",
                        readyForNodeV235ManualSandboxConnectionPreconditionIntake
                )
        ));

        return new ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreconditionReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECONDITION_RECEIPT_VERSION,
                preflightEchoMarker.markerVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PREFLIGHT_ECHO_MARKER_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_VERSION,
                OpsEvidenceService.NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_PROFILE,
                OpsEvidenceService.NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_ENDPOINT,
                OpsEvidenceService.NODE_V234_MANUAL_SANDBOX_CONNECTION_BLOCKED_EXECUTION_REHEARSAL_STATE,
                OpsEvidenceService.NODE_V235_MANUAL_SANDBOX_CONNECTION_PRECONDITION_INTAKE_VERSION,
                OpsEvidenceService.NODE_V235_MANUAL_SANDBOX_CONNECTION_PRECONDITION_INTAKE_PROFILE,
                true,
                ownerApprovalBoundary,
                credentialBoundary,
                schemaRehearsalBoundary,
                rollbackPathBoundary,
                javaExecutionBoundary,
                allPreconditionsDocumented,
                readyForNodeV235ManualSandboxConnectionPreconditionIntake,
                false,
                false,
                false,
                false,
                receiptDigest,
                requiredPreconditionEvidence(),
                forbiddenPreconditionOperations(),
                nodeV235Prerequisites(),
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
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreconditionReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxConnectionPreconditionReceiptWarnings",
                        receipt.receiptWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreconditionReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line("sandboxConnectionPreconditionReceiptDigest", receipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPreconditionOwnerApprovalArtifactProvidedByJava",
                        receipt.ownerApprovalBoundary().ownerApprovalArtifactProvidedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPreconditionCredentialValueReadByJava",
                        receipt.credentialBoundary().credentialValueReadByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPreconditionSchemaMigrationSqlExecutedByJava",
                        receipt.schemaRehearsalBoundary().schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPreconditionExternalManagedAuditConnectionOpenedByJava",
                        receipt.javaExecutionBoundary().externalManagedAuditConnectionOpenedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPreconditionActualConnectionAttemptedByJava",
                        receipt.javaExecutionBoundary().actualConnectionAttemptedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPreconditionNodeAutoStartAllowed",
                        receipt.javaExecutionBoundary().nodeAutoStartAllowed()
                )
        );
    }

    boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreconditionReceipt receipt
    ) {
        return noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                receipt.ownerApprovalBoundary(),
                receipt.credentialBoundary(),
                receipt.schemaRehearsalBoundary(),
                receipt.rollbackPathBoundary(),
                receipt.javaExecutionBoundary()
        );
    }

    private boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionOwnerApprovalBoundary
                    ownerApprovalBoundary,
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionCredentialBoundary
                    credentialBoundary,
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionSchemaBoundary
                    schemaRehearsalBoundary,
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionRollbackBoundary
                    rollbackPathBoundary,
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionExecutionBoundary
                    javaExecutionBoundary
    ) {
        return !ownerApprovalBoundary.ownerApprovalArtifactProvidedByJava()
                && !ownerApprovalBoundary.ownerApprovalArtifactReviewedByJava()
                && !ownerApprovalBoundary.javaApprovalDecisionCreated()
                && !ownerApprovalBoundary.javaApprovalLedgerWritten()
                && !credentialBoundary.credentialValueRequiredByJava()
                && !credentialBoundary.credentialValueReadByJava()
                && !credentialBoundary.credentialValueStoredByJava()
                && !credentialBoundary.productionCredentialAllowed()
                && !schemaRehearsalBoundary.schemaMigrationExecutionAllowed()
                && !schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava()
                && !schemaRehearsalBoundary.schemaMigrationAppliedByJava()
                && !rollbackPathBoundary.rollbackExecutionAllowedByJava()
                && !rollbackPathBoundary.restoreExecutionAllowedByJava()
                && !javaExecutionBoundary.approvalDecisionCreatedByJava()
                && !javaExecutionBoundary.approvalLedgerWrittenByJava()
                && !javaExecutionBoundary.approvalRecordPersistedByJava()
                && !javaExecutionBoundary.managedAuditStoreWrittenByJava()
                && !javaExecutionBoundary.externalManagedAuditConnectionOpenedByJava()
                && !javaExecutionBoundary.sqlExecutedByJava()
                && !javaExecutionBoundary.deploymentTriggeredByJava()
                && !javaExecutionBoundary.rollbackTriggeredByJava()
                && !javaExecutionBoundary.restoreExecutedByJava()
                && !javaExecutionBoundary.javaStartsManagedAuditService()
                && !javaExecutionBoundary.nodeAutoStartAllowed()
                && !javaExecutionBoundary.actualConnectionAttemptedByJava();
    }

    private boolean sourceMarkerAccepted(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPreflightEchoMarker marker
    ) {
        return OpsEvidenceService
                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PREFLIGHT_ECHO_MARKER_VERSION
                .equals(marker.markerVersion())
                && marker.readyForNodeV231ManualSandboxConnectionPreflightVerification()
                && !marker.readyForManagedAuditSandboxAdapterConnection()
                && !marker.readyForProductionAudit()
                && !marker.readyForProductionWindow()
                && !marker.nodeMayTreatAsProductionAuditRecord()
                && !marker.sandboxConnectionWindowBoundary().manualWindowOpenByDefault()
                && !marker.sandboxConnectionWindowBoundary().manualWindowOpenedByJava()
                && !marker.sandboxConnectionWindowBoundary().connectionExecutionAllowed()
                && !marker.sandboxConnectionWindowBoundary().nodeAutoStartAllowed()
                && !marker.sandboxConnectionWindowBoundary().javaStartsManagedAuditService()
                && !marker.preflightFieldBoundary().gateCreatesConnectionCommand()
                && !marker.credentialBoundary().credentialValueRequiredByJava()
                && !marker.credentialBoundary().credentialValueReadByJava()
                && !marker.credentialBoundary().credentialValueStoredByJava()
                && !marker.credentialBoundary().productionCredentialAllowed()
                && !marker.schemaRehearsalBoundary().schemaMigrationExecutionAllowed()
                && !marker.schemaRehearsalBoundary().schemaMigrationSqlExecutedByJava()
                && !marker.schemaRehearsalBoundary().schemaMigrationAppliedByJava()
                && !marker.rollbackPathBoundary().rollbackExecutionAllowedByJava()
                && !marker.rollbackPathBoundary().restoreExecutionAllowedByJava()
                && !marker.javaExecutionBoundary().approvalDecisionCreatedByJava()
                && !marker.javaExecutionBoundary().approvalLedgerWrittenByJava()
                && !marker.javaExecutionBoundary().approvalRecordPersistedByJava()
                && !marker.javaExecutionBoundary().managedAuditStoreWrittenByJava()
                && !marker.javaExecutionBoundary().externalManagedAuditConnectionOpenedByJava()
                && !marker.javaExecutionBoundary().sqlExecutedByJava()
                && !marker.javaExecutionBoundary().deploymentTriggeredByJava()
                && !marker.javaExecutionBoundary().rollbackTriggeredByJava()
                && !marker.javaExecutionBoundary().restoreExecutedByJava();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionOwnerApprovalBoundary
            ownerApprovalBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionOwnerApprovalBoundary(
                OWNER_APPROVAL_ARTIFACT_ID_FIELD,
                true,
                false,
                false,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionCredentialBoundary
            credentialBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionCredentialBoundary(
                CREDENTIAL_HANDLE_NAME_FIELD,
                true,
                true,
                false,
                false,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionSchemaBoundary
            schemaRehearsalBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionSchemaBoundary(
                SCHEMA_REHEARSAL_ID_FIELD,
                true,
                false,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionRollbackBoundary
            rollbackPathBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionRollbackBoundary(
                ROLLBACK_PATH_ID_FIELD,
                MANUAL_ABORT_MARKER_FIELD,
                TIMEOUT_BUDGET_MS,
                true,
                true,
                true,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionExecutionBoundary
            javaExecutionBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPreconditionExecutionBoundary(
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

    private static List<String> requiredPreconditionEvidence() {
        return List.of(
                "owner approval artifact id field: " + OWNER_APPROVAL_ARTIFACT_ID_FIELD,
                "credential handle review field: " + CREDENTIAL_HANDLE_NAME_FIELD,
                "schema rehearsal evidence field: " + SCHEMA_REHEARSAL_ID_FIELD,
                "rollback path field: " + ROLLBACK_PATH_ID_FIELD,
                "timeout budget: " + TIMEOUT_BUDGET_MS + "ms",
                "manual abort marker field: " + MANUAL_ABORT_MARKER_FIELD
        );
    }

    private static List<String> forbiddenPreconditionOperations() {
        return List.of(
                "Open a managed audit sandbox connection during Java v91 precondition receipt",
                "Read or print a managed audit credential value during Java v91 precondition receipt",
                "Execute schema migration SQL during Java v91 precondition receipt",
                "Write approval ledger or managed audit state during Java v91 precondition receipt",
                "Trigger deployment, rollback, restore, or managed audit service startup",
                "Treat this receipt as production audit authorization"
        );
    }

    private static List<String> nodeV235Prerequisites() {
        return List.of(
                "Node v234 blocked execution rehearsal must be archived",
                "Java v91 sandbox connection precondition receipt must be present",
                "mini-kv v100 current runtime fixture rolling evidence guard must be present",
                "Node v235 must read owner approval artifact, credential handle review, schema rehearsal evidence, rollback path, timeout budget, and abort marker as handles only",
                "UPSTREAM_ACTIONS_ENABLED must remain false"
        );
    }
}
