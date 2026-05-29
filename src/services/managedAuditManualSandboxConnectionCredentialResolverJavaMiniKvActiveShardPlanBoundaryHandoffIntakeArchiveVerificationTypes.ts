export interface ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV382BoundaryHandoffIntakeReference {
  sourceVersion: "Node v382";
  profileVersion: string;
  intakeState: string;
  intakeDecision: string;
  readyForActiveShardPlanBoundaryHandoffIntake: boolean;
  readyForNodeV383ArchiveVerification: boolean;
  activeNodeVersion: "Node v382";
  sourceNodeVersion: string;
  javaHandoffVersion: string;
  miniKvHandoffReleaseVersion: string;
  miniKvFrozenPlanReleaseVersion: string;
  activeShardPrototypeEnabled: boolean;
  liveReadGateRequiredBeforeRuntimeProbe: boolean;
  intakeDigest: string;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  javaHandoffUsesHistoricalFallback: boolean;
  miniKvHandoffUsesHistoricalFallback: boolean;
  miniKvFrozenPlanUsesHistoricalFallback: boolean;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
}

export interface ActiveShardPlanBoundaryHandoffIntakeReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  readyForActiveShardPlanBoundaryHandoffIntake: boolean;
  javaHandoffUsedHistoricalFallback: boolean;
  miniKvHandoffUsedHistoricalFallback: boolean;
  miniKvFrozenPlanUsedHistoricalFallback: boolean;
  javaHandoffVersion: string;
  miniKvHandoffReleaseVersion: string;
  miniKvFrozenPlanReleaseVersion: string;
  activeShardPrototypeEnabled: boolean;
  liveReadGateRequiredBeforeRuntimeProbe: boolean;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
}

export interface ActiveShardPlanBoundaryHandoffIntakeArchiveReferences {
  archiveRoot: "e/382";
  jsonEvidence: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  markdownEvidence: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  summaryEvidence: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  browserSnapshot: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  htmlArchive: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  screenshot: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  explanation: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  codeWalkthrough: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  sourcePlan: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  plansIndex: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
  archiveIndex: ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference;
}

export interface ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification";
  sourceSpan: "Node v382 active shard plan boundary handoff intake";
  archiveRoot: "e/382";
  archiveVerificationDecision: "archive-active-shard-plan-boundary-handoff-intake-and-prepare-v384" | "blocked";
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
  nextNodeVersionSuggested: "Node v384";
}

export interface ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonIntakeReady: boolean;
  jsonSourceNodeV381Ready: boolean;
  jsonEvidenceVersionsMatch: boolean;
  jsonActiveShardPrototypeDisabled: boolean;
  jsonLiveReadGateRequiredBeforeRuntimeProbe: boolean;
  jsonIntakeDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  jsonUsesFrozenHistoricalSnapshots: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsBoundaryHandoff: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsMiniKvV149AndChecks: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV383AndLiveGatePause: boolean;
  planIndexReferencesV382AndV383: boolean;
  archiveIndexReferencesV382: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayUsesFrozenJavaV158MiniKvV149AndV148: boolean;
  replayKeepsActiveShardPrototypeDisabled: boolean;
  replayRequiresLiveReadGateBeforeRuntimeProbe: boolean;
  archiveVerificationDoesNotRerunLiveRead: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  archiveVerificationDigestStable: boolean;
  readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification: boolean;
}

export interface ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationSummary {
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

export interface ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification.v1";
  archiveVerificationState: "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verified" | "blocked";
  archiveVerificationDecision: "archive-active-shard-plan-boundary-handoff-intake-and-prepare-v384" | "blocked";
  readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification: boolean;
  readyForNodeV384NextBoundaryEvidenceOrLiveGate: boolean;
  activeNodeVersion: "Node v383";
  sourceNodeVersion: "Node v382";
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
  archiveReferences: ActiveShardPlanBoundaryHandoffIntakeArchiveReferences;
  sourceNodeV382: SourceNodeV382BoundaryHandoffIntakeReference;
  replay: ActiveShardPlanBoundaryHandoffIntakeReplayReference;
  archiveVerification: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationRecord;
  checks: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationChecks;
  summary: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationSummary;
  productionBlockers: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[];
  warnings: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[];
  recommendations: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV382Json: string;
    sourceNodeV382Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v384";
  };
  nextActions: string[];
}
