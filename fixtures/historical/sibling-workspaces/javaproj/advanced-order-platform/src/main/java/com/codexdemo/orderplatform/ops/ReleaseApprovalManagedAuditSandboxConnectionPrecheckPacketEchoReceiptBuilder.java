package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxConnectionPrecheckPacketEchoReceiptBuilder {

    private static final String OWNER_APPROVAL_ARTIFACT_FIELD =
            "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID";
    private static final String CREDENTIAL_HANDLE_REVIEW_FIELD =
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE_REVIEW";
    private static final String SCHEMA_MIGRATION_REHEARSAL_ID_FIELD =
            "ORDEROPS_MANAGED_AUDIT_SCHEMA_MIGRATION_REHEARSAL_ID";
    private static final String OPERATOR_WINDOW_FIELD =
            "ORDEROPS_MANAGED_AUDIT_OPERATOR_WINDOW";
    private static final String ROLLBACK_PATH_FIELD =
            "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID";
    private static final String ABORT_MARKER_FIELD =
            "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT";
    private static final String TIMEOUT_POLICY_FIELD = "timeoutPolicy";
    private static final String PACKET_MODE =
            "manual-sandbox-connection-read-only-precheck-packet";
    private static final String SOURCE_SPAN = "Node v245 + Java v98 + mini-kv v107";
    private static final int PRECHECK_ITEM_COUNT = 7;
    private static final int TIMEOUT_BUDGET_MS = 15000;

    private static final List<String> ECHOED_PRECHECK_ITEM_IDS = List.of(
            "owner-approval-artifact",
            "credential-handle-review",
            "schema-migration-rehearsal",
            "operator-window",
            "rollback-path",
            "abort-marker",
            "timeout-policy"
    );

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxConnectionPrecheckPacketEchoReceiptWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxConnectionPrecheckPacketEchoReceiptDigest",
            "sandboxConnectionPrecheckPacketPrecheckItemCount",
            "sandboxConnectionPrecheckPacketDisabledByDefault",
            "sandboxConnectionPrecheckPacketDryRunOnly",
            "sandboxConnectionPrecheckPacketCarriesCredentialValue",
            "sandboxConnectionPrecheckPacketCredentialValueReadByJava",
            "sandboxConnectionPrecheckPacketActualConnectionAttemptedByJava",
            "sandboxConnectionPrecheckPacketSchemaMigrationSqlExecutedByJava",
            "sandboxConnectionPrecheckPacketApprovalLedgerWrittenByJava",
            "sandboxConnectionPrecheckPacketManagedAuditStateWriteRequestedByJava",
            "sandboxConnectionPrecheckPacketUpstreamServiceAutoStartRequestedByJava",
            "sandboxConnectionPrecheckPacketMiniKvWritePermissionRequestedByJava"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.packetShape.precheckItemCount=7",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.packetShape.disabledByDefault=true",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.packetShape.dryRunOnly=true",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.fieldEcho.credentialValueEchoed=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.carriesCredentialValue=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.credentialValueReadByJava=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.schemaMigrationSqlExecutedByJava=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.managedAuditStateWriteRequestedByJava=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.upstreamServiceAutoStartRequestedByJava=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.miniKvWritePermissionRequestedByJava=false",
            "managedAuditSandboxConnectionPrecheckPacketEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxConnectionPrecheckPacketEchoReceipt.consumedByNodePrecheckPacketProfile with Node v245",
            "Require managedAuditSandboxConnectionPrecheckPacketEchoReceipt.readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification=true before Node v246",
            "Verify managedAuditSandboxConnectionPrecheckPacketEchoReceipt.echoedPrecheckItemIds contains the seven Node v245 precheck items",
            "Keep managedAuditSandboxConnectionPrecheckPacketEchoReceipt.packetShape.disabledByDefault=true",
            "Keep managedAuditSandboxConnectionPrecheckPacketEchoReceipt.packetShape.dryRunOnly=true",
            "Keep managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.carriesCredentialValue=false",
            "Keep managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "Keep managedAuditSandboxConnectionPrecheckPacketEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false"
    );

    ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionPrecheckPacketEchoReceipt build(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceipt
                    dryRunCommandPackageEchoReceipt
    ) {
        boolean sourceReceiptAccepted = sourceReceiptAccepted(dryRunCommandPackageEchoReceipt);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketShape packetShape =
                packetShape();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketFieldEcho fieldEcho =
                fieldEcho();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketExecutionBoundary
                javaExecutionBoundary = javaExecutionBoundary();

        List<String> receiptWarnings = new ArrayList<>();
        if (!sourceReceiptAccepted) {
            receiptWarnings.add("NODE_V246_SOURCE_DRY_RUN_COMMAND_PACKAGE_ECHO_RECEIPT_NOT_READY");
        }

        boolean packetShapeEchoed = packetShapeEchoed(packetShape);
        boolean fieldEchoComplete = fieldEchoComplete(fieldEcho);
        boolean readOnlyPrecheckBoundaryEchoed = noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                javaExecutionBoundary
        );
        boolean readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification =
                sourceReceiptAccepted
                        && packetShapeEchoed
                        && fieldEchoComplete
                        && readOnlyPrecheckBoundaryEchoed;

        String receiptDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECHECK_PACKET_ECHO_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceDryRunCommandPackageEchoReceiptVersion",
                        dryRunCommandPackageEchoReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceDryRunCommandPackageEchoReceiptSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_ECHO_RECEIPT_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodePrecheckPacketProfile",
                        OpsEvidenceService.NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("packetMode", packetShape.packetMode()),
                ReleaseApprovalDigestSupport.line("sourceSpan", packetShape.sourceSpan()),
                ReleaseApprovalDigestSupport.line("precheckItemCount", packetShape.precheckItemCount()),
                ReleaseApprovalDigestSupport.line("disabledByDefault", packetShape.disabledByDefault()),
                ReleaseApprovalDigestSupport.line("dryRunOnly", packetShape.dryRunOnly()),
                ReleaseApprovalDigestSupport.line("echoedPrecheckItemIds", ECHOED_PRECHECK_ITEM_IDS),
                ReleaseApprovalDigestSupport.line(
                        "ownerApprovalArtifactField",
                        fieldEcho.ownerApprovalArtifactField()
                ),
                ReleaseApprovalDigestSupport.line(
                        "credentialHandleReviewField",
                        fieldEcho.credentialHandleReviewField()
                ),
                ReleaseApprovalDigestSupport.line(
                        "schemaMigrationRehearsalIdField",
                        fieldEcho.schemaMigrationRehearsalIdField()
                ),
                ReleaseApprovalDigestSupport.line("operatorWindowField", fieldEcho.operatorWindowField()),
                ReleaseApprovalDigestSupport.line("rollbackPathField", fieldEcho.rollbackPathField()),
                ReleaseApprovalDigestSupport.line("abortMarkerField", fieldEcho.abortMarkerField()),
                ReleaseApprovalDigestSupport.line("timeoutPolicyField", fieldEcho.timeoutPolicyField()),
                ReleaseApprovalDigestSupport.line("timeoutBudgetMs", fieldEcho.timeoutBudgetMs()),
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
                        "readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification",
                        readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification
                )
        ));

        return new ReleaseApprovalRehearsalResponse
                .RehearsalManagedAuditSandboxConnectionPrecheckPacketEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECHECK_PACKET_ECHO_RECEIPT_VERSION,
                dryRunCommandPackageEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DRY_RUN_COMMAND_PACKAGE_ECHO_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_VERSION,
                OpsEvidenceService.NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_PROFILE,
                OpsEvidenceService.NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_ENDPOINT,
                OpsEvidenceService.NODE_V245_MANUAL_SANDBOX_CONNECTION_PRECHECK_PACKET_STATE,
                OpsEvidenceService
                        .NODE_V246_MANUAL_SANDBOX_CONNECTION_PRECHECK_UPSTREAM_RECEIPT_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V246_MANUAL_SANDBOX_CONNECTION_PRECHECK_UPSTREAM_RECEIPT_VERIFICATION_PROFILE,
                true,
                packetShape,
                fieldEcho,
                javaExecutionBoundary,
                packetShapeEchoed,
                fieldEchoComplete,
                readOnlyPrecheckBoundaryEchoed,
                readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification,
                false,
                false,
                false,
                false,
                receiptDigest,
                ECHOED_PRECHECK_ITEM_IDS,
                echoedPrecheckPacketFields(),
                forbiddenPrecheckPacketOperations(),
                nodeV246Prerequisites(),
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
                    .RehearsalManagedAuditSandboxConnectionPrecheckPacketEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxConnectionPrecheckPacketEchoReceiptWarnings",
                        receipt.receiptWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionPrecheckPacketEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketPrecheckItemCount",
                        receipt.packetShape().precheckItemCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketDisabledByDefault",
                        receipt.packetShape().disabledByDefault()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketDryRunOnly",
                        receipt.packetShape().dryRunOnly()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketCarriesCredentialValue",
                        receipt.javaExecutionBoundary().carriesCredentialValue()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketCredentialValueReadByJava",
                        receipt.javaExecutionBoundary().credentialValueReadByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketActualConnectionAttemptedByJava",
                        receipt.javaExecutionBoundary().actualConnectionAttemptedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketSchemaMigrationSqlExecutedByJava",
                        receipt.javaExecutionBoundary().schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketApprovalLedgerWrittenByJava",
                        receipt.javaExecutionBoundary().approvalLedgerWrittenByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketManagedAuditStateWriteRequestedByJava",
                        receipt.javaExecutionBoundary().managedAuditStateWriteRequestedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketUpstreamServiceAutoStartRequestedByJava",
                        receipt.javaExecutionBoundary().upstreamServiceAutoStartRequestedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionPrecheckPacketMiniKvWritePermissionRequestedByJava",
                        receipt.javaExecutionBoundary().miniKvWritePermissionRequestedByJava()
                )
        );
    }

    boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionPrecheckPacketEchoReceipt receipt
    ) {
        return noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(receipt.javaExecutionBoundary())
                && receipt.packetShape().disabledByDefault()
                && receipt.packetShape().dryRunOnly()
                && !receipt.packetShape().packetCreatesConnectionCommand()
                && !receipt.fieldEcho().credentialValueEchoed()
                && !receipt.readyForManagedAuditSandboxAdapterConnection()
                && !receipt.readyForProductionAudit()
                && !receipt.readyForProductionWindow()
                && !receipt.nodeMayTreatAsProductionAuditRecord();
    }

    private static boolean sourceReceiptAccepted(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionDryRunCommandPackageEchoReceipt receipt
    ) {
        return receipt.readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification()
                && receipt.receiptWarnings().isEmpty()
                && receipt.commandShapeEchoed()
                && receipt.fieldEchoComplete()
                && receipt.disabledDryRunBoundaryEchoed()
                && !receipt.readyForManagedAuditSandboxAdapterConnection();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketShape packetShape() {
        PrecheckPacketShapeFlags flags = PrecheckPacketShapeFlags.disabledDryRunReviewOnly();
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketShape(
                PACKET_MODE,
                SOURCE_SPAN,
                PRECHECK_ITEM_COUNT,
                flags.disabledByDefault(),
                flags.dryRunOnly(),
                flags.readOnlyPrecheckPacket(),
                flags.operatorReviewRequiredForEveryItem(),
                flags.readyForOperatorReview(),
                flags.packetCreatesConnectionCommand()
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketFieldEcho fieldEcho() {
        PrecheckPacketFieldEchoFlags flags = PrecheckPacketFieldEchoFlags.fieldsOnlyNoCredentialValue();
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketFieldEcho(
                "owner-approval-artifact",
                "credential-handle-review",
                "schema-migration-rehearsal",
                "operator-window",
                "rollback-path",
                "abort-marker",
                "timeout-policy",
                OWNER_APPROVAL_ARTIFACT_FIELD,
                CREDENTIAL_HANDLE_REVIEW_FIELD,
                SCHEMA_MIGRATION_REHEARSAL_ID_FIELD,
                OPERATOR_WINDOW_FIELD,
                ROLLBACK_PATH_FIELD,
                ABORT_MARKER_FIELD,
                TIMEOUT_POLICY_FIELD,
                TIMEOUT_BUDGET_MS,
                flags.ownerApprovalArtifactEchoed(),
                flags.credentialHandleReviewEchoed(),
                flags.schemaMigrationRehearsalEchoed(),
                flags.operatorWindowEchoed(),
                flags.rollbackPathEchoed(),
                flags.abortMarkerEchoed(),
                flags.timeoutPolicyEchoed(),
                flags.credentialValueEchoed()
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketExecutionBoundary
    javaExecutionBoundary() {
        PrecheckPacketExecutionBoundaryFlags flags = PrecheckPacketExecutionBoundaryFlags.allBlocked();
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketExecutionBoundary(
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

    private static boolean packetShapeEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketShape packetShape
    ) {
        return PACKET_MODE.equals(packetShape.packetMode())
                && SOURCE_SPAN.equals(packetShape.sourceSpan())
                && packetShape.precheckItemCount() == PRECHECK_ITEM_COUNT
                && packetShape.disabledByDefault()
                && packetShape.dryRunOnly()
                && packetShape.readOnlyPrecheckPacket()
                && packetShape.operatorReviewRequiredForEveryItem()
                && packetShape.readyForOperatorReview()
                && !packetShape.packetCreatesConnectionCommand();
    }

    private static boolean fieldEchoComplete(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionPrecheckPacketFieldEcho fieldEcho
    ) {
        return "owner-approval-artifact".equals(fieldEcho.ownerApprovalArtifactItemId())
                && "credential-handle-review".equals(fieldEcho.credentialHandleReviewItemId())
                && "schema-migration-rehearsal".equals(fieldEcho.schemaMigrationRehearsalItemId())
                && "operator-window".equals(fieldEcho.operatorWindowItemId())
                && "rollback-path".equals(fieldEcho.rollbackPathItemId())
                && "abort-marker".equals(fieldEcho.abortMarkerItemId())
                && "timeout-policy".equals(fieldEcho.timeoutPolicyItemId())
                && OWNER_APPROVAL_ARTIFACT_FIELD.equals(fieldEcho.ownerApprovalArtifactField())
                && CREDENTIAL_HANDLE_REVIEW_FIELD.equals(fieldEcho.credentialHandleReviewField())
                && SCHEMA_MIGRATION_REHEARSAL_ID_FIELD.equals(fieldEcho.schemaMigrationRehearsalIdField())
                && OPERATOR_WINDOW_FIELD.equals(fieldEcho.operatorWindowField())
                && ROLLBACK_PATH_FIELD.equals(fieldEcho.rollbackPathField())
                && ABORT_MARKER_FIELD.equals(fieldEcho.abortMarkerField())
                && TIMEOUT_POLICY_FIELD.equals(fieldEcho.timeoutPolicyField())
                && fieldEcho.timeoutBudgetMs() == TIMEOUT_BUDGET_MS
                && fieldEcho.ownerApprovalArtifactEchoed()
                && fieldEcho.credentialHandleReviewEchoed()
                && fieldEcho.schemaMigrationRehearsalEchoed()
                && fieldEcho.operatorWindowEchoed()
                && fieldEcho.rollbackPathEchoed()
                && fieldEcho.abortMarkerEchoed()
                && fieldEcho.timeoutPolicyEchoed()
                && !fieldEcho.credentialValueEchoed();
    }

    private static boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionPrecheckPacketExecutionBoundary javaExecutionBoundary
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

    private static List<String> echoedPrecheckPacketFields() {
        return List.of(
                "precheckItemCount",
                "disabledByDefault",
                "dryRunOnly",
                "ownerApprovalArtifactField",
                "credentialHandleReviewField",
                "schemaMigrationRehearsalIdField",
                "operatorWindowField",
                "rollbackPathField",
                "abortMarkerField",
                "timeoutPolicyField"
        );
    }

    private static List<String> forbiddenPrecheckPacketOperations() {
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

    private static List<String> nodeV246Prerequisites() {
        return List.of(
                "Node v245 precheck packet is ready",
                "Java v99 precheck packet echo receipt is present",
                "mini-kv v108 non-participation receipt is present",
                "UPSTREAM_ACTIONS_ENABLED remains false"
        );
    }

    private record PrecheckPacketShapeFlags(
            boolean disabledByDefault,
            boolean dryRunOnly,
            boolean readOnlyPrecheckPacket,
            boolean operatorReviewRequiredForEveryItem,
            boolean readyForOperatorReview,
            boolean packetCreatesConnectionCommand
    ) {

        private static PrecheckPacketShapeFlags disabledDryRunReviewOnly() {
            return new PrecheckPacketShapeFlags(true, true, true, true, true, false);
        }
    }

    private record PrecheckPacketFieldEchoFlags(
            boolean ownerApprovalArtifactEchoed,
            boolean credentialHandleReviewEchoed,
            boolean schemaMigrationRehearsalEchoed,
            boolean operatorWindowEchoed,
            boolean rollbackPathEchoed,
            boolean abortMarkerEchoed,
            boolean timeoutPolicyEchoed,
            boolean credentialValueEchoed
    ) {

        private static PrecheckPacketFieldEchoFlags fieldsOnlyNoCredentialValue() {
            return new PrecheckPacketFieldEchoFlags(true, true, true, true, true, true, true, false);
        }
    }

    private record PrecheckPacketExecutionBoundaryFlags(
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

        private static PrecheckPacketExecutionBoundaryFlags allBlocked() {
            return new PrecheckPacketExecutionBoundaryFlags(
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
