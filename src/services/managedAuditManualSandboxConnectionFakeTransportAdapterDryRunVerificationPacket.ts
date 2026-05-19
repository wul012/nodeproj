import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.js";
import {
  loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
} from "./managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.js";
import type {
  ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
} from "./managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.js";
import type {
  FakeTransportAdapterDryRunVerificationPacketChecks,
  FakeTransportAdapterDryRunVerificationPacketMessage,
  FakeTransportAdapterDryRunPacket,
  FakeTransportDryRunBoundaries,
  FakeTransportDryRunRequest,
  FakeTransportDryRunResponse,
  ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile,
  SourceNodeV253ShellContractSummary,
  SourceNodeV254UpstreamEchoSummary,
} from "./managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketTypes.js";
export {
  renderManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketMarkdown,
} from "./managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet";
const NODE_V253_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract";
const NODE_V254_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md";

export function loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile {
  const sourceNodeV253 = createSourceNodeV253(
    loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({ config: input.config }),
  );
  const sourceNodeV254 = createSourceNodeV254(
    loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({ config: input.config }),
  );
  const fakeTransportDryRunPacket = createFakeTransportDryRunPacket(sourceNodeV253, sourceNodeV254);
  const checks = createChecks(input.config, sourceNodeV253, sourceNodeV254, fakeTransportDryRunPacket);
  checks.readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket")
    .every(([, value]) => value);
  const packetState = checks.readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket
    ? "fake-transport-adapter-dry-run-verification-packet-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection fake transport adapter dry-run verification packet",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    packetState,
    readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket:
      checks.readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    fakeTransportOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV253,
    sourceNodeV254,
    fakeTransportDryRunPacket,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requestShapeFieldCount: fakeTransportDryRunPacket.request.requestShapeFieldCount,
      responseShapeFieldCount: fakeTransportDryRunPacket.response.responseShapeFieldCount,
      failureMappingCount: fakeTransportDryRunPacket.failureMappingVerification.mappedFailureCount,
      timeoutBudgetMs: fakeTransportDryRunPacket.timeoutBudget.timeoutBudgetMs,
      cleanupArtifactCount: fakeTransportDryRunPacket.cleanup.cleanupArtifactCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      fakeTransportAdapterDryRunVerificationPacketJson: ROUTE_PATH,
      fakeTransportAdapterDryRunVerificationPacketMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV253Json: NODE_V253_ROUTE,
      sourceNodeV254Json: NODE_V254_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Close the v252-derived disabled-adapter-client plan after v255 archive verification is committed.",
      "Plan the next stage separately before introducing any real endpoint, credential resolver, or schema migration rehearsal.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until a future plan explicitly authorizes a real managed audit adapter window.",
    ],
  };
}

function createSourceNodeV253(
  source: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
): SourceNodeV253ShellContractSummary {
  return {
    sourceVersion: "Node v253",
    profileVersion: source.profileVersion,
    shellContractState: source.shellContractState,
    contractDigest: source.testOnlyAdapterShellContract.contractDigest,
    readyForTestOnlyAdapterShellContract:
      source.readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
    transportKind: source.testOnlyAdapterShellContract.transportKind,
    fakeTransportOnly: true,
    realClientImplemented: false,
    realTransportAllowed: false,
    requestShapeFieldCount: source.testOnlyAdapterShellContract.requestShapeFieldCount,
    responseShapeFieldCount: source.testOnlyAdapterShellContract.responseShapeFieldCount,
    failureMappingCount: source.testOnlyAdapterShellContract.failureMappingCount,
    guardConditionCount: source.testOnlyAdapterShellContract.guardConditionCount,
    externalRequestSent: false,
    credentialValueRead: false,
    productionRecordWritten: false,
  };
}

function createSourceNodeV254(
  source: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile,
): SourceNodeV254UpstreamEchoSummary {
  return {
    sourceVersion: "Node v254",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    verificationDigest: source.echoVerification.verificationDigest,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification,
    javaV102EchoReady: source.checks.javaV102EchoReady,
    miniKvV111NonParticipationReady: source.checks.miniKvV111NonParticipationReady,
    envHandleCountAligned: source.echoVerification.envHandleCountAligned,
    failureClassCountAligned: source.echoVerification.failureClassCountAligned,
    dryRunResponseShapeAligned: source.echoVerification.dryRunResponseShapeAligned,
    fakeTransportShapeAligned: source.echoVerification.fakeTransportShapeAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    readyForSandboxAdapterConnection: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
  };
}

function createFakeTransportDryRunPacket(
  sourceNodeV253: SourceNodeV253ShellContractSummary,
  sourceNodeV254: SourceNodeV254UpstreamEchoSummary,
): FakeTransportAdapterDryRunPacket {
  const request = createDryRunRequest(sourceNodeV253);
  const response = createDryRunResponse(sourceNodeV253, request);
  const timeoutBudget = {
    timeoutBudgetMs: 15000 as const,
    finiteBudget: true as const,
    budgetSource: "operator-review-field" as const,
    budgetSpent: false as const,
    timerStarted: false as const,
    timeoutClassifiable: true as const,
  };
  const failureMappingVerification = {
    sourceFailureMappingCount: sourceNodeV253.failureMappingCount,
    mappedFailureCount: sourceNodeV254.failureClassCountAligned ? 6 : 0,
    allFailuresNonRetryable: true,
    credentialValueRequestStillBlocked: sourceNodeV254.credentialBoundaryAligned,
    manualWindowClosedStillBlocked: true,
    failureMappingCovered: sourceNodeV253.failureMappingCount === 6 && sourceNodeV254.failureClassCountAligned,
  };
  const cleanup = {
    inMemoryOnly: true as const,
    temporaryDirectoryCreated: false as const,
    temporaryFileCreated: false as const,
    cleanupRequired: false as const,
    cleanupArtifactCount: 0 as const,
    cleanupVerified: true as const,
    nodeServiceStartedByPacket: false as const,
  };
  const boundaries = createBoundaries();
  const digestMaterial = {
    packetMode: "fake-transport-adapter-dry-run-verification-only",
    sourceSpan: "Node v253 + Node v254",
    nodeV253ContractDigest: sourceNodeV253.contractDigest,
    nodeV254VerificationDigest: sourceNodeV254.verificationDigest,
    request,
    response,
    timeoutBudget,
    failureMappingVerification,
    cleanup,
    boundaries,
  };

  return {
    packetDigest: sha256StableJson(digestMaterial),
    packetMode: "fake-transport-adapter-dry-run-verification-only",
    sourceSpan: "Node v253 + Node v254",
    request,
    response,
    timeoutBudget,
    failureMappingVerification,
    cleanup,
    boundaries,
  };
}

function createDryRunRequest(sourceNodeV253: SourceNodeV253ShellContractSummary): FakeTransportDryRunRequest {
  const request = {
    requestId: "managed-audit-v255-fake-transport-dry-run" as const,
    operation: "managed-audit-sandbox-connection-dry-run" as const,
    transportKind: "fake-in-memory" as const,
    credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE" as const,
    endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE" as const,
    ownerApprovalArtifactId: "owner-approval-artifact-review-only" as const,
    timeoutBudgetMs: 15000 as const,
    dryRun: true as const,
    fakeTransportOnly: true as const,
    credentialValueIncluded: false as const,
    rawEndpointUrlIncluded: false as const,
    payloadMayContainSecrets: false as const,
    requestShapeFieldCount: sourceNodeV253.requestShapeFieldCount,
  };

  return {
    ...request,
    requestDigest: sha256StableJson(request),
  };
}

function createDryRunResponse(
  sourceNodeV253: SourceNodeV253ShellContractSummary,
  request: FakeTransportDryRunRequest,
): FakeTransportDryRunResponse {
  const response = {
    requestId: request.requestId,
    status: "fake-transport-dry-run-accepted" as const,
    code: "TEST_ONLY_FAKE_TRANSPORT_DRY_RUN" as const,
    fakeTransportOnly: true as const,
    timeoutBudgetMs: request.timeoutBudgetMs,
    connectionAttempted: false as const,
    externalRequestSent: false as const,
    credentialValueRead: false as const,
    schemaMigrationExecuted: false as const,
    productionRecordWritten: false as const,
    responseShapeFieldCount: sourceNodeV253.responseShapeFieldCount,
  };

  return {
    ...response,
    responseDigest: sha256StableJson(response),
  };
}

function createBoundaries(): FakeTransportDryRunBoundaries {
  return {
    connectionAttempted: false,
    externalRequestSent: false,
    credentialValueRead: false,
    schemaMigrationExecuted: false,
    productionRecordWritten: false,
    javaStarted: false,
    miniKvStarted: false,
    externalAuditServiceStarted: false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV253: SourceNodeV253ShellContractSummary,
  sourceNodeV254: SourceNodeV254UpstreamEchoSummary,
  packet: FakeTransportAdapterDryRunPacket,
): FakeTransportAdapterDryRunVerificationPacketChecks {
  return {
    sourceNodeV253Ready: sourceNodeV253.readyForTestOnlyAdapterShellContract,
    sourceNodeV254Ready: sourceNodeV254.readyForUpstreamEchoVerification,
    sourceBoundariesStillClosed:
      sourceNodeV253.fakeTransportOnly
      && !sourceNodeV253.realClientImplemented
      && !sourceNodeV253.realTransportAllowed
      && !sourceNodeV253.externalRequestSent
      && !sourceNodeV253.credentialValueRead
      && !sourceNodeV253.productionRecordWritten
      && sourceNodeV254.credentialBoundaryAligned
      && sourceNodeV254.connectionBoundaryAligned
      && sourceNodeV254.writeBoundaryAligned
      && sourceNodeV254.autoStartBoundaryAligned,
    fakeTransportOnly:
      packet.packetMode === "fake-transport-adapter-dry-run-verification-only"
      && packet.request.transportKind === "fake-in-memory"
      && packet.response.fakeTransportOnly,
    requestShapeMatchesShell:
      packet.request.requestShapeFieldCount === sourceNodeV253.requestShapeFieldCount
      && packet.request.credentialValueIncluded === false
      && packet.request.rawEndpointUrlIncluded === false
      && packet.request.payloadMayContainSecrets === false,
    responseShapeMatchesShell:
      packet.response.responseShapeFieldCount === sourceNodeV253.responseShapeFieldCount
      && !packet.response.connectionAttempted
      && !packet.response.externalRequestSent
      && !packet.response.credentialValueRead
      && !packet.response.productionRecordWritten,
    timeoutBudgetVerified:
      packet.timeoutBudget.timeoutBudgetMs === 15000
      && packet.timeoutBudget.finiteBudget
      && !packet.timeoutBudget.budgetSpent
      && !packet.timeoutBudget.timerStarted
      && packet.timeoutBudget.timeoutClassifiable,
    failureMappingVerified:
      packet.failureMappingVerification.failureMappingCovered
      && packet.failureMappingVerification.mappedFailureCount === sourceNodeV253.failureMappingCount
      && packet.failureMappingVerification.allFailuresNonRetryable
      && packet.failureMappingVerification.credentialValueRequestStillBlocked,
    cleanupVerified:
      packet.cleanup.inMemoryOnly
      && !packet.cleanup.temporaryDirectoryCreated
      && !packet.cleanup.temporaryFileCreated
      && !packet.cleanup.cleanupRequired
      && packet.cleanup.cleanupArtifactCount === 0
      && packet.cleanup.cleanupVerified
      && !packet.cleanup.nodeServiceStartedByPacket,
    credentialBoundaryClosed:
      !packet.request.credentialValueIncluded
      && !packet.response.credentialValueRead
      && sourceNodeV254.credentialBoundaryAligned
      && !sourceNodeV254.readsManagedAuditCredential,
    connectionBoundaryClosed:
      !packet.response.connectionAttempted
      && !packet.response.externalRequestSent
      && sourceNodeV254.connectionBoundaryAligned
      && !sourceNodeV254.connectsManagedAudit,
    writeBoundaryClosed:
      !packet.response.schemaMigrationExecuted
      && !packet.response.productionRecordWritten
      && sourceNodeV254.writeBoundaryAligned,
    autoStartBoundaryClosed:
      !packet.boundaries.javaStarted
      && !packet.boundaries.miniKvStarted
      && !packet.boundaries.externalAuditServiceStarted
      && sourceNodeV254.autoStartBoundaryAligned,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket: false,
  };
}

function collectProductionBlockers(
  checks: FakeTransportAdapterDryRunVerificationPacketChecks,
): FakeTransportAdapterDryRunVerificationPacketMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: FakeTransportAdapterDryRunVerificationPacketMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV253Ready,
      code: "NODE_V253_SHELL_CONTRACT_NOT_READY",
      source: "node-v253-test-only-adapter-shell-contract",
      message: "Node v253 test-only adapter shell contract must be ready before v255.",
    },
    {
      condition: checks.sourceNodeV254Ready,
      code: "NODE_V254_UPSTREAM_ECHO_NOT_READY",
      source: "node-v254-disabled-adapter-client-upstream-echo-verification",
      message: "Node v254 upstream echo verification must be ready before v255.",
    },
    {
      condition: checks.sourceBoundariesStillClosed && checks.fakeTransportOnly,
      code: "FAKE_TRANSPORT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
      message: "v255 must remain fake transport only and keep all v253/v254 boundaries closed.",
    },
    {
      condition:
        checks.requestShapeMatchesShell
        && checks.responseShapeMatchesShell
        && checks.timeoutBudgetVerified
        && checks.failureMappingVerified,
      code: "FAKE_TRANSPORT_DRY_RUN_SHAPE_INVALID",
      source: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
      message: "Request, response, timeout budget, and failure mapping must match the v253 shell contract.",
    },
    {
      condition:
        checks.cleanupVerified
        && checks.credentialBoundaryClosed
        && checks.connectionBoundaryClosed
        && checks.writeBoundaryClosed
        && checks.autoStartBoundaryClosed,
      code: "FAKE_TRANSPORT_SIDE_EFFECT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
      message: "v255 must prove no temp artifacts, credential reads, connections, writes, or auto-start effects.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v255 fake transport dry-run verification.",
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

function collectWarnings(): FakeTransportAdapterDryRunVerificationPacketMessage[] {
  return [
    {
      code: "FAKE_PACKET_NOT_REAL_CLIENT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
      message: "v255 verifies a fake transport packet only; it is not a real managed audit client.",
    },
    {
      code: "NO_TEMP_ARTIFACTS_BY_DESIGN",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
      message: "The packet is in-memory only, so cleanup verifies that no temporary directory or file was created.",
    },
  ];
}

function collectRecommendations(): FakeTransportAdapterDryRunVerificationPacketMessage[] {
  return [
    {
      code: "CLOSE_V252_DERIVED_PLAN_AFTER_ARCHIVE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
      message: "After v255 is archived, close the v252-derived plan and start a new plan for any next stage.",
    },
    {
      code: "REQUIRE_NEW_PLAN_FOR_REAL_ENDPOINT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
      message: "Real endpoints, credential resolvers, or schema migration rehearsals must be planned separately.",
    },
  ];
}
