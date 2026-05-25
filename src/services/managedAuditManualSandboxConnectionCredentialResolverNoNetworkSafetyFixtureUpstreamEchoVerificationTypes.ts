import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  NoNetworkSafetyFixtureContract,
  NoNetworkSafetyFixtureContractIntakeChecks,
  NoNetworkSafetyFixtureContractIntakeSummary,
  NoNetworkSafetyFixturePrerequisiteTransition,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification.v1";
  verificationState: "no-network-safety-fixture-upstream-echo-verification-ready" | "blocked";
  runtimeShellChainDecision: "require-abort-rollback-semantics-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  noNetworkSafetyFixtureUpstreamEchoVerificationOnly: true;
  consumesNodeV323NoNetworkSafetyFixtureContractIntake: true;
  consumesJavaV149NoNetworkSafetyFixtureContractEcho: true;
  consumesMiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceipt: true;
  activeNodeVerificationVersion: "Node v324";
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
  networkSocketOpened: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  fakeSecretProviderInstantiated: false;
  fakeResolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV323: SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference;
  upstreamEvidence: {
    javaV149: JavaV149NoNetworkSafetyFixtureContractEchoReference;
    miniKvV141: MiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceiptReference;
  };
  echoVerification: NoNetworkSafetyFixtureUpstreamEchoVerification;
  checks: NoNetworkSafetyFixtureUpstreamEchoVerificationChecks;
  summary: NoNetworkSafetyFixtureUpstreamEchoVerificationSummary;
  productionBlockers: NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[];
  warnings: NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[];
  recommendations: NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

export interface SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference {
  sourceVersion: "Node v323";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake.v1";
  contractState: "no-network-safety-fixture-contract-intake-ready" | "blocked";
  readyForNoNetworkSafetyFixtureContractIntake: boolean;
  targetPrerequisiteId: "no-network-safety-fixture";
  contractDigest: string;
  noNetworkSafetyFixtureContract: NoNetworkSafetyFixtureContract;
  prerequisiteTransition: NoNetworkSafetyFixturePrerequisiteTransition;
  checks: NoNetworkSafetyFixtureContractIntakeChecks;
  summary: NoNetworkSafetyFixtureContractIntakeSummary;
  nextJavaVersion: "Java v149";
  nextMiniKvVersion: "mini-kv v141";
  nextNodeVerificationVersion: "Node v324";
  readyForParallelJavaV149MiniKvV141Echo: boolean;
  requiredFieldIds: string[];
  prohibitedFieldIds: string[];
  rejectionReasonCodes: string[];
  noGoBoundaryIds: string[];
  upstreamEchoRequestVersions: Array<"Java v149" | "mini-kv v141">;
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
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface JavaV149NoNetworkSafetyFixtureContractEchoReference {
  sourceVersion: "Java v149";
  receiptVersion: string;
  echoMode: "java-v149-no-network-safety-fixture-contract-echo-only";
  sourceSpan: "Node v323 + Java v147";
  nextNodeVersion: "Node v324";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV323Plan: boolean;
  readyForNodeV324: boolean;
  noNetworkSafetyFixtureContractEchoed: boolean;
  requiredFieldCountEchoed: boolean;
  prohibitedFieldCountEchoed: boolean;
  rejectionReasonCountEchoed: boolean;
  noGoBoundaryCountEchoed: boolean;
  upstreamEchoRequestsEchoed: boolean;
  necessityProofEchoed: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface MiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceiptReference {
  sourceVersion: "mini-kv v141";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  sourceNodeV323ContractDigest: string | null;
  echoesNodeV323Plan: boolean;
  readyForNodeV324: boolean;
  requiredFieldCount: number | null;
  prohibitedFieldCount: number | null;
  rejectionReasonCount: number | null;
  noGoBoundaryCount: number | null;
  upstreamEchoRequestCount: number | null;
  nonParticipationReceiptOnly: boolean;
  readOnlyNoNetworkSafetyFixtureContract: boolean;
  consumesNodeV323NoNetworkSafetyFixtureContractIntake: boolean;
  readyForNodeV324BeforeUpstreamEcho: boolean;
  runtimeShellImplemented: boolean;
  runtimeShellInvocationAllowed: boolean;
  executionAllowed: boolean;
  connectsManagedAudit: boolean;
  credentialValueRead: boolean;
  rawEndpointUrlParsed: boolean;
  externalRequestSent: boolean;
  networkSafetyFixtureExecuted: boolean;
  networkFixtureExecutionAllowed: boolean;
  networkSafetyAuthority: boolean;
  httpRequestSent: boolean;
  tcpConnectionAttempted: boolean;
  networkSocketOpened: boolean;
  secretProviderInstantiated: boolean;
  resolverClientInstantiated: boolean;
  schemaMigrationExecuted: boolean;
  approvalLedgerWritten: boolean;
  automaticUpstreamStart: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  auditAuthoritative: boolean;
  orderAuthoritative: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface NoNetworkSafetyFixtureUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "no-network-safety-fixture-upstream-echo-verification-only";
  sourceSpan: "Node v323 + Java v149 + mini-kv v141";
  sourceNodeV323Ready: boolean;
  javaV149EchoReady: boolean;
  miniKvV141ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  noNetworkSafetyFixtureContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  remainingPrerequisitesAfterV324: Array<"no-network-safety-fixture" | "abort-rollback-semantics">;
}

export type NoNetworkSafetyFixtureUpstreamEchoVerificationChecks = {
  sourceNodeV323Ready: boolean;
  sourceNodeV323RequestsParallelEcho: boolean;
  sourceNodeV323ContractComplete: boolean;
  sourceNodeV323KeepsRuntimeBlocked: boolean;
  sourceNodeV323KeepsSideEffectsClosed: boolean;
  javaV149EvidencePresent: boolean;
  javaV149EchoesNodeV323Plan: boolean;
  javaV149ReadyForNodeV324: boolean;
  javaV149NoNetworkSafetyFixtureContractEchoed: boolean;
  javaV149KeepsRuntimeBlocked: boolean;
  miniKvV141EvidencePresent: boolean;
  miniKvV141EchoesNodeV323Plan: boolean;
  miniKvV141ReadyForNodeV324: boolean;
  miniKvV141NoNetworkSafetyFixtureContractEchoed: boolean;
  miniKvV141KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  noNetworkSafetyFixtureContractAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification: boolean;
};

export interface NoNetworkSafetyFixtureUpstreamEchoVerificationSummary {
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

export interface NoNetworkSafetyFixtureUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification"
    | "node-v323-no-network-safety-fixture-contract-intake"
    | "java-v149-no-network-safety-fixture-contract-echo"
    | "mini-kv-v141-no-network-safety-fixture-contract-non-participation"
    | "runtime-config";
  message: string;
}
