import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion decision routes", () => {
  it("records the current blocked promotion review", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-admin",
          note: "capture blocked review",
        },
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        service: "orderops-node",
        sequence: 1,
        reviewer: "decision-admin",
        note: "capture blocked review",
        outcome: "blocked",
        readyForPromotion: false,
        digest: {
          algorithm: "sha256",
        },
        review: {
          decision: "blocked",
          readyForPromotion: false,
          summary: {
            readinessState: "blocked",
            runbookState: "blocked",
            baselineState: "unset",
          },
        },
      });
      expect(response.json().digest.value).toMatch(/^[a-f0-9]{64}$/);
    } finally {
      await app.close();
    }
  });

  it("records an approved promotion review after local evidence is complete", async () => {
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
          action: "kv-status",
          operatorId: "decision-viewer",
          role: "viewer",
          reason: "v19 decision approved test",
        },
      });
      await app.inject({
        method: "POST",
        url: `/api/v1/operation-intents/${created.json().id}/confirm`,
        payload: {
          operatorId: "decision-viewer",
          confirmText: created.json().confirmation.requiredText,
        },
      });
      await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: created.json().id,
          requestedBy: "decision-viewer",
        },
      });
      const checkpoint = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "decision-viewer",
          note: "approved evidence",
        },
      });
      await app.inject({
        method: "PUT",
        url: "/api/v1/ops/baseline",
        payload: {
          checkpointId: checkpoint.json().id,
          actor: "decision-viewer",
          note: "approved baseline",
        },
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-viewer",
          note: "approved decision",
        },
      });

      expect(decision.statusCode).toBe(201);
      expect(decision.json()).toMatchObject({
        outcome: "approved",
        readyForPromotion: true,
        review: {
          decision: "approved",
          readyForPromotion: true,
          summary: {
            readinessState: "ready",
            runbookState: "ready",
            baselineState: "current",
          },
        },
      });
    } finally {
      await app.close();
    }
  });

  it("lists and retrieves promotion decisions newest first", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const first = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-admin",
          note: "first",
        },
      });
      const second = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "decision-admin",
          note: "second",
        },
      });
      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions?limit=10",
      });
      const retrieved = await app.inject({
        method: "GET",
        url: `/api/v1/ops/promotion-decisions/${first.json().id}`,
      });
      const missing = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-decisions/missing-decision",
      });

      expect(first.statusCode).toBe(201);
      expect(second.statusCode).toBe(201);
      expect(listed.statusCode).toBe(200);
      expect(listed.json().decisions.map((decision: { sequence: number }) => decision.sequence)).toEqual([2, 1]);
      expect(retrieved.statusCode).toBe(200);
      expect(retrieved.json()).toMatchObject({
        id: first.json().id,
        sequence: 1,
        note: "first",
      });
      expect(missing.statusCode).toBe(404);
      expect(missing.json()).toMatchObject({
        error: "OPS_PROMOTION_DECISION_NOT_FOUND",
      });
    } finally {
      await app.close();
    }
  });
});
