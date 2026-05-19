import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckTypes.js";

export interface ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification.v1";
  verificationState: "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  disabledCredentialResolverPrecheckOnly: true;
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
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV262: SourceNodeV262CredentialResolverDisabledPrecheckReference;
  upstreamEchoes: {
    javaV106: JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference;
    miniKvV115: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference;
  };
  echoVerification: CredentialResolverDisabledPrecheckUpstreamEchoVerification;
  checks: CredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    sandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationJson: string;
    sandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown: string;
    sourceNodeV262Json: string;
    javaV106Runbook: string;
    miniKvV115Receipt: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV262CredentialResolverDisabledPrecheckReference {
  sourceVersion: "Node v262";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile["profileVersion"];
  precheckState: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile["precheckState"];
  readyForDisabledPrecheck: boolean;
  precheckDigest: string;
  precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only";
  resolverImplementationStatus: "not-implemented";
  secretProviderImplementationStatus: "not-implemented";
  requiredEnvHandleCount: 6;
  optInGateCount: 2;
  failureClassCount: 7;
  dryRunResponseFieldCount: 12;
  inheritedNoGoConditionCount: 9;
  requiredEnvHandleNames: string[];
  optInGateNames: string[];
  failureClassCodes: string[];
  dryRunResponseFields: string[];
  inheritedNoGoConditions: readonly string[];
  sourceNodeV261Ready: boolean;
  sourceVerificationMode: string;
  sourceSpan: string;
  sourceBlocksCredentialResolution: boolean;
  sourceCredentialBoundaryAligned: boolean;
  sourceRawEndpointBoundaryAligned: boolean;
  sourceConnectionBoundaryAligned: boolean;
  sourceWriteBoundaryAligned: boolean;
  sourceAutoStartBoundaryAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  resolverClientMayBeInstantiated: false;
  secretProviderMayBeInstantiated: false;
  credentialValueMayBeLoaded: false;
  rawEndpointUrlMayBeParsed: false;
  externalRequestMayBeSent: false;
  optInGateRequired: true;
  credentialResolverExecutionAllowed: false;
  credentialValueRead: false;
  credentialValueLoaded: false;
  credentialValueStored: false;
  credentialValueIncluded: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlIncluded: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  connectsManagedAudit: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  readyForNodeV263DisabledPrecheckUpstreamEchoVerification: boolean;
}

export interface JavaV106CredentialResolverDisabledPrecheckEchoMarkerReference {
  sourceVersion: "Java v106";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v28" | "missing";
  markerField: "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker" | "missing";
  consumedNodeVersion: "Node v262" | "missing";
  consumedNodeProfile: string;
  nextNodeConsumerVersion: "Node v263" | "missing";
  precheckMode: string;
  sourceSpan: string;
  sourceVerificationMode: string;
  sourceNodeV261Span: string;
  requiredEnvHandleCount: number;
  optInGateCount: number;
  failureClassCount: number;
  dryRunResponseFieldCount: number;
  inheritedNoGoConditionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  resolverImplementationStatus: string;
  secretProviderImplementationStatus: string;
  resolverClientMayBeInstantiated: boolean;
  secretProviderMayBeInstantiated: boolean;
  credentialValueMayBeLoaded: boolean;
  rawEndpointUrlMayBeParsed: boolean;
  externalRequestMayBeSent: boolean;
  credentialResolverExecutionAllowed: boolean;
  connectsManagedAudit: boolean;
  credentialValueRead: boolean;
  credentialValueLoaded: boolean;
  credentialValueStored: boolean;
  credentialValueIncluded: boolean;
  rawEndpointUrlParsed: boolean;
  rawEndpointUrlIncluded: boolean;
  externalRequestSent: boolean;
  secretProviderInstantiated: boolean;
  resolverClientInstantiated: boolean;
  schemaMigrationExecuted: boolean;
  automaticUpstreamStart: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: boolean;
}

export interface MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference {
  sourceVersion: "mini-kv v115";
  tagLabel: string;
  evidenceFiles: VerificationEvidenceFile[];
  expectedSnippets: VerificationSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourcePrecheckProfileVersion: string;
  sourcePrecheckState: string;
  sourcePrecheckMode: string;
  sourceSpan: string;
  sourceReadyForDisabledPrecheck: boolean;
  sourceReadyForManagedAuditSandboxAdapterConnection: boolean;
  sourceReadOnlyDisabledPrecheck: boolean;
  sourceDisabledCredentialResolverPrecheckOnly: boolean;
  sourceCredentialResolverExecutionAllowed: boolean;
  sourceExecutionAllowed: boolean;
  sourceConnectsManagedAudit: boolean;
  sourceReadsManagedAuditCredential: boolean;
  sourceStoresManagedAuditCredential: boolean;
  sourceCredentialValueRead: boolean;
  sourceCredentialValueLoaded: boolean;
  sourceCredentialValueStored: boolean;
  sourceCredentialValueIncluded: boolean;
  sourceRawEndpointUrlParsed: boolean;
  sourceRawEndpointUrlIncluded: boolean;
  sourceExternalRequestSent: boolean;
  sourceSecretProviderInstantiated: boolean;
  sourceResolverClientInstantiated: boolean;
  sourceSchemaMigrationExecuted: boolean;
  sourceAutomaticUpstreamStart: boolean;
  sourceRequiredEnvHandleCount: number;
  sourceOptInGateCount: number;
  sourceFailureClassCount: number;
  sourceDryRunResponseFieldCount: number;
  sourceInheritedNoGoConditionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceNodeV261Ready: boolean;
  sourceNodeV261VerificationMode: string;
  sourceNodeV261Span: string;
  sourceNodeV261BlocksCredentialResolution: boolean;
  sourceNodeV261CredentialBoundaryAligned: boolean;
  sourceNodeV261RawEndpointBoundaryAligned: boolean;
  sourceNodeV261ConnectionBoundaryAligned: boolean;
  sourceNodeV261WriteBoundaryAligned: boolean;
  sourceNodeV261AutoStartBoundaryAligned: boolean;
  sourceNodeV261UpstreamActionsStillDisabled: boolean;
  disabledPrecheckMode: string;
  disabledPrecheckReadyState: string;
  resolverImplementationStatus: string;
  secretProviderImplementationStatus: string;
  resolverClientMayBeInstantiated: boolean;
  secretProviderMayBeInstantiated: boolean;
  credentialValueMayBeLoaded: boolean;
  rawEndpointUrlMayBeParsed: boolean;
  externalRequestMayBeSent: boolean;
  optInGateRequired: boolean;
  requiredEnvHandleCount: number;
  optInGateCount: number;
  failureClassCount: number;
  dryRunResponseFieldCount: number;
  inheritedNoGoConditionCount: number;
  requiredEnvHandleNames: string[];
  optInGateNames: string[];
  failureTaxonomyCodes: string[];
  dryRunResponseFields: string[];
  inheritedNoGoConditions: string[];
  readOnly: boolean;
  executionAllowed: boolean;
  dryRunOnly: boolean;
  disabledCredentialResolverPrecheckOnly: boolean;
  credentialResolverImplemented: boolean;
  credentialResolverInvoked: boolean;
  secretProviderInstantiated: boolean;
  resolverClientInstantiated: boolean;
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
  readyForNodeV263Alignment: boolean;
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

export interface CredentialResolverDisabledPrecheckUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only";
  sourceSpan: "Node v262 + Java v106 + mini-kv v115";
  disabledPrecheckAligned: boolean;
  requiredEnvHandlesAligned: boolean;
  optInGatesAligned: boolean;
  failureTaxonomyAligned: boolean;
  dryRunResponseShapeAligned: boolean;
  inheritedNoGoConditionsAligned: boolean;
  sourceNodeV261Aligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  miniKvNonParticipationAligned: boolean;
  nodeV263BlocksCredentialResolution: true;
}

export type CredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks = {
  sourceNodeV262Ready: boolean;
  javaV106EchoReady: boolean;
  miniKvV115NonParticipationReady: boolean;
  disabledPrecheckAligned: boolean;
  requiredEnvHandlesAligned: boolean;
  optInGatesAligned: boolean;
  failureTaxonomyAligned: boolean;
  dryRunResponseShapeAligned: boolean;
  inheritedNoGoConditionsAligned: boolean;
  sourceNodeV261Aligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification: boolean;
};

export interface CredentialResolverDisabledPrecheckUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification"
    | "node-v262-sandbox-endpoint-credential-resolver-disabled-precheck"
    | "java-v106-sandbox-endpoint-credential-resolver-disabled-precheck-echo-marker"
    | "mini-kv-v115-disabled-credential-resolver-precheck-non-participation-receipt"
    | "runtime-config";
  message: string;
}
