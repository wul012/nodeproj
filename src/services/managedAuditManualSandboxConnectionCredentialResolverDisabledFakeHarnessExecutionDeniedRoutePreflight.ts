import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.js";
import type {
  DisabledFakeHarnessExecutionDeniedRoutePreflight,
  DisabledFakeHarnessExecutionDeniedRoutePreflightChecks,
  DisabledFakeHarnessExecutionDeniedRoutePreflightMessage,
  DisabledFakeHarnessExecutionDeniedRoutePreflightSummary,
  DisabledFakeHarnessDeniedRouteAttempt,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightProfile,
  SourceNodeV289DisabledFakeHarnessContractUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight";
const SOURCE_NODE_V289_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md";
const SHA256_HEX = /^[a-f0-9]{64}$/;

const DENIAL_REASONS = [
  "real-approval-gate-not-satisfied",
  "credential-value-read-forbidden",
  "raw-endpoint-url-parse-forbidden",
  "provider-client-instantiation-forbidden",
  "http-tcp-dial-forbidden",
  "approval-ledger-and-schema-migration-forbidden",
  "disabled-fake-harness-runtime-absent",
  "automatic-upstream-start-forbidden",
] as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightProfile {
  const sourceNodeV289 = createSourceNodeV289(input.config);
  const simulatedRouteAttempts = createDeniedRouteAttempts();
  const executionDeniedRoutePreflight = createExecutionDeniedRoutePreflight(sourceNodeV289, simulatedRouteAttempts);
  const checks = createChecks(input.config, sourceNodeV289, executionDeniedRoutePreflight, simulatedRouteAttempts);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight")
      .every(([, value]) => value);
  const preflightState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight
    ? "disabled-fake-harness-execution-denied-route-preflight-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV289, executionDeniedRoutePreflight, simulatedRouteAttempts, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled fake harness execution-denied route preflight",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    preflightState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight,
    readOnlyRoutePreflight: true,
    executionDeniedRoutePreflightOnly: true,
    consumesNodeV289DisabledFakeHarnessContractUpstreamEchoVerification: true,
    readyForJavaV127MiniKvV128ParallelEvidence:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight,
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
    sourceNodeV289,
    executionDeniedRoutePreflight,
    simulatedRouteAttempts,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      executionDeniedRoutePreflightJson: ROUTE_PATH,
      executionDeniedRoutePreflightMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV289Json: SOURCE_NODE_V289_ROUTE,
      sourceNodeV289Markdown: `${SOURCE_NODE_V289_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextRecommendedParallel: "Java v127 + mini-kv v128",
      nextNodeVerification: "Node v291",
    },
    nextActions: [
      "Archive Node v290 as a read-only execution-denied route preflight.",
      "Recommend parallel Java v127 quality stopgap plus mini-kv v128 non-participation receipt after v290 is archived.",
      "Keep Java v127 focused on LiveAggregationIntegrationTests split and mini-kv v128 focused on execution-denied non-participation.",
      "Do not instantiate fake harness runtime, fake providers, fake resolver clients, real providers, or real resolver clients.",
      "Do not read credential values, parse raw endpoint URLs, send HTTP/TCP, connect managed audit, write ledgers, run schema migration, or auto-start upstream services.",
    ],
  };
}

function createSourceNodeV289(
  config: AppConfig,
): SourceNodeV289DisabledFakeHarnessContractUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification({
    config,
  });
  return {
    sourceVersion: "Node v289",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForDisabledFakeHarnessContractUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    javaEvidenceReady: source.echoVerification.javaV122V126EvidenceReady,
    miniKvNonParticipationReady: source.echoVerification.miniKvV127NonParticipationReady,
    implementationStillBlocked: true,
    readyForNextDisabledFakeHarnessPlanning: source.echoVerification.readyForNextDisabledFakeHarnessPlanning,
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

function createDeniedRouteAttempts(): DisabledFakeHarnessDeniedRouteAttempt[] {
  return [
    deniedAttempt(
      "approval-gate",
      "node-route",
      "treat the disabled fake harness route as an execution approval",
      "approval gate remains absent and v290 is a preflight report only",
      "Node v289 disabled fake harness upstream echo verification",
    ),
    deniedAttempt(
      "credential-value",
      "credential-boundary",
      "read, store, or render the managed audit credential value",
      "credential handle review is allowed; credential value access is denied",
      "Node v288 contract + mini-kv v127 non-participation",
    ),
    deniedAttempt(
      "raw-endpoint-url",
      "endpoint-boundary",
      "parse or render a raw managed audit endpoint URL",
      "endpoint handle review is allowed; raw endpoint URL access is denied",
      "Node v288 contract + Java v126 boundary catalog",
    ),
    deniedAttempt(
      "provider-client",
      "provider-client-boundary",
      "instantiate a real or fake secret provider/resolver client",
      "provider and client instantiation remain explicitly blocked",
      "Node v289 upstream echo verification",
    ),
    deniedAttempt(
      "http-tcp",
      "network-boundary",
      "dial HTTP/TCP to managed audit or an upstream fake harness",
      "external request sending remains forbidden",
      "Node v289 upstream echo verification",
    ),
    deniedAttempt(
      "ledger-schema",
      "write-boundary",
      "write approval ledger rows or execute schema migration SQL",
      "ledger writes and schema migration remain forbidden",
      "Java v122-v126 evidence and Node v289 verification",
    ),
    deniedAttempt(
      "fake-harness-runtime",
      "runtime-boundary",
      "execute a disabled fake harness runtime",
      "fake harness runtime implementation is absent and invocation is denied",
      "Node v288 disabled fake harness contract",
    ),
    deniedAttempt(
      "automatic-upstream-start",
      "runtime-boundary",
      "auto-start Java, mini-kv, or managed audit services",
      "automatic upstream start remains forbidden",
      "Node v289 upstream echo verification",
    ),
  ];
}

function createExecutionDeniedRoutePreflight(
  sourceNodeV289: SourceNodeV289DisabledFakeHarnessContractUpstreamEchoVerificationReference,
  attempts: DisabledFakeHarnessDeniedRouteAttempt[],
): DisabledFakeHarnessExecutionDeniedRoutePreflight {
  const deniedAttemptCount = attempts.filter((attempt) => attempt.denied).length;
  const actualExecutionAttemptCount = attempts.filter((attempt) => attempt.actualExecutionAttempted).length;
  return {
    preflightDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceVerificationDigest: sourceNodeV289.verificationDigest,
      routePath: ROUTE_PATH,
      denialReasons: DENIAL_REASONS,
      attempts,
    }),
    preflightMode: "disabled-fake-harness-execution-denied-route-preflight-only",
    sourceSpan: "Node v289",
    routeSurface: "audit-json-markdown-route",
    routePath: ROUTE_PATH,
    httpMethod: "GET",
    formatModes: ["json", "markdown"],
    routeRegistered: true,
    routeReadOnly: true,
    routeExecutionDenied: true,
    executionDeniedReasonCount: DENIAL_REASONS.length,
    simulatedAttemptCount: attempts.length,
    deniedAttemptCount,
    actualExecutionAttemptCount,
    approvalGateRequired: true,
    approvalGateSatisfied: false,
    credentialValueReadAllowed: false,
    rawEndpointUrlParseAllowed: false,
    providerClientInstantiationAllowed: false,
    httpTcpDialAllowed: false,
    ledgerWriteAllowed: false,
    schemaMigrationAllowed: false,
    fakeHarnessRuntimeImplementationAllowed: false,
    fakeHarnessRuntimeInvocationAllowed: false,
    automaticUpstreamStartAllowed: false,
    denialReasons: [...DENIAL_REASONS],
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV289: SourceNodeV289DisabledFakeHarnessContractUpstreamEchoVerificationReference,
  preflight: DisabledFakeHarnessExecutionDeniedRoutePreflight,
  attempts: DisabledFakeHarnessDeniedRouteAttempt[],
): DisabledFakeHarnessExecutionDeniedRoutePreflightChecks {
  return {
    sourceNodeV289Ready:
      sourceNodeV289.readyForDisabledFakeHarnessContractUpstreamEchoVerification
      && sourceNodeV289.verificationState === "disabled-fake-harness-contract-upstream-echo-verification-ready",
    sourceNodeV289DigestValid: SHA256_HEX.test(sourceNodeV289.verificationDigest),
    sourceNodeV289KeepsRuntimeBlocked:
      sourceNodeV289.implementationStillBlocked
      && !sourceNodeV289.fakeHarnessRuntimeEnabled
      && !sourceNodeV289.fakeHarnessInvocationAllowed
      && !sourceNodeV289.testOnlyFakeHarnessExecutionAllowed,
    sourceNodeV289KeepsConnectionBlocked:
      !sourceNodeV289.readyForManagedAuditSandboxAdapterConnection
      && !sourceNodeV289.connectsManagedAudit
      && !sourceNodeV289.externalRequestSent,
    sourceNodeV289KeepsCredentialBoundaryClosed:
      !sourceNodeV289.credentialValueRead
      && !sourceNodeV289.credentialValueProvided,
    sourceNodeV289KeepsEndpointBoundaryClosed:
      !sourceNodeV289.rawEndpointUrlParsed
      && !sourceNodeV289.rawEndpointUrlRendered,
    sourceNodeV289KeepsWritesBlocked:
      !sourceNodeV289.executionAllowed
      && !sourceNodeV289.schemaMigrationExecuted
      && !sourceNodeV289.approvalLedgerWritten,
    routeRegisteredAsAuditJsonMarkdown:
      preflight.routeRegistered
      && preflight.routeSurface === "audit-json-markdown-route"
      && preflight.formatModes.includes("json")
      && preflight.formatModes.includes("markdown"),
    routeReadOnlyGetOnly: preflight.routeReadOnly && preflight.httpMethod === "GET",
    routeExecutionDenied: preflight.routeExecutionDenied && !preflight.fakeHarnessRuntimeInvocationAllowed,
    allDeniedAttemptsSimulatedOnly: attempts.every((attempt) => attempt.simulatedOnly && !attempt.actualExecutionAttempted),
    allDeniedAttemptsBlocked: attempts.every((attempt) => attempt.denied && !attempt.executionAllowed),
    approvalGateStillRequired: preflight.approvalGateRequired && !preflight.approvalGateSatisfied,
    credentialValueStillForbidden: !preflight.credentialValueReadAllowed,
    rawEndpointStillForbidden: !preflight.rawEndpointUrlParseAllowed,
    providerClientStillForbidden: !preflight.providerClientInstantiationAllowed,
    httpTcpStillForbidden: !preflight.httpTcpDialAllowed,
    ledgerSchemaStillForbidden: !preflight.ledgerWriteAllowed && !preflight.schemaMigrationAllowed,
    fakeHarnessRuntimeStillAbsent:
      !preflight.fakeHarnessRuntimeImplementationAllowed
      && !preflight.fakeHarnessRuntimeInvocationAllowed,
    automaticUpstreamStartStillBlocked: !preflight.automaticUpstreamStartAllowed,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: !config.upstreamActionsEnabled,
    productionWindowStillBlocked: !config.upstreamActionsEnabled,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight:
      false,
  };
}

function createSummary(
  sourceNodeV289: SourceNodeV289DisabledFakeHarnessContractUpstreamEchoVerificationReference,
  preflight: DisabledFakeHarnessExecutionDeniedRoutePreflight,
  attempts: DisabledFakeHarnessDeniedRouteAttempt[],
  checks: DisabledFakeHarnessExecutionDeniedRoutePreflightChecks,
  productionBlockers: DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[],
  warnings: DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[],
  recommendations: DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[],
): DisabledFakeHarnessExecutionDeniedRoutePreflightSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    simulatedAttemptCount: attempts.length,
    deniedAttemptCount: attempts.filter((attempt) => attempt.denied).length,
    actualExecutionAttemptCount: attempts.filter((attempt) => attempt.actualExecutionAttempted).length,
    denialReasonCount: preflight.denialReasons.length,
    sourceCheckCount: sourceNodeV289.sourceCheckCount,
    sourcePassedCheckCount: sourceNodeV289.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV289.sourceProductionBlockerCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: DisabledFakeHarnessExecutionDeniedRoutePreflightChecks,
): DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[] {
  const rules: Array<{
    passed: boolean;
    code: string;
    source: DisabledFakeHarnessExecutionDeniedRoutePreflightMessage["source"];
    message: string;
  }> = [
    {
      passed: checks.sourceNodeV289Ready,
      code: "SOURCE_NODE_V289_NOT_READY",
      source: "node-v289-disabled-fake-harness-contract-upstream-echo-verification",
      message: "Node v289 upstream echo verification must be ready before v290 defines an execution-denied route preflight.",
    },
    {
      passed: checks.sourceNodeV289DigestValid,
      code: "SOURCE_NODE_V289_DIGEST_INVALID",
      source: "node-v289-disabled-fake-harness-contract-upstream-echo-verification",
      message: "Node v289 verification digest must be a stable sha256 hex digest.",
    },
    {
      passed: checks.sourceNodeV289KeepsRuntimeBlocked,
      code: "SOURCE_NODE_V289_RUNTIME_UNLOCKED",
      source: "node-v289-disabled-fake-harness-contract-upstream-echo-verification",
      message: "Node v289 must keep disabled fake harness runtime implementation and invocation blocked.",
    },
    {
      passed: checks.sourceNodeV289KeepsConnectionBlocked,
      code: "SOURCE_NODE_V289_CONNECTION_UNLOCKED",
      source: "node-v289-disabled-fake-harness-contract-upstream-echo-verification",
      message: "Node v289 must not connect to managed audit or send external requests.",
    },
    {
      passed: checks.routeRegisteredAsAuditJsonMarkdown,
      code: "ROUTE_REGISTRATION_INVALID",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "v290 route must use the shared audit JSON/Markdown route registration surface.",
    },
    {
      passed: checks.routeReadOnlyGetOnly,
      code: "ROUTE_NOT_READ_ONLY_GET",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "v290 route preflight must stay GET-only and read-only.",
    },
    {
      passed: checks.routeExecutionDenied,
      code: "ROUTE_EXECUTION_NOT_DENIED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "v290 must report execution denied rather than enabling fake harness invocation.",
    },
    {
      passed: checks.allDeniedAttemptsSimulatedOnly,
      code: "DENIED_ATTEMPT_EXECUTED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "Denied route attempts must be simulated only and must not execute runtime code.",
    },
    {
      passed: checks.allDeniedAttemptsBlocked,
      code: "DENIED_ATTEMPT_ALLOWED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "Every simulated route attempt must remain denied with executionAllowed=false.",
    },
    {
      passed: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must stay false during v290 route preflight generation.",
    },
    {
      passed: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must stay false during v290 route preflight generation.",
    },
    {
      passed: checks.productionAuditStillBlocked,
      code: "PRODUCTION_AUDIT_UNLOCKED",
      source: "runtime-config",
      message: "v290 must not open production audit.",
    },
    {
      passed: checks.productionWindowStillBlocked,
      code: "PRODUCTION_WINDOW_UNLOCKED",
      source: "runtime-config",
      message: "v290 must not open a production operation window.",
    },
  ];

  return rules
    .filter((rule) => !rule.passed)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker",
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[] {
  return [
    {
      code: "EXECUTION_DENIED_PREFLIGHT_IS_NOT_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "v290 proves a route-level denial shape only; it must not be treated as a fake harness runtime.",
    },
    {
      code: "JAVA_QUALITY_QUEUE_NOT_RUNTIME_ECHO",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "The next Java queue is quality-first; Node v291 may need to report Java execution-denied echo missing if no direct echo exists.",
    },
  ];
}

function collectRecommendations(): DisabledFakeHarnessExecutionDeniedRoutePreflightMessage[] {
  return [
    {
      code: "RUN_JAVA_V127_MINI_KV_V128_IN_PARALLEL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "After v290 closes, Java v127 and mini-kv v128 can proceed in parallel because they write different repositories and do not depend on each other.",
    },
    {
      code: "WAIT_FOR_UPSTREAM_STATE_BEFORE_NODE_V291",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
      message: "Node v291 should consume mini-kv v128 and the latest Java quality state before verifying execution-denied upstream evidence.",
    },
  ];
}

function deniedAttempt(
  id: DisabledFakeHarnessDeniedRouteAttempt["id"],
  surface: DisabledFakeHarnessDeniedRouteAttempt["surface"],
  requestedOperation: string,
  deniedBy: string,
  sourceEvidence: string,
): DisabledFakeHarnessDeniedRouteAttempt {
  return {
    id,
    surface,
    requestedOperation,
    simulatedOnly: true,
    actualExecutionAttempted: false,
    denied: true,
    executionAllowed: false,
    deniedBy,
    sourceEvidence,
  };
}
