import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionPreflightVerification,
} from "../src/services/managedAuditManualSandboxConnectionPreflightVerification.js";

describe("managed audit manual sandbox connection preflight verification", () => {
  it("verifies the v230 gate against Java v88 and mini-kv v97 markers without connecting", () => {
    const profile = loadManagedAuditManualSandboxConnectionPreflightVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-preflight-verification.v1",
      verificationState: "manual-sandbox-connection-preflight-verification-ready",
      readyForManagedAuditManualSandboxConnectionPreflightVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyVerification: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV230: {
        sourceVersion: "Node v230",
        profileVersion: "managed-audit-manual-sandbox-connection-preflight-gate.v1",
        gateState: "manual-sandbox-connection-preflight-gate-ready",
        readyForPreflightGate: true,
        readyForConnectionFromSource: false,
        manualWindowFlagName: "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED",
        manualWindowOpenByDefault: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        preflightFieldCount: 7,
        requiredPreflightFieldCount: 7,
      },
      upstreamMarkers: {
        javaV88: {
          sourceVersion: "Java v88",
          headTag: "v88订单平台release-approval-sandbox-connection-preflight-echo-marker",
          evidencePresent: true,
          markerFieldPresent: true,
          readyFieldDocumented: true,
          readyForNodeV231PreflightVerification: true,
          preflightFieldsDocumented: true,
          manualWindowFlagDocumented: true,
          manualWindowClosedByDefault: true,
          credentialHandleNameEchoed: true,
          credentialValueReadByJava: false,
          schemaMigrationSqlExecutedByJava: false,
          approvalLedgerWrittenByJava: false,
          managedAuditConnectionOpenedByJava: false,
          autoStartForbidden: true,
          nodeV231MayConsume: true,
        },
        miniKvV97: {
          sourceVersion: "mini-kv v97",
          headTag: "第九十七版沙箱连接不自启守卫回执",
          evidencePresent: true,
          projectVersion: "0.99.0",
          releaseVersion: "v99",
          consumer: expect.stringMatching(
            /Node v23[134] manual sandbox connection (preflight verification|rehearsal packet review|blocked execution rehearsal)/,
          ),
          consumedReleaseVersion: "v96",
          consumedMarkerDigest: "fnv1a64:b9fc556875ea625b",
          receiptDigest: "fnv1a64:1f09161efd809c33",
          manualWindowFlagName: "ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED",
          manualWindowMode: "manual-window-required-no-auto-start",
          timeoutBudgetMs: 15000,
          readOnly: true,
          executionAllowed: false,
          manualWindowOpenByDefault: false,
          connectionExecutionAllowed: false,
          nodeAutoStartAllowed: false,
          javaAutoStartAllowed: false,
          miniKvAutoStartAllowed: false,
          credentialValueReadAllowed: false,
          schemaRehearsalExecutionAllowed: false,
          schemaMigrationExecutionAllowed: false,
          managedAuditWriteAllowed: false,
          participatesInSandboxConnection: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          readyForNodeV231PreflightVerification: true,
        },
      },
      preflightVerification: {
        markerSpan: "Node v230 + Java v88 + mini-kv v97",
        verificationMode: "manual-sandbox-connection-preflight-verification-only",
        javaPreflightEchoAccepted: true,
        miniKvNoStartGuardAccepted: true,
        preflightFieldsAligned: true,
        manualWindowClosedByAllSources: true,
        connectionExecutionAllowed: false,
        credentialValueReadAllowed: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        automaticServiceStartAllowed: false,
        nodeV231BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV230PreflightGateReady: true,
        sourceNodeV230StillConnectionBlocked: true,
        sourceNodeV230GateDigestPresent: true,
        javaV88EvidencePresent: true,
        javaV88PreflightEchoAccepted: true,
        javaV88NoWriteNoSqlNoCredentialBoundaryAccepted: true,
        miniKvV97EvidencePresent: true,
        miniKvV97NoStartGuardAccepted: true,
        miniKvV97BoundaryAccepted: true,
        preflightFieldsAlignedAcrossSources: true,
        manualWindowClosedAcrossSources: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionPreflightVerification: true,
      },
      summary: {
        evidenceFileCount: 6,
        matchedSnippetCount: 23,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV230.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV230.sourceVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preflightVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks preflight verification when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionPreflightVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionPreflightVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.preflightVerification.connectionExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes for v231 preflight verification", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-preflight-verification.v1",
        verificationState: "manual-sandbox-connection-preflight-verification-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection preflight verification");
      expect(markdown.body).toContain("PREFLIGHT_VERIFICATION_ONLY_NO_CONNECTION");
      expect(markdown.body).toContain("ORDEROPS_MANAGED_AUDIT_MANUAL_SANDBOX_WINDOW_APPROVED");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-231",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v231-preflight-verification",
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
    PORT: "4320",
    ...overrides,
  });
}
