import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import { loadProductionConnectionArchiveVerification } from "../src/services/productionConnectionArchiveVerification.js";
import { loadProductionConnectionDryRunChangeRequest } from "../src/services/productionConnectionDryRunChangeRequest.js";
import { ProductionConnectionDryRunApprovalLedger } from "../src/services/productionConnectionDryRunApprovalLedger.js";

describe("production connection archive verification", () => {
  it("verifies precheck, change request, and approval digests while keeping real connections untouched", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-archive-verification-"));
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
        reviewer: "archive-approver",
        reason: "archive dry-run change evidence",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      }, {
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const verification = await loadProductionConnectionArchiveVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
      });

      expect(verification).toMatchObject({
        profileVersion: "production-connection-archive-verification.v1",
        readyForArchiveVerification: true,
        readyForProductionConnections: false,
        readOnly: true,
        executionAllowed: false,
        archive: {
          changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
          approvalDigest: approval.approvalDigest.value,
          approvalDecision: "approve",
          approvalSequence: 1,
        },
        checks: {
          precheckVersionValid: true,
          changeRequestDigestValid: true,
          approvalRecordPresent: true,
          approvalDigestValid: true,
          approvalDigestMatchesChangeRequest: true,
          approvalReadyForArchive: true,
          noDatabaseConnectionAttempted: true,
          noJwksNetworkFetch: true,
          noExternalIdpCall: true,
          noRealConnectionAttempted: true,
          dryRunOnly: true,
          changeRequestNonExecutable: true,
          upstreamActionsStillDisabled: true,
          readyForArchiveVerification: true,
        },
        summary: {
          artifactCount: 3,
          verifiedArtifactCount: 3,
          productionBlockerCount: 0,
        },
      });
      expect(verification.archive.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.artifacts.latestApproval).toMatchObject({
        approvalId: approval.approvalId,
        approvalDigest: approval.approvalDigest.value,
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
        realConnectionAttempted: false,
      });
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks archive verification when approval evidence is missing", async () => {
    const config = loadTestConfig("tmp-audit.jsonl");
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();
    const verification = await loadProductionConnectionArchiveVerification({
      config,
      auditLog: runtime.auditLog,
      auditStoreRuntime: runtime.description,
      productionConnectionDryRunApprovals: ledger,
    });

    expect(verification.readyForArchiveVerification).toBe(false);
    expect(verification.checks).toMatchObject({
      approvalRecordPresent: false,
      approvalDigestValid: false,
      approvalDigestMatchesChangeRequest: false,
      approvalReadyForArchive: false,
      noRealConnectionAttempted: true,
      upstreamActionsStillDisabled: true,
      readyForArchiveVerification: false,
    });
    expect(verification.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "APPROVAL_RECORD_MISSING",
      "APPROVAL_DIGEST_INVALID",
      "APPROVAL_CHANGE_REQUEST_DIGEST_MISMATCH",
    ]));
  });

  it("exposes archive verification routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-archive-verification-route-"));
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
          reason: "approve archive verification evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-archive-verification",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-archive-verification?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-connection-archive-verification.v1",
        readyForArchiveVerification: true,
        checks: {
          approvalDigestValid: true,
          approvalDigestMatchesChangeRequest: true,
          noRealConnectionAttempted: true,
          dryRunOnly: true,
          changeRequestNonExecutable: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production connection archive verification");
      expect(markdown.body).toContain("ARCHIVE_VERIFICATION_READY_CONNECTIONS_MISSING");
      expect(markdown.body).toContain("No archive verification blockers.");
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
