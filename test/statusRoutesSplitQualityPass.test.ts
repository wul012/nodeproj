import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { loadStatusRoutesSplitQualityPass } from "../src/services/statusRoutesSplitQualityPass.js";

describe("status routes split quality pass", () => {
  it("records the v276 security route split without enabling behavior", () => {
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
      sourceVersion: "Node v276",
      splitScope: {
        sourceFile: "src/routes/statusRoutes.ts",
        previousExtractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts",
        extractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts",
        latestExtractedRouteModule: "src/routes/statusSecurityRoutes.ts",
        extractedHelperModule: "src/routes/statusJsonMarkdownRoute.ts",
        extractedTypesModule: "src/routes/statusRouteTypes.ts",
        migratedRouteCount: 20,
        latestMigratedRouteCount: 10,
        migratedRouteGroup: "upstream fixture, production evidence intake, and security readiness",
        nextSplitCandidate: "deployment and production readiness summary routes",
      },
      checks: {
        upstreamFixtureRoutesExtracted: true,
        securityRoutesExtracted: true,
        jsonMarkdownHelperExtracted: true,
        statusRouteTypesExtracted: true,
        migratedRouteCountExpected: true,
        latestMigratedRouteCountExpected: true,
        apiPathsPreserved: true,
        noFeatureBehaviorChange: true,
        noRealResolverImplementation: true,
        noManagedAuditConnection: true,
        readyForStatusRoutesSplitQualityPass: true,
      },
      summary: {
        checkCount: 11,
        passedCheckCount: 11,
        migratedRouteCount: 20,
        preservedApiPathCount: 20,
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
      "/api/v1/security/access-control-readiness",
      "/api/v1/security/access-policy",
      "/api/v1/security/access-guard-readiness",
      "/api/v1/security/auth-enforcement-rehearsal",
      "/api/v1/security/operator-identity-contract",
      "/api/v1/security/signed-auth-token-contract",
      "/api/v1/security/verified-identity-audit-binding",
      "/api/v1/security/idp-verifier-boundary",
      "/api/v1/security/jwks-verifier-fixture-rehearsal",
      "/api/v1/security/jwks-cache-contract",
    ]);
  });

  it("exposes the quality pass through JSON and Markdown without changing migrated route groups", async () => {
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
      const securityJson = await app.inject({
        method: "GET",
        url: "/api/v1/security/jwks-cache-contract",
      });
      const securityMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/security/jwks-cache-contract?format=markdown",
      });

      expect(qualityJson.statusCode).toBe(200);
      expect(qualityJson.json()).toMatchObject({
        qualityPassState: "status-routes-split-quality-pass-ready",
        splitScope: {
          migratedRouteCount: 20,
          latestMigratedRouteCount: 10,
        },
        checks: {
          securityRoutesExtracted: true,
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

      expect(securityJson.statusCode).toBe(200);
      expect(securityJson.json()).toMatchObject({
        service: "orderops-node",
        profileVersion: "jwks-cache-contract.v1",
      });
      expect(securityMarkdown.statusCode).toBe(200);
      expect(securityMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(securityMarkdown.body).toContain("# JWKS cache contract");
    } finally {
      await app.close();
    }
  }, 45000);
});
