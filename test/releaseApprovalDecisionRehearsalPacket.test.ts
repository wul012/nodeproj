import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadReleaseApprovalDecisionRehearsalPacket,
} from "../src/services/releaseApprovalDecisionRehearsalPacket.js";

describe("Release approval decision rehearsal packet", () => {
  it("combines Node v181, Java v65, and mini-kv v74 without creating an approval decision", () => {
    const profile = loadReleaseApprovalDecisionRehearsalPacket(
      loadTestConfig("memory://release-approval-decision-rehearsal-packet"),
      {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "release-approval-decision-rehearsal-packet.v1",
      packetState: "ready-for-release-approval-decision-rehearsal-review",
      readyForReleaseApprovalDecisionRehearsalPacket: true,
      readyForApprovalDecision: false,
      readyForApprovalLedgerWrite: false,
      readyForProductionAuth: false,
      readyForProductionRelease: false,
      readyForProductionRollback: false,
      readyForProductionRestore: false,
      readOnly: true,
      rehearsalOnly: true,
      executionAllowed: false,
      packet: {
        sourceDryRunEnvelopeVersion: "approval-ledger-dry-run-envelope.v1",
        sourceDryRunEnvelopeState: "ready-for-approval-ledger-dry-run-review",
        sourceDryRunEnvelopeReady: true,
        javaFixtureVersion: "java-rollback-approver-evidence-fixture.v1",
        javaRollbackApprover: "rollback-approver-placeholder",
        javaMigrationDirection: "no-database-change",
        javaRollbackSqlArtifactReference: "rollback-sql-artifact-reference-placeholder",
        miniKvBoundaryVersion: "mini-kv-restore-approval-boundary.v1",
        miniKvApprovalBoundaryId: "mini-kv-restore-approval-boundary-v74",
        miniKvRestoreApproverPlaceholder: "operator:<restore-approval-approver>",
        miniKvRestoreTargetPlaceholder: "restore-target:<operator-approved-restore-target>",
        miniKvArtifactDigestPlaceholder: "sha256:<operator-approved-restore-artifact-digest>",
        rehearsalMode: "release-approval-decision-rehearsal-only",
        approvalDecisionCreated: false,
        approvalLedgerWriteAllowed: false,
        approvalLedgerWritten: false,
        productionReleaseAuthorized: false,
        productionRollbackAuthorized: false,
        productionRestoreAuthorized: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
      },
      checks: {
        sourceDryRunEnvelopeReady: true,
        sourceDryRunEnvelopeDigestValid: true,
        sourceDryRunEnvelopeStillBlocksApprovalAndProduction: true,
        javaV65RollbackApproverFixtureReady: true,
        javaRollbackApproverRecordComplete: true,
        javaDatabaseMigrationBoundaryClosed: true,
        javaNodeConsumptionSafe: true,
        javaProductionBoundariesClosed: true,
        javaForbiddenOperationsComplete: true,
        miniKvV74RestoreApprovalBoundaryReady: true,
        miniKvApprovalBoundaryTargetComplete: true,
        miniKvRestoreEvidenceComplete: true,
        miniKvCheckJsonBoundaryEvidenceReadOnly: true,
        miniKvBoundariesClosed: true,
        rehearsalInputsComplete: true,
        rehearsalStepsReadOnly: true,
        forbiddenOperationsCovered: true,
        pauseConditionsComplete: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        noApprovalDecisionCreated: true,
        noApprovalLedgerWrite: true,
        noReleaseExecution: true,
        noDeploymentExecution: true,
        noRollbackExecution: true,
        noRollbackSqlExecution: true,
        noRestoreExecution: true,
        noProductionSecretRead: true,
        noProductionDatabaseConnection: true,
        noProductionIdpConnection: true,
        readyForApprovalDecisionStillFalse: true,
        readyForApprovalLedgerWriteStillFalse: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionRestoreStillFalse: true,
        packetDigestValid: true,
        readyForReleaseApprovalDecisionRehearsalPacket: true,
      },
      artifacts: {
        sourceApprovalLedgerDryRunEnvelope: {
          profileVersion: "approval-ledger-dry-run-envelope.v1",
          envelopeState: "ready-for-approval-ledger-dry-run-review",
          readyForApprovalLedgerDryRunEnvelope: true,
          readyForApprovalDecision: false,
          readyForApprovalLedgerWrite: false,
          executionAllowed: false,
        },
        javaRollbackApproverEvidenceFixture: {
          plannedVersion: "Java v65",
          fixtureVersion: "java-rollback-approver-evidence-fixture.v1",
          approverEvidence: {
            rollbackApprover: "rollback-approver-placeholder",
            operatorMustReplacePlaceholders: true,
          },
          databaseMigration: {
            selectedDirection: "no-database-change",
            rollbackSqlExecutionAllowed: false,
            requiresProductionDatabase: false,
          },
          nodeConsumption: {
            nodeMayRenderDecisionRehearsalInput: true,
            nodeMayCreateApprovalDecision: false,
            nodeMayWriteApprovalLedger: false,
            nodeMayExecuteRollbackSql: false,
          },
        },
        miniKvRestoreApprovalBoundary: {
          plannedVersion: "mini-kv v74",
          boundaryVersion: "mini-kv-restore-approval-boundary.v1",
          projectVersion: "0.74.0",
          readOnly: true,
          executionAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          javaTransactionChainConnected: false,
          approvalBoundaryTarget: {
            approvalBoundaryId: "mini-kv-restore-approval-boundary-v74",
            restoreApproverPlaceholder: "operator:<restore-approval-approver>",
            javaTransactionChain: "disconnected",
          },
        },
        noExecutionBoundary: {
          nodeMayCreateApprovalDecision: false,
          nodeMayWriteApprovalLedger: false,
          nodeMayTriggerRelease: false,
          nodeMayExecuteJavaRollbackSql: false,
          nodeMayExecuteMiniKvRestore: false,
        },
      },
      summary: {
        checkCount: 37,
        passedCheckCount: 37,
        rehearsalInputCount: 5,
        rehearsalStepCount: 7,
        forbiddenOperationCount: 12,
        pauseConditionCount: 9,
        sourceEnvelopeCheckCount: 30,
        sourceEnvelopePassedCheckCount: 30,
        javaRequiredEvidenceFieldCount: 6,
        javaEvidenceArtifactCount: 6,
        miniKvRestoreEvidenceFieldCount: 7,
        miniKvCheckJsonCommandCount: 8,
        productionBlockerCount: 0,
      },
    });
    expect(profile.packet.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sourceDryRunEnvelopeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.rehearsalInputs.map((input) => input.id)).toEqual(expect.arrayContaining([
      "java-rollback-approver-evidence-present",
      "java-rollback-sql-boundary-closed",
      "mini-kv-restore-approval-boundary-present",
      "mini-kv-java-transaction-chain-disconnected",
    ]));
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toEqual(expect.arrayContaining([
      "Create approval decision from Node v182",
      "Write approval ledger from Node v182",
      "Execute Java rollback SQL from Node v182",
      "Execute mini-kv restore from Node v182",
    ]));
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "START_NEXT_PLAN_WITH_OPS_PROMOTION_ARCHIVE_BUNDLE_SPLIT",
    );
  });

  it("blocks the packet when identity headers are missing", () => {
    const profile = loadReleaseApprovalDecisionRehearsalPacket(
      loadTestConfig("memory://release-approval-decision-rehearsal-missing-identity"),
    );

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForReleaseApprovalDecisionRehearsalPacket).toBe(false);
    expect(profile.checks.sourceDryRunEnvelopeReady).toBe(false);
    expect(profile.artifacts.sourceApprovalLedgerDryRunEnvelope).toMatchObject({
      envelopeState: "blocked",
      readyForApprovalLedgerDryRunEnvelope: false,
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain(
      "SOURCE_DRY_RUN_ENVELOPE_NOT_READY",
    );
  });

  it("blocks the packet when upstream actions are enabled", () => {
    const profile = loadReleaseApprovalDecisionRehearsalPacket(
      loadTestConfig("memory://release-approval-decision-rehearsal-actions-enabled", {
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForReleaseApprovalDecisionRehearsalPacket).toBe(false);
    expect(profile.packet.upstreamActionsEnabled).toBe(true);
    expect(profile.checks.sourceDryRunEnvelopeReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes rehearsal packet routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-approval-rehearsal-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-approval-decision-rehearsal-packet",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-approval-decision-rehearsal-packet?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        packetState: "ready-for-release-approval-decision-rehearsal-review",
        readyForReleaseApprovalDecisionRehearsalPacket: true,
        readyForApprovalDecision: false,
        readyForApprovalLedgerWrite: false,
        packet: {
          javaFixtureVersion: "java-rollback-approver-evidence-fixture.v1",
          miniKvBoundaryVersion: "mini-kv-restore-approval-boundary.v1",
          approvalDecisionCreated: false,
          approvalLedgerWriteAllowed: false,
          productionReleaseAuthorized: false,
        },
        checks: {
          sourceDryRunEnvelopeReady: true,
          javaV65RollbackApproverFixtureReady: true,
          miniKvV74RestoreApprovalBoundaryReady: true,
          noApprovalDecisionCreated: true,
          noApprovalLedgerWrite: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Release approval decision rehearsal packet");
      expect(markdown.body).toContain("java-rollback-approver-evidence-fixture.v1");
      expect(markdown.body).toContain("mini-kv-restore-approval-boundary.v1");
      expect(markdown.body).toContain("## Rehearsal Inputs");
      expect(markdown.body).toContain("Write approval ledger from Node v182");
      expect(markdown.body).toContain("START_NEXT_PLAN_WITH_OPS_PROMOTION_ARCHIVE_BUNDLE_SPLIT");
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
