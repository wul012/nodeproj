import {
  countPassedReportChecks,
  countReportChecks,
  formatValue,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionLiveProbeRealReadSmokeArchiveAdapter,
} from "./productionLiveProbeRealReadSmokeArchiveAdapter.js";
import type {
  ProductionLiveProbeRealReadSmokeArchiveAdapterProfile,
} from "./productionLiveProbeRealReadSmokeArchiveAdapter.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeRealReadSmokeExecutionRequestProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-execution-request.v1";
  requestState: "blocked" | "draft-review" | "window-open-read-only";
  readyForOperatorReview: boolean;
  readyForExecutionWindow: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  request: {
    requestDigest: string;
    sourceArchiveAdapterDigest: string;
    sourceArchiveAdapterMode: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile["adapter"]["adapterMode"];
    sourceReadinessSwitchDigest: string;
    currentUpstreamProbesEnabled: boolean;
    currentUpstreamActionsEnabled: boolean;
    requiredUpstreamProbesEnabled: true;
    requiredUpstreamActionsEnabled: false;
    javaManualStartRequired: true;
    miniKvManualStartRequired: true;
    startsJavaAutomatically: false;
    startsMiniKvAutomatically: false;
    mutatesUpstreamState: false;
  };
  requiredEnvironment: {
    UPSTREAM_PROBES_ENABLED: "true";
    UPSTREAM_ACTIONS_ENABLED: "false";
    ORDER_PLATFORM_URL: string;
    MINIKV_HOST: string;
    MINIKV_PORT: string;
  };
  currentEnvironment: {
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    orderPlatformUrl: string;
    miniKvEndpoint: string;
  };
  allowedReadOnlyProbes: ProductionLiveProbeExecutionProbe[];
  forbiddenActions: ProductionLiveProbeForbiddenAction[];
  operatorCommandProfile: ProductionLiveProbeOperatorCommandStep[];
  checks: {
    sourceArchiveAdapterReady: boolean;
    sourceArchiveAdapterDigestValid: boolean;
    upstreamActionsStillDisabled: boolean;
    probeWindowExplicitlyOpen: boolean;
    manualJavaStartRequired: boolean;
    manualMiniKvStartRequired: boolean;
    startsNoUpstreamsAutomatically: boolean;
    forbidsWriteActions: boolean;
    readyForOperatorReview: boolean;
    readyForExecutionWindow: boolean;
  };
  summary: {
    allowedProbeCount: number;
    forbiddenActionCount: number;
    commandStepCount: number;
    manualCommandStepCount: number;
    nodeCommandStepCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeExecutionRequestMessage[];
  warnings: ProductionLiveProbeExecutionRequestMessage[];
  recommendations: ProductionLiveProbeExecutionRequestMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeExecutionRequestJson: string;
    productionLiveProbeRealReadSmokeExecutionRequestMarkdown: string;
    productionLiveProbeRealReadSmokeArchiveAdapterJson: string;
    productionLiveProbeSmokeHarnessJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeExecutionProbe {
  id:
    | "java-actuator-health"
    | "java-ops-overview"
    | "mini-kv-health"
    | "mini-kv-infojson"
    | "mini-kv-statsjson";
  target: string;
  protocol: "http-get" | "tcp-inline-command";
  readOnly: true;
  mutatesState: false;
}

export interface ProductionLiveProbeForbiddenAction {
  id:
    | "java-replay-post"
    | "java-order-mutation-post"
    | "mini-kv-set"
    | "mini-kv-delete"
    | "mini-kv-flush"
    | "upstream-actions-enabled";
  reason: string;
}

export interface ProductionLiveProbeOperatorCommandStep {
  id:
    | "review-source-adapter"
    | "start-java-manually"
    | "start-mini-kv-manually"
    | "set-read-only-probe-env"
    | "run-node-smoke-harness"
    | "capture-archive-adapter";
  owner: "node" | "operator";
  commandKind: "review" | "manual-start" | "environment" | "http-get";
  status: "ready" | "manual-required" | "blocked";
  command: string;
  evidence: string;
  note: string;
}

export interface ProductionLiveProbeExecutionRequestMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "execution-request" | "archive-adapter" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeExecutionRequestJson: "/api/v1/production/live-probe-real-read-smoke-execution-request",
  productionLiveProbeRealReadSmokeExecutionRequestMarkdown: "/api/v1/production/live-probe-real-read-smoke-execution-request?format=markdown",
  productionLiveProbeRealReadSmokeArchiveAdapterJson: "/api/v1/production/live-probe-real-read-smoke-archive-adapter",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
});

export async function loadProductionLiveProbeRealReadSmokeExecutionRequest(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeExecutionRequestProfile> {
  const sourceAdapter = await loadProductionLiveProbeRealReadSmokeArchiveAdapter({
    ...input,
    config: {
      ...input.config,
      upstreamProbesEnabled: false,
    },
  });
  const allowedReadOnlyProbes = createAllowedReadOnlyProbes(input.config);
  const forbiddenActions = createForbiddenActions();
  const checks = {
    sourceArchiveAdapterReady: sourceAdapter.readyForArchiveAdapter,
    sourceArchiveAdapterDigestValid: /^[a-f0-9]{64}$/.test(sourceAdapter.adapter.adapterDigest),
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    probeWindowExplicitlyOpen: input.config.upstreamProbesEnabled === true,
    manualJavaStartRequired: true,
    manualMiniKvStartRequired: true,
    startsNoUpstreamsAutomatically: true,
    forbidsWriteActions: forbiddenActions.length === 6,
    readyForOperatorReview: false,
    readyForExecutionWindow: false,
  };
  checks.readyForOperatorReview = checks.sourceArchiveAdapterReady
    && checks.sourceArchiveAdapterDigestValid
    && checks.upstreamActionsStillDisabled
    && checks.startsNoUpstreamsAutomatically
    && checks.forbidsWriteActions;
  checks.readyForExecutionWindow = checks.readyForOperatorReview
    && checks.probeWindowExplicitlyOpen
    && input.config.upstreamActionsEnabled === false;
  const productionBlockers = collectProductionBlockers(checks);
  const requestState = productionBlockers.length > 0
    ? "blocked"
    : checks.readyForExecutionWindow
      ? "window-open-read-only"
      : "draft-review";
  const operatorCommandProfile = createOperatorCommandProfile(input.config, sourceAdapter, checks);
  const requestDigest = digestRequest({
    profileVersion: "production-live-probe-real-read-smoke-execution-request.v1",
    sourceArchiveAdapterDigest: sourceAdapter.adapter.adapterDigest,
    sourceArchiveAdapterMode: sourceAdapter.adapter.adapterMode,
    sourceReadinessSwitchDigest: sourceAdapter.adapter.readinessSwitchDigest,
    currentUpstreamProbesEnabled: input.config.upstreamProbesEnabled,
    currentUpstreamActionsEnabled: input.config.upstreamActionsEnabled,
    requiredUpstreamProbesEnabled: true,
    requiredUpstreamActionsEnabled: false,
    allowedProbeIds: allowedReadOnlyProbes.map((probe) => probe.id),
    forbiddenActionIds: forbiddenActions.map((action) => action.id),
    commandStepStatuses: operatorCommandProfile.map((step) => [step.id, step.status]),
  });
  const warnings = collectWarnings(input.config, requestState, sourceAdapter);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke execution request",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-execution-request.v1",
    requestState,
    readyForOperatorReview: checks.readyForOperatorReview,
    readyForExecutionWindow: checks.readyForExecutionWindow,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    request: {
      requestDigest,
      sourceArchiveAdapterDigest: sourceAdapter.adapter.adapterDigest,
      sourceArchiveAdapterMode: sourceAdapter.adapter.adapterMode,
      sourceReadinessSwitchDigest: sourceAdapter.adapter.readinessSwitchDigest,
      currentUpstreamProbesEnabled: input.config.upstreamProbesEnabled,
      currentUpstreamActionsEnabled: input.config.upstreamActionsEnabled,
      requiredUpstreamProbesEnabled: true,
      requiredUpstreamActionsEnabled: false,
      javaManualStartRequired: true,
      miniKvManualStartRequired: true,
      startsJavaAutomatically: false,
      startsMiniKvAutomatically: false,
      mutatesUpstreamState: false,
    },
    requiredEnvironment: {
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "false",
      ORDER_PLATFORM_URL: input.config.orderPlatformUrl,
      MINIKV_HOST: input.config.miniKvHost,
      MINIKV_PORT: String(input.config.miniKvPort),
    },
    currentEnvironment: {
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      orderPlatformUrl: input.config.orderPlatformUrl,
      miniKvEndpoint: `${input.config.miniKvHost}:${input.config.miniKvPort}`,
    },
    allowedReadOnlyProbes,
    forbiddenActions,
    operatorCommandProfile,
    checks,
    summary: {
      allowedProbeCount: allowedReadOnlyProbes.length,
      forbiddenActionCount: forbiddenActions.length,
      commandStepCount: operatorCommandProfile.length,
      manualCommandStepCount: operatorCommandProfile.filter((step) => step.owner === "operator").length,
      nodeCommandStepCount: operatorCommandProfile.filter((step) => step.owner === "node").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Review this execution request before starting a real read-only smoke window.",
      "Start Java and mini-kv manually only for the explicit smoke window; Node does not manage their lifecycle.",
      "Run the smoke harness and archive adapter after UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false are confirmed.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeExecutionRequestMarkdown(
  profile: ProductionLiveProbeRealReadSmokeExecutionRequestProfile,
): string {
  return [
    "# Production live probe real-read smoke execution request",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Request state: ${profile.requestState}`,
    `- Ready for operator review: ${profile.readyForOperatorReview}`,
    `- Ready for execution window: ${profile.readyForExecutionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Request",
    "",
    ...renderEntries(profile.request),
    "",
    "## Required Environment",
    "",
    ...renderEntries(profile.requiredEnvironment),
    "",
    "## Current Environment",
    "",
    ...renderEntries(profile.currentEnvironment),
    "",
    "## Allowed Read-Only Probes",
    "",
    ...profile.allowedReadOnlyProbes.map(renderProbe),
    "",
    "## Forbidden Actions",
    "",
    ...profile.forbiddenActions.map(renderForbiddenAction),
    "",
    "## Operator Command Profile",
    "",
    ...profile.operatorCommandProfile.flatMap(renderCommandStep),
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
    ...renderMessages(profile.productionBlockers, "No real-read smoke execution request blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read smoke execution request warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read smoke execution request recommendations."),
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

function createAllowedReadOnlyProbes(config: AppConfig): ProductionLiveProbeExecutionProbe[] {
  return [
    {
      id: "java-actuator-health",
      target: `${config.orderPlatformUrl}/actuator/health`,
      protocol: "http-get",
      readOnly: true,
      mutatesState: false,
    },
    {
      id: "java-ops-overview",
      target: `${config.orderPlatformUrl}/api/v1/ops/overview`,
      protocol: "http-get",
      readOnly: true,
      mutatesState: false,
    },
    {
      id: "mini-kv-health",
      target: "HEALTH",
      protocol: "tcp-inline-command",
      readOnly: true,
      mutatesState: false,
    },
    {
      id: "mini-kv-infojson",
      target: "INFOJSON",
      protocol: "tcp-inline-command",
      readOnly: true,
      mutatesState: false,
    },
    {
      id: "mini-kv-statsjson",
      target: "STATSJSON",
      protocol: "tcp-inline-command",
      readOnly: true,
      mutatesState: false,
    },
  ];
}

function createForbiddenActions(): ProductionLiveProbeForbiddenAction[] {
  return [
    {
      id: "java-replay-post",
      reason: "Real-read smoke may not execute Java replay or compensation endpoints.",
    },
    {
      id: "java-order-mutation-post",
      reason: "Real-read smoke may not create, update, cancel, or repair orders.",
    },
    {
      id: "mini-kv-set",
      reason: "Real-read smoke may not write keys to mini-kv.",
    },
    {
      id: "mini-kv-delete",
      reason: "Real-read smoke may not delete or expire keys in mini-kv.",
    },
    {
      id: "mini-kv-flush",
      reason: "Real-read smoke may not clear mini-kv state.",
    },
    {
      id: "upstream-actions-enabled",
      reason: "UPSTREAM_ACTIONS_ENABLED must remain false for this request.",
    },
  ];
}

function createOperatorCommandProfile(
  config: AppConfig,
  sourceAdapter: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile,
  checks: ProductionLiveProbeRealReadSmokeExecutionRequestProfile["checks"],
): ProductionLiveProbeOperatorCommandStep[] {
  return [
    {
      id: "review-source-adapter",
      owner: "node",
      commandKind: "review",
      status: checks.sourceArchiveAdapterReady ? "ready" : "blocked",
      command: "GET /api/v1/production/live-probe-real-read-smoke-archive-adapter",
      evidence: sourceAdapter.adapter.adapterDigest,
      note: "Review the v143 adapter digest before opening a real smoke window.",
    },
    {
      id: "start-java-manually",
      owner: "operator",
      commandKind: "manual-start",
      status: "manual-required",
      command: "Start the Java order platform in its own workspace.",
      evidence: config.orderPlatformUrl,
      note: "Node does not start Java automatically.",
    },
    {
      id: "start-mini-kv-manually",
      owner: "operator",
      commandKind: "manual-start",
      status: "manual-required",
      command: "Start mini-kv in its own workspace.",
      evidence: `${config.miniKvHost}:${config.miniKvPort}`,
      note: "Node does not start mini-kv automatically.",
    },
    {
      id: "set-read-only-probe-env",
      owner: "operator",
      commandKind: "environment",
      status: config.upstreamActionsEnabled ? "blocked" : "manual-required",
      command: "Set UPSTREAM_PROBES_ENABLED=true and keep UPSTREAM_ACTIONS_ENABLED=false before running Node smoke.",
      evidence: `current UPSTREAM_PROBES_ENABLED=${config.upstreamProbesEnabled}, UPSTREAM_ACTIONS_ENABLED=${config.upstreamActionsEnabled}`,
      note: "This opens only the read-only probe window; it does not permit writes.",
    },
    {
      id: "run-node-smoke-harness",
      owner: "node",
      commandKind: "http-get",
      status: checks.readyForExecutionWindow ? "ready" : "manual-required",
      command: "GET /api/v1/production/live-probe-smoke-harness",
      evidence: ENDPOINTS.productionLiveProbeSmokeHarnessJson,
      note: "Run after both upstreams are intentionally started and the read-only window is open.",
    },
    {
      id: "capture-archive-adapter",
      owner: "node",
      commandKind: "http-get",
      status: checks.readyForExecutionWindow ? "ready" : "manual-required",
      command: "GET /api/v1/production/live-probe-real-read-smoke-archive-adapter",
      evidence: ENDPOINTS.productionLiveProbeRealReadSmokeArchiveAdapterJson,
      note: "Capture pass or skipped smoke output as release evidence.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeExecutionRequestProfile["checks"],
): ProductionLiveProbeExecutionRequestMessage[] {
  const blockers: ProductionLiveProbeExecutionRequestMessage[] = [];
  addMessage(blockers, checks.sourceArchiveAdapterReady, "SOURCE_ARCHIVE_ADAPTER_NOT_READY", "archive-adapter", "v143 archive adapter must be ready before creating a real-read smoke execution request.");
  addMessage(blockers, checks.sourceArchiveAdapterDigestValid, "SOURCE_ARCHIVE_ADAPTER_DIGEST_INVALID", "archive-adapter", "Source archive adapter digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.startsNoUpstreamsAutomatically, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "execution-request", "The execution request must not start Java or mini-kv automatically.");
  addMessage(blockers, checks.forbidsWriteActions, "WRITE_ACTION_FORBIDDEN_LIST_INCOMPLETE", "execution-request", "Execution request must explicitly forbid Java and mini-kv write actions.");
  return blockers;
}

function collectWarnings(
  config: AppConfig,
  requestState: ProductionLiveProbeRealReadSmokeExecutionRequestProfile["requestState"],
  sourceAdapter: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile,
): ProductionLiveProbeExecutionRequestMessage[] {
  return [
    {
      code: requestState === "window-open-read-only"
        ? "READ_ONLY_PROBE_WINDOW_OPEN"
        : "EXECUTION_REQUEST_DRAFT_ONLY",
      severity: "warning",
      source: "execution-request",
      message: requestState === "window-open-read-only"
        ? "UPSTREAM_PROBES_ENABLED=true; confirm Java and mini-kv were intentionally started before running smoke."
        : "This is an execution request draft; Java and mini-kv still require manual startup and probe window opening.",
    },
    {
      code: sourceAdapter.adapter.adapterMode === "pass"
        ? "SOURCE_ADAPTER_ALREADY_PASS"
        : "SOURCE_ADAPTER_SKIPPED_REFERENCE",
      severity: "warning",
      source: "archive-adapter",
      message: sourceAdapter.adapter.adapterMode === "pass"
        ? "Source adapter already contains pass evidence, but production operations remain gated."
        : "Source adapter is skipped evidence and is used only as the planning baseline.",
    },
    {
      code: config.upstreamActionsEnabled ? "WRITE_ACTIONS_OPEN" : "WRITE_ACTIONS_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: config.upstreamActionsEnabled
        ? "UPSTREAM_ACTIONS_ENABLED=true blocks this request."
        : "UPSTREAM_ACTIONS_ENABLED=false preserves the read-only boundary.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeExecutionRequestMessage[] {
  return [
    {
      code: "ADD_REAL_READ_SMOKE_RESULT_IMPORTER_NEXT",
      severity: "recommendation",
      source: "execution-request",
      message: "Add a result importer next so real smoke output can be normalized before the release evidence gate.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeExecutionRequestMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeExecutionRequestMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestRequest(value: unknown): string {
  return sha256StableJson(value);
}

function renderProbe(probe: ProductionLiveProbeExecutionProbe): string {
  return `- ${probe.id}: target=${probe.target}, protocol=${probe.protocol}, readOnly=${probe.readOnly}, mutatesState=${probe.mutatesState}`;
}

function renderForbiddenAction(action: ProductionLiveProbeForbiddenAction): string {
  return `- ${action.id}: ${action.reason}`;
}

function renderCommandStep(step: ProductionLiveProbeOperatorCommandStep): string[] {
  return [
    `### ${step.id}`,
    "",
    `- Owner: ${step.owner}`,
    `- Command kind: ${step.commandKind}`,
    `- Status: ${step.status}`,
    `- Command: ${step.command}`,
    `- Evidence: ${step.evidence}`,
    `- Note: ${step.note}`,
    "",
  ];
}


