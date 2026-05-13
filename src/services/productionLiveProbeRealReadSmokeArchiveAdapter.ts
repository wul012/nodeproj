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
  loadProductionLiveProbeRealReadSmokeReadinessSwitch,
} from "./productionLiveProbeRealReadSmokeReadinessSwitch.js";
import type {
  ProductionLiveProbeRealReadSmokeReadinessSwitchProfile,
} from "./productionLiveProbeRealReadSmokeReadinessSwitch.js";
import {
  loadProductionLiveProbeSmokeHarness,
} from "./productionLiveProbeSmokeHarness.js";
import type {
  ProductionLiveProbeResult,
  ProductionLiveProbeSmokeHarnessProfile,
} from "./productionLiveProbeSmokeHarness.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";

export interface ProductionLiveProbeRealReadSmokeArchiveAdapterProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-archive-adapter.v1";
  readyForArchiveAdapter: boolean;
  readyForProductionPassEvidence: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  adapter: {
    adapterDigest: string;
    adapterMode: "pass" | "skipped" | "mixed";
    readinessSwitchDigest: string;
    readinessSwitchState: ProductionLiveProbeRealReadSmokeReadinessSwitchProfile["switchState"];
    smokeHarnessProfileVersion: "production-live-probe-smoke-harness.v1";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    plannedProbeCount: number;
    passedProbeCount: number;
    skippedProbeCount: number;
    blockedProbeCount: number;
    skippedEvidenceNotProductionPass: boolean;
  };
  checks: {
    readinessSwitchReviewReady: boolean;
    smokeHarnessReady: boolean;
    allProbeResultsRecorded: boolean;
    noBlockedProbeResults: boolean;
    noWriteProbeAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    skippedEvidenceNotProductionPass: boolean;
    passEvidenceRequiresEnabledProbes: boolean;
    readyForArchiveAdapter: boolean;
    readyForProductionPassEvidence: boolean;
  };
  records: ProductionLiveProbeRealReadSmokeArchiveRecord[];
  summary: {
    recordCount: number;
    passRecordCount: number;
    skippedRecordCount: number;
    blockedRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeRealReadSmokeArchiveMessage[];
  warnings: ProductionLiveProbeRealReadSmokeArchiveMessage[];
  recommendations: ProductionLiveProbeRealReadSmokeArchiveMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeArchiveAdapterJson: string;
    productionLiveProbeRealReadSmokeArchiveAdapterMarkdown: string;
    productionLiveProbeRealReadSmokeReadinessSwitchJson: string;
    productionLiveProbeSmokeHarnessJson: string;
    productionLiveProbeEvidenceArchiveJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeRealReadSmokeArchiveRecord {
  id: ProductionLiveProbeResult["id"];
  archiveStatus: "pass-evidence" | "skipped-evidence" | "blocked-not-archivable";
  sourceStatus: ProductionLiveProbeResult["status"];
  target: string;
  protocol: ProductionLiveProbeResult["protocol"];
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  message: string;
  evidenceSummary?: unknown;
}

export interface ProductionLiveProbeRealReadSmokeArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "archive-adapter" | "readiness-switch" | "smoke-harness" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeArchiveAdapterJson: "/api/v1/production/live-probe-real-read-smoke-archive-adapter",
  productionLiveProbeRealReadSmokeArchiveAdapterMarkdown: "/api/v1/production/live-probe-real-read-smoke-archive-adapter?format=markdown",
  productionLiveProbeRealReadSmokeReadinessSwitchJson: "/api/v1/production/live-probe-real-read-smoke-readiness-switch",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
  productionLiveProbeEvidenceArchiveJson: "/api/v1/production/live-probe-evidence-archive",
});

export async function loadProductionLiveProbeRealReadSmokeArchiveAdapter(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeArchiveAdapterProfile> {
  const readinessSwitch = await loadProductionLiveProbeRealReadSmokeReadinessSwitch(input);
  const smokeHarness = await loadProductionLiveProbeSmokeHarness({
    config: input.config,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const records = smokeHarness.results.map(createArchiveRecord);
  const adapterMode = determineAdapterMode(smokeHarness);
  const checks = {
    readinessSwitchReviewReady: readinessSwitch.readyForSwitchReview,
    smokeHarnessReady: smokeHarness.readyForLiveProbeEvidence,
    allProbeResultsRecorded: smokeHarness.checks.allProbeResultsRecorded,
    noBlockedProbeResults: smokeHarness.summary.blockedProbeCount === 0,
    noWriteProbeAttempted: smokeHarness.checks.writeProbeAttempted === false
      && smokeHarness.checks.javaWritesAttempted === false
      && smokeHarness.checks.miniKvWritesAttempted === false,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false
      && smokeHarness.checks.upstreamActionsStillDisabled,
    skippedEvidenceNotProductionPass: adapterMode === "pass"
      || smokeHarness.summary.skippedProbeCount > 0,
    passEvidenceRequiresEnabledProbes: adapterMode !== "pass"
      || input.config.upstreamProbesEnabled === true,
    readyForArchiveAdapter: false,
    readyForProductionPassEvidence: false,
  };
  checks.readyForArchiveAdapter = checks.readinessSwitchReviewReady
    && checks.smokeHarnessReady
    && checks.allProbeResultsRecorded
    && checks.noBlockedProbeResults
    && checks.noWriteProbeAttempted
    && checks.upstreamActionsStillDisabled
    && checks.skippedEvidenceNotProductionPass
    && checks.passEvidenceRequiresEnabledProbes;
  checks.readyForProductionPassEvidence = checks.readyForArchiveAdapter
    && adapterMode === "pass"
    && input.config.upstreamProbesEnabled === true
    && smokeHarness.summary.skippedProbeCount === 0;
  const adapterDigest = digestAdapter({
    profileVersion: "production-live-probe-real-read-smoke-archive-adapter.v1",
    adapterMode,
    readinessSwitchDigest: readinessSwitch.switch.switchDigest,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    records: records.map((record) => ({
      id: record.id,
      archiveStatus: record.archiveStatus,
      sourceStatus: record.sourceStatus,
      attempted: record.attempted,
    })),
    checks: {
      ...checks,
      readyForArchiveAdapter: checks.readyForArchiveAdapter,
      readyForProductionPassEvidence: checks.readyForProductionPassEvidence,
    },
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(adapterMode, input.config.upstreamProbesEnabled);
  const recommendations = collectRecommendations(adapterMode);

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke archive adapter",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-archive-adapter.v1",
    readyForArchiveAdapter: checks.readyForArchiveAdapter,
    readyForProductionPassEvidence: checks.readyForProductionPassEvidence,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    adapter: {
      adapterDigest,
      adapterMode,
      readinessSwitchDigest: readinessSwitch.switch.switchDigest,
      readinessSwitchState: readinessSwitch.switchState,
      smokeHarnessProfileVersion: smokeHarness.profileVersion,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      plannedProbeCount: smokeHarness.summary.probeCount,
      passedProbeCount: smokeHarness.summary.passedProbeCount,
      skippedProbeCount: smokeHarness.summary.skippedProbeCount,
      blockedProbeCount: smokeHarness.summary.blockedProbeCount,
      skippedEvidenceNotProductionPass: adapterMode !== "pass",
    },
    checks,
    records,
    summary: {
      recordCount: records.length,
      passRecordCount: records.filter((record) => record.archiveStatus === "pass-evidence").length,
      skippedRecordCount: records.filter((record) => record.archiveStatus === "skipped-evidence").length,
      blockedRecordCount: records.filter((record) => record.archiveStatus === "blocked-not-archivable").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Store this adapter output beside the live probe smoke harness result when preparing release evidence.",
      "Treat skipped adapter output as local development evidence only, not production pass evidence.",
      "Only promote pass evidence after Java and mini-kv are intentionally started and all read-only probes pass.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeArchiveAdapterMarkdown(
  profile: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile,
): string {
  return [
    "# Production live probe real-read smoke archive adapter",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for archive adapter: ${profile.readyForArchiveAdapter}`,
    `- Ready for production pass evidence: ${profile.readyForProductionPassEvidence}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Adapter",
    "",
    ...renderEntries(profile.adapter),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Records",
    "",
    ...profile.records.flatMap(renderRecord),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read smoke archive adapter blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read smoke archive adapter warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read smoke archive adapter recommendations."),
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

function createArchiveRecord(result: ProductionLiveProbeResult): ProductionLiveProbeRealReadSmokeArchiveRecord {
  return {
    id: result.id,
    archiveStatus: result.status === "pass"
      ? "pass-evidence"
      : result.status === "skipped"
        ? "skipped-evidence"
        : "blocked-not-archivable",
    sourceStatus: result.status,
    target: result.target,
    protocol: result.protocol,
    readOnly: true,
    mutatesState: false,
    attempted: result.attempted,
    message: result.message,
    evidenceSummary: result.evidence,
  };
}

function determineAdapterMode(
  smokeHarness: ProductionLiveProbeSmokeHarnessProfile,
): ProductionLiveProbeRealReadSmokeArchiveAdapterProfile["adapter"]["adapterMode"] {
  if (smokeHarness.summary.passedProbeCount === smokeHarness.summary.probeCount) {
    return "pass";
  }
  if (smokeHarness.summary.skippedProbeCount === smokeHarness.summary.probeCount) {
    return "skipped";
  }
  return "mixed";
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile["checks"],
): ProductionLiveProbeRealReadSmokeArchiveMessage[] {
  const blockers: ProductionLiveProbeRealReadSmokeArchiveMessage[] = [];
  addMessage(blockers, checks.readinessSwitchReviewReady, "READINESS_SWITCH_NOT_READY", "readiness-switch", "Readiness switch must be review-ready before adapting smoke evidence.");
  addMessage(blockers, checks.smokeHarnessReady, "SMOKE_HARNESS_NOT_READY", "smoke-harness", "Smoke harness must record complete pass or skipped evidence.");
  addMessage(blockers, checks.allProbeResultsRecorded, "SMOKE_RESULTS_INCOMPLETE", "smoke-harness", "Every planned probe must produce a record.");
  addMessage(blockers, checks.noBlockedProbeResults, "SMOKE_RESULT_BLOCKED", "smoke-harness", "Blocked probe results are not archivable.");
  addMessage(blockers, checks.noWriteProbeAttempted, "WRITE_PROBE_ATTEMPTED", "archive-adapter", "Archive adapter only accepts read-only smoke results.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.skippedEvidenceNotProductionPass, "SKIPPED_EVIDENCE_MARKED_PRODUCTION_PASS", "archive-adapter", "Skipped evidence must not be treated as production pass evidence.");
  addMessage(blockers, checks.passEvidenceRequiresEnabledProbes, "PASS_EVIDENCE_WITH_PROBES_DISABLED", "archive-adapter", "Pass evidence requires UPSTREAM_PROBES_ENABLED=true.");
  return blockers;
}

function collectWarnings(
  mode: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile["adapter"]["adapterMode"],
  probesEnabled: boolean,
): ProductionLiveProbeRealReadSmokeArchiveMessage[] {
  return [
    {
      code: mode === "pass"
        ? "REAL_READ_SMOKE_PASS_EVIDENCE_ARCHIVED"
        : "REAL_READ_SMOKE_SKIPPED_EVIDENCE_ARCHIVED",
      severity: "warning",
      source: "archive-adapter",
      message: mode === "pass"
        ? "Archive adapter contains pass evidence, but production operations remain gated."
        : "Archive adapter contains skipped or mixed evidence; it is not production pass evidence.",
    },
    {
      code: probesEnabled ? "PROBE_WINDOW_WAS_OPEN" : "PROBE_WINDOW_REMAINED_CLOSED",
      severity: "warning",
      source: "runtime-config",
      message: probesEnabled
        ? "UPSTREAM_PROBES_ENABLED=true; confirm only read-only probes were run."
        : "UPSTREAM_PROBES_ENABLED=false; adapter output represents skipped local evidence.",
    },
  ];
}

function collectRecommendations(
  mode: ProductionLiveProbeRealReadSmokeArchiveAdapterProfile["adapter"]["adapterMode"],
): ProductionLiveProbeRealReadSmokeArchiveMessage[] {
  return [
    {
      code: mode === "pass"
        ? "KEEP_PASS_EVIDENCE_FOR_RELEASE_ARCHIVE"
        : "RUN_REAL_READ_SMOKE_WHEN_UPSTREAMS_ARE_INTENTIONALLY_STARTED",
      severity: "recommendation",
      source: "archive-adapter",
      message: mode === "pass"
        ? "Keep this adapter record with the release evidence archive, while leaving production operations gated."
        : "When ready, intentionally start Java and mini-kv, open the read-only probe window, and regenerate this adapter output.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeRealReadSmokeArchiveMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeRealReadSmokeArchiveMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestAdapter(value: unknown): string {
  return sha256StableJson(value);
}

function renderRecord(record: ProductionLiveProbeRealReadSmokeArchiveRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Archive status: ${record.archiveStatus}`,
    `- Source status: ${record.sourceStatus}`,
    `- Target: ${record.target}`,
    `- Protocol: ${record.protocol}`,
    `- Read only: ${record.readOnly}`,
    `- Mutates state: ${record.mutatesState}`,
    `- Attempted: ${record.attempted}`,
    `- Message: ${record.message}`,
    `- Evidence summary: ${formatValue(record.evidenceSummary)}`,
    "",
  ];
}


