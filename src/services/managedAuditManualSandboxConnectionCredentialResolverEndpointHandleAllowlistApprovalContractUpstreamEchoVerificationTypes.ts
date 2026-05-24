import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  EndpointHandleAllowlistApprovalContract,
  EndpointHandleAllowlistApprovalContractIntakeChecks,
  EndpointHandleAllowlistApprovalContractIntakeSummary,
  EndpointHandleAllowlistApprovalPrerequisiteTransition,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification.v1";
  verificationState: "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready" | "blocked";
  runtimeShellChainDecision: "require-remaining-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  endpointHandleAllowlistApprovalContractUpstreamEchoVerificationOnly: true;
  consumesNodeV320EndpointHandleAllowlistApprovalContractIntake: true;
  consumesJavaV147EndpointHandleAllowlistApprovalContractEcho: true;
  consumesMiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceipt: true;
  observesJavaV148QualitySplit: true;
  activeNodeVerificationVersion: "Node v321";
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
  sourceNodeV320: SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference;
  upstreamEvidence: {
    javaV147: JavaV147EndpointHandleAllowlistApprovalContractEchoReference;
    miniKvV140: MiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceiptReference;
    javaV148QualitySplit: JavaV148QualitySplitReference;
  };
  echoVerification: EndpointHandleAllowlistApprovalContractUpstreamEchoVerification;
  checks: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks;
  summary: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationSummary;
  productionBlockers: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[];
  warnings: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[];
  recommendations: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

export interface SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference {
  sourceVersion: "Node v320";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake.v1";
  contractState: "endpoint-handle-allowlist-approval-contract-intake-ready" | "blocked";
  readyForEndpointHandleAllowlistApprovalContractIntake: boolean;
  targetPrerequisiteId: "endpoint-handle-allowlist-approval";
  contractDigest: string;
  endpointHandleAllowlistApprovalContract: EndpointHandleAllowlistApprovalContract;
  prerequisiteTransition: EndpointHandleAllowlistApprovalPrerequisiteTransition;
  checks: EndpointHandleAllowlistApprovalContractIntakeChecks;
  summary: EndpointHandleAllowlistApprovalContractIntakeSummary;
  nextJavaVersion: "Java v147";
  nextMiniKvVersion: "mini-kv v140";
  nextNodeVerificationVersion: "Node v321";
  readyForParallelJavaV147MiniKvV140Echo: boolean;
  requiredFieldIds: string[];
  prohibitedFieldIds: string[];
  rejectionReasonCodes: string[];
  noGoBoundaryIds: string[];
  upstreamEchoRequestVersions: Array<"Java v147" | "mini-kv v140">;
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

export interface JavaV147EndpointHandleAllowlistApprovalContractEchoReference {
  sourceVersion: "Java v147";
  receiptVersion: string;
  echoMode: "java-v147-endpoint-handle-allowlist-approval-contract-echo-only";
  sourceSpan: "Node v320";
  nextNodeVersion: "Node v321";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV320Plan: boolean;
  readyForNodeV321: boolean;
  endpointHandleAllowlistContractEchoed: boolean;
  requiredFieldCountEchoed: boolean;
  prohibitedFieldCountEchoed: boolean;
  rejectionReasonCountEchoed: boolean;
  noGoBoundaryCountEchoed: boolean;
  upstreamEchoRequestsEchoed: boolean;
  necessityProofEchoed: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface MiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceiptReference {
  sourceVersion: "mini-kv v140";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  sourceNodeV320ContractDigest: string | null;
  echoesNodeV320Plan: boolean;
  readyForNodeV321: boolean;
  requiredFieldCount: number | null;
  prohibitedFieldCount: number | null;
  rejectionReasonCount: number | null;
  noGoBoundaryCount: number | null;
  upstreamEchoRequestCount: number | null;
  nonParticipationReceiptOnly: boolean;
  readOnlyEndpointHandleAllowlistContract: boolean;
  consumesNodeV320EndpointHandleAllowlistApprovalContractIntake: boolean;
  readyForNodeV321BeforeUpstreamEcho: boolean;
  runtimeShellImplemented: boolean;
  runtimeShellInvocationAllowed: boolean;
  executionAllowed: boolean;
  connectsManagedAudit: boolean;
  credentialValueRead: boolean;
  rawEndpointUrlParsed: boolean;
  externalRequestSent: boolean;
  secretProviderInstantiated: boolean;
  resolverClientInstantiated: boolean;
  schemaMigrationExecuted: boolean;
  approvalLedgerWritten: boolean;
  automaticUpstreamStart: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  endpointAuthorityClaimed: boolean;
  endpointAllowlistAuthority: boolean;
  auditAuthoritative: boolean;
  orderAuthoritative: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface JavaV148QualitySplitReference {
  sourceVersion: "Java v148";
  purpose: "quality-only-response-records-split";
  evidencePresent: boolean;
  note: string;
}

export interface EndpointHandleAllowlistApprovalContractUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-only";
  sourceSpan: "Node v320 + Java v147 + mini-kv v140";
  sourceNodeV320Ready: boolean;
  javaV147EchoReady: boolean;
  miniKvV140ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  endpointHandleAllowlistContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  remainingPrerequisitesAfterV321: Array<"endpoint-handle-allowlist-approval" | "no-network-safety-fixture" | "abort-rollback-semantics">;
}

export type EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks = {
  sourceNodeV320Ready: boolean;
  sourceNodeV320RequestsParallelEcho: boolean;
  sourceNodeV320ContractComplete: boolean;
  sourceNodeV320KeepsRuntimeBlocked: boolean;
  sourceNodeV320KeepsSideEffectsClosed: boolean;
  javaV147EvidencePresent: boolean;
  javaV147EchoesNodeV320Plan: boolean;
  javaV147ReadyForNodeV321: boolean;
  javaV147EndpointHandleAllowlistContractEchoed: boolean;
  javaV147KeepsRuntimeBlocked: boolean;
  miniKvV140EvidencePresent: boolean;
  miniKvV140EchoesNodeV320Plan: boolean;
  miniKvV140ReadyForNodeV321: boolean;
  miniKvV140EndpointHandleAllowlistContractEchoed: boolean;
  miniKvV140KeepsRuntimeBlocked: boolean;
  javaV148QualitySplitObserved: boolean;
  upstreamEchoesAligned: boolean;
  endpointHandleAllowlistContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification: boolean;
};

export interface EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  requiredFieldCount: number;
  prohibitedFieldCount: number;
  rejectionReasonCount: number;
  noGoBoundaryCount: number;
  upstreamEchoRequestCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification"
    | "node-v320-endpoint-handle-allowlist-approval-contract-intake"
    | "java-v147-endpoint-handle-allowlist-approval-contract-echo"
    | "mini-kv-v140-endpoint-handle-allowlist-approval-contract-non-participation"
    | "runtime-config";
  message: string;
}
