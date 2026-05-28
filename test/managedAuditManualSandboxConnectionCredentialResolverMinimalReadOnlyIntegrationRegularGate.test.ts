import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration regular gate", () => {
  it("standardizes the v349/v350 passed read-only smoke as a reusable safe gate", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate.v1",
      gateState: "minimal-read-only-integration-regular-gate-ready",
      gateDecision: "standardize-v349-read-only-smoke-as-regular-gate",
      readyForMinimalReadOnlyIntegrationRegularGate: true,
      readyForNodeV365RegularGateArchiveVerification: true,
      consumesNodeV350MinimalReadOnlyIntegrationPassedArchiveVerification: true,
      activeNodeVersion: "Node v364",
      sourceNodeVersion: "Node v350",
      regularGateOnly: true,
      gateDefinitionOnly: true,
      rerunsLiveProbe: false,
      startsJavaService: false,
      startsMiniKvService: false,
      connectsManagedAudit: false,
      sendsManagedAuditHttpTcp: false,
      credentialValueRequested: false,
      credentialValueRead: false,
      rawEndpointUrlRequested: false,
      rawEndpointUrlParsed: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      runtimeShellImplemented: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV350: {
        sourceVersion: "Node v350",
        transitionState: "minimal-read-only-integration-passed-archive-verified",
        transitionDecision: "advance-to-managed-audit-disabled-read-only-integration-intake",
        readyForPassedArchiveVerification: true,
        sourceNodeV349Result: "all-read-passed",
        sourceNodeV349Decision: "archive-read-passed-rerun-evidence",
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        sourceCheckCount: 25,
        sourcePassedCheckCount: 25,
        productionBlockerCount: 0,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        executionAllowed: false,
      },
      regularGate: {
        gateMode: "minimal-read-only-integration-regular-gate",
        sourceSpan: "Node v349 passed smoke + Node v350 passed archive verification",
        gateDecision: "standardize-v349-read-only-smoke-as-regular-gate",
        requiredEnvCount: 4,
        requiredHeaderCount: 4,
        readOnlyTargetCount: 5,
        failureClassificationCount: 3,
        artifactExpectationCount: 6,
        nextNodeVersionSuggested: "Node v365",
        rerunsLiveProbeNow: false,
        automaticUpstreamStart: false,
        opensManagedAuditConnection: false,
        readsCredentialValue: false,
        parsesRawEndpointUrl: false,
        instantiatesProviderClient: false,
        invokesRuntimeShell: false,
        mutatesUpstreamState: false,
      },
      checks: {
        sourceNodeV350Ready: true,
        sourceNodeV350VerifiedPassedArchive: true,
        sourceNodeV349AllReadPassed: true,
        sourceTargetCountsAllPassed: true,
        sourceTransitionDigestStable: true,
        sourceArchiveDigestStable: true,
        sourceKeepsRuntimeBoundaryClosed: true,
        gateDoesNotRerunProbeNow: true,
        safeEnvDocumentsProbeEnablement: true,
        safeEnvKeepsActionsDisabled: true,
        safeEnvRequiresAccessGuard: true,
        requiredHeadersDocumentOperatorIdentity: true,
        requiredHeadersContainNoSecrets: true,
        javaTargetsAreGetOnly: true,
        miniKvTargetsAreReadOnlyCommands: true,
        targetCountMatchesV349: true,
        failureClassificationCoversUnavailableWindow: true,
        failureClassificationCoversInvalidContract: true,
        failureClassificationCoversBoundaryBlocks: true,
        artifactExpectationsCoverEvidenceAndScreenshot: true,
        artifactExpectationsCoverPlanAndWalkthrough: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointUrlRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        noManagedAuditHttpTcp: true,
        noUpstreamServiceStarted: true,
        noUpstreamMutation: true,
        noJavaMiniKvEchoRequiredForPassedEvidence: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        gateDigestStable: true,
        readyForMinimalReadOnlyIntegrationRegularGate: true,
      },
      summary: {
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        readOnlyTargetCount: 5,
        requiredEnvCount: 4,
        requiredHeaderCount: 4,
        failureClassificationCount: 3,
        artifactExpectationCount: 6,
        sourceCheckCount: 25,
        sourcePassedCheckCount: 25,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV350.transitionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV350.sourceArchiveDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.regularGate.gateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.regularGate.readOnlyTargets.map((target) => target.methodOrCommand)).toEqual([
      "GET /actuator/health",
      "GET /api/v1/ops/overview",
      "HEALTH",
      "INFOJSON",
      "STATSJSON",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when Node v350 source evidence is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v364-empty-"));

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate({
        config: loadTestConfig(),
        sourceArchiveRoot: emptyProjectRoot,
      });

      expect(profile.gateState).toBe("blocked");
      expect(profile.gateDecision).toBe("blocked");
      expect(profile.readyForMinimalReadOnlyIntegrationRegularGate).toBe(false);
      expect(profile.readyForNodeV365RegularGateArchiveVerification).toBe(false);
      expect(profile.sourceNodeV350.readyForPassedArchiveVerification).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "NODE_V350_NOT_READY",
        "NODE_V349_NOT_ALL_READ_PASSED",
      ]));
      expect(profile.rerunsLiveProbe).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.connectsManagedAudit).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
  }, 60000);

  it("exposes JSON and Markdown through the audit route table", async () => {
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate.v1",
        gateState: "minimal-read-only-integration-regular-gate-ready",
        gateDecision: "standardize-v349-read-only-smoke-as-regular-gate",
        activeNodeVersion: "Node v364",
        sourceNodeVersion: "Node v350",
        gateDefinitionOnly: true,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration regular gate",
      );
      expect(markdown.body).toContain("Gate decision: standardize-v349-read-only-smoke-as-regular-gate");
      expect(markdown.body).toContain("Ready for v365 archive verification: true");
      expect(markdown.body).toContain("UPSTREAM_PROBES_ENABLED=true");
      expect(markdown.body).toContain("GET /api/v1/ops/overview");
      expect(markdown.body).toContain("STATSJSON");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-364",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v364-minimal-read-only-integration-regular-gate",
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
    ...overrides,
  });
}
