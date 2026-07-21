import type { AppConfig } from "../config.js";
import {
  JAVA_V103_RUNBOOK,
  MINI_KV_V112_RECEIPT,
  createJavaV103Reference,
  createMiniKvV112Reference,
} from "../evidence/fakeTransportEchoReferences.js";
import {
  allReportChecksPassExcept,
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
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
  checks.readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification =
    allReportChecksPassExcept(
      checks,
      "readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification",
    );
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
    sourceNodeBoundariesStillClosed: keepsSourceBoundariesClosed(sourceNodeV255, sourceNodeV256),
    javaV103EchoReady: javaV103.readyForNodeV257Alignment,
    miniKvV112NonParticipationReady: miniKvV112.readyForNodeV257Alignment,
    requestShapeAligned: hasAlignedRequestShape(sourceNodeV255, javaV103, miniKvV112),
    responseShapeAligned: hasAlignedResponseShape(sourceNodeV255, javaV103, miniKvV112),
    timeoutBoundaryAligned: sourceNodeV255.timeoutBudgetMs === 15000
      && javaV103.timeoutBudgetMs === 15000
      && miniKvV112.sourceTimeoutBudgetMs === 15000,
    failureMappingAligned: sourceNodeV255.failureMappingCount === 6
      && javaV103.failureMappingCount === 6
      && miniKvV112.sourceFailureMappingCount === 6,
    cleanupBoundaryAligned: hasAlignedCleanup(sourceNodeV255, javaV103, miniKvV112),
    archiveNoRerunAligned: !sourceNodeV256.archiveVerificationRerunsFakeTransportBehavior
      && !miniKvV112.sourceArchiveRerunsFakeTransportBehavior,
    credentialBoundaryAligned: hasClosedCredentialBoundary(sourceNodeV255, javaV103, miniKvV112),
    connectionBoundaryAligned: hasClosedConnectionBoundary(sourceNodeV255, javaV103, miniKvV112),
    writeBoundaryAligned: hasClosedWriteBoundary(sourceNodeV255, javaV103, miniKvV112),
    autoStartBoundaryAligned: hasClosedAutoStartBoundary(javaV103, miniKvV112),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification: false,
  };
}

function keepsSourceBoundariesClosed(
  v255: SourceNodeV255FakeTransportPacketReference,
  v256: SourceNodeV256ArchiveVerificationReference,
): boolean {
  return [
    v255.fakeTransportOnly,
    v255.dryRunOnly,
    !v255.credentialValueIncluded,
    !v255.rawEndpointUrlIncluded,
    !v255.payloadMayContainSecrets,
    !v255.connectionAttempted,
    !v255.externalRequestSent,
    !v255.credentialValueRead,
    !v255.schemaMigrationExecuted,
    !v255.productionRecordWritten,
    !v255.javaStarted,
    !v255.miniKvStarted,
    v256.readOnlyArchiveVerification,
    !v256.archiveVerificationRerunsFakeTransportBehavior,
    v256.noTempDryRunDirectoryCreated,
    !v256.connectsManagedAudit,
    !v256.readsManagedAuditCredential,
  ].every(Boolean);
}

function hasAlignedRequestShape(
  v255: SourceNodeV255FakeTransportPacketReference,
  java: JavaV103FakeTransportPacketEchoMarkerReference,
  miniKv: MiniKvV112FakeTransportPacketNonParticipationReference,
): boolean {
  return [
    v255.requestShapeFieldCount === 8,
    java.requestShapeFieldCount === 8,
    miniKv.sourceRequestShapeFieldCount === 8,
    !java.credentialValueIncluded,
    !miniKv.requestCredentialValueIncluded,
    !java.rawEndpointUrlIncluded,
    !miniKv.requestRawEndpointUrlIncluded,
    !java.payloadMayContainSecrets,
    !miniKv.requestPayloadMayContainSecrets,
  ].every(Boolean);
}

function hasAlignedResponseShape(
  v255: SourceNodeV255FakeTransportPacketReference,
  java: JavaV103FakeTransportPacketEchoMarkerReference,
  miniKv: MiniKvV112FakeTransportPacketNonParticipationReference,
): boolean {
  return [
    v255.responseShapeFieldCount === 9,
    java.responseShapeFieldCount === 9,
    miniKv.sourceResponseShapeFieldCount === 9,
    !java.connectionAttempted,
    !miniKv.responseConnectionAttempted,
    !java.externalRequestSent,
    !miniKv.responseExternalRequestSent,
    !java.credentialValueRead,
    !miniKv.responseCredentialValueRead,
    !java.schemaMigrationExecuted,
    !miniKv.responseSchemaMigrationExecuted,
    !java.productionRecordWritten,
    !miniKv.responseProductionRecordWritten,
  ].every(Boolean);
}

function hasAlignedCleanup(
  v255: SourceNodeV255FakeTransportPacketReference,
  java: JavaV103FakeTransportPacketEchoMarkerReference,
  miniKv: MiniKvV112FakeTransportPacketNonParticipationReference,
): boolean {
  return [
    v255.cleanupArtifactCount === 0,
    v255.cleanupVerified,
    java.cleanupArtifactCount === 0,
    miniKv.sourceCleanupArtifactCount === 0,
    miniKv.sourceCleanupVerified,
    !miniKv.sourceTemporaryDirectoryCreated,
    !miniKv.sourceTemporaryFileCreated,
    miniKv.cleanupArtifactCount === 0,
    !miniKv.temporaryDirectoryCreated,
    !miniKv.temporaryFileCreated,
  ].every(Boolean);
}

function hasClosedCredentialBoundary(
  v255: SourceNodeV255FakeTransportPacketReference,
  java: JavaV103FakeTransportPacketEchoMarkerReference,
  miniKv: MiniKvV112FakeTransportPacketNonParticipationReference,
): boolean {
  return !v255.credentialValueRead
    && !java.credentialValueRead
    && !miniKv.credentialValueReadAllowed
    && !miniKv.credentialValueLoaded;
}

function hasClosedConnectionBoundary(
  v255: SourceNodeV255FakeTransportPacketReference,
  java: JavaV103FakeTransportPacketEchoMarkerReference,
  miniKv: MiniKvV112FakeTransportPacketNonParticipationReference,
): boolean {
  return !v255.connectionAttempted
    && !java.connectionAttempted
    && !miniKv.responseConnectionAttempted
    && !miniKv.externalRequestSent;
}

function hasClosedWriteBoundary(
  v255: SourceNodeV255FakeTransportPacketReference,
  java: JavaV103FakeTransportPacketEchoMarkerReference,
  miniKv: MiniKvV112FakeTransportPacketNonParticipationReference,
): boolean {
  return !v255.productionRecordWritten
    && !java.productionRecordWritten
    && !miniKv.storageWriteAllowed
    && !miniKv.managedAuditWriteExecuted
    && !miniKv.managedAuditStorageBackend
    && !miniKv.orderAuthoritative;
}

function hasClosedAutoStartBoundary(
  java: JavaV103FakeTransportPacketEchoMarkerReference,
  miniKv: MiniKvV112FakeTransportPacketNonParticipationReference,
): boolean {
  return !java.javaStarted
    && !java.miniKvStarted
    && !java.externalAuditServiceStarted
    && !miniKv.nodeAutoStartAllowed
    && !miniKv.javaAutoStartAllowed
    && !miniKv.miniKvAutoStartAllowed
    && !miniKv.externalAuditServiceAutoStartAllowed;
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
      condition: checks.requestShapeAligned
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
      condition: checks.credentialBoundaryAligned
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
