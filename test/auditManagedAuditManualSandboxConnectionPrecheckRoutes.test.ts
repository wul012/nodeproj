import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditManualSandboxConnectionPrecheckRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("managed audit manual sandbox connection precheck audit route group", () => {
  it("keeps precheck, code health, and rehearsal guard routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes.map((route) => route.path);
      const precheckJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet",
        headers: completeHeaders(),
      });
      const codeHealthMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-code-health-pass?format=markdown",
        headers: completeHeaders(),
      });
      const rehearsalGuardJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-packet",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
        "/api/v1/audit/managed-audit-sandbox-code-health-pass",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes,
      });

      expect(precheckJson.statusCode).toBe(200);
      expect(precheckJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-precheck-packet.v1",
        precheckState: "manual-sandbox-connection-precheck-packet-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        precheckPacket: {
          ownerApprovalArtifact: {
            valueIncluded: false,
          },
          credentialHandleReview: {
            credentialValueRead: false,
          },
        },
      });

      expect(codeHealthMarkdown.statusCode).toBe(200);
      expect(codeHealthMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(codeHealthMarkdown.body).toContain("# Managed audit sandbox code health pass");
      expect(codeHealthMarkdown.body).toContain("split-status-routes-by-domain");

      expect(rehearsalGuardJson.statusCode).toBe(200);
      expect(rehearsalGuardJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-guard.v1",
        guardState: "manual-sandbox-connection-rehearsal-guard-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        rehearsalGuard: {
          credentialValueMayBeRead: false,
          managedAuditConnectionMayOpen: false,
        },
      });
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-455",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v455-route-split",
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
    PORT: "4455",
    ...overrides,
  });
}
