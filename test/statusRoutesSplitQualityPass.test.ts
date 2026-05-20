import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { loadStatusRoutesSplitQualityPass } from "../src/services/statusRoutesSplitQualityPass.js";

describe("status routes split quality pass", () => {
  it("records the v279 rollback route split without enabling behavior", () => {
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
      sourceVersion: "Node v279",
      splitScope: {
        sourceFile: "src/routes/statusRoutes.ts",
        previousExtractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts",
        extractedRouteModule: "src/routes/statusUpstreamFixtureRoutes.ts",
        latestExtractedRouteModule: "src/routes/statusSecurityRoutes.ts",
        deploymentExtractedRouteModule: "src/routes/statusDeploymentRoutes.ts",
        readinessSummaryExtractedRouteModule: "src/routes/statusReadinessSummaryRoutes.ts",
        rollbackExtractedRouteModule: "src/routes/statusRollbackRoutes.ts",
        extractedHelperModule: "src/routes/statusJsonMarkdownRoute.ts",
        extractedTypesModule: "src/routes/statusRouteTypes.ts",
        migratedRouteCount: 44,
        latestMigratedRouteCount: 4,
        migratedRouteGroup: "upstream fixture, production evidence intake, security readiness, deployment readiness, connection readiness, production readiness summary, and rollback readiness",
        nextSplitCandidate: "live-probe route group",
      },
      checks: {
        upstreamFixtureRoutesExtracted: true,
        securityRoutesExtracted: true,
        deploymentRoutesExtracted: true,
        readinessSummaryRoutesExtracted: true,
        rollbackRoutesExtracted: true,
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
        checkCount: 14,
        passedCheckCount: 14,
        migratedRouteCount: 44,
        preservedApiPathCount: 44,
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
      "/api/v1/deployment/safety-profile",
      "/api/v1/deployment/environment-readiness",
      "/api/v1/production/connection-config-contract",
      "/api/v1/production/connection-failure-mode-rehearsal",
      "/api/v1/production/connection-implementation-precheck",
      "/api/v1/production/connection-dry-run-change-request",
      "/api/v1/production/connection-archive-verification",
      "/api/v1/production/readiness-summary",
      "/api/v1/production/readiness-summary-v2",
      "/api/v1/production/readiness-summary-v3",
      "/api/v1/production/readiness-summary-v4",
      "/api/v1/production/readiness-summary-v5",
      "/api/v1/production/readiness-summary-v6",
      "/api/v1/production/readiness-summary-v7",
      "/api/v1/production/readiness-summary-v8",
      "/api/v1/production/readiness-summary-v9",
      "/api/v1/production/readiness-summary-v10",
      "/api/v1/production/readiness-summary-v11",
      "/api/v1/production/readiness-summary-v12",
      "/api/v1/production/readiness-summary-v13",
      "/api/v1/production/release-rollback-readiness-runbook",
      "/api/v1/production/rollback-window-readiness-checklist",
      "/api/v1/production/rollback-execution-preflight-contract",
      "/api/v1/deployment/rollback-runbook",
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
      const deploymentJson = await app.inject({
        method: "GET",
        url: "/api/v1/deployment/safety-profile",
      });
      const deploymentMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/deployment/safety-profile?format=markdown",
      });
      const connectionJson = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-config-contract",
      });
      const connectionMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-config-contract?format=markdown",
      });
      const readinessJson = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary",
      });
      const readinessMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/readiness-summary?format=markdown",
      });
      const rollbackJson = await app.inject({
        method: "GET",
        url: "/api/v1/production/rollback-window-readiness-checklist",
      });
      const rollbackMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/rollback-window-readiness-checklist?format=markdown",
      });

      expect(qualityJson.statusCode).toBe(200);
      expect(qualityJson.json()).toMatchObject({
        qualityPassState: "status-routes-split-quality-pass-ready",
        splitScope: {
          migratedRouteCount: 44,
          latestMigratedRouteCount: 4,
        },
        checks: {
          securityRoutesExtracted: true,
          deploymentRoutesExtracted: true,
          readinessSummaryRoutesExtracted: true,
          rollbackRoutesExtracted: true,
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

      expect(deploymentJson.statusCode).toBe(200);
      expect(deploymentJson.json()).toMatchObject({
        service: "orderops-node",
        profileVersion: "deployment-safety-profile.v1",
      });
      expect(deploymentMarkdown.statusCode).toBe(200);
      expect(deploymentMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(deploymentMarkdown.body).toContain("# Deployment safety profile");

      expect(connectionJson.statusCode).toBe(200);
      expect(connectionJson.json()).toMatchObject({
        service: "orderops-node",
        profileVersion: "production-connection-config-contract.v1",
      });
      expect(connectionMarkdown.statusCode).toBe(200);
      expect(connectionMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(connectionMarkdown.body).toContain("# Production connection config contract");

      expect(readinessJson.statusCode).toBe(200);
      expect(readinessJson.json()).toMatchObject({
        service: "orderops-node",
        indexVersion: "production-readiness-summary-index.v1",
      });
      expect(readinessMarkdown.statusCode).toBe(200);
      expect(readinessMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(readinessMarkdown.body).toContain("# Production readiness summary");

      expect(rollbackJson.statusCode).toBe(200);
      expect(rollbackJson.json()).toMatchObject({
        service: "orderops-node",
        profileVersion: "rollback-window-readiness-checklist.v1",
      });
      expect(rollbackMarkdown.statusCode).toBe(200);
      expect(rollbackMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(rollbackMarkdown.body).toContain("# Rollback window readiness checklist");
    } finally {
      await app.close();
    }
  }, 45000);
});
