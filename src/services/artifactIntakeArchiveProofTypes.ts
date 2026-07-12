import type { ArchiveEvidenceFile, ArchiveEvidenceRefs } from "../evidence/archiveEvidenceEngine.js";

export type ArtifactIntakeArchiveFileRef = ArchiveEvidenceFile;

export interface ArtifactIntakeArchiveSource {
  sourceVersion: "Node v394";
  profileVersion: string;
  intakePreflightState: string;
  intakeDecision: string;
  readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight: boolean;
  readyForNodeV395ArchiveVerification: boolean;
  readyForRuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v394";
  sourceNodeVersion: string;
  artifactIntakePreflightOnly: boolean;
  runtimeExecutionArtifactsComplete: boolean;
  presentRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  executionAttempted: boolean;
  artifactIntakeDigest: string;
  sourceNodeV393ArchiveVerificationDigest: string;
  sourceNodeV392PacketDigest: string;
  missingReasonCodes: string[];
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface ArtifactIntakeArchiveReplay {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  intakePreflightState: string;
  intakeDecision: string;
  readyForNodeV395ArchiveVerification: boolean;
  readyForRuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  artifactIntakePreflightOnly: boolean;
  runtimeExecutionArtifactsComplete: boolean;
  presentRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  executionAttempted: boolean;
  artifactIntakeDigest: string;
  sourceNodeV393ArchiveVerificationDigest: string;
  sourceNodeV392PacketDigest: string;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export type ArtifactIntakeArchiveRefs = ArchiveEvidenceRefs<"e/394">;

export interface ArtifactIntakeArchiveRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification";
  sourceSpan: "Node v394 runtime execution artifact intake preflight";
  archiveRoot: "e/394";
  archiveVerificationDecision:
    | "archive-runtime-execution-artifact-intake-preflight-and-keep-runtime-gate-closed"
    | "blocked";
  sourceArtifactIntakeDigest: string;
  replayReady: boolean;
  archiveFileDigests: Array<{ path: string; digest: string | null; byteLength: number }>;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesReplayFromFrozenEvidence: true;
  verifiesRuntimeGateStillBlocked: true;
  verifiesArtifactSetStillMissing: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v396";
}

export interface ArtifactIntakeArchiveChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonPreflightReady: boolean;
  jsonReadyForNodeV395ArchiveVerification: boolean;
  jsonRuntimeGateClosed: boolean;
  jsonRuntimeExecutionPacketBlocked: boolean;
  jsonArtifactCountsPreserved: boolean;
  jsonMissingReasonCodesStable: boolean;
  jsonDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsBlockedPreflight: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsBlockedBoundaryAndChecks: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV395ArchiveVerification: boolean;
  planIndexReferencesV394AndV395: boolean;
  archiveIndexReferencesV394: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayKeepsRuntimeGateClosed: boolean;
  replayKeepsRuntimeExecutionPacketBlocked: boolean;
  replayPreservesMissingArtifacts: boolean;
  replayPreservesSourceCheckCounts: boolean;
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
  readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification: boolean;
}

export interface ArtifactIntakeArchiveSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
  presentRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ArtifactIntakeArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ArtifactIntakeArchiveProofProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification.v1";
  archiveVerificationState:
    | "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verified"
    | "blocked";
  archiveVerificationDecision:
    | "archive-runtime-execution-artifact-intake-preflight-and-keep-runtime-gate-closed"
    | "blocked";
  readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification: boolean;
  readyForNodeV396RuntimeExecutionArtifactIntake: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v395";
  sourceNodeVersion: "Node v394";
  archiveVerificationOnly: true;
  runtimeGateRequiresSeparateApproval: true;
  runtimeExecutionArtifactsComplete: false;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
  executionAttempted: false;
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
  archiveReferences: ArtifactIntakeArchiveRefs;
  sourceNodeV394: ArtifactIntakeArchiveSource;
  replay: ArtifactIntakeArchiveReplay;
  archiveVerification: ArtifactIntakeArchiveRecord;
  checks: ArtifactIntakeArchiveChecks;
  summary: ArtifactIntakeArchiveSummary;
  productionBlockers: ArtifactIntakeArchiveMessage[];
  warnings: ArtifactIntakeArchiveMessage[];
  recommendations: ArtifactIntakeArchiveMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV394Json: string;
    sourceNodeV394Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v396";
  };
  nextActions: string[];
}
