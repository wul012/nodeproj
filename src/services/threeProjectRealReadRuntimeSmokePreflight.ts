import type { IncomingHttpHeaders } from "node:http";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadCrossProjectCiArtifactRetentionGate,
  type CrossProjectCiArtifactRetentionGateProfile,
} from "./crossProjectCiArtifactRetentionGate.js";

export interface ThreeProjectRealReadRuntimeSmokePreflightProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "three-project-real-read-runtime-smoke-preflight.v1";
  preflightState: "closed-window-preflight-ready" | "manual-window-preflight-ready" | "blocked";
  readyForThreeProjectRealReadRuntimeSmokePreflight: boolean;
  readyForRuntimeSmokeExecutionCandidate: boolean;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  sourceRetentionGate: {
    profileVersion: CrossProjectCiArtifactRetentionGateProfile["profileVersion"];
    gateState: CrossProjectCiArtifactRetentionGateProfile["gateState"];
    gateDigest: string;
    ready: boolean;
    readyForRealCiArtifactUpload: false;
    readyForProductionWindow: false;
  };
  runtimeWindow: {
    preflightDigest: string;
    sourceEvidenceSpan: "Node v203 + Java v72 + mini-kv v81";
    windowMode: "closed-window-plan" | "manual-open-window-plan";
    nodeBaseUrl: string;
    javaBaseUrl: string;
    miniKvTarget: string;
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    nodeServiceMustRunForV205: true;
    javaStartPolicy: "manual-or-explicit-v205-start-only";
    miniKvStartPolicy: "manual-or-explicit-v205-start-only";
    requiresOperatorHeaders: true;
    processCleanupRequired: true;
    realRuntimeSmokeExecutedInV204: false;
  };
  readTargets: RuntimeReadTarget[];
  commandPolicy: {
    allowedJavaMethods: readonly ["GET"];
    allowedMiniKvCommands: readonly ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"];
    forbiddenJavaMethods: readonly ["POST", "PUT", "PATCH", "DELETE"];
    forbiddenMiniKvCommands: readonly ["SET", "DEL", "EXPIRE", "LOAD", "COMPACT", "SETNXEX", "RESTORE"];
  };
  processPlan: RuntimeProcessPlanStep[];
  failureTaxonomy: RuntimeSmokeFailureClass[];
  checks: {
    sourceRetentionGateReady: boolean;
    sourceRetentionGateDigestValid: boolean;
    sourceProductionWindowStillBlocked: boolean;
    readTargetsComplete: boolean;
    javaTargetsReadOnly: boolean;
    miniKvTargetsReadOnly: boolean;
    nodeTargetsReadOnly: boolean;
    noWriteHttpMethodsPlanned: boolean;
    noForbiddenMiniKvCommandsPlanned: boolean;
    failureTaxonomyComplete: boolean;
    processPlanRequiresCleanup: boolean;
    automaticUpstreamStartDisabled: boolean;
    upstreamActionsStillDisabled: boolean;
    closedWindowDoesNotAttemptUpstreams: boolean;
    runtimeSmokeExecutionDeferredToV205: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForThreeProjectRealReadRuntimeSmokePreflight: boolean;
    readyForRuntimeSmokeExecutionCandidate: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    readTargetCount: number;
    javaTargetCount: number;
    miniKvTargetCount: number;
    nodeTargetCount: number;
    processStepCount: number;
    failureClassCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RuntimeSmokePreflightMessage[];
  warnings: RuntimeSmokePreflightMessage[];
  recommendations: RuntimeSmokePreflightMessage[];
  evidenceEndpoints: {
    threeProjectRealReadRuntimeSmokePreflightJson: string;
    threeProjectRealReadRuntimeSmokePreflightMarkdown: string;
    crossProjectCiArtifactRetentionGateJson: string;
    javaReleaseApprovalRehearsal: string;
    miniKvRuntimeSmokeEvidence: string;
  };
  nextActions: string[];
}

interface RuntimeReadTarget {
  id: string;
  project: "node" | "java" | "mini-kv";
  protocol: "http" | "tcp-inline";
  methodOrCommand: string;
  target: string;
  expectedEvidence: string;
  readOnly: true;
  mutatesState: false;
  allowedInV205: true;
  attemptedInV204: false;
  requiresProcess: "node" | "java" | "mini-kv";
}

interface RuntimeProcessPlanStep {
  id: string;
  process: "node" | "java" | "mini-kv";
  responsibility: "v204-record-only" | "v205-start-or-verify-running";
  defaultPort: number;
  startPolicy: string;
  stopPolicy: string;
  pidMustBeRecorded: true;
  cleanupRequired: true;
}

interface RuntimeSmokeFailureClass {
  id:
    | "closed-window"
    | "node-service-unavailable"
    | "java-connection-refused"
    | "mini-kv-connection-refused"
    | "timeout"
    | "invalid-json"
    | "unsafe-surface"
    | "unexpected-write-signal"
    | "cleanup-missing";
  source: "runtime-config" | "node-http" | "java-http" | "mini-kv-tcp" | "adapter-safety" | "cleanup";
  retryable: boolean;
  writeRisk: boolean;
  blocksProductionWindow: true;
}

interface RuntimeSmokePreflightMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "three-project-real-read-runtime-smoke-preflight"
    | "cross-project-ci-artifact-retention-gate"
    | "runtime-config"
    | "runtime-process-plan";
  message: string;
}

const ENDPOINTS = Object.freeze({
  threeProjectRealReadRuntimeSmokePreflightJson: "/api/v1/production/three-project-real-read-runtime-smoke-preflight",
  threeProjectRealReadRuntimeSmokePreflightMarkdown: "/api/v1/production/three-project-real-read-runtime-smoke-preflight?format=markdown",
  crossProjectCiArtifactRetentionGateJson: "/api/v1/production/cross-project-ci-artifact-retention-gate",
  javaReleaseApprovalRehearsal: "D:/javaproj/advanced-order-platform/api/v1/ops/release-approval-rehearsal",
  miniKvRuntimeSmokeEvidence: "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json",
});

const ALLOWED_JAVA_METHODS = ["GET"] as const;
const ALLOWED_MINI_KV_COMMANDS = ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"] as const;
const FORBIDDEN_JAVA_METHODS = ["POST", "PUT", "PATCH", "DELETE"] as const;
const FORBIDDEN_MINI_KV_COMMANDS = ["SET", "DEL", "EXPIRE", "LOAD", "COMPACT", "SETNXEX", "RESTORE"] as const;

export async function loadThreeProjectRealReadRuntimeSmokePreflight(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<ThreeProjectRealReadRuntimeSmokePreflightProfile> {
  const sourceRetentionGate = await loadCrossProjectCiArtifactRetentionGate({
    ...input,
    config: {
      ...input.config,
      upstreamProbesEnabled: false,
    },
  });
  const readTargets = createReadTargets(input.config);
  const processPlan = createProcessPlan(input.config);
  const failureTaxonomy = createFailureTaxonomy();
  const checks = createChecks(input.config, sourceRetentionGate, readTargets, processPlan, failureTaxonomy);
  checks.readyForThreeProjectRealReadRuntimeSmokePreflight = Object.entries(checks)
    .filter(([key]) => ![
      "readyForThreeProjectRealReadRuntimeSmokePreflight",
      "readyForRuntimeSmokeExecutionCandidate",
    ].includes(key))
    .every(([, value]) => value);
  checks.readyForRuntimeSmokeExecutionCandidate = checks.readyForThreeProjectRealReadRuntimeSmokePreflight
    && input.config.upstreamProbesEnabled
    && input.config.upstreamActionsEnabled === false;
  const preflightState = determinePreflightState(input.config, checks);
  const windowMode = input.config.upstreamProbesEnabled ? "manual-open-window-plan" : "closed-window-plan";
  const preflightDigest = sha256StableJson({
    profileVersion: "three-project-real-read-runtime-smoke-preflight.v1",
    preflightState,
    sourceGateDigest: sourceRetentionGate.retentionGate.gateDigest,
    windowMode,
    readTargets: readTargets.map((target) => ({
      id: target.id,
      project: target.project,
      methodOrCommand: target.methodOrCommand,
      target: target.target,
      attemptedInV204: target.attemptedInV204,
    })),
    processPlan: processPlan.map((step) => ({
      id: step.id,
      process: step.process,
      defaultPort: step.defaultPort,
      cleanupRequired: step.cleanupRequired,
    })),
    failureClasses: failureTaxonomy.map((failureClass) => failureClass.id),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(input.config, preflightState);
  const recommendations = collectRecommendations(preflightState);

  return {
    service: "orderops-node",
    title: "Three-project real-read runtime smoke preflight",
    generatedAt: new Date().toISOString(),
    profileVersion: "three-project-real-read-runtime-smoke-preflight.v1",
    preflightState,
    readyForThreeProjectRealReadRuntimeSmokePreflight: checks.readyForThreeProjectRealReadRuntimeSmokePreflight,
    readyForRuntimeSmokeExecutionCandidate: checks.readyForRuntimeSmokeExecutionCandidate,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    sourceRetentionGate: {
      profileVersion: sourceRetentionGate.profileVersion,
      gateState: sourceRetentionGate.gateState,
      gateDigest: sourceRetentionGate.retentionGate.gateDigest,
      ready: sourceRetentionGate.readyForCrossProjectCiArtifactRetentionGate,
      readyForRealCiArtifactUpload: false,
      readyForProductionWindow: false,
    },
    runtimeWindow: {
      preflightDigest,
      sourceEvidenceSpan: "Node v203 + Java v72 + mini-kv v81",
      windowMode,
      nodeBaseUrl: `http://${input.config.host}:${input.config.port}`,
      javaBaseUrl: input.config.orderPlatformUrl,
      miniKvTarget: `${input.config.miniKvHost}:${input.config.miniKvPort}`,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      nodeServiceMustRunForV205: true,
      javaStartPolicy: "manual-or-explicit-v205-start-only",
      miniKvStartPolicy: "manual-or-explicit-v205-start-only",
      requiresOperatorHeaders: true,
      processCleanupRequired: true,
      realRuntimeSmokeExecutedInV204: false,
    },
    readTargets,
    commandPolicy: {
      allowedJavaMethods: ALLOWED_JAVA_METHODS,
      allowedMiniKvCommands: ALLOWED_MINI_KV_COMMANDS,
      forbiddenJavaMethods: FORBIDDEN_JAVA_METHODS,
      forbiddenMiniKvCommands: FORBIDDEN_MINI_KV_COMMANDS,
    },
    processPlan,
    failureTaxonomy,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      readTargetCount: readTargets.length,
      javaTargetCount: readTargets.filter((target) => target.project === "java").length,
      miniKvTargetCount: readTargets.filter((target) => target.project === "mini-kv").length,
      nodeTargetCount: readTargets.filter((target) => target.project === "node").length,
      processStepCount: processPlan.length,
      failureClassCount: failureTaxonomy.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this v204 profile as the run sheet for v205; do not treat it as executed smoke evidence.",
      "If Java or mini-kv must be started by Node in v205, record PID, port, start command, stop command, and cleanup result.",
      "Prefer Java v73 plus mini-kv v82 before v205 so the real-read smoke can consume explicit live-read session hints.",
    ],
  };
}

export function renderThreeProjectRealReadRuntimeSmokePreflightMarkdown(
  profile: ThreeProjectRealReadRuntimeSmokePreflightProfile,
): string {
  return [
    "# Three-project real-read runtime smoke preflight",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Preflight state: ${profile.preflightState}`,
    `- Ready for three-project real-read runtime smoke preflight: ${profile.readyForThreeProjectRealReadRuntimeSmokePreflight}`,
    `- Ready for runtime smoke execution candidate: ${profile.readyForRuntimeSmokeExecutionCandidate}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Retention Gate",
    "",
    ...renderEntries(profile.sourceRetentionGate),
    "",
    "## Runtime Window",
    "",
    ...renderEntries(profile.runtimeWindow),
    "",
    "## Read Targets",
    "",
    ...profile.readTargets.flatMap(renderReadTarget),
    "## Command Policy",
    "",
    ...renderEntries(profile.commandPolicy),
    "",
    "## Process Plan",
    "",
    ...profile.processPlan.flatMap(renderProcessPlanStep),
    "## Failure Taxonomy",
    "",
    ...profile.failureTaxonomy.flatMap(renderFailureClass),
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
    ...renderMessages(profile.productionBlockers, "No three-project runtime smoke preflight blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No three-project runtime smoke preflight warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No three-project runtime smoke preflight recommendations."),
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

function createReadTargets(config: AppConfig): RuntimeReadTarget[] {
  return [
    readTarget("node-health", "node", "http", "GET", `http://${config.host}:${config.port}/health`, "Node health responds with service status.", "node"),
    readTarget("node-v203-retention-gate", "node", "http", "GET", "/api/v1/production/cross-project-ci-artifact-retention-gate", "Node v203 retention gate remains review-ready.", "node"),
    readTarget("java-health", "java", "http", "GET", `${config.orderPlatformUrl}/actuator/health`, "Java actuator health is reachable.", "java"),
    readTarget("java-release-approval-rehearsal", "java", "http", "GET", `${config.orderPlatformUrl}/api/v1/ops/release-approval-rehearsal`, "Java release approval rehearsal returns read-only evidence.", "java"),
    readTarget("mini-kv-smokejson", "mini-kv", "tcp-inline", "SMOKEJSON", `${config.miniKvHost}:${config.miniKvPort}`, "mini-kv SMOKEJSON returns runtime smoke evidence.", "mini-kv"),
    readTarget("mini-kv-infojson", "mini-kv", "tcp-inline", "INFOJSON", `${config.miniKvHost}:${config.miniKvPort}`, "mini-kv INFOJSON returns runtime identity evidence.", "mini-kv"),
    readTarget("mini-kv-storagejson", "mini-kv", "tcp-inline", "STORAGEJSON", `${config.miniKvHost}:${config.miniKvPort}`, "mini-kv STORAGEJSON returns read-only storage evidence.", "mini-kv"),
    readTarget("mini-kv-health", "mini-kv", "tcp-inline", "HEALTH", `${config.miniKvHost}:${config.miniKvPort}`, "mini-kv HEALTH returns liveness text.", "mini-kv"),
  ];
}

function readTarget(
  id: string,
  project: RuntimeReadTarget["project"],
  protocol: RuntimeReadTarget["protocol"],
  methodOrCommand: string,
  target: string,
  expectedEvidence: string,
  requiresProcess: RuntimeReadTarget["requiresProcess"],
): RuntimeReadTarget {
  return {
    id,
    project,
    protocol,
    methodOrCommand,
    target,
    expectedEvidence,
    readOnly: true,
    mutatesState: false,
    allowedInV205: true,
    attemptedInV204: false,
    requiresProcess,
  };
}

function createProcessPlan(config: AppConfig): RuntimeProcessPlanStep[] {
  return [
    processStep("node-service", "node", config.port, "Start Node with safe env and access guard headers for HTTP smoke.", "Stop the Node PID started by the smoke task before final response.", "v205-start-or-verify-running"),
    processStep("java-service", "java", readPortFromUrl(config.orderPlatformUrl, 8080), "Use an already-running Java service or explicitly record the start command in v205.", "Stop only the Java process started by the current Node task.", "v205-start-or-verify-running"),
    processStep("mini-kv-service", "mini-kv", config.miniKvPort, "Use an already-running mini-kv service or explicitly record the start command in v205.", "Stop only the mini-kv process started by the current Node task.", "v205-start-or-verify-running"),
  ];
}

function processStep(
  id: string,
  process: RuntimeProcessPlanStep["process"],
  defaultPort: number,
  startPolicy: string,
  stopPolicy: string,
  responsibility: RuntimeProcessPlanStep["responsibility"],
): RuntimeProcessPlanStep {
  return {
    id,
    process,
    responsibility,
    defaultPort,
    startPolicy,
    stopPolicy,
    pidMustBeRecorded: true,
    cleanupRequired: true,
  };
}

function createFailureTaxonomy(): RuntimeSmokeFailureClass[] {
  return [
    failureClass("closed-window", "runtime-config", true, false),
    failureClass("node-service-unavailable", "node-http", true, false),
    failureClass("java-connection-refused", "java-http", true, false),
    failureClass("mini-kv-connection-refused", "mini-kv-tcp", true, false),
    failureClass("timeout", "adapter-safety", true, false),
    failureClass("invalid-json", "adapter-safety", false, false),
    failureClass("unsafe-surface", "adapter-safety", false, true),
    failureClass("unexpected-write-signal", "adapter-safety", false, true),
    failureClass("cleanup-missing", "cleanup", false, false),
  ];
}

function failureClass(
  id: RuntimeSmokeFailureClass["id"],
  source: RuntimeSmokeFailureClass["source"],
  retryable: boolean,
  writeRisk: boolean,
): RuntimeSmokeFailureClass {
  return {
    id,
    source,
    retryable,
    writeRisk,
    blocksProductionWindow: true,
  };
}

function createChecks(
  config: AppConfig,
  sourceRetentionGate: CrossProjectCiArtifactRetentionGateProfile,
  readTargets: RuntimeReadTarget[],
  processPlan: RuntimeProcessPlanStep[],
  failureTaxonomy: RuntimeSmokeFailureClass[],
): ThreeProjectRealReadRuntimeSmokePreflightProfile["checks"] {
  const javaTargets = readTargets.filter((target) => target.project === "java");
  const miniKvTargets = readTargets.filter((target) => target.project === "mini-kv");
  const nodeTargets = readTargets.filter((target) => target.project === "node");

  return {
    sourceRetentionGateReady: sourceRetentionGate.readyForCrossProjectCiArtifactRetentionGate,
    sourceRetentionGateDigestValid: /^[a-f0-9]{64}$/.test(sourceRetentionGate.retentionGate.gateDigest),
    sourceProductionWindowStillBlocked: sourceRetentionGate.readyForProductionWindow === false
      && sourceRetentionGate.retentionGate.productionWindowAllowed === false,
    readTargetsComplete: readTargets.length === 8
      && javaTargets.length === 2
      && miniKvTargets.length === 4
      && nodeTargets.length === 2,
    javaTargetsReadOnly: javaTargets.every((target) => target.methodOrCommand === "GET" && target.readOnly && !target.mutatesState),
    miniKvTargetsReadOnly: miniKvTargets.every((target) =>
      ALLOWED_MINI_KV_COMMANDS.includes(target.methodOrCommand as typeof ALLOWED_MINI_KV_COMMANDS[number])
        && target.readOnly
        && !target.mutatesState
    ),
    nodeTargetsReadOnly: nodeTargets.every((target) => target.methodOrCommand === "GET" && target.readOnly && !target.mutatesState),
    noWriteHttpMethodsPlanned: readTargets.every((target) =>
      target.protocol !== "http" || !FORBIDDEN_JAVA_METHODS.includes(target.methodOrCommand as typeof FORBIDDEN_JAVA_METHODS[number])
    ),
    noForbiddenMiniKvCommandsPlanned: miniKvTargets.every((target) =>
      !FORBIDDEN_MINI_KV_COMMANDS.includes(target.methodOrCommand as typeof FORBIDDEN_MINI_KV_COMMANDS[number])
    ),
    failureTaxonomyComplete: failureTaxonomy.length === 9
      && failureTaxonomy.some((item) => item.id === "closed-window")
      && failureTaxonomy.some((item) => item.id === "unsafe-surface")
      && failureTaxonomy.some((item) => item.id === "cleanup-missing"),
    processPlanRequiresCleanup: processPlan.length === 3
      && processPlan.every((step) => step.pidMustBeRecorded && step.cleanupRequired),
    automaticUpstreamStartDisabled: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    closedWindowDoesNotAttemptUpstreams: config.upstreamProbesEnabled === false
      ? readTargets.every((target) => target.attemptedInV204 === false)
      : true,
    runtimeSmokeExecutionDeferredToV205: readTargets.every((target) => target.attemptedInV204 === false),
    readyForProductionOperationsStillFalse: true,
    readyForThreeProjectRealReadRuntimeSmokePreflight: false,
    readyForRuntimeSmokeExecutionCandidate: false,
  };
}

function determinePreflightState(
  config: AppConfig,
  checks: ThreeProjectRealReadRuntimeSmokePreflightProfile["checks"],
): ThreeProjectRealReadRuntimeSmokePreflightProfile["preflightState"] {
  if (!checks.readyForThreeProjectRealReadRuntimeSmokePreflight) {
    return "blocked";
  }
  return config.upstreamProbesEnabled ? "manual-window-preflight-ready" : "closed-window-preflight-ready";
}

function collectProductionBlockers(
  checks: ThreeProjectRealReadRuntimeSmokePreflightProfile["checks"],
): RuntimeSmokePreflightMessage[] {
  const blockers: RuntimeSmokePreflightMessage[] = [];
  addMessage(blockers, checks.sourceRetentionGateReady, "SOURCE_RETENTION_GATE_NOT_READY", "cross-project-ci-artifact-retention-gate", "Node v203 retention gate must be ready before runtime smoke preflight.");
  addMessage(blockers, checks.sourceRetentionGateDigestValid, "SOURCE_RETENTION_GATE_DIGEST_INVALID", "cross-project-ci-artifact-retention-gate", "Node v203 retention gate digest must be valid.");
  addMessage(blockers, checks.sourceProductionWindowStillBlocked, "SOURCE_RETENTION_GATE_UNLOCKED_PRODUCTION", "cross-project-ci-artifact-retention-gate", "Node v203 must still block the production window.");
  addMessage(blockers, checks.readTargetsComplete, "READ_TARGETS_INCOMPLETE", "three-project-real-read-runtime-smoke-preflight", "Read targets must cover Node, Java, and mini-kv.");
  addMessage(blockers, checks.javaTargetsReadOnly, "JAVA_TARGETS_NOT_READ_ONLY", "three-project-real-read-runtime-smoke-preflight", "Java targets must be GET-only.");
  addMessage(blockers, checks.miniKvTargetsReadOnly, "MINI_KV_TARGETS_NOT_READ_ONLY", "three-project-real-read-runtime-smoke-preflight", "mini-kv targets must be read-only commands.");
  addMessage(blockers, checks.nodeTargetsReadOnly, "NODE_TARGETS_NOT_READ_ONLY", "three-project-real-read-runtime-smoke-preflight", "Node targets must be GET-only.");
  addMessage(blockers, checks.noWriteHttpMethodsPlanned, "WRITE_HTTP_METHOD_PLANNED", "three-project-real-read-runtime-smoke-preflight", "Runtime smoke must not plan POST, PUT, PATCH, or DELETE.");
  addMessage(blockers, checks.noForbiddenMiniKvCommandsPlanned, "FORBIDDEN_MINI_KV_COMMAND_PLANNED", "three-project-real-read-runtime-smoke-preflight", "Runtime smoke must not plan mini-kv write/admin commands.");
  addMessage(blockers, checks.failureTaxonomyComplete, "FAILURE_TAXONOMY_INCOMPLETE", "three-project-real-read-runtime-smoke-preflight", "Runtime smoke failure classes must be explicit before v205.");
  addMessage(blockers, checks.processPlanRequiresCleanup, "PROCESS_CLEANUP_PLAN_INCOMPLETE", "runtime-process-plan", "Every process plan step must require PID recording and cleanup.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.closedWindowDoesNotAttemptUpstreams, "CLOSED_WINDOW_ATTEMPTED_UPSTREAM", "runtime-config", "Closed-window v204 must not attempt Java or mini-kv reads.");
  addMessage(blockers, checks.runtimeSmokeExecutionDeferredToV205, "RUNTIME_SMOKE_EXECUTED_TOO_EARLY", "three-project-real-read-runtime-smoke-preflight", "v204 is preflight only; real runtime smoke belongs to v205.");
  blockers.push({
    code: "REAL_RUNTIME_SMOKE_NOT_EXECUTED",
    severity: "blocker",
    source: "three-project-real-read-runtime-smoke-preflight",
    message: "v204 defines the three-project runtime smoke plan, but the real Java/mini-kv read smoke has not been executed yet.",
  });
  return blockers;
}

function collectWarnings(
  config: AppConfig,
  preflightState: ThreeProjectRealReadRuntimeSmokePreflightProfile["preflightState"],
): RuntimeSmokePreflightMessage[] {
  return [
    {
      code: preflightState === "closed-window-preflight-ready" ? "RUNTIME_SMOKE_WINDOW_CLOSED" : "RUNTIME_SMOKE_PREFLIGHT_ONLY",
      severity: "warning",
      source: "three-project-real-read-runtime-smoke-preflight",
      message: config.upstreamProbesEnabled
        ? "UPSTREAM_PROBES_ENABLED is true, but v204 still records a plan only and does not execute real upstream reads."
        : "UPSTREAM_PROBES_ENABLED is false, so v204 records a closed-window preflight without touching Java or mini-kv.",
    },
  ];
}

function collectRecommendations(
  preflightState: ThreeProjectRealReadRuntimeSmokePreflightProfile["preflightState"],
): RuntimeSmokePreflightMessage[] {
  return [
    {
      code: "PROCEED_TO_RECOMMENDED_PARALLEL_JAVA_V73_MINI_KV_V82",
      severity: "recommendation",
      source: "three-project-real-read-runtime-smoke-preflight",
      message: `Preflight state is ${preflightState}; prefer Java v73 plus mini-kv v82 live-read hints before Node v205 executes the smoke.`,
    },
  ];
}

function addMessage(
  messages: RuntimeSmokePreflightMessage[],
  condition: boolean,
  code: string,
  source: RuntimeSmokePreflightMessage["source"],
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

function renderReadTarget(target: RuntimeReadTarget): string[] {
  return [
    `- ${target.id}: ${target.project}`,
    `  - protocol: ${target.protocol}`,
    `  - methodOrCommand: ${target.methodOrCommand}`,
    `  - target: ${target.target}`,
    `  - expectedEvidence: ${target.expectedEvidence}`,
    `  - readOnly: ${target.readOnly}`,
    `  - mutatesState: ${target.mutatesState}`,
    `  - attemptedInV204: ${target.attemptedInV204}`,
  ];
}

function renderProcessPlanStep(step: RuntimeProcessPlanStep): string[] {
  return [
    `- ${step.id}: ${step.process}`,
    `  - responsibility: ${step.responsibility}`,
    `  - defaultPort: ${step.defaultPort}`,
    `  - startPolicy: ${step.startPolicy}`,
    `  - stopPolicy: ${step.stopPolicy}`,
    `  - pidMustBeRecorded: ${step.pidMustBeRecorded}`,
    `  - cleanupRequired: ${step.cleanupRequired}`,
  ];
}

function renderFailureClass(failureClass: RuntimeSmokeFailureClass): string[] {
  return [
    `- ${failureClass.id}: ${failureClass.source}`,
    `  - retryable: ${failureClass.retryable}`,
    `  - writeRisk: ${failureClass.writeRisk}`,
    `  - blocksProductionWindow: ${failureClass.blocksProductionWindow}`,
  ];
}

function readPortFromUrl(url: string, fallback: number): number {
  try {
    const parsed = new URL(url);
    if (parsed.port) {
      return Number.parseInt(parsed.port, 10);
    }
    return parsed.protocol === "https:" ? 443 : 80;
  } catch {
    return fallback;
  }
}
