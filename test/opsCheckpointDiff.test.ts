import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops checkpoint diff route", () => {
  it("detects local signal regressions between two checkpoints", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const base = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "diff-admin",
          note: "before blocked intent",
        },
      });
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "diff-admin",
          role: "admin",
          reason: "v16 checkpoint diff test",
        },
      });
      const target = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "diff-admin",
          note: "after blocked intent",
        },
      });
      const diff = await app.inject({
        method: "GET",
        url: `/api/v1/ops/checkpoints/diff?baseId=${base.json().id}&targetId=${target.json().id}`,
      });

      expect(base.statusCode).toBe(201);
      expect(created.statusCode).toBe(201);
      expect(target.statusCode).toBe(201);
      expect(diff.statusCode).toBe(200);
      expect(diff.json()).toMatchObject({
        service: "orderops-node",
        direction: "regressed",
        base: {
          sequence: 1,
        },
        target: {
          sequence: 2,
        },
        signals: {
          blockedIntents: {
            from: 0,
            to: 1,
            delta: 1,
            direction: "regressed",
          },
        },
        runbookTotals: {
          todo: {
            from: 2,
            to: 3,
            delta: 1,
            direction: "regressed",
          },
        },
        summary: {
          hasRegression: true,
          hasImprovement: false,
        },
      });
      expect(diff.json().stepChanges).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: "BLOCKED_INTENTS",
          status: expect.objectContaining({
            from: "done",
            to: "todo",
            direction: "regressed",
          }),
        }),
      ]));
    } finally {
      await app.close();
    }
  });

  it("reports unchanged when checkpoint signals and runbook states do not change", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const base = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "diff-admin",
          note: "same state one",
        },
      });
      const target = await app.inject({
        method: "POST",
        url: "/api/v1/ops/checkpoints",
        payload: {
          actor: "diff-admin",
          note: "same state two",
        },
      });
      const diff = await app.inject({
        method: "GET",
        url: `/api/v1/ops/checkpoints/diff?baseId=${base.json().id}&targetId=${target.json().id}`,
      });

      expect(diff.statusCode).toBe(200);
      expect(diff.json()).toMatchObject({
        direction: "unchanged",
        summary: {
          changedSignals: 0,
          changedRunbookTotals: 0,
          changedSteps: 0,
          hasRegression: false,
          hasImprovement: false,
        },
      });
    } finally {
      await app.close();
    }
  });
});
