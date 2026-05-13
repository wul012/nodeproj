import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createManagedAuditAdapterComplianceProfile,
} from "../src/services/managedAuditAdapterCompliance.js";

describe("managed audit adapter compliance", () => {
  it("runs the compliance harness against a local adapter without claiming production readiness", async () => {
    const profile = await createManagedAuditAdapterComplianceProfile(loadTestConfig());

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-adapter-compliance.v1",
      readyForProductionAudit: false,
      readOnly: true,
      executionAllowed: false,
      harness: {
        adapterName: "InMemoryComplianceAuditAdapter",
        targetInterface: "ManagedAuditAdapter",
        realManagedAdapterConnected: false,
        realDatabaseConnectionAttempted: false,
        auditFileMigrationPerformed: false,
        upstreamActionsEnabled: false,
      },
      sampleEvidence: {
        requestId: "managed-audit-compliance-request",
        queryByRequestIdCount: 1,
        appendOnlyCountAfterWrite: 1,
      },
      checks: {
        adapterInterfaceExercised: true,
        appendOnlyWriteCovered: true,
        queryByRequestIdCovered: true,
        digestStableAfterRepeatRead: true,
        backupRestoreMarkerCovered: true,
        noDatabaseConnectionAttempted: true,
        noAuditFileMigrationPerformed: true,
        realManagedAdapterConnected: false,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        complianceStepCount: 4,
        passedComplianceStepCount: 4,
        productionBlockerCount: 1,
      },
    });
    expect(profile.sampleEvidence.digestBefore).not.toBe(profile.sampleEvidence.digestAfterAppend);
    expect(profile.sampleEvidence.digestAfterAppend).toBe(profile.sampleEvidence.digestAfterRepeatRead);
    expect(profile.sampleEvidence.backupRestoreMarker).toMatch(/^backup-restore-marker:/);
    expect(profile.complianceSteps.map((step) => [step.id, step.passed])).toEqual([
      ["append-only-write", true],
      ["query-by-request-id", true],
      ["digest-stability", true],
      ["backup-restore-marker", true],
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
    ]);
  });

  it("blocks compliance when upstream actions are enabled before production audit exists", async () => {
    const profile = await createManagedAuditAdapterComplianceProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("exposes managed audit adapter compliance routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-managed-compliance-"));
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: path.join(directory, "audit.jsonl"),
      AUDIT_STORE_URL: "managed-audit://contract-only",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-adapter-compliance",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-adapter-compliance?format=markdown",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-compliance.v1",
        checks: {
          appendOnlyWriteCovered: true,
          queryByRequestIdCovered: true,
          digestStableAfterRepeatRead: true,
          backupRestoreMarkerCovered: true,
          noDatabaseConnectionAttempted: true,
          realManagedAdapterConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit adapter compliance");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  });
}
