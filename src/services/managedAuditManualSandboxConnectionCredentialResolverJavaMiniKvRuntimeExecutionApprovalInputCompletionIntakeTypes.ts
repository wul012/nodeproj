import type { HistoricalEvidenceFile } from "./historicalEvidenceReportUtils.js";

export interface JavaV165RuntimeExecutionApprovalInputContractHandoffReference {
  sourceVersion: "Java v165";
  evidenceKind: "java-runtime-execution-approval-input-contract-handoff";
  file: HistoricalEvidenceFile;
  present: boolean;
  complete: boolean;
  status: string;
  readOnly: boolean;
  executionAllowed: false;
  sourceApprovalGateInputVersion: string | null;
  javaInputRemainsCanonical: boolean;
  javaInputChangedByThisVersion: boolean;
  sourceJavaApprovalGateInputPresent: boolean;
  sourceJavaApprovalGateInputComplete: boolean;
  nonJavaMissingInputCount: number;
  finalPacketBindingRequirementCount: number;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  startsJavaService: false;
  startsMiniKvService: false;
}

export interface MiniKvV156FinalApprovalGateInputReference {
  sourceVersion: "mini-kv v156";
  evidenceKind: "mini-kv-final-approval-gate-input";
  file: HistoricalEvidenceFile;
  present: boolean;
  complete: boolean;
  releaseVersion: string;
  status: string;
  readOnly: boolean;
  executionAllowed: false;
  inputMode: string;
  itemCount: number;
  loopbackHost: string | null;
  loopbackPort: number | null;
  serviceOwnerConfirmed: boolean;
  processCleanupRulesComplete: boolean;
  cleanupProofPresent: boolean;
  nodeApprovedRuntimeWindowPresent: boolean;
  correlatedOperatorApprovalRecordPresent: boolean;
  completeCrossProjectRuntimeExecutionPacketPresent: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  startsJavaService: false;
  startsMiniKvService: false;
}

export interface RuntimeExecutionApprovalCompletionInputReference {
  key:
    | "javaCanonicalApprovalInput"
    | "miniKvFinalApprovalInput"
    | "nodeApprovedRuntimeWindow"
    | "correlatedOperatorApprovalRecord"
    | "crossProjectRuntimeExecutionPacket";
  owner: "java" | "mini-kv" | "node" | "operator" | "cross-project";
  present: boolean;
  complete: boolean;
  blocksRuntime: boolean;
  evidence: string;
  requiredBeforeRuntime: boolean;
}

export interface RuntimeExecutionApprovalInputCompletionIntakeRecord {
  intakeDigest: string;
  intakeMode: "runtime-execution-approval-input-completion-intake";
  sourceSpan: "Node v400 contract + Java v165 handoff + mini-kv v156 final input";
  intakeDecision: "block-runtime-execution-pending-node-window-operator-approval-and-cross-project-packet";
  javaCanonicalInputReady: boolean;
  miniKvFinalInputReady: boolean;
  requiredInputCount: 5;
  presentInputCount: number;
  completeInputCount: number;
  missingRuntimeApprovalInputCount: number;
  runtimeGateStillClosed: true;
  nextNodeVersionSuggested: "Node v402";
}

export interface RuntimeExecutionApprovalInputCompletionIntakeChecks {
  sourceNodeV400ContractReady: boolean;
  javaV165EvidencePresent: boolean;
  javaV165StatusPassed: boolean;
  javaV165HandoffComplete: boolean;
  javaV165KeepsJavaV164Canonical: boolean;
  javaV165DoesNotApproveRuntime: boolean;
  miniKvV156EvidencePresent: boolean;
  miniKvV156ReleaseCurrent: boolean;
  miniKvV156FinalInputStatus: boolean;
  miniKvV156FinalInputComplete: boolean;
  miniKvV156DoesNotApproveRuntime: boolean;
  inputCountStable: boolean;
  javaAndMiniKvInputsReady: boolean;
  nodeApprovedRuntimeWindowStillMissing: boolean;
  correlatedOperatorApprovalStillMissing: boolean;
  crossProjectRuntimePacketStillMissing: boolean;
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
  readyForRuntimeExecutionApprovalInputCompletionIntake: boolean;
}

export interface RuntimeExecutionApprovalInputCompletionIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  javaCanonicalInputReady: boolean;
  miniKvFinalInputReady: boolean;
  requiredInputCount: 5;
  presentInputCount: number;
  completeInputCount: number;
  missingRuntimeApprovalInputCount: number;
  presentRuntimeExecutionArtifactCount: 0;
  missingRuntimeExecutionArtifactCount: 6;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionApprovalInputCompletionIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-completion-intake.v1";
  intakeState: "runtime-execution-approval-input-completion-intake-blocked";
  intakeDecision: "block-runtime-execution-pending-node-window-operator-approval-and-cross-project-packet";
  readyForRuntimeExecutionApprovalInputCompletionIntake: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v401";
  sourceNodeVersion: "Node v400";
  javaSourceVersion: "Java v165";
  miniKvSourceVersion: "mini-kv v156";
  runtimeGateRequiresSeparateApproval: true;
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
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
  sourceNodeV400: {
    sourceVersion: "Node v400";
    intakeState: string;
    readyForRuntimeExecutionApprovalInputIntakeContract: boolean;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
  };
  javaV165ContractHandoff: JavaV165RuntimeExecutionApprovalInputContractHandoffReference;
  miniKvV156FinalApprovalInput: MiniKvV156FinalApprovalGateInputReference;
  completionInputs: RuntimeExecutionApprovalCompletionInputReference[];
  completionIntake: RuntimeExecutionApprovalInputCompletionIntakeRecord;
  checks: RuntimeExecutionApprovalInputCompletionIntakeChecks;
  summary: RuntimeExecutionApprovalInputCompletionIntakeSummary;
  productionBlockers: RuntimeExecutionApprovalInputCompletionIntakeMessage[];
  warnings: RuntimeExecutionApprovalInputCompletionIntakeMessage[];
  recommendations: RuntimeExecutionApprovalInputCompletionIntakeMessage[];
  evidenceEndpoints: {
    completionIntakeJson: string;
    completionIntakeMarkdown: string;
    sourceNodeV400Json: string;
    sourceNodeV400Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v402";
  };
  nextActions: string[];
}
