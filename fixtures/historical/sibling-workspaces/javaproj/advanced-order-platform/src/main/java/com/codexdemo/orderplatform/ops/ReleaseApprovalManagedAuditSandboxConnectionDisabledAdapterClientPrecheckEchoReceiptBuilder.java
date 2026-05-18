package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceiptBuilder {

    private static final String ADAPTER_MODE = "disabled-client-precheck-only";
    private static final String CLIENT_IMPLEMENTATION_STATUS = "not-implemented";
    private static final String PRECHECK_STATE = "disabled-adapter-client-precheck-ready";
    private static final String SOURCE_SPAN = "Node v251 + Node v252 + Node v253";
    private static final int REQUIRED_ENV_HANDLE_COUNT = 5;
    private static final int FAILURE_CLASS_COUNT = 6;
    private static final int DRY_RUN_RESPONSE_FIELD_COUNT = 10;
    private static final int REUSED_NO_GO_CONDITION_COUNT = 8;

    private static final List<String> REQUIRED_ENV_HANDLES = List.of(
            "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED",
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
            "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID",
            "ORDEROPS_MANAGED_AUDIT_TIMEOUT_BUDGET_MS"
    );

    private static final List<String> FAILURE_CLASS_CODES = List.of(
            "ADAPTER_CLIENT_DISABLED",
            "CREDENTIAL_HANDLE_MISSING",
            "CREDENTIAL_VALUE_REQUESTED",
            "ENDPOINT_HANDLE_MISSING",
            "SCHEMA_REHEARSAL_MISSING",
            "MANUAL_WINDOW_NOT_OPEN"
    );

    private static final List<String> DRY_RUN_RESPONSE_FIELDS = List.of(
            "profileVersion",
            "precheckState",
            "adapterMode",
            "optInGate",
            "requiredEnvHandles",
            "failureTaxonomy",
            "connectionAttempted",
            "credentialValueRead",
            "externalRequestSent",
            "schemaMigrationExecuted"
    );

    private static final List<String> REUSED_NO_GO_CONDITIONS = List.of(
            "CREDENTIAL_VALUE_REQUIRED",
            "SCHEMA_MIGRATION_REQUIRED",
            "UPSTREAM_AUTO_START_REQUIRED",
            "APPROVAL_LEDGER_WRITE_REQUIRED",
            "MINI_KV_STORAGE_BACKEND_REQUIRED",
            "OWNER_ARTIFACT_MISSING",
            "ROLLBACK_OR_ABORT_MISSING",
            "TIMEOUT_POLICY_MISSING"
    );

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceiptWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxConnectionDisabledAdapterClientPrecheckEchoReceiptDigest",
            "sandboxConnectionDisabledAdapterClientPrecheckRequiredEnvHandleCount",
            "sandboxConnectionDisabledAdapterClientPrecheckFailureClassCount",
            "sandboxConnectionDisabledAdapterClientPrecheckDryRunResponseFieldCount",
            "sandboxConnectionDisabledAdapterClientPrecheckClientMayBeInstantiated",
            "sandboxConnectionDisabledAdapterClientPrecheckExternalRequestMayBeSent",
            "sandboxConnectionDisabledAdapterClientPrecheckCredentialValueMayBeLoaded",
            "sandboxConnectionDisabledAdapterClientPrecheckActualConnectionAttemptedByJava",
            "sandboxConnectionDisabledAdapterClientPrecheckSchemaMigrationSqlExecutedByJava",
            "sandboxConnectionDisabledAdapterClientPrecheckApprovalLedgerWrittenByJava",
            "sandboxConnectionDisabledAdapterClientPrecheckUpstreamServiceAutoStartRequestedByJava",
            "sandboxConnectionDisabledAdapterClientPrecheckMiniKvWritePermissionRequestedByJava"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.precheckShape.requiredEnvHandleCount=5",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.precheckShape.failureClassCount=6",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.precheckShape.dryRunResponseFieldCount=10",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.clientBoundary.clientMayBeInstantiated=false",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.clientBoundary.externalRequestMayBeSent=false",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.clientBoundary.credentialValueMayBeLoaded=false",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.javaExecutionBoundary.actualConnectionAttemptedByJava=false",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.javaExecutionBoundary.schemaMigrationSqlExecutedByJava=false",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false",
            "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.consumedByNodeDisabledAdapterClientPrecheckProfile with Node v252",
            "Require managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.readyForNodeV254DisabledAdapterClientUpstreamEchoVerification=true before Node v254",
            "Verify managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.echoedRequiredEnvHandles contains five Node v252 handle names",
            "Verify managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.echoedFailureClassCodes contains six Node v252 failure classes",
            "Keep managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.clientBoundary.clientMayBeInstantiated=false",
            "Keep managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.clientBoundary.externalRequestMayBeSent=false",
            "Keep managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.clientBoundary.credentialValueMayBeLoaded=false",
            "Keep managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt.javaExecutionBoundary.approvalLedgerWrittenByJava=false"
    );

    ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt
    build(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionPrecheckPacketEchoReceipt
                    precheckPacketEchoReceipt
    ) {
        boolean sourceReceiptAccepted = sourceReceiptAccepted(precheckPacketEchoReceipt);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientPrecheckShape
                precheckShape = precheckShape();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientBoundary
                clientBoundary = clientBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientOptInGate
                optInGate = optInGate();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientExecutionBoundary
                javaExecutionBoundary = javaExecutionBoundary();

        List<String> receiptWarnings = new ArrayList<>();
        if (!sourceReceiptAccepted) {
            receiptWarnings.add("NODE_V254_SOURCE_PRECHECK_PACKET_ECHO_RECEIPT_NOT_READY");
        }

        boolean envHandlesEchoed = envHandlesEchoed(precheckShape);
        boolean failureTaxonomyEchoed = failureTaxonomyEchoed(precheckShape);
        boolean dryRunResponseShapeEchoed = dryRunResponseShapeEchoed(precheckShape);
        boolean disabledClientBoundaryEchoed = disabledClientBoundaryEchoed(clientBoundary, optInGate);
        boolean readOnlyPrecheckBoundaryEchoed = noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
                javaExecutionBoundary
        );
        boolean readyForNodeV254DisabledAdapterClientUpstreamEchoVerification =
                sourceReceiptAccepted
                        && envHandlesEchoed
                        && failureTaxonomyEchoed
                        && dryRunResponseShapeEchoed
                        && disabledClientBoundaryEchoed
                        && readOnlyPrecheckBoundaryEchoed;

        String receiptDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "receiptVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DISABLED_ADAPTER_CLIENT_PRECHECK_ECHO_RECEIPT_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourcePrecheckPacketEchoReceiptVersion",
                        precheckPacketEchoReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourcePrecheckPacketEchoReceiptSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECHECK_PACKET_ECHO_RECEIPT_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeDisabledAdapterClientPrecheckProfile",
                        OpsEvidenceService.NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("adapterMode", precheckShape.adapterMode()),
                ReleaseApprovalDigestSupport.line("sourceSpan", precheckShape.sourceSpan()),
                ReleaseApprovalDigestSupport.line(
                        "requiredEnvHandleCount",
                        precheckShape.requiredEnvHandleCount()
                ),
                ReleaseApprovalDigestSupport.line("failureClassCount", precheckShape.failureClassCount()),
                ReleaseApprovalDigestSupport.line(
                        "dryRunResponseFieldCount",
                        precheckShape.dryRunResponseFieldCount()
                ),
                ReleaseApprovalDigestSupport.line("requiredEnvHandles", REQUIRED_ENV_HANDLES),
                ReleaseApprovalDigestSupport.line("failureClassCodes", FAILURE_CLASS_CODES),
                ReleaseApprovalDigestSupport.line("dryRunResponseFields", DRY_RUN_RESPONSE_FIELDS),
                ReleaseApprovalDigestSupport.line(
                        "clientMayBeInstantiated",
                        clientBoundary.clientMayBeInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "externalRequestMayBeSent",
                        clientBoundary.externalRequestMayBeSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "credentialValueMayBeLoaded",
                        clientBoundary.credentialValueMayBeLoaded()
                ),
                ReleaseApprovalDigestSupport.line(
                        "optInGateName",
                        optInGate.gateName()
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
                        "readyForNodeV254DisabledAdapterClientUpstreamEchoVerification",
                        readyForNodeV254DisabledAdapterClientUpstreamEchoVerification
                )
        ));

        return new ReleaseApprovalRehearsalResponse
                .RehearsalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DISABLED_ADAPTER_CLIENT_PRECHECK_ECHO_RECEIPT_VERSION,
                precheckPacketEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_PRECHECK_PACKET_ECHO_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_VERSION,
                OpsEvidenceService.NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_PROFILE,
                OpsEvidenceService.NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_ENDPOINT,
                OpsEvidenceService.NODE_V252_DISABLED_ADAPTER_CLIENT_PRECHECK_STATE,
                OpsEvidenceService.NODE_V253_TEST_ONLY_ADAPTER_SHELL_CONTRACT_VERSION,
                OpsEvidenceService.NODE_V253_TEST_ONLY_ADAPTER_SHELL_CONTRACT_PROFILE,
                OpsEvidenceService.NODE_V254_DISABLED_ADAPTER_CLIENT_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V254_DISABLED_ADAPTER_CLIENT_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                precheckShape,
                clientBoundary,
                optInGate,
                javaExecutionBoundary,
                envHandlesEchoed,
                failureTaxonomyEchoed,
                dryRunResponseShapeEchoed,
                disabledClientBoundaryEchoed,
                readOnlyPrecheckBoundaryEchoed,
                readyForNodeV254DisabledAdapterClientUpstreamEchoVerification,
                false,
                false,
                false,
                false,
                receiptDigest,
                REQUIRED_ENV_HANDLES,
                FAILURE_CLASS_CODES,
                DRY_RUN_RESPONSE_FIELDS,
                REUSED_NO_GO_CONDITIONS,
                forbiddenPrecheckOperations(),
                nodeV254Prerequisites(),
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
                    .RehearsalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceiptWarnings",
                        receipt.receiptWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckEchoReceiptDigest",
                        receipt.receiptDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckRequiredEnvHandleCount",
                        receipt.precheckShape().requiredEnvHandleCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckFailureClassCount",
                        receipt.precheckShape().failureClassCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckDryRunResponseFieldCount",
                        receipt.precheckShape().dryRunResponseFieldCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckClientMayBeInstantiated",
                        receipt.clientBoundary().clientMayBeInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckExternalRequestMayBeSent",
                        receipt.clientBoundary().externalRequestMayBeSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckCredentialValueMayBeLoaded",
                        receipt.clientBoundary().credentialValueMayBeLoaded()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckActualConnectionAttemptedByJava",
                        receipt.javaExecutionBoundary().actualConnectionAttemptedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckSchemaMigrationSqlExecutedByJava",
                        receipt.javaExecutionBoundary().schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckApprovalLedgerWrittenByJava",
                        receipt.javaExecutionBoundary().approvalLedgerWrittenByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckUpstreamServiceAutoStartRequestedByJava",
                        receipt.javaExecutionBoundary().upstreamServiceAutoStartRequestedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionDisabledAdapterClientPrecheckMiniKvWritePermissionRequestedByJava",
                        receipt.javaExecutionBoundary().miniKvWritePermissionRequestedByJava()
                )
        );
    }

    boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt receipt
    ) {
        return noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(receipt.javaExecutionBoundary())
                && !receipt.clientBoundary().clientMayBeInstantiated()
                && !receipt.clientBoundary().externalRequestMayBeSent()
                && !receipt.clientBoundary().credentialValueMayBeLoaded()
                && !receipt.readyForManagedAuditSandboxAdapterConnection()
                && !receipt.readyForProductionAudit()
                && !receipt.readyForProductionWindow()
                && !receipt.nodeMayTreatAsProductionAuditRecord();
    }

    private static boolean sourceReceiptAccepted(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionPrecheckPacketEchoReceipt receipt
    ) {
        return receipt.readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification()
                && receipt.receiptWarnings().isEmpty()
                && receipt.packetShapeEchoed()
                && receipt.fieldEchoComplete()
                && receipt.readOnlyPrecheckBoundaryEchoed()
                && !receipt.readyForManagedAuditSandboxAdapterConnection();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientPrecheckShape
    precheckShape() {
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxConnectionDisabledAdapterClientPrecheckShape(
                ADAPTER_MODE,
                SOURCE_SPAN,
                PRECHECK_STATE,
                REQUIRED_ENV_HANDLE_COUNT,
                FAILURE_CLASS_COUNT,
                DRY_RUN_RESPONSE_FIELD_COUNT,
                REUSED_NO_GO_CONDITION_COUNT,
                true,
                true,
                true,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientBoundary
    clientBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientBoundary(
                CLIENT_IMPLEMENTATION_STATUS,
                false,
                false,
                false,
                true,
                false,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientOptInGate
    optInGate() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientOptInGate(
                "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED",
                "true",
                "false",
                true,
                true
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientExecutionBoundary
    javaExecutionBoundary() {
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxConnectionDisabledAdapterClientExecutionBoundary(
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

    private static boolean envHandlesEchoed(
            ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionDisabledAdapterClientPrecheckShape precheckShape
    ) {
        return precheckShape.requiredEnvHandleCount() == REQUIRED_ENV_HANDLE_COUNT
                && precheckShape.envHandlesRemainHandleOnly()
                && precheckShape.noEnvValueReadForPrecheck();
    }

    private static boolean failureTaxonomyEchoed(
            ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionDisabledAdapterClientPrecheckShape precheckShape
    ) {
        return precheckShape.failureClassCount() == FAILURE_CLASS_COUNT;
    }

    private static boolean dryRunResponseShapeEchoed(
            ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionDisabledAdapterClientPrecheckShape precheckShape
    ) {
        return precheckShape.dryRunResponseFieldCount() == DRY_RUN_RESPONSE_FIELD_COUNT
                && precheckShape.dryRunResponseReadOnly()
                && !precheckShape.precheckCreatesRealClient();
    }

    private static boolean disabledClientBoundaryEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientBoundary clientBoundary,
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionDisabledAdapterClientOptInGate optInGate
    ) {
        return CLIENT_IMPLEMENTATION_STATUS.equals(clientBoundary.clientImplementationStatus())
                && !clientBoundary.clientMayBeInstantiated()
                && !clientBoundary.externalRequestMayBeSent()
                && !clientBoundary.credentialValueMayBeLoaded()
                && clientBoundary.optInGateRequired()
                && !clientBoundary.productionEndpointAllowed()
                && !clientBoundary.realTransportAllowed()
                && !clientBoundary.realAdapterClientImplemented()
                && "ORDEROPS_MANAGED_AUDIT_ADAPTER_CLIENT_ENABLED".equals(optInGate.gateName())
                && "true".equals(optInGate.requiredValueForFutureConnection())
                && "false".equals(optInGate.currentDefault())
                && optInGate.precheckTreatsEnabledAsBlocked()
                && optInGate.operatorApprovalRequired();
    }

    private static boolean noWriteCredentialConnectionSchemaRollbackOrServiceStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalSandboxConnectionDisabledAdapterClientExecutionBoundary javaExecutionBoundary
    ) {
        return !javaExecutionBoundary.carriesCredentialValue()
                && !javaExecutionBoundary.credentialValueReadByJava()
                && !javaExecutionBoundary.credentialValueStoredByJava()
                && !javaExecutionBoundary.actualConnectionAttemptedByJava()
                && !javaExecutionBoundary.externalManagedAuditConnectionOpenedByJava()
                && !javaExecutionBoundary.externalRequestSentByJava()
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
                && !javaExecutionBoundary.miniKvWritePermissionRequestedByJava();
    }

    private static List<String> forbiddenPrecheckOperations() {
        return List.of(
                "instantiate managed audit adapter client",
                "read credential value",
                "send external managed audit request",
                "open managed audit sandbox connection",
                "execute schema migration SQL",
                "write approval ledger",
                "write managed audit state",
                "start Java, mini-kv, or external audit service",
                "request mini-kv write permission"
        );
    }

    private static List<String> nodeV254Prerequisites() {
        return List.of(
                "Node v252 disabled adapter client precheck is ready",
                "Node v253 test-only adapter shell contract is ready",
                "Java v102 disabled adapter client precheck echo receipt is present",
                "mini-kv v111 non-participation receipt is present",
                "UPSTREAM_ACTIONS_ENABLED remains false"
        );
    }
}
