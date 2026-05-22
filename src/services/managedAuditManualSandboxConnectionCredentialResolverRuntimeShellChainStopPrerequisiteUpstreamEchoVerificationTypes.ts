import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification.v1";
  verificationState: "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready" | "blocked";
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  runtimeShellChainStopPrerequisiteUpstreamEchoVerificationOnly: true;
  consumesNodeV304StopPrerequisiteDecisionRecord: true;
  consumesJavaV141StopPrerequisiteDecisionEcho: true;
  consumesMiniKvV134StopPrerequisiteNonParticipationReceipt: true;
  activeNodeVerificationVersion: "Node v305";
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
  sourceNodeV304: SourceNodeV304StopPrerequisiteDecisionRecordReference;
  upstreamEvidence: {
    javaV141: JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference;
    miniKvV134: MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference;
  };
  echoVerification: RuntimeShellChainStopPrerequisiteUpstreamEchoVerification;
  checks: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationChecks;
  summary: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationSummary;
  productionBlockers: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[];
  warnings: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[];
  recommendations: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    runtimeShellChainStopPrerequisiteUpstreamEchoVerificationJson: string;
    runtimeShellChainStopPrerequisiteUpstreamEchoVerificationMarkdown: string;
    sourceNodeV304Json: string;
    sourceNodeV304Markdown: string;
    javaV141Support: string;
    javaV141Test: string;
    javaV141Explanation: string;
    javaV141Walkthrough: string;
    miniKvV134Receipt: string;
    miniKvV134Explanation: string;
    miniKvV134Walkthrough: string;
    activePlan: string;
    successorPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV304StopPrerequisiteDecisionRecordReference {
  sourceVersion: "Node v304";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record.v1";
  decisionRecordState: "runtime-shell-chain-stop-or-prerequisite-decision-record-ready" | "blocked";
  readyForDecisionRecord: boolean;
  readOnlyDecisionRecord: true;
  runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell";
  decisionDigest: string;
  sourceSpan: "Node v303 + Java v136 + mini-kv v133";
  selectedPath: "continue-only-as-blocked-prerequisite-review";
  stopRuntimeShellChainWithoutPrerequisites: true;
  allowsParallelJavaV141MiniKvV134EchoRequest: boolean;
  readyForNodeV305BeforeUpstreamEcho: false;
  prerequisiteCount: number;
  missingRuntimePrerequisiteCount: number;
  noGoConditionCount: number;
  necessityProofComplete: true;
  checkCount: number;
  passedCheckCount: number;
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

export interface JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference {
  sourceVersion: "Java v141";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-receipt.v1";
  echoMode: "java-v141-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-only";
  sourceSpan: "Node v304";
  nextNodeVersion: "Node v305";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV304Decision: boolean;
  readyForNodeV305: boolean;
  prerequisiteCountEchoed: boolean;
  noGoConditionCountEchoed: boolean;
  necessityProofEchoed: boolean;
  runtimeImplementationRejectedEchoed: boolean;
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

export interface MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference {
  sourceVersion: "mini-kv v134";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  echoesNodeV304Decision: boolean;
  readyForNodeV305: boolean;
  decisionRecordState: string | null;
  runtimeShellChainDecision: string | null;
  selectedPath: string | null;
  prerequisiteCount: number | null;
  missingRuntimePrerequisiteCount: number | null;
  noGoConditionCount: number | null;
  nonParticipationReceiptOnly: boolean;
  runtimeShellImplemented: boolean | null;
  runtimeShellInvocationAllowed: boolean | null;
  executionAllowed: boolean | null;
  connectsManagedAudit: boolean | null;
  credentialValueRead: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  externalRequestSent: boolean | null;
  schemaMigrationExecuted: boolean | null;
  approvalLedgerWritten: boolean | null;
  automaticUpstreamStart: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
  sideEffectBoundariesClosed: boolean;
}

export interface RuntimeShellChainStopPrerequisiteUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-only";
  sourceSpan: "Node v304 + Java v141 + mini-kv v134";
  sourceNodeV304Ready: boolean;
  javaV141EchoReady: boolean;
  miniKvV134ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  prerequisiteGateStillBlocked: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
}

export type RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationChecks = {
  sourceNodeV304Ready: boolean;
  sourceNodeV304RequestsParallelEcho: boolean;
  sourceNodeV304KeepsRuntimeBlocked: boolean;
  sourceNodeV304KeepsSideEffectsClosed: boolean;
  javaV141EvidencePresent: boolean;
  javaV141EchoesNodeV304: boolean;
  javaV141ReadyForNodeV305: boolean;
  javaV141KeepsRuntimeBlocked: boolean;
  miniKvV134EvidencePresent: boolean;
  miniKvV134EchoesNodeV304: boolean;
  miniKvV134ReadyForNodeV305: boolean;
  miniKvV134KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  prerequisiteGateStillBlocked: boolean;
  sideEffectBoundariesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification: boolean;
};

export interface RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV304CheckCount: number;
  sourceNodeV304PassedCheckCount: number;
  javaEvidenceFileCount: number;
  javaMatchedSnippetCount: number;
  miniKvEvidenceFileCount: number;
  miniKvMatchedSnippetCount: number;
  prerequisiteCount: number;
  missingRuntimePrerequisiteCount: number;
  noGoConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification"
    | "node-v304-runtime-shell-chain-stop-prerequisite-decision-record"
    | "java-v141-runtime-shell-stop-prerequisite-decision-echo"
    | "mini-kv-v134-runtime-shell-stop-prerequisite-non-participation"
    | "runtime-config";
  message: string;
}
