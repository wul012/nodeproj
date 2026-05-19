import type {
  ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
} from "./managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.js";

export interface ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1";
  packetState: "fake-transport-adapter-dry-run-verification-packet-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  fakeTransportOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV253: SourceNodeV253ShellContractSummary;
  sourceNodeV254: SourceNodeV254UpstreamEchoSummary;
  fakeTransportDryRunPacket: FakeTransportAdapterDryRunPacket;
  checks: FakeTransportAdapterDryRunVerificationPacketChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requestShapeFieldCount: number;
    responseShapeFieldCount: number;
    failureMappingCount: number;
    timeoutBudgetMs: number;
    cleanupArtifactCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: FakeTransportAdapterDryRunVerificationPacketMessage[];
  warnings: FakeTransportAdapterDryRunVerificationPacketMessage[];
  recommendations: FakeTransportAdapterDryRunVerificationPacketMessage[];
  evidenceEndpoints: {
    fakeTransportAdapterDryRunVerificationPacketJson: string;
    fakeTransportAdapterDryRunVerificationPacketMarkdown: string;
    sourceNodeV253Json: string;
    sourceNodeV254Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV253ShellContractSummary {
  sourceVersion: "Node v253";
  profileVersion: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["profileVersion"];
  shellContractState: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile["shellContractState"];
  contractDigest: string;
  readyForTestOnlyAdapterShellContract: boolean;
  transportKind: "fake-in-memory";
  fakeTransportOnly: true;
  realClientImplemented: false;
  realTransportAllowed: false;
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  guardConditionCount: number;
  externalRequestSent: false;
  credentialValueRead: false;
  productionRecordWritten: false;
}

export interface SourceNodeV254UpstreamEchoSummary {
  sourceVersion: "Node v254";
  profileVersion: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["verificationState"];
  verificationDigest: string;
  readyForUpstreamEchoVerification: boolean;
  javaV102EchoReady: boolean;
  miniKvV111NonParticipationReady: boolean;
  envHandleCountAligned: boolean;
  failureClassCountAligned: boolean;
  dryRunResponseShapeAligned: boolean;
  fakeTransportShapeAligned: boolean;
  credentialBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  readyForSandboxAdapterConnection: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
}

export interface FakeTransportAdapterDryRunPacket {
  packetDigest: string;
  packetMode: "fake-transport-adapter-dry-run-verification-only";
  sourceSpan: "Node v253 + Node v254";
  request: FakeTransportDryRunRequest;
  response: FakeTransportDryRunResponse;
  timeoutBudget: FakeTransportTimeoutBudget;
  failureMappingVerification: FakeTransportFailureMappingVerification;
  cleanup: FakeTransportCleanupVerification;
  boundaries: FakeTransportDryRunBoundaries;
}

export interface FakeTransportDryRunRequest {
  requestId: "managed-audit-v255-fake-transport-dry-run";
  operation: "managed-audit-sandbox-connection-dry-run";
  transportKind: "fake-in-memory";
  credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE";
  ownerApprovalArtifactId: "owner-approval-artifact-review-only";
  timeoutBudgetMs: 15000;
  dryRun: true;
  fakeTransportOnly: true;
  credentialValueIncluded: false;
  rawEndpointUrlIncluded: false;
  payloadMayContainSecrets: false;
  requestShapeFieldCount: number;
  requestDigest: string;
}

export interface FakeTransportDryRunResponse {
  requestId: FakeTransportDryRunRequest["requestId"];
  status: "fake-transport-dry-run-accepted";
  code: "TEST_ONLY_FAKE_TRANSPORT_DRY_RUN";
  fakeTransportOnly: true;
  timeoutBudgetMs: 15000;
  connectionAttempted: false;
  externalRequestSent: false;
  credentialValueRead: false;
  schemaMigrationExecuted: false;
  productionRecordWritten: false;
  responseShapeFieldCount: number;
  responseDigest: string;
}

export interface FakeTransportTimeoutBudget {
  timeoutBudgetMs: 15000;
  finiteBudget: true;
  budgetSource: "operator-review-field";
  budgetSpent: false;
  timerStarted: false;
  timeoutClassifiable: true;
}

export interface FakeTransportFailureMappingVerification {
  sourceFailureMappingCount: number;
  mappedFailureCount: number;
  allFailuresNonRetryable: boolean;
  credentialValueRequestStillBlocked: boolean;
  manualWindowClosedStillBlocked: boolean;
  failureMappingCovered: boolean;
}

export interface FakeTransportCleanupVerification {
  inMemoryOnly: true;
  temporaryDirectoryCreated: false;
  temporaryFileCreated: false;
  cleanupRequired: false;
  cleanupArtifactCount: 0;
  cleanupVerified: true;
  nodeServiceStartedByPacket: false;
}

export interface FakeTransportDryRunBoundaries {
  connectionAttempted: false;
  externalRequestSent: false;
  credentialValueRead: false;
  schemaMigrationExecuted: false;
  productionRecordWritten: false;
  javaStarted: false;
  miniKvStarted: false;
  externalAuditServiceStarted: false;
}

export interface FakeTransportAdapterDryRunVerificationPacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet"
    | "node-v253-test-only-adapter-shell-contract"
    | "node-v254-disabled-adapter-client-upstream-echo-verification"
    | "runtime-config";
  message: string;
}

export type FakeTransportAdapterDryRunVerificationPacketChecks = {
  sourceNodeV253Ready: boolean;
  sourceNodeV254Ready: boolean;
  sourceBoundariesStillClosed: boolean;
  fakeTransportOnly: boolean;
  requestShapeMatchesShell: boolean;
  responseShapeMatchesShell: boolean;
  timeoutBudgetVerified: boolean;
  failureMappingVerified: boolean;
  cleanupVerified: boolean;
  credentialBoundaryClosed: boolean;
  connectionBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  autoStartBoundaryClosed: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket: boolean;
};
