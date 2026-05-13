import type { AppConfig } from "../config.js";

export interface ProductionLiveProbeReadinessContract {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-readiness-contract.v1";
  readyForLiveProbePlanning: boolean;
  readOnly: true;
  executionAllowed: false;
  probeAttempted: false;
  targets: {
    javaOrderPlatform: ProductionLiveProbeTarget;
    miniKv: ProductionLiveProbeTarget;
  };
  statusDefinitions: ProductionLiveProbeStatusDefinition[];
  checks: {
    javaReadTargetsDefined: boolean;
    miniKvReadTargetsDefined: boolean;
    statusDefinitionsDefined: boolean;
    noProbeAttempted: boolean;
    writeActionsForbidden: boolean;
    upstreamActionsStillDisabled: boolean;
    readyForLiveProbePlanning: boolean;
  };
  summary: {
    targetCount: number;
    plannedProbeCount: number;
    writeProbeCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionLiveProbeContractMessage[];
  warnings: ProductionLiveProbeContractMessage[];
  recommendations: ProductionLiveProbeContractMessage[];
  evidenceEndpoints: {
    productionLiveProbeReadinessContractJson: string;
    productionLiveProbeReadinessContractMarkdown: string;
    productionReadinessSummaryV12Json: string;
  };
  nextActions: string[];
}

export interface ProductionLiveProbeTarget {
  id: "java-order-platform" | "mini-kv";
  role: "order-transaction-core" | "redis-like-infrastructure-lab";
  endpoint: string;
  startupRequiredByThisContract: false;
  readOnly: true;
  writesAllowed: false;
  plannedProbes: ProductionLiveProbeDefinition[];
  forbiddenActions: string[];
}

export interface ProductionLiveProbeDefinition {
  id:
    | "java-actuator-health"
    | "java-ops-overview"
    | "mini-kv-health"
    | "mini-kv-infojson"
    | "mini-kv-statsjson";
  protocol: "http-get" | "tcp-inline-command";
  target: string;
  expectedStatus: "pass-or-skipped";
  readOnly: true;
  mutatesState: false;
  timeoutMs: number;
}

export interface ProductionLiveProbeStatusDefinition {
  status: "pass" | "skipped" | "blocked";
  meaning: string;
  productionImpact: "none" | "blocks-promotion";
}

export interface ProductionLiveProbeContractMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "live-probe-contract" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeReadinessContractJson: "/api/v1/production/live-probe-readiness-contract",
  productionLiveProbeReadinessContractMarkdown: "/api/v1/production/live-probe-readiness-contract?format=markdown",
  productionReadinessSummaryV12Json: "/api/v1/production/readiness-summary-v12",
});

export function createProductionLiveProbeReadinessContract(
  config: Pick<AppConfig,
    | "orderPlatformUrl"
    | "orderPlatformTimeoutMs"
    | "miniKvHost"
    | "miniKvPort"
    | "miniKvTimeoutMs"
    | "upstreamActionsEnabled"
  >,
): ProductionLiveProbeReadinessContract {
  const targets = {
    javaOrderPlatform: createJavaTarget(config),
    miniKv: createMiniKvTarget(config),
  };
  const statusDefinitions = createStatusDefinitions();
  const allProbes = [...targets.javaOrderPlatform.plannedProbes, ...targets.miniKv.plannedProbes];
  const checks = {
    javaReadTargetsDefined: targets.javaOrderPlatform.plannedProbes.length === 2
      && targets.javaOrderPlatform.plannedProbes.every((probe) => probe.readOnly && !probe.mutatesState),
    miniKvReadTargetsDefined: targets.miniKv.plannedProbes.length === 3
      && targets.miniKv.plannedProbes.every((probe) => probe.readOnly && !probe.mutatesState),
    statusDefinitionsDefined: statusDefinitions.length === 3,
    noProbeAttempted: true,
    writeActionsForbidden: allProbes.every((probe) => probe.readOnly && !probe.mutatesState),
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    readyForLiveProbePlanning: false,
  };
  checks.readyForLiveProbePlanning = checks.javaReadTargetsDefined
    && checks.miniKvReadTargetsDefined
    && checks.statusDefinitionsDefined
    && checks.noProbeAttempted
    && checks.writeActionsForbidden
    && checks.upstreamActionsStillDisabled;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production live probe readiness contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-readiness-contract.v1",
    readyForLiveProbePlanning: checks.readyForLiveProbePlanning,
    readOnly: true,
    executionAllowed: false,
    probeAttempted: false,
    targets,
    statusDefinitions,
    checks,
    summary: {
      targetCount: 2,
      plannedProbeCount: allProbes.length,
      writeProbeCount: allProbes.filter((probe) => probe.mutatesState).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this contract as the only source of allowed live probe targets before v136 smoke harness.",
      "Treat skipped probes as evidence when Java or mini-kv are not running during local development.",
      "Keep all live probe commands read-only and keep UPSTREAM_ACTIONS_ENABLED=false.",
    ],
  };
}

export function renderProductionLiveProbeReadinessContractMarkdown(
  contract: ProductionLiveProbeReadinessContract,
): string {
  return [
    "# Production live probe readiness contract",
    "",
    `- Service: ${contract.service}`,
    `- Generated at: ${contract.generatedAt}`,
    `- Profile version: ${contract.profileVersion}`,
    `- Ready for live probe planning: ${contract.readyForLiveProbePlanning}`,
    `- Read only: ${contract.readOnly}`,
    `- Execution allowed: ${contract.executionAllowed}`,
    `- Probe attempted: ${contract.probeAttempted}`,
    "",
    "## Targets",
    "",
    ...renderTarget(contract.targets.javaOrderPlatform),
    ...renderTarget(contract.targets.miniKv),
    "## Status Definitions",
    "",
    ...contract.statusDefinitions.map((definition) => `- ${definition.status}: ${definition.meaning} (productionImpact=${definition.productionImpact})`),
    "",
    "## Checks",
    "",
    ...renderEntries(contract.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(contract.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(contract.productionBlockers, "No live probe contract blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(contract.warnings, "No live probe contract warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(contract.recommendations, "No live probe contract recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(contract.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(contract.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createJavaTarget(
  config: Pick<AppConfig, "orderPlatformUrl" | "orderPlatformTimeoutMs">,
): ProductionLiveProbeTarget {
  return {
    id: "java-order-platform",
    role: "order-transaction-core",
    endpoint: config.orderPlatformUrl,
    startupRequiredByThisContract: false,
    readOnly: true,
    writesAllowed: false,
    plannedProbes: [
      {
        id: "java-actuator-health",
        protocol: "http-get",
        target: `${config.orderPlatformUrl}/actuator/health`,
        expectedStatus: "pass-or-skipped",
        readOnly: true,
        mutatesState: false,
        timeoutMs: config.orderPlatformTimeoutMs,
      },
      {
        id: "java-ops-overview",
        protocol: "http-get",
        target: `${config.orderPlatformUrl}/api/v1/ops/overview`,
        expectedStatus: "pass-or-skipped",
        readOnly: true,
        mutatesState: false,
        timeoutMs: config.orderPlatformTimeoutMs,
      },
    ],
    forbiddenActions: [
      "POST /api/v1/failed-events/:id/replay",
      "POST /api/v1/orders",
      "POST /api/v1/orders/:id/pay",
      "POST /api/v1/orders/:id/cancel",
    ],
  };
}

function createMiniKvTarget(
  config: Pick<AppConfig, "miniKvHost" | "miniKvPort" | "miniKvTimeoutMs">,
): ProductionLiveProbeTarget {
  const endpoint = `${config.miniKvHost}:${config.miniKvPort}`;
  return {
    id: "mini-kv",
    role: "redis-like-infrastructure-lab",
    endpoint,
    startupRequiredByThisContract: false,
    readOnly: true,
    writesAllowed: false,
    plannedProbes: [
      {
        id: "mini-kv-health",
        protocol: "tcp-inline-command",
        target: "HEALTH",
        expectedStatus: "pass-or-skipped",
        readOnly: true,
        mutatesState: false,
        timeoutMs: config.miniKvTimeoutMs,
      },
      {
        id: "mini-kv-infojson",
        protocol: "tcp-inline-command",
        target: "INFOJSON",
        expectedStatus: "pass-or-skipped",
        readOnly: true,
        mutatesState: false,
        timeoutMs: config.miniKvTimeoutMs,
      },
      {
        id: "mini-kv-statsjson",
        protocol: "tcp-inline-command",
        target: "STATSJSON",
        expectedStatus: "pass-or-skipped",
        readOnly: true,
        mutatesState: false,
        timeoutMs: config.miniKvTimeoutMs,
      },
    ],
    forbiddenActions: [
      "SET",
      "DEL",
      "EXPIRE",
      "FLUSH",
      "unknown write/admin commands",
    ],
  };
}

function createStatusDefinitions(): ProductionLiveProbeStatusDefinition[] {
  return [
    {
      status: "pass",
      meaning: "The live read-only probe returned expected evidence during an explicit probe window.",
      productionImpact: "none",
    },
    {
      status: "skipped",
      meaning: "The upstream was not probed or was unavailable; local development may continue with skipped evidence.",
      productionImpact: "none",
    },
    {
      status: "blocked",
      meaning: "The probe would require writes, unsafe actions, or an enabled upstream action path.",
      productionImpact: "blocks-promotion",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionLiveProbeReadinessContract["checks"],
): ProductionLiveProbeContractMessage[] {
  const blockers: ProductionLiveProbeContractMessage[] = [];
  addMessage(blockers, checks.javaReadTargetsDefined, "JAVA_READ_TARGETS_NOT_DEFINED", "live-probe-contract", "Java live probe read targets must be defined.");
  addMessage(blockers, checks.miniKvReadTargetsDefined, "MINIKV_READ_TARGETS_NOT_DEFINED", "live-probe-contract", "mini-kv live probe read targets must be defined.");
  addMessage(blockers, checks.writeActionsForbidden, "LIVE_PROBE_WRITES_ALLOWED", "live-probe-contract", "Live probe contract must not include write targets.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false for live probe planning.");
  return blockers;
}

function collectWarnings(): ProductionLiveProbeContractMessage[] {
  return [
    {
      code: "LIVE_PROBE_NOT_ATTEMPTED_BY_CONTRACT",
      severity: "warning",
      source: "live-probe-contract",
      message: "This contract defines allowed live probe targets only; it does not start or probe Java or mini-kv.",
    },
  ];
}

function collectRecommendations(): ProductionLiveProbeContractMessage[] {
  return [
    {
      code: "ADD_GRACEFUL_SKIPPED_HARNESS",
      severity: "recommendation",
      source: "live-probe-contract",
      message: "Next version should add a smoke harness that records skipped evidence when upstreams are not running.",
    },
  ];
}

function addMessage(
  messages: ProductionLiveProbeContractMessage[],
  condition: boolean,
  code: string,
  source: ProductionLiveProbeContractMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderTarget(target: ProductionLiveProbeTarget): string[] {
  return [
    `### ${target.id}`,
    "",
    `- Role: ${target.role}`,
    `- Endpoint: ${target.endpoint}`,
    `- Startup required by this contract: ${target.startupRequiredByThisContract}`,
    `- Read only: ${target.readOnly}`,
    `- Writes allowed: ${target.writesAllowed}`,
    "",
    "#### Planned Probes",
    "",
    ...target.plannedProbes.map((probe) =>
      `- ${probe.id}: protocol=${probe.protocol}, target=${probe.target}, readOnly=${probe.readOnly}, mutatesState=${probe.mutatesState}, timeoutMs=${probe.timeoutMs}`),
    "",
    "#### Forbidden Actions",
    "",
    ...renderList(target.forbiddenActions, "No forbidden actions."),
    "",
  ];
}

function renderMessages(messages: ProductionLiveProbeContractMessage[], emptyText: string): string[] {
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
