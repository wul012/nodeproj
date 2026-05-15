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
  loadRealReadAdapterOperatorWindowRunbook,
} from "./realReadAdapterOperatorWindowRunbook.js";
import {
  loadRealReadAdapterRehearsal,
} from "./realReadAdapterRehearsal.js";
import type {
  RealReadAdapterRehearsalProfile,
  RealReadAdapterRehearsalRecord,
} from "./realReadAdapterRehearsal.js";

export interface RealReadAdapterFailureTaxonomyProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-adapter-failure-taxonomy.v1";
  taxonomyState: "closed-window-classified" | "open-pass-classified" | "open-failure-classified" | "blocked";
  readyForRealReadAdapterFailureTaxonomy: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  taxonomy: {
    taxonomyDigest: string;
    sourceAdapterDigest: string;
    sourceAdapterProfileVersion: RealReadAdapterRehearsalProfile["profileVersion"];
    operatorWindowRunbookVersion: "real-read-adapter-operator-window-runbook.v1";
    javaFailureTaxonomyVersion: "Java v68";
    miniKvFailureTaxonomyVersion: "mini-kv v77";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    productionWriteAuthorized: false;
    supportedClasses: FailureClass[];
  };
  checks: {
    adapterReviewReady: boolean;
    operatorWindowReady: boolean;
    javaV68TaxonomyAccepted: boolean;
    miniKvV77TaxonomyAccepted: boolean;
    allRecordsClassified: boolean;
    closedWindowClassifiedWhenProbesDisabled: boolean;
    unsafeSurfaceBlocked: boolean;
    unexpectedWriteSignalBlocked: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForRealReadAdapterFailureTaxonomy: boolean;
  };
  upstreamEvidence: {
    java: UpstreamFailureTaxonomyReference;
    miniKv: UpstreamFailureTaxonomyReference;
  };
  classifications: RealReadAdapterFailureClassification[];
  summary: {
    classificationCount: number;
    closedWindowCount: number;
    connectionRefusedCount: number;
    timeoutCount: number;
    invalidJsonCount: number;
    unsafeSurfaceCount: number;
    unexpectedWriteSignalCount: number;
    passedReadCount: number;
    runbookCheckCount: number;
    passedRunbookCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RealReadAdapterFailureTaxonomyMessage[];
  warnings: RealReadAdapterFailureTaxonomyMessage[];
  recommendations: RealReadAdapterFailureTaxonomyMessage[];
  evidenceEndpoints: {
    realReadAdapterFailureTaxonomyJson: string;
    realReadAdapterFailureTaxonomyMarkdown: string;
    realReadAdapterRehearsalJson: string;
    realReadAdapterOperatorWindowRunbookJson: string;
  };
  nextActions: string[];
}

export type FailureClass =
  | "closed-window"
  | "connection-refused"
  | "timeout"
  | "invalid-json"
  | "unsafe-surface"
  | "unexpected-write-signal"
  | "passed-read"
  | "unclassified-upstream-error";

interface UpstreamFailureTaxonomyReference {
  project: "advanced-order-platform" | "mini-kv";
  version: "Java v68" | "mini-kv v77";
  tag: string;
  evidenceKind: string;
  evidencePath: string;
  supportedClasses: string[];
  readOnly: true;
  executionAllowed: false;
}

export interface RealReadAdapterFailureClassification {
  recordId: RealReadAdapterRehearsalRecord["id"];
  target: string;
  adapterStatus: RealReadAdapterRehearsalRecord["adapterStatus"];
  sourceStatus: RealReadAdapterRehearsalRecord["sourceStatus"];
  attempted: boolean;
  failureClass: FailureClass;
  severity: "none" | "info" | "warning" | "blocker";
  source: "runtime-config" | "network" | "protocol" | "adapter-safety" | "upstream-taxonomy";
  message: string;
  recommendedAction: string;
}

interface RealReadAdapterFailureTaxonomyMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "real-read-adapter-failure-taxonomy" | "real-read-adapter-rehearsal" | "operator-window-runbook" | "runtime-config";
  message: string;
}

const SUPPORTED_CLASSES: FailureClass[] = [
  "closed-window",
  "connection-refused",
  "timeout",
  "invalid-json",
  "unsafe-surface",
  "unexpected-write-signal",
  "passed-read",
  "unclassified-upstream-error",
];

const JAVA_V68_FAILURE_TAXONOMY: UpstreamFailureTaxonomyReference = Object.freeze({
  project: "advanced-order-platform",
  version: "Java v68",
  tag: "v68订单平台release-approval-failure-taxonomy",
  evidenceKind: "release-approval-rehearsal-failure-taxonomy",
  evidencePath: "代码讲解记录_生产雏形阶段/72-version-68-release-approval-failure-taxonomy.md",
  supportedClasses: [
    "upstream readiness",
    "auth-context warning",
    "audit-correlation warning",
  ],
  readOnly: true,
  executionAllowed: false,
});

const MINI_KV_V77_FAILURE_TAXONOMY: UpstreamFailureTaxonomyReference = Object.freeze({
  project: "mini-kv",
  version: "mini-kv v77",
  tag: "第七十七版运行时烟测失败分类",
  evidenceKind: "runtime-smoke-failure-taxonomy",
  evidencePath: "c/77/解释/说明.md",
  supportedClasses: [
    "connection-failed",
    "json-parse-failed",
    "read-command-failed",
    "unsafe-surface",
    "unexpected-write-signal",
  ],
  readOnly: true,
  executionAllowed: false,
});

const JAVA_FAILURE_TAXONOMY_VERSION = "Java v68" as const;
const MINI_KV_FAILURE_TAXONOMY_VERSION = "mini-kv v77" as const;

const ENDPOINTS = Object.freeze({
  realReadAdapterFailureTaxonomyJson: "/api/v1/production/real-read-adapter-failure-taxonomy",
  realReadAdapterFailureTaxonomyMarkdown: "/api/v1/production/real-read-adapter-failure-taxonomy?format=markdown",
  realReadAdapterRehearsalJson: "/api/v1/production/real-read-adapter-rehearsal",
  realReadAdapterOperatorWindowRunbookJson: "/api/v1/production/real-read-adapter-operator-window-runbook",
});

export async function loadRealReadAdapterFailureTaxonomy(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<RealReadAdapterFailureTaxonomyProfile> {
  const adapter = await loadRealReadAdapterRehearsal(input);
  const operatorWindow = loadRealReadAdapterOperatorWindowRunbook(input.config);
  const classifications = adapter.records.map((record) => classifyRecord(record, input.config));
  const checks = createChecks(input.config, adapter, operatorWindow.readyForRealReadAdapterOperatorWindow, classifications);
  checks.readyForRealReadAdapterFailureTaxonomy = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadAdapterFailureTaxonomy")
    .every(([, value]) => value);
  const taxonomyState = determineTaxonomyState(input.config, adapter, classifications, checks);
  const productionBlockers = collectProductionBlockers(checks, classifications);
  const warnings = collectWarnings(input.config, taxonomyState, classifications);
  const recommendations = collectRecommendations(taxonomyState);
  const taxonomyDigest = sha256StableJson({
    profileVersion: "real-read-adapter-failure-taxonomy.v1",
    sourceAdapterDigest: adapter.adapter.adapterDigest,
    sourceAdapterState: adapter.rehearsalState,
    operatorWindowRunbookVersion: operatorWindow.profileVersion,
    javaFailureTaxonomyVersion: JAVA_V68_FAILURE_TAXONOMY.version,
    miniKvFailureTaxonomyVersion: MINI_KV_V77_FAILURE_TAXONOMY.version,
    classifications: classifications.map((item) => ({
      recordId: item.recordId,
      failureClass: item.failureClass,
      severity: item.severity,
      source: item.source,
    })),
    checks,
  });

  return {
    service: "orderops-node",
    title: "Real-read adapter failure taxonomy",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-adapter-failure-taxonomy.v1",
    taxonomyState,
    readyForRealReadAdapterFailureTaxonomy: checks.readyForRealReadAdapterFailureTaxonomy,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    taxonomy: {
      taxonomyDigest,
      sourceAdapterDigest: adapter.adapter.adapterDigest,
      sourceAdapterProfileVersion: adapter.profileVersion,
      operatorWindowRunbookVersion: operatorWindow.profileVersion,
      javaFailureTaxonomyVersion: JAVA_FAILURE_TAXONOMY_VERSION,
      miniKvFailureTaxonomyVersion: MINI_KV_FAILURE_TAXONOMY_VERSION,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      productionWriteAuthorized: false,
      supportedClasses: [...SUPPORTED_CLASSES],
    },
    checks,
    upstreamEvidence: {
      java: { ...JAVA_V68_FAILURE_TAXONOMY, supportedClasses: [...JAVA_V68_FAILURE_TAXONOMY.supportedClasses] },
      miniKv: { ...MINI_KV_V77_FAILURE_TAXONOMY, supportedClasses: [...MINI_KV_V77_FAILURE_TAXONOMY.supportedClasses] },
    },
    classifications,
    summary: createSummary(checks, classifications, productionBlockers, warnings, recommendations),
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use closed-window classifications as the default local baseline when Java and mini-kv are not manually running.",
      "During an approved manual window, keep UPSTREAM_ACTIONS_ENABLED=false and classify skipped reads before archiving.",
      "Proceed to Node v194 only after this taxonomy remains stable against Java v68 and mini-kv v77 evidence.",
    ],
  };
}

export function renderRealReadAdapterFailureTaxonomyMarkdown(
  profile: RealReadAdapterFailureTaxonomyProfile,
): string {
  return [
    "# Real-read adapter failure taxonomy",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Taxonomy state: ${profile.taxonomyState}`,
    `- Ready for real-read adapter failure taxonomy: ${profile.readyForRealReadAdapterFailureTaxonomy}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Taxonomy",
    "",
    ...renderEntries(profile.taxonomy),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Upstream Evidence",
    "",
    "### Java",
    "",
    ...renderEntries(profile.upstreamEvidence.java),
    "",
    "### mini-kv",
    "",
    ...renderEntries(profile.upstreamEvidence.miniKv),
    "",
    "## Classifications",
    "",
    ...profile.classifications.flatMap(renderClassification),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read adapter failure taxonomy blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read adapter failure taxonomy warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read adapter failure taxonomy recommendations."),
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

function classifyRecord(
  record: RealReadAdapterRehearsalRecord,
  config: AppConfig,
): RealReadAdapterFailureClassification {
  if (!record.allowedByAdapter) {
    return createClassification(
      record,
      "unsafe-surface",
      "blocker",
      "adapter-safety",
      "The adapter record is outside the approved real-read surface.",
      "Remove the probe from the real-read adapter surface before opening a manual window.",
    );
  }

  if (record.readOnly !== true || record.mutatesState !== false) {
    return createClassification(
      record,
      "unexpected-write-signal",
      "blocker",
      "adapter-safety",
      "The adapter record reports a write signal.",
      "Stop the window and inspect the probe definition before collecting more evidence.",
    );
  }

  if (record.adapterStatus === "passed-read") {
    return createClassification(
      record,
      "passed-read",
      "none",
      "upstream-taxonomy",
      "The read-only probe returned evidence.",
      "Keep the record as pass evidence for the later archive step.",
    );
  }

  if (!config.upstreamProbesEnabled && !record.attempted && record.adapterStatus === "skipped-read") {
    return createClassification(
      record,
      "closed-window",
      "info",
      "runtime-config",
      "The manual probe window is closed, so this read was intentionally skipped.",
      "Open a manual operator window only when Java and mini-kv are started outside Node.",
    );
  }

  const normalizedMessage = record.message.toLowerCase();
  if (normalizedMessage.includes("timeout") || normalizedMessage.includes("timed out")) {
    return createClassification(
      record,
      "timeout",
      "warning",
      "network",
      record.message,
      "Confirm the upstream is healthy and increase no timeouts unless the operator window policy allows it.",
    );
  }

  if (normalizedMessage.includes("invalid") && normalizedMessage.includes("json")) {
    return createClassification(
      record,
      "invalid-json",
      "warning",
      "protocol",
      record.message,
      "Check the upstream JSON contract and compare it with Java v68 or mini-kv v77 evidence.",
    );
  }

  if (
    normalizedMessage.includes("unavailable")
    || normalizedMessage.includes("connection refused")
    || normalizedMessage.includes("econnrefused")
    || normalizedMessage.includes("closed the connection")
  ) {
    return createClassification(
      record,
      "connection-refused",
      "warning",
      "network",
      record.message,
      "Confirm the operator actually started the matching upstream service and port.",
    );
  }

  return createClassification(
    record,
    "unclassified-upstream-error",
    "warning",
    "upstream-taxonomy",
    record.message,
    "Keep the result as non-pass evidence and extend Java or mini-kv taxonomy if this class repeats.",
  );
}

function createClassification(
  record: RealReadAdapterRehearsalRecord,
  failureClass: FailureClass,
  severity: RealReadAdapterFailureClassification["severity"],
  source: RealReadAdapterFailureClassification["source"],
  message: string,
  recommendedAction: string,
): RealReadAdapterFailureClassification {
  return {
    recordId: record.id,
    target: record.target,
    adapterStatus: record.adapterStatus,
    sourceStatus: record.sourceStatus,
    attempted: record.attempted,
    failureClass,
    severity,
    source,
    message,
    recommendedAction,
  };
}

function createChecks(
  config: AppConfig,
  adapter: RealReadAdapterRehearsalProfile,
  operatorWindowReady: boolean,
  classifications: RealReadAdapterFailureClassification[],
): RealReadAdapterFailureTaxonomyProfile["checks"] {
  return {
    adapterReviewReady: adapter.readyForRealReadAdapterReview,
    operatorWindowReady,
    javaV68TaxonomyAccepted: JAVA_V68_FAILURE_TAXONOMY.readOnly
      && JAVA_V68_FAILURE_TAXONOMY.executionAllowed === false
      && JAVA_V68_FAILURE_TAXONOMY.supportedClasses.includes("upstream readiness"),
    miniKvV77TaxonomyAccepted: MINI_KV_V77_FAILURE_TAXONOMY.readOnly
      && MINI_KV_V77_FAILURE_TAXONOMY.executionAllowed === false
      && MINI_KV_V77_FAILURE_TAXONOMY.supportedClasses.includes("unsafe-surface"),
    allRecordsClassified: adapter.records.length === classifications.length
      && classifications.every((item) => SUPPORTED_CLASSES.includes(item.failureClass)),
    closedWindowClassifiedWhenProbesDisabled: config.upstreamProbesEnabled
      || classifications.every((item) => item.failureClass === "closed-window"),
    unsafeSurfaceBlocked: classifications
      .filter((item) => item.failureClass === "unsafe-surface")
      .every((item) => item.severity === "blocker"),
    unexpectedWriteSignalBlocked: classifications
      .filter((item) => item.failureClass === "unexpected-write-signal")
      .every((item) => item.severity === "blocker"),
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    noAutomaticUpstreamStart: true,
    readyForProductionOperationsStillFalse: true,
    readyForRealReadAdapterFailureTaxonomy: false,
  };
}

function determineTaxonomyState(
  config: AppConfig,
  adapter: RealReadAdapterRehearsalProfile,
  classifications: RealReadAdapterFailureClassification[],
  checks: RealReadAdapterFailureTaxonomyProfile["checks"],
): RealReadAdapterFailureTaxonomyProfile["taxonomyState"] {
  if (!checks.readyForRealReadAdapterFailureTaxonomy || classifications.some((item) => item.severity === "blocker")) {
    return "blocked";
  }
  if (!config.upstreamProbesEnabled || adapter.rehearsalState === "closed-skipped") {
    return "closed-window-classified";
  }
  return classifications.every((item) => item.failureClass === "passed-read")
    ? "open-pass-classified"
    : "open-failure-classified";
}

function createSummary(
  checks: RealReadAdapterFailureTaxonomyProfile["checks"],
  classifications: RealReadAdapterFailureClassification[],
  productionBlockers: RealReadAdapterFailureTaxonomyMessage[],
  warnings: RealReadAdapterFailureTaxonomyMessage[],
  recommendations: RealReadAdapterFailureTaxonomyMessage[],
): RealReadAdapterFailureTaxonomyProfile["summary"] {
  const count = (failureClass: FailureClass) => classifications.filter((item) => item.failureClass === failureClass).length;
  return {
    classificationCount: classifications.length,
    closedWindowCount: count("closed-window"),
    connectionRefusedCount: count("connection-refused"),
    timeoutCount: count("timeout"),
    invalidJsonCount: count("invalid-json"),
    unsafeSurfaceCount: count("unsafe-surface"),
    unexpectedWriteSignalCount: count("unexpected-write-signal"),
    passedReadCount: count("passed-read"),
    runbookCheckCount: countReportChecks(checks),
    passedRunbookCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RealReadAdapterFailureTaxonomyProfile["checks"],
  classifications: RealReadAdapterFailureClassification[],
): RealReadAdapterFailureTaxonomyMessage[] {
  const blockers: RealReadAdapterFailureTaxonomyMessage[] = [];
  addMessage(blockers, checks.adapterReviewReady, "ADAPTER_REHEARSAL_NOT_READY", "real-read-adapter-rehearsal", "v191 real-read adapter rehearsal must be ready.");
  addMessage(blockers, checks.operatorWindowReady, "OPERATOR_WINDOW_RUNBOOK_NOT_READY", "operator-window-runbook", "v192 operator window runbook must be ready.");
  addMessage(blockers, checks.javaV68TaxonomyAccepted, "JAVA_V68_TAXONOMY_NOT_ACCEPTED", "real-read-adapter-failure-taxonomy", "Java v68 read-only failure taxonomy evidence must be accepted.");
  addMessage(blockers, checks.miniKvV77TaxonomyAccepted, "MINI_KV_V77_TAXONOMY_NOT_ACCEPTED", "real-read-adapter-failure-taxonomy", "mini-kv v77 runtime smoke taxonomy evidence must be accepted.");
  addMessage(blockers, checks.allRecordsClassified, "ADAPTER_RECORD_UNCLASSIFIED", "real-read-adapter-failure-taxonomy", "Every adapter record must have a supported failure class.");
  addMessage(blockers, checks.closedWindowClassifiedWhenProbesDisabled, "CLOSED_WINDOW_NOT_CLASSIFIED", "runtime-config", "Closed windows must classify all records as closed-window.");
  addMessage(blockers, checks.unsafeSurfaceBlocked, "UNSAFE_SURFACE_NOT_BLOCKED", "real-read-adapter-failure-taxonomy", "Unsafe adapter surface must be a blocker.");
  addMessage(blockers, checks.unexpectedWriteSignalBlocked, "WRITE_SIGNAL_NOT_BLOCKED", "real-read-adapter-failure-taxonomy", "Unexpected write signals must be blockers.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "operator-window-runbook", "Node must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Failure taxonomy must not unlock production operations.");

  for (const item of classifications.filter((classification) => classification.severity === "blocker")) {
    blockers.push({
      code: `CLASSIFICATION_${item.failureClass.toUpperCase().replace(/-/g, "_")}`,
      severity: "blocker",
      source: "real-read-adapter-failure-taxonomy",
      message: `${item.recordId} is classified as ${item.failureClass}: ${item.message}`,
    });
  }

  return blockers;
}

function collectWarnings(
  config: AppConfig,
  taxonomyState: RealReadAdapterFailureTaxonomyProfile["taxonomyState"],
  classifications: RealReadAdapterFailureClassification[],
): RealReadAdapterFailureTaxonomyMessage[] {
  const warningClassCount = classifications.filter((item) => item.severity === "warning").length;
  return [
    {
      code: taxonomyState === "closed-window-classified"
        ? "CLOSED_WINDOW_BASELINE_CLASSIFIED"
        : taxonomyState === "open-pass-classified"
          ? "OPEN_WINDOW_PASS_CLASSIFIED"
          : "OPEN_WINDOW_FAILURES_CLASSIFIED",
      severity: "warning",
      source: "real-read-adapter-failure-taxonomy",
      message: taxonomyState === "closed-window-classified"
        ? "Default closed-window evidence is classified without contacting Java or mini-kv."
        : `${warningClassCount} enabled-window read records require operator review.`,
    },
    {
      code: config.upstreamProbesEnabled ? "PROBES_ENABLED_FOR_TAXONOMY" : "PROBES_DISABLED_FOR_TAXONOMY",
      severity: "warning",
      source: "runtime-config",
      message: config.upstreamProbesEnabled
        ? "Taxonomy consumed enabled live-probe results from an operator window."
        : "Taxonomy consumed skipped results because the manual window is closed.",
    },
  ];
}

function collectRecommendations(
  taxonomyState: RealReadAdapterFailureTaxonomyProfile["taxonomyState"],
): RealReadAdapterFailureTaxonomyMessage[] {
  return [
    {
      code: taxonomyState === "blocked"
        ? "FIX_TAXONOMY_BLOCKERS"
        : "PROCEED_TO_V194_ARCHIVE",
      severity: "recommendation",
      source: "real-read-adapter-failure-taxonomy",
      message: taxonomyState === "blocked"
        ? "Fix blockers before archiving real-read adapter evidence."
        : "Proceed to Node v194 evidence archive after preserving this taxonomy output.",
    },
  ];
}

function addMessage(
  messages: RealReadAdapterFailureTaxonomyMessage[],
  condition: boolean,
  code: string,
  source: RealReadAdapterFailureTaxonomyMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderClassification(classification: RealReadAdapterFailureClassification): string[] {
  return [
    `### ${classification.recordId}`,
    "",
    `- Target: ${classification.target}`,
    `- Adapter status: ${classification.adapterStatus}`,
    `- Source status: ${classification.sourceStatus}`,
    `- Attempted: ${classification.attempted}`,
    `- Failure class: ${classification.failureClass}`,
    `- Severity: ${classification.severity}`,
    `- Source: ${classification.source}`,
    `- Message: ${classification.message}`,
    `- Recommended action: ${classification.recommendedAction}`,
    "",
  ];
}
