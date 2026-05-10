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
});
