export interface ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan.v1";
  planState: "approval-prerequisite-artifact-intake-plan-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan: boolean;
  approvalPrerequisiteArtifactIntakePlanOnly: true;
  readOnlyArtifactContract: true;
  consumesNodeV305StopPrerequisiteUpstreamEchoVerification: true;
  sourceNodeVerificationVersion: "Node v305";
  nextJavaVersion: "Java v142";
  nextMiniKvVersion: "mini-kv v135";
  nextNodeVerificationVersion: "Node v307";
  readyForParallelJavaV142MiniKvV135Echo: boolean;
  readyForNodeV307BeforeUpstreamEcho: false;
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
  sourceNodeV305: SourceNodeV305StopPrerequisiteUpstreamEchoVerificationReference;
  artifactIntakePlan: ApprovalPrerequisiteArtifactIntakePlan;
  necessityProof: ApprovalPrerequisiteArtifactIntakeNecessityProof;
  checks: ApprovalPrerequisiteArtifactIntakePlanChecks;
  summary: ApprovalPrerequisiteArtifactIntakePlanSummary;
  productionBlockers: ApprovalPrerequisiteArtifactIntakePlanMessage[];
  warnings: ApprovalPrerequisiteArtifactIntakePlanMessage[];
  recommendations: ApprovalPrerequisiteArtifactIntakePlanMessage[];
  evidenceEndpoints: {
    approvalPrerequisiteArtifactIntakePlanJson: string;
    approvalPrerequisiteArtifactIntakePlanMarkdown: string;
    sourceNodeV305Json: string;
    sourceNodeV305Markdown: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV305StopPrerequisiteUpstreamEchoVerificationReference {
  sourceVersion: "Node v305";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification.v1";
  verificationState: "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready" | "blocked";
  readyForUpstreamEchoVerification: boolean;
  verificationDigest: string;
  sourceSpan: "Node v304 + Java v141 + mini-kv v134";
  upstreamEchoAligned: boolean;
  prerequisiteGateStillBlocked: boolean;
  sideEffectBoundariesAligned: boolean;
  sourceNodeV304DecisionDigest: string;
  prerequisiteCount: number;
  missingRuntimePrerequisiteCount: number;
  noGoConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
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

export interface ApprovalPrerequisiteArtifactIntakePlan {
  artifactDigest: string;
  artifactName: "managed-audit-runtime-shell-approval-prerequisite-artifact";
  artifactVersion: "approval-prerequisite-artifact.v1";
  intakeMode: "approval-prerequisite-artifact-intake-plan-only";
  sourceSpan: "Node v305 + planned Java v142 + planned mini-kv v135";
  purpose: string;
  requiredFields: ApprovalPrerequisiteArtifactField[];
  prohibitedFields: ApprovalPrerequisiteArtifactProhibitedField[];
  rejectionReasons: ApprovalPrerequisiteArtifactRejectionReason[];
  noGoBoundaries: ApprovalPrerequisiteArtifactNoGoBoundary[];
  upstreamEchoRequests: ApprovalPrerequisiteArtifactUpstreamEchoRequest[];
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  javaMiniKvEchoCanRunInParallel: boolean;
  implementationStillBlocked: true;
}

export interface ApprovalPrerequisiteArtifactField {
  id: string;
  label: string;
  required: true;
  source: "operator" | "node-v305" | "java-v142" | "mini-kv-v135" | "audit-process";
  acceptedShape: string;
  purpose: string;
}

export interface ApprovalPrerequisiteArtifactProhibitedField {
  id: string;
  reason: string;
  rejectionCode: string;
}

export interface ApprovalPrerequisiteArtifactRejectionReason {
  code: string;
  source:
    | "artifact-contract"
    | "operator-approval"
    | "credential-boundary"
    | "endpoint-boundary"
    | "runtime-boundary"
    | "upstream-echo"
    | "write-boundary";
  message: string;
}

export interface ApprovalPrerequisiteArtifactNoGoBoundary {
  id: string;
  allowed: false;
  message: string;
}

export interface ApprovalPrerequisiteArtifactUpstreamEchoRequest {
  project: "java" | "mini-kv";
  version: "Java v142" | "mini-kv v135";
  requestedEcho: string;
  canRunInParallel: true;
  mustRemainReadOnly: true;
}

export interface ApprovalPrerequisiteArtifactIntakeNecessityProof {
  proofComplete: true;
  blockerResolved: string;
  consumer: "Java v142 + mini-kv v135, then Node v307";
  whyV305CannotBeReused: string;
  existingReportReuseDecision: string;
  stopCondition: string;
}

export type ApprovalPrerequisiteArtifactIntakePlanChecks = {
  sourceNodeV305Ready: boolean;
  sourceNodeV305UpstreamEchoAligned: boolean;
  sourceNodeV305PrerequisiteGateBlocked: boolean;
  sourceNodeV305SideEffectsClosed: boolean;
  requiredArtifactFieldsDocumented: boolean;
  prohibitedArtifactFieldsDocumented: boolean;
  rejectionReasonsDocumented: boolean;
  noGoBoundariesClosed: boolean;
  necessityProofDocumented: boolean;
  javaMiniKvEchoRequestExplicitlyParallel: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  runtimeShellImplementationStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan: boolean;
};

export interface ApprovalPrerequisiteArtifactIntakePlanSummary {
  checkCount: number;
  passedCheckCount: number;
  prerequisiteCountFromNodeV305: number;
  missingRuntimePrerequisiteCountFromNodeV305: number;
  noGoConditionCountFromNodeV305: number;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ApprovalPrerequisiteArtifactIntakePlanMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan"
    | "node-v305-runtime-shell-chain-stop-prerequisite-upstream-echo-verification"
    | "approval-prerequisite-artifact-contract"
    | "runtime-config";
  message: string;
}
