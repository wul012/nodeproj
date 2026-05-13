import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  loadProductionReadinessSummaryV6,
} from "../src/services/productionReadinessSummaryV6.js";

describe("production readiness summary v6", () => {
  it("combines verified identity, managed audit readiness, and deployment gate evidence", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v6-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      runtime.auditLog.record({
        requestId: "req-summary-v6",
        method: "GET",
        path: "/api/v1/production/readiness-summary-v6",
        statusCode: 200,
        durationMs: 3,
      });

      const summary = loadProductionReadinessSummaryV6({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });

      expect(summary).toMatchObject({
        summaryVersion: "production-readiness-summary.v6",
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        stage: {
          name: "production-hardening-integration",
          verifiedIdentityAuditBindingVersion: "verified-identity-audit-binding.v1",
          managedAuditReadinessSummaryVersion: "managed-audit-readiness-summary.v1",
          deploymentEnvironmentReadinessVersion: "deployment-environment-readiness.v1",
          upstreamActionsEnabled: false,
        },
        checks: {
          verifiedIdentityAuditBindingReady: true,
          realIdentityProviderConnected: false,
          managedAuditLocalEvidenceReady: true,
          realManagedAuditAdapterConnected: false,
          deploymentEnvironmentGateConfigured: true,
          upstreamActionsStillDisabled: true,
          productionBlockersRemain: true,
        },
        summary: {
          categoryCount: 4,
          passedCategoryCount: 2,
          blockedCategoryCount: 2,
          productionBlockerCount: 2,
        },
      });
      expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
        ["identity", "blocked"],
        ["audit", "blocked"],
        ["deployment", "pass"],
        ["execution-safety", "pass"],
      ]);
      expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "REAL_IDP_NOT_CONNECTED",
        "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("surfaces rehearsal configuration gaps when production-like inputs are absent", () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    });
    const runtime = createAuditStoreRuntime(config);
    const summary = loadProductionReadinessSummaryV6({
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
    });

    expect(summary.checks).toMatchObject({
      verifiedIdentityAuditBindingReady: false,
      managedAuditLocalEvidenceReady: false,
      deploymentEnvironmentGateConfigured: false,
      upstreamActionsStillDisabled: true,
      productionBlockersRemain: true,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "VERIFIED_IDENTITY_AUDIT_BINDING_INCOMPLETE",
      "REAL_IDP_NOT_CONNECTED",
      "MANAGED_AUDIT_LOCAL_EVIDENCE_INCOMPLETE",
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "DEPLOYMENT_ENVIRONMENT_GATE_INCOMPLETE",
    ]));
  });

  it("exposes production readiness summary v6 routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v6-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v6",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v6?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryVersion: "production-readiness-summary.v6",
        checks: {
          verifiedIdentityAuditBindingReady: true,
          managedAuditLocalEvidenceReady: true,
          deploymentEnvironmentGateConfigured: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v6");
      expect(markdown.body).toContain("REAL_IDP_NOT_CONNECTED");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
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
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
  });
}
