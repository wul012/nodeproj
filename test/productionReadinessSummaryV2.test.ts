import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadProductionReadinessSummaryV2,
} from "../src/services/productionReadinessSummaryV2.js";

describe("production readiness summary v2", () => {
  it("categorizes production blockers while accepting v46 and v55 upstream evidence", async () => {
    const summary = await loadProductionReadinessSummaryV2(loadV99Config());

    expect(summary).toMatchObject({
      service: "orderops-node",
      summaryVersion: "production-readiness-summary.v2",
      maturityTarget: "production-near",
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      checks: {
        baseSummaryAvailable: true,
        upstreamEvidenceIntakeValid: true,
        javaReplayAuditEvidenceTraceable: true,
        javaReplayBlockedEvidenceStillBlocked: true,
        miniKvRestartRecoveryEvidenceReady: true,
        auditStoreRuntimeProductionReady: false,
        auditStoreEnvConfigReady: false,
        accessControlProductionReady: false,
        executionStillBlocked: true,
        categorizedProductionBlockersPresent: true,
      },
      summary: {
        categoryCount: 4,
        upstreamEvidenceReady: true,
      },
      upstreamEvidence: {
        javaReplayAudit: {
          approvedScenario: "APPROVED_REPLAY_AUDIT",
          blockedScenario: "BLOCKED_REPLAY_AUDIT",
          approvedAuditTrailCount: 3,
          blockedAuditTrailCount: 2,
          approvedAttemptStatus: "SUCCEEDED",
          blockedAttemptStatus: "NOT_ATTEMPTED",
          blockedBy: ["REPLAY_APPROVAL_NOT_APPROVED"],
        },
        miniKvRestartRecovery: {
          evidenceVersion: "mini-kv-restart-recovery.v1",
          recovered: true,
          digestsMatch: true,
          beforeKeyCount: 2,
          afterKeyCount: 2,
          walAppliedRecords: 1,
        },
      },
    });
    expect(summary.categories.map((category) => category.id)).toEqual([
      "upstream-observability",
      "audit",
      "access-control",
      "execution-safety",
    ]);
    expect(summary.categories.find((category) => category.id === "upstream-observability")).toMatchObject({
      ready: true,
      blockerCount: 0,
    });
    expect(summary.categories.find((category) => category.id === "audit")).toMatchObject({
      ready: false,
    });
    expect(summary.categories.find((category) => category.id === "access-control")).toMatchObject({
      ready: false,
    });
    expect(summary.categories.find((category) => category.id === "execution-safety")).toMatchObject({
      ready: true,
      blockerCount: 0,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.category)).toEqual(expect.arrayContaining([
      "audit",
      "access-control",
    ]));
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "AUDIT_RUNTIME_NOT_DURABLE",
      "AUDIT_STORE_KIND_MEMORY",
      "AUTHENTICATION_MISSING",
      "RBAC_MISSING",
    ]));
    expect(summary.nextActions).toContain("Implement durable audit runtime wiring and retention policy before real operations.");
  });

  it("exposes production readiness summary v2 routes in JSON and Markdown", async () => {
    const app = await buildApp(loadV99Config());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v2",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v2?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        checks: {
          upstreamEvidenceIntakeValid: true,
          javaReplayAuditEvidenceTraceable: true,
          miniKvRestartRecoveryEvidenceReady: true,
          accessControlProductionReady: false,
          executionStillBlocked: true,
        },
        summary: {
          categoryCount: 4,
          upstreamEvidenceReady: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v2");
      expect(markdown.body).toContain("### upstream-observability");
      expect(markdown.body).toContain("### access-control");
      expect(markdown.body).not.toContain("JAVA_REPLAY_AUDIT_TRACE_MISSING (blocker");
      expect(markdown.body).toContain("AUTHENTICATION_MISSING");
      expect(markdown.body).toContain("productionReadinessSummaryV2Json");
    } finally {
      await app.close();
    }
  });
});

function loadV99Config() {
  const evidenceDir = path.join(process.cwd(), "fixtures", "upstream-production-evidence");

  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    JAVA_REPLAY_AUDIT_APPROVED_FIXTURE_PATH: path.join(evidenceDir, "failed-event-replay-audit-approved.sample.json"),
    JAVA_REPLAY_AUDIT_BLOCKED_FIXTURE_PATH: path.join(evidenceDir, "failed-event-replay-audit-blocked.sample.json"),
    MINIKV_RESTART_RECOVERY_EVIDENCE_FIXTURE_PATH: path.join(evidenceDir, "mini-kv-restart-recovery-evidence.json"),
  });
}
