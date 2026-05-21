import type {
  ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1";
  contractState: "disabled-fake-harness-contract-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract: boolean;
  readOnlyContract: true;
  disabledFakeHarnessContractOnly: true;
  consumesNodeV287TestOnlyFakeHarnessPrecheck: true;
  readyForJavaV122MiniKvV127ParallelEcho: boolean;
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
  sourceNodeV287: SourceNodeV287TestOnlyFakeHarnessPrecheckReference;
  disabledFakeHarnessContract: DisabledFakeHarnessContract;
  upstreamEchoRequirement: DisabledFakeHarnessContractUpstreamEchoRequirement;
  checks: DisabledFakeHarnessContractChecks;
  summary: DisabledFakeHarnessContractSummary;
  productionBlockers: DisabledFakeHarnessContractMessage[];
  warnings: DisabledFakeHarnessContractMessage[];
  recommendations: DisabledFakeHarnessContractMessage[];
  evidenceEndpoints: {
    disabledFakeHarnessContractJson: string;
    disabledFakeHarnessContractMarkdown: string;
    sourceNodeV287Json: string;
    sourceNodeV287Markdown: string;
    activePlan: string;
    nextRecommendedParallel: "Java v122 + mini-kv v127";
    nextNodeVerification: "Node v289";
  };
  nextActions: string[];
}

export interface SourceNodeV287TestOnlyFakeHarnessPrecheckReference {
  sourceVersion: "Node v287";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile["profileVersion"];
  precheckState: ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile["precheckState"];
  readyForTestOnlyFakeHarnessPrecheck: boolean;
  readyForDisabledFakeHarnessContract: boolean;
  precheckDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  immediateJavaEchoRequired: false;
  immediateMiniKvEchoRequired: false;
  recommendedParallelVersionCount: 2;
  fakeHarnessRuntimeEnabled: false;
  fakeHarnessInvocationAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
  realResolverImplementationAllowed: false;
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

export interface DisabledFakeHarnessContract {
  contractDigest: string;
  contractMode: "disabled-test-only-fake-harness-contract-only";
  sourceSpan: "Node v287";
  contractName: "ManagedAuditCredentialResolverDisabledFakeHarnessContract";
  runtimeToggleName: "ORDEROPS_MANAGED_AUDIT_TEST_ONLY_FAKE_HARNESS_ENABLED";
  defaultRuntimeToggleValue: false;
  invocationState: "disabled";
  runtimeImplementationPresent: false;
  runtimeInvocationAllowed: false;
  requiredInputs: string[];
  allowedOutputs: string[];
  prohibitedInputs: string[];
  requiredArtifacts: string[];
  contractAssertions: string[];
  prohibitedActions: string[];
  credentialBoundary: {
    credentialHandleOnly: true;
    credentialValueRead: false;
    credentialValueProvided: false;
    credentialValueStored: false;
  };
  endpointBoundary: {
    endpointHandleOnly: true;
    rawEndpointUrlParsed: false;
    rawEndpointUrlRendered: false;
    rawEndpointUrlProvided: false;
  };
  providerClientBoundary: {
    realSecretProviderInstantiated: false;
    realResolverClientInstantiated: false;
    fakeSecretProviderInstantiated: false;
    fakeResolverClientInstantiated: false;
  };
  networkBoundary: {
    externalRequestSent: false;
    connectsManagedAudit: false;
    httpTcpDialAllowed: false;
  };
  writeBoundary: {
    executionAllowed: false;
    schemaMigrationExecuted: false;
    approvalLedgerWritten: false;
  };
  autoStartBoundary: {
    automaticUpstreamStart: false;
  };
}

export interface DisabledFakeHarnessContractUpstreamEchoRequirement {
  decisionMode: "recommended-parallel-upstream-echo-required";
  javaEchoRequiredNow: true;
  miniKvEchoRequiredNow: true;
  recommendedParallelVersions: [
    "Java v122 integration-tests split plus disabled fake harness echo marker",
    "mini-kv v127 disabled fake harness non-participation receipt",
  ];
  nodeVerificationVersion: "Node v289";
  reason: string;
}

export type DisabledFakeHarnessContractChecks = {
  sourceNodeV287Ready: boolean;
  sourceNodeV287KeepsRuntimeBlocked: boolean;
  sourceNodeV287AllowsContractOnly: boolean;
  contractDigestValid: boolean;
  contractDefaultDisabled: boolean;
  contractInvocationBlocked: boolean;
  runtimeImplementationAbsent: boolean;
  credentialBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  providerClientBoundaryClosed: boolean;
  networkBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  autoStartBoundaryClosed: boolean;
  requiredInputsNamed: boolean;
  allowedOutputsNamed: boolean;
  prohibitedInputsNamed: boolean;
  requiredArtifactsNamed: boolean;
  contractAssertionsNamed: boolean;
  prohibitedActionsNamed: boolean;
  upstreamEchoRequiredForJavaAndMiniKv: boolean;
  recommendedParallelExplicit: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract: boolean;
};

export interface DisabledFakeHarnessContractSummary {
  checkCount: number;
  passedCheckCount: number;
  requiredInputCount: number;
  allowedOutputCount: number;
  prohibitedInputCount: number;
  requiredArtifactCount: number;
  contractAssertionCount: number;
  prohibitedActionCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  javaEchoRequiredNow: true;
  miniKvEchoRequiredNow: true;
  recommendedParallelVersionCount: 2;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface DisabledFakeHarnessContractMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract"
    | "node-v287-test-only-fake-harness-precheck"
    | "runtime-config";
  message: string;
}
