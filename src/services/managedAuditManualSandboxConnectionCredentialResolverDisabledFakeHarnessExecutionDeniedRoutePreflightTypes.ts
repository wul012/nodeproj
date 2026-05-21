import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight.v1";
  preflightState: "disabled-fake-harness-execution-denied-route-preflight-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight: boolean;
  readOnlyRoutePreflight: true;
  executionDeniedRoutePreflightOnly: true;
  consumesNodeV289DisabledFakeHarnessContractUpstreamEchoVerification: true;
  readyForJavaV127MiniKvV128ParallelEvidence: boolean;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
  fakeHarnessRuntimeEnabled: false;
  fakeHarnessInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  credentialValueProvided: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlRendered: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  fakeSecretProviderInstantiated: false;
  fakeResolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
  sourceNodeV289: SourceNodeV289DisabledFakeHarnessContractUpstreamEchoVerificationReference;
  executionDeniedRoutePreflight: DisabledFakeHarnessExecutionDeniedRoutePreflight;
  simulatedRouteAttempts: DisabledFakeHarnessDeniedRouteAttempt[];
  checks: DisabledFakeHarnessExecutionDeniedRoutePreflightChecks;
  summary: DisabledFakeHarnessExecutionDeniedRoutePreflightSummary;
  productionBlockers: DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[];
  warnings: DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[];
  recommendations: DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[];
  evidenceEndpoints: {
    executionDeniedRoutePreflightJson: string;
    executionDeniedRoutePreflightMarkdown: string;
    sourceNodeV289Json: string;
    sourceNodeV289Markdown: string;
    activePlan: string;
    nextRecommendedParallel: "Java v127 + mini-kv v128";
    nextNodeVerification: "Node v291";
  };
  nextActions: string[];
}

export interface SourceNodeV289DisabledFakeHarnessContractUpstreamEchoVerificationReference {
  sourceVersion: "Node v289";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile["verificationState"];
  readyForDisabledFakeHarnessContractUpstreamEchoVerification: boolean;
  verificationDigest: string;
  sourceSpan: "Node v288 + Java v122-v126 + mini-kv v127";
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  javaEvidenceReady: boolean;
  miniKvNonParticipationReady: boolean;
  implementationStillBlocked: true;
  readyForNextDisabledFakeHarnessPlanning: boolean;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
  fakeHarnessRuntimeEnabled: false;
  fakeHarnessInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  credentialValueProvided: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlRendered: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  fakeSecretProviderInstantiated: false;
  fakeResolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface DisabledFakeHarnessExecutionDeniedRoutePreflight {
  preflightDigest: string;
  preflightMode: "disabled-fake-harness-execution-denied-route-preflight-only";
  sourceSpan: "Node v289";
  routeSurface: "audit-json-markdown-route";
  routePath: string;
  httpMethod: "GET";
  formatModes: ["json", "markdown"];
  routeRegistered: boolean;
  routeReadOnly: true;
  routeExecutionDenied: true;
  executionDeniedReasonCount: number;
  simulatedAttemptCount: number;
  deniedAttemptCount: number;
  actualExecutionAttemptCount: number;
  approvalGateRequired: true;
  approvalGateSatisfied: false;
  credentialValueReadAllowed: false;
  rawEndpointUrlParseAllowed: false;
  providerClientInstantiationAllowed: false;
  httpTcpDialAllowed: false;
  ledgerWriteAllowed: false;
  schemaMigrationAllowed: false;
  fakeHarnessRuntimeImplementationAllowed: false;
  fakeHarnessRuntimeInvocationAllowed: false;
  automaticUpstreamStartAllowed: false;
  denialReasons: string[];
}

export interface DisabledFakeHarnessDeniedRouteAttempt {
  id:
    | "approval-gate"
    | "credential-value"
    | "raw-endpoint-url"
    | "provider-client"
    | "http-tcp"
    | "ledger-schema"
    | "fake-harness-runtime"
    | "automatic-upstream-start";
  surface: "node-route" | "credential-boundary" | "endpoint-boundary" | "provider-client-boundary" | "network-boundary" | "write-boundary" | "runtime-boundary";
  requestedOperation: string;
  simulatedOnly: true;
  actualExecutionAttempted: false;
  denied: true;
  executionAllowed: false;
  deniedBy: string;
  sourceEvidence: string;
}

export type DisabledFakeHarnessExecutionDeniedRoutePreflightChecks = {
  sourceNodeV289Ready: boolean;
  sourceNodeV289DigestValid: boolean;
  sourceNodeV289KeepsRuntimeBlocked: boolean;
  sourceNodeV289KeepsConnectionBlocked: boolean;
  sourceNodeV289KeepsCredentialBoundaryClosed: boolean;
  sourceNodeV289KeepsEndpointBoundaryClosed: boolean;
  sourceNodeV289KeepsWritesBlocked: boolean;
  routeRegisteredAsAuditJsonMarkdown: boolean;
  routeReadOnlyGetOnly: boolean;
  routeExecutionDenied: boolean;
  allDeniedAttemptsSimulatedOnly: boolean;
  allDeniedAttemptsBlocked: boolean;
  approvalGateStillRequired: boolean;
  credentialValueStillForbidden: boolean;
  rawEndpointStillForbidden: boolean;
  providerClientStillForbidden: boolean;
  httpTcpStillForbidden: boolean;
  ledgerSchemaStillForbidden: boolean;
  fakeHarnessRuntimeStillAbsent: boolean;
  automaticUpstreamStartStillBlocked: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight: boolean;
};

export interface DisabledFakeHarnessExecutionDeniedRoutePreflightSummary {
  checkCount: number;
  passedCheckCount: number;
  simulatedAttemptCount: number;
  deniedAttemptCount: number;
  actualExecutionAttemptCount: number;
  denialReasonCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface DisabledFakeHarnessExecutionDeniedRoutePreflightMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight"
    | "node-v289-disabled-fake-harness-contract-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
