import type {
  ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks,
  ApprovalPrerequisiteArtifactUpstreamEchoVerificationSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet.v1";
  reviewPacketState: "human-approval-artifact-review-packet-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket: boolean;
  humanApprovalArtifactReviewPacketOnly: true;
  readOnlyReviewPacketContract: true;
  consumesNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification: true;
  activeNodeReviewVersion: "Node v308";
  nextJavaVersion: "Java v143";
  nextMiniKvVersion: "mini-kv v136";
  nextNodeVerificationVersion: "Node v309";
  readyForParallelJavaV143MiniKvV136Echo: boolean;
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
  sourceNodeV307: SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference;
  reviewPacket: HumanApprovalArtifactReviewPacket;
  necessityProof: HumanApprovalArtifactReviewPacketNecessityProof;
  checks: HumanApprovalArtifactReviewPacketChecks;
  summary: HumanApprovalArtifactReviewPacketSummary;
  productionBlockers: HumanApprovalArtifactReviewPacketMessage[];
  warnings: HumanApprovalArtifactReviewPacketMessage[];
  recommendations: HumanApprovalArtifactReviewPacketMessage[];
  evidenceEndpoints: {
    humanApprovalArtifactReviewPacketJson: string;
    humanApprovalArtifactReviewPacketMarkdown: string;
    sourceNodeV307Json: string;
    sourceNodeV307Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference {
  sourceVersion: "Node v307";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1";
  verificationState: "approval-prerequisite-artifact-upstream-echo-verification-ready" | "blocked";
  readyForUpstreamEchoVerification: boolean;
  verificationDigest: string;
  verificationMode: "approval-prerequisite-artifact-upstream-echo-verification-only";
  sourceSpan: "Node v306 + Java v142 + mini-kv v135";
  upstreamEchoAligned: boolean;
  artifactContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  sourceNodeV306ArtifactDigest: string;
  sourceNodeV306PlanState: string;
  sourceNodeV306RequiredFieldCount: number;
  sourceNodeV306ProhibitedFieldCount: number;
  sourceNodeV306RejectionReasonCount: number;
  sourceNodeV306NoGoBoundaryCount: number;
  sourceNodeV306UpstreamEchoRequestCount: number;
  sourceChecks: ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks;
  sourceSummary: ApprovalPrerequisiteArtifactUpstreamEchoVerificationSummary;
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

export interface HumanApprovalArtifactReviewPacket {
  packetDigest: string;
  packetName: "managed-audit-runtime-shell-human-approval-artifact-review-packet";
  packetVersion: "human-approval-artifact-review-packet.v1";
  reviewMode: "human-approval-artifact-review-packet-contract-only";
  sourceSpan: "Node v307";
  requiredFields: HumanApprovalArtifactReviewRequiredField[];
  prohibitedFields: HumanApprovalArtifactReviewProhibitedField[];
  rejectionReasons: HumanApprovalArtifactReviewRejectionReason[];
  missingFieldChecks: HumanApprovalArtifactReviewMissingFieldCheck[];
  noGoBoundaries: HumanApprovalArtifactReviewNoGoBoundary[];
  upstreamEchoRequests: HumanApprovalArtifactReviewUpstreamEchoRequest[];
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  missingFieldCheckCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  implementationStillBlocked: true;
}

export interface HumanApprovalArtifactReviewRequiredField {
  id: string;
  label: string;
  requiredEvidence: string;
  missingFieldCode: string;
}

export interface HumanApprovalArtifactReviewProhibitedField {
  id: string;
  reason: string;
  rejectionCode: string;
}

export interface HumanApprovalArtifactReviewRejectionReason {
  code: string;
  message: string;
}

export interface HumanApprovalArtifactReviewMissingFieldCheck {
  fieldId: string;
  rejectionCode: string;
}

export interface HumanApprovalArtifactReviewNoGoBoundary {
  id: string;
  closed: true;
  reason: string;
}

export interface HumanApprovalArtifactReviewUpstreamEchoRequest {
  project: "java" | "mini-kv";
  version: "Java v143" | "mini-kv v136";
  mode: "read-only-human-approval-artifact-review-packet-echo" | "read-only-human-approval-artifact-review-non-participation-receipt";
  canRunInParallel: true;
  requiredBeforeNodeV309: true;
}

export interface HumanApprovalArtifactReviewPacketNecessityProof {
  blockerResolved: string;
  nextConsumer: "Java v143 + mini-kv v136, then Node v309";
  whyV307CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
}

export type HumanApprovalArtifactReviewPacketChecks = {
  sourceNodeV307Ready: boolean;
  sourceNodeV307UpstreamEchoAligned: boolean;
  sourceNodeV307ArtifactContractAligned: boolean;
  sourceNodeV307SideEffectsClosed: boolean;
  requiredReviewFieldsDocumented: boolean;
  prohibitedReviewFieldsDocumented: boolean;
  rejectionReasonsDocumented: boolean;
  missingFieldChecksDocumented: boolean;
  noGoBoundariesClosed: boolean;
  necessityProofDocumented: boolean;
  javaMiniKvEchoRequestExplicitlyParallel: boolean;
  reviewPacketStaysContractOnly: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  runtimeShellImplementationStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket: boolean;
};

export interface HumanApprovalArtifactReviewPacketSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV307CheckCount: number;
  sourceNodeV307PassedCheckCount: number;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  missingFieldCheckCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface HumanApprovalArtifactReviewPacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet"
    | "node-v307-approval-prerequisite-artifact-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
