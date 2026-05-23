import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  SignedHumanApprovalArtifactPrerequisiteClosureReviewChecks,
  SignedHumanApprovalArtifactPrerequisiteClosureReviewSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake.v1";
  contractState: "credential-handle-approval-contract-intake-ready" | "blocked";
  governanceChainDecision: "continue-only-for-credential-handle-approval-contract-intake";
  readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake: boolean;
  credentialHandleApprovalContractIntakeOnly: true;
  readOnlyCredentialHandleApprovalContract: true;
  consumesNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReview: true;
  consumesNodeV313PrerequisiteCatalog: true;
  activeNodeContractVersion: "Node v317";
  targetPrerequisiteId: "credential-handle-approval";
  nextJavaVersion: "Java v146";
  nextMiniKvVersion: "mini-kv v139";
  nextNodeVerificationVersion: "Node v318";
  readyForParallelJavaV146MiniKvV139Echo: boolean;
  readyForNodeV318BeforeUpstreamEcho: false;
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
  credentialHandleApproved: false;
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
  sourceNodeV316: SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference;
  credentialHandleApprovalContract: CredentialHandleApprovalContract;
  prerequisiteTransition: CredentialHandleApprovalPrerequisiteTransition;
  necessityProof: CredentialHandleApprovalContractNecessityProof;
  checks: CredentialHandleApprovalContractIntakeChecks;
  summary: CredentialHandleApprovalContractIntakeSummary;
  productionBlockers: CredentialHandleApprovalContractIntakeMessage[];
  warnings: CredentialHandleApprovalContractIntakeMessage[];
  recommendations: CredentialHandleApprovalContractIntakeMessage[];
  evidenceEndpoints: {
    credentialHandleApprovalContractIntakeJson: string;
    credentialHandleApprovalContractIntakeMarkdown: string;
    sourceNodeV316Json: string;
    sourceNodeV316Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference {
  sourceVersion: "Node v316";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review.v1";
  reviewState: "signed-human-approval-artifact-prerequisite-closure-review-ready" | "blocked";
  readyForSignedHumanApprovalArtifactPrerequisiteClosureReview: boolean;
  reviewDigest: string;
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  nextConcretePrerequisiteId: "credential-handle-approval";
  nextConcretePrerequisiteContractRequired: true;
  nextNodeVersionSuggested: "Node v317";
  chainContinuationAllowed: true;
  runtimeShellStillBlocked: true;
  completedPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  remainingPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceChecks: SignedHumanApprovalArtifactPrerequisiteClosureReviewChecks;
  sourceSummary: SignedHumanApprovalArtifactPrerequisiteClosureReviewSummary;
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

export interface CredentialHandleApprovalContract {
  contractDigest: string;
  contractName: "managed-audit-credential-handle-approval";
  contractVersion: "credential-handle-approval.v1";
  contractMode: "credential-handle-approval-contract-intake-only";
  sourceSpan: "Node v316 closure review + Node v313 catalog";
  targetPrerequisiteId: "credential-handle-approval";
  purpose: string;
  requiredFields: CredentialHandleApprovalRequiredField[];
  prohibitedFields: CredentialHandleApprovalProhibitedField[];
  rejectionReasons: CredentialHandleApprovalRejectionReason[];
  noGoBoundaries: CredentialHandleApprovalNoGoBoundary[];
  upstreamEchoRequests: CredentialHandleApprovalUpstreamEchoRequest[];
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  implementationStillBlocked: true;
}

export interface CredentialHandleApprovalRequiredField {
  id:
    | "credential_handle"
    | "approval_correlation_id"
    | "operator_identity_handle"
    | "reviewer_identity_handle"
    | "policy_version"
    | "approval_status"
    | "issued_at"
    | "expires_at"
    | "revocation_marker"
    | "audit_digest";
  label: string;
  required: true;
  acceptedShape: string;
  purpose: string;
}

export interface CredentialHandleApprovalProhibitedField {
  id: string;
  reason: string;
  rejectionCode: string;
}

export interface CredentialHandleApprovalRejectionReason {
  code: string;
  source:
    | "credential-handle-contract"
    | "credential-boundary"
    | "endpoint-boundary"
    | "provider-client-boundary"
    | "write-boundary";
  message: string;
}

export interface CredentialHandleApprovalNoGoBoundary {
  id: string;
  allowed: false;
  message: string;
}

export interface CredentialHandleApprovalUpstreamEchoRequest {
  project: "java" | "mini-kv";
  version: "Java v146" | "mini-kv v139";
  requestedEcho: string;
  canRunInParallel: true;
  mustRemainReadOnly: true;
}

export interface CredentialHandleApprovalPrerequisiteTransition {
  prerequisiteId: "credential-handle-approval";
  catalogLabel: string;
  beforeV317: "still-missing";
  afterV317: "contract-intake-defined";
  closureRequiresUpstreamEcho: true;
  completedPrerequisiteCountBeforeV317: 2;
  remainingPrerequisiteCountBeforeV317: 4;
  preservesSignedHumanApprovalArtifactClosure: true;
  closesEndpointHandleAllowlistApproval: false;
  closesNoNetworkSafetyFixture: false;
  closesAbortRollbackSemantics: false;
}

export interface CredentialHandleApprovalContractNecessityProof {
  proofComplete: true;
  blockerResolved: string;
  consumer: "Java v146 + mini-kv v139, then Node v318";
  whyV316CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
}

export type CredentialHandleApprovalContractIntakeChecks = {
  sourceNodeV316Ready: boolean;
  sourceNodeV316PointsToCredentialHandle: boolean;
  sourceNodeV316KeepsRuntimeBlocked: boolean;
  sourceNodeV316KeepsSideEffectsClosed: boolean;
  credentialHandleApprovalStillMissingInSource: boolean;
  catalogTargetMatchesCredentialHandle: boolean;
  contractRequiredFieldsDocumented: boolean;
  contractProhibitedFieldsDocumented: boolean;
  rejectionReasonsDocumented: boolean;
  noGoBoundariesClosed: boolean;
  prerequisiteTransitionScopedToCredentialHandle: boolean;
  necessityProofDocumented: boolean;
  javaMiniKvEchoRequestExplicitlyParallel: boolean;
  contractStaysNonSecret: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  runtimeShellImplementationStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake: boolean;
};

export interface CredentialHandleApprovalContractIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV316CheckCount: number;
  sourceNodeV316PassedCheckCount: number;
  sourceCompletedPrerequisiteCount: number;
  sourceRemainingPrerequisiteCount: number;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface CredentialHandleApprovalContractIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake"
    | "node-v316-signed-human-approval-artifact-prerequisite-closure-review"
    | "credential-handle-approval-contract"
    | "runtime-config";
  message: string;
}
