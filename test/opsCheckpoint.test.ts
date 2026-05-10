import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops checkpoint routes", () => {
  it("captures the current local ops state as a digest-backed checkpoint", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "checkpoint-admin",
          role: "admin",
          reason: "v15 checkpoint test",
        },
      });
      const checkpoint = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "checkpoint-admin",
          note: "capture blocked local state",
        },
      });

      expect(created.statusCode).toBe(201);
      expect(checkpoint.statusCode).toBe(201);
      expect(checkpoint.json()).toMatchObject({
        service: "orderops-node",
        sequence: 1,
        actor: "checkpoint-admin",
        note: "capture blocked local state",
        digest: {
          algorithm: "sha256",
        },
        decision: {
          readinessState: "blocked",
          runbookState: "blocked",
          readyForExecution: false,
        },
        snapshot: {
          summary: {
            signals: {
              blockedIntents: 1,
              upstreamTouchedDispatches: 0,
            },
          },
          readiness: {
            state: "blocked",
          },
          runbook: {
            state: "blocked",
          },
        },
      });
      expect(checkpoint.json().digest.value).toMatch(/^[a-f0-9]{64}$/);
    } finally {
      await app.close();
    }
  });

  it("lists and retrieves checkpoints newest first", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const first = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "checkpoint-admin",
          note: "first",
        },
      });
      const second = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "checkpoint-admin",
          note: "second",
        },
      });
      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/ops/checkpoints?limit=10",
      });
      const retrieved = await app.inject({
        method: "GET",
        url: `/api/v1/ops/checkpoints/${first.json().id}`,
      });

      expect(first.statusCode).toBe(201);
      expect(second.statusCode).toBe(201);
      expect(listed.statusCode).toBe(200);
      expect(listed.json().checkpoints.map((checkpoint: { sequence: number }) => checkpoint.sequence)).toEqual([2, 1]);
      expect(retrieved.statusCode).toBe(200);
      expect(retrieved.json()).toMatchObject({
        id: first.json().id,
        sequence: 1,
        note: "first",
      });
    } finally {
      await app.close();
    }
  });

  it("returns 404 for an unknown checkpoint", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/checkpoints/missing-checkpoint",
      });

      expect(response.statusCode).toBe(404);
      expect(response.json()).toMatchObject({
        error: "OPS_CHECKPOINT_NOT_FOUND",
      });
    } finally {
      await app.close();
    }
  });
});
