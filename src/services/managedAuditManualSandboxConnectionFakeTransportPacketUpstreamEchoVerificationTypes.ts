import type {
  ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketTypes.js";
import type {
  ManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1";
  verificationState: "fake-transport-packet-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV255: SourceNodeV255FakeTransportPacketReference;
  sourceNodeV256: SourceNodeV256ArchiveVerificationReference;
  upstreamEchoes: {
    javaV103: JavaV103FakeTransportPacketEchoMarkerReference;
    miniKvV112: MiniKvV112FakeTransportPacketNonParticipationReference;
  };
  echoVerification: {
    verificationDigest: string;
    verificationMode: "java-v103-plus-mini-kv-v112-fake-transport-packet-upstream-echo-verification-only";
    sourceSpan: "Node v255 + Node v256 + Java v103 + mini-kv v112";
    requestShapeAligned: boolean;
    responseShapeAligned: boolean;
    timeoutBoundaryAligned: boolean;
    failureMappingAligned: boolean;
    cleanupBoundaryAligned: boolean;
    archiveNoRerunAligned: boolean;
    credentialBoundaryAligned: boolean;
    connectionBoundaryAligned: boolean;
    writeBoundaryAligned: boolean;
    autoStartBoundaryAligned: boolean;
    nodeV257BlocksRealConnection: true;
  };
  checks: FakeTransportPacketUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: FakeTransportPacketUpstreamEchoVerificationMessage[];
  warnings: FakeTransportPacketUpstreamEchoVerificationMessage[];
  recommendations: FakeTransportPacketUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    fakeTransportPacketUpstreamEchoVerificationJson: string;
    fakeTransportPacketUpstreamEchoVerificationMarkdown: string;
    sourceNodeV255Json: string;
    sourceNodeV256Json: string;
    javaV103Runbook: string;
    miniKvV112Receipt: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV255FakeTransportPacketReference {
  sourceVersion: "Node v255";
  profileVersion: ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile["profileVersion"];
  packetState: ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile["packetState"];
  readyForFakeTransportPacket: boolean;
  packetDigest: string;
  requestDigest: string;
  responseDigest: string;
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  timeoutBudgetMs: 15000;
  cleanupArtifactCount: 0;
  cleanupVerified: true;
  fakeTransportOnly: true;
  dryRunOnly: true;
  credentialValueIncluded: false;
  rawEndpointUrlIncluded: false;
  payloadMayContainSecrets: false;
  connectionAttempted: false;
  externalRequestSent: false;
  credentialValueRead: false;
  schemaMigrationExecuted: false;
  productionRecordWritten: false;
  javaStarted: false;
  miniKvStarted: false;
}

export interface SourceNodeV256ArchiveVerificationReference {
  sourceVersion: "Node v256";
  profileVersion: ManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationProfile["archiveVerificationState"];
  readyForArchiveVerification: boolean;
  archiveVerificationDigest: string;
  archiveFileCount: number;
  requiredSnippetCount: number;
  matchedSnippetCount: number;
  archiveVerificationRerunsFakeTransportBehavior: false;
  readOnlyArchiveVerification: true;
  noTempDryRunDirectoryCreated: boolean;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
}

export interface JavaV103FakeTransportPacketEchoMarkerReference {
  sourceVersion: "Java v103";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v25" | "missing";
  markerField: "managedAuditSandboxConnectionFakeTransportDryRunPacketEchoMarker" | "missing";
  markerVersion: string;
  consumedByNodeV255Profile: string;
  consumedByNodeV256Profile: string;
  nextNodeConsumerVersion: "Node v257" | "missing";
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  guardConditionCount: number;
  timeoutBudgetMs: number;
  cleanupArtifactCount: number;
  credentialValueIncluded: boolean;
  rawEndpointUrlIncluded: boolean;
  payloadMayContainSecrets: boolean;
  connectionAttempted: boolean;
  externalRequestSent: boolean;
  credentialValueRead: boolean;
  schemaMigrationExecuted: boolean;
  productionRecordWritten: boolean;
  javaStarted: boolean;
  miniKvStarted: boolean;
  externalAuditServiceStarted: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForNodeV257FakeTransportPacketUpstreamEchoVerification: boolean;
  readyForNodeV257Alignment: boolean;
}

export interface MiniKvV112FakeTransportPacketNonParticipationReference {
  sourceVersion: "mini-kv v112";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourcePacketProfileVersion: string;
  sourcePacketState: string;
  sourceArchiveState: string;
  sourceArchiveRerunsFakeTransportBehavior: boolean;
  sourceReadyForFakeTransportPacket: boolean;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean;
  sourceFakeTransportOnly: boolean;
  sourceDryRunOnly: boolean;
  sourceRequestShapeFieldCount: number;
  sourceResponseShapeFieldCount: number;
  sourceFailureMappingCount: number;
  sourceTimeoutBudgetMs: number;
  sourceCleanupArtifactCount: number;
  sourceCleanupVerified: boolean;
  sourceTemporaryDirectoryCreated: boolean;
  sourceTemporaryFileCreated: boolean;
  requestCredentialValueIncluded: boolean;
  requestRawEndpointUrlIncluded: boolean;
  requestPayloadMayContainSecrets: boolean;
  responseConnectionAttempted: boolean;
  responseExternalRequestSent: boolean;
  responseCredentialValueRead: boolean;
  responseSchemaMigrationExecuted: boolean;
  responseProductionRecordWritten: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  dryRunOnly: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  externalAuditServiceAutoStartAllowed: boolean;
  storageWriteAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  credentialValueReadAllowed: boolean;
  credentialValueLoaded: boolean;
  externalRequestSent: boolean;
  temporaryDirectoryCreated: boolean;
  temporaryFileCreated: boolean;
  cleanupArtifactCount: number;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStorageBackend: boolean;
  orderAuthoritative: boolean;
  readyForNodeV257Alignment: boolean;
}

export interface VerificationEvidenceFile {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface VerificationSnippetMatch {
  id: string;
  path: string;
  resolvedPath: string;
  expectedText: string;
  matched: boolean;
}

export type FakeTransportPacketUpstreamEchoVerificationChecks = {
  sourceNodeV255Ready: boolean;
  sourceNodeV256Ready: boolean;
  sourceNodeBoundariesStillClosed: boolean;
  javaV103EchoReady: boolean;
  miniKvV112NonParticipationReady: boolean;
  requestShapeAligned: boolean;
  responseShapeAligned: boolean;
  timeoutBoundaryAligned: boolean;
  failureMappingAligned: boolean;
  cleanupBoundaryAligned: boolean;
  archiveNoRerunAligned: boolean;
  credentialBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification: boolean;
};

export interface FakeTransportPacketUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification"
    | "node-v255-fake-transport-packet"
    | "node-v256-fake-transport-packet-archive-verification"
    | "java-v103-fake-transport-dry-run-packet-echo-marker"
    | "mini-kv-v112-fake-transport-packet-non-participation-receipt"
    | "runtime-config";
  message: string;
}
