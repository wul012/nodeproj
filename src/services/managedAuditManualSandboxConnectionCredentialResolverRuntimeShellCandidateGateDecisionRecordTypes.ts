import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record.v1";
  decisionRecordState: "runtime-shell-candidate-gate-decision-record-ready" | "blocked";
  runtimeShellDecision: "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord: boolean;
  readOnlyDecisionRecord: true;
  runtimeShellCandidateGateDecisionRecordOnly: true;
  consumesNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: true;
  readyForParallelJavaV135MiniKvV132EchoRequest: boolean;
  readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: false;
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
  testOnlyFakeHarnessAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
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
  sourceNodeV298: SourceNodeV298RuntimeShellCandidateGateUpstreamEchoVerificationReference;
  decisionRecord: RuntimeShellCandidateGateDecisionRecord;
  checks: RuntimeShellCandidateGateDecisionRecordChecks;
  summary: RuntimeShellCandidateGateDecisionRecordSummary;
  productionBlockers: RuntimeShellCandidateGateDecisionRecordMessage[];
  warnings: RuntimeShellCandidateGateDecisionRecordMessage[];
  recommendations: RuntimeShellCandidateGateDecisionRecordMessage[];
  evidenceEndpoints: {
    runtimeShellCandidateGateDecisionRecordJson: string;
    runtimeShellCandidateGateDecisionRecordMarkdown: string;
    sourceNodeV298Json: string;
    sourceNodeV298Markdown: string;
    activePlan: string;
    recommendedParallelJavaV135: string;
    recommendedParallelMiniKvV132: string;
  };
  nextActions: string[];
}

export interface SourceNodeV298RuntimeShellCandidateGateUpstreamEchoVerificationReference {
  sourceVersion: "Node v298";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationProfile["verificationState"];
  readyForUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  runtimeShellCandidateGateUpstreamEchoVerificationOnly: true;
  consumesJavaV134RuntimeShellCandidateGateEcho: true;
  consumesMiniKvV131RuntimeShellCandidateGateNonParticipationReceipt: true;
  readyForNodeV299RuntimeShellCandidateGateDecisionRecord: boolean;
  readyForNodeV299RuntimeShellImplementation: false;
  verificationDigest: string;
  sourceSpan: "Node v297 + Java v134 + mini-kv v131";
  sourceNodeV297Ready: boolean;
  javaV134EchoReady: boolean;
  miniKvV131ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  fiveGateSetAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  javaV134EvidencePresent: boolean;
  javaV134VerificationDocumented: boolean;
  javaV134FirstEvidenceResolvedPath: string | null;
  miniKvV131EvidencePresent: boolean;
  miniKvV131VerificationDocumented: boolean;
  miniKvV131FirstEvidenceResolvedPath: string | null;
  checkCount: number;
  passedCheckCount: number;
  requiredGateCount: number;
  documentedGateCount: number;
  reviewEvidenceSatisfiedCount: number;
  runtimePrerequisiteSatisfiedCount: number;
  implementationAllowedGateCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  runtimeShellImplemented: false;
  runtimeShellEnabled: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
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
}

export interface RuntimeShellCandidateGateDecisionRecord {
  decisionDigest: string;
  recordMode: "runtime-shell-candidate-gate-decision-record-only";
  decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell";
  sourceSpan: "Node v297-v298 + Java v134 + mini-kv v131";
  decision: "blocked";
  decisionReason: string;
  upstreamEchoVerified: boolean;
  allowsParallelJavaV135MiniKvV132EchoRequest: boolean;
  allowsNodeV300BeforeUpstreamEcho: false;
  allowsDisabledRuntimeShellImplementation: false;
  allowsDisabledRuntimeShellInvocation: false;
  allowsRealResolverImplementation: false;
  allowsFakeHarnessRuntimeImplementation: false;
  allowsSecretProviderInstantiation: false;
  allowsResolverClientInstantiation: false;
  allowsCredentialValueRead: false;
  allowsRawEndpointUrlParse: false;
  allowsExternalRequest: false;
  allowsManagedAuditConnection: false;
  allowsSchemaMigration: false;
  allowsApprovalLedgerWrite: false;
  allowsAutomaticUpstreamStart: false;
  requiredEvidenceCount: number;
  noGoConditionCount: number;
  requiredEvidence: RuntimeShellCandidateGateDecisionRequirement[];
  explicitNoGoConditions: RuntimeShellCandidateGateDecisionNoGoCondition[];
}

export interface RuntimeShellCandidateGateDecisionRequirement {
  id: string;
  label: string;
  currentEvidence: string;
  status: "present" | "missing";
  requiredBeforeRuntimeShell: true;
}

export interface RuntimeShellCandidateGateDecisionNoGoCondition {
  code: string;
  condition: string;
  action: "pause-and-do-not-implement-runtime-shell";
}

export type RuntimeShellCandidateGateDecisionRecordChecks = {
  sourceNodeV298Loaded: boolean;
  sourceNodeV298Ready: boolean;
  sourceNodeV298VerifiedUpstreamEchoes: boolean;
  sourceNodeV298KeepsRuntimeBlocked: boolean;
  sourceNodeV298KeepsSideEffectsClosed: boolean;
  candidateGateDecisionBlocked: boolean;
  decisionRecordBlocksRuntimeShell: boolean;
  decisionRecordStillReadOnly: boolean;
  parallelJavaV135MiniKvV132EchoRecommended: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord: boolean;
};

export interface RuntimeShellCandidateGateDecisionRecordSummary {
  checkCount: number;
  passedCheckCount: number;
  requiredEvidenceCount: number;
  missingRequiredEvidenceCount: number;
  noGoConditionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeShellCandidateGateDecisionRecordMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record"
    | "node-v298-runtime-shell-candidate-gate-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
