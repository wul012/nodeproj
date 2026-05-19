import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordTypes.js";

export interface ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification.v1";
  verificationState: "sandbox-endpoint-credential-resolver-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  credentialResolverExecutionAllowed: false;
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
  credentialValueStored: false;
  credentialValueIncluded: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlIncluded: false;
  externalRequestSent: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV260: SourceNodeV260CredentialResolverDecisionRecordReference;
  upstreamEchoes: {
    javaV105: JavaV105CredentialResolverDecisionEchoMarkerReference;
    miniKvV114: MiniKvV114CredentialResolverNonParticipationReference;
  };
  echoVerification: CredentialResolverUpstreamEchoVerification;
  checks: CredentialResolverUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    sandboxEndpointCredentialResolverUpstreamEchoVerificationJson: string;
    sandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown: string;
    sourceNodeV260Json: string;
    javaV105Runbook: string;
    miniKvV114Receipt: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV260CredentialResolverDecisionRecordReference {
  sourceVersion: "Node v260";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile["profileVersion"];
  decisionState: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile["decisionState"];
  readyForCredentialResolverDecisionRecord: boolean;
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
  explicitNoGoConditionCount: 9;
  requiredDecisionFieldIds: string[];
  explicitNoGoConditionCodes: string[];
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
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  sourceNodeV259Ready: boolean;
  sourceNodeV259EvidenceFileCount: number;
  sourceNodeV259MatchedSnippetCount: number;
  readyForNodeV261CredentialResolverUpstreamEchoVerification: boolean;
}

export interface JavaV105CredentialResolverDecisionEchoMarkerReference {
  sourceVersion: "Java v105";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v27" | "missing";
  markerField: "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker" | "missing";
  consumedNodeVersion: "Node v260" | "missing";
  consumedNodeProfile: string;
  nextNodeConsumerVersion: "Node v261" | "missing";
  endpointHandle: string;
  credentialHandle: string;
  resolverPolicyHandle: string;
  approvalMarker: string;
  resolverMode: string;
  resolverCandidateImplementation: string;
  requiredDecisionFieldCount: number;
  explicitNoGoConditionCount: number;
  sourceEvidenceFileCount: number;
  sourceMatchedSnippetCount: number;
  sourceCheckCount: number;
  credentialValueMayBeRead: boolean;
  rawEndpointUrlMayBeParsed: boolean;
  externalRequestMayBeSent: boolean;
  schemaMigrationMayExecute: boolean;
  approvalLedgerMayBeWritten: boolean;
  credentialValueRead: boolean;
  rawEndpointUrlParsed: boolean;
  externalRequestSent: boolean;
  connectsManagedAudit: boolean;
  javaStarted: boolean;
  miniKvStarted: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification: boolean;
}

export interface MiniKvV114CredentialResolverNonParticipationReference {
  sourceVersion: "mini-kv v114";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourceDecisionProfileVersion: string;
  sourceDecisionState: string;
  sourceRecordMode: string;
  sourceDecisionScope: string;
  sourceDecisionStatus: string;
  sourceSpan: string;
  sourceReadyForDecisionRecord: boolean;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean;
  sourceReadOnlyDecisionRecord: boolean;
  sourceCredentialResolverDecisionOnly: boolean;
  sourceExecutionAllowed: boolean;
  sourceConnectsManagedAudit: boolean;
  sourceReadsManagedAuditCredential: boolean;
  sourceStoresManagedAuditCredential: boolean;
  sourceCredentialValueRead: boolean;
  sourceCredentialValueLoaded: boolean;
  sourceCredentialValueIncluded: boolean;
  sourceRawEndpointUrlParsed: boolean;
  sourceRawEndpointUrlIncluded: boolean;
  sourceExternalRequestSent: boolean;
  sourceSchemaMigrationExecuted: boolean;
  sourceAutomaticUpstreamStart: boolean;
  sourceRequiredDecisionFieldCount: number;
  sourceExplicitNoGoConditionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceNodeV259Ready: boolean;
  sourceNodeV259BlocksRealConnection: boolean;
  sourceNodeV259CredentialBoundaryAligned: boolean;
  sourceNodeV259RawEndpointBoundaryAligned: boolean;
  sourceNodeV259WriteBoundaryAligned: boolean;
  sourceNodeV259AutoStartBoundaryAligned: boolean;
  sourceNodeV259KeepsMiniKvNonParticipant: boolean;
  sourceNodeV259EvidenceFileCount: number;
  sourceNodeV259MatchedSnippetCount: number;
  sourceNodeV259ReadyForNodeV260DecisionRecord: boolean;
  sourceUpstreamActionsStillDisabled: boolean;
  endpointHandle: string;
  credentialHandle: string;
  resolverPolicyHandle: string;
  approvalMarker: string;
  operatorIdentityRequired: boolean;
  approvalCorrelationRequired: boolean;
  resolverMode: string;
  resolverCandidateImplementation: string;
  requiredDecisionFieldCount: number;
  explicitNoGoConditionCount: number;
  requiredDecisionFieldIds: string[];
  explicitNoGoConditionCodes: string[];
  readOnly: boolean;
  executionAllowed: boolean;
  dryRunOnly: boolean;
  credentialResolverDecisionOnly: boolean;
  credentialResolverImplemented: boolean;
  credentialResolverInvoked: boolean;
  secretProviderInstantiated: boolean;
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
  credentialValueStored: boolean;
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
  readyForNodeV261Alignment: boolean;
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

export interface CredentialResolverUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only";
  sourceSpan: "Node v260 + Java v105 + mini-kv v114";
  decisionRecordAligned: boolean;
  requiredDecisionFieldsAligned: boolean;
  explicitNoGoConditionsAligned: boolean;
  resolverPolicyAligned: boolean;
  approvalMarkerAligned: boolean;
  operatorIdentityAligned: boolean;
  approvalCorrelationAligned: boolean;
  redactionAndFallbackAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  miniKvNonParticipationAligned: boolean;
  nodeV261BlocksCredentialResolution: true;
}

export type CredentialResolverUpstreamEchoVerificationChecks = {
  sourceNodeV260Ready: boolean;
  javaV105EchoReady: boolean;
  miniKvV114NonParticipationReady: boolean;
  decisionRecordAligned: boolean;
  requiredDecisionFieldsAligned: boolean;
  explicitNoGoConditionsAligned: boolean;
  resolverPolicyAligned: boolean;
  approvalMarkerAligned: boolean;
  operatorIdentityAligned: boolean;
  approvalCorrelationAligned: boolean;
  redactionAndFallbackAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification: boolean;
};

export interface CredentialResolverUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification"
    | "node-v260-sandbox-endpoint-credential-resolver-decision-record"
    | "java-v105-sandbox-endpoint-credential-resolver-decision-echo-marker"
    | "mini-kv-v114-credential-resolver-non-participation-receipt"
    | "runtime-config";
  message: string;
}
