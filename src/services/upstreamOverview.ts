import type { AppConfig } from "../config.js";
import type { OpsSnapshot, ProbeResult, SourceState } from "../types.js";

export interface UpstreamOverview {
  service: "orderops-node";
  generatedAt: string;
  overallState: SourceState;
  safety: {
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
  };
  upstreams: {
    javaOrderPlatform: UpstreamObservation;
    miniKv: UpstreamObservation;
  };
  recommendedNextActions: string[];
}

export interface UpstreamObservation {
  name: string;
  role: string;
  endpoint: string;
  state: SourceState;
  latencyMs?: number;
  message?: string;
  capabilities: string[];
  readSignals: string[];
  writePolicy: string;
  signals: Record<string, unknown>;
  sampledAt: string;
}

export function createUpstreamOverview(config: AppConfig, snapshot: OpsSnapshot): UpstreamOverview {
  const javaOrderPlatform = javaObservation(config, snapshot.javaOrderPlatform);
  const miniKv = miniKvObservation(config, snapshot.miniKv);
  const states = [javaOrderPlatform.state, miniKv.state];

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    overallState: combineStates(states),
    safety: {
      upstreamProbesEnabled: config.upstreamProbesEnabled,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    upstreams: {
      javaOrderPlatform,
      miniKv,
    },
    recommendedNextActions: buildNextActions(config, javaOrderPlatform, miniKv),
  };
}

function javaObservation(config: AppConfig, probe: ProbeResult): UpstreamObservation {
  const businessOverview = readJavaBusinessOverview(probe.details);
  return {
    name: probe.name,
    role: "order transaction core",
    endpoint: config.orderPlatformUrl,
    state: probe.state,
    latencyMs: probe.latencyMs,
    message: probe.message,
    capabilities: [
      "actuator health",
      "order query and lifecycle commands",
      "outbox event visibility",
      "failed event management and approval flow",
      "ops business overview",
    ],
    readSignals: [
      "GET /actuator/health",
      "GET /api/v1/ops/overview",
      "GET /api/v1/orders/:orderId",
      "GET /api/v1/outbox/events",
      "GET /api/v1/failed-events",
    ],
    writePolicy: "Real Java writes stay behind Node operation intent, confirmation, audit, rate limit, and upstream action gates.",
    signals: {
      healthStatus: readJavaHealthStatus(probe.details),
      componentNames: readJavaComponentNames(probe.details),
      businessOverviewAvailable: businessOverview !== undefined,
      businessOverviewLatencyMs: readJavaBusinessOverviewLatency(probe.details),
      application: readRecord(businessOverview, "application"),
      orders: readRecord(businessOverview, "orders"),
      inventory: readRecord(businessOverview, "inventory"),
      outbox: readRecord(businessOverview, "outbox"),
      failedEvents: readRecord(businessOverview, "failedEvents"),
      businessSampledAt: readString(businessOverview, "sampledAt"),
    },
    sampledAt: probe.sampledAt,
  };
}

function miniKvObservation(config: AppConfig, probe: ProbeResult): UpstreamObservation {
  const stats = readMiniKvStats(probe.details);
  return {
    name: probe.name,
    role: "redis-like infrastructure lab",
    endpoint: `${config.miniKvHost}:${config.miniKvPort}`,
    state: probe.state,
    latencyMs: probe.latencyMs,
    message: probe.message,
    capabilities: [
      "TCP inline commands",
      "Redis RESP request support",
      "TTL keys",
      "WAL and snapshot maintenance",
      "HEALTH and STATSJSON operational signals",
    ],
    readSignals: ["PING", "HEALTH", "STATSJSON", "KEYS prefix"],
    writePolicy: "mini-kv writes remain experimental and must not become the Java order authority.",
    signals: {
      liveKeys: readNumber(stats, "live_keys"),
      walEnabled: readBoolean(stats, "wal_enabled"),
      commandTotals: readRecord(stats, "commands"),
      connectionStats: readRecord(stats, "connection_stats"),
      wal: readRecord(stats, "wal"),
    },
    sampledAt: probe.sampledAt,
  };
}

function combineStates(states: SourceState[]): SourceState {
  if (states.every((state) => state === "disabled")) {
    return "disabled";
  }
  if (states.some((state) => state === "offline")) {
    return "offline";
  }
  if (states.some((state) => state === "degraded" || state === "disabled")) {
    return "degraded";
  }
  return "online";
}

function buildNextActions(config: AppConfig, java: UpstreamObservation, miniKv: UpstreamObservation): string[] {
  const actions: string[] = [];

  if (!config.upstreamProbesEnabled) {
    actions.push("Enable UPSTREAM_PROBES_ENABLED=true only during a coordinated integration window.");
  }
  if (config.upstreamActionsEnabled) {
    actions.push("Keep risky writes behind operation intents, explicit confirmation, audit, and rate limits.");
  }
  if (java.state === "offline") {
    actions.push("Start or inspect advanced-order-platform before expecting live Java order signals.");
  }
  if (java.state !== "disabled" && java.state !== "offline" && java.signals.businessOverviewAvailable !== true) {
    actions.push("Verify Java /api/v1/ops/overview before relying on business-level order platform signals.");
  }
  if (miniKv.state === "offline") {
    actions.push("Start or inspect mini-kv before expecting live KV health and metrics.");
  }
  if (java.state === "degraded" || miniKv.state === "degraded") {
    actions.push("Inspect degraded upstream details before promoting this integration state.");
  }
  if (actions.length === 0) {
    actions.push("Keep the next integration step read-only unless a specific operation path is ready for review.");
  }

  return actions;
}

function readJavaHealthStatus(details: unknown): string | undefined {
  const healthData = readJavaHealthData(details);
  if (healthData !== undefined) {
    const status = healthData.status;
    return typeof status === "string" ? status : undefined;
  }

  if (!isRecord(details)) {
    return undefined;
  }
  const status = details.status;
  return typeof status === "string" ? status : undefined;
}

function readJavaComponentNames(details: unknown): string[] {
  const healthData = readJavaHealthData(details);
  if (healthData !== undefined && isRecord(healthData.components)) {
    return Object.keys(healthData.components).sort();
  }

  if (!isRecord(details) || !isRecord(details.components)) {
    return [];
  }
  return Object.keys(details.components).sort();
}

function readJavaHealthData(details: unknown): Record<string, unknown> | undefined {
  if (!isRecord(details) || !isRecord(details.health) || !isRecord(details.health.data)) {
    return undefined;
  }
  return details.health.data;
}

function readJavaBusinessOverview(details: unknown): Record<string, unknown> | undefined {
  if (!isRecord(details) || !isRecord(details.opsOverview) || details.opsOverview.status !== "available" || !isRecord(details.opsOverview.data)) {
    return undefined;
  }
  return details.opsOverview.data;
}

function readJavaBusinessOverviewLatency(details: unknown): number | undefined {
  if (!isRecord(details) || !isRecord(details.opsOverview)) {
    return undefined;
  }
  const latencyMs = details.opsOverview.latencyMs;
  return typeof latencyMs === "number" && Number.isFinite(latencyMs) ? latencyMs : undefined;
}

function readMiniKvStats(details: unknown): Record<string, unknown> | undefined {
  if (!isRecord(details) || !isRecord(details.statsJson) || !isRecord(details.statsJson.stats)) {
    return undefined;
  }
  return details.statsJson.stats;
}

function readNumber(data: Record<string, unknown> | undefined, field: string): number | undefined {
  const value = data?.[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readBoolean(data: Record<string, unknown> | undefined, field: string): boolean | undefined {
  const value = data?.[field];
  return typeof value === "boolean" ? value : undefined;
}

function readRecord(data: Record<string, unknown> | undefined, field: string): Record<string, unknown> | undefined {
  const value = data?.[field];
  return isRecord(value) ? value : undefined;
}

function readString(data: Record<string, unknown> | undefined, field: string): string | undefined {
  const value = data?.[field];
  return typeof value === "string" ? value : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
