import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1";
  precheckState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck: boolean;
  readOnlyDisabledPrecheck: true;
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
  sourceNodeV261: SourceNodeV261CredentialResolverUpstreamEchoVerificationReference;
  disabledCredentialResolverPrecheck: DisabledCredentialResolverPrecheck;
  checks: CredentialResolverDisabledPrecheckChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requiredEnvHandleCount: number;
    optInGateCount: number;
    failureClassCount: number;
    dryRunResponseFieldCount: number;
    inheritedNoGoConditionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverDisabledPrecheckMessage[];
  warnings: CredentialResolverDisabledPrecheckMessage[];
  recommendations: CredentialResolverDisabledPrecheckMessage[];
  evidenceEndpoints: {
    sandboxEndpointCredentialResolverDisabledPrecheckJson: string;
    sandboxEndpointCredentialResolverDisabledPrecheckMarkdown: string;
    sourceNodeV261Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV261CredentialResolverUpstreamEchoVerificationReference {
  sourceVersion: "Node v261";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile["verificationState"];
  readyForUpstreamEchoVerification: boolean;
  verificationDigest: string;
  verificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only";
  sourceSpan: "Node v260 + Java v105 + mini-kv v114";
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
  credentialResolverExecutionAllowed: false;
  credentialValueRead: false;
  credentialValueLoaded: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  connectsManagedAudit: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  readyForNodeV262CredentialResolverDisabledPrecheck: boolean;
}

export interface DisabledCredentialResolverPrecheck {
  precheckDigest: string;
  precheckMode: "sandbox-endpoint-credential-resolver-disabled-precheck-only";
  resolverImplementationStatus: "not-implemented";
  secretProviderImplementationStatus: "not-implemented";
  resolverClientMayBeInstantiated: false;
  secretProviderMayBeInstantiated: false;
  credentialValueMayBeLoaded: false;
  rawEndpointUrlMayBeParsed: false;
  externalRequestMayBeSent: false;
  optInGateRequired: true;
  requiredEnvHandleCount: 6;
  optInGateCount: 2;
  failureClassCount: 7;
  dryRunResponseFieldCount: 12;
  inheritedNoGoConditionCount: 9;
  requiredEnvHandles: CredentialResolverEnvHandle[];
  optInGates: CredentialResolverOptInGate[];
  failureTaxonomy: CredentialResolverFailureClass[];
  dryRunResponseShape: CredentialResolverDryRunResponseShape;
  inheritedNoGoConditions: readonly string[];
}

export interface CredentialResolverEnvHandle {
  name: string;
  purpose: string;
  valueRequiredForPrecheck: false;
  credentialValue: false;
  rawEndpointValue: false;
  requiredBeforeRealResolver: boolean;
}

export interface CredentialResolverOptInGate {
  gateName:
    | "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED"
    | "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED";
  requiredValueForFutureResolver: "true";
  currentDefault: "false";
  precheckTreatsEnabledAsBlocked: true;
  operatorApprovalRequired: true;
}

export interface CredentialResolverFailureClass {
  code: string;
  source:
    | "configuration"
    | "credential-boundary"
    | "endpoint-boundary"
    | "network-boundary"
    | "schema-boundary"
    | "operator-boundary";
  retryable: boolean;
  action: "pause-and-review" | "pause-and-do-not-resolve";
}

export interface CredentialResolverDryRunResponseShape {
  fields: readonly string[];
  readyState: "sandbox-endpoint-credential-resolver-disabled-precheck-ready";
  resolverClientInstantiated: false;
  secretProviderInstantiated: false;
  credentialValueRead: false;
  credentialValueLoaded: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  connectsManagedAudit: false;
  schemaMigrationExecuted: false;
}

export type CredentialResolverDisabledPrecheckChecks = {
  sourceNodeV261Ready: boolean;
  sourceVerificationStillBlocksCredentialResolution: boolean;
  sourceVerificationStillBlocksCredentialValue: boolean;
  sourceVerificationStillBlocksRawEndpoint: boolean;
  sourceVerificationStillBlocksConnection: boolean;
  sourceVerificationStillBlocksWrites: boolean;
  sourceVerificationStillBlocksAutoStart: boolean;
  requiredEnvHandlesDeclared: boolean;
  envHandlesRemainHandleOnly: boolean;
  optInGatesDeclared: boolean;
  optInGatesDefaultDisabled: boolean;
  failureTaxonomyDeclared: boolean;
  dryRunResponseShapeDeclared: boolean;
  resolverImplementationStillAbsent: boolean;
  secretProviderImplementationStillAbsent: boolean;
  resolverClientInstantiationBlocked: boolean;
  secretProviderInstantiationBlocked: boolean;
  credentialValueLoadBlocked: boolean;
  rawEndpointParseBlocked: boolean;
  externalRequestBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck: boolean;
};

export interface CredentialResolverDisabledPrecheckMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck"
    | "node-v261-sandbox-endpoint-credential-resolver-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
