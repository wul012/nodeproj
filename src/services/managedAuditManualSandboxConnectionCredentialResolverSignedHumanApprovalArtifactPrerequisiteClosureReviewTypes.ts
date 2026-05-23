import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks,
  SignedHumanApprovalArtifactContractUpstreamEchoVerificationSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review.v1";
  reviewState: "signed-human-approval-artifact-prerequisite-closure-review-ready" | "blocked";
  prerequisiteClosureDecision: "advance-signed-human-approval-artifact-only";
  readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview: boolean;
  readOnlyClosureReview: true;
  signedHumanApprovalArtifactPrerequisiteClosureReviewOnly: true;
  consumesNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerification: true;
  activeNodeReviewVersion: "Node v316";
  readyForNewJavaMiniKvEchoRequest: false;
  newJavaMiniKvEchoRequested: false;
  readyForCredentialHandleContractIntake: true;
  nextNodeVersionSuggested: "Node v317";
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
  sourceNodeV315: SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference;
  closureReview: SignedHumanApprovalArtifactPrerequisiteClosureReview;
  checks: SignedHumanApprovalArtifactPrerequisiteClosureReviewChecks;
  summary: SignedHumanApprovalArtifactPrerequisiteClosureReviewSummary;
  productionBlockers: SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[];
  warnings: SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[];
  recommendations: SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[];
  evidenceEndpoints: {
    signedHumanApprovalArtifactPrerequisiteClosureReviewJson: string;
    signedHumanApprovalArtifactPrerequisiteClosureReviewMarkdown: string;
    sourceNodeV315Json: string;
    sourceNodeV315Markdown: string;
    activePlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference {
  sourceVersion: "Node v315";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1";
  verificationState: "signed-human-approval-artifact-contract-upstream-echo-verification-ready" | "blocked";
  readyForSignedHumanApprovalArtifactContractUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  verificationDigest: string;
  sourceSpan: "Node v314 + Java v145 + mini-kv v138";
  sourceNodeV314Ready: boolean;
  javaV145EchoReady: boolean;
  miniKvV138ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  artifactContractAligned: boolean;
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
  sourceChecks: SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks;
  sourceSummary: SignedHumanApprovalArtifactContractUpstreamEchoVerificationSummary;
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

export interface SignedHumanApprovalArtifactClosurePrerequisite {
  id: HumanApprovalArtifactReviewPostEchoPrerequisiteId;
  label: string;
  closureState:
    | "completed-before-node-v316"
    | "contract-intake-and-upstream-echo-complete"
    | "still-missing";
  evidence: string;
  requiredBeforeRuntimeShell: boolean;
  opensRuntimeShell: false;
}

export interface SignedHumanApprovalArtifactPrerequisiteClosureReview {
  reviewDigest: string;
  reviewMode: "signed-human-approval-artifact-prerequisite-closure-review-only";
  sourceSpan: "Node v315";
  sourceVerificationDigest: string;
  completedPrerequisites: SignedHumanApprovalArtifactClosurePrerequisite[];
  remainingPrerequisites: SignedHumanApprovalArtifactClosurePrerequisite[];
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  movedPrerequisiteId: "signed-human-approval-artifact";
  movedFrom: "contract-intake-defined";
  movedTo: "contract-intake-and-upstream-echo-complete";
  nextConcretePrerequisiteId: "credential-handle-approval";
  nextConcretePrerequisiteContractRequired: true;
  nextNodeVersionSuggested: "Node v317";
  nextJavaVersionRequested: null;
  nextMiniKvVersionRequested: null;
  chainContinuationAllowed: true;
  runtimeShellStillBlocked: true;
  closureReason: string;
}

export type SignedHumanApprovalArtifactPrerequisiteClosureReviewChecks = {
  sourceNodeV315Ready: boolean;
  sourceNodeV315EchoAligned: boolean;
  sourceNodeV315KeepsRuntimeBlocked: boolean;
  sourceNodeV315KeepsSideEffectsClosed: boolean;
  signedArtifactContractCanClose: boolean;
  signedArtifactClosureDoesNotOpenRuntime: boolean;
  exactlyTwoPrerequisitesCompleted: boolean;
  fourPrerequisitesRemainMissing: boolean;
  nextConcretePrerequisiteIsCredentialHandle: boolean;
  noNewJavaMiniKvEchoRequested: boolean;
  closureReviewStillReadOnly: boolean;
  runtimeShellStillBlocked: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview: boolean;
};

export interface SignedHumanApprovalArtifactPrerequisiteClosureReviewSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV315CheckCount: number;
  sourceNodeV315PassedCheckCount: number;
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

export interface SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review"
    | "node-v315-signed-human-approval-artifact-contract-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
