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
  loadProductionLiveProbeRealReadSmokeReadinessSwitch,
} from "../src/services/productionLiveProbeRealReadSmokeReadinessSwitch.js";

describe("production live probe real-read smoke readiness switch", () => {
  it("keeps the real-read smoke window explicitly closed by default", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-switch-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v142 switch evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeReadinessSwitch({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-readiness-switch.v1",
        switchState: "closed-skipped-evidence",
        readyForSwitchReview: true,
        readyForRealReadSmoke: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        switch: {
          handoffProfileVersion: "production-live-probe-handoff-checklist.v1",
          liveProbeEvidenceMode: "skipped",
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          javaManualStartRequired: true,
          miniKvManualStartRequired: true,
          realReadSmokeRequiresExplicitWindow: true,
          skippedEvidenceNotProductionPass: true,
        },
        checks: {
          handoffChecklistReady: true,
          archiveBundleReady: true,
          upstreamActionsStillDisabled: true,
          probeWindowExplicitlyOpen: false,
          noWriteProbeAllowed: true,
          skippedEvidenceNotProductionPass: true,
          readyForSwitchReview: true,
          readyForRealReadSmoke: false,
        },
        summary: {
          gateCount: 6,
          doneGateCount: 2,
          manualRequiredGateCount: 4,
          blockedGateCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(profile.switch.switchDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.gates.map((gate) => [gate.id, gate.status])).toEqual([
        ["handoff-checklist-ready", "done"],
        ["upstream-actions-disabled", "done"],
        ["operator-start-java", "manual-required"],
        ["operator-start-mini-kv", "manual-required"],
        ["open-read-only-probe-window", "manual-required"],
        ["run-real-read-smoke", "manual-required"],
      ]);
      expect(profile.warnings.map((warning) => warning.code)).toContain("REAL_READ_SMOKE_SWITCH_CLOSED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks the switch when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-switch-actions-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v142 blocked switch evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeReadinessSwitch({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.switchState).toBe("blocked");
      expect(profile.readyForSwitchReview).toBe(false);
      expect(profile.readyForRealReadSmoke).toBe(false);
      expect(profile.checks).toMatchObject({
        upstreamActionsStillDisabled: false,
        noWriteProbeAllowed: false,
      });
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("WRITE_PROBE_NOT_ALLOWED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes readiness switch routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-switch-route-"));
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
          reason: "approve v142 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-readiness-switch",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-readiness-switch?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-readiness-switch.v1",
        switchState: "closed-skipped-evidence",
        readyForSwitchReview: true,
        readyForRealReadSmoke: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke readiness switch");
      expect(markdown.body).toContain("REAL_READ_SMOKE_SWITCH_CLOSED");
      expect(markdown.body).toContain("run-real-read-smoke");
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
    reviewer: "live-probe-switch",
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
