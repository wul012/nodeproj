import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  loadProductionReadinessSummaryV8,
} from "../src/services/productionReadinessSummaryV8.js";

describe("production readiness summary v8", () => {
  it("combines local compliance rehearsals while keeping production connections blocked", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v8-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      runtime.auditLog.record({
        requestId: "req-summary-v8",
        method: "GET",
        path: "/api/v1/production/readiness-summary-v8",
        statusCode: 200,
        durationMs: 4,
      });

      const summary = await loadProductionReadinessSummaryV8({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });

      expect(summary).toMatchObject({
        summaryVersion: "production-readiness-summary.v8",
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        stage: {
          name: "production-compliance-rehearsal-integration",
          managedAuditAdapterComplianceVersion: "managed-audit-adapter-compliance.v1",
          jwksVerifierFixtureRehearsalVersion: "jwks-verifier-fixture-rehearsal.v1",
          productionReadinessSummaryV7Version: "production-readiness-summary.v7",
          upstreamActionsEnabled: false,
        },
        rehearsalStatus: {
          managedAuditComplianceHarnessPasses: true,
          managedAuditProductionConnectionStillMissing: true,
          jwksFixtureVerifierPasses: true,
          idpProductionConnectionStillMissing: true,
          productionReadinessV7StillBlocked: true,
        },
        checks: {
          managedAuditComplianceHarnessPasses: true,
          realManagedAuditAdapterConnected: false,
          jwksFixtureVerifierPasses: true,
          realIdpVerifierConnected: false,
          productionReadinessV7EvidenceConnected: true,
          upstreamActionsStillDisabled: true,
          readyForProductionOperations: false,
        },
        summary: {
          categoryCount: 5,
          passedCategoryCount: 4,
          blockedCategoryCount: 1,
          productionBlockerCount: 2,
        },
      });
      expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
        ["managed-audit-compliance-harness", "pass"],
        ["jwks-verifier-fixture", "pass"],
        ["production-connections", "blocked"],
        ["summary-v7-evidence", "pass"],
        ["execution-safety", "pass"],
      ]);
      expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
        "REAL_IDP_VERIFIER_NOT_CONNECTED",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("surfaces incomplete JWKS fixture configuration before production IdP work", async () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    });
    const runtime = createAuditStoreRuntime(config);
    const summary = await loadProductionReadinessSummaryV8({
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
    });

    expect(summary.checks).toMatchObject({
      managedAuditComplianceHarnessPasses: true,
      jwksFixtureVerifierPasses: false,
      productionReadinessV7EvidenceConnected: false,
      upstreamActionsStillDisabled: true,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "JWKS_FIXTURE_VERIFIER_FAILED",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
      "PRODUCTION_READINESS_V7_EVIDENCE_INCOMPLETE",
    ]));
  });

  it("exposes production readiness summary v8 routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v8-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v8",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v8?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryVersion: "production-readiness-summary.v8",
        rehearsalStatus: {
          managedAuditComplianceHarnessPasses: true,
          jwksFixtureVerifierPasses: true,
        },
        checks: {
          realManagedAuditAdapterConnected: false,
          realIdpVerifierConnected: false,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v8");
      expect(markdown.body).toContain("REHEARSALS_PASS_CONNECTIONS_MISSING");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
      expect(markdown.body).toContain("REAL_IDP_VERIFIER_NOT_CONNECTED");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadTestConfig(auditStorePath: string) {
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
  });
}
