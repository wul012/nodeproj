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
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification,
} from "../src/services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.js";

describe("production live probe real-read smoke read-only window capture archive verification", () => {
  it("verifies the skipped capture archive digest and keeps it non-pass", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-capture-archive-verification-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v158 skipped archive verification");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.v1",
        verificationState: "verified-read-only-skipped-capture-archive",
        readyForReadOnlyCaptureArchiveVerification: true,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        verification: {
          archiveState: "read-only-skipped-capture-archived",
          liveCaptureProfileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
          readinessPacketProfileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
          captureState: "captured-skipped",
          archivedAsProductionPassEvidence: false,
          skippedOrMixedEvidenceCannotPass: true,
          upstreamActionsEnabled: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          runtimeFileRead: false,
          javaVersionTag: "v50订单平台ops-read-only-window-self-description",
          miniKvVersionTag: "第五十九版运行时只读自描述",
        },
        checks: {
          captureArchiveDigestValid: true,
          captureArchiveDigestMatches: true,
          archiveProfileVersionValid: true,
          archiveReadyForVerification: true,
          archiveChecksAllPassed: true,
          archiveProductionBlockersClear: true,
          liveCaptureProfileVersionValid: true,
          readinessPacketProfileVersionValid: true,
          javaV50ReferenceReady: true,
          miniKvV59ReferenceReady: true,
          skippedOrMixedNotProductionPass: true,
          upstreamActionsStillDisabled: true,
          noAutomaticUpstreamStart: true,
          readyForProductionOperationsStillFalse: true,
          readyForReadOnlyCaptureArchiveVerification: true,
        },
        summary: {
          productionBlockerCount: 0,
        },
      });
      expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.verification.captureArchiveDigest).toBe(profile.verification.expectedCaptureArchiveDigest);
      expect(profile.warnings.map((warning) => warning.code)).toContain("CAPTURE_ARCHIVE_DIGEST_VERIFIED");
      expect(profile.warnings.map((warning) => warning.code)).toContain("SKIPPED_CAPTURE_REMAINS_NON_PASS");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("blocks verification when the source archive is blocked", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-capture-archive-verification-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v158 blocked archive verification");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.verificationState).toBe("blocked");
      expect(profile.readyForReadOnlyCaptureArchiveVerification).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("ARCHIVE_STATE_BLOCKED");
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("exposes capture archive verification routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-capture-archive-verification-route-"));
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
          reason: "approve v158 route verification",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive-verification?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        verificationState: "verified-read-only-skipped-capture-archive",
        readyForReadOnlyCaptureArchiveVerification: true,
        checks: {
          captureArchiveDigestMatches: true,
          skippedOrMixedNotProductionPass: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke read-only window capture archive verification");
      expect(markdown.body).toContain("CAPTURE_ARCHIVE_DIGEST_VERIFIED");
      expect(markdown.body).toContain("SKIPPED_CAPTURE_REMAINS_NON_PASS");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);
});

async function approveCurrentChangeRequest(
  config: ReturnType<typeof loadConfig>,
  runtime: ReturnType<typeof createAuditStoreRuntime>,
  ledger: ProductionConnectionDryRunApprovalLedger,
  reason: string,
): Promise<void> {
  const changeRequest = await loadProductionConnectionDryRunChangeRequest({
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
  });
  await ledger.create({
    decision: "approve",
    reviewer: "read-only-capture-archive-verification",
    reason,
    changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
  }, {
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
  });
}

function loadTestConfig(auditStorePath: string, overrides: Record<string, string> = {}) {
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
    ...overrides,
  });
}
