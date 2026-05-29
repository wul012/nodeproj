export interface LiveReadGatePlanIntakeArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV384LiveReadGatePlanIntakeReference {
  sourceVersion: "Node v384";
  profileVersion: string;
  intakeState: string;
  intakeDecision: string;
  readyForJavaMiniKvLiveReadGatePlanIntake: boolean;
  readyForNodeV385ArchiveVerification: boolean;
  activeNodeVersion: "Node v384";
  sourceNodeVersion: string;
  javaLiveReadGatePlanVersion: string;
  miniKvLiveReadGatePlanReleaseVersion: string;
  miniKvFrozenConsumerHandoffReleaseVersion: string;
  liveReadGateAllowed: boolean;
  runtimeProbeAllowed: boolean;
  activeShardPrototypeEnabled: boolean;
  intakeDigest: string;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  javaLiveReadGatePlanUsesHistoricalFallback: boolean;
  miniKvLiveReadGatePlanUsesHistoricalFallback: boolean;
  miniKvFrozenConsumerHandoffUsesHistoricalFallback: boolean;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
}

export interface LiveReadGatePlanIntakeReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  readyForJavaMiniKvLiveReadGatePlanIntake: boolean;
  javaLiveReadGatePlanUsedHistoricalFallback: boolean;
  miniKvLiveReadGatePlanUsedHistoricalFallback: boolean;
  miniKvFrozenConsumerHandoffUsedHistoricalFallback: boolean;
  javaLiveReadGatePlanVersion: string;
  miniKvLiveReadGatePlanReleaseVersion: string;
  miniKvFrozenConsumerHandoffReleaseVersion: string;
  liveReadGateAllowed: boolean;
  runtimeProbeAllowed: boolean;
  activeShardPrototypeEnabled: boolean;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
}

export interface LiveReadGatePlanIntakeArchiveReferences {
  archiveRoot: "e/384";
  jsonEvidence: LiveReadGatePlanIntakeArchiveFileReference;
  markdownEvidence: LiveReadGatePlanIntakeArchiveFileReference;
  summaryEvidence: LiveReadGatePlanIntakeArchiveFileReference;
  browserSnapshot: LiveReadGatePlanIntakeArchiveFileReference;
  htmlArchive: LiveReadGatePlanIntakeArchiveFileReference;
  screenshot: LiveReadGatePlanIntakeArchiveFileReference;
  explanation: LiveReadGatePlanIntakeArchiveFileReference;
  codeWalkthrough: LiveReadGatePlanIntakeArchiveFileReference;
  sourcePlan: LiveReadGatePlanIntakeArchiveFileReference;
  plansIndex: LiveReadGatePlanIntakeArchiveFileReference;
  archiveIndex: LiveReadGatePlanIntakeArchiveFileReference;
}

export interface LiveReadGatePlanIntakeArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-live-read-gate-plan-intake-archive-verification";
  sourceSpan: "Node v384 live-read gate plan intake";
  archiveRoot: "e/384";
  archiveVerificationDecision: "archive-live-read-gate-plan-intake-and-prepare-v386" | "blocked";
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
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v386";
}

export interface LiveReadGatePlanIntakeArchiveVerificationChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonIntakeReady: boolean;
  jsonSourceNodeV383Ready: boolean;
  jsonEvidenceVersionsMatch: boolean;
  jsonLiveReadGateClosed: boolean;
  jsonActiveShardPrototypeDisabled: boolean;
  jsonIntakeDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  jsonUsesFrozenHistoricalSnapshots: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsLiveReadGatePlan: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsMiniKvV150AndChecks: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV385ArchiveVerification: boolean;
  planIndexReferencesV384AndV385: boolean;
  archiveIndexReferencesV384: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayUsesFrozenJavaV159MiniKvV150AndV149: boolean;
  replayKeepsLiveReadGateClosed: boolean;
  replayKeepsActiveShardPrototypeDisabled: boolean;
  archiveVerificationDoesNotRerunLiveRead: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  archiveVerificationDigestStable: boolean;
  readyForLiveReadGatePlanIntakeArchiveVerification: boolean;
}

export interface LiveReadGatePlanIntakeArchiveVerificationSummary {
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

export interface LiveReadGatePlanIntakeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification.v1";
  archiveVerificationState: "java-mini-kv-live-read-gate-plan-intake-archive-verified" | "blocked";
  archiveVerificationDecision: "archive-live-read-gate-plan-intake-and-prepare-v386" | "blocked";
  readyForLiveReadGatePlanIntakeArchiveVerification: boolean;
  readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate: boolean;
  activeNodeVersion: "Node v385";
  sourceNodeVersion: "Node v384";
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
  activeShardPrototypeEnabled: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveReferences: LiveReadGatePlanIntakeArchiveReferences;
  sourceNodeV384: SourceNodeV384LiveReadGatePlanIntakeReference;
  replay: LiveReadGatePlanIntakeReplayReference;
  archiveVerification: LiveReadGatePlanIntakeArchiveVerificationRecord;
  checks: LiveReadGatePlanIntakeArchiveVerificationChecks;
  summary: LiveReadGatePlanIntakeArchiveVerificationSummary;
  productionBlockers: LiveReadGatePlanIntakeArchiveVerificationMessage[];
  warnings: LiveReadGatePlanIntakeArchiveVerificationMessage[];
  recommendations: LiveReadGatePlanIntakeArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV384Json: string;
    sourceNodeV384Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v386";
  };
  nextActions: string[];
}
