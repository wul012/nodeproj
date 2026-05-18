import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionRehearsalGuard,
} from "../src/services/managedAuditManualSandboxConnectionRehearsalGuard.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection rehearsal guard", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("aligns Node v247-v249 with Java v101 and mini-kv v110 without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionRehearsalGuard({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-guard.v1",
      guardState: "manual-sandbox-connection-rehearsal-guard-ready",
      readyForManagedAuditManualSandboxConnectionRehearsalGuard: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readOnlyRehearsalGuard: true,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV247: {
        sourceVersion: "Node v247",
        verificationState: "manual-sandbox-precheck-upstream-receipt-verification-ready",
        readyForPrecheckReceiptVerification: true,
        javaV99Ready: true,
        miniKvV108Ready: true,
        connectionStillBlocked: true,
      },
      sourceNodeV248: {
        sourceVersion: "Node v248",
        qualityPassState: "managed-audit-sandbox-code-health-pass-ready",
        readyForCodeHealthPass: true,
        largeFileInventoryRecorded: true,
        splitAcceptanceChecklistCreated: true,
        connectionStillBlocked: true,
      },
      sourceNodeV249: {
        sourceVersion: "Node v249",
        maintenanceScope: "npm + GitHub Actions Dependabot maintenance",
        evidencePresent: true,
        configuredEcosystems: ["npm", "github-actions"],
        weeklySchedule: true,
        asiaShanghaiTimezone: true,
        minorPatchGrouped: true,
        semverMajorIgnored: true,
        ciWorkflowPresent: true,
        ciWorkflowCoversPrimaryBuild: true,
        dependencyVersionsChanged: false,
        runtimeBehaviorChanged: false,
        managedAuditBoundaryChanged: false,
        readyForRehearsalGuard: true,
      },
      upstreamSecurityMaintenance: {
        javaV101: {
          sourceVersion: "Java v101",
          configuredEcosystems: ["maven", "github-actions"],
          readyForRehearsalGuard: true,
          dependencyVersionsChanged: false,
          runtimeBehaviorChanged: false,
          managedAuditBoundaryChanged: false,
        },
        miniKvV110: {
          sourceVersion: "mini-kv v110",
          configuredEcosystems: ["github-actions"],
          readyForRehearsalGuard: true,
          dependencyVersionsChanged: false,
          runtimeBehaviorChanged: false,
          managedAuditBoundaryChanged: false,
        },
      },
      rehearsalGuard: {
        guardMode: "manual-sandbox-connection-rehearsal-guard-only",
        sourceSpan: "Node v247 + Node v248 + Node v249 + Java v101 + mini-kv v110",
        requiredOperatorArtifactCount: 7,
        requiredSecurityMaintenanceCount: 3,
        ownerApprovalArtifactRequired: true,
        credentialHandleReviewRequired: true,
        schemaRehearsalApprovalRequired: true,
        manualWindowOpenMarkerRequired: true,
        rollbackPathRequired: true,
        abortMarkerRequired: true,
        timeoutPolicyRequired: true,
        credentialValueMayBeRead: false,
        managedAuditConnectionMayOpen: false,
        schemaMigrationMayExecute: false,
        nodeMayStartJavaOrMiniKv: false,
        miniKvMayActAsManagedAuditStorage: false,
      },
      checks: {
        sourceNodeV247Ready: true,
        sourceNodeV248Ready: true,
        nodeV249SecurityMaintenanceReady: true,
        javaV101SecurityMaintenanceReady: true,
        miniKvV110SecurityMaintenanceReady: true,
        requiredSecurityMaintenanceComplete: true,
        credentialBoundaryStillClosed: true,
        connectionBoundaryStillClosed: true,
        schemaMigrationStillBlocked: true,
        autoStartStillBlocked: true,
        miniKvStillNonAuthoritative: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionRehearsalGuard: true,
      },
      summary: {
        evidenceFileCount: 13,
        requiredOperatorArtifactCount: 7,
        requiredSecurityMaintenanceCount: 3,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.rehearsalGuard.guardDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.matchedSnippetCount).toBeGreaterThanOrEqual(28);
  });

  it("uses committed historical fixture fallback for Java root-level and mini-kv security evidence", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionRehearsalGuard({
      config: loadTestConfig(),
    });

    expect(profile.guardState).toBe("manual-sandbox-connection-rehearsal-guard-ready");
    expect(profile.upstreamSecurityMaintenance.javaV101.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamSecurityMaintenance.miniKvV110.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamSecurityMaintenance.javaV101.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/.github/dependabot.yml",
    );
    expect(profile.upstreamSecurityMaintenance.miniKvV110.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/.github/dependabot.yml",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionRehearsalGuard({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.guardState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionRehearsalGuard).toBe(false);
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
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-guard?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-rehearsal-guard.v1",
        guardState: "manual-sandbox-connection-rehearsal-guard-ready",
        rehearsalGuard: {
          ownerApprovalArtifactRequired: true,
          credentialValueMayBeRead: false,
          managedAuditConnectionMayOpen: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection rehearsal guard");
      expect(markdown.body).toContain("manual-sandbox-connection-rehearsal-guard-ready");
      expect(markdown.body).toContain("PLAN_CONNECTION_DECISION_RECORD");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-250",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v250-rehearsal-guard",
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
    PORT: "4350",
    ...overrides,
  });
}
