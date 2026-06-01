import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditPersistenceAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditPersistenceRoutes.js";
import { resolveHistoricalEvidencePath } from "../src/services/historicalEvidenceResolver.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit persistence audit route group", () => {
  it("keeps persistence candidate and dry-run routes registered through the shared route table", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    const app = await buildApp(loadTestConfig());
    try {
      const paths = managedAuditPersistenceAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-persistence-boundary-candidate",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-persistence-dry-run-verification?format=markdown",
        headers: completeHeaders(),
      });
      const javaHistoricalPath = normalizePath(resolveHistoricalEvidencePath("D:/javaproj/advanced-order-platform/c/74/"));
      const miniKvHistoricalPath = normalizePath(resolveHistoricalEvidencePath(
        "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json",
      ));

      expect(paths).toEqual([
        "/api/v1/audit/managed-persistence-boundary-candidate",
        "/api/v1/audit/managed-persistence-dry-run-verification",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditPersistenceAuditJsonMarkdownRoutes,
        sourceAnchor: "...managedAuditPersistenceAuditJsonMarkdownRoutes",
      });
      expect(javaHistoricalPath).toContain("fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/74");
      expect(miniKvHistoricalPath).toContain("fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/runtime-smoke-evidence.json");
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-persistence-boundary-candidate.v1",
        candidateState: "ready-for-managed-audit-dry-run",
        executionAllowed: false,
        candidate: {
          realManagedAdapterConnected: false,
          externalAuditSystemAccessed: false,
          productionAuditRecordAllowed: false,
          miniKvProvenanceDigest: "fnv1a64:c1c0896fc6b77fe2",
        },
        checks: {
          javaV74HandoffAccepted: true,
          miniKvV83ProvenanceAccepted: true,
          executionStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit persistence dry-run verification");
      expect(markdown.body).toContain("append-query-digest-cleanup");
      expect(markdown.body).toContain("START_NODE_V210_IDENTITY_APPROVAL_BINDING");
    } finally {
      await app.close();
      restoreEnv(previous);
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-444",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v444-route-split",
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
    PORT: "4444",
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
