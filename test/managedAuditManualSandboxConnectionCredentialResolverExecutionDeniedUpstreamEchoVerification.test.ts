import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver execution-denied upstream echo verification", () => {
  it("verifies Node v290 and mini-kv v128 while blocking on the missing Java execution-denied echo", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification.v1",
      verificationState: "blocked",
      readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification:
        false,
      readOnlyUpstreamEchoVerification: true,
      executionDeniedUpstreamEchoVerificationOnly: true,
      consumesNodeV290ExecutionDeniedRoutePreflight: true,
      consumesJavaV127V130QualityEvidence: true,
      consumesMiniKvV128ExecutionDeniedNonParticipationReceipt: true,
      javaExecutionDeniedEchoMissing: true,
      miniKvExecutionDeniedReceiptReady: true,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      realResolverImplementationAllowed: false,
      testOnlyFakeHarnessAllowed: false,
      testOnlyFakeHarnessExecutionAllowed: false,
      fakeHarnessRuntimeEnabled: false,
      fakeHarnessInvocationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      credentialValueProvided: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlRendered: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV290: {
        sourceVersion: "Node v290",
        preflightState: "disabled-fake-harness-execution-denied-route-preflight-ready",
        readyForExecutionDeniedRoutePreflight: true,
        routePath:
          "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight",
        denialReasonCount: 8,
        simulatedAttemptCount: 8,
        deniedAttemptCount: 8,
        actualExecutionAttemptCount: 0,
        sourceCheckCount: 25,
        sourcePassedCheckCount: 25,
        sourceProductionBlockerCount: 0,
        readyForJavaV127MiniKvV128ParallelEvidence: true,
        executionDeniedRoutePreflightOnly: true,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      upstreamEvidence: {
        javaV127V130: {
          sourceVersion: "Java v127-v130",
          evidencePresent: true,
          verificationDocumented: true,
          completedVersions: ["Java v127", "Java v128", "Java v129", "Java v130"],
          liveAggregationSecondSplitDocumented: true,
          responseRecordsSecondSplitDocumented: true,
          overviewTestsSecondSplitDocumented: true,
          echoCatalogExtensionDocumented: true,
          noFakeHarnessRuntimeDocumented: true,
          javaQualityEvidenceReady: true,
          javaExecutionDeniedEchoPresent: false,
        },
        miniKvV128: {
          sourceVersion: "mini-kv v128",
          evidencePresent: true,
          verificationDocumented: true,
          receiptVersion:
            "mini-kv-credential-resolver-disabled-fake-harness-execution-denied-non-participation-receipt.v1",
          releaseVersion: "v128",
          consumerHint: "Node v291 execution-denied upstream echo verification",
          sourcePreflight: "Node v290 disabled fake harness execution-denied route preflight",
          sourcePreflightState: "disabled-fake-harness-execution-denied-route-preflight-ready",
          sourceReadyForExecutionDeniedRoutePreflight: true,
          readyForNodeV291UpstreamEchoVerification: true,
          executionDeniedNonParticipationReceiptOnly: true,
          executionDeniedRoutePreflightOnly: true,
          consumesNodeV290ExecutionDeniedRoutePreflight: true,
          readOnly: true,
          executionAllowed: false,
          actualExecutionAttemptCount: 0,
          fakeHarnessRuntimeImplemented: false,
          fakeHarnessRuntimeInvoked: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          approvalLedgerWritten: false,
          schemaMigrationExecuted: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          checkCount: 25,
          passedCheckCount: 25,
        },
      },
      echoVerification: {
        verificationMode:
          "node-v290-plus-java-v127-v130-plus-mini-kv-v128-execution-denied-upstream-echo-verification-only",
        sourceSpan: "Node v290 + Java v127-v130 + mini-kv v128",
        sourceNodeV290Ready: true,
        javaV127V130QualityEvidenceReady: true,
        miniKvV128NonParticipationReady: true,
        miniKvPreflightDigestAligned: true,
        sideEffectBoundariesAligned: true,
        javaExecutionDeniedEchoMissing: true,
        implementationStillBlocked: true,
        readyForReadinessDecisionRecord: false,
      },
      checks: {
        sourceNodeV290Ready: true,
        sourceNodeV290DigestValid: true,
        sourceNodeV290KeepsRuntimeBlocked: true,
        sourceNodeV290KeepsConnectionBlocked: true,
        sourceNodeV290KeepsCredentialEndpointBoundariesClosed: true,
        javaV127V130EvidencePresent: true,
        javaQualityQueueDocumented: true,
        javaRuntimeBoundariesDocumented: true,
        javaExecutionDeniedEchoPresent: false,
        miniKvV128ReceiptReady: true,
        miniKvV128EchoesNodeV290: true,
        miniKvV128PreflightDigestAligned: true,
        miniKvV128KeepsRuntimeSideEffectsBlocked: true,
        sideEffectBoundaryClosed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification:
          false,
      },
      summary: {
        checkCount: 19,
        passedCheckCount: 17,
        javaEvidenceFileCount: 4,
        javaCompletedVersionCount: 4,
        miniKvEvidenceFileCount: 1,
        miniKvCheckCount: 25,
        miniKvPassedCheckCount: 25,
        productionBlockerCount: 1,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV290.preflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEvidence.javaV127V130.evidenceDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEvidence.miniKvV128.receiptDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEvidence.miniKvV128.preflightDigest).toBe(profile.sourceNodeV290.preflightDigest);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("JAVA_EXECUTION_DENIED_ECHO_MISSING");
    expect(profile.warnings.map((warning) => warning.code)).toContain("NODE_V291_IS_VERIFICATION_ONLY");
  });

  it("keeps the historical fixture fallback viable for Java v127-v130 and mini-kv v128 evidence", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification({
        config: loadTestConfig(),
      });

      expect(profile.verificationState).toBe("blocked");
      expect(profile.upstreamEvidence.javaV127V130.evidencePresent).toBe(true);
      expect(profile.upstreamEvidence.javaV127V130.verificationDocumented).toBe(true);
      expect(profile.upstreamEvidence.miniKvV128.evidencePresent).toBe(true);
      expect(profile.upstreamEvidence.miniKvV128.verificationDocumented).toBe(true);
      expect(profile.upstreamEvidence.javaV127V130.evidenceFiles.map((file) => file.resolvedPath)).toEqual(
        expect.arrayContaining([
          expect.stringContaining("fixtures\\historical\\sibling-workspaces\\javaproj\\advanced-order-platform\\d\\129\\解释\\说明.md"),
        ]),
      );
      expect(profile.upstreamEvidence.miniKvV128.evidenceFiles[0]?.resolvedPath).toContain(
        "fixtures\\historical\\sibling-workspaces\\mini-kv\\fixtures\\release\\credential-resolver-disabled-fake-harness-execution-denied-non-participation-receipt.json",
      );
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
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
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification.v1",
        verificationState: "blocked",
        javaExecutionDeniedEchoMissing: true,
        miniKvExecutionDeniedReceiptReady: true,
        checks: {
          javaExecutionDeniedEchoPresent: false,
          miniKvV128ReceiptReady: true,
          miniKvV128PreflightDigestAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver execution-denied upstream echo verification",
      );
      expect(markdown.body).toContain("Java v127-v130");
      expect(markdown.body).toContain("mini-kv v128");
      expect(markdown.body).toContain("JAVA_EXECUTION_DENIED_ECHO_MISSING");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-291",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v291-execution-denied-upstream-echo-verification",
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
    ...overrides,
  });
}
