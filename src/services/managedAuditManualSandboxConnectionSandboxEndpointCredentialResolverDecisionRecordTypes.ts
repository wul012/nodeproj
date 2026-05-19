import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1";
  decisionState: "sandbox-endpoint-credential-resolver-decision-record-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord: boolean;
  readOnlyDecisionRecord: true;
  credentialResolverDecisionOnly: true;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  credentialValueLoaded: false;
  credentialValueIncluded: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlIncluded: false;
  externalRequestSent: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV259: SourceNodeV259SandboxEndpointHandleUpstreamEchoVerificationReference;
  decisionRecord: SandboxEndpointCredentialResolverDecisionRecord;
  checks: SandboxEndpointCredentialResolverDecisionRecordChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requiredDecisionFieldCount: number;
    explicitNoGoConditionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: SandboxEndpointCredentialResolverDecisionRecordMessage[];
  warnings: SandboxEndpointCredentialResolverDecisionRecordMessage[];
  recommendations: SandboxEndpointCredentialResolverDecisionRecordMessage[];
  evidenceEndpoints: {
    sandboxEndpointCredentialResolverDecisionRecordJson: string;
    sandboxEndpointCredentialResolverDecisionRecordMarkdown: string;
    sourceNodeV259Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV259SandboxEndpointHandleUpstreamEchoVerificationReference {
  sourceVersion: "Node v259";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile["verificationState"];
  readyForUpstreamEchoVerification: boolean;
  verificationDigest: string;
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
  evidenceFileCount: number;
  matchedSnippetCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  sourceNodeV258Ready: boolean;
  javaV104Ready: boolean;
  miniKvV113Ready: boolean;
  readyForNodeV260CredentialResolverDecisionRecord: boolean;
}

export interface SandboxEndpointCredentialResolverDecisionRecord {
  decisionDigest: string;
  recordMode: "sandbox-endpoint-credential-resolver-decision-record-only";
  decisionScope: "managed-audit-sandbox-endpoint-credential-resolver";
  decisionStatus: "human-review-required-before-credential-resolution";
  sourceSpan: "Node v259 sandbox endpoint handle upstream echo verification";
  endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE";
  credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE";
  approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER";
  operatorIdentityRequired: true;
  approvalCorrelationRequired: true;
  resolverMode: "policy-record-only-no-value-read";
  resolverCandidateImplementation: "not-implemented";
  requiredDecisionFieldCount: 8;
  explicitNoGoConditionCount: number;
  requiredDecisionFields: CredentialResolverDecisionField[];
  explicitNoGoConditions: CredentialResolverNoGoCondition[];
  credentialValueMayBeRead: false;
  credentialValueMayBeLoaded: false;
  credentialValueMayBeStored: false;
  rawEndpointUrlMayBeParsed: false;
  managedAuditConnectionMayOpen: false;
  schemaMigrationMayExecute: false;
  externalRequestMayBeSent: false;
  nodeMayStartJavaOrMiniKv: false;
  miniKvMayActAsManagedAuditStorage: false;
  approvalLedgerMayBeWritten: false;
}

export interface CredentialResolverDecisionField {
  id: string;
  label: string;
  expectedSource: string;
  acceptedEvidence: string;
  required: true;
  nodeMayReadValue: false;
}

export interface CredentialResolverNoGoCondition {
  code: string;
  condition: string;
  action: "pause-and-do-not-resolve-credential";
}

export type SandboxEndpointCredentialResolverDecisionRecordChecks = {
  sourceNodeV259Ready: boolean;
  sourceNodeV259StillBlocksConnection: boolean;
  sourceNodeV259StillBlocksCredentialValue: boolean;
  sourceNodeV259StillBlocksRawEndpoint: boolean;
  sourceNodeV259StillBlocksWrites: boolean;
  sourceNodeV259StillBlocksAutoStart: boolean;
  sourceNodeV259KeepsMiniKvNonParticipant: boolean;
  endpointHandleRecorded: boolean;
  credentialHandleRecorded: boolean;
  resolverPolicyRecorded: boolean;
  approvalMarkerRecorded: boolean;
  operatorIdentityRequirementRecorded: boolean;
  approvalCorrelationRequirementRecorded: boolean;
  resolverModeStillPolicyOnly: boolean;
  explicitNoGoConditionsRecorded: boolean;
  decisionRecordStillReadOnly: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord: boolean;
};

export interface SandboxEndpointCredentialResolverDecisionRecordMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record"
    | "node-v259-sandbox-endpoint-handle-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
