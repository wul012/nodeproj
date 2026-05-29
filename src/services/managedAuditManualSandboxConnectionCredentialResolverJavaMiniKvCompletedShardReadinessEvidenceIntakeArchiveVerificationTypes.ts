export interface CompletedShardEvidenceIntakeArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV378CompletedShardEvidenceIntakeReference {
  sourceVersion: "Node v378";
  profileVersion: string;
  intakeState: string;
  intakeDecision: string;
  readyForCompletedShardReadinessEvidenceIntake: boolean;
  readyForNodeV379ArchiveVerification: boolean;
  activeNodeVersion: "Node v378";
  sourceNodeVersion: string;
  javaVerificationVersion: string;
  javaIndexVersion: string;
  miniKvReleaseVersion: string;
  intakeDigest: string;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  javaVerificationUsesHistoricalFallback: boolean;
  javaIndexUsesHistoricalFallback: boolean;
  miniKvUsesHistoricalFallback: boolean;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
}

export interface CompletedShardEvidenceIntakeReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  readyForCompletedShardReadinessEvidenceIntake: boolean;
  javaVerificationUsedHistoricalFallback: boolean;
  javaIndexUsedHistoricalFallback: boolean;
  miniKvUsedHistoricalFallback: boolean;
  miniKvReleaseVersion: string;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
}

export interface CompletedShardEvidenceIntakeArchiveReferences {
  archiveRoot: "e/378";
  jsonEvidence: CompletedShardEvidenceIntakeArchiveFileReference;
  markdownEvidence: CompletedShardEvidenceIntakeArchiveFileReference;
  summaryEvidence: CompletedShardEvidenceIntakeArchiveFileReference;
  browserSnapshot: CompletedShardEvidenceIntakeArchiveFileReference;
  htmlArchive: CompletedShardEvidenceIntakeArchiveFileReference;
  screenshot: CompletedShardEvidenceIntakeArchiveFileReference;
  explanation: CompletedShardEvidenceIntakeArchiveFileReference;
  codeWalkthrough: CompletedShardEvidenceIntakeArchiveFileReference;
  sourcePlan: CompletedShardEvidenceIntakeArchiveFileReference;
  plansIndex: CompletedShardEvidenceIntakeArchiveFileReference;
  archiveIndex: CompletedShardEvidenceIntakeArchiveFileReference;
}

export interface CompletedShardEvidenceIntakeArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification";
  sourceSpan: "Node v378 completed shard-readiness evidence intake";
  archiveRoot: "e/378";
  archiveVerificationDecision: "archive-completed-shard-evidence-intake-and-prepare-v380" | "blocked";
  sourceIntakeDigest: string;
  replayReady: boolean;
  archiveFileDigests: Array<{ path: string; digest: string | null; byteLength: number }>;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesReplayFromFrozenEvidence: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v380";
}

export interface CompletedShardEvidenceIntakeArchiveVerificationChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonIntakeReady: boolean;
  jsonSourceNodeV377Ready: boolean;
  jsonEvidenceVersionsMatch: boolean;
  jsonIntakeDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  jsonUsesFrozenHistoricalSnapshots: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsIntake: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsFrozenMiniKvV146: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV379AndParallelUpstreams: boolean;
  planIndexReferencesV378AndV379: boolean;
  archiveIndexReferencesV378: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayUsesFrozenMiniKvV146: boolean;
  archiveVerificationDoesNotRerunLiveRead: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  archiveVerificationDigestStable: boolean;
  readyForCompletedShardEvidenceIntakeArchiveVerification: boolean;
}

export interface CompletedShardEvidenceIntakeArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface CompletedShardEvidenceIntakeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification.v1";
  archiveVerificationState: "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verified" | "blocked";
  archiveVerificationDecision: "archive-completed-shard-evidence-intake-and-prepare-v380" | "blocked";
  readyForCompletedShardEvidenceIntakeArchiveVerification: boolean;
  readyForNodeV380NextCompletedEvidenceOrLiveGate: boolean;
  activeNodeVersion: "Node v379";
  sourceNodeVersion: "Node v378";
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
  archiveReferences: CompletedShardEvidenceIntakeArchiveReferences;
  sourceNodeV378: SourceNodeV378CompletedShardEvidenceIntakeReference;
  replay: CompletedShardEvidenceIntakeReplayReference;
  archiveVerification: CompletedShardEvidenceIntakeArchiveVerificationRecord;
  checks: CompletedShardEvidenceIntakeArchiveVerificationChecks;
  summary: CompletedShardEvidenceIntakeArchiveVerificationSummary;
  productionBlockers: CompletedShardEvidenceIntakeArchiveVerificationMessage[];
  warnings: CompletedShardEvidenceIntakeArchiveVerificationMessage[];
  recommendations: CompletedShardEvidenceIntakeArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV378Json: string;
    sourceNodeV378Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v380";
  };
  nextActions: string[];
}
