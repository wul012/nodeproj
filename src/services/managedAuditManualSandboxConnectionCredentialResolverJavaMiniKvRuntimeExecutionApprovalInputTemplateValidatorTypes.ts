import type { HistoricalEvidenceFile } from "./historicalEvidenceReportUtils.js";

export type RuntimeExecutionApprovalTemplateKey =
  | "nodeApprovedRuntimeWindow"
  | "correlatedOperatorApprovalRecord"
  | "crossProjectRuntimeExecutionPacket";

export interface RuntimeExecutionApprovalInputTemplateDefinition {
  key: RuntimeExecutionApprovalTemplateKey;
  owner: "node" | "operator" | "cross-project";
  targetPath: string;
  templateArchivePath: string;
  schemaVersion: string;
  inputKind: string;
  requiredFields: string[];
  expectedConstants: Record<string, string | number | boolean>;
  semanticRules: string[];
  template: Record<string, unknown>;
  templateDigest: string;
}

export interface RuntimeExecutionApprovalInputTargetValidation {
  key: RuntimeExecutionApprovalTemplateKey;
  owner: "node" | "operator" | "cross-project";
  file: HistoricalEvidenceFile;
  present: boolean;
  valid: boolean;
  requiredFieldCount: number;
  missingRequiredFieldCount: number;
  expectedConstantCount: number;
  passedExpectedConstantCount: number;
  semanticRuleCount: number;
  passedSemanticRuleCount: number;
  canUnlockRuntimeAlone: false;
}

export interface RuntimeExecutionApprovalInputTemplateBundle {
  bundleDigest: string;
  bundleMode: "template-only-no-runtime-approval";
  sourceSpan: "Node v401 completion intake + Java v165 + mini-kv v156";
  templateCount: 3;
  targetInputCount: 3;
  presentTargetInputCount: number;
  validTargetInputCount: number;
  missingTargetInputCount: number;
  runtimeGateStillClosed: true;
  nextNodeVersionSuggested: "Node v403";
}

export interface RuntimeExecutionApprovalInputTemplateValidatorChecks {
  sourceNodeV401Ready: boolean;
  sourceNodeV401StillBlocksRuntime: boolean;
  templateCountStable: boolean;
  targetInputCountStable: boolean;
  templateDigestsStable: boolean;
  nodeWindowTemplateComplete: boolean;
  operatorApprovalTemplateComplete: boolean;
  crossProjectPacketTemplateComplete: boolean;
  targetPathsCanonical: boolean;
  templateArchivePathsSeparateFromCanonicalInputs: boolean;
  noConcreteApprovalInputsPresent: boolean;
  noConcreteApprovalInputsValid: boolean;
  runtimePacketStillAbsent: boolean;
  runtimeGateStillClosed: boolean;
  executionStillDenied: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  readyForRuntimeExecutionApprovalInputTemplateValidator: boolean;
}

export interface RuntimeExecutionApprovalInputTemplateValidatorSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  templateCount: 3;
  targetInputCount: 3;
  presentTargetInputCount: number;
  validTargetInputCount: number;
  missingTargetInputCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionApprovalInputTemplateValidatorMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator.v1";
  templateValidatorState: "runtime-execution-approval-input-templates-published-runtime-blocked";
  templateValidatorDecision: "publish-machine-checkable-input-templates-and-keep-runtime-blocked";
  readyForRuntimeExecutionApprovalInputTemplateValidator: boolean;
  readyForRuntimeExecutionPacket: false;
  readyForRuntimeLiveReadGate: false;
  activeNodeVersion: "Node v402";
  sourceNodeVersion: "Node v401";
  javaSourceVersion: "Java v165";
  miniKvSourceVersion: "mini-kv v156";
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
  sourceNodeV401: {
    sourceVersion: "Node v401";
    intakeState: string;
    readyForRuntimeExecutionApprovalInputCompletionIntake: boolean;
    readyForRuntimeExecutionPacket: boolean;
    readyForRuntimeLiveReadGate: boolean;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
  };
  templates: RuntimeExecutionApprovalInputTemplateDefinition[];
  targetValidations: RuntimeExecutionApprovalInputTargetValidation[];
  templateBundle: RuntimeExecutionApprovalInputTemplateBundle;
  checks: RuntimeExecutionApprovalInputTemplateValidatorChecks;
  summary: RuntimeExecutionApprovalInputTemplateValidatorSummary;
  productionBlockers: RuntimeExecutionApprovalInputTemplateValidatorMessage[];
  warnings: RuntimeExecutionApprovalInputTemplateValidatorMessage[];
  recommendations: RuntimeExecutionApprovalInputTemplateValidatorMessage[];
  evidenceEndpoints: {
    templateValidatorJson: string;
    templateValidatorMarkdown: string;
    sourceNodeV401Json: string;
    sourceNodeV401Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v403";
  };
  nextActions: string[];
}
