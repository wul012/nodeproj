import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadProductionReadinessSummaryIndex,
} from "../src/services/productionReadinessSummaryIndex.js";

describe("production readiness summary index", () => {
  it("summarizes production-leaning evidence and keeps production readiness blocked", async () => {
    const index = await loadProductionReadinessSummaryIndex(loadConfig({
      LOG_LEVEL: "info",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    expect(index).toMatchObject({
      service: "orderops-node",
      indexVersion: "production-readiness-summary-index.v1",
      maturityTarget: "production-leaning",
      readyForProductionOperations: false,
      readOnly: true,
      executionAllowed: false,
      checks: {
        releaseEvidenceReady: true,
        ciEvidenceProfileValid: true,
        workflowEvidenceValid: true,
        deploymentSafetyHasNoBlockers: true,
        rollbackRunbookReady: true,
        auditStoreProductionReady: false,
        allSectionsReadOnly: true,
        executionStillBlocked: true,
      },
      summary: {
        sectionCount: 6,
        readySectionCount: 5,
        notReadySectionCount: 1,
        endpointCount: 8,
        productionBlockerCount: 3,
      },
    });
    expect(index.sections.map((section) => section.id)).toEqual([
      "release-evidence-readiness",
      "ci-evidence-command-profile",
      "workflow-evidence-verification",
      "deployment-safety-profile",
      "rollback-evidence-runbook",
      "audit-store-runtime-profile",
    ]);
    expect(index.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "AUDIT_RUNTIME_NOT_DURABLE",
      "DATABASE_AUDIT_STORE_MISSING",
      "AUDIT_RETENTION_POLICY_MISSING",
    ]);
    expect(index.nextActions).toContain("Resolve production blockers before calling the Node control plane production-ready.");
  });

  it("exposes production readiness summary routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        checks: {
          workflowEvidenceValid: true,
          auditStoreProductionReady: false,
          executionStillBlocked: true,
        },
        summary: {
          sectionCount: 6,
          notReadySectionCount: 1,
          productionBlockerCount: 3,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production readiness summary index");
      expect(markdown.body).toContain("### audit-store-runtime-profile");
      expect(markdown.body).toContain("AUDIT_RUNTIME_NOT_DURABLE");
      expect(markdown.body).toContain("productionReadinessSummaryJson");
    } finally {
      await app.close();
    }
  });
});
