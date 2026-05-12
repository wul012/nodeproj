import { existsSync, unlinkSync } from "node:fs";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadProductionReadinessSummaryV4,
} from "../src/services/productionReadinessSummaryV4.js";

const auditFiles: string[] = [];

afterEach(() => {
  for (const file of auditFiles.splice(0)) {
    if (existsSync(file)) {
      unlinkSync(file);
    }
  }
});

describe("production readiness summary v4", () => {
  it("combines upstream auth boundaries with Node access and audit restart evidence", async () => {
    const auditStorePath = trackedAuditFile("summary");
    const summary = await loadProductionReadinessSummaryV4(loadV107Config({
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: auditStorePath,
    }));

    expect(summary).toMatchObject({
      service: "orderops-node",
      summaryVersion: "production-readiness-summary.v4",
      maturityTarget: "production-near",
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      checks: {
        previousSummaryAvailable: true,
        javaOperatorAuthBoundaryReady: true,
        miniKvRecoveryBoundaryReady: true,
        accessGuardAuditContextReady: true,
        operatorIdentityCoverageReady: true,
        fileAuditRestartEvidenceReady: true,
        accessEvidenceDurableCoverage: true,
        upstreamActionsStillDisabled: true,
        executionStillBlocked: true,
        productionBlockersRemain: true,
      },
      summary: {
        categoryCount: 4,
        readyCategoryCount: 2,
        notReadyCategoryCount: 2,
        javaRequiredHeaderCount: 2,
        javaProductionAuthGapCount: 4,
        miniKvRetentionBoundaryDeclared: true,
        miniKvRestartReplayCostDeclared: true,
        operatorIdentitySampleCount: 5,
        auditRuntimeStoreKind: "file",
      },
    });
    expect(summary.upstreamEvidence.javaOperatorAuthBoundary).toMatchObject({
      evidenceVersion: "failed-event-replay-evidence-index.v2",
      identitySource: "HEADER_DERIVED_OPERATOR_CONTEXT",
      anonymousAllowed: false,
      javaAuthenticatesCredentials: false,
      enforcementMode: "ROLE_POLICY_PRECHECK_AND_SERVICE_GATE",
      checks: {
        requiredHeadersPresent: true,
        productionAuthGapsDeclared: true,
        operatorSafetyRulesPresent: true,
      },
    });
    expect(summary.upstreamEvidence.javaOperatorAuthBoundary.requiredHeaders).toEqual([
      "X-Operator-Id",
      "X-Operator-Role",
    ]);
    expect(summary.upstreamEvidence.miniKvRecoveryBoundary).toMatchObject({
      consumerHint: "Node v107 production readiness summary v4",
      restartReplayCost: {
        costModel: "sample_record_count",
        measuredInFixtureOnly: true,
      },
      retentionBoundary: {
        valuesRetainedInIndex: false,
        productionRetentionPolicy: "not_defined",
      },
      checks: {
        restartReplayCostDeclared: true,
        retentionBoundaryDeclared: true,
        retentionPolicyNotDefined: true,
        consumerHintTargetsNodeV107: true,
      },
    });
    expect(summary.nodeEvidence.accessGuardAuditContext.auditSample).toMatchObject({
      path: "/api/v1/audit/events",
      policyMatched: true,
      routeGroup: "audit",
      requiredRole: "auditor",
      wouldDeny: false,
      reason: "allowed_by_role",
      operatorId: "audit-v107",
    });
    expect(summary.nodeEvidence.fileAuditRestartEvidence).toMatchObject({
      runtimeStoreKind: "file",
      durableAtRuntime: true,
      recoveryVerified: true,
      digestStableAfterRestore: true,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "JAVA_HEADER_AUTH_REHEARSAL_ONLY",
      "ACCESS_GUARD_DRY_RUN_ONLY",
      "AUTH_MIDDLEWARE_MISSING",
      "IDENTITY_NOT_ENFORCED",
      "MANAGED_AUDIT_STORE_MISSING",
      "AUDIT_RETENTION_POLICY_MISSING",
      "MINIKV_RETENTION_POLICY_NOT_DEFINED",
    ]));
  });

  it("keeps durable access evidence blocked when file audit runtime is not selected", async () => {
    const summary = await loadProductionReadinessSummaryV4(loadV107Config());

    expect(summary.checks.fileAuditRestartEvidenceReady).toBe(false);
    expect(summary.checks.accessEvidenceDurableCoverage).toBe(false);
    expect(summary.nodeEvidence.fileAuditRestartEvidence).toMatchObject({
      runtimeStoreKind: "memory",
      durableAtRuntime: false,
      recoveryVerified: false,
    });
    expect(summary.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "FILE_AUDIT_RESTART_EVIDENCE_INCOMPLETE",
      "ACCESS_EVIDENCE_NOT_DURABLE",
    ]));
  });

  it("exposes production readiness summary v4 routes in JSON and Markdown", async () => {
    const app = await buildApp(loadV107Config({
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: trackedAuditFile("route"),
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v4",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary-v4?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        checks: {
          javaOperatorAuthBoundaryReady: true,
          miniKvRecoveryBoundaryReady: true,
          accessGuardAuditContextReady: true,
          operatorIdentityCoverageReady: true,
          fileAuditRestartEvidenceReady: true,
          executionStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary v4");
      expect(markdown.body).toContain("### upstream-boundary-evidence");
      expect(markdown.body).toContain("JAVA_HEADER_AUTH_REHEARSAL_ONLY");
      expect(markdown.body).toContain("MINIKV_RETENTION_POLICY_NOT_DEFINED");
      expect(markdown.body).toContain("productionReadinessSummaryV4Json");
    } finally {
      await app.close();
    }
  });
});

function loadV107Config(overrides: NodeJS.ProcessEnv = {}) {
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

function trackedAuditFile(name: string): string {
  const filePath = path.join(process.cwd(), "output", `test-audit-v107-${name}.jsonl`);
  auditFiles.push(filePath);
  return filePath;
}
