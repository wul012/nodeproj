import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const openServers: net.Server[] = [];

afterEach(async () => {
  await Promise.all(openServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

describe("operation approval evidence route", () => {
  it("reports incomplete evidence when a request has no reviewer decision", async () => {
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
      const evidence = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence`,
      });
      const verification = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/verification`,
      });

      expect(evidence.statusCode).toBe(200);
      expect(evidence.json()).toMatchObject({
        service: "orderops-node",
        requestId: approval.json().requestId,
        state: "missing-decision",
        summary: {
          requestStatus: "rejected",
          decision: "missing",
          upstreamTouched: false,
        },
      });
      expect(evidence.json().evidenceDigest.value).toHaveLength(64);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        valid: false,
        checks: {
          digestValid: true,
          decisionPresent: false,
          upstreamUntouched: false,
        },
      });
    } finally {
      await app.close();
    }
  });

  it("builds and verifies a complete approved evidence report", async () => {
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
      const decision = await app.inject({
        method: "POST",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/decision`,
        payload: {
          decision: "approved",
          reviewer: "ops-reviewer",
          reason: "reviewed v64 approval evidence",
        },
      });
      const evidence = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence`,
      });
      const verification = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/verification`,
      });
      const markdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence?format=markdown`,
      });

      expect(evidence.statusCode).toBe(200);
      expect(evidence.json()).toMatchObject({
        service: "orderops-node",
        requestId: approval.json().requestId,
        decisionId: decision.json().decisionId,
        intentId: intent.id,
        state: "approved",
        summary: {
          requestStatus: "approved",
          decision: "approved",
          reviewer: "ops-reviewer",
          upstreamTouched: false,
          readyForApprovalRequest: true,
        },
      });
      expect(evidence.json().summary.previewDigest).toEqual(approval.json().previewDigest);
      expect(evidence.json().summary.decisionDigest).toEqual(decision.json().decisionDigest);
      expect(evidence.json().evidenceDigest.value).toHaveLength(64);

      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        valid: true,
        state: "approved",
        checks: {
          digestValid: true,
          requestMatches: true,
          decisionPresent: true,
          decisionMatchesRequest: true,
          requestPreviewDigestValid: true,
          decisionDigestValid: true,
          summaryMatches: true,
          nextActionsMatch: true,
          upstreamUntouched: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.body).toContain("# Operation approval evidence report");
      expect(markdown.body).toContain("- State: approved");
      expect(markdown.body).toContain("- Upstream touched: false");
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
