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
});
