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
  loadProductionLiveProbeEvidenceArchiveVerification,
} from "../src/services/productionLiveProbeEvidenceArchiveVerification.js";

describe("production live probe evidence archive verification", () => {
  it("verifies archive digest, version references, no-write evidence, and skipped evidence boundaries", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-verification-"));
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
        reviewer: "live-probe-verifier",
        reason: "approve v139 live probe verification evidence",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      }, {
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const verification = await loadProductionLiveProbeEvidenceArchiveVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(verification).toMatchObject({
        profileVersion: "production-live-probe-evidence-archive-verification.v1",
        readyForArchiveVerification: true,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        verification: {
          archiveProfileVersion: "production-live-probe-evidence-archive.v1",
          liveProbeEvidenceMode: "skipped",
          plannedProbeCount: 5,
          passedProbeCount: 0,
          skippedProbeCount: 5,
          blockedProbeCount: 0,
          writeProbeAttempted: false,
          upstreamActionsEnabled: false,
          skippedEvidenceNotProductionPass: true,
        },
        checks: {
          archiveRecordReady: true,
          archiveDigestValid: true,
          contractVersionMatchesArchive: true,
          smokeHarnessVersionMatchesArchive: true,
          summaryV13VersionMatchesArchive: true,
          probeCountMatchesArtifacts: true,
          passOrSkippedOnly: true,
          noWriteProbeAttempted: true,
          upstreamActionsStillDisabled: true,
          skippedEvidenceNotProductionPass: true,
          verificationDigestValid: true,
          readyForArchiveVerification: true,
        },
        summary: {
          checkCount: 11,
          passedCheckCount: 11,
          productionBlockerCount: 0,
        },
      });
      expect(verification.verification.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.warnings.map((warning) => warning.code)).toEqual([
        "LIVE_PROBE_ARCHIVE_SKIPPED_VERIFIED_NOT_PRODUCTION_PASS",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks verification when the underlying archive record is not ready", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-verification-missing-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      const verification = await loadProductionLiveProbeEvidenceArchiveVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: new ProductionConnectionDryRunApprovalLedger(),
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(verification.readyForArchiveVerification).toBe(false);
      expect(verification.checks).toMatchObject({
        archiveRecordReady: false,
        archiveDigestValid: true,
        contractVersionMatchesArchive: true,
        smokeHarnessVersionMatchesArchive: true,
        summaryV13VersionMatchesArchive: true,
        noWriteProbeAttempted: true,
        upstreamActionsStillDisabled: true,
      });
      expect(verification.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "LIVE_PROBE_ARCHIVE_RECORD_NOT_READY",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes live probe evidence archive verification routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-verification-route-"));
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
          reason: "approve v139 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-evidence-archive/verification",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-evidence-archive/verification?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-evidence-archive-verification.v1",
        readyForArchiveVerification: true,
        verification: {
          liveProbeEvidenceMode: "skipped",
          plannedProbeCount: 5,
          skippedProbeCount: 5,
          writeProbeAttempted: false,
        },
        checks: {
          archiveDigestValid: true,
          noWriteProbeAttempted: true,
          skippedEvidenceNotProductionPass: true,
          readyForArchiveVerification: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe evidence archive verification");
      expect(markdown.body).toContain("LIVE_PROBE_ARCHIVE_SKIPPED_VERIFIED_NOT_PRODUCTION_PASS");
      expect(markdown.body).toContain("No live probe archive verification blockers.");
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
