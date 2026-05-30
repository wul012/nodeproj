import type { HistoricalEvidenceFile } from "./historicalEvidenceReportUtils.js";

export interface RuntimeExecutionApprovalInputSourceReference {
  sourceVersion: string;
  evidenceKind: string;
  file: HistoricalEvidenceFile;
  present: boolean;
  complete: boolean;
  inputScope: string;
  status: string;
  readOnly: boolean;
  executionAllowed: false;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  startsJavaService: false;
  startsMiniKvService: false;
}

export interface JavaV164RuntimeExecutionApprovalGateInputReference
  extends RuntimeExecutionApprovalInputSourceReference {
  sourceVersion: "Java v164";
  evidenceKind: "java-side-runtime-execution-approval-gate-input";
  javaApprovalGateInputPresent: boolean;
  javaApprovalGateInputComplete: boolean;
  javaLoopbackPort: string | null;
  javaServiceOwner: string | null;
  javaOperatorApprovalRecordId: string | null;
  javaApprovalInputArtifactCount: number;
  javaPacketRowsForCorrelationCount: number;
  requiredSiblingInputCount: number;
  nodeApprovalGateInputPathCount: number;
  requiredSiblingInputs: string[];
}

export interface MiniKvV155RuntimeExecutionApprovalGateInputPrecheckReference
  extends RuntimeExecutionApprovalInputSourceReference {
  sourceVersion: "mini-kv v155";
  evidenceKind: "mini-kv-runtime-execution-approval-gate-input-precheck";
  releaseVersion: "v155" | string;
  precheckMode: string;
  approvalGateInputCount: number;
  missingApprovalGateInputCount: number;
  approvalGateInputsComplete: boolean;
  nodeApprovedRuntimeWindowPresent: boolean;
  correlatedOperatorApprovalRecordPresent: boolean;
  completeCrossProjectRuntimeExecutionPacketPresent: boolean;
  miniKvLoopbackPortCandidate: number | null;
  frozenCandidateReleaseVersion: string | null;
  requiredApprovalGateInputs: string[];
}

export interface NodeRuntimeExecutionApprovalGateInputReference {
  key: "nodeApprovedRuntimeWindow" | "correlatedOperatorApprovalRecord" | "crossProjectRuntimeExecutionPacket";
  label: string;
  owner: "node" | "operator" | "cross-project";
  required: true;
  file: HistoricalEvidenceFile;
  present: boolean;
  complete: boolean;
  missingReasonCode:
    | "NODE_APPROVED_RUNTIME_WINDOW_MISSING"
    | "CORRELATED_OPERATOR_APPROVAL_RECORD_MISSING"
    | "CROSS_PROJECT_RUNTIME_EXECUTION_PACKET_MISSING";
  requiredContents: string[];
}

export interface RuntimeExecutionApprovalInputHandoffRequirement {
  id:
    | "java-side-approval-gate-input"
    | "mini-kv-approval-gate-input"
    | "node-approved-runtime-window"
    | "correlated-operator-approval-record"
    | "complete-cross-project-runtime-execution-packet";
  owner: "java" | "mini-kv" | "node" | "operator" | "cross-project";
  currentStatus: "present" | "precheck-only" | "missing";
  blocksRuntime: boolean;
  expectedEvidence: string;
  currentEvidence: string;
  nextAction: string;
}

export interface RuntimeExecutionApprovalInputIntakeContractRecord {
  intakeDigest: string;
  intakeMode: "runtime-execution-approval-input-intake-contract";
  sourceSpan: "Node v399 archive verification + Java v164 approval input + mini-kv v155 precheck";
  intakeDecision: "block-runtime-execution-pending-complete-approval-inputs";
  javaInputAcceptedAsSourceEvidence: boolean;
  miniKvInputAcceptedAsSourceEvidence: boolean;
  miniKvPrecheckOnly: boolean;
  requiredNodeApprovalInputCount: 3;
  presentNodeApprovalInputCount: number;
  missingNodeApprovalInputCount: number;
  handoffRequirementCount: number;
  satisfiedHandoffRequirementCount: number;
  blockedHandoffRequirementCount: number;
  runtimeGateStillClosed: true;
  nextNodeVersionSuggested: "Node v401";
}

export interface RuntimeExecutionApprovalInputIntakeContractChecks {
  sourceNodeV399ArchiveVerified: boolean;
  javaV164EvidencePresent: boolean;
  javaV164StatusPassed: boolean;
  javaV164ApprovalInputPresent: boolean;
  javaV164ApprovalInputComplete: boolean;
  javaV164DoesNotApproveRuntime: boolean;
  javaV164RequiresSiblingInputs: boolean;
  miniKvV155EvidencePresent: boolean;
  miniKvV155ReleaseCurrent: boolean;
  miniKvV155PrecheckStatus: boolean;
  miniKvV155PrecheckOnly: boolean;
  miniKvV155ApprovalInputsStillMissing: boolean;
  nodeApprovalInputCountStable: boolean;
  nodeApprovalInputsAbsentAndRecorded: boolean;
  nodeApprovedRuntimeWindowMissing: boolean;
  correlatedOperatorApprovalRecordMissing: boolean;
  crossProjectRuntimePacketMissing: boolean;
  handoffRequirementsExplicit: boolean;
  handoffRequiresMiniKvFinalInput: boolean;
  handoffRequiresCrossProjectPacket: boolean;
  runtimeGateStillClosed: boolean;
  runtimePacketStillAbsent: boolean;
  executionStillDenied: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  intakeDigestStable: boolean;
  readyForRuntimeExecutionApprovalInputIntakeContract: boolean;
}

export interface RuntimeExecutionApprovalInputIntakeContractSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  javaInputPresent: boolean;
  javaInputComplete: boolean;
  miniKvPrecheckPresent: boolean;
  miniKvFinalApprovalInputPresent: boolean;
  requiredNodeApprovalInputCount: 3;
  presentNodeApprovalInputCount: number;
  missingNodeApprovalInputCount: number;
  handoffRequirementCount: number;
  satisfiedHandoffRequirementCount: number;
  blockedHandoffRequirementCount: number;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionApprovalInputIntakeContractMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-intake-contract.v1";
  intakeState: "runtime-execution-approval-input-intake-contract-blocked";
  intakeDecision: "block-runtime-execution-pending-complete-approval-inputs";
  readyForRuntimeExecutionApprovalInputIntakeContract: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v400";
  sourceNodeVersion: "Node v399";
  javaSourceVersion: "Java v164";
  miniKvSourceVersion: "mini-kv v155";
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
  sourceNodeV399: {
    sourceVersion: "Node v399";
    archiveVerificationState: string;
    readyForNodeV400RuntimeExecutionPacketApprovalInputIntake: boolean;
    readyForRuntimeExecutionPacket: boolean;
    readyForRuntimeLiveReadGate: boolean;
    checkCount: number;
    passedCheckCount: number;
  };
  javaV164ApprovalGateInput: JavaV164RuntimeExecutionApprovalGateInputReference;
  miniKvV155ApprovalGateInputPrecheck: MiniKvV155RuntimeExecutionApprovalGateInputPrecheckReference;
  nodeApprovalGateInputs: NodeRuntimeExecutionApprovalGateInputReference[];
  handoffRequirements: RuntimeExecutionApprovalInputHandoffRequirement[];
  intakeContract: RuntimeExecutionApprovalInputIntakeContractRecord;
  checks: RuntimeExecutionApprovalInputIntakeContractChecks;
  summary: RuntimeExecutionApprovalInputIntakeContractSummary;
  productionBlockers: RuntimeExecutionApprovalInputIntakeContractMessage[];
  warnings: RuntimeExecutionApprovalInputIntakeContractMessage[];
  recommendations: RuntimeExecutionApprovalInputIntakeContractMessage[];
  evidenceEndpoints: {
    intakeContractJson: string;
    intakeContractMarkdown: string;
    sourceNodeV399Json: string;
    sourceNodeV399Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v401";
  };
  nextActions: string[];
}
