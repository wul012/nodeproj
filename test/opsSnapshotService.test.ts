import { describe, expect, it } from "vitest";

import { MiniKvClient } from "../src/clients/miniKvClient.js";
import { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { OpsSnapshotService } from "../src/services/opsSnapshotService.js";

describe("OpsSnapshotService", () => {
  it("does not touch upstream clients when probes are disabled", async () => {
    const orderPlatform = new OrderPlatformClient("http://127.0.0.1:1", 1);
    const miniKv = new MiniKvClient("127.0.0.1", 1, 1);
    const service = new OpsSnapshotService(orderPlatform, miniKv, false);

    const snapshot = await service.sample();

    expect(snapshot.node.state).toBe("online");
    expect(snapshot.javaOrderPlatform.state).toBe("disabled");
    expect(snapshot.javaOrderPlatform.message).toContain("UPSTREAM_PROBES_ENABLED=false");
    expect(snapshot.miniKv.state).toBe("disabled");
    expect(snapshot.miniKv.message).toContain("UPSTREAM_PROBES_ENABLED=false");
  });

  it("uses mini-kv HEALTH and STATSJSON when probes are enabled", async () => {
    const orderPlatform = {
      health: async () => ({
        statusCode: 200,
        latencyMs: 4,
        data: { status: "UP" },
      }),
      opsOverview: async () => ({
        statusCode: 200,
        latencyMs: 6,
        data: {
          sampledAt: "2026-05-11T00:00:00.000Z",
          application: { name: "advanced-order-platform", profiles: ["default"], uptimeSeconds: 12 },
          orders: { total: 2 },
          inventory: { items: 3 },
          outbox: { pending: 1 },
          failedEvents: { total: 0, pendingReplayApprovals: 0, latestFailedAt: null },
        },
      }),
    } as unknown as OrderPlatformClient;
    const miniKv = {
      ping: async () => ({ command: "PING orderops", response: "orderops", latencyMs: 3 }),
      health: async () => ({ command: "HEALTH", response: "OK live_keys=2 wal_enabled=yes", latencyMs: 5 }),
      statsJson: async () => ({
        command: "STATSJSON",
        response: '{"live_keys":2,"wal_enabled":true}',
        latencyMs: 7,
        stats: { live_keys: 2, wal_enabled: true },
      }),
    } as unknown as MiniKvClient;
    const service = new OpsSnapshotService(orderPlatform, miniKv, true);

    const snapshot = await service.sample();

    expect(snapshot.javaOrderPlatform.state).toBe("online");
    expect(snapshot.javaOrderPlatform.message).toContain("orders=2");
    expect(snapshot.javaOrderPlatform.details).toMatchObject({
      opsOverview: {
        status: "available",
        data: {
          orders: {
            total: 2,
          },
        },
      },
    });
    expect(snapshot.miniKv.state).toBe("online");
    expect(snapshot.miniKv.latencyMs).toBe(7);
    expect(snapshot.miniKv.message).toContain("health=OK live_keys=2");
    expect(snapshot.miniKv.message).toContain("wal_enabled=true");
    expect(snapshot.miniKv.details).toMatchObject({
      statsJson: {
        stats: {
          live_keys: 2,
          wal_enabled: true,
        },
      },
    });
  });

  it("keeps Java probe usable when the business overview is unavailable", async () => {
    const orderPlatform = {
      health: async () => ({
        statusCode: 200,
        latencyMs: 4,
        data: { status: "UP" },
      }),
      opsOverview: async () => {
        throw new Error("not found");
      },
    } as unknown as OrderPlatformClient;
    const miniKv = {
      ping: async () => ({ command: "PING orderops", response: "orderops", latencyMs: 3 }),
      health: async () => ({ command: "HEALTH", response: "OK live_keys=0 wal_enabled=no", latencyMs: 5 }),
      statsJson: async () => ({
        command: "STATSJSON",
        response: '{"live_keys":0,"wal_enabled":false}',
        latencyMs: 7,
        stats: { live_keys: 0, wal_enabled: false },
      }),
    } as unknown as MiniKvClient;
    const service = new OpsSnapshotService(orderPlatform, miniKv, true);

    const snapshot = await service.sample();

    expect(snapshot.javaOrderPlatform.state).toBe("degraded");
    expect(snapshot.javaOrderPlatform.message).toContain("ops_overview=unavailable");
    expect(snapshot.javaOrderPlatform.details).toMatchObject({
      opsOverview: {
        status: "unavailable",
        message: "not found",
      },
    });
  });
});
