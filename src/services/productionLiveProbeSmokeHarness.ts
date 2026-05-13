import { AppHttpError } from "../errors.js";
import type { AppConfig } from "../config.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import {
  createProductionLiveProbeReadinessContract,
} from "./productionLiveProbeReadinessContract.js";
import type { ProductionLiveProbeDefinition } from "./productionLiveProbeReadinessContract.js";

export interface ProductionLiveProbeSmokeHarnessProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-smoke-harness.v1";
  readyForLiveProbeEvidence: boolean;
  readyForProductionConnections: false;
  readOnly: true;
  executionAllowed: false;
  probesEnabled: boolean;
  checks: {
    contractReady: boolean;
    probeSetMatchesContract: boolean;
    allProbeResultsRecorded: boolean;
    skippedAllowed: boolean;
    writeProbeAttempted: false;
    javaWritesAttempted: false;
    miniKvWritesAttempted: false;
    upstreamActionsStillDisabled: boolean;
    readyForLiveProbeEvidence: boolean;
  };
  results: ProductionLiveProbeResult[];
  summary: {
    probeCount: number;
    passedProbeCount: number;
    skippedProbeCount: number;
    blockedProbeCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeSmokeMessage[];
  warnings: ProductionLiveProbeSmokeMessage[];
  recommendations: ProductionLiveProbeSmokeMessage[];
  evidenceEndpoints: {
    productionLiveProbeSmokeHarnessJson: string;
    productionLiveProbeSmokeHarnessMarkdown: string;
    productionLiveProbeReadinessContractJson: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeResult {
  id: ProductionLiveProbeDefinition["id"];
  status: "pass" | "skipped" | "blocked";
  target: string;
  protocol: ProductionLiveProbeDefinition["protocol"];
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  latencyMs?: number;
  statusCode?: number;
  message: string;
  evidence?: unknown;
}

export interface ProductionLiveProbeSmokeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "live-probe-smoke-harness" | "live-probe-contract" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
  productionLiveProbeSmokeHarnessMarkdown: "/api/v1/production/live-probe-smoke-harness?format=markdown",
  productionLiveProbeReadinessContractJson: "/api/v1/production/live-probe-readiness-contract",
});

export async function loadProductionLiveProbeSmokeHarness(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeSmokeHarnessProfile> {
  const contract = createProductionLiveProbeReadinessContract(input.config);
  const plannedProbes = [
    ...contract.targets.javaOrderPlatform.plannedProbes,
    ...contract.targets.miniKv.plannedProbes,
  ];
  const results = input.config.upstreamProbesEnabled
    ? await runLiveProbes(input, plannedProbes)
    : plannedProbes.map((probe) => skippedResult(probe, "UPSTREAM_PROBES_ENABLED=false; live probe smoke skipped by configuration."));
  const checks = {
    contractReady: contract.readyForLiveProbePlanning,
    probeSetMatchesContract: results.length === plannedProbes.length
      && plannedProbes.every((probe) => results.some((result) => result.id === probe.id)),
    allProbeResultsRecorded: results.length === plannedProbes.length,
    skippedAllowed: results.every((result) => result.status === "pass" || result.status === "skipped"),
    writeProbeAttempted: false as const,
    javaWritesAttempted: false as const,
    miniKvWritesAttempted: false as const,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForLiveProbeEvidence: false,
  };
  checks.readyForLiveProbeEvidence = checks.contractReady
    && checks.probeSetMatchesContract
    && checks.allProbeResultsRecorded
    && checks.skippedAllowed
    && checks.upstreamActionsStillDisabled;
  const productionBlockers = collectProductionBlockers(checks, results);
  const warnings = collectWarnings(input.config.upstreamProbesEnabled, results);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production live probe smoke harness",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-smoke-harness.v1",
    readyForLiveProbeEvidence: checks.readyForLiveProbeEvidence,
    readyForProductionConnections: false,
    readOnly: true,
    executionAllowed: false,
    probesEnabled: input.config.upstreamProbesEnabled,
    checks,
    results,
    summary: {
      probeCount: results.length,
      passedProbeCount: results.filter((result) => result.status === "pass").length,
      skippedProbeCount: results.filter((result) => result.status === "skipped").length,
      blockedProbeCount: results.filter((result) => result.status === "blocked").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep skipped evidence acceptable for local development when Java or mini-kv are not running.",
      "When the user explicitly starts Java and mini-kv, rerun the harness with UPSTREAM_PROBES_ENABLED=true for read-only live evidence.",
      "Never add write probes or enable UPSTREAM_ACTIONS_ENABLED for this smoke harness.",
    ],
  };
}

export function renderProductionLiveProbeSmokeHarnessMarkdown(
  profile: ProductionLiveProbeSmokeHarnessProfile,
): string {
  return [
    "# Production live probe smoke harness",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for live probe evidence: ${profile.readyForLiveProbeEvidence}`,
    `- Ready for production connections: ${profile.readyForProductionConnections}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Probes enabled: ${profile.probesEnabled}`,
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Results",
    "",
    ...profile.results.flatMap(renderResult),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No live probe smoke blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No live probe smoke warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No live probe smoke recommendations."),
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

async function runLiveProbes(input: {
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}, plannedProbes: ProductionLiveProbeDefinition[]): Promise<ProductionLiveProbeResult[]> {
  const results: ProductionLiveProbeResult[] = [];
  for (const probe of plannedProbes) {
    results.push(await runProbe(input, probe));
  }
  return results;
}

async function runProbe(input: {
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}, probe: ProductionLiveProbeDefinition): Promise<ProductionLiveProbeResult> {
  try {
    switch (probe.id) {
      case "java-actuator-health": {
        const response = await input.orderPlatform.health();
        return passedResult(probe, response.latencyMs, response.statusCode, summarizeEvidence(response.data));
      }
      case "java-ops-overview": {
        const response = await input.orderPlatform.opsOverview();
        return passedResult(probe, response.latencyMs, response.statusCode, summarizeEvidence(response.data));
      }
      case "mini-kv-health": {
        const result = await input.miniKv.health();
        return passedResult(probe, result.latencyMs, undefined, { response: result.response });
      }
      case "mini-kv-infojson": {
        const result = await input.miniKv.infoJson();
        return passedResult(probe, result.latencyMs, undefined, summarizeEvidence(result.info));
      }
      case "mini-kv-statsjson": {
        const result = await input.miniKv.statsJson();
        return passedResult(probe, result.latencyMs, undefined, summarizeEvidence(result.stats));
      }
    }
  } catch (error) {
    return skippedResult(probe, summarizeProbeError(error));
  }
}

function passedResult(
  probe: ProductionLiveProbeDefinition,
  latencyMs: number,
  statusCode: number | undefined,
  evidence: unknown,
): ProductionLiveProbeResult {
  return {
    id: probe.id,
    status: "pass",
    target: probe.target,
    protocol: probe.protocol,
    readOnly: true,
    mutatesState: false,
    attempted: true,
    latencyMs,
    statusCode,
    message: "Read-only live probe returned evidence.",
    evidence,
  };
}

function skippedResult(probe: ProductionLiveProbeDefinition, message: string): ProductionLiveProbeResult {
  return {
    id: probe.id,
    status: "skipped",
    target: probe.target,
    protocol: probe.protocol,
    readOnly: true,
    mutatesState: false,
    attempted: false,
    message,
  };
}

function collectProductionBlockers(
  checks: ProductionLiveProbeSmokeHarnessProfile["checks"],
  results: ProductionLiveProbeResult[],
): ProductionLiveProbeSmokeMessage[] {
  const blockers: ProductionLiveProbeSmokeMessage[] = [];
  addMessage(blockers, checks.contractReady, "LIVE_PROBE_CONTRACT_NOT_READY", "live-probe-contract", "Live probe readiness contract must be ready before smoke evidence.");
  addMessage(blockers, checks.probeSetMatchesContract, "LIVE_PROBE_SET_MISMATCH", "live-probe-smoke-harness", "Smoke harness results must match the contract probe set.");
  addMessage(blockers, checks.allProbeResultsRecorded, "LIVE_PROBE_RESULTS_INCOMPLETE", "live-probe-smoke-harness", "Every contract probe must produce pass or skipped evidence.");
  addMessage(blockers, results.every((result) => result.status !== "blocked"), "LIVE_PROBE_BLOCKED", "live-probe-smoke-harness", "Live probe smoke must not record blocked probes.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false for live probe smoke.");
  return blockers;
}

function collectWarnings(
  probesEnabled: boolean,
  results: ProductionLiveProbeResult[],
): ProductionLiveProbeSmokeMessage[] {
  if (!probesEnabled) {
    return [
      {
        code: "LIVE_PROBES_SKIPPED_BY_CONFIG",
        severity: "warning",
        source: "runtime-config",
        message: "UPSTREAM_PROBES_ENABLED=false, so live probes were skipped intentionally.",
      },
    ];
  }

  const skippedCount = results.filter((result) => result.status === "skipped").length;
  return [
    {
      code: skippedCount > 0 ? "LIVE_PROBES_SKIPPED_UPSTREAM_UNAVAILABLE" : "LIVE_PROBES_PASSED",
      severity: "warning",
      source: "live-probe-smoke-harness",
      message: skippedCount > 0
        ? "One or more read-only probes were skipped because the upstream was unavailable or returned an error."
        : "All enabled read-only live probes returned evidence.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeSmokeMessage[] {
  return [
    {
      code: "CONNECT_TO_SUMMARY_V13",
      severity: "recommendation",
      source: "live-probe-smoke-harness",
      message: "Use this smoke harness as input to production readiness summary v13.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeSmokeMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeSmokeMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function summarizeProbeError(error: unknown): string {
  if (error instanceof AppHttpError) {
    return `${error.code}: ${error.message}`;
  }
  return error instanceof Error ? error.message : String(error);
}

function summarizeEvidence(value: unknown): unknown {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  const record = value as Record<string, unknown>;
  const summary: Record<string, unknown> = {};
  for (const key of Object.keys(record).slice(0, 8)) {
    const item = record[key];
    summary[key] = typeof item === "object" && item !== null ? "[object]" : item;
  }
  return summary;
}

function renderResult(result: ProductionLiveProbeResult): string[] {
  return [
    `### ${result.id}`,
    "",
    `- Status: ${result.status}`,
    `- Target: ${result.target}`,
    `- Protocol: ${result.protocol}`,
    `- Read only: ${result.readOnly}`,
    `- Mutates state: ${result.mutatesState}`,
    `- Attempted: ${result.attempted}`,
    `- Latency ms: ${result.latencyMs ?? "n/a"}`,
    `- Status code: ${result.statusCode ?? "n/a"}`,
    `- Message: ${result.message}`,
    `- Evidence: ${formatValue(result.evidence)}`,
    "",
  ];
}

function renderMessages(messages: ProductionLiveProbeSmokeMessage[], emptyText: string): string[] {
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
    return "n/a";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
