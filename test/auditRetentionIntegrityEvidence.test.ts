import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AuditLog, FileBackedAuditStore } from "../src/services/auditLog.js";
import { describeAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  createAuditRetentionIntegrityEvidence,
} from "../src/services/auditRetentionIntegrityEvidence.js";

describe("audit retention integrity evidence", () => {
  it("keeps production audit blocked when retention policy is missing", () => {
    const config = loadTestConfig();
    const report = createAuditRetentionIntegrityEvidence({
      config,
      runtime: describeAuditStoreRuntime(config),
      auditLog: new AuditLog(),
    });

    expect(report).toMatchObject({
      evidenceVersion: "audit-retention-integrity-evidence.v1",
      readyForProductionAudit: false,
      readOnly: true,
      executionAllowed: false,
      runtime: {
        runtimeStoreKind: "memory",
        durableAtRuntime: false,
      },
      retentionPolicy: {
        retentionDays: 0,
        maxFileBytes: 0,
        rotationEnabled: false,
        backupEnabled: false,
        managedStoreConfigured: false,
        deletesOrRotatesFiles: false,
      },
      checks: {
        fileRuntimeSelected: false,
        retentionDaysConfigured: false,
        maxFileBytesConfigured: false,
        rotationPolicyConfigured: false,
        backupPolicyConfigured: false,
        managedStoreConfigured: false,
        integrityDigestStable: true,
      },
    });
    expect(report.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "AUDIT_FILE_RUNTIME_NOT_SELECTED",
      "AUDIT_RETENTION_DAYS_MISSING",
      "AUDIT_MAX_FILE_BYTES_MISSING",
      "AUDIT_ROTATION_POLICY_MISSING",
      "AUDIT_BACKUP_POLICY_MISSING",
      "MANAGED_AUDIT_STORE_MISSING",
    ]));
  });

  it("creates stable file audit integrity digest when local retention knobs are configured", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-audit-retention-"));
    const auditPath = path.join(directory, "audit.jsonl");

    try {
      const config = loadTestConfig({
        AUDIT_STORE_KIND: "file",
        AUDIT_STORE_PATH: auditPath,
        AUDIT_RETENTION_DAYS: "30",
        AUDIT_MAX_FILE_BYTES: "1048576",
        AUDIT_ROTATION_ENABLED: "true",
        AUDIT_BACKUP_ENABLED: "true",
      });
      const runtime = describeAuditStoreRuntime(config);
      const auditLog = new AuditLog({ capacity: runtime.capacity, store: new FileBackedAuditStore(auditPath, runtime.capacity) });
      auditLog.record({
        requestId: "req-retention",
        method: "GET",
        path: "/api/v1/audit/retention-integrity-evidence",
        statusCode: 200,
        durationMs: 3,
      });

      const report = createAuditRetentionIntegrityEvidence({ config, runtime, auditLog });

      expect(report.checks).toMatchObject({
        fileRuntimeSelected: true,
        retentionDaysConfigured: true,
        maxFileBytesConfigured: true,
        rotationPolicyConfigured: true,
        backupPolicyConfigured: true,
        managedStoreConfigured: false,
        integrityDigestStable: true,
        readOnlyEvidenceOnly: true,
      });
      expect(report.integrity).toMatchObject({
        eventCount: 1,
        digestStable: true,
        fileLineCount: 1,
      });
      expect(report.integrity.canonicalEventDigest).toBe(report.integrity.repeatedCanonicalEventDigest);
      expect(report.integrity.canonicalEventDigest).toMatch(/^sha256:/);
      expect(report.integrity.fileDigest).toMatch(/^sha256:/);
      expect(report.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "MANAGED_AUDIT_STORE_MISSING",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes audit retention integrity evidence routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-audit-retention-route-"));
    const auditPath = path.join(directory, "audit.jsonl");
    const app = await buildApp(loadTestConfig({
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: auditPath,
      AUDIT_RETENTION_DAYS: "30",
      AUDIT_MAX_FILE_BYTES: "1048576",
      AUDIT_ROTATION_ENABLED: "true",
      AUDIT_BACKUP_ENABLED: "true",
    }));

    try {
      await app.inject({
        method: "GET",
        url: "/health",
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/retention-integrity-evidence",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/retention-integrity-evidence?format=markdown",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        checks: {
          fileRuntimeSelected: true,
          retentionDaysConfigured: true,
          maxFileBytesConfigured: true,
          rotationPolicyConfigured: true,
          backupPolicyConfigured: true,
          integrityDigestStable: true,
        },
        readyForProductionAudit: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Audit retention integrity evidence");
      expect(markdown.body).toContain("MANAGED_AUDIT_STORE_MISSING");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadTestConfig(overrides: NodeJS.ProcessEnv = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ...overrides,
  });
}
