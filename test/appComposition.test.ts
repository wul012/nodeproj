import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { APP_ROUTE_STAGE_NAMES } from "../src/app/registerRoutes.js";
import { loadConfig } from "../src/config.js";

const EXPECTED_ROUTE_STAGES = [
  "dashboard",
  "audit",
  "action-plan",
  "operation-preflight",
  "approval-request",
  "approval-decision",
  "approval-evidence",
  "execution-gate-archive",
  "operation-intent",
  "operation-dispatch",
  "ops-summary",
  "status",
  "metrics",
  "order-platform",
  "mini-kv",
] as const;

describe("application composition", () => {
  it("freezes the ordered route stages and complete Fastify route tree", async () => {
    expect(APP_ROUTE_STAGE_NAMES).toEqual(EXPECTED_ROUTE_STAGES);
    expect(new Set(APP_ROUTE_STAGE_NAMES).size).toBe(APP_ROUTE_STAGE_NAMES.length);

    const app = await buildApp(loadTestConfig());
    try {
      await app.ready();
      const routeTree = app.printRoutes({ commonPrefix: false }).replace(/\r\n/g, "\n");

      expect(Buffer.byteLength(routeTree, "utf8")).toBe(41_596);
      expect(routeTree.split("\n")).toHaveLength(460);
      expect(createHash("sha256").update(routeTree).digest("hex")).toBe(
        "e8fbc705761b2cf5f774d18e4879caf1b46ee6cb11046f4acdb71d6bbd778de9",
      );
    } finally {
      await app.close();
    }
  });

  it("preserves global headers, CORS preflight, and generic error mapping", async () => {
    const app = await buildApp(loadTestConfig());
    app.get("/__app-composition-error", async () => {
      throw new Error("composition failure");
    });

    try {
      const health = await app.inject({ method: "GET", url: "/health" });
      const options = await app.inject({ method: "OPTIONS", url: "/api/v1/orders" });
      const failed = await app.inject({ method: "GET", url: "/__app-composition-error" });

      expect(health.headers["x-orderops-service"]).toBe("orderops-node");
      expect(health.headers["x-orderops-request-id"]).toBeTruthy();
      expect(health.headers["x-orderops-access-guard-mode"]).toBe("dry-run");
      expect(options.statusCode).toBe(204);
      expect(options.headers["access-control-allow-methods"]).toBe("GET,POST,PUT,DELETE,OPTIONS");
      expect(failed.statusCode).toBe(500);
      expect(failed.json()).toMatchObject({
        error: "INTERNAL_ERROR",
        message: "composition failure",
        requestId: failed.headers["x-orderops-request-id"],
      });
    } finally {
      await app.close();
    }
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "false",
  });
}
