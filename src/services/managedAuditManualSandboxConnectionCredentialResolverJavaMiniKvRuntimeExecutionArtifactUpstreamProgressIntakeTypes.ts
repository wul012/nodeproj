export interface UpstreamProgressEvidenceFileReference {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface SourceNodeV395RuntimeExecutionArtifactIntakePreflightArchiveReference {
  sourceVersion: "Node v395";
  profileVersion: string;
  archiveVerificationState: string;
  archiveVerificationDecision: string;
  readyForNodeV396RuntimeExecutionArtifactIntake: boolean;
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
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  replayCheckCount: number;
  replayPassedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
}

export interface JavaV162RuntimeArtifactCandidateReference {
  sourceVersion: "Java v162";
  evidenceFile: UpstreamProgressEvidenceFileReference;
  status: string | null;
  project: string | null;
  candidatePresent: boolean;
  javaRuntimeArtifactsDeclared: boolean;
  javaRuntimeArtifactsComplete: boolean;
  crossProjectRuntimeArtifactsComplete: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  readyForRuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  operatorApprovalRecord: string | null;
  operatorApprovalScope: string | null;
  serviceOwner: string | null;
  startupCommandOwner: string | null;
  cleanupOwner: string | null;
  declaredWorkingDirectory: string | null;
  declaredStartupCommand: string | null;
  javaLoopbackPort: string | null;
  miniKvLoopbackPort: string | null;
  getOnlySmokeCommandCount: number;
  cleanupProofCount: number;
  processCleanupRuleCount: number;
  missingCrossProjectArtifactCount: number;
  executionAllowed: false;
  startsJavaService: false;
  startsMiniKvService: false;
  evidenceReady: boolean;
}

export interface MiniKvV153RuntimeArtifactPreflightReference {
  sourceVersion: "mini-kv v153";
  evidenceFile: UpstreamProgressEvidenceFileReference;
  project: string | null;
  releaseVersion: string | null;
  status: string | null;
  readOnly: boolean;
  executionAllowed: boolean;
  sourceFrozenReleaseVersion: string | null;
  sourceFrozenFixturePath: string | null;
  preflightMode: string | null;
  runtimeExecutionArtifactsComplete: boolean;
  presentRuntimeExecutionArtifactCount: number;
  missingRuntimeExecutionArtifactCount: number;
  requiredRuntimeExecutionArtifactCount: number;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  executionAttempted: boolean;
  startsMiniKvService: boolean;
  startsServices: boolean;
  runtimeProbeAllowed: boolean;
  liveReadAllowed: boolean;
  routerActivationAllowed: boolean;
  writeRoutingAllowed: boolean;
  failClosedOnMissingArtifacts: boolean;
  evidenceReady: boolean;
}

export type RuntimePacketRequirementKey =
  | "operatorApprovalRecord"
  | "concreteLoopbackPorts"
  | "getOnlySmokeCommand"
  | "cleanupProof"
  | "serviceOwner"
  | "processCleanupRules";

export interface RuntimePacketRequirementClarification {
  key: RuntimePacketRequirementKey;
  label: string;
  javaCandidateStatus: string;
  miniKvStatus: string;
  operatorOrNodeStatus: string;
  packetSatisfied: false;
}

export interface UpstreamProgressClarificationRecord {
  clarificationDigest: string;
  clarificationMode: "java-mini-kv-runtime-execution-artifact-upstream-progress-intake";
  sourceSpan: "Node v395 + Java v162 + mini-kv v153";
  intakeDecision:
    | "record-upstream-progress-and-clarify-prerequisites-runtime-still-closed"
    | "blocked";
  javaV162CandidateReceived: boolean;
  miniKvV153BlockedPreflightReceived: boolean;
  bothUpstreamsFollowedNodePlanDirection: boolean;
  nodePlanAcceptanceCriteriaClarified: boolean;
  candidateIsNotCrossProjectApproval: true;
  blockedPreflightIsNotRuntimeArtifactSet: true;
  runtimeExecutionArtifactsComplete: false;
  satisfiedRuntimePacketRequirementCount: 0;
  unsatisfiedRuntimePacketRequirementCount: 6;
  runtimeExecutionPacketPresent: false;
  runtimeExecutionPacketExecutable: false;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  executionAttempted: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  activeShardPrototypeEnabled: false;
  nextNodeVersionSuggested: "Node v397";
}

export interface UpstreamProgressIntakeChecks {
  sourceNodeV395Ready: boolean;
  sourceNodeV395ReadyForV396: boolean;
  sourceNodeV395RuntimeGateClosed: boolean;
  sourceNodeV395ChecksPassed: boolean;
  javaEvidenceFilePresent: boolean;
  javaEvidenceStatusPassed: boolean;
  javaNextNodeHintV396: boolean;
  javaCandidatePresent: boolean;
  javaCandidateCompleteForJavaSide: boolean;
  javaCandidateNotCrossProjectComplete: boolean;
  javaCandidateNotExecutable: boolean;
  javaOwnerPortSmokeCleanupRecorded: boolean;
  miniKvEvidenceFilePresent: boolean;
  miniKvReleaseVersionV153: boolean;
  miniKvBlockedPreflightStatus: boolean;
  miniKvPreflightCountsPreserved: boolean;
  miniKvFailClosed: boolean;
  miniKvNoExecutionAllowed: boolean;
  miniKvFrozenFromV152: boolean;
  upstreamDirectionFollowed: boolean;
  nodePlanGapClarified: boolean;
  runtimeRequirementCountStable: boolean;
  noRuntimePacketRequirementsSatisfied: boolean;
  runtimeExecutionPacketStillAbsent: boolean;
  runtimeGateStillClosed: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  clarificationDigestStable: boolean;
  readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake: boolean;
}

export interface UpstreamProgressIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  javaEvidenceReady: boolean;
  miniKvEvidenceReady: boolean;
  runtimePacketRequirementCount: number;
  satisfiedRuntimePacketRequirementCount: 0;
  unsatisfiedRuntimePacketRequirementCount: 6;
  requiredRuntimeExecutionArtifactCount: 6;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface UpstreamProgressIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-artifact-upstream-progress-intake.v1";
  upstreamProgressIntakeState:
    | "java-v162-candidate-and-mini-kv-v153-blocked-preflight-intaken"
    | "blocked";
  upstreamProgressDecision:
    | "clarify-prerequisite-gap-and-keep-runtime-gate-closed"
    | "blocked";
  readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake: boolean;
  readyForNodeV397RuntimeExecutionPacketPrerequisiteReview: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v396";
  sourceNodeVersion: "Node v395";
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
  sourceNodeV395: SourceNodeV395RuntimeExecutionArtifactIntakePreflightArchiveReference;
  javaV162RuntimeArtifactCandidate: JavaV162RuntimeArtifactCandidateReference;
  miniKvV153RuntimeArtifactPreflight: MiniKvV153RuntimeArtifactPreflightReference;
  runtimePacketRequirements: RuntimePacketRequirementClarification[];
  upstreamProgressClarification: UpstreamProgressClarificationRecord;
  checks: UpstreamProgressIntakeChecks;
  summary: UpstreamProgressIntakeSummary;
  productionBlockers: UpstreamProgressIntakeMessage[];
  warnings: UpstreamProgressIntakeMessage[];
  recommendations: UpstreamProgressIntakeMessage[];
  evidenceEndpoints: {
    upstreamProgressIntakeJson: string;
    upstreamProgressIntakeMarkdown: string;
    sourceNodeV395Json: string;
    sourceNodeV395Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v397";
  };
  nextActions: string[];
}
