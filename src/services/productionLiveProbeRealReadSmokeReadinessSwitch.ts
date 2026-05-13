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
  loadProductionLiveProbeHandoffChecklist,
} from "./productionLiveProbeHandoffChecklist.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeRealReadSmokeReadinessSwitchProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-readiness-switch.v1";
  switchState: "blocked" | "closed-skipped-evidence" | "open-read-only-window";
  readyForSwitchReview: boolean;
  readyForRealReadSmoke: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  switch: {
    switchDigest: string;
    handoffProfileVersion: "production-live-probe-handoff-checklist.v1";
    bundleDigest: string;
    liveProbeEvidenceMode: "pass" | "skipped" | "mixed";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    javaManualStartRequired: boolean;
    miniKvManualStartRequired: boolean;
    realReadSmokeRequiresExplicitWindow: boolean;
    skippedEvidenceNotProductionPass: boolean;
  };
  checks: {
    handoffChecklistReady: boolean;
    archiveBundleReady: boolean;
    upstreamActionsStillDisabled: boolean;
    probeWindowExplicitlyOpen: boolean;
    noWriteProbeAllowed: boolean;
    skippedEvidenceNotProductionPass: boolean;
    manualJavaStartRequired: boolean;
    manualMiniKvStartRequired: boolean;
    readyForSwitchReview: boolean;
    readyForRealReadSmoke: boolean;
  };
  gates: ProductionLiveProbeRealReadSmokeSwitchGate[];
  summary: {
    gateCount: number;
    doneGateCount: number;
    manualRequiredGateCount: number;
    blockedGateCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeRealReadSmokeSwitchMessage[];
  warnings: ProductionLiveProbeRealReadSmokeSwitchMessage[];
  recommendations: ProductionLiveProbeRealReadSmokeSwitchMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReadinessSwitchJson: string;
    productionLiveProbeRealReadSmokeReadinessSwitchMarkdown: string;
    productionLiveProbeHandoffChecklistJson: string;
    productionLiveProbeSmokeHarnessJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeRealReadSmokeSwitchGate {
  id:
    | "handoff-checklist-ready"
    | "upstream-actions-disabled"
    | "operator-start-java"
    | "operator-start-mini-kv"
    | "open-read-only-probe-window"
    | "run-real-read-smoke";
  owner: "node" | "operator";
  status: "done" | "manual-required" | "blocked";
  title: string;
  evidence: string;
  note: string;
}

export interface ProductionLiveProbeRealReadSmokeSwitchMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "readiness-switch" | "live-probe-handoff" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeReadinessSwitchJson: "/api/v1/production/live-probe-real-read-smoke-readiness-switch",
  productionLiveProbeRealReadSmokeReadinessSwitchMarkdown: "/api/v1/production/live-probe-real-read-smoke-readiness-switch?format=markdown",
  productionLiveProbeHandoffChecklistJson: "/api/v1/production/live-probe-handoff-checklist",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
});

export async function loadProductionLiveProbeRealReadSmokeReadinessSwitch(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadinessSwitchProfile> {
  const handoff = await loadProductionLiveProbeHandoffChecklist(input);
  const checks = {
    handoffChecklistReady: handoff.readyForOperatorHandoff,
    archiveBundleReady: handoff.checks.archiveBundleReady,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
      && handoff.checks.upstreamActionsStillDisabled,
    probeWindowExplicitlyOpen: input.config.upstreamProbesEnabled === true,
    noWriteProbeAllowed: handoff.checks.noWriteProbeAttempted
      && input.config.upstreamActionsEnabled === false,
    skippedEvidenceNotProductionPass: handoff.checks.skippedEvidenceNotProductionPass,
    manualJavaStartRequired: handoff.handoff.requiresJavaManualStart,
    manualMiniKvStartRequired: handoff.handoff.requiresMiniKvManualStart,
    readyForSwitchReview: false,
    readyForRealReadSmoke: false,
  };
  checks.readyForSwitchReview = checks.handoffChecklistReady
    && checks.archiveBundleReady
    && checks.upstreamActionsStillDisabled
    && checks.noWriteProbeAllowed
    && checks.skippedEvidenceNotProductionPass;
  checks.readyForRealReadSmoke = checks.readyForSwitchReview
    && checks.probeWindowExplicitlyOpen
    && input.config.upstreamActionsEnabled === false;
  const gates = createGates(input.config, handoff, checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(checks, handoff.handoff.liveProbeEvidenceMode);
  const recommendations = collectRecommendations();
  const switchDigest = digestSwitch({
    profileVersion: "production-live-probe-real-read-smoke-readiness-switch.v1",
    bundleDigest: handoff.handoff.bundleDigest,
    liveProbeEvidenceMode: handoff.handoff.liveProbeEvidenceMode,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    checks,
    gateStatuses: gates.map((gate) => [gate.id, gate.status]),
  });
  const switchState = productionBlockers.length > 0
    ? "blocked"
    : checks.readyForRealReadSmoke
      ? "open-read-only-window"
      : "closed-skipped-evidence";

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke readiness switch",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-readiness-switch.v1",
    switchState,
    readyForSwitchReview: checks.readyForSwitchReview,
    readyForRealReadSmoke: checks.readyForRealReadSmoke,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    switch: {
      switchDigest,
      handoffProfileVersion: handoff.profileVersion,
      bundleDigest: handoff.handoff.bundleDigest,
      liveProbeEvidenceMode: handoff.handoff.liveProbeEvidenceMode,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      javaManualStartRequired: handoff.handoff.requiresJavaManualStart,
      miniKvManualStartRequired: handoff.handoff.requiresMiniKvManualStart,
      realReadSmokeRequiresExplicitWindow: input.config.upstreamProbesEnabled === false,
      skippedEvidenceNotProductionPass: handoff.handoff.skippedEvidenceNotProductionPass,
    },
    checks,
    gates,
    summary: {
      gateCount: gates.length,
      doneGateCount: gates.filter((gate) => gate.status === "done").length,
      manualRequiredGateCount: gates.filter((gate) => gate.status === "manual-required").length,
      blockedGateCount: gates.filter((gate) => gate.status === "blocked").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this switch report before opening any real read-only smoke window.",
      "Keep Java and mini-kv startup as an explicit operator action, not an automatic Node side effect.",
      "Archive pass or skipped real-read smoke evidence through the adapter added after this switch.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeReadinessSwitchMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadinessSwitchProfile,
): string {
  return [
    "# Production live probe real-read smoke readiness switch",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Switch state: ${profile.switchState}`,
    `- Ready for switch review: ${profile.readyForSwitchReview}`,
    `- Ready for real read smoke: ${profile.readyForRealReadSmoke}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Switch",
    "",
    ...renderEntries(profile.switch),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Gates",
    "",
    ...profile.gates.flatMap(renderGate),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read smoke readiness switch blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read smoke readiness switch warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read smoke readiness switch recommendations."),
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

function createGates(
  config: AppConfig,
  handoff: Awaited<ReturnType<typeof loadProductionLiveProbeHandoffChecklist>>,
  checks: ProductionLiveProbeRealReadSmokeReadinessSwitchProfile["checks"],
): ProductionLiveProbeRealReadSmokeSwitchGate[] {
  return [
    {
      id: "handoff-checklist-ready",
      owner: "node",
      status: checks.handoffChecklistReady ? "done" : "blocked",
      title: "Confirm v141 handoff checklist is ready",
      evidence: handoff.handoff.bundleDigest,
      note: "The switch only opens after the operator-facing handoff has no blockers.",
    },
    {
      id: "upstream-actions-disabled",
      owner: "node",
      status: checks.upstreamActionsStillDisabled ? "done" : "blocked",
      title: "Keep upstream write actions disabled",
      evidence: `UPSTREAM_ACTIONS_ENABLED=${config.upstreamActionsEnabled}`,
      note: "Real-read smoke may read upstreams, but this switch never authorizes writes.",
    },
    {
      id: "operator-start-java",
      owner: "operator",
      status: handoff.handoff.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
      title: "Start Java order platform intentionally",
      evidence: config.orderPlatformUrl,
      note: "Node will not start Java; the operator owns the probe window.",
    },
    {
      id: "operator-start-mini-kv",
      owner: "operator",
      status: handoff.handoff.liveProbeEvidenceMode === "pass" ? "done" : "manual-required",
      title: "Start mini-kv intentionally",
      evidence: `${config.miniKvHost}:${config.miniKvPort}`,
      note: "Node will not start mini-kv; only HEALTH, INFOJSON, and STATSJSON are allowed.",
    },
    {
      id: "open-read-only-probe-window",
      owner: "operator",
      status: config.upstreamProbesEnabled ? "done" : "manual-required",
      title: "Open the explicit read-only probe window",
      evidence: `UPSTREAM_PROBES_ENABLED=${config.upstreamProbesEnabled}`,
      note: "The default closed state preserves skipped evidence without touching upstreams.",
    },
    {
      id: "run-real-read-smoke",
      owner: "node",
      status: checks.readyForRealReadSmoke ? "done" : "manual-required",
      title: "Run the existing live probe smoke harness",
      evidence: ENDPOINTS.productionLiveProbeSmokeHarnessJson,
      note: checks.readyForRealReadSmoke
        ? "The read-only smoke window is open; use the smoke harness for evidence."
        : "Smoke remains skipped until the explicit read-only window is open.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeReadinessSwitchProfile["checks"],
): ProductionLiveProbeRealReadSmokeSwitchMessage[] {
  const blockers: ProductionLiveProbeRealReadSmokeSwitchMessage[] = [];
  addMessage(blockers, checks.handoffChecklistReady, "HANDOFF_CHECKLIST_NOT_READY", "live-probe-handoff", "v141 handoff checklist must be ready before the switch can be reviewed.");
  addMessage(blockers, checks.archiveBundleReady, "LIVE_PROBE_ARCHIVE_BUNDLE_NOT_READY", "live-probe-handoff", "Archive bundle must be ready before opening a real-read smoke window.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noWriteProbeAllowed, "WRITE_PROBE_NOT_ALLOWED", "readiness-switch", "The readiness switch must remain read-only and must not authorize write probes.");
  addMessage(blockers, checks.skippedEvidenceNotProductionPass, "SKIPPED_EVIDENCE_MARKED_PRODUCTION_PASS", "readiness-switch", "Skipped evidence must not be promoted as production pass evidence.");
  return blockers;
}

function collectWarnings(
  checks: ProductionLiveProbeRealReadSmokeReadinessSwitchProfile["checks"],
  mode: ProductionLiveProbeRealReadSmokeReadinessSwitchProfile["switch"]["liveProbeEvidenceMode"],
): ProductionLiveProbeRealReadSmokeSwitchMessage[] {
  return [
    {
      code: checks.probeWindowExplicitlyOpen ? "REAL_READ_SMOKE_WINDOW_OPEN" : "REAL_READ_SMOKE_SWITCH_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: checks.probeWindowExplicitlyOpen
        ? "UPSTREAM_PROBES_ENABLED=true; verify Java and mini-kv were intentionally started before running smoke."
        : "UPSTREAM_PROBES_ENABLED=false; real-read smoke remains closed and will produce skipped evidence.",
    },
    {
      code: mode === "pass" ? "PASS_EVIDENCE_PRESENT_STILL_GATED" : "SKIPPED_EVIDENCE_NOT_PRODUCTION_PASS",
      severity: "warning",
      source: "readiness-switch",
      message: mode === "pass"
        ? "Read-only pass evidence is present, but production operations remain gated."
        : "Current switch review is based on skipped evidence, not production pass evidence.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeRealReadSmokeSwitchMessage[] {
  return [
    {
      code: "ADD_REAL_READ_SMOKE_ARCHIVE_ADAPTER_NEXT",
      severity: "recommendation",
      source: "readiness-switch",
      message: "Add an archive adapter next so pass or skipped smoke output is normalized into release evidence.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeRealReadSmokeSwitchMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeRealReadSmokeSwitchMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestSwitch(value: unknown): string {
  return sha256StableJson(value);
}

function renderGate(gate: ProductionLiveProbeRealReadSmokeSwitchGate): string[] {
  return [
    `### ${gate.id}`,
    "",
    `- Owner: ${gate.owner}`,
    `- Status: ${gate.status}`,
    `- Title: ${gate.title}`,
    `- Evidence: ${gate.evidence}`,
    `- Note: ${gate.note}`,
    "",
  ];
}


