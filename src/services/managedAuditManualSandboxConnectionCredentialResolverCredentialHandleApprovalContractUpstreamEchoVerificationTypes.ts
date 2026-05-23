import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  CredentialHandleApprovalContract,
  CredentialHandleApprovalContractIntakeChecks,
  CredentialHandleApprovalContractIntakeSummary,
  CredentialHandleApprovalPrerequisiteTransition,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification.v1";
  verificationState: "credential-handle-approval-contract-upstream-echo-verification-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  credentialHandleApprovalContractUpstreamEchoVerificationOnly: true;
  consumesNodeV317CredentialHandleApprovalContractIntake: true;
  consumesJavaV146CredentialHandleApprovalContractIntakeEcho: true;
  consumesMiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceipt: true;
  activeNodeVerificationVersion: "Node v318";
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
  sourceNodeV317: SourceNodeV317CredentialHandleApprovalContractIntakeReference;
  upstreamEvidence: {
    javaV146: JavaV146CredentialHandleApprovalContractIntakeEchoReference;
    miniKvV139: MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference;
  };
  echoVerification: CredentialHandleApprovalContractUpstreamEchoVerification;
  checks: CredentialHandleApprovalContractUpstreamEchoVerificationChecks;
  summary: CredentialHandleApprovalContractUpstreamEchoVerificationSummary;
  productionBlockers: CredentialHandleApprovalContractUpstreamEchoVerificationMessage[];
  warnings: CredentialHandleApprovalContractUpstreamEchoVerificationMessage[];
  recommendations: CredentialHandleApprovalContractUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    credentialHandleApprovalContractUpstreamEchoVerificationJson: string;
    credentialHandleApprovalContractUpstreamEchoVerificationMarkdown: string;
    sourceNodeV317Json: string;
    sourceNodeV317Markdown: string;
    javaV146Support: string;
    javaV146Catalog: string;
    javaV146Test: string;
    javaV146Explanation: string;
    javaV146Walkthrough: string;
    miniKvV139Receipt: string;
    miniKvV139Explanation: string;
    miniKvV139Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV317CredentialHandleApprovalContractIntakeReference {
  sourceVersion: "Node v317";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake.v1";
  contractState: "credential-handle-approval-contract-intake-ready" | "blocked";
  readyForCredentialHandleApprovalContractIntake: boolean;
  contractDigest: string;
  credentialHandleApprovalContract: CredentialHandleApprovalContract;
  prerequisiteTransition: CredentialHandleApprovalPrerequisiteTransition;
  checks: CredentialHandleApprovalContractIntakeChecks;
  summary: CredentialHandleApprovalContractIntakeSummary;
  targetPrerequisiteId: "credential-handle-approval";
  nextJavaVersion: "Java v146";
  nextMiniKvVersion: "mini-kv v139";
  nextNodeVerificationVersion: "Node v318";
  readyForParallelJavaV146MiniKvV139Echo: boolean;
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

export interface JavaV146CredentialHandleApprovalContractIntakeEchoReference {
  sourceVersion: "Java v146";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-credential-handle-approval-contract-echo-receipt.v1";
  echoMode: "java-v146-credential-handle-approval-contract-echo-only";
  sourceSpan: "Node v317";
  nextNodeVersion: "Node v318";
  expectedProfileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification.v1";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV317Plan: boolean;
  readyForNodeV318: boolean;
  credentialHandleContractEchoed: boolean;
  requiredFieldCountEchoed: boolean;
  prohibitedFieldCountEchoed: boolean;
  rejectionReasonCountEchoed: boolean;
  noGoBoundaryCountEchoed: boolean;
  upstreamEchoRequestsEchoed: boolean;
  necessityProofEchoed: boolean;
  noRuntimeImplementationEchoed: boolean;
  noRuntimeInvocationEchoed: boolean;
  noCredentialReadEchoed: boolean;
  noCredentialAuthorityClaimedEchoed: boolean;
  noRawEndpointParseEchoed: boolean;
  noProviderClientInstantiationEchoed: boolean;
  noExternalRequestEchoed: boolean;
  noWriteOrMigrationEchoed: boolean;
  noAutoStartBoundaryEchoed: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference {
  sourceVersion: "mini-kv v139";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV317Plan: boolean;
  readyForNodeV318: boolean;
  sourceNodeV317ProfileVersion: string | null;
  sourceNodeV317ContractState: string | null;
  sourceNodeV317ContractDigest: string | null;
  requiredFieldCount: number | null;
  prohibitedFieldCount: number | null;
  rejectionReasonCount: number | null;
  noGoBoundaryCount: number | null;
  upstreamEchoRequestCount: number | null;
  checkCount: number | null;
  passedCheckCount: number | null;
  nonParticipationReceiptOnly: boolean;
  credentialHandleApprovalContractIntakeOnly: boolean;
  readOnlyCredentialHandleContract: boolean;
  consumesNodeV317CredentialHandleApprovalContractIntake: boolean;
  consumesNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReview: boolean;
  consumesNodeV313PrerequisiteCatalog: boolean;
  readyForNodeV318BeforeUpstreamEcho: boolean | null;
  runtimeShellImplemented: boolean | null;
  runtimeShellInvocationAllowed: boolean | null;
  executionAllowed: boolean | null;
  connectsManagedAudit: boolean | null;
  credentialValueRead: boolean | null;
  credentialValueAccepted: boolean | null;
  credentialHandleStored: boolean | null;
  credentialHandleValidated: boolean | null;
  credentialHandleResolved: boolean | null;
  credentialHandleAuthoritative: boolean | null;
  credentialApprovalStatusAuthoritative: boolean | null;
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

export interface CredentialHandleApprovalContractUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "credential-handle-approval-contract-upstream-echo-verification-only";
  sourceSpan: "Node v317 + Java v146 + mini-kv v139";
  sourceNodeV317Ready: boolean;
  javaV146EchoReady: boolean;
  miniKvV139ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  credentialHandleContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
}

export type CredentialHandleApprovalContractUpstreamEchoVerificationChecks = {
  sourceNodeV317Ready: boolean;
  sourceNodeV317RequestsParallelEcho: boolean;
  sourceNodeV317ContractComplete: boolean;
  sourceNodeV317KeepsRuntimeBlocked: boolean;
  sourceNodeV317KeepsSideEffectsClosed: boolean;
  javaV146EvidencePresent: boolean;
  javaV146EchoesNodeV317Plan: boolean;
  javaV146ReadyForNodeV318: boolean;
  javaV146CredentialHandleContractEchoed: boolean;
  javaV146KeepsRuntimeBlocked: boolean;
  miniKvV139EvidencePresent: boolean;
  miniKvV139EchoesNodeV317Plan: boolean;
  miniKvV139ReadyForNodeV318: boolean;
  miniKvV139CredentialHandleContractEchoed: boolean;
  miniKvV139KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  credentialHandleContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification: boolean;
};

export interface CredentialHandleApprovalContractUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV317CheckCount: number;
  sourceNodeV317PassedCheckCount: number;
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

export interface CredentialHandleApprovalContractUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification"
    | "node-v317-credential-handle-approval-contract-intake"
    | "java-v146-credential-handle-approval-contract-echo"
    | "mini-kv-v139-credential-handle-approval-contract-non-participation"
    | "runtime-config";
  message: string;
}
