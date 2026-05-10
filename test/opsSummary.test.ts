import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops summary routes", () => {
  it("summarizes intents, dispatches, events, and safety flags", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "summary-admin",
          role: "admin",
        },
      });
      const dispatched = await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: created.json().id,
          requestedBy: "summary-admin",
        },
      });
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/summary",
      });

      expect(created.statusCode).toBe(201);
      expect(dispatched.statusCode).toBe(409);
      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        service: "orderops-node",
        safety: {
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
        },
        intents: {
          total: 1,
          byStatus: {
            blocked: 1,
          },
        },
        dispatches: {
          total: 1,
          byStatus: {
            rejected: 1,
          },
          upstreamTouched: 0,
        },
        signals: {
          blockedIntents: 1,
          rejectedDispatches: 1,
          upstreamTouchedDispatches: 0,
        },
      });
      expect(response.json().events.byType["intent.dispatch.rejected"]).toBe(1);
    } finally {
      await app.close();
    }
  });

  it("surfaces rate limited mutation requests in summary signals", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      MUTATION_RATE_LIMIT_MAX: "1",
      MUTATION_RATE_LIMIT_WINDOW_MS: "60000",
    }));

    try {
      const payload = {
        action: "kv-set",
        operatorId: "summary-limited",
        role: "admin",
      };
      await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload,
      });
      const limited = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          ...payload,
          action: "kv-delete",
        },
      });
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/summary",
      });

      expect(limited.statusCode).toBe(429);
      expect(response.statusCode).toBe(200);
      expect(response.json().mutationRateLimit).toMatchObject({
        maxRequests: 1,
        windowMs: 60000,
      });
      expect(response.json().signals.rateLimitedRequests).toBe(1);
    } finally {
      await app.close();
    }
  });
});
