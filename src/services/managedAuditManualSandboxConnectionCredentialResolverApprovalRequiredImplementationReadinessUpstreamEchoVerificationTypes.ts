import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification.v1";
  verificationState:
    | "credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready"
    | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  approvalRequiredImplementationReadinessEchoVerificationOnly: true;
  readyForManagedAuditResolverImplementation: false;
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
  sourceNodeV281: ApprovalRequiredImplementationReadinessNodeV281Reference;
  upstreamEchoes: {
    javaV116: JavaV116ApprovalRequiredImplementationReadinessEchoReference;
    miniKvV122: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference;
  };
  echoVerification: ApprovalRequiredImplementationReadinessUpstreamEchoVerification;
  checks: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    boundaryCount: number;
    requiredArtifactCount: number;
    sourceCheckCount: number;
    sourcePassedCheckCount: number;
    javaProofClaimCount: number;
    miniKvCheckCount: number | null;
    miniKvPassedCheckCount: number | null;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[];
  warnings: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[];
  recommendations: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    approvalRequiredImplementationReadinessUpstreamEchoVerificationJson: string;
    approvalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown: string;
    sourceNodeV281Json: string;
    sourceNodeV281Markdown: string;
    javaV116Runbook: string;
    javaV116Walkthrough: string;
    javaV116Support: string;
    javaV116Builder: string;
    miniKvV122Receipt: string;
    miniKvV122Runbook: string;
    miniKvV122Walkthrough: string;
    activePlan: string;
    nextNodeVersion: "Node v283";
  };
  nextActions: string[];
}

export interface ApprovalRequiredImplementationReadinessNodeV281Reference {
  sourceVersion: "Node v281";
  profileVersion: string;
  reviewState: string;
  readyForApprovalRequiredImplementationReadinessReview: boolean;
  readyForJavaV116MiniKvV122Echo: boolean;
  readinessReviewDigest: string;
  boundaryCount: number;
  echoReadyBoundaryCount: number;
  blockedForImplementationBoundaryCount: number;
  requiredArtifactCount: number;
  boundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  requiredArtifactIds: string[];
  checkCount: number;
  passedCheckCount: number;
  readyForManagedAuditResolverImplementation: false;
  realResolverImplementationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface JavaV116ApprovalRequiredImplementationReadinessEchoReference {
  sourceVersion: "Java v116";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v35" | "missing";
  receiptVersion:
    | "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-required-implementation-readiness-echo-receipt.v1"
    | "missing";
  echoMode: "java-v116-credential-resolver-approval-required-implementation-readiness-echo-only" | "missing";
  boundaryCount: number;
  requiredArtifactCount: number;
  boundaryCodes: CredentialResolverPreImplementationBoundaryCode[];
  requiredArtifactIds: string[];
  proofClaimCount: number;
  proofClaimsPresent: boolean;
  warningDigestInputsPresent: boolean;
  nodeVerificationActionsPresent: boolean;
  readyForNodeV282Verification: boolean;
  readyForManagedAuditResolverImplementation: false;
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
  javaStartedNodeOrMiniKv: false;
  noCredentialConnectionWriteOrAutoStartProved: boolean;
  readyForNodeV282Alignment: boolean;
}

export interface MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference {
  sourceVersion: "mini-kv v122";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string | null;
  releaseVersion: string | null;
  consumerHint: string | null;
  receiptDigest: string | null;
  sourceReviewState: string | null;
  sourceReadyForApprovalRequiredImplementationReadinessReview: boolean | null;
  sourceReadyForJavaV116MiniKvV122Echo: boolean | null;
  sourceReadyForManagedAuditResolverImplementation: boolean | null;
  boundaryCount: number | null;
  requiredArtifactCount: number | null;
  boundaryCodes: string[];
  requiredArtifactIds: string[];
  checks: Record<string, boolean | null>;
  checkCount: number | null;
  passedCheckCount: number | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  implementationReadinessReviewOnly: boolean | null;
  nonParticipationReceiptOnly: boolean | null;
  readyForApprovalRequiredImplementationReadinessUpstreamEcho: boolean | null;
  readyForManagedAuditResolverImplementation: boolean | null;
  realResolverImplementationAllowed: boolean | null;
  credentialResolverImplemented: boolean | null;
  credentialResolverInvoked: boolean | null;
  resolverClientInstantiated: boolean | null;
  secretProviderInstantiated: boolean | null;
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
  readyForNodeV282Alignment: boolean;
}

export interface ApprovalRequiredImplementationReadinessUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v116-plus-mini-kv-v122-approval-required-implementation-readiness-upstream-echo-verification-only";
  sourceSpan: "Node v281 + Java v116 + mini-kv v122";
  sourceNodeV281Ready: boolean;
  javaV116EchoReady: boolean;
  miniKvV122NonParticipationReady: boolean;
  boundaryReadinessAligned: boolean;
  requiredArtifactsAligned: boolean;
  readinessCountsAligned: boolean;
  javaProofClaimsAligned: boolean;
  miniKvReceiptAligned: boolean;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  readyForNodeV283ImplementationPlanDraft: boolean;
}

export type ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks = {
  sourceNodeV281Ready: boolean;
  sourceNodeV281KeepsRuntimeImplementationBlocked: boolean;
  javaV116EchoReady: boolean;
  javaV116DocumentsNodeV281Consumption: boolean;
  javaV116KeepsRuntimeSideEffectsBlocked: boolean;
  miniKvV122ReceiptReady: boolean;
  miniKvV122DocumentsNodeV281Consumption: boolean;
  miniKvV122KeepsRuntimeSideEffectsBlocked: boolean;
  boundaryCodesAligned: boolean;
  requiredArtifactsAligned: boolean;
  readinessCountsAligned: boolean;
  proofClaimsAligned: boolean;
  credentialBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  resolverBoundaryClosed: boolean;
  connectionBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  autoStartBoundaryClosed: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification: boolean;
};

export interface ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification"
    | "node-v281-approval-required-implementation-readiness-review"
    | "java-v116-approval-required-implementation-readiness-echo"
    | "mini-kv-v122-approval-required-implementation-readiness-non-participation-receipt"
    | "runtime-config";
  message: string;
}
