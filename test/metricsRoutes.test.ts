import { createServer as createHttpServer } from "node:http";
import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const httpServers: Array<ReturnType<typeof createHttpServer>> = [];
const tcpServers: net.Server[] = [];

afterEach(async () => {
  await Promise.all([
    ...httpServers.splice(0).map(closeServer),
    ...tcpServers.splice(0).map(closeServer),
  ]);
});

describe("metrics route", () => {
  it("reports per-client upstream counters from real client calls", async () => {
    const orderPlatform = createHttpServer((request, response) => {
      expect(request.method).toBe("GET");
      expect(request.url).toBe("/api/v1/failed-events/42/replay-readiness");
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({
        sampledAt: "2026-06-12T00:00:00Z",
        failedEventId: 42,
        exists: true,
        eligibleForReplay: false,
        requiresApproval: true,
        blockedBy: ["REPLAY_APPROVAL_PENDING"],
        warnings: [],
        nextAllowedActions: ["REVIEW_REPLAY_APPROVAL"],
      }));
    });
    httpServers.push(orderPlatform);
    await listen(orderPlatform);

    const miniKv = net.createServer((socket) => {
      socket.setEncoding("utf8");
      socket.on("data", (chunk: string) => {
        if (!chunk.includes("\n")) {
          return;
        }
        socket.end(JSON.stringify({
          prefix: "orderops",
          key_count: 1,
          keys: ["orderops:1"],
          truncated: false,
          limit: 1000,
        }) + "\n");
      });
    });
    tcpServers.push(miniKv);
    await listen(miniKv);

    const orderAddress = orderPlatform.address() as AddressInfo;
    const miniKvAddress = miniKv.address() as AddressInfo;
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      ORDER_PLATFORM_URL: `http://127.0.0.1:${orderAddress.port}`,
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: String(miniKvAddress.port),
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const emptyMetrics = await app.inject({ method: "GET", url: "/api/v1/metrics" });
      expect(emptyMetrics.statusCode).toBe(200);
      expect(emptyMetrics.headers["cache-control"]).toBe("no-store");
      expect(emptyMetrics.headers["x-orderops-request-id"]).toEqual(expect.any(String));
      expect(emptyMetrics.json().clients["order-platform"].requests).toBe(0);
      expect(emptyMetrics.json().clients["mini-kv"].requests).toBe(0);

      const orderResponse = await app.inject({
        method: "GET",
        url: "/api/v1/order-platform/failed-events/42/replay-readiness",
      });
      const miniKvResponse = await app.inject({
        method: "GET",
        url: "/api/v1/mini-kv/keys?prefix=orderops",
      });
      const metrics = await app.inject({ method: "GET", url: "/api/v1/metrics" });

      expect(orderResponse.statusCode).toBe(200);
      expect(miniKvResponse.statusCode).toBe(200);
      expect(metrics.json().clients["order-platform"]).toMatchObject({
        requests: 1,
        errors: 0,
        timeouts: 0,
        latencyMs: {
          count: 1,
        },
      });
      expect(metrics.json().clients["mini-kv"]).toMatchObject({
        requests: 1,
        errors: 0,
        timeouts: 0,
        latencyMs: {
          count: 1,
        },
      });
    } finally {
      await app.close();
    }
  });

  it("returns request ids on application errors and records the same id in audit", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const errorResponse = await app.inject({
        method: "POST",
        url: "/api/v1/action-plans",
        payload: { target: "mini-kv", action: "order-products" },
      });
      const body = errorResponse.json();
      const auditEvents = await app.inject({
        method: "GET",
        url: "/api/v1/audit/events?limit=1",
      });

      expect(errorResponse.statusCode).toBe(400);
      expect(body).toMatchObject({
        error: "ACTION_TARGET_MISMATCH",
        requestId: expect.any(String),
      });
      expect(errorResponse.headers["x-orderops-request-id"]).toBe(body.requestId);
      expect(auditEvents.json().events[0]).toMatchObject({
        requestId: body.requestId,
        method: "POST",
        statusCode: 400,
      });
    } finally {
      await app.close();
    }
  });
});

async function listen(server: ReturnType<typeof createHttpServer> | net.Server): Promise<void> {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
}

async function closeServer(server: ReturnType<typeof createHttpServer> | net.Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
}
