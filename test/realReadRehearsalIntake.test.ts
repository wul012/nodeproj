import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { loadRealReadRehearsalIntake } from "../src/services/realReadRehearsalIntake.js";

describe("real-read rehearsal intake", () => {
  it("combines Java v66 and mini-kv v75 as a read-only intake without executing upstreams", () => {
    const profile = loadRealReadRehearsalIntake(loadTestConfig("memory://real-read-rehearsal-intake"));

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "real-read-rehearsal-intake.v1",
      intakeState: "ready-for-real-read-rehearsal-review",
      readyForRealReadRehearsalReview: true,
      readyForApprovalDecision: false,
      readyForApprovalLedgerWrite: false,
      readyForProductionRelease: false,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readyForProductionRestore: false,
      readOnly: true,
      rehearsalOnly: true,
      executionAllowed: false,
      intake: {
        javaRehearsalVersion: "java-release-approval-rehearsal.v1",
        javaEndpoint: "/api/v1/ops/release-approval-rehearsal",
        javaRehearsalMode: "READ_ONLY_RELEASE_APPROVAL_REHEARSAL",
        miniKvSmokeManifestVersion: "mini-kv-restore-boundary-smoke-manifest.v1",
        miniKvProjectVersion: "0.75.0",
        miniKvSmokeManifestId: "mini-kv-restore-boundary-smoke-v75",
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        approvalDecisionCreated: false,
        approvalLedgerWritten: false,
        releaseExecuted: false,
        rollbackExecuted: false,
        restoreExecuted: false,
      },
      checks: {
        javaV66ReleaseApprovalRehearsalReady: true,
        javaRehearsalEndpointKnown: true,
        javaRehearsalReadOnly: true,
        javaExecutionBlocked: true,
        javaLiveSignalsPresent: true,
        javaRealReplayStillBlocked: true,
        javaNodeConsumptionSafe: true,
        javaProductionBoundariesClosed: true,
        miniKvV75RestoreBoundarySmokeManifestReady: true,
        miniKvSmokeManifestVersionReady: true,
        miniKvReadOnly: true,
        miniKvExecutionBlocked: true,
        miniKvNotOrderAuthoritative: true,
        miniKvSmokeCommandsReadOnly: true,
        miniKvNodeConsumptionReady: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        noApprovalDecisionCreated: true,
        noApprovalLedgerWrite: true,
        noReleaseExecution: true,
        noRollbackExecution: true,
        noRollbackSqlExecution: true,
        noRestoreExecution: true,
        readyForRealReadRehearsalReview: true,
      },
      artifacts: {
        javaReleaseApprovalRehearsal: {
          plannedVersion: "Java v66",
          rehearsalVersion: "java-release-approval-rehearsal.v1",
          readOnly: true,
          executionAllowed: false,
          executionBoundaries: {
            nodeMayConsume: true,
            nodeMayCreateApprovalDecision: false,
            nodeMayWriteApprovalLedger: false,
            nodeMayTriggerDeployment: false,
            nodeMayTriggerRollback: false,
            nodeMayExecuteRollbackSql: false,
          },
        },
        miniKvRestoreBoundarySmokeManifest: {
          plannedVersion: "mini-kv v75",
          smokeManifestVersion: "mini-kv-restore-boundary-smoke-manifest.v1",
          readOnly: true,
          executionAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          javaTransactionChainConnected: false,
          realReadSmoke: {
            commandCount: 8,
            writeCommandsExecuted: false,
            adminCommandsExecuted: false,
            runtimeWriteObserved: false,
            realReadRehearsalInput: true,
          },
        },
      },
      summary: {
        intakeStepCount: 7,
        forbiddenOperationCount: 13,
        pauseConditionCount: 9,
        javaRequiredEvidenceEndpointCount: 4,
        miniKvSmokeCommandCount: 8,
        productionBlockerCount: 0,
      },
    });
    expect(profile.intake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intakeSteps.every((step) => step.readOnly && !step.startsJava && !step.startsMiniKv)).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toEqual(expect.arrayContaining([
      "Start Java from Node v185",
      "Start mini-kv from Node v185",
      "Create approval decision from Node v185",
      "Execute mini-kv restore from Node v185",
    ]));
    expect(profile.nextActions).toContain("Archive Node v185 with Java v66 and mini-kv v75 evidence.");
  });

  it("blocks the intake when upstream actions are enabled", () => {
    const profile = loadRealReadRehearsalIntake(loadTestConfig("memory://real-read-rehearsal-actions-enabled", {
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.intakeState).toBe("blocked");
    expect(profile.readyForRealReadRehearsalReview).toBe(false);
    expect(profile.intake.upstreamActionsEnabled).toBe(true);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes real-read rehearsal intake routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-real-read-rehearsal-intake-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-rehearsal-intake",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/real-read-rehearsal-intake?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "real-read-rehearsal-intake.v1",
        intakeState: "ready-for-real-read-rehearsal-review",
        readyForRealReadRehearsalReview: true,
        executionAllowed: false,
        intake: {
          javaRehearsalVersion: "java-release-approval-rehearsal.v1",
          miniKvSmokeManifestVersion: "mini-kv-restore-boundary-smoke-manifest.v1",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Real-read rehearsal intake");
      expect(markdown.body).toContain("real-read-rehearsal-intake.v1");
      expect(markdown.body).toContain("java-release-approval-rehearsal.v1");
      expect(markdown.body).toContain("mini-kv-restore-boundary-smoke-manifest.v1");
    } finally {
      await app.close();
      await rm(directory, { force: true, recursive: true });
    }
  });
});

function loadTestConfig(auditStorePath: string, overrides: Record<string, string> = {}) {
  return loadConfig({
    NODE_ENV: "test",
    LOG_LEVEL: "silent",
    AUDIT_STORE_PATH: auditStorePath,
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ...overrides,
  });
}
