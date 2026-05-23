import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  SignedHumanApprovalArtifactContractIntakeChecks,
  SignedHumanApprovalArtifactContractIntakeSummary,
  SignedHumanApprovalArtifactContract,
  SignedHumanApprovalArtifactPrerequisiteTransition,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1";
  verificationState: "signed-human-approval-artifact-contract-upstream-echo-verification-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  signedHumanApprovalArtifactContractUpstreamEchoVerificationOnly: true;
  consumesNodeV314SignedHumanApprovalArtifactContractIntake: true;
  consumesJavaV145SignedHumanApprovalArtifactContractIntakeEcho: true;
  consumesMiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceipt: true;
  activeNodeVerificationVersion: "Node v315";
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
  sourceNodeV314: SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference;
  upstreamEvidence: {
    javaV145: JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference;
    miniKvV138: MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference;
  };
  echoVerification: SignedHumanApprovalArtifactContractUpstreamEchoVerification;
  checks: SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks;
  summary: SignedHumanApprovalArtifactContractUpstreamEchoVerificationSummary;
  productionBlockers: SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[];
  warnings: SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[];
  recommendations: SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    signedHumanApprovalArtifactContractUpstreamEchoVerificationJson: string;
    signedHumanApprovalArtifactContractUpstreamEchoVerificationMarkdown: string;
    sourceNodeV314Json: string;
    sourceNodeV314Markdown: string;
    javaV145Support: string;
    javaV145Test: string;
    javaV145Explanation: string;
    javaV145Walkthrough: string;
    miniKvV138Receipt: string;
    miniKvV138Explanation: string;
    miniKvV138Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV314SignedHumanApprovalArtifactContractIntakeReference {
  sourceVersion: "Node v314";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake.v1";
  contractState: "signed-human-approval-artifact-contract-intake-ready" | "blocked";
  readyForArtifactIntake: boolean;
  contractDigest: string;
  signedArtifactContract: SignedHumanApprovalArtifactContract;
  prerequisiteTransition: SignedHumanApprovalArtifactPrerequisiteTransition;
  checks: SignedHumanApprovalArtifactContractIntakeChecks;
  summary: SignedHumanApprovalArtifactContractIntakeSummary;
  nextJavaVersion: "Java v145";
  nextMiniKvVersion: "mini-kv v138";
  nextNodeVerificationVersion: "Node v315";
  readyForParallelJavaV145MiniKvV138Echo: boolean;
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

export interface JavaV145SignedHumanApprovalArtifactContractIntakeEchoReference {
  sourceVersion: "Java v145";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-signed-human-approval-artifact-contract-echo-receipt.v1";
  echoMode: "java-v145-signed-human-approval-artifact-contract-echo-only";
  sourceSpan: "Node v314";
  nextNodeVersion: "Node v315";
  expectedProfileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV314Plan: boolean;
  readyForNodeV315: boolean;
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

export interface MiniKvV138SignedHumanApprovalArtifactContractIntakeNonParticipationReceiptReference {
  sourceVersion: "mini-kv v138";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV314Plan: boolean;
  readyForNodeV315: boolean;
  sourceNodeV314ProfileVersion: string | null;
  sourceNodeV314ContractState: string | null;
  sourceNodeV314ContractDigest: string | null;
  requiredFieldCount: number | null;
  prohibitedFieldCount: number | null;
  rejectionReasonCount: number | null;
  noGoBoundaryCount: number | null;
  upstreamEchoRequestCount: number | null;
  checkCount: number | null;
  passedCheckCount: number | null;
  nonParticipationReceiptOnly: boolean;
  signedHumanApprovalArtifactContractIntakeOnly: boolean;
  readOnlyArtifactContract: boolean;
  consumesNodeV314SignedHumanApprovalArtifactContractIntake: boolean;
  consumesNodeV312GovernanceStopPrerequisiteClosureDecision: boolean;
  consumesNodeV313PrerequisiteCatalog: boolean;
  readyForNodeV315BeforeUpstreamEcho: boolean | null;
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

export interface SignedHumanApprovalArtifactContractUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "signed-human-approval-artifact-contract-upstream-echo-verification-only";
  sourceSpan: "Node v314 + Java v145 + mini-kv v138";
  sourceNodeV314Ready: boolean;
  javaV145EchoReady: boolean;
  miniKvV138ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  artifactContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
}

export type SignedHumanApprovalArtifactContractUpstreamEchoVerificationChecks = {
  sourceNodeV314Ready: boolean;
  sourceNodeV314RequestsParallelEcho: boolean;
  sourceNodeV314ArtifactContractComplete: boolean;
  sourceNodeV314KeepsRuntimeBlocked: boolean;
  sourceNodeV314KeepsSideEffectsClosed: boolean;
  javaV145EvidencePresent: boolean;
  javaV145EchoesNodeV314Plan: boolean;
  javaV145ReadyForNodeV315: boolean;
  javaV145ArtifactContractEchoed: boolean;
  javaV145KeepsRuntimeBlocked: boolean;
  miniKvV138EvidencePresent: boolean;
  miniKvV138EchoesNodeV314Plan: boolean;
  miniKvV138ReadyForNodeV315: boolean;
  miniKvV138ArtifactContractEchoed: boolean;
  miniKvV138KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  artifactContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification: boolean;
};

export interface SignedHumanApprovalArtifactContractUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV314CheckCount: number;
  sourceNodeV314PassedCheckCount: number;
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

export interface SignedHumanApprovalArtifactContractUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification"
    | "node-v314-signed-human-approval-artifact-contract-intake"
    | "java-v145-signed-human-approval-artifact-contract-echo"
    | "mini-kv-v138-signed-human-approval-artifact-contract-non-participation"
    | "runtime-config";
  message: string;
}


