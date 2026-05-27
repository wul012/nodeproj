import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut";

describe("managed audit manual sandbox connection credential resolver minimal read-only integration window readiness cut", () => {
  it("cuts over from v344 archive verification to the minimal read-only integration window", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut.v1",
      readinessState: "minimal-read-only-integration-window-readiness-cut-ready",
      readinessDecision: "ready-for-manual-read-only-integration-window",
      readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut: true,
      consumesNodeV344DisabledDesignDraftBodyDraftCandidateArchiveVerification: true,
      activeNodeVersion: "Node v345",
      sourceNodeVersion: "Node v344",
      readOnlyIntegrationWindowReadinessCut: true,
      readinessCutOnly: true,
      performsLiveProbeNow: false,
      startsJavaService: false,
      startsMiniKvService: false,
      sendsJavaHttpRequestNow: false,
      opensMiniKvTcpSocketNow: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      rawEndpointUrlParsed: false,
      runtimeShellImplemented: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: true,
      requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourceNodeV344: {
        archiveVerificationState: "disabled-design-draft-body-draft-candidate-archive-verified",
        archiveVerificationDecision: "body-draft-candidate-archive-verified-before-next-design-step",
        readyForArchiveVerification: true,
        readyForNextDisabledDesignDraftStep: true,
        sourceProductionBlockerCount: 0,
        runtimeShellImplemented: false,
        executionAllowed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        javaServiceStarted: false,
        miniKvServiceStarted: false,
        automaticUpstreamStart: false,
      },
      readinessCut: {
        cutMode: "node-v345-minimal-read-only-integration-window-readiness-cut",
        sourceSpan: "Node v344 archive verification plus existing Node upstream clients",
        decision: "ready-for-manual-read-only-integration-window",
        consumesNodeV344ArchiveVerification: true,
        consumesJavaMiniKvRuntimeNow: false,
        performsLiveProbeNow: false,
        opensNetworkSocketNow: false,
        startsUpstreamServices: false,
        allowsOnlyJavaGetRequests: true,
        allowsOnlyMiniKvReadCommands: true,
        requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
        nextNodeVersionSuggested: "Node v346",
      },
      checks: {
        sourceNodeV344Ready: true,
        sourceNodeV344KeepsRuntimeAndSideEffectsClosed: true,
        existingJavaClientReadEndpointsAvailable: true,
        existingMiniKvClientReadCommandsAvailable: true,
        environmentHandlesPresent: true,
        onlyJavaGetRequestsAllowed: true,
        onlyMiniKvReadCommandsAllowed: true,
        forbiddenOperationsDocumented: true,
        noLiveProbePerformedNow: true,
        noUpstreamServiceStarted: true,
        noManagedAuditConnection: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        upstreamProbesStillDisabledForReadinessCut: true,
        upstreamActionsStillDisabled: true,
        noParallelJavaMiniKvEchoNeeded: true,
        readinessCutDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut: true,
      },
      summary: {
        javaRequirementCount: 2,
        miniKvRequirementCount: 3,
        environmentHandleCount: 5,
        forbiddenOperationCount: 3,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV344.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.readinessCut.readinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.javaReadOnlyRequirements.map((requirement) => requirement.methodOrCommand))
      .toEqual(["GET /actuator/health", "GET /api/v1/ops/overview"]);
    expect(profile.miniKvReadOnlyRequirements.map((requirement) => requirement.methodOrCommand))
      .toEqual(["HEALTH", "INFOJSON", "STATSJSON"]);
  }, 60000);

  it("blocks when probes or upstream actions are already enabled", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.readinessState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut)
      .toBe(false);
    expect(profile.readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.performsLiveProbeNow).toBe(false);
    expect(profile.startsJavaService).toBe(false);
    expect(profile.startsMiniKvService).toBe(false);
    expect(profile.executionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut.v1",
        readinessState: "minimal-read-only-integration-window-readiness-cut-ready",
        activeNodeVersion: "Node v345",
        sourceNodeVersion: "Node v344",
        performsLiveProbeNow: false,
        startsJavaService: false,
        startsMiniKvService: false,
        readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: true,
        requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver minimal read-only integration window readiness cut",
      );
      expect(markdown.body).toContain("Ready for Node v346 smoke rehearsal: true");
      expect(markdown.body).toContain("Requires Java v153 + mini-kv v144 echo: false");
      expect(markdown.body).toContain("GET /api/v1/ops/overview");
      expect(markdown.body).toContain("INFOJSON");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-345",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v345-minimal-read-only-integration-window",
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
