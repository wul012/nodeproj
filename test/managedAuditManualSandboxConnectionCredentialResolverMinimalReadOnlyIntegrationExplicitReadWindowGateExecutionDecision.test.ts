import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration explicit read-window gate execution decision", () => {
  it("waits for an external read window by default and does not execute probes", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision.v1",
      decisionState: "explicit-read-window-gate-execution-decision-ready",
      gateExecutionDecision: "wait-for-external-read-window",
      readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision: true,
      consumesNodeV365RegularGateArchiveVerification: true,
      activeNodeVersion: "Node v366",
      sourceNodeVersion: "Node v365",
      decisionOnly: true,
      rerunsLiveProbe: false,
      actualProbeExecutedNow: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
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
      sourceNodeV365: {
        sourceVersion: "Node v365",
        archiveVerificationState: "minimal-read-only-integration-regular-gate-archive-verified",
        archiveVerificationDecision: "archive-minimal-read-only-integration-regular-gate-and-ci-operator-check",
        readyForArchiveVerification: true,
        readyForNodeV366ExplicitReadWindowGateExecutionDecision: true,
        checkCount: 40,
        passedCheckCount: 40,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        readOnlyTargetCount: 5,
        requiredHeaderCount: 4,
        productionBlockerCount: 0,
        avoidsFullTestBatchByDefault: true,
        requiresExplicitReadWindowForActualProbe: true,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlParsed: false,
        executionAllowed: false,
      },
      decisionRecord: {
        decisionMode: "minimal-read-only-integration-explicit-read-window-gate-execution-decision",
        sourceSpan: "Node v365 minimal read-only integration regular gate archive verification",
        gateExecutionDecision: "wait-for-external-read-window",
        externalReadWindowRequired: true,
        explicitReadWindowProvided: false,
        focusedCiOperatorCheckReady: true,
        actualProbeExecutedNow: false,
        rerunsLiveProbe: false,
        startsUpstreamServices: false,
        mutatesUpstreamState: false,
        opensManagedAuditConnection: false,
        readsCredentialValue: false,
        parsesRawEndpointUrl: false,
        instantiatesProviderClient: false,
        invokesRuntimeShell: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "wait-for-external-read-window",
      },
      checks: {
        sourceNodeV365Ready: true,
        sourceArchiveVerificationDigestStable: true,
        sourceGateDigestStable: true,
        sourceCiOperatorCheckDigestStable: true,
        focusedCiOperatorCheckReady: true,
        sourceAvoidsFullTestBatchByDefault: true,
        explicitReadWindowHandledAsDecisionInput: true,
        missingWindowClassifiedAsExternalWait: true,
        noProbeExecutedWithoutExplicitWindow: true,
        noUpstreamServiceStarted: true,
        noUpstreamMutation: true,
        noManagedAuditConnection: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointUrlRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplementedOrInvoked: true,
        noJavaMiniKvEchoRequired: true,
        executionStillBlocked: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        decisionDigestStable: true,
        readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision: true,
      },
      summary: {
        sourceCheckCount: 40,
        sourcePassedCheckCount: 40,
        readOnlyTargetCount: 5,
        requiredHeaderCount: 4,
        externalReadWindowRequired: true,
        explicitReadWindowProvided: false,
        actualProbeExecutedNow: false,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV365.sourceNodeV364GateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV365.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV365.ciOperatorCheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(22);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("can prepare the next execution version only when an explicit read window is provided", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision({
        config: loadTestConfig(),
        explicitReadWindowProvided: true,
      });

    expect(profile.gateExecutionDecision).toBe("ready-for-explicit-read-window-gate-execution");
    expect(profile.decisionRecord).toMatchObject({
      externalReadWindowRequired: false,
      explicitReadWindowProvided: true,
      actualProbeExecutedNow: false,
      startsUpstreamServices: false,
      nextNodeVersionSuggested: "Node v367",
    });
    expect(profile.summary).toMatchObject({
      explicitReadWindowProvided: true,
      externalReadWindowRequired: false,
      actualProbeExecutedNow: false,
    });
    expect(profile.nextActions.join("\n")).toContain("Node v367");
  }, 180_000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision.v1",
        decisionState: "explicit-read-window-gate-execution-decision-ready",
        gateExecutionDecision: "wait-for-external-read-window",
        activeNodeVersion: "Node v366",
        sourceNodeVersion: "Node v365",
        decisionOnly: true,
        rerunsLiveProbe: false,
        actualProbeExecutedNow: false,
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
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration explicit read-window gate execution decision",
      );
      expect(markdown.body).toContain("Gate execution decision: wait-for-external-read-window");
      expect(markdown.body).toContain("Actual probe executed now: false");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-366",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v366-read-window-decision",
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
