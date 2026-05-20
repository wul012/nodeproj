import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditSandboxCodeHealthPass,
} from "../src/services/managedAuditSandboxCodeHealthPass.js";

describe("managed audit sandbox code health pass", () => {
  it("records v248 code health gates without opening a managed audit connection", () => {
    const profile = loadManagedAuditSandboxCodeHealthPass({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-sandbox-code-health-pass.v1",
      qualityPassState: "managed-audit-sandbox-code-health-pass-ready",
      readyForManagedAuditSandboxCodeHealthPass: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readOnlyQualityPass: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV247: {
        sourceVersion: "Node v247",
        verificationState: "manual-sandbox-precheck-upstream-receipt-verification-ready",
        readyForPrecheckUpstreamReceiptVerification: true,
        javaReady: true,
        miniKvReady: true,
        connectionStillBlocked: true,
      },
      regressionCoverage: {
        fallbackRegressionTestPresent: true,
        blockedConfigTestPresent: true,
        jsonMarkdownRouteRegressionPresent: true,
        routeRegisteredThroughTable: true,
        markdownRendererRegisteredThroughTable: true,
        noRealConnectionClientImport: true,
        noCredentialValueRead: true,
        noSchemaMigrationExecution: true,
        noAutomaticUpstreamStart: true,
      },
      checks: {
        planAllowsQualityPass: true,
        sourceNodeV247Ready: true,
        v247ServicePresent: true,
        v247ServiceBelowNewServiceLimit: true,
        fallbackRegressionTestPresent: true,
        blockedConfigTestPresent: true,
        jsonMarkdownRouteRegressionPresent: true,
        routeRegisteredThroughTable: true,
        v247AvoidsRealConnectionClients: true,
        v247KeepsCredentialBoundaryClosed: true,
        v247KeepsSchemaMigrationBlocked: true,
        v247KeepsAutoStartBlocked: true,
        largeFileInventoryRecorded: true,
        splitAcceptanceChecklistCreated: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditSandboxCodeHealthPass: true,
      },
      summary: {
        largeFileCount: 4,
        splitChecklistItemCount: 3,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.largeFileInventory.map((item) => item.path)).toEqual([
      "src/routes/statusRoutes.ts",
      "src/ui/dashboard.ts",
      "src/services/opsPromotionArchiveRenderers.ts",
      "src/services/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.ts",
    ]);
    expect(profile.largeFileInventory[0]?.lineCount).toBeLessThanOrEqual(
      profile.largeFileInventory[0]?.targetMaxLineCount ?? 1200,
    );
    expect(profile.splitAcceptanceChecklist.map((item) => item.id)).toEqual([
      "split-status-routes-by-domain",
      "split-dashboard-managed-audit-panels",
      "split-ops-promotion-archive-renderers",
    ]);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditSandboxCodeHealthPass({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.qualityPassState).toBe("blocked");
    expect(profile.readyForManagedAuditSandboxCodeHealthPass).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-code-health-pass",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-code-health-pass?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-sandbox-code-health-pass.v1",
        qualityPassState: "managed-audit-sandbox-code-health-pass-ready",
        checks: {
          routeRegisteredThroughTable: true,
          v247AvoidsRealConnectionClients: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit sandbox code health pass");
      expect(markdown.body).toContain("LARGE_FILES_REMAIN");
      expect(markdown.body).toContain("split-status-routes-by-domain");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-248",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v248-code-health-pass",
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
    PORT: "4348",
    ...overrides,
  });
}
