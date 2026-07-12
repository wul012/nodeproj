import type { ArchiveEvidenceFile, ArchiveEvidenceRefs } from "../evidence/archiveEvidenceEngine.js";

export type PacketStopArchiveFileRef = ArchiveEvidenceFile;

export interface PacketStopArchiveSource {
  sourceVersion: "Node v392";
  profileVersion: string;
  stopRecordState: string;
  stopRecordDecision: string;
  readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: boolean;
  readyForNodeV393ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v392";
  sourceNodeVersion: string;
  stopRecordOnly: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  operatorApprovalRecordPresent: boolean;
  concreteLoopbackPortsPresent: boolean;
  getOnlySmokeCommandPresent: boolean;
  cleanupProofPresent: boolean;
  serviceOwnerPresent: boolean;
  processCleanupRulesPresent: boolean;
  executionAttempted: boolean;
  packetDigest: string;
  sourceNodeV391ArchiveVerificationDigest: string;
  sourceNodeV390PlanDigest: string;
  missingArtifactCount: number;
  stopReasonCodes: string[];
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
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

export interface PacketStopArchiveReplay {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  stopRecordState: string;
  stopRecordDecision: string;
  readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: boolean;
  readyForNodeV393ArchiveVerification: boolean;
  readyForRuntimeLiveReadGate: boolean;
  stopRecordOnly: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  executionAttempted: boolean;
  packetDigest: string;
  sourceNodeV391ArchiveVerificationDigest: string;
  sourceNodeV390PlanDigest: string;
  missingArtifactCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredRuntimeGateArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
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

export type PacketStopArchiveRefs = ArchiveEvidenceRefs<"e/392">;

export interface PacketStopArchiveRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification";
  sourceSpan: "Node v392 runtime execution packet stop record";
  archiveRoot: "e/392";
  archiveVerificationDecision: "archive-runtime-execution-packet-stop-record-and-keep-runtime-gate-closed" | "blocked";
  sourcePacketDigest: string;
  replayReady: boolean;
  archiveFileDigests: Array<{ path: string; digest: string | null; byteLength: number }>;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesReplayFromFrozenEvidence: true;
  verifiesRuntimeGateStillBlocked: true;
  verifiesExecutionPacketStillStopped: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v394";
}

export interface PacketStopArchiveChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonStopRecordReady: boolean;
  jsonReadyForNodeV393ArchiveVerification: boolean;
  jsonRuntimeGateClosed: boolean;
  jsonExecutionPacketStopped: boolean;
  jsonMissingArtifactsRecorded: boolean;
  jsonStopReasonCodesStable: boolean;
  jsonPacketDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsStopRecord: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsStopBoundaryAndChecks: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV393ArchiveVerification: boolean;
  planIndexReferencesV392AndV393: boolean;
  archiveIndexReferencesV392: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayKeepsRuntimeGateClosed: boolean;
  replayKeepsExecutionPacketStopped: boolean;
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
  readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification: boolean;
}

export interface PacketStopArchiveSummary {
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
  missingRuntimeExecutionArtifactCount: number;
  declaredOperatorEvidenceSourceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface PacketStopArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface PacketStopArchiveProofProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification.v1";
  archiveVerificationState:
    | "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verified"
    | "blocked";
  archiveVerificationDecision: "archive-runtime-execution-packet-stop-record-and-keep-runtime-gate-closed" | "blocked";
  readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification: boolean;
  readyForNodeV394RuntimeExecutionArtifactIntake: boolean;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v393";
  sourceNodeVersion: "Node v392";
  archiveVerificationOnly: true;
  runtimeGateRequiresSeparateApproval: true;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
  missingRuntimeExecutionArtifactCount: 6;
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
  archiveReferences: PacketStopArchiveRefs;
  sourceNodeV392: PacketStopArchiveSource;
  replay: PacketStopArchiveReplay;
  archiveVerification: PacketStopArchiveRecord;
  checks: PacketStopArchiveChecks;
  summary: PacketStopArchiveSummary;
  productionBlockers: PacketStopArchiveMessage[];
  warnings: PacketStopArchiveMessage[];
  recommendations: PacketStopArchiveMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV392Json: string;
    sourceNodeV392Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v394";
  };
  nextActions: string[];
}
