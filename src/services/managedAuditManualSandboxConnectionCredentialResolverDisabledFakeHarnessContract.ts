import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck,
} from "./managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckTypes.js";
import type {
  DisabledFakeHarnessContract,
  DisabledFakeHarnessContractChecks,
  DisabledFakeHarnessContractMessage,
  DisabledFakeHarnessContractSummary,
  DisabledFakeHarnessContractUpstreamEchoRequirement,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractProfile,
  SourceNodeV287TestOnlyFakeHarnessPrecheckReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract";
const SOURCE_NODE_V287_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck";
const ACTIVE_PLAN = "docs/plans2/v287-post-test-only-fake-harness-precheck-roadmap.md";

const REQUIRED_INPUTS = [
  "fake-credential-handle",
  "fake-endpoint-handle",
  "operator-approval-artifact-reference",
  "failure-taxonomy-simulation-map",
  "rollback-abort-marker",
  "disabled-runtime-toggle-state",
];

const ALLOWED_OUTPUTS = [
  "disabled-fake-harness-contract-digest",
  "disabled-runtime-toggle-state",
  "side-effect-boundary-summary",
  "upstream-echo-requirement",
  "blocked-runtime-reason",
];

const PROHIBITED_INPUTS = [
  "credential-value",
  "raw-endpoint-url",
  "secret-provider-instance",
  "resolver-client-instance",
  "managed-audit-http-client",
  "approval-ledger-write-request",
];

const REQUIRED_ARTIFACTS = [
  "disabled-fake-harness-contract-id",
  "disabled-runtime-toggle-proof",
  "credential-handle-fixture",
  "endpoint-handle-fixture",
  "operator-approval-artifact-reference",
  "failure-taxonomy-simulation-map",
  "side-effect-boundary-proof",
  "java-v122-echo-marker-requirement",
  "mini-kv-v127-non-participation-receipt-requirement",
];

const CONTRACT_ASSERTIONS = [
  "fake-harness-runtime-defaults-disabled",
  "fake-harness-runtime-implementation-absent",
  "fake-harness-invocation-blocked",
  "credential-value-never-read",
  "raw-endpoint-url-never-parsed",
  "provider-client-instantiation-blocked",
  "external-network-blocked",
  "ledger-and-schema-writes-blocked",
  "automatic-upstream-start-blocked",
  "parallel-java-mini-kv-echo-required-before-node-v289",
];

const PROHIBITED_ACTIONS = [
  "read-credential-value",
  "store-credential-value",
  "render-credential-value",
  "parse-raw-endpoint-url",
  "render-raw-endpoint-url",
  "instantiate-real-secret-provider",
  "instantiate-real-resolver-client",
  "instantiate-fake-secret-provider",
  "instantiate-fake-resolver-client",
  "send-external-request",
  "connect-managed-audit",
  "write-approval-ledger",
  "execute-schema-migration",
  "execute-fake-harness-runtime",
  "auto-start-upstream",
];

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractProfile {
  const sourceNodeV287 = createSourceNodeV287(input.config);
  const disabledFakeHarnessContract = createDisabledFakeHarnessContract(sourceNodeV287);
  const upstreamEchoRequirement = createUpstreamEchoRequirement();
  const checks = createChecks(input.config, sourceNodeV287, disabledFakeHarnessContract, upstreamEchoRequirement);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract")
      .every(([, value]) => value);
  const contractState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract
    ? "disabled-fake-harness-contract-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV287, disabledFakeHarnessContract, upstreamEchoRequirement, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled fake harness contract",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    contractState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
    readOnlyContract: true,
    disabledFakeHarnessContractOnly: true,
    consumesNodeV287TestOnlyFakeHarnessPrecheck: true,
    readyForJavaV122MiniKvV127ParallelEcho:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
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
    sourceNodeV287,
    disabledFakeHarnessContract,
    upstreamEchoRequirement,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledFakeHarnessContractJson: ROUTE_PATH,
      disabledFakeHarnessContractMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV287Json: SOURCE_NODE_V287_ROUTE,
      sourceNodeV287Markdown: `${SOURCE_NODE_V287_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextRecommendedParallel: "Java v122 + mini-kv v127",
      nextNodeVerification: "Node v289",
    },
    nextActions: [
      "Archive Node v288 with JSON, Markdown, explanation, and code walkthrough evidence.",
      "Run Java v122 and mini-kv v127 as a recommended parallel cross-project pair only after Node v288 is archived.",
      "Keep Java v122 focused on Integration Tests split plus disabled fake harness echo marker; keep mini-kv v127 focused on non-participation receipt.",
      "Do not run or instantiate the fake harness runtime in Node v288.",
      "Do not read credential values, parse raw endpoint URLs, send HTTP/TCP, connect managed audit, write ledgers, run schema migration, or auto-start upstream services.",
    ],
  };
}

function createSourceNodeV287(
  config: AppConfig,
): SourceNodeV287TestOnlyFakeHarnessPrecheckReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck({
    config,
  });
  return {
    sourceVersion: "Node v287",
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    readyForTestOnlyFakeHarnessPrecheck:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck,
    readyForDisabledFakeHarnessContract: source.readyForDisabledFakeHarnessContract,
    precheckDigest: source.fakeHarnessPrecheck.precheckDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    immediateJavaEchoRequired: false,
    immediateMiniKvEchoRequired: false,
    recommendedParallelVersionCount: source.summary.recommendedParallelVersionCount,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
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
  };
}

function createDisabledFakeHarnessContract(
  sourceNodeV287: SourceNodeV287TestOnlyFakeHarnessPrecheckReference,
): DisabledFakeHarnessContract {
  const payload = {
    profileVersion: PROFILE_VERSION,
    sourcePrecheckDigest: sourceNodeV287.precheckDigest,
    requiredInputs: REQUIRED_INPUTS,
    allowedOutputs: ALLOWED_OUTPUTS,
    prohibitedInputs: PROHIBITED_INPUTS,
    requiredArtifacts: REQUIRED_ARTIFACTS,
    contractAssertions: CONTRACT_ASSERTIONS,
    prohibitedActions: PROHIBITED_ACTIONS,
    runtimeImplementationPresent: false,
    runtimeInvocationAllowed: false,
  };
  return {
    contractDigest: sha256StableJson(payload),
    contractMode: "disabled-test-only-fake-harness-contract-only",
    sourceSpan: "Node v287",
    contractName: "ManagedAuditCredentialResolverDisabledFakeHarnessContract",
    runtimeToggleName: "ORDEROPS_MANAGED_AUDIT_TEST_ONLY_FAKE_HARNESS_ENABLED",
    defaultRuntimeToggleValue: false,
    invocationState: "disabled",
    runtimeImplementationPresent: false,
    runtimeInvocationAllowed: false,
    requiredInputs: [...REQUIRED_INPUTS],
    allowedOutputs: [...ALLOWED_OUTPUTS],
    prohibitedInputs: [...PROHIBITED_INPUTS],
    requiredArtifacts: [...REQUIRED_ARTIFACTS],
    contractAssertions: [...CONTRACT_ASSERTIONS],
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

function createUpstreamEchoRequirement(): DisabledFakeHarnessContractUpstreamEchoRequirement {
  return {
    decisionMode: "recommended-parallel-upstream-echo-required",
    javaEchoRequiredNow: true,
    miniKvEchoRequiredNow: true,
    recommendedParallelVersions: [
      "Java v122 integration-tests split plus disabled fake harness echo marker",
      "mini-kv v127 disabled fake harness non-participation receipt",
    ],
    nodeVerificationVersion: "Node v289",
    reason:
      "Node v288 is the first disabled fake harness contract. It still does not execute runtime code, but Java and mini-kv should now echo/non-participate against this concrete contract before Node v289 verifies cross-project alignment.",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV287: SourceNodeV287TestOnlyFakeHarnessPrecheckReference,
  contract: DisabledFakeHarnessContract,
  upstreamEchoRequirement: DisabledFakeHarnessContractUpstreamEchoRequirement,
): DisabledFakeHarnessContractChecks {
  const credentialBoundaryClosed =
    sourceNodeV287.credentialValueRead === false
    && sourceNodeV287.credentialValueProvided === false
    && contract.credentialBoundary.credentialHandleOnly === true
    && contract.credentialBoundary.credentialValueRead === false
    && contract.credentialBoundary.credentialValueProvided === false
    && contract.credentialBoundary.credentialValueStored === false;
  const rawEndpointBoundaryClosed =
    sourceNodeV287.rawEndpointUrlParsed === false
    && sourceNodeV287.rawEndpointUrlRendered === false
    && contract.endpointBoundary.endpointHandleOnly === true
    && contract.endpointBoundary.rawEndpointUrlParsed === false
    && contract.endpointBoundary.rawEndpointUrlRendered === false
    && contract.endpointBoundary.rawEndpointUrlProvided === false;
  const providerClientBoundaryClosed =
    sourceNodeV287.secretProviderInstantiated === false
    && sourceNodeV287.resolverClientInstantiated === false
    && sourceNodeV287.fakeSecretProviderInstantiated === false
    && sourceNodeV287.fakeResolverClientInstantiated === false
    && contract.providerClientBoundary.realSecretProviderInstantiated === false
    && contract.providerClientBoundary.realResolverClientInstantiated === false
    && contract.providerClientBoundary.fakeSecretProviderInstantiated === false
    && contract.providerClientBoundary.fakeResolverClientInstantiated === false;
  const networkBoundaryClosed =
    sourceNodeV287.externalRequestSent === false
    && sourceNodeV287.connectsManagedAudit === false
    && contract.networkBoundary.externalRequestSent === false
    && contract.networkBoundary.connectsManagedAudit === false
    && contract.networkBoundary.httpTcpDialAllowed === false;
  const writeBoundaryClosed =
    sourceNodeV287.executionAllowed === false
    && sourceNodeV287.schemaMigrationExecuted === false
    && sourceNodeV287.approvalLedgerWritten === false
    && contract.writeBoundary.executionAllowed === false
    && contract.writeBoundary.schemaMigrationExecuted === false
    && contract.writeBoundary.approvalLedgerWritten === false;
  const autoStartBoundaryClosed =
    sourceNodeV287.automaticUpstreamStart === false
    && contract.autoStartBoundary.automaticUpstreamStart === false;

  return {
    sourceNodeV287Ready:
      sourceNodeV287.readyForTestOnlyFakeHarnessPrecheck
      && sourceNodeV287.precheckState === "test-only-fake-harness-precheck-ready"
      && sourceNodeV287.sourceProductionBlockerCount === 0,
    sourceNodeV287KeepsRuntimeBlocked:
      sourceNodeV287.realResolverImplementationAllowed === false
      && sourceNodeV287.testOnlyFakeHarnessExecutionAllowed === false
      && sourceNodeV287.fakeHarnessRuntimeEnabled === false
      && sourceNodeV287.fakeHarnessInvocationAllowed === false
      && sourceNodeV287.executionAllowed === false
      && sourceNodeV287.connectsManagedAudit === false,
    sourceNodeV287AllowsContractOnly: sourceNodeV287.readyForDisabledFakeHarnessContract === true,
    contractDigestValid: /^[a-f0-9]{64}$/.test(contract.contractDigest),
    contractDefaultDisabled:
      contract.defaultRuntimeToggleValue === false
      && contract.invocationState === "disabled",
    contractInvocationBlocked: contract.runtimeInvocationAllowed === false,
    runtimeImplementationAbsent: contract.runtimeImplementationPresent === false,
    credentialBoundaryClosed,
    rawEndpointBoundaryClosed,
    providerClientBoundaryClosed,
    networkBoundaryClosed,
    writeBoundaryClosed,
    autoStartBoundaryClosed,
    requiredInputsNamed:
      contract.requiredInputs.length === REQUIRED_INPUTS.length
      && contract.requiredInputs.every((input) => input.length > 0),
    allowedOutputsNamed:
      contract.allowedOutputs.length === ALLOWED_OUTPUTS.length
      && contract.allowedOutputs.every((output) => output.length > 0),
    prohibitedInputsNamed:
      contract.prohibitedInputs.length === PROHIBITED_INPUTS.length
      && contract.prohibitedInputs.every((input) => input.length > 0),
    requiredArtifactsNamed:
      contract.requiredArtifacts.length === REQUIRED_ARTIFACTS.length
      && contract.requiredArtifacts.every((artifact) => artifact.length > 0),
    contractAssertionsNamed:
      contract.contractAssertions.length === CONTRACT_ASSERTIONS.length
      && contract.contractAssertions.every((assertion) => assertion.length > 0),
    prohibitedActionsNamed:
      contract.prohibitedActions.length === PROHIBITED_ACTIONS.length
      && contract.prohibitedActions.every((action) => action.length > 0),
    upstreamEchoRequiredForJavaAndMiniKv:
      upstreamEchoRequirement.javaEchoRequiredNow
      && upstreamEchoRequirement.miniKvEchoRequiredNow,
    recommendedParallelExplicit:
      upstreamEchoRequirement.recommendedParallelVersions.length === 2
      && upstreamEchoRequirement.nodeVerificationVersion === "Node v289",
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract: false,
  };
}

function createSummary(
  sourceNodeV287: SourceNodeV287TestOnlyFakeHarnessPrecheckReference,
  contract: DisabledFakeHarnessContract,
  upstreamEchoRequirement: DisabledFakeHarnessContractUpstreamEchoRequirement,
  checks: DisabledFakeHarnessContractChecks,
  productionBlockers: DisabledFakeHarnessContractMessage[],
  warnings: DisabledFakeHarnessContractMessage[],
  recommendations: DisabledFakeHarnessContractMessage[],
): DisabledFakeHarnessContractSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    requiredInputCount: contract.requiredInputs.length,
    allowedOutputCount: contract.allowedOutputs.length,
    prohibitedInputCount: contract.prohibitedInputs.length,
    requiredArtifactCount: contract.requiredArtifacts.length,
    contractAssertionCount: contract.contractAssertions.length,
    prohibitedActionCount: contract.prohibitedActions.length,
    sourceCheckCount: sourceNodeV287.sourceCheckCount,
    sourcePassedCheckCount: sourceNodeV287.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV287.sourceProductionBlockerCount,
    javaEchoRequiredNow: upstreamEchoRequirement.javaEchoRequiredNow,
    miniKvEchoRequiredNow: upstreamEchoRequirement.miniKvEchoRequiredNow,
    recommendedParallelVersionCount: upstreamEchoRequirement.recommendedParallelVersions.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: DisabledFakeHarnessContractChecks,
): DisabledFakeHarnessContractMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledFakeHarnessContractMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV287Ready,
      code: "NODE_V287_PRECHECK_NOT_READY",
      source: "node-v287-test-only-fake-harness-precheck",
      message: "Node v287 test-only fake harness precheck must be ready before Node v288 defines the disabled contract.",
    },
    {
      condition: checks.sourceNodeV287KeepsRuntimeBlocked,
      code: "NODE_V287_RUNTIME_BOUNDARY_OPENED",
      source: "node-v287-test-only-fake-harness-precheck",
      message: "Node v287 must keep real resolver, fake harness runtime, execution, and managed audit connection blocked.",
    },
    {
      condition: checks.contractDefaultDisabled && checks.contractInvocationBlocked,
      code: "DISABLED_CONTRACT_NOT_DISABLED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "The disabled fake harness contract must default disabled and block invocation.",
    },
    {
      condition: checks.runtimeImplementationAbsent,
      code: "RUNTIME_IMPLEMENTATION_PRESENT",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Node v288 must not add runtime implementation; it only defines the disabled contract.",
    },
    {
      condition: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Credential value reads, storage, and rendering must remain blocked.",
    },
    {
      condition: checks.rawEndpointBoundaryClosed,
      code: "RAW_ENDPOINT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Raw endpoint parsing and rendering must remain blocked.",
    },
    {
      condition: checks.providerClientBoundaryClosed,
      code: "PROVIDER_CLIENT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Real and fake provider/client instantiation must remain false.",
    },
    {
      condition: checks.networkBoundaryClosed,
      code: "NETWORK_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "External HTTP/TCP and managed audit connection must remain blocked.",
    },
    {
      condition: checks.writeBoundaryClosed,
      code: "WRITE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Approval ledger writes and schema migration must remain blocked.",
    },
    {
      condition: checks.autoStartBoundaryClosed,
      code: "AUTO_START_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Automatic upstream start must remain false.",
    },
    {
      condition:
        checks.requiredInputsNamed
        && checks.allowedOutputsNamed
        && checks.prohibitedInputsNamed
        && checks.requiredArtifactsNamed
        && checks.contractAssertionsNamed
        && checks.prohibitedActionsNamed,
      code: "CONTRACT_SHAPE_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "The disabled fake harness contract must name inputs, outputs, artifacts, assertions, and prohibited actions.",
    },
    {
      condition:
        checks.upstreamEchoRequiredForJavaAndMiniKv
        && checks.recommendedParallelExplicit,
      code: "UPSTREAM_ECHO_REQUIREMENT_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Node v288 must explicitly require Java v122 + mini-kv v127 before Node v289.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during disabled fake harness contract generation.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during disabled fake harness contract generation.",
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

function collectWarnings(): DisabledFakeHarnessContractMessage[] {
  return [
    {
      code: "CONTRACT_ONLY_NO_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Node v288 defines a disabled contract only; there is no callable fake harness runtime yet.",
    },
    {
      code: "UPSTREAM_ECHO_REQUIRED_BEFORE_NODE_V289",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Node v289 must wait for Java v122 and mini-kv v127 to finish their read-only echo/non-participation work.",
    },
  ];
}

function collectRecommendations(): DisabledFakeHarnessContractMessage[] {
  return [
    {
      code: "RUN_PARALLEL_JAVA_V122_MINI_KV_V127",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "After Node v288 is archived, run Java v122 and mini-kv v127 as the recommended cross-project parallel pair.",
    },
    {
      code: "WAIT_FOR_NODE_V289_VERIFICATION",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract",
      message: "Use Node v289 only after both Java v122 and mini-kv v127 provide read-only evidence.",
    },
  ];
}
