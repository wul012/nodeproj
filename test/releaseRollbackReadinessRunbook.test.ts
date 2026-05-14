import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadReleaseRollbackReadinessRunbook,
} from "../src/services/releaseRollbackReadinessRunbook.js";

describe("release rollback readiness runbook", () => {
  it("combines Java v55 and mini-kv v64 rollback evidence into a manual dry-run runbook", () => {
    const profile = loadReleaseRollbackReadinessRunbook(
      loadTestConfig("memory://release-rollback-readiness-runbook"),
    );

    expect(profile).toMatchObject({
      profileVersion: "release-rollback-readiness-runbook.v1",
      runbookState: "ready-for-manual-dry-run",
      readyForReleaseRollbackReadinessRunbook: true,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      runbook: {
        previousIntakeGateVersion: "cross-project-release-verification-intake-gate.v1",
        javaVersion: "Java v55",
        javaEvidenceVersion: "java-deployment-rollback-evidence.v1",
        miniKvVersion: "mini-kv v64",
        miniKvEvidenceVersion: "mini-kv-runtime-artifact-rollback.v1",
        rollbackMode: "manual-dry-run-only",
        nodeMayTriggerJavaRollback: false,
        nodeMayExecuteJavaMaven: false,
        nodeMayExecuteMiniKvRollback: false,
        nodeMayExecuteMiniKvAdminCommands: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionRollbackAuthorized: false,
      },
      checks: {
        previousIntakeGateReady: true,
        previousGateDoesNotAuthorizeRelease: true,
        javaV55EvidenceReady: true,
        javaRollbackEvidenceVersionReady: true,
        javaRollbackSubjectsComplete: true,
        javaRequiresOperatorConfirmation: true,
        javaNodeRollbackForbidden: true,
        javaMavenExecutionForbidden: true,
        javaDatabaseRollbackNotAutomatic: true,
        javaNoProductionDatabaseRequired: true,
        javaBusinessSemanticsUnchanged: true,
        javaDoesNotConnectMiniKv: true,
        miniKvV64EvidenceReady: true,
        miniKvRollbackEvidenceVersionReady: true,
        miniKvArtifactBoundariesComplete: true,
        miniKvReadOnlySmokeReady: true,
        miniKvWriteCommandsNotExecuted: true,
        miniKvAdminCommandsNotExecuted: true,
        miniKvOrderAuthoritativeFalse: true,
        miniKvNotConnectedToJavaTransactionChain: true,
        operatorStepsDryRunOnly: true,
        forbiddenOperationsCovered: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionRollbackStillFalse: true,
        readyForReleaseRollbackReadinessRunbook: true,
      },
      artifacts: {
        javaDeploymentRollbackEvidence: {
          plannedVersion: "Java v55",
          evidenceTag: "java-v55-deployment-rollback-evidence-sample",
          evidenceEndpoint: "/contracts/deployment-rollback-evidence.sample.json",
          rollbackSubjects: [
            "java-package",
            "runtime-configuration",
            "database-migrations",
            "static-contracts",
          ],
          nodeMayTriggerRollback: false,
          databaseMigrationRollbackAutomatic: false,
          requiresProductionDatabase: false,
          changesOrderTransactionSemantics: false,
          connectsMiniKv: false,
          archivePath: "c/55",
        },
        miniKvRuntimeArtifactRollbackEvidence: {
          plannedVersion: "mini-kv v64",
          evidenceTag: "mini-kv-v64-runtime-artifact-rollback-evidence",
          projectVersion: "0.64.0",
          artifactIds: [
            "binary-version",
            "wal",
            "snapshot",
            "fixtures",
          ],
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
          cannotForgeJavaOrderState: true,
          archivePath: "c/64",
        },
      },
      summary: {
        runbookCheckCount: 26,
        passedRunbookCheckCount: 26,
        rollbackEvidenceCount: 2,
        operatorStepCount: 6,
        forbiddenOperationCount: 7,
        productionBlockerCount: 0,
      },
    });
    expect(profile.runbook.runbookDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.runbook.previousIntakeGateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.operatorSteps.every((step) => (
      step.dryRunOnly && step.readOnly && !step.mutatesState && !step.executesRollback
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Trigger Java deployment rollback from Node",
    );
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Execute mini-kv LOAD, COMPACT, or SETNXEX during rollback readiness",
    );
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain("START_POST_V163_PLAN");
  });

  it("blocks the runbook when upstream actions are enabled", () => {
    const profile = loadReleaseRollbackReadinessRunbook(loadTestConfig(
      "memory://release-rollback-readiness-runbook-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.runbookState).toBe("blocked");
    expect(profile.readyForReleaseRollbackReadinessRunbook).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.runbook.upstreamActionsEnabled).toBe(true);
    expect(profile.runbook.productionRollbackAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes release rollback readiness runbook routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-rollback-readiness-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-rollback-readiness-runbook",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-rollback-readiness-runbook?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        runbookState: "ready-for-manual-dry-run",
        readyForReleaseRollbackReadinessRunbook: true,
        checks: {
          javaNodeRollbackForbidden: true,
          miniKvWriteCommandsNotExecuted: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Release rollback readiness runbook");
      expect(markdown.body).toContain("Java v55");
      expect(markdown.body).toContain("mini-kv v64");
      expect(markdown.body).toContain("START_POST_V163_PLAN");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

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
