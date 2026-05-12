import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AuditLog, FileBackedAuditStore } from "../src/services/auditLog.js";

describe("access guard audit context", () => {
  it("records dry-run access guard evidence on audit events without rejecting requests", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const policy = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-policy",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const events = await app.inject({
        method: "GET",
        url: "/api/v1/audit/events?limit=5",
      });

      expect(policy.statusCode).toBe(200);
      expect(policy.headers["x-orderops-access-guard-mode"]).toBe("dry-run");
      expect(events.statusCode).toBe(200);
      expect(events.json().events[0]).toMatchObject({
        method: "GET",
        path: "/api/v1/security/access-policy",
        accessGuard: {
          guardVersion: "access-guard-dry-run.v1",
          mode: "dry-run",
          rejectsRequests: false,
          policyMatched: true,
          policyId: "readiness-and-status",
          routeGroup: "readiness",
          requiredRole: "viewer",
          matchedRoles: ["viewer"],
          wouldDeny: false,
          reason: "allowed_by_role",
        },
      });
    } finally {
      await app.close();
    }
  });

  it("keeps access guard audit context when events are persisted by the file store", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-access-guard-audit-"));
    const filePath = path.join(directory, "audit.jsonl");

    try {
      const log = new AuditLog({ capacity: 5, store: new FileBackedAuditStore(filePath, 5) });
      log.record({
        requestId: "req-guard",
        method: "POST",
        path: "/api/v1/operation-intents",
        statusCode: 200,
        durationMs: 7,
        accessGuard: {
          guardVersion: "access-guard-dry-run.v1",
          mode: "dry-run",
          rejectsRequests: false,
          policyMatched: true,
          policyId: "operation-intent-mutations",
          routeGroup: "intent",
          requiredRole: "operator",
          matchedRoles: ["auditor"],
          wouldDeny: true,
          reason: "missing_required_role",
        },
      });
      const restored = new AuditLog({ capacity: 5, store: new FileBackedAuditStore(filePath, 5) });

      expect(restored.list()[0]).toMatchObject({
        requestId: "req-guard",
        accessGuard: {
          routeGroup: "intent",
          requiredRole: "operator",
          matchedRoles: ["auditor"],
          wouldDeny: true,
          reason: "missing_required_role",
        },
      });
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
