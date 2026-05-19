package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarkerBuilder {

    private static final String PACKET_MODE = "fake-transport-adapter-dry-run-verification-only";
    private static final String SOURCE_SPAN = "Node v253 + Node v254 + Node v255 + Node v256";
    private static final String REQUEST_ID = "managed-audit-v255-fake-transport-dry-run";
    private static final String OPERATION = "managed-audit-sandbox-connection-dry-run";
    private static final String TRANSPORT_KIND = "fake-in-memory";
    private static final String RESPONSE_STATUS = "fake-transport-dry-run-accepted";
    private static final String RESPONSE_CODE = "TEST_ONLY_FAKE_TRANSPORT_DRY_RUN";
    private static final int REQUEST_SHAPE_FIELD_COUNT = 8;
    private static final int RESPONSE_SHAPE_FIELD_COUNT = 9;
    private static final int FAILURE_MAPPING_COUNT = 6;
    private static final int GUARD_CONDITION_COUNT = 7;
    private static final int TIMEOUT_BUDGET_MS = 15000;
    private static final int CLEANUP_ARTIFACT_COUNT = 0;

    private static final List<String> REQUEST_FIELD_NAMES = List.of(
            "requestId",
            "operation",
            "transportKind",
            "credentialHandle",
            "endpointHandle",
            "ownerApprovalArtifactId",
            "timeoutBudgetMs",
            "dryRun",
            "fakeTransportOnly",
            "credentialValueIncluded",
            "rawEndpointUrlIncluded",
            "payloadMayContainSecrets"
    );

    private static final List<String> RESPONSE_FIELD_NAMES = List.of(
            "requestId",
            "status",
            "code",
            "fakeTransportOnly",
            "timeoutBudgetMs",
            "connectionAttempted",
            "externalRequestSent",
            "credentialValueRead",
            "schemaMigrationExecuted",
            "productionRecordWritten"
    );

    private static final List<String> FAILURE_MAPPING_CODES = List.of(
            "ADAPTER_CLIENT_DISABLED",
            "CREDENTIAL_HANDLE_MISSING",
            "CREDENTIAL_VALUE_REQUESTED",
            "ENDPOINT_HANDLE_MISSING",
            "SCHEMA_REHEARSAL_MISSING",
            "MANUAL_WINDOW_NOT_OPEN"
    );

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarkerWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxConnectionFakeTransportDryRunPacketEchoMarkerDigest",
            "sandboxConnectionFakeTransportDryRunPacketRequestShapeFieldCount",
            "sandboxConnectionFakeTransportDryRunPacketResponseShapeFieldCount",
            "sandboxConnectionFakeTransportDryRunPacketFailureMappingCount",
            "sandboxConnectionFakeTransportDryRunPacketTimeoutBudgetMs",
            "sandboxConnectionFakeTransportDryRunPacketCleanupArtifactCount",
            "sandboxConnectionFakeTransportDryRunPacketConnectionAttempted",
            "sandboxConnectionFakeTransportDryRunPacketExternalRequestSent",
            "sandboxConnectionFakeTransportDryRunPacketCredentialValueRead",
            "sandboxConnectionFakeTransportDryRunPacketSchemaMigrationExecuted",
            "sandboxConnectionFakeTransportDryRunPacketProductionRecordWritten",
            "sandboxConnectionFakeTransportDryRunPacketJavaStarted",
            "sandboxConnectionFakeTransportDryRunPacketMiniKvStarted",
            "sandboxConnectionFakeTransportDryRunPacketExternalAuditServiceStarted"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.requestShape.requestShapeFieldCount=8",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.responseShape.responseShapeFieldCount=9",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.failureMappingShape.mappedFailureCount=6",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.timeoutBoundary.timeoutBudgetMs=15000",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.cleanupBoundary.cleanupArtifactCount=0",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.connectionAttempted=false",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.schemaMigrationExecuted=false",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.productionRecordWritten=false",
            "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.consumedByNodeFakeTransportDryRunPacketProfile with Node v255",
            "Compare managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.consumedByNodeFakeTransportPacketArchiveVerificationProfile with Node v256",
            "Require managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.readyForNodeV257FakeTransportPacketUpstreamEchoVerification=true before Node v257",
            "Verify managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.requestShape.credentialValueIncluded=false",
            "Verify managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.requestShape.rawEndpointUrlIncluded=false",
            "Verify managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.responseShape.connectionAttempted=false",
            "Verify managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.cleanupBoundary.cleanupArtifactCount=0",
            "Keep managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.javaStarted=false",
            "Keep managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker.sideEffectBoundary.miniKvStarted=false"
    );

    ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker
    build(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt
                    disabledAdapterClientPrecheckEchoReceipt
    ) {
        boolean sourceReceiptAccepted = sourceReceiptAccepted(disabledAdapterClientPrecheckEchoReceipt);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportDryRunRequestShape
                requestShape = requestShape();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportDryRunResponseShape
                responseShape = responseShape();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportTimeoutBoundary
                timeoutBoundary = timeoutBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportFailureMappingShape
                failureMappingShape = failureMappingShape();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportCleanupBoundary
                cleanupBoundary = cleanupBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportSideEffectBoundary
                sideEffectBoundary = sideEffectBoundary();

        List<String> markerWarnings = new ArrayList<>();
        if (!sourceReceiptAccepted) {
            markerWarnings.add("NODE_V257_SOURCE_DISABLED_ADAPTER_CLIENT_PRECHECK_ECHO_RECEIPT_NOT_READY");
        }

        boolean sourcePacketEchoed = sourceReceiptAccepted;
        boolean requestShapeEchoed = requestShapeEchoed(requestShape);
        boolean responseShapeEchoed = responseShapeEchoed(responseShape);
        boolean timeoutBoundaryEchoed = timeoutBoundaryEchoed(timeoutBoundary);
        boolean failureMappingEchoed = failureMappingEchoed(failureMappingShape);
        boolean cleanupBoundaryEchoed = cleanupBoundaryEchoed(cleanupBoundary);
        boolean sideEffectBoundaryEchoed = noCredentialConnectionWriteOrAutoStart(sideEffectBoundary);
        boolean readyForNodeV257FakeTransportPacketUpstreamEchoVerification =
                sourcePacketEchoed
                        && requestShapeEchoed
                        && responseShapeEchoed
                        && timeoutBoundaryEchoed
                        && failureMappingEchoed
                        && cleanupBoundaryEchoed
                        && sideEffectBoundaryEchoed;

        String markerDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "markerVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_FAKE_TRANSPORT_DRY_RUN_PACKET_ECHO_MARKER_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceDisabledAdapterClientPrecheckEchoReceiptVersion",
                        disabledAdapterClientPrecheckEchoReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceDisabledAdapterClientPrecheckEchoReceiptSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DISABLED_ADAPTER_CLIENT_PRECHECK_ECHO_RECEIPT_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeFakeTransportDryRunPacketProfile",
                        OpsEvidenceService.NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("packetMode", PACKET_MODE),
                ReleaseApprovalDigestSupport.line("sourceSpan", SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("requestShape", requestShape),
                ReleaseApprovalDigestSupport.line("responseShape", responseShape),
                ReleaseApprovalDigestSupport.line("timeoutBoundary", timeoutBoundary),
                ReleaseApprovalDigestSupport.line("failureMappingShape", failureMappingShape),
                ReleaseApprovalDigestSupport.line("cleanupBoundary", cleanupBoundary),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV257FakeTransportPacketUpstreamEchoVerification",
                        readyForNodeV257FakeTransportPacketUpstreamEchoVerification
                )
        ));

        return new ReleaseApprovalRehearsalResponse
                .RehearsalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_FAKE_TRANSPORT_DRY_RUN_PACKET_ECHO_MARKER_VERSION,
                disabledAdapterClientPrecheckEchoReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_CONNECTION_DISABLED_ADAPTER_CLIENT_PRECHECK_ECHO_RECEIPT_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_VERSION,
                OpsEvidenceService.NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_PROFILE,
                OpsEvidenceService.NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_ENDPOINT,
                OpsEvidenceService.NODE_V255_FAKE_TRANSPORT_DRY_RUN_PACKET_STATE,
                OpsEvidenceService.NODE_V256_FAKE_TRANSPORT_PACKET_ARCHIVE_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V256_FAKE_TRANSPORT_PACKET_ARCHIVE_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V256_FAKE_TRANSPORT_PACKET_ARCHIVE_VERIFICATION_ENDPOINT,
                OpsEvidenceService.NODE_V256_FAKE_TRANSPORT_PACKET_ARCHIVE_VERIFICATION_STATE,
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V257_FAKE_TRANSPORT_PACKET_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                PACKET_MODE,
                SOURCE_SPAN,
                requestShape,
                responseShape,
                timeoutBoundary,
                failureMappingShape,
                cleanupBoundary,
                sideEffectBoundary,
                sourcePacketEchoed,
                requestShapeEchoed,
                responseShapeEchoed,
                timeoutBoundaryEchoed,
                failureMappingEchoed,
                cleanupBoundaryEchoed,
                sideEffectBoundaryEchoed,
                readyForNodeV257FakeTransportPacketUpstreamEchoVerification,
                false,
                false,
                false,
                false,
                markerDigest,
                REQUEST_FIELD_NAMES,
                RESPONSE_FIELD_NAMES,
                FAILURE_MAPPING_CODES,
                forbiddenFakeTransportOperations(),
                nodeV257Prerequisites(),
                List.copyOf(markerWarnings),
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
                    .RehearsalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarkerWarnings",
                        marker.markerWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketEchoMarkerDigest",
                        marker.markerDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketRequestShapeFieldCount",
                        marker.requestShape().requestShapeFieldCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketResponseShapeFieldCount",
                        marker.responseShape().responseShapeFieldCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketFailureMappingCount",
                        marker.failureMappingShape().mappedFailureCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketTimeoutBudgetMs",
                        marker.timeoutBoundary().timeoutBudgetMs()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketCleanupArtifactCount",
                        marker.cleanupBoundary().cleanupArtifactCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketConnectionAttempted",
                        marker.sideEffectBoundary().connectionAttempted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketExternalRequestSent",
                        marker.sideEffectBoundary().externalRequestSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketCredentialValueRead",
                        marker.sideEffectBoundary().credentialValueRead()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketSchemaMigrationExecuted",
                        marker.sideEffectBoundary().schemaMigrationExecuted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketProductionRecordWritten",
                        marker.sideEffectBoundary().productionRecordWritten()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketJavaStarted",
                        marker.sideEffectBoundary().javaStarted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketMiniKvStarted",
                        marker.sideEffectBoundary().miniKvStarted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxConnectionFakeTransportDryRunPacketExternalAuditServiceStarted",
                        marker.sideEffectBoundary().externalAuditServiceStarted()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker marker
    ) {
        return requestShapeEchoed(marker.requestShape())
                && responseShapeEchoed(marker.responseShape())
                && timeoutBoundaryEchoed(marker.timeoutBoundary())
                && failureMappingEchoed(marker.failureMappingShape())
                && cleanupBoundaryEchoed(marker.cleanupBoundary())
                && noCredentialConnectionWriteOrAutoStart(marker.sideEffectBoundary())
                && !marker.readyForManagedAuditSandboxAdapterConnection()
                && !marker.readyForProductionAudit()
                && !marker.readyForProductionWindow()
                && !marker.nodeMayTreatAsProductionAuditRecord();
    }

    private static boolean sourceReceiptAccepted(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt receipt
    ) {
        return receipt.readyForNodeV254DisabledAdapterClientUpstreamEchoVerification()
                && receipt.receiptWarnings().isEmpty()
                && receipt.envHandlesEchoed()
                && receipt.failureTaxonomyEchoed()
                && receipt.dryRunResponseShapeEchoed()
                && receipt.disabledClientBoundaryEchoed()
                && receipt.readOnlyPrecheckBoundaryEchoed()
                && !receipt.readyForManagedAuditSandboxAdapterConnection();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportDryRunRequestShape
    requestShape() {
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxConnectionFakeTransportDryRunRequestShape(
                REQUEST_ID,
                OPERATION,
                TRANSPORT_KIND,
                "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
                "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
                "owner-approval-artifact-review-only",
                TIMEOUT_BUDGET_MS,
                true,
                true,
                false,
                false,
                false,
                REQUEST_SHAPE_FIELD_COUNT
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportDryRunResponseShape
    responseShape() {
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxConnectionFakeTransportDryRunResponseShape(
                REQUEST_ID,
                RESPONSE_STATUS,
                RESPONSE_CODE,
                true,
                TIMEOUT_BUDGET_MS,
                false,
                false,
                false,
                false,
                false,
                RESPONSE_SHAPE_FIELD_COUNT
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportTimeoutBoundary
    timeoutBoundary() {
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxConnectionFakeTransportTimeoutBoundary(
                TIMEOUT_BUDGET_MS,
                true,
                "operator-review-field",
                false,
                false,
                true
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportFailureMappingShape
    failureMappingShape() {
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxConnectionFakeTransportFailureMappingShape(
                FAILURE_MAPPING_COUNT,
                FAILURE_MAPPING_COUNT,
                GUARD_CONDITION_COUNT,
                true,
                true,
                true,
                true
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportCleanupBoundary
    cleanupBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportCleanupBoundary(
                true,
                false,
                false,
                false,
                CLEANUP_ARTIFACT_COUNT,
                true,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportSideEffectBoundary
    sideEffectBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportSideEffectBoundary(
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

    private static boolean requestShapeEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportDryRunRequestShape requestShape
    ) {
        return REQUEST_ID.equals(requestShape.requestId())
                && OPERATION.equals(requestShape.operation())
                && TRANSPORT_KIND.equals(requestShape.transportKind())
                && "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE".equals(requestShape.credentialHandle())
                && "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE".equals(requestShape.endpointHandle())
                && requestShape.timeoutBudgetMs() == TIMEOUT_BUDGET_MS
                && requestShape.dryRun()
                && requestShape.fakeTransportOnly()
                && !requestShape.credentialValueIncluded()
                && !requestShape.rawEndpointUrlIncluded()
                && !requestShape.payloadMayContainSecrets()
                && requestShape.requestShapeFieldCount() == REQUEST_SHAPE_FIELD_COUNT;
    }

    private static boolean responseShapeEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportDryRunResponseShape responseShape
    ) {
        return REQUEST_ID.equals(responseShape.requestId())
                && RESPONSE_STATUS.equals(responseShape.status())
                && RESPONSE_CODE.equals(responseShape.code())
                && responseShape.fakeTransportOnly()
                && responseShape.timeoutBudgetMs() == TIMEOUT_BUDGET_MS
                && !responseShape.connectionAttempted()
                && !responseShape.externalRequestSent()
                && !responseShape.credentialValueRead()
                && !responseShape.schemaMigrationExecuted()
                && !responseShape.productionRecordWritten()
                && responseShape.responseShapeFieldCount() == RESPONSE_SHAPE_FIELD_COUNT;
    }

    private static boolean timeoutBoundaryEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportTimeoutBoundary timeoutBoundary
    ) {
        return timeoutBoundary.timeoutBudgetMs() == TIMEOUT_BUDGET_MS
                && timeoutBoundary.finiteBudget()
                && "operator-review-field".equals(timeoutBoundary.budgetSource())
                && !timeoutBoundary.budgetSpent()
                && !timeoutBoundary.timerStarted()
                && timeoutBoundary.timeoutClassifiable();
    }

    private static boolean failureMappingEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportFailureMappingShape
                    failureMappingShape
    ) {
        return failureMappingShape.sourceFailureMappingCount() == FAILURE_MAPPING_COUNT
                && failureMappingShape.mappedFailureCount() == FAILURE_MAPPING_COUNT
                && failureMappingShape.guardConditionCount() == GUARD_CONDITION_COUNT
                && failureMappingShape.allFailuresNonRetryable()
                && failureMappingShape.credentialValueRequestStillBlocked()
                && failureMappingShape.manualWindowClosedStillBlocked()
                && failureMappingShape.failureMappingCovered();
    }

    private static boolean cleanupBoundaryEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportCleanupBoundary cleanupBoundary
    ) {
        return cleanupBoundary.inMemoryOnly()
                && !cleanupBoundary.temporaryDirectoryCreated()
                && !cleanupBoundary.temporaryFileCreated()
                && !cleanupBoundary.cleanupRequired()
                && cleanupBoundary.cleanupArtifactCount() == CLEANUP_ARTIFACT_COUNT
                && cleanupBoundary.cleanupVerified()
                && !cleanupBoundary.nodeServiceStartedByPacket();
    }

    private static boolean noCredentialConnectionWriteOrAutoStart(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxConnectionFakeTransportSideEffectBoundary
                    sideEffectBoundary
    ) {
        return !sideEffectBoundary.connectionAttempted()
                && !sideEffectBoundary.externalRequestSent()
                && !sideEffectBoundary.credentialValueRead()
                && !sideEffectBoundary.credentialValueStored()
                && !sideEffectBoundary.schemaMigrationExecuted()
                && !sideEffectBoundary.productionRecordWritten()
                && !sideEffectBoundary.approvalLedgerWritten()
                && !sideEffectBoundary.managedAuditStateWritten()
                && !sideEffectBoundary.sqlExecuted()
                && !sideEffectBoundary.javaStarted()
                && !sideEffectBoundary.miniKvStarted()
                && !sideEffectBoundary.externalAuditServiceStarted();
    }

    private static List<String> forbiddenFakeTransportOperations() {
        return List.of(
                "instantiate real managed audit adapter client",
                "read credential value",
                "include raw endpoint URL",
                "send external managed audit request",
                "open managed audit sandbox connection",
                "execute schema migration SQL",
                "write approval ledger or production audit record",
                "create temporary dry-run directory or file",
                "start Java, mini-kv, or external audit service"
        );
    }

    private static List<String> nodeV257Prerequisites() {
        return List.of(
                "Node v255 fake transport dry-run packet is ready",
                "Node v256 fake transport packet archive verification is ready",
                "Java v103 fake transport dry-run packet echo marker is present",
                "mini-kv v112 fake transport dry-run packet non-participation receipt is present",
                "UPSTREAM_ACTIONS_ENABLED remains false"
        );
    }
}
