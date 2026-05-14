import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadDeploymentEvidenceIntakeGate,
} from "../src/services/deploymentEvidenceIntakeGate.js";

describe("deployment evidence intake gate", () => {
  it("combines Java v60 and mini-kv v69 evidence without authorizing production actions", () => {
    const profile = loadDeploymentEvidenceIntakeGate(
      loadTestConfig("memory://deployment-evidence-intake-gate"),
    );

    expect(profile).toMatchObject({
      profileVersion: "deployment-evidence-intake-gate.v1",
      gateState: "ready-for-manual-deployment-evidence-review",
      readyForDeploymentEvidenceIntakeGate: true,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      gate: {
        sourceSummaryVersion: "post-v166-readiness-summary.v1",
        javaVersion: "Java v60",
        javaContractVersion: "java-production-deployment-runbook-contract.v1",
        miniKvVersion: "mini-kv v69",
        miniKvPackageVersion: "mini-kv-release-artifact-digest-package.v1",
        nodeBaselineTag: "v170",
        intakeMode: "manual-deployment-evidence-intake-only",
        upstreamActionsEnabled: false,
        nodeMayRenderIntakeGate: true,
        nodeMayTriggerDeployment: false,
        nodeMayTriggerJavaRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayExecuteMiniKvAdminCommands: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        productionDeploymentAuthorized: false,
        productionRollbackAuthorized: false,
      },
      checks: {
        postV166SummaryReady: true,
        postV166StillBlocksProduction: true,
        javaV60RunbookReady: true,
        javaContractVersionReady: true,
        javaDeploymentWindowComplete: true,
        javaMigrationDirectionClosed: true,
        javaSecretSourceConfirmationClosed: true,
        javaRequiredConfirmationsComplete: true,
        javaRunbookArtifactsComplete: true,
        javaNodeConsumptionReadOnly: true,
        javaProductionBoundaryClosed: true,
        javaForbiddenOperationsComplete: true,
        javaArchiveRootUsesC: true,
        miniKvV69PackageReady: true,
        miniKvPackageVersionReady: true,
        miniKvReleaseMappingReady: true,
        miniKvPreviousEvidenceComplete: true,
        miniKvArtifactDigestsComplete: true,
        miniKvRestoreDrillProfileReadOnly: true,
        miniKvOperatorConfirmationComplete: true,
        miniKvFixtureInputsComplete: true,
        miniKvExecutionBoundariesClosed: true,
        miniKvOrderAuthorityClosed: true,
        miniKvArchiveRootUsesC: true,
        intakeStepsDryRunOnly: true,
        forbiddenOperationsCovered: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        noProductionSecretRead: true,
        noProductionDatabaseConnection: true,
        readyForProductionDeploymentStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionOperationsStillFalse: true,
        readyForDeploymentEvidenceIntakeGate: true,
      },
      artifacts: {
        sourcePostV166ReadinessSummary: {
          summaryVersion: "post-v166-readiness-summary.v1",
          summaryState: "completed-with-production-blockers",
          readyForPostV166ReadinessSummary: true,
          readyForProductionRollback: false,
          readyForProductionOperations: false,
          executionAllowed: false,
        },
        javaProductionDeploymentRunbookContract: {
          plannedVersion: "Java v60",
          evidenceTag: "v60订单平台production-deployment-runbook-contract",
          contractEndpoint: "/contracts/production-deployment-runbook-contract.sample.json",
          contractMode: "READ_ONLY_DEPLOYMENT_RUNBOOK_CONTRACT",
          deploymentWindow: {
            owner: "release-window-owner",
            rollbackApprover: "rollback-approval-owner",
            operatorStartRequired: true,
            nodeMayScheduleWindow: false,
            nodeMayTriggerDeployment: false,
          },
          databaseMigration: {
            selectedDirection: "no-database-change",
            rollbackSqlExecutionAllowed: false,
            requiresProductionDatabase: false,
          },
          secretSourceConfirmation: {
            nodeMayReadSecretValues: false,
            secretValueRecorded: false,
          },
          archivePath: "c/60",
        },
        miniKvReleaseArtifactDigestPackage: {
          plannedVersion: "mini-kv v69",
          evidenceTag: "第六十九版发布产物摘要包",
          packageVersion: "mini-kv-release-artifact-digest-package.v1",
          projectVersion: "0.69.0",
          releaseVersion: "v69",
          targetReleaseVersion: "v69",
          previousReleaseVersion: "v68",
          artifactDigestIds: [
            "binary-digest",
            "wal-checksum-evidence",
            "snapshot-digest-evidence",
            "fixture-digest",
          ],
          operatorConfirmationRequired: true,
          digestPlaceholdersOnly: true,
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
          archivePath: "c/69",
        },
      },
      summary: {
        gateCheckCount: 34,
        passedGateCheckCount: 34,
        sourceEvidenceCount: 3,
        intakeStepCount: 7,
        forbiddenOperationCount: 10,
        productionBlockerCount: 0,
      },
    });
    expect(profile.gate.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.gate.sourceSummaryDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intakeSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
      && !step.executesDeployment
      && !step.executesRollback
      && !step.executesRestore
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Trigger Java deployment from Node v171",
    );
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Execute mini-kv LOAD, COMPACT, or SETNXEX",
    );
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_DEPLOYMENT_EVIDENCE_VERIFICATION",
    );
  });

  it("blocks the intake gate when upstream actions are enabled", () => {
    const profile = loadDeploymentEvidenceIntakeGate(loadTestConfig(
      "memory://deployment-evidence-intake-gate-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForDeploymentEvidenceIntakeGate).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.gate.upstreamActionsEnabled).toBe(true);
    expect(profile.gate.productionDeploymentAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes deployment evidence intake gate routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-deployment-intake-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/deployment-evidence-intake-gate",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/deployment-evidence-intake-gate?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        gateState: "ready-for-manual-deployment-evidence-review",
        readyForDeploymentEvidenceIntakeGate: true,
        checks: {
          javaDeploymentWindowComplete: true,
          miniKvArtifactDigestsComplete: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Deployment evidence intake gate");
      expect(markdown.body).toContain("Java v60");
      expect(markdown.body).toContain("mini-kv v69");
      expect(markdown.body).toContain("PROCEED_TO_DEPLOYMENT_EVIDENCE_VERIFICATION");
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
