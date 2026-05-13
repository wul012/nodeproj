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
  loadProductionLiveProbeRealReadSmokeArchiveAdapter,
} from "../src/services/productionLiveProbeRealReadSmokeArchiveAdapter.js";

describe("production live probe real-read smoke archive adapter", () => {
  it("normalizes skipped smoke harness results into archive records without production pass evidence", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-adapter-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v143 archive adapter evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeArchiveAdapter({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-archive-adapter.v1",
        readyForArchiveAdapter: true,
        readyForProductionPassEvidence: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        adapter: {
          adapterMode: "skipped",
          readinessSwitchState: "closed-skipped-evidence",
          smokeHarnessProfileVersion: "production-live-probe-smoke-harness.v1",
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          plannedProbeCount: 5,
          passedProbeCount: 0,
          skippedProbeCount: 5,
          blockedProbeCount: 0,
          skippedEvidenceNotProductionPass: true,
        },
        checks: {
          readinessSwitchReviewReady: true,
          smokeHarnessReady: true,
          allProbeResultsRecorded: true,
          noBlockedProbeResults: true,
          noWriteProbeAttempted: true,
          upstreamActionsStillDisabled: true,
          skippedEvidenceNotProductionPass: true,
          passEvidenceRequiresEnabledProbes: true,
          readyForArchiveAdapter: true,
          readyForProductionPassEvidence: false,
        },
        summary: {
          recordCount: 5,
          passRecordCount: 0,
          skippedRecordCount: 5,
          blockedRecordCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(profile.adapter.adapterDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.adapter.readinessSwitchDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.records.every((record) => record.archiveStatus === "skipped-evidence")).toBe(true);
      expect(profile.warnings.map((warning) => warning.code)).toContain("REAL_READ_SMOKE_SKIPPED_EVIDENCE_ARCHIVED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks archive adaptation when the readiness switch is not review-ready", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-adapter-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      const profile = await loadProductionLiveProbeRealReadSmokeArchiveAdapter({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: new ProductionConnectionDryRunApprovalLedger(),
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.readyForArchiveAdapter).toBe(false);
      expect(profile.readyForProductionPassEvidence).toBe(false);
      expect(profile.checks.readinessSwitchReviewReady).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("READINESS_SWITCH_NOT_READY");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes archive adapter routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-adapter-route-"));
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
          reason: "approve v143 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-archive-adapter",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-archive-adapter?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-archive-adapter.v1",
        readyForArchiveAdapter: true,
        readyForProductionPassEvidence: false,
        adapter: {
          adapterMode: "skipped",
          skippedProbeCount: 5,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke archive adapter");
      expect(markdown.body).toContain("REAL_READ_SMOKE_SKIPPED_EVIDENCE_ARCHIVED");
      expect(markdown.body).toContain("skipped-evidence");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);
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
    reviewer: "live-probe-archive-adapter",
    reason,
    changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
  }, {
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
  });
}

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
