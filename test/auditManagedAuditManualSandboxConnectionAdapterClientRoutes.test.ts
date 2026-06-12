import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditManualSandboxConnectionAdapterClientAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditManualSandboxConnectionAdapterClientRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("managed audit manual sandbox connection adapter client audit route group", () => {
  it("keeps decision, disabled-client, shell-contract, and upstream echo routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditManualSandboxConnectionAdapterClientAuditJsonMarkdownRoutes.map((route) => route.path);
      const decisionJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-decision-record",
        headers: completeHeaders(),
      });
      const shellMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract?format=markdown",
        headers: completeHeaders(),
      });
      const upstreamEchoJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-manual-sandbox-connection-decision-record",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditManualSandboxConnectionAdapterClientAuditJsonMarkdownRoutes,
      });

      expect(decisionJson.statusCode).toBe(200);
      expect(decisionJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-decision-record.v1",
        decisionState: "manual-sandbox-connection-decision-record-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        decisionRecord: {
          credentialValueMayBeRead: false,
          managedAuditConnectionMayOpen: false,
        },
      });

      expect(shellMarkdown.statusCode).toBe(200);
      expect(shellMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(shellMarkdown.body).toContain("# Managed audit manual sandbox connection test-only adapter shell contract");
      expect(shellMarkdown.body).toContain("TEST_ONLY_CREDENTIAL_VALUE_BLOCKED");

      expect(upstreamEchoJson.statusCode).toBe(200);
      expect(upstreamEchoJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1",
        verificationState: "disabled-adapter-client-upstream-echo-verification-ready",
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
    "x-orderops-operator-id": "auditor-456",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v456-route-split",
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
    PORT: "4456",
    ...overrides,
  });
}
