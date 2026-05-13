import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  loadProductionReadinessSummaryV7,
} from "../src/services/productionReadinessSummaryV7.js";

describe("production readiness summary v7", () => {
  it("distinguishes adapter and IdP boundary existence from production connections", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v7-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      runtime.auditLog.record({
        requestId: "req-summary-v7",
        method: "GET",
        path: "/api/v1/production/readiness-summary-v7",
        statusCode: 200,
        durationMs: 3,
      });

      const summary = loadProductionReadinessSummaryV7({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });

      expect(summary).toMatchObject({
        summaryVersion: "production-readiness-summary.v7",
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        stage: {
          name: "production-adapter-boundary-integration",
          managedAuditAdapterBoundaryVersion: "managed-audit-adapter-boundary.v1",
          idpVerifierBoundaryVersion: "idp-verifier-boundary.v1",
          productionReadinessSummaryV6Version: "production-readiness-summary.v6",
          upstreamActionsEnabled: false,
        },
        boundaryStatus: {
          managedAuditAdapterBoundaryExists: true,
          managedAuditAdapterConnected: false,
          idpVerifierBoundaryExists: true,
          idpVerifierConnected: false,
          productionReadinessV6StillBlocked: true,
        },
        checks: {
          managedAuditAdapterBoundaryReady: true,
          realManagedAuditAdapterConnected: false,
          idpVerifierBoundaryReady: true,
          realIdpVerifierConnected: false,
          productionReadinessV6EvidenceConnected: true,
          upstreamActionsStillDisabled: true,
          readyForProductionOperations: false,
        },
        summary: {
          categoryCount: 4,
          passedCategoryCount: 2,
          blockedCategoryCount: 2,
          productionBlockerCount: 2,
        },
      });
      expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
        ["managed-audit-adapter", "blocked"],
        ["idp-verifier", "blocked"],
        ["summary-v6-evidence", "pass"],
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

  it("surfaces incomplete boundary configuration before production connection work", () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    });
    const runtime = createAuditStoreRuntime(config);
    const summary = loadProductionReadinessSummaryV7({
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
    });

    expect(summary.checks).toMatchObject({
      managedAuditAdapterBoundaryReady: true,
      idpVerifierBoundaryReady: false,
      productionReadinessV6EvidenceConnected: false,
      upstreamActionsStillDisabled: true,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "IDP_VERIFIER_BOUNDARY_INCOMPLETE",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
      "PRODUCTION_READINESS_V6_EVIDENCE_INCOMPLETE",
    ]));
  });

  it("exposes production readiness summary v7 routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v7-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v7",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v7?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryVersion: "production-readiness-summary.v7",
        boundaryStatus: {
          managedAuditAdapterBoundaryExists: true,
          managedAuditAdapterConnected: false,
          idpVerifierBoundaryExists: true,
          idpVerifierConnected: false,
        },
        checks: {
          managedAuditAdapterBoundaryReady: true,
          idpVerifierBoundaryReady: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v7");
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
