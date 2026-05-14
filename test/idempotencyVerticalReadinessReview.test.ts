import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadIdempotencyVerticalReadinessReview,
} from "../src/services/idempotencyVerticalReadinessReview.js";

describe("idempotency vertical readiness review", () => {
  it("combines Java v52 and mini-kv v61 evidence into a read-only vertical readiness review", () => {
    const profile = loadIdempotencyVerticalReadinessReview(loadTestConfig("memory://idempotency-review"));

    expect(profile).toMatchObject({
      profileVersion: "idempotency-vertical-readiness-review.v1",
      reviewState: "ready-read-only-vertical-slice",
      readyForIdempotencyVerticalReadinessReview: true,
      readyForControlledIdempotencyDrill: false,
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      review: {
        javaVersionTag: "v52订单平台order-idempotency-boundary",
        javaBoundaryVersion: "java-order-idempotency-boundary.v1",
        javaRequestFingerprintVersion: "order-create-request-sha256.v1",
        miniKvVersionTag: "第六十一版TTL令牌原语",
        miniKvCapability: "ttl_token_primitive",
        miniKvCommand: "SETNXEX key seconds value",
        orderTruthSource: "java-database",
        tokenStoreRole: "ttl-token-candidate-only",
        javaMiniKvConnected: false,
        miniKvOrderAuthoritative: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionWriteAuthorized: false,
      },
      checks: {
        javaV52TagReady: true,
        javaBoundaryVersionReady: true,
        javaRequestFingerprintReady: true,
        javaConflictBeforeMutationReady: true,
        javaKeepsDatabaseAuthoritative: true,
        javaMiniKvDisconnected: true,
        javaDoesNotChangePaymentInventory: true,
        miniKvV61TagReady: true,
        miniKvSetnxexReady: true,
        miniKvAtomicAbsentClaimReady: true,
        miniKvExpirationReady: true,
        miniKvWalBoundaryReady: true,
        miniKvOrderAuthoritativeFalse: true,
        miniKvNotInJavaTransactionChain: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        nodeDoesNotAuthorizeWrites: true,
        readyForProductionOperationsStillFalse: true,
        readyForIdempotencyVerticalReadinessReview: true,
      },
      artifacts: {
        javaBoundary: {
          evidencePath: "/contracts/order-idempotency-boundary.sample.json",
          sameKeyDifferentRequestErrorCode: "IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_REQUEST",
          miniKvConnected: false,
          changesPaymentOrInventoryTransaction: false,
        },
        miniKvTokenPrimitive: {
          evidencePath: "fixtures/ttl-token/index.json",
          duplicateResponse: "0",
          walRecord: "SETEXAT key epoch_millis value",
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
        },
      },
      summary: {
        upstreamEvidenceCount: 2,
        productionBlockerCount: 0,
      },
    });
    expect(profile.review.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.warnings.map((warning) => warning.code)).toContain("IDEMPOTENCY_VERTICAL_SLICE_READY");
    expect(profile.warnings.map((warning) => warning.code)).toContain("JAVA_REMAINS_ORDER_TRUTH_SOURCE");
    expect(profile.warnings.map((warning) => warning.code)).toContain("MINI_KV_TOKEN_CANDIDATE_ONLY");
  });

  it("blocks the readiness review when upstream actions are enabled", () => {
    const profile = loadIdempotencyVerticalReadinessReview(loadTestConfig("memory://idempotency-review-blocked", {
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForIdempotencyVerticalReadinessReview).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.review.productionWriteAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes idempotency vertical readiness review routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-idempotency-readiness-review-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/idempotency-vertical-readiness-review",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/idempotency-vertical-readiness-review?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        reviewState: "ready-read-only-vertical-slice",
        readyForIdempotencyVerticalReadinessReview: true,
        checks: {
          javaMiniKvDisconnected: true,
          miniKvOrderAuthoritativeFalse: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Idempotency vertical readiness review");
      expect(markdown.body).toContain("v52订单平台order-idempotency-boundary");
      expect(markdown.body).toContain("第六十一版TTL令牌原语");
      expect(markdown.body).toContain("PROCEED_TO_PARALLEL_ABSTRACTION_AND_RECOVERY_STAGE");
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
