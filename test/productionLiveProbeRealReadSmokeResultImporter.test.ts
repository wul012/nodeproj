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
  loadProductionLiveProbeRealReadSmokeResultImporter,
} from "../src/services/productionLiveProbeRealReadSmokeResultImporter.js";

describe("production live probe real-read smoke result importer", () => {
  it("imports skipped smoke adapter records into a schema-backed envelope", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-result-importer-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v145 result importer evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeResultImporter({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-result-importer.v1",
        readyForResultImport: true,
        readyForProductionPassEvidence: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        importEnvelope: {
          resultSchemaVersion: "real-read-smoke-result-import.v1",
          sourceAdapterMode: "skipped",
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          importedRecordCount: 5,
          passRecordCount: 0,
          skippedRecordCount: 5,
          rejectedRecordCount: 0,
          skippedEvidenceNotProductionPass: true,
        },
        importSchema: {
          requiredReadOnly: true,
          requiredMutatesState: false,
        },
        checks: {
          executionRequestReviewReady: true,
          sourceArchiveAdapterReady: true,
          sourceArchiveAdapterDigestValid: true,
          sourceRecordsPresent: true,
          recordSetMatchesSchema: true,
          noBlockedRecordsImported: true,
          noWriteEvidenceImported: true,
          upstreamActionsStillDisabled: true,
          skippedEvidenceNotProductionPass: true,
          readyForResultImport: true,
        },
        summary: {
          importedRecordCount: 5,
          acceptedPassRecordCount: 0,
          acceptedSkippedRecordCount: 5,
          rejectedRecordCount: 0,
          productionBlockerCount: 0,
        },
      });
      expect(profile.importEnvelope.importDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.importEnvelope.sourceExecutionRequestDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.importEnvelope.sourceArchiveAdapterDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.importedRecords.every((record) => record.importStatus === "accepted-skipped")).toBe(true);
      expect(profile.importSchema.supportedProbeIds).toEqual([
        "java-actuator-health",
        "java-ops-overview",
        "mini-kv-health",
        "mini-kv-infojson",
        "mini-kv-statsjson",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("blocks result import when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-result-importer-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v145 blocked importer evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeResultImporter({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.readyForResultImport).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 10000);

  it("exposes result importer routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-result-importer-route-"));
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
          reason: "approve v145 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-result-importer",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-result-importer?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-result-importer.v1",
        readyForResultImport: true,
        importEnvelope: {
          sourceAdapterMode: "skipped",
          importedRecordCount: 5,
          skippedRecordCount: 5,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke result importer");
      expect(markdown.body).toContain("ADD_REAL_READ_SMOKE_RELEASE_EVIDENCE_GATE_NEXT");
      expect(markdown.body).toContain("accepted-skipped");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 10000);
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
    reviewer: "live-probe-result-importer",
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
