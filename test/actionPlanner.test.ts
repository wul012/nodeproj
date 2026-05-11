import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createActionPlan, listActionCatalog } from "../src/services/actionPlanner.js";

describe("action planner", () => {
  it("describes a blocked mini-kv write without opening a socket", () => {
    const config = loadConfig({
      MINIKV_HOST: "10.10.0.5",
      MINIKV_PORT: "7001",
      UPSTREAM_ACTIONS_ENABLED: "false",
    });

    const plan = createActionPlan(config, { action: "kv-set" });

    expect(plan).toMatchObject({
      dryRun: true,
      action: "kv-set",
      target: "mini-kv",
      risk: "write",
      allowed: false,
      blockedBy: "UPSTREAM_ACTIONS_ENABLED=false",
      nodeRoute: {
        method: "PUT",
        path: "/api/v1/mini-kv/:key",
      },
      wouldCall: {
        type: "tcp",
        endpoint: "10.10.0.5:7001",
      },
      safety: {
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
      },
    });
  });

  it("marks a Java read as allowed when the action gate is enabled", () => {
    const config = loadConfig({
      ORDER_PLATFORM_URL: "http://order-platform.test:8080/",
      UPSTREAM_ACTIONS_ENABLED: "true",
    });

    const plan = createActionPlan(config, { target: "order-platform", action: "order-products" });

    expect(plan).toMatchObject({
      action: "order-products",
      target: "order-platform",
      risk: "read",
      allowed: true,
      nodeRoute: {
        method: "GET",
        path: "/api/v1/order-platform/products",
      },
      wouldCall: {
        type: "http",
        endpoint: "http://order-platform.test:8080",
        method: "GET",
        path: "/api/v1/products",
      },
    });
    expect(plan.blockedBy).toBeUndefined();
  });

  it("uses the probe gate for Java failed-event replay readiness and simulation", () => {
    const config = loadConfig({
      ORDER_PLATFORM_URL: "http://order-platform.test:8080/",
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "false",
    });

    const plan = createActionPlan(config, { action: "failed-event-replay-readiness" });

    expect(plan).toMatchObject({
      action: "failed-event-replay-readiness",
      target: "order-platform",
      risk: "read",
      allowed: true,
      requires: ["failedEventId"],
      nodeRoute: {
        method: "GET",
        path: "/api/v1/order-platform/failed-events/:failedEventId/replay-readiness",
      },
      wouldCall: {
        type: "http",
        endpoint: "http://order-platform.test:8080",
        method: "GET",
        path: "/api/v1/failed-events/:failedEventId/replay-readiness",
      },
      safety: {
        upstreamProbesEnabled: true,
        upstreamActionsEnabled: false,
      },
    });
    expect(plan.blockedBy).toBeUndefined();

    const simulationPlan = createActionPlan(config, { action: "failed-event-replay-simulation" });
    expect(simulationPlan).toMatchObject({
      action: "failed-event-replay-simulation",
      target: "order-platform",
      risk: "read",
      allowed: true,
      requires: ["failedEventId"],
      nodeRoute: {
        method: "GET",
        path: "/api/v1/order-platform/failed-events/:failedEventId/replay-simulation",
      },
      wouldCall: {
        type: "http",
        endpoint: "http://order-platform.test:8080",
        method: "GET",
        path: "/api/v1/failed-events/:failedEventId/replay-simulation",
      },
    });
  });

  it("keeps the catalog grouped by target", () => {
    const catalog = listActionCatalog();
    const actions = catalog.map((action) => action.action);

    expect(actions).toContain("order-create");
    expect(actions).toContain("failed-event-replay-readiness");
    expect(actions).toContain("failed-event-replay-simulation");
    expect(actions).toContain("kv-command");
    expect(catalog.every((action) => !("upstream" in action))).toBe(true);
  });
});

describe("action plan routes", () => {
  it("returns a dry-run plan through Fastify without calling upstream routes", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/action-plans",
        payload: { action: "order-create" },
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        dryRun: true,
        action: "order-create",
        allowed: false,
        blockedBy: "UPSTREAM_ACTIONS_ENABLED=false",
      });
    } finally {
      await app.close();
    }
  });

  it("rejects target/action mismatches with an application error", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/action-plans",
        payload: { target: "mini-kv", action: "order-products" },
      });

      expect(response.statusCode).toBe(400);
      expect(response.json()).toMatchObject({
        error: "ACTION_TARGET_MISMATCH",
      });
    } finally {
      await app.close();
    }
  });
});
