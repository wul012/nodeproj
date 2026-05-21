import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationTypes.js";

export type DisabledRuntimeShellImplementationCandidateGateCode =
  | "DEDICATED_DISABLED_BY_DEFAULT_FLAG"
  | "OPERATOR_APPROVAL"
  | "ABORT_SEMANTICS"
  | "NO_NETWORK_TESTS"
  | "HISTORICAL_FALLBACK_EVIDENCE";

export interface ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate.v1";
  candidateGateState: "disabled-runtime-shell-implementation-candidate-gate-reviewed" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate: boolean;
  readOnlyCandidateGate: true;
  implementationCandidateGateOnly: true;
  consumesNodeV296DisabledRuntimeShellUpstreamEchoVerification: true;
  readyForParallelJavaV134MiniKvV131EchoRequest: boolean;
  readyForNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: false;
  readyForNodeV298RuntimeShellImplementation: false;
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
  sourceNodeV296: SourceNodeV296DisabledRuntimeShellUpstreamEchoVerificationReference;
  candidateGate: DisabledRuntimeShellImplementationCandidateGate;
  checks: DisabledRuntimeShellImplementationCandidateGateChecks;
  summary: DisabledRuntimeShellImplementationCandidateGateSummary;
  productionBlockers: DisabledRuntimeShellImplementationCandidateGateMessage[];
  warnings: DisabledRuntimeShellImplementationCandidateGateMessage[];
  recommendations: DisabledRuntimeShellImplementationCandidateGateMessage[];
  evidenceEndpoints: {
    disabledRuntimeShellImplementationCandidateGateJson: string;
    disabledRuntimeShellImplementationCandidateGateMarkdown: string;
    sourceNodeV296Json: string;
    sourceNodeV296Markdown: string;
    activePlan: string;
    recommendedParallelJavaV134: string;
    recommendedParallelMiniKvV131: string;
  };
  nextActions: string[];
}

export interface SourceNodeV296DisabledRuntimeShellUpstreamEchoVerificationReference {
  sourceVersion: "Node v296";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationProfile["verificationState"];
  readyForUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  disabledRuntimeShellUpstreamEchoVerificationOnly: true;
  consumesJavaV133: true;
  consumesMiniKvV130: true;
  planVersionCorrectionApplied: true;
  plannedJavaVersion: "Java v132";
  actualJavaEchoVersion: "Java v133";
  readyForNodeV297CandidateGate: boolean;
  readyForNodeV297RuntimeShellImplementation: false;
  verificationDigest: string;
  sourceSpan: "Node v295 + Java v133 + mini-kv v130";
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  runtimeShellImplemented: false;
  runtimeShellEnabled: false;
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

export interface DisabledRuntimeShellImplementationCandidateGate {
  gateDigest: string;
  gateVersion: "node-v297-disabled-runtime-shell-implementation-candidate-gate.v1";
  gateMode: "candidate-gate-only-default-blocked";
  sourceSpan: "Node v296";
  gateDecision: "blocked-request-parallel-java-v134-and-mini-kv-v131-before-implementation";
  decisionRationale: string;
  necessity: DisabledRuntimeShellImplementationCandidateGateNecessity;
  requiredGates: DisabledRuntimeShellImplementationCandidateGateItem[];
  requiredGateCount: number;
  documentedGateCount: number;
  reviewEvidenceSatisfiedCount: number;
  runtimePrerequisiteSatisfiedCount: number;
  implementationAllowedGateCount: number;
  stopConditions: readonly string[];
}

export interface DisabledRuntimeShellImplementationCandidateGateNecessity {
  blocker: "candidate-gate-lacks-upstream-echo-and-runtime-prerequisite-proof";
  consumer: "Java v134 and mini-kv v131, then Node v298";
  cannotReuseExistingReportReason: string;
  stopCondition: string;
}

export interface DisabledRuntimeShellImplementationCandidateGateItem {
  code: DisabledRuntimeShellImplementationCandidateGateCode;
  title: string;
  owner: "node" | "operator" | "test" | "release";
  requirement: string;
  sourceEvidence: string;
  documentedForGateReview: true;
  reviewEvidenceSatisfied: boolean;
  runtimePrerequisiteSatisfied: false;
  implementationAllowed: false;
  failureClass: string;
}

export type DisabledRuntimeShellImplementationCandidateGateChecks = {
  sourceNodeV296Ready: boolean;
  sourceNodeV296KeepsImplementationBlocked: boolean;
  sourceNodeV296KeepsSideEffectsClosed: boolean;
  candidateGateCountStable: boolean;
  allCandidateGatesDocumented: boolean;
  allCandidateGatesReviewEvidenceSatisfied: boolean;
  candidateGateKeepsRuntimeBlocked: boolean;
  dedicatedDisabledByDefaultFlagRequired: boolean;
  operatorApprovalRequired: boolean;
  abortSemanticsRequired: boolean;
  noNetworkTestsRequired: boolean;
  historicalFallbackEvidenceRequired: boolean;
  necessityDocumented: boolean;
  parallelUpstreamEchoRecommended: boolean;
  noRuntimeImplementationCreated: boolean;
  noRuntimeInvocationAllowed: boolean;
  credentialBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  providerClientBoundaryClosed: boolean;
  connectionBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  autoStartBoundaryClosed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellImplementationCandidateGate: boolean;
};

export interface DisabledRuntimeShellImplementationCandidateGateSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  requiredGateCount: number;
  documentedGateCount: number;
  reviewEvidenceSatisfiedCount: number;
  runtimePrerequisiteSatisfiedCount: number;
  implementationAllowedGateCount: number;
  stopConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface DisabledRuntimeShellImplementationCandidateGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-implementation-candidate-gate"
    | "node-v296-disabled-runtime-shell-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
