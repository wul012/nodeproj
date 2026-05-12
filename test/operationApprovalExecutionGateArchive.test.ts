import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const openTcpServers: net.Server[] = [];

afterEach(async () => {
  await Promise.all(openTcpServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

describe("operation approval execution gate archive routes", () => {
  it("archives an approved mini-kv execution gate preview without executing upstream writes", async () => {
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
          socket.end('{"schema_version":1,"command_digest":"fnv1a64:1234567890abcdef","command":"SET","category":"write","mutates_store":true,"touches_wal":true,"key":"orderops:preview","requires_value":true,"ttl_sensitive":false,"allowed_by_parser":true,"warnings":[],"side_effects":["store_write","wal_append_when_enabled"],"side_effect_count":2}\n');
          return;
        }
        socket.end("OK\n");
      });
    });
    openTcpServers.push(server);

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
          reason: "reviewed execution gate preview",
        },
      });
      const gatePreview = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-preview`,
      });
      const archive = await app.inject({
        method: "POST",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-archive`,
        payload: {
          reviewer: "ops-reviewer",
          note: "archive v69 execution gate preview",
        },
      });
      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/operation-approval-execution-gate-archives",
      });
      const markdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}?format=markdown`,
      });

      expect(gatePreview.statusCode).toBe(200);
      expect(gatePreview.json()).toMatchObject({
        state: "review-required",
        executionAllowed: false,
        summary: {
          requiredUpstreamEvidenceAvailable: true,
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvSideEffectCount: 2,
        },
      });
      expect(archive.statusCode).toBe(201);
      expect(archive.json()).toMatchObject({
        service: "orderops-node",
        sequence: 1,
        reviewer: "ops-reviewer",
        reviewerNote: "archive v69 execution gate preview",
        requestId: approval.json().requestId,
        decisionId: decision.json().decisionId,
        intentId: intent.id,
        state: "review-required",
        previewOnly: true,
        executionAllowed: false,
        gateDigest: gatePreview.json().gateDigest,
        summary: {
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvSideEffectCount: 2,
        },
      });
      expect(archive.json().archiveId).toHaveLength(36);
      expect(archive.json().archiveDigest.value).toHaveLength(64);
      expect(listed.statusCode).toBe(200);
      expect(listed.json().archives).toHaveLength(1);
      expect(markdown.statusCode).toBe(200);
      expect(markdown.body).toContain("# Operation approval execution gate archive record");
      expect(markdown.body).toContain("- Execution allowed: false");
      expect(markdown.body).toContain("- Reviewer note: archive v69 execution gate preview");
      expect(seenCommands.every((command) => !/^(SET|DEL|EXPIRE)\s/.test(command))).toBe(true);
    } finally {
      await app.close();
    }
  });
});
