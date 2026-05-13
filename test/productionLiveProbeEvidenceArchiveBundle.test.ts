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
  loadProductionLiveProbeEvidenceArchiveBundle,
} from "../src/services/productionLiveProbeEvidenceArchiveBundle.js";

describe("production live probe evidence archive bundle", () => {
  it("bundles archive record, verification, and referenced evidence files without adding a summary version", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-bundle-"));
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
        reviewer: "live-probe-bundler",
        reason: "approve v140 live probe bundle evidence",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      }, {
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const bundle = await loadProductionLiveProbeEvidenceArchiveBundle({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(bundle).toMatchObject({
        profileVersion: "production-live-probe-evidence-archive-bundle.v1",
        readyForArchiveBundle: true,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        bundle: {
          liveProbeEvidenceMode: "skipped",
          plannedProbeCount: 5,
          skippedProbeCount: 5,
          sourceArtifactCount: 2,
          referencedPathCount: 6,
          skippedEvidenceNotProductionPass: true,
          readyForProductionOperations: false,
        },
        checks: {
          archiveRecordReady: true,
          archiveVerificationReady: true,
          archiveDigestValid: true,
          verificationDigestValid: true,
          archiveDigestMatchesVerification: true,
          sourceArtifactRefsPresent: true,
          sourceArtifactFilesExist: true,
          noWriteProbeAttempted: true,
          upstreamActionsStillDisabled: true,
          skippedEvidenceNotProductionPass: true,
          bundleDigestValid: true,
          readyForArchiveBundle: true,
        },
        summary: {
          sourceArtifactCount: 2,
          referencedFileCount: 6,
          productionBlockerCount: 0,
        },
      });
      expect(bundle.bundle.bundleDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(bundle.bundle.archiveDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(bundle.bundle.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(bundle.artifacts.referencedFiles.filter((file) => file.requiredNow).every((file) => file.exists)).toBe(true);
      expect(bundle.summary.existingReferencedFileCount).toBeGreaterThanOrEqual(4);
      expect(bundle.warnings.map((warning) => warning.code)).toEqual([
        "LIVE_PROBE_BUNDLE_SKIPPED_NOT_PRODUCTION_PASS",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks bundle readiness when the underlying archive verification is incomplete", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-bundle-missing-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      const bundle = await loadProductionLiveProbeEvidenceArchiveBundle({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: new ProductionConnectionDryRunApprovalLedger(),
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(bundle.readyForArchiveBundle).toBe(false);
      expect(bundle.checks).toMatchObject({
        archiveRecordReady: false,
        archiveVerificationReady: false,
        archiveDigestValid: true,
        verificationDigestValid: true,
        sourceArtifactRefsPresent: true,
        sourceArtifactFilesExist: true,
        noWriteProbeAttempted: true,
        upstreamActionsStillDisabled: true,
      });
      expect(bundle.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "LIVE_PROBE_ARCHIVE_RECORD_NOT_READY",
        "LIVE_PROBE_ARCHIVE_VERIFICATION_NOT_READY",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes live probe evidence archive bundle routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-bundle-route-"));
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
          reason: "approve v140 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-evidence-archive/bundle",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-evidence-archive/bundle?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-evidence-archive-bundle.v1",
        readyForArchiveBundle: true,
        bundle: {
          liveProbeEvidenceMode: "skipped",
          sourceArtifactCount: 2,
          referencedPathCount: 6,
          skippedEvidenceNotProductionPass: true,
        },
        checks: {
          archiveRecordReady: true,
          archiveVerificationReady: true,
          readyForArchiveBundle: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe evidence archive bundle");
      expect(markdown.body).toContain("LIVE_PROBE_BUNDLE_SKIPPED_NOT_PRODUCTION_PASS");
      expect(markdown.body).toContain("No live probe archive bundle blockers.");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);
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
