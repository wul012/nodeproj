export interface RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV398RuntimeExecutionPacketApprovalGateReviewReference {
  sourceVersion: "Node v398";
  profileVersion: string;
  approvalGateReviewState: string;
  approvalGateDecision: string;
  readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview: boolean;
  readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  runtimeExecutionArtifactsComplete: false;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
  executionAttempted: false;
  requiredApprovalInputCount: 3;
  presentApprovalInputCount: 0;
  missingApprovalInputCount: 3;
  crossProjectAcceptedRequirementCount: 0;
  crossProjectMissingRequirementCount: 6;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  approvalGateDigest: string | null;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface RuntimeExecutionPacketApprovalGateReviewArchiveReplayReference {
  replayState: "ready" | "blocked";
  replayedProfileVersion: string;
  approvalGateReviewState: string;
  approvalGateDecision: string;
  readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification: boolean;
  readyForRuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  runtimeExecutionArtifactsComplete: boolean;
  presentRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  executionAttempted: boolean;
  requiredApprovalInputCount: number;
  presentApprovalInputCount: number;
  missingApprovalInputCount: number;
  crossProjectAcceptedRequirementCount: number;
  crossProjectMissingRequirementCount: number;
  approvalGateDigest: string | null;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface RuntimeExecutionPacketApprovalGateReviewArchiveReferences {
  archiveRoot: "e/398";
  jsonEvidence: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  markdownEvidence: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  summaryEvidence: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  browserSnapshot: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  htmlArchive: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  screenshot: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  explanation: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  codeWalkthrough: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  sourcePlan: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  plansIndex: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
  archiveIndex: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationFileReference;
}

export interface RuntimeExecutionPacketApprovalGateReviewArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification";
  sourceSpan: "Node v398 runtime execution packet approval gate review";
  archiveRoot: "e/398";
  archiveVerificationDecision:
    | "archive-approval-gate-review-and-keep-runtime-gate-closed"
    | "blocked";
  sourceApprovalGateDigest: string | null;
  replayReady: boolean;
  archiveFileDigests: Array<{ path: string; digest: string | null; byteLength: number }>;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesReplayFromFrozenEvidence: true;
  verifiesApprovalGateBlockers: true;
  verifiesRuntimeGateStillBlocked: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v400";
}

export interface RuntimeExecutionPacketApprovalGateReviewArchiveVerificationChecks {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonApprovalGateReady: boolean;
  jsonReadyForNodeV399ArchiveVerification: boolean;
  jsonRuntimeGateClosed: boolean;
  jsonRuntimeApprovalBlocked: boolean;
  jsonApprovalInputCountsPreserved: boolean;
  jsonRuntimeArtifactCountsPreserved: boolean;
  jsonDigestStable: boolean;
  jsonChecksAllPassed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsApprovalGateBlockers: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsApprovalGateBlockersAndChecks: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV399ArchiveVerification: boolean;
  planIndexReferencesV398AndV399: boolean;
  archiveIndexReferencesV398: boolean;
  routeRecordedInArchive: boolean;
  replayReady: boolean;
  replayKeepsRuntimeGateClosed: boolean;
  replayKeepsApprovalGateBlocked: boolean;
  replayPreservesApprovalInputCounts: boolean;
  replayPreservesRuntimeArtifactCounts: boolean;
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
  readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification: boolean;
}

export interface RuntimeExecutionPacketApprovalGateReviewArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  requiredApprovalInputCount: 3;
  presentApprovalInputCount: 0;
  missingApprovalInputCount: 3;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification.v1";
  archiveVerificationState:
    | "runtime-execution-packet-approval-gate-review-archive-verified"
    | "blocked";
  archiveVerificationDecision:
    | "archive-approval-gate-review-and-keep-runtime-gate-closed"
    | "blocked";
  readyForRuntimeExecutionPacketApprovalGateReviewArchiveVerification: boolean;
  readyForNodeV400RuntimeExecutionPacketApprovalInputIntake: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v399";
  sourceNodeVersion: "Node v398";
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
  archiveReferences: RuntimeExecutionPacketApprovalGateReviewArchiveReferences;
  sourceNodeV398: SourceNodeV398RuntimeExecutionPacketApprovalGateReviewReference;
  replay: RuntimeExecutionPacketApprovalGateReviewArchiveReplayReference;
  archiveVerification: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationRecord;
  checks: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationChecks;
  summary: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationSummary;
  productionBlockers: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[];
  warnings: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[];
  recommendations: RuntimeExecutionPacketApprovalGateReviewArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV398Json: string;
    sourceNodeV398Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v400";
  };
  nextActions: string[];
}
