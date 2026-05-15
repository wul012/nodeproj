import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadApprovalDecisionPrerequisiteGate,
} from "../src/services/approvalDecisionPrerequisiteGate.js";

describe("Approval decision prerequisite gate", () => {
  it("consumes v179, Java v64, and mini-kv v73 without creating an approval decision", () => {
    const profile = loadApprovalDecisionPrerequisiteGate(
      loadTestConfig("memory://approval-decision-prerequisite-gate"),
      {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "approval-decision-prerequisite-gate.v1",
      gateState: "ready-for-approval-decision-prerequisite-review",
      readyForApprovalDecisionPrerequisiteGate: true,
      readyForApprovalLedgerDryRunEnvelope: true,
      readyForApprovalDecision: false,
      readyForProductionAuth: false,
      readyForProductionRelease: false,
      readyForProductionRollback: false,
      readyForProductionRestore: false,
      readOnly: true,
      prerequisiteReviewOnly: true,
      executionAllowed: false,
      gate: {
        sourcePreApprovalProfileVersion: "production-release-pre-approval-packet.v1",
        sourcePreApprovalPacketState: "ready-for-production-release-pre-approval-review",
        sourcePreApprovalReady: true,
        javaVersion: "Java v64",
        javaFixtureVersion: "java-release-operator-signoff-fixture.v1",
        javaReleaseOperator: "release-operator-placeholder",
        javaRollbackApprover: "rollback-approver-placeholder",
        javaReleaseWindow: "release-window-placeholder",
        javaOperatorSignoffPlaceholder: "operator-signoff-placeholder",
        miniKvVersion: "mini-kv v73",
        miniKvDigestVersion: "mini-kv-retained-restore-artifact-digest.v1",
        miniKvRetentionId: "mini-kv-retained-restore-artifact-digest-v73",
        miniKvRestoreArtifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>",
        miniKvRestoreTargetPlaceholder: "restore-target:<operator-recorded-restore-target>",
        prerequisiteMode: "approval-decision-prerequisite-review-only",
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        approvalDecisionCreated: false,
        approvalLedgerWriteAllowed: false,
        productionReleaseAuthorized: false,
        productionRollbackAuthorized: false,
        productionRestoreAuthorized: false,
      },
      checks: {
        sourcePreApprovalPacketReady: true,
        sourcePreApprovalPacketDigestValid: true,
        sourcePreApprovalStillBlocksApprovalAndProduction: true,
        sourcePreApprovalReferencesNodeV178: true,
        javaV64SignoffFixtureReady: true,
        javaSignoffRecordComplete: true,
        javaRequiredSignoffFieldsComplete: true,
        javaSignoffArtifactsComplete: true,
        javaNodeConsumptionSafe: true,
        javaProductionBoundariesClosed: true,
        javaForbiddenOperationsComplete: true,
        miniKvV73DigestFixtureReady: true,
        miniKvDigestTargetComplete: true,
        miniKvRetainedDigestEvidenceComplete: true,
        miniKvCheckJsonDigestEvidenceReadOnly: true,
        miniKvBoundariesClosed: true,
        miniKvPauseConditionsComplete: true,
        prerequisiteSignalsComplete: true,
        remainingApprovalBlockersExplicit: true,
        prerequisiteStepsReadOnly: true,
        forbiddenOperationsCovered: true,
        pauseConditionsComplete: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        noApprovalDecisionCreated: true,
        noApprovalLedgerWrite: true,
        noReleaseExecution: true,
        noDeploymentExecution: true,
        noRollbackExecution: true,
        noRestoreExecution: true,
        noProductionSecretRead: true,
        noProductionDatabaseConnection: true,
        noProductionIdpConnection: true,
        readyForApprovalDecisionStillFalse: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionRestoreStillFalse: true,
        gateDigestValid: true,
        readyForApprovalDecisionPrerequisiteGate: true,
      },
      artifacts: {
        sourceProductionReleasePreApprovalPacket: {
          profileVersion: "production-release-pre-approval-packet.v1",
          packetState: "ready-for-production-release-pre-approval-review",
          readyForProductionReleasePreApprovalPacket: true,
          readyForApprovalDecision: false,
          executionAllowed: false,
        },
        javaReleaseOperatorSignoffFixture: {
          plannedVersion: "Java v64",
          fixtureVersion: "java-release-operator-signoff-fixture.v1",
          signoffRecord: {
            releaseOperator: "release-operator-placeholder",
            rollbackApprover: "rollback-approver-placeholder",
            releaseWindow: "release-window-placeholder",
            artifactTarget: "release-tag-or-artifact-version-placeholder",
            operatorSignoffPlaceholder: "operator-signoff-placeholder",
            operatorMustReplacePlaceholders: true,
          },
          nodeConsumption: {
            nodeMayRenderApprovalPrerequisiteGate: true,
            nodeMayCreateApprovalDecision: false,
            nodeMayWriteApprovalLedger: false,
            nodeMayTriggerDeployment: false,
            nodeMayTriggerRollback: false,
            nodeMayExecuteRollbackSql: false,
          },
        },
        miniKvRetainedRestoreArtifactDigest: {
          plannedVersion: "mini-kv v73",
          digestVersion: "mini-kv-retained-restore-artifact-digest.v1",
          projectVersion: "0.73.0",
          digestTarget: {
            retentionId: "mini-kv-retained-restore-artifact-digest-v73",
            restoreTargetPlaceholder: "restore-target:<operator-recorded-restore-target>",
            restoreArtifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>",
            snapshotReviewDigestPlaceholder: "sha256:<operator-retained-snapshot-review-digest>",
            walReviewDigestPlaceholder: "sha256:<operator-retained-wal-review-digest>",
            retentionOwner: "operator:<retained-restore-artifact-owner>",
          },
          orderAuthoritative: false,
        },
        noExecutionBoundary: {
          nodeMayCreateApprovalDecision: false,
          nodeMayWriteApprovalLedger: false,
          nodeMayTriggerRelease: false,
          nodeMayExecuteJavaRollbackSql: false,
          nodeMayExecuteMiniKvRestore: false,
          nodeMayStartJava: false,
          nodeMayStartMiniKv: false,
          nodeMayReadSecretValues: false,
          nodeMayConnectProductionDatabase: false,
        },
      },
      summary: {
        checkCount: 39,
        passedCheckCount: 39,
        prerequisiteSignalCount: 5,
        remainingApprovalBlockerCount: 4,
        prerequisiteStepCount: 6,
        forbiddenOperationCount: 12,
        pauseConditionCount: 9,
        javaRequiredSignoffFieldCount: 7,
        javaSignoffArtifactCount: 6,
        miniKvRetainedDigestFieldCount: 7,
        miniKvCheckJsonCommandCount: 8,
        sourcePreApprovalCheckCount: 33,
        sourcePreApprovalPassedCheckCount: 33,
        productionBlockerCount: 0,
      },
    });
    expect(profile.gate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.gate.sourcePreApprovalPacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.prerequisiteSignals.map((signal) => signal.id)).toEqual(expect.arrayContaining([
      "java-release-operator-signoff-present",
      "mini-kv-retained-artifact-digests-present",
      "mini-kv-order-authority-closed",
    ]));
    expect(profile.remainingApprovalBlockers.every((blocker) => (
      blocker.blocksRealApprovalDecision && !blocker.blocksDryRunEnvelope
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toEqual(expect.arrayContaining([
      "Create approval decision from Node v180",
      "Write approval ledger from Node v180",
      "Execute mini-kv restore from Node v180",
    ]));
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_APPROVAL_LEDGER_DRY_RUN_ENVELOPE",
    );
  });

  it("blocks the gate when v179 identity headers are missing", () => {
    const profile = loadApprovalDecisionPrerequisiteGate(
      loadTestConfig("memory://approval-decision-prerequisite-missing-identity"),
    );

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForApprovalDecisionPrerequisiteGate).toBe(false);
    expect(profile.readyForApprovalLedgerDryRunEnvelope).toBe(false);
    expect(profile.checks.sourcePreApprovalPacketReady).toBe(false);
    expect(profile.artifacts.sourceProductionReleasePreApprovalPacket).toMatchObject({
      packetState: "blocked",
      readyForProductionReleasePreApprovalPacket: false,
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain(
      "SOURCE_PRE_APPROVAL_PACKET_NOT_READY",
    );
  });

  it("blocks the gate when upstream actions are enabled", () => {
    const profile = loadApprovalDecisionPrerequisiteGate(
      loadTestConfig("memory://approval-decision-prerequisite-actions-enabled", {
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForApprovalDecisionPrerequisiteGate).toBe(false);
    expect(profile.gate.upstreamActionsEnabled).toBe(true);
    expect(profile.checks.sourcePreApprovalPacketReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes prerequisite gate routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-approval-prerequisite-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/approval-decision-prerequisite-gate",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/approval-decision-prerequisite-gate?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        gateState: "ready-for-approval-decision-prerequisite-review",
        readyForApprovalDecisionPrerequisiteGate: true,
        readyForApprovalLedgerDryRunEnvelope: true,
        readyForApprovalDecision: false,
        gate: {
          javaFixtureVersion: "java-release-operator-signoff-fixture.v1",
          miniKvDigestVersion: "mini-kv-retained-restore-artifact-digest.v1",
          approvalDecisionCreated: false,
          approvalLedgerWriteAllowed: false,
          productionReleaseAuthorized: false,
        },
        checks: {
          sourcePreApprovalPacketReady: true,
          javaV64SignoffFixtureReady: true,
          miniKvV73DigestFixtureReady: true,
          noApprovalDecisionCreated: true,
          noApprovalLedgerWrite: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Approval decision prerequisite gate");
      expect(markdown.body).toContain("java-release-operator-signoff-fixture.v1");
      expect(markdown.body).toContain("mini-kv-retained-restore-artifact-digest.v1");
      expect(markdown.body).toContain("## Remaining Approval Blockers");
      expect(markdown.body).toContain("Create approval decision from Node v180");
      expect(markdown.body).toContain("PROCEED_TO_APPROVAL_LEDGER_DRY_RUN_ENVELOPE");
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
