import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditAdapterImplementationAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditAdapterImplementationRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("managed audit adapter implementation audit route group", () => {
  it("keeps implementation precheck and disabled shell routes registered through the shared route table", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditAdapterImplementationAuditJsonMarkdownRoutes.map((route) => route.path);
      const precheckJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet",
        headers: completeHeaders(),
      });
      const shellMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-disabled-shell?format=markdown",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet",
        "/api/v1/audit/managed-audit-adapter-disabled-shell",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditAdapterImplementationAuditJsonMarkdownRoutes,
      });
      expect(precheckJson.statusCode).toBe(200);
      expect(precheckJson.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-implementation-precheck-packet.v1",
        precheckState: "ready-for-implementation-precheck-review",
        executionAllowed: false,
        restoreExecutionAllowed: false,
        connectsManagedAudit: false,
        realAdapterWiringAllowed: false,
        automaticUpstreamStart: false,
        checks: {
          javaV79ReceiptAccepted: true,
          miniKvV88ReceiptAccepted: true,
          realAdapterWiringStillBlocked: true,
          productionAuditStillBlocked: true,
        },
      });
      expect(shellMarkdown.statusCode).toBe(200);
      expect(shellMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(shellMarkdown.body).toContain("# Managed audit adapter disabled shell");
      expect(shellMarkdown.body).toContain("disabled-shell-ready");
      expect(shellMarkdown.body).toContain("appendWritten: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-449",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v449-route-split",
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
    PORT: "4449",
    ...overrides,
  });
}
