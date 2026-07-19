import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket,
} from "./managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification.js";
import type {
  FakeTransportPacketUpstreamEchoVerificationChecks,
  FakeTransportPacketUpstreamEchoVerificationMessage,
  JavaV103FakeTransportPacketEchoMarkerReference,
  ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile,
  MiniKvV112FakeTransportPacketNonParticipationReference,
  SourceNodeV255FakeTransportPacketReference,
  SourceNodeV256ArchiveVerificationReference,
  VerificationEvidenceFile,
  VerificationSnippetMatch,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification";
const NODE_V255_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet";
const NODE_V256_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification";
const ACTIVE_PLAN = "docs/plans/v255-post-fake-transport-dry-run-roadmap.md";

const JAVA_V103_RUNBOOK = "D:/javaproj/advanced-order-platform/c/103/解释/说明.md";
const JAVA_V103_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/106-version-103-fake-transport-dry-run-packet-echo-marker.md";
const JAVA_V103_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarkerBuilder.java";

const MINI_KV_V112_RECEIPT = "D:/C/mini-kv/fixtures/release/fake-transport-dry-run-packet-non-participation-receipt.json";
const MINI_KV_V112_RUNBOOK = "D:/C/mini-kv/c/112/解释/说明.md";
const MINI_KV_V112_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/168-version-112-fake-transport-packet-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile {
  const sourceNodeV255 = createSourceNodeV255(
    loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({ config: input.config }),
  );
  const sourceNodeV256 = createSourceNodeV256(
    loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification({ config: input.config }),
  );
  const javaV103 = createJavaV103Reference();
  const miniKvV112 = createMiniKvV112Reference();
  const checks = createChecks(input.config, sourceNodeV255, sourceNodeV256, javaV103, miniKvV112);
  checks.readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification
    ? "fake-transport-packet-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    nodeV255PacketDigest: sourceNodeV255.packetDigest,
    nodeV256ArchiveDigest: sourceNodeV256.archiveVerificationDigest,
    javaV103MarkerVersion: javaV103.markerVersion,
    miniKvV112ReceiptDigest: miniKvV112.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection fake transport packet upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV255,
    sourceNodeV256,
    upstreamEchoes: { javaV103, miniKvV112 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v103-plus-mini-kv-v112-fake-transport-packet-upstream-echo-verification-only",
      sourceSpan: "Node v255 + Node v256 + Java v103 + mini-kv v112",
      requestShapeAligned: checks.requestShapeAligned,
      responseShapeAligned: checks.responseShapeAligned,
      timeoutBoundaryAligned: checks.timeoutBoundaryAligned,
      failureMappingAligned: checks.failureMappingAligned,
      cleanupBoundaryAligned: checks.cleanupBoundaryAligned,
      archiveNoRerunAligned: checks.archiveNoRerunAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      nodeV257BlocksRealConnection: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV103.evidenceFiles.filter((file) => file.exists).length
        + miniKvV112.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV103.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV112.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      fakeTransportPacketUpstreamEchoVerificationJson: ROUTE_PATH,
      fakeTransportPacketUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV255Json: NODE_V255_ROUTE,
      sourceNodeV256Json: NODE_V256_ROUTE,
      javaV103Runbook: JAVA_V103_RUNBOOK,
      miniKvV112Receipt: MINI_KV_V112_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Close the v255-derived fake transport plan after v257 archive, tests, screenshot, commit, and tag are complete.",
      "Start a new plan before moving from fake transport evidence to any real sandbox endpoint, credential resolver, or schema migration rehearsal.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false and require explicit approval before any future real managed audit request is sent.",
    ],
  };
}

function createSourceNodeV255(
  source: ReturnType<typeof loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket>,
): SourceNodeV255FakeTransportPacketReference {
  const packet = source.fakeTransportDryRunPacket;

  return {
    sourceVersion: "Node v255",
    profileVersion: source.profileVersion,
    packetState: source.packetState,
    readyForFakeTransportPacket: source.readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket,
    packetDigest: packet.packetDigest,
    requestDigest: packet.request.requestDigest,
    responseDigest: packet.response.responseDigest,
    requestShapeFieldCount: packet.request.requestShapeFieldCount,
    responseShapeFieldCount: packet.response.responseShapeFieldCount,
    failureMappingCount: packet.failureMappingVerification.mappedFailureCount,
    timeoutBudgetMs: packet.timeoutBudget.timeoutBudgetMs,
    cleanupArtifactCount: packet.cleanup.cleanupArtifactCount,
    cleanupVerified: packet.cleanup.cleanupVerified,
    fakeTransportOnly: source.fakeTransportOnly,
    dryRunOnly: source.dryRunOnly,
    credentialValueIncluded: packet.request.credentialValueIncluded,
    rawEndpointUrlIncluded: packet.request.rawEndpointUrlIncluded,
    payloadMayContainSecrets: packet.request.payloadMayContainSecrets,
    connectionAttempted: packet.boundaries.connectionAttempted,
    externalRequestSent: packet.boundaries.externalRequestSent,
    credentialValueRead: packet.boundaries.credentialValueRead,
    schemaMigrationExecuted: packet.boundaries.schemaMigrationExecuted,
    productionRecordWritten: packet.boundaries.productionRecordWritten,
    javaStarted: packet.boundaries.javaStarted,
    miniKvStarted: packet.boundaries.miniKvStarted,
  };
}

function createSourceNodeV256(
  source: ReturnType<typeof loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification>,
): SourceNodeV256ArchiveVerificationReference {
  return {
    sourceVersion: "Node v256",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    readyForArchiveVerification: source.readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification,
    archiveVerificationDigest: source.archiveVerification.archiveVerificationDigest,
    archiveFileCount: source.summary.archiveFileCount,
    requiredSnippetCount: source.summary.requiredSnippetCount,
    matchedSnippetCount: source.summary.matchedSnippetCount,
    archiveVerificationRerunsFakeTransportBehavior: source.archiveVerificationRerunsFakeTransportBehavior,
    readOnlyArchiveVerification: source.readOnlyArchiveVerification,
    noTempDryRunDirectoryCreated: source.checks.noTempDryRunDirectoryCreated,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
  };
}

function createJavaV103Reference(): JavaV103FakeTransportPacketEchoMarkerReference {
  const evidenceFiles = [
    evidenceFile("java-v103-runbook", JAVA_V103_RUNBOOK),
    evidenceFile("java-v103-walkthrough", JAVA_V103_WALKTHROUGH),
    evidenceFile("java-v103-builder", JAVA_V103_BUILDER),
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
    snippet("java-v103-no-temp-dir", JAVA_V103_RUNBOOK, "不创建临时文件或目录"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v103" as const,
    tagLabel: "v103订单平台fake-transport-dry-run-packet-echo-marker",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v103-schema")
      ? "java-release-approval-rehearsal-response-schema.v25" as const
      : "missing" as const,
    markerField: snippetMatched(expectedSnippets, "java-v103-marker-field")
      ? "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker" as const
      : "missing" as const,
    markerVersion: snippetMatched(expectedSnippets, "java-v103-marker-version")
      ? "java-release-approval-rehearsal-managed-audit-sandbox-connection-fake-transport-dry-run-packet-echo-marker.v1"
      : "missing",
    consumedByNodeV255Profile: snippetMatched(expectedSnippets, "java-v103-node-v255")
      ? "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1"
      : "missing",
    consumedByNodeV256Profile: snippetMatched(expectedSnippets, "java-v103-node-v256")
      ? "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v103-node-v257")
      ? "Node v257" as const
      : "missing" as const,
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
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV257FakeTransportPacketUpstreamEchoVerification: snippetMatched(expectedSnippets, "java-v103-node-v257"),
    readyForNodeV257Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV257Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v25"
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
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlIncluded
      && !reference.payloadMayContainSecrets
      && !reference.connectionAttempted
      && !reference.externalRequestSent
      && !reference.credentialValueRead
      && !reference.schemaMigrationExecuted
      && !reference.productionRecordWritten
      && !reference.javaStarted
      && !reference.miniKvStarted
      && !reference.externalAuditServiceStarted
      && !reference.readyForManagedAuditSandboxAdapterConnection
      && reference.readyForNodeV257FakeTransportPacketUpstreamEchoVerification,
  };
}

function createMiniKvV112Reference(): MiniKvV112FakeTransportPacketNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v112-receipt", MINI_KV_V112_RECEIPT),
    evidenceFile("mini-kv-v112-runbook", MINI_KV_V112_RUNBOOK),
    evidenceFile("mini-kv-v112-walkthrough", MINI_KV_V112_WALKTHROUGH),
  ];
  const receipt = objectField(readJsonObject(MINI_KV_V112_RECEIPT), "fake_transport_dry_run_packet_non_participation_receipt");
  const request = objectField(receipt, "request");
  const response = objectField(receipt, "response");
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
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "mini-kv v112" as const,
    tagLabel: "第一百一十二版假传输包非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion: stringField(receipt, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "current_release_version") ?? "missing",
    consumerHint: stringField(receipt, "consumer_hint") ?? "missing",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "missing",
    sourcePacketProfileVersion: stringField(receipt, "source_packet_profile_version") ?? "missing",
    sourcePacketState: stringField(receipt, "source_packet_state") ?? "missing",
    sourceArchiveState: stringField(receipt, "source_archive_state") ?? "missing",
    sourceArchiveRerunsFakeTransportBehavior: booleanField(receipt, "source_archive_reruns_fake_transport_behavior") ?? true,
    sourceReadyForFakeTransportPacket: booleanField(receipt, "source_ready_for_fake_transport_packet") ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection") ?? true,
    sourceFakeTransportOnly: booleanField(receipt, "source_fake_transport_only") ?? false,
    sourceDryRunOnly: booleanField(receipt, "source_dry_run_only") ?? false,
    sourceRequestShapeFieldCount: numberField(receipt, "source_request_shape_field_count") ?? 0,
    sourceResponseShapeFieldCount: numberField(receipt, "source_response_shape_field_count") ?? 0,
    sourceFailureMappingCount: numberField(receipt, "source_failure_mapping_count") ?? 0,
    sourceTimeoutBudgetMs: numberField(receipt, "source_timeout_budget_ms") ?? 0,
    sourceCleanupArtifactCount: numberField(receipt, "source_cleanup_artifact_count") ?? -1,
    sourceCleanupVerified: booleanField(receipt, "source_cleanup_verified") ?? false,
    sourceTemporaryDirectoryCreated: booleanField(receipt, "source_temporary_directory_created") ?? true,
    sourceTemporaryFileCreated: booleanField(receipt, "source_temporary_file_created") ?? true,
    requestCredentialValueIncluded: booleanField(request, "credential_value_included") ?? true,
    requestRawEndpointUrlIncluded: booleanField(request, "raw_endpoint_url_included") ?? true,
    requestPayloadMayContainSecrets: booleanField(request, "payload_may_contain_secrets") ?? true,
    responseConnectionAttempted: booleanField(response, "connection_attempted") ?? true,
    responseExternalRequestSent: booleanField(response, "external_request_sent") ?? true,
    responseCredentialValueRead: booleanField(response, "credential_value_read") ?? true,
    responseSchemaMigrationExecuted: booleanField(response, "schema_migration_executed") ?? true,
    responseProductionRecordWritten: booleanField(response, "production_record_written") ?? true,
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(receipt, "dry_run_only") ?? false,
    nodeAutoStartAllowed: booleanField(receipt, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(receipt, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(receipt, "mini_kv_auto_start_allowed") ?? true,
    externalAuditServiceAutoStartAllowed: booleanField(receipt, "external_audit_service_auto_start_allowed") ?? true,
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed") ?? true,
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed") ?? true,
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded") ?? true,
    externalRequestSent: booleanField(receipt, "external_request_sent") ?? true,
    temporaryDirectoryCreated: booleanField(receipt, "temporary_directory_created") ?? true,
    temporaryFileCreated: booleanField(receipt, "temporary_file_created") ?? true,
    cleanupArtifactCount: numberField(receipt, "cleanup_artifact_count") ?? -1,
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed") ?? true,
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? true,
    readyForNodeV257Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV257Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-fake-transport-dry-run-packet-non-participation-receipt.v1"
      && reference.releaseVersion === "v112"
      && reference.consumerHint === "Node v257 fake transport packet upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourcePacketProfileVersion
        === "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1"
      && reference.sourcePacketState === "fake-transport-adapter-dry-run-verification-packet-ready"
      && reference.sourceArchiveState === "fake-transport-packet-archive-verification-ready"
      && !reference.sourceArchiveRerunsFakeTransportBehavior
      && reference.sourceReadyForFakeTransportPacket
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && reference.sourceFakeTransportOnly
      && reference.sourceDryRunOnly
      && reference.sourceRequestShapeFieldCount === 8
      && reference.sourceResponseShapeFieldCount === 9
      && reference.sourceFailureMappingCount === 6
      && reference.sourceTimeoutBudgetMs === 15000
      && reference.sourceCleanupArtifactCount === 0
      && reference.sourceCleanupVerified
      && !reference.sourceTemporaryDirectoryCreated
      && !reference.sourceTemporaryFileCreated
      && !reference.requestCredentialValueIncluded
      && !reference.requestRawEndpointUrlIncluded
      && !reference.requestPayloadMayContainSecrets
      && !reference.responseConnectionAttempted
      && !reference.responseExternalRequestSent
      && !reference.responseCredentialValueRead
      && !reference.responseSchemaMigrationExecuted
      && !reference.responseProductionRecordWritten
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && !reference.nodeAutoStartAllowed
      && !reference.javaAutoStartAllowed
      && !reference.miniKvAutoStartAllowed
      && !reference.externalAuditServiceAutoStartAllowed
      && !reference.storageWriteAllowed
      && !reference.managedAuditWriteExecuted
      && !reference.credentialValueReadAllowed
      && !reference.credentialValueLoaded
      && !reference.externalRequestSent
      && !reference.temporaryDirectoryCreated
      && !reference.temporaryFileCreated
      && reference.cleanupArtifactCount === 0
      && !reference.restoreExecutionAllowed
      && !reference.loadRestoreCompactExecuted
      && !reference.setnxexExecutionAllowed
      && !reference.managedAuditStorageBackend
      && !reference.orderAuthoritative,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV255: SourceNodeV255FakeTransportPacketReference,
  sourceNodeV256: SourceNodeV256ArchiveVerificationReference,
  javaV103: JavaV103FakeTransportPacketEchoMarkerReference,
  miniKvV112: MiniKvV112FakeTransportPacketNonParticipationReference,
): FakeTransportPacketUpstreamEchoVerificationChecks {
  return {
    sourceNodeV255Ready: sourceNodeV255.readyForFakeTransportPacket
      && sourceNodeV255.packetState === "fake-transport-adapter-dry-run-verification-packet-ready",
    sourceNodeV256Ready: sourceNodeV256.readyForArchiveVerification
      && sourceNodeV256.archiveVerificationState === "fake-transport-packet-archive-verification-ready",
    sourceNodeBoundariesStillClosed:
      sourceNodeV255.fakeTransportOnly
      && sourceNodeV255.dryRunOnly
      && !sourceNodeV255.credentialValueIncluded
      && !sourceNodeV255.rawEndpointUrlIncluded
      && !sourceNodeV255.payloadMayContainSecrets
      && !sourceNodeV255.connectionAttempted
      && !sourceNodeV255.externalRequestSent
      && !sourceNodeV255.credentialValueRead
      && !sourceNodeV255.schemaMigrationExecuted
      && !sourceNodeV255.productionRecordWritten
      && !sourceNodeV255.javaStarted
      && !sourceNodeV255.miniKvStarted
      && sourceNodeV256.readOnlyArchiveVerification
      && !sourceNodeV256.archiveVerificationRerunsFakeTransportBehavior
      && sourceNodeV256.noTempDryRunDirectoryCreated
      && !sourceNodeV256.connectsManagedAudit
      && !sourceNodeV256.readsManagedAuditCredential,
    javaV103EchoReady: javaV103.readyForNodeV257Alignment,
    miniKvV112NonParticipationReady: miniKvV112.readyForNodeV257Alignment,
    requestShapeAligned:
      sourceNodeV255.requestShapeFieldCount === 8
      && javaV103.requestShapeFieldCount === 8
      && miniKvV112.sourceRequestShapeFieldCount === 8
      && !javaV103.credentialValueIncluded
      && !miniKvV112.requestCredentialValueIncluded
      && !javaV103.rawEndpointUrlIncluded
      && !miniKvV112.requestRawEndpointUrlIncluded
      && !javaV103.payloadMayContainSecrets
      && !miniKvV112.requestPayloadMayContainSecrets,
    responseShapeAligned:
      sourceNodeV255.responseShapeFieldCount === 9
      && javaV103.responseShapeFieldCount === 9
      && miniKvV112.sourceResponseShapeFieldCount === 9
      && !javaV103.connectionAttempted
      && !miniKvV112.responseConnectionAttempted
      && !javaV103.externalRequestSent
      && !miniKvV112.responseExternalRequestSent
      && !javaV103.credentialValueRead
      && !miniKvV112.responseCredentialValueRead
      && !javaV103.schemaMigrationExecuted
      && !miniKvV112.responseSchemaMigrationExecuted
      && !javaV103.productionRecordWritten
      && !miniKvV112.responseProductionRecordWritten,
    timeoutBoundaryAligned:
      sourceNodeV255.timeoutBudgetMs === 15000
      && javaV103.timeoutBudgetMs === 15000
      && miniKvV112.sourceTimeoutBudgetMs === 15000,
    failureMappingAligned:
      sourceNodeV255.failureMappingCount === 6
      && javaV103.failureMappingCount === 6
      && miniKvV112.sourceFailureMappingCount === 6,
    cleanupBoundaryAligned:
      sourceNodeV255.cleanupArtifactCount === 0
      && sourceNodeV255.cleanupVerified
      && javaV103.cleanupArtifactCount === 0
      && miniKvV112.sourceCleanupArtifactCount === 0
      && miniKvV112.sourceCleanupVerified
      && !miniKvV112.sourceTemporaryDirectoryCreated
      && !miniKvV112.sourceTemporaryFileCreated
      && miniKvV112.cleanupArtifactCount === 0
      && !miniKvV112.temporaryDirectoryCreated
      && !miniKvV112.temporaryFileCreated,
    archiveNoRerunAligned:
      !sourceNodeV256.archiveVerificationRerunsFakeTransportBehavior
      && !miniKvV112.sourceArchiveRerunsFakeTransportBehavior,
    credentialBoundaryAligned:
      !sourceNodeV255.credentialValueRead
      && !javaV103.credentialValueRead
      && !miniKvV112.credentialValueReadAllowed
      && !miniKvV112.credentialValueLoaded,
    connectionBoundaryAligned:
      !sourceNodeV255.connectionAttempted
      && !javaV103.connectionAttempted
      && !miniKvV112.responseConnectionAttempted
      && !miniKvV112.externalRequestSent,
    writeBoundaryAligned:
      !sourceNodeV255.productionRecordWritten
      && !javaV103.productionRecordWritten
      && !miniKvV112.storageWriteAllowed
      && !miniKvV112.managedAuditWriteExecuted
      && !miniKvV112.managedAuditStorageBackend
      && !miniKvV112.orderAuthoritative,
    autoStartBoundaryAligned:
      !javaV103.javaStarted
      && !javaV103.miniKvStarted
      && !javaV103.externalAuditServiceStarted
      && !miniKvV112.nodeAutoStartAllowed
      && !miniKvV112.javaAutoStartAllowed
      && !miniKvV112.miniKvAutoStartAllowed
      && !miniKvV112.externalAuditServiceAutoStartAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: FakeTransportPacketUpstreamEchoVerificationChecks,
): FakeTransportPacketUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: FakeTransportPacketUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV255Ready && checks.sourceNodeV256Ready && checks.sourceNodeBoundariesStillClosed,
      code: "NODE_FAKE_TRANSPORT_SOURCES_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
      message: "Node v255 and v256 must be ready and still block all real connection effects.",
    },
    {
      condition: checks.javaV103EchoReady,
      code: "JAVA_V103_FAKE_TRANSPORT_ECHO_NOT_READY",
      source: "java-v103-fake-transport-dry-run-packet-echo-marker",
      message: "Java v103 must expose the fake transport dry-run packet echo marker for Node v257.",
    },
    {
      condition: checks.miniKvV112NonParticipationReady,
      code: "MINI_KV_V112_FAKE_TRANSPORT_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v112-fake-transport-packet-non-participation-receipt",
      message: "mini-kv v112 must prove no auto-start, no storage write, no credential read, and no backend role.",
    },
    {
      condition:
        checks.requestShapeAligned
        && checks.responseShapeAligned
        && checks.timeoutBoundaryAligned
        && checks.failureMappingAligned
        && checks.cleanupBoundaryAligned
        && checks.archiveNoRerunAligned,
      code: "FAKE_TRANSPORT_PACKET_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
      message: "Node, Java, and mini-kv must align on request, response, timeout, failure, cleanup, and archive no-rerun boundaries.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "FAKE_TRANSPORT_PACKET_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
      message: "Credential, connection, write, and auto-start boundaries must remain closed in all three projects.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v257 upstream echo verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): FakeTransportPacketUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
      message: "v257 verifies upstream echo evidence only; it does not open a real managed audit connection.",
    },
    {
      code: "FAKE_TRANSPORT_REMAINS_TEST_ONLY",
      severity: "warning",
      source: "node-v255-fake-transport-packet",
      message: "The fake transport packet remains a test-only shape and cleanup proof, not a production adapter client.",
    },
  ];
}

function collectRecommendations(): FakeTransportPacketUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_NEXT_PLAN_BEFORE_REAL_ENDPOINT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
      message: "After v257 is archived, write a new plan before introducing real endpoint, credential resolver, or schema migration rehearsal.",
    },
    {
      code: "KEEP_UPSTREAM_RECEIPTS_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
      message: "Do not treat Java v103 or mini-kv v112 receipts as authorization to read credential values, start services, or write state.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): VerificationEvidenceFile {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  if (!historicalEvidenceExists(filePath)) {
    return { id, path: filePath, resolvedPath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readHistoricalEvidenceFile(filePath);
  return {
    id,
    path: filePath,
    resolvedPath,
    exists: true,
    sizeBytes: statHistoricalEvidence(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, filePath: string, expectedText: string): VerificationSnippetMatch {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  const content = historicalEvidenceExists(filePath) ? readHistoricalEvidenceFile(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    resolvedPath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function readJsonObject(filePath: string): Record<string, unknown> {
  if (!historicalEvidenceExists(filePath)) {
    return {};
  }
  const parsed: unknown = JSON.parse(readHistoricalEvidenceFile(filePath, "utf8"));
  return isRecord(parsed) ? parsed : {};
}

function objectField(input: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = input[key];
  return isRecord(value) ? value : {};
}

function stringField(input: Record<string, unknown>, key: string): string | null {
  const value = input[key];
  return typeof value === "string" ? value : null;
}

function numberField(input: Record<string, unknown>, key: string): number | null {
  const value = input[key];
  return typeof value === "number" ? value : null;
}

function booleanField(input: Record<string, unknown>, key: string): boolean | null {
  const value = input[key];
  return typeof value === "boolean" ? value : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function snippetMatched(snippets: VerificationSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}
