import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake";

describe("managed audit manual sandbox connection credential resolver sandbox handle review prerequisite intake", () => {
  it("consumes Node v353 and defines only non-secret sandbox handle review prerequisites", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake.v1",
      intakeState: "sandbox-handle-review-prerequisite-intake-ready",
      intakeDecision: "define-non-secret-sandbox-handle-review-prerequisites",
      readyForSandboxHandleReviewPrerequisiteIntake: true,
      readyForNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification: true,
      consumesNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord: true,
      activeNodeVersion: "Node v354",
      sourceNodeVersion: "Node v353",
      prerequisiteIntakeOnly: true,
      sandboxHandleReviewOnly: true,
      rerunsLiveProbe: false,
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
      sourceNodeV353: {
        sourceVersion: "Node v353",
        decisionState: "managed-audit-disabled-read-only-integration-decision-record-ready",
        decision: "advance-to-sandbox-handle-review-prerequisite-intake",
        readyForDecisionRecord: true,
        readyForNodeV354PrerequisiteIntake: true,
        checkCount: 19,
        passedCheckCount: 19,
        inputCount: 4,
        productionBlockerCount: 0,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        executionAllowed: false,
      },
      necessityProof: {
        blockerResolved: "sandbox-handle-review-needs-non-secret-prerequisite-input-contract",
        consumedBy:
          "Node v355 sandbox handle review prerequisite intake archive verification or later handle review stage",
      },
      intakeRecord: {
        intakeMode: "sandbox-handle-review-prerequisite-intake",
        sourceSpan: "Node v353 managed-audit-disabled read-only integration decision record",
        intakeDecision: "define-non-secret-sandbox-handle-review-prerequisites",
        allowedInputCount: 5,
        closedScopeCount: 9,
        requestsCredentialValue: false,
        requestsRawEndpointUrl: false,
        instantiatesProviderClient: false,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        opensManagedAuditConnection: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v355",
      },
      checks: {
        sourceNodeV353Ready: true,
        sourceDecisionAllowsPrerequisiteIntake: true,
        sourceChecksAllPassed: true,
        necessityProofPresent: true,
        prerequisiteInputsComplete: true,
        prerequisiteInputsNonSecret: true,
        prerequisiteInputsNoRawEndpoint: true,
        prerequisiteInputsNoNetworkConnection: true,
        prerequisiteInputsNoRuntimeInvocation: true,
        closedScopesComplete: true,
        intakeDigestStable: true,
        intakeDecisionLimitedToPrerequisiteContract: true,
        noCredentialValueRequested: true,
        noRawEndpointRequested: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplemented: true,
        noRuntimeShellInvoked: true,
        noManagedAuditHttpTcp: true,
        noUpstreamServiceStarted: true,
        noUpstreamMutation: true,
        noJavaMiniKvEchoRequired: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForSandboxHandleReviewPrerequisiteIntake: true,
      },
      summary: {
        prerequisiteInputCount: 5,
        closedScopeCount: 9,
        sourceCheckCount: 19,
        sourcePassedCheckCount: 19,
        sourceInputCount: 4,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV353.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intakeRecord.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.prerequisiteInputs.every((input) =>
      !input.containsSecretValue && !input.containsRawEndpointUrl && !input.allowsNetworkConnection
    )).toBe(true);
    expect(profile.closedScopes.every((scope) =>
      !scope.credentialValueRead && !scope.managedAuditHttpTcpAllowed && !scope.upstreamMutationAllowed
    )).toBe(true);
  }, 60000);

  it("fails closed when Node v353 evidence is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v354-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake({
          config: loadTestConfig(),
          sourceArchiveRoot: emptyProjectRoot,
        });

      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewPrerequisiteIntake).toBe(false);
      expect(profile.readyForNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification).toBe(false);
      expect(profile.sourceNodeV353.readyForDecisionRecord).toBe(false);
      expect(profile.sourceNodeV353.readyForNodeV354PrerequisiteIntake).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "NODE_V353_NOT_READY",
        "NODE_V353_DECISION_NOT_ALLOWED",
        "SOURCE_CHECKS_NOT_ALL_PASSED",
      ]));
      expect(profile.rerunsLiveProbe).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.connectsManagedAudit).toBe(false);
      expect(profile.sendsManagedAuditHttpTcp).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake.v1",
        intakeState: "sandbox-handle-review-prerequisite-intake-ready",
        intakeDecision: "define-non-secret-sandbox-handle-review-prerequisites",
        activeNodeVersion: "Node v354",
        sourceNodeVersion: "Node v353",
        prerequisiteIntakeOnly: true,
        sandboxHandleReviewOnly: true,
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review prerequisite intake",
      );
      expect(markdown.body).toContain("Intake decision: define-non-secret-sandbox-handle-review-prerequisites");
      expect(markdown.body).toContain("Ready for v355 archive verification: true");
      expect(markdown.body).toContain("Credential value requested: false");
      expect(markdown.body).toContain("Sends managed audit HTTP/TCP: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-354",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v354-prerequisite-intake",
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
