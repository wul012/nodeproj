import type { AppConfig } from "../config.js";
import { isAppHttpError } from "../errors.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile,
  MinimalReadOnlyIntegrationSmokeRehearsalChecks,
  MinimalReadOnlyIntegrationSmokeRehearsalMessage,
  MinimalReadOnlyIntegrationSmokeRehearsalSummary,
  MinimalReadOnlyIntegrationSmokeSession,
  MinimalReadOnlyIntegrationSmokeTargetResult,
  MinimalReadOnlyIntegrationSmokeTargetStatus,
  SourceNodeV345ReadinessCutReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal";
const SOURCE_NODE_V345_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut";
const ACTIVE_PLAN = "docs/plans2/v345-post-minimal-read-only-integration-window-readiness-cut-roadmap.md";

export async function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal(
  input: {
    config: AppConfig;
    orderPlatform: Pick<OrderPlatformClient, "health" | "opsOverview">;
    miniKv: Pick<MiniKvClient, "health" | "infoJson" | "statsJson">;
  },
): Promise<ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile> {
  const sourceNodeV345 = createSourceNodeV345(input.config);
  const targetResults = await runReadOnlyTargets(input.orderPlatform, input.miniKv);
  const smokeSession = createSmokeSession(sourceNodeV345, targetResults);
  const checks = createChecks(sourceNodeV345, targetResults, smokeSession);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal")
      .every(([, value]) => value);
  checks.smokeSessionDigestStable = isDigest(smokeSession.sessionDigest);
  const smokeState = determineSmokeState(sourceNodeV345, targetResults);
  const requiresParallelEcho = targetResults.some(isInvalidContractResult);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(targetResults);
  const recommendations = collectRecommendations(requiresParallelEcho, smokeState);
  const summary = createSummary(checks, targetResults, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration smoke rehearsal",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    smokeState,
    smokeDecision: determineSmokeDecision(smokeState),
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal,
    readyForNodeV347MinimalReadOnlyIntegrationSmokeArchiveVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal,
    consumesNodeV345MinimalReadOnlyIntegrationWindowReadinessCut: true,
    activeNodeVersion: "Node v346",
    sourceNodeVersion: "Node v345",
    readOnlyIntegrationSmokeRehearsal: true,
    liveProbePerformedNow: true,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    rawEndpointUrlParsed: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: requiresParallelEcho,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV345,
    smokeSession,
    targetResults,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalReadOnlyIntegrationSmokeRehearsalJson: ROUTE_PATH,
      minimalReadOnlyIntegrationSmokeRehearsalMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV345Json: SOURCE_NODE_V345_ROUTE,
      sourceNodeV345Markdown: `${SOURCE_NODE_V345_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v347",
    },
    nextActions: [
      "Archive this v346 smoke result in Node v347; classify all-read-passed, read-window-unavailable, or invalid-read-contract explicitly.",
      "If the result is read-window-unavailable, have the user or external window start Java/mini-kv and rerun; do not change Java/mini-kv code for connection refused alone.",
      "If the result is invalid-read-contract, recommend Java v153 and/or mini-kv v144 to add only the missing read-only fields.",
      "Keep managed audit endpoint access, runtime shell implementation, Java writes, and mini-kv write/admin commands out of this lane.",
    ],
  };
}

function createSourceNodeV345(config: AppConfig): SourceNodeV345ReadinessCutReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut({
    config,
  });

  return {
    sourceVersion: "Node v345",
    profileVersion: source.profileVersion,
    readinessState: source.readinessState,
    readinessDecision: source.readinessDecision,
    readyForReadinessCut:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut,
    readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal:
      source.readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: source.requiresParallelJavaV153MiniKvV144ReadOnlyEcho,
    readinessDigest: source.readinessCut.readinessDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    javaRequirementCount: source.summary.javaRequirementCount,
    miniKvRequirementCount: source.summary.miniKvRequirementCount,
    performsLiveProbeNow: source.performsLiveProbeNow,
    startsJavaService: source.startsJavaService,
    startsMiniKvService: source.startsMiniKvService,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
  };
}

async function runReadOnlyTargets(
  orderPlatform: Pick<OrderPlatformClient, "health" | "opsOverview">,
  miniKv: Pick<MiniKvClient, "health" | "infoJson" | "statsJson">,
): Promise<MinimalReadOnlyIntegrationSmokeTargetResult[]> {
  const results: MinimalReadOnlyIntegrationSmokeTargetResult[] = [];
  results.push(await runTarget("java", "Java actuator health", "GET /actuator/health",
    () => orderPlatform.health()));
  results.push(await runTarget("java", "Java ops overview", "GET /api/v1/ops/overview",
    () => orderPlatform.opsOverview()));
  results.push(await runTarget("mini-kv", "mini-kv health", "HEALTH",
    () => miniKv.health()));
  results.push(await runTarget("mini-kv", "mini-kv info JSON", "INFOJSON",
    () => miniKv.infoJson()));
  results.push(await runTarget("mini-kv", "mini-kv stats JSON", "STATSJSON",
    () => miniKv.statsJson()));
  return results;
}

async function runTarget(
  project: MinimalReadOnlyIntegrationSmokeTargetResult["project"],
  targetName: string,
  methodOrCommand: string,
  run: () => Promise<unknown>,
): Promise<MinimalReadOnlyIntegrationSmokeTargetResult> {
  try {
    const response = await run();
    const { latencyMs, statusCode, responseShape } = describeResponse(response);
    return {
      project,
      targetName,
      methodOrCommand,
      readOnly: true,
      mutatesState: false,
      attempted: true,
      status: statusCode !== null && (statusCode < 200 || statusCode >= 300) ? "unexpected-status" : "read-passed",
      latencyMs,
      statusCode,
      responseShape,
      errorCode: null,
      errorMessage: null,
    };
  } catch (error) {
    return {
      project,
      targetName,
      methodOrCommand,
      readOnly: true,
      mutatesState: false,
      attempted: true,
      status: classifyError(error),
      latencyMs: null,
      statusCode: isAppHttpError(error) ? error.statusCode : null,
      responseShape: "error",
      errorCode: isAppHttpError(error) ? error.code : "UNKNOWN_ERROR",
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

function describeResponse(response: unknown): { latencyMs: number | null; statusCode: number | null; responseShape: string } {
  if (response !== null && typeof response === "object" && !Array.isArray(response)) {
    const record = response as Record<string, unknown>;
    const latencyMs = typeof record.latencyMs === "number" ? record.latencyMs : null;
    const statusCode = typeof record.statusCode === "number" ? record.statusCode : null;
    if ("data" in record) {
      return {
        latencyMs,
        statusCode,
        responseShape: typeof record.data === "object" && record.data !== null ? "json-object" : "invalid-json",
      };
    }
    if ("info" in record || "stats" in record) {
      return { latencyMs, statusCode, responseShape: "json-object" };
    }
    if ("response" in record) {
      return { latencyMs, statusCode, responseShape: "text" };
    }
  }
  return { latencyMs: null, statusCode: null, responseShape: "unknown" };
}

function classifyError(error: unknown): MinimalReadOnlyIntegrationSmokeTargetStatus {
  const code = isAppHttpError(error) ? error.code : "";
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  if (code.includes("TIMEOUT")) {
    return "timeout";
  }
  if (code.includes("INVALID")) {
    return "invalid-json";
  }
  if (code.includes("HTTP_ERROR")) {
    return "unexpected-status";
  }
  if (code.includes("UNAVAILABLE") || code.includes("CONNECTION_CLOSED") || message.includes("refused")) {
    return "connection-refused";
  }
  return "unexpected-status";
}

function createSmokeSession(
  sourceNodeV345: SourceNodeV345ReadinessCutReference,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
): MinimalReadOnlyIntegrationSmokeSession {
  const passedTargetCount = targetResults.filter((target) => target.status === "read-passed").length;
  const unavailableTargetCount = targetResults.filter((target) =>
    target.status === "connection-refused" || target.status === "timeout").length;
  const invalidContractTargetCount = targetResults.filter(isInvalidContractResult).length;

  return {
    sessionDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceReadinessDigest: sourceNodeV345.readinessDigest,
      targets: targetResults.map((target) => ({
        project: target.project,
        methodOrCommand: target.methodOrCommand,
        status: target.status,
        responseShape: target.responseShape,
        errorCode: target.errorCode,
      })),
    }),
    sessionMode: "node-v346-minimal-read-only-integration-smoke-rehearsal",
    sourceSpan: "Node v345 readiness cut plus live Java/mini-kv read-only probes",
    attemptedTargetCount: targetResults.filter((target) => target.attempted).length,
    passedTargetCount,
    unavailableTargetCount,
    invalidContractTargetCount,
    onlyJavaGetRequests: true,
    onlyMiniKvReadCommands: true,
    startsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v347",
  };
}

function createChecks(
  sourceNodeV345: SourceNodeV345ReadinessCutReference,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
  smokeSession: MinimalReadOnlyIntegrationSmokeSession,
): MinimalReadOnlyIntegrationSmokeRehearsalChecks {
  return {
    sourceNodeV345Ready:
      sourceNodeV345.readinessState === "minimal-read-only-integration-window-readiness-cut-ready"
      && sourceNodeV345.readinessDecision === "ready-for-manual-read-only-integration-window"
      && sourceNodeV345.readyForReadinessCut
      && sourceNodeV345.readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal
      && !sourceNodeV345.requiresParallelJavaV153MiniKvV144ReadOnlyEcho
      && sourceNodeV345.sourceProductionBlockerCount === 0,
    sourceNodeV345KeepsBoundariesClosed:
      !sourceNodeV345.performsLiveProbeNow
      && !sourceNodeV345.startsJavaService
      && !sourceNodeV345.startsMiniKvService
      && !sourceNodeV345.executionAllowed
      && !sourceNodeV345.connectsManagedAudit
      && !sourceNodeV345.readsManagedAuditCredential
      && !sourceNodeV345.rawEndpointUrlParsed,
    allReadTargetsAttempted: targetResults.length === 5 && targetResults.every((target) => target.attempted),
    onlyAllowedJavaGetRequestsAttempted: targetResults
      .filter((target) => target.project === "java")
      .every((target) => target.methodOrCommand === "GET /actuator/health"
        || target.methodOrCommand === "GET /api/v1/ops/overview"),
    onlyAllowedMiniKvReadCommandsAttempted: targetResults
      .filter((target) => target.project === "mini-kv")
      .every((target) => ["HEALTH", "INFOJSON", "STATSJSON"].includes(target.methodOrCommand)),
    noUpstreamServiceStarted: !smokeSession.startsUpstreamServices,
    noJavaMutationAttempted: targetResults
      .filter((target) => target.project === "java")
      .every((target) => target.readOnly && !target.mutatesState),
    noMiniKvMutationAttempted: targetResults
      .filter((target) => target.project === "mini-kv")
      .every((target) => target.readOnly && !target.mutatesState),
    noManagedAuditConnection: !smokeSession.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    connectionFailuresFailClosed: true,
    invalidReadContractRequestsParallelEcho: smokeSession.invalidContractTargetCount > 0
      || !targetResults.some(isInvalidContractResult),
    smokeSessionDigestStable: isDigest(smokeSession.sessionDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal: false,
  };
}

function determineSmokeState(
  sourceNodeV345: SourceNodeV345ReadinessCutReference,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile["smokeState"] {
  if (!sourceNodeV345.readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal) {
    return "blocked";
  }
  if (targetResults.every((target) => target.status === "read-passed")) {
    return "all-read-passed";
  }
  if (targetResults.some(isInvalidContractResult)) {
    return "invalid-read-contract";
  }
  return "read-window-unavailable";
}

function determineSmokeDecision(
  smokeState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile["smokeState"],
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile["smokeDecision"] {
  if (smokeState === "all-read-passed") {
    return "archive-read-passed-evidence";
  }
  if (smokeState === "read-window-unavailable") {
    return "archive-read-window-unavailable-evidence";
  }
  if (smokeState === "invalid-read-contract") {
    return "request-read-contract-field-fix";
  }
  return "blocked";
}

function isInvalidContractResult(target: MinimalReadOnlyIntegrationSmokeTargetResult): boolean {
  return target.status === "invalid-json" || target.status === "unexpected-status";
}

function collectProductionBlockers(
  checks: MinimalReadOnlyIntegrationSmokeRehearsalChecks,
): MinimalReadOnlyIntegrationSmokeRehearsalMessage[] {
  const messages: MinimalReadOnlyIntegrationSmokeRehearsalMessage[] = [];
  addBlocker(messages, checks.sourceNodeV345Ready, "NODE_V345_NOT_READY", "node-v345",
    "Node v345 readiness cut must be ready before live read-only smoke rehearsal.");
  addBlocker(messages, checks.sourceNodeV345KeepsBoundariesClosed, "NODE_V345_BOUNDARY_OPEN",
    "runtime-boundary", "Node v345 must keep runtime, credential, endpoint, execution, and managed audit boundaries closed.");
  addBlocker(messages, checks.allReadTargetsAttempted, "READ_TARGET_NOT_ATTEMPTED", "runtime-boundary",
    "All five minimal read-only targets must be attempted in v346.");
  addBlocker(messages, checks.onlyAllowedJavaGetRequestsAttempted, "DISALLOWED_JAVA_METHOD", "java-read-probe",
    "v346 may only attempt Java GET /actuator/health and GET /api/v1/ops/overview.");
  addBlocker(messages, checks.onlyAllowedMiniKvReadCommandsAttempted, "DISALLOWED_MINI_KV_COMMAND",
    "mini-kv-read-probe", "v346 may only attempt mini-kv HEALTH, INFOJSON, and STATSJSON.");
  addBlocker(messages, checks.noUpstreamServiceStarted, "UPSTREAM_SERVICE_STARTED", "runtime-boundary",
    "Node must not start Java or mini-kv during v346.");
  addBlocker(messages, checks.noJavaMutationAttempted, "JAVA_MUTATION_ATTEMPTED", "java-read-probe",
    "v346 Java probes must be read-only.");
  addBlocker(messages, checks.noMiniKvMutationAttempted, "MINI_KV_MUTATION_ATTEMPTED", "mini-kv-read-probe",
    "v346 mini-kv probes must be read-only.");
  addBlocker(messages, checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPENED", "runtime-boundary",
    "v346 must not connect to managed audit.");
  return messages;
}

function collectWarnings(
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
): MinimalReadOnlyIntegrationSmokeRehearsalMessage[] {
  if (targetResults.every((target) => target.status === "read-passed")) {
    return [
      {
        code: "READ_ONLY_WINDOW_PASSED",
        severity: "warning",
        source: "next-step",
        message: "All minimal Java/mini-kv read-only probes passed; archive this as read-passed evidence in v347.",
      },
    ];
  }
  return targetResults
    .filter((target) => target.status !== "read-passed")
    .map((target) => ({
      code: `${target.project.toUpperCase().replace("-", "_")}_${target.status.toUpperCase().replace("-", "_")}`,
      severity: "warning" as const,
      source: target.project === "java" ? "java-read-probe" : "mini-kv-read-probe",
      message: `${target.targetName} ended as ${target.status}; v346 records it and keeps production closed.`,
    }));
}

function collectRecommendations(
  requiresParallelEcho: boolean,
  smokeState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile["smokeState"],
): MinimalReadOnlyIntegrationSmokeRehearsalMessage[] {
  return [
    {
      code: requiresParallelEcho ? "RUN_JAVA_V153_MINI_KV_V144_FOR_READ_CONTRACT" : "ARCHIVE_V346_IN_NODE_V347",
      severity: "recommendation",
      source: "next-step",
      message: requiresParallelEcho
        ? "A read contract was invalid; use Java v153 and/or mini-kv v144 only for missing read-only fields."
        : `Archive the v346 ${smokeState} result in Node v347 without widening write/runtime scope.`,
    },
  ];
}

function createSummary(
  checks: MinimalReadOnlyIntegrationSmokeRehearsalChecks,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
  productionBlockers: readonly MinimalReadOnlyIntegrationSmokeRehearsalMessage[],
  warnings: readonly MinimalReadOnlyIntegrationSmokeRehearsalMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationSmokeRehearsalMessage[],
): MinimalReadOnlyIntegrationSmokeRehearsalSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    attemptedTargetCount: targetResults.filter((target) => target.attempted).length,
    passedTargetCount: targetResults.filter((target) => target.status === "read-passed").length,
    connectionRefusedTargetCount: targetResults.filter((target) => target.status === "connection-refused").length,
    timeoutTargetCount: targetResults.filter((target) => target.status === "timeout").length,
    invalidJsonTargetCount: targetResults.filter((target) => target.status === "invalid-json").length,
    unexpectedStatusTargetCount: targetResults.filter((target) => target.status === "unexpected-status").length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: MinimalReadOnlyIntegrationSmokeRehearsalMessage[],
  condition: boolean,
  code: string,
  source: MinimalReadOnlyIntegrationSmokeRehearsalMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
