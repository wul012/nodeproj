import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRollbackExecutionPreflightContract,
} from "../src/services/rollbackExecutionPreflightContract.js";

describe("rollback execution preflight contract", () => {
  it("combines Java v58 and mini-kv v67 preflight evidence without authorizing rollback", () => {
    const profile = loadRollbackExecutionPreflightContract(
      loadTestConfig("memory://rollback-execution-preflight-contract"),
    );

    expect(profile).toMatchObject({
      profileVersion: "rollback-execution-preflight-contract.v1",
      contractState: "ready-for-manual-preflight-review",
      readyForRollbackExecutionPreflightContract: true,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      contract: {
        previousChecklistVersion: "rollback-window-readiness-checklist.v1",
        javaVersion: "Java v58",
        javaGateVersion: "java-rollback-sql-review-gate.v1",
        miniKvVersion: "mini-kv v67",
        miniKvPackageVersion: "mini-kv-restore-dry-run-operator-package.v1",
        nodeBaselineTag: "v166",
        preflightMode: "manual-preflight-contract-only",
        nodeMayRenderPreflight: true,
        nodeMayTriggerJavaRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayExecuteMiniKvAdminCommands: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        productionRollbackAuthorized: false,
      },
      checks: {
        previousChecklistReady: true,
        previousChecklistDoesNotAuthorizeRollback: true,
        javaV58GateReady: true,
        javaGateVersionReady: true,
        javaReviewFieldsComplete: true,
        javaMigrationOptionsComplete: true,
        javaOperatorApprovalPlaceholderPresent: true,
        javaNodeCannotExecuteRollback: true,
        javaSqlAndProductionDbClosed: true,
        javaBoundariesClosed: true,
        javaForbiddenOperationsComplete: true,
        javaArchiveRootUsesC: true,
        miniKvV67PackageReady: true,
        miniKvPackageVersionReady: true,
        miniKvRestoreTargetReady: true,
        miniKvArtifactDigestsComplete: true,
        miniKvCompatibilityConfirmationsComplete: true,
        miniKvDryRunCommandsComplete: true,
        miniKvDangerousCommandsExplainedOnly: true,
        miniKvExecutionBoundariesClosed: true,
        miniKvOrderAuthorityClosed: true,
        miniKvArchiveRootUsesC: true,
        preflightStepsDryRunOnly: true,
        forbiddenOperationsCovered: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionRollbackStillFalse: true,
        readyForRollbackExecutionPreflightContract: true,
      },
      artifacts: {
        javaRollbackSqlReviewGate: {
          plannedVersion: "Java v58",
          evidenceTag: "v58订单平台rollback-sql-review-gate-sample",
          gateEndpoint: "/contracts/rollback-sql-review-gate.sample.json",
          gateMode: "READ_ONLY_SQL_REVIEW_GATE",
          reviewOwner: "database-release-owner",
          operatorApprovalPlaceholder: "operator-approval-required-before-any-sql-execution",
          nodeMayRenderPreflight: true,
          nodeMayTriggerRollback: false,
          nodeMayExecuteRollbackSql: false,
          requiresProductionDatabase: false,
          archivePath: "c/58",
        },
        miniKvRestoreDryRunOperatorPackage: {
          plannedVersion: "mini-kv v67",
          evidenceTag: "第六十七版恢复演练操作包",
          projectVersion: "0.67.0",
          releaseVersion: "v67",
          targetReleaseVersion: "v67",
          artifactDigestIds: [
            "binary-digest",
            "fixture-digest",
            "handoff-digest",
          ],
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
          archivePath: "c/67",
        },
      },
      summary: {
        preflightCheckCount: 28,
        passedPreflightCheckCount: 28,
        preflightArtifactCount: 2,
        preflightStepCount: 6,
        forbiddenOperationCount: 8,
        productionBlockerCount: 0,
      },
    });
    expect(profile.contract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.contract.previousChecklistDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preflightSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.executesRollback
      && !step.executesRestore
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Execute rollback SQL from Node v167",
    );
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Execute mini-kv restore or admin commands",
    );
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_SECRET_AND_DIGEST_STAGE",
    );
  });

  it("blocks the preflight contract when upstream actions are enabled", () => {
    const profile = loadRollbackExecutionPreflightContract(loadTestConfig(
      "memory://rollback-execution-preflight-contract-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.contractState).toBe("blocked");
    expect(profile.readyForRollbackExecutionPreflightContract).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.contract.upstreamActionsEnabled).toBe(true);
    expect(profile.contract.productionRollbackAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes rollback execution preflight routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-rollback-preflight-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/rollback-execution-preflight-contract",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/rollback-execution-preflight-contract?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        contractState: "ready-for-manual-preflight-review",
        readyForRollbackExecutionPreflightContract: true,
        checks: {
          javaSqlAndProductionDbClosed: true,
          miniKvExecutionBoundariesClosed: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Rollback execution preflight contract");
      expect(markdown.body).toContain("Java v58");
      expect(markdown.body).toContain("mini-kv v67");
      expect(markdown.body).toContain("PROCEED_TO_SECRET_AND_DIGEST_STAGE");
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
