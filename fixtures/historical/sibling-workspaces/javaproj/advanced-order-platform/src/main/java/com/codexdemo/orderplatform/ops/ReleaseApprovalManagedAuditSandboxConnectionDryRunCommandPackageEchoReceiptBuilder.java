package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceiptBuilder {

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
    private static final String PACKAGE_MODE =
            "manual-sandbox-connection-disabled-dry-run-command-package";
    private static final String SOURCE_SPAN = "Node v239 + Node v240 + Java v97 + mini-kv v106";
    private static final int COMMAND_COUNT = 6;
    private static final int TIMEOUT_BUDGET_MS = 15000;

    private static final List<String> ECHOED_COMMAND_IDS = List.of(
            "review-owner-approval-artifact",
            "verify-credential-handle",
            "review-schema-rehearsal",
            "review-rollback-path",
            "confirm-timeout-budget",
            "confirm-manual-abort-marker"
    );

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceiptWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxConnectionDryRunCommandPackageEchoReceiptDigest",
            "sandboxConnectionDryRunCommandPackageCommandCount",
            "sandboxConnectionDryRunCommandPackageDisabledByDefault",
            "sandboxConnectionDryRunCommandPackageDryRunOnly",
            "sandboxConnectionDryRunCommandPackageCarriesCredentialValue",
            "sandboxConnectionDryRunCommandPackageCredentialValueReadByJava",
            "sandboxConnectionDryRunCommandPackageActualConnectionAttemptedByJava",
            "sandboxConnectionDryRunCommandPackageSchemaMigrationSqlExecutedByJava",
            "sandboxConnectionDryRunCommandPackageApprovalLedgerWrittenByJava",
            "sandboxConnectionDryRunCommandPackageManagedAuditStateWriteRequestedByJava",
            "sandboxConnectionDryRunCommandPackageUpstreamServiceAutoStartRequestedByJava",
            "sandboxConnectionDryRunCommandPackageMiniKvWritePermissionRequestedByJava"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.packageShape.commandCount=6",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.packageShape.disabledByDefault=true",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.packageShape.dryRunOnly=true",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.fieldEcho.credentialValueEchoed=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.carriesCredentialValue=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.credentialValueReadByJava=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.schemaMigrationSqlExecutedByJava=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.managedAuditStateWriteRequestedByJava=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.upstreamServiceAutoStartRequestedByJava=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.miniKvWritePermissionRequestedByJava=false",
            "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.consumedByNodeDryRunCommandPackageProfile with Node v241",
            "Require managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification=true before Node v244",
            "Verify managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.echoedCommandIds contains the six Node v241 disabled commands",
            "Keep managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.packageShape.disabledByDefault=true",
            "Keep managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.packageShape.dryRunOnly=true",
            "Keep managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.carriesCredentialValue=false",
            "Keep managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "Keep managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false"
    );

    ReleaseApprovalRehearsalResponse
            .RehearsalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceipt build(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt
                    operatorWindowChecklistEchoReceipt
    ) {
        boolean sourceReceiptAccepted = sourceReceiptAccepted(operatorWindowChecklistEchoReceipt);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageShape packageShape =
                packageShape();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageFieldEcho fieldEcho =
                fieldEcho();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageExecutionBoundary
                javaExecutionBoundary = javaExecutionBoundary();

        List<String> receiptWarnings = new ArrayList<>();
        if (!sourceReceiptAccepted) {
            receiptWarnings.add("NODE_V244_SOURCE_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ECHO_RECEIPT_NOT_READY");
        }

        boolean commandShapeEchoed = commandShapeEchoed(packageShape);
        boolean fieldEchoComplete = fieldEchoComplete(fieldEcho);
        boolean disabledDryRunBoundaryEchoed = noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                javaExecutionBoundary
        );
        boolean readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification =
                sourceReceiptAccepted
                        && commandShapeEchoed
                        && fieldEchoComplete
                        && disabledDryRunBoundaryEchoed;

        String receiptDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_ECHO_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceSandboxConnectionOperatorWindowChecklistEchoReceiptVersion",
                        operatorWindowChecklistEchoReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceSandboxConnectionOperatorWindowChecklistEchoReceiptSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ECHO_RECEIPT_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeDryRunCommandPackageProfile",
                        OpsEvidenceService.NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("packageMode", packageShape.packageMode()),
                ReleaseApprovalDigestSupport.line("sourceSpan", packageShape.sourceSpan()),
                ReleaseApprovalDigestSupport.line("commandCount", packageShape.commandCount()),
                ReleaseApprovalDigestSupport.line("disabledByDefault", packageShape.disabledByDefault()),
                ReleaseApprovalDigestSupport.line("dryRunOnly", packageShape.dryRunOnly()),
                ReleaseApprovalDigestSupport.line("echoedCommandIds", ECHOED_COMMAND_IDS),
                ReleaseApprovalDigestSupport.line(
                        "credentialHandleNameField",
                        fieldEcho.credentialHandleNameField()
                ),
                ReleaseApprovalDigestSupport.line(
                        "schemaRehearsalIdField",
                        fieldEcho.schemaRehearsalIdField()
                ),
                ReleaseApprovalDigestSupport.line("rollbackPathIdField", fieldEcho.rollbackPathIdField()),
                ReleaseApprovalDigestSupport.line("timeoutBudgetMs", fieldEcho.timeoutBudgetMs()),
                ReleaseApprovalDigestSupport.line("manualAbortMarkerField", fieldEcho.manualAbortMarkerField()),
                ReleaseApprovalDigestSupport.line("carriesCredentialValue", javaExecutionBoundary.carriesCredentialValue()),
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
                        "readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification",
                        readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification
                )
        ));

        return new ReleaseApprovalRehearsalResponse
                .RehearsalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_ECHO_RECEIPT_VERSION,
                operatorWindowChecklistEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_OPERATOR_WINDOW_CHECKLIST_ECHO_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_VERSION,
                OpsEvidenceService.NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_PROFILE,
                OpsEvidenceService.NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_ENDPOINT,
                OpsEvidenceService.NODE_V241_MANUAL_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_STATE,
                OpsEvidenceService.NODE_V244_MANUAL_SANDBOX_DRY_RUN_COMMAND_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V244_MANUAL_SANDBOX_DRY_RUN_COMMAND_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                packageShape,
                fieldEcho,
                javaExecutionBoundary,
                commandShapeEchoed,
                fieldEchoComplete,
                disabledDryRunBoundaryEchoed,
                readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification,
                false,
                false,
                false,
                false,
                receiptDigest,
                ECHOED_COMMAND_IDS,
                echoedCommandPackageFields(),
                forbiddenCommandPackageOperations(),
                nodeV244Prerequisites(),
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
                    .RehearsalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxConnectionDryRunCommandPackageEchoReceiptWarnings",
                        receipt.receiptWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageCommandCount",
                        receipt.packageShape().commandCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageDisabledByDefault",
                        receipt.packageShape().disabledByDefault()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageDryRunOnly",
                        receipt.packageShape().dryRunOnly()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageCarriesCredentialValue",
                        receipt.javaExecutionBoundary().carriesCredentialValue()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageCredentialValueReadByJava",
                        receipt.javaExecutionBoundary().credentialValueReadByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageActualConnectionAttemptedByJava",
                        receipt.javaExecutionBoundary().actualConnectionAttemptedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageSchemaMigrationSqlExecutedByJava",
                        receipt.javaExecutionBoundary().schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageApprovalLedgerWrittenByJava",
                        receipt.javaExecutionBoundary().approvalLedgerWrittenByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageManagedAuditStateWriteRequestedByJava",
                        receipt.javaExecutionBoundary().managedAuditStateWriteRequestedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageUpstreamServiceAutoStartRequestedByJava",
                        receipt.javaExecutionBoundary().upstreamServiceAutoStartRequestedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDryRunCommandPackageMiniKvWritePermissionRequestedByJava",
                        receipt.javaExecutionBoundary().miniKvWritePermissionRequestedByJava()
                )
        );
    }

    boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceipt receipt
    ) {
        return noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(receipt.javaExecutionBoundary())
                && receipt.packageShape().disabledByDefault()
                && receipt.packageShape().dryRunOnly()
                && !receipt.packageShape().packageCreatesConnectionCommand()
                && !receipt.fieldEcho().credentialValueEchoed()
                && !receipt.readyForManagedAuditSandboxAdapterConnection()
                && !receipt.readyForProductionAudit()
                && !receipt.readyForProductionWindow()
                && !receipt.nodeMayTreatAsProductionAuditRecord();
    }

    private static boolean sourceReceiptAccepted(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionOperatorWindowChecklistEchoReceipt receipt
    ) {
        return receipt.readyForNodeV239ManualSandboxConnectionEvidenceVerification()
                && receipt.receiptWarnings().isEmpty()
                && receipt.allChecklistFieldsEchoed()
                && receipt.credentialValueExcluded()
                && !receipt.readyForManagedAuditSandboxAdapterConnection();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageShape
    packageShape() {
        CommandPackageShapeFlags flags = CommandPackageShapeFlags.disabledDryRunReviewOnly();
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageShape(
                PACKAGE_MODE,
                SOURCE_SPAN,
                COMMAND_COUNT,
                flags.disabledByDefault(),
                flags.dryRunOnly(),
                flags.readOnlyCommandPackage(),
                flags.operatorReviewRequiredForEveryCommand(),
                flags.readyForOperatorReview(),
                flags.packageCreatesConnectionCommand()
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageFieldEcho
    fieldEcho() {
        CommandPackageFieldEchoFlags flags = CommandPackageFieldEchoFlags.fieldsOnlyNoCredentialValue();
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageFieldEcho(
                "review-owner-approval-artifact",
                "verify-credential-handle",
                "review-schema-rehearsal",
                "review-rollback-path",
                "confirm-timeout-budget",
                "confirm-manual-abort-marker",
                CREDENTIAL_HANDLE_NAME_FIELD,
                SCHEMA_REHEARSAL_ID_FIELD,
                ROLLBACK_PATH_ID_FIELD,
                TIMEOUT_BUDGET_FIELD,
                TIMEOUT_BUDGET_MS,
                MANUAL_ABORT_MARKER_FIELD,
                flags.credentialHandleEchoed(),
                flags.schemaRehearsalIdEchoed(),
                flags.rollbackPathEchoed(),
                flags.timeoutBudgetEchoed(),
                flags.manualAbortMarkerEchoed(),
                flags.credentialValueEchoed()
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageExecutionBoundary
    javaExecutionBoundary() {
        CommandPackageExecutionBoundaryFlags flags = CommandPackageExecutionBoundaryFlags.allBlocked();
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxConnectionDryRunCommandPackageExecutionBoundary(
                flags.carriesCredentialValue(),
                flags.credentialValueReadByJava(),
                flags.credentialValueStoredByJava(),
                flags.actualConnectionAttemptedByJava(),
                flags.externalManagedAuditConnectionOpenedByJava(),
                flags.schemaMigrationRequestedByJava(),
                flags.schemaMigrationSqlExecutedByJava(),
                flags.approvalLedgerWrittenByJava(),
                flags.managedAuditStateWriteRequestedByJava(),
                flags.managedAuditStoreWrittenByJava(),
                flags.sqlExecutedByJava(),
                flags.deploymentTriggeredByJava(),
                flags.rollbackTriggeredByJava(),
                flags.restoreExecutedByJava(),
                flags.upstreamServiceAutoStartRequestedByJava(),
                flags.miniKvWritePermissionRequestedByJava(),
                flags.productionWindowOpenedByJava()
        );
    }

    private static boolean commandShapeEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageShape packageShape
    ) {
        return PACKAGE_MODE.equals(packageShape.packageMode())
                && SOURCE_SPAN.equals(packageShape.sourceSpan())
                && packageShape.commandCount() == COMMAND_COUNT
                && packageShape.disabledByDefault()
                && packageShape.dryRunOnly()
                && packageShape.readOnlyCommandPackage()
                && packageShape.operatorReviewRequiredForEveryCommand()
                && packageShape.readyForOperatorReview()
                && !packageShape.packageCreatesConnectionCommand();
    }

    private static boolean fieldEchoComplete(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDryRunCommandPackageFieldEcho fieldEcho
    ) {
        return "review-owner-approval-artifact".equals(fieldEcho.ownerApprovalArtifactCommandId())
                && "verify-credential-handle".equals(fieldEcho.credentialHandleCommandId())
                && "review-schema-rehearsal".equals(fieldEcho.schemaRehearsalCommandId())
                && "review-rollback-path".equals(fieldEcho.rollbackPathCommandId())
                && "confirm-timeout-budget".equals(fieldEcho.timeoutBudgetCommandId())
                && "confirm-manual-abort-marker".equals(fieldEcho.manualAbortCommandId())
                && CREDENTIAL_HANDLE_NAME_FIELD.equals(fieldEcho.credentialHandleNameField())
                && SCHEMA_REHEARSAL_ID_FIELD.equals(fieldEcho.schemaRehearsalIdField())
                && ROLLBACK_PATH_ID_FIELD.equals(fieldEcho.rollbackPathIdField())
                && TIMEOUT_BUDGET_FIELD.equals(fieldEcho.timeoutBudgetField())
                && fieldEcho.timeoutBudgetMs() == TIMEOUT_BUDGET_MS
                && MANUAL_ABORT_MARKER_FIELD.equals(fieldEcho.manualAbortMarkerField())
                && fieldEcho.credentialHandleEchoed()
                && fieldEcho.schemaRehearsalIdEchoed()
                && fieldEcho.rollbackPathEchoed()
                && fieldEcho.timeoutBudgetEchoed()
                && fieldEcho.manualAbortMarkerEchoed()
                && !fieldEcho.credentialValueEchoed();
    }

    private static boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionDryRunCommandPackageExecutionBoundary javaExecutionBoundary
    ) {
        return !javaExecutionBoundary.carriesCredentialValue()
                && !javaExecutionBoundary.credentialValueReadByJava()
                && !javaExecutionBoundary.credentialValueStoredByJava()
                && !javaExecutionBoundary.actualConnectionAttemptedByJava()
                && !javaExecutionBoundary.externalManagedAuditConnectionOpenedByJava()
                && !javaExecutionBoundary.schemaMigrationRequestedByJava()
                && !javaExecutionBoundary.schemaMigrationSqlExecutedByJava()
                && !javaExecutionBoundary.approvalLedgerWrittenByJava()
                && !javaExecutionBoundary.managedAuditStateWriteRequestedByJava()
                && !javaExecutionBoundary.managedAuditStoreWrittenByJava()
                && !javaExecutionBoundary.sqlExecutedByJava()
                && !javaExecutionBoundary.deploymentTriggeredByJava()
                && !javaExecutionBoundary.rollbackTriggeredByJava()
                && !javaExecutionBoundary.restoreExecutedByJava()
                && !javaExecutionBoundary.upstreamServiceAutoStartRequestedByJava()
                && !javaExecutionBoundary.miniKvWritePermissionRequestedByJava()
                && !javaExecutionBoundary.productionWindowOpenedByJava();
    }

    private static List<String> echoedCommandPackageFields() {
        return List.of(
                "commandCount",
                "disabledByDefault",
                "dryRunOnly",
                "credentialHandleNameField",
                "schemaRehearsalIdField",
                "rollbackPathIdField",
                "timeoutBudgetMs",
                "manualAbortMarkerField"
        );
    }

    private static List<String> forbiddenCommandPackageOperations() {
        return List.of(
                "read credential value",
                "open managed audit sandbox connection",
                "execute schema migration SQL",
                "write approval ledger",
                "write managed audit state",
                "start Java, mini-kv, or external audit service",
                "request mini-kv write permission",
                "open production window"
        );
    }

    private static List<String> nodeV244Prerequisites() {
        return List.of(
                "Node v241 command package verification report is ready",
                "Java v98 command echo receipt is present",
                "mini-kv v107 non-participation receipt is present",
                "UPSTREAM_ACTIONS_ENABLED remains false"
        );
    }

    private record CommandPackageShapeFlags(
            boolean disabledByDefault,
            boolean dryRunOnly,
            boolean readOnlyCommandPackage,
            boolean operatorReviewRequiredForEveryCommand,
            boolean readyForOperatorReview,
            boolean packageCreatesConnectionCommand
    ) {

        private static CommandPackageShapeFlags disabledDryRunReviewOnly() {
            return new CommandPackageShapeFlags(true, true, true, true, true, false);
        }
    }

    private record CommandPackageFieldEchoFlags(
            boolean credentialHandleEchoed,
            boolean schemaRehearsalIdEchoed,
            boolean rollbackPathEchoed,
            boolean timeoutBudgetEchoed,
            boolean manualAbortMarkerEchoed,
            boolean credentialValueEchoed
    ) {

        private static CommandPackageFieldEchoFlags fieldsOnlyNoCredentialValue() {
            return new CommandPackageFieldEchoFlags(true, true, true, true, true, false);
        }
    }

    private record CommandPackageExecutionBoundaryFlags(
            boolean carriesCredentialValue,
            boolean credentialValueReadByJava,
            boolean credentialValueStoredByJava,
            boolean actualConnectionAttemptedByJava,
            boolean externalManagedAuditConnectionOpenedByJava,
            boolean schemaMigrationRequestedByJava,
            boolean schemaMigrationSqlExecutedByJava,
            boolean approvalLedgerWrittenByJava,
            boolean managedAuditStateWriteRequestedByJava,
            boolean managedAuditStoreWrittenByJava,
            boolean sqlExecutedByJava,
            boolean deploymentTriggeredByJava,
            boolean rollbackTriggeredByJava,
            boolean restoreExecutedByJava,
            boolean upstreamServiceAutoStartRequestedByJava,
            boolean miniKvWritePermissionRequestedByJava,
            boolean productionWindowOpenedByJava
    ) {

        private static CommandPackageExecutionBoundaryFlags allBlocked() {
            return new CommandPackageExecutionBoundaryFlags(
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
    }
}
