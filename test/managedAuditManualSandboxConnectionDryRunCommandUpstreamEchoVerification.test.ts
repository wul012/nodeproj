import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification.js";

describe("managed audit manual sandbox connection dry-run command upstream echo verification", () => {
  it("verifies Node v243 with Java v98 and mini-kv v107 without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification.v1",
      verificationState: "manual-sandbox-dry-run-command-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV243: {
        sourceVersion: "Node v243",
        reportState: "manual-sandbox-dry-run-command-package-verification-ready",
        readyForVerificationReport: true,
        commandCount: 6,
        disabledByDefault: true,
        dryRunOnly: true,
        carriesCredentialValue: false,
        actualConnectionAttempted: false,
      },
      upstreamEcho: {
        javaV98: {
          sourceVersion: "Java v98",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v22",
          receiptField: "managedAuditSandboxConnectionDryRunCommandPackageEchoReceipt",
          commandCount: 6,
          readyForNodeV244ManualSandboxDryRunCommandUpstreamEchoVerification: true,
          credentialValueReadByJava: false,
          actualConnectionAttemptedByJava: false,
          schemaMigrationSqlExecutedByJava: false,
          approvalLedgerWrittenByJava: false,
          readyForNodeV244Alignment: true,
        },
        miniKvV107: {
          sourceVersion: "mini-kv v107",
          receiptVersion: "mini-kv-manual-sandbox-dry-run-command-non-participation-receipt.v1",
          releaseVersion: "v107",
          consumerHint: "Node v244 manual sandbox dry-run command upstream echo verification",
          sourcePackageCommandCount: 6,
          sourcePackageDisabledByDefault: true,
          sourcePackageDryRunOnly: true,
          sourcePackageCarriesCredentialValue: false,
          sourcePackageActualConnectionAttempted: false,
          sourcePackageMiniKvWritePermissionRequested: false,
          readOnly: true,
          executionAllowed: false,
          miniKvAutoStartAllowed: false,
          connectionExecutionAllowed: false,
          storageWriteAllowed: false,
          credentialValueReadAllowed: false,
          readyForNodeV244Alignment: true,
        },
      },
      echoVerification: {
        sourceSpan: "Node v243 + Java v98 + mini-kv v107",
        commandCountAligned: true,
        disabledByDefaultAligned: true,
        dryRunOnlyAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        routeRegistrationAccepted: true,
        nodeV244BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV243Ready: true,
        javaV98EchoReady: true,
        miniKvV107NonParticipationReady: true,
        commandCountAligned: true,
        disabledByDefaultAligned: true,
        dryRunOnlyAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        routeRegistrationAccepted: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV243.reportDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEcho.miniKvV107.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBeGreaterThanOrEqual(5);
    expect(profile.summary.matchedSnippetCount).toBeGreaterThanOrEqual(12);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionDryRunCommandUpstreamEchoVerification).toBe(false);
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
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-dry-run-command-upstream-echo-verification.v1",
        verificationState: "manual-sandbox-dry-run-command-upstream-echo-verification-ready",
        upstreamEcho: {
          javaV98: {
            commandCount: 6,
          },
          miniKvV107: {
            releaseVersion: "v107",
            storageWriteAllowed: false,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection dry-run command upstream echo verification");
      expect(markdown.body).toContain("manual-sandbox-dry-run-command-upstream-echo-verification-ready");
      expect(markdown.body).toContain("CREATE_PRECHECK_PACKET_NEXT");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-244",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v244-upstream-echo-verification",
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
    PORT: "4345",
    ...overrides,
  });
}
