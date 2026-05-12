import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createDeploymentSafetyProfile,
} from "../src/services/deploymentSafetyProfile.js";

describe("deployment safety profile", () => {
  it("summarizes production-demo deployment safety with blockers, warnings, and recommendations", () => {
    const profile = createDeploymentSafetyProfile(loadConfig({
      LOG_LEVEL: "info",
      HOST: "127.0.0.1",
      PORT: "4100",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "deployment-safety-profile.v1",
      suitableForProductionDemo: true,
      readOnly: true,
      executionAllowed: false,
      checks: {
        upstreamActionsDisabled: true,
        portValid: true,
        logLevelKnown: true,
        orderPlatformUrlConfigured: true,
        miniKvEndpointConfigured: true,
        upstreamTimeoutsPositive: true,
        opsSampleIntervalPositive: true,
        mutationRateLimitConfigured: true,
        fixturePathsConfigured: true,
        fixturePathsAbsolute: true,
      },
      summary: {
        blockerCount: 0,
        warningCount: 4,
        recommendationCount: 4,
        probesEnabled: false,
        actionsEnabled: false,
        loopbackHost: true,
        localhostUpstreams: 2,
      },
    });
    expect(profile.warnings.map((warning) => warning.code)).toEqual([
      "HOST_LOOPBACK",
      "UPSTREAM_PROBES_DISABLED",
      "ORDER_PLATFORM_LOCALHOST",
      "MINIKV_LOCALHOST",
    ]);
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain("ADD_REAL_CI_WORKFLOW");
  });

  it("blocks production-demo suitability when upstream actions are enabled", () => {
    const profile = createDeploymentSafetyProfile(loadConfig({
      LOG_LEVEL: "info",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.suitableForProductionDemo).toBe(false);
    expect(profile.checks.upstreamActionsDisabled).toBe(false);
    expect(profile.summary.blockerCount).toBeGreaterThan(0);
    expect(profile.blockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes deployment safety profile routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      HOST: "127.0.0.1",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/deployment/safety-profile",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/deployment/safety-profile?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        suitableForProductionDemo: true,
        executionAllowed: false,
        checks: {
          upstreamActionsDisabled: true,
          mutationRateLimitConfigured: true,
          fixturePathsAbsolute: true,
        },
        summary: {
          blockerCount: 0,
          warningCount: 5,
          recommendationCount: 4,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Deployment safety profile");
      expect(markdown.body).toContain("- Suitable for production demo: true");
      expect(markdown.body).toContain("LOGGING_SILENT");
      expect(markdown.body).toContain("deploymentSafetyProfileMarkdown");
    } finally {
      await app.close();
    }
  });
});
