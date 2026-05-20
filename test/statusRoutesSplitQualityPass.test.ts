import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { loadStatusRoutesSplitQualityPass } from "../src/services/statusRoutesSplitQualityPass.js";

describe("status routes split quality pass", () => {
  it("records the v271 upstream fixture route split without enabling behavior", () => {
    const profile = loadStatusRoutesSplitQualityPass();

    expect(profile).toMatchObject({
      profileVersion: "status-routes-split-quality-pass.v1",
      qualityPassState: "status-routes-split-quality-pass-ready",
      readyForStatusRoutesSplitQualityPass: true,
      readOnlyQualityPass: true,
      featureBehaviorChanged: false,
      realResolverImplementationAllowed: false,
      connectsManagedAudit: false,
      executionAllowed: false,
      sourceVersion: "Node v271",
      splitScope: {
        sourceFile: "src/routes/statusRoutes.ts",
        extractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts",
        extractedHelperModule: "src/routes/statusJsonMarkdownRoute.ts",
        extractedTypesModule: "src/routes/statusRouteTypes.ts",
        migratedRouteCount: 10,
        migratedRouteGroup: "upstream fixture and production evidence intake",
        nextSplitCandidate: "production readiness summary routes",
      },
      checks: {
        upstreamFixtureRoutesExtracted: true,
        jsonMarkdownHelperExtracted: true,
        statusRouteTypesExtracted: true,
        migratedRouteCountExpected: true,
        apiPathsPreserved: true,
        noFeatureBehaviorChange: true,
        noRealResolverImplementation: true,
        noManagedAuditConnection: true,
        readyForStatusRoutesSplitQualityPass: true,
      },
      summary: {
        checkCount: 9,
        passedCheckCount: 9,
        migratedRouteCount: 10,
        preservedApiPathCount: 10,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.splitScope.apiPathsPreserved).toEqual([
      "/api/v1/upstreams/production-evidence-intake",
      "/api/v1/upstream-contract-fixtures",
      "/api/v1/upstream-contract-fixtures/drift-diagnostics",
      "/api/v1/upstream-contract-fixtures/archive-snapshot",
      "/api/v1/upstream-contract-fixtures/scenario-matrix",
      "/api/v1/upstream-contract-fixtures/scenario-matrix/verification",
      "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle",
      "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification",
      "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index",
      "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
    ]);
  });

  it("exposes the quality pass through JSON and Markdown without changing upstream fixture routes", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const qualityJson = await app.inject({
        method: "GET",
        url: "/api/v1/status-routes/split-quality-pass",
      });
      const qualityMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/status-routes/split-quality-pass?format=markdown",
      });
      const fixtureJson = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures",
      });
      const fixtureMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures?format=markdown",
      });

      expect(qualityJson.statusCode).toBe(200);
      expect(qualityJson.json()).toMatchObject({
        qualityPassState: "status-routes-split-quality-pass-ready",
        splitScope: {
          migratedRouteCount: 10,
        },
        checks: {
          apiPathsPreserved: true,
          noFeatureBehaviorChange: true,
        },
      });
      expect(qualityMarkdown.statusCode).toBe(200);
      expect(qualityMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(qualityMarkdown.body).toContain("# Status routes split quality pass");
      expect(qualityMarkdown.body).toContain("status-routes-split-quality-pass-ready");

      expect(fixtureJson.statusCode).toBe(200);
      expect(fixtureJson.json()).toMatchObject({
        service: "orderops-node",
      });
      expect(fixtureMarkdown.statusCode).toBe(200);
      expect(fixtureMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(fixtureMarkdown.body).toContain("# Upstream execution contract fixture report");
    } finally {
      await app.close();
    }
  }, 45000);
});
