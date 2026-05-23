import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  CredentialHandleApprovalContractUpstreamEchoVerificationChecks,
  CredentialHandleApprovalContractUpstreamEchoVerificationSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review.v1";
  reviewState: "credential-handle-approval-prerequisite-closure-review-ready" | "blocked";
  prerequisiteClosureDecision: "advance-credential-handle-approval-only";
  readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview: boolean;
  readOnlyClosureReview: true;
  credentialHandleApprovalPrerequisiteClosureReviewOnly: true;
  consumesNodeV318CredentialHandleApprovalContractUpstreamEchoVerification: true;
  activeNodeReviewVersion: "Node v319";
  readyForNewJavaMiniKvEchoRequest: false;
  newJavaMiniKvEchoRequested: false;
  readyForEndpointHandleAllowlistContractIntake: true;
  nextNodeVersionSuggested: "Node v320";
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
  sourceNodeV318: SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference;
  closureReview: CredentialHandleApprovalPrerequisiteClosureReview;
  checks: CredentialHandleApprovalPrerequisiteClosureReviewChecks;
  summary: CredentialHandleApprovalPrerequisiteClosureReviewSummary;
  productionBlockers: CredentialHandleApprovalPrerequisiteClosureReviewMessage[];
  warnings: CredentialHandleApprovalPrerequisiteClosureReviewMessage[];
  recommendations: CredentialHandleApprovalPrerequisiteClosureReviewMessage[];
  evidenceEndpoints: {
    credentialHandleApprovalPrerequisiteClosureReviewJson: string;
    credentialHandleApprovalPrerequisiteClosureReviewMarkdown: string;
    sourceNodeV318Json: string;
    sourceNodeV318Markdown: string;
    activePlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference {
  sourceVersion: "Node v318";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification.v1";
  verificationState: "credential-handle-approval-contract-upstream-echo-verification-ready" | "blocked";
  readyForCredentialHandleApprovalContractUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  verificationDigest: string;
  sourceSpan: "Node v317 + Java v146 + mini-kv v139";
  sourceNodeV317Ready: boolean;
  javaV146EchoReady: boolean;
  miniKvV139ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  credentialHandleContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
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
  sourceChecks: CredentialHandleApprovalContractUpstreamEchoVerificationChecks;
  sourceSummary: CredentialHandleApprovalContractUpstreamEchoVerificationSummary;
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

export interface CredentialHandleApprovalClosurePrerequisite {
  id: HumanApprovalArtifactReviewPostEchoPrerequisiteId;
  label: string;
  closureState:
    | "completed-before-node-v319"
    | "contract-intake-and-upstream-echo-complete"
    | "still-missing";
  evidence: string;
  requiredBeforeRuntimeShell: boolean;
  opensRuntimeShell: false;
}

export interface CredentialHandleApprovalPrerequisiteClosureReview {
  reviewDigest: string;
  reviewMode: "credential-handle-approval-prerequisite-closure-review-only";
  sourceSpan: "Node v318";
  sourceVerificationDigest: string;
  completedPrerequisites: CredentialHandleApprovalClosurePrerequisite[];
  remainingPrerequisites: CredentialHandleApprovalClosurePrerequisite[];
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  movedPrerequisiteId: "credential-handle-approval";
  movedFrom: "contract-intake-defined";
  movedTo: "contract-intake-and-upstream-echo-complete";
  nextConcretePrerequisiteId: "endpoint-handle-allowlist-approval";
  nextConcretePrerequisiteContractRequired: true;
  nextNodeVersionSuggested: "Node v320";
  nextJavaVersionRequested: null;
  nextMiniKvVersionRequested: null;
  chainContinuationAllowed: true;
  runtimeShellStillBlocked: true;
  closureReason: string;
}

export type CredentialHandleApprovalPrerequisiteClosureReviewChecks = {
  sourceNodeV318Ready: boolean;
  sourceNodeV318EchoAligned: boolean;
  sourceNodeV318KeepsRuntimeBlocked: boolean;
  sourceNodeV318KeepsSideEffectsClosed: boolean;
  credentialHandleContractCanClose: boolean;
  credentialHandleClosureDoesNotOpenRuntime: boolean;
  exactlyThreePrerequisitesCompleted: boolean;
  threePrerequisitesRemainMissing: boolean;
  nextConcretePrerequisiteIsEndpointHandleAllowlist: boolean;
  noNewJavaMiniKvEchoRequested: boolean;
  closureReviewStillReadOnly: boolean;
  runtimeShellStillBlocked: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview: boolean;
};

export interface CredentialHandleApprovalPrerequisiteClosureReviewSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV318CheckCount: number;
  sourceNodeV318PassedCheckCount: number;
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

export interface CredentialHandleApprovalPrerequisiteClosureReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review"
    | "node-v318-credential-handle-approval-contract-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
