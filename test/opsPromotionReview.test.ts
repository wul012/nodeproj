import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion review route", () => {
  it("blocks promotion by default", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-review",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        service: "orderops-node",
        decision: "blocked",
        readyForPromotion: false,
        summary: {
          readinessState: "blocked",
          runbookState: "blocked",
          baselineState: "unset",
        },
      });
      expect(response.json().reasons).toEqual(expect.arrayContaining([
        expect.objectContaining({
          code: "READINESS_NOT_READY",
          severity: "blocker",
        }),
        expect.objectContaining({
          code: "RUNBOOK_NOT_READY",
          severity: "blocker",
        }),
        expect.objectContaining({
          code: "NO_CHECKPOINT",
          severity: "review",
        }),
        expect.objectContaining({
          code: "BASELINE_UNSET",
          severity: "review",
        }),
      ]));
    } finally {
      await app.close();
    }
  });

  it("approves promotion when readiness, runbook, checkpoint, and baseline are clean", async () => {
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
          operatorId: "promotion-viewer",
          role: "viewer",
          reason: "v18 promotion approved test",
        },
      });
      const confirmed = await app.inject({
        method: "POST",
        url: `/api/v1/operation-intents/${created.json().id}/confirm`,
        payload: {
          operatorId: "promotion-viewer",
          confirmText: created.json().confirmation.requiredText,
        },
      });
      const dispatched = await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: created.json().id,
          requestedBy: "promotion-viewer",
        },
      });
      const checkpoint = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "promotion-viewer",
          note: "approved local evidence",
        },
      });
      const baseline = await app.inject({
        method: "PUT",
        url: "/api/v1/ops/baseline",
        payload: {
          checkpointId: checkpoint.json().id,
          actor: "promotion-viewer",
          note: "approved baseline",
        },
      });
      const review = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-review",
      });

      expect(created.statusCode).toBe(201);
      expect(confirmed.statusCode).toBe(200);
      expect(dispatched.statusCode).toBe(201);
      expect(checkpoint.statusCode).toBe(201);
      expect(baseline.statusCode).toBe(200);
      expect(review.statusCode).toBe(200);
      expect(review.json()).toMatchObject({
        decision: "approved",
        readyForPromotion: true,
        summary: {
          readinessState: "ready",
          runbookState: "ready",
          baselineState: "current",
          latestCheckpointSequence: 1,
          baselineCheckpointSequence: 1,
        },
      });
      expect(review.json().reasons.every((reason: { severity: string }) => reason.severity === "pass")).toBe(true);
    } finally {
      await app.close();
    }
  });

  it("blocks promotion when the latest checkpoint regressed from baseline", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const base = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "promotion-admin",
          note: "before regression",
        },
      });
      await app.inject({
        method: "PUT",
        url: "/api/v1/ops/baseline",
        payload: {
          checkpointId: base.json().id,
          actor: "promotion-admin",
          note: "baseline before regression",
        },
      });
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "promotion-admin",
          role: "admin",
          reason: "v18 promotion regression test",
        },
      });
      const target = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "promotion-admin",
          note: "after regression",
        },
      });
      const review = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-review",
      });

      expect(base.statusCode).toBe(201);
      expect(created.statusCode).toBe(201);
      expect(target.statusCode).toBe(201);
      expect(review.statusCode).toBe(200);
      expect(review.json()).toMatchObject({
        decision: "blocked",
        readyForPromotion: false,
        summary: {
          baselineState: "drifted",
          latestCheckpointSequence: 2,
          baselineCheckpointSequence: 1,
        },
      });
      expect(review.json().reasons).toEqual(expect.arrayContaining([
        expect.objectContaining({
          code: "BASELINE_REGRESSED",
          severity: "blocker",
        }),
      ]));
    } finally {
      await app.close();
    }
  });
});
