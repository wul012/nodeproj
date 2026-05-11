import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import type { MiniKvClient } from "../src/clients/miniKvClient.js";
import type { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { loadConfig } from "../src/config.js";
import { OperationDispatchLedger } from "../src/services/operationDispatch.js";
import { OperationExecutionPreviewService } from "../src/services/operationExecutionPreview.js";
import { OperationIntentStore } from "../src/services/operationIntent.js";
import { OperationPreflightService } from "../src/services/operationPreflight.js";
import { createOperationPreflightReport } from "../src/services/operationPreflightReport.js";

const openServers: net.Server[] = [];

afterEach(async () => {
  await Promise.all(openServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

function createPreviewServices(input: {
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
  const preflight = new OperationPreflightService(
    config,
    intents,
    dispatches,
    input.orderPlatform as OrderPlatformClient,
    input.miniKv as MiniKvClient,
  );
  const preview = new OperationExecutionPreviewService(
    config,
    input.orderPlatform as OrderPlatformClient,
    input.miniKv as MiniKvClient,
  );

  return {
    intents,
    dispatches,
    preflight,
    preview,
  };
}

describe("operation execution preview service", () => {
  it("combines preflight digest and mini-kv EXPLAINJSON side effects", async () => {
    const { intents, dispatches, preflight, preview } = createPreviewServices({
      probes: true,
      actions: true,
      miniKv: {
        commandsJson: async () => ({
          command: "COMMANDSJSON",
          response: "",
          latencyMs: 2,
          catalog: {
            commands: [
              { name: "SET", category: "write", mutates_store: true, touches_wal: true },
              { name: "EXPIRE", category: "write", mutates_store: true, touches_wal: true },
            ],
          },
        }),
        keysJson: async () => ({
          command: "KEYSJSON orderops:",
          response: "",
          latencyMs: 1,
          inventory: {
            prefix: "orderops:",
            key_count: 1,
            keys: ["orderops:preview"],
            truncated: false,
            limit: 1000,
          },
        }),
        explainJson: async (command: string) => ({
          command: `EXPLAINJSON ${command}`,
          response: "",
          latencyMs: 3,
          explanation: {
            command: "SET",
            category: "write",
            mutates_store: true,
            touches_wal: true,
            key: "orderops:preview",
            requires_value: true,
            ttl_sensitive: false,
            allowed_by_parser: true,
            warnings: [],
          },
        }),
      },
    });
    const intent = intents.create({
      action: "kv-set",
      operatorId: "dev-admin",
      role: "admin",
    });
    intents.confirm(intent.id, {
      operatorId: "dev-admin",
      confirmText: intent.confirmation.requiredText,
    });
    dispatches.create({ intentId: intent.id, requestedBy: "dev-admin" });
    const report = createOperationPreflightReport(await preflight.create({ intentId: intent.id, keyPrefix: "orderops:" }));

    const executionPreview = await preview.create(report, {
      key: "orderops:preview",
      value: "preview-value",
    });

    expect(executionPreview).toMatchObject({
      service: "orderops-node",
      intentId: intent.id,
      action: "kv-set",
      target: "mini-kv",
      state: "review-required",
      preflightDigest: report.preflightDigest,
      evidence: {
        miniKvCommandExplain: {
          status: "available",
          details: {
            command: "SET orderops:preview preview-value",
            explanation: {
              mutates_store: true,
              touches_wal: true,
            },
          },
        },
      },
      readyForApprovalRequest: true,
    });
    expect(executionPreview.expectedSideEffects).toEqual([
      "mini-kv.store-would-mutate",
      "mini-kv.wal-would-be-touched",
    ]);
    expect(executionPreview.warnings).toEqual([
      "WRITE_RISK_REQUIRES_EXPLICIT_REVIEW",
      "MINIKV_MUTATING_COMMAND",
      "MINIKV_EXPLAIN_MUTATING_COMMAND",
      "MINIKV_EXPLAIN_TOUCHES_WAL",
    ]);
  });

  it("collects Java v39 replay simulation evidence for simulation intents", async () => {
    const { intents, preflight, preview } = createPreviewServices({
      probes: true,
      orderPlatform: {
        failedEventReplaySimulation: async () => ({
          statusCode: 200,
          latencyMs: 9,
          data: {
            failedEventId: 42,
            exists: true,
            eligibleForReplay: true,
            wouldReplay: true,
            wouldPublishOutbox: true,
            wouldChangeManagementStatus: true,
            expectedSideEffects: ["order-event-replayed", "outbox-message-created"],
            blockedBy: [],
            warnings: ["approval-required-before-real-replay"],
            nextAllowedActions: ["REQUEST_REPLAY_APPROVAL"],
          },
        }),
      },
    });
    const intent = intents.create({
      action: "failed-event-replay-simulation",
      operatorId: "ops-user",
      role: "operator",
    });
    intents.confirm(intent.id, {
      operatorId: "ops-user",
      confirmText: intent.confirmation.requiredText,
    });
    const report = createOperationPreflightReport(await preflight.create({ intentId: intent.id, failedEventId: "42" }));

    const executionPreview = await preview.create(report, { failedEventId: "42" });

    expect(executionPreview).toMatchObject({
      action: "failed-event-replay-simulation",
      target: "order-platform",
      state: "review-required",
      evidence: {
        javaReplaySimulation: {
          status: "available",
          details: {
            simulation: {
              failedEventId: 42,
              wouldReplay: true,
              wouldPublishOutbox: true,
            },
          },
        },
      },
      warnings: ["JAVA_REPLAY_SIMULATION_WARNINGS"],
      readyForApprovalRequest: true,
    });
    expect(executionPreview.expectedSideEffects).toEqual([
      "order-event-replayed",
      "outbox-message-created",
      "java.failed-event.would-replay",
      "java.outbox.would-publish",
      "java.failed-event.status-would-change",
    ]);
  });
});

describe("operation execution preview route", () => {
  it("stays local and blocked when default safety gates are closed", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "local-admin",
          role: "admin",
        },
      });
      const preview = await app.inject({
        method: "GET",
        url: `/api/v1/operation-intents/${created.json().id}/execution-preview?key=orderops:preview&value=preview-value`,
      });

      expect(preview.statusCode).toBe(200);
      expect(preview.json()).toMatchObject({
        service: "orderops-node",
        intentId: created.json().id,
        state: "blocked",
        evidence: {
          miniKvCommandExplain: {
            status: "skipped",
          },
        },
        readyForApprovalRequest: false,
      });
      expect(preview.json().hardBlockers).toEqual([
        "UPSTREAM_ACTIONS_ENABLED=false",
        "INTENT_STATUS_BLOCKED",
      ]);
    } finally {
      await app.close();
    }
  });

  it("proves the route can collect mini-kv EXPLAINJSON through a TCP mock", async () => {
    const seenCommands: string[] = [];
    const server = net.createServer((socket) => {
      socket.setEncoding("utf8");
      socket.on("data", (chunk) => {
        const command = chunk.trim();
        seenCommands.push(command);
        if (command === "COMMANDSJSON") {
          socket.end('{"commands":[{"name":"SET","category":"write","mutates_store":true,"touches_wal":true},{"name":"EXPIRE","category":"write","mutates_store":true,"touches_wal":true}]}\n');
          return;
        }
        if (command.startsWith("KEYSJSON")) {
          socket.end('{"prefix":"orderops:","key_count":1,"keys":["orderops:preview"],"truncated":false,"limit":1000}\n');
          return;
        }
        if (command.startsWith("EXPLAINJSON")) {
          socket.end('{"command":"SET","category":"write","mutates_store":true,"touches_wal":true,"key":"orderops:preview","requires_value":true,"ttl_sensitive":false,"allowed_by_parser":true,"warnings":[]}\n');
          return;
        }
        socket.end("OK\n");
      });
    });
    openServers.push(server);

    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address() as AddressInfo;
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: String(address.port),
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "local-admin",
          role: "admin",
        },
      });
      const intent = created.json();
      await app.inject({
        method: "POST",
        url: `/api/v1/operation-intents/${intent.id}/confirm`,
        payload: {
          operatorId: "local-admin",
          confirmText: intent.confirmation.requiredText,
        },
      });
      await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: intent.id,
          requestedBy: "local-admin",
        },
      });
      const preview = await app.inject({
        method: "GET",
        url: `/api/v1/operation-intents/${intent.id}/execution-preview?key=orderops:preview&value=preview-value&keyPrefix=orderops:`,
      });

      expect(preview.statusCode).toBe(200);
      expect(preview.json()).toMatchObject({
        state: "review-required",
        readyForApprovalRequest: true,
        evidence: {
          miniKvCommandExplain: {
            status: "available",
          },
        },
      });
      expect(preview.json().expectedSideEffects).toContain("mini-kv.store-would-mutate");
      expect(seenCommands).toEqual([
        "COMMANDSJSON",
        "KEYSJSON orderops:",
        "EXPLAINJSON SET orderops:preview preview-value",
      ]);
    } finally {
      await app.close();
    }
  });
});
