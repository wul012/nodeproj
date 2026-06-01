import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditIdentityApprovalAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditIdentityApprovalRoutes.js";
import { resolveHistoricalEvidencePath } from "../src/services/historicalEvidenceResolver.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit identity approval audit route group", () => {
  it("keeps binding and provenance routes registered through the shared route table", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditIdentityApprovalAuditJsonMarkdownRoutes.map((route) => route.path);
      const bindingJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-binding-contract",
        headers: completeHeaders(),
      });
      const packetJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet",
        headers: completeHeaders(),
      });
      const reportMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report?format=markdown",
        headers: completeHeaders(),
      });
      const javaHistoricalPath = normalizePath(resolveHistoricalEvidencePath("D:/javaproj/advanced-order-platform/c/75/"));
      const miniKvHistoricalPath = normalizePath(resolveHistoricalEvidencePath("D:/C/mini-kv/c/84/"));

      expect(paths).toEqual([
        "/api/v1/audit/managed-identity-approval-binding-contract",
        "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet",
        "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditIdentityApprovalAuditJsonMarkdownRoutes,
        sourceAnchor: "...managedAuditIdentityApprovalAuditJsonMarkdownRoutes",
      });
      expect(javaHistoricalPath).toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/75");
      expect(miniKvHistoricalPath).toContain("fixtures/historical/sibling-workspaces/mini-kv/c/84");
      expect(bindingJson.statusCode).toBe(200);
      expect(bindingJson.json()).toMatchObject({
        profileVersion: "managed-audit-identity-approval-binding-contract.v1",
        contractState: "ready-for-identity-approval-dry-run-packet",
        executionAllowed: false,
        contract: {
          schemaOnly: true,
          realApprovalDecisionCreated: false,
          realApprovalLedgerWritten: false,
          externalAuditSystemAccessed: false,
          javaWriteAttempted: false,
          miniKvWriteAttempted: false,
        },
      });
      expect(packetJson.statusCode).toBe(200);
      expect(packetJson.json()).toMatchObject({
        profileVersion: "managed-audit-identity-approval-provenance-dry-run-packet.v1",
        packetState: "dry-run-packet-verified",
        executionAllowed: false,
        upstreamEvidence: {
          javaV75: {
            javaApprovalDecisionCreated: false,
            javaApprovalLedgerWritten: false,
          },
          miniKvV84: {
            managedAuditWriteExecuted: false,
            orderAuthoritative: false,
          },
        },
        verification: {
          dryRunDirectoryRemoved: true,
          productionAuditRecordAllowed: false,
        },
      });
      expect(reportMarkdown.statusCode).toBe(200);
      expect(reportMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(reportMarkdown.body).toContain("# Managed audit identity approval provenance packet verification report");
      expect(reportMarkdown.body).toContain("RUN_RECOMMENDED_PARALLEL_UPSTREAM_MARKERS");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-445",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v445-route-split",
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
    PORT: "4445",
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
