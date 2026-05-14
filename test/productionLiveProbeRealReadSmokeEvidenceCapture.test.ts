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
  loadProductionLiveProbeRealReadSmokeEvidenceCapture,
} from "../src/services/productionLiveProbeRealReadSmokeEvidenceCapture.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("production live probe real-read smoke evidence capture", () => {
  it("captures skipped evidence without starting upstreams automatically", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-evidence-capture-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v148 evidence capture");
      const profile = await loadProductionLiveProbeRealReadSmokeEvidenceCapture({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1",
        captureState: "captured-skipped",
        readyForEvidenceCapture: true,
        readyForProductionPassEvidenceCandidate: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        capture: {
          releaseGateDecision: "not-production-pass-evidence",
          captureMode: "skipped",
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          readOnlyWindowOpen: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          importedRecordCount: 5,
          passRecordCount: 0,
          skippedRecordCount: 5,
          rejectedRecordCount: 0,
        },
        checks: {
          dryRunPackageDigestValid: true,
          archiveAdapterReady: true,
          resultImporterReady: true,
          releaseEvidenceGateReady: true,
          allExpectedRecordsCaptured: true,
          allCapturedRecordsAccepted: true,
          noWriteEvidenceCaptured: true,
          upstreamActionsStillDisabled: true,
          noAutomaticUpstreamStart: true,
          passRequiresProbeWindowOpen: true,
          skippedOrMixedNotProductionPass: true,
          readyForEvidenceCapture: true,
          readyForProductionPassEvidenceCandidate: false,
        },
        summary: {
          capturedRecordCount: 5,
          passRecordCount: 0,
          skippedRecordCount: 5,
          rejectedRecordCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(profile.capture.captureDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.capture.dryRunPackageDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.capture.archiveAdapterDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.capture.resultImportDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.capture.releaseEvidenceGateDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.capturedRecords.every((record) => record.captureStatus === "captured-skipped")).toBe(true);
      expect(profile.warnings.map((warning) => warning.code)).toContain("REAL_READ_SMOKE_SKIPPED_CAPTURED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("captures all-pass evidence as a pass candidate only when the read-only window is open", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-evidence-capture-pass-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_PROBES_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v148 pass evidence capture");
      const profile = await loadProductionLiveProbeRealReadSmokeEvidenceCapture({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new PassingOrderPlatformClient(),
        miniKv: new PassingMiniKvClient(),
      });

      expect(profile).toMatchObject({
        captureState: "captured-pass",
        readyForEvidenceCapture: true,
        readyForProductionPassEvidenceCandidate: true,
        readyForProductionOperations: false,
        capture: {
          releaseGateDecision: "production-pass-evidence-ready",
          captureMode: "pass",
          upstreamProbesEnabled: true,
          upstreamActionsEnabled: false,
          readOnlyWindowOpen: true,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          importedRecordCount: 5,
          passRecordCount: 5,
          skippedRecordCount: 0,
          rejectedRecordCount: 0,
        },
        checks: {
          passRequiresProbeWindowOpen: true,
          skippedOrMixedNotProductionPass: true,
          readyForEvidenceCapture: true,
          readyForProductionPassEvidenceCandidate: true,
        },
        summary: {
          capturedRecordCount: 5,
          passRecordCount: 5,
          skippedRecordCount: 0,
          rejectedRecordCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(profile.capturedRecords.every((record) => record.captureStatus === "captured-pass")).toBe(true);
      expect(profile.capturedRecords.every((record) => record.attempted)).toBe(true);
      expect(profile.warnings.map((warning) => warning.code)).toContain("REAL_READ_SMOKE_PASS_CAPTURED");
      expect(profile.warnings.map((warning) => warning.code)).toContain("RELEASE_GATE_ACCEPTS_CAPTURE_AS_PASS_CANDIDATE");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("blocks capture when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-evidence-capture-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v148 blocked evidence capture");
      const profile = await loadProductionLiveProbeRealReadSmokeEvidenceCapture({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.captureState).toBe("blocked");
      expect(profile.readyForEvidenceCapture).toBe(false);
      expect(profile.readyForProductionPassEvidenceCandidate).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("exposes evidence capture routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-evidence-capture-route-"));
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
          reason: "approve v148 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-evidence-capture",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-evidence-capture?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-evidence-capture.v1",
        captureState: "captured-skipped",
        readyForEvidenceCapture: true,
        readyForProductionPassEvidenceCandidate: false,
        capture: {
          captureMode: "skipped",
          skippedRecordCount: 5,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke evidence capture");
      expect(markdown.body).toContain("REAL_READ_SMOKE_SKIPPED_CAPTURED");
      expect(markdown.body).toContain("captured-skipped");
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
    reviewer: "live-probe-evidence-capture",
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

class PassingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    return Promise.resolve({
      statusCode: 200,
      latencyMs: 5,
      data: { status: "UP" },
    });
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    return Promise.resolve({
      statusCode: 200,
      latencyMs: 7,
      data: {
        sampledAt: "2026-05-13T00:00:00.000Z",
        orders: { total: 3 },
        outbox: { pending: 0 },
        failedEvents: { total: 0, pendingReplayApprovals: 0 },
      },
    });
  }
}

class PassingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    return Promise.resolve({
      command: "HEALTH",
      response: "OK",
      latencyMs: 4,
    });
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    return Promise.resolve({
      command: "INFOJSON",
      response: "{\"version\":\"test\"}",
      latencyMs: 4,
      info: {
        version: "test",
        server: { protocol: ["tcp-inline"] },
        store: { live_keys: 0 },
      },
    });
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    return Promise.resolve({
      command: "STATSJSON",
      response: "{\"keys\":0}",
      latencyMs: 4,
      stats: {
        keys: 0,
        commands_total: 3,
      },
    });
  }
}
