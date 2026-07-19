import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile,
  MinimalShardReadinessLiveReadObservation,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.js";

export interface MinimalShardReadinessLiveReadArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface MinimalShardReadinessLiveReadArchiveReferences {
  archiveRoot: "e/371";
  jsonEvidence: MinimalShardReadinessLiveReadArchiveFileReference;
  markdownEvidence: MinimalShardReadinessLiveReadArchiveFileReference;
  summaryEvidence: MinimalShardReadinessLiveReadArchiveFileReference;
  browserSnapshot: MinimalShardReadinessLiveReadArchiveFileReference;
  htmlArchive: MinimalShardReadinessLiveReadArchiveFileReference;
  screenshot: MinimalShardReadinessLiveReadArchiveFileReference;
  explanation: MinimalShardReadinessLiveReadArchiveFileReference;
  codeWalkthrough: MinimalShardReadinessLiveReadArchiveFileReference;
  sourcePlan: MinimalShardReadinessLiveReadArchiveFileReference;
  plansIndex: MinimalShardReadinessLiveReadArchiveFileReference;
  archiveIndex: MinimalShardReadinessLiveReadArchiveFileReference;
}

export interface SourceNodeV371MinimalShardReadinessLiveReadArchiveReference {
  sourceVersion: "Node v371";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile["profileVersion"];
  gateState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile["gateState"];
  gateDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile["gateDecision"];
  readyForMinimalShardReadinessLiveReadGate: boolean;
  readyForNodeV372LiveReadArchiveVerification: boolean;
  activeNodeVersion: "Node v371";
  sourceNodeVersion: "Node v370";
  sourceNodeV370Ready: boolean;
  sourceNodeV370GateDigest: string;
  gateDigest: string;
  liveReadOnly: true;
  javaStatus: MinimalShardReadinessLiveReadObservation["status"];
  miniKvStatus: MinimalShardReadinessLiveReadObservation["status"];
  attemptedReadCount: number;
  passedReadCount: number;
  failedReadCount: number;
  skippedReadCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  executionAllowed: false;
}

export interface MinimalShardReadinessLiveReadArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "minimal-shard-readiness-live-read-archive-verification";
  sourceSpan: "Node v371 minimal shard readiness live-read gate";
  archiveRoot: "e/371";
  archiveVerificationDecision:
    | "archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report"
    | "blocked";
  sourceGateDigest: string;
  sourceNodeV370GateDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesNoLiveReadRerun: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v373";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type MinimalShardReadinessLiveReadArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonGateReady: boolean;
  jsonSourceNodeV370Ready: boolean;
  jsonGateDigestStable: boolean;
  jsonBothLiveReadsPassed: boolean;
  jsonLiveReadCountsMatch: boolean;
  jsonChecksAllPassed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsGateAndReads: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsLiveReadAndBoundary: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV372: boolean;
  planIndexReferencesV371AndV372: boolean;
  archiveIndexReferencesV371: boolean;
  routeRecordedInArchive: boolean;
  archiveVerificationDoesNotRerunLiveRead: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  archiveVerificationDigestStable: boolean;
  readyForMinimalShardReadinessLiveReadArchiveVerification: boolean;
};

export interface MinimalShardReadinessLiveReadArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  attemptedReadCount: number;
  passedReadCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalShardReadinessLiveReadArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v371"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification.v1";
  archiveVerificationState: "minimal-shard-readiness-live-read-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-minimal-shard-readiness-live-read-and-prepare-compatibility-report"
    | "blocked";
  readyForMinimalShardReadinessLiveReadArchiveVerification: boolean;
  readyForNodeV373ShardReadinessCompatibilityReport: boolean;
  consumesNodeV371MinimalShardReadinessLiveReadGate: true;
  activeNodeVersion: "Node v372";
  sourceNodeVersion: "Node v371";
  archiveVerificationOnly: true;
  rerunsLiveRead: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveReferences: MinimalShardReadinessLiveReadArchiveReferences;
  sourceNodeV371: SourceNodeV371MinimalShardReadinessLiveReadArchiveReference;
  liveReads: {
    java: MinimalShardReadinessLiveReadObservation | null;
    miniKv: MinimalShardReadinessLiveReadObservation | null;
  };
  archiveVerification: MinimalShardReadinessLiveReadArchiveVerificationRecord;
  checks: MinimalShardReadinessLiveReadArchiveVerificationChecks;
  summary: MinimalShardReadinessLiveReadArchiveVerificationSummary;
  productionBlockers: MinimalShardReadinessLiveReadArchiveVerificationMessage[];
  warnings: MinimalShardReadinessLiveReadArchiveVerificationMessage[];
  recommendations: MinimalShardReadinessLiveReadArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV371Json: string;
    sourceNodeV371Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
