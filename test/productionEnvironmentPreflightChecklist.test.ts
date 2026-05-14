import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadProductionEnvironmentPreflightChecklist,
} from "../src/services/productionEnvironmentPreflightChecklist.js";

describe("production environment preflight checklist", () => {
  it("combines Java v59 and mini-kv v68 environment evidence without authorizing production operations", () => {
    const profile = loadProductionEnvironmentPreflightChecklist(
      loadTestConfig("memory://production-environment-preflight-checklist"),
    );

    expect(profile).toMatchObject({
      profileVersion: "production-environment-preflight-checklist.v1",
      checklistState: "ready-for-manual-environment-review",
      readyForProductionEnvironmentPreflightChecklist: true,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      checklist: {
        previousPreflightVersion: "rollback-execution-preflight-contract.v1",
        javaVersion: "Java v59",
        javaContractVersion: "java-production-secret-source-contract.v1",
        miniKvVersion: "mini-kv v68",
        miniKvMatrixVersion: "mini-kv-artifact-digest-compatibility-matrix.v1",
        nodeBaselineTag: "v167",
        environmentMode: "manual-environment-preflight-only",
        nodeMayRenderChecklist: true,
        nodeMayReadSecretValues: false,
        nodeMayModifyRuntimeConfig: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayExecuteMiniKvAdminCommands: false,
        nodeMayConnectProductionDatabase: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        productionEnvironmentAuthorized: false,
        productionRollbackAuthorized: false,
      },
      checks: {
        previousPreflightReady: true,
        previousPreflightDoesNotAuthorizeRollback: true,
        javaV59ContractReady: true,
        javaContractVersionReady: true,
        javaSecretSourceMetadataComplete: true,
        javaRotationPolicyComplete: true,
        javaConfirmationFieldsComplete: true,
        javaSecretValuesClosed: true,
        javaNodeConsumptionReadOnly: true,
        javaProductionBoundaryClosed: true,
        javaForbiddenOperationsComplete: true,
        javaArchiveRootUsesC: true,
        miniKvV68MatrixReady: true,
        miniKvMatrixVersionReady: true,
        miniKvReleaseMappingReady: true,
        miniKvDigestMatrixComplete: true,
        miniKvFixtureInputsComplete: true,
        miniKvCompatibilityChecksComplete: true,
        miniKvReadOnlySmokeComplete: true,
        miniKvDangerousCommandsExplainedOnly: true,
        miniKvExecutionBoundariesClosed: true,
        miniKvOrderAuthorityClosed: true,
        miniKvArchiveRootUsesC: true,
        preflightStepsDryRunOnly: true,
        forbiddenOperationsCovered: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        noProductionSecretRead: true,
        noProductionDatabaseConnection: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionOperationsStillFalse: true,
        readyForProductionEnvironmentPreflightChecklist: true,
      },
      artifacts: {
        javaProductionSecretSourceContract: {
          plannedVersion: "Java v59",
          evidenceTag: "v59订单平台production-secret-source-contract",
          contractEndpoint: "/contracts/production-secret-source-contract.sample.json",
          contractMode: "READ_ONLY_SECRET_SOURCE_CONTRACT",
          selectedSourceType: "external-secret-manager",
          secretManagerOwner: "platform-security-owner",
          rotationOwner: "security-operations-owner",
          nodeMayReadSecretValues: false,
          sourceValueRecorded: false,
          secretNamesRecorded: false,
          archivePath: "c/59",
        },
        miniKvArtifactDigestCompatibilityMatrix: {
          plannedVersion: "mini-kv v68",
          evidenceTag: "第六十八版产物摘要兼容矩阵",
          matrixVersion: "mini-kv-artifact-digest-compatibility-matrix.v1",
          projectVersion: "0.68.0",
          releaseVersion: "v68",
          targetReleaseVersion: "v68",
          previousReleaseVersion: "v67",
          digestIds: [
            "binary-digest",
            "wal-checksum-evidence",
            "snapshot-digest-evidence",
            "fixture-digest",
          ],
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
          archivePath: "c/68",
        },
      },
      summary: {
        checklistCheckCount: 32,
        passedChecklistCheckCount: 32,
        preflightArtifactCount: 3,
        preflightStepCount: 6,
        forbiddenOperationCount: 9,
        productionBlockerCount: 0,
      },
    });
    expect(profile.checklist.checklistDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.checklist.previousPreflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preflightSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
      && !step.executesRestore
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Read production secret values from Node v168",
    );
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Execute mini-kv LOAD, COMPACT, or SETNXEX",
    );
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_POST_V166_READINESS_SUMMARY",
    );
  });

  it("blocks the environment checklist when upstream actions are enabled", () => {
    const profile = loadProductionEnvironmentPreflightChecklist(loadTestConfig(
      "memory://production-environment-preflight-checklist-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.checklistState).toBe("blocked");
    expect(profile.readyForProductionEnvironmentPreflightChecklist).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.checklist.upstreamActionsEnabled).toBe(true);
    expect(profile.checklist.productionEnvironmentAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes production environment preflight routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-environment-preflight-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/environment-preflight-checklist",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/environment-preflight-checklist?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        checklistState: "ready-for-manual-environment-review",
        readyForProductionEnvironmentPreflightChecklist: true,
        checks: {
          javaSecretValuesClosed: true,
          miniKvExecutionBoundariesClosed: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production environment preflight checklist");
      expect(markdown.body).toContain("Java v59");
      expect(markdown.body).toContain("mini-kv v68");
      expect(markdown.body).toContain("PROCEED_TO_POST_V166_READINESS_SUMMARY");
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
