export interface MinimalShardReadinessRegularGateArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface MinimalShardReadinessRegularGateArchiveReferences {
  archiveRoot: "e/374";
  jsonEvidence: MinimalShardReadinessRegularGateArchiveFileReference;
  markdownEvidence: MinimalShardReadinessRegularGateArchiveFileReference;
  summaryEvidence: MinimalShardReadinessRegularGateArchiveFileReference;
  browserSnapshot: MinimalShardReadinessRegularGateArchiveFileReference;
  htmlArchive: MinimalShardReadinessRegularGateArchiveFileReference;
  screenshot: MinimalShardReadinessRegularGateArchiveFileReference;
  explanation: MinimalShardReadinessRegularGateArchiveFileReference;
  codeWalkthrough: MinimalShardReadinessRegularGateArchiveFileReference;
  sourcePlan: MinimalShardReadinessRegularGateArchiveFileReference;
  plansIndex: MinimalShardReadinessRegularGateArchiveFileReference;
  archiveIndex: MinimalShardReadinessRegularGateArchiveFileReference;
}

export interface SourceNodeV374MinimalShardReadinessRegularGateArchiveReference {
  sourceVersion: "Node v374";
  profileVersion: string;
  gateState: "minimal-shard-readiness-regular-gate-ready" | "blocked";
  gateDecision: "freeze-minimal-shard-readiness-regular-gate" | "blocked";
  readyForMinimalShardReadinessRegularGate: boolean;
  readyForNodeV375RegularGateArchiveVerification: boolean;
  activeNodeVersion: "Node v374";
  sourceNodeVersion: "Node v373" | string;
  sourceNodeV373Ready: boolean;
  regularGateDigest: string;
  sourceCompatibilityReportDigest: string;
  sourceStaticGateDigest: string;
  sourceLiveReadGateDigest: string;
  sourceArchiveVerificationDigest: string;
  sourceProjectReportCount: number;
  sourceCompatibleProjectCount: number;
  sourceFieldCheckCount: number;
  sourceMatchedFieldCheckCount: number;
  sourceMismatchedFieldCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  rerunsLiveRead: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
}

export interface MinimalShardReadinessRegularGateArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "minimal-shard-readiness-regular-gate-archive-verification";
  sourceSpan: "Node v374 minimal shard readiness regular gate";
  archiveRoot: "e/374";
  archiveVerificationDecision: "archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145" | "blocked";
  sourceRegularGateDigest: string;
  sourceCompatibilityReportDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesNoLiveReadRerun: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v376";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type MinimalShardReadinessRegularGateArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonGateReady: boolean;
  jsonSourceNodeV373Ready: boolean;
  jsonRegularGateDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsRegularGate: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsRegularGateAndBoundary: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV375AndV376: boolean;
  planIndexReferencesV374AndV375: boolean;
  archiveIndexReferencesV374: boolean;
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
  readyForMinimalShardReadinessRegularGateArchiveVerification: boolean;
};

export interface MinimalShardReadinessRegularGateArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceFieldCheckCount: number;
  sourceMatchedFieldCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalShardReadinessRegularGateArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v374"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification.v1";
  archiveVerificationState: "minimal-shard-readiness-regular-gate-archive-verified" | "blocked";
  archiveVerificationDecision: "archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145" | "blocked";
  readyForMinimalShardReadinessRegularGateArchiveVerification: boolean;
  readyForNodeV376JavaMiniKvShardEvidenceConsumption: boolean;
  consumesNodeV374MinimalShardReadinessRegularGate: true;
  activeNodeVersion: "Node v375";
  sourceNodeVersion: "Node v374";
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
  archiveReferences: MinimalShardReadinessRegularGateArchiveReferences;
  sourceNodeV374: SourceNodeV374MinimalShardReadinessRegularGateArchiveReference;
  archiveVerification: MinimalShardReadinessRegularGateArchiveVerificationRecord;
  checks: MinimalShardReadinessRegularGateArchiveVerificationChecks;
  summary: MinimalShardReadinessRegularGateArchiveVerificationSummary;
  productionBlockers: MinimalShardReadinessRegularGateArchiveVerificationMessage[];
  warnings: MinimalShardReadinessRegularGateArchiveVerificationMessage[];
  recommendations: MinimalShardReadinessRegularGateArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV374Json: string;
    sourceNodeV374Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
