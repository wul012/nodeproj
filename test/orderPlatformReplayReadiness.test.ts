import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const openServers: Array<ReturnType<typeof createServer>> = [];

afterEach(async () => {
  await Promise.all(openServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

describe("Java failed-event replay readiness route", () => {
  it("is blocked by default so read-only probes cannot touch Java accidentally", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/order-platform/failed-events/42/replay-readiness",
      });

      expect(response.statusCode).toBe(403);
      expect(response.json()).toMatchObject({
        error: "UPSTREAM_PROBES_DISABLED",
      });
    } finally {
      await app.close();
    }
  });

  it("proxies Java v38 replay readiness when probe mode is enabled", async () => {
    const server = createServer((request, response) => {
      expect(request.method).toBe("GET");
      expect(request.url).toBe("/api/v1/failed-events/42/replay-readiness");
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({
        sampledAt: "2026-05-11T00:00:00Z",
        failedEventId: 42,
        exists: true,
        eventType: "OrderPaid",
        aggregateType: "Order",
        aggregateId: "order-42",
        failedAt: "2026-05-10T23:59:00Z",
        managementStatus: "OPEN",
        replayApprovalStatus: "PENDING",
        replayBacklogPosition: 1,
        eligibleForReplay: false,
        requiresApproval: true,
        blockedBy: ["REPLAY_APPROVAL_PENDING"],
        warnings: [],
        nextAllowedActions: ["REVIEW_REPLAY_APPROVAL"],
        latestReplayAttempt: null,
        latestApproval: {
          action: "REQUESTED",
          status: "PENDING",
        },
      }));
    });
    openServers.push(server);

    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address() as AddressInfo;
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      ORDER_PLATFORM_URL: `http://127.0.0.1:${address.port}`,
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/order-platform/failed-events/42/replay-readiness",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        failedEventId: 42,
        eligibleForReplay: false,
        requiresApproval: true,
        blockedBy: ["REPLAY_APPROVAL_PENDING"],
        nextAllowedActions: ["REVIEW_REPLAY_APPROVAL"],
      });
    } finally {
      await app.close();
    }
  });
});
