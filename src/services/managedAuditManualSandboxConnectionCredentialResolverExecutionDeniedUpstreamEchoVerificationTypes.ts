import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification.v1";
  verificationState: "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification: false;
  readOnlyUpstreamEchoVerification: true;
  executionDeniedUpstreamEchoVerificationOnly: true;
  consumesNodeV290ExecutionDeniedRoutePreflight: true;
  consumesJavaV127V130QualityEvidence: true;
  consumesMiniKvV128ExecutionDeniedNonParticipationReceipt: true;
  javaExecutionDeniedEchoMissing: true;
  miniKvExecutionDeniedReceiptReady: boolean;
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
  sourceNodeV290: SourceNodeV290ExecutionDeniedRoutePreflightReference;
  upstreamEvidence: {
    javaV127V130: JavaV127V130QualityEvidenceReference;
    miniKvV128: MiniKvV128ExecutionDeniedNonParticipationReference;
  };
  echoVerification: ExecutionDeniedUpstreamEchoVerification;
  checks: ExecutionDeniedUpstreamEchoVerificationChecks;
  summary: ExecutionDeniedUpstreamEchoVerificationSummary;
  productionBlockers: ExecutionDeniedUpstreamEchoVerificationMessage[];
  warnings: ExecutionDeniedUpstreamEchoVerificationMessage[];
  recommendations: ExecutionDeniedUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    executionDeniedUpstreamEchoVerificationJson: string;
    executionDeniedUpstreamEchoVerificationMarkdown: string;
    sourceNodeV290Json: string;
    sourceNodeV290Markdown: string;
    javaV127Runbook: string;
    javaV128Runbook: string;
    javaV129Runbook: string;
    javaV130Runbook: string;
    miniKvV128Receipt: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV290ExecutionDeniedRoutePreflightReference {
  sourceVersion: "Node v290";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightProfile["profileVersion"];
  preflightState: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightProfile["preflightState"];
  readyForExecutionDeniedRoutePreflight: boolean;
  preflightDigest: string;
  routePath: string;
  denialReasonCount: number;
  simulatedAttemptCount: number;
  deniedAttemptCount: number;
  actualExecutionAttemptCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  readyForJavaV127MiniKvV128ParallelEvidence: boolean;
  executionDeniedRoutePreflightOnly: true;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
  fakeHarnessRuntimeEnabled: false;
  fakeHarnessInvocationAllowed: false;
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

export interface JavaV127V130QualityEvidenceReference {
  sourceVersion: "Java v127-v130";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: readonly HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  evidenceDigest: string | null;
  completedVersions: string[];
  liveAggregationSecondSplitDocumented: boolean;
  responseRecordsSecondSplitDocumented: boolean;
  overviewTestsSecondSplitDocumented: boolean;
  echoCatalogExtensionDocumented: boolean;
  noFakeHarnessRuntimeDocumented: boolean;
  credentialValueBoundaryDocumented: boolean;
  rawEndpointBoundaryDocumented: boolean;
  managedAuditConnectionBoundaryDocumented: boolean;
  ledgerAndSqlBoundaryDocumented: boolean;
  javaQualityEvidenceReady: boolean;
  javaExecutionDeniedEchoPresent: false;
}

export interface MiniKvV128ExecutionDeniedNonParticipationReference {
  sourceVersion: "mini-kv v128";
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: readonly HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptDigest: string | null;
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  sourcePreflight: string | null;
  sourceProfileVersion: string | null;
  sourcePreflightState: string | null;
  sourceReadyForExecutionDeniedRoutePreflight: boolean | null;
  sourceRoutePath: string | null;
  preflightDigest: string | null;
  sourceNodeV289VerificationDigest: string | null;
  readyForNodeV291UpstreamEchoVerification: boolean | null;
  executionDeniedNonParticipationReceiptOnly: boolean | null;
  executionDeniedRoutePreflightOnly: boolean | null;
  consumesNodeV290ExecutionDeniedRoutePreflight: boolean | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  actualExecutionAttemptCount: number | null;
  fakeHarnessRuntimeEnabled: boolean | null;
  fakeHarnessInvocationAllowed: boolean | null;
  fakeHarnessRuntimeImplemented: boolean | null;
  fakeHarnessRuntimeInvoked: boolean | null;
  credentialResolverImplemented: boolean | null;
  credentialResolverInvoked: boolean | null;
  resolverClientInstantiated: boolean | null;
  secretProviderInstantiated: boolean | null;
  fakeSecretProviderInstantiated: boolean | null;
  fakeResolverClientInstantiated: boolean | null;
  credentialValueReadAllowed: boolean | null;
  credentialValueRead: boolean | null;
  rawEndpointUrlParseAllowed: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  externalRequestAllowed: boolean | null;
  externalRequestSent: boolean | null;
  httpTcpDialAllowed: boolean | null;
  connectsManagedAudit: boolean | null;
  readsManagedAuditCredential: boolean | null;
  storesManagedAuditCredential: boolean | null;
  approvalGateRequired: boolean | null;
  approvalGateSatisfied: boolean | null;
  approvalLedgerWriteAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  schemaMigrationAllowed: boolean | null;
  schemaMigrationExecuted: boolean | null;
  restoreExecutionAllowed: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  automaticUpstreamStartAllowed: boolean | null;
  automaticUpstreamStart: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
  checkCount: number | null;
  passedCheckCount: number | null;
}

export interface ExecutionDeniedUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "node-v290-plus-java-v127-v130-plus-mini-kv-v128-execution-denied-upstream-echo-verification-only";
  sourceSpan: "Node v290 + Java v127-v130 + mini-kv v128";
  sourceNodeV290Ready: boolean;
  javaV127V130QualityEvidenceReady: boolean;
  miniKvV128NonParticipationReady: boolean;
  miniKvPreflightDigestAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  javaExecutionDeniedEchoMissing: true;
  implementationStillBlocked: true;
  readyForReadinessDecisionRecord: false;
}

export type ExecutionDeniedUpstreamEchoVerificationChecks = {
  sourceNodeV290Ready: boolean;
  sourceNodeV290DigestValid: boolean;
  sourceNodeV290KeepsRuntimeBlocked: boolean;
  sourceNodeV290KeepsConnectionBlocked: boolean;
  sourceNodeV290KeepsCredentialEndpointBoundariesClosed: boolean;
  javaV127V130EvidencePresent: boolean;
  javaQualityQueueDocumented: boolean;
  javaRuntimeBoundariesDocumented: boolean;
  javaExecutionDeniedEchoPresent: false;
  miniKvV128ReceiptReady: boolean;
  miniKvV128EchoesNodeV290: boolean;
  miniKvV128PreflightDigestAligned: boolean;
  miniKvV128KeepsRuntimeSideEffectsBlocked: boolean;
  sideEffectBoundaryClosed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification: false;
};

export interface ExecutionDeniedUpstreamEchoVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  evidenceFileCount: number;
  matchedSnippetCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  javaEvidenceFileCount: number;
  javaMatchedSnippetCount: number;
  javaCompletedVersionCount: number;
  miniKvEvidenceFileCount: number;
  miniKvMatchedSnippetCount: number;
  miniKvCheckCount: number | null;
  miniKvPassedCheckCount: number | null;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ExecutionDeniedUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification"
    | "node-v290-execution-denied-route-preflight"
    | "java-v127-v130-quality-evidence"
    | "mini-kv-v128-execution-denied-non-participation-receipt"
    | "runtime-config";
  message: string;
}
