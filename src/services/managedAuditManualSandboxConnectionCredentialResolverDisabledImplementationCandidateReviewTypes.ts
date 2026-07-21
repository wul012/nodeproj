import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  PlanEchoProfile,
} from "./preImplementation/types.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1";
  reviewState: "credential-resolver-disabled-implementation-candidate-review-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview: boolean;
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
  sourceNodeV272: SourceNodeV272PlanIntakeUpstreamEchoVerificationReference;
  disabledImplementationCandidate: CredentialResolverDisabledImplementationCandidateReview;
  checks: CredentialResolverDisabledImplementationCandidateReviewChecks;
  summary: {
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
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverDisabledImplementationCandidateReviewMessage[];
  warnings: CredentialResolverDisabledImplementationCandidateReviewMessage[];
  recommendations: CredentialResolverDisabledImplementationCandidateReviewMessage[];
  evidenceEndpoints: {
    disabledImplementationCandidateReviewJson: string;
    disabledImplementationCandidateReviewMarkdown: string;
    sourceNodeV272Json: string;
    sourceNodeV272Markdown: string;
    activePlan: string;
    recommendedParallelJavaV113: string;
    recommendedParallelMiniKvV120: string;
  };
  nextActions: string[];
}

export interface SourceNodeV272PlanIntakeUpstreamEchoVerificationReference {
  sourceVersion: "Node v272";
  profileVersion: PlanEchoProfile["profileVersion"];
  verificationState: PlanEchoProfile["verificationState"];
  readyForPlanIntakeUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  planIntakeEchoVerificationOnly: true;
  sourceSpan: "Node v270 + Java v112 + mini-kv v119";
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
  planVersion: string;
  planMode: "plan-intake-only";
  planDigest: string;
  intakeDigest: string;
  boundaryCount: number;
  definedBoundaryCount: number;
  missingBoundaryCount: number;
  boundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  requirementCodes: CredentialResolverPreImplementationRequirementCode[];
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
  verificationDigest: string;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface CredentialResolverDisabledImplementationCandidateReview {
  candidateVersion: "node-v273-credential-resolver-disabled-implementation-candidate-review.v1";
  candidateMode: "disabled-interface-and-fake-wiring-review-only";
  sourceSpan: "Node v272";
  candidateDigest: string;
  candidateDecisionCount: number;
  candidateReadyDecisionCount: number;
  approvalRequiredDecisionCount: number;
  disabledInterfaceCandidateAllowed: true;
  fakeWiringReviewAllowed: true;
  realResolverImplementationAllowed: false;
  secretProviderRuntimeAllowed: false;
  credentialValueReadAllowed: false;
  rawEndpointUrlParseAllowed: false;
  externalRequestAllowed: false;
  schemaMigrationAllowed: false;
  approvalLedgerWriteAllowed: false;
  automaticUpstreamStartAllowed: false;
  decisions: CredentialResolverDisabledCandidateBoundaryDecision[];
  interfaceShape: CredentialResolverDisabledCandidateInterfaceShape;
  fakeWiringReview: CredentialResolverDisabledFakeWiringReview;
}

export interface CredentialResolverDisabledCandidateBoundaryDecision {
  code: CredentialResolverPreImplementationBoundaryCode;
  requirementFromV268: CredentialResolverPreImplementationRequirementCode;
  disposition: "disabled-candidate-ready" | "approval-required";
  owner: "node" | "security" | "operator" | "release-manager";
  candidateRule: string;
  prohibitedRuntimeActions: string[];
}

export interface CredentialResolverDisabledCandidateInterfaceShape {
  interfaceVersion: "disabled-credential-resolver-interface-candidate.v1";
  requestFields: readonly string[];
  responseFields: readonly string[];
  failureClasses: readonly string[];
  handleOnlyRequest: true;
  includesCredentialValue: false;
  includesRawEndpointUrl: false;
  sendsExternalRequest: false;
  instantiatesSecretProvider: false;
  instantiatesResolverClient: false;
}

export interface CredentialResolverDisabledFakeWiringReview {
  reviewVersion: "disabled-credential-resolver-fake-wiring-review.v1";
  fakeWiringReviewOnly: true;
  fakeRuntimeInstantiated: false;
  realSecretProviderAllowed: false;
  realManagedAuditTransportAllowed: false;
  externalRequestAllowed: false;
  cleanupArtifactCount: 0;
}

export type CredentialResolverDisabledImplementationCandidateReviewChecks = {
  sourceNodeV272Ready: boolean;
  sourceNodeV272KeepsReadOnlyEchoOnly: boolean;
  sourceNodeV272KeepsRealResolverBlocked: boolean;
  sourceNodeV272KeepsBoundaryAlignment: boolean;
  allCandidateDecisionsCovered: boolean;
  candidateReadyBoundariesLimited: boolean;
  approvalRequiredBoundariesPreserved: boolean;
  interfaceShapeHandleOnly: boolean;
  fakeWiringReviewOnly: boolean;
  credentialValueStillForbidden: boolean;
  rawEndpointStillForbidden: boolean;
  secretProviderRuntimeStillDisabled: boolean;
  resolverClientStillDisabled: boolean;
  externalRequestStillBlocked: boolean;
  schemaMigrationStillBlocked: boolean;
  ledgerWriteStillBlocked: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledImplementationCandidateReview: boolean;
};

export interface CredentialResolverDisabledImplementationCandidateReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review"
    | "node-v272-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
