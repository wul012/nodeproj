import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadReleaseHandoffReadinessReview,
} from "../src/services/releaseHandoffReadinessReview.js";

describe("release handoff readiness review", () => {
  it("combines Node v174, Java v62, and mini-kv v71 handoff evidence without authorizing production actions", () => {
    const profile = loadReleaseHandoffReadinessReview(
      loadTestConfig("memory://release-handoff-readiness-review"),
    );

    expect(profile).toMatchObject({
      profileVersion: "release-handoff-readiness-review.v1",
      reviewState: "ready-for-manual-release-handoff-review",
      readyForReleaseHandoffReadinessReview: true,
      readyForProductionRelease: false,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      review: {
        sourceEnvelopeProfileVersion: "production-release-dry-run-envelope.v1",
        sourceEnvelopeState: "ready-for-manual-production-release-dry-run",
        sourceReadyForProductionReleaseDryRunEnvelope: true,
        javaVersion: "Java v62",
        javaFixtureVersion: "java-release-handoff-checklist-fixture.v1",
        miniKvVersion: "mini-kv v71",
        miniKvChecklistVersion: "mini-kv-restore-handoff-checklist.v1",
        reviewMode: "manual-release-handoff-review-only",
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        nodeMayTriggerRelease: false,
        nodeMayTriggerDeployment: false,
        nodeMayTriggerRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
        productionReleaseAuthorized: false,
        productionDeploymentAuthorized: false,
        productionRollbackAuthorized: false,
        productionOperationsAuthorized: false,
      },
      checks: {
        sourceEnvelopeReady: true,
        sourceEnvelopeDigestValid: true,
        sourceEnvelopeStillBlocksProduction: true,
        sourceEnvelopeReferencesV173: true,
        javaV62FixtureReady: true,
        javaChecklistPlaceholdersPresent: true,
        javaRequiredFieldsComplete: true,
        javaChecklistArtifactsComplete: true,
        javaMigrationDirectionClosed: true,
        javaSecretBoundaryClosed: true,
        javaNodeConsumptionReadOnly: true,
        javaProductionBoundariesClosed: true,
        javaForbiddenOperationsComplete: true,
        javaArchiveRootUsesC: true,
        miniKvV71ChecklistReady: true,
        miniKvTargetReleaseReady: true,
        miniKvPreviousEvidenceComplete: true,
        miniKvDigestPlaceholdersPresent: true,
        miniKvChecklistFieldsComplete: true,
        miniKvRequiredConfirmationsComplete: true,
        miniKvCheckJsonRiskCommandsReady: true,
        miniKvNoWriteOrAdminExecuted: true,
        miniKvBoundariesClosed: true,
        miniKvArchiveRootUsesC: true,
        handoffReviewStepsReadOnly: true,
        forbiddenOperationsCovered: true,
        pauseConditionsComplete: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        noProductionSecretRead: true,
        noProductionDatabaseConnection: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionDeploymentStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionOperationsStillFalse: true,
        reviewDigestValid: true,
        readyForReleaseHandoffReadinessReview: true,
      },
      artifacts: {
        sourceProductionReleaseDryRunEnvelope: {
          profileVersion: "production-release-dry-run-envelope.v1",
          envelopeState: "ready-for-manual-production-release-dry-run",
          readyForProductionReleaseDryRunEnvelope: true,
          readyForProductionRelease: false,
          readyForProductionDeployment: false,
          readyForProductionRollback: false,
          readyForProductionOperations: false,
          executionAllowed: false,
        },
        javaReleaseHandoffChecklistFixture: {
          project: "advanced-order-platform",
          plannedVersion: "Java v62",
          fixtureVersion: "java-release-handoff-checklist-fixture.v1",
          fixtureEndpoint: "/contracts/release-handoff-checklist.fixture.json",
          archivePath: "c/62",
          readOnly: true,
          executionAllowed: false,
          releaseChecklist: {
            releaseOperator: "release-operator-placeholder",
            rollbackApprover: "rollback-approver-placeholder",
            artifactTarget: "release-tag-or-artifact-version-placeholder",
            operatorMustReplacePlaceholders: true,
          },
          databaseMigration: {
            selectedDirection: "no-database-change",
            rollbackSqlExecutionAllowed: false,
            requiresProductionDatabase: false,
          },
          secretSourceConfirmation: {
            required: true,
            secretValueRecorded: false,
            nodeMayReadSecretValues: false,
          },
        },
        miniKvRestoreHandoffChecklistFixture: {
          project: "mini-kv",
          plannedVersion: "mini-kv v71",
          checklistVersion: "mini-kv-restore-handoff-checklist.v1",
          evidencePath: "fixtures/release/restore-handoff-checklist.json",
          archivePath: "c/71",
          projectVersion: "0.71.0",
          releaseVersion: "v71",
          readOnly: true,
          executionAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
        },
        noExecutionBoundary: {
          upstreamActionsEnabled: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          releaseExecutionAllowed: false,
          deploymentExecutionAllowed: false,
          rollbackExecutionAllowed: false,
          restoreExecutionAllowed: false,
          sqlExecutionAllowed: false,
          secretValueReadAllowed: false,
          productionDatabaseConnectionAllowed: false,
        },
      },
      summary: {
        checkCount: 37,
        passedCheckCount: 37,
        handoffReviewStepCount: 6,
        javaRequiredChecklistFieldCount: 8,
        miniKvChecklistFieldCount: 7,
        forbiddenOperationCount: 10,
        pauseConditionCount: 8,
        productionBlockerCount: 0,
      },
    });
    expect(profile.review.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.review.sourceEnvelopeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.handoffReviewSteps.every((step) => (
      step.readOnly
      && step.dryRunOnly
      && !step.mutatesState
      && !step.executesRelease
      && !step.executesDeployment
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toEqual(expect.arrayContaining([
      "Trigger Java deployment from Node v175",
      "Execute mini-kv restore from Node v175",
      "Open UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_NODE_V176_CI_EVIDENCE_HARDENING",
    );
  });

  it("blocks the handoff review when upstream actions are enabled", () => {
    const profile = loadReleaseHandoffReadinessReview(loadTestConfig(
      "memory://release-handoff-readiness-review-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForReleaseHandoffReadinessReview).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.review.upstreamActionsEnabled).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes release handoff readiness review routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-handoff-review-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-handoff-readiness-review",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-handoff-readiness-review?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        reviewState: "ready-for-manual-release-handoff-review",
        readyForReleaseHandoffReadinessReview: true,
        checks: {
          sourceEnvelopeReady: true,
          javaV62FixtureReady: true,
          miniKvV71ChecklistReady: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Release handoff readiness review");
      expect(markdown.body).toContain("java-release-handoff-checklist-fixture.v1");
      expect(markdown.body).toContain("mini-kv-restore-handoff-checklist.v1");
      expect(markdown.body).toContain("PROCEED_TO_NODE_V176_CI_EVIDENCE_HARDENING");
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
