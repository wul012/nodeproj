import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadProductionReleasePreApprovalPacket,
} from "../src/services/productionReleasePreApprovalPacket.js";

describe("Production release pre-approval packet", () => {
  it("builds a manual pre-approval packet from v178 without creating an approval decision", () => {
    const profile = loadProductionReleasePreApprovalPacket(
      loadTestConfig("memory://production-release-pre-approval-packet"),
      {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "production-release-pre-approval-packet.v1",
      packetState: "ready-for-production-release-pre-approval-review",
      readyForProductionReleasePreApprovalPacket: true,
      readyForApprovalDecision: false,
      readyForProductionAuth: false,
      readyForProductionRelease: false,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readyForProductionRestore: false,
      readOnly: true,
      preApprovalOnly: true,
      executionAllowed: false,
      packet: {
        sourceRetentionGateProfileVersion: "cross-project-evidence-retention-gate.v1",
        sourceRetentionGateState: "ready-for-cross-project-evidence-retention-review",
        sourceRetentionGateReady: true,
        sourceIdentityGateState: "ready-for-operator-identity-evidence",
        javaVersion: "Java v63",
        javaFixtureVersion: "java-release-audit-retention-fixture.v1",
        javaRetentionId: "release-retention-record-placeholder",
        miniKvVersion: "mini-kv v72",
        miniKvRetentionVersion: "mini-kv-restore-evidence-retention.v1",
        miniKvRetentionId: "mini-kv-restore-retention-v72",
        packetMode: "manual-production-release-pre-approval-review-only",
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        approvalDecisionCreated: false,
        approvalLedgerWriteAllowed: false,
        productionAuthReady: false,
        productionReleaseAuthorized: false,
        productionDeploymentAuthorized: false,
        productionRollbackAuthorized: false,
        productionRestoreAuthorized: false,
      },
      checks: {
        sourceRetentionGateReady: true,
        sourceRetentionGateDigestValid: true,
        sourceRetentionGateStillBlocksProduction: true,
        sourceRetentionGateReferencesNodeV177: true,
        sourceRetentionGateReferencesJavaV63: true,
        sourceRetentionGateReferencesMiniKvV72: true,
        preApprovalChecklistComplete: true,
        operatorConfirmationsRemainManual: true,
        missingEvidenceBlocksApprovalDecision: true,
        missingEvidenceCoversProductionHazards: true,
        preApprovalStepsComplete: true,
        preApprovalStepsReadOnly: true,
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
        readyForProductionAuthStillFalse: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionDeploymentStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionRestoreStillFalse: true,
        packetDigestValid: true,
        readyForProductionReleasePreApprovalPacket: true,
      },
      artifacts: {
        sourceCrossProjectEvidenceRetentionGate: {
          profileVersion: "cross-project-evidence-retention-gate.v1",
          gateState: "ready-for-cross-project-evidence-retention-review",
          readyForCrossProjectEvidenceRetentionGate: true,
          readyForProductionAuth: false,
          readyForProductionRelease: false,
          readyForProductionRestore: false,
          executionAllowed: false,
          javaFixtureVersion: "java-release-audit-retention-fixture.v1",
          javaRetentionId: "release-retention-record-placeholder",
          miniKvRetentionVersion: "mini-kv-restore-evidence-retention.v1",
          miniKvRetentionId: "mini-kv-restore-retention-v72",
        },
        preApprovalBoundary: {
          nodeMayCreateApprovalDecision: false,
          nodeMayWriteApprovalLedger: false,
          nodeMayTriggerRelease: false,
          nodeMayTriggerDeployment: false,
          nodeMayTriggerRollback: false,
          nodeMayExecuteJavaRollbackSql: false,
          nodeMayExecuteMiniKvRestore: false,
          nodeMayStartJava: false,
          nodeMayStartMiniKv: false,
          nodeMayReadSecretValues: false,
          nodeMayConnectProductionDatabase: false,
          nodeMayConnectProductionIdp: false,
        },
      },
      summary: {
        checkCount: 33,
        passedCheckCount: 33,
        checklistItemCount: 8,
        operatorConfirmationChecklistCount: 5,
        missingEvidenceCount: 5,
        missingEvidenceBlockingDecisionCount: 5,
        preApprovalStepCount: 6,
        forbiddenOperationCount: 12,
        pauseConditionCount: 9,
        sourceRetentionGateCheckCount: 32,
        sourceRetentionGatePassedCheckCount: 32,
        productionBlockerCount: 0,
      },
    });
    expect(profile.packet.packetDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packet.sourceRetentionGateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preApprovalChecklist.map((item) => item.id)).toEqual(expect.arrayContaining([
      "operator-identity-reviewed",
      "retention-placeholders-reviewed",
      "rollback-owner-confirmed",
    ]));
    expect(profile.missingEvidence.map((item) => item.id)).toEqual(expect.arrayContaining([
      "real-production-idp",
      "release-operator-signoff",
      "rollback-approver-signoff",
      "retained-artifact-digests",
    ]));
    expect(profile.missingEvidence.every((item) => item.blocksApprovalDecision && !item.nodeMayFill)).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toEqual(expect.arrayContaining([
      "Create production approval decision from Node v179",
      "Trigger production release from Node v179",
      "Execute mini-kv restore from Node v179",
    ]));
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "START_POST_PRE_APPROVAL_PLAN",
    );
  });

  it("blocks pre-approval when v178 identity headers are missing", () => {
    const profile = loadProductionReleasePreApprovalPacket(
      loadTestConfig("memory://production-release-pre-approval-missing-identity"),
    );

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForProductionReleasePreApprovalPacket).toBe(false);
    expect(profile.checks.sourceRetentionGateReady).toBe(false);
    expect(profile.checks.sourceRetentionGateReferencesNodeV177).toBe(false);
    expect(profile.artifacts.sourceCrossProjectEvidenceRetentionGate).toMatchObject({
      gateState: "blocked",
      readyForCrossProjectEvidenceRetentionGate: false,
      sourceNodeIdentityGateState: "blocked",
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("SOURCE_RETENTION_GATE_NOT_READY");
  });

  it("blocks pre-approval when upstream actions are enabled", () => {
    const profile = loadProductionReleasePreApprovalPacket(
      loadTestConfig("memory://production-release-pre-approval-actions-enabled", {
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile.packetState).toBe("blocked");
    expect(profile.readyForProductionReleasePreApprovalPacket).toBe(false);
    expect(profile.packet.upstreamActionsEnabled).toBe(true);
    expect(profile.checks.sourceRetentionGateReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes pre-approval packet routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-pre-approval-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-pre-approval-packet",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-pre-approval-packet?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        packetState: "ready-for-production-release-pre-approval-review",
        readyForProductionReleasePreApprovalPacket: true,
        readyForApprovalDecision: false,
        packet: {
          sourceRetentionGateProfileVersion: "cross-project-evidence-retention-gate.v1",
          approvalDecisionCreated: false,
          productionReleaseAuthorized: false,
        },
        checks: {
          sourceRetentionGateReady: true,
          preApprovalChecklistComplete: true,
          missingEvidenceBlocksApprovalDecision: true,
          noApprovalDecisionCreated: true,
          noApprovalLedgerWrite: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production release pre-approval packet");
      expect(markdown.body).toContain("manual-production-release-pre-approval-review-only");
      expect(markdown.body).toContain("## Missing Evidence");
      expect(markdown.body).toContain("### real-production-idp");
      expect(markdown.body).toContain("Create production approval decision from Node v179");
      expect(markdown.body).toContain("START_POST_PRE_APPROVAL_PLAN");
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
