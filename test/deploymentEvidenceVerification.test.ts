import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadDeploymentEvidenceVerification,
} from "../src/services/deploymentEvidenceVerification.js";

describe("deployment evidence verification", () => {
  it("verifies the v171 intake digest and upstream evidence boundaries", () => {
    const profile = loadDeploymentEvidenceVerification(
      loadTestConfig("memory://deployment-evidence-verification"),
    );

    expect(profile).toMatchObject({
      profileVersion: "deployment-evidence-verification.v1",
      verificationState: "ready-for-manual-deployment-evidence-verification",
      readyForDeploymentEvidenceVerification: true,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      verification: {
        sourceProfileVersion: "deployment-evidence-intake-gate.v1",
        sourceGateState: "ready-for-manual-deployment-evidence-review",
        sourceReadyForDeploymentEvidenceIntakeGate: true,
        javaVersion: "Java v60",
        miniKvVersion: "mini-kv v69",
        nodeBaselineTag: "v171",
        verificationMode: "manual-deployment-evidence-verification-only",
        upstreamActionsEnabled: false,
        productionDeploymentAuthorized: false,
        productionRollbackAuthorized: false,
        productionOperationsAuthorized: false,
      },
      checks: {
        sourceIntakeGateReady: true,
        sourceIntakeDigestValid: true,
        sourceSummaryDigestValid: true,
        sourceSummaryStillBlocksProduction: true,
        javaVersionMatchesIntake: true,
        javaContractVersionMatchesIntake: true,
        javaDeploymentWindowFieldsVerified: true,
        javaMigrationFieldsVerified: true,
        javaSecretBoundaryVerified: true,
        javaNoExecutionBoundaryVerified: true,
        miniKvVersionMatchesIntake: true,
        miniKvPackageVersionMatchesIntake: true,
        miniKvDigestFieldsVerified: true,
        miniKvRestoreDrillVerified: true,
        miniKvOperatorConfirmationVerified: true,
        miniKvNoExecutionBoundaryVerified: true,
        miniKvOrderAuthorityBoundaryVerified: true,
        intakeNoExecutionBoundaryVerified: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        verificationDigestValid: true,
        readyForDeploymentEvidenceVerification: true,
      },
      artifacts: {
        sourceDeploymentEvidenceIntakeGate: {
          profileVersion: "deployment-evidence-intake-gate.v1",
          gateState: "ready-for-manual-deployment-evidence-review",
          readyForDeploymentEvidenceIntakeGate: true,
          readyForProductionDeployment: false,
          readyForProductionRollback: false,
          readyForProductionOperations: false,
          executionAllowed: false,
          gateCheckCount: 34,
          passedGateCheckCount: 34,
        },
        javaRunbookVerification: {
          plannedVersion: "Java v60",
          contractVersion: "java-production-deployment-runbook-contract.v1",
          deploymentWindowOwner: "release-window-owner",
          rollbackApprover: "rollback-approval-owner",
          selectedMigrationDirection: "no-database-change",
          nodeMayTriggerDeployment: false,
          nodeMayTriggerRollback: false,
          nodeMayExecuteRollbackSql: false,
          nodeMayReadSecretValues: false,
          requiresProductionDatabase: false,
          archivePath: "c/60",
        },
        miniKvPackageVerification: {
          plannedVersion: "mini-kv v69",
          packageVersion: "mini-kv-release-artifact-digest-package.v1",
          projectVersion: "0.69.0",
          artifactDigestCount: 4,
          restoreDrillCommandCount: 8,
          operatorConfirmationRequired: true,
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
          archivePath: "c/69",
        },
        noExecutionBoundary: {
          upstreamActionsEnabled: false,
          sourceExecutionAllowed: false,
          nodeMayTriggerDeployment: false,
          nodeMayExecuteJavaRollbackSql: false,
          nodeMayExecuteMiniKvRestore: false,
          nodeMayReadSecretValues: false,
          nodeMayConnectProductionDatabase: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
        },
      },
      summary: {
        checkCount: 22,
        passedCheckCount: 22,
        verifiedArtifactCount: 4,
        productionBlockerCount: 0,
      },
    });
    expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.sourceIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_PARALLEL_JAVA_V61_MINI_KV_V70",
    );
  });

  it("blocks verification when upstream actions are enabled", () => {
    const profile = loadDeploymentEvidenceVerification(loadTestConfig(
      "memory://deployment-evidence-verification-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForDeploymentEvidenceVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.verification.upstreamActionsEnabled).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes deployment evidence verification routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-deployment-verification-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/deployment-evidence-verification",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/deployment-evidence-verification?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        verificationState: "ready-for-manual-deployment-evidence-verification",
        readyForDeploymentEvidenceVerification: true,
        checks: {
          sourceIntakeDigestValid: true,
          javaDeploymentWindowFieldsVerified: true,
          miniKvDigestFieldsVerified: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Deployment evidence verification");
      expect(markdown.body).toContain("Java v60");
      expect(markdown.body).toContain("mini-kv v69");
      expect(markdown.body).toContain("PROCEED_TO_PARALLEL_JAVA_V61_MINI_KV_V70");
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
