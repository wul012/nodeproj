import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { MiniKvClient } from "../src/clients/miniKvClient.js";
import { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import { loadProductionConnectionDryRunChangeRequest } from "../src/services/productionConnectionDryRunChangeRequest.js";
import { ProductionConnectionDryRunApprovalLedger } from "../src/services/productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionReadinessSummaryV13,
} from "../src/services/productionReadinessSummaryV13.js";

describe("production readiness summary v13", () => {
  it("combines v12 review evidence and live probe skipped evidence while keeping production operations blocked", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v13-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      const changeRequest = await loadProductionConnectionDryRunChangeRequest({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      await ledger.create({
        decision: "approve",
        reviewer: "summary-v13-approver",
        reason: "approve v13 live probe readiness evidence",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      }, {
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const summary = await loadProductionReadinessSummaryV13({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(summary).toMatchObject({
        summaryVersion: "production-readiness-summary.v13",
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        stage: {
          name: "production-live-probe-readiness",
          productionReadinessSummaryV12Version: "production-readiness-summary.v12",
          productionLiveProbeReadinessContractVersion: "production-live-probe-readiness-contract.v1",
          productionLiveProbeSmokeHarnessVersion: "production-live-probe-smoke-harness.v1",
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
        },
        readinessStatus: {
          summaryV12Ready: true,
          liveProbeContractReady: true,
          liveProbeSmokeEvidenceReady: true,
          liveProbeSmokeSkipped: true,
          liveProbeSmokePassed: false,
          realManagedAuditAdapterStillMissing: true,
          realIdpVerifierStillMissing: true,
        },
        checks: {
          summaryV12EvidenceReady: true,
          liveProbeContractReady: true,
          liveProbeSmokeEvidenceReady: true,
          liveProbeSmokeSkipped: true,
          liveProbeSmokePassed: false,
          liveProbeWritesAttempted: false,
          realManagedAuditAdapterConnected: false,
          realIdpVerifierConnected: false,
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
        ["summary-v12-evidence", "pass"],
        ["live-probe-contract", "pass"],
        ["live-probe-smoke", "pass"],
        ["real-production-connections", "blocked"],
        ["execution-safety", "pass"],
      ]);
      expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
        "REAL_IDP_VERIFIER_NOT_CONNECTED",
      ]);
      expect(summary.warnings.map((warning) => warning.code)).toEqual([
        "LIVE_PROBE_SMOKE_SKIPPED_CONNECTIONS_MISSING",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("surfaces missing v12 approval evidence while keeping live probe contract and smoke evidence readable", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v13-missing-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      const summary = await loadProductionReadinessSummaryV13({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: new ProductionConnectionDryRunApprovalLedger(),
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(summary.readyForProductionOperations).toBe(false);
      expect(summary.checks).toMatchObject({
        summaryV12EvidenceReady: false,
        liveProbeContractReady: true,
        liveProbeSmokeEvidenceReady: true,
        liveProbeSmokeSkipped: true,
        upstreamActionsStillDisabled: true,
      });
      expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "SUMMARY_V12_EVIDENCE_NOT_READY",
        "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
        "REAL_IDP_VERIFIER_NOT_CONNECTED",
      ]));
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes production readiness summary v13 routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v13-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const changeRequest = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-dry-run-change-request",
        headers,
      });
      await app.inject({
        method: "POST",
        url: "/api/v1/production/connection-dry-run-approvals",
        headers,
        payload: {
          decision: "approve",
          reviewer: "approver-1",
          reason: "approve v13 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v13",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v13?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryVersion: "production-readiness-summary.v13",
        readinessStatus: {
          summaryV12Ready: true,
          liveProbeContractReady: true,
          liveProbeSmokeEvidenceReady: true,
          liveProbeSmokeSkipped: true,
          realManagedAuditAdapterStillMissing: true,
          realIdpVerifierStillMissing: true,
        },
        checks: {
          liveProbeWritesAttempted: false,
          upstreamActionsStillDisabled: true,
          readyForProductionOperations: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v13");
      expect(markdown.body).toContain("LIVE_PROBE_SMOKE_SKIPPED_CONNECTIONS_MISSING");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 10000);
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
