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
  loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification,
} from "../src/services/productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("production live probe real-read smoke production pass evidence archive verification", () => {
  it("verifies skipped archive as non-pass with Java v49 and mini-kv v58 evidence references", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-production-pass-archive-verification-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v152 skipped archive verification");
      const profile = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive-verification.v1",
        verificationState: "verified-non-pass-archive",
        readyForArchiveVerification: true,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        verification: {
          archiveState: "not-production-pass-evidence-archived",
          captureMode: "skipped",
          archivedAsProductionPassEvidence: false,
          upstreamEvidenceReady: true,
          upstreamEvidenceReferenceMode: "static-version-reference",
          runtimeFileRead: false,
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          readOnlyWindowOpen: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
        },
        checks: {
          archiveDigestValid: true,
          archiveDigestMatches: true,
          archiveProfileVersionValid: true,
          archiveReadyForVerification: true,
          archiveChecksAllPassed: true,
          archiveProductionBlockersClear: true,
          skippedOrMixedRemainsNonPass: true,
          upstreamActionsStillDisabled: true,
          noAutomaticUpstreamStart: true,
          readyForProductionOperationsStillFalse: true,
          javaV49EvidenceReferenceReady: true,
          miniKvV58EvidenceReferenceReady: true,
          upstreamEvidenceReady: true,
          readyForArchiveVerification: true,
        },
        artifacts: {
          javaEvidence: {
            project: "advanced-order-platform",
            plannedVersion: "Java v49",
            tag: "v49订单平台ops-read-only-evidence-sample",
            readOnly: true,
            executionAllowed: false,
            productionPassEvidence: false,
            runtimeFileRead: false,
          },
          miniKvEvidence: {
            project: "mini-kv",
            plannedVersion: "mini-kv v58",
            tag: "第五十八版只读证据样本包",
            readOnly: true,
            executionAllowed: false,
            productionPassEvidence: false,
            runtimeFileRead: false,
          },
        },
        summary: {
          verificationCheckCount: 14,
          passedVerificationCheckCount: 14,
          productionBlockerCount: 0,
        },
      });
      expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.verification.archiveDigest).toBe(profile.verification.expectedArchiveDigest);
      expect(profile.artifacts.javaEvidence.samplePaths).toContain("/contracts/ops-read-only-evidence.sample.json");
      expect(profile.artifacts.miniKvEvidence.samplePaths).toContain("fixtures/readonly/index.json");
      expect(profile.warnings.map((warning) => warning.code)).toContain("NON_PASS_ARCHIVE_VERIFIED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("verifies all-pass archive without unlocking production operations", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-production-pass-archive-verification-pass-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_PROBES_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v152 pass archive verification");
      const profile = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new PassingOrderPlatformClient(),
        miniKv: new PassingMiniKvClient(),
      });

      expect(profile).toMatchObject({
        verificationState: "verified-production-pass-archive",
        readyForArchiveVerification: true,
        readyForProductionOperations: false,
        verification: {
          archiveState: "production-pass-evidence-archived",
          captureMode: "pass",
          archivedAsProductionPassEvidence: true,
          upstreamEvidenceReady: true,
          upstreamActionsEnabled: false,
          readOnlyWindowOpen: true,
        },
        checks: {
          archiveDigestMatches: true,
          skippedOrMixedRemainsNonPass: true,
          upstreamEvidenceReady: true,
          readyForProductionOperationsStillFalse: true,
          readyForArchiveVerification: true,
        },
      });
      expect(profile.productionBlockers).toHaveLength(0);
      expect(profile.warnings.map((warning) => warning.code)).toContain("PASS_ARCHIVE_VERIFIED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("blocks verification when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-production-pass-archive-verification-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v152 blocked archive verification");
      const profile = await loadProductionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.verificationState).toBe("blocked");
      expect(profile.readyForArchiveVerification).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("exposes archive verification routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-production-pass-archive-verification-route-"));
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
          reason: "approve v152 route archive verification",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-production-pass-evidence-archive-verification.v1",
        verificationState: "verified-non-pass-archive",
        readyForArchiveVerification: true,
        verification: {
          upstreamEvidenceReady: true,
          runtimeFileRead: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke production pass evidence archive verification");
      expect(markdown.body).toContain("v49订单平台ops-read-only-evidence-sample");
      expect(markdown.body).toContain("第五十八版只读证据样本包");
      expect(markdown.body).toContain("verified-non-pass-archive");
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
    reviewer: "live-probe-production-pass-archive-verification",
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
