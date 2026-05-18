import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection disabled adapter client upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v252/v253 with Java v102 and mini-kv v111 without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1",
      verificationState: "disabled-adapter-client-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV252: {
        sourceVersion: "Node v252",
        precheckState: "disabled-adapter-client-precheck-ready",
        readyForDisabledAdapterClientPrecheck: true,
        requiredEnvHandleCount: 5,
        failureClassCount: 6,
        dryRunResponseFieldCount: 10,
        reusedNoGoConditionCount: 8,
        readyForSandboxAdapterConnection: false,
        externalRequestStillBlocked: true,
        credentialValueStillBlocked: true,
      },
      sourceNodeV253: {
        sourceVersion: "Node v253",
        shellContractState: "test-only-adapter-shell-contract-ready",
        readyForTestOnlyAdapterShellContract: true,
        requestShapeFieldCount: 8,
        responseShapeFieldCount: 9,
        failureMappingCount: 6,
        guardConditionCount: 7,
        fakeTransportOnly: true,
        realClientImplemented: false,
        realTransportAllowed: false,
        externalRequestSent: false,
        credentialValueRead: false,
        productionRecordWritten: false,
      },
      upstreamEchoes: {
        javaV102: {
          sourceVersion: "Java v102",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v24",
          receiptField: "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt",
          consumedByNodeDisabledAdapterClientPrecheckProfile:
            "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1",
          consumedByNodeTestOnlyAdapterShellProfile:
            "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1",
          nextNodeConsumerVersion: "Node v254",
          requiredEnvHandleCount: 5,
          failureClassCount: 6,
          dryRunResponseFieldCount: 10,
          reusedNoGoConditionCount: 8,
          readyForNodeV254DisabledAdapterClientUpstreamEchoVerification: true,
          clientMayBeInstantiated: false,
          externalRequestMayBeSent: false,
          credentialValueMayBeLoaded: false,
          actualConnectionAttemptedByJava: false,
          externalRequestSentByJava: false,
          schemaMigrationSqlExecutedByJava: false,
          approvalLedgerWrittenByJava: false,
          upstreamServiceAutoStartRequestedByJava: false,
          miniKvWritePermissionRequestedByJava: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          readyForNodeV254Alignment: true,
        },
        miniKvV111: {
          sourceVersion: "mini-kv v111",
          receiptVersion: "mini-kv-disabled-adapter-client-non-participation-receipt.v1",
          releaseVersion: "v111",
          consumerHint: "Node v254 disabled adapter client upstream echo verification",
          sourceRequiredEnvHandleCount: 5,
          sourceFailureClassCount: 6,
          sourceDryRunResponseFieldCount: 10,
          sourceReusedNoGoConditionCount: 8,
          sourceReadyForDisabledAdapterClientPrecheck: true,
          sourceReadyForManagedAuditSandboxAdapterConnection: false,
          sourceExternalRequestMayBeSent: false,
          sourceCredentialValueMayBeLoaded: false,
          sourceShellProfileVersion: "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1",
          sourceShellState: "test-only-adapter-shell-contract-ready",
          sourceTransportKind: "fake-in-memory",
          sourceRequestShapeFieldCount: 8,
          sourceResponseShapeFieldCount: 9,
          sourceFailureMappingCount: 6,
          sourceGuardConditionCount: 7,
          sourceFakeTransportOnly: true,
          sourceRealClientImplemented: false,
          sourceRealTransportAllowed: false,
          sourceFakeTransportProbeNoExternalRequest: true,
          sourceFakeTransportProbeNoCredentialRead: true,
          sourceFakeTransportProbeNoProductionWrite: true,
          requestCredentialHandleOnly: true,
          requestCredentialValueAccepted: false,
          responseExternalRequestSent: false,
          responseCredentialValueRead: false,
          responseProductionRecordWritten: false,
          readOnly: true,
          executionAllowed: false,
          dryRunOnly: true,
          miniKvAutoStartAllowed: false,
          connectionExecutionAllowed: false,
          storageWriteAllowed: false,
          credentialValueReadAllowed: false,
          credentialValueLoaded: false,
          externalRequestSent: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          managedAuditStorageBackend: false,
          orderAuthoritative: false,
          readyForNodeV254Alignment: true,
        },
      },
      echoVerification: {
        sourceSpan: "Node v252 + Node v253 + Java v102 + mini-kv v111",
        envHandleCountAligned: true,
        failureClassCountAligned: true,
        dryRunResponseShapeAligned: true,
        fakeTransportShapeAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        nodeV254BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV252Ready: true,
        sourceNodeV253Ready: true,
        sourceNodeBoundariesStillClosed: true,
        javaV102EchoReady: true,
        miniKvV111NonParticipationReady: true,
        envHandleCountAligned: true,
        failureClassCountAligned: true,
        dryRunResponseShapeAligned: true,
        fakeTransportShapeAligned: true,
        credentialBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV252.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV253.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV111.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBeGreaterThanOrEqual(5);
    expect(profile.summary.matchedSnippetCount).toBeGreaterThanOrEqual(25);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("disabled-adapter-client-upstream-echo-verification-ready");
    expect(profile.upstreamEchoes.javaV102.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV111.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV102.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/102/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV111.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/disabled-adapter-client-non-participation-receipt.json",
    );
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification).toBe(false);
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
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1",
        verificationState: "disabled-adapter-client-upstream-echo-verification-ready",
        upstreamEchoes: {
          javaV102: {
            requiredEnvHandleCount: 5,
            externalRequestMayBeSent: false,
          },
          miniKvV111: {
            releaseVersion: "v111",
            sourceFakeTransportOnly: true,
            storageWriteAllowed: false,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection disabled adapter client upstream echo verification");
      expect(markdown.body).toContain("disabled-adapter-client-upstream-echo-verification-ready");
      expect(markdown.body).toContain("CREATE_FAKE_TRANSPORT_DRY_RUN_PACKET_NEXT");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-254",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v254-disabled-adapter-client-upstream-echo-verification",
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
    PORT: "4354",
    ...overrides,
  });
}
