import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks,
  EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review.v1";
  reviewState: "endpoint-handle-allowlist-approval-prerequisite-closure-review-ready" | "blocked";
  prerequisiteClosureDecision: "advance-endpoint-handle-allowlist-approval-only";
  readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview: boolean;
  readOnlyClosureReview: true;
  endpointHandleAllowlistApprovalPrerequisiteClosureReviewOnly: true;
  consumesNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerification: true;
  activeNodeReviewVersion: "Node v322";
  readyForNewJavaMiniKvEchoRequest: false;
  newJavaMiniKvEchoRequested: false;
  readyForNoNetworkSafetyFixtureContractIntake: true;
  nextNodeVersionSuggested: "Node v323";
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
  endpointHandleAllowlistApproved: false;
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
  sourceNodeV321: SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference;
  closureReview: EndpointHandleAllowlistApprovalPrerequisiteClosureReview;
  checks: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewChecks;
  summary: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewSummary;
  productionBlockers: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[];
  warnings: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[];
  recommendations: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[];
  evidenceEndpoints: {
    endpointHandleAllowlistApprovalPrerequisiteClosureReviewJson: string;
    endpointHandleAllowlistApprovalPrerequisiteClosureReviewMarkdown: string;
    sourceNodeV321Json: string;
    sourceNodeV321Markdown: string;
    activePlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference {
  sourceVersion: "Node v321";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification.v1";
  verificationState: "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready" | "blocked";
  readyForEndpointHandleAllowlistApprovalContractUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  verificationDigest: string;
  sourceSpan: "Node v320 + Java v147 + mini-kv v140";
  sourceNodeV320Ready: boolean;
  javaV147EchoReady: boolean;
  miniKvV140ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  endpointHandleAllowlistContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  remainingPrerequisitesAfterV321: Array<"endpoint-handle-allowlist-approval" | "no-network-safety-fixture" | "abort-rollback-semantics">;
  contractDigest: string;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceChecks: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks;
  sourceSummary: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationSummary;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  endpointHandleAllowlistApproved: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface EndpointHandleAllowlistApprovalClosurePrerequisite {
  id: HumanApprovalArtifactReviewPostEchoPrerequisiteId;
  label: string;
  closureState:
    | "completed-before-node-v322"
    | "contract-intake-and-upstream-echo-complete"
    | "still-missing";
  evidence: string;
  requiredBeforeRuntimeShell: boolean;
  opensRuntimeShell: false;
}

export interface EndpointHandleAllowlistApprovalPrerequisiteClosureReview {
  reviewDigest: string;
  reviewMode: "endpoint-handle-allowlist-approval-prerequisite-closure-review-only";
  sourceSpan: "Node v321";
  sourceVerificationDigest: string;
  completedPrerequisites: EndpointHandleAllowlistApprovalClosurePrerequisite[];
  remainingPrerequisites: EndpointHandleAllowlistApprovalClosurePrerequisite[];
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  movedPrerequisiteId: "endpoint-handle-allowlist-approval";
  movedFrom: "contract-intake-defined";
  movedTo: "contract-intake-and-upstream-echo-complete";
  nextConcretePrerequisiteId: "no-network-safety-fixture";
  nextConcretePrerequisiteContractRequired: true;
  nextNodeVersionSuggested: "Node v323";
  nextJavaVersionRequested: null;
  nextMiniKvVersionRequested: null;
  chainContinuationAllowed: true;
  runtimeShellStillBlocked: true;
  closureReason: string;
}

export type EndpointHandleAllowlistApprovalPrerequisiteClosureReviewChecks = {
  sourceNodeV321Ready: boolean;
  sourceNodeV321EchoAligned: boolean;
  sourceNodeV321KeepsRuntimeBlocked: boolean;
  sourceNodeV321KeepsSideEffectsClosed: boolean;
  endpointHandleAllowlistContractCanClose: boolean;
  endpointHandleAllowlistClosureDoesNotOpenRuntime: boolean;
  exactlyFourPrerequisitesCompleted: boolean;
  twoPrerequisitesRemainMissing: boolean;
  nextConcretePrerequisiteIsNoNetworkSafetyFixture: boolean;
  noNewJavaMiniKvEchoRequested: boolean;
  closureReviewStillReadOnly: boolean;
  runtimeShellStillBlocked: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview: boolean;
};

export interface EndpointHandleAllowlistApprovalPrerequisiteClosureReviewSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV321CheckCount: number;
  sourceNodeV321PassedCheckCount: number;
  originalPrerequisiteCount: number;
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review"
    | "node-v321-endpoint-handle-allowlist-approval-contract-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
