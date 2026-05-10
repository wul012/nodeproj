import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops runbook route", () => {
  it("returns a blocked local checklist by default", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/runbook",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        service: "orderops-node",
        state: "blocked",
        readyForExecution: false,
        totals: {
          blocked: 1,
          todo: 2,
          info: 1,
        },
        summary: {
          readinessState: "blocked",
          readyForUpstreamExecution: false,
          safety: {
            upstreamActionsEnabled: false,
            upstreamProbesEnabled: false,
          },
        },
      });
      expect(response.json().steps).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: "ACTION_GATE",
          status: "blocked",
        }),
        expect.objectContaining({
          id: "PROBE_MODE",
          status: "todo",
        }),
        expect.objectContaining({
          id: "DRY_RUN_EVIDENCE",
          status: "todo",
        }),
      ]));
    } finally {
      await app.close();
    }
  });

  it("becomes ready after local gates and dry-run evidence are complete", async () => {
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
          operatorId: "runbook-viewer",
          role: "viewer",
          reason: "v14 runbook ready test",
        },
      });
      const confirmed = await app.inject({
        method: "POST",
        url: `/api/v1/operation-intents/${created.json().id}/confirm`,
        payload: {
          operatorId: "runbook-viewer",
          confirmText: created.json().confirmation.requiredText,
        },
      });
      const dispatched = await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: created.json().id,
          requestedBy: "runbook-viewer",
        },
      });
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/runbook",
      });

      expect(created.statusCode).toBe(201);
      expect(confirmed.statusCode).toBe(200);
      expect(dispatched.statusCode).toBe(201);
      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        state: "ready",
        readyForExecution: true,
        totals: {
          blocked: 0,
          todo: 0,
          info: 1,
        },
        summary: {
          readinessState: "ready",
          readyForUpstreamExecution: true,
          signals: {
            dryRunDispatches: 1,
            upstreamTouchedDispatches: 0,
          },
        },
      });
      expect(response.json().steps).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: "DRY_RUN_EVIDENCE",
          status: "done",
          evidence: 1,
        }),
      ]));
    } finally {
      await app.close();
    }
  });

  it("renders the runbook as markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/ops/runbook?format=markdown",
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toContain("text/markdown");
      expect(response.body).toContain("# OrderOps Runbook Checklist");
      expect(response.body).toContain("- State: blocked");
      expect(response.body).toContain("[blocked] ACTION_GATE");
    } finally {
      await app.close();
    }
  });
});
