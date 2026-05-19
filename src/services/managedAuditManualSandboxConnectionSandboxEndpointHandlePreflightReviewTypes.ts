import type {
  ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1";
  reviewState: "sandbox-endpoint-handle-preflight-review-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview: boolean;
  readOnlyPreflightReview: true;
  endpointHandleOnly: true;
  credentialHandleOnly: true;
  rawEndpointUrlParsed: false;
  rawEndpointUrlIncluded: false;
  credentialValueRead: false;
  externalRequestSent: false;
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
  sourceNodeV257: SourceNodeV257FakeTransportPacketUpstreamEchoVerificationReference;
  preflightReview: SandboxEndpointHandlePreflightReview;
  checks: SandboxEndpointHandlePreflightReviewChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requiredReviewItemCount: number;
    completedReviewItemCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: SandboxEndpointHandlePreflightReviewMessage[];
  warnings: SandboxEndpointHandlePreflightReviewMessage[];
  recommendations: SandboxEndpointHandlePreflightReviewMessage[];
  evidenceEndpoints: {
    sandboxEndpointHandlePreflightReviewJson: string;
    sandboxEndpointHandlePreflightReviewMarkdown: string;
    sourceNodeV257Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV257FakeTransportPacketUpstreamEchoVerificationReference {
  sourceVersion: "Node v257";
  profileVersion: ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile["verificationState"];
  readyForUpstreamEchoVerification: boolean;
  verificationDigest: string;
  requestShapeAligned: boolean;
  responseShapeAligned: boolean;
  timeoutBoundaryAligned: boolean;
  failureMappingAligned: boolean;
  cleanupBoundaryAligned: boolean;
  archiveNoRerunAligned: boolean;
  credentialBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  evidenceFileCount: number;
  matchedSnippetCount: number;
  readyForNodeV258PreflightReview: boolean;
}

export interface SandboxEndpointHandlePreflightReview {
  reviewDigest: string;
  reviewMode: "sandbox-endpoint-handle-preflight-review-only";
  sourceSpan: "Node v257";
  endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE";
  credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  ownerApprovalArtifactId: "owner-approval-artifact-review-only";
  schemaRehearsalId: "schema-migration-rehearsal-review-only";
  operatorWindowMarker: "manual-sandbox-endpoint-window-review-only";
  endpointHandleReviewed: boolean;
  credentialHandleReviewed: boolean;
  ownerApprovalArtifactReviewed: boolean;
  networkAllowlistReview: SandboxEndpointHandleNetworkAllowlistReview;
  tlsPolicyReview: SandboxEndpointHandleTlsPolicyReview;
  redactionPolicy: SandboxEndpointHandleRedactionPolicyReview;
  operatorWindow: SandboxEndpointHandleOperatorWindowReview;
  requiredReviewItems: readonly string[];
  forbiddenOperations: readonly string[];
  nextRequiredEchoVersions: readonly ["Java v104", "mini-kv v113"];
}

export interface SandboxEndpointHandleNetworkAllowlistReview {
  reviewRequired: true;
  allowlistHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_NETWORK_ALLOWLIST_HANDLE";
  rawHostIncluded: false;
  cidrIncluded: false;
  reviewed: boolean;
}

export interface SandboxEndpointHandleTlsPolicyReview {
  reviewRequired: true;
  policyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_TLS_POLICY_HANDLE";
  certificateMaterialIncluded: false;
  privateKeyIncluded: false;
  reviewed: boolean;
}

export interface SandboxEndpointHandleRedactionPolicyReview {
  reviewRequired: true;
  policyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_REDACTION_POLICY_HANDLE";
  credentialValueRedacted: true;
  rawEndpointUrlRedacted: true;
  payloadSecretRedacted: true;
  reviewed: boolean;
}

export interface SandboxEndpointHandleOperatorWindowReview {
  manualWindowRequired: true;
  windowOpen: false;
  executionBlockedUntilWindowOpen: true;
  operatorIdentityRequired: true;
  approvalCorrelationRequired: true;
  reviewed: boolean;
}

export type SandboxEndpointHandlePreflightReviewChecks = {
  sourceNodeV257Ready: boolean;
  sourceNodeV257BoundariesAligned: boolean;
  endpointHandleOnly: boolean;
  credentialHandleOnly: boolean;
  ownerApprovalArtifactPresent: boolean;
  networkAllowlistReviewReady: boolean;
  tlsPolicyReviewReady: boolean;
  redactionPolicyReady: boolean;
  operatorWindowReviewReady: boolean;
  noRawEndpointUrlParsed: boolean;
  noRawEndpointUrlIncluded: boolean;
  noCredentialValueRead: boolean;
  noExternalRequestSent: boolean;
  noSchemaMigrationExecuted: boolean;
  noUpstreamAutoStart: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview: boolean;
};

export interface SandboxEndpointHandlePreflightReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review"
    | "node-v257-fake-transport-packet-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
