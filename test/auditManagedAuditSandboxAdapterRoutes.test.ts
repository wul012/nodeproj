import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditSandboxAdapterAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditSandboxAdapterRoutes.js";

describe("managed audit sandbox adapter audit route group", () => {
  it("keeps sandbox dry-run and manual runbook routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

    try {
      const paths = managedAuditSandboxAdapterAuditJsonMarkdownRoutes.map((route) => route.path);
      const planJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan",
        headers: completeHeaders(),
      });
      const packageMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package?format=markdown",
        headers: completeHeaders(),
      });
      const runbookJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan",
        "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package",
        "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook",
      ]);
      expect(routeTableSource).toContain("...managedAuditSandboxAdapterAuditJsonMarkdownRoutes");
      expect(routeTableSource).not.toContain("loadManagedAuditSandboxAdapterDryRunPlan");
      expect(routeTableSource).not.toContain("loadManagedAuditSandboxAdapterDryRunPackage");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxAdapterConnectionRunbook");

      expect(planJson.statusCode).toBe(200);
      expect(planJson.json()).toMatchObject({
        profileVersion: "managed-audit-sandbox-adapter-dry-run-plan.v1",
        planState: "sandbox-adapter-dry-run-plan-ready",
        readyForManagedAuditSandboxAdapterDryRunPackage: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });

      expect(packageMarkdown.statusCode).toBe(200);
      expect(packageMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(packageMarkdown.body).toContain("# Managed audit sandbox adapter dry-run package");
      expect(packageMarkdown.body).toContain("PACKAGE_ONLY_NO_CONNECTION");

      expect(runbookJson.statusCode).toBe(200);
      expect(runbookJson.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-adapter-connection-runbook.v1",
        runbookState: "manual-sandbox-connection-runbook-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        manualRunbook: {
          connectionExecutionAllowed: false,
          schemaMigrationExecutionAllowed: false,
          externalConnectionOpened: false,
          managedAuditWriteAllowed: false,
        },
      });
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-451",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v451-route-split",
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
    PORT: "4451",
    ...overrides,
  });
}
