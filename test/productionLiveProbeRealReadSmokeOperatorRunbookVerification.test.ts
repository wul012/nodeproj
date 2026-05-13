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
  loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification,
} from "../src/services/productionLiveProbeRealReadSmokeOperatorRunbookVerification.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("production live probe real-read smoke operator runbook verification", () => {
  it("verifies the default non-pass operator runbook without opening production operations", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-operator-runbook-verification-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v154 operator runbook verification");
      const profile = await loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-operator-runbook-verification.v1",
        verificationState: "verified-operator-runbook",
        readyForOperatorRunbookVerification: true,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        verification: {
          runbookProfileVersion: "production-live-probe-real-read-smoke-operator-runbook.v1",
          runbookState: "ready-for-manual-read-only-window",
          operatorStepCount: 5,
          readOnlyTargetCount: 10,
          forbiddenOperationCount: 7,
          automaticUpstreamStart: false,
          upstreamActionsRequired: false,
          readyForProductionOperations: false,
        },
        checks: {
          sourceRunbookReady: true,
          runbookDigestValid: true,
          runbookDigestMatches: true,
          runbookProfileVersionValid: true,
          sourceArchiveVerificationDigestValid: true,
          sourceArchiveDigestValid: true,
          requiredEnvironmentValid: true,
          operatorStepCountMatches: true,
          operatorStepOrderValid: true,
          operatorStepTitlesPresent: true,
          javaTargetsReadOnlyOnly: true,
          javaTargetsIncludeOpsEvidence: true,
          miniKvTargetsReadOnlyOnly: true,
          miniKvTargetsIncludeSmokeCommands: true,
          forbiddenJavaReplayPostListed: true,
          forbiddenJavaOrderWriteListed: true,
          forbiddenMiniKvWritesListed: true,
          forbiddenUpstreamActionsListed: true,
          forbiddenAutomaticUpstreamStartListed: true,
          noAutomaticUpstreamStart: true,
          upstreamActionsStayDisabled: true,
          readyForProductionOperationsStillFalse: true,
          readyForOperatorRunbookVerification: true,
        },
        summary: {
          verificationCheckCount: 23,
          passedVerificationCheckCount: 23,
          operatorStepCount: 5,
          readOnlyTargetCount: 10,
          forbiddenOperationCount: 7,
          productionBlockerCount: 0,
        },
      });
      expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.verification.runbookDigest).toBe(profile.verification.expectedRunbookDigest);
      expect(profile.verifiedOperatorSteps).toHaveLength(5);
      expect(profile.verifiedOperatorSteps.every((item) => item.verified)).toBe(true);
      expect(profile.verifiedReadOnlyTargets.java.map((item) => item.name)).toContain("GET /api/v1/ops/evidence");
      expect(profile.verifiedReadOnlyTargets.miniKv.map((item) => item.name)).toContain("CHECKJSON GET orderops:1");
      expect(profile.verifiedForbiddenOperations.map((item) => item.name)).toContain("orderops-node: UPSTREAM_ACTIONS_ENABLED=true");
      expect(profile.warnings.map((warning) => warning.code)).toContain("SOURCE_ARCHIVE_NON_PASS");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 30000);

  it("verifies a pass source runbook while production operations remain closed", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-operator-runbook-verification-pass-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_PROBES_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v154 pass operator runbook verification");
      const profile = await loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new PassingOrderPlatformClient(),
        miniKv: new PassingMiniKvClient(),
      });

      expect(profile).toMatchObject({
        verificationState: "verified-operator-runbook",
        readyForOperatorRunbookVerification: true,
        readyForProductionOperations: false,
        checks: {
          runbookDigestMatches: true,
          sourceRunbookReady: true,
          noAutomaticUpstreamStart: true,
          upstreamActionsStayDisabled: true,
          readyForProductionOperationsStillFalse: true,
        },
        artifacts: {
          operatorRunbook: {
            runbookState: "ready-for-manual-read-only-window",
            readyForProductionOperations: false,
          },
        },
      });
      expect(profile.productionBlockers).toHaveLength(0);
      expect(profile.warnings.map((warning) => warning.code)).toContain("SOURCE_ARCHIVE_PASS");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);

  it("blocks verification when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-operator-runbook-verification-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v154 blocked operator runbook verification");
      const profile = await loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.verificationState).toBe("blocked");
      expect(profile.readyForOperatorRunbookVerification).toBe(false);
      expect(profile.checks.sourceRunbookReady).toBe(false);
      expect(profile.checks.upstreamActionsStayDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("SOURCE_RUNBOOK_NOT_READY");
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);

  it("exposes operator runbook verification routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-operator-runbook-verification-route-"));
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
          reason: "approve v154 route operator runbook verification",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-operator-runbook-verification.v1",
        verificationState: "verified-operator-runbook",
        readyForOperatorRunbookVerification: true,
        checks: {
          runbookDigestMatches: true,
          forbiddenAutomaticUpstreamStartListed: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke operator runbook verification");
      expect(markdown.body).toContain("RUNBOOK_VERIFIED");
      expect(markdown.body).toContain("GET /api/v1/ops/evidence");
      expect(markdown.body).toContain("CHECKJSON GET orderops:1");
      expect(markdown.body).toContain("orderops-node: UPSTREAM_ACTIONS_ENABLED=true");
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
    reviewer: "live-probe-operator-runbook-verification",
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
