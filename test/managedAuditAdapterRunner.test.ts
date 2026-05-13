import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createManagedAuditAdapterRunnerProfile,
} from "../src/services/managedAuditAdapterRunner.js";

describe("managed audit adapter harness runner", () => {
  it("runs the same compliance steps against memory and file-candidate targets", async () => {
    const profile = await createManagedAuditAdapterRunnerProfile(loadTestConfig());

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-adapter-runner.v1",
      readyForProductionAudit: false,
      readOnly: true,
      executionAllowed: false,
      runner: {
        targetInterface: "ManagedAuditAdapter",
        targetKinds: ["memory", "file-candidate"],
        realManagedAdapterConnected: false,
        realDatabaseConnectionAttempted: false,
        auditFileMigrationPerformed: false,
        upstreamActionsEnabled: false,
      },
      checks: {
        memoryRunnerPasses: true,
        fileCandidateRunnerPasses: true,
        allRunnerTargetsPass: true,
        noDatabaseConnectionAttempted: true,
        noAuditFileMigrationPerformed: true,
        realManagedAdapterConnected: false,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        targetCount: 2,
        passedTargetCount: 2,
        productionBlockerCount: 1,
      },
    });
    expect(profile.targetResults.map((target) => [target.targetKind, target.passed])).toEqual([
      ["memory", true],
      ["file-candidate", true],
    ]);
    expect(profile.targetResults.flatMap((target) => target.steps.map((step) => step.id))).toEqual([
      "append-only-write",
      "query-by-request-id",
      "digest-stability",
      "backup-restore-marker",
      "append-only-write",
      "query-by-request-id",
      "digest-stability",
      "backup-restore-marker",
    ]);
    expect(profile.targetResults.find((target) => target.targetKind === "file-candidate")).toMatchObject({
      temporaryFileUsed: true,
      temporaryFileCleanedUp: true,
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
    ]);
  });

  it("blocks the runner when upstream actions are enabled before production storage exists", async () => {
    const profile = await createManagedAuditAdapterRunnerProfile(loadConfig({
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

  it("exposes managed audit adapter runner routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-adapter-runner",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-adapter-runner?format=markdown",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-runner.v1",
        checks: {
          memoryRunnerPasses: true,
          fileCandidateRunnerPasses: true,
          allRunnerTargetsPass: true,
          realManagedAdapterConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit adapter harness runner");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
    } finally {
      await app.close();
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
