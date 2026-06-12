import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver disabled fake harness execution-denied route preflight", () => {
  it("preflights an execution-denied route without enabling fake harness runtime", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight.v1",
      preflightState: "disabled-fake-harness-execution-denied-route-preflight-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight:
        true,
      readOnlyRoutePreflight: true,
      executionDeniedRoutePreflightOnly: true,
      consumesNodeV289DisabledFakeHarnessContractUpstreamEchoVerification: true,
      readyForJavaV127MiniKvV128ParallelEvidence: true,
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
      sourceNodeV289: {
        sourceVersion: "Node v289",
        verificationState: "disabled-fake-harness-contract-upstream-echo-verification-ready",
        readyForDisabledFakeHarnessContractUpstreamEchoVerification: true,
        sourceSpan: "Node v288 + Java v122-v126 + mini-kv v127",
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        sourceProductionBlockerCount: 0,
        javaEvidenceReady: true,
        miniKvNonParticipationReady: true,
        implementationStillBlocked: true,
        readyForNextDisabledFakeHarnessPlanning: true,
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
      },
      executionDeniedRoutePreflight: {
        preflightMode: "disabled-fake-harness-execution-denied-route-preflight-only",
        sourceSpan: "Node v289",
        routeSurface: "audit-json-markdown-route",
        routePath: ROUTE,
        httpMethod: "GET",
        formatModes: ["json", "markdown"],
        routeRegistered: true,
        routeReadOnly: true,
        routeExecutionDenied: true,
        executionDeniedReasonCount: 8,
        simulatedAttemptCount: 8,
        deniedAttemptCount: 8,
        actualExecutionAttemptCount: 0,
        approvalGateRequired: true,
        approvalGateSatisfied: false,
        credentialValueReadAllowed: false,
        rawEndpointUrlParseAllowed: false,
        providerClientInstantiationAllowed: false,
        httpTcpDialAllowed: false,
        ledgerWriteAllowed: false,
        schemaMigrationAllowed: false,
        fakeHarnessRuntimeImplementationAllowed: false,
        fakeHarnessRuntimeInvocationAllowed: false,
        automaticUpstreamStartAllowed: false,
      },
      checks: {
        sourceNodeV289Ready: true,
        sourceNodeV289DigestValid: true,
        sourceNodeV289KeepsRuntimeBlocked: true,
        sourceNodeV289KeepsConnectionBlocked: true,
        sourceNodeV289KeepsCredentialBoundaryClosed: true,
        sourceNodeV289KeepsEndpointBoundaryClosed: true,
        sourceNodeV289KeepsWritesBlocked: true,
        routeRegisteredAsAuditJsonMarkdown: true,
        routeReadOnlyGetOnly: true,
        routeExecutionDenied: true,
        allDeniedAttemptsSimulatedOnly: true,
        allDeniedAttemptsBlocked: true,
        approvalGateStillRequired: true,
        credentialValueStillForbidden: true,
        rawEndpointStillForbidden: true,
        providerClientStillForbidden: true,
        httpTcpStillForbidden: true,
        ledgerSchemaStillForbidden: true,
        fakeHarnessRuntimeStillAbsent: true,
        automaticUpstreamStartStillBlocked: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight:
          true,
      },
      summary: {
        checkCount: 25,
        passedCheckCount: 25,
        simulatedAttemptCount: 8,
        deniedAttemptCount: 8,
        actualExecutionAttemptCount: 0,
        denialReasonCount: 8,
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
      evidenceEndpoints: {
        nextRecommendedParallel: "Java v127 + mini-kv v128",
        nextNodeVerification: "Node v291",
      },
    });
    expect(profile.sourceNodeV289.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.executionDeniedRoutePreflight.preflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.executionDeniedRoutePreflight.denialReasons).toEqual([
      "real-approval-gate-not-satisfied",
      "credential-value-read-forbidden",
      "raw-endpoint-url-parse-forbidden",
      "provider-client-instantiation-forbidden",
      "http-tcp-dial-forbidden",
      "approval-ledger-and-schema-migration-forbidden",
      "disabled-fake-harness-runtime-absent",
      "automatic-upstream-start-forbidden",
    ]);
    expect(profile.simulatedRouteAttempts.map((attempt) => attempt.id)).toEqual([
      "approval-gate",
      "credential-value",
      "raw-endpoint-url",
      "provider-client",
      "http-tcp",
      "ledger-schema",
      "fake-harness-runtime",
      "automatic-upstream-start",
    ]);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("blocks the preflight if upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.preflightState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight)
      .toBe(false);
    expect(profile.readyForJavaV127MiniKvV128ParallelEvidence).toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
      "PRODUCTION_AUDIT_UNLOCKED",
      "PRODUCTION_WINDOW_UNLOCKED",
    ]));
  });

  it("keeps historical fixture fallback viable through the v289 source chain", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight({
        config: loadTestConfig(),
      });

      expect(profile.preflightState).toBe("disabled-fake-harness-execution-denied-route-preflight-ready");
      expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
      expect(profile.sourceNodeV289.readyForDisabledFakeHarnessContractUpstreamEchoVerification).toBe(true);
      expect(profile.sourceNodeV289.sourceProductionBlockerCount).toBe(0);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight.v1",
        preflightState: "disabled-fake-harness-execution-denied-route-preflight-ready",
        executionDeniedRoutePreflight: {
          routeExecutionDenied: true,
          actualExecutionAttemptCount: 0,
        },
        evidenceEndpoints: {
          nextRecommendedParallel: "Java v127 + mini-kv v128",
          nextNodeVerification: "Node v291",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled fake harness execution-denied route preflight",
      );
      expect(markdown.body).toContain("Node v289");
      expect(markdown.body).toContain("Java v127 + mini-kv v128");
      expect(markdown.body).toContain("credential-value-read-forbidden");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-290",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v290-disabled-fake-harness-execution-denied-route-preflight",
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
