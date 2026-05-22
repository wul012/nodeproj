export interface ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecordProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record.v1";
  decisionRecordState: "runtime-shell-chain-stop-or-prerequisite-decision-record-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord: boolean;
  readOnlyDecisionRecord: true;
  runtimeShellChainStopOrPrerequisiteDecisionRecordOnly: true;
  consumesNodeV303PostDecisionPlanIntakeUpstreamEchoVerification: true;
  readyForParallelJavaV141MiniKvV134EchoRequest: boolean;
  readyForNodeV305StopPrerequisiteUpstreamEchoVerification: false;
  readyForDisabledRuntimeShellImplementation: false;
  readyForDisabledRuntimeShellInvocation: false;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  runtimeShellImplemented: false;
  runtimeShellEnabled: false;
  runtimeShellInvocationAllowed: false;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  credentialValueProvided: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlRendered: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  fakeSecretProviderInstantiated: false;
  fakeResolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV303: SourceNodeV303PostDecisionPlanIntakeUpstreamEchoVerificationReference;
  decisionRecord: RuntimeShellChainStopOrPrerequisiteDecisionRecord;
  checks: RuntimeShellChainStopOrPrerequisiteDecisionRecordChecks;
  summary: RuntimeShellChainStopOrPrerequisiteDecisionRecordSummary;
  productionBlockers: RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[];
  warnings: RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[];
  recommendations: RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage[];
  evidenceEndpoints: {
    runtimeShellChainStopOrPrerequisiteDecisionRecordJson: string;
    runtimeShellChainStopOrPrerequisiteDecisionRecordMarkdown: string;
    sourceNodeV303Json: string;
    sourceNodeV303Markdown: string;
    activePlan: string;
    recommendedParallelJavaV141: string;
    recommendedParallelMiniKvV134: string;
  };
  nextActions: string[];
}

export interface SourceNodeV303PostDecisionPlanIntakeUpstreamEchoVerificationReference {
  sourceVersion: "Node v303";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification.v1";
  verificationState: "runtime-shell-post-decision-plan-intake-upstream-echo-verification-ready" | "blocked";
  readyForPostDecisionPlanIntakeUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  activeNodeVerificationVersion: "Node v303";
  legacyNodeV302ConsumerMarkerAccepted: true;
  verificationDigest: string;
  sourceSpan: "Node v301 + Node v302 + Java v136 + mini-kv v133";
  sourceNodeV301Ready: boolean;
  sourceNodeV302QualityPassReady: boolean;
  javaV136EchoReady: boolean;
  miniKvV133ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface RuntimeShellChainStopOrPrerequisiteDecisionRecord {
  decisionDigest: string;
  recordMode: "runtime-shell-chain-stop-or-prerequisite-decision-record-only";
  decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell";
  sourceSpan: "Node v303 + Java v136 + mini-kv v133";
  decision: "require-explicit-approval-prerequisites-before-runtime-shell";
  decisionReason: string;
  selectedPath: "continue-only-as-blocked-prerequisite-review";
  stopRuntimeShellChainWithoutPrerequisites: true;
  allowsParallelJavaV141MiniKvV134EchoRequest: boolean;
  allowsNodeV305BeforeUpstreamEcho: false;
  allowsDisabledRuntimeShellImplementation: false;
  allowsDisabledRuntimeShellInvocation: false;
  allowsRealResolverImplementation: false;
  allowsSecretProviderInstantiation: false;
  allowsResolverClientInstantiation: false;
  allowsCredentialValueRead: false;
  allowsRawEndpointUrlParse: false;
  allowsExternalRequest: false;
  allowsManagedAuditConnection: false;
  allowsSchemaMigration: false;
  allowsApprovalLedgerWrite: false;
  allowsAutomaticUpstreamStart: false;
  prerequisiteCount: number;
  missingRuntimePrerequisiteCount: number;
  noGoConditionCount: number;
  requiredPrerequisites: RuntimeShellChainPrerequisite[];
  explicitNoGoConditions: RuntimeShellChainNoGoCondition[];
  necessityProof: RuntimeShellChainDecisionNecessityProof;
}

export interface RuntimeShellChainPrerequisite {
  id: string;
  label: string;
  currentEvidence: string;
  status: "documented-missing" | "documented-present";
  requiredBeforeRuntimeShell: true;
}

export interface RuntimeShellChainNoGoCondition {
  code: string;
  condition: string;
  action: "pause-and-do-not-implement-runtime-shell";
}

export interface RuntimeShellChainDecisionNecessityProof {
  blockerResolved: string;
  consumer: "Java v141 and mini-kv v134, then Node v305";
  whyV303CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
  proofComplete: true;
}

export type RuntimeShellChainStopOrPrerequisiteDecisionRecordChecks = {
  sourceNodeV303Loaded: boolean;
  sourceNodeV303Ready: boolean;
  sourceNodeV303UpstreamEchoAligned: boolean;
  sourceNodeV303KeepsRuntimeBlocked: boolean;
  sourceNodeV303KeepsSideEffectsClosed: boolean;
  decisionSelectsPrerequisiteGate: boolean;
  decisionRecordBlocksRuntimeShell: boolean;
  decisionRecordStillReadOnly: boolean;
  requiredPrerequisitesDocumented: boolean;
  missingRuntimePrerequisitesBlockImplementation: boolean;
  necessityProofComplete: boolean;
  parallelJavaV141MiniKvV134EchoRecommended: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord: boolean;
};

export interface RuntimeShellChainStopOrPrerequisiteDecisionRecordSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  prerequisiteCount: number;
  missingRuntimePrerequisiteCount: number;
  noGoConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeShellChainStopOrPrerequisiteDecisionRecordMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record"
    | "node-v303-post-decision-plan-intake-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
