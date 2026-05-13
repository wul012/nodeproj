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
  loadProductionLiveProbeRealReadSmokeOperatorRunbook,
} from "../src/services/productionLiveProbeRealReadSmokeOperatorRunbook.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("production live probe real-read smoke operator runbook", () => {
  it("creates a manual read-only window runbook from skipped archive verification", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-operator-runbook-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v153 operator runbook");
      const profile = await loadProductionLiveProbeRealReadSmokeOperatorRunbook({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-operator-runbook.v1",
        runbookState: "ready-for-manual-read-only-window",
        readyForOperatorRunbook: true,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        runbook: {
          sourceVerificationState: "verified-non-pass-archive",
          sourceArchiveState: "not-production-pass-evidence-archived",
          sourceCaptureMode: "skipped",
          upstreamEvidenceReady: true,
          requiredEnvironment: {
            UPSTREAM_PROBES_ENABLED: true,
            UPSTREAM_ACTIONS_ENABLED: false,
            ACCESS_GUARD_ENFORCEMENT_ENABLED: true,
            NODE_AUTOMATIC_UPSTREAM_START: false,
            operatorApprovalRequired: true,
          },
          runtimeFileRead: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          skippedOrMixedEvidenceRemainsNonPass: true,
        },
        checks: {
          sourceArchiveVerificationReady: true,
          sourceVerificationDigestValid: true,
          sourceArchiveDigestValid: true,
          upstreamEvidenceReady: true,
          requiredProbeEnvDocumented: true,
          requiredActionsEnvDocumented: true,
          sourceUpstreamActionsStillDisabled: true,
          javaReadOnlyTargetsListed: true,
          miniKvReadOnlyCommandsListed: true,
          forbiddenJavaWritesListed: true,
          forbiddenMiniKvWritesListed: true,
          noAutomaticUpstreamStart: true,
          skippedOrMixedStillNonPass: true,
          readyForProductionOperationsStillFalse: true,
          readyForOperatorRunbook: true,
        },
        summary: {
          operatorStepCount: 5,
          readOnlyTargetCount: 10,
          forbiddenOperationCount: 7,
          runbookCheckCount: 15,
          passedRunbookCheckCount: 15,
          productionBlockerCount: 0,
        },
      });
      expect(profile.runbook.runbookDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.runbook.sourceArchiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.readOnlyTargets.java.map((target) => target.target)).toContain("GET /api/v1/ops/evidence");
      expect(profile.readOnlyTargets.miniKv.map((target) => target.target)).toContain("CHECKJSON GET orderops:1");
      expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("POST /api/v1/failed-events/{id}/replay");
      expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("UPSTREAM_ACTIONS_ENABLED=true");
      expect(profile.operatorSteps[1]?.action).toContain("Operator manually starts Java and mini-kv");
      expect(profile.warnings.map((warning) => warning.code)).toContain("SOURCE_NON_PASS_ARCHIVE_VERIFIED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 30000);

  it("keeps production operations closed when source archive verifies as pass", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-operator-runbook-pass-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_PROBES_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v153 pass operator runbook");
      const profile = await loadProductionLiveProbeRealReadSmokeOperatorRunbook({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new PassingOrderPlatformClient(),
        miniKv: new PassingMiniKvClient(),
      });

      expect(profile).toMatchObject({
        runbookState: "ready-for-manual-read-only-window",
        readyForOperatorRunbook: true,
        readyForProductionOperations: false,
        runbook: {
          sourceVerificationState: "verified-production-pass-archive",
          sourceCaptureMode: "pass",
          upstreamEvidenceReady: true,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
        },
        checks: {
          sourceArchiveVerificationReady: true,
          sourceUpstreamActionsStillDisabled: true,
          readyForProductionOperationsStillFalse: true,
          readyForOperatorRunbook: true,
        },
      });
      expect(profile.productionBlockers).toHaveLength(0);
      expect(profile.warnings.map((warning) => warning.code)).toContain("SOURCE_PASS_ARCHIVE_VERIFIED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);

  it("blocks the runbook when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-operator-runbook-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v153 blocked operator runbook");
      const profile = await loadProductionLiveProbeRealReadSmokeOperatorRunbook({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.runbookState).toBe("blocked");
      expect(profile.readyForOperatorRunbook).toBe(false);
      expect(profile.checks.sourceUpstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("SOURCE_VERIFICATION_BLOCKED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);

  it("exposes operator runbook routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-operator-runbook-route-"));
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
          reason: "approve v153 route operator runbook",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-operator-runbook",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-operator-runbook?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-operator-runbook.v1",
        runbookState: "ready-for-manual-read-only-window",
        readyForOperatorRunbook: true,
        runbook: {
          runtimeFileRead: false,
          automaticUpstreamStart: false,
          requiredEnvironment: {
            UPSTREAM_PROBES_ENABLED: true,
            UPSTREAM_ACTIONS_ENABLED: false,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke operator runbook");
      expect(markdown.body).toContain("GET /api/v1/ops/evidence");
      expect(markdown.body).toContain("CHECKJSON GET orderops:1");
      expect(markdown.body).toContain("POST /api/v1/failed-events/{id}/replay");
      expect(markdown.body).toContain("UPSTREAM_ACTIONS_ENABLED=false");
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
    reviewer: "live-probe-operator-runbook",
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
