import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  CredentialHandleApprovalPrerequisiteClosureReviewChecks,
  CredentialHandleApprovalPrerequisiteClosureReviewSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake.v1";
  contractState: "endpoint-handle-allowlist-approval-contract-intake-ready" | "blocked";
  governanceChainDecision: "continue-only-for-endpoint-handle-allowlist-approval-contract-intake";
  readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake: boolean;
  endpointHandleAllowlistApprovalContractIntakeOnly: true;
  readOnlyEndpointHandleAllowlistApprovalContract: true;
  consumesNodeV319CredentialHandleApprovalPrerequisiteClosureReview: true;
  consumesNodeV313PrerequisiteCatalog: true;
  activeNodeContractVersion: "Node v320";
  targetPrerequisiteId: "endpoint-handle-allowlist-approval";
  nextJavaVersion: "Java v147";
  nextMiniKvVersion: "mini-kv v140";
  nextNodeVerificationVersion: "Node v321";
  readyForParallelJavaV147MiniKvV140Echo: boolean;
  readyForNodeV321BeforeUpstreamEcho: false;
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
  sourceNodeV319: SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference;
  endpointHandleAllowlistApprovalContract: EndpointHandleAllowlistApprovalContract;
  prerequisiteTransition: EndpointHandleAllowlistApprovalPrerequisiteTransition;
  necessityProof: EndpointHandleAllowlistApprovalContractNecessityProof;
  checks: EndpointHandleAllowlistApprovalContractIntakeChecks;
  summary: EndpointHandleAllowlistApprovalContractIntakeSummary;
  productionBlockers: EndpointHandleAllowlistApprovalContractIntakeMessage[];
  warnings: EndpointHandleAllowlistApprovalContractIntakeMessage[];
  recommendations: EndpointHandleAllowlistApprovalContractIntakeMessage[];
  evidenceEndpoints: {
    endpointHandleAllowlistApprovalContractIntakeJson: string;
    endpointHandleAllowlistApprovalContractIntakeMarkdown: string;
    sourceNodeV319Json: string;
    sourceNodeV319Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference {
  sourceVersion: "Node v319";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review.v1";
  reviewState: "credential-handle-approval-prerequisite-closure-review-ready" | "blocked";
  readyForCredentialHandleApprovalPrerequisiteClosureReview: boolean;
  reviewDigest: string;
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  nextConcretePrerequisiteId: "endpoint-handle-allowlist-approval";
  nextConcretePrerequisiteContractRequired: true;
  nextNodeVersionSuggested: "Node v320";
  chainContinuationAllowed: true;
  runtimeShellStillBlocked: true;
  completedPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  remainingPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceChecks: CredentialHandleApprovalPrerequisiteClosureReviewChecks;
  sourceSummary: CredentialHandleApprovalPrerequisiteClosureReviewSummary;
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

export interface EndpointHandleAllowlistApprovalContract {
  contractDigest: string;
  contractName: "managed-audit-endpoint-handle-allowlist-approval";
  contractVersion: "endpoint-handle-allowlist-approval.v1";
  contractMode: "endpoint-handle-allowlist-approval-contract-intake-only";
  sourceSpan: "Node v319 closure review + Node v313 catalog";
  targetPrerequisiteId: "endpoint-handle-allowlist-approval";
  purpose: string;
  requiredFields: EndpointHandleAllowlistApprovalRequiredField[];
  prohibitedFields: EndpointHandleAllowlistApprovalProhibitedField[];
  rejectionReasons: EndpointHandleAllowlistApprovalRejectionReason[];
  noGoBoundaries: EndpointHandleAllowlistApprovalNoGoBoundary[];
  upstreamEchoRequests: EndpointHandleAllowlistApprovalUpstreamEchoRequest[];
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  implementationStillBlocked: true;
}

export interface EndpointHandleAllowlistApprovalRequiredField {
  id:
    | "endpoint_handle"
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

export interface EndpointHandleAllowlistApprovalProhibitedField {
  id: string;
  reason: string;
  rejectionCode: string;
}

export interface EndpointHandleAllowlistApprovalRejectionReason {
  code: string;
  source:
    | "endpoint-handle-contract"
    | "credential-boundary"
    | "endpoint-boundary"
    | "provider-client-boundary"
    | "write-boundary";
  message: string;
}

export interface EndpointHandleAllowlistApprovalNoGoBoundary {
  id: string;
  allowed: false;
  message: string;
}

export interface EndpointHandleAllowlistApprovalUpstreamEchoRequest {
  project: "java" | "mini-kv";
  version: "Java v147" | "mini-kv v140";
  requestedEcho: string;
  canRunInParallel: true;
  mustRemainReadOnly: true;
}

export interface EndpointHandleAllowlistApprovalPrerequisiteTransition {
  prerequisiteId: "endpoint-handle-allowlist-approval";
  catalogLabel: string;
  beforeV320: "still-missing";
  afterV320: "contract-intake-defined";
  closureRequiresUpstreamEcho: true;
  completedPrerequisiteCountBeforeV320: 3;
  remainingPrerequisiteCountBeforeV320: 3;
  preservesSignedHumanApprovalArtifactClosure: true;
  preservesCredentialHandleApprovalClosure: true;
  closesEndpointHandleAllowlistApproval: false;
  closesNoNetworkSafetyFixture: false;
  closesAbortRollbackSemantics: false;
}

export interface EndpointHandleAllowlistApprovalContractNecessityProof {
  proofComplete: true;
  blockerResolved: string;
  consumer: "Java v147 + mini-kv v140, then Node v321";
  whyV319CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
}

export type EndpointHandleAllowlistApprovalContractIntakeChecks = {
  sourceNodeV319Ready: boolean;
  sourceNodeV319PointsToEndpointHandleAllowlist: boolean;
  sourceNodeV319KeepsRuntimeBlocked: boolean;
  sourceNodeV319KeepsSideEffectsClosed: boolean;
  endpointHandleAllowlistApprovalStillMissingInSource: boolean;
  catalogTargetMatchesEndpointHandleAllowlist: boolean;
  contractRequiredFieldsDocumented: boolean;
  contractProhibitedFieldsDocumented: boolean;
  rejectionReasonsDocumented: boolean;
  noGoBoundariesClosed: boolean;
  prerequisiteTransitionScopedToEndpointHandleAllowlist: boolean;
  necessityProofDocumented: boolean;
  javaMiniKvEchoRequestExplicitlyParallel: boolean;
  contractStaysNonSecret: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  runtimeShellImplementationStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake: boolean;
};

export interface EndpointHandleAllowlistApprovalContractIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV319CheckCount: number;
  sourceNodeV319PassedCheckCount: number;
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

export interface EndpointHandleAllowlistApprovalContractIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake"
    | "node-v319-credential-handle-approval-prerequisite-closure-review"
    | "endpoint-handle-allowlist-approval-contract"
    | "runtime-config";
  message: string;
}


