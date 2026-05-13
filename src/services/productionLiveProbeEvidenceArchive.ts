import { createHash } from "node:crypto";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  createProductionLiveProbeReadinessContract,
} from "./productionLiveProbeReadinessContract.js";
import {
  loadProductionLiveProbeSmokeHarness,
} from "./productionLiveProbeSmokeHarness.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import { loadProductionReadinessSummaryV13 } from "./productionReadinessSummaryV13.js";

export interface ProductionLiveProbeEvidenceArchiveProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-evidence-archive.v1";
  readyForArchiveRecord: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  archive: {
    archiveDigest: string;
    contractProfileVersion: "production-live-probe-readiness-contract.v1";
    smokeHarnessProfileVersion: "production-live-probe-smoke-harness.v1";
    summaryVersion: "production-readiness-summary.v13";
    liveProbeEvidenceMode: "pass" | "skipped" | "mixed";
    plannedProbeCount: number;
    passedProbeCount: number;
    skippedProbeCount: number;
    blockedProbeCount: number;
    writeProbeAttempted: false;
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    readyForLiveProbeEvidence: boolean;
    readyForProductionOperations: false;
  };
  checks: {
    contractVersionValid: boolean;
    smokeHarnessVersionValid: boolean;
    summaryV13VersionValid: boolean;
    summaryV13EvidenceReady: boolean;
    smokeEvidenceReady: boolean;
    smokeProbeCountMatchesContract: boolean;
    smokePassOrSkippedOnly: boolean;
    liveProbeWritesAttempted: false;
    upstreamActionsStillDisabled: boolean;
    skippedEvidenceNotProductionPass: boolean;
    archiveDigestValid: boolean;
    readyForArchiveRecord: boolean;
  };
  artifacts: {
    liveProbeReadinessContract: {
      profileVersion: "production-live-probe-readiness-contract.v1";
      readyForLiveProbePlanning: boolean;
      plannedProbeCount: number;
      writeProbeCount: number;
      probeAttempted: boolean;
    };
    liveProbeSmokeHarness: {
      profileVersion: "production-live-probe-smoke-harness.v1";
      readyForLiveProbeEvidence: boolean;
      probesEnabled: boolean;
      probeCount: number;
      passedProbeCount: number;
      skippedProbeCount: number;
      blockedProbeCount: number;
      writeProbeAttempted: false;
    };
    productionReadinessSummaryV13: {
      summaryVersion: "production-readiness-summary.v13";
      summaryV12Ready: boolean;
      liveProbeContractReady: boolean;
      liveProbeSmokeEvidenceReady: boolean;
      liveProbeSmokeSkipped: boolean;
      liveProbeSmokePassed: boolean;
      readyForProductionOperations: false;
    };
  };
  summary: {
    artifactCount: number;
    archivedArtifactCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeEvidenceArchiveMessage[];
  warnings: ProductionLiveProbeEvidenceArchiveMessage[];
  recommendations: ProductionLiveProbeEvidenceArchiveMessage[];
  evidenceEndpoints: {
    productionLiveProbeEvidenceArchiveJson: string;
    productionLiveProbeEvidenceArchiveMarkdown: string;
    productionLiveProbeReadinessContractJson: string;
    productionLiveProbeSmokeHarnessJson: string;
    productionReadinessSummaryV13Json: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeEvidenceArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "live-probe-contract"
    | "live-probe-smoke-harness"
    | "production-readiness-summary-v13"
    | "live-probe-evidence-archive"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeEvidenceArchiveJson: "/api/v1/production/live-probe-evidence-archive",
  productionLiveProbeEvidenceArchiveMarkdown: "/api/v1/production/live-probe-evidence-archive?format=markdown",
  productionLiveProbeReadinessContractJson: "/api/v1/production/live-probe-readiness-contract",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
  productionReadinessSummaryV13Json: "/api/v1/production/readiness-summary-v13",
});

export async function loadProductionLiveProbeEvidenceArchive(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeEvidenceArchiveProfile> {
  const contract = createProductionLiveProbeReadinessContract(input.config);
  const smokeHarness = await loadProductionLiveProbeSmokeHarness({
    config: input.config,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const summaryV13 = await loadProductionReadinessSummaryV13(input);
  const plannedProbeCount = contract.targets.javaOrderPlatform.plannedProbes.length
    + contract.targets.miniKv.plannedProbes.length;
  const liveProbeEvidenceMode = classifyLiveProbeEvidenceMode(
    smokeHarness.summary.probeCount,
    smokeHarness.summary.passedProbeCount,
    smokeHarness.summary.skippedProbeCount,
  );
  const checks = {
    contractVersionValid: contract.profileVersion === "production-live-probe-readiness-contract.v1",
    smokeHarnessVersionValid: smokeHarness.profileVersion === "production-live-probe-smoke-harness.v1",
    summaryV13VersionValid: summaryV13.summaryVersion === "production-readiness-summary.v13",
    summaryV13EvidenceReady: summaryV13.checks.summaryV12EvidenceReady
      && summaryV13.checks.liveProbeContractReady
      && summaryV13.checks.liveProbeSmokeEvidenceReady
      && summaryV13.checks.liveProbeWritesAttempted === false,
    smokeEvidenceReady: smokeHarness.readyForLiveProbeEvidence,
    smokeProbeCountMatchesContract: smokeHarness.summary.probeCount === plannedProbeCount,
    smokePassOrSkippedOnly: smokeHarness.summary.blockedProbeCount === 0
      && smokeHarness.results.every((result) => result.status === "pass" || result.status === "skipped"),
    liveProbeWritesAttempted: false as const,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    skippedEvidenceNotProductionPass: smokeHarness.summary.skippedProbeCount === 0
      || summaryV13.readyForProductionOperations === false,
    archiveDigestValid: false,
    readyForArchiveRecord: false,
  };
  checks.readyForArchiveRecord = checks.contractVersionValid
    && checks.smokeHarnessVersionValid
    && checks.summaryV13VersionValid
    && checks.summaryV13EvidenceReady
    && checks.smokeEvidenceReady
    && checks.smokeProbeCountMatchesContract
    && checks.smokePassOrSkippedOnly
    && checks.liveProbeWritesAttempted === false
    && checks.upstreamActionsStillDisabled
    && checks.skippedEvidenceNotProductionPass;
  const archiveDigest = digestArchive({
    profileVersion: "production-live-probe-evidence-archive.v1",
    contractProfileVersion: contract.profileVersion,
    smokeHarnessProfileVersion: smokeHarness.profileVersion,
    summaryVersion: summaryV13.summaryVersion,
    liveProbeEvidenceMode,
    plannedProbeCount,
    passedProbeCount: smokeHarness.summary.passedProbeCount,
    skippedProbeCount: smokeHarness.summary.skippedProbeCount,
    blockedProbeCount: smokeHarness.summary.blockedProbeCount,
    writeProbeAttempted: false,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    readyForLiveProbeEvidence: smokeHarness.readyForLiveProbeEvidence,
    readyForProductionOperations: false,
    checks: {
      ...checks,
      archiveDigestValid: undefined,
      readyForArchiveRecord: checks.readyForArchiveRecord,
    },
  });
  checks.archiveDigestValid = /^[a-f0-9]{64}$/.test(archiveDigest);
  checks.readyForArchiveRecord = checks.readyForArchiveRecord && checks.archiveDigestValid;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(liveProbeEvidenceMode);
  const recommendations = collectRecommendations();
  const artifacts = {
    liveProbeReadinessContract: {
      profileVersion: contract.profileVersion,
      readyForLiveProbePlanning: contract.readyForLiveProbePlanning,
      plannedProbeCount,
      writeProbeCount: contract.summary.writeProbeCount,
      probeAttempted: contract.probeAttempted,
    },
    liveProbeSmokeHarness: {
      profileVersion: smokeHarness.profileVersion,
      readyForLiveProbeEvidence: smokeHarness.readyForLiveProbeEvidence,
      probesEnabled: smokeHarness.probesEnabled,
      probeCount: smokeHarness.summary.probeCount,
      passedProbeCount: smokeHarness.summary.passedProbeCount,
      skippedProbeCount: smokeHarness.summary.skippedProbeCount,
      blockedProbeCount: smokeHarness.summary.blockedProbeCount,
      writeProbeAttempted: false as const,
    },
    productionReadinessSummaryV13: {
      summaryVersion: summaryV13.summaryVersion,
      summaryV12Ready: summaryV13.readinessStatus.summaryV12Ready,
      liveProbeContractReady: summaryV13.readinessStatus.liveProbeContractReady,
      liveProbeSmokeEvidenceReady: summaryV13.readinessStatus.liveProbeSmokeEvidenceReady,
      liveProbeSmokeSkipped: summaryV13.readinessStatus.liveProbeSmokeSkipped,
      liveProbeSmokePassed: summaryV13.readinessStatus.liveProbeSmokePassed,
      readyForProductionOperations: summaryV13.readyForProductionOperations,
    },
  };
  const archivedArtifactCount = [
    checks.contractVersionValid,
    checks.smokeHarnessVersionValid,
    checks.summaryV13VersionValid && checks.summaryV13EvidenceReady,
  ].filter(Boolean).length;

  return {
    service: "orderops-node",
    title: "Production live probe evidence archive",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-evidence-archive.v1",
    readyForArchiveRecord: checks.readyForArchiveRecord,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    archive: {
      archiveDigest,
      contractProfileVersion: contract.profileVersion,
      smokeHarnessProfileVersion: smokeHarness.profileVersion,
      summaryVersion: summaryV13.summaryVersion,
      liveProbeEvidenceMode,
      plannedProbeCount,
      passedProbeCount: smokeHarness.summary.passedProbeCount,
      skippedProbeCount: smokeHarness.summary.skippedProbeCount,
      blockedProbeCount: smokeHarness.summary.blockedProbeCount,
      writeProbeAttempted: false,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      readyForLiveProbeEvidence: smokeHarness.readyForLiveProbeEvidence,
      readyForProductionOperations: false,
    },
    checks,
    artifacts,
    summary: {
      artifactCount: 3,
      archivedArtifactCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this archive record as the input to live probe evidence archive verification.",
      "Keep skipped evidence separate from production pass evidence until Java and mini-kv are explicitly started for read-only live smoke.",
      "Do not enable upstream actions or add write probes to the live probe evidence archive path.",
    ],
  };
}

export function renderProductionLiveProbeEvidenceArchiveMarkdown(
  profile: ProductionLiveProbeEvidenceArchiveProfile,
): string {
  return [
    "# Production live probe evidence archive",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for archive record: ${profile.readyForArchiveRecord}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Archive",
    "",
    ...renderEntries(profile.archive),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    "### Live probe readiness contract",
    "",
    ...renderEntries(profile.artifacts.liveProbeReadinessContract),
    "",
    "### Live probe smoke harness",
    "",
    ...renderEntries(profile.artifacts.liveProbeSmokeHarness),
    "",
    "### Production readiness summary v13",
    "",
    ...renderEntries(profile.artifacts.productionReadinessSummaryV13),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No live probe archive blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No live probe archive warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No live probe archive recommendations."),
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

function classifyLiveProbeEvidenceMode(
  probeCount: number,
  passedProbeCount: number,
  skippedProbeCount: number,
): ProductionLiveProbeEvidenceArchiveProfile["archive"]["liveProbeEvidenceMode"] {
  if (probeCount > 0 && passedProbeCount === probeCount) {
    return "pass";
  }

  if (probeCount > 0 && skippedProbeCount === probeCount) {
    return "skipped";
  }

  return "mixed";
}

function collectProductionBlockers(
  checks: ProductionLiveProbeEvidenceArchiveProfile["checks"],
): ProductionLiveProbeEvidenceArchiveMessage[] {
  const blockers: ProductionLiveProbeEvidenceArchiveMessage[] = [];
  addMessage(blockers, checks.contractVersionValid, "LIVE_PROBE_CONTRACT_VERSION_INVALID", "live-probe-contract", "Live probe readiness contract profileVersion must match v135.");
  addMessage(blockers, checks.smokeHarnessVersionValid, "LIVE_PROBE_SMOKE_VERSION_INVALID", "live-probe-smoke-harness", "Live probe smoke harness profileVersion must match v136.");
  addMessage(blockers, checks.summaryV13VersionValid, "SUMMARY_V13_VERSION_INVALID", "production-readiness-summary-v13", "Production readiness summary version must match v13.");
  addMessage(blockers, checks.summaryV13EvidenceReady, "SUMMARY_V13_EVIDENCE_NOT_READY", "production-readiness-summary-v13", "Summary v13 evidence must be ready before live probe evidence can be archived.");
  addMessage(blockers, checks.smokeEvidenceReady, "LIVE_PROBE_SMOKE_EVIDENCE_NOT_READY", "live-probe-smoke-harness", "Smoke harness must be ready for live probe evidence.");
  addMessage(blockers, checks.smokeProbeCountMatchesContract, "LIVE_PROBE_COUNT_MISMATCH", "live-probe-evidence-archive", "Smoke probe count must match the contract planned probe count.");
  addMessage(blockers, checks.smokePassOrSkippedOnly, "LIVE_PROBE_BLOCKED_RESULT_PRESENT", "live-probe-smoke-harness", "Live probe archive accepts only pass or skipped probe results.");
  addMessage(blockers, checks.liveProbeWritesAttempted === false, "LIVE_PROBE_WRITE_ATTEMPTED", "live-probe-evidence-archive", "Live probe evidence archive must not include write probes.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false for live probe evidence archive.");
  addMessage(blockers, checks.skippedEvidenceNotProductionPass, "SKIPPED_EVIDENCE_MARKED_PRODUCTION_PASS", "live-probe-evidence-archive", "Skipped live probe evidence must not be treated as production pass evidence.");
  addMessage(blockers, checks.archiveDigestValid, "LIVE_PROBE_ARCHIVE_DIGEST_INVALID", "live-probe-evidence-archive", "Live probe evidence archive digest must be a valid sha256 hex digest.");
  return blockers;
}

function collectWarnings(
  mode: ProductionLiveProbeEvidenceArchiveProfile["archive"]["liveProbeEvidenceMode"],
): ProductionLiveProbeEvidenceArchiveMessage[] {
  return [
    {
      code: mode === "pass"
        ? "LIVE_PROBE_PASS_ARCHIVED_CONNECTIONS_STILL_GATED"
        : "LIVE_PROBE_SKIPPED_ARCHIVED_NOT_PRODUCTION_PASS",
      severity: "warning",
      source: "live-probe-evidence-archive",
      message: mode === "pass"
        ? "Read-only live probe pass evidence can be archived while production operations remain gated."
        : "Skipped live probe evidence is archive-ready for local development but is not production pass evidence.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeEvidenceArchiveMessage[] {
  return [
    {
      code: "VERIFY_LIVE_PROBE_ARCHIVE_NEXT",
      severity: "recommendation",
      source: "live-probe-evidence-archive",
      message: "Add archive verification next to recheck digest, version references, and no-write evidence.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeEvidenceArchiveMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeEvidenceArchiveMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestArchive(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}

function renderMessages(messages: ProductionLiveProbeEvidenceArchiveMessage[], emptyText: string): string[] {
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

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
