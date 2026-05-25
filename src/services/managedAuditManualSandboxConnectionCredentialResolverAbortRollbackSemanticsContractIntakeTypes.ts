import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  NoNetworkSafetyFixturePrerequisiteClosureReviewChecks,
  NoNetworkSafetyFixturePrerequisiteClosureReviewSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake.v1";
  contractState: "abort-rollback-semantics-contract-intake-ready" | "blocked";
  governanceChainDecision: "continue-only-for-abort-rollback-semantics-contract-intake";
  readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake: boolean;
  abortRollbackSemanticsContractIntakeOnly: true;
  readOnlyAbortRollbackSemanticsContract: true;
  consumesNodeV325NoNetworkSafetyFixturePrerequisiteClosureReview: true;
  consumesNodeV313PrerequisiteCatalog: true;
  activeNodeContractVersion: "Node v326";
  targetPrerequisiteId: "abort-rollback-semantics";
  nextJavaVersion: "Java v150";
  nextMiniKvVersion: "mini-kv v142";
  nextNodeVerificationVersion: "Node v327";
  readyForParallelJavaV150MiniKvV142Echo: boolean;
  readyForNodeV327BeforeUpstreamEcho: false;
  readyForFinalPrerequisiteClosureReview: false;
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
  runtimeShellCommandRendered: false;
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
  networkSafetyFixtureExecuted: false;
  abortRollbackSemanticsExecuted: false;
  rollbackExecutionAllowed: false;
  deploymentActionAllowed: false;
  javaSqlExecutionAllowed: false;
  miniKvWriteCommandAllowed: false;
  httpRequestSent: false;
  tcpConnectionAttempted: false;
  networkSocketOpened: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  fakeSecretProviderInstantiated: false;
  fakeResolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV325: SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference;
  abortRollbackSemanticsContract: AbortRollbackSemanticsContract;
  prerequisiteTransition: AbortRollbackSemanticsPrerequisiteTransition;
  necessityProof: AbortRollbackSemanticsContractNecessityProof;
  checks: AbortRollbackSemanticsContractIntakeChecks;
  summary: AbortRollbackSemanticsContractIntakeSummary;
  productionBlockers: AbortRollbackSemanticsContractIntakeMessage[];
  warnings: AbortRollbackSemanticsContractIntakeMessage[];
  recommendations: AbortRollbackSemanticsContractIntakeMessage[];
  evidenceEndpoints: {
    abortRollbackSemanticsContractIntakeJson: string;
    abortRollbackSemanticsContractIntakeMarkdown: string;
    sourceNodeV325Json: string;
    sourceNodeV325Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference {
  sourceVersion: "Node v325";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review.v1";
  reviewState: "no-network-safety-fixture-prerequisite-closure-review-ready" | "blocked";
  readyForNoNetworkSafetyFixturePrerequisiteClosureReview: boolean;
  reviewDigest: string;
  prerequisiteClosureDecision: "advance-no-network-safety-fixture-only";
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  nextConcretePrerequisiteId: "abort-rollback-semantics";
  nextConcretePrerequisiteContractRequired: true;
  nextNodeVersionSuggested: "Node v326";
  chainContinuationAllowed: true;
  runtimeShellStillBlocked: true;
  completedPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  remainingPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceChecks: NoNetworkSafetyFixturePrerequisiteClosureReviewChecks;
  sourceSummary: NoNetworkSafetyFixturePrerequisiteClosureReviewSummary;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  networkSafetyFixtureExecuted: false;
  httpRequestSent: false;
  tcpConnectionAttempted: false;
  networkSocketOpened: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface AbortRollbackSemanticsContract {
  contractDigest: string;
  contractName: "managed-audit-abort-rollback-semantics";
  contractVersion: "abort-rollback-semantics.v1";
  contractMode: "abort-rollback-semantics-contract-intake-only";
  sourceSpan: "Node v325 closure review + Node v313 catalog";
  targetPrerequisiteId: "abort-rollback-semantics";
  purpose: string;
  requiredFields: AbortRollbackSemanticsRequiredField[];
  prohibitedFields: AbortRollbackSemanticsProhibitedField[];
  rejectionReasons: AbortRollbackSemanticsRejectionReason[];
  noGoBoundaries: AbortRollbackSemanticsNoGoBoundary[];
  upstreamEchoRequests: AbortRollbackSemanticsUpstreamEchoRequest[];
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  implementationStillBlocked: true;
  abortRollbackExecutionAllowed: false;
}

export interface AbortRollbackSemanticsRequiredField {
  id:
    | "manual_abort_marker"
    | "rollback_runbook_reference"
    | "operator_confirmation_handle"
    | "approval_correlation_id"
    | "cleanup_evidence_marker"
    | "idempotent_noop_failure_policy"
    | "rollback_authority_boundary"
    | "abort_reason_code"
    | "recovery_checkpoint_reference"
    | "audit_digest";
  label: string;
  required: true;
  acceptedShape: string;
  purpose: string;
}

export interface AbortRollbackSemanticsProhibitedField {
  id: string;
  reason: string;
  rejectionCode: string;
}

export interface AbortRollbackSemanticsRejectionReason {
  code: string;
  source:
    | "abort-rollback-semantics-contract"
    | "credential-boundary"
    | "endpoint-boundary"
    | "runtime-shell-boundary"
    | "network-boundary"
    | "write-boundary";
  message: string;
}

export interface AbortRollbackSemanticsNoGoBoundary {
  id: string;
  allowed: false;
  message: string;
}

export interface AbortRollbackSemanticsUpstreamEchoRequest {
  project: "java" | "mini-kv";
  version: "Java v150" | "mini-kv v142";
  requestedEcho: string;
  canRunInParallel: true;
  mustRemainReadOnly: true;
}

export interface AbortRollbackSemanticsPrerequisiteTransition {
  prerequisiteId: "abort-rollback-semantics";
  catalogLabel: string;
  beforeV326: "still-missing";
  afterV326: "contract-intake-defined";
  closureRequiresUpstreamEcho: true;
  completedPrerequisiteCountBeforeV326: 5;
  remainingPrerequisiteCountBeforeV326: 1;
  preservesSignedHumanApprovalArtifactClosure: true;
  preservesCredentialHandleApprovalClosure: true;
  preservesEndpointHandleAllowlistApprovalClosure: true;
  preservesNoNetworkSafetyFixtureClosure: true;
  closesAbortRollbackSemantics: false;
}

export interface AbortRollbackSemanticsContractNecessityProof {
  proofComplete: true;
  blockerResolved: string;
  consumer: "Java v150 + mini-kv v142, then Node v327";
  whyV325CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
}

export type AbortRollbackSemanticsContractIntakeChecks = {
  sourceNodeV325Ready: boolean;
  sourceNodeV325PointsToAbortRollbackSemantics: boolean;
  sourceNodeV325KeepsRuntimeBlocked: boolean;
  sourceNodeV325KeepsSideEffectsClosed: boolean;
  abortRollbackSemanticsStillMissingInSource: boolean;
  catalogTargetMatchesAbortRollbackSemantics: boolean;
  contractRequiredFieldsDocumented: boolean;
  contractProhibitedFieldsDocumented: boolean;
  rejectionReasonsDocumented: boolean;
  noGoBoundariesClosed: boolean;
  prerequisiteTransitionScopedToAbortRollbackSemantics: boolean;
  necessityProofDocumented: boolean;
  javaMiniKvEchoRequestExplicitlyParallel: boolean;
  contractStaysNonSecretAndNonExecuting: boolean;
  abortRollbackExecutionStillBlocked: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  runtimeShellImplementationStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake: boolean;
};

export interface AbortRollbackSemanticsContractIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV325CheckCount: number;
  sourceNodeV325PassedCheckCount: number;
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

export interface AbortRollbackSemanticsContractIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake"
    | "node-v325-no-network-safety-fixture-prerequisite-closure-review"
    | "abort-rollback-semantics-contract"
    | "runtime-config";
  message: string;
}
