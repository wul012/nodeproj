import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadReleaseWindowReadinessPacket,
} from "../src/services/releaseWindowReadinessPacket.js";

describe("release window readiness packet", () => {
  it("combines Node v171/v172 with Java v61 and mini-kv v70 evidence without authorizing production actions", () => {
    const profile = loadReleaseWindowReadinessPacket(
      loadTestConfig("memory://release-window-readiness-packet"),
    );

    expect(profile).toMatchObject({
      profileVersion: "release-window-readiness-packet.v1",
      packetState: "ready-for-manual-release-window-review",
      readyForReleaseWindowReadinessPacket: true,
      readyForProductionRelease: false,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      packet: {
        sourceIntakeProfileVersion: "deployment-evidence-intake-gate.v1",
        sourceVerificationProfileVersion: "deployment-evidence-verification.v1",
        javaVersion: "Java v61",
        javaFixtureVersion: "java-rollback-approval-record-fixture.v1",
        miniKvVersion: "mini-kv v70",
        miniKvDrillVersion: "mini-kv-restore-drill-evidence.v1",
        packetMode: "manual-release-window-review-only",
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
        deploymentEvidenceIntakeGateReady: true,
        deploymentEvidenceVerificationReady: true,
        intakeDigestValid: true,
        verificationDigestValid: true,
        previousVerificationStillBlocksProduction: true,
        javaV61ApprovalFixtureReady: true,
        javaFixtureVersionReady: true,
        javaApprovalRecordPlaceholdersPresent: true,
        javaRequiredFieldsComplete: true,
        javaMigrationDirectionClosed: true,
        javaNoSecretBoundaryClosed: true,
        javaNodeConsumptionReadOnly: true,
        javaProductionBoundariesClosed: true,
        javaForbiddenOperationsComplete: true,
        javaArchiveRootUsesC: true,
        miniKvV70RestoreDrillReady: true,
        miniKvDrillVersionReady: true,
        miniKvTargetReleaseReady: true,
        miniKvPreviousEvidenceComplete: true,
        miniKvDigestPlaceholderPresent: true,
        miniKvCheckJsonCommandsReady: true,
        miniKvWriteAndAdminCommandsNotExecuted: true,
        miniKvOperatorConfirmationComplete: true,
        miniKvBoundariesClosed: true,
        miniKvArchiveRootUsesC: true,
        releaseWindowStepsDryRunOnly: true,
        forbiddenOperationsCovered: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        noProductionSecretRead: true,
        noProductionDatabaseConnection: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionOperationsStillFalse: true,
        packetDigestValid: true,
        readyForReleaseWindowReadinessPacket: true,
      },
      artifacts: {
        deploymentEvidenceIntakeGate: {
          profileVersion: "deployment-evidence-intake-gate.v1",
          gateState: "ready-for-manual-deployment-evidence-review",
          readyForDeploymentEvidenceIntakeGate: true,
          executionAllowed: false,
        },
        deploymentEvidenceVerification: {
          profileVersion: "deployment-evidence-verification.v1",
          verificationState: "ready-for-manual-deployment-evidence-verification",
          readyForDeploymentEvidenceVerification: true,
          executionAllowed: false,
        },
        javaRollbackApprovalRecordFixture: {
          plannedVersion: "Java v61",
          evidenceTag: "v61订单平台rollback-approval-record-fixture",
          fixtureVersion: "java-rollback-approval-record-fixture.v1",
          fixtureEndpoint: "/contracts/rollback-approval-record.fixture.json",
          archivePath: "c/61",
          approvalRecord: {
            reviewer: "rollback-reviewer-placeholder",
            approvalTimestampPlaceholder: "approval-timestamp-placeholder",
            rollbackTarget: "release-tag-or-artifact-version-placeholder",
            operatorMustReplacePlaceholders: true,
          },
          databaseMigration: {
            selectedDirection: "no-database-change",
            rollbackSqlExecutionAllowed: false,
            requiresProductionDatabase: false,
          },
          nodeConsumption: {
            nodeMayRenderReleaseWindowPacket: true,
            nodeMayTriggerRollback: false,
            nodeMayExecuteRollbackSql: false,
            nodeMayReadSecretValues: false,
          },
          boundaries: {
            rollbackExecutionAllowed: false,
            requiresProductionDatabase: false,
            requiresProductionSecrets: false,
            changesOrderTransactionSemantics: false,
            connectsMiniKv: false,
          },
        },
        miniKvRestoreDrillEvidence: {
          plannedVersion: "mini-kv v70",
          evidenceTag: "第七十版恢复演练证据",
          drillVersion: "mini-kv-restore-drill-evidence.v1",
          evidencePath: "fixtures/release/restore-drill-evidence.json",
          archivePath: "c/70",
          projectVersion: "0.70.0",
          releaseVersion: "v70",
          executionAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          noRuntimeCommandAdded: true,
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
        },
        noExecutionBoundary: {
          upstreamActionsEnabled: false,
          automaticUpstreamStart: false,
          nodeMayTriggerRelease: false,
          nodeMayTriggerDeployment: false,
          nodeMayTriggerRollback: false,
          nodeMayExecuteJavaRollbackSql: false,
          nodeMayExecuteMiniKvRestore: false,
          nodeMayReadSecretValues: false,
          nodeMayConnectProductionDatabase: false,
        },
      },
      summary: {
        checkCount: 36,
        passedCheckCount: 36,
        sourceEvidenceCount: 4,
        releaseWindowStepCount: 6,
        forbiddenOperationCount: 9,
        productionBlockerCount: 0,
      },
    });
    expect(profile.packet.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sourceIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sourceVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.releaseWindowSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.executesRelease
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Trigger Java rollback from Node v173",
    );
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Execute mini-kv restore from Node v173",
    );
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "MANUAL_RELEASE_WINDOW_REVIEW_ONLY",
    );
  });

  it("blocks packet readiness when upstream actions are enabled", () => {
    const profile = loadReleaseWindowReadinessPacket(loadTestConfig(
      "memory://release-window-readiness-packet-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForReleaseWindowReadinessPacket).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.packet.upstreamActionsEnabled).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes release window readiness packet routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-window-packet-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-window-readiness-packet",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-window-readiness-packet?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        packetState: "ready-for-manual-release-window-review",
        readyForReleaseWindowReadinessPacket: true,
        checks: {
          javaV61ApprovalFixtureReady: true,
          miniKvV70RestoreDrillReady: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Release window readiness packet");
      expect(markdown.body).toContain("Java v61");
      expect(markdown.body).toContain("mini-kv v70");
      expect(markdown.body).toContain("MANUAL_RELEASE_WINDOW_REVIEW_ONLY");
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
