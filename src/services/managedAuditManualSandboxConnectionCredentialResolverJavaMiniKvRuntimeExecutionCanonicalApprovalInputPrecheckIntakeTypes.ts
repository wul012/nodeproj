import type { HistoricalEvidenceFile } from "./historicalEvidenceReportUtils.js";

export interface JavaV167RuntimeExecutionApprovalInputTemplateCompatibilityIntakeReference {
  sourceVersion: "Java v167";
  evidenceKind: "java-runtime-execution-approval-input-template-compatibility-intake";
  file: HistoricalEvidenceFile;
  present: boolean;
  complete: boolean;
  status: string;
  readOnly: boolean;
  executionAllowed: false;
  compatibilityIntakeReceiptPresent: boolean;
  compatibilityIntakeReceiptComplete: boolean;
  nodeCompatibilityIntakePresent: boolean;
  nodeCompatibilityIntakeComplete: boolean;
  sourceTemplateCompatibilityReceiptComplete: boolean;
  sourceJavaInputCanonical: boolean;
  nodeTemplateValidatorPresent: boolean;
  templatesAreApprovalInputs: boolean;
  canonicalApprovalInputsCreatedByJava: boolean;
  canonicalApprovalInputsCreatedByNodeV403: boolean;
  nodeApprovedRuntimeWindowPresent: boolean;
  correlatedOperatorApprovalRecordPresent: boolean;
  completeCrossProjectRuntimeExecutionPacketPresent: boolean;
  sourceTemplateCompatibilityVersion: string | null;
  sourceContractHandoffVersion: string | null;
  sourceCanonicalJavaInputVersion: string | null;
  sourceNodeTemplateValidatorVersion: string | null;
  nodeCompatibilityIntakeVersion: string | null;
  miniKvTemplateEchoVersion: string | null;
  nextNodeConsumerHint: string | null;
  canonicalTargetPathCount: number;
  templateArchivePathCount: number;
  compatibilityIntakeCheckCount: number;
  blockedCanonicalInputCount: number;
  productionBlockerCount: number;
  failClosedRuleCount: number;
  stopConditionCount: number;
  runtimeExecutionPacketPresent: false;
  runtimeGateApprovalPresent: false;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  startsJavaService: false;
  startsMiniKvService: false;
}

export interface MiniKvV158RuntimeExecutionCanonicalApprovalInputPrecheckReference {
  sourceVersion: "mini-kv v158";
  evidenceKind: "mini-kv-runtime-execution-canonical-approval-input-precheck";
  file: HistoricalEvidenceFile;
  present: boolean;
  complete: boolean;
  releaseVersion: string;
  status: string;
  readOnly: boolean;
  executionAllowed: false;
  precheckMode: string;
  sourceFrozenReleaseVersion: string | null;
  sourceNodeCompatibilityVersion: string | null;
  sourceNodePlan: string | null;
  canonicalInputRoot: string | null;
  requiredCanonicalInputCount: number;
  presentCanonicalInputCount: number;
  missingCanonicalInputCount: number;
  requiredCanonicalInputPathCount: number;
  nodeApprovedRuntimeWindowCanonicalPresent: boolean;
  correlatedOperatorApprovalRecordCanonicalPresent: boolean;
  completeCrossProjectRuntimeExecutionPacketCanonicalPresent: boolean;
  canonicalApprovalInputsComplete: boolean;
  sharedApprovalCorrelationIdPresent: boolean;
  sharedApprovalCorrelationIdValidated: boolean;
  templatesAcceptedAsCanonicalInputs: boolean;
  templateCompatibilityEvidenceAcceptedAsApproval: boolean;
  runtimeGateApprovalPresent: boolean;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  concreteLoopbackPortsAssigned: boolean;
  executionAttempted: boolean;
  startsJavaService: false;
  startsMiniKvService: false;
  startsServices: boolean;
  runtimeProbeAllowed: boolean;
  liveReadAllowed: boolean;
  activeShardPrototypeEnabled: boolean;
  routerActivationAllowed: boolean;
  writeRoutingAllowed: boolean;
  requiresRealCanonicalInputs: boolean;
  requiresSharedApprovalCorrelationId: boolean;
  requiresConcreteApprovalValues: boolean;
  requiresGetOnlySmokeCommands: boolean;
  requiresCleanupProofAfterApprovedStart: boolean;
  failClosedOnMissingCanonicalInputs: boolean;
}

export interface RuntimeExecutionCanonicalApprovalInputPrecheckIntakeRecord {
  intakeDigest: string;
  intakeMode: "runtime-execution-canonical-approval-input-precheck-intake";
  sourceSpan: "Node v403 compatibility intake + Java v167 compatibility intake + mini-kv v158 canonical precheck";
  intakeDecision: "record-canonical-approval-input-precheck-and-keep-runtime-blocked";
  upstreamPrecheckReceiptCount: 2;
  completeUpstreamPrecheckCount: number;
  canonicalInputCount: 3;
  presentCanonicalInputCount: number;
  validCanonicalInputCount: number;
  missingCanonicalInputCount: number;
  sharedApprovalCorrelationIdValidated: false;
  runtimeGateStillClosed: true;
  nextNodeVersionSuggested: "Node v405";
}

export interface RuntimeExecutionCanonicalApprovalInputPrecheckIntakeChecks {
  sourceNodeV403Ready: boolean;
  sourceNodeV403StillBlocksRuntime: boolean;
  javaV167EvidencePresent: boolean;
  javaV167StatusPassed: boolean;
  javaV167ReceiptComplete: boolean;
  javaV167BindsNodeV403: boolean;
  javaV167DoesNotCreateCanonicalInputs: boolean;
  javaV167LeavesCanonicalInputsMissing: boolean;
  javaV167DoesNotApproveRuntime: boolean;
  miniKvV158EvidencePresent: boolean;
  miniKvV158ReleaseCurrent: boolean;
  miniKvV158StatusPrecheck: boolean;
  miniKvV158PrecheckComplete: boolean;
  miniKvV158BindsNodeV403: boolean;
  miniKvV158CanonicalCountsBlocked: boolean;
  miniKvV158DoesNotAcceptTemplatesAsCanonical: boolean;
  miniKvV158RequiresRealApprovalValues: boolean;
  miniKvV158DoesNotApproveRuntime: boolean;
  canonicalTargetsRemainAbsent: boolean;
  precheckRecordsComplete: boolean;
  runtimePacketStillAbsent: boolean;
  runtimeGateStillClosed: boolean;
  executionStillDenied: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  precheckDigestStable: boolean;
  readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake: boolean;
}

export interface RuntimeExecutionCanonicalApprovalInputPrecheckIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  javaCompatibilityIntakeReady: boolean;
  miniKvCanonicalPrecheckReady: boolean;
  upstreamPrecheckReceiptCount: 2;
  completeUpstreamPrecheckCount: number;
  canonicalInputCount: 3;
  presentCanonicalInputCount: number;
  validCanonicalInputCount: number;
  missingCanonicalInputCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake.v1";
  intakeState: "runtime-execution-canonical-approval-input-precheck-intake-blocked";
  intakeDecision: "record-canonical-approval-input-precheck-and-keep-runtime-blocked";
  readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v404";
  sourceNodeVersion: "Node v403";
  javaSourceVersion: "Java v167";
  miniKvSourceVersion: "mini-kv v158";
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
  sourceNodeV403: {
    sourceVersion: "Node v403";
    intakeState: string;
    readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake: boolean;
    readyForRuntimeExecutionPacket: boolean;
    readyForRuntimeLiveReadGate: boolean;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    compatibleUpstreamCount: number;
    missingCanonicalInputCount: number;
  };
  javaV167TemplateCompatibilityIntake: JavaV167RuntimeExecutionApprovalInputTemplateCompatibilityIntakeReference;
  miniKvV158CanonicalApprovalInputPrecheck: MiniKvV158RuntimeExecutionCanonicalApprovalInputPrecheckReference;
  canonicalApprovalInputPrecheckIntake: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeRecord;
  checks: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeChecks;
  summary: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeSummary;
  productionBlockers: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[];
  warnings: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[];
  recommendations: RuntimeExecutionCanonicalApprovalInputPrecheckIntakeMessage[];
  evidenceEndpoints: {
    canonicalApprovalInputPrecheckIntakeJson: string;
    canonicalApprovalInputPrecheckIntakeMarkdown: string;
    sourceNodeV403Json: string;
    sourceNodeV403Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v405";
  };
  nextActions: string[];
}
