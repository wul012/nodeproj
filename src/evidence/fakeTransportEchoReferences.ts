import {
  evidenceFile,
  mapReceiptFields,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  type ReceiptFieldSpec,
} from "../services/historicalEvidenceReportUtils.js";
import { allBooleanFieldsAre } from "../services/liveProbeReportUtils.js";
import type {
  JavaV103FakeTransportPacketEchoMarkerReference,
  MiniKvV112FakeTransportPacketNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationTypes.js";

export const JAVA_V103_RUNBOOK =
  "D:/javaproj/advanced-order-platform/c/103/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V103_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/106-version-103-fake-transport-dry-run-packet-echo-marker.md";
const JAVA_V103_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarkerBuilder.java";
export const MINI_KV_V112_RECEIPT =
  "D:/C/mini-kv/fixtures/release/fake-transport-dry-run-packet-non-participation-receipt.json";
const MINI_KV_V112_RUNBOOK = "D:/C/mini-kv/c/112/\u89e3\u91ca/\u8bf4\u660e.md";
const MINI_KV_V112_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/168-version-112-fake-transport-packet-non-participation-receipt.md";

const V112_IDENTITY_FIELDS = [
  ["receiptVersion", "receipt_version", "text", "missing"],
  ["releaseVersion", "current_release_version", "text", "missing"],
  ["consumerHint", "consumer_hint", "text", "missing"],
  ["receiptDigest", "receipt_digest", "text", "missing"],
  ["sourcePacketProfileVersion", "source_packet_profile_version", "text", "missing"],
  ["sourcePacketState", "source_packet_state", "text", "missing"],
  ["sourceArchiveState", "source_archive_state", "text", "missing"],
] as const satisfies readonly ReceiptFieldSpec[];

const V112_SOURCE_FIELDS = [
  ["sourceArchiveRerunsFakeTransportBehavior", "source_archive_reruns_fake_transport_behavior", "flag", true],
  ["sourceReadyForFakeTransportPacket", "source_ready_for_fake_transport_packet", "flag", false],
  ["sourceReadyForManagedAuditSandboxAdapterConnection", "source_ready_for_managed_audit_sandbox_adapter_connection", "flag", true],
  ["sourceFakeTransportOnly", "source_fake_transport_only", "flag", false],
  ["sourceDryRunOnly", "source_dry_run_only", "flag", false],
  ["sourceRequestShapeFieldCount", "source_request_shape_field_count", "count", 0],
  ["sourceResponseShapeFieldCount", "source_response_shape_field_count", "count", 0],
  ["sourceFailureMappingCount", "source_failure_mapping_count", "count", 0],
  ["sourceTimeoutBudgetMs", "source_timeout_budget_ms", "count", 0],
  ["sourceCleanupArtifactCount", "source_cleanup_artifact_count", "count", -1],
  ["sourceCleanupVerified", "source_cleanup_verified", "flag", false],
  ["sourceTemporaryDirectoryCreated", "source_temporary_directory_created", "flag", true],
  ["sourceTemporaryFileCreated", "source_temporary_file_created", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const V112_REQUEST_FIELDS = [
  ["requestCredentialValueIncluded", "credential_value_included", "flag", true],
  ["requestRawEndpointUrlIncluded", "raw_endpoint_url_included", "flag", true],
  ["requestPayloadMayContainSecrets", "payload_may_contain_secrets", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const V112_RESPONSE_FIELDS = [
  ["responseConnectionAttempted", "connection_attempted", "flag", true],
  ["responseExternalRequestSent", "external_request_sent", "flag", true],
  ["responseCredentialValueRead", "credential_value_read", "flag", true],
  ["responseSchemaMigrationExecuted", "schema_migration_executed", "flag", true],
  ["responseProductionRecordWritten", "production_record_written", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const V112_RUNTIME_FIELDS = [
  ["readOnly", "read_only", "flag", false],
  ["executionAllowed", "execution_allowed", "flag", true],
  ["dryRunOnly", "dry_run_only", "flag", false],
  ["nodeAutoStartAllowed", "node_auto_start_allowed", "flag", true],
  ["javaAutoStartAllowed", "java_auto_start_allowed", "flag", true],
  ["miniKvAutoStartAllowed", "mini_kv_auto_start_allowed", "flag", true],
  ["externalAuditServiceAutoStartAllowed", "external_audit_service_auto_start_allowed", "flag", true],
  ["storageWriteAllowed", "storage_write_allowed", "flag", true],
  ["managedAuditWriteExecuted", "managed_audit_write_executed", "flag", true],
  ["credentialValueReadAllowed", "credential_value_read_allowed", "flag", true],
  ["credentialValueLoaded", "credential_value_loaded", "flag", true],
  ["externalRequestSent", "external_request_sent", "flag", true],
  ["temporaryDirectoryCreated", "temporary_directory_created", "flag", true],
  ["temporaryFileCreated", "temporary_file_created", "flag", true],
  ["cleanupArtifactCount", "cleanup_artifact_count", "count", -1],
  ["restoreExecutionAllowed", "restore_execution_allowed", "flag", true],
  ["loadRestoreCompactExecuted", "load_restore_compact_executed", "flag", true],
  ["setnxexExecutionAllowed", "setnxex_execution_allowed", "flag", true],
  ["managedAuditStorageBackend", "managed_audit_storage_backend", "flag", true],
  ["orderAuthoritative", "order_authoritative", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const JAVA_READY_TRUE_FIELDS = [
  "evidencePresent",
  "verificationDocumented",
  "readyForNodeV257FakeTransportPacketUpstreamEchoVerification",
] as const;

const JAVA_READY_FALSE_FIELDS = [
  "credentialValueIncluded",
  "rawEndpointUrlIncluded",
  "payloadMayContainSecrets",
  "connectionAttempted",
  "externalRequestSent",
  "credentialValueRead",
  "schemaMigrationExecuted",
  "productionRecordWritten",
  "javaStarted",
  "miniKvStarted",
  "externalAuditServiceStarted",
  "readyForManagedAuditSandboxAdapterConnection",
] as const;

const V112_SOURCE_TRUE_FIELDS = [
  "sourceReadyForFakeTransportPacket",
  "sourceFakeTransportOnly",
  "sourceDryRunOnly",
  "sourceCleanupVerified",
] as const;

const V112_SOURCE_FALSE_FIELDS = [
  "sourceArchiveRerunsFakeTransportBehavior",
  "sourceReadyForManagedAuditSandboxAdapterConnection",
  "sourceTemporaryDirectoryCreated",
  "sourceTemporaryFileCreated",
] as const;

const V112_REQUEST_RESPONSE_FALSE_FIELDS = [
  "requestCredentialValueIncluded",
  "requestRawEndpointUrlIncluded",
  "requestPayloadMayContainSecrets",
  "responseConnectionAttempted",
  "responseExternalRequestSent",
  "responseCredentialValueRead",
  "responseSchemaMigrationExecuted",
  "responseProductionRecordWritten",
] as const;

const V112_RUNTIME_TRUE_FIELDS = ["readOnly", "dryRunOnly"] as const;
const V112_RUNTIME_FALSE_FIELDS = [
  "executionAllowed",
  "nodeAutoStartAllowed",
  "javaAutoStartAllowed",
  "miniKvAutoStartAllowed",
  "externalAuditServiceAutoStartAllowed",
  "storageWriteAllowed",
  "managedAuditWriteExecuted",
  "credentialValueReadAllowed",
  "credentialValueLoaded",
  "externalRequestSent",
  "temporaryDirectoryCreated",
  "temporaryFileCreated",
  "restoreExecutionAllowed",
  "loadRestoreCompactExecuted",
  "setnxexExecutionAllowed",
  "managedAuditStorageBackend",
  "orderAuthoritative",
] as const;

export function createJavaV103Reference(): JavaV103FakeTransportPacketEchoMarkerReference {
  const evidenceFiles = [
    evidenceFile("java-v103-runbook", JAVA_V103_RUNBOOK, { textMode: "raw" }),
    evidenceFile("java-v103-walkthrough", JAVA_V103_WALKTHROUGH, { textMode: "raw" }),
    evidenceFile("java-v103-builder", JAVA_V103_BUILDER, { textMode: "raw" }),
  ];
  const expectedSnippets = [
    snippet("java-v103-marker-field", JAVA_V103_RUNBOOK, "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker"),
    snippet("java-v103-schema", JAVA_V103_RUNBOOK, "java-release-approval-rehearsal-response-schema.v25"),
    snippet("java-v103-marker-version", JAVA_V103_WALKTHROUGH, "java-release-approval-rehearsal-managed-audit-sandbox-connection-fake-transport-dry-run-packet-echo-marker.v1"),
    snippet("java-v103-node-v255", JAVA_V103_WALKTHROUGH, "Node v255 profile=managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1"),
    snippet("java-v103-node-v256", JAVA_V103_WALKTHROUGH, "Node v256 profile=managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1"),
    snippet("java-v103-node-v257", JAVA_V103_BUILDER, "readyForNodeV257FakeTransportPacketUpstreamEchoVerification"),
    snippet("java-v103-request-count", JAVA_V103_WALKTHROUGH, "requestShapeFieldCount=8"),
    snippet("java-v103-response-count", JAVA_V103_WALKTHROUGH, "responseShapeFieldCount=9"),
    snippet("java-v103-failure-count", JAVA_V103_WALKTHROUGH, "failureMappingCount=6"),
    snippet("java-v103-guard-count", JAVA_V103_WALKTHROUGH, "guardConditionCount=7"),
    snippet("java-v103-timeout", JAVA_V103_WALKTHROUGH, "timeoutBudgetMs=15000"),
    snippet("java-v103-cleanup", JAVA_V103_WALKTHROUGH, "cleanupArtifactCount=0"),
    snippet("java-v103-no-credential", JAVA_V103_RUNBOOK, "credentialValueIncluded=false"),
    snippet("java-v103-no-raw-url", JAVA_V103_RUNBOOK, "rawEndpointUrlIncluded=false"),
    snippet("java-v103-no-external", JAVA_V103_RUNBOOK, "externalRequestSent=false"),
    snippet("java-v103-no-sql", JAVA_V103_RUNBOOK, "schemaMigrationExecuted=false"),
    snippet("java-v103-no-ledger", JAVA_V103_WALKTHROUGH, "approvalLedgerWritten=false"),
    snippet("java-v103-no-temp-dir", JAVA_V103_RUNBOOK, "\u4e0d\u521b\u5efa\u4e34\u65f6\u6587\u4ef6\u6216\u76ee\u5f55"),
  ];
  const reference: JavaV103FakeTransportPacketEchoMarkerReference = {
    sourceVersion: "Java v103",
    tagLabel: "v103\u8ba2\u5355\u5e73\u53f0fake-transport-dry-run-packet-echo-marker",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v103-schema")
      ? "java-release-approval-rehearsal-response-schema.v25"
      : "missing",
    markerField: snippetMatched(expectedSnippets, "java-v103-marker-field")
      ? "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker"
      : "missing",
    markerVersion: snippetMatched(expectedSnippets, "java-v103-marker-version")
      ? "java-release-approval-rehearsal-managed-audit-sandbox-connection-fake-transport-dry-run-packet-echo-marker.v1"
      : "missing",
    consumedByNodeV255Profile: snippetMatched(expectedSnippets, "java-v103-node-v255")
      ? "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1"
      : "missing",
    consumedByNodeV256Profile: snippetMatched(expectedSnippets, "java-v103-node-v256")
      ? "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v103-node-v257") ? "Node v257" : "missing",
    requestShapeFieldCount: snippetMatched(expectedSnippets, "java-v103-request-count") ? 8 : 0,
    responseShapeFieldCount: snippetMatched(expectedSnippets, "java-v103-response-count") ? 9 : 0,
    failureMappingCount: snippetMatched(expectedSnippets, "java-v103-failure-count") ? 6 : 0,
    guardConditionCount: snippetMatched(expectedSnippets, "java-v103-guard-count") ? 7 : 0,
    timeoutBudgetMs: snippetMatched(expectedSnippets, "java-v103-timeout") ? 15000 : 0,
    cleanupArtifactCount: snippetMatched(expectedSnippets, "java-v103-cleanup") ? 0 : -1,
    credentialValueIncluded: false,
    rawEndpointUrlIncluded: false,
    payloadMayContainSecrets: false,
    connectionAttempted: false,
    externalRequestSent: false,
    credentialValueRead: false,
    schemaMigrationExecuted: false,
    productionRecordWritten: false,
    javaStarted: false,
    miniKvStarted: false,
    externalAuditServiceStarted: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForNodeV257FakeTransportPacketUpstreamEchoVerification:
      snippetMatched(expectedSnippets, "java-v103-node-v257"),
    readyForNodeV257Alignment: false,
  };

  return { ...reference, readyForNodeV257Alignment: isJavaV103Ready(reference) };
}

export function createMiniKvV112Reference(): MiniKvV112FakeTransportPacketNonParticipationReference {
  const receipt = objectField(
    readJsonObject(MINI_KV_V112_RECEIPT),
    "fake_transport_dry_run_packet_non_participation_receipt",
  );
  const request = objectField(receipt, "request");
  const response = objectField(receipt, "response");
  const evidenceFiles = [
    evidenceFile("mini-kv-v112-receipt", MINI_KV_V112_RECEIPT, { textMode: "raw" }),
    evidenceFile("mini-kv-v112-runbook", MINI_KV_V112_RUNBOOK, { textMode: "raw" }),
    evidenceFile("mini-kv-v112-walkthrough", MINI_KV_V112_WALKTHROUGH, { textMode: "raw" }),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v112-receipt-version", MINI_KV_V112_RECEIPT, "mini-kv-fake-transport-dry-run-packet-non-participation-receipt.v1"),
    snippet("mini-kv-v112-consumer", MINI_KV_V112_RECEIPT, "Node v257 fake transport packet upstream echo verification"),
    snippet("mini-kv-v112-node-v255", MINI_KV_V112_RECEIPT, "Node v255 fake transport adapter dry-run verification packet"),
    snippet("mini-kv-v112-node-v256", MINI_KV_V112_RECEIPT, "Node v256 fake transport packet archive verification"),
    snippet("mini-kv-v112-no-rerun", MINI_KV_V112_RECEIPT, "\"source_archive_reruns_fake_transport_behavior\":false"),
    snippet("mini-kv-v112-request-count", MINI_KV_V112_WALKTHROUGH, "source_request_shape_field_count=8"),
    snippet("mini-kv-v112-response-count", MINI_KV_V112_WALKTHROUGH, "source_response_shape_field_count=9"),
    snippet("mini-kv-v112-failure-count", MINI_KV_V112_WALKTHROUGH, "source_failure_mapping_count=6"),
    snippet("mini-kv-v112-timeout", MINI_KV_V112_WALKTHROUGH, "source_timeout_budget_ms=15000"),
    snippet("mini-kv-v112-cleanup", MINI_KV_V112_WALKTHROUGH, "source_cleanup_artifact_count=0"),
    snippet("mini-kv-v112-no-temp-dir", MINI_KV_V112_WALKTHROUGH, "source_temporary_directory_created=false"),
    snippet("mini-kv-v112-no-temp-file", MINI_KV_V112_WALKTHROUGH, "source_temporary_file_created=false"),
    snippet("mini-kv-v112-no-storage", MINI_KV_V112_WALKTHROUGH, "storage_write_allowed=false"),
    snippet("mini-kv-v112-no-restore", MINI_KV_V112_WALKTHROUGH, "load_restore_compact_executed=false"),
    snippet("mini-kv-v112-not-backend", MINI_KV_V112_WALKTHROUGH, "managed_audit_storage_backend=false"),
  ];
  const reference: MiniKvV112FakeTransportPacketNonParticipationReference = {
    sourceVersion: "mini-kv v112",
    tagLabel: "\u7b2c\u4e00\u767e\u4e00\u5341\u4e8c\u7248\u5047\u4f20\u8f93\u5305\u975e\u53c2\u4e0e\u56de\u6267",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    ...mapReceiptFields(receipt, V112_IDENTITY_FIELDS),
    ...mapReceiptFields(receipt, V112_SOURCE_FIELDS),
    ...mapReceiptFields(request, V112_REQUEST_FIELDS),
    ...mapReceiptFields(response, V112_RESPONSE_FIELDS),
    ...mapReceiptFields(receipt, V112_RUNTIME_FIELDS),
    readyForNodeV257Alignment: false,
  };

  return { ...reference, readyForNodeV257Alignment: isMiniKvV112Ready(reference) };
}

function isJavaV103Ready(reference: JavaV103FakeTransportPacketEchoMarkerReference): boolean {
  return reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v25"
    && reference.markerField === "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker"
    && reference.consumedByNodeV255Profile
      === "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1"
    && reference.consumedByNodeV256Profile
      === "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1"
    && reference.nextNodeConsumerVersion === "Node v257"
    && reference.requestShapeFieldCount === 8
    && reference.responseShapeFieldCount === 9
    && reference.failureMappingCount === 6
    && reference.guardConditionCount === 7
    && reference.timeoutBudgetMs === 15000
    && reference.cleanupArtifactCount === 0
    && allBooleanFieldsAre(reference, JAVA_READY_TRUE_FIELDS, true)
    && allBooleanFieldsAre(reference, JAVA_READY_FALSE_FIELDS, false);
}

function isMiniKvV112Ready(reference: MiniKvV112FakeTransportPacketNonParticipationReference): boolean {
  return hasV112Identity(reference)
    && hasV112SourceShape(reference)
    && keepsV112PayloadClosed(reference)
    && keepsV112RuntimeClosed(reference);
}

function hasV112Identity(reference: MiniKvV112FakeTransportPacketNonParticipationReference): boolean {
  return reference.evidencePresent
    && reference.verificationDocumented
    && reference.receiptVersion === "mini-kv-fake-transport-dry-run-packet-non-participation-receipt.v1"
    && reference.releaseVersion === "v112"
    && reference.consumerHint === "Node v257 fake transport packet upstream echo verification"
    && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest);
}

function hasV112SourceShape(reference: MiniKvV112FakeTransportPacketNonParticipationReference): boolean {
  return reference.sourcePacketProfileVersion
      === "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1"
    && reference.sourcePacketState === "fake-transport-adapter-dry-run-verification-packet-ready"
    && reference.sourceArchiveState === "fake-transport-packet-archive-verification-ready"
    && reference.sourceRequestShapeFieldCount === 8
    && reference.sourceResponseShapeFieldCount === 9
    && reference.sourceFailureMappingCount === 6
    && reference.sourceTimeoutBudgetMs === 15000
    && reference.sourceCleanupArtifactCount === 0
    && allBooleanFieldsAre(reference, V112_SOURCE_TRUE_FIELDS, true)
    && allBooleanFieldsAre(reference, V112_SOURCE_FALSE_FIELDS, false);
}

function keepsV112PayloadClosed(reference: MiniKvV112FakeTransportPacketNonParticipationReference): boolean {
  return allBooleanFieldsAre(reference, V112_REQUEST_RESPONSE_FALSE_FIELDS, false);
}

function keepsV112RuntimeClosed(reference: MiniKvV112FakeTransportPacketNonParticipationReference): boolean {
  return reference.cleanupArtifactCount === 0
    && allBooleanFieldsAre(reference, V112_RUNTIME_TRUE_FIELDS, true)
    && allBooleanFieldsAre(reference, V112_RUNTIME_FALSE_FIELDS, false);
}
