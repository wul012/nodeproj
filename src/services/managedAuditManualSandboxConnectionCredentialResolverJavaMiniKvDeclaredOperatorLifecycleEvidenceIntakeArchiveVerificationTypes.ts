export interface DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV388DeclaredOperatorLifecycleEvidenceIntakeReference {
  sourceVersion: "Node v388";
  profileVersion: string;
  intakeState: string;
  intakeDecision: string;
  readyForDeclaredOperatorLifecycleEvidenceIntake: boolean;
  readyForNodeV389ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v388";
  sourceNodeVersion: string;
  evidenceIntakeOnly: boolean;
  declaredOperatorLifecycleEvidencePresent: boolean;
  runtimeGateRequiresSeparateApproval: boolean;
  javaDeclaredOperatorLifecycleVersion: string;
  miniKvDeclaredOperatorLifecycleReleaseVersion: string;
  miniKvFrozenOperatorTemplateReleaseVersion: string;
  declaredOperatorEvidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  miniKvRequiredBeforeRuntimeGateCount: number;
  liveReadGateAllowed: boolean;
  runtimeProbeAllowed: boolean;
  activeShardPrototypeEnabled: boolean;
  intakeDigest: string;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  javaDeclaredOperatorLifecycleUsesHistoricalFallback: boolean;
  miniKvDeclaredOperatorLifecycleUsesHistoricalFallback: boolean;
  miniKvFrozenOperatorTemplateUsesHistoricalFallback: boolean;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
}

export interface DeclaredOperatorLifecycleEvidenceIntakeReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  readyForDeclaredOperatorLifecycleEvidenceIntake: boolean;
  readyForRuntimeLiveReadGate: boolean;
  declaredOperatorLifecycleEvidencePresent: boolean;
  runtimeGateRequiresSeparateApproval: boolean;
  javaDeclaredOperatorLifecycleUsedHistoricalFallback: boolean;
  miniKvDeclaredOperatorLifecycleUsedHistoricalFallback: boolean;
  miniKvFrozenOperatorTemplateUsedHistoricalFallback: boolean;
  javaDeclaredOperatorLifecycleVersion: string;
  miniKvDeclaredOperatorLifecycleReleaseVersion: string;
  miniKvFrozenOperatorTemplateReleaseVersion: string;
  declaredOperatorEvidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  miniKvRequiredBeforeRuntimeGateCount: number;
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

export interface DeclaredOperatorLifecycleEvidenceIntakeArchiveReferences {
  archiveRoot: "e/388";
  jsonEvidence: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  markdownEvidence: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  summaryEvidence: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  browserSnapshot: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  htmlArchive: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  screenshot: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  explanation: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  codeWalkthrough: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  sourcePlan: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  plansIndex: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
  archiveIndex: DeclaredOperatorLifecycleEvidenceIntakeArchiveFileReference;
}

export interface DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification";
  sourceSpan: "Node v388 declared operator lifecycle evidence intake";
  archiveRoot: "e/388";
  archiveVerificationDecision: "archive-declared-operator-lifecycle-evidence-intake-and-prepare-v390-runtime-gate-plan" | "blocked";
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
  nextNodeVersionSuggested: "Node v390";
}

export interface DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonIntakeReady: boolean;
  jsonSourceNodeV387ArchiveVerified: boolean;
  jsonEvidenceVersionsMatch: boolean;
  jsonRuntimeGateClosed: boolean;
  jsonRuntimeGateRequiresSeparateApproval: boolean;
  jsonActiveShardPrototypeDisabled: boolean;
  jsonIntakeDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  jsonUsesFrozenHistoricalSnapshots: boolean;
  jsonDeclaredOperatorEvidencePresent: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsDeclaredOperatorLifecycle: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsRuntimeGateBlockedAndChecks: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV389ArchiveVerification: boolean;
  planIndexReferencesV388AndV389: boolean;
  archiveIndexReferencesV388: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayUsesFrozenJavaV161MiniKvV152AndV151: boolean;
  replayKeepsRuntimeGateClosed: boolean;
  replayKeepsActiveShardPrototypeDisabled: boolean;
  replayKeepsDeclaredOperatorEvidence: boolean;
  archiveVerificationDoesNotRerunLiveRead: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  archiveVerificationDigestStable: boolean;
  readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: boolean;
}

export interface DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification.v1";
  archiveVerificationState: "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verified" | "blocked";
  archiveVerificationDecision: "archive-declared-operator-lifecycle-evidence-intake-and-prepare-v390-runtime-gate-plan" | "blocked";
  readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: boolean;
  readyForNodeV390RuntimeGatePlan: boolean;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v389";
  sourceNodeVersion: "Node v388";
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
  archiveReferences: DeclaredOperatorLifecycleEvidenceIntakeArchiveReferences;
  sourceNodeV388: SourceNodeV388DeclaredOperatorLifecycleEvidenceIntakeReference;
  replay: DeclaredOperatorLifecycleEvidenceIntakeReplayReference;
  archiveVerification: DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationRecord;
  checks: DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationChecks;
  summary: DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationSummary;
  productionBlockers: DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationMessage[];
  warnings: DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationMessage[];
  recommendations: DeclaredOperatorLifecycleEvidenceIntakeArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV388Json: string;
    sourceNodeV388Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v390";
  };
  nextActions: string[];
}
