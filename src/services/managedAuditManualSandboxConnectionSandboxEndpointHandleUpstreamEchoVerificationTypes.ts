import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewTypes.js";

export interface ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification.v1";
  verificationState: "sandbox-endpoint-handle-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV258: SourceNodeV258SandboxEndpointHandlePreflightReviewReference;
  upstreamEchoes: {
    javaV104: JavaV104SandboxEndpointHandlePreflightEchoMarkerReference;
    miniKvV113: MiniKvV113SandboxEndpointHandleNonParticipationReference;
  };
  echoVerification: SandboxEndpointHandleUpstreamEchoVerification;
  checks: SandboxEndpointHandleUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: SandboxEndpointHandleUpstreamEchoVerificationMessage[];
  warnings: SandboxEndpointHandleUpstreamEchoVerificationMessage[];
  recommendations: SandboxEndpointHandleUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    sandboxEndpointHandleUpstreamEchoVerificationJson: string;
    sandboxEndpointHandleUpstreamEchoVerificationMarkdown: string;
    sourceNodeV258Json: string;
    javaV104Runbook: string;
    miniKvV113Receipt: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV258SandboxEndpointHandlePreflightReviewReference {
  sourceVersion: "Node v258";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile["profileVersion"];
  reviewState: ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile["reviewState"];
  readyForPreflightReview: boolean;
  reviewDigest: string;
  reviewMode: "sandbox-endpoint-handle-preflight-review-only";
  sourceSpan: "Node v257";
  endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE";
  credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  requiredReviewItemCount: 7;
  completedReviewItemCount: 7;
  forbiddenOperationCount: 7;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  networkAllowlistReviewReady: boolean;
  tlsPolicyReviewReady: boolean;
  redactionPolicyReady: boolean;
  operatorWindowReviewReady: boolean;
  rawEndpointUrlParsed: false;
  rawEndpointUrlIncluded: false;
  credentialValueRead: false;
  externalRequestSent: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  sourceNodeV257Ready: boolean;
  sourceNodeV257EvidenceFileCount: number;
  sourceNodeV257MatchedSnippetCount: number;
  readyForNodeV259UpstreamEchoVerification: boolean;
}

export interface JavaV104SandboxEndpointHandlePreflightEchoMarkerReference {
  sourceVersion: "Java v104";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v26" | "missing";
  markerField: "managedAuditSandboxEndpointHandlePreflightEchoMarker" | "missing";
  consumedByNodeV258Profile: string;
  nextNodeConsumerVersion: "Node v259" | "missing";
  endpointHandle: string;
  credentialHandle: string;
  requiredReviewItemCount: number;
  completedReviewItemCount: number;
  forbiddenOperationCount: number;
  sourceEvidenceFileCount: number;
  sourceMatchedSnippetCount: number;
  networkAllowlistReviewEchoed: boolean;
  tlsPolicyReviewEchoed: boolean;
  redactionPolicyEchoed: boolean;
  operatorWindowReviewEchoed: boolean;
  rawEndpointUrlParsed: boolean;
  rawEndpointUrlIncluded: boolean;
  credentialValueRead: boolean;
  externalRequestSent: boolean;
  schemaMigrationExecuted: boolean;
  automaticUpstreamStart: boolean;
  connectsManagedAudit: boolean;
  approvalLedgerWritten: boolean;
  javaStarted: boolean;
  miniKvStarted: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification: boolean;
}

export interface MiniKvV113SandboxEndpointHandleNonParticipationReference {
  sourceVersion: "mini-kv v113";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourcePreflightProfileVersion: string;
  sourceReviewState: string;
  sourceReviewMode: string;
  sourceSpan: string;
  sourceReadyForPreflightReview: boolean;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean;
  sourceReadOnlyPreflightReview: boolean;
  sourceExecutionAllowed: boolean;
  sourceConnectsManagedAudit: boolean;
  sourceReadsManagedAuditCredential: boolean;
  sourceStoresManagedAuditCredential: boolean;
  sourceSchemaMigrationExecuted: boolean;
  sourceAutomaticUpstreamStart: boolean;
  sourceExternalRequestSent: boolean;
  sourceRawEndpointUrlParsed: boolean;
  sourceRawEndpointUrlIncluded: boolean;
  sourceCredentialValueRead: boolean;
  sourceRequiredReviewItemCount: number;
  sourceCompletedReviewItemCount: number;
  sourceForbiddenOperationCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceNodeV257Ready: boolean;
  sourceNodeV257BoundariesAligned: boolean;
  sourceNodeV257EvidenceFileCount: number;
  sourceNodeV257MatchedSnippetCount: number;
  sourceNodeV257ReadyForNodeV258PreflightReview: boolean;
  sourceUpstreamActionsStillDisabled: boolean;
  endpointHandle: string;
  credentialHandle: string;
  networkAllowlistReady: boolean;
  tlsPolicyReady: boolean;
  redactionPolicyReady: boolean;
  operatorWindowReady: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  dryRunOnly: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  externalAuditServiceAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  storageWriteAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  approvalLedgerWriteAllowed: boolean;
  approvalLedgerWriteExecuted: boolean;
  sandboxManagedAuditStateWriteAllowed: boolean;
  credentialValueRequired: boolean;
  credentialValueReadAllowed: boolean;
  credentialValueLoaded: boolean;
  credentialValueIncluded: boolean;
  rawEndpointUrlParsed: boolean;
  rawEndpointUrlIncluded: boolean;
  externalRequestSent: boolean;
  schemaRehearsalExecutionAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStorageBackend: boolean;
  sandboxAuditStorageBackend: boolean;
  orderAuthoritative: boolean;
  readyForNodeV259Alignment: boolean;
}

export interface VerificationEvidenceFile {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface VerificationSnippetMatch {
  id: string;
  path: string;
  resolvedPath: string;
  expectedText: string;
  matched: boolean;
}

export interface SandboxEndpointHandleUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v104-plus-mini-kv-v113-sandbox-endpoint-handle-upstream-echo-verification-only";
  sourceSpan: "Node v258 + Java v104 + mini-kv v113";
  endpointHandleAligned: boolean;
  credentialHandleAligned: boolean;
  reviewCountsAligned: boolean;
  policyReviewsAligned: boolean;
  operatorWindowAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  miniKvNonParticipationAligned: boolean;
  nodeV259BlocksRealConnection: true;
}

export type SandboxEndpointHandleUpstreamEchoVerificationChecks = {
  sourceNodeV258Ready: boolean;
  javaV104EchoReady: boolean;
  miniKvV113NonParticipationReady: boolean;
  endpointHandleAligned: boolean;
  credentialHandleAligned: boolean;
  reviewCountsAligned: boolean;
  networkAllowlistAligned: boolean;
  tlsPolicyAligned: boolean;
  redactionPolicyAligned: boolean;
  operatorWindowAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification: boolean;
};

export interface SandboxEndpointHandleUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification"
    | "node-v258-sandbox-endpoint-handle-preflight-review"
    | "java-v104-sandbox-endpoint-handle-preflight-echo-marker"
    | "mini-kv-v113-sandbox-endpoint-handle-non-participation-receipt"
    | "runtime-config";
  message: string;
}
