import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditRouteHelperQualityPass,
} from "../src/services/managedAuditRouteHelperQualityPass.js";

describe("managed audit route helper quality pass", () => {
  it("records the route/helper refactor without changing production readiness", () => {
    const profile = loadManagedAuditRouteHelperQualityPass({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-route-helper-quality-pass.v1",
      qualityPassState: "verified-quality-pass",
      readyForManagedAuditRouteHelperQualityPass: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyQualityPass: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      automaticUpstreamStart: false,
      refactorScope: {
        sourceVersion: "Node v217",
        currentVersion: "Node v218",
        routeFile: "src/routes/auditRoutes.ts",
        helperFile: "src/services/managedAuditAdapterProductionHardeningReadinessGateHelpers.ts",
        apiPathsChanged: false,
        responseShapeChanged: false,
        javaMiniKvClientsAdded: false,
      },
      codeShape: {
        auditRoutesBeforeLineCount: 518,
        auditRoutesAfterLineCount: 391,
        auditRoutesRemovedLineCount: 127,
        helperRouteRegistrarAdded: true,
        managedAuditRouteRegistrationsUsingHelper: 13,
        readinessGateHelperFileAdded: true,
      },
      checks: {
        planTargetsV218: true,
        auditRouteRegistrarExtracted: true,
        managedAuditRoutesUseRegistrar: true,
        readinessGateHelpersExtracted: true,
        apiPathsPreserved: true,
        responseShapePreserved: true,
        noJavaMiniKvClientsAdded: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditRouteHelperQualityPass: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditRouteHelperQualityPass({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.qualityPassState).toBe("blocked");
    expect(profile.readyForManagedAuditRouteHelperQualityPass).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes and keeps the v217 gate route working", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const qualityJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-route-helper-quality-pass",
        headers: completeHeaders(),
      });
      const qualityMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-route-helper-quality-pass?format=markdown",
        headers: completeHeaders(),
      });
      const gateJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate",
        headers: completeHeaders(),
      });

      expect(qualityJson.statusCode).toBe(200);
      expect(qualityJson.json()).toMatchObject({
        profileVersion: "managed-audit-route-helper-quality-pass.v1",
        qualityPassState: "verified-quality-pass",
        readyForProductionAudit: false,
        checks: {
          auditRouteRegistrarExtracted: true,
          readinessGateHelpersExtracted: true,
        },
      });
      expect(qualityMarkdown.statusCode).toBe(200);
      expect(qualityMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(qualityMarkdown.body).toContain("# Managed audit route helper quality pass");
      expect(qualityMarkdown.body).toContain("QUALITY_PASS_ONLY");
      expect(gateJson.statusCode).toBe(200);
      expect(gateJson.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-production-hardening-readiness-gate.v1",
        gateState: "ready-for-production-hardening-review",
      });
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-218",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v218-quality-pass",
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
    PORT: "4315",
    ...overrides,
  });
}
