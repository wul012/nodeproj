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
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive,
} from "../src/services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.js";

describe("production live probe real-read smoke read-only window capture archive", () => {
  it("archives skipped capture with Java v50 and mini-kv v59 references", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-capture-archive-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v157 skipped capture archive");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive.v1",
        archiveState: "read-only-skipped-capture-archived",
        readyForReadOnlyCaptureArchive: true,
        readyForProductionPassEvidenceArchive: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        archive: {
          captureState: "captured-skipped",
          archivedAsProductionPassEvidence: false,
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          skippedOrMixedEvidenceCannotPass: true,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          runtimeFileRead: false,
          javaVersionTag: "v50订单平台ops-read-only-window-self-description",
          miniKvVersionTag: "第五十九版运行时只读自描述",
        },
        checks: {
          liveCaptureDigestValid: true,
          readinessPacketDigestValid: true,
          liveCaptureProfileVersionValid: true,
          readinessPacketProfileVersionValid: true,
          liveCaptureReady: true,
          capturedRecordSetComplete: true,
          skippedOrMixedArchivedAsNonPass: true,
          upstreamActionsStillDisabled: true,
          noAutomaticUpstreamStart: true,
          javaV50ReferenceReady: true,
          miniKvV59ReferenceReady: true,
          readyForProductionOperationsStillFalse: true,
          readyForReadOnlyCaptureArchive: true,
        },
        summary: {
          capturedRecordCount: 5,
          passRecordCount: 0,
          skippedRecordCount: 5,
          blockedRecordCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(profile.archive.captureArchiveDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.archive.liveCaptureDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.archive.readinessPacketDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.warnings.map((warning) => warning.code)).toContain("SKIPPED_CAPTURE_NOT_PRODUCTION_PASS");
      expect(profile.artifacts.javaReference.tag).toBe("v50订单平台ops-read-only-window-self-description");
      expect(profile.artifacts.miniKvReference.tag).toBe("第五十九版运行时只读自描述");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 30000);

  it("blocks archive when upstream actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-capture-archive-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v157 blocked capture archive");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.archiveState).toBe("blocked");
      expect(profile.readyForReadOnlyCaptureArchive).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 30000);

  it("exposes capture archive routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-capture-archive-route-"));
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
          reason: "approve v157 route archive",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-archive?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        archiveState: "read-only-skipped-capture-archived",
        readyForReadOnlyCaptureArchive: true,
        readyForProductionPassEvidenceArchive: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke read-only window capture archive");
      expect(markdown.body).toContain("SKIPPED_CAPTURE_NOT_PRODUCTION_PASS");
      expect(markdown.body).toContain("v50订单平台ops-read-only-window-self-description");
      expect(markdown.body).toContain("第五十九版运行时只读自描述");
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
    reviewer: "read-only-capture-archive",
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
