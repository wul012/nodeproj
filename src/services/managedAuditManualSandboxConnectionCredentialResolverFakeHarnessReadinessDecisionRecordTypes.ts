import type {
  ManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecordProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record.v1";
  decisionRecordState: "fake-harness-readiness-decision-record-ready" | "blocked";
  readinessDecision: "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord: boolean;
  readOnlyDecisionRecord: true;
  fakeHarnessReadinessDecisionOnly: true;
  consumesNodeV291ExecutionDeniedUpstreamEchoVerification: true;
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
  sourceNodeV291: SourceNodeV291ExecutionDeniedUpstreamEchoVerificationReference;
  readinessDecisionRecord: FakeHarnessReadinessDecisionRecord;
  checks: FakeHarnessReadinessDecisionRecordChecks;
  summary: FakeHarnessReadinessDecisionRecordSummary;
  productionBlockers: FakeHarnessReadinessDecisionRecordMessage[];
  warnings: FakeHarnessReadinessDecisionRecordMessage[];
  recommendations: FakeHarnessReadinessDecisionRecordMessage[];
  evidenceEndpoints: {
    fakeHarnessReadinessDecisionRecordJson: string;
    fakeHarnessReadinessDecisionRecordMarkdown: string;
    sourceNodeV291Json: string;
    sourceNodeV291Markdown: string;
    activePlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV291ExecutionDeniedUpstreamEchoVerificationReference {
  sourceVersion: "Node v291";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: "blocked";
  readyForExecutionDeniedUpstreamEchoVerification: false;
  verificationDigest: string;
  sourceSpan: "Node v290 + Java v127-v130 + mini-kv v128";
  sourceNodeV290Ready: boolean;
  javaV127V130QualityEvidenceReady: boolean;
  javaExecutionDeniedEchoMissing: true;
  javaExecutionDeniedEchoPresent: false;
  miniKvV128NonParticipationReady: boolean;
  miniKvPreflightDigestAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  readOnlyUpstreamEchoVerification: true;
  executionDeniedUpstreamEchoVerificationOnly: true;
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

export interface FakeHarnessReadinessDecisionRecord {
  decisionDigest: string;
  recordMode: "credential-resolver-fake-harness-readiness-decision-record-only";
  decisionScope: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness";
  sourceSpan: "Node v287-v291";
  decision: "blocked";
  decisionReason: string;
  allowsDisabledRuntimeShellPlanning: false;
  allowsFakeHarnessRuntimeImplementation: false;
  allowsFakeHarnessRuntimeInvocation: false;
  allowsRealResolverImplementation: false;
  allowsSecretProviderInstantiation: false;
  allowsResolverClientInstantiation: false;
  allowsCredentialValueRead: false;
  allowsRawEndpointUrlParse: false;
  allowsExternalRequest: false;
  allowsManagedAuditConnection: false;
  allowsSchemaMigration: false;
  allowsApprovalLedgerWrite: false;
  allowsAutomaticUpstreamStart: false;
  requiredEvidenceCount: number;
  noGoConditionCount: number;
  requiredEvidence: FakeHarnessReadinessRequirement[];
  explicitNoGoConditions: FakeHarnessReadinessNoGoCondition[];
}

export interface FakeHarnessReadinessRequirement {
  id: string;
  label: string;
  currentEvidence: string;
  status: "present" | "missing";
  requiredBeforeRuntimeShell: boolean;
}

export interface FakeHarnessReadinessNoGoCondition {
  code: string;
  condition: string;
  action: "pause-and-do-not-plan-runtime-shell";
}

export type FakeHarnessReadinessDecisionRecordChecks = {
  sourceNodeV291Loaded: boolean;
  sourceNodeV291BlockedAsExpected: boolean;
  sourceNodeV291StillBlocksRuntime: boolean;
  sourceNodeV291StillBlocksCredentialEndpoint: boolean;
  sourceNodeV291StillBlocksConnectionWritesAndAutoStart: boolean;
  nodeV290PreflightReady: boolean;
  javaQualityEvidencePresent: boolean;
  javaDirectExecutionDeniedEchoMissing: boolean;
  miniKvV128ReceiptReady: boolean;
  miniKvV128PreflightDigestAligned: boolean;
  sideEffectBoundariesClosed: boolean;
  readinessDecisionBlocksRuntimeShell: boolean;
  decisionRecordStillReadOnly: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord: boolean;
};

export interface FakeHarnessReadinessDecisionRecordSummary {
  checkCount: number;
  passedCheckCount: number;
  requiredEvidenceCount: number;
  missingRequiredEvidenceCount: number;
  noGoConditionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface FakeHarnessReadinessDecisionRecordMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record"
    | "node-v291-execution-denied-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
