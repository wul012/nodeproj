import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditManualSandboxConnectionFakeTransportAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditManualSandboxConnectionFakeTransportRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("managed audit manual sandbox connection fake-transport audit route group", () => {
  it("keeps fake-transport packet routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditManualSandboxConnectionFakeTransportAuditJsonMarkdownRoutes.map((route) => route.path);
      const packetJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
        headers: completeHeaders(),
      });
      const archiveMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification?format=markdown",
        headers: completeHeaders(),
      });
      const upstreamEchoJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditManualSandboxConnectionFakeTransportAuditJsonMarkdownRoutes,
      });

      expect(packetJson.statusCode).toBe(200);
      expect(packetJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet.v1",
        packetState: "fake-transport-adapter-dry-run-verification-packet-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
      });

      expect(archiveMarkdown.statusCode).toBe(200);
      expect(archiveMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(archiveMarkdown.body).toContain("# Managed audit manual sandbox connection fake transport packet archive verification");
      expect(archiveMarkdown.body).toContain("fake-transport-packet-archive-verification-ready");

      expect(upstreamEchoJson.statusCode).toBe(200);
      expect(upstreamEchoJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification.v1",
        verificationState: "fake-transport-packet-upstream-echo-verification-ready",
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
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-457",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v457-route-split",
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
    PORT: "4457",
    ...overrides,
  });
}
