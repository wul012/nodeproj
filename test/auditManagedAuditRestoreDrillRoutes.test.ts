import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditRestoreDrillAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditRestoreDrillRoutes.js";

describe("managed audit restore drill audit route group", () => {
  it("keeps restore drill plan and archive verification routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

    try {
      const paths = managedAuditRestoreDrillAuditJsonMarkdownRoutes.map((route) => route.path);
      const planJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-packet-restore-drill-plan",
        headers: completeHeaders(),
      });
      const archiveMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-restore-drill-archive-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-packet-restore-drill-plan",
        "/api/v1/audit/managed-audit-restore-drill-archive-verification",
      ]);
      expect(routeTableSource).toContain("...managedAuditRestoreDrillAuditJsonMarkdownRoutes");
      expect(routeTableSource).not.toContain("loadManagedAuditPacketRestoreDrillPlan");
      expect(routeTableSource).not.toContain("loadManagedAuditRestoreDrillArchiveVerification");
      expect(planJson.statusCode).toBe(200);
      expect(planJson.json()).toMatchObject({
        profileVersion: "managed-audit-packet-restore-drill-plan.v1",
        drillState: "ready-for-manual-dry-run-plan",
        executionAllowed: false,
        restoreExecutionAllowed: false,
        connectsManagedAudit: false,
        automaticUpstreamStart: false,
        checks: {
          drillStepsDryRunOnly: true,
          noAutomaticUpstreamStart: true,
          restoreExecutionStillBlocked: true,
          productionAuditStillBlocked: true,
        },
      });
      expect(archiveMarkdown.statusCode).toBe(200);
      expect(archiveMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(archiveMarkdown.body).toContain("# Managed audit restore drill archive verification");
      expect(archiveMarkdown.body).toContain("managed-audit-packet-restore-drill-plan.v1");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-446",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v446-route-split",
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
    PORT: "4446",
    ...overrides,
  });
}
