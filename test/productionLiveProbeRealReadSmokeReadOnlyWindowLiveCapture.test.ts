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
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture,
} from "../src/services/productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("production live probe real-read smoke read-only window live capture", () => {
  it("records skipped capture when the read-only probe window is closed", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-read-only-live-capture-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v156 skipped live capture");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
        captureState: "captured-skipped",
        readyForReadOnlyLiveCapture: true,
        readyForProductionPassEvidenceCandidate: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        capture: {
          probeWindowOpen: false,
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          runtimeFileRead: false,
          manualJavaStartRequired: true,
          manualMiniKvStartRequired: true,
          skippedWithoutUpstreamsOnly: true,
          skippedOrMixedEvidenceCannotPass: true,
          passRecordCount: 0,
          skippedRecordCount: 5,
          blockedRecordCount: 0,
        },
        checks: {
          readinessPacketReady: true,
          readinessPacketDigestValid: true,
          smokeHarnessReady: true,
          smokeProbeSetComplete: true,
          allProbeResultsReadOnly: true,
          noWriteProbeAttempted: true,
          upstreamActionsStillDisabled: true,
          noAutomaticUpstreamStart: true,
          skippedAllowedWhenWindowClosed: true,
          passRequiresProbeWindowOpen: true,
          skippedOrMixedNotProductionPass: true,
          readyForProductionOperationsStillFalse: true,
          readyForReadOnlyLiveCapture: true,
          readyForProductionPassEvidenceCandidate: false,
        },
        summary: {
          capturedRecordCount: 5,
          passRecordCount: 0,
          skippedRecordCount: 5,
          blockedRecordCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(profile.capture.liveCaptureDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.capture.readinessPacketDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.capturedRecords.every((record) => record.captureStatus === "captured-skipped")).toBe(true);
      expect(profile.capturedRecords.every((record) => record.readOnly && !record.mutatesState)).toBe(true);
      expect(profile.warnings.map((warning) => warning.code)).toContain("READ_ONLY_WINDOW_CLOSED");
      expect(profile.warnings.map((warning) => warning.code)).toContain("LIVE_CAPTURE_SKIPPED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 30000);

  it("records pass capture when manually available upstreams respond in a probe window", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-read-only-live-capture-pass-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_PROBES_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v156 pass live capture");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new PassingOrderPlatformClient(),
        miniKv: new PassingMiniKvClient(),
      });

      expect(profile).toMatchObject({
        captureState: "captured-pass",
        readyForReadOnlyLiveCapture: true,
        readyForProductionPassEvidenceCandidate: true,
        readyForProductionOperations: false,
        capture: {
          probeWindowOpen: true,
          upstreamProbesEnabled: true,
          upstreamActionsEnabled: false,
          automaticUpstreamStart: false,
          passRecordCount: 5,
          skippedRecordCount: 0,
          blockedRecordCount: 0,
        },
        checks: {
          readinessPacketReady: true,
          smokeHarnessReady: true,
          passRequiresProbeWindowOpen: true,
          upstreamActionsStillDisabled: true,
          readyForProductionPassEvidenceCandidate: true,
        },
      });
      expect(profile.productionBlockers).toHaveLength(0);
      expect(profile.capturedRecords.every((record) => record.captureStatus === "captured-pass")).toBe(true);
      expect(profile.warnings.map((warning) => warning.code)).toContain("READ_ONLY_WINDOW_OPEN");
      expect(profile.warnings.map((warning) => warning.code)).toContain("LIVE_CAPTURE_PASS");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("blocks capture when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-read-only-live-capture-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v156 blocked live capture");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.captureState).toBe("blocked");
      expect(profile.readyForReadOnlyLiveCapture).toBe(false);
      expect(profile.readyForProductionPassEvidenceCandidate).toBe(false);
      expect(profile.checks.readinessPacketReady).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("READINESS_PACKET_NOT_READY");
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("exposes read-only live capture routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-read-only-live-capture-route-"));
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
          reason: "approve v156 route live capture",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-live-capture?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-read-only-window-live-capture.v1",
        captureState: "captured-skipped",
        readyForReadOnlyLiveCapture: true,
        readyForProductionPassEvidenceCandidate: false,
        checks: {
          readinessPacketReady: true,
          skippedAllowedWhenWindowClosed: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke read-only window live capture");
      expect(markdown.body).toContain("LIVE_CAPTURE_SKIPPED");
      expect(markdown.body).toContain("java-actuator-health");
      expect(markdown.body).toContain("mini-kv-infojson");
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
    reviewer: "live-probe-read-only-live-capture",
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
