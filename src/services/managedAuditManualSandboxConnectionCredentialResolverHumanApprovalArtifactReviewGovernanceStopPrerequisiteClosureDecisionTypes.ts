import type {
  HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks,
  HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision.v1";
  decisionState: "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready" | "blocked";
  governanceChainDecision: "pause-governance-chain-until-concrete-prerequisite-artifacts-exist";
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision: boolean;
  readOnlyClosureDecision: true;
  humanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionOnly: true;
  consumesNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification: true;
  activeNodeDecisionVersion: "Node v312";
  readyForNewJavaMiniKvEchoRequest: false;
  newJavaMiniKvEchoRequested: false;
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
  sourceNodeV311: SourceNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationReference;
  closureDecision: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision;
  checks: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionChecks;
  summary: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionSummary;
  productionBlockers: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[];
  warnings: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[];
  recommendations: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage[];
  evidenceEndpoints: {
    humanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionJson: string;
    humanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMarkdown: string;
    sourceNodeV311Json: string;
    sourceNodeV311Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV311HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationReference {
  sourceVersion: "Node v311";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-upstream-echo-verification.v1";
  verificationState: "human-approval-artifact-review-post-echo-decision-upstream-echo-verification-ready" | "blocked";
  readyForPostEchoDecisionUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  verificationDigest: string;
  sourceSpan: "Node v310 + Java v144 + mini-kv v137";
  upstreamEchoAligned: boolean;
  decisionGateContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  originalPrerequisiteCount: number;
  originalMissingPrerequisiteCount: number;
  noGoConditionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceChecks: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationChecks;
  sourceSummary: HumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerificationSummary;
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

export interface HumanApprovalArtifactReviewGovernanceStopPrerequisite {
  id:
    | "signed-human-approval-artifact"
    | "credential-handle-approval"
    | "endpoint-handle-allowlist-approval"
    | "no-network-safety-fixture"
    | "abort-rollback-semantics"
    | "java-mini-kv-decision-echo";
  label: string;
  closureState: "completed-by-node-v311" | "still-missing";
  evidence: string;
  requiredBeforeRuntimeShell: boolean;
  opensRuntimeShell: false;
}

export interface HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision {
  decisionDigest: string;
  decisionMode: "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-only";
  sourceSpan: "Node v311";
  sourceVerificationDigest: string;
  completedPrerequisites: HumanApprovalArtifactReviewGovernanceStopPrerequisite[];
  remainingPrerequisites: HumanApprovalArtifactReviewGovernanceStopPrerequisite[];
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  noGoConditionCount: number;
  chainContinuationAllowed: false;
  nextConcretePrerequisiteContractRequired: true;
  nextJavaVersionRequested: null;
  nextMiniKvVersionRequested: null;
  nextNodeVersionSuggested: null;
  pauseReason: string;
}

export type HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionChecks = {
  sourceNodeV311Ready: boolean;
  sourceNodeV311AlignedWithJavaMiniKv: boolean;
  sourceNodeV311KeepsRuntimeBlocked: boolean;
  sourceNodeV311KeepsSideEffectsClosed: boolean;
  javaMiniKvDecisionEchoClosed: boolean;
  exactlyOnePrerequisiteClosed: boolean;
  fivePrerequisitesRemainMissing: boolean;
  noNewJavaMiniKvEchoRequested: boolean;
  chainPausedWithoutConcretePrerequisite: boolean;
  closureDecisionStillReadOnly: boolean;
  runtimeShellStillBlocked: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision: boolean;
};

export interface HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV311CheckCount: number;
  sourceNodeV311PassedCheckCount: number;
  originalPrerequisiteCount: number;
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  noGoConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision"
    | "node-v311-human-approval-artifact-review-post-echo-decision-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
