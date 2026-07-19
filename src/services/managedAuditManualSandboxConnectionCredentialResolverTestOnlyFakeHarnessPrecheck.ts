import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile,
  SourceNodeV286ImplementationPlanUpstreamEchoVerificationReference,
  TestOnlyFakeHarnessPrecheck,
  TestOnlyFakeHarnessPrecheckChecks,
  TestOnlyFakeHarnessPrecheckMessage,
  TestOnlyFakeHarnessPrecheckSummary,
  TestOnlyFakeHarnessUpstreamEchoDecision,
} from "./managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck";
const SOURCE_NODE_V286_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v282-post-upstream-echo-verification-roadmap.md";

const ALLOWED_INPUTS = [
  "fake-credential-handle",
  "fake-endpoint-handle",
  "operator-approval-artifact-reference",
  "resolver-policy-handle-review-id",
  "test-only-harness-toggle-state",
  "failure-taxonomy-simulation-map",
  "rollback-abort-marker",
];

const ALLOWED_OUTPUTS = [
  "test-only-fake-harness-plan-id",
  "fake-harness-runtime-toggle-state",
  "side-effect-boundary-summary",
  "credential-boundary-summary",
  "endpoint-boundary-summary",
  "blocked-runtime-reason",
  "next-upstream-echo-decision",
];

const REQUIRED_ARTIFACTS = [
  "test-only-fake-harness-plan-id",
  "fake-harness-disabled-toggle",
  "fake-harness-side-effect-contract",
  "fake-credential-handle-fixture",
  "fake-endpoint-handle-fixture",
  "operator-approval-artifact-reference",
  "failure-taxonomy-simulation-map",
  "rollback-abort-marker",
];

const PROHIBITED_ACTIONS = [
  "read-credential-value",
  "store-credential-value",
  "render-credential-value",
  "parse-raw-endpoint-url",
  "render-raw-endpoint-url",
  "instantiate-real-secret-provider",
  "instantiate-real-resolver-client",
  "instantiate-fake-secret-provider-during-precheck",
  "instantiate-fake-resolver-client-during-precheck",
  "send-external-request",
  "connect-managed-audit",
  "write-approval-ledger",
  "execute-schema-migration",
  "auto-start-upstream",
];

export function loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile {
  const sourceNodeV286 = createSourceNodeV286(input.config);
  const fakeHarnessPrecheck = createFakeHarnessPrecheck(sourceNodeV286);
  const upstreamEchoDecision = createUpstreamEchoDecision();
  const checks = createChecks(input.config, sourceNodeV286, fakeHarnessPrecheck, upstreamEchoDecision);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck")
      .every(([, value]) => value);
  const precheckState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck
    ? "test-only-fake-harness-precheck-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV286, fakeHarnessPrecheck, upstreamEchoDecision, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver test-only fake harness precheck",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    precheckState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck,
    readOnlyPrecheck: true,
    testOnlyFakeHarnessPrecheckOnly: true,
    consumesNodeV286ImplementationPlanUpstreamEchoVerification: true,
    readyForDisabledFakeHarnessContract:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueProvided: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV286,
    fakeHarnessPrecheck,
    upstreamEchoDecision,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      testOnlyFakeHarnessPrecheckJson: ROUTE_PATH,
      testOnlyFakeHarnessPrecheckMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV286Json: SOURCE_NODE_V286_ROUTE,
      sourceNodeV286Markdown: `${SOURCE_NODE_V286_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v288",
    },
    nextActions: [
      "Archive Node v287 with JSON, Markdown, screenshot/explanation evidence, and code walkthrough.",
      "Use Node v288 only for a disabled fake harness contract; do not instantiate fake providers or clients in v287.",
      "No immediate Java or mini-kv echo is required for v287 because this version defines precheck boundaries only.",
      "After Node v288 defines a disabled fake harness contract, recommend parallel Java v122 + mini-kv v127 read-only echo/non-participation receipts.",
      "Do not read credential values, parse raw endpoint URLs, send HTTP/TCP, connect managed audit, write ledgers, run schema migration, or auto-start upstream services.",
    ],
  };
}

function createSourceNodeV286(
  config: AppConfig,
): SourceNodeV286ImplementationPlanUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification({
    config,
  });
  return {
    sourceVersion: "Node v286",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForImplementationPlanUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification,
    readyForNodeV287TestOnlyFakeHarnessPrecheck:
      source.echoVerification.readyForNodeV287TestOnlyFakeHarnessPrecheck,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: true,
    originalExpectedNodeV284SatisfiedByNodeV286: true,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
  };
}

function createFakeHarnessPrecheck(
  sourceNodeV286: SourceNodeV286ImplementationPlanUpstreamEchoVerificationReference,
): TestOnlyFakeHarnessPrecheck {
  const payload = {
    profileVersion: PROFILE_VERSION,
    sourceVerificationDigest: sourceNodeV286.verificationDigest,
    allowedInputs: ALLOWED_INPUTS,
    allowedOutputs: ALLOWED_OUTPUTS,
    requiredArtifacts: REQUIRED_ARTIFACTS,
    prohibitedActions: PROHIBITED_ACTIONS,
    fakeHarnessRuntimeEnabled: false,
  };
  return {
    precheckDigest: sha256StableJson(payload),
    precheckMode: "test-only-fake-harness-precheck-only",
    sourceSpan: "Node v286",
    fakeHarnessName: "ManagedAuditCredentialResolverTestOnlyFakeHarness",
    runtimeToggleName: "ORDEROPS_MANAGED_AUDIT_TEST_ONLY_FAKE_HARNESS_ENABLED",
    defaultRuntimeToggleValue: false,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    allowedInputs: [...ALLOWED_INPUTS],
    allowedOutputs: [...ALLOWED_OUTPUTS],
    requiredArtifacts: [...REQUIRED_ARTIFACTS],
    prohibitedActions: [...PROHIBITED_ACTIONS],
    credentialBoundary: {
      credentialHandleOnly: true,
      credentialValueRead: false,
      credentialValueProvided: false,
      credentialValueStored: false,
    },
    endpointBoundary: {
      endpointHandleOnly: true,
      rawEndpointUrlParsed: false,
      rawEndpointUrlRendered: false,
      rawEndpointUrlProvided: false,
    },
    providerClientBoundary: {
      realSecretProviderInstantiated: false,
      realResolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
    },
    networkBoundary: {
      externalRequestSent: false,
      connectsManagedAudit: false,
      httpTcpDialAllowed: false,
    },
    writeBoundary: {
      executionAllowed: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
    },
    autoStartBoundary: {
      automaticUpstreamStart: false,
    },
  };
}

function createUpstreamEchoDecision(): TestOnlyFakeHarnessUpstreamEchoDecision {
  return {
    decisionMode: "explicit-parallel-echo-decision",
    javaEchoRequiredNow: false,
    miniKvEchoRequiredNow: false,
    reason:
      "Node v287 is a precheck-only boundary report and does not introduce a disabled fake harness contract yet, so Java and mini-kv do not need immediate echo versions. Once Node v288 defines that contract, Java v122 and mini-kv v127 should run in parallel as read-only echo/non-participation receipts.",
    recommendedParallelAfterDisabledHarnessContract: [
      "Java v122 disabled fake harness echo receipt",
      "mini-kv v127 disabled fake harness non-participation receipt",
    ],
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV286: SourceNodeV286ImplementationPlanUpstreamEchoVerificationReference,
  fakeHarnessPrecheck: TestOnlyFakeHarnessPrecheck,
  upstreamEchoDecision: TestOnlyFakeHarnessUpstreamEchoDecision,
): TestOnlyFakeHarnessPrecheckChecks {
  const credentialBoundaryClosed =
    sourceNodeV286.credentialValueRead === false
    && fakeHarnessPrecheck.credentialBoundary.credentialHandleOnly === true
    && fakeHarnessPrecheck.credentialBoundary.credentialValueRead === false
    && fakeHarnessPrecheck.credentialBoundary.credentialValueProvided === false
    && fakeHarnessPrecheck.credentialBoundary.credentialValueStored === false;
  const rawEndpointBoundaryClosed =
    sourceNodeV286.rawEndpointUrlParsed === false
    && sourceNodeV286.rawEndpointUrlRendered === false
    && fakeHarnessPrecheck.endpointBoundary.endpointHandleOnly === true
    && fakeHarnessPrecheck.endpointBoundary.rawEndpointUrlParsed === false
    && fakeHarnessPrecheck.endpointBoundary.rawEndpointUrlRendered === false
    && fakeHarnessPrecheck.endpointBoundary.rawEndpointUrlProvided === false;
  const providerClientBoundaryClosed =
    sourceNodeV286.secretProviderInstantiated === false
    && sourceNodeV286.resolverClientInstantiated === false
    && fakeHarnessPrecheck.providerClientBoundary.realSecretProviderInstantiated === false
    && fakeHarnessPrecheck.providerClientBoundary.realResolverClientInstantiated === false
    && fakeHarnessPrecheck.providerClientBoundary.fakeSecretProviderInstantiated === false
    && fakeHarnessPrecheck.providerClientBoundary.fakeResolverClientInstantiated === false;
  const networkBoundaryClosed =
    sourceNodeV286.externalRequestSent === false
    && sourceNodeV286.connectsManagedAudit === false
    && fakeHarnessPrecheck.networkBoundary.externalRequestSent === false
    && fakeHarnessPrecheck.networkBoundary.connectsManagedAudit === false
    && fakeHarnessPrecheck.networkBoundary.httpTcpDialAllowed === false;
  const writeBoundaryClosed =
    sourceNodeV286.executionAllowed === false
    && sourceNodeV286.schemaMigrationExecuted === false
    && sourceNodeV286.approvalLedgerWritten === false
    && fakeHarnessPrecheck.writeBoundary.executionAllowed === false
    && fakeHarnessPrecheck.writeBoundary.schemaMigrationExecuted === false
    && fakeHarnessPrecheck.writeBoundary.approvalLedgerWritten === false;
  const autoStartBoundaryClosed =
    sourceNodeV286.automaticUpstreamStart === false
    && fakeHarnessPrecheck.autoStartBoundary.automaticUpstreamStart === false;

  return {
    sourceNodeV286Ready:
      sourceNodeV286.readyForImplementationPlanUpstreamEchoVerification
      && sourceNodeV286.verificationState === "credential-resolver-implementation-plan-upstream-echo-verification-ready"
      && sourceNodeV286.productionBlockerCount === 0,
    sourceNodeV286KeepsRuntimeBlocked:
      sourceNodeV286.realResolverImplementationAllowed === false
      && sourceNodeV286.testOnlyFakeHarnessAllowed === false
      && sourceNodeV286.executionAllowed === false
      && sourceNodeV286.connectsManagedAudit === false
      && sourceNodeV286.sideEffectBoundariesAligned === true
      && sourceNodeV286.implementationStillBlocked === true,
    sourceNodeV286EnablesPrecheckOnly:
      sourceNodeV286.readyForNodeV287TestOnlyFakeHarnessPrecheck === true,
    fakeHarnessDefaultDisabled:
      fakeHarnessPrecheck.defaultRuntimeToggleValue === false
      && fakeHarnessPrecheck.fakeHarnessRuntimeEnabled === false,
    fakeHarnessExecutionBlocked:
      fakeHarnessPrecheck.fakeHarnessInvocationAllowed === false
      && fakeHarnessPrecheck.testOnlyFakeHarnessExecutionAllowed === false,
    credentialBoundaryClosed,
    rawEndpointBoundaryClosed,
    providerClientBoundaryClosed,
    networkBoundaryClosed,
    writeBoundaryClosed,
    autoStartBoundaryClosed,
    requiredArtifactsNamed:
      fakeHarnessPrecheck.requiredArtifacts.length === REQUIRED_ARTIFACTS.length
      && fakeHarnessPrecheck.requiredArtifacts.every((artifact) => artifact.length > 0),
    prohibitedActionsNamed:
      fakeHarnessPrecheck.prohibitedActions.length === PROHIBITED_ACTIONS.length
      && fakeHarnessPrecheck.prohibitedActions.every((action) => action.length > 0),
    upstreamEchoDecisionExplicit:
      upstreamEchoDecision.decisionMode === "explicit-parallel-echo-decision"
      && upstreamEchoDecision.recommendedParallelAfterDisabledHarnessContract.length === 2,
    noImmediateJavaEchoRequired: upstreamEchoDecision.javaEchoRequiredNow === false,
    noImmediateMiniKvEchoRequired: upstreamEchoDecision.miniKvEchoRequiredNow === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck: false,
  };
}

function createSummary(
  sourceNodeV286: SourceNodeV286ImplementationPlanUpstreamEchoVerificationReference,
  fakeHarnessPrecheck: TestOnlyFakeHarnessPrecheck,
  upstreamEchoDecision: TestOnlyFakeHarnessUpstreamEchoDecision,
  checks: TestOnlyFakeHarnessPrecheckChecks,
  productionBlockers: TestOnlyFakeHarnessPrecheckMessage[],
  warnings: TestOnlyFakeHarnessPrecheckMessage[],
  recommendations: TestOnlyFakeHarnessPrecheckMessage[],
): TestOnlyFakeHarnessPrecheckSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    requiredArtifactCount: fakeHarnessPrecheck.requiredArtifacts.length,
    prohibitedActionCount: fakeHarnessPrecheck.prohibitedActions.length,
    allowedInputCount: fakeHarnessPrecheck.allowedInputs.length,
    allowedOutputCount: fakeHarnessPrecheck.allowedOutputs.length,
    sourceCheckCount: sourceNodeV286.sourceCheckCount,
    sourcePassedCheckCount: sourceNodeV286.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV286.productionBlockerCount,
    immediateJavaEchoRequired: upstreamEchoDecision.javaEchoRequiredNow,
    immediateMiniKvEchoRequired: upstreamEchoDecision.miniKvEchoRequiredNow,
    recommendedParallelVersionCount: upstreamEchoDecision.recommendedParallelAfterDisabledHarnessContract.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: TestOnlyFakeHarnessPrecheckChecks,
): TestOnlyFakeHarnessPrecheckMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: TestOnlyFakeHarnessPrecheckMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV286Ready,
      code: "NODE_V286_VERIFICATION_NOT_READY",
      source: "node-v286-implementation-plan-upstream-echo-verification",
      message: "Node v286 implementation-plan upstream echo verification must be ready before v287 prechecks the fake harness.",
    },
    {
      condition: checks.sourceNodeV286KeepsRuntimeBlocked,
      code: "NODE_V286_RUNTIME_BOUNDARY_OPENED",
      source: "node-v286-implementation-plan-upstream-echo-verification",
      message: "Node v286 must keep real resolver, fake harness runtime, execution, and managed audit connection blocked.",
    },
    {
      condition: checks.sourceNodeV286EnablesPrecheckOnly,
      code: "NODE_V286_DID_NOT_ENABLE_PRECHECK",
      source: "node-v286-implementation-plan-upstream-echo-verification",
      message: "Node v286 echoVerification must explicitly mark Node v287 test-only fake harness precheck as ready.",
    },
    {
      condition: checks.fakeHarnessDefaultDisabled && checks.fakeHarnessExecutionBlocked,
      code: "FAKE_HARNESS_NOT_DISABLED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "The fake harness must remain disabled and non-invocable during the v287 precheck.",
    },
    {
      condition: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "v287 may name only credential handles; credential values must not be read, provided, stored, or rendered.",
    },
    {
      condition: checks.rawEndpointBoundaryClosed,
      code: "RAW_ENDPOINT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "v287 may name only endpoint handles; raw endpoint URLs must not be parsed, provided, or rendered.",
    },
    {
      condition: checks.providerClientBoundaryClosed,
      code: "PROVIDER_CLIENT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "v287 must not instantiate real or fake provider/client objects; it is a precheck report only.",
    },
    {
      condition: checks.networkBoundaryClosed,
      code: "NETWORK_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "v287 must not send external HTTP/TCP or connect managed audit.",
    },
    {
      condition: checks.writeBoundaryClosed,
      code: "WRITE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "v287 must not write approval ledger state or run schema migration.",
    },
    {
      condition: checks.autoStartBoundaryClosed,
      code: "AUTO_START_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "v287 must not auto-start Node, Java, mini-kv, or external audit services.",
    },
    {
      condition: checks.requiredArtifactsNamed && checks.prohibitedActionsNamed,
      code: "HARNESS_ARTIFACTS_OR_PROHIBITIONS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "The fake harness precheck must name all required artifacts and prohibited actions.",
    },
    {
      condition:
        checks.upstreamEchoDecisionExplicit
        && checks.noImmediateJavaEchoRequired
        && checks.noImmediateMiniKvEchoRequired,
      code: "UPSTREAM_ECHO_DECISION_NOT_EXPLICIT",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "v287 must explicitly state whether Java and mini-kv need immediate echo versions.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during test-only fake harness precheck.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during test-only fake harness precheck.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): TestOnlyFakeHarnessPrecheckMessage[] {
  return [
    {
      code: "FAKE_HARNESS_NOT_IMPLEMENTED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "v287 defines a precheck boundary only; it does not create an executable fake harness contract.",
    },
    {
      code: "REAL_CONNECTION_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "Real managed audit resolver implementation and sandbox adapter connection remain blocked after v287.",
    },
  ];
}

function collectRecommendations(): TestOnlyFakeHarnessPrecheckMessage[] {
  return [
    {
      code: "RUN_NODE_V288_DISABLED_FAKE_HARNESS_CONTRACT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "Use Node v288 to define a disabled fake resolver harness contract, still without runtime invocation.",
    },
    {
      code: "PLAN_PARALLEL_JAVA_V122_MINI_KV_V127_AFTER_V288",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck",
      message: "After Node v288 exists, recommend parallel Java v122 and mini-kv v127 read-only echo/non-participation versions.",
    },
  ];
}
