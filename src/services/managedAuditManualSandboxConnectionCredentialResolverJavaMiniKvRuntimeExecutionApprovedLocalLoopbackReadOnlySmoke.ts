import { performance } from "node:perf_hooks";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeProfile,
  RuntimeExecutionApprovedLocalLoopbackMiniKvClient,
  RuntimeExecutionApprovedLocalLoopbackOrderPlatformClient,
  RuntimeExecutionApprovedLocalLoopbackSmokeChecks,
  RuntimeExecutionApprovedLocalLoopbackSmokeMessage,
  RuntimeExecutionApprovedLocalLoopbackSmokeRecord,
  RuntimeExecutionApprovedLocalLoopbackSmokeSession,
  RuntimeExecutionApprovedLocalLoopbackSmokeSummary,
  RuntimeExecutionApprovedLocalLoopbackSmokeTarget,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke";
const SOURCE_NODE_V406_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-live-read-gate";
const ACTIVE_PLAN =
  "docs/plans3/v407-post-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v408-post-java-mini-kv-runtime-execution-pass-evidence-archive-verification-roadmap.md";

const TARGETS: RuntimeExecutionApprovedLocalLoopbackSmokeTarget[] = [
  {
    id: "java-health",
    owner: "java",
    protocol: "http",
    methodOrCommand: "GET",
    target: "http://127.0.0.1:8080/actuator/health",
    readOnly: true,
    mutatesState: false,
  },
  {
    id: "mini-kv-health",
    owner: "mini-kv",
    protocol: "tcp-inline",
    methodOrCommand: "HEALTH",
    target: "127.0.0.1:6424 HEALTH",
    readOnly: true,
    mutatesState: false,
  },
];

export async function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke(
  input: {
    config: AppConfig;
    orderPlatform: RuntimeExecutionApprovedLocalLoopbackOrderPlatformClient;
    miniKv: RuntimeExecutionApprovedLocalLoopbackMiniKvClient;
    archiveRoot?: string;
  },
): Promise<ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeProfile> {
  const sourceNodeV406Profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate({
      config: input.config,
      archiveRoot: input.archiveRoot,
    });
  const sourceNodeV406 = {
    sourceVersion: "Node v406" as const,
    gateState: sourceNodeV406Profile.gateState,
    gateDecision: sourceNodeV406Profile.gateDecision,
    readyForRuntimeExecutionLiveReadGate: sourceNodeV406Profile.readyForRuntimeExecutionLiveReadGate,
    readyForApprovedLocalLoopbackReadOnlySmoke: sourceNodeV406Profile.readyForApprovedLocalLoopbackReadOnlySmoke,
    checkCount: sourceNodeV406Profile.summary.checkCount,
    passedCheckCount: sourceNodeV406Profile.summary.passedCheckCount,
    productionBlockerCount: sourceNodeV406Profile.summary.productionBlockerCount,
    targetCount: sourceNodeV406Profile.summary.targetCount,
    readyTargetCount: sourceNodeV406Profile.summary.readyTargetCount,
  };
  const records = input.config.upstreamProbesEnabled
    ? await runSmokeTargets(input.orderPlatform, input.miniKv)
    : TARGETS.map(skippedRecord);
  const smokeSession = createSmokeSession(sourceNodeV406Profile.liveReadGate.approvalCorrelationId, input.config,
    records);
  const checks = createChecks(sourceNodeV406, input.config, records, smokeSession);
  checks.readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke = Object.entries(checks)
    .filter(([key]) => key !== "readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke")
    .every(([, value]) => value);
  const ready = checks.readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(input.config.upstreamProbesEnabled);
  const recommendations = collectRecommendations(ready, input.config.upstreamProbesEnabled);
  const summary = createSummary(records, checks, productionBlockers, warnings, recommendations);
  const smokeState = ready
    ? "approved-local-loopback-read-only-smoke-passed"
    : input.config.upstreamProbesEnabled ? "failed" : "skipped-closed-window";

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution approved local-loopback read-only smoke",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    smokeState,
    smokeDecision: ready ? "accept-read-only-smoke-pass-evidence" : input.config.upstreamProbesEnabled ? "blocked" : "skipped",
    readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: ready,
    readyForRuntimeExecutionPassEvidenceArchive: ready,
    activeNodeVersion: "Node v407",
    sourceNodeVersion: "Node v406",
    javaSourceVersion: "Java v167",
    miniKvSourceVersion: "mini-kv v158",
    smokeOnly: true,
    readOnly: true,
    executionAllowed: false,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    startsJavaServiceFromRoute: false,
    startsMiniKvServiceFromRoute: false,
    stopsJavaServiceFromRoute: false,
    stopsMiniKvServiceFromRoute: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    activeShardPrototypeEnabled: false,
    sourceNodeV406,
    targets: TARGETS,
    records,
    smokeSession,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvedLocalLoopbackSmokeJson: ROUTE_PATH,
      approvedLocalLoopbackSmokeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV406Json: SOURCE_NODE_V406_ROUTE,
      sourceNodeV406Markdown: `${SOURCE_NODE_V406_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v408",
    },
    nextActions: ready
      ? [
        "Archive and verify Node v407 pass evidence before adding any broader runtime surface.",
        "Stop only the Java and mini-kv processes started for this approved smoke window.",
        "Keep managed audit, credentials, raw endpoint parsing, writes, and active shard routing closed.",
      ]
      : [
        "Open the approved local-loopback read-only window with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false.",
        "Confirm Java 127.0.0.1:8080 and mini-kv 127.0.0.1:6424 are owned by the current smoke run before retrying.",
      ],
  };
}

async function runSmokeTargets(
  orderPlatform: RuntimeExecutionApprovedLocalLoopbackOrderPlatformClient,
  miniKv: RuntimeExecutionApprovedLocalLoopbackMiniKvClient,
): Promise<RuntimeExecutionApprovedLocalLoopbackSmokeRecord[]> {
  return [
    await runJavaHealth(orderPlatform),
    await runMiniKvHealth(miniKv),
  ];
}

async function runJavaHealth(
  orderPlatform: RuntimeExecutionApprovedLocalLoopbackOrderPlatformClient,
): Promise<RuntimeExecutionApprovedLocalLoopbackSmokeRecord> {
  const started = performance.now();
  try {
    const response = await orderPlatform.health();
    const status = recordString(response.data, "status");
    return passedRecord(TARGETS[0], response.latencyMs, response.statusCode, {
      status,
      healthy: response.statusCode === 200 && status === "UP",
    });
  } catch (error) {
    return failedRecord(TARGETS[0], classifyError(error), summarizeError(error), Math.round(performance.now() - started));
  }
}

async function runMiniKvHealth(
  miniKv: RuntimeExecutionApprovedLocalLoopbackMiniKvClient,
): Promise<RuntimeExecutionApprovedLocalLoopbackSmokeRecord> {
  const started = performance.now();
  try {
    const result = await miniKv.health();
    return passedRecord(TARGETS[1], result.latencyMs, undefined, {
      command: result.command,
      response: result.response,
      healthy: result.response.startsWith("OK "),
    });
  } catch (error) {
    return failedRecord(TARGETS[1], classifyError(error), summarizeError(error), Math.round(performance.now() - started));
  }
}

function createSmokeSession(
  approvalCorrelationId: string | null,
  config: AppConfig,
  records: RuntimeExecutionApprovedLocalLoopbackSmokeRecord[],
): RuntimeExecutionApprovedLocalLoopbackSmokeSession {
  const counts = countRecords(records);
  const record = {
    smokeMode: "approved-local-loopback-read-only-smoke" as const,
    sourceSpan: "Node v406 live-read gate + approved local Java/mini-kv loopback services" as const,
    approvalCorrelationId,
    targetCount: 2 as const,
    attemptedTargetCount: counts.attempted,
    passedTargetCount: counts.passed,
    failedTargetCount: counts.failed,
    skippedTargetCount: counts.skipped,
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    localLoopbackOnly: true as const,
    readOnly: true as const,
    mutatesUpstreamState: false as const,
    startsJavaServiceFromRoute: false as const,
    startsMiniKvServiceFromRoute: false as const,
    stopsJavaServiceFromRoute: false as const,
    stopsMiniKvServiceFromRoute: false as const,
    connectsManagedAudit: false as const,
    credentialValueRead: false as const,
    rawEndpointUrlParsed: false as const,
    activeShardRoutingEnabled: false as const,
    cleanupProofRequired: true as const,
    cleanupProofExpectedInArchive: true as const,
    nextNodeVersionSuggested: "Node v408" as const,
  };
  return {
    smokeDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  sourceNodeV406: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeProfile["sourceNodeV406"],
  config: AppConfig,
  records: RuntimeExecutionApprovedLocalLoopbackSmokeRecord[],
  smokeSession: RuntimeExecutionApprovedLocalLoopbackSmokeSession,
): RuntimeExecutionApprovedLocalLoopbackSmokeChecks {
  const java = records.find((record) => record.id === "java-health");
  const miniKv = records.find((record) => record.id === "mini-kv-health");
  return {
    sourceNodeV406Ready:
      sourceNodeV406.readyForRuntimeExecutionLiveReadGate
      && sourceNodeV406.readyForApprovedLocalLoopbackReadOnlySmoke
      && sourceNodeV406.checkCount === sourceNodeV406.passedCheckCount,
    sourceNodeV406HasNoBlockers: sourceNodeV406.productionBlockerCount === 0,
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    upstreamActionsDisabled: !config.upstreamActionsEnabled,
    targetsAreLocalLoopback: TARGETS.every((target) => target.target.includes("127.0.0.1")),
    targetsGetOnlyOrHealthOnly: TARGETS.every((target) =>
      target.methodOrCommand === "GET" || target.methodOrCommand === "HEALTH"),
    javaHealthAttempted: java?.attempted === true,
    miniKvHealthAttempted: miniKv?.attempted === true,
    javaHealthPassed:
      java?.status === "passed-read"
      && java.statusCode === 200
      && java.evidenceSummary?.healthy === true,
    miniKvHealthPassed:
      miniKv?.status === "passed-read"
      && miniKv.evidenceSummary?.healthy === true,
    allAttemptedTargetsPassed: records.every((record) => record.status === "passed-read"),
    noWriteTargets: TARGETS.every((target) => target.readOnly && !target.mutatesState),
    noAutomaticUpstreamStartStopFromRoute:
      !smokeSession.startsJavaServiceFromRoute
      && !smokeSession.startsMiniKvServiceFromRoute
      && !smokeSession.stopsJavaServiceFromRoute
      && !smokeSession.stopsMiniKvServiceFromRoute,
    noUpstreamMutation: !smokeSession.mutatesUpstreamState,
    noManagedAuditConnection: !smokeSession.connectsManagedAudit,
    noCredentialValueRead: !smokeSession.credentialValueRead,
    noRawEndpointUrlParsed: !smokeSession.rawEndpointUrlParsed,
    activeShardPrototypeStillDisabled: !smokeSession.activeShardRoutingEnabled,
    cleanupProofRequired: smokeSession.cleanupProofRequired && smokeSession.cleanupProofExpectedInArchive,
    smokeDigestStable: isDigest(smokeSession.smokeDigest),
    readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: false,
  };
}

function createSummary(
  records: RuntimeExecutionApprovedLocalLoopbackSmokeRecord[],
  checks: RuntimeExecutionApprovedLocalLoopbackSmokeChecks,
  productionBlockers: RuntimeExecutionApprovedLocalLoopbackSmokeMessage[],
  warnings: RuntimeExecutionApprovedLocalLoopbackSmokeMessage[],
  recommendations: RuntimeExecutionApprovedLocalLoopbackSmokeMessage[],
): RuntimeExecutionApprovedLocalLoopbackSmokeSummary {
  const counts = countRecords(records);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    targetCount: 2,
    attemptedTargetCount: counts.attempted,
    passedTargetCount: counts.passed,
    failedTargetCount: counts.failed,
    skippedTargetCount: counts.skipped,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionApprovedLocalLoopbackSmokeChecks,
): RuntimeExecutionApprovedLocalLoopbackSmokeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV406Ready, "SOURCE_NODE_V406_NOT_READY", "node-v406", "Node v406 live-read gate must be ready."],
    [checks.sourceNodeV406HasNoBlockers, "SOURCE_NODE_V406_HAS_BLOCKERS", "node-v406", "Node v406 must have no blockers."],
    [checks.upstreamProbesEnabled, "UPSTREAM_PROBES_DISABLED", "runtime-config", "UPSTREAM_PROBES_ENABLED must be true for v407 smoke."],
    [checks.upstreamActionsDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false."],
    [checks.targetsAreLocalLoopback, "NON_LOOPBACK_TARGET", "runtime-targets", "Smoke targets must remain local loopback."],
    [checks.javaHealthPassed, "JAVA_HEALTH_FAILED", "java", "Java actuator health must return UP."],
    [checks.miniKvHealthPassed, "MINI_KV_HEALTH_FAILED", "mini-kv", "mini-kv HEALTH must return OK."],
    [checks.noWriteTargets, "WRITE_TARGET_PRESENT", "runtime-targets", "v407 targets must be read-only."],
    [checks.noAutomaticUpstreamStartStopFromRoute, "ROUTE_STARTED_OR_STOPPED_SERVICE", "node-v407", "The v407 route must not start or stop services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary", "v407 must not mutate sibling state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTED", "runtime-boundary", "Managed audit must remain disconnected."],
    [checks.cleanupProofRequired, "CLEANUP_PROOF_NOT_REQUIRED", "cleanup", "Cleanup proof must be archived after owned process stop."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(probesEnabled: boolean): RuntimeExecutionApprovedLocalLoopbackSmokeMessage[] {
  return [
    {
      code: probesEnabled ? "LOCAL_LOOPBACK_SMOKE_IS_NOT_PRODUCTION_EXECUTION" : "SMOKE_SKIPPED_WINDOW_CLOSED",
      severity: "warning",
      source: "node-v407",
      message: probesEnabled
        ? "v407 captures local-loopback read-only pass evidence only; production execution remains disabled."
        : "UPSTREAM_PROBES_ENABLED=false, so v407 records skipped evidence without contacting Java or mini-kv.",
    },
  ];
}

function collectRecommendations(
  ready: boolean,
  probesEnabled: boolean,
): RuntimeExecutionApprovedLocalLoopbackSmokeMessage[] {
  return [
    {
      code: ready ? "ARCHIVE_AND_VERIFY_V407_PASS_EVIDENCE" : probesEnabled ? "REPAIR_LOCAL_SMOKE_TARGETS" : "OPEN_PROBE_WINDOW",
      severity: "recommendation",
      source: "node-v407",
      message: ready
        ? "Archive cleanup proof and verify v407 pass evidence before broadening runtime checks."
        : probesEnabled
          ? "Repair Java or mini-kv local loopback smoke before retrying v407."
          : "Rerun with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false after owned services are ready.",
    },
  ];
}

function passedRecord(
  target: RuntimeExecutionApprovedLocalLoopbackSmokeTarget,
  latencyMs: number,
  statusCode: number | undefined,
  evidenceSummary: Record<string, unknown>,
): RuntimeExecutionApprovedLocalLoopbackSmokeRecord {
  return {
    id: target.id,
    owner: target.owner,
    protocol: target.protocol,
    methodOrCommand: target.methodOrCommand,
    target: target.target,
    status: "passed-read",
    attempted: true,
    readOnly: true,
    mutatesState: false,
    latencyMs,
    statusCode,
    failureClass: "none",
    message: "Approved local-loopback read-only smoke target returned evidence.",
    evidenceSummary,
  };
}

function skippedRecord(
  target: RuntimeExecutionApprovedLocalLoopbackSmokeTarget,
): RuntimeExecutionApprovedLocalLoopbackSmokeRecord {
  return {
    id: target.id,
    owner: target.owner,
    protocol: target.protocol,
    methodOrCommand: target.methodOrCommand,
    target: target.target,
    status: "skipped-closed-window",
    attempted: false,
    readOnly: true,
    mutatesState: false,
    failureClass: "closed-window",
    message: "UPSTREAM_PROBES_ENABLED=false; v407 smoke skipped by closed-window configuration.",
  };
}

function failedRecord(
  target: RuntimeExecutionApprovedLocalLoopbackSmokeTarget,
  failureClass: RuntimeExecutionApprovedLocalLoopbackSmokeRecord["failureClass"],
  message: string,
  latencyMs: number,
): RuntimeExecutionApprovedLocalLoopbackSmokeRecord {
  return {
    id: target.id,
    owner: target.owner,
    protocol: target.protocol,
    methodOrCommand: target.methodOrCommand,
    target: target.target,
    status: "failed-read",
    attempted: true,
    readOnly: true,
    mutatesState: false,
    latencyMs,
    failureClass,
    message,
  };
}

function countRecords(records: RuntimeExecutionApprovedLocalLoopbackSmokeRecord[]): {
  attempted: number;
  passed: number;
  failed: number;
  skipped: number;
} {
  return {
    attempted: records.filter((record) => record.attempted).length,
    passed: records.filter((record) => record.status === "passed-read").length,
    failed: records.filter((record) => record.status === "failed-read").length,
    skipped: records.filter((record) => record.status === "skipped-closed-window").length,
  };
}

function recordString(value: unknown, key: string): string | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    && typeof (value as Record<string, unknown>)[key] === "string"
    ? (value as Record<string, string>)[key]
    : null;
}

function classifyError(error: unknown): RuntimeExecutionApprovedLocalLoopbackSmokeRecord["failureClass"] {
  const message = summarizeError(error).toLowerCase();
  if (message.includes("timeout")) {
    return "timeout";
  }
  if (message.includes("unavailable") || message.includes("connect") || message.includes("refused")) {
    return "unavailable";
  }
  return "unexpected-response";
}

function summarizeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isDigest(value: string | null | undefined): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
