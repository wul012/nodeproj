import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  loadProductionReadinessSummaryV11,
} from "../src/services/productionReadinessSummaryV11.js";

describe("production readiness summary v11", () => {
  it("summarizes implementation precheck, dry-run change request, and missing real connections", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v11-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      runtime.auditLog.record({
        requestId: "req-summary-v11",
        method: "GET",
        path: "/api/v1/production/readiness-summary-v11",
        statusCode: 200,
        durationMs: 7,
      });

      const summary = await loadProductionReadinessSummaryV11({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });

      expect(summary).toMatchObject({
        summaryVersion: "production-readiness-summary.v11",
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        stage: {
          name: "production-connection-implementation-planning",
          productionReadinessSummaryV10Version: "production-readiness-summary.v10",
          productionConnectionImplementationPrecheckVersion: "production-connection-implementation-precheck.v1",
          productionConnectionDryRunChangeRequestVersion: "production-connection-dry-run-change-request.v1",
          upstreamActionsEnabled: false,
        },
        readinessStatus: {
          implementationPrecheckReady: true,
          dryRunChangeRequestReady: true,
          ownerApprovalsStillPending: true,
          realManagedAuditAdapterStillMissing: true,
          realIdpVerifierStillMissing: true,
          dryRunChangeRequestStillNonExecutable: true,
        },
        checks: {
          summaryV10EvidenceReady: true,
          implementationPrecheckReady: true,
          dryRunChangeRequestReady: true,
          ownerApprovalsPresent: false,
          realManagedAuditAdapterConnected: false,
          realIdpVerifierConnected: false,
          dryRunChangeRequestExecutable: false,
          noDatabaseConnectionAttempted: true,
          noJwksNetworkFetch: true,
          noExternalIdpCall: true,
          upstreamActionsStillDisabled: true,
          readyForProductionOperations: false,
        },
        summary: {
          categoryCount: 5,
          passedCategoryCount: 4,
          blockedCategoryCount: 1,
          productionBlockerCount: 4,
        },
      });
      expect(summary.categories.map((category) => [category.id, category.status])).toEqual([
        ["summary-v10-evidence", "pass"],
        ["implementation-precheck", "pass"],
        ["dry-run-change-request", "pass"],
        ["real-production-connections", "blocked"],
        ["execution-safety", "pass"],
      ]);
      expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "OWNER_APPROVALS_PENDING",
        "DRY_RUN_CHANGE_REQUEST_NOT_EXECUTABLE",
        "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
        "REAL_IDP_VERIFIER_NOT_CONNECTED",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("surfaces incomplete planning evidence and unsafe upstream actions", async () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const summary = await loadProductionReadinessSummaryV11({
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
    });

    expect(summary.checks).toMatchObject({
      summaryV10EvidenceReady: false,
      implementationPrecheckReady: false,
      dryRunChangeRequestReady: false,
      upstreamActionsStillDisabled: false,
      readyForProductionOperations: false,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "SUMMARY_V10_EVIDENCE_NOT_READY",
      "IMPLEMENTATION_PRECHECK_NOT_READY",
      "DRY_RUN_CHANGE_REQUEST_NOT_READY",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("exposes production readiness summary v11 routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v11-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v11",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v11?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryVersion: "production-readiness-summary.v11",
        readinessStatus: {
          implementationPrecheckReady: true,
          dryRunChangeRequestReady: true,
          realManagedAuditAdapterStillMissing: true,
          realIdpVerifierStillMissing: true,
        },
        checks: {
          realManagedAuditAdapterConnected: false,
          realIdpVerifierConnected: false,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v11");
      expect(markdown.body).toContain("IMPLEMENTATION_PLANNING_READY_CONNECTIONS_MISSING");
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
