import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification.v1";
  verificationState: "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  fakeHarnessReadinessBlockedDecisionVerificationOnly: true;
  consumesNodeV292FakeHarnessReadinessDecisionRecord: true;
  consumesJavaV131DirectExecutionDeniedEcho: true;
  consumesMiniKvV129ReceiptRetentionCheck: true;
  readyForDisabledRuntimeShellPlanning: false;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
  fakeHarnessRuntimeEnabled: false;
  fakeHarnessInvocationAllowed: false;
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
  sourceNodeV292: SourceNodeV292FakeHarnessReadinessDecisionRecordReference;
  upstreamEvidence: {
    javaV131: JavaV131DirectExecutionDeniedEchoReference;
    miniKvV129: MiniKvV129ReceiptRetentionCheckReference;
  };
  echoVerification: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification;
  checks: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationChecks;
  summary: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationSummary;
  productionBlockers: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[];
  warnings: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[];
  recommendations: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    fakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationJson: string;
    fakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMarkdown: string;
    sourceNodeV292Json: string;
    sourceNodeV292Markdown: string;
    javaV131Runbook: string;
    javaV131Walkthrough: string;
    miniKvV129Receipt: string;
    miniKvV129Runbook: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV292FakeHarnessReadinessDecisionRecordReference {
  sourceVersion: "Node v292";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile["profileVersion"];
  decisionRecordState: ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile["decisionRecordState"];
  readinessDecision: "blocked";
  readyForFakeHarnessReadinessDecisionRecord: boolean;
  decisionDigest: string;
  sourceSpan: "Node v287-v291";
  requiredEvidenceCount: number;
  missingRequiredEvidenceCount: number;
  noGoConditionCount: number;
  productionBlockerCount: number;
  readOnlyDecisionRecord: true;
  fakeHarnessReadinessDecisionOnly: true;
  javaDirectExecutionDeniedEchoMissing: boolean;
  miniKvV128NonParticipationReady: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: boolean;
  readyForDisabledRuntimeShellPlanning: false;
  readyForManagedAuditResolverImplementation: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  fakeSecretProviderInstantiated: false;
  fakeResolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface JavaV131DirectExecutionDeniedEchoReference {
  sourceVersion: "Java v131";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: readonly HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  directExecutionDeniedEchoPresent: boolean;
  readyForNodeV293: boolean;
  echoMode: "java-v131-credential-resolver-direct-execution-denied-echo-only" | "missing";
  noFakeHarnessRuntime: boolean;
  credentialValueBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  managedAuditConnectionBoundaryClosed: boolean;
  ledgerSqlSchemaBoundaryClosed: boolean;
  automaticUpstreamStartBlocked: boolean;
}

export interface MiniKvV129ReceiptRetentionCheckReference {
  sourceVersion: "mini-kv v129";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: readonly HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  sourceNodeV292Ready: boolean | null;
  sourceNodeV292BlockedAsExpected: boolean | null;
  sourceNodeV291Loaded: boolean | null;
  v128ReceiptDigestStable: boolean | null;
  readyForNodeV293: boolean | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  fakeHarnessRuntimeImplemented: boolean | null;
  fakeHarnessRuntimeInvoked: boolean | null;
  credentialValueRead: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  externalRequestSent: boolean | null;
  connectsManagedAudit: boolean | null;
  storageWriteAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  schemaMigrationExecuted: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  automaticUpstreamStart: boolean | null;
  orderAuthoritative: boolean | null;
  productionBlockerCount: number | null;
}

export interface FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "node-v292-plus-java-v131-plus-mini-kv-v129-fake-harness-readiness-blocked-decision-upstream-echo-verification-only";
  sourceSpan: "Node v292 + Java v131 + mini-kv v129";
  sourceNodeV292Ready: boolean;
  javaV131EchoReady: boolean;
  miniKvV129RetentionReady: boolean;
  blockedDecisionAligned: boolean;
  missingJavaEchoResolved: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  readyForDisabledRuntimeShellPlanning: false;
}

export type FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationChecks = {
  sourceNodeV292Ready: boolean;
  sourceNodeV292KeepsReadinessBlocked: boolean;
  sourceNodeV292KeepsRuntimeShellBlocked: boolean;
  javaV131EvidencePresent: boolean;
  javaV131DirectExecutionDeniedEchoReady: boolean;
  miniKvV129EvidencePresent: boolean;
  miniKvV129RetentionCheckReady: boolean;
  blockedDecisionAligned: boolean;
  missingJavaEchoResolvedByJavaV131: boolean;
  sideEffectBoundariesClosed: boolean;
  credentialBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  connectionBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  autoStartBoundaryClosed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification: boolean;
};

export interface FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  evidenceFileCount: number;
  matchedSnippetCount: number;
  sourceRequiredEvidenceCount: number;
  sourceMissingRequiredEvidenceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification"
    | "node-v292-fake-harness-readiness-decision-record"
    | "java-v131-direct-execution-denied-echo"
    | "mini-kv-v129-receipt-retention-check"
    | "runtime-config";
  message: string;
}
