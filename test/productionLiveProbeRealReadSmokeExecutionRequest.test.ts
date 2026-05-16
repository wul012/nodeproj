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
  loadProductionLiveProbeRealReadSmokeExecutionRequest,
} from "../src/services/productionLiveProbeRealReadSmokeExecutionRequest.js";

describe("production live probe real-read smoke execution request", () => {
  it("creates a draft operator-reviewed execution request without starting upstreams", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-execution-request-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v144 execution request evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeExecutionRequest({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-execution-request.v1",
        requestState: "draft-review",
        readyForOperatorReview: true,
        readyForExecutionWindow: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        request: {
          sourceArchiveAdapterMode: "skipped",
          currentUpstreamProbesEnabled: false,
          currentUpstreamActionsEnabled: false,
          requiredUpstreamProbesEnabled: true,
          requiredUpstreamActionsEnabled: false,
          javaManualStartRequired: true,
          miniKvManualStartRequired: true,
          startsJavaAutomatically: false,
          startsMiniKvAutomatically: false,
          mutatesUpstreamState: false,
        },
        requiredEnvironment: {
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "false",
        },
        checks: {
          sourceArchiveAdapterReady: true,
          sourceArchiveAdapterDigestValid: true,
          upstreamActionsStillDisabled: true,
          probeWindowExplicitlyOpen: false,
          startsNoUpstreamsAutomatically: true,
          forbidsWriteActions: true,
          readyForOperatorReview: true,
          readyForExecutionWindow: false,
        },
        summary: {
          allowedProbeCount: 5,
          forbiddenActionCount: 6,
          commandStepCount: 6,
          manualCommandStepCount: 3,
          nodeCommandStepCount: 3,
          productionBlockerCount: 0,
        },
      });
      expect(profile.request.requestDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.request.sourceArchiveAdapterDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.allowedReadOnlyProbes.map((probe) => probe.id)).toEqual([
        "java-actuator-health",
        "java-ops-overview",
        "mini-kv-health",
        "mini-kv-infojson",
        "mini-kv-statsjson",
      ]);
      expect(profile.forbiddenActions.map((action) => action.id)).toContain("upstream-actions-enabled");
      expect(profile.operatorCommandProfile.map((step) => [step.id, step.status])).toEqual([
        ["review-source-adapter", "ready"],
        ["start-java-manually", "manual-required"],
        ["start-mini-kv-manually", "manual-required"],
        ["set-read-only-probe-env", "manual-required"],
        ["run-node-smoke-harness", "manual-required"],
        ["capture-archive-adapter", "manual-required"],
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks the request when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-execution-request-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v144 blocked execution request evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeExecutionRequest({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.requestState).toBe("blocked");
      expect(profile.readyForOperatorReview).toBe(false);
      expect(profile.readyForExecutionWindow).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
      expect(profile.operatorCommandProfile.find((step) => step.id === "set-read-only-probe-env")?.status).toBe("blocked");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);

  it("exposes execution request routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-execution-request-route-"));
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
          reason: "approve v144 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-execution-request",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-execution-request?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-execution-request.v1",
        requestState: "draft-review",
        readyForOperatorReview: true,
        readyForExecutionWindow: false,
        requiredEnvironment: {
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "false",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke execution request");
      expect(markdown.body).toContain("ADD_REAL_READ_SMOKE_RESULT_IMPORTER_NEXT");
      expect(markdown.body).toContain("UPSTREAM_PROBES_ENABLED");
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
    reviewer: "live-probe-execution-request",
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
