export interface RuntimeExecutionPacketContributionFileReference {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface SourceNodeV396RuntimeArtifactProgressReference {
  sourceVersion: "Node v396";
  profileVersion: string;
  upstreamProgressIntakeState: string;
  upstreamProgressDecision: string;
  readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake: boolean;
  readyForNodeV397RuntimeExecutionPacketPrerequisiteReview: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  runtimeExecutionArtifactsComplete: false;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  checkCount: number;
  passedCheckCount: number;
  javaEvidenceReady: boolean;
  miniKvEvidenceReady: boolean;
  productionBlockerCount: number;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface JavaV163RuntimeExecutionPacketContribution {
  sourceVersion: "Java v163";
  evidenceFile: RuntimeExecutionPacketContributionFileReference;
  status: string | null;
  project: string | null;
  contributionScope: string | null;
  javaPacketContributionPresent: boolean;
  javaPacketContributionComplete: boolean;
  crossProjectRuntimeExecutionPacketPresent: boolean;
  crossProjectRuntimeExecutionPacketExecutable: boolean;
  readyForRuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  operatorApprovalRecordId: string | null;
  javaLoopbackPort: string | null;
  miniKvLoopbackPortRequirement: string | null;
  serviceOwnerConfirmation: string | null;
  getOnlySmokeCommandCount: number;
  cleanupProofArtifactCount: number;
  processCleanupRuleCount: number;
  acceptedRequirementRowCount: number;
  crossProjectMissingArtifactCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  evidenceReady: boolean;
}

export interface MiniKvV154RuntimeExecutionCandidate {
  sourceVersion: "mini-kv v154";
  evidenceFile: RuntimeExecutionPacketContributionFileReference;
  project: string | null;
  releaseVersion: string | null;
  status: string | null;
  readOnly: boolean;
  executionAllowed: boolean;
  previousConsumedReleaseVersion: string | null;
  previousConsumedFixturePath: string | null;
  candidateMode: string | null;
  candidateArtifactCount: number;
  acceptedRuntimeExecutionArtifactCount: number;
  missingAcceptedRuntimeExecutionArtifactCount: number;
  acceptedRuntimeExecutionArtifactsComplete: boolean;
  miniKvLoopbackPortCandidateDeclared: boolean;
  miniKvLoopbackPortCandidate: number | null;
  miniKvLoopbackPortOperatorApproved: boolean;
  getOnlySmokeCommandOperatorApproved: boolean;
  serviceOwnerCandidateDeclared: boolean;
  serviceOwnerOperatorConfirmed: boolean;
  processCleanupRulesCandidateDeclared: boolean;
  processCleanupRuleCount: number;
  cleanupProofPresent: boolean;
  crossProjectRuntimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  nodeRuntimeWindowApproved: boolean;
  operatorApprovalRecordPresent: boolean;
  startsMiniKvService: boolean;
  startsServices: boolean;
  runtimeProbeAllowed: boolean;
  liveReadAllowed: boolean;
  routerActivationAllowed: boolean;
  writeRoutingAllowed: boolean;
  evidenceReady: boolean;
}

export interface RuntimeExecutionPacketReviewRow {
  key:
    | "operatorApprovalRecord"
    | "concreteLoopbackPorts"
    | "getOnlySmokeCommand"
    | "cleanupProof"
    | "serviceOwnerConfirmation"
    | "processCleanupRules";
  javaContribution: string;
  miniKvContribution: string;
  nodeOrOperatorGap: string;
  crossProjectAccepted: false;
}

export interface RuntimeExecutionPacketContributionReviewRecord {
  reviewDigest: string;
  reviewMode: "java-mini-kv-runtime-execution-packet-contribution-review";
  sourceSpan: "Node v396 + Java v163 + mini-kv v154";
  reviewDecision:
    | "record-contributions-and-keep-runtime-execution-packet-blocked"
    | "blocked";
  javaPacketContributionReceived: boolean;
  miniKvRuntimeCandidateReceived: boolean;
  contributionRowsReviewed: 6;
  crossProjectAcceptedRequirementCount: 0;
  crossProjectMissingRequirementCount: 6;
  crossProjectRuntimeExecutionPacketPresent: false;
  crossProjectRuntimeExecutionPacketExecutable: false;
  nodeApprovedRuntimeWindowPresent: false;
  correlatedOperatorApprovalPresent: false;
  cleanupProofAfterRuntimeStartPresent: false;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  executionAttempted: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v398";
}

export interface RuntimeExecutionPacketContributionReviewChecks {
  sourceNodeV396Ready: boolean;
  sourceNodeV396ReadyForV397: boolean;
  sourceNodeV396RuntimeClosed: boolean;
  sourceNodeV396ChecksPassed: boolean;
  javaV163EvidencePresent: boolean;
  javaV163StatusPassed: boolean;
  javaV163ContributionPresent: boolean;
  javaV163ContributionComplete: boolean;
  javaV163NotCrossProjectPacket: boolean;
  javaV163NotExecutable: boolean;
  javaV163AllSixRowsAnswered: boolean;
  miniKvV154EvidencePresent: boolean;
  miniKvV154ReleaseCurrent: boolean;
  miniKvV154CandidateStatus: boolean;
  miniKvV154CandidateCountsStable: boolean;
  miniKvV154NoAcceptedRuntimeArtifacts: boolean;
  miniKvV154NotExecutable: boolean;
  miniKvV154CandidateRowsPresent: boolean;
  reviewRowsStable: boolean;
  reviewRowsNotCrossProjectAccepted: boolean;
  runtimePacketStillAbsent: boolean;
  nodeOperatorGapsRecorded: boolean;
  runtimeGateStillClosed: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  reviewDigestStable: boolean;
  readyForJavaMiniKvRuntimeExecutionPacketContributionReview: boolean;
}

export interface RuntimeExecutionPacketContributionReviewSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  javaEvidenceReady: boolean;
  miniKvEvidenceReady: boolean;
  reviewRowCount: number;
  crossProjectAcceptedRequirementCount: 0;
  crossProjectMissingRequirementCount: 6;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionPacketContributionReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-contribution-review.v1";
  contributionReviewState:
    | "java-v163-and-mini-kv-v154-contributions-reviewed"
    | "blocked";
  contributionReviewDecision:
    | "keep-runtime-execution-packet-blocked-pending-node-window-and-correlated-approval"
    | "blocked";
  readyForJavaMiniKvRuntimeExecutionPacketContributionReview: boolean;
  readyForNodeV398RuntimeExecutionPacketApprovalGateReview: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v397";
  sourceNodeVersion: "Node v396";
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
  sourceNodeV396: SourceNodeV396RuntimeArtifactProgressReference;
  javaV163RuntimeExecutionPacketContribution: JavaV163RuntimeExecutionPacketContribution;
  miniKvV154RuntimeExecutionCandidate: MiniKvV154RuntimeExecutionCandidate;
  reviewRows: RuntimeExecutionPacketReviewRow[];
  contributionReview: RuntimeExecutionPacketContributionReviewRecord;
  checks: RuntimeExecutionPacketContributionReviewChecks;
  summary: RuntimeExecutionPacketContributionReviewSummary;
  productionBlockers: RuntimeExecutionPacketContributionReviewMessage[];
  warnings: RuntimeExecutionPacketContributionReviewMessage[];
  recommendations: RuntimeExecutionPacketContributionReviewMessage[];
  evidenceEndpoints: {
    contributionReviewJson: string;
    contributionReviewMarkdown: string;
    sourceNodeV396Json: string;
    sourceNodeV396Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v398";
  };
  nextActions: string[];
}
