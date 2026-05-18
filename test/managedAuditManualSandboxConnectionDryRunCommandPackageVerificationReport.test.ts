import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport,
} from "../src/services/managedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport.js";

describe("managed audit manual sandbox connection dry-run command package verification report", () => {
  it("verifies the v241 command package with v242 CI-stable fallback evidence", () => {
    const profile = loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report.v1",
      reportState: "manual-sandbox-dry-run-command-package-verification-ready",
      readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport: true,
      readOnlyVerificationReport: true,
      sourceNodeV241: {
        sourceVersion: "Node v241",
        packageState: "manual-sandbox-connection-dry-run-command-package-ready",
        commandCount: 6,
        readyForManagedAuditManualSandboxConnectionDryRunCommandPackage: true,
        readyForManagedAuditSandboxAdapterConnection: false,
        disabledByDefault: true,
        dryRunOnly: true,
        carriesCredentialValue: false,
        actualConnectionAttempted: false,
        schemaMigrationRequested: false,
        managedAuditStateWriteRequested: false,
        upstreamServiceAutoStartRequested: false,
        miniKvWritePermissionRequested: false,
      },
      sourceNodeV242: {
        sourceVersion: "Node v242",
        planVersion: "v242-post-historical-evidence-fallback-roadmap.md",
        sourcePlanState: "sandbox-adapter-dry-run-plan-ready",
        historicalFixtureRoot: "fixtures/historical/managed-audit-external-adapter-readiness-review",
        historicalFixturePresent: true,
        ciStableFallback: true,
      },
      verification: {
        evidenceSpan: "Node v241 + Node v242 + Java v97 + mini-kv v106",
        verificationMode: "manual-sandbox-dry-run-command-package-verification-report-only",
        commandShapeAccepted: true,
        disabledByDefaultAccepted: true,
        noCredentialValueAccepted: true,
        noConnectionAccepted: true,
        noMutationAccepted: true,
        routeRegistrationAccepted: true,
        archiveEvidenceAccepted: true,
        ciFallbackAccepted: true,
        nodeV243BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV241Ready: true,
        sourceNodeV241StillDisabledByDefault: true,
        sourceNodeV242HistoricalFallbackReady: true,
        sourceNodeV242StillPreservesPlanState: true,
        javaV97VerificationReady: true,
        miniKvV106VerificationReady: true,
        commandShapeAccepted: true,
        disabledByDefaultAccepted: true,
        noCredentialValueAccepted: true,
        noConnectionAccepted: true,
        noMutationAccepted: true,
        routeRegistrationAccepted: true,
        archiveEvidenceAccepted: true,
        ciFallbackAccepted: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV241.packageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV242.historicalFixtureDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.verification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBeGreaterThanOrEqual(7);
    expect(profile.summary.matchedSnippetCount).toBeGreaterThanOrEqual(8);
  });

  it("blocks when upstream actions are enabled while keeping dry-run boundaries closed", () => {
    const profile = loadManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reportState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionDryRunCommandPackageVerificationReport).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.sourceNodeV241.actualConnectionAttempted).toBe(false);
    expect(profile.sourceNodeV241.carriesCredentialValue).toBe(false);
    expect(profile.verification.nodeV243BlocksRealConnection).toBe(true);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-package-verification-report.v1",
        reportState: "manual-sandbox-dry-run-command-package-verification-ready",
        sourceNodeV241: {
          commandCount: 6,
          disabledByDefault: true,
          carriesCredentialValue: false,
        },
        sourceNodeV242: {
          historicalFixturePresent: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection dry-run command package verification report");
      expect(markdown.body).toContain("manual-sandbox-dry-run-command-package-verification-ready");
      expect(markdown.body).toContain("PREPARE_UPSTREAM_ECHO_RECEIPTS");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-243",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v243-command-package-verification-report",
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
    PORT: "4344",
    ...overrides,
  });
}
