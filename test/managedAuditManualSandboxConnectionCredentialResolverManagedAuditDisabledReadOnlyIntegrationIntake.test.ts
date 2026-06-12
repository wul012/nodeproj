import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake";

describe("managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake", () => {
  it("consumes Node v350 transition evidence and defines a disabled read-only intake", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake.v1",
      intakeState: "managed-audit-disabled-read-only-integration-intake-ready",
      intakeDecision: "define-managed-audit-disabled-read-only-integration-stage",
      readyForManagedAuditDisabledReadOnlyIntegrationIntake: true,
      consumesNodeV350PassedArchiveVerification: true,
      activeNodeVersion: "Node v351",
      sourceNodeVersion: "Node v350",
      managedAuditDisabled: true,
      readOnlyIntegrationOnly: true,
      intakeOnly: true,
      rerunsLiveProbe: false,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      sendsManagedAuditHttpTcp: false,
      readsManagedAuditCredential: false,
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
        readyForNodeV351Intake: true,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        unavailableTargetCount: 0,
        invalidContractTargetCount: 0,
        productionBlockerCount: 0,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        rawEndpointUrlParsed: false,
        executionAllowed: false,
      },
      necessityProof: {
        blockerResolved: "passed-minimal-read-only-integration-needs-next-stage-boundary",
        consumedBy: "Node v352 archive verification or later managed-audit-disabled read-only stage",
      },
      intakeRecord: {
        intakeMode: "managed-audit-disabled-read-only-integration-intake",
        sourceSpan: "Node v350 passed archive verification transition",
        intakeDecision: "define-managed-audit-disabled-read-only-integration-stage",
        managedAuditDisabled: true,
        readOnlyIntegrationOnly: true,
        nextNodeVersionSuggested: "Node v352",
        inputCount: 3,
        closedScopeCount: 7,
      },
      checks: {
        sourceNodeV350Ready: true,
        sourceTransitionAllowsIntake: true,
        sourceV349AllReadTargetsPassed: true,
        necessityProofPresent: true,
        intakeInputsComplete: true,
        closedScopesComplete: true,
        managedAuditStillDisabled: true,
        credentialValueStillClosed: true,
        rawEndpointUrlStillClosed: true,
        providerClientNotInstantiated: true,
        runtimeShellStillNotImplemented: true,
        noUpstreamServiceStarted: true,
        noJavaMutation: true,
        noMiniKvMutation: true,
        noManagedAuditHttpTcp: true,
        noJavaMiniKvEchoRequired: true,
        intakeDigestStable: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditDisabledReadOnlyIntegrationIntake: true,
      },
      summary: {
        inputCount: 3,
        closedScopeCount: 7,
        attemptedTargetCount: 5,
        passedTargetCount: 5,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV350.transitionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intakeRecord.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.closedScopes.map((scope) => scope.id)).toEqual(expect.arrayContaining([
      "credential-value",
      "raw-endpoint-url",
      "secret-provider",
      "runtime-shell",
      "java-writes",
      "mini-kv-write-admin",
      "managed-audit-http-tcp",
    ]));
  }, 180_000);

  it("fails closed when the Node v350 source archive is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v351-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake({
          config: loadTestConfig(),
          sourceArchiveRoot: emptyProjectRoot,
        });

      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForManagedAuditDisabledReadOnlyIntegrationIntake).toBe(false);
      expect(profile.sourceNodeV350.readyForPassedArchiveVerification).toBe(false);
      expect(profile.sourceNodeV350.readyForNodeV351Intake).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "NODE_V350_NOT_READY",
        "NODE_V350_TRANSITION_NOT_ALLOWED",
        "SOURCE_READ_TARGETS_NOT_ALL_PASSED",
      ]));
      expect(profile.rerunsLiveProbe).toBe(false);
      expect(profile.startsJavaService).toBe(false);
      expect(profile.startsMiniKvService).toBe(false);
      expect(profile.connectsManagedAudit).toBe(false);
    } finally {
      rmSync(emptyProjectRoot, { force: true, recursive: true });
    }
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
          "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake.v1",
        intakeState: "managed-audit-disabled-read-only-integration-intake-ready",
        intakeDecision: "define-managed-audit-disabled-read-only-integration-stage",
        activeNodeVersion: "Node v351",
        sourceNodeVersion: "Node v350",
        managedAuditDisabled: true,
        readOnlyIntegrationOnly: true,
        rerunsLiveProbe: false,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        executionAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver managed-audit-disabled read-only integration intake",
      );
      expect(markdown.body).toContain(
        "Intake decision: define-managed-audit-disabled-read-only-integration-stage",
      );
      expect(markdown.body).toContain("Managed audit disabled: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-351",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v351-managed-audit-disabled-read-only-intake",
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
