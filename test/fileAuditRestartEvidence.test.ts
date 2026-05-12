import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { describeAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  createFileAuditRestartEvidenceReport,
} from "../src/services/fileAuditRestartEvidence.js";

describe("file audit restart evidence", () => {
  it("verifies file runtime can restore a synthetic audit event", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-file-audit-evidence-"));
    const filePath = path.join(directory, "audit.jsonl");

    try {
      const runtime = describeAuditStoreRuntime({
        auditStoreKind: "file",
        auditStorePath: filePath,
        auditStoreUrl: "",
      });
      const report = createFileAuditRestartEvidenceReport({
        config: {
          auditStoreKind: "file",
          auditStorePath: filePath,
          auditStoreUrl: "",
        },
        runtime,
      });

      expect(report).toMatchObject({
        service: "orderops-node",
        evidenceVersion: "file-audit-restart-evidence.v1",
        readyForProductionAudit: false,
        readOnly: true,
        executionAllowed: false,
        runtime: {
          runtimeStoreKind: "file",
          storeImplementation: "FileBackedAuditStore",
          durableAtRuntime: true,
          configuredByEnvironment: true,
          auditStorePath: filePath,
        },
        rehearsal: {
          mode: "file-runtime-reload",
          writesSyntheticEvent: true,
          writtenEventCount: 1,
          recoveryVerified: true,
        },
        checks: {
          fileRuntimeSelected: true,
          filePathConfigured: true,
          syntheticWriteRecorded: true,
          restoredEventPresent: true,
          digestChangedAfterWrite: true,
          digestStableAfterRestore: true,
          productionAuditStillBlocked: true,
        },
        summary: {
          productionBlockerCount: 2,
        },
      });
      expect(report.rehearsal.restoredRequestIds).toContain(report.rehearsal.expectedRequestId);
      expect(report.productionBlockers.map((blocker) => blocker.code)).toEqual([
        "MANAGED_AUDIT_STORE_MISSING",
        "AUDIT_RETENTION_POLICY_MISSING",
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("does not claim memory runtime has restart recovery evidence", () => {
    const runtime = describeAuditStoreRuntime({
      auditStoreKind: "memory",
      auditStorePath: "",
      auditStoreUrl: "",
    });
    const report = createFileAuditRestartEvidenceReport({
      config: {
        auditStoreKind: "memory",
        auditStorePath: "",
        auditStoreUrl: "",
      },
      runtime,
    });

    expect(report.runtime.runtimeStoreKind).toBe("memory");
    expect(report.rehearsal).toMatchObject({
      mode: "memory-runtime-skip",
      writesSyntheticEvent: false,
      writtenEventCount: 0,
      restoredEventCount: 0,
      recoveryVerified: false,
    });
    expect(report.checks).toMatchObject({
      fileRuntimeSelected: false,
      filePathConfigured: false,
      restoredEventPresent: false,
      memoryRuntimeNotClaimedDurable: true,
      productionAuditStillBlocked: true,
    });
  });

  it("exposes file audit restart evidence routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-file-audit-route-"));
    const filePath = path.join(directory, "audit.jsonl");
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: filePath,
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/file-restart-evidence",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/file-restart-evidence?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        evidenceVersion: "file-audit-restart-evidence.v1",
        readyForProductionAudit: false,
        runtime: {
          runtimeStoreKind: "file",
        },
        rehearsal: {
          recoveryVerified: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# File audit restart evidence");
      expect(markdown.body).toContain("MANAGED_AUDIT_STORE_MISSING");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});
