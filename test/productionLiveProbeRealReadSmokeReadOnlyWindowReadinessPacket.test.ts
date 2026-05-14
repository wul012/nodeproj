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
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket,
} from "../src/services/productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("production live probe real-read smoke read-only window readiness packet", () => {
  it("packages archive verification, runbook, and runbook verification into a manual review packet", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-readiness-packet-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v155 readiness packet");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
        packetState: "ready-for-manual-read-only-window-review",
        readyForReadOnlyWindowReview: true,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        packet: {
          runbookVerificationState: "verified-operator-runbook",
          sourceArchiveVerificationState: "verified-non-pass-archive",
          requiredManualJavaStart: true,
          requiredManualMiniKvStart: true,
          requiredUpstreamProbesEnabled: true,
          requiredUpstreamActionsEnabled: false,
          automaticUpstreamStart: false,
          skippedWithoutUpstreamsOnly: true,
          skippedOrMixedEvidenceCannotPass: true,
          runtimeFileRead: false,
        },
        checks: {
          runbookVerificationReady: true,
          runbookVerificationDigestValid: true,
          runbookDigestValid: true,
          archiveVerificationDigestValid: true,
          digestChainComplete: true,
          sourceArchiveVerificationReady: true,
          sourceRunbookReady: true,
          manualJavaStartRequired: true,
          manualMiniKvStartRequired: true,
          upstreamProbesRequirementDocumented: true,
          upstreamActionsStayDisabled: true,
          noAutomaticUpstreamStart: true,
          skippedWithoutUpstreamsOnly: true,
          skippedOrMixedNotProductionPass: true,
          readyForProductionOperationsStillFalse: true,
          readyForReadOnlyWindowReview: true,
        },
        summary: {
          packetCheckCount: 16,
          passedPacketCheckCount: 16,
          evidenceDigestCount: 3,
          operatorRequirementCount: 6,
          reviewStepCount: 5,
          productionBlockerCount: 0,
        },
      });
      expect(profile.packet.readinessPacketDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.packet.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.packet.runbookDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.packet.runbookVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.evidenceChain.map((item) => item.name)).toEqual([
        "v152 archive verification",
        "v153 operator runbook",
        "v154 operator runbook verification",
      ]);
      expect(profile.operatorWindowRequirements.map((item) => item.code)).toContain("MANUAL_JAVA_START");
      expect(profile.operatorWindowRequirements.map((item) => item.code)).toContain("SKIPPED_OR_MIXED_NOT_PRODUCTION_PASS");
      expect(profile.reviewSteps).toHaveLength(5);
      expect(profile.warnings.map((warning) => warning.code)).toContain("SOURCE_ARCHIVE_NON_PASS");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("keeps the packet review-only when source archive verifies as pass", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-readiness-packet-pass-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_PROBES_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v155 pass readiness packet");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new PassingOrderPlatformClient(),
        miniKv: new PassingMiniKvClient(),
      });

      expect(profile).toMatchObject({
        packetState: "ready-for-manual-read-only-window-review",
        readyForReadOnlyWindowReview: true,
        readyForProductionOperations: false,
        packet: {
          runbookVerificationState: "verified-operator-runbook",
          sourceArchiveVerificationState: "verified-production-pass-archive",
          automaticUpstreamStart: false,
          requiredUpstreamActionsEnabled: false,
        },
        checks: {
          digestChainComplete: true,
          noAutomaticUpstreamStart: true,
          upstreamActionsStayDisabled: true,
          readyForProductionOperationsStillFalse: true,
        },
      });
      expect(profile.productionBlockers).toHaveLength(0);
      expect(profile.warnings.map((warning) => warning.code)).toContain("SOURCE_ARCHIVE_PASS");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("blocks the packet when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-readiness-packet-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v155 blocked readiness packet");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.packetState).toBe("blocked");
      expect(profile.readyForReadOnlyWindowReview).toBe(false);
      expect(profile.checks.runbookVerificationReady).toBe(false);
      expect(profile.checks.upstreamActionsStayDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("RUNBOOK_VERIFICATION_NOT_READY");
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("exposes readiness packet routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-readiness-packet-route-"));
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
          reason: "approve v155 route readiness packet",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
        packetState: "ready-for-manual-read-only-window-review",
        readyForReadOnlyWindowReview: true,
        packet: {
          requiredManualJavaStart: true,
          requiredManualMiniKvStart: true,
          automaticUpstreamStart: false,
        },
        checks: {
          digestChainComplete: true,
          skippedOrMixedNotProductionPass: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke read-only window readiness packet");
      expect(markdown.body).toContain("v152 archive verification");
      expect(markdown.body).toContain("MANUAL_JAVA_START");
      expect(markdown.body).toContain("SKIPPED_OR_MIXED_NOT_PRODUCTION_PASS");
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
    reviewer: "live-probe-readiness-packet",
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
