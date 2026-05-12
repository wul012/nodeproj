import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createCiEvidenceCommandProfile,
} from "../src/services/ciEvidenceCommandProfile.js";

describe("CI evidence command profile", () => {
  it("standardizes read-only CI evidence commands and safe smoke environment", () => {
    const profile = createCiEvidenceCommandProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "ci-evidence-command-profile.v1",
      valid: true,
      readOnly: true,
      executionAllowed: false,
      safety: {
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        requiresManualAuthorizationForUpstreamProbes: true,
        requiresManualAuthorizationForUpstreamActions: true,
      },
      safeEnvironment: {
        HOST: "127.0.0.1",
        PORT: "4190",
        LOG_LEVEL: "silent",
        UPSTREAM_PROBES_ENABLED: "false",
        UPSTREAM_ACTIONS_ENABLED: "false",
      },
      checks: {
        safeEnvironmentDisablesProbes: true,
        safeEnvironmentDisablesActions: true,
        typecheckCommandPresent: true,
        testCommandPresent: true,
        buildCommandPresent: true,
        readinessGateSmokePresent: true,
        noManualAuthorizationCommandRunsByDefault: true,
        allCiRunnableCommandsAreReadOnly: true,
      },
      summary: {
        commandCount: 8,
        ciRunnableCommandCount: 6,
        manualAuthorizationCommandCount: 2,
        smokeCommandCount: 3,
        blockerCount: 0,
        warningCount: 1,
      },
    });
    expect(profile.commands.map((command) => command.id)).toEqual([
      "typecheck",
      "test",
      "build",
      "start-safe-smoke-server",
      "smoke-health",
      "smoke-release-evidence-readiness-gate",
      "manual-upstream-probes",
      "manual-upstream-actions",
    ]);
    expect(profile.commands.filter((command) => command.ciRunnable).every((command) => command.readOnly)).toBe(true);
    expect(profile.commands.filter((command) => command.requiresManualAuthorization).every((command) => !command.ciRunnable)).toBe(true);
  });

  it("warns when the current runtime has upstream probes or actions enabled", () => {
    const profile = createCiEvidenceCommandProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.valid).toBe(true);
    expect(profile.summary.warningCount).toBe(3);
    expect(profile.warnings.map((warning) => warning.code)).toEqual([
      "WORKFLOW_NOT_CREATED",
      "CURRENT_RUNTIME_PROBES_ENABLED",
      "CURRENT_RUNTIME_ACTIONS_ENABLED",
    ]);
  });

  it("exposes CI evidence command profile routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/ci/evidence-command-profile",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ci/evidence-command-profile?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        executionAllowed: false,
        safeEnvironment: {
          UPSTREAM_PROBES_ENABLED: "false",
          UPSTREAM_ACTIONS_ENABLED: "false",
        },
        checks: {
          readinessGateSmokePresent: true,
          allCiRunnableCommandsAreReadOnly: true,
        },
        summary: {
          commandCount: 8,
          ciRunnableCommandCount: 6,
          blockerCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# CI evidence command profile");
      expect(markdown.body).toContain("UPSTREAM_ACTIONS_ENABLED: false");
      expect(markdown.body).toContain("### smoke-release-evidence-readiness-gate");
      expect(markdown.body).toContain("releaseEvidenceReadinessGateJson");
    } finally {
      await app.close();
    }
  });
});
