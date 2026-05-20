import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewTypes.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification.v1";
  verificationState: "credential-resolver-disabled-candidate-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification: boolean;
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
  sourceNodeV273: SourceNodeV273DisabledImplementationCandidateReviewReference;
  upstreamEchoes: {
    javaV113: JavaV113DisabledImplementationCandidateEchoReceiptReference;
    miniKvV120: MiniKvV120DisabledImplementationCandidateNonParticipationReference;
  };
  echoVerification: CredentialResolverDisabledCandidateUpstreamEchoVerification;
  checks: CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    sourceCheckCount: number;
    sourcePassedCheckCount: number;
    candidateDecisionCount: number;
    candidateReadyDecisionCount: number;
    approvalRequiredDecisionCount: number;
    requestFieldCount: number;
    responseFieldCount: number;
    failureClassCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    disabledCandidateUpstreamEchoVerificationJson: string;
    disabledCandidateUpstreamEchoVerificationMarkdown: string;
    sourceNodeV273Json: string;
    sourceNodeV273Markdown: string;
    javaV113Runbook: string;
    javaV113Walkthrough: string;
    javaV113Builder: string;
    javaV113Support: string;
    javaV113Records: string;
    miniKvV120Receipt: string;
    miniKvV120Runbook: string;
    miniKvV120Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV273DisabledImplementationCandidateReviewReference {
  sourceVersion: "Node v273";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile["profileVersion"];
  reviewState: ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile["reviewState"];
  readyForDisabledImplementationCandidateReview: boolean;
  disabledImplementationCandidateReviewOnly: true;
  readOnlyCandidateReview: true;
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
  sourceNodeV272Ready: boolean;
  sourceNodeV272KeepsReadOnlyEchoOnly: boolean;
  sourceNodeV272KeepsRealResolverBlocked: boolean;
  sourceNodeV272KeepsBoundaryAlignment: boolean;
  candidateVersion: string;
  candidateMode: string;
  candidateDigest: string;
  candidateDecisionCount: number;
  candidateReadyDecisionCount: number;
  approvalRequiredDecisionCount: number;
  candidateReadyBoundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  approvalRequiredBoundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  boundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  requirementCodes: CredentialResolverPreImplementationRequirementCode[];
  requestFields: readonly string[];
  responseFields: readonly string[];
  failureClasses: readonly string[];
  handleOnlyRequest: true;
  includesCredentialValue: false;
  includesRawEndpointUrl: false;
  fakeWiringReviewOnly: true;
  fakeRuntimeInstantiated: false;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface JavaV113DisabledImplementationCandidateEchoReceiptReference {
  sourceVersion: "Java v113";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  echoMode: string;
  consumedNodeVersion: "Node v273" | "missing";
  consumedNodeProfile: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1" | "missing";
  nextNodeConsumerVersion: "Node v274" | "missing";
  reviewState: "credential-resolver-disabled-implementation-candidate-review-ready" | "missing";
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  candidateDecisionCount: number;
  candidateReadyDecisionCount: number;
  approvalRequiredDecisionCount: number;
  requestFieldCount: number;
  responseFieldCount: number;
  failureClassCount: number;
  boundaryCodesEchoed: boolean;
  requirementCodesEchoed: boolean;
  candidateReadyBoundaryCodesEchoed: boolean;
  approvalRequiredBoundaryCodesEchoed: boolean;
  interfaceShapeEchoed: boolean;
  fakeWiringEchoed: boolean;
  sideEffectBoundaryEchoed: boolean;
  echoWorkflowTemplateApplied: boolean;
  readyForNodeV274Alignment: boolean;
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

export interface MiniKvV120DisabledImplementationCandidateNonParticipationReference {
  sourceVersion: "mini-kv v120";
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
  sourceReviewState: string | null;
  sourceReadyForDisabledImplementationCandidateReview: boolean | null;
  sourceDisabledImplementationCandidateReviewOnly: boolean | null;
  sourceReadOnlyCandidateReview: boolean | null;
  sourceReadyForDisabledResolverInterfaceCandidate: boolean | null;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean | null;
  sourceRealResolverImplementationAllowed: boolean | null;
  sourceExecutionAllowed: boolean | null;
  sourceConnectsManagedAudit: boolean | null;
  sourceReadsManagedAuditCredential: boolean | null;
  sourceStoresManagedAuditCredential: boolean | null;
  sourceCredentialValueRead: boolean | null;
  sourceRawEndpointUrlParsed: boolean | null;
  sourceExternalRequestSent: boolean | null;
  sourceSecretProviderInstantiated: boolean | null;
  sourceResolverClientInstantiated: boolean | null;
  sourceSchemaMigrationExecuted: boolean | null;
  sourceApprovalLedgerWritten: boolean | null;
  sourceAutomaticUpstreamStart: boolean | null;
  sourceNodeV272Ready: boolean | null;
  sourceNodeV272Digest: string | null;
  sourceNodeV272BoundaryCodes: string[];
  sourceNodeV272RequirementCodes: string[];
  candidateVersion: string | null;
  candidateMode: string | null;
  candidateDigest: string | null;
  candidateDecisionCount: number | null;
  candidateReadyDecisionCount: number | null;
  approvalRequiredDecisionCount: number | null;
  candidateReadyBoundaryCodes: string[];
  approvalRequiredBoundaryCodes: string[];
  requestFieldCount: number | null;
  responseFieldCount: number | null;
  failureClassCount: number | null;
  handleOnlyRequest: boolean | null;
  includesCredentialValue: boolean | null;
  includesRawEndpointUrl: boolean | null;
  sendsExternalRequest: boolean | null;
  instantiatesSecretProvider: boolean | null;
  instantiatesResolverClient: boolean | null;
  fakeWiringReviewOnly: boolean | null;
  fakeRuntimeInstantiated: boolean | null;
  realSecretProviderAllowed: boolean | null;
  realManagedAuditTransportAllowed: boolean | null;
  checkCount: number | null;
  passedCheckCount: number | null;
  sourceCheckCount: number | null;
  sourcePassedCheckCount: number | null;
  productionBlockerCount: number | null;
  warningCount: number | null;
  recommendationCount: number | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  disabledImplementationCandidateReviewOnly: boolean | null;
  readOnlyCandidateReview: boolean | null;
  receiptOnly: boolean | null;
  readyForDisabledResolverInterfaceCandidate: boolean | null;
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
  approvalLedgerWriteAllowed: boolean | null;
  approvalLedgerWritten: boolean | null;
  managedAuditWriteExecuted: boolean | null;
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
  readyForNodeV274Alignment: boolean;
}

export interface CredentialResolverDisabledCandidateUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v113-plus-mini-kv-v120-disabled-candidate-upstream-echo-verification-only";
  sourceSpan: "Node v273 + Java v113 + mini-kv v120";
  sourceNodeV273Ready: boolean;
  javaV113EchoReady: boolean;
  miniKvV120NonParticipationReady: boolean;
  candidateCountsAligned: boolean;
  boundaryScopesAligned: boolean;
  interfaceShapeAligned: boolean;
  fakeWiringAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  javaEchoWorkflowTemplateApplied: boolean;
  nodeV274KeepsRealResolverBlocked: true;
}

export type CredentialResolverDisabledCandidateUpstreamEchoVerificationChecks = {
  sourceNodeV273Ready: boolean;
  sourceNodeV273KeepsReviewOnly: boolean;
  sourceNodeV273KeepsRealResolverBlocked: boolean;
  sourceNodeV273KeepsBoundaryAlignment: boolean;
  javaV113EchoReady: boolean;
  miniKvV120NonParticipationReady: boolean;
  candidateCountsAligned: boolean;
  boundaryCodesAligned: boolean;
  candidateReadyBoundaryCodesAligned: boolean;
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
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  realResolverImplementationStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification: boolean;
};

export interface CredentialResolverDisabledCandidateUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification"
    | "node-v273-credential-resolver-disabled-implementation-candidate-review"
    | "java-v113-credential-resolver-disabled-implementation-candidate-echo-receipt"
    | "mini-kv-v120-credential-resolver-disabled-implementation-candidate-non-participation-receipt"
    | "runtime-config";
  message: string;
}
