import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionLiveProbeEvidenceArchiveBundle,
} from "./productionLiveProbeEvidenceArchiveBundle.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeHandoffChecklistProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-handoff-checklist.v1";
  readyForOperatorHandoff: boolean;
  readyForRealReadSmoke: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  handoff: {
    bundleDigest: string;
    bundleProfileVersion: "production-live-probe-evidence-archive-bundle.v1";
    liveProbeEvidenceMode: "pass" | "skipped" | "mixed";
    plannedProbeCount: number;
    skippedProbeCount: number;
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    requiresJavaManualStart: boolean;
    requiresMiniKvManualStart: boolean;
    skippedEvidenceNotProductionPass: boolean;
  };
  checks: {
    archiveBundleReady: boolean;
    sourceEvidenceFilesReady: boolean;
    noWriteProbeAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    skippedEvidenceNotProductionPass: boolean;
    realReadSmokeRequiresManualWindow: boolean;
    readyForOperatorHandoff: boolean;
    readyForRealReadSmoke: boolean;
  };
  checklist: ProductionLiveProbeHandoffStep[];
  summary: {
    stepCount: number;
    doneStepCount: number;
    manualRequiredStepCount: number;
    blockedStepCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeHandoffMessage[];
  warnings: ProductionLiveProbeHandoffMessage[];
  recommendations: ProductionLiveProbeHandoffMessage[];
  evidenceEndpoints: {
    productionLiveProbeHandoffChecklistJson: string;
    productionLiveProbeHandoffChecklistMarkdown: string;
    productionLiveProbeEvidenceArchiveBundleJson: string;
    productionLiveProbeEvidenceArchiveVerificationJson: string;
    productionLiveProbeEvidenceArchiveJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeHandoffStep {
  id:
    | "archive-bundle-ready"
    | "confirm-read-only-scope"
    | "manual-start-java"
    | "manual-start-mini-kv"
    | "enable-probe-window"
    | "run-real-read-smoke"
    | "archive-real-read-result";
  owner: "node" | "operator";
  status: "done" | "manual-required" | "blocked";
  title: string;
  evidence: string;
  note: string;
}

export interface ProductionLiveProbeHandoffMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "live-probe-handoff"
    | "live-probe-archive-bundle"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeHandoffChecklistJson: "/api/v1/production/live-probe-handoff-checklist",
  productionLiveProbeHandoffChecklistMarkdown: "/api/v1/production/live-probe-handoff-checklist?format=markdown",
  productionLiveProbeEvidenceArchiveBundleJson: "/api/v1/production/live-probe-evidence-archive/bundle",
  productionLiveProbeEvidenceArchiveVerificationJson: "/api/v1/production/live-probe-evidence-archive/verification",
  productionLiveProbeEvidenceArchiveJson: "/api/v1/production/live-probe-evidence-archive",
});

export async function loadProductionLiveProbeHandoffChecklist(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeHandoffChecklistProfile> {
  const bundle = await loadProductionLiveProbeEvidenceArchiveBundle(input);
  const checks = {
    archiveBundleReady: bundle.readyForArchiveBundle,
    sourceEvidenceFilesReady: bundle.checks.sourceArtifactFilesExist,
    noWriteProbeAttempted: bundle.checks.noWriteProbeAttempted,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
      && bundle.checks.upstreamActionsStillDisabled,
    skippedEvidenceNotProductionPass: bundle.checks.skippedEvidenceNotProductionPass,
    realReadSmokeRequiresManualWindow: input.config.upstreamProbesEnabled === false,
    readyForOperatorHandoff: false,
    readyForRealReadSmoke: false,
  };
  checks.readyForOperatorHandoff = checks.archiveBundleReady
    && checks.sourceEvidenceFilesReady
    && checks.noWriteProbeAttempted
    && checks.upstreamActionsStillDisabled
    && checks.skippedEvidenceNotProductionPass;
  checks.readyForRealReadSmoke = checks.readyForOperatorHandoff
    && input.config.upstreamProbesEnabled === true
    && input.config.upstreamActionsEnabled === false;
  const checklist = createChecklist(input.config, bundle, checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(bundle.bundle.liveProbeEvidenceMode, input.config.upstreamProbesEnabled);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production live probe operator handoff checklist",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-handoff-checklist.v1",
    readyForOperatorHandoff: checks.readyForOperatorHandoff,
    readyForRealReadSmoke: checks.readyForRealReadSmoke,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    handoff: {
      bundleDigest: bundle.bundle.bundleDigest,
      bundleProfileVersion: bundle.profileVersion,
      liveProbeEvidenceMode: bundle.bundle.liveProbeEvidenceMode,
      plannedProbeCount: bundle.bundle.plannedProbeCount,
      skippedProbeCount: bundle.bundle.skippedProbeCount,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      requiresJavaManualStart: bundle.bundle.liveProbeEvidenceMode !== "pass",
      requiresMiniKvManualStart: bundle.bundle.liveProbeEvidenceMode !== "pass",
      skippedEvidenceNotProductionPass: bundle.bundle.skippedEvidenceNotProductionPass,
    },
    checks,
    checklist,
    summary: {
      stepCount: checklist.length,
      doneStepCount: checklist.filter((step) => step.status === "done").length,
      manualRequiredStepCount: checklist.filter((step) => step.status === "manual-required").length,
      blockedStepCount: checklist.filter((step) => step.status === "blocked").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this checklist as the operator-facing handoff from skipped archive evidence to a real read-only smoke window.",
      "Only run real read-only smoke after Java and mini-kv are intentionally started by the operator.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false; this checklist never authorizes write actions.",
    ],
  };
}

export function renderProductionLiveProbeHandoffChecklistMarkdown(
  profile: ProductionLiveProbeHandoffChecklistProfile,
): string {
  return [
    "# Production live probe operator handoff checklist",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for operator handoff: ${profile.readyForOperatorHandoff}`,
    `- Ready for real read smoke: ${profile.readyForRealReadSmoke}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Handoff",
    "",
    ...renderEntries(profile.handoff),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Checklist",
    "",
    ...profile.checklist.flatMap(renderStep),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No live probe handoff blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No live probe handoff warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No live probe handoff recommendations."),
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

function createChecklist(
  config: AppConfig,
  bundle: Awaited<ReturnType<typeof loadProductionLiveProbeEvidenceArchiveBundle>>,
  checks: ProductionLiveProbeHandoffChecklistProfile["checks"],
): ProductionLiveProbeHandoffStep[] {
  return [
    {
      id: "archive-bundle-ready",
      owner: "node",
      status: checks.archiveBundleReady ? "done" : "blocked",
      title: "Confirm live probe evidence archive bundle is ready",
      evidence: bundle.bundle.bundleDigest,
      note: checks.archiveBundleReady
        ? "v140 bundle is available as the handoff source artifact."
        : "Bundle must be fixed before operator handoff.",
    },
    {
      id: "confirm-read-only-scope",
      owner: "node",
      status: checks.noWriteProbeAttempted && checks.upstreamActionsStillDisabled ? "done" : "blocked",
      title: "Confirm live probe scope is read-only",
      evidence: "UPSTREAM_ACTIONS_ENABLED=false",
      note: "Allowed probes remain Java GET health/ops overview and mini-kv HEALTH/INFOJSON/STATSJSON.",
    },
    {
      id: "manual-start-java",
      owner: "operator",
      status: bundle.bundle.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
      title: "Start Java order platform for real read-only smoke",
      evidence: config.orderPlatformUrl,
      note: "Node does not start Java automatically; operator should start it only for an explicit read-only probe window.",
    },
    {
      id: "manual-start-mini-kv",
      owner: "operator",
      status: bundle.bundle.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
      title: "Start mini-kv for real read-only smoke",
      evidence: `${config.miniKvHost}:${config.miniKvPort}`,
      note: "Node does not start mini-kv automatically; only read commands are allowed during the probe window.",
    },
    {
      id: "enable-probe-window",
      owner: "operator",
      status: config.upstreamProbesEnabled ? "done" : "manual-required",
      title: "Open explicit read-only probe window",
      evidence: `UPSTREAM_PROBES_ENABLED=${config.upstreamProbesEnabled}`,
      note: "Set UPSTREAM_PROBES_ENABLED=true only after both upstreams are intentionally running.",
    },
    {
      id: "run-real-read-smoke",
      owner: "node",
      status: checks.readyForRealReadSmoke ? "done" : "manual-required",
      title: "Run real read-only live probe smoke",
      evidence: "/api/v1/production/live-probe-smoke-harness",
      note: checks.readyForRealReadSmoke
        ? "Node is configured for a real read-only smoke window."
        : "Current handoff remains skipped evidence until the operator opens the probe window.",
    },
    {
      id: "archive-real-read-result",
      owner: "node",
      status: bundle.bundle.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
      title: "Archive the real read-only smoke result",
      evidence: "/api/v1/production/live-probe-evidence-archive",
      note: bundle.bundle.liveProbeEvidenceMode === "pass"
        ? "Pass evidence is archived."
        : "Skipped evidence is archived; it is not production pass evidence.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionLiveProbeHandoffChecklistProfile["checks"],
): ProductionLiveProbeHandoffMessage[] {
  const blockers: ProductionLiveProbeHandoffMessage[] = [];
  addMessage(blockers, checks.archiveBundleReady, "LIVE_PROBE_BUNDLE_NOT_READY", "live-probe-archive-bundle", "Live probe archive bundle must be ready before operator handoff.");
  addMessage(blockers, checks.sourceEvidenceFilesReady, "LIVE_PROBE_SOURCE_FILES_MISSING", "live-probe-archive-bundle", "v138 and v139 source evidence files must exist before handoff.");
  addMessage(blockers, checks.noWriteProbeAttempted, "LIVE_PROBE_WRITE_ATTEMPTED", "live-probe-handoff", "Operator handoff requires no write probe evidence.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.skippedEvidenceNotProductionPass, "SKIPPED_EVIDENCE_MARKED_PRODUCTION_PASS", "live-probe-handoff", "Skipped evidence must not be treated as production pass.");
  return blockers;
}

function collectWarnings(
  mode: ProductionLiveProbeHandoffChecklistProfile["handoff"]["liveProbeEvidenceMode"],
  probesEnabled: boolean,
): ProductionLiveProbeHandoffMessage[] {
  return [
    {
      code: mode === "pass" ? "REAL_READ_SMOKE_ALREADY_PASS" : "HANDOFF_STILL_SKIPPED_EVIDENCE",
      severity: "warning",
      source: "live-probe-handoff",
      message: mode === "pass"
        ? "Archive evidence already contains pass results, but production operations remain gated."
        : "Current handoff is based on skipped evidence; real read-only smoke still requires manual upstream startup.",
    },
    {
      code: probesEnabled ? "PROBE_WINDOW_OPEN" : "PROBE_WINDOW_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: probesEnabled
        ? "UPSTREAM_PROBES_ENABLED=true; confirm Java and mini-kv were intentionally started."
        : "UPSTREAM_PROBES_ENABLED=false; real read-only smoke is intentionally closed.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeHandoffMessage[] {
  return [
    {
      code: "ADD_REAL_READ_SMOKE_SWITCH_NEXT",
      severity: "recommendation",
      source: "live-probe-handoff",
      message: "Add an explicit readiness switch next so operators can see when a real read-only smoke window is allowed.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeHandoffMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeHandoffMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderStep(step: ProductionLiveProbeHandoffStep): string[] {
  return [
    `### ${step.id}`,
    "",
    `- Owner: ${step.owner}`,
    `- Status: ${step.status}`,
    `- Title: ${step.title}`,
    `- Evidence: ${step.evidence}`,
    `- Note: ${step.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionLiveProbeHandoffMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
}

function renderEntries(record: object): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
