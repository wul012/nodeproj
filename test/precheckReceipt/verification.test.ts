import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../../src/app.js";
import { loadConfig } from "../../src/config.js";
import {
  loadPrecheckReceiptVerification,
} from "../../src/services/precheckReceipt/verification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection precheck upstream receipt verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v245 with Java v99 and mini-kv v108 without opening a connection", () => {
    const profile = loadPrecheckReceiptVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification.v1",
      verificationState: "manual-sandbox-precheck-upstream-receipt-verification-ready",
      readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification: true,
      readOnlyUpstreamReceiptVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV245: {
        sourceVersion: "Node v245",
        precheckState: "manual-sandbox-connection-precheck-packet-ready",
        readyForPrecheckPacket: true,
        precheckItemCount: 7,
        requiredOperatorFieldCount: 6,
        timeoutBudgetMs: 15000,
        readOnlyPrecheckPacket: true,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        actualConnectionAttempted: false,
        miniKvWritePermissionRequested: false,
      },
      upstreamReceipts: {
        javaV99: {
          sourceVersion: "Java v99",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v23",
          receiptField: "managedAuditSandboxConnectionPrecheckPacketEchoReceipt",
          precheckItemCount: 7,
          timeoutBudgetMs: 15000,
          readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification: true,
          fieldEchoComplete: true,
          credentialValueEchoed: false,
          credentialValueReadByJava: false,
          actualConnectionAttemptedByJava: false,
          schemaMigrationSqlExecutedByJava: false,
          approvalLedgerWrittenByJava: false,
          miniKvWritePermissionRequestedByJava: false,
          readyForNodeV247Alignment: true,
        },
        miniKvV108: {
          sourceVersion: "mini-kv v108",
          receiptVersion: "mini-kv-manual-sandbox-connection-precheck-non-participation-receipt.v1",
          releaseVersion: "v108",
          consumerHint: "Node v246 manual sandbox connection precheck upstream receipt verification",
          consumerHintAcceptedForCurrentPlan: true,
          sourcePrecheckProfileVersion: "managed-audit-manual-sandbox-connection-precheck-packet.v1",
          sourcePrecheckState: "manual-sandbox-connection-precheck-packet-ready",
          sourcePrecheckItemCount: 7,
          sourceRequiredOperatorFieldCount: 6,
          sourceTimeoutBudgetMs: 15000,
          sourceReadyForPrecheckPacket: true,
          sourceReadyForManagedAuditSandboxAdapterConnection: false,
          sourceReadOnlyPrecheckPacket: true,
          sourceExecutionAllowed: false,
          sourceConnectsManagedAudit: false,
          sourceReadsManagedAuditCredential: false,
          operatorFieldsMatchNodeV245: true,
          precheckItemsMatchNodeV245: true,
          readOnly: true,
          executionAllowed: false,
          dryRunOnly: true,
          miniKvAutoStartAllowed: false,
          connectionExecutionAllowed: false,
          storageWriteAllowed: false,
          credentialValueReadAllowed: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          managedAuditStorageBackend: false,
          orderAuthoritative: false,
          readyForNodeV247Alignment: true,
        },
      },
      receiptVerification: {
        sourceSpan: "Node v245 + Java v99 + mini-kv v108",
        precheckItemCountAligned: true,
        operatorFieldCountAligned: true,
        operatorFieldNamesAligned: true,
        timeoutPolicyAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        consumerHintShiftAccepted: true,
        routeRegistrationAccepted: true,
        nodeV247BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV245Ready: true,
        sourceNodeV245StillReadOnly: true,
        javaV99EchoReady: true,
        miniKvV108NonParticipationReady: true,
        consumerHintAcceptedForCurrentPlan: true,
        precheckItemCountAligned: true,
        operatorFieldCountAligned: true,
        operatorFieldNamesAligned: true,
        timeoutPolicyAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        routeRegistrationAccepted: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 3,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV245.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.receiptVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamReceipts.miniKvV108.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBeGreaterThanOrEqual(6);
    expect(profile.summary.matchedSnippetCount).toBeGreaterThanOrEqual(20);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadPrecheckReceiptVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("manual-sandbox-precheck-upstream-receipt-verification-ready");
    expect(profile.upstreamReceipts.javaV99.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamReceipts.miniKvV108.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamReceipts.javaV99.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/99/解释/说明.md",
    );
    expect(profile.upstreamReceipts.miniKvV108.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/manual-sandbox-connection-precheck-non-participation-receipt.json",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadPrecheckReceiptVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification).toBe(false);
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
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification.v1",
        verificationState: "manual-sandbox-precheck-upstream-receipt-verification-ready",
        upstreamReceipts: {
          javaV99: {
            precheckItemCount: 7,
            actualConnectionAttemptedByJava: false,
          },
          miniKvV108: {
            releaseVersion: "v108",
            storageWriteAllowed: false,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection precheck upstream receipt verification");
      expect(markdown.body).toContain("manual-sandbox-precheck-upstream-receipt-verification-ready");
      expect(markdown.body).toContain("CREATE_REHEARSAL_GUARD_NEXT");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-247",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v247-precheck-receipt-verification",
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
    PORT: "4347",
    ...overrides,
  });
}
