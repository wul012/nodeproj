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
  loadRealReadAdapterFailureTaxonomy,
} from "./realReadAdapterFailureTaxonomy.js";
import type {
  FailureClass,
  RealReadAdapterFailureTaxonomyProfile,
} from "./realReadAdapterFailureTaxonomy.js";
import {
  loadRealReadAdapterOperatorWindowRunbook,
} from "./realReadAdapterOperatorWindowRunbook.js";
import {
  loadRealReadAdapterRehearsal,
} from "./realReadAdapterRehearsal.js";
import type { RealReadAdapterRehearsalProfile } from "./realReadAdapterRehearsal.js";

export interface RealReadAdapterEvidenceArchiveProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-adapter-evidence-archive.v1";
  archiveState: "closed-window-evidence-archived" | "open-window-evidence-archived" | "blocked";
  readyForRealReadAdapterEvidenceArchive: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  archive: {
    archiveDigest: string;
    adapterDigest: string;
    taxonomyDigest: string;
    operatorWindowRunbookDigest: string;
    adapterProfileVersion: RealReadAdapterRehearsalProfile["profileVersion"];
    taxonomyProfileVersion: RealReadAdapterFailureTaxonomyProfile["profileVersion"];
    operatorWindowRunbookVersion: "real-read-adapter-operator-window-runbook.v1";
    rehearsalState: RealReadAdapterRehearsalProfile["rehearsalState"];
    taxonomyState: RealReadAdapterFailureTaxonomyProfile["taxonomyState"];
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    readOnlyWindowOpen: boolean;
    automaticUpstreamStart: false;
    productionWriteAuthorized: false;
    archivedAsProductionPassEvidence: false;
  };
  checks: {
    adapterDigestValid: boolean;
    taxonomyDigestValid: boolean;
    operatorWindowRunbookDigestValid: boolean;
    adapterProfileVersionValid: boolean;
    taxonomyProfileVersionValid: boolean;
    operatorWindowRunbookVersionValid: boolean;
    taxonomyReady: boolean;
    taxonomyMatchesAdapterDigest: boolean;
    classificationCoverageComplete: boolean;
    closedWindowArchivedAsNonPass: boolean;
    unsafeSurfaceNotPromoted: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForRealReadAdapterEvidenceArchive: boolean;
  };
  artifacts: {
    adapter: {
      profileVersion: RealReadAdapterRehearsalProfile["profileVersion"];
      adapterDigest: string;
      rehearsalState: RealReadAdapterRehearsalProfile["rehearsalState"];
      recordCount: number;
      attemptedProbeCount: number;
      passedProbeCount: number;
      skippedProbeCount: number;
      blockedProbeCount: number;
      readyForProductionOperations: false;
    };
    operatorWindow: {
      profileVersion: "real-read-adapter-operator-window-runbook.v1";
      runbookDigest: string;
      runbookState: "ready-for-manual-window" | "blocked";
      operatorStepCount: number;
      allowedReadCount: number;
      readyForProductionOperations: false;
    };
    taxonomy: {
      profileVersion: RealReadAdapterFailureTaxonomyProfile["profileVersion"];
      taxonomyDigest: string;
      taxonomyState: RealReadAdapterFailureTaxonomyProfile["taxonomyState"];
      classificationCount: number;
      failureClasses: FailureClass[];
      readyForProductionOperations: false;
    };
  };
  summary: {
    archiveCheckCount: number;
    passedArchiveCheckCount: number;
    adapterRecordCount: number;
    taxonomyClassificationCount: number;
    distinctFailureClassCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RealReadAdapterEvidenceArchiveMessage[];
  warnings: RealReadAdapterEvidenceArchiveMessage[];
  recommendations: RealReadAdapterEvidenceArchiveMessage[];
  evidenceEndpoints: {
    realReadAdapterEvidenceArchiveJson: string;
    realReadAdapterEvidenceArchiveMarkdown: string;
    realReadAdapterRehearsalJson: string;
    realReadAdapterOperatorWindowRunbookJson: string;
    realReadAdapterFailureTaxonomyJson: string;
  };
  nextActions: string[];
}

interface RealReadAdapterEvidenceArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "real-read-adapter-evidence-archive" | "real-read-adapter-rehearsal" | "operator-window-runbook" | "real-read-adapter-failure-taxonomy" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadAdapterEvidenceArchiveJson: "/api/v1/production/real-read-adapter-evidence-archive",
  realReadAdapterEvidenceArchiveMarkdown: "/api/v1/production/real-read-adapter-evidence-archive?format=markdown",
  realReadAdapterRehearsalJson: "/api/v1/production/real-read-adapter-rehearsal",
  realReadAdapterOperatorWindowRunbookJson: "/api/v1/production/real-read-adapter-operator-window-runbook",
  realReadAdapterFailureTaxonomyJson: "/api/v1/production/real-read-adapter-failure-taxonomy",
});

export interface RealReadAdapterEvidenceArchiveDigestPayload {
  profileVersion: "real-read-adapter-evidence-archive.v1";
  archiveState: RealReadAdapterEvidenceArchiveProfile["archiveState"];
  adapterDigest: string;
  taxonomyDigest: string;
  operatorWindowRunbookDigest: string;
  rehearsalState: RealReadAdapterEvidenceArchiveProfile["archive"]["rehearsalState"];
  taxonomyState: RealReadAdapterEvidenceArchiveProfile["archive"]["taxonomyState"];
  failureClasses: FailureClass[];
  checks: RealReadAdapterEvidenceArchiveProfile["checks"];
}

export function createRealReadAdapterEvidenceArchiveDigestPayload(input: {
  archiveState: RealReadAdapterEvidenceArchiveProfile["archiveState"];
  adapterDigest: string;
  taxonomyDigest: string;
  operatorWindowRunbookDigest: string;
  rehearsalState: RealReadAdapterEvidenceArchiveProfile["archive"]["rehearsalState"];
  taxonomyState: RealReadAdapterEvidenceArchiveProfile["archive"]["taxonomyState"];
  failureClasses: FailureClass[];
  checks: RealReadAdapterEvidenceArchiveProfile["checks"];
}): RealReadAdapterEvidenceArchiveDigestPayload {
  return {
    profileVersion: "real-read-adapter-evidence-archive.v1",
    archiveState: input.archiveState,
    adapterDigest: input.adapterDigest,
    taxonomyDigest: input.taxonomyDigest,
    operatorWindowRunbookDigest: input.operatorWindowRunbookDigest,
    rehearsalState: input.rehearsalState,
    taxonomyState: input.taxonomyState,
    failureClasses: [...input.failureClasses],
    checks: input.checks,
  };
}

export async function loadRealReadAdapterEvidenceArchive(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<RealReadAdapterEvidenceArchiveProfile> {
  const adapter = await loadRealReadAdapterRehearsal(input);
  const operatorWindow = loadRealReadAdapterOperatorWindowRunbook(input.config);
  const taxonomy = await loadRealReadAdapterFailureTaxonomy(input);
  const failureClasses = distinctFailureClasses(taxonomy);
  const checks = createChecks(input.config, adapter, operatorWindow, taxonomy);
  checks.readyForRealReadAdapterEvidenceArchive = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadAdapterEvidenceArchive")
    .every(([, value]) => value);
  const archiveState = determineArchiveState(input.config, checks, taxonomy);
  const archiveDigest = sha256StableJson(createRealReadAdapterEvidenceArchiveDigestPayload({
    archiveState,
    adapterDigest: adapter.adapter.adapterDigest,
    taxonomyDigest: taxonomy.taxonomy.taxonomyDigest,
    operatorWindowRunbookDigest: operatorWindow.runbook.runbookDigest,
    rehearsalState: adapter.rehearsalState,
    taxonomyState: taxonomy.taxonomyState,
    failureClasses,
    checks,
  }));
  const productionBlockers = collectProductionBlockers(checks, taxonomy.productionBlockers.length);
  const warnings = collectWarnings(archiveState, input.config.upstreamProbesEnabled, failureClasses);
  const recommendations = collectRecommendations(archiveState);

  return {
    service: "orderops-node",
    title: "Real-read adapter evidence archive",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-adapter-evidence-archive.v1",
    archiveState,
    readyForRealReadAdapterEvidenceArchive: checks.readyForRealReadAdapterEvidenceArchive,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    archive: {
      archiveDigest,
      adapterDigest: adapter.adapter.adapterDigest,
      taxonomyDigest: taxonomy.taxonomy.taxonomyDigest,
      operatorWindowRunbookDigest: operatorWindow.runbook.runbookDigest,
      adapterProfileVersion: adapter.profileVersion,
      taxonomyProfileVersion: taxonomy.profileVersion,
      operatorWindowRunbookVersion: operatorWindow.profileVersion,
      rehearsalState: adapter.rehearsalState,
      taxonomyState: taxonomy.taxonomyState,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      readOnlyWindowOpen: input.config.upstreamProbesEnabled,
      automaticUpstreamStart: false,
      productionWriteAuthorized: false,
      archivedAsProductionPassEvidence: false,
    },
    checks,
    artifacts: {
      adapter: {
        profileVersion: adapter.profileVersion,
        adapterDigest: adapter.adapter.adapterDigest,
        rehearsalState: adapter.rehearsalState,
        recordCount: adapter.summary.recordCount,
        attemptedProbeCount: adapter.summary.attemptedProbeCount,
        passedProbeCount: adapter.summary.passedProbeCount,
        skippedProbeCount: adapter.summary.skippedProbeCount,
        blockedProbeCount: adapter.summary.blockedProbeCount,
        readyForProductionOperations: adapter.readyForProductionOperations,
      },
      operatorWindow: {
        profileVersion: operatorWindow.profileVersion,
        runbookDigest: operatorWindow.runbook.runbookDigest,
        runbookState: operatorWindow.runbookState,
        operatorStepCount: operatorWindow.summary.operatorStepCount,
        allowedReadCount: operatorWindow.summary.allowedReadCount,
        readyForProductionOperations: operatorWindow.readyForProductionOperations,
      },
      taxonomy: {
        profileVersion: taxonomy.profileVersion,
        taxonomyDigest: taxonomy.taxonomy.taxonomyDigest,
        taxonomyState: taxonomy.taxonomyState,
        classificationCount: taxonomy.summary.classificationCount,
        failureClasses,
        readyForProductionOperations: taxonomy.readyForProductionOperations,
      },
    },
    summary: {
      archiveCheckCount: countReportChecks(checks),
      passedArchiveCheckCount: countPassedReportChecks(checks),
      adapterRecordCount: adapter.summary.recordCount,
      taxonomyClassificationCount: taxonomy.summary.classificationCount,
      distinctFailureClassCount: failureClasses.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this archive as real-read adapter evidence only; it does not authorize production operations.",
      "After v194, start a new non-overlapping plan before extending real-read adapter behavior.",
      "Use this archive as the input for any later verification step instead of re-reading scattered v191-v193 endpoints.",
    ],
  };
}

export function renderRealReadAdapterEvidenceArchiveMarkdown(
  profile: RealReadAdapterEvidenceArchiveProfile,
): string {
  return [
    "# Real-read adapter evidence archive",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Archive state: ${profile.archiveState}`,
    `- Ready for real-read adapter evidence archive: ${profile.readyForRealReadAdapterEvidenceArchive}`,
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
    "### Adapter",
    "",
    ...renderEntries(profile.artifacts.adapter),
    "",
    "### Operator Window",
    "",
    ...renderEntries(profile.artifacts.operatorWindow),
    "",
    "### Taxonomy",
    "",
    ...renderEntries(profile.artifacts.taxonomy),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read adapter evidence archive blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read adapter evidence archive warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read adapter evidence archive recommendations."),
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

function createChecks(
  config: AppConfig,
  adapter: RealReadAdapterRehearsalProfile,
  operatorWindow: ReturnType<typeof loadRealReadAdapterOperatorWindowRunbook>,
  taxonomy: RealReadAdapterFailureTaxonomyProfile,
): RealReadAdapterEvidenceArchiveProfile["checks"] {
  return {
    adapterDigestValid: /^[a-f0-9]{64}$/.test(adapter.adapter.adapterDigest),
    taxonomyDigestValid: /^[a-f0-9]{64}$/.test(taxonomy.taxonomy.taxonomyDigest),
    operatorWindowRunbookDigestValid: /^[a-f0-9]{64}$/.test(operatorWindow.runbook.runbookDigest),
    adapterProfileVersionValid: adapter.profileVersion === "real-read-adapter-rehearsal.v1",
    taxonomyProfileVersionValid: taxonomy.profileVersion === "real-read-adapter-failure-taxonomy.v1",
    operatorWindowRunbookVersionValid: operatorWindow.profileVersion === "real-read-adapter-operator-window-runbook.v1",
    taxonomyReady: taxonomy.readyForRealReadAdapterFailureTaxonomy,
    taxonomyMatchesAdapterDigest: taxonomy.taxonomy.sourceAdapterDigest === adapter.adapter.adapterDigest,
    classificationCoverageComplete: taxonomy.summary.classificationCount === adapter.summary.recordCount
      && taxonomy.summary.classificationCount > 0,
    closedWindowArchivedAsNonPass: config.upstreamProbesEnabled
      || taxonomy.taxonomyState === "closed-window-classified",
    unsafeSurfaceNotPromoted: taxonomy.summary.unsafeSurfaceCount === 0
      && taxonomy.summary.unexpectedWriteSignalCount === 0,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    noAutomaticUpstreamStart: operatorWindow.runbook.automaticUpstreamStart === false
      && taxonomy.taxonomy.automaticUpstreamStart === false,
    readyForProductionOperationsStillFalse: adapter.readyForProductionOperations === false
      && operatorWindow.readyForProductionOperations === false
      && taxonomy.readyForProductionOperations === false,
    readyForRealReadAdapterEvidenceArchive: false,
  };
}

function determineArchiveState(
  config: AppConfig,
  checks: RealReadAdapterEvidenceArchiveProfile["checks"],
  taxonomy: RealReadAdapterFailureTaxonomyProfile,
): RealReadAdapterEvidenceArchiveProfile["archiveState"] {
  if (!checks.readyForRealReadAdapterEvidenceArchive || taxonomy.productionBlockers.length > 0) {
    return "blocked";
  }
  return config.upstreamProbesEnabled ? "open-window-evidence-archived" : "closed-window-evidence-archived";
}

function collectProductionBlockers(
  checks: RealReadAdapterEvidenceArchiveProfile["checks"],
  taxonomyBlockerCount: number,
): RealReadAdapterEvidenceArchiveMessage[] {
  const blockers: RealReadAdapterEvidenceArchiveMessage[] = [];
  addMessage(blockers, checks.adapterDigestValid, "ADAPTER_DIGEST_INVALID", "real-read-adapter-rehearsal", "Adapter digest must be a sha256 hex digest.");
  addMessage(blockers, checks.taxonomyDigestValid, "TAXONOMY_DIGEST_INVALID", "real-read-adapter-failure-taxonomy", "Taxonomy digest must be a sha256 hex digest.");
  addMessage(blockers, checks.operatorWindowRunbookDigestValid, "OPERATOR_WINDOW_DIGEST_INVALID", "operator-window-runbook", "Operator window runbook digest must be a sha256 hex digest.");
  addMessage(blockers, checks.adapterProfileVersionValid, "ADAPTER_PROFILE_VERSION_INVALID", "real-read-adapter-rehearsal", "Archive must reference v191 adapter profile version.");
  addMessage(blockers, checks.taxonomyProfileVersionValid, "TAXONOMY_PROFILE_VERSION_INVALID", "real-read-adapter-failure-taxonomy", "Archive must reference v193 taxonomy profile version.");
  addMessage(blockers, checks.operatorWindowRunbookVersionValid, "OPERATOR_WINDOW_PROFILE_VERSION_INVALID", "operator-window-runbook", "Archive must reference v192 operator window runbook version.");
  addMessage(blockers, checks.taxonomyReady, "TAXONOMY_NOT_READY", "real-read-adapter-failure-taxonomy", "Taxonomy must be ready before archive.");
  addMessage(blockers, checks.taxonomyMatchesAdapterDigest, "TAXONOMY_ADAPTER_DIGEST_MISMATCH", "real-read-adapter-evidence-archive", "Taxonomy source adapter digest must match archived adapter digest.");
  addMessage(blockers, checks.classificationCoverageComplete, "CLASSIFICATION_COVERAGE_INCOMPLETE", "real-read-adapter-evidence-archive", "Every adapter record must have an archived classification.");
  addMessage(blockers, checks.closedWindowArchivedAsNonPass, "CLOSED_WINDOW_PROMOTED", "real-read-adapter-evidence-archive", "Closed-window evidence must remain non-pass archive evidence.");
  addMessage(blockers, checks.unsafeSurfaceNotPromoted, "UNSAFE_SURFACE_ARCHIVED_AS_READY", "real-read-adapter-evidence-archive", "Unsafe surfaces or write signals must not be archived as ready evidence.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "operator-window-runbook", "Archive creation must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Archive must not unlock production operations.");
  addMessage(blockers, taxonomyBlockerCount === 0, "TAXONOMY_HAS_BLOCKERS", "real-read-adapter-failure-taxonomy", "Taxonomy blockers must be cleared before archive.");
  return blockers;
}

function collectWarnings(
  archiveState: RealReadAdapterEvidenceArchiveProfile["archiveState"],
  upstreamProbesEnabled: boolean,
  failureClasses: FailureClass[],
): RealReadAdapterEvidenceArchiveMessage[] {
  return [
    {
      code: archiveState === "open-window-evidence-archived"
        ? "OPEN_WINDOW_EVIDENCE_ARCHIVED"
        : "CLOSED_WINDOW_EVIDENCE_ARCHIVED",
      severity: "warning",
      source: "real-read-adapter-evidence-archive",
      message: upstreamProbesEnabled
        ? "The archive records an operator-window taxonomy bundle, but production operations remain disabled."
        : "The archive records a closed-window baseline bundle without contacting Java or mini-kv.",
    },
    {
      code: "FAILURE_CLASSES_ARCHIVED",
      severity: "warning",
      source: "real-read-adapter-failure-taxonomy",
      message: `Archived failure classes: ${failureClasses.join(", ")}.`,
    },
  ];
}

function collectRecommendations(
  archiveState: RealReadAdapterEvidenceArchiveProfile["archiveState"],
): RealReadAdapterEvidenceArchiveMessage[] {
  return [
    {
      code: archiveState === "blocked"
        ? "FIX_ARCHIVE_BLOCKERS"
        : "START_POST_V194_PLAN",
      severity: "recommendation",
      source: "real-read-adapter-evidence-archive",
      message: archiveState === "blocked"
        ? "Fix archive blockers before starting a new real-read adapter plan."
        : "Start a new post-v194 plan instead of appending more completed versions to v191.",
    },
  ];
}

function distinctFailureClasses(taxonomy: RealReadAdapterFailureTaxonomyProfile): FailureClass[] {
  return Array.from(new Set(taxonomy.classifications.map((classification) => classification.failureClass))).sort();
}

function addMessage(
  messages: RealReadAdapterEvidenceArchiveMessage[],
  condition: boolean,
  code: string,
  source: RealReadAdapterEvidenceArchiveMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
