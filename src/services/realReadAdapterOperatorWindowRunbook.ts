import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";

export interface RealReadAdapterOperatorWindowRunbookProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-adapter-operator-window-runbook.v1";
  runbookState: "ready-for-manual-window" | "blocked";
  readyForRealReadAdapterOperatorWindow: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  runbook: {
    runbookDigest: string;
    sourceAdapterProfileVersion: "real-read-adapter-rehearsal.v1";
    javaDependencyVersion: "Java v67";
    miniKvDependencyVersion: "mini-kv v76";
    requiredEnvironment: RequiredOperatorWindowEnvironment;
    currentRuntime: CurrentRuntimeState;
    manualJavaStartRequired: true;
    manualMiniKvStartRequired: true;
    automaticUpstreamStart: false;
    nodeStartsOrStopsUpstreams: false;
    mutatesUpstreamState: false;
    productionWriteAuthorized: false;
  };
  checks: {
    sourceAdapterEndpointDocumented: boolean;
    requiredProbeEnvDocumented: boolean;
    requiredActionsEnvDocumented: boolean;
    currentActionsDisabled: boolean;
    manualStartupDocumented: boolean;
    manualShutdownDocumented: boolean;
    allowedJavaReadsOnly: boolean;
    allowedMiniKvReadsOnly: boolean;
    forbiddenOperationsCovered: boolean;
    expectedEvidenceCovered: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForRealReadAdapterOperatorWindow: boolean;
  };
  operatorSteps: OperatorWindowStep[];
  allowedReads: {
    java: AllowedReadTarget[];
    miniKv: AllowedReadTarget[];
  };
  expectedEvidence: ExpectedEvidenceItem[];
  forbiddenOperations: ForbiddenOperation[];
  summary: {
    operatorStepCount: number;
    allowedReadCount: number;
    expectedEvidenceCount: number;
    forbiddenOperationCount: number;
    runbookCheckCount: number;
    passedRunbookCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RealReadAdapterOperatorWindowRunbookMessage[];
  warnings: RealReadAdapterOperatorWindowRunbookMessage[];
  recommendations: RealReadAdapterOperatorWindowRunbookMessage[];
  evidenceEndpoints: {
    realReadAdapterOperatorWindowRunbookJson: string;
    realReadAdapterOperatorWindowRunbookMarkdown: string;
    realReadAdapterRehearsalJson: string;
    realReadAdapterRehearsalMarkdown: string;
    productionLiveProbeSmokeHarnessJson: string;
  };
  nextActions: string[];
}

interface RequiredOperatorWindowEnvironment {
  UPSTREAM_PROBES_ENABLED: true;
  UPSTREAM_ACTIONS_ENABLED: false;
  ACCESS_GUARD_ENFORCEMENT_ENABLED: true;
  ORDER_PLATFORM_URL: string;
  MINIKV_HOST: string;
  MINIKV_PORT: number;
  operatorOwnsJavaLifecycle: true;
  operatorOwnsMiniKvLifecycle: true;
}

interface CurrentRuntimeState {
  upstreamProbesEnabled: boolean;
  upstreamActionsEnabled: boolean;
  accessGuardEnforcementEnabled: boolean;
  orderPlatformUrl: string;
  miniKvHost: string;
  miniKvPort: number;
}

interface OperatorWindowStep {
  order: number;
  phase: "preflight" | "open-window" | "capture" | "close-window" | "archive";
  owner: "operator" | "node";
  action: string;
  expectedEvidence: string;
  readOnly: true;
  mutatesState: false;
}

interface AllowedReadTarget {
  project: "advanced-order-platform" | "mini-kv";
  target: string;
  protocol: "http-get" | "tcp-inline-command";
  purpose: string;
  mutatesState: false;
}

interface ExpectedEvidenceItem {
  id: string;
  sourceEndpoint: string;
  expectedState: "closed-skipped" | "open-pass-or-mixed";
  purpose: string;
}

interface ForbiddenOperation {
  project: "orderops-node" | "advanced-order-platform" | "mini-kv";
  operation: string;
  reason: string;
}

interface RealReadAdapterOperatorWindowRunbookMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "operator-window-runbook" | "runtime-config" | "real-read-adapter-rehearsal";
  message: string;
}

const REQUIRED_ENVIRONMENT = Object.freeze({
  UPSTREAM_PROBES_ENABLED: true,
  UPSTREAM_ACTIONS_ENABLED: false,
  ACCESS_GUARD_ENFORCEMENT_ENABLED: true,
  operatorOwnsJavaLifecycle: true,
  operatorOwnsMiniKvLifecycle: true,
});

const JAVA_ALLOWED_READS: readonly AllowedReadTarget[] = Object.freeze([
  {
    project: "advanced-order-platform",
    target: "GET /actuator/health",
    protocol: "http-get",
    purpose: "Confirm Java is reachable inside the operator-owned read-only window.",
    mutatesState: false,
  },
  {
    project: "advanced-order-platform",
    target: "GET /api/v1/ops/overview",
    protocol: "http-get",
    purpose: "Read order, outbox, and failed-event counters without changing Java state.",
    mutatesState: false,
  },
]);

const MINI_KV_ALLOWED_READS: readonly AllowedReadTarget[] = Object.freeze([
  {
    project: "mini-kv",
    target: "HEALTH",
    protocol: "tcp-inline-command",
    purpose: "Confirm mini-kv TCP command handling is reachable.",
    mutatesState: false,
  },
  {
    project: "mini-kv",
    target: "INFOJSON",
    protocol: "tcp-inline-command",
    purpose: "Read mini-kv version, server, and storage metadata as JSON.",
    mutatesState: false,
  },
  {
    project: "mini-kv",
    target: "STATSJSON",
    protocol: "tcp-inline-command",
    purpose: "Read mini-kv counters and storage stats as JSON.",
    mutatesState: false,
  },
]);

const EXPECTED_EVIDENCE: readonly ExpectedEvidenceItem[] = Object.freeze([
  {
    id: "closed-window-baseline",
    sourceEndpoint: "/api/v1/production/real-read-adapter-rehearsal",
    expectedState: "closed-skipped",
    purpose: "Before manual startup, Node should record skipped read evidence without contacting Java or mini-kv.",
  },
  {
    id: "open-window-json",
    sourceEndpoint: "/api/v1/production/real-read-adapter-rehearsal",
    expectedState: "open-pass-or-mixed",
    purpose: "During the manual window, Node should capture five read-only probe records.",
  },
  {
    id: "open-window-markdown",
    sourceEndpoint: "/api/v1/production/real-read-adapter-rehearsal?format=markdown",
    expectedState: "open-pass-or-mixed",
    purpose: "Markdown output should be archived with the same adapter digest and record states.",
  },
]);

const FORBIDDEN_OPERATIONS: readonly ForbiddenOperation[] = Object.freeze([
  {
    project: "orderops-node",
    operation: "Automatically start Java or mini-kv",
    reason: "The real-read adapter window is operator-owned; Node only reports the checklist and probes.",
  },
  {
    project: "orderops-node",
    operation: "UPSTREAM_ACTIONS_ENABLED=true",
    reason: "The adapter rehearsal is read-only and must not unlock upstream write actions.",
  },
  {
    project: "advanced-order-platform",
    operation: "POST /api/v1/orders",
    reason: "Order creation is outside the real-read adapter window.",
  },
  {
    project: "advanced-order-platform",
    operation: "POST /api/v1/failed-events/{id}/replay",
    reason: "Replay execution remains behind a later explicit approval flow.",
  },
  {
    project: "mini-kv",
    operation: "SET / DEL / EXPIRE / LOAD / COMPACT / SETNXEX / RESTORE",
    reason: "mini-kv writes and admin commands are forbidden during the read-only window.",
  },
]);

const ENDPOINTS = Object.freeze({
  realReadAdapterOperatorWindowRunbookJson: "/api/v1/production/real-read-adapter-operator-window-runbook",
  realReadAdapterOperatorWindowRunbookMarkdown: "/api/v1/production/real-read-adapter-operator-window-runbook?format=markdown",
  realReadAdapterRehearsalJson: "/api/v1/production/real-read-adapter-rehearsal",
  realReadAdapterRehearsalMarkdown: "/api/v1/production/real-read-adapter-rehearsal?format=markdown",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
});

export function loadRealReadAdapterOperatorWindowRunbook(
  config: AppConfig,
): RealReadAdapterOperatorWindowRunbookProfile {
  const operatorSteps = createOperatorSteps();
  const currentRuntime = createCurrentRuntimeState(config);
  const requiredEnvironment: RequiredOperatorWindowEnvironment = {
    ...REQUIRED_ENVIRONMENT,
    ORDER_PLATFORM_URL: config.orderPlatformUrl,
    MINIKV_HOST: config.miniKvHost,
    MINIKV_PORT: config.miniKvPort,
  };
  const checks = createChecks(config, operatorSteps);
  checks.readyForRealReadAdapterOperatorWindow = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadAdapterOperatorWindow")
    .every(([, value]) => value);
  const runbookState = checks.readyForRealReadAdapterOperatorWindow
    ? "ready-for-manual-window"
    : "blocked";
  const runbookDigest = sha256StableJson({
    profileVersion: "real-read-adapter-operator-window-runbook.v1",
    sourceAdapterProfileVersion: "real-read-adapter-rehearsal.v1",
    requiredEnvironment,
    currentRuntime,
    operatorSteps: operatorSteps.map((step) => ({
      order: step.order,
      phase: step.phase,
      owner: step.owner,
    })),
    allowedReads: {
      java: JAVA_ALLOWED_READS,
      miniKv: MINI_KV_ALLOWED_READS,
    },
    expectedEvidence: EXPECTED_EVIDENCE,
    forbiddenOperations: FORBIDDEN_OPERATIONS,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(config, runbookState);
  const recommendations = collectRecommendations(runbookState);

  return {
    service: "orderops-node",
    title: "Real-read adapter operator window runbook",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-adapter-operator-window-runbook.v1",
    runbookState,
    readyForRealReadAdapterOperatorWindow: checks.readyForRealReadAdapterOperatorWindow,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    runbook: {
      runbookDigest,
      sourceAdapterProfileVersion: "real-read-adapter-rehearsal.v1",
      javaDependencyVersion: "Java v67",
      miniKvDependencyVersion: "mini-kv v76",
      requiredEnvironment,
      currentRuntime,
      manualJavaStartRequired: true,
      manualMiniKvStartRequired: true,
      automaticUpstreamStart: false,
      nodeStartsOrStopsUpstreams: false,
      mutatesUpstreamState: false,
      productionWriteAuthorized: false,
    },
    checks,
    operatorSteps,
    allowedReads: {
      java: [...JAVA_ALLOWED_READS],
      miniKv: [...MINI_KV_ALLOWED_READS],
    },
    expectedEvidence: [...EXPECTED_EVIDENCE],
    forbiddenOperations: [...FORBIDDEN_OPERATIONS],
    summary: {
      operatorStepCount: operatorSteps.length,
      allowedReadCount: JAVA_ALLOWED_READS.length + MINI_KV_ALLOWED_READS.length,
      expectedEvidenceCount: EXPECTED_EVIDENCE.length,
      forbiddenOperationCount: FORBIDDEN_OPERATIONS.length,
      runbookCheckCount: countReportChecks(checks),
      passedRunbookCheckCount: countPassedReportChecks(checks),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep the default runtime closed until an operator opens a manual Java and mini-kv read-only window.",
      "When the window is approved, start Java and mini-kv outside Node, then run Node with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false.",
      "Capture JSON and Markdown from the v191 rehearsal endpoint, then stop Java and mini-kv manually.",
      "Do not treat this runbook or a pass rehearsal as production operation approval.",
    ],
  };
}

export function renderRealReadAdapterOperatorWindowRunbookMarkdown(
  profile: RealReadAdapterOperatorWindowRunbookProfile,
): string {
  return [
    "# Real-read adapter operator window runbook",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Runbook state: ${profile.runbookState}`,
    `- Ready for real-read adapter operator window: ${profile.readyForRealReadAdapterOperatorWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Runbook",
    "",
    ...renderEntries(profile.runbook),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Operator Steps",
    "",
    ...profile.operatorSteps.flatMap(renderStep),
    "## Java Allowed Reads",
    "",
    ...profile.allowedReads.java.flatMap(renderAllowedRead),
    "## mini-kv Allowed Reads",
    "",
    ...profile.allowedReads.miniKv.flatMap(renderAllowedRead),
    "## Expected Evidence",
    "",
    ...profile.expectedEvidence.flatMap(renderExpectedEvidence),
    "## Forbidden Operations",
    "",
    ...profile.forbiddenOperations.flatMap(renderForbiddenOperation),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read adapter operator window blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read adapter operator window warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read adapter operator window recommendations."),
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

function createCurrentRuntimeState(config: AppConfig): CurrentRuntimeState {
  return {
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    accessGuardEnforcementEnabled: config.accessGuardEnforcementEnabled,
    orderPlatformUrl: config.orderPlatformUrl,
    miniKvHost: config.miniKvHost,
    miniKvPort: config.miniKvPort,
  };
}

function createOperatorSteps(): OperatorWindowStep[] {
  return [
    {
      order: 1,
      phase: "preflight",
      owner: "operator",
      action: "Record the closed-window v191 adapter rehearsal JSON before starting Java or mini-kv.",
      expectedEvidence: "rehearsalState=closed-skipped, attemptedProbeCount=0, and readyForProductionOperations=false.",
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 2,
      phase: "open-window",
      owner: "operator",
      action: "Manually start Java and mini-kv using their own project run commands and keep their terminals visible.",
      expectedEvidence: "Node process does not start, stop, build, or test either upstream project.",
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 3,
      phase: "capture",
      owner: "node",
      action: "Run Node with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false, then call the v191 JSON and Markdown endpoints.",
      expectedEvidence: "The adapter records only two Java GET probes and three mini-kv read commands.",
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 4,
      phase: "close-window",
      owner: "operator",
      action: "Stop Java and mini-kv manually after evidence capture completes.",
      expectedEvidence: "The stop action is outside Node and no upstream write endpoint or command was used.",
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 5,
      phase: "archive",
      owner: "node",
      action: "Archive JSON, Markdown, digest, runtime env, and any skipped/mixed/pass state as rehearsal evidence.",
      expectedEvidence: "The archive keeps productionWriteAuthorized=false and does not promote rehearsal pass to production approval.",
      readOnly: true,
      mutatesState: false,
    },
  ];
}

function createChecks(
  config: AppConfig,
  operatorSteps: readonly OperatorWindowStep[],
): RealReadAdapterOperatorWindowRunbookProfile["checks"] {
  return {
    sourceAdapterEndpointDocumented: ENDPOINTS.realReadAdapterRehearsalJson === "/api/v1/production/real-read-adapter-rehearsal",
    requiredProbeEnvDocumented: REQUIRED_ENVIRONMENT.UPSTREAM_PROBES_ENABLED === true,
    requiredActionsEnvDocumented: REQUIRED_ENVIRONMENT.UPSTREAM_ACTIONS_ENABLED === false,
    currentActionsDisabled: config.upstreamActionsEnabled === false,
    manualStartupDocumented: operatorSteps.some((step) => step.phase === "open-window" && step.owner === "operator"),
    manualShutdownDocumented: operatorSteps.some((step) => step.phase === "close-window" && step.owner === "operator"),
    allowedJavaReadsOnly: JAVA_ALLOWED_READS.length === 2
      && JAVA_ALLOWED_READS.every((target) => target.protocol === "http-get" && !target.mutatesState),
    allowedMiniKvReadsOnly: MINI_KV_ALLOWED_READS.length === 3
      && MINI_KV_ALLOWED_READS.every((target) => target.protocol === "tcp-inline-command" && !target.mutatesState),
    forbiddenOperationsCovered: FORBIDDEN_OPERATIONS.length >= 5
      && FORBIDDEN_OPERATIONS.some((operation) => operation.operation === "Automatically start Java or mini-kv")
      && FORBIDDEN_OPERATIONS.some((operation) => operation.operation === "UPSTREAM_ACTIONS_ENABLED=true")
      && FORBIDDEN_OPERATIONS.some((operation) => operation.operation.includes("LOAD / COMPACT")),
    expectedEvidenceCovered: EXPECTED_EVIDENCE.length === 3
      && EXPECTED_EVIDENCE.some((item) => item.expectedState === "closed-skipped")
      && EXPECTED_EVIDENCE.some((item) => item.expectedState === "open-pass-or-mixed"),
    noAutomaticUpstreamStart: true,
    readyForProductionOperationsStillFalse: true,
    readyForRealReadAdapterOperatorWindow: false,
  };
}

function collectProductionBlockers(
  checks: RealReadAdapterOperatorWindowRunbookProfile["checks"],
): RealReadAdapterOperatorWindowRunbookMessage[] {
  const blockers: RealReadAdapterOperatorWindowRunbookMessage[] = [];
  addMessage(blockers, checks.sourceAdapterEndpointDocumented, "SOURCE_ADAPTER_ENDPOINT_MISSING", "real-read-adapter-rehearsal", "The v191 real-read adapter rehearsal endpoint must be documented.");
  addMessage(blockers, checks.requiredProbeEnvDocumented, "PROBE_ENV_NOT_DOCUMENTED", "operator-window-runbook", "UPSTREAM_PROBES_ENABLED=true must be documented for the manual window.");
  addMessage(blockers, checks.requiredActionsEnvDocumented, "ACTIONS_ENV_NOT_DOCUMENTED", "operator-window-runbook", "UPSTREAM_ACTIONS_ENABLED=false must be documented for the manual window.");
  addMessage(blockers, checks.currentActionsDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "The current runtime must keep UPSTREAM_ACTIONS_ENABLED=false.");
  addMessage(blockers, checks.manualStartupDocumented, "MANUAL_STARTUP_NOT_DOCUMENTED", "operator-window-runbook", "Java and mini-kv startup must be an operator step.");
  addMessage(blockers, checks.manualShutdownDocumented, "MANUAL_SHUTDOWN_NOT_DOCUMENTED", "operator-window-runbook", "Java and mini-kv shutdown must be an operator step.");
  addMessage(blockers, checks.allowedJavaReadsOnly, "JAVA_ALLOWED_READS_NOT_READ_ONLY", "operator-window-runbook", "Only Java GET read targets may be listed.");
  addMessage(blockers, checks.allowedMiniKvReadsOnly, "MINI_KV_ALLOWED_READS_NOT_READ_ONLY", "operator-window-runbook", "Only mini-kv read commands may be listed.");
  addMessage(blockers, checks.forbiddenOperationsCovered, "FORBIDDEN_OPERATIONS_INCOMPLETE", "operator-window-runbook", "Automatic startup, write actions, and mini-kv admin/write commands must be forbidden.");
  addMessage(blockers, checks.expectedEvidenceCovered, "EXPECTED_EVIDENCE_INCOMPLETE", "operator-window-runbook", "Closed and open window evidence states must both be covered.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "operator-window-runbook", "Node must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "This runbook must not authorize production operations.");
  return blockers;
}

function collectWarnings(
  config: AppConfig,
  runbookState: RealReadAdapterOperatorWindowRunbookProfile["runbookState"],
): RealReadAdapterOperatorWindowRunbookMessage[] {
  return [
    {
      code: runbookState === "ready-for-manual-window"
        ? "OPERATOR_WINDOW_RUNBOOK_READY"
        : "OPERATOR_WINDOW_RUNBOOK_BLOCKED",
      severity: "warning",
      source: "operator-window-runbook",
      message: runbookState === "ready-for-manual-window"
        ? "The runbook is ready for human review; it still does not start upstreams or authorize writes."
        : "The runbook has blockers and must not be used to open a read-only window.",
    },
    {
      code: config.upstreamProbesEnabled
        ? "CURRENT_RUNTIME_PROBES_ENABLED"
        : "CURRENT_RUNTIME_PROBES_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: config.upstreamProbesEnabled
        ? "Current runtime already has probes enabled; verify Java and mini-kv are operator-started before capture."
        : "Current runtime is still closed, which is the expected default outside a manual window.",
    },
  ];
}

function collectRecommendations(
  runbookState: RealReadAdapterOperatorWindowRunbookProfile["runbookState"],
): RealReadAdapterOperatorWindowRunbookMessage[] {
  return [
    {
      code: runbookState === "ready-for-manual-window"
        ? "WAIT_FOR_JAVA_V68_MINI_KV_V77_AFTER_V192"
        : "FIX_OPERATOR_WINDOW_BLOCKERS",
      severity: "recommendation",
      source: "operator-window-runbook",
      message: runbookState === "ready-for-manual-window"
        ? "After v192, follow the plan by letting Java v68 and mini-kv v77 add failure classification evidence before Node v193."
        : "Fix the runbook blockers before continuing to failure taxonomy.",
    },
  ];
}

function addMessage(
  messages: RealReadAdapterOperatorWindowRunbookMessage[],
  condition: boolean,
  code: string,
  source: RealReadAdapterOperatorWindowRunbookMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderStep(step: OperatorWindowStep): string[] {
  return [
    `### Step ${step.order}: ${step.phase}`,
    "",
    `- Owner: ${step.owner}`,
    `- Action: ${step.action}`,
    `- Expected evidence: ${step.expectedEvidence}`,
    `- Read only: ${step.readOnly}`,
    `- Mutates state: ${step.mutatesState}`,
    "",
  ];
}

function renderAllowedRead(target: AllowedReadTarget): string[] {
  return [
    `- ${target.project}: ${target.target}`,
    `  - Protocol: ${target.protocol}`,
    `  - Mutates state: ${target.mutatesState}`,
    `  - Purpose: ${target.purpose}`,
  ];
}

function renderExpectedEvidence(item: ExpectedEvidenceItem): string[] {
  return [
    `- ${item.id}: ${item.sourceEndpoint}`,
    `  - Expected state: ${item.expectedState}`,
    `  - Purpose: ${item.purpose}`,
  ];
}

function renderForbiddenOperation(operation: ForbiddenOperation): string[] {
  return [
    `- ${operation.project}: ${operation.operation}`,
    `  - Reason: ${operation.reason}`,
  ];
}
