export interface ServiceArchiveFile {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface ParsedServiceArchive {
  json: Record<string, unknown> | null;
  markdown: string;
  summary: Record<string, unknown> | null;
  browserSnapshot: string;
  explanation: string;
  codeWalkthrough: string;
  sourcePlan: string;
  plansIndex: string;
  archiveIndex: string;
}

export interface SourceV386ServiceIntake {
  sourceVersion: "Node v386";
  profileVersion: string;
  intakeState: string;
  intakeDecision: string;
  readyForOperatorServiceLifecycleEvidenceIntake: boolean;
  readyForNodeV387ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v386";
  sourceNodeVersion: string;
  javaOperatorServiceLifecycleVersion: string;
  miniKvOperatorServiceLifecycleReleaseVersion: string;
  miniKvFrozenLiveReadGatePlanReleaseVersion: string;
  javaOperatorLifecycleEvidencePresent: boolean;
  miniKvLifecycleTemplateOnly: boolean;
  declaredMiniKvOperatorEvidenceCount: number;
  liveReadGateAllowed: boolean;
  runtimeProbeAllowed: boolean;
  activeShardPrototypeEnabled: boolean;
  intakeDigest: string;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  javaOperatorServiceLifecycleUsesHistoricalFallback: boolean;
  miniKvOperatorServiceLifecycleTemplateUsesHistoricalFallback: boolean;
  miniKvFrozenLiveReadGatePlanUsesHistoricalFallback: boolean;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
}

export interface ServiceReplay {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  readyForOperatorServiceLifecycleEvidenceIntake: boolean;
  readyForRuntimeLiveReadGate: boolean;
  javaOperatorServiceLifecycleUsedHistoricalFallback: boolean;
  miniKvOperatorServiceLifecycleTemplateUsedHistoricalFallback: boolean;
  miniKvFrozenLiveReadGatePlanUsedHistoricalFallback: boolean;
  javaOperatorServiceLifecycleVersion: string;
  miniKvOperatorServiceLifecycleReleaseVersion: string;
  miniKvFrozenLiveReadGatePlanReleaseVersion: string;
  javaOperatorLifecycleEvidencePresent: boolean;
  miniKvLifecycleTemplateOnly: boolean;
  declaredMiniKvOperatorEvidenceCount: number;
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

export interface ServiceArchiveRefs {
  archiveRoot: "e/386";
  jsonEvidence: ServiceArchiveFile;
  markdownEvidence: ServiceArchiveFile;
  summaryEvidence: ServiceArchiveFile;
  browserSnapshot: ServiceArchiveFile;
  htmlArchive: ServiceArchiveFile;
  screenshot: ServiceArchiveFile;
  explanation: ServiceArchiveFile;
  codeWalkthrough: ServiceArchiveFile;
  sourcePlan: ServiceArchiveFile;
  plansIndex: ServiceArchiveFile;
  archiveIndex: ServiceArchiveFile;
}

export interface ServiceArchiveRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification";
  sourceSpan: "Node v386 operator service lifecycle evidence intake";
  archiveRoot: "e/386";
  archiveVerificationDecision: "archive-operator-service-lifecycle-evidence-intake-and-prepare-v388" | "blocked";
  sourceIntakeDigest: string;
  replayReady: boolean;
  archiveFileDigests: Array<{ path: string; digest: string | null; byteLength: number }>;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesReplayFromFrozenEvidence: true;
  verifiesRuntimeGateStillBlocked: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v388";
}

export interface ServiceArchiveChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonIntakeReady: boolean;
  jsonSourceNodeV385Ready: boolean;
  jsonEvidenceVersionsMatch: boolean;
  jsonRuntimeGateClosed: boolean;
  jsonActiveShardPrototypeDisabled: boolean;
  jsonIntakeDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  jsonUsesFrozenHistoricalSnapshots: boolean;
  jsonMiniKvTemplateOnly: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsOperatorServiceLifecycle: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsRuntimeGateBlockedAndChecks: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV387ArchiveVerification: boolean;
  planIndexReferencesV386AndV387: boolean;
  archiveIndexReferencesV386: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayUsesFrozenJavaV160MiniKvV151AndV150: boolean;
  replayKeepsRuntimeGateClosed: boolean;
  replayKeepsActiveShardPrototypeDisabled: boolean;
  replayKeepsMiniKvTemplateOnly: boolean;
  archiveVerificationDoesNotRerunLiveRead: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  archiveVerificationDigestStable: boolean;
  readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: boolean;
}

export interface ServiceArchiveSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  declaredMiniKvOperatorEvidenceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ServiceArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ServiceArchiveProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification.v1";
  archiveVerificationState: "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified" | "blocked";
  archiveVerificationDecision: "archive-operator-service-lifecycle-evidence-intake-and-prepare-v388" | "blocked";
  readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: boolean;
  readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate: boolean;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v387";
  sourceNodeVersion: "Node v386";
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
  archiveReferences: ServiceArchiveRefs;
  sourceNodeV386: SourceV386ServiceIntake;
  replay: ServiceReplay;
  archiveVerification: ServiceArchiveRecord;
  checks: ServiceArchiveChecks;
  summary: ServiceArchiveSummary;
  productionBlockers: ServiceArchiveMessage[];
  warnings: ServiceArchiveMessage[];
  recommendations: ServiceArchiveMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV386Json: string;
    sourceNodeV386Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v388";
  };
  nextActions: string[];
}
