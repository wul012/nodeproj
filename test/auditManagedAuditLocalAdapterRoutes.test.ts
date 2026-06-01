import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditLocalAdapterAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditLocalAdapterRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("managed audit local adapter audit route group", () => {
  it("keeps local and external adapter readiness routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditLocalAdapterAuditJsonMarkdownRoutes.map((route) => route.path);
      const dryRunJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run",
        headers: completeHeaders(),
      });
      const verificationMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report?format=markdown",
        headers: completeHeaders(),
      });
      const externalReadinessJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run",
        "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report",
        "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditLocalAdapterAuditJsonMarkdownRoutes,
      });

      expect(dryRunJson.statusCode).toBe(200);
      expect(dryRunJson.json()).toMatchObject({
        profileVersion: "managed-audit-local-adapter-candidate-dry-run.v1",
        candidateState: "local-adapter-dry-run-verified",
        executionAllowed: false,
        restoreExecutionAllowed: false,
        connectsManagedAudit: false,
        automaticUpstreamStart: false,
        verification: {
          dryRunDirectoryRemoved: true,
          appendWritten: true,
          externalManagedAuditAccessed: false,
          productionAuditRecordAllowed: false,
        },
      });

      expect(verificationMarkdown.statusCode).toBe(200);
      expect(verificationMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(verificationMarkdown.body).toContain("# Managed audit local adapter candidate verification report");
      expect(verificationMarkdown.body).toContain("RUN_PARALLEL_EXTERNAL_ADAPTER_GUARDS");

      expect(externalReadinessJson.statusCode).toBe(200);
      expect(externalReadinessJson.json()).toMatchObject({
        profileVersion: "managed-audit-external-adapter-connection-readiness-review.v1",
        reviewState: "ready-for-external-adapter-connection-review",
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        automaticUpstreamStart: false,
        checks: {
          realExternalAdapterStillDisconnected: true,
          credentialStillUnread: true,
          productionWindowStillBlocked: true,
        },
      });
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-450",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v450-route-split",
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
    PORT: "4450",
    ...overrides,
  });
}
