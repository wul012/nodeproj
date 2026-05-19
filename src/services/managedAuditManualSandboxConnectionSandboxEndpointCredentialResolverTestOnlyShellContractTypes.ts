import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1";
  shellContractState: "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract: boolean;
  testOnlyShell: true;
  readOnlyContract: true;
  fakeResolverOnly: true;
  handleOnlyRequest: true;
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
  sourceNodeV263: SourceNodeV263DisabledResolverPrecheckEchoReference;
  resolverShellContract: CredentialResolverTestOnlyShellContract;
  checks: CredentialResolverTestOnlyShellContractChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requestShapeFieldCount: number;
    responseShapeFieldCount: number;
    failureMappingCount: number;
    guardConditionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverTestOnlyShellContractMessage[];
  warnings: CredentialResolverTestOnlyShellContractMessage[];
  recommendations: CredentialResolverTestOnlyShellContractMessage[];
  evidenceEndpoints: {
    sandboxEndpointCredentialResolverTestOnlyShellContractJson: string;
    sandboxEndpointCredentialResolverTestOnlyShellContractMarkdown: string;
    sourceNodeV263Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV263DisabledResolverPrecheckEchoReference {
  sourceVersion: "Node v263";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationProfile["verificationState"];
  readyForDisabledPrecheckUpstreamEchoVerification: boolean;
  verificationDigest: string;
  verificationMode: "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only";
  sourceSpan: "Node v262 + Java v106 + mini-kv v115";
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
  failureClassCodes: string[];
  requiredEnvHandleNames: string[];
  optInGateNames: string[];
  dryRunResponseFields: string[];
  inheritedNoGoConditions: readonly string[];
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  readyForNodeV264CredentialResolverTestOnlyShellContract: boolean;
}

export interface CredentialResolverTestOnlyShellContract {
  contractDigest: string;
  shellName: "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell";
  shellMode: "test-only-fake-resolver-contract";
  resolverKind: "fake-in-memory";
  realResolverImplemented: false;
  realSecretProviderAllowed: false;
  fakeResolverOnly: true;
  resolverClientMayBeInstantiatedForProduction: false;
  secretProviderMayBeInstantiated: false;
  credentialValueMayBeLoaded: false;
  rawEndpointUrlMayBeParsed: false;
  externalRequestMayBeSent: false;
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  guardConditionCount: number;
  requestShape: CredentialResolverTestOnlyShellRequestShape;
  responseShape: CredentialResolverTestOnlyShellResponseShape;
  failureMapping: CredentialResolverTestOnlyShellFailureMapping[];
  guardConditions: CredentialResolverTestOnlyShellGuardCondition[];
  fakeResolverProbe: CredentialResolverTestOnlyShellProbe;
}

export interface CredentialResolverTestOnlyShellRequestShape {
  fields: readonly string[];
  credentialHandleOnly: true;
  credentialValueAccepted: false;
  endpointHandleOnly: true;
  rawEndpointUrlAccepted: false;
  resolverPolicyHandleRequired: true;
  approvalMarkerRequired: true;
  payloadMayContainSecrets: false;
}

export interface CredentialResolverTestOnlyShellResponseShape {
  fields: readonly string[];
  fakeResolverResponseOnly: true;
  resolverClientInstantiated: false;
  secretProviderInstantiated: false;
  credentialValueRead: false;
  credentialValueLoaded: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  connectsManagedAudit: false;
  schemaMigrationExecuted: false;
  productionRecordWritten: false;
}

export interface CredentialResolverTestOnlyShellFailureMapping {
  sourceFailureCode: string;
  shellFailureCode: string;
  mappedAction: "return-fake-failure" | "pause-and-do-not-resolve";
  retryable: false;
}

export interface CredentialResolverTestOnlyShellGuardCondition {
  code: string;
  required: true;
  value: boolean;
  message: string;
}

export interface CredentialResolverTestOnlyShellProbe {
  requestId: "managed-audit-v264-test-only-resolver-shell-probe";
  resolverKind: "fake-in-memory";
  acceptedByFakeResolver: true;
  responseStatus: "fake-resolver-accepted";
  responseCode: "TEST_ONLY_FAKE_RESOLVER";
  resolverClientInstantiated: false;
  secretProviderInstantiated: false;
  credentialValueRead: false;
  credentialValueLoaded: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  connectsManagedAudit: false;
  schemaMigrationExecuted: false;
  productionRecordWritten: false;
  probeDigest: string;
}

export type CredentialResolverTestOnlyShellContractChecks = {
  sourceNodeV263Ready: boolean;
  sourceStillBlocksCredentialResolution: boolean;
  sourceStillBlocksCredentialValue: boolean;
  sourceStillBlocksRawEndpoint: boolean;
  sourceStillBlocksConnection: boolean;
  sourceStillBlocksWrites: boolean;
  sourceStillBlocksAutoStart: boolean;
  fakeResolverOnly: boolean;
  requestShapeHandleOnly: boolean;
  responseShapeNoSideEffects: boolean;
  failureMappingCoversSourceTaxonomy: boolean;
  guardConditionsDeclared: boolean;
  fakeResolverProbeCovered: boolean;
  fakeResolverProbeNoCredentialRead: boolean;
  fakeResolverProbeNoExternalRequest: boolean;
  fakeResolverProbeNoProductionWrite: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract: boolean;
};

export interface CredentialResolverTestOnlyShellContractMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract"
    | "node-v263-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
