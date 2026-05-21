import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  DisabledRuntimeShellImplementationCandidateGateCode,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification.v1";
  verificationState: "runtime-shell-candidate-gate-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  runtimeShellCandidateGateUpstreamEchoVerificationOnly: true;
  consumesNodeV297DisabledRuntimeShellImplementationCandidateGate: true;
  consumesJavaV134RuntimeShellCandidateGateEcho: true;
  consumesMiniKvV131RuntimeShellCandidateGateNonParticipationReceipt: true;
  readyForNodeV299RuntimeShellCandidateGateDecisionRecord: boolean;
  readyForNodeV299RuntimeShellImplementation: false;
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
  sourceNodeV297: SourceNodeV297RuntimeShellCandidateGateReference;
  upstreamEvidence: {
    javaV134: JavaV134RuntimeShellCandidateGateEchoReference;
    miniKvV131: MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference;
  };
  echoVerification: RuntimeShellCandidateGateUpstreamEchoVerification;
  checks: RuntimeShellCandidateGateUpstreamEchoVerificationChecks;
  summary: RuntimeShellCandidateGateUpstreamEchoVerificationSummary;
  productionBlockers: RuntimeShellCandidateGateUpstreamEchoVerificationMessage[];
  warnings: RuntimeShellCandidateGateUpstreamEchoVerificationMessage[];
  recommendations: RuntimeShellCandidateGateUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    runtimeShellCandidateGateUpstreamEchoVerificationJson: string;
    runtimeShellCandidateGateUpstreamEchoVerificationMarkdown: string;
    sourceNodeV297Json: string;
    sourceNodeV297Markdown: string;
    javaV134Support: string;
    javaV134Test: string;
    javaV134Walkthrough: string;
    miniKvV131Receipt: string;
    miniKvV131Runbook: string;
    miniKvV131Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV297RuntimeShellCandidateGateReference {
  sourceVersion: "Node v297";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile["profileVersion"];
  candidateGateState: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile["candidateGateState"];
  readyForCandidateGate: boolean;
  readOnlyCandidateGate: true;
  implementationCandidateGateOnly: true;
  readyForParallelJavaV134MiniKvV131EchoRequest: boolean;
  readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: false;
  readyForNodeV298RuntimeShellImplementation: false;
  gateVersion: "node-v297-disabled-runtime-shell-implementation-candidate-gate.v1";
  gateMode: "candidate-gate-only-default-blocked";
  gateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation";
  gateDigest: string;
  requiredGateCount: number;
  documentedGateCount: number;
  reviewEvidenceSatisfiedCount: number;
  runtimePrerequisiteSatisfiedCount: number;
  implementationAllowedGateCount: number;
  requiredGateCodes: DisabledRuntimeShellImplementationCandidateGateCode[];
  necessityConsumer: "Java v134 and mini-kv v131, then Node v298";
  stopConditionCount: number;
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
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface JavaV134RuntimeShellCandidateGateEchoReference {
  sourceVersion: "Java v134";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: readonly HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  candidateGateEchoPresent: boolean;
  readyForNodeV298: boolean;
  candidateGateEchoMode: "java-v134-credential-resolver-disabled-runtime-shell-candidate-gate-echo-only" | "missing";
  consumedNodeV297: boolean;
  gateDecisionEchoed: boolean;
  fiveGateSetEchoed: boolean;
  necessityEchoed: boolean;
  noRuntimeImplementation: boolean;
  noRuntimeInvocation: boolean;
  credentialValueBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  providerClientBoundaryClosed: boolean;
  connectionBoundaryClosed: boolean;
  ledgerSqlSchemaBoundaryClosed: boolean;
  automaticUpstreamStartBlocked: boolean;
}

export interface MiniKvV131RuntimeShellCandidateGateNonParticipationReceiptReference {
  sourceVersion: "mini-kv v131";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: readonly HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  nodeV297ProfileVersion: string | null;
  nodeV297GateDecision: string | null;
  nodeV297GateDigest: string | null;
  requiredGateCount: number | null;
  documentedGateCount: number | null;
  reviewEvidenceSatisfiedCount: number | null;
  runtimePrerequisiteSatisfiedCount: number | null;
  implementationAllowedGateCount: number | null;
  sourceNodeV296Ready: boolean | null;
  readyForNodeV298: boolean | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  runtimeShellImplemented: boolean | null;
  runtimeShellInvocationAllowed: boolean | null;
  disabledRuntimeShellParticipates: boolean | null;
  credentialValueRead: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  externalRequestSent: boolean | null;
  connectsManagedAudit: boolean | null;
  providerClientInstantiationAllowed: boolean | null;
  storageWriteAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  schemaMigrationExecuted: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  automaticUpstreamStart: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
  productionBlockerCount: number | null;
}

export interface RuntimeShellCandidateGateUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "node-v297-plus-java-v134-plus-mini-kv-v131-runtime-shell-candidate-gate-upstream-echo-verification-only";
  sourceSpan: "Node v297 + Java v134 + mini-kv v131";
  sourceNodeV297Ready: boolean;
  javaV134EchoReady: boolean;
  miniKvV131ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  fiveGateSetAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  readyForNodeV299RuntimeShellCandidateGateDecisionRecord: boolean;
  readyForRuntimeShellImplementation: false;
}

export type RuntimeShellCandidateGateUpstreamEchoVerificationChecks = {
  sourceNodeV297Ready: boolean;
  sourceNodeV297KeepsImplementationBlocked: boolean;
  sourceNodeV297KeepsSideEffectsClosed: boolean;
  javaV134EvidencePresent: boolean;
  javaV134CandidateGateEchoReady: boolean;
  miniKvV131EvidencePresent: boolean;
  miniKvV131NonParticipationReceiptReady: boolean;
  upstreamEchoConsumerAligned: boolean;
  nodeJavaMiniKvGateDecisionAligned: boolean;
  candidateGateCountAligned: boolean;
  candidateGateDigestAnchored: boolean;
  runtimeShellImplementationStillForbidden: boolean;
  runtimeShellInvocationStillForbidden: boolean;
  credentialBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  providerClientBoundaryClosed: boolean;
  connectionBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  loadCompactRestoreSetnxexStillBlocked: boolean;
  autoStartBoundaryClosed: boolean;
  auditAndOrderAuthorityForbidden: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateUpstreamEchoVerification: boolean;
};

export interface RuntimeShellCandidateGateUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  evidenceFileCount: number;
  matchedSnippetCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  requiredGateCount: number;
  documentedGateCount: number;
  reviewEvidenceSatisfiedCount: number;
  runtimePrerequisiteSatisfiedCount: number;
  implementationAllowedGateCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeShellCandidateGateUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-upstream-echo-verification"
    | "node-v297-disabled-runtime-shell-implementation-candidate-gate"
    | "java-v134-runtime-shell-candidate-gate-echo"
    | "mini-kv-v131-runtime-shell-candidate-gate-non-participation-receipt"
    | "runtime-config";
  message: string;
}
