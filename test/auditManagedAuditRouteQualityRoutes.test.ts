import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditRouteQualityAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditRouteQualityRoutes.js";

describe("managed audit route quality audit route group", () => {
  it("keeps helper and registration-table quality routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

    try {
      const paths = managedAuditRouteQualityAuditJsonMarkdownRoutes.map((route) => route.path);
      const helperJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-route-helper-quality-pass",
        headers: completeHeaders(),
      });
      const registrationMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-route-registration-table-quality-pass?format=markdown",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-route-helper-quality-pass",
        "/api/v1/audit/managed-audit-route-registration-table-quality-pass",
      ]);
      expect(routeTableSource).toContain("...managedAuditRouteQualityAuditJsonMarkdownRoutes");
      expect(routeTableSource).not.toContain("loadManagedAuditRouteHelperQualityPass");
      expect(routeTableSource).not.toContain("loadManagedAuditRouteRegistrationTableQualityPass");
      expect(helperJson.statusCode).toBe(200);
      expect(helperJson.json()).toMatchObject({
        profileVersion: "managed-audit-route-helper-quality-pass.v1",
        qualityPassState: "verified-quality-pass",
        executionAllowed: false,
        connectsManagedAudit: false,
        automaticUpstreamStart: false,
        checks: {
          auditRouteRegistrarExtracted: true,
          managedAuditRoutesUseRegistrar: true,
          readinessGateHelpersExtracted: true,
          productionAuditStillBlocked: true,
        },
      });
      expect(registrationMarkdown.statusCode).toBe(200);
      expect(registrationMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(registrationMarkdown.body).toContain("# Managed audit route registration table quality pass");
      expect(registrationMarkdown.body).toContain("QUALITY_PASS_ONLY");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-448",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v448-route-split",
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
    PORT: "4448",
    ...overrides,
  });
}
