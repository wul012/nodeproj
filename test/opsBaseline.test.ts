import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops baseline routes", () => {
  it("reports unset before a baseline is selected", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/baseline",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        service: "orderops-node",
        state: "unset",
      });
      expect(response.json().guidance).toEqual(expect.arrayContaining([
        expect.stringContaining("Create a checkpoint"),
      ]));
    } finally {
      await app.close();
    }
  });

  it("sets a checkpoint as the current baseline", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const checkpoint = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "baseline-admin",
          note: "first baseline checkpoint",
        },
      });
      const baseline = await app.inject({
        method: "PUT",
        url: "/api/v1/ops/baseline",
        payload: {
          checkpointId: checkpoint.json().id,
          actor: "baseline-admin",
          note: "set baseline",
        },
      });

      expect(checkpoint.statusCode).toBe(201);
      expect(baseline.statusCode).toBe(200);
      expect(baseline.json()).toMatchObject({
        state: "current",
        baseline: {
          checkpointId: checkpoint.json().id,
          sequence: 1,
          setBy: "baseline-admin",
          note: "set baseline",
        },
        latest: {
          checkpointId: checkpoint.json().id,
          sequence: 1,
        },
      });
    } finally {
      await app.close();
    }
  });

  it("reports drift when the latest checkpoint regresses from the baseline", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const base = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "baseline-admin",
          note: "before blocked intent",
        },
      });
      await app.inject({
        method: "PUT",
        url: "/api/v1/ops/baseline",
        payload: {
          checkpointId: base.json().id,
          actor: "baseline-admin",
          note: "stable local state",
        },
      });
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "baseline-admin",
          role: "admin",
          reason: "v17 baseline drift test",
        },
      });
      const target = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "baseline-admin",
          note: "after blocked intent",
        },
      });
      const baseline = await app.inject({
        method: "GET",
        url: "/api/v1/ops/baseline",
      });

      expect(base.statusCode).toBe(201);
      expect(created.statusCode).toBe(201);
      expect(target.statusCode).toBe(201);
      expect(baseline.statusCode).toBe(200);
      expect(baseline.json()).toMatchObject({
        state: "drifted",
        baseline: {
          checkpointId: base.json().id,
          sequence: 1,
        },
        latest: {
          checkpointId: target.json().id,
          sequence: 2,
        },
        diff: {
          direction: "regressed",
          signals: {
            blockedIntents: {
              from: 0,
              to: 1,
              direction: "regressed",
            },
          },
        },
      });
    } finally {
      await app.close();
    }
  });

  it("clears the selected baseline", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const checkpoint = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "baseline-admin",
          note: "clear baseline checkpoint",
        },
      });
      await app.inject({
        method: "PUT",
        url: "/api/v1/ops/baseline",
        payload: {
          checkpointId: checkpoint.json().id,
        },
      });
      const cleared = await app.inject({
        method: "DELETE",
        url: "/api/v1/ops/baseline",
      });

      expect(cleared.statusCode).toBe(200);
      expect(cleared.json()).toMatchObject({
        state: "unset",
        cleared: {
          checkpointId: checkpoint.json().id,
        },
      });
    } finally {
      await app.close();
    }
  });
});
