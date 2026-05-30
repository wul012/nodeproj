export interface RuntimeLiveReadGatePlanArchiveVerificationFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV390RuntimeLiveReadGatePlanReference {
  sourceVersion: "Node v390";
  profileVersion: string;
  planState: string;
  planDecision: string;
  readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: boolean;
  readyForNodeV391ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v390";
  sourceNodeVersion: string;
  runtimeGatePlanOnly: boolean;
  runtimeGateRequiresSeparateApproval: boolean;
  operatorApprovalRecordRequired: boolean;
  concreteLoopbackPortsRequired: boolean;
  getOnlySmokeCommandRequired: boolean;
  cleanupProofRequired: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  liveReadGateAllowed: boolean;
  runtimeProbeAllowed: boolean;
  planDigest: string;
  sourceNodeV389ArchiveVerificationDigest: string;
  sourceNodeV388ReplayProfileVersion: string;
  requiredRuntimeGateArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  javaDeclaredPortCount: number;
  miniKvDeclaredPortHandleCount: number;
  javaGetOnlySmokeTargetCount: number;
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
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface RuntimeLiveReadGatePlanReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  planState: string;
  planDecision: string;
  readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: boolean;
  readyForNodeV391ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: boolean;
  runtimeGatePlanOnly: boolean;
  runtimeGateRequiresSeparateApproval: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  liveReadGateAllowed: boolean;
  runtimeProbeAllowed: boolean;
  planDigest: string;
  sourceNodeV389ArchiveVerificationDigest: string;
  sourceNodeV388ReplayProfileVersion: string;
  requiredRuntimeGateArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  javaDeclaredPortCount: number;
  miniKvDeclaredPortHandleCount: number;
  javaGetOnlySmokeTargetCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface RuntimeLiveReadGatePlanArchiveReferences {
  archiveRoot: "e/390";
  jsonEvidence: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  markdownEvidence: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  summaryEvidence: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  browserSnapshot: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  htmlArchive: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  screenshot: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  explanation: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  codeWalkthrough: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  sourcePlan: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  plansIndex: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
  archiveIndex: RuntimeLiveReadGatePlanArchiveVerificationFileReference;
}

export interface RuntimeLiveReadGatePlanArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification";
  sourceSpan: "Node v390 declared operator lifecycle runtime live-read gate plan";
  archiveRoot: "e/390";
  archiveVerificationDecision:
    | "archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet"
    | "blocked";
  sourcePlanDigest: string;
  replayReady: boolean;
  archiveFileDigests: Array<{ path: string; digest: string | null; byteLength: number }>;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesReplayFromFrozenEvidence: true;
  verifiesRuntimeGateStillBlocked: true;
  verifiesExecutionPacketStillAbsent: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v392";
}

export interface RuntimeLiveReadGatePlanArchiveVerificationChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonPlanReady: boolean;
  jsonSourceNodeV389ArchiveVerified: boolean;
  jsonSourceNodeV388ReplayReady: boolean;
  jsonRuntimeGateClosed: boolean;
  jsonExecutionPacketNotApproved: boolean;
  jsonRuntimeGateArtifactsRequired: boolean;
  jsonPlanDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  jsonPlanSummaryMatches: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsRuntimeGatePlan: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsRuntimeBoundaryAndChecks: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV391ArchiveVerification: boolean;
  planIndexReferencesV390AndV391: boolean;
  archiveIndexReferencesV390: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayKeepsRuntimeGateClosed: boolean;
  replayKeepsExecutionPacketUnapproved: boolean;
  replayKeepsPlanArtifactsRequired: boolean;
  replayPreservesSourceEvidence: boolean;
  archiveVerificationDoesNotRerunLiveRead: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  archiveVerificationDigestStable: boolean;
  readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: boolean;
}

export interface RuntimeLiveReadGatePlanArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeLiveReadGatePlanArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification.v1";
  archiveVerificationState:
    | "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verified"
    | "blocked";
  archiveVerificationDecision:
    | "archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet"
    | "blocked";
  readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: boolean;
  readyForNodeV392RuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v391";
  sourceNodeVersion: "Node v390";
  archiveVerificationOnly: true;
  runtimeGateRequiresSeparateApproval: true;
  runtimeExecutionPacketPresent: false;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
  operatorApprovalRecordRequired: true;
  concreteLoopbackPortsRequired: true;
  getOnlySmokeCommandRequired: true;
  cleanupProofRequired: true;
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
  archiveReferences: RuntimeLiveReadGatePlanArchiveReferences;
  sourceNodeV390: SourceNodeV390RuntimeLiveReadGatePlanReference;
  replay: RuntimeLiveReadGatePlanReplayReference;
  archiveVerification: RuntimeLiveReadGatePlanArchiveVerificationRecord;
  checks: RuntimeLiveReadGatePlanArchiveVerificationChecks;
  summary: RuntimeLiveReadGatePlanArchiveVerificationSummary;
  productionBlockers: RuntimeLiveReadGatePlanArchiveVerificationMessage[];
  warnings: RuntimeLiveReadGatePlanArchiveVerificationMessage[];
  recommendations: RuntimeLiveReadGatePlanArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV390Json: string;
    sourceNodeV390Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v392";
  };
  nextActions: string[];
}
