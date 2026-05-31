import type { HistoricalEvidenceFile } from "./historicalEvidenceReportUtils.js";

export interface JavaV166RuntimeExecutionApprovalInputTemplateCompatibilityReference {
  sourceVersion: "Java v166";
  evidenceKind: "java-runtime-execution-approval-input-template-compatibility";
  file: HistoricalEvidenceFile;
  present: boolean;
  complete: boolean;
  status: string;
  readOnly: boolean;
  executionAllowed: false;
  sourceContractHandoffVersion: string | null;
  sourceCanonicalJavaInputVersion: string | null;
  lastTemplateValidatorNodeVersion: string | null;
  nodeTemplateValidatorPresent: boolean;
  templatesAreApprovalInputs: boolean;
  canonicalApprovalInputsCreatedByJava: boolean;
  canonicalTargetPathCount: number;
  templateArchivePathCount: number;
  compatibilityCheckCount: number;
  blockedCanonicalInputCount: number;
  failClosedRuleCount: number;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  startsJavaService: false;
  startsMiniKvService: false;
}

export interface MiniKvV157RuntimeExecutionApprovalInputTemplateValidatorEchoReference {
  sourceVersion: "mini-kv v157";
  evidenceKind: "mini-kv-runtime-execution-approval-input-template-validator-echo";
  file: HistoricalEvidenceFile;
  present: boolean;
  complete: boolean;
  releaseVersion: string;
  status: string;
  readOnly: boolean;
  executionAllowed: false;
  echoMode: string;
  sourceNodeValidatorVersion: string | null;
  templateOnlyInputCount: number;
  templateArchivePathCount: number;
  canonicalTargetPathCount: number;
  canonicalRuntimeInputPresent: boolean;
  templateCopiedToCanonicalInput: boolean;
  sharedApprovalCorrelationIdPresent: boolean;
  templatesAuthorizeRuntime: boolean;
  failClosedOnTemplateOnlyInputs: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  startsJavaService: false;
  startsMiniKvService: false;
}

export interface RuntimeExecutionApprovalInputTemplateCompatibilityIntakeRecord {
  intakeDigest: string;
  intakeMode: "runtime-execution-approval-input-template-compatibility-intake";
  sourceSpan: "Node v402 template validator + Java v166 compatibility + mini-kv v157 echo";
  intakeDecision: "record-upstream-template-compatibility-and-keep-runtime-blocked";
  upstreamCompatibilityReceiptCount: 2;
  compatibleUpstreamCount: number;
  canonicalInputCount: 3;
  presentCanonicalInputCount: number;
  validCanonicalInputCount: number;
  templatesRemainTemplateOnly: true;
  runtimeGateStillClosed: true;
  nextNodeVersionSuggested: "Node v404";
}

export interface RuntimeExecutionApprovalInputTemplateCompatibilityIntakeChecks {
  sourceNodeV402Ready: boolean;
  sourceNodeV402StillBlocksRuntime: boolean;
  javaV166EvidencePresent: boolean;
  javaV166StatusPassed: boolean;
  javaV166ReceiptComplete: boolean;
  javaV166BindsNodeV402: boolean;
  javaV166DoesNotCreateCanonicalInputs: boolean;
  javaV166DoesNotApproveRuntime: boolean;
  miniKvV157EvidencePresent: boolean;
  miniKvV157ReleaseCurrent: boolean;
  miniKvV157StatusEcho: boolean;
  miniKvV157EchoComplete: boolean;
  miniKvV157DoesNotCreateCanonicalInputs: boolean;
  miniKvV157DoesNotApproveRuntime: boolean;
  templateMatrixCountStable: boolean;
  canonicalTargetsRemainAbsent: boolean;
  compatibilityRecordsComplete: boolean;
  runtimePacketStillAbsent: boolean;
  runtimeGateStillClosed: boolean;
  executionStillDenied: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  compatibilityDigestStable: boolean;
  readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake: boolean;
}

export interface RuntimeExecutionApprovalInputTemplateCompatibilityIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  javaCompatibilityReady: boolean;
  miniKvTemplateEchoReady: boolean;
  upstreamCompatibilityReceiptCount: 2;
  compatibleUpstreamCount: number;
  canonicalInputCount: 3;
  presentCanonicalInputCount: number;
  validCanonicalInputCount: number;
  missingCanonicalInputCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake.v1";
  intakeState: "runtime-execution-approval-input-template-compatibility-intake-blocked";
  intakeDecision: "record-upstream-template-compatibility-and-keep-runtime-blocked";
  readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v403";
  sourceNodeVersion: "Node v402";
  javaSourceVersion: "Java v166";
  miniKvSourceVersion: "mini-kv v157";
  runtimeGateRequiresSeparateApproval: true;
  runtimeExecutionArtifactsComplete: false;
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
  sourceNodeV402: {
    sourceVersion: "Node v402";
    templateValidatorState: string;
    readyForRuntimeExecutionApprovalInputTemplateValidator: boolean;
    readyForRuntimeExecutionPacket: boolean;
    readyForRuntimeLiveReadGate: boolean;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
  };
  javaV166TemplateCompatibility: JavaV166RuntimeExecutionApprovalInputTemplateCompatibilityReference;
  miniKvV157TemplateValidatorEcho: MiniKvV157RuntimeExecutionApprovalInputTemplateValidatorEchoReference;
  compatibilityIntake: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeRecord;
  checks: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeChecks;
  summary: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeSummary;
  productionBlockers: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[];
  warnings: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[];
  recommendations: RuntimeExecutionApprovalInputTemplateCompatibilityIntakeMessage[];
  evidenceEndpoints: {
    compatibilityIntakeJson: string;
    compatibilityIntakeMarkdown: string;
    sourceNodeV402Json: string;
    sourceNodeV402Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v404";
  };
  nextActions: string[];
}
