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
  loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification,
} from "../src/services/productionLiveProbeRealReadSmokeProductionPassEvidenceVerification.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("production live probe real-read smoke production pass evidence verification", () => {
  it("blocks skipped capture from becoming production pass evidence", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-production-pass-verification-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v149 skipped verification");
      const profile = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1",
        verificationState: "not-production-pass-evidence",
        readyForProductionPassEvidenceVerification: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        verification: {
          captureState: "captured-skipped",
          captureMode: "skipped",
          releaseGateDecision: "not-production-pass-evidence",
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          readOnlyWindowOpen: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          allCapturedRecordsPass: false,
          skippedOrMixedRemainsBlocked: true,
        },
        checks: {
          captureReadyForEvidenceCapture: true,
          captureDigestValid: true,
          captureRecordCountMatches: true,
          captureAllCapturedRecordsAccepted: true,
          captureAllCapturedRecordsPass: false,
          captureNoSkippedRecords: false,
          captureNoRejectedRecords: true,
          captureNoWriteEvidenceCaptured: true,
          captureReadOnlyWindowOpen: false,
          releaseGateReadyForReleaseEvidenceGate: true,
          releaseGateDigestValid: true,
          releaseGateReadyForProductionPassEvidence: false,
          releaseGateDecisionMatchesCapture: true,
          upstreamActionsStillDisabled: true,
          noAutomaticUpstreamStart: true,
          skippedOrMixedRemainsBlocked: true,
          readyForProductionPassEvidenceVerification: false,
        },
        summary: {
          verificationCheckCount: 17,
          productionBlockerCount: 0,
        },
      });
      expect(profile.productionBlockers).toHaveLength(0);
      expect(profile.warnings.map((warning) => warning.code)).toContain("SKIPPED_OR_MIXED_CAPTURE_REMAINS_BLOCKED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("verifies all-pass capture as production pass evidence candidate only in the read-only window", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-production-pass-verification-pass-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_PROBES_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v149 pass verification");
      const profile = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new PassingOrderPlatformClient(),
        miniKv: new PassingMiniKvClient(),
      });

      expect(profile).toMatchObject({
        verificationState: "production-pass-evidence-ready",
        readyForProductionPassEvidenceVerification: true,
        readyForProductionOperations: false,
        verification: {
          captureState: "captured-pass",
          captureMode: "pass",
          releaseGateDecision: "production-pass-evidence-ready",
          upstreamProbesEnabled: true,
          upstreamActionsEnabled: false,
          readOnlyWindowOpen: true,
          allCapturedRecordsPass: true,
          skippedOrMixedRemainsBlocked: false,
        },
        checks: {
          captureReadyForEvidenceCapture: true,
          captureDigestValid: true,
          captureRecordCountMatches: true,
          captureAllCapturedRecordsAccepted: true,
          captureAllCapturedRecordsPass: true,
          captureNoSkippedRecords: true,
          captureNoRejectedRecords: true,
          captureNoWriteEvidenceCaptured: true,
          captureReadOnlyWindowOpen: true,
          releaseGateReadyForReleaseEvidenceGate: true,
          releaseGateDigestValid: true,
          releaseGateReadyForProductionPassEvidence: true,
          releaseGateDecisionMatchesCapture: true,
          upstreamActionsStillDisabled: true,
          noAutomaticUpstreamStart: true,
          skippedOrMixedRemainsBlocked: false,
          readyForProductionPassEvidenceVerification: true,
        },
        summary: {
          verificationCheckCount: 17,
          productionBlockerCount: 0,
        },
      });
      expect(profile.productionBlockers).toHaveLength(0);
      expect(profile.warnings.map((warning) => warning.code)).toContain("PASS_CAPTURE_VERIFIED");
      expect(profile.warnings.map((warning) => warning.code)).toContain("RELEASE_GATE_ACCEPTS_CAPTURE");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("blocks verification when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-production-pass-verification-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v149 blocked verification");
      const profile = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.verificationState).toBe("blocked");
      expect(profile.readyForProductionPassEvidenceVerification).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("exposes production pass evidence verification routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-production-pass-verification-route-"));
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
          reason: "approve v149 route verification",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-verification?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-verification.v1",
        verificationState: "not-production-pass-evidence",
        readyForProductionPassEvidenceVerification: false,
        verification: {
          captureMode: "skipped",
          releaseGateDecision: "not-production-pass-evidence",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke production pass evidence verification");
      expect(markdown.body).toContain("SKIPPED_OR_MIXED_CAPTURE_REMAINS_BLOCKED");
      expect(markdown.body).toContain("not-production-pass-evidence");
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
    reviewer: "live-probe-production-pass-verification",
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
