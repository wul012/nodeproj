import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadCrossProjectEvidenceRetentionGate,
} from "../src/services/crossProjectEvidenceRetentionGate.js";

describe("Cross-project evidence retention gate", () => {
  it("summarizes Node v177, Java v63, and mini-kv v72 retention evidence without authorizing production actions", () => {
    const profile = loadCrossProjectEvidenceRetentionGate(
      loadTestConfig("memory://cross-project-evidence-retention-gate"),
      {
        "x-orderops-operator-id": "smoke-operator-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "cross-project-evidence-retention-gate.v1",
      gateState: "ready-for-cross-project-evidence-retention-review",
      readyForCrossProjectEvidenceRetentionGate: true,
      readyForProductionAuth: false,
      readyForProductionRelease: false,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readyForProductionRestore: false,
      readOnly: true,
      executionAllowed: false,
      gate: {
        sourceNodeIdentityProfileVersion: "ci-operator-identity-evidence-packet.v1",
        sourceNodeIdentityGateState: "ready-for-operator-identity-evidence",
        javaVersion: "Java v63",
        javaFixtureVersion: "java-release-audit-retention-fixture.v1",
        javaRetentionId: "release-retention-record-placeholder",
        javaRetentionDays: 180,
        miniKvVersion: "mini-kv v72",
        miniKvRetentionVersion: "mini-kv-restore-evidence-retention.v1",
        miniKvRetentionId: "mini-kv-restore-retention-v72",
        miniKvRetentionDays: 90,
        gateMode: "cross-project-retention-review-only",
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        productionAuthReady: false,
        productionReleaseAuthorized: false,
        productionDeploymentAuthorized: false,
        productionRollbackAuthorized: false,
        productionRestoreAuthorized: false,
      },
      checks: {
        nodeV177IdentityEvidenceReady: true,
        nodeV177IdentityDigestValid: true,
        nodeV177StillBlocksProduction: true,
        javaV63RetentionFixtureReady: true,
        javaRetentionRecordComplete: true,
        javaAuditExportFieldsComplete: true,
        javaNodeConsumptionReadOnly: true,
        javaProductionBoundariesClosed: true,
        miniKvV72RetentionFixtureReady: true,
        miniKvRetentionTargetComplete: true,
        miniKvRetainedEvidenceComplete: true,
        miniKvCheckJsonRiskEvidenceRetained: true,
        miniKvWriteAndAdminCommandsNotExecuted: true,
        miniKvBoundariesClosed: true,
        retentionGateStepsReadOnly: true,
        forbiddenOperationsCovered: true,
        upstreamActionsStillDisabled: true,
        noProductionSecretRead: true,
        noProductionDatabaseConnection: true,
        readyForProductionAuthStillFalse: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionRestoreStillFalse: true,
        gateDigestValid: true,
        readyForCrossProjectEvidenceRetentionGate: true,
      },
      artifacts: {
        nodeOperatorIdentityEvidencePacket: {
          profileVersion: "ci-operator-identity-evidence-packet.v1",
          packetState: "ready-for-operator-identity-evidence",
          readyForCiOperatorIdentityEvidencePacket: true,
          readyForProductionAuth: false,
          executionAllowed: false,
          localSmokeOperatorId: "smoke-operator-1",
          localSmokeRoles: ["viewer", "operator"],
        },
        javaReleaseAuditRetentionFixture: {
          plannedVersion: "Java v63",
          fixtureVersion: "java-release-audit-retention-fixture.v1",
          retentionRecord: {
            retentionId: "release-retention-record-placeholder",
            releaseOperator: "release-operator-placeholder",
            artifactTarget: "release-tag-or-artifact-version-placeholder",
            retentionDays: 180,
            operatorMustReplacePlaceholders: true,
          },
          nodeConsumption: {
            nodeMayRenderRetentionGate: true,
            nodeMayTriggerDeployment: false,
            nodeMayTriggerRollback: false,
            nodeMayWriteAuditExport: false,
            nodeMayReadSecretValues: false,
          },
        },
        miniKvRestoreEvidenceRetention: {
          plannedVersion: "mini-kv v72",
          retentionVersion: "mini-kv-restore-evidence-retention.v1",
          projectVersion: "0.72.0",
          retentionTarget: {
            retentionId: "mini-kv-restore-retention-v72",
            artifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>",
            snapshotReviewRetention: "sha256:<operator-retained-snapshot-review-digest>",
            walReviewRetention: "sha256:<operator-retained-wal-review-digest>",
            retentionDays: 90,
          },
          checkjsonRetentionEvidence: {
            writeCommandsExecuted: false,
            adminCommandsExecuted: false,
            retentionGateInput: true,
          },
          orderAuthoritative: false,
        },
        noExecutionBoundary: {
          upstreamActionsEnabled: false,
          automaticUpstreamStart: false,
          nodeMayStartJava: false,
          nodeMayStartMiniKv: false,
          nodeMayTriggerJavaDeployment: false,
          nodeMayTriggerJavaRollback: false,
          nodeMayExecuteRollbackSql: false,
          nodeMayExecuteMiniKvRestore: false,
          nodeMayExecuteMiniKvAdminCommand: false,
          nodeMayReadSecretValues: false,
          nodeMayConnectProductionDatabase: false,
        },
      },
      summary: {
        checkCount: 32,
        passedCheckCount: 32,
        sourceEvidenceCount: 3,
        retentionGateStepCount: 6,
        forbiddenOperationCount: 10,
        pauseConditionCount: 8,
        javaAuditExportFieldCount: 7,
        javaRetainedArtifactCount: 5,
        miniKvRetainedEvidenceFieldCount: 8,
        miniKvCheckJsonCommandCount: 8,
        productionBlockerCount: 0,
      },
    });
    expect(profile.gate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.gate.sourceNodeIdentityPacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.retentionGateSteps.every((step) => (
      step.readOnly
      && !step.executionAllowed
      && !step.mutatesState
      && !step.executesRelease
      && !step.executesDeployment
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toEqual(expect.arrayContaining([
      "Trigger Java deployment from Node v178",
      "Execute mini-kv restore from Node v178",
      "Create release approval decision",
    ]));
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PREPARE_PRODUCTION_RELEASE_PRE_APPROVAL_PACKET",
    );
  });

  it("blocks the gate when Node v177 identity headers are missing", () => {
    const profile = loadCrossProjectEvidenceRetentionGate(
      loadTestConfig("memory://cross-project-evidence-retention-gate-missing-identity"),
    );

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForCrossProjectEvidenceRetentionGate).toBe(false);
    expect(profile.checks.nodeV177IdentityEvidenceReady).toBe(false);
    expect(profile.artifacts.nodeOperatorIdentityEvidencePacket).toMatchObject({
      packetState: "blocked",
      readyForCiOperatorIdentityEvidencePacket: false,
      localSmokeOperatorId: null,
      localSmokeRoles: [],
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain(
      "NODE_V177_IDENTITY_EVIDENCE_NOT_READY",
    );
  });

  it("blocks the gate when upstream actions are enabled", () => {
    const profile = loadCrossProjectEvidenceRetentionGate(
      loadTestConfig("memory://cross-project-evidence-retention-gate-actions-enabled", {
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      {
        "x-orderops-operator-id": "smoke-operator-1",
        "x-orderops-roles": "viewer",
      },
    );

    expect(profile.gateState).toBe("blocked");
    expect(profile.readyForCrossProjectEvidenceRetentionGate).toBe(false);
    expect(profile.gate.upstreamActionsEnabled).toBe(true);
    expect(profile.checks.nodeV177IdentityEvidenceReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes cross-project evidence retention gate routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-cross-project-retention-gate-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "smoke-operator-1",
        "x-orderops-roles": "viewer,operator",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/cross-project-evidence-retention-gate",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/cross-project-evidence-retention-gate?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        gateState: "ready-for-cross-project-evidence-retention-review",
        readyForCrossProjectEvidenceRetentionGate: true,
        gate: {
          javaFixtureVersion: "java-release-audit-retention-fixture.v1",
          miniKvRetentionVersion: "mini-kv-restore-evidence-retention.v1",
          productionReleaseAuthorized: false,
          productionRestoreAuthorized: false,
        },
        checks: {
          nodeV177IdentityEvidenceReady: true,
          javaV63RetentionFixtureReady: true,
          miniKvV72RetentionFixtureReady: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Cross-project evidence retention gate");
      expect(markdown.body).toContain("java-release-audit-retention-fixture.v1");
      expect(markdown.body).toContain("mini-kv-restore-evidence-retention.v1");
      expect(markdown.body).toContain("### Step 1: collect");
      expect(markdown.body).toContain("PREPARE_PRODUCTION_RELEASE_PRE_APPROVAL_PACKET");
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
