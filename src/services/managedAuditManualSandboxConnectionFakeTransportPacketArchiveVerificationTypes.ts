import type {
  ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketTypes.js";

export interface ManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1";
  archiveVerificationState: "fake-transport-packet-archive-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyArchiveVerification: true;
  archiveVerificationRerunsFakeTransportBehavior: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV255: SourceNodeV255FakeTransportPacketSummary;
  archivedEvidence: FakeTransportPacketArchiveEvidence;
  archiveVerification: FakeTransportPacketArchiveVerification;
  checks: FakeTransportPacketArchiveVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    archiveFileCount: number;
    requiredSnippetCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: FakeTransportPacketArchiveVerificationMessage[];
  warnings: FakeTransportPacketArchiveVerificationMessage[];
  recommendations: FakeTransportPacketArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV255Json: string;
    sourceNodeV255Markdown: string;
    sourceHtmlArchive: string;
    sourceScreenshot: string;
    sourceExplanation: string;
    sourceCodeWalkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV255FakeTransportPacketSummary {
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
  temporaryDirectoryCreated: false;
  temporaryFileCreated: false;
  fakeTransportOnly: true;
  connectionAttempted: false;
  externalRequestSent: false;
  credentialValueRead: false;
  schemaMigrationExecuted: false;
  productionRecordWritten: false;
  javaStarted: false;
  miniKvStarted: false;
}

export interface FakeTransportPacketArchiveEvidence {
  archiveRoot: "c/255/";
  sourceVersion: "Node v255";
  files: FakeTransportPacketArchiveFileEvidence[];
  requiredSnippetCount: number;
  matchedSnippetCount: number;
  snippetMatches: FakeTransportPacketArchiveSnippetEvidence[];
}

export interface FakeTransportPacketArchiveFileEvidence {
  id: string;
  workspacePath: string;
  historicalPath: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface FakeTransportPacketArchiveSnippetEvidence {
  id: string;
  workspacePath: string;
  expectedText: string;
  matched: boolean;
}

export interface FakeTransportPacketArchiveVerification {
  archiveVerificationDigest: string;
  evidenceSpan: "Node v255 fake transport adapter dry-run packet archive";
  sourcePacketDigest: string;
  sourceRequestDigest: string;
  sourceResponseDigest: string;
  sourceRoutePath: string;
  archiveVerificationReadsFilesOnly: true;
  archiveVerificationRerunsFakeTransportBehavior: false;
  upstreamActionsEnabled: boolean;
  productionAuditAllowed: false;
}

export type FakeTransportPacketArchiveVerificationChecks = {
  sourceNodeV255Ready: boolean;
  sourcePacketDigestValid: boolean;
  sourceRequestDigestValid: boolean;
  sourceResponseDigestValid: boolean;
  sourceCleanupEvidenceVerified: boolean;
  archiveFilesPresent: boolean;
  archiveFilesNonEmpty: boolean;
  htmlArchivePresent: boolean;
  screenshotPresent: boolean;
  screenshotNonEmpty: boolean;
  explanationPresent: boolean;
  codeWalkthroughPresent: boolean;
  archiveSnippetsMatched: boolean;
  htmlRecordsFakeTransportBlocked: boolean;
  explanationRecordsSmokeAndCleanup: boolean;
  walkthroughRecordsImplementationAndVerification: boolean;
  planPointsToV256: boolean;
  routeResponseVerified: boolean;
  noArchiveVerificationFakeTransportRerun: boolean;
  noTempDryRunDirectoryCreated: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification: boolean;
};

export interface FakeTransportPacketArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification"
    | "node-v255-fake-transport-packet"
    | "node-v255-archive"
    | "v255-plan"
    | "runtime-config";
  message: string;
}
