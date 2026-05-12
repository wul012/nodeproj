import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createRollbackEvidenceRunbook,
  loadRollbackEvidenceRunbook,
} from "../src/services/rollbackEvidenceRunbook.js";

describe("rollback evidence runbook", () => {
  it("builds a read-only rollback runbook from release, CI, and deployment evidence", async () => {
    const runbook = await loadRollbackEvidenceRunbook(loadConfig({
      LOG_LEVEL: "info",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    expect(runbook).toMatchObject({
      service: "orderops-node",
      runbookVersion: "rollback-evidence-runbook.v1",
      readyForRollbackEvidenceArchive: true,
      readOnly: true,
      executionAllowed: false,
      checks: {
        releaseEvidenceReady: true,
        ciProfileValid: true,
        deploymentProfileHasNoBlockers: true,
        rollbackStepsPresent: true,
        verificationStepsPresent: true,
        stopConditionsPresent: true,
        executionStillBlocked: true,
      },
      summary: {
        rollbackStepCount: 5,
        verificationStepCount: 4,
        stopConditionCount: 5,
        blockerCount: 0,
      },
    });
    expect(runbook.rollbackSteps.map((step) => step.id)).toContain("freeze-upstream-actions");
    expect(runbook.verificationSteps.map((step) => step.id)).toContain("verify-actions-disabled");
    expect(runbook.stopConditions.map((condition) => condition.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("blocks archive readiness when evidence inputs are not ready", async () => {
    const runbook = await loadRollbackEvidenceRunbook(loadConfig({
      LOG_LEVEL: "info",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));
    const blocked = createRollbackEvidenceRunbook({
      readinessGate: {
        ...runbook.evidence.releaseEvidenceReadinessGate,
        readyForReleaseEvidenceArchive: false,
        executionAllowed: false,
        summary: {
          blockerCount: 1,
          warningCount: 0,
        },
      } as never,
      ciProfile: {
        valid: false,
        executionAllowed: false,
        summary: {
          blockerCount: 1,
          warningCount: 0,
          commandCount: 8,
          ciRunnableCommandCount: 6,
        },
      } as never,
      deploymentProfile: {
        suitableForProductionDemo: false,
        executionAllowed: false,
        summary: {
          blockerCount: 1,
          warningCount: 0,
          recommendationCount: 0,
        },
      } as never,
    });

    expect(blocked.readyForRollbackEvidenceArchive).toBe(false);
    expect(blocked.checks.releaseEvidenceReady).toBe(false);
    expect(blocked.checks.ciProfileValid).toBe(false);
    expect(blocked.checks.deploymentProfileHasNoBlockers).toBe(false);
    expect(blocked.summary.blockerCount).toBe(3);
  });

  it("exposes rollback runbook routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/deployment/rollback-runbook",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/deployment/rollback-runbook?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForRollbackEvidenceArchive: true,
        executionAllowed: false,
        checks: {
          releaseEvidenceReady: true,
          ciProfileValid: true,
          executionStillBlocked: true,
        },
        summary: {
          rollbackStepCount: 5,
          verificationStepCount: 4,
          stopConditionCount: 5,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Rollback evidence runbook");
      expect(markdown.body).toContain("- Ready for rollback evidence archive: true");
      expect(markdown.body).toContain("UPSTREAM_ACTIONS_ENABLED");
      expect(markdown.body).toContain("rollbackEvidenceRunbookMarkdown");
    } finally {
      await app.close();
    }
  });
});
