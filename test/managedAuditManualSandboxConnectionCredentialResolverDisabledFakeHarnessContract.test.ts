import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver disabled fake harness contract", () => {
  it("defines a disabled fake harness contract without runtime invocation", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1",
      contractState: "disabled-fake-harness-contract-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract: true,
      readOnlyContract: true,
      disabledFakeHarnessContractOnly: true,
      consumesNodeV287TestOnlyFakeHarnessPrecheck: true,
      readyForJavaV122MiniKvV127ParallelEcho: true,
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
      sourceNodeV287: {
        sourceVersion: "Node v287",
        precheckState: "test-only-fake-harness-precheck-ready",
        readyForTestOnlyFakeHarnessPrecheck: true,
        readyForDisabledFakeHarnessContract: true,
        sourceCheckCount: 21,
        sourcePassedCheckCount: 21,
        sourceProductionBlockerCount: 0,
        immediateJavaEchoRequired: false,
        immediateMiniKvEchoRequired: false,
        recommendedParallelVersionCount: 2,
        fakeHarnessRuntimeEnabled: false,
        fakeHarnessInvocationAllowed: false,
        testOnlyFakeHarnessExecutionAllowed: false,
        realResolverImplementationAllowed: false,
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
      disabledFakeHarnessContract: {
        contractMode: "disabled-test-only-fake-harness-contract-only",
        sourceSpan: "Node v287",
        contractName: "ManagedAuditCredentialResolverDisabledFakeHarnessContract",
        runtimeToggleName: "ORDEROPS_MANAGED_AUDIT_TEST_ONLY_FAKE_HARNESS_ENABLED",
        defaultRuntimeToggleValue: false,
        invocationState: "disabled",
        runtimeImplementationPresent: false,
        runtimeInvocationAllowed: false,
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
      upstreamEchoRequirement: {
        decisionMode: "recommended-parallel-upstream-echo-required",
        javaEchoRequiredNow: true,
        miniKvEchoRequiredNow: true,
        recommendedParallelVersions: [
          "Java v122 integration-tests split plus disabled fake harness echo marker",
          "mini-kv v127 disabled fake harness non-participation receipt",
        ],
        nodeVerificationVersion: "Node v289",
      },
      checks: {
        sourceNodeV287Ready: true,
        sourceNodeV287KeepsRuntimeBlocked: true,
        sourceNodeV287AllowsContractOnly: true,
        contractDigestValid: true,
        contractDefaultDisabled: true,
        contractInvocationBlocked: true,
        runtimeImplementationAbsent: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        providerClientBoundaryClosed: true,
        networkBoundaryClosed: true,
        writeBoundaryClosed: true,
        autoStartBoundaryClosed: true,
        requiredInputsNamed: true,
        allowedOutputsNamed: true,
        prohibitedInputsNamed: true,
        requiredArtifactsNamed: true,
        contractAssertionsNamed: true,
        prohibitedActionsNamed: true,
        upstreamEchoRequiredForJavaAndMiniKv: true,
        recommendedParallelExplicit: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract: true,
      },
      summary: {
        checkCount: 26,
        passedCheckCount: 26,
        requiredInputCount: 6,
        allowedOutputCount: 5,
        prohibitedInputCount: 6,
        requiredArtifactCount: 9,
        contractAssertionCount: 10,
        prohibitedActionCount: 15,
        sourceCheckCount: 21,
        sourcePassedCheckCount: 21,
        sourceProductionBlockerCount: 0,
        javaEchoRequiredNow: true,
        miniKvEchoRequiredNow: true,
        recommendedParallelVersionCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
      evidenceEndpoints: {
        nextRecommendedParallel: "Java v122 + mini-kv v127",
        nextNodeVerification: "Node v289",
      },
    });
    expect(profile.sourceNodeV287.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.disabledFakeHarnessContract.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("blocks if upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.contractState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract)
      .toBe(false);
    expect(profile.readyForJavaV122MiniKvV127ParallelEcho).toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("keeps historical fixture fallback viable through the v287 source chain", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract({
        config: loadTestConfig(),
      });

      expect(profile.contractState).toBe("disabled-fake-harness-contract-ready");
      expect(profile.sourceNodeV287.readyForTestOnlyFakeHarnessPrecheck).toBe(true);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1",
        contractState: "disabled-fake-harness-contract-ready",
        readyForJavaV122MiniKvV127ParallelEcho: true,
        upstreamEchoRequirement: {
          javaEchoRequiredNow: true,
          miniKvEchoRequiredNow: true,
          nodeVerificationVersion: "Node v289",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled fake harness contract",
      );
      expect(markdown.body).toContain("Java v122");
      expect(markdown.body).toContain("mini-kv v127");
      expect(markdown.body).toContain("Node v289");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-288",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v288-disabled-fake-harness-contract",
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
