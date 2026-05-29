export interface ActiveShardPlanEvidenceIntakeArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV380ActiveShardPlanEvidenceIntakeReference {
  sourceVersion: "Node v380";
  profileVersion: string;
  intakeState: string;
  intakeDecision: string;
  readyForActiveShardPlanEvidenceIntake: boolean;
  readyForNodeV381ArchiveVerification: boolean;
  activeNodeVersion: "Node v380";
  sourceNodeVersion: string;
  javaHandoffVersion: string;
  miniKvReleaseVersion: string;
  activeShardPrototypeEnabled: boolean;
  intakeDigest: string;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  javaHandoffUsesHistoricalFallback: boolean;
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

export interface ActiveShardPlanEvidenceIntakeReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  readyForActiveShardPlanEvidenceIntake: boolean;
  javaHandoffUsedHistoricalFallback: boolean;
  miniKvUsedHistoricalFallback: boolean;
  javaHandoffVersion: string;
  miniKvReleaseVersion: string;
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

export interface ActiveShardPlanEvidenceIntakeArchiveReferences {
  archiveRoot: "e/380";
  jsonEvidence: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  markdownEvidence: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  summaryEvidence: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  browserSnapshot: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  htmlArchive: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  screenshot: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  explanation: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  codeWalkthrough: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  sourcePlan: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  plansIndex: ActiveShardPlanEvidenceIntakeArchiveFileReference;
  archiveIndex: ActiveShardPlanEvidenceIntakeArchiveFileReference;
}

export interface ActiveShardPlanEvidenceIntakeArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-active-shard-plan-evidence-intake-archive-verification";
  sourceSpan: "Node v380 active shard plan evidence intake";
  archiveRoot: "e/380";
  archiveVerificationDecision: "archive-active-shard-plan-evidence-intake-and-prepare-v381" | "blocked";
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
  nextNodeVersionSuggested: "Node v381";
}

export interface ActiveShardPlanEvidenceIntakeArchiveVerificationChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonIntakeReady: boolean;
  jsonSourceNodeV379Ready: boolean;
  jsonEvidenceVersionsMatch: boolean;
  jsonActiveShardPrototypeDisabled: boolean;
  jsonIntakeDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  jsonUsesFrozenHistoricalSnapshots: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsIntake: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsFrozenMiniKvV147: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV381AndLiveGatePause: boolean;
  planIndexReferencesV380AndV381: boolean;
  archiveIndexReferencesV380: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayUsesFrozenJavaV157AndMiniKvV147: boolean;
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
  readyForActiveShardPlanEvidenceIntakeArchiveVerification: boolean;
}

export interface ActiveShardPlanEvidenceIntakeArchiveVerificationSummary {
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

export interface ActiveShardPlanEvidenceIntakeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification.v1";
  archiveVerificationState: "java-mini-kv-active-shard-plan-evidence-intake-archive-verified" | "blocked";
  archiveVerificationDecision: "archive-active-shard-plan-evidence-intake-and-prepare-v381" | "blocked";
  readyForActiveShardPlanEvidenceIntakeArchiveVerification: boolean;
  readyForNodeV381NextArchiveVerification: boolean;
  activeNodeVersion: "Node v381";
  sourceNodeVersion: "Node v380";
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
  archiveReferences: ActiveShardPlanEvidenceIntakeArchiveReferences;
  sourceNodeV380: SourceNodeV380ActiveShardPlanEvidenceIntakeReference;
  replay: ActiveShardPlanEvidenceIntakeReplayReference;
  archiveVerification: ActiveShardPlanEvidenceIntakeArchiveVerificationRecord;
  checks: ActiveShardPlanEvidenceIntakeArchiveVerificationChecks;
  summary: ActiveShardPlanEvidenceIntakeArchiveVerificationSummary;
  productionBlockers: ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[];
  warnings: ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[];
  recommendations: ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV380Json: string;
    sourceNodeV380Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v382";
  };
  nextActions: string[];
}
