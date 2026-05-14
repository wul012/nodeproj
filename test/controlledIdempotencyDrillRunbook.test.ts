import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadControlledIdempotencyDrillRunbook,
} from "../src/services/controlledIdempotencyDrillRunbook.js";

describe("controlled idempotency drill runbook", () => {
  it("combines Java v53 and mini-kv v62 into a manual dry-run runbook", () => {
    const profile = loadControlledIdempotencyDrillRunbook(loadTestConfig("memory://controlled-idempotency-drill"));

    expect(profile).toMatchObject({
      profileVersion: "controlled-idempotency-drill-runbook.v1",
      runbookState: "ready-for-manual-dry-run",
      readyForControlledIdempotencyDrillRunbook: true,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      runbook: {
        previousReadinessReviewVersion: "idempotency-vertical-readiness-review.v1",
        javaVersionTag: "v53订单平台idempotency-store-abstraction",
        javaStoreAbstractionVersion: "java-idempotency-store.v1",
        miniKvVersionTag: "第六十二版TTL恢复证据",
        miniKvRecoveryCapability: "ttl_token_recovery",
        drillMode: "manual-dry-run-only",
        orderTruthSource: "java-database",
        tokenStoreRole: "disabled-ttl-token-candidate",
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionWriteAuthorized: false,
      },
      checks: {
        previousReadinessReviewReady: true,
        previousReviewDoesNotAuthorizeWrites: true,
        javaV53TagReady: true,
        javaStoreAbstractionReady: true,
        javaActiveStoreDatabaseBacked: true,
        javaMiniKvCandidateDeclaredButDisabled: true,
        javaNodeWritesForbidden: true,
        javaDoesNotChangePaymentInventory: true,
        miniKvV62TagReady: true,
        miniKvRecoveryEvidenceReady: true,
        miniKvExpiredTokensDoNotRevive: true,
        miniKvRestartEvidenceReady: true,
        miniKvOrderAuthoritativeFalse: true,
        miniKvNotInJavaTransactionChain: true,
        drillStepsAreDryRunOnly: true,
        forbiddenOperationsCovered: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionOperationsStillFalse: true,
        readyForControlledIdempotencyDrillRunbook: true,
      },
      artifacts: {
        javaStoreAbstraction: {
          activeStore: "jpa-order-idempotency-store",
          activeStoreMode: "JPA_DATABASE",
          miniKvAdapterCandidate: "mini-kv-ttl-token-adapter",
          miniKvAdapterEnabled: false,
          miniKvConnected: false,
          nodeMayTriggerWrites: false,
        },
        miniKvRecoveryEvidence: {
          evidencePath: "fixtures/ttl-token/recovery-evidence.json",
          claimRecord: "SETEXAT key epoch_millis value",
          replayDropsExpiredToken: true,
          snapshotLoadDropsExpiredToken: true,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
        },
      },
      summary: {
        operatorStepCount: 6,
        forbiddenOperationCount: 6,
        productionBlockerCount: 0,
      },
    });
    expect(profile.runbook.runbookDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.runbook.previousReadinessReviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.operatorSteps.every((step) => step.dryRunOnly && step.readOnly && !step.mutatesState)).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("POST /api/v1/orders");
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain("SETNXEX against a live mini-kv instance");
    expect(profile.warnings.map((warning) => warning.code)).toContain("CONTROLLED_DRILL_RUNBOOK_READY");
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain("START_POST_V161_PLAN");
  });

  it("blocks the runbook when upstream actions are enabled", () => {
    const profile = loadControlledIdempotencyDrillRunbook(loadTestConfig("memory://controlled-idempotency-drill-blocked", {
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.runbookState).toBe("blocked");
    expect(profile.readyForControlledIdempotencyDrillRunbook).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.runbook.productionWriteAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes controlled idempotency drill runbook routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-controlled-idempotency-drill-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/controlled-idempotency-drill-runbook",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/controlled-idempotency-drill-runbook?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        runbookState: "ready-for-manual-dry-run",
        readyForControlledIdempotencyDrillRunbook: true,
        checks: {
          javaMiniKvCandidateDeclaredButDisabled: true,
          miniKvExpiredTokensDoNotRevive: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Controlled idempotency drill runbook");
      expect(markdown.body).toContain("v53订单平台idempotency-store-abstraction");
      expect(markdown.body).toContain("第六十二版TTL恢复证据");
      expect(markdown.body).toContain("START_POST_V161_PLAN");
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
