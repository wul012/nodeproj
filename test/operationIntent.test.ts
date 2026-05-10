import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AppHttpError } from "../src/errors.js";
import { OperationIntentStore, evaluatePolicy } from "../src/services/operationIntent.js";
import { createActionPlan } from "../src/services/actionPlanner.js";

describe("operation intent policy", () => {
  it("blocks intents when the upstream action gate is closed", () => {
    const store = new OperationIntentStore(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "false" }));

    const intent = store.create({
      action: "kv-set",
      operatorId: "dev-admin",
      role: "admin",
      reason: "safe dry-run",
    });

    expect(intent).toMatchObject({
      status: "blocked",
      policy: {
        allowed: false,
        blockedBy: "UPSTREAM_ACTIONS_ENABLED=false",
        requiredRole: "admin",
        actualRole: "admin",
      },
      plan: {
        dryRun: true,
        action: "kv-set",
        allowed: false,
      },
    });

    expect(store.listEvents({ intentId: intent.id }).map((event) => event.type)).toEqual([
      "intent.blocked",
      "intent.created",
    ]);
  });

  it("requires admin role for write actions after the action gate opens", () => {
    const config = loadConfig({ UPSTREAM_ACTIONS_ENABLED: "true" });
    const plan = createActionPlan(config, { action: "order-create" });

    expect(evaluatePolicy(plan, "operator")).toMatchObject({
      allowed: false,
      blockedBy: "ROLE_NOT_ALLOWED",
      requiredRole: "admin",
      actualRole: "operator",
    });
    expect(evaluatePolicy(plan, "admin")).toMatchObject({
      allowed: true,
      requiredRole: "admin",
      actualRole: "admin",
    });
  });

  it("moves a confirmable intent to confirmed with the exact phrase", () => {
    const store = new OperationIntentStore(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }));
    const intent = store.create({
      action: "kv-status",
      operatorId: "dev-viewer",
      role: "viewer",
    });

    const confirmed = store.confirm(intent.id, {
      operatorId: "dev-viewer",
      confirmText: intent.confirmation.requiredText,
    });

    expect(intent.status).toBe("pending-confirmation");
    expect(confirmed).toMatchObject({
      id: intent.id,
      status: "confirmed",
      confirmation: {
        confirmedBy: "dev-viewer",
      },
    });
    expect(store.getTimeline(intent.id).events.map((event) => event.type)).toEqual([
      "intent.created",
      "intent.awaiting_confirmation",
      "intent.confirmation.accepted",
    ]);
  });

  it("rejects mismatched confirmation text", () => {
    const store = new OperationIntentStore(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }));
    const intent = store.create({
      action: "kv-status",
      operatorId: "dev-viewer",
      role: "viewer",
    });

    expect(() => store.confirm(intent.id, {
      operatorId: "dev-viewer",
      confirmText: "CONFIRM wrong",
    })).toThrow(AppHttpError);
    expect(store.listEvents({ type: "intent.confirmation.rejected" })).toHaveLength(1);
  });
});

describe("operation intent routes", () => {
  it("creates and lists blocked intents through Fastify without calling upstream routes", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "order-create",
          operatorId: "local-dev",
          role: "admin",
          reason: "route smoke",
        },
      });

      expect(created.statusCode).toBe(201);
      expect(created.json()).toMatchObject({
        status: "blocked",
        policy: {
          blockedBy: "UPSTREAM_ACTIONS_ENABLED=false",
        },
      });

      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/operation-intents?limit=5",
      });

      expect(listed.statusCode).toBe(200);
      expect(listed.json().intents).toHaveLength(1);

      const events = await app.inject({
        method: "GET",
        url: "/api/v1/operation-intent-events?limit=5",
      });

      expect(events.statusCode).toBe(200);
      expect(events.json().events.map((event: { type: string }) => event.type)).toEqual([
        "intent.blocked",
        "intent.created",
      ]);

      const timeline = await app.inject({
        method: "GET",
        url: `/api/v1/operation-intents/${created.json().id}/timeline`,
      });

      expect(timeline.statusCode).toBe(200);
      expect(timeline.json().events.map((event: { type: string }) => event.type)).toEqual([
        "intent.created",
        "intent.blocked",
      ]);
    } finally {
      await app.close();
    }
  });
});
