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
  loadProductionLiveProbeSmokeHarness,
} from "./productionLiveProbeSmokeHarness.js";
import type {
  ProductionLiveProbeResult,
  ProductionLiveProbeSmokeHarnessProfile,
} from "./productionLiveProbeSmokeHarness.js";

export interface RealReadAdapterRehearsalProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-adapter-rehearsal.v1";
  rehearsalState: "closed-skipped" | "open-pass" | "open-mixed" | "blocked";
  readyForRealReadAdapterReview: boolean;
  readyForProductionPassEvidenceCandidate: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  adapter: {
    adapterDigest: string;
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    manualJavaStartRequired: true;
    manualMiniKvStartRequired: true;
    javaDependencyVersion: "Java v67";
    miniKvDependencyVersion: "mini-kv v76";
    allowedJavaMethods: readonly ["GET"];
    allowedJavaPaths: readonly ["/actuator/health", "/api/v1/ops/overview"];
    allowedMiniKvCommands: readonly ["HEALTH", "INFOJSON", "STATSJSON"];
    forbiddenMiniKvCommands: readonly ["SET", "DEL", "EXPIRE", "LOAD", "COMPACT", "SETNXEX", "RESTORE"];
    smokeHarnessProfileVersion: ProductionLiveProbeSmokeHarnessProfile["profileVersion"];
    plannedProbeCount: number;
    attemptedProbeCount: number;
    passedProbeCount: number;
    skippedProbeCount: number;
    blockedProbeCount: number;
  };
  checks: {
    javaV67EvidenceAccepted: boolean;
    miniKvV76EvidenceAccepted: boolean;
    smokeHarnessReady: boolean;
    allowedAdapterSurfaceOnly: boolean;
    allProbeResultsRecorded: boolean;
    allProbeResultsReadOnly: boolean;
    noWriteProbeAttempted: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    closedWindowSkipsWithoutAttempt: boolean;
    passEvidenceRequiresOpenWindow: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForRealReadAdapterReview: boolean;
    readyForProductionPassEvidenceCandidate: boolean;
  };
  records: RealReadAdapterRehearsalRecord[];
  summary: {
    recordCount: number;
    attemptedProbeCount: number;
    passedProbeCount: number;
    skippedProbeCount: number;
    blockedProbeCount: number;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RealReadAdapterRehearsalMessage[];
  warnings: RealReadAdapterRehearsalMessage[];
  recommendations: RealReadAdapterRehearsalMessage[];
  evidenceEndpoints: {
    realReadAdapterRehearsalJson: string;
    realReadAdapterRehearsalMarkdown: string;
    productionLiveProbeSmokeHarnessJson: string;
    productionLiveProbeReadinessContractJson: string;
  };
  nextActions: string[];
}

export interface RealReadAdapterRehearsalRecord {
  id: ProductionLiveProbeResult["id"];
  target: string;
  protocol: ProductionLiveProbeResult["protocol"];
  adapterStatus: "passed-read" | "skipped-read" | "blocked";
  sourceStatus: ProductionLiveProbeResult["status"];
  attempted: boolean;
  readOnly: true;
  mutatesState: false;
  allowedByAdapter: boolean;
  latencyMs?: number;
  statusCode?: number;
  message: string;
  evidenceSummary?: unknown;
}

interface RealReadAdapterRehearsalMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "real-read-adapter-rehearsal" | "smoke-harness" | "runtime-config" | "cross-project-evidence";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadAdapterRehearsalJson: "/api/v1/production/real-read-adapter-rehearsal",
  realReadAdapterRehearsalMarkdown: "/api/v1/production/real-read-adapter-rehearsal?format=markdown",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
  productionLiveProbeReadinessContractJson: "/api/v1/production/live-probe-readiness-contract",
});

const ALLOWED_JAVA_PATHS = ["/actuator/health", "/api/v1/ops/overview"] as const;
const ALLOWED_MINI_KV_COMMANDS = ["HEALTH", "INFOJSON", "STATSJSON"] as const;
const FORBIDDEN_MINI_KV_COMMANDS = ["SET", "DEL", "EXPIRE", "LOAD", "COMPACT", "SETNXEX", "RESTORE"] as const;

export async function loadRealReadAdapterRehearsal(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<RealReadAdapterRehearsalProfile> {
  const smokeHarness = await loadProductionLiveProbeSmokeHarness(input);
  const records = smokeHarness.results.map(createRecord);
  const checks = createChecks(input.config, smokeHarness, records);
  const rehearsalState = determineRehearsalState(input.config, records, checks);
  const productionBlockers = collectProductionBlockers(checks, records);
  const warnings = collectWarnings(input.config, rehearsalState, records);
  const recommendations = collectRecommendations(rehearsalState);
  const adapterDigest = sha256StableJson({
    profileVersion: "real-read-adapter-rehearsal.v1",
    rehearsalState,
    upstreamProbesEnabled: input.config.upstreamProbesEnabled,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    records: records.map((record) => ({
      id: record.id,
      adapterStatus: record.adapterStatus,
      attempted: record.attempted,
      allowedByAdapter: record.allowedByAdapter,
    })),
    checks,
  });

  return {
    service: "orderops-node",
    title: "Real-read adapter rehearsal",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-adapter-rehearsal.v1",
    rehearsalState,
    readyForRealReadAdapterReview: checks.readyForRealReadAdapterReview,
    readyForProductionPassEvidenceCandidate: checks.readyForProductionPassEvidenceCandidate,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    adapter: {
      adapterDigest,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      manualJavaStartRequired: true,
      manualMiniKvStartRequired: true,
      javaDependencyVersion: "Java v67",
      miniKvDependencyVersion: "mini-kv v76",
      allowedJavaMethods: ["GET"],
      allowedJavaPaths: ALLOWED_JAVA_PATHS,
      allowedMiniKvCommands: ALLOWED_MINI_KV_COMMANDS,
      forbiddenMiniKvCommands: FORBIDDEN_MINI_KV_COMMANDS,
      smokeHarnessProfileVersion: smokeHarness.profileVersion,
      plannedProbeCount: records.length,
      attemptedProbeCount: records.filter((record) => record.attempted).length,
      passedProbeCount: records.filter((record) => record.adapterStatus === "passed-read").length,
      skippedProbeCount: records.filter((record) => record.adapterStatus === "skipped-read").length,
      blockedProbeCount: records.filter((record) => record.adapterStatus === "blocked").length,
    },
    checks,
    records,
    summary: {
      recordCount: records.length,
      attemptedProbeCount: records.filter((record) => record.attempted).length,
      passedProbeCount: records.filter((record) => record.adapterStatus === "passed-read").length,
      skippedProbeCount: records.filter((record) => record.adapterStatus === "skipped-read").length,
      blockedProbeCount: records.filter((record) => record.adapterStatus === "blocked").length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this rehearsal closed by default with UPSTREAM_PROBES_ENABLED=false.",
      "When the operator manually starts Java and mini-kv, rerun with UPSTREAM_PROBES_ENABLED=true and UPSTREAM_ACTIONS_ENABLED=false.",
      "Treat pass evidence as a read-only adapter candidate only; production operations remain separately gated.",
    ],
  };
}

export function renderRealReadAdapterRehearsalMarkdown(profile: RealReadAdapterRehearsalProfile): string {
  return [
    "# Real-read adapter rehearsal",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Rehearsal state: ${profile.rehearsalState}`,
    `- Ready for real-read adapter review: ${profile.readyForRealReadAdapterReview}`,
    `- Ready for production pass evidence candidate: ${profile.readyForProductionPassEvidenceCandidate}`,
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
    ...renderMessages(profile.productionBlockers, "No real-read adapter rehearsal blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read adapter rehearsal warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read adapter rehearsal recommendations."),
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

function createRecord(result: ProductionLiveProbeResult): RealReadAdapterRehearsalRecord {
  const allowedByAdapter = isAllowedAdapterProbe(result);
  return {
    id: result.id,
    target: result.target,
    protocol: result.protocol,
    adapterStatus: allowedByAdapter
      ? result.status === "pass" ? "passed-read" : result.status === "skipped" ? "skipped-read" : "blocked"
      : "blocked",
    sourceStatus: result.status,
    attempted: result.attempted,
    readOnly: true,
    mutatesState: false,
    allowedByAdapter,
    latencyMs: result.latencyMs,
    statusCode: result.statusCode,
    message: result.message,
    evidenceSummary: result.evidence,
  };
}

function createChecks(
  config: AppConfig,
  smokeHarness: ProductionLiveProbeSmokeHarnessProfile,
  records: RealReadAdapterRehearsalRecord[],
): RealReadAdapterRehearsalProfile["checks"] {
  const checks = {
    javaV67EvidenceAccepted: true,
    miniKvV76EvidenceAccepted: true,
    smokeHarnessReady: smokeHarness.readyForLiveProbeEvidence,
    allowedAdapterSurfaceOnly: records.every((record) => record.allowedByAdapter),
    allProbeResultsRecorded: records.length === smokeHarness.summary.probeCount && records.length === 5,
    allProbeResultsReadOnly: records.every((record) => record.readOnly && !record.mutatesState),
    noWriteProbeAttempted: smokeHarness.checks.writeProbeAttempted === false
      && smokeHarness.checks.javaWritesAttempted === false
      && smokeHarness.checks.miniKvWritesAttempted === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    noAutomaticUpstreamStart: true,
    closedWindowSkipsWithoutAttempt: config.upstreamProbesEnabled
      || records.every((record) => record.adapterStatus === "skipped-read" && !record.attempted),
    passEvidenceRequiresOpenWindow: !records.some((record) => record.adapterStatus === "passed-read")
      || config.upstreamProbesEnabled,
    readyForProductionOperationsStillFalse: true,
    readyForRealReadAdapterReview: false,
    readyForProductionPassEvidenceCandidate: false,
  };
  checks.readyForRealReadAdapterReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadAdapterReview" && key !== "readyForProductionPassEvidenceCandidate")
    .every(([, value]) => value);
  checks.readyForProductionPassEvidenceCandidate = checks.readyForRealReadAdapterReview
    && config.upstreamProbesEnabled
    && records.length > 0
    && records.every((record) => record.adapterStatus === "passed-read");
  return checks;
}

function determineRehearsalState(
  config: AppConfig,
  records: RealReadAdapterRehearsalRecord[],
  checks: RealReadAdapterRehearsalProfile["checks"],
): RealReadAdapterRehearsalProfile["rehearsalState"] {
  if (!checks.readyForRealReadAdapterReview || records.some((record) => record.adapterStatus === "blocked")) {
    return "blocked";
  }
  if (!config.upstreamProbesEnabled) {
    return "closed-skipped";
  }
  return records.every((record) => record.adapterStatus === "passed-read") ? "open-pass" : "open-mixed";
}

function collectProductionBlockers(
  checks: RealReadAdapterRehearsalProfile["checks"],
  records: RealReadAdapterRehearsalRecord[],
): RealReadAdapterRehearsalMessage[] {
  const blockers: RealReadAdapterRehearsalMessage[] = [];
  addMessage(blockers, checks.smokeHarnessReady, "SMOKE_HARNESS_NOT_READY", "smoke-harness", "The live probe smoke harness must be ready before adapter rehearsal.");
  addMessage(blockers, checks.allowedAdapterSurfaceOnly, "ADAPTER_SURFACE_NOT_ALLOWED", "real-read-adapter-rehearsal", "The adapter may only use Java GET probes and mini-kv read commands.");
  addMessage(blockers, checks.allProbeResultsRecorded, "ADAPTER_RESULTS_INCOMPLETE", "real-read-adapter-rehearsal", "All five planned read probes must be represented.");
  addMessage(blockers, checks.allProbeResultsReadOnly, "ADAPTER_RESULT_NOT_READ_ONLY", "real-read-adapter-rehearsal", "All adapter records must remain read-only.");
  addMessage(blockers, checks.noWriteProbeAttempted, "WRITE_PROBE_ATTEMPTED", "smoke-harness", "The adapter rehearsal must not attempt writes.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "real-read-adapter-rehearsal", "Node must not start Java or mini-kv.");
  addMessage(blockers, records.every((record) => record.adapterStatus !== "blocked"), "ADAPTER_RECORD_BLOCKED", "real-read-adapter-rehearsal", "No adapter record may be blocked.");
  return blockers;
}

function collectWarnings(
  config: AppConfig,
  rehearsalState: RealReadAdapterRehearsalProfile["rehearsalState"],
  records: RealReadAdapterRehearsalRecord[],
): RealReadAdapterRehearsalMessage[] {
  if (!config.upstreamProbesEnabled) {
    return [
      {
        code: "REAL_READ_ADAPTER_REHEARSAL_CLOSED",
        severity: "warning",
        source: "runtime-config",
        message: "UPSTREAM_PROBES_ENABLED=false, so the adapter rehearsal records skipped read evidence without contacting upstreams.",
      },
    ];
  }

  const skipped = records.filter((record) => record.adapterStatus === "skipped-read").length;
  return [
    {
      code: rehearsalState === "open-pass" ? "REAL_READ_ADAPTER_REHEARSAL_PASS" : "REAL_READ_ADAPTER_REHEARSAL_MIXED",
      severity: "warning",
      source: "real-read-adapter-rehearsal",
      message: skipped === 0
        ? "All allowed read probes returned evidence during the manual probe window."
        : "One or more allowed read probes were skipped during the manual probe window.",
    },
  ];
}

function collectRecommendations(
  rehearsalState: RealReadAdapterRehearsalProfile["rehearsalState"],
): RealReadAdapterRehearsalMessage[] {
  return [
    {
      code: rehearsalState === "open-pass" ? "ARCHIVE_PASS_CANDIDATE" : "KEEP_AS_REHEARSAL_EVIDENCE",
      severity: "recommendation",
      source: "real-read-adapter-rehearsal",
      message: rehearsalState === "open-pass"
        ? "Archive this result as a read-only pass candidate, not as production operation approval."
        : "Keep this result as rehearsal evidence and rerun after Java and mini-kv are manually available.",
    },
  ];
}

function isAllowedAdapterProbe(result: ProductionLiveProbeResult): boolean {
  switch (result.id) {
    case "java-actuator-health":
      return result.protocol === "http-get" && result.target.endsWith("/actuator/health");
    case "java-ops-overview":
      return result.protocol === "http-get" && result.target.endsWith("/api/v1/ops/overview");
    case "mini-kv-health":
      return result.protocol === "tcp-inline-command" && result.target === "HEALTH";
    case "mini-kv-infojson":
      return result.protocol === "tcp-inline-command" && result.target === "INFOJSON";
    case "mini-kv-statsjson":
      return result.protocol === "tcp-inline-command" && result.target === "STATSJSON";
  }
}

function addMessage(
  messages: RealReadAdapterRehearsalMessage[],
  condition: boolean,
  code: string,
  source: RealReadAdapterRehearsalMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderRecord(record: RealReadAdapterRehearsalRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Adapter status: ${record.adapterStatus}`,
    `- Source status: ${record.sourceStatus}`,
    `- Target: ${record.target}`,
    `- Protocol: ${record.protocol}`,
    `- Attempted: ${record.attempted}`,
    `- Read only: ${record.readOnly}`,
    `- Mutates state: ${record.mutatesState}`,
    `- Allowed by adapter: ${record.allowedByAdapter}`,
    `- Latency ms: ${record.latencyMs ?? "unknown"}`,
    `- Status code: ${record.statusCode ?? "unknown"}`,
    `- Message: ${record.message}`,
    "",
  ];
}
