import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadPostV166ReadinessSummary,
} from "../src/services/postV166ReadinessSummary.js";

describe("post-v166 readiness summary", () => {
  it("summarizes v167 and v168 while keeping production operations blocked", () => {
    const profile = loadPostV166ReadinessSummary(
      loadTestConfig("memory://post-v166-readiness-summary"),
    );

    expect(profile).toMatchObject({
      summaryVersion: "post-v166-readiness-summary.v1",
      summaryState: "completed-with-production-blockers",
      readyForPostV166ReadinessSummary: true,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      stage: {
        stageName: "post-v166-production-gap-closure",
        sourcePlan: "docs/plans/v166-post-rollback-window-roadmap.md",
        nextPlan: "docs/plans/v169-post-production-environment-preflight-roadmap.md",
        nodeBaselineTag: "v168",
        upstreamActionsEnabled: false,
        productionRollbackAuthorized: false,
        productionOperationsAuthorized: false,
      },
      checks: {
        rollbackExecutionPreflightReady: true,
        productionEnvironmentPreflightReady: true,
        rollbackPreflightDigestPresent: true,
        environmentChecklistDigestPresent: true,
        secretSourceEvidenceConsumed: true,
        artifactDigestEvidenceConsumed: true,
        executionStillBlocked: true,
        secretValueAccessStillBlocked: true,
        productionDatabaseStillBlocked: true,
        miniKvRestoreStillBlocked: true,
        upstreamActionsStillDisabled: true,
        automaticUpstreamStartDisabled: true,
        realSecretManagerConnected: false,
        productionDatabaseConnected: false,
        realProductionIdpConnected: false,
        productionRollbackApprovalConnected: false,
        readyForPostV166ReadinessSummary: true,
      },
      artifacts: {
        rollbackExecutionPreflightContract: {
          profileVersion: "rollback-execution-preflight-contract.v1",
          contractState: "ready-for-manual-preflight-review",
          javaVersion: "Java v58",
          miniKvVersion: "mini-kv v67",
          readyForRollbackExecutionPreflightContract: true,
          readyForProductionRollback: false,
          executionAllowed: false,
          passedPreflightCheckCount: 28,
          preflightCheckCount: 28,
        },
        productionEnvironmentPreflightChecklist: {
          profileVersion: "production-environment-preflight-checklist.v1",
          checklistState: "ready-for-manual-environment-review",
          javaVersion: "Java v59",
          miniKvVersion: "mini-kv v68",
          readyForProductionEnvironmentPreflightChecklist: true,
          readyForProductionRollback: false,
          readyForProductionOperations: false,
          executionAllowed: false,
          passedChecklistCheckCount: 32,
          checklistCheckCount: 32,
        },
        remainingProductionBoundary: {
          realSecretManagerConnected: false,
          productionDatabaseConnected: false,
          realProductionIdpConnected: false,
          productionRollbackApprovalConnected: false,
          miniKvRestoreApprovalConnected: false,
          nextStepMustStartNewPlan: true,
        },
      },
      summary: {
        categoryCount: 5,
        passedCategoryCount: 4,
        blockedCategoryCount: 1,
        checkCount: 17,
        passedCheckCount: 13,
        productionBlockerCount: 4,
      },
    });
    expect(profile.stage.stageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.artifacts.rollbackExecutionPreflightContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.artifacts.productionEnvironmentPreflightChecklist.checklistDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.categories.map((category) => [category.id, category.status])).toEqual([
      ["rollback-execution-preflight", "pass"],
      ["production-environment-preflight", "pass"],
      ["secret-and-digest-evidence", "pass"],
      ["execution-safety", "pass"],
      ["remaining-production-blockers", "blocked"],
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_SECRET_MANAGER_NOT_CONNECTED",
      "PRODUCTION_DATABASE_NOT_CONNECTED",
      "REAL_PRODUCTION_IDP_NOT_CONNECTED",
      "PRODUCTION_ROLLBACK_APPROVAL_NOT_CONNECTED",
    ]);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain("START_V169_DERIVED_PLAN");
  });

  it("blocks the summary when upstream actions are enabled", () => {
    const profile = loadPostV166ReadinessSummary(loadTestConfig(
      "memory://post-v166-readiness-summary-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.summaryState).toBe("blocked");
    expect(profile.readyForPostV166ReadinessSummary).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.checks.executionStillBlocked).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.productionBlockers.map((blocker) => blocker.code)).not.toContain("EXECUTION_BOUNDARY_OPEN");
  });

  it("exposes post-v166 readiness summary routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-post-v166-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/post-v166-readiness-summary",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/post-v166-readiness-summary?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        summaryState: "completed-with-production-blockers",
        readyForPostV166ReadinessSummary: true,
        checks: {
          rollbackExecutionPreflightReady: true,
          productionEnvironmentPreflightReady: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Post-v166 readiness summary");
      expect(markdown.body).toContain("REAL_SECRET_MANAGER_NOT_CONNECTED");
      expect(markdown.body).toContain("START_V169_DERIVED_PLAN");
      expect(markdown.body).toContain("v169-post-production-environment-preflight-roadmap.md");
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
