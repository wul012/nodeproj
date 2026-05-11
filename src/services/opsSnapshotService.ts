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
      const opsOverview = await this.probeOrderPlatformOpsOverview();
      const overviewData = opsOverview.status === "available" ? opsOverview.data : undefined;
      const state = status === "UP" && opsOverview.status === "available"
        ? "online"
        : status === "UP"
          ? "degraded"
          : "degraded";

      return {
        name: "advanced-order-platform",
        state,
        sampledAt,
        latencyMs: Math.max(response.latencyMs, opsOverview.status === "available" ? opsOverview.latencyMs : 0),
        message: formatOrderPlatformMessage(status, opsOverview, overviewData),
        details: {
          health: response,
          opsOverview,
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

  private async probeMiniKv(): Promise<ProbeResult> {
    const sampledAt = new Date().toISOString();
    if (!this.upstreamProbesEnabled) {
      return disabledProbe("mini-kv", sampledAt);
    }

    try {
      const [ping, health, statsJson] = await Promise.all([
        this.miniKvClient.ping(),
        this.miniKvClient.health(),
        this.miniKvClient.statsJson(),
      ]);
      const isPingHealthy = ping.response === "orderops" || ping.response === "PONG";
      const isHealthHealthy = health.response.startsWith("OK");
      const liveKeys = readNumberField(statsJson.stats, "live_keys");
      const walEnabled = readBooleanField(statsJson.stats, "wal_enabled");
      const state = isPingHealthy && isHealthHealthy ? "online" : "degraded";

      return {
        name: "mini-kv",
        state,
        sampledAt,
        latencyMs: Math.max(ping.latencyMs, health.latencyMs, statsJson.latencyMs),
        message: `ping=${ping.response} health=${health.response} live_keys=${formatProbeValue(liveKeys)} wal_enabled=${formatProbeValue(walEnabled)}`,
        details: {
          ping,
          health,
          statsJson,
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

function formatOrderPlatformMessage(status: string | undefined, opsOverview: OrderPlatformOpsOverviewProbe, overviewData: unknown): string {
  if (opsOverview.status !== "available") {
    return `health=${status ?? "unknown"} ops_overview=${opsOverview.status}`;
  }

  const data = typeof overviewData === "object" && overviewData !== null ? overviewData as Record<string, unknown> : {};
  const orders = readNestedNumber(data, "orders", "total");
  const outboxPending = readNestedNumber(data, "outbox", "pending");
  const failedEvents = readNestedNumber(data, "failedEvents", "total");
  return `health=${status ?? "unknown"} orders=${formatProbeValue(orders)} outbox_pending=${formatProbeValue(outboxPending)} failed_events=${formatProbeValue(failedEvents)}`;
}

function readNestedNumber(data: Record<string, unknown>, objectField: string, numberField: string): number | undefined {
  const container = data[objectField];
  if (typeof container !== "object" || container === null || Array.isArray(container)) {
    return undefined;
  }

  return readNumberField(container as Record<string, unknown>, numberField);
}

function readNumberField(data: Record<string, unknown>, field: string): number | undefined {
  const value = data[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readBooleanField(data: Record<string, unknown>, field: string): boolean | undefined {
  const value = data[field];
  return typeof value === "boolean" ? value : undefined;
}

function formatProbeValue(value: number | boolean | undefined): string {
  return value === undefined ? "unknown" : String(value);
}
