import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { digestOperationApprovalDecision } from "../src/services/operationApprovalDecision.js";

const openServers: net.Server[] = [];

afterEach(async () => {
  await Promise.all(openServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

describe("operation approval decision route", () => {
  it("rejects reviewer decisions for blocked approval requests", async () => {
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
      const decision = await app.inject({
        method: "POST",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/decision`,
        payload: {
          decision: "approved",
          reviewer: "ops-reviewer",
          reason: "should not approve blocked request",
        },
      });

      expect(approval.json().status).toBe("rejected");
      expect(decision.statusCode).toBe(409);
      expect(decision.json()).toMatchObject({
        error: "APPROVAL_REQUEST_NOT_DECIDABLE",
        details: {
          status: "rejected",
        },
      });
    } finally {
      await app.close();
    }
  });

  it("records an approved decision, updates the request status, and exposes Markdown evidence", async () => {
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
          reason: "reviewed v63 approval evidence",
        },
      });

      expect(decision.statusCode).toBe(201);
      expect(decision.json()).toMatchObject({
        service: "orderops-node",
        requestId: approval.json().requestId,
        intentId: intent.id,
        action: "kv-set",
        target: "mini-kv",
        decision: "approved",
        reviewer: "ops-reviewer",
        reason: "reviewed v63 approval evidence",
        requestStatusBeforeDecision: "pending",
        requestStatusAfterDecision: "approved",
        upstreamTouched: false,
      });
      expect(decision.json().decisionDigest.value).toHaveLength(64);
      expect(decision.json().previewDigest).toEqual(approval.json().previewDigest);
      expect(decision.json().expectedSideEffects).toEqual([
        "mini-kv.store-would-mutate",
        "mini-kv.wal-would-be-touched",
      ]);

      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/operation-approval-decisions?limit=10",
      });
      expect(listed.statusCode).toBe(200);
      expect(listed.json().decisions).toHaveLength(1);
      expect(listed.json().decisions[0].decisionId).toBe(decision.json().decisionId);

      const fetched = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-decisions/${decision.json().decisionId}`,
      });
      const fetchedDecision = fetched.json();
      const { decisionDigest, ...withoutDigest } = fetchedDecision;
      expect(fetched.statusCode).toBe(200);
      expect(decisionDigest).toEqual(digestOperationApprovalDecision(withoutDigest));

      const approvalAfterDecision = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}`,
      });
      expect(approvalAfterDecision.json()).toMatchObject({
        status: "approved",
        reviewer: "ops-reviewer",
        decisionReason: "reviewed v63 approval evidence",
      });

      const markdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-decisions/${decision.json().decisionId}?format=markdown`,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.body).toContain("# Operation approval decision");
      expect(markdown.body).toContain("- Decision: approved");
      expect(markdown.body).toContain("- Upstream touched: false");

      const duplicate = await app.inject({
        method: "POST",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/decision`,
        payload: {
          decision: "rejected",
          reviewer: "ops-reviewer",
          reason: "duplicate decision",
        },
      });
      expect(duplicate.statusCode).toBe(409);
      expect(duplicate.json().error).toBe("APPROVAL_DECISION_ALREADY_RECORDED");
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
