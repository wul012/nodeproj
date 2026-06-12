import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditManualSandboxConnectionPacketRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("managed audit manual sandbox connection packet audit route group", () => {
  it("keeps evidence checklist, operator packet, and packet verification routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes.map((route) => route.path);
      const checklistJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist",
        headers: completeHeaders(),
      });
      const operatorMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet?format=markdown",
        headers: completeHeaders(),
      });
      const verificationJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-packet-verification",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes,
      });

      expect(checklistJson.statusCode).toBe(200);
      expect(checklistJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-evidence-checklist.v1",
        checklistState: "manual-sandbox-connection-evidence-checklist-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
      });

      expect(operatorMarkdown.statusCode).toBe(200);
      expect(operatorMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(operatorMarkdown.body).toContain("# Managed audit manual sandbox connection operator packet");
      expect(operatorMarkdown.body).toContain("OPERATOR_PACKET_ONLY_NO_CONNECTION");

      expect(verificationJson.statusCode).toBe(200);
      expect(verificationJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-packet-verification.v1",
        verificationState: "manual-sandbox-connection-packet-verification-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
      });
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-452",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v452-route-split",
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
    PORT: "4452",
    ...overrides,
  });
}
