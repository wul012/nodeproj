import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver test-only fake harness precheck", () => {
  it("prechecks a disabled fake harness boundary without reading credentials or connecting managed audit", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck.v1",
      precheckState: "test-only-fake-harness-precheck-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck: true,
      readOnlyPrecheck: true,
      testOnlyFakeHarnessPrecheckOnly: true,
      consumesNodeV286ImplementationPlanUpstreamEchoVerification: true,
      readyForDisabledFakeHarnessContract: true,
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
      sourceNodeV286: {
        sourceVersion: "Node v286",
        verificationState: "credential-resolver-implementation-plan-upstream-echo-verification-ready",
        readyForImplementationPlanUpstreamEchoVerification: true,
        readyForNodeV287TestOnlyFakeHarnessPrecheck: true,
        sourceSpan: "Node v283 + Java v121 + mini-kv v126",
        sourceCheckCount: 28,
        sourcePassedCheckCount: 28,
        productionBlockerCount: 0,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        originalExpectedNodeV284SatisfiedByNodeV286: true,
        realResolverImplementationAllowed: false,
        testOnlyFakeHarnessAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        rawEndpointUrlRendered: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
      },
      fakeHarnessPrecheck: {
        precheckMode: "test-only-fake-harness-precheck-only",
        sourceSpan: "Node v286",
        fakeHarnessName: "ManagedAuditCredentialResolverTestOnlyFakeHarness",
        runtimeToggleName: "ORDEROPS_MANAGED_AUDIT_TEST_ONLY_FAKE_HARNESS_ENABLED",
        defaultRuntimeToggleValue: false,
        fakeHarnessRuntimeEnabled: false,
        fakeHarnessInvocationAllowed: false,
        testOnlyFakeHarnessExecutionAllowed: false,
        credentialBoundary: {
          credentialHandleOnly: true,
          credentialValueRead: false,
          credentialValueProvided: false,
          credentialValueStored: false,
        },
        endpointBoundary: {
          endpointHandleOnly: true,
          rawEndpointUrlParsed: false,
          rawEndpointUrlRendered: false,
          rawEndpointUrlProvided: false,
        },
        providerClientBoundary: {
          realSecretProviderInstantiated: false,
          realResolverClientInstantiated: false,
          fakeSecretProviderInstantiated: false,
          fakeResolverClientInstantiated: false,
        },
        networkBoundary: {
          externalRequestSent: false,
          connectsManagedAudit: false,
          httpTcpDialAllowed: false,
        },
        writeBoundary: {
          executionAllowed: false,
          schemaMigrationExecuted: false,
          approvalLedgerWritten: false,
        },
        autoStartBoundary: {
          automaticUpstreamStart: false,
        },
      },
      upstreamEchoDecision: {
        decisionMode: "explicit-parallel-echo-decision",
        javaEchoRequiredNow: false,
        miniKvEchoRequiredNow: false,
        recommendedParallelAfterDisabledHarnessContract: [
          "Java v122 disabled fake harness echo receipt",
          "mini-kv v127 disabled fake harness non-participation receipt",
        ],
      },
      checks: {
        sourceNodeV286Ready: true,
        sourceNodeV286KeepsRuntimeBlocked: true,
        sourceNodeV286EnablesPrecheckOnly: true,
        fakeHarnessDefaultDisabled: true,
        fakeHarnessExecutionBlocked: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        providerClientBoundaryClosed: true,
        networkBoundaryClosed: true,
        writeBoundaryClosed: true,
        autoStartBoundaryClosed: true,
        requiredArtifactsNamed: true,
        prohibitedActionsNamed: true,
        upstreamEchoDecisionExplicit: true,
        noImmediateJavaEchoRequired: true,
        noImmediateMiniKvEchoRequired: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck: true,
      },
      summary: {
        checkCount: 21,
        passedCheckCount: 21,
        requiredArtifactCount: 8,
        prohibitedActionCount: 14,
        allowedInputCount: 7,
        allowedOutputCount: 7,
        sourceCheckCount: 28,
        sourcePassedCheckCount: 28,
        sourceProductionBlockerCount: 0,
        immediateJavaEchoRequired: false,
        immediateMiniKvEchoRequired: false,
        recommendedParallelVersionCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
      evidenceEndpoints: {
        nextNodeVersion: "Node v288",
      },
    });
    expect(profile.fakeHarnessPrecheck.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV286.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("blocks precheck if upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.precheckState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck)
      .toBe(false);
    expect(profile.readyForDisabledFakeHarnessContract).toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("keeps the v286 historical fallback chain viable for GitHub runners", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck({
        config: loadTestConfig(),
      });

      expect(profile.precheckState).toBe("test-only-fake-harness-precheck-ready");
      expect(profile.sourceNodeV286.readyForImplementationPlanUpstreamEchoVerification).toBe(true);
      expect(profile.summary.sourceProductionBlockerCount).toBe(0);
      expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck.v1",
        precheckState: "test-only-fake-harness-precheck-ready",
        readyForDisabledFakeHarnessContract: true,
        upstreamEchoDecision: {
          javaEchoRequiredNow: false,
          miniKvEchoRequiredNow: false,
        },
        evidenceEndpoints: {
          nextNodeVersion: "Node v288",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver test-only fake harness precheck",
      );
      expect(markdown.body).toContain("Node v286");
      expect(markdown.body).toContain("Java v122");
      expect(markdown.body).toContain("mini-kv v127");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-287",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v287-test-only-fake-harness-precheck",
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
