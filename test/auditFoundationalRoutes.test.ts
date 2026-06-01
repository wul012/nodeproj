import { readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { foundationalAuditJsonMarkdownRoutes } from "../src/routes/auditFoundationalRoutes.js";

describe("foundational audit JSON/Markdown route group", () => {
  it("keeps foundational audit routes registered through the shared route table", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-foundational-audit-routes-"));
    const auditStorePath = path.join(directory, "audit.jsonl");
    const app = await buildApp(loadTestConfig(auditStorePath));
    const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

    try {
      const paths = foundationalAuditJsonMarkdownRoutes.map((route) => route.path);
      const storeProfileJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-profile",
        headers: completeHeaders(),
      });
      const storeConfigMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-config-profile?format=markdown",
        headers: completeHeaders(),
      });
      const fileRestartJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/file-restart-evidence",
        headers: completeHeaders(),
      });
      const retentionJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/retention-integrity-evidence",
        headers: completeHeaders(),
      });
      const managedContractMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-store-contract?format=markdown",
        headers: completeHeaders(),
      });
      const managedReadinessJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-readiness-summary",
        headers: completeHeaders(),
      });

      expect(paths).toEqual([
        "/api/v1/audit/store-profile",
        "/api/v1/audit/store-config-profile",
        "/api/v1/audit/file-restart-evidence",
        "/api/v1/audit/retention-integrity-evidence",
        "/api/v1/audit/managed-store-contract",
        "/api/v1/audit/managed-readiness-summary",
      ]);
      expect(routeTableSource).toContain("...foundationalAuditJsonMarkdownRoutes");
      expect(routeTableSource).not.toContain("auditJsonMarkdownRoute(");
      expect(routeTableSource).not.toContain("createAuditStoreRuntimeProfile");
      expect(routeTableSource).not.toContain("createAuditStoreEnvConfigProfile");
      expect(routeTableSource).not.toContain("createFileAuditRestartEvidenceReport");
      expect(routeTableSource).not.toContain("createAuditRetentionIntegrityEvidence");
      expect(routeTableSource).not.toContain("createManagedAuditStoreContractProfile");
      expect(routeTableSource).not.toContain("createManagedAuditReadinessSummary");

      expect(storeProfileJson.statusCode).toBe(200);
      expect(storeProfileJson.json()).toMatchObject({
        profileVersion: "audit-store-runtime-profile.v1",
        readyForProductionAudit: false,
        readOnly: true,
        executionAllowed: false,
      });

      expect(storeConfigMarkdown.statusCode).toBe(200);
      expect(storeConfigMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(storeConfigMarkdown.body).toContain("# Audit store env config profile");
      expect(storeConfigMarkdown.body).toContain("auditStoreEnvConfigProfileJson");

      expect(fileRestartJson.statusCode).toBe(200);
      expect(fileRestartJson.json()).toMatchObject({
        evidenceVersion: "file-audit-restart-evidence.v1",
        readyForProductionAudit: false,
        executionAllowed: false,
        runtime: {
          runtimeStoreKind: "file",
        },
      });

      expect(retentionJson.statusCode).toBe(200);
      expect(retentionJson.json()).toMatchObject({
        evidenceVersion: "audit-retention-integrity-evidence.v1",
        readyForProductionAudit: false,
        executionAllowed: false,
        checks: {
          retentionDaysConfigured: true,
          maxFileBytesConfigured: true,
          rotationPolicyConfigured: true,
          backupPolicyConfigured: true,
        },
      });

      expect(managedContractMarkdown.statusCode).toBe(200);
      expect(managedContractMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(managedContractMarkdown.body).toContain("# Managed audit store contract");
      expect(managedContractMarkdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");

      expect(managedReadinessJson.statusCode).toBe(200);
      expect(managedReadinessJson.json()).toMatchObject({
        summaryVersion: "managed-audit-readiness-summary.v1",
        readyForProductionAudit: false,
        executionAllowed: false,
        checks: {
          fileAuditRuntimeSelected: true,
          managedStoreUrlConfigured: true,
          realManagedAdapterConnected: false,
        },
      });
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-458",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v458-route-split",
  };
}

function loadTestConfig(auditStorePath: string, overrides: Record<string, string> = {}) {
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
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    PORT: "4458",
    ...overrides,
  });
}
