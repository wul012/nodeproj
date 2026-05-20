import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification.v1";
  verificationState: "credential-resolver-approval-required-boundary-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  approvalRequiredBoundaryEchoVerificationOnly: true;
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
  sourceNodeV274: SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference;
  upstreamEchoes: {
    javaV115: JavaV115ApprovalRequiredBoundaryEchoReference;
    miniKvV121: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference;
  };
  echoVerification: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification;
  checks: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    sourceCheckCount: number;
    sourcePassedCheckCount: number;
    approvalRequiredBoundaryCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    approvalRequiredBoundaryUpstreamEchoVerificationJson: string;
    approvalRequiredBoundaryUpstreamEchoVerificationMarkdown: string;
    sourceNodeV274Json: string;
    sourceNodeV274Markdown: string;
    javaV115Runbook: string;
    javaV115Walkthrough: string;
    javaV115Builder: string;
    javaV115Support: string;
    javaV115Records: string;
    miniKvV121Receipt: string;
    miniKvV121Runbook: string;
    miniKvV121Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference {
  sourceVersion: "Node v274";
  profileVersion: string;
  verificationState: string;
  readyForDisabledCandidateUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  disabledCandidateEchoVerificationOnly: true;
  readyForDisabledResolverInterfaceCandidate: boolean;
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
  candidateDigest: string;
  candidateDecisionCount: number;
  candidateReadyDecisionCount: number;
  approvalRequiredDecisionCount: number;
  approvalRequiredBoundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  approvalRequiredRequirementCodes: CredentialResolverPreImplementationRequirementCode[];
  sourceNodeV273Ready: boolean;
  javaV113EchoReady: boolean;
  miniKvV120NonParticipationReady: boolean;
  candidateCountsAligned: boolean;
  approvalRequiredBoundaryCodesAligned: boolean;
  interfaceShapeAligned: boolean;
  fakeWiringAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  javaEchoWorkflowTemplateApplied: boolean;
  checkCount: number;
  passedCheckCount: number;
}

export interface JavaV115ApprovalRequiredBoundaryEchoReference {
  sourceVersion: "Java v115";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v34" | "missing";
  echoMode: "java-v115-credential-resolver-approval-required-boundary-echo-refinement-only" | "missing";
  proofClaimPresent: boolean;
  nodeVerificationActionPresent: boolean;
  approvalRequiredBoundaryExplanationsEchoed: boolean;
  approvalRequiredBoundaryExplanationCount: number;
  approvalRequiredBoundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  approvalRequiredRequirementCodes: CredentialResolverPreImplementationRequirementCode[];
  evidenceAllowedMode: "approval-required-read-only-evidence" | "missing";
  credentialValueReadAllowed: false;
  rawEndpointUrlParseAllowed: false;
  managedAuditConnectionAllowed: false;
  approvalLedgerWriteAllowed: false;
  sqlExecutionAllowed: false;
  rollbackExecutionAllowed: false;
  automaticUpstreamStartAllowed: false;
  approvalLedgerWritten: false;
  sqlExecuted: false;
  schemaMigrationExecuted: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  echoWorkflowTemplateApplied: boolean;
  recordsSplitApplied: boolean;
  readyForNodeV275Alignment: boolean;
}

export interface MiniKvV121ApprovalRequiredBoundaryNonParticipationReference {
  sourceVersion: "mini-kv v121";
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
  sourceVerificationState: string | null;
  sourceReady: boolean | null;
  sourceReadOnlyUpstreamEchoVerification: boolean | null;
  sourceDisabledCandidateEchoVerificationOnly: boolean | null;
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
  sourceNodeV274CheckCount: number | null;
  sourceNodeV274PassedCheckCount: number | null;
  sourceCandidateDecisionCount: number | null;
  sourceCandidateReadyDecisionCount: number | null;
  sourceApprovalRequiredDecisionCount: number | null;
  sourceApprovalRequiredBoundaryCodes: string[];
  sourceCandidateDigest: string | null;
  approvalRequiredBoundaryCount: number | null;
  approvalRequiredBoundaryCodes: string[];
  approvalRequiredBoundaryDetails: MiniKvV121ApprovalRequiredBoundaryDetail[];
  checks: Record<string, boolean | null>;
  sourceNodeV274Checks: Record<string, boolean | null>;
  checkCount: number | null;
  passedCheckCount: number | null;
  sourceCheckCount: number | null;
  sourcePassedCheckCount: number | null;
  productionBlockerCount: number | null;
  warningCount: number | null;
  recommendationCount: number | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  approvalRequiredBoundaryNonParticipationReceiptOnly: boolean | null;
  approvalRequiredBoundaryRefinementOnly: boolean | null;
  readyForApprovalRequiredBoundaryUpstreamEcho: boolean | null;
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
  readsManagedAuditCredential: boolean | null;
  storesManagedAuditCredential: boolean | null;
  storageWriteAllowed: boolean | null;
  writeCommandsExecuted: boolean | null;
  adminCommandsExecuted: boolean | null;
  runtimeWriteObserved: boolean | null;
  approvalLedgerWriteAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  approvalLedgerWriteExecuted: boolean | null;
  managedAuditWriteExecuted: boolean | null;
  productionRecordWritten: boolean | null;
  schemaMigrationAllowed: boolean | null;
  schemaMigrationExecuted: boolean | null;
  restoreExecutionAllowed: boolean | null;
  loadRestoreCompactExecuted: boolean | null;
  setnxexExecutionAllowed: boolean | null;
  automaticUpstreamStartAllowed: boolean | null;
  automaticUpstreamStart: boolean | null;
  managedAuditStorageBackend: boolean | null;
  auditAuthoritative: boolean | null;
  orderAuthoritative: boolean | null;
  readyForNodeV275Alignment: boolean;
}

export interface MiniKvV121ApprovalRequiredBoundaryDetail {
  code: string;
  owner: string;
  reason: string;
  mini_kv_position: string;
  prohibited_runtime_actions: string[];
  read_only: boolean;
  approval_required: boolean;
  mini_kv_participates: boolean;
}

export interface CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v115-plus-mini-kv-v121-approval-required-boundary-upstream-echo-verification-only";
  sourceSpan: "Node v274 + Java v115 + mini-kv v121";
  sourceNodeV274Ready: boolean;
  javaV115EchoReady: boolean;
  miniKvV121NonParticipationReady: boolean;
  approvalRequiredBoundaryScopeAligned: boolean;
  approvalRequiredExplanationsAligned: boolean;
  prohibitedRuntimeActionsAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  javaEchoWorkflowTemplateApplied: boolean;
  javaRecordsSplitApplied: boolean;
  nodeV275KeepsRealResolverBlocked: true;
}

export type CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks = {
  sourceNodeV274Ready: boolean;
  sourceNodeV274KeepsReadOnlyEchoOnly: boolean;
  sourceNodeV274KeepsRealResolverBlocked: boolean;
  sourceNodeV274KeepsBoundaryAlignment: boolean;
  javaV115EchoReady: boolean;
  miniKvV121NonParticipationReady: boolean;
  approvalRequiredBoundaryCountAligned: boolean;
  approvalRequiredBoundaryCodesAligned: boolean;
  approvalRequiredRequirementCodesAligned: boolean;
  javaApprovalRequiredExplanationsComplete: boolean;
  miniKvApprovalRequiredDetailsComplete: boolean;
  prohibitedRuntimeActionsAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  javaEchoWorkflowTemplateApplied: boolean;
  javaRecordsSplitApplied: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  realResolverImplementationStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification: boolean;
};

export interface CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification"
    | "node-v274-credential-resolver-disabled-candidate-upstream-echo-verification"
    | "java-v115-credential-resolver-approval-required-boundary-echo-refinement"
    | "mini-kv-v121-credential-resolver-approval-required-boundary-non-participation-receipt"
    | "runtime-config";
  message: string;
}
