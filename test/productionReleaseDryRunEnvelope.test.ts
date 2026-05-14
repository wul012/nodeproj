import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadProductionReleaseDryRunEnvelope,
} from "../src/services/productionReleaseDryRunEnvelope.js";

describe("production release dry-run envelope", () => {
  it("wraps the v173 packet as a dry-run envelope without authorizing production actions", () => {
    const profile = loadProductionReleaseDryRunEnvelope(
      loadTestConfig("memory://production-release-dry-run-envelope"),
    );

    expect(profile).toMatchObject({
      profileVersion: "production-release-dry-run-envelope.v1",
      envelopeState: "ready-for-manual-production-release-dry-run",
      readyForProductionReleaseDryRunEnvelope: true,
      readyForProductionRelease: false,
      readyForProductionDeployment: false,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      envelope: {
        sourcePacketProfileVersion: "release-window-readiness-packet.v1",
        sourcePacketState: "ready-for-manual-release-window-review",
        sourceReadyForReleaseWindowReadinessPacket: true,
        envelopeMode: "manual-production-release-dry-run-only",
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
        sourcePacketReady: true,
        sourcePacketDigestValid: true,
        sourcePacketStillBlocksProduction: true,
        sourcePacketReferencesJavaV61: true,
        sourcePacketReferencesMiniKvV70: true,
        dryRunStepsComplete: true,
        dryRunStepsReadOnly: true,
        operatorConfirmationsComplete: true,
        pauseConditionsComplete: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        noReleaseExecution: true,
        noDeploymentExecution: true,
        noRollbackExecution: true,
        noRestoreExecution: true,
        noSqlExecution: true,
        noProductionSecretRead: true,
        noProductionDatabaseConnection: true,
        readyForProductionReleaseStillFalse: true,
        readyForProductionDeploymentStillFalse: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionOperationsStillFalse: true,
        envelopeDigestValid: true,
        readyForProductionReleaseDryRunEnvelope: true,
      },
      artifacts: {
        sourceReleaseWindowReadinessPacket: {
          profileVersion: "release-window-readiness-packet.v1",
          packetState: "ready-for-manual-release-window-review",
          readyForReleaseWindowReadinessPacket: true,
          readyForProductionRelease: false,
          readyForProductionRollback: false,
          readyForProductionOperations: false,
          executionAllowed: false,
          javaVersion: "Java v61",
          miniKvVersion: "mini-kv v70",
        },
        dryRunEnvelopeBoundary: {
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
        checkCount: 24,
        passedCheckCount: 24,
        dryRunStepCount: 6,
        operatorConfirmationCount: 6,
        pauseConditionCount: 8,
        productionBlockerCount: 0,
      },
    });
    expect(profile.envelope.envelopeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.envelope.sourcePacketDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.dryRunSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.executesRelease
      && !step.executesDeployment
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
    ))).toBe(true);
    expect(profile.operatorConfirmations.every((confirmation) => (
      confirmation.required
      && confirmation.placeholderOnly
      && !confirmation.nodeMayInfer
    ))).toBe(true);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain(
      "PROCEED_TO_PARALLEL_JAVA_V62_MINI_KV_V71",
    );
  });

  it("blocks the dry-run envelope when upstream actions are enabled", () => {
    const profile = loadProductionReleaseDryRunEnvelope(loadTestConfig(
      "memory://production-release-dry-run-envelope-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.envelopeState).toBe("blocked");
    expect(profile.readyForProductionReleaseDryRunEnvelope).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.envelope.upstreamActionsEnabled).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes production release dry-run envelope routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-dry-run-envelope-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-dry-run-envelope",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/release-dry-run-envelope?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        envelopeState: "ready-for-manual-production-release-dry-run",
        readyForProductionReleaseDryRunEnvelope: true,
        checks: {
          sourcePacketReady: true,
          upstreamActionsStillDisabled: true,
          noReleaseExecution: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production release dry-run envelope");
      expect(markdown.body).toContain("release-window-readiness-packet.v1");
      expect(markdown.body).toContain("PROCEED_TO_PARALLEL_JAVA_V62_MINI_KV_V71");
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
