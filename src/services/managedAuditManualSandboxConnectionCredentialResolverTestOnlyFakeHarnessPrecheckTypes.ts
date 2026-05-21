import type {
  ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck.v1";
  precheckState: "test-only-fake-harness-precheck-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck: boolean;
  readOnlyPrecheck: true;
  testOnlyFakeHarnessPrecheckOnly: true;
  consumesNodeV286ImplementationPlanUpstreamEchoVerification: true;
  readyForDisabledFakeHarnessContract: boolean;
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
  sourceNodeV286: SourceNodeV286ImplementationPlanUpstreamEchoVerificationReference;
  fakeHarnessPrecheck: TestOnlyFakeHarnessPrecheck;
  upstreamEchoDecision: TestOnlyFakeHarnessUpstreamEchoDecision;
  checks: TestOnlyFakeHarnessPrecheckChecks;
  summary: TestOnlyFakeHarnessPrecheckSummary;
  productionBlockers: TestOnlyFakeHarnessPrecheckMessage[];
  warnings: TestOnlyFakeHarnessPrecheckMessage[];
  recommendations: TestOnlyFakeHarnessPrecheckMessage[];
  evidenceEndpoints: {
    testOnlyFakeHarnessPrecheckJson: string;
    testOnlyFakeHarnessPrecheckMarkdown: string;
    sourceNodeV286Json: string;
    sourceNodeV286Markdown: string;
    activePlan: string;
    nextNodeVersion: "Node v288";
  };
  nextActions: string[];
}

export interface SourceNodeV286ImplementationPlanUpstreamEchoVerificationReference {
  sourceVersion: "Node v286";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationProfile["verificationState"];
  readyForImplementationPlanUpstreamEchoVerification: boolean;
  readyForNodeV287TestOnlyFakeHarnessPrecheck: boolean;
  verificationDigest: string;
  sourceSpan: "Node v283 + Java v121 + mini-kv v126";
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  sideEffectBoundariesAligned: boolean;
  implementationStillBlocked: true;
  originalExpectedNodeV284SatisfiedByNodeV286: true;
  realResolverImplementationAllowed: false;
  testOnlyFakeHarnessAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  rawEndpointUrlRendered: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  approvalLedgerWritten: false;
  automaticUpstreamStart: false;
}

export interface TestOnlyFakeHarnessPrecheck {
  precheckDigest: string;
  precheckMode: "test-only-fake-harness-precheck-only";
  sourceSpan: "Node v286";
  fakeHarnessName: "ManagedAuditCredentialResolverTestOnlyFakeHarness";
  runtimeToggleName: "ORDEROPS_MANAGED_AUDIT_TEST_ONLY_FAKE_HARNESS_ENABLED";
  defaultRuntimeToggleValue: false;
  fakeHarnessRuntimeEnabled: false;
  fakeHarnessInvocationAllowed: false;
  testOnlyFakeHarnessExecutionAllowed: false;
  allowedInputs: string[];
  allowedOutputs: string[];
  requiredArtifacts: string[];
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

export interface TestOnlyFakeHarnessUpstreamEchoDecision {
  decisionMode: "explicit-parallel-echo-decision";
  javaEchoRequiredNow: false;
  miniKvEchoRequiredNow: false;
  reason: string;
  recommendedParallelAfterDisabledHarnessContract: [
    "Java v122 disabled fake harness echo receipt",
    "mini-kv v127 disabled fake harness non-participation receipt",
  ];
}

export type TestOnlyFakeHarnessPrecheckChecks = {
  sourceNodeV286Ready: boolean;
  sourceNodeV286KeepsRuntimeBlocked: boolean;
  sourceNodeV286EnablesPrecheckOnly: boolean;
  fakeHarnessDefaultDisabled: boolean;
  fakeHarnessExecutionBlocked: boolean;
  credentialBoundaryClosed: boolean;
  rawEndpointBoundaryClosed: boolean;
  providerClientBoundaryClosed: boolean;
  networkBoundaryClosed: boolean;
  writeBoundaryClosed: boolean;
  autoStartBoundaryClosed: boolean;
  requiredArtifactsNamed: boolean;
  prohibitedActionsNamed: boolean;
  upstreamEchoDecisionExplicit: boolean;
  noImmediateJavaEchoRequired: boolean;
  noImmediateMiniKvEchoRequired: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck: boolean;
};

export interface TestOnlyFakeHarnessPrecheckSummary {
  checkCount: number;
  passedCheckCount: number;
  requiredArtifactCount: number;
  prohibitedActionCount: number;
  allowedInputCount: number;
  allowedOutputCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  immediateJavaEchoRequired: false;
  immediateMiniKvEchoRequired: false;
  recommendedParallelVersionCount: 2;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface TestOnlyFakeHarnessPrecheckMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck"
    | "node-v286-implementation-plan-upstream-echo-verification"
    | "runtime-config";
  message: string;
}
