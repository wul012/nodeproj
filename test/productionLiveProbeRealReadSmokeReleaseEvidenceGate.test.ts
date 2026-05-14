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
  loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate,
} from "../src/services/productionLiveProbeRealReadSmokeReleaseEvidenceGate.js";

describe("production live probe real-read smoke release evidence gate", () => {
  it("keeps skipped imported records out of production pass evidence", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-release-gate-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v146 release gate evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1",
        gateDecision: "not-production-pass-evidence",
        readyForReleaseEvidenceGate: true,
        readyForProductionPassEvidence: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        gate: {
          sourceImportSchemaVersion: "real-read-smoke-result-import.v1",
          sourceAdapterMode: "skipped",
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          importedRecordCount: 5,
          passRecordCount: 0,
          skippedRecordCount: 5,
          rejectedRecordCount: 0,
          productionPassRequiresAllPass: true,
          productionPassRequiresProbeWindowOpen: true,
          productionPassRequiresActionsDisabled: true,
        },
        checks: {
          resultImporterReady: true,
          importDigestValid: true,
          allExpectedRecordsImported: true,
          allImportedRecordsAccepted: true,
          allImportedRecordsPass: false,
          noSkippedRecords: false,
          noRejectedRecords: true,
          noWriteEvidenceImported: true,
          probeWindowWasOpen: false,
          upstreamActionsStillDisabled: true,
          readyForReleaseEvidenceGate: true,
          readyForProductionPassEvidence: false,
        },
        summary: {
          evaluatedRecordCount: 5,
          passRecordCount: 0,
          skippedRecordCount: 5,
          rejectedRecordCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(profile.gate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.gate.sourceImportDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.evaluatedRecords.every((record) => record.gateStatus === "not-pass-skipped")).toBe(true);
      expect(profile.warnings.map((warning) => warning.code)).toContain("REAL_READ_SMOKE_NOT_PRODUCTION_PASS_EVIDENCE");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("blocks release evidence gate when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-release-gate-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v146 blocked release gate evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeReleaseEvidenceGate({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.gateDecision).toBe("blocked");
      expect(profile.readyForReleaseEvidenceGate).toBe(false);
      expect(profile.readyForProductionPassEvidence).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);

  it("exposes release evidence gate routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-release-gate-route-"));
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
          reason: "approve v146 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-release-evidence-gate?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-release-evidence-gate.v1",
        gateDecision: "not-production-pass-evidence",
        readyForReleaseEvidenceGate: true,
        readyForProductionPassEvidence: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke release evidence gate");
      expect(markdown.body).toContain("REAL_READ_SMOKE_NOT_PRODUCTION_PASS_EVIDENCE");
      expect(markdown.body).toContain("not-pass-skipped");
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
    reviewer: "live-probe-release-evidence-gate",
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
