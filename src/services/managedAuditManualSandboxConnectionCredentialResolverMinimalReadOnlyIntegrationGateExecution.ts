import type { AppConfig } from "../config.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionTypes.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile,
  MinimalReadOnlyIntegrationGateExecutionChecks,
  MinimalReadOnlyIntegrationGateExecutionDecision,
  MinimalReadOnlyIntegrationGateExecutionMessage,
  MinimalReadOnlyIntegrationGateExecutionRecord,
  MinimalReadOnlyIntegrationGateExecutionResult,
  MinimalReadOnlyIntegrationGateExecutionSummary,
  ReusedNodeV349SmokeLaneReference,
  SourceNodeV366ExplicitReadWindowGateExecutionDecisionReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionTypes.js";
import type {
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution";
const SOURCE_NODE_V366_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision";
const REUSED_NODE_V349_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive";
const ACTIVE_PLAN = "docs/plans2/v366-post-explicit-read-window-gate-execution-decision-roadmap.md";
const NEXT_PLAN = "docs/plans2/v367-post-minimal-read-only-integration-gate-execution-roadmap.md";

export async function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution(
  input: {
    config: AppConfig;
    orderPlatform: Pick<OrderPlatformClient, "health" | "opsOverview">;
    miniKv: Pick<MiniKvClient, "health" | "infoJson" | "statsJson">;
    externalReadWindowConfirmed?: boolean;
  },
): Promise<ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile> {
  const externalReadWindowConfirmed = input.externalReadWindowConfirmed ?? input.config.upstreamProbesEnabled;
  const sourceDecision =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision({
      config: input.config,
      explicitReadWindowProvided: externalReadWindowConfirmed,
    });
  const sourceNodeV366 = createSourceNodeV366(sourceDecision);
  const shouldProbe = sourceNodeV366.gateExecutionDecision === "ready-for-explicit-read-window-gate-execution"
    && externalReadWindowConfirmed;
  const reusedSmoke = shouldProbe
    ? await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive({
      config: input.config,
      orderPlatform: input.orderPlatform,
      miniKv: input.miniKv,
      externalReadWindowConfirmed: true,
    })
    : null;
  const reusedNodeV349SmokeLane = reusedSmoke === null ? null : createReusedNodeV349SmokeLane(reusedSmoke);
  const targetResults = reusedSmoke?.targetResults ?? [];
  const gateExecutionResult = determineGateExecutionResult(sourceNodeV366, reusedSmoke, externalReadWindowConfirmed);
  const gateExecutionDecision = determineGateExecutionDecision(gateExecutionResult);
  const draftExecution = createGateExecution(sourceNodeV366, reusedNodeV349SmokeLane, gateExecutionResult,
    gateExecutionDecision, externalReadWindowConfirmed, shouldProbe, targetResults, false);
  const checks = createChecks(sourceNodeV366, reusedNodeV349SmokeLane, draftExecution, targetResults,
    externalReadWindowConfirmed, shouldProbe);
  checks.readyForMinimalReadOnlyIntegrationGateExecution = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalReadOnlyIntegrationGateExecution")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalReadOnlyIntegrationGateExecution;
  const gateExecution = createGateExecution(sourceNodeV366, reusedNodeV349SmokeLane, gateExecutionResult,
    gateExecutionDecision, externalReadWindowConfirmed, shouldProbe, targetResults, ready);
  checks.executionDigestStable = isDigest(gateExecution.executionDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateExecution);
  const recommendations = collectRecommendations(gateExecution);
  const summary = createSummary(checks, gateExecution, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration gate execution",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    gateExecutionState: ready ? determineGateExecutionState(gateExecutionResult) : "blocked",
    gateExecutionResult: ready ? gateExecutionResult : "blocked",
    gateExecutionDecision: ready ? gateExecutionDecision : "blocked",
    readyForMinimalReadOnlyIntegrationGateExecution: ready,
    consumesNodeV366ExplicitReadWindowGateExecutionDecision: true,
    reusesNodeV349MinimalReadOnlySmokeLane: true,
    activeNodeVersion: "Node v367",
    sourceNodeVersion: "Node v366",
    externalReadWindowConfirmed,
    liveProbePerformedNow: shouldProbe,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    requiresParallelJavaMiniKvReadContractFix: gateExecutionResult === "invalid-read-contract",
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV366,
    reusedNodeV349SmokeLane,
    gateExecution,
    targetResults,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalReadOnlyIntegrationGateExecutionJson: ROUTE_PATH,
      minimalReadOnlyIntegrationGateExecutionMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV366Json: SOURCE_NODE_V366_ROUTE,
      sourceNodeV366Markdown: `${SOURCE_NODE_V366_ROUTE}?format=markdown`,
      reusedNodeV349SmokeLaneJson: REUSED_NODE_V349_ROUTE,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: gateExecution.nextNodeVersionSuggested,
    },
    nextActions: createNextActions(gateExecution),
  };
}

function createSourceNodeV366(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile,
): SourceNodeV366ExplicitReadWindowGateExecutionDecisionReference {
  return {
    sourceVersion: "Node v366",
    profileVersion: profile.profileVersion,
    decisionState: profile.decisionState,
    gateExecutionDecision: profile.gateExecutionDecision,
    readyForDecision: profile.readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision,
    decisionDigest: profile.decisionRecord.decisionDigest,
    explicitReadWindowProvided: profile.decisionRecord.explicitReadWindowProvided,
    actualProbeExecutedNow: profile.actualProbeExecutedNow,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    readOnlyTargetCount: profile.summary.readOnlyTargetCount,
    requiredHeaderCount: profile.summary.requiredHeaderCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    connectsManagedAudit: profile.connectsManagedAudit,
    sendsManagedAuditHttpTcp: profile.sendsManagedAuditHttpTcp,
    credentialValueRead: profile.credentialValueRead,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
    secretProviderInstantiated: profile.secretProviderInstantiated,
    resolverClientInstantiated: profile.resolverClientInstantiated,
    runtimeShellImplemented: profile.runtimeShellImplemented,
    runtimeShellInvocationAllowed: profile.runtimeShellInvocationAllowed,
    executionAllowed: profile.executionAllowed,
  };
}

function createReusedNodeV349SmokeLane(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile,
): ReusedNodeV349SmokeLaneReference {
  return {
    sourceVersion: "Node v349",
    profileVersion: profile.profileVersion,
    rerunArchiveState: profile.rerunArchiveState,
    rerunArchiveResult: profile.rerunArchiveResult,
    rerunArchiveDecision: profile.rerunArchiveDecision,
    readyForSmokeRerunArchive: profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive,
    archiveDigest: profile.rerunArchive.archiveDigest,
    externalReadWindowConfirmed: profile.externalReadWindowConfirmed,
    liveProbePerformedNow: profile.liveProbePerformedNow,
    attemptedTargetCount: profile.rerunArchive.attemptedTargetCount,
    passedTargetCount: profile.rerunArchive.passedTargetCount,
    unavailableTargetCount: profile.rerunArchive.unavailableTargetCount,
    invalidContractTargetCount: profile.rerunArchive.invalidContractTargetCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    connectsManagedAudit: profile.connectsManagedAudit,
    readsManagedAuditCredential: profile.readsManagedAuditCredential,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
    executionAllowed: profile.executionAllowed,
  };
}

function determineGateExecutionResult(
  source: SourceNodeV366ExplicitReadWindowGateExecutionDecisionReference,
  reusedSmoke: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile | null,
  externalReadWindowConfirmed: boolean,
): MinimalReadOnlyIntegrationGateExecutionResult {
  if (!source.readyForDecision) {
    return "blocked";
  }
  if (!externalReadWindowConfirmed || source.gateExecutionDecision !== "ready-for-explicit-read-window-gate-execution") {
    return "read-window-unavailable";
  }
  return reusedSmoke?.rerunArchiveResult === "pending" ? "read-window-unavailable" : reusedSmoke?.rerunArchiveResult ?? "blocked";
}

function determineGateExecutionDecision(
  result: MinimalReadOnlyIntegrationGateExecutionResult,
): MinimalReadOnlyIntegrationGateExecutionDecision {
  if (result === "all-read-passed") {
    return "archive-read-passed-gate-execution";
  }
  if (result === "read-window-unavailable") {
    return "archive-read-window-unavailable-gate-execution";
  }
  if (result === "invalid-read-contract") {
    return "request-java-mini-kv-read-contract-fix";
  }
  return "blocked";
}

function determineGateExecutionState(
  result: MinimalReadOnlyIntegrationGateExecutionResult,
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile["gateExecutionState"] {
  if (result === "all-read-passed") {
    return "minimal-read-only-integration-gate-executed";
  }
  if (result === "read-window-unavailable") {
    return "minimal-read-only-integration-gate-read-window-unavailable";
  }
  if (result === "invalid-read-contract") {
    return "minimal-read-only-integration-gate-invalid-read-contract";
  }
  return "blocked";
}

function createGateExecution(
  source: SourceNodeV366ExplicitReadWindowGateExecutionDecisionReference,
  reusedSmoke: ReusedNodeV349SmokeLaneReference | null,
  result: MinimalReadOnlyIntegrationGateExecutionResult,
  decision: MinimalReadOnlyIntegrationGateExecutionDecision,
  externalReadWindowConfirmed: boolean,
  liveProbePerformedNow: boolean,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
  ready: boolean,
): MinimalReadOnlyIntegrationGateExecutionRecord {
  const unavailableTargetCount = targetResults.filter((target) =>
    target.status === "connection-refused" || target.status === "timeout").length;
  const invalidContractTargetCount = targetResults.filter((target) =>
    target.status === "invalid-json" || target.status === "unexpected-status").length;
  const recordWithoutDigest = {
    executionMode: "minimal-read-only-integration-gate-execution" as const,
    sourceSpan: "Node v366 explicit read-window decision plus reused Node v349 smoke lane" as const,
    sourceDecisionDigest: source.decisionDigest,
    reusedSmokeArchiveDigest: reusedSmoke?.archiveDigest ?? null,
    gateExecutionResult: ready ? result : "blocked" as const,
    gateExecutionDecision: ready ? decision : "blocked" as const,
    externalReadWindowConfirmed,
    liveProbePerformedNow,
    attemptedTargetCount: targetResults.filter((target) => target.attempted).length,
    passedTargetCount: targetResults.filter((target) => target.status === "read-passed").length,
    unavailableTargetCount,
    invalidContractTargetCount,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    readsCredentialValue: false as const,
    parsesRawEndpointUrl: false as const,
    instantiatesProviderClient: false as const,
    invokesRuntimeShell: false as const,
    requestsJavaMiniKvEcho: result === "invalid-read-contract",
    nextNodeVersionSuggested: result === "all-read-passed"
      ? "Node v368" as const
      : result === "invalid-read-contract"
        ? "recommended-parallel-java-mini-kv-read-contract-fix" as const
        : "wait-for-external-read-window" as const,
  };

  return {
    executionDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  source: SourceNodeV366ExplicitReadWindowGateExecutionDecisionReference,
  reusedSmoke: ReusedNodeV349SmokeLaneReference | null,
  execution: MinimalReadOnlyIntegrationGateExecutionRecord,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
  externalReadWindowConfirmed: boolean,
  shouldProbe: boolean,
): MinimalReadOnlyIntegrationGateExecutionChecks {
  return {
    sourceNodeV366Ready: source.decisionState === "explicit-read-window-gate-execution-decision-ready"
      && source.readyForDecision
      && source.checkCount === source.passedCheckCount
      && source.productionBlockerCount === 0,
    sourceDecisionAllowsV367: !externalReadWindowConfirmed
      || source.gateExecutionDecision === "ready-for-explicit-read-window-gate-execution",
    explicitReadWindowConfirmed: externalReadWindowConfirmed,
    smokeLaneReusedInsteadOfDuplicated: !shouldProbe || reusedSmoke !== null,
    allReadTargetsAttemptedWhenWindowOpen: !shouldProbe
      || (targetResults.length === 5 && targetResults.every((target) => target.attempted)),
    onlyAllowedJavaGetRequestsAttempted: targetResults
      .filter((target) => target.project === "java")
      .every((target) => target.methodOrCommand === "GET /actuator/health"
        || target.methodOrCommand === "GET /api/v1/ops/overview"),
    onlyAllowedMiniKvReadCommandsAttempted: targetResults
      .filter((target) => target.project === "mini-kv")
      .every((target) => ["HEALTH", "INFOJSON", "STATSJSON"].includes(target.methodOrCommand)),
    noUpstreamServiceStartedByNode: !execution.startsUpstreamServices && !source.startsJavaService
      && !source.startsMiniKvService && (reusedSmoke === null || (!reusedSmoke.startsJavaService && !reusedSmoke.startsMiniKvService)),
    noUpstreamMutation: !execution.writesUpstreamState
      && targetResults.every((target) => target.readOnly && !target.mutatesState),
    noManagedAuditConnection: !source.connectsManagedAudit && !execution.opensManagedAuditConnection,
    noCredentialValueRead: !source.credentialValueRead && !execution.readsCredentialValue,
    noRawEndpointUrlParsed: !source.rawEndpointUrlParsed && !execution.parsesRawEndpointUrl,
    noProviderClientInstantiated: !source.secretProviderInstantiated && !source.resolverClientInstantiated
      && !execution.instantiatesProviderClient,
    noRuntimeShellImplementedOrInvoked:
      !source.runtimeShellImplemented && !source.runtimeShellInvocationAllowed && !execution.invokesRuntimeShell,
    resultClassifiedFailClosed:
      execution.gateExecutionResult !== "blocked" || !source.readyForDecision || !externalReadWindowConfirmed
      || targetResults.length > 0,
    invalidContractRequestsParallelEchoOnlyWhenNeeded:
      execution.invalidContractTargetCount > 0 === execution.requestsJavaMiniKvEcho,
    executionDigestStable: isDigest(execution.executionDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForMinimalReadOnlyIntegrationGateExecution: false,
  };
}

function collectProductionBlockers(
  checks: MinimalReadOnlyIntegrationGateExecutionChecks,
): MinimalReadOnlyIntegrationGateExecutionMessage[] {
  const rules: Array<[boolean, string, MinimalReadOnlyIntegrationGateExecutionMessage["source"], string]> = [
    [checks.sourceNodeV366Ready, "SOURCE_NODE_V366_NOT_READY", "node-v366", "Node v366 explicit read-window decision must be ready."],
    [checks.sourceDecisionAllowsV367, "SOURCE_DECISION_DOES_NOT_ALLOW_V367", "node-v366", "Node v367 can run only after v366 records an explicit read window."],
    [checks.smokeLaneReusedInsteadOfDuplicated, "SMOKE_LANE_NOT_REUSED", "node-v349-smoke-lane", "Node v367 must reuse the established v349 smoke lane."],
    [checks.allReadTargetsAttemptedWhenWindowOpen, "READ_TARGET_NOT_ATTEMPTED", "runtime-boundary", "All five minimal read-only targets must be attempted when the window is open."],
    [checks.onlyAllowedJavaGetRequestsAttempted, "DISALLOWED_JAVA_METHOD", "java-read-probe", "Only Java GET /actuator/health and GET /api/v1/ops/overview are allowed."],
    [checks.onlyAllowedMiniKvReadCommandsAttempted, "DISALLOWED_MINI_KV_COMMAND", "mini-kv-read-probe", "Only mini-kv HEALTH, INFOJSON, and STATSJSON are allowed."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary", "Node v367 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ATTEMPTED", "runtime-boundary", "Node v367 must keep all upstream operations read-only."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPENED", "runtime-boundary", "Node v367 must not connect to managed audit."],
    [checks.noCredentialValueRead, "CREDENTIAL_VALUE_READ", "runtime-boundary", "Node v367 must not read credential values."],
    [checks.noRawEndpointUrlParsed, "RAW_ENDPOINT_URL_PARSED", "runtime-boundary", "Node v367 must not parse raw endpoint URLs."],
    [checks.noProviderClientInstantiated, "PROVIDER_OR_CLIENT_INSTANTIATED", "runtime-boundary", "Node v367 must not instantiate provider/client."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary", "Node v367 must not implement or invoke runtime shell."],
    [checks.executionDigestStable, "EXECUTION_DIGEST_UNSTABLE", "next-step", "Gate execution digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  execution: MinimalReadOnlyIntegrationGateExecutionRecord,
): MinimalReadOnlyIntegrationGateExecutionMessage[] {
  if (execution.gateExecutionResult === "all-read-passed") {
    return [{
      code: "MINIMAL_READ_ONLY_GATE_EXECUTION_PASSED",
      severity: "warning",
      source: "next-step",
      message: "All five Java/mini-kv minimal read-only gate targets passed in the explicit read window.",
    }];
  }
  if (execution.gateExecutionResult === "read-window-unavailable") {
    return [{
      code: "READ_WINDOW_UNAVAILABLE",
      severity: "warning",
      source: "read-window",
      message: "The explicit read window was unavailable or an upstream read target could not be reached; keep the gate fail-closed.",
    }];
  }
  if (execution.gateExecutionResult === "invalid-read-contract") {
    return [{
      code: "INVALID_READ_CONTRACT",
      severity: "warning",
      source: "read-contract",
      message: "At least one read-only target responded with an unexpected shape/status; request only targeted Java/mini-kv read-contract fixes.",
    }];
  }
  return [];
}

function collectRecommendations(
  execution: MinimalReadOnlyIntegrationGateExecutionRecord,
): MinimalReadOnlyIntegrationGateExecutionMessage[] {
  if (execution.gateExecutionResult === "all-read-passed") {
    return [{
      code: "ARCHIVE_AND_STANDARDIZE_GATE_EXECUTION",
      severity: "recommendation",
      source: "next-step",
      message: "Archive Node v367 as the regular minimal read-only gate execution evidence and continue to v368 verification.",
    }];
  }
  if (execution.gateExecutionResult === "invalid-read-contract") {
    return [{
      code: "REQUEST_PARALLEL_READ_CONTRACT_FIX",
      severity: "recommendation",
      source: "read-contract",
      message: "Recommend parallel Java + mini-kv read-contract fixes only for the invalid fields, then rerun the same gate.",
    }];
  }
  return [{
    code: "KEEP_WAITING_FOR_READ_WINDOW",
    severity: "recommendation",
    source: "read-window",
    message: "Keep Node v367 fail-closed until Java and mini-kv are reachable in an explicit read window.",
  }];
}

function createSummary(
  checks: MinimalReadOnlyIntegrationGateExecutionChecks,
  execution: MinimalReadOnlyIntegrationGateExecutionRecord,
  productionBlockers: readonly MinimalReadOnlyIntegrationGateExecutionMessage[],
  warnings: readonly MinimalReadOnlyIntegrationGateExecutionMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationGateExecutionMessage[],
): MinimalReadOnlyIntegrationGateExecutionSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    attemptedTargetCount: execution.attemptedTargetCount,
    passedTargetCount: execution.passedTargetCount,
    unavailableTargetCount: execution.unavailableTargetCount,
    invalidContractTargetCount: execution.invalidContractTargetCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function createNextActions(execution: MinimalReadOnlyIntegrationGateExecutionRecord): string[] {
  if (execution.gateExecutionResult === "all-read-passed") {
    return [
      "Archive Node v367 as passed minimal read-only gate execution evidence.",
      "Use Node v368 to verify the v367 archive and decide whether to keep this gate as a recurring operator/CI lane.",
      "Keep managed audit, credential value, raw endpoint URL, provider/client, runtime shell, Java writes, and mini-kv write/admin scopes closed.",
    ];
  }
  if (execution.gateExecutionResult === "invalid-read-contract") {
    return [
      "Request parallel Java + mini-kv read-contract fixes only for invalid read fields.",
      "Rerun the same v367 gate after both fixes are complete; do not widen write/runtime scope.",
    ];
  }
  return [
    "Keep the gate fail-closed until Java and mini-kv are reachable in an explicit read window.",
    "Do not treat read-window-unavailable as a Java/mini-kv contract bug.",
  ];
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
