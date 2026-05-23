import type {
  HumanApprovalArtifactReviewUpstreamEchoVerificationChecks,
  HumanApprovalArtifactReviewUpstreamEchoVerificationSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerificationTypes.js";
import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate.v1";
  decisionGateState: "human-approval-artifact-review-post-echo-decision-gate-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate: boolean;
  readOnlyDecisionGate: true;
  humanApprovalArtifactReviewPostEchoDecisionGateOnly: true;
  consumesNodeV309HumanApprovalArtifactReviewUpstreamEchoVerification: true;
  readyForParallelJavaV144MiniKvV137EchoRequest: boolean;
  readyForNodeV311PostEchoDecisionUpstreamEchoVerification: false;
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
  sourceNodeV309: SourceNodeV309HumanApprovalArtifactReviewUpstreamEchoVerificationReference;
  decisionGate: HumanApprovalArtifactReviewPostEchoDecisionGate;
  checks: HumanApprovalArtifactReviewPostEchoDecisionGateChecks;
  summary: HumanApprovalArtifactReviewPostEchoDecisionGateSummary;
  productionBlockers: HumanApprovalArtifactReviewPostEchoDecisionGateMessage[];
  warnings: HumanApprovalArtifactReviewPostEchoDecisionGateMessage[];
  recommendations: HumanApprovalArtifactReviewPostEchoDecisionGateMessage[];
  evidenceEndpoints: {
    humanApprovalArtifactReviewPostEchoDecisionGateJson: string;
    humanApprovalArtifactReviewPostEchoDecisionGateMarkdown: string;
    sourceNodeV309Json: string;
    sourceNodeV309Markdown: string;
    activePlan: string;
    recommendedParallelJavaV144: string;
    recommendedParallelMiniKvV137: string;
  };
  nextActions: string[];
}

export interface SourceNodeV309HumanApprovalArtifactReviewUpstreamEchoVerificationReference {
  sourceVersion: "Node v309";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1";
  verificationState: "human-approval-artifact-review-upstream-echo-verification-ready" | "blocked";
  readyForHumanApprovalArtifactReviewUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  activeNodeVerificationVersion: "Node v309";
  verificationDigest: string;
  verificationMode: "human-approval-artifact-review-upstream-echo-verification-only";
  sourceSpan: "Node v308 + Java v143 + mini-kv v136";
  sourceNodeV308Ready: boolean;
  javaV143EchoReady: boolean;
  miniKvV136ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  reviewPacketContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  sourceNodeV308ReviewPacketDigest: string;
  sourceNodeV308RequiredFieldCount: number;
  sourceNodeV308ProhibitedFieldCount: number;
  sourceNodeV308RejectionReasonCount: number;
  sourceNodeV308MissingFieldCheckCount: number;
  sourceNodeV308NoGoBoundaryCount: number;
  sourceNodeV308UpstreamEchoRequestCount: number;
  sourceChecks: HumanApprovalArtifactReviewUpstreamEchoVerificationChecks;
  sourceSummary: HumanApprovalArtifactReviewUpstreamEchoVerificationSummary;
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

export interface HumanApprovalArtifactReviewPostEchoDecisionGate {
  decisionDigest: string;
  gateMode: "human-approval-artifact-review-post-echo-decision-gate-only";
  decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review";
  sourceSpan: "Node v308 + Java v143 + mini-kv v136 + Node v309";
  decision: "continue-only-as-blocked-post-echo-prerequisite-review";
  decisionReason: string;
  selectedPath: "request-read-only-upstream-decision-echo-before-any-runtime-shell";
  allowsParallelJavaV144MiniKvV137EchoRequest: boolean;
  allowsNodeV311BeforeUpstreamEcho: false;
  allowsDisabledRuntimeShellImplementation: false;
  allowsDisabledRuntimeShellInvocation: false;
  allowsRealResolverImplementation: false;
  allowsSecretProviderInstantiation: false;
  allowsResolverClientInstantiation: false;
  allowsCredentialValueRead: false;
  allowsRawEndpointUrlParse: false;
  allowsExternalRequest: false;
  allowsManagedAuditConnection: false;
  allowsSchemaMigration: false;
  allowsApprovalLedgerWrite: false;
  allowsAutomaticUpstreamStart: false;
  prerequisiteCount: number;
  missingPrerequisiteCount: number;
  noGoConditionCount: number;
  requiredPrerequisites: HumanApprovalArtifactReviewPostEchoPrerequisite[];
  explicitNoGoConditions: HumanApprovalArtifactReviewPostEchoNoGoCondition[];
  necessityProof: HumanApprovalArtifactReviewPostEchoDecisionNecessityProof;
}

export interface HumanApprovalArtifactReviewPostEchoPrerequisite {
  id: HumanApprovalArtifactReviewPostEchoPrerequisiteId;
  label: string;
  currentEvidence: string;
  status: "documented-missing";
  requiredBeforeRuntimeShell: true;
}

export interface HumanApprovalArtifactReviewPostEchoNoGoCondition {
  code: string;
  condition: string;
  action: "pause-and-do-not-implement-runtime-shell";
}

export interface HumanApprovalArtifactReviewPostEchoDecisionNecessityProof {
  blockerResolved: string;
  consumer: "Java v144 and mini-kv v137, then Node v311";
  whyV309CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
  proofComplete: true;
}

export type HumanApprovalArtifactReviewPostEchoDecisionGateChecks = {
  sourceNodeV309Loaded: boolean;
  sourceNodeV309Ready: boolean;
  sourceNodeV309UpstreamEchoAligned: boolean;
  sourceNodeV309KeepsRuntimeBlocked: boolean;
  sourceNodeV309KeepsSideEffectsClosed: boolean;
  decisionSelectsPostEchoPrerequisiteGate: boolean;
  decisionGateBlocksRuntimeShell: boolean;
  decisionGateStillReadOnly: boolean;
  postEchoPrerequisitesDocumented: boolean;
  missingPrerequisitesBlockImplementation: boolean;
  necessityProofComplete: boolean;
  parallelJavaV144MiniKvV137EchoRecommended: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate: boolean;
};

export interface HumanApprovalArtifactReviewPostEchoDecisionGateSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  missingFieldCheckCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  prerequisiteCount: number;
  missingPrerequisiteCount: number;
  noGoConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface HumanApprovalArtifactReviewPostEchoDecisionGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-post-echo-decision-gate"
    | "node-v309-human-approval-artifact-review-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
