import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { evaluateAuditJsonMarkdownRouteCatalogIntegrity } from "../src/routes/auditJsonMarkdownRouteCatalogIntegrity.js";
import { auditJsonMarkdownRouteGroups } from "../src/routes/auditJsonMarkdownRouteGroups.js";
import { auditJsonMarkdownRoutes } from "../src/routes/auditJsonMarkdownRoutes.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
} from "../src/services/managedAuditRouteRegistrationTableQualityPass.js";

describe("managed audit route registration table quality pass", () => {
  it("records the current route catalog integrity without changing production readiness", () => {
    const profile = loadManagedAuditRouteRegistrationTableQualityPass({
      config: loadTestConfig(),
      catalogIntegrity: currentCatalogIntegrity(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-route-registration-table-quality-pass.v1",
      qualityPassState: "verified-quality-pass",
      readyForManagedAuditRouteRegistrationTableQualityPass: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyQualityPass: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      automaticUpstreamStart: false,
      refactorScope: {
        sourceVersion: "Node v239",
        currentVersion: "Node v240",
        routeFile: "src/routes/auditRoutes.ts",
        routeRegistrationMode: "configuration-table",
        apiPathsChanged: false,
        responseShapeChanged: false,
        javaMiniKvClientsAdded: false,
        businessProfilesChanged: false,
      },
      codeShape: {
        auditRoutesBeforeLineCount: 457,
        auditRoutesAfterLineCount: 57,
        directRegisterAuditJsonMarkdownRouteCallsBefore: 41,
        directRegisterAuditJsonMarkdownRouteCallsAfter: 0,
        registrationTableAdded: true,
        registrationTableRouteCount: 226,
        routeGroupCatalogAdded: true,
        routeGroupCount: 50,
        registerAuditRoutesLoopCount: 1,
      },
      checks: {
        planAllowsOptimizationPass: true,
        registrationTableAdded: true,
        catalogIntegrityReady: true,
        routeGroupCatalogAdded: true,
        routeGroupCountAligned: true,
        routeTableMatchesCatalog: true,
        uniqueRoutePaths: true,
        noEmptyRouteGroups: true,
        directRouteRegistrationReduced: true,
        routeCountPreserved: true,
        apiPathsPreserved: true,
        responseShapePreserved: true,
        businessProfilesUnchanged: true,
        noJavaMiniKvClientsAdded: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditRouteRegistrationTableQualityPass: true,
      },
      summary: {
        routeRegistrationCount: 226,
        routeGroupCount: 50,
        duplicateRoutePathCount: 0,
        emptyRouteGroupCount: 0,
        removedDirectRegistrationCallCount: 41,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
      catalogIntegrity: {
        ready: true,
        summary: {
          groupCount: 50,
          routeCount: 226,
        },
      },
    });
    expect(profile.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditRouteRegistrationTableQualityPass({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
      catalogIntegrity: currentCatalogIntegrity(),
    });

    expect(profile.qualityPassState).toBe("blocked");
    expect(profile.readyForManagedAuditRouteRegistrationTableQualityPass).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
  });

  it("blocks when the supplied catalog integrity is not ready", () => {
    const catalogIntegrity = currentCatalogIntegrity();
    const profile = loadManagedAuditRouteRegistrationTableQualityPass({
      config: loadTestConfig(),
      catalogIntegrity: {
        ...catalogIntegrity,
        ready: false,
        checks: {
          ...catalogIntegrity.checks,
          uniqueRoutePaths: false,
        },
        summary: {
          ...catalogIntegrity.summary,
          duplicateRoutePaths: ["/api/v1/audit/duplicate"],
        },
      },
    });

    expect(profile.qualityPassState).toBe("blocked");
    expect(profile.readyForManagedAuditRouteRegistrationTableQualityPass).toBe(false);
    expect(profile.checks.catalogIntegrityReady).toBe(false);
    expect(profile.checks.uniqueRoutePaths).toBe(false);
    expect(profile.summary.duplicateRoutePathCount).toBe(1);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("CATALOG_INTEGRITY_NOT_READY");
  });

  it("exposes table quality routes and preserves representative existing audit routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const qualityJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-route-registration-table-quality-pass",
        headers: completeHeaders(),
      });
      const qualityMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-route-registration-table-quality-pass?format=markdown",
        headers: completeHeaders(),
      });
      const storeProfile = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-profile",
        headers: completeHeaders(),
      });
      const v239 = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification",
        headers: completeHeaders(),
      });
      const compliance = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-adapter-compliance?format=markdown",
        headers: completeHeaders(),
      });

      expect(qualityJson.statusCode).toBe(200);
      expect(qualityJson.json()).toMatchObject({
        profileVersion: "managed-audit-route-registration-table-quality-pass.v1",
        qualityPassState: "verified-quality-pass",
        readyForProductionAudit: false,
        checks: {
          registrationTableAdded: true,
          catalogIntegrityReady: true,
          directRouteRegistrationReduced: true,
        },
      });
      expect(qualityMarkdown.statusCode).toBe(200);
      expect(qualityMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(qualityMarkdown.body).toContain("# Managed audit route registration table quality pass");
      expect(qualityMarkdown.body).toContain("routeGroupCount: 50");
      expect(qualityMarkdown.body).toContain("routeCount: 226");
      expect(qualityMarkdown.body).toContain("QUALITY_PASS_ONLY");
      expect(storeProfile.statusCode).toBe(200);
      expect(storeProfile.json()).toMatchObject({
        service: "orderops-node",
      });
      expect(v239.statusCode).toBe(200);
      expect(v239.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1",
        readyForManagedAuditSandboxAdapterConnection: false,
      });
      expect(compliance.statusCode).toBe(200);
      expect(compliance.headers["content-type"]).toContain("text/markdown");
      expect(compliance.body).toContain("# Managed audit adapter compliance");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-240",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v240-route-registration-table-quality-pass",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4341",
    ...overrides,
  });
}

function currentCatalogIntegrity() {
  return evaluateAuditJsonMarkdownRouteCatalogIntegrity({
    groups: auditJsonMarkdownRouteGroups,
    routes: auditJsonMarkdownRoutes,
  });
}
