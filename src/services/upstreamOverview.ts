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
  const failedEventSummary = readJavaFailedEventSummary(probe.details);
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
      "failed event governance summary",
    ],
    readSignals: [
      "GET /actuator/health",
      "GET /api/v1/ops/overview",
      "GET /api/v1/failed-events/summary",
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
      failedEventSummaryAvailable: failedEventSummary !== undefined,
      failedEventSummaryLatencyMs: readJavaFailedEventSummaryLatency(probe.details),
      failedEventSummary,
      failedEventReplayBacklog: readNumber(failedEventSummary, "replayBacklog"),
      failedEventPendingReplayApprovals: readNumber(failedEventSummary, "pendingReplayApprovals"),
      failedEventApprovedReplayApprovals: readNumber(failedEventSummary, "approvedReplayApprovals"),
      failedEventRejectedReplayApprovals: readNumber(failedEventSummary, "rejectedReplayApprovals"),
    },
    sampledAt: probe.sampledAt,
  };
}

function miniKvObservation(config: AppConfig, probe: ProbeResult): UpstreamObservation {
  const stats = readMiniKvStats(probe.details);
  const info = readMiniKvInfo(probe.details);
  const server = readRecord(info, "server");
  const store = readRecord(info, "store");
  const walInfo = readRecord(info, "wal");
  const metricsInfo = readRecord(info, "metrics");
  const commandCatalog = readMiniKvCommandCatalog(probe.details);
  const commands = readRecordArray(commandCatalog, "commands");
  const commandCatalogCounts = countMiniKvCommands(commands);
  const keyInventory = readMiniKvKeyInventory(probe.details);
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
      "INFOJSON identity metadata",
      "COMMANDSJSON command risk catalog",
      "KEYSJSON bounded key inventory",
    ],
    readSignals: ["PING", "HEALTH", "STATSJSON", "INFOJSON", "COMMANDSJSON", "KEYSJSON [prefix]"],
    writePolicy: "mini-kv writes remain experimental and must not become the Java order authority.",
    signals: {
      infoJsonAvailable: info !== undefined,
      infoJsonLatencyMs: readMiniKvInfoLatency(probe.details),
      version: readString(info, "version"),
      protocol: readStringArray(server, "protocol"),
      uptimeSeconds: readNumber(server, "uptime_seconds"),
      maxRequestBytes: readNumber(server, "max_request_bytes"),
      liveKeys: readNumber(stats, "live_keys") ?? readNumber(store, "live_keys"),
      walEnabled: readBoolean(stats, "wal_enabled") ?? readBoolean(walInfo, "enabled"),
      metricsEnabled: readBoolean(metricsInfo, "enabled"),
      commandTotals: readRecord(stats, "commands"),
      connectionStats: readRecord(stats, "connection_stats"),
      wal: readRecord(stats, "wal"),
      commandCatalogAvailable: commandCatalog !== undefined,
      commandCatalogLatencyMs: readMiniKvCommandCatalogLatency(probe.details),
      commandCatalogCounts,
      writeCommandCount: commandCatalogCounts.write,
      adminCommandCount: commandCatalogCounts.admin,
      mutatingCommandCount: commandCatalogCounts.mutating,
      walTouchingCommandCount: commandCatalogCounts.walTouching,
      keyInventoryAvailable: keyInventory !== undefined,
      keyInventoryLatencyMs: readMiniKvKeyInventoryLatency(probe.details),
      keyInventoryPrefix: readNullableString(keyInventory, "prefix"),
      keyInventoryKeyCount: readNumber(keyInventory, "key_count"),
      keyInventoryTruncated: readBoolean(keyInventory, "truncated"),
      keyInventoryLimit: readNumber(keyInventory, "limit"),
      keyInventorySampleKeys: readStringArray(keyInventory, "keys")?.slice(0, 20) ?? [],
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
  if (java.state !== "disabled" && java.state !== "offline" && java.signals.failedEventSummaryAvailable !== true) {
    actions.push("Verify Java /api/v1/failed-events/summary before relying on failed-event governance signals.");
  }
  if (miniKv.state === "offline") {
    actions.push("Start or inspect mini-kv before expecting live KV health and metrics.");
  }
  if (miniKv.state !== "disabled" && miniKv.state !== "offline" && miniKv.signals.infoJsonAvailable !== true) {
    actions.push("Verify mini-kv INFOJSON before relying on version and protocol metadata.");
  }
  if (miniKv.state !== "disabled" && miniKv.state !== "offline" && miniKv.signals.commandCatalogAvailable !== true) {
    actions.push("Verify mini-kv COMMANDSJSON before relying on command risk metadata.");
  }
  if (miniKv.state !== "disabled" && miniKv.state !== "offline" && miniKv.signals.keyInventoryAvailable !== true) {
    actions.push("Verify mini-kv KEYSJSON before relying on key inventory signals.");
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

function readJavaFailedEventSummary(details: unknown): Record<string, unknown> | undefined {
  if (!isRecord(details) || !isRecord(details.failedEventSummary) || details.failedEventSummary.status !== "available" || !isRecord(details.failedEventSummary.data)) {
    return undefined;
  }
  return details.failedEventSummary.data;
}

function readJavaFailedEventSummaryLatency(details: unknown): number | undefined {
  if (!isRecord(details) || !isRecord(details.failedEventSummary)) {
    return undefined;
  }
  const latencyMs = details.failedEventSummary.latencyMs;
  return typeof latencyMs === "number" && Number.isFinite(latencyMs) ? latencyMs : undefined;
}

function readMiniKvStats(details: unknown): Record<string, unknown> | undefined {
  if (!isRecord(details) || !isRecord(details.statsJson) || !isRecord(details.statsJson.stats)) {
    return undefined;
  }
  return details.statsJson.stats;
}

function readMiniKvInfo(details: unknown): Record<string, unknown> | undefined {
  if (!isRecord(details) || !isRecord(details.infoJson) || details.infoJson.status !== "available" || !isRecord(details.infoJson.info)) {
    return undefined;
  }
  return details.infoJson.info;
}

function readMiniKvInfoLatency(details: unknown): number | undefined {
  if (!isRecord(details) || !isRecord(details.infoJson)) {
    return undefined;
  }
  const latencyMs = details.infoJson.latencyMs;
  return typeof latencyMs === "number" && Number.isFinite(latencyMs) ? latencyMs : undefined;
}

function readMiniKvCommandCatalog(details: unknown): Record<string, unknown> | undefined {
  if (!isRecord(details) || !isRecord(details.commandCatalog) || details.commandCatalog.status !== "available" || !isRecord(details.commandCatalog.catalog)) {
    return undefined;
  }
  return details.commandCatalog.catalog;
}

function readMiniKvCommandCatalogLatency(details: unknown): number | undefined {
  if (!isRecord(details) || !isRecord(details.commandCatalog)) {
    return undefined;
  }
  const latencyMs = details.commandCatalog.latencyMs;
  return typeof latencyMs === "number" && Number.isFinite(latencyMs) ? latencyMs : undefined;
}

function readMiniKvKeyInventory(details: unknown): Record<string, unknown> | undefined {
  if (!isRecord(details) || !isRecord(details.keyInventory) || details.keyInventory.status !== "available" || !isRecord(details.keyInventory.inventory)) {
    return undefined;
  }
  return details.keyInventory.inventory;
}

function readMiniKvKeyInventoryLatency(details: unknown): number | undefined {
  if (!isRecord(details) || !isRecord(details.keyInventory)) {
    return undefined;
  }
  const latencyMs = details.keyInventory.latencyMs;
  return typeof latencyMs === "number" && Number.isFinite(latencyMs) ? latencyMs : undefined;
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

function readNullableString(data: Record<string, unknown> | undefined, field: string): string | null | undefined {
  const value = data?.[field];
  return value === null || typeof value === "string" ? value : undefined;
}

function readStringArray(data: Record<string, unknown> | undefined, field: string): string[] | undefined {
  const value = data?.[field];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : undefined;
}

function readRecordArray(data: Record<string, unknown> | undefined, field: string): Array<Record<string, unknown>> {
  const value = data?.[field];
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is Record<string, unknown> => isRecord(item));
}

function countMiniKvCommands(commands: Array<Record<string, unknown>>): Record<string, number> {
  return {
    total: commands.length,
    read: countByStringField(commands, "category", "read"),
    write: countByStringField(commands, "category", "write"),
    admin: countByStringField(commands, "category", "admin"),
    meta: countByStringField(commands, "category", "meta"),
    mutating: countByBooleanField(commands, "mutates_store", true),
    walTouching: countByBooleanField(commands, "touches_wal", true),
    unstable: countByBooleanField(commands, "stable", false),
  };
}

function countByStringField(records: Array<Record<string, unknown>>, field: string, expected: string): number {
  return records.filter((record) => record[field] === expected).length;
}

function countByBooleanField(records: Array<Record<string, unknown>>, field: string, expected: boolean): number {
  return records.filter((record) => record[field] === expected).length;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
