import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification.v1";
  verificationState: "runtime-shell-decision-record-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  runtimeShellDecisionRecordUpstreamEchoVerificationOnly: true;
  consumesNodeV299RuntimeShellCandidateGateDecisionRecord: true;
  consumesJavaV135RuntimeShellDecisionRecordEcho: true;
  consumesMiniKvV132RuntimeShellDecisionRecordNonParticipationReceipt: true;
  readyForPostRuntimeShellDecisionPlan: boolean;
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
  testOnlyFakeHarnessAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
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
  sourceNodeV299: SourceNodeV299RuntimeShellCandidateGateDecisionRecordReference;
  upstreamEvidence: {
    javaV135: JavaV135RuntimeShellDecisionRecordEchoReference;
    miniKvV132: MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference;
  };
  echoVerification: RuntimeShellDecisionRecordUpstreamEchoVerification;
  checks: RuntimeShellDecisionRecordUpstreamEchoVerificationChecks;
  summary: RuntimeShellDecisionRecordUpstreamEchoVerificationSummary;
  productionBlockers: RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[];
  warnings: RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[];
  recommendations: RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    runtimeShellDecisionRecordUpstreamEchoVerificationJson: string;
    runtimeShellDecisionRecordUpstreamEchoVerificationMarkdown: string;
    sourceNodeV299Json: string;
    sourceNodeV299Markdown: string;
    javaV135Support: string;
    javaV135Test: string;
    javaV135Walkthrough: string;
    miniKvV132Receipt: string;
    miniKvV132Explanation: string;
    miniKvV132Walkthrough: string;
    activePlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV299RuntimeShellCandidateGateDecisionRecordReference {
  sourceVersion: "Node v299";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile["profileVersion"];
  decisionRecordState: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecordProfile["decisionRecordState"];
  runtimeShellDecision: "blocked";
  readyForDecisionRecord: boolean;
  readOnlyDecisionRecord: true;
  runtimeShellCandidateGateDecisionRecordOnly: true;
  consumesNodeV298RuntimeShellCandidateGateUpstreamEchoVerification: true;
  readyForParallelJavaV135MiniKvV132EchoRequest: boolean;
  readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification: false;
  decisionDigest: string;
  decisionSourceSpan: "Node v297-v298 + Java v134 + mini-kv v131";
  upstreamEchoVerified: boolean;
  requiredEvidenceCount: number;
  missingRequiredEvidenceCount: number;
  noGoConditionCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  runtimeShellImplemented: false;
  runtimeShellEnabled: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
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
}

export interface JavaV135RuntimeShellDecisionRecordEchoReference {
  sourceVersion: "Java v135";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-decision-record-echo-receipt.v1";
  echoMode: "java-v135-credential-resolver-runtime-shell-decision-record-echo-only";
  sourceSpan: "Node v299";
  nextNodeVersion: "Node v300";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  readyForNodeV300: boolean;
  echoesNodeV299DecisionRecord: boolean;
  blockedDecisionEchoed: boolean;
  requiredEvidenceEchoed: boolean;
  noGoConditionsEchoed: boolean;
  noRuntimeImplementationEchoed: boolean;
  noRuntimeInvocationEchoed: boolean;
  noCredentialReadEchoed: boolean;
  noRawEndpointParseEchoed: boolean;
  noExternalRequestEchoed: boolean;
  noLedgerOrSchemaWriteEchoed: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference {
  sourceVersion: "mini-kv v132";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  readyForNodeV300: boolean;
  echoesNodeV299DecisionRecord: boolean;
  blockedDecisionEchoed: boolean;
  runtimeShellDecisionRecordOnly: boolean;
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
  sideEffectBoundariesClosed: boolean;
}

export interface RuntimeShellDecisionRecordUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "runtime-shell-decision-record-upstream-echo-verification-only";
  sourceSpan: "Node v299 + Java v135 + mini-kv v132";
  sourceNodeV299Ready: boolean;
  javaV135EchoReady: boolean;
  miniKvV132ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  blockedDecisionAligned: boolean;
  requiredEvidenceAligned: boolean;
  noGoConditionsAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
}

export type RuntimeShellDecisionRecordUpstreamEchoVerificationChecks = {
  sourceNodeV299Loaded: boolean;
  sourceNodeV299Ready: boolean;
  sourceNodeV299DecisionBlocked: boolean;
  sourceNodeV299KeepsRuntimeBlocked: boolean;
  sourceNodeV299KeepsSideEffectsClosed: boolean;
  javaV135EvidencePresent: boolean;
  javaV135ReadyForNodeV300: boolean;
  javaV135EchoesNodeV299: boolean;
  javaV135KeepsRuntimeBlocked: boolean;
  miniKvV132EvidencePresent: boolean;
  miniKvV132ReadyForNodeV300: boolean;
  miniKvV132EchoesNodeV299: boolean;
  miniKvV132KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification: boolean;
};

export interface RuntimeShellDecisionRecordUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  javaEvidenceFileCount: number;
  javaMatchedSnippetCount: number;
  miniKvEvidenceFileCount: number;
  miniKvMatchedSnippetCount: number;
  requiredEvidenceCount: number;
  missingRequiredEvidenceCount: number;
  noGoConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeShellDecisionRecordUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification"
    | "node-v299-runtime-shell-candidate-gate-decision-record"
    | "java-v135-runtime-shell-decision-record-echo"
    | "mini-kv-v132-runtime-shell-decision-record-non-participation"
    | "runtime-config";
  message: string;
}
