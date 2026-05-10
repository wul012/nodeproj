import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { OperationDispatchLedger } from "../src/services/operationDispatch.js";
import { OperationIntentStore } from "../src/services/operationIntent.js";

describe("operation dispatch ledger", () => {
  it("rejects dispatch for a blocked intent without touching upstreams", () => {
    const intents = new OperationIntentStore(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "false" }));
    const dispatches = new OperationDispatchLedger(intents);
    const intent = intents.create({
      action: "kv-set",
      operatorId: "dev-admin",
      role: "admin",
    });

    const dispatch = dispatches.create({
      intentId: intent.id,
      requestedBy: "dev-admin",
    });

    expect(dispatch).toMatchObject({
      intentId: intent.id,
      status: "rejected",
      mode: "dry-run",
      upstreamTouched: false,
      rejection: {
        code: "INTENT_NOT_CONFIRMED",
        intentStatus: "blocked",
      },
    });
    expect(intents.getTimeline(intent.id).events.map((event) => event.type)).toEqual([
      "intent.created",
      "intent.blocked",
      "intent.dispatch.rejected",
    ]);
  });

  it("completes a dry-run dispatch for a confirmed intent without calling upstreams", () => {
    const intents = new OperationIntentStore(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }));
    const dispatches = new OperationDispatchLedger(intents);
    const intent = intents.create({
      action: "kv-status",
      operatorId: "dev-viewer",
      role: "viewer",
    });
    const confirmed = intents.confirm(intent.id, {
      operatorId: "dev-viewer",
      confirmText: intent.confirmation.requiredText,
    });

    const dispatch = dispatches.create({
      intentId: confirmed.id,
      requestedBy: "dev-viewer",
    });

    expect(dispatch).toMatchObject({
      intentId: intent.id,
      status: "dry-run-completed",
      mode: "dry-run",
      upstreamTouched: false,
      wouldCall: {
        type: "tcp",
      },
    });
    expect(intents.getTimeline(intent.id).events.map((event) => event.type)).toEqual([
      "intent.created",
      "intent.awaiting_confirmation",
      "intent.confirmation.accepted",
      "intent.dispatch.dry_run_completed",
    ]);
  });
});

describe("operation dispatch routes", () => {
  it("returns 409 and records a rejected dispatch for blocked intents", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "local-dev",
          role: "admin",
        },
      });
      const dispatch = await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: created.json().id,
          requestedBy: "local-dev",
        },
      });

      expect(dispatch.statusCode).toBe(409);
      expect(dispatch.json()).toMatchObject({
        status: "rejected",
        upstreamTouched: false,
        rejection: {
          code: "INTENT_NOT_CONFIRMED",
        },
      });

      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/operation-dispatches?limit=5",
      });

      expect(listed.statusCode).toBe(200);
      expect(listed.json().dispatches).toHaveLength(1);
    } finally {
      await app.close();
    }
  });

  it("returns 201 for dry-run dispatch of a confirmed intent", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-status",
          operatorId: "local-viewer",
          role: "viewer",
        },
      });
      const intent = created.json();
      const confirmed = await app.inject({
        method: "POST",
        url: `/api/v1/operation-intents/${intent.id}/confirm`,
        payload: {
          operatorId: "local-viewer",
          confirmText: intent.confirmation.requiredText,
        },
      });

      expect(confirmed.statusCode).toBe(200);

      const dispatch = await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: intent.id,
          requestedBy: "local-viewer",
        },
      });

      expect(dispatch.statusCode).toBe(201);
      expect(dispatch.json()).toMatchObject({
        status: "dry-run-completed",
        upstreamTouched: false,
      });

      const byIntent = await app.inject({
        method: "GET",
        url: `/api/v1/operation-intents/${intent.id}/dispatches`,
      });

      expect(byIntent.statusCode).toBe(200);
      expect(byIntent.json().dispatches).toHaveLength(1);
    } finally {
      await app.close();
    }
  });
});
