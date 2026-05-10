import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops readiness route", () => {
  it("blocks upstream execution by default", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/readiness",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        service: "orderops-node",
        state: "blocked",
        readyForUpstreamExecution: false,
      });
      expect(response.json().checks).toEqual(expect.arrayContaining([
        expect.objectContaining({
          code: "UPSTREAM_ACTION_GATE",
          severity: "blocker",
        }),
        expect.objectContaining({
          code: "UPSTREAM_PROBE_GATE",
          severity: "warning",
        }),
      ]));
    } finally {
      await app.close();
    }
  });

  it("reports ready when action and probe gates are open with no warning signals", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_ACTIONS_ENABLED: "true",
      UPSTREAM_PROBES_ENABLED: "true",
    }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/readiness",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        state: "ready",
        readyForUpstreamExecution: true,
        blockers: 0,
        warnings: 0,
      });
    } finally {
      await app.close();
    }
  });

  it("warns when local policy signals are present even if gates are open", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_ACTIONS_ENABLED: "true",
      UPSTREAM_PROBES_ENABLED: "true",
    }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "order-create",
          operatorId: "readiness-operator",
          role: "operator",
        },
      });
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/readiness",
      });

      expect(created.statusCode).toBe(201);
      expect(created.json().status).toBe("blocked");
      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        state: "warning",
        readyForUpstreamExecution: false,
        blockers: 0,
      });
      expect(response.json().checks).toEqual(expect.arrayContaining([
        expect.objectContaining({
          code: "BLOCKED_INTENTS",
          severity: "warning",
          value: 1,
        }),
      ]));
    } finally {
      await app.close();
    }
  });
});
