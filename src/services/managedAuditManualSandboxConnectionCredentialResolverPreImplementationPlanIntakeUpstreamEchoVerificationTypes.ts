import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
  ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification.v1";
  verificationState: "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  planIntakeEchoVerificationOnly: true;
  readyForCredentialResolverPreImplementationPlan: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV270: SourceNodeV270PreImplementationPlanIntakeReference;
  upstreamEchoes: {
    javaV112: JavaV112PreImplementationPlanIntakeEchoReceiptReference;
    miniKvV119: MiniKvV119PreImplementationPlanIntakeNonParticipationReference;
  };
  echoVerification: CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification;
  checks: CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    sourceCheckCount: number;
    sourcePassedCheckCount: number;
    boundaryCount: number;
    definedBoundaryCount: number;
    missingBoundaryCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    planIntakeUpstreamEchoVerificationJson: string;
    planIntakeUpstreamEchoVerificationMarkdown: string;
    sourceNodeV270Json: string;
    sourceNodeV270Markdown: string;
    javaV112Runbook: string;
    javaV112Walkthrough: string;
    javaV112Builder: string;
    javaV112Support: string;
    javaV112Records: string;
    miniKvV119Receipt: string;
    miniKvV119Runbook: string;
    miniKvV119Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV270PreImplementationPlanIntakeReference {
  sourceVersion: "Node v270";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeProfile["profileVersion"];
  planIntakeState: ManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeProfile["planIntakeState"];
  readyForPlanIntake: boolean;
  planIntakeOnly: true;
  readOnlyPlanIntake: true;
  readyForCredentialResolverPreImplementationPlan: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV269Ready: boolean;
  sourceNodeV269KeepsBlockedDecision: boolean;
  sourceNodeV269KeepsRealResolverBlocked: boolean;
  planVersion: string;
  planMode: "plan-intake-only";
  planDigest: string;
  intakeDigest: string;
  boundaryCount: number;
  definedBoundaryCount: number;
  missingBoundaryCount: number;
  boundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  requirementCodes: CredentialResolverPreImplementationRequirementCode[];
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface JavaV112PreImplementationPlanIntakeEchoReceiptReference {
  sourceVersion: "Java v112";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  echoMode: string;
  consumedNodeVersion: "Node v270" | "missing";
  consumedNodeProfile: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1" | "missing";
  nextNodeConsumerVersion: "Node v272" | "missing";
  planIntakeState: "credential-resolver-pre-implementation-plan-intake-ready" | "missing";
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  boundaryCount: number;
  definedBoundaryCount: number;
  missingBoundaryCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  boundaryCodesEchoed: boolean;
  requirementCodesEchoed: boolean;
  planIntakeEchoed: boolean;
  sideEffectBoundaryEchoed: boolean;
  readyForNodeV272Alignment: boolean;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  connectsManagedAudit: false;
  approvalLedgerWritten: false;
  sqlExecuted: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  readyForManagedAuditSandboxAdapterConnection: false;
}

export interface MiniKvV119PreImplementationPlanIntakeNonParticipationReference {
  sourceVersion: "mini-kv v119";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  sourceProfileVersion: string | null;
  sourcePlanIntakeState: string | null;
  sourceReadyForPlanIntake: boolean | null;
  sourcePlanIntakeOnly: boolean | null;
  sourceReadOnlyPlanIntake: boolean | null;
  sourceReadyForCredentialResolverPreImplementationPlan: boolean | null;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean | null;
  sourceRealResolverImplementationAllowed: boolean | null;
  sourceExecutionAllowed: boolean | null;
  sourceConnectsManagedAudit: boolean | null;
  sourceCredentialValueRead: boolean | null;
  sourceRawEndpointUrlParsed: boolean | null;
  sourceExternalRequestSent: boolean | null;
  sourceSecretProviderInstantiated: boolean | null;
  sourceResolverClientInstantiated: boolean | null;
  sourceSchemaMigrationExecuted: boolean | null;
  sourceApprovalLedgerWritten: boolean | null;
  sourceAutomaticUpstreamStart: boolean | null;
  planVersion: string | null;
  planMode: string | null;
  planDigest: string | null;
  intakeDigest: string | null;
  boundaryCount: number | null;
  definedBoundaryCount: number | null;
  missingBoundaryCount: number | null;
  boundaryCodes: string[];
  requirementCodes: string[];
  checkCount: number | null;
  passedCheckCount: number | null;
  sourceCheckCount: number | null;
  sourcePassedCheckCount: number | null;
  productionBlockerCount: number | null;
  warningCount: number | null;
  recommendationCount: number | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  planIntakeOnly: boolean | null;
  readOnlyPlanIntake: boolean | null;
  receiptOnly: boolean | null;
  readyForCredentialResolverPreImplementationPlan: boolean | null;
  readyForManagedAuditSandboxAdapterConnection: boolean | null;
  realResolverImplementationAllowed: boolean | null;
  credentialResolverImplemented: boolean | null;
  credentialResolverInvoked: boolean | null;
  resolverClientInstantiated: boolean | null;
  secretProviderInstantiated: boolean | null;
  secretProviderRuntimeAllowed: boolean | null;
  credentialValueReadAllowed: boolean | null;
  credentialValueLoaded: boolean | null;
  credentialValueStored: boolean | null;
  credentialValueIncluded: boolean | null;
  rawEndpointUrlParseAllowed: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  rawEndpointUrlIncluded: boolean | null;
  externalRequestAllowed: boolean | null;
  externalRequestSent: boolean | null;
  connectsManagedAudit: boolean | null;
  storageWriteAllowed: boolean | null;
  writeCommandsExecuted: boolean | null;
  adminCommandsExecuted: boolean | null;
  approvalLedgerWriteAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  managedAuditWriteExecuted: boolean | null;
  schemaMigrationAllowed: boolean | null;
  schemaMigrationExecuted: boolean | null;
  restoreExecutionAllowed: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  nodeAutoStartAllowed: boolean | null;
  javaAutoStartAllowed: boolean | null;
  miniKvAutoStartAllowed: boolean | null;
  automaticUpstreamStartAllowed: boolean | null;
  automaticUpstreamStart: boolean | null;
  managedAuditStorageBackend: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
  readyForNodeV272Alignment: boolean;
}

export interface CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v112-plus-mini-kv-v119-plan-intake-upstream-echo-verification-only";
  sourceSpan: "Node v270 + Java v112 + mini-kv v119";
  sourceNodeV270Ready: boolean;
  javaV112EchoReady: boolean;
  miniKvV119NonParticipationReady: boolean;
  planIntakeStateAligned: boolean;
  planCountsAligned: boolean;
  boundaryCodesAligned: boolean;
  requirementCodesAligned: boolean;
  planIntakeVersionsAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  nodeV272KeepsRealResolverBlocked: true;
}

export type CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationChecks = {
  sourceNodeV270Ready: boolean;
  sourceNodeV270KeepsPlanIntakeOnly: boolean;
  sourceNodeV270KeepsRealResolverBlocked: boolean;
  javaV112EchoReady: boolean;
  miniKvV119NonParticipationReady: boolean;
  planIntakeStateAligned: boolean;
  planCountsAligned: boolean;
  boundaryCodesAligned: boolean;
  requirementCodesAligned: boolean;
  planIntakeVersionsAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  realResolverImplementationStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification: boolean;
};

export interface CredentialResolverPreImplementationPlanIntakeUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification"
    | "node-v270-credential-resolver-pre-implementation-plan-intake"
    | "java-v112-credential-resolver-pre-implementation-plan-intake-echo-receipt"
    | "mini-kv-v119-credential-resolver-pre-implementation-plan-intake-non-participation-receipt"
    | "runtime-config";
  message: string;
}
