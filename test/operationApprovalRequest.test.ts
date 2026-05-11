import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { digestOperationExecutionPreview } from "../src/services/operationApprovalRequest.js";

const openServers: net.Server[] = [];

afterEach(async () => {
  await Promise.all(openServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

describe("operation approval request route", () => {
  it("records a rejected local request when default safety gates block preview", async () => {
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
      const approval = await app.inject({
        method: "POST",
        url: "/api/v1/operation-approval-requests",
        payload: {
          intentId: created.json().id,
          requestedBy: "local-admin",
          reviewer: "ops-reviewer",
          key: "orderops:preview",
          value: "preview-value",
        },
      });

      expect(approval.statusCode).toBe(201);
      expect(approval.json()).toMatchObject({
        service: "orderops-node",
        intentId: created.json().id,
        action: "kv-set",
        target: "mini-kv",
        requestedBy: "local-admin",
        reviewer: "ops-reviewer",
        status: "rejected",
        preflightState: "blocked",
        previewState: "blocked",
        readyForApprovalRequest: false,
      });
      expect(approval.json().hardBlockers).toEqual([
        "UPSTREAM_ACTIONS_ENABLED=false",
        "INTENT_STATUS_BLOCKED",
      ]);
      expect(approval.json().previewDigest).toMatchObject({
        algorithm: "sha256",
        value: expect.any(String),
      });
      expect(approval.json().previewDigest.value).toHaveLength(64);

      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/operation-approval-requests?limit=10",
      });
      expect(listed.statusCode).toBe(200);
      expect(listed.json().requests).toHaveLength(1);
      expect(listed.json().requests[0].requestId).toBe(approval.json().requestId);

      const fetched = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}`,
      });
      expect(fetched.statusCode).toBe(200);
      expect(fetched.json().requestId).toBe(approval.json().requestId);
      expect(fetched.json().previewDigest).toEqual(digestOperationExecutionPreview(fetched.json().preview));
    } finally {
      await app.close();
    }
  });

  it("records a pending request when mini-kv preview evidence is complete", async () => {
    const seenCommands: string[] = [];
    const server = net.createServer((socket) => {
      socket.setEncoding("utf8");
      socket.on("data", (chunk) => {
        const command = chunk.trim();
        seenCommands.push(command);
        if (command === "COMMANDSJSON") {
          socket.end('{"commands":[{"name":"SET","category":"write","mutates_store":true,"touches_wal":true},{"name":"GET","category":"read","mutates_store":false,"touches_wal":false}]}\n');
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

      const approval = await app.inject({
        method: "POST",
        url: "/api/v1/operation-approval-requests",
        payload: {
          intentId: intent.id,
          requestedBy: "local-admin",
          reviewer: "ops-reviewer",
          keyPrefix: "orderops:",
          key: "orderops:preview",
          value: "preview-value",
        },
      });

      expect(approval.statusCode).toBe(201);
      expect(approval.json()).toMatchObject({
        service: "orderops-node",
        intentId: intent.id,
        action: "kv-set",
        target: "mini-kv",
        status: "pending",
        preflightState: "review-required",
        previewState: "review-required",
        readyForApprovalRequest: true,
        preview: {
          evidence: {
            miniKvCommandExplain: {
              status: "available",
            },
          },
        },
      });
      expect(approval.json().expectedSideEffects).toEqual([
        "mini-kv.store-would-mutate",
        "mini-kv.wal-would-be-touched",
      ]);
      expect(approval.json().previewDigest.value).toHaveLength(64);
      expect(approval.json().preflightDigest).toEqual(approval.json().preview.preflightDigest);

      const markdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}?format=markdown`,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.body).toContain("# Operation approval request");
      expect(markdown.body).toContain(`- Request id: ${approval.json().requestId}`);
      expect(markdown.body).toContain("- Status: pending");
      expect(markdown.body).toContain("mini-kv.store-would-mutate");
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
