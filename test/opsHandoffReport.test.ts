import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops handoff report route", () => {
  it("returns a local handoff report without touching upstreams when probes are disabled", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "handoff-admin",
          role: "admin",
          reason: "v13 handoff report test",
        },
      });
      const dispatched = await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: created.json().id,
          requestedBy: "handoff-admin",
        },
      });
      const report = await app.inject({
        method: "GET",
        url: "/api/v1/ops/handoff-report?limit=5",
      });

      expect(created.statusCode).toBe(201);
      expect(dispatched.statusCode).toBe(409);
      expect(report.statusCode).toBe(200);
      expect(report.json()).toMatchObject({
        service: "orderops-node",
        sources: {
          javaOrderPlatform: {
            state: "disabled",
          },
          miniKv: {
            state: "disabled",
          },
        },
        readiness: {
          state: "blocked",
          readyForUpstreamExecution: false,
        },
        summary: {
          signals: {
            blockedIntents: 1,
            rejectedDispatches: 1,
            upstreamTouchedDispatches: 0,
          },
        },
        recent: {
          limit: 5,
        },
      });
      expect(report.json().recent.intents).toHaveLength(1);
      expect(report.json().recent.dispatches).toHaveLength(1);
      expect(report.json().recent.intentEvents.length).toBeGreaterThanOrEqual(2);
      expect(report.json().guidance).toEqual(expect.arrayContaining([
        expect.stringContaining("UPSTREAM_ACTIONS_ENABLED=true"),
      ]));
    } finally {
      await app.close();
    }
  });

  it("renders the handoff report as markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/handoff-report?format=markdown",
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toContain("text/markdown");
      expect(response.body).toContain("# OrderOps Handoff Report");
      expect(response.body).toContain("- Readiness: blocked");
      expect(response.body).toContain("Java order platform: disabled");
      expect(response.body).toContain("mini-kv: disabled");
    } finally {
      await app.close();
    }
  });
});
