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
  loadProductionLiveProbeHandoffChecklist,
} from "../src/services/productionLiveProbeHandoffChecklist.js";

describe("production live probe handoff checklist", () => {
  it("turns the live probe archive bundle into an operator handoff checklist", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-handoff-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      const changeRequest = await loadProductionConnectionDryRunChangeRequest({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      await ledger.create({
        decision: "approve",
        reviewer: "live-probe-handoff",
        reason: "approve v141 handoff evidence",
        changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      }, {
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
      });
      const checklist = await loadProductionLiveProbeHandoffChecklist({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(checklist).toMatchObject({
        profileVersion: "production-live-probe-handoff-checklist.v1",
        readyForOperatorHandoff: true,
        readyForRealReadSmoke: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        handoff: {
          bundleProfileVersion: "production-live-probe-evidence-archive-bundle.v1",
          liveProbeEvidenceMode: "skipped",
          plannedProbeCount: 5,
          skippedProbeCount: 5,
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          requiresJavaManualStart: true,
          requiresMiniKvManualStart: true,
          skippedEvidenceNotProductionPass: true,
        },
        checks: {
          archiveBundleReady: true,
          sourceEvidenceFilesReady: true,
          noWriteProbeAttempted: true,
          upstreamActionsStillDisabled: true,
          skippedEvidenceNotProductionPass: true,
          realReadSmokeRequiresManualWindow: true,
          readyForOperatorHandoff: true,
          readyForRealReadSmoke: false,
        },
        summary: {
          stepCount: 7,
          doneStepCount: 2,
          manualRequiredStepCount: 5,
          blockedStepCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(checklist.handoff.bundleDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(checklist.checklist.map((step) => [step.id, step.status])).toEqual([
        ["archive-bundle-ready", "done"],
        ["confirm-read-only-scope", "done"],
        ["manual-start-java", "manual-required"],
        ["manual-start-mini-kv", "manual-required"],
        ["enable-probe-window", "manual-required"],
        ["run-real-read-smoke", "manual-required"],
        ["archive-real-read-result", "manual-required"],
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks handoff when the live probe bundle is not ready", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-handoff-missing-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      const checklist = await loadProductionLiveProbeHandoffChecklist({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: new ProductionConnectionDryRunApprovalLedger(),
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(checklist.readyForOperatorHandoff).toBe(false);
      expect(checklist.checks).toMatchObject({
        archiveBundleReady: false,
        sourceEvidenceFilesReady: true,
        noWriteProbeAttempted: true,
        upstreamActionsStillDisabled: true,
        skippedEvidenceNotProductionPass: true,
      });
      expect(checklist.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "LIVE_PROBE_BUNDLE_NOT_READY",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes handoff checklist routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-handoff-route-"));
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
          reason: "approve v141 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-handoff-checklist",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-handoff-checklist?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-handoff-checklist.v1",
        readyForOperatorHandoff: true,
        readyForRealReadSmoke: false,
        handoff: {
          liveProbeEvidenceMode: "skipped",
          requiresJavaManualStart: true,
          requiresMiniKvManualStart: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe operator handoff checklist");
      expect(markdown.body).toContain("manual-start-java");
      expect(markdown.body).toContain("HANDOFF_STILL_SKIPPED_EVIDENCE");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 10000);
});

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
