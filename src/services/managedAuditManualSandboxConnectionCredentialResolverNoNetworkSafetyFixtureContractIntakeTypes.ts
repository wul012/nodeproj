import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  EndpointHandleAllowlistApprovalPrerequisiteClosureReviewChecks,
  EndpointHandleAllowlistApprovalPrerequisiteClosureReviewSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake.v1";
  contractState: "no-network-safety-fixture-contract-intake-ready" | "blocked";
  governanceChainDecision: "continue-only-for-no-network-safety-fixture-contract-intake";
  readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake: boolean;
  noNetworkSafetyFixtureContractIntakeOnly: true;
  readOnlyNoNetworkSafetyFixtureContract: true;
  consumesNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReview: true;
  consumesNodeV313PrerequisiteCatalog: true;
  activeNodeContractVersion: "Node v323";
  targetPrerequisiteId: "no-network-safety-fixture";
  nextJavaVersion: "Java v149";
  nextMiniKvVersion: "mini-kv v141";
  nextNodeVerificationVersion: "Node v324";
  readyForParallelJavaV149MiniKvV141Echo: boolean;
  readyForNodeV324BeforeUpstreamEcho: false;
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
  networkSafetyFixtureExecuted: false;
  httpRequestSent: false;
  tcpConnectionAttempted: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  fakeSecretProviderInstantiated: false;
  fakeResolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV322: SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference;
  noNetworkSafetyFixtureContract: NoNetworkSafetyFixtureContract;
  prerequisiteTransition: NoNetworkSafetyFixturePrerequisiteTransition;
  necessityProof: NoNetworkSafetyFixtureContractNecessityProof;
  checks: NoNetworkSafetyFixtureContractIntakeChecks;
  summary: NoNetworkSafetyFixtureContractIntakeSummary;
  productionBlockers: NoNetworkSafetyFixtureContractIntakeMessage[];
  warnings: NoNetworkSafetyFixtureContractIntakeMessage[];
  recommendations: NoNetworkSafetyFixtureContractIntakeMessage[];
  evidenceEndpoints: {
    noNetworkSafetyFixtureContractIntakeJson: string;
    noNetworkSafetyFixtureContractIntakeMarkdown: string;
    sourceNodeV322Json: string;
    sourceNodeV322Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference {
  sourceVersion: "Node v322";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review.v1";
  reviewState: "endpoint-handle-allowlist-approval-prerequisite-closure-review-ready" | "blocked";
  readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview: boolean;
  reviewDigest: string;
  completedPrerequisiteCount: number;
  remainingPrerequisiteCount: number;
  originalPrerequisiteCount: number;
  nextConcretePrerequisiteId: "no-network-safety-fixture";
  nextConcretePrerequisiteContractRequired: true;
  nextNodeVersionSuggested: "Node v323";
  chainContinuationAllowed: true;
  runtimeShellStillBlocked: true;
  completedPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  remainingPrerequisiteIds: HumanApprovalArtifactReviewPostEchoPrerequisiteId[];
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceChecks: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewChecks;
  sourceSummary: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewSummary;
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

export interface NoNetworkSafetyFixtureContract {
  contractDigest: string;
  contractName: "managed-audit-no-network-safety-fixture";
  contractVersion: "no-network-safety-fixture.v1";
  contractMode: "no-network-safety-fixture-contract-intake-only";
  sourceSpan: "Node v322 closure review + Node v313 catalog";
  targetPrerequisiteId: "no-network-safety-fixture";
  purpose: string;
  requiredFields: NoNetworkSafetyFixtureRequiredField[];
  prohibitedFields: NoNetworkSafetyFixtureProhibitedField[];
  rejectionReasons: NoNetworkSafetyFixtureRejectionReason[];
  noGoBoundaries: NoNetworkSafetyFixtureNoGoBoundary[];
  upstreamEchoRequests: NoNetworkSafetyFixtureUpstreamEchoRequest[];
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  implementationStillBlocked: true;
  fixtureExecutionAllowed: false;
}

export interface NoNetworkSafetyFixtureRequiredField {
  id:
    | "fixture_id"
    | "operator_confirmation_handle"
    | "approval_correlation_id"
    | "transport_denial_policy_id"
    | "expected_denied_transport_classes"
    | "required_denial_evidence"
    | "forbidden_network_actions"
    | "cleanup_marker"
    | "timeout_budget_ms"
    | "audit_digest";
  label: string;
  required: true;
  acceptedShape: string;
  purpose: string;
}

export interface NoNetworkSafetyFixtureProhibitedField {
  id: string;
  reason: string;
  rejectionCode: string;
}

export interface NoNetworkSafetyFixtureRejectionReason {
  code: string;
  source:
    | "no-network-fixture-contract"
    | "credential-boundary"
    | "endpoint-boundary"
    | "provider-client-boundary"
    | "network-boundary"
    | "write-boundary";
  message: string;
}

export interface NoNetworkSafetyFixtureNoGoBoundary {
  id: string;
  allowed: false;
  message: string;
}

export interface NoNetworkSafetyFixtureUpstreamEchoRequest {
  project: "java" | "mini-kv";
  version: "Java v149" | "mini-kv v141";
  requestedEcho: string;
  canRunInParallel: true;
  mustRemainReadOnly: true;
}

export interface NoNetworkSafetyFixturePrerequisiteTransition {
  prerequisiteId: "no-network-safety-fixture";
  catalogLabel: string;
  beforeV323: "still-missing";
  afterV323: "contract-intake-defined";
  closureRequiresUpstreamEcho: true;
  completedPrerequisiteCountBeforeV323: 4;
  remainingPrerequisiteCountBeforeV323: 2;
  preservesSignedHumanApprovalArtifactClosure: true;
  preservesCredentialHandleApprovalClosure: true;
  preservesEndpointHandleAllowlistApprovalClosure: true;
  closesNoNetworkSafetyFixture: false;
  closesAbortRollbackSemantics: false;
}

export interface NoNetworkSafetyFixtureContractNecessityProof {
  proofComplete: true;
  blockerResolved: string;
  consumer: "Java v149 + mini-kv v141, then Node v324";
  whyV322CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
}

export type NoNetworkSafetyFixtureContractIntakeChecks = {
  sourceNodeV322Ready: boolean;
  sourceNodeV322PointsToNoNetworkSafetyFixture: boolean;
  sourceNodeV322KeepsRuntimeBlocked: boolean;
  sourceNodeV322KeepsSideEffectsClosed: boolean;
  noNetworkSafetyFixtureStillMissingInSource: boolean;
  catalogTargetMatchesNoNetworkSafetyFixture: boolean;
  contractRequiredFieldsDocumented: boolean;
  contractProhibitedFieldsDocumented: boolean;
  rejectionReasonsDocumented: boolean;
  noGoBoundariesClosed: boolean;
  prerequisiteTransitionScopedToNoNetworkSafetyFixture: boolean;
  necessityProofDocumented: boolean;
  javaMiniKvEchoRequestExplicitlyParallel: boolean;
  contractStaysNoNetworkAndNonSecret: boolean;
  fixtureExecutionStillBlocked: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  runtimeShellImplementationStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake: boolean;
};

export interface NoNetworkSafetyFixtureContractIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV322CheckCount: number;
  sourceNodeV322PassedCheckCount: number;
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

export interface NoNetworkSafetyFixtureContractIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake"
    | "node-v322-endpoint-handle-allowlist-approval-prerequisite-closure-review"
    | "no-network-safety-fixture-contract"
    | "runtime-config";
  message: string;
}
