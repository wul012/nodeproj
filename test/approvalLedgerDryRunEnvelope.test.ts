import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadApprovalLedgerDryRunEnvelope,
} from "../src/services/approvalLedgerDryRunEnvelope.js";

describe("Approval ledger dry-run envelope", () => {
  it("wraps the v180 prerequisite gate as a non-persistent ledger envelope", () => {
    const profile = loadApprovalLedgerDryRunEnvelope(
      loadTestConfig("memory://approval-ledger-dry-run-envelope"),
      {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "approval-ledger-dry-run-envelope.v1",
      envelopeState: "ready-for-approval-ledger-dry-run-review",
      readyForApprovalLedgerDryRunEnvelope: true,
      readyForApprovalDecision: false,
      readyForApprovalLedgerWrite: false,
      readyForProductionAuth: false,
      readyForProductionRelease: false,
      readyForProductionRollback: false,
      readyForProductionRestore: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      envelope: {
        sourcePrerequisiteGateVersion: "approval-decision-prerequisite-gate.v1",
        sourcePrerequisiteGateState: "ready-for-approval-decision-prerequisite-review",
        sourcePrerequisiteGateReady: true,
        sourceReadyForDryRunEnvelope: true,
        approvalLedgerCandidateVersion: "approval-ledger-candidate.v1",
        auditContextVersion: "approval-ledger-audit-context.v1",
        rollbackBoundaryVersion: "approval-ledger-rollback-boundary.v1",
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
        sourcePrerequisiteGateReady: true,
        sourcePrerequisiteGateDigestValid: true,
        sourcePrerequisiteStillBlocksApprovalAndProduction: true,
        sourcePrerequisiteNoLedgerWrite: true,
        ledgerCandidateFieldsComplete: true,
        ledgerCandidateFieldsNonPersistent: true,
        idempotencyKeyPresent: true,
        auditContextDryRunOnly: true,
        rollbackBoundaryClosed: true,
        dryRunStepsReadOnly: true,
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
        readyForApprovalLedgerWriteStillFalse: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionRestoreStillFalse: true,
        envelopeDigestValid: true,
        readyForApprovalLedgerDryRunEnvelope: true,
      },
      artifacts: {
        sourceApprovalDecisionPrerequisiteGate: {
          profileVersion: "approval-decision-prerequisite-gate.v1",
          gateState: "ready-for-approval-decision-prerequisite-review",
          readyForApprovalDecisionPrerequisiteGate: true,
          readyForApprovalLedgerDryRunEnvelope: true,
          readyForApprovalDecision: false,
          executionAllowed: false,
        },
        approvalLedgerCandidate: {
          version: "approval-ledger-candidate.v1",
          fieldCount: 10,
          candidateCanBePersisted: false,
          writesApprovalLedger: false,
        },
        auditContext: {
          version: "approval-ledger-audit-context.v1",
          secretValuesIncluded: false,
          productionDatabaseConnectionRequired: false,
        },
        rollbackBoundary: {
          version: "approval-ledger-rollback-boundary.v1",
          javaRollbackSqlAllowed: false,
          miniKvRestoreAllowed: false,
          releaseExecutionAllowed: false,
          waitsForJavaV65AndMiniKvV74: true,
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
        checkCount: 30,
        passedCheckCount: 30,
        ledgerCandidateFieldCount: 10,
        dryRunStepCount: 5,
        forbiddenOperationCount: 10,
        pauseConditionCount: 9,
        sourcePrerequisiteCheckCount: 39,
        sourcePrerequisitePassedCheckCount: 39,
        productionBlockerCount: 0,
      },
    });
    expect(profile.envelope.envelopeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.envelope.sourcePrerequisiteGateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.envelope.idempotencyKey).toMatch(/^approval-ledger-dry-run:[a-f0-9]{16}$/);
    expect(profile.ledgerCandidateFields.map((field) => field.name)).toEqual(expect.arrayContaining([
      "releaseOperator",
      "rollbackApprover",
      "releaseWindow",
      "miniKvRestoreArtifactDigest",
      "approvalLedgerWriteAllowed",
    ]));
    expect(profile.ledgerCandidateFields.every((field) => !field.nodeMayInfer && !field.writesLedger)).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toEqual(expect.arrayContaining([
      "Create approval decision from Node v181",
      "Write approval ledger from Node v181",
      "Execute mini-kv restore from Node v181",
    ]));
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_RECOMMENDED_PARALLEL_JAVA_V65_MINI_KV_V74",
    );
  });

  it("blocks the envelope when v180 identity headers are missing", () => {
    const profile = loadApprovalLedgerDryRunEnvelope(
      loadTestConfig("memory://approval-ledger-dry-run-missing-identity"),
    );

    expect(profile.envelopeState).toBe("blocked");
    expect(profile.readyForApprovalLedgerDryRunEnvelope).toBe(false);
    expect(profile.checks.sourcePrerequisiteGateReady).toBe(false);
    expect(profile.artifacts.sourceApprovalDecisionPrerequisiteGate).toMatchObject({
      gateState: "blocked",
      readyForApprovalDecisionPrerequisiteGate: false,
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain(
      "SOURCE_PREREQUISITE_GATE_NOT_READY",
    );
  });

  it("blocks the envelope when upstream actions are enabled", () => {
    const profile = loadApprovalLedgerDryRunEnvelope(
      loadTestConfig("memory://approval-ledger-dry-run-actions-enabled", {
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      },
    );

    expect(profile.envelopeState).toBe("blocked");
    expect(profile.readyForApprovalLedgerDryRunEnvelope).toBe(false);
    expect(profile.envelope.upstreamActionsEnabled).toBe(true);
    expect(profile.checks.sourcePrerequisiteGateReady).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes dry-run envelope routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-approval-ledger-envelope-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "release-reviewer-1",
        "x-orderops-roles": "viewer,operator",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/approval-ledger-dry-run-envelope",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/approval-ledger-dry-run-envelope?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        envelopeState: "ready-for-approval-ledger-dry-run-review",
        readyForApprovalLedgerDryRunEnvelope: true,
        readyForApprovalDecision: false,
        readyForApprovalLedgerWrite: false,
        envelope: {
          sourcePrerequisiteGateVersion: "approval-decision-prerequisite-gate.v1",
          approvalLedgerWriteAllowed: false,
          approvalLedgerWritten: false,
          productionReleaseAuthorized: false,
        },
        checks: {
          sourcePrerequisiteGateReady: true,
          ledgerCandidateFieldsComplete: true,
          noApprovalDecisionCreated: true,
          noApprovalLedgerWrite: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Approval ledger dry-run envelope");
      expect(markdown.body).toContain("approval-ledger-candidate.v1");
      expect(markdown.body).toContain("## Ledger Candidate Fields");
      expect(markdown.body).toContain("Write approval ledger from Node v181");
      expect(markdown.body).toContain("PROCEED_TO_RECOMMENDED_PARALLEL_JAVA_V65_MINI_KV_V74");
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
