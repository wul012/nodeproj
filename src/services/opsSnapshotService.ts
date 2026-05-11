import { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { MiniKvClient } from "../clients/miniKvClient.js";
import type { OpsSnapshot, ProbeResult } from "../types.js";

type OrderPlatformOpsOverviewProbe =
  | {
    status: "available";
    latencyMs: number;
    data: unknown;
  }
  | {
    status: "unavailable";
    message: string;
  };

type OrderPlatformFailedEventSummaryProbe =
  | {
    status: "available";
    latencyMs: number;
    data: unknown;
  }
  | {
    status: "unavailable";
    message: string;
  };

type MiniKvInfoJsonProbe =
  | {
    status: "available";
    latencyMs: number;
    info: unknown;
  }
  | {
    status: "unavailable";
    message: string;
  };

type MiniKvCommandCatalogProbe =
  | {
    status: "available";
    latencyMs: number;
    catalog: unknown;
  }
  | {
    status: "unavailable";
    message: string;
  };

type MiniKvKeyInventoryProbe =
  | {
    status: "available";
    latencyMs: number;
    inventory: unknown;
  }
  | {
    status: "unavailable";
    message: string;
  };

export class OpsSnapshotService {
  constructor(
    private readonly orderPlatformClient: OrderPlatformClient,
    private readonly miniKvClient: MiniKvClient,
    private readonly upstreamProbesEnabled: boolean,
  ) {}

  async sample(): Promise<OpsSnapshot> {
    const [javaOrderPlatform, miniKv] = await Promise.all([this.probeOrderPlatform(), this.probeMiniKv()]);

    return {
      sampledAt: new Date().toISOString(),
      node: {
        state: "online",
        uptimeSeconds: Math.round(process.uptime()),
        pid: process.pid,
        version: process.version,
      },
      javaOrderPlatform,
      miniKv,
    };
  }

  private async probeOrderPlatform(): Promise<ProbeResult> {
    const sampledAt = new Date().toISOString();
    if (!this.upstreamProbesEnabled) {
      return disabledProbe("advanced-order-platform", sampledAt);
    }

    try {
      const response = await this.orderPlatformClient.health();
      const status = readStatus(response.data);
      const [opsOverview, failedEventSummary] = await Promise.all([
        this.probeOrderPlatformOpsOverview(),
        this.probeOrderPlatformFailedEventSummary(),
      ]);
      const overviewData = opsOverview.status === "available" ? opsOverview.data : undefined;
      const failedEventSummaryData = failedEventSummary.status === "available" ? failedEventSummary.data : undefined;
      const state = status === "UP" && opsOverview.status === "available" && failedEventSummary.status === "available"
        ? "online"
        : status === "UP"
          ? "degraded"
          : "degraded";

      return {
        name: "advanced-order-platform",
        state,
        sampledAt,
        latencyMs: Math.max(
          response.latencyMs,
          opsOverview.status === "available" ? opsOverview.latencyMs : 0,
          failedEventSummary.status === "available" ? failedEventSummary.latencyMs : 0,
        ),
        message: formatOrderPlatformMessage(status, opsOverview, overviewData, failedEventSummary, failedEventSummaryData),
        details: {
          health: response,
          opsOverview,
          failedEventSummary,
        },
      };
    } catch (error) {
      return {
        name: "advanced-order-platform",
        state: "offline",
        sampledAt,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async probeOrderPlatformOpsOverview(): Promise<OrderPlatformOpsOverviewProbe> {
    try {
      const response = await this.orderPlatformClient.opsOverview();
      return {
        status: "available",
        latencyMs: response.latencyMs,
        data: response.data,
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async probeOrderPlatformFailedEventSummary(): Promise<OrderPlatformFailedEventSummaryProbe> {
    try {
      const response = await this.orderPlatformClient.failedEventsSummary();
      return {
        status: "available",
        latencyMs: response.latencyMs,
        data: response.data,
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async probeMiniKv(): Promise<ProbeResult> {
    const sampledAt = new Date().toISOString();
    if (!this.upstreamProbesEnabled) {
      return disabledProbe("mini-kv", sampledAt);
    }

    try {
      const [ping, health, statsJson, infoJson, commandCatalog, keyInventory] = await Promise.all([
        this.miniKvClient.ping(),
        this.miniKvClient.health(),
        this.miniKvClient.statsJson(),
        this.probeMiniKvInfoJson(),
        this.probeMiniKvCommandCatalog(),
        this.probeMiniKvKeyInventory(),
      ]);
      const isPingHealthy = ping.response === "orderops" || ping.response === "PONG";
      const isHealthHealthy = health.response.startsWith("OK");
      const liveKeys = readNumberField(statsJson.stats, "live_keys");
      const walEnabled = readBooleanField(statsJson.stats, "wal_enabled");
      const state = isPingHealthy && isHealthHealthy && infoJson.status === "available" && commandCatalog.status === "available" && keyInventory.status === "available"
        ? "online"
        : "degraded";

      return {
        name: "mini-kv",
        state,
        sampledAt,
        latencyMs: Math.max(
          ping.latencyMs,
          health.latencyMs,
          statsJson.latencyMs,
          infoJson.status === "available" ? infoJson.latencyMs : 0,
          commandCatalog.status === "available" ? commandCatalog.latencyMs : 0,
          keyInventory.status === "available" ? keyInventory.latencyMs : 0,
        ),
        message: formatMiniKvMessage(ping.response, health.response, liveKeys, walEnabled, infoJson, commandCatalog, keyInventory),
        details: {
          ping,
          health,
          statsJson,
          infoJson,
          commandCatalog,
          keyInventory,
        },
      };
    } catch (error) {
      return {
        name: "mini-kv",
        state: "offline",
        sampledAt,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async probeMiniKvInfoJson(): Promise<MiniKvInfoJsonProbe> {
    try {
      const response = await this.miniKvClient.infoJson();
      return {
        status: "available",
        latencyMs: response.latencyMs,
        info: response.info,
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async probeMiniKvCommandCatalog(): Promise<MiniKvCommandCatalogProbe> {
    try {
      const response = await this.miniKvClient.commandsJson();
      return {
        status: "available",
        latencyMs: response.latencyMs,
        catalog: response.catalog,
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async probeMiniKvKeyInventory(): Promise<MiniKvKeyInventoryProbe> {
    try {
      const response = await this.miniKvClient.keysJson();
      return {
        status: "available",
        latencyMs: response.latencyMs,
        inventory: response.inventory,
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

function disabledProbe(name: string, sampledAt: string): ProbeResult {
  return {
    name,
    state: "disabled",
    sampledAt,
    message: "Upstream probes are disabled by UPSTREAM_PROBES_ENABLED=false",
  };
}

function readStatus(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null || !("status" in data)) {
    return undefined;
  }

  const status = (data as { status?: unknown }).status;
  return typeof status === "string" ? status : undefined;
}

function formatOrderPlatformMessage(
  status: string | undefined,
  opsOverview: OrderPlatformOpsOverviewProbe,
  overviewData: unknown,
  failedEventSummary: OrderPlatformFailedEventSummaryProbe,
  failedEventSummaryData: unknown,
): string {
  const data = typeof overviewData === "object" && overviewData !== null ? overviewData as Record<string, unknown> : {};
  const summary = typeof failedEventSummaryData === "object" && failedEventSummaryData !== null
    ? failedEventSummaryData as Record<string, unknown>
    : {};
  const orders = readNestedNumber(data, "orders", "total");
  const outboxPending = readNestedNumber(data, "outbox", "pending");
  const failedEvents = readNestedNumber(data, "failedEvents", "total");
  const replayBacklog = readNumberField(summary, "replayBacklog");
  const pendingApprovals = readNumberField(summary, "pendingReplayApprovals");
  return [
    `health=${status ?? "unknown"}`,
    `ops_overview=${opsOverview.status}`,
    `orders=${formatProbeValue(orders)}`,
    `outbox_pending=${formatProbeValue(outboxPending)}`,
    `failed_events=${formatProbeValue(failedEvents)}`,
    `failed_summary=${failedEventSummary.status}`,
    `replay_backlog=${formatProbeValue(replayBacklog)}`,
    `pending_approvals=${formatProbeValue(pendingApprovals)}`,
  ].join(" ");
}

function readNestedNumber(data: Record<string, unknown>, objectField: string, numberField: string): number | undefined {
  const container = data[objectField];
  if (typeof container !== "object" || container === null || Array.isArray(container)) {
    return undefined;
  }

  return readNumberField(container as Record<string, unknown>, numberField);
}

function readNumberField(data: Record<string, unknown> | undefined, field: string): number | undefined {
  const value = data?.[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readBooleanField(data: Record<string, unknown>, field: string): boolean | undefined {
  const value = data[field];
  return typeof value === "boolean" ? value : undefined;
}

function formatMiniKvMessage(
  ping: string,
  health: string,
  liveKeys: number | undefined,
  walEnabled: boolean | undefined,
  infoJson: MiniKvInfoJsonProbe,
  commandCatalog: MiniKvCommandCatalogProbe,
  keyInventory: MiniKvKeyInventoryProbe,
): string {
  const base = `ping=${ping} health=${health} live_keys=${formatProbeValue(liveKeys)} wal_enabled=${formatProbeValue(walEnabled)}`;
  const commandCatalogSuffix = formatMiniKvCommandCatalogMessage(commandCatalog);
  const keyInventorySuffix = formatMiniKvKeyInventoryMessage(keyInventory);
  if (infoJson.status !== "available") {
    return `${base} infojson=unavailable ${commandCatalogSuffix} ${keyInventorySuffix}`;
  }

  const info = typeof infoJson.info === "object" && infoJson.info !== null ? infoJson.info as Record<string, unknown> : {};
  const server = readRecordField(info, "server");
  const version = readStringField(info, "version");
  const protocol = readStringArrayField(server, "protocol")?.join(",");
  const uptimeSeconds = readNumberField(server, "uptime_seconds");
  return `${base} infojson=available version=${version ?? "unknown"} protocol=${protocol ?? "unknown"} uptime_seconds=${formatProbeValue(uptimeSeconds)} ${commandCatalogSuffix} ${keyInventorySuffix}`;
}

function formatMiniKvCommandCatalogMessage(commandCatalog: MiniKvCommandCatalogProbe): string {
  if (commandCatalog.status !== "available") {
    return "command_catalog=unavailable";
  }

  const catalog = typeof commandCatalog.catalog === "object" && commandCatalog.catalog !== null
    ? commandCatalog.catalog as Record<string, unknown>
    : {};
  const commands = readRecordArrayField(catalog, "commands");
  return [
    "command_catalog=available",
    `write_commands=${countCommandCategory(commands, "write")}`,
    `admin_commands=${countCommandCategory(commands, "admin")}`,
  ].join(" ");
}

function formatMiniKvKeyInventoryMessage(keyInventory: MiniKvKeyInventoryProbe): string {
  if (keyInventory.status !== "available") {
    return "key_inventory=unavailable";
  }

  const inventory = typeof keyInventory.inventory === "object" && keyInventory.inventory !== null
    ? keyInventory.inventory as Record<string, unknown>
    : {};
  return [
    "key_inventory=available",
    `key_count=${formatProbeValue(readNumberField(inventory, "key_count"))}`,
    `truncated=${formatProbeValue(readBooleanField(inventory, "truncated"))}`,
  ].join(" ");
}

function formatProbeValue(value: number | boolean | undefined): string {
  return value === undefined ? "unknown" : String(value);
}

function readRecordField(data: Record<string, unknown>, field: string): Record<string, unknown> | undefined {
  const value = data[field];
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function readStringField(data: Record<string, unknown> | undefined, field: string): string | undefined {
  const value = data?.[field];
  return typeof value === "string" ? value : undefined;
}

function readStringArrayField(data: Record<string, unknown> | undefined, field: string): string[] | undefined {
  const value = data?.[field];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : undefined;
}

function readRecordArrayField(data: Record<string, unknown>, field: string): Array<Record<string, unknown>> {
  const value = data[field];
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null && !Array.isArray(item));
}

function countCommandCategory(commands: Array<Record<string, unknown>>, category: string): number {
  return commands.filter((command) => command.category === category).length;
}
