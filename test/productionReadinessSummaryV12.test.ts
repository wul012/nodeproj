import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import { loadProductionConnectionDryRunChangeRequest } from "../src/services/productionConnectionDryRunChangeRequest.js";
import { ProductionConnectionDryRunApprovalLedger } from "../src/services/productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionReadinessSummaryV12,
} from "../src/services/productionReadinessSummaryV12.js";

describe("production readiness summary v12", () => {
  it("summarizes approval ledger and archive verification readiness while keeping production connections blocked", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v12-"));
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
        reviewer: "summary-v12-approver",
        reason: "approve v12 dry-run review evidence",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      }, {
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const summary = await loadProductionReadinessSummaryV12({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
      });

      expect(summary).toMatchObject({
        summaryVersion: "production-readiness-summary.v12",
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        stage: {
          name: "production-connection-review-archive",
          productionReadinessSummaryV11Version: "production-readiness-summary.v11",
          productionConnectionDryRunApprovalLedgerVersion: "production-connection-dry-run-approval-ledger.v1",
          productionConnectionArchiveVerificationVersion: "production-connection-archive-verification.v1",
          upstreamActionsEnabled: false,
        },
        readinessStatus: {
          summaryV11Ready: true,
          approvalLedgerReady: true,
          archiveVerificationReady: true,
          realManagedAuditAdapterStillMissing: true,
          realIdpVerifierStillMissing: true,
          dryRunReviewNotProductionApproval: true,
        },
        checks: {
          summaryV11EvidenceReady: true,
          approvalLedgerReady: true,
          archiveVerificationReady: true,
          approvalDigestValid: true,
          archiveDigestValid: true,
          realManagedAuditAdapterConnected: false,
          realIdpVerifierConnected: false,
          dryRunReviewOnly: true,
          noRealConnectionAttempted: true,
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
        ["summary-v11-evidence", "pass"],
        ["approval-ledger", "pass"],
        ["archive-verification", "pass"],
        ["real-production-connections", "blocked"],
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

  it("surfaces missing approval and archive verification evidence", async () => {
    const config = loadTestConfig("tmp-audit.jsonl");
    const runtime = createAuditStoreRuntime(config);
    const summary = await loadProductionReadinessSummaryV12({
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
      productionConnectionDryRunApprovals: new ProductionConnectionDryRunApprovalLedger(),
    });

    expect(summary.readyForProductionOperations).toBe(false);
    expect(summary.checks).toMatchObject({
      summaryV11EvidenceReady: true,
      approvalLedgerReady: false,
      archiveVerificationReady: false,
      approvalDigestValid: false,
      noRealConnectionAttempted: true,
      upstreamActionsStillDisabled: true,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "APPROVAL_LEDGER_NOT_READY",
      "ARCHIVE_VERIFICATION_NOT_READY",
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
    ]));
  });

  it("exposes production readiness summary v12 routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-prs-v12-route-"));
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
          reason: "approve v12 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v12",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v12?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryVersion: "production-readiness-summary.v12",
        readinessStatus: {
          approvalLedgerReady: true,
          archiveVerificationReady: true,
          realManagedAuditAdapterStillMissing: true,
          realIdpVerifierStillMissing: true,
        },
        checks: {
          dryRunReviewOnly: true,
          noRealConnectionAttempted: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v12");
      expect(markdown.body).toContain("DRY_RUN_REVIEW_READY_CONNECTIONS_MISSING");
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
