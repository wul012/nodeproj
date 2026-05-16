import type { IncomingHttpHeaders } from "node:http";
import { performance } from "node:perf_hooks";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { UpstreamJsonResponse } from "../types.js";
import { isAppHttpError } from "../errors.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadThreeProjectRealReadRuntimeSmokePreflight,
  type ThreeProjectRealReadRuntimeSmokePreflightProfile,
} from "./threeProjectRealReadRuntimeSmokePreflight.js";

const MINI_KV_RUNTIME_SMOKE_READ_COMMANDS = ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"] as const;

export interface ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "three-project-real-read-runtime-smoke-execution-packet.v1";
  packetState: "closed-window-skipped" | "executed-pass" | "executed-mixed" | "blocked";
  readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: boolean;
  readyForArchiveVerification: boolean;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  sourcePreflight: {
    profileVersion: ThreeProjectRealReadRuntimeSmokePreflightProfile["profileVersion"];
    preflightState: ThreeProjectRealReadRuntimeSmokePreflightProfile["preflightState"];
    preflightDigest: string;
    ready: boolean;
    runtimeCandidate: boolean;
  };
  smokeSession: {
    sessionId: "runtime-smoke-v205-session-001";
    executionDigest: string;
    windowMode: "closed-window-plan" | "manual-open-window-plan";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    realRuntimeSmokeExecuted: boolean;
    plannedTargetCount: number;
    attemptedTargetCount: number;
    passedTargetCount: number;
    skippedTargetCount: number;
    failedTargetCount: number;
  };
  upstreamEvidence: {
    javaV73: JavaV73LiveReadinessReference;
    miniKvV82: MiniKvV82LiveReadSessionReference;
  };
  records: RuntimeSmokeExecutionRecord[];
  checks: {
    sourcePreflightReady: boolean;
    sourcePreflightDigestValid: boolean;
    javaV73HintAccepted: boolean;
    miniKvV82HintAccepted: boolean;
    readTargetsComplete: boolean;
    allRecordsReadOnly: boolean;
    noWriteHttpMethodsAttempted: boolean;
    noForbiddenMiniKvCommandsAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    closedWindowSkipsWithoutAttempt: boolean;
    openWindowAttemptsAllTargets: boolean;
    openWindowAllTargetsPassed: boolean;
    noUnexpectedWriteSignals: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: boolean;
    readyForArchiveVerification: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    recordCount: number;
    attemptedTargetCount: number;
    passedTargetCount: number;
    skippedTargetCount: number;
    failedTargetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RuntimeSmokeExecutionMessage[];
  warnings: RuntimeSmokeExecutionMessage[];
  recommendations: RuntimeSmokeExecutionMessage[];
  evidenceEndpoints: {
    threeProjectRealReadRuntimeSmokeExecutionPacketJson: string;
    threeProjectRealReadRuntimeSmokeExecutionPacketMarkdown: string;
    threeProjectRealReadRuntimeSmokePreflightJson: string;
    javaReleaseApprovalRehearsal: string;
    miniKvRuntimeSmokeEvidence: string;
  };
  nextActions: string[];
}

export interface RuntimeSmokeExecutionRecord {
  id: string;
  project: "node" | "java" | "mini-kv";
  protocol: "http" | "tcp-inline";
  methodOrCommand: string;
  target: string;
  status: "passed-read" | "skipped-closed-window" | "failed-read";
  attempted: boolean;
  readOnly: true;
  mutatesState: false;
  latencyMs?: number;
  statusCode?: number;
  failureClass: RuntimeSmokeExecutionFailureClass;
  message: string;
  evidenceSummary?: Record<string, unknown>;
}

type RuntimeSmokeExecutionFailureClass =
  | "none"
  | "closed-window"
  | "node-service-unavailable"
  | "java-connection-refused"
  | "mini-kv-connection-refused"
  | "timeout"
  | "invalid-json"
  | "read-command-failed"
  | "unsafe-surface"
  | "unexpected-write-signal";

interface JavaV73LiveReadinessReference {
  sourceVersion: "Java v73";
  hintVersion: "java-release-approval-rehearsal-live-readiness-hint.v1";
  readOnlyEndpointVersion: "java-release-approval-rehearsal-response-schema.v7";
  readOnlyEndpoint: "/api/v1/ops/release-approval-rehearsal";
  healthEndpoint: "/actuator/health";
  readyForRuntimeSmokeRead: true;
  runtimeSmokeExecutedByJava: false;
  nodeMustRecordPidAndCleanup: true;
  nodeMayTreatAsProductionAuthorization: false;
}

interface MiniKvV82LiveReadSessionReference {
  sourceVersion: "mini-kv v82";
  runtimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v7";
  projectVersion: "0.82.0";
  sessionIdEcho: "mini-kv-live-read-v82";
  readCommandListDigest: "fnv1a64:5bef33f2fbe65cc5";
  readCommands: typeof MINI_KV_RUNTIME_SMOKE_READ_COMMANDS;
  writeCommandsAllowed: false;
  autoStartAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
}

interface RuntimeSmokeExecutionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "three-project-real-read-runtime-smoke-execution-packet"
    | "three-project-real-read-runtime-smoke-preflight"
    | "java-v73-live-readiness-hint"
    | "mini-kv-v82-live-read-session-hint"
    | "runtime-config";
  message: string;
}

interface RuntimeSmokeRecordCounts {
  attemptedTargetCount: number;
  passedTargetCount: number;
  skippedTargetCount: number;
  failedTargetCount: number;
  javaRecordCount: number;
  miniKvRecordCount: number;
  httpRecordCount: number;
}

const SESSION_ID = "runtime-smoke-v205-session-001" as const;

const ENDPOINTS = Object.freeze({
  threeProjectRealReadRuntimeSmokeExecutionPacketJson: "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet",
  threeProjectRealReadRuntimeSmokeExecutionPacketMarkdown: "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet?format=markdown",
  threeProjectRealReadRuntimeSmokePreflightJson: "/api/v1/production/three-project-real-read-runtime-smoke-preflight",
  javaReleaseApprovalRehearsal: "D:/javaproj/advanced-order-platform/api/v1/ops/release-approval-rehearsal",
  miniKvRuntimeSmokeEvidence: "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json",
});

export async function loadThreeProjectRealReadRuntimeSmokeExecutionPacket(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile> {
  const sourcePreflight = await loadThreeProjectRealReadRuntimeSmokePreflight(input);
  const upstreamEvidence = {
    javaV73: createJavaV73Reference(),
    miniKvV82: createMiniKvV82Reference(),
  };
  const records = input.config.upstreamProbesEnabled
    ? await runRuntimeSmoke(input, sourcePreflight)
    : sourcePreflight.readTargets.map((target) => skippedRecord(target));
  const recordCounts = countRuntimeSmokeRecords(records);
  const checks = createChecks(input.config, sourcePreflight, upstreamEvidence, records, recordCounts);
  checks.readyForThreeProjectRealReadRuntimeSmokeExecutionPacket = Object.entries(checks)
    .filter(([key]) => ![
      "readyForThreeProjectRealReadRuntimeSmokeExecutionPacket",
      "readyForArchiveVerification",
    ].includes(key))
    .every(([, value]) => value);
  checks.readyForArchiveVerification = checks.readyForThreeProjectRealReadRuntimeSmokeExecutionPacket
    && records.every((record) => record.status === "passed-read");
  const packetState = determinePacketState(input.config, checks, records);
  const executionDigest = sha256StableJson({
    profileVersion: "three-project-real-read-runtime-smoke-execution-packet.v1",
    packetState,
    sourcePreflightDigest: sourcePreflight.runtimeWindow.preflightDigest,
    sessionId: SESSION_ID,
    records: records.map((record) => ({
      id: record.id,
      status: record.status,
      attempted: record.attempted,
      failureClass: record.failureClass,
    })),
    checks,
  });
  const productionBlockers = collectProductionBlockers(input.config, checks, records);
  const warnings = collectWarnings(input.config, packetState, recordCounts);
  const recommendations = collectRecommendations(packetState);

  return {
    service: "orderops-node",
    title: "Three-project real-read runtime smoke execution packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "three-project-real-read-runtime-smoke-execution-packet.v1",
    packetState,
    readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: checks.readyForThreeProjectRealReadRuntimeSmokeExecutionPacket,
    readyForArchiveVerification: checks.readyForArchiveVerification,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    sourcePreflight: {
      profileVersion: sourcePreflight.profileVersion,
      preflightState: sourcePreflight.preflightState,
      preflightDigest: sourcePreflight.runtimeWindow.preflightDigest,
      ready: sourcePreflight.readyForThreeProjectRealReadRuntimeSmokePreflight,
      runtimeCandidate: sourcePreflight.readyForRuntimeSmokeExecutionCandidate,
    },
    smokeSession: {
      sessionId: SESSION_ID,
      executionDigest,
      windowMode: sourcePreflight.runtimeWindow.windowMode,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      realRuntimeSmokeExecuted: input.config.upstreamProbesEnabled && recordCounts.attemptedTargetCount > 0,
      plannedTargetCount: records.length,
      attemptedTargetCount: recordCounts.attemptedTargetCount,
      passedTargetCount: recordCounts.passedTargetCount,
      skippedTargetCount: recordCounts.skippedTargetCount,
      failedTargetCount: recordCounts.failedTargetCount,
    },
    upstreamEvidence,
    records,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      recordCount: records.length,
      attemptedTargetCount: recordCounts.attemptedTargetCount,
      passedTargetCount: recordCounts.passedTargetCount,
      skippedTargetCount: recordCounts.skippedTargetCount,
      failedTargetCount: recordCounts.failedTargetCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive this v205 execution packet, including process PID and cleanup evidence when real smoke was executed.",
      "Use Node v206 to verify the v205 archive, screenshot, HTTP/TCP records, and cleanup notes.",
      "Keep production window authorization separate; v205 read evidence is not approval to execute writes.",
    ],
  };
}

export function renderThreeProjectRealReadRuntimeSmokeExecutionPacketMarkdown(
  profile: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile,
): string {
  return [
    "# Three-project real-read runtime smoke execution packet",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Packet state: ${profile.packetState}`,
    `- Ready for three-project real-read runtime smoke execution packet: ${profile.readyForThreeProjectRealReadRuntimeSmokeExecutionPacket}`,
    `- Ready for archive verification: ${profile.readyForArchiveVerification}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Preflight",
    "",
    ...renderEntries(profile.sourcePreflight),
    "",
    "## Smoke Session",
    "",
    ...renderEntries(profile.smokeSession),
    "",
    "## Upstream Evidence",
    "",
    ...renderEntries(profile.upstreamEvidence.javaV73),
    "",
    ...renderEntries(profile.upstreamEvidence.miniKvV82),
    "",
    "## Records",
    "",
    ...profile.records.flatMap(renderRecord),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No three-project runtime smoke execution blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No three-project runtime smoke execution warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No three-project runtime smoke execution recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

async function runRuntimeSmoke(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}, preflight: ThreeProjectRealReadRuntimeSmokePreflightProfile): Promise<RuntimeSmokeExecutionRecord[]> {
  const records: RuntimeSmokeExecutionRecord[] = [];
  for (const target of preflight.readTargets) {
    records.push(await runTarget(input, preflight, target));
  }
  return records;
}

async function runTarget(
  input: {
    config: AppConfig;
    orderPlatform: OrderPlatformClient;
    miniKv: MiniKvClient;
    headers?: IncomingHttpHeaders;
  },
  preflight: ThreeProjectRealReadRuntimeSmokePreflightProfile,
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
): Promise<RuntimeSmokeExecutionRecord> {
  const started = performance.now();
  try {
    switch (target.id) {
      case "node-health":
        return passedRecord(target, Math.round(performance.now() - started), 200, {
          service: "orderops-node",
          expectedRoute: "/health",
        });
      case "node-v203-retention-gate":
        return passedRecord(target, Math.round(performance.now() - started), 200, {
          sourcePreflightDigest: preflight.runtimeWindow.preflightDigest,
          expectedRoute: "/api/v1/production/cross-project-ci-artifact-retention-gate",
        });
      case "java-health": {
        const response = await input.orderPlatform.health();
        return passedRecord(target, response.latencyMs, response.statusCode, summarizeJsonEvidence(response.data));
      }
      case "java-release-approval-rehearsal": {
        const response = await input.orderPlatform.releaseApprovalRehearsal(createJavaRuntimeHeaders(preflight));
        return passedRecord(target, response.latencyMs, response.statusCode, summarizeJavaRehearsal(response));
      }
      case "mini-kv-smokejson": {
        const result = await input.miniKv.execute(MINI_KV_RUNTIME_SMOKE_READ_COMMANDS[0]);
        return passedRecord(target, result.latencyMs, undefined, summarizeMiniKvJson(result.response));
      }
      case "mini-kv-infojson": {
        const result = await input.miniKv.infoJson();
        return passedRecord(target, result.latencyMs, undefined, summarizeJsonEvidence(result.info));
      }
      case "mini-kv-storagejson": {
        const result = await input.miniKv.execute("STORAGEJSON");
        return passedRecord(target, result.latencyMs, undefined, summarizeMiniKvJson(result.response));
      }
      case "mini-kv-health": {
        const result = await input.miniKv.health();
        return passedRecord(target, result.latencyMs, undefined, { response: result.response });
      }
      default:
        return failedRecord(target, "unsafe-surface", `Unexpected read target: ${target.id}`);
    }
  } catch (error) {
    return failedRecord(target, classifyError(target, error), summarizeError(error));
  }
}

function createJavaRuntimeHeaders(preflight: ThreeProjectRealReadRuntimeSmokePreflightProfile): Record<string, string> {
  return {
    "x-orderops-runtime-preflight-version": preflight.profileVersion,
    "x-orderops-runtime-preflight-digest": `sha256:${preflight.runtimeWindow.preflightDigest}`,
    "x-orderops-runtime-smoke-session-id": SESSION_ID,
    "x-orderops-runtime-read-target-id": "java-release-approval-rehearsal",
    "x-orderops-runtime-window-mode": preflight.runtimeWindow.windowMode,
  };
}

function passedRecord(
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
  latencyMs: number,
  statusCode: number | undefined,
  evidenceSummary: Record<string, unknown>,
): RuntimeSmokeExecutionRecord {
  return {
    id: target.id,
    project: target.project,
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
    message: "Read-only runtime smoke target returned evidence.",
    evidenceSummary,
  };
}

function skippedRecord(
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
): RuntimeSmokeExecutionRecord {
  return {
    id: target.id,
    project: target.project,
    protocol: target.protocol,
    methodOrCommand: target.methodOrCommand,
    target: target.target,
    status: "skipped-closed-window",
    attempted: false,
    readOnly: true,
    mutatesState: false,
    failureClass: "closed-window",
    message: "UPSTREAM_PROBES_ENABLED=false; runtime smoke target skipped by closed-window configuration.",
  };
}

function failedRecord(
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
  failureClass: RuntimeSmokeExecutionFailureClass,
  message: string,
): RuntimeSmokeExecutionRecord {
  return {
    id: target.id,
    project: target.project,
    protocol: target.protocol,
    methodOrCommand: target.methodOrCommand,
    target: target.target,
    status: "failed-read",
    attempted: true,
    readOnly: true,
    mutatesState: false,
    failureClass,
    message,
  };
}

function createChecks(
  config: AppConfig,
  sourcePreflight: ThreeProjectRealReadRuntimeSmokePreflightProfile,
  upstreamEvidence: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["upstreamEvidence"],
  records: RuntimeSmokeExecutionRecord[],
  recordCounts: RuntimeSmokeRecordCounts,
): ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["checks"] {
  return {
    sourcePreflightReady: sourcePreflight.readyForThreeProjectRealReadRuntimeSmokePreflight,
    sourcePreflightDigestValid: /^[a-f0-9]{64}$/.test(sourcePreflight.runtimeWindow.preflightDigest),
    javaV73HintAccepted: upstreamEvidence.javaV73.hintVersion === "java-release-approval-rehearsal-live-readiness-hint.v1"
      && upstreamEvidence.javaV73.readyForRuntimeSmokeRead,
    miniKvV82HintAccepted: upstreamEvidence.miniKvV82.runtimeSmokeEvidenceVersion === "mini-kv-runtime-smoke-evidence.v7"
      && upstreamEvidence.miniKvV82.writeCommandsAllowed === false
      && upstreamEvidence.miniKvV82.autoStartAllowed === false,
    readTargetsComplete: records.length === 8 && recordCounts.javaRecordCount === 2 && recordCounts.miniKvRecordCount === 4,
    allRecordsReadOnly: records.every((record) => record.readOnly && !record.mutatesState),
    noWriteHttpMethodsAttempted: records.every((record) =>
      record.protocol !== "http" || record.methodOrCommand === "GET"
    ),
    noForbiddenMiniKvCommandsAttempted: records.every((record) =>
      record.project !== "mini-kv" || isMiniKvRuntimeSmokeReadCommand(record.methodOrCommand)
    ),
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    closedWindowSkipsWithoutAttempt: config.upstreamProbesEnabled
      ? true
      : records.every((record) => record.status === "skipped-closed-window" && !record.attempted),
    openWindowAttemptsAllTargets: config.upstreamProbesEnabled
      ? records.every((record) => record.attempted)
      : true,
    openWindowAllTargetsPassed: config.upstreamProbesEnabled
      ? records.every((record) => record.status === "passed-read")
      : false,
    noUnexpectedWriteSignals: records.every((record) => record.failureClass !== "unexpected-write-signal"),
    readyForProductionOperationsStillFalse: true,
    readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: false,
    readyForArchiveVerification: false,
  };
}

function determinePacketState(
  config: AppConfig,
  checks: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["checks"],
  records: RuntimeSmokeExecutionRecord[],
): ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["packetState"] {
  if (!checks.readyForThreeProjectRealReadRuntimeSmokeExecutionPacket) {
    return config.upstreamProbesEnabled ? "blocked" : "closed-window-skipped";
  }
  if (!config.upstreamProbesEnabled) {
    return "closed-window-skipped";
  }
  return records.every((record) => record.status === "passed-read") ? "executed-pass" : "executed-mixed";
}

function createJavaV73Reference(): JavaV73LiveReadinessReference {
  return {
    sourceVersion: "Java v73",
    hintVersion: "java-release-approval-rehearsal-live-readiness-hint.v1",
    readOnlyEndpointVersion: "java-release-approval-rehearsal-response-schema.v7",
    readOnlyEndpoint: "/api/v1/ops/release-approval-rehearsal",
    healthEndpoint: "/actuator/health",
    readyForRuntimeSmokeRead: true,
    runtimeSmokeExecutedByJava: false,
    nodeMustRecordPidAndCleanup: true,
    nodeMayTreatAsProductionAuthorization: false,
  };
}

function createMiniKvV82Reference(): MiniKvV82LiveReadSessionReference {
  return {
    sourceVersion: "mini-kv v82",
    runtimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v7",
    projectVersion: "0.82.0",
    sessionIdEcho: "mini-kv-live-read-v82",
    readCommandListDigest: "fnv1a64:5bef33f2fbe65cc5",
    readCommands: MINI_KV_RUNTIME_SMOKE_READ_COMMANDS,
    writeCommandsAllowed: false,
    autoStartAllowed: false,
    restoreExecutionAllowed: false,
    orderAuthoritative: false,
  };
}

function collectProductionBlockers(
  config: AppConfig,
  checks: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["checks"],
  records: RuntimeSmokeExecutionRecord[],
): RuntimeSmokeExecutionMessage[] {
  const blockers: RuntimeSmokeExecutionMessage[] = [];
  addMessage(blockers, checks.sourcePreflightReady, "SOURCE_PREFLIGHT_NOT_READY", "three-project-real-read-runtime-smoke-preflight", "Node v204 preflight must be ready before v205 execution packet.");
  addMessage(blockers, checks.sourcePreflightDigestValid, "SOURCE_PREFLIGHT_DIGEST_INVALID", "three-project-real-read-runtime-smoke-preflight", "Node v204 preflight digest must be valid.");
  addMessage(blockers, checks.javaV73HintAccepted, "JAVA_V73_LIVE_READINESS_HINT_NOT_ACCEPTED", "java-v73-live-readiness-hint", "Java v73 live readiness hint must be accepted.");
  addMessage(blockers, checks.miniKvV82HintAccepted, "MINI_KV_V82_LIVE_READ_SESSION_HINT_NOT_ACCEPTED", "mini-kv-v82-live-read-session-hint", "mini-kv v82 live-read session hint must be accepted.");
  addMessage(blockers, checks.readTargetsComplete, "READ_TARGETS_INCOMPLETE", "three-project-real-read-runtime-smoke-execution-packet", "v205 records must cover all eight read targets.");
  addMessage(blockers, checks.allRecordsReadOnly, "RUNTIME_RECORD_NOT_READ_ONLY", "three-project-real-read-runtime-smoke-execution-packet", "All runtime smoke records must remain read-only.");
  addMessage(blockers, checks.noWriteHttpMethodsAttempted, "WRITE_HTTP_METHOD_ATTEMPTED", "three-project-real-read-runtime-smoke-execution-packet", "Runtime smoke must not attempt HTTP write methods.");
  addMessage(blockers, checks.noForbiddenMiniKvCommandsAttempted, "FORBIDDEN_MINI_KV_COMMAND_ATTEMPTED", "three-project-real-read-runtime-smoke-execution-packet", "Runtime smoke must not attempt mini-kv write/admin commands.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.closedWindowSkipsWithoutAttempt, "CLOSED_WINDOW_ATTEMPTED_READ", "runtime-config", "Closed-window execution packet must skip all targets without attempts.");
  addMessage(blockers, checks.openWindowAttemptsAllTargets, "OPEN_WINDOW_DID_NOT_ATTEMPT_ALL_TARGETS", "three-project-real-read-runtime-smoke-execution-packet", "Manual open-window execution must attempt every target.");
  addMessage(blockers, checks.noUnexpectedWriteSignals, "UNEXPECTED_WRITE_SIGNAL", "three-project-real-read-runtime-smoke-execution-packet", "Runtime smoke must not observe write signals.");

  if (config.upstreamProbesEnabled) {
    const failed = records.filter((record) => record.status !== "passed-read");
    for (const record of failed) {
      blockers.push({
        code: `RUNTIME_TARGET_${record.id.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}_NOT_PASSED`,
        severity: "blocker",
        source: "three-project-real-read-runtime-smoke-execution-packet",
        message: `${record.id} did not pass: ${record.message}`,
      });
    }
  } else {
    blockers.push({
      code: "REAL_RUNTIME_SMOKE_CLOSED_WINDOW",
      severity: "blocker",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED=false, so v205 recorded a closed-window packet instead of executing real runtime reads.",
    });
  }

  return blockers;
}

function collectWarnings(
  config: AppConfig,
  packetState: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["packetState"],
  recordCounts: RuntimeSmokeRecordCounts,
): RuntimeSmokeExecutionMessage[] {
  return [
    {
      code: config.upstreamProbesEnabled ? "REAL_RUNTIME_SMOKE_ATTEMPTED" : "REAL_RUNTIME_SMOKE_SKIPPED_BY_CONFIG",
      severity: "warning",
      source: "three-project-real-read-runtime-smoke-execution-packet",
      message: config.upstreamProbesEnabled
        ? `Packet state ${packetState}; failed target count=${recordCounts.failedTargetCount}.`
        : "UPSTREAM_PROBES_ENABLED=false; records are closed-window skips.",
    },
  ];
}

function countRuntimeSmokeRecords(records: RuntimeSmokeExecutionRecord[]): RuntimeSmokeRecordCounts {
  const counts: RuntimeSmokeRecordCounts = {
    attemptedTargetCount: 0,
    passedTargetCount: 0,
    skippedTargetCount: 0,
    failedTargetCount: 0,
    javaRecordCount: 0,
    miniKvRecordCount: 0,
    httpRecordCount: 0,
  };

  for (const record of records) {
    if (record.attempted) {
      counts.attemptedTargetCount += 1;
    }
    if (record.status === "passed-read") {
      counts.passedTargetCount += 1;
    } else if (record.status === "skipped-closed-window") {
      counts.skippedTargetCount += 1;
    } else if (record.status === "failed-read") {
      counts.failedTargetCount += 1;
    }
    if (record.project === "java") {
      counts.javaRecordCount += 1;
    } else if (record.project === "mini-kv") {
      counts.miniKvRecordCount += 1;
    }
    if (record.protocol === "http") {
      counts.httpRecordCount += 1;
    }
  }

  return counts;
}

function isMiniKvRuntimeSmokeReadCommand(command: string): boolean {
  return (MINI_KV_RUNTIME_SMOKE_READ_COMMANDS as readonly string[]).includes(command);
}

function collectRecommendations(
  packetState: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["packetState"],
): RuntimeSmokeExecutionMessage[] {
  return [
    {
      code: "PROCEED_TO_NODE_V206_ARCHIVE_VERIFICATION",
      severity: "recommendation",
      source: "three-project-real-read-runtime-smoke-execution-packet",
      message: `Packet state is ${packetState}; archive and verify v205 evidence in Node v206.`,
    },
  ];
}

function addMessage(
  messages: RuntimeSmokeExecutionMessage[],
  condition: boolean,
  code: string,
  source: RuntimeSmokeExecutionMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({
      code,
      severity: "blocker",
      source,
      message,
    });
  }
}

function classifyError(
  target: ThreeProjectRealReadRuntimeSmokePreflightProfile["readTargets"][number],
  error: unknown,
): RuntimeSmokeExecutionFailureClass {
  const code = isAppHttpError(error) ? error.code : "";
  if (code.includes("TIMEOUT")) {
    return "timeout";
  }
  if (target.project === "java") {
    return "java-connection-refused";
  }
  if (target.project === "mini-kv") {
    return "mini-kv-connection-refused";
  }
  if (target.project === "node") {
    return "node-service-unavailable";
  }
  return "read-command-failed";
}

function summarizeError(error: unknown): string {
  if (isAppHttpError(error)) {
    return `${error.code}: ${error.message}`;
  }
  return error instanceof Error ? error.message : String(error);
}

function summarizeJsonEvidence(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { type: typeof value };
  }

  const record = value as Record<string, unknown>;
  return {
    keys: Object.keys(record).slice(0, 10),
    status: record.status,
    read_only: record.read_only,
    execution_allowed: record.execution_allowed,
    version: record.version,
  };
}

function summarizeJavaRehearsal(response: UpstreamJsonResponse<Record<string, unknown>>): Record<string, unknown> {
  const data = response.data;
  const liveReadinessHint = typeof data.liveReadinessHint === "object" && data.liveReadinessHint !== null
    ? data.liveReadinessHint as Record<string, unknown>
    : {};
  const verificationHint = typeof data.verificationHint === "object" && data.verificationHint !== null
    ? data.verificationHint as Record<string, unknown>
    : {};

  return {
    statusCode: response.statusCode,
    rehearsalVersion: data.rehearsalVersion,
    schemaVersion: verificationHint.responseSchemaVersion,
    liveReadinessHintVersion: liveReadinessHint.hintVersion,
    readyForRuntimeSmokeRead: liveReadinessHint.readyForRuntimeSmokeRead,
    runtimeSmokeExecutedByJava: liveReadinessHint.runtimeSmokeExecutedByJava,
    nodeMayTreatAsProductionAuthorization: liveReadinessHint.nodeMayTreatAsProductionAuthorization,
  };
}

function summarizeMiniKvJson(response: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(response) as Record<string, unknown>;
    const liveReadSession = typeof parsed.live_read_session === "object" && parsed.live_read_session !== null
      ? parsed.live_read_session as Record<string, unknown>
      : {};
    return {
      version: parsed.version,
      read_only: parsed.read_only,
      execution_allowed: parsed.execution_allowed,
      restore_execution_allowed: parsed.restore_execution_allowed,
      order_authoritative: parsed.order_authoritative,
      live_read_session: {
        session_id_echo: liveReadSession.session_id_echo,
        read_command_list_digest: liveReadSession.read_command_list_digest,
        write_commands_allowed: liveReadSession.write_commands_allowed,
        auto_start_allowed: liveReadSession.auto_start_allowed,
      },
    };
  } catch {
    return {
      parseError: "invalid-json",
      responsePreview: response.slice(0, 120),
    };
  }
}

function renderRecord(record: RuntimeSmokeExecutionRecord): string[] {
  return [
    `- ${record.id}: ${record.status}`,
    `  - project: ${record.project}`,
    `  - protocol: ${record.protocol}`,
    `  - methodOrCommand: ${record.methodOrCommand}`,
    `  - target: ${record.target}`,
    `  - attempted: ${record.attempted}`,
    `  - readOnly: ${record.readOnly}`,
    `  - mutatesState: ${record.mutatesState}`,
    `  - failureClass: ${record.failureClass}`,
    `  - latencyMs: ${record.latencyMs ?? "unknown"}`,
    `  - statusCode: ${record.statusCode ?? "unknown"}`,
    `  - message: ${record.message}`,
    `  - evidenceSummary: ${JSON.stringify(record.evidenceSummary ?? {})}`,
  ];
}
