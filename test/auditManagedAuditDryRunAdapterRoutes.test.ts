import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditDryRunAdapterAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditDryRunAdapterRoutes.js";
import { resolveHistoricalEvidencePath } from "../src/services/historicalEvidenceResolver.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit dry-run adapter audit route group", () => {
  it("keeps dry-run adapter and production-hardening routes registered through the shared route table", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditDryRunAdapterAuditJsonMarkdownRoutes.map((route) => route.path);
      const candidateJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-dry-run-adapter-candidate",
        headers: completeHeaders(),
      });
      const archiveMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification?format=markdown",
        headers: completeHeaders(),
      });
      const hardeningJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate",
        headers: completeHeaders(),
      });
      const javaHistoricalPath = normalizePath(resolveHistoricalEvidencePath("D:/javaproj/advanced-order-platform/c/77/"));
      const miniKvHistoricalPath = normalizePath(resolveHistoricalEvidencePath("D:/C/mini-kv/c/86/"));

      expect(paths).toEqual([
        "/api/v1/audit/managed-audit-dry-run-adapter-candidate",
        "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification",
        "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditDryRunAdapterAuditJsonMarkdownRoutes,
        sourceAnchor: "...managedAuditDryRunAdapterAuditJsonMarkdownRoutes",
      });
      expect(javaHistoricalPath).toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/77");
      expect(miniKvHistoricalPath).toContain("fixtures/historical/sibling-workspaces/mini-kv/c/86");
      expect(candidateJson.statusCode).toBe(200);
      expect(candidateJson.json()).toMatchObject({
        profileVersion: "managed-audit-dry-run-adapter-candidate.v1",
        candidateState: "local-dry-run-adapter-verified",
        executionAllowed: false,
        restoreExecutionAllowed: false,
        connectsManagedAudit: false,
        automaticUpstreamStart: false,
        verification: {
          dryRunDirectoryRemoved: true,
          realApprovalDecisionCreated: false,
          realApprovalLedgerWritten: false,
          restoreExecuted: false,
          productionAuditRecordAllowed: false,
        },
      });
      expect(archiveMarkdown.statusCode).toBe(200);
      expect(archiveMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(archiveMarkdown.body).toContain("# Managed audit dry-run adapter archive verification");
      expect(archiveMarkdown.body).toContain("RUN_PARALLEL_PRODUCTION_PREREQUISITE_RECEIPTS");
      expect(hardeningJson.statusCode).toBe(200);
      expect(hardeningJson.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-production-hardening-readiness-gate.v1",
        gateState: "ready-for-production-hardening-review",
        executionAllowed: false,
        restoreExecutionAllowed: false,
        connectsManagedAudit: false,
        localDryRunWritePerformed: false,
        automaticUpstreamStart: false,
        checks: {
          javaV78ReceiptAccepted: true,
          miniKvV87ReceiptAccepted: true,
          realManagedAuditAdapterStillDisconnected: true,
          javaMiniKvWritesStillBlocked: true,
          productionWindowStillBlocked: true,
        },
      });
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-447",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v447-route-split",
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
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4447",
    ...overrides,
  });
}

function restoreEnv(previous: string | undefined): void {
  if (previous === undefined) {
    delete process.env[FORCE_FALLBACK_ENV];
    return;
  }

  process.env[FORCE_FALLBACK_ENV] = previous;
}

function normalizePath(value: string): string {
  return value.split(path.sep).join("/");
}
