import { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { MiniKvClient } from "../clients/miniKvClient.js";
import type { OpsSnapshot, ProbeResult } from "../types.js";

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
      return {
        name: "advanced-order-platform",
        state: status === "UP" ? "online" : "degraded",
        sampledAt,
        latencyMs: response.latencyMs,
        message: status ?? "health endpoint responded",
        details: response.data,
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

  private async probeMiniKv(): Promise<ProbeResult> {
    const sampledAt = new Date().toISOString();
    if (!this.upstreamProbesEnabled) {
      return disabledProbe("mini-kv", sampledAt);
    }

    try {
      const [ping, size] = await Promise.all([this.miniKvClient.ping(), this.miniKvClient.size()]);
      const isHealthy = ping.response === "orderops" || ping.response === "PONG";

      return {
        name: "mini-kv",
        state: isHealthy ? "online" : "degraded",
        sampledAt,
        latencyMs: Math.max(ping.latencyMs, size.latencyMs),
        message: `ping=${ping.response} size=${size.response}`,
        details: {
          ping,
          size,
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
