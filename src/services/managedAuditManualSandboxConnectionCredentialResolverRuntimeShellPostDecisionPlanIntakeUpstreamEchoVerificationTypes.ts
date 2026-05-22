import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification.v1";
  verificationState: "runtime-shell-post-decision-plan-intake-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  runtimeShellPostDecisionPlanIntakeUpstreamEchoVerificationOnly: true;
  consumesNodeV301PostDecisionContinuationPlanIntake: true;
  consumesNodeV302PostDecisionContinuationCatalogQualityPass: true;
  consumesJavaV136PostDecisionPlanIntakeEcho: true;
  consumesMiniKvV133PostDecisionPlanIntakeNonParticipationReceipt: true;
  legacyNodeV302ConsumerMarkerAccepted: true;
  activeNodeVerificationVersion: "Node v303";
  readyForPostDecisionRuntimeShellChainStopDecision: boolean;
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
  sourceNodeV301: SourceNodeV301PostDecisionPlanIntakeReference;
  sourceNodeV302: SourceNodeV302PostDecisionCatalogQualityPassReference;
  upstreamEvidence: {
    javaV136: JavaV136RuntimeShellPostDecisionPlanIntakeEchoReference;
    miniKvV133: MiniKvV133RuntimeShellPostDecisionPlanIntakeNonParticipationReceiptReference;
  };
  echoVerification: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification;
  checks: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationChecks;
  summary: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationSummary;
  productionBlockers: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[];
  warnings: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[];
  recommendations: RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    runtimeShellPostDecisionPlanIntakeUpstreamEchoVerificationJson: string;
    runtimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMarkdown: string;
    sourceNodeV301Json: string;
    sourceNodeV301Markdown: string;
    sourceNodeV302Json: string;
    sourceNodeV302Markdown: string;
    javaV136Support: string;
    javaV136Test: string;
    javaV136Walkthrough: string;
    miniKvV133Receipt: string;
    miniKvV133Explanation: string;
    miniKvV133Walkthrough: string;
    closedPlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV301PostDecisionPlanIntakeReference {
  sourceVersion: "Node v301";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-plan-intake.v1";
  planIntakeState: "runtime-shell-post-decision-continuation-plan-intake-ready" | "blocked";
  readyForPlanIntake: boolean;
  readOnlyPlanIntake: true;
  intakeDigest: string;
  selectedContinuationDecision: "continue-blocked-planning";
  legacyNextNodeVerificationVersion: "Node v302";
  nextNodeVerificationVersion: "Node v303";
  nextJavaEchoVersion: "Java v136";
  nextMiniKvReceiptVersion: "mini-kv v133";
  proofComplete: boolean;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
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

export interface SourceNodeV302PostDecisionCatalogQualityPassReference {
  sourceVersion: "Node v302";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-continuation-catalog-quality-pass.v1";
  qualityPassState: "runtime-shell-post-decision-continuation-catalog-quality-pass-ready" | "blocked";
  readyForCatalogQualityPass: boolean;
  activeNodeVerificationTarget: "Node v303";
  consumesNodeV301PostDecisionContinuationPlanIntake: true;
  consumesJavaV136PostDecisionPlanIntakeEcho: false;
  consumesMiniKvV133PostDecisionPlanIntakeReceipt: false;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
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

export interface JavaV136RuntimeShellPostDecisionPlanIntakeEchoReference {
  sourceVersion: "Java v136";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-post-decision-plan-intake-echo-receipt.v1";
  echoMode: "java-v136-credential-resolver-runtime-shell-post-decision-plan-intake-echo-only";
  sourceSpan: "Node v301";
  legacyNextNodeVersion: "Node v302";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  legacyReadyForNodeV302: boolean;
  echoesNodeV301PlanIntake: boolean;
  selectedContinuationDecisionEchoed: boolean;
  continuationOptionsEchoed: boolean;
  necessityProofEchoed: boolean;
  runtimeImplementationRejectedEchoed: boolean;
  noRuntimeImplementationEchoed: boolean;
  noRuntimeInvocationEchoed: boolean;
  noCredentialReadEchoed: boolean;
  noRawEndpointParseEchoed: boolean;
  noProviderClientInstantiationEchoed: boolean;
  noExternalRequestEchoed: boolean;
  noWriteOrMigrationEchoed: boolean;
  noAutoStartBoundaryEchoed: boolean;
  sideEffectBoundariesClosed: boolean;
}

export interface MiniKvV133RuntimeShellPostDecisionPlanIntakeNonParticipationReceiptReference {
  sourceVersion: "mini-kv v133";
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  legacyReadyForNodeV302: boolean;
  echoesNodeV301PlanIntake: boolean;
  planIntakeState: string | null;
  selectedContinuationDecision: string | null;
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

export interface RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "runtime-shell-post-decision-plan-intake-upstream-echo-verification-only";
  sourceSpan: "Node v301 + Node v302 + Java v136 + mini-kv v133";
  sourceNodeV301Ready: boolean;
  sourceNodeV302QualityPassReady: boolean;
  javaV136EchoReady: boolean;
  miniKvV133ReceiptReady: boolean;
  upstreamEchoAligned: boolean;
  legacyNodeV302MarkersAccepted: boolean;
  activeNodeV303TargetConfirmed: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
}

export type RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationChecks = {
  sourceNodeV301Ready: boolean;
  sourceNodeV301UsesActiveNodeV303Target: boolean;
  sourceNodeV301KeepsRuntimeBlocked: boolean;
  sourceNodeV301KeepsSideEffectsClosed: boolean;
  sourceNodeV302QualityPassReady: boolean;
  sourceNodeV302ConfirmsActiveNodeV303Target: boolean;
  sourceNodeV302DidNotConsumeUpstreamEchoes: boolean;
  javaV136EvidencePresent: boolean;
  javaV136LegacyReadyForNodeV302: boolean;
  javaV136EchoesNodeV301: boolean;
  javaV136KeepsRuntimeBlocked: boolean;
  miniKvV133EvidencePresent: boolean;
  miniKvV133LegacyReadyForNodeV302: boolean;
  miniKvV133EchoesNodeV301: boolean;
  miniKvV133KeepsRuntimeBlocked: boolean;
  upstreamEchoesAligned: boolean;
  legacyNodeV302ConsumerMarkersAccepted: boolean;
  activeNodeV303VerificationTargetConfirmed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionPlanIntakeUpstreamEchoVerification: boolean;
};

export interface RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV301CheckCount: number;
  sourceNodeV301PassedCheckCount: number;
  sourceNodeV302CheckCount: number;
  sourceNodeV302PassedCheckCount: number;
  javaEvidenceFileCount: number;
  javaMatchedSnippetCount: number;
  miniKvEvidenceFileCount: number;
  miniKvMatchedSnippetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeShellPostDecisionPlanIntakeUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-post-decision-plan-intake-upstream-echo-verification"
    | "node-v301-post-decision-continuation-plan-intake"
    | "node-v302-post-decision-continuation-catalog-quality-pass"
    | "java-v136-runtime-shell-post-decision-plan-intake-echo"
    | "mini-kv-v133-runtime-shell-post-decision-plan-intake-non-participation"
    | "runtime-config";
  message: string;
}
