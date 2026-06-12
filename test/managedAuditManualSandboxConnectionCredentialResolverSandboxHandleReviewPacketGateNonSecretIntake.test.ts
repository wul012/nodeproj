import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake";

describe("managed audit manual sandbox connection credential resolver sandbox handle review packet gate non-secret intake", () => {
  it("consumes Node v357 and defines a non-secret packet/gate intake", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake.v1",
      intakeState: "sandbox-handle-review-packet-gate-non-secret-intake-ready",
      intakeDecision: "define-non-secret-sandbox-handle-review-packet-gate",
      readyForSandboxHandleReviewPacketGateNonSecretIntake: true,
      readyForNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification: true,
      consumesNodeV357SandboxHandleReviewContractDecisionArchiveVerification: true,
      activeNodeVersion: "Node v358",
      sourceNodeVersion: "Node v357",
      packetGateIntakeOnly: true,
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
      sourceNodeV357: {
        sourceVersion: "Node v357",
        archiveVerificationState: "sandbox-handle-review-contract-decision-archive-verified",
        archiveVerificationDecision: "archive-sandbox-handle-review-contract-decision",
        readyForArchiveVerification: true,
        readyForNodeV358PacketGateIntake: true,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        contractInputCount: 5,
        contractSectionCount: 6,
        checkCount: 30,
        passedCheckCount: 30,
        productionBlockerCount: 0,
        startsJavaService: false,
        startsMiniKvService: false,
        connectsManagedAudit: false,
        sendsManagedAuditHttpTcp: false,
        credentialValueRequested: false,
        rawEndpointUrlRequested: false,
        executionAllowed: false,
      },
      necessityProof: {
        blockerResolved: "sandbox-handle-review-needs-packet-gate-intake-after-contract-archive-verification",
        consumedBy:
          "Node v359 sandbox handle review packet/gate intake archive verification or later non-secret review gate",
      },
      intakeRecord: {
        intakeMode: "sandbox-handle-review-packet-gate-non-secret-intake",
        sourceSpan: "Node v357 sandbox handle review contract decision archive verification",
        intakeDecision: "define-non-secret-sandbox-handle-review-packet-gate",
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        permitsOnlyNonSecretPacket: true,
        requestsCredentialValue: false,
        requestsRawEndpointUrl: false,
        instantiatesProviderClient: false,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        opensManagedAuditConnection: false,
        startsUpstreamServices: false,
        writesUpstreamState: false,
        requestsJavaMiniKvEcho: false,
        nextNodeVersionSuggested: "Node v359",
      },
      checks: {
        sourceNodeV357Ready: true,
        sourceArchiveVerificationAllowsPacketGateIntake: true,
        sourceArchiveFilesComplete: true,
        sourceChecksAllPassed: true,
        necessityProofPresent: true,
        packetInputsComplete: true,
        gateOutputsComplete: true,
        stopConditionsComplete: true,
        packetInputsNonSecret: true,
        gateOutputsNonSecret: true,
        stopConditionsClosed: true,
        packetDoesNotRequestRawEndpoint: true,
        packetDoesNotAllowNetwork: true,
        intakeDigestStable: true,
        intakeLimitedToNonSecretPacketGate: true,
        noCredentialValueRequestedOrRead: true,
        noRawEndpointRequestedOrParsed: true,
        noProviderClientInstantiated: true,
        noRuntimeShellImplemented: true,
        noRuntimeShellInvoked: true,
        noManagedAuditHttpTcp: true,
        noUpstreamServiceStarted: true,
        noUpstreamMutation: true,
        noJavaMiniKvEchoRequired: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForSandboxHandleReviewPacketGateNonSecretIntake: true,
      },
      summary: {
        checkCount: 27,
        passedCheckCount: 27,
        packetInputCount: 6,
        gateOutputCount: 5,
        stopConditionCount: 7,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceCheckCount: 30,
        sourcePassedCheckCount: 30,
        sourceProductionBlockerCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.sourceNodeV357.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV357.sourceDecisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.intakeRecord.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packetInputs.every((input) =>
      !input.containsSecretValue && !input.containsRawEndpointUrl && !input.allowsNetworkConnection
    )).toBe(true);
    expect(profile.gateOutputs.every((output) =>
      !output.emitsSecretValue && !output.emitsRawEndpointUrl && !output.opensManagedAuditConnection
    )).toBe(true);
    expect(profile.stopConditions.every((condition) =>
      condition.effect === "fail-closed" && !condition.managedAuditHttpTcpAllowed
    )).toBe(true);
  }, 180_000);

  it("fails closed when Node v357 evidence is unavailable", () => {
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v358-empty-"));

    try {
      const profile =
        loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake({
          config: loadTestConfig(),
          sourceArchiveRoot: emptyProjectRoot,
        });

      expect(profile.intakeState).toBe("blocked");
      expect(profile.intakeDecision).toBe("blocked");
      expect(profile.readyForSandboxHandleReviewPacketGateNonSecretIntake).toBe(false);
      expect(profile.readyForNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification).toBe(false);
      expect(profile.sourceNodeV357.readyForArchiveVerification).toBe(false);
      expect(profile.sourceNodeV357.readyForNodeV358PacketGateIntake).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
        "NODE_V357_NOT_READY",
        "NODE_V357_DECISION_NOT_ALLOWED",
        "SOURCE_ARCHIVE_FILES_INCOMPLETE",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake.v1",
        intakeState: "sandbox-handle-review-packet-gate-non-secret-intake-ready",
        intakeDecision: "define-non-secret-sandbox-handle-review-packet-gate",
        activeNodeVersion: "Node v358",
        sourceNodeVersion: "Node v357",
        packetGateIntakeOnly: true,
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
        "# Managed audit manual sandbox connection credential resolver sandbox handle review packet/gate non-secret intake",
      );
      expect(markdown.body).toContain("Intake decision: define-non-secret-sandbox-handle-review-packet-gate");
      expect(markdown.body).toContain("Ready for v359 archive verification: true");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("Starts mini-kv service: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-358",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v358-packet-gate-intake",
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
