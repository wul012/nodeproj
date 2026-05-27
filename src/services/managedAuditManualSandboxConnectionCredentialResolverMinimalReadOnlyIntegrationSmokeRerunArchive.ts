import type { AppConfig } from "../config.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionTypes.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile,
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile,
  MinimalReadOnlyIntegrationSmokeRerunArchiveChecks,
  MinimalReadOnlyIntegrationSmokeRerunArchiveMessage,
  MinimalReadOnlyIntegrationSmokeRerunArchiveRecord,
  MinimalReadOnlyIntegrationSmokeRerunArchiveResult,
  MinimalReadOnlyIntegrationSmokeRerunArchiveSummary,
  SourceNodeV348RerunDecisionReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive";
const SOURCE_NODE_V348_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision";
const SOURCE_NODE_V346_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal";
const ACTIVE_PLAN = "docs/plans2/v348-post-minimal-read-only-integration-rerun-decision-roadmap.md";
const NEXT_PLAN = "docs/plans2/v349-post-minimal-read-only-integration-smoke-rerun-archive-roadmap.md";

export async function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive(
  input: {
    config: AppConfig;
    orderPlatform: Pick<OrderPlatformClient, "health" | "opsOverview">;
    miniKv: Pick<MiniKvClient, "health" | "infoJson" | "statsJson">;
    externalReadWindowConfirmed?: boolean;
  },
): Promise<ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile> {
  const sourceDecision =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision({
      config: input.config,
    });
  const sourceNodeV348 = createSourceNodeV348(sourceDecision);
  const externalReadWindowConfirmed = input.externalReadWindowConfirmed ?? input.config.upstreamProbesEnabled;
  const shouldProbe = shouldRunSmokeRerun(sourceNodeV348, externalReadWindowConfirmed);
  const smokeRerun = shouldProbe
    ? await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal({
      config: createReadinessSourceConfig(input.config),
      orderPlatform: input.orderPlatform,
      miniKv: input.miniKv,
    })
    : null;
  const targetResults = smokeRerun?.targetResults ?? [];
  const rerunArchiveResult = determineRerunArchiveResult(sourceNodeV348, smokeRerun, externalReadWindowConfirmed);
  const rerunArchiveDecision = determineRerunArchiveDecision(rerunArchiveResult);
  const draftArchive = createRerunArchiveRecord(sourceNodeV348, targetResults, rerunArchiveResult, rerunArchiveDecision,
    externalReadWindowConfirmed, shouldProbe, false);
  const checks = createChecks(sourceNodeV348, targetResults, draftArchive, smokeRerun, externalReadWindowConfirmed,
    shouldProbe);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive =
    Object.entries(checks)
      .filter(([key]) =>
        key
          !== "readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive")
      .every(([, value]) => value);
  const ready = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive;
  const rerunArchive = createRerunArchiveRecord(sourceNodeV348, targetResults, rerunArchiveResult, rerunArchiveDecision,
    externalReadWindowConfirmed, shouldProbe, ready);
  checks.archiveDigestStable = isDigest(rerunArchive.archiveDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(rerunArchiveResult);
  const recommendations = collectRecommendations(rerunArchiveResult);
  const summary = createSummary(checks, targetResults, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration smoke rerun archive",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    rerunArchiveState: ready
      ? rerunArchiveResult === "pending"
        ? "minimal-read-only-integration-smoke-rerun-pending"
        : "minimal-read-only-integration-smoke-rerun-archived"
      : "blocked",
    rerunArchiveResult: ready ? rerunArchiveResult : "blocked",
    rerunArchiveDecision: ready ? rerunArchiveDecision : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive: ready,
    consumesNodeV348MinimalReadOnlyIntegrationRerunDecision: true,
    activeNodeVersion: "Node v349",
    sourceNodeVersion: "Node v348",
    externalReadWindowConfirmed,
    liveProbePerformedNow: shouldProbe,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: rerunArchiveResult === "invalid-read-contract",
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV348,
    rerunArchive,
    targetResults,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalReadOnlyIntegrationSmokeRerunArchiveJson: ROUTE_PATH,
      minimalReadOnlyIntegrationSmokeRerunArchiveMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV348Json: SOURCE_NODE_V348_ROUTE,
      sourceNodeV348Markdown: `${SOURCE_NODE_V348_ROUTE}?format=markdown`,
      sourceNodeV346Json: SOURCE_NODE_V346_ROUTE,
      sourceNodeV346Markdown: `${SOURCE_NODE_V346_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v350",
    },
    nextActions: createNextActions(rerunArchiveResult),
  };
}

function createReadinessSourceConfig(config: AppConfig): AppConfig {
  return {
    ...config,
    upstreamProbesEnabled: false,
  };
}

function createSourceNodeV348(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile,
): SourceNodeV348RerunDecisionReference {
  return {
    sourceVersion: "Node v348",
    profileVersion: profile.profileVersion,
    rerunDecisionState: profile.rerunDecisionState,
    rerunDecision: profile.rerunDecision,
    sourceArchiveResult: profile.sourceArchiveResult,
    readyForRerunDecision:
      profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision,
    readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive:
      profile.readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive,
    decisionDigest: profile.rerunDecisionRecord.decisionDigest,
    externalReadWindowRequired: profile.externalReadWindowRequired,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: profile.requiresParallelJavaV153MiniKvV144ReadOnlyEcho,
    rerunsLiveProbe: profile.rerunsLiveProbe,
    startsJavaService: profile.startsJavaService,
    startsMiniKvService: profile.startsMiniKvService,
    executionAllowed: profile.executionAllowed,
    connectsManagedAudit: profile.connectsManagedAudit,
    readsManagedAuditCredential: profile.readsManagedAuditCredential,
    rawEndpointUrlParsed: profile.rawEndpointUrlParsed,
  };
}

function shouldRunSmokeRerun(
  source: SourceNodeV348RerunDecisionReference,
  externalReadWindowConfirmed: boolean,
): boolean {
  return source.readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive
    && source.rerunDecision === "wait-for-external-read-window"
    && source.externalReadWindowRequired
    && externalReadWindowConfirmed;
}

function determineRerunArchiveResult(
  source: SourceNodeV348RerunDecisionReference,
  smokeRerun: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile | null,
  externalReadWindowConfirmed: boolean,
): MinimalReadOnlyIntegrationSmokeRerunArchiveResult {
  if (!source.readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive) {
    return "blocked";
  }
  if (!externalReadWindowConfirmed) {
    return "pending";
  }
  return smokeRerun?.smokeState ?? "blocked";
}

function determineRerunArchiveDecision(
  result: MinimalReadOnlyIntegrationSmokeRerunArchiveResult,
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile["rerunArchiveDecision"] {
  if (result === "all-read-passed") {
    return "archive-read-passed-rerun-evidence";
  }
  if (result === "read-window-unavailable") {
    return "archive-read-window-unavailable-rerun-evidence";
  }
  if (result === "invalid-read-contract") {
    return "request-java-mini-kv-read-contract-fix";
  }
  if (result === "pending") {
    return "pending-external-read-window";
  }
  return "blocked";
}

function createRerunArchiveRecord(
  source: SourceNodeV348RerunDecisionReference,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
  result: MinimalReadOnlyIntegrationSmokeRerunArchiveResult,
  decision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile["rerunArchiveDecision"],
  externalReadWindowConfirmed: boolean,
  liveProbePerformedNow: boolean,
  ready: boolean,
): MinimalReadOnlyIntegrationSmokeRerunArchiveRecord {
  const unavailableTargetCount = targetResults.filter((target) =>
    target.status === "connection-refused" || target.status === "timeout").length;
  const invalidContractTargetCount = targetResults.filter((target) =>
    target.status === "invalid-json" || target.status === "unexpected-status").length;
  const recordWithoutDigest = {
    archiveMode: "minimal-read-only-integration-smoke-rerun-or-pending-archive" as const,
    sourceSpan: "Node v348 rerun decision plus optional Node v346 smoke lane rerun" as const,
    rerunArchiveResult: ready ? result : "blocked" as const,
    rerunArchiveDecision: ready ? decision : "blocked" as const,
    externalReadWindowConfirmed,
    liveProbePerformedNow,
    attemptedTargetCount: targetResults.filter((target) => target.attempted).length,
    passedTargetCount: targetResults.filter((target) => target.status === "read-passed").length,
    unavailableTargetCount,
    invalidContractTargetCount,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    sourceDecisionDigest: source.decisionDigest,
    nextNodeVersionSuggested: "Node v350" as const,
  };

  return {
    archiveDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  source: SourceNodeV348RerunDecisionReference,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
  archive: MinimalReadOnlyIntegrationSmokeRerunArchiveRecord,
  smokeRerun: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile | null,
  externalReadWindowConfirmed: boolean,
  shouldProbe: boolean,
): MinimalReadOnlyIntegrationSmokeRerunArchiveChecks {
  return {
    sourceNodeV348Ready: source.rerunDecisionState === "minimal-read-only-integration-rerun-decision-ready"
      && source.readyForRerunDecision
      && source.readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive,
    sourceNodeV348DecisionDigestStable: isDigest(source.decisionDigest),
    sourceNodeV348KeepsBoundariesClosed:
      !source.rerunsLiveProbe
      && !source.startsJavaService
      && !source.startsMiniKvService
      && !source.executionAllowed
      && !source.connectsManagedAudit
      && !source.readsManagedAuditCredential
      && !source.rawEndpointUrlParsed,
    externalReadWindowConfirmedBeforeProbe: !shouldProbe || externalReadWindowConfirmed,
    pendingDoesNotProbe: externalReadWindowConfirmed || (!archive.liveProbePerformedNow && targetResults.length === 0),
    liveProbeOnlyWhenWindowConfirmed: !archive.liveProbePerformedNow || externalReadWindowConfirmed,
    allReadTargetsAttemptedWhenProbing: !shouldProbe || (targetResults.length === 5 && targetResults.every((target) => target.attempted)),
    onlyAllowedJavaGetRequestsAttempted: targetResults
      .filter((target) => target.project === "java")
      .every((target) => target.methodOrCommand === "GET /actuator/health"
        || target.methodOrCommand === "GET /api/v1/ops/overview"),
    onlyAllowedMiniKvReadCommandsAttempted: targetResults
      .filter((target) => target.project === "mini-kv")
      .every((target) => ["HEALTH", "INFOJSON", "STATSJSON"].includes(target.methodOrCommand)),
    noUpstreamServiceStartedByNode: !archive.startsUpstreamServices,
    noJavaMutationAttempted: targetResults
      .filter((target) => target.project === "java")
      .every((target) => target.readOnly && !target.mutatesState),
    noMiniKvMutationAttempted: targetResults
      .filter((target) => target.project === "mini-kv")
      .every((target) => target.readOnly && !target.mutatesState),
    noManagedAuditConnection: !archive.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    invalidContractRequestsParallelEchoOnlyWhenNeeded: smokeRerun?.requiresParallelJavaV153MiniKvV144ReadOnlyEcho === true
      ? archive.rerunArchiveDecision === "request-java-mini-kv-read-contract-fix"
      : archive.rerunArchiveDecision !== "request-java-mini-kv-read-contract-fix",
    archiveDigestStable: isDigest(archive.archiveDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive: false,
  };
}

function createSummary(
  checks: MinimalReadOnlyIntegrationSmokeRerunArchiveChecks,
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[],
  productionBlockers: readonly MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[],
  warnings: readonly MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[],
): MinimalReadOnlyIntegrationSmokeRerunArchiveSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    attemptedTargetCount: targetResults.filter((target) => target.attempted).length,
    passedTargetCount: targetResults.filter((target) => target.status === "read-passed").length,
    unavailableTargetCount: targetResults.filter((target) =>
      target.status === "connection-refused" || target.status === "timeout").length,
    invalidContractTargetCount: targetResults.filter((target) =>
      target.status === "invalid-json" || target.status === "unexpected-status").length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: MinimalReadOnlyIntegrationSmokeRerunArchiveChecks,
): MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[] {
  const rules: Array<[boolean, string, MinimalReadOnlyIntegrationSmokeRerunArchiveMessage["source"], string]> = [
    [checks.sourceNodeV348Ready, "NODE_V348_NOT_READY", "node-v348",
      "Node v348 rerun decision must be ready before v349 can rerun or archive pending state."],
    [checks.sourceNodeV348DecisionDigestStable, "NODE_V348_DECISION_DIGEST_UNSTABLE", "node-v348",
      "Node v348 decision digest must be stable."],
    [checks.sourceNodeV348KeepsBoundariesClosed, "NODE_V348_BOUNDARY_OPEN", "runtime-boundary",
      "Node v348 must keep runtime, credential, endpoint, execution, and managed audit boundaries closed."],
    [checks.externalReadWindowConfirmedBeforeProbe, "PROBE_WITHOUT_EXTERNAL_WINDOW_CONFIRMATION", "external-window",
      "Node v349 may only rerun the smoke lane after the external Java/mini-kv read window is confirmed."],
    [checks.allReadTargetsAttemptedWhenProbing, "READ_TARGET_NOT_ATTEMPTED", "runtime-boundary",
      "When probing, all five minimal read-only targets must be attempted."],
    [checks.onlyAllowedJavaGetRequestsAttempted, "DISALLOWED_JAVA_METHOD", "java-read-probe",
      "v349 may only attempt Java GET /actuator/health and GET /api/v1/ops/overview."],
    [checks.onlyAllowedMiniKvReadCommandsAttempted, "DISALLOWED_MINI_KV_COMMAND", "mini-kv-read-probe",
      "v349 may only attempt mini-kv HEALTH, INFOJSON, and STATSJSON."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "v349 must not start Java or mini-kv from inside the route."],
    [checks.noJavaMutationAttempted, "JAVA_MUTATION_ATTEMPTED", "java-read-probe",
      "v349 Java probes must be read-only."],
    [checks.noMiniKvMutationAttempted, "MINI_KV_MUTATION_ATTEMPTED", "mini-kv-read-probe",
      "v349 mini-kv probes must be read-only."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPENED", "runtime-boundary",
      "v349 must not connect to managed audit."],
    [checks.archiveDigestStable, "RERUN_ARCHIVE_DIGEST_UNSTABLE", "next-step",
      "Rerun archive digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  result: MinimalReadOnlyIntegrationSmokeRerunArchiveResult,
): MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[] {
  if (result === "all-read-passed") {
    return [
      {
        code: "MINIMAL_READ_ONLY_RERUN_PASSED",
        severity: "warning",
        source: "next-step",
        message: "All Java and mini-kv minimal read-only targets passed in the confirmed external read window.",
      },
    ];
  }
  if (result === "pending") {
    return [
      {
        code: "EXTERNAL_READ_WINDOW_NOT_CONFIRMED",
        severity: "warning",
        source: "external-window",
        message: "The smoke lane was not rerun because the external Java/mini-kv read window was not confirmed.",
      },
    ];
  }
  return [
    {
      code: "MINIMAL_READ_ONLY_RERUN_NOT_PASSED",
      severity: "warning",
      source: "next-step",
      message: `The rerun archive result is ${result}; production remains closed.`,
    },
  ];
}

function collectRecommendations(
  result: MinimalReadOnlyIntegrationSmokeRerunArchiveResult,
): MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[] {
  if (result === "all-read-passed") {
    return [
      {
        code: "ADVANCE_TO_DISABLED_MANAGED_AUDIT_READ_ONLY_STAGE",
        severity: "recommendation",
        source: "next-step",
        message: "Archive v349 as a passed minimal read-only integration window and plan the next managed-audit-disabled read-only stage.",
      },
    ];
  }
  if (result === "invalid-read-contract") {
    return [
      {
        code: "REQUEST_JAVA_V153_MINI_KV_V144",
        severity: "recommendation",
        source: "read-contract",
        message: "Only invalid-read-contract should request Java v153 and mini-kv v144 read-only field fixes.",
      },
    ];
  }
  return [
    {
      code: "KEEP_EXTERNAL_WINDOW_PENDING",
      severity: "recommendation",
      source: "external-window",
      message: "Keep the minimal read-only integration lane pending until both upstream services are confirmed reachable.",
    },
  ];
}

function createNextActions(result: MinimalReadOnlyIntegrationSmokeRerunArchiveResult): string[] {
  if (result === "all-read-passed") {
    return [
      "Archive this passed read-only integration window as Node v349 evidence.",
      "Plan Node v350 as a managed-audit-disabled read-only stage; do not open credential, raw endpoint, SQL, runtime shell, or mini-kv write scope.",
    ];
  }
  if (result === "invalid-read-contract") {
    return [
      "Request parallel Java v153 + mini-kv v144 only for missing read-only fields.",
      "Rerun the same minimal read-only smoke lane after both upstream fixes are complete.",
    ];
  }
  return [
    "Keep Java and mini-kv code unchanged for connection-refused or pending external-window evidence.",
    "Rerun only after the external read window is confirmed.",
  ];
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
