import type { HistoricalEvidenceFile } from "./historicalEvidenceReportUtils.js";
import type {
  RuntimeExecutionApprovalInputTargetValidation,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorTypes.js";

export interface CanonicalApprovalInputValueReference {
  key: "nodeApprovedRuntimeWindow" | "correlatedOperatorApprovalRecord" | "crossProjectRuntimeExecutionPacket";
  file: HistoricalEvidenceFile;
  present: boolean;
  validShape: boolean;
  schemaVersion: string | null;
  inputKind: string | null;
  approvalCorrelationId: string | null;
  containsRequiredPlaceholder: boolean;
}

export interface CanonicalApprovalInputValueValidationRecord {
  validationDigest: string;
  validationMode: "runtime-execution-canonical-approval-input-value-validation";
  sourceSpan: "Node v404 canonical precheck + three e/398/input canonical approval inputs";
  validationDecision: "accept-canonical-approval-input-values-for-next-live-read-gate";
  targetInputCount: 3;
  presentTargetInputCount: number;
  validTargetInputCount: number;
  sharedApprovalCorrelationId: string | null;
  sharedApprovalCorrelationIdValidated: boolean;
  approvalWindowId: string | null;
  packetId: string | null;
  windowTimeRangeValid: boolean;
  allowedHttpMethodsGetOnly: boolean;
  serviceOwnersPresent: boolean;
  smokeCommandsGetOnly: boolean;
  cleanupRulesPresent: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  readyForRuntimeLiveReadGate: boolean;
  runtimeGateStillClosed: true;
  nextNodeVersionSuggested: "Node v406";
}

export interface RuntimeExecutionCanonicalApprovalInputValueValidationChecks {
  sourceNodeV404Ready: boolean;
  sourceNodeV404StillBlocksRuntime: boolean;
  nodeRuntimeWindowInputPresent: boolean;
  operatorApprovalRecordInputPresent: boolean;
  crossProjectRuntimePacketInputPresent: boolean;
  nodeRuntimeWindowInputValid: boolean;
  operatorApprovalRecordInputValid: boolean;
  crossProjectRuntimePacketInputValid: boolean;
  noRequiredPlaceholders: boolean;
  sharedApprovalCorrelationIdMatches: boolean;
  operatorBindsRuntimeWindow: boolean;
  packetReferencesCanonicalInputs: boolean;
  packetBindsExpectedVersions: boolean;
  windowTimeRangeValid: boolean;
  loopbackPortsMatchPacket: boolean;
  allowedHttpMethodsGetOnly: boolean;
  credentialValueReadDenied: boolean;
  rawEndpointParsingDenied: boolean;
  managedAuditConnectionDenied: boolean;
  writeOperationsDenied: boolean;
  serviceOwnersPresent: boolean;
  smokeCommandsGetOnly: boolean;
  cleanupRulesPresent: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  readyForRuntimeLiveReadGate: boolean;
  executionStillNotAttempted: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  activeShardPrototypeStillDisabled: boolean;
  validationDigestStable: boolean;
  readyForRuntimeExecutionCanonicalApprovalInputValueValidation: boolean;
}

export interface RuntimeExecutionCanonicalApprovalInputValueValidationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  targetInputCount: 3;
  presentTargetInputCount: number;
  validTargetInputCount: number;
  sharedApprovalCorrelationIdValidated: boolean;
  readyForRuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionCanonicalApprovalInputValueValidationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-value-validation.v1";
  validationState: "runtime-execution-canonical-approval-input-value-validation-ready";
  validationDecision: "accept-canonical-approval-input-values-for-next-live-read-gate";
  readyForRuntimeExecutionCanonicalApprovalInputValueValidation: boolean;
  readyForRuntimeExecutionPacket: boolean;
  readyForRuntimeLiveReadGate: boolean;
  activeNodeVersion: "Node v405";
  sourceNodeVersion: "Node v404";
  javaSourceVersion: "Java v167";
  miniKvSourceVersion: "mini-kv v158";
  runtimeGateRequiresSeparateApproval: true;
  runtimeExecutionArtifactsComplete: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
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
  sourceNodeV404: {
    sourceVersion: "Node v404";
    intakeState: string;
    readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake: boolean;
    readyForRuntimeExecutionPacket: boolean;
    readyForRuntimeLiveReadGate: boolean;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    missingCanonicalInputCount: number;
  };
  inputReferences: CanonicalApprovalInputValueReference[];
  targetValidations: RuntimeExecutionApprovalInputTargetValidation[];
  valueValidation: CanonicalApprovalInputValueValidationRecord;
  checks: RuntimeExecutionCanonicalApprovalInputValueValidationChecks;
  summary: RuntimeExecutionCanonicalApprovalInputValueValidationSummary;
  productionBlockers: RuntimeExecutionCanonicalApprovalInputValueValidationMessage[];
  warnings: RuntimeExecutionCanonicalApprovalInputValueValidationMessage[];
  recommendations: RuntimeExecutionCanonicalApprovalInputValueValidationMessage[];
  evidenceEndpoints: {
    valueValidationJson: string;
    valueValidationMarkdown: string;
    sourceNodeV404Json: string;
    sourceNodeV404Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v406";
  };
  nextActions: string[];
}
