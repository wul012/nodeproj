import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  createManagedAuditReadinessSummary,
} from "../src/services/managedAuditReadinessSummary.js";

describe("managed audit readiness summary", () => {
  it("summarizes local evidence while keeping the real managed adapter as a production blocker", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-managed-audit-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);

    try {
      runtime.auditLog.record({
        requestId: "req-managed-summary",
        method: "GET",
        path: "/api/v1/audit/managed-readiness-summary",
        statusCode: 200,
        durationMs: 4,
      });

      const summary = createManagedAuditReadinessSummary({
        config,
        runtime: runtime.description,
        auditLog: runtime.auditLog,
      });

      expect(summary).toMatchObject({
        summaryVersion: "managed-audit-readiness-summary.v1",
        readyForProductionAudit: false,
        readOnly: true,
        executionAllowed: false,
        runtime: {
          requestedStoreKind: "file",
          runtimeStoreKind: "file",
          durableAtRuntime: true,
          auditStoreUrlConfigured: true,
          realManagedAdapterConnected: false,
          fakeAdapterUsed: true,
          fileAuditStillRehearsal: true,
        },
        evidenceInputs: {
          managedAuditStoreContractVersion: "managed-audit-store-contract.v1",
          auditRetentionIntegrityEvidenceVersion: "audit-retention-integrity-evidence.v1",
          managedCapabilityCount: 5,
          fileAuditEventCount: 1,
        },
        checks: {
          fakeAdapterCapabilitiesCovered: true,
          fileAuditRuntimeSelected: true,
          fileAuditIntegrityStable: true,
          retentionKnobsConfigured: true,
          backupRotationConfigured: true,
          managedStoreUrlConfigured: true,
          realManagedAdapterConnected: false,
          localEvidenceReadyForAdapterWork: true,
          readyForProductionAudit: false,
        },
        summary: {
          completedChecklistCount: 3,
          pendingChecklistCount: 2,
          productionBlockerCount: 1,
        },
      });
      expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("reports missing local readiness inputs before managed adapter work", () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    });
    const runtime = createAuditStoreRuntime(config);
    const summary = createManagedAuditReadinessSummary({
      config,
      runtime: runtime.description,
      auditLog: runtime.auditLog,
    });

    expect(summary.checks).toMatchObject({
      fileAuditRuntimeSelected: false,
      retentionKnobsConfigured: false,
      backupRotationConfigured: false,
      managedStoreUrlConfigured: false,
      realManagedAdapterConnected: false,
      readyForProductionAudit: false,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "AUDIT_RETENTION_KNOBS_MISSING",
      "AUDIT_BACKUP_ROTATION_MISSING",
      "MANAGED_AUDIT_STORE_URL_MISSING",
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
    ]));
  });

  it("exposes managed audit readiness summary routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-managed-audit-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-readiness-summary",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-readiness-summary?format=markdown",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryVersion: "managed-audit-readiness-summary.v1",
        checks: {
          fakeAdapterCapabilitiesCovered: true,
          fileAuditRuntimeSelected: true,
          managedStoreUrlConfigured: true,
          realManagedAdapterConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit readiness summary");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadTestConfig(auditStorePath: string) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
  });
}
