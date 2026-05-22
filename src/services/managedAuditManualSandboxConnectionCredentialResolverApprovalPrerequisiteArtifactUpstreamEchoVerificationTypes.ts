import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ApprovalPrerequisiteArtifactIntakePlan,
  ApprovalPrerequisiteArtifactIntakePlanChecks,
  ApprovalPrerequisiteArtifactIntakePlanSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1";
  verificationState: "approval-prerequisite-artifact-upstream-echo-verification-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  approvalPrerequisiteArtifactUpstreamEchoVerificationOnly: true;
  consumesNodeV306ApprovalPrerequisiteArtifactIntakePlan: true;
  consumesJavaV142ApprovalPrerequisiteArtifactIntakeEcho: true;
  consumesMiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceipt: true;
  activeNodeVerificationVersion: "Node v307";
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
  sourceNodeV306: SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference;
  upstreamEvidence: {
    javaV142: JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference;
    miniKvV135: MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference;
  };
  echoVerification: ApprovalPrerequisiteArtifactUpstreamEchoVerification;
  checks: ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks;
  summary: ApprovalPrerequisiteArtifactUpstreamEchoVerificationSummary;
  productionBlockers: ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[];
  warnings: ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[];
  recommendations: ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    approvalPrerequisiteArtifactUpstreamEchoVerificationJson: string;
    approvalPrerequisiteArtifactUpstreamEchoVerificationMarkdown: string;
    sourceNodeV306Json: string;
    sourceNodeV306Markdown: string;
    javaV142Support: string;
    javaV142Test: string;
    javaV142Explanation: string;
    javaV142Walkthrough: string;
    miniKvV135Receipt: string;
    miniKvV135Explanation: string;
    miniKvV135Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV306ApprovalPrerequisiteArtifactIntakePlanReference {
  sourceVersion: "Node v306";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan.v1";
  planState: "approval-prerequisite-artifact-intake-plan-ready" | "blocked";
  readyForArtifactIntakePlan: boolean;
  artifactDigest: string;
  artifactIntakePlan: ApprovalPrerequisiteArtifactIntakePlan;
  checks: ApprovalPrerequisiteArtifactIntakePlanChecks;
  summary: ApprovalPrerequisiteArtifactIntakePlanSummary;
  sourceNodeVerificationVersion: "Node v305";
  nextJavaVersion: "Java v142";
  nextMiniKvVersion: "mini-kv v135";
  nextNodeVerificationVersion: "Node v307";
  readyForParallelJavaV142MiniKvV135Echo: boolean;
  requiredFieldIds: string[];
  prohibitedFieldIds: string[];
  rejectionReasonCodes: string[];
  noGoBoundaryIds: string[];
  upstreamEchoRequestVersions: string[];
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

export interface JavaV142ApprovalPrerequisiteArtifactIntakeEchoReference {
  sourceVersion: "Java v142";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-prerequisite-artifact-intake-echo-receipt.v1";
  echoMode: "java-v142-credential-resolver-approval-prerequisite-artifact-intake-echo-only";
  sourceSpan: "Node v306";
  nextNodeVersion: "Node v307";
  expectedProfileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV306Plan: boolean;
  readyForNodeV307: boolean;
  artifactContractEchoed: boolean;
  requiredFieldCountEchoed: boolean;
  prohibitedFieldCountEchoed: boolean;
  rejectionReasonCountEchoed: boolean;
  noGoBoundaryCountEchoed: boolean;
  upstreamEchoRequestsEchoed: boolean;
  necessityProofEchoed: boolean;
  noRuntimeImplementationEchoed: boolean;
  noRuntimeInvocationEchoed: boolean;
  noCredentialReadEchoed: boolean;
  noRawEndpointParseEchoed: boolean;
  noProviderClientInstantiationEchoed: boolean;
  noExternalRequestEchoed: boolean;
  noWriteOrMigrationEchoed: boolean;
  noMiniKvWriteOrAuthorityEchoed: boolean;
  noAutoStartBoundaryEchoed: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface MiniKvV135ApprovalPrerequisiteArtifactIntakeNonParticipationReceiptReference {
  sourceVersion: "mini-kv v135";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV306Plan: boolean;
  readyForNodeV307: boolean;
  sourceNodeV306ProfileVersion: string | null;
  sourceNodeV306PlanState: string | null;
  sourceNodeV306ArtifactDigest: string | null;
  requiredFieldCount: number | null;
  prohibitedFieldCount: number | null;
  rejectionReasonCount: number | null;
  noGoBoundaryCount: number | null;
  upstreamEchoRequestCount: number | null;
  checkCount: number | null;
  passedCheckCount: number | null;
  nonParticipationReceiptOnly: boolean;
  approvalPrerequisiteArtifactIntakePlanOnly: boolean;
  readOnlyArtifactContract: boolean;
  consumesNodeV306ApprovalPrerequisiteArtifactIntakePlan: boolean;
  consumesNodeV305StopPrerequisiteUpstreamEchoVerification: boolean;
  readyForNodeV307BeforeUpstreamEcho: boolean | null;
  runtimeShellImplemented: boolean | null;
  runtimeShellInvocationAllowed: boolean | null;
  executionAllowed: boolean | null;
  connectsManagedAudit: boolean | null;
  credentialValueRead: boolean | null;
  credentialValueAccepted: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  rawEndpointUrlAccepted: boolean | null;
  externalRequestSent: boolean | null;
  secretProviderInstantiated: boolean | null;
  resolverClientInstantiated: boolean | null;
  fakeSecretProviderInstantiated: boolean | null;
  fakeResolverClientInstantiated: boolean | null;
  schemaMigrationExecuted: boolean | null;
  approvalLedgerWritten: boolean | null;
  automaticUpstreamStart: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
  sideEffectBoundariesClosed: boolean;
}

export interface ApprovalPrerequisiteArtifactUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "approval-prerequisite-artifact-upstream-echo-verification-only";
  sourceSpan: "Node v306 + Java v142 + mini-kv v135";
  sourceNodeV306Ready: boolean;
  javaV142EchoReady: boolean;
  miniKvV135ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  artifactContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
}

export type ApprovalPrerequisiteArtifactUpstreamEchoVerificationChecks = {
  sourceNodeV306Ready: boolean;
  sourceNodeV306RequestsParallelEcho: boolean;
  sourceNodeV306ArtifactContractComplete: boolean;
  sourceNodeV306KeepsRuntimeBlocked: boolean;
  sourceNodeV306KeepsSideEffectsClosed: boolean;
  javaV142EvidencePresent: boolean;
  javaV142EchoesNodeV306Plan: boolean;
  javaV142ReadyForNodeV307: boolean;
  javaV142ArtifactContractEchoed: boolean;
  javaV142KeepsRuntimeBlocked: boolean;
  miniKvV135EvidencePresent: boolean;
  miniKvV135EchoesNodeV306Plan: boolean;
  miniKvV135ReadyForNodeV307: boolean;
  miniKvV135ArtifactContractEchoed: boolean;
  miniKvV135KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  artifactContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification: boolean;
};

export interface ApprovalPrerequisiteArtifactUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV306CheckCount: number;
  sourceNodeV306PassedCheckCount: number;
  javaEvidenceFileCount: number;
  javaMatchedSnippetCount: number;
  miniKvEvidenceFileCount: number;
  miniKvMatchedSnippetCount: number;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ApprovalPrerequisiteArtifactUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification"
    | "node-v306-approval-prerequisite-artifact-intake-plan"
    | "java-v142-approval-prerequisite-artifact-intake-echo"
    | "mini-kv-v135-approval-prerequisite-artifact-intake-non-participation"
    | "runtime-config";
  message: string;
}
