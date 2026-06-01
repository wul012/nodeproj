import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditManualSandboxConnectionReadinessAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditManualSandboxConnectionReadinessRoutes.js";

describe("managed audit manual sandbox connection readiness audit route group", () => {
  it("keeps preflight, rehearsal, precondition, envelope, and readiness routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

    try {
      const paths = managedAuditManualSandboxConnectionReadinessAuditJsonMarkdownRoutes.map((route) => route.path);
      const preflightJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate",
        headers: completeHeaders(),
      });
      const rehearsalMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review?format=markdown",
        headers: completeHeaders(),
      });
      const readinessJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate",
      ]);
      expect(routeTableSource).toContain("...managedAuditManualSandboxConnectionReadinessAuditJsonMarkdownRoutes");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionPreflightGate");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionPreflightVerification");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionRehearsalPacketReview");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionPreconditionIntake");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxConnectionReadinessGate");

      expect(preflightJson.statusCode).toBe(200);
      expect(preflightJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-preflight-gate.v1",
        gateState: "manual-sandbox-connection-preflight-gate-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
      });

      expect(rehearsalMarkdown.statusCode).toBe(200);
      expect(rehearsalMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(rehearsalMarkdown.body).toContain("# Managed audit manual sandbox connection rehearsal packet review");
      expect(rehearsalMarkdown.body).toContain("REHEARSAL_PACKET_REVIEW_ONLY_NO_CONNECTION");

      expect(readinessJson.statusCode).toBe(200);
      expect(readinessJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-readiness-gate.v1",
        gateState: "manual-sandbox-connection-readiness-gate-ready",
        readyForOperatorWindowChecklist: true,
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        readinessGate: {
          actualConnectionAttempted: false,
          credentialValueRead: false,
        },
      });
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-453",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v453-route-split",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4453",
    ...overrides,
  });
}
