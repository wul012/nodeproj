import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadProductionReadinessSummaryV3,
} from "../src/services/productionReadinessSummaryV3.js";

describe("production readiness summary v3", () => {
  it("summarizes v100-v102 access and audit progress while keeping production blocked", async () => {
    const summary = await loadProductionReadinessSummaryV3(loadV103Config());

    expect(summary).toMatchObject({
      service: "orderops-node",
      summaryVersion: "production-readiness-summary.v3",
      maturityTarget: "production-near",
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      checks: {
        previousSummaryAvailable: true,
        javaReplayEvidenceIndexReady: true,
        miniKvRecoveryFixtureIndexReady: true,
        accessPolicyCoverageReady: true,
        accessGuardDryRunReady: true,
        auditStoreRuntimeSelectable: true,
        auditStoreRuntimeDurable: false,
        auditStoreProductionReady: false,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        categorizedProductionBlockersPresent: true,
      },
      summary: {
        categoryCount: 4,
        readyCategoryCount: 2,
        notReadyCategoryCount: 2,
        accessPolicyCount: 6,
        protectedRouteGroupCount: 6,
        javaLiveEvidenceEndpointCount: 6,
        javaStaticEvidenceSampleCount: 4,
        miniKvRecoveryFixtureCount: 1,
        auditRuntimeStoreKind: "memory",
      },
      accessControlEvidence: {
        policyProfileVersion: "access-policy-profile.v1",
        policyCount: 6,
        protectedRouteGroupCount: 6,
        guardProfileVersion: "access-guard-readiness-profile.v1",
        guardMode: "dry-run",
        rejectsRequests: false,
      },
      auditEvidence: {
        runtimeProfileVersion: "audit-store-runtime-profile.v1",
        runtimeStoreKind: "memory",
        storeImplementation: "InMemoryAuditStore",
        durableAtRuntime: false,
        configuredByEnvironment: false,
      },
    });
    expect(summary.categories.map((category) => category.id)).toEqual([
      "upstream-observability",
      "access-control",
      "audit",
      "execution-safety",
    ]);
    expect(summary.categories.find((category) => category.id === "upstream-observability")).toMatchObject({
      ready: true,
      blockerCount: 0,
    });
    expect(summary.categories.find((category) => category.id === "access-control")).toMatchObject({
      ready: false,
      blockerCount: 2,
    });
    expect(summary.categories.find((category) => category.id === "audit")).toMatchObject({
      ready: false,
      blockerCount: 2,
    });
    expect(summary.categories.find((category) => category.id === "execution-safety")).toMatchObject({
      ready: true,
      blockerCount: 0,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "ACCESS_POLICY_CONTRACT_ONLY",
      "ACCESS_GUARD_DRY_RUN_ONLY",
      "AUDIT_RUNTIME_NOT_DURABLE",
      "AUDIT_PRODUCTION_STORE_NOT_READY",
    ]));
    expect(summary.upstreamEvidenceIndexes.javaReplay.auditIdentityFields).toEqual(expect.arrayContaining([
      "operator.operatorId",
      "requestId",
      "decisionId",
    ]));
    expect(summary.upstreamEvidenceIndexes.miniKvRecovery.boundaries).toContain("not order authoritative");
  });

  it("keeps audit production blocked even when file runtime is selected", async () => {
    const summary = await loadProductionReadinessSummaryV3(loadV103Config({
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: path.join(process.cwd(), "output", "test-audit-v103.jsonl"),
    }));

    expect(summary.checks.auditStoreRuntimeDurable).toBe(true);
    expect(summary.checks.auditStoreProductionReady).toBe(false);
    expect(summary.auditEvidence).toMatchObject({
      runtimeStoreKind: "file",
      storeImplementation: "FileBackedAuditStore",
      durableAtRuntime: true,
      configuredByEnvironment: true,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toContain("AUDIT_PRODUCTION_STORE_NOT_READY");
    expect(summary.productionBlockers.map((blocker) => blocker.code)).not.toContain("AUDIT_RUNTIME_NOT_DURABLE");
  });

  it("exposes production readiness summary v3 routes in JSON and Markdown", async () => {
    const app = await buildApp(loadV103Config());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v3",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v3?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        checks: {
          javaReplayEvidenceIndexReady: true,
          miniKvRecoveryFixtureIndexReady: true,
          accessPolicyCoverageReady: true,
          accessGuardDryRunReady: true,
          auditStoreProductionReady: false,
          executionStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v3");
      expect(markdown.body).toContain("### upstream-observability");
      expect(markdown.body).toContain("### access-control");
      expect(markdown.body).toContain("ACCESS_GUARD_DRY_RUN_ONLY");
      expect(markdown.body).toContain("AUDIT_PRODUCTION_STORE_NOT_READY");
      expect(markdown.body).toContain("productionReadinessSummaryV3Json");
    } finally {
      await app.close();
    }
  });
});

function loadV103Config(overrides: NodeJS.ProcessEnv = {}) {
  const evidenceDir = path.join(process.cwd(), "fixtures", "upstream-production-evidence");

  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    JAVA_REPLAY_AUDIT_APPROVED_FIXTURE_PATH: path.join(evidenceDir, "failed-event-replay-audit-approved.sample.json"),
    JAVA_REPLAY_AUDIT_BLOCKED_FIXTURE_PATH: path.join(evidenceDir, "failed-event-replay-audit-blocked.sample.json"),
    JAVA_REPLAY_EVIDENCE_INDEX_FIXTURE_PATH: path.join(evidenceDir, "failed-event-replay-evidence-index.sample.json"),
    MINIKV_RESTART_RECOVERY_EVIDENCE_FIXTURE_PATH: path.join(evidenceDir, "mini-kv-restart-recovery-evidence.json"),
    MINIKV_RECOVERY_FIXTURE_INDEX_PATH: path.join(evidenceDir, "mini-kv-recovery-fixtures-index.json"),
    ...overrides,
  });
}
