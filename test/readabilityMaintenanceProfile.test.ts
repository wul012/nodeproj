import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadReadabilityMaintenanceProfile,
} from "../src/services/readabilityMaintenanceProfile.js";

const ROUTE = "/api/v1/audit/managed-audit-readability-maintenance-profile";

describe("readability maintenance profile", () => {
  it("verifies architecture maps, route catalog alignment, and read-only maintenance boundaries", () => {
    const profile = loadReadabilityMaintenanceProfile({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "readability-maintenance-profile.v1",
      maintenanceState: "verified-readability-maintenance",
      readyForReadabilityMaintenance: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyProfile: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      scope: {
        activeVersionRange: "Node v2104-v2113",
        routeGroup: "managed-audit-route-quality",
        localDocumentationOnly: true,
        javaMiniKvParallelRecommended: true,
      },
      routeCatalog: {
        expectedGroupCount: 51,
        expectedRouteCount: 254,
        managedAuditRouteCount: 56,
        routeQualityRouteCount: 6,
      },
      checks: {
        architectureDocumentsPresent: true,
        controlPlaneMapDocumentsBoundaries: true,
        qualityGateFamilyDocumented: true,
        evidenceFlowDocumentsReadOnlySafety: true,
        routeServiceTestMapDocumentsNewRoute: true,
        fFolderStandardCloseoutDocumented: true,
        routeCatalogCountsAligned: true,
        upstreamActionsStillDisabled: true,
        noSiblingServiceStartup: true,
        noProductionExecutionEnabled: true,
        readyForReadabilityMaintenance: true,
      },
    });
    expect(profile.documents).toHaveLength(5);
    expect(profile.summary).toMatchObject({
      documentCount: 5,
      passingDocumentCount: 5,
      missingDocumentCount: 0,
      missingPhraseCount: 0,
      productionBlockerCount: 0,
    });
    expect(profile.productionBlockers).toEqual([]);
    expect(profile.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("exposes JSON and Markdown without opening production execution", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const json = await app.inject({
        method: "GET",
        url: ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "readability-maintenance-profile.v1",
        maintenanceState: "verified-readability-maintenance",
        readyForReadabilityMaintenance: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Readability maintenance profile");
      expect(markdown.body).toContain("docs/architecture/control-plane-map.md");
      expect(markdown.body).toContain("MAINTENANCE_ONLY");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-readability-maintenance",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-readability-maintenance-profile",
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
    PORT: "4518",
    ...overrides,
  });
}
