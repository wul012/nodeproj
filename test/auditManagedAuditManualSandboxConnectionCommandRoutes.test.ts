import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditManualSandboxConnectionCommandRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("managed audit manual sandbox connection command audit route group", () => {
  it("keeps operator-window and dry-run command routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes.map((route) => route.path);
      const checklistJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist",
        headers: completeHeaders(),
      });
      const commandMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package?format=markdown",
        headers: completeHeaders(),
      });
      const upstreamEchoJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-checklist",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
        "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes,
      });

      expect(checklistJson.statusCode).toBe(200);
      expect(checklistJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-operator-window-checklist.v1",
        checklistState: "manual-sandbox-connection-operator-window-checklist-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        operatorWindowChecklist: {
          actualConnectionAttempted: false,
          credentialValueRead: false,
        },
      });

      expect(commandMarkdown.statusCode).toBe(200);
      expect(commandMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(commandMarkdown.body).toContain("# Managed audit manual sandbox connection dry-run command package");
      expect(commandMarkdown.body).toContain("manual-sandbox-connection-disabled-dry-run-command-package");

      expect(upstreamEchoJson.statusCode).toBe(200);
      expect(upstreamEchoJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification.v1",
        verificationState: "manual-sandbox-dry-run-command-upstream-echo-verification-ready",
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
    "x-orderops-operator-id": "auditor-454",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v454-route-split",
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
    PORT: "4454",
    ...overrides,
  });
}
