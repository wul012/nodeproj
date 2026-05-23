import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionChecks,
  HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake.v1";
  contractState: "signed-human-approval-artifact-contract-intake-ready" | "blocked";
  governanceChainDecision: "continue-only-for-signed-human-approval-artifact-contract-intake";
  readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake: boolean;
  signedHumanApprovalArtifactContractIntakeOnly: true;
  readOnlyArtifactContract: true;
  consumesNodeV312GovernanceStopPrerequisiteClosureDecision: true;
  consumesNodeV313PrerequisiteCatalog: true;
  activeNodeContractVersion: "Node v314";
  targetPrerequisiteId: "signed-human-approval-artifact";
  nextJavaVersion: "Java v145";
  nextMiniKvVersion: "mini-kv v138";
  nextNodeVerificationVersion: "Node v315";
  readyForParallelJavaV145MiniKvV138Echo: boolean;
  readyForNodeV315BeforeUpstreamEcho: false;
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
  sourceNodeV312: SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference;
  signedArtifactContract: SignedHumanApprovalArtifactContract;
  prerequisiteTransition: SignedHumanApprovalArtifactPrerequisiteTransition;
  necessityProof: SignedHumanApprovalArtifactContractNecessityProof;
  checks: SignedHumanApprovalArtifactContractIntakeChecks;
  summary: SignedHumanApprovalArtifactContractIntakeSummary;
  productionBlockers: SignedHumanApprovalArtifactContractIntakeMessage[];
  warnings: SignedHumanApprovalArtifactContractIntakeMessage[];
  recommendations: SignedHumanApprovalArtifactContractIntakeMessage[];
  evidenceEndpoints: {
    signedHumanApprovalArtifactContractIntakeJson: string;
    signedHumanApprovalArtifactContractIntakeMarkdown: string;
    sourceNodeV312Json: string;
    sourceNodeV312Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference {
  sourceVersion: "Node v312";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision.v1";
  decisionState: "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready" | "blocked";
  readyForClosureDecision: boolean;
  decisionDigest: string;
  sourceVerificationDigest: string;
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  noGoConditionCount: number;
  chainContinuationAllowed: false;
  nextConcretePrerequisiteContractRequired: true;
  completedPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  remainingPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceChecks: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionChecks;
  sourceSummary: HumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecisionSummary;
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

export interface SignedHumanApprovalArtifactContract {
  contractDigest: string;
  artifactName: "managed-audit-signed-human-approval-artifact";
  artifactVersion: "signed-human-approval-artifact.v1";
  contractMode: "signed-human-approval-artifact-contract-intake-only";
  sourceSpan: "Node v312 + Node v313 catalog";
  targetPrerequisiteId: "signed-human-approval-artifact";
  purpose: string;
  requiredFields: SignedHumanApprovalArtifactRequiredField[];
  prohibitedFields: SignedHumanApprovalArtifactProhibitedField[];
  rejectionReasons: SignedHumanApprovalArtifactRejectionReason[];
  noGoBoundaries: SignedHumanApprovalArtifactNoGoBoundary[];
  upstreamEchoRequests: SignedHumanApprovalArtifactUpstreamEchoRequest[];
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  implementationStillBlocked: true;
}

export interface SignedHumanApprovalArtifactRequiredField {
  id:
    | "artifact_id"
    | "approval_correlation_id"
    | "operator_identity_handle"
    | "signer_identity_handle"
    | "policy_version"
    | "artifact_digest"
    | "issued_at"
    | "expires_at"
    | "review_status"
    | "no_network_assertion"
    | "rollback_abort_reference";
  label: string;
  required: true;
  acceptedShape: string;
  purpose: string;
}

export interface SignedHumanApprovalArtifactProhibitedField {
  id: string;
  reason: string;
  rejectionCode: string;
}

export interface SignedHumanApprovalArtifactRejectionReason {
  code: string;
  source: "artifact-contract" | "credential-boundary" | "endpoint-boundary" | "runtime-boundary" | "write-boundary";
  message: string;
}

export interface SignedHumanApprovalArtifactNoGoBoundary {
  id: string;
  allowed: false;
  message: string;
}

export interface SignedHumanApprovalArtifactUpstreamEchoRequest {
  project: "java" | "mini-kv";
  version: "Java v145" | "mini-kv v138";
  requestedEcho: string;
  canRunInParallel: true;
  mustRemainReadOnly: true;
}

export interface SignedHumanApprovalArtifactPrerequisiteTransition {
  prerequisiteId: "signed-human-approval-artifact";
  catalogLabel: string;
  beforeV314: "still-missing";
  afterV314: "contract-intake-defined";
  closureRequiresUpstreamEcho: true;
  closesCredentialHandleApproval: false;
  closesEndpointHandleAllowlistApproval: false;
  closesNoNetworkSafetyFixture: false;
  closesAbortRollbackSemantics: false;
}

export interface SignedHumanApprovalArtifactContractNecessityProof {
  proofComplete: true;
  blockerResolved: string;
  consumer: "Java v145 + mini-kv v138, then Node v315";
  whyV312CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
}

export type SignedHumanApprovalArtifactContractIntakeChecks = {
  sourceNodeV312Ready: boolean;
  sourceNodeV312KeepsGovernancePaused: boolean;
  signedHumanApprovalArtifactStillMissingInSource: boolean;
  catalogTargetMatchesSignedArtifact: boolean;
  contractRequiredFieldsDocumented: boolean;
  contractProhibitedFieldsDocumented: boolean;
  rejectionReasonsDocumented: boolean;
  noGoBoundariesClosed: boolean;
  prerequisiteTransitionScopedToSignedArtifact: boolean;
  necessityProofDocumented: boolean;
  javaMiniKvEchoRequestExplicitlyParallel: boolean;
  contractStaysNonSecret: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  runtimeShellImplementationStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake: boolean;
};

export interface SignedHumanApprovalArtifactContractIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV312CheckCount: number;
  sourceNodeV312PassedCheckCount: number;
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

export interface SignedHumanApprovalArtifactContractIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake"
    | "node-v312-human-approval-artifact-review-governance-stop-prerequisite-closure-decision"
    | "signed-human-approval-artifact-contract"
    | "runtime-config";
  message: string;
}
