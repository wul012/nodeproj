import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import { loadProductionConnectionDryRunChangeRequest } from "../src/services/productionConnectionDryRunChangeRequest.js";
import { ProductionConnectionDryRunApprovalLedger } from "../src/services/productionConnectionDryRunApprovalLedger.js";

describe("production connection dry-run approval ledger", () => {
  it("records approve/reject decisions against the current dry-run change request digest", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-dry-run-approval-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      const changeRequest = await loadProductionConnectionDryRunChangeRequest({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const approval = await ledger.create({
        decision: "approve",
        reviewer: "release-approver",
        reason: "approve dry-run archive evidence only",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      }, {
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const snapshot = ledger.snapshot(config);

      expect(approval).toMatchObject({
        profileVersion: "production-connection-dry-run-approval.v1",
        sequence: 1,
        reviewer: "release-approver",
        decision: "approve",
        reason: "approve dry-run archive evidence only",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
        dryRunOnly: true,
        executable: false,
        realConnectionAttempted: false,
        upstreamActionsEnabled: false,
        changeRequestArchiveReady: true,
        readyForApprovalArchive: true,
      });
      expect(approval.approvalDigest).toMatchObject({
        algorithm: "sha256",
        coveredFields: expect.arrayContaining([
          "approvalId",
          "decision",
          "changeRequestDigest",
          "realConnectionAttempted",
        ]),
      });
      expect(approval.approvalDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(snapshot).toMatchObject({
        profileVersion: "production-connection-dry-run-approval-ledger.v1",
        readyForApprovalArchive: true,
        checks: {
          approvalRecordPresent: true,
          latestApprovalDigestValid: true,
          latestChangeRequestDigestMatches: true,
          latestDecisionAllowed: true,
          latestRealConnectionAttempted: false,
          upstreamActionsStillDisabled: true,
          readyForApprovalArchive: true,
        },
        summary: {
          approvalRecordCount: 1,
          approvalDecisionCount: 1,
          rejectionDecisionCount: 0,
          productionBlockerCount: 0,
        },
      });
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("rejects stale or invalid change request digests", async () => {
    const config = loadTestConfig("tmp-audit.jsonl");
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    await expect(ledger.create({
      decision: "reject",
      reviewer: "release-approver",
      reason: "stale digest check",
      changeRequestDigest: "0".repeat(64),
    }, {
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
    })).rejects.toMatchObject({
      statusCode: 409,
      code: "DRY_RUN_CHANGE_REQUEST_DIGEST_MISMATCH",
    });
  });

  it("exposes approval ledger routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-dry-run-approval-route-"));
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
      const approval = await app.inject({
        method: "POST",
        url: "/api/v1/production/connection-dry-run-approvals",
        headers,
        payload: {
          decision: "approve",
          reviewer: "approver-1",
          reason: "approve dry-run archive evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const latestMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-dry-run-approvals/latest?format=markdown",
        headers,
      });
      const ledgerMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-dry-run-approvals?format=markdown",
        headers,
      });

      expect(changeRequest.statusCode).toBe(200);
      expect(approval.statusCode).toBe(201);
      expect(approval.json()).toMatchObject({
        profileVersion: "production-connection-dry-run-approval.v1",
        decision: "approve",
        executable: false,
        realConnectionAttempted: false,
        readyForApprovalArchive: true,
      });
      expect(latestMarkdown.statusCode).toBe(200);
      expect(latestMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(latestMarkdown.body).toContain("# Production connection dry-run approval");
      expect(latestMarkdown.body).toContain("Decision: approve");
      expect(ledgerMarkdown.statusCode).toBe(200);
      expect(ledgerMarkdown.body).toContain("# Production connection dry-run approval ledger");
      expect(ledgerMarkdown.body).toContain("DRY_RUN_APPROVAL_ARCHIVE_READY");
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
