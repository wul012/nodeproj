export interface RuntimeExecutionPacketApprovalGateFileReference {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface SourceNodeV397RuntimeExecutionPacketContributionReviewReference {
  sourceVersion: "Node v397";
  profileVersion: string;
  contributionReviewState: string;
  contributionReviewDecision: string;
  readyForJavaMiniKvRuntimeExecutionPacketContributionReview: boolean;
  readyForNodeV398RuntimeExecutionPacketApprovalGateReview: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  runtimeExecutionArtifactsComplete: false;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  runtimeGateApprovalPresent: false;
  executionAttempted: false;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  javaEvidenceReady: boolean;
  miniKvEvidenceReady: boolean;
  reviewRowCount: number;
  crossProjectAcceptedRequirementCount: 0;
  crossProjectMissingRequirementCount: 6;
  productionBlockerCount: number;
  reviewDigest: string | null;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface RuntimeExecutionPacketApprovalGateInput {
  key:
    | "nodeApprovedRuntimeWindow"
    | "correlatedOperatorApprovalRecord"
    | "crossProjectRuntimeExecutionPacket";
  label: string;
  required: true;
  file: RuntimeExecutionPacketApprovalGateFileReference;
  present: boolean;
  gateSatisfied: false;
  missingReasonCode:
    | "NODE_APPROVED_RUNTIME_WINDOW_MISSING"
    | "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING"
    | "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING";
}

export interface RuntimeExecutionPacketApprovalGateReviewRecord {
  approvalGateDigest: string;
  reviewMode: "java-mini-kv-runtime-execution-packet-approval-gate-review";
  sourceSpan: "Node v397 contribution review + Node v398 approval gate inputs";
  approvalGateDecision:
    | "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet"
    | "blocked";
  requiredApprovalInputCount: 3;
  presentApprovalInputCount: number;
  missingApprovalInputCount: number;
  nodeApprovedRuntimeWindowPresent: false;
  correlatedOperatorApprovalPresent: false;
  crossProjectRuntimeExecutionPacketPresent: false;
  crossProjectRuntimeExecutionPacketExecutable: false;
  cleanupProofAfterRuntimeStartPresent: false;
  crossProjectAcceptedRequirementCount: 0;
  crossProjectMissingRequirementCount: 6;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  executionAttempted: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v399";
}

export interface RuntimeExecutionPacketApprovalGateReviewChecks {
  sourceNodeV397Ready: boolean;
  sourceNodeV397ReadyForV398: boolean;
  sourceNodeV397RuntimeClosed: boolean;
  sourceNodeV397ChecksPassed: boolean;
  sourceAcceptedCountsPreserved: boolean;
  sourceReviewDigestStable: boolean;
  approvalInputCountStable: boolean;
  approvalInputsAbsentAndRecorded: boolean;
  nodeApprovedRuntimeWindowAbsent: boolean;
  correlatedOperatorApprovalAbsent: boolean;
  crossProjectRuntimePacketAbsent: boolean;
  cleanupProofAfterRuntimeStartAbsent: boolean;
  runtimeArtifactAcceptanceStillZero: boolean;
  runtimePacketStillAbsent: boolean;
  runtimeGateStillClosed: boolean;
  executionStillDenied: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  approvalGateDigestStable: boolean;
  readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview: boolean;
}

export interface RuntimeExecutionPacketApprovalGateReviewSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  javaEvidenceReady: boolean;
  miniKvEvidenceReady: boolean;
  requiredApprovalInputCount: 3;
  presentApprovalInputCount: number;
  missingApprovalInputCount: number;
  crossProjectAcceptedRequirementCount: 0;
  crossProjectMissingRequirementCount: 6;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionPacketApprovalGateReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review.v1";
  approvalGateReviewState:
    | "runtime-execution-packet-approval-gate-reviewed-blocked"
    | "blocked";
  approvalGateDecision:
    | "block-runtime-execution-packet-approval-missing-node-window-correlated-approval-and-cross-project-packet"
    | "blocked";
  readyForJavaMiniKvRuntimeExecutionPacketApprovalGateReview: boolean;
  readyForNodeV399RuntimeExecutionPacketApprovalGateArchiveVerification: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v398";
  sourceNodeVersion: "Node v397";
  runtimeExecutionArtifactsComplete: false;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  runtimeGateApprovalPresent: false;
  concreteLoopbackPortsAssigned: false;
  executionAttempted: false;
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
  sourceNodeV397: SourceNodeV397RuntimeExecutionPacketContributionReviewReference;
  approvalGateInputs: RuntimeExecutionPacketApprovalGateInput[];
  approvalGateReview: RuntimeExecutionPacketApprovalGateReviewRecord;
  checks: RuntimeExecutionPacketApprovalGateReviewChecks;
  summary: RuntimeExecutionPacketApprovalGateReviewSummary;
  productionBlockers: RuntimeExecutionPacketApprovalGateReviewMessage[];
  warnings: RuntimeExecutionPacketApprovalGateReviewMessage[];
  recommendations: RuntimeExecutionPacketApprovalGateReviewMessage[];
  evidenceEndpoints: {
    approvalGateReviewJson: string;
    approvalGateReviewMarkdown: string;
    sourceNodeV397Json: string;
    sourceNodeV397Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v399";
  };
  nextActions: string[];
}
