import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import { createUpstreamOverview } from "../src/services/upstreamOverview.js";
import type { OpsSnapshot } from "../src/types.js";

describe("createUpstreamOverview", () => {
  it("keeps the overview disabled when live probes are disabled", () => {
    const overview = createUpstreamOverview(loadConfig({}), disabledSnapshot());

    expect(overview).toMatchObject({
      service: "orderops-node",
      overallState: "disabled",
      safety: {
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
      },
      upstreams: {
        javaOrderPlatform: {
          role: "order transaction core",
          state: "disabled",
        },
        miniKv: {
          role: "redis-like infrastructure lab",
          state: "disabled",
        },
      },
    });
    expect(overview.recommendedNextActions[0]).toContain("UPSTREAM_PROBES_ENABLED=true");
  });

  it("summarizes Java health and mini-kv stats for the read-only integration view", () => {
    const overview = createUpstreamOverview(loadConfig({
      UPSTREAM_PROBES_ENABLED: "true",
      ORDER_PLATFORM_URL: "http://127.0.0.1:8080",
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: "6379",
    }), onlineSnapshot());

    expect(overview.overallState).toBe("online");
    expect(overview.upstreams.javaOrderPlatform).toMatchObject({
      endpoint: "http://127.0.0.1:8080",
      signals: {
        healthStatus: "UP",
        componentNames: ["db", "diskSpace"],
        businessOverviewAvailable: true,
        application: {
          name: "advanced-order-platform",
        },
        orders: {
          total: 7,
        },
        outbox: {
          pending: 2,
        },
        failedEvents: {
          pendingReplayApprovals: 1,
        },
      },
    });
    expect(overview.upstreams.miniKv).toMatchObject({
      endpoint: "127.0.0.1:6379",
      signals: {
        liveKeys: 3,
        walEnabled: true,
        commandTotals: {
          total_commands: 12,
        },
        connectionStats: {
          active_connections: 1,
        },
        wal: {
          compact_recommended: false,
        },
      },
    });
    expect(overview.recommendedNextActions[0]).toContain("read-only");
  });
});

function disabledSnapshot(): OpsSnapshot {
  const sampledAt = new Date("2026-05-11T00:00:00.000Z").toISOString();
  return {
    sampledAt,
    node: {
      state: "online",
      uptimeSeconds: 1,
      pid: 1,
      version: "v22.0.0",
    },
    javaOrderPlatform: {
      name: "advanced-order-platform",
      state: "disabled",
      sampledAt,
      message: "Upstream probes are disabled by UPSTREAM_PROBES_ENABLED=false",
    },
    miniKv: {
      name: "mini-kv",
      state: "disabled",
      sampledAt,
      message: "Upstream probes are disabled by UPSTREAM_PROBES_ENABLED=false",
    },
  };
}

function onlineSnapshot(): OpsSnapshot {
  const sampledAt = new Date("2026-05-11T00:00:00.000Z").toISOString();
  return {
    sampledAt,
    node: {
      state: "online",
      uptimeSeconds: 1,
      pid: 1,
      version: "v22.0.0",
    },
    javaOrderPlatform: {
      name: "advanced-order-platform",
      state: "online",
      sampledAt,
      latencyMs: 12,
      message: "UP",
      details: {
        health: {
          statusCode: 200,
          latencyMs: 3,
          data: {
            status: "UP",
            components: {
              db: { status: "UP" },
              diskSpace: { status: "UP" },
            },
          },
        },
        opsOverview: {
          status: "available",
          latencyMs: 9,
          data: {
            sampledAt,
            application: {
              name: "advanced-order-platform",
              profiles: ["default"],
              uptimeSeconds: 30,
            },
            orders: { total: 7 },
            inventory: { items: 3 },
            outbox: { pending: 2 },
            failedEvents: {
              total: 4,
              pendingReplayApprovals: 1,
              latestFailedAt: "2026-05-11T00:00:00.000Z",
            },
          },
        },
      },
    },
    miniKv: {
      name: "mini-kv",
      state: "online",
      sampledAt,
      latencyMs: 4,
      message: "ping=orderops health=OK live_keys=3 wal_enabled=true",
      details: {
        statsJson: {
          stats: {
            live_keys: 3,
            wal_enabled: true,
            commands: {
              total_commands: 12,
            },
            connection_stats: {
              active_connections: 1,
            },
            wal: {
              compact_recommended: false,
            },
          },
        },
      },
    },
  };
}
