import type {
  ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateTypes.js";
import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification.v1";
  verificationState: "credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  blockedDecisionVerificationOnly: true;
  readyForCredentialResolverPreImplementationPlan: false;
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
  automaticUpstreamStart: false;
  sourceNodeV268: SourceNodeV268ProductionReadinessDecisionGateReference;
  upstreamEchoes: {
    javaV111: JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference;
    miniKvV118: MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference;
  };
  echoVerification: CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification;
  checks: CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    sourceCheckCount: number;
    sourcePassedCheckCount: number;
    missingPreImplementationRequirementCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    blockedDecisionUpstreamEchoVerificationJson: string;
    blockedDecisionUpstreamEchoVerificationMarkdown: string;
    sourceNodeV268Json: string;
    sourceNodeV268Markdown: string;
    javaV111Runbook: string;
    javaV111Walkthrough: string;
    javaV111Support: string;
    miniKvV118Receipt: string;
    miniKvV118Runbook: string;
    miniKvV118Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV268ProductionReadinessDecisionGateReference {
  sourceVersion: "Node v268";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGateProfile["profileVersion"];
  decisionGateState: "blocked";
  readinessDecision: "blocked";
  decisionDigest: string;
  decisionMode: "node-v268-production-readiness-decision-gate-only";
  sourceSpan: "Node v267";
  decisionGateEvaluated: true;
  productionReadinessGateOnly: true;
  readOnlyDecisionGate: true;
  sourceNodeV267Ready: boolean;
  sourceNodeV267BlocksRealResolver: boolean;
  archiveEchoChainReady: boolean;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  archiveFileCount: number;
  evidenceFileCount: number;
  requiredSnippetCount: number;
  matchedSnippetCount: number;
  missingPreImplementationRequirementCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  productionBlockerCodes: string[];
  readyForCredentialResolverPreImplementationPlan: false;
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
  automaticUpstreamStart: false;
}

export interface JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference {
  sourceVersion: "Java v111";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  decisionEchoMode: string;
  consumedNodeVersion: "Node v268" | "missing";
  consumedNodeProfile: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1" | "missing";
  nextNodeConsumerVersion: "Node v269" | "missing";
  readinessDecision: "blocked" | "missing";
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  archiveFileCount: number;
  evidenceFileCount: number;
  requiredSnippetCount: number;
  matchedSnippetCount: number;
  missingPreImplementationRequirementCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  blockerCodesEchoed: boolean;
  blockedDecisionEchoed: boolean;
  preImplementationRequirementsEchoed: boolean;
  sideEffectBoundaryEchoed: boolean;
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
  readyForNodeV269Alignment: boolean;
}

export interface MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference {
  sourceVersion: "mini-kv v118";
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
  sourceDecisionGateState: string | null;
  sourceReadinessDecision: string | null;
  sourceDecisionMode: string | null;
  sourceNodeV267Ready: boolean;
  sourceNodeV267BlocksRealResolver: boolean;
  archiveEchoChainReady: boolean;
  checkCount: number | null;
  passedCheckCount: number | null;
  sourceCheckCount: number | null;
  sourcePassedCheckCount: number | null;
  archiveFileCount: number | null;
  evidenceFileCount: number | null;
  requiredSnippetCount: number | null;
  matchedSnippetCount: number | null;
  missingPreImplementationRequirementCount: number | null;
  productionBlockerCount: number | null;
  warningCount: number | null;
  recommendationCount: number | null;
  productionBlockerCodes: string[];
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  blockedDecisionOnly: boolean | null;
  productionReadinessGateOnly: boolean | null;
  readOnlyDecisionGate: boolean | null;
  readyForCredentialResolverPreImplementationPlan: boolean | null;
  readyForManagedAuditSandboxAdapterConnection: boolean | null;
  realResolverImplementationAllowed: boolean | null;
  credentialResolverImplemented: boolean | null;
  credentialResolverInvoked: boolean | null;
  resolverClientInstantiated: boolean | null;
  secretProviderInstantiated: boolean | null;
  secretProviderStubDefined: boolean | null;
  secretProviderRuntimeAllowed: boolean | null;
  nodeAutoStartAllowed: boolean | null;
  javaAutoStartAllowed: boolean | null;
  miniKvAutoStartAllowed: boolean | null;
  externalAuditServiceAutoStartAllowed: boolean | null;
  connectionExecutionAllowed: boolean | null;
  storageWriteAllowed: boolean | null;
  managedAuditWriteExecuted: boolean | null;
  approvalLedgerWriteAllowed: boolean | null;
  approvalLedgerWriteExecuted: boolean | null;
  credentialValueReadAllowed: boolean | null;
  credentialValueLoaded: boolean | null;
  credentialValueStored: boolean | null;
  credentialValueIncluded: boolean | null;
  rawEndpointUrlParsed: boolean | null;
  rawEndpointUrlIncluded: boolean | null;
  externalRequestSent: boolean | null;
  schemaMigrationExecutionAllowed: boolean | null;
  restoreExecutionAllowed: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  managedAuditStorageBackend: boolean | null;
  orderAuthoritative: boolean | null;
  readyForNodeV269Alignment: boolean;
}

export interface CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v111-plus-mini-kv-v118-blocked-decision-upstream-echo-verification-only";
  sourceSpan: "Node v268 + Java v111 + mini-kv v118";
  sourceNodeV268Ready: boolean;
  javaV111EchoReady: boolean;
  miniKvV118NonParticipationReady: boolean;
  blockedDecisionAligned: boolean;
  decisionModeAligned: boolean;
  countSummaryAligned: boolean;
  missingRequirementBlockersAligned: boolean;
  readOnlyDecisionGateAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  nodeV269KeepsRealResolverBlocked: true;
}

export type CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationChecks = {
  sourceNodeV268Ready: boolean;
  sourceNodeV268DecisionBlocked: boolean;
  sourceNodeV268KeepsRealResolverBlocked: boolean;
  javaV111EchoReady: boolean;
  miniKvV118NonParticipationReady: boolean;
  blockedDecisionAligned: boolean;
  decisionModeAligned: boolean;
  countSummaryAligned: boolean;
  missingRequirementBlockersAligned: boolean;
  readOnlyDecisionGateAligned: boolean;
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
  readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification: boolean;
};

export interface CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification"
    | "node-v268-credential-resolver-production-readiness-decision-gate"
    | "java-v111-credential-resolver-production-readiness-blocked-decision-echo-receipt"
    | "mini-kv-v118-credential-resolver-production-readiness-blocked-decision-non-participation-receipt"
    | "runtime-config";
  message: string;
}
