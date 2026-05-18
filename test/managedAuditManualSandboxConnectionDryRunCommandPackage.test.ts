import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunCommandPackage,
} from "../src/services/managedAuditManualSandboxConnectionDryRunCommandPackage.js";

describe("managed audit manual sandbox connection dry-run command package", () => {
  it("aligns Node v239/v240 with Java v97 and mini-kv v106 without enabling a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionDryRunCommandPackage({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package.v1",
      packageState: "manual-sandbox-connection-dry-run-command-package-ready",
      readyForManagedAuditManualSandboxConnectionDryRunCommandPackage: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyCommandPackage: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV239: {
        sourceVersion: "Node v239",
        readyForOperatorWindowEvidenceVerification: true,
        javaEchoAccepted: true,
        miniKvReceiptAccepted: true,
        boundaryFlagsAligned: true,
        readyForSandboxAdapterConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
      },
      sourceNodeV240: {
        sourceVersion: "Node v240",
        qualityPassState: "verified-quality-pass",
        routeRegistrationMode: "configuration-table",
        auditRoutesAfterLineCount: 29,
        readyForRouteRegistrationTableQualityPass: true,
        connectsManagedAudit: false,
      },
      commandPackage: {
        sourceSpan: "Node v239 + Node v240 + Java v97 + mini-kv v106",
        packageMode: "manual-sandbox-connection-disabled-dry-run-command-package",
        commandCount: 6,
        disabledByDefault: true,
        dryRunOnly: true,
        carriesCredentialValue: false,
        actualConnectionAttempted: false,
        schemaMigrationRequested: false,
        managedAuditStateWriteRequested: false,
        upstreamServiceAutoStartRequested: false,
        miniKvWritePermissionRequested: false,
        readyForOperatorReview: true,
        readyForManagedAuditSandboxAdapterConnection: false,
      },
      checks: {
        sourceNodeV239Ready: true,
        sourceNodeV239StillBlocksConnection: true,
        sourceNodeV240QualityPassReady: true,
        sourceNodeV240StillNoConnection: true,
        javaV97OptimizationReady: true,
        miniKvV106OptimizationReady: true,
        disabledCommandsComplete: true,
        disabledCommandsStillDryRunOnly: true,
        packageDisabledByDefault: true,
        noCredentialValueCarried: true,
        noConnectionAttempted: true,
        noSchemaMigrationRequested: true,
        noManagedAuditStateWriteRequested: true,
        noUpstreamServiceAutoStartRequested: true,
        noMiniKvWritePermissionRequested: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionDryRunCommandPackage: true,
      },
      summary: {
        disabledCommandCount: 6,
        upstreamOptimizationEvidenceCount: 2,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.commandPackage.packageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV239.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV240.qualityDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamOptimizationEvidence.javaV97).toMatchObject({
      sourceVersion: "Java v97",
      repoCleanAtReadTime: true,
      remoteSyncedAtReadTime: true,
      evidencePresent: true,
      optimizationDocumented: true,
      behaviorContractPreserved: true,
      readyForNodeV241Alignment: true,
    });
    expect(profile.upstreamOptimizationEvidence.miniKvV106).toMatchObject({
      sourceVersion: "mini-kv v106",
      repoCleanAtReadTime: true,
      remoteSyncedAtReadTime: true,
      evidencePresent: true,
      optimizationDocumented: true,
      behaviorContractPreserved: true,
      readyForNodeV241Alignment: true,
    });
    expect(profile.disabledCommands.every((command) => (
      command.disabledByDefault
      && command.dryRunOnly
      && command.operatorReviewRequired
      && !command.carriesCredentialValue
      && !command.opensConnection
      && !command.mutatesState
    ))).toBe(true);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionDryRunCommandPackage({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.packageState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionDryRunCommandPackage).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.commandPackage.actualConnectionAttempted).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes through the route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package.v1",
        packageState: "manual-sandbox-connection-dry-run-command-package-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection dry-run command package");
      expect(markdown.body).toContain("manual-sandbox-connection-disabled-dry-run-command-package");
      expect(markdown.body).toContain("Java v97");
      expect(markdown.body).toContain("mini-kv v106");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-241",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v241-dry-run-command-package",
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
    PORT: "4343",
    ...overrides,
  });
}
