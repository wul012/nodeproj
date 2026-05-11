import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import type { MiniKvClient } from "../src/clients/miniKvClient.js";
import type { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { loadConfig } from "../src/config.js";
import { OperationDispatchLedger } from "../src/services/operationDispatch.js";
import { OperationIntentStore } from "../src/services/operationIntent.js";
import { OperationPreflightService } from "../src/services/operationPreflight.js";

function createService(input: {
  probes?: boolean;
  actions?: boolean;
  orderPlatform?: Partial<OrderPlatformClient>;
  miniKv?: Partial<MiniKvClient>;
}) {
  const config = loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: input.probes ? "true" : "false",
    UPSTREAM_ACTIONS_ENABLED: input.actions ? "true" : "false",
  });
  const intents = new OperationIntentStore(config);
  const dispatches = new OperationDispatchLedger(intents);
  const service = new OperationPreflightService(
    config,
    intents,
    dispatches,
    input.orderPlatform as OrderPlatformClient,
    input.miniKv as MiniKvClient,
  );

  return {
    config,
    intents,
    dispatches,
    service,
  };
}

describe("operation preflight service", () => {
  it("keeps blocked mini-kv write intents local when actions and probes are closed", async () => {
    const { intents, service } = createService({});
    const intent = intents.create({
      action: "kv-set",
      operatorId: "dev-admin",
      role: "admin",
      reason: "preflight blocked write",
    });

    const bundle = await service.create({ intentId: intent.id });

    expect(bundle).toMatchObject({
      intent: {
        id: intent.id,
        status: "blocked",
        action: "kv-set",
        target: "mini-kv",
      },
      safety: {
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
      },
      readyForDryRunDispatch: false,
    });
    expect(bundle.hardBlockers).toEqual([
      "UPSTREAM_ACTIONS_ENABLED=false",
      "INTENT_STATUS_BLOCKED",
    ]);
    expect(bundle.warnings).toEqual([
      "WRITE_RISK_REQUIRES_EXPLICIT_REVIEW",
      "UPSTREAM_PROBES_SKIPPED",
    ]);
    expect(bundle.evidence.miniKvCommandCatalog.status).toBe("skipped");
    expect(bundle.evidence.miniKvKeyInventory.status).toBe("skipped");
  });

  it("adds Java replay readiness blockers when upstream evidence says replay is not eligible", async () => {
    const { intents, service } = createService({
      probes: true,
      orderPlatform: {
        failedEventReplayReadiness: async () => ({
          statusCode: 200,
          latencyMs: 7,
          data: {
            failedEventId: 42,
            exists: true,
            eligibleForReplay: false,
            blockedBy: ["REPLAY_APPROVAL_PENDING"],
            nextAllowedActions: ["APPROVE_REPLAY"],
          },
        }),
      },
    });
    const intent = intents.create({
      action: "failed-event-replay-readiness",
      operatorId: "ops-user",
      role: "operator",
      reason: "check replay",
    });
    intents.confirm(intent.id, {
      operatorId: "ops-user",
      confirmText: intent.confirmation.requiredText,
    });

    const bundle = await service.create({ intentId: intent.id, failedEventId: "42" });

    expect(bundle.evidence.javaReplayReadiness).toMatchObject({
      status: "available",
      details: {
        latencyMs: 7,
        readiness: {
          failedEventId: 42,
          eligibleForReplay: false,
          blockedBy: ["REPLAY_APPROVAL_PENDING"],
        },
      },
    });
    expect(bundle.hardBlockers).toEqual(["JAVA_REPLAY_READINESS_BLOCKED"]);
    expect(bundle.readyForDryRunDispatch).toBe(false);
  });

  it("collects mini-kv catalog and key inventory evidence for confirmed dry-run writes", async () => {
    const { intents, dispatches, service } = createService({
      probes: true,
      actions: true,
      miniKv: {
        commandsJson: async () => ({
          command: "COMMANDSJSON",
          response: "",
          latencyMs: 5,
          catalog: {
            commands: [
              { name: "GET", category: "read", mutates_store: false },
              { name: "SET", category: "write", mutates_store: true, touches_wal: true },
              { name: "EXPIRE", category: "write", mutates_store: true, touches_wal: true },
            ],
          },
        }),
        keysJson: async (prefix?: string) => ({
          command: prefix === undefined ? "KEYSJSON" : `KEYSJSON ${prefix}`,
          response: "",
          latencyMs: 3,
          inventory: {
            prefix,
            key_count: 2,
            keys: ["orderops:cart:1", "orderops:lock:1"],
            truncated: false,
            limit: 1000,
          },
        }),
      },
    });
    const intent = intents.create({
      action: "kv-set",
      operatorId: "dev-admin",
      role: "admin",
      reason: "preflight mini-kv write",
    });
    intents.confirm(intent.id, {
      operatorId: "dev-admin",
      confirmText: intent.confirmation.requiredText,
    });
    dispatches.create({ intentId: intent.id, requestedBy: "dev-admin" });

    const bundle = await service.create({ intentId: intent.id, keyPrefix: "orderops:" });

    expect(bundle.hardBlockers).toEqual([]);
    expect(bundle.warnings).toEqual([
      "WRITE_RISK_REQUIRES_EXPLICIT_REVIEW",
      "MINIKV_MUTATING_COMMAND",
    ]);
    expect(bundle.readyForDryRunDispatch).toBe(true);
    expect(bundle.dispatches).toMatchObject({
      total: 1,
      dryRunCompleted: 1,
      rejected: 0,
      upstreamTouched: 0,
    });
    expect(bundle.evidence.miniKvCommandCatalog).toMatchObject({
      status: "available",
      details: {
        actionCommands: ["SET", "EXPIRE"],
        commandCount: 3,
      },
    });
    expect(bundle.evidence.miniKvKeyInventory).toMatchObject({
      status: "available",
      details: {
        inventory: {
          key_count: 2,
          keys: ["orderops:cart:1", "orderops:lock:1"],
        },
      },
    });
  });

  it("requires failedEventId for failed-event readiness evidence", async () => {
    const { intents, service } = createService({ probes: true });
    const intent = intents.create({
      action: "failed-event-replay-readiness",
      operatorId: "ops-user",
      role: "operator",
    });
    intents.confirm(intent.id, {
      operatorId: "ops-user",
      confirmText: intent.confirmation.requiredText,
    });

    const bundle = await service.create({ intentId: intent.id });

    expect(bundle.evidence.javaReplayReadiness.status).toBe("missing_context");
    expect(bundle.hardBlockers).toEqual(["FAILED_EVENT_ID_REQUIRED"]);
    expect(bundle.recommendedNextActions[0]).toContain("FAILED_EVENT_ID_REQUIRED");
  });
});

describe("operation preflight route", () => {
  it("returns a safe local preflight bundle for blocked intents without touching upstreams", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "local-dev",
          role: "admin",
          reason: "route preflight",
        },
      });
      const preflight = await app.inject({
        method: "GET",
        url: `/api/v1/operation-intents/${created.json().id}/preflight?keyPrefix=orderops:`,
      });

      expect(preflight.statusCode).toBe(200);
      expect(preflight.json()).toMatchObject({
        intent: {
          id: created.json().id,
          status: "blocked",
          action: "kv-set",
        },
        safety: {
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
        },
        evidence: {
          miniKvCommandCatalog: {
            status: "skipped",
          },
          miniKvKeyInventory: {
            status: "skipped",
          },
        },
        readyForDryRunDispatch: false,
      });
    } finally {
      await app.close();
    }
  });
});
